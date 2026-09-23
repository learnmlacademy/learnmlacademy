import React from "react";

type CurveKind = "mse" | "mae" | "huber" | "bce";

function curveValue(kind: CurveKind, x: number) {
  if (kind === "mse") return x * x;
  if (kind === "mae") return Math.abs(x);
  if (kind === "huber") return Math.abs(x) <= 1 ? 0.5 * x * x : Math.abs(x) - 0.5;
  return -Math.log(Math.max(0.02, x));
}

function LossCurve({
  kind,
  title,
  color,
  point,
  pointLabel,
}: {
  kind: CurveKind;
  title: string;
  color: string;
  point: [number, number];
  pointLabel: string;
}) {
  const probability = kind === "bce";
  const xMin = probability ? 0.02 : -3;
  const xMax = probability ? 1 : 3;
  const yMin = 0;
  const yMax = kind === "mse" ? 9 : kind === "bce" ? 4 : 3;
  const left = 50;
  const right = 335;
  const top = 24;
  const bottom = 190;
  const toX = (value: number) => left + ((value - xMin) / (xMax - xMin)) * (right - left);
  const toY = (value: number) => bottom - ((value - yMin) / (yMax - yMin)) * (bottom - top);
  const samples = Array.from({ length: 141 }, (_, index) => xMin + (index / 140) * (xMax - xMin));
  const path = samples.map((x, index) => `${index ? "L" : "M"} ${toX(x).toFixed(1)} ${toY(Math.min(yMax, curveValue(kind, x))).toFixed(1)}`).join(" ");
  const xTicks = probability ? [0.2, 0.4, 0.6, 0.8, 1] : [-3, -2, -1, 0, 1, 2, 3];
  const yTicks = kind === "mse" ? [0, 3, 6, 9] : kind === "bce" ? [0, 1, 2, 3, 4] : [0, 1, 2, 3];
  const pointX = toX(point[0]);
  const pointY = toY(point[1]);

  return (
    <figure className="not-prose m-0">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg viewBox="0 0 380 235" className="w-full" role="img" aria-label={`${title} curve`}>
          <rect x="1" y="1" width="378" height="233" rx="16" fill="#f8fafc" />
          {yTicks.map((value) => <g key={value}><line x1={left} y1={toY(value)} x2={right} y2={toY(value)} stroke="#e2e8f0" /><text x={left - 8} y={toY(value) + 4} textAnchor="end" fontSize="10" fill="#64748b">{value}</text></g>)}
          {xTicks.map((value) => <g key={value}><line x1={toX(value)} y1={top} x2={toX(value)} y2={bottom} stroke="#e2e8f0" /><text x={toX(value)} y={bottom + 16} textAnchor="middle" fontSize="9" fill="#64748b">{value}</text></g>)}
          <line x1={left} y1={bottom} x2={right + 8} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
          {!probability && <line x1={toX(0)} y1={bottom} x2={toX(0)} y2={top - 6} stroke="#64748b" strokeWidth="1.5" />}
          <path d={path} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={pointX} y1={pointY} x2={pointX} y2={bottom} stroke={color} strokeDasharray="4 4" />
          <line x1={left} y1={pointY} x2={pointX} y2={pointY} stroke={color} strokeDasharray="4 4" />
          <circle cx={pointX} cy={pointY} r="5" fill="white" stroke={color} strokeWidth="3" />
          <rect x={Math.min(Math.max(pointX - 50, 58), 248)} y={Math.max(pointY - 30, 28)} width="102" height="22" rx="6" fill="white" stroke={color} />
          <text x={Math.min(Math.max(pointX + 1, 109), 299)} y={Math.max(pointY - 15, 43)} textAnchor="middle" fontSize="9" fontWeight="800" fill={color}>{pointLabel}</text>
          <text x="193" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">{probability ? "predicted probability for the true class" : "prediction error e"}</text>
          <text x="15" y="112" textAnchor="middle" transform="rotate(-90 15 112)" fontSize="11" fontWeight="700" fill="#475569">loss</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-slate-600">The highlighted point is the value calculated in the example beside this graph.</figcaption>
    </figure>
  );
}

