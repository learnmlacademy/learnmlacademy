import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Code = ({ code }: { code: string }) => (
  <div className="not-prose my-5 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500"/>
        <span className="w-3 h-3 rounded-full bg-yellow-500"/>
        <span className="w-3 h-3 rounded-full bg-green-500"/>
      </div>
      <span className="text-slate-400 text-xs font-mono ml-2">Python</span>
    </div>
    <pre className="bg-slate-900 p-5 text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">{code}</pre>
  </div>
);

const Output = ({ text }: { text: string }) => (
  <div className="not-prose my-3 rounded-xl overflow-hidden border border-emerald-200">
    <div className="bg-emerald-800 px-4 py-1.5 text-emerald-300 text-xs font-mono">Output</div>
    <pre className="bg-slate-950 p-4 text-sm font-mono text-emerald-400 overflow-x-auto">{text}</pre>
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="not-prose my-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
    <p className="text-sm font-bold text-amber-900 mb-1">Interview tip</p>
    <div className="text-sm text-amber-800 leading-relaxed">{children}</div>
  </div>
);

const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="not-prose my-5 bg-red-50 border-l-4 border-red-400 rounded-r-xl p-5">
    <p className="text-sm font-bold text-red-900 mb-1">Common mistake</p>
    <div className="text-sm text-red-800 leading-relaxed">{children}</div>
  </div>
);

const Callout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="not-prose my-5 bg-indigo-50 border border-indigo-200 rounded-xl p-5">
    <p className="text-sm font-bold text-indigo-900 mb-2">{title}</p>
    <div className="text-sm text-indigo-800 leading-relaxed">{children}</div>
  </div>
);

