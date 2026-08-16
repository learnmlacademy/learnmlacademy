import React from 'react';
import {
  Activity,
  AlertCircle,
  Check,
  Code,
  GitMerge,
  Layers,
  ShieldCheck,
  Target,
  X as CloseIcon,
} from 'lucide-react';

export function GradientBoostingContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Gradient Boosting</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md">
        Gradient Boosting builds a strong model <strong>one small correction at a time</strong>. Each new learner is added to improve what the current ensemble is still getting wrong.
      </p>

      {/* UNDERSTAND FIRST */}
      <section className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-5">
          <Target className="w-4 h-4" /> Understand First
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-5">Gradient Boosting in Simple Words</h2>

        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Imagine you make a prediction, check the mistake, then ask a small new model to learn a useful correction. You add that correction to the old prediction and repeat.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            ['1', 'Start with a prediction', 'Make a simple first guess.'],
            ['2', 'Measure what is wrong', 'Use a loss function to quantify error.'],
            ['3', 'Train a correction model', 'Fit a small tree to the current error signal.'],
            ['4', 'Add the correction', 'Update the prediction and repeat.'],
          ].map(([step, title, text]) => (
            <div key={step} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold mb-3">{step}</div>
              <p className="font-bold text-slate-900 mb-2">{title}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-0">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <p className="font-bold text-slate-900 text-lg mb-4">One visual = one idea</p>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 text-center">
            <div className="flex-1 bg-white border rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Initial model</p>
              <p className="font-bold text-slate-900">Prediction = 50</p>
            </div>
            <div className="text-slate-400 font-bold">→</div>
            <div className="flex-1 bg-white border rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Remaining error</p>
              <p className="font-bold text-rose-700">Need +20</p>
            </div>
            <div className="text-slate-400 font-bold">→</div>
            <div className="flex-1 bg-white border rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">New tree suggests</p>
              <p className="font-bold text-indigo-700">Correction = +10</p>
            </div>
            <div className="text-slate-400 font-bold">→</div>
            <div className="flex-1 bg-white border rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Updated model</p>
              <p className="font-bold text-emerald-700">Prediction moves upward</p>
            </div>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-amber-900 font-bold mb-2">Important:</p>
          <p className="text-amber-900 mb-0">
            For squared-error regression, the correction signal is closely related to the ordinary residual <code>actual - prediction</code>. For other loss functions, Gradient Boosting fits the <strong>negative gradient of the loss</strong>, so “fit the residuals” is a useful beginner explanation, not the complete general definition.
          </p>
        </div>

        <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">A Familiar Analogy</h3>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Think of a student solving a set of mathematics problems. The teacher first checks the answers, identifies the remaining weak areas, gives targeted practice, checks again, and repeats. Gradient Boosting works similarly: each stage is trained to improve the ensemble that already exists.
        </p>
      </section>

      <hr className="border-slate-200 my-10" />

      {/* WHY / ENSEMBLE */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why Gradient Boosting Is Useful
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        A single model can miss useful patterns or make systematic errors. Ensemble learning combines several models so the final prediction can be stronger than relying on one model alone. Gradient Boosting does this <strong>sequentially</strong>: later learners are built with knowledge of what the current ensemble still needs to improve.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="font-bold text-slate-900 mb-2">Bagging / Random Forest</p>
          <p className="text-slate-700 mb-0">Many randomized models are trained largely independently, then their predictions are aggregated.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <p className="font-bold text-indigo-900 mb-2">Gradient Boosting</p>
          <p className="text-indigo-900 mb-0">Models are added stage by stage, with each stage improving the current additive model.</p>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Gradient-boosted trees are widely used for regression and classification, especially on tabular data. Modern libraries such as XGBoost, LightGBM and CatBoost build on the broader gradient-boosting idea with additional optimization and engineering choices.
      </p>

      <hr className="border-slate-200 my-10" />

      {/* CORE WORKFLOW */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Step-by-Step Workflow
      </h2>

      <div className="space-y-4 mb-8 text-lg">
        {[
          ['1. Initial prediction', 'Start with a simple initial model. For squared-error regression, a constant such as the mean target is a common starting point.'],
          ['2. Compute the current error signal', 'Measure how the current predictions should change to reduce the chosen loss.'],
          ['3. Fit a small regression tree', 'Train the next tree to approximate that correction signal.'],
          ['4. Scale the tree output', 'Multiply the new tree contribution by the learning rate.'],
          ['5. Update the ensemble', 'Add the scaled correction to the current prediction.'],
          ['6. Repeat', 'Recompute the loss gradient and add another tree.'],
          ['7. Final model', 'The prediction is the initial model plus the accumulated contributions of all fitted trees.'],
        ].map(([title, text]) => (
          <div key={title} className="pl-4 border-l-2 border-indigo-200 py-2">
            <strong className="text-slate-900">{title}:</strong> <span className="text-slate-700">{text}</span>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 mb-8">
        <p className="text-purple-900 font-bold text-lg mb-3">Breaking Down the Name</p>
        <p className="text-purple-900 mb-2"><strong>Boosting:</strong> Build an additive ensemble sequentially.</p>
        <p className="text-purple-900 mb-0"><strong>Gradient:</strong> Use the gradient of the loss function to determine the direction in which predictions should be corrected.</p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Decision Trees are commonly used as the base learners in gradient-boosted trees. They are usually kept relatively small so that each stage makes a limited correction rather than trying to solve the entire problem in one tree.
      </p>

      <hr className="border-slate-200 my-10" />

      {/* MATHEMATICS */}
      <section className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-100 rounded-full px-4 py-2 mb-5">
          <Activity className="w-4 h-4" /> Mathematics
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Residuals, Loss and the Negative Gradient</h2>

        <h3 className="text-xl font-bold text-indigo-800 mb-4">1. Mean Squared Error</h3>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          For regression, one common loss is Mean Squared Error:
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-center text-lg mb-6">
          MSE = (1 / n) × Σ(y - ŷ)²
        </div>

        <div className="bg-rose-50 border-l-4 border-rose-400 rounded-r-lg p-5 mb-8">
          <p className="font-bold text-rose-900 mb-3">Worked MSE Example</p>
          <p className="text-rose-900 mb-2">Actual values: 10, 15, 20</p>
          <p className="text-rose-900 mb-3">Predictions: 8, 14, 18</p>
          <div className="space-y-2 text-rose-900">
            <p><strong>Step 1 — Errors:</strong> 2, 1, 2</p>
            <p><strong>Step 2 — Squared errors:</strong> 4, 1, 4</p>
            <p><strong>Step 3 — Add:</strong> 4 + 1 + 4 = 9</p>
            <p className="mb-0"><strong>Step 4 — Average:</strong> 9 / 3 = <strong>3</strong></p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">2. Residuals for Squared-Error Regression</h3>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-center text-lg mb-6">
          Residual = Actual - Predicted
        </div>

        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          Suppose the actual target is <strong>100</strong> and the current prediction is <strong>80</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-white border rounded-xl p-5"><p className="text-sm text-slate-500 mb-1">Actual</p><p className="text-2xl font-bold">100</p></div>
          <div className="bg-white border rounded-xl p-5"><p className="text-sm text-slate-500 mb-1">Prediction</p><p className="text-2xl font-bold">80</p></div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-5"><p className="text-sm text-rose-700 mb-1">Residual</p><p className="text-2xl font-bold text-rose-800">20</p></div>
        </div>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          With squared-error loss, fitting the next tree to residual-like corrections is equivalent to following the negative gradient up to a constant scaling. That is why residuals are such a useful way to first understand Gradient Boosting regression.
        </p>

        <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">3. One Complete Update</h3>
        <p className="text-lg text-slate-700 leading-relaxed mb-5">
          Suppose the current prediction is <strong>13</strong>, the new tree predicts a correction of <strong>2</strong>, and the learning rate is <strong>0.1</strong>.
        </p>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8">
          <p className="text-emerald-900 mb-3"><strong>Update rule:</strong></p>
          <p className="font-mono text-emerald-950 mb-4">New Prediction = Old Prediction + η × Tree Output</p>
          <p className="text-emerald-900 mb-2"><strong>Step 1:</strong> 0.1 × 2 = 0.2</p>
          <p className="text-emerald-900 mb-2"><strong>Step 2:</strong> 13 + 0.2 = 13.2</p>
          <p className="text-emerald-900 mb-0"><strong>Updated prediction = 13.2</strong></p>
        </div>

        <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">4. Tiny Four-Row Example</h3>
        <p className="text-lg text-slate-700 leading-relaxed mb-4">
          Targets: <strong>10, 12, 14, 16</strong>. Their mean is:
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-3 font-mono text-center text-lg mb-5">
          (10 + 12 + 14 + 16) / 4 = 13
        </div>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border border-slate-200 text-lg">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-3">Actual</th>
                <th className="p-3">Initial prediction</th>
                <th className="p-3">Residual</th>
              </tr>
            </thead>
            <tbody>
              {[
                [10, 13, -3],
                [12, 13, -1],
                [14, 13, 1],
                [16, 13, 3],
              ].map((row) => (
                <tr key={row[0]} className="border-b last:border-b-0">
                  <td className="p-3">{row[0]}</td>
                  <td className="p-3">{row[1]}</td>
                  <td className="p-3 font-bold">{row[2] > 0 ? `+${row[2]}` : row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-slate-200 my-10" />

      {/* GOING DEEPER */}
      <section className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 mb-5">
          <Layers className="w-4 h-4" /> Going Deeper
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">The General Gradient-Boosting View</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-5">
          Gradient Boosting is more general than “predict the ordinary residual.” At stage <code>m</code>, it fits a learner to the direction that most reduces the selected differentiable loss function.
        </p>
        <div className="bg-slate-100 rounded-lg px-4 py-4 font-mono text-center text-base md:text-lg mb-6 overflow-x-auto">
          rᵢₘ = - [∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ)] at F = Fₘ₋₁
        </div>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          These values are often called <strong>pseudo-residuals</strong>. For squared-error regression they closely match ordinary residuals; for classification with log loss, the gradient has a different form.
        </p>

        <h3 className="text-xl font-bold text-indigo-800 mb-4">Learning Rate and Number of Trees</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-2">Small learning rate</p>
            <p className="text-slate-700 mb-0">Each tree contributes a smaller correction, so more boosting stages are usually needed.</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-2">Large learning rate</p>
            <p className="text-slate-700 mb-0">Each tree has more influence. Too aggressive a value can hurt generalization.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <p className="font-bold text-indigo-900 mb-2">Tune together</p>
            <p className="text-indigo-900 mb-0">Treat learning rate and number of estimators as a coupled model-selection problem.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-indigo-800 mb-4">Other Important Hyperparameters</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse bg-white border border-slate-200 text-lg">
            <thead>
              <tr className="bg-slate-50 border-b"><th className="p-3">Parameter</th><th className="p-3">What it controls</th></tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-3 font-mono">n_estimators</td><td className="p-3">Number of boosting stages.</td></tr>
              <tr className="border-b"><td className="p-3 font-mono">learning_rate</td><td className="p-3">Shrinkage applied to each tree's contribution.</td></tr>
              <tr className="border-b"><td className="p-3 font-mono">max_depth</td><td className="p-3">Maximum depth of each regression tree.</td></tr>
              <tr className="border-b"><td className="p-3 font-mono">subsample</td><td className="p-3">Fraction of training rows used at each stage; values below 1 create stochastic gradient boosting.</td></tr>
              <tr><td className="p-3 font-mono">n_iter_no_change</td><td className="p-3">Can enable early stopping when validation score stops improving.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-blue-900 font-bold mb-2">Large datasets</p>
          <p className="text-blue-900 mb-0">
            Scikit-learn also provides histogram-based gradient boosting estimators. Its documentation recommends <code>HistGradientBoostingRegressor</code> as a much faster option than classic <code>GradientBoostingRegressor</code> for intermediate and large datasets (around 10,000 samples or more).
          </p>
        </div>
      </section>

      <hr className="border-slate-200 my-10" />

      {/* PYTHON */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Simple Python Example
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This example uses Scikit-learn's built-in Diabetes regression dataset so the code can run without downloading an external dataset. It is an educational regression dataset, not a medical deployment example.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h4 className="font-bold text-indigo-800 text-xl">GradientBoostingRegressor</h4>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0"><code>{`from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score

# 1. Load a built-in regression dataset
data = load_diabetes()
X = data.data
y = data.target

# 2. Keep the test set untouched during training
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 3. Create the model
model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.05,
    max_depth=2,
    random_state=42
)

# 4. Train
model.fit(X_train, y_train)

# 5. Predict unseen test rows
predictions = model.predict(X_test)

# 6. Evaluate
mse = mean_squared_error(y_test, predictions)
rmse = mse ** 0.5
r2 = r2_score(y_test, predictions)

print(f"MSE: {mse:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R2: {r2:.3f}")`}</code></pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <p>MSE: 2742.88</p>
          <p>RMSE: 52.37</p>
          <p>R2: 0.482</p>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-10">
        <p className="text-amber-900 font-bold mb-2">How to read this output</p>
        <p className="text-amber-900 mb-0">
          These scores belong only to this particular dataset, split and hyperparameter setting. They are not a general “expected accuracy” for Gradient Boosting. Use validation or cross-validation when comparing settings, then evaluate the chosen model on an untouched test set.
        </p>
      </div>

      <hr className="border-slate-200 my-10" />

      {/* ADVANTAGES / LIMITATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages and Limitations
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center"><Check className="mr-2 w-6 h-6" /> Advantages</h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Strong tabular baseline:</strong> Often performs very well on structured datasets.</li>
            <li><strong>Nonlinear patterns:</strong> Trees can represent nonlinear relationships and interactions.</li>
            <li><strong>Flexible losses:</strong> The gradient-boosting framework can optimize different differentiable objectives.</li>
            <li><strong>Little need for ordinary feature scaling:</strong> Tree split thresholds do not depend on Euclidean distance.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center"><CloseIcon className="mr-2 w-6 h-6" /> Limitations</h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
            <li><strong>Sequential training:</strong> Later boosting stages depend on earlier stages, limiting parallelism across stages.</li>
            <li><strong>Hyperparameter interactions:</strong> Learning rate, number of trees and tree complexity must be considered together.</li>
            <li><strong>Can overfit:</strong> Excessive capacity or too many stages can hurt generalization.</li>
            <li><strong>Less interpretable than one tree:</strong> Hundreds of additive trees are harder to explain directly.</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center"><GitMerge className="mr-2" /> Gradient Boosting vs Random Forest</h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Feature</th>
              <th className="p-4 font-bold text-indigo-800">Gradient Boosting</th>
              <th className="p-4 font-bold text-emerald-800">Random Forest</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b"><td className="p-4 font-medium">Training style</td><td className="p-4">Sequential additive stages</td><td className="p-4">Trees trained largely independently</td></tr>
            <tr className="border-b"><td className="p-4 font-medium">How diversity/improvement is created</td><td className="p-4">Each new tree follows the current loss gradient</td><td className="p-4">Bootstrap/feature randomness + averaging</td></tr>
            <tr className="border-b"><td className="p-4 font-medium">Parallelism</td><td className="p-4">Harder across boosting stages</td><td className="p-4">Easier across trees</td></tr>
            <tr className="border-b"><td className="p-4 font-medium">Tuning</td><td className="p-4">Learning rate and stage count are especially important</td><td className="p-4">Often a strong baseline with fewer sensitive interactions</td></tr>
            <tr><td className="p-4 font-medium">Which is better?</td><td className="p-4" colSpan={2}>Neither universally. Compare them with appropriate validation for your dataset and metric.</td></tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 my-10" />

      {/* USE CASES */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Where Gradient Boosting Is Used</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          ['Credit risk', 'Predict default or repayment risk from structured applicant data.'],
          ['Fraud detection', 'Learn nonlinear interactions among transaction and account features.'],
          ['Customer churn', 'Estimate which customers are likely to leave.'],
          ['Demand forecasting', 'Predict numeric demand from historical and contextual features.'],
          ['Insurance analytics', 'Model claims risk or expected cost.'],
          ['Ranking and propensity', 'Estimate response, click or conversion likelihood from tabular features.'],
        ].map(([title, text]) => (
          <div key={title} className="bg-white border rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-1">{title}</p>
            <p className="text-slate-700 mb-0">{text}</p>
          </div>
        ))}
      </div>

      {/* COMMON MISTAKES */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Common Mistakes</h2>
      <ul className="list-disc pl-8 text-lg text-slate-700 space-y-3 mb-10">
        <li>Saying every Gradient Boosting model literally trains on <strong>ordinary residuals</strong>. That shortcut is exact only for particular losses such as squared error up to scaling; the general algorithm fits negative loss gradients.</li>
        <li>Assuming training error must decrease in a way that guarantees validation performance will also improve forever.</li>
        <li>Treating a smaller learning rate as automatically better without considering the number of boosting stages.</li>
        <li>Tuning repeatedly on the final test set instead of using validation/cross-validation.</li>
        <li>Assuming Gradient Boosting is always more accurate than Random Forest or every other model.</li>
      </ul>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Quick FAQ</h2>
      <div className="space-y-4 mb-10">
        <details className="bg-white border rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Does every new tree predict the original target?</summary>
          <p className="text-slate-700 mt-3 mb-0">No. It is fitted to a correction signal derived from the gradient of the current loss. For squared-error regression, this is closely connected to residuals.</p>
        </details>
        <details className="bg-white border rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Does Gradient Boosting need feature scaling?</summary>
          <p className="text-slate-700 mt-3 mb-0">Ordinary tree-based Gradient Boosting usually does not require standardization for the same reason KNN or SVM does; trees split using feature thresholds rather than distance calculations.</p>
        </details>
        <details className="bg-white border rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Is Gradient Boosting the same as Gradient Descent?</summary>
          <p className="text-slate-700 mt-3 mb-0">No. Gradient Boosting uses gradient information in function space to add new learners. Gradient Descent usually updates numeric parameters of one model.</p>
        </details>
      </div>

      {/* INTERNAL LINKS */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
        <p className="font-bold text-indigo-900 text-lg mb-3">Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/boosting" className="text-indigo-700 font-semibold underline underline-offset-2">Boosting Overview</a>
          <span className="text-indigo-300">•</span>
          <a href="/learn/adaboost" className="text-indigo-700 font-semibold underline underline-offset-2">AdaBoost</a>
          <span className="text-indigo-300">•</span>
          <a href="/learn/random-forest" className="text-indigo-700 font-semibold underline underline-offset-2">Random Forest</a>
          <span className="text-indigo-300">•</span>
          <a href="/learn/xgboost" className="text-indigo-700 font-semibold underline underline-offset-2">XGBoost</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Gradient Boosting builds an additive model sequentially. It starts with an initial prediction, computes how the current ensemble should change to reduce the loss, fits a small tree to that correction signal, scales the contribution with a learning rate, and repeats.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight</p>
        <p className="text-slate-800 text-lg leading-relaxed mb-0">
          <strong>Gradient Boosting does not build many independent trees.</strong> It builds a sequence in which each new tree is chosen to improve the ensemble that already exists.
        </p>
      </div>
    </>
  );
}
