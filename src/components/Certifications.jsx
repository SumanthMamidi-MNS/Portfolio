import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import Lightbox from '../components/ui/Lightbox';
import { useCertificates } from '../hooks/useCertificates';

function CertCard({ cert, index, onClick }) {
  const isPdf = cert.file?.toLowerCase().endsWith('.pdf');
  const previewSrc = !isPdf ? `/assets/certificates/${cert.file}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick(cert)}
      data-cursor="View"
    >
      <SpotlightCard className="card flex flex-col overflow-hidden group h-full">
        <div className="h-40 relative overflow-hidden flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.05)' }}>
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
              <span className="label-sm text-slate-600">PDF</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-2 flex-1">
          <p className="label-sm text-violet-400">{cert.issuer}</p>
          <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}>
            {cert.title}
          </h3>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
            <span className="label-sm text-slate-600">{cert.date}</span>
            <span className="label-sm text-violet-400 group-hover:text-violet-300 transition-colors">View →</span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Certifications() {
  const { certificates, loading } = useCertificates();
  const [showAll, setShowAll] = useState(false);
  const [lightboxCert, setLightboxCert] = useState(null);
  const INITIAL = 6;

  const visible = showAll ? certificates : certificates.slice(0, INITIAL);

  return (
    <section id="certifications" className="section-2 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            label="Credentials"
            heading={loading ? 'Certifications' : `${certificates.length} Certifications`}
            subtext="Verified qualifications across MLOps, AI engineering, cloud, and architecture."
            theme="dark"
          />
        </div>

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

        {!loading && certificates.length > INITIAL && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary flex items-center gap-2"
            >
              {showAll ? 'Show Less' : `Show All ${certificates.length}`}
              <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={15} />
              </motion.div>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxCert && (
          <Lightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
