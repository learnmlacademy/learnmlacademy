import React from 'react';

/**
 * Reusable Project 10 teaching visuals.
 * All numbers in these diagrams are explicitly illustrative.
 * Do not present them as measurements of the learner's uploaded PDF.
 */

type Stage = { name: string; detail: string; tone: string };
const indexStages: Stage[] = [
  { name: 'Upload PDF', detail: 'Check file type, size and pages', tone: 'border-slate-300 bg-slate-50' },
  { name: 'Extract', detail: 'Preserve file + page numbers', tone: 'border-sky-300 bg-sky-50' },
  { name: 'Chunk', detail: 'Split with small overlap', tone: 'border-cyan-300 bg-cyan-50' },
  { name: 'Embed', detail: 'Text → numeric vectors', tone: 'border-violet-300 bg-violet-50' },
  { name: 'Save index', detail: 'Vectors + source metadata', tone: 'border-emerald-300 bg-emerald-50' },
];
const questionStages: Stage[] = [
  { name: 'Question', detail: 'Embed the new question', tone: 'border-slate-300 bg-slate-50' },
  { name: 'Retrieve', detail: 'Nearest matching chunks', tone: 'border-sky-300 bg-sky-50' },
  { name: 'Rerank', detail: 'Inspect most relevant evidence', tone: 'border-cyan-300 bg-cyan-50' },
  { name: 'Draft', detail: 'Answer using retrieved text only', tone: 'border-violet-300 bg-violet-50' },
  { name: 'Validate', detail: 'Citations or abstain', tone: 'border-emerald-300 bg-emerald-50' },
];

function StageRow({ stages }: { stages: Stage[] }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-5" aria-label="Ordered processing stages">
      {stages.map((stage, index) => (
        <li key={stage.name} className={`relative rounded-xl border p-3 ${stage.tone}`}>
          <div className="mb-1 text-xs font-bold text-slate-600">Step {index + 1}</div>
          <div className="font-bold text-slate-950">{stage.name}</div>
          <div className="mt-1 text-xs leading-5 text-slate-700">{stage.detail}</div>
          {index < stages.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white px-1 text-slate-600 sm:block" aria-hidden="true">→</span>}
        </li>
      ))}
    </ol>
  );
}

/** The key beginner misconception: indexing does NOT repeat for every question. */
export function RagTwoPathDiagram() {
  return (
    <figure className="my-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <figcaption>
        <h3 className="text-lg font-extrabold text-slate-950">How a PDF question becomes a cited answer</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">A RAG assistant has two separate jobs. First, prepare each document for search. Then, whenever a user asks a question, search that saved evidence before writing an answer.</p>
      </figcaption>
      <section className="rounded-xl border border-sky-200 bg-sky-50/40 p-3 sm:p-4" aria-label="PDF indexing workflow">
        <h4 className="mb-3 text-sm font-bold text-sky-950">A. Index when a PDF is added or changed</h4>
        <StageRow stages={indexStages} />
      </section>
      <section className="rounded-xl border border-violet-200 bg-violet-50/40 p-3 sm:p-4" aria-label="Answering workflow">
        <h4 className="mb-3 text-sm font-bold text-violet-950">B. Answer every new question</h4>
        <StageRow stages={questionStages} />
      </section>
      <p className="text-xs leading-5 text-slate-600">Saved indexes avoid repeating extraction and embedding on every query. Re-index when the underlying PDF or chunking/embedding configuration changes.</p>
    </figure>
  );
}

