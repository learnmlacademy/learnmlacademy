import React from 'react';
import { Network, Database, Image as ImageIcon, BriefcaseMedical, Brain, TrendingUp, AlertTriangle, MessageSquare, BarChart2, Hash, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, Scatter, ZAxis, ResponsiveContainer, BarChart, Bar, ReferenceLine, ScatterChart } from 'lucide-react';
import { ScatterChart as RScatterChart, XAxis as RXAxis, YAxis as RYAxis, ZAxis as RZAxis, CartesianGrid as RCartesianGrid, Tooltip as RTooltip, Legend as RLegend, Scatter as RScatter, ResponsiveContainer as RResponsiveContainer, BarChart as RBarChart, Bar as RBar } from 'recharts';

const dataPoints = [
  // Supervised (labeled)
  { x: 10, y: 20, type: 'Label A', fill: '#ef4444' }, // Red
  { x: 15, y: 25, type: 'Label A', fill: '#ef4444' },
  { x: 80, y: 70, type: 'Label B', fill: '#3b82f6' }, // Blue
  { x: 85, y: 80, type: 'Label B', fill: '#3b82f6' },
  // Unlabeled 
  { x: 12, y: 22, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 18, y: 28, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 22, y: 15, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 25, y: 30, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 30, y: 20, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 70, y: 65, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 75, y: 85, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 85, y: 65, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 90, y: 75, type: 'Unlabeled', fill: '#94a3b8' },
  { x: 95, y: 90, type: 'Unlabeled', fill: '#94a3b8' },
];

