import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Columns, LineChart } from 'lucide-react';

type FitSketchProps = {
  kind: 'underfit' | 'good' | 'overfit';
};

function FitSketch({ kind }: FitSketchProps) {
  const path = kind === 'underfit'
    ? 'M18 108 L182 38'
    : kind === 'good'
      ? 'M18 112 C55 105, 75 82, 100 63 C128 42, 150 28, 182 20'
      : 'M18 112 C38 42, 54 120, 72 54 C88 4, 104 118, 122 46 C141 10, 159 108, 182 20';

  const label = kind === 'underfit'
    ? 'Too simple'
    : kind === 'good'
      ? 'Useful pattern'
      : 'Too sensitive';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <svg viewBox="0 0 200 135" className="w-full h-40" role="img" aria-label={`${label} model sketch`}>
        <line x1="12" y1="120" x2="190" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="12" y1="120" x2="12" y2="12" stroke="#cbd5e1" strokeWidth="1.5" />
        {[
          [25, 108], [48, 98], [72, 82], [98, 64], [128, 46], [158, 30], [180, 22],
        ].map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="3.6" fill="#334155" />
        ))}
        <path d={path} fill="none" stroke={kind === 'good' ? '#059669' : '#e11d48'} strokeWidth="3" />
      </svg>
      <p className={`text-center font-bold ${kind === 'good' ? 'text-emerald-700' : 'text-rose-700'}`}>{label}</p>
    </div>
  );
}

