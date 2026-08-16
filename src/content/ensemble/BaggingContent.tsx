import React from 'react';
import { BaggingDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Target,
  BarChart3,
  GitMerge,
  Code,
  Activity,
  ArrowRight
} from 'lucide-react';

export function BaggingContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Bagging (Bootstrap Aggregating)</h1>
      
      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        <strong>Bagging</strong> means <strong>Bootstrap Aggregating</strong>: train several versions of a model on different random samples of the training data, then combine their predictions.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Bagging in Simple Words
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        A single model—especially an unstable model such as a deep Decision Tree—can change noticeably when the training data changes a little. Bagging tries to make the final prediction more stable by letting several models learn from slightly different versions of the training set.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          ['1', 'Original Data', 'Start with one training dataset.'],
          ['2', 'Bootstrap Samples', 'Create new samples by drawing rows with replacement.'],
          ['3', 'Train Models', 'Fit one base model on each sample.'],
          ['4', 'Combine', 'Average or vote to make the final prediction.'],
        ].map(([step, title, text]) => (
          <div key={step} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">{step}</div>
            <p className="font-bold text-slate-900 mb-1">{title}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">Tiny Example: Why Different Samples?</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-indigo-200">
                <th className="py-2 pr-4">Dataset</th>
                <th className="py-2 pr-4">Rows</th>
                <th className="py-2">What to notice</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-indigo-100"><td className="py-2 pr-4 font-semibold">Original</td><td className="py-2 pr-4 font-mono">[A, B, C, D, E]</td><td className="py-2">Five training rows</td></tr>
              <tr className="border-b border-indigo-100"><td className="py-2 pr-4 font-semibold">Sample 1</td><td className="py-2 pr-4 font-mono">[B, B, D, E, A]</td><td className="py-2">B repeats; C is absent</td></tr>
              <tr><td className="py-2 pr-4 font-semibold">Sample 2</td><td className="py-2 pr-4 font-mono">[C, A, A, D, B]</td><td className="py-2">A repeats; E is absent</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-indigo-900 mt-4">Each model sees a slightly different training sample, so the models do not all make exactly the same mistakes.</p>
      </div>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-medium mb-2">The key idea</p>
        <p className="text-emerald-800">Bagging is most useful when the base model has high variance. Combining diverse predictions can reduce that variance, although it does not guarantee better performance on every dataset.</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Simple Real-Life Analogy: A Committee
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Suppose a company asks only one expert for an important decision. That expert may miss something. If several experts study slightly different evidence and the company combines their opinions, one person's unusual mistake has less influence on the final result.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Bagging follows a similar idea: create diversity among models and aggregate their predictions. The benefit depends on how accurate and how different the individual models are.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY BAGGING IS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Why Bagging Is Useful: Reducing Variance
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Bagging is especially useful for models with <strong>high variance</strong>. Such a model may fit one training sample very well but change substantially when the sample changes. This can contribute to overfitting and weaker generalization.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A simple analogy is a student who memorizes previous answers instead of learning the underlying ideas. Performance may look excellent on familiar questions but drop when the questions change. A high-variance model can show a similar gap between training behaviour and unseen data.
      </p>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        High Variance Models
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Some algorithms are more sensitive to the exact training sample than others. A small data change can produce a noticeably different fitted model. This sensitivity is associated with <strong>high variance</strong>. Fully grown Decision Trees are a classic example, which is why they are often used to demonstrate Bagging.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Main Goal of Bagging</h3>
        <p className="text-indigo-800 text-lg leading-relaxed mb-2">
          The main objective of Bagging is to <strong>reduce the variance of an unstable base estimator by aggregating several randomized versions of it.</strong>
        </p>
        <p className="text-indigo-800 text-lg leading-relaxed">
          Averaging can make predictions more stable when the individual models make partly different errors. The bias–variance trade-off still depends on the estimator and the data.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WORKFLOW AND CONCEPTS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Activity className="mr-2 text-emerald-600" /> Understanding Bootstrap Aggregating
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The word Bagging contains two major concepts: <strong>Bootstrap</strong> and <strong>Aggregating</strong>. Both are extremely important.
      </p>
      <BaggingDiagram />


      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">High-Level Workflow of Bagging</h3>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
              <li><strong>Original Dataset</strong></li>
              <li><strong>Create Multiple Bootstrap Samples:</strong> Draw training rows with replacement, so rows can repeat.</li>
              <li><strong>Train Multiple Base Models:</strong> Often Decision Trees.</li>
              <li><strong>Each Model Makes Prediction</strong></li>
              <li><strong>Aggregate Predictions:</strong> Using majority voting or averaging.</li>
              <li><strong>Final Prediction</strong></li>
            </ol>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xl font-bold text-indigo-800 mb-4">
            What is Bootstrap?
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Bootstrap means <strong>random sampling with replacement</strong>. A row can therefore be drawn more than once, while another row may not appear in a particular bootstrap sample.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
             <p className="text-slate-700 font-bold mb-2">Example:</p>
             <p className="text-slate-700 mb-2">Original dataset: <code>[1, 2, 3, 4, 5]</code></p>
             <p className="text-slate-700 mt-2">Bootstrap sample 1: <code>[2, 2, 4, 5, 1]</code></p>
             <p className="text-slate-700">Bootstrap sample 2: <code>[3, 1, 1, 4, 2]</code></p>
             <p className="text-slate-700">Bootstrap sample 3: <code>[5, 3, 2, 2, 4]</code></p>
             <p className="text-slate-600 italic mt-3 text-sm">Notice: some rows repeat and some are left out. That is expected when sampling with replacement.</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
            <p className="font-bold text-blue-900 mb-2">Going Deeper: Why do some rows get left out?</p>
            <p className="text-blue-900 mb-2">If a bootstrap sample makes <strong>N draws from N rows</strong>, the probability that one particular row is never selected is:</p>
            <p className="font-mono text-center text-blue-950 my-3">(1 - 1/N)<sup>N</sup> ≈ e<sup>-1</sup> ≈ 0.368</p>
            <p className="text-blue-900">So for a large dataset, roughly <strong>36.8%</strong> of rows are left out of a particular bootstrap sample and roughly <strong>63.2%</strong> appear at least once. Those left-out rows are the basis of <em>out-of-bag</em> evaluation.</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-indigo-800 mb-4">
            What is Aggregating?
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            After training multiple models, their predictions must be combined. This is Aggregation.
          </p>
          <ul className="list-disc pl-5 text-lg text-slate-700 space-y-3">
             <li><strong>Classification:</strong> A simple mental model is majority voting. In Scikit-learn's <code>BaggingClassifier</code>, if the base estimators provide class probabilities, the class with the highest <em>mean predicted probability</em> is selected; otherwise it falls back to voting.</li>
             <li><strong>Regression:</strong> The base regressors' numerical predictions are averaged to form the ensemble prediction.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* VISUALIZATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BarChart3 className="mr-2 text-rose-600" /> Visualizing Aggregation
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border text-left border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 text-center mb-2">Classification: Simple Voting Intuition</h3>
          <p className="text-sm text-slate-500 text-center mb-6">Five model predictions for the same new example</p>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {['Yes', 'Yes', 'No', 'Yes', 'No'].map((vote, index) => (
              <div key={index} className={`rounded-lg border p-3 text-center font-bold ${vote === 'Yes' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                <div className="text-xs font-medium text-slate-500 mb-1">M{index + 1}</div>
                {vote}
              </div>
            ))}
          </div>
          <div className="text-center bg-slate-50 rounded-lg p-4">
            <p className="font-mono text-slate-700">Yes = 3 votes &nbsp; | &nbsp; No = 2 votes</p>
            <p className="font-bold text-emerald-700 mt-2">Simple majority result → Yes</p>
          </div>
          <p className="text-xs text-slate-500 mt-3">This is the easiest intuition. Probability-aware classifiers may aggregate mean class probabilities instead.</p>
        </div>

        <div className="bg-white border text-left border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-slate-800 text-center mb-2">Regression: Averaging Example</h3>
          <p className="text-sm text-slate-500 text-center mb-6">Predictions: 100, 120, 110, 130, 140</p>
          <div className="bg-slate-50 p-6 rounded-lg">
             <p className="text-slate-700 font-mono text-center mb-2">100 + 120 + 110 + 130 + 140 = 600</p>
             <p className="text-slate-700 font-mono text-center mb-4">600 / 5 = 120</p>
             <div className="flex justify-center items-center mb-3 text-emerald-600">
               <ArrowRight className="w-8 h-8 rotate-90" />
             </div>
             <p className="text-center text-emerald-700 font-mono text-2xl font-black">Final prediction = 120</p>
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-10">
        <p className="font-bold text-amber-900 mb-3 text-lg">Going Deeper: Why averaging can reduce variance</p>
        <p className="text-amber-900 mb-3">If <strong>n independent models</strong> each have variance σ², the variance of their average is:</p>
        <p className="font-mono text-center text-amber-950 my-3">Var(average) = σ² / n</p>
        <p className="text-amber-900 mb-3">Example: if σ² = 100 and n = 5, the ideal independent-model variance becomes <strong>100 / 5 = 20</strong>.</p>
        <p className="text-amber-900">Real bagged models are usually correlated because they come from the same underlying dataset. With equal pairwise correlation ρ, a useful approximation is <code>σ²[ρ + (1-ρ)/n]</code>. So adding models can reduce variance, but it does <strong>not</strong> make variance disappear completely.</p>
      </div>
      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Bagging vs Random Forest vs Boosting
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden text-left">
          <thead className="bg-slate-100 text-slate-800">
            <tr><th className="p-3">Method</th><th className="p-3">How models differ</th><th className="p-3">How they are trained</th><th className="p-3">Main intuition</th></tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-t"><td className="p-3 font-bold">Bagging</td><td className="p-3">Different random samples; base estimator is configurable</td><td className="p-3">Can be trained independently</td><td className="p-3">Reduce variance through aggregation</td></tr>
            <tr className="border-t"><td className="p-3 font-bold">Random Forest</td><td className="p-3">Bagged trees plus extra randomness in feature selection at splits</td><td className="p-3">Trees can be trained independently</td><td className="p-3">Decorrelate trees further</td></tr>
            <tr className="border-t"><td className="p-3 font-bold">Boosting</td><td className="p-3">Later learners respond to earlier errors/residuals</td><td className="p-3">Sequential</td><td className="p-3">Build a strong model stage by stage</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-slate-900 mb-2">Useful connections</p>
        <p className="text-slate-700 leading-relaxed">
          Review <a href="/learn/decision-trees" className="text-indigo-700 font-semibold hover:underline">Decision Trees</a> and <a href="/learn/bias-variance" className="text-indigo-700 font-semibold hover:underline">Bias–Variance</a>, compare with <a href="/learn/random-forest" className="text-indigo-700 font-semibold hover:underline">Random Forest</a>, then continue to <a href="/learn/boosting" className="text-indigo-700 font-semibold hover:underline">Boosting</a>.
        </p>
      </div>

      {/* COMPLETE PIPELINE */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <GitMerge className="mr-2 text-indigo-600" /> Complete Bagging Pipeline
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is the high-level progression from data collection to final output:
      </p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-12 shadow-sm text-center">
         <div className="inline-flex flex-col items-center">
            <div className="bg-indigo-600 text-white font-bold py-2 px-8 rounded-full mb-2">Original Dataset</div>
            <div className="h-6 border-l-2 border-indigo-300 border-dashed mb-2 text-indigo-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-indigo-600 text-white font-bold py-2 px-8 rounded-full mb-2">Create Multiple Bootstrap Samples</div>
            <div className="h-6 border-l-2 border-indigo-300 border-dashed mb-2 text-indigo-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-full mb-2">Train Multiple Base Models</div>
            <div className="h-6 border-l-2 border-emerald-300 border-dashed mb-2 text-emerald-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-full mb-2">Each Model Makes Prediction</div>
            <div className="h-6 border-l-2 border-emerald-300 border-dashed mb-2 text-emerald-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-rose-600 text-white font-bold py-2 px-8 rounded-full mb-2">Aggregate Predictions</div>
            <div className="h-6 border-l-2 border-rose-300 border-dashed mb-2 text-rose-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-rose-600 text-white font-bold py-2 px-8 rounded-full">Generate Final Output</div>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CODE IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Python Implementation
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This example compares one Decision Tree with a Bagging ensemble on a reproducible synthetic classification dataset. The train/test split is kept separate, and <code>oob_score=True</code> also gives an out-of-bag estimate from the training data.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-6">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h3 className="font-bold text-indigo-800 text-xl">Python Code: Decision Tree vs Bagging</h3>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Reproducible toy classification data
X, y = make_classification(
    n_samples=500,
    n_features=6,
    n_informative=4,
    n_redundant=1,
    class_sep=1.0,
    flip_y=0.05,
    random_state=42
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.25,
    random_state=42,
    stratify=y
)

# One tree
single_tree = DecisionTreeClassifier(random_state=42)
single_tree.fit(X_train, y_train)

# Many trees trained on bootstrap samples
bag_model = BaggingClassifier(
    estimator=DecisionTreeClassifier(random_state=42),
    n_estimators=50,
    bootstrap=True,
    oob_score=True,
    random_state=42,
    n_jobs=-1
)
bag_model.fit(X_train, y_train)

single_pred = single_tree.predict(X_test)
bag_pred = bag_model.predict(X_test)

print(f"Single tree accuracy: {accuracy_score(y_test, single_pred):.3f}")
print(f"Bagging accuracy: {accuracy_score(y_test, bag_pred):.3f}")
print(f"OOB score: {bag_model.oob_score_:.3f}")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Verified Example Output</span>
          </div>
          <p className="text-slate-300">Single tree accuracy: 0.680</p>
          <p className="text-slate-300">Bagging accuracy: 0.824</p>
          <p className="text-slate-300">OOB score: 0.805</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-12">
        <p className="font-bold text-amber-900 mb-2">Do not generalize from one toy run</p>
        <p className="text-amber-900">Bagging performs better than the single tree in this particular reproducible example. It is not a rule that Bagging must improve every dataset or every base estimator. Compare models using appropriate validation on your own problem.</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mb-4">Important Scikit-learn Parameters</h3>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full border border-slate-200 text-left">
          <thead className="bg-slate-100"><tr><th className="p-3">Parameter</th><th className="p-3">Simple meaning</th></tr></thead>
          <tbody className="text-slate-700">
            <tr className="border-t"><td className="p-3 font-mono">estimator</td><td className="p-3">The base model copied and fitted many times.</td></tr>
            <tr className="border-t"><td className="p-3 font-mono">n_estimators</td><td className="p-3">How many base models are in the ensemble.</td></tr>
            <tr className="border-t"><td className="p-3 font-mono">max_samples</td><td className="p-3">How many training samples each base model receives.</td></tr>
            <tr className="border-t"><td className="p-3 font-mono">bootstrap=True</td><td className="p-3">Draw samples with replacement—the classic Bagging setup.</td></tr>
            <tr className="border-t"><td className="p-3 font-mono">max_features</td><td className="p-3">Optionally restrict how many features each base model sees.</td></tr>
            <tr className="border-t"><td className="p-3 font-mono">oob_score=True</td><td className="p-3">Estimate generalization using samples left out of bootstrap draws; available when bootstrapping is used.</td></tr>
          </tbody>
        </table>
      </div>
      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        When Is Bagging a Good Choice?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
          <h3 className="font-bold text-emerald-900 mb-3">Bagging may help when...</h3>
          <ul className="list-disc pl-5 space-y-2 text-emerald-900">
            <li>a single model changes a lot when the training sample changes,</li>
            <li>a flexible model such as a deep Decision Tree is overfitting,</li>
            <li>you can afford to train several base estimators, and</li>
            <li>validation shows that aggregation improves generalization.</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <h3 className="font-bold text-amber-900 mb-3">Bagging may help less when...</h3>
          <ul className="list-disc pl-5 space-y-2 text-amber-900">
            <li>the base model already underfits badly,</li>
            <li>all base models make almost the same errors,</li>
            <li>the base estimator is extremely expensive to train many times, or</li>
            <li>the dataset lacks useful predictive signal.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Common Mistakes
      </h2>
      <div className="space-y-4 mb-10">
        {[
          ['Thinking bootstrap means sampling without replacement', 'Classic Bagging uses sampling with replacement, so duplicate rows are normal.'],
          ['Assuming more estimators always keep giving large gains', 'Performance often levels off. More models also cost more time and memory.'],
          ['Using the final test set to choose n_estimators or other settings', 'Tune with validation or cross-validation; keep the final test set for the final evaluation.'],
          ['Confusing Bagging with Random Forest', 'Random Forest is a tree-specific ensemble that adds feature randomness to the bagging idea.'],
          ['Treating OOB score as magic', 'OOB is a useful training-data estimate when bootstrapping is enabled, but it does not remove the need for careful evaluation.'],
        ].map(([mistake, fix]) => (
          <div key={mistake} className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-slate-900">{mistake}</p>
            <p className="text-slate-700 mt-1">{fix}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Quick Recap
      </h2>
      <div className="space-y-3 mb-10">
        <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <summary className="font-semibold text-slate-900 cursor-pointer">1. Why can the same row appear twice in a bootstrap sample?</summary>
          <p className="text-slate-700 mt-3">Because bootstrap sampling draws rows <strong>with replacement</strong>.</p>
        </details>
        <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <summary className="font-semibold text-slate-900 cursor-pointer">2. What is Bagging mainly trying to reduce?</summary>
          <p className="text-slate-700 mt-3">It is mainly used to reduce the <strong>variance</strong> of an unstable base estimator.</p>
        </details>
        <details className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <summary className="font-semibold text-slate-900 cursor-pointer">3. How are regression predictions combined?</summary>
          <p className="text-slate-700 mt-3">The base regressors' numerical predictions are typically <strong>averaged</strong>.</p>
        </details>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Bagging is a general ensemble strategy that trains multiple versions of a base estimator on randomized samples and combines their predictions.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Its main strength is variance reduction: when the base estimators make partly different errors, aggregation can produce a more stable predictor than one fitted model alone.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Bagging = bootstrap samples + multiple base models + aggregation. It is especially useful when the base estimator is accurate enough but sensitive to changes in the training sample."
         </p>
      </div>

    </>
  );
}

