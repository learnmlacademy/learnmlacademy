import React, { useEffect, useState } from 'react';
import { Mail, Download, CheckCircle, Loader } from 'lucide-react';

export type HandbookKey =
  | 'ml'
  | 'deep-learning'
  | 'generative-ai'
  | 'llm-rag'
  | 'agentic-ai'
  | 'python'
  | 'sql'
  | 'system-design'
  | 'mlops'
  | 'behavioral';

type HandbookDisplay = {
  title: string;
  description: string;
  downloadName: string;
};

const HANDBOOKS: Record<HandbookKey, HandbookDisplay> = {
  ml: {
    title: 'Machine Learning Interview Cheatsheet',
    description:
      '100 essential ML interview questions covering foundations, algorithms, evaluation, feature engineering, deep learning, Python, system design and interview strategy.',
    downloadName: 'Machine_Learning_Interview_Cheatsheet.pdf',
  },
  'deep-learning': {
    title: 'Deep Learning Interview Handbook',
    description:
      'Detailed deep learning interview preparation with neural networks, backpropagation, optimization, CNNs, sequence models, transformers, worked examples and code.',
    downloadName: 'Deep_Learning_Interview_Handbook_2026.pdf',
  },
  'generative-ai': {
    title: 'Generative AI Interview Handbook',
    description:
      'A detailed Generative AI interview guide covering VAEs, GANs, diffusion, multimodal generation, evaluation, safety, worked examples and practical design questions.',
    downloadName: 'Generative_AI_Interview_Handbook_2026.pdf',
  },
  'llm-rag': {
    title: 'LLM & RAG Interview Handbook',
    description:
      'In-depth LLM and RAG preparation covering transformers, embeddings, retrieval, vector search, reranking, evaluation, security, serving and production architecture.',
    downloadName: 'LLM_RAG_Interview_Handbook_2026.pdf',
  },
  'agentic-ai': {
    title: 'Agentic AI Interview Handbook',
    description:
      'Detailed agentic AI preparation covering tool calling, planning, memory, state, MCP, multi-agent systems, security, evaluation, observability and production patterns.',
    downloadName: 'Agentic_AI_Interview_Handbook_2026.pdf',
  },
  python: {
    title: 'Python for ML & AI Interviews',
    description:
      'Solved Python interview problems for ML and AI roles with reasoning, code, dry runs, complexity analysis, edge cases and follow-up variations.',
    downloadName: 'Python_for_ML_AI_Interviews_2026.pdf',
  },
  sql: {
    title: 'SQL for Data & AI Interviews',
    description:
      'Solved SQL interview problems with sample tables, step-by-step query logic, expected outputs, window functions, analytics patterns and follow-up questions.',
    downloadName: 'SQL_for_Data_AI_Interviews_2026.pdf',
  },
  'system-design': {
    title: 'ML & AI System Design Interview Handbook',
    description:
      'End-to-end ML and AI system-design cases covering requirements, architecture, data and feature pipelines, serving, experimentation, monitoring and trade-offs.',
    downloadName: 'ML_AI_System_Design_Interview_Handbook_2026.pdf',
  },
  mlops: {
    title: 'MLOps & Production AI Interview Handbook',
    description:
      'Production-focused interview preparation covering deployment, CI/CD, model registries, feature pipelines, drift, monitoring, reliability and debugging scenarios.',
    downloadName: 'MLOps_Production_AI_Interview_Handbook_2026.pdf',
  },
  behavioral: {
    title: 'Behavioral & Project Interview Handbook',
    description:
      'Practical frameworks for project deep-dives, stakeholder discussions, ownership, failures, trade-offs and behavioral questions for AI, ML and data roles.',
    downloadName: 'Behavioral_Project_Interview_Handbook_2026.pdf',
  },
};

export function NewsletterSignup({ handbook = 'ml' }: { handbook?: HandbookKey }) {
  const display = HANDBOOKS[handbook];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const startDownload = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = display.downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: trimmed, handbook }),
      });

      if (!response.ok) {
        let message = 'Something went wrong. Please try again.';
        try {
          const body = await response.json();
          if (typeof body?.error === 'string') message = body.error;
        } catch {
          // Keep the safe generic message if the server did not return JSON.
        }
        throw new Error(message);
      }

      const pdfBlob = await response.blob();
      if (pdfBlob.type !== 'application/pdf' || pdfBlob.size === 0) {
        throw new Error('The download could not be prepared. Please try again.');
      }

      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      const objectUrl = URL.createObjectURL(pdfBlob);
      setDownloadUrl(objectUrl);
      setStatus('success');
      startDownload(objectUrl);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-8 text-center my-10">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">You're all set! 🎉</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Your email was saved and the {display.title} download has started.
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            download={display.downloadName}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF Again
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-6 md:p-8 my-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-shrink-0 w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Download className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            Free Download: {display.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {display.description} Enter your email to download it instantly.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col gap-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                  if (status === 'error') setStatus('idle');
                }}
                onKeyDown={(e) => e.key === 'Enter' && status !== 'loading' && handleSubmit()}
                placeholder="your@email.com"
                disabled={status === 'loading'}
                aria-label="Email address"
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-60 disabled:opacity-60"
              />
              {errorMsg && (
                <span className="text-red-600 text-xs px-1" role="alert">{errorMsg}</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Get Free PDF
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center sm:text-left px-1">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
