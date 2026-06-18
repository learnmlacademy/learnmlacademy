import React from "react";
import { BrainCircuit, BookOpen, Layers, Dna, Hexagon, CircleDashed } from "lucide-react";

export function TypesOfMLContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
        Types of Machine Learning
      </h1>

      <div className="text-xl text-slate-700 mb-8 leading-relaxed">
        Machine Learning can be divided into different categories based on how a machine learns from data. Each type follows a different learning approach and is suitable for different kinds of problems.
      </div>

      {/* ── HIERARCHICAL TREE — placed BEFORE the individual sections ── */}
      <div className="my-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
          Figure — Hierarchical Overview of Machine Learning Types
        </p>
        <div className="flex flex-col items-center min-w-[640px]">
          {/* Root */}
          <div className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-md text-lg">
            Machine Learning
          </div>
          <div className="w-0.5 bg-slate-300 h-8" />
          {/* First-level line */}
          <div className="relative w-[90%] border-t-2 border-slate-300">
            {[0, 50, 100].map(pct => (
              <div key={pct} className="absolute top-0 w-0.5 bg-slate-300 h-8"
                style={{ left: `${pct}%`, transform: 'translateX(-50%)' }} />
            ))}
          </div>
          {/* First level nodes */}
          <div className="flex justify-between w-[95%] mt-8 gap-4">
            {/* Supervised */}
            <div className="flex flex-col items-center flex-1">
              <div className="bg-indigo-100 border-2 border-indigo-400 text-indigo-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-3 w-full text-center text-sm">
                Supervised Learning
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-[85%] border-t-2 border-slate-300">
                <div className="absolute left-0 top-0 w-0.5 bg-slate-300 h-4" />
                <div className="absolute right-0 top-0 w-0.5 bg-slate-300 h-4" />
              </div>
              <div className="flex justify-between w-full mt-4 gap-2">
                <div className="text-xs bg-white border border-indigo-200 text-indigo-700 px-2 py-1.5 rounded text-center flex-1 shadow-sm font-semibold">Regression</div>
                <div className="text-xs bg-white border border-indigo-200 text-indigo-700 px-2 py-1.5 rounded text-center flex-1 shadow-sm font-semibold">Classification</div>
              </div>
            </div>
            {/* Unsupervised */}
            <div className="flex flex-col items-center flex-1">
              <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-3 w-full text-center text-sm">
                Unsupervised Learning
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-[85%] border-t-2 border-slate-300">
                <div className="absolute left-0 top-0 w-0.5 bg-slate-300 h-4" />
                <div className="absolute right-0 top-0 w-0.5 bg-slate-300 h-4" />
              </div>
              <div className="flex justify-between w-full mt-4 gap-2">
                <div className="text-xs bg-white border border-emerald-200 text-emerald-700 px-2 py-1.5 rounded text-center flex-1 shadow-sm font-semibold">Clustering</div>
                <div className="text-xs bg-white border border-emerald-200 text-emerald-700 px-2 py-1.5 rounded text-center flex-1 shadow-sm font-semibold">Dim. Reduction</div>
              </div>
            </div>
            {/* Reinforcement */}
            <div className="flex flex-col items-center flex-1">
              <div className="bg-rose-100 border-2 border-rose-400 text-rose-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-3 w-full text-center text-sm">
                Reinforcement Learning
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="text-xs bg-white border border-rose-200 text-rose-700 px-2 py-1.5 rounded text-center w-[80%] shadow-sm font-semibold mt-4">
                Reward-Based
              </div>
            </div>
          </div>
          {/* Second level: Semi / Self */}
          <div className="mt-8 w-full flex justify-center gap-6">
            <div className="bg-amber-100 border-2 border-amber-400 text-amber-900 px-4 py-2 rounded-lg font-bold shadow-sm text-center text-sm flex-1 max-w-[220px]">
              Semi-Supervised
            </div>
            <div className="bg-purple-100 border-2 border-purple-400 text-purple-900 px-4 py-2 rounded-lg font-bold shadow-sm text-center text-sm flex-1 max-w-[220px]">
              Self-Supervised
            </div>
          </div>
          <p className="text-xs text-slate-400 italic mt-3 text-center">Semi-Supervised and Self-Supervised use combinations of the above approaches</p>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-4">
        These approaches help machines predict outcomes, discover hidden patterns, make intelligent decisions, and improve automatically with experience.
      </p>

      {/* 1. Supervised */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        1. Supervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Supervised learning involves providing the algorithm with a known dataset that includes desired inputs and outputs. The model learns using <strong className="text-slate-900">labeled data</strong>.
      </p>
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800 font-medium text-lg flex items-center mb-2"><BookOpen className="w-5 h-5 mr-2 text-indigo-600" /> What does labeled data mean?</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Input data is already associated with the correct output.</li>
          <li>The machine learns by comparing its predictions with the actual answers.</li>
        </ul>
      </div>
      <p className="text-lg leading-relaxed mb-4">
        Imagine teaching a child to identify fruits. You show them an Apple and say "Apple". After seeing multiple labeled examples, the child learns to identify the fruit correctly without your help.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 text-xl mb-2">Classification</h4>
          <p className="text-slate-600 text-sm mb-3">Predicts categories or labels (e.g., Spam or Not Spam, Diseased or Healthy).</p>
          <p className="text-xs font-mono text-slate-500 bg-slate-100 p-2 rounded">Algorithms: Logistic Regression, Decision Tree, Random Forest, SVM, KNN</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 text-xl mb-2">Regression</h4>
          <p className="text-slate-600 text-sm mb-3">Predicts continuous numerical values (e.g., house prices, temperature).</p>
          <p className="text-xs font-mono text-slate-500 bg-slate-100 p-2 rounded">Algorithms: Linear Regression, Polynomial Regression, Ridge, Lasso</p>
        </div>
      </div>

      {/* 2. Unsupervised */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        2. Unsupervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Unsupervised Learning works with <strong className="text-slate-900">unlabeled data</strong>. The machine does not receive correct answers during training. Instead, the goal is to discover hidden patterns and create natural groupings automatically.
      </p>
      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        Imagine entering a classroom full of strangers. Without instructions, students naturally form groups based on interests. Unsupervised Learning behaves similarly.
      </p>
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <CircleDashed className="w-6 h-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-slate-800 text-lg">A. Clustering</h4>
            <p className="text-slate-600">Groups similar data points together. Algorithms: K-Means, DBSCAN.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Layers className="w-6 h-6 mr-3 text-emerald-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-slate-800 text-lg">B. Dimensionality Reduction</h4>
            <p className="text-slate-600">Reduces features while preserving information. Algorithms: PCA, ICA.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Hexagon className="w-6 h-6 mr-3 text-purple-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-slate-800 text-lg">C. Association Rule Learning</h4>
            <p className="text-slate-600">Discovers item relationships. Algorithms: Apriori, FP-Growth.</p>
          </div>
        </div>
      </div>

      {/* 3. Reinforcement */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        3. Reinforcement Learning
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Reinforcement Learning (RL) teaches machines through rewards and penalties. An agent interacts with an environment and learns which actions produce the highest rewards over time.
      </p>
      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800">
          Imagine teaching a dog tricks. <strong className="text-rose-800">Correct action → Reward.</strong> <strong className="text-rose-800">Wrong action → No reward.</strong> Gradually, the dog learns the correct behavior. RL follows this exact trial-and-error principle.
        </p>
      </div>
      <ul className="list-disc pl-6 mb-8 text-lg text-slate-700">
        <li><strong>Self-Driving Cars:</strong> Learning driving decisions dynamically.</li>
        <li><strong>Gaming AI:</strong> AlphaGo learning winning strategies.</li>
        <li><strong>Robotics:</strong> Teaching physical robots movement and balance.</li>
      </ul>

      {/* 4. Semi-Supervised & Self-Supervised — MERGED as requested */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        4. Semi-Supervised &amp; Self-Supervised Learning
      </h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-amber-900 mb-3">Semi-Supervised Learning</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            Combines a small amount of labeled data with a large amount of unlabeled data. Extremely useful when manual labeling is expensive (e.g., medical imaging scans).
          </p>
          <p className="text-sm text-amber-800 bg-amber-100 rounded px-3 py-2 font-medium">
            📌 Example: A small set of labeled tumor scans trains initial patterns, then generalizes across thousands of unlabeled scans.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-3">Self-Supervised Learning</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            The model creates its own labels from raw data. For example, blanking a word in a sentence ("The cat sat on the ___") and forcing the model to predict it — repeated millions of times.
          </p>
          <p className="text-sm text-purple-800 bg-purple-100 rounded px-3 py-2 font-medium">
            📌 Foundation of powerful models like GPT and BERT — no human labeling required.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Summary Comparison</h2>
      <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Type</th>
              <th className="p-4 font-bold text-slate-700">Data Type</th>
              <th className="p-4 font-bold text-slate-700">Goal</th>
              <th className="p-4 font-bold text-slate-700">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr className="hover:bg-slate-50"><td className="p-4 font-bold">Supervised</td><td className="p-4">Labeled</td><td className="p-4">Predict mapped outputs</td><td className="p-4">Spam detection</td></tr>
            <tr className="hover:bg-slate-50"><td className="p-4 font-bold">Unsupervised</td><td className="p-4">Unlabeled</td><td className="p-4">Discover patterns</td><td className="p-4">Customer segmentation</td></tr>
            <tr className="hover:bg-slate-50"><td className="p-4 font-bold">Reinforcement</td><td className="p-4">Reward-based</td><td className="p-4">Learn optimal actions</td><td className="p-4">Robotics navigation</td></tr>
            <tr className="hover:bg-slate-50"><td className="p-4 font-bold">Self/Semi-Supervised</td><td className="p-4">Mixed / Auto-gen</td><td className="p-4">Learn representations</td><td className="p-4">GPT, BERT models</td></tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Key Insight:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          The type of ML you choose is primarily dictated by your data. If you have labeled examples, use Supervised Learning. If you have raw unlabeled data, use Unsupervised Learning. If you need an agent to learn by trial-and-error, use Reinforcement Learning.
        </p>
      </div>
    </>
  );
}
