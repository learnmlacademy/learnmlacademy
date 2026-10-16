import { getQuizzesForTopicId, type QuizQuestion } from '../data/quizzes';

const META_DESCRIPTION_MAX_LENGTH = 160;

export const fitMetaDescription = (description: string): string => {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= META_DESCRIPTION_MAX_LENGTH && normalized.length >= 140) {
    return normalized;
  }
  if (normalized.length <= META_DESCRIPTION_MAX_LENGTH) {
    return normalized;
  }

  const candidate = normalized.slice(0, META_DESCRIPTION_MAX_LENGTH - 1);
  const sentenceEnd = Math.max(
    candidate.lastIndexOf("."),
    candidate.lastIndexOf("!"),
    candidate.lastIndexOf("?")
  );

  if (sentenceEnd >= 135) {
    return candidate.slice(0, sentenceEnd + 1);
  }

  const phraseEnd = Math.max(
    candidate.lastIndexOf(","),
    candidate.lastIndexOf(";"),
    candidate.lastIndexOf(":"),
    candidate.lastIndexOf("—"),
    candidate.lastIndexOf("–")
  );

  if (phraseEnd >= 135) {
    return `${candidate
      .slice(0, phraseEnd)
      .replace(/[,:;\-–—]+$/, "")
      .trim()}.`;
  }

  const lastSpace = candidate.lastIndexOf(" ");
  let wordSafe = (lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate)
    .replace(/[,:;\-–—]+$/, "")
    .trim();

  const danglingWord = /\b(and|or|with|using|including|from|to|for|by|while|through|into|in|on|of|a|an|the)$/i;
  while (danglingWord.test(wordSafe)) {
    wordSafe = wordSafe.replace(/\s+\S+$/, "").trim();
  }

  return `${wordSafe}.`;
};

