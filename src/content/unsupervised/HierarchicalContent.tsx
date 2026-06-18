import React from 'react';
import { 
  Target, Layers, Activity, Code, ShieldCheck, Check, X as CloseIcon, 
  AlertCircle, GitMerge, Cpu, TrendingUp, Calculator, Network
} from 'lucide-react';

export function HierarchicalContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Hierarchical Clustering</h1>

      <p className="lead text-xl text-slate-700 mb-8 border-l-4 border-indigo-500 pl-4 py-3 bg-slate-50 rounded-r-md shadow-sm">
        Hierarchical Clustering is an algorithm in the field of <strong>Unsupervised Machine Learning</strong> used to group similar objects into clusters.</p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        It is a clustering technique used to discover <strong>Natural hierarchical relationships between data points</strong>. Unlike K-Means Clustering, which directly partitions data into a fixed number of clusters, Hierarchical Clustering creates:
      </p>
      
      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-emerald-900 leading-relaxed mb-0 font-medium">
          A complete tree-like structure of clusters, showing how groups are formed gradually. This tree structure is mathematically called a <strong>Dendrogram</strong>.
        </p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Hierarchical Clustering is extremely important because it allows us to understand Relationships between clusters, Nested grouping structures, Similarity levels among data points, and Cluster evolution step-by-step.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm is widely used in Bioinformatics, Genetics, Medical research, Customer segmentation, Image analysis, Social network analysis, Document clustering, and Recommendation systems. It became especially famous in biology for analyzing DNA similarity, Gene expression, and Species evolution because hierarchical relationships naturally exist in biological systems.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* WHY K-MEANS WAS NEEDED */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <AlertCircle className="mr-2 text-indigo-600" /> Why Hierarchical Clustering Was Needed
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Earlier clustering algorithms like <strong>K-Means</strong> required one major thing before training: <strong>The value of K (Number of clusters)</strong>.
      </p>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        But in many real-world problems, <strong>the correct number of clusters is unknown</strong>. Researchers wanted an algorithm that could:
      </p>
      <ul className="list-disc pl-8 mb-6 text-lg text-slate-700 space-y-1">
        <li>Automatically reveal grouping structure</li>
        <li>Show relationships between clusters</li>
        <li>Allow flexible cluster selection later</li>
        <li>Preserve hierarchy information</li>
      </ul>

      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        This led directly to the development of <strong>Hierarchical Clustering</strong>.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Real-Life Analogy of Hierarchical Clustering
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Imagine organizing books inside a giant library. Initially, all books are separate. Then gradually, books about similar topics are grouped together. For example: Science books together, History books together, Mathematics books together.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
           <h3 className="text-lg font-bold text-slate-800 mb-3">Library Hierarchy Example</h3>
           <ul className="list-none pl-4 space-y-1 text-slate-700 font-mono">
             <li>└─ <strong>Science</strong>
                <ul className="pl-6 text-slate-600">
                  <li>├─ Physics</li>
                  <li>├─ Chemistry</li>
                  <li>└─ <strong>Biology</strong>
                      <ul className="pl-6 text-slate-500">
                         <li>├─ Genetics</li>
                         <li>├─ Zoology</li>
                         <li>└─ Botany</li>
                      </ul>
                  </li>
                </ul>
             </li>
           </ul>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Notice something important: <strong>Groups form at multiple levels</strong>. This creates a hierarchy. Hierarchical Clustering works exactly like this. It forms Small clusters, Medium clusters, and Large clusters, creating a complete hierarchy of relationships.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* TYPES OF HIERARCHICAL CLUSTERING */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Network className="mr-2 text-indigo-600" /> Types of Hierarchical Clustering
      </h2>

      <div className="space-y-12 mb-10">
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
           <div className="bg-indigo-50 border-b border-indigo-100 p-4">
               <h3 className="text-lg font-bold text-indigo-900 mb-0">1. Agglomerative Clustering</h3>
           </div>
           <div className="p-6">
              <p className="text-lg text-slate-700 mb-4">
                <strong>Bottom-Up Approach</strong>
              </p>
              <p className="text-slate-700 mb-4">
                Initially: Every point is its own cluster. Then clusters gradually merge. Small clusters combine into larger clusters.
              </p>
              <div className="space-y-8 mt-6">
                
                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=0</div>
                    <h4 className="text-xl font-bold text-indigo-900 mb-2">Step 1: Initialization</h4>
                    <p className="text-lg text-slate-700">The process starts bottom-up. Every data point is treated as its own independent cluster. Here we have four distinct points: A, B, C, and D.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=1</div>
                    <h4 className="text-xl font-bold text-indigo-900 mb-2">Step 2: First Merge</h4>
                    <p className="text-lg text-slate-700">The algorithm evaluates pairwise distances. Points <strong>A and B</strong> are the closest to each other, so they merge into a new cluster: <strong>AB</strong>.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Cluster AB Shape */}
                      <ellipse cx="62.5" cy="52.5" rx="45" ry="25" fill="#c7d2fe" fillOpacity="0.4" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" transform="rotate(7 62.5 52.5)" />
                      
                      {/* Connecting Line */}
                      <path d="M 40 50 L 85 55" stroke="#4f46e5" strokeWidth="2" />

                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=2</div>
                    <h4 className="text-xl font-bold text-indigo-900 mb-2">Step 3: Second Merge</h4>
                    <p className="text-lg text-slate-700">Cluster <strong>AB</strong> is found to be closer to point <strong>C</strong> than to D. Thus, C is enveloped into the group, forming cluster <strong>ABC</strong>.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Cluster ABC Shape */}
                      <path d="M 18 55 C 18 10, 80 10, 100 40 C 130 80, 170 80, 160 105 C 145 125, 45 105, 18 55 Z" fill="#a5b4fc" fillOpacity="0.4" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" />
                      
                      {/* Connecting Lines */}
                      <path d="M 40 50 L 85 55" stroke="#4f46e5" strokeWidth="2" />
                      <path d="M 85 55 L 145 80" stroke="#4f46e5" strokeWidth="2" />

                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=3</div>
                    <h4 className="text-xl font-bold text-indigo-900 mb-2">Step 4: Final Merge</h4>
                    <p className="text-lg text-slate-700">The remaining group <strong>ABC</strong> is finally merged with the remaining point <strong>D</strong>. The algorithm terminates as all data points form a single root cluster <strong>ABCD</strong>.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Cluster ABCD Shape */}
                      <path d="M 12 55 C 10 -5, 200 -10, 208 40 C 215 90, 160 115, 140 112 C 100 110, 45 110, 12 55 Z" fill="#818cf8" fillOpacity="0.4" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 4" />
                      
                      {/* Connecting Lines */}
                      <path d="M 40 50 L 85 55 L 145 80 L 185 35" stroke="#4f46e5" strokeWidth="2" fill="none" />

                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#312e81" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>
              </div>
           </div>
        </div>
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
           <div className="bg-emerald-50 border-b border-emerald-100 p-4">
               <h3 className="text-lg font-bold text-emerald-900 mb-0">2. Divisive Clustering</h3>
           </div>
           <div className="p-6">
              <p className="text-lg text-slate-700 mb-4">
                <strong>Top-Down Approach</strong>
              </p>
              <p className="text-slate-700 mb-4">
                Initially: All data points belong to one giant cluster. Then the cluster gradually splits. Large clusters divide into smaller groups.
              </p>
              <div className="space-y-8 mt-6">
                
                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=0</div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Step 1: Initialization</h4>
                    <p className="text-lg text-slate-700">The process starts top-down. All data points are initially assumed to belong to one giant, single cluster <strong>ABCD</strong>.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Cluster ABCD Shape */}
                      <path d="M 12 55 C 10 -5, 200 -10, 208 40 C 215 90, 160 115, 140 112 C 100 110, 45 110, 12 55 Z" fill="#6ee7b7" fillOpacity="0.4" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />
                      
                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#6ee7b7" stroke="#059669" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#6ee7b7" stroke="#059669" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#6ee7b7" stroke="#059669" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#6ee7b7" stroke="#059669" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=1</div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Step 2: First Split</h4>
                    <p className="text-lg text-slate-700">The algorithm identifies the furthest point in the dataset. <strong>D</strong> is isolated into its own cluster, separating from the <strong>ABC</strong> group.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Cluster ABC Shape */}
                      <path d="M 18 55 C 18 10, 80 10, 100 40 C 130 80, 170 80, 160 105 C 145 125, 45 105, 18 55 Z" fill="#a7f3d0" fillOpacity="0.4" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />
                      
                      {/* Split Line Indicator (Optional but helpful visual cut) */}
                      <line x1="160" y1="10" x2="165" y2="110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 6" />

                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=2</div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Step 3: Second Split</h4>
                    <p className="text-lg text-slate-700">Cluster <strong>ABC</strong> is further divided. Point <strong>C</strong> is isolated, leaving points <strong>A and B</strong> together in cluster <strong>AB</strong>.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Cluster AB Shape */}
                      <ellipse cx="62.5" cy="52.5" rx="45" ry="25" fill="#d1fae5" fillOpacity="0.4" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" transform="rotate(7 62.5 52.5)" />
                      
                      {/* Split Line Indicator (Optional but helpful visual cut) */}
                      <line x1="110" y1="20" x2="120" y2="105" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 6" />

                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-3">t=3</div>
                    <h4 className="text-xl font-bold text-emerald-900 mb-2">Step 4: Final Split</h4>
                    <p className="text-lg text-slate-700">Cluster <strong>AB</strong> splits into <strong>A</strong> and <strong>B</strong>. The algorithm terminates because every point is now in its own separate cluster.</p>
                  </div>
                  <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <svg viewBox="0 0 220 120" className="w-full max-w-3xl drop-shadow-sm">
                      {/* Split Line Indicator (Optional but helpful visual cut) */}
                      <line x1="62" y1="20" x2="62" y2="85" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 6" />

                      {/* Points */}
                      <circle cx="40" cy="50" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="40" y="55" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">A</text>
                      
                      <circle cx="85" cy="55" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="85" y="60" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">B</text>
                      
                      <circle cx="145" cy="80" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="145" y="85" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">C</text>
                      
                      <circle cx="185" cy="35" r="14" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                      <text x="185" y="40" fontSize="14" fontWeight="bold" fill="#064e3b" textAnchor="middle">D</text>
                    </svg>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Which Type Is More Common?</strong> In practical Machine Learning, <strong>Agglomerative Clustering</strong> is far more commonly used because it is Easier to implement, Computationally practical, and More intuitive.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* AGGLOMERATIVE DEEP DIVE */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Layers className="mr-2 text-indigo-600" /> Understanding Agglomerative Clustering Deeply
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Agglomerative clustering starts with <strong>Every point as an independent cluster</strong>. 
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Then repeatedly: Find nearest clusters ➔ Merge them ➔ Recalculate distances ➔ Repeat until all points merge.
      </p>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        What Determines "Closest Clusters"? (Linkage Methods)
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        This is an important concept in Hierarchical Clustering. The algorithm needs a method to measure distance between clusters. This is called <strong>Linkage Criteria</strong>.
      </p>

      <div className="space-y-6 mb-10">
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">1. Single Linkage</h4>
          <p className="text-lg text-slate-700 mb-2">Measures: <strong>Minimum distance between two clusters</strong>. <code>D(A,B) = min(d(a,b))</code></p>
          <p className="text-slate-700 mb-2">If even one pair of points is close: Clusters merge.</p>
          <div className="bg-rose-50 text-rose-800 p-3 rounded font-sm">
            <strong>Problem:</strong> May create chain-like clusters, called the "Chaining Effect". Even distant groups may merge through chains.
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">2. Complete Linkage</h4>
          <p className="text-lg text-slate-700 mb-2">Measures: <strong>Maximum distance between clusters</strong>. <code>D(A,B) = max(d(a,b))</code></p>
          <p className="text-slate-700 mb-2">Clusters merge only if all points are reasonably close. Creates compact clusters.</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h4 className="text-lg font-bold text-indigo-800 mb-2">3. Average Linkage</h4>
          <p className="text-lg text-slate-700 mb-2">Measures: <strong>Average pairwise distance between clusters</strong>.</p>
          <p className="text-slate-700 mb-0">It balances Single linkage and Complete linkage, giving more stable clustering.</p>
        </div>

        <div className="p-5 bg-white border border-blue-200 bg-blue-50/30 rounded-lg shadow-sm border-l-4 border-l-blue-500">
          <h4 className="text-lg font-bold text-blue-900 mb-2">4. Ward Linkage (Most Important)</h4>
          <p className="text-lg text-slate-700 mb-2">Ward linkage is an important method. It minimizes: <strong>Increase in cluster variance</strong>.</p>
          <p className="text-blue-900 font-medium mb-0">Core Idea: Ward method merges clusters causing Minimum information loss. It usually produces Compact clusters, Balanced groups, and Better practical clustering. This is why it is heavily used in practice.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* DISTANCE AND DENDROGRAM & CALCULATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Calculator className="mr-2 text-indigo-600" /> Distance Metrics & Mathematical Calculation
      </h2>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The algorithm needs a way to measure Similarity between points. The most commonly used is <strong>Euclidean Distance</strong>. For Points A(2,3) and B(6,7): <code>d = √(6-2)² + (7-3)² = √32 = 5.65</code>.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
           <h3 className="text-lg font-bold text-slate-800 mb-3">Common Distance Metrics</h3>
           <ul className="list-none pl-4 space-y-1 text-slate-700 font-mono">
             <li>├─ <strong>Euclidean Distance</strong> (Straight-line distance)</li>
             <li>├─ <strong>Manhattan Distance</strong> (Sum of absolute differences)</li>
             <li>├─ <strong>Minkowski Distance</strong> (Generalized form of Euclidean and Manhattan)</li>
             <li>└─ <strong>Cosine Distance</strong> (Based on angle between vectors, highly used for text/documents)</li>
           </ul>
      </div>

      <div className="bg-amber-50/50 border border-amber-200 p-6 rounded-xl my-6 shadow-sm">
        <h4 className="font-bold text-amber-900 mb-3 text-lg flex items-center">
          <Calculator className="w-5 h-5 mr-2" /> Complete Numerical Example (Single Linkage)
        </h4>
        <p className="text-amber-900 mb-4 leading-relaxed">Let's solve a simple agglomerative clustering problem. We have 3 points on a 1D line: <strong>A(0), B(2), and C(6)</strong>.</p>
        
        <div className="bg-white border border-amber-200 p-4 rounded-lg font-mono text-sm text-slate-800 space-y-3 shadow-inner">
          <p><strong>Initial Distances:</strong></p>
          <ul className="list-disc pl-5">
            <li>Dist(A, B) = |2 - 0| = 2</li>
            <li>Dist(B, C) = |6 - 2| = 4</li>
            <li>Dist(A, C) = |6 - 0| = 6</li>
          </ul>
          
          <p className="mt-4 font-bold text-indigo-700">Step 1: First Merge</p>
          <p>A and B are closest (distance 2), so merge them into <strong>Cluster {'{A, B}'}</strong>.</p>
          
          <p className="mt-4 font-bold text-indigo-700">Step 2: Recalculate Distance (Using Single Linkage)</p>
          <p>Compute distance from new {'{A, B}'} to remaining C using Single Linkage (shortest distance from any point in {'{A, B}'} to C).</p>
          <p>Dist({'{A, B}'}, C) = min(Dist(A, C), Dist(B, C)) = min(6, 4) = <strong>4</strong>.</p>
          
          <p className="mt-4 font-bold text-indigo-700">Step 3: Final Merge</p>
          <p>Merge {'{A, B}'} and C together at distance 4 to form the final root cluster <strong>{'{A, B, C}'}</strong>.</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4">
        Dendrogram — The Heart of Hierarchical Clustering
      </h3>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        The most important visualization in Hierarchical Clustering is the <strong>Dendrogram</strong>. A dendrogram is a tree-like diagram showing Cluster merges, Similarity levels, and Hierarchical relationships.
      </p>

      <div className="space-y-8 mb-10">
        <h4 className="font-bold text-slate-800 text-xl mb-4">Building and Reading a Dendrogram, Step-by-Step</h4>
        
        <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
          <div className="flex-1">
            <div className="inline-block bg-slate-100 text-slate-800 text-sm font-bold px-3 py-1 rounded-full mb-3">Step 1</div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Base Elements (Height = 0)</h4>
            <p className="text-lg text-slate-700 leading-relaxed">
              Before merging, every individual data point is placed along the structural baseline. The <strong>Y-axis</strong> of a dendrogram represents <strong>Distance (or Height)</strong>. At distance 0, none of the points are grouped.
            </p>
          </div>
          <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
            <svg viewBox="0 0 300 200" className="w-full max-w-3xl drop-shadow-sm">
              <text x="40" y="15" fontSize="12" fill="#64748b" fontWeight="bold" textAnchor="middle" transform="rotate(-90 40 15) translate(-75, 20)">Height (Distance)</text>
              
              {/* Y Axis */}
              <line x1="50" y1="20" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              
              <text x="40" y="150" fontSize="12" fill="#64748b" textAnchor="end">0.0</text>
              <line x1="45" y1="146" x2="50" y2="146" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="50" y1="146" x2="280" y2="146" stroke="#cbd5e1" strokeWidth="2" />

              {/* Just the points at 0 level */}
              <circle cx="100" cy="146" r="4" fill="#334155" />
              <circle cx="160" cy="146" r="4" fill="#334155" />
              <circle cx="210" cy="146" r="4" fill="#334155" />
              <circle cx="270" cy="146" r="4" fill="#334155" />

              {/* Leaf labels */}
              <text x="100" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">A</text>
              <text x="160" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">B</text>
              <text x="210" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">C</text>
              <text x="270" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">D</text>
            </svg>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
          <div className="flex-1">
            <div className="inline-block bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full mb-3">Step 2</div>
            <h4 className="text-xl font-bold text-indigo-900 mb-2">First Merge: Highly Similar</h4>
            <p className="text-lg text-slate-700 leading-relaxed">
              The algorithm discovers that <strong>A and B</strong> are very close. Their distance is computed as <strong>2.0</strong>. An upside-down "U" shape links A and B, peaking exactly at 2.0 on the Y-axis. The lower the connection, the more similar the items.
            </p>
          </div>
          <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
            <svg viewBox="0 0 300 200" className="w-full max-w-3xl drop-shadow-sm">
              <text x="40" y="15" fontSize="12" fill="#64748b" fontWeight="bold" textAnchor="middle" transform="rotate(-90 40 15) translate(-75, 20)">Height (Distance)</text>
              
              {/* Y Axis */}
              <line x1="50" y1="20" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              
              <text x="40" y="90" fontSize="12" fill="#4f46e5" fontWeight="bold" textAnchor="end">2.0</text>
              <line x1="45" y1="86" x2="50" y2="86" stroke="#4f46e5" strokeWidth="2" />

              <text x="40" y="150" fontSize="12" fill="#64748b" textAnchor="end">0.0</text>
              <line x1="45" y1="146" x2="50" y2="146" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="50" y1="146" x2="280" y2="146" stroke="#cbd5e1" strokeWidth="2" />

              {/* A and B merge at 2.0 (y=86) */}
              <path d="M 100 146 L 100 86 L 160 86 L 160 146" fill="none" stroke="#4f46e5" strokeWidth="3" />
              <circle cx="130" cy="86" r="4" fill="#4f46e5" />
              
              <circle cx="210" cy="146" r="4" fill="#334155" />
              <circle cx="270" cy="146" r="4" fill="#334155" />

              {/* Leaf labels */}
              <text x="100" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">A</text>
              <text x="160" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">B</text>
              <text x="210" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">C</text>
              <text x="270" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">D</text>
            </svg>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
          <div className="flex-1">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full mb-3">Step 3</div>
            <h4 className="text-xl font-bold text-emerald-900 mb-2">Second Merge: Another Local Group</h4>
            <p className="text-lg text-slate-700 leading-relaxed">
              Next, the algorithm processes points <strong>C and D</strong>. They are slightly further apart from each other than A and B were, with a distance of <strong>2.5</strong>. A green link bridges C and D at 2.5.
            </p>
          </div>
          <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
            <svg viewBox="0 0 300 200" className="w-full max-w-3xl drop-shadow-sm">
              <text x="40" y="15" fontSize="12" fill="#64748b" fontWeight="bold" textAnchor="middle" transform="rotate(-90 40 15) translate(-75, 20)">Height (Distance)</text>
              
              {/* Y Axis */}
              <line x1="50" y1="20" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              
              <text x="40" y="70" fontSize="12" fill="#10b981" fontWeight="bold" textAnchor="end">2.5</text>
              <line x1="45" y1="66" x2="50" y2="66" stroke="#10b981" strokeWidth="2" />

              <text x="40" y="90" fontSize="12" fill="#64748b" textAnchor="end">2.0</text>
              <line x1="45" y1="86" x2="50" y2="86" stroke="#cbd5e1" strokeWidth="2" />

              <text x="40" y="150" fontSize="12" fill="#64748b" textAnchor="end">0.0</text>
              <line x1="45" y1="146" x2="50" y2="146" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="50" y1="146" x2="280" y2="146" stroke="#cbd5e1" strokeWidth="2" />

              {/* A and B merge at 2.0 (y=86) */}
              <path d="M 100 146 L 100 86 L 160 86 L 160 146" fill="none" stroke="#4f46e5" strokeWidth="3" opacity="0.5" />
              <circle cx="130" cy="86" r="4" fill="#4f46e5" opacity="0.5" />
              
              {/* C and D merge at 2.5 (y=66) */}
              <path d="M 210 146 L 210 66 L 270 66 L 270 146" fill="none" stroke="#10b981" strokeWidth="3" />
              <circle cx="240" cy="66" r="4" fill="#10b981" />

              {/* Leaf labels */}
              <text x="100" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">A</text>
              <text x="160" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">B</text>
              <text x="210" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">C</text>
              <text x="270" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">D</text>
            </svg>
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col gap-6">
          <div className="flex-1">
            <div className="inline-block bg-slate-800 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">Step 4</div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Final Merge: Uniting Clusters</h4>
            <p className="text-lg text-slate-700 leading-relaxed">
              Lastly, interpreting the distance between cluster <strong>AB</strong> and cluster <strong>CD</strong>, the algorithm finds they are quite dissimilar. They finally merge at a height of <strong>4.0</strong>, enclosing all points into a single root.
            </p>
          </div>
          <div className="w-full flex justify-center bg-slate-50 p-10 rounded-lg border border-slate-200">
            <svg viewBox="0 0 300 200" className="w-full max-w-3xl drop-shadow-sm">
              <text x="40" y="15" fontSize="12" fill="#64748b" fontWeight="bold" textAnchor="middle" transform="rotate(-90 40 15) translate(-75, 20)">Height (Distance)</text>
              
              {/* Y Axis */}
              <line x1="50" y1="20" x2="50" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              
              <text x="40" y="30" fontSize="12" fill="#334155" fontWeight="bold" textAnchor="end">4.0</text>
              <line x1="45" y1="26" x2="50" y2="26" stroke="#334155" strokeWidth="2" />
              
              <text x="40" y="70" fontSize="12" fill="#64748b" textAnchor="end">2.5</text>
              <line x1="45" y1="66" x2="50" y2="66" stroke="#cbd5e1" strokeWidth="2" />
              
              <text x="40" y="90" fontSize="12" fill="#64748b" textAnchor="end">2.0</text>
              <line x1="45" y1="86" x2="50" y2="86" stroke="#cbd5e1" strokeWidth="2" />

              <text x="40" y="150" fontSize="12" fill="#64748b" textAnchor="end">0.0</text>
              <line x1="45" y1="146" x2="50" y2="146" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="50" y1="146" x2="280" y2="146" stroke="#cbd5e1" strokeWidth="2" />

              {/* A and B merge at 2.0 (y=86) */}
              <path d="M 100 146 L 100 86 L 160 86 L 160 146" fill="none" stroke="#4f46e5" strokeWidth="3" opacity="0.6"/>
              
              {/* C and D merge at 2.5 (y=66) */}
              <path d="M 210 146 L 210 66 L 270 66 L 270 146" fill="none" stroke="#10b981" strokeWidth="3" opacity="0.6" />

              {/* AB and CD merge at 4.0 (y=26) */}
              <path d="M 130 86 L 130 26 L 240 26 L 240 66" fill="none" stroke="#334155" strokeWidth="3" />
              <circle cx="185" cy="26" r="5" fill="#334155" />
              
              {/* Leaf labels */}
              <text x="100" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">A</text>
              <text x="160" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">B</text>
              <text x="210" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">C</text>
              <text x="270" y="165" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">D</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 text-lg">
        <p className="text-amber-900 font-bold mb-2">Choosing Number of Clusters Using Dendrogram</p>
        <p className="text-amber-900 mb-0">Unlike K-Means, we don't need to guess K. We can draw a horizontal line (cut the dendrogram) later. If we cut it at height 3.0 in the example above, we obtain 2 clusters: Cluster 1 (A,B) and Cluster 2 (C,D).</p>
      </div>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        <strong>Time Complexity:</strong> Hierarchical Clustering is computationally expensive. Typical complexity is O(n²) or higher. K-Means updates centroids efficiently, whereas Hierarchical repeatedly computes pairwise distances, making it much slower for huge datasets.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* PYTHON COMPUTATION */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2 flex items-center">
        <Code className="mr-2 text-indigo-600" /> Implementing Hierarchical Clustering in Python
      </h2>

      <div className="bg-white border text-left rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center">
             <Code className="text-indigo-600 mr-2" />
             <h4 className="font-bold text-indigo-800 text-xl">Dendrogram and Scikit-Learn</h4>
          </div>
        </div>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm sm:text-base leading-relaxed p-6 overflow-x-auto">
          <pre className="!m-0">
