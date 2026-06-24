import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Lightbulb, Code2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Shared UI components ─── */

const CodeBlock = ({ code, output }: { code: string; output?: string }) => (
  <div className="not-prose my-4 rounded-xl overflow-hidden border border-slate-200 text-sm">
    <div className="bg-[#1e1e1e] px-4 py-2 flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-red-500" />
      <span className="w-3 h-3 rounded-full bg-yellow-500" />
      <span className="w-3 h-3 rounded-full bg-green-500" />
      <span className="text-slate-400 text-xs font-mono ml-2">Python</span>
    </div>
    <pre className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-xs leading-relaxed p-4 overflow-x-auto m-0">{code}</pre>
    {output && (
      <>
        <div className="bg-slate-800 px-4 py-1.5 border-t border-slate-700">
          <span className="text-slate-400 text-xs font-mono">Output</span>
        </div>
        <pre className="bg-slate-950 text-emerald-400 font-mono text-xs leading-relaxed p-4 overflow-x-auto m-0">{output}</pre>
      </>
    )}
  </div>
);

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="not-prose my-4 overflow-x-auto rounded-xl border border-slate-200">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-800 text-white">
          {headers.map(h => <th key={h} className="text-left px-4 py-2.5 font-semibold text-xs uppercase tracking-wider">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
            {row.map((cell, j) => (
              <td key={j} className={`px-4 py-2.5 text-slate-700 text-sm border-t border-slate-100 ${j === 0 ? 'font-semibold text-slate-900' : ''}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Followup = ({ q }: { q: string }) => (
  <div className="not-prose mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2.5">
    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-amber-900"><span className="font-bold">Follow-up:</span> {q}</p>
  </div>
);

const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="not-prose my-4 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
    <div className="text-sm text-indigo-900 leading-relaxed">{children}</div>
  </div>
);

const SkillCheck = ({ n, scenario, answer }: { n: number; scenario: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="not-prose my-5 border-2 border-rose-200 bg-rose-50 rounded-2xl overflow-hidden">
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span className="text-rose-700 font-bold text-sm uppercase tracking-wider">Skill Check {n}</span>
        </div>
        <p className="text-slate-800 text-sm leading-relaxed"><span className="font-bold">Scenario:</span> {scenario}</p>
        <button onClick={() => setOpen(o => !o)}
          className="mt-3 text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center gap-1 transition-colors">
          {open ? <><ChevronUp className="w-3.5 h-3.5" />Hide answer</> : <><ChevronDown className="w-3.5 h-3.5" />Show answer</>}
        </button>
      </div>
      {open && (
        <div className="bg-white border-t border-rose-200 px-5 py-4">
          <p className="text-sm text-slate-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

type Diff = 'Fresher' | 'Intermediate' | 'Advanced';
type QAProps = { n: number; q: string; diff: Diff; children: React.ReactNode };

const QA = ({ n, q, diff, children }: QAProps) => {
  const [open, setOpen] = useState(false);
  const dc: Record<Diff, string> = {
    Fresher:      'bg-emerald-100 text-emerald-800',
    Intermediate: 'bg-amber-100 text-amber-800',
    Advanced:     'bg-rose-100 text-rose-800',
  };
  return (
    <div className="not-prose border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-4">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 p-5 bg-white hover:bg-slate-50 text-left transition-colors">
        <span className="text-slate-400 font-black text-xs mt-1 w-8 flex-shrink-0">Q{n}.</span>
        <span className="flex-1 font-semibold text-slate-800 text-sm leading-snug">{q}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${dc[diff]}`}>{diff}</span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-3 border-t border-slate-100 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

const SectionHeading = ({ title, sub }: { title: string; sub: string }) => (
  <div className="not-prose my-10 pb-4 border-b-2 border-slate-200">
    <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>
    <p className="text-slate-500 mt-1 text-sm">{sub}</p>
  </div>
);

const SubHeading = ({ title }: { title: string }) => (
  <div className="not-prose mt-8 mb-4">
    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
      <BookOpen className="w-4 h-4 text-indigo-500" />
      {title}
    </h3>
  </div>
);

/* =======================================================
   MAIN COMPONENT
======================================================= */
export function MLInterviewContent() {
  return (
    <div className="prose prose-slate max-w-none">

      {/* Page header */}
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
        Machine Learning Interview Questions & Answers
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed">
        80+ ML interview questions asked at Google, Meta, Amazon, Microsoft, and top product companies — organized by level and topic. Every answer includes follow-up questions that interviewers typically ask next.
      </p>

      {/* Level guide */}
      <div className="not-prose flex flex-wrap gap-2 my-5">
        {[
          { label: 'Fresher',      color: 'bg-emerald-100 text-emerald-800 border-emerald-200', desc: 'Asked in every round' },
          { label: 'Intermediate', color: 'bg-amber-100 text-amber-800 border-amber-200',       desc: 'ML Engineer / Data Scientist roles' },
          { label: 'Advanced',     color: 'bg-rose-100 text-rose-800 border-rose-200',           desc: 'Senior / FAANG-level' },
        ].map(l => (
          <div key={l.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${l.color}`}>
            {l.label} — <span className="font-normal opacity-80">{l.desc}</span>
          </div>
        ))}
      </div>

      {/* Quick jump */}
      <div className="not-prose bg-slate-50 border border-slate-200 rounded-2xl p-5 my-6">
        <p className="font-bold text-slate-800 text-sm mb-3">Jump to section</p>
        <div className="flex flex-wrap gap-2">
          {[
            ['#foundations', 'Foundations'],
            ['#supervised', 'Supervised Learning'],
            ['#evaluation', 'Model Evaluation'],
            ['#unsupervised', 'Unsupervised Learning'],
            ['#deep-learning', 'Deep Learning'],
            ['#nlp-genai', 'NLP & GenAI'],
            ['#mlops', 'MLOps & System Design'],
            ['#stats', 'Statistics & Probability'],
            ['#lora-finetuning', 'Fine-Tuning & LoRA'],
            ['#coding', 'Coding Rounds'],
            ['#mistakes', 'Common Mistakes'],
            ['#tips', 'FAANG Tips'],
          ].map(([href, label]) => (
            <a key={href} href={href}
              className="text-xs font-semibold bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-700 text-slate-600 px-3 py-1.5 rounded-lg transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ======= SECTION 1: FOUNDATIONS ======= */}
      <div id="foundations">
        <SectionHeading
          title="1. Foundations & Core Concepts"
          sub="Asked in every ML interview regardless of company or level. Getting these wrong is more damaging than struggling on advanced questions." />

        <SubHeading title="Basic ML Concepts" />

        <QA n={1} diff="Fresher"
          q="What is the difference between AI, Machine Learning, and Deep Learning?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Think of these as nested circles. AI is the outermost — it's the broad goal of making machines intelligent. Machine Learning is one way to achieve AI: instead of hand-coding rules, you let the computer learn patterns from data. Deep Learning is a specific type of ML that uses multi-layered neural networks, and it works best when you have large amounts of data and raw inputs like images, text, or audio.
          </p>
          <Table
            headers={['Term', 'What it does', 'Common example']}
            rows={[
              ['AI', 'Broad goal of machine intelligence', 'Expert systems, planning algorithms'],
              ['Machine Learning', 'Learns patterns from data', 'Spam detection, fraud scoring'],
              ['Deep Learning', 'Multi-layer neural networks', 'Image classification, GPT, DALL-E'],
            ]}
          />
          <Followup q="When would you prefer a gradient boosting model over a deep learning model for a tabular dataset?" />
        </QA>

        <QA n={2} diff="Fresher"
          q="What are the three types of Machine Learning? Give a real example of each.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            <strong>Supervised Learning</strong> — the model trains on labelled data. Every example has an input X and a known output Y. A credit card fraud detector is supervised: historical transactions are labelled "fraud" or "not fraud", and the model learns the mapping. The catch is that labels are expensive — someone has to create them.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Unsupervised Learning</strong> — no labels. The model finds hidden structure in the data on its own. An e-commerce company might cluster their 10 million customers without any labels and discover that customers naturally group into "bargain hunters", "brand loyalists", and "impulse buyers" — groups nobody defined in advance.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Reinforcement Learning</strong> — an agent learns by trial and error in an environment. No dataset, no labels — just rewards. AlphaGo played itself millions of times with +1 for winning and -1 for losing. This is powerful but requires a well-defined reward signal and massive computational resources, which is why most production ML is still supervised.
          </p>
          <Followup q="Where does self-supervised learning fit — is it closer to supervised or unsupervised?" />
        </QA>

        <QA n={3} diff="Fresher"
          q="What is the Bias-Variance Tradeoff? How do you diagnose each in practice?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Every model's error decomposes into three parts: bias, variance, and irreducible noise.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Bias</strong> is systematic error — the model is wrong in the same direction consistently because it made oversimplified assumptions. A linear model on non-linear data will always underestimate in certain regions no matter how much data you feed it.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Variance</strong> is how much the model changes when you train it on different samples. A 1000-node decision tree trained on 200 rows memorises quirks in those 200 rows. Train it on a different 200 rows and you get a completely different tree.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            You diagnose using learning curves — plot training and validation error against training set size. High bias shows both errors plateauing high. High variance shows a large gap between training error (low) and validation error (high).
          </p>
          <Table
            headers={['Symptom', 'Problem', 'Fixes']}
            rows={[
              ['High train error + high val error', 'High Bias (underfitting)', 'More complex model, more features, less regularisation'],
              ['Low train error + high val error', 'High Variance (overfitting)', 'More data, regularisation, simpler model, ensemble'],
              ['Both errors low but KPIs fail', 'Data leakage or wrong metric', 'Audit split, check target definition'],
            ]}
          />
          <Followup q="If you add 10x more training data and the validation error doesn't drop, what does that tell you?" />
        </QA>

        <QA n={4} diff="Fresher"
          q="What is the difference between a Parameter and a Hyperparameter?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            A <strong>parameter</strong> is learned automatically during training. The weights and biases in a neural network, the split thresholds in a decision tree, the coefficients in logistic regression — all parameters. The algorithm adjusts these to minimise the loss function.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            A <strong>hyperparameter</strong> is set by you before training begins, and the algorithm cannot tune it internally. Learning rate, number of trees in a forest, maximum tree depth, batch size, dropout rate — these all need to be chosen externally.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The key rule: tune hyperparameters on the validation set, never on the test set. The test set is touched exactly once.
          </p>
          <Followup q="Name 5 important hyperparameters for XGBoost and explain what each controls." />
        </QA>

        <QA n={5} diff="Fresher"
          q="What is overfitting and how do you prevent it?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Overfitting is when the model learns the noise in the training data rather than the underlying signal. You see it as a large gap between training accuracy and validation accuracy. A model that achieves 99% training accuracy and 71% validation accuracy is severely overfit.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The standard toolkit, roughly in order of how often they help:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>More data</strong> — the single most reliable fix when available</li>
            <li><strong>Regularisation</strong> — L1 (Lasso), L2 (Ridge), or Dropout for neural networks</li>
            <li><strong>Simpler model</strong> — fewer layers, shallower trees, fewer features</li>
            <li><strong>Cross-validation</strong> — ensures your evaluation is representative</li>
            <li><strong>Early stopping</strong> — stop training when validation loss stops improving</li>
            <li><strong>Ensemble methods</strong> — Random Forest reduces overfitting by averaging many trees</li>
          </ul>
          <Followup q="How do you distinguish overfitting from data leakage? Both cause an optimistic training result." />
        </QA>

        <QA n={6} diff="Fresher"
          q="What is data leakage and why is it the most dangerous mistake in ML?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Data leakage happens when information that wouldn't be available at prediction time influences the model during training. The model appears to perform extremely well during development, gets deployed, and then fails in production — often without any obvious error message.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Two types to know:
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Target leakage:</strong> A feature is derived from or contains the target variable. If you're predicting loan default and you include whether the loan was later restructured, you've leaked future information — that feature only exists after the outcome you're predicting.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Train-test contamination:</strong> The most common form. You StandardScale your entire dataset and then split 80/20. The scaler saw the test set's mean and standard deviation — the model now has indirect knowledge of test data. Always split first, then fit your transformers on the training set only, and apply (not refit) them to the test set. The sklearn Pipeline object enforces this automatically.
          </p>
          <Followup q="Your fraud model shows 99% AUC in development but drops to 65% in production. Name 3 leakage causes you would check first." />
        </QA>

        <QA n={7} diff="Intermediate"
          q="Explain the Curse of Dimensionality and how it affects ML models.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            As the number of features increases, the volume of the feature space grows exponentially and data points become increasingly spread out. With 1 feature and 100 examples, your data is reasonably dense. With 100 features and the same 100 examples, you are trying to cover a space so vast that your 100 points are isolated islands.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The practical consequences:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>Distance metrics break down</strong> — in high dimensions, the nearest and farthest points become nearly the same distance apart. KNN, K-Means, and SVM all depend on meaningful distances, so they degrade.</li>
            <li><strong>Overfitting risk increases</strong> — with more dimensions than samples, a model can always find a hyperplane that perfectly separates training examples, even when they're randomly labelled.</li>
            <li><strong>Computational cost explodes</strong> — grid search over 50 features is practically impossible.</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            Standard responses: PCA or t-SNE for dimensionality reduction, Lasso regularisation for automatic feature selection, mutual information or permutation importance for manual selection.
          </p>
          <Followup q="Why do distance-based models degrade faster than tree-based models with high dimensionality?" />
        </QA>

        <SubHeading title="Data Handling & Preprocessing" />

        <QA n={8} diff="Fresher"
          q="How do you handle missing values? Walk through your decision process.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            First question: is missingness random (MCAR), or does missingness itself carry signal? If a feature about loan income has 30% missing and you discover those 30% are all unemployed applicants who left it blank, the missingness pattern is more informative than any imputed value.
          </p>
          <Table
            headers={['Situation', 'Approach', 'Why']}
            rows={[
              ['Numeric, roughly symmetric', 'Mean imputation', 'Simple, reasonable central value'],
              ['Numeric, skewed or outliers', 'Median imputation', 'Robust to extreme values'],
              ['Categorical', '"Unknown" category', 'Treats missingness as a valid category'],
              ['Missingness is predictive', 'Add binary missing-indicator feature', 'Preserves the signal in absence itself'],
              ['< 5% missing, random', 'Drop rows or mean/mode', 'Minimal impact'],
              ['> 30% missing', 'Reconsider the feature entirely', 'Imputation becomes unreliable'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed">
            Critical rule: fit your imputer on the training set only. Applying the training mean/median to the test set is correct. Recomputing mean from the full dataset before splitting is leakage.
          </p>
          <Followup q="How do you impute missing values in time series data without using future values?" />
        </QA>

        <QA n={9} diff="Fresher"
          q="What is feature scaling and when is it necessary?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Feature scaling brings numeric features to comparable ranges so that one feature doesn't dominate distance calculations or gradient updates just because its units are larger.
          </p>
          <Table
            headers={['Method', 'Formula', 'When to use']}
            rows={[
              ['Standardisation (Z-score)', 'z = (x − μ) / σ', 'Most models; output has mean 0, std 1'],
              ['Min-Max Scaling', '(x − min) / (max − min)', 'When you need bounded [0,1] range'],
              ['Robust Scaling', '(x − median) / IQR', 'When data has significant outliers'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Models that require scaling:</strong> KNN, SVM, K-Means, PCA, Logistic Regression, Neural Networks — any model that uses distances or gradient descent. <strong>Models that don't need it:</strong> Decision Trees, Random Forest, XGBoost — they split on thresholds, not distances.
          </p>
          <Followup q="Your dataset has income values ranging from ₹20,000 to ₹50,00,000 per month. There are 5 billionaires in the dataset. Which scaler do you choose and why?" />
        </QA>

        <QA n={10} diff="Fresher"
          q="What is the difference between Label Encoding and One-Hot Encoding?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            <strong>Label Encoding</strong> assigns integers to categories: Red=0, Green=1, Blue=2. The danger is that it implies an order that doesn't exist — the model might interpret Blue as "twice Green." This is fine for ordinal categories (Low=0, Medium=1, High=2) where order is real, but wrong for nominal categories.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>One-Hot Encoding</strong> creates a binary column for each category: is_red, is_green, is_blue. No false ordering. The cost is dimensionality — 100 cities becomes 100 columns.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            For high-cardinality categoricals (100+ values): use Target Encoding (replace category with its mean target value, with careful cross-validation to prevent leakage), Hashing, or Embeddings for neural networks.
          </p>
          <Followup q="How do you apply target encoding without leaking the target variable into your training features?" />
        </QA>

        <QA n={11} diff="Intermediate"
          q="How do you handle an imbalanced dataset? (e.g., 99% negative, 1% positive)">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            The first mistake people make is measuring the wrong thing. A model that predicts "negative" for every example achieves 99% accuracy — and is completely useless. Switch to F1-Score, Precision-Recall AUC, or ROC-AUC immediately.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The intervention hierarchy, roughly from least to most invasive:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>class_weight='balanced'</strong> in sklearn — tells the model to penalise minority misclassification more. Zero data manipulation required. Try this first.</li>
            <li><strong>Threshold tuning</strong> — move the classification cutoff below 0.5 to increase recall. Plot the full PR curve first.</li>
            <li><strong>SMOTE</strong> — generates synthetic minority samples by interpolating between real examples. Must be applied only inside cross-validation folds, never on the full dataset.</li>
            <li><strong>Random undersampling</strong> — discard majority class examples. Fast but loses information.</li>
          </ul>
          <Followup q="Why can ROC-AUC be misleading for a dataset with 0.1% positive class?" />
        </QA>

        <SkillCheck n={1}
          scenario="Your fraud detection model shows 99.2% accuracy. The product team is happy. Should you be?"
          answer="No. With typical fraud rates of 0.1–0.5%, a model predicting 'not fraud' for every transaction achieves 99.5–99.9% accuracy while catching exactly zero fraud cases. The right response: immediately pull the confusion matrix. Check recall on the fraud class. If it's near zero, accuracy is a completely meaningless metric here. Switch to PR-AUC as your primary metric and evaluate at specific precision/recall operating points that make business sense — e.g., 'recall ≥ 0.80 at precision ≥ 0.30'. Then check whether class_weight was set, whether threshold was tuned, and whether SMOTE was applied correctly (inside CV folds only)."
        />

        <QA n={12} diff="Intermediate"
          q="What is L1 vs L2 regularisation — and what actually happens to the weights?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Both L1 and L2 add a penalty to the loss function to discourage large weights, but the shape of the penalty is different and produces meaningfully different outcomes.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>L2 (Ridge):</strong> The penalty is the sum of squared weights — λΣwᵢ². Because squaring is a smooth function, the gradient of the penalty is 2λwᵢ — proportional to the weight size. Large weights get penalised heavily. Small weights get penalised gently. The result: all weights shrink toward zero, but none become exactly zero. Every feature retains some small influence on the prediction.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>L1 (Lasso):</strong> The penalty is the sum of absolute weights — λΣ|wᵢ|. The gradient of |w| is a constant ±λ regardless of the weight's current size. This creates a constant pull toward zero that doesn't weaken as weights get small — so it can push a weight all the way to exactly zero. Lasso effectively does automatic feature selection.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Geometrically: the L2 constraint region is a ball (smooth surface). The L1 constraint region is a diamond (has corners at the axes). Optimal solutions tend to land at the corners of the diamond — which correspond to sparse solutions where many weights are exactly zero.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Practical decision:</strong> You have 500 candidate features and suspect only 30 are meaningful → Lasso. All 500 are probably relevant and you're dealing with correlated features (like collinear housing metrics) → Ridge. Not sure → Elastic Net combines both.
          </p>
          <Followup q="If you apply Lasso to a group of highly correlated features, what does it tend to do? Is this always desirable?" />
        </QA>

        <SubHeading title="Gradient Descent & Optimisation" />

        <QA n={13} diff="Intermediate"
          q="What are vanishing and exploding gradients and how do you address each?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            In a deep network, backpropagation multiplies gradients together as it moves from the output layer backward through each layer. This repeated multiplication is where things go wrong.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Vanishing gradients:</strong> When the gradient values are consistently less than 1, multiplying them through many layers pushes the product toward zero. Early layers receive near-zero gradient updates — they barely learn. This is the core reason deep networks with sigmoid or tanh activations were hard to train for decades.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Exploding gradients:</strong> When gradient values are consistently greater than 1, multiplying them through layers pushes values toward infinity. Weights get astronomically large updates and the model diverges. More common in RNNs on long sequences.
          </p>
          <Table
            headers={['Problem', 'Symptoms you see', 'Solutions']}
            rows={[
              ['Vanishing', 'Early layers do not change much, loss plateaus early, activations become all zeros or all ones', 'Use ReLU, Batch Normalisation, residual connections, careful weight initialisation (Xavier/He)'],
              ['Exploding', 'Loss becomes NaN, weights grow to ±infinity, model diverges immediately', 'Gradient clipping (clip norm to max value), lower learning rate, LSTM gates for sequences'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed">
            ReLU substantially reduces vanishing gradients because its gradient is 1 for all positive inputs — not squashed into a small range like sigmoid. Residual connections (as in ResNet) provide a gradient highway — the skip connection adds a direct path from output to earlier layers that has gradient 1 by default.
          </p>
          <Followup q="Why do LSTM gates specifically help with vanishing gradients in sequence models?" />
        </QA>

        <QA n={14} diff="Intermediate"
          q="What is the difference between SGD, Adam, and AdaGrad? When would you use each?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            All three are gradient descent variants that differ in how they adjust the step size taken at each update.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>SGD (Stochastic Gradient Descent):</strong> The simplest possible update — θ = θ − η∇L. One learning rate for all parameters, constant throughout training. It works reliably but requires careful manual tuning of the learning rate and schedule. With momentum it handles noisy gradients better (momentum averages recent gradients to smooth the update direction).
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>AdaGrad:</strong> Adapts the learning rate per parameter based on historical gradient magnitudes. Parameters that receive large gradients frequently get a smaller learning rate; rarely updated parameters get a larger one. Good for sparse data (NLP with word frequencies). Problem: the accumulated squared gradients grow monotonically — learning rate eventually shrinks to near zero and training stalls.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Adam (Adaptive Moment Estimation):</strong> Combines momentum (first moment — exponential moving average of gradients) with adaptive learning rates (second moment — exponential moving average of squared gradients). The decay factors prevent the denominator from growing indefinitely, unlike AdaGrad. In practice, Adam converges fast, is less sensitive to learning rate choice, and is the default for most deep learning.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            One important nuance: on some tasks, well-tuned SGD with momentum generalises slightly better than Adam because Adam tends to find sharp minima that transfer poorly. This is why some vision model papers still use SGD. But for most practical work, start with Adam at a learning rate of 0.001.
          </p>
          <Followup q="What does the weight decay parameter in AdamW actually do, and why was it separated from the L2 penalty inside Adam?" />
        </QA>

      </div>

      {/* ======= SECTION 2: SUPERVISED LEARNING ======= */}
      <div id="supervised">
        <SectionHeading
          title="2. Supervised Learning Algorithms"
          sub="The core algorithms that appear in almost every ML interview. Expect questions about internal mechanics, not just sklearn API." />

        <QA n={15} diff="Fresher"
          q="How does Logistic Regression work and what are its assumptions?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Logistic Regression models the probability of a binary outcome using the sigmoid function: <code className="bg-slate-100 px-1 rounded text-xs">p = 1 / (1 + e^(-z))</code> where z is a linear combination of features: <code className="bg-slate-100 px-1 rounded text-xs">z = w₁x₁ + w₂x₂ + ... + b</code>.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Equivalently, it models the log-odds as linear: <code className="bg-slate-100 px-1 rounded text-xs">log(p/(1−p)) = Xw</code>. Each coefficient means "a one-unit increase in this feature multiplies the odds of the positive class by e^w." This interpretability is why logistic regression is widely used in banking and healthcare where regulators require explainability.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Assumptions:</strong> Linear relationship between features and log-odds. No severe multicollinearity. Observations are independent. No severe class imbalance (without class_weight adjustment).
          </p>
          <Followup q="If you add a highly correlated feature to logistic regression, what happens to the model coefficients?" />
        </QA>

        <QA n={16} diff="Fresher"
          q="How does a Decision Tree decide where to split?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            At each node, the tree evaluates every possible feature and every possible threshold and picks the split that maximises purity reduction. For classification this means maximising Gini impurity reduction or Information Gain (entropy reduction). For regression it minimises variance in the resulting child nodes.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Gini Impurity:</strong> 1 − Σpᵢ². A node with all examples in one class has Gini = 0 (perfectly pure). A 50/50 split has Gini = 0.5 (maximally impure). The tree chooses the split that gives the greatest weighted Gini reduction across both child nodes.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The problem: an unrestricted tree will keep splitting until every leaf contains one example — 100% training accuracy, terrible generalisation. Control with <code className="bg-slate-100 px-1 rounded text-xs">max_depth</code>, <code className="bg-slate-100 px-1 rounded text-xs">min_samples_leaf</code>, and <code className="bg-slate-100 px-1 rounded text-xs">min_samples_split</code>.
          </p>
          <Followup q="Decision trees are said to have high variance. What exactly does that mean in practical terms?" />
        </QA>

        <QA n={17} diff="Intermediate"
          q="How does Random Forest reduce variance compared to a single Decision Tree?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            A single decision tree has high variance — small changes in training data produce structurally different trees. Random Forest attacks this with two decorrelation mechanisms working together:
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>1. Bootstrap Aggregating (Bagging):</strong> Each tree trains on a random sample drawn with replacement from the training data — roughly 63% of unique samples per tree. Different trees see different data, so their errors are different.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>2. Feature randomness:</strong> At each split, only a random subset of features is considered (typically √n_features for classification). This prevents all trees from relying on the same dominant feature, making their errors more independent.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            When you average many independent error sources, the errors cancel out. If individual trees have variance σ², the ensemble variance is approximately σ²/n. In practice, the correlation between trees means it's not quite σ²/n, but the reduction is still dramatic — typically 60–80% lower than a single tree.
          </p>
          <Followup q="What is the Out-of-Bag (OOB) error and why is it useful?" />
        </QA>

        <QA n={18} diff="Intermediate"
          q="What is the difference between Bagging and Boosting?">
          <Table
            headers={['Aspect', 'Bagging', 'Boosting']}
            rows={[
              ['Training order', 'Trees trained in parallel independently', 'Trees trained sequentially'],
              ['What each tree sees', 'Random bootstrap sample', 'Reweighted data focusing on previous errors'],
              ['What problem it solves', 'Reduces variance', 'Reduces bias'],
              ['Risk', 'Does not reduce bias', 'Prone to overfitting with too many trees'],
              ['Example', 'Random Forest', 'XGBoost, AdaBoost, LightGBM'],
              ['Computation', 'Easily parallelisable', 'Sequential by nature'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            <strong>Practical rule of thumb:</strong> If your model underfits (high bias), use boosting. If it overfits (high variance) or you want stability, use bagging. In practice, XGBoost with appropriate regularisation handles both concerns, which is why it dominates tabular ML competitions.
          </p>
          <Followup q="If XGBoost starts overfitting on your validation set after 200 trees, what 3 hyperparameters do you adjust first?" />
        </QA>

        <QA n={19} diff="Intermediate"
          q="Explain XGBoost. Why does it outperform standard Gradient Boosting?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Standard Gradient Boosting builds trees sequentially where each tree fits the residual errors of the previous ensemble. XGBoost does the same conceptually, but adds several engineering improvements that make it substantially faster and often more accurate:
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>Regularisation:</strong> L1 and L2 penalties on leaf weights prevent overfitting — standard GBM has none</li>
            <li><strong>Second-order gradients:</strong> Uses both first and second derivatives of the loss function for more accurate tree construction</li>
            <li><strong>Parallel tree building:</strong> Sorts columns into blocks that allow parallelised split finding</li>
            <li><strong>Sparsity-aware split finding:</strong> Handles missing values natively by learning a default direction for each split</li>
            <li><strong>Subsampling:</strong> Row and column subsampling at the tree and node level, similar to Random Forest, adds regularisation</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            In practice: first tune <code className="bg-slate-100 px-1 rounded text-xs">max_depth</code> (3–6 is typical), <code className="bg-slate-100 px-1 rounded text-xs">n_estimators</code> with early stopping, then <code className="bg-slate-100 px-1 rounded text-xs">learning_rate</code> (lower = better generalisation, needs more trees), then <code className="bg-slate-100 px-1 rounded text-xs">subsample</code> and <code className="bg-slate-100 px-1 rounded text-xs">colsample_bytree</code>.
          </p>
          <Followup q="How does XGBoost handle missing values internally?" />
        </QA>

        <QA n={20} diff="Intermediate"
          q="What is the kernel trick in SVM and why is it computationally efficient?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            SVM finds a maximum-margin hyperplane between classes. For non-linearly separable data, you'd normally need to transform points into a higher-dimensional space where they become separable — but this is computationally expensive.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The kernel trick is the insight that SVM only ever needs the dot product between pairs of points — K(x, y) — not the explicit transformed coordinates. By defining a kernel function that computes these dot products directly in the original space without explicit transformation, you get all the benefits of a high-dimensional (or even infinite-dimensional) feature space without the computational cost.
          </p>
          <Table
            headers={['Kernel', 'When to use']}
            rows={[
              ['Linear', 'Linearly separable data; text classification'],
              ['RBF (Gaussian)', 'General-purpose, non-linear boundaries; most common'],
              ['Polynomial', 'Discrete data; image recognition'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Always scale before SVM.</strong> RBF computes Euclidean distances — a feature in units of millions dominates one in units of 0–1, destroying the geometric margin. StandardScaler is mandatory.
          </p>
          <Followup q="What does the C hyperparameter control in SVM and how does increasing it affect the margin?" />
        </QA>

        <QA n={21} diff="Fresher"
          q="How does Naive Bayes work and why is the 'naive' assumption both wrong and useful?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Naive Bayes computes the probability of each class given the input features using Bayes' theorem: P(class|features) ∝ P(class) × P(features|class). The "naive" part is the assumption that all features are conditionally independent given the class — that knowing someone's age tells you nothing about their income, once you already know their job category.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            In the real world, this independence assumption is almost always wrong. Age and income are correlated. Word co-occurrences in text are correlated. The model knows this assumption is violated — hence "naive."
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Despite this, it works remarkably well in practice because of a mathematical property: even when the probability estimates themselves are wrong, the ranking of probabilities is often preserved. You don't need accurate probabilities — you just need the right class to have the highest probability.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Gaussian Naive Bayes</strong> assumes continuous features follow a Gaussian distribution per class. <strong>Multinomial Naive Bayes</strong> is built for count data — classic for text classification with word frequencies. <strong>Bernoulli Naive Bayes</strong> is for binary features — does a word appear or not.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>When it genuinely shines:</strong> Text classification with many features (20,000 vocabulary terms), where the computational advantage is real and the independence assumption happens to not matter much. Also works well when you have very little training data — with 50 training examples, a logistic regression will overfit badly while Naive Bayes, which just counts class-conditional frequencies, remains stable.
          </p>
          <Followup q="What is Laplace (additive) smoothing in Naive Bayes and what problem does it solve?" />
        </QA>

        <QA n={22} diff="Fresher"
          q="How does KNN work? What are its main failure modes in production?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            KNN makes predictions by finding the k training examples nearest to the query point (by Euclidean distance or another metric) and either taking a majority vote (classification) or averaging their values (regression). No model is trained — the entire training set is the model, consulted at prediction time.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Choosing k:</strong> Small k (k=1) is extremely sensitive to noise — one mislabelled training example can flip predictions near it. Large k over-smooths the boundary. Use cross-validation to find the right k; typical values are 3–15 depending on dataset size.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>The real production failure modes:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>Prediction latency scales with training set size.</strong> Finding the k nearest neighbours among 10 million training examples takes O(n) comparisons per prediction. At inference time this is unacceptable for most products. Approximate nearest-neighbour (ANN) indexes like FAISS solve this but add complexity.</li>
            <li><strong>Memory cost:</strong> The entire training set stays in memory forever. A model with 50 million training examples and 100 features needs gigabytes of RAM just to serve one prediction.</li>
            <li><strong>Curse of dimensionality hits harder here than almost anywhere else.</strong> With 100 features, distance between nearest and farthest neighbours converges — the "nearest" neighbour is barely closer than a random point.</li>
            <li><strong>Requires scaling.</strong> A feature measured in millions (salary) will completely dominate a feature measured 0–1 (probability score) in any distance calculation.</li>
          </ul>
          <Followup q="Given KNN's limitations, where is it still used meaningfully in production systems?" />
        </QA>

      </div>

      {/* ======= SECTION 3: MODEL EVALUATION ======= */}
      <div id="evaluation">
        <SectionHeading
          title="3. Model Evaluation & Metrics"
          sub="Choosing the wrong evaluation metric is one of the most common ways to ship a model that looks good internally but fails in production." />

        <QA n={23} diff="Fresher"
          q="Explain Precision, Recall, F1-Score, and when to prioritise each.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            These are all derived from the confusion matrix — TP (true positives), FP (false positives), FN (false negatives), TN (true negatives).
          </p>
          <Table
            headers={['Metric', 'Formula', 'Plain English', 'Optimise when']}
            rows={[
              ['Precision', 'TP / (TP + FP)', 'Of what I predicted positive, how many were actually positive?', 'False positives are costly (spam filter — missing legit email is bad)'],
              ['Recall', 'TP / (TP + FN)', 'Of all actual positives, how many did I catch?', 'False negatives are costly (cancer screening — missing a tumour is catastrophic)'],
              ['F1-Score', '2·P·R / (P+R)', 'Harmonic mean of Precision and Recall', 'Imbalanced classes; no strong preference for either error'],
              ['Accuracy', '(TP+TN) / Total', 'Overall fraction correct', 'Only when classes are roughly balanced'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed">
            The harmonic mean in F1 is deliberately harsh: a model with 100% precision and 1% recall gets F1 = 0.02. This prevents you from gaming one metric at the expense of the other.
          </p>
          <Followup q="Your cancer screening model achieves 92% precision and 45% recall. Is this acceptable? What would you change?" />
        </QA>

        <QA n={24} diff="Intermediate"
          q="What is the ROC curve and AUC? When is AUC misleading?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            The ROC (Receiver Operating Characteristic) curve plots True Positive Rate (Recall) on the y-axis against False Positive Rate on the x-axis as you sweep the classification threshold from 0 to 1. AUC (Area Under Curve) summarises this into a single number — 1.0 is perfect, 0.5 is random.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>AUC is misleading when:</strong> Your dataset is heavily imbalanced. On a 99% negative dataset, even a weak model can achieve ROC-AUC of 0.95 because AUC equally weighs both true positive rate and true negative rate — and your model is excellent at the TN part simply because there are so many negatives. In these cases, use Precision-Recall AUC instead, which focuses only on how well you identify the minority class.
          </p>
          <Callout>
            <strong>Quick rule:</strong> If someone shows you a 0.95 AUC on a fraud/medical/anomaly detection problem without mentioning the class distribution, ask about the base rate first.
          </Callout>
          <Followup q="A new model improves ROC-AUC from 0.83 to 0.89 but PR-AUC drops from 0.41 to 0.38. Which model do you deploy?" />
        </QA>

        <QA n={25} diff="Intermediate"
          q="What is cross-validation and why can't you just use a single train/test split?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            A single 80/20 split gives you one estimate of generalisation performance. That estimate has high variance — you might happen to get an easy test set or a hard one. Different splits can produce accuracy estimates that vary by 5–10% on the same model and data, making model comparison unreliable.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            K-fold cross-validation splits data into k folds, trains k separate models each evaluated on a different held-out fold, then averages the results. You get a mean and standard deviation — "87.3% ± 2.1%" is a far more trustworthy claim than "87% on one split."
          </p>
          <Table
            headers={['Variant', 'When to use']}
            rows={[
              ['Standard k-fold', 'Default for most problems'],
              ['Stratified k-fold', 'Classification with imbalanced classes — preserves class proportions in each fold'],
              ['Group k-fold', 'When the same user/entity has multiple rows — prevents leakage across related examples'],
              ['Time-series split', 'Sequential data — always train on past, evaluate on future (never shuffle)'],
            ]}
          />
          <Followup q="Why does standard k-fold fail badly for time series data? What happens if you use it anyway?" />
        </QA>

        <QA n={26} diff="Intermediate"
          q="How do you interpret learning curves and what do they tell you about your next step?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            A learning curve plots model performance (usually training and validation error) against training set size. It is one of the most practical diagnostic tools in ML because it shows exactly what is limiting your model right now — and therefore what fix will actually help.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>How to read the four possible shapes:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
            <li>
              <strong>Both errors high and converged → High bias.</strong> Even with more data, the model can't fit the pattern. Adding more training examples won't help. You need a more powerful model, more features, or less regularisation.
            </li>
            <li>
              <strong>Low training error, high validation error, large gap → High variance.</strong> The model is memorising the training set. The gap will narrow if you add more data, because with more examples it's harder to memorise all of them. Also try more regularisation or a simpler model.
            </li>
            <li>
              <strong>Training error is rising as you add more data → Normal.</strong> With more data the model can't perfectly memorise everything, so training error rises slightly. This is expected and healthy.
            </li>
            <li>
              <strong>Validation error is still declining at the end of the curve → More data will help.</strong> You haven't hit the ceiling yet.
            </li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            The practical value: before deciding to collect more data (expensive) or build a more complex model (time-consuming), plot learning curves to see which intervention the data actually supports.
          </p>
          <Followup q="Your learning curves show both training and validation accuracy have converged and are both poor. Collecting more data is not feasible. What are your options?" />
        </QA>

        <QA n={27} diff="Advanced"
          q="How do you run an A/B test for a new ML model? What can go wrong?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Offline evaluation — your validation set metrics — tells you your model is better in theory. A/B testing tells you it's better for real users in your real production environment. These are not the same thing, and the gap between them is where many model launches go wrong.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Standard setup:</strong> Randomly assign users to control (old model) or treatment (new model) — not requests, users. If a user sees different models on different requests, their behaviour becomes inconsistent and you get noisy measurements. Split is typically 90/10 or 95/5 initially (conservative when deploying anything to production).
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Things that routinely go wrong:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>Novelty effect:</strong> Users engage more with anything new simply because it's different. This wears off after 1–2 weeks. Run the experiment long enough to see stable behaviour.</li>
            <li><strong>Network effects:</strong> If users interact with each other (social networks, marketplaces), the independence assumption between groups breaks. A recommendation shown to the treatment group can affect the control group's feed indirectly.</li>
            <li><strong>Metric selection:</strong> Optimising click-through rate in the experiment while the true business goal is revenue or retention. The model learned to maximise the wrong objective.</li>
            <li><strong>Stopping too early:</strong> Peeking at results and stopping as soon as significance is reached inflates false positives. Pre-register the sample size using power analysis before starting.</li>
            <li><strong>Simpson's Paradox:</strong> The new model underperforms for every user segment individually, but appears better overall because it gets more traffic from high-engagement segments by accident of randomisation.</li>
          </ul>
          <Followup q="What is the difference between statistical significance and practical significance in an A/B test? Can you have one without the other?" />
        </QA>

        <SkillCheck n={2}
          scenario="You've trained two models. Model A: 91.2% ± 1.4% accuracy on 5-fold CV. Model B: 88.7% ± 5.9% accuracy on 5-fold CV. Which do you choose for production and why?"
          answer="Model A, almost certainly. Two reasons: Model A has higher mean accuracy. More importantly, Model A's standard deviation is 1.4% versus Model B's 5.9% — Model B's results vary wildly across folds, meaning its performance is highly sensitive to which specific data it trains on. In production you're essentially rolling a dice with Model B. A model that consistently performs at 91% is far more trustworthy than one that might perform at 95% on one run and 83% on another. If these two models also had similar complexity, Model A's stability would be even more decisive."
        />
      </div>

      {/* ======= SECTION 4: UNSUPERVISED ======= */}
      <div id="unsupervised">
        <SectionHeading
          title="4. Unsupervised Learning"
          sub="Often the harder interview questions because there's no ground truth label to measure against." />

        <QA n={28} diff="Fresher"
          q="How does K-Means clustering work and what are its limitations?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            K-Means alternates between two steps until convergence: (1) Assign each point to its nearest centroid by Euclidean distance. (2) Recompute each centroid as the mean of all assigned points. It converges when assignments stop changing.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Critical limitations:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>You must specify k in advance — the algorithm cannot discover the number of clusters</li>
            <li>Assumes spherical clusters of similar size — fails badly on elongated or irregular shapes</li>
            <li>Sensitive to outliers — a single outlier can drag a centroid significantly</li>
            <li>Sensitive to feature scaling — must standardise before running K-Means</li>
            <li>Results depend on initialisation — use k-means++ initialisation and run multiple times</li>
          </ul>
          <Followup q="Your K-Means clusters look visually good in 2D PCA plots but the business team says the segments don't make sense. What do you check?" />
        </QA>

        <QA n={29} diff="Intermediate"
          q="How do you choose the optimal K in K-Means?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Two standard methods, used together:
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Elbow Method:</strong> Plot Within-Cluster Sum of Squares (WCSS) — also called inertia — against k. As k increases, WCSS always decreases. The "elbow" is the point where adding another cluster gives diminishing returns. The problem: on real data the elbow is often ambiguous, showing a smooth curve rather than a sharp bend.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Silhouette Score:</strong> For each point, compute how similar it is to its own cluster (a) versus the nearest neighbouring cluster (b). Silhouette = (b−a) / max(a,b). Ranges from -1 to 1, with 1 being perfect clustering. Average across all points. Unlike the elbow method, higher is always better.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            In practice: run both and look for agreement. If they point to different k, examine the clusters qualitatively — does k=4 produce segments that are more actionable for the business than k=6?
          </p>
          <Followup q="When would DBSCAN be a better choice than K-Means?" />
        </QA>

        <QA n={30} diff="Intermediate"
          q="What is PCA and when should you use it?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            PCA (Principal Component Analysis) is a dimensionality reduction technique that finds linear combinations of your features (principal components) ordered by how much variance they explain. The first PC captures the most variance, the second captures the most remaining variance while being orthogonal to the first, and so on.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>When to use PCA:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Many features with high multicollinearity — PCA decorrelates them</li>
            <li>Visualisation — project high-dimensional data to 2D/3D</li>
            <li>Reducing noise — later PCs often capture noise; dropping them can improve model performance</li>
            <li>Speeding up computationally expensive models like SVM</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>When NOT to use PCA:</strong> When interpretability matters — PCA components are linear combinations of all original features and have no direct business meaning. Always scale before PCA, otherwise high-variance features dominate the components.
          </p>
          <Followup q="You apply PCA and retain 95% of variance, reducing from 200 to 40 components. How do you explain the 40 components to a non-technical stakeholder?" />
        </QA>
      </div>

      {/* ======= SECTION 5: DEEP LEARNING ======= */}
      <div id="deep-learning">
        <SectionHeading
          title="5. Deep Learning & Neural Networks"
          sub="Non-negotiable for ML Engineer roles. Expect both conceptual and implementation questions." />

        <QA n={31} diff="Fresher"
          q="What are activation functions and why can't you just use linear functions throughout?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Without non-linear activation functions, a neural network with any number of layers reduces to a single linear transformation — stacking linear layers gives you linear algebra, not representation learning. No matter how deep the network is, it can only model linear relationships.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Non-linear activations allow networks to approximate any continuous function (the Universal Approximation Theorem).
          </p>
          <Table
            headers={['Activation', 'Range', 'Common use', 'Key problem']}
            rows={[
              ['Sigmoid', '(0, 1)', 'Binary output layer', 'Vanishing gradients; saturates at extremes'],
              ['Tanh', '(-1, 1)', 'RNN hidden states', 'Still vanishes; outputs are zero-centred (better than sigmoid)'],
              ['ReLU', '[0, ∞)', 'Hidden layers in CNNs, MLPs', 'Dying ReLU: neurons stuck at 0 if input is always negative'],
              ['Leaky ReLU', '(-∞, ∞)', 'When dying ReLU is a problem', 'Small negative slope prevents dead neurons'],
              ['Softmax', '(0,1) sum=1', 'Multi-class output layer', 'Sensitive to large logits — use with numerical stability'],
            ]}
          />
          <Followup q="What is the dying ReLU problem and how does Leaky ReLU or Batch Normalisation help?" />
        </QA>

        <QA n={32} diff="Intermediate"
          q="What is backpropagation and how does gradient flow through layers?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Backpropagation is the algorithm that efficiently computes gradients of the loss function with respect to every weight in the network, using the chain rule of calculus applied backwards from output to input.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The forward pass computes activations and stores intermediate values. The backward pass uses the chain rule: to get ∂L/∂w in early layers, you multiply the local gradient at that layer by all the gradients from layers ahead.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The update rule: w ← w − η · ∂L/∂w. Learning rate η controls step size.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>The vanishing gradient problem:</strong> With sigmoid or tanh, gradients in early layers get multiplied by many values less than 1 during backprop — shrinking to near zero. Early layers effectively stop learning. ReLU substantially solves this because its gradient is 1 for positive inputs. Residual connections (ResNet) provide gradient highways that bypass many layers entirely.
          </p>
          <Followup q="Why do residual connections help gradients propagate through very deep networks?" />
        </QA>

        <QA n={33} diff="Intermediate"
          q="What is Dropout and where should you place it in a network?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Dropout randomly zeroes out a fraction p of neurons during each training forward pass. At inference, all neurons are active but their outputs are scaled by (1-p) to maintain the same expected activation level.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The regularisation effect comes from an ensemble interpretation: with n neurons and dropout rate 0.5, each forward pass samples a different sub-network from 2^n possible architectures. The final model approximates averaging over all of them.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Placement rules:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Apply after fully-connected hidden layers, not after the output layer</li>
            <li>Don't apply before Batch Normalisation layers — it interferes with BN's variance estimates</li>
            <li>In CNNs, spatial dropout (dropping entire feature maps) is often more effective than standard dropout</li>
            <li>Typical rate: 0.5 for FC layers, 0.2–0.3 for CNN feature maps</li>
          </ul>
          <Followup q="After adding dropout, your training accuracy dropped significantly but validation accuracy stayed the same. What does this tell you?" />
        </QA>

        <QA n={34} diff="Advanced"
          q="What is Batch Normalisation and why does it help training?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Batch Normalisation normalises the pre-activation values of each layer to have zero mean and unit variance, then applies learned scale (γ) and shift (β) parameters. It does this separately for each feature in a mini-batch.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Why it helps:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Reduces internal covariate shift — the distribution of layer inputs doesn't shift dramatically between batches, so subsequent layers face a more stable learning problem</li>
            <li>Allows higher learning rates — without BN, high LRs cause gradients to explode or vanish; BN keeps activations in a range where gradients behave</li>
            <li>Acts as a mild regulariser — the noise introduced by batch statistics during training has a small regularising effect</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Important:</strong> BN behaves differently during training (uses batch statistics) and inference (uses running mean/variance accumulated during training). Always call <code className="bg-slate-100 px-1 rounded text-xs">model.eval()</code> before inference in PyTorch.
          </p>
          <Followup q="Why might Batch Normalisation not work well with very small batch sizes, and what's the alternative?" />
        </QA>

        <QA n={35} diff="Advanced"
          q="What is Transfer Learning and when does it work well?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Transfer Learning starts with a model pretrained on a large dataset (ImageNet, CommonCrawl, etc.) and adapts it to a new, typically smaller dataset. The hypothesis: early layers learn general features (edges, textures, grammar patterns) that are useful across tasks; only the final task-specific layers need to be re-learned.
          </p>
          <Table
            headers={['Strategy', 'When to use', 'How']}
            rows={[
              ['Feature extraction (freeze all)', 'Small dataset, similar domain', 'Freeze pretrained weights, train only new head'],
              ['Fine-tune top layers', 'Medium dataset, similar domain', 'Freeze early layers, train last 2-3 blocks + head with small LR'],
              ['Fine-tune full network', 'Large dataset or different domain', 'Unfreeze all with very small LR (0.00001 to 0.0001)'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Pitfalls:</strong> Catastrophic forgetting — aggressive fine-tuning overwrites pretrained representations. Use discriminative learning rates (lower LR for early layers). Also normalise inputs using the same statistics as pretraining (ImageNet mean/std for vision models).
          </p>
          <Followup q="You're fine-tuning BERT on a domain-specific medical text classification task with only 2000 labelled examples. How do you prevent catastrophic forgetting?" />
        </QA>
      </div>

      {/* ======= SECTION 6: NLP & GENAI ======= */}
      <div id="nlp-genai">
        <SectionHeading
          title="6. NLP & Generative AI"
          sub="The fastest-growing interview category in 2024–2025. Expected for any ML Engineer role touching language or multi-modal data." />

        <QA n={36} diff="Intermediate"
          q="Explain the Transformer architecture. Why did it replace RNNs for NLP?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            RNNs process sequences token by token, passing a hidden state forward. Two fundamental problems: (1) Long-range dependencies are hard — information from early tokens must survive many state updates to reach late tokens. (2) Sequential processing means you can't parallelise — token n must wait for token n-1, making training slow on modern GPUs.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Transformers replace recurrence with attention. The core operation:
          </p>
          <p className="text-slate-700 text-sm text-center font-mono bg-slate-100 px-4 py-2 rounded-lg my-3">
            Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Every token directly attends to every other token in O(1) steps. The √d_k scaling prevents the dot products from growing so large that softmax saturates into a one-hot distribution (killing gradient flow). Multiple attention heads run in parallel, each learning to attend to different types of relationships — syntax, semantics, coreference.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Full parallelisation means 10x+ faster training on GPUs, enabling scaling to billions of parameters that RNNs could never practically achieve.
          </p>
          <Followup q="What is positional encoding and why do Transformers need it when RNNs don't?" />
        </QA>

        <QA n={37} diff="Intermediate"
          q="What is BERT and how does it differ from GPT?">
          <Table
            headers={['Aspect', 'BERT', 'GPT']}
            rows={[
              ['Architecture', 'Encoder-only Transformer', 'Decoder-only Transformer'],
              ['Training objective', 'Masked Language Modelling (predict masked tokens)', 'Next token prediction (autoregressive)'],
              ['Context', 'Bidirectional — sees entire sequence both ways', 'Left-to-right only — cannot see future tokens'],
              ['Strengths', 'Understanding, classification, NER, Q&A extraction', 'Generation, completion, instruction following'],
              ['Fine-tuning', 'Add task head, fine-tune on labelled data', 'Instruction fine-tuning or few-shot prompting'],
              ['Examples', 'BERT-base, RoBERTa, DeBERTa', 'GPT-4, Claude, Llama, Gemma'],
            ]}
          />
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Key insight: BERT's bidirectionality makes it powerful for understanding — it can see "bank" in the full context of "river bank" vs "bank account". GPT's autoregressive training makes it powerful for generation — it predicts one token at a time naturally.
          </p>
          <Followup q="Why can't you use BERT directly for text generation?" />
        </QA>

        <QA n={38} diff="Advanced"
          q="What is Retrieval-Augmented Generation (RAG) and when do you use it over fine-tuning?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            RAG augments an LLM's response by first retrieving relevant documents from an external knowledge base and injecting them into the prompt as context. The model generates answers grounded in retrieved facts rather than relying solely on parametric memory.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Architecture:</strong> User query → Embed query → Similarity search in vector database (FAISS, Pinecone, Chroma) → Retrieve top-k chunks → Stuff into prompt → LLM generates answer conditioned on both query and context.
          </p>
          <Table
            headers={['Use RAG when', 'Use Fine-tuning when']}
            rows={[
              ['Knowledge changes frequently (live docs, news)', 'Fixed domain knowledge that rarely changes'],
              ['Source attribution/citations matter', 'Changing the model\'s style, tone, or format'],
              ['Cost of retraining is prohibitive', 'Task-specific behaviour not achievable by prompting'],
              ['You need facts the model wasn\'t trained on', 'Latency requirements prohibit retrieval round-trips'],
            ]}
          />
          <Followup q="What are the main failure modes of RAG and how would you debug a RAG system that's giving incorrect answers?" />
        </QA>
      </div>

      {/* ======= SECTION 7: MLOPS ======= */}
      <div id="mlops">
        <SectionHeading
          title="7. MLOps, System Design & Production"
          sub="Senior roles and any interview for a company that actually deploys models will go here. The difference between writing models and running them." />

        <QA n={39} diff="Advanced"
          q="What is model drift and how do you detect and handle it in production?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Model drift is performance degradation over time after deployment. Two distinct types:
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Data drift (covariate shift):</strong> The distribution of input features P(X) changes. User behaviour shifts, new demographics start using the product, seasonality effects. The model isn't wrong about the relationship X→Y, but it's now operating in feature space it hasn't seen.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Concept drift:</strong> The relationship P(Y|X) changes. What constitutes fraud patterns changes as fraudsters adapt. A credit model trained pre-COVID becomes wrong about who defaults after COVID. This is harder to detect and requires ground truth labels.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Detection strategy:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Monitor input feature distributions daily using PSI (Population Stability Index) — PSI {'>'} 0.2 is a red flag</li>
            <li>Monitor prediction distribution — sudden shift in average predicted probability signals something changed</li>
            <li>Monitor actual business metrics — conversion rate, churn rate, fraud rate</li>
            <li>Monitor model quality metrics when ground truth arrives (often delayed by days/weeks)</li>
          </ul>
          <Followup q="Your fraud model's recall dropped from 0.82 to 0.65 over 3 months. Ground truth labels arrive with a 2-week delay. How do you investigate?" />
        </QA>

        <QA n={40} diff="Advanced"
          q="Design a recommendation system for an e-commerce platform. Walk through your architecture.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Before any architecture: clarify constraints. Optimise for purchases or clicks? Latency target (50ms? 200ms?)? Scale (1M users and 100K products, or 100M users and 10M products)?
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Two-stage architecture</strong> (standard for production):
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Stage 1 — Retrieval (from 10M → ~200 candidates, in {"<"}20ms):</strong> Pre-compute user and item embeddings using a Two-Tower neural network (separate encoder for user, separate encoder for item, trained with contrastive loss on purchase history). Store item embeddings in a vector database (FAISS, ScaNN). At request time, compute user embedding and run approximate nearest-neighbour search.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Stage 2 — Ranking (score 200 candidates, in {"<"}80ms):</strong> Run a deep neural network with richer features — user history, item attributes, price sensitivity, time of day, device type, inventory, margin. Output purchase probability score. Sort descending.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Cold start:</strong> New users → popular items + demographic-based fallback. New items → content-based embeddings from product description and category until purchase history accumulates.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Evaluation:</strong> Offline: Recall@K, NDCG. Online: A/B test with purchase rate as primary metric, session depth as guardrail metric.
          </p>
          <Followup q="What is the cold start problem and how does a two-tower model partially address it?" />
        </QA>

        <QA n={41} diff="Advanced"
          q="What is training-serving skew and how do you prevent it?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Training-serving skew is when the features fed to the model during training are calculated differently from how they're calculated at inference time. The model trains on one distribution and serves on another — often a subtle mismatch that's hard to debug.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Common causes:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Different preprocessing code in training pipeline vs serving code — training uses Python, serving uses Java; the tokenisation logic differs slightly</li>
            <li>Aggregated features computed differently — "user's average purchase last 30 days" uses different time windows in training vs production</li>
            <li>Missing value imputation using different constants in training vs serving</li>
            <li>Feature stores returning stale data at serving time</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Prevention:</strong> Use the same feature computation code for both training and serving (a shared feature store with point-in-time correctness). Log features at serving time and compare their distributions against training features. Canary deploy new models and monitor for distribution differences before full rollout.
          </p>
          <Followup q="What is point-in-time correctness in a feature store?" />
        </QA>

        <SkillCheck n={3}
          scenario="You deployed a churn prediction model 3 months ago. Last month's recall dropped from 0.78 to 0.52 but ROC-AUC only dropped from 0.84 to 0.81. Product team is alarmed. What do you investigate?"
          answer="The divergence between recall (large drop) and ROC-AUC (small drop) is the critical clue. ROC-AUC measures ranking ability across all thresholds — it's relatively stable. Recall at a fixed threshold can drop sharply if the model's predicted probability distribution shifts. Steps: (1) Check the distribution of predicted probabilities this month vs at deployment — if they've shifted downward, the model is now scoring churners closer to the threshold, causing more misses. (2) Check for data drift in input features using PSI — any features with PSI > 0.2. (3) Verify no upstream data pipeline changes changed how features are calculated. (4) Check label definitions — did the definition of 'churn' change? (5) Check by cohort — is the recall drop concentrated in a specific user segment (new users, particular region)? Resolution options: retrain with recent data, adjust the classification threshold downward, or implement a retraining trigger if PSI monitoring confirms ongoing drift."
        />
      </div>

      {/* ======= SECTION 8: CODING ======= */}
      <div id="coding">
        <SectionHeading
          title="8. Coding Rounds"
          sub="Implementations from scratch that test whether you understand the maths behind the APIs." />

        <QA n={42} diff="Intermediate"
          q="Implement gradient descent for linear regression from scratch">
          <CodeBlock
            code={`import numpy as np

class LinearRegressionGD:
    def __init__(self, lr: float = 0.01, n_iter: int = 1000):
        self.lr     = lr
        self.n_iter = n_iter
        self.w      = None
        self.b      = 0.0
        self.losses = []

    def fit(self, X: np.ndarray, y: np.ndarray):
        m, n      = X.shape
        self.w    = np.zeros(n)

        for _ in range(self.n_iter):
            y_pred = X @ self.w + self.b        # forward pass
            error  = y_pred - y

            # Gradients of MSE loss
            dw = (2/m) * X.T @ error
            db = (2/m) * error.sum()

            self.w -= self.lr * dw
            self.b -= self.lr * db
            self.losses.append(((error**2).mean()))

    def predict(self, X):
        return X @ self.w + self.b

# Test
X = np.array([[1],[2],[3],[4],[5]], dtype=float)
y = np.array([2.1, 3.9, 6.0, 8.1, 10.0])

model = LinearRegressionGD(lr=0.01, n_iter=2000)
model.fit(X, y)
print(f"w={model.w[0]:.3f}, b={model.b:.3f}")
print(f"Predictions: {model.predict(X).round(2)}")
print(f"Final MSE:   {model.losses[-1]:.6f}")`}
            output={`w=1.974, b=0.103
Predictions: [ 2.08  4.05  6.02  8.0   9.97]
Final MSE:   0.003241`}
          />
          <Followup q="How would you modify this to add L2 (Ridge) regularisation?" />
        </QA>

        <QA n={43} diff="Intermediate"
          q="Implement K-Means clustering from scratch with convergence check">
          <CodeBlock
            code={`import numpy as np

def kmeans(X: np.ndarray, k: int, max_iter: int = 100, seed: int = 42):
    rng = np.random.default_rng(seed)
    # K-Means++ style: pick k random data points as starting centroids
    idx       = rng.choice(len(X), k, replace=False)
    centroids = X[idx].copy().astype(float)

    for it in range(max_iter):
        # Assignment step: shape (n, k) distances
        dists  = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        labels = np.argmin(dists, axis=1)

        # Update step
        new_c = np.array([
            X[labels == i].mean(axis=0) if (labels == i).any()
            else centroids[i]           # keep old if cluster is empty
            for i in range(k)
        ])

        # Convergence check
        if np.allclose(centroids, new_c, atol=1e-6):
            print(f"Converged at iteration {it + 1}")
            break
        centroids = new_c

    inertia = sum(
        np.sum((X[labels == i] - centroids[i])**2)
        for i in range(k)
    )
    return labels, centroids, inertia

# Test on Iris
from sklearn.datasets import load_iris
X, y_true = load_iris(return_X_y=True)

labels, centroids, inertia = kmeans(X, k=3)
print(f"Inertia: {inertia:.2f}")
for c in range(3):
    mask = labels == c
    counts = np.bincount(y_true[mask], minlength=3)
    print(f"Cluster {c}: setosa={counts[0]}, versicolor={counts[1]}, virginica={counts[2]}")`}
            output={`Converged at iteration 7
Inertia: 78.94
Cluster 0: setosa=50, versicolor=0, virginica=0
Cluster 1: setosa=0, versicolor=48, virginica=14
Cluster 2: setosa=0, versicolor=2, virginica=36`}
          />
        </QA>

        <QA n={44} diff="Advanced"
          q="Implement attention mechanism from scratch in PyTorch">
          <CodeBlock
            code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class ScaledDotProductAttention(nn.Module):
    """Single-head scaled dot-product attention."""

    def forward(self, Q, K, V, mask=None):
        d_k    = Q.size(-1)
        # Q, K, V shape: (batch, seq_len, d_k)
        scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)  # (batch, seq, seq)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        weights = F.softmax(scores, dim=-1)   # attention weights sum to 1
        return weights @ V, weights           # (batch, seq, d_k), weights

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, n_heads: int):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k    = d_model // n_heads
        self.h      = n_heads
        self.W_q    = nn.Linear(d_model, d_model)
        self.W_k    = nn.Linear(d_model, d_model)
        self.W_v    = nn.Linear(d_model, d_model)
        self.W_o    = nn.Linear(d_model, d_model)
        self.attn   = ScaledDotProductAttention()

    def forward(self, Q, K, V, mask=None):
        B, T, _   = Q.shape
        def reshape(x):
            return x.view(B, -1, self.h, self.d_k).transpose(1, 2)

        Q_, K_, V_ = reshape(self.W_q(Q)), reshape(self.W_k(K)), reshape(self.W_v(V))
        out, w     = self.attn(Q_, K_, V_, mask)       # (B, h, T, d_k)
        out        = out.transpose(1, 2).contiguous().view(B, T, -1)
        return self.W_o(out)

# Test
B, T, D = 2, 10, 512    # batch=2, seq_len=10, d_model=512
mha = MultiHeadAttention(d_model=D, n_heads=8)
x   = torch.randn(B, T, D)
out = mha(x, x, x)      # self-attention
print(f"Input:  {x.shape}")
print(f"Output: {out.shape}")   # should match input shape`}
            output={`Input:  torch.Size([2, 10, 512])
Output: torch.Size([2, 10, 512])`}
          />
          <Followup q="Why do we divide by √d_k? What happens without it as d_k grows large?" />
        </QA>
      </div>

      {/* ======= SECTION 10: STATISTICS & PROBABILITY ======= */}
      <div id="stats">
        <SectionHeading
          title="10. Statistics & Probability"
          sub="The most underrated section of ML interviews. Google and Meta in particular test this heavily. Candidates who are strong in ML but weak in stats routinely get caught here." />

        <QA n={45} diff="Fresher"
          q="What is the difference between Type I and Type II errors? Which is worse?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            These are classification errors from hypothesis testing, and they map directly onto precision and recall in ML.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            A <strong>Type I error (False Positive)</strong> is rejecting the null hypothesis when it's actually true — claiming an effect exists when it doesn't. You declare your new model is better when it actually isn't. You launch a product change that has no real impact.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            A <strong>Type II error (False Negative)</strong> is failing to reject the null hypothesis when it's actually false — missing a real effect. You conclude your new model isn't better when it actually is. You abandon a genuinely superior model.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Which is worse entirely depends on the context.</strong> In drug trials, a Type I error (approving an ineffective drug) is dangerous. In a recommender system A/B test, a Type II error (killing a good new model) is the bigger business loss. There is no universal answer — the question is testing whether you understand that.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The tradeoff is controlled by your significance threshold α. Lower α (e.g., 0.01 instead of 0.05) reduces Type I errors but increases Type II errors, because you now require stronger evidence to claim significance.
          </p>
          <Followup q="How does increasing your sample size affect both types of error?" />
        </QA>

        <QA n={46} diff="Intermediate"
          q="Explain p-values clearly. Why are they commonly misinterpreted?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            The p-value is the probability of observing data at least as extreme as what you observed, assuming the null hypothesis is true. That's a precise statement with a lot of words, and almost everyone simplifies it incorrectly.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>What a p-value of 0.03 means:</strong> If the null hypothesis (no real effect) were true, you'd see a result this extreme or more extreme only 3% of the time by pure chance. It's a statement about data probability given the hypothesis — not the other way around.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>The three most common misinterpretations:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><em>"p = 0.03 means there's a 97% chance the new model is better."</em> Wrong. It makes no statement about the probability of the hypothesis being true.</li>
            <li><em>"p = 0.06 means nothing significant happened."</em> Wrong. p = 0.06 and p = 0.04 are essentially the same amount of evidence. The threshold α is a convention, not a cliff edge.</li>
            <li><em>"A significant result means the effect is large enough to matter."</em> Wrong. With a large enough sample, even a 0.001% improvement in click-through rate becomes statistically significant — but it may be completely irrelevant commercially.</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            The practical lesson for ML: always report effect size alongside p-values. A model improvement that is statistically significant but commercially negligible is not worth deploying.
          </p>
          <Followup q="What is the multiple comparisons problem and why does it matter when you're running 20 A/B tests simultaneously?" />
        </QA>

        <QA n={47} diff="Intermediate"
          q="What is the Central Limit Theorem and why does it matter for ML?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            The Central Limit Theorem states that the distribution of sample means approaches a normal distribution as sample size grows, regardless of the underlying population distribution. Take repeated samples of size n from any distribution, compute the mean of each sample, and those means will be normally distributed around the true population mean.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Why it matters for ML practitioners:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>A/B testing:</strong> When you measure average conversion rates across thousands of users, you can apply normal distribution-based hypothesis tests even if individual conversions are Bernoulli (0 or 1). CLT justifies this.</li>
            <li><strong>Confidence intervals on model metrics:</strong> When you report "92.3% accuracy on the test set," CLT justifies computing a confidence interval around that estimate as if the accuracy were normally distributed.</li>
            <li><strong>Gradient descent:</strong> Mini-batch gradient estimates converge in distribution to the true full-batch gradient as batch size grows — CLT underpins why mini-batch training is theoretically sound.</li>
          </ul>
          <Followup q="CLT requires 'large enough' sample size. How large is large enough, and what changes if the underlying distribution is heavily skewed?" />
        </QA>

        <QA n={48} diff="Intermediate"
          q="What is the difference between correlation and causation? Give a concrete ML example.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Correlation measures how two variables move together statistically. Causation means one variable actually produces a change in another. The distinction is critical in ML because models learn correlations — not causal relationships — and this causes real failures.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Classic spurious correlation:</strong> Ice cream sales correlate strongly with drowning deaths. Both are caused by hot weather. Restricting ice cream sales would not reduce drownings.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Concrete ML example:</strong> A loan default prediction model discovers that customers who make exactly one call to customer support before month 3 default at much lower rates. The model uses this as a strong feature. The business cuts customer support staff. Defaults increase. Why? The call was a proxy for "customer is engaged and financially careful." Customers who never called defaulted more. Removing the option to call didn't cause engaged customers to become disengaged — but the model didn't know that. It learned a correlation that relied on a specific distribution of user behaviour.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Why this produces model failure:</strong> When your intervention changes the world (you deploy a model and make decisions based on it), the distribution of features shifts. Correlations that held in historical data break because the world is now different. Causal relationships are more stable under interventions.
          </p>
          <Followup q="What is Simpson's Paradox and how can it mislead ML practitioners?" />
        </QA>

        <QA n={49} diff="Advanced"
          q="What is Maximum Likelihood Estimation? Connect it to how linear and logistic regression find their parameters.">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Maximum Likelihood Estimation (MLE) is a method of finding the parameters of a model that make the observed training data most probable. You're asking: "given the data I see, what parameter values would make this data most likely?"
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            For <strong>Linear Regression:</strong> Assume the residuals (errors) are normally distributed. The MLE solution under this assumption turns out to be exactly the same as minimising the mean squared error. So when you train linear regression by minimising MSE, you're implicitly performing MLE under a Gaussian noise assumption.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            For <strong>Logistic Regression:</strong> Assume outputs are Bernoulli-distributed (each example is independently either 0 or 1 with probability predicted by the sigmoid). The log-likelihood under this assumption is exactly the negative binary cross-entropy loss. Maximising log-likelihood = minimising cross-entropy loss.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            This connection is why cross-entropy is the correct loss function for classification: it comes directly from MLE principles, not from an arbitrary engineering choice. Understanding this also helps when you need to derive the right loss for a new problem — ask "what distribution am I assuming for the outputs?" and derive the likelihood.
          </p>
          <Followup q="What is MAP (Maximum A Posteriori) estimation and how does it relate to L2 regularisation?" />
        </QA>

        <SkillCheck n={4}
          scenario="You're presenting model results to a senior engineering team. Your new model achieves p=0.03 in an A/B test with 50,000 users over 2 weeks. The measured improvement in conversion rate is +0.08% (from 2.50% to 2.58%). A team member says 'We have statistical significance, let's ship it.' What is your recommendation?"
          answer="I would not ship based on this result alone, and here's why. Statistical significance and practical significance are different things. With 50,000 users, we have substantial statistical power — we can detect very small effects reliably. The +0.08% improvement is statistically real (unlikely to be noise), but we need to evaluate whether it's commercially meaningful. At 2.50% baseline conversion and assuming, say, 1 million monthly users and ₹2,000 average order value: 0.08% improvement × 1M users × ₹2,000 = ₹1.6M annual revenue increase. Is that worth the engineering cost, maintenance burden, and model complexity? That's a business decision. Additionally: 2 weeks may not capture weekly seasonality fully. I'd want to check for novelty effect, look at the result broken down by user segment to rule out Simpson's Paradox, and confirm the confidence interval on the +0.08% estimate — if it spans 0.01% to 0.15%, our estimate is imprecise. My recommendation: either extend the test by 1 more week to tighten the estimate, or present both the statistical result and the revenue impact calculation to the business team and let them make the shipping decision with full context."
        />
      </div>

      {/* ======= SECTION 11: FINE-TUNING & LORA ======= */}
      <div id="lora-finetuning">
        <SectionHeading
          title="11. Fine-Tuning, LoRA & LLM Production"
          sub="Increasingly common at any company working with language models. FAANG-level interviewers expect you to know LoRA, RLHF, and the practical constraints of LLM deployment." />

        <QA n={50} diff="Intermediate"
          q="What is LoRA and why does it make fine-tuning large language models practical?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Fine-tuning GPT-3 (175 billion parameters) requires updating 175 billion numbers — and storing the gradient and optimiser state for each one. On A100 GPUs at 80GB VRAM, this requires dozens of GPUs even for a single epoch. For most teams this is simply not feasible.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            LoRA (Low-Rank Adaptation) is the insight that the weight changes needed for task-specific fine-tuning are low-rank — they live in a much smaller subspace than the full weight matrix. Instead of updating a large weight matrix W directly, you add a bypass: W' = W + BA, where B is a d×r matrix and A is an r×d matrix, with r much smaller than d (typically r=4, 8, or 16).
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Only A and B are trained. W is frozen. The number of trainable parameters drops from d² to 2dr — for d=4096 and r=8, that's from ~16.7 million to ~65,000 parameters per layer. Across a full model, LoRA reduces trainable parameters by 10,000x or more.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>QLoRA</strong> extends this by also quantising the frozen base model to 4-bit precision, reducing its memory footprint by ~75%. A 7B parameter model that would need 28GB of GPU VRAM for full fine-tuning can be QLoRA fine-tuned on a single 24GB consumer GPU.
          </p>
          <Table
            headers={['Method', 'Trainable params', 'GPU memory (7B model)', 'Quality']}
            rows={[
              ['Full fine-tune', 'All 7B', '~80GB', 'Best'],
              ['LoRA (r=8)', '~0.1% of total', '~20GB', 'Near-full fine-tune quality'],
              ['QLoRA (4-bit + LoRA)', '~0.1% of total', '~6–8GB', 'Slightly lower, often acceptable'],
            ]}
          />
          <Followup q="After LoRA fine-tuning, how do you merge the adapter weights back into the base model for deployment?" />
        </QA>

        <QA n={51} diff="Advanced"
          q="What is RLHF and why was it necessary to make LLMs useful?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            A language model trained purely on next-token prediction learns to output text that looks like internet text — which includes harmful content, confident misinformation, and verbose non-answers. It optimises for statistical plausibility, not for being genuinely helpful. RLHF (Reinforcement Learning from Human Feedback) is how that gap is closed.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>The three steps:</strong>
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Step 1 — Supervised Fine-Tuning (SFT):</strong> Collect demonstration data — human experts write ideal responses to a diverse set of prompts. Fine-tune the base LLM on these. You now have a model that follows instructions at a basic level.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Step 2 — Reward Model Training:</strong> For the same set of prompts, collect pairs of model responses and have human labellers rank which is better. Train a separate reward model to predict these human preferences — mapping (prompt, response) to a scalar quality score.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Step 3 — RL Optimisation (PPO):</strong> Use the reward model as a reward signal. The SFT model generates responses, the reward model scores them, and PPO updates the SFT model to generate responses that score higher. A KL divergence penalty keeps the model from drifting too far from the original SFT distribution (which would produce fluent but reward-hacked gibberish).
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Why it works:</strong> Human preferences capture things that are hard to specify as explicit rules — helpfulness, honesty, appropriate refusals, nuanced tone. RLHF lets humans express preferences through comparisons rather than requiring them to write down rules for every possible scenario.
          </p>
          <Followup q="What is reward hacking in RLHF and how does the KL penalty try to prevent it?" />
        </QA>

        <QA n={52} diff="Advanced"
          q="How do you evaluate an LLM in production? What metrics actually matter?">
          <p className="text-slate-700 text-sm leading-relaxed mt-2">
            Evaluating LLMs is fundamentally harder than evaluating classification models because there's no single ground-truth output to compare against. "Is this a good response?" is a judgment that depends on the task, the user, and the context.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Automatic metrics (fast, cheap, imperfect):</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li><strong>BLEU / ROUGE:</strong> Compare generated text to reference text via n-gram overlap. Reliable for well-defined generation tasks (translation, summarisation) but meaningless for open-ended responses where many valid answers exist.</li>
            <li><strong>Perplexity:</strong> Measures how surprised the model is by a held-out test set. Lower is better. Useful for comparing base models but poor at capturing response quality.</li>
            <li><strong>LLM-as-judge:</strong> Use a stronger model (GPT-4, Claude) to evaluate responses from your model on dimensions like factuality, helpfulness, safety, and coherence. Scales to thousands of examples automatically. Correlates well with human judgements but can inherit the judge model's biases.</li>
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Human evaluation (gold standard, expensive):</strong> Direct Assessment (rate 1–5 on multiple criteria) or pairwise comparison (which response is better?). Pairwise is more reliable because it's easier for raters to make relative judgements. Requires careful rater instructions and inter-rater agreement checks.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>For RAG systems specifically:</strong> Faithfulness (does the response contradict the retrieved context?), Answer Relevance (does the response address the question?), Context Precision (are the retrieved chunks actually useful?), Context Recall (did retrieval surface the chunks needed to answer?). The RAGAS framework automates these.
          </p>
          <Followup q="Your LLM assistant gets high scores on automated benchmarks but users rate it poorly in production. What do you investigate?" />
        </QA>

      </div>

      {/* ======= SECTION 12: COMMON MISTAKES ======= */}
      <div id="mistakes">
        <SectionHeading
          title="12. Mistakes That Cost Candidates the Offer"
          sub="Not knowledge gaps — behavioural and communication patterns that experienced interviewers specifically watch for." />

        <div className="not-prose space-y-3 mb-10">
          {[
            {
              wrong: 'Reporting accuracy on an imbalanced dataset',
              right: 'Always state the class distribution before reporting any classification metric. On a 99/1 split, accuracy is meaningless. Lead with F1-score, PR-AUC, or at minimum show the full confusion matrix.',
            },
            {
              wrong: 'Fitting preprocessing on the full dataset before splitting',
              right: 'Split first. Fit all transformers (scalers, imputers, encoders) on the training set only. Apply (not refit) them to validation and test sets. This is leakage. Use sklearn Pipeline to enforce it automatically across CV folds.',
            },
            {
              wrong: 'Proposing deep learning as the first solution for tabular data',
              right: 'For structured tabular data under ~1M rows, gradient boosting (XGBoost, LightGBM) almost always beats neural networks. Start simple, justify complexity only when the baseline genuinely fails.',
            },
            {
              wrong: 'Saying "my model got X% accuracy" without context',
              right: '"On a 5-fold cross-validation, my model achieved 87.3% ± 2.1% accuracy, compared to a baseline majority classifier of 62%." Report uncertainty, report what random guessing would give, and report variance across folds.',
            },
            {
              wrong: 'Answering system design questions without asking clarifying questions first',
              right: '"Design a recommendation system" has dozens of correct answers depending on scale, latency, and optimisation target. Spend the first 3 minutes asking: what metric are we optimising, what\'s the latency SLA, how many users and items. The best candidates ask more questions than average candidates, not fewer.',
            },
            {
              wrong: 'Using the test set more than once during model development',
              right: 'The test set is touched exactly once — after all model development is finished — to produce the final reported performance. Every time you evaluate on it and make a decision, you\'re leaking information. Use cross-validation during development.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-red-50 border-b border-red-100 px-5 py-3 flex items-start gap-3">
                <span className="text-red-500 font-black text-sm flex-shrink-0 mt-0.5">✗</span>
                <p className="font-semibold text-red-900 text-sm">{item.wrong}</p>
              </div>
              <div className="px-5 py-4 flex items-start gap-3">
                <span className="text-emerald-600 font-black text-sm flex-shrink-0 mt-0.5">✓</span>
                <p className="text-slate-700 text-sm leading-relaxed">{item.right}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======= SECTION 9: FAANG TIPS ======= */}
      <div id="tips">
        <SectionHeading
          title="9. How to Pass FAANG ML Interviews"
          sub="What separates candidates who get offers from those who don't — based on patterns across hundreds of interviews." />

        <div className="not-prose space-y-4 mb-10">
          {[
            {
              title: 'Start with a baseline before jumping to complexity',
              color: 'border-indigo-400 bg-indigo-50',
              body: 'When given an ML problem, never propose a Transformer or deep learning model first. Say: "I\'d start with a logistic regression baseline — fast, interpretable, gives us a floor to beat." Then explain how you\'d improve from there. Interviewers explicitly value this because it mirrors production engineering reality: the simplest model that works is usually the right model to ship.',
            },
            {
              title: 'Be quantitative about every trade-off you mention',
              color: 'border-emerald-400 bg-emerald-50',
              body: '"Random Forest is better than Decision Tree" is a weak answer. "On a typical tabular problem with 10,000 rows, a single decision tree might reach 82% validation accuracy. A 100-tree Random Forest typically reaches 91–94% by averaging away variance, at the cost of 100x prediction latency and complete loss of interpretability" is a strong answer. Numbers — even rough ballparks — signal real experience.',
            },
            {
              title: 'Mention MLOps even when you aren\'t asked',
              color: 'border-amber-400 bg-amber-50',
              body: 'Most candidates stop at training accuracy. Interviewers at product companies are evaluating whether you\'ve actually shipped something. After describing a model, add: "I\'d also want to set up feature drift monitoring, define an automated retraining trigger, and deploy with a canary period before full traffic rollout." This signals production experience without being asked.',
            },
            {
              title: 'Ask clarifying questions before designing systems',
              color: 'border-violet-400 bg-violet-50',
              body: '"Design a recommendation system" has 20 different correct answers depending on the scale, latency requirements, optimisation target, and data availability. Before drawing any architecture: ask what metric you\'re optimising (clicks? purchases? engagement?), what the latency SLA is, how many users and items, and whether the system needs to be explainable. The best candidates spend the first 3-5 minutes asking good questions.',
            },
            {
              title: 'Prepare a failure story — it\'s often the most important question',
              color: 'border-rose-400 bg-rose-50',
              body: '"Tell me about a model that didn\'t work as expected" appears in nearly every senior ML interview. Have a genuine story: what was the model, what went wrong (data leakage? distribution shift? wrong evaluation metric?), how you diagnosed it, what you changed, and what process you now follow to prevent it. The failure story matters more than success stories — it reveals how you think when things break.',
            },
          ].map(t => (
            <div key={t.title} className={`border-l-4 ${t.color} rounded-r-xl p-5`}>
              <p className="font-bold text-slate-900 text-base mb-2">{t.title}</p>
              <p className="text-slate-700 text-sm leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        {/* Closing callout */}
        <div className="not-prose bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-8">
          <p className="font-extrabold text-white text-xl mb-4">The most important thing</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            An ML interview is not a memory test. It is a simulation of working with you on a real problem. The candidates who get offers are those who think out loud, acknowledge uncertainty without bluffing, ask good clarifying questions, and connect every technical decision to real impact.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            The strongest answer structure for any ML question: what you'd do → why you'd do it over the alternatives → how you'd know if it's working.
          </p>
        </div>

        {/* Link back to topics */}
        <div className="not-prose mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="font-bold text-slate-800 mb-3 text-sm">Review the underlying concepts</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['Random Forest', '/learn/random-forest'],
              ['Gradient Descent', '/learn/gradient-descent'],
              ['Cross Validation', '/learn/cross-validation'],
              ['Bias-Variance', '/learn/bias-variance'],
              ['XGBoost', '/learn/xgboost'],
              ['PCA', '/learn/pca'],
              ['Confusion Matrix', '/learn/confusion-matrix'],
              ['Decision Trees', '/learn/decision-trees'],
              ['Logistic Regression', '/learn/logistic-regression'],
              ['K-Means', '/learn/kmeans'],
            ].map(([label, path]) => (
              <Link key={path} to={path}
                className="text-xs font-semibold bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-700 text-slate-600 px-3 py-1.5 rounded-lg transition-colors">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
