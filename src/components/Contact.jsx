import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import GradientMesh from '../components/effects/GradientMesh';
import SpotlightCard from '../components/ui/SpotlightCard';
import { useProfile } from '../hooks/useProfile';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '51babd9f-f8ac-4f39-93fa-f61c63d57ece';

export default function Contact() {
  const { profile } = useProfile();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '', consent: false });
  const [status, setStatus] = useState('idle');
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) return;
    setStatus('loading');
    if (WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setTimeout(() => {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', message: '', consent: false });
      }, 1200);
      return;
    }
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', message: '', consent: false });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section-1 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
      <GradientMesh className="opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left: Contact Info */}
          <div className="w-full lg:w-[420px] shrink-0 flex flex-col justify-between">
            <div>
              <SectionHeader
                label="Get In Touch"
                heading="Let's work together"
                subtext="Open to full-time roles, freelance contracts, and interesting AI collaborations."
                theme="dark"
                className="mb-8"
              />
              <div className="flex flex-col gap-4">
                {/* Email Card — Larger, bold, single line */}
                <div className="p-4 md:p-5 rounded-xl border border-white/8 bg-white/[0.03] flex items-center gap-4 hover:border-violet-500/40 transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-300 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="label-sm text-slate-400 text-[10px] tracking-wider mb-1 uppercase font-mono">Email Direct</p>
                    <a
                      href={`mailto:${profile?.email || 'sumanthmamidi77@gmail.com'}`}
                      className="text-white hover:text-violet-300 font-bold transition-colors no-underline text-sm md:text-base tracking-tight block whitespace-nowrap overflow-hidden text-ellipsis"
                      title={profile?.email || 'sumanthmamidi77@gmail.com'}
                    >
                      {profile?.email || 'sumanthmamidi77@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 md:p-5 rounded-xl border border-white/8 bg-white/[0.03] flex items-center gap-4 hover:border-violet-500/40 transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="label-sm text-slate-400 text-[10px] tracking-wider mb-1 uppercase font-mono">Location</p>
                    <p className="text-white text-xs md:text-sm font-semibold">{profile?.location || 'Chennai, India'} — Remote Worldwide</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="status-badge">
                    <span className="status-dot" />
                    {profile?.status || 'Available for AI Engineering roles'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 w-full">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-20 text-center glass rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <CheckCircle className="text-emerald-400" size={26} />
                </div>
                <h3 className="font-bold text-white text-2xl" style={{ fontFamily: 'var(--font-display)' }}>Message Sent!</h3>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">Thanks for reaching out — your message has been transmitted to sumanthmamidi77@gmail.com. I'll reply shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                  ← Send another message
                </button>
              </motion.div>
            ) : (
              <SpotlightCard className="card p-7 md:p-9">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[{ name: 'firstName', label: 'First Name', autocomplete: 'given-name' }, { name: 'lastName', label: 'Last Name', autocomplete: 'family-name' }].map(field => (
                      <div key={field.name} className="relative transition-all duration-300 rounded-lg">
                        <label htmlFor={field.name} className="label-sm text-slate-400 mb-2 block text-[10px]">{field.label}</label>
                        <input
                          id={field.name}
                          type="text" name={field.name} value={form[field.name]} required
                          autoComplete={field.autocomplete}
                          onChange={handleChange} onFocus={() => setFocused(field.name)} onBlur={() => setFocused('')}
                          className="form-input w-full" placeholder={field.label}
                        />
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 transition-all duration-300 ${focused === field.name ? 'w-full shadow-[0_0_12px_rgba(99,102,241,0.6)]' : 'w-0'}`} />
                      </div>
                    ))}
                  </div>
                  <div className="relative transition-all duration-300 rounded-lg">
                    <label htmlFor="email" className="label-sm text-slate-400 mb-2 block text-[10px]">Email Address</label>
                    <input id="email" type="email" name="email" value={form.email} required
                      autoComplete="email"
                      onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                      className="form-input w-full" placeholder="your@email.com" />
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 transition-all duration-300 ${focused === 'email' ? 'w-full shadow-[0_0_12px_rgba(99,102,241,0.6)]' : 'w-0'}`} />
                  </div>
                  <div className="relative transition-all duration-300 rounded-lg">
                    <label htmlFor="message" className="label-sm text-slate-400 mb-2 block text-[10px]">Your Message</label>
                    <textarea id="message" name="message" value={form.message} required rows={4}
                      onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                      className="form-input w-full resize-none" placeholder="Tell me about your project, timeline, or opportunity..." />
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 transition-all duration-300 ${focused === 'message' ? 'w-full shadow-[0_0_12px_rgba(99,102,241,0.6)]' : 'w-0'}`} />
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <input type="checkbox" name="consent" id="consent" required checked={form.consent} onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded accent-violet-500 cursor-pointer" />
                    <label htmlFor="consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer select-none">
                      I consent to Sumanth Mamidi storing my information to respond to this inquiry.
                    </label>
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-xs px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      <AlertCircle size={14} /> Something went wrong. Please try again or email directly.
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading' || !form.consent}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary text-sm px-4 py-2 self-start disabled:opacity-50 disabled:cursor-not-allowed no-underline"
                  >
                    <span>{status === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                    <Send size={14} />
                  </motion.button>
                </form>
              </SpotlightCard>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
