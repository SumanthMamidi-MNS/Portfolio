import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import TiltCard from '../components/ui/TiltCard';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import { useProfile } from '../hooks/useProfile';
import { useProjects } from '../hooks/useProjects';
import { useCertificates } from '../hooks/useCertificates';

const EASE = [0.22, 1, 0.36, 1];

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const DEFAULT_ABOUT = [
  "I'm Sumanth, a second-year B.Tech CSE (AI & ML) student at SRM Institute of Science and Technology, building applied ML and multi-agent LLM systems.",
  'My projects span ocean-temperature reconstruction, multi-camera vehicle tracking, citation-verified legal RAG and agro-weather downscaling, each measured against independent ground truth.',
  'Based in Chennai and looking for an internship in AI systems, machine learning or full-stack engineering.',
];

export default function About() {
  const { profile, loading: profileLoading } = useProfile();
  const { projects, loading: projectsLoading } = useProjects();
  const { certificates, loading: certsLoading } = useCertificates();

  const loading = profileLoading || projectsLoading || certsLoading;

  const featuredCount = projects?.filter((p) => p.featured).length || 6;
  const certCount = certificates?.length || 19;
  const paragraphs = profile?.about?.length ? profile.about : DEFAULT_ABOUT;

  const stats = [
    { value: 1, label: 'Published paper', note: 'AVE Trends, 2026' },
    { value: featuredCount, label: 'Featured projects', note: 'With measured results' },
    { value: certCount, label: 'Certifications', note: 'Google, Anthropic, Scaler' },
  ];

  return (
    <section id="about" className="section-2 relative overflow-hidden py-20 md:py-28 px-6 md:px-12">
      <DotGrid theme="dark" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[17rem_1fr] gap-10 lg:gap-20 items-start">

          {/* Photo: wipes in from the top while the image settles; a status tab floats on its top edge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full max-w-xs mx-auto lg:mx-0"
          >
            {/* Floating tab: touches the photo's top edge, drifts gently up and down */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 ml-4 -mb-3 w-fit"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0A0F1E]/90 border border-violet-400/45 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to internships
              </span>
            </motion.div>

            {/* Soft 3D tilt with a pointer glare (instead of a colour-inverting cursor) makes the photo feel
                like a physical card; a violet edge brightens on hover. */}
            <TiltCard maxTilt={7} radius={16}>
              <motion.div
                data-cursor-solid
                initial={{ clipPath: 'inset(0 0 100% 0 round 16px)' }}
                whileInView={{ clipPath: 'inset(0 0 0% 0 round 16px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/15 bg-white/[0.03] shadow-[0_18px_50px_-18px_rgba(99,102,241,0.45)]"
              >
                <motion.img
                  src={profile?.avatar || '/assets/profile/Profile.png'}
                  alt="Sumanth Mamidi"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </TiltCard>
            {/* Compact intro box under the photo: name and one line, see-through glass */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="mt-2.5 rounded-xl border border-white/12 px-4 py-2.5 backdrop-blur-md"
              style={{
                background: 'rgba(15, 22, 41, 0.45)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 26px -16px rgba(0,0,0,0.55)',
              }}
            >
              <p className="font-semibold text-white leading-tight m-0" style={{ fontFamily: 'var(--font-display)' }}>
                {profile?.name || 'Sumanth Mamidi'}
              </p>
              <p className="label-sm text-violet-300 mt-1 mb-0 leading-snug">
                {profile?.role || 'AI Systems & ML Engineering Student'}
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-7">
            <SectionHeader label="About" heading="Hi, I'm Sumanth" theme="dark" />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              className="flex flex-col gap-4 max-w-2xl"
            >
              {paragraphs.map((text, i) => (
                <p key={i} className={i === 0 ? 'text-slate-200 leading-relaxed text-lg' : 'text-slate-400 leading-relaxed'}>
                  {text}
                </p>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button variant="primary" href={profile?.resume || '/assets/resume/Sumanth_Mamidi_Resume.pdf'}>
                <Download size={15} /> Download resume
              </Button>
              <Button variant="secondary" href={`mailto:${profile?.email || 'sumanthmamidi77@gmail.com'}`}>
                <Mail size={15} /> Email me
              </Button>
              <div className="flex items-center gap-2 ml-1">
                {profile?.social?.github && (
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-400/50 transition-colors">
                    <GithubIcon />
                  </a>
                )}
                {profile?.social?.linkedin && (
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-400/50 transition-colors">
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Key facts: three clearly framed tiles with a violet top edge. Numbers are shown as they are
                (no count-up), and only the border and a soft glow react on hover. */}
            {loading ? (
              <Skeleton.StatRow count={3} />
            ) : (
              <dl className="grid grid-cols-3 gap-3 md:gap-4 mt-1 max-w-2xl m-0">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.1 }}
                    className="group relative overflow-hidden rounded-xl border border-violet-400/25 bg-gradient-to-b from-violet-500/[0.12] to-violet-500/[0.03] px-4 py-4 transition-all duration-300 hover:border-violet-300/60 hover:shadow-[0_10px_30px_-12px_rgba(139,92,246,0.55)]"
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400" />
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="m-0">
                      <p className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                        {stat.value}
                      </p>
                      <p className="text-sm font-semibold text-violet-100 mt-2.5">{stat.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{stat.note}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
