import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

const GithubIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="label-sm text-slate-600" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem' }}>
      Chennai · {time} IST
    </span>
  );
}

export default function Footer() {
  const { profile } = useProfile();
  const year = new Date().getFullYear();
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => scrollY.on('change', y => setShowTop(y > 400)), [scrollY]);

  return (
    <footer className="section-0 border-t border-white/5 py-12 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="font-black text-white text-2xl tracking-tight gradient-text-animated"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sumanth Mamidi
            </motion.p>
            <p className="text-sm text-slate-500">AI/ML Engineer & Full-Stack Developer</p>
            <LiveClock />
          </div>

          {/* Nav */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            {['About', 'Projects', 'Skills', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors no-underline">
                {item}
              </a>
            ))}
          </div>

          {/* Social + top */}
          <div className="flex items-center gap-4">
            {profile?.social?.github && (
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors" aria-label="GitHub">
                <GithubIcon size={17} />
              </a>
            )}
            {profile?.social?.linkedin && (
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedInIcon size={17} />
              </a>
            )}
            {profile?.social?.instagram && (
              <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors" aria-label="Instagram">
                <InstagramIcon size={17} />
              </a>
            )}
            <div className="w-px h-4 bg-white/10" />
            <AnimatePresence>
              {showTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/40 transition-all"
                  aria-label="Back to top"
                >
                  <ArrowUp size={13} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="divider mt-8 mb-6" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
          <p>© {year} Sumanth Mamidi. All rights reserved.</p>
          <p className="label-sm" style={{ fontSize: '0.6rem' }}>React · Vite · Tailwind CSS · Framer Motion</p>
        </div>
      </motion.div>
    </footer>
  );
}
