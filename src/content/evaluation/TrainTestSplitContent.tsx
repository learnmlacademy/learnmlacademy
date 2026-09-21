import React from 'react';
import { Target, Layers, AlertTriangle, Code, Columns, Clock, Users } from 'lucide-react';

export function TrainTestSplitContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Train/Test Split in Machine Learning</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Train/Test Split is one of the most fundamental ideas in Machine Learning. We use one part of the available data to <strong>train</strong> a model and keep another part aside to check how well the trained model performs on data it did not use for fitting.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Train/Test Split in Simple Words</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white border border-indigo-100 rounded-lg p-4">
              <p className="font-bold text-slate-900">1. Start with data</p>
              <p className="text-slate-600 mt-1">100 available examples</p>
            </div>
            <div className="bg-white border border-indigo-100 rounded-lg p-4">
              <p className="font-bold text-indigo-800">2. Train</p>
              <p className="text-slate-600 mt-1">Use, for example, 80 examples</p>
            </div>
            <div className="bg-white border border-indigo-100 rounded-lg p-4">
              <p className="font-bold text-amber-700">3. Test</p>
              <p className="text-slate-600 mt-1">Evaluate on the remaining 20</p>
            </div>
          </div>
          <p className="mt-5 text-slate-800 text-lg">
            <strong>Main idea:</strong> the test set acts like a small simulation of future unseen data.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Primary Purpose</p>
          <p className="text-slate-800 italic leading-relaxed">
            Estimate how well a trained model generalizes beyond the examples used to fit it.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-4 mt-10">Why Train/Test Split Is Necessary</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a student practices using one set of questions and is then evaluated using different questions. A high score on the unseen questions gives stronger evidence that the student learned the concept rather than only remembering the practice answers.
        </p>
        <ul className="list-disc pl-6 mb-5 text-lg text-slate-800 space-y-2">
          <li><strong>Practice questions</strong> → Training Set</li>
          <li><strong>Final unseen questions</strong> → Test Set</li>
        </ul>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Machine Learning follows the same idea. Evaluating on the same examples used for fitting usually gives an overly optimistic picture of performance. A held-out test set helps measure generalization. It can reveal overfitting, but the act of splitting data by itself does <strong>not</strong> guarantee that overfitting is prevented.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">A Tiny 10-Student Example</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border p-4">
              <p className="font-bold text-indigo-700 mb-2">Training set — 8 students</p>
              <p className="font-mono text-slate-700">S1 S2 S3 S4 S5 S6 S7 S8</p>
              <p className="text-slate-600 mt-2">The model is allowed to learn from these rows.</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <p className="font-bold text-amber-700 mb-2">Test set — 2 students</p>
              <p className="font-mono text-slate-700">S9 S10</p>
              <p className="text-slate-600 mt-2">These rows are held back for evaluation.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Common Split Ratios — Examples, Not Rules</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm text-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Example</th>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Training</th>
                <th className="px-5 py-3 text-left font-bold text-slate-700">Testing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr><td className="px-5 py-3">70 / 30</td><td className="px-5 py-3">70%</td><td className="px-5 py-3">30%</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-3 font-semibold">80 / 20</td><td className="px-5 py-3">80%</td><td className="px-5 py-3">20%</td></tr>
              <tr><td className="px-5 py-3">90 / 10</td><td className="px-5 py-3">90%</td><td className="px-5 py-3">10%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          There is no universal best ratio. The choice depends on dataset size, how much data the model needs to learn, and how precise you need the evaluation to be. An 80/20 split is a common teaching choice, not a law.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="definitions">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Train, Validation & Test Sets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">Training Set</h3>
            <p className="text-slate-800 leading-relaxed">Used to fit model parameters from data.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-sky-800 mb-2">Validation Set / CV</h3>
            <p className="text-slate-800 leading-relaxed">Used for model comparison, hyperparameter choices and other development decisions.</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-amber-800 mb-2">Test Set</h3>
            <p className="text-slate-800 leading-relaxed">Kept aside for the final estimate of performance on unseen data.</p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 text-lg mb-2">Why Validation Is Different from Testing</p>
          <p className="text-slate-800 leading-relaxed">
            If you repeatedly check the test score while choosing models or hyperparameters, information from the test set begins influencing your decisions. The test score can then become optimistic. Use a separate validation set or cross-validation for model selection, and reserve the test set for final evaluation.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">A Safer ML Workflow</h3>
        <div className="bg-slate-50 border rounded-xl p-6 mb-10 overflow-x-auto">
          <div className="font-mono text-sm md:text-base text-slate-800 whitespace-pre min-w-[620px]">
{`RAW DATA
   │
   ├──────────────► HOLD OUT TEST SET
   │
   ▼
TRAINING PORTION
   │
   ▼
FIT PREPROCESSING + TRAIN MODELS
   │
   ▼
VALIDATION / CROSS-VALIDATION
   │
   ▼
CHOOSE MODEL + HYPERPARAMETERS
   │
   ▼
FINAL EVALUATION ON TEST SET`}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Simple Split Mathematics</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose the dataset contains <strong>N = 1000</strong> samples and <code className="font-mono bg-slate-100 px-1 rounded text-red-600">test_size=0.2</code>.
        </p>
        <div className="bg-white border rounded-xl p-5 mb-8 max-w-2xl">
          <p className="font-mono text-lg text-slate-800">Test samples = 1000 × 0.2 = <strong>200</strong></p>
          <p className="font-mono text-lg text-slate-800 mt-3">Training samples = 1000 − 200 = <strong>800</strong></p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="splitting-techniques">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Columns className="mr-3 text-indigo-600" /> Random, Stratified, Grouped & Time-Aware Splits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Random Splitting</h3>
            <p className="text-lg leading-relaxed text-slate-800">
              For independent rows, shuffling before a split can prevent accidental ordering from putting systematically different observations into train and test sets. Scikit-learn's <code>train_test_split()</code> shuffles by default.
            </p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2">random_state</h3>
            <p className="text-lg leading-relaxed text-slate-800">
              Setting <code className="bg-slate-100 px-1 rounded text-sm text-red-600 font-mono">random_state=42</code> makes the pseudo-random split reproducible when the other inputs are unchanged. It does <strong>not</strong> make the model more accurate; it makes the experiment repeatable.
            </p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Stratified Splitting for Classification</p>
          <p className="text-slate-800 leading-relaxed mb-3">
            When class proportions matter, <code>stratify=y</code> can preserve approximately the same class proportions in train and test sets.
          </p>
          <div className="font-mono text-sm text-emerald-800 border-t border-emerald-200 pt-3 whitespace-pre overflow-x-auto">
{`ORIGINAL: 90% Class A, 10% Class B
TRAIN:    approximately 90% A, 10% B
TEST:     approximately 90% A, 10% B`}
          </div>
          <p className="text-slate-700 mt-3">
            Stratification is useful for many classification problems, especially when a class is uncommon. It is not a universal instruction to use on every dataset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-violet-900 mb-2 flex items-center"><Users className="mr-2" /> Grouped Data</h3>
            <p className="text-slate-800 leading-relaxed">
              If several rows belong to the same person, patient, machine, household or customer, placing the same entity in both train and test sets can leak entity-specific information. In such cases, split by <strong>group</strong> rather than by individual rows.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-amber-900 mb-2 flex items-center"><Clock className="mr-2" /> Time-Ordered Data</h3>
            <p className="text-slate-800 leading-relaxed">
              For forecasting, randomly shuffling past and future observations can create an unrealistic evaluation. A time-aware split generally trains on earlier observations and evaluates on later observations.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="data-leakage">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Data Leakage: Split Before Learning from Data
        </h2>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Data leakage happens when information that should be unavailable during training influences the fitted model or model-selection process. A common beginner mistake is fitting preprocessing on the complete dataset before the split.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-rose-900 mb-3">Wrong</h3>
            <div className="font-mono text-sm text-rose-900 whitespace-pre overflow-x-auto">
{`scaler.fit_transform(X)   # sees all rows
train_test_split(...)
model.fit(...)`}
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Better</h3>
            <div className="font-mono text-sm text-emerald-900 whitespace-pre overflow-x-auto">
{`train_test_split(...)
scaler.fit_transform(X_train)
scaler.transform(X_test)`}
            </div>
          </div>
        </div>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The same principle applies to imputers, feature selection, PCA and many other transformations. In real projects, a Scikit-learn <strong>Pipeline</strong> is often a safer way to keep preprocessing and model fitting inside the correct training workflow.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation (scikit-learn)
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Scikit-learn provides <code className="bg-slate-100 px-1 font-mono rounded text-red-600">train_test_split()</code> in <code className="bg-slate-100 px-1 font-mono rounded text-red-600">sklearn.model_selection</code>. It can split aligned arrays such as <code>X</code> and <code>y</code> in one call.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h3 className="font-bold text-slate-800 text-lg">Python Code: Split, Train and Evaluate</h3>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Step 1 — Load a small classification dataset
X, y = load_iris(return_X_y=True)

