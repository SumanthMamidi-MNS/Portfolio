import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  const [prevLabel, setPrevLabel] = useState('');

  // Inner dot — snappy spring
  const springCfg = { damping: 28, stiffness: 400 };
  const smoothX = useSpring(cursorX, springCfg);
  const smoothY = useSpring(cursorY, springCfg);

  // Outer ring — slower, trailing feel
  const outerX = useSpring(cursorX, { damping: 35, stiffness: 180 });
  const outerY = useSpring(cursorY, { damping: 35, stiffness: 180 });

  // Velocity-based stretch
  const velX = useVelocity(smoothX);
  const velY = useVelocity(smoothY);
  const speed = useTransform([velX, velY], ([vx, vy]) => Math.sqrt(vx * vx + vy * vy));
  const scaleX = useTransform(speed, [0, 800], [1, 1.35]);
  const scaleY = useTransform(speed, [0, 800], [1, 0.75]);

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
        setPrevLabel(label);
        setLabel(el.getAttribute('data-cursor') || '');
      }
    };
    const leave = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('[data-cursor]') || e.target.closest('a, button, [role="button"]');
      if (el) {
        setHovered(false);
        setPrevLabel(label);
        setLabel('');
      }
    };
    document.addEventListener('mouseenter', enter, true);
    document.addEventListener('mouseleave', leave, true);
    return () => {
      document.removeEventListener('mouseenter', enter, true);
      document.removeEventListener('mouseleave', leave, true);
    };
  }, [label]);

  return (
    <>
      {/* ── Outer trailing ring ── */}
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block rounded-full border border-white/25 mix-blend-difference"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
        }}
        animate={{ opacity: hovered ? 0 : 0.6 }}
        transition={{ duration: 0.25 }}
      />

      {/* ── Inner dot ── */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:flex items-center justify-center rounded-full bg-white mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          scaleX,
          scaleY,
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
        <AnimatePresence mode="wait">
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] font-bold text-black uppercase tracking-wider select-none leading-none text-center px-1"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