function LearningSignalDiagram() {
  const boxes = [
    [20, 90, 130, 78, "Model", "makes a prediction", "#4f46e5"],
    [205, 30, 130, 78, "Prediction", "what the model said", "#7c3aed"],
    [205, 150, 130, 78, "Target", "the correct answer", "#059669"],
    [395, 90, 150, 78, "Loss function", "measures the mistake", "#e11d48"],
    [605, 90, 150, 78, "Backpropagation", "finds responsibility", "#d97706"],
  ] as const;
  return (
    <figure className="not-prose my-7">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm overflow-x-auto">
        <svg viewBox="0 0 790 270" className="w-full min-w-[720px]" role="img" aria-labelledby="loss-flow-title loss-flow-desc">
          <title id="loss-flow-title">Where the loss function fits during training</title>
          <desc id="loss-flow-desc">The model produces a prediction. The loss function compares the prediction with the target. Backpropagation uses the loss to calculate gradients.</desc>
          <rect x="2" y="2" width="786" height="266" rx="18" fill="#f8fafc" />
          <path d="M150 129 L190 75" stroke="#64748b" strokeWidth="3" /><polygon points="184,79 196,68 193,84" fill="#64748b" />
          <path d="M335 69 L388 116" stroke="#64748b" strokeWidth="3" /><polygon points="379,116 394,121 388,106" fill="#64748b" />
          <path d="M335 189 L388 142" stroke="#64748b" strokeWidth="3" /><polygon points="388,152 394,137 379,142" fill="#64748b" />
          <line x1="545" y1="129" x2="596" y2="129" stroke="#64748b" strokeWidth="3" /><polygon points="588,121 604,129 588,137" fill="#64748b" />
          <path d="M680 177 C670 242 96 246 85 177" fill="none" stroke="#d97706" strokeWidth="3" strokeDasharray="7 5" />
          <polygon points="78,187 84,170 94,184" fill="#d97706" />
          {boxes.map(([x, y, width, height, label, detail, color]) => <g key={label}><rect x={x} y={y} width={width} height={height} rx="16" fill="white" stroke={color} strokeWidth="2.5" /><rect x={x} y={y} width={width} height="9" rx="5" fill={color} /><text x={x + width / 2} y={y + 35} textAnchor="middle" fontSize="16" fontWeight="800" fill="#0f172a">{label}</text><text x={x + width / 2} y={y + 57} textAnchor="middle" fontSize="11" fill="#64748b">{detail}</text></g>)}
          <text x="385" y="252" textAnchor="middle" fontSize="12" fontWeight="800" fill="#b45309">gradients guide the next weight update</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm text-slate-600">Figure 1: Loss is the bridge between making a prediction and learning from its error.</figcaption>
    </figure>
  );
}

function FormulaCard({ formula, children }: { formula: string; children: React.ReactNode }) {
  return <div className="not-prose rounded-2xl bg-indigo-950 p-5 text-white"><p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-indigo-300">Formula</p><p className="mb-3 overflow-x-auto whitespace-nowrap font-mono text-lg font-bold md:text-xl">{formula}</p><p className="m-0 text-sm leading-relaxed text-indigo-100">{children}</p></div>;
}

function StepRow({ number, children }: { number: number; children: React.ReactNode }) {
  return <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-extrabold text-white">{number}</span><p className="m-0 pt-1 text-sm leading-relaxed text-slate-700">{children}</p></div>;
}

function MulticlassBars() {
  const rows = [["Cat (correct)", 70, "#4f46e5"], ["Dog", 20, "#94a3b8"], ["Rabbit", 10, "#cbd5e1"]] as const;
  return <figure className="not-prose m-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="font-bold text-slate-900 mb-4">Model probabilities</p>{rows.map(([label, value, color]) => <div key={label} className="mb-4 last:mb-0"><div className="mb-1 flex justify-between text-xs font-bold text-slate-600"><span>{label}</span><span>{value}%</span></div><div className="h-8 rounded-lg bg-slate-100 overflow-hidden"><div className="h-full rounded-lg flex items-center justify-end pr-2 text-xs font-bold text-white" style={{ width: `${value}%`, backgroundColor: color }}>{value >= 20 ? `${value / 100}` : ""}</div></div></div>)}<figcaption className="mt-4 text-sm leading-relaxed text-slate-600">Only the 0.70 assigned to the correct class enters this one-hot cross-entropy calculation. The three probabilities must sum to 1.</figcaption></figure>;
}

