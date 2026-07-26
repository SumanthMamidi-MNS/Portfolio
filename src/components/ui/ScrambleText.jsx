import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const GLYPHS = '!@#$%^&*()_+=[]{}|;:<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function ScrambleText({ text, trigger = 'inView', speed = 40, className = '' }) {
  const [displayText, setDisplayText] = useState(trigger === 'inView' ? text.replace(/./g, GLYPHS[0]) : text);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const hasScrambled = useRef(false);
  const intervalRef = useRef(null);

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return text[i];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join('')
      );
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
      iteration += 0.4;
    }, speed);
  };

  useEffect(() => {
    if ((trigger === 'inView' || trigger === 'both') && inView && !hasScrambled.current) {
      hasScrambled.current = true;
      scramble();
    }
  }, [inView, trigger]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <span
      ref={ref}
      className={`font-mono ${className}`}
      style={{ fontFamily: 'var(--font-mono)' }}
      onMouseEnter={() => (trigger === 'hover' || trigger === 'both') && scramble()}
    >
      {displayText}
    </span>
  );
}
