import React from "react";
import { Lightbulb, Code, Layers, Eye, RefreshCw, Handshake, Target, Link, ExternalLink } from "lucide-react";

export function AssociationRulesContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Association Rule Learning in Data Mining</h1>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Association Rule Learning is a rule-based Machine Learning and Data Mining technique used to discover hidden relationships, correlations, and patterns between items in large datasets.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">The Primary Goal</p>
          <p className="text-slate-800 italic leading-relaxed">
            Find relationships between items that frequently occur together.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Association Rule Learning is one of the most important techniques in Data Mining, Market Basket Analysis, Recommendation Systems, Retail Analytics, Fraud Detection, and Web Usage Mining.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The algorithm analyzes transaction data and identifies patterns such as: <span className="font-bold">If customers buy X, they are likely to buy Y</span>.
        </p>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">A Classic Real-World Example</p>
          <p className="text-slate-800 italic leading-relaxed">
            Customers buying bread and butter often also buy milk.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          This type of knowledge helps businesses increase sales, improve product placement, create recommendation systems, optimize marketing strategies, and understand customer behavior. Association Rule Mining became extremely popular in retail environments and supermarket analytics because it could automatically uncover hidden buying habits from large transaction databases.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Introduction to Association Rule Learning</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          In traditional Machine Learning problems, Classification predicts categories, Regression predicts numbers, and Clustering groups similar records. But Association Rule Learning works differently.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Instead of predicting outcomes directly, it tries to discover interesting co-occurrence relationships between items. This makes it an <strong>Unsupervised Learning Technique</strong> because there is no target variable. The system simply explores the data and discovers hidden associations automatically.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Real-Life Example of Association Rules</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a supermarket stores millions of transactions:
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

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          After analyzing the data, the algorithm may discover: <span className="font-bold text-indigo-700">{`{Bread, Butter}`} → {`{Milk}`}</span>
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Meaning: Customers buying bread and butter often buy milk as well. This information can be used for product recommendations, store shelf organization, combo offers, and discount campaigns.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-important">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Eye className="mr-3 text-indigo-600" /> Why Association Rule Mining Is Important
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Modern businesses generate enormous amounts of transactional data every day. Examples include supermarket purchases, website clicks, banking transactions, medical records, online shopping activity, and streaming platform usage.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Manually identifying hidden relationships inside such massive datasets is nearly impossible. Association Rule Learning automates this process and discovers meaningful patterns efficiently.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Core Idea Behind Association Rules</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The basic structure of an association rule is: <strong>X → Y</strong>
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 space-y-2">
          <li><strong>X = Antecedent</strong> (IF part)</li>
          <li><strong>Y = Consequent</strong> (THEN part)</li>
        </ul>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-slate-900 text-lg mb-2">Example Rule</p>
          <p className="font-mono text-slate-800 mb-2">{`{Bread, Butter} → {Milk}`}</p>
          <p className="text-slate-800 italic">Interpretation: If bread and butter are purchased, milk is also likely to be purchased.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-6">Components of Association Rules</h3>
        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto w-fit mb-8">
{`ASSOCIATION RULE
│
├── Antecedent (LHS)
├── Consequent (RHS)
├── Support
├── Confidence
├── Lift
├── Conviction
└── Frequent Itemsets`}
        </div>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          <strong>Antecedent (Left-Hand Side):</strong> Represents items already present in the transaction. Example: {`{Bread, Butter}`}. This is the IF part.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          <strong>Consequent (Right-Hand Side):</strong> Represents items likely to occur with the antecedent. Example: {`{Milk}`}. This is the THEN part.
        </p>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="types-of-rules">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Types of Association Rules
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Association Rules are classified into multiple categories depending on data type, relationship direction, number of dimensions, and level of abstraction.
        </p>

        <div className="font-mono text-emerald-900 bg-emerald-50 p-6 rounded-xl border border-emerald-100 whitespace-pre overflow-x-auto w-fit mb-10">
{`TYPES OF ASSOCIATION RULES
│
├── Multi-relational association rules
├── Generalized association rules
├── Quantitative association rules
└── Interval information association rules`}
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">1. Multi-relational Association Rules</h4>
            <p className="text-lg leading-relaxed text-slate-800">
              Multi-Relation Association Rules (MRAR) is a new class of association rules, different from original, simple, and even multi-relational association rules (usually extracted from multi-relational databases). Each rule element consists of one entity but many a relationship. These relationships represent indirect relationships between entities.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">2. Generalized Association Rules</h4>
            <p className="text-lg leading-relaxed text-slate-800">
              Generalized association rule extraction is a powerful tool for getting a rough idea of interesting patterns hidden in data. However, since patterns are extracted at each level of abstraction, the mined rule sets may be too large to be used effectively for decision-making. Therefore, in order to discover valuable and interesting knowledge, post-processing steps are often required. Generalized association rules should have categorical (nominal or discrete) properties on both the left and right sides of the rule.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">3. Quantitative Association Rules</h4>
            <p className="text-lg leading-relaxed text-slate-800">
              Quantitative association rules is a special type of association rule. Unlike general association rules, where both left and right sides of the rule should be categorical (nominal or discrete) attributes, at least one attribute (left or right) of quantitative association rules must contain numeric attributes.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">4. Interval Information Association Rules</h4>
            <p className="text-lg leading-relaxed text-slate-800">
              These rules expand upon quantitative association capabilities by systematically partitioning numerical ranges into continuous intervals. Rather than evaluating precise numeric values which may be rarely duplicated exactly, rules encode broader ranges (e.g., <em>Salary [50k-70k] → Approved</em>) to expose practical underlying relationships.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="important-metrics">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Important Metrics in Association Rule Mining
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Association Rules are evaluated using several important mathematical measures. The three most important metrics are <strong>Support</strong>, <strong>Confidence</strong>, and <strong>Lift</strong>. These metrics determine whether a rule is useful or meaningless.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">1. Support</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Support measures: <strong>How frequently an itemset appears in the dataset</strong>. Low-support rules may occur only by chance. High-support rules are more reliable and meaningful.
        </p>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 text-lg mb-2">Support Formula & Example</p>
          <p className="font-mono text-slate-800 mb-2">Support(X → Y) = (Transactions containing X ∪ Y) / (Total Transactions)</p>
          <div className="mt-4 pt-4 border-t border-sky-200">
            <p className="font-mono text-sm text-slate-800 mb-1">Suppose: Total transactions = 10, Transactions containing Bread and Milk = 4</p>
            <p className="font-mono text-sm text-slate-800 font-bold mb-2">Support = 4 / 10 = 0.4</p>
            <p className="text-slate-800 italic text-sm">Meaning: 40% of transactions contain Bread and Milk together.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">2. Confidence</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Confidence measures: <strong>How often Y occurs when X occurs</strong>. It measures the reliability of the rule.
        </p>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-emerald-900 text-lg mb-2">Confidence Formula & Example</p>
          <p className="font-mono text-slate-800 mb-2">Confidence(X → Y) = Support(X ∪ Y) / Support(X)</p>
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <p className="font-mono text-sm text-slate-800 mb-1">Suppose: Bread occurs in 5 transactions, Bread and Milk together occur in 4.</p>
            <p className="font-mono text-sm text-slate-800 font-bold mb-2">Confidence = 4 / 5 = 0.8</p>
            <p className="text-slate-800 italic text-sm">Meaning: 80% of customers buying bread also buy milk.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">3. Lift</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Lift measures: <strong>Strength of association between items</strong>. Lift determines whether the relationship is meaningful or accidental.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">Lift Formula & Example</p>
          <p className="font-mono text-slate-800 mb-2">Lift(X → Y) = Confidence(X → Y) / Support(Y)</p>
          <div className="mt-4 pt-4 border-t border-amber-200">
            <p className="font-mono text-sm text-slate-800 mb-1">Suppose: Confidence = 0.8, Support(Milk) = 0.5</p>
            <p className="font-mono text-sm text-slate-800 font-bold mb-2">Lift = 0.8 / 0.5 = 1.6</p>
            <p className="text-slate-800 italic text-sm">Interpretation: Bread buyers are 1.6 times more likely to buy milk.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 mt-6">Understanding Lift Values</h3>
        <ul className="list-disc pl-6 mb-8 text-lg text-slate-800 space-y-2">
          <li><strong>Lift = 1:</strong> No association (Independent)</li>
          <li><strong>Lift &gt; 1:</strong> Positive association</li>
          <li><strong>Lift &lt; 1:</strong> Negative association</li>
        </ul>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="workflow-and-algorithms">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <RefreshCw className="mr-3 text-indigo-600" /> Algorithms and Workflow
        </h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-6">Frequent Itemsets</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Before generating rules, the algorithm first identifies frequently occurring item combinations. These are called <strong>Frequent Itemsets</strong>. Example: {`{Bread, Milk}`} appears repeatedly in transactions.
        </p>

        <div className="font-mono text-slate-900 bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre overflow-x-auto w-fit mb-10">
{`TRANSACTION DATABASE
          │
          ▼
Generate Frequent Itemsets
          │
          ▼
Apply Support Threshold
          │
          ▼
Generate Candidate Rules
          │
          ▼
Calculate Confidence & Lift
          │
          ▼
Select Strong Rules`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Popular Algorithms</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Several algorithms are used to generate association rules: Apriori, FP-Growth, ECLAT, and AIS.
        </p>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">1. Apriori Algorithm</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-2">
              Apriori is the most famous association rule algorithm. It works using the principle: <em>If an itemset is frequent, all its subsets must also be frequent</em> (Apriori Property).
            </p>
            <ul className="list-disc pl-6 text-lg text-slate-800 space-y-1 mb-2">
              <li><strong>Advantages:</strong> Easy to understand, simple implementation, widely used in education.</li>
              <li><strong>Disadvantages:</strong> Generates many candidate itemsets, slow for large datasets, requires multiple database scans.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">2. FP-Growth Algorithm</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-2">
              FP-Growth improves Apriori efficiency. Instead of generating many candidate itemsets, FP-Growth uses a compressed tree structure called an <strong>FP Tree</strong>. This significantly reduces computation time.
            </p>
            <ul className="list-disc pl-6 text-lg text-slate-800 space-y-1 mb-2">
              <li><strong>Advantages:</strong> Faster than Apriori, efficient for large datasets, requires fewer scans.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">3. ECLAT Algorithm</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-2">
              ECLAT uses a Vertical database format instead of horizontal transactions. It improves speed for certain datasets.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Applications & Python Implementation
        </h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-6">Market Basket Analysis</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Association Rule Mining is most famous for <strong>Market Basket Analysis</strong>. It analyzes customer purchases to identify products bought together. A famous historical retail example is discovering that <em>Diapers → Beer</em>.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-6">Other Applications</h3>
        <ul className="list-disc pl-6 mb-8 text-lg text-slate-800 space-y-2">
          <li><strong>Recommendation Systems:</strong> E-commerce platforms use rules for "Customers who bought this also bought..."</li>
          <li><strong>Fraud Detection:</strong> Banking systems detect suspicious transaction patterns (unusual card usage).</li>
          <li><strong>Medical Diagnosis:</strong> Identifying disease correlations, symptom patterns, and drug interactions.</li>
          <li><strong>Website Recommendation:</strong> Analyzing user navigation behavior (Users visiting page A often visit page B).</li>
        </ul>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Python Implementation</h3>
        
        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: Apriori and Association Rules</h4>
          </div>
          <div className="p-0">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`# Step 1 — Import Libraries (requires 'mlxtend' and 'pandas')
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

# Step 2 — Create Dataset
data = {
    'Bread': [1,1,1,0,1],
    'Milk': [1,0,1,1,1],
    'Butter': [1,1,0,1,1]
}
df = pd.DataFrame(data)

# Step 3 — Generate Frequent Itemsets
frequent_items = apriori(
    df,
    min_support=0.4,
    use_colnames=True
)
print("Frequent Itemsets:")
print(frequent_items)

# Step 4 — Generate Association Rules
rules = association_rules(
    frequent_items,
    metric="confidence",
    min_threshold=0.7
)
print("\\nAssociation Rules:")
print(rules)`}</code></pre>
            </div>
          </div>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Comparisons & Summary Attributes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Discovers Hidden Patterns:</strong> Finds relationships humans may systematically miss.</li>
              <li><strong>Improves Business Decisions:</strong> Helps optimize marketing and inventory.</li>
              <li><strong>Easy Interpretation:</strong> Rules are highly understandable and explainable to stakeholders.</li>
              <li><strong>Works on Large Databases:</strong> Scalable for large transactional systems.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Generates Too Many Rules:</strong> Large datasets may produce thousands of meaningless rules.</li>
              <li><strong>Computationally Expensive:</strong> Frequent itemset generation can be slow.</li>
              <li><strong>Spurious Associations:</strong> Some rules may occur purely by chance without real meaning.</li>
              <li><strong>Difficult Parameter Selection:</strong> Choosing Support and Confidence thresholds requires careful tuning.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Association Rules vs Classification</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">Association Rules</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Learning Type</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Unsupervised</td>
                <td className="px-6 py-4 text-sm text-slate-700">Supervised</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Goal</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Discover patterns</td>
                <td className="px-6 py-4 text-sm text-slate-700">Predict labels</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Output</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Rules</td>
                <td className="px-6 py-4 text-sm text-slate-700">Classes</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">Example</td>
                <td className="px-6 py-4 text-sm text-indigo-700 font-bold">Bread → Milk</td>
                <td className="px-6 py-4 text-sm text-slate-700">Spam/Not Spam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Association Rule Learning is a powerful unsupervised data mining technique used to discover hidden relationships between items in large datasets. It leverages multiple algorithms—such as Apriori, FP-Growth, and ECLAT—to evaluate transactional data in search of high-strength associations. 
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        It works by identifying frequent itemsets, measuring support, confidence, and lift, and then generating meaningful IF-THEN rules. The technique underpins the recommendation engines and market basket analyses utilized extensively by retail chains, streaming platforms, and fraud-detection teams.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Association does NOT imply causation. If <span className="font-bold">Bread → Milk</span>, it does not necessarily mean bread causes milk purchases, nor does it establish physical dependency. It only mathematically verifies that they frequently occur together in historical transactions, meaning correlation must not be automatically treated as causation.
        </p>
      </div>
    </>
  );
}
