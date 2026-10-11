import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Heading: each word slides up out of its own mask, one after another.
const headingVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const wordVariants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.65, ease: EASE } },
};

// Accent bar draws from left to right under the heading.
const barVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: EASE, delay: 0.25 } },
};

export default function SectionHeader({ label, heading, subtext, theme: _theme = 'dark', className = '' }) {
  const words = String(heading).split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`flex flex-col gap-3 ${className}`}
    >
      {label && (
        <motion.span variants={itemVariants} className="section-label">
          {label}
        </motion.span>
      )}

      <motion.h2
        variants={headingVariants}
        className="heading-lg text-white"
        style={{ fontFamily: 'var(--font-display)' }}
        aria-label={heading}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      <motion.span
        variants={barVariants}
        aria-hidden="true"
        className="block h-[3px] w-14 rounded-full origin-left"
        style={{ background: 'linear-gradient(90deg, #8B5CF6, #6366F1)' }}
      />

      {subtext && (
        <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed max-w-xl">
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}
