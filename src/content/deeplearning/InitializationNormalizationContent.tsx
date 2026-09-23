import React from "react";

function DarkFormula({
  title,
  children,
  note,
}: {
  title: string;
  children: React.ReactNode;
  note: React.ReactNode;
}) {
  return (
    <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">{title}</p>
      <div className="overflow-x-auto font-mono text-lg font-bold leading-relaxed md:text-xl">{children}</div>
      <div className="mt-3 text-sm leading-relaxed text-slate-200">{note}</div>
    </div>
  );
}

function SignalScaleFigure() {
  const rows = [
    {
      label: "Weights too small",
      color: "#f59e0b",
      values: [72, 54, 38, 25, 15, 8],
      note: "The signal fades before it reaches the last layer.",
    },
    {
      label: "Well-scaled start",
      color: "#16a34a",
      values: [55, 57, 52, 58, 54, 56],
      note: "The signal stays in a useful range through the network.",
    },
    {
      label: "Weights too large",
      color: "#ef4444",
      values: [24, 35, 49, 67, 85, 100],
      note: "The signal grows and may produce unstable values.",
    },
  ];

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">What happens when a signal crosses many layers?</p>
        <p className="mt-1 text-sm text-slate-600">Bar height represents the relative size of activations. All three examples begin before learning.</p>
      </div>
      <div className="space-y-6 p-5 md:p-6">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-3 lg:grid-cols-[170px_1fr_250px] lg:items-center">
            <div>
              <p className="font-bold text-slate-900">{row.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 lg:hidden">{row.note}</p>
            </div>
            <div className="flex h-28 items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 pt-4">
              {row.values.map((height, index) => (
                <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                  <span className="text-[10px] font-bold text-slate-500">L{index + 1}</span>
                  <div className="w-full max-w-12 rounded-t-md" style={{ height: `${Math.max(9, height * 0.72)}%`, backgroundColor: row.color }} />
                </div>
              ))}
            </div>
            <p className="hidden text-sm leading-relaxed text-slate-600 lg:block">{row.note}</p>
          </div>
        ))}
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-xs leading-relaxed text-slate-500">Conceptual illustration. Real activation distributions depend on the inputs, architecture, activation functions and the sampled weights.</figcaption>
    </figure>
  );
}

function SymmetryFigure() {
  const neuron = (x: number, y: number, label: string, color: string) => (
    <g key={`${x}-${y}-${label}`}>
      <circle cx={x} cy={y} r="25" fill={color} stroke="#475569" strokeWidth="1.5" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">{label}</text>
    </g>
  );
  return (
    <figure className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <p className="mb-4 text-lg font-bold text-slate-900">Why identical hidden weights fail to create different learners</p>
      <svg viewBox="0 0 760 290" className="w-full" role="img" aria-label="Comparison of identical and random hidden-neuron initialization">
        <defs>
          <marker id="sym-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7 3.5, 0 7" fill="#64748b" /></marker>
        </defs>
        <rect x="1" y="1" width="365" height="288" rx="16" fill="#fff7ed" stroke="#fed7aa" />
        <rect x="394" y="1" width="365" height="288" rx="16" fill="#ecfdf5" stroke="#a7f3d0" />
        <text x="183" y="29" textAnchor="middle" fontSize="15" fontWeight="800" fill="#9a3412">All hidden weights identical</text>
        <text x="576" y="29" textAnchor="middle" fontSize="15" fontWeight="800" fill="#166534">Small random hidden weights</text>
        {[70, 145, 220].map((y, i) => <React.Fragment key={`left-${y}`}>
          <line x1="78" y1="145" x2="165" y2={y} stroke="#94a3b8" markerEnd="url(#sym-arrow)" />
          <line x1="215" y1={y} x2="305" y2="145" stroke="#94a3b8" markerEnd="url(#sym-arrow)" />
          {neuron(190, y, `w = 0`, "#fed7aa")}
        </React.Fragment>)}
        {neuron(55, 145, "input", "#dbeafe")}{neuron(330, 145, "output", "#f1f5f9")}
        <text x="183" y="267" textAnchor="middle" fontSize="11" fill="#9a3412">same output → same gradient → same feature</text>
        {[70, 145, 220].map((y, i) => <React.Fragment key={`right-${y}`}>
          <line x1="470" y1="145" x2="557" y2={y} stroke="#94a3b8" markerEnd="url(#sym-arrow)" />
          <line x1="607" y1={y} x2="697" y2="145" stroke="#94a3b8" markerEnd="url(#sym-arrow)" />
          {neuron(582, y, ["w = .08", "w = −.03", "w = .11"][i], ["#bbf7d0", "#a7f3d0", "#86efac"][i])}
        </React.Fragment>)}
        {neuron(447, 145, "input", "#dbeafe")}{neuron(722, 145, "output", "#f1f5f9")}
        <text x="576" y="267" textAnchor="middle" fontSize="11" fill="#166534">different outputs → different gradients → different features</text>
      </svg>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate-600"><strong>Read left to right:</strong> if hidden neurons start with identical incoming weights, they remain copies under ordinary gradient updates. Randomness breaks that symmetry; variance scaling then keeps the random values from being too weak or too strong.</figcaption>
    </figure>
  );
}

