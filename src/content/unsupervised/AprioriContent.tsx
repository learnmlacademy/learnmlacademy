import React from 'react';
import { Lightbulb, Code, Layers, Eye, RefreshCw, ShoppingCart, Target } from 'lucide-react';

export function AprioriContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Apriori Algorithm</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The Apriori Algorithm is one of the most important and widely used algorithms in Data Mining and Association Rule Learning. It is specifically designed to discover frequent itemsets, hidden relationships, association rules, and co-occurrence patterns from large transactional datasets.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Main Objective:</p>
          <p className="text-slate-800 italic leading-relaxed">
            Identify items that frequently occur together inside a database.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Apriori is primarily used in Market Basket Analysis, Retail Analytics, Recommendation Systems, Fraud Detection, Inventory Optimization, and Web Usage Mining. The algorithm became extremely famous because of its practical business applications in supermarkets and e-commerce platforms.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          For example, if customers frequently purchase <span className="font-bold">Bread + Butter + Milk</span> together, businesses can place products nearby, create combo offers, improve cross-selling, and build recommendation engines.
        </p>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Real-Life Motivation Behind Apriori</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a supermarket stores millions of purchase transactions.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-8 w-fit">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Items Purchased</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm">
              <tr><td className="px-6 py-4 font-bold">T1</td><td className="px-6 py-4">Bread, Butter, Milk</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold">T2</td><td className="px-6 py-4">Bread, Diapers, Beer</td></tr>
              <tr><td className="px-6 py-4 font-bold">T3</td><td className="px-6 py-4">Milk, Diapers, Beer</td></tr>
              <tr className="bg-slate-50"><td className="px-6 py-4 font-bold">T4</td><td className="px-6 py-4">Bread, Butter</td></tr>
              <tr><td className="px-6 py-4 font-bold">T5</td><td className="px-6 py-4">Bread, Milk</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          A human analyst cannot manually analyze millions of such transactions efficiently. The Apriori Algorithm automatically discovers patterns such as: <span className="font-bold text-indigo-700">Customers buying bread often buy milk.</span> This information becomes extremely valuable for business intelligence.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-important">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Eye className="mr-3 text-indigo-600" /> Why the Apriori Algorithm Is Important
        </h2>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Modern businesses generate massive volumes of transactional data every second. Examples include online purchases, banking transactions, medical records, website clicks, streaming behavior, and mobile app usage.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Inside these datasets, there may exist hidden patterns that humans cannot easily identify. The Apriori Algorithm helps uncover <strong>meaningful hidden relationships between items</strong>. This makes it one of the foundational algorithms in Data Mining.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Core Concept Behind Apriori</h3>
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-6 shadow-md mb-8">
          <p className="text-xl font-bold text-center leading-relaxed">
            "If an itemset is frequent, then all of its subsets must also be frequent."
          </p>
          <p className="text-center text-indigo-100 mt-2">— The Apriori Property (Downward Closure Property)</p>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Understanding the Apriori Property</p>
          <p className="text-slate-800 leading-relaxed mb-2">
            Suppose <span className="font-mono font-bold">{`{Bread, Milk, Butter}`}</span> is a frequent itemset. Then all subsets must also be frequent:
          </p>
          <ul className="list-disc pl-6 text-slate-800 font-mono text-sm space-y-1 mb-2">
            <li>{`{Bread}`}</li>
            <li>{`{Milk}`}</li>
            <li>{`{Butter}`}</li>
            <li>{`{Bread, Milk}`}</li>
            <li>{`{Bread, Butter}`}</li>
            <li>{`{Milk, Butter}`}</li>
          </ul>
          <p className="text-slate-800 italic">If even one subset is infrequent, the larger itemset cannot be frequent. This principle dramatically reduces unnecessary computations.</p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="key-terminologies">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Key Terminologies in Apriori
        </h2>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Before understanding the algorithm deeply, we must understand several important concepts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">What Is an Item?</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-2">
              An item represents a single product or entity. Examples: Bread, Milk, Butter, Laptop, Phone.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">What Is an Itemset?</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-2">
              An itemset is a group of one or more items. Example: <span className="font-mono">{`{Bread, Milk}`}</span>.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-6">Types of Itemsets</h3>
        <ul className="list-disc pl-6 mb-8 text-lg text-slate-800 space-y-2 font-mono">
          <li>1-itemset: {`{Bread}`}</li>
          <li>2-itemset: {`{Bread, Milk}`}</li>
          <li>3-itemset: {`{Bread, Milk, Butter}`}</li>
          <li>k-itemset</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">What Is a Frequent Itemset?</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          A frequent itemset is an itemset that appears sufficiently often in the transaction database. The frequency is determined using <strong>Support</strong>.
        </p>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 text-lg mb-2">Support in Apriori</p>
          <p className="text-slate-800 leading-relaxed mb-2">Support measures how frequently an itemset appears in the dataset.</p>
          <p className="font-mono text-slate-800 mb-2">Support(X) = (Transactions containing X) / (Total Transactions)</p>
          <div className="mt-4 pt-4 border-t border-sky-200">
            <p className="font-mono text-sm text-slate-800 mb-1">Suppose: Total transactions = 10, Transactions containing Bread = 6</p>
            <p className="font-mono text-sm text-slate-800 font-bold mb-2">Support(Bread) = 6 / 10 = 0.6</p>
            <p className="text-slate-800 italic text-sm">Meaning: 60% of transactions contain Bread.</p>
          </div>
        </div>
        
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          <strong>Minimum Support</strong> is a threshold used to filter important itemsets. Example: If Minimum Support = 40%, any itemset appearing less than 40% of the time is discarded.
        </p>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Confidence in Apriori</p>
          <p className="text-slate-800 leading-relaxed mb-2">Confidence measures how reliable an association rule is.</p>
          <p className="font-mono text-slate-800 mb-2">Confidence(X → Y) = Support(X ∪ Y) / Support(X)</p>
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <p className="font-mono text-sm text-slate-800 mb-1">Suppose: Bread appears in 5 transactions, Bread and Milk appear together in 4.</p>
            <p className="font-mono text-sm text-slate-800 font-bold mb-2">Confidence(Bread → Milk) = 4 / 5 = 0.8</p>
            <p className="text-slate-800 italic text-sm">Meaning: 80% of customers buying Bread also buy Milk.</p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Lift in Apriori</p>
          <p className="text-slate-800 leading-relaxed mb-2">Lift measures the strength of association between items.</p>
          <p className="font-mono text-slate-800 mb-2">Lift(X → Y) = Confidence(X → Y) / Support(Y)</p>
          <div className="mt-4 pt-4 border-t border-amber-200">
            <p className="font-mono text-sm text-slate-800 mb-1">Suppose: Confidence = 0.8, Support(Milk) = 0.5</p>
            <p className="font-mono text-sm text-slate-800 font-bold mb-2">Lift = 0.8 / 0.5 = 1.6</p>
            <p className="text-slate-800 italic text-sm">Interpretation: Bread buyers are 1.6 times more likely to buy Milk.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="step-by-step">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <RefreshCw className="mr-3 text-indigo-600" /> Complete Workflow and Step-by-Step Working
        </h2>

        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto w-fit mb-10">
{`TRANSACTION DATABASE
          │
          ▼
Generate 1-Itemsets
          │
          ▼
Apply Minimum Support
          │
          ▼
Generate Candidate 2-Itemsets
          │
          ▼
Prune Infrequent Itemsets
          │
          ▼
Generate Larger Itemsets
          │
          ▼
Generate Association Rules
          │
          ▼
Apply Confidence Threshold
          │
          ▼
Final Strong Rules`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Detailed Working Example</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Using the example transaction dataset (T1: Bread, Milk; T2: Bread, Butter; T3: Milk, Butter; T4: Bread, Milk, Butter; T5: Bread, Milk):
        </p>

        <div className="space-y-6 mb-8">
          <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-3 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-1">Step 1 — Generate Frequent 1-Itemsets</p>
            <p className="text-slate-800 text-sm font-mono">Bread: 4 (Support 0.8), Milk: 4 (Support 0.8), Butter: 3 (Support 0.6).<br/>If min support is 0.5, all three survive.</p>
          </div>
          <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-3 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-1">Step 2 — Generate Candidate 2-Itemsets</p>
            <p className="text-slate-800 text-sm font-mono">Pairs: {`{Bread, Milk}, {Bread, Butter}, {Milk, Butter}`}</p>
          </div>
          <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-3 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-1">Step 3 — Count 2-Itemset Frequencies</p>
            <p className="text-slate-800 text-sm font-mono">{`{Bread, Milk}`}: 3 (0.6), {`{Bread, Butter}`}: 2 (0.4), {`{Milk, Butter}`}: 2 (0.4).<br/>Only {`{Bread, Milk}`} may survive depending on threshold.</p>
          </div>
          <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-3 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-1">Step 4 — Candidate Generation & Pruning</p>
            <p className="text-slate-800 text-sm font-mono">Candidate 3-itemset: {`{Bread, Milk, Butter}`}. Count = 1 (Support = 0.2). Rejected.<br/><span className="italic mt-2 block">(Pruning removes unnecessary itemsets which improves efficiency.)</span></p>
          </div>
          <div className="pl-4 border-l-4 border-slate-300 bg-slate-50 py-3 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-1">Step 5 — Generate Association Rules</p>
            <p className="text-slate-800 text-sm font-mono">Rule: Bread → Milk. Confidence = 3 / 4 = 0.75.<br/>Meaning: 75% of Bread buyers also purchase Milk.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Time Complexity of Apriori</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Apriori can become computationally expensive because candidate itemsets grow exponentially. If there are <em>n</em> items, possible itemsets become <span className="font-mono">2<sup>n</sup> - 1</span>. This is why Apriori becomes slow for very large datasets and may require multiple database scans.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation
        </h2>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: Apriori using mlxtend</h4>
          </div>
          <div className="p-0">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# Step 1 — Install Required Libraries
# pip install mlxtend pandas

# Step 2 — Import Libraries
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# Step 3 — Create Transaction Dataset
data = {
    'Bread': [1,1,0,1,1],
    'Milk': [1,0,1,1,1],
    'Butter': [0,1,1,1,0]
}
df = pd.DataFrame(data)
print(df)
# Output:
#    Bread  Milk  Butter
# 0      1     1       0
# 1      1     0       1
# 2      0     1       1
# 3      1     1       1
# 4      1     1       0

# Step 4 — Generate Frequent Itemsets
frequent_itemsets = apriori(
    df,
    min_support=0.4,
    use_colnames=True
)
print(frequent_itemsets)

# Step 5 — Generate Association Rules
rules = association_rules(
    frequent_itemsets,
    metric="confidence",
    min_threshold=0.7
)
print(rules)`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-summary">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Comparisons, Advantages & Disadvantages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Easy to Understand:</strong> The logic is intuitive and beginner-friendly.</li>
              <li><strong>Strong Mathematical Foundation:</strong> Based on clear support/confidence calculations.</li>
              <li><strong>Good for Small Datasets:</strong> Performs well on moderate databases.</li>
              <li><strong>Highly Interpretable:</strong> Generated rules are easy to explain.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>High Computational Cost:</strong> Large databases generate huge candidate sets.</li>
              <li><strong>Multiple Database Scans:</strong> Algorithm repeatedly scans the dataset.</li>
              <li><strong>Memory Intensive:</strong> Candidate generation consumes lots of memory.</li>
              <li><strong>Poor Scalability:</strong> Not ideal for modern Big Data (FP-growth is preferred).</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Apriori vs FP-Growth</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">Apriori</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-emerald-700">FP-Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Candidate Generation</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Yes</td>
                <td className="px-6 py-4 text-sm text-emerald-700">No</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Speed and Memory</td>
                <td className="px-6 py-4 text-sm text-amber-600">Slower / Higher Memory</td>
                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Faster / Lower Memory</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Database Scans</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Multiple</td>
                <td className="px-6 py-4 text-sm text-emerald-700">Fewer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        The Apriori Algorithm is a foundational Data Mining and Association Rule Learning algorithm used to discover frequent itemsets and hidden relationships inside transactional datasets.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The algorithm works by generating candidate itemsets, calculating support, pruning infrequent itemsets against the Apriori property (downward closure), and measuring confidence and lift to build robust rules. It is widely applied in retail analytics, market basket analysis, and recommendation systems to automatically infer customer behavior.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Association does NOT imply causation. If you mine the rule <span className="font-bold">Bread → Milk</span>, it does NOT mean bread causes milk purchases. It only means they frequently occur together organically, offering a strong statistical correlation that can be harnessed for business intelligence—but not for proving causal mechanics.
        </p>
      </div>
    </>
  );
}
