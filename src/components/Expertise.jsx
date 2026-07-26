import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import SpotlightCard from '../components/ui/SpotlightCard';

const capabilities = [
  {
    number: '01',
    title: 'Frontend Engineering',
    description: 'Crafting responsive, high-performance interfaces with React, TypeScript, and Framer Motion.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    accent: '#6366F1',
  },
  {
    number: '02',
    title: 'Backend & Systems',
    description: 'Building robust REST APIs, secure authentication, and scalable database architectures.',
    tags: ['Node.js', 'Express', 'MongoDB', 'MySQL'],
    accent: '#10B981',
  },
  {
    number: '03',
    title: 'AI & Machine Learning',
    description: 'Developing multi-agent architectures, RAG pipelines, and LLM fine-tuning workflows for real-world impact.',
    tags: ['LLMs', 'RAG', 'NLP', 'Python', 'LangChain'],
    accent: '#8B5CF6',
  },
  {
    number: '04',
    title: 'Cloud & DevOps',
    description: 'Containerizing services with Docker, managing CI/CD pipelines, and deploying on AWS infrastructure.',
    tags: ['Docker', 'AWS', 'GitHub Actions', 'CI/CD'],
    accent: '#F59E0B',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section-1 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Sticky header */}
          <div className="lg:w-80 lg:sticky lg:top-28 lg:self-start shrink-0">
            <SectionHeader
              label="What I Do"
              heading="Engineering across the full stack"
              subtext="From machine learning models to pixel-perfect interfaces — end-to-end."
              theme="dark"
            />
          </div>

          {/* 2×2 Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <SpotlightCard className="card p-7 h-full flex flex-col gap-4 group">
                  <div className="flex items-start justify-between">
                    <span className="label-sm" style={{ color: cap.accent, fontFamily: 'var(--font-mono)' }}>{cap.number}</span>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: `${cap.accent}14`, border: `1px solid ${cap.accent}22` }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: cap.accent }} />
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {cap.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {cap.tags.map(tag => (
                      <span key={tag} className="skill-pill text-xs">{tag}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
