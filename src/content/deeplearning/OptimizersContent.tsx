import React from "react";

function FormulaBox({
  label,
  formula,
  explanation,
}: {
  label: string;
  formula: React.ReactNode;
  explanation: React.ReactNode;
}) {
  return (
    <div className="not-prose rounded-2xl bg-indigo-950 p-5 text-white md:p-6">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-300">{label}</p>
      <div className="overflow-x-auto font-mono text-lg font-bold leading-relaxed md:text-xl">{formula}</div>
      <div className="mt-3 text-sm leading-relaxed text-indigo-100">{explanation}</div>
    </div>
  );
}

function UpdatePipelineFigure() {
  const stages = [
    ["1", "Forward pass", "The network makes a prediction."],
    ["2", "Loss", "A number measures how wrong it was."],
    ["3", "Backpropagation", "Gradients show how each weight affected the loss."],
    ["4", "Optimizer", "A rule converts gradients into weight changes."],
    ["5", "Updated network", "The next prediction uses the new weights."],
  ];

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">Where the optimizer fits in one training step</p>
        <p className="mt-1 text-sm text-slate-600">Backpropagation calculates information; the optimizer uses it to change the model.</p>
      </div>
      <div className="grid gap-3 p-5 md:grid-cols-5">
        {stages.map(([number, title, text], index) => (
          <React.Fragment key={title}>
            <div className={`relative rounded-xl border p-4 ${index === 3 ? "border-amber-300 bg-amber-50" : "border-indigo-200 bg-indigo-50/60"}`}>
              <span className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${index === 3 ? "bg-amber-500 text-white" : "bg-indigo-600 text-white"}`}>{number}</span>
              <p className="font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{text}</p>
              {index < stages.length - 1 && <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl font-bold text-indigo-400 md:block">→</span>}
            </div>
          </React.Fragment>
        ))}
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm text-slate-600">
        The optimizer does not make predictions and it does not calculate gradients. Its job begins after gradients exist.
      </figcaption>
    </figure>
  );
}

type LandscapePath = {
  name: string;
  color: string;
  points: string;
  summary: string;
};

const landscapePaths: LandscapePath[] = [
  {
    name: "Plain SGD",
    color: "#ef4444",
    points: "M 35 45 L 242 74 L 68 102 L 224 128 L 92 149 L 194 165 L 121 176 L 168 184",
    summary: "The current gradient repeatedly sends the update across the steep sides of the valley.",
  },
  {
    name: "SGD + Momentum",
    color: "#2563eb",
    points: "M 35 45 C 198 61 86 96 176 113 C 227 126 113 147 170 183",
    summary: "Remembered direction damps side-to-side movement and builds speed along the valley.",
  },
  {
    name: "Adam",
    color: "#7c3aed",
    points: "M 35 45 C 111 52 138 76 148 103 C 155 124 157 151 166 184",
    summary: "Per-parameter scaling makes smaller moves along steep directions and relatively larger moves along flatter ones.",
  },
];

function LossLandscapeFigure() {
  return (
    <figure className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-5">
        <p className="text-lg font-bold text-slate-900">How three optimizers may travel through a narrow loss valley</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">The centre represents lower loss. Each coloured path starts at the same point and illustrates a different update behaviour.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {landscapePaths.map((path) => (
          <div key={path.name} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <svg viewBox="0 0 280 220" className="w-full" role="img" aria-label={`Conceptual loss-landscape path for ${path.name}`}>
              <defs>
                <radialGradient id={`valley-${path.name.replace(/\W/g, "")}`} cx="59%" cy="84%" r="78%">
                  <stop offset="0%" stopColor="#dcfce7" />
                  <stop offset="36%" stopColor="#dbeafe" />
                  <stop offset="72%" stopColor="#ede9fe" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </radialGradient>
                <marker id={`arrow-${path.name.replace(/\W/g, "")}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <polygon points="0 0, 7 3.5, 0 7" fill={path.color} />
                </marker>
              </defs>
              <rect x="1" y="1" width="278" height="218" rx="14" fill={`url(#valley-${path.name.replace(/\W/g, "")})`} />
              {[0, 1, 2, 3].map((ring) => (
                <ellipse key={ring} cx="164" cy="185" rx={28 + ring * 32} ry={9 + ring * 23} fill="none" stroke={ring === 0 ? "#16a34a" : "#94a3b8"} strokeWidth={ring === 0 ? 2 : 1.2} opacity={0.85 - ring * 0.12} />
              ))}
              <text x="164" y="189" textAnchor="middle" fontSize="9" fontWeight="700" fill="#166534">LOW LOSS</text>
              <circle cx="35" cy="45" r="5" fill={path.color} />
              <text x="35" y="31" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">START</text>
              <path d={path.points} fill="none" stroke={path.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#arrow-${path.name.replace(/\W/g, "")})`} />
              <text x="12" y="209" fontSize="9" fill="#64748b">higher loss</text>
              <text x="268" y="209" textAnchor="end" fontSize="9" fill="#64748b">narrow valley</text>
            </svg>
            <p className="mt-2 font-bold" style={{ color: path.color }}>{path.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{path.summary}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <strong>Conceptual illustration:</strong> these are explanatory paths, not measured results or a promise that one optimizer will always converge faster. Real paths depend on the model, data, batch order and hyperparameters.
      </figcaption>
    </figure>
  );
}

type ScheduleKind = "constant" | "warmup" | "step" | "exponential" | "cosine" | "plateau" | "onecycle";

const scheduleMeta: Array<{ kind: ScheduleKind; name: string; description: string; cue: string }> = [
  { kind: "constant", name: "Constant", description: "Keeps the same rate from beginning to end.", cue: "A dependable baseline for short or already stable runs." },
  { kind: "warmup", name: "Warmup → cosine", description: "Rises gently, then follows a smooth cosine-shaped fall.", cue: "Useful when a large model is unstable at the start." },
  { kind: "step", name: "Step decay", description: "Drops by a chosen factor at fixed milestones.", cue: "Useful when the training recipe has known phase changes." },
  { kind: "exponential", name: "Exponential decay", description: "Multiplies the rate by a factor repeatedly.", cue: "A simple, smooth reduction throughout training." },
  { kind: "cosine", name: "Cosine decay", description: "Falls slowly at first and near the end, faster in the middle.", cue: "Common when the total training budget is known." },
  { kind: "plateau", name: "Reduce on plateau", description: "Waits for a monitored metric to stop improving, then drops.", cue: "Useful when you cannot predict the right milestone." },
  { kind: "onecycle", name: "One-cycle", description: "Rises to a peak and then falls to a very small rate.", cue: "Useful for a deliberately tuned, fixed-length run." },
];

function scheduleValue(kind: ScheduleKind, t: number) {
  if (kind === "constant") return 0.72;
  if (kind === "warmup") return t < 0.18 ? 0.12 + 3.45 * t : 0.08 + 0.68 * 0.5 * (1 + Math.cos(Math.PI * ((t - 0.18) / 0.82)));
  if (kind === "step") return t < 0.3 ? 0.82 : t < 0.62 ? 0.48 : t < 0.84 ? 0.25 : 0.12;
  if (kind === "exponential") return 0.82 * Math.exp(-2.25 * t) + 0.05;
  if (kind === "cosine") return 0.08 + 0.76 * 0.5 * (1 + Math.cos(Math.PI * t));
  if (kind === "plateau") return t < 0.36 ? 0.82 : t < 0.68 ? 0.43 : 0.2;
  return t < 0.28 ? 0.12 + (0.8 / 0.28) * t : 0.92 - 0.86 * ((t - 0.28) / 0.72);
}

function ScheduleGraph({ kind, name }: { kind: ScheduleKind; name: string }) {
  const left = 36;
  const right = 292;
  const top = 18;
  const bottom = 134;
  const points = Array.from({ length: 101 }, (_, index) => {
    const t = index / 100;
    const x = left + t * (right - left);
    const y = bottom - scheduleValue(kind, t) * (bottom - top);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 320 166" className="w-full" role="img" aria-label={`${name} learning-rate schedule graph`}>
      <rect width="320" height="166" rx="12" fill="#f8fafc" />
      {[0.25, 0.5, 0.75].map((v) => <line key={v} x1={left} x2={right} y1={bottom - v * (bottom - top)} y2={bottom - v * (bottom - top)} stroke="#e2e8f0" />)}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
      <line x1={left} x2={left} y1={top} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
      <path d={points} fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {kind === "warmup" && <><line x1="82" x2="82" y1="20" y2="134" stroke="#f59e0b" strokeDasharray="4 4" /><text x="82" y="15" textAnchor="middle" fontSize="9" fill="#92400e">warmup ends</text></>}
      {kind === "plateau" && <><text x="104" y="28" textAnchor="middle" fontSize="9" fill="#92400e">metric stalls</text><text x="191" y="72" textAnchor="middle" fontSize="9" fill="#92400e">stalls again</text></>}
      {kind === "onecycle" && <text x="108" y="15" textAnchor="middle" fontSize="9" fill="#92400e">maximum rate</text>}
      <text x="164" y="157" textAnchor="middle" fontSize="10" fill="#475569">training progress →</text>
      <text x="12" y="80" textAnchor="middle" fontSize="10" fill="#475569" transform="rotate(-90 12 80)">learning rate</text>
    </svg>
  );
}

const terminology = [
  ["Parameter (w)", "A number learned by the network, such as a weight or bias."],
  ["Gradient (g)", "The slope of the loss with respect to a parameter. Its sign gives a local direction; its size gives local steepness."],
  ["Learning rate (η)", "A multiplier that controls how large the update is."],
  ["Optimizer state", "Remembered values such as velocity or moving averages. Plain SGD has no extra state."],
  ["Step", "One parameter update, usually after one mini-batch."],
  ["Epoch", "One pass through the training dataset. An epoch normally contains many steps."],
  ["Weight decay (λ)", "A separate force that gently shrinks weights during training."],
  ["Epsilon (ε)", "A tiny positive number that prevents division by zero in adaptive methods."],
];

const optimizerRows = [
  ["Plain SGD", "Current gradient", "Lowest", "Transparent baseline; constrained optimizer memory", "May zigzag and often needs careful scheduling"],
  ["SGD + Momentum", "Gradient plus velocity", "One extra value per parameter", "Long, carefully tuned vision training; noisy narrow valleys", "Learning rate and momentum interact"],
  ["RMSProp", "Moving average of squared gradients", "One extra value per parameter", "Non-stationary or recurrent problems; uneven gradient scales", "Can need a different base rate from SGD"],
  ["Adam", "First and second moments", "Two extra values per parameter", "Fast baseline; sparse or differently scaled gradients", "Fast training loss is not proof of best validation quality"],
  ["AdamW", "Adam moments plus decoupled decay", "Two extra values per parameter", "Modern Transformer and general deep-learning baselines", "Weight decay and learning rate still require tuning"],
];

const schedulerRows = [
  ["Constant", "The run is short and stable, or you need a clean baseline", "Watch whether progress stalls before the budget ends"],
  ["Warmup + cosine", "The start is fragile and the total number of steps is known", "Choose both warmup duration and final rate"],
  ["Step / multi-step", "A proven recipe specifies milestone epochs", "Fixed dates ignore what validation is actually doing"],
  ["Exponential", "You want a steady proportional decrease", "Too much decay can freeze learning early"],
  ["Reduce on plateau", "You want validation performance to trigger the drop", "Noisy metrics need suitable patience and threshold"],
  ["One-cycle", "You can tune a fixed-length run and maximum safe rate", "It is not a drop-in cure for an unstable pipeline"],
];

export function OptimizersContent() {
  return (
    <div className="space-y-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">Deep Learning · Beginner Tutorial</p>
        <p className="mb-0 text-lg leading-relaxed text-slate-600">
          A neural network learns by changing its weights. Backpropagation tells us how the loss responds to each weight; an <strong>optimizer</strong> decides the actual change to make. This lesson follows one weight through SGD, Momentum, RMSProp, Adam and AdamW, then shows how a learning-rate schedule changes the size of those updates over time.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What Does an Optimizer Actually Do?</h2>
        <p className="text-lg leading-relaxed">
          Imagine a network predicts that a used car is worth ₹7 lakh when the correct price is ₹8 lakh. The loss function converts that mistake into a number. Backpropagation then calculates a gradient for every weight: it estimates whether increasing or decreasing that weight would reduce the loss near the network’s current position.
        </p>
        <p className="text-lg leading-relaxed">
          That calculation does not change the network by itself. The optimizer receives the gradients and turns them into updates. A simple optimizer uses only the newest gradient. More advanced optimizers remember earlier gradients, track their typical size, or apply weight decay. The goal is the same in every case: move the parameters toward values that produce a lower loss.
        </p>
        <UpdatePipelineFigure />
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <p className="font-bold text-blue-900">Backpropagation asks</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">“For this mini-batch, how did each weight influence the loss?” Its output is a collection of gradients.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold text-amber-900">The optimizer asks</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">“Given those gradients and anything I remember from earlier steps, how much should each weight change now?”</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Two Ingredients in the First Update Rule</h2>
        <p className="text-lg leading-relaxed">
          We begin with one learned weight, written as <strong>w</strong>. Backpropagation gives its gradient, written as <strong>g</strong>. To reduce the loss, we move in the opposite direction from that gradient. The learning rate, written as the Greek letter <strong>η</strong> (eta), controls how large the move will be.
        </p>
        <FormulaBox
          label="Plain gradient-descent update"
          formula={<span>w<sub>new</sub> = w<sub>old</sub> − ηg</span>}
          explanation={<><strong className="text-white">Read it aloud:</strong> the new weight equals the old weight minus the learning rate multiplied by the gradient. If g is positive, w decreases. If g is negative, subtracting it makes w increase.</>}
        />
        <div className="not-prose mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {terminology.map(([term, meaning]) => (
            <div key={term} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-bold text-indigo-800">{term}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{meaning}</p>
            </div>
          ))}
        </div>
        <div className="not-prose mt-5 rounded-xl border border-rose-200 bg-rose-50 p-5">
          <p className="font-bold text-rose-900">The gradient is not the update.</p>
          <p className="mt-1 text-sm leading-relaxed text-rose-900">A gradient of 1.5 does not mean “subtract 1.5.” With η = 0.1, plain SGD subtracts only 0.15. Optimizers and learning-rate schedules can change that conversion further.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">First Method: Stochastic Gradient Descent (SGD)</h2>
        <p className="text-lg leading-relaxed">
          In deep-learning code, SGD normally updates the model using the average gradient from one <strong>mini-batch</strong>, perhaps 32 or 128 examples. Because different mini-batches contain different examples, their gradients vary. That randomness can make the path noisy, which is why the method is called stochastic.
        </p>
        <div className="not-prose grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <FormulaBox
            label="SGD"
            formula={<span>w<sub>t</sub> = w<sub>t−1</sub> − ηg<sub>t</sub></span>}
            explanation={<>The subscript <strong className="text-white">t</strong> means the current training step. SGD uses g<sub>t</sub>, the current mini-batch gradient, and remembers no earlier gradient.</>}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">Worked numerical example</p>
            <p className="mt-2 font-bold text-slate-900">Start with w = 4.00, gradient g = 1.50 and learning rate η = 0.10.</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">These are deliberately simple teaching values. In a real run, <strong>w</strong> began from initialization and has already been changed by training, <strong>g</strong> is calculated by backpropagation from the current mini-batch, and <strong>η</strong> is a developer-chosen hyperparameter.</p>
            <div className="mt-4 space-y-2 font-mono text-sm text-slate-700">
              <p className="rounded-lg bg-slate-50 p-3">update = ηg = 0.10 × 1.50 = 0.15</p>
              <p className="rounded-lg bg-slate-50 p-3">w<sub>new</sub> = 4.00 − 0.15 = <strong className="text-indigo-700">3.85</strong></p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>Interpretation:</strong> the positive gradient says the loss rises when w rises nearby, so the optimizer moves w downward. The learning rate limits the move to 0.15.</p>
          </div>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-900">Why people still use SGD</p><p className="mt-2 text-sm leading-relaxed text-slate-700">It is easy to reason about, stores little optimizer state and can produce excellent models when momentum and a schedule are carefully tuned.</p></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-900">Where plain SGD struggles</p><p className="mt-2 text-sm leading-relaxed text-slate-700">A single base learning rate treats every parameter alike. In a narrow valley, updates may cross the steep direction repeatedly instead of moving smoothly along the valley.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Why SGD Can Zigzag</h2>
        <p className="text-lg leading-relaxed">
          A neural network’s loss is a surface over millions of parameter directions. Consider a narrow valley: the walls are steep from side to side, but the floor slopes gently toward lower loss. The gradient is dominated by the steep wall. Plain SGD therefore makes a large sideways correction, lands near the opposite wall, and then receives a gradient pointing back. It can keep bouncing even while slowly moving forward.
        </p>
        <LossLandscapeFigure />
        <p className="text-lg leading-relaxed">
          Momentum and Adam are not alternative ways to calculate the loss. They are alternative ways to process gradients. Momentum remembers direction; RMSProp remembers gradient size; Adam remembers both.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Momentum: Remember the Recent Direction</h2>
        <p className="text-lg leading-relaxed">
          A ball rolling downhill does not forget its movement at every centimetre. Momentum gives an optimizer a similar memory called <strong>velocity</strong>. Gradients that repeatedly point in the same direction build velocity. Gradients that alternate—left, right, left, right—partly cancel inside that memory, reducing sideways oscillation.
        </p>
        <FormulaBox
          label="SGD with momentum"
          formula={<div><p>v<sub>t</sub> = βv<sub>t−1</sub> + g<sub>t</sub></p><p>w<sub>t</sub> = w<sub>t−1</sub> − ηv<sub>t</sub></p></div>}
          explanation={<><strong className="text-white">v</strong> is velocity and <strong className="text-white">β</strong> (beta) controls how much earlier velocity remains. With β = 0.9, 90% of the previous velocity is carried into the new calculation. Some books use an equivalent rescaled convention, so formulas can look slightly different.</>}
        />
        <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <p className="font-bold text-slate-900">Continue the same example for two steps</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Velocity starts at v₀ = 0 because there is no earlier gradient. We choose β = 0.9 and η = 0.10; backpropagation supplies g₁ = 1.50 for the first batch and g₂ = 1.00 for the next batch.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-indigo-50 p-4">
              <p className="text-xs font-extrabold uppercase text-indigo-700">Step 1</p>
              <p className="mt-2 font-mono text-sm leading-7 text-slate-700">v₀ = 0, g₁ = 1.50<br />v₁ = 0.9(0) + 1.50 = 1.50<br />w₁ = 4.00 − 0.10(1.50) = <strong>3.85</strong></p>
            </div>
            <div className="rounded-xl bg-violet-50 p-4">
              <p className="text-xs font-extrabold uppercase text-violet-700">Step 2</p>
              <p className="mt-2 font-mono text-sm leading-7 text-slate-700">g₂ = 1.00<br />v₂ = 0.9(1.50) + 1.00 = 2.35<br />w₂ = 3.85 − 0.10(2.35) = <strong>3.615</strong></p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>What the memory changed:</strong> plain SGD would use only g₂ and move by 0.10 at step 2. Momentum sees that both gradients point in the same direction, so its stored velocity makes a larger 0.235 move. If the next gradient points the other way, part of it first cancels the velocity.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">RMSProp: Adjust for Recent Gradient Size</h2>
        <p className="text-lg leading-relaxed">
          Different weights can have gradients on very different scales. A single learning rate may be too aggressive for a parameter with repeatedly large gradients and too cautious for another with small gradients. RMSProp keeps an exponential moving average of each parameter’s <strong>squared gradients</strong>. It divides the current gradient by the root of that average, creating a different effective step scale for each parameter.
        </p>
        <FormulaBox
          label="RMSProp"
          formula={<div><p>s<sub>t</sub> = ρs<sub>t−1</sub> + (1 − ρ)g<sub>t</sub><sup>2</sup></p><p>w<sub>t</sub> = w<sub>t−1</sub> − η · g<sub>t</sub> / (√s<sub>t</sub> + ε)</p></div>}
          explanation={<><strong className="text-white">s</strong> remembers recent squared-gradient size; <strong className="text-white">ρ</strong> controls that memory. Squaring removes the sign and makes large gradients stand out. The square root returns the scale to gradient units, while ε prevents division by zero.</>}
        />
        <div className="not-prose mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <p className="font-bold text-slate-900">Use w = 4.00 and g = 1.50 again</p>
            <p className="mt-2 text-sm text-slate-600">Suppose the optimizer&apos;s earlier squared-gradient calculations stored s<sub>previous</sub> = 2.25. The developer chooses ρ = 0.9 and η = 0.1; backpropagation supplies g = 1.50. Frameworks add a tiny ε by default to prevent division by zero, but it is too small to affect these rounded values.</p>
            <div className="mt-4 space-y-2 font-mono text-sm text-slate-700">
              <p className="rounded-lg bg-slate-50 p-3">s = 0.9(2.25) + 0.1(1.50²) = 2.25</p>
              <p className="rounded-lg bg-slate-50 p-3">scaled gradient = 1.50 / √2.25 = 1.00</p>
              <p className="rounded-lg bg-slate-50 p-3">w<sub>new</sub> = 4.00 − 0.10(1.00) = <strong className="text-indigo-700">3.90</strong></p>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 md:p-6">
            <p className="font-bold text-cyan-900">How to interpret 3.90</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">The raw gradient was 1.50, but its recent root-mean-square size was also 1.50. RMSProp normalized it to 1.00 before applying η.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">This does <strong>not</strong> mean RMSProp always makes smaller updates. A parameter with unusually small recent gradients can receive a relatively larger effective step.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Adam: Combine Direction Memory and Size Memory</h2>
        <p className="text-lg leading-relaxed">
          Adam stands for <strong>Adaptive Moment Estimation</strong>. It keeps a first moving average, <strong>m</strong>, that summarizes gradient direction like momentum. It also keeps a second moving average, <strong>v</strong>, of squared gradients like RMSProp. The update uses m for direction and divides by √v to adapt the scale separately for every parameter.
        </p>
        <FormulaBox
          label="Adam in four calculations"
          formula={<div className="space-y-1"><p>m<sub>t</sub> = β₁m<sub>t−1</sub> + (1 − β₁)g<sub>t</sub></p><p>v<sub>t</sub> = β₂v<sub>t−1</sub> + (1 − β₂)g<sub>t</sub><sup>2</sup></p><p>m̂<sub>t</sub> = m<sub>t</sub> / (1 − β₁<sup>t</sup>), &nbsp; v̂<sub>t</sub> = v<sub>t</sub> / (1 − β₂<sup>t</sup>)</p><p>w<sub>t</sub> = w<sub>t−1</sub> − η · m̂<sub>t</sub> / (√v̂<sub>t</sub> + ε)</p></div>}
          explanation={<>The hats mark <strong className="text-white">bias-corrected</strong> values. Because m and v start at zero, their early averages are pulled toward zero. Dividing by 1 − β<sup>t</sup> corrects that startup effect.</>}
        />
        <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <p className="font-bold text-slate-900">Adam’s first update for the same w = 4.00 and g = 1.50</p>
          <p className="mt-1 text-sm text-slate-600">The optimizer initializes its memories m₀ and v₀ to zero because no gradients have arrived. We choose β₁ = 0.9, β₂ = 0.999 and η = 0.1 for this demonstration; PyTorch uses the same beta values as Adam defaults, while the learning rate here is deliberately larger so the arithmetic stays visible. We omit ε only in the rounded hand calculation.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <p className="rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-700">m₁ = 0.9(0) + 0.1(1.50) = 0.15</p>
            <p className="rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-700">v₁ = 0.999(0) + 0.001(1.50²) = 0.00225</p>
            <p className="rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-700">m̂₁ = 0.15 / (1 − 0.9) = 1.50</p>
            <p className="rounded-lg bg-slate-50 p-3 font-mono text-sm text-slate-700">v̂₁ = 0.00225 / (1 − 0.999) = 2.25</p>
          </div>
          <p className="mt-4 rounded-xl bg-indigo-50 p-4 font-mono text-sm text-slate-800">update = 0.10 × 1.50 / √2.25 = 0.10<br />w₁ = 4.00 − 0.10 = <strong className="text-indigo-700">3.90</strong></p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>What this number teaches:</strong> on the first idealized step, bias correction recovers the raw first and second moments, so the gradient magnitude largely cancels and the step is close to η. Later steps depend on the accumulated history. This example explains the mechanism; it is not a claim that Adam always moves every weight by exactly η.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">AdamW: Keep Weight Decay Separate</h2>
        <p className="text-lg leading-relaxed">
          Weight decay discourages weights from growing unnecessarily large. With adaptive optimizers, adding an L2 penalty to the loss and letting Adam process its gradient is not generally the same as shrinking the weights directly. AdamW <strong>decouples</strong> the two actions: it performs Adam’s gradient-based update and applies a separate weight-shrinking step.
        </p>
        <FormulaBox
          label="Conceptual AdamW update"
          formula={<span>w<sub>t</sub> = (1 − ηλ)w<sub>t−1</sub> − η · m̂<sub>t</sub> / (√v̂<sub>t</sub> + ε)</span>}
          explanation={<><strong className="text-white">λ</strong> (lambda) is the weight-decay coefficient. The first term shrinks the old weight; the second is the adaptive Adam update. Implementations can differ in ordering details, but the defining idea is that decay is not mixed into Adam’s moment estimates.</>}
        />
        <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <p className="font-bold text-slate-900">Add λ = 0.01 to Adam’s worked example</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">The old weight 4.00 and Adam update 0.10 come from the continuing example. The developer chooses weight-decay coefficient λ = 0.01; it is not inferred by Adam and should be compared on validation data.</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <p className="rounded-lg bg-slate-50 p-3 text-sm"><strong>Decay factor</strong><br /><span className="font-mono">1 − 0.10(0.01) = 0.999</span></p>
            <p className="rounded-lg bg-slate-50 p-3 text-sm"><strong>Shrunk weight</strong><br /><span className="font-mono">0.999 × 4.00 = 3.996</span></p>
            <p className="rounded-lg bg-indigo-50 p-3 text-sm"><strong>Then Adam update</strong><br /><span className="font-mono">3.996 − 0.10 = <strong>3.896</strong></span></p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">AdamW is a strong modern starting point, especially for Transformer-style models, but “W” does not make tuning automatic. A decay that is too strong can underfit, and parameters such as biases and normalization scales are often placed in a no-decay parameter group.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Choosing an Optimizer for a Real Project</h2>
        <p className="text-lg leading-relaxed">There is no optimizer that wins every dataset, architecture and training budget. Begin with a sensible baseline, keep the model and split fixed, and compare validation quality, training time and memory—not just how quickly training loss falls.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Method</th><th className="p-3 text-left">What it remembers</th><th className="p-3 text-left">Extra state</th><th className="p-3 text-left">Good reason to try it</th><th className="p-3 text-left">Important caution</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {optimizerRows.map(([method, memory, state, use, caution]) => <tr key={method} className="align-top"><td className="p-3 font-bold text-indigo-700">{method}</td><td className="p-3 text-slate-700">{memory}</td><td className="p-3 text-slate-700">{state}</td><td className="p-3 text-slate-700">{use}</td><td className="p-3 text-amber-900">{caution}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          {[
            ["You need a working baseline quickly", "Start with AdamW or Adam. Verify that the loss falls, then tune the learning rate and compare alternatives if final quality justifies the work."],
            ["You are training a CNN for many epochs", "Compare SGD with momentum and AdamW under a fair schedule. Momentum SGD can be strong when the recipe is carefully tuned."],
            ["Gradients are sparse or vary greatly by parameter", "Try Adam or AdamW because their per-parameter moment estimates adapt update scales."],
            ["Optimizer memory is the bottleneck", "Plain SGD stores the least extra state; Momentum adds one state value per parameter, while Adam-family methods normally add two."],
          ].map(([situation, advice]) => <div key={situation} className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-bold text-slate-900">{situation}</p><p className="mt-2 text-sm leading-relaxed text-slate-600">{advice}</p></div>)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Why Change the Learning Rate During Training?</h2>
        <p className="text-lg leading-relaxed">
          The best step size near the start may be unsuitable near the end. Early in training, the weights are usually far from a useful solution, so larger updates can make rapid progress. Later, a smaller rate can refine the weights without repeatedly jumping across a low-loss region. A <strong>learning-rate scheduler</strong> changes η according to training time or a measured result.
        </p>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-900">Too high</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Loss can oscillate, explode or become NaN because updates overshoot useful regions.</p></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-900">Too low</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Loss changes very slowly, making a correct pipeline look broken and wasting the training budget.</p></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-900">Changed deliberately</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Warmup stabilizes the start; decay makes later updates more precise; metric-driven schedules react to a plateau.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Seven Learning-Rate Patterns at a Glance</h2>
        <p className="text-lg leading-relaxed">Read each graph from left to right. The horizontal axis is training progress; the vertical axis is the learning rate. The shapes are original illustrative curves shown on a common scale so their behaviour is easy to compare.</p>
        <div className="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {scheduleMeta.map((schedule) => (
            <figure key={schedule.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <ScheduleGraph kind={schedule.kind} name={schedule.name} />
              <figcaption className="border-t border-slate-100 p-4">
                <p className="font-bold text-indigo-800">{schedule.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{schedule.description}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">When it fits: {schedule.cue}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Warmup, Decay and Metric-Driven Changes</h2>
        <div className="space-y-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h3 className="mt-0 text-xl font-bold text-slate-900">Warmup protects the fragile beginning</h3>
            <p className="text-lg leading-relaxed">Warmup starts below the intended peak rate and increases over the first set of steps. At the beginning, optimizer moments, normalization statistics and activations are not yet settled. A full-size update can be disruptive, especially with large batches or large Transformer-style models.</p>
            <div className="not-prose rounded-xl bg-indigo-50 p-4 font-mono text-sm text-indigo-950">linear warmup: η<sub>t</sub> = η<sub>max</sub> × t / T<sub>warmup</sub>, for t ≤ T<sub>warmup</sub></div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600"><strong>Where the values come from:</strong> t is the current step counted by the scheduler; T<sub>warmup</sub> and η<sub>max</sub> are developer choices. <strong>Meaning:</strong> halfway through warmup, the rate is halfway to η<sub>max</sub>. Warmup is a short opening phase, not a replacement for the schedule that follows.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h3 className="mt-0 text-xl font-bold text-slate-900">Decay changes from exploration to refinement</h3>
            <p className="text-lg leading-relaxed">Step, exponential and cosine schedules all reduce the learning rate, but they answer “when?” differently. Step decay makes abrupt changes at milestones. Exponential decay shrinks by the same proportion repeatedly. Cosine decay uses the known training horizon to make a smooth transition toward a chosen minimum.</p>
            <div className="not-prose grid gap-3 md:grid-cols-3">
              <p className="rounded-xl bg-slate-50 p-4 font-mono text-sm">Step:<br />η<sub>t</sub> = η₀γ<sup>⌊t/s⌋</sup></p>
              <p className="rounded-xl bg-slate-50 p-4 font-mono text-sm">Exponential:<br />η<sub>t</sub> = η₀γ<sup>t</sup></p>
              <p className="rounded-xl bg-slate-50 p-4 font-mono text-sm">Cosine:<br />η<sub>t</sub> = η<sub>min</sub> + ½(η<sub>max</sub>−η<sub>min</sub>)(1+cos(πt/T))</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Here γ is a multiplier below 1, s is the step interval, and T is the planned schedule length. Decaying too soon can stop learning before useful features form.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h3 className="mt-0 text-xl font-bold text-slate-900">Reduce on plateau listens to validation performance</h3>
            <p className="text-lg leading-relaxed">Instead of using fixed dates, this scheduler monitors a metric such as validation loss. It tracks checks that do not improve beyond the configured threshold. Once the allowed <strong>patience</strong> has been exceeded, it multiplies the learning rate by a reduction factor. It should receive the validation metric after validation finishes.</p>
            <div className="not-prose grid gap-3 md:grid-cols-3"><p className="rounded-xl bg-slate-50 p-4 text-sm"><strong>Patience</strong><br />How many non-improving checks the scheduler tolerates before a later bad check triggers a reduction.</p><p className="rounded-xl bg-slate-50 p-4 text-sm"><strong>Threshold</strong><br />How much change counts as real improvement.</p><p className="rounded-xl bg-slate-50 p-4 text-sm"><strong>Factor</strong><br />How strongly to reduce the rate.</p></div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">A noisy metric with patience set too low can cause premature drops. Smooth evidence and domain-appropriate patience matter more than reacting to one bad epoch.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            <h3 className="mt-0 text-xl font-bold text-slate-900">One-cycle deliberately rises before it falls</h3>
            <p className="text-lg leading-relaxed">One-cycle is a finite training policy rather than ordinary monotonic decay. It begins below the maximum rate, rises to that peak, then falls—often below the starting rate. The increasing phase allows larger exploratory updates; the long decreasing phase refines the solution. Because the maximum rate and total number of steps are central to the policy, it should be tuned as a complete recipe.</p>
          </article>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Which Schedule Fits Which Situation?</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-[820px] w-full text-sm">
            <thead className="bg-indigo-700 text-white"><tr><th className="p-3 text-left">Schedule</th><th className="p-3 text-left">Choose it when…</th><th className="p-3 text-left">Check before trusting it</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {schedulerRows.map(([schedule, situation, check]) => <tr key={schedule} className="align-top"><td className="p-3 font-bold text-indigo-700">{schedule}</td><td className="p-3 text-slate-700">{situation}</td><td className="p-3 text-amber-900">{check}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-bold text-indigo-950">A practical beginner decision</p>
          <p className="mt-2 text-sm leading-relaxed text-indigo-950">For a fixed-length run, AdamW with warmup followed by cosine decay is a reasonable modern baseline. For a small project with an uncertain stopping time, AdamW plus ReduceLROnPlateau is easier to relate to observed validation progress. These are starting experiments, not universal defaults.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Putting the Optimizer and Scheduler Into a Training Loop</h2>
        <p className="text-lg leading-relaxed">The optimizer must update the parameters before most PyTorch schedulers advance. ReduceLROnPlateau is different: it steps after validation and receives the monitored metric.</p>
        <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">pytorch_optimizer_and_schedule.py</div>
          <pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`import torch

# AdamW keeps gradient adaptation and weight decay separate.
optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=3e-4,
    betas=(0.9, 0.999),
    weight_decay=1e-2,
)

# Warm up for 3 epochs, then decay through the remaining 27.
warmup = torch.optim.lr_scheduler.LinearLR(
    optimizer, start_factor=0.1, end_factor=1.0, total_iters=3
)
cosine = torch.optim.lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=27, eta_min=1e-6
)
scheduler = torch.optim.lr_scheduler.SequentialLR(
    optimizer, schedulers=[warmup, cosine], milestones=[3]
)

for epoch in range(30):
    model.train()
    for inputs, targets in train_loader:
        optimizer.zero_grad()       # remove gradients from the last batch
        predictions = model(inputs) # forward pass
        loss = loss_fn(predictions, targets)
        loss.backward()             # calculate current gradients
        optimizer.step()            # use gradients to update weights

    validate(model, validation_loader)
    scheduler.step()                # advance after optimizer updates
    print("learning rate:", scheduler.get_last_lr()[0])`}</pre>
        </div>
        <div className="not-prose mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">metric_driven_alternative.py</div>
          <pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`plateau = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode="min", factor=0.2, patience=3
)

for epoch in range(30):
    train_one_epoch(model, train_loader, optimizer)
    validation_loss = validate(model, validation_loader)
    plateau.step(validation_loss)  # step AFTER measuring validation loss`}</pre>
        </div>
        <div className="not-prose mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6">
          <p className="font-bold text-indigo-950">Where the code&apos;s schedule values come from</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">This example plans <strong>30 epochs</strong>: the developer assigns the first <strong>3</strong> to linear warmup and the remaining <strong>27</strong> to cosine decay. <code>start_factor=0.1</code> begins at 10% of the base rate 3e−4, so the first scheduled rate is about 3e−5; <code>end_factor=1.0</code> reaches the base rate. <code>eta_min=1e-6</code> is the chosen final floor. In the alternative, <code>factor=0.2</code> makes the rate one fifth as large once the allowed patience has been exceeded; <code>patience=3</code> does not mean “reduce on exactly the third bad check.”</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700"><code>AdamW</code> creates two moment buffers per trainable parameter and applies decay separately. <code>SequentialLR</code> switches schedulers at milestone 3. <code>scheduler.step()</code> advances the time-based schedule; <code>plateau.step(validation_loss)</code> instead needs the newly measured validation result before deciding whether to reduce the rate.</p>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-bold text-slate-900">Why zero gradients?</p><p className="mt-1 text-sm leading-relaxed text-slate-600">PyTorch accumulates them by default. Without clearing, the optimizer may use unintended sums from earlier batches.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-bold text-slate-900">Why save optimizer state?</p><p className="mt-1 text-sm leading-relaxed text-slate-600">Momentum, RMSProp and Adam remember history. Restoring only model weights does not truly resume the same training run.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-bold text-slate-900">Why log the rate?</p><p className="mt-1 text-sm leading-relaxed text-slate-600">A wrong scheduler order or milestone becomes visible when you plot learning rate beside training and validation loss.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Diagnose the Symptom Before Switching Methods</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">What you observe</th><th className="p-3 text-left">Likely explanations</th><th className="p-3 text-left">Useful next checks</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                ["Loss jumps wildly or becomes NaN", "Learning rate too high, exploding gradients, unstable input scale or invalid arithmetic", "Lower the rate; inspect inputs and gradients; add clipping only after finding the cause"],
                ["Loss falls, but extremely slowly", "Learning rate too low, saturated activations, poor initialization or frozen parameters", "Try a modestly higher rate; inspect gradient norms and requires_grad settings"],
                ["Training loss falls while validation worsens", "Overfitting—not automatically an optimizer failure", "Use regularization, more data or early stopping; compare models on validation"],
                ["Progress stops immediately after a schedule change", "Decay happened too early or the factor was too severe", "Plot the actual rate; delay the milestone or use gentler decay"],
                ["ReduceLROnPlateau drops constantly", "Noisy metric, low patience or overly strict threshold", "Monitor validation loss correctly; increase patience; verify mode='min'"],
                ["A resumed run behaves differently", "Optimizer or scheduler state was not restored", "Checkpoint model, optimizer, scheduler, epoch and random-state information"],
              ].map(([symptom, causes, checks]) => <tr key={symptom} className="align-top"><td className="p-3 font-bold text-slate-900">{symptom}</td><td className="p-3 text-slate-700">{causes}</td><td className="p-3 text-indigo-800">{checks}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-bold text-amber-900">Fair comparisons require more than changing one class name.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">SGD, RMSProp and Adam often need different learning-rate ranges. Compare them with the same data split, initialization policy, number of updates and validation metric, but give each a reasonable learning-rate search. Otherwise the experiment compares hyperparameter luck rather than optimizers.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What to Remember</h2>
        <div className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <ul className="m-0 space-y-2 pl-5 text-indigo-950">
            <li>Backpropagation calculates gradients; the optimizer converts them into parameter updates.</li>
            <li>Plain SGD uses the current mini-batch gradient. Momentum remembers direction.</li>
            <li>RMSProp remembers squared-gradient size. Adam combines direction and size memories with early-step bias correction.</li>
            <li>AdamW applies weight decay separately from Adam’s adaptive moment calculation.</li>
            <li>The learning rate controls update scale; a schedule changes that scale across training.</li>
            <li>Warmup stabilizes the beginning, decay supports later refinement, and plateau scheduling reacts to validation progress.</li>
            <li>Choose by controlled validation experiments, runtime and memory—not by optimizer popularity alone.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Continue Learning</h2>
        <div className="not-prose mb-10 grid gap-4 md:grid-cols-2">
          <a href="/learn/neural-network-training-loop" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Previous concept</p><p className="m-0 font-bold text-slate-900">Training and Debugging a Neural Network</p></a>
          <a href="/learn/weight-initialization" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Next concept</p><p className="m-0 font-bold text-slate-900">Initialization, Normalization and Stable Gradients</p></a>
        </div>
      </section>
    </div>
  );
}
