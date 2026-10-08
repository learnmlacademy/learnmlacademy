import React from 'react';

/** Educational diagrams: not measured experiment results. */
const stages = [
  ['Plan', 'Clarify the research question'],
  ['Search', 'Get candidate source IDs'],
  ['Read', 'Fetch actual text, not snippets'],
  ['Take notes', 'Copy relevant exact sentences'],
  ['Verify', 'Confirm source IDs + quotations'],
  ['Report', 'Cite evidence and show limitations'],
];

export function ResearchAgentFlow() {
  return <figure className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 sm:p-7">
    <figcaption>
      <h2 className="text-xl font-extrabold text-slate-950">The six-step tool-using research agent</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">The agent has explicit state transitions and named tools. It cannot decide to execute arbitrary code or visit random websites.</p>
    </figcaption>
    <ol className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
      {stages.map(([title, description], i) => <li key={title} className="relative rounded-xl border border-indigo-200 bg-white p-3">
        <div className="text-xs font-bold text-indigo-700">Tool {i+1}</div>
        <h3 className="mt-1 font-extrabold text-slate-950">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-700">{description}</p>
        {i<5 && <span aria-hidden="true" className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-white px-1 font-bold text-indigo-700 xl:block">→</span>}
      </li>)}
    </ol>
  </figure>;
}

export function ResearchSourceTrustDiagram() {
  return <figure className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-7">
    <figcaption>
      <h2 className="text-xl font-extrabold text-slate-950">Three different checks — don't confuse them</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">A source pointer is necessary but not sufficient to trust a claim.</p>
    </figcaption>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-emerald-300 bg-white p-4">
        <div className="text-xs font-bold text-emerald-800">1 · Confirmed in code</div>
        <h3 className="mt-1 font-bold">Quote provenance</h3>
        <p className="mt-2 text-sm leading-6">Does the exact quoted sentence occur in the retrieved source with the stated ID?</p>
      </div>
      <div className="rounded-xl border border-amber-300 bg-white p-4">
        <div className="text-xs font-bold text-amber-800">2 · Requires source review</div>
        <h3 className="mt-1 font-bold">Source credibility</h3>
        <p className="mt-2 text-sm leading-6">Who wrote the source? Is it current and independent? Is it primary research?</p>
      </div>
      <div className="rounded-xl border border-rose-300 bg-white p-4">
        <div className="text-xs font-bold text-rose-800">3 · Requires claim checking</div>
        <h3 className="mt-1 font-bold">Real-world correctness</h3>
        <p className="mt-2 text-sm leading-6">Does the evidence support the claim, including context, uncertainty and counterexamples?</p>
      </div>
    </div>
    <p className="mt-3 text-xs leading-5 text-slate-600">Project 11 implements step 1; steps 2 and 3 remain explicit human verification tasks. Never label verified quotation as verified science.</p>
  </figure>;
}

export function ResearchLexicalNumerical() {
  return <figure className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
    <figcaption>
      <h2 className="text-xl font-extrabold text-slate-950">Worked numerical: how the note selector ranks sentences</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">The learning question contains five meaningful words. Count exact word overlap with two example sentences.</p>
    </figcaption>
    <div className="mt-4 rounded-lg bg-slate-100 p-3 font-mono text-sm">Question terms = {'{urban, trees, cool, limits, benefits}'}</div>
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead><tr className="bg-slate-100"><th className="border p-3">Sample sentence</th><th className="border p-3">Matching terms</th><th className="border p-3">Score</th></tr></thead>
        <tbody>
          <tr><td className="border p-3">Urban trees need water and care.</td><td className="border p-3">urban, trees</td><td className="border p-3 font-bold">2</td></tr>
          <tr><td className="border p-3">Trees provide shade.</td><td className="border p-3">trees</td><td className="border p-3 font-bold">1</td></tr>
        </tbody>
      </table>
    </div>
    <p className="mt-3 text-sm leading-7 text-slate-700"><strong>Calculation:</strong> score(sentence A) = |question words ∩ sentence A words| = 2; score(sentence B) = 1. The first gets ranked higher, but this does not prove it answers the question or is true.</p>
  </figure>;
}
