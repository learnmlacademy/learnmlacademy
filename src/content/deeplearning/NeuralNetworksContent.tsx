import React from 'react';

type TermCardProps = {
  term: string;
  plainMeaning: string;
  example: string;
  color: string;
};

function TermCard({ term, plainMeaning, example, color }: TermCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${color}`}>
        {term}
      </div>
      <p className="font-semibold text-slate-900 mt-3 mb-1">{plainMeaning}</p>
      <p className="text-sm text-slate-600 m-0"><strong>In our example:</strong> {example}</p>
    </div>
  );
}

function BasicNeuronFlowDiagram() {
  return (
    <figure className="not-prose my-7">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
        <svg viewBox="0 0 920 330" className="w-full min-w-[760px]" role="img" aria-labelledby="basic-neuron-title basic-neuron-desc">
          <title id="basic-neuron-title">The five parts of an artificial neuron</title>
          <desc id="basic-neuron-desc">Input values travel along weighted connections, are added with a bias, pass through an activation function, and produce an output.</desc>

          <rect x="16" y="20" width="888" height="286" rx="20" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="105" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#3730a3">1 · INPUTS</text>
          <text x="290" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0369a1">2 · WEIGHTED CONNECTIONS</text>
          <text x="480" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#6d28d9">3 · ADD + BIAS</text>
          <text x="675" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#b45309">4 · ACTIVATION</text>
          <text x="842" y="55" textAnchor="middle" fontSize="15" fontWeight="800" fill="#047857">5 · OUTPUT</text>

          {[
            [102, 103, 'x₁'],
            [102, 165, 'x₂'],
            [102, 227, 'x₃'],
          ].map(([x, y, label], index) => (
            <g key={String(label)}>
              <circle cx={Number(x)} cy={Number(y)} r="27" fill="#4f46e5" />
              <text x={Number(x)} y={Number(y) + 6} textAnchor="middle" fontSize="18" fontWeight="800" fill="white">{label}</text>
              <line x1="129" y1={Number(y)} x2="420" y2="165" stroke="#38bdf8" strokeWidth="3" />
              <rect x={222 + index * 23} y={Number(y) + (165 - Number(y)) * 0.45 - 13} width="48" height="26" rx="7" fill="white" stroke="#7dd3fc" />
              <text x={246 + index * 23} y={Number(y) + (165 - Number(y)) * 0.45 + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">w{index + 1}</text>
            </g>
          ))}

          <circle cx="480" cy="165" r="57" fill="#8b5cf6" />
          <text x="480" y="156" textAnchor="middle" fontSize="27" fontWeight="700" fill="white">Σ</text>
          <text x="480" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">weighted sum</text>
          <line x1="480" y1="78" x2="480" y2="105" stroke="#f43f5e" strokeWidth="3" />
          <polygon points="473,102 487,102 480,113" fill="#f43f5e" />
          <rect x="445" y="65" width="70" height="30" rx="8" fill="#fff1f2" stroke="#fda4af" />
          <text x="480" y="85" textAnchor="middle" fontSize="12" fontWeight="800" fill="#be123c">bias b</text>

          <line x1="537" y1="165" x2="608" y2="165" stroke="#64748b" strokeWidth="3" />
          <polygon points="602,158 616,165 602,172" fill="#64748b" />
          <circle cx="675" cy="165" r="58" fill="#f59e0b" />
          <text x="675" y="156" textAnchor="middle" fontSize="20" fontWeight="800" fill="white">g(z)</text>
          <text x="675" y="179" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">activation rule</text>

          <line x1="733" y1="165" x2="793" y2="165" stroke="#64748b" strokeWidth="3" />
          <polygon points="787,158 801,165 787,172" fill="#64748b" />
          <circle cx="842" cy="165" r="41" fill="#059669" />
          <text x="842" y="172" textAnchor="middle" fontSize="22" fontWeight="800" fill="white">ŷ</text>

          <rect x="250" y="262" width="420" height="30" rx="9" fill="#eef2ff" />
          <text x="460" y="282" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3730a3">output = activation(weighted inputs + bias)</text>
        </svg>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">
        Figure 1: The complete journey through one artificial neuron. Every label is explained below before it is used later.
      </figcaption>
    </figure>
  );
}

function BiologicalVsArtificialDiagram() {
  return (
    <figure className="not-prose my-7">
      <div className="bg-gradient-to-br from-rose-50 via-white to-emerald-50 border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
        <svg viewBox="0 0 980 430" className="w-full min-w-[780px]" role="img" aria-labelledby="comparison-title comparison-desc">
          <title id="comparison-title">A biological neuron compared with an artificial neuron</title>
          <desc id="comparison-desc">Dendrites, synapses, cell body, firing response, and axon are compared with inputs, weights, weighted sum and bias, activation, and output.</desc>

          <rect x="18" y="20" width="440" height="350" rx="20" fill="#fff1f2" stroke="#fda4af" />
          <rect x="522" y="20" width="440" height="350" rx="20" fill="#ecfdf5" stroke="#6ee7b7" />
          <text x="238" y="55" textAnchor="middle" fontSize="19" fontWeight="800" fill="#9f1239">BIOLOGICAL NEURON</text>
          <text x="742" y="55" textAnchor="middle" fontSize="19" fontWeight="800" fill="#047857">ARTIFICIAL NEURON</text>

          <path d="M 92 117 C 125 120, 135 150, 170 172 M 80 172 C 120 166, 132 178, 170 190 M 95 247 C 124 230, 137 216, 171 207 M 126 88 C 136 120, 150 145, 181 169 M 119 277 C 133 247, 151 225, 180 211" fill="none" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
          <circle cx="201" cy="191" r="55" fill="#fb7185" stroke="#be123c" strokeWidth="3" />
          <circle cx="201" cy="191" r="20" fill="#be123c" opacity="0.75" />
          <line x1="256" y1="191" x2="377" y2="191" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
          {[279, 315, 351].map((x) => <ellipse key={x} cx={x} cy="191" rx="14" ry="22" fill="#fde68a" stroke="#d97706" strokeWidth="2" />)}
          <path d="M 377 191 C 403 179, 418 160, 434 143 M 377 191 C 408 194, 420 211, 438 226 M 377 191 C 403 205, 408 239, 422 254" fill="none" stroke="#e11d48" strokeWidth="5" strokeLinecap="round" />
          <text x="99" y="101" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9f1239">Dendrites</text>
          <text x="99" y="118" textAnchor="middle" fontSize="11" fill="#64748b">receive signals</text>
          <text x="201" y="279" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9f1239">Cell body</text>
          <text x="201" y="296" textAnchor="middle" fontSize="11" fill="#64748b">combines signals</text>
          <text x="320" y="133" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9f1239">Axon</text>
          <text x="320" y="150" textAnchor="middle" fontSize="11" fill="#64748b">carries output</text>
          <text x="105" y="337" textAnchor="middle" fontSize="12" fill="#64748b">Synapses change how strongly signals influence the cell.</text>

          {[
            [575, 112, 'x₁'],
            [575, 190, 'x₂'],
            [575, 268, 'x₃'],
          ].map(([x, y, label], index) => (
            <g key={String(label)}>
              <circle cx={Number(x)} cy={Number(y)} r="25" fill="#10b981" />
              <text x={Number(x)} y={Number(y) + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill="white">{label}</text>
              <line x1="600" y1={Number(y)} x2="695" y2="190" stroke="#34d399" strokeWidth="3" />
              <text x={635 + index * 4} y={Number(y) + (190 - Number(y)) * 0.43 - 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#047857">w{index + 1}</text>
            </g>
          ))}
          <circle cx="735" cy="190" r="58" fill="#059669" />
          <line x1="735" y1="132" x2="735" y2="248" stroke="white" strokeWidth="2" strokeDasharray="5 4" opacity="0.8" />
          <text x="713" y="184" textAnchor="middle" fontSize="21" fontWeight="800" fill="white">Σ+b</text>
          <text x="758" y="184" textAnchor="middle" fontSize="21" fontWeight="800" fill="white">g</text>
          <text x="713" y="205" textAnchor="middle" fontSize="10" fill="#d1fae5">combine</text>
          <text x="758" y="205" textAnchor="middle" fontSize="10" fill="#d1fae5">activate</text>
          <line x1="793" y1="190" x2="887" y2="190" stroke="#047857" strokeWidth="4" />
          <polygon points="878,181 896,190 878,199" fill="#047857" />
          <text x="875" y="170" textAnchor="middle" fontSize="17" fontWeight="800" fill="#047857">output ŷ</text>
          <text x="575" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Inputs</text>
          <text x="655" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Weights</text>
          <text x="742" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Neuron</text>
          <text x="872" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Prediction</text>

          <rect x="185" y="388" width="610" height="30" rx="9" fill="#ffffff" stroke="#cbd5e1" />
          <text x="490" y="408" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">This is a memory aid—not a claim that an artificial network thinks like a brain.</text>
        </svg>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">
        Figure 2: The biological analogy helps name the parts, but the artificial neuron is only a mathematical calculation.
      </figcaption>
    </figure>
  );
}

function NetworkOverviewDiagram() {
  return (
    <figure className="not-prose my-7">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm overflow-x-auto">
        <svg
          viewBox="0 0 900 420"
          className="w-full min-w-[720px]"
          role="img"
          aria-labelledby="network-title network-description"
        >
          <title id="network-title">A labelled neural network that predicts whether a student will pass</title>
          <desc id="network-description">Three input values connect to four hidden neurons, which connect to one output showing a 67 percent chance of passing.</desc>

          <rect x="18" y="20" width="205" height="376" rx="18" fill="#eef2ff" stroke="#a5b4fc" />
          <rect x="342" y="20" width="215" height="376" rx="18" fill="#f5f3ff" stroke="#c4b5fd" />
          <rect x="681" y="20" width="201" height="376" rx="18" fill="#ecfdf5" stroke="#6ee7b7" />

          <text x="120" y="53" textAnchor="middle" fontSize="18" fontWeight="700" fill="#3730a3">INPUT LAYER</text>
          <text x="120" y="75" textAnchor="middle" fontSize="12" fill="#64748b">Facts we give the network</text>
          <text x="449" y="53" textAnchor="middle" fontSize="18" fontWeight="700" fill="#6d28d9">HIDDEN LAYER</text>
          <text x="449" y="75" textAnchor="middle" fontSize="12" fill="#64748b">Combines the facts</text>
          <text x="781" y="53" textAnchor="middle" fontSize="18" fontWeight="700" fill="#047857">OUTPUT LAYER</text>
          <text x="781" y="75" textAnchor="middle" fontSize="12" fill="#64748b">Gives the answer</text>

          {[
            [120, 130, 'Study hours', '0.8'],
            [120, 230, 'Attendance', '0.9'],
            [120, 330, 'Sleep', '0.7'],
          ].map(([x, y, label, value]) => (
            <g key={String(label)}>
              <circle cx={Number(x)} cy={Number(y)} r="35" fill="#4f46e5" />
              <text x={Number(x)} y={Number(y) + 5} textAnchor="middle" fontSize="17" fontWeight="700" fill="white">{value}</text>
              <text x={Number(x)} y={Number(y) + 55} textAnchor="middle" fontSize="13" fontWeight="600" fill="#312e81">{label}</text>
            </g>
          ))}

          {[130, 200, 270, 340].map((y, index) => (
            <g key={y}>
              <circle cx="449" cy={y} r="29" fill="#8b5cf6" />
              <text x="449" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">H{index + 1}</text>
            </g>
          ))}

          {[130, 230, 330].flatMap((startY) =>
            [130, 200, 270, 340].map((endY) => (
              <line key={`${startY}-${endY}`} x1="156" y1={startY} x2="419" y2={endY} stroke="#a5b4fc" strokeWidth="1.5" opacity="0.7" />
            )),
          )}
          {[130, 200, 270, 340].map((startY) => (
            <line key={startY} x1="478" y1={startY} x2="727" y2="225" stroke="#c4b5fd" strokeWidth="2" opacity="0.8" />
          ))}

          <circle cx="781" cy="225" r="54" fill="#059669" />
          <text x="781" y="218" textAnchor="middle" fontSize="24" fontWeight="800" fill="white">67%</text>
          <text x="781" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">chance to pass</text>

          <rect x="245" y="91" width="80" height="45" rx="8" fill="white" stroke="#cbd5e1" />
          <text x="285" y="109" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">LINES ARE</text>
          <text x="285" y="125" textAnchor="middle" fontSize="11" fill="#475569">weights</text>
          <path d="M 285 136 L 285 169" stroke="#64748b" strokeWidth="1.5" />
          <polygon points="280,166 290,166 285,174" fill="#64748b" />

          <text x="449" y="383" textAnchor="middle" fontSize="12" fill="#6d28d9">Each circle is one artificial neuron</text>
        </svg>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">
        Figure 3: Information moves from left to right. The numbers are illustrative, not a real student assessment.
      </figcaption>
    </figure>
  );
}

function SingleNeuronDiagram() {
  return (
    <figure className="not-prose my-7">
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-200 rounded-2xl p-4 md:p-6 overflow-x-auto">
        <svg viewBox="0 0 850 330" className="w-full min-w-[690px]" role="img" aria-labelledby="neuron-title neuron-desc">
          <title id="neuron-title">The calculation inside one artificial neuron</title>
          <desc id="neuron-desc">Study, attendance, and sleep inputs are multiplied by weights, added with a bias, and passed through an activation function.</desc>

          {[
            [82, 72, 'Study', '0.8', '× 0.7'],
            [82, 165, 'Attendance', '0.9', '× 0.8'],
            [82, 258, 'Sleep', '0.7', '× 0.3'],
          ].map(([x, y, label, value, weight]) => (
            <g key={String(label)}>
              <circle cx={Number(x)} cy={Number(y)} r="32" fill="#4f46e5" />
              <text x={Number(x)} y={Number(y) + 5} textAnchor="middle" fill="white" fontSize="16" fontWeight="700">{value}</text>
              <text x={Number(x)} y={Number(y) + 51} textAnchor="middle" fill="#334155" fontSize="12" fontWeight="600">{label}</text>
              <line x1="114" y1={Number(y)} x2="276" y2="165" stroke="#818cf8" strokeWidth="3" />
              <rect x="157" y={Number(y) + (165 - Number(y)) * 0.42 - 14} width="62" height="28" rx="7" fill="white" stroke="#a5b4fc" />
              <text x="188" y={Number(y) + (165 - Number(y)) * 0.42 + 5} textAnchor="middle" fill="#4338ca" fontSize="12" fontWeight="700">{weight}</text>
            </g>
          ))}

          <circle cx="330" cy="165" r="57" fill="#7c3aed" />
          <text x="330" y="151" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">ADD</text>
          <text x="330" y="172" textAnchor="middle" fill="white" fontSize="12">weighted clues</text>
          <text x="330" y="192" textAnchor="middle" fill="#ddd6fe" fontSize="12">+ bias (−0.8)</text>

          <line x1="388" y1="165" x2="473" y2="165" stroke="#64748b" strokeWidth="3" />
          <polygon points="468,158 482,165 468,172" fill="#64748b" />
          <text x="430" y="146" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">z = 0.69</text>

          <rect x="482" y="112" width="145" height="106" rx="18" fill="#f59e0b" />
          <text x="554" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">ACTIVATION</text>
          <text x="554" y="168" textAnchor="middle" fill="white" fontSize="13">turns the score</text>
          <text x="554" y="188" textAnchor="middle" fill="white" fontSize="13">into a useful output</text>

          <line x1="627" y1="165" x2="710" y2="165" stroke="#64748b" strokeWidth="3" />
          <polygon points="705,158 719,165 705,172" fill="#64748b" />

          <circle cx="766" cy="165" r="50" fill="#059669" />
          <text x="766" y="159" textAnchor="middle" fill="white" fontSize="21" fontWeight="800">0.67</text>
          <text x="766" y="181" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">output</text>

          <text x="330" y="300" textAnchor="middle" fill="#475569" fontSize="13">Multiply → add → activate. That is the basic job of a neuron.</text>
        </svg>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">Figure 4: A neuron is a short mathematical recipe, not a tiny human brain.</figcaption>
    </figure>
  );
}

function LearningLoopDiagram() {
  const items = [
    ['1', 'Look', 'Read one training example', '#4f46e5'],
    ['2', 'Guess', 'Make a prediction', '#7c3aed'],
    ['3', 'Check', 'Measure how wrong it was', '#e11d48'],
    ['4', 'Adjust', 'Change weights a little', '#059669'],
  ];

  return (
    <figure className="not-prose my-7">
      <div className="bg-slate-900 rounded-2xl p-5 md:p-7 overflow-x-auto">
        <div className="flex min-w-[760px] items-stretch gap-3">
          {items.map(([number, title, caption, color], index) => (
            <React.Fragment key={number}>
              <div className="flex-1 bg-white rounded-xl p-4 text-center">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white font-bold" style={{ backgroundColor: color }}>{number}</span>
                <p className="font-extrabold text-slate-900 mt-3 mb-1">{title}</p>
                <p className="text-xs text-slate-600 m-0">{caption}</p>
              </div>
              {index < items.length - 1 && <div className="self-center text-white text-2xl font-bold">→</div>}
            </React.Fragment>
          ))}
          <div className="self-center text-indigo-300 font-bold text-sm pl-1">↺ repeat</div>
        </div>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">Figure 5: Training repeats this feedback loop with many examples.</figcaption>
    </figure>
  );
}

export function NeuralNetworksContent() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">Deep Learning · Beginner Lesson</p>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">Neural Networks Explained</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-0">
          Learn what a neural network is using one simple student-result example—before we introduce formulas or code.
        </p>
      </header>

      <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-2xl p-5 md:p-6">
        <p className="font-bold text-emerald-900 mb-2">You do not need calculus for this lesson.</p>
        <p className="text-emerald-900/80 m-0 leading-relaxed">
          If you understand “important clues,” “a guess,” and “learning from a mistake,” you already have the ideas needed to begin.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What Is a Neural Network?</h2>
        <p className="text-lg leading-relaxed">
          A <strong>neural network</strong> is a computer model that learns a relationship between inputs and an output. It contains small calculation units called <strong>neurons</strong>, arranged in <strong>layers</strong> and joined by numbered connections called <strong>weights</strong>.
        </p>
        <p className="text-lg leading-relaxed">
          During training, the network sees examples with known answers. It makes guesses, checks its mistakes, and slowly changes its weights. After enough useful examples, it can make a prediction for an example it has not seen before.
        </p>
        <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 my-5">
          <p className="text-amber-950 m-0">
            <strong>Important:</strong> an artificial neuron is not a real brain cell. It is only a few mathematical operations. The word “neural” comes from historical inspiration, not because the model thinks like a person.
          </p>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">Biological neuron vs artificial neuron</h3>
        <p className="text-lg leading-relaxed">
          The biological comparison is useful as a memory aid: dendrites receive signals, synapses affect their strength, the cell body combines them, and the axon carries a response. An artificial neuron borrows that rough story using inputs, weights, a calculation, an activation function, and an output.
        </p>
        <BiologicalVsArtificialDiagram />

        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">From one neuron to a complete network</h3>
        <p className="text-lg leading-relaxed">
          A network connects many artificial neurons in layers. The following diagram shows those parts in our student-result problem.
        </p>
        <NetworkOverviewDiagram />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">The Five Key Components of a Neural Network</h2>
        <p className="text-lg leading-relaxed mb-5">
          Before solving an example, first see what a neural network is made of. These five ideas appear in every later section.
        </p>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {[
            ['1', 'Neurons (or nodes)', 'Small calculation units. A neuron receives numbers, combines them, and sends a new number forward.', 'bg-indigo-50 border-indigo-200 text-indigo-800'],
            ['2', 'Connections', 'Lines that carry a number from one neuron to another. Each connection has a weight.', 'bg-sky-50 border-sky-200 text-sky-800'],
            ['3', 'Weights and biases', 'Numbers the network learns. Weights control the strength of connections; a bias gives a neuron an adjustable starting push.', 'bg-violet-50 border-violet-200 text-violet-800'],
            ['4', 'Propagation', 'The movement of calculations through the network. A forward pass produces an answer; a backward pass carries information about the error.', 'bg-amber-50 border-amber-200 text-amber-800'],
            ['5', 'Learning rule', 'The method for improving the parameters. Backpropagation finds how each parameter affected the error, and an optimizer changes it a little.', 'bg-emerald-50 border-emerald-200 text-emerald-800'],
          ].map(([number, title, text, colors]) => (
            <div key={number} className={`${colors} border rounded-xl p-5 flex gap-4`}>
              <span className="flex-shrink-0 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center font-extrabold shadow-sm">{number}</span>
              <div><h3 className="font-extrabold text-slate-900 mb-1">{title}</h3><p className="text-sm text-slate-700 m-0 leading-relaxed">{text}</p></div>
            </div>
          ))}
        </div>

        <BasicNeuronFlowDiagram />

        <h3 className="text-xl font-bold text-slate-900 mt-7 mb-4">Learning happens in three repeating stages</h3>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            ['1', 'Input computation', 'Data enters as numbers. Each neuron multiplies its inputs by weights, adds them, and adds its bias.'],
            ['2', 'Output generation', 'The values move forward through the layers until the network produces a prediction.'],
            ['3', 'Iterative refinement', 'The prediction is compared with the known answer. The network adjusts weights and biases, then tries again.'],
          ].map(([number, title, text]) => (
            <div key={number} className="relative bg-slate-900 text-white rounded-xl p-5 pt-7">
              <span className="absolute -top-3 left-5 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold">Stage {number}</span>
              <h4 className="font-extrabold mb-2">{title}</h4>
              <p className="text-sm text-slate-300 m-0 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Beginner Word Bank: Know These Terms Before We Use Them</h2>
        <p className="text-lg leading-relaxed mb-5">
          You do not have to memorize this list now. Use it as a map: when a word appears later, you will already know its plain meaning.
        </p>
        <div className="not-prose grid md:grid-cols-2 gap-3">
          {[
            ['Input / feature', 'A number given to the network, such as study time.'],
            ['Neuron / node', 'A unit that multiplies, adds, and activates numbers.'],
            ['Connection', 'A path that carries a value from one neuron to another.'],
            ['Weight (w)', 'A learned number showing the strength and direction of a connection.'],
            ['Bias (b)', 'A learned starting adjustment added inside a neuron.'],
            ['Weighted sum (z)', 'Inputs multiplied by weights, added together, then combined with the bias.'],
            ['Activation function', 'A rule that changes the weighted sum into the neuron’s outgoing signal.'],
            ['ReLU', 'Rectified Linear Unit: it changes negative values to 0 and keeps positive values.'],
            ['Sigmoid', 'An activation that turns a number into a value between 0 and 1, often used for a yes/no probability.'],
            ['Softmax', 'An output activation that turns several class scores into probabilities adding to 100%.'],
            ['Layer', 'A group of neurons working at the same stage: input, hidden, or output.'],
            ['Prediction / output (ŷ)', 'The answer produced by the network. The symbol ŷ means “predicted answer.”'],
            ['Label / target (y)', 'The known correct answer used during training or evaluation.'],
            ['Forward pass', 'Moving calculations from the inputs to the prediction. Also called forward propagation.'],
            ['Loss', 'One number that measures how wrong the prediction is. Lower is usually better.'],
            ['Backpropagation', 'Calculating how much each parameter contributed to the loss, moving from output toward input.'],
            ['Optimizer / learning rule', 'The rule—such as SGD or Adam—that uses gradients to update parameters.'],
            ['Parameter', 'Any number the network learns; weights and biases are parameters.'],
            ['Batch', 'A small group of training examples processed together.'],
            ['Epoch', 'One complete pass through all training examples.'],
            ['Learning rate', 'A setting that controls how large each parameter update is.'],
          ].map(([term, meaning]) => (
            <div key={term} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500 flex-shrink-0" />
              <div><p className="font-bold text-slate-900 mb-1">{term}</p><p className="text-sm text-slate-600 m-0 leading-relaxed">{meaning}</p></div>
            </div>
          ))}
        </div>
        <div className="not-prose mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-950 m-0"><strong>Notation tip:</strong> <span className="font-mono">y</span> is the correct answer; <span className="font-mono">ŷ</span> (“y-hat”) is the network’s predicted answer.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Start With a Real-Life Problem</h2>
        <div className="not-prose bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl p-6 md:p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-2">Our example throughout this lesson</p>
          <h3 className="text-2xl font-extrabold mb-4">Which students may need extra help before an exam?</h3>
          <p className="text-indigo-50 leading-relaxed mb-5">
            A teacher has records from previous students: their study time, attendance, sleep, and whether they passed. The teacher wants a program that can examine a new student’s information and estimate the chance of passing.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              ['Information in', 'Study, attendance, sleep'],
              ['Pattern to learn', 'Which combinations usually lead to passing?'],
              ['Answer out', 'A probability such as 67%'],
            ].map(([title, text]) => (
              <div key={title} className="bg-white/10 border border-white/20 rounded-xl p-4">
                <p className="font-bold mb-1">{title}</p>
                <p className="text-sm text-indigo-100 m-0">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-lg leading-relaxed mt-5">
          We could write fixed rules such as “if study time is above six hours, predict pass.” But real life is rarely one rule. A student may study less and have excellent attendance, or study more but sleep very little. A neural network can learn how several clues work <em>together</em> from examples.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What Happens Inside One Neuron?</h2>
        <p className="text-lg leading-relaxed">
          A neuron has three small jobs: <strong>multiply</strong> each input by its weight, <strong>add</strong> those results and the bias, then <strong>activate</strong> the result. The diagram follows one imaginary student. To keep the arithmetic readable, we manually scale each teaching input against a stated reference: 8 study hours out of 10 gives 8÷10=0.8; 90% attendance gives 90÷100=0.9; and 7 sleep hours against a 10-hour reference gives 7÷10=0.7. These are teaching choices, not a recommended school-scoring system.
        </p>
        <SingleNeuronDiagram />

        <h3 className="text-xl font-bold text-slate-900 mt-7 mb-4">The same calculation, one line at a time</h3>
        <div className="not-prose space-y-3">
          {[
            ['1', 'Multiply every clue by its weight', '(0.8 × 0.7) + (0.9 × 0.8) + (0.7 × 0.3)'],
            ['2', 'Add the three answers', '0.56 + 0.72 + 0.21 = 1.49'],
            ['3', 'Add the bias', '1.49 + (−0.80) = 0.69'],
            ['4', 'Apply sigmoid activation', 'sigmoid(0.69) ≈ 0.67'],
            ['5', 'Read the output', 'The neuron estimates a 67% chance of passing.'],
          ].map(([number, title, calculation]) => (
            <div key={number} className="flex gap-4 bg-white border border-slate-200 rounded-xl p-4">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">{number}</span>
              <div>
                <p className="font-bold text-slate-900 mb-1">{title}</p>
                <p className="font-mono text-sm text-slate-600 m-0">{calculation}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-base text-slate-600 mt-4">
          These weights were chosen only to show the arithmetic. In a real network, training discovers useful weight and bias values from data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Why Do We Need More Than One Neuron?</h2>
        <p className="text-lg leading-relaxed">
          One neuron can form one simple decision. Many neurons can notice different combinations. One hidden neuron may respond strongly to “high attendance and moderate study,” while another may respond to “long study but little sleep.” The next layer can combine those smaller patterns into a better prediction.
        </p>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          {[
            ['Input layer', 'Receives values', 'It does not learn a secret meaning; it holds the facts we provide.'],
            ['Hidden layer(s)', 'Builds useful patterns', 'These layers are called hidden because we do not directly provide or read their answers.'],
            ['Output layer', 'Answers the task', 'Its shape depends on whether we want a number, yes/no answer, or one of many classes.'],
          ].map(([title, subtitle, text], index) => (
            <div key={title} className="relative bg-white border border-slate-200 rounded-xl p-5">
              <span className="absolute -top-3 left-4 bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-bold">Layer {index + 1}</span>
              <h3 className="font-extrabold text-slate-900 mt-2 mb-1">{title}</h3>
              <p className="font-semibold text-indigo-700 mb-2">{subtitle}</p>
              <p className="text-sm text-slate-600 m-0">{text}</p>
            </div>
          ))}
        </div>
        <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <p className="font-bold text-indigo-950 mb-2">Why is it called “deep” learning?</p>
          <p className="text-indigo-900/80 m-0">A deep neural network contains several learned layers between the input and output. “Deep” describes the stack of transformations—not human-like depth of thought.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">How the Network Makes One Prediction</h2>
        <p className="text-lg leading-relaxed mb-5">Moving information from input to output is called a <strong>forward pass</strong> (or forward propagation). Follow our student once through the network:</p>
        <ol className="not-prose space-y-4 list-none p-0">
          {[
            ['Prepare the inputs', 'Study, attendance, and sleep are converted to numbers on similar scales. Text or images would also need to be converted to numbers.'],
            ['Send values into the hidden layer', 'Every hidden neuron receives the inputs, applies its own weights and bias, and uses an activation function.'],
            ['Pass hidden outputs forward', 'Those outputs become the inputs for the next layer. The same simple neuron calculation happens again.'],
            ['Produce a final score', 'The output neuron returns 0.67. For this teaching task we read that as an estimated 67% chance of passing.'],
            ['Apply a decision rule if needed', 'If this teaching example uses 0.50 as its manually chosen threshold, 0.67 becomes “likely to pass.” The probability and threshold are different things.'],
          ].map(([title, text], index) => (
            <li key={title} className="flex gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-extrabold">{index + 1}</div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-1">
                <p className="font-bold text-slate-900 mb-1">{title}</p>
                <p className="text-sm text-slate-700 m-0 leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">How Does a Neural Network Learn?</h2>
        <p className="text-lg leading-relaxed">
          At the beginning, weights are usually small, unhelpful numbers, so the guesses are poor. Training improves them using examples whose correct answers are known.
        </p>
        <LearningLoopDiagram />

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <TermCard term="Label / target" plainMeaning="The correct answer attached to a training example." example="pass = 1 and fail = 0." color="bg-blue-100 text-blue-800" />
          <TermCard term="Loss" plainMeaning="One number that measures how wrong the model is." example="predicting 0.20 when the answer is pass produces more loss than predicting 0.80." color="bg-rose-100 text-rose-800" />
          <TermCard term="Backpropagation" plainMeaning="A method for finding how each weight contributed to the loss." example="it sends responsibility for the error backward through the layers." color="bg-violet-100 text-violet-800" />
          <TermCard term="Optimizer" plainMeaning="The rule that uses that information to update the parameters." example="SGD or Adam moves each weight a small amount intended to reduce future loss." color="bg-emerald-100 text-emerald-800" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mt-7 mb-3">One tiny learning moment</h3>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm min-w-[620px]">
            <thead className="bg-slate-900 text-white">
              <tr><th className="p-3 text-left">What happened?</th><th className="p-3 text-left">Value</th><th className="p-3 text-left">Plain meaning</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr><td className="p-3 font-semibold">Known label</td><td className="p-3 font-mono">1 (pass)</td><td className="p-3">This past student actually passed.</td></tr>
              <tr><td className="p-3 font-semibold">Network prediction</td><td className="p-3 font-mono">0.35</td><td className="p-3">The model gave only a 35% pass chance.</td></tr>
              <tr><td className="p-3 font-semibold">Loss</td><td className="p-3">High</td><td className="p-3">The guess was far from the known answer.</td></tr>
              <tr><td className="p-3 font-semibold">Correction</td><td className="p-3">Small weight changes</td><td className="p-3">Backpropagation and the optimizer make the next guess slightly better.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-lg leading-relaxed mt-5">
          One pass through all training examples is called an <strong>epoch</strong>. A small group processed together is a <strong>batch</strong>. The <strong>learning rate</strong> controls how large each update is. Too large can jump past a good solution; too small can make learning very slow.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Activation Functions, Without the Mystery</h2>
        <p className="text-lg leading-relaxed">An activation function decides what signal a neuron sends onward. Without non-linear activations, many stacked layers would still behave like one simple straight-line rule.</p>
        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          {[
            ['ReLU', 'Hidden layers', 'Negative number → 0. Positive number → keep it.', '−2 → 0, 3 → 3', 'bg-indigo-600'],
            ['Sigmoid', 'Yes/no output', 'Squeezes any number into the range 0 to 1.', '0.67 can be read as 67%', 'bg-emerald-600'],
            ['Softmax', 'Many-class output', 'Turns several scores into probabilities that add to 100%.', 'cat 70%, dog 20%, bird 10%', 'bg-amber-600'],
          ].map(([name, use, meaning, example, color]) => (
            <div key={name} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className={`${color} text-white p-4`}><p className="font-extrabold text-xl m-0">{name}</p><p className="text-xs text-white/80 mt-1 mb-0">Usually used for: {use}</p></div>
              <div className="p-4"><p className="text-sm text-slate-700 mb-3">{meaning}</p><p className="font-mono text-xs bg-slate-100 rounded-lg p-3 m-0">{example}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Different Neural Networks for Different Data</h2>
        <p className="text-lg leading-relaxed mb-5">“Neural network” is a family name. The shape of the network changes to suit the kind of information it receives. As a beginner, remember these main choices:</p>
        <div className="not-prose space-y-4">
          {[
            ['Dense / Feedforward network', 'Rows of numbers', 'Student records, house prices, simple classification', 'Data moves forward through fully connected layers.', '→ → →'],
            ['Convolutional neural network (CNN)', 'Images and grids', 'Recognizing a cat, reading an X-ray, detecting a road sign', 'Small filters look for local patterns such as edges and shapes.', '▦ → ◫'],
            ['Recurrent network (RNN, LSTM, GRU)', 'Ordered sequences', 'Older text systems, speech, and time-series forecasting', 'A state carries information from earlier steps.', '○ ↻ ○'],
            ['Transformer', 'Long sequences and relationships', 'Translation, chatbots, summarization, vision models', 'Attention lets each item consider other relevant items.', '● ⇄ ●'],
            ['Autoencoder', 'Compressing and rebuilding data', 'Noise removal, anomaly detection, representation learning', 'An encoder compresses; a decoder reconstructs.', 'wide → narrow → wide'],
            ['Generative adversarial network (GAN)', 'Creating new samples', 'Synthetic faces, artwork, data augmentation', 'A generator and a discriminator improve through competition.', 'creator ⇄ judge'],
          ].map(([name, data, example, idea, sketch]) => (
            <div key={name} className="grid md:grid-cols-[190px_1fr_150px] gap-4 items-center bg-white border border-slate-200 rounded-xl p-5">
              <div><p className="font-extrabold text-slate-900 m-0">{name}</p><p className="text-xs font-semibold text-indigo-600 mt-1 mb-0">Typical input: {data}</p></div>
              <div><p className="text-sm text-slate-700 mb-1">{idea}</p><p className="text-xs text-slate-500 m-0"><strong>Example:</strong> {example}</p></div>
              <div className="font-mono text-center bg-indigo-50 text-indigo-800 rounded-lg px-3 py-3 text-sm font-bold">{sketch}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-600 mt-4">There are more specialized architectures, but these six give a beginner the most useful map. Later lessons on this site explain CNNs, recurrent networks, transformers, autoencoders, and GANs separately.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">A Complete Two-Layer Forward Pass in NumPy</h2>
        <p className="text-lg leading-relaxed">The single-neuron calculation above explains the basic operation. A layer performs several such calculations together. This executable example uses one student row, two hidden neurons, and one output neuron. Every array is written explicitly so the printed intermediate values can be checked.</p>
        <div className="not-prose grid gap-3 sm:grid-cols-2 lg:grid-cols-4 my-5">
          {[
            ['X shape [1,3]', '1 example × 3 input features'],
            ['W1 shape [3,2]', '3 incoming features × 2 hidden neurons'],
            ['A1 shape [1,2]', '2 hidden outputs for the one example'],
            ['W2 shape [2,1]', '2 hidden outputs × 1 final neuron'],
          ].map(([shape, meaning]) => <div key={shape} className="rounded-xl border border-indigo-200 bg-indigo-50 p-4"><p className="font-mono font-bold text-indigo-900">{shape}</p><p className="mt-2 text-xs leading-relaxed text-slate-600">{meaning}</p></div>)}
        </div>
        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">two_layer_forward.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

X = np.array([[0.8, 0.9, 0.7]])
W1 = np.array([[ 0.5, -0.4],
               [ 0.3,  0.6],
               [-0.2,  0.1]])
b1 = np.array([0.1, -0.2])

Z1 = X @ W1 + b1
A1 = np.maximum(0, Z1)       # ReLU

W2 = np.array([[0.8],
               [0.4]])
b2 = np.array([-0.1])

Z2 = A1 @ W2 + b2
A2 = 1 / (1 + np.exp(-Z2))   # sigmoid

print("Z1:", Z1)  # [[0.63 0.09]]
print("A1:", A1)  # [[0.63 0.09]]
print("Z2:", Z2)  # [[0.44]]
print("A2:", A2)  # [[0.60825903]]`}</pre>
        </div>
        <div className="not-prose rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed text-emerald-950"><strong>How the values were chosen:</strong> X reuses the three teaching inputs. W1, b1, W2 and b2 are manually chosen example parameters; a real network initializes parameters and then learns them. Z means the value before activation, A means the value after activation, and the layer number is written as 1 or 2. The final 0.608 is produced by the model—not supplied as a label—and means an estimated 60.8% pass probability under this toy setup.</div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Try the Neuron in Python</h2>
        <p className="text-lg leading-relaxed">This short program repeats the hand calculation from Figure 4. It does not train a full network yet; it shows exactly how one neuron creates an output.</p>
        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">one_neuron.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import math

