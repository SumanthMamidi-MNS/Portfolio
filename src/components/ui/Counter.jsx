import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView } from 'framer-motion';

export default function Counter({ value, suffix = '', prefix = '', duration = 1.5 }) {
  const ref = useRef(null);
  const displayRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: Math.round(100 / duration),
  });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref}>
      <span ref={displayRef}>{prefix}0{suffix}</span>
    </span>
  );
}
