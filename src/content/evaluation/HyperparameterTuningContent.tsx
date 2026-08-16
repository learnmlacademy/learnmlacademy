import React from 'react';
import {
  Target,
  Layers,
  Settings,
  Workflow,
  Lightbulb,
  Cpu,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export function HyperparameterTuningContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Hyperparameter Tuning</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A Machine Learning algorithm can behave very differently depending on the settings we choose for it. A Decision Tree can be shallow or deep. KNN can use 1 neighbor or 15 neighbors. A Neural Network can learn with a small or large learning rate. These user-controlled settings are called <strong>hyperparameters</strong>.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Hyperparameter Tuning in Simple Words</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center text-center">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="font-bold text-slate-900">Choose Settings</p>
              <p className="text-sm text-slate-600 mt-1">Example: depth = 2, 4, 8</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-slate-400" />
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <p className="font-bold text-indigo-900">Train</p>
              <p className="text-sm text-indigo-700 mt-1">Fit each candidate</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-slate-400" />
            <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
              <p className="font-bold text-sky-900">Validate</p>
              <p className="text-sm text-sky-700 mt-1">Compare unseen-fold scores</p>
            </div>
            <ArrowRight className="hidden md:block mx-auto text-slate-400" />
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-bold text-emerald-900">Select</p>
              <p className="text-sm text-emerald-700 mt-1">Keep the best candidate</p>
            </div>
          </div>
          <p className="text-slate-700 mt-5 leading-relaxed">
            <strong>Main idea:</strong> Hyperparameter tuning does not change the training data. It compares different model configurations and chooses the configuration that performs best according to a validation strategy and metric.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Real-Life Analogy: Preparing Tea</p>
          <p className="text-slate-800 italic leading-relaxed">
            Milk, water and tea leaves are like the data. The recipe is like the algorithm. Settings such as boiling time and sugar quantity are like hyperparameters. The same ingredients can produce different results when those settings change. The goal is not to find one universally perfect recipe, but a recipe that works well for the situation we care about.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-rose-200 bg-rose-50 rounded-xl p-5">
            <p className="font-bold text-rose-900">Too Simple</p>
            <p className="text-sm text-rose-800 mt-2">Example: Decision Tree <code>max_depth=1</code> may underfit.</p>
          </div>
          <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-5">
            <p className="font-bold text-emerald-900">Useful Complexity</p>
            <p className="text-sm text-emerald-800 mt-2">A validated setting may generalize better.</p>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-5">
            <p className="font-bold text-amber-900">Too Flexible</p>
            <p className="text-sm text-amber-800 mt-2">A very deep tree may fit training-specific noise.</p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-indigo-900 leading-relaxed">
            <strong>Important:</strong> Tuning can improve a model, but it cannot create useful signal that is absent from the data. A well-tuned weak representation can still perform poorly, and a larger search is not automatically a better search.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-are-hyperparameters">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Settings className="mr-3 text-indigo-600" /> Parameters vs Hyperparameters
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          <strong>Model parameters</strong> are learned from data during fitting. <strong>Hyperparameters</strong> configure the learning procedure or model structure and are selected outside the model's ordinary parameter-fitting step—by a person, a search procedure, or another optimization process.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-8 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Question</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Parameters</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Hyperparameters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-800">
              <tr>
                <td className="px-6 py-4 font-bold">How are they obtained?</td>
                <td className="px-6 py-4">Learned by fitting the model to data</td>
                <td className="px-6 py-4">Chosen/configured outside ordinary parameter fitting</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-bold">Linear model example</td>
                <td className="px-6 py-4">Coefficients and intercept</td>
                <td className="px-6 py-4">Regularization strength</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-bold">Decision Tree example</td>
                <td className="px-6 py-4">Chosen split features and thresholds</td>
                <td className="px-6 py-4"><code>max_depth</code>, <code>min_samples_leaf</code></td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 font-bold">Neural Network example</td>
                <td className="px-6 py-4">Weights and biases</td>
                <td className="px-6 py-4">Learning rate, batch size, architecture choices</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">A useful nuance</p>
          <p className="text-amber-900 leading-relaxed">
            Textbooks often say hyperparameters are “set before training.” That is a useful beginner definition, but some training schedules can change values during training. The key distinction is that these settings are not learned in the same way as the model's fitted parameters.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="categories-examples">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Common Hyperparameter Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-indigo-900 border-b border-indigo-200 pb-2 mb-4 text-xl">Model Complexity / Structure</h3>
            <ul className="list-disc pl-5 text-slate-800 space-y-2">
              <li>Decision Tree: <code>max_depth</code>, <code>min_samples_leaf</code></li>
              <li>KNN: <code>n_neighbors</code></li>
              <li>Random Forest: <code>max_depth</code>, <code>max_features</code></li>
              <li>Neural Network: number and size of hidden layers</li>
            </ul>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sky-900 border-b border-sky-200 pb-2 mb-4 text-xl">Training / Optimization</h3>
            <ul className="list-disc pl-5 text-slate-800 space-y-2">
              <li>Learning rate</li>
              <li>Batch size</li>
              <li>Maximum epochs / iterations</li>
              <li>Momentum or optimizer settings</li>
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-emerald-900 border-b border-emerald-200 pb-2 mb-4 text-xl">Regularization</h3>
            <ul className="list-disc pl-5 text-slate-800 space-y-2">
              <li>Ridge/Lasso regularization strength</li>
              <li>SVM <code>C</code></li>
              <li>Dropout rate</li>
              <li>Tree pruning / minimum-sample controls</li>
            </ul>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-violet-900 border-b border-violet-200 pb-2 mb-4 text-xl">Ensemble Settings</h3>
            <ul className="list-disc pl-5 text-slate-800 space-y-2">
              <li>Number of trees / boosting rounds</li>
              <li>Boosting learning rate</li>
              <li>Row or feature subsampling</li>
              <li>Base-estimator complexity</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8 overflow-x-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-4">A Few Algorithm-Specific Examples</h3>
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-bold text-slate-700">Algorithm</th>
                <th className="px-5 py-3 font-bold text-slate-700">Examples of hyperparameters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr><td className="px-5 py-3 font-bold">KNN</td><td className="px-5 py-3"><code>n_neighbors</code>, distance metric, weights</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-3 font-bold">Decision Tree</td><td className="px-5 py-3"><code>max_depth</code>, <code>min_samples_split</code>, criterion</td></tr>
              <tr><td className="px-5 py-3 font-bold">Random Forest</td><td className="px-5 py-3"><code>n_estimators</code>, <code>max_depth</code>, <code>max_features</code></td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-3 font-bold">SVM</td><td className="px-5 py-3"><code>C</code>, kernel, <code>gamma</code></td></tr>
              <tr><td className="px-5 py-3 font-bold">Gradient Boosting</td><td className="px-5 py-3"><code>n_estimators</code>, learning rate, tree depth</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="validation-example">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> How Does Tuning Choose a Setting?
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Imagine we are tuning <code>max_depth</code> for a Decision Tree. We evaluate three candidate values using the same validation procedure.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-slate-200 text-left bg-white rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Candidate</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Mean validation accuracy</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
              <tr><td className="px-5 py-3"><code>max_depth=2</code></td><td className="px-5 py-3">0.84</td><td className="px-5 py-3">May be too simple</td></tr>
              <tr className="bg-emerald-50"><td className="px-5 py-3"><code>max_depth=4</code></td><td className="px-5 py-3 font-bold">0.91</td><td className="px-5 py-3">Best of these candidates</td></tr>
              <tr><td className="px-5 py-3"><code>max_depth=8</code></td><td className="px-5 py-3">0.87</td><td className="px-5 py-3">More complexity did not help validation</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-slate-900 mb-3">Step-by-step</p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-800">
            <li>Compare the candidate validation scores: <code>0.84, 0.91, 0.87</code>.</li>
            <li>The largest score is <code>0.91</code>.</li>
            <li>Among these candidates, select <code>max_depth=4</code>.</li>
            <li>Do <strong>not</strong> call it universally optimal. It is only the best setting among the candidates and validation procedure we tested.</li>
          </ol>
        </div>

        <details className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8">
          <summary className="font-bold text-indigo-900 cursor-pointer">Going Deeper: tuning as an optimization problem</summary>
          <div className="mt-4 text-slate-800 space-y-3">
            <p>Conceptually, for a score that we want to maximize:</p>
            <div className="text-center text-xl font-mono bg-white rounded-lg border border-indigo-100 py-4 px-2 overflow-x-auto">
              h* = arg max<sub>h ∈ H</sub> CVScore(h)
            </div>
            <p>
              Here, <code>H</code> is the search space and <code>h*</code> is the best candidate found by that search. If we are minimizing a loss such as RMSE, the direction is reversed.
            </p>
          </div>
        </details>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="workflow">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Workflow className="mr-3 text-indigo-600" /> Hyperparameter Tuning Workflow
        </h2>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 text-xl">A Safer 8-Step Workflow</h3>
          </div>
          <div className="p-6">
            <ol className="list-decimal pl-5 text-lg space-y-4 text-slate-800">
              <li><strong>Keep a final test set aside:</strong> Do not use it to repeatedly choose hyperparameters.</li>
              <li><strong>Choose a baseline model:</strong> Measure where you are starting.</li>
              <li><strong>Choose the evaluation metric:</strong> Accuracy is not suitable for every task.</li>
              <li><strong>Define a sensible search space:</strong> Include plausible values, not every imaginable number.</li>
              <li><strong>Choose a search strategy:</strong> Manual, Grid Search, Random Search, or another suitable optimizer.</li>
              <li><strong>Evaluate candidates using validation/CV:</strong> Use the same fair procedure for all candidates.</li>
              <li><strong>Refit the selected configuration:</strong> Train the chosen configuration on the available development/training data.</li>
              <li><strong>Evaluate once on the untouched test set:</strong> Report how the selected model performs on data not used for selection.</li>
            </ol>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-rose-900 mb-2">Do not tune on the final test set</p>
          <p className="text-rose-900 leading-relaxed">
            If you try a configuration, check the test score, change the model, check the same test set again, and repeat, the test set gradually becomes part of the model-selection process. Use validation or cross-validation for tuning and reserve the final test set for final evaluation.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="techniques">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-indigo-600" /> Major Tuning Techniques
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Manual Search</h3>
            <p className="text-slate-700 leading-relaxed">
              Try a small number of settings based on prior knowledge and inspect validation results. Useful for learning and quick baselines, but inefficient for large search spaces.
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Grid Search</h3>
            <p className="text-indigo-900 leading-relaxed">
              Evaluate every combination in a predefined finite grid. Systematic, but the number of combinations can grow quickly.
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xl font-bold text-sky-900 mb-3">Random Search</h3>
            <p className="text-sky-900 leading-relaxed">
              Evaluate a chosen number of sampled configurations. It can explore a larger space without evaluating every possible combination.
            </p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 mb-2">The Search-Budget Problem</p>
          <p className="text-indigo-900 mb-3">Suppose our grid contains:</p>
          <ul className="list-disc pl-5 text-indigo-900 space-y-1">
            <li><code>n_estimators</code>: 2 values</li>
            <li><code>max_depth</code>: 3 values</li>
            <li><code>min_samples_split</code>: 2 values</li>
          </ul>
          <div className="mt-4 font-mono text-indigo-950 bg-white border border-indigo-100 rounded-lg p-4">
            2 × 3 × 2 = 12 hyperparameter combinations
          </div>
          <p className="text-indigo-900 mt-3">
            With 5-fold cross-validation, that means <strong>12 × 5 = 60 cross-validation fits</strong>, before considering the final refit of the selected configuration.
          </p>
        </div>

        <p className="text-lg text-slate-800 leading-relaxed mb-8">
          The next lesson, <a href="/learn/grid-random-search" className="text-indigo-700 font-semibold hover:underline">Grid &amp; Random Search</a>, compares these two search strategies in more detail.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="grid-search-python">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Cpu className="mr-3 text-indigo-600" /> GridSearchCV Example
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          This example keeps 20% of Iris as a final test set. <code>GridSearchCV</code> searches only inside the training portion using 5-fold stratified cross-validation.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Random Forest Hyperparameter Tuning</h3>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">Python</span>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0"><code className="language-python">{`from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import (
    GridSearchCV,
    StratifiedKFold,
    train_test_split
)

# 1. Load data
X, y = load_iris(return_X_y=True)

# 2. Keep the final test set out of tuning
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# 3. Baseline estimator
model = RandomForestClassifier(random_state=42)

# 4. Candidate hyperparameters: 2 x 3 x 2 = 12 combinations
param_grid = {
    "n_estimators": [50, 100],
    "max_depth": [2, 4, None],
    "min_samples_split": [2, 5]
}

# 5. Validation strategy
cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

# 6. Search on training data only
search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    scoring="accuracy",
    cv=cv,
    n_jobs=-1,
    refit=True
)

search.fit(X_train, y_train)

# 7. Evaluate selected model on untouched test data
pred = search.predict(X_test)

print("Best parameters:", search.best_params_)
print("Best CV accuracy:", round(search.best_score_, 3))
print("Final test accuracy:", round(accuracy_score(y_test, pred), 3))`}</code></pre>
          </div>
          <div className="bg-slate-900 text-emerald-400 p-4 font-mono text-sm overflow-x-auto">
            <p>Output:</p>
            <p>Best parameters: {'{'}'max_depth': 4, 'min_samples_split': 5, 'n_estimators': 50{'}'}</p>
            <p>Best CV accuracy: 0.967</p>
            <p>Final test accuracy: 0.933</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">How to read this result</h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-800">
            <li><strong>Best parameters</strong> are the best combination among the 12 candidates under this CV procedure.</li>
            <li><strong>Best CV accuracy = 0.967</strong> is a model-selection score from the training portion.</li>
            <li><strong>Final test accuracy = 0.933</strong> is a separate evaluation on data that was not used by GridSearchCV.</li>
            <li>The lower test score is not automatically a problem; validation and test scores naturally differ because they are based on different samples.</li>
          </ul>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">What does <code>refit=True</code> do?</p>
          <p className="text-amber-900 leading-relaxed">
            After the search identifies the best hyperparameters, GridSearchCV refits that configuration using the full data supplied to <code>search.fit(...)</code>. In this example that is the training portion—not the held-out test set.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="preprocessing-and-leakage">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <ShieldCheck className="mr-3 text-indigo-600" /> Tuning with Preprocessing: Avoid Leakage
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          If a model needs learned preprocessing such as scaling, imputation, PCA, or feature selection, that preprocessing should be fitted inside each training fold—not once on the complete dataset before cross-validation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <p className="font-bold text-rose-900 mb-3">Wrong pattern</p>
            <pre className="text-sm font-mono whitespace-pre-wrap text-rose-900">{`X_scaled = scaler.fit_transform(X)
GridSearchCV(model, ...).fit(X_scaled, y)`}</pre>
            <p className="text-sm text-rose-900 mt-3">The scaler has already learned statistics from rows that later appear in validation folds.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <p className="font-bold text-emerald-900 mb-3">Safer pattern</p>
            <pre className="text-sm font-mono whitespace-pre-wrap text-emerald-900">{`Pipeline([
    ("scale", StandardScaler()),
    ("model", SVC())
])`}</pre>
            <p className="text-sm text-emerald-900 mt-3">The pipeline fits preprocessing separately inside each training fold.</p>
          </div>
        </div>

        <p className="text-slate-800 leading-relaxed mb-8">
          When tuning a parameter inside a Pipeline, Scikit-learn uses names such as <code>model__C</code>: the step name, two underscores, then the estimator parameter name.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="metric-selection">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Tune for the Right Metric
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          A search procedure selects the configuration that looks best according to the metric you give it. Therefore the metric should reflect the problem you actually care about.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">Balanced classification</p>
            <p className="text-sm text-slate-700 mt-2">Accuracy may be reasonable.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">Rare positive cases</p>
            <p className="text-sm text-slate-700 mt-2">Precision, recall, F1, PR-style metrics, or a business cost may matter more.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">Regression</p>
            <p className="text-sm text-slate-700 mt-2">MAE, RMSE, R², or domain-specific error may be appropriate.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">The best model depends on the metric</p>
          <p className="text-amber-900">
            Configuration A can have better accuracy while Configuration B has better recall. Hyperparameter tuning cannot decide which business trade-off matters—you must define that goal first.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Common Mistakes
        </h2>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">1. Tuning on the test set</p>
            <p className="text-slate-700 mt-1">Use validation/CV for selection; keep final test data out of repeated decisions.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">2. Searching an enormous grid without a reason</p>
            <p className="text-slate-700 mt-1">More combinations mean more compute and can increase model-selection overfitting. Start with sensible ranges.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">3. Ignoring preprocessing leakage</p>
            <p className="text-slate-700 mt-1">Put learned preprocessing inside a Pipeline when it is part of the model-selection workflow.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">4. Assuming the best CV score is the final real-world score</p>
            <p className="text-slate-700 mt-1">It is an estimate used for selection. Confirm the selected procedure on untouched data.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900">5. Tuning everything at once</p>
            <p className="text-slate-700 mt-1">A smaller, meaningful search space is often easier to interpret and cheaper to validate.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="advanced-note">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Going Deeper: Selection Bias and Nested CV</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          If we evaluate many configurations and report the very best cross-validation score from the same search as though it were an unbiased final performance estimate, that score can be optimistic because the configuration was selected to look good on those folds.
        </p>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          For higher-stakes comparisons, <strong>nested cross-validation</strong> can place hyperparameter selection in an inner loop and performance estimation in an outer loop. For ordinary projects, a clean train/validation-or-CV/test workflow is often easier to understand and implement.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="quick-recap">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>
        <div className="space-y-3 mb-8">
          <details className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Is a hyperparameter learned like a model coefficient?</summary>
            <p className="text-slate-700 mt-3">No. Hyperparameters configure the model/training process and are selected outside ordinary parameter fitting.</p>
          </details>
          <details className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Why should the final test set stay outside GridSearchCV?</summary>
            <p className="text-slate-700 mt-3">Because using it to choose settings would make the test set part of model selection and weaken its role as an unseen final evaluation.</p>
          </details>
          <details className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Does a larger search always produce a better model?</summary>
            <p className="text-slate-700 mt-3">No. Search quality depends on the candidate space, metric, validation design, data, model family, and compute budget.</p>
          </details>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Hyperparameters control choices such as model complexity, regularization, neighborhood size, learning rate and ensemble behavior. Hyperparameter tuning compares candidate configurations using a validation strategy so that we can select a configuration that is more likely to generalize well.
      </p>

      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The essential workflow is: <strong>define the metric → define a sensible search space → tune using validation/cross-validation → refit the selected configuration → evaluate on untouched test data.</strong> Grid Search is one search method; Random Search and other optimizers can be more practical when the search space becomes large.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-8">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Hyperparameter tuning is not about finding a magical universally best setting. It is about making a fair, validation-based choice among candidate configurations for a specific dataset, metric and modeling goal.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-indigo-900 mb-3">Continue Learning</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/grid-random-search" className="inline-flex items-center rounded-lg bg-white border border-indigo-200 px-4 py-2 font-semibold text-indigo-800 hover:bg-indigo-100">Grid &amp; Random Search</a>
          <a href="/learn/cross-validation" className="inline-flex items-center rounded-lg bg-white border border-indigo-200 px-4 py-2 font-semibold text-indigo-800 hover:bg-indigo-100">Cross-Validation</a>
          <a href="/learn/overfitting-underfitting" className="inline-flex items-center rounded-lg bg-white border border-indigo-200 px-4 py-2 font-semibold text-indigo-800 hover:bg-indigo-100">Overfitting &amp; Underfitting</a>
          <a href="/learn/confusion-matrix" className="inline-flex items-center rounded-lg bg-white border border-indigo-200 px-4 py-2 font-semibold text-indigo-800 hover:bg-indigo-100">Confusion Matrix</a>
        </div>
      </div>
    </>
  );
}
