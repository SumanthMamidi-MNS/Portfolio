import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SplitText — word-by-word clip-mask reveal.
 *
 * Props:
 *  text       — the full string to split and reveal
 *  trigger    — 'onLoad' | 'inView' (default 'inView')
 *  isLoaded   — pass isLoaded boolean when trigger='onLoad'
 *  delay      — initial delay before stagger starts (default 0)
 *  stagger    — per-word stagger in seconds (default 0.08)
 *  className  — className applied to the outer <span>
 *  wordClass  — className applied to each word span
 */
export default function SplitText({
  text,
  trigger = 'inView',
  isLoaded = false,
  delay = 0,
  stagger = 0.08,
  className = '',
  wordClass = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const shouldAnimate = trigger === 'inView' ? inView : isLoaded;

  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      className={`inline ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom' }}
        >
          <motion.span
            variants={wordVariant}
            className={`inline-block ${wordClass}`}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
