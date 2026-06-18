import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    scrollTop();
    const rafId = window.requestAnimationFrame(scrollTop);
    const timeoutId = window.setTimeout(scrollTop, 50);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [pathname, search, hash]);

  return null;
}
