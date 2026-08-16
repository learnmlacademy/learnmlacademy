import React from "react";
import { Code, Eye, Layers, RefreshCw, Target } from "lucide-react";

export function AssociationRulesContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Association Rule Learning in Data Mining</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Association Rule Learning is a descriptive pattern-mining technique used to discover items or events that tend to occur together in transactional data.
          It is commonly treated as an <strong>unsupervised learning</strong> technique because there is no target label to predict.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Association Rules in Simple Words</p>
          <p className="text-slate-800 leading-relaxed">
            Look through many transactions, find item combinations that occur often, and express useful co-occurrence patterns as rules such as <span className="font-mono font-bold">Diapers → Beer</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10">
          {[
            ["1", "Transactions", "See what appears together"],
            ["2", "Frequent Itemsets", "Keep recurring combinations"],
            ["3", "Generate Rules", "Create X → Y candidates"],
            ["4", "Evaluate", "Check support, confidence & lift"],
          ].map(([step, title, text]) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-3">{step}</div>
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-indigo-800 mb-5">A Tiny Market-Basket Example</h2>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a shop records only five transactions:
        </p>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-7 overflow-x-auto max-w-3xl">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Transaction</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              <tr><td className="px-5 py-3 font-bold">T1</td><td className="px-5 py-3">Bread, Butter, Milk</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-3 font-bold">T2</td><td className="px-5 py-3">Bread, Diapers, Beer</td></tr>
              <tr><td className="px-5 py-3 font-bold">T3</td><td className="px-5 py-3">Milk, Diapers, Beer</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-3 font-bold">T4</td><td className="px-5 py-3">Bread, Butter</td></tr>
              <tr><td className="px-5 py-3 font-bold">T5</td><td className="px-5 py-3">Bread, Milk</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 mb-8 max-w-3xl">
          <p className="font-bold text-emerald-900 mb-2">Pattern visible in this tiny dataset</p>
          <p className="font-mono text-lg text-slate-900 mb-2">Diapers → Beer</p>
          <p className="text-slate-700">
            Both transactions containing diapers also contain beer. That looks interesting—but we still need metrics before deciding how strong or useful the rule is.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-1">Important</p>
          <p className="text-slate-800">
            A rule <span className="font-mono">X → Y</span> means X and Y co-occur in a particular statistical pattern. It does <strong>not</strong> mean X causes Y.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-important">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Eye className="mr-3 text-indigo-600" /> What an Association Rule Means
        </h2>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          The basic form is:
        </p>

        <div className="bg-slate-900 text-white rounded-xl px-6 py-5 mb-7 max-w-xl text-center">
          <p className="font-mono text-2xl font-bold">X → Y</p>
          <p className="text-slate-300 mt-2 text-sm">Antecedent → Consequent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
            <p className="font-bold text-slate-900 text-lg mb-2">Antecedent (X)</p>
            <p className="text-slate-700 mb-2">The left-hand side—the itemset we condition on.</p>
            <p className="font-mono text-indigo-700">{`{Diapers}`}</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
            <p className="font-bold text-slate-900 text-lg mb-2">Consequent (Y)</p>
            <p className="text-slate-700 mb-2">The right-hand side—the itemset whose co-occurrence we examine.</p>
            <p className="font-mono text-emerald-700">{`{Beer}`}</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          In a standard association rule, the antecedent and consequent are <strong>disjoint itemsets</strong>: the same item is not placed on both sides of the rule.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Association Rules vs Prediction</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Technique</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Main Question</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Typical Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              <tr><td className="px-5 py-4 font-semibold">Classification</td><td className="px-5 py-4">Which class should this example get?</td><td className="px-5 py-4">Class label / probability</td></tr>
              <tr className="bg-slate-50"><td className="px-5 py-4 font-semibold">Clustering</td><td className="px-5 py-4">Which examples look similar?</td><td className="px-5 py-4">Clusters</td></tr>
              <tr><td className="px-5 py-4 font-semibold text-indigo-700">Association rules</td><td className="px-5 py-4">Which items tend to occur together?</td><td className="px-5 py-4 font-mono">X → Y rules</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="important-metrics">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Support, Confidence and Lift
        </h2>

        <p className="text-lg leading-relaxed mb-7 text-slate-800">
          These three measures answer different questions. A rule should not be judged from confidence alone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
            <p className="font-bold text-sky-900 mb-2">Support</p>
            <p className="text-sm text-slate-700">How common is X and Y together?</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-bold text-emerald-900 mb-2">Confidence</p>
            <p className="text-sm text-slate-700">When X occurs, how often does Y occur?</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold text-amber-900 mb-2">Lift</p>
            <p className="text-sm text-slate-700">Is Y more common with X than its normal baseline?</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Support</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Support measures how frequently an itemset occurs. When we write the support of a rule <span className="font-mono">X → Y</span>, we mean the support of the combined itemset <span className="font-mono">X ∪ Y</span>.
        </p>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 text-lg mb-2">Using Diapers → Beer</p>
          <p className="font-mono text-slate-800 mb-3">Support = Transactions containing Diapers and Beer / Total transactions</p>
          <p className="text-slate-800 mb-1"><strong>Step 1:</strong> Both appear together in T2 and T3 → 2 transactions.</p>
          <p className="text-slate-800 mb-1"><strong>Step 2:</strong> Total transactions = 5.</p>
          <p className="font-mono font-bold text-slate-900 mt-2">Support = 2 / 5 = 0.40 = 40%</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Confidence</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Confidence is the conditional frequency of the consequent among transactions containing the antecedent.
        </p>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Confidence of Diapers → Beer</p>
          <p className="font-mono text-slate-800 mb-3">Confidence = Support(Diapers ∪ Beer) / Support(Diapers)</p>
          <p className="text-slate-800 mb-1"><strong>Step 1:</strong> Diapers appear in T2 and T3 → 2/5 = 0.40.</p>
          <p className="text-slate-800 mb-1"><strong>Step 2:</strong> Diapers and Beer together → 2/5 = 0.40.</p>
          <p className="font-mono font-bold text-slate-900 mt-2">Confidence = 0.40 / 0.40 = 1.00 = 100%</p>
          <p className="text-sm text-slate-700 mt-2">In this tiny dataset, every transaction containing diapers also contains beer.</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-slate-900 mb-2">Direction matters for confidence</p>
          <p className="text-slate-700">
            <span className="font-mono">Confidence(X → Y)</span> can be different from <span className="font-mono">Confidence(Y → X)</span>. The rule direction should therefore not be casually reversed.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Lift</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Confidence can look impressive simply because Y is common. Lift compares the rule confidence with the baseline support of Y.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Lift of Diapers → Beer</p>
          <p className="font-mono text-slate-800 mb-3">Lift = Confidence(Diapers → Beer) / Support(Beer)</p>
          <p className="text-slate-800 mb-1"><strong>Step 1:</strong> Confidence = 1.00.</p>
          <p className="text-slate-800 mb-1"><strong>Step 2:</strong> Beer appears in T2 and T3 → Support(Beer) = 2/5 = 0.40.</p>
          <p className="font-mono font-bold text-slate-900 mt-2">Lift = 1.00 / 0.40 = 2.50</p>
          <p className="text-sm text-slate-700 mt-2">Beer occurs 2.5 times as often among diaper transactions as its baseline rate in this toy dataset.</p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">How to read lift</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-9">
          <div className="rounded-xl border border-slate-200 p-4 bg-white"><p className="font-bold">Lift = 1</p><p className="text-sm text-slate-600">Occurrence is consistent with independence.</p></div>
          <div className="rounded-xl border border-emerald-200 p-4 bg-emerald-50"><p className="font-bold text-emerald-900">Lift &gt; 1</p><p className="text-sm text-slate-700">Positive association.</p></div>
          <div className="rounded-xl border border-rose-200 p-4 bg-rose-50"><p className="font-bold text-rose-900">Lift &lt; 1</p><p className="text-sm text-slate-700">Negative association.</p></div>
        </div>

        <div className="pl-4 border-l-4 border-violet-400 bg-violet-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-violet-900 mb-2">Why confidence alone can mislead</p>
          <p className="text-slate-800">
            If 90% of all transactions already contain Y and a rule has 90% confidence, then <span className="font-mono">Lift = 0.90 / 0.90 = 1</span>. The rule gives no improvement over Y&apos;s baseline frequency.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Going Deeper: Other Rule Metrics</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Support, confidence and lift are the best starting point. Libraries may also report metrics such as <strong>leverage</strong>, <strong>conviction</strong>, Jaccard similarity and Zhang&apos;s metric. These provide different views of association strength and should be interpreted according to the analysis goal.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="workflow-and-algorithms">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <RefreshCw className="mr-3 text-indigo-600" /> From Transactions to Rules
        </h2>

        <div className="font-mono text-slate-900 bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre overflow-x-auto max-w-2xl mb-8">
{`Transactions
    ↓
Encode item presence
    ↓
Find frequent itemsets
    ↓
Generate X → Y rules
    ↓
Calculate support / confidence / lift
    ↓
Filter + interpret useful rules`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Frequent Itemsets Come First</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Association-rule workflows commonly first find <strong>frequent itemsets</strong>: combinations whose support meets a chosen threshold. Rules are then generated from those itemsets. This distinction matters because Apriori and FP-Growth primarily mine frequent itemsets; a rule-generation step evaluates possible antecedent/consequent splits afterwards.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Popular Frequent-Itemset Algorithms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-9">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="font-bold text-indigo-900 text-lg mb-2">Apriori</p>
            <p className="text-sm text-slate-700">Uses the downward-closure property to prune candidate itemsets. Easy to teach, but candidate generation can become expensive.</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-bold text-emerald-900 text-lg mb-2">FP-Growth</p>
            <p className="text-sm text-slate-700">Uses an FP-tree representation and avoids Apriori-style candidate generation.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold text-amber-900 text-lg mb-2">ECLAT</p>
            <p className="text-sm text-slate-700">Uses a vertical transaction representation and itemset intersections.</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The next lesson goes deeper into <a href="/learn/apriori" className="text-indigo-700 font-semibold hover:underline">Apriori</a> and its pruning logic.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="types-of-rules">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Going Deeper: Extensions of Basic Association Rules
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The classic market-basket case uses Boolean item presence. Association analysis can also be extended to richer data.
        </p>

        <div className="space-y-5 mb-8">
          <div className="rounded-xl border border-slate-200 p-5 bg-white">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Generalized / Multilevel Rules</h3>
            <p className="text-slate-700">Use category hierarchies, for example <span className="font-mono">Dairy → Bread</span> rather than only individual products such as Milk.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Quantitative / Interval Rules</h3>
            <p className="text-slate-700">Include numerical ranges, for example <span className="font-mono">Age 25–34 → Product A</span>. Numeric values generally need meaningful discretization or specialized methods.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Multidimensional / Relational Extensions</h3>
            <p className="text-slate-700">Can involve multiple attributes or relationships rather than only items from one simple basket. Interpretation and rule-count control become especially important.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Applications & Python Implementation
        </h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Where Association Rules Can Help</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-9">
          <div className="rounded-xl border border-slate-200 p-5 bg-white"><p className="font-bold mb-1">Market Basket Analysis</p><p className="text-sm text-slate-700">Find products that co-occur and generate merchandising hypotheses.</p></div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white"><p className="font-bold mb-1">Recommendation Candidates</p><p className="text-sm text-slate-700">Rules can supply interpretable “often bought together” candidates, although modern recommendation systems may use many additional models.</p></div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white"><p className="font-bold mb-1">Web / Event Sequences</p><p className="text-sm text-slate-700">Explore pages, actions or events that frequently co-occur.</p></div>
          <div className="rounded-xl border border-slate-200 p-5 bg-white"><p className="font-bold mb-1">Exploratory Risk Analysis</p><p className="text-sm text-slate-700">Surface recurring combinations for investigation, but a discovered association is not itself proof of fraud, disease or causality.</p></div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Python with mlxtend</h3>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          The example below uses an already one-hot encoded Boolean transaction table. <code>apriori</code> finds frequent itemsets, and <code>association_rules</code> generates rules from them.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: Frequent Itemsets → Association Rules</h4>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# pip install mlxtend pandas
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# Each row is one transaction.
df = pd.DataFrame([
    {'Bread': True,  'Milk': True,  'Diapers': False, 'Beer': False},
    {'Bread': True,  'Milk': True,  'Diapers': False, 'Beer': False},
    {'Bread': True,  'Milk': False, 'Diapers': False, 'Beer': False},
    {'Bread': False, 'Milk': True,  'Diapers': False, 'Beer': False},
    {'Bread': False, 'Milk': False, 'Diapers': True,  'Beer': True},
    {'Bread': False, 'Milk': False, 'Diapers': True,  'Beer': True},
    {'Bread': False, 'Milk': False, 'Diapers': True,  'Beer': True},
    {'Bread': False, 'Milk': False, 'Diapers': True,  'Beer': False},
])

# 1) Find itemsets appearing in at least 25% of transactions.
frequent = apriori(
    df,
    min_support=0.25,
    use_colnames=True
)

# 2) Generate rules with confidence >= 60%.
rules = association_rules(
    frequent,
    metric='confidence',
    min_threshold=0.60
)

# 3) Keep the most useful teaching columns.
show = rules[
    ['antecedents', 'consequents', 'support', 'confidence', 'lift']
].copy()

show['antecedents'] = show['antecedents'].apply(
    lambda items: ', '.join(sorted(items))
)
show['consequents'] = show['consequents'].apply(
    lambda items: ', '.join(sorted(items))
)

show = show.sort_values(
    ['lift', 'confidence', 'antecedents'],
    ascending=[False, False, True]
)

print(show.round(3).to_string(index=False))`}</code></pre>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 overflow-x-auto">
          <p className="font-bold text-slate-900 mb-3">Expected result for this toy dataset</p>
<pre className="font-mono text-sm text-slate-800 leading-relaxed">{`antecedents consequents  support  confidence  lift
       Beer     Diapers    0.375       1.000 2.000
    Diapers        Beer    0.375       0.750 2.000
      Bread        Milk    0.250       0.667 1.778
       Milk       Bread    0.250       0.667 1.778`}</pre>
        </div>

        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          Notice that <span className="font-mono">Beer → Diapers</span> and <span className="font-mono">Diapers → Beer</span> have the same lift in this dataset, but different confidence values. This is a useful reminder that rule direction matters for confidence.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 mb-2">Library note</p>
          <p className="text-slate-700">
            <code>mlxtend.frequent_patterns.apriori</code> expects a one-hot encoded DataFrame and returns frequent itemsets with support values. <code>association_rules</code> then computes rule metrics such as support, confidence and lift from those itemsets.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Advantages, Limitations & Common Mistakes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Interpretable:</strong> Rules are usually easy to explain to non-technical stakeholders.</li>
              <li><strong>Target-free exploration:</strong> Useful when the goal is to discover co-occurrence patterns rather than predict a predefined label.</li>
              <li><strong>Actionable hypotheses:</strong> Can suggest combinations worth testing in merchandising, navigation or recommendation workflows.</li>
              <li><strong>Multiple mining algorithms:</strong> Apriori, FP-Growth and other approaches provide different computational trade-offs.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Limitations</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Rule explosion:</strong> Low thresholds can produce a huge number of candidate patterns.</li>
              <li><strong>Spurious associations:</strong> Co-occurrence may arise from chance, seasonality, confounding or a common external cause.</li>
              <li><strong>Threshold sensitivity:</strong> Support/confidence choices can hide useful rare patterns or admit too many weak rules.</li>
              <li><strong>Computation:</strong> Frequent-itemset mining can become expensive when there are many distinct items or dense transactions.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Common Mistakes</h3>
        <div className="space-y-3 mb-9">
          {[
            ["Confidence = causation", "A high-confidence rule still describes association, not cause and effect."],
            ["Ignoring the baseline", "A high confidence can be uninteresting if the consequent is already extremely common; check lift."],
            ["Calling Apriori the rule itself", "Apriori mines frequent itemsets; rules are generated and scored from those itemsets."],
            ["Using tiny thresholds blindly", "Lower thresholds can generate an overwhelming number of rules and increase false discoveries."],
            ["Treating every rule as a business action", "Validate patterns using domain knowledge, holdout/time-based checks, experiments or other evidence before acting."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-bold text-slate-900">{title}</p>
              <p className="text-slate-700 text-sm mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="quick-recap">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>

        <div className="space-y-4 mb-8">
          <details className="border border-slate-200 rounded-xl bg-white p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">What does support measure?</summary>
            <p className="text-slate-700 mt-3">How often the combined itemset X ∪ Y occurs in the transaction database.</p>
          </details>
          <details className="border border-slate-200 rounded-xl bg-white p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Why can confidence alone be misleading?</summary>
            <p className="text-slate-700 mt-3">Because the consequent may already be very common. Lift compares the rule&apos;s confidence with that baseline frequency.</p>
          </details>
          <details className="border border-slate-200 rounded-xl bg-white p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Does X → Y mean X causes Y?</summary>
            <p className="text-slate-700 mt-3">No. It describes a co-occurrence relationship in the analyzed data, not a causal mechanism.</p>
          </details>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
          <p className="font-bold text-indigo-900 text-xl mb-2">Most Important Insight</p>
          <p className="text-slate-800 text-lg leading-relaxed">
            A useful association rule is not simply one with a large confidence value. Read <strong>support</strong>, <strong>confidence</strong> and <strong>lift</strong> together, then decide whether the pattern is stable, meaningful and actionable in the real domain.
          </p>
        </div>

        <p className="text-lg text-slate-800 mb-10">
          Next, learn how <a href="/learn/apriori" className="text-indigo-700 font-semibold hover:underline">Apriori</a> efficiently searches for frequent itemsets, or revisit <a href="/learn/unsupervised-learning-intro" className="text-indigo-700 font-semibold hover:underline">Unsupervised Learning</a> for the broader family of target-free methods.
        </p>
      </div>
    </>
  );
}
