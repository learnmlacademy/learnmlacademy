import React from 'react';
import { Target, Activity, Crosshair, BarChart2, ShieldAlert, Cpu, Code, Info } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend } from 'recharts';

const goodModelData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.6 },
  { fpr: 0.1, tpr: 0.8 },
  { fpr: 0.2, tpr: 0.9 },
  { fpr: 0.4, tpr: 0.95 },
  { fpr: 0.6, tpr: 0.98 },
  { fpr: 0.8, tpr: 0.99 },
  { fpr: 1, tpr: 1 }
];

const randomModelData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.5, tpr: 0.5 },
  { fpr: 1, tpr: 1 }
];

const perfectModelData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0, tpr: 1 },
  { fpr: 1, tpr: 1 }
];

const compModelData = [
  { fpr: 0, ModelA: 0, ModelB: 0 },
  { fpr: 0.1, ModelA: 0.8, ModelB: 0.4 },
  { fpr: 0.2, ModelA: 0.9, ModelB: 0.65 },
  { fpr: 0.4, ModelA: 0.95, ModelB: 0.8 },
  { fpr: 0.6, ModelA: 0.98, ModelB: 0.9 },
  { fpr: 0.8, ModelA: 0.99, ModelB: 0.95 },
  { fpr: 1, ModelA: 1, ModelB: 1 }
];