export function SemiSupervisedContent() {
  return (
    <div id="semi-supervised-learning-guide">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Semi-Supervised Learning
      </h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Machine Learning algorithms learn patterns from data. Traditionally, Machine Learning is divided into two major categories:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-6">
         <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center"><Database className="w-5 h-5 mr-2" /> Supervised Learning</h3>
            <p className="text-indigo-800 leading-relaxed">Algorithms learn from <strong>Labeled Data</strong>, where every training example already contains the correct answer. The model already knows the expected output.</p>
         </div>
         <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-emerald-900 mb-2 flex items-center"><Network className="w-5 h-5 mr-2" /> Unsupervised Learning</h3>
            <p className="text-emerald-800 leading-relaxed">Algorithms learn from <strong>Unlabeled Data</strong>, where no target labels are available. Used for clustering, segmentation, and grouping tasks.</p>
         </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">The Real-World Problem</h2>
      
      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        In real-world applications, a major practical problem exists: labeled data is expensive and difficult to obtain, while unlabeled data is usually cheap and abundant.
      </p>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8 shadow-sm">
         <div className="flex items-start">
            <BriefcaseMedical className="text-blue-600 w-6 h-6 mr-3 mt-1 shrink-0" />
            <div>
               <h4 className="font-bold text-blue-900 text-lg mb-2">Example: Medical Scanning</h4>
               <p className="text-blue-800 leading-relaxed m-0 text-[15px]">
                  Suppose a hospital has 1,000,000 medical scans, but only 5,000 scans are labeled by doctors because medical annotation is expensive and time-consuming. Traditional supervised learning struggles because very little labeled data exists.
               </p>
            </div>
         </div>
      </div>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        To solve this challenge, Machine Learning introduced <strong>Semi-Supervised Learning</strong>. It combines a small amount of labeled data with a large amount of unlabeled data to build more accurate models.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Visualization: The Core Idea</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The fundamental assumption is that unlabeled data contains hidden structure that can help learning. Even without labels, data points still reveal similarity, clusters, geometry, and relationships.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12 flex flex-col md:flex-row">
         <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Bridging the Gap</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              By observing the distribution of the gray unlabeled points, the model can infer that the distinct clusters belong to the red and blue classes respectively, drastically improving decision boundaries without human labeling.
            </p>
         </div>
         <div className="w-full md:w-1/2 p-4 h-64 bg-slate-50 border-l border-slate-100">
            <RResponsiveContainer width="100%" height="100%">
               <RScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <RCartesianGrid strokeDasharray="3 3" opacity={0.5} />
                  <RXAxis type="number" dataKey="x" hide />
                  <RYAxis type="number" dataKey="y" hide />
                  <RTooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <RLegend iconType="circle" />
                  <RScatter name="Points" data={dataPoints} />
               </RScatterChart>
            </RResponsiveContainer>
         </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Key Assumptions</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Semi-supervised learning works because of several important mathematical assumptions about how data behaves in real space.
      </p>

      <div className="space-y-6 mb-12">
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-xl mb-2 flex items-center">
               <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded px-3 py-1 text-sm mr-3">Assumption 1</span>
               Continuity Assumption
            </h4>
            <p className="text-slate-700 leading-relaxed m-0 text-[15px]">
               Nearby data points are likely to share the same label. If two customers have highly similar purchasing behavior (close in feature space), they probably belong to the same category.
            </p>
         </div>
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-xl mb-2 flex items-center">
               <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded px-3 py-1 text-sm mr-3">Assumption 2</span>
               Cluster Assumption
            </h4>
            <p className="text-slate-700 leading-relaxed m-0 text-[15px]">
               Data naturally forms clusters. Points in the same cluster likely belong to the same class. Even unlabeled points inside a cluster provide useful density information to shape the boundary.
            </p>
         </div>
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-xl mb-2 flex items-center">
               <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded px-3 py-1 text-sm mr-3">Assumption 3</span>
               Manifold Assumption
            </h4>
            <p className="text-slate-700 leading-relaxed m-0 text-[15px]">
               High-dimensional data (like images) actually lies on lower-dimensional structures called "Manifolds." Semi-supervised learning tries to discover these continuous low-dimensional structures.
            </p>
         </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Implementation Example: Label Propagation</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Let's implement a graph-based Semi-Supervised algorithm called Label Propagation using Scikit-Learn.
      </p>

      {/* Step-by-Step Code View */}
      <div className="space-y-6 mb-12">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h4 className="font-bold text-indigo-900 flex items-center m-0">
               Step 1: Hide Labels (Simulate missing data)
            </h4>
          </div>
          <div className="p-0 bg-[#1e1e1e]">
            <pre className="text-[#d4d4d4] font-mono text-sm p-4 overflow-x-auto whitespace-pre-wrap m-0">
<span className="text-emerald-400">import</span> numpy <span className="text-emerald-400">as</span> np
<span className="text-emerald-400">from</span> sklearn <span className="text-emerald-400">import</span> datasets
<span className="text-emerald-400">from</span> sklearn.semi_supervised <span className="text-emerald-400">import</span> LabelPropagation

iris = datasets.load_iris()
X = iris.data
y = iris.target

<span className="text-slate-500"># Randomly remove 70% of labels by setting them to -1</span>
rng = np.random.RandomState(42)
random_unlabeled_points = rng.rand(len(y)) &lt; 0.7
labels = np.copy(y)
labels[random_unlabeled_points] = -1
            </pre>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h4 className="font-bold text-indigo-900 flex items-center m-0">
               Step 2: Train Label Propagation Model
            </h4>
          </div>
          <div className="p-0 bg-[#1e1e1e]">
            <pre className="text-[#d4d4d4] font-mono text-sm p-4 overflow-x-auto whitespace-pre-wrap m-0">
<span className="text-slate-500"># The model learns the structure of ALL points, but only reads labels &gt;= 0</span>
model = LabelPropagation()
model.fit(X, labels)

predictions = model.predict(X)
            </pre>
            <div className="bg-slate-800 p-4 border-t border-slate-700">
               <p className="text-emerald-400 font-mono text-sm m-0">Accuracy: 0.96 (Even with 70% of labels missing!)</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Advantages & Disadvantages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
           <h4 className="text-green-900 font-bold mb-4 flex items-center text-xl m-0">
             Benefits
           </h4>
           <ul className="space-y-3 text-green-800 m-0 pl-0 list-none">
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2">✓</span> Reduces Labeling Cost significantly.</li>
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2">✓</span> Improves Accuracy over purely supervised rules by using hidden structure.</li>
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2">✓</span> Highly scalable to millions of raw, scrapingly acquired data points.</li>
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2">✓</span> Better Generalization of broader data distributions.</li>
           </ul>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
           <h4 className="text-red-900 font-bold mb-4 flex items-center text-xl m-0">
             Disadvantages
           </h4>
           <ul className="space-y-3 text-red-800 m-0 pl-0 list-none">
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2">×</span> Incorrect Pseudo-Labels may propagate errors recursively.</li>
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2">×</span> Complex Implementation & architectural burden.</li>
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2">×</span> Highly sensitive to whether the chosen data assumptions (clusters/metrics) match reality.</li>
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2">×</span> Computationally Expensive due to large unlabeled volume iteration.</li>
           </ul>
        </div>
      </div>

      {/* ── REAL WORLD APPLICATIONS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Real-World Applications</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Semi-supervised learning is used across many high-impact domains where labelled data is scarce but raw data is abundant:
      </p>
      <div className="grid md:grid-cols-2 gap-5 mb-10 not-prose">
        {[
          { icon:"🏥", title:"Medical Imaging", color:"rose", desc:"A hospital may have 100,000 MRI scans but only 2,000 labelled by radiologists. Semi-supervised models use the unlabelled scans to learn anatomical structure, then refine boundaries using the labelled subset. Google DeepMind used this approach for retinal disease detection." },
          { icon:"📝", title:"Natural Language Processing", color:"indigo", desc:"Training large language models like BERT requires vast labelled datasets. Semi-supervised pre-training on billions of unlabelled web pages builds deep language understanding, then fine-tuning on a small labelled task dataset achieves state-of-the-art results." },
          { icon:"🔒", title:"Cybersecurity", color:"slate", desc:"Network traffic logs are abundant but labelled attack examples are rare. Semi-supervised models learn normal traffic patterns from unlabelled data, then use a small set of labelled attacks to learn what constitutes malicious activity." },
          { icon:"🛒", title:"E-commerce Recommendations", color:"emerald", desc:"Most user interactions (views, scroll depth) are unlabelled. Only explicit purchases or ratings are labelled. Semi-supervised models use the rich unlabelled interaction data to build user preference models, then fine-tune on purchases." },
        ].map(a => (
          <div key={a.title} className={`bg-${a.color}-50 border border-${a.color}-200 rounded-xl p-5`}>
            <div className="text-3xl mb-2">{a.icon}</div>
            <h3 className={`font-bold text-${a.color}-900 text-base mb-2`}>{a.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>

      {/* ── TYPES OF SSL ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Types of Semi-Supervised Learning</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        There are several distinct approaches to semi-supervised learning, each using unlabelled data differently:
      </p>
      <div className="space-y-4 mb-10 not-prose">
        {[
          {
            num: "01", name: "Self-Training", color: "indigo",
            desc: "The simplest approach. Train a model on labelled data, predict labels for unlabelled data with high confidence, add those predictions to the training set, retrain, and repeat. Risk: confident wrong predictions propagate errors.",
            example: "A spam classifier trained on 500 labelled emails labels 10,000 unlabelled emails, adds confident predictions to training set, and retrains for improved generalisation."
          },
          {
            num: "02", name: "Co-Training", color: "blue",
            desc: "Train two separate models on different feature views of the same data. Each model labels unlabelled examples for the other model to learn from. Requires that the two feature views be conditionally independent given the label.",
            example: "A web page classifier uses one model trained on the page text and another on the hyperlinks pointing to that page. Each labels unlabelled pages for the other."
          },
          {
            num: "03", name: "Label Propagation / Graph-Based", color: "emerald",
            desc: "Build a graph where nodes are data points and edges represent similarity. Labels spread (propagate) from labelled nodes to nearby unlabelled nodes through the graph, weighted by similarity. Implemented in sklearn as LabelPropagation and LabelSpreading.",
            example: "Image classification: connect similar images with strong edges, propagate 'cat' or 'dog' labels through the graph from the few labelled images to thousands of unlabelled ones."
          },
          {
            num: "04", name: "Generative Models (VAE / GAN)", color: "violet",
            desc: "Learn a generative model of the joint distribution P(x, y) using both labelled and unlabelled data. The generative model learns the structure of the full data distribution, while labels guide the classifier. Used in semi-supervised GANs and VAEs.",
            example: "A semi-supervised VAE for medical imaging learns the manifold of all scans (unlabelled), then uses the few labelled examples to learn which regions of the manifold correspond to each disease."
          },
          {
            num: "05", name: "Consistency Regularisation", color: "amber",
            desc: "The core idea of modern semi-supervised methods like MixMatch and FixMatch: a model's predictions should be consistent under small perturbations of the input. Apply random augmentation to unlabelled images, require the model to produce the same prediction for all augmented versions.",
            example: "FixMatch: apply random crop, flip, and colour jitter to an unlabelled image. If the model is confident about the clean image, force it to predict the same class for all augmented versions."
          },
        ].map(t => (
          <div key={t.num} className={`border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm`}>
            <div className={`bg-${t.color}-600 px-5 py-3 flex items-center gap-3`}>
              <span className="text-white/60 font-black text-xl">{t.num}</span>
              <h3 className="text-white font-bold text-base">{t.name}</h3>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-slate-700 text-sm leading-relaxed">{t.desc}</p>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Example</p>
                <p className="text-slate-600 text-sm leading-relaxed">{t.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── SKLEARN COMPARISON ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Comparing Label Propagation vs Label Spreading</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Scikit-learn provides two graph-based semi-supervised algorithms. Here is how they differ and when to use each:
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Aspect</th>
              <th className="p-3 text-left">LabelPropagation</th>
              <th className="p-3 text-left">LabelSpreading</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ["Label clamping", "Hard — labelled nodes keep their true labels throughout", "Soft — labelled nodes can be influenced by their neighbours"],
              ["Noise tolerance", "Lower — sensitive to mislabelled examples", "Higher — label noise is smoothed out"],
              ["Algorithm", "Direct graph propagation", "Normalised graph Laplacian with regularisation (alpha parameter)"],
              ["Parameter", "kernel, gamma, n_neighbors", "alpha (clamping factor), kernel, gamma"],
              ["Use when", "Labels are clean and reliable", "Labels may contain noise or uncertainty"],
            ].map(([a,b,c]) => (
              <tr key={a} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-700">{a}</td>
                <td className="p-3 text-slate-600 text-xs">{b}</td>
                <td className="p-3 text-slate-600 text-xs">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── WHEN TO USE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">When Should You Use Semi-Supervised Learning?</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-800 mb-3 text-base">✅ Use it when</h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>Labelling is expensive (medical annotation, legal review)</li>
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>You have abundant unlabelled data (web crawls, sensor readings)</li>
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>Supervised model performs poorly due to small labelled set</li>
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>Data has clear cluster structure (similar items cluster together)</li>
          </ul>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-800 mb-3 text-base">❌ Avoid it when</h3>
          <ul className="space-y-2 text-sm text-rose-700">
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>You already have sufficient labelled data</li>
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>The cluster assumption does not hold (overlapping classes)</li>
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>Prediction errors in self-training would cascade harmfully</li>
            <li className="flex items-start gap-2"><span className="mt-0.5">•</span>Interpretability of the model is a hard requirement</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Semi-Supervised Learning is a Machine Learning approach that combines small labeled datasets with large unlabeled datasets to improve learning performance. By bridging the gap between supervised learning and unsupervised learning, it provides high utility for medical AI, NLP, Vision, and recommendation systems where labeling costs are astronomical.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed m-0">
          Unlabeled data is not useless data. The geometric shape, density, and structure of unlabeled data contain powerful signals that can guide decision boundaries, massively reducing the dependencies on human-provided annotations.
        </p>
      </div>

    </div>
  );
}

