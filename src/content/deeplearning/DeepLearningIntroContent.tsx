import React from 'react';

export function DeepLearningIntroContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Deep Learning — Complete Introduction</h1>
      <p className="text-lg text-slate-500 mb-6">From neurons to neural networks — why deep learning changed everything</p>

      {/* ── WHAT IS DEEP LEARNING ── */}
      <p className="text-lg leading-relaxed">
        Deep Learning is a subfield of Machine Learning that trains artificial neural networks with <strong>many layers</strong> (hence "deep") to learn representations of data automatically — without being explicitly programmed to extract features. It is the technology behind voice assistants, face recognition, self-driving cars, and ChatGPT.
      </p>

      {/* ML vs DL comparison table */}
      <div className="not-prose my-8">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Figure 1 — Traditional ML vs Deep Learning</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Aspect</th>
                <th className="p-3 text-left">Traditional ML</th>
                <th className="p-3 text-left">Deep Learning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                ['Feature Engineering','Manual — domain experts design features','Automatic — network learns features from raw data'],
                ['Data Required','Works on small to medium datasets','Needs large datasets (10k–millions of samples)'],
                ['Compute','CPU is sufficient','Requires GPUs / TPUs'],
                ['Interpretability','Moderate (decision trees, logistic reg.)','Low — often called a "black box"'],
                ['Best For','Tabular / structured data','Images, audio, text, video'],
                ['Examples','XGBoost, SVM, Random Forest','CNNs, RNNs, Transformers'],
              ].map(([a,b,c]) => (
                <tr key={a} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">{a}</td>
                  <td className="p-3 text-slate-600">{b}</td>
                  <td className="p-3 text-indigo-700 font-medium">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── WHY NOW ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Why Did Deep Learning Explode After 2012?</h2>
      <p className="text-lg leading-relaxed mb-4">
        Neural network theory dates back to the 1960s. The breakthrough came in 2012 when AlexNet crushed the ImageNet competition using GPUs. Three forces converged to make this possible:
      </p>
      <div className="not-prose grid md:grid-cols-3 gap-5 my-6">
        {[
          {icon:'🗄️', title:'Big Data', color:'indigo', desc:'The internet produced billions of labelled images, text, and audio samples. ImageNet alone has 14 million labelled images. Deep learning is data hungry — more data almost always means better accuracy.'},
          {icon:'⚡', title:'GPU Hardware', color:'emerald', desc:'Graphics cards (GPUs) contain thousands of small cores optimized for parallel matrix multiplication — the exact operation neural networks perform billions of times per training step. Training that took weeks on a CPU takes hours on a GPU.'},
          {icon:'🧪', title:'Algorithmic Improvements', color:'amber', desc:'ReLU activation killed the vanishing gradient problem. Dropout prevented overfitting. Adam optimizer converged faster. BatchNorm stabilized deep stacks. These small algorithmic discoveries unlocked networks of 100+ layers.'},
        ].map(f => (
          <div key={f.title} className={`bg-${f.color}-50 border border-${f.color}-200 rounded-xl p-5`}>
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className={`font-bold text-${f.color}-900 text-lg mb-2`}>{f.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── HOW A NEURON WORKS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">How a Single Neuron Computes</h2>
      <p className="text-lg leading-relaxed mb-4">
        Every neuron performs exactly two operations: a <strong>weighted sum</strong> of its inputs plus a bias, then an <strong>activation function</strong> that introduces non-linearity.
      </p>

      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
            Figure 2 — Single Neuron Computation
          </figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 680 240" className="w-full max-w-2xl mx-auto block" aria-label="Single neuron diagram showing inputs x1 x2 x3 with weights w1 w2 w3 feeding into a summation node then activation function producing output">
              {/* Inputs */}
              {[['x₁','w₁',60],['x₂','w₂',120],['x₃','w₃',180]].map(([x,w,y]) => (
                <g key={String(y)}>
                  <rect x="20" y={Number(y)-18} width="60" height="36" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
                  <text x="50" y={Number(y)+6} textAnchor="middle" fontSize="15" fontWeight="700" fill="#3730a3">{x}</text>
                  <line x1="80" y1={Number(y)} x2="240" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2"/>
                  <rect x="110" y={Number(y)-12} width="48" height="24" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1"/>
                  <text x="134" y={Number(y)+5} textAnchor="middle" fontSize="12" fontWeight="600" fill="#92400e">{w}</text>
                </g>
              ))}
              {/* Bias */}
              <rect x="20" y="222" width="60" height="30" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
              <text x="50" y="242" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9d174d">b</text>
              <line x1="80" y1="237" x2="240" y2="140" stroke="#f9a8d4" strokeWidth="1.5" strokeDasharray="4 2"/>
              {/* Summation circle */}
              <circle cx="270" cy="120" r="32" fill="#6366f1" stroke="#4338ca" strokeWidth="2"/>
              <text x="270" y="126" textAnchor="middle" fontSize="20" fill="white" fontWeight="700">Σ</text>
              <text x="270" y="168" textAnchor="middle" fontSize="11" fill="#64748b">Weighted Sum</text>
              {/* Arrow to activation */}
              <line x1="302" y1="120" x2="390" y2="120" stroke="#475569" strokeWidth="2"/>
              <polygon points="390,115 400,120 390,125" fill="#475569"/>
              <text x="345" y="112" textAnchor="middle" fontSize="11" fill="#64748b">z = Σwx+b</text>
              {/* Activation box */}
              <rect x="400" y="95" width="120" height="50" rx="10" fill="#10b981" stroke="#059669" strokeWidth="2"/>
              <text x="460" y="118" textAnchor="middle" fontSize="13" fill="white" fontWeight="700">Activation</text>
              <text x="460" y="135" textAnchor="middle" fontSize="11" fill="#d1fae5">f(z) = ReLU/Sigmoid</text>
              {/* Output */}
              <line x1="520" y1="120" x2="600" y2="120" stroke="#475569" strokeWidth="2"/>
              <polygon points="600,115 610,120 600,125" fill="#475569"/>
              <rect x="610" y="100" width="60" height="40" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
              <text x="640" y="125" textAnchor="middle" fontSize="14" fontWeight="700" fill="#15803d">ŷ</text>
            </svg>
          </div>
        </figure>
      </div>

      {/* ── DEEP NETWORK ARCHITECTURE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Deep Network Architecture — Layers Explained</h2>
      <p className="text-lg leading-relaxed mb-4">
        A deep neural network stacks many neuron layers. Each layer transforms its input into a richer representation that the next layer builds upon:
      </p>

      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
            Figure 3 — Deep Neural Network with 2 Hidden Layers
          </figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 640 280" className="w-full max-w-2xl mx-auto block" aria-label="Deep neural network diagram showing input layer with 3 nodes, two hidden layers with 4 nodes each, and output layer with 2 nodes">
              {/* Layer labels */}
              {[['Input\nLayer',80],['Hidden\nLayer 1',220],['Hidden\nLayer 2',380],['Output\nLayer',540]].map(([label,x]) => (
                <text key={String(x)} x={Number(x)} y="268" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">{String(label).split('\n').map((l,i)=><tspan key={i} x={Number(x)} dy={i===0?0:13}>{l}</tspan>)}</text>
              ))}
              {/* Input nodes (3) */}
              {[60,130,200].map((y,i)=>(
                <g key={y}>
                  <circle cx="80" cy={y} r="20" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                  <text x="80" y={y+5} textAnchor="middle" fontSize="12" fill="#3730a3" fontWeight="700">x{i+1}</text>
                </g>
              ))}
              {/* Hidden layer 1 nodes (4) */}
              {[45,100,160,215].map((y,i)=>(
                <g key={y}>
                  <circle cx="220" cy={y} r="20" fill="#6366f1" stroke="#4338ca" strokeWidth="2"/>
                  <text x="220" y={y+5} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">h{i+1}</text>
                </g>
              ))}
              {/* Hidden layer 2 nodes (4) */}
              {[45,100,160,215].map((y,i)=>(
                <g key={y}>
                  <circle cx="380" cy={y} r="20" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                  <text x="380" y={y+5} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">h{i+1}</text>
                </g>
              ))}
              {/* Output nodes (2) */}
              {[90,170].map((y,i)=>(
                <g key={y}>
                  <circle cx="540" cy={y} r="20" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                  <text x="540" y={y+5} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">o{i+1}</text>
                </g>
              ))}
              {/* Connections input→h1 */}
              {[60,130,200].map(iy=>[45,100,160,215].map(hy=>(
                <line key={`${iy}-${hy}`} x1="100" y1={iy} x2="200" y2={hy} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.7"/>
              )))}
              {/* Connections h1→h2 */}
              {[45,100,160,215].map(iy=>[45,100,160,215].map(hy=>(
                <line key={`h1${iy}-h2${hy}`} x1="240" y1={iy} x2="360" y2={hy} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.7"/>
              )))}
              {/* Connections h2→output */}
              {[45,100,160,215].map(iy=>[90,170].map(hy=>(
                <line key={`h2${iy}-o${hy}`} x1="400" y1={iy} x2="520" y2={hy} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.7"/>
              )))}
            </svg>
          </div>
        </figure>
      </div>

      {/* ── ACTIVATION FUNCTIONS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Activation Functions — The Non-Linearity Engine</h2>
      <p className="text-lg leading-relaxed mb-4">
        Without activation functions, stacking layers is pointless — a stack of linear transformations is still just one linear transformation. Activation functions inject non-linearity, allowing the network to model complex, curved decision boundaries.
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Function</th>
              <th className="p-3 text-left">Formula</th>
              <th className="p-3 text-left">Output Range</th>
              <th className="p-3 text-left">Best Used In</th>
              <th className="p-3 text-left">Watch Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['Sigmoid','1/(1+e⁻ˣ)','(0, 1)','Output layer for binary classification','Vanishing gradients in deep nets'],
              ['Tanh','(eˣ−e⁻ˣ)/(eˣ+e⁻ˣ)','(−1, 1)','Hidden layers (better than sigmoid)','Still suffers from vanishing gradients'],
              ['ReLU','max(0, x)','[0, ∞)','Hidden layers — default choice','Dead neurons when x < 0 always'],
              ['Leaky ReLU','max(0.01x, x)','(−∞, ∞)','Hidden layers (fixes dead ReLU)','Small negative slope is a hyperparameter'],
              ['Softmax','eˣⁱ / Σeˣʲ','(0,1), sums to 1','Output layer for multi-class','Only use in final layer'],
            ].map(([fn,form,rng,use,warn])=>(
              <tr key={fn} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700">{fn}</td>
                <td className="p-3 font-mono text-xs text-slate-700">{form}</td>
                <td className="p-3 text-slate-600">{rng}</td>
                <td className="p-3 text-emerald-700">{use}</td>
                <td className="p-3 text-rose-600">{warn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── FORWARD + BACK PROP ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Forward Propagation + Backpropagation — The Training Loop</h2>
      <div className="not-prose grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-900 text-lg mb-3">➡️ Forward Propagation</h3>
          <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-4">
            <li>Input data enters the Input Layer</li>
            <li>Each neuron computes <strong>z = Σ(w·x) + b</strong></li>
            <li>Apply activation function: <strong>a = f(z)</strong></li>
            <li>Pass output to the next layer</li>
            <li>Final layer produces prediction ŷ</li>
            <li>Loss function measures error: <strong>L(ŷ, y)</strong></li>
          </ol>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 text-lg mb-3">⬅️ Backpropagation</h3>
          <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-4">
            <li>Compute gradient of Loss w.r.t. output: ∂L/∂ŷ</li>
            <li>Use chain rule to propagate gradient backward</li>
            <li>Compute ∂L/∂w for every weight in the network</li>
            <li>Update: <strong>w ← w − η · ∂L/∂w</strong> (gradient descent)</li>
            <li>Repeat forward + backward for all batches</li>
            <li>One full pass = one epoch</li>
          </ol>
        </div>
      </div>

      {/* ── PYTHON CODE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Python Example — Build and Train a Deep Network</h2>
      <p className="text-lg leading-relaxed mb-4">
        Let us build a deep neural network with Keras on the classic breast cancer dataset and walk through every line:
      </p>

      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"/>
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"/>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"/>
          <span className="ml-2">deep_learning_intro.py</span>
        </div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`# ── Step 1: Imports ──────────────────────────────────────
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping

# ── Step 2: Load & prepare data ──────────────────────────
data = load_breast_cancer()          # 569 samples, 30 features, 2 classes
X, y = data.data, data.target        # X: float features, y: 0=malignant/1=benign

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)                                    # 80% train, 20% test

# Scale features: neural nets need features in similar ranges
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # learns mean/std from training set
X_test  = scaler.transform(X_test)        # applies same transform to test set

# ── Step 3: Build the network ────────────────────────────
model = Sequential([
    Dense(64, activation='relu', input_shape=(30,)),  # Hidden layer 1: 30→64
    Dropout(0.3),                                      # Drop 30% neurons to reduce overfitting
    Dense(32, activation='relu'),                      # Hidden layer 2: 64→32
    Dropout(0.2),                                      # Drop 20% neurons
    Dense(1,  activation='sigmoid')                    # Output: probability of class 1 (benign)
])

# ── Step 4: Compile ──────────────────────────────────────
model.compile(
    optimizer='adam',                   # Adam: adaptive learning rates
    loss='binary_crossentropy',         # standard loss for binary classification
    metrics=['accuracy']
)

model.summary()
# Output:
# Layer (type)          Output Shape   Param #
# ────────────────────────────────────────────
# dense (Dense)         (None, 64)     1,984     ← 30*64 + 64 biases
# dropout (Dropout)     (None, 64)     0
# dense_1 (Dense)       (None, 32)     2,080     ← 64*32 + 32 biases
# dropout_1 (Dropout)   (None, 32)     0
# dense_2 (Dense)       (None, 1)      33        ← 32*1 + 1 bias
# Total params: 4,097

# ── Step 5: Train ────────────────────────────────────────
early_stop = EarlyStopping(
    monitor='val_loss',    # watch validation loss
    patience=10,           # stop if no improvement for 10 epochs
    restore_best_weights=True
)

history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_split=0.2,  # use 20% of training data to validate each epoch
    callbacks=[early_stop],
    verbose=1
)
# Output (sample):
# Epoch 1/100 - loss: 0.5821 - accuracy: 0.7253 - val_loss: 0.4312 - val_accuracy: 0.8901
# Epoch 2/100 - loss: 0.4102 - accuracy: 0.8571 - val_loss: 0.3201 - val_accuracy: 0.9231
# ...
# Epoch 38/100 - loss: 0.0812 - accuracy: 0.9780 - val_loss: 0.0743 - val_accuracy: 0.9780
# Early stopping triggered at epoch 38.

# ── Step 6: Evaluate ─────────────────────────────────────
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"Test Accuracy: {accuracy:.4f}")
# Output: Test Accuracy: 0.9737

# ── Step 7: Make predictions ─────────────────────────────
probs = model.predict(X_test[:5])           # probabilities between 0 and 1
preds = (probs > 0.5).astype(int).flatten() # threshold at 0.5 → class 0 or 1
print("Predicted:", preds)
print("Actual:   ", y_test[:5])
# Output:
# Predicted: [1 0 1 1 1]
# Actual:    [1 0 1 1 1]`}</pre>
      </div>

      {/* Line by line explanation */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">Line-by-Line Explanation</h3>
      <div className="not-prose space-y-3 my-4">
        {[
          ['StandardScaler()','Neural networks are sensitive to feature scale. Without scaling, a feature with values 0–10,000 dominates features with values 0–1. Scaling brings all features to mean=0, std=1.'],
          ['Dense(64, activation="relu")','A fully-connected layer with 64 neurons. Each neuron connects to every input. ReLU means: output = max(0, z). This is the standard hidden layer choice.'],
          ['Dropout(0.3)','During training, randomly sets 30% of neuron outputs to zero each batch. Forces the network not to rely on any single neuron — a powerful regularization trick that reduces overfitting.'],
          ['Dense(1, activation="sigmoid")','Output layer with 1 neuron. Sigmoid squashes any number into (0,1), giving us a probability. Values >0.5 predict class 1 (benign).'],
          ['optimizer="adam"','Adam (Adaptive Moment Estimation) automatically adjusts the learning rate per parameter. It is almost always the right choice for deep learning — faster convergence than plain SGD.'],
          ['loss="binary_crossentropy"','The loss function for binary classification. Measures how far the predicted probability is from the true label (0 or 1). Minimizing this is the training objective.'],
          ['EarlyStopping(patience=10)','Stops training if validation loss does not improve for 10 epochs in a row, then restores the weights from the best epoch. Prevents overfitting and wasted compute.'],
          ['validation_split=0.2','Reserves 20% of training data to evaluate the model at the end of each epoch. This is never seen by the network during the forward/backward pass.'],
        ].map(([code, exp]) => (
          <div key={String(code)} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 font-mono text-xs bg-slate-100 text-indigo-700 px-3 py-1 rounded h-fit mt-1 whitespace-nowrap">{code}</div>
            <p className="text-sm text-slate-700 leading-relaxed">{exp}</p>
          </div>
        ))}
      </div>

      {/* ── ARCHITECTURE TYPES ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Neural Network Architecture Zoo</h2>
      <div className="not-prose my-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">Figure 4 — Deep Learning Architecture Tree</p>
        <div className="flex flex-col items-center min-w-[560px]">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow">Deep Learning Architectures</div>
          <div className="w-0.5 bg-slate-300 h-6"/>
          <div className="relative w-[92%] border-t-2 border-slate-300">
            {[0,33,66,100].map(p=><div key={p} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{left:`${p}%`,transform:'translateX(-50%)'}}/>)}
          </div>
          <div className="grid grid-cols-4 w-[96%] gap-3 mt-6">
            {[
              {label:'CNN',sub:'Convolutional Neural Net',color:'emerald',items:['Image Classification','Object Detection','Face Recognition','Medical Imaging']},
              {label:'RNN / LSTM',sub:'Recurrent Neural Net',color:'amber',items:['Time Series','Speech Recognition','Machine Translation','Text Generation']},
              {label:'GAN',sub:'Generative Adversarial Net',color:'rose',items:['Image Generation','DeepFakes','Data Augmentation','Style Transfer']},
              {label:'Transformer',sub:'Attention-Based',color:'violet',items:['ChatGPT / LLMs','BERT / GPT','Vision Transformers','Code Generation']},
            ].map(a=>(
              <div key={a.label} className="flex flex-col items-center">
                <div className={`bg-${a.color}-100 border-2 border-${a.color}-400 text-${a.color}-900 px-3 py-2 rounded-lg font-bold text-xs mb-1 w-full text-center`}>{a.label}</div>
                <div className={`text-xs text-${a.color}-700 mb-2 text-center font-medium`}>{a.sub}</div>
                <div className="w-0.5 bg-slate-300 h-4"/>
                <div className="space-y-1 w-full">
                  {a.items.map(it=><div key={it} className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-center shadow-sm">{it}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FRAMEWORKS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">TensorFlow vs PyTorch — Which to Choose?</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-white">
            <tr><th className="p-3 text-left">Feature</th><th className="p-3 text-left">TensorFlow / Keras</th><th className="p-3 text-left">PyTorch</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['Created by','Google','Meta (Facebook)'],
              ['API style','High-level Keras API','Pythonic, feels like NumPy'],
              ['Computation graph','Static (XLA) + Eager','Dynamic (define-by-run)'],
              ['Deployment','TF Lite, TF.js, TF Serving','TorchScript, ONNX'],
              ['Research papers','Less dominant','80%+ of ML papers use PyTorch'],
              ['Learning curve','Easier for beginners','Slightly steeper, more flexible'],
              ['Best for','Production, mobile, web','Research, experimentation'],
            ].map(([f,tf,pt])=>(
              <tr key={f} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-700">{f}</td>
                <td className="p-3 text-orange-700">{tf}</td>
                <td className="p-3 text-indigo-700">{pt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
        <p className="text-sm text-blue-800"><strong>Recommendation:</strong> Learn Keras first (simpler, faster to prototype). Then learn PyTorch when you need more control for research or custom architectures. Both are equally valid for production.</p>
      </div>

      {/* ── WHEN NOT TO USE DL ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">When NOT to Use Deep Learning</h2>
      <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-bold text-emerald-900 mb-3">✅ Use Deep Learning When:</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {['Data is unstructured: images, audio, raw text, video','You have 10,000+ training samples','You need state-of-the-art accuracy and have compute budget','Feature engineering is difficult or impossible','You are doing NLP, computer vision, or speech'].map(i=><li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{i}</li>)}
          </ul>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 mb-3">❌ Prefer Traditional ML When:</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {['Data is tabular/structured (XGBoost usually wins here)','You have less than 1,000–5,000 samples','Interpretability and explainability are required','Compute budget is limited (CPU only)','You need rapid deployment with minimal tuning'].map(i=><li key={i} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5 flex-shrink-0">✗</span>{i}</li>)}
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Deep Learning uses stacked layers of artificial neurons to automatically learn hierarchical representations of raw data. The core training loop — forward propagation to make a prediction, compute the loss, backpropagate gradients, update weights — repeats thousands of times until the model converges. GPUs, big data, and algorithmic innovations (ReLU, dropout, Adam) unlocked the potential of networks hundreds of layers deep.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
        <p className="text-slate-800 italic text-base leading-relaxed">
          For structured tabular data, XGBoost almost always beats neural networks with far less effort. Deep Learning wins decisively on unstructured data — images, audio, text — where traditional feature engineering fails. Always start simple, then go deep only when justified.
        </p>
      </div>
    </div>
  );
}
