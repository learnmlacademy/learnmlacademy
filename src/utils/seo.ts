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
      title: "Unsupervised Learning Explained | Clustering & Dimensionality Reduction",
      description: "Understand Unsupervised Learning with Python. Learn how K-Means, DBSCAN, and PCA find hidden patterns in unlabelled data — no labels required."
    },
    "reinforcement-learning-intro": {
      title: "Reinforcement Learning Basics | Agents, Environments & Rewards",
      description: "A beginner's guide to Reinforcement Learning. Discover how AI agents learn through trial and error using rewards and penalties."
    },
    "batch-vs-online": {
      title: "Batch Learning vs Online Learning | Machine Learning Paradigms",
      description: "Compare Batch and Online Learning in Machine Learning. Understand when to retrain from scratch vs update incrementally with streaming data in Python."
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
      title: "NumPy Tutorial for Machine Learning | Arrays, Math & Linear Algebra",
      description: "Master NumPy for Machine Learning with Python. Learn vectorisation, broadcasting, matrix operations and linear algebra with real code examples and output."
    },
    "pandas-essentials": {
      title: "Pandas Essentials for Machine Learning | ML Academy",
      description: "Learn the most important Pandas DataFrame operations, cleaning techniques, and feature engineering for Machine Learning data prep."
    },
    "scikit-learn-essentials": {
      title: "Scikit-Learn Tutorial for Beginners | Complete ML Workflow in Python",
      description: "Learn Scikit-Learn from scratch. Split data, scale features, train and evaluate models with cross-validation, and tune hyperparameters in Python with real output."
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
      title: "Bias-Variance Tradeoff Explained with Python Examples | ML Academy",
      description: "Deep dive into the Bias-Variance Tradeoff in Machine Learning. Understand underfitting, overfitting, and how to diagnose each with learning curves in Python."
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
      title: "Regression in Machine Learning | Predicting Continuous Values with Python",
      description: "Introduction to regression in Machine Learning. Learn how regression algorithms predict continuous values and when to use each type, with Python code examples."
    },
    "linear-regression": {
      title: "Linear Regression in Machine Learning (with Python code)",
      description: "Understand Linear Regression, how it minimizes error using Ordinary Least Squares, and build your own model in Python and Scikit-learn."
    },
    "gradient-descent": {
      title: "Gradient Descent Explained | Batch, SGD & Mini-Batch with Python Code",
      description: "Learn how Gradient Descent minimises loss in Machine Learning. Covers Batch, Stochastic, and Mini-Batch variants with Python implementations and visual diagrams."
    },
    "polynomial-regression": {
      title: "Polynomial Regression in Python | Capturing Non-Linear Relationships",
      description: "Learn when and how to use Polynomial Regression to model non-linear data. Covers degree selection, overfitting risks, and Python code with scikit-learn examples."
    },
    "ridge-regression": {
      title: "Ridge Regression (L2 Regularisation) Explained with Python Examples",
      description: "Understand Ridge Regression and L2 Regularisation in Python. Shrinks weights to prevent overfitting in high-dimensional models with multicollinearity."
    },
    "lasso-regression": {
      title: "Lasso Regression (L1 Regularisation) & Feature Selection in Python",
      description: "Learn how Lasso Regression uses L1 Regularisation to prevent overfitting and perform feature selection. Full Python scikit-learn examples with output included."
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
      title: "K-Nearest Neighbors (KNN) Algorithm Explained with Python Code",
      description: "Learn how the KNN algorithm classifies data based on distance metrics. Covers choosing K, Euclidean vs Manhattan distance, and Python implementation with visuals."
    },
    "svm": {
      title: "Support Vector Machines (SVM) & The Kernel Trick",
      description: "Master Support Vector Machines. Understand margins, hyperplanes, and how the Kernel trick solves non-linear classification problems."
    },

    // 5. Ensemble Learning
    "random-forest": {
      title: "Random Forest Algorithm Explained | Bagging & Ensemble Learning in Python",
      description: "Learn how Random Forests combine decision trees to cut variance and overfitting. Covers feature importance, hyperparameter tuning, and Python scikit-learn code."
    },
    "bagging": {
      title: "Bagging (Bootstrap Aggregating) in Machine Learning | Python Tutorial",
      description: "Understand Bagging in ensemble learning. Bootstrap sampling reduces model variance, with a Python implementation and comparison to single decision trees."
    },
    "boosting": {
      title: "Boosting Algorithms in Machine Learning | AdaBoost, GBM & XGBoost",
      description: "Introduction to Boosting in Machine Learning. Learn how sequential weak learners form a strong model, with Python code covering AdaBoost and Gradient Boosting."
    },
    "adaboost": {
      title: "AdaBoost Algorithm Explained | Adaptive Boosting with Python Examples",
      description: "Learn how AdaBoost corrects errors by adjusting sample weights each round. Covers the maths and Python scikit-learn implementation with code examples."
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
      title: "Hierarchical Clustering & Dendrograms Explained with Python Code",
      description: "Understand Hierarchical Clustering in Python. Learn linkage methods (Ward, Complete, Average), reading dendrograms, and when to choose it over K-Means."
    },
    "dbscan": {
      title: "DBSCAN Clustering Algorithm | Density-Based ML with Python Tutorial",
      description: "Learn how DBSCAN finds arbitrary-shaped clusters and isolates noise using density. Covers epsilon and min_samples tuning with a full Python implementation."
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
      title: "Association Rule Mining | Market Basket Analysis with Python",
      description: "Discover Association Rule Learning for market basket analysis in Python. Understand Support, Confidence, and Lift, and implement Apriori with mlxtend."
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
      title: "Cost Functions & Loss Functions in Machine Learning | MSE, MAE & Cross-Entropy",
      description: "Understand MSE, MAE, Log Loss, and Cross-Entropy cost functions in Machine Learning. Learn which loss function to use for regression vs classification in Python."
    },
    "hyperparameter-tuning": {
      title: "Hyperparameter Tuning in Machine Learning | Grid Search & Optuna Python Guide",
      description: "Learn to tune ML hyperparameters with Grid Search, Random Search, and Bayesian Optimisation. Python scikit-learn and Optuna examples with real output."
    },
    "grid-random-search": {
      title: "Grid Search vs Random Search in Python | Hyperparameter Optimisation",
      description: "Compare Grid Search and Random Search for hyperparameter optimisation. Learn when to use each and how to implement GridSearchCV and RandomizedSearchCV in Python."
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
      title: "ARIMA Model for Time Series Forecasting | Python statsmodels Tutorial",
      description: "Learn the ARIMA model for time series forecasting in Python. Covers stationarity, ACF/PACF plots, parameter selection (p,d,q), and forecasting with statsmodels."
    },
    "moving-average": {
      title: "Moving Average Models for Time Series | SMA & EMA in Python",
      description: "Understand Simple Moving Average (SMA) and Exponential Moving Average (EMA) for smoothing time series. Includes Python pandas implementation with visualisations."
    },
    "exponential-smoothing": {
      title: "Exponential Smoothing & Holt-Winters Forecasting in Python",
      description: "Learn Exponential Smoothing and Holt-Winters in Python. Model time series with trend and seasonality using statsmodels, with examples and forecast plots."
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
      title: "Advanced Reinforcement Learning | Q-Learning & Deep Q-Networks (DQN) in Python",
      description: "Advanced RL: Markov Decision Processes, Q-Learning, and Deep Q-Networks (DQN) explained with Python and OpenAI Gym implementation examples."
    },
    "multi-armed-bandits": {
      title: "Multi-Armed Bandits | Epsilon-Greedy & UCB Algorithms in Python",
      description: "Understand the Multi-Armed Bandit problem and Exploration vs Exploitation. Learn Epsilon-Greedy, UCB, and Thompson Sampling with Python code and results."
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
