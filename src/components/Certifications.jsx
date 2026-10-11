import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import Lightbox from '../components/ui/Lightbox';
import { useCertificates } from '../hooks/useCertificates';

// One violet accent for every category (the site's theme colour); categories are told apart by their label text.
const VIOLET = {
  accent: '#A78BFA',
  border: 'rgba(139,92,246,0.35)',
  bg: 'rgba(139,92,246,0.12)',
  glow: 'rgba(139,92,246,0.22)',
};

const categoryConfig = {
  'claude':      { ...VIOLET, label: 'Anthropic Claude Courses',  badge: 'Anthropic' },
  'scaler':      { ...VIOLET, label: 'Scaler Workshops',          badge: 'Scaler Academy' },
  'coursera':    { ...VIOLET, label: 'Coursera & Google',         badge: 'Google · Coursera' },
  'simulations': { ...VIOLET, label: 'Job Simulations',           badge: 'Job simulation' },
  'hackathons':  { ...VIOLET, label: 'Hackathons',                badge: 'Hackathon' },
  'workshops':   { ...VIOLET, label: 'Workshops & Bootcamps',     badge: 'Workshop' },
};

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'claude', label: 'Claude Courses' },
  { id: 'scaler', label: 'Scaler Workshops' },
  { id: 'coursera', label: 'Coursera' },
  { id: 'simulations', label: 'Job Simulations' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'workshops', label: 'Workshops' },
];

function CertCard({ cert, index, onClick }) {
  const isPdf = cert.file?.toLowerCase().endsWith('.pdf');
  // Use high-res image thumbnail if available, otherwise file
  const imageName = cert.image || cert.file;
  const fullSrc = `/assets/certificates/${imageName}`;
  // Small WebP thumbnail for the card; the full image/PDF opens in the lightbox.
  const previewSrc = `/assets/certificates/thumbs/${imageName.replace(/\.[^.]+$/, '')}.webp`;
  const cat = categoryConfig[cert.category] || categoryConfig['scaler'];

  // New cards fade up in a cascade; cards that already exist glide to their new grid slot (layout spring).
  const delay = Math.min(index * 0.04, 0.45);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        layout: { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 },
        default: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={() => onClick(cert)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(cert); } }}
      className="h-full cursor-pointer max-w-[99%] mx-auto w-full"
      role="button"
      aria-label={`${cert.title}: view certificate`}
      tabIndex={0}
      data-cursor="CERT"
    >
      <SpotlightCard
        className="h-full flex flex-col overflow-hidden group rounded-[22px] border border-white/9 transition-all duration-300 relative hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)]"
        style={{
          // Solid fill instead of a 28px backdrop blur: blur on every card is what makes scrolling stutter.
          background: '#0D1424',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Corner description: plain text on the card's own background, no shaded strip and no overlay */}
        <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2.5">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-100 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
            <span className="truncate">{cert.label || cat.badge}</span>
          </span>
          {isPdf && (
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 shrink-0">PDF</span>
          )}
        </div>

        {/* Certificate preview */}
        <div
          className="h-52 relative overflow-hidden flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at 50% 35%, ${cat.glow} 0%, rgba(10, 16, 32, 0.5) 60%, rgba(10, 16, 32, 0.95) 100%)`,
          }}
        >
          {previewSrc ? (
            <img
              src={previewSrc}
              alt={cert.title}
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
              onError={e => {
                if (!e.target.dataset.fallback) {
                  e.target.dataset.fallback = '1';
                  e.target.src = fullSrc;
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${cat.accent}18`, borderColor: `${cat.accent}40` }}
              >
                <FileText size={22} style={{ color: cat.accent }} />
              </div>
              <span className="label-sm text-slate-400 tracking-wider text-[10px]">Certificate PDF</span>
            </div>
          )}
        </div>

        {/* Luminous Specular Horizon Beam */}
        <div
          className="h-[1px] w-full relative z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${cat.accent}80, transparent)`,
            boxShadow: `0 0 12px ${cat.accent}45`,
          }}
        />

        {/* Card Content */}
        <div className="p-5 flex flex-col gap-2 flex-1">
          <p className="label-sm font-medium" style={{ color: cat.accent }}>{cert.issuer}</p>
          <h3
            className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {cert.title}
          </h3>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
            <span className="label-sm text-slate-500">{cert.date}</span>
            <span
              className="label-sm transition-colors flex items-center gap-1 font-medium group-hover:text-white"
              style={{ color: cat.accent }}
            >
              View Certificate →
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

  // Balanced initial sampling: 1 representative certificate from each category
  const getInitialAllSample = (certs) => {
    const desiredCategories = ['coursera', 'claude', 'scaler', 'simulations', 'hackathons', 'workshops'];
    const sample = [];
    const usedFiles = new Set();

    for (const cat of desiredCategories) {
      const item = certs.find(c => c.category === cat && !usedFiles.has(c.file));
      if (item) {
        sample.push(item);
        usedFiles.add(item.file);
      }
    }
    for (const c of certs) {
      if (sample.length >= INITIAL) break;
      if (!usedFiles.has(c.file)) {
        sample.push(c);
        usedFiles.add(c.file);
      }
    }
    return sample;
  };

  const keyOf = (c) => c.file || c.title;

  // Importance order used when everything is shown: Google/Coursera specializations, then job
  // simulations, Anthropic, Scaler, hackathon and workshops. Array.sort is stable, so the original
  // order is kept inside a group.
  const IMPORTANCE = ['coursera', 'simulations', 'claude', 'scaler', 'hackathons', 'workshops'];
  const rank = (c) => {
    const i = IMPORTANCE.indexOf(c.category);
    return i === -1 ? IMPORTANCE.length : i;
  };
  const orderedAll = [...filtered].sort((a, b) => rank(a) - rank(b));

  // Collapsed: one representative from each category. Expanded: every certificate, most important first.
  const baseItems = filter === 'all' ? getInitialAllSample(certificates) : orderedAll.slice(0, INITIAL);
  const items = showAll ? orderedAll : baseItems;

  return (
    <section id="certifications" className="section-2 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-[1140px] mx-auto relative z-10">
        {/* Header + Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Certifications"
            heading={loading ? 'Certifications' : `${certificates.length} Certifications`}
            subtext="Courses and simulations from Google, Anthropic, Scaler, BCG X, and Walmart, plus hackathon participation. Click a card to open the certificate."
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
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    filter === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
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
                    {tab.label} <span className="opacity-75 text-[10px]">({count})</span>
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
          // One grid. On "Show all" the six visible cards glide to their new places (layout animation)
          // while the other thirteen fade up in a short cascade.
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((cert, i) => (
              <CertCard key={keyOf(cert)} cert={cert} index={i} onClick={setLightboxCert} />
            ))}
          </div>
        )}

        {/* Show More / Show Less Button */}
        {!loading && filtered.length > INITIAL && (
          <div className="flex justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/40 text-sm font-semibold text-white shadow-lg transition-all duration-300"
            >
              <span>{showAll ? 'Show Less' : `Show All ${filtered.length} Credentials`}</span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown size={15} />
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>

      {/* Interactive Lightbox / Document Modal */}
      <AnimatePresence>
        {lightboxCert && (
          <Lightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
