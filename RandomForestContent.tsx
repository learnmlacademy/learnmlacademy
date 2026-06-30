import React from 'react';
import { 
  Lightbulb, 
  Goal, 
  Layers, 
  Maximize, 
  Link, 
  ShieldCheck, 
  Check, 
  X as CloseIcon, 
  Activity, 
  TextSelect, 
  Banknote, 
  Code,
  TreePine,
  Target,
  BarChart3,
  Star,
  GitMerge
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter, ZAxis } from 'recharts';

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

  const baggingData = Array.from({length: 40}, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
    class: Math.random() > 0.5 ? 'A' : 'B'
  }));

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Random Forest</h1>
      
      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        Random Forest is an ensemble learning algorithm that performs well on both classification and regression problems.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm became highly popular because it successfully solves many major weaknesses found in traditional Decision Trees while still maintaining excellent predictive performance, flexibility, and scalability.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Random Forest belongs to a special category of Machine Learning methods called <strong>Ensemble Learning Algorithms</strong>. The word <em>Ensemble</em> means combining multiple models to create a stronger and more reliable model. The central philosophy behind ensemble learning comes from the idea of collective intelligence.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-medium italic mb-2">
          "Instead of depending on a single Decision Tree, Random Forest creates a large collection of Decision Trees and combines their outputs intelligently to produce final predictions."
        </p>
        <p className="text-emerald-800">
          This collection of trees is called a <strong>Forest</strong>, and because randomness is intentionally introduced while creating these trees, the algorithm is called <strong>Random Forest</strong>.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY RANDOM FOREST WAS CREATED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Lightbulb className="mr-2 text-indigo-600" /> Why Random Forest Was Created
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        To understand Random Forest deeply, we must first understand the limitations of Decision Trees. Decision Trees are simple and easy to interpret, but they suffer from one major weakness: <strong>Overfitting</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A single Decision Tree can become extremely sensitive to training data. Even a very small change in the dataset may completely change the structure of the tree. A Decision Tree may memorize the training dataset instead of learning general patterns, leading to poor real-world prediction accuracy.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Instead of relying on one unstable tree, Random Forest creates <strong>many trees</strong>. Each tree learns slightly different patterns from the dataset. When all these trees combine together:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-3 text-lg leading-relaxed max-w-3xl">
        <li>Individual mistakes reduce</li>
        <li>Noise influence decreases</li>
        <li>Variance decreases</li>
        <li>Stability and generalization improve</li>
      </ul>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Simple Real-Life Analogy
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Imagine a hospital where doctors are trying to diagnose a patient. Suppose only one doctor gives the diagnosis. There is always a possibility that the doctor may miss certain symptoms or misinterpret reports.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Now imagine the hospital forms a panel of 20 experienced doctors. Each doctor independently studies the patient and gives an opinion. The hospital then takes the majority opinion as the final diagnosis. This collective decision is safer and more reliable. Random Forest works using the same philosophy: <strong>each Decision Tree acts like an independent expert</strong>.
      </p>

      <div className="bg-indigo-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-400 mt-6 mb-8">
        <p className="text-indigo-900 font-bold mb-2 text-xl">Core Idea Behind Random Forest</p>
        <p className="text-indigo-800 text-lg leading-relaxed mb-3">
          The central idea behind Random Forest can be summarized as: <strong>Multiple weak learners together can create a powerful learner.</strong>
        </p>
        <p className="text-indigo-800 text-lg leading-relaxed">
          Each individual Decision Tree may not be perfect. Some trees may overfit, learn noisy patterns, or make incorrect predictions. However, when hundreds of such trees work together, their combined prediction becomes significantly more accurate and stable because <strong>errors made by individual trees often cancel each other out</strong>.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Understanding Decision Trees First
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest is built using Decision Trees. A Decision Tree works like a flowchart where data gets repeatedly split based on conditions (e.g., <em>Is Age {'>'} 30? → Is Income {'>'} 50K?</em>). While highly interpretable, single Decision Trees often suffer from major weaknesses:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-2 text-lg leading-relaxed max-w-3xl">
        <li><strong>Overfitting:</strong> They learn training data too perfectly (high training accuracy, poor real-world accuracy).</li>
        <li><strong>High Variance & Instability:</strong> Even tiny dataset changes may create completely different trees.</li>
        <li><strong>Noise Sensitivity:</strong> They easily memorize noisy patterns.</li>
      </ul>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Ensemble Learning Categories
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest belongs to the broader field of Ensemble Learning. The philosophy is that group intelligence is stronger than individual intelligence. The three main types are:
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
              <li><strong>Create Multiple Random Datasets:</strong> Generate variations of the original training data.</li>
              <li><strong>Build Multiple Decision Trees:</strong> Train an independent tree on each generated dataset.</li>
              <li><strong>Independent Predictions:</strong> Pass new data through every single tree in the forest.</li>
              <li><strong>Combine Predictions:</strong> Aggregate all predictions via Majority Voting (Classification) or Averaging (Regression).</li>
              <li><strong>Generate Final Output:</strong> Return the aggregated result.</li>
            </ol>
         </div>
      </div>

      <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-purple-900 mb-3">Why the Word "Random" Is Important</p>
        <p className="text-purple-800 mb-3">
          The algorithm intentionally introduces randomness in two major ways: <strong>1. Random Data Sampling</strong> and <strong>2. Random Feature Selection</strong>. 
        </p>
        <p className="text-purple-800">
          This randomness ensures that all trees become different from each other. If every tree saw identical data and identical features, they would all be similar, and the ensemble would lose its power. Diversity improves collective intelligence!
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
        Bootstrap sampling means: <em>Random sampling with replacement</em>. Suppose the original dataset contains <code>[A, B, C, D, E]</code>. A bootstrap sample might become <code>[A, B, B, D, E]</code>. Notice that 'B' is repeated and 'C' is missing. This forces each tree to learn from a slightly unique dataset perspective.
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
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Why does this help? If all trees always used the strongest features, they would become highly correlated. Feature randomness creates diversity, decorrelation, and better generalization, which dramatically improves ensemble strength.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        How Random Forest Makes Final Predictions
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The prediction mechanism depends slightly on the problem type:
      </p>
      <ul className="list-disc pl-5 mb-8 text-slate-700 space-y-4 text-lg leading-relaxed max-w-3xl">
        <li>
          <strong>For Classification (e.g., Spam or Not Spam):</strong> Majority Voting is used. For example, if 4 trees vote "Yes" and 1 tree votes "No", the final prediction is "Yes".
        </li>
        <li>
          <strong>For Regression (e.g., Predicting House Prices):</strong> Average Prediction is used. For example, if trees predict 100, 120, 110, 130, and 140, the final prediction is their average (120).
        </li>
      </ul>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Mathematical Intuition (Bias-Variance)
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Single Decision Trees usually have <strong>Low Bias and High Variance</strong>. They learn training data too specifically. Random Forest's fundamental superpower is that it averages these multiple trees together, which <strong>reduces variance significantly without significantly increasing bias</strong>. This averaging effect creates better stability and far better generalization to unseen data.
      </p>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-md p-6 mb-6">
        <p className="font-bold text-indigo-900 mb-3 text-lg">Why does averaging reduce variance specifically?</p>
        <p className="text-indigo-800 text-lg leading-relaxed mb-3">
          If you average N independent estimators, each with variance σ², the variance of the average shrinks to approximately σ²/N. This is a basic statistical property: random errors made by individual trees point in different directions, so they cancel out when averaged. A single overfit tree's noisy prediction gets diluted by 99 other trees that made different noisy mistakes.
        </p>
        <p className="text-indigo-800 text-lg leading-relaxed">
          In practice, trees in a forest are not fully independent — they all see overlapping data and a shared feature set — so the real reduction is closer to σ²/N_effective rather than the full σ²/N. This is exactly why Random Forest deliberately injects <strong>bootstrap sampling</strong> and <strong>random feature selection</strong>: both techniques exist specifically to push the trees toward independence, making the variance reduction closer to the ideal case.
        </p>
      </div>

      <div className="bg-rose-50 border-l-4 border-rose-400 rounded-r-md p-6 mb-8">
        <p className="font-bold text-rose-900 mb-3 text-lg">Why doesn't averaging reduce bias the same way?</p>
        <p className="text-rose-800 text-lg leading-relaxed">
          Bias is the systematic error a model makes regardless of which specific training sample it sees — it comes from the model's fundamental capacity to represent the true relationship in the data. Every tree in the forest, no matter which bootstrap sample or feature subset it trains on, has access to the same modeling power and the same underlying feature space. If the true relationship requires more complexity than a tree can express, <strong>every tree in the forest shares that same limitation</strong> — and averaging identical systematic errors does nothing to cancel them out, the way it does for random errors. This is the core reason an interviewer expects to hear: variance comes from randomness across trees (which averaging cancels); bias comes from a shared structural limitation (which averaging cannot fix).
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
        <p className="font-bold text-slate-800 mb-2">Quick interview-ready answer:</p>
        <p className="text-slate-700 leading-relaxed">
          "Random Forest reduces variance because each tree's random errors are largely independent — averaging N roughly-independent estimators divides variance by approximately N. It does <em>not</em> meaningfully reduce bias because every tree shares the same fundamental modeling capacity and the same feature space, so any systematic error common to all trees survives the averaging process untouched."
        </p>
      </div>


      <hr className="border-slate-200 mt-10 mb-10" />

      {/* VISUALIZATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BarChart3 className="mr-2 text-rose-600" /> Visualizing Random Forest Concepts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Majority Voting Chart */}
        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col">
          <h4 className="font-bold text-slate-800 text-center mb-2">Classification: Majority Voting Example</h4>
          <p className="text-sm text-slate-500 text-center mb-6">5 Trees predict "Yes" or "No". Final Output = Yes.</p>
          <div className="w-full h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} tickFormatter={(val) => val === 1 ? 'Yes' : 'No'} domain={[0, 1.2]} />
                <Tooltip cursor={{fill: 'transparent'}} formatter={(value: any, name: string, props: any) => [props.payload.vote, "Prediction"]} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {voteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value === 1 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance Chart */}
        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col">
          <h4 className="font-bold text-slate-800 text-center mb-2">Feature Importance Extraction</h4>
          <p className="text-sm text-slate-500 text-center mb-6">Random Forest naturally ranks the most influential features.</p>
          <div className="w-full h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={featureImportance} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                <XAxis type="number" tick={{fontSize: 12}} domain={[0, 50]} />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} formatter={(val) => [`${val}%`, 'Importance']} />
                <Bar dataKey="importance" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-md p-6 mb-6">
        <p className="font-bold text-indigo-900 mb-3 text-lg">What happens when features are correlated?</p>
        <p className="text-indigo-800 text-lg leading-relaxed">
          The feature importance chart above looks clean, but it hides a well-known limitation. The default importance method (mean decrease in impurity) splits credit between features that carry similar information. If <strong>Salary</strong> and <strong>Annual Income</strong> are both in the dataset and almost perfectly correlated, the tree might use Salary at one split and Income at another, splitting the "true" importance roughly in half between them. Each one then looks moderately important on its own, when in reality a single underlying signal is responsible for nearly all of it. The risk: you might wrongly conclude both features are only mildly useful and consider dropping one, when together they represent the most powerful signal in the dataset.
        </p>
      </div>

      <div className="bg-rose-50 border-l-4 border-rose-400 rounded-r-md p-6 mb-10">
        <p className="font-bold text-rose-900 mb-3 text-lg">The fix: permutation importance</p>
        <p className="text-rose-800 text-lg leading-relaxed">
          Permutation importance measures how much accuracy drops when a single feature's values are randomly shuffled, breaking its relationship with the target while leaving every other feature untouched. It is more reliable in the presence of correlated features because it reflects the model's actual dependence on that specific feature, not how often a tree happened to split on it. The practical takeaway for an interview: <strong>never drop a feature based on a low MDI importance score alone</strong> if you suspect correlation — check permutation importance first, and consider whether a low score is split credit rather than true irrelevance.
        </p>
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
          During bootstrap sampling, some data points are left out for each tree. These unused samples are called <strong>Out-of-Bag Samples</strong>. They act like built-in Validation Data, allowing Random Forest to natively estimate its performance without needing a strictly separate validation dataset partition!
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        The Hidden Problem: Feature Importance Under Correlation
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The Feature Importance chart above looks clean and trustworthy, but it comes with an important caveat that catches many practitioners off guard: <strong>standard feature importance becomes unreliable when features are correlated</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        The default importance score (Mean Decrease in Impurity) credits a feature only when it is actually chosen to split a node. If two features carry nearly the same information — for example <code>Salary</code> and <code>Annual Income</code> — the algorithm essentially has to "share the credit" between them. At some splits the tree picks <code>Salary</code>, at others it picks <code>Annual Income</code> almost arbitrarily, since both reduce impurity by a similar amount. The result is that <strong>both features end up looking less important than they really are</strong>, even though together they may be the single strongest signal in the dataset.
      </p>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h4 className="font-bold text-slate-800 text-lg">Example: What Correlation Does to Importance Scores</h4>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-slate-700 mb-3 text-center">Without Correlation</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded px-4 py-2">
                  <span className="text-sm font-medium text-emerald-900">Income</span>
                  <span className="font-mono font-bold text-emerald-700">42%</span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-4 py-2">
                  <span className="text-sm text-slate-600">Age</span>
                  <span className="font-mono text-slate-600">18%</span>
                </div>
              </div>
              <p className="text-xs text-center mt-3 text-slate-500">Income is correctly identified as the dominant signal</p>
            </div>
            <div>
              <p className="font-bold text-slate-700 mb-3 text-center">After Adding a Correlated Twin</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded px-4 py-2">
                  <span className="text-sm font-medium text-amber-900">Income</span>
                  <span className="font-mono font-bold text-amber-700">21%</span>
                </div>
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded px-4 py-2">
                  <span className="text-sm font-medium text-amber-900">Annual Salary (correlated)</span>
                  <span className="font-mono font-bold text-amber-700">20%</span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded px-4 py-2">
                  <span className="text-sm text-slate-600">Age</span>
                  <span className="font-mono text-slate-600">18%</span>
                </div>
              </div>
              <p className="text-xs text-center mt-3 text-slate-500">Combined importance is unchanged (≈41%) but each individual feature now looks weaker than Age</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-emerald-900 mb-2">The Fix: Permutation Importance</p>
        <p className="text-emerald-800">
          Instead of relying on how often a feature is used for splits, <strong>Permutation Importance</strong> measures impact directly: shuffle one feature's values randomly and check how much the model's accuracy drops. This method is far more robust to correlation because it tests each feature's real-world predictive contribution rather than how often it happened to be picked over a near-identical sibling feature. When working with correlated features, always cross-check the default importance scores against permutation importance before trusting the ranking.
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
            <span>Controls the number of trees in the forest. More trees generally improve stability but increase computational cost.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">max_depth</span>
            <span>Controls the maximum depth of each tree. Small depth creates simpler trees. Large depth creates more complex trees and may increase overfitting risk.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">max_features</span>
            <span>Controls the number of random features considered during each split. Smaller values further increase randomness and diversity.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">min_samples_split</span>
            <span>Minimum number of samples required to execute a split at an internal node.</span>
          </li>
          <li className="flex items-start">
            <span className="font-mono text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded mr-3 mt-1 text-sm">min_samples_leaf</span>
            <span>Minimum number of samples required to be at a leaf node (the end points of the tree).</span>
          </li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY RF PERFORMS SO WELL */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Star className="mr-2 text-amber-500" /> Why Random Forest Performs So Well
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest performs extremely well because it balances: <strong>Accuracy, Stability, Generalization, and Randomness</strong>.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-10">
        It essentially combines the <em>Strength of Decision Trees</em>, the <em>Power of ensemble learning</em>, <em>Statistical averaging</em>, and <em>Randomization</em> into one highly effective algorithm.
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
             <li><strong>Highly Accurate:</strong> Consistently top-tier out-of-the-box accuracy.</li>
             <li><strong>No Overfitting:</strong> Averaging fundamentally cancels out variance and strictly limits overfitting.</li>
             <li><strong>Versatile:</strong> Handles both Classification and Regression flawlessly.</li>
             <li><strong>Feature insights:</strong> Natively outputs Feature Importance scores.</li>
             <li><strong>Robust to Noise:</strong> Works exceptionally well even with missing data or irrelevant features.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li><strong>Computationally Heavy:</strong> Training hundreds of trees requires significant memory and CPU power.</li>
             <li><strong>Slow Prediction:</strong> Prediction phase requires evaluating data against every single tree.</li>
             <li><strong>Black Box:</strong> Extremely difficult to mathematically trace why a specific decision was made (unlike a single Decision Tree).</li>
             <li><strong>Sparse Data:</strong> Can underperform on highly sparse data (like heavy NLP TF-IDF matrices).</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-4 mb-4">
        When You Should NOT Use Random Forest
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The disadvantages above are real, but they only become decision-relevant when matched to a specific situation. Here are the four scenarios where a different algorithm is the better choice:
      </p>

      <div className="space-y-4 mb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-rose-100 text-rose-700 font-bold rounded-lg px-3 py-2 text-sm flex-shrink-0">01</div>
          <div>
            <p className="font-bold text-slate-800 mb-1">When you need to explain individual decisions to a regulator or customer</p>
            <p className="text-slate-600">Banking and insurance often require a clear, traceable reason for a rejection (e.g., "loan denied because income {'<'} ₹3L and credit score {'<'} 650"). A Random Forest's decision is an aggregate vote across hundreds of trees — there is no single readable path. Use a single <strong>Decision Tree</strong> or <strong>Logistic Regression</strong> instead, where the decision logic can be written down in one sentence.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-rose-100 text-rose-700 font-bold rounded-lg px-3 py-2 text-sm flex-shrink-0">02</div>
          <div>
            <p className="font-bold text-slate-800 mb-1">When you are working with very high-dimensional sparse data</p>
            <p className="text-slate-600">Text data represented as TF-IDF or bag-of-words often has tens of thousands of mostly-zero columns. Random Forest's random feature selection at each split struggles here because most randomly chosen feature subsets contain almost no signal. <strong>Linear models (Logistic Regression, Linear SVM)</strong> or <strong>Naive Bayes</strong> typically perform better and train far faster on this kind of data.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-rose-100 text-rose-700 font-bold rounded-lg px-3 py-2 text-sm flex-shrink-0">03</div>
          <div>
            <p className="font-bold text-slate-800 mb-1">When inference latency is tightly constrained</p>
            <p className="text-slate-600">A request that must run 200 trees at prediction time will always be slower than a request that evaluates one linear equation or one shallow tree. For real-time systems with strict millisecond budgets — high-frequency trading signals, in-app real-time scoring — a single fast model or a distilled/compressed model is usually the better engineering tradeoff.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-rose-100 text-rose-700 font-bold rounded-lg px-3 py-2 text-sm flex-shrink-0">04</div>
          <div>
            <p className="font-bold text-slate-800 mb-1">When you need the absolute best possible accuracy on structured/tabular data</p>
            <p className="text-slate-600">Random Forest is a strong, reliable baseline, but on most modern tabular ML competitions and benchmarks, <strong>Gradient Boosting methods (XGBoost, LightGBM, CatBoost)</strong> edge out Random Forest in raw predictive accuracy because they correct errors sequentially rather than averaging independent trees. If squeezing out the last 1-2% of accuracy matters more than training speed or simplicity, boosting is usually the better pick.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
        <div className="bg-white border text-left border-rose-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-rose-100 text-rose-900 font-bold px-4 py-3 border-b border-rose-200 flex items-center">
             <Activity className="w-5 h-5 mr-2"/> Healthcare
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Disease Diagnosis</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>Cancer Detection</li>
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
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Stock Prediction</li>
             </ul>
          </div>
        </div>

        <div className="bg-white border text-left border-blue-200 shadow-sm rounded-lg overflow-hidden">
          <div className="bg-blue-100 text-blue-900 font-bold px-4 py-3 border-b border-blue-200 flex items-center">
             <TextSelect className="w-5 h-5 mr-2"/> E-Commerce
          </div>
          <div className="p-4">
             <ul className="space-y-3 text-slate-700 text-sm">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Recommendation Systems</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Customer Segmentation</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Sales Forecasting</li>
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

