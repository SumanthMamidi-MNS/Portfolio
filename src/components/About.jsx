import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import SpotlightCard from '../components/ui/SpotlightCard';
import Counter from '../components/ui/Counter';
import Skeleton from '../components/ui/Skeleton';
import { useProfile } from '../hooks/useProfile';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const defaultStats = [
  { value: 5, suffix: '+', label: 'Projects Shipped' },
  { value: 14, suffix: '',  label: 'Certifications' },
  { value: 2,  suffix: '+', label: 'Years Building' },
];

export default function About() {
  const { profile, loading } = useProfile();

  return (
    <section id="about" className="section-2 relative overflow-hidden py-24 md:py-32 px-6 md:px-12">
      <DotGrid theme="dark" />

      {/* Subtle left-side accent glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── Left: Profile image ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-72 shrink-0"
          >
            <div className="relative">
              {/* Glow ring behind image */}
              <div className="absolute -inset-3 rounded-2xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

              <div className="glass rounded-2xl overflow-hidden aspect-[3/4] relative">
                <img
                  src={profile?.avatar || '/assets/profile/Profile.png'}
                  alt="Sumanth Mamidi"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-5 -right-4 glass rounded-xl px-4 py-3 shadow-xl"
              >
                <p className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                  {profile?.name || 'Sumanth Mamidi'}
                </p>
                <p className="label-sm text-violet-400 mt-0.5">AI/ML Engineer</p>
              </motion.div>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -left-4 flex items-center gap-1.5 px-3 py-2 rounded-xl text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
              >
                <MapPin size={11} />
                <span className="label-sm" style={{ fontSize: '0.6rem' }}>{profile?.location || 'Chennai, India'}</span>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-10">
              {profile?.social?.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/50 transition-all">
                  <GithubIcon size={15} />
                </a>
              )}
              {profile?.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="LinkedIn"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/50 transition-all">
                  <LinkedInIcon size={15} />
                </a>
              )}
              {profile?.social?.instagram && (
                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer" data-cursor="Instagram"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/50 transition-all">
                  <InstagramIcon size={15} />
                </a>
              )}
            </div>
          </motion.div>

          {/* ── Right: Bio ── */}
          <div className="flex-1 flex flex-col gap-8">
            <SectionHeader
              label="About Me"
              heading="Turning complex problems into elegant solutions"
              theme="dark"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <p className="text-slate-300 leading-relaxed">
                {profile?.bio || 'I build intelligent systems, neural network pipelines, and high-performance interactive interfaces. From closed-loop multi-agent security engines to quantum visualization tools — I combine deep ML expertise with full-stack engineering.'}
              </p>
              <p className="text-slate-500 leading-relaxed text-sm">
                Based in Chennai — open to remote collaboration worldwide. I focus on practical AI applications that solve real engineering problems.
              </p>
            </motion.div>

            {/* Stats — with animated counters */}
            {loading ? (
              <Skeleton.StatRow count={3} />
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {(profile?.stats || defaultStats).map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                  >
                    <SpotlightCard className="card p-5 text-center">
                      <p
                        className="text-2xl md:text-3xl font-black text-white"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <Counter
                          value={stat.value}
                          suffix={stat.suffix || ''}
                          prefix={stat.prefix || ''}
                        />
                      </p>
                      <p className="label-sm text-slate-500 mt-1.5 leading-tight">{stat.label}</p>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
