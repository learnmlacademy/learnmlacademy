import React from "react";

function FormulaCard({
  title,
  formula,
  children,
}: {
  title: string;
  formula: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">{title}</p>
      <div className="overflow-x-auto whitespace-nowrap font-mono text-lg font-bold leading-relaxed md:text-xl">{formula}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-200">{children}</div>
    </div>
  );
}

function LearningCurvesFigure() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">How a validation curve reveals overfitting</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">Lower loss is better. The values are illustrative, but the pattern is one you should learn to recognize.</p>
      </div>
      <div className="overflow-x-auto p-3 md:p-6">
        <svg viewBox="0 0 820 390" className="h-auto min-w-[680px] w-full" role="img" aria-labelledby="regularization-curves-title regularization-curves-desc">
          <title id="regularization-curves-title">Training and validation loss across eight epochs</title>
          <desc id="regularization-curves-desc">Training loss keeps falling. Validation loss falls until epoch four and then rises, indicating overfitting. Epoch four is the checkpoint to keep.</desc>
          <rect x="0" y="0" width="820" height="390" rx="18" fill="#f8fafc" />
          <rect x="95" y="45" width="350" height="270" fill="#ecfdf5" opacity="0.8" />
          <rect x="445" y="45" width="290" height="270" fill="#fff1f2" opacity="0.85" />
          <text x="205" y="70" fontSize="15" fontWeight="700" fill="#047857">useful learning</text>
          <text x="545" y="70" fontSize="15" fontWeight="700" fill="#be123c">overfitting begins</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line x1="95" y1={95 + i * 55} x2="735" y2={95 + i * 55} stroke="#cbd5e1" strokeDasharray="5 5" />
              <text x="75" y={101 + i * 55} textAnchor="end" fontSize="12" fill="#64748b">{(0.8 - i * 0.15).toFixed(2)}</text>
            </g>
          ))}
          <line x1="95" y1="315" x2="735" y2="315" stroke="#334155" strokeWidth="2" />
          <line x1="95" y1="45" x2="95" y2="315" stroke="#334155" strokeWidth="2" />
          {[1, 2, 3, 4, 5, 6, 7, 8].map((epoch, i) => (
            <g key={epoch}>
              <line x1={115 + i * 85} y1="315" x2={115 + i * 85} y2="321" stroke="#334155" />
              <text x={115 + i * 85} y="340" textAnchor="middle" fontSize="12" fill="#475569">{epoch}</text>
            </g>
          ))}
          <text x="415" y="370" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">epoch</text>
          <text x="25" y="180" transform="rotate(-90 25 180)" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">loss</text>
          <path d="M115 105 C180 155 210 180 285 215 S410 260 455 275 S600 295 710 302" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <path d="M115 115 C180 150 225 205 285 230 S390 260 455 267 C520 270 580 250 625 224 S680 190 710 170" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
          <line x1="370" y1="70" x2="370" y2="315" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 5" />
          <circle cx="370" cy="257" r="8" fill="#7c3aed" stroke="white" strokeWidth="3" />
          <rect x="290" y="78" width="160" height="52" rx="10" fill="#ede9fe" stroke="#8b5cf6" />
          <text x="370" y="99" textAnchor="middle" fontSize="13" fontWeight="800" fill="#5b21b6">best validation epoch</text>
          <text x="370" y="118" textAnchor="middle" fontSize="12" fill="#6d28d9">save this checkpoint</text>
          <line x1="575" y1="98" x2="610" y2="98" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
          <text x="620" y="103" fontSize="13" fill="#334155">training loss</text>
          <line x1="575" y1="126" x2="610" y2="126" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
          <text x="620" y="131" fontSize="13" fill="#334155">validation loss</text>
        </svg>
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600"><strong>What to notice:</strong> the network continues to improve on examples it has seen, but after epoch 4 it becomes worse on separate validation examples. Regularization aims to improve that unseen-data behaviour, not merely to make training loss larger.</figcaption>
    </figure>
  );
}

