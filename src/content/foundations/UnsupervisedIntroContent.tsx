import React from "react";
import { AnimatedUnsupervised } from "../../components/diagrams/AnimatedFoundationDiagrams";

import { Eye, Layers, Network, Fingerprint, Database, Sparkles, Binary, PieChart } from "lucide-react";

export function UnsupervisedIntroContent() {
  return (
    <>
            
      
      <p className="text-lg leading-relaxed mb-8">
        Unsupervised learning is a type of machine learning that looks for previously undetected patterns in a dataset with no pre-existing labels and with a minimum of human supervision. The goal is not to predict a specific, known outcome, but rather to explore the data to understand its underlying structure, find similarities, compress information, or detect unusual anomalies.
      </p>
      <AnimatedUnsupervised />

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        How Unsupervised Learning Works
      </h2>
      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        Imagine receiving a massive box containing hundreds of different coins from various unknown countries. There are no labels, no values, and no instructions. Even without knowing the currency names or values, you could naturally start grouping them by analyzing their properties:
      </p>
      
      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
        <ul className="list-disc pl-6 space-y-2 text-slate-800 text-lg font-medium">
          <li>Size and Diameter</li>
          <li>Color (Silver, Copper, Gold)</li>
          <li>Weight and Thickness</li>
        </ul>
      </div>
      
      <p className="text-lg leading-relaxed mb-12">
        By separating them into distinct piles based on these shared characteristics, you have successfully organized the data based on similarities. Unsupervised Learning algorithms do exactly this, but with massive, multi-dimensional datasets that human brains cannot process manually.
      </p>

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-6 rounded-r-md">
        <h3 className="text-xl font-bold mb-6 text-center text-slate-800">
          Unsupervised Learning Flowchart
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="bg-slate-100 text-slate-800 p-4 rounded-lg w-full md:w-48 font-semibold border border-slate-200">
            <Database className="w-6 h-6 mx-auto mb-2 text-slate-600" />
            Raw Unlabeled Data
          </div>
          <div className="text-slate-400 hidden md:block text-2xl">→</div>
          <div className="text-slate-400 md:hidden text-2xl">↓</div>
          <div className="bg-amber-50 text-amber-800 p-4 rounded-lg w-full md:w-48 font-semibold border border-amber-200">
             <Network className="w-6 h-6 mx-auto mb-2 text-amber-600" />
            ML Algorithm
          </div>
          <div className="text-slate-400 hidden md:block text-2xl">→</div>
          <div className="text-slate-400 md:hidden text-2xl">↓</div>
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg w-full md:w-56 font-semibold border border-emerald-200">
             <Sparkles className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
            Discovered Patterns
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Main Categories of Unsupervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Unsupervised algorithms can be broadly categorized into several main approaches based on their specific analytical goals.
      </p>

            {/* Hierarchical Tree */}
      <div className="bg-slate-50 border border-slate-200 py-8 px-4 rounded-xl shadow-sm my-8 overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
          Figure — Unsupervised Learning Hierarchy
        </p>
        <div className="flex flex-col items-center min-w-[700px] max-w-4xl mx-auto">
          <div className="bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold shadow text-sm">
            Unsupervised Learning
          </div>
          <div className="w-0.5 bg-slate-300 h-6" />
          
          <div className="relative w-full h-6">
            <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '16.666%', right: '16.666%' }} />
            {[0, 1, 2].map(idx => (
              <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{ left: `${(idx + 0.5) * 100 / 3}%`, transform: 'translateX(-50%)' }} />
            ))}
          </div>
          
          <div className="flex w-full">
            {[
              { label: 'Clustering', color: 'emerald', children: ['K-Means', 'DBSCAN', 'Hierarchical'] },
              { label: 'Dimensionality Reduction', color: 'teal', children: ['PCA', 't-SNE', 'ICA'] },
              { label: 'Association Rules', color: 'cyan', children: ['Apriori', 'FP-Growth'] },
            ].map(branch => (
              <div key={branch.label} className="flex flex-col items-center flex-1 px-3">
                <div className={`bg-${branch.color}-50 border-2 border-${branch.color}-400 text-${branch.color}-900 px-3 py-2.5 rounded-lg font-bold text-xs mb-0 w-full text-center shadow-sm leading-tight`}>
                  {branch.label}
                </div>
                <div className="w-0.5 bg-slate-300 h-5" />
                <div className="relative w-full h-5">
                  <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: `${50 / branch.children.length}%`, right: `${50 / branch.children.length}%` }} />
                  {branch.children.map((_, idx) => (
                    <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-5"
                      style={{ left: `${(idx + 0.5) * 100 / branch.children.length}%`, transform: 'translateX(-50%)' }} />
                  ))}
                </div>
                <div className="flex w-full">
                  {branch.children.map(t => (
                    <div key={t} className="flex-1 px-1">
                      <div className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-1 rounded w-full text-center shadow-sm">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
        <h3 className="text-xl font-bold text-emerald-900 mb-2 flex items-center"><PieChart className="w-6 h-6 mr-3 text-emerald-600"/> 1. Clustering (Grouping Data)</h3>
        <p className="text-lg text-emerald-800 mb-4 leading-relaxed">
          Clustering algorithms group similar data points together. The algorithm's objective is to ensure that items in the same group (cluster) are highly similar to each other, while being distinct from items in other groups.
        </p>
        <p className="text-lg font-bold text-slate-800 mb-2">Real-World Examples:</p>
        <ul className="list-disc pl-6 mb-4 text-lg text-slate-800 space-y-2">
          <li><strong>Customer Segmentation:</strong> A telecom company automatically grouping millions of customers based on call duration and data usage to create specialized, targeted recharge plans.</li>
          <li><strong>Document Categorization:</strong> Automatically grouping thousands of news articles into topical clusters (e.g., Sports, Politics, Tech) without manually tagging them.</li>
        </ul>
        <p className="text-sm font-mono text-emerald-700 bg-emerald-100 p-2 inline-block rounded">Algorithms: K-Means, DBSCAN, Hierarchical Clustering</p>
      </div>

      <div className="pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md mb-8">
        <h3 className="text-xl font-bold text-teal-900 mb-2 flex items-center"><Binary className="w-6 h-6 mr-3 text-teal-600"/> 2. Dimensionality Reduction (Compressing)</h3>
        <p className="text-lg text-teal-800 mb-4 leading-relaxed">
          When datasets have hundreds or thousands of variables (features), they become computationally expensive to process and impossible for humans to visualize. Dimensionality reduction mathematically compresses the data, retaining the most critical information while stripping away noise.
        </p>
        <p className="text-lg font-bold text-slate-800 mb-2">Real-World Examples:</p>
        <ul className="list-disc pl-6 mb-4 text-lg text-slate-800 space-y-2">
          <li><strong>Data Visualization:</strong> Taking a dataset with 500 columns of patient health data and reducing it to 2 or 3 principal components so it can be plotted and visualized on a graph.</li>
          <li><strong>Feature Engineering:</strong> Compressing high-resolution image data before feeding it into a supervised learning model to radically speed up training times.</li>
        </ul>
        <p className="text-sm font-mono text-teal-700 bg-teal-100 p-2 inline-block rounded">Algorithms: Principal Component Analysis (PCA), t-SNE, Autoencoders</p>
      </div>

      <div className="pl-4 border-l-4 border-cyan-400 bg-cyan-50 py-4 pr-4 rounded-r-md mb-12">
        <h3 className="text-xl font-bold text-cyan-900 mb-2 flex items-center"><Layers className="w-6 h-6 mr-3 text-cyan-600"/> 3. Association Rule Learning (Finding Patterns)</h3>
        <p className="text-lg text-cyan-800 mb-4 leading-relaxed">
          This technique discovers interesting co-occurrence relationships or strict logical rules between variables in massive databases. It focuses on finding "if-then" patterns.
        </p>
        <p className="text-lg font-bold text-slate-800 mb-2">Real-World Examples:</p>
        <ul className="list-disc pl-6 mb-4 text-lg text-slate-800 space-y-2">
          <li><strong>Market Basket Analysis:</strong> Retail giants like Amazon or Walmart analyzing billions of transactions to discover that "If a customer buys a flashlight and batteries, they are 80% likely to also buy a tent." This drives product placement and recommendations.</li>
        </ul>
        <p className="text-sm font-mono text-cyan-700 bg-cyan-100 p-2 inline-block rounded">Algorithms: Apriori, FP-Growth</p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Modern Trends: The Rise of Self-Supervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Recently, the boundary between unsupervised and supervised learning has blurred with the advent of <strong>Self-Supervised Learning</strong>. This is a massive trend powering modern Generative AI.
      </p>

      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-12">
        <li>
          <strong className="text-slate-900">How it Works:</strong> The algorithm is given massive amounts of unlabeled data (like the entire text of Wikipedia). It artificially creates its own labels by masking parts of the data. For example, it takes a sentence, hides a word, and forces itself to predict the missing word. By doing this billions of times, it learns the deep structure and grammar of human language without human labeling. This is exactly how models like GPT-4 are initially trained.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Advantages & Limitations
      </h2>

      <div className="space-y-8 mb-12">
        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-6 rounded-r-md">
           <h4 className="text-xl font-bold text-emerald-800 mb-4">Advantages</h4>
           <ul className="list-disc pl-6 space-y-3 text-slate-800 text-lg">
             <li><strong>Cost Effective:</strong> Human-labeled data is incredibly expensive to generate. Unsupervised models utilize raw, unstructured data, which is essentially free and abundant on the internet.</li>
             <li><strong>Discovering Unknowns:</strong> It finds hidden patterns and complex relationships that humans might never have thought to look for.</li>
             <li><strong>Anomaly Detection:</strong> It is the premier tool for finding outliers in data streams, making it essential for fraud detection and cybersecurity.</li>
           </ul>
        </div>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-6 rounded-r-md">
           <h4 className="text-xl font-bold text-slate-800 mb-4">Limitations</h4>
           <ul className="list-disc pl-6 space-y-3 text-slate-800 text-lg">
             <li><strong>Unpredictable Results:</strong> Because there are no intended target answers, predicting what exact features the model will learn to group by is difficult.</li>
             <li><strong>Human Interpretation Required:</strong> The algorithm groups data mathematically, but a human expert must review the clusters to assign actual business meaning to them.</li>
             <li><strong>No Absolute Accuracy Metric:</strong> Unlike supervised learning, you cannot easily calculate an absolute "accuracy percentage" because there is no ground truth answer key to compare against.</li>
           </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />

      
      
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm mb-10">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-800 text-lg">Industry</th>
              <th className="p-4 font-bold text-slate-800 text-lg">Real-World Application Examples</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900 border-r border-slate-100 flex items-center"><Fingerprint className="w-5 h-5 mr-3 text-indigo-600" /> Cybersecurity</td>
              <td className="p-4 text-slate-700 text-lg">Detecting network anomalies, finding zero-day malware signatures based on unusual behavior</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900 border-r border-slate-100 flex items-center"><Database className="w-5 h-5 mr-3 text-rose-600" /> Genetics & Biology</td>
              <td className="p-4 text-slate-700 text-lg">Grouping genes with similar expression patterns, discovering new protein families</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900 border-r border-slate-100 flex items-center"><Eye className="w-5 h-5 mr-3 text-amber-600" /> Marketing & Media</td>
              <td className="p-4 text-slate-700 text-lg">Dynamic customer segmentation, sophisticated recommendation engines, content clustering</td>
            </tr>
          </tbody>
        </table>
      </div>

            
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Clustering</p>
      

          <p className="text-slate-700 text-base leading-relaxed">An unsupervised task of grouping similar data points into mathematical clusters without prior knowledge of labels.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Dimensionality Reduction</p>
          <p className="text-slate-700 text-base leading-relaxed">The process of compressing data by reducing the number of variables while preserving the core underlying information.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Anomaly Detection</p>
          <p className="text-slate-700 text-base leading-relaxed">Identifying rare items, events, or observations which raise suspicions by differing significantly from the majority of the data.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Association Rules</p>
          <p className="text-slate-700 text-base leading-relaxed">Discovering interesting relations or co-occurrence patterns between variables in large databases (e.g., market basket analysis).</p>
        </div>
      </div>
      
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
<p className="text-lg leading-relaxed mb-8">
        Unsupervised Learning excels at exploratory data analysis. When you have massive amounts of raw data and do not know exactly what you are looking for, unsupervised learning acts as a powerful analytical tool to organize the chaos, discover segments, find associations, and reveal hidden value that would be impossible to find manually.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Unsupervised learning does not predict specific answers; it extracts structure. It is the machine equivalent of organizing a messy room—it groups similar items together and flags things that don't belong, leaving it up to humans to decide what those organized groups mean.
        </p>
      </div>
    </>
  );
}
