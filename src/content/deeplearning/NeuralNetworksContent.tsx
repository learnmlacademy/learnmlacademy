import React from 'react';

export function NeuralNetworksContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Neural Networks — Complete Deep Dive</h1>
      <p className="text-lg text-slate-500 mb-6">Weights, biases, activation functions, forward pass, backprop — everything explained with code and visuals</p>

      {/* ── INTRO ── */}
      <p className="text-lg leading-relaxed">
        A Neural Network is a mathematical function that maps inputs to outputs by stacking layers of simple computational units called <strong>neurons</strong>. Each neuron performs a weighted sum of its inputs, adds a bias, and passes the result through an activation function. Training is the process of adjusting these weights and biases so the network's outputs match the desired targets.
      </p>

      {/* ── BIOLOGICAL ANALOGY ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Biological Inspiration</h2>
      <p className="text-lg leading-relaxed mb-4">
        The design is loosely inspired by how biological neurons work in the brain. A biological neuron receives electrical signals via <strong>dendrites</strong>, processes them in the <strong>cell body (soma)</strong>, and fires an output signal along the <strong>axon</strong> to other neurons — but only if the combined signal exceeds a threshold. Artificial neurons mirror this structure mathematically:
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
          {name:'Input Layer', color:'indigo', icon:'📥', desc:'Receives the raw feature data. One neuron per feature. No computation happens here — it simply passes data to the first hidden layer. If your dataset has 30 features, your input layer has 30 neurons.'},
          {name:'Hidden Layers', color:'violet', icon:'🧠', desc:'Where all the learning happens. Each hidden layer learns increasingly abstract representations. Layer 1 might detect edges in an image; Layer 5 might detect faces. The more layers, the more complex patterns the network can represent. "Deep" learning means 3+ hidden layers.'},
          {name:'Output Layer', color:'emerald', icon:'📤', desc:'Produces the final prediction. Its size depends on the task: 1 neuron with sigmoid for binary classification, N neurons with softmax for N-class classification, 1 neuron with linear activation for regression.'},
        ].map(l=>(
          <div key={l.name} className={`bg-${l.color}-50 border border-${l.color}-200 rounded-xl p-5 flex gap-4`}>
            <span className="text-3xl flex-shrink-0">{l.icon}</span>
            <div>
              <h3 className={`font-bold text-${l.color}-900 text-lg mb-1`}>{l.name}</h3>
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
# → Between -1 and 1. Zero-centered — better than sigmoid for hidden layers.

# ── 3. ReLU ──────────────────────────────────────────────
def relu(z):
    return np.maximum(0, z)

print("ReLU:", relu(z))
# Output: [0.  0.  0.  1.  3.]
# → Negative inputs → 0. Positive inputs unchanged.
# → Fastest to train; default choice for hidden layers.

# ── 4. Leaky ReLU ────────────────────────────────────────
def leaky_relu(z, alpha=0.01):
    return np.where(z > 0, z, alpha * z)

print("Leaky ReLU:", leaky_relu(z))
# Output: [-0.03  -0.01   0.     1.     3.  ]
# → Small negative slope for z<0. Fixes "dying ReLU" problem.

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
# e.g., Z1 = [[ 0.249  3.101 -1.508]]

A1 = np.maximum(0, Z1)       # ReLU activation
print("A1 (post-ReLU):", np.round(A1, 3))
# e.g., A1 = [[ 0.249  3.101  0.   ]]
# Note: -1.508 became 0 → that neuron is "off"

# ── Forward pass through Output Layer ────────────────────
Z2 = np.dot(A1, W2) + b2     # (1,3) @ (3,1) = (1,1)
print("Z2 (pre-activation):", np.round(Z2, 3))
# e.g., Z2 = [[1.842]]

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
        Backpropagation computes how much each weight contributed to the error, then adjusts weights in the direction that reduces the error. It uses the <strong>chain rule of calculus</strong> to propagate gradients layer by layer from output back to input.
      </p>
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
# Sample output:
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
          ['X_train / 255.0','Normalizes pixel values from 0–255 to 0–1. Neural networks converge much faster when all inputs are in the same small range. Without this, large pixel values would cause massive, unstable gradient updates.'],
          ['to_categorical(y_train, 10)','One-hot encoding: digit 3 becomes [0,0,0,1,0,0,0,0,0,0]. Required because softmax outputs 10 probabilities and we need 10 targets — one per class.'],
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

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Neural networks are mathematical function approximators built from stacked layers of neurons. Each neuron computes a weighted sum of its inputs, adds a bias, and applies a non-linear activation function. Training uses forward propagation to make predictions, a loss function to measure error, backpropagation to compute gradients, and gradient descent to update weights. With enough data and the right architecture, neural networks can learn extraordinarily complex patterns.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
        <p className="text-slate-800 italic text-base leading-relaxed">
          Neural networks are not magic — they are optimization algorithms running on differentiable mathematical functions. Every "intelligence" emerges from billions of tiny weight adjustments, each nudged a little in the direction that reduces error. Understanding forward propagation and backpropagation deeply is the foundation for mastering any advanced deep learning architecture.
        </p>
      </div>
    </div>
  );
}
