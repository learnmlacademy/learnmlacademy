import React from "react";

const optimizerCards = [
  {
    name: "1. Plain SGD",
    subtitle: "Use the current gradient only",
    color: "indigo",
    idea: "SGD looks at the gradient from the current mini-batch and immediately takes a step in the opposite direction. It keeps no memory of earlier gradients.",
    rule: "new weight = old weight − learning rate × current gradient",
    example: [
      "Start with weight w = 5.00",
      "Current gradient = 2.00 and learning rate = 0.10",
      "Update = 0.10 × 2.00 = 0.20",
      "New weight = 5.00 − 0.20 = 4.80"
    ],
    strengths: ["Simple to understand and debug", "Uses little optimizer memory", "Can be very competitive when its learning-rate schedule is tuned"],
    limits: ["May bounce across a narrow loss valley", "One global learning rate can be unsuitable for differently scaled parameters", "Often needs careful scheduling and more training time"]
  },
  {
    name: "2. SGD with Momentum",
    subtitle: "Remember the recent direction",
    color: "violet",
    idea: "Momentum stores a velocity. Gradients that repeatedly point in the same direction build speed, while gradients that keep changing direction partly cancel. This can reduce sideways bouncing.",
    rule: "velocity = momentum × old velocity − learning rate × gradient; new weight = old weight + velocity",
    example: [
      "Step 1: w = 5.00, gradient = 2.00, velocity = −0.20, so w = 4.80",
      "Step 2 gradient = 1.00 and momentum = 0.90",
      "New velocity = 0.90(−0.20) − 0.10(1.00) = −0.28",
      "New weight = 4.80 − 0.28 = 4.52"
    ],
    strengths: ["Smooths noisy or alternating updates", "Accelerates movement in a consistent direction", "Often a strong choice for long, carefully tuned CNN training"],
    limits: ["Adds a momentum value that must be chosen", "Can overshoot when learning rate or momentum is too high", "Still uses one base learning rate for all parameters"]
  },
  {
    name: "3. Adam",
    subtitle: "Adapt the step for every parameter",
    color: "cyan",
    idea: "Adam keeps two moving averages for every parameter: one for gradient direction and another for squared gradient size. It uses them to give each parameter its own effective step size.",
    rule: "track mean gradient + mean squared gradient → correct early bias → make a scaled update",
    example: [
      "Two parameters have gradients 0.01 and 10.00",
      "With SGD and learning rate 0.001, updates are about 0.00001 and 0.01",
      "On Adam's first bias-corrected step, both updates are roughly 0.001 in magnitude (ignoring epsilon)",
      "The large gradient is scaled down and the small gradient receives a useful step"
    ],
    strengths: ["Usually reaches a useful baseline quickly", "Handles parameters with very different gradient scales", "Common for Transformers, language models, sparse features, and rapid experiments"],
    limits: ["Stores two extra values per parameter", "A fast drop in training loss does not guarantee the best validation result", "Learning rate and weight-decay choices still matter"]
  }
] as const;

const colorClasses: Record<string, { shell: string; heading: string; badge: string }> = {
  indigo: { shell: "border-indigo-200 bg-indigo-50/50", heading: "text-indigo-900", badge: "bg-indigo-100 text-indigo-700" },
  violet: { shell: "border-violet-200 bg-violet-50/50", heading: "text-violet-900", badge: "bg-violet-100 text-violet-700" },
  cyan: { shell: "border-cyan-200 bg-cyan-50/50", heading: "text-cyan-900", badge: "bg-cyan-100 text-cyan-700" }
};

const comparisonRows = [
  ["Information remembered", "Nothing", "One velocity per parameter", "Mean and squared-gradient averages"],
  ["Step size", "Same base rule for all parameters", "Same base rule, changed by velocity", "Adapted separately for each parameter"],
  ["Typical Keras starting learning rate", "0.01", "0.01 with momentum often near 0.9", "0.001"],
  ["Extra optimizer memory", "Lowest", "About one extra parameter-sized state", "About two extra parameter-sized states"],
  ["Training behaviour", "Simple but may zig-zag", "Smoother and faster in a consistent direction", "Often fast and forgiving at the start"],
  ["Most useful as", "Transparent baseline or memory-conscious choice", "Tuned, long-running training choice", "Strong first baseline for complex models"]
];

