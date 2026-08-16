import React from 'react';
import {
  Target,
  Layers,
  Activity,
  Code,
  ShieldCheck,
  Check,
  X as CloseIcon,
  AlertCircle,
  GitMerge,
  Cpu,
} from 'lucide-react';

export function XGBoostContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">XGBoost</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        XGBoost stands for <strong>Extreme Gradient Boosting</strong>. It is an optimized library for gradient-boosted models, especially tree ensembles.
      </p>

      {/* UNDERSTAND FIRST */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">XGBoost in Simple Words</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-5">
          Think of XGBoost as a team of small decision trees built <strong>one after another</strong>. Each new tree tries to improve the current model, while XGBoost also controls how complicated the trees are allowed to become.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
          {[
            ['1', 'Start', 'Make an initial prediction'],
            ['2', 'Measure', 'Find what the model still gets wrong'],
            ['3', 'Correct', 'Add another small tree'],
            ['4', 'Repeat', 'Combine many small corrections'],
          ].map(([n, title, text]) => (
            <div key={n} className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm text-center">
              <div className="mx-auto mb-2 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">{n}</div>
              <p className="font-bold text-slate-800 mb-1">{title}</p>
              <p className="text-sm text-slate-600 mb-0">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6">
          <p className="font-bold text-indigo-900 mb-3">Tiny regression example</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-indigo-200">
                  <th className="p-2">Actual value</th>
                  <th className="p-2">Current prediction</th>
                  <th className="p-2">Tree correction</th>
                  <th className="p-2">Learning rate</th>
                  <th className="p-2">Updated prediction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">70</td>
                  <td className="p-2">55</td>
                  <td className="p-2">+10</td>
                  <td className="p-2">0.1</td>
                  <td className="p-2 font-bold text-indigo-800">55 + (0.1 × 10) = 56</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-indigo-900 mt-3 mb-0">
            The model is still below 70, so later trees can continue making additional corrections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-slate-800 mb-1">Boosting</p>
            <p className="text-slate-600 mb-0">Trees are added sequentially rather than trained as completely independent models.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-slate-800 mb-1">Regularization</p>
            <p className="text-slate-600 mb-0">Tree complexity and leaf scores can be penalized to make learning more conservative.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-slate-800 mb-1">Efficient implementation</p>
            <p className="text-slate-600 mb-0">XGBoost includes optimized tree-building, multithreading, sparse-data support, and scalable training options.</p>
          </div>
        </div>
      </section>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        XGBoost is widely used for supervised problems such as classification, regression, and ranking. It became particularly well known for strong performance on many structured or tabular datasets, but it is not automatically the best model for every dataset.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why XGBoost Became Important
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Gradient-boosted trees were already powerful before XGBoost. XGBoost became important because it combined the boosting idea with a carefully regularized objective and an implementation designed for efficient tree construction and scalable computation.
      </p>

      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-2">
        <li>Sequential tree boosting</li>
        <li>Explicit regularization of tree complexity</li>
        <li>Row and feature subsampling</li>
        <li>Efficient histogram-based and approximate tree methods</li>
        <li>Multithreaded split calculations</li>
        <li>Support for sparse inputs and missing values in tree models</li>
        <li>CPU, GPU, and distributed-training options</li>
      </ul>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">The Fundamental Philosophy Behind XGBoost</h3>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 leading-relaxed mb-0">
          <strong>Central idea:</strong> Keep the current ensemble, add a new tree that improves the objective, and control model complexity while doing so.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">Real-Life Analogy</h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Imagine a student taking a sequence of practice tests. After each test, the student does not forget everything and restart. Instead, the student keeps what already works, studies the remaining weaknesses, and makes a smaller improvement for the next attempt.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        That is a useful intuition for boosting. For <strong>squared-error regression</strong>, we can think in terms of residual corrections. More generally, XGBoost uses the derivatives of the chosen loss function to decide what the next tree should improve.
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 font-bold mb-2">What does “Extreme” mean?</p>
        <p className="text-amber-900 mb-0">
          The name refers to an aggressively optimized implementation of gradient boosting. It does <strong>not</strong> mean that XGBoost is always faster or more accurate than every alternative.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Core Ideas & Improvements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Core Components</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg">
            <li>Gradient-boosted decision trees</li>
            <li>First- and second-order loss information</li>
            <li>Regularization</li>
            <li>Shrinkage through the learning rate</li>
            <li>Row and column subsampling</li>
            <li>Efficient split finding</li>
            <li>Missing-value and sparse-data handling</li>
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <h3 className="text-lg font-bold text-slate-800 mb-3">Ensemble Learning Hierarchy</h3>
          <p className="text-slate-700 text-sm mb-2 font-mono">ENSEMBLE LEARNING</p>
          <ul className="list-none pl-4 space-y-1 text-slate-700">
            <li>├─ <strong>Bagging</strong>
              <ul className="pl-6 text-slate-600"><li>└─ Random Forest</li></ul>
            </li>
            <li className="mt-2">└─ <strong>Boosting</strong>
              <ul className="pl-6 text-slate-600">
                <li>├─ AdaBoost</li>
                <li>├─ Gradient Boosting</li>
                <li className="font-bold text-indigo-600">└─ XGBoost</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">Objective = Prediction Quality + Complexity Control</h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        XGBoost optimizes an objective containing both a training-loss term and a regularization term:
      </p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 text-center">
        <div className="bg-white p-4 inline-block rounded border text-indigo-700 font-serif text-xl shadow-sm">
          Obj = Σ l(yᵢ, ŷᵢ) + Σ Ω(fₖ)
        </div>
        <p className="text-slate-600 mt-4 mb-0">
          <strong>l</strong> measures prediction loss. <strong>Ω</strong> penalizes tree complexity.
        </p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        For tree boosters, a common complexity term taught for XGBoost is:
      </p>

      <div className="bg-white border border-indigo-100 rounded-lg p-5 mb-8 text-center">
        <p className="font-serif text-xl text-indigo-800 mb-2">Ω(f) = γT + ½λΣwⱼ²</p>
        <p className="text-slate-600 mb-0">
          <strong>T</strong> = number of leaves, <strong>γ</strong> = cost of adding leaves, <strong>w</strong> = leaf scores, <strong>λ</strong> = L2 regularization strength.
        </p>
      </div>

      <div className="bg-white border text-left border-rose-200 rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-rose-50 px-6 py-4 border-b border-rose-200">
          <h4 className="font-bold text-rose-900 text-lg uppercase tracking-wider flex items-center">
            <Target className="w-5 h-5 mr-2" /> Easy Numerical Example — Regularization Cost
          </h4>
        </div>
        <div className="p-6 text-lg text-slate-700 space-y-5">
          <p className="mb-0">
            Suppose the current training loss is <strong>8</strong>. A candidate tree has <strong>3 leaves</strong> with leaf scores <code>[1, -2, 0.5]</code>. Let <code>γ = 1</code> and <code>λ = 2</code>.
          </p>

          <div>
            <p className="font-bold text-slate-800 mb-2">Step 1 — Count the leaves</p>
            <p className="font-mono bg-slate-100 p-3 rounded mb-0">γT = 1 × 3 = 3</p>
          </div>

          <div>
            <p className="font-bold text-slate-800 mb-2">Step 2 — Square the leaf scores</p>
            <p className="font-mono bg-slate-100 p-3 rounded mb-0">1² + (-2)² + 0.5² = 1 + 4 + 0.25 = 5.25</p>
          </div>

          <div>
            <p className="font-bold text-slate-800 mb-2">Step 3 — Apply L2 regularization</p>
            <p className="font-mono bg-slate-100 p-3 rounded mb-0">½ × 2 × 5.25 = 5.25</p>
          </div>

          <div>
            <p className="font-bold text-slate-800 mb-2">Step 4 — Total complexity penalty</p>
            <p className="font-mono bg-slate-100 p-3 rounded mb-0">Ω = 3 + 5.25 = 8.25</p>
          </div>

          <div>
            <p className="font-bold text-slate-800 mb-2">Step 5 — Add loss and penalty</p>
            <p className="font-mono bg-indigo-50 border border-indigo-100 text-indigo-900 p-3 rounded mb-0">Objective = 8 + 8.25 = 16.25</p>
          </div>

          <p className="text-sm text-slate-600 mb-0">
            This does not mean “16.25 is good” by itself. During training, XGBoost compares candidate improvements under the same objective and prefers changes that improve the regularized objective.
          </p>
        </div>
      </div>

      <details className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-10">
        <summary className="cursor-pointer font-bold text-slate-800 text-lg">Going Deeper — Why XGBoost Uses Both Gradient and Hessian</summary>
        <div className="mt-5 text-slate-700 text-lg space-y-4">
          <p>
            For a general loss function, XGBoost uses a second-order Taylor approximation. Each training example contributes a gradient <strong>g</strong> and a Hessian <strong>h</strong>.
          </p>
          <div className="bg-white border rounded p-4 text-center">
            <p className="font-serif text-xl text-indigo-800 mb-2">gᵢ = ∂l/∂ŷ &nbsp;&nbsp;&nbsp; hᵢ = ∂²l/∂ŷ²</p>
            <p className="text-sm text-slate-600 mb-0">Gradient tells the direction of improvement; Hessian describes local curvature.</p>
          </div>
          <p>For one leaf, define <code>G = Σgᵢ</code> and <code>H = Σhᵢ</code>. With L2 regularization, the optimal leaf score is:</p>
          <div className="bg-white border rounded p-4 text-center font-serif text-xl text-indigo-800">w* = -G / (H + λ)</div>
          <p><strong>Example:</strong> if <code>G = -6</code>, <code>H = 4</code>, and <code>λ = 2</code>:</p>
          <div className="font-mono bg-white border p-3 rounded">w* = -(-6) / (4 + 2) = 6 / 6 = 1</div>
          <p className="mb-0">
            If the learning rate is <code>0.1</code>, this tree's contribution is then shrunk before being added to the ensemble. This is more precise than saying XGBoost always “fits raw residuals.”
          </p>
        </div>
      </details>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-indigo-600" /> Step-by-Step Working of XGBoost
      </h2>

      <div className="space-y-8 mb-10">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Step 1 — Start with a Base Prediction</h3>
          <p className="text-lg text-slate-700 mb-2">
            In a simple squared-error regression lesson, we can begin with a constant such as the mean target value.
          </p>
          <div className="bg-slate-100 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300">
            Targets: 40, 50, 60, 70<br />
            Mean = (40 + 50 + 60 + 70) / 4 = 55
          </div>
          <p className="text-sm text-slate-500 mt-2 mb-0">
            In actual XGBoost, the base score is an intercept-like starting prediction and can be estimated according to the objective.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Step 2 — Measure What Still Needs Improvement</h3>
          <p className="text-lg text-slate-700 mb-2">
            For squared error, residuals are an intuitive way to see the remaining error:
          </p>
          <div className="bg-slate-100 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300 mb-2">
            Residual = Actual - Prediction<br />
            40 - 55 = -15
          </div>
          <p className="text-lg text-slate-700 mb-0">
            More generally, XGBoost uses gradient and Hessian information from the chosen objective.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Step 3 — Build the Next Tree</h3>
          <p className="text-lg text-slate-700 mb-0">
            XGBoost searches for useful splits and leaf scores that improve the regularized objective. The next tree is therefore a correction model, not a fresh model trained independently of the existing ensemble.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Step 4 — Shrink and Add the Tree</h3>
          <p className="text-lg text-slate-700 mb-2">A simple prediction update can be written as:</p>
          <div className="bg-white border border-slate-200 rounded p-4 text-center text-indigo-800 font-mono mb-3">
            New Prediction = Old Prediction + η × Tree Output
          </div>
          <div className="bg-slate-100 p-3 rounded text-slate-700 text-sm font-mono border-l-4 border-slate-300">
            Old prediction = 55<br />
            Tree output = 10<br />
            Learning rate η = 0.1<br />
            New prediction = 55 + (0.1 × 10) = 56
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Step 5 — Repeat</h3>
          <p className="text-lg text-slate-700 mb-0">
            New boosting rounds continue to improve the objective. Training loss may keep decreasing, but validation performance does not have to improve forever, which is why validation and early stopping can be useful.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Cpu className="mr-2 text-indigo-600" /> What Makes XGBoost Efficient?
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Boosting rounds themselves are sequential, but XGBoost can parallelize important computations <strong>inside tree construction</strong> and provides multiple tree-building algorithms for different performance needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-indigo-500">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Histogram-Based Tree Building</h3>
          <p className="text-slate-700 mb-0">The <code>hist</code> method groups continuous values into bins, so split calculations can be much more efficient than enumerating every possible split value.</p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-emerald-500">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Parallel Computation</h3>
          <p className="text-slate-700 mb-0">Within a boosting round, XGBoost can use multiple threads for operations involved in split finding and tree construction.</p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-amber-500">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Missing Values</h3>
          <p className="text-slate-700 mb-0">Tree models can learn a default branch direction for missing feature values during training instead of requiring every numeric missing value to be manually filled first.</p>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm border-t-4 border-t-rose-500">
          <h3 className="font-bold text-slate-800 text-lg mb-2">Sparse & Large Data Support</h3>
          <p className="text-slate-700 mb-0">XGBoost supports sparse inputs and also provides GPU, distributed, and external-memory options for larger workloads.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">Important Hyperparameters</h3>

      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-8">
        <table className="w-full text-left border-collapse text-base">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Parameter</th>
              <th className="p-4 font-bold text-slate-800">Simple meaning</th>
              <th className="p-4 font-bold text-slate-800">If increased</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b"><td className="p-4 font-mono">n_estimators</td><td className="p-4">Number of boosting rounds/trees</td><td className="p-4">More capacity and computation; not guaranteed better validation performance</td></tr>
            <tr className="border-b"><td className="p-4 font-mono">learning_rate</td><td className="p-4">Shrinks each tree's contribution</td><td className="p-4">Larger correction per round</td></tr>
            <tr className="border-b"><td className="p-4 font-mono">max_depth</td><td className="p-4">Maximum tree depth</td><td className="p-4">More complex trees and greater overfitting risk</td></tr>
            <tr className="border-b"><td className="p-4 font-mono">subsample</td><td className="p-4">Fraction of training rows sampled per boosting round</td><td className="p-4">Uses more rows each round</td></tr>
            <tr className="border-b"><td className="p-4 font-mono">colsample_bytree</td><td className="p-4">Fraction of features sampled for each tree</td><td className="p-4">Makes more features available to each tree</td></tr>
            <tr className="border-b"><td className="p-4 font-mono">gamma</td><td className="p-4">Minimum loss reduction required for another split</td><td className="p-4">Makes splitting more conservative</td></tr>
            <tr className="border-b"><td className="p-4 font-mono">reg_lambda</td><td className="p-4">L2 regularization on leaf weights</td><td className="p-4">Makes leaf scores more conservative</td></tr>
            <tr><td className="p-4 font-mono">reg_alpha</td><td className="p-4">L1 regularization on leaf weights</td><td className="p-4">Adds stronger L1 shrinkage</td></tr>
          </tbody>
        </table>
      </div>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-blue-900 mb-0">
          <strong>Do not search for one universally “best” parameter set.</strong> Hyperparameters interact with one another. Use validation or cross-validation, and keep the final test set untouched until model selection is complete.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Implementing XGBoost in Python
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is a small classification example using Scikit-learn's built-in Breast Cancer Wisconsin dataset. It is an educational dataset, not a clinically deployable diagnostic system. Install XGBoost first with <code>pip install xgboost</code> if needed.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h3 className="font-bold text-indigo-800 text-xl">XGBoost Classification</h3>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0"><code>{`# pip install xgboost

from xgboost import XGBClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, roc_auc_score

# 1. Load data
X, y = load_breast_cancer(return_X_y=True)

# 2. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 3. Create model
model = XGBClassifier(
    n_estimators=100,
    max_depth=3,
    learning_rate=0.1,
    subsample=0.9,
    colsample_bytree=0.9,
    objective="binary:logistic",
    eval_metric="logloss",
    tree_method="hist",
    random_state=42,
    n_jobs=-1
)

# 4. Train
model.fit(X_train, y_train)

# 5. Predict
predictions = model.predict(X_test)
probabilities = model.predict_proba(X_test)[:, 1]

# 6. Evaluate
accuracy = accuracy_score(y_test, predictions)
auc = roc_auc_score(y_test, probabilities)

print(f"Accuracy: {accuracy:.3f}")
print(confusion_matrix(y_test, predictions))
print(f"ROC AUC: {auc:.3f}")`}</code></pre>
        </div>
        <div className="p-4 bg-slate-50 text-slate-700 border-b border-slate-200 text-lg">
          <p className="mb-0">
            <strong>Code flow:</strong> Load → split → create model → train → predict → evaluate. Tree-based XGBoost usually does not need ordinary feature standardization because splits are based on feature thresholds rather than Euclidean distance.
          </p>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Verified Output</span>
          </div>
          <pre className="whitespace-pre-wrap mb-0">{`Accuracy: 0.947
[[38  4]
 [ 2 70]]
ROC AUC: 0.995`}</pre>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-amber-900 mb-2">About Early Stopping</p>
        <p className="text-amber-900 mb-0">
          XGBoost supports early stopping when you supply validation data. Use a separate validation set for this purpose rather than repeatedly looking at the final test set while tuning the model.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Real-Life Scenario — Fraud Detection
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Suppose a bank wants to estimate whether a transaction is suspicious. Features may include transaction amount, time, merchant category, device information, recent transaction frequency, and location-derived signals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4 bg-slate-50">
          <p className="font-bold text-slate-800 mb-1">1. Learn</p>
          <p className="text-slate-600 mb-0">Earlier trees capture useful broad patterns.</p>
        </div>
        <div className="border rounded-lg p-4 bg-slate-50">
          <p className="font-bold text-slate-800 mb-1">2. Correct</p>
          <p className="text-slate-600 mb-0">Later trees improve cases the current ensemble handles poorly.</p>
        </div>
        <div className="border rounded-lg p-4 bg-slate-50">
          <p className="font-bold text-slate-800 mb-1">3. Validate</p>
          <p className="text-slate-600 mb-0">Choose thresholds and metrics based on the real cost of false alarms and missed fraud.</p>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        In a real fraud system, accuracy alone would usually be insufficient. Class imbalance, precision, recall, ROC/PR metrics, probability calibration, latency, drift, and business cost may all matter.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages & Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li>Often a strong candidate for structured/tabular classification and regression.</li>
            <li>Regularization, shrinkage, and sampling provide several ways to control complexity.</li>
            <li>Supports missing values and sparse inputs in tree models.</li>
            <li>Efficient histogram, multithreaded, GPU, and distributed options are available.</li>
            <li>Supports several objectives, including classification, regression, and ranking.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li>Has many interacting hyperparameters, so careless tuning can become expensive.</li>
            <li>Boosting rounds are sequential, limiting parallelism across rounds.</li>
            <li>The full ensemble is harder to interpret than one small Decision Tree or a simple linear model.</li>
            <li>Can overfit when trees are too complex, training continues too long, or validation is misused.</li>
            <li>It is not automatically the best choice for images, raw text, very small datasets, or every tabular problem.</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center">
        <GitMerge className="mr-2" /> XGBoost vs Random Forest
      </h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Idea</th>
              <th className="p-4 font-bold text-indigo-800">XGBoost</th>
              <th className="p-4 font-bold text-emerald-800">Random Forest</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b"><td className="p-4 font-medium">How trees are trained</td><td className="p-4">Sequentially, each round improves the current ensemble</td><td className="p-4">Trees are largely independent and then aggregated</td></tr>
            <tr className="border-b"><td className="p-4 font-medium">Parallelism</td><td className="p-4">Parallel work inside rounds; rounds remain sequential</td><td className="p-4">Trees are easier to train in parallel</td></tr>
            <tr className="border-b"><td className="p-4 font-medium">Complexity control</td><td className="p-4">Shrinkage, regularization, row/column sampling, tree constraints</td><td className="p-4">Averaging, row sampling, random feature selection, tree constraints</td></tr>
            <tr className="border-b"><td className="p-4 font-medium">Tuning</td><td className="p-4">Often more sensitive to interacting hyperparameters</td><td className="p-4">Often a simpler baseline to configure</td></tr>
            <tr><td className="p-4 font-medium">Which is better?</td><td colSpan={2} className="p-4 font-semibold text-slate-800">Neither is universally better—compare them with proper validation.</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">Common Applications</h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        XGBoost is frequently considered for structured-data problems where nonlinear relationships and feature interactions matter. Examples include:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          'Fraud Detection',
          'Credit Risk',
          'Customer Churn',
          'Insurance Risk & Claims',
          'Search / Learning to Rank',
          'Marketing Response',
          'Sales & Demand Modeling',
          'Clinical Risk Research',
          'General Tabular Prediction',
        ].map((app) => (
          <div key={app} className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-center text-indigo-900 font-medium">
            {app}
          </div>
        ))}
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Common Mistakes</h2>
      <div className="space-y-4 mb-10 text-lg text-slate-700">
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4"><strong>1. “XGBoost always fits residuals.”</strong><br />Residuals are a useful squared-error intuition. In general, XGBoost uses gradients and Hessians of the chosen loss.</div>
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4"><strong>2. “More trees always improve the model.”</strong><br />Training loss may improve while validation performance stops improving or worsens.</div>
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4"><strong>3. “XGBoost needs feature standardization.”</strong><br />Tree boosters generally do not need ordinary standardization for the same reason KNN or SVM do.</div>
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4"><strong>4. “Missing-value support means no data-quality work is needed.”</strong><br />The model can route missing values, but you still need to understand why data are missing and whether the pattern is safe and meaningful.</div>
        <div className="bg-rose-50 border border-rose-100 rounded-lg p-4"><strong>5. “Tune on the test set.”</strong><br />Use training/validation or cross-validation for model selection. Reserve the test set for final evaluation.</div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Quick FAQs</h2>
      <div className="space-y-3 mb-10">
        <details className="border border-slate-200 rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-800 cursor-pointer">Is XGBoost the same as Gradient Boosting?</summary>
          <p className="text-slate-700 mt-3 mb-0">XGBoost belongs to the gradient-boosting family, but adds a specific regularized objective and an optimized implementation with many additional training features.</p>
        </details>
        <details className="border border-slate-200 rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-800 cursor-pointer">Does XGBoost need feature scaling?</summary>
          <p className="text-slate-700 mt-3 mb-0">For tree-based boosters, ordinary standardization is usually unnecessary because trees split on thresholds rather than distance. Scaling can matter for other booster types or surrounding preprocessing.</p>
        </details>
        <details className="border border-slate-200 rounded-lg p-4 bg-white">
          <summary className="font-bold text-slate-800 cursor-pointer">Is XGBoost always better than Random Forest?</summary>
          <p className="text-slate-700 mt-3 mb-0">No. XGBoost may outperform Random Forest on some datasets and lose on others. Use proper validation rather than choosing by reputation.</p>
        </details>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
        <p className="font-bold text-indigo-900 text-lg mb-3">Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/gradient-boosting" className="text-indigo-700 font-semibold underline underline-offset-2">Gradient Boosting</a>
          <a href="/learn/random-forest" className="text-indigo-700 font-semibold underline underline-offset-2">Random Forest</a>
          <a href="/learn/hyperparameter-tuning" className="text-indigo-700 font-semibold underline underline-offset-2">Hyperparameter Tuning</a>
          <a href="/learn/cross-validation" className="text-indigo-700 font-semibold underline underline-offset-2">Cross-Validation</a>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        XGBoost is a gradient-boosting system that builds an ensemble additively, evaluates new trees using loss derivatives, and controls complexity through regularization and tree constraints.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Its practical strength comes from combining a strong boosting framework with efficient tree-building methods, sampling, missing-value handling, multithreading, and scalable execution options. These features make it a useful model to evaluate for many tabular machine-learning problems—but not a guaranteed winner.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember</p>
        <p className="text-slate-800 text-lg leading-relaxed mb-0">
          <strong>XGBoost does two things at once:</strong> it adds trees that improve the current prediction, and it controls how complicated those trees become. For squared-error regression, residual correction is a good starting intuition; at deeper level, XGBoost uses gradient and Hessian information from the loss function.
        </p>
      </div>
    </>
  );
}