export function OverfittingUnderfittingContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Underfitting and Overfitting</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Machine Learning models are built to learn patterns from data and make predictions on unseen examples. The goal is not simply to score well on the examples used for training, but to learn relationships that remain useful on new data.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
          <p className="font-bold text-indigo-950 text-xl mb-4">Understand First: three possible situations</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg border p-4">
              <p className="font-bold text-rose-700 mb-1">Underfitting</p>
              <p className="text-slate-700">The model has not learned enough of the useful pattern.</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <p className="font-bold text-emerald-700 mb-1">Good Generalization</p>
              <p className="text-slate-700">The model captures useful structure and works well on unseen data.</p>
            </div>
            <div className="bg-white rounded-lg border p-4">
              <p className="font-bold text-rose-700 mb-1">Overfitting</p>
              <p className="text-slate-700">The model fits training-specific details too closely and generalizes poorly.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-700">
            <span className="bg-white border rounded-lg px-3 py-2">Too simple</span>
            <ArrowRight size={16} />
            <span className="bg-white border rounded-lg px-3 py-2">Useful complexity</span>
            <ArrowRight size={16} />
            <span className="bg-white border rounded-lg px-3 py-2">Too sensitive to training data</span>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">A useful model should:</p>
          <ul className="list-disc pl-5 text-indigo-900 text-lg space-y-1">
            <li>Learn useful patterns from training data</li>
            <li>Avoid chasing unnecessary noise</li>
            <li>Perform well on unseen data</li>
            <li>Use an appropriate level of complexity for the problem</li>
          </ul>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Underfitting and overfitting can occur with many different algorithms. The practical question is therefore not simply, “Is my training score high?” but, “How different are my training and validation results, and what does that difference tell me?”
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-10">A familiar student analogy</h2>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-8 w-full max-w-2xl">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Student Behavior</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">ML Analogy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm">
              <tr><td className="px-6 py-4 text-slate-800">Did not understand enough of the syllabus</td><td className="px-6 py-4 text-rose-600 font-bold">Underfitting</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 text-slate-800">Memorized exact practice answers only</td><td className="px-6 py-4 text-rose-600 font-bold">Overfitting</td></tr>
              <tr><td className="px-6 py-4 text-slate-800">Understood ideas and can answer new questions</td><td className="px-6 py-4 text-emerald-600 font-bold">Good Generalization</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Simple visual: too simple, useful, too sensitive</h2>
        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          Imagine predicting house prices from house size. The dots are observations. The fitted shape below is only a teaching sketch: the important idea is how model complexity can move from missing the pattern to following the pattern and then to reacting too strongly to individual observations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <FitSketch kind="underfit" />
          <FitSketch kind="good" />
          <FitSketch kind="overfit" />
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="diagnosis">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-indigo-600" /> Diagnose It Using Training and Validation Performance
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          The most useful diagnosis comes from comparing performance on data used for fitting with performance on separate validation or cross-validation data. The exact numbers below are illustrative, but the pattern is what matters.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-bold text-slate-700">Situation</th>
                <th className="px-5 py-3 font-bold text-slate-700">Training Error</th>
                <th className="px-5 py-3 font-bold text-slate-700">Validation Error</th>
                <th className="px-5 py-3 font-bold text-slate-700">What it suggests</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-5 py-4 font-bold text-rose-700">Underfitting</td>
                <td className="px-5 py-4">18%</td>
                <td className="px-5 py-4">20%</td>
                <td className="px-5 py-4">Both are poor; the model may be too limited.</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4 font-bold text-emerald-700">Useful fit</td>
                <td className="px-5 py-4">5%</td>
                <td className="px-5 py-4">7%</td>
                <td className="px-5 py-4">Both are reasonably good with a small gap.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-bold text-rose-700">Overfitting</td>
                <td className="px-5 py-4">1%</td>
                <td className="px-5 py-4">16%</td>
                <td className="px-5 py-4">Training is excellent, but unseen-data performance is much worse.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Generalization gap</p>
          <p className="text-amber-900 leading-relaxed">
            The difference between training and validation performance is often called a <strong>generalization gap</strong>. A large gap can be evidence of overfitting, but always interpret it together with the absolute performance level and the metric being used.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="underfitting">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <LineChart className="mr-3 text-indigo-600" /> What Is Underfitting?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Underfitting occurs when a model does not capture enough of the useful relationship in the data. A common sign is that performance is poor even on training data, and validation performance is also poor.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Detailed Understanding of Underfitting</p>
          <p className="text-slate-800 leading-relaxed">
            Suppose the useful relationship is quadratic, such as <code>y = x²</code>. If we restrict the model to a straight line (<code>y = mx + b</code>), that model family may be too limited to represent the curved relationship well.
          </p>
          <p className="text-slate-800 leading-relaxed mt-2">
            In that situation, both training and validation error can remain high because the model has not captured enough structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h3 className="text-xl font-bold text-rose-900 mb-3">Possible Causes of Underfitting</h3>
            <ul className="list-decimal pl-5 text-rose-800 text-lg space-y-2">
              <li><strong>Model capacity too limited:</strong> for example, a straight line for an important nonlinear pattern.</li>
              <li><strong>Insufficient or weak features:</strong> the inputs may omit useful information.</li>
              <li><strong>Excessive regularization:</strong> overly strong penalties can make a model too constrained.</li>
              <li><strong>Insufficient optimization/training:</strong> an iterative model may not have trained enough.</li>
              <li><strong>Feature representation mismatch:</strong> the available representation may hide the useful relationship.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Possible Responses</h3>
            <ul className="list-disc pl-5 text-emerald-800 text-lg space-y-2">
              <li>Try a model that can represent the required structure</li>
              <li>Add better domain-relevant features</li>
              <li>Reduce overly strong regularization</li>
              <li>Train iterative models for an appropriate number of steps</li>
              <li>Check whether preprocessing removed useful signal</li>
            </ul>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          <strong>Bias connection:</strong> underfitting is often associated with <strong>high bias</strong>—the model's assumptions or limitations make it systematically unable to represent enough of the relationship. This is a useful diagnostic tendency, not a label that must hold identically for every algorithm and dataset.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="overfitting">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <LineChart className="mr-3 text-indigo-600" /> What Is Overfitting?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Overfitting occurs when a model fits training-specific details so closely that its performance does not carry over well to unseen data. Those details can include noise, outliers, accidental correlations, or patterns that are not stable outside the training sample.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          An overfitted model can have extremely strong training performance while performing substantially worse on validation or test data. It does not have to literally memorize every row; the key problem is poor generalization.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Polynomial intuition</p>
          <p className="text-slate-800 leading-relaxed mb-2">
            Suppose the underlying relationship is fairly smooth. A very high-degree polynomial can be flexible enough to bend around individual noisy observations.
          </p>
          <p className="text-slate-800 leading-relaxed">
            A high degree is not automatically overfitting, and a low degree is not automatically safe. We diagnose the problem from performance on unseen data, not from complexity alone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h3 className="text-xl font-bold text-rose-900 mb-3">Factors That Can Increase Overfitting Risk</h3>
            <ul className="list-decimal pl-5 text-rose-800 text-lg space-y-2">
              <li><strong>Very flexible model relative to available signal/data.</strong></li>
              <li><strong>Limited training data:</strong> random details can have greater influence.</li>
              <li><strong>Many irrelevant/noisy features:</strong> the model may discover accidental patterns.</li>
              <li><strong>Weak complexity control:</strong> some models benefit from regularization or pruning.</li>
              <li><strong>Excessive iterative training:</strong> in some models, validation performance can worsen after continued training.</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Possible Responses</h3>
            <ul className="list-disc pl-5 text-emerald-800 text-lg space-y-2">
              <li>Gather more representative training data when feasible</li>
              <li>Use cross-validation to compare model choices reliably</li>
              <li>Apply appropriate regularization such as L1/L2 where relevant</li>
              <li>Prune or constrain tree complexity</li>
              <li>Use early stopping for iterative models when validation performance stops improving</li>
              <li>Remove irrelevant features using a training-only feature-selection workflow</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-7">
          <p className="font-bold text-blue-900 mb-2">Important: cross-validation does not itself “remove” overfitting</p>
          <p className="text-blue-900 leading-relaxed">
            Cross-validation is mainly an <strong>evaluation and model-selection tool</strong>. It helps reveal whether a choice generalizes across folds. The actual complexity control may come from regularization, pruning, early stopping, a simpler model, better features, more representative data, or another intervention.
          </p>
        </div>

        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          <strong>Variance connection:</strong> overfitting is often associated with <strong>high variance</strong>. A high-variance model can change substantially when the training sample changes slightly, causing unstable predictions or fitted relationships.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Columns className="mr-3 text-indigo-600" /> Bias-Variance Tradeoff
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Increasing model flexibility can reduce systematic error but can also make a model more sensitive to the particular training sample. The useful operating point is the complexity that gives the best generalization for the data and metric that matter—not a mathematically universal “perfect middle.”
        </p>

        <div className="overflow-x-auto mb-10 w-full">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm text-lg text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 font-bold text-indigo-700">Underfitting</th>
                <th className="px-6 py-3 font-bold text-emerald-700">Useful Fit</th>
                <th className="px-6 py-3 font-bold text-rose-700">Overfitting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Training performance</td>
                <td className="px-6 py-4 text-indigo-700">Poor</td>
                <td className="px-6 py-4 text-emerald-700">Good</td>
                <td className="px-6 py-4 text-rose-700 font-bold">Often very good</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Validation performance</td>
                <td className="px-6 py-4 text-indigo-700">Poor</td>
                <td className="px-6 py-4 text-emerald-700 font-bold">Good</td>
                <td className="px-6 py-4 text-rose-700">Much worse than training</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Bias tendency</td>
                <td className="px-6 py-4 text-indigo-700 font-bold">Often high</td>
                <td className="px-6 py-4 text-emerald-700">Appropriate for task</td>
                <td className="px-6 py-4 text-rose-700">Often lower</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Variance tendency</td>
                <td className="px-6 py-4 text-indigo-700">Often lower</td>
                <td className="px-6 py-4 text-emerald-700">Controlled</td>
                <td className="px-6 py-4 text-rose-700 font-bold">Often high</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="learning-curves" className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Learning Curves — Another Diagnostic</h2>

        <p className="text-lg leading-relaxed text-slate-800 mb-5">
          A learning curve compares training and validation performance as the amount of training data changes. It can help answer a practical question: <strong>Would more data likely help, or is the model itself too limited?</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="border rounded-xl p-5 bg-slate-50">
            <p className="font-bold text-rose-800 mb-2">Typical underfitting pattern</p>
            <p className="text-slate-700">Training and validation scores converge to similarly poor values.</p>
            <p className="text-sm text-slate-600 mt-2">Simply adding more data may not solve a model that cannot represent enough of the relationship.</p>
          </div>
          <div className="border rounded-xl p-5 bg-slate-50">
            <p className="font-bold text-rose-800 mb-2">Typical overfitting / high-variance pattern</p>
            <p className="text-slate-700">Training score remains much better than validation score.</p>
            <p className="text-sm text-slate-600 mt-2">More representative data can sometimes narrow the gap, alongside complexity control.</p>
          </div>
        </div>

        <div className="bg-slate-50 border rounded-xl p-5">
          <p className="font-bold text-slate-900 mb-2">Scikit-learn tools</p>
          <p className="text-slate-700 leading-relaxed">
            <code>learning_curve</code> computes cross-validated training and validation scores for different training-set sizes. <code>validation_curve</code> computes training and validation scores while varying one model parameter. These are diagnostic tools; they do not automatically choose the final model for you.
          </p>
        </div>
      </div>

      <div id="python-example">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Python Example — See Underfitting, Useful Fit, and Overfitting</h2>

        <p className="text-lg leading-relaxed text-slate-800 mb-5">
          The earlier clean equation <code>y=x²</code> is excellent for teaching curves, but it is not a good demonstration of real overfitting because it contains no random noise and no held-out evaluation. The example below creates a reproducible noisy relationship and compares three polynomial degrees on separate training and test data.
        </p>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono my-6 overflow-x-auto shadow-lg border border-slate-800">
          <pre className="!m-0">
