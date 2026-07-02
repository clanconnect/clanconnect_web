'use client';
/**
 * react-router-dom compatibility shim over next/navigation.
 * The migrated components keep their react-router API (Link to=, NavLink,
 * useLocation, useParams, useSearchParams); this module maps those onto Next.js.
 */
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  usePathname,
  useRouter,
  useParams as useNextParams,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';

const hrefOf = (to) => {
  if (typeof to === 'string') return to;
  if (to && typeof to === 'object') {
    return `${to.pathname || ''}${to.search || ''}${to.hash || ''}` || '/';
  }
  return '/';
};

export const Link = forwardRef(function Link({ to, href, ...rest }, ref) {
  return <NextLink ref={ref} href={href ?? hrefOf(to)} {...rest} />;
});

export const NavLink = forwardRef(function NavLink(
  { to, href, className, style, children, end, caseSensitive, ...rest },
  ref
) {
  const pathname = usePathname() || '/';
  const target = href ?? hrefOf(to);
  const targetPath = target.split(/[?#]/)[0] || '/';
  const isActive =
    end || targetPath === '/'
      ? pathname === targetPath
      : pathname === targetPath || pathname.startsWith(`${targetPath}/`);

  const resolvedClassName =
    typeof className === 'function'
      ? className({ isActive })
      : [className, isActive ? 'active' : null].filter(Boolean).join(' ') || undefined;
  const resolvedStyle = typeof style === 'function' ? style({ isActive }) : style;

  return (
    <NextLink
      ref={ref}
      href={target}
      className={resolvedClassName}
      style={resolvedStyle}
      aria-current={isActive ? 'page' : undefined}
      {...rest}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </NextLink>
  );
});

export const useLocation = () => {
  const pathname = usePathname() || '/';
  // search/hash are resolved after mount so server and client render identically
  // without forcing a Suspense boundary on every page that reads location.
  const [rest, setRest] = useState({ search: '', hash: '' });
  useEffect(() => {
    setRest({ search: window.location.search, hash: window.location.hash });
  }, [pathname]);
  return useMemo(
    () => ({ pathname, search: rest.search, hash: rest.hash, state: null, key: 'default' }),
    [pathname, rest]
  );
};

export const useParams = () => {
  const params = useNextParams();
  return params || {};
};

export const useSearchParams = () => {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setSearchParams = (next) => {
    const value = typeof next === 'function' ? next(new URLSearchParams(searchParams)) : next;
    const qs = new URLSearchParams(value).toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };
  return [searchParams, setSearchParams];
};

export const useNavigate = () => {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === 'number') {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    const href = hrefOf(to);
    if (options.replace) router.replace(href);
    else router.push(href);
  };
};

export const Navigate = ({ to, replace }) => {
  const router = useRouter();
  useEffect(() => {
    const href = hrefOf(to);
    if (replace) router.replace(href);
    else router.push(href);
  }, []);
  return null;
};
