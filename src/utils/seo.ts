export const getSEOData = (topicId: string, defaultTitle: string): { title: string; description: string } => {
  const seoData: Record<string, { title: string; description: string }> = {
    // 1. Foundations
    "what-is-ml": {
      title: "What is Machine Learning? Complete Beginner Guide | ML Academy",
      description: "Learn the basics of Machine Learning, how it works, and its real-world applications in this comprehensive beginner's guide with python examples."
    },
    "types-of-ml": {
      title: "Types of Machine Learning: Supervised, Unsupervised & RL",
      description: "Discover the different types of Machine Learning including Supervised, Unsupervised, and Reinforcement Learning with real-world examples."
    },
    "supervised-learning-intro": {
      title: "Supervised Learning Explained | Machine Learning Basics",
      description: "Learn what Supervised Learning is, how labeled data works, and common algorithms used for classification and regression tasks."
    },
    "unsupervised-learning-intro": {
      title: "Unsupervised Learning Guide | Clustering & Dimensionality",
      description: "Understand Unsupervised Learning. Learn how algorithms find hidden patterns in unlabeled data using clustering and PCA."
    },
    "reinforcement-learning-intro": {
      title: "Reinforcement Learning Basics | Agents, Environments & Rewards",
      description: "A beginner's guide to Reinforcement Learning. Discover how AI agents learn through trial and error using rewards and penalties."
    },
    "batch-vs-online": {
      title: "Batch vs Online Learning | Machine Learning Paradigms",
      description: "Compare Batch Learning and Online Learning. Understand when to train ML models incrementally versus all at once."
    },
    "ml-lifecycle": {
      title: "The Essential Machine Learning Life Cycle | End-to-End ML",
      description: "Explore the end-to-end Machine Learning life cycle: from data collection and preprocessing to model deployment and monitoring."
    },

    // 2. Python & ML Libraries
    "python-for-ml": {
      title: "Why Python for Machine Learning? | ML Programming Basics",
      description: "Understand why Python is the most popular language for Machine Learning and explore its rich ecosystem of data science libraries."
    },
    "numpy-essentials": {
      title: "NumPy Essentials for ML (Linear Algebra & Arrays)",
      description: "Master NumPy for Machine Learning. Understand vectorization, broadcasting, and matrix multiplications required for AI."
    },
    "pandas-essentials": {
      title: "Pandas Essentials for Machine Learning | ML Academy",
      description: "Learn the most important Pandas DataFrame operations, cleaning techniques, and feature engineering for Machine Learning data prep."
    },
    "scikit-learn-essentials": {
      title: "Scikit-Learn Tutorial for Beginners | ML Full Workflow",
      description: "Learn how to use Scikit-learn to split data, scale features, and train models using the universal ML Pipeline."
    },

    // 3. Data & Preprocessing
    "eda": {
      title: "Exploratory Data Analysis (EDA) in Machine Learning",
      description: "Learn how to perform Exploratory Data Analysis (EDA) to understand data distributions, spot outliers, and prepare for ML modeling."
    },
    "handling-missing-data": {
      title: "Handling Missing Data in Machine Learning | Imputation Methods",
      description: "Discover techniques to handle missing data in your datasets, including dropping rows, mean/median imputation, and predictive filling."
    },
    "encoding-categorical": {
      title: "Encoding Categorical Data | One-Hot & Label Encoding",
      description: "Learn how to convert categorical text data into numerical formats using One-Hot Encoding and Label Encoding for ML models."
    },
    "bias-variance": {
      title: "The Bias-Variance Tradeoff Explained | ML Core Concepts",
      description: "Deep dive into the Bias-Variance Tradeoff, underfitting, overfitting, and how to find the optimal model complexity."
    },
    "feature-scaling": {
      title: "Feature Scaling: Standardization vs Normalization",
      description: "Understand why feature scaling matters in ML. Compare Min-Max Normalization and Z-score Standardization with Python examples."
    },
    "feature-engineering": {
      title: "Feature Engineering Techniques for Better ML Models",
      description: "Learn how to extract and create new impactful features from raw data to drastically improve Machine Learning model accuracy."
    },
    "feature-selection": {
      title: "Feature Selection & Extraction Methods | ML Academy",
      description: "Discover how to reduce dimensionality and select the most important variables for your ML models to prevent overfitting."
    },
    "data-visualization": {
      title: "Data Visualization for Machine Learning | Matplotlib & Seaborn",
      description: "Master data visualization techniques using Python libraries like Matplotlib and Seaborn to uncover hidden patterns in data."
    },

    // 4. Supervised Learning
    "regression-intro": {
      title: "Regression Algorithms Overview | Predicting Continuous Values",
      description: "An introduction to regression in Machine Learning. Learn how regression algorithms predict continuous numerical values."
    },
    "linear-regression": {
      title: "Linear Regression in Machine Learning (with Python code)",
      description: "Understand Linear Regression, how it minimizes error using Ordinary Least Squares, and build your own model in Python and Scikit-learn."
    },
    "gradient-descent": {
      title: "Gradient Descent Algorithm Explained | Optimizing ML Models",
      description: "Learn how Gradient Descent works to minimize cost functions in Machine Learning and Deep Learning, with intuitive math."
    },
    "polynomial-regression": {
      title: "Polynomial Regression | Capturing Non-Linear Patterns",
      description: "Learn when and how to use Polynomial Regression to model non-linear relationships in your datasets using Scikit-learn."
    },
    "ridge-regression": {
      title: "Ridge Regression Explained (L2 Regularization)",
      description: "Understand Ridge Regression and L2 Regularization to prevent overfitting in models with high multicollinearity."
    },
    "lasso-regression": {
      title: "Lasso Regression (L1 Regularization) & Feature Selection",
      description: "Learn how Lasso Regression uses L1 Regularization to prevent overfitting and perform automatic feature selection."
    },
    "classification-intro": {
      title: "Classification Algorithms Overview | ML Categorization",
      description: "An introduction to classification tasks in Machine Learning. Learn how algorithms categorize data into distinct classes."
    },
    "logistic-regression": {
      title: "Logistic Regression in Machine Learning | Binary Classification",
      description: "Deep dive into Logistic Regression. Learn how it uses the sigmoid function to output probabilities for binary classification tasks."
    },
    "decision-trees": {
      title: "Decision Trees Explained | Interactive ML Tutorial",
      description: "Learn how Decision Trees work for classification and regression, information gain, Gini impurity, and Python implementations."
    },
    "naive-bayes": {
      title: "Naive Bayes Classifier Explained | NLP & Probability",
      description: "Understand the Naive Bayes algorithm, Bayes' Theorem, and how it is effectively used in text classification and spam filtering."
    },
    "knn": {
      title: "K-Nearest Neighbors (KNN) Algorithm | Distance-Based ML",
      description: "Learn how the K-Nearest Neighbors (KNN) algorithm classifies data points based on proximity and distance metrics."
    },
    "svm": {
      title: "Support Vector Machines (SVM) & The Kernel Trick",
      description: "Master Support Vector Machines. Understand margins, hyperplanes, and how the Kernel trick solves non-linear classification problems."
    },

    // 5. Ensemble Learning
    "random-forest": {
      title: "Random Forest Algorithm | Bagging & Ensemble Learning",
      description: "Learn how Random Forests combine multiple decision trees to reduce variance, prevent overfitting, and boost accuracy."
    },
    "bagging": {
      title: "Bagging (Bootstrap Aggregating) in Machine Learning",
      description: "Understand the concept of Bagging in ensemble learning and how bootstrapping creates robust machine learning models."
    },
    "boosting": {
      title: "Boosting Algorithms Overview | Ensemble ML",
      description: "An introduction to Boosting techniques in Machine Learning, converting weak learners into strong foundational models."
    },
    "adaboost": {
      title: "AdaBoost Algorithm Explained | Adaptive Boosting",
      description: "Learn how AdaBoost sequentially corrects model errors by automatically adjusting sample weights during training."
    },
    "gradient-boosting": {
      title: "Gradient Boosting Machines (GBM) Explained | ML Ensemble",
      description: "Understand Gradient Boosting Machines and how they optimize arbitrary loss functions using gradient descent on residuals."
    },
    "xgboost": {
      title: "XGBoost Algorithm Deep Dive | Extreme Gradient Boosting",
      description: "Master XGBoost, the winning algorithm of Kaggle competitions. Learn its architecture, mathematically optimizations, and Python implementation."
    },

    // 6. Unsupervised Learning
    "kmeans": {
      title: "K-Means Clustering Algorithm Explained | Unsupervised ML",
      description: "Learn how K-Means clustering partitions data into K distinct groups and how to find the optimal number of clusters using the Elbow Method."
    },
    "hierarchical": {
      title: "Hierarchical Clustering & Dendrograms in Machine Learning",
      description: "Understand Agglomerative Hierarchical Clustering, linkage methods, and how to interpret dendrograms."
    },
    "dbscan": {
      title: "DBSCAN Clustering Algorithm | Density-Based Unsupervised ML",
      description: "Learn how DBSCAN finds clusters of arbitrary shapes and isolates noise (outliers) based on spatial density."
    },
    "pca": {
      title: "Principal Component Analysis (PCA) | Dimensionality Reduction",
      description: "Master PCA. Learn how to mathematically project high-dimensional data into a lower-dimensional space while retaining variance."
    },
    "tsne": {
      title: "t-SNE Algorithm for Data Visualization | Dimensionality Reduction",
      description: "Understand t-Distributed Stochastic Neighbor Embedding (t-SNE) for visualizing complex, high-dimensional datasets in 2D or 3D."
    },
    "association-rules": {
      title: "Association Rule Mining in Machine Learning",
      description: "Discover Association Rule Learning. Understand Support, Confidence, and Lift metrics for market basket analysis."
    },
    "apriori": {
      title: "Apriori Algorithm for Frequent Itemset Mining",
      description: "Learn the Apriori Algorithm. See how it identifies frequent itemsets and generates association rules for recommendation systems."
    },

    // 7. Model Evaluation
    "train-test-split": {
      title: "Train-Test Split & Validation Sets | ML Workflow essentials",
      description: "Understand why splitting your dataset into training, validation, and testing sets is crucial to prevent data leakage and evaluate models properly."
    },
    "cross-validation": {
      title: "K-Fold Cross-Validation Explained | Robust ML Evaluation",
      description: "Learn how K-Fold Cross-Validation ensures robust, generalizable model performance without relying on a single lucky test split."
    },
    "overfitting-underfitting": {
      title: "Overfitting and Underfitting in ML | Diagnosis & Cures",
      description: "Master the diagnosis of Overfitting and Underfitting in predictive models and learn actionable techniques to mitigate both."
    },
    "cost-functions": {
      title: "Cost Functions and Loss Functions in Machine Learning",
      description: "Understand the mathematical differences between MSE, Log Loss, and Cross-Entropy and when to use them."
    },
    "hyperparameter-tuning": {
      title: "Hyperparameter Tuning Guide | Optimizing ML Models",
      description: "Learn how to optimize machine learning models by fine-tuning algorithm hyperparameters for maximum predictive accuracy."
    },
    "grid-random-search": {
      title: "Grid Search vs. Random Search | Hyperparameter Optimization",
      description: "Compare Grid Search and Random Search. Learn how to implement Scikit-Learn's GridSearchCV and RandomizedSearchCV."
    },
    "confusion-matrix": {
      title: "Confusion Matrix, Precision, Recall & F1-Score Explained",
      description: "Learn how to read a Confusion Matrix and calculate essential classification metrics like Accuracy, Precision, Recall, and F1-Score."
    },
    "roc-auc": {
      title: "ROC Curve and AUC Metric | Classification Evaluation",
      description: "Understand the Receiver Operating Characteristic (ROC) curve and Area Under the Curve (AUC) for evaluating binary classifiers."
    },

    // 8. Time Series
    "arima": {
      title: "ARIMA Model for Time Series Forecasting",
      description: "Learn the AutoRegressive Integrated Moving Average (ARIMA) model to forecast non-stationary time series data."
    },
    "moving-average": {
      title: "Moving Average Models in Time Series",
      description: "Understand Simple Moving Averages (SMA) and Exponential Moving Averages (EMA) for smoothing time series patterns."
    },
    "exponential-smoothing": {
      title: "Exponential Smoothing (Holt-Winters) Forecasting",
      description: "Learn Exponential Smoothing and Holt-Winters methods to model time series with trend and seasonality components."
    },
    "forecasting-basics": {
      title: "Time Series Forecasting Basics | ML Academy",
      description: "Learn the fundamentals of Time Series Forecasting, trend, seasonality, and evaluation metrics like MAE and MAP with Python."
    },

    // 9. Advanced Paradigms
    "semi-supervised": {
      title: "Semi-Supervised Learning | Leveraging Unlabeled Data",
      description: "Discover Semi-Supervised Learning. Learn how algorithms use a small amount of labeled data paired with vast unlabeled data."
    },
    "online-learning": {
      title: "Online Machine Learning | Streaming Data & Incremental Training",
      description: "Learn how Online Machine Learning continuously updates models in real-time as new data streams arrive without retraining from scratch."
    },
    "reinforcement-learning-adv": {
      title: "Advanced Reinforcement Learning | Deep Q-Networks (DQN)",
      description: "Dive into advanced RL. Understand Markov Decision Processes, Q-Learning, and Deep Reinforcement Learning architectures."
    },
    "multi-armed-bandits": {
      title: "Multi-Armed Bandits | Exploration vs Exploitation in RL",
      description: "Understand the Multi-Armed Bandit problem, Epsilon-Greedy, UCB, Thompson Sampling, and A/B Testing applications."
    },

    // 10. Deep Learning & Interviews
    "neural-networks": {
      title: "Neural Networks Explained Simply | Deep Learning Basics",
      description: "What is a Neural Network? Learn the biology-inspired basics of deep learning, activation functions, and forward propagation."
    },
    "deep-learning-intro": {
      title: "Introduction to Deep Learning vs Machine Learning",
      description: "Discover the difference between Machine Learning and Deep Learning, understand CNNs/RNNs, and start building with PyTorch and TensorFlow."
    },
    "ml-interview-questions": {
      title: "Top 50 Machine Learning Interview Questions & Answers",
      description: "Prepare for your FAANG ML interview. Algorithm questions, coding challenges, and statistics theory regarding Machine Learning."
    }
  };

  return seoData[topicId] || {
    title: `${defaultTitle} Tutorial | ML Academy`,
    description: `Complete guide to ${defaultTitle} in Machine Learning. Learn with intuitive explanations, math breakdowns, and Python code examples.`
  };
};


const BASE_URL = 'https://www.learnmlacademy.com';

export const getCanonicalUrl = (topicId?: string): string => {
  if (topicId) return `${BASE_URL}/learn/${topicId}`;
  return BASE_URL;
};

export const getLearningResourceSchema = (
  topicId: string,
  title: string,
  description: string
): string => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": title,
    "description": description,
    "url": `${BASE_URL}/learn/${topicId}`,
    "educationalLevel": "Beginner to Advanced",
    "learningResourceType": "Tutorial",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "provider": {
      "@type": "Organization",
      "name": "ML Academy",
      "url": BASE_URL
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Learn", "item": `${BASE_URL}/learn` },
        { "@type": "ListItem", "position": 3, "name": title, "item": `${BASE_URL}/learn/${topicId}` }
      ]
    }
  });
};
