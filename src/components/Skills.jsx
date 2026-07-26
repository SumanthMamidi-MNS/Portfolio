import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import GradientMesh from '../components/effects/GradientMesh';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import { useSkills } from '../hooks/useSkills';

const categoryConfig = {
  'ai-ml':     { accent: '#8B5CF6', glow: 'rgba(139,92,246,0.08)',  label: 'AI & ML' },
  'frontend':  { accent: '#10B981', glow: 'rgba(16,185,129,0.08)',  label: 'Frontend' },
  'backend':   { accent: '#F59E0B', glow: 'rgba(245,158,11,0.08)',  label: 'Backend' },
  'devops':    { accent: '#EF4444', glow: 'rgba(239,68,68,0.08)',   label: 'DevOps & Cloud' },
};

export default function Skills() {
  const { skills, loading } = useSkills();

  return (
    <section id="skills" className="section-2 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />
      <GradientMesh className="opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          label="Technical Stack"
          heading="Skills & Technologies"
          subtext="Full-stack expertise across AI/ML, frontend, backend, and cloud infrastructure."
          theme="dark"
          className="mb-14"
        />

        {loading ? (
          <Skeleton.Grid cols={2} count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(skills.categories || []).map((category, i) => {
              const config = categoryConfig[category.id] || categoryConfig['frontend'];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <SpotlightCard
                    className="card p-6 h-full"
                    style={{ background: `linear-gradient(135deg, ${config.glow}, transparent)` }}
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-2 h-2 rounded-full" style={{ background: config.accent }} />
                      <span className="label-sm" style={{ color: config.accent }}>
                        {config.label || category.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.06, y: -1 }}
                          className="skill-pill text-xs"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