# Step 2: Load Dataset
data = load_iris()
X = data.data
y = data.target

# Step 3: Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 4: Train Random Forest Model
# n_estimators=100 sets the forest to contain 100 Decision Trees
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 5: Predictions
predictions = model.predict(X_test)

# Step 6: Evaluate Accuracy
accuracy = accuracy_score(y_test, predictions)
print(f"Random Forest Accuracy: {accuracy * 100}%")

# (Bonus) Inspect Feature Importance!
importances = model.feature_importances_
print("Feature Importances:", importances)`}</code>
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
          <p className="text-slate-300">Random Forest Accuracy: 100.0%</p>
          <p className="text-slate-300">Feature Importances: [0.108 0.03  0.44  0.422]</p>
        </div>
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
            <div className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-full mb-2">Train Trees Independently</div>
            <div className="h-6 border-l-2 border-emerald-300 border-dashed mb-2 text-emerald-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-rose-600 text-white font-bold py-2 px-8 rounded-full mb-2">Combine Predictions</div>
            <div className="h-6 border-l-2 border-rose-300 border-dashed mb-2 text-rose-400 flex items-center"><span className="ml-2 text-xs">▼</span></div>
            <div className="bg-rose-600 text-white font-bold py-2 px-8 rounded-full">Generate Final Output</div>
         </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Random Forest is a widely used Machine Learning algorithm because it combines simplicity with powerful predictive capability. Instead of trusting one unstable Decision Tree, Random Forest creates many trees and combines their intelligence.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Its success comes from a very powerful idea: <strong>Many imperfect models together can create an extremely strong system.</strong>
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        By introducing randomness, diversity, averaging, and ensemble learning, Random Forest dramatically improves:
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
           "The central philosophy behind Random Forest is: <strong>Diversity + Aggregation creates stronger predictions.</strong> This idea of collective intelligence is the true foundation behind the algorithm and a key reason why it remains an important algorithm in modern Machine Learning and Artificial Intelligence."
         </p>
      </div>

    </>
  );
}

