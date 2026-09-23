import React from "react";

type GraphKind = "step" | "sigmoid" | "tanh" | "relu" | "leaky" | "linear" | "elu" | "selu" | "softplus" | "gelu" | "silu";

const graphSpecs: Record<GraphKind, { yMin: number; yMax: number; yTicks: number[] }> = {
  step: { yMin: -0.2, yMax: 1.2, yTicks: [0, 0.5, 1] },
  sigmoid: { yMin: 0, yMax: 1, yTicks: [0, 0.5, 1] },
  tanh: { yMin: -1, yMax: 1, yTicks: [-1, 0, 1] },
  relu: { yMin: -1, yMax: 5, yTicks: [0, 2, 4] },
  leaky: { yMin: -1, yMax: 5, yTicks: [0, 2, 4] },
  linear: { yMin: -5, yMax: 5, yTicks: [-4, 0, 4] },
  elu: { yMin: -1.2, yMax: 5, yTicks: [-1, 0, 2, 4] },
  selu: { yMin: -2, yMax: 5.5, yTicks: [-1, 0, 2, 4] },
  softplus: { yMin: 0, yMax: 5.2, yTicks: [0, 2, 4] },
  gelu: { yMin: -1, yMax: 5, yTicks: [0, 2, 4] },
  silu: { yMin: -1, yMax: 5, yTicks: [0, 2, 4] },
};

function graphValue(kind: GraphKind, x: number) {
  const sigmoid = 1 / (1 + Math.exp(-x));
  if (kind === "step") return x < 0 ? 0 : 1;
  if (kind === "sigmoid") return sigmoid;
  if (kind === "tanh") return Math.tanh(x);
  if (kind === "relu") return Math.max(0, x);
  if (kind === "leaky") return x > 0 ? x : 0.01 * x;
  if (kind === "linear") return x;
  if (kind === "elu") return x > 0 ? x : Math.exp(x) - 1;
  if (kind === "selu") return 1.05070098 * (x > 0 ? x : 1.67326324 * (Math.exp(x) - 1));
  if (kind === "softplus") return Math.log1p(Math.exp(x));
  if (kind === "gelu") return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)));
  return x * sigmoid;
}

function ActivationGraph({
  kind,
  name,
  color,
  topLabel,
  bottomLabel,
  note,
  workedInput,
  workedOutput,
}: {
  kind: GraphKind;
  name: string;
  color: string;
  topLabel?: string;
  bottomLabel?: string;
  note: string;
  workedInput: number;
  workedOutput: number;
}) {
  const xMin = -5;
  const xMax = 5;
  const { yMin, yMax, yTicks } = graphSpecs[kind];
  const left = 42;
  const right = 330;
  const top = 22;
  const bottom = 184;
  const toX = (value: number) => left + ((value - xMin) / (xMax - xMin)) * (right - left);
  const toY = (value: number) => bottom - ((value - yMin) / (yMax - yMin)) * (bottom - top);
  const samples = Array.from({ length: 161 }, (_, index) => xMin + (index / 160) * (xMax - xMin));
  const path = samples.map((x, index) => `${index === 0 ? "M" : "L"} ${toX(x).toFixed(1)} ${toY(graphValue(kind, x)).toFixed(1)}`).join(" ");
  const pointX = toX(workedInput);
  const pointY = toY(workedOutput);
  const axisY = toY(Math.max(yMin, Math.min(yMax, 0)));
  const axisX = toX(0);
  return (
    <figure className="not-prose m-0">
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
        <svg viewBox="0 0 360 220" className="w-full" role="img" aria-label={`${name} activation-function graph`}>
          <rect x="1" y="1" width="358" height="218" rx="13" fill="#f8fafc" />
          {yTicks.map((value) => <g key={`y-${value}`}><line x1={left} y1={toY(value)} x2={right} y2={toY(value)} stroke="#e2e8f0" /><text x={left - 7} y={toY(value) + 4} textAnchor="end" fontSize="9" fill="#64748b">{value}</text></g>)}
          {[-5, 0, 5].map((value) => <g key={`x-${value}`}><line x1={toX(value)} y1={top} x2={toX(value)} y2={bottom} stroke="#e2e8f0" /><text x={toX(value)} y={bottom + 14} textAnchor="middle" fontSize="9" fill="#64748b">{value}</text></g>)}
          <line x1={left} y1={axisY} x2={right + 7} y2={axisY} stroke="#64748b" strokeWidth="1.5" />
          <polygon points={`${right + 1},${axisY - 4} ${right + 9},${axisY} ${right + 1},${axisY + 4}`} fill="#64748b" />
          <line x1={axisX} y1={bottom} x2={axisX} y2={top - 6} stroke="#64748b" strokeWidth="1.5" />
          <polygon points={`${axisX - 4},${top} ${axisX},${top - 8} ${axisX + 4},${top}`} fill="#64748b" />
          <text x={right - 2} y={axisY - 7} textAnchor="end" fontSize="10" fill="#475569">input x</text>
          <text x={axisX + 7} y={top + 3} fontSize="10" fill="#475569">output g(x)</text>
          {topLabel && <text x="34" y="49" fontSize="11" fontWeight="700" fill="#475569">{topLabel}</text>}
          {bottomLabel && <text x="34" y="180" fontSize="11" fontWeight="700" fill="#475569">{bottomLabel}</text>}
          <path d={path} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={pointX} y1={pointY} x2={pointX} y2={axisY} stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1={axisX} y1={pointY} x2={pointX} y2={pointY} stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={pointX} cy={pointY} r="5" fill="white" stroke={color} strokeWidth="3" />
          <rect x={Math.min(pointX + 8, 246)} y={Math.max(pointY - 25, 28)} width="82" height="21" rx="6" fill="white" stroke={color} />
          <text x={Math.min(pointX + 49, 287)} y={Math.max(pointY - 11, 42)} textAnchor="middle" fontSize="9" fontWeight="800" fill={color}>({workedInput}, {workedOutput})</text>
          <text x="180" y="209" textAnchor="middle" fontSize="11" fill="#64748b">{note}</text>
        </svg>
      </div>
    </figure>
  );
}

