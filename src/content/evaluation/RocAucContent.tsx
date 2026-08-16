import React from 'react';
import {
  Activity,
  BarChart2,
  CheckCircle2,
  Code,
  Crosshair,
  Info,
  ShieldAlert,
  Target,
} from 'lucide-react';

export function RocAucContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          ROC-AUC in Machine Learning
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A classifier often produces a <strong>score</strong> for each example: for instance, a fraud probability of 0.82 or a decision score from an SVM. A threshold then turns that score into a final class such as Fraud / Not Fraud.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6">
          <p className="font-bold text-indigo-900 mb-4">ROC-AUC in Simple Words</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            {[
              ['1', 'Model gives scores'],
              ['2', 'Change threshold'],
              ['3', 'Track TPR and FPR'],
              ['4', 'Summarize with AUC'],
            ].map(([n, text]) => (
              <div key={n} className="bg-white border border-indigo-100 rounded-lg p-3">
                <div className="font-mono font-bold text-indigo-700 mb-1">Step {n}</div>
                <div className="text-sm text-slate-700">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">Why accuracy alone can be misleading</p>
          <p className="text-amber-900 leading-relaxed">
            Suppose 990 of 1,000 transactions are normal and only 10 are fraud. A model that predicts “normal” every time gets 99% accuracy but detects none of the fraud cases. ROC-AUC is one useful way to study ranking performance across many thresholds instead of judging the model at only one threshold.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-roc">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> What Is the ROC Curve?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ROC stands for <strong>Receiver Operating Characteristic</strong>. For binary classification, the ROC curve plots the <strong>True Positive Rate (TPR)</strong> against the <strong>False Positive Rate (FPR)</strong> as the decision threshold changes.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-900 mb-2">Important: use continuous prediction scores</p>
          <p className="text-slate-700 leading-relaxed">
            ROC analysis works best with continuous scores such as <code>predict_proba(... )[:, 1]</code> or a model's <code>decision_function()</code>. Hard class predictions like only 0 and 1 contain very little threshold information and usually produce only a small number of operating points.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">A tiny score example</h3>
        <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm mb-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Sample</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Actual Class</th>
                <th className="px-4 py-3 text-sm font-bold text-slate-700">Model Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-800 font-mono">
              <tr><td className="px-4 py-3">A</td><td className="px-4 py-3">Positive</td><td className="px-4 py-3">0.95</td></tr>
              <tr><td className="px-4 py-3">B</td><td className="px-4 py-3">Positive</td><td className="px-4 py-3">0.85</td></tr>
              <tr><td className="px-4 py-3">C</td><td className="px-4 py-3">Negative</td><td className="px-4 py-3">0.70</td></tr>
              <tr><td className="px-4 py-3">D</td><td className="px-4 py-3">Positive</td><td className="px-4 py-3">0.60</td></tr>
              <tr><td className="px-4 py-3">E</td><td className="px-4 py-3">Negative</td><td className="px-4 py-3">0.40</td></tr>
              <tr><td className="px-4 py-3">F</td><td className="px-4 py-3">Negative</td><td className="px-4 py-3">0.20</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why changing the threshold matters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-3">Threshold = 0.85</p>
            <p className="font-mono text-sm text-slate-700 mb-2">Predicted positive: A, B</p>
            <p className="font-mono text-sm text-slate-700">TP = 2, FP = 0, FN = 1, TN = 3</p>
            <p className="font-mono text-sm text-indigo-700 mt-3">TPR = 2/3 = 0.667</p>
            <p className="font-mono text-sm text-indigo-700">FPR = 0/3 = 0.000</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-3">Threshold = 0.55</p>
            <p className="font-mono text-sm text-slate-700 mb-2">Predicted positive: A, B, C, D</p>
            <p className="font-mono text-sm text-slate-700">TP = 3, FP = 1, FN = 0, TN = 2</p>
            <p className="font-mono text-sm text-indigo-700 mt-3">TPR = 3/3 = 1.000</p>
            <p className="font-mono text-sm text-indigo-700">FPR = 1/3 = 0.333</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-800">
          Lowering the threshold caught the remaining positive example, but it also created a false alarm. The ROC curve records this trade-off over many thresholds.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="understanding-axes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Crosshair className="mr-3 text-indigo-600" /> Understanding the ROC Axes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-orange-900 mb-3">X-Axis: False Positive Rate</h3>
            <div className="font-mono font-bold text-orange-900 mb-3">FPR = FP / (FP + TN)</div>
            <p className="text-sm text-orange-900">
              If 10 of 100 actual negatives are incorrectly flagged positive, FPR = 10/100 = 0.10.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">Y-Axis: True Positive Rate</h3>
            <div className="font-mono font-bold text-emerald-900 mb-3">TPR = TP / (TP + FN)</div>
            <p className="text-sm text-emerald-900">
              TPR is also Recall or Sensitivity. If 90 of 100 actual positives are detected, TPR = 90/100 = 0.90.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">One simple ROC picture</h3>
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 max-w-2xl">
          <svg viewBox="0 0 520 360" className="w-full h-auto" role="img" aria-label="Simple ROC curve showing random diagonal, a useful model curve, and ideal top-left point">
            <line x1="70" y1="300" x2="470" y2="300" stroke="#475569" strokeWidth="2" />
            <line x1="70" y1="300" x2="70" y2="40" stroke="#475569" strokeWidth="2" />
            <line x1="70" y1="300" x2="470" y2="40" stroke="#94a3b8" strokeWidth="2" strokeDasharray="7 7" />
            <polyline
              points="70,300 85,180 110,115 150,80 235,62 350,50 470,40"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="70" cy="40" r="7" fill="#059669" />
            <text x="78" y="34" fontSize="14" fill="#047857">Ideal: FPR 0, TPR 1</text>
            <text x="250" y="187" fontSize="13" fill="#64748b">Random-ranking diagonal</text>
            <text x="175" y="83" fontSize="14" fontWeight="700" fill="#4338ca">Example ROC curve</text>
            <text x="250" y="338" textAnchor="middle" fontSize="14" fill="#334155">False Positive Rate (FPR)</text>
            <text x="22" y="175" textAnchor="middle" fontSize="14" fill="#334155" transform="rotate(-90 22 175)">True Positive Rate (TPR)</text>
            <text x="55" y="305" textAnchor="end" fontSize="12" fill="#64748b">0</text>
            <text x="55" y="45" textAnchor="end" fontSize="12" fill="#64748b">1</text>
            <text x="470" y="320" textAnchor="middle" fontSize="12" fill="#64748b">1</text>
          </svg>
        </div>

        <p className="text-lg leading-relaxed text-slate-800">
          Curves that reach toward the top-left generally indicate stronger ranking performance: high TPR can be achieved while keeping FPR relatively low. The diagonal represents random ranking in the usual binary ROC interpretation.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-auc">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <BarChart2 className="mr-3 text-indigo-600" /> What Is AUC?
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          AUC means <strong>Area Under the ROC Curve</strong>. It compresses the ROC curve into one number that summarizes how well the model's scores rank positive examples above negative examples across thresholds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-slate-900 mb-3">Useful reference points</p>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr><td className="py-3 font-mono font-bold">AUC = 1.0</td><td className="py-3">Perfect ranking on the evaluated data</td></tr>
                <tr><td className="py-3 font-mono font-bold">AUC = 0.5</td><td className="py-3">Random-ranking baseline</td></tr>
                <tr><td className="py-3 font-mono font-bold">AUC &lt; 0.5</td><td className="py-3">Ranking is worse than that baseline; investigate labels/scores/model</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <p className="font-bold text-indigo-900 mb-3">Do not memorize universal labels</p>
            <p className="text-indigo-900 leading-relaxed">
              Rules such as “0.8 is always good” or “0.9 is always excellent” are not universal. Whether an AUC is useful depends on the task, data quality, costs of errors, baseline models, and deployment requirements.
            </p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 mb-2">Ranking interpretation</p>
          <p className="text-emerald-900 leading-relaxed">
            An AUC of 0.92 can be interpreted as the model having about a 92% chance of assigning a higher score to a randomly selected positive example than to a randomly selected negative example, under the usual ranking interpretation.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="step-by-step">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> How ROC Points Are Created
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Start with the score table from earlier. At each threshold, convert scores into positive/negative predictions, count TP/FP/FN/TN, and calculate TPR and FPR.
        </p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-8">
          <p className="font-bold text-slate-900 mb-4">At threshold 0.85</p>
          <div className="space-y-2 font-mono text-sm text-slate-700">
            <p>TP = 2, FP = 0, FN = 1, TN = 3</p>
            <p>TPR = 2 / (2 + 1) = 0.667</p>
            <p>FPR = 0 / (0 + 3) = 0.000</p>
            <p className="font-bold text-indigo-700 pt-2">ROC point = (0.000, 0.667)</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-800">
          Repeating this process across score thresholds creates the sequence of ROC points. AUC summarizes the resulting curve.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-useful">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Comparing Models with ROC-AUC
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          ROC-AUC is useful when you care about how well models rank positives above negatives across many possible thresholds. It can reveal differences that a single fixed-threshold accuracy score hides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-bold text-slate-900 mb-2">Model A</p>
            <p className="text-sm text-slate-700">AUC = 0.91</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="font-bold text-slate-900 mb-2">Model B</p>
            <p className="text-sm text-slate-700">AUC = 0.86</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="font-bold text-amber-900 mb-2">But ask one more question</p>
            <p className="text-sm text-amber-900">Which model is better in the FPR/TPR region your application actually uses?</p>
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 mb-6">
          <p className="font-bold text-sky-900 mb-2">AUC is not the entire decision</p>
          <p className="text-sky-900 leading-relaxed">
            Two ROC curves can cross. A model with a larger overall AUC may still be worse in a narrow operating region that matters to your application. Always inspect the curve and connect evaluation to real false-positive and false-negative costs.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="threshold-selection">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <CheckCircle2 className="mr-3 text-indigo-600" /> ROC-AUC Does Not Choose Your Final Threshold
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          ROC-AUC evaluates ranking across thresholds. Deployment still needs a particular decision threshold, and that threshold should reflect the real problem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="font-bold text-slate-900">Cost of False Positives</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="font-bold text-slate-900">Cost of False Negatives</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="font-bold text-slate-900">Operational Capacity</p>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed">
          For example, if investigators can review only a limited number of alerts each day, a threshold that produces an impractical number of false alarms may be unusable even when the overall ROC-AUC is strong.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          This example uses a leakage-safe Pipeline, an explicit stratified train/test split, continuous positive-class probabilities, and Scikit-learn's ROC utilities.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-8">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">ROC Curve & AUC Score</h4>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">Python</span>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0"><code className="language-python">{`import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve, roc_auc_score, RocCurveDisplay

# 1. Load educational binary-classification data
X, y = load_breast_cancer(return_X_y=True)

# 2. Keep a final test set
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.30,
    random_state=42,
    stratify=y
)

# 3. Scale using training data inside the Pipeline, then fit
model = make_pipeline(
    StandardScaler(),
    LogisticRegression(max_iter=2000)
)
model.fit(X_train, y_train)

# 4. Use continuous scores for the positive class
#    (decision_function scores can also be used by many estimators)
y_score = model.predict_proba(X_test)[:, 1]

# 5. Compute ROC points and ROC-AUC
fpr, tpr, thresholds = roc_curve(y_test, y_score)
auc_score = roc_auc_score(y_test, y_score)

print(f"AUC Score: {auc_score:.3f}")
print(f"ROC points: {len(fpr)}")

# 6. Plot from the same predictions
RocCurveDisplay.from_predictions(y_test, y_score)
plt.plot([0, 1], [0, 1], "--", label="Random ranking")
plt.legend()
plt.show()`}</code></pre>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm border-t border-slate-700">
            <p className="text-emerald-400">Expected output for this fixed split:</p>
            <pre className="text-emerald-300 mt-2">{`AUC Score: 0.998
ROC points: 6`}</pre>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
          <p className="font-bold text-slate-900 mb-2">Why only 6 plotted ROC points?</p>
          <p className="text-slate-700 leading-relaxed">
            Scikit-learn's <code>roc_curve</code> uses <code>drop_intermediate=True</code> by default, so thresholds whose ROC points are collinear with neighboring points can be omitted. This reduces plotting points without changing the ROC-AUC or the visual shape of the curve.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <p className="font-bold text-amber-900 mb-2">Educational dataset note</p>
          <p className="text-amber-900 leading-relaxed">
            A high score on this built-in dataset is only a demonstration of the metric. It does not imply that a model is ready for medical or other high-stakes deployment.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="roc-vs-pr">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <ShieldAlert className="mr-3 text-indigo-600" /> ROC Curve vs Precision-Recall Curve
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          ROC and Precision-Recall curves answer related but different questions. When the positive class is very rare, a Precision-Recall curve can often be especially informative because precision directly reflects how many predicted positives are actually positive.
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white border border-slate-200 rounded-xl text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Curve</th>
                <th className="p-3 text-left">Axes</th>
                <th className="p-3 text-left">Useful focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold">ROC</td>
                <td className="p-3">TPR vs FPR</td>
                <td className="p-3">Ranking trade-off across positives and negatives</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Precision-Recall</td>
                <td className="p-3">Precision vs Recall</td>
                <td className="p-3">Positive-class retrieval quality, often informative for rare positives</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="font-bold text-slate-900 mb-2">Do not choose only from a slogan</p>
          <p className="text-slate-700">
            “Balanced data = ROC” and “imbalanced data = PR” are useful beginner shortcuts but not universal rules. Look at the decision problem, class prevalence, operating region, and costs of mistakes.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="multiclass">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Info className="mr-3 text-indigo-600" /> What About Multiclass Problems?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The basic ROC curve is easiest to understand for binary classification. ROC-AUC can also be extended to multiclass and multilabel problems using strategies such as one-vs-rest or one-vs-one and then combining class-level scores with averaging choices.
        </p>

        <p className="text-slate-700">
          For a first lesson, master the binary case first. The key idea remains the same: evaluate ranking scores rather than relying only on one hard threshold.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common Mistakes</h2>
        <div className="space-y-3">
          {[
            'Using only hard 0/1 predictions and expecting a meaningful multi-threshold ROC curve.',
            'Treating AUC = 0.9 as universally “excellent” without considering the application.',
            'Assuming a higher overall AUC means a model is better at every possible operating threshold.',
            'Choosing a deployment threshold from ROC-AUC alone without considering FP/FN costs.',
            'Ignoring Precision-Recall analysis when rare positive cases are especially important.',
            'Calculating ROC-AUC on training data and reporting it as evidence of unseen-data performance.',
          ].map((item) => (
            <div key={item} className="bg-rose-50 border border-rose-100 rounded-lg p-4 text-rose-900">
              {item}
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="recap">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>
        <div className="space-y-4 mb-8">
          <details className="bg-white border border-slate-200 rounded-xl p-4">
            <summary className="font-bold cursor-pointer">What does the ROC curve plot?</summary>
            <p className="mt-3 text-slate-700">True Positive Rate against False Positive Rate across changing score thresholds.</p>
          </details>
          <details className="bg-white border border-slate-200 rounded-xl p-4">
            <summary className="font-bold cursor-pointer">Does ROC-AUC tell us the best production threshold?</summary>
            <p className="mt-3 text-slate-700">No. It summarizes ranking across thresholds; the final threshold depends on the application's trade-offs and constraints.</p>
          </details>
          <details className="bg-white border border-slate-200 rounded-xl p-4">
            <summary className="font-bold cursor-pointer">Should ROC be computed from hard predictions?</summary>
            <p className="mt-3 text-slate-700">Use continuous model scores whenever possible. Hard labels discard most threshold-ranking information.</p>
          </details>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-10">
          <p className="font-bold text-indigo-900 mb-3">Continue learning</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="/learn/confusion-matrix" className="text-indigo-700 underline font-semibold">Confusion Matrix</a>
            <a href="/learn/logistic-regression" className="text-indigo-700 underline font-semibold">Logistic Regression</a>
            <a href="/learn/cross-validation" className="text-indigo-700 underline font-semibold">Cross-Validation</a>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          ROC-AUC is mainly about <strong>ranking quality across thresholds</strong>. Use continuous scores, inspect the actual curve, and choose the final decision threshold using the real cost of mistakes—not AUC alone.
        </p>
      </div>
    </>
  );
}
