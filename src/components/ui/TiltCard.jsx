import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

/**
 * Premium 3D tilt: soft spring, a slight lift on hover, and a light glare that follows the pointer
 * so the card feels like a physical surface. Touch devices and reduced-motion users get a static card
 * (MotionConfig reducedMotion="user" disables the transform animation; coarse pointers skip the handlers).
 */
export default function TiltCard({ children, className = '', maxTilt = 8, radius = 22, lift = 1.025 }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Heavier, slower spring than a "snappy" tilt: it settles smoothly instead of jittering.
  const spring = { stiffness: 140, damping: 18, mass: 0.7 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), rgba(167,139,250,0.06) 35%, transparent 60%)`;

  const handleMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: '1100px' }} className={`h-full ${className}`}>
      <motion.div
        ref={ref}
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        animate={{ scale: active ? lift : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform', borderRadius: radius }}
        className="relative h-full"
      >
        {children}
        {/* Pointer-following glare, clipped to the card's rounded corners */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ background: glare, opacity: active ? 1 : 0, borderRadius: radius }}
        />
      </motion.div>
    </div>
  );
}