function NeuronPositionDiagram() {
  return (
    <figure className="not-prose my-7">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
        <svg viewBox="0 0 900 290" className="w-full min-w-[740px]" role="img" aria-labelledby="position-title position-desc">
          <title id="position-title">Where the activation function sits inside a neuron</title>
          <desc id="position-desc">Inputs are multiplied by weights, bias is added, and the resulting weighted sum passes through an activation function to become the neuron output.</desc>
          <rect x="18" y="18" width="864" height="250" rx="20" fill="#f8fafc" stroke="#e2e8f0" />
          {[
            [80, 70, "x₁"],
            [80, 145, "x₂"],
            [80, 220, "x₃"],
          ].map(([x, y, label], index) => (
            <g key={String(label)}>
              <circle cx={Number(x)} cy={Number(y)} r="28" fill="#4f46e5" />
              <text x={Number(x)} y={Number(y) + 6} textAnchor="middle" fill="white" fontSize="17" fontWeight="800">{label}</text>
              <line x1="108" y1={Number(y)} x2="318" y2="145" stroke="#818cf8" strokeWidth="3" />
              <rect x={180 + index * 12} y={Number(y) + (145 - Number(y)) * 0.43 - 13} width="48" height="26" rx="7" fill="white" stroke="#a5b4fc" />
              <text x={204 + index * 12} y={Number(y) + (145 - Number(y)) * 0.43 + 5} textAnchor="middle" fill="#4338ca" fontSize="12" fontWeight="700">w{index + 1}</text>
            </g>
          ))}
          <circle cx="378" cy="145" r="60" fill="#7c3aed" />
          <text x="378" y="135" textAnchor="middle" fill="white" fontSize="25" fontWeight="800">Σ + b</text>
          <text x="378" y="159" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">weighted sum</text>
          <text x="378" y="177" textAnchor="middle" fill="#ddd6fe" fontSize="11">call this z</text>
          <line x1="438" y1="145" x2="528" y2="145" stroke="#64748b" strokeWidth="3" />
          <polygon points="521,137 537,145 521,153" fill="#64748b" />
          <rect x="538" y="88" width="165" height="114" rx="22" fill="#f59e0b" />
          <text x="620" y="126" textAnchor="middle" fill="white" fontSize="17" fontWeight="800">ACTIVATION</text>
          <text x="620" y="151" textAnchor="middle" fill="white" fontSize="19" fontWeight="800">a = g(z)</text>
          <text x="620" y="176" textAnchor="middle" fill="#fffbeb" fontSize="12">changes z into a signal</text>
          <line x1="703" y1="145" x2="785" y2="145" stroke="#64748b" strokeWidth="3" />
          <polygon points="778,137 794,145 778,153" fill="#64748b" />
          <circle cx="830" cy="145" r="39" fill="#059669" />
          <text x="830" y="139" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">output</text>
          <text x="830" y="161" textAnchor="middle" fill="white" fontSize="20" fontWeight="800">a</text>
          <text x="80" y="265" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="700">inputs</text>
          <text x="225" y="265" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="700">weights</text>
          <text x="620" y="55" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="800">The activation function works here—after the weighted sum.</text>
        </svg>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">Figure 1: The exact position of an activation function inside one artificial neuron.</figcaption>
    </figure>
  );
}

