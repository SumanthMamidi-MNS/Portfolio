import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import GradientMesh from '../components/effects/GradientMesh';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import { useSkills } from '../hooks/useSkills';

const EASE = [0.22, 1, 0.36, 1];

// The four tints from the original design, assigned by position so renaming a category never loses its colour.
const ACCENTS = [
  { accent: '#8B5CF6', glow: 'rgba(139,92,246,0.12)' }, // violet
  { accent: '#10B981', glow: 'rgba(16,185,129,0.11)' }, // emerald
  { accent: '#F59E0B', glow: 'rgba(245,158,11,0.10)' }, // amber
  { accent: '#EF4444', glow: 'rgba(239,68,68,0.10)' },  // red
];

export default function Skills() {
  const { skills, loading } = useSkills();

  return (
    <section id="skills" className="section-2 relative overflow-hidden py-20 md:py-28 px-6 md:px-12 border-t border-white/5">
      <DotGrid theme="dark" />
      <GradientMesh className="opacity-60" />

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
          /* Four tinted boxes in a 2 x 2 grid. Each box holds at most four lines of tools. */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(skills.categories || []).slice(0, 4).map((category, i) => {
              const tone = ACCENTS[i % ACCENTS.length];
              return (
                <motion.article
                  key={category.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  transition={{ delay: (i % 2) * 0.1, duration: 0.55, ease: EASE }}
                >
                  <SpotlightCard
                    spotColor={`${tone.accent}26`}
                    className="rounded-2xl border border-white/10 hover:border-white/20 transition-colors duration-300 p-6 md:p-7 h-full"
                    style={{
                      background: `linear-gradient(135deg, ${tone.glow}, transparent 70%), rgba(13, 20, 38, 0.62)`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: tone.accent, boxShadow: `0 0 10px ${tone.accent}80` }}
                      />
                      <h3 className="label-sm m-0" style={{ color: tone.accent }}>
                        {category.name}
                      </h3>
                    </div>
                    {category.blurb && (
                      <p className="text-sm text-slate-400 leading-relaxed mt-2.5 mb-0">{category.blurb}</p>
                    )}

                    <ul className="flex flex-wrap gap-2 list-none p-0 mt-5 mb-0">
                      {category.skills.map((skill, si) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9, y: 8 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          whileHover={{
                            y: -2,
                            color: tone.accent,
                            borderColor: `${tone.accent}66`,
                            backgroundColor: `${tone.accent}14`,
                          }}
                          transition={{ delay: 0.2 + si * 0.025, duration: 0.35, ease: EASE }}
                          className="skill-pill text-xs"
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
