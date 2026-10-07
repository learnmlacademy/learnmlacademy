import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Download, FileText, Sparkles } from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';
import {
  interviewHandbooks,
  type InterviewHandbookId,
} from '../data/interviewHandbooks';

const handbookOrder: InterviewHandbookId[] = [
  'ml',
  'deep-learning',
  'generative-ai',
  'llm-rag',
  'agentic-ai',
  'python',
  'sql',
  'system-design',
  'mlops',
  'behavioral',
];

const handbookLabels: Record<InterviewHandbookId, string> = {
  ml: 'Machine Learning',
  'deep-learning': 'Deep Learning',
  'generative-ai': 'Generative AI',
  'llm-rag': 'LLM & RAG',
  'agentic-ai': 'Agentic AI',
  python: 'Python',
  sql: 'SQL',
  'system-design': 'ML/AI System Design',
  mlops: 'MLOps & Production AI',
  behavioral: 'Behavioral & Projects',
};

export function InterviewHandbookShowcase() {
  const [selectedId, setSelectedId] = useState<InterviewHandbookId>('llm-rag');
  const selected = interviewHandbooks[selectedId];

  const selectHandbook = (guideId: InterviewHandbookId) => {
    setSelectedId(guideId);
    window.setTimeout(() => {
      document.getElementById('handbook-download-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 50);
  };

  return (
    <section
      id="free-interview-handbooks"
      className="scroll-mt-20 border-b border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8 sm:py-10"
      aria-labelledby="free-handbooks-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-[0_18px_55px_rgba(79,70,229,0.12)]">
          <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-800 px-5 py-6 text-white sm:px-7 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-black tracking-wide text-white ring-1 ring-white/20">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  10 FREE PDF HANDBOOKS
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  INTERVIEW PREP 2026
                </span>
              </div>
              <h2 id="free-handbooks-heading" className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Free ML & AI Interview Handbooks
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-indigo-100 sm:text-base">
                Detailed explanations, worked examples, diagrams, figures, code, system-design flows and interview-ready answers — not just short question lists.
              </p>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-indigo-50 sm:grid-cols-3 lg:mt-0 lg:grid-cols-1">
              {[
                'Section-specific PDFs',
                'Detailed examples & code',
                'Instant email download',
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-indigo-700">Choose your handbook</p>
                <p className="mt-1 text-sm text-slate-600">Select any subject, then enter your email once to download that PDF.</p>
              </div>
              <a href="#handbook-download-form" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-indigo-700 hover:text-indigo-900 sm:mt-0">
                Download selected PDF
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {handbookOrder.map(guideId => {
                const isSelected = selectedId === guideId;
                return (
                  <button
                    key={guideId}
                    type="button"
                    onClick={() => selectHandbook(guideId)}
                    aria-pressed={isSelected}
                    className={[
                      'group min-h-[116px] rounded-2xl border p-4 text-left transition',
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-100'
                        : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={[
                        'grid h-9 w-9 place-items-center rounded-xl',
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-indigo-700 group-hover:bg-indigo-100',
                      ].join(' ')}>
                        <FileText className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="mt-3 text-sm font-black leading-snug text-slate-950">
                      {handbookLabels[guideId]}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-indigo-600">
                      Free PDF
                    </p>
                  </button>
                );
              })}
            </div>

            <div id="handbook-download-form" className="scroll-mt-28 pt-2">
              <NewsletterSignup
                guideId={selected.guideId}
                title={selected.title}
                description={selected.description}
                filename={selected.filename}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