function FunctionLesson({
  number,
  name,
  nickname,
  formula,
  kind,
  color,
  topLabel,
  bottomLabel,
  what,
  why,
  how,
  use,
  caution,
  example,
  values,
  formulaMeaning,
  workedInput,
  workedOutput,
  calculation,
}: {
  number: string;
  name: string;
  nickname: string;
  formula: string;
  kind: GraphKind;
  color: string;
  topLabel?: string;
  bottomLabel?: string;
  what: string;
  why: string;
  how: string;
  use: string;
  caution: string;
  example: string;
  values: Array<[string, string]>;
  formulaMeaning: string;
  workedInput: number;
  workedOutput: number;
  calculation: string;
}) {
  return (
    <section className="scroll-mt-24">
      <div className="flex items-start gap-4 mb-4">
        <span className="not-prose flex-shrink-0 h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold">{number}</span>
        <div>
          <h2 className="text-2xl font-bold text-indigo-800 m-0">{name}</h2>
          <p className="text-sm font-semibold text-slate-500 mt-1 mb-0">{nickname}</p>
        </div>
      </div>
      <div className="not-prose bg-indigo-950 text-white rounded-2xl p-5 md:p-6 mb-5">
        <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-300 mb-2">Formula</p>
        <p className="font-mono text-lg md:text-xl font-bold mb-3">{formula}</p>
        <p className="text-sm text-indigo-100 leading-relaxed m-0"><strong className="text-white">How to read it:</strong> {formulaMeaning}</p>
      </div>
      <div className="not-prose grid lg:grid-cols-[360px_1fr] gap-5 items-start">
        <ActivationGraph kind={kind} name={name} color={color} topLabel={topLabel} bottomLabel={bottomLabel} note={`Graph of ${formula}`} workedInput={workedInput} workedOutput={workedOutput} />
        <div className="space-y-3">
          {[
            ["What it is", what, "bg-indigo-50 border-indigo-200"],
            ["Why we use it", why, "bg-violet-50 border-violet-200"],
            ["How it behaves", how, "bg-sky-50 border-sky-200"],
            ["Where to use it", use, "bg-emerald-50 border-emerald-200"],
            ["Watch out", caution, "bg-amber-50 border-amber-200"],
          ].map(([title, text, classes]) => (
            <div key={title} className={`${classes} border rounded-xl p-4`}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">{title}</p>
              <p className="text-sm text-slate-700 m-0 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="not-prose mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 mb-2">Solved mathematical example</p>
        <p className="text-sm text-emerald-950 mb-2">Put <strong>x = {workedInput}</strong> into the formula and calculate the output:</p>
        <p className="font-mono text-base md:text-lg font-bold text-slate-900 bg-white border border-emerald-200 rounded-xl px-4 py-3 mb-3 overflow-x-auto">{calculation}</p>
        <p className="text-sm text-emerald-950 m-0"><strong>Graph connection:</strong> the highlighted dot is the coordinate <strong>({workedInput}, {workedOutput})</strong>. Its horizontal position is the input; its vertical position is the calculated output.</p>
      </div>
      <div className="not-prose mt-4 bg-slate-900 text-white rounded-xl p-4 flex gap-3 items-start">
        <span className="text-xl" aria-hidden="true">💡</span>
        <p className="text-sm leading-relaxed m-0"><strong className="text-indigo-300">Practical scenario:</strong> {example}</p>
      </div>
      <div className="not-prose mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Input x</th>{values.map(([input]) => <th key={input} className="p-3 text-center">{input}</th>)}</tr></thead>
          <tbody className="bg-white"><tr><td className="p-3 font-bold text-slate-900">Output g(x)</td>{values.map(([input, output]) => <td key={input} className="p-3 text-center font-mono text-indigo-700 font-bold">{output}</td>)}</tr></tbody>
        </table>
      </div>
    </section>
  );
}

export function ActivationFunctionsContent() {
  return (
    <div className="space-y-10">
      <header className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Deep Learning · Beginner Lesson</p>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Activation Functions: From a Neuron’s Score to Its Output</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-0">An activation function is a mathematical rule that changes a neuron’s raw score into the value it sends forward. In this lesson, you will calculate that value by hand, locate it on a graph, and learn which rule fits hidden layers, yes-or-no predictions, multiple classes, and number predictions.</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What Is an Activation Function?</h2>
        <p className="text-lg leading-relaxed">
          A neuron first multiplies its inputs by weights, adds those results, and adds a bias. This produces one raw number called the <strong>weighted sum</strong>, usually written as <strong>z</strong>. An <strong>activation function</strong> then changes z into the signal the neuron sends onward.
        </p>
        <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-5 my-5 text-center">
          <p className="font-mono text-lg md:text-xl font-bold text-indigo-950 m-0">z = (inputs × weights) + bias &nbsp; → &nbsp; output = activation(z)</p>
        </div>
        <p className="text-lg leading-relaxed">
          You can think of it as a <strong>signal shaper</strong>. Depending on the chosen function, it may block a value, keep it, smooth it into a probability-like number, or compare it with other class scores.
        </p>
        <div className="not-prose grid sm:grid-cols-2 gap-3 my-5">
          <div className="bg-white border border-slate-200 rounded-xl p-4"><p className="font-mono font-bold text-indigo-800 mb-1">x or z</p><p className="text-sm text-slate-600 m-0">The raw number entering the activation function. In a neuron this is normally the weighted sum plus bias.</p></div>
          <div className="bg-white border border-slate-200 rounded-xl p-4"><p className="font-mono font-bold text-indigo-800 mb-1">g(x), f(x) or a</p><p className="text-sm text-slate-600 m-0">The value produced by the function. This becomes the neuron’s outgoing signal.</p></div>
        </div>
        <NeuronPositionDiagram />
        <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
          <p className="text-amber-950 m-0"><strong>A useful correction:</strong> an activation function does not literally decide whether information is “important.” It applies the same mathematical rule to every input. Training changes the weights so useful signals tend to reach the function in useful forms.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Why Do We Need to Study Activation Functions?</h2>
        <p className="text-lg leading-relaxed">The activation function is not a decorative formula. It changes both <strong>what a network can learn</strong> and <strong>how easily the network can learn it</strong>.</p>
        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {[
            ["1", "Learn complex patterns", "Without a non-linear activation, even a network with many layers collapses into one linear calculation. It cannot build the curved boundaries needed for images, speech, language, and many real-life patterns."],
            ["2", "Control the signal", "An activation decides the form of the outgoing signal: blocked or passed, bounded between −1 and 1, converted to a probability, or left as an unrestricted number."],
            ["3", "Make training possible", "Backpropagation needs useful slopes called gradients. A function with flat regions can slow learning; a function with a useful slope can let error information travel through more layers."],
            ["4", "Match the prediction", "Different outputs need different shapes. Yes/no predictions, one-of-many classes, and continuous numbers should not all use the same output activation."],
          ].map(([number, title, text]) => (
            <div key={number} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2"><span className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold">{number}</span><h3 className="font-extrabold text-slate-900 m-0">{title}</h3></div>
              <p className="text-sm text-slate-600 leading-relaxed m-0">{text}</p>
            </div>
          ))}
        </div>
        <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <p className="font-bold text-indigo-950 mb-2">The two questions to ask about every activation</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-indigo-900">
            <p className="m-0"><strong>Forward pass:</strong> What output does this function produce from an input?</p>
            <p className="m-0"><strong>Learning:</strong> What gradient does it send backward when the model makes a mistake?</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Learn With a Simple Example: The Smart Security Light</h2>
        <p className="text-lg leading-relaxed">Imagine a light that should turn on for a person at night, but stay off for a moving leaf or a small insect. The sensor sees several clues; the neuron combines them; the activation function shapes the final response.</p>
        <div className="not-prose bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">Signals coming in</p>
              <h3 className="text-xl font-extrabold mb-3">Motion + object size + darkness</h3>
              <p className="text-sm text-slate-300 m-0">The sensor combines several readings into one score. A person at night may create a strong positive score; a leaf may create a weak or negative score.</p>
            </div>
            <div className="text-4xl text-indigo-300 text-center">→</div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">Activation changes the score</p>
              <p className="font-mono text-sm mb-2">Step: OFF or ON</p>
              <p className="font-mono text-sm mb-2">Sigmoid: chance of a person</p>
              <p className="font-mono text-sm m-0">ReLU: strength above zero</p>
            </div>
          </div>
        </div>
        <div className="not-prose grid md:grid-cols-4 gap-3 mt-5">
          {[
            ["Step 1", "Read the clues", "Motion = strong, object size = large, darkness = high."],
            ["Step 2", "Combine them", "After weights and bias, suppose the neuron produces z = 2."],
            ["Step 3", "Apply a function", "Step gives 1; sigmoid gives 0.88; ReLU gives 2."],
            ["Result", "Interpret the output", "Step says ON, sigmoid says 88% confidence, ReLU preserves signal strength 2."],
          ].map(([label, title, text]) => <div key={label} className="bg-white border border-slate-200 rounded-xl p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-indigo-600 mb-1">{label}</p><p className="font-bold text-slate-900 mb-2">{title}</p><p className="text-sm text-slate-600 leading-relaxed m-0">{text}</p></div>)}
        </div>
        <p className="text-lg leading-relaxed mt-5">The input score is identical, but each function answers a different question. That is why there is no single activation function that is best everywhere.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Why Non-Linearity Matters</h2>
        <p className="text-lg leading-relaxed">
          A <strong>linear</strong> rule can draw only a straight decision boundary. Stacking many linear layers does not solve this: their calculations combine into another linear rule. Many real patterns need bends, corners, separate regions, or much more complicated boundaries.
        </p>
        <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
          <div className="bg-white border border-rose-200 rounded-xl p-5">
            <p className="font-extrabold text-rose-800 mb-2">Only linear layers</p>
            <svg viewBox="0 0 320 190" className="w-full" role="img" aria-label="Straight line unable to separate four alternating points">
              <rect x="1" y="1" width="318" height="188" rx="12" fill="#fff1f2" />
              <circle cx="78" cy="55" r="10" fill="#4f46e5" /><circle cx="238" cy="135" r="10" fill="#4f46e5" />
              <rect x="228" y="45" width="20" height="20" rx="3" fill="#f43f5e" /><rect x="68" y="125" width="20" height="20" rx="3" fill="#f43f5e" />
              <line x1="35" y1="150" x2="285" y2="40" stroke="#334155" strokeWidth="4" />
              <text x="160" y="177" textAnchor="middle" fontSize="12" fill="#9f1239">One straight line cannot separate both groups.</text>
            </svg>
          </div>
          <div className="bg-white border border-emerald-200 rounded-xl p-5">
            <p className="font-extrabold text-emerald-800 mb-2">Layers with non-linear activations</p>
            <svg viewBox="0 0 320 190" className="w-full" role="img" aria-label="Bent boundary separating four alternating points">
              <rect x="1" y="1" width="318" height="188" rx="12" fill="#ecfdf5" />
              <circle cx="78" cy="55" r="10" fill="#4f46e5" /><circle cx="238" cy="135" r="10" fill="#4f46e5" />
              <rect x="228" y="45" width="20" height="20" rx="3" fill="#f43f5e" /><rect x="68" y="125" width="20" height="20" rx="3" fill="#f43f5e" />
              <path d="M 35 100 L 145 100 L 145 27 M 285 90 L 175 90 L 175 163" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
              <text x="160" y="177" textAnchor="middle" fontSize="12" fill="#047857">Several pieces can form a non-linear boundary.</text>
            </svg>
          </div>
        </div>
        <p className="text-lg leading-relaxed">This ability is essential for patterns in pictures, speech, language, sensor readings, and other complex data. Non-linearity is not magic—it simply gives the network building blocks more flexible than straight lines.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">How the Main Activation-Function Families Differ</h2>
        <p className="text-lg leading-relaxed">The names are easier to remember when they are grouped by the job they perform.</p>
        <div className="not-prose grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {[
            ["Hard decision", "Step", "Produces an immediate 0 or 1. Useful for intuition, not normal gradient training."],
            ["Bounded S-curves", "Sigmoid · Tanh", "Compress huge inputs into a small range. Helpful when a bounded output has meaning."],
            ["ReLU family", "ReLU · Leaky ReLU · PReLU", "Keeps the positive side simple and changes what happens to negative inputs."],
            ["Exponential family", "ELU · SELU · Softplus", "Uses smooth curves to preserve gradients or control the distribution of activations."],
            ["Modern smooth gates", "GELU · SiLU / Swish", "Softly scales inputs instead of making a hard cutoff; common in newer architectures."],
            ["Output specialists", "Linear · Sigmoid · Softmax", "Chosen according to whether the final answer is a number, a yes/no probability, or one class among many."],
          ].map(([family, names, text]) => <div key={family} className="bg-white border border-slate-200 rounded-xl p-5"><p className="text-xs font-extrabold uppercase tracking-wide text-indigo-600 mb-1">{family}</p><p className="font-extrabold text-slate-900 mb-2">{names}</p><p className="text-sm text-slate-600 leading-relaxed m-0">{text}</p></div>)}
        </div>
      </section>

      <h2 className="text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-3">The Main Activation Functions, One by One</h2>

      <FunctionLesson
        number="1" name="Step Function" nickname="The strict switch" formula="g(x) = 0 if x < 0; otherwise 1" kind="step" color="#e11d48" topLabel="1 (ON)" bottomLabel="0 (OFF)"
        formulaMeaning="Compare x with zero. A negative x returns 0; zero or a positive x returns 1. The symbol g(x) means the output produced from x."
        workedInput={-2} workedOutput={0} calculation="g(−2) = 0, because −2 < 0"
        what="The simplest yes/no rule. It jumps from 0 to 1 at a chosen threshold."
        why="It turns a score into a clear binary decision and provides the easiest starting point for understanding a neuron’s firing idea."
        how="Values below the threshold produce 0; values at or above it produce 1. There is no smooth transition."
        use="Use it to understand the history and intuition of a firing threshold, or for a fixed rule outside training."
        caution="Modern neural networks are not normally trained with it. Its derivative is zero almost everywhere and undefined at the jump, so gradient-based learning gets no useful direction."
        example="A simple thermostat can switch a fan OFF below 30°C and ON at or above 30°C. The rule is useful, but it cannot express a gradual fan speed."
        values={[["−2", "0"], ["−0.1", "0"], ["0", "1"], ["2", "1"]]}
      />

      <FunctionLesson
        number="2" name="Sigmoid Function" nickname="The smooth yes/no output" formula="σ(x) = 1 / (1 + e⁻ˣ)" kind="sigmoid" color="#4f46e5" topLabel="1" bottomLabel="0"
        formulaMeaning="e is Euler’s number, approximately 2.718. The negative exponent makes large positive inputs approach 1 and large negative inputs approach 0."
        workedInput={2} workedOutput={0.881} calculation="σ(2) = 1 / (1 + e⁻²) = 1 / (1 + 0.1353) = 0.881"
        what="A smooth S-shaped function that maps every real number to a value strictly between 0 and 1."
        why="It converts an unrestricted score into an easy-to-read probability-like value while keeping the transition differentiable for learning."
        how="Large negative inputs move close to 0, zero becomes 0.5, and large positive inputs move close to 1."
        use="Usually use one sigmoid output for binary or independent multi-label predictions—for example, spam versus not spam."
        caution="At very negative or positive inputs, the curve becomes flat. Gradients become tiny there, which can slow learning when sigmoid is repeated through deep hidden layers."
        example="An email model produces a raw spam score of 2.2. Sigmoid converts it to about 0.90, which can be read as strong confidence that the email is spam."
        values={[["−5", "0.007"], ["−1", "0.269"], ["0", "0.500"], ["1", "0.731"], ["5", "0.993"]]}
      />

      <FunctionLesson
        number="3" name="Tanh Function" nickname="The balanced S-curve" formula="tanh(x) = (eˣ − e⁻ˣ) / (eˣ + e⁻ˣ)" kind="tanh" color="#7c3aed" topLabel="+1" bottomLabel="−1"
        formulaMeaning="The same exponential terms appear above and below the fraction. Their ratio keeps every output between −1 and +1."
        workedInput={1} workedOutput={0.762} calculation="tanh(1) = (2.718 − 0.368) / (2.718 + 0.368) = 2.350 / 3.086 = 0.762"
        what="Hyperbolic tangent is another smooth S-curve. Unlike sigmoid, its output is centered around zero."
        why="Its negative, neutral, and positive outputs make it useful when the sign of a hidden state carries meaning and zero-centred signals are helpful."
        how="Strong negative inputs approach −1, zero stays 0, and strong positive inputs approach +1."
        use="Tanh remains common inside recurrent units and can suit hidden states where bounded, zero-centered signals are useful."
        caution="Its ends are also flat, so it can suffer from vanishing gradients. ReLU-family functions are a more common first choice for ordinary deep feedforward hidden layers."
        example="A sentence-state unit can represent negative sentiment near −1, neutral sentiment near 0, and positive sentiment near +1."
        values={[["−3", "−0.995"], ["−1", "−0.762"], ["0", "0"], ["1", "0.762"], ["3", "0.995"]]}
      />

      <FunctionLesson
        number="4" name="ReLU — Rectified Linear Unit" nickname="The fast hidden-layer default" formula="ReLU(x) = max(0, x)" kind="relu" color="#059669" topLabel="positive: keep x" bottomLabel="negative: 0"
        formulaMeaning="max(0, x) means choose whichever is larger: zero or x. Therefore negative inputs are replaced by zero and positive inputs pass unchanged."
        workedInput={-3} workedOutput={0} calculation="ReLU(−3) = max(0, −3) = 0"
        what="ReLU returns 0 for a negative input and returns the input unchanged when it is positive."
        why="It is simple to compute and its positive side does not flatten, so gradients can travel more effectively than through saturated sigmoid or tanh units."
        how="Its positive side has a constant slope, which supports useful gradient flow and is cheap to calculate. Zero outputs also create sparse activations."
        use="It is a strong starting choice for hidden layers in many dense and convolutional networks."
        caution="A neuron that stays on the negative side can output 0 repeatedly and stop receiving a useful gradient. This is the dying-ReLU problem. ReLU reduces some vanishing-gradient difficulties; it does not guarantee that every deep model avoids them."
        example="In an image network, one hidden neuron may measure how strongly an edge is present. A negative score becomes 0; a strong edge score such as 3.4 passes forward unchanged."
        values={[["−4", "0"], ["−1", "0"], ["0", "0"], ["1", "1"], ["4", "4"]]}
      />

      <h2 className="text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-3">More Activation Functions You Will Meet</h2>

      <FunctionLesson
        number="5" name="Linear / Identity Function" nickname="The unchanged numeric output" formula="g(x) = x" kind="linear" color="#475569" topLabel="positive" bottomLabel="negative"
        formulaMeaning="The output equals the input. No part of the number is blocked, squeezed, or curved."
        workedInput={-2} workedOutput={-2} calculation="g(−2) = −2"
        what="The linear function returns exactly the number it receives. There is no squeezing, clipping, or curve."
        why="Some predictions must remain unrestricted. A house price, temperature, or future demand may be any reasonable positive or negative number."
        how="Input −3 becomes −3, input 0 becomes 0, and input 3 becomes 3. Its slope is always 1."
        use="Use it mainly in the output layer of a regression model that predicts a continuous value."
        caution="Do not use linear activations throughout hidden layers. Several linear layers combine into one linear calculation, so depth adds no ability to learn curved patterns."
        example="A model predicting tomorrow’s temperature should be allowed to output −4.2°C, 18.6°C, or 37.1°C rather than forcing the answer between 0 and 1."
        values={[["−2", "−2"], ["−1", "−1"], ["0", "0"], ["1", "1"], ["2", "2"]]}
      />

      <FunctionLesson
        number="6" name="Leaky ReLU and PReLU" nickname="ReLU with a path for negative values" formula="g(x) = x if x > 0; otherwise αx" kind="leaky" color="#0284c7" topLabel="positive: x" bottomLabel="negative: αx"
        formulaMeaning="α (alpha) is the small negative-side slope. This lesson uses α = 0.01. PReLU differs because the model learns α during training."
        workedInput={-2} workedOutput={-0.02} calculation="g(−2) = αx = 0.01 × (−2) = −0.02"
        what="Leaky ReLU keeps ReLU’s positive side but replaces the flat negative side with a small slope. PReLU is the same idea, except training learns the slope α."
        why="The negative slope keeps a small gradient alive, which may revive units that would become permanently inactive under ordinary ReLU."
        how="With α = 0.01, input −2 becomes −0.02 instead of 0. Positive values still pass through unchanged."
        use="Try it when diagnostics show many ReLU units always output zero, or when an established architecture already uses it."
        caution="It is not an automatic improvement over ReLU. A fixed or learned negative slope adds another design choice and should be validated on your data."
        example="An image feature detector with a negative score of −2 still sends a tiny signal of −0.02 backward and forward instead of becoming completely silent."
        values={[["−2", "−0.02"], ["−1", "−0.01"], ["0", "0"], ["1", "1"], ["2", "2"]]}
      />

      <FunctionLesson
        number="7" name="ELU — Exponential Linear Unit" nickname="A smooth negative branch" formula="ELU(x) = x if x > 0; otherwise α(eˣ − 1)" kind="elu" color="#d97706" topLabel="positive: x" bottomLabel="approaches −α"
        formulaMeaning="Positive x passes unchanged. For negative x, the exponential branch bends smoothly toward −α. Here α = 1."
        workedInput={-1} workedOutput={-0.632} calculation="ELU(−1) = 1(e⁻¹ − 1) = 0.368 − 1 = −0.632"
        what="ELU behaves like ReLU for positive inputs, but uses a smooth exponential curve for negative inputs."
        why="Negative outputs can keep activations closer to zero on average, while the smooth branch avoids a completely dead negative side."
        how="With α = 1, positive inputs pass unchanged. Negative inputs bend smoothly and approach −1 without going below it."
        use="Consider it for hidden layers when ReLU is unstable or dead units are a measured problem and extra computation is acceptable."
        caution="The exponential calculation is slower than ReLU, and the best result still depends on initialization, normalization, and the dataset."
        example="A sensor-feature neuron may pass strong positive evidence directly, while weak negative evidence is compressed smoothly rather than discarded."
        values={[["−3", "−0.950"], ["−1", "−0.632"], ["0", "0"], ["1", "1"], ["3", "3"]]}
      />

      <FunctionLesson
        number="8" name="SELU — Scaled ELU" nickname="Built for self-normalizing networks" formula="SELU(x) = λx if x > 0; otherwise λα(eˣ − 1)" kind="selu" color="#0f766e" topLabel="scaled positive" bottomLabel="scaled negative"
        formulaMeaning="λ (lambda) scales both branches and α shapes the negative branch. Standard SELU uses λ ≈ 1.0507 and α ≈ 1.6733."
        workedInput={1} workedOutput={1.051} calculation="SELU(1) = λx = 1.0507 × 1 = 1.0507 ≈ 1.051"
        what="SELU is a carefully scaled ELU with fixed constants. Under the right conditions, activations tend to move toward a stable mean and variance."
        why="The self-normalizing effect can help deep fully connected networks keep signals from growing or shrinking too much."
        how="It scales both branches: roughly 1.05x for positive values and a curved negative branch approaching about −1.76."
        use="Use it in compatible dense self-normalizing networks with LeCun-normal initialization and AlphaDropout."
        caution="Those conditions matter. Ordinary dropout, incompatible initialization, or some architectures can break the intended self-normalizing behavior."
        example="In a deep tabular network designed specifically for SELU, each layer can keep its activation scale steadier without adding batch normalization everywhere."
        values={[["−3", "−1.670"], ["−1", "−1.111"], ["0", "0"], ["1", "1.051"], ["3", "3.152"]]}
      />

      <FunctionLesson
        number="9" name="Softplus Function" nickname="A smooth version of ReLU" formula="Softplus(x) = log(1 + eˣ)" kind="softplus" color="#9333ea" topLabel="positive and smooth" bottomLabel="approaches 0"
        formulaMeaning="eˣ is always positive, so 1 + eˣ is positive and its natural logarithm is defined. The result stays above zero and changes smoothly."
        workedInput={0} workedOutput={0.693} calculation="Softplus(0) = log(1 + e⁰) = log(1 + 1) = log(2) = 0.693"
        what="Softplus is a smooth curve that always produces a positive output. It looks like ReLU with the sharp corner rounded off."
        why="Its derivative changes smoothly everywhere, which can be useful when a model or physical quantity needs smooth optimization and a positive output."
        how="Large negative inputs approach 0; at x = 0 the output is about 0.693; large positive inputs behave almost like x."
        use="Use it when an output must be positive—such as a scale or rate—or when a smooth ReLU-like function is helpful."
        caution="It is more expensive than ReLU and never outputs exact zero, so it does not create the same sparse activations."
        example="A model predicting an event rate can use Softplus so its output stays positive while still changing smoothly during training."
        values={[["−3", "0.049"], ["−1", "0.313"], ["0", "0.693"], ["1", "1.313"], ["3", "3.049"]]}
      />

      <FunctionLesson
        number="10" name="GELU — Gaussian Error Linear Unit" nickname="A smooth gate common in transformers" formula="GELU(x) = x · Φ(x)" kind="gelu" color="#be123c" topLabel="large positives pass" bottomLabel="small negative dip"
        formulaMeaning="Φ(x) is the standard normal cumulative distribution function: a smooth gate between 0 and 1. Multiplying x by that gate softly scales the input."
        workedInput={1} workedOutput={0.841} calculation="GELU(1) = 1 × Φ(1) = 1 × 0.8413 = 0.8413 ≈ 0.841"
        what="GELU smoothly scales an input according to its size instead of making ReLU’s hard keep-or-zero decision."
        why="The smooth probabilistic-style gate works well in many transformer architectures and allows small negative signals to remain."
        how="Very negative inputs approach 0, moderate negative inputs become small negatives, and large positive inputs pass almost unchanged."
        use="Use it when reproducing transformer architectures such as BERT-style models, or when experiments show it beats a ReLU baseline."
        caution="It costs more to compute than ReLU. Choose it because the architecture or measurements support it, not merely because it is newer."
        example="A language model can softly reduce a weak token feature instead of abruptly erasing every feature whose score falls just below zero."
        values={[["−3", "−0.004"], ["−1", "−0.159"], ["0", "0"], ["1", "0.841"], ["3", "2.996"]]}
      />

      <FunctionLesson
        number="11" name="SiLU / Swish Function" nickname="The input multiplied by its own gate" formula="SiLU(x) = x · sigmoid(x)" kind="silu" color="#2563eb" topLabel="smooth positive side" bottomLabel="small negatives"
        formulaMeaning="First use sigmoid to create a gate between 0 and 1, then multiply the original input by that gate."
        workedInput={1} workedOutput={0.731} calculation="SiLU(1) = 1 × sigmoid(1) = 1 × 0.731 = 0.731"
        what="SiLU, also called Swish when used without extra parameters, multiplies each input by its sigmoid value."
        why="It creates a smooth, non-monotonic curve that preserves a little negative information and has performed well in several modern vision and language architectures."
        how="Large negative inputs approach 0 from below, zero remains 0, and large positive inputs become almost unchanged."
        use="Use it when following architectures such as EfficientNet-style models or when a controlled comparison shows an improvement."
        caution="It requires more computation than ReLU, and its benefit is task-dependent. It should not replace a simple baseline without evidence."
        example="A vision network can softly dampen a weak negative texture response while letting a strong positive edge response pass almost fully."
        values={[["−3", "−0.142"], ["−1", "−0.269"], ["0", "0"], ["1", "0.731"], ["3", "2.858"]]}
      />

      <section>
        <div className="flex items-start gap-4 mb-4"><span className="not-prose flex-shrink-0 h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold">12</span><div><h2 className="text-2xl font-bold text-indigo-800 m-0">Softmax: One Choice From Many Classes</h2><p className="text-sm font-semibold text-slate-500 mt-1 mb-0">The probability distributor</p></div></div>
        <p className="text-lg leading-relaxed">Softmax works on a <strong>group of output scores</strong>, not one number in isolation. It turns them into values between 0 and 1 that add up to exactly 1.</p>
        <div className="not-prose bg-indigo-950 text-white rounded-2xl p-5 md:p-6 my-5">
          <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-300 mb-2">Formula</p>
          <p className="font-mono text-lg md:text-xl font-bold mb-3">softmax(zᵢ) = eᶻⁱ / Σⱼ eᶻʲ</p>
          <p className="text-sm text-indigo-100 leading-relaxed m-0"><strong className="text-white">How to read it:</strong> exponentiate the score for class i, then divide it by the sum of the exponentiated scores for every class. The symbol Σ means “add them all.”</p>
        </div>
        <div className="not-prose grid sm:grid-cols-2 lg:grid-cols-4 gap-3 my-5">
          {[
            ["What it is", "A function that converts a vector of raw class scores, called logits, into a probability distribution."],
            ["Why we use it", "It makes competing class scores comparable and ensures their probabilities total 100%."],
            ["How it behaves", "Exponentiate each score, then divide by the sum. Larger scores receive a larger share."],
            ["Where to use it", "The final layer when exactly one class is correct: cat, dog, or bird."],
          ].map(([title, text]) => <div key={title} className="bg-indigo-50 border border-indigo-200 rounded-xl p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-indigo-700 mb-1">{title}</p><p className="text-sm text-slate-700 leading-relaxed m-0">{text}</p></div>)}
        </div>
        <div className="not-prose bg-white border border-slate-200 rounded-2xl p-5 md:p-6 my-5">
          <p className="font-bold text-slate-900 mb-2">Solved mathematical example: an image model produces three raw scores</p>
          <p className="font-mono text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 overflow-x-auto">e² = 7.389, e¹ = 2.718, e⁰·¹ = 1.105<br />sum = 7.389 + 2.718 + 1.105 = 11.212<br />P(cat) = 7.389 / 11.212 = 0.659 = 65.9%</p>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500 mb-2">Input: raw logits</p>
              {[["Cat", "2.0"], ["Dog", "1.0"], ["Bird", "0.1"]].map(([label, value]) => <div key={label} className="flex justify-between bg-slate-100 rounded-lg px-4 py-2"><span>{label}</span><span className="font-mono font-bold">{value}</span></div>)}
            </div>
            <div className="text-3xl text-indigo-500 text-center">→ <span className="text-sm font-bold">exponentiate<br />and normalize</span> →</div>
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500 mb-2">Probability bar graph</p>
              {[["Cat", "65.9%", "w-[66%]"], ["Dog", "24.2%", "w-[24%]"], ["Bird", "9.9%", "w-[10%]"]].map(([label, value, width]) => <div key={label}><div className="flex justify-between text-sm mb-1"><span>{label}</span><strong>{value}</strong></div><div className="h-2 bg-slate-100 rounded-full"><div className={`h-2 rounded-full bg-indigo-500 ${width}`} /></div></div>)}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3 mt-5 text-sm"><p className="bg-slate-50 rounded-lg p-3 m-0"><strong>Largest score:</strong> Cat, 2.0</p><p className="bg-slate-50 rounded-lg p-3 m-0"><strong>Largest probability:</strong> Cat, 65.9%</p><p className="bg-emerald-50 text-emerald-900 rounded-lg p-3 m-0"><strong>Check:</strong> 65.9 + 24.2 + 9.9 = 100%</p></div>
          <p className="text-sm text-slate-600 mt-4 mb-0"><strong>Graph connection:</strong> each bar’s length equals its calculated probability. The largest input score, 2.0 for cat, produces the longest bar at 65.9%.</p>
        </div>
        <p className="text-lg leading-relaxed"><strong>Use softmax</strong> when the classes are mutually exclusive, such as cat, dog, or bird. For multi-label tasks where several answers can be true at once—such as “outdoor,” “animal,” and “night”—use one sigmoid per label instead. <strong>Watch out:</strong> softmax probabilities can be overconfident and should not automatically be treated as perfectly calibrated certainty.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Comparison of All the Functions</h2>
        <p className="text-lg leading-relaxed">Use this table after reading the individual explanations. On a phone, swipe horizontally to see every column.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm min-w-[1250px]">
            <thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Function</th><th className="p-3 text-left">Shape</th><th className="p-3 text-left">Output range</th><th className="p-3 text-left">Zero-centred?</th><th className="p-3 text-left">Typical layer</th><th className="p-3 text-left">Strong point</th><th className="p-3 text-left">Main limitation</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                ["Step", "Hard jump", "0 or 1", "No", "Fixed rule", "Easy threshold intuition", "No useful gradient for training"],
                ["Sigmoid", "Smooth S", "0 to 1", "No", "Binary/multi-label output", "Probability-like result", "Saturates; tiny gradients"],
                ["Tanh", "Smooth S", "−1 to 1", "Yes", "Some recurrent hidden states", "Bounded and centred", "Saturates at both ends"],
                ["ReLU", "Flat then line", "0 to +∞", "No", "Dense/CNN hidden", "Fast; useful positive slope", "Can create dead neurons"],
                ["Linear", "Straight line", "−∞ to +∞", "Yes", "Regression output", "Unrestricted numeric result", "Adds no non-linearity"],
                ["Leaky ReLU / PReLU", "Two lines", "−∞ to +∞", "No", "Hidden", "Negative-side gradient", "Slope choice or parameter"],
                ["ELU", "Curved then line", "−α to +∞", "Closer", "Hidden", "Smooth negative outputs", "Exponential computation"],
                ["SELU", "Scaled ELU", "≈−1.76 to +∞", "Self-normalizing", "Compatible dense hidden", "Can stabilize mean/variance", "Requires strict conditions"],
                ["Softplus", "Smooth ReLU", "0 to +∞", "No", "Positive output/hidden", "Smooth everywhere", "Slower; never exactly zero"],
                ["GELU", "Smooth gated curve", "Small negative to +∞", "Near", "Transformer hidden", "Soft input weighting", "More compute than ReLU"],
                ["SiLU / Swish", "Smooth gated curve", "Small negative to +∞", "Near", "Modern hidden", "Smooth; keeps small negatives", "Benefit is task-dependent"],
                ["Softmax", "Group normalization", "Each 0 to 1; sum = 1", "No", "Multi-class output", "Comparable class probabilities", "Exclusive classes; may overconfident"],
              ].map(([name, shape, range, centred, layer, pro, con]) => <tr key={name}><td className="p-3 font-bold text-indigo-700">{name}</td><td className="p-3 text-slate-700">{shape}</td><td className="p-3 font-mono">{range}</td><td className="p-3">{centred}</td><td className="p-3 text-slate-700">{layer}</td><td className="p-3 text-emerald-700">{pro}</td><td className="p-3 text-amber-800">{con}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Which Activation Function Should You Choose?</h2>
        <div className="not-prose bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6 mb-5">
          <p className="font-extrabold text-slate-900 mb-4">First identify where the function will be used</p>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            <div className="bg-white border border-indigo-200 rounded-xl p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-indigo-600 mb-1">Inside the network</p><p className="font-bold text-slate-900 mb-2">Hidden layer</p><p className="text-sm text-slate-600 m-0">Start with ReLU for many dense or CNN models. Follow a tested architecture when it specifies GELU, SiLU, tanh, SELU, or another function.</p></div>
            <div className="flex items-center justify-center text-indigo-400 text-2xl">or</div>
            <div className="bg-white border border-emerald-200 rounded-xl p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-emerald-700 mb-1">Producing the answer</p><p className="font-bold text-slate-900 mb-2">Output layer</p><p className="text-sm text-slate-600 m-0">Choose from the task: sigmoid for binary or multi-label, softmax for one-of-many classes, linear for unrestricted regression, or a task-specific constrained output.</p></div>
          </div>
        </div>
        <div className="not-prose space-y-3">
          {[
            ["Hidden layers in a new dense or CNN model", "Start with ReLU. Compare a modern smooth alternative only if there is a reason."],
            ["One yes/no output", "Use sigmoid: fraud/not fraud, pass/fail, spam/not spam."],
            ["Several independent yes/no labels", "Use one sigmoid per label: an image can contain both a person and a bicycle."],
            ["Exactly one class from several", "Use softmax: cat, dog, or bird."],
            ["An unrestricted numeric prediction", "Use linear output: price, temperature, or demand."],
            ["ReLU neurons are repeatedly stuck at zero", "Try Leaky ReLU, and also check learning rate and weight initialization."],
            ["Transformer-style architecture", "Follow the tested architecture; GELU, SiLU, or gated variants are common."],
          ].map(([scenario, choice], index) => (
            <div key={scenario} className="grid md:grid-cols-[35px_1fr_1.2fr] gap-3 items-center bg-white border border-slate-200 rounded-xl p-4">
              <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">{index + 1}</span>
              <p className="font-bold text-slate-900 m-0">{scenario}</p><p className="text-sm text-slate-600 m-0">{choice}</p>
            </div>
          ))}
        </div>
        <div className="not-prose bg-rose-50 border border-rose-200 rounded-xl p-5 mt-5">
          <p className="font-bold text-rose-900 mb-1">The output activation and loss function must agree.</p>
          <p className="text-sm text-rose-800 m-0">For example, binary classification commonly pairs sigmoid with binary cross-entropy. Many libraries also offer numerically stable losses that accept raw logits, so always check the loss documentation instead of applying an activation twice.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Try Every Function in Python</h2>
        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">activation_functions.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

x = np.array([-3.0, -1.0, 0.0, 1.0, 3.0])

step = (x >= 0).astype(int)
sigmoid = 1 / (1 + np.exp(-x))
tanh = np.tanh(x)
relu = np.maximum(0, x)
leaky_relu = np.where(x > 0, x, 0.01 * x)
linear = x
elu = np.where(x > 0, x, np.exp(x) - 1)

# SELU's standard constants
selu_alpha, selu_scale = 1.67326324, 1.05070098
selu = selu_scale * np.where(
    x > 0, x, selu_alpha * (np.exp(x) - 1)
)

softplus = np.logaddexp(0, x)  # stable log(1 + exp(x))
gelu = 0.5 * x * (
    1 + np.tanh(np.sqrt(2 / np.pi) * (x + 0.044715 * x**3))
)
silu = x * sigmoid

print("Step:      ", step)
print("Sigmoid:   ", np.round(sigmoid, 3))
print("Tanh:      ", np.round(tanh, 3))
print("ReLU:      ", relu)
print("Leaky ReLU:", leaky_relu)
print("Linear:    ", linear)
print("ELU:       ", np.round(elu, 3))
print("SELU:      ", np.round(selu, 3))
print("Softplus:  ", np.round(softplus, 3))
print("GELU:      ", np.round(gelu, 3))
print("SiLU:      ", np.round(silu, 3))

# Softmax works on a group of class scores.
scores = np.array([2.0, 1.0, 0.1])
stable_scores = scores - scores.max()
softmax = np.exp(stable_scores) / np.exp(stable_scores).sum()
print("Softmax:   ", np.round(softmax, 3))
# [0.659 0.242 0.099]`}</pre>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mt-7 mb-3">Using them in Keras</h3>
        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">keras_examples.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`from keras import Sequential, layers

# Binary classification
binary_model = Sequential([
    layers.Input(shape=(20,)),
    layers.Dense(32, activation="relu"),      # hidden layer
    layers.Dense(1, activation="sigmoid")    # yes/no output
])

# Multi-class classification
class_model = Sequential([
    layers.Input(shape=(20,)),
    layers.Dense(32, activation="relu"),
    layers.Dense(5, activation="softmax")    # one of 5 classes
])

# Regression
regression_model = Sequential([
    layers.Input(shape=(20,)),
    layers.Dense(32, activation="relu"),
    layers.Dense(1, activation="linear")     # unrestricted number
])`}</pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Common Beginner Mistakes</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {[
            ["“An activation chooses important information.”", "It applies a fixed rule. Learned weights determine which patterns reach it."],
            ["“Sigmoid should be used everywhere.”", "It suits certain outputs, but repeated hidden-layer sigmoid can cause tiny gradients."],
            ["“ReLU solves every gradient problem.”", "It improves positive-side gradient flow but can still die, and other parts of the network can still cause unstable gradients."],
            ["“Tanh is always the best hidden activation.”", "It is useful in some recurrent settings, but ReLU-family functions are a more common feedforward starting point."],
            ["“Softmax handles multiple independent labels.”", "Softmax assumes competing classes. Use separate sigmoids when several labels can be true."],
            ["“The most advanced function must be best.”", "Architecture, initialization, normalization, optimizer, data, and task all interact. Start with a proven baseline and measure."],
          ].map(([mistake, correction]) => <div key={mistake} className="bg-slate-50 border border-slate-200 rounded-xl p-4"><p className="font-bold text-slate-900 mb-1">{mistake}</p><p className="text-sm text-slate-600 m-0">{correction}</p></div>)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Check Your Understanding</h2>
        <div className="space-y-4">
          {[
            ["1. Why can’t several linear hidden layers learn a curved boundary?", "Their linear operations combine into one linear operation. A non-linear activation is needed between layers."],
            ["2. Which output activation fits spam versus not-spam?", "Sigmoid, because it produces one value between 0 and 1 for a binary outcome."],
            ["3. Which output activation fits cat, dog, or bird?", "Softmax, because exactly one of the competing classes should be selected."],
            ["4. Why is the step function poor for gradient-based training?", "Its derivative gives no useful slope almost everywhere and is undefined at the jump."],
            ["5. What is a dying ReLU?", "A ReLU neuron whose input remains negative, so it keeps outputting zero and may stop learning."],
          ].map(([question, answer]) => <details key={question} className="bg-white border border-slate-200 rounded-xl p-5"><summary className="font-bold text-slate-900 cursor-pointer">{question}</summary><p className="text-slate-700 mt-3 mb-0">{answer}</p></details>)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Summary</h2>
        <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
          <ul className="space-y-2 m-0 pl-5 text-indigo-950">
            <li>An activation function transforms a neuron’s weighted sum into its outgoing signal.</li>
            <li>Non-linear activations let stacked layers learn patterns more flexible than straight lines.</li>
            <li>ReLU is a practical hidden-layer baseline; sigmoid, softmax, and linear serve different output tasks.</li>
            <li>Tanh, Leaky ReLU, ELU, SELU, GELU, and SiLU are useful alternatives with specific trade-offs.</li>
            <li>Choose the output activation from the prediction task, then pair it correctly with the loss.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Continue Learning</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4 mb-10">
          <a href="/learn/math-foundations-deep-learning" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline"><p className="text-xs font-bold text-indigo-600 uppercase mb-1">Previous concept</p><p className="font-bold text-slate-900 m-0">Essential Math for Neural Networks</p></a>
          <a href="/learn/tensors-frameworks-gpus" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline"><p className="text-xs font-bold text-indigo-600 uppercase mb-1">Next concept</p><p className="font-bold text-slate-900 m-0">Tensors, Frameworks &amp; GPUs</p></a>
        </div>
      </section>
    </div>
  );
}