export function RocAucContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">AUC-ROC Curve in Machine Learning</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In Machine Learning classification problems, building a model is only one part of the task. The second and equally important task is: <strong>Evaluating how good the model actually is.</strong>
        </p>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          A model may produce high accuracy, good predictions, and fast computation, but still fail badly in real-world applications if the evaluation metric is not properly understood.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 mb-2">The Illusion of Accuracy</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-indigo-900">
            <li>A fraud detection system with <strong>99% accuracy</strong> may still wildly fail to detect the rare fraud transactions.</li>
            <li>A cancer detection system may correctly classify most healthy patients but tragically miss actual cancer cases, maintaining high accuracy while failing its primary purpose.</li>
          </ul>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In such situations, simple accuracy becomes insufficient. This is where the <strong>ROC Curve</strong> and <strong>AUC Score</strong> become extremely important. ROC and AUC are among the most powerful evaluation techniques used in Machine Learning. They help us understand:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center"><span className="text-sky-800 font-bold text-sm">Class Separation</span></div>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center"><span className="text-sky-800 font-bold text-sm">Model Sensitivity</span></div>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center"><span className="text-sky-800 font-bold text-sm">False Alarm Rate</span></div>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center"><span className="text-sky-800 font-bold text-sm">Threshold Dynamics</span></div>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-roc">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> What Is ROC Curve?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          ROC stands for <strong>Receiver Operating Characteristic</strong>. The ROC curve is a graphical representation that shows how well a classification model distinguishes between classes at different threshold values. It plots the <strong>True Positive Rate (TPR)</strong> against the <strong>False Positive Rate (FPR)</strong> across multiple threshold settings.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-800 mb-2">Historical Background</p>
          <p className="text-slate-700 italic">
            The ROC concept originally came from radar signal detection systems during World War II. Engineers used ROC curves to determine whether radar signals represented actual enemy aircraft or just random noise. Later, the concept was adapted for statistics and Machine Learning.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Core Idea: Probabilities, Not Just Classes</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Most Machine Learning classification algorithms do not directly predict a strict YES or NO. Instead, they predict <strong>Probabilities</strong>.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-6 overflow-x-auto w-fit">
          <table className="min-w-full divide-y divide-slate-200 text-left font-mono">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Customer</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Fraud Probability</th>
                <th className="px-6 py-3 text-sm font-bold text-slate-700">Prediction (Threshold = 0.5)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-800">
              <tr><td className="px-6 py-4">A</td><td className="px-6 py-4 text-rose-600 font-bold">0.95</td><td className="px-6 py-4">Fraud (≥ 0.5)</td></tr>
              <tr><td className="px-6 py-4">B</td><td className="px-6 py-4 text-rose-600 font-bold">0.80</td><td className="px-6 py-4">Fraud (≥ 0.5)</td></tr>
              <tr><td className="px-6 py-4">C</td><td className="px-6 py-4 text-emerald-600">0.45</td><td className="px-6 py-4">Not Fraud (&lt; 0.5)</td></tr>
              <tr><td className="px-6 py-4">D</td><td className="px-6 py-4 text-emerald-600">0.10</td><td className="px-6 py-4">Not Fraud (&lt; 0.5)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Why Different Thresholds Matter</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-rose-800 border-b pb-2 mb-3">Very Low Threshold (e.g. 0.1)</h4>
            <p className="text-sm text-slate-800 leading-relaxed mb-3">Almost everything becomes positive. The model is highly aggressive in catching Frauds.</p>
            <ul className="text-sm font-bold text-rose-900 space-y-1">
              <li>High Recall (Catch all frauds)</li>
              <li>Many False Positives (High false alarms)</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-sky-800 border-b pb-2 mb-3">Very High Threshold (e.g. 0.95)</h4>
            <p className="text-sm text-slate-800 leading-relaxed mb-3">Only highly confident predictions become positive. The model is highly conservative.</p>
            <ul className="text-sm font-bold text-sky-900 space-y-1">
              <li>Low False Positives (Very few false alarms)</li>
              <li>Many Missed Positives (Low Recall)</li>
            </ul>
          </div>
        </div>
        <p className="text-lg leading-relaxed text-indigo-900 font-bold">
          The ROC curve captures this exact trade-off visualising how TPR and FPR deform as we drag that threshold from 0.0 to 1.0!
        </p>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="understanding-axes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Crosshair className="mr-3 text-indigo-600" /> The Geometry of the ROC Curve
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 border-b-2 border-orange-200 inline-block">X-Axis: False Positive Rate (FPR)</h3>
            <p className="text-md text-slate-800 mb-3">Measures how many negative samples were incorrectly classified as positive (False alarms).</p>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl font-mono text-sm mb-4">
              <p className="font-bold text-orange-900 mb-2">FPR = FP / (FP + TN)</p>
              <p className="text-orange-800 italic">Example (Spam): Out of 100 legitimate emails, 10 are marked spam. FPR = 10 / 100 = 10%.</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 border-b-2 border-emerald-200 inline-block">Y-Axis: True Positive Rate (TPR)</h3>
             <p className="text-md text-slate-800 mb-3">Also known as Recall or Sensitivity. Measures how many actual positive cases were correctly detected.</p>
             <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl font-mono text-sm mb-4">
              <p className="font-bold text-emerald-900 mb-2">TPR = TP / (TP + FN)</p>
              <p className="text-emerald-800 italic">Example (Cancer): Out of 100 sick patients, 90 are detected. TPR = 90 / 100 = 90%.</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-6 mt-8">ROC Visual Profiles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Random */}
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-slate-600 mb-2">Random Model (Diagonal)</h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={randomModelData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="fpr" type="number" domain={[0,1]} hide />
                  <YAxis type="number" domain={[0,1]} hide />
                  <Line type="linear" dataKey="tpr" stroke="#64748b" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-500 mt-2">Zero discrimination power. Like flipping a coin.</p>
          </div>

          {/* Good */}
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-indigo-600 mb-2">Good Model (Bowed)</h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={goodModelData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="fpr" type="number" domain={[0,1]} hide />
                  <YAxis type="number" domain={[0,1]} hide />
                  <Line type="monotone" dataKey="tpr" stroke="#4f46e5" strokeWidth={3} dot={false} />
                  <Line data={randomModelData} type="linear" dataKey="tpr" stroke="#94a3b8" strokeDasharray="3 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-500 mt-2">Pushes toward top-left. High TPR while maintaining acceptable FPR.</p>
          </div>

          {/* Perfect */}
          <div className="border border-slate-200 bg-white rounded-xl shadow-sm p-4">
            <h4 className="text-center font-bold text-emerald-600 mb-2">Perfect Classifier</h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={perfectModelData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="fpr" type="number" domain={[0,1]} hide />
                  <YAxis type="number" domain={[0,1]} hide />
                  <Line type="stepBefore" dataKey="tpr" stroke="#10b981" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-500 mt-2">Snaps perfectly to the top-left corner. 100% TPR, 0% FPR.</p>
          </div>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-auc">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <BarChart2 className="mr-3 text-indigo-600" /> What Is AUC (Area Under the Curve)?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          AUC stands for <strong>Area Under the Curve</strong>. It mathematically computes the 2-dimensional area underneath the ROC curve, summarizing the classifier performance into a single scalar value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm overflow-x-auto w-full font-mono">
            <table className="w-full text-slate-800">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-3 text-left">AUC Value</th>
                  <th className="p-3 text-left">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr><td className="p-3 font-bold text-emerald-600">1.0</td><td className="p-3">Perfect classifier</td></tr>
                <tr><td className="p-3 font-bold text-emerald-500">0.9 – 0.99</td><td className="p-3">Excellent</td></tr>
                <tr><td className="p-3 font-bold text-sky-500">0.8 – 0.89</td><td className="p-3">Very Good</td></tr>
                <tr><td className="p-3 font-bold text-indigo-400">0.7 – 0.79</td><td className="p-3">Good</td></tr>
                <tr><td className="p-3 font-bold text-slate-500">0.5</td><td className="p-3">Random guessing</td></tr>
                <tr><td className="p-3 font-bold text-rose-500">&lt; 0.5</td><td className="p-3">Worse than random (Inverted)</td></tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-center">
            <div className="h-[250px] w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={goodModelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="fpr" type="number" domain={[0,1]} />
                    <YAxis type="number" domain={[0,1]} />
                    <Area type="monotone" dataKey="tpr" stroke="#4f46e5" fill="#e0e7ff" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col text-indigo-900 pointer-events-none">
                  <span className="font-bold text-lg opacity-70">AUC AREA</span>
                  <span className="text-3xl font-extrabold opacity-80">0.92</span>
                </div>
            </div>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 mb-2">The Real Statistical Interpretation of AUC</p>
          <p className="text-emerald-800 text-lg italic leading-relaxed">
            If your AUC is 0.92, this strictly means: There is a <strong>92% probability</strong> that your model will rank a randomly chosen positive sample higher than a randomly chosen negative sample!
          </p>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="step-by-step">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Step-by-Step ROC Curve Construction
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Understanding the manual construction of ROC coordinates is vital to proving it evaluates ALL thresholds. Let us observe six items:
        </p>

        <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm mb-6 w-fit font-mono">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-2 text-sm font-bold">Sample</th>
                <th className="px-6 py-2 text-sm font-bold">Actual</th>
                <th className="px-6 py-2 text-sm font-bold">Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr><td className="px-6 py-2">A</td><td className="px-6 py-2">Positive</td><td className="px-6 py-2 text-rose-600 font-bold">0.95</td></tr>
              <tr><td className="px-6 py-2">B</td><td className="px-6 py-2">Positive</td><td className="px-6 py-2 text-rose-600 font-bold">0.85</td></tr>
              <tr><td className="px-6 py-2">C</td><td className="px-6 py-2">Negative</td><td className="px-6 py-2 text-emerald-600">0.70</td></tr>
              <tr><td className="px-6 py-2">D</td><td className="px-6 py-2">Positive</td><td className="px-6 py-2 text-rose-600 font-bold">0.60</td></tr>
              <tr><td className="px-6 py-2">E</td><td className="px-6 py-2">Negative</td><td className="px-6 py-2 text-emerald-600">0.40</td></tr>
              <tr><td className="px-6 py-2">F</td><td className="px-6 py-2">Negative</td><td className="px-6 py-2 text-emerald-600">0.20</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-6">Walkthrough Simulation at <code>Threshold = 0.85</code></h3>
        <p className="text-md text-slate-800 mb-4">
          At threshold 0.85, only Samples <strong>A</strong> and <strong>B</strong> trigger as Positive predictions. Everything else defaults back to Negative.
        </p>

        <div className="bg-slate-50 p-6 rounded-lg shadow-sm border border-slate-200 mb-8 space-y-3 font-mono text-sm">
          <p><strong>1. Confusion Metrics:</strong> TP = 2 (A & B), FP = 0 (No false alarms), FN = 1 (Missed D), TN = 3 (C, E, F as negative)</p>
          <p><strong>2. Calculate TPR:</strong> TPR = TP / (TP + FN) = 2 / (2 + 1) = <strong className="text-indigo-600 shadow-sm bg-white px-2 py-1 rounded border">0.667</strong></p>
          <p><strong>3. Calculate FPR:</strong> FPR = FP / (FP + TN) = 0 / (0 + 3) = <strong className="text-indigo-600 shadow-sm bg-white px-2 py-1 rounded border">0.0</strong></p>
          <p className="text-indigo-900 font-bold pt-4 border-t border-slate-300">New ROC Coordinate Generated: (FPR = 0.0, TPR = 0.667)</p>
          <p className="text-slate-600 italic">This exact process loops for every distinct probability threshold (0.95, 0.85, 0.70...) generating the dots that form the curve.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-useful">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Comparing Models using ROC
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          ROC curves become incredibly powerful when actively choosing between multiple distinct models. Imagine training a Random Forest (Model A) versus a Support Vector Machine (Model B) that both happen to output roughly 85% basic accuracy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
           <div className="h-[300px] w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={compModelData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="fpr" type="number" domain={[0,1]} label={{ value: 'FPR (False Alarms)', position: 'insideBottom', offset: -10 }} />
                  <YAxis type="number" domain={[0,1]} label={{ value: 'TPR (Recall)', angle: -90, position: 'insideLeft', offset: 10 }} />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" name="Model A (Dominant)" dataKey="ModelA" stroke="#10b981" strokeWidth={3} dot={false} />
                  <Line type="monotone" name="Model B (Inferior)" dataKey="ModelB" stroke="#f43f5e" strokeWidth={3} dot={false} />
                  <Line data={randomModelData} name="Random" type="linear" dataKey="tpr" stroke="#94a3b8" strokeDasharray="3 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
           </div>
           
           <div>
             <p className="text-lg font-bold text-emerald-800 border-b pb-2 mb-3 border-emerald-200">Visual Dominance is Absolute</p>
             <p className="text-md leading-relaxed text-slate-800 mb-4">
               Because Model A's green line is stretched closer to the top-left corner, its AUC area is distinctly larger. The graph objectively proves that Model A mathematically separates classes better over a much wider array of operating thresholds than Model B, despite identical accuracy metrics. 
             </p>
           </div>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          We use <code>roc_curve</code> and <code>roc_auc_score</code> from <code>sklearn.metrics</code> to easily extract thresholds. Make sure to feed in <strong>probabilities</strong> (using <code>predict_proba</code>), NOT hard classes!
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">ROC Curve & AUC Score</h4>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">Python</span>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0">
<code className="language-python">{`import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve, roc_auc_score

# 1. Load data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 2. Train Model
model = LogisticRegression(max_iter=5000)
model.fit(X_train, y_train)

# 3. CRITICAL: Predict Probabilities (not hard predictions)
y_probs = model.predict_proba(X_test)[:, 1] 

# 4. Compute ROC Curve metrics
fpr, tpr, thresholds = roc_curve(y_test, y_probs)

# 5. Compute the scalar AUC area
auc_score = roc_auc_score(y_test, y_probs)
print(f"AUC Score: {auc_score:.3f}")

# 6. Plotting
plt.plot(fpr, tpr, label=f'Model ROC (AUC = {auc_score:.3f})', color='green')
plt.plot([0,1], [0,1], linestyle='--', color='gray', label='Random Guessing')
plt.xlabel('False Positive Rate (FPR)')
plt.ylabel('True Positive Rate (TPR)')
plt.title('Receiver Operating Characteristic')
plt.legend()
plt.show()`}</code>
            </pre>
          </div>
          <div className="bg-[#1e1e1e] p-4 font-mono text-sm border-t border-slate-700">
            <p className="text-emerald-400 mb-4">Output:<br/>AUC Score: 0.993</p>
            
            <div className="bg-white p-4 rounded shadow-inner max-w-[500px] my-4 mx-auto">
              <p className="text-center font-bold text-slate-800 text-sm mb-2 font-sans">Receiver Operating Characteristic</p>
              <div className="h-[300px] w-full font-sans">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={goodModelData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                    <XAxis dataKey="fpr" type="number" domain={[0,1]} label={{ value: 'False Positive Rate (FPR)', position: 'insideBottom', offset: -10, fill: '#475569', fontSize: 12 }} tick={{fill: '#475569', fontSize: 12}} />
                    <YAxis type="number" domain={[0,1]} label={{ value: 'True Positive Rate (TPR)', angle: -90, position: 'insideLeft', offset: 15, fill: '#475569', fontSize: 12 }} tick={{fill: '#475569', fontSize: 12}} />
                    <Line type="monotone" name="Model ROC (AUC = 0.993)" dataKey="tpr" stroke="#16a34a" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line data={randomModelData} name="Random Guessing" type="linear" dataKey="tpr" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#475569', paddingTop: '20px' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="roc-vs-pr">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <ShieldAlert className="mr-3 text-indigo-600" /> ROC Curve vs. Precision-Recall Curve
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The main disadvantage of ROC lies in severe edge cases of imbalance. When the negative class dramatically outnumbers the positive class (e.g. 1 million normal transactions to just 10 frauds), a massive change in the number of False Positives might only cause a micro-fractional shift in the FPR (since the denominator <code>FP + TN</code> is gigantic).
        </p>
        
        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-10 overflow-x-auto w-full md:w-3/4 font-mono">
          <table className="min-w-full text-slate-800">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-3 text-left">Feature</th>
                <th className="p-3 text-left border-l bg-indigo-50">ROC Curve</th>
                <th className="p-3 text-left border-l bg-emerald-50">Precision-Recall Curve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="p-3 font-bold">Metrics Used</td>
                <td className="p-3 border-l font-semibold text-indigo-900 border-r">TPR vs FPR</td>
                <td className="p-3 font-semibold text-emerald-900">Precision vs Recall</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Ideal Environment</td>
                <td className="p-3 border-l border-r text-indigo-900">Balanced datasets</td>
                <td className="p-3 text-emerald-900">Highly imbalanced, rare-event detection</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Core Focus</td>
                <td className="p-3 border-l border-r text-indigo-900">Evaluates general class separability</td>
                <td className="p-3 text-emerald-900">Focuses intensely on positive class accuracy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        The ROC Curve and AUC Score represent the pinnacle standard for evaluating binary classification models in the field. Rather than statically committing to a 0.5 threshold like accuracy does, the ROC Curve simulates your model sliding dynamically across all valid threshold limits testing how violently the structure fractures.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Finding a model with an AUC stretching near 1.0 (approaching the top-left edge) mathematically guarantees your algorithm exhibits profound internal separation logic between the actual classes. It confirms the structure is solid, and you are free to slide the final production threshold around to dictate specific business needs without fear.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Never plot ROC-AUC using hard logic predictions (0, 1). To produce the smooth bowed visual curve that actually evaluates the separation capability, you must structurally feed raw, fractional <strong>probabilities</strong> (e.g. via <code>predict_proba</code>) so the graphing architecture can slice those probability waves across multiple distinct threshold points.
        </p>
      </div>

    </>
  );
}
