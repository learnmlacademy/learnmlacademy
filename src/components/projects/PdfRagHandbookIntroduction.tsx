import React from 'react';
import {
  RagChunkOverlapVisual,
  RagCitationGateVisual,
  RagCosineWorkedExample,
  RagTwoPathDiagram,
} from './PdfRagConceptVisuals';

/**
 * Project 10 teaching introduction.
 * Intentionally has no public route until the actual verified implementation,
 * complete runnable source, screenshots and tests are integrated.
 */
export function PdfRagHandbookIntroduction() {
  return (
    <div className="space-y-8 text-slate-800">
      <section className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-9">
        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Project 10 · PDF Retrieval-Augmented Generation</p>
        <h2 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">Can an AI find the right answer in a long PDF — and prove it?</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
          Imagine a university publishes a long student handbook. You ask: “What happens if I cancel a course after the deadline?”
          A plausible answer is not enough. You need the exact rule, the PDF it came from and its page number.
        </p>
        <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4"><strong className="block text-cyan-300">Input</strong><span className="mt-1 block">One or more readable PDF documents, plus a natural-language question</span></div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4"><strong className="block text-cyan-300">Output</strong><span className="mt-1 block">A short grounded answer with a traceable file/page citation</span></div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4"><strong className="block text-cyan-300">Safety check</strong><span className="mt-1 block">If the uploaded pages do not support the answer, say so</span></div>
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-200 bg-indigo-50/30 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-950">What must the finished assistant do?</h2>
        <p className="mt-2 text-sm leading-7">
          We will not ask an LLM to memorise an entire file. We will build a small search system that retrieves
          relevant passages, and only then let an answer generator use that evidence.
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ['1', 'Read PDF pages', 'Extract readable text and attach the original file name and page number.'],
            ['2', 'Find relevant passages', 'Split long text, turn it into searchable vectors and retrieve likely matches.'],
            ['3', 'Explain an answer', 'Show why the cited passages support the answer.'],
            ['4', 'Know when to stop', 'Reject fake page citations and admit when no supporting passage exists.'],
          ].map(([number, title, detail]) => (
            <li key={number} className="flex gap-3 rounded-xl border border-indigo-100 bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-sm font-bold text-white">{number}</span>
              <div><h3 className="font-bold text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-700">{detail}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-slate-950">First understand the two jobs in RAG</h2>
        <p className="text-sm leading-7">RAG stands for <strong>retrieval-augmented generation</strong>: find source material first, then generate a response using it. The key engineering detail is that loading the document and answering a question are different workflows.</p>
        <RagTwoPathDiagram />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-slate-950">Why not store the whole PDF as one paragraph?</h2>
        <p className="text-sm leading-7">A long PDF covers many subjects. Breaking it into smaller passages makes it easier to retrieve only what a question needs. Overlap helps when an important sentence straddles the boundary between two passages.</p>
        <RagChunkOverlapVisual />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-slate-950">How does the search know which passage is closest?</h2>
        <p className="text-sm leading-7">An embedding converts text into a list of numbers that helps compare meaning. In the real project the list is much longer; the small example below shows the actual mathematics of the similarity calculation.</p>
        <RagCosineWorkedExample />
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-slate-950">Can a confident answer still be wrong?</h2>
        <p className="text-sm leading-7">Yes. A language model can produce convincing words without sufficient evidence. A production-style assistant must preserve where each retrieved passage came from and must never accept citations that were simply invented during generation.</p>
        <RagCitationGateVisual />
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-amber-950">Three questions to test your completed project</h2>
        <ol className="mt-3 list-inside list-decimal space-y-3 text-sm leading-7 text-amber-950">
          <li><strong>Findable:</strong> Ask something explicitly stated on one page. Does the cited page actually contain the answer?</li>
          <li><strong>Unfindable:</strong> Ask about a policy that is absent. Does the app decline rather than invent an answer?</li>
          <li><strong>Repeatable:</strong> Restart the app and ask the same question. Can it use its saved index without reparsing everything?</li>
        </ol>
        <p className="mt-4 text-xs leading-6 text-amber-950">
          This is the explanatory introduction, not proof that the complete application is finished.
          The full handbook must add exact tools, installation commands, runnable code, real screenshots,
          evaluation results, troubleshooting and deployment steps after the engineering has been verified.
        </p>
      </section>
    </div>
  );
}