# Step 2 — Hold out 20% for testing
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    shuffle=True,
    stratify=y
)

print("Train shape:", X_train.shape)
print("Test shape:", X_test.shape)
print("Train class counts:", np.bincount(y_train))
print("Test class counts:", np.bincount(y_test))

# Step 3 — Train only on the training set
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Step 4 — Evaluate on the held-out test set
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("Test accuracy:", round(accuracy, 3))`}</code></pre>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-8 font-mono text-sm overflow-x-auto whitespace-pre">
{`Train shape: (120, 4)
Test shape: (30, 4)
Train class counts: [40 40 40]
Test class counts: [10 10 10]
Test accuracy: 0.967`}
        </div>
        <p className="text-slate-700 text-lg mb-10">
          The equal class counts are a direct consequence of using <code>stratify=y</code> on the balanced Iris dataset with this split size. The accuracy is specific to this dataset and split; it is not a general promise for Logistic Regression.
        </p>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-10">
          <h3 className="text-xl font-bold flex items-center text-amber-900 mb-4">
            <AlertTriangle className="mr-2" /> Common Mistakes Beginners Make
          </h3>
          <ul className="list-disc pl-6 text-lg text-amber-900 space-y-2">
            <li><strong>Training and testing on the same rows:</strong> gives an unreliable estimate of future performance.</li>
            <li><strong>Fitting preprocessing before the split:</strong> leaks information from held-out data.</li>
            <li><strong>Using the test set for hyperparameter tuning:</strong> gradually turns the test set into part of the development process.</li>
            <li><strong>Always shuffling:</strong> can be wrong for time-ordered data.</li>
            <li><strong>Always stratifying:</strong> is not appropriate for every problem; it is mainly a classification tool.</li>
            <li><strong>Ignoring groups:</strong> can place the same person or entity in both train and test sets.</li>
            <li><strong>Using a tiny test set:</strong> can make the estimate highly unstable.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Train/Test Split vs Cross-Validation
        </h2>

        <div className="overflow-x-auto mb-8 max-w-5xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm text-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left font-bold text-indigo-700">Single Train/Test Split</th>
                <th className="px-6 py-3 text-left font-bold text-emerald-700">Cross-Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr><td className="px-6 py-4 font-medium">Number of evaluations</td><td className="px-6 py-4">One split</td><td className="px-6 py-4">Multiple folds/splits</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-medium">Computation</td><td className="px-6 py-4">Usually lower</td><td className="px-6 py-4">Usually higher</td></tr>
              <tr><td className="px-6 py-4 font-medium">Sensitivity to one split</td><td className="px-6 py-4">Higher</td><td className="px-6 py-4">Can reduce dependence on one split</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-medium">Typical use</td><td className="px-6 py-4">Quick holdout / final test</td><td className="px-6 py-4">Model comparison and tuning</td></tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li>Simple to understand and implement.</li>
              <li>Usually cheaper than repeated cross-validation.</li>
              <li>Useful when the dataset is large enough to reserve a meaningful holdout set.</li>
              <li>Provides a clear untouched set for final evaluation.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Limitations</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li>Performance can depend noticeably on which rows land in the split.</li>
              <li>Holding out data can be costly when the dataset is very small.</li>
              <li>A naive random split can be invalid for time, groups or other dependencies.</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="quick-recap">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>
        <div className="space-y-4 mb-8">
          <details className="bg-slate-50 border rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Why should the test set stay out of model tuning?</summary>
            <p className="mt-3 text-slate-700">Because repeated decisions based on test performance leak information from the test set into model development, making the final test score less trustworthy.</p>
          </details>
          <details className="bg-slate-50 border rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">What does random_state=42 do?</summary>
            <p className="mt-3 text-slate-700">It makes the pseudo-random split reproducible. The number 42 itself has no special statistical advantage.</p>
          </details>
          <details className="bg-slate-50 border rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Should time-series data be randomly shuffled?</summary>
            <p className="mt-3 text-slate-700">Usually no. A forecasting evaluation should respect time order so the model learns from the past and is evaluated on later observations.</p>
          </details>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
          <h3 className="text-xl font-bold text-indigo-900 mb-3">Continue Learning</h3>
          <p className="text-slate-800 mb-3">A single holdout split is only the beginning of model evaluation.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/learn/cross-validation" className="text-indigo-700 font-bold underline">Cross-Validation →</a>
            <a href="/learn/overfitting-underfitting" className="text-indigo-700 font-bold underline">Overfitting & Underfitting →</a>
            <a href="/learn/feature-scaling" className="text-indigo-700 font-bold underline">Feature Scaling →</a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Train/Test Split divides available data so that model fitting and final evaluation are separated. The training set teaches the model; validation or cross-validation supports development decisions; the test set estimates performance on held-out data.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        In Scikit-learn, <code>train_test_split()</code> provides a convenient random holdout split with options such as <code>test_size</code>, <code>random_state</code>, <code>shuffle</code> and <code>stratify</code>. The correct splitting strategy, however, depends on the structure of the data: ordinary random splitting is not automatically appropriate for time-series or grouped observations.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Keep the final test set outside model fitting and tuning. Split first, learn preprocessing from training data, use validation or cross-validation for choices, and use the test set only when you are ready for a final evaluation.
        </p>
      </div>
    </>
  );
}