const scenarios = [
  {
    title: "A small model or a teaching experiment",
    choice: "Start with plain SGD",
    reason: "The update is easy to calculate by hand, there is little optimizer state, and problems are easier to diagnose. Add momentum only if the loss path is noisy or oscillates."
  },
  {
    title: "A CNN trained for many epochs",
    choice: "Compare SGD with momentum against Adam",
    reason: "Adam can establish a good baseline quickly. Momentum plus a learning-rate schedule is worth testing when you have time to tune for final validation performance."
  },
  {
    title: "A Transformer or model with sparse gradients",
    choice: "Start with Adam (commonly AdamW in modern projects)",
    reason: "Different parameters can receive very different gradient scales or update frequencies, so an adaptive per-parameter method is a practical starting point."
  },
  {
    title: "Very limited optimizer memory",
    choice: "Prefer SGD when the quality trade-off is acceptable",
    reason: "Momentum stores one additional state tensor and Adam usually stores two. For a very large model, those states can consume substantial memory."
  },
  {
    title: "The loss jumps or becomes unstable",
    choice: "Do not switch optimizers blindly",
    reason: "First lower the learning rate, inspect gradient scale, verify the loss and data, and consider clipping. Instability can affect every optimizer."
  },
  {
    title: "You need the best choice for your project",
    choice: "Run a controlled comparison",
    reason: "Use the same model initialization, data order, training budget, validation metric, and tuning effort. Compare validation quality, time, and memory—not training loss alone."
  }
];

const practicalExamples = [
  {
    title: "Example 1: A plant-disease CNN whose loss keeps zig-zagging",
    setup: "The model learns from leaf photographs. Training loss generally falls, but it repeatedly jumps up and down because gradients point across a narrow loss valley.",
    methods: [
      ["Plain SGD", "Uses only the newest gradient, so it may keep crossing from one side of the valley to the other."],
      ["Momentum", "Repeated useful gradients build forward speed, while alternating sideways gradients partly cancel. The path can become smoother."],
      ["Adam", "Also rescales each parameter's step. It may reach a useful result quickly when gradient sizes differ across layers."]
    ],
    recommendation: "Try Momentum when the main problem is oscillation. Keep Adam as a baseline and decide using the validation curve, not smoothness alone."
  },
  {
    title: "Example 2: A review classifier containing rare words",
    setup: "Common word embeddings receive gradients in many batches, but an embedding for a rare word may receive a gradient only occasionally.",
    methods: [
      ["Plain SGD", "Applies the same learning-rate rule whenever a parameter receives a gradient; it does not remember typical gradient size."],
      ["Momentum", "Remembers recent direction, but a rarely updated parameter may have little useful velocity."],
      ["Adam", "Keeps separate statistics for each parameter, making it a practical starting point when update frequency and gradient scale vary greatly."]
    ],
    recommendation: "Start with Adam for sparse embeddings or Transformer-style models, then verify that its validation result and memory cost suit the project."
  },
  {
    title: "Example 3: Training a 10-million-parameter model with limited memory",
    setup: "Assume optimizer states are stored as 32-bit values. One parameter-sized state is roughly 40 MB for 10 million parameters. Actual totals depend on the framework and precision setup.",
    methods: [
      ["Plain SGD", "Keeps no momentum or moment tensor, so its extra optimizer-state memory is the smallest."],
      ["Momentum", "Stores approximately one velocity value per parameter: roughly 40 MB in this simplified example."],
      ["Adam", "Usually stores first- and second-moment values: roughly 80 MB in this simplified example, before other training memory."]
    ],
    recommendation: "When optimizer memory is the limiting resource, SGD may make a larger model or batch possible. Measure the quality and speed trade-off."
  },
  {
    title: "Example 4: A new image-classification project with a deadline",
    setup: "The team first needs proof that the data pipeline and model can learn, but later it can spend time tuning the final training run.",
    methods: [
      ["Plain SGD", "Gives a transparent baseline, but may require more learning-rate and schedule work before it becomes competitive."],
      ["Momentum", "Adds one important tuning choice but can be strong for a long CNN run with a carefully chosen schedule."],
      ["Adam", "Often produces a useful baseline quickly, helping the team detect data, model, and loss problems early." ]
    ],
    recommendation: "Use Adam for the first working baseline. Before finalizing, compare Momentum under the same initialization, data split, budget, and validation metric."
  }
];

