import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');
  // Over photos and video the colour-inverting blend would look like a negative / scan, so the cursor
  // switches to a plain white dot with a violet edge there.
  const [solid, setSolid] = useState(false);

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
    const handleOver = (e) => {
      // Only real photos/video (your portrait, the intro video, screenshots) get the plain dot.
      // Logos, covers and certificates keep the colour-blending cursor with its "VIEW" label.
      setSolid(!!e.target?.closest?.('video, [data-cursor-solid]'));
      const el = e.target?.closest?.('[data-cursor], a, button, [role="button"]');
      if (el) {
        setHovered(true);
        setLabel(el.getAttribute('data-cursor') || '');
      } else {
        setHovered(false);
        setLabel('');
      }
    };

    window.addEventListener('mouseover', handleOver);
    return () => window.removeEventListener('mouseover', handleOver);
  }, []);

  return (
    <>
      {/* ── Outer trailing ring ── */}
      <motion.div
        className={`pointer-events-none fixed z-[9998] hidden md:block rounded-full border ${
          solid ? 'border-violet-300/70' : 'border-white/25 mix-blend-difference'
        }`}
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
        className={`pointer-events-none fixed z-[9999] hidden md:flex items-center justify-center rounded-full bg-white ${
          solid ? 'shadow-[0_0_0_2px_rgba(139,92,246,0.85)]' : 'mix-blend-difference'
        }`}
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
          // Full-strength blend everywhere (the green / cream circles on buttons and links);
          // only over certificates is it slightly see-through so the certificate stays readable.
          opacity: hovered && label === 'CERT' ? 0.65 : 1,
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
