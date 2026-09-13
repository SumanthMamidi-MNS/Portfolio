import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, ArrowDown, Volume2, VolumeX } from 'lucide-react';
import Button from '../components/ui/Button';
import GradientMesh from '../components/effects/GradientMesh';
import DotGrid from '../components/effects/DotGrid';
import TiltCard from '../components/ui/TiltCard';
import SpotlightCard from '../components/ui/SpotlightCard';
import ScrambleText from '../components/ui/ScrambleText';
import SplitText from '../components/ui/SplitText';
import { useProfile } from '../hooks/useProfile';
import { usePreloader } from '../context/PreloaderContext';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const { profile } = useProfile();
  const { isLoaded } = usePreloader();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const targetMuted = !videoRef.current.muted;
      videoRef.current.muted = targetMuted;
      setMuted(targetMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play unmuted automatically on startup
    video.muted = false;
    setMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay unmuted was blocked by browser policies.
        // Fallback to muted autoplay.
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});

        // Listen for first interaction (click/tap) to unmute
        const enableAudio = () => {
          video.muted = false;
          setMuted(false);
          video.play().catch(() => {});
          document.removeEventListener('click', enableAudio);
          document.removeEventListener('touchstart', enableAudio);
        };
        document.addEventListener('click', enableAudio, { passive: true });
        document.addEventListener('touchstart', enableAudio, { passive: true });
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-0 relative min-h-screen flex items-center pt-28 pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Layered backgrounds with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <DotGrid theme="dark" />
        <GradientMesh />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Bio ── */}
          <motion.div
            style={{ y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="flex-1 flex flex-col items-start gap-7 lg:max-w-xl"
          >
            <motion.div variants={itemVariants}>
              <span className="status-badge">
                <span className="status-dot" />
                {profile?.status || 'Available for AI Engineering roles'}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h1 className="heading-xl text-white">
                <SplitText
                  text="I build"
                  trigger="onLoad"
                  isLoaded={isLoaded}
                  delay={0}
                  stagger={0.1}
                />{' '}
                {/* Animated shimmer "intelligent" */}
                <span className="gradient-text-animated">
                  <SplitText
                    text="intelligent"
                    trigger="onLoad"
                    isLoaded={isLoaded}
                    delay={0.2}
                    stagger={0.06}
                  />
                </span>
                <br />
                <SplitText
                  text="systems."
                  trigger="onLoad"
                  isLoaded={isLoaded}
                  delay={0.5}
                  stagger={0.1}
                />
              </h1>
              <p
                className="text-lg font-medium text-slate-400"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <ScrambleText text="AI/ML Engineer & Full-Stack Developer" trigger="inView" speed={35} />
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base text-slate-400 leading-relaxed">
              {profile?.bio || 'Building closed-loop multi-agent systems, neural network pipelines, and high-performance interactive interfaces from Chennai, India.'}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <Button variant="primary" href="#projects" data-cursor="View">
                View Projects
                <ArrowDown size={15} />
              </Button>
              <Button variant="secondary" href={profile?.resume || '#'}>
                <Download size={15} />
                Resume
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-5">
              {profile?.social?.github && (
                <motion.a
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  href={profile.social.github} target="_blank" rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors duration-200" aria-label="GitHub"
                  data-cursor="GitHub">
                  <GithubIcon size={18} />
                </motion.a>
              )}
              {profile?.social?.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-colors duration-200" aria-label="LinkedIn"
                  data-cursor="LinkedIn">
                  <LinkedInIcon size={18} />
                </motion.a>
              )}
              <div className="h-4 w-px bg-white/10" />
              <span className="label-sm text-slate-600">Chennai, India</span>
            </motion.div>
          </motion.div>

          {/* ── Right: Big Video Card ── */}
          <motion.div
            style={{ y: videoY }}
            initial={{ opacity: 0, scale: 0.94, x: 40 }}
            animate={isLoaded ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.94, x: 40 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full lg:w-[580px] xl:w-[640px] shrink-0"
          >
            <TiltCard maxTilt={8}>
              <SpotlightCard className="rounded-2xl overflow-hidden">
                {/* Ambient glow behind card */}
                <div
                  className="absolute -inset-8 rounded-3xl pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
                />

                {/* Glassmorphic video container */}
                <div className="glass rounded-2xl overflow-hidden relative">
                  {/* Top chrome bar */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                      <span
                        className="label-sm text-slate-400"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem' }}
                      >
                        Sumanth Mamidi — AI/ML Engineer
                      </span>
                    </div>
                    <button
                      onClick={toggleMute}
                      className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                        muted 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse-soft' 
                          : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                      }`}
                      aria-label={muted ? 'Unmute' : 'Mute'}
                      data-cursor="Sound"
                    >
                      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      {muted && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Video — aspect-video, max height */}
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <video
                      ref={videoRef}
                      src={profile?.video || '/assets/videos/AI_ML_engineer_speaking_portfolio_202607221711.mp4'}
                      autoPlay
                      loop
                      muted={muted}
                      playsInline
                      preload="auto"
                      controls={false}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle vignette */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(7,11,20,0.1) 0%, transparent 30%, transparent 70%, rgba(7,11,20,0.4) 100%)',
                      }}
                    />
                    {/* "LIVE" badge */}
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-soft" />
                        <span className="label-sm text-white" style={{ fontSize: '0.55rem' }}>LIVE</span>
                      </span>
                    </div>
                  </div>

                  {/* Bottom info bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                    <span className="label-sm text-slate-500">Chennai, India</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="label-sm text-emerald-400" style={{ fontSize: '0.625rem' }}>Available</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </TiltCard>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-sm text-slate-700">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-slate-700" />
        </motion.div>
      </motion.div>
    </section>
  );
}
