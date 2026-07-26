import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [phase, setPhase] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2100);
    const t3 = setTimeout(() => setShow(false), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center flex-col gap-8"
          style={{ background: '#070B14' }}
        >
          {/* Ambient glow behind logo */}
          <div className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

          {/* Initials → Full name morph */}
          <div className="relative z-10 flex flex-col items-center gap-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.span
                  key="initials"
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  className="font-black text-white"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '4.5rem', letterSpacing: '-0.04em' }}
                >
                  <span style={{ background: 'linear-gradient(135deg, #a5b4fc, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    SM
                  </span>
                </motion.span>
              )}
              {phase >= 1 && (
                <motion.div
                  key="fullname"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
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

          {/* Progress line */}
          <motion.div
            className="relative h-px rounded-full overflow-hidden"
            style={{ width: 120, background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }}
              className="absolute inset-y-0 left-0 w-full origin-left"
              style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
