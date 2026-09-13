import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import Lightbox from '../components/ui/Lightbox';
import { useCertificates } from '../hooks/useCertificates';

const categoryConfig = {
  'ai-ml': {
    label: 'AI & Agents',
    badge: 'AI / ML',
    accent: '#8B5CF6',
    border: 'rgba(139,92,246,0.3)',
    bg: 'rgba(139,92,246,0.1)',
  },
  'systems': {
    label: 'Systems & Architecture',
    badge: 'Systems',
    accent: '#10B981',
    border: 'rgba(16,185,129,0.3)',
    bg: 'rgba(16,185,129,0.1)',
  },
  'hackathons': {
    label: 'Hackathons',
    badge: 'Hackathon',
    accent: '#F59E0B',
    border: 'rgba(245,158,11,0.3)',
    bg: 'rgba(245,158,11,0.1)',
  },
  'workshops': {
    label: 'Workshops & Bootcamps',
    badge: 'Workshop',
    accent: '#06B6D4',
    border: 'rgba(6,182,212,0.3)',
    bg: 'rgba(6,182,212,0.1)',
  },
};

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI & Agents' },
  { id: 'systems', label: 'Systems & Cloud' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'workshops', label: 'Workshops' },
];

function CertCard({ cert, index, onClick }) {
  const isPdf = cert.file?.toLowerCase().endsWith('.pdf');
  const previewSrc = !isPdf ? `/assets/certificates/${cert.file}` : null;
  const cat = categoryConfig[cert.category] || categoryConfig['ai-ml'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick(cert)}
      data-cursor="View"
      className="h-full"
    >
      <SpotlightCard className="card flex flex-col overflow-hidden group h-full">
        {/* Top Preview Banner */}
        <div
          className="h-40 relative overflow-hidden flex items-center justify-center border-b border-white/5"
          style={{ background: 'rgba(99,102,241,0.05)' }}
        >
          {previewSrc ? (
            <img
              src={previewSrc}
              alt={cert.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FileText size={28} className="text-indigo-400/50" />
              <span className="label-sm text-slate-600">PDF Certificate</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wide border backdrop-blur-md"
              style={{
                color: cat.accent,
                borderColor: cat.border,
                background: 'rgba(10,15,30,0.7)',
              }}
            >
              {cat.badge}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <p className="label-sm text-violet-400">{cert.issuer}</p>
          <h3
            className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {cert.title}
          </h3>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
            <span className="label-sm text-slate-600">{cert.date}</span>
            <span className="label-sm text-violet-400 group-hover:text-violet-300 transition-colors">
              View →
            </span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Certifications() {
  const { certificates, loading } = useCertificates();
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxCert, setLightboxCert] = useState(null);
  const INITIAL = 6;

  const filtered = filter === 'all'
    ? certificates
    : certificates.filter(c => c.category === filter);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  return (
    <section id="certifications" className="section-2 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header + Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Credentials"
            heading={loading ? 'Certifications' : `${certificates.length} Verified Credentials`}
            subtext="Specialized certifications across Multi-Agent Systems, MLOps, System Design, Hackathons, and AI Bootcamps."
            theme="dark"
          />

          {/* Division Filter Tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-xl shrink-0 self-start md:self-auto overflow-x-auto max-w-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {filterTabs.map(tab => {
              const count = tab.id === 'all'
                ? certificates.length
                : certificates.filter(c => c.category === tab.id).length;

              if (count === 0 && !loading) return null;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setFilter(tab.id);
                    setShowAll(false);
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    filter === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {filter === tab.id && (
                    <motion.div
                      layoutId="cert-filter-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab.label} <span className="opacity-70 text-[10px]">({count})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        {loading ? (
          <Skeleton.Grid cols={3} count={6} />
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((cert, i) => (
                <CertCard key={cert.file || i} cert={cert} index={i} onClick={setLightboxCert} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Show More / Show Less Button */}
        {!loading && filtered.length > INITIAL && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary flex items-center gap-2"
            >
              {showAll ? 'Show Less' : `Show All ${filtered.length}`}
              <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={15} />
              </motion.div>
            </button>
          </div>
        )}
      </div>

      {/* Interactive Lightbox / PDF Modal */}
      <AnimatePresence>
        {lightboxCert && (
          <Lightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
