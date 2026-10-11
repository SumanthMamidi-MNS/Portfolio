import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import DotGrid from './effects/DotGrid';
import SpotlightCard from './ui/SpotlightCard';
import Skeleton from './ui/Skeleton';
import { usePublications } from '../hooks/usePublications';

const EASE = [0.22, 1, 0.36, 1];

// One reveal sequence per article: the card rises, its accent line draws across, then the citation
// panel slides in and the content blocks follow one after another.
const card = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const slideIn = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const authorIn = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

export default function Publications() {
  const { publications, loading } = usePublications();

  return (
    <section
      id="publications"
      className="section-2 relative overflow-hidden py-20 md:py-28 px-6 md:px-12 border-t border-white/5"
    >
      <DotGrid theme="dark" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          label="Research"
          heading="Publications"
          subtext="Published research on multi-agent LLM systems for automated security vulnerability repair."
          theme="dark"
          className="mb-10"
        />

        {loading ? (
          <Skeleton.Grid cols={1} count={1} />
        ) : (
          <div className="flex flex-col gap-6">
            {publications.map((pub) => (
              <motion.article
                key={pub.id}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group"
              >
                <SpotlightCard
                  spotColor="rgba(139,92,246,0.14)"
                  className="relative rounded-2xl border border-white/10 group-hover:border-violet-400/40 transition-colors duration-300 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_22px_55px_-24px_rgba(99,102,241,0.45)]"
                  style={{ background: 'rgba(13, 20, 38, 0.72)' }}
                >
                  {/* Accent line that draws across the top edge when the card scrolls into view */}
                  <motion.span
                    aria-hidden="true"
                    variants={{
                      hidden: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.1 } },
                    }}
                    className="absolute left-0 top-0 z-20 h-[2px] w-full origin-left"
                    style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6 55%, rgba(139,92,246,0))' }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr]">
                    {/* Citation facts */}
                    <motion.aside
                      variants={slideIn}
                      className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]"
                    >
                      <p className="label-sm text-violet-300 m-0 inline-flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60 animate-ping" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                        </span>
                        Journal article
                      </p>
                      <p
                        className="text-4xl font-bold text-white mt-2 mb-0 tracking-tight transition-transform duration-300 origin-left group-hover:scale-[1.04]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {pub.year}
                      </p>
                      <p className="text-sm text-slate-400 mt-1 mb-0">
                        Vol. {pub.volume}, No. {pub.issue} · pp. {pub.pages}
                      </p>
                      <p className="text-sm text-slate-300 mt-4 mb-0 leading-snug">{pub.venue}</p>
                    </motion.aside>

                    {/* Title, authors, contribution */}
                    <div className="p-6 md:p-8">
                      <motion.h3
                        variants={rise}
                        className="text-lg md:text-xl font-semibold text-white leading-snug m-0 transition-colors duration-300 group-hover:text-violet-100"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {pub.title}
                      </motion.h3>

                      <motion.p
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                        className="text-sm text-slate-400 mt-3 mb-0 leading-relaxed"
                      >
                        {pub.authors.map((author, i) => (
                          <React.Fragment key={author}>
                            <motion.span
                              variants={authorIn}
                              className={author === pub.me ? 'inline-block text-white font-semibold' : 'inline-block'}
                            >
                              {author}
                            </motion.span>
                            {i < pub.authors.length - 1 ? ', ' : ''}
                          </React.Fragment>
                        ))}
                      </motion.p>

                      <motion.dl
                        variants={rise}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-white/10"
                      >
                        {pub.result && (
                          <div>
                            <dt className="label-sm text-slate-500">Result</dt>
                            <dd className="text-sm text-slate-200 mt-1 ml-0 leading-relaxed">{pub.result}</dd>
                          </div>
                        )}
                        {pub.role && (
                          <div>
                            <dt className="label-sm text-slate-500">My contribution</dt>
                            <dd className="text-sm text-slate-200 mt-1 ml-0 leading-relaxed">{pub.role}</dd>
                          </div>
                        )}
                      </motion.dl>

                      <motion.div variants={rise} className="flex flex-wrap items-center gap-3 mt-6">
                        {pub.url && (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn btn-primary text-xs no-underline py-2.5 px-4"
                          >
                            <ExternalLink
                              size={14}
                              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                            Read the paper
                          </a>
                        )}
                        {pub.links?.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-xs no-underline py-2.5 px-4"
                          >
                            <Code2 size={14} /> {l.label}
                          </a>
                        ))}
                        {pub.doi && <span className="text-xs text-slate-500 font-mono">DOI {pub.doi}</span>}
                      </motion.div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