function DropoutFigure() {
  const nodes = [120, 205, 290];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">Dropout changes the network only while it is learning</p>
        <p className="mt-1 text-sm text-slate-600">The crossed neurons are randomly inactive for one training pass. A different mask is sampled on a later pass.</p>
      </div>
      <div className="overflow-x-auto p-3 md:p-6">
        <svg viewBox="0 0 900 400" className="h-auto min-w-[720px] w-full" role="img" aria-labelledby="dropout-title dropout-desc">
          <title id="dropout-title">The same neural network during training and prediction with dropout</title>
          <desc id="dropout-desc">During training, two hidden units are disabled and the active outputs are scaled. During prediction, every hidden unit is active and no random mask is used.</desc>
          <defs><marker id="drop-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#64748b" /></marker></defs>
          <rect width="900" height="400" rx="18" fill="#f8fafc" />
          <line x1="450" y1="30" x2="450" y2="370" stroke="#cbd5e1" strokeWidth="2" />
          <text x="225" y="45" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0f172a">Training: dropout ON</text>
          <text x="675" y="45" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0f172a">Validation / prediction: dropout OFF</text>
          {[0, 450].map((offset, panel) => (
            <g key={offset}>
              <text x={65 + offset} y="205" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">input</text>
              <text x={235 + offset} y="360" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">hidden units</text>
              <text x={390 + offset} y="205" textAnchor="middle" fontSize="13" fontWeight="700" fill="#475569">output</text>
              {nodes.map((y, i) => (
                <g key={`${panel}-i-${i}`}><circle cx={65 + offset} cy={y} r="20" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" /><text x={65 + offset} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">x{i + 1}</text></g>
              ))}
              {[88, 164, 240, 316].map((y, i) => {
                const dropped = panel === 0 && (i === 1 || i === 3);
                return (
                  <g key={`${panel}-h-${i}`}>
                    {nodes.map((inputY) => !dropped && <line key={inputY} x1={86 + offset} y1={inputY} x2={213 + offset} y2={y} stroke="#94a3b8" strokeWidth="1.3" />)}
                    {!dropped && <line x1={257 + offset} y1={y} x2={365 + offset} y2="205" stroke="#94a3b8" strokeWidth="1.3" markerEnd="url(#drop-arrow)" />}
                    <circle cx={235 + offset} cy={y} r="22" fill={dropped ? "#fee2e2" : "#dcfce7"} stroke={dropped ? "#ef4444" : "#16a34a"} strokeWidth="2" />
                    <text x={235 + offset} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={dropped ? "#b91c1c" : "#166534"}>h{i + 1}</text>
                    {dropped && <><line x1={220 + offset} y1={y - 15} x2={250 + offset} y2={y + 15} stroke="#dc2626" strokeWidth="4" /><line x1={250 + offset} y1={y - 15} x2={220 + offset} y2={y + 15} stroke="#dc2626" strokeWidth="4" /></>}
                  </g>
                );
              })}
              <circle cx={390 + offset} cy="205" r="24" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
              <text x={390 + offset} y="210" textAnchor="middle" fontSize="12" fontWeight="800" fill="#5b21b6">ŷ</text>
            </g>
          ))}
          <rect x="120" y="315" width="210" height="30" rx="15" fill="#fff7ed" stroke="#fb923c" />
          <text x="225" y="335" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">random mask + active-unit scaling</text>
          <rect x="585" y="315" width="180" height="30" rx="15" fill="#ecfdf5" stroke="#34d399" />
          <text x="675" y="335" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">all learned paths available</text>
        </svg>
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600">In libraries that use <strong>inverted dropout</strong>, scaling happens during training, so prediction needs no extra scaling. Calling <code>model.eval()</code> disables ordinary PyTorch dropout.</figcaption>
    </figure>
  );
}

