import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2 } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import DotGrid from './effects/DotGrid';
import Skeleton from './ui/Skeleton';
import { usePublications } from '../hooks/usePublications';

const EASE = [0.22, 1, 0.36, 1];

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
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE }}
                className="rounded-2xl border border-white/10 bg-[#0D1426] overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-[14rem_1fr]">
                  {/* Citation facts */}
                  <aside className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
                    <p className="label-sm text-violet-300 m-0">Journal article</p>
                    <p className="text-4xl font-bold text-white mt-2 mb-0 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {pub.year}
                    </p>
                    <p className="text-sm text-slate-400 mt-1 mb-0">
                      Vol. {pub.volume}, No. {pub.issue} · pp. {pub.pages}
                    </p>
                    <p className="text-sm text-slate-300 mt-4 mb-0 leading-snug">{pub.venue}</p>
                  </aside>

                  {/* Title, authors, contribution */}
                  <div className="p-6 md:p-8">
                    <h3
                      className="text-lg md:text-xl font-semibold text-white leading-snug m-0"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {pub.title}
                    </h3>

                    <p className="text-sm text-slate-400 mt-3 mb-0 leading-relaxed">
                      {pub.authors.map((author, i) => (
                        <React.Fragment key={author}>
                          {author === pub.me ? (
                            <span className="text-white font-semibold">{author}</span>
                          ) : (
                            author
                          )}
                          {i < pub.authors.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    </p>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-white/10">
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
                    </dl>

                    <div className="flex flex-wrap items-center gap-3 mt-6">
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs no-underline py-2.5 px-4"
                        >
                          <ExternalLink size={14} /> Read the paper
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
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
