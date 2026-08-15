import React from "react";

function Arrow() {
  return (
    <div className="flex items-center justify-center text-slate-400 text-2xl font-bold" aria-hidden="true">
      →
    </div>
  );
}

export function SimpleProgrammingVsMLDiagram() {
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Traditional Programming vs Machine Learning
      </figcaption>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <p className="text-lg font-bold text-slate-900 mb-4 text-center">Traditional Programming</p>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center text-center">
            <div className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-4">
              <div className="font-bold text-blue-800">Rules</div>
              <div className="text-xs text-slate-600 mt-1">Written by us</div>
            </div>
            <Arrow />
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-4">
              <div className="font-bold text-slate-800">Program</div>
              <div className="text-xs text-slate-600 mt-1">Uses the rules</div>
            </div>
            <Arrow />
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-4">
              <div className="font-bold text-amber-800">Answer</div>
              <div className="text-xs text-slate-600 mt-1">Calculated result</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 text-center">
            Example: We write the exact formula for calculating tax.
          </p>
        </div>

        <div className="border border-indigo-200 rounded-xl p-5 bg-indigo-50/40 shadow-sm">
          <p className="text-lg font-bold text-indigo-900 mb-4 text-center">Machine Learning</p>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center text-center">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-4">
              <div className="font-bold text-emerald-800">Examples</div>
              <div className="text-xs text-slate-600 mt-1">Data + known answers</div>
            </div>
            <Arrow />
            <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-4">
              <div className="font-bold text-indigo-800">Learning</div>
              <div className="text-xs text-slate-600 mt-1">Finds a pattern</div>
            </div>
            <Arrow />
            <div className="rounded-lg bg-purple-50 border border-purple-200 px-3 py-4">
              <div className="font-bold text-purple-800">Model</div>
              <div className="text-xs text-slate-600 mt-1">Learned rule</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 text-center">
            The learned model is then used to predict an answer for new data.
          </p>
        </div>
      </div>
    </figure>
  );
}

export function SimpleFruitLearningDiagram() {
  const examples = [
    { fruit: "🍎", label: "Apple" },
    { fruit: "🍌", label: "Banana" },
    { fruit: "🍊", label: "Orange" },
  ];

  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Learning from Examples
      </figcaption>

      <div className="border border-slate-200 rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_auto_1fr_auto_1fr] gap-4 items-center">
          <div>
            <p className="font-bold text-slate-900 text-center mb-3">1. Show labelled examples</p>
            <div className="grid grid-cols-3 gap-2">
              {examples.map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="text-3xl" aria-hidden="true">{item.fruit}</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <Arrow />

          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 text-center">
            <p className="font-bold text-indigo-900">2. Learn the pattern</p>
            <p className="text-sm text-slate-700 mt-2">Shape, colour and other useful features help separate the fruits.</p>
          </div>

          <Arrow />

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="font-bold text-emerald-900">3. Predict a new example</p>
            <div className="text-4xl my-2" aria-hidden="true">🍏</div>
            <p className="text-sm text-slate-700">New fruit → <strong>Apple</strong></p>
          </div>
        </div>
      </div>
    </figure>
  );
}