/** Ten token-like units, chunk size four, overlap one; all values educational. */
export function RagChunkOverlapVisual() {
  const words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const chunks = [
    { name: 'Chunk 1', start: 0, end: 4, overlap: -1 },
    { name: 'Chunk 2', start: 3, end: 7, overlap: 3 },
    { name: 'Chunk 3', start: 6, end: 10, overlap: 6 },
  ];
  return (
    <figure className="my-6 rounded-2xl border border-cyan-200 bg-cyan-50/40 p-4 sm:p-6">
      <figcaption>
        <h3 className="text-lg font-extrabold text-slate-950">Why PDF chunks overlap</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">Imagine a ten-unit sentence. With chunk size 4 and overlap 1, a boundary word appears in adjacent chunks so context is not lost when a sentence crosses the boundary.</p>
      </figcaption>
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[390px]">
          <div className="grid grid-cols-10 gap-1">
            {words.map((word, i) => <div key={i} className="rounded-lg border border-slate-300 bg-white py-3 text-center text-sm font-bold text-slate-800">{word}</div>)}
          </div>
          {chunks.map(chunk => (
            <div key={chunk.name} className="mt-2 grid grid-cols-10 gap-1" aria-label={`${chunk.name}: ${words.slice(chunk.start, chunk.end).join(', ')}`}>
              {words.map((word, i) => (
                <div key={i} className={`rounded-lg border py-2 text-center text-xs font-bold ${i < chunk.start || i >= chunk.end ? 'border-transparent text-transparent' : i === chunk.overlap ? 'border-amber-400 bg-amber-200 text-amber-950' : 'border-sky-300 bg-sky-200 text-sky-950'}`}>
                  {i >= chunk.start && i < chunk.end ? word : '·'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700"><strong>Count it:</strong> Chunk 1 = A–D, Chunk 2 = D–G, Chunk 3 = G–J. The highlighted D and G are copied into the next chunk. Overlap preserves nearby context but also increases stored text and retrieval cost.</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">This is a simplified unit example. The application must define whether its chunk size counts tokens, words or characters and use that unit consistently.</p>
    </figure>
  );
}

export function RagCosineWorkedExample() {
  const examples = [
    { label: 'Question', vector: '[1, 1]', note: 'User asks about two concepts', tone: 'border-indigo-300 bg-indigo-50' },
    { label: 'Chunk A', vector: '[1, 0]', note: 'Mentions only the first concept', tone: 'border-amber-300 bg-amber-50' },
    { label: 'Chunk B', vector: '[1, 1]', note: 'Mentions both concepts', tone: 'border-emerald-300 bg-emerald-50' },
  ];
  return (
    <figure className="my-6 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4 sm:p-6">
      <figcaption>
        <h3 className="text-lg font-extrabold text-slate-950">Which chunk matches the question? Calculate it</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">Embeddings are numeric vectors. This two-number example lets you calculate cosine similarity by hand before using a real embedding model with many more dimensions.</p>
      </figcaption>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {examples.map(x => <div key={x.label} className={`rounded-xl border p-4 ${x.tone}`}><div className="text-sm font-bold text-slate-900">{x.label}</div><div className="mt-1 font-mono text-xl font-black">{x.vector}</div><div className="mt-2 text-xs leading-5">{x.note}</div></div>)}
      </div>
      <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7">
        <p><strong>Formula:</strong> cosine(Q, C) = (Q · C) / (||Q|| × ||C||)</p>
        <p><strong>Q versus A:</strong> (1×1 + 1×0) / (√2 × 1) = 1/√2 ≈ <strong>0.707</strong></p>
        <p><strong>Q versus B:</strong> (1×1 + 1×1) / (√2 × √2) = 2/2 = <strong>1.000</strong></p>
        <p><strong>Decision:</strong> Chunk B is closer in this example. A real pipeline must still check whether the retrieved text actually supports the requested answer.</p>
      </div>
      <p className="mt-2 text-xs text-slate-600">Illustrative vectors, not the output of a specific embedding model. High similarity is not proof that a statement is true.</p>
    </figure>
  );
}

export function RagCitationGateVisual() {
  const checks = [
    ['Evidence exists', 'Is the question supported by retrieved text?'],
    ['Source matches', 'Is each cited file/page/chunk among the retrieved IDs?'],
    ['Claim is supported', 'Does the cited passage actually justify the claim?'],
    ['Answer or abstain', 'If any check fails, do not invent a citation.'],
  ];
  return (
    <figure className="my-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-6">
      <figcaption>
        <h3 className="text-lg font-extrabold text-slate-950">A citation is a checkable pointer, not decoration</h3>
        <p className="mt-2 text-sm leading-6 text-slate-700">The system keeps a source ID like <code>report.pdf:page-12:chunk-03</code> with every vector. An answer is accepted only if its citations point to the evidence used and its claims are supported.</p>
      </figcaption>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {checks.map(([title, question], index) => <li key={title} className="rounded-xl border border-emerald-200 bg-white p-4"><div className="text-xs font-bold text-emerald-800">Gate {index + 1}</div><h4 className="mt-1 font-bold text-slate-950">{title}</h4><p className="mt-1 text-sm leading-6 text-slate-700">{question}</p></li>)}
      </ol>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-300 bg-emerald-100 p-3 text-sm text-emerald-950"><strong>Supported:</strong> “Section 3 reports the target metric [report.pdf, p. 12].”</div>
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-950"><strong>Unsupported:</strong> “I could not find that fact in the uploaded document.”</div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">Do not trust a model-created page reference without source-ID validation. Source IDs must come from PDF extraction and retrieval, not from the model's imagination.</p>
    </figure>
  );
}
