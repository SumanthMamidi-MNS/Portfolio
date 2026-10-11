import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ZoomIn, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Lightbox({ cert, onClose }) {
  const [zoomed, setZoomed] = useState(false);
  const isPdf = cert?.file?.toLowerCase().endsWith('.pdf');
  const pdfSrc = isPdf ? `/assets/certificates/${cert?.file}` : null;
  const imageSrc = cert?.image ? `/assets/certificates/${cert?.image}` : `/assets/certificates/${cert?.file}`;

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
          style={{ background: 'rgba(5,9,18,0.88)', backdropFilter: 'blur(16px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/40">
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
                <button
                  onClick={() => setZoomed(!zoomed)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                  title="Toggle zoom"
                >
                  <ZoomIn size={16} />
                </button>
                {pdfSrc ? (
                  <a
                    href={pdfSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 hover:bg-indigo-500/25 transition-all"
                    title="Open original PDF"
                  >
                    <FileText size={14} /> PDF
                  </a>
                ) : (
                  <a
                    href={imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                    title="Open full image"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-all ml-1"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* High-Resolution Certificate Preview */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40 min-h-[360px] md:min-h-[520px]">
              <motion.img
                src={imageSrc}
                alt={cert.title}
                animate={{ scale: zoomed ? 1.5 : 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg border border-white/5"
                style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
                onClick={() => setZoomed(!zoomed)}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/5 bg-slate-950/40">
              <span className="label-sm text-slate-400">{cert.date}</span>
              <div className="flex items-center gap-3">
                {pdfSrc && (
                  <a
                    href={pdfSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <ExternalLink size={13} /> View Original Document
                  </a>
                )}
                <span className="label-sm text-violet-400">Certificate</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