function ScoreToDecisionFigure() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4"><p className="font-bold text-slate-900">Raw score, probability, decision and loss are four different quantities</p></div>
      <div className="overflow-x-auto p-5 md:p-6"><div className="grid min-w-[820px] grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3 text-center"><div className="rounded-xl border border-violet-200 bg-violet-50 p-4"><p className="text-xs font-bold uppercase text-violet-700">logit</p><p className="mt-2 font-mono text-xl font-black text-violet-950">z = 1.386</p><p className="mt-2 text-xs text-slate-600">raw model score</p></div><span className="text-2xl text-slate-400">→</span><div className="rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="text-xs font-bold uppercase text-blue-700">sigmoid</p><p className="mt-2 font-mono text-xl font-black text-blue-950">p = 0.80</p><p className="mt-2 text-xs text-slate-600">probability of class 1</p></div><span className="text-2xl text-slate-400">→</span><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-bold uppercase text-emerald-700">threshold</p><p className="mt-2 font-mono text-xl font-black text-emerald-950">0.80 ≥ 0.50</p><p className="mt-2 text-xs text-slate-600">predict class 1</p></div><span className="text-2xl text-slate-400">→</span><div className="rounded-xl border border-rose-200 bg-rose-50 p-4"><p className="text-xs font-bold uppercase text-rose-700">loss when y=1</p><p className="mt-2 font-mono text-xl font-black text-rose-950">0.223</p><p className="mt-2 text-xs text-slate-600">training penalty</p></div></div></div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600">The model produces z. Sigmoid converts z to p. A developer or product policy chooses the decision threshold. The dataset supplies y, and the loss compares y with p.</figcaption>
    </figure>
  );
}

