import React from 'react';
import {
  Target,
  AlertTriangle,
  ShieldCheck,
  Activity,
  BarChart,
  Code,
  ShieldAlert,
  CheckCircle,
  Search,
} from 'lucide-react';

export function ConfusionMatrixContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Confusion Matrix in Machine Learning
        </h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A confusion matrix is a table for understanding the mistakes made by a classification model. Instead of only asking <strong>"How many predictions were correct?"</strong>, it asks a more useful question: <strong>"Which classes were confused with which other classes?"</strong>
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Confusion Matrix in Simple Words</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            {[
              ['1', 'Actual answer'],
              ['2', 'Model prediction'],
              ['3', 'Compare them'],
              ['4', 'Count each type of result'],
            ].map(([step, label]) => (
              <div key={step} className="bg-white border border-indigo-200 rounded-lg p-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center mx-auto mb-2">
                  {step}
                </div>
                <p className="font-semibold text-slate-800">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-indigo-900 mt-4 mb-0">
            For a binary problem, every prediction ends up in one of four boxes: <strong>TP, TN, FP, or FN</strong>.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Confusion matrices are useful in problems such as spam filtering, fraud screening, defect detection, credit-risk classification, security alerts, and medical research because different kinds of mistakes can have very different consequences.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-indigo-900 text-lg leading-relaxed mb-2 font-bold">Why the Name "Confusion Matrix"?</p>
          <p className="text-indigo-800 text-lg leading-relaxed mb-0">
            Off-diagonal cells show cases where one class was predicted as another. For example, a spam email predicted as legitimate is one kind of confusion, while a legitimate email predicted as spam is a different kind of confusion.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-confusion-matrix">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> What Is a Confusion Matrix?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A confusion matrix compares <strong>actual labels</strong> with <strong>predicted labels</strong>. In a binary classification problem, the four cells are True Positive, False Positive, False Negative, and True Negative.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Binary Classification Confusion Matrix</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Suppose <strong>Positive</strong> is the class we especially want to detect, such as "Fraud" or "Spam". A common teaching layout is:
        </p>

        <div className="bg-white border text-center border-slate-200 rounded-xl p-4 sm:p-8 shadow-sm mb-8 overflow-x-auto w-full md:w-fit font-mono">
          <table className="w-full min-w-[620px] text-slate-800">
            <thead>
              <tr>
                <th className="p-3"></th>
                <th className="p-3 bg-slate-100 border border-slate-200">Predicted Positive</th>
                <th className="p-3 bg-slate-100 border border-slate-200">Predicted Negative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-3 bg-slate-100 border border-slate-200 text-left">Actual Positive</th>
                <td className="p-4 border border-slate-200 bg-emerald-50 text-emerald-900 font-bold text-lg">True Positive (TP)</td>
                <td className="p-4 border border-slate-200 bg-rose-50 text-rose-900 font-bold text-lg">False Negative (FN)</td>
              </tr>
              <tr>
                <th className="p-3 bg-slate-100 border border-slate-200 text-left">Actual Negative</th>
                <td className="p-4 border border-slate-200 bg-orange-50 text-orange-900 font-bold text-lg">False Positive (FP)</td>
                <td className="p-4 border border-slate-200 bg-sky-50 text-sky-900 font-bold text-lg">True Negative (TN)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Important: check the axis and label order.</p>
          <p className="text-amber-900 mb-2">
            Different books and tools may display axes in different orientations. In scikit-learn, <code>confusion_matrix(y_true, y_pred)</code> uses <strong>rows for true classes</strong> and <strong>columns for predicted classes</strong>.
          </p>
          <p className="text-amber-900 mb-0">
            For binary labels ordered as <code>[0, 1]</code>, the matrix is commonly read as <code>[[TN, FP], [FN, TP]]</code>.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">One Consistent Example for the Whole Lesson</h3>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Imagine 100 cases. There are 40 actual positives and 60 actual negatives. The model produces:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ['TP = 35', '35 positives found correctly', 'bg-emerald-50 border-emerald-200 text-emerald-900'],
            ['FN = 5', '5 positives missed', 'bg-rose-50 border-rose-200 text-rose-900'],
            ['FP = 10', '10 false alarms', 'bg-orange-50 border-orange-200 text-orange-900'],
            ['TN = 50', '50 negatives rejected correctly', 'bg-sky-50 border-sky-200 text-sky-900'],
          ].map(([value, explanation, classes]) => (
            <div key={value} className={`border rounded-lg p-4 ${classes}`}>
              <p className="font-bold text-lg mb-1">{value}</p>
              <p className="text-sm mb-0">{explanation}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="components-in-detail">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Understanding Each Component
        </h2>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-6 w-6 text-emerald-600 mr-2" />
            <h3 className="text-2xl font-bold text-emerald-900 mt-1">1. True Positive (TP)</h3>
          </div>
          <p className="text-emerald-800 mb-3 text-lg">
            The model predicts <strong>Positive</strong> and the actual class is also <strong>Positive</strong>.
          </p>
          <p className="text-emerald-900 font-mono text-sm mb-0">Example: TP = 35 of the 40 actual positive cases.</p>
        </div>

        <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <ShieldCheck className="h-6 w-6 text-sky-600 mr-2" />
            <h3 className="text-2xl font-bold text-sky-900 mt-1">2. True Negative (TN)</h3>
          </div>
          <p className="text-sky-800 mb-3 text-lg">
            The model predicts <strong>Negative</strong> and the actual class is also <strong>Negative</strong>.
          </p>
          <p className="text-sky-900 font-mono text-sm mb-0">Example: TN = 50 of the 60 actual negative cases.</p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
            <h3 className="text-2xl font-bold text-orange-900 mt-1">3. False Positive (FP)</h3>
          </div>
          <p className="text-orange-800 mb-3 text-lg">
            The model predicts <strong>Positive</strong>, but the actual class is <strong>Negative</strong>. This is a false alarm.
          </p>
          <p className="text-orange-900 font-mono text-sm mb-3">Example: FP = 10.</p>
          <p className="text-orange-800 text-sm mb-0">
            False positives are often associated with a Type-I error in binary hypothesis-testing language, although the terminology depends on how the problem and hypotheses are defined.
          </p>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center mb-3">
            <ShieldAlert className="h-6 w-6 text-rose-600 mr-2" />
            <h3 className="text-2xl font-bold text-rose-900 mt-1">4. False Negative (FN)</h3>
          </div>
          <p className="text-rose-800 mb-3 text-lg">
            The model predicts <strong>Negative</strong>, but the actual class is <strong>Positive</strong>. The positive case was missed.
          </p>
          <p className="text-rose-900 font-mono text-sm mb-3">Example: FN = 5.</p>
          <p className="text-rose-800 text-sm mb-0">
            Whether an FP or FN is more costly depends on the application. In some screening tasks missing a positive can be especially costly; in other tasks false alarms may be the bigger problem.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="metrics-derived">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <BarChart className="mr-3 text-indigo-600" /> Metrics Derived from the Same Matrix
        </h2>

        <p className="text-lg text-slate-800 mb-6">
          We will use the same values throughout: <strong>TP = 35, TN = 50, FP = 10, FN = 5</strong>.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">1. Accuracy — How many predictions were correct overall?</h3>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Accuracy = (TP + TN) / (TP + TN + FP + FN)</p>
          <p className="font-mono text-slate-800 mb-1">= (35 + 50) / 100</p>
          <p className="font-mono text-slate-800 mb-1">= 85 / 100</p>
          <p className="font-mono font-bold text-slate-900 mb-0">= 0.85 = 85%</p>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-lg p-5 mb-8">
          <p className="font-bold text-rose-900 mb-2">Why accuracy can hide an important failure</p>
          <p className="text-rose-900 mb-0">
            If 990 of 1000 transactions are legitimate, a model that predicts "legitimate" for every transaction gets 99% accuracy while detecting none of the 10 fraud cases. Accuracy can still be useful, but it should be interpreted together with class balance, error costs, and other metrics.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">2. Precision — When the model says Positive, how often is it right?</h3>
        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-lg font-bold text-indigo-900 mb-2">Precision = TP / (TP + FP)</p>
          <p className="font-mono text-indigo-800 mb-1">= 35 / (35 + 10)</p>
          <p className="font-mono text-indigo-800 mb-1">= 35 / 45</p>
          <p className="font-mono font-bold text-indigo-900 mb-0">≈ 0.778 = 77.8%</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">3. Recall (Sensitivity) — How many real positives did we find?</h3>
        <div className="pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-lg font-bold text-teal-900 mb-2">Recall = TP / (TP + FN)</p>
          <p className="font-mono text-teal-800 mb-1">= 35 / (35 + 5)</p>
          <p className="font-mono text-teal-800 mb-1">= 35 / 40</p>
          <p className="font-mono font-bold text-teal-900 mb-0">= 0.875 = 87.5%</p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-bold text-amber-400 mb-3">Precision vs Recall: Thresholds Often Create a Trade-Off</h3>
          <p className="text-slate-200 mb-4">
            For a classifier that produces a score or probability, changing the decision threshold changes which cases are predicted positive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-700 rounded p-4 bg-slate-800">
              <span className="text-sky-300 font-bold block mb-1">Higher threshold</span>
              Usually fewer positive predictions: this may reduce false positives, but it can also miss more real positives.
            </div>
            <div className="border border-slate-700 rounded p-4 bg-slate-800">
              <span className="text-rose-400 font-bold block mb-1">Lower threshold</span>
              Usually more positive predictions: this may find more real positives, but can also create more false alarms.
            </div>
          </div>
          <p className="text-slate-300 text-sm mt-4 mb-0">
            This is a common pattern, not a rule that precision and recall must move in opposite directions after every model improvement.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">4. Specificity — How many real negatives did we identify?</h3>
        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-lg font-bold text-sky-900 mb-2">Specificity = TN / (TN + FP)</p>
          <p className="font-mono text-sky-800 mb-1">= 50 / (50 + 10)</p>
          <p className="font-mono text-sky-800 mb-1">= 50 / 60</p>
          <p className="font-mono font-bold text-sky-900 mb-0">≈ 0.833 = 83.3%</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">5. F1 Score — One number combining Precision and Recall</h3>
        <div className="pl-4 border-l-4 border-violet-400 bg-violet-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-lg font-bold text-violet-900 mb-2">F1 = 2 × (Precision × Recall) / (Precision + Recall)</p>
          <p className="font-mono text-violet-800 mb-1">= 2 × (0.778 × 0.875) / (0.778 + 0.875)</p>
          <p className="font-mono font-bold text-violet-900 mb-3">≈ 0.824 = 82.4%</p>
          <p className="text-violet-900 mb-0">
            F1 is the harmonic mean of precision and recall. It can be useful when both false positives and false negatives matter, but it does not include true negatives directly and is not automatically the best metric for every imbalanced problem.
          </p>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-200 p-3">Metric</th>
                <th className="border border-slate-200 p-3">Question it answers</th>
                <th className="border border-slate-200 p-3">Example result</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              <tr><td className="border p-3 font-semibold">Accuracy</td><td className="border p-3">How many predictions were correct overall?</td><td className="border p-3">85.0%</td></tr>
              <tr><td className="border p-3 font-semibold">Precision</td><td className="border p-3">How trustworthy are positive predictions?</td><td className="border p-3">77.8%</td></tr>
              <tr><td className="border p-3 font-semibold">Recall</td><td className="border p-3">How many actual positives were found?</td><td className="border p-3">87.5%</td></tr>
              <tr><td className="border p-3 font-semibold">Specificity</td><td className="border p-3">How many actual negatives were found?</td><td className="border p-3">83.3%</td></tr>
              <tr><td className="border p-3 font-semibold">F1</td><td className="border p-3">How strong is the precision/recall balance?</td><td className="border p-3">82.4%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="multiclass-confusion-matrix">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Search className="mr-3 text-indigo-600" /> Multiclass Confusion Matrix
        </h2>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Confusion matrices are not limited to two classes. If a classifier predicts Cat, Dog, or Horse, the matrix can have three rows and three columns.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full min-w-[600px] border-collapse text-center">
            <thead>
              <tr className="bg-slate-100">
                <th className="border p-3">Actual ↓ / Predicted →</th>
                <th className="border p-3">Cat</th>
                <th className="border p-3">Dog</th>
                <th className="border p-3">Horse</th>
              </tr>
            </thead>
            <tbody>
              <tr><th className="border p-3 bg-slate-50">Cat</th><td className="border p-3 bg-emerald-50 font-bold">8</td><td className="border p-3">1</td><td className="border p-3">1</td></tr>
              <tr><th className="border p-3 bg-slate-50">Dog</th><td className="border p-3">2</td><td className="border p-3 bg-emerald-50 font-bold">7</td><td className="border p-3">1</td></tr>
              <tr><th className="border p-3 bg-slate-50">Horse</th><td className="border p-3">0</td><td className="border p-3">1</td><td className="border p-3 bg-emerald-50 font-bold">9</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg text-slate-800 mb-4">
          The diagonal cells are correct predictions. Off-diagonal cells tell us <strong>which classes are being confused</strong>. For multiclass precision/recall/F1, each class can be evaluated against the others using a one-vs-rest view and then summarized using averages.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 border rounded-lg p-5">
            <p className="font-bold text-slate-900 mb-2">Macro average</p>
            <p className="text-slate-700 mb-0">Compute a metric for each class and take an unweighted average. Each class contributes equally.</p>
          </div>
          <div className="bg-slate-50 border rounded-lg p-5">
            <p className="font-bold text-slate-900 mb-2">Weighted average</p>
            <p className="text-slate-700 mb-0">Average class-wise metrics while weighting each class by its support (number of true examples).</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="counts-vs-normalized">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Counts vs Normalized Confusion Matrices</h2>
        <p className="text-lg text-slate-800 mb-4">
          Raw counts answer questions such as "How many cases were missed?" A normalized matrix can answer questions such as "What fraction of each true class was predicted as each class?"
        </p>
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-lg mb-8">
          <p className="font-mono text-indigo-900 mb-2">Raw: [[50, 10], [5, 35]]</p>
          <p className="font-mono text-indigo-900 mb-0">Row-normalized: useful for comparing error proportions when class sizes differ.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python-implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Scikit-learn can calculate the matrix, unpack TN/FP/FN/TP for a binary problem, create a display, and generate precision/recall/F1 summaries.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Confusion Matrix + Classification Report</h3>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">Python</span>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0">
<code className="language-python">{`import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import (
    confusion_matrix,
    classification_report,
    ConfusionMatrixDisplay,
)

# 1 = Dog (positive class), 0 = Not Dog (negative class)
y_true = np.array([1, 1, 1, 0, 1, 0, 1, 1, 0, 0])
y_pred = np.array([1, 0, 1, 0, 1, 1, 1, 1, 0, 0])

# Rows = true labels, columns = predicted labels
cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
tn, fp, fn, tp = cm.ravel()

print("Confusion matrix:")
print(cm)
print(f"TN={tn}, FP={fp}, FN={fn}, TP={tp}")

print("\\nClassification report:")
print(
    classification_report(
        y_true,
        y_pred,
        labels=[0, 1],
        target_names=["Not Dog", "Dog"],
        digits=2,
    )
)

# Current scikit-learn display API
ConfusionMatrixDisplay.from_predictions(
    y_true,
    y_pred,
    labels=[0, 1],
    display_labels=["Not Dog", "Dog"],
    cmap="Blues",
    values_format="d",
)
plt.title("Confusion Matrix")
plt.show()`}</code>
            </pre>
          </div>
          <div className="bg-[#1e1e1e] text-sky-300 p-4 font-mono text-sm border-t border-slate-700 overflow-x-auto">
            <p className="mb-1">Verified output:</p>
            <pre className="text-slate-300 whitespace-pre">{`Confusion matrix:
[[3 1]
 [1 5]]
TN=3, FP=1, FN=1, TP=5

Classification report:
              precision    recall  f1-score   support

     Not Dog       0.75      0.75      0.75         4
         Dog       0.83      0.83      0.83         6

    accuracy                           0.80        10
   macro avg       0.79      0.79      0.79        10
weighted avg       0.80      0.80      0.80        10`}</pre>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
          <p className="font-bold text-slate-900 mb-2">How to read the heatmap</p>
          <p className="text-slate-800 mb-0">
            Large diagonal values mean many correct predictions. Large off-diagonal values identify particular class confusions that deserve investigation. A dark diagonal is encouraging, but always inspect the counts, class sizes, and error costs rather than judging only by color intensity.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common Mistakes</h2>
        <div className="space-y-4 mb-8">
          {[
            ['Mixing up FP and FN', 'Write actual labels on one axis and predicted labels on the other before interpreting the cells.'],
            ['Assuming Positive means "good"', 'Positive simply means the class designated as positive for the analysis. Fraud or disease can be the positive class.'],
            ['Trusting accuracy alone', 'Check class balance and the consequences of FP and FN.'],
            ['Calling every FN more dangerous than every FP', 'The relative cost is domain-specific.'],
            ['Ignoring decision thresholds', 'For score-based classifiers, changing the threshold changes the confusion matrix.'],
            ['Reading multiclass averages without class-wise scores', 'Macro and weighted averages can hide very different performance for individual classes.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-slate-200 rounded-lg p-4 bg-white">
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-slate-700 mb-0">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="quick-recap" className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Quick Recap</h2>
        <div className="space-y-3">
          <details className="bg-white border border-indigo-100 rounded-lg p-4">
            <summary className="font-semibold text-slate-900 cursor-pointer">A real positive is predicted negative. Which cell?</summary>
            <p className="text-slate-700 mt-3 mb-0"><strong>False Negative (FN).</strong></p>
          </details>
          <details className="bg-white border border-indigo-100 rounded-lg p-4">
            <summary className="font-semibold text-slate-900 cursor-pointer">Which metric asks, "Of all actual positives, how many were found?"</summary>
            <p className="text-slate-700 mt-3 mb-0"><strong>Recall (Sensitivity).</strong></p>
          </details>
          <details className="bg-white border border-indigo-100 rounded-lg p-4">
            <summary className="font-semibold text-slate-900 cursor-pointer">Why can two classifiers with the same accuracy behave very differently?</summary>
            <p className="text-slate-700 mt-3 mb-0">They can make different numbers or types of false-positive and false-negative errors.</p>
          </details>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        A confusion matrix turns a single classification score into an error breakdown. It shows not only how often the model was correct, but <strong>how it was wrong</strong>. From its cells we can derive accuracy, precision, recall, specificity, F1, and other useful measures.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The best metric depends on the problem. Always define the positive class, verify the matrix orientation, understand the cost of false positives and false negatives, and keep class imbalance in mind.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-8">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember</p>
        <p className="text-slate-800 text-lg leading-relaxed mb-0">
          <strong>Do not ask only "What is the accuracy?" Ask "Which mistakes is the model making, and which mistakes matter most for this application?"</strong>
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-10">
        <p className="font-bold text-slate-900 mb-3">Continue learning</p>
        <div className="flex flex-wrap gap-3">
          <a href="/learn/classification-intro" className="text-indigo-700 hover:underline font-medium">Classification Overview</a>
          <span className="text-slate-400">•</span>
          <a href="/learn/logistic-regression" className="text-indigo-700 hover:underline font-medium">Logistic Regression</a>
          <span className="text-slate-400">•</span>
          <a href="/learn/roc-auc" className="text-indigo-700 hover:underline font-medium">ROC-AUC</a>
        </div>
      </div>
    </>
  );
}
