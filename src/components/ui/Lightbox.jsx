import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export default function Lightbox({ cert, onClose }) {
  const [zoomed, setZoomed] = useState(false);
  const isPdf = cert?.file?.toLowerCase().endsWith('.pdf');
  const src = `/assets/certificates/${cert?.file}`;

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          onClick={onClose}
          style={{ background: 'rgba(5,9,18,0.85)', backdropFilter: 'blur(16px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl overflow-hidden w-full max-w-2xl max-h-[88vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div>
                <p className="label-sm text-violet-400 mb-0.5">{cert.issuer}</p>
                <h3
                  className="text-base font-semibold text-white leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cert.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {!isPdf && (
                  <button
                    onClick={() => setZoomed(!zoomed)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                    title="Toggle zoom"
                  >
                    <ZoomIn size={15} />
                  </button>
                )}
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                  title="Open in new tab"
                >
                  <ExternalLink size={15} />
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-2 flex items-center justify-center bg-black/20">
              {isPdf ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center px-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <ExternalLink size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">{cert.title}</p>
                    <p className="text-slate-400 text-sm mb-6">This certificate is a PDF document.</p>
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Open PDF
                    </a>
                  </div>
                </div>
              ) : (
                <motion.img
                  src={src}
                  alt={cert.title}
                  animate={{ scale: zoomed ? 1.6 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
                  onClick={() => setZoomed(!zoomed)}
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
              <span className="label-sm text-slate-500">{cert.date}</span>
              <span className="label-sm text-violet-400">Verified Certificate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