export const seoData: Record<string, { title: string; description: string }> = {
  "what-is-ml": {
    "title": "What is Machine Learning? Algorithms, Types & Python 2026 Guide | LearnMLAcademy",
    "description": "Understand machine learning definitions, core workflow, and paradigms, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "types-of-ml": {
    "title": "Types of Machine Learning: Supervised, Unsupervised & RL 2026 Guide | LearnMLAcademy",
    "description": "Master the four main types of machine learning and real applications, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "supervised-learning-intro": {
    "title": "Supervised Learning in Python: Algorithms, Math & 2026 Guide | LearnMLAcademy",
    "description": "Learn supervised learning algorithms, labelled datasets, and metrics, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "unsupervised-learning-intro": {
    "title": "Unsupervised Learning in Python: Clustering & PCA 2026 Guide | LearnMLAcademy",
    "description": "Explore unsupervised learning techniques, clustering, and latent patterns, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "reinforcement-learning-intro": {
    "title": "Reinforcement Learning Tutorial: MDP, Policy & Python 2026 Guide | LearnMLAcademy",
    "description": "Understand reinforcement learning agents, reward signals, and Q-learning, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "batch-vs-online": {
    "title": "Batch vs Online Learning in Production: Architecture & 2026 Guide | LearnMLAcademy",
    "description": "Compare batch training versus streaming online incremental ML updates, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-lifecycle": {
    "title": "End-to-End Machine Learning Lifecycle: Data to Deployment 2026 Guide | LearnMLAcademy",
    "description": "Follow the complete machine learning lifecycle from data to deployment, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "python-for-ml": {
    "title": "Python for Machine Learning: NumPy, Pandas & Scikit-Learn 2026 Guide | LearnMLAcademy",
    "description": "Master essential Python programming for machine learning and data science, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "numpy-essentials": {
    "title": "NumPy Essentials for Machine Learning: Vectorized Arrays & Code | LearnMLAcademy",
    "description": "Master NumPy array indexing, broadcasting, matrix math, and operations, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "pandas-essentials": {
    "title": "Pandas Essentials for Machine Learning: DataFrames, Cleaning & Code | LearnMLAcademy",
    "description": "Manipulate DataFrames, clean tabular data, and compute aggregations, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "scikit-learn-essentials": {
    "title": "Scikit-Learn Essentials in Python: Estimators, Pipelines & Code | LearnMLAcademy",
    "description": "Build scikit-learn preprocessing pipelines, models, and transformers, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "eda": {
    "title": "Exploratory Data Analysis (EDA) in Python: Visualizations & Guide | LearnMLAcademy",
    "description": "Perform exploratory data analysis with statistical summaries and plots, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "handling-missing-data": {
    "title": "Handling Missing Data in Python: Imputation, KNN & 2026 Guide | LearnMLAcademy",
    "description": "Handle missing data using mean, median, KNN, and iterative imputation, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "encoding-categorical": {
    "title": "Encoding Categorical Data in Python: One-Hot, Target & Ordinal Guide | LearnMLAcademy",
    "description": "Encode categorical features with one-hot, target, and ordinal methods, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "bias-variance": {
    "title": "Bias-Variance Tradeoff in Machine Learning: Math & Python Guide | LearnMLAcademy",
    "description": "Diagnose bias-variance tradeoff, generalization error, and tradeoffs, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "feature-scaling": {
    "title": "Feature Scaling in Python: StandardScaler vs MinMaxScaler Guide | LearnMLAcademy",
    "description": "Apply feature scaling with StandardScaler, MinMaxScaler, and RobustScaler, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "feature-engineering": {
    "title": "Feature Engineering Techniques in Python: Domain Features & Code | LearnMLAcademy",
    "description": "Engineer predictive features, interaction terms, and temporal signals, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "feature-selection": {
    "title": "Feature Selection Techniques in Python: Filter, Wrapper & Embedded | LearnMLAcademy",
    "description": "Select optimal feature subsets using variance thresholds and elimination, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "data-visualization": {
    "title": "Data Visualization for Machine Learning: Matplotlib & Seaborn in Python | LearnMLAcademy",
    "description": "Create informative data visualizations with Matplotlib, Seaborn, and plots, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "regression-intro": {
    "title": "Introduction to Regression in Python: Linear, Polynomial & Metrics | LearnMLAcademy",
    "description": "Understand continuous target estimation, baseline models, and metrics, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "linear-regression": {
    "title": "Linear Regression in Python: Math, OLS, Scikit-Learn & 2026 Guide | LearnMLAcademy",
    "description": "Derive linear regression with Ordinary Least Squares and gradient descent, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "gradient-descent": {
    "title": "Gradient Descent from Scratch in Python: Batch, Mini-Batch & SGD | LearnMLAcademy",
    "description": "Implement gradient descent optimization, learning rates, and updates, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "polynomial-regression": {
    "title": "Polynomial Regression in Python: Degree Selection & Overfitting | LearnMLAcademy",
    "description": "Fit polynomial regression curves while preventing high-variance overfitting, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ridge-regression": {
    "title": "Ridge Regression (L2 Regularization) in Python: Math, Penalty & Code | LearnMLAcademy",
    "description": "Constrain regression coefficients using Ridge L2 regularization penalties, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "lasso-regression": {
    "title": "Lasso Regression (L1 Regularization) in Python: Sparsity & Selection | LearnMLAcademy",
    "description": "Perform automated feature selection using Lasso L1 regularization sparsity, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "classification-intro": {
    "title": "Introduction to Classification in Python: Decision Boundaries & Code | LearnMLAcademy",
    "description": "Categorize discrete target classes with decision boundaries and probabilities, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "logistic-regression": {
    "title": "Logistic Regression in Python: Sigmoid Math, Odds Ratios & Code | LearnMLAcademy",
    "description": "Master logistic regression, sigmoid activation, and decision boundaries, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "decision-trees": {
    "title": "Decision Trees in Python: Gini Impurity, Entropy, Pruning & Code | LearnMLAcademy",
    "description": "Construct decision tree classifiers with Gini impurity and cost pruning, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "naive-bayes": {
    "title": "Naive Bayes Classifier in Python: Bayes Theorem & Probabilities Guide | LearnMLAcademy",
    "description": "Apply Bayes theorem with conditional independence assumptions for text, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "knn": {
    "title": "K-Nearest Neighbors (KNN) in Python: Distance Metrics & Tuning | LearnMLAcademy",
    "description": "Implement K-Nearest Neighbors classification and Euclidean distance, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "svm": {
    "title": "Support Vector Machines (SVM) in Python: Kernel Trick & Math Guide | LearnMLAcademy",
    "description": "Maximize classification margins with Support Vector Machines and kernels, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "random-forest": {
    "title": "Random Forest Classifier in Python: Out-of-Bag & Feature Importance | LearnMLAcademy",
    "description": "Train Random Forest ensembles with bootstrap aggregation and tree bagging, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "bagging": {
    "title": "Bootstrap Aggregating (Bagging) in Python: Variance Reduction & Code | LearnMLAcademy",
    "description": "Reduce model variance using bootstrap sampling and parallel bagging estimators, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "boosting": {
    "title": "Boosting Algorithms in Python: Sequential Residual Learning & Code | LearnMLAcademy",
    "description": "Train sequential boosting ensembles that correct earlier errors iteratively, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "adaboost": {
    "title": "AdaBoost Classifier in Python: Adaptive Sample Weights & Math Guide | LearnMLAcademy",
    "description": "Understand AdaBoost iterative sample weighting and sequential corrections, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "gradient-boosting": {
    "title": "Gradient Boosting Machines in Python: Residual Learning & Code | LearnMLAcademy",
    "description": "Build Gradient Boosting models that fit successive pseudo-residuals, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "xgboost": {
    "title": "XGBoost in Python: Regularized Trees, Histograms & Fast Code Guide | LearnMLAcademy",
    "description": "Optimize XGBoost hyperparameters with second-order Taylor expansions, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "kmeans": {
    "title": "K-Means Clustering in Python: Elbow Method, Silhouette & Code Guide | LearnMLAcademy",
    "description": "Cluster unlabelled data with K-Means, inertia curves, and centroid updates, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "hierarchical": {
    "title": "Hierarchical Clustering in Python: Dendrograms, Agglomerative & Code | LearnMLAcademy",
    "description": "Build agglomerative hierarchical tree dendrograms and compute linkages, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "dbscan": {
    "title": "DBSCAN Clustering in Python: Density, Epsilon, MinPts & Noise Guide | LearnMLAcademy",
    "description": "Discover arbitrary-shaped density clusters and isolate outliers with DBSCAN, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "pca": {
    "title": "PCA Dimensionality Reduction in Python: Eigenvalues, Variance & Code | LearnMLAcademy",
    "description": "Reduce high-dimensional feature spaces using Principal Component Analysis, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "tsne": {
    "title": "t-SNE Dimensionality Reduction in Python: Non-Linear Manifold Guide | LearnMLAcademy",
    "description": "Visualize high-dimensional data clusters with non-linear t-SNE probability maps, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "association-rules": {
    "title": "Association Rule Mining in Python: Support, Confidence & Lift Guide | LearnMLAcademy",
    "description": "Mine associative purchase rules using support, confidence, and lift metrics, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "apriori": {
    "title": "Apriori Algorithm in Python: Frequent Itemsets & Market Basket Code | LearnMLAcademy",
    "description": "Extract frequent itemsets and association rules with the Apriori algorithm, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "train-test-split": {
    "title": "Train-Test Split & Stratification in Python: Clean Validation Guide | LearnMLAcademy",
    "description": "Partition datasets with stratified sampling to preserve label balances, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "cross-validation": {
    "title": "K-Fold Cross-Validation in Python: Stratified & TimeSeriesSplit Guide | LearnMLAcademy",
    "description": "Evaluate generalization performance using K-Fold and stratified validation, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "overfitting-underfitting": {
    "title": "Overfitting vs Underfitting in Machine Learning: Diagnosis & Fixes | LearnMLAcademy",
    "description": "Diagnose model variance and bias issues using empirical learning curves, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "cost-functions": {
    "title": "Machine Learning Cost Functions: Convexity, Optimization & Math Guide | LearnMLAcademy",
    "description": "Compare convex optimization landscapes and loss functions in machine learning, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "hyperparameter-tuning": {
    "title": "Hyperparameter Tuning in Python: Bayesian, Optuna & Search Strategies | LearnMLAcademy",
    "description": "Optimize machine learning hyperparameters using systematic tuning methods, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "grid-random-search": {
    "title": "Grid Search vs Random Search in Python: Scikit-Learn Tuning Guide | LearnMLAcademy",
    "description": "Compare Grid Search exhaustive exploration against fast Random Search sweeps, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "confusion-matrix": {
    "title": "Confusion Matrix & Classification Metrics in Python: Precision, Recall | LearnMLAcademy",
    "description": "Interpret confusion matrices, precision, recall, and harmonic F1-scores, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "roc-auc": {
    "title": "ROC-AUC Curve Explained in Python: TPR, FPR & Decision Thresholds | LearnMLAcademy",
    "description": "Evaluate binary classifiers across all decision thresholds with ROC curves, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "arima": {
    "title": "ARIMA & SARIMA in Python: Autoregressive & Moving Average Time Series | LearnMLAcademy",
    "description": "Model non-stationary time series using ARIMA differencing and lag parameters, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "moving-average": {
    "title": "Moving Averages in Python: SMA, EMA & Trend Smoothing Time Series | LearnMLAcademy",
    "description": "Smooth noisy temporal signals using Simple and Exponential Moving Averages, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "exponential-smoothing": {
    "title": "Exponential Smoothing in Python: Holt-Winters Forecasting Guide | LearnMLAcademy",
    "description": "Forecast trends and seasonal cycles using Holt-Winters exponential smoothing, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "forecasting-basics": {
    "title": "Time Series Forecasting Basics in Python: Stationarity & Lags Guide | LearnMLAcademy",
    "description": "Understand time-series stationarity, autocorrelation, and lag features, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "semi-supervised": {
    "title": "Semi-Supervised Learning in Python: Pseudo-Labelling & Label Spread | LearnMLAcademy",
    "description": "Leverage large unlabelled datasets with pseudo-labelling and label spreading, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "online-learning": {
    "title": "Online Incremental Learning in Python: River, SGD & Streaming Data | LearnMLAcademy",
    "description": "Stream machine learning updates continuously using incremental SGD algorithms, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "reinforcement-learning-adv": {
    "title": "Deep Reinforcement Learning in Python: DQN, Policy Gradients & PPO | LearnMLAcademy",
    "description": "Implement Deep Q-Networks and policy gradient algorithms for game agents, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "multi-armed-bandits": {
    "title": "Multi-Armed Bandits in Python: Epsilon-Greedy, UCB & Thompson Sampling | LearnMLAcademy",
    "description": "Solve exploration-exploitation trade-offs with UCB algorithms, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "deep-learning-intro": {
    "title": "Deep Learning Basics in Python: Neural Network Architectures Guide | LearnMLAcademy",
    "description": "Understand deep neural network fundamentals, layers, and representations, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "neural-networks": {
    "title": "How Neural Networks Learn: Forward Pass, Loss & Weights in Python | LearnMLAcademy",
    "description": "Follow how artificial neurons compute activations and update synaptic weights, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "math-foundations-deep-learning": {
    "title": "Math Foundations for Deep Learning: Linear Algebra, Calculus & Code | LearnMLAcademy",
    "description": "Master the linear algebra and multivariate calculus powering neural networks, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "activation-functions": {
    "title": "Activation Functions in Neural Networks: ReLU, Sigmoid, GeLU in Python | LearnMLAcademy",
    "description": "Compare non-linear activation functions including ReLU, LeakyReLU, and GeLU, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "tensors-frameworks-gpus": {
    "title": "PyTorch Tensors, CUDA & GPU Acceleration Tutorial: Python Guide | LearnMLAcademy",
    "description": "Manage multidimensional tensors and accelerate training on CUDA GPU hardware, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "loss-functions-deep-learning": {
    "title": "Deep Learning Loss Functions: Cross-Entropy, MSE & Focal Loss Guide | LearnMLAcademy",
    "description": "Select optimal loss functions for deep regression, classification, and ranking, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "backpropagation": {
    "title": "Backpropagation from Scratch in Python: Chain Rule Math & Autograd | LearnMLAcademy",
    "description": "Derive backpropagation step by step using the calculus chain rule in Python, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "neural-network-training-loop": {
    "title": "PyTorch Neural Network Training Loop: Epochs, Batches & Debugging | LearnMLAcademy",
    "description": "Construct robust PyTorch training loops with validation and gradient tracking, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "deep-learning-optimizers": {
    "title": "Deep Learning Optimizers: Adam, AdamW, RMSprop & Schedulers in Python | LearnMLAcademy",
    "description": "Compare adaptive optimizers including AdamW, momentum, and cosine schedulers, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "weight-initialization": {
    "title": "Weight Initialization & Batch Normalization: Xavier, He & PyTorch | LearnMLAcademy",
    "description": "Prevent vanishing gradients with He initialization and Layer Normalization, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "deep-learning-regularization": {
    "title": "Deep Learning Regularization: Dropout, Weight Decay & Early Stopping | LearnMLAcademy",
    "description": "Prevent deep neural network overfitting with dropout and weight decay penalties, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "data-augmentation-deep-learning": {
    "title": "Data Augmentation in PyTorch: Torchvision Image Transforms & Code | LearnMLAcademy",
    "description": "Expand computer vision training datasets with affine transforms, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "cnn": {
    "title": "Convolutional Neural Networks (CNNs) in PyTorch: Kernels, Pooling & Code | LearnMLAcademy",
    "description": "Master convolutional kernels, feature maps, and pooling layers for vision, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "cnn-architectures-resnet": {
    "title": "Modern CNN Architectures: AlexNet, VGG & ResNet Residuals in PyTorch | LearnMLAcademy",
    "description": "Understand deep residual connections and skip connections in ResNet networks, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "object-detection": {
    "title": "Object Detection & Segmentation: YOLO, Mask R-CNN & Grad-CAM in Python | LearnMLAcademy",
    "description": "Detect bounding boxes and explain convolutional feature maps with Grad-CAM, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "vision-transformers": {
    "title": "Vision Transformers (ViT) in PyTorch: Patch Embeddings & Self-Attention | LearnMLAcademy",
    "description": "Process image patches with Transformer self-attention using Vision Transformers, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "rnn-lstm": {
    "title": "RNNs, LSTMs and GRUs in PyTorch: Sequential Hidden States & Gates | LearnMLAcademy",
    "description": "Capture long-term temporal dependencies with LSTM and GRU gating mechanisms, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "attention-transformers-deep-learning": {
    "title": "Seq2Seq Models & Attention Mechanisms in PyTorch: Deep Learning Guide | LearnMLAcademy",
    "description": "Understand encoder-decoder sequence modeling and Bahdanau attention alignments, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "transformers-deep-learning": {
    "title": "Transformers for Deep Learning: Positional Encodings & Attention Math | LearnMLAcademy",
    "description": "Construct Transformer encoder and decoder stacks with positional encodings, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "autoencoders": {
    "title": "Autoencoders in PyTorch: Latent Bottlenecks, Reconstruction & Code | LearnMLAcademy",
    "description": "Compress high-dimensional data into bottleneck latent spaces with autoencoders, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "transfer-learning": {
    "title": "Transfer Learning & Model Fine-Tuning in PyTorch: Pretrained Weights | LearnMLAcademy",
    "description": "Adapt pretrained deep vision and language models to downstream tasks with LoRA, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "self-supervised-few-shot-learning": {
    "title": "Self-Supervised & Few-Shot Learning in Python: Contrastive SimCLR Guide | LearnMLAcademy",
    "description": "Train representations without labels using contrastive learning and few shots, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "graph-neural-networks": {
    "title": "Graph Neural Networks (GNNs) in Python: Message Passing & PyTorch Geometric | LearnMLAcademy",
    "description": "Process relational graph structures with message passing and node embeddings, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "saving-deploying-deep-models": {
    "title": "Saving & Deploying Deep Learning Models: ONNX, TorchScript & FastAPI | LearnMLAcademy",
    "description": "Export PyTorch weights to ONNX runtimes and serve low-latency microservices, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "state-space-models": {
    "title": "State-Space Models (SSMs) & Mamba Architecture in Python: 2026 Guide | LearnMLAcademy",
    "description": "Understand linear State-Space Models (SSMs) and selective Mamba scan layers, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "deep-learning-nlp": {
    "title": "Deep Learning for NLP: Word2Vec, GloVe, FastText & Tokenizers in Python | LearnMLAcademy",
    "description": "Process natural language text using Word2Vec embeddings and subword tokenizers, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "pinn-kan-topological-networks": {
    "title": "Physics-Informed Neural Networks (PINNs) & KANs in Python: 2026 Guide | LearnMLAcademy",
    "description": "Solve differential equations with PINNs and learnable spline nets, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "generative-ai-intro": {
    "title": "What is Generative AI? Architecture, Models & Python 2026 Guide | LearnMLAcademy",
    "description": "Discover how Generative AI models synthesize novel text, images, and audio, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "generative-vs-discriminative": {
    "title": "Generative vs Discriminative Models in Python: Math, Examples & Guide | LearnMLAcademy",
    "description": "Compare generative versus discriminative models with joint and conditional math, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "how-generative-models-learn": {
    "title": "How Generative Models Learn Data Distributions: 2026 Guide | LearnMLAcademy",
    "description": "Understand how generative models estimate and sample distributions, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "vae": {
    "title": "Variational Autoencoders (VAEs) in Python: Math, Architecture & Code | LearnMLAcademy",
    "description": "Implement Variational Autoencoders (VAEs) using the reparameterization trick, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "gans": {
    "title": "Generative Adversarial Networks (GANs) in Python: Architecture & Code | LearnMLAcademy",
    "description": "Train Generative Adversarial Networks (GANs) using minimax loss and DCGAN code, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "diffusion-models": {
    "title": "Diffusion Models from Scratch in Python: Math, Noise Schedules & Code | LearnMLAcademy",
    "description": "Derive diffusion models from scratch using forward noise and reverse denoising, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "stable-latent-diffusion": {
    "title": "Stable Diffusion & Latent Architecture in Python: UNet & VAE Guide | LearnMLAcademy",
    "description": "Explore Latent Stable Diffusion architectures with UNet denoisers, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "controlling-diffusion-models": {
    "title": "ControlNet & Guided Diffusion in Python: Architecture & 2026 Guide | LearnMLAcademy",
    "description": "Control image generation with ControlNet and edge conditioning, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "finetuning-image-models": {
    "title": "Fine-Tuning Diffusion Models: LoRA & DreamBooth in Python Guide | LearnMLAcademy",
    "description": "Fine-tune image diffusion models using LoRA weights and DreamBooth, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "multimodal-ai": {
    "title": "Multimodal Generative AI in Python: CLIP, Vision-Language & Code | LearnMLAcademy",
    "description": "Connect text and visual modalities using CLIP contrastive encoders, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "audio-music-video-generation": {
    "title": "AI Audio, Speech & Video Generation: Architecture & Python Guide | LearnMLAcademy",
    "description": "Synthesize realistic audio, speech, music, and video using modern diffusion, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "synthetic-data": {
    "title": "Synthetic Data Generation in Python: CTGAN, Privacy & 2026 Guide | LearnMLAcademy",
    "description": "Generate privacy-preserving synthetic tabular and text datasets using CTGAN, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "evaluating-generative-models": {
    "title": "Evaluating Generative AI: FID, IS, BLEU, ROUGE & Perplexity Guide | LearnMLAcademy",
    "description": "Evaluate generative image and text models using FID scores and perplexity, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "responsible-generative-ai": {
    "title": "Responsible Generative AI: Safety, Bias & Watermarking 2026 Guide | LearnMLAcademy",
    "description": "Implement responsible AI governance, synthetic watermarking, and bias detection, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "choosing-generative-model": {
    "title": "Choosing Generative Models: VAEs vs GANs vs Diffusion 2026 Guide | LearnMLAcademy",
    "description": "Select the optimal generative model architecture based on latency and fidelity, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "building-genai-apps": {
    "title": "Building GenAI Applications in Python: Architecture, APIs & Code | LearnMLAcademy",
    "description": "Build production Generative AI applications with streaming APIs and caching, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "genai-deployment": {
    "title": "Deploying Generative AI Applications: vLLM, Streaming & 2026 Guide | LearnMLAcademy",
    "description": "Deploy generative AI models to production with auto-scaling systems, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "llm-intro": {
    "title": "What Are Large Language Models? Architecture, Scaling & 2026 Guide | LearnMLAcademy",
    "description": "Understand modern Large Language Model architectures and pretraining, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "tokenization-embeddings": {
    "title": "LLM Tokenization & Embeddings in Python: BPE, RoPE & Context Guide | LearnMLAcademy",
    "description": "Master Byte-Pair Encoding (BPE) tokenization, rotary embeddings, and context, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "transformers-attention": {
    "title": "Transformer Architecture & Self-Attention in Python: Math & Code | LearnMLAcademy",
    "description": "Understand Transformer multi-head self-attention mechanics and QKV math, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "text-generation-decoding": {
    "title": "LLM Text Generation & Decoding in Python: Beam Search & Top-P Guide | LearnMLAcademy",
    "description": "Control LLM text generation using temperature, top-k, top-p, and beam search, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "prompt-engineering": {
    "title": "Prompt Engineering & Structured Outputs in Python: 2026 Guide | LearnMLAcademy",
    "description": "Design production prompts with few-shot examples and output schemas, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "pretraining-finetuning": {
    "title": "How LLMs Are Trained: Pretraining, Compute Scaling & 2026 Guide | LearnMLAcademy",
    "description": "Explore how modern foundation LLMs are pretrained at scale on massive compute, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "instruction-tuning-rlhf": {
    "title": "Fine-Tuning LLMs with LoRA, SFT & RLHF in Python: 2026 Guide | LearnMLAcademy",
    "description": "Fine-tune LLMs efficiently using Supervised Fine-Tuning (SFT) and LoRA adapters, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "rag": {
    "title": "Retrieval-Augmented Generation (RAG) in Python: Architecture, Embeddings & Code | LearnMLAcademy",
    "description": "Build Retrieval-Augmented Generation (RAG) systems with vector search, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "semantic-search-embeddings": {
    "title": "Semantic Search with Neural Embeddings in Python: 2026 Guide | LearnMLAcademy",
    "description": "Build semantic search engines using dense neural embeddings and cosine, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "vector-databases": {
    "title": "Vector Databases for LLMs: Pinecone, Qdrant & Milvus 2026 Guide | LearnMLAcademy",
    "description": "Select and query vector databases using HNSW indexing and metadata filtering, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "advanced-rag": {
    "title": "Advanced RAG in Python: Chunking, Reranking & Hybrid Search Guide | LearnMLAcademy",
    "description": "Optimize RAG pipelines with chunking, rerankers, and hybrid search, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "llm-evaluation": {
    "title": "Evaluating LLMs: Benchmarks, MMLU & RAG Triad in Python Guide | LearnMLAcademy",
    "description": "Evaluate LLM accuracy using MMLU benchmarks and automated judges, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "llm-hallucinations-safety": {
    "title": "LLM Hallucinations & Guardrails: NeMo, Llama-Guard & 2026 Guide | LearnMLAcademy",
    "description": "Detect and eliminate LLM hallucinations using guardrails and filters, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "reasoning-models": {
    "title": "Reasoning Models & Test-Time Compute: Chain-of-Thought 2026 Guide | LearnMLAcademy",
    "description": "Understand reasoning models, chain-of-thought prompting, and test-time compute, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "efficient-llm-serving": {
    "title": "Efficient LLM Serving: vLLM, PagedAttention & Quantization Guide | LearnMLAcademy",
    "description": "Serve LLMs at scale with vLLM PagedAttention, KV cache reuse, and quantization, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "llmops": {
    "title": "LLMOps in Production: Evaluation, Tracing, Cost & 2026 Guide | LearnMLAcademy",
    "description": "Deploy and monitor enterprise LLM applications with tracing and latency budgets, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agentic-ai-intro": {
    "title": "What Is Agentic AI? Autonomous Agents vs Workflows: 2026 Guide | LearnMLAcademy",
    "description": "Learn autonomous AI agent architectures and deterministic workflows, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "tool-calling": {
    "title": "AI Agent Tool Calling in Python: Schema Validation, Idempotency & Retries | LearnMLAcademy",
    "description": "Master AI agent tool calling, schema validation, and safe error retries, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "building-ai-agent": {
    "title": "Build an Autonomous AI Agent from Scratch in Python: Step-by-Step | LearnMLAcademy",
    "description": "Build an autonomous AI agent from scratch with step-by-step reasoning, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "planning-reflection": {
    "title": "Agent Planning, ReAct & Reflection in Python: Architecture & Code | LearnMLAcademy",
    "description": "Implement AI agent planning loops, ReAct reasoning, and self-reflection, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-context-engineering": {
    "title": "Context Engineering for AI Agents: Budgets & Compaction 2026 Guide | LearnMLAcademy",
    "description": "Optimize AI agent context windows with token budgets and smart compaction, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-memory": {
    "title": "AI Agent Memory Systems: Short-Term, Long-Term & Vector Memory Guide | LearnMLAcademy",
    "description": "Design AI agent memory using short-term state and long-term vector storage, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-state-graphs": {
    "title": "Agent State Graphs & Workflows in Python: LangGraph 2026 Guide | LearnMLAcademy",
    "description": "Build reliable agent workflows, cyclical state graphs, and checkpoints, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "durable-long-running-agents": {
    "title": "Durable & Long-Running AI Agents: Human-in-the-Loop & 2026 Guide | LearnMLAcademy",
    "description": "Implement durable long-running AI agents with human-in-the-loop checkpoints, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agentic-rag": {
    "title": "Agentic RAG in Python: Router, Multi-Hop Search & Self-Correction | LearnMLAcademy",
    "description": "Build agentic RAG systems with intelligent routing and verification, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "multi-agent-systems": {
    "title": "Multi-Agent Systems in Python: Handoffs, Consensus & 2026 Guide | LearnMLAcademy",
    "description": "Architect multi-agent systems with role delegation, handoffs, and consensus, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "model-context-protocol": {
    "title": "Model Context Protocol (MCP) Tutorial: AI Agent Interoperability & Python Example | LearnMLAcademy",
    "description": "Implement Model Context Protocol (MCP) clients and servers for AI tools, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-frameworks": {
    "title": "AI Agent Frameworks Compared: LangGraph vs CrewAI vs AutoGen Guide | LearnMLAcademy",
    "description": "Compare top AI agent frameworks including LangGraph, CrewAI, and AutoGen, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "browser-computer-use-agents": {
    "title": "Browser & Computer-Use AI Agents in Python: Sandboxing 2026 Guide | LearnMLAcademy",
    "description": "Build browser automation and computer-use AI agents with safe sandboxing, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-security": {
    "title": "AI Agent Security: Prompt Injection, Guardrails & 2026 Guide | LearnMLAcademy",
    "description": "Secure AI agents against prompt injection, privilege escalation, and loops, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-evaluation-safety": {
    "title": "Evaluating AI Agents: Trajectory Benchmarks & Safety 2026 Guide | LearnMLAcademy",
    "description": "Evaluate AI agent performance with trajectory benchmarks and safety metrics, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agent-observability-deployment": {
    "title": "AI Agent Observability: Tracing, Latency, Cost & Deployment Guide | LearnMLAcademy",
    "description": "Monitor production AI agents with distributed tracing, latency, and cost alerts, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-customer-churn": {
    "title": "Customer Churn Prediction Project: Machine Learning Pipeline in Python | LearnMLAcademy",
    "description": "Build an end-to-end customer churn prediction pipeline with scikit-learn, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-credit-risk": {
    "title": "Credit Risk Prediction Project: Explainable Machine Learning & SHAP | LearnMLAcademy",
    "description": "Predict loan defaults with gradient boosted trees and explainable SHAP values, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-sales-forecasting": {
    "title": "Sales Forecasting Project in Python: Time-Series Regression & Streamlit | LearnMLAcademy",
    "description": "Forecast multi-store retail sales using lag features and chronological splits, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-image-classification": {
    "title": "Image Classification Project in PyTorch: ResNet Transfer Learning | LearnMLAcademy",
    "description": "Train an image classifier from scratch using transfer learning with ResNet, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-genai-app": {
    "title": "Build a Generative AI Application in Python: LLM APIs & Streamlit | LearnMLAcademy",
    "description": "Develop an interactive Generative AI application with streaming responses, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-rag-document-qa": {
    "title": "Build a Document Q&A System with RAG: Vector Search in Python Project | LearnMLAcademy",
    "description": "Construct an enterprise PDF question-answering system using RAG retrieval, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-ai-agent": {
    "title": "Build an AI Agent with Tools & Memory: End-to-End Python Project | LearnMLAcademy",
    "description": "Implement a fully autonomous AI agent with tool execution and memory state, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "project-multi-agent-research": {
    "title": "Build a Multi-Agent Research Assistant in Python: Full System Project | LearnMLAcademy",
    "description": "Coordinate multi-agent workflows for automated web research and fact synthesis, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ai-engineering-mlops": {
    "title": "AI Engineering & MLOps in Production: Notebook to FastAPI Guide | LearnMLAcademy",
    "description": "Transition machine learning models from prototype notebooks to production APIs, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-data-feature-pipelines": {
    "title": "Production ML Data & Feature Pipelines in Python: 2026 Guide | LearnMLAcademy",
    "description": "Build scalable ML data and feature pipelines with automated schema validation, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "experiment-tracking-model-registry": {
    "title": "MLflow Experiment Tracking & Model Registry in Python Guide | LearnMLAcademy",
    "description": "Track machine learning experiments and manage model versions using MLflow, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "batch-online-inference": {
    "title": "Batch vs Online vs Streaming ML Inference: Architecture & Code | LearnMLAcademy",
    "description": "Design batch, real-time online, and event streaming inference architectures, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-cicd-continuous-training": {
    "title": "CI/CD for Machine Learning & Continuous Training (CT) 2026 Guide | LearnMLAcademy",
    "description": "Implement automated CI/CD pipelines and continuous retraining, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-monitoring-drift": {
    "title": "ML Monitoring & Data Drift Detection in Python: Evidently Guide | LearnMLAcademy",
    "description": "Detect data drift, concept drift, and performance decay using Evidently metrics, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "production-ai-reliability": {
    "title": "Production AI Reliability, Cost Budgets & Security 2026 Guide | LearnMLAcademy",
    "description": "Ensure production AI system reliability, cost optimization, and API security, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-system-design": {
    "title": "End-to-End ML/AI System Design: Production Architecture Guide | LearnMLAcademy",
    "description": "Master end-to-end ML system design interviews with scalable architectures, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ai-data-career-paths": {
    "title": "AI & Data Career Paths: ML Engineer vs Data Scientist 2026 Guide | LearnMLAcademy",
    "description": "Navigate high-growth AI and data science career paths, salaries, and skills, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-engineer-roadmap": {
    "title": "Machine Learning Engineer Roadmap 2026: Skills, Math & Projects | LearnMLAcademy",
    "description": "Follow the comprehensive 2026 Machine Learning Engineer roadmap, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ai-engineer-roadmap": {
    "title": "AI Engineer Roadmap 2026: LLMs, RAG, Agents & Production Tools | LearnMLAcademy",
    "description": "Master the 2026 AI Engineer curriculum covering LLMs, RAG, and agent frameworks, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "genai-llm-engineer-roadmap": {
    "title": "Generative AI & LLM Engineer Roadmap 2026: Complete Guide | LearnMLAcademy",
    "description": "Accelerate your career with the Generative AI and LLM Engineer roadmap, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "data-scientist-roadmap": {
    "title": "Data Scientist Career Roadmap 2026: Statistics, Python & ML | LearnMLAcademy",
    "description": "Explore the modern Data Scientist roadmap covering statistics and ML, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "interview-preparation-strategy": {
    "title": "How to Prepare for AI & ML Technical Interviews: 2026 Guide | LearnMLAcademy",
    "description": "Prepare effectively for technical AI and machine learning interviews, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-interview-questions": {
    "title": "Top 100 Machine Learning Interview Questions & Detailed Answers | LearnMLAcademy",
    "description": "Ace machine learning interviews with top 100 solved theory and math questions, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "deep-learning-interview-questions": {
    "title": "Top Deep Learning Interview Questions & Solved Answers: 2026 Guide | LearnMLAcademy",
    "description": "Master essential Deep Learning interview questions on CNNs and LLMs, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "genai-llm-rag-interview": {
    "title": "Generative AI, LLM & RAG Interview Questions: Solved 2026 Guide | LearnMLAcademy",
    "description": "Prepare for Generative AI, LLM, and RAG interview rounds with solved questions, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "agentic-ai-interview": {
    "title": "Top Agentic AI Interview Questions & Architectures: 2026 Guide | LearnMLAcademy",
    "description": "Prepare for Agentic AI interviews covering tool design and memory, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "python-ai-ml-interview": {
    "title": "Python Coding for Machine Learning Interviews: Solved Problems | LearnMLAcademy",
    "description": "Practice essential Python coding problems asked in machine learning interviews, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "sql-ai-data-interview": {
    "title": "SQL Coding for Data & AI Interviews: Window Functions & Queries | LearnMLAcademy",
    "description": "Solve practical SQL interview questions using window functions and aggregations, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "ml-ai-system-design-interview": {
    "title": "Machine Learning System Design Interview: Framework & Solved Cases | LearnMLAcademy",
    "description": "Design scalable ML systems during interviews using proven structural frameworks, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "mlops-production-interview": {
    "title": "MLOps & Production AI Interview Questions: Debugging Scenarios | LearnMLAcademy",
    "description": "Prepare for MLOps technical interviews with real-world debugging scenarios, with Python code, architecture diagrams, worked examples, and interview quiz."
  },
  "behavioral-project-interview": {
    "title": "AI/ML Behavioral & Project Deep-Dive Interview: STAR Framework Guide | LearnMLAcademy",
    "description": "Master behavioral and project deep-dive interviews using the STAR method, with Python code, architecture diagrams, worked examples, and interview quiz."
  }
};

export const getSEOData = (topicId: string, defaultTitle: string): { title: string; description: string } => {
  const selected = seoData[topicId] || {
    title: `${defaultTitle} Tutorial for Machine Learning | LearnML`,
    description: fitMetaDescription(`Learn the central concepts behind ${defaultTitle}, understand how each component works in practice, explore formulas, and avoid common failures.`)
  };

  return {
    ...selected,
    description: fitMetaDescription(selected.description)
  };
};

const BASE_URL = 'https://www.learnmlacademy.com';

export const getCanonicalUrl = (topicId?: string): string => {
  if (topicId) return `${BASE_URL}/learn/${topicId}`;
  return BASE_URL;
};

function getEducationalLevel(categoryTitle?: string): 'Beginner' | 'Intermediate' | 'Advanced' {
  if (!categoryTitle) return 'Intermediate';
  const c = categoryTitle.toLowerCase();
  if (c.includes('foundation') || c.includes('python')) return 'Beginner';
  if (c.includes('deep learning') || c.includes('generative') || c.includes('large language') || c.includes('agentic') || c.includes('mlops') || c.includes('interview')) {
    return 'Advanced';
  }
  return 'Intermediate';
}

export const getLearningResourceSchema = (
  topicId: string,
  title: string,
  description: string,
  categoryTitle?: string
): string => {
  const pageUrl = `${BASE_URL}/learn/${topicId}`;
  const cleanCategory = (categoryTitle || 'Machine Learning').replace(/^\d+\.\s*/, '');
  const educationalLevel = getEducationalLevel(categoryTitle);
  const quizzes = getQuizzesForTopicId(topicId) || [];
  const faqQuestions = quizzes.slice(0, 5);

  const graph: any[] = [
    {
      "@type": ["TechArticle", "LearningResource"],
      "@id": `${pageUrl}#article`,
      "url": pageUrl,
      "headline": title,
      "name": title,
      "description": description,
      "educationalLevel": educationalLevel,
      "learningResourceType": "Tutorial",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "image": `${BASE_URL}/og-image.png`,
      "datePublished": "2026-01-15",
      "dateModified": "2026-03-28",
      "timeRequired": "PT12M",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl
      },
      "author": {
        "@type": "Person",
        "name": "Prateek Sharan",
        "url": `${BASE_URL}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": "LearnMLAcademy",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/favicon.svg`
        }
      },
      "teaches": title,
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Curriculum",
          "item": `${BASE_URL}/curriculum`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": cleanCategory,
          "item": `${BASE_URL}/curriculum`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": title,
          "item": pageUrl
        }
      ]
    }
  ];

  if (faqQuestions.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": faqQuestions.map((q) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${q.options[q.correctAnswerIndex]} — ${q.explanation}`
        }
      }))
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
};
