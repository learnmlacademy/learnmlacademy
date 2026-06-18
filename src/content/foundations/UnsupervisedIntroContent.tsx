import React from "react";

export function UnsupervisedIntroContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Unsupervised Learning</h1>
      <p>Unsupervised Learning is a type of Machine Learning where the model learns from unlabeled data to find hidden structures, patterns, and relationships without a teacher providing correct answers.</p>

      <p>
        The goal is not to predict a specific outcome, but rather to understand
        the underlying structure of the data.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        How Unsupervised Learning Works
      </h2>
      <p>
        Imagine receiving a large box containing hundreds of different coins
        from various countries without any labels or instructions. Even without
        knowing the currency names, you could group them by:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Size</li>
        <li>Color (Silver, Copper, Gold)</li>
        <li>Weight</li>
      </ul>
      <p>
        By doing this, you have successfully organized the data based on
        similarities. Unsupervised Learning algorithms do exactly this with
        massive amounts of complex data.
      </p>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm my-6 p-6">
        <h3 className="text-lg font-bold mb-4 text-center">
          Unsupervised Learning Flowchart
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg w-full md:w-40 font-semibold border border-indigo-200">
            Raw Unlabeled Data
          </div>
          <div className="text-slate-400 hidden md:block">→</div>
          <div className="text-slate-400 md:hidden">↓</div>
          <div className="bg-amber-100 text-amber-800 p-4 rounded-lg w-full md:w-40 font-semibold border border-amber-200">
            ML Algorithm
          </div>
          <div className="text-slate-400 hidden md:block">→</div>
          <div className="text-slate-400 md:hidden">↓</div>
          <div className="bg-emerald-100 text-emerald-800 p-4 rounded-lg w-full md:w-56 font-semibold border border-emerald-200">
            Discovered Patterns / Clusters
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Main Types of Unsupervised Learning
      </h2>

      {/* Hierarchical Tree */}
      <div className="my-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">
          Figure — Unsupervised Learning Hierarchy
        </p>
        <div className="flex flex-col items-center min-w-[620px]">
          <div className="bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold shadow text-sm">
            Unsupervised Learning
          </div>
          <div className="w-0.5 bg-slate-300 h-6" />
          <div className="relative w-[80%] border-t-2 border-slate-300">
            {[0, 50, 100].map(p => <div key={p} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{ left: `${p}%`, transform: 'translateX(-50%)' }} />)}
          </div>
          <div className="flex justify-between w-[85%] mt-6 gap-5">
            {[
              { label: 'Clustering', color: 'emerald', children: ['K-Means', 'DBSCAN', 'Hierarchical'] },
              { label: 'Dimensionality Reduction', color: 'teal', children: ['PCA', 't-SNE', 'ICA'] },
              { label: 'Association Rules', color: 'cyan', children: ['Apriori', 'FP-Growth'] },
            ].map(branch => (
              <div key={branch.label} className="flex flex-col items-center flex-1">
                <div className={`bg-${branch.color}-100 border-2 border-${branch.color}-400 text-${branch.color}-900 px-3 py-2 rounded-lg font-bold text-xs mb-4 w-full text-center shadow-sm leading-tight`}>
                  {branch.label}
                </div>
                <div className="w-0.5 bg-slate-300 h-4" />
                <div className="relative w-full border-t-2 border-slate-300">
                  {branch.children.map((_, idx) => (
                    <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-4"
                      style={{ left: `${(idx / (branch.children.length - 1)) * 100}%`, transform: 'translateX(-50%)' }} />
                  ))}
                </div>
                <div className="flex justify-between w-full mt-4 gap-1">
                  {branch.children.map(t => (
                    <div key={t} className="text-xs bg-white border border-slate-200 text-slate-700 px-1.5 py-1 rounded text-center flex-1 shadow-sm font-medium leading-tight">{t}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p>
        Unsupervised algorithms can be broadly categorized into several main approaches based on their goals.
      </p>

      <div className="my-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto flex flex-col items-center justify-center w-full not-prose">
        <div className="flex flex-col items-center min-w-[500px]">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-md z-10 text-lg">
            Unsupervised Learning
          </div>
          <div className="w-1 bg-slate-300 h-8"></div>
          <div className="w-[85%] border-t-[3px] border-slate-300 relative">
            <div className="absolute left-0 top-0 w-1 bg-slate-300 h-8"></div>
            <div className="absolute left-1/2 -ml-[1px] top-0 w-1 bg-slate-300 h-8"></div>
            <div className="absolute right-0 top-0 w-1 bg-slate-300 h-8"></div>
          </div>
          <div className="flex justify-between w-[90%] mt-8 gap-4">
            <div className="flex flex-col items-center flex-1">
              <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-2 w-full text-center">
                Clustering
              </div>
              <div className="text-xs text-slate-600 font-medium bg-white border border-slate-200 p-2 rounded text-center w-full shadow-sm">Grouping Data</div>
            </div>
             <div className="flex flex-col items-center flex-1">
              <div className="bg-amber-100 border-2 border-amber-400 text-amber-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-2 w-full text-center">
                Dimensionality
              </div>
              <div className="text-xs text-slate-600 font-medium bg-white border border-slate-200 p-2 rounded text-center w-full shadow-sm">Compressing</div>
            </div>
             <div className="flex flex-col items-center flex-1">
              <div className="bg-rose-100 border-2 border-rose-400 text-rose-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-2 w-full text-center text-sm">
                Association Rules
              </div>
              <div className="text-xs text-slate-600 font-medium bg-white border border-slate-200 p-2 rounded text-center w-full shadow-sm">Finding Patterns</div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-6 mb-2">1. Clustering</h3>
      <p>
        Clustering algorithms group similar data points together. Items in the
        same group (cluster) are more similar to each other than to items in
        other groups.
      </p>
      <p>
        <strong>Example:</strong> A telecom company grouping customers based on
        call duration and data usage to create tailored recharge plans.
      </p>

      <h4 className="font-bold mt-4">Popular Clustering Algorithms:</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>K-Means Clustering:</strong> Divides data into 'K' distinct
          groups based on similarities.
        </li>
        <li>
          <strong>Hierarchical Clustering:</strong> Builds a tree of clusters
          that helps in understanding the data hierarchy.
        </li>
        <li>
          <strong>DBSCAN:</strong> Finds clusters based on data density,
          excellent for finding outliers (anomalies).
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-2">
        2. Dimensionality Reduction
      </h3>
      <p>
        When datasets have too many variables (features), it becomes difficult
        to visualize or process them. Dimensionality reduction simplifies the
        data without losing important information.
      </p>
      <p>
        <strong>Example:</strong> Reducing a dataset with 500 columns down to
        the 20 most important columns so it can be analyzed faster.
      </p>

      <h4 className="font-bold mt-4">Popular Algorithms:</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Principal Component Analysis (PCA):</strong> Compresses data
          by finding the most important features.
        </li>
        <li>
          <strong>t-SNE:</strong> Used primarily for visualizing
          high-dimensional data in 2D or 3D spaces.
        </li>
        <li>
          <strong>Autoencoders:</strong> Neural networks designed to compress
          and then reconstruct data.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-2">
        3. Association Rule Learning
      </h3>
      <p>
        This technique discovers interesting relationships or rules between
        variables in large databases.
      </p>
      <p>
        <strong>Example:</strong> Market Basket Analysis. If a customer buys
        bread and butter, they are 80% likely to also buy milk.
      </p>

      <h4 className="font-bold mt-4">Popular Algorithms:</h4>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Apriori Algorithm:</strong> Used heavily in retail to find
          frequent item sets.
        </li>
        <li>
          <strong>FP-Growth:</strong> A faster, more efficient version of
          Apriori for large databases.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Advantages of Unsupervised Learning
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Cost Effective:</strong> Labeled data is expensive to create.
          Unsupervised models use raw data, which is abundant and free.
        </li>
        <li>
          <strong>Discovering Unknowns:</strong> It finds hidden patterns that
          humans might never have thought to look for.
        </li>
        <li>
          <strong>Data Cleanup:</strong> Excellent tool for anomaly detection
          and finding outliers in data streams.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-2">
        Disadvantages & Limitations
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Unpredictable Results:</strong> Because there are no intended
          answers, predicting what the model will learn is difficult.
        </li>
        <li>
          <strong>Interpretation Required:</strong> The algorithm groups data,
          but a human must analyze the groups to assign meaning (e.g., "Group A
          represents teenagers").
        </li>
        <li>
          <strong>Lower Accuracy:</strong> Generally considered less accurate
          than supervised learning for specific, targeted tasks.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Real-World Applications</h2>
      <table className="min-w-full text-left bg-white border border-slate-200 mt-4 rounded-lg shadow-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-bold text-slate-700">Industry</th>
            <th className="p-4 font-bold text-slate-700">
              Application Example
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Marketing & Retail</td>
            <td className="p-4">
              Customer segmentation, Market basket analysis, Recommendation
              systems
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Cybersecurity</td>
            <td className="p-4">
              Detecting network anomalies, Finding malware signatures
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Genetics & Biology</td>
            <td className="p-4">
              Grouping genes with similar expression patterns, Discovering
              protein families
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Document Analysis</td>
            <td className="p-4">
              Automatically clustering news articles by topic grouping
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mt-8">
        <h3 className="font-bold text-lg text-indigo-800">Summary</h3>
        <p className="text-indigo-900 mt-2">
          Unsupervised Learning excels at exploratory data analysis. When you
          have mass amounts of raw data and don't know exactly what you're
          looking for, Unsupervised Learning acts as a powerful tool to organize
          the chaos, discover segments, find associations, and reveal hidden
          value.
        </p>
      </div>
    </div>
  );
}
