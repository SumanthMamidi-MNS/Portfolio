import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    let rafId;
    try {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1.0,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis scroll failed to initialize:', e);
    }

    // Anchor links ("#projects", ...) glide to the section with an offset for the floating nav,
    // instead of jumping. Falls back to the browser default if Lenis is unavailable.
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target || !lenisRef.current) return;
      event.preventDefault();
      lenisRef.current.scrollTo(target, { offset: hash === '#home' ? 0 : -80, duration: 1.3 });
      window.history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
