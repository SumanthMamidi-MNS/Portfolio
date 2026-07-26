import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, Code2, Award, Mail } from 'lucide-react';

const commands = [
  { id: 'about',           label: 'About Me',        icon: User,      href: '#about' },
  { id: 'projects',        label: 'Projects',         icon: Briefcase, href: '#projects' },
  { id: 'skills',          label: 'Skills',           icon: Code2,     href: '#skills' },
  { id: 'certifications',  label: 'Certifications',   icon: Award,     href: '#certifications' },
  { id: 'contact',         label: 'Contact',          icon: Mail,      href: '#contact' },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="cmd-overlay flex items-start justify-center pt-[15vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="cmd-panel w-[90vw] max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
              <Search size={16} className="text-slate-500 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search sections..."
                className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm outline-none"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
              <kbd className="label-sm text-slate-700 border border-white/8 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            {/* Results */}
            <div className="py-2">
              {filtered.map(cmd => {
                const Icon = cmd.icon;
                return (
                  <a
                    key={cmd.id}
                    href={cmd.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/4 transition-all no-underline group"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/4 group-hover:bg-indigo-500/15 transition-colors">
                      <Icon size={15} className="group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <span>{cmd.label}</span>
                  </a>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-center py-8 label-sm text-slate-700">No results for "{query}"</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