# One student's input values (scaled between 0 and 1)
study = 0.8
attendance = 0.9
sleep = 0.7

# Example weights and bias
weighted_sum = (
    study * 0.7
    + attendance * 0.8
    + sleep * 0.3
    - 0.8
)

# Sigmoid changes the raw score into a value from 0 to 1
probability = 1 / (1 + math.exp(-weighted_sum))

print(round(weighted_sum, 2))  # 0.69
print(round(probability, 2))   # 0.67
print(f"Estimated pass chance: {probability:.0%}")
# Estimated pass chance: 67%`}</pre>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3">Now connect neurons with Keras</h3>
        <p className="text-lg leading-relaxed">Libraries create and train all those connected neurons for us. This is the smallest readable model for three student inputs and one yes/no output:</p>
        <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
          <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">student_network.py</div>
          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np
from tensorflow import keras

keras.utils.set_random_seed(7)

# Eight labelled teaching examples. Each row is
# [study, attendance, sleep]; each target is pass=1 or fail=0.
X_train = np.array([
    [0.9, 0.9, 0.8], [0.8, 0.7, 0.7], [0.7, 0.9, 0.6], [0.6, 0.8, 0.8],
    [0.2, 0.4, 0.5], [0.3, 0.3, 0.6], [0.4, 0.5, 0.4], [0.1, 0.6, 0.5],
], dtype=np.float32)
y_train = np.array([1, 1, 1, 1, 0, 0, 0, 0], dtype=np.float32)

