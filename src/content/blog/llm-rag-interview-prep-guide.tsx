import React from 'react';
import { Link } from 'react-router-dom';

export function LLMRAGInterviewPrepContent() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'LLM Fundamentals',
      items: [
        'Explain tokenization, embeddings, context windows and next-token prediction in plain English.',
        'Know the Transformer building blocks: self-attention, feed-forward layers, residual connections and normalization.',
        'Understand pretraining, instruction tuning, alignment and parameter-efficient fine-tuning such as LoRA.',
        'Be able to compare prompting, fine-tuning and retrieval augmentation and explain when each is appropriate.',
        'Know temperature, top-p and other decoding choices and how they change output behaviour.',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'RAG Architecture & Retrieval',
      items: [
        'Walk through ingestion, chunking, embedding, indexing, retrieval, prompt construction and answer generation end to end.',
        'Know how chunk size, overlap and document structure affect retrieval quality.',
        'Understand vector similarity, semantic search, metadata filtering and hybrid lexical-plus-vector retrieval.',
        'Explain reranking and why the first retrieval stage and final context-selection stage may use different models.',
        'Know the difference between retrieval failure and generation failure and how to debug each one.',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Evaluation, Safety & Quality',
      items: [
        'Evaluate retrieval separately from answer quality using grounded test sets and task-specific measures.',
        'Know how to measure relevance, faithfulness, answer correctness, latency and cost together.',
        'Discuss hallucination reduction without claiming RAG eliminates hallucinations.',
        'Understand prompt injection, untrusted retrieved content and access-control risks in enterprise RAG.',
        'Be ready to design an evaluation dataset from real user questions rather than only synthetic examples.',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Production LLM Systems',
      items: [
        'Discuss caching, batching, streaming, model routing and context management for lower latency and cost.',
        'Know when to use a managed vector database versus a simpler existing database with vector support.',
        'Explain observability: prompts, retrieval traces, model outputs, user feedback and cost metrics.',
        'Prepare an architecture for a document Q&A, support assistant or enterprise knowledge-search system.',
        'Have clear trade-offs ready for model quality versus latency, privacy, cost and operational complexity.',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-xl text-slate-600 leading-relaxed">
        LLM and RAG interviews often move quickly from Transformer fundamentals to production architecture. Prepare to explain not only how the model works, but also how retrieval, evaluation, safety and observability fit together.
      </p>

      {phases.map((phase) => (
        <section key={phase.phase} className="border-l-4 border-emerald-500 bg-white rounded-r-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">{phase.phase}</span>
            <h2 className="font-bold text-slate-900 text-xl">{phase.title}</h2>
          </div>
          <ul className="space-y-2">
            {phase.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Practise the dedicated LLM & RAG interview questions</h3>
        <p className="text-slate-600 text-sm mb-4">
          Continue with the interview lesson, then revisit RAG, vector databases and LLM evaluation from the main curriculum.
        </p>
        <Link to="/learn/genai-llm-rag-interview" className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
          LLM & RAG Interview Questions →
        </Link>
      </div>
    </div>
  );
}
