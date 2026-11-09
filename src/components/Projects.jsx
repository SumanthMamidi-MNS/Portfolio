import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DotGrid from '../components/effects/DotGrid';
import TiltCard from '../components/ui/TiltCard';
import SpotlightCard from '../components/ui/SpotlightCard';
import Skeleton from '../components/ui/Skeleton';
import { useProjects } from '../hooks/useProjects';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const categoryAccents = {
  'ai-ml':       { color: '#8B5CF6', bg: 'rgba(139,92,246,0.10)' },
  'interactive': { color: '#10B981', bg: 'rgba(16,185,129,0.10)'  },
  'systems':     { color: '#06B6D4', bg: 'rgba(6,182,212,0.10)'  },
};

const projectThemeAccents = {
  urbantrace:  { color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.40)', bgEnd: 'rgba(8, 20, 34, 0.96)' },
  oceanembed:  { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.38)', bgEnd: 'rgba(8, 18, 38, 0.96)' },
  fieldcast:   { color: '#10B981', glow: 'rgba(16, 185, 129, 0.38)', bgEnd: 'rgba(8, 24, 20, 0.96)' },
  truecite:    { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.38)', bgEnd: 'rgba(16, 12, 34, 0.96)' },
  auxin:       { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.38)', bgEnd: 'rgba(24, 16, 10, 0.96)' },
  campusflow:  { color: '#6366F1', glow: 'rgba(99, 102, 241, 0.38)', bgEnd: 'rgba(12, 14, 32, 0.96)' },
  omnifix:     { color: '#EC4899', glow: 'rgba(236, 72, 153, 0.38)', bgEnd: 'rgba(24, 12, 22, 0.96)' },
  qubitscope:  { color: '#A855F7', glow: 'rgba(168, 85, 247, 0.38)', bgEnd: 'rgba(16, 10, 32, 0.96)' },
  airforge:    { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.38)', bgEnd: 'rgba(24, 16, 10, 0.96)' },
  emailenv:    { color: '#6366F1', glow: 'rgba(99, 102, 241, 0.38)', bgEnd: 'rgba(12, 14, 32, 0.96)' },
  deepfocus:   { color: '#14B8A6', glow: 'rgba(20, 184, 166, 0.38)', bgEnd: 'rgba(10, 22, 24, 0.96)' },
};

const filterLabels = { all: 'All', 'ai-ml': 'AI & ML', 'interactive': 'Interactive', 'systems': 'Systems' };

// Covers that are logos (SVG wordmarks, or the stacked PNG lockup) sit contained and centred;
// anything else is a screenshot that fills the banner.
const isLogoCover = (cover) => /-logo\.(svg|png)$/.test(cover || '');
const isLockup = (cover) => /-logo\.png$/.test(cover || '');

// OceanEmbed mark: animated squircle emblem + live DOM wordmark (bulletproof across all color schemes)
function OceanEmbedMark({ large = false }) {
  return (
    <div
      role="img"
      aria-label="OceanEmbed"
      className={`flex items-center justify-center ${large ? 'gap-3.5' : 'gap-2.5'} select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]`}
    >
      <svg viewBox="0 0 96 96" className={`${large ? 'h-[4.25rem] w-[4.25rem]' : 'h-13 w-13'} shrink-0`} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="oem-border" x1="6" y1="6" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#45C4D6" />
            <stop offset="40%" stopColor="#0A5A78" />
            <stop offset="75%" stopColor="#06445C" />
            <stop offset="100%" stopColor="#14212B" />
          </linearGradient>
          <linearGradient id="oem-water" x1="48" y1="6" x2="48" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0E1728" />
            <stop offset="50%" stopColor="#0A1222" />
            <stop offset="100%" stopColor="#070D1A" />
          </linearGradient>
          <radialGradient id="oem-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#45C4D6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#0A5A78" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#070D1A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="48" cy="48" rx="54" ry="54" fill="url(#oem-aura)" />
        <rect x="6" y="6" width="84" height="84" rx="22" fill="url(#oem-water)" stroke="url(#oem-border)" strokeWidth="4.5" strokeLinejoin="round" />
        <rect x="9.5" y="9.5" width="77" height="77" rx="19" fill="none" stroke="#45C4D6" strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="22" y1="33" x2="74" y2="33" stroke="#FFFFFF" strokeWidth="7.0" strokeLinecap="round" />
        <line x1="22" y1="48" x2="56" y2="48" stroke="#45C4D6" strokeWidth="7.0" strokeLinecap="round" />
        <line x1="22" y1="63" x2="38" y2="63" stroke="#0A5A78" strokeWidth="7.0" strokeLinecap="round" opacity="0.6" />
      </svg>
      <span
        className={`${large ? 'text-4xl' : 'text-3xl'} font-semibold tracking-tight leading-none text-white whitespace-nowrap`}
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif", letterSpacing: '-0.03em' }}
      >
        Ocean<span style={{ color: '#45C4D6' }}>Embed</span>
      </span>
    </div>
  );
}