type NormKind = "batch" | "layer" | "instance" | "group";

const normPanels: Array<{ kind: NormKind; name: string; subtitle: string; color: string }> = [
  { kind: "batch", name: "Batch Normalization", subtitle: "same channel across examples and spatial positions", color: "#2563eb" },
  { kind: "layer", name: "Layer Normalization", subtitle: "features within one example/token", color: "#7c3aed" },
  { kind: "instance", name: "Instance Normalization", subtitle: "one channel inside one image", color: "#059669" },
  { kind: "group", name: "Group Normalization", subtitle: "a group of channels inside one image", color: "#ea580c" },
];

function NormalizationAxesFigure() {
  return (
    <figure className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <p className="text-lg font-bold text-slate-900">The formula is similar; the selected group of values is different</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">Each mini-grid represents a tensor with examples as rows and features or channels as columns. Coloured cells contribute to one mean and variance calculation.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {normPanels.map((panel) => (
          <div key={panel.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-start justify-between gap-3"><div><p className="font-bold" style={{ color: panel.color }}>{panel.name}</p><p className="mt-1 text-xs leading-relaxed text-slate-600">{panel.subtitle}</p></div><span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500">one statistics group</span></div>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }, (_, index) => {
                const row = Math.floor(index / 4);
                const col = index % 4;
                const selected = panel.kind === "batch" ? col === 1 : panel.kind === "layer" ? row === 1 : panel.kind === "instance" ? row === 1 && col === 1 : row === 1 && col < 2;
                return <div key={index} className="flex h-8 items-center justify-center rounded text-[10px] font-bold" style={{ backgroundColor: selected ? panel.color : "#e2e8f0", color: selected ? "white" : "#64748b" }}>{`x${row + 1}${col + 1}`}</div>;
              })}
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-500"><span>rows: examples</span><span>columns: features/channels</span></div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-sm leading-relaxed text-indigo-950">Real convolution tensors also contain height and width, and framework APIs specify exact axes. The coloured selection gives the core intuition: BatchNorm depends on other examples in the mini-batch; LayerNorm, InstanceNorm and GroupNorm calculate statistics within each example.</figcaption>
    </figure>
  );
}

function BatchNormModesFigure() {
  return (
    <figure className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-4 text-lg font-bold text-slate-900">BatchNorm behaves differently during training and inference</p>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">model.train()</p>
          <p className="mt-2 font-bold text-slate-900">Use this mini-batch’s mean and variance</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Also update running averages that summarize training batches.</p>
          <div className="mt-3 rounded-lg bg-white p-3 text-center font-mono text-sm">batch values → μ<sub>B</sub>, σ²<sub>B</sub> → normalized values</div>
        </div>
        <div className="flex items-center justify-center text-2xl font-bold text-indigo-400">→</div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-700">model.eval()</p>
          <p className="mt-2 font-bold text-slate-900">Use saved running mean and variance</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">One production example should not depend on whichever examples happen to arrive beside it.</p>
          <div className="mt-3 rounded-lg bg-white p-3 text-center font-mono text-sm">new value + running μ, σ² → normalized value</div>
        </div>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-slate-600">Calling <code>torch.no_grad()</code> does not switch BatchNorm to inference behaviour; call <code>model.eval()</code> as well.</figcaption>
    </figure>
  );
}

