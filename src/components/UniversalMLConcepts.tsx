import React from 'react';
import { AlertTriangle, TrendingUp, Cpu, Activity, Database } from 'lucide-react';

interface Props { topicTitle: string; }

// Topic-specific production tips that feel native to each page
const tips: Record<string, { icon: React.ReactNode; title: string; body: string }[]> = {
  "Linear Regression": [
    { icon: <Database className="w-4 h-4"/>, title: "Watch for multicollinearity", body: "When two input features are highly correlated (e.g. area in sq ft and area in sq m), coefficient estimates become unstable. Check using the Variance Inflation Factor (VIF) before training." },
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Outliers distort the line", body: "A single extreme data point can drag the regression line significantly. Always visualise your data with a scatter plot and consider removing or capping outliers before fitting." },
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Scale features for gradient descent", body: "If you are using gradient descent (not the analytical solution), unscaled features with very different magnitudes will cause slow, uneven convergence. Standardise with StandardScaler first." },
  ],
  "Decision Trees": [
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Limit tree depth to avoid overfitting", body: "An unconstrained tree will perfectly memorise training data. Set max_depth=5 to 10 as a starting point and tune with cross-validation. A shallow tree that generalises is always better than a deep one that memorises." },
    { icon: <Database className="w-4 h-4"/>, title: "No feature scaling needed", body: "Unlike KNN or SVM, decision trees split on thresholds, not distances. You do not need to standardise or normalise features — this is one of the biggest practical advantages." },
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Use as a base for ensembles", body: "In production, standalone decision trees are rarely used. They shine as the building block of Random Forest and Gradient Boosting, where hundreds of shallow trees combine for much better accuracy." },
  ],
  "Random Forest": [
    { icon: <Cpu className="w-4 h-4"/>, title: "n_estimators vs training time", body: "More trees improve accuracy but increase training time linearly. Start with 100 trees and increase until performance plateaus. In production, 200–500 trees is the common sweet spot." },
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Feature importance is not causation", body: "Random Forest provides feature_importances_ scores but these only indicate predictive power, not causal relationships. High importance means the feature helps prediction, not that it causes the outcome." },
    { icon: <Activity className="w-4 h-4"/>, title: "Monitor for concept drift", body: "When the real-world data distribution shifts over time (e.g. user behaviour changes), your forest's accuracy will degrade. Retrain periodically on recent data and monitor prediction confidence scores." },
  ],
  "Gradient Descent": [
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Learning rate is the most critical hyperparameter", body: "Too high and training diverges; too low and it takes thousands of iterations to converge. Use learning rate schedulers (e.g. cosine annealing) or adaptive methods like Adam in deep learning." },
    { icon: <Database className="w-4 h-4"/>, title: "Always scale features first", body: "Features with very different scales create an elongated loss surface where gradient descent zigzags inefficiently. StandardScaler or MinMaxScaler before training speeds convergence dramatically." },
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Mini-batch is the production standard", body: "Pure batch gradient descent is slow on large datasets; pure stochastic is noisy. Mini-batch (32–256 samples per update) gives the best balance of speed and stability and is what PyTorch and TensorFlow use by default." },
  ],
  "K-Means Clustering": [
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Always scale features before clustering", body: "K-Means uses Euclidean distance. A feature with range 0–10,000 will completely dominate one with range 0–1. StandardScaler is essential — otherwise your clusters reflect feature magnitude, not real similarity." },
    { icon: <Database className="w-4 h-4"/>, title: "K-Means assumes spherical clusters", body: "The algorithm struggles with elongated, ring-shaped, or unevenly-sized clusters. For complex cluster shapes, consider DBSCAN or Gaussian Mixture Models instead." },
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Use K-Means++ initialisation", body: "Random centroid initialisation can lead to poor results. sklearn's default KMeans uses k-means++ which spreads initial centroids intelligently, giving faster convergence and better final clusters." },
  ],
  "Support Vector Machine": [
    { icon: <Cpu className="w-4 h-4"/>, title: "SVM does not scale well to large datasets", body: "Training complexity is O(n²) to O(n³) with number of samples. For datasets above 100,000 rows, consider LinearSVC or SGDClassifier which approximate SVM much faster." },
    { icon: <Database className="w-4 h-4"/>, title: "Feature scaling is mandatory", body: "SVM is one of the most sensitive algorithms to unscaled features. Always apply StandardScaler before fitting — the margin calculation is based on distances and will be completely wrong without scaling." },
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Tune C and kernel together", body: "C controls the penalty for misclassifications. A high C = hard margin (risks overfitting); low C = soft margin (risks underfitting). Always grid search C alongside the kernel choice." },
  ],
  "Neural Networks": [
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Vanishing gradients in deep networks", body: "In very deep networks, gradients shrink as they propagate backwards, making early layers learn extremely slowly. Use ReLU activations, batch normalisation, and residual connections to mitigate this." },
    { icon: <Cpu className="w-4 h-4"/>, title: "GPU training is almost always necessary", body: "Training neural networks on CPU for any non-trivial dataset is impractically slow. Use Google Colab (free GPU), Paperspace, or AWS EC2 GPU instances for training." },
    { icon: <Activity className="w-4 h-4"/>, title: "Monitor both train and validation loss", body: "When validation loss starts increasing while training loss keeps decreasing, your network is overfitting. Use early stopping, dropout, and weight decay to regularise. Never evaluate on the training set." },
  ],
  "Bias-Variance Tradeoff": [
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Learning curves diagnose the problem", body: "Plot training vs validation accuracy as training set size grows. Both low = high bias (underfit). Large gap between them = high variance (overfit). This visual diagnosis is faster than trial and error." },
    { icon: <Database className="w-4 h-4"/>, title: "More data fixes variance, not bias", body: "Adding more training data reduces overfitting (variance) but does not fix an underfitting model (high bias). For high bias, you need a more complex model or better features, not more data." },
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Ensemble methods directly target this tradeoff", body: "Bagging (Random Forest) reduces variance without increasing bias. Boosting (XGBoost) reduces bias without increasing variance much. This is exactly why ensemble methods dominate real-world ML competitions." },
  ],
  "Confusion Matrix": [
    { icon: <AlertTriangle className="w-4 h-4"/>, title: "Accuracy is misleading on imbalanced data", body: "If 95% of emails are legitimate, a model that always predicts 'not spam' achieves 95% accuracy while being completely useless. Always check Precision, Recall and F1 score alongside accuracy." },
    { icon: <TrendingUp className="w-4 h-4"/>, title: "Choose threshold based on business cost", body: "In medical diagnosis, a False Negative (missing cancer) is far worse than a False Positive (unnecessary retest). Lower the classification threshold to increase Recall at the cost of Precision when the cost of missing positives is high." },
    { icon: <Database className="w-4 h-4"/>, title: "Normalise the matrix for class imbalance", body: "When classes have very different sizes, normalise the confusion matrix by dividing each row by its total. This shows the percentage of each class correctly classified, making performance comparison fair." },
  ],
};

const defaultTips = [
  { icon: <Database className="w-4 h-4"/>, title: "Data quality is everything", body: "No algorithm can compensate for irrelevant or unrepresentative data. Before tuning hyperparameters, invest time in understanding your data distribution, handling missing values, and removing outliers." },
  { icon: <AlertTriangle className="w-4 h-4"/>, title: "Always validate on held-out data", body: "Never evaluate your model on the same data it was trained on. Use k-fold cross-validation during development and keep a completely separate test set that is only touched once at the very end." },
  { icon: <Activity className="w-4 h-4"/>, title: "Monitor for concept drift in production", body: "Real-world data distributions shift over time. A model trained today may degrade in 6 months as user behaviour changes. Set up monitoring dashboards and schedule periodic retraining." },
];

export function UniversalMLConcepts({ topicTitle }: Props) {
  const pageTips = tips[topicTitle] || defaultTips;

  return (
    <div className="mt-10 mb-2">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Practical Tips for Production</h2>
      <p className="text-slate-500 text-sm mb-6">Common pitfalls and best practices when using {topicTitle} in real projects.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {pageTips.map((tip, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              {tip.icon}
              <span className="font-semibold text-slate-800 text-sm">{tip.title}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{tip.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