<code>{`# Step 1 — Import Libraries
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.datasets import make_blobs
from sklearn.cluster import AgglomerativeClustering

# Step 2 — Create Dataset
X, y = make_blobs(n_samples=100, centers=3, random_state=42)

# ==========================================
# APPROACH 1: Plotting the Dendrogram (Scipy)
# ==========================================
# Generate Linkage Matrix
linked = linkage(X, method='ward')

plt.figure(figsize=(10,6))
dendrogram(linked)
plt.title("Dendrogram using Ward Linkage")
plt.show()

# ==========================================
# APPROACH 2: Training the Model (Sklearn)
# ==========================================
# Once we decide K=3 from the dendrogram, we fit the model
model = AgglomerativeClustering(n_clusters=3, linkage='ward')
labels = model.fit_predict(X)

# Visualizing Clusters
plt.scatter(X[:,0], X[:,1], c=labels, cmap='viridis')
plt.title("Hierarchical Clustering Output")
plt.show()`}</code>
          </pre>
        </div>
        <div className="p-6 bg-slate-50 text-slate-700 border-b border-slate-200 text-lg">
          <p className="mb-0"><strong>Understanding the Code:</strong> We use <code>scipy.cluster.hierarchy.linkage</code> to compute the distances and plot the dendrogram visually. Once we examine the tree and select K visually, we use <code>sklearn.cluster.AgglomerativeClustering</code> to build the final model and assign labels to the original points.</p>
        </div>

        {/* VISUAL OUTPUT */}
        <div className="bg-slate-100 p-6 md:p-8 border-t border-slate-200">
          <h4 className="font-bold text-slate-800 text-xl mb-6 flex items-center">
            <TrendingUp className="mr-2 text-indigo-600" />
            Expected Output Visualizations
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dendrogram Output */}
            <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-6 flex flex-col items-center">
              <span className="text-sm font-bold text-slate-700 mb-6 font-mono text-center">Figure 1: Dendrogram using Ward Linkage</span>
              <div className="w-full flex justify-center pb-4">
                <svg viewBox="0 0 200 150" className="w-full max-w-sm">
                  {/* Axis */}
                  <line x1="20" y1="10" x2="20" y2="130" stroke="#94a3b8" strokeWidth="1" />
                  <text x="15" y="15" fontSize="8" fill="#94a3b8" textAnchor="end">30</text>
                  <text x="15" y="70" fontSize="8" fill="#94a3b8" textAnchor="end">15</text>
                  <text x="15" y="125" fontSize="8" fill="#94a3b8" textAnchor="end">0</text>
                  
                  {/* Dendrogram lines */}
                  {/* Green Branch */}
                  <path d="M 40 130 L 40 100 L 60 100 L 60 130" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <path d="M 70 130 L 70 110 L 80 110 L 80 130" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <path d="M 50 100 L 50 70 L 75 70 L 75 110" fill="none" stroke="#22c55e" strokeWidth="2" />
                  
                  <path d="M 60 70 L 60 40 L 150 40 L 150 70" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* Blue Branch */}
                  <path d="M 150 70 L 150 10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* Orange Branch */}
                  <path d="M 120 130 L 120 100 L 140 100 L 140 130" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <path d="M 130 100 L 130 70" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* Purple Branch */}
                  <path d="M 160 130 L 160 90 L 180 90 L 180 130" fill="none" stroke="#a855f7" strokeWidth="2" />
                  <path d="M 170 90 L 170 70 L 130 70" fill="none" stroke="#3b82f6" strokeWidth="2" />

                  {/* Top connector */}
                  <path d="M 60 40 L 60 10 L 150 10" fill="none" stroke="#3b82f6" strokeWidth="2" />

                  
                  <text x="100" y="145" fontSize="8" fill="#64748b" textAnchor="middle" fontStyle="italic">Data Points Index</text>
                </svg>
              </div>
              <div className="w-full mt-4 bg-indigo-50 border border-indigo-100 p-3 rounded text-sm text-slate-700">
                <strong>Output Interpretation:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><strong>Lower branches:</strong> Highly similar points (e.g., green/purple/orange merges)</li>
                  <li><strong>Higher branches:</strong> Less similar clusters (e.g., top blue merges)</li>
                </ul>
              </div>
            </div>

            {/* Scatter Output */}
            <div className="bg-white border border-slate-300 shadow-sm rounded-xl p-6 flex flex-col items-center">
              <span className="text-sm font-bold text-slate-700 mb-6 font-mono text-center">Figure 2: Hierarchical Clustering Output</span>
              <div className="w-full flex justify-center pb-4">
                <svg viewBox="0 0 200 150" className="w-full max-w-sm">
                  {/* Axis */}
                  <line x1="20" y1="130" x2="180" y2="130" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="20" y1="130" x2="20" y2="20" stroke="#cbd5e1" strokeWidth="1" />
                  
                  {/* Cluster 1 (Green) */}
                  <circle cx="50" cy="90" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="55" cy="80" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="45" cy="95" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="65" cy="92" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="48" cy="80" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="58" cy="82" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="60" cy="100" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="40" cy="85" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="52" cy="70" r="3.5" fill="#22c55e" opacity="0.8" />
                  <circle cx="68" cy="85" r="3.5" fill="#22c55e" opacity="0.8" />
                  
                  {/* Cluster 2 (Purple) */}
                  <circle cx="130" cy="50" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="125" cy="55" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="145" cy="45" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="140" cy="52" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="120" cy="48" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="133" cy="65" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="150" cy="55" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="125" cy="40" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="138" cy="60" r="3.5" fill="#a855f7" opacity="0.8" />
                  <circle cx="115" cy="55" r="3.5" fill="#a855f7" opacity="0.8" />

                  {/* Cluster 3 (Orange) */}
                  <circle cx="100" cy="110" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="95" cy="115" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="115" cy="105" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="110" cy="112" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="90" cy="108" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="103" cy="120" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="120" cy="115" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="95" cy="100" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="108" cy="98" r="3.5" fill="#f59e0b" opacity="0.8" />
                  <circle cx="85" cy="112" r="3.5" fill="#f59e0b" opacity="0.8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* REAL LIFE & ADVANTAGES */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <Target className="mr-2 text-indigo-600" /> Real-Life Scenario — Gene Analysis
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Suppose scientists analyze gene expression data. Genes with similar behavior may belong to Similar biological pathways, Similar diseases, or Similar evolutionary origins.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-8">
        Hierarchical Clustering helps scientists discover <strong>Nested biological relationships</strong> through dendrogram analysis. This became one of the biggest applications of Hierarchical Clustering in bioinformatics.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 text-lg">
        <div>
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
            <Check className="mr-2 w-6 h-6" /> Advantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li>No need to specify K initially! You can cut the Dendrogram at any level.</li>
             <li>Produces detailed hierarchy information and visualization.</li>
             <li>Preserves all distance/similarity relationships between points.</li>
             <li>Works exceptionally well for finding nested relationships in scientific data.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
            <CloseIcon className="mr-2 w-6 h-6" /> Disadvantages
          </h3>
          <ul className="list-disc pl-5 space-y-3 text-slate-700">
             <li>High computational cost (O(n²) or worse) - Very slow for large datasets.</li>
             <li>Once a merge occurs, it cannot be undone or re-evaluated.</li>
             <li>Sensitive to outliers (especially with Single or Complete linkage).</li>
             <li>Sensitive to the choice of distance matrix and linkage criteria.</li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-8 mb-4 flex items-center">
        <GitMerge className="mr-2" /> Hierarchical Clustering vs K-Means
      </h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm mb-10">
        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-800">Feature</th>
              <th className="p-4 font-bold text-indigo-800">Hierarchical</th>
              <th className="p-4 font-bold text-emerald-800">K-Means</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Need K Initially</td><td className="p-4 font-bold text-indigo-700">No</td><td className="p-4 text-emerald-600">Yes</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Visualization</td><td className="p-4 font-bold text-indigo-700">Dendrogram</td><td className="p-4 text-emerald-600">None inherent</td></tr>
             <tr className="border-b border-slate-100"><td className="p-4 font-medium">Speed / Scalability</td><td className="p-4 text-rose-600">Slower / Lower</td><td className="p-4 text-emerald-600">Faster / Higher</td></tr>
             <tr><td className="p-4 font-medium">Cluster Shape</td><td className="p-4 text-indigo-700">Flexible</td><td className="p-4 text-emerald-600">Mostly spherical</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-indigo-800 mt-10 mb-4 flex items-center">
        <Target className="mr-2" /> Applications of Hierarchical Clustering
      </h3>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
        <ul className="list-none pl-4 space-y-1 text-slate-700 font-mono">
          <li><strong>APPLICATIONS</strong></li>
          <li>│</li>
          <li>├── Bioinformatics</li>
          <li>├── DNA Analysis</li>
          <li>├── Gene Expression</li>
          <li>├── Document Clustering</li>
          <li>├── Customer Segmentation</li>
          <li>├── Medical Research</li>
          <li>├── Social Network Analysis</li>
          <li>├── Image Segmentation</li>
          <li>└── Recommendation Systems</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Hierarchical Clustering is an interpretable clustering algorithm in Machine Learning. It works by Measuring similarities, Merging or splitting clusters, Building hierarchical structures, and Visualizing relationships using dendrograms.
      </p>
      
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Unlike K-Means, it does not require predefined cluster counts and provides rich hierarchical insights into the data structure. It is an industry standard across bioinformatics, gene expression, and taxonomy applications.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "Clusters are formed gradually through hierarchical relationships between similar data points. Hierarchical Clustering reveals the actual evolutionary relationships *between* clusters, not just final, rigid cluster assignments. This makes it extremely mathematically elegant and practically valuable in scientific analysis."
         </p>
      </div>

    </>
  );
}
