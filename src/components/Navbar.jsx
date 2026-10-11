import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { usePreloader } from '../context/PreloaderContext';

const navLinks = [
  { label: 'About',           href: '#about' },
  { label: 'Projects',        href: '#projects' },
  { label: 'Publications',    href: '#publications' },
  { label: 'Education',       href: '#education' },
  { label: 'Skills',          href: '#skills' },
  { label: 'Certifications',  href: '#certifications' },
  { label: 'Contact',         href: '#contact' },
];

const sectionIds = ['home', 'about', 'projects', 'publications', 'education', 'skills', 'certifications', 'contact'];

export default function Navbar({ onOpenCommandPalette }) {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isLoaded } = usePreloader();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[50] px-4 md:px-8 transition-[padding] duration-500 ${
          scrolled ? 'pt-3' : 'pt-4'
        }`}
      >
        {/* At the top of the page the bar has no box. After scrolling, a see-through glass box with
            rounded-rectangle corners fades in around the same content (see .nav-glass in index.css),
            so nothing jumps. */}
        <div
          className={`nav-glass ${scrolled ? 'nav-glass--on' : ''} mx-auto w-full max-w-7xl flex items-center justify-between px-5 py-3`}
        >

          {/* Logo */}
          <a href="#home" className="font-black text-white text-xl tracking-tight no-underline hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text">SM</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a key={link.href} href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors no-underline ${
                    isActive ? 'text-white' : 'text-slate-300/85 hover:text-white'
                  }`}>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(99,102,241,0.16)',
                        border: '1px solid rgba(129,140,248,0.30)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: command palette + contact */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/30 transition-all text-xs font-mono"
            >
              <Search size={12} />
              <span>Ctrl K</span>
            </button>
            <a href="#contact"
              className="btn-primary text-sm px-5 py-2 no-underline">
              Get in touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu" aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-[49] mx-4 glass rounded-2xl overflow-hidden py-4"
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/4 transition-all no-underline">
                {link.label}
              </a>
            ))}
            <div className="px-6 pt-3 pb-2 border-t border-white/5 mt-2">
              <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary text-sm w-full justify-center no-underline">
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