export function LossFunctionsContent() {
  return (
    <div className="space-y-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">Deep Learning · Beginner Lesson</p>
        <h2 className="mb-3 text-4xl font-extrabold text-slate-900">Loss Functions: How a Neural Network Measures Its Mistakes</h2>
        <p className="mb-0 text-lg leading-relaxed text-slate-600">A neural network cannot improve from the vague message “that answer was wrong.” It needs a number that says how wrong the answer was. A <strong>loss function</strong> creates that number. This lesson calculates MSE, MAE and cross-entropy by hand, connects each calculation to a graph, and shows which loss belongs to each kind of problem.</p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What Is a Loss Function?</h2>
        <p className="text-lg leading-relaxed">Imagine a model predicts that a house costs ₹48 lakh, while its actual price is ₹50 lakh. The prediction is not exact, but the difference can be measured. A loss function takes the <strong>prediction</strong> and the <strong>correct answer</strong>, compares them using a chosen rule, and returns one penalty number.</p>
        <div className="not-prose my-5 grid gap-3 sm:grid-cols-3">
          {[["Prediction (ŷ)", "The answer produced by the model."], ["Target (y)", "The correct answer in the training data."], ["Loss (L)", "A penalty: smaller normally means a better prediction."]].map(([title, text]) => <div key={title} className="rounded-xl border border-slate-200 bg-white p-4"><p className="mb-1 font-mono font-bold text-indigo-800">{title}</p><p className="m-0 text-sm leading-relaxed text-slate-600">{text}</p></div>)}
        </div>
        <p className="text-lg leading-relaxed">During training, the network repeatedly changes its weights to make this penalty smaller. The loss therefore acts like both a <strong>marking rule</strong> and a <strong>learning signal</strong>. Change the rule, and you change which mistakes the network treats as important.</p>
        <LearningSignalDiagram />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">First Decide: Are You Predicting a Number or a Class?</h2>
        <p className="text-lg leading-relaxed">There is no universally best loss function. The first decision comes from the kind of answer the model must produce.</p>
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5"><p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-sky-700">Regression</p><h3 className="mb-2 text-xl font-extrabold text-slate-900">Predict a continuous number</h3><p className="m-0 text-sm leading-relaxed text-slate-700">Examples: temperature, delivery time, electricity demand, or house price. MSE, MAE, RMSE and Huber loss measure the distance between two numbers.</p></div>
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5"><p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-violet-700">Classification</p><h3 className="mb-2 text-xl font-extrabold text-slate-900">Predict a category</h3><p className="m-0 text-sm leading-relaxed text-slate-700">Examples: spam/not spam or cat/dog/rabbit. Cross-entropy measures how much probability the model placed on the correct class.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Begin with One Visible Error</h2>
        <p className="text-lg leading-relaxed">Suppose the actual delivery time is <strong>10 minutes</strong> and the model predicts <strong>13 minutes</strong>. The dataset supplies 10 as the target; the network produces 13. Subtracting compares them: prediction minus target is 13−10=<strong>3 minutes</strong>.</p>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5"><p className="text-xs font-bold uppercase text-blue-700">signed error</p><p className="mt-2 font-mono text-xl font-black text-blue-950">13 − 10 = +3</p><p className="mt-2 text-sm text-slate-700">The plus sign says the prediction was too high.</p></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="text-xs font-bold uppercase text-emerald-700">absolute error</p><p className="mt-2 font-mono text-xl font-black text-emerald-950">|3| = 3</p><p className="mt-2 text-sm text-slate-700">Distance keeps the size and removes direction.</p></div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5"><p className="text-xs font-bold uppercase text-violet-700">squared error</p><p className="mt-2 font-mono text-xl font-black text-violet-950">3² = 9</p><p className="mt-2 text-sm text-slate-700">Squaring makes larger errors grow more strongly.</p></div>
        </div>
        <p className="mt-5 text-lg leading-relaxed">A dataset contains many predictions, so MAE and MSE <strong>average</strong> their per-example penalties. Averaging gives a summary that does not grow merely because the batch contains more examples.</p>
      </section>

      <section>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-sky-600">Regression loss 1</p>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Mean Squared Error (MSE)</h2>
        <p className="text-lg leading-relaxed">MSE measures the average squared distance between predictions and targets. “Squared” means that every error is multiplied by itself. This removes negative signs and makes a large error grow much faster than a small one.</p>
        <FormulaCard formula="MSE = (1/n) Σᵢ₌₁ⁿ (yᵢ − ŷᵢ)²"><strong className="text-white">n</strong> is the number of examples; <strong className="text-white">yᵢ</strong> is the target for example i; <strong className="text-white">ŷᵢ</strong> is its prediction; <strong className="text-white">Σ</strong> means add all the values.</FormulaCard>
        <div className="not-prose mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div><h3 className="mb-3 text-lg font-extrabold text-slate-900">Worked example</h3><p className="mb-4 text-sm leading-relaxed text-slate-600">A model predicts four values. We will keep the numbers small so every step can be checked.</p><div className="space-y-3"><StepRow number={1}>Targets y = [3, −0.5, 2, 7] and predictions ŷ = [2.5, 0, 2, 8].</StepRow><StepRow number={2}>Errors y − ŷ = [0.5, −0.5, 0, −1].</StepRow><StepRow number={3}>Square the errors: [0.25, 0.25, 0, 1].</StepRow><StepRow number={4}>Average them: MSE = (0.25 + 0.25 + 0 + 1) ÷ 4 = <strong>0.375</strong>.</StepRow></div></div>
          <LossCurve kind="mse" title="Mean Squared Error" color="#2563eb" point={[-1, 1]} pointLabel="e = −1 → loss = 1" />
        </div>
        <div className="not-prose mt-5 grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="mb-1 font-bold text-emerald-900">Use MSE when</p><p className="m-0 text-sm text-slate-700">Large mistakes should receive much more attention and extreme values are genuine.</p></div><div className="rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="mb-1 font-bold text-amber-900">Be careful when</p><p className="m-0 text-sm text-slate-700">The data contains bad measurements or rare outliers; squaring can let them dominate.</p></div><div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4"><p className="mb-1 font-bold text-indigo-900">Example</p><p className="m-0 text-sm text-slate-700">Forecasting electricity demand where a very large miss is costly.</p></div></div>
      </section>

      <section>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-sky-600">Regression loss 2</p>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Mean Absolute Error (MAE)</h2>
        <p className="text-lg leading-relaxed">MAE measures the average <strong>size</strong> of the errors without caring whether a prediction was too high or too low. Absolute-value bars turn −3 and +3 into the same distance, 3. Unlike MSE, MAE does not square a large error.</p>
        <FormulaCard formula="MAE = (1/n) Σᵢ₌₁ⁿ |yᵢ − ŷᵢ|">The vertical bars mean <strong className="text-white">absolute value</strong>: keep only the distance from zero. Every error contributes in direct proportion to its size.</FormulaCard>
        <div className="not-prose mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div><h3 className="mb-3 text-lg font-extrabold text-slate-900">The same four predictions</h3><div className="space-y-3"><StepRow number={1}>Errors are [0.5, −0.5, 0, −1].</StepRow><StepRow number={2}>Absolute errors are [0.5, 0.5, 0, 1].</StepRow><StepRow number={3}>Add them: 0.5 + 0.5 + 0 + 1 = 2.</StepRow><StepRow number={4}>Average them: MAE = 2 ÷ 4 = <strong>0.5</strong>.</StepRow></div><div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700"><strong>Interpretation:</strong> the model misses the target by 0.5 units on average. MAE stays in the same unit as the target, so it is easy to explain.</div></div>
          <LossCurve kind="mae" title="Mean Absolute Error" color="#059669" point={[-1, 1]} pointLabel="e = −1 → loss = 1" />
        </div>
        <div className="not-prose mt-5 grid gap-3 md:grid-cols-3"><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="mb-1 font-bold text-emerald-900">Use MAE when</p><p className="m-0 text-sm text-slate-700">You want an interpretable typical error and need less sensitivity to outliers.</p></div><div className="rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="mb-1 font-bold text-amber-900">Be careful when</p><p className="m-0 text-sm text-slate-700">Smooth optimization near zero is important; MAE has a sharp corner there.</p></div><div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4"><p className="mb-1 font-bold text-indigo-900">Example</p><p className="m-0 text-sm text-slate-700">Predicting delivery time when occasional unusual delays should not control the whole model.</p></div></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">MSE and MAE React Differently to an Outlier</h2>
        <p className="text-lg leading-relaxed">Suppose three predictions have errors [1, 1, 10]. The error of 10 is unusual. Watch what squaring does.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[680px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Loss</th><th className="p-3 text-left">Calculation</th><th className="p-3 text-left">Result</th><th className="p-3 text-left">What happened?</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white"><tr><td className="p-3 font-bold text-indigo-800">MAE</td><td className="p-3 font-mono">(1 + 1 + 10) / 3</td><td className="p-3 font-bold">4</td><td className="p-3 text-slate-700">The outlier counts ten times as much as an error of 1.</td></tr><tr><td className="p-3 font-bold text-indigo-800">MSE</td><td className="p-3 font-mono">(1² + 1² + 10²) / 3</td><td className="p-3 font-bold">34</td><td className="p-3 text-slate-700">The outlier contributes 100, so it dominates the average.</td></tr></tbody></table></div>
        <p className="mt-4 text-lg leading-relaxed">Neither behaviour is automatically right. If the value 10 is a serious but valid failure, MSE’s strong penalty may be useful. If it is sensor noise, MAE or Huber loss may be safer.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">RMSE and Huber Loss: Two Useful Regression Alternatives</h2>
        <div className="not-prose grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-indigo-600">Root Mean Squared Error</p><h3 className="mb-3 text-xl font-extrabold text-slate-900">RMSE puts MSE back into the target’s unit</h3><p className="mb-3 text-sm leading-relaxed text-slate-700">Take the square root after calculating MSE. For the earlier example:</p><p className="mb-3 rounded-lg bg-slate-900 px-4 py-3 font-mono font-bold text-white">RMSE = √0.375 = 0.612</p><p className="m-0 text-sm leading-relaxed text-slate-700">Use RMSE as an easy-to-read evaluation value when large errors matter. Optimizing RMSE or MSE leads to the same best parameters because square root is increasing.</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-indigo-600">Huber loss</p><h3 className="mb-3 text-xl font-extrabold text-slate-900">Quadratic nearby, linear far away</h3><p className="mb-3 text-sm leading-relaxed text-slate-700">For small errors Huber behaves like a smooth squared loss; for large errors it grows like MAE. With threshold δ = 1 and error e = 3:</p><p className="mb-3 rounded-lg bg-slate-900 px-4 py-3 font-mono font-bold text-white">L = δ(|e| − ½δ) = 1(3 − 0.5) = 2.5</p><p className="m-0 text-sm leading-relaxed text-slate-700">Use it when most data is clean but some outliers should have limited influence.</p></div>
        </div>
        <div className="not-prose mt-5 max-w-md mx-auto"><LossCurve kind="huber" title="Huber loss" color="#d97706" point={[3, 2.5]} pointLabel="e = 3 → loss = 2.5" /></div>
      </section>

      <section>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-violet-600">Classification loss 1</p>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Binary Cross-Entropy (BCE)</h2>
        <p className="text-lg leading-relaxed">A binary classifier answers a two-choice question such as “spam or not spam.” Before reading its formula, compare three models on an email whose true label is spam, so y=1.</p>
        <div className="not-prose my-5 grid gap-4 md:grid-cols-3">{[["Model A","p = 0.9","loss = −ln(0.9) = 0.105","correct and confident","border-emerald-200 bg-emerald-50 text-emerald-950"],["Model B","p = 0.6","loss = −ln(0.6) = 0.511","correct but uncertain","border-amber-200 bg-amber-50 text-amber-950"],["Model C","p = 0.1","loss = −ln(0.1) = 2.303","confidently wrong","border-rose-200 bg-rose-50 text-rose-950"]].map(([name,p,loss,meaning,style])=><div key={name} className={`rounded-xl border p-5 ${style}`}><p className="font-bold">{name}</p><p className="mt-2 font-mono text-lg font-black">{p}</p><p className="mt-2 font-mono text-sm">{loss}</p><p className="mt-3 text-sm">{meaning}</p></div>)}</div>
        <p className="text-lg leading-relaxed">The natural logarithm has a useful shape: as the probability assigned to the true answer approaches zero, −ln(p) rises sharply. Training therefore receives a much stronger correction for a confident wrong prediction than for a confident correct one.</p>
        <FormulaCard formula="BCE = −[y ln(p) + (1 − y) ln(1 − p)]"><strong className="text-white">y</strong> is the target, either 0 or 1; <strong className="text-white">p</strong> is the predicted probability of class 1; <strong className="text-white">ln</strong> is the natural logarithm. Only the term belonging to the true label remains.</FormulaCard>
        <div className="not-prose mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div><h3 className="mb-3 text-lg font-extrabold text-slate-900">Worked example: spam email</h3><div className="space-y-3"><StepRow number={1}>The email really is spam, so y = 1.</StepRow><StepRow number={2}>The model predicts an 80% spam probability, so p = 0.8.</StepRow><StepRow number={3}>BCE = −[1 × ln(0.8) + (1 − 1) × ln(0.2)].</StepRow><StepRow number={4}>The second term becomes zero, so BCE = −ln(0.8) = <strong>0.223</strong>.</StepRow></div><div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">The prediction is correct and confident, so the loss is small. If p were 0.1, the loss would be −ln(0.1) = 2.303—a much stronger correction.</div></div>
          <LossCurve kind="bce" title="Binary cross-entropy for a true class of 1" color="#e11d48" point={[0.8, 0.223]} pointLabel="p = 0.8 → 0.223" />
        </div>
        <div className="not-prose mt-5 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5"><p className="m-0 text-sm leading-relaxed text-amber-950"><strong>Important implementation rule:</strong> if the network produces raw scores called <em>logits</em>, prefer a logits-aware library loss such as PyTorch <code>BCEWithLogitsLoss</code> or Keras <code>BinaryCrossentropy(from_logits=True)</code>. It combines sigmoid and BCE more safely.</p></div>
        <ScoreToDecisionFigure />
      </section>

      <section>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-violet-600">Classification loss 2</p>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Categorical Cross-Entropy</h2>
        <p className="text-lg leading-relaxed">Use categorical cross-entropy when exactly one class is correct among several choices. Softmax turns the model’s raw class scores into probabilities that add to 1. The loss then focuses on the probability assigned to the correct class.</p>
        <FormulaCard formula="CCE = −Σc y_c ln(p_c)"><strong className="text-white">c</strong> identifies a class; <strong className="text-white">y_c</strong> is 1 for the correct class and 0 for the others; <strong className="text-white">p_c</strong> is the predicted probability for that class.</FormulaCard>
        <div className="not-prose mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div><h3 className="mb-3 text-lg font-extrabold text-slate-900">Worked example: cat, dog or rabbit</h3><div className="space-y-3"><StepRow number={1}>The true class is cat, written as the one-hot target y = [1, 0, 0].</StepRow><StepRow number={2}>The model predicts p = [0.70, 0.20, 0.10].</StepRow><StepRow number={3}>CCE = −[1 ln(0.70) + 0 ln(0.20) + 0 ln(0.10)].</StepRow><StepRow number={4}>CCE = −ln(0.70) = <strong>0.357</strong>.</StepRow></div><p className="mt-4 text-sm leading-relaxed text-slate-700"><strong>Sparse categorical cross-entropy</strong> performs the same mathematical job, but the target is stored as an integer such as 0 for cat instead of [1, 0, 0]. Choose the API that matches how your labels are encoded.</p></div>
          <MulticlassBars />
        </div>
        <div className="not-prose mt-5 rounded-xl border-l-4 border-violet-500 bg-violet-50 p-5 text-sm leading-relaxed text-violet-950"><p className="m-0"><strong>Concept versus library input:</strong> conceptually, multiclass classification follows <em>logits → softmax probabilities → cross-entropy</em>. In PyTorch, <code>nn.CrossEntropyLoss</code> expects the <strong>raw logits</strong> and internally combines log-softmax with negative log-likelihood for numerical stability. Do not manually apply softmax before that fused loss. Apply softmax later when you need probabilities for interpretation or inference.</p></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Match the Loss, Output Layer and Target</h2>
        <p className="text-lg leading-relaxed">These three pieces form one contract. A mismatch can produce meaningless learning even when the code runs.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[900px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Problem</th><th className="p-3 text-left">Model output supplied to the loss</th><th className="p-3 text-left">Target example</th><th className="p-3 text-left">Good starting loss</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{[["Predict one number", "Unrestricted value", "₹52.4 lakh", "MSE, MAE or Huber"], ["Yes or no", "Raw logit for BCEWithLogitsLoss; sigmoid only when the API expects a probability", "0 or 1", "Binary cross-entropy"], ["One class among many", "Raw class logits for a fused cross-entropy loss", "Class 2 or [0,0,1]", "Sparse or categorical cross-entropy"], ["Several independent labels", "One raw logit per label for a logits-aware BCE loss", "[1,0,1,0]", "Binary cross-entropy per label"], ["Pixel mask with rare foreground", "Raw pixel logits for logits-aware BCE/CE", "Mask", "BCE/CE plus Dice or focal loss"]].map(([problem, output, target, loss]) => <tr key={problem}><td className="p-3 font-bold text-indigo-800">{problem}</td><td className="p-3 text-slate-700">{output}</td><td className="p-3 font-mono text-slate-700">{target}</td><td className="p-3 text-emerald-800 font-semibold">{loss}</td></tr>)}</tbody></table></div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">For a person reading predictions, convert logits to probabilities with sigmoid or softmax after the model produces them. For training, follow the selected loss API: fused logits-aware losses should receive logits directly.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Loss and Metric Answer Different Questions</h2>
        <p className="text-lg leading-relaxed">A <strong>loss</strong> is the numerical objective differentiated during training. A <strong>metric</strong> is a value people use to interpret performance. They can disagree because they summarize predictions differently.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[760px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Quantity</th><th className="p-3 text-left">Used for</th><th className="p-3 text-left">What it notices</th><th className="p-3 text-left">Example</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white"><tr><td className="p-3 font-bold text-indigo-800">Cross-entropy loss</td><td className="p-3">Gradient calculation and parameter updates</td><td className="p-3">How much probability reached the true class</td><td className="p-3">0.51 for p=0.60 when y=1</td></tr><tr><td className="p-3 font-bold text-emerald-800">Accuracy metric</td><td className="p-3">Human-readable evaluation</td><td className="p-3">Whether the final class decision was correct</td><td className="p-3">With threshold 0.50, p=0.60 is correct</td></tr></tbody></table></div>
        <p className="mt-5 text-lg leading-relaxed">Two correct predictions can have the same accuracy but different cross-entropy because 0.99 and 0.60 express different confidence. Conversely, a lower training loss does not guarantee better real-world performance; always inspect task-appropriate validation metrics and failure cases.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A Practical Choice Guide</h2>
        <div className="not-prose grid gap-3 md:grid-cols-2">
          {[["Typical numerical prediction", "Start with MSE and report MAE too. MSE gives smooth training; MAE tells people the typical error size."], ["Regression with suspicious outliers", "Try MAE or Huber. First investigate whether the outliers are valid rather than hiding a data-quality problem."], ["Binary or independent multi-label task", "Use binary cross-entropy. Use one sigmoid for binary output or one sigmoid for each independent label."], ["Exactly one class among many", "Use categorical cross-entropy for one-hot labels or sparse categorical cross-entropy for integer labels."], ["Severely imbalanced classification", "Try class weights or focal loss, then evaluate precision and recall. Accuracy alone can be deceptive."], ["Image segmentation", "Cross-entropy handles pixels; Dice loss directly rewards overlap. A combination is common when the foreground is small."]].map(([scenario, advice]) => <div key={scenario} className="rounded-xl border border-slate-200 bg-white p-5"><p className="mb-2 font-extrabold text-slate-900">{scenario}</p><p className="m-0 text-sm leading-relaxed text-slate-600">{advice}</p></div>)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Common Loss Functions at a Glance</h2>
        <p className="text-lg leading-relaxed">This original reference chart groups the functions by the kind of mistake they measure. Use it after understanding the detailed examples above—not as a substitute for them.</p>
        <div className="not-prose space-y-5">
          <div className="overflow-x-auto rounded-2xl border-2 border-sky-300 bg-white shadow-sm"><div className="bg-sky-100 px-5 py-3 text-center text-xl font-extrabold text-sky-950">Regression loss functions</div><table className="w-full min-w-[900px] text-sm"><thead className="bg-sky-50"><tr><th className="p-3 text-left">Loss</th><th className="p-3 text-left">Formula</th><th className="p-3 text-left">Best fit</th><th className="p-3 text-left">Main caution</th></tr></thead><tbody className="divide-y divide-sky-100">{[["MAE", "mean |y − ŷ|", "Interpretable error; outlier resistance", "Sharp point at zero"], ["MSE", "mean (y − ŷ)²", "Make large valid mistakes expensive", "Outliers can dominate"], ["RMSE", "√MSE", "Report squared-error performance in target units", "Keeps MSE sensitivity"], ["Huber", "quadratic near 0; linear beyond δ", "Smooth training with some outliers", "Threshold δ must be selected"], ["MAPE", "mean |(y − ŷ)/y| × 100", "Relative percentage error", "Breaks or explodes near y = 0"], ["Log-cosh", "mean log(cosh(ŷ − y))", "Smooth compromise between MSE and MAE", "Less immediately interpretable"]].map(([name, formula, fit, caution]) => <tr key={name}><td className="p-3 font-extrabold text-sky-800">{name}</td><td className="p-3 font-mono text-slate-700">{formula}</td><td className="p-3 text-slate-700">{fit}</td><td className="p-3 text-amber-800">{caution}</td></tr>)}</tbody></table></div>
          <div className="overflow-x-auto rounded-2xl border-2 border-violet-300 bg-white shadow-sm"><div className="bg-violet-100 px-5 py-3 text-center text-xl font-extrabold text-violet-950">Classification and structured-output losses</div><table className="w-full min-w-[900px] text-sm"><thead className="bg-violet-50"><tr><th className="p-3 text-left">Loss</th><th className="p-3 text-left">Core idea</th><th className="p-3 text-left">Best fit</th><th className="p-3 text-left">Main caution</th></tr></thead><tbody className="divide-y divide-violet-100">{[["Binary cross-entropy", "−[y ln p + (1−y) ln(1−p)]", "Binary and multi-label classification", "Match logits/probability setting"], ["Categorical cross-entropy", "−Σ y_c ln p_c", "Exactly one class among many", "Use the correct label encoding"], ["Hinge", "max(0, 1 − ys)", "Margin-based classifiers", "Scores are not probabilities"], ["Focal loss", "down-weights easy examples", "Severe class imbalance and detection", "Extra α and γ need tuning"], ["KL divergence", "Σ P ln(P/Q)", "Match one probability distribution to another", "Not symmetric; requires valid distributions"], ["Dice loss", "1 − 2 overlap/(predicted + target)", "Segmentation with small foreground areas", "Can need smoothing for empty masks"]].map(([name, formula, fit, caution]) => <tr key={name}><td className="p-3 font-extrabold text-violet-800">{name}</td><td className="p-3 font-mono text-slate-700">{formula}</td><td className="p-3 text-slate-700">{fit}</td><td className="p-3 text-amber-800">{caution}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Implement and Check the Calculations</h2>
        <div className="not-prose overflow-hidden rounded-xl bg-[#172033] shadow-lg"><div className="flex items-center gap-2 bg-slate-800 px-4 py-2 text-xs font-mono text-slate-300"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-400" /><span className="ml-2">losses.py</span></div><pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100"><code>{`import numpy as np

y = np.array([3.0, -0.5, 2.0, 7.0])
y_hat = np.array([2.5, 0.0, 2.0, 8.0])

mse = np.mean((y - y_hat) ** 2)
mae = np.mean(np.abs(y - y_hat))
rmse = np.sqrt(mse)

true_label = 1
p = 0.8
bce = -(true_label * np.log(p)
        + (1 - true_label) * np.log(1 - p))

print(mse, mae, rmse, bce)
# 0.375 0.5 0.612372... 0.223143...`}</code></pre></div>
        <div className="not-prose mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="mb-2 font-extrabold text-emerald-950">Three checks before training</p><ol className="m-0 space-y-2 pl-5 text-sm leading-relaxed text-slate-700"><li>Print one target and one raw model output. Confirm their shapes and meanings match.</li><li>Confirm whether the library loss expects raw logits or already-converted probabilities.</li><li>Report a human-readable metric beside the training loss; a small loss number has no universal unit.</li></ol></div>
      </section>

      <section className="not-prose rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 p-6 text-white md:p-8">
        <h2 className="mb-4 text-2xl font-extrabold">Key takeaways</h2>
        <div className="grid gap-4 md:grid-cols-2">{[["Loss defines the mistake", "Training follows the penalty you choose, so the loss must match the real task."], ["MSE emphasizes large errors", "Squaring creates a smooth curve but makes outliers influential."], ["MAE measures direct distance", "It is easy to interpret and less dominated by extreme values."], ["Cross-entropy evaluates probabilities", "It strongly penalizes confident wrong classification and must match the target encoding."]].map(([title, text]) => <div key={title} className="rounded-xl border border-white/15 bg-white/10 p-4"><p className="mb-1 font-bold text-indigo-200">{title}</p><p className="m-0 text-sm leading-relaxed text-slate-200">{text}</p></div>)}</div>
      </section>
    </div>
  );
}
