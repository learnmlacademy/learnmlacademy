import React from 'react';
import { BaggingDiagram } from '../../components/diagrams/EnsembleDiagrams';
import { 
  Lightbulb, 
  Layers, 
  Target,
  BarChart3,
  Star,
  GitMerge,
  Code,
  CheckCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function BaggingContent() {
  const voteData = [
    { name: 'Tree 1', vote: 'Yes', value: 1 },
    { name: 'Tree 2', vote: 'Yes', value: 1 },
    { name: 'Tree 3', vote: 'No', value: 0 },
    { name: 'Tree 4', vote: 'Yes', value: 1 },
    { name: 'Tree 5', vote: 'No', value: 0 },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Bagging Classifier</h1>
      
      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        Bagging Classifier is an ensemble learning technique. The term Bagging stands for: <strong>Bootstrap Aggregating</strong>.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Bagging is designed to improve the performance, reliability, stability, and generalization ability of Machine Learning models by combining the predictions of multiple models instead of depending on a single model.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        In Machine Learning, a single model may sometimes make unstable predictions. Certain algorithms learn training data too specifically and fail to generalize well on unseen data. Such models may perform very well during training but poorly during testing or real-world deployment. This problem is especially common in algorithms like Decision Trees, Deep neural networks, and High-variance classifiers.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 font-medium italic mb-2">
          "Instead of trusting one model completely, combine many models together to create a stronger and more reliable system."
        </p>
        <p className="text-emerald-800">
          Bagging was introduced as a solution to reduce precisely this instability and improve prediction quality.
        </p>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        Simple Real-Life Analogy: Collective Intelligence
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Suppose a company wants to make an important business decision. If only one employee gives advice, the company risks making a poor decision because that person may miss important details, make biased assumptions, or interpret data incorrectly.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Now imagine the company forms a committee of experts. Each expert independently studies the problem and gives an opinion. The company combines all opinions and takes the majority decision. This collective decision is usually more accurate, more balanced, more stable, and less risky. Bagging works using this exact philosophy!
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY BAGGING IS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Why Bagging Is Needed: The Problem of Overfitting
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        To understand the importance of Bagging, we must first understand one of the biggest problems in Machine Learning: <strong>Overfitting</strong>. Overfitting happens when a model memorizes the training data instead of learning general patterns.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        For example: Suppose a student memorizes answers to previous exam questions without understanding concepts. The student may score very well if the same questions appear again. But if new questions are asked, the student may fail badly. Similarly, overfitted Machine Learning models perform well only on familiar data.
      </p>
      
      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4">
        High Variance Models
      </h3>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Some Machine Learning algorithms are naturally unstable. A small change in training data may completely change their predictions. This behavior is called <strong>High Variance</strong>. Decision Trees are one of the best examples; even a tiny change in dataset may create a completely different tree structure, resulting in unstable predictions and poor generalization.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Main Goal of Bagging</h3>
        <p className="text-indigo-800 text-lg leading-relaxed mb-2">
          The primary objective of Bagging is to: <strong>Reduce variance without increasing bias significantly.</strong>
        </p>
        <p className="text-indigo-800 text-lg leading-relaxed">
          When many models work together, individual mistakes reduce, noise influence decreases, and predictions become wonderfully stable.
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
             <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">High-Level Workflow of Bagging</h4>
         </div>
         <div className="p-6">
            <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-700 marker:text-emerald-600 marker:font-bold">
              <li><strong>Original Dataset</strong></li>
              <li><strong>Create Multiple Bootstrap Samples:</strong> Random subsets with replacement.</li>
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
            Bootstrap means: <strong>Random sampling with replacement</strong>. Instead of training every model on the same dataset, Bagging creates different random datasets.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
             <p className="text-slate-700 font-bold mb-2">Example:</p>
             <p className="text-slate-700 mb-2">Original dataset: <code>[1, 2, 3, 4, 5]</code></p>
             <p className="text-slate-700 mt-2">Bootstrap sample 1: <code>[2, 2, 4, 5, 1]</code></p>
             <p className="text-slate-700">Bootstrap sample 2: <code>[3, 1, 1, 4, 2]</code></p>
             <p className="text-slate-700">Bootstrap sample 3: <code>[5, 3, 2, 2, 4]</code></p>
             <p className="text-slate-600 italic mt-3 text-sm">Notice carefully: Some values repeat, some values disappear. This creates vital diversity.</p>
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
             <li><strong>Classification:</strong> Majority Voting is used. The class receiving maximum votes becomes the final prediction.</li>
             <li><strong>Regression:</strong> Average Prediction is used. Numerical outputs from all models are literally averaged together to form the final output.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* VISUALIZATIONS */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <BarChart3 className="mr-2 text-rose-600" /> Visualizing Aggregation
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col">
          <h4 className="font-bold text-slate-800 text-center mb-2">Classification: Majority Voting Example</h4>
          <p className="text-sm text-slate-500 text-center mb-6">5 Classifiers Predict "Yes" or "No". Final Output = Yes.</p>
          <div className="w-full h-[250px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={voteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} tickFormatter={(val) => val === 1 ? 'Yes' : 'No'} domain={[0, 1.2]} />
                <Tooltip cursor={{fill: 'transparent'}} formatter={(value: any, name: string, props: any) => [props.payload.vote, "Prediction"]} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {voteData.map((entry, index) => (
                    <Cell key={`cell-\${index}`} fill={entry.value === 1 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm p-6 flex flex-col justify-center items-center">
          <h4 className="font-bold text-slate-800 text-center mb-2">Regression: Averaging Example</h4>
          <p className="text-sm text-slate-500 text-center mb-6">Predictions: 100, 120, 110, 130, 140</p>
          
          <div className="bg-slate-50 p-6 rounded-lg w-full max-w-sm">
             <p className="text-center text-slate-700 font-mono text-lg font-bold mb-4">
                (100 + 120 + 110 + 130 + 140) / 5
             </p>
             <div className="flex justify-center items-center mb-4 text-emerald-600">
               <ArrowRight className="w-8 h-8 rotate-90" />
             </div>
             <p className="text-center text-emerald-700 font-mono text-2xl font-black">
                = 120
             </p>
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-10 text-lg">
        <p className="font-bold text-amber-900 mb-2">Mathematical Intuition of Variance Reduction</p>
        <p className="text-amber-800">
          Suppose the variance of one model is <code>σ²</code>. After averaging multiple <em>independent</em> models, the variance approximately becomes <code>σ² / n</code> (Where <code>n</code> is the number of models). Higher <code>n</code> completely destroys variance! This is one of the core mathematical reasons why Bagging actually works.
        </p>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

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
        Here is a practical Scikit-Learn implementation of a Bagging Classifier utilizing Decision Trees as base estimators on an example dataset.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
          <Code className="text-indigo-600 mr-2" />
          <h4 className="font-bold text-indigo-800 text-xl">Python Code: Bagging Classifier</h4>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Training Data (X = feature inputs, y = target classes)
X = np.array([[10, 2], [20, 1], [30, 4], [40, 3], [50, 5]])
y = np.array([0, 0, 1, 1, 1])

# Initialize Bagging Classifier with 3 Decision Trees
bag_model = BaggingClassifier(
    estimator=DecisionTreeClassifier(),
    n_estimators=3,
    random_state=42
)
bag_model.fit(X, y)

# Prediction Data
X_test = np.array([[35, 4]])

# Predict with the aggregated ensemble
prediction = bag_model.predict(X_test)

print(f"Bagged Final Prediction: {prediction[0]}")`}</code>
          </pre>
        </div>
        <div className="bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base leading-relaxed p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400 text-xs ml-2 font-sans uppercase tracking-wider">Terminal Output</span>
          </div>
          <p className="mb-1">$ python bagging_example.py</p>
          <p className="text-slate-300">Bagged Final Prediction: 1</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Bagging Classifier drastically transforms weak, unstable models like standalone Decision Trees into powerful predictive engines by leveraging random subsetting and collective intelligence.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Because individual models naturally overfit to different subsets of data and feature relationships, pooling their predictions ensures that individual mistakes are washed away via mathematical averaging.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Bagging solves the problem of high variance directly. If you have an algorithm that throws wild predictions when fed slightly new data, Bagging forces consensus, crushing the variance and yielding incredibly stable outcomes."
         </p>
      </div>

    </>
  );
}

