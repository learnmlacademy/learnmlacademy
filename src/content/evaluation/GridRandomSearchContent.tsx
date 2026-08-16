import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Code,
  Dices,
  Grid,
  Layers,
  Lightbulb,
  Search,
  Settings,
  ShieldCheck,
} from 'lucide-react';

const StepArrow = () => (
  <ArrowRight className="hidden md:block h-5 w-5 text-slate-400 shrink-0" aria-hidden="true" />
);

export function GridRandomSearchContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Grid Search and Random Search
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A Machine Learning model can behave very differently when we change settings such as tree depth,
          number of neighbors, regularization strength, or learning rate. These configurable settings are called
          <strong> hyperparameters</strong>.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-4">Grid &amp; Random Search in Simple Words</p>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center text-center">
            <div className="bg-white border border-indigo-200 rounded-lg p-4">
              <p className="font-bold text-slate-800">Choose settings</p>
              <p className="text-sm text-slate-600 mt-1">C, depth, K, etc.</p>
            </div>
            <StepArrow />
            <div className="bg-white border border-indigo-200 rounded-lg p-4">
              <p className="font-bold text-slate-800">Try candidates</p>
              <p className="text-sm text-slate-600 mt-1">Grid or random</p>
            </div>
            <StepArrow />
            <div className="bg-white border border-indigo-200 rounded-lg p-4">
              <p className="font-bold text-slate-800">Validate</p>
              <p className="text-sm text-slate-600 mt-1">Cross-validation</p>
            </div>
            <StepArrow />
            <div className="bg-white border-2 border-emerald-400 rounded-lg p-4">
              <p className="font-bold text-emerald-800">Keep the best candidate</p>
              <p className="text-sm text-slate-600 mt-1">Then test once</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Grid className="h-5 w-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-800">Grid Search</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Try <strong>every combination in a finite list of candidate values</strong>.
            </p>
            <div className="mt-4 font-mono text-sm bg-slate-50 rounded-lg p-4">
              C = [0.1, 1, 10]<br />
              gamma = [0.01, 0.1, 1]<br />
              <strong>3 × 3 = 9 candidates</strong>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Dices className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-800">Random Search</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Sample only a <strong>fixed number of candidate settings</strong> from lists or distributions.
            </p>
            <div className="mt-4 font-mono text-sm bg-slate-50 rounded-lg p-4">
              Search space = many possibilities<br />
              n_iter = 4<br />
              <strong>Only 4 candidates are evaluated</strong>
            </div>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-1">Key idea</p>
          <p className="text-slate-800 leading-relaxed">
            Grid Search is exhaustive <strong>only inside the grid you defined</strong>. Random Search is not
            automatically better or worse—it simply gives you a direct search budget and can explore a broader
            space when exhaustive search would be expensive.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="understanding-hyperparameters">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Settings className="mr-3 text-indigo-600" /> Parameters vs Hyperparameters
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-slate-200 rounded-lg overflow-hidden text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Type</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">How it is obtained</th>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
              <tr>
                <td className="px-5 py-4 font-bold">Model parameter</td>
                <td className="px-5 py-4">Learned during fitting</td>
                <td className="px-5 py-4">Regression coefficients, tree split thresholds</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4 font-bold">Hyperparameter</td>
                <td className="px-5 py-4">Configured outside the learned model parameters</td>
                <td className="px-5 py-4">K in KNN, max_depth, C, learning rate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Hyperparameters influence model capacity, regularization, optimization, or computational cost. A useful
          value depends on the dataset, metric, model, and validation procedure—there is rarely one universal best
          setting.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Cooking analogy</p>
          <p className="text-slate-800 leading-relaxed">
            The ingredients are the data, the recipe is the algorithm, and settings such as oven temperature or
            cooking time are like hyperparameters. You do not learn the correct oven temperature by tasting the
            final exam meal repeatedly—you experiment on development batches, choose a useful setting, and then
            evaluate the final result separately.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-grid-search">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Grid className="mr-3 text-indigo-600" /> What Is Grid Search?
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Grid Search evaluates the Cartesian product of the candidate values you explicitly provide. If the grid
          contains 3 values for one hyperparameter and 2 for another, there are:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <p className="text-center font-mono text-xl text-slate-900">
            3 × 2 = <strong>6 configurations</strong>
          </p>
        </div>

        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm mb-8 overflow-x-auto">
          <p className="font-bold text-slate-800 mb-4">Simple grid</p>
          <table className="border-collapse text-center text-sm min-w-[520px]">
            <thead>
              <tr>
                <th className="border border-slate-200 px-4 py-3 bg-slate-50">max_depth ↓ / trees →</th>
                <th className="border border-slate-200 px-4 py-3 bg-slate-50">50</th>
                <th className="border border-slate-200 px-4 py-3 bg-slate-50">100</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['2', 'Model 1', 'Model 2'],
                ['4', 'Model 3', 'Model 4'],
                ['6', 'Model 5', 'Model 6'],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="border border-slate-200 px-4 py-3 font-bold bg-slate-50">{row[0]}</td>
                  <td className="border border-slate-200 px-4 py-3">{row[1]}</td>
                  <td className="border border-slate-200 px-4 py-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-slate-600 mt-3">
            Grid Search evaluates every cell in this <em>defined</em> grid. It does not search values that are not
            listed.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">How Grid Search Works</h3>
        <div className="space-y-3 mb-8">
          {[
            ['1', 'Define candidate values', 'Choose a small, meaningful grid of hyperparameter values.'],
            ['2', 'Generate combinations', 'Create every combination in that grid.'],
            ['3', 'Cross-validate each candidate', 'Train and validate the model across the selected folds.'],
            ['4', 'Compare the chosen metric', 'For example accuracy, F1, ROC AUC, MAE, or RMSE.'],
            ['5', 'Refit the selected candidate', 'With refit=True, scikit-learn fits the selected settings again on all data given to the search object.'],
          ].map(([n, title, body]) => (
            <div key={n} className="flex items-start gap-4 bg-white border border-slate-200 rounded-lg p-4">
              <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                {n}
              </div>
              <div>
                <p className="font-bold text-slate-800">{title}</p>
                <p className="text-slate-700 mt-1">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Search-Cost Example</h3>
        <p className="text-lg leading-relaxed mb-3 text-slate-800">
          Suppose we search 3 values of <code>C</code> and 3 values of <code>gamma</code>:
        </p>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-6 font-mono text-slate-900">
          <p>3 × 3 = 9 candidate configurations</p>
          <p className="mt-2">9 candidates × 5 CV folds = 45 candidate-validation fits</p>
          <p className="mt-2">With refit=True: + 1 final refit of the selected candidate</p>
        </div>
        <p className="text-slate-700 mb-8">
          This multiplication is why an exhaustive grid can become expensive when we add many hyperparameters or
          many candidate values.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-random-search">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Dices className="mr-3 text-indigo-600" /> What Is Random Search?
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Random Search samples a fixed number of candidate settings from the search space rather than evaluating
          every combination. In Scikit-learn, <code>n_iter</code> controls how many parameter settings are tried.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-800 mb-4">Same 3 × 3 search space</p>
          <div className="grid grid-cols-3 gap-2 max-w-sm">
            {['✓', '', '✓', '', '✓', '', '', '✓', ''].map((mark, index) => (
              <div
                key={index}
                className={`h-16 rounded-lg border flex items-center justify-center font-bold text-lg ${
                  mark ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-300'
                }`}
              >
                {mark || '·'}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-4">
            If <code>n_iter=4</code>, only four sampled settings are evaluated. Which four depends on the sampling
            process and, when applicable, <code>random_state</code>.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Why Can Random Search Be Useful?</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Not every hyperparameter influences performance equally. If one dimension matters a lot and another
          matters little, a rigid grid can spend many evaluations repeating the same few important values. Random
          sampling can explore more distinct values of important dimensions for the same evaluation budget.
        </p>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 mb-1">But Random Search is not magic</p>
          <p className="text-slate-800 leading-relaxed">
            A small random budget can simply miss a strong region. Results can vary with the sampled candidates.
            Use a sensible search space, enough iterations, cross-validation, and a fixed <code>random_state</code>
            when reproducibility matters.
          </p>
        </div>

        <details className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <summary className="font-bold text-slate-800 cursor-pointer">Going Deeper — Lists vs distributions</summary>
          <div className="mt-4 text-slate-700 leading-relaxed space-y-3">
            <p>
              <code>RandomizedSearchCV</code> can sample from lists or from probability distributions. Continuous
              distributions are often useful for continuous hyperparameters because the search is not restricted
              to only a few manually chosen points.
            </p>
            <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm"><code>{`from scipy.stats import loguniform

param_distributions = {
    "svc__C": loguniform(1e-2, 1e2),
    "svc__gamma": loguniform(1e-4, 1e0)
}`}</code></pre>
          </div>
        </details>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="grid-vs-random">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Search className="mr-3 text-indigo-600" /> Grid Search vs Random Search
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-bold text-slate-700">Question</th>
                <th className="px-5 py-3 text-sm font-bold text-indigo-800">Grid Search</th>
                <th className="px-5 py-3 text-sm font-bold text-emerald-800">Random Search</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
              <tr>
                <td className="px-5 py-4 font-bold">What gets tested?</td>
                <td className="px-5 py-4">Every combination in the defined grid</td>
                <td className="px-5 py-4">A fixed number of sampled settings</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4 font-bold">Budget control</td>
                <td className="px-5 py-4">Indirect—depends on grid size</td>
                <td className="px-5 py-4">Direct through n_iter</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-bold">Good starting case</td>
                <td className="px-5 py-4">Small, carefully chosen search space</td>
                <td className="px-5 py-4">Larger space or limited compute budget</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4 font-bold">Guaranteed best?</td>
                <td className="px-5 py-4">Only best among candidates in the grid</td>
                <td className="px-5 py-4">No—sampled search may miss strong settings</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Do not memorize “Random Search is always better.”</p>
          <p className="text-slate-800 leading-relaxed">
            Grid Search can be perfectly reasonable for a small focused grid. Random Search is attractive when
            exhaustive evaluation becomes expensive. The right choice depends on the search space, computation
            budget, and how sensitive the model is to different hyperparameters.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="cross-validation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Why Cross-Validation Is Used During Search
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Choosing hyperparameters from one validation split can make the result depend heavily on that particular
          split. Cross-validation rotates the validation fold and averages the scores, reducing dependence on one
          partition of the data.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 overflow-x-auto">
          <p className="font-bold text-slate-800 mb-4">5-fold example</p>
          <div className="space-y-2 min-w-[620px]">
            {[0, 1, 2, 3, 4].map((validationIndex) => (
              <div key={validationIndex} className="flex items-center gap-2">
                <span className="w-16 text-sm text-slate-500">Round {validationIndex + 1}</span>
                {[0, 1, 2, 3, 4].map((foldIndex) => (
                  <div
                    key={foldIndex}
                    className={`flex-1 text-center py-2 rounded text-xs font-bold ${
                      foldIndex === validationIndex
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {foldIndex === validationIndex ? 'VALIDATE' : 'TRAIN'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-700 mb-8">
          These are <strong>validation folds</strong>, not the final test set. Keep the final test set outside the
          tuning loop whenever you want an independent estimate after model selection.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="data-leakage">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <ShieldCheck className="mr-3 text-indigo-600" /> Avoid Preprocessing Leakage
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          If preprocessing learns from the full dataset before cross-validation, validation folds can influence
          quantities such as means, standard deviations, imputations, feature selection, or PCA components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-rose-700" />
              <p className="font-bold text-rose-900">Risky</p>
            </div>
            <pre className="text-xs bg-white border border-rose-100 rounded-lg p-4 overflow-x-auto"><code>{`X_scaled = scaler.fit_transform(X)
GridSearchCV(model, ...).fit(X_scaled, y)`}</code></pre>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
              <p className="font-bold text-emerald-900">Better</p>
            </div>
            <pre className="text-xs bg-white border border-emerald-100 rounded-lg p-4 overflow-x-auto"><code>{`Pipeline([
    ("scale", StandardScaler()),
    ("svc", SVC())
])`}</code></pre>
          </div>
        </div>

        <p className="text-slate-700 mb-8">
          The Pipeline ensures that preprocessing is fitted again inside each training fold. Pipeline parameters
          are addressed using names such as <code>svc__C</code> and <code>svc__gamma</code>.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python-example">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python: Grid and Random Search on the Same Model
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          This example uses Iris only as a small teaching dataset. We first hold out a final test set, then run both
          searches only on the training portion.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800">Leakage-safe SVM tuning</h3>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0"><code className="language-python">{`from sklearn.datasets import load_iris
from sklearn.model_selection import (
    train_test_split,
    GridSearchCV,
    RandomizedSearchCV,
    StratifiedKFold,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)

pipeline = Pipeline([
    ("scale", StandardScaler()),
    ("svc", SVC()),
])

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42,
)

search_space = {
    "svc__C": [0.1, 1, 10],
    "svc__gamma": ["scale", 0.1, 0.01],
}

# Grid Search: all 3 x 3 = 9 combinations
grid = GridSearchCV(
    estimator=pipeline,
    param_grid=search_space,
    cv=cv,
    scoring="accuracy",
    refit=True,
    n_jobs=-1,
)
grid.fit(X_train, y_train)

# Random Search: sample only 4 combinations
random_search = RandomizedSearchCV(
    estimator=pipeline,
    param_distributions=search_space,
    n_iter=4,
    cv=cv,
    scoring="accuracy",
    random_state=42,
    refit=True,
    n_jobs=-1,
)
random_search.fit(X_train, y_train)

print("Grid candidates:", len(grid.cv_results_["params"]))
print("Grid best:", grid.best_params_)
print("Grid CV accuracy:", round(grid.best_score_, 3))
print("Grid test accuracy:", round(
    accuracy_score(y_test, grid.predict(X_test)), 3
))

print()
print("Random candidates:", len(random_search.cv_results_["params"]))
print("Random best:", random_search.best_params_)
print("Random CV accuracy:", round(random_search.best_score_, 3))
print("Random test accuracy:", round(
    accuracy_score(y_test, random_search.predict(X_test)), 3
))`}</code></pre>
          </div>
          <div className="bg-slate-900 text-emerald-400 p-4 font-mono text-sm border-t border-slate-700 overflow-x-auto">
            <pre className="!m-0">{`Grid candidates: 9
Grid best: {'svc__C': 1, 'svc__gamma': 0.1}
Grid CV accuracy: 0.975
Grid test accuracy: 0.967

Random candidates: 4
Random best: {'svc__gamma': 0.1, 'svc__C': 10}
Random CV accuracy: 0.967
Random test accuracy: 0.967`}</pre>
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-sky-900 mb-2">How to read this result</p>
          <ul className="list-disc pl-5 text-slate-800 space-y-2">
            <li>Grid Search evaluated 9 candidates; Random Search evaluated only 4.</li>
            <li>The best CV settings were different in this run.</li>
            <li>Both happened to score 0.967 on this tiny held-out test set.</li>
            <li>This does <strong>not</strong> prove the methods are equivalent or that Random Search always needs fewer trials.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Common Mistakes
        </h2>

        <div className="space-y-3 mb-8">
          {[
            'Calling the best grid value “the optimal hyperparameter” without saying “among the values tested.”',
            'Building an enormous grid just because many hyperparameters exist.',
            'Assuming Random Search is always faster or always better.',
            'Fitting scaling, imputation, feature selection, or PCA before cross-validation.',
            'Using the final test set repeatedly to decide which search result to keep.',
            'Using accuracy as the only tuning metric when the real problem cares more about recall, precision, cost, or another measure.',
          ].map((item) => (
            <div key={item} className="bg-white border border-slate-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="quick-recap">
        <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Quick Recap</h2>

        <div className="space-y-3 mb-8">
          <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-800 cursor-pointer">If a grid has 4 values for A and 3 for B, how many configurations?</summary>
            <p className="mt-3 text-slate-700">4 × 3 = <strong>12 configurations</strong>.</p>
          </details>
          <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-800 cursor-pointer">What does n_iter=20 mean in RandomizedSearchCV?</summary>
            <p className="mt-3 text-slate-700">The search evaluates 20 sampled parameter settings.</p>
          </details>
          <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-800 cursor-pointer">Why keep a final test set outside the search?</summary>
            <p className="mt-3 text-slate-700">So the final evaluation is not repeatedly used to choose hyperparameters.</p>
          </details>
        </div>
      </div>

      <div id="final-summary">
        <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Grid Search</strong> exhaustively checks every combination in a defined finite grid.
          <strong> Random Search</strong> samples a fixed number of candidate settings, giving direct control over
          the search budget.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Neither method guarantees the universally best model. Good hyperparameter search also depends on a sensible
          search space, the right validation strategy, the right metric, leakage-safe preprocessing, and an untouched
          final evaluation when needed.
        </p>

        <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-indigo-400 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-indigo-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-2">One sentence to remember</p>
              <p className="text-slate-800 text-lg">
                <strong>Grid = try all listed combinations; Random = try a fixed sample of combinations.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <a href="/learn/hyperparameter-tuning" className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold hover:bg-indigo-100">
            ← Hyperparameter Tuning
          </a>
          <a href="/learn/cross-validation" className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold hover:bg-indigo-100">
            Review Cross-Validation
          </a>
          <a href="/learn/confusion-matrix" className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100">
            Next: Confusion Matrix →
          </a>
        </div>
      </div>
    </>
  );
}