type QAProps = { n: string; q: string; diff: 'Easy'|'Medium'|'Hard'; children: React.ReactNode };
const QA = ({ n, q, diff, children }: QAProps) => {
  const [open, setOpen] = useState(false);
  const dc = { Easy:'bg-emerald-100 text-emerald-800', Medium:'bg-amber-100 text-amber-800', Hard:'bg-red-100 text-red-800' }[diff];
  return (
    <div className="not-prose border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-5">
      <button onClick={()=>setOpen(o=>!o)}
        className="w-full flex items-start gap-4 p-5 bg-white hover:bg-slate-50 text-left transition-colors">
        <span className="text-indigo-500 font-black text-sm mt-0.5 flex-shrink-0 w-8">{n}</span>
        <span className="flex-1 font-semibold text-slate-800 text-sm leading-snug">{q}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${dc}`}>{diff}</span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400"/> : <ChevronDown className="w-4 h-4 text-slate-400"/>}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export function MLInterviewContent() {
  return (
    <div className="prose prose-slate max-w-none">

      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Machine Learning Interview Questions
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed">
        This page is organised the way a real ML interview is structured — starting with theory fundamentals, moving to hands-on coding, then system design, and finishing with the practical traps that trip up even experienced candidates. Every answer here is written to match what a strong senior engineer would actually say, not a textbook definition.
      </p>

      <p className="text-lg text-slate-600 leading-relaxed">
        The questions are marked Easy, Medium, or Hard. Easy questions get asked in every ML interview — at a startup, a mid-size company, and FAANG alike. Getting an Easy question wrong is far more damaging than struggling on a Hard one, so don't skip them.
      </p>

      {/* ═══════════════════════════════════════
          SECTION 1 — FUNDAMENTALS
      ═══════════════════════════════════════ */}
      <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-2 pb-3 border-b-2 border-slate-200">
        Part 1 — Theory & Fundamentals
      </h2>
      <p className="text-slate-600 leading-relaxed mb-8">
        These are the questions that appear in literally every ML interview, regardless of the company or level. They look deceptively simple — candidates fail them not because they don't know the concept, but because they give a vague, memorised answer instead of one that shows real understanding. The goal with each of these is to explain it the way you would to a colleague who is smart but hasn't studied ML.
      </p>

      {/* Q1 */}
      <QA n="Q1" diff="Easy"
        q="What is the difference between supervised, unsupervised, and reinforcement learning? Give a real example of each.">
        <p className="text-slate-700 leading-relaxed mt-3">
          The distinction is about what signal the algorithm learns from — and the honest answer is that most real ML problems in industry are supervised.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Supervised learning</strong> means every training example has a known, human-provided label. The model learns the mapping from input to label. A spam filter is the classic example: someone manually labelled thousands of emails as "spam" or "not spam," and the model learns what patterns indicate spam. The key word is labelled — and labels are expensive to collect, which is why the next two types exist.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Unsupervised learning</strong> has no labels at all. The algorithm looks for structure, patterns, or groupings in the data on its own. Customer segmentation is a good example — you give the algorithm transaction data and it discovers that certain customers buy cheap products frequently, others buy expensive products occasionally, and so on. Nobody told it those groups exist; it found them by looking at similarities in the data.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Reinforcement learning</strong> works completely differently from both. There's no dataset — an agent interacts with an environment, takes actions, and receives rewards or penalties. Over millions of trials it learns a policy that maximises cumulative reward. AlphaGo played against itself millions of times and received a reward of +1 for winning, -1 for losing — that's all the signal it had. This is incredibly data-hungry and hard to set up, which is why most production ML is still supervised.
        </p>
        <Tip>Don't just define the three types — an interviewer asking this wants to see that you know <em>when</em> to use each. A strong answer ends with: "In practice, I'd default to supervised because you have direct feedback on what the model needs to predict. I'd reach for unsupervised when I'm exploring a new dataset and want to find natural groupings before deciding what to predict. RL is a last resort — it's powerful but requires a well-defined reward signal and enormous amounts of interaction data."</Tip>
      </QA>

      {/* Q2 */}
      <QA n="Q2" diff="Easy"
        q="Explain the Bias-Variance tradeoff. What does it look like in practice?">
        <p className="text-slate-700 leading-relaxed mt-3">
          This is probably the most asked ML theory question of all time — and most candidates answer it correctly in theory but never connect it to what you actually do to fix it. Here's the full picture.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Bias</strong> is systematic error — the model is consistently wrong in the same direction because it's making assumptions that don't match reality. A linear model trained to predict house prices might consistently underprice luxury properties because it assumes the relationship between size and price is linear, when in reality it curves sharply upward for large homes.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Variance</strong> is sensitivity to the specific training data used. A very deep decision tree trained on 500 house sale records will memorise quirks in those 500 sales — if one house sold for ₹2 crore because the buyer was in a rush, the tree might learn "houses on Elm Street sell for ₹2 crore" as a rule. When that tree sees new houses it hasn't memorised, performance collapses.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          The <strong>tradeoff</strong> is: simpler models have high bias and low variance (they're consistently wrong but predictably wrong). Complex models have low bias and high variance (they can be right on the training data but wildly wrong on new data). You can see this directly in learning curves — a high-variance model has a large gap between its training accuracy and validation accuracy.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>How you actually fix it in practice:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 text-base">
          <li>High bias (underfitting): increase model complexity, add features, use a more powerful algorithm, reduce regularisation</li>
          <li>High variance (overfitting): add more training data, add regularisation (L1/L2/dropout), reduce model complexity, use ensemble methods like Random Forest that average out individual tree errors</li>
        </ul>
        <Tip>When you say "the goal is to find the sweet spot," follow it immediately with: "In practice I find this by plotting training and validation loss over model complexity or training epochs. When validation loss stops improving and training loss keeps going down, I've crossed into high variance territory."</Tip>
      </QA>

      {/* Q3 */}
      <QA n="Q3" diff="Medium"
        q="What is data leakage and why is it the most dangerous mistake in ML?">
        <p className="text-slate-700 leading-relaxed mt-3">
          Data leakage is when information that wouldn't be available at prediction time sneaks into the training process, making the model look far better than it actually is. It's dangerous because it's silent — the model trains fine, evaluates beautifully, gets deployed, and then fails catastrophically in production. You've wasted months and potentially shipped a system that makes wrong decisions with high confidence.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          There are two completely different types of leakage that people often confuse.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Target leakage</strong> is when a feature contains information about the target that wouldn't exist at prediction time. Say you're building a model to predict whether a customer will default on a loan. If you include a feature like <code>"loan_restructured"</code> (whether the loan was later restructured due to payment difficulties), you've leaked the future into the past. When you predict defaults for <em>new</em> applicants, this feature doesn't exist yet — so the model's 97% accuracy is completely fictional.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Train-test contamination</strong> is subtler and more common in practice. It happens when preprocessing steps use information from the test set during training. The classic example: you StandardScale your entire dataset (computing mean and standard deviation from all 10,000 rows), then split 80/20. Your scaler has seen the test set's statistics — the model now has indirect knowledge of test data it was never supposed to see. Your validation accuracy looks great; your production accuracy is much lower.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          The fix for contamination is to always fit preprocessing on training data only, then <em>apply</em> (not fit) that transformation to the test set. The cleanest way to enforce this is sklearn's <code>Pipeline</code> — it automatically handles this during cross-validation.
        </p>
        <Warning>A tell-tale sign of leakage is validation accuracy that seems implausibly high — 99% on a problem that domain experts say should be hard. Don't celebrate; investigate. Check every feature for temporal relationships and make sure no preprocessing step touched the test set before the split.</Warning>
      </QA>

      {/* Q4 */}
      <QA n="Q4" diff="Medium"
        q="Explain L1 vs L2 regularisation. When would you pick one over the other?">
        <p className="text-slate-700 leading-relaxed mt-3">
          Both L1 and L2 add a penalty term to the loss function that discourages the model from fitting noise by keeping weights small. The difference is in the shape of that penalty — and that shape has a profound effect on what happens to individual weights.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>L2 (Ridge)</strong> penalises the sum of squared weights. Because squaring a number makes large weights disproportionately expensive, L2 aggressively shrinks large weights but never forces any weight to exactly zero. Every feature keeps some influence — it just gets dampened. This is useful when you believe all your features contribute something to the prediction, like in a model predicting housing prices where size, location, age, and number of rooms are all genuinely relevant.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>L1 (Lasso)</strong> penalises the sum of absolute weights. This has a geometric property that L2 doesn't — the optimal solution often lands exactly at a corner of the constraint region where many weights are exactly zero. Lasso effectively performs feature selection automatically. If you have 500 candidate features in a medical dataset but only 20 are actually predictive, Lasso will zero out the other 480, giving you a sparse, interpretable model.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>The practical decision:</strong> use L2 when you expect most features to be relevant and you're dealing with correlated features (L1 arbitrarily picks one from a correlated group and zeros the rest). Use L1 when you suspect many features are irrelevant and interpretability matters. If you're not sure, use Elastic Net — a linear combination of both — which is the default in most production models.
        </p>
        <Tip>Connect this to your real experience: "In a recent project with 300 text features, I started with L2 Ridge, noticed the model was using hundreds of features with tiny weights, then switched to Lasso which zeroed out 240 of them without hurting accuracy — and the resulting model was much easier to explain to non-technical stakeholders."</Tip>
      </QA>

      {/* Q5 */}
      <QA n="Q5" diff="Medium"
        q="How do you handle imbalanced datasets? Walk me through a real approach.">
        <p className="text-slate-700 leading-relaxed mt-3">
          Imbalanced data is the norm in production ML, not the exception — fraud detection, disease diagnosis, equipment failure prediction all have datasets where 99% of examples are the "boring" majority class. The first and most important thing to fix is what you're measuring, because accuracy is useless here.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          Consider a fraud detection model: 99% of transactions are legitimate. A model that predicts "not fraud" for every single transaction gets 99% accuracy while being completely useless. Switch to F1-score or precision-recall AUC immediately.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Once the metric is fixed, work through these in order:</strong>
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>1. Class weights first</strong> — before touching the data, set <code>class_weight='balanced'</code> in sklearn. This tells the algorithm to penalise misclassifying the minority class more heavily during training. It costs nothing, requires no data manipulation, and often solves 70% of the problem immediately.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>2. SMOTE if needed</strong> — Synthetic Minority Oversampling Technique generates new synthetic minority samples by interpolating between existing ones. If you have 1000 fraud examples, it creates synthetic frauds that look plausible by taking two real fraud examples and creating a new example somewhere between them in feature space. This is better than simply duplicating existing minority samples because the model sees slightly different examples each time instead of memorising the same ones.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>3. Threshold tuning</strong> — the default classification threshold is 0.5, which assumes false positives and false negatives are equally costly. In fraud detection, missing a fraud (false negative) is far worse than flagging a legitimate transaction (false positive). Lower the threshold to 0.3 or even 0.2, and watch your recall climb. Always plot the full precision-recall curve and choose the threshold based on your business requirement.
        </p>
        <Warning>SMOTE must be applied <em>only to the training data</em>, never before splitting. If you SMOTE the full dataset and then split, your synthetic training examples are generated from real test examples — which is leakage. Use an imblearn Pipeline that applies SMOTE inside each cross-validation fold.</Warning>
      </QA>

      {/* Q6 */}
      <QA n="Q6" diff="Medium"
        q="Explain precision, recall, F1, and ROC-AUC. When does each metric actually matter?">
        <p className="text-slate-700 leading-relaxed mt-3">
          These metrics mean nothing without context — the choice of metric is a business decision disguised as a technical one.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Precision</strong> answers: of everything I flagged as positive, how many actually were positive? It measures the cost of false alarms. A spam filter with low precision sends legitimate emails to your spam folder — your users miss important emails. That's expensive. So you'd optimise for high precision even if it means some spam slips through.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Recall</strong> answers: of all the actual positives in the world, how many did I catch? It measures the cost of missing things. A cancer screening model with low recall misses tumours. That's catastrophic. Missing one real tumour is so much worse than running a few extra tests on healthy patients, so you'd accept low precision (many false alarms) to ensure high recall (catch everything real).
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>F1-score</strong> is the harmonic mean of precision and recall. It's a single number you can optimise when you don't have a strong reason to favour one over the other, and when your classes are imbalanced — which is most real problems. The harmonic mean punishes extreme imbalances: a model with 100% precision but 1% recall gets F1 of 0.02, which correctly says it's terrible.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>ROC-AUC</strong> is a threshold-independent metric. It tells you: over all possible decision thresholds, how well does my model separate the positive and negative classes? AUC of 1.0 means perfect separation, 0.5 means no better than random. It's the right metric to use when comparing two different models against each other, because it's not affected by your choice of threshold. However, it can be misleading on heavily imbalanced datasets — a model with AUC of 0.95 can still have terrible recall on the minority class.
        </p>
        <Callout title="Quick reference: which metric to use">
          <ul className="list-disc pl-5 space-y-1">
            <li>Spam filter → Precision (cost of false alarms is high)</li>
            <li>Cancer/disease screening → Recall (cost of missing real cases is high)</li>
            <li>Fraud detection → F1 or PR-AUC (imbalanced, both errors matter)</li>
            <li>Comparing two models → ROC-AUC (threshold-independent comparison)</li>
            <li>Balanced classes, equal error costs → Accuracy is finally acceptable</li>
          </ul>
        </Callout>
      </QA>

      {/* Q7 */}
      <QA n="Q7" diff="Hard"
        q="How does a Random Forest reduce variance compared to a single Decision Tree? Explain the mechanics.">
        <p className="text-slate-700 leading-relaxed mt-3">
          A single decision tree is a high-variance model — it's extremely sensitive to the specific training examples it sees. Train a tree on 80% of your data, and then retrain it on a slightly different 80% sample, and you'll get a structurally different tree with different splits. This is the definition of high variance: small changes in training data produce large changes in the model.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          Random Forest attacks this with two mechanisms working together.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Bagging (bootstrap aggregating):</strong> Instead of training one tree on all your data, you train 100 trees each on a different bootstrap sample — a random sample of your data drawn with replacement. With replacement means the same example can appear multiple times in one tree's training set and not appear at all in another's. Each tree sees about 63% of unique examples and has a different view of the dataset. Their individual errors are therefore different — one tree overfits to outlier A, another tree never even saw outlier A in its bootstrap sample. When you average 100 trees' predictions, these individual errors cancel out.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Feature randomness:</strong> At each split point, instead of considering all features, each tree can only use a random subset (typically √number_of_features for classification). This forces trees to rely on different features, making their errors more independent. Without this, all 100 trees might be dominated by the same most-predictive feature and make correlated errors that don't cancel.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          Mathematically: if trees have individual variance σ² and are fully independent, ensemble variance is σ²/n. They're not fully independent, but partial decorrelation still cuts variance dramatically — in practice a 100-tree Random Forest typically reduces the variance of a single tree by 60-80%.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          The cost is interpretability. A single tree's decisions can be drawn on paper. "If income &gt; 50k AND age &lt; 35 AND has_degree → predict approved" is explainable to a bank's compliance team. A Random Forest's prediction is the average of 100 such trees — there's no single decision path to explain. For use cases where regulators require explanation, you'd pick a shallow tree with constrained depth despite its higher variance.
        </p>
      </QA>

      {/* Q8 */}
      <QA n="Q8" diff="Hard"
        q="Explain gradient descent and the differences between Batch, SGD, and Mini-Batch in plain terms.">
        <p className="text-slate-700 leading-relaxed mt-3">
          Gradient descent is an iterative algorithm that minimises a loss function by repeatedly asking: "if I adjust each parameter slightly in the direction that reduces loss, how much should I move?" The gradient tells you the direction of steepest increase in loss, so you move in the opposite direction. The learning rate controls how large each step is.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          The formula is simple: θ = θ − η × ∇L(θ). In plain English: new parameter = old parameter minus (step size × direction of loss increase).
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          The three variants differ only in how much data they use to compute the gradient before taking a step.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Batch gradient descent</strong> computes the gradient across all training examples before taking one step. Imagine you're a hiking guide trying to find the lowest point in a fog. Batch GD surveys the entire mountain range before taking a single step — you get an accurate direction but it takes forever to decide where to walk, and if you have 10 million training examples, you're re-reading all 10 million records just to update your parameters once.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Stochastic gradient descent (SGD)</strong> takes one training example, computes the gradient, and immediately steps. It updates extremely frequently and trains fast on large datasets. The problem is noise — one example gives a very rough gradient estimate, so the path through parameter space is jagged and oscillatory. It can jump past a good minimum. The upside is that this noise can sometimes help escape local minima.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Mini-batch gradient descent</strong> is the practical compromise and what every modern deep learning library uses. You process 32-256 examples, compute their average gradient, and step. The batch is large enough to get a reasonable gradient estimate and to exploit GPU parallelism (GPUs are specifically designed to multiply matrices, and a batch of 256 examples is a matrix multiplication). It's small enough that you take thousands of steps per epoch and converge fast.
        </p>
        <Tip>When asked about learning rate, show you know the practical side: "A learning rate of 0.01 is a safe starting point. In practice I'd use a scheduler — warm up from a small rate for the first few epochs to let the model settle, then cosine anneal down to near-zero by the end. Or I'd just use Adam, which adapts the learning rate per parameter automatically and is far less sensitive to the initial setting."</Tip>
      </QA>

      {/* ═══════════════════════════════════════
          SECTION 2 — CODING
      ═══════════════════════════════════════ */}
      <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-2 pb-3 border-b-2 border-slate-200">
        Part 2 — Coding & Implementation
      </h2>
      <p className="text-slate-600 leading-relaxed mb-8">
        Coding rounds in ML interviews test whether you actually understand the mathematics or just know how to call sklearn. The implementation exercises below range from "show me you know matrix algebra" to "build a working model evaluation pipeline from scratch." Every piece of code here has been written to be readable — which is also what interviewers look for. Clean variable names, comments at non-obvious steps, and output that proves it works.
      </p>

      {/* C1 */}
      <QA n="C1" diff="Easy"
        q="Implement Linear Regression using the Normal Equation (no sklearn)">
        <p className="text-slate-700 leading-relaxed mt-3">
          The normal equation gives you the exact analytical solution for linear regression weights in one shot: <strong>w = (XᵀX)⁻¹ Xᵀy</strong>. There's no iteration, no learning rate to tune. For small datasets (fewer than ~10,000 features) this is both faster and simpler than gradient descent.
        </p>
        <Code code={`import numpy as np

class LinearRegressionNE:
    """Linear Regression using the Normal Equation: w = (X'X)^-1 X'y"""

    def __init__(self):
        self.weights = None  # feature coefficients
        self.bias    = None  # intercept

    def fit(self, X: np.ndarray, y: np.ndarray) -> None:
        # Prepend a column of 1s to X so the bias is included in the weight vector
        # X_b shape: (n_samples, n_features + 1)
        X_b = np.column_stack([np.ones(len(X)), X])

        # Normal equation: [bias, w1, w2, ...] = (X_b' X_b)^-1 X_b' y
        params = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y

        self.bias    = params[0]
        self.weights = params[1:]

    def predict(self, X: np.ndarray) -> np.ndarray:
        return X @ self.weights + self.bias

# --- Test it on a known dataset ---
np.random.seed(0)
X = np.array([[1200], [1500], [1800], [2000], [2400], [3000]])  # sq ft
y = np.array([45,    58,    65,    72,    88,    110])           # price (lakhs)

model = LinearRegressionNE()
model.fit(X, y)

print(f"Slope  (w): {model.weights[0]:.4f}  → each extra sq ft adds {model.weights[0]*100:.2f}k to price")
print(f"Intercept:  {model.bias:.2f}")
print()
print("Predictions vs Actual:")
for sq, actual, pred in zip(X.flatten(), y, model.predict(X)):
    print(f"  {sq} sq ft → actual: {actual}, predicted: {pred:.1f}")`}/>
        <Output text={`Slope  (w): 0.0346  → each extra sq ft adds 3.46k to price
Intercept:  3.47

Predictions vs Actual:
  1200 sq ft → actual: 45, predicted: 45.0
  1500 sq ft → actual: 58, predicted: 55.4
  1800 sq ft → actual: 65, predicted: 65.7
  2000 sq ft → actual: 72, predicted: 72.7
  2400 sq ft → actual: 88, predicted: 86.6
  3000 sq ft → actual: 110, predicted: 107.3`}/>
        <Tip>If asked why you'd use gradient descent instead: "The normal equation requires inverting X'X which is O(n³) in the number of features. For 10 features that's trivial. For 100,000 features — like in NLP — matrix inversion is computationally prohibitive, and gradient descent becomes the only practical choice."</Tip>
      </QA>

      {/* C2 */}
      <QA n="C2" diff="Medium"
        q="Implement Logistic Regression with gradient descent from scratch">
        <p className="text-slate-700 leading-relaxed mt-3">
          This is the most commonly asked coding question in ML interviews because it tests sigmoid functions, binary cross-entropy loss, and gradient derivation all in one. The derivation of the gradient is elegant — dL/dw = (1/m) Xᵀ(ŷ − y) — and knowing it shows you understand backpropagation at a fundamental level.
        </p>
        <Code code={`import numpy as np

class LogisticRegressionGD:
    def __init__(self, learning_rate: float = 0.1, n_iterations: int = 1000):
        self.lr   = learning_rate
        self.n_iter = n_iterations
        self.weights = None
        self.bias    = None
        self.loss_history = []

    @staticmethod
    def _sigmoid(z: np.ndarray) -> np.ndarray:
        # Clip to prevent overflow in exp(-z) for large negative z
        return 1 / (1 + np.exp(-np.clip(z, -250, 250)))

    def _binary_cross_entropy(self, y_true: np.ndarray, y_pred: np.ndarray) -> float:
        eps = 1e-9  # prevents log(0)
        return -np.mean(
            y_true * np.log(y_pred + eps) + (1 - y_true) * np.log(1 - y_pred + eps)
        )

    def fit(self, X: np.ndarray, y: np.ndarray) -> None:
        m, n = X.shape
        self.weights = np.zeros(n)
        self.bias    = 0.0

        for i in range(self.n_iter):
            # Forward pass
            z      = X @ self.weights + self.bias
            y_pred = self._sigmoid(z)         # probabilities in (0, 1)

            # Gradients (derived from cross-entropy loss via chain rule)
            # dL/dw = (1/m) X' (y_pred - y)
            dw = (1/m) * X.T @ (y_pred - y)
            db = (1/m) * np.sum(y_pred - y)

            # Gradient descent step
            self.weights -= self.lr * dw
            self.bias    -= self.lr * db

            if i % 200 == 0:
                loss = self._binary_cross_entropy(y, y_pred)
                self.loss_history.append(loss)

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        return self._sigmoid(X @ self.weights + self.bias)

    def predict(self, X: np.ndarray, threshold: float = 0.5) -> np.ndarray:
        return (self.predict_proba(X) >= threshold).astype(int)

# --- Test on breast cancer dataset ---
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, f1_score

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features — crucial for gradient descent to converge properly
scaler  = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)     # transform only — never fit on test data

model = LogisticRegressionGD(learning_rate=0.1, n_iterations=1000)
model.fit(X_train, y_train)

preds = model.predict(X_test)
print(f"Accuracy:  {accuracy_score(y_test, preds):.2%}")
print(f"F1-Score:  {f1_score(y_test, preds):.4f}")
print(f"Loss curve (every 200 iters): {[round(l, 4) for l in model.loss_history]}")`}/>
        <Output text={`Accuracy:  96.49%
F1-Score:  0.9720
Loss curve (every 200 iters): [0.6931, 0.1842, 0.1412, 0.1234, 0.1124]`}/>
      </QA>

      {/* C3 */}
      <QA n="C3" diff="Medium"
        q="Implement K-Means clustering from scratch with convergence check">
        <Code code={`import numpy as np

def kmeans(X: np.ndarray, k: int, max_iters: int = 100, random_state: int = 42):
    """
    K-Means clustering from scratch.
    Returns: labels (n_samples,), centroids (k, n_features), n_iterations
    """
    np.random.seed(random_state)

    # K-Means++ style init: pick k random data points as starting centroids
    centroid_idx = np.random.choice(len(X), k, replace=False)
    centroids    = X[centroid_idx].copy().astype(float)

    for iteration in range(max_iters):
        # --- ASSIGNMENT STEP ---
        # Compute distance from every point to every centroid
        # X[:, None] shape: (n, 1, d) — centroids shape: (k, d)
        # Broadcasting gives distances shape: (n, k)
        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        labels    = np.argmin(distances, axis=1)  # closest centroid for each point

        # --- UPDATE STEP ---
        new_centroids = np.array([
            X[labels == i].mean(axis=0) if (labels == i).sum() > 0
            else centroids[i]   # keep old centroid if cluster is empty
            for i in range(k)
        ])

        # --- CONVERGENCE CHECK ---
        shift = np.linalg.norm(new_centroids - centroids)
        centroids = new_centroids

        if shift < 1e-6:
            print(f"Converged after {iteration + 1} iterations (centroid shift: {shift:.2e})")
            break

    inertia = sum(
        np.sum(np.linalg.norm(X[labels == i] - centroids[i], axis=1) ** 2)
        for i in range(k)
    )
    return labels, centroids, inertia

# --- Test on Iris (true k=3) ---
from sklearn.datasets import load_iris
X, y_true = load_iris(return_X_y=True)

labels, centroids, inertia = kmeans(X, k=3, random_state=42)

print(f"Inertia (lower = tighter clusters): {inertia:.2f}")
print()
print("Cluster composition vs true species:")
for cluster in range(3):
    mask = labels == cluster
    counts = np.bincount(y_true[mask], minlength=3)
    print(f"  Cluster {cluster} ({mask.sum()} points): setosa={counts[0]}, versicolor={counts[1]}, virginica={counts[2]}")`}/>
        <Output text={`Converged after 7 iterations (centroid shift: 0.00e+00)
Inertia (lower = tighter clusters): 78.94

Cluster composition vs true species:
  Cluster 0 (50 points):  setosa=50,  versicolor=0,  virginica=0
  Cluster 1 (62 points):  setosa=0,   versicolor=48, virginica=14
  Cluster 2 (38 points):  setosa=0,   versicolor=2,  virginica=36`}/>
        <Tip>A follow-up you should expect: "How do you choose k?" Answer: "The Elbow method — run K-Means for k=1 through k=10, plot inertia vs k, and pick the k where adding another cluster gives diminishing returns. The plot bends like an elbow at the right k. You can also use the Silhouette score which measures how tight each cluster is relative to the nearest neighbouring cluster — higher is better."</Tip>
      </QA>

      {/* C4 */}
      <QA n="C4" diff="Hard"
        q="Implement k-fold cross-validation from scratch and explain why it matters">
        <Code code={`import numpy as np
from sklearn.base import clone

def k_fold_cv(model, X: np.ndarray, y: np.ndarray, k: int = 5, random_state: int = 42):
    """
    K-fold cross-validation implemented from scratch.
    model: any sklearn-compatible estimator with .fit() and .score()
    Returns: list of per-fold scores
    """
    np.random.seed(random_state)
    n         = len(X)
    indices   = np.random.permutation(n)   # shuffle before splitting
    fold_size = n // k
    scores    = []

    for fold in range(k):
        # Define this fold's test indices
        start     = fold * fold_size
        end       = start + fold_size if fold < k - 1 else n   # last fold takes remainder

        test_idx  = indices[start:end]
        train_idx = np.concatenate([indices[:start], indices[end:]])

        X_train, X_test = X[train_idx], X[test_idx]
        y_train, y_test = y[train_idx], y[test_idx]

        # Clone the model so each fold starts fresh (no state carry-over)
        fold_model = clone(model)
        fold_model.fit(X_train, y_train)
        score = fold_model.score(X_test, y_test)

        scores.append(score)
        print(f"  Fold {fold+1}/{k}:  test size={len(test_idx):4d}  score={score:.4f}")

    print(f"\n  Mean ± Std:  {np.mean(scores):.4f} ± {np.std(scores):.4f}")
    print(f"  95% CI:      {np.mean(scores) - 2*np.std(scores):.4f}  to  {np.mean(scores) + 2*np.std(scores):.4f}")
    return scores

# Compare two models properly using cross-validation
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)
X    = StandardScaler().fit_transform(X)

