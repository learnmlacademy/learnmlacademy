import React from "react";
import { BookOpen, Layers, Hexagon, CircleDashed } from "lucide-react";

export function TypesOfMLContent() {
  return (
    <>
      {/* ── SIMPLE FIRST LOOK ── */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 my-8 shadow-sm">
        <p className="text-center font-bold text-slate-900 text-xl mb-2">Three Main Ways a Machine Can Learn</p>
        <p className="text-center text-slate-600 mb-6">
          Start with one simple question: <strong>what kind of help does the machine receive while learning?</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-4">
            <p className="font-bold text-indigo-900 text-lg mb-3 text-center">Supervised Learning</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <span className="bg-white border border-indigo-200 rounded px-2 py-1">Examples + Answers</span>
              <span aria-hidden="true">→</span>
              <span className="bg-white border border-indigo-200 rounded px-2 py-1">Learn</span>
              <span aria-hidden="true">→</span>
              <span className="bg-white border border-indigo-200 rounded px-2 py-1">Predict</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>School example:</strong> We show past students' study hours together with whether they passed or failed. The model learns from the known answers.
            </p>
          </div>

          <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
            <p className="font-bold text-emerald-900 text-lg mb-3 text-center">Unsupervised Learning</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <span className="bg-white border border-emerald-200 rounded px-2 py-1">Examples Only</span>
              <span aria-hidden="true">→</span>
              <span className="bg-white border border-emerald-200 rounded px-2 py-1">Find Patterns</span>
              <span aria-hidden="true">→</span>
              <span className="bg-white border border-emerald-200 rounded px-2 py-1">Groups</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>School example:</strong> We give students' study and activity data but no group names. The model tries to discover similar groups by itself.
            </p>
          </div>

          <div className="rounded-lg border-2 border-rose-200 bg-rose-50 p-4">
            <p className="font-bold text-rose-900 text-lg mb-3 text-center">Reinforcement Learning</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <span className="bg-white border border-rose-200 rounded px-2 py-1">Try</span>
              <span aria-hidden="true">→</span>
              <span className="bg-white border border-rose-200 rounded px-2 py-1">Reward / Penalty</span>
              <span aria-hidden="true">→</span>
              <span className="bg-white border border-rose-200 rounded px-2 py-1">Improve</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Game example:</strong> A player earns +10 points for reaching the goal and loses points for a wrong move. It learns which actions give better rewards.
            </p>
          </div>
        </div>
      </div>

      {/* ── QUICK COMPARISON ── */}
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-3 font-bold text-slate-800">Type</th>
              <th className="p-3 font-bold text-slate-800 border-l border-slate-200">What does the machine receive?</th>
              <th className="p-3 font-bold text-slate-800 border-l border-slate-200">Simple example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="p-3 font-bold text-indigo-700">Supervised</td>
              <td className="p-3 border-l border-slate-100">Data + correct answers</td>
              <td className="p-3 border-l border-slate-100">Study hours → Pass / Fail</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-emerald-700">Unsupervised</td>
              <td className="p-3 border-l border-slate-100">Data, but no answers</td>
              <td className="p-3 border-l border-slate-100">Group similar students</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-rose-700">Reinforcement</td>
              <td className="p-3 border-l border-slate-100">Actions + rewards / penalties</td>
              <td className="p-3 border-l border-slate-100">Learn the best move in a game</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── HOW TO CHOOSE ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 my-8">
        <p className="font-bold text-slate-900 text-lg mb-4">A Simple Way to Choose the Learning Type</p>
        <div className="space-y-3 text-slate-700">
          <div className="flex gap-3 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">1</span>
            <p><strong>Do you already know the correct answer for your past examples?</strong> If yes, start with <strong>Supervised Learning</strong>.</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">2</span>
            <p><strong>Do you have data but no correct answers, and want to discover groups or patterns?</strong> Think <strong>Unsupervised Learning</strong>.</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-rose-100 text-rose-800 font-bold flex items-center justify-center">3</span>
            <p><strong>Must a system learn by taking actions and receiving feedback?</strong> Think <strong>Reinforcement Learning</strong>.</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 text-center mt-8 mb-2">
        The simple comparison above is enough for a first understanding. The diagram below is a more detailed map for reference — you do not need to memorize it now.
      </p>

            {/* ── HIERARCHICAL TREE ── */}
      <div className="bg-slate-50 border border-slate-200 py-8 px-4 rounded-xl shadow-sm my-8 overflow-x-auto">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
          Figure — Hierarchical Overview of Machine Learning Types
        </p>
      <div className="flex flex-col items-center min-w-[760px] max-w-5xl mx-auto">
          {/* Root */}
          <div className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-md text-lg">
            Machine Learning
          </div>
          <div className="w-0.5 bg-slate-300 h-6" />
          
          {/* First-level line */}
          <div className="relative w-full h-6">
            <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '16.666%', right: '16.666%' }} />
            {[0, 1, 2].map(idx => (
              <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{ left: `${(idx + 0.5) * 100 / 3}%`, transform: 'translateX(-50%)' }} />
            ))}
          </div>
          
          {/* First level nodes */}
          <div className="flex w-full">
            {/* Supervised */}
            <div className="flex flex-col items-center flex-1 px-3">
              <div className="bg-indigo-50 border-2 border-indigo-400 text-indigo-900 px-4 py-2.5 rounded-lg font-bold shadow-sm mb-0 w-full text-center text-sm">
                Supervised Learning
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-full h-5">
                 <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '25%', right: '25%' }} />
                 {[0, 1].map(idx => (
                    <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-5" style={{ left: `${(idx + 0.5) * 100 / 2}%`, transform: 'translateX(-50%)' }} />
                 ))}
              </div>
              <div className="flex w-full">
                {['Regression', 'Classification'].map(t => (
                  <div key={t} className="flex-1 px-1">
                    <div className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-1 rounded w-full text-center shadow-sm">{t}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Unsupervised */}
            <div className="flex flex-col items-center flex-1 px-3">
              <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 px-4 py-2.5 rounded-lg font-bold shadow-sm mb-0 w-full text-center text-sm">
                Unsupervised Learning
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-full h-5">
                 <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '25%', right: '25%' }} />
                 {[0, 1].map(idx => (
                    <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-5" style={{ left: `${(idx + 0.5) * 100 / 2}%`, transform: 'translateX(-50%)' }} />
                 ))}
              </div>
              <div className="flex w-full">
                {['Clustering', 'Dim. Reduction'].map(t => (
                  <div key={t} className="flex-1 px-1">
                    <div className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-1 rounded w-full text-center shadow-sm">{t}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reinforcement */}
            <div className="flex flex-col items-center flex-1 px-3">
              <div className="bg-rose-50 border-2 border-rose-400 text-rose-900 px-4 py-2.5 rounded-lg font-bold shadow-sm mb-0 w-full text-center text-sm">
                Reinforcement Learning
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-full h-5">
                 <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '50%', right: '50%' }} />
                 <div className="absolute top-0 w-0.5 bg-slate-300 h-5" style={{ left: '50%', transform: 'translateX(-50%)' }} />
              </div>
              <div className="flex w-full">
                <div className="flex-1 px-1">
                  <div className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-1 rounded w-full text-center shadow-sm">Reward-Based</div>
                </div>
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
          <p className="text-xs text-slate-500 italic mt-4 text-center">Semi-Supervised and Self-Supervised bridge the gap between purely labeled and purely unlabeled pipelines.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />

      {/* 1. Supervised */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        1. Supervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Supervised learning is the most common paradigm in industry today. It requires providing the algorithm with a <strong className="text-slate-900">labeled dataset</strong> — meaning every piece of input data comes bundled with the correct answer (the output).
      </p>

      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800 font-bold text-xl flex items-center mb-3"><BookOpen className="w-6 h-6 mr-3 text-indigo-600" /> The Teacher-Student Analogy</p>
        <p className="text-lg leading-relaxed text-slate-700">
          Imagine a teacher showing a student flashcards. One side has a picture of an Apple (the <em>Input Data</em>), and the back says "Apple" (the <em>Label</em>). The student guesses, the teacher flips the card to reveal the truth, and the student updates their internal logic to be more accurate next time.
        </p>
      </div>

      <div className="bg-white border border-indigo-200 rounded-xl p-5 mb-8">
        <p className="font-bold text-slate-900 mb-3">A Tiny Labeled Dataset</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-2">Study Hours</th>
                <th className="p-2">Attendance</th>
                <th className="p-2">Known Answer (Label)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="p-2">1</td><td className="p-2">60%</td><td className="p-2 font-semibold">Fail</td></tr>
              <tr><td className="p-2">3</td><td className="p-2">75%</td><td className="p-2 font-semibold">Pass</td></tr>
              <tr><td className="p-2">5</td><td className="p-2">90%</td><td className="p-2 font-semibold">Pass</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-700 mt-3 text-sm leading-relaxed">
          The last column is the key: the model is given the correct past answer while learning. That is why this is called <strong>supervised</strong> learning.
        </p>
      </div>

      <h3 className="font-bold text-xl text-slate-900 mt-8 mb-4">Core Sub-Categories:</h3>
      
      <div className="pl-4 border-l-4 border-slate-300 bg-white py-2 mb-6">
        <h4 className="font-bold text-indigo-700 text-xl mb-2">Classification</h4>
        <p className="text-slate-700 text-lg mb-3">Predicts discrete, categorical labels. The answer is a specific bucket or class.</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700 text-lg mb-3">
          <li><strong>Examples:</strong> Spam or Not Spam; Benign or Malignant Tumor; Cat or Dog.</li>
        </ul>
        <p className="text-sm font-mono text-slate-600 bg-slate-100 p-2 rounded inline-block">Popular Algorithms: Logistic Regression, Random Forest, Support Vector Machines (SVM)</p>
      </div>

      <div className="pl-4 border-l-4 border-slate-300 bg-white py-2 mb-10">
        <h4 className="font-bold text-indigo-700 text-xl mb-2">Regression</h4>
        <p className="text-slate-700 text-lg mb-3">Predicts continuous, numerical values. The answer is a point on a number line.</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700 text-lg mb-3">
          <li><strong>Examples:</strong> Predicting tomorrow's stock price; estimating a house's dollar value; forecasting temperature.</li>
        </ul>
        <p className="text-sm font-mono text-slate-600 bg-slate-100 p-2 rounded inline-block">Popular Algorithms: Linear Regression, Ridge, Lasso, XGBoost Regressor</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50/60">
          <p className="font-bold text-indigo-900 mb-2">Classification asks: Which category?</p>
          <p className="text-slate-700 text-sm mb-2">Example: Will the student <strong>Pass</strong> or <strong>Fail</strong>?</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded bg-white border border-indigo-200 font-semibold text-sm">Pass</span>
            <span className="px-3 py-1 rounded bg-white border border-indigo-200 font-semibold text-sm">Fail</span>
          </div>
        </div>
        <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/60">
          <p className="font-bold text-emerald-900 mb-2">Regression asks: What number?</p>
          <p className="text-slate-700 text-sm mb-2">Example: What marks will the student score?</p>
          <div className="inline-block px-3 py-1 rounded bg-white border border-emerald-200 font-semibold text-sm">Predicted marks: 78</div>
        </div>
      </div>


      {/* 2. Unsupervised */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-emerald-800 border-b pb-2">
        2. Unsupervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Unsupervised Learning works exclusively with <strong className="text-slate-900">unlabeled data</strong>. The algorithm is handed raw data with absolutely no instructions, no correct answers, and no target variable to predict. Its job is to autonomously explore the data and discover hidden structural patterns.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800 font-bold text-xl flex items-center mb-3"><Layers className="w-6 h-6 mr-3 text-emerald-600" /> The Cocktail Party Analogy</p>
        <p className="text-lg text-slate-700 leading-relaxed">
          Imagine standing in the center of a crowded, noisy cocktail party. Even without knowing anyone's name or who they are, your brain naturally groups people based on the cadence of their voices or the physical circles they are standing in. You are autonomously finding patterns in the noise.
        </p>
      </div>

      <div className="bg-white border border-emerald-200 rounded-xl p-5 mb-8">
        <p className="font-bold text-slate-900 mb-2">Simple Picture: Finding Groups Without Answers</p>
        <p className="text-slate-600 text-sm mb-4">Imagine these are students represented only by two habits: study time and sports time. We do not provide group names.</p>
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-center">
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-500 mb-3">Nearby points form a group</p>
            <div className="grid grid-cols-3 gap-2 place-items-center">
              <span className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="w-4 h-4 rounded-full bg-emerald-500" />
            </div>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-500 mb-3">Another similar group</p>
            <div className="grid grid-cols-3 gap-2 place-items-center">
              <span className="w-4 h-4 rounded-full bg-amber-500" />
              <span className="w-4 h-4 rounded-full bg-amber-500" />
              <span className="w-4 h-4 rounded-full bg-amber-500" />
              <span className="w-4 h-4 rounded-full bg-amber-500" />
              <span className="w-4 h-4 rounded-full bg-amber-500" />
              <span className="w-4 h-4 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>
        <p className="text-slate-700 text-sm mt-4 leading-relaxed">
          The machine was never told “Group A” or “Group B”. It created groups because some data points were more similar to each other.
        </p>
      </div>

      <h3 className="font-bold text-xl text-slate-900 mt-8 mb-4">Core Sub-Categories:</h3>

      <div className="pl-4 border-l-4 border-slate-300 bg-white py-2 mb-6">
        <h4 className="font-bold text-emerald-700 text-xl mb-2 flex items-center"><CircleDashed className="w-5 h-5 mr-2"/> Clustering</h4>
        <p className="text-slate-700 text-lg mb-3">Automatically grouping data points into distinct clusters based on their inherent mathematical similarities.</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700 text-lg mb-3">
          <li><strong>Examples:</strong> Customer segmentation for marketing (finding distinct buyer personas automatically); grouping similar news articles.</li>
        </ul>
      </div>

      <div className="pl-4 border-l-4 border-slate-300 bg-white py-2 mb-10">
        <h4 className="font-bold text-emerald-700 text-xl mb-2 flex items-center"><Hexagon className="w-5 h-5 mr-2"/> Dimensionality Reduction</h4>
        <p className="text-slate-700 text-lg mb-3">Compressing data by removing redundant or noisy features while preserving the core underlying information. Crucial for visualizing high-dimensional data or speeding up other ML models.</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700 text-lg mb-3">
          <li><strong>Examples:</strong> Compressing a 100-pixel image into 10 core mathematical features without losing the visual identity.</li>
        </ul>
      </div>

      {/* 3. Reinforcement */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-rose-800 border-b pb-2">
        3. Reinforcement Learning (RL)
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Reinforcement Learning abandons the idea of static datasets entirely. Instead, an <strong className="text-slate-900">Agent</strong> interacts with a dynamic <strong className="text-slate-900">Environment</strong> and learns through a system of <strong className="text-rose-700">rewards and penalties</strong>.
      </p>

      <div className="bg-white border border-rose-200 rounded-xl p-5 mb-6">
        <p className="font-bold text-slate-900 mb-4">A Simple Trial-and-Error Loop</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm font-semibold text-slate-700 text-center">
          <span className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">1. Agent chooses an action</span>
          <span aria-hidden="true">→</span>
          <span className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">2. Environment responds</span>
          <span aria-hidden="true">→</span>
          <span className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">3. Reward or penalty</span>
          <span aria-hidden="true">→</span>
          <span className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">4. Agent improves</span>
        </div>
        <p className="text-slate-700 text-sm mt-4"><strong>Example:</strong> In a maze, reaching the exit may give +10 points, while hitting a dead end may give -2. Over repeated attempts, the agent learns a better route.</p>
      </div>

      <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-lg text-slate-800 leading-relaxed mb-2">
          Through millions of trial-and-error attempts, the agent mathematically optimizes its "Policy" (its strategy) to maximize its long-term reward. This is how DeepMind's AlphaGo learned to defeat world champions in the incredibly complex game of Go.
        </p>
        <ul className="list-disc pl-6 mt-4 text-lg text-rose-900 space-y-2 font-medium">
          <li><strong>Robotics:</strong> Teaching physical robots how to walk by rewarding forward movement and punishing falling over.</li>
          <li><strong>Autonomous Vehicles:</strong> Learning safe driving policies in simulated traffic environments.</li>
        </ul>
      </div>

      {/* 4. Semi & Self Supervised */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-amber-800 border-b pb-2">
        4. Modern Paradigms: Semi & Self-Supervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        As AI has advanced (particularly with Deep Learning and Large Language Models), researchers hit a bottleneck: <em>labeling data is incredibly expensive and slow.</em> These modern paradigms evolved to solve that exact problem.
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
        <h3 className="text-xl font-bold text-amber-900 mb-2">Semi-Supervised Learning</h3>
        <p className="text-slate-800 text-lg leading-relaxed mb-3">
          Combines a tiny amount of manually labeled data with a massive ocean of unlabeled data. 
        </p>
        <p className="text-lg text-slate-800 leading-relaxed italic">
          <strong>The Real-World Use Case:</strong> Medical imaging. Getting highly-paid doctors to manually circle tumors in 1,000,000 X-Rays is prohibitively expensive. Instead, doctors label just 5,000 X-Rays. The algorithm learns the basic pattern, then explores the remaining 995,000 unlabeled X-Rays to solidify its understanding.
        </p>
      </div>

      <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md mb-12">
        <h3 className="text-xl font-bold text-purple-900 mb-2">Self-Supervised Learning</h3>
        <p className="text-slate-800 text-lg leading-relaxed mb-3">
          The ultimate breakthrough behind Generative AI. The model autonomously creates its <em>own</em> labels directly from the raw, unlabeled data structure itself.
        </p>
        <p className="text-lg text-slate-800 leading-relaxed italic">
          <strong>The Real-World Use Case:</strong> Training ChatGPT (Large Language Models). Researchers take billions of pages of internet text. They digitally "hide" the next word in a sentence (e.g., "The cat sat on the [HIDDEN]"). The model guesses the hidden word, and the sentence itself acts as the correct answer key. No human labeling required.
        </p>
      </div>


      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="border border-amber-200 bg-amber-50 rounded-xl p-5">
          <p className="font-bold text-amber-900 mb-3">Semi-Supervised: A Few Answers + Many Unanswered Examples</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {['Labeled', 'Labeled', 'Labeled'].map((item, index) => (
              <span key={`labeled-${index}`} className="px-2 py-1 bg-white border border-amber-300 rounded text-xs font-semibold">{item}</span>
            ))}
            {['?', '?', '?', '?', '?', '?'].map((item, index) => (
              <span key={`unlabeled-${index}`} className="px-2 py-1 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-500">{item}</span>
            ))}
          </div>
          <p className="text-slate-700 text-sm">A small labeled set helps the model learn while a much larger unlabeled set provides extra information.</p>
        </div>

        <div className="border border-purple-200 bg-purple-50 rounded-xl p-5">
          <p className="font-bold text-purple-900 mb-3">Self-Supervised: Create the Practice Question from the Data</p>
          <div className="bg-white border border-purple-200 rounded-lg p-3 text-center text-slate-800 font-medium mb-3">
            The cat sat on the <span className="inline-block px-2 py-0.5 rounded bg-purple-100 border border-purple-200">[ hidden ]</span>
            <div className="mt-2 text-sm text-purple-800">Model tries to predict: <strong>mat</strong></div>
          </div>
          <p className="text-slate-700 text-sm">The original sentence provides the answer, so humans do not have to label every example manually.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Supervised Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training a model on labeled data where the correct answers are explicitly provided.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Unsupervised Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training a model on unlabeled data to autonomously discover hidden patterns or structures.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Reinforcement Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training an agent through a system of rewards and punishments via interaction with a dynamic environment.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Semi-Supervised Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">A modern hybrid approach leveraging a small amount of labeled data and a massive ocean of unlabeled data.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm mb-10">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-800 text-lg">Paradigm Type</th>
              <th className="p-4 font-bold text-slate-800 text-lg border-l border-slate-200">Input Data State</th>
              <th className="p-4 font-bold text-slate-800 text-lg border-l border-slate-200">Primary Objective</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-lg">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-indigo-700">Supervised</td>
              <td className="p-4 text-slate-700 border-l border-slate-100 font-medium bg-indigo-50/30">Fully Labeled</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Accurately predict outputs for new, unseen data based on past answers.</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-emerald-700">Unsupervised</td>
              <td className="p-4 text-slate-700 border-l border-slate-100 font-medium bg-emerald-50/30">Fully Unlabeled</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Autonomously discover hidden structure, clusters, or anomalies.</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-rose-700">Reinforcement</td>
              <td className="p-4 text-slate-700 border-l border-slate-100 font-medium bg-rose-50/30">Dynamic Feedback</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Maximize cumulative long-term mathematical reward via trial and error.</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-purple-700">Self-Supervised</td>
              <td className="p-4 text-slate-700 border-l border-slate-100 font-medium bg-purple-50/30">Raw (Auto-Labeled)</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Learn underlying data representations (Foundation Models like GPT/BERT).</td>
            </tr>
          </tbody>
        </table>
      </div>

            <p className="text-lg leading-relaxed mb-6">
        Choosing the right Machine Learning paradigm is the foundational first step in any project. Your decision is entirely driven by the state of your data and the specific problem you are trying to solve. Understanding these core differences allows you to approach data problems strategically, selecting the most appropriate mathematical tools for the task at hand.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          The type of Machine Learning you choose is completely dictated by the reality of your data. If you have clear historical answers (labels), you must use Supervised Learning. If you have an ocean of raw data and no answers, you must rely on Unsupervised or Self-Supervised methods to extract meaning.
        </p>
      </div>
    </>
  );
}
