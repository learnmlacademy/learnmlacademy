export type SubTopic = {
  id: string;
  title: string;
};

export type Category = {
  id: string;
  title: string;
  subtopics: SubTopic[];
};

export const curriculum: Category[] = [
  {
    id: "foundations",
    title: "1. Foundations",
    subtopics: [
      { id: "what-is-ml", title: "What is Machine Learning?" },
      { id: "types-of-ml", title: "Types of Machine Learning" },
      { id: "supervised-learning-intro", title: "Supervised Learning" },
      { id: "unsupervised-learning-intro", title: "Unsupervised Learning" },
      { id: "reinforcement-learning-intro", title: "Reinforcement Learning" },
      { id: "batch-vs-online", title: "Batch vs Online Learning" },
      { id: "ml-lifecycle", title: "ML Life Cycle" },
    ],
  },
  {
    id: "python-ml-libs",
    title: "2. Python & ML Libraries",
    subtopics: [
      { id: "python-for-ml", title: "Python for Machine Learning" },
      { id: "numpy-essentials", title: "NumPy Essentials for ML" },
      { id: "pandas-essentials", title: "Pandas Essentials for ML" },
      { id: "scikit-learn-essentials", title: "Scikit-learn Essentials" },
    ],
  },
  {
    id: "data-preprocessing",
    title: "3. Data Preprocessing & Feature Engineering",
    subtopics: [
      { id: "eda", title: "Exploratory Data Analysis (EDA)" },
      { id: "handling-missing-data", title: "Handling Missing Data" },
      { id: "encoding-categorical", title: "Encoding Categorical Data" },
      { id: "bias-variance", title: "Bias-Variance Tradeoff" },
      { id: "feature-scaling", title: "Feature Scaling" },
      { id: "feature-engineering", title: "Feature Engineering" },
      { id: "feature-selection", title: "Feature Selection & Extraction" },
      { id: "data-visualization", title: "Data Visualization for ML" },
    ],
  },
  {
    id: "supervised-learning",
    title: "4. Supervised Learning",
    subtopics: [
      { id: "regression-intro", title: "Regression Algorithms Overview" },
      { id: "linear-regression", title: "Linear Regression" },
      { id: "gradient-descent", title: "Gradient Descent" },
      { id: "polynomial-regression", title: "Polynomial Regression" },
      { id: "ridge-regression", title: "Ridge Regression" },
      { id: "lasso-regression", title: "Lasso Regression" },
      { id: "classification-intro", title: "Classification Algorithms Overview" },
      { id: "logistic-regression", title: "Logistic Regression" },
      { id: "decision-trees", title: "Decision Trees" },
      { id: "naive-bayes", title: "Naive Bayes" },
      { id: "knn", title: "K-Nearest Neighbors (KNN)" },
      { id: "svm", title: "Support Vector Machines (SVM)" },
    ],
  },
  {
    id: "ensemble-learning",
    title: "5. Ensemble Learning",
    subtopics: [
      { id: "random-forest", title: "Random Forest" },
      { id: "bagging", title: "Bagging" },
      { id: "boosting", title: "Boosting Overview" },
      { id: "adaboost", title: "AdaBoost" },
      { id: "gradient-boosting", title: "Gradient Boosting" },
      { id: "xgboost", title: "XGBoost" },
    ],
  },
  {
    id: "unsupervised-learning",
    title: "6. Unsupervised Learning",
    subtopics: [
      { id: "kmeans", title: "K-Means Clustering" },
      { id: "hierarchical", title: "Hierarchical Clustering" },
      { id: "dbscan", title: "DBSCAN" },
      { id: "pca", title: "Principal Component Analysis (PCA)" },
      { id: "tsne", title: "t-SNE" },
      { id: "association-rules", title: "Association Rules" },
      { id: "apriori", title: "Apriori Algorithm" },
    ],
  },
  {
    id: "model-evaluation",
    title: "7. Model Evaluation & Optimization",
    subtopics: [
      { id: "train-test-split", title: "Train/Test Split" },
      { id: "cross-validation", title: "Cross-Validation" },
      { id: "overfitting-underfitting", title: "Overfitting & Underfitting" },
      { id: "cost-functions", title: "Cost Functions" },
      { id: "hyperparameter-tuning", title: "Hyperparameter Tuning" },
      { id: "grid-random-search", title: "Grid & Random Search" },
      { id: "confusion-matrix", title: "Confusion Matrix" },
      { id: "roc-auc", title: "ROC-AUC" },
    ],
  },
  {
    id: "time-series",
    title: "8. Time Series & Forecasting",
    subtopics: [
      { id: "arima", title: "ARIMA" },
      { id: "moving-average", title: "Moving Average" },
      { id: "exponential-smoothing", title: "Exponential Smoothing" },
      { id: "forecasting-basics", title: "Forecasting Basics" },
    ],
  },
  {
    id: "advanced-paradigms",
    title: "9. Advanced Learning Paradigms",
    subtopics: [
      { id: "semi-supervised", title: "Semi-Supervised Learning" },
      { id: "online-learning", title: "Online Learning" },
      { id: "reinforcement-learning-adv", title: "Reinforcement Learning (Advanced)" },
      { id: "multi-armed-bandits", title: "Multi-Armed Bandits" },
    ],
  },
  {
    id: "deep-learning",
    title: "10. Deep Learning & Interviews",
    subtopics: [
      { id: "neural-networks", title: "Neural Networks Explained" },
      { id: "deep-learning-intro", title: "Deep Learning Introduction" },
      { id: "ml-interview-questions", title: "ML Interview Questions" },
    ],
  }
];

export function getTopicById(id: string): { subtopic: SubTopic, category: Category } | null {
  for (const category of curriculum) {
    const subtopic = category.subtopics.find(st => st.id === id);
    if (subtopic) {
      return { subtopic, category };
    }
  }
  return null;
}