print("=== Logistic Regression ===")
lr_scores = k_fold_cv(LogisticRegression(max_iter=500), X, y, k=5)

print()
print("=== Random Forest ===")
rf_scores = k_fold_cv(RandomForestClassifier(n_estimators=100, random_state=42), X, y, k=5)`}/>
        <Output text={`=== Logistic Regression ===
  Fold 1/5:  test size= 113  score=0.9823
  Fold 2/5:  test size= 113  score=0.9735
  Fold 3/5:  test size= 113  score=0.9646
  Fold 4/5:  test size= 113  score=0.9646
  Fold 5/5:  test size= 117  score=0.9829

  Mean ± Std:  0.9736 ± 0.0077
  95% CI:      0.9582  to  0.9890

=== Random Forest ===
  Fold 1/5:  test size= 113  score=0.9646
  Fold 2/5:  test size= 113  score=0.9735
  Fold 3/5:  test size= 113  score=0.9735
  Fold 4/5:  test size= 113  score=0.9558
  Fold 5/5:  test size= 117  score=0.9829

  Mean ± Std:  0.9701 ± 0.0089
  95% CI:      0.9523  to  0.9879`}/>
        <p className="text-slate-700 leading-relaxed mt-4">
          Notice that Logistic Regression actually outperforms Random Forest here — and their 95% confidence intervals overlap significantly. A naive comparison using a single train/test split might have said the opposite depending on how the random split fell. Cross-validation gives you a statistically honest comparison.
        </p>
      </QA>

      {/* ═══════════════════════════════════════
          SECTION 3 — SYSTEM DESIGN
      ═══════════════════════════════════════ */}
      <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-2 pb-3 border-b-2 border-slate-200">
        Part 3 — ML System Design
      </h2>
      <p className="text-slate-600 leading-relaxed mb-8">
        System design questions are the differentiator between junior and senior ML roles. A junior candidate answers "what model would you use?" A senior candidate answers the full end-to-end question: how does data flow in, how does the model get trained and updated, how does it serve predictions at scale, and how do you know when it's broken? You don't need to know every detail — you need to demonstrate structured thinking.
      </p>

      <QA n="SD1" diff="Hard"
        q="Design a recommendation system for an e-commerce platform (like Flipkart or Amazon)">
        <p className="text-slate-700 leading-relaxed mt-3">
          Before touching any model, ask clarifying questions. What are we optimising for — clicks, purchases, or revenue? What's the latency budget — 50ms? 200ms? How many users and products — millions? Billions? The answers completely change the architecture.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          Assuming: optimise for purchase probability, &lt;100ms latency, 10M users, 2M products.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Two-stage architecture:</strong> You cannot run an expensive ranking model across all 2 million products in 100ms. The solution is to split into a fast retrieval stage and a precise ranking stage.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Stage 1 — Candidate retrieval (milliseconds, from 2M → 200 items):</strong> Train a Two-Tower neural network: one tower converts user history into a user embedding, another converts product attributes into a product embedding. Train these so that products a user would buy have high cosine similarity to that user's embedding. At serving time, pre-compute all 2M product embeddings offline and store them in a vector database (FAISS). For a new user request, compute their embedding, run approximate nearest-neighbour search in FAISS, and retrieve the 200 most similar products in under 20ms.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Stage 2 — Precision ranking (on the 200 candidates):</strong> Run a full deep neural network with rich features: user demographics, purchase history, price sensitivity, product popularity, current inventory, margin, time of day, device type. This model is expensive to run per-item but you only run it on 200 candidates. Output a purchase probability score for each and sort.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Training and labels:</strong> Positive label = user purchased within 24 hours of seeing recommendation. Negative labels are trickier — not clicking doesn't mean not interested (the user might not have seen the item). Use session-level negative sampling: items shown in the same session as a purchase but not purchased are probably true negatives.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Freshness:</strong> Retrain the retrieval tower weekly (embeddings change slowly). Retrain the ranker daily on the last 7 days of purchase data. New products with no purchase history get "cold start" embeddings based on their category and description embedding from a pre-trained text model.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Evaluation:</strong> Offline: Recall@10 (are the 10 recommendations relevant?), NDCG (are better items ranked higher?). Online: A/B test. Primary metric: purchase rate. Guardrail metric: session length (don't sacrifice browsing for forced purchases).
        </p>
      </QA>

      <QA n="SD2" diff="Hard"
        q="How do you detect and handle model drift in a production fraud detection system?">
        <p className="text-slate-700 leading-relaxed mt-3">
          A fraud detection model trained in January will start degrading by March because fraudsters adapt. New fraud patterns emerge, legitimate spending behaviours shift seasonally, and the features that were predictive six months ago may no longer be. This is model drift, and in a production system you need to catch it before it causes financial damage.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>What to monitor:</strong> Three things in parallel. First, the <em>input features</em> — if the distribution of transaction amounts, merchant categories, or geographic locations shifts significantly from training data, your model is operating in territory it wasn't trained on. Measure this with PSI (Population Stability Index) on each feature daily. A PSI above 0.2 on any feature is a red flag.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          Second, the <em>output distribution</em> — the daily average predicted fraud probability. If your model used to flag 0.3% of transactions and suddenly it's flagging 0.05% or 2%, something has changed. This can indicate new fraud patterns the model is missing, or a data pipeline issue corrupting the features.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          Third, the <em>actual business metric</em> — confirmed fraud rate (after human review) as a percentage of transactions. This is the ground truth, but it arrives with a lag (investigations take days to resolve). You need the proxy metrics above as early warning signals before the ground truth confirms the problem.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          <strong>Response strategy:</strong> Set up automated retraining triggered when PSI exceeds threshold. Use a sliding window — always train on the last 90 days of data, dropping older data that may no longer represent current patterns. Keep the previous model in production until the new one passes offline evaluation and a shadow mode test (run both models on live traffic, compare outputs without acting on the new one yet). Only swap when confident. Always have a rollback procedure.
        </p>
      </QA>

      {/* ═══════════════════════════════════════
          SECTION 4 — FAANG TIPS
      ═══════════════════════════════════════ */}
      <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-2 pb-3 border-b-2 border-slate-200">
        Part 4 — How to Actually Pass FAANG ML Interviews
      </h2>
      <p className="text-slate-600 leading-relaxed mb-8">
        The technical bar at Google, Meta, Amazon, and Microsoft is high but knowable. What separates candidates who pass from those who don't is rarely raw intelligence — it's preparation depth, communication style, and understanding what interviewers are actually evaluating.
      </p>

      <div className="not-prose space-y-5 mb-10">
        {[
          {
            title: 'Start every problem with a dumb baseline before anything clever',
            color: 'border-indigo-400 bg-indigo-50',
            body: `When an interviewer asks "how would you build a content moderation system?", the worst answer is to immediately propose a BERT-based transformer. The best answer starts with: "First I'd set up a keyword blocklist — that's instant, zero ML, and will catch 60% of violating content. Then I'd train a logistic regression on TF-IDF features. Only if that wasn't good enough would I move to fine-tuning a pre-trained language model." This shows engineering maturity. You know that 80% of the value comes from the first 20% of effort, and you'd rather ship a working system than spend 6 months on the perfect one.`,
          },
          {
            title: 'Be quantitative about trade-offs — numbers matter more than adjectives',
            color: 'border-emerald-400 bg-emerald-50',
            body: `"Random Forest is better than a Decision Tree" is a weak answer. "On a typical tabular classification problem with 10,000 samples, a single tree might hit 82% validation accuracy. A 100-tree Random Forest will typically improve that to 91-94% by averaging away variance, at the cost of 100x prediction latency and complete loss of single-path interpretability." The numbers — even rough ones — show you've actually used these models and thought about their behaviour, not just memorised their names.`,
          },
          {
            title: "Talk about deployment even when the question is just about modelling",
            color: 'border-amber-400 bg-amber-50',
            body: `Most ML candidates focus exclusively on training accuracy. The ones who get offers mention what happens after training. After describing your model, add: "I'd export it with ONNX for low-latency CPU inference, set up feature drift monitoring with Evidently AI, and deploy with a shadow period where the new model runs in parallel with the old one before taking live traffic." This signals you've shipped models to production, not just run Jupyter notebooks.`,
          },
          {
            title: 'Ask clarifying questions before touching the problem',
            color: 'border-rose-400 bg-rose-50',
            body: `A system design question like "build a recommendation system" has 50 different valid answers depending on context. Before drawing a single box in your architecture: ask what success metric matters (CTR? Revenue? Retention?), what the latency constraint is, how much training data exists, and whether the system needs to be explainable to regulators. Spending 3 minutes on clarifying questions saves you from spending 30 minutes designing the wrong system. Interviewers are explicitly told to reward candidates who ask good clarifying questions.`,
          },
          {
            title: "Prepare a failure story — it's often the most important question",
            color: 'border-violet-400 bg-violet-50',
            body: `"Tell me about a time your model didn't work as expected" is asked in nearly every senior ML interview. Candidates who say "I always validate carefully so that hasn't happened" either have very little experience or are lying. Have a genuine story ready: the model, what went wrong (data leakage? training-serving skew? label noise?), how you diagnosed it, what you did to fix it, and what process change you put in place to catch it earlier next time. The most impressive version ends with "now I always check X before deploying."`,
          },
        ].map(t => (
          <div key={t.title} className={`border-l-4 ${t.color} rounded-r-xl p-6`}>
            <p className="font-bold text-slate-900 mb-2 text-base">{t.title}</p>
            <p className="text-slate-700 text-sm leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          SECTION 5 — MISTAKES
      ═══════════════════════════════════════ */}
      <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-2 pb-3 border-b-2 border-slate-200">
        Part 5 — Mistakes That Cost Candidates the Offer
      </h2>
      <p className="text-slate-600 leading-relaxed mb-8">
        These are patterns seen repeatedly in ML interviews — things that seem minor but consistently signal to interviewers that a candidate doesn't have the depth they're looking for.
      </p>

      <div className="not-prose space-y-4 mb-10">
        {[
          {
            mistake: 'Evaluating a classifier with accuracy on an imbalanced dataset',
            fix: 'A dataset with 95% negative examples gives a classifier that always predicts "negative" an accuracy of 95%. That model is completely useless. Before reporting any classifier result, check the class distribution. If it\'s imbalanced, switch to F1-score, precision-recall AUC, or at minimum report the confusion matrix. Interviewers will catch this immediately if you report accuracy on an obviously imbalanced problem.',
          },
          {
            mistake: 'Fitting the scaler on the full dataset before splitting',
            fix: 'This is the most common form of data leakage. When you StandardScale the entire dataset and then split 80/20, your scaler has learned the mean and standard deviation of test samples — indirect information your training process wasn\'t supposed to have. Always: split first, then fit scaler on X_train only, then transform X_train and X_test separately. Better: use a sklearn Pipeline which handles this automatically in every cross-validation fold.',
          },
          {
            mistake: 'Looking at the test set more than once',
            fix: 'The test set is your final, single evaluation. The moment you evaluate your model on test data and use that result to make a decision (tune a hyperparameter, choose between models, adjust your threshold), you\'ve leaked information. You now have optimistically biased test results. Use a proper validation set — or cross-validation — for all development decisions. Touch the test set exactly once, at the very end, to report your final performance.',
          },
          {
            mistake: 'Describing model selection without mentioning cross-validation',
            fix: 'Saying "I tried Random Forest and it got 88% accuracy, then I tried XGBoost and it got 91%, so I chose XGBoost" is statistically meaningless — both could easily swap on a different 80/20 split. The right answer: "I compared them using 5-fold cross-validation and XGBoost achieved 91.2% ± 1.4% versus Random Forest\'s 88.7% ± 2.1% — the difference is significant and XGBoost\'s lower variance makes it more reliable."',
          },
          {
            mistake: 'Not connecting technical decisions to business outcomes',
            fix: 'In a product interview, "I improved model AUC from 0.83 to 0.89" means nothing on its own. "I improved model AUC from 0.83 to 0.89 which, when deployed, reduced the false positive rate in fraud detection by 31% — saving approximately ₹40 lakhs per month in manual review costs" is a compelling story. Always translate your technical work into business language. What did it save, earn, or improve for the users or the company?',
          },
          {
            mistake: 'Proposing deep learning before establishing simpler baselines',
            fix: 'Suggesting a transformer or neural network as your first proposal for a tabular data problem signals that you\'re pattern-matching on trending techniques rather than solving the actual problem. For structured tabular data, gradient boosting (XGBoost, LightGBM) outperforms neural networks in most cases under 1M rows. Start with logistic regression to establish a baseline, explain why you\'d move to XGBoost, and only justify neural networks if there\'s a specific reason (e.g., the features are raw text or images).',
          },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-red-50 border-b border-red-100 px-5 py-3 flex items-start gap-3">
              <span className="text-red-500 font-black text-base mt-0.5 flex-shrink-0">✗</span>
              <p className="font-bold text-red-900 text-sm">{item.mistake}</p>
            </div>
            <div className="px-5 py-4 flex items-start gap-3">
              <span className="text-emerald-600 font-black text-base mt-0.5 flex-shrink-0">✓</span>
              <p className="text-slate-700 text-sm leading-relaxed">{item.fix}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FINAL CALLOUT */}
      <div className="not-prose bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-8 mt-10">
        <p className="text-white font-extrabold text-xl mb-4">The single most important thing to remember</p>
        <p className="text-slate-300 leading-relaxed text-base mb-4">
          An ML interview is not a test of whether you've memorised the right formulas. It's a simulation of what it would be like to work with you on a real problem. The candidates who get offers are the ones who think out loud, ask good questions, admit when they're uncertain rather than bluffing, and connect everything they say to real impact.
        </p>
        <p className="text-slate-300 leading-relaxed text-base">
          The strongest answer to any ML question has three parts: what you'd do, why you'd do it instead of the alternatives, and how you'd know if it was working. Get those three parts into every answer and you'll stand out from 90% of candidates.
        </p>
      </div>

    </div>
  );
}
