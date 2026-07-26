import { motion } from 'framer-motion';

export default function SectionHeader({ label, heading, subtext, theme = 'dark', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col gap-3 ${className}`}
    >
      {label && (
        <span className="section-label">{label}</span>
      )}
      <h2
        className="heading-lg text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {heading}
      </h2>
      {subtext && (
        <p className="text-slate-400 text-base leading-relaxed max-w-xl">{subtext}</p>
      )}
    </motion.div>
  );
}