// UrbanTrace mark: multi-camera sensor node squircle + live DOM wordmark
function UrbanTraceMark({ large = false }) {
  return (
    <div
      role="img"
      aria-label="UrbanTrace"
      className={`flex items-center justify-center ${large ? 'gap-3.5' : 'gap-2.5'} select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]`}
    >
      <svg viewBox="0 0 96 96" className={`${large ? 'h-[4.25rem] w-[4.25rem]' : 'h-13 w-13'} shrink-0`} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="utm-cyan-border" x1="6" y1="6" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="35%" stopColor="#6FDCEC" />
            <stop offset="70%" stopColor="#3CC4D8" />
            <stop offset="100%" stopColor="#1D6F7C" />
          </linearGradient>
          <linearGradient id="utm-track-grad" x1="22" y1="66" x2="72" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D6F7C" />
            <stop offset="50%" stopColor="#3CC4D8" />
            <stop offset="100%" stopColor="#6FDCEC" />
          </linearGradient>
          <radialGradient id="utm-vector-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CFFAFE" stopOpacity="0.75" />
            <stop offset="30%" stopColor="#6FDCEC" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#3CC4D8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1D6F7C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="48" cy="48" rx="54" ry="54" fill="url(#utm-vector-aura)" />
        <rect x="6" y="6" width="84" height="84" rx="20" fill="#070A0E" stroke="url(#utm-cyan-border)" strokeWidth="4.5" strokeLinejoin="round" />
        <rect x="9.5" y="9.5" width="77" height="77" rx="17" fill="none" stroke="#A5F3FC" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M22 66 L44 36 L72 32" fill="none" stroke="url(#utm-track-grad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="66" r="6.5" fill="#070A0E" stroke="#2A9FB1" strokeWidth="4.5" />
        <circle cx="44" cy="36" r="6.5" fill="#070A0E" stroke="#3CC4D8" strokeWidth="4.5" />
        <circle cx="72" cy="32" r="14" fill="#3CC4D8" opacity="0.2" />
        <circle cx="72" cy="32" r="7.5" fill="#6FDCEC" />
        <circle cx="72" cy="32" r="3" fill="#FFFFFF" />
        <path d="M82 22 A14 14 0 0 1 84 42" fill="none" stroke="#6FDCEC" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
      </svg>
      <span
        className={`${large ? 'text-4xl' : 'text-3xl'} font-semibold tracking-tight leading-none text-white whitespace-nowrap`}
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif", letterSpacing: '-0.02em' }}
      >
        Urban<span style={{ color: '#3CC4D8' }}>Trace</span>
      </span>
    </div>
  );
}

// TrueCite mark: legal verification shield + live DOM wordmark
function TrueCiteMark({ large = false }) {
  return (
    <div
      role="img"
      aria-label="TrueCite"
      className={`flex items-center justify-center ${large ? 'gap-3.5' : 'gap-2.5'} select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]`}
    >
      <svg viewBox="0 0 96 96" className={`${large ? 'h-[4.25rem] w-[4.25rem]' : 'h-13 w-13'} shrink-0`} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tcm-gold" x1="14" y1="6" x2="82" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#FACC15" />
            <stop offset="70%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="tcm-emerald" x1="34" y1="38" x2="64" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <radialGradient id="tcm-vector-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#FACC15" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#EAB308" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#CA8A04" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="48" cy="48" rx="56" ry="56" fill="url(#tcm-vector-aura)" opacity="0.6" />
        <path d="M48 6 L82 22 V58 C82 78 48 90 48 90 C48 90 14 78 14 58 V22 Z" fill="#111827" stroke="url(#tcm-gold)" strokeWidth="5" strokeLinejoin="round" />
        <path d="M48 9 L79 24 V57 C79 75 48 86 48 86 C48 86 17 75 17 57 V24 Z" fill="none" stroke="#FEF9C3" strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M34 50 L44 60 L64 38" fill="none" stroke="url(#tcm-emerald)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className={`${large ? 'text-4xl' : 'text-3xl'} font-semibold tracking-tight leading-none text-white whitespace-nowrap`}
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif", letterSpacing: '-0.02em' }}
      >
        True<span style={{ color: '#FACC15' }}>Cite</span>
      </span>
    </div>
  );
}

// FieldCast mark: meteorological radar beacon + live DOM wordmark
function FieldCastMark({ large = false }) {
  return (
    <div
      role="img"
      aria-label="FieldCast"
      className={`flex items-center justify-center ${large ? 'gap-3.5' : 'gap-2.5'} select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]`}
    >
      <svg viewBox="0 0 96 96" className={`${large ? 'h-[4.25rem] w-[4.25rem]' : 'h-13 w-13'} shrink-0`} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="fcm-outer" x1="8" y1="8" x2="25" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A3B34" />
            <stop offset="50%" stopColor="#14554A" />
            <stop offset="100%" stopColor="#08302A" />
          </linearGradient>
          <linearGradient id="fcm-inner" x1="11" y1="11" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="30%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <radialGradient id="fcm-beacon" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE68A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          <radialGradient id="fcm-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M 66 32 A 24 24 0 0 1 72 48 A 24 24 0 0 1 66 64" fill="none" stroke="#6EE7B7" strokeWidth="2.8" strokeLinecap="round" opacity="0.9" />
        <path d="M 74 26 A 32 32 0 0 1 82 48 A 32 32 0 0 1 74 70" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
        <g transform="translate(44, 48) scale(2.4) translate(-16.5, -16.5)">
          <path d="M8 8 C12.5 3.5 20.5 3.5 25 8 C29.5 12.5 29.5 20.5 25 25 C20.5 29.5 12.5 29.5 8 25" fill="none" stroke="url(#fcm-outer)" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M11 11 C14 8 19 8 22 11 C25 14 25 19 22 22" fill="none" stroke="url(#fcm-inner)" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="16.5" cy="16.5" r="5.5" fill="url(#fcm-aura)" />
          <circle cx="16.5" cy="16.5" r="3" fill="url(#fcm-beacon)" />
          <circle cx="15.4" cy="15.3" r="0.75" fill="#FFFFFF" opacity="0.85" />
        </g>
      </svg>
      <span
        className={`${large ? 'text-4xl' : 'text-3xl'} font-semibold tracking-tight leading-none text-white whitespace-nowrap`}
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif", letterSpacing: '-0.02em' }}
      >
        Field<span style={{ color: '#10B981' }}>Cast</span>
      </span>
    </div>
  );
}

// CampusFlow's mark is drawn in the page (icon + live text) instead of an image, so the pair is centred
// exactly whatever font the visitor's device falls back to, and it scales cleanly with the card.
function CampusFlowMark({ large = false }) {
  return (
    <div
      role="img"
      aria-label="CampusFlow"
      className={`flex items-center justify-center ${large ? 'gap-4' : 'gap-3'} select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]`}
    >
      <svg viewBox="3 7 90 90" className={`${large ? 'h-[4.5rem] w-[4.5rem]' : 'h-14 w-14'} shrink-0`} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="cfm-border" x1="6" y1="6" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="cfm-bg" x1="48" y1="6" x2="48" y2="94" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#111533" />
            <stop offset="100%" stopColor="#0A0C22" />
          </linearGradient>
          <linearGradient id="cfm-cap" x1="24" y1="28" x2="72" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        <rect x="6" y="10" width="84" height="84" rx="20" fill="url(#cfm-bg)" stroke="url(#cfm-border)" strokeWidth="3" />
        <path d="M48 28 L76 42 L48 56 L20 42 Z" fill="url(#cfm-cap)" />
        <path d="M32 50 V62 C32 66 40 70 48 70 C56 70 64 66 64 62 V50 L48 58 Z" fill="url(#cfm-cap)" opacity="0.85" />
        <path d="M76 42 V58" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span
        className={`${large ? 'text-4xl' : 'text-3xl'} font-bold tracking-tight leading-none text-white whitespace-nowrap`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Campus<span style={{ color: '#818CF8' }}>Flow</span>
      </span>
    </div>
  );
}

const INLINE_LOGOS = {
  oceanembed: OceanEmbedMark,
  urbantrace: UrbanTraceMark,
  truecite: TrueCiteMark,
  fieldcast: FieldCastMark,
  campusflow: CampusFlowMark,
};

function ProjectCard({ project, index, number, onClick }) {
  const accent = categoryAccents[project.category] || categoryAccents['ai-ml'];
  const specific = projectThemeAccents[project.id?.toLowerCase()] || {};
  const themeColor = specific.color || accent.color;
  const glowColor = specific.glow || `${themeColor}38`;
  const bgEnd = specific.bgEnd || 'rgba(10, 16, 32, 0.96)';
  const [imageError, setImageError] = React.useState(false);
  // Stagger by position inside its own group; cards fade up in place (no layout sliding).
  const delay = Math.min((index % 6) * 0.05, 0.3);

  return (
    <TiltCard maxTilt={7} glareStrength={0.35}>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onClick(project)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project); } }}
        className="h-full cursor-pointer max-w-[99%] mx-auto w-full"
        role="button"
        aria-label={`${project.title}: open details`}
        tabIndex={0}
        data-cursor="VIEW"
      >
        <SpotlightCard
          spotColor={`${themeColor}1F`}
          className="project-glass h-full flex flex-col overflow-hidden group rounded-[22px] border border-white/9 transition-all duration-300 relative hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)]"
          style={{
            // Translucent fill; the frosted blur is added only on hover (.project-glass), and the hover
            // spotlight takes this project's own colour.
            background: '#0D1424',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
          }}
        >
          {/* Top Cover Banner with theme-matched radial aura */}
          <div
            className="h-36 md:h-40 relative overflow-hidden flex items-center justify-center px-6 py-3"
            style={{
              background: `radial-gradient(circle at 50% 38%, ${glowColor} 0%, rgba(10, 16, 30, 0.5) 55%, ${bgEnd} 85%)`,
            }}
          >
            {INLINE_LOGOS[project.id?.toLowerCase()] ? (
              <div className="transition-transform duration-500 ease-out group-hover:scale-105">
                {React.createElement(INLINE_LOGOS[project.id.toLowerCase()])}
              </div>
            ) : project.cover && !imageError ? (
              <img
                src={project.cover}
                alt={project.title}
                onError={() => setImageError(true)}
                className={`transition-transform duration-500 ease-out ${
                  isLogoCover(project.cover)
                    ? `${isLockup(project.cover) ? 'max-h-[7.25rem]' : 'max-h-24 md:max-h-26'} w-auto max-w-[88%] object-contain group-hover:scale-105 drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]`
                    : 'w-full h-full object-cover group-hover:scale-105'
                }`}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Ambient Grid Pattern */}
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(${accent.color} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
                <span
                  className="text-6xl font-black opacity-15 select-none tracking-tighter"
                  style={{ fontFamily: 'var(--font-display)', color: accent.color }}
                >
                  {project.title}
                </span>
              </div>
            )}
            
            {/* Corner labels: plain text only. Category (with a violet dot) on the left, number on the right.
                No stars, glows or bordered pills. */}
            <span className="absolute top-3.5 left-4 z-10 inline-flex items-center gap-2 text-[11px] font-medium text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {filterLabels[project.category] || project.category}
            </span>
            <span className="absolute top-3.5 right-4 z-10 inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 tabular-nums">
              {number}
            </span>
          </div>

          {/* Luminous Specular Horizon Beam directly above title */}
          <div
            className="h-[1px] w-full relative z-10"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColor}85, transparent)`,
              boxShadow: `0 0 14px ${themeColor}50`,
            }}
          />

          {/* Card Body */}
          <div className="p-4 md:p-[18px] flex flex-col flex-1">
            <div className="mb-1.5">
              <h3
                className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </h3>
              {/* Subtitle is never clipped: it keeps room for two lines so card bodies stay aligned */}
              <p className="label-sm text-slate-400 text-[11px] min-h-[2.1rem] leading-snug mt-1">
                {project.subtitle}
              </p>
            </div>
            {project.metric && (
              <p className="text-[11px] font-mono font-semibold mt-1 text-violet-300">
                {project.metric}
              </p>
            )}
            {/* Cards use the short summary; the full description opens in the detail view */}
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 min-h-[3.6rem] mt-1.5">
              {project.summary || project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-auto pt-3">
              {project.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="skill-pill text-[10px] px-2 py-0.5">{tag}</span>
              ))}
              {project.tags?.length > 3 && (
                <span className="skill-pill text-[10px] px-1.5 py-0.5">+{project.tags.length - 3}</span>
              )}
            </div>
            <div className="flex items-center gap-1 pt-2.5 mt-2.5 border-t border-white/5 cursor-pointer" data-cursor="VIEW">
              <span className="text-[11px] font-semibold text-violet-400 group-hover:text-violet-300 flex items-center gap-1 transition-colors">
                View Details <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </SpotlightCard>
      </motion.article>
    </TiltCard>
  );
}

function ProjectModal({ project, onClose }) {
  const [imageError, setImageError] = React.useState(false);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;
  const accent = categoryAccents[project.category] || categoryAccents['ai-ml'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
      style={{ background: 'rgba(5,9,18,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        className="glass rounded-2xl w-full max-w-2xl max-h-[85vh] relative flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky close button — always visible top-right */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 hover:bg-white/10 border border-white/10"
          style={{ background: 'rgba(10,15,30,0.75)', backdropFilter: 'blur(8px)' }}
          aria-label="Close"
          autoFocus
        >
          <X size={15} />
        </button>

        {/* Scrollable content area with Lenis prevention and custom scrollbar */}
        <div
          className="overflow-y-auto flex-1 modal-scrollbar"
          data-lenis-prevent
          style={{ overscrollBehavior: 'contain' }}
        >
          <div className="h-48 relative overflow-hidden flex items-center justify-center border-b border-white/5 px-6 py-4"
            style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent.color}30 0%, #0A0F1E 90%)` }}>
            {INLINE_LOGOS[project.id?.toLowerCase()] ? (
              React.createElement(INLINE_LOGOS[project.id.toLowerCase()], { large: true })
            ) : project.cover && !imageError ? (
              <img
                src={project.cover}
                alt={project.title}
                onError={() => setImageError(true)}
                className={`transition-transform duration-500 ease-out ${
                  isLogoCover(project.cover)
                    ? `${isLockup(project.cover) ? 'max-h-36' : 'max-h-28'} w-auto max-w-[85%] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]`
                    : 'w-full h-full object-cover'
                }`}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `radial-gradient(${accent.color} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <span className="text-7xl font-black opacity-15 select-none tracking-tighter"
                  style={{ fontFamily: 'var(--font-display)', color: accent.color }}>
                  {project.title}
                </span>
              </div>
            )}
            <div className="absolute bottom-3.5 left-5 z-10">
              <span className="tech-tag capitalize" style={{ borderColor: `${accent.color}40`, color: '#fff', background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(4px)' }}>
                {filterLabels[project.category] || project.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-7 flex flex-col gap-6">
            {/* Title block */}
            <div>
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h2 className="text-2xl font-bold text-white m-0" style={{ fontFamily: 'var(--font-display)' }}>
                  {project.title}
                </h2>
                {project.badge && (
                  <span className="text-xs font-medium text-violet-200 border border-violet-400/30 bg-violet-500/10 rounded-md px-2 py-0.5">
                    {project.badge}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm m-0">{project.subtitle} · {project.year}</p>
            </div>

            {/* 1. What it is (plain language) */}
            <section>
              <h4 className="label-sm text-slate-500 mb-2">Overview</h4>
              <p className="text-slate-200 leading-relaxed text-[15px] m-0">{project.description}</p>
            </section>

            {/* 2. Results, each explained in words */}
            {project.results?.length > 0 && (
              <section>
                <h4 className="label-sm text-slate-500 mb-3">Results, explained</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-xl border border-violet-400/25 bg-violet-500/[0.07] p-4">
                      <p className="text-2xl font-bold text-white leading-none m-0" style={{ fontFamily: 'var(--font-display)' }}>
                        {r.value}
                      </p>
                      <p className="text-sm font-semibold text-violet-100 mt-2 mb-0">{r.label}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1.5 mb-0">{r.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Screenshots */}
            {project.gallery?.length > 0 && (
              <section>
                <h4 className="label-sm text-slate-500 mb-3">Screenshots</h4>
                <div className="grid grid-cols-1 gap-3">
                  {project.gallery.map((g) => (
                    <figure key={g.src} className="m-0">
                      <img
                        src={g.src}
                        alt={`${project.title}: ${g.caption}`}
                        loading="lazy"
                        className="w-full rounded-xl border border-white/10"
                        data-cursor-solid
                      />
                      <figcaption className="text-xs text-slate-500 mt-1.5">{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* 4. My role */}
            {project.role && (
              <section>
                <h4 className="label-sm text-slate-500 mb-2">My role</h4>
                <p className="text-slate-300 text-sm leading-relaxed m-0">{project.role}</p>
              </section>
            )}

            {/* 5. How it works / key features */}
            {project.features?.length > 0 && (
              <section>
                <h4 className="label-sm text-slate-500 mb-2.5">Key features</h4>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 6. Tech */}
            <section>
              <h4 className="label-sm text-slate-500 mb-2.5">Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map(tag => <span key={tag} className="skill-pill text-xs">{tag}</span>)}
              </div>
            </section>

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs no-underline py-2.5 px-4">
                <GithubIcon size={14} /> View on GitHub
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs no-underline py-2.5 px-4">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  // The first six stay put; "Show all" opens the rest underneath them.
  const INITIAL_PROJECTS = 6;
  const baseProjects = filtered.slice(0, INITIAL_PROJECTS);
  const extraProjects = filtered.slice(INITIAL_PROJECTS);

  const handleFilter = (cat) => {
    setFilter(cat);
    setShowAllProjects(false);
  };

  return (
    <section id="projects" className="section-1 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <DotGrid theme="dark" />

      <div className="max-w-[1140px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <SectionHeader
            label="My Work"
            heading="Featured Projects"
            subtext="Applied ML, LLM, and full-stack systems, each with a measured result."
            theme="dark"
          />

          <div
            className="flex items-center gap-1 p-1 rounded-xl shrink-0 self-start md:self-auto"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {categories.map(cat => (
              <button key={cat} onClick={() => handleFilter(cat)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === cat ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}>
                {filter === cat && (
                  <motion.div layoutId="filter-pill" className="absolute inset-0 rounded-lg"
                    style={{ background: 'linear-gradient(135deg,#6366F1,#8B5CF6)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                )}
                <span className="relative z-10">{filterLabels[cat] || cat}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Skeleton.Grid cols={3} count={6} />
        ) : (
          <div>
            <div key={filter} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {baseProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} number={String(i + 1).padStart(2, '0')} onClick={setActiveProject} />
              ))}
            </div>

            <AnimatePresence initial={false}>
              {showAllProjects && extraProjects.length > 0 && (
                <motion.div
                  key={`extra-${filter}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                  className="-mx-3 px-3 -mb-6 pb-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pt-6">
                    {extraProjects.map((project, i) => (
                      <ProjectCard key={project.id} project={project} index={i} number={String(INITIAL_PROJECTS + i + 1).padStart(2, '0')} onClick={setActiveProject} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Show More / Show Less Button */}
        {!loading && filtered.length > INITIAL_PROJECTS && (
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="btn-secondary flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/40 text-sm font-semibold text-white shadow-lg transition-all duration-300"
            >
              <span>{showAllProjects ? 'Show Less' : `Show All ${filtered.length} Projects`}</span>
              <motion.div
                animate={{ rotate: showAllProjects ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown size={15} />
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
