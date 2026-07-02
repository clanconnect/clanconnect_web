'use client';
import { useEffect } from 'react';
import { useLocation } from '@/lib/router';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
  }, [pathname]);

  return null; // Since this component doesn't render anything, return null
};

export default ScrollToTop;