const initChoices = [
  ["ReLU or Leaky ReLU hidden layers", "He/Kaiming", "Accounts for the signal loss caused when ReLU sets negative values to zero."],
  ["Tanh hidden layers", "Xavier/Glorot", "Balances fan-in and fan-out to keep forward and backward variance useful."],
  ["Sigmoid hidden layers", "Xavier/Glorot, with care", "Better scaled than arbitrary random values, but deep sigmoid networks can still saturate and vanish."],
  ["SELU self-normalizing network", "LeCun-normal-style recipe", "Use the activation, initializer and architecture conditions together; ordinary dropout breaks the intended behaviour."],
  ["Pretrained model", "Keep pretrained weights", "Reinitializing the backbone destroys the learned representation; initialize only new layers unless intentionally training from scratch."],
];

const normChoices = [
  ["CNN with moderate/large batches", "BatchNorm", "Per-channel batch statistics are well established and efficient."],
  ["CNN with batches of 1–4 images", "GroupNorm", "Its statistics do not depend on other batch examples."],
  ["Transformer or token representation", "LayerNorm or architecture-specified RMSNorm", "Statistics are computed within each token/example, so sequence batches can vary."],
  ["Neural style transfer", "InstanceNorm", "Per-image, per-channel normalization reduces instance-specific contrast information."],
  ["Existing tested architecture", "Follow its normalization placement", "Changing pre-norm/post-norm or axes can alter optimization and checkpoint compatibility."],
];

