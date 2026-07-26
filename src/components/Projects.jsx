import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import TiltCard from '../components/ui/TiltCard';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import { useProjects } from '../hooks/useProjects';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const categoryAccents = {
  'ai-ml':       { color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)' },
  'interactive': { color: '#10B981', bg: 'rgba(16,185,129,0.10)'  },
  'systems':     { color: '#F59E0B', bg: 'rgba(245,158,11,0.10)'  },
};

const filterLabels = { all: 'All', 'ai-ml': 'AI & ML', 'interactive': 'Interactive', 'systems': 'Systems' };

function ProjectCard({ project, index, onClick }) {
  const accent = categoryAccents[project.category] || categoryAccents['ai-ml'];
  const [imageError, setImageError] = React.useState(false);

  return (
    <TiltCard maxTilt={5}>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        onClick={() => onClick(project)}
        data-cursor="View"
        className="h-full"
      >
        <SpotlightCard className="card h-full flex flex-col overflow-hidden group">
          {/* Top Cover Banner */}
          <div className="h-36 relative overflow-hidden flex items-center justify-center border-b border-white/5" style={{ background: `radial-gradient(circle at 50% 30%, ${accent.color}22 0%, ${accent.bg} 100%)` }}>
            {project.cover && !imageError ? (
              <img
                src={project.cover}
                alt={project.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Ambient Grid Pattern */}
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(${accent.color} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
                <span
                  className="text-6xl font-black opacity-15 select-none tracking-tighter"
                  style={{ fontFamily: 'var(--font-display)', color: accent.color }}
                >
                  {project.title}
                </span>
              </div>
            )}
            
            <div className="absolute top-3 left-3 z-10">
              <span className="tech-tag capitalize text-[10px] px-2.5 py-0.5" style={{ borderColor: `${accent.color}40`, color: '#fff', background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(4px)' }}>
                {project.category?.replace('-', ' & ')}
              </span>
            </div>
            
            {project.featured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wide shadow-sm"
                  style={{ background: '#F59E0B', color: '#000' }}>
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="p-5 flex flex-col gap-2.5 flex-1">
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors mb-0.5"
                style={{ fontFamily: 'var(--font-display)' }}>
                {project.title}
              </h3>
              <p className="label-sm text-slate-400 text-[10px]">{project.subtitle}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-auto pt-2">
              {project.tags?.slice(0, 3).map(tag => <span key={tag} className="skill-pill text-[10px] px-2 py-0.5">{tag}</span>)}
              {project.tags?.length > 3 && <span className="skill-pill text-[10px] px-1.5 py-0.5">+{project.tags.length - 3}</span>}
            </div>
            <div className="flex items-center gap-1 pt-3 border-t border-white/5">
              <span className="text-[11px] font-semibold text-violet-400 group-hover:text-violet-300 flex items-center gap-1 transition-colors">
                View Details <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </SpotlightCard>
      </motion.article>
    </TiltCard>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const accent = categoryAccents[project.category] || categoryAccents['ai-ml'];
  const [imageError, setImageError] = React.useState(false);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
      style={{ background: 'rgba(5,9,18,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        className="glass rounded-2xl w-full max-w-2xl max-h-[85vh] relative flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky close button — always visible top-right */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 hover:bg-white/10 border border-white/10"
          style={{ background: 'rgba(10,15,30,0.75)', backdropFilter: 'blur(8px)' }}
          aria-label="Close"
        >
          <X size={15} />
        </button>

        {/* Scrollable content area with Lenis prevention and custom scrollbar */}
        <div
          className="overflow-y-auto flex-1 modal-scrollbar"
          data-lenis-prevent
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="h-44 relative overflow-hidden flex items-center justify-center border-b border-white/5"
            style={{ background: `radial-gradient(circle at 50% 30%, ${accent.color}25 0%, ${accent.bg} 100%)` }}>
            {project.cover && !imageError ? (
              <img src={project.cover} alt={project.title} onError={() => setImageError(true)} className="w-full h-full object-cover" />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(${accent.color} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <span className="text-7xl font-black opacity-15 select-none tracking-tighter"
                  style={{ fontFamily: 'var(--font-display)', color: accent.color }}>
                  {project.title}
                </span>
              </div>
            )}
            <div className="absolute bottom-3.5 left-5 z-10">
              <span className="tech-tag capitalize" style={{ borderColor: `${accent.color}40`, color: '#fff', background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(4px)' }}>
                {project.category?.replace('-', ' & ')}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {project.title}
              </h2>
              <p className="text-slate-500 text-xs">{project.subtitle} · {project.year}</p>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">{project.description}</p>
            {project.features?.length > 0 && (
              <div>
                <h4 className="label-sm text-slate-500 mb-2.5">Key Features</h4>
                <ul className="flex flex-col gap-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h4 className="label-sm text-slate-500 mb-2.5">Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map(tag => <span key={tag} className="skill-pill text-xs">{tag}</span>)}
              </div>
            </div>
            <div className="flex gap-3 pt-3 border-t border-white/5">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs no-underline py-2.5 px-4">
                <GithubIcon size={14} /> View on GitHub
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs no-underline py-2.5 px-4">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section-1 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <SectionHeader
            label="My Work"
            heading="Featured Projects"
            subtext="Multi-agent AI systems, quantum visualizers, and interactive tools."
            theme="dark"
          />

          <div
            className="flex items-center gap-1 p-1 rounded-xl shrink-0 self-start md:self-auto"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === cat ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}>
                {filter === cat && (
                  <motion.div layoutId="filter-pill" className="absolute inset-0 rounded-lg"
                    style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                )}
                <span className="relative z-10">{filterLabels[cat] || cat}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Skeleton.Grid cols={3} count={3} />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onClick={setActiveProject} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
