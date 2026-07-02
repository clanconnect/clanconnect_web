'use client';
import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { PublicService } from '@/core/services/public.service';

const publicService = new PublicService();

const trackPageView = async () => {
  try {
    await publicService.recordFbConversionPageView({ url: window.location.href });
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Replaces the old App.jsx side effects: Bootstrap's JS bundle, smooth
 * scroll-to-top + FB Conversion page-view tracking on every route change,
 * and the global toast container.
 */
const AppEffects = () => {
  const pathname = usePathname();

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.min.js');
  }, []);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    trackPageView();
  }, [pathname]);

  return <ToastContainer position="top-right" autoClose={5000} theme="dark" />;
};

export default AppEffects;