export function InitializationNormalizationContent() {
  return (
    <div className="space-y-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">Deep Learning · Beginner Tutorial</p>
        <p className="mb-0 text-lg leading-relaxed text-slate-600">Before a neural network learns its first example, its weights need sensible starting values. As data and gradients cross many layers, their numerical scale must also remain usable. This lesson shows why signals vanish or explode, how Xavier and He initialization set a safer starting scale, and how Batch, Layer, Instance and Group Normalization stabilize different groups of activations.</p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A Deep Network Must Carry Two Signals Safely</h2>
        <p className="text-lg leading-relaxed">During the <strong>forward pass</strong>, numbers move from the input toward the prediction. During backpropagation, gradients move in the opposite direction so earlier weights can learn. Every layer multiplies, adds and transforms those numbers. If the scale repeatedly shrinks, useful information fades. If it repeatedly grows, values and updates become unstable.</p>
        <p className="text-lg leading-relaxed">Initialization controls the network’s starting scale before any training has occurred. Normalization controls selected activation scales while the network operates. Residual connections, suitable activations, optimizer settings and gradient clipping can also help, but they solve different parts of the stability problem.</p>
        <SignalScaleFigure />
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5"><p className="font-bold text-indigo-950">Forward direction</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Input → layer activations → prediction. We want useful variation to survive without values becoming enormous.</p></div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5"><p className="font-bold text-violet-950">Backward direction</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Loss → output gradients → earlier-layer gradients. We want the learning signal to reach early parameters at a usable scale.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Why Not Initialize Every Weight to Zero?</h2>
        <p className="text-lg leading-relaxed">A bias can often start at zero, but setting every weight in a hidden layer to the same value creates a <strong>symmetry problem</strong>. Neurons with identical incoming weights produce identical outputs. They then receive identical gradients and remain identical after every update. Ten identical neurons behave like one repeated neuron instead of learning ten different features.</p>
        <SymmetryFigure />
        <p className="text-lg leading-relaxed">Small random differences break that symmetry, but “random” is not enough. The distribution needs a scale related to the layer’s size and activation function. That is the purpose of variance-scaled initialization.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Fan-In, Fan-Out and Variance</h2>
        <p className="text-lg leading-relaxed">A dense neuron combines several inputs. <strong>Fan-in</strong> is the number of values entering a neuron; <strong>fan-out</strong> is the number of neurons receiving outputs from that layer. If a neuron adds many independently weighted inputs, the output variance can grow with fan-in unless the weights become correspondingly smaller.</p>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-bold text-indigo-800">Mean</p><p className="mt-1 text-sm leading-relaxed text-slate-600">The centre of a group of values. Initial weight distributions are commonly centred near zero.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-bold text-indigo-800">Variance</p><p className="mt-1 text-sm leading-relaxed text-slate-600">How spread out values are around their mean. Variance controls signal strength more directly than a vague “small random” description.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-bold text-indigo-800">Standard deviation</p><p className="mt-1 text-sm leading-relaxed text-slate-600">The square root of variance. A normal initializer usually asks for this scale.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Xavier/Glorot Initialization for Balanced Signals</h2>
        <p className="text-lg leading-relaxed">Xavier initialization chooses random weights whose scale depends on both fan-in and fan-out. Its aim is to keep forward activations and backward gradients at roughly comparable variance across layers. It is a common match for tanh and other roughly symmetric activations.</p>
        <div className="grid gap-5 lg:grid-cols-2">
          <DarkFormula title="Xavier normal" note={<>Draw each weight from a zero-centred normal distribution with this standard deviation.</>}><span>σ = √(2 / (fan<sub>in</sub> + fan<sub>out</sub>))</span></DarkFormula>
          <DarkFormula title="Xavier uniform" note={<>Draw each weight uniformly between −a and +a.</>}><span>a = √(6 / (fan<sub>in</sub> + fan<sub>out</sub>))</span></DarkFormula>
        </div>
        <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <p className="text-xs font-extrabold uppercase tracking-wide text-indigo-600">Worked example: 4 inputs and 6 outputs</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">The layer shape supplies these two counts: every output neuron receives <strong>4 input values</strong>, so fan-in = 4; the layer produces <strong>6 output values</strong>, so fan-out = 6. They are architecture choices, not values learned during training.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-slate-900">Xavier normal scale</p><p className="mt-2 font-mono text-sm leading-7">σ = √(2 / (4 + 6))<br />= √0.2<br />≈ <strong>0.447</strong></p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="font-bold text-slate-900">Xavier uniform range</p><p className="mt-2 font-mono text-sm leading-7">a = √(6 / (4 + 6))<br />= √0.6<br />≈ <strong>0.775</strong><br />weights are sampled from [−0.775, +0.775]</p></div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>Interpretation:</strong> this calculation does not assign every weight the value 0.447. It sets the spread of a random distribution. Each neuron receives different random values, but the overall scale is controlled.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">He/Kaiming Initialization for ReLU Layers</h2>
        <p className="text-lg leading-relaxed">ReLU turns every negative input into zero. At a roughly symmetric start, that removes about half of the activations. He initialization compensates by using a larger variance based mainly on fan-in, helping the surviving positive signal retain a useful scale.</p>
        <DarkFormula title="He normal for ReLU" note={<>For a ReLU layer, draw weights from a zero-centred normal distribution with variance 2/fan-in, or standard deviation √(2/fan-in).</>}><span>σ = √(2 / fan<sub>in</sub>)</span></DarkFormula>
        <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <p className="font-bold text-slate-900">Use the same fan-in = 4</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">The 4 again comes from the number of inputs entering each neuron. ReLU is the developer&apos;s activation choice, so it determines why the He formula—not the Xavier formula—is used here.</p>
          <p className="mt-3 rounded-xl bg-slate-50 p-4 font-mono text-sm leading-7">σ = √(2 / 4)<br />= √0.5<br />≈ <strong className="text-indigo-700">0.707</strong></p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>Why larger than Xavier’s 0.447?</strong> ReLU discards negative outputs, so the initializer allows a larger starting spread to compensate. It still does not guarantee perfect stability: architecture depth, data scale, residual paths and optimizer settings continue to matter.</p>
        </div>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-[850px] w-full text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Situation</th><th className="p-3 text-left">Starting initializer</th><th className="p-3 text-left">Reason</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{initChoices.map(([situation, choice, reason]) => <tr key={situation} className="align-top"><td className="p-3 font-bold text-slate-900">{situation}</td><td className="p-3 font-bold text-indigo-700">{choice}</td><td className="p-3 text-slate-700">{reason}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">How Gradients Vanish or Explode</h2>
        <p className="text-lg leading-relaxed">Backpropagation uses the chain rule, multiplying local derivatives along the path from the loss to an earlier layer. A single factor below 1 is not automatically a problem. The danger is repeated multiplication through many layers or time steps.</p>
        <DarkFormula title="Chain-rule idea" note={<>Each factor describes how one stage changes the next. The product can become tiny or enormous even when no individual factor looks extreme.</>}><span>∂Loss/∂w<sub>early</sub> = (∂Loss/∂a<sub>L</sub>) × … × (∂a<sub>2</sub>/∂a<sub>1</sub>) × (∂a<sub>1</sub>/∂w<sub>early</sub>)</span></DarkFormula>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-900">Vanishing example</p><p className="mt-2 text-sm leading-relaxed text-slate-700">For teaching, suppose five successive local derivatives are each 0.5. A real network calculates each derivative from its current weights, activations and data.</p><p className="mt-3 font-mono text-sm leading-7 text-slate-700">0.5 × 0.5 × 0.5 × 0.5 × 0.5<br />= 0.5⁵<br />= <strong>0.03125</strong></p><p className="mt-3 text-sm leading-relaxed text-slate-700">Only about 3% of the original scale remains after five factors. Earlier layers receive very small updates.</p></div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-900">Exploding example</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Now suppose the five calculated local derivatives are each 1.5. The repeated multiplication reverses the effect.</p><p className="mt-3 font-mono text-sm leading-7 text-slate-700">1.5 × 1.5 × 1.5 × 1.5 × 1.5<br />= 1.5⁵<br />≈ <strong>7.594</strong></p><p className="mt-3 text-sm leading-relaxed text-slate-700">The scale becomes more than seven times larger after only five factors. Deeper products can grow dramatically.</p></div>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-bold text-slate-900">Vanishing clues</p><p className="mt-1 text-sm leading-relaxed text-slate-600">Early-layer gradient norms near zero, unchanged early weights and loss that improves only in later layers.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-bold text-slate-900">Exploding clues</p><p className="mt-1 text-sm leading-relaxed text-slate-600">Large gradient norms, erratic loss, huge weight changes, infinities or NaNs.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-bold text-slate-900">Different remedies</p><p className="mt-1 text-sm leading-relaxed text-slate-600">Initialization, residual paths and suitable activations help flow; clipping limits explosions but does not restore vanished information.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Normalization Re-centres and Re-scales Activations</h2>
        <p className="text-lg leading-relaxed">Even with a good initial scale, activations change as weights learn. A normalization layer selects a group of values, subtracts their mean, divides by their standard deviation, and then applies a learned scale and shift. The first two operations standardize; the learned γ and β allow the network to choose a useful range instead of being permanently forced to mean 0 and variance 1.</p>
        <DarkFormula title="Normalization followed by learned scale and shift" note={<>μ is the selected group’s mean, σ² its variance, ε a tiny stability constant, γ the learned scale and β the learned shift.</>}><div><p>x̂<sub>i</sub> = (x<sub>i</sub> − μ) / √(σ² + ε)</p><p>y<sub>i</sub> = γx̂<sub>i</sub> + β</p></div></DarkFormula>
        <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <p className="text-xs font-extrabold uppercase tracking-wide text-indigo-600">Worked example: values [2, 4, 6, 8]</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">The four values are illustrative activations produced by an earlier layer. We temporarily ignore the tiny ε because the variance is safely above zero. The example uses γ = 2 and β = 0.5 as a possible learned state; frameworks usually initialize them to 1 and 0, then training changes them.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <p className="rounded-xl bg-slate-50 p-4 font-mono text-sm leading-7"><strong>1. Mean</strong><br />μ = (2 + 4 + 6 + 8) / 4 = 5</p>
            <p className="rounded-xl bg-slate-50 p-4 font-mono text-sm leading-7"><strong>2. Variance</strong><br />σ² = (9 + 1 + 1 + 9) / 4 = 5</p>
            <p className="rounded-xl bg-slate-50 p-4 font-mono text-sm leading-7"><strong>3. Standardize</strong><br />√5 ≈ 2.236<br />x̂ ≈ [−1.342, −0.447, 0.447, 1.342]</p>
            <p className="rounded-xl bg-indigo-50 p-4 font-mono text-sm leading-7"><strong>4. Learn scale and shift</strong><br />if γ = 2 and β = 0.5:<br />y ≈ [−2.184, −0.394, 1.394, 3.184]</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600"><strong>Interpretation:</strong> standardization creates a predictable centre and spread. γ = 2 stretches the standardized values and β = 0.5 moves them upward. Both can be learned by backpropagation.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Batch, Layer, Instance and Group Normalization</h2>
        <p className="text-lg leading-relaxed">The mathematical operation is similar, but the methods choose different values for μ and σ². That choice determines whether the result depends on other examples in the mini-batch, which tensor dimensions are standardized, and which architectures the method naturally fits.</p>
        <NormalizationAxesFigure />
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-[940px] w-full text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Situation</th><th className="p-3 text-left">Good starting method</th><th className="p-3 text-left">Why</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{normChoices.map(([situation, choice, reason]) => <tr key={situation} className="align-top"><td className="p-3 font-bold text-slate-900">{situation}</td><td className="p-3 font-bold text-indigo-700">{choice}</td><td className="p-3 text-slate-700">{reason}</td></tr>)}</tbody></table>
        </div>
        <BatchNormModesFigure />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Implementing a Stable ReLU Network in PyTorch</h2>
        <p className="text-lg leading-relaxed">The code below applies Kaiming initialization only to convolutional layers that are followed by ReLU. The final classifier produces logits and is not followed by ReLU, so it receives a separate Xavier initialization. BatchNorm stabilizes each feature channel during training, and evaluation mode makes validation use saved running statistics.</p>
        <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">stable_cnn.py</div>
          <pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`import torch
from torch import nn

class SmallCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d(1),
        )
        self.classifier = nn.Linear(64, 10)

        # These convolutional layers are each followed by ReLU.
        for module in self.features.modules():
            if isinstance(module, nn.Conv2d):
                nn.init.kaiming_normal_(module.weight, mode="fan_in", nonlinearity="relu")

        # The classifier emits logits; no ReLU follows it.
        nn.init.xavier_uniform_(self.classifier.weight)
        nn.init.zeros_(self.classifier.bias)

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x.flatten(1))

model = SmallCNN()

# Training: BatchNorm uses batch statistics and updates running values.
model.train()
train_logits = model(train_images)

# Validation/inference: use the saved running statistics.
model.eval()
with torch.no_grad():
    validation_logits = model(validation_images)`}</pre>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5"><p className="font-bold text-blue-950">Where the dimensions come from</p><p className="mt-2 text-sm leading-relaxed text-slate-700"><strong>3</strong> input channels come from RGB image data. <strong>32</strong> and <strong>64</strong> feature channels are developer-chosen model capacities. <strong>10</strong> outputs come from the dataset&apos;s ten classes. A 3 × 3 kernel and padding 1 are chosen to inspect a small neighbourhood while preserving height and width.</p></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">What PyTorch performs internally</p><p className="mt-2 text-sm leading-relaxed text-slate-700"><code>kaiming_normal_</code> calculates fan-in for each ReLU-followed convolution. <code>xavier_uniform_</code> separately initializes the final logits classifier because no ReLU follows it; keeping that layer&apos;s framework default would also be a reasonable deliberate choice. <code>BatchNorm2d(32)</code> keeps one learned γ and β for each of 32 channels. <code>model.train()</code> uses and updates batch statistics; <code>model.eval()</code> uses saved running statistics; <code>no_grad()</code> stops gradient recording but does not change BatchNorm mode.</p></div>
        </div>
        <div className="not-prose mt-5 rounded-xl border border-violet-200 bg-violet-50 p-5">
          <p className="font-bold text-violet-950">For a tiny image batch</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">Replace <code>nn.BatchNorm2d(32)</code> with something like <code>nn.GroupNorm(8, 32)</code>, provided the channel count is divisible by the number of groups. GroupNorm uses current-example statistics in both training and evaluation.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Diagnosing Unstable Signals and Gradients</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-[940px] w-full text-sm">
            <thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Symptom</th><th className="p-3 text-left">Possible cause</th><th className="p-3 text-left">What to inspect or change</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                ["Every hidden neuron learns the same feature", "Identical hidden weights", "Use the framework’s random initializer or an activation-aware Xavier/He scheme"],
                ["Early layers have near-zero gradient norms", "Vanishing gradients, saturation or a disconnected graph", "Inspect per-layer norms; check activations, initialization, residual paths and graph connectivity"],
                ["Loss suddenly becomes NaN", "Exploding gradients, excessive learning rate or invalid data", "Log activation/gradient norms; lower the rate; validate inputs; clip only as a guard after diagnosis"],
                ["BatchNorm validation is unstable", "Model left in training mode or poor running statistics", "Call model.eval(); confirm representative training batches and restored running buffers"],
                ["BatchNorm fails with batches of one or two", "Batch statistics are too noisy or undefined for the chosen shape", "Use GroupNorm/LayerNorm or increase the effective batch size"],
                ["A pretrained model suddenly performs poorly", "Backbone was reinitialized or normalization statistics were mishandled", "Load the checkpoint before selective initialization; preserve or deliberately adapt normalization state"],
              ].map(([symptom, cause, action]) => <tr key={symptom} className="align-top"><td className="p-3 font-bold text-slate-900">{symptom}</td><td className="p-3 text-amber-900">{cause}</td><td className="p-3 text-indigo-800">{action}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-900">Normalization is not a cure for bad input data.</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Still scale raw inputs appropriately, validate labels, and inspect outliers. A normalization layer cannot repair corrupt values or data leakage.</p></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-900">Initialization does not choose the final solution.</p><p className="mt-2 text-sm leading-relaxed text-slate-700">It creates trainable starting conditions. Different seeds can still produce different outcomes, so important experiments should report variability.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Essential Picture</h2>
        <div className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <ul className="m-0 space-y-2 pl-5 text-indigo-950">
            <li>Random weights break symmetry; their scale determines whether early signals survive.</li>
            <li>Xavier/Glorot balances fan-in and fan-out and commonly fits tanh-like layers.</li>
            <li>He/Kaiming uses a ReLU-aware fan-in scale.</li>
            <li>Vanishing and exploding gradients arise from repeated chain-rule multiplication.</li>
            <li>Normalization standardizes selected activations, then learns a scale γ and shift β.</li>
            <li>BatchNorm depends on batch statistics during training; LayerNorm, InstanceNorm and GroupNorm use within-example groups.</li>
            <li>Stable training is a system property involving data scale, activation, initialization, architecture, normalization, optimizer and learning rate.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Continue Learning</h2>
        <div className="not-prose mb-10 grid gap-4 md:grid-cols-2">
          <a href="/learn/deep-learning-optimizers" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Previous concept</p><p className="m-0 font-bold text-slate-900">Optimizers and Learning-Rate Scheduling</p></a>
          <a href="/learn/deep-learning-regularization" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Next concept</p><p className="m-0 font-bold text-slate-900">Regularization and Generalization</p></a>
        </div>
      </section>
    </div>
  );
}