function EarlyStoppingFigure() {
  const losses = [0.72, 0.55, 0.44, 0.39, 0.41, 0.43];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">Early stopping keeps the best model, not the last model</p>
        <p className="mt-1 text-sm text-slate-600">Example: monitor validation loss, use patience = 2, and save whenever the loss reaches a new minimum.</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-3 lg:grid-cols-6">
        {losses.map((loss, index) => {
          const best = index === 3;
          const waiting = index > 3;
          return (
            <div key={loss} className={`relative rounded-xl border p-4 text-center ${best ? "border-violet-400 bg-violet-50 ring-2 ring-violet-200" : waiting ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Epoch {index + 1}</p>
              <p className="my-2 text-2xl font-extrabold text-slate-900">{loss.toFixed(2)}</p>
              <p className="text-xs font-semibold text-slate-600">{best ? "new best — save" : waiting ? `no improvement ${index - 3}/2` : "improved — save"}</p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 md:grid-cols-3">
        <p className="m-0 text-sm"><strong>Stop:</strong> after epoch 6</p>
        <p className="m-0 text-sm"><strong>Restore:</strong> epoch 4 weights</p>
        <p className="m-0 text-sm"><strong>Why:</strong> 0.39 was the lowest validation loss</p>
      </div>
    </figure>
  );
}

function DistillationFigure() {
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-5 font-bold text-slate-900">Knowledge distillation combines two kinds of supervision</p>
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1.1fr]">
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4"><p className="text-xs font-bold uppercase text-violet-700">Large teacher</p><p className="mt-2 font-mono text-sm text-slate-800">cat 0.70<br />fox 0.22<br />dog 0.08</p><p className="mt-2 text-xs leading-relaxed text-slate-600">Soft probabilities reveal that this cat resembles a fox more than a dog.</p></div>
        <div className="flex items-center justify-center text-2xl font-black text-slate-400">+</div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="text-xs font-bold uppercase text-blue-700">Known label</p><p className="mt-2 font-mono text-sm text-slate-800">cat 1.00<br />fox 0.00<br />dog 0.00</p><p className="mt-2 text-xs leading-relaxed text-slate-600">The hard label states the correct class.</p></div>
        <div className="flex items-center justify-center text-2xl font-black text-slate-400">→</div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="text-xs font-bold uppercase text-emerald-700">Smaller student</p><p className="mt-2 font-mono text-sm text-slate-800">learn truth<br />+ teacher pattern</p><p className="mt-2 text-xs leading-relaxed text-slate-600">The deployable model learns both the answer and the teacher’s class relationships.</p></div>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-slate-600">The teacher must already be trained (in standard offline distillation). The student is smaller, but matching a teacher does not guarantee equal accuracy.</figcaption>
    </figure>
  );
}

const techniqueRows = [
  ["Training loss low; validation loss rising", "Early stopping", "Stops after validation ceases to improve and restores the best checkpoint", "Needs a representative validation set"],
  ["Dense or Transformer weights are growing large", "AdamW weight decay", "Applies a direct shrinkage step while optimizing", "Tune the coefficient; often exclude bias and normalization parameters"],
  ["Large dense head relies on a few activations", "Dropout", "Randomly removes activation paths during training", "Too much dropout causes underfitting and slower learning"],
  ["Only a small subset of inputs should matter", "L1 penalty", "Encourages some weights toward exact zero", "Its corner at zero can make optimization less smooth"],
  ["Classifier is becoming extremely confident", "Label smoothing", "Replaces hard one-hot targets with a small amount of uniform uncertainty", "Can hurt tasks that require sharp probabilities or later distillation"],
  ["Small model must imitate a strong large model", "Knowledge distillation", "Transfers soft class relationships from teacher to student", "Requires a capable teacher and extra training design"],
  ["Highest accuracy matters more than serving cost", "Ensemble", "Averages diverse models so individual errors may cancel", "Multiplies memory, latency and maintenance cost"],
] as const;

export function RegularizationContent() {
  return (
    <div className="prose prose-lg max-w-none text-slate-700">
      <section className="not-prose mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-violet-900 to-fuchsia-800 px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-violet-200">Deep Learning · Generalization</p>
        <h2 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">Regularization: Teaching a Network to Succeed on New Data</h2>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-violet-50 md:text-xl">A neural network can score perfectly on its practice examples and still fail in the real world. Regularization is the collection of choices that discourages this kind of memorization. In this lesson you will learn how to recognize overfitting, calculate L1 and L2 penalties, follow dropout with numbers, stop at the right checkpoint, soften labels, distil a teacher, and choose a method for a real project.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Real Goal Is Not to Win on the Training Set</h2>
        <p className="text-lg leading-relaxed">Imagine a student who memorizes the answers to one practice paper. The score on that paper is excellent, but a new exam with different questions exposes the problem: the student remembered examples instead of learning the underlying ideas. A high-capacity neural network can do the same thing with images, text or customer records.</p>
        <p className="text-lg leading-relaxed"><strong>Generalization</strong> means performing well on relevant examples that were not used to update the weights. <strong>Overfitting</strong> means the model has learned training-specific detail—possibly noise, backgrounds, duplicate records or accidental shortcuts—that does not transfer to those new examples. <strong>Regularization</strong> deliberately constrains or perturbs learning so useful, repeatable patterns have an advantage over brittle memorization.</p>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-950">Model A: impressive practice score</p><div className="mt-3 grid grid-cols-2 gap-3 text-center"><div className="rounded-lg bg-white p-3"><p className="text-xs font-bold uppercase text-slate-500">Training accuracy</p><p className="mt-1 text-2xl font-black text-slate-900">99%</p></div><div className="rounded-lg bg-white p-3"><p className="text-xs font-bold uppercase text-slate-500">Validation accuracy</p><p className="mt-1 text-2xl font-black text-rose-700">78%</p></div></div><p className="mt-3 text-sm leading-relaxed text-slate-700">The 21-point <strong>generalization gap</strong> is a warning. The training score alone hid the problem.</p></div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">Model B: better real-world evidence</p><div className="mt-3 grid grid-cols-2 gap-3 text-center"><div className="rounded-lg bg-white p-3"><p className="text-xs font-bold uppercase text-slate-500">Training accuracy</p><p className="mt-1 text-2xl font-black text-slate-900">93%</p></div><div className="rounded-lg bg-white p-3"><p className="text-xs font-bold uppercase text-slate-500">Validation accuracy</p><p className="mt-1 text-2xl font-black text-emerald-700">90%</p></div></div><p className="mt-3 text-sm leading-relaxed text-slate-700">Although its training score is lower, the 3-point gap and stronger validation result make Model B the better candidate.</p></div>
        </div>
        <LearningCurvesFigure />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Diagnose the Cause Before Adding a Remedy</h2>
        <p className="text-lg leading-relaxed">A gap between training and validation performance suggests overfitting, but regularization is not the first answer to every gap. First confirm that the comparison is fair. Training and validation data must represent the same intended task, while remaining separate enough to prevent leakage.</p>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          {[
            ["1 · Verify the split", "Keep users, patients, documents or time periods from leaking across splits. Near-duplicates can make validation falsely easy."],
            ["2 · Inspect the data", "Check labels, class balance, preprocessing and whether validation contains a different camera, language, season or population."],
            ["3 · Compare both curves", "High training and validation loss suggests underfitting or broken optimization—not a need for stronger regularization."],
          ].map(([title, body]) => <div key={title} className="rounded-xl border border-indigo-200 bg-indigo-50 p-5"><p className="font-extrabold text-indigo-950">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div>)}
        </div>
        <p className="mt-5 text-lg leading-relaxed">Regularization usually trades some training fit for better validation behaviour. If both sets are poor, adding more constraint can make the model worse. That situation may need better features, a more capable model, longer training or a repaired data pipeline.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">L2 and L1 Add a Cost for Complicated Weights</h2>
        <p className="text-lg leading-relaxed">Weights control how strongly one value influences the next layer. Very large weights can make a prediction depend sharply on small details. A <strong>penalty</strong> adds a second goal to the ordinary data loss: fit the labels, but avoid unnecessarily large weights.</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <FormulaCard title="L2 penalty" formula={<>L<sub>total</sub> = L<sub>data</sub> + λ Σ w<sub>i</sub><sup>2</sup></>}>
            Square every included weight, add the squares, and multiply by <strong>λ</strong> (lambda), the regularization strength. L2 normally shrinks many weights smoothly rather than selecting a few exact zeros.
          </FormulaCard>
          <FormulaCard title="L1 penalty" formula={<>L<sub>total</sub> = L<sub>data</sub> + λ Σ |w<sub>i</sub>|</>}>
            Take each included weight&apos;s absolute value, add them, and multiply by λ. L1&apos;s shape has a corner at zero, which encourages a <strong>sparse</strong> solution—one containing many zero weights.
          </FormulaCard>
        </div>
        <div className="not-prose mt-6 rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm md:p-6">
          <h3 className="text-xl font-bold text-indigo-900">One set of weights, two penalties</h3>
          <p className="mt-2 leading-relaxed text-slate-700">Suppose the model calculated a data loss of 0.60 on the current batch. Its two illustrative learned weights currently equal 3 and 4. The developer chooses λ = 0.01 as a regularization hyperparameter; validation results—not backpropagation—decide whether that strength is suitable. We use the formulas exactly as written above; some texts include an extra ½, so always check the convention.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-slate-900">L2 calculation</p><p className="mt-2 font-mono text-sm leading-7 text-slate-700">Σw² = 3² + 4²<br />= 9 + 16 = 25<br />penalty = 0.01 × 25 = 0.25<br /><strong>L<sub>total</sub> = 0.60 + 0.25 = 0.85</strong></p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-slate-900">L1 calculation</p><p className="mt-2 font-mono text-sm leading-7 text-slate-700">Σ|w| = |3| + |4|<br />= 3 + 4 = 7<br />penalty = 0.01 × 7 = 0.07<br /><strong>L<sub>total</sub> = 0.60 + 0.07 = 0.67</strong></p></div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>Interpretation:</strong> these totals are training objectives, not validation scores. The optimizer now receives pressure both to reduce prediction error and to reduce weight size. The numbers do not prove that L1 is “better” because 0.67 is smaller; the penalty shapes and useful λ values are different.</p>
        </div>
        <div className="not-prose mt-5 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950"><strong>L2 penalty versus weight decay:</strong> they can produce the same update for plain SGD under matching conventions. In adaptive optimizers, decoupled weight decay—as used by AdamW—applies shrinkage separately from the gradient-based update and should not be treated as automatically identical to adding L2 to the loss.</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Dropout Prevents Dependence on One Fragile Path</h2>
        <p className="text-lg leading-relaxed">During each training forward pass, dropout randomly sets some activation values to zero. A neuron cannot assume that its usual partners will always be available, so the network is encouraged to distribute useful evidence across multiple paths. <strong>Dropout rate p</strong> is the probability of dropping an activation; <strong>keep probability q = 1 − p</strong> is the probability of retaining it.</p>
        <DropoutFigure />
        <FormulaCard title="Inverted dropout" formula={<>h&apos; = (m ⊙ h) / (1 − p)</>}>
          <strong>h</strong> is the activation vector before dropout; <strong>m</strong> is a random mask containing 1 for “keep” and 0 for “drop”; <strong>⊙</strong> means element-by-element multiplication; and <strong>p</strong> is the dropout rate. Division by the keep probability maintains each activation&apos;s expected value across many random masks.
        </FormulaCard>
        <div className="not-prose mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6">
          <h3 className="text-xl font-bold text-emerald-950">A dropout pass with four activations</h3>
          <p className="mt-2 leading-relaxed text-slate-700">Let h = [2, 4, 6, 8], an illustrative activation vector produced by the previous layer. The developer chooses dropout rate p = 0.25, so the calculated keep probability is q = 1 − 0.25 = 0.75. For this pass, the framework independently samples one keep/drop decision per activation and happens to produce m = [1, 0, 1, 1]. The mask is temporary; no neuron is deleted.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <p className="rounded-lg bg-white p-4 font-mono text-sm leading-7"><strong>1. Apply mask</strong><br />m ⊙ h<br />= [2, 0, 6, 8]</p>
            <p className="rounded-lg bg-white p-4 font-mono text-sm leading-7"><strong>2. Scale kept values</strong><br />[2, 0, 6, 8] / 0.75<br />≈ [2.67, 0, 8, 10.67]</p>
            <p className="rounded-lg bg-white p-4 text-sm leading-7"><strong>3. Interpret</strong><br />One activation vanished for this pass. The others grew by 1/0.75 so their long-run expected values remain unchanged.</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">One random pass does <em>not</em> need to have the same total or average as the original vector. The equality is an expectation over many possible masks.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Early Stopping Uses Validation Performance to Choose Training Time</h2>
        <p className="text-lg leading-relaxed">An <strong>epoch</strong> is one pass through the training set. If training continues after the validation result has stopped improving, the network may become increasingly specialized to its training examples. Early stopping treats the number of training epochs as a choice to validate.</p>
        <EarlyStoppingFigure />
        <p className="text-lg leading-relaxed"><strong>Patience</strong> is how many checks we tolerate without sufficient improvement. A <strong>minimum change</strong> can prevent tiny numerical fluctuations from resetting patience. Most importantly, save the weights at each new best validation result and restore those weights when stopping. Keeping epoch 6 in the example would defeat the purpose.</p>
        <div className="not-prose rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm leading-relaxed text-rose-950"><strong>Do not watch the test set:</strong> use validation data for early stopping and hyperparameter decisions. Reserve the test set for a final, less-biased estimate after decisions are complete.</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Label Smoothing Reduces Absolute Certainty in the Target</h2>
        <p className="text-lg leading-relaxed">In four-class classification, the ordinary one-hot target for a cat is [1, 0, 0, 0]. That says the correct class has probability one and every alternative has probability zero. Real labels may be imperfect, and forcing extreme confidence can make a classifier brittle. Label smoothing mixes the hard target with a uniform distribution.</p>
        <FormulaCard title="Smoothed target" formula={<>y<sub>smooth</sub> = (1 − ε)y<sub>one-hot</sub> + (ε / C)1</>}>
          <strong>ε</strong> is the smoothing amount, <strong>C</strong> is the number of classes, and <strong>1</strong> is a vector of ones. This is the uniform-mixture convention used by PyTorch&apos;s <code>CrossEntropyLoss(label_smoothing=...)</code>.
        </FormulaCard>
        <div className="not-prose mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5 md:p-6">
          <h3 className="text-xl font-bold text-blue-950">Four classes with ε = 0.10</h3>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-800">uniform share per class = ε / C = 0.10 / 4 = 0.025<br />correct cat target = (1 − 0.10) × 1 + 0.025 = <strong>0.925</strong><br />each other target = (1 − 0.10) × 0 + 0.025 = <strong>0.025</strong><br />check: 0.925 + 0.025 + 0.025 + 0.025 = <strong>1.000</strong></p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700"><strong>Where the values came from:</strong> four is fixed by the dataset&apos;s class list; [1, 0, 0, 0] comes from the known cat label; ε = 0.10 is a developer-chosen hyperparameter; 0.025 and 0.925 are calculated. <strong>Meaning:</strong> cat is still overwhelmingly correct, but the learning target no longer demands absolute certainty. Tune ε on validation data; smoothing can be harmful when confident, sharply separated probabilities are essential or when it removes useful information needed for distillation.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Distillation and Ensembles Solve Different Problems</h2>
        <p className="text-lg leading-relaxed"><strong>Knowledge distillation</strong> uses a strong, usually larger <strong>teacher</strong> model to train a smaller <strong>student</strong>. <strong>Logits</strong> are the raw scores before softmax. Dividing logits by a <strong>temperature T</strong> greater than one creates softer probabilities that expose relationships between incorrect classes, sometimes called “dark knowledge.”</p>
        <DistillationFigure />
        <FormulaCard title="A common distillation objective" formula={<>L = α CE(y, s) + (1 − α)T² KL(t<sub>T</sub> ∥ s<sub>T</sub>)</>}>
          The first term uses the known label <strong>y</strong> and student prediction <strong>s</strong>. The second asks the temperature-softened student distribution <strong>s<sub>T</sub></strong> to match teacher distribution <strong>t<sub>T</sub></strong>. <strong>α</strong> balances label learning and imitation; <strong>KL</strong> measures distribution mismatch. The T² factor keeps gradient scale more comparable as temperature changes.
        </FormulaCard>
        <p className="mt-5 text-lg leading-relaxed">An <strong>ensemble</strong>, by contrast, keeps several trained models and combines their predictions. If three defect classifiers return 0.90, 0.60 and 0.75 probability of “defective,” simple averaging gives (0.90 + 0.60 + 0.75) / 3 = <strong>0.75</strong>. Diversity is important: three nearly identical models often make the same mistakes. Ensembles can improve robustness, but serving three models costs more than serving one distilled student.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Choose the Method That Matches the Symptom</h2>
        <p className="text-lg leading-relaxed">Regularization is a set of levers, not a checklist that should all be switched on. Begin with a reproducible baseline, inspect training and validation curves, then change one or two well-motivated settings at a time.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[980px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Observed situation</th><th className="p-3 text-left">Reasonable starting choice</th><th className="p-3 text-left">What it changes</th><th className="p-3 text-left">Important caution</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{techniqueRows.map(([situation, choice, action, caution]) => <tr key={situation} className="align-top"><td className="p-3 font-bold text-slate-900">{situation}</td><td className="p-3 font-bold text-indigo-700">{choice}</td><td className="p-3 text-slate-700">{action}</td><td className="p-3 text-amber-900">{caution}</td></tr>)}</tbody></table>
        </div>
        <div className="not-prose mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-5 text-sm leading-relaxed text-cyan-950"><strong>Data often beats penalties:</strong> if realistic, correctly labelled examples are available, more representative data or valid data augmentation can address the actual coverage problem. The next lesson explains augmentation and why transformations must preserve the label.</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A Small PyTorch Classifier With Three Regularizers</h2>
        <p className="text-lg leading-relaxed">The model below uses dropout inside the network, AdamW weight decay in the optimizer, label smoothing in the loss, and a short early-stopping routine around the training process. Each line implements a mechanism already explained above.</p>
        <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">regularized_classifier.py</div>
          <pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`import copy
import torch
from torch import nn

class Classifier(nn.Module):
    def __init__(self, input_features=64, classes=4):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_features, 32),
            nn.ReLU(),
            nn.Dropout(p=0.25),  # random masking only in train mode
            nn.Linear(32, classes),  # raw class scores (logits)
        )

    def forward(self, x):
        return self.network(x)

model = Classifier()
loss_fn = nn.CrossEntropyLoss(label_smoothing=0.10)
optimizer = torch.optim.AdamW(
    model.parameters(), lr=3e-4, weight_decay=1e-2
)

best_loss = float("inf")
best_weights = None
checks_without_improvement = 0
patience = 2

for epoch in range(30):
    model.train()                  # enables dropout
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        logits = model(inputs)
        loss = loss_fn(logits, labels)
        loss.backward()
        optimizer.step()

    model.eval()                   # disables ordinary dropout
    total_validation_loss = 0.0
    total_validation_examples = 0
    with torch.no_grad():
        for inputs, labels in validation_loader:
            logits = model(inputs)
            batch_size = labels.size(0)
            batch_loss = loss_fn(logits, labels)
            total_validation_loss += batch_loss.item() * batch_size
            total_validation_examples += batch_size

    validation_loss = total_validation_loss / total_validation_examples
    if validation_loss < best_loss - 1e-4:
        best_loss = validation_loss
        best_weights = copy.deepcopy(model.state_dict())
        checks_without_improvement = 0
    else:
        checks_without_improvement += 1
        if checks_without_improvement >= patience:
            break

model.load_state_dict(best_weights)  # keep the best, not the last`}</pre>
        </div>
        <div className="not-prose mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6">
          <p className="font-bold text-indigo-950">Where the code&apos;s numbers and behaviours come from</p>
          <ul className="mt-3 space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            <li><strong>64 inputs</strong> must match the feature vector supplied by the data pipeline; <strong>4 outputs</strong> come from the four class names. The hidden width <strong>32</strong> is a model-capacity choice.</li>
            <li><strong>0.25 dropout, 0.10 smoothing, 3e−4 learning rate, 1e−2 decay, patience 2 and the 30-epoch ceiling</strong> are developer-chosen hyperparameters that should be validated.</li>
            <li><code>model.train()</code> enables dropout sampling; <code>model.eval()</code> disables it. <code>no_grad()</code> prevents validation from building a gradient graph.</li>
            <li>Each mean batch loss is multiplied by that batch&apos;s size before division by the total number of examples. This sample-weighted mean remains correct when the final validation batch is smaller.</li>
            <li><code>loss.backward()</code> calculates parameter gradients, <code>optimizer.step()</code> applies AdamW&apos;s update, and <code>state_dict()</code> captures the best parameter values so the final model does not keep a worse later epoch.</li>
          </ul>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">In a production project, also save the optimizer state, epoch, metric definition and preprocessing configuration in the checkpoint. If biases or normalization parameters need different weight decay, create explicit parameter groups rather than applying one value blindly to everything.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Common Failure Patterns and How to Investigate Them</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[960px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Symptom</th><th className="p-3 text-left">Likely explanation</th><th className="p-3 text-left">Useful next check</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{[
            ["Training and validation are both poor", "Underfitting, weak features or optimization trouble", "First reduce regularization; run the tiny-data test; inspect the learning rate and labels"],
            ["Validation looks much better than training", "Dropout/augmentation active only in training, or inconsistent metric code", "Compare both sets in model.eval() using identical deterministic metric logic"],
            ["Repeated predictions change in production", "Model remained in training mode, so dropout is still random", "Call model.eval() before ordinary inference"],
            ["Early stopping keeps the wrong model", "Only the last weights were retained", "Save a deep copy/checkpoint at each new best validation value and restore it"],
            ["Stronger dropout makes everything worse", "The model no longer has enough active capacity", "Lower p, limit dropout to appropriate layers, or use weight decay instead"],
            ["Validation improved but deployment failed", "The validation split did not represent production", "Create group/time/location-aware splits and monitor post-deployment drift"],
          ].map(([symptom, cause, next]) => <tr key={symptom} className="align-top"><td className="p-3 font-bold text-slate-900">{symptom}</td><td className="p-3 text-rose-800">{cause}</td><td className="p-3 text-indigo-800">{next}</td></tr>)}</tbody></table>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-950">Regularization cannot repair distribution shift.</p><p className="mt-2 text-sm leading-relaxed text-slate-700">If production images come from a new sensor or customers use a new language, the training distribution may not cover the task. Representative data, adaptation and monitoring are still required.</p></div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-950">Validation can also be overfit.</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Trying hundreds of choices against one validation set gradually adapts decisions to that set. Keep an untouched final test set and confirm important results across robust splits or repeated runs.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What to Carry Into Your Next Model</h2>
        <div className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <ul className="m-0 space-y-2 pl-5 text-indigo-950">
            <li>Generalization—not minimum training loss—is the goal.</li>
            <li>Use separate validation evidence to diagnose overfitting before adding regularization.</li>
            <li>L2 discourages large weights smoothly; L1 encourages sparsity; AdamW applies decoupled weight decay.</li>
            <li>Dropout randomly masks activations during training and is normally disabled for evaluation.</li>
            <li>Early stopping must restore the best checkpoint, not keep the final epoch.</li>
            <li>Label smoothing, distillation and ensembles all use softer information, but they solve different problems.</li>
            <li>No regularizer replaces representative data, a trustworthy split and final testing.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Continue Learning</h2>
        <div className="not-prose mb-10 grid gap-4 md:grid-cols-2">
          <a href="/learn/weight-initialization" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Previous concept</p><p className="m-0 font-bold text-slate-900">Initialization, Normalization and Stable Gradients</p></a>
          <a href="/learn/data-augmentation-deep-learning" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Next concept</p><p className="m-0 font-bold text-slate-900">Data Augmentation</p></a>
        </div>
      </section>
    </div>
  );
}
