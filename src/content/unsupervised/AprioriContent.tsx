import React from 'react';
import { Lightbulb, Code, Layers, Eye, RefreshCw, ShoppingCart, Target } from 'lucide-react';

export function AprioriContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Apriori Algorithm</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Apriori is a classic algorithm for <strong>frequent itemset mining</strong>. It looks through transaction-style data and finds groups of items that occur together often enough to pass a minimum-support threshold.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Apriori in one sentence</p>
          <p className="text-slate-800 italic leading-relaxed">
            Keep frequent combinations, discard infrequent combinations, and use that pruning to avoid checking many impossible larger combinations.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-indigo-600" /> Apriori in Simple Words
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          {[
            ['1', 'Read Baskets', 'See which items appear in each transaction.'],
            ['2', 'Count', 'Measure support for candidate itemsets.'],
            ['3', 'Prune', 'Remove itemsets below minimum support.'],
            ['4', 'Grow', 'Use surviving itemsets to build larger candidates.'],
          ].map(([step, title, text]) => (
            <div key={step} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center">
              <div className="w-9 h-9 mx-auto mb-3 rounded-full bg-indigo-100 text-indigo-800 font-extrabold flex items-center justify-center">{step}</div>
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center mb-4">
            <ShoppingCart className="mr-3 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900">Tiny supermarket example</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">Transaction</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-sm">
                <tr><td className="px-4 py-3 font-bold">T1</td><td className="px-4 py-3">Bread, Milk</td></tr>
                <tr><td className="px-4 py-3 font-bold">T2</td><td className="px-4 py-3">Bread, Butter</td></tr>
                <tr><td className="px-4 py-3 font-bold">T3</td><td className="px-4 py-3">Milk, Butter</td></tr>
                <tr><td className="px-4 py-3 font-bold">T4</td><td className="px-4 py-3">Bread, Milk, Butter</td></tr>
                <tr><td className="px-4 py-3 font-bold">T5</td><td className="px-4 py-3">Bread, Milk</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 mt-4">
            Suppose minimum support is <strong>50%</strong>. Apriori asks: which single items are frequent, which pairs are frequent, and can any larger combination still be frequent?
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Frequent itemsets can later be used to create association rules for market-basket analysis, cross-selling ideas, web-usage patterns, and other co-occurrence analysis. Apriori itself is mainly the <strong>frequent-itemset mining stage</strong>; confidence and lift are used when evaluating rules generated from those itemsets.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-important">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Eye className="mr-3 text-indigo-600" /> The Apriori Property: Why Pruning Works
        </h2>

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-6 shadow-md mb-8">
          <p className="text-xl font-bold text-center leading-relaxed">
            If an itemset is frequent, every subset of that itemset must also be frequent.
          </p>
          <p className="text-center text-indigo-100 mt-2">The downward-closure / Apriori property</p>
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The most useful way to apply this idea is its pruning form:
        </p>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 mb-8 text-center">
          <p className="font-mono text-slate-800 mb-3">If {`{Bread, Butter}`} is infrequent...</p>
          <div className="text-2xl font-bold text-rose-700 mb-3">↓</div>
          <p className="font-mono font-bold text-slate-900">{`{Bread, Milk, Butter}`} cannot be frequent.</p>
          <p className="text-sm text-slate-700 mt-3">So Apriori can prune the larger candidate instead of wasting work counting it.</p>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Why is the property true?</p>
          <p className="text-slate-800 leading-relaxed">
            Every transaction that contains <span className="font-mono font-bold">{`{Bread, Milk, Butter}`}</span> must also contain <span className="font-mono font-bold">{`{Bread, Butter}`}</span>. Therefore, a larger itemset can never occur more often than one of its subsets.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="key-terminologies">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Key Terminologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Item</h3>
            <p className="text-slate-700">One entity, such as Bread, Milk, Butter, a webpage, or a product ID.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Itemset</h3>
            <p className="text-slate-700">A set of one or more items, such as <span className="font-mono">{`{Bread, Milk}`}</span>.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Frequent Itemset</h3>
            <p className="text-slate-700">An itemset whose support is at least the chosen minimum-support threshold.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Candidate Itemset</h3>
            <p className="text-slate-700">A combination Apriori considers before deciding whether it is frequent.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Support</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Support tells us what fraction of transactions contain an itemset.
        </p>
        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-slate-800 mb-3">Support(X) = Transactions containing X / Total transactions</p>
          <p className="font-bold text-sky-900 mb-2">Worked example: {`{Bread, Milk}`}</p>
          <p className="text-slate-800 mb-1">It appears in T1, T4 and T5 → <strong>3 transactions</strong>.</p>
          <p className="font-mono text-slate-800">Support = 3 / 5 = 0.60 = <strong>60%</strong></p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Minimum Support</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Minimum support is the threshold that decides which itemsets are frequent. A high threshold can remove rare but potentially useful patterns; a very low threshold can create a large number of candidates. It is therefore a modeling/business choice rather than a universal constant.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">After Apriori: Confidence and Lift</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Apriori first returns frequent itemsets. If we then generate a rule such as <strong>Bread → Milk</strong>, metrics such as confidence and lift help evaluate that rule.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-emerald-900 mb-2">Confidence</p>
            <p className="font-mono text-sm text-slate-800 mb-2">Confidence(X → Y) = Support(X ∪ Y) / Support(X)</p>
            <p className="text-sm text-slate-800">Bread support = 4/5 = 0.8</p>
            <p className="text-sm text-slate-800">Bread + Milk support = 3/5 = 0.6</p>
            <p className="font-mono font-bold text-sm text-slate-900 mt-2">0.6 / 0.8 = 0.75</p>
          </div>
          <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-amber-900 mb-2">Lift</p>
            <p className="font-mono text-sm text-slate-800 mb-2">Lift(X → Y) = Confidence(X → Y) / Support(Y)</p>
            <p className="text-sm text-slate-800">Confidence(Bread → Milk) = 0.75</p>
            <p className="text-sm text-slate-800">Support(Milk) = 0.8</p>
            <p className="font-mono font-bold text-sm text-slate-900 mt-2">0.75 / 0.8 = 0.9375</p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Important interpretation</p>
          <p className="text-slate-800">
            Confidence is 75%, but lift is below 1 because Milk is already very common in this tiny dataset. This is why a high-looking confidence value alone does not prove a useful positive association.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="step-by-step">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <RefreshCw className="mr-3 text-indigo-600" /> Apriori Step by Step
        </h2>

        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto mb-10">
{`TRANSACTIONS
     │
     ▼
Count 1-itemsets
     │
     ▼
Keep frequent 1-itemsets
     │
     ▼
Join them to make candidate 2-itemsets
     │
     ▼
Count + prune by minimum support
     │
     ▼
Use frequent 2-itemsets to propose larger candidates
     │
     ▼
Prune any candidate with an infrequent subset
     │
     ▼
FREQUENT ITEMSETS
     │
     ▼
(Optional next stage) Generate association rules`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Complete Worked Example</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Use the five transactions from the opening example and set <strong>minimum support = 50%</strong>.
        </p>

        <div className="space-y-6 mb-10">
          <div className="pl-4 border-l-4 border-indigo-300 bg-indigo-50/60 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-2">Step 1 — Count 1-itemsets</p>
            <div className="font-mono text-sm text-slate-800 space-y-1">
              <p>Bread: 4 / 5 = 0.80 ✓</p>
              <p>Milk: 4 / 5 = 0.80 ✓</p>
              <p>Butter: 3 / 5 = 0.60 ✓</p>
            </div>
            <p className="text-sm text-slate-700 mt-2">All three pass 0.50, so all three can participate in candidate pairs.</p>
          </div>

          <div className="pl-4 border-l-4 border-indigo-300 bg-indigo-50/60 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-2">Step 2 — Generate and count candidate 2-itemsets</p>
            <div className="font-mono text-sm text-slate-800 space-y-1">
              <p>{`{Bread, Milk}`}: 3 / 5 = 0.60 ✓</p>
              <p>{`{Bread, Butter}`}: 2 / 5 = 0.40 ✗</p>
              <p>{`{Milk, Butter}`}: 2 / 5 = 0.40 ✗</p>
            </div>
          </div>

          <div className="pl-4 border-l-4 border-rose-300 bg-rose-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-2">Step 3 — Apply the Apriori property before counting a 3-itemset</p>
            <p className="text-slate-800 text-sm mb-2">
              Consider candidate <span className="font-mono font-bold">{`{Bread, Milk, Butter}`}</span>.
            </p>
            <p className="text-slate-800 text-sm mb-2">
              Two of its 2-item subsets — <span className="font-mono">{`{Bread, Butter}`}</span> and <span className="font-mono">{`{Milk, Butter}`}</span> — are already known to be infrequent.
            </p>
            <p className="font-bold text-rose-800 text-sm">Therefore the triple can be pruned without another support count.</p>
          </div>

          <div className="pl-4 border-l-4 border-emerald-300 bg-emerald-50 py-4 pr-4 rounded-r-md">
            <p className="font-bold text-slate-900 mb-2">Step 4 — Final frequent itemsets at 50% support</p>
            <p className="font-mono text-sm text-slate-800">{`{Bread}, {Milk}, {Butter}, {Bread, Milk}`}</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Why This Saves Work</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          With <em>n</em> distinct items there are <span className="font-mono">2<sup>n</sup> − 1</span> possible non-empty itemsets in the full search space. Apriori does not blindly enumerate all of them: minimum-support filtering and downward-closure pruning can remove large parts of the search space. The amount of work still depends strongly on the number of items, transaction density, and support threshold.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation with mlxtend
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          A transaction list is first converted into a one-hot Boolean table. Apriori then returns frequent itemsets with their support values. Association rules are a separate next step.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h3 className="font-bold text-slate-800 text-lg">Python Code: Apriori using mlxtend</h3>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# pip install pandas mlxtend

import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

# 1. Raw transactions
transactions = [
    ['Bread', 'Milk'],
    ['Bread', 'Butter'],
    ['Milk', 'Butter'],
    ['Bread', 'Milk', 'Butter'],
    ['Bread', 'Milk']
]

# 2. Convert baskets to a Boolean one-hot table
te = TransactionEncoder()
encoded = te.fit(transactions).transform(transactions)
df = pd.DataFrame(encoded, columns=te.columns_)

# 3. Mine frequent itemsets
frequent_itemsets = apriori(
    df,
    min_support=0.40,
    use_colnames=True
)

# Make item names easy to read and output deterministic
display_itemsets = frequent_itemsets.copy()
display_itemsets['items'] = display_itemsets['itemsets'].apply(
    lambda x: ', '.join(sorted(x))
)

print(
    display_itemsets[['support', 'items']]
    .sort_values(['support', 'items'], ascending=[False, True])
    .to_string(index=False)
)

# 4. Generate rules AFTER frequent-itemset mining
rules = association_rules(
    frequent_itemsets,
    metric='confidence',
    min_threshold=0.70,
    num_itemsets=len(df)
)

rules['antecedent'] = rules['antecedents'].apply(
    lambda x: ', '.join(sorted(x))
)
rules['consequent'] = rules['consequents'].apply(
    lambda x: ', '.join(sorted(x))
)

print(
    rules[['antecedent', 'consequent', 'support', 'confidence', 'lift']]
    .sort_values(['antecedent', 'consequent'])
    .round(3)
    .to_string(index=False)
)`}</code></pre>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-xl p-6 mb-8 overflow-x-auto">
          <p className="font-bold mb-3">Expected frequent itemsets</p>
<pre className="text-sm font-mono">{` support          items
     0.8          Bread
     0.8           Milk
     0.6    Bread, Milk
     0.6         Butter
     0.4  Bread, Butter
     0.4   Butter, Milk`}</pre>
          <p className="font-bold mt-6 mb-3">Rules with confidence ≥ 0.70</p>
<pre className="text-sm font-mono">{`antecedent consequent  support  confidence  lift
     Bread       Milk      0.6        0.75  0.938
      Milk      Bread      0.6        0.75  0.938`}</pre>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="font-bold text-amber-900 mb-2">Why min_support = 0.40 in the code but 0.50 in the manual example?</p>
          <p className="text-slate-800">
            The manual 50% example is designed to make Apriori pruning obvious. The code lowers support to 40% so the pair itemsets containing Butter remain available and learners can see more frequent-itemset output. Changing the threshold changes what Apriori returns.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-summary">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Apriori vs FP-Growth
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Idea</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-indigo-700">Apriori</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-emerald-700">FP-Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm">
              <tr>
                <td className="px-5 py-4 font-medium text-slate-900">Frequent-itemset strategy</td>
                <td className="px-5 py-4 text-slate-700">Generate candidate itemsets, then prune</td>
                <td className="px-5 py-4 text-slate-700">Compress transactions into FP-tree structures and avoid explicit candidate generation</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-900">Repeated passes</td>
                <td className="px-5 py-4 text-slate-700">Classical Apriori makes repeated passes as itemset size grows</td>
                <td className="px-5 py-4 text-slate-700">Designed to reduce repeated candidate-counting work</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-slate-900">Which is faster?</td>
                <td className="px-5 py-4 text-slate-700" colSpan={2}>Depends on dataset size, density, support threshold and implementation. FP-Growth often avoids Apriori's candidate explosion, but do not treat one method as universally faster in every situation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages</h3>
        <ul className="list-disc pl-6 text-lg text-slate-800 space-y-2 mb-8">
          <li>Simple, interpretable frequent-itemset logic.</li>
          <li>The Apriori property provides intuitive and effective pruning.</li>
          <li>Useful for teaching association mining and for manageable transaction datasets.</li>
          <li>Support thresholds give direct control over what counts as frequent.</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Limitations</h3>
        <ul className="list-disc pl-6 text-lg text-slate-800 space-y-2 mb-8">
          <li>Low support thresholds can create very large candidate sets.</li>
          <li>Dense transaction data can make combinatorial growth severe.</li>
          <li>Classical Apriori may require repeated scans/counting passes.</li>
          <li>Frequent co-occurrence does not imply causation or business value.</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Where Apriori-Style Analysis Can Help</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            ['Market Basket Analysis', 'Find products that frequently co-occur in baskets.'],
            ['Cross-Sell Exploration', 'Generate candidate product combinations for later validation.'],
            ['Web Usage Mining', 'Find pages or actions that often occur in the same sessions.'],
            ['Operational Pattern Mining', 'Explore recurring combinations of events or categorical conditions.'],
          ].map(([title, text]) => (
            <div key={title} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common Mistakes</h2>
        <div className="space-y-4 mb-8">
          {[
            ['Counting a candidate that should already be pruned', 'If any required subset is infrequent, use the Apriori property and discard the larger candidate.'],
            ['Thinking Apriori itself is the association rule', 'Apriori mines frequent itemsets. Rules and metrics such as confidence/lift come afterwards.'],
            ['Assuming high confidence means a strong positive association', 'Always compare against the consequent baseline; lift can reveal that a high confidence is unsurprising.'],
            ['Choosing minimum support mechanically', 'Threshold choice changes both computation and which patterns can be discovered.'],
            ['Treating a rule as causal', 'Bread → Milk is a co-occurrence pattern, not proof that Bread causes Milk purchases.'],
          ].map(([title, text]) => (
            <div key={title} className="pl-4 border-l-4 border-rose-300 bg-rose-50 py-3 pr-4 rounded-r-md">
              <p className="font-bold text-slate-900">{title}</p>
              <p className="text-slate-700 text-sm mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="quick-recap">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Recap</h2>
        <div className="space-y-3 mb-8">
          <details className="bg-white border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">If {`{A, B}`} is infrequent, should Apriori test {`{A, B, C}`} as a frequent candidate?</summary>
            <p className="mt-3 text-slate-700">No. Because {`{A, B}`} is a subset of {`{A, B, C}`}, the larger itemset cannot be frequent.</p>
          </details>
          <details className="bg-white border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">What does minimum support control?</summary>
            <p className="mt-3 text-slate-700">It controls the minimum transaction frequency required for an itemset to be considered frequent.</p>
          </details>
          <details className="bg-white border border-slate-200 rounded-lg p-4">
            <summary className="font-bold text-slate-900 cursor-pointer">Does Apriori directly prove that one product causes another purchase?</summary>
            <p className="mt-3 text-slate-700">No. It discovers frequent co-occurrence patterns. Association is not causation.</p>
          </details>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Apriori mines frequent itemsets by repeatedly generating candidates, measuring support and pruning combinations that cannot satisfy the minimum-support requirement.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Its key insight is the downward-closure property: if a smaller itemset is infrequent, every larger itemset containing it must also be infrequent. This turns a potentially huge combination search into a more manageable pruning process when the data and support threshold allow it.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-8">
        <p className="text-slate-900 font-bold mb-2 text-xl">Remember</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Apriori answers: <strong>“Which item combinations occur frequently enough to keep exploring?”</strong> Association-rule metrics answer the next question: <strong>“Which of the resulting rules are interesting enough to examine?”</strong>
        </p>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-2">Related lesson</p>
        <a href="/learn/association-rules" className="text-indigo-700 font-semibold hover:underline">Association Rules → Support, Confidence and Lift</a>
      </div>
    </>
  );
}
