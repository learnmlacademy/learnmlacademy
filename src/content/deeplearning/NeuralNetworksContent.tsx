import React from 'react';

export function NeuralNetworksContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Neural Networks — Complete Deep Dive</h1>
      <p className="text-lg text-slate-500 mb-6">Weights, biases, activation functions, forward pass, backprop — everything explained with code and visuals</p>

      {/* ── INTUITION-FIRST INTRO ── */}
      <div className="not-prose bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-200 rounded-2xl p-6 md:p-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">Understand First</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
          A neural network is a chain of tiny decision-makers
        </h2>
        <p className="text-slate-700 leading-relaxed mb-6">
          Imagine predicting whether a student will pass an exam using <strong>study hours</strong>, <strong>sleep</strong>, and <strong>attendance</strong>.
          One small unit can combine those clues. A network connects many such units so later layers can combine simpler patterns into more useful ones.
        </p>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 text-center">
          {[
            ['Inputs', 'study • sleep • attendance'],
            ['Weighted clues', 'how important is each input?'],
            ['Hidden patterns', 'combine useful signals'],
            ['Prediction', 'pass probability'],
          ].map(([title, caption], index) => (
            <React.Fragment key={title}>
              <div className="flex-1 bg-white border border-indigo-100 rounded-xl p-4">
                <div className="font-bold text-indigo-900">{title}</div>
                <div className="text-xs text-slate-600 mt-1">{caption}</div>
              </div>
              {index < 3 && (
                <span className="text-indigo-400 font-bold text-xl rotate-90 md:rotate-0">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-center font-bold text-indigo-800 mt-6 mb-0">
          Input → Weighted Sum → Activation → Next Layer → Prediction
        </p>
      </div>

      <p className="text-lg leading-relaxed">
        A Neural Network is a mathematical function that maps inputs to outputs by stacking layers of computational units called <strong>neurons</strong>. Each neuron performs a weighted sum of its inputs, adds a bias, and passes the result through an activation function. Training adjusts the network's weights and biases so its predictions become more useful for the chosen task.
      </p>

      <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 my-6">
        <p className="text-amber-900 m-0 leading-relaxed">
          <strong>Do not think of an artificial neuron as a tiny brain cell.</strong> It is simply a mathematical computation. The biological analogy is useful for intuition, but modern neural networks are engineered mathematical models, not simulations of the human brain.
        </p>
      </div>

      {/* ── BIOLOGICAL ANALOGY ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Biological Inspiration</h2>
      <p className="text-lg leading-relaxed mb-4">
        Artificial neural networks were historically inspired in part by simplified ideas about biological neurons. The analogy can help us remember the parts, but the correspondence is only approximate. A biological neuron receives signals through dendrites and communicates through its axon; an artificial neuron represents this idea with inputs, weights, a weighted sum, bias, and an activation function:
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr><th className="p-3 text-left">Biological Neuron</th><th className="p-3 text-left">Artificial Neuron</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['Dendrites (receive signals)','Inputs x₁, x₂, ..., xₙ'],
              ['Synapse strength','Weights w₁, w₂, ..., wₙ'],
              ['Cell body (sums signals)','Weighted sum: z = Σ(wᵢ·xᵢ) + b'],
              ['Firing threshold','Activation function f(z)'],
              ['Axon (transmits signal)','Output: a = f(z)'],
            ].map(([bio,art])=>(
              <tr key={bio} className="hover:bg-slate-50">
                <td className="p-3 text-slate-700">{bio}</td>
                <td className="p-3 font-mono text-indigo-700 font-semibold">{art}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SINGLE NEURON MATHS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Single Neuron Mathematics</h2>
      <p className="text-lg leading-relaxed mb-4">
        Every neuron does exactly two things:
      </p>
      <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-900 mb-3">Step 1 — Weighted Sum</h3>
          <div className="bg-white rounded-lg p-4 font-mono text-center text-lg mb-3 border border-indigo-100">
            z = w₁x₁ + w₂x₂ + w₃x₃ + b
          </div>
          <p className="text-sm text-slate-700">Each input <strong>xᵢ</strong> is multiplied by its weight <strong>wᵢ</strong> (how important that input is), then all products are summed and a bias <strong>b</strong> is added. Bias lets the neuron shift its output independently of the inputs — like the y-intercept in y=mx+b.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-bold text-emerald-900 mb-3">Step 2 — Activation Function</h3>
          <div className="bg-white rounded-lg p-4 font-mono text-center text-lg mb-3 border border-emerald-100">
            a = f(z)
          </div>
          <p className="text-sm text-slate-700">The activation function <strong>f</strong> transforms z into the neuron's output. It introduces non-linearity — without it, all layers collapse into a single linear transformation and the network cannot learn complex patterns.</p>
        </div>
      </div>

      {/* ── WORKED EXAMPLE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Worked Example — One Neuron, Step by Step</h2>

      <p className="text-lg leading-relaxed mb-4">
        Before touching Python, let us calculate one neuron by hand. Suppose the inputs are <strong>x₁ = 2</strong> and <strong>x₂ = 3</strong>, the weights are <strong>w₁ = 0.5</strong> and <strong>w₂ = 1</strong>, and the bias is <strong>b = −1</strong>.
      </p>

      <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 my-6">
        <div className="space-y-3 text-slate-800">
          <p className="font-mono m-0">z = (w₁ × x₁) + (w₂ × x₂) + b</p>
          <p className="font-mono m-0">z = (0.5 × 2) + (1 × 3) − 1</p>
          <p className="font-mono m-0">z = 1 + 3 − 1 = <strong>3</strong></p>
          <div className="border-t border-indigo-200 pt-3 mt-3">
            <p className="font-mono m-0">a = ReLU(3) = <strong>3</strong></p>
          </div>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-6">
        That is a neuron: <strong>multiply → add → activate</strong>. A neural network repeats this same basic idea across many neurons and layers.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        Suppose a single neuron receives 3 inputs. Let us trace the exact calculation:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">single_neuron_example.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

# Inputs: age=25, hours_studied=8, previous_score=70
x = np.array([25, 8, 70])

# Weights learned during training
w = np.array([0.1, 0.5, 0.3])

# Bias
b = -20

# Step 1: Weighted sum
z = np.dot(w, x) + b
print(f"z = (0.1×25) + (0.5×8) + (0.3×70) + (−20)")
print(f"z = 2.5 + 4.0 + 21.0 − 20 = {z}")
# Output: z = 2.5 + 4.0 + 21.0 − 20 = 7.5

# Step 2: Apply ReLU activation
def relu(z):
    return max(0, z)

a = relu(z)
print(f"a = ReLU({z}) = {a}")
# Output: a = ReLU(7.5) = 7.5

# If z were negative (e.g., z = -3):
print(f"a = ReLU(-3) = {relu(-3)}")
# Output: a = ReLU(-3) = 0  ← neuron is "off"`}</pre>
      </div>

      {/* ── LAYER ARCHITECTURE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Network Architecture — Layers in Depth</h2>
      <div className="not-prose space-y-4 my-6">
        {[
          {
            name:'Input Layer',
            icon:'📥',
            card:'bg-indigo-50 border-indigo-200',
            title:'text-indigo-900',
            desc:'Represents the input features supplied to the network. If one example has 30 numeric features, the input representation has 30 values before those values are transformed by the first learned layer.'
          },
          {
            name:'Hidden Layers',
            icon:'🧠',
            card:'bg-violet-50 border-violet-200',
            title:'text-violet-900',
            desc:'Learn intermediate representations. Earlier layers may capture simpler patterns while later layers can combine them into more task-specific patterns. “Deep” simply refers to using multiple learned layers; there is no universal rule that deep learning begins at exactly three hidden layers.'
          },
          {
            name:'Output Layer',
            icon:'📤',
            card:'bg-emerald-50 border-emerald-200',
            title:'text-emerald-900',
            desc:'Produces the final model output. Common designs include one sigmoid output for binary classification, multiple logits followed by softmax for multi-class classification, or a linear output for regression.'
          },
        ].map(l=>(
          <div key={l.name} className={`${l.card} border rounded-xl p-5 flex gap-4`}>
            <span className="text-3xl flex-shrink-0">{l.icon}</span>
            <div>
              <h3 className={`font-bold ${l.title} text-lg mb-1`}>{l.name}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{l.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ACTIVATION FUNCTIONS WITH CODE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Activation Functions — Code + Output</h2>
      <p className="text-lg leading-relaxed mb-4">
        Here is how each activation function transforms the same set of input values — notice how they produce completely different outputs:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">activation_functions.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

z = np.array([-3.0, -1.0, 0.0, 1.0, 3.0])

# ── 1. Sigmoid ───────────────────────────────────────────
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

print("Sigmoid:", np.round(sigmoid(z), 3))
# Output: [0.047  0.269  0.5    0.731  0.953]
# → Always between 0 and 1. Good for binary output probability.

# ── 2. Tanh ──────────────────────────────────────────────
def tanh(z):
    return np.tanh(z)

print("Tanh:", np.round(tanh(z), 3))
# Output: [-0.995 -0.762  0.     0.762  0.995]
# → Between -1 and 1 and zero-centered. Used in some hidden/recurrent architectures.

# ── 3. ReLU ──────────────────────────────────────────────
def relu(z):
    return np.maximum(0, z)

print("ReLU:", relu(z))
# Output: [0.  0.  0.  1.  3.]
# → Negative inputs → 0. Positive inputs unchanged.
# → Simple and efficient; a common hidden-layer activation.

# ── 4. Leaky ReLU ────────────────────────────────────────
def leaky_relu(z, alpha=0.01):
    return np.where(z > 0, z, alpha * z)

print("Leaky ReLU:", leaky_relu(z))
# Output: [-0.03  -0.01   0.     1.     3.  ]
# → Small negative slope for z<0. Can reduce the risk of permanently inactive ReLU units.

# ── 5. Softmax (for multi-class output) ──────────────────
def softmax(z):
    exp_z = np.exp(z - np.max(z))   # subtract max for numerical stability
    return exp_z / exp_z.sum()

logits = np.array([2.0, 1.0, 0.5])  # raw scores for 3 classes
print("Softmax:", np.round(softmax(logits), 3))
# Output: [0.627  0.239  0.133]
# → All values sum to 1.0 → Interpreted as class probabilities.`}</pre>
      </div>

      {/* ── SVG ACTIVATION CURVES ── */}
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 1 — Activation Function Curves</figcaption>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Sigmoid curve */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-indigo-600 px-4 py-2 text-white text-sm font-bold text-center">Sigmoid</div>
              <svg viewBox="0 0 200 140" className="w-full p-2" aria-label="Sigmoid activation function S-curve from 0 to 1">
                <line x1="0" y1="70" x2="200" y2="70" stroke="#e2e8f0" strokeWidth="1"/>
                <line x1="100" y1="0" x2="100" y2="140" stroke="#e2e8f0" strokeWidth="1"/>
                <text x="195" y="67" fontSize="8" fill="#94a3b8">x</text>
                <text x="104" y="8" fontSize="8" fill="#94a3b8">f(x)</text>
                <text x="2" y="20" fontSize="7" fill="#64748b">1.0</text>
                <text x="2" y="73" fontSize="7" fill="#64748b">0.5</text>
                <text x="2" y="132" fontSize="7" fill="#64748b">0.0</text>
                <path d="M 10,128 Q 60,125 80,110 Q 100,70 120,30 Q 140,15 190,12" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="100" cy="70" r="3" fill="#6366f1"/>
                <text x="105" y="68" fontSize="8" fill="#6366f1">(0, 0.5)</text>
              </svg>
            </div>
            {/* ReLU curve */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-emerald-600 px-4 py-2 text-white text-sm font-bold text-center">ReLU</div>
              <svg viewBox="0 0 200 140" className="w-full p-2" aria-label="ReLU activation function flat at zero then linear">
                <line x1="0" y1="70" x2="200" y2="70" stroke="#e2e8f0" strokeWidth="1"/>
                <line x1="100" y1="0" x2="100" y2="140" stroke="#e2e8f0" strokeWidth="1"/>
                <text x="195" y="67" fontSize="8" fill="#94a3b8">x</text>
                <text x="104" y="8" fontSize="8" fill="#94a3b8">f(x)</text>
                <path d="M 10,70 L 100,70 L 190,10" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="100" cy="70" r="3" fill="#10b981"/>
                <text x="105" y="68" fontSize="8" fill="#10b981">(0, 0)</text>
                <text x="30" y="82" fontSize="8" fill="#64748b">f=0 (x&lt;0)</text>
                <text x="120" y="35" fontSize="8" fill="#64748b">f=x (x≥0)</text>
              </svg>
            </div>
            {/* Tanh curve */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-amber-600 px-4 py-2 text-white text-sm font-bold text-center">Tanh</div>
              <svg viewBox="0 0 200 140" className="w-full p-2" aria-label="Tanh activation function S-curve from negative 1 to 1">
                <line x1="0" y1="70" x2="200" y2="70" stroke="#e2e8f0" strokeWidth="1"/>
                <line x1="100" y1="0" x2="100" y2="140" stroke="#e2e8f0" strokeWidth="1"/>
                <text x="195" y="67" fontSize="8" fill="#94a3b8">x</text>
                <text x="104" y="8" fontSize="8" fill="#94a3b8">f(x)</text>
                <text x="2" y="14" fontSize="7" fill="#64748b">+1</text>
                <text x="2" y="73" fontSize="7" fill="#64748b">0</text>
                <text x="2" y="136" fontSize="7" fill="#64748b">−1</text>
                <path d="M 10,132 Q 60,128 80,100 Q 100,70 120,40 Q 140,12 190,8" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="100" cy="70" r="3" fill="#f59e0b"/>
                <text x="105" y="68" fontSize="8" fill="#f59e0b">(0, 0)</text>
              </svg>
            </div>
          </div>
        </figure>
      </div>

      {/* ── FORWARD PROPAGATION IN CODE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Forward Propagation — From Scratch in NumPy</h2>
      <p className="text-lg leading-relaxed mb-4">
        Let us build a 2-layer neural network (1 hidden layer) from scratch — no Keras, no PyTorch — to see exactly what happens at each step:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">forward_prop_scratch.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

# ── Network: 2 inputs → 3 hidden neurons → 1 output ─────
np.random.seed(42)

# Randomly initialize weights and biases
W1 = np.random.randn(2, 3)   # shape (input_size, hidden_size) = (2, 3)
b1 = np.zeros((1, 3))        # one bias per hidden neuron

W2 = np.random.randn(3, 1)   # shape (hidden_size, output_size) = (3, 1)
b2 = np.zeros((1, 1))        # one bias for the output neuron

print("W1 shape:", W1.shape)  # (2, 3)
print("W2 shape:", W2.shape)  # (3, 1)

# ── Single sample input: [study_hours=5, sleep_hours=7] ──
X = np.array([[5.0, 7.0]])    # shape (1, 2)

# ── Forward pass through Hidden Layer ────────────────────
Z1 = np.dot(X, W1) + b1      # (1,2) @ (2,3) = (1,3)
print("Z1 (pre-activation):", np.round(Z1, 3))
# Output: Z1 = [[13.145 -2.330  1.599]]

A1 = np.maximum(0, Z1)       # ReLU activation
print("A1 (post-ReLU):", np.round(A1, 3))
# e.g., A1 = [[ 0.249  3.101  0.   ]]
# Note: -1.508 became 0 → that neuron is "off"

# ── Forward pass through Output Layer ────────────────────
Z2 = np.dot(A1, W2) + b2     # (1,3) @ (3,1) = (1,1)
print("Z2 (pre-activation):", np.round(Z2, 3))
# Output: Z2 = [[20.007]]

# Sigmoid for binary classification (pass or fail)
A2 = 1 / (1 + np.exp(-Z2))  # sigmoid
print("A2 (prediction probability):", np.round(A2, 3))
# e.g., A2 = [[0.863]]
# → 86.3% probability of passing

prediction = (A2 > 0.5).astype(int)
print("Predicted class:", prediction[0][0])
# Output: Predicted class: 1  → Pass`}</pre>
      </div>

      {/* ── BACKPROP ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Backpropagation — How the Network Learns</h2>
      <p className="text-lg leading-relaxed mb-4">
        Backpropagation computes how sensitive the loss is to each trainable parameter. Using the <strong>chain rule of calculus</strong>, gradients are passed from the output side of the network back through earlier layers. An optimizer then uses those gradients to update the parameters.
      </p>

      <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">Forward pass</p>
          <p className="font-bold text-slate-900 mb-2">“What did the network predict?”</p>
          <p className="text-sm text-slate-700 m-0">Inputs move forward through the layers until the network produces a prediction and a loss value.</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">Backward pass</p>
          <p className="font-bold text-slate-900 mb-2">“Which parameters should change?”</p>
          <p className="text-sm text-slate-700 m-0">Gradients tell us how a small change in each parameter would affect the loss.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3">Tiny Weight-Update Example</h3>
      <p className="text-lg leading-relaxed mb-4">
        If a weight is currently <strong>0.80</strong>, its gradient is <strong>0.30</strong>, and the learning rate is <strong>0.10</strong>:
      </p>
      <div className="not-prose bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
        <p className="font-mono m-0">w_new = w_old − learning_rate × gradient</p>
        <p className="font-mono mt-2 mb-0">w_new = 0.80 − (0.10 × 0.30) = <strong>0.77</strong></p>
      </div>
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 2 — Training Loop: Forward Pass → Loss → Backprop → Update</figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 720 120" className="w-full max-w-3xl mx-auto block" aria-label="Training loop showing input data flowing forward through network to loss then gradients flowing backward to update weights">
              {/* Boxes */}
              {[
                ['Input\nData','#e0e7ff','#6366f1',30],
                ['Forward\nProp','#d1fae5','#10b981',165],
                ['Loss\nFunction','#fef3c7','#f59e0b',300],
                ['Backprop\n(Gradients)','#fee2e2','#ef4444',435],
                ['Update\nWeights','#ede9fe','#8b5cf6',570],
              ].map(([label,fill,stroke,x])=>(
                <g key={String(x)}>
                  <rect x={Number(x)} y="30" width="110" height="55" rx="10" fill={String(fill)} stroke={String(stroke)} strokeWidth="1.5"/>
                  {String(label).split('\n').map((line,i)=>(
                    <text key={i} x={Number(x)+55} y={55+i*16} textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">{line}</text>
                  ))}
                </g>
              ))}
              {/* Forward arrows */}
              {[140,275,410,545].map(x=>(
                <g key={x}>
                  <line x1={x} y1="57" x2={x+22} y2="57" stroke="#475569" strokeWidth="1.5"/>
                  <polygon points={`${x+22},52 ${x+27},57 ${x+22},62`} fill="#475569"/>
                </g>
              ))}
              {/* Backward arrow */}
              <path d="M 625,85 Q 625,108 400,108 Q 175,108 85,85" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3"/>
              <polygon points="85,85 80,92 90,92" fill="#ef4444"/>
              <text x="360" y="118" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="600">← Gradients flow backward (backpropagation)</text>
            </svg>
          </div>
        </figure>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Where Do All Those Parameters Come From?</h2>
      <p className="text-lg leading-relaxed mb-4">
        A dense layer connects every input to every neuron. So a layer with <strong>3 inputs</strong> and <strong>4 neurons</strong> has:
      </p>
      <div className="not-prose bg-violet-50 border border-violet-200 rounded-xl p-6 my-6">
        <p className="font-mono m-0">weights = 3 × 4 = 12</p>
        <p className="font-mono mt-2 mb-0">biases = 4</p>
        <p className="font-mono mt-2 mb-0 font-bold text-violet-900">total trainable parameters = 12 + 4 = 16</p>
      </div>
      <p className="text-lg leading-relaxed mb-8">
        General rule for a Dense layer: <strong>(number of inputs × number of neurons) + number of neurons</strong>. This is exactly the calculation you will see in the Keras model summary below.
      </p>

      {/* ── FULL TRAINING EXAMPLE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Complete Training Example with Keras</h2>
      <p className="text-lg leading-relaxed mb-4">
        Now let us train a neural network on the MNIST handwritten digits dataset — a classic benchmark. The goal is to classify 28×28 pixel images into digits 0–9:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">mnist_neural_network.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.utils import to_categorical

# ── Step 1: Load MNIST dataset ───────────────────────────
(X_train, y_train), (X_test, y_test) = mnist.load_data()

print("Training images:", X_train.shape)   # (60000, 28, 28)
print("Test images:", X_test.shape)        # (10000, 28, 28)
print("Pixel range before:", X_train.min(), "to", X_train.max())
# Output: Pixel range before: 0 to 255

# ── Step 2: Normalize pixels 0→255 to 0→1 ──────────────
X_train = X_train / 255.0
X_test  = X_test  / 255.0

# ── Step 3: One-hot encode labels ───────────────────────
# Label 3 → [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
y_train_ohe = to_categorical(y_train, 10)
y_test_ohe  = to_categorical(y_test, 10)

# ── Step 4: Build the network ────────────────────────────
model = Sequential([
    Flatten(input_shape=(28, 28)),   # 28x28=784 pixels → flat vector
    Dense(128, activation='relu'),   # Hidden layer 1: 784 → 128
    Dense(64,  activation='relu'),   # Hidden layer 2: 128 → 64
    Dense(10,  activation='softmax') # Output: 64 → 10 class probabilities
])

print("\\nModel Summary:")
model.summary()
# Layer (type)           Output Shape    Param #
# ─────────────────────────────────────────────
# flatten (Flatten)      (None, 784)     0
# dense (Dense)          (None, 128)     100,480  ← 784×128 + 128 biases
# dense_1 (Dense)        (None, 64)      8,256    ← 128×64 + 64 biases
# dense_2 (Dense)        (None, 10)      650      ← 64×10 + 10 biases
# Total trainable params: 109,386

# ── Step 5: Compile ──────────────────────────────────────
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',  # for multi-class (one-hot targets)
    metrics=['accuracy']
)

# ── Step 6: Train ────────────────────────────────────────
history = model.fit(
    X_train, y_train_ohe,
    epochs=10,
    batch_size=128,
    validation_split=0.1,  # use 10% of train set for validation
    verbose=1
)
# Example output (exact values can vary by TensorFlow version, hardware, and random initialization):
# Epoch  1/10 - loss: 0.2621 - accuracy: 0.9244 - val_accuracy: 0.9633
# Epoch  5/10 - loss: 0.0712 - accuracy: 0.9783 - val_accuracy: 0.9758
# Epoch 10/10 - loss: 0.0322 - accuracy: 0.9897 - val_accuracy: 0.9791

# ── Step 7: Evaluate on unseen test data ─────────────────
test_loss, test_acc = model.evaluate(X_test, y_test_ohe, verbose=0)
print(f"\\nTest Accuracy: {test_acc:.4f}")
# Output: Test Accuracy: 0.9785
# → The model correctly classifies 97.85% of unseen handwritten digits!

# ── Step 8: Inspect a prediction ─────────────────────────
import numpy as np
sample = X_test[0:1]                    # first test image
probs  = model.predict(sample)[0]      # 10 probabilities
pred   = np.argmax(probs)              # digit with highest probability
print(f"Predicted digit: {pred}")
print(f"Confidence: {probs[pred]*100:.1f}%")
print(f"Actual digit: {y_test[0]}")
# Output:
# Predicted digit: 7
# Confidence: 99.8%
# Actual digit: 7`}</pre>
      </div>

      {/* Line by line */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">Line-by-Line Explanation</h3>
      <div className="not-prose space-y-3 my-4">
        {[
          ['X_train / 255.0','Scales pixel values from 0–255 to 0–1. Keeping numeric inputs on a reasonable scale often makes optimization easier and more stable.'],
          ['to_categorical(y_train, 10)','One-hot encoding: digit 3 becomes [0,0,0,1,0,0,0,0,0,0]. This representation matches categorical_crossentropy in this example; alternatively, sparse_categorical_crossentropy can work directly with integer class labels.'],
          ['Flatten(input_shape=(28,28))','Reshapes the 28×28 2D image into a flat vector of 784 numbers. Dense (fully connected) layers expect 1D input, not 2D grids.'],
          ['Dense(128, activation="relu")','Creates 128 neurons, each connected to all 784 inputs. 128 × 784 = 100,352 weights, plus 128 biases = 100,480 parameters in this layer alone.'],
          ['Dense(10, activation="softmax")','10 output neurons, one per digit class. Softmax ensures all 10 probabilities sum to exactly 1.0, so they represent a proper probability distribution.'],
          ['loss="categorical_crossentropy"','Measures how far the predicted probability distribution is from the true one-hot label. If the true label is class 3 but we predict only 20% probability for class 3, the loss is high.'],
          ['np.argmax(probs)','Returns the index of the highest probability — the digit the model thinks is most likely. If probs = [0.01, 0.01, 0.01, 0.95, ...], argmax = 3.'],
        ].map(([code, exp]) => (
          <div key={String(code)} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 font-mono text-xs bg-slate-100 text-indigo-700 px-3 py-1 rounded h-fit mt-1 whitespace-nowrap">{code}</div>
            <p className="text-sm text-slate-700 leading-relaxed">{exp}</p>
          </div>
        ))}
      </div>

      {/* ── OVERFITTING ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Common Problems and How to Fix Them</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr><th className="p-3 text-left">Problem</th><th className="p-3 text-left">Symptom</th><th className="p-3 text-left">Fix</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['Overfitting','High train accuracy, low test accuracy','Add Dropout layers, reduce network size, use more data, L2 regularization'],
              ['Underfitting','Low train accuracy AND low test accuracy','Add more layers/neurons, train longer, reduce regularization'],
              ['Vanishing Gradient','Early layers learn nothing; loss stuck','Use ReLU instead of sigmoid; use BatchNorm; try residual connections'],
              ['Exploding Gradient','Loss becomes NaN or Inf during training','Reduce learning rate; add gradient clipping; use BatchNorm'],
              ['Dead ReLU neurons','Neurons always output 0, never update','Use Leaky ReLU; reduce learning rate; check weight initialization'],
              ['Slow convergence','Loss barely decreases each epoch','Switch to Adam optimizer; increase learning rate; check data scaling'],
            ].map(([prob,sym,fix])=>(
              <tr key={prob} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-rose-700">{prob}</td>
                <td className="p-3 text-slate-600">{sym}</td>
                <td className="p-3 text-emerald-700">{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10 border-b pb-2">Common Conceptual Mistakes</h2>
      <div className="not-prose space-y-3 mb-10">
        {[
          ['“A neuron understands one human-readable concept.”', 'Not necessarily. A learned unit is a mathematical feature detector, and its meaning may not map cleanly to a single human concept.'],
          ['“More layers always mean a better model.”', 'No. Extra capacity can increase computation and overfitting risk. Architecture should match the problem and available data.'],
          ['“The activation function creates the weights.”', 'No. The activation transforms a neuron’s pre-activation value; training adjusts the weights and biases.'],
          ['“Backpropagation itself updates the weights.”', 'Backpropagation computes gradients. An optimizer such as SGD or Adam uses those gradients to update parameters.'],
          ['“A 99% training accuracy means the model is excellent.”', 'Not by itself. Generalization should be checked on validation/test data that was not used to fit the model.'],
        ].map(([mistake, correction]) => (
          <div key={mistake} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-slate-900 mb-1">{mistake}</p>
            <p className="text-sm text-slate-700 m-0">{correction}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Quick Knowledge Check</h2>
      <div className="space-y-4 mb-12">
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">1. What are the two main calculations inside a neuron?</summary>
          <p className="mt-3 mb-0 text-slate-700">Compute a weighted sum plus bias, then apply an activation function.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">2. Why do hidden layers usually need non-linear activations?</summary>
          <p className="mt-3 mb-0 text-slate-700">Without non-linearity, stacking linear transformations still produces only another linear transformation, greatly limiting the patterns the network can represent.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">3. What is the difference between forward propagation and backpropagation?</summary>
          <p className="mt-3 mb-0 text-slate-700">Forward propagation computes predictions and loss. Backpropagation computes gradients of that loss with respect to the trainable parameters.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">4. A Dense layer receives 5 inputs and has 3 neurons. How many trainable parameters does it have?</summary>
          <p className="mt-3 mb-0 text-slate-700">(5 × 3) + 3 biases = <strong>18 parameters</strong>.</p>
        </details>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Neural networks are mathematical function approximators built from stacked layers of neurons. Each neuron computes a weighted sum of its inputs, adds a bias, and applies a non-linear activation function. Training uses forward propagation to make predictions, a loss function to measure error, backpropagation to compute gradients, and gradient descent to update weights. By stacking learned transformations, neural networks can represent complex non-linear relationships, although performance still depends on data quality, architecture, optimization, regularization, and evaluation.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
        <p className="text-slate-800 italic text-base leading-relaxed">
          Neural networks become much easier to understand when you reduce them to four ideas: weighted sums, activation functions, forward propagation, and gradient-based parameter updates. Once these are clear, deeper architectures are combinations and extensions of the same foundation.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Continue Learning</h2>
      <div className="not-prose grid md:grid-cols-2 gap-4 mb-10">
        <a href="/learn/multi-armed-bandits" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Previous</p>
          <p className="font-bold text-slate-900 m-0">Multi-Armed Bandits</p>
        </a>
        <a href="/learn/deep-learning-intro" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Next</p>
          <p className="font-bold text-slate-900 m-0">Deep Learning Introduction</p>
        </a>
      </div>
    </div>
  );
}
