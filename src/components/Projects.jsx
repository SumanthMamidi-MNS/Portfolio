import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight, ChevronDown } from 'lucide-react';
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
  'systems':     { color: '#06B6D4', bg: 'rgba(6,182,212,0.10)'  },
};

const projectThemeAccents = {
  urbantrace:  { color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.40)', bgEnd: 'rgba(8, 20, 34, 0.96)' },
  oceanembed:  { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.38)', bgEnd: 'rgba(8, 18, 38, 0.96)' },
  fieldcast:   { color: '#10B981', glow: 'rgba(16, 185, 129, 0.38)', bgEnd: 'rgba(8, 24, 20, 0.96)' },
  truecite:    { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.38)', bgEnd: 'rgba(16, 12, 34, 0.96)' },
  auxin:       { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.38)', bgEnd: 'rgba(24, 16, 10, 0.96)' },
  campusflow:  { color: '#6366F1', glow: 'rgba(99, 102, 241, 0.38)', bgEnd: 'rgba(12, 14, 32, 0.96)' },
  omnifix:     { color: '#EC4899', glow: 'rgba(236, 72, 153, 0.38)', bgEnd: 'rgba(24, 12, 22, 0.96)' },
  qubitscope:  { color: '#A855F7', glow: 'rgba(168, 85, 247, 0.38)', bgEnd: 'rgba(16, 10, 32, 0.96)' },
  airforge:    { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.38)', bgEnd: 'rgba(24, 16, 10, 0.96)' },
  emailenv:    { color: '#6366F1', glow: 'rgba(99, 102, 241, 0.38)', bgEnd: 'rgba(12, 14, 32, 0.96)' },
  deepfocus:   { color: '#14B8A6', glow: 'rgba(20, 184, 166, 0.38)', bgEnd: 'rgba(10, 22, 24, 0.96)' },
};

const filterLabels = { all: 'All', 'ai-ml': 'AI & ML', 'interactive': 'Interactive', 'systems': 'Systems' };

