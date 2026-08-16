import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  RefreshCw,
  ShieldAlert,
  Stream,
  XCircle,
  Zap,
} from 'lucide-react';

export function OnlineLearningContent() {
  return (
    <div id="online-learning-guide">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Online Learning
      </h1>

      <div className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border border-indigo-200 rounded-2xl p-6 md:p-8 mb-8 not-prose">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">What if your data never stops?</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">A fraud model cannot wait forever for the next full retraining cycle.</h2>
        <p className="text-slate-700 leading-relaxed mb-3">
          Imagine a bank receiving thousands of new transactions every minute. Customer behaviour changes, new fraud patterns appear, and fresh labelled examples keep arriving. Retraining the entire model from zero after every small change would be wasteful.
        </p>
        <p className="text-slate-800 leading-relaxed m-0">
          <strong>Online learning</strong> gives us another option: keep the model's current knowledge and update it a little as new information arrives.
        </p>
      </div>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Most introductory Machine Learning examples use <strong>batch learning</strong>: collect a dataset, train a model, deploy it, and retrain later. That approach is often the simplest and safest choice.
      </p>

      <p className="text-lg leading-relaxed mb-8 text-slate-800">
        <strong>Online learning</strong>, also called <strong>incremental learning</strong>, is different. The model can continue learning from new labelled examples or mini-batches without throwing away everything it has already learned.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-10 not-prose">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-4">The core loop</p>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 text-center">
          {[
            { label: 'New observation arrives', icon: <Database className="w-6 h-6 mx-auto mb-2" /> },
            { label: 'Predict with current model', icon: <Gauge className="w-6 h-6 mx-auto mb-2" /> },
            { label: 'Observe label and error', icon: <CheckCircle2 className="w-6 h-6 mx-auto mb-2" /> },
            { label: 'Update, then repeat', icon: <RefreshCw className="w-6 h-6 mx-auto mb-2" /> },
          ].map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="flex-1 bg-white border border-indigo-100 rounded-xl p-4 text-sm font-semibold text-slate-800">
                {step.icon}
                {step.label}
              </div>
              {index < 3 && <ArrowRight className="w-5 h-5 text-indigo-400 mx-auto rotate-90 md:rotate-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 mb-10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Important idea</h3>
            <p className="text-amber-900 leading-relaxed m-0">
              Online learning does <strong>not</strong> mean that every prediction system must retrain after every single event. Updates may happen one sample at a time or in small mini-batches. The defining idea is that the model can continue learning from new data without starting from zero each time.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">The Big Idea: Do Not Start From Zero</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Suppose a model has already learned from the first <strong>1,000 observations</strong>. Now 100 new labelled observations arrive. A full batch retraining process may train again using all 1,100 observations. An incremental learner can instead start from the model it already has and update it using the new information.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-10 not-prose">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Full retraining idea</p>
          <div className="text-sm font-semibold text-slate-800 space-y-2">
            <div className="bg-white border rounded-lg p-3">Old 1,000 + new 100 observations</div>
            <div className="text-center text-slate-400">↓</div>
            <div className="bg-white border rounded-lg p-3">Train a new model again</div>
          </div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">Incremental idea</p>
          <div className="text-sm font-semibold text-emerald-900 space-y-2">
            <div className="bg-white border border-emerald-200 rounded-lg p-3">Existing trained model</div>
            <div className="text-center text-emerald-500">+ new 100 observations ↓</div>
            <div className="bg-white border border-emerald-200 rounded-lg p-3">Updated model</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-5 mb-12">
        <p className="text-blue-900 leading-relaxed m-0">
          <strong>Mental model:</strong> online learning is usually about <em>old model state + new data → updated model state</em>. The algorithm remembers what it has already learned and adjusts from there.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Batch Learning vs Online Learning</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10 not-prose">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-600" /> Batch Learning
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            <p><strong>Typical flow:</strong> collect data → train → deploy → retrain later.</p>
            <p>The model normally stays fixed between retraining cycles.</p>
            <p>Often simpler to reproduce, validate, and govern.</p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" /> Online Learning
          </h3>
          <div className="space-y-3 text-sm text-emerald-900">
            <p><strong>Typical flow:</strong> receive new data → predict → update → continue.</p>
            <p>The model can adapt incrementally as labelled data becomes available.</p>
            <p>Useful for streams, very large datasets, or changing environments.</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-12 not-prose">
        <table className="w-full text-sm bg-white">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Online / Incremental</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-semibold">How is the model updated?</td><td className="p-3">Periodic retraining</td><td className="p-3">Incremental updates</td></tr>
            <tr><td className="p-3 font-semibold">Must all data fit in memory?</td><td className="p-3">Not always, but commonly assumed</td><td className="p-3">No; can process small chunks</td></tr>
            <tr><td className="p-3 font-semibold">Can it react quickly to change?</td><td className="p-3">Depends on retraining frequency</td><td className="p-3">Potentially, if feedback arrives quickly</td></tr>
            <tr><td className="p-3 font-semibold">Operational complexity</td><td className="p-3">Usually lower</td><td className="p-3">Usually higher</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Do Not Confuse These Terms</h2>

      <div className="space-y-4 mb-12 not-prose">
        {[
          {
            title: 'Online learning',
            text: 'The model itself is updated incrementally as new labelled examples or feedback become available.',
          },
          {
            title: 'Streaming inference',
            text: 'Predictions are made on a live stream, but the model may remain completely fixed. Streaming prediction is not automatically online learning.',
          },
          {
            title: 'Out-of-core learning',
            text: 'Data is processed in chunks because the full dataset is too large for RAM. The dataset can be historical and fixed; it does not have to be a live stream.',
          },
          {
            title: 'Reinforcement learning',
            text: 'An agent chooses actions and learns from rewards. It is a different learning paradigm, even though learning may also happen sequentially.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed m-0">{item.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">A Tiny Numerical Example: Updating Without Recalculating Everything</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Before updating a Machine Learning model, look at the same idea using something familiar: a running mean. Suppose we have already seen the values <strong>10, 20, 30</strong>. Their mean is 20. Now a new value, <strong>40</strong>, arrives.
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 not-prose">
        <p className="text-sm text-slate-600 mb-2">Old mean</p>
        <p className="font-mono text-lg text-slate-900 mb-5">(10 + 20 + 30) / 3 = 20</p>
        <p className="text-sm text-slate-600 mb-2">Incremental update</p>
        <p className="font-mono text-lg text-indigo-800 mb-2">new mean = old mean + (new value - old mean) / new count</p>
        <p className="font-mono text-lg text-slate-900 mb-2">= 20 + (40 - 20) / 4</p>
        <p className="font-mono text-lg font-bold text-emerald-700 m-0">= 25</p>
      </div>

      <p className="text-lg leading-relaxed mb-10 text-slate-800">
        We reached the same mean as <code>(10 + 20 + 30 + 40) / 4</code>, but the update rule only needed the previous state, the new value, and the count. Incremental Machine Learning algorithms use the same broad principle, although their state and update rules are more sophisticated.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">From Intuition to Model Updates</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Many incremental linear models can be understood using a Stochastic Gradient Descent style update:
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 not-prose">
        <p className="text-center text-xl font-serif text-indigo-800 mb-4">w<sub>new</sub> = w<sub>old</sub> − η × gradient</p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-white border rounded-lg p-3"><strong>w</strong><br />model parameter</div>
          <div className="bg-white border rounded-lg p-3"><strong>η</strong><br />learning rate</div>
          <div className="bg-white border rounded-lg p-3"><strong>gradient</strong><br />direction of local loss change</div>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Suppose the current weight is <strong>0.50</strong>, the learning rate is <strong>0.10</strong>, and the gradient from the new example is <strong>−0.40</strong>.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-10 not-prose">
        <p className="font-mono text-slate-900 mb-2">w_new = 0.50 − 0.10 × (−0.40)</p>
        <p className="font-mono text-slate-900 mb-2">w_new = 0.50 + 0.04</p>
        <p className="font-mono font-bold text-indigo-800 m-0">w_new = 0.54</p>
      </div>

      <p className="text-lg leading-relaxed mb-10 text-slate-800">
        The model has changed a little after seeing new information. Online learning repeats this type of update many times. The exact update depends on the algorithm and its loss function.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">How Often Can We Update?</h2>

      <div className="grid md:grid-cols-3 gap-5 mb-12 not-prose">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-800 mb-2">One sample at a time</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Update after every labelled observation. This can adapt quickly but may react strongly to noisy observations.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-800 mb-2">Mini-batch updates</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Collect a small chunk such as 32, 100, or 1000 observations and update once per chunk. This is often more computationally convenient.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-800 mb-2">Periodic incremental updates</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Update every few minutes, hours, or days without retraining from scratch. The right cadence depends on feedback delay and business needs.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">See <code>partial_fit()</code> in the Simplest Possible Way</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Scikit-learn's <code>StandardScaler</code> can update its running mean and variance with <code>partial_fit()</code>. This gives us a clean bridge from the running-mean intuition to a real API.
      </p>

      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg mb-5 not-prose">
        <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs">partial_fit_scaler.py</div>
        <pre className="p-5 text-sm text-slate-100 overflow-x-auto leading-relaxed"><code>{`from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

batch_1 = [[10], [20], [30]]
scaler.partial_fit(batch_1)
print(scaler.mean_)

batch_2 = [[40], [50]]
scaler.partial_fit(batch_2)
print(scaler.mean_)`}</code></pre>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-10 not-prose">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Output</p>
          <pre className="text-sm text-slate-800 m-0"><code>{`[20.]
[30.]`}</code></pre>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="font-bold text-emerald-900 mb-2">Why does the mean become 30?</p>
          <p className="font-mono text-sm text-emerald-900 mb-2">(10 + 20 + 30 + 40 + 50) / 5 = 30</p>
          <p className="text-sm text-emerald-900 m-0">The second call updated the scaler's existing statistics instead of forgetting the first batch.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-12 not-prose">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 mb-2">Repeated <code>fit()</code></h3>
          <p className="text-sm text-rose-800 m-0">Conceptually starts a new fitting procedure and generally replaces previously learned estimator state.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-900 mb-2"><code>partial_fit()</code></h3>
          <p className="text-sm text-green-800 m-0">Continues incremental learning from the estimator's current state using the next sample or mini-batch.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Python: Incremental Learning with <code>partial_fit()</code></h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Scikit-learn provides several estimators with a <code>partial_fit()</code> method. Each call updates an already-existing model using the supplied mini-batch instead of restarting training from the beginning.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <div className="flex gap-3">
          <Cpu className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
          <p className="text-blue-900 leading-relaxed m-0">
            For classifiers such as <code>SGDClassifier</code>, the complete set of possible classes must be supplied on the <strong>first</strong> <code>partial_fit()</code> call. Later calls can omit it.
          </p>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        The example below uses an initial <strong>200-sample warm-up period</strong>. The scaler is fitted only on that historical chunk and then frozen. The remaining 1000 samples arrive in 100-sample batches.
      </p>

      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg mb-6 not-prose">
        <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs">online_learning.py</div>
        <pre className="p-5 text-sm text-slate-100 overflow-x-auto leading-relaxed"><code>{`import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

X, y = make_classification(
    n_samples=1200,
    n_features=10,
    n_informative=6,
    n_redundant=2,
    class_sep=1.2,
    flip_y=0.03,
    random_state=42,
)

warmup = 200
batch_size = 100
classes = np.array([0, 1])

# Use only historical data to learn scaling statistics.
scaler = StandardScaler().fit(X[:warmup])

model = SGDClassifier(
    loss="log_loss",
    learning_rate="constant",
    eta0=0.01,
    alpha=0.0001,
    random_state=42,
)

# First incremental update.
X0 = scaler.transform(X[:warmup])
model.partial_fit(X0, y[:warmup], classes=classes)

correct = 0
seen = 0
batch_scores = []

for start in range(warmup, len(X), batch_size):
    stop = min(start + batch_size, len(X))
    X_batch = scaler.transform(X[start:stop])
    y_batch = y[start:stop]

    # 1. TEST FIRST: predict before learning this batch.
    y_pred = model.predict(X_batch)
    batch_scores.append(accuracy_score(y_batch, y_pred))
    correct += (y_pred == y_batch).sum()
    seen += len(y_batch)

    # 2. THEN TRAIN on the newly labelled batch.
    model.partial_fit(X_batch, y_batch)

print("Warm-up samples:", warmup)
print("Streamed samples:", seen)
print("First 3 batch accuracies:", [round(s, 3) for s in batch_scores[:3]])
print("Prequential accuracy:", round(correct / seen, 3))`}</code></pre>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-10 not-prose">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Expected output</p>
        <pre className="text-sm text-slate-800 overflow-x-auto m-0"><code>{`Warm-up samples: 200
Streamed samples: 1000
First 3 batch accuracies: [0.8, 0.8, 0.82]
Prequential accuracy: 0.811`}</code></pre>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">Spot the Bug: Which Stream Evaluation Is Honest?</h3>

      <div className="grid md:grid-cols-2 gap-5 mb-8 not-prose">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3">Pipeline A — misleading</p>
          <div className="space-y-2 text-sm font-semibold text-rose-900">
            <div className="bg-white border border-rose-200 rounded-lg p-3">New batch arrives</div>
            <div className="text-center">↓</div>
            <div className="bg-white border border-rose-200 rounded-lg p-3">Train on that batch</div>
            <div className="text-center">↓</div>
            <div className="bg-white border border-rose-200 rounded-lg p-3">Predict and score the same batch</div>
          </div>
          <p className="text-sm text-rose-800 mt-3 mb-0">The model has already seen the answers before you measure it.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-3">Pipeline B — preferred</p>
          <div className="space-y-2 text-sm font-semibold text-green-900">
            <div className="bg-white border border-green-200 rounded-lg p-3">New batch arrives</div>
            <div className="text-center">↓</div>
            <div className="bg-white border border-green-200 rounded-lg p-3">Predict and score first</div>
            <div className="text-center">↓</div>
            <div className="bg-white border border-green-200 rounded-lg p-3">Then update the model</div>
          </div>
          <p className="text-sm text-green-800 mt-3 mb-0">This tests the model state that actually existed before learning from the new batch.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">Why predict before learning?</h3>
      <p className="text-lg leading-relaxed mb-8 text-slate-800">
        If we train on a batch and then score that same batch, the result is partly a training score. In a stream, a more realistic approach is often <strong>test-then-train</strong> (also called prequential evaluation): predict using the model state available at that moment, observe the true label when it arrives, measure the error, and only then update the model.
      </p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-12 not-prose">
        <p className="font-bold text-emerald-900 mb-3">Prequential pattern</p>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-emerald-900">
          <span className="bg-white border border-emerald-200 rounded-lg px-3 py-2">Predict</span>
          <ArrowRight className="w-4 h-4" />
          <span className="bg-white border border-emerald-200 rounded-lg px-3 py-2">Observe label</span>
          <ArrowRight className="w-4 h-4" />
          <span className="bg-white border border-emerald-200 rounded-lg px-3 py-2">Score</span>
          <ArrowRight className="w-4 h-4" />
          <span className="bg-white border border-emerald-200 rounded-lg px-3 py-2">Update</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Preprocessing Must Be Stream-Safe Too</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Incremental learning is not only about the final classifier. Any preprocessing step that learns statistics from data must also respect time/order.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-8 not-prose">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 mb-2 flex items-center gap-2"><XCircle className="w-5 h-5" /> Risky</h3>
          <pre className="text-xs text-rose-900 overflow-x-auto"><code>{`scaler.fit(X_all)
# scaler has seen future stream data`}</code></pre>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Safer idea</h3>
          <pre className="text-xs text-green-900 overflow-x-auto"><code>{`scaler.fit(X_initial_history)
# future batches remain unseen`}</code></pre>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-10 text-slate-800">
        Scikit-learn's <code>StandardScaler</code> itself supports <code>partial_fit()</code> for online mean/variance updates. However, if both the feature transformation and the model are changing over time, you must design the update order carefully so that evaluation does not use future information and the model sees a consistent feature representation. Dedicated streaming libraries can make this workflow easier.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Concept Drift: When the World Changes</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Online learning is especially interesting when the data-generating process changes. But the word <strong>drift</strong> covers several different situations.
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8 not-prose">
        <table className="w-full text-sm bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Change</th>
              <th className="p-3 text-left">Simple meaning</th>
              <th className="p-3 text-left">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-bold">Data / covariate drift</td><td className="p-3">The distribution of inputs changes</td><td className="p-3">Customers now use newer devices</td></tr>
            <tr><td className="p-3 font-bold">Class-prior shift</td><td className="p-3">How common each class is changes</td><td className="p-3">Fraud becomes more frequent</td></tr>
            <tr><td className="p-3 font-bold">Concept drift</td><td className="p-3">The relationship between inputs and target changes</td><td className="p-3">Patterns that indicated fraud last year no longer mean the same thing</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5 mb-10">
        <div className="flex gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
          <p className="text-amber-900 leading-relaxed m-0">
            <strong>Online learning does not automatically solve drift.</strong> If labels arrive slowly, updates are noisy, the chosen model cannot represent the new pattern, or harmful data enters the stream, the model can still perform poorly. Drift should be monitored rather than assumed to be fixed by continuous updates.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">A simple drift story</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-12 not-prose">
        {[
          ['Period 1', 'Old pattern works'],
          ['Period 2', 'Behaviour begins changing'],
          ['Period 3', 'Errors increase'],
          ['Period 4', 'Model may need adaptation'],
        ].map(([title, text], index) => (
          <div key={title} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-xs font-bold text-indigo-600 mb-1">{index + 1}</div>
            <div className="font-bold text-slate-900 mb-1">{title}</div>
            <div className="text-xs text-slate-600">{text}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Algorithms That Can Learn Incrementally</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Not every Scikit-learn estimator supports incremental training. A practical clue is whether the estimator exposes a <code>partial_fit()</code> method.
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-10 not-prose">
        <table className="w-full text-sm bg-white">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Examples</th>
              <th className="p-3 text-left">Why useful</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3 font-bold">Classification</td><td className="p-3 font-mono text-xs">SGDClassifier, Perceptron, MultinomialNB</td><td className="p-3">Can update from successive mini-batches</td></tr>
            <tr><td className="p-3 font-bold">Regression</td><td className="p-3 font-mono text-xs">SGDRegressor</td><td className="p-3">Incremental linear regression-style learning</td></tr>
            <tr><td className="p-3 font-bold">Clustering</td><td className="p-3 font-mono text-xs">MiniBatchKMeans</td><td className="p-3">Processes small batches instead of all rows at once</td></tr>
            <tr><td className="p-3 font-bold">Neural networks</td><td className="p-3 font-mono text-xs">MLPClassifier, MLPRegressor</td><td className="p-3">Scikit-learn also exposes incremental updates for these estimators</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-3">What about trees and drift detectors?</h3>
      <p className="text-lg leading-relaxed mb-8 text-slate-800">
        Streaming-focused libraries such as <strong>River</strong> include methods designed specifically for evolving streams, including Hoeffding-style trees and drift detectors such as ADWIN. These are useful advanced topics, but they are not required to understand the core idea of incremental learning.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Learning Rate Matters</h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        For SGD-style online models, the learning rate controls how strongly new data changes the model.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-8 not-prose">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 mb-2">Too large</h3>
          <p className="text-sm text-rose-800">Updates may jump around and react too strongly to individual batches.</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-900 mb-2">Reasonable</h3>
          <p className="text-sm text-green-800">The model can learn while remaining reasonably stable.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-900 mb-2">Too small</h3>
          <p className="text-sm text-amber-800">Adaptation may be so slow that the model cannot keep up with meaningful change.</p>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-10 text-slate-800">
        Scikit-learn's <code>SGDClassifier</code> supports several learning-rate schedules such as <code>constant</code>, <code>optimal</code>, <code>invscaling</code>, and <code>adaptive</code>. These schedules are not the same thing as algorithms such as AdaGrad or Adam.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Where Online Learning Can Be Useful</h2>

      <div className="grid md:grid-cols-2 gap-5 mb-10 not-prose">
        {[
          ['Fraud / abuse detection', 'New labelled transactions or moderation decisions can be incorporated incrementally when feedback is available.'],
          ['Spam and text filtering', 'Vocabulary and message patterns can evolve, making incremental updates useful.'],
          ['Recommendation / ranking signals', 'Recent clicks, views, and preferences may carry useful information about current behaviour.'],
          ['IoT and operational monitoring', 'Continuous sensor streams may be processed without keeping the entire history in memory.'],
        ].map(([title, text]) => (
          <div key={title} className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed m-0">{text}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-12">
        <p className="text-blue-900 leading-relaxed m-0">
          These are <strong>possible applications</strong>, not claims that every production system in these domains uses online learning. Many real systems deliberately use scheduled batch retraining, hybrid architectures, or human approval before model updates.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Benefits and Risks</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-bold text-green-900 text-lg mb-4">Potential benefits</h3>
          <ul className="space-y-3 text-sm text-green-900 pl-0 list-none m-0">
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />Can process data in small chunks.</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />May adapt faster than infrequent full retraining.</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />Useful when the dataset is larger than available memory.</li>
            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />Can incorporate recent labelled feedback continuously.</li>
          </ul>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6">
          <h3 className="font-bold text-rose-900 text-lg mb-4">Important risks</h3>
          <ul className="space-y-3 text-sm text-rose-900 pl-0 list-none m-0">
            <li className="flex gap-2"><XCircle className="w-4 h-4 shrink-0 mt-0.5" />Bad labels or corrupted data can change the model immediately.</li>
            <li className="flex gap-2"><XCircle className="w-4 h-4 shrink-0 mt-0.5" />Recent observations can be over-emphasized.</li>
            <li className="flex gap-2"><XCircle className="w-4 h-4 shrink-0 mt-0.5" />Evaluation and rollback are more operationally difficult.</li>
            <li className="flex gap-2"><XCircle className="w-4 h-4 shrink-0 mt-0.5" />Adversarial or poisoned inputs can be especially dangerous.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">When Should You Choose Online Learning?</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12 not-prose">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-indigo-800 mb-3">Online learning is worth considering when...</h3>
          <ul className="text-sm text-slate-700 space-y-2 pl-5 list-disc">
            <li>data arrives continuously or is too large for memory,</li>
            <li>recent labelled feedback should affect the model quickly,</li>
            <li>full retraining is expensive,</li>
            <li>the environment may change over time, and</li>
            <li>you can monitor, validate, and roll back updates safely.</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-3">Batch learning may be simpler when...</h3>
          <ul className="text-sm text-slate-700 space-y-2 pl-5 list-disc">
            <li>the environment changes slowly,</li>
            <li>labels arrive only after long delays,</li>
            <li>periodic retraining is inexpensive enough,</li>
            <li>strict reproducibility/governance is important, or</li>
            <li>the chosen model does not support safe incremental updates.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Common Mistakes</h2>

      <div className="space-y-3 mb-12 not-prose">
        {[
          ['“A model making real-time predictions is automatically online learning.”', 'No. The model may make streaming predictions while remaining completely fixed.'],
          ['“Online learning means one record at a time.”', 'Not necessarily. Mini-batch incremental updates are also common.'],
          ['“Online learning automatically fixes concept drift.”', 'No. Adaptation depends on feedback, model capacity, learning rate, data quality, and monitoring.'],
          ['“I can preprocess the whole stream first.”', 'That may leak future information. Preprocessing must respect the same chronology as model training.'],
          ['“More recent data should always dominate old data.”', 'That is a modeling choice, not a universal law. Some old patterns remain important.'],
          ['“partial_fit() is equivalent to calling fit() repeatedly.”', 'No. partial_fit continues incremental training, while fit() generally represents a new fitting procedure and may reset learned state.'],
        ].map(([mistake, correction]) => (
          <div key={mistake} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-slate-900 mb-1">{mistake}</p>
            <p className="text-sm text-slate-700 m-0">{correction}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Check Your Understanding</h2>

      <div className="space-y-4 mb-12">
        <details className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">1. A recommendation system makes predictions every second, but its model is retrained only once a week. Is this online learning?</summary>
          <p className="mt-3 mb-0 text-slate-700"><strong>No.</strong> It is streaming or real-time inference, but the model itself is not being updated incrementally.</p>
        </details>
        <details className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">2. Why should a new labelled batch usually be scored before <code>partial_fit()</code>?</summary>
          <p className="mt-3 mb-0 text-slate-700">Because otherwise the model has already learned from that batch, making the score partly a training score rather than an honest test of the previous model state.</p>
        </details>
        <details className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">3. Does online learning have to update after every individual row?</summary>
          <p className="mt-3 mb-0 text-slate-700"><strong>No.</strong> Updates can happen one sample at a time, in mini-batches, or periodically while still continuing from the current model state.</p>
        </details>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Quick Recap</h2>

      <div className="space-y-4 mb-12">
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">What is the central idea of online learning?</summary>
          <p className="mt-3 mb-0 text-slate-700">The model can continue updating incrementally as new labelled data arrives instead of always retraining from scratch.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Why is “predict first, then learn” useful?</summary>
          <p className="mt-3 mb-0 text-slate-700">It evaluates the model using the state that actually existed before the new labelled example or batch was incorporated.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Does online learning guarantee adaptation to concept drift?</summary>
          <p className="mt-3 mb-0 text-slate-700">No. Online updates create the possibility of adaptation, but successful adaptation still depends on feedback speed, algorithm choice, data quality, hyperparameters, and monitoring.</p>
        </details>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4 border-b pb-2">Final Takeaway</h2>

      <div className="bg-slate-50 border-l-4 border-indigo-500 rounded-r-xl p-6 mb-10">
        <p className="text-lg text-slate-800 leading-relaxed m-0">
          <strong>Online learning is incremental model updating.</strong> It is valuable when data or environments evolve, when datasets are too large for memory, or when waiting for full retraining is undesirable. But it adds operational risk: the model can learn from bad data just as quickly as it can learn from useful data. Good online systems therefore combine incremental learning with careful evaluation, drift monitoring, data-quality checks, and rollback strategies.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Continue Learning</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-10 not-prose">
        <a href="/learn/batch-vs-online" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Foundation</p>
          <p className="font-bold text-slate-900 m-0">Batch vs Online</p>
        </a>
        <a href="/learn/semi-supervised" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Previous</p>
          <p className="font-bold text-slate-900 m-0">Semi-Supervised Learning</p>
        </a>
        <a href="/learn/reinforcement-learning-adv" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Next</p>
          <p className="font-bold text-slate-900 m-0">Reinforcement Learning (Advanced)</p>
        </a>
      </div>
    </div>
  );
}
