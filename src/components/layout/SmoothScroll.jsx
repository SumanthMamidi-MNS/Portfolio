import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1.0,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis scroll failed to initialize:', e);
    }

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
