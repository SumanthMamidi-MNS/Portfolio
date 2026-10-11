import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '../context/PreloaderContext';

// The 0 → 100% intro plays on every page load, exactly as designed. The only visitors who skip it are
// those whose system asks for reduced motion.
function shouldSkipIntro() {
  try {
    return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export default function Preloader() {
  const [skip] = useState(shouldSkipIntro);
  const [phase, setPhase] = useState(0); // 0=initials, 1=fullname, 2=done
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(!skip);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const { onLoaded } = usePreloader();

  useEffect(() => {
    if (skip) {
      onLoaded(); // reveal the hero immediately
      return undefined;
    }

    // Animate progress 0 → 100 over ~1.7s
    let frame;
    let start;
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(Math.round((elapsed / 1100) * 100), 100);
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);

    // Same sequence (initials, name, 0 → 100%, curtain), about 1.2 s shorter than before: ~1.75 s in total.
    const t1 = setTimeout(() => setPhase(1), 350);
    const t2 = setTimeout(() => setPhase(2), 1150);
    const t3 = setTimeout(() => {
      setCurtainOpen(true);
      onLoaded(); // Synchronize hero reveal right as curtain splits open
    }, 1250);
    const t4 = setTimeout(() => {
      setShow(false);
    }, 1900);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onLoaded, skip]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Top curtain panel (slides up offscreen) ── */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 z-10"
            initial={{ y: '0%' }}
            animate={{ y: curtainOpen ? '-100%' : '0%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: '#070B14' }}
          />

          {/* ── Bottom curtain panel (slides down offscreen) ── */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 z-10"
            initial={{ y: '0%' }}
            animate={{ y: curtainOpen ? '100%' : '0%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ background: '#070B14' }}
          />

          {/* ── Center content (fades out as curtain splits) ── */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center flex-col gap-8 pointer-events-auto"
            animate={{
              opacity: curtainOpen ? 0 : 1,
              scale: curtainOpen ? 0.94 : 1,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute w-80 h-80 rounded-full pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
            />

            {/* Initials / Name morph */}
            <div className="relative z-10 flex flex-col items-center gap-4 overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === 0 && (
                  <motion.div
                    key="initials"
                    initial={{ opacity: 0, scale: 1.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute -inset-4 rounded-full pointer-events-none"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
                    />
                    <span
                      className="font-black"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '4.5rem',
                        letterSpacing: '-0.04em',
                        background: 'linear-gradient(135deg, #a5b4fc, #6366F1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      SM
                    </span>
                  </motion.div>
                )}

                {phase >= 1 && (
                  <motion.div
                    key="fullname"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className="font-black text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', letterSpacing: '-0.03em' }}
                    >
                      Sumanth Mamidi
                    </span>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="label-sm text-slate-500"
                    >
                      AI / ML Engineer
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar + counter */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="relative h-px rounded-full overflow-hidden"
                style={{ width: 140, background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  style={{
                    scaleX: progress / 100,
                    transformOrigin: 'left',
                    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                    position: 'absolute',
                    inset: 0,
                  }}
                />
              </motion.div>
              <span
                className="label-sm"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'rgba(99,102,241,0.7)',
                  letterSpacing: '0.12em',
                }}
              >
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
