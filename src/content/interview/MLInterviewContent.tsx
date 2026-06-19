import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Code2, Brain, Target, AlertTriangle, Lightbulb, Building2 } from 'lucide-react';

const CodeBlock = ({ code }: { code: string }) => (
  <div className="not-prose my-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500"/>
        <span className="w-3 h-3 rounded-full bg-yellow-500"/>
        <span className="w-3 h-3 rounded-full bg-green-500"/>
      </div>
      <span className="text-slate-400 text-xs font-mono ml-2">Python</span>
    </div>
    <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">{code}</pre>
  </div>
);

const QA = ({ q, a, difficulty }: { q: string; a: React.ReactNode; difficulty: 'Easy' | 'Medium' | 'Hard' }) => {
  const [open, setOpen] = useState(false);
  const colors = { Easy: 'bg-emerald-100 text-emerald-700', Medium: 'bg-amber-100 text-amber-700', Hard: 'bg-red-100 text-red-700' };
  return (
    <div className="not-prose border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-4">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 bg-white hover:bg-slate-50 text-left transition-colors">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${colors[difficulty]}`}>{difficulty}</span>
          <span className="font-semibold text-slate-800 text-sm leading-snug">{q}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0"/> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0"/>}
      </button>
      {open && (
        <div className="p-5 border-t border-slate-100 bg-slate-50">
          <div className="text-sm text-slate-700 leading-relaxed space-y-3">{a}</div>
        </div>
      )}
    </div>
  );
};

