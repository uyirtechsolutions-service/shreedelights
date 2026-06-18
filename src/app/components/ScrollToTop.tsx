import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    scrollTop();
    const id = window.setTimeout(scrollTop, 0);
    return () => window.clearTimeout(id);
  }, [pathname, search, hash]);

  return null;
}