function ProjectCard({ project, index, number, onClick }) {
  const accent = categoryAccents[project.category] || categoryAccents['ai-ml'];
  const specific = projectThemeAccents[project.id?.toLowerCase()] || {};
  const themeColor = specific.color || accent.color;
  const glowColor = specific.glow || `${themeColor}38`;
  const bgEnd = specific.bgEnd || 'rgba(10, 16, 32, 0.96)';
  const [imageError, setImageError] = React.useState(false);
  // Stagger by position inside its own group; cards fade up in place (no layout sliding).
  const delay = Math.min((index % 6) * 0.05, 0.3);

  return (
    <TiltCard maxTilt={7}>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onClick(project)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project); } }}
        className="h-full cursor-pointer max-w-[99%] mx-auto w-full"
        role="button"
        aria-label={`${project.title}: open details`}
        tabIndex={0}
        data-cursor="VIEW"
      >
        <SpotlightCard
          spotColor={`${themeColor}40`}
          className="project-glass h-full flex flex-col overflow-hidden group rounded-[22px] border border-white/9 transition-all duration-300 relative hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)]"
          style={{
            // Translucent fill; the frosted blur is added only on hover (.project-glass), and the hover
            // spotlight takes this project's own colour.
            background: 'rgba(13, 20, 36, 0.72)',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
          }}
        >
          {/* Top Cover Banner with theme-matched radial aura */}
          <div
            className="h-40 md:h-44 relative overflow-hidden flex items-center justify-center px-6 py-4"
            style={{
              background: `radial-gradient(circle at 50% 38%, ${glowColor} 0%, rgba(10, 16, 30, 0.5) 55%, ${bgEnd} 85%)`,
            }}
          >
            {project.cover && !imageError ? (
              <img
                src={project.cover}
                alt={project.title}
                onError={() => setImageError(true)}
                className={`transition-transform duration-500 ease-out ${
                  project.cover?.endsWith?.('.svg')
                    ? 'max-h-24 md:max-h-26 w-auto max-w-[88%] object-contain group-hover:scale-105 drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]'
                    : 'w-full h-full object-cover group-hover:scale-105'
                }`}
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
            
            {/* Corner labels: plain text only. Category (with a violet dot) on the left, number on the right.
                No stars, glows or bordered pills. */}
            <span className="absolute top-3.5 left-4 z-10 inline-flex items-center gap-2 text-[11px] font-medium text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {filterLabels[project.category] || project.category}
            </span>
            <span className="absolute top-3.5 right-4 z-10 inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 tabular-nums">
              {project.badge === 'In development' && <span className="text-amber-300/90 font-sans font-medium">In development</span>}
              {number}
            </span>
          </div>

          {/* Luminous Specular Horizon Beam directly above title */}
          <div
            className="h-[1px] w-full relative z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColor}85, transparent)`,
              boxShadow: `0 0 14px ${themeColor}50`,
            }}
          />

          {/* Card Body */}
          <div className="p-5 flex flex-col flex-1">
            <div className="mb-2">
              <h3
                className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </h3>
              {/* Subtitle is never clipped: it keeps room for two lines so card bodies stay aligned */}
              <p className="label-sm text-slate-400 text-[11px] min-h-[2.1rem] leading-snug mt-1">
                {project.subtitle}
              </p>
            </div>
            {project.metric && (
              <p className="text-[11px] font-mono font-semibold mt-1 text-violet-300">
                {project.metric}
              </p>
            )}
            {/* Cards use the short summary; the full description opens in the detail view */}
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 min-h-[3.6rem] mt-1.5">
              {project.summary || project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-auto pt-3">
              {project.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="skill-pill text-[10px] px-2 py-0.5">{tag}</span>
              ))}
              {project.tags?.length > 3 && (
                <span className="skill-pill text-[10px] px-1.5 py-0.5">+{project.tags.length - 3}</span>
              )}
            </div>
            <div className="flex items-center gap-1 pt-3 mt-3 border-t border-white/5 cursor-pointer" data-cursor="VIEW">
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

  if (!project) return null;
  const accent = categoryAccents[project.category] || categoryAccents['ai-ml'];

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
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky close button — always visible top-right */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 hover:bg-white/10 border border-white/10"
          style={{ background: 'rgba(10,15,30,0.75)', backdropFilter: 'blur(8px)' }}
          aria-label="Close"
          autoFocus
        >
          <X size={15} />
        </button>

        {/* Scrollable content area with Lenis prevention and custom scrollbar */}
        <div
          className="overflow-y-auto flex-1 modal-scrollbar"
          data-lenis-prevent
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="h-48 relative overflow-hidden flex items-center justify-center border-b border-white/5 px-6 py-4"
            style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent.color}30 0%, #0A0F1E 90%)` }}>
            {project.cover && !imageError ? (
              <img
                src={project.cover}
                alt={project.title}
                onError={() => setImageError(true)}
                className={`transition-transform duration-500 ease-out ${
                  project.cover?.endsWith?.('.svg')
                    ? 'max-h-28 w-auto max-w-[85%] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]'
                    : 'w-full h-full object-cover'
                }`}
              />
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
                {filterLabels[project.category] || project.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-7 flex flex-col gap-6">
            {/* Title block */}
            <div>
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h2 className="text-2xl font-bold text-white m-0" style={{ fontFamily: 'var(--font-display)' }}>
                  {project.title}
                </h2>
                {project.badge && (
                  <span className="text-xs font-medium text-violet-200 border border-violet-400/30 bg-violet-500/10 rounded-md px-2 py-0.5">
                    {project.badge}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm m-0">{project.subtitle} · {project.year}</p>
            </div>

            {/* 1. What it is (plain language) */}
            <section>
              <h4 className="label-sm text-slate-500 mb-2">Overview</h4>
              <p className="text-slate-200 leading-relaxed text-[15px] m-0">{project.description}</p>
            </section>

            {/* 2. Results, each explained in words */}
            {project.results?.length > 0 && (
              <section>
                <h4 className="label-sm text-slate-500 mb-3">Results, explained</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-violet-400/25 bg-violet-500/[0.07] p-4">
                      <p className="text-2xl font-bold text-white leading-none m-0" style={{ fontFamily: 'var(--font-display)' }}>
                        {r.value}
                      </p>
                      <p className="text-sm font-semibold text-violet-100 mt-2 mb-0">{r.label}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1.5 mb-0">{r.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Screenshots */}
            {project.gallery?.length > 0 && (
              <section>
                <h4 className="label-sm text-slate-500 mb-3">Screenshots</h4>
                <div className="grid grid-cols-1 gap-3">
                  {project.gallery.map((g) => (
                    <figure key={g.src} className="m-0">
                      <img
                        src={g.src}
                        alt={`${project.title}: ${g.caption}`}
                        loading="lazy"
                        className="w-full rounded-xl border border-white/10"
                        data-cursor-solid
                      />
                      <figcaption className="text-xs text-slate-500 mt-1.5">{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* 4. My role */}
            {project.role && (
              <section>
                <h4 className="label-sm text-slate-500 mb-2">My role</h4>
                <p className="text-slate-300 text-sm leading-relaxed m-0">{project.role}</p>
              </section>
            )}

            {/* 5. How it works / key features */}
            {project.features?.length > 0 && (
              <section>
                <h4 className="label-sm text-slate-500 mb-2.5">Key features</h4>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 6. Tech */}
            <section>
              <h4 className="label-sm text-slate-500 mb-2.5">Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map(tag => <span key={tag} className="skill-pill text-xs">{tag}</span>)}
              </div>
            </section>

            <div className="flex gap-3 pt-4 border-t border-white/10">
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
  const [showAllProjects, setShowAllProjects] = useState(false);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  // The first six stay put; "Show all" opens the rest underneath them.
  const INITIAL_PROJECTS = 6;
  const baseProjects = filtered.slice(0, INITIAL_PROJECTS);
  const extraProjects = filtered.slice(INITIAL_PROJECTS);

  const handleFilter = (cat) => {
    setFilter(cat);
    setShowAllProjects(false);
  };

  return (
    <section id="projects" className="section-1 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-[1140px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <SectionHeader
            label="My Work"
            heading="Featured Projects"
            subtext="Applied ML, LLM, and full-stack systems, each with a measured result."
            theme="dark"
          />

          <div
            className="flex items-center gap-1 p-1 rounded-xl shrink-0 self-start md:self-auto"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {categories.map(cat => (
              <button key={cat} onClick={() => handleFilter(cat)}
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
          <Skeleton.Grid cols={3} count={6} />
        ) : (
          <div>
            <div key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {baseProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} number={String(i + 1).padStart(2, '0')} onClick={setActiveProject} />
              ))}
            </div>

            <AnimatePresence initial={false}>
              {showAllProjects && extraProjects.length > 0 && (
                <motion.div
                  key={`extra-${filter}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                  className="-mx-3 px-3 -mb-6 pb-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pt-6">
                    {extraProjects.map((project, i) => (
                      <ProjectCard key={project.id} project={project} index={i} number={String(INITIAL_PROJECTS + i + 1).padStart(2, '0')} onClick={setActiveProject} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Show More / Show Less Button */}
        {!loading && filtered.length > INITIAL_PROJECTS && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="btn-secondary flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/40 text-sm font-semibold text-white shadow-lg transition-all duration-300"
            >
              <span>{showAllProjects ? 'Show Less' : `Show All ${filtered.length} Projects`}</span>
              <motion.div
                animate={{ rotate: showAllProjects ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown size={15} />
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