export function MLInterviewContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
        Machine Learning Interview Questions
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-8">
        A comprehensive guide to ML interview preparation — covering theory, coding, system design, and behavioural questions for roles at top tech companies. Click any question to reveal the full answer.
      </p>

      {/* Quick stats */}
      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: Brain, label: '25+ Theory Q&A', color: 'bg-indigo-50 text-indigo-700' },
          { icon: Code2, label: '8 Coding Tasks', color: 'bg-emerald-50 text-emerald-700' },
          { icon: Building2, label: 'System Design', color: 'bg-amber-50 text-amber-700' },
          { icon: Target, label: 'FAANG Focused', color: 'bg-rose-50 text-rose-700' },
        ].map(f => (
          <div key={f.label} className={`${f.color} rounded-xl p-4 flex items-center gap-3 border border-current border-opacity-20`}>
            <f.icon className="w-5 h-5 flex-shrink-0"/>
            <span className="font-semibold text-sm">{f.label}</span>
          </div>
        ))}
      </div>

      {/* ── SECTION 1: FUNDAMENTALS ── */}
      <div className="not-prose flex items-center gap-3 mb-5">
        <div className="bg-indigo-600 text-white rounded-xl p-2.5"><Brain className="w-5 h-5"/></div>
        <h2 className="text-2xl font-extrabold text-slate-900">1. Fundamentals & Theory</h2>
      </div>

      <QA difficulty="Easy"
        q="What is the difference between supervised, unsupervised, and reinforcement learning?"
        a={<>
          <p><strong>Supervised Learning:</strong> The model trains on labelled data — each example has an input X and a known output Y. The model learns to map X→Y. Examples: Linear Regression (predicting salary), Logistic Regression (spam detection), Random Forest (image classification).</p>
          <p><strong>Unsupervised Learning:</strong> No labels. The model finds hidden structure in unlabelled data on its own. Examples: K-Means (customer segmentation), PCA (dimensionality reduction), DBSCAN (anomaly detection).</p>
          <p><strong>Reinforcement Learning:</strong> An agent learns by interacting with an environment, receiving rewards for good actions and penalties for bad ones. Examples: AlphaGo, game-playing agents, robotic control.</p>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-xs font-semibold text-indigo-800">💡 Interviewer tip: Always give a real-world example for each — it shows practical understanding, not just memorisation.</div>
        </>}
      />

      <QA difficulty="Easy"
        q="Explain the Bias-Variance Tradeoff."
        a={<>
          <p><strong>Bias</strong> is error from wrong assumptions — a model that's too simple and misses the true pattern (underfitting). High bias = low training accuracy.</p>
          <p><strong>Variance</strong> is error from excessive sensitivity to training data — a model that memorises noise and fails to generalise (overfitting). High variance = high training accuracy, low test accuracy.</p>
          <p><strong>The tradeoff:</strong> As model complexity increases, bias decreases but variance increases. The goal is finding the sweet spot that minimises total error = Bias² + Variance + Irreducible Noise.</p>
          <p><strong>Practical examples:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A linear model on non-linear data → high bias</li>
            <li>A 1000-node decision tree on 100 samples → high variance</li>
            <li>Random Forest → reduces variance through ensemble averaging</li>
            <li>Regularisation (Ridge/Lasso) → increases bias slightly, reduces variance</li>
          </ul>
        </>}
      />

      <QA difficulty="Medium"
        q="What is the difference between L1 and L2 regularisation? When would you use each?"
        a={<>
          <p><strong>L2 (Ridge):</strong> Adds the sum of squared weights (λΣwᵢ²) as a penalty to the loss function. Shrinks all weights toward zero but rarely makes them exactly zero. Handles multicollinearity well. Use when all features are likely relevant.</p>
          <p><strong>L1 (Lasso):</strong> Adds the sum of absolute weights (λΣ|wᵢ|) as a penalty. Drives some weights to exactly zero — performing automatic feature selection. Use when you have many irrelevant features and want a sparse model.</p>
          <p><strong>Elastic Net:</strong> Combines both L1 + L2. Best of both worlds — handles correlated features (L2) while still doing feature selection (L1).</p>
          <p><strong>Use L1 when:</strong> You have 1000 features but suspect only 50 are useful. Lasso will zero out the noise.</p>
          <p><strong>Use L2 when:</strong> Features are correlated (e.g., house size and number of rooms) — Ridge keeps both but shrinks them.</p>
        </>}
      />

      <QA difficulty="Medium"
        q="How do you handle imbalanced datasets?"
        a={<>
          <p>This is one of the most common real-world ML problems. A layered approach works best:</p>
          <p><strong>Step 1 — Fix your metric first:</strong> Accuracy is misleading on imbalanced data (a 99% "No" classifier appears 99% accurate). Use F1-score, Precision-Recall AUC, or ROC-AUC instead.</p>
          <p><strong>Step 2 — Data-level techniques:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>SMOTE</strong> — Synthetic Minority Oversampling Technique: generates new synthetic minority samples by interpolating between existing ones</li>
            <li><strong>Random undersampling</strong> — remove majority samples. Fast but loses information</li>
            <li><strong>Class weights</strong> — set <code>class_weight='balanced'</code> in sklearn — tells the model to penalise minority errors more heavily</li>
          </ul>
          <p><strong>Step 3 — Algorithm-level:</strong> Ensemble methods like Random Forest handle imbalance better than logistic regression. XGBoost has a <code>scale_pos_weight</code> parameter specifically for this.</p>
          <p><strong>Step 4 — Threshold tuning:</strong> Default threshold is 0.5. Move it lower (e.g., 0.3) to catch more positives when recall matters more than precision (fraud, disease detection).</p>
        </>}
      />

      <QA difficulty="Medium"
        q="What is the difference between Generative and Discriminative models?"
        a={<>
          <p><strong>Discriminative models</strong> learn the decision boundary between classes — they model P(Y|X) directly. They ask: given these features, what's the probability of each class?</p>
          <p>Examples: Logistic Regression, SVM, Neural Networks, Random Forest</p>
          <p><strong>Generative models</strong> learn the full joint distribution P(X,Y) — how each class generates its data. They model P(X|Y) and use Bayes' theorem to compute P(Y|X).</p>
          <p>Examples: Naive Bayes, Gaussian Mixture Models, GANs, VAEs</p>
          <p><strong>Key insight:</strong> Generative models can generate new data samples (a GAN can create new images). Discriminative models cannot. However, discriminative models typically achieve higher classification accuracy when enough labelled data is available because they focus entirely on the decision boundary rather than modelling the entire data distribution.</p>
        </>}
      />

      <QA difficulty="Medium"
        q="Explain how gradient descent works. What are the differences between Batch, Stochastic, and Mini-Batch?"
        a={<>
          <p>Gradient descent is an iterative optimisation algorithm that minimises a loss function by moving parameters in the direction of the negative gradient (steepest descent).</p>
          <p><strong>Update rule:</strong> θ = θ - η × ∇L(θ) where η is the learning rate.</p>
          <p><strong>Batch GD:</strong> Computes gradient using ALL training examples before each update. Very stable, guaranteed to find global minimum for convex problems. Too slow for large datasets.</p>
          <p><strong>Stochastic GD (SGD):</strong> Updates after every single example. Very fast, noisy updates — can escape local minima but oscillates. Good for online learning.</p>
          <p><strong>Mini-Batch GD:</strong> Updates after processing a small batch (typically 32–256 examples). Best of both worlds — vectorised operations on GPU, reasonable stability. This is what every modern DL framework uses.</p>
          <p><strong>Learning rate choices:</strong> Too small → converges slowly or gets stuck. Too large → overshoots, diverges. Use learning rate schedulers (cosine annealing, warm-up) or adaptive optimisers like Adam which automatically tune per-parameter learning rates.</p>
        </>}
      />

      <QA difficulty="Hard"
        q="How does a Random Forest reduce variance compared to a single Decision Tree?"
        a={<>
          <p>A single decision tree has high variance — small changes in training data produce very different trees. Random Forest reduces this through two mechanisms:</p>
          <p><strong>1. Bagging (Bootstrap Aggregating):</strong> Each tree trains on a different bootstrap sample (random sample with replacement) of the training data — roughly 63% unique samples per tree. Different training sets → different trees → different errors that don't all go in the same direction.</p>
          <p><strong>2. Feature Randomness:</strong> At each split, only a random subset of features (typically √n for classification, n/3 for regression) is considered. This decorrelates the trees — they can't all rely on the same dominant feature, making their errors more independent.</p>
          <p><strong>Why averaging helps:</strong> If each tree has variance σ² and trees are fully independent, the ensemble variance is σ²/n (divides by n trees). Trees aren't fully independent, but the partial decorrelation still dramatically reduces variance.</p>
          <p><strong>The result:</strong> A single tree might be 95% train accuracy, 72% test accuracy (overfit). A 100-tree Random Forest might be 97% train, 91% test — variance reduced without increasing bias much.</p>
        </>}
      />

      <QA difficulty="Hard"
        q="What is the Curse of Dimensionality and how do you address it?"
        a={<>
          <p>As the number of features (dimensions) grows, the volume of the feature space grows exponentially. This causes several problems:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Data sparsity:</strong> More dimensions means data points become increasingly spread out. You need exponentially more data to maintain the same sample density. With 10 features and 1000 samples, you may have adequate coverage; with 1000 features, you'd need 10^300 samples for the same density.</li>
            <li><strong>Distance metrics break down:</strong> In high dimensions, the difference between the nearest and farthest point becomes negligible — destroying KNN's effectiveness.</li>
            <li><strong>Overfitting risk increases:</strong> More features = more parameters = easier to memorise training data</li>
          </ul>
          <p><strong>Solutions:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>PCA / t-SNE — reduce dimensions while preserving variance/structure</li>
            <li>Feature selection — remove irrelevant/redundant features (Lasso, mutual information, RFE)</li>
            <li>Regularisation — L1/L2 penalty reduces effective dimensionality</li>
            <li>Domain knowledge — hand-pick meaningful features instead of using all raw data</li>
          </ul>
        </>}
      />

      <QA difficulty="Hard"
        q="Explain the difference between Precision, Recall, F1-score, and ROC-AUC. When would you prioritise each?"
        a={<>
          <p><strong>Precision</strong> = TP / (TP + FP) — Of everything the model called positive, how many were actually positive? Optimise this when false positives are costly. Example: Email spam filter — you don't want legitimate emails flagged as spam.</p>
          <p><strong>Recall (Sensitivity)</strong> = TP / (TP + FN) — Of all actual positives, how many did the model find? Optimise this when false negatives are costly. Example: Cancer screening — missing a real tumour is far worse than a false alarm.</p>
          <p><strong>F1-Score</strong> = 2 × (Precision × Recall) / (Precision + Recall) — Harmonic mean of both. Use when you need a single metric that balances precision and recall. Best for imbalanced datasets.</p>
          <p><strong>ROC-AUC:</strong> Plots True Positive Rate vs False Positive Rate across all thresholds. AUC = 1.0 is perfect, 0.5 is random. Threshold-independent — tells you how well the model separates classes overall. Use to compare models, not to set operational thresholds.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
            <strong>Quick rule:</strong> Medical diagnosis → Recall. Spam filter → Precision. Model comparison → ROC-AUC. Imbalanced classes → F1.
          </div>
        </>}
      />

      <QA difficulty="Hard"
        q="What is data leakage and why is it dangerous?"
        a={<>
          <p>Data leakage occurs when information from outside the training set is used to build the model, making it appear to perform far better during evaluation than it will in production.</p>
          <p><strong>Two main types:</strong></p>
          <p><strong>Target Leakage:</strong> A feature that is only available after the target is known. Example: Including "credit_approved" as a feature when predicting "default_risk" — you wouldn't have that feature for new loan applicants.</p>
          <p><strong>Train-Test Contamination:</strong> Performing preprocessing steps that use information from the test set before splitting. Classic example: Scaling the entire dataset before splitting. The scaler computes mean/std from test data — information the model "shouldn't" have. Always fit the scaler on training data only, then transform test data using those fitted parameters.</p>
          <p><strong>The danger:</strong> You see 98% accuracy during evaluation, deploy the model, and it performs at 72% in production. You've wasted months of work. Leakage is the #1 cause of inflated ML evaluation metrics in practice.</p>
          <p><strong>Prevention:</strong> Always use sklearn <code>Pipeline</code> — it ensures preprocessing is fitted only on training folds during cross-validation.</p>
        </>}
      />

      {/* ── SECTION 2: CODING ── */}
      <div className="not-prose flex items-center gap-3 mb-5 mt-12">
        <div className="bg-emerald-600 text-white rounded-xl p-2.5"><Code2 className="w-5 h-5"/></div>
        <h2 className="text-2xl font-extrabold text-slate-900">2. Coding & Implementation</h2>
      </div>
      <p className="text-lg leading-relaxed text-slate-600 mb-6">
        Interviewers expect you to implement core algorithms from scratch in Python. This tests whether you truly understand the maths — not just the sklearn API.
      </p>

      <QA difficulty="Easy"
        q="Implement Linear Regression using only NumPy (Normal Equation)"
        a={<>
          <p>The normal equation gives the exact closed-form solution: <strong>w = (XᵀX)⁻¹ Xᵀy</strong></p>
          <CodeBlock code={`import numpy as np

class LinearRegressionScratch:
    def __init__(self):
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        # Add bias column of ones
        X_b = np.column_stack([np.ones(len(X)), X])
        # Normal equation: w = (X'X)^-1 X'y
        params = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
        self.bias    = params[0]
        self.weights = params[1:]

    def predict(self, X):
        return X @ self.weights + self.bias

# Example
X = np.array([[1],[2],[3],[4],[5]], dtype=float)
y = np.array([2, 4, 5, 4, 5], dtype=float)
model = LinearRegressionScratch()
model.fit(X, y)
print(f"Weight: {model.weights[0]:.2f}, Bias: {model.bias:.2f}")
print(f"Predictions: {model.predict(X).round(2)}")
# Output:
# Weight: 0.60, Bias: 2.20
# Predictions: [2.8 3.4 4.  4.6 5.2]`} />
        </>}
      />

      <QA difficulty="Easy"
        q="Implement a Decision Tree split criterion (Gini Impurity) from scratch"
        a={<>
          <p>Gini Impurity measures how often a randomly chosen element would be incorrectly classified. Formula: Gini = 1 - Σpᵢ²</p>
          <CodeBlock code={`import numpy as np

def gini_impurity(y):
    """Calculate Gini impurity for a set of labels."""
    n = len(y)
    if n == 0:
        return 0
    classes, counts = np.unique(y, return_counts=True)
    probabilities = counts / n
    return 1 - np.sum(probabilities ** 2)

def best_split(X, y):
    """Find the best feature and threshold to split on."""
    best_gini = float('inf')
    best_feature, best_threshold = None, None

    for feature in range(X.shape[1]):
        thresholds = np.unique(X[:, feature])
        for threshold in thresholds:
            left_mask  = X[:, feature] <= threshold
            right_mask = ~left_mask

            if left_mask.sum() == 0 or right_mask.sum() == 0:
                continue

            # Weighted Gini of the split
            n = len(y)
            gini = (left_mask.sum()  / n) * gini_impurity(y[left_mask]) + \
                   (right_mask.sum() / n) * gini_impurity(y[right_mask])

            if gini < best_gini:
                best_gini      = gini
                best_feature   = feature
                best_threshold = threshold

    return best_feature, best_threshold, best_gini

# Example
X = np.array([[2.5],[3.0],[1.5],[4.0],[3.5]])
y = np.array([0, 0, 0, 1, 1])
feat, thresh, gini = best_split(X, y)
print(f"Best split: feature {feat} <= {thresh:.1f}, Gini: {gini:.4f}")
# Output: Best split: feature 0 <= 3.0, Gini: 0.0000`} />
        </>}
      />

      <QA difficulty="Medium"
        q="Implement K-Means clustering from scratch"
        a={<>
          <CodeBlock code={`import numpy as np

def kmeans(X, k, max_iters=100, random_state=42):
    np.random.seed(random_state)

    # 1. Randomly initialise k centroids from the data points
    idx = np.random.choice(len(X), k, replace=False)
    centroids = X[idx].copy()

    for iteration in range(max_iters):
        # 2. Assign each point to the nearest centroid
        # X[:, np.newaxis] shape: (n_samples, 1, n_features)
        # centroids shape: (k, n_features)
        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        labels = np.argmin(distances, axis=1)  # shape: (n_samples,)

        # 3. Recompute centroids as mean of assigned points
        new_centroids = np.array([
            X[labels == i].mean(axis=0) if (labels == i).sum() > 0
            else centroids[i]           # keep centroid if no points assigned
            for i in range(k)
        ])

        # 4. Check convergence — stop if centroids didn't move
        if np.allclose(centroids, new_centroids, atol=1e-6):
            print(f"Converged at iteration {iteration + 1}")
            break
        centroids = new_centroids

    # Compute inertia (sum of squared distances to nearest centroid)
    inertia = sum(np.linalg.norm(X[labels==i] - centroids[i])**2
                  for i in range(k))
    return labels, centroids, inertia

# Example
np.random.seed(0)
X = np.vstack([np.random.randn(50, 2) + [0, 0],
               np.random.randn(50, 2) + [5, 5]])
labels, centroids, inertia = kmeans(X, k=2)
print(f"Cluster 0 size: {(labels==0).sum()}, Cluster 1 size: {(labels==1).sum()}")
print(f"Centroids:\\n{centroids.round(2)}")
# Output:
# Converged at iteration 4
# Cluster 0 size: 50, Cluster 1 size: 50
# Centroids: [[-0.06  0.03] [ 5.05  5.1 ]]`} />
        </>}
      />

      <QA difficulty="Medium"
        q="Implement gradient descent for logistic regression from scratch"
        a={<>
          <CodeBlock code={`import numpy as np

class LogisticRegressionScratch:
    def __init__(self, lr=0.01, n_iters=1000):
        self.lr = lr
        self.n_iters = n_iters
        self.weights = None
        self.bias = None
        self.losses = []

    def _sigmoid(self, z):
        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

    def _loss(self, y, y_pred):
        # Binary cross-entropy
        eps = 1e-9  # prevent log(0)
        return -np.mean(y * np.log(y_pred + eps) + (1-y) * np.log(1-y_pred + eps))

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias    = 0

        for i in range(self.n_iters):
            z      = X @ self.weights + self.bias
            y_pred = self._sigmoid(z)

            # Gradients (derived from cross-entropy loss)
            dw = (1/n_samples) * X.T @ (y_pred - y)
            db = (1/n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.weights -= self.lr * dw
            self.bias    -= self.lr * db

            if i % 100 == 0:
                self.losses.append(self._loss(y, y_pred))

    def predict_proba(self, X):
        return self._sigmoid(X @ self.weights + self.bias)

    def predict(self, X, threshold=0.5):
        return (self.predict_proba(X) >= threshold).astype(int)

# Example — binary classification
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

X, y = make_classification(n_samples=500, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

model = LogisticRegressionScratch(lr=0.1, n_iters=1000)
model.fit(X_train, y_train)
print(f"Accuracy: {accuracy_score(y_test, model.predict(X_test)):.2%}")
# Output: Accuracy: 86.00%`} />
        </>}
      />

      <QA difficulty="Hard"
        q="Implement train/test split and k-fold cross-validation from scratch"
        a={<>
          <CodeBlock code={`import numpy as np

def train_test_split_scratch(X, y, test_size=0.2, random_state=42):
    np.random.seed(random_state)
    n = len(X)
    indices = np.random.permutation(n)
    test_n  = int(n * test_size)
    test_idx  = indices[:test_n]
    train_idx = indices[test_n:]
    return X[train_idx], X[test_idx], y[train_idx], y[test_idx]

def k_fold_cross_validation(model, X, y, k=5, random_state=42):
    """
    Performs k-fold cross-validation.
    model must have .fit(X, y) and .score(X, y) methods.
    """
    np.random.seed(random_state)
    n = len(X)
    indices = np.random.permutation(n)

    fold_size = n // k
    scores = []

    for fold in range(k):
        # Define test fold indices
        start = fold * fold_size
        end   = start + fold_size if fold < k - 1 else n

        test_idx  = indices[start:end]
        train_idx = np.concatenate([indices[:start], indices[end:]])

        X_train, X_test = X[train_idx], X[test_idx]
        y_train, y_test = y[train_idx], y[test_idx]

        model.fit(X_train, y_train)
        score = model.score(X_test, y_test)
        scores.append(score)
        print(f"  Fold {fold+1}: {score:.4f}")

    print(f"Mean: {np.mean(scores):.4f} ± {np.std(scores):.4f}")
    return scores

# Example
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split_scratch(X, y)
print(f"Train: {len(X_train)}, Test: {len(X_test)}")

model = LogisticRegression(max_iter=500)
print("\\n5-Fold CV scores:")
scores = k_fold_cross_validation(model, X, y, k=5)
# Output:
# Train: 120, Test: 30
# Fold 1: 0.9667  Fold 2: 1.0  Fold 3: 0.9333  Fold 4: 0.9667  Fold 5: 1.0
# Mean: 0.9733 ± 0.0249`} />
        </>}
      />

      {/* ── SECTION 3: SYSTEM DESIGN ── */}
      <div className="not-prose flex items-center gap-3 mb-5 mt-12">
        <div className="bg-amber-600 text-white rounded-xl p-2.5"><Building2 className="w-5 h-5"/></div>
        <h2 className="text-2xl font-extrabold text-slate-900">3. System Design for ML</h2>
      </div>
      <p className="text-lg leading-relaxed text-slate-600 mb-6">
        Senior ML roles at FAANG ask you to design full ML systems end-to-end. Here is a structured framework plus a worked example.
      </p>

      <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-6">
        <p className="font-bold text-indigo-900 text-lg mb-4">The 6-Step ML System Design Framework</p>
        <div className="space-y-3">
          {[
            { step: '1', title: 'Clarify the problem', desc: 'What metric are we optimising? (CTR, revenue, user retention?) What are the latency / throughput constraints? Is data available?' },
            { step: '2', title: 'Define the ML task', desc: 'Is this classification, regression, ranking, generation? What is the label? How do we collect ground truth?' },
            { step: '3', title: 'Data pipeline', desc: 'Data sources, feature store, preprocessing pipeline, handling missing values, train/val/test splits, data freshness.' },
            { step: '4', title: 'Model selection', desc: 'Start simple (logistic regression, gradient boosting). Scale to neural nets only if simpler models fail. Justify complexity.' },
            { step: '5', title: 'Training & evaluation', desc: 'Offline metrics (AUC, NDCG, BLEU). Online metrics (A/B test). Monitoring for data drift, concept drift, latency.' },
            { step: '6', title: 'Deployment & serving', desc: 'Batch vs real-time inference. Model versioning. Rollback strategy. Shadow mode before full rollout.' },
          ].map(s => (
            <div key={s.step} className="flex gap-3">
              <div className="bg-indigo-600 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">{s.step}</div>
              <div>
                <p className="font-bold text-indigo-900 text-sm">{s.title}</p>
                <p className="text-indigo-700 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QA difficulty="Hard"
        q="Design a recommendation system for a platform like YouTube"
        a={<>
          <p><strong>Step 1 — Problem framing:</strong> Maximise watch time (primary metric) with diversity and freshness constraints. Latency: &lt;100ms. Scale: billions of users, millions of videos.</p>
          <p><strong>Step 2 — Architecture (two-stage):</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Candidate generation:</strong> Retrieve 100-500 candidates from billions of videos fast. Use embedding-based retrieval (user embedding vs video embedding, approximate nearest neighbour search with FAISS/ScaNN). Matrix factorisation or Two-Tower neural network.</li>
            <li><strong>Ranking:</strong> Score the 100-500 candidates precisely. Use a deep neural network with rich features. Can afford higher latency here since working with fewer items.</li>
          </ul>
          <p><strong>Step 3 — Features:</strong> User history (watch history, likes, search queries), video features (title embedding, category, duration, age), context (time of day, device, location).</p>
          <p><strong>Step 4 — Training:</strong> Implicit feedback (watch %, likes, shares). Label: "watched &gt;70% of video" as positive. Train with cross-entropy loss. Re-train daily on fresh data.</p>
          <p><strong>Step 5 — Evaluation:</strong> Offline: Recall@K, NDCG. Online: A/B test. Watch time, click-through rate. Watch for filter bubbles — add exploration (ε-greedy).</p>
          <p><strong>Step 6 — Production:</strong> Precompute user/video embeddings nightly. Serve via approximate nearest-neighbour index. Log all recommendations for future training data.</p>
        </>}
      />

      <QA difficulty="Hard"
        q="How would you detect and handle model drift in production?"
        a={<>
          <p><strong>Model drift</strong> occurs when a model's real-world performance degrades over time because the real world changes but the model doesn't.</p>
          <p><strong>Two types:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Data drift (covariate shift):</strong> The distribution of input features X changes. Example: A fraud detection model trained in 2022 sees different spending patterns in 2024. Detect with: PSI (Population Stability Index), KL divergence, Kolmogorov-Smirnov test on feature distributions.</li>
            <li><strong>Concept drift:</strong> The relationship between X and Y changes. Example: User sentiment about a topic shifts after a major event. Harder to detect — requires monitoring output distributions and ground truth labels over time.</li>
          </ul>
          <p><strong>Detection strategy:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Monitor prediction distribution daily — sudden shifts signal drift</li>
            <li>Monitor input feature statistics — mean, std, % missing, % outliers</li>
            <li>Track business metrics (CTR, conversion) as proxies</li>
            <li>Use tools: Evidently AI, Arize, WhyLabs, AWS SageMaker Model Monitor</li>
          </ul>
          <p><strong>Handling:</strong> Retrain on recent data. Use concept-drift-aware models (sliding window, ADWIN). Set up automated retraining pipelines triggered by drift alerts.</p>
        </>}
      />

      {/* ── SECTION 4: FAANG TIPS ── */}
      <div className="not-prose flex items-center gap-3 mb-5 mt-12">
        <div className="bg-rose-600 text-white rounded-xl p-2.5"><Target className="w-5 h-5"/></div>
        <h2 className="text-2xl font-extrabold text-slate-900">4. Tips for FAANG / Big Tech Interviews</h2>
      </div>

      <div className="not-prose space-y-4 mb-8">
        {[
          {
            title: 'Always start with a baseline',
            desc: "When asked to solve an ML problem, never jump straight to deep learning. Say: 'I'd start with logistic regression as a baseline. It's interpretable, fast to train, and gives us a performance floor to beat.' Interviewers love this — it shows engineering maturity.",
            color: 'border-indigo-400 bg-indigo-50',
          },
          {
            title: 'Explain your reasoning out loud',
            desc: "Interviews test thinking, not memorisation. When choosing between two models, say: 'I'd choose Random Forest over SVM here because the dataset is likely non-linear and I don't know the optimal kernel in advance. RF is also less sensitive to feature scaling.' The explicit justification is the answer.",
            color: 'border-emerald-400 bg-emerald-50',
          },
          {
            title: 'Know the statistical assumptions behind each algorithm',
            desc: "Don't just know how to call model.fit(). Know: Linear Regression assumes linearity, homoscedasticity, independence of errors, and normality of residuals. Naive Bayes assumes feature independence. Logistic Regression assumes no multicollinearity. You will be asked to diagnose when a model is failing and why.",
            color: 'border-amber-400 bg-amber-50',
          },
          {
            title: "Talk about MLOps even if they don't ask",
            desc: "Most ML candidates only discuss modelling. Stand out by mentioning deployment: 'After training, I'd serialize the model with ONNX for cross-platform serving, set up a monitoring pipeline to track feature drift, and use A/B testing to validate the new model before full rollout.' This signals production experience.",
            color: 'border-violet-400 bg-violet-50',
          },
          {
            title: 'Be quantitative about trade-offs',
            desc: "Don't say 'Random Forest is better than Decision Tree.' Say: 'A single decision tree might achieve 72% test accuracy on this problem. A 100-tree Random Forest typically improves that to 88-91% by reducing variance through bagging and feature randomisation, at the cost of 100x inference time and loss of direct interpretability.' Numbers always beat vague comparisons.",
            color: 'border-cyan-400 bg-cyan-50',
          },
          {
            title: 'Prepare two stories for the behavioural round',
            desc: "Prepare a story about: (1) A model that failed in production and what you did. (2) A time you disagreed with a team decision about an ML approach. FAANG uses STAR format (Situation, Task, Action, Result). The 'failure' story is often the most important — it shows self-awareness and learning mindset.",
            color: 'border-rose-400 bg-rose-50',
          },
        ].map(t => (
          <div key={t.title} className={`border-l-4 ${t.color} rounded-r-xl p-5`}>
            <p className="font-bold text-slate-900 mb-1.5">{t.title}</p>
            <p className="text-slate-700 text-sm leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* ── SECTION 5: MISTAKES ── */}
      <div className="not-prose flex items-center gap-3 mb-5 mt-12">
        <div className="bg-red-600 text-white rounded-xl p-2.5"><AlertTriangle className="w-5 h-5"/></div>
        <h2 className="text-2xl font-extrabold text-slate-900">5. Common Mistakes to Avoid</h2>
      </div>

      <div className="not-prose space-y-3 mb-10">
        {[
          {
            mistake: 'Using accuracy on imbalanced data',
            fix: 'A dataset with 95% negative class will show 95% accuracy from a model that always predicts negative. Always check class distribution first. Use F1, PR-AUC, or ROC-AUC.',
          },
          {
            mistake: 'Scaling data before splitting into train/test',
            fix: 'This is data leakage. The scaler learns statistics (mean, std) from test data. Always: split first, fit scaler on train only, transform both. Use sklearn Pipeline to prevent this automatically.',
          },
          {
            mistake: 'Defaulting to deep learning for every problem',
            fix: 'For tabular data with <100K samples, XGBoost almost always beats neural networks. Deep learning requires large amounts of data, long training times, and careful tuning. Establish a gradient boosting baseline first.',
          },
          {
            mistake: 'Not tuning the decision threshold',
            fix: 'The default 0.5 threshold is almost never optimal for real problems. Plot the precision-recall curve, choose the threshold based on business requirements (high recall for medical, high precision for spam), and explicitly justify your choice.',
          },
          {
            mistake: 'Evaluating on the test set multiple times',
            fix: 'The test set is sacred — it should be touched exactly once after all model development is complete. Every time you evaluate on it and make a decision, you leak information. Use a validation set (or cross-validation) during development. The test set is your final, single evaluation.',
          },
          {
            mistake: 'Ignoring feature importance and model behaviour',
            fix: 'Interviewers often ask: "How do you know your model is learning the right things?" Use SHAP values, partial dependence plots, or permutation importance. A model that achieves 95% accuracy by exploiting a leaky feature is useless in production.',
          },
          {
            mistake: 'Presenting results without confidence intervals',
            fix: '"My model achieves 87% accuracy" is a weak answer. "My model achieves 87.3% ± 2.1% accuracy across 5-fold cross-validation" is a strong one. Always report uncertainty — especially important when comparing two models with similar performance.',
          },
          {
            mistake: 'Not asking clarifying questions in system design',
            fix: 'Jumping straight into modelling without asking "What does success look like?", "What latency constraints exist?", "How much training data is available?" shows poor engineering judgement. The best candidates ask 3-5 clarifying questions before touching any technical design.',
          },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 shadow-sm">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"/>
            <div>
              <p className="font-bold text-slate-800 text-sm mb-1">{item.mistake}</p>
              <p className="text-slate-600 text-xs leading-relaxed"><span className="font-semibold text-emerald-700">✓ Fix: </span>{item.fix}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── FINAL SUMMARY ── */}
      <div className="not-prose bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white mt-10">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-8 h-8 text-yellow-300 flex-shrink-0 mt-1"/>
          <div>
            <p className="font-bold text-xl mb-3">The Most Important Insight</p>
            <p className="text-indigo-100 leading-relaxed mb-3">
              Interviewers care more about your <strong className="text-white">problem-solving methodology</strong> than memorisation of formulas. When given a problem, the best candidates:
            </p>
            <ol className="text-indigo-100 text-sm space-y-1.5 list-decimal pl-5">
              <li>Ask clarifying questions before touching any code or model</li>
              <li>Establish a simple baseline first and state its expected performance</li>
              <li>Iteratively improve while explicitly stating trade-offs at each step</li>
              <li>Connect technical decisions to business impact</li>
              <li>Identify failure modes and mitigation strategies proactively</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
