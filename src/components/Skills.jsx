import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import Skeleton from '../components/ui/Skeleton';
import { useSkills } from '../hooks/useSkills';

const EASE = [0.22, 1, 0.36, 1];

export default function Skills() {
  const { skills, loading } = useSkills();

  return (
    <section id="skills" className="section-2 relative overflow-hidden py-20 md:py-28 px-6 md:px-12 border-t border-white/5">
      <DotGrid theme="dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          label="Technical Stack"
          heading="Skills & Technologies"
          subtext="Four areas, and every tool in them has been used in the projects above."
          theme="dark"
          className="mb-12"
        />

        {loading ? (
          <Skeleton.Grid cols={2} count={4} />
        ) : (
          /* Four boxes in a 2 x 2 grid. Each box holds at most four lines of tools. */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(skills.categories || []).slice(0, 4).map((category, i) => (
              <motion.article
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.55, ease: EASE }}
                className="group rounded-2xl border border-white/10 bg-[#0D1426] p-6 md:p-7 transition-all duration-300 hover:border-violet-400/45 hover:shadow-[0_14px_40px_-16px_rgba(139,92,246,0.5)]"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm font-mono text-violet-300/80 mt-1 tabular-nums" aria-hidden="true">
                    {category.number}
                  </span>
                  <div className="min-w-0">
                    <h3
                      className="text-lg font-semibold text-white leading-snug m-0"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {category.name}
                    </h3>
                    {category.blurb && (
                      <p className="text-sm text-slate-400 leading-relaxed mt-1.5 mb-0">{category.blurb}</p>
                    )}
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2 list-none p-0 mt-5 mb-0">
                  {category.skills.map((skill, si) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + si * 0.025, duration: 0.35, ease: EASE }}
                      className="skill-pill text-xs"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
