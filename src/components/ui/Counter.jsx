import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useInView, motion } from 'framer-motion';

export default function Counter({ value, suffix = '', prefix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const displayRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [complete, setComplete] = useState(false);

  // Extract numeric part
  const numericTarget = typeof value === 'number' ? value : parseInt(value, 10) || 0;
  const rawSuffix = typeof value === 'string' && value.includes('+') ? '+' : suffix;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 24,
    stiffness: Math.round(120 / duration),
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(numericTarget);
    }
  }, [inView, motionValue, numericTarget]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      const current = Math.floor(latest);
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${current}${rawSuffix}`;
      }
      if (current >= numericTarget && !complete) {
        setComplete(true);
      }
    });
  }, [springValue, prefix, rawSuffix, numericTarget, complete]);

  return (
    <motion.span
      ref={ref}
      animate={complete ? {
        scale: [1, 1.06, 1],
        filter: ['drop-shadow(0 0 0px rgba(99,102,241,0))', 'drop-shadow(0 0 16px rgba(129,140,248,0.7))', 'drop-shadow(0 0 6px rgba(99,102,241,0.3))'],
      } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block tabular-nums font-black tracking-tight"
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <span ref={displayRef}>{prefix}0{rawSuffix}</span>
    </motion.span>
  );
}
