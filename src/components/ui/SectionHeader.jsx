import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function SectionHeader({ label, heading, subtext, theme: _theme = 'dark', className = '' }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex flex-col gap-3 ${className}`}
    >
      {label && (
        <motion.span variants={itemVariants} className="section-label flex items-center gap-3">
          {/* Animated accent line */}
          <motion.span
            variants={lineVariants}
            style={{
              display: 'inline-block',
              width: '1.5rem',
              height: '1px',
              background: 'var(--color-accent-3)',
              originX: 0,
            }}
          />
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={itemVariants}
        className="heading-lg text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {heading}
      </motion.h2>
      {subtext && (
        <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed max-w-xl">
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}