model = keras.Sequential([
    keras.layers.Input(shape=(3,)),       # 3 inputs
    keras.layers.Dense(4, activation="relu"),  # 4 hidden neurons
    keras.layers.Dense(1, activation="sigmoid") # pass chance
])

model.compile(
    optimizer="adam",              # how weights are adjusted
    loss="binary_crossentropy",     # how wrong each guess is
    metrics=["accuracy"]
)

model.fit(X_train, y_train, epochs=50, batch_size=4, verbose=0)

chance = model.predict([[0.8, 0.9, 0.7]])[0][0]
print(f"Estimated pass chance: {chance:.0%}")
# The seed makes this teaching run repeatable on a given setup, but minor
# numerical differences can still occur across TensorFlow versions/hardware.`}</pre>
        </div>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5"><p className="font-bold text-sky-950 mb-2">How the calls match the concept</p><p className="text-sm leading-relaxed text-sky-900 m-0"><code>Dense</code> creates trainable weights and biases. <code>compile</code> selects the error rule and update algorithm. <code>fit</code> repeats prediction, loss, gradients and updates. <code>predict</code> performs only the forward calculation with the learned parameter values.</p></div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5"><p className="font-bold text-amber-950 mb-2">What this example cannot justify</p><p className="text-sm leading-relaxed text-amber-900 m-0">Eight invented rows cannot support a real student decision. A real system would need representative data, clear definitions, separate validation and test sets, fairness review and human oversight. This code exists only to make the mechanics executable.</p></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What Can Go Wrong?</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Problem</th><th className="p-3 text-left">In simple English</th><th className="p-3 text-left">What to check</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                ['Poor or biased data', 'The examples do not represent the people or situations where the model will be used.', 'Coverage, labels, missing groups, and data collection.'],
                ['Overfitting', 'The network memorizes training examples but performs poorly on new ones.', 'Validation results, simpler models, regularization, and more useful data.'],
                ['Underfitting', 'The network has not learned the useful pattern even on training data.', 'Input quality, model capacity, learning rate, and training time.'],
                ['Wrong metric', 'A high-looking number hides the failures that actually matter.', 'Precision, recall, class balance, and real-world cost of mistakes.'],
                ['Too much confidence', 'A probability is treated as certainty.', 'Calibration, uncertainty, human review, and safe thresholds.'],
              ].map(([problem, meaning, check]) => <tr key={problem}><td className="p-3 font-bold text-rose-700">{problem}</td><td className="p-3 text-slate-700">{meaning}</td><td className="p-3 text-emerald-700">{check}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Check Your Understanding</h2>
        <div className="space-y-4">
          {[
            ['1. What does a weight represent?', 'It represents how strongly one input or neuron influences the next neuron.'],
            ['2. What are the three basic jobs inside a neuron?', 'Multiply inputs by weights, add the results and bias, then apply an activation function.'],
            ['3. What is the difference between a prediction and a label?', 'A prediction is the network’s guess. A label is the known correct answer supplied in training or evaluation data.'],
            ['4. Does backpropagation directly choose the final answer?', 'No. Backpropagation calculates how the parameters contributed to the loss. An optimizer uses that information to adjust them.'],
            ['5. Which network would you first consider for images?', 'A convolutional neural network (CNN), because its filters are designed to find local visual patterns.'],
          ].map(([question, answer]) => (
            <details key={question} className="bg-white border border-slate-200 rounded-xl p-5">
              <summary className="font-bold text-slate-900 cursor-pointer">{question}</summary>
              <p className="mt-3 mb-0 text-slate-700">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Summary: The Whole Idea in Seven Lines</h2>
        <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
          <ol className="space-y-3 m-0 pl-5 text-indigo-950">
            <li>Inputs are numbers that describe one example.</li>
            <li>Weights describe how strongly information should influence the next neuron.</li>
            <li>Each neuron multiplies, adds a bias, and applies an activation function.</li>
            <li>Layers pass those results forward until the network makes a prediction.</li>
            <li>A loss function measures the prediction’s error against the known answer.</li>
            <li>Backpropagation and an optimizer adjust weights and biases.</li>
            <li>Repeating this with useful data lets the network improve on its task.</li>
          </ol>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Continue Learning</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4 mb-10">
          <a href="/learn/deep-learning-intro" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
            <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Previous concept</p>
            <p className="font-bold text-slate-900 m-0">Deep Learning Basics and Model Types</p>
          </a>
          <a href="/learn/math-foundations-deep-learning" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
            <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Next concept</p>
            <p className="font-bold text-slate-900 m-0">Essential Math for Neural Networks</p>
          </a>
        </div>
      </section>
    </div>
  );
}
