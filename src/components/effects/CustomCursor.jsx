import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');

  const springCfg = { damping: 28, stiffness: 400 };
  const smoothX = useSpring(cursorX, springCfg);
  const smoothY = useSpring(cursorY, springCfg);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const enter = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('[data-cursor]') || e.target.closest('a, button, [role="button"]');
      if (el) {
        setHovered(true);
        setLabel(el.getAttribute('data-cursor') || '');
      }
    };
    const leave = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('[data-cursor]') || e.target.closest('a, button, [role="button"]');
      if (el) {
        setHovered(false);
        setLabel('');
      }
    };
    document.addEventListener('mouseenter', enter, true);
    document.addEventListener('mouseleave', leave, true);
    return () => {
      document.removeEventListener('mouseenter', enter, true);
      document.removeEventListener('mouseleave', leave, true);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] hidden md:flex items-center justify-center rounded-full bg-white mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        top: 0,
        left: 0,
      }}
      animate={{
        width:  hovered ? 56 : 12,
        height: hovered ? 56 : 12,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {label && (
        <span className="text-[9px] font-bold text-black uppercase tracking-wider select-none leading-none text-center px-1">
          {label}
        </span>
      )}
    </motion.div>
  );
}
