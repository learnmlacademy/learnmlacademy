import React from "react";

export function RagArchitectureDiagram() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            End-to-End 2D RAG Architecture with Validation Gates & Fallbacks
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real production RAG gates context sufficiency before passing documents to the generator.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
            Happy Path
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-500 inline-block rotate-45" />
            Validation Gate
          </span>
          <span className="flex items-center gap-1.5 text-rose-700">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 inline-block" />
            Abstain Branch
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 760 360"
        className="w-full h-auto bg-slate-50/50 rounded-xl"
        role="img"
        aria-label="2D RAG Architecture Diagram showing happy path, relevance gate, and safe abstention branch"
      >
        <defs>
          <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#059669" />
          </marker>
          <marker id="arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#4f46e5" />
          </marker>
          <marker id="arrow-rose" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#e11d48" />
          </marker>
          <marker id="arrow-slate" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#64748b" />
          </marker>
        </defs>

        {/* 1. User Query */}
        <g transform="translate(20, 60)">
          <rect width="130" height="64" rx="10" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
          <text x="65" y="26" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">1. User Query</text>
          <text x="65" y="44" textAnchor="middle" fontSize="10" fill="#64748b">“Casual leave rules?”</text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="150" y1="92" x2="185" y2="92" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-slate)" />

        {/* 2. Hybrid Retrieval Node */}
        <g transform="translate(190, 50)">
          <rect width="145" height="84" rx="10" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
          <text x="72" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#312e81">2. Hybrid Retrieval</text>
          <text x="72" y="42" textAnchor="middle" fontSize="10" fill="#4338ca">Dense (Bi-Encoder)</text>
          <text x="72" y="58" textAnchor="middle" fontSize="10" fill="#4338ca">+ Sparse (BM25)</text>
          <text x="72" y="74" textAnchor="middle" fontSize="9" fill="#6366f1">Top-K Candidate Chunks</text>
        </g>

        {/* Arrow 2 -> Gate */}
        <line x1="335" y1="92" x2="375" y2="92" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-indigo)" />

        {/* 3. Validation Gate: Sufficiency Diamond */}
        <g transform="translate(425, 92)">
          <polygon points="0,-42 48,0 0,42 -48,0" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          <text x="0" y="-8" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">Sufficiency</text>
          <text x="0" y="6" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">Gate</text>
          <text x="0" y="20" textAnchor="middle" fontSize="8.5" fill="#92400e">Score ≥ 0.75?</text>
        </g>

        {/* Happy Path Branch: Arrow from Gate -> Prompt Assembly */}
        <line x1="473" y1="92" x2="515" y2="92" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrow-emerald)" />
        <text x="494" y="82" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#059669">PASS</text>

        {/* 4. Context Assembly & LLM Node */}
        <g transform="translate(520, 50)">
          <rect width="135" height="84" rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
          <text x="67" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#064e3b">3. Prompt Assembly</text>
          <text x="67" y="42" textAnchor="middle" fontSize="10" fill="#047857">Grounding Context</text>
          <text x="67" y="58" textAnchor="middle" fontSize="10" fill="#047857">+ User Question</text>
          <text x="67" y="74" textAnchor="middle" fontSize="9" fill="#059669">System Instructions</text>
        </g>

        {/* Arrow 4 -> 5 */}
        <line x1="587" y1="134" x2="587" y2="168" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrow-emerald)" />

        {/* 5. Generator & Citation Verifier */}
        <g transform="translate(515, 175)">
          <rect width="145" height="82" rx="10" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" />
          <text x="72" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#065f46">4. LLM Generation</text>
          <text x="72" y="42" textAnchor="middle" fontSize="10" fill="#047857">Grounded Synthesis</text>
          <text x="72" y="58" textAnchor="middle" fontSize="9.5" fill="#059669">Attribution Verification</text>
          <text x="72" y="73" textAnchor="middle" fontSize="9" fill="#10b981">Cite: [HR-2026 §4.2]</text>
        </g>

        {/* Final Output: Happy Path */}
        <g transform="translate(515, 290)">
          <rect width="145" height="48" rx="8" fill="#10b981" />
          <text x="72" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">Verified Answer</text>
          <text x="72" y="38" textAnchor="middle" fontSize="9.5" fill="#d1fae5">14 Days + Exact Citation</text>
        </g>
        <line x1="587" y1="257" x2="587" y2="285" stroke="#059669" strokeWidth="2" markerEnd="url(#arrow-emerald)" />

        {/* FALLBACK / ABSTENTION BRANCH (Downwards from Gate) */}
        <line x1="425" y1="134" x2="425" y2="200" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrow-rose)" />
        <text x="445" y="170" textAnchor="start" fontSize="9.5" fontWeight="bold" fill="#e11d48">FAIL (&lt; 0.75)</text>

        {/* Safe Abstention Node */}
        <g transform="translate(345, 205)">
          <rect width="160" height="74" rx="10" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
          <text x="80" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9f1239">Safe Abstention Gate</text>
          <text x="80" y="42" textAnchor="middle" fontSize="9.5" fill="#be123c">Relevance Insufficient</text>
          <text x="80" y="58" textAnchor="middle" fontSize="9" fill="#e11d48">No Hallucination Allowed</text>
        </g>

        {/* Final Refusal Output */}
        <g transform="translate(345, 305)">
          <rect width="160" height="42" rx="8" fill="#e11d48" />
          <text x="80" y="20" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">Explicit Safe Refusal</text>
          <text x="80" y="34" textAnchor="middle" fontSize="9" fill="#ffe4e6">“Information not in handbook”</text>
        </g>
        <line x1="425" y1="279" x2="425" y2="300" stroke="#e11d48" strokeWidth="2" markerEnd="url(#arrow-rose)" />

        {/* Feedback / Query Rewrite Loop (from Abstain back to Query) */}
        <path
          d="M 345,242 C 240,242 240,165 140,130"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrow-slate)"
        />
        <text x="220" y="225" textAnchor="middle" fontSize="8.5" fill="#64748b" transform="rotate(-18 220 225)">
          Optional Query Rewrite
        </text>
      </svg>
    </div>
  );
}