<code className="language-python">{`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_squared_error

# 1. Reproducible noisy relationship
rng = np.random.RandomState(42)
X = np.linspace(0, 1, 40).reshape(-1, 1)
y = np.sin(2 * np.pi * X[:, 0]) + rng.normal(0, 0.15, 40)

# 2. Keep unseen data for evaluation
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42
)

# 3. Compare different model complexities
for degree in [1, 3, 15]:
    model = make_pipeline(
        PolynomialFeatures(degree=degree, include_bias=False),
        LinearRegression()
    )

    model.fit(X_train, y_train)

    train_mse = mean_squared_error(
        y_train,
        model.predict(X_train)
    )

    test_mse = mean_squared_error(
        y_test,
        model.predict(X_test)
    )

    print(
        f"Degree {degree:>2}: "
        f"train MSE = {train_mse:.3f}, "
        f"test MSE = {test_mse:.3f}"
    )`}</code>
          </pre>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-xl p-5 font-mono text-sm mb-6 overflow-x-auto">
          <p>Degree&nbsp; 1: train MSE = 0.170, test MSE = 0.290</p>
          <p>Degree&nbsp; 3: train MSE = 0.018, test MSE = 0.022</p>
          <p>Degree 15: train MSE = 0.009, test MSE = 1.187</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="border rounded-xl p-5 bg-rose-50">
            <p className="font-bold text-rose-900 mb-2">Degree 1</p>
            <p className="text-rose-900">Training and test error are both relatively high.</p>
            <p className="text-sm text-rose-800 mt-2"><strong>Diagnosis:</strong> underfitting in this example.</p>
          </div>
          <div className="border rounded-xl p-5 bg-emerald-50">
            <p className="font-bold text-emerald-900 mb-2">Degree 3</p>
            <p className="text-emerald-900">Training and test error are both low and close.</p>
            <p className="text-sm text-emerald-800 mt-2"><strong>Diagnosis:</strong> useful generalization for this split.</p>
          </div>
          <div className="border rounded-xl p-5 bg-rose-50">
            <p className="font-bold text-rose-900 mb-2">Degree 15</p>
            <p className="text-rose-900">Training error is lowest, but unseen-data error becomes much worse.</p>
            <p className="text-sm text-rose-800 mt-2"><strong>Diagnosis:</strong> overfitting in this example.</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Do not memorize the degrees</p>
          <p className="text-amber-900 leading-relaxed">
            Degree 1, 3, and 15 are only examples for this generated dataset. A degree-15 model is not automatically overfitted on every problem, and degree 3 is not universally best. Use validation or cross-validation to choose complexity for the actual data.
          </p>
        </div>
      </div>

      <div id="fixes" className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Match the Fix to the Diagnosis</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-bold">Observation</th>
                <th className="px-5 py-3 font-bold">Possible next checks</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white">
              <tr>
                <td className="px-5 py-4">Training and validation both poor</td>
                <td className="px-5 py-4">More suitable features, more expressive model, less excessive regularization, better optimization.</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4">Training strong, validation much weaker</td>
                <td className="px-5 py-4">Regularization, simpler model, pruning, early stopping, feature selection, more representative data.</td>
              </tr>
              <tr>
                <td className="px-5 py-4">Both reasonably strong</td>
                <td className="px-5 py-4">Confirm across folds/test data and optimize only if the business/technical metric still requires improvement.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="common-mistakes" className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common Mistakes</h2>
        <div className="space-y-4">
          {[
            ['“99% training accuracy means the model is excellent.”', 'Training performance alone cannot tell you whether the model generalizes.'],
            ['“A complex model is always overfitted.”', 'Complexity increases risk, but overfitting is diagnosed from unseen-data performance.'],
            ['“Cross-validation prevents overfitting.”', 'Cross-validation helps estimate and compare generalization; complexity control is a separate step.'],
            ['“More data always fixes overfitting.”', 'More representative data can help some high-variance problems, but it is not a universal cure.'],
            ['“The test set can be checked after every model change.”', 'Repeatedly adapting to test results turns the test set into part of model selection.'],
          ].map(([mistake, correction]) => (
            <div key={mistake} className="border border-slate-200 rounded-xl p-5 bg-white">
              <p className="font-bold text-rose-800 mb-1">{mistake}</p>
              <p className="text-slate-700">{correction}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="quick-recap" className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-xl p-5 bg-slate-50">
            <p className="font-bold text-slate-900 mb-2">Underfitting signal</p>
            <p className="text-slate-700">Training and validation performance are both poor.</p>
          </div>
          <div className="border rounded-xl p-5 bg-slate-50">
            <p className="font-bold text-slate-900 mb-2">Overfitting signal</p>
            <p className="text-slate-700">Training is much stronger than validation/test performance.</p>
          </div>
          <div className="border rounded-xl p-5 bg-slate-50">
            <p className="font-bold text-slate-900 mb-2">Main objective</p>
            <p className="text-slate-700">Choose the model and complexity that generalize best to unseen data.</p>
          </div>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Underfitting and overfitting describe two important ways a model can fail to generalize. Underfitting means the model has not captured enough useful structure; overfitting means training-specific details influence the model too strongly. The most useful diagnosis comes from comparing training performance with properly held-out validation or cross-validation performance.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-8">
        <p className="text-slate-900 font-bold mb-2 text-xl flex items-center gap-2"><CheckCircle2 size={22} /> Most Important Insight to Remember</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Do not choose a model because it fits the training data best. Choose it because its performance on unseen data shows that it has learned a useful, repeatable pattern.
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-3">Continue learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/bias-variance" className="text-indigo-700 underline font-semibold">Bias–Variance</a>
          <a href="/learn/cross-validation" className="text-indigo-700 underline font-semibold">Cross-Validation</a>
          <a href="/learn/ridge-regression" className="text-indigo-700 underline font-semibold">Ridge Regression</a>
          <a href="/learn/lasso-regression" className="text-indigo-700 underline font-semibold">Lasso Regression</a>
          <a href="/learn/cost-functions" className="text-indigo-700 underline font-semibold">Cost Functions</a>
        </div>
      </div>
    </>
  );
}
