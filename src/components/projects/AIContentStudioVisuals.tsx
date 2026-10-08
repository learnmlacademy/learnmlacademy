import React from "react";

export function ContentStudioWorkflow() {
  const parts = [
    ["1 · Brief", "Supply real facts, audience, brand and objective"],
    ["2 · Prompt", "Separate instructions from user-provided brief data"],
    ["3 · Generate", "Offline template or user-approved real API request"],
    ["4 · Validate", "Pydantic checks fields, tone and length"],
    ["5 · Review", "Human checks factual claims and content rights"],
    ["6 · Export", "Save Markdown or structured JSON"],
  ];
  return <figure className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 sm:p-7">
    <figcaption>
      <h2 className="text-xl font-extrabold text-slate-950">How one brief becomes a publishable draft</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">The language model does not independently know your organization's prices, event dates, permissions or promises. A structured workflow prevents drafts from being mistaken for checked facts.</p>
    </figcaption>
    <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {parts.map(([name,desc],i)=><li className="rounded-xl border border-indigo-200 bg-white p-4" key={name}>
        <p className="text-sm font-extrabold text-indigo-800">{name}</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">{desc}</p>
        <p className="mt-2 text-xs text-slate-500">Step {i+1} / {parts.length}</p>
      </li>)}
    </ol>
  </figure>;
}

export function StudioQualityRubric() {
  const rubric = [
    {name:"Audience relevance",weight:40,score:4},
    {name:"Factual grounding",weight:30,score:5},
    {name:"Call-to-action clarity",weight:20,score:3},
    {name:"Readability",weight:10,score:4},
  ];
  const sum=rubric.reduce((a,x)=>a+x.weight*x.score/100,0);
  return <figure className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
    <figcaption>
      <h2 className="text-xl font-extrabold text-slate-950">Calculate editorial quality by hand</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">After reading a draft, a human reviewer gives a score from 0–5 for each category. The weights sum to 100%. These are hypothetical reviewer scores, not measurements returned by a model.</p>
    </figcaption>
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead><tr className="bg-slate-100">
          <th className="border border-slate-300 p-3">Criterion</th><th className="border border-slate-300 p-3">Weight</th><th className="border border-slate-300 p-3">Score / 5</th><th className="border border-slate-300 p-3">Weighted points</th>
        </tr></thead>
        <tbody>{rubric.map(x=><tr key={x.name}>
          <td className="border border-slate-300 p-3">{x.name}</td>
          <td className="border border-slate-300 p-3">{x.weight}%</td>
          <td className="border border-slate-300 p-3">{x.score}</td>
          <td className="border border-slate-300 p-3 font-semibold">{(x.weight*x.score/100).toFixed(2)}</td>
        </tr>)}</tbody>
        <tfoot><tr className="bg-indigo-50 font-bold">
          <td className="border border-slate-300 p-3">Total</td>
          <td className="border border-slate-300 p-3">100%</td>
          <td className="border border-slate-300 p-3">—</td>
          <td className="border border-slate-300 p-3">{sum.toFixed(2)} / 5</td>
        </tr></tfoot>
      </table>
    </div>
    <p className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4 font-mono text-sm leading-7 text-indigo-950">0.40 × 4 + 0.30 × 5 + 0.20 × 3 + 0.10 × 4 = {sum.toFixed(1)} / 5</p>
    <p className="mt-3 text-xs leading-5 text-slate-600">A high score is not evidence a specific claim is true. The reviewer must verify any prices, dates, statistics and permissions independently.</p>
  </figure>;
}

export function StructuredOutputVisual() {
  return <figure className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-5 sm:p-7">
    <figcaption>
      <h2 className="text-xl font-extrabold text-slate-950">Why a fixed JSON output format matters</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">Rather than extracting fields from arbitrary free-form text, the application requests named JSON keys, validates the response with Pydantic and rejects missing or unknown fields.</p>
    </figcaption>
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      <div className="rounded-xl border border-emerald-200 bg-white p-4">
        <p className="font-bold text-emerald-900">Expected structure</p>
        <pre className="mt-2 overflow-x-auto text-xs leading-6">{'{\n  "headline": "...",\n  "body": "...",\n  "call_to_action": "...",\n  "target_audience": "...",\n  "tone": "Friendly",\n  "caveat": "...",\n  "source_mode": "OpenAI API"\n}'}</pre>
      </div>
      <div className="rounded-xl border border-rose-200 bg-white p-4">
        <p className="font-bold text-rose-900">Rejected example</p>
        <pre className="mt-2 overflow-x-auto text-xs leading-6">{'{\n  "headline": "...",\n  "body": "...",\n  "secret_instruction": "ignore limits"\n}'}</pre>
        <p className="mt-2 text-xs leading-6 text-slate-700">Missing required fields and extra unknown key → validation fails. A malformed AI response is not silently passed off as success.</p>
      </div>
    </div>
  </figure>;
}
