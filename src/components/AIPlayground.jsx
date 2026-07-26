import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Play } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const queries = [
  {
    id: 'threat',
    label: 'Threat Detection',
    prompt: 'Analyze network traffic for anomalies',
    steps: [
      '[ init ]  Loading packet capture module...',
      '[ scan ]  Analyzing 47,823 network packets...',
      '[ ml   ]  Running anomaly detection model...',
      '[ alert]  3 suspicious flows detected (confidence: 97.2%)',
      '[ map  ]  Tracing source → 185.234.x.x (TOR exit node)',
      '[ done ]  Report generated: threat_report_2025.json',
    ],
  },
  {
    id: 'rag',
    label: 'RAG Pipeline',
    prompt: 'Query knowledge base with RAG',
    steps: [
      '[ init ]  Connecting to vector store (pgvector)...',
      '[ embed]  Encoding query → 1536-dim embedding...',
      '[ search]  Top-5 semantic matches retrieved (cosine > 0.82)',
      '[ llm  ]  Augmenting context window → GPT-4o...',
      '[ gen  ]  Streaming response (tokens/sec: 78)...',
      '[ done ]  Response synthesized with citations [3 sources]',
    ],
  },
  {
    id: 'finetune',
    label: 'Model Fine-tune',
    prompt: 'Fine-tune transformer on domain data',
    steps: [
      '[ data ]  Loading 12,400 labeled samples...',
      '[ tok  ]  Tokenizing with tiktoken (cl100k_base)...',
      '[ lora ]  Attaching LoRA adapters (r=16, α=32)...',
      '[ train]  Epoch 1/3 — loss: 2.847 → 1.203...',
      '[ eval ]  Validation accuracy: 91.4% (+18.2% vs base)',
      '[ save ]  Adapter saved → models/domain_v1.safetensors',
    ],
  },
  {
    id: 'multi',
    label: 'Multi-Agent',
    prompt: 'Run multi-agent security sweep',
    steps: [
      '[ orch ]  Spawning 5 specialized agents...',
      '[ a1   ]  ReconAgent: port scan 192.168.1.0/24...',
      '[ a2   ]  VulnAgent: CVE-2025-* signature matching...',
      '[ a3   ]  LogAgent: parsing 230K syslog entries...',
      '[ sync ]  Agent consensus: 2 critical findings...',
      '[ done ]  Security report compiled (CVSS: 8.1 / Critical)',
    ],
  },
];

export default function AIPlayground() {
  const [active, setActive] = useState(0);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const logRef = useRef(null);

  const runQuery = (idx) => {
    if (running) return;
    setActive(idx);
    setLogs([]);
    setRunning(true);
    const steps = queries[idx].steps;
    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (i === steps.length - 1) setRunning(false);
      }, 600 * (i + 1));
    });
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    const t = setTimeout(() => runQuery(0), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="ai-playground" className="section-3 relative overflow-hidden py-24 md:py-32 px-6 md:px-12 border-t border-white/4">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          label="AI Playground"
          heading="Watch my agents think"
          subtext="Simulated multi-agent reasoning pipelines — click to run different scenarios."
          theme="dark"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar queries */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {queries.map((q, i) => (
              <button
                key={q.id}
                onClick={() => runQuery(i)}
                disabled={running}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl text-left transition-all border ${
                  active === i
                    ? 'border-indigo-500/40 bg-indigo-500/10 text-white'
                    : 'border-white/5 bg-transparent text-slate-400 hover:text-slate-300 hover:border-white/10'
                } disabled:opacity-50`}
              >
                <Play size={13} className={`mt-0.5 shrink-0 ${active === i ? 'text-indigo-400' : 'text-slate-600'}`} />
                <div>
                  <p className="font-semibold text-sm leading-tight mb-0.5">{q.label}</p>
                  <p className="label-sm text-slate-600">{q.prompt}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Terminal panel */}
          <div className="lg:col-span-3">
            <div className="terminal-panel h-full min-h-[320px] flex flex-col">
              {/* Header bar */}
              <div className="terminal-bar">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2">
                  {running && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />}
                  <span className="label-sm text-slate-500" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem' }}>
                    {running ? 'agent:running' : 'agent:ready'}
                  </span>
                </div>
                <TerminalIcon size={13} className="text-slate-600" />
              </div>

              {/* Prompt */}
              <div className="px-5 py-3 border-b border-white/4">
                <span className="text-xs text-violet-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  $ agent --run "{queries[active].prompt}"
                </span>
              </div>

              {/* Log output */}
              <div ref={logRef} className="flex-1 px-5 py-4 overflow-y-auto flex flex-col gap-2" style={{ maxHeight: 260 }}>
                <AnimatePresence>
                  {logs.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: 'var(--font-mono)', color: line.includes('done') ? '#34D399' : line.includes('alert') ? '#FCD34D' : '#94A3B8' }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Blinking cursor */}
                {running && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    className="inline-block w-2 h-3 bg-violet-400 rounded-sm"
                  />
                )}

                {!running && logs.length === 0 && (
                  <p className="label-sm text-slate-700">Select a query to run...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