export function DeepLearningOptimizersGuide() {
  return (
    <section className="not-prose space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">Understand Each Optimizer Separately</h2>
        <p className="text-slate-700 leading-relaxed">
          Backpropagation gives every optimizer the same raw ingredient: gradients. The difference is how each optimizer remembers, scales, and applies those gradients. Follow the same idea through all three methods before comparing them.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="font-bold text-slate-900 mb-2">One important distinction</h3>
        <p className="text-sm leading-relaxed text-slate-700">
          In everyday deep-learning code, “SGD” normally means mini-batch stochastic gradient descent: calculate the average gradient for one small batch and update once. It does not necessarily mean using exactly one training example per update.
        </p>
      </div>

      <div className="space-y-6">
        {optimizerCards.map((optimizer) => {
          const colors = colorClasses[optimizer.color];
          return (
            <article key={optimizer.name} className={`rounded-2xl border p-5 md:p-6 ${colors.shell}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <h3 className={`text-xl font-bold ${colors.heading}`}>{optimizer.name}</h3>
                <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${colors.badge}`}>{optimizer.subtitle}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{optimizer.idea}</p>
              <div className="rounded-lg border border-white bg-white/90 px-4 py-3 my-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Update rule in plain English</p>
                <p className="font-mono text-sm text-slate-800 leading-relaxed">{optimizer.rule}</p>
              </div>
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Small calculated example</h4>
                  <ol className="space-y-2">
                    {optimizer.example.map((line, index) => (
                      <li key={line} className="flex gap-3 text-sm text-slate-700">
                        <span className="font-bold text-indigo-600">{index + 1}.</span><span>{line}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div>
                    <h4 className="font-bold text-emerald-800 mb-2">Strengths</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">{optimizer.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-800 mb-2">Limitations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">{optimizer.limits.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">SGD vs Momentum vs Adam</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-[850px] w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr><th className="p-3 text-left">Question</th><th className="p-3 text-left">Plain SGD</th><th className="p-3 text-left">SGD + Momentum</th><th className="p-3 text-left">Adam</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map(([question, sgd, momentum, adam]) => (
                <tr key={question} className="align-top">
                  <th className="p-3 text-left font-semibold text-slate-800 bg-slate-50">{question}</th>
                  <td className="p-3 text-slate-700">{sgd}</td><td className="p-3 text-slate-700">{momentum}</td><td className="p-3 text-slate-700">{adam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">The learning rates shown are framework defaults and useful starting references, not guaranteed best values.</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">Practical Examples That Show the Difference</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          These examples describe what you might observe and what to test next. They are decision aids, not promises that one optimizer will always win.
        </p>
        <div className="space-y-5">
          {practicalExamples.map((example) => (
            <article key={example.title} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-900 text-lg">{example.title}</h3>
                <p className="text-sm leading-relaxed text-slate-700 mt-2">{example.setup}</p>
              </div>
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                {example.methods.map(([name, behaviour]) => (
                  <div key={name} className="p-5">
                    <h4 className="font-bold text-indigo-800 mb-2">{name}</h4>
                    <p className="text-sm leading-relaxed text-slate-700">{behaviour}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-emerald-50 border-t border-emerald-100">
                <p className="text-sm leading-relaxed text-slate-700"><span className="font-bold text-emerald-800">What to try:</span> {example.recommendation}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Which Optimizer Fits Which Situation?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">{scenario.title}</h3>
              <p className="font-semibold text-indigo-700 mt-2">{scenario.choice}</p>
              <p className="text-sm leading-relaxed text-slate-600 mt-2">{scenario.reason}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-3">A sensible beginner workflow</h2>
        <ol className="space-y-2 text-sm text-slate-700">
          <li><strong>1.</strong> Start with Adam to check that the model and data pipeline can learn.</li>
          <li><strong>2.</strong> Tune its learning rate and watch both training and validation curves.</li>
          <li><strong>3.</strong> If the project justifies more tuning, compare SGD with momentum using a suitable schedule.</li>
          <li><strong>4.</strong> Choose using validation quality, training time, stability, and memory together.</li>
        </ol>
        <p className="font-semibold text-amber-900 mt-4">There is no optimizer that wins every dataset, architecture, and training budget.</p>
      </div>
    </section>
  );
}
