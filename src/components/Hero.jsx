import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ArrowDown, Volume2, VolumeX, Play, RotateCcw } from 'lucide-react';
import Button from '../components/ui/Button';
import GradientMesh from '../components/effects/GradientMesh';
import DotGrid from '../components/effects/DotGrid';
import TiltCard from '../components/ui/TiltCard';
import SpotlightCard from '../components/ui/SpotlightCard';
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
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);   // video is currently playing
  const [started, setStarted] = useState(false);   // visitor has pressed play at least once
  const [ended, setEnded] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const { profile } = useProfile();
  const { isLoaded } = usePreloader();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  // Click-to-play: nothing downloads or plays until the visitor asks for it.
  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (ended) video.currentTime = 0;
    video.muted = false;
    setMuted(false);
    setBuffering(true);
    video.play().then(() => {
      setStarted(true);
      setEnded(false);
    }).catch(() => {
      // Some browsers refuse unmuted playback; retry muted so the click still does something.
      video.muted = true;
      setMuted(true);
      video.play().then(() => { setStarted(true); setEnded(false); }).catch(() => setBuffering(false));
    });
  };

  // Pause automatically when the hero scrolls out of view so audio never plays in the background.
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting && !video.paused) video.pause(); },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-0 relative min-h-screen flex items-center pt-20 pb-40 px-6 md:px-12 overflow-hidden"
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
                {profile?.status || 'Seeking AI systems, ML or full-stack internships'}
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
                <SplitText
                  text="intelligent"
                  trigger="onLoad"
                  isLoaded={isLoaded}
                  delay={0.2}
                  stagger={0.06}
                  wordClass="gradient-text-animated"
                />
                <br />
                <SplitText
                  text="systems."
                  trigger="onLoad"
                  isLoaded={isLoaded}
                  delay={0.5}
                  stagger={0.1}
                />
              </h1>
              {/* Even, calm tagline: one clear line plus equal-sized focus chips that rise in one by one */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-slate-100 tracking-wide m-0">
                  {profile?.tagline || 'B.Tech in Computer Science & Engineering'}
                </p>
                <p className="text-sm text-slate-400 leading-snug m-0">
                  {profile?.specialization || 'Specialization in Artificial Intelligence & Machine Learning · SRMIST, Chennai'}
                </p>
              </div>
              <motion.ul
                className="flex flex-wrap gap-2 list-none p-0 m-0 mt-1"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
              >
                {(profile?.focus || ['Machine Learning', 'Computer Vision', 'RAG Pipelines', 'LLM Agents']).map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium text-violet-200 border border-violet-400/30 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-300/50 transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base text-slate-400 leading-relaxed">
              {profile?.bio || 'Second-year B.Tech CSE (AI & ML) student building applied ML and LLM agent systems from Chennai, India.'}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <Button variant="primary" href="#projects">
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
            {/* Gentle on the hero card: a small tilt and almost no lift, so it never "jumps" at the pointer */}
            <TiltCard maxTilt={5} lift={1.01}>
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
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      <span
                        className="label-sm text-slate-400"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem' }}
                      >
                        Sumanth Mamidi — Intro
                      </span>
                    </div>
                    {/* Sound toggle only matters once the video has started */}
                    <button
                      onClick={toggleMute}
                      disabled={!started}
                      className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-default ${
                        muted
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                      }`}
                      aria-label={muted ? 'Unmute video' : 'Mute video'}
                      data-cursor="Sound"
                    >
                      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>

                  {/* Video — aspect-video, max height */}
                  <div className="relative" style={{ aspectRatio: '16/9' }}>
                    <video
                      ref={videoRef}
                      src={profile?.video || '/assets/videos/AI_ML_engineer_speaking_portfolio_202607221711.mp4'}
                      poster={profile?.poster || '/assets/videos/video_poster.jpg'}
                      playsInline
                      preload="none"
                      controls={false}
                      onPlaying={() => { setPlaying(true); setBuffering(false); }}
                      onPause={() => setPlaying(false)}
                      onWaiting={() => setBuffering(true)}
                      onEnded={() => { setPlaying(false); setEnded(true); }}
                      onClick={() => {
                        const v = videoRef.current;
                        if (!v) return;
                        if (v.paused) v.play().catch(() => {});
                        else v.pause();
                      }}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle vignette */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(7,11,20,0.1) 0%, transparent 30%, transparent 70%, rgba(7,11,20,0.4) 100%)',
                      }}
                    />
                    {/* Click-to-play overlay: fades out while playing, returns on pause/end */}
                    <AnimatePresence>
                      {!playing && (
                        <motion.button
                          type="button"
                          key="play-overlay"
                          onClick={startVideo}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 hover:bg-black/15 transition-colors"
                          aria-label={ended ? 'Replay intro video' : 'Play intro video'}
                          data-cursor="Play"
                        >
                          <span className="relative flex items-center justify-center">
                            {!buffering && (
                              <motion.span
                                className="absolute w-16 h-16 rounded-full border border-white/40"
                                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                              />
                            )}
                            <span className="relative w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl">
                              {buffering ? (
                                <motion.span
                                  className="block w-6 h-6 rounded-full border-2 border-white/30 border-t-white"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                />
                              ) : ended ? (
                                <RotateCcw size={22} />
                              ) : (
                                <Play size={24} className="ml-1" fill="currentColor" />
                              )}
                            </span>
                          </span>
                          <span className="label-sm text-white/90">
                            {buffering ? 'Loading…' : ended ? 'Watch again' : 'Play intro'}
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom info bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                    <span className="label-sm text-slate-500">Chennai, India</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="label-sm text-emerald-400" style={{ fontSize: '0.625rem' }}>Open to internships</span>
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
