import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, GraduationCap } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import DotGrid from './effects/DotGrid';
import { useEducation } from '../hooks/useEducation';

const EASE = [0.22, 1, 0.36, 1];

export default function Education() {
  const { education, loading } = useEducation();

  return (
    <section id="education" className="section-1 relative overflow-hidden py-20 md:py-24 px-6 md:px-12 border-t border-white/5">
      <DotGrid theme="dark" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          label="Education"
          heading="Academic background"
          subtext="B.Tech in Computer Science and Engineering (AI & ML), with a strong foundation in mathematics and science."
          theme="dark"
          className="mb-10"
        />

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 rounded-2xl bg-white/[0.03] border border-white/5" />
            ))}
          </div>
        ) : (
          <ol className="flex flex-col gap-4 list-none p-0 m-0">
            {education.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
                className="rounded-2xl border border-white/10 bg-[#0D1426] p-5 md:p-6 transition-colors duration-300 hover:border-violet-400/40"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.logo ? (
                        <img src={item.logo} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                      ) : (
                        <GraduationCap size={22} className="text-slate-700" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        {item.institution}
                      </h3>
                      <p className="text-sm text-slate-300 mt-0.5">{item.degree}</p>
                      {item.campus && <p className="text-xs text-slate-500 mt-0.5">{item.campus}</p>}
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:text-right shrink-0">
                    {item.grade && (
                      /* Marks stand out a little: tinted chip, slightly bolder, no icons or glow */
                      <p className="inline-flex items-baseline gap-2 rounded-lg border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-sm m-0">
                        <span className="text-xs uppercase tracking-wide text-violet-200/80">{item.gradeLabel || 'Grade'}</span>
                        <span className="font-semibold text-white text-base">{item.grade}</span>
                      </p>
                    )}
                    <p className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={12} className="text-slate-500" />
                      {item.period}
                    </p>
                    {item.location && (
                      <p className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={12} />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
