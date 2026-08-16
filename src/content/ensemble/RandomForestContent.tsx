import React from 'react';
import { 
  Lightbulb, 
  Layers, 
  ShieldCheck, 
  Check, 
  X as CloseIcon, 
  Activity, 
  TextSelect, 
  Banknote, 
  Code,
  Target,
  BarChart3,
  Star,
  GitMerge
} from 'lucide-react';

export function RandomForestContent() {
  const voteData = [
    { name: 'Tree 1', vote: 'Yes', value: 1 },
    { name: 'Tree 2', vote: 'Yes', value: 1 },
    { name: 'Tree 3', vote: 'No', value: 0 },
    { name: 'Tree 4', vote: 'Yes', value: 1 },
    { name: 'Tree 5', vote: 'No', value: 0 },
  ];

  const featureImportance = [
    { name: 'Salary', importance: 45 },
    { name: 'Credit Score', importance: 35 },
    { name: 'Age', importance: 10 },
    { name: 'City', importance: 10 },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Random Forest</h1>
      
      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        Random Forest is an ensemble learning algorithm that combines many Decision Trees for classification or regression.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800 border-b pb-2">
        Random Forest in Simple Words
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-5">
        A single Decision Tree gives one opinion. A Random Forest builds many slightly different trees and combines their predictions. The goal is not to make every tree identical or perfect; the goal is to make the <strong>group prediction more stable</strong>.
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
          {[
            { tree: 'Tree 1', answer: 'YES' },
            { tree: 'Tree 2', answer: 'YES' },
            { tree: 'Tree 3', answer: 'NO' },
          ].map((item) => (
            <div key={item.tree} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-bold text-slate-700">{item.tree}</p>
              <p className={`mt-1 text-lg font-extrabold ${item.answer === 'YES' ? 'text-emerald-700' : 'text-rose-700'}`}>{item.answer}</p>
            </div>
          ))}
          <div className="text-2xl font-bold text-slate-400">→</div>
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-3">
            <p className="text-sm font-bold text-emerald-800">Combined Result</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-700">YES</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-4">
          <p className="font-bold text-indigo-900">1. Make different trees</p>
          <p className="text-slate-700 mt-1">Use random training samples and random feature choices.</p>
        </div>
        <div className="rounded-lg bg-amber-50 border border-amber-100 p-4">
          <p className="font-bold text-amber-900">2. Ask every tree</p>
          <p className="text-slate-700 mt-1">Each tree predicts for the new example.</p>
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4">
          <p className="font-bold text-emerald-900">3. Combine answers</p>
          <p className="text-slate-700 mt-1">Aggregate the tree predictions into one final prediction.</p>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Random Forest is popular because averaging many randomized trees often reduces the instability of a single deep Decision Tree while keeping the ability to learn nonlinear patterns and feature interactions. It is useful, but it is not automatically the best model for every dataset.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Random Forest belongs to <strong>Ensemble Learning</strong>: methods that combine multiple models to produce one prediction.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-medium italic mb-2">
          "Instead of depending on one Decision Tree, Random Forest combines predictions from many randomized Decision Trees."
        </p>
        <p className="text-emerald-800">
          The word <strong>Random</strong> refers mainly to randomness in the training samples and the features considered while growing the trees.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY RANDOM FOREST WAS CREATED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-2 text-indigo-600" /> Why Random Forest Was Created
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        To understand Random Forest, first remember a limitation of Decision Trees: a deep tree can have <strong>high variance</strong> and may overfit the training data.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A single Decision Tree can be sensitive to the exact training sample. Small data changes can sometimes produce noticeably different splits and predictions. If the tree grows too complex, it can fit noise and specific training patterns that do not generalize well.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Instead of relying on one unstable tree, Random Forest creates <strong>many trees</strong>. Each tree learns slightly different patterns from the dataset. When all these trees combine together:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-3 text-lg leading-relaxed max-w-3xl">
        <li>Some tree-specific errors can average out</li>
        <li>Prediction variance can decrease</li>
        <li>The model can become less sensitive to one particular training sample</li>
        <li>Generalization may improve when the trees are sufficiently diverse</li>
      </ul>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Simple Real-Life Analogy
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Imagine a hospital where doctors are trying to diagnose a patient. Suppose only one doctor gives the diagnosis. There is always a possibility that the doctor may miss certain symptoms or misinterpret reports.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Now imagine a panel where several doctors review slightly different evidence and then combine their opinions. One opinion can be wrong, but a diverse group can sometimes be more stable than relying on one person alone. Random Forest uses a similar ensemble idea: <strong>many trees see randomized views of the training problem and their predictions are aggregated</strong>.
      </p>

      <div className="bg-indigo-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-400 mt-6 mb-8">
        <p className="text-indigo-900 font-bold mb-2 text-xl">Core Idea Behind Random Forest</p>
        <p className="text-indigo-800 text-lg leading-relaxed mb-3">
          The central idea can be summarized as: <strong>Diverse trees + aggregation can produce a more stable predictor.</strong>
        </p>
        <p className="text-indigo-800 text-lg leading-relaxed">
          Individual trees can make different errors. Random Forest deliberately creates diversity through sample and feature randomness, then averages or combines the trees so that some uncorrelated errors can cancel out. This often reduces variance, although it does not guarantee higher accuracy on every dataset.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Understanding Decision Trees First
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest is built using Decision Trees. A Decision Tree works like a flowchart where data gets repeatedly split based on conditions (e.g., <em>Is Age {'>'} 30? → Is Income {'>'} 50K?</em>). While highly interpretable, single Decision Trees often suffer from major weaknesses:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-2 text-lg leading-relaxed max-w-3xl">
        <li><strong>Overfitting risk:</strong> A deep tree can fit noise and very specific training patterns.</li>
        <li><strong>High variance:</strong> Small dataset changes can lead to different splits and predictions.</li>
        <li><strong>Noise sensitivity:</strong> Unrestricted trees may create branches around noisy observations.</li>
      </ul>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Ensemble Learning Categories
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest belongs to the broader field of Ensemble Learning. Three common ensemble strategies are:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-2 text-lg leading-relaxed max-w-3xl">
        <li><strong>Bagging</strong> (Random Forest relies heavily on this)</li>
        <li><strong>Boosting</strong> (e.g., XGBoost, AdaBoost, Gradient Boosting)</li>
        <li><strong>Stacking</strong></li>
      </ul>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WORKFLOW & COMPONENTS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-emerald-600" /> High-Level Workflow
      </h2>
      <div className="bg-white border text-left border-slate-200 shadow-sm rounded-xl overflow-hidden mb-10">
         <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Training & Prediction Pipeline</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
              <li><strong>Create randomized training views:</strong> With bootstrap sampling enabled, each tree receives a sample drawn with replacement from the training data.</li>
              <li><strong>Grow multiple Decision Trees:</strong> At each split, only a random subset of features is considered.</li>
              <li><strong>Make predictions:</strong> Send the new example through every tree.</li>
              <li><strong>Aggregate predictions:</strong> Combine the tree outputs rather than trusting one tree.</li>
              <li><strong>Return the final prediction:</strong> Classification combines class evidence; regression averages numerical predictions.</li>
            </ol>
         </div>
      </div>

      <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-purple-900 mb-3">Why the Word "Random" Is Important</p>
        <p className="text-purple-800 mb-3">
          Random Forest commonly introduces randomness in two ways: <strong>1. Bootstrap sampling of training rows</strong> and <strong>2. Random subsets of features at tree splits</strong>.
        </p>
        <p className="text-purple-800">
          These mechanisms encourage the trees to be different. Lower correlation between tree errors is important because averaging nearly identical trees gives less variance reduction than averaging diverse trees.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-blue-600" /> Understanding Bagging
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest uses an ensemble method called <strong>Bagging (Bootstrap Aggregating)</strong>.
      </p>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-6 mb-4">
        Bootstrap Sampling
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Bootstrap sampling means <em>random sampling with replacement</em>. Suppose the original dataset contains <code>[A, B, C, D, E]</code>. One bootstrap sample could be <code>[A, B, B, D, E]</code>. Here, <code>B</code> appears twice and <code>C</code> is absent. Different bootstrap samples help create different trees.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Feature Randomness
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Another powerful idea in Random Forest is <strong>Random Feature Selection</strong>. At each split in the tree, only a <strong>random subset of features</strong> is considered, NOT all features. 
      </p>
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-6">
        <p className="text-slate-700 font-bold mb-2">Example of Feature Randomness:</p>
        <p className="text-slate-700 mb-2">Suppose the dataset contains: <code>[Age, Salary, Education, Experience, City]</code></p>
        <ul className="list-disc pl-5 text-slate-700">
          <li>At one split, Random Forest may consider only: <code>[Salary, Experience]</code></li>
          <li>At another split, it may consider: <code>[Age, City]</code></li>
        </ul>
      </div>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Why does this help? If the same very strong feature dominated every split in every tree, the trees could become highly correlated. Considering random feature subsets encourages diversity between trees.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
        <p className="font-bold text-blue-900 mb-2">Tiny <code>max_features</code> Example</p>
        <p className="text-slate-700 mb-2">For classification, Scikit-learn's default is <code>max_features=&quot;sqrt&quot;</code>.</p>
        <p className="text-slate-700">If a dataset has <strong>16 features</strong>, then:</p>
        <p className="font-mono text-lg font-bold text-blue-800 my-2">√16 = 4</p>
        <p className="text-slate-700">So roughly 4 candidate features are considered when searching for a split at a node, rather than automatically considering all 16.</p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        How Random Forest Makes Final Predictions
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The prediction mechanism depends slightly on the problem type:
      </p>
      <ul className="list-disc pl-5 mb-4 text-slate-700 space-y-4 text-lg leading-relaxed max-w-3xl">
        <li>
          <strong>Classification intuition:</strong> Think of the trees as combining class votes or class evidence. If 4 trees favor "Yes" and 1 favors "No", the ensemble will typically favor "Yes".
        </li>
        <li>
          <strong>Regression:</strong> Average the tree predictions. If five trees predict 100, 120, 110, 130, and 140, then:
          <div className="font-mono bg-slate-100 border border-slate-200 rounded p-3 mt-2 text-base">(100 + 120 + 110 + 130 + 140) ÷ 5 = 600 ÷ 5 = <strong>120</strong></div>
        </li>
      </ul>
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8">
        <p className="text-indigo-900 mb-3"><strong>Scikit-learn detail:</strong> <code>RandomForestClassifier</code> combines trees by averaging their class-probability predictions and then selects the class with the highest mean probability. So "majority voting" is a useful beginner intuition, but probability averaging is the more precise description for Scikit-learn.</p>
        <div className="bg-white border border-indigo-100 rounded p-3 text-slate-700">
          <p className="font-bold mb-1">Tiny binary example</p>
          <p className="font-mono">Tree probabilities for YES: 0.90, 0.70, 0.40</p>
          <p className="font-mono mt-1">Mean = (0.90 + 0.70 + 0.40) ÷ 3 = 2.00 ÷ 3 ≈ <strong>0.667</strong></p>
          <p className="mt-2">The forest combines this probability evidence across trees rather than trusting one tree alone.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Mathematical Intuition (Bias-Variance)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Deep Decision Trees often have relatively low bias and high variance. Random Forest combines many randomized trees to <strong>reduce variance</strong>. This can come with a small increase in bias, but the variance reduction is often valuable. The exact trade-off depends on the data and hyperparameters.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* VISUALIZATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BarChart3 className="mr-2 text-rose-600" /> Visualizing Random Forest Concepts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h4 className="font-bold text-slate-800 text-center mb-2">Classification: Combine Tree Opinions</h4>
          <p className="text-sm text-slate-500 text-center mb-5">Simple voting intuition with five trees.</p>
          <div className="grid grid-cols-5 gap-2 mb-5">
            {voteData.map((entry) => (
              <div key={entry.name} className={`rounded-lg border p-2 text-center ${entry.vote === 'Yes' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <p className="text-xs font-bold text-slate-600">{entry.name}</p>
                <p className={`mt-1 font-extrabold ${entry.vote === 'Yes' ? 'text-emerald-700' : 'text-rose-700'}`}>{entry.vote}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-emerald-100 border border-emerald-200 p-3 text-center">
            <p className="font-bold text-emerald-900">3 Yes vs 2 No → beginner voting intuition: YES</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h4 className="font-bold text-slate-800 text-center mb-2">Illustrative Feature Importance</h4>
          <p className="text-sm text-slate-500 text-center mb-5">Example values only — not a universal ranking.</p>
          <div className="space-y-4">
            {featureImportance.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-700">{item.name}</span>
                  <span className="text-slate-500">{item.importance}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.importance}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-5">Scikit-learn's <code>feature_importances_</code> is impurity-based. Treat it as a model interpretation aid, not proof that a feature is causally important.</p>
        </div>
      </div>

      {/* Bagging Visual Explanation */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h4 className="font-bold text-slate-800 text-lg">Visual Explanation: How Bagging Creates Diversity</h4>
          <p className="text-sm text-slate-600 mt-1">Bootstrapping takes random samples with replacement. This means some data points are picked multiple times, and some are left out (Out-of-Bag).</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="font-bold text-slate-700 text-center mb-3">Original Dataset</p>
              <div className="space-y-2">
                {['A', 'B', 'C', 'D', 'E'].map(item => (
                  <div key={item} className="bg-indigo-100 text-indigo-800 py-1 px-4 text-center rounded font-mono font-bold text-sm border border-indigo-200">Data {item}</div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="font-bold text-slate-700 text-center mb-3">Tree 1 (Sample)</p>
              <div className="space-y-2">
                {['A', 'B', 'B', 'D', 'E'].map((item, idx) => (
                  <div key={idx} className={`py-1 px-4 text-center rounded font-mono font-bold text-sm border ${item === 'B' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-white text-slate-600 border-slate-200'}`}>Data {item}</div>
                ))}
              </div>
              <p className="text-xs text-center mt-3 text-slate-500 font-medium">Data B is repeated<br/>Data C is left out</p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="font-bold text-slate-700 text-center mb-3">Tree 2 (Sample)</p>
              <div className="space-y-2">
                {['A', 'C', 'C', 'C', 'E'].map((item, idx) => (
                  <div key={idx} className={`py-1 px-4 text-center rounded font-mono font-bold text-sm border ${item === 'C' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-white text-slate-600 border-slate-200'}`}>Data {item}</div>
                ))}
              </div>
              <p className="text-xs text-center mt-3 text-slate-500 font-medium">Data C is repeated<br/>Data B, D are left out</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="font-bold text-slate-700 text-center mb-3">Tree 3 (Sample)</p>
              <div className="space-y-2">
                {['B', 'D', 'E', 'E', 'A'].map((item, idx) => (
                  <div key={idx} className={`py-1 px-4 text-center rounded font-mono font-bold text-sm border ${item === 'E' ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-white text-slate-600 border-slate-200'}`}>Data {item}</div>
                ))}
              </div>
              <p className="text-xs text-center mt-3 text-slate-500 font-medium">Data E is repeated<br/>Data C is left out</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-amber-900 mb-2">Out-of-Bag (OOB) Samples</p>
        <p className="text-amber-800">
          During bootstrap sampling, some training rows are not selected for a particular tree. These are <strong>Out-of-Bag (OOB) samples</strong> for that tree. When <code>oob_score=True</code> and bootstrapping is enabled, Scikit-learn can use these held-out observations to produce an OOB performance estimate. This is useful for an additional estimate of generalization, but it should not be treated as a reason to repeatedly tune against the final test set or to skip a final independent evaluation when one is needed.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-rose-600" /> Important Hyperparameters
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        To properly tune a Random Forest, you need to understand these key components:
      </p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10 text-lg text-slate-700">
        <ul className="space-y-5">
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">n_estimators</span>
            <span>Controls the number of trees. More trees can make the ensemble estimate more stable, but improvements eventually show diminishing returns while training and prediction cost continue to grow.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">max_depth</span>
            <span>Controls the maximum depth of each tree. Small depth creates simpler trees. Large depth creates more complex trees and may increase overfitting risk.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">max_features</span>
            <span>Controls how many candidate features are considered at each split. Smaller values increase randomness, but making the subset too small can also weaken individual trees.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">min_samples_split</span>
            <span>Minimum number of samples required to execute a split at an internal node.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">min_samples_leaf</span>
            <span>Minimum number of samples required to be at a leaf node (the end points of the tree).</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">oob_score</span>
            <span>When bootstrapping is enabled, setting this to <code>True</code> asks Scikit-learn to compute an out-of-bag score from training observations left out of individual bootstrap samples.</span>
          </li>
        </ul>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Do Random Forests Need Feature Scaling?
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Usually, ordinary standardization is <strong>not required</strong> for Random Forests because tree splits compare values against thresholds rather than using Euclidean distance. Scaling can still be part of a broader preprocessing pipeline, but it is not needed for the same reason it is important for KNN or SVM.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-amber-900 mb-2">Feature Importance Warning</p>
        <p className="text-amber-900">Impurity-based importance can favor features with many possible split points and is computed from the fitted trees. Use it carefully, and consider permutation importance on held-out data when you want to know whether a feature truly helps predictive performance.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY RF PERFORMS SO WELL */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Star className="mr-2 text-amber-500" /> Why Random Forest Performs So Well
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest is often a strong baseline on tabular supervised-learning problems because it combines nonlinear Decision Trees with variance-reducing aggregation and randomization.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        Its performance depends on the signal in the features, the amount of data, tree diversity, class balance, evaluation metric, and hyperparameters. It should still be compared with appropriate baseline and alternative models.
      </p>

      {/* PROS CONS APPLICATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <ShieldCheck className="mr-2 text-indigo-600" /> Advantages vs Disadvantages
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Strong baseline:</strong> Often performs well on many tabular classification and regression problems.</li>
             <li><strong>Variance reduction:</strong> Averaging diverse trees can reduce the instability of a single tree.</li>
             <li><strong>Nonlinear patterns:</strong> Captures thresholds, interactions, and nonlinear relationships without manually specifying them.</li>
             <li><strong>Feature insights:</strong> Provides impurity-based <code>feature_importances_</code>, with interpretation caveats.</li>
             <li><strong>Little scaling dependence:</strong> Standard feature scaling is usually unnecessary for ordinary tree splits.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Computationally Heavy:</strong> Training hundreds of trees requires significant memory and CPU power.</li>
             <li><strong>Prediction cost:</strong> Each prediction must be evaluated across many trees, which can matter in low-latency systems.</li>
             <li><strong>Less interpretable:</strong> A forest is harder to inspect directly than a single small Decision Tree, so additional interpretation tools may be needed.</li>
             <li><strong>Sparse Data:</strong> Can underperform on highly sparse data (like heavy NLP TF-IDF matrices).</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
        <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-rose-100 text-rose-900 font-bold px-4 py-3 border-b border-rose-200 flex items-center">
             <Activity className="w-5 h-5 mr-2"/> Healthcare
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Clinical risk prediction</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Research classification</li>
             </ul>
          </div>
        </div>
        
        <div className="bg-white border text-left border-emerald-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-emerald-100 text-emerald-900 font-bold px-4 py-3 border-b border-emerald-200 flex items-center">
             <Banknote className="w-5 h-5 mr-2"/> Finance & Banking
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Credit Scoring</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Fraud Detection</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Default-risk modeling</li>
             </ul>
          </div>
        </div>

        <div className="bg-white border text-left border-blue-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-blue-100 text-blue-900 font-bold px-4 py-3 border-b border-blue-200 flex items-center">
             <TextSelect className="w-5 h-5 mr-2"/> E-Commerce
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Purchase propensity</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Customer churn prediction</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Return / fraud classification</li>
             </ul>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* CODE IMPLEMENTATION */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Python Implementation
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is a complete, practical pipeline utilizing Scikit-Learn to train a Random Forest ensemble on the Iris classification dataset.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h4 className="font-bold text-indigo-800 text-xl">Python Code: Random Forest Classifier</h4>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Step 1: Load dataset
data = load_iris()
X = data.data
y = data.target

# Step 2: Create an untouched test set
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Step 3: Train 100 randomized trees
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    oob_score=True
)
model.fit(X_train, y_train)

# Step 4: Predict unseen test examples
predictions = model.predict(X_test)

# Step 5: Evaluate
accuracy = accuracy_score(y_test, predictions)
print(f"Test accuracy: {accuracy:.2f}")
print(f"OOB score: {model.oob_score_:.2f}")

# Step 6: Inspect impurity-based feature importance
print("Feature importances:", model.feature_importances_.round(3))`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">$ python random_forest_iris.py</p>
          <p className="text-slate-300">Test accuracy: 0.90</p>
          <p className="text-slate-300">OOB score: 0.94</p>
          <p className="text-slate-300">Feature importances: [0.116 0.015 0.431 0.437]</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
        <p className="font-bold text-blue-900 mb-2">What the output means</p>
        <ul className="list-disc pl-5 text-slate-700 space-y-2">
          <li><strong>Test accuracy = 0.90:</strong> 90% of this small test split was classified correctly.</li>
          <li><strong>OOB score = 0.94:</strong> the forest's out-of-bag estimate on the training set is about 94% for this run.</li>
          <li><strong>Feature importances:</strong> the last two Iris measurements receive most of the impurity-based importance in this fitted forest.</li>
        </ul>
        <p className="text-sm text-slate-600 mt-3">This is a small educational dataset. A good score here does not imply the same performance on a real-world problem, and exact floating-point output can vary slightly across library versions.</p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* COMPLETE PIPELINE */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <GitMerge className="mr-2 text-indigo-600" /> Complete Random Forest Pipeline
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Here is the high-level flow of data from start to finish within a Random Forest algorithm:
      </p>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-12 shadow-sm text-center">
         <div className="inline-flex flex-col items-center">
            <div className="bg-indigo-600 text-white font-bold py-2 px-8 rounded-full mb-2">Collect Dataset</div>
            <div className="h-6 border-l-2 border-indigo-300 border-dashed mb-2 text-indigo-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-indigo-600 text-white font-bold py-2 px-8 rounded-full mb-2">Bootstrap Sampling</div>
            <div className="h-6 border-l-2 border-indigo-300 border-dashed mb-2 text-indigo-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-full mb-2">Create Multiple Trees</div>
            <div className="h-6 border-l-2 border-emerald-300 border-dashed mb-2 text-emerald-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-full mb-2">Random Feature Selection</div>
            <div className="h-6 border-l-2 border-emerald-300 border-dashed mb-2 text-emerald-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-full mb-2">Grow Trees with Randomized Splits</div>
            <div className="h-6 border-l-2 border-emerald-300 border-dashed mb-2 text-emerald-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-rose-600 text-white font-bold py-2 px-8 rounded-full mb-2">Combine Predictions</div>
            <div className="h-6 border-l-2 border-rose-300 border-dashed mb-2 text-rose-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-rose-600 text-white font-bold py-2 px-8 rounded-full">Generate Final Output</div>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Common Mistakes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          ['Assuming more trees always fix the model', 'More trees can stabilize the ensemble, but they cannot create signal that is missing from the features.'],
          ['Treating feature importance as causal proof', 'A high importance score says the fitted forest used a feature strongly; it does not prove that changing the feature causes the target to change.'],
          ['Tuning on the test set', 'Use training/validation procedures for model selection and keep the final test set for final evaluation.'],
          ['Believing Random Forest cannot overfit', 'A forest often overfits less than one deep tree, but overfitting is still possible, especially with leakage or inappropriate tuning.'],
        ].map(([title, text]) => (
          <div key={title} className="bg-rose-50 border border-rose-100 rounded-lg p-4">
            <p className="font-bold text-rose-900">{title}</p>
            <p className="text-slate-700 mt-1">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Quick FAQs
      </h2>
      <div className="space-y-4 mb-10">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="font-bold text-slate-800">Is Random Forest just many identical Decision Trees?</p>
          <p className="text-slate-700 mt-1">No. Randomness in training rows and candidate features is used to encourage tree diversity.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="font-bold text-slate-800">Does Random Forest need feature scaling?</p>
          <p className="text-slate-700 mt-1">Usually not for ordinary threshold-based tree splits.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="font-bold text-slate-800">What should I learn next?</p>
          <p className="text-slate-700 mt-1">Continue with <a href="/learn/bagging" className="text-indigo-700 font-semibold hover:underline">Bagging</a>, then compare it with <a href="/learn/boosting" className="text-indigo-700 font-semibold hover:underline">Boosting</a>. You can also revisit <a href="/learn/decision-trees" className="text-indigo-700 font-semibold hover:underline">Decision Trees</a> and <a href="/learn/bias-variance" className="text-indigo-700 font-semibold hover:underline">Bias-Variance</a>.</p>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest is a widely used supervised-learning algorithm that combines many randomized Decision Trees. Instead of relying on one high-variance tree, it aggregates a forest of diverse trees.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Its key idea is: <strong>diverse models can become more stable when their predictions are aggregated.</strong>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Depending on the data and settings, this design can improve:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-2 text-lg font-bold">
         <li>Accuracy</li>
         <li>Stability</li>
         <li>Generalization</li>
         <li>Robustness</li>
      </ul>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "The central idea behind Random Forest is: <strong>create diverse trees, then aggregate their predictions.</strong> The benefit comes mainly from reducing the variance and correlation problems that can affect a single Decision Tree."
         </p>
      </div>

    </>
  );
}

