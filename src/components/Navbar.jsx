import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { label: 'About',           href: '#about' },
  { label: 'Expertise',       href: '#expertise' },
  { label: 'Skills',          href: '#skills' },
  { label: 'AI Playground',   href: '#ai-playground' },
  { label: 'Projects',        href: '#projects' },
  { label: 'Certifications',  href: '#certifications' },
  { label: 'Contact',         href: '#contact' },
];

const sectionIds = ['home', 'about', 'expertise', 'skills', 'ai-playground', 'projects', 'certifications', 'contact'];

export default function Navbar({ onOpenCommandPalette }) {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          scrolled ? 'py-3 px-4 md:px-8' : 'py-5 px-6 md:px-12'
        }`}
      >
        <div className={`mx-auto max-w-7xl transition-all duration-500 ${
          scrolled
            ? 'glass rounded-2xl px-5 py-3 shadow-xl'
            : 'flex items-center justify-between'
        } ${scrolled ? 'flex items-center justify-between' : ''}`}>

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
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors no-underline group ${
                    isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {link.label}
                  <span className={`absolute bottom-0.5 left-3 right-3 h-px rounded-full transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                  }`}
                    style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }} />
                </a>
              );
            })}
          </nav>

          {/* Right: Cmd+K + Hire Me */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20 transition-all text-xs font-mono"
            >
              <Search size={12} />
              <span>⌘K</span>
            </button>
            <a href="#contact"
              className="btn-primary text-sm px-4 py-2 no-underline">
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-slate-400 hover:text-white transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
