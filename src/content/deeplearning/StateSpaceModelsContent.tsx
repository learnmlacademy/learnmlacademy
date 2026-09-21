import React from "react";

function StateUpdateFigure() {
  const readings = ["x₁", "x₂", "x₃", "x₄"];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">A compact state carries selected information through a long sequence</p>
      </div>
      <div className="overflow-x-auto p-5 md:p-6">
        <div className="flex min-w-[760px] items-center gap-3">
          {readings.map((reading, index) => (
            <React.Fragment key={reading}>
              <div className="w-40 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-center">
                <p className="font-mono font-bold text-cyan-900">input {reading}</p>
                <p className="my-2 text-2xl text-cyan-500">↓</p>
                <p className="rounded-full bg-cyan-800 p-3 font-mono font-bold text-white">state s{index + 1}</p>
                <p className="mt-2 text-xs text-slate-600">produces y{index + 1}</p>
              </div>
              {index < readings.length - 1 && <span className="text-3xl font-black text-slate-400">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm text-slate-600">The state is updated rather than storing every earlier input separately. Structured and selective SSMs make this idea efficient and input-aware in different ways.</figcaption>
    </figure>
  );
}

export function StateSpaceModelsContent() {
  return (
    <div className="prose prose-lg max-w-none text-slate-700">
      <section className="not-prose mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-cyan-950 to-indigo-800 px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-200">Advanced Deep Learning Topic</p>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-cyan-50">State-space models maintain a compact internal state while processing an ordered sequence. This optional lesson preserves the state-space material outside the 24-lesson core path.</p>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Basic State Update</h2>
        <p className="text-lg leading-relaxed">In a simplified discrete linear model, A carries information from the previous state, B writes the current input, C reads the state, and D can pass the current input directly to the output. In practical models these symbols usually represent learned or structured matrices.</p>
        <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6">
          <p className="font-mono text-xl font-bold">s<sub>t</sub> = A s<sub>t−1</sub> + B x<sub>t</sub></p>
          <p className="mt-2 font-mono text-xl font-bold">y<sub>t</sub> = C s<sub>t</sub> + D x<sub>t</sub></p>
        </div>
        <StateUpdateFigure />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A One-Dimensional Teaching Example</h2>
        <p className="text-lg leading-relaxed">Choose A=0.9 and B=0.2 only to make the arithmetic visible. Let the previous state be 0.5 and the current data value be 1.</p>
        <div className="not-prose rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
          <p className="font-mono text-sm leading-7 text-cyan-950">s<sub>t</sub>=(0.9×0.5)+(0.2×1)=0.45+0.20=<strong>0.65</strong></p>
          <p className="mt-3 text-sm leading-relaxed text-cyan-900">The first product retains part of the old state; the second writes current evidence; addition combines them. A real model learns or constrains these transformations during training.</p>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">From Classical to Selective SSMs</h2>
        <p className="text-lg leading-relaxed">Structured SSMs parameterize the state update so long sequences can be processed efficiently. Selective variants make parts of the update depend on the current input, allowing the model to preserve or suppress information conditionally. These architectures need task-specific evidence: compare quality, latency, memory, tooling and long-context behavior with recurrent and attention baselines.</p>
      </section>
      <section>
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Related Learning</h2>
        <div className="not-prose mb-10 grid gap-4 md:grid-cols-2">
          <a href="/learn/deep-learning-intro" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Back to Deep Learning</p><p className="m-0 font-bold text-slate-900">Deep Learning Basics and Model Types</p></a>
          <a href="/learn/pinn-kan-topological-networks" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Related Advanced Topic</p><p className="m-0 font-bold text-slate-900">Physics-Informed, KAN and Topological Networks</p></a>
        </div>
      </section>
    </div>
  );
}
