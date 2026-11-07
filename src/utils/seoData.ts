// Extracted pure SEO metadata and string fitters (no quiz or heavy runtime imports)
const META_DESCRIPTION_MAX_LENGTH = 155;

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

  if (sentenceEnd >= 130) {
    return candidate.slice(0, sentenceEnd + 1);
  }

  const phraseEnd = Math.max(
    candidate.lastIndexOf(","),
    candidate.lastIndexOf(";"),
    candidate.lastIndexOf(":"),
    candidate.lastIndexOf("—"),
    candidate.lastIndexOf("–")
  );

  if (phraseEnd >= 130) {
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
    "title": "What is Machine Learning? | LearnMLAcademy",
    "description": "Understand machine learning definitions, core workflow, and paradigms, with worked examples, practical Python tasks, and concept-check questions."
  },
  "types-of-ml": {
    "title": "Types of Machine Learning | LearnMLAcademy",
    "description": "Master the four main types of machine learning and real applications, with worked examples, practical Python tasks, and concept-check questions."
  },
  "supervised-learning-intro": {
    "title": "Supervised Learning Guide | LearnMLAcademy",
    "description": "Learn supervised learning algorithms, labelled datasets, and metrics, with worked examples, practical Python tasks, and concept-check questions."
  },
  "unsupervised-learning-intro": {
    "title": "Unsupervised Learning Guide | LearnMLAcademy",
    "description": "Explore unsupervised learning techniques, clustering, and latent patterns, with worked examples, practical Python tasks, and concept-check questions."
  },
  "reinforcement-learning-intro": {
    "title": "Reinforcement Learning Intro | LearnMLAcademy",
    "description": "Understand reinforcement learning agents, reward signals, and Q-learning, with worked examples, practical Python tasks, and concept-check questions."
  },
  "batch-vs-online": {
    "title": "Batch vs Online Learning | LearnMLAcademy",
    "description": "Compare batch training versus streaming online incremental ML updates, with worked examples, practical Python tasks, and concept-check questions."
  },
  "ml-lifecycle": {
    "title": "Machine Learning Life Cycle | LearnMLAcademy",
    "description": "Follow the complete machine learning lifecycle from data to deployment, with worked examples, practical Python tasks, and concept-check questions."
  },
  "python-for-ml": {
    "title": "Python for Machine Learning | LearnMLAcademy",
    "description": "Master essential Python programming for machine learning and data science, with Python exercises, array tasks, and practical library walkthroughs."
  },
  "numpy-essentials": {
    "title": "NumPy Essentials for ML | LearnMLAcademy",
    "description": "Master NumPy array indexing, broadcasting, matrix math, and operations, with Python exercises, array tasks, and practical library walkthroughs."
  },
  "pandas-essentials": {
    "title": "Pandas Essentials for ML | LearnMLAcademy",
    "description": "Manipulate DataFrames, clean tabular data, and compute aggregations, with Python exercises, array tasks, and practical library walkthroughs."
  },
  "scikit-learn-essentials": {
    "title": "Scikit-Learn Essentials | LearnMLAcademy",
    "description": "Build scikit-learn preprocessing pipelines, models, and transformers, with Python exercises, array tasks, and practical library walkthroughs."
  },
  "eda": {
    "title": "Exploratory Data Analysis (EDA) | LearnMLAcademy",
    "description": "Perform exploratory data analysis with statistical summaries and plots, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "handling-missing-data": {
    "title": "Handling Missing Data in ML | LearnMLAcademy",
    "description": "Handle missing data using mean, median, KNN, and iterative imputation, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "encoding-categorical": {
    "title": "Encoding Categorical Data | LearnMLAcademy",
    "description": "Encode categorical features with one-hot, target, and ordinal methods, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "bias-variance": {
    "title": "Bias-Variance Tradeoff in ML | LearnMLAcademy",
    "description": "Diagnose bias-variance tradeoff, generalization error, and tradeoffs, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "feature-scaling": {
    "title": "Feature Scaling: Scalers & Math | LearnMLAcademy",
    "description": "Apply feature scaling with StandardScaler, MinMaxScaler, and RobustScaler, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "feature-engineering": {
    "title": "Feature Engineering Guide | LearnMLAcademy",
    "description": "Engineer predictive features, interaction terms, and temporal signals, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "feature-selection": {
    "title": "Feature Selection Techniques | LearnMLAcademy",
    "description": "Select optimal feature subsets using variance thresholds and elimination, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "data-visualization": {
    "title": "Data Visualization for ML | LearnMLAcademy",
    "description": "Create informative data visualizations with Matplotlib, Seaborn, and plots, with cleaning recipes, feature workflows, and before-and-after examples."
  },
  "regression-intro": {
    "title": "Regression Algorithms Overview | LearnMLAcademy",
    "description": "Understand continuous target estimation, baseline models, and metrics, with equations, fitted examples, residual analysis, and Python practice."
  },
  "linear-regression": {
    "title": "Linear Regression: Math & Code | LearnMLAcademy",
    "description": "Derive linear regression with Ordinary Least Squares and gradient descent, with equations, fitted examples, residual analysis, and Python practice."
  },
  "gradient-descent": {
    "title": "Gradient Descent Optimization | LearnMLAcademy",
    "description": "Implement gradient descent optimization, learning rates, and updates, with equations, fitted examples, residual analysis, and Python practice."
  },
  "polynomial-regression": {
    "title": "Polynomial Regression Guide | LearnMLAcademy",
    "description": "Fit polynomial regression curves while preventing high-variance overfitting, with equations, fitted examples, residual analysis, and Python practice."
  },
  "ridge-regression": {
    "title": "Ridge Regression (L2) Guide | LearnMLAcademy",
    "description": "Constrain regression coefficients using Ridge L2 regularization penalties, with equations, fitted examples, residual analysis, and Python practice."
  },
  "lasso-regression": {
    "title": "Lasso Regression (L1) Guide | LearnMLAcademy",
    "description": "Perform automated feature selection using Lasso L1 regularization sparsity, with equations, fitted examples, residual analysis, and Python practice."
  },
  "classification-intro": {
    "title": "Classification Algorithms Guide | LearnMLAcademy",
    "description": "Categorize discrete target classes with decision boundaries and probabilities, with decision-boundary visuals, prediction cases, and metric calculations."
  },
  "logistic-regression": {
    "title": "Logistic Regression: Math & Code | LearnMLAcademy",
    "description": "Master logistic regression, sigmoid activation, and decision boundaries, with decision-boundary visuals, prediction cases, and metric calculations."
  },
  "decision-trees": {
    "title": "Decision Trees: Math & Code | LearnMLAcademy",
    "description": "Construct decision tree classifiers with Gini impurity and cost pruning, with decision-boundary visuals, prediction cases, and metric calculations."
  },
  "naive-bayes": {
    "title": "Naive Bayes Classifier Guide | LearnMLAcademy",
    "description": "Apply Bayes theorem with conditional independence assumptions for text, with decision-boundary visuals, prediction cases, and metric calculations."
  },
  "knn": {
    "title": "K-Nearest Neighbors (KNN) Guide | LearnMLAcademy",
    "description": "Implement K-Nearest Neighbors classification and Euclidean distance, with decision-boundary visuals, prediction cases, and metric calculations."
  },
  "svm": {
    "title": "Support Vector Machines (SVM) | LearnMLAcademy",
    "description": "Maximize classification margins with Support Vector Machines and kernels, with decision-boundary visuals, prediction cases, and metric calculations."
  },
  "random-forest": {
    "title": "Random Forest: Ensemble Guide | LearnMLAcademy",
    "description": "Train Random Forest ensembles with bootstrap aggregation and tree bagging, with model comparisons, tuning walkthroughs, and result interpretation."
  },
  "bagging": {
    "title": "Bagging & Bootstrap Aggregation | LearnMLAcademy",
    "description": "Reduce model variance using bootstrap sampling and parallel bagging estimators, with model comparisons, tuning walkthroughs, and result interpretation."
  },
  "boosting": {
    "title": "Boosting Algorithms Overview | LearnMLAcademy",
    "description": "Train sequential boosting ensembles that correct earlier errors iteratively, with model comparisons, tuning walkthroughs, and result interpretation."
  },
  "adaboost": {
    "title": "AdaBoost Algorithm: Math & Code | LearnMLAcademy",
    "description": "Understand AdaBoost iterative sample weighting and sequential corrections, with model comparisons, tuning walkthroughs, and result interpretation."
  },
  "gradient-boosting": {
    "title": "Gradient Boosting: Math & Code | LearnMLAcademy",
    "description": "Build Gradient Boosting models that fit successive pseudo-residuals, with model comparisons, tuning walkthroughs, and result interpretation."
  },
  "xgboost": {
    "title": "XGBoost Algorithm: Math & Code | LearnMLAcademy",
    "description": "Optimize XGBoost hyperparameters with second-order Taylor expansions, with model comparisons, tuning walkthroughs, and result interpretation."
  },
  "kmeans": {
    "title": "K-Means Clustering: Math & Code | LearnMLAcademy",
    "description": "Cluster unlabelled data with K-Means, inertia curves, and centroid updates, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "hierarchical": {
    "title": "Hierarchical Clustering Guide | LearnMLAcademy",
    "description": "Build agglomerative hierarchical tree dendrograms and compute linkages, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "dbscan": {
    "title": "DBSCAN Clustering: Math & Code | LearnMLAcademy",
    "description": "Discover arbitrary-shaped density clusters and isolate outliers with DBSCAN, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "pca": {
    "title": "PCA Dimensionality Reduction | LearnMLAcademy",
    "description": "Reduce high-dimensional feature spaces using Principal Component Analysis, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "tsne": {
    "title": "t-SNE Dimensionality Reduction | LearnMLAcademy",
    "description": "Visualize high-dimensional data clusters with non-linear t-SNE probability maps, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "association-rules": {
    "title": "Association Rule Mining Guide | LearnMLAcademy",
    "description": "Mine associative purchase rules using support, confidence, and lift metrics, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "apriori": {
    "title": "Apriori Algorithm: Math & Code | LearnMLAcademy",
    "description": "Extract frequent itemsets and association rules with the Apriori algorithm, with distance calculations, cluster visuals, and worked Python tasks."
  },
  "train-test-split": {
    "title": "Train-Test Split & Validation | LearnMLAcademy",
    "description": "Partition datasets with stratified sampling to preserve label balances, with metric calculations, threshold examples, and validation guidance."
  },
  "cross-validation": {
    "title": "Cross-Validation Strategies | LearnMLAcademy",
    "description": "Evaluate generalization performance using K-Fold and stratified validation, with metric calculations, threshold examples, and validation guidance."
  },
  "overfitting-underfitting": {
    "title": "Overfitting vs Underfitting Guide | LearnMLAcademy",
    "description": "Diagnose model variance and bias issues using empirical learning curves, with metric calculations, threshold examples, and validation guidance."
  },
  "cost-functions": {
    "title": "Cost & Loss Functions in ML | LearnMLAcademy",
    "description": "Compare convex optimization landscapes and loss functions in machine learning, with equations, fitted examples, residual analysis, and Python practice."
  },
  "hyperparameter-tuning": {
    "title": "Hyperparameter Tuning in ML | LearnMLAcademy",
    "description": "Optimize machine learning hyperparameters using systematic tuning methods, with metric calculations, threshold examples, and validation guidance."
  },
  "grid-random-search": {
    "title": "Grid Search vs Random Search | LearnMLAcademy",
    "description": "Compare Grid Search exhaustive exploration against fast Random Search sweeps, with metric calculations, threshold examples, and validation guidance."
  },
  "confusion-matrix": {
    "title": "Confusion Matrix & Metrics | LearnMLAcademy",
    "description": "Interpret confusion matrices, precision, recall, and harmonic F1-scores, with metric calculations, threshold examples, and validation guidance."
  },
  "roc-auc": {
    "title": "ROC-AUC Curve Interpretation | LearnMLAcademy",
    "description": "Evaluate binary classifiers across all decision thresholds with ROC curves, with metric calculations, threshold examples, and validation guidance."
  },
  "arima": {
    "title": "ARIMA Time Series Forecasting | LearnMLAcademy",
    "description": "Model non-stationary time series using ARIMA differencing and lag parameters, with forecast charts, lag calculations, and chronological test examples."
  },
  "moving-average": {
    "title": "Moving Average for Time Series | LearnMLAcademy",
    "description": "Smooth noisy temporal signals using Simple and Exponential Moving Averages, with forecast charts, lag calculations, and chronological test examples."
  },
  "exponential-smoothing": {
    "title": "Exponential Smoothing Models | LearnMLAcademy",
    "description": "Forecast trends and seasonal cycles using Holt-Winters exponential smoothing, with forecast charts, lag calculations, and chronological test examples."
  },
  "forecasting-basics": {
    "title": "Time Series Forecasting Basics | LearnMLAcademy",
    "description": "Understand time-series stationarity, autocorrelation, and lag features, with forecast charts, lag calculations, and chronological test examples."
  },
  "semi-supervised": {
    "title": "Semi-Supervised Learning Guide | LearnMLAcademy",
    "description": "Leverage large unlabelled datasets with pseudo-labelling and label spreading, with reward calculations, policy examples, and agent-training exercises."
  },
  "online-learning": {
    "title": "Online Learning & Streaming ML | LearnMLAcademy",
    "description": "Stream machine learning updates continuously using incremental SGD algorithms, with reward calculations, policy examples, and agent-training exercises."
  },
  "reinforcement-learning-adv": {
    "title": "Advanced Reinforcement Learning | LearnMLAcademy",
    "description": "Implement Deep Q-Networks and policy gradient algorithms for game agents, with reward calculations, policy examples, and agent-training exercises."
  },
  "multi-armed-bandits": {
    "title": "Multi-Armed Bandits Guide | LearnMLAcademy",
    "description": "Solve exploration-exploitation trade-offs with UCB algorithms, with reward calculations, policy examples, and agent-training exercises."
  },
  "deep-learning-intro": {
    "title": "Deep Learning Fundamentals | LearnMLAcademy",
    "description": "Understand deep neural network fundamentals, layers, and representations, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "neural-networks": {
    "title": "How Neural Networks Learn | LearnMLAcademy",
    "description": "Follow how artificial neurons compute activations and update synaptic weights, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "math-foundations-deep-learning": {
    "title": "Math for Neural Networks | LearnMLAcademy",
    "description": "Master the linear algebra and multivariate calculus powering neural networks, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "activation-functions": {
    "title": "Neural Activation Functions | LearnMLAcademy",
    "description": "Compare non-linear activation functions including ReLU, LeakyReLU, and GeLU, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "tensors-frameworks-gpus": {
    "title": "Tensors, Frameworks & GPUs | LearnMLAcademy",
    "description": "Manage multidimensional tensors and accelerate training on CUDA GPU hardware, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "loss-functions-deep-learning": {
    "title": "Deep Learning Loss Functions | LearnMLAcademy",
    "description": "Select optimal loss functions for deep regression, classification, and ranking, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "backpropagation": {
    "title": "Backpropagation & Autodiff | LearnMLAcademy",
    "description": "Derive backpropagation step by step using the calculus chain rule in Python, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "neural-network-training-loop": {
    "title": "Neural Network Training Loops | LearnMLAcademy",
    "description": "Construct robust PyTorch training loops with validation and gradient tracking, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "deep-learning-optimizers": {
    "title": "Deep Learning Optimizers Guide | LearnMLAcademy",
    "description": "Compare adaptive optimizers including AdamW, momentum, and cosine schedulers, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "weight-initialization": {
    "title": "Weight Initialization in NNs | LearnMLAcademy",
    "description": "Prevent vanishing gradients with He initialization and Layer Normalization, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "deep-learning-regularization": {
    "title": "Deep Learning Regularization | LearnMLAcademy",
    "description": "Prevent deep neural network overfitting with dropout and weight decay penalties, with tensor walkthroughs, gradient calculations, and PyTorch practice."
  },
  "data-augmentation-deep-learning": {
    "title": "Deep Learning Data Augmentation | LearnMLAcademy",
    "description": "Expand computer vision training datasets with affine transforms, with feature-map visuals, architecture comparisons, and image exercises."
  },
  "cnn": {
    "title": "CNNs & Image Classification | LearnMLAcademy",
    "description": "Master convolutional kernels, feature maps, and pooling layers for vision, with feature-map visuals, architecture comparisons, and image exercises."
  },
  "cnn-architectures-resnet": {
    "title": "CNN Architectures: AlexNet to ResNet | LearnMLAcademy",
    "description": "Understand deep residual connections and skip connections in ResNet networks, with feature-map visuals, architecture comparisons, and image exercises."
  },
  "object-detection": {
    "title": "Object Detection & Segmentation | LearnMLAcademy",
    "description": "Detect bounding boxes and explain convolutional feature maps with Grad-CAM, with feature-map visuals, architecture comparisons, and image exercises."
  },
  "vision-transformers": {
    "title": "Vision Transformers (ViT) Guide | LearnMLAcademy",
    "description": "Process image patches with Transformer self-attention using Vision Transformers, with feature-map visuals, architecture comparisons, and image exercises."
  },
  "rnn-lstm": {
    "title": "RNNs, LSTMs & GRUs Explained | LearnMLAcademy",
    "description": "Capture long-term temporal dependencies with LSTM and GRU gating mechanisms, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "attention-transformers-deep-learning": {
    "title": "Seq2Seq Models & Attention | LearnMLAcademy",
    "description": "Understand encoder-decoder sequence modeling and Bahdanau attention alignments, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "transformers-deep-learning": {
    "title": "Transformers for Deep Learning | LearnMLAcademy",
    "description": "Construct Transformer encoder and decoder stacks with positional encodings, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "autoencoders": {
    "title": "Autoencoders & Variants Guide | LearnMLAcademy",
    "description": "Compress high-dimensional data into bottleneck latent spaces with autoencoders, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "transfer-learning": {
    "title": "Transfer Learning & Fine-Tuning | LearnMLAcademy",
    "description": "Adapt pretrained deep vision and language models to downstream tasks with LoRA, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "self-supervised-few-shot-learning": {
    "title": "Self-Supervised & Few-Shot Learning | LearnMLAcademy",
    "description": "Train representations without labels using contrastive learning and few shots, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "graph-neural-networks": {
    "title": "Graph Neural Networks (GNNs) | LearnMLAcademy",
    "description": "Process relational graph structures with message passing and node embeddings, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "saving-deploying-deep-models": {
    "title": "Saving & Deploying Deep Models | LearnMLAcademy",
    "description": "Export PyTorch weights to ONNX runtimes and serve low-latency microservices, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "state-space-models": {
    "title": "State-Space Models (Mamba) Guide | LearnMLAcademy",
    "description": "Understand linear State-Space Models (SSMs) and selective Mamba scan layers, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "deep-learning-nlp": {
    "title": "Deep Learning for NLP Guide | LearnMLAcademy",
    "description": "Process natural language text using Word2Vec embeddings and subword tokenizers, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "pinn-kan-topological-networks": {
    "title": "PINNs, KANs & Topological Networks | LearnMLAcademy",
    "description": "Solve differential equations with PINNs and learnable spline nets, with sequence diagrams, attention calculations, and model-code exercises."
  },
  "generative-ai-intro": {
    "title": "What Is Generative AI? | LearnMLAcademy",
    "description": "Discover how Generative AI models synthesize novel text, images, and audio, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "generative-vs-discriminative": {
    "title": "Generative vs Discriminative Models | LearnMLAcademy",
    "description": "Compare generative versus discriminative models with joint and conditional math, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "how-generative-models-learn": {
    "title": "How Generative Models Learn | LearnMLAcademy",
    "description": "Understand how generative models estimate and sample distributions, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "vae": {
    "title": "Variational Autoencoders (VAEs) | LearnMLAcademy",
    "description": "Implement Variational Autoencoders (VAEs) using the reparameterization trick, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "gans": {
    "title": "Generative Adversarial Networks (GANs) | LearnMLAcademy",
    "description": "Train Generative Adversarial Networks (GANs) using minimax loss and DCGAN code, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "diffusion-models": {
    "title": "Diffusion Models Architecture | LearnMLAcademy",
    "description": "Derive diffusion models from scratch using forward noise and reverse denoising, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "stable-latent-diffusion": {
    "title": "Stable Diffusion & Latent Diffusion | LearnMLAcademy",
    "description": "Explore Latent Stable Diffusion architectures with UNet denoisers, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "controlling-diffusion-models": {
    "title": "Controlling Diffusion Models | LearnMLAcademy",
    "description": "Control image generation with ControlNet and edge conditioning, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "finetuning-image-models": {
    "title": "Fine-Tuning Image Models | LearnMLAcademy",
    "description": "Fine-tune image diffusion models using LoRA weights and DreamBooth, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "multimodal-ai": {
    "title": "Multimodal Generative AI | LearnMLAcademy",
    "description": "Connect text and visual modalities using CLIP contrastive encoders, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "audio-music-video-generation": {
    "title": "Audio, Music & Video Generation | LearnMLAcademy",
    "description": "Synthesize realistic audio, speech, music, and video using modern diffusion, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "synthetic-data": {
    "title": "Synthetic Data Generation | LearnMLAcademy",
    "description": "Generate privacy-preserving synthetic tabular and text datasets using CTGAN, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "evaluating-generative-models": {
    "title": "Evaluating Generative Models | LearnMLAcademy",
    "description": "Evaluate generative image and text models using FID scores and perplexity, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "responsible-generative-ai": {
    "title": "Responsible Generative AI Guide | LearnMLAcademy",
    "description": "Implement responsible AI governance, synthetic watermarking, and bias detection, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "choosing-generative-model": {
    "title": "Choosing Generative Models Guide | LearnMLAcademy",
    "description": "Select the optimal generative model architecture based on latency and fidelity, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "building-genai-apps": {
    "title": "Building GenAI Applications | LearnMLAcademy",
    "description": "Build production Generative AI applications with streaming APIs and caching, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "genai-deployment": {
    "title": "Deploying Generative AI Models | LearnMLAcademy",
    "description": "Deploy generative AI models to production with auto-scaling systems, with diffusion diagrams, prompt experiments, and output-quality checks."
  },
  "llm-intro": {
    "title": "What Are Large Language Models? | LearnMLAcademy",
    "description": "Understand modern Large Language Model architectures and pretraining, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "tokenization-embeddings": {
    "title": "Tokens, Embeddings & Context Windows | LearnMLAcademy",
    "description": "Master Byte-Pair Encoding (BPE) tokenization, rotary embeddings, and context, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "transformers-attention": {
    "title": "Transformer Architecture for LLMs | LearnMLAcademy",
    "description": "Understand Transformer multi-head self-attention mechanics and QKV math, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "text-generation-decoding": {
    "title": "LLM Next-Token Prediction & Decoding | LearnMLAcademy",
    "description": "Control LLM text generation using temperature, top-k, top-p, and beam search, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "prompt-engineering": {
    "title": "Prompt Engineering & Structured Outputs | LearnMLAcademy",
    "description": "Design production prompts with few-shot examples and output schemas, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "pretraining-finetuning": {
    "title": "LLM Pretraining & Fine-Tuning | LearnMLAcademy",
    "description": "Explore how modern foundation LLMs are pretrained at scale on massive compute, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "instruction-tuning-rlhf": {
    "title": "Fine-Tuning LLMs: SFT, RLHF & LoRA | LearnMLAcademy",
    "description": "Fine-tune LLMs efficiently using Supervised Fine-Tuning (SFT) and LoRA adapters, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "rag": {
    "title": "Retrieval-Augmented Generation (RAG) | LearnMLAcademy",
    "description": "Understand Retrieval-Augmented Generation (RAG): indexing vs query phases, source attribution, failure boundaries, diagrams, and self-check quiz."
  },
  "semantic-search-embeddings": {
    "title": "Semantic Search with Embeddings | LearnMLAcademy",
    "description": "Build semantic search engines using dense neural embeddings and cosine, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "vector-databases": {
    "title": "Vector Databases for LLMs | LearnMLAcademy",
    "description": "Select and query vector databases using HNSW indexing and metadata filtering, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "advanced-rag": {
    "title": "Advanced RAG: Chunking & Reranking | LearnMLAcademy",
    "description": "Optimize RAG pipelines with chunking, rerankers, and hybrid search, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "llm-evaluation": {
    "title": "Evaluating Large Language Models | LearnMLAcademy",
    "description": "Evaluate LLM accuracy using MMLU benchmarks and automated judges, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "llm-hallucinations-safety": {
    "title": "LLM Hallucinations & Guardrails | LearnMLAcademy",
    "description": "Detect and eliminate LLM hallucinations using guardrails and filters, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "reasoning-models": {
    "title": "Reasoning Models & Test-Time Compute | LearnMLAcademy",
    "description": "Understand reasoning models, chain-of-thought prompting, and test-time compute, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "efficient-llm-serving": {
    "title": "Efficient LLM Serving & Inference | LearnMLAcademy",
    "description": "Serve LLMs at scale with vLLM PagedAttention, KV cache reuse, and quantization, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "llmops": {
    "title": "LLMOps in Production Guide | LearnMLAcademy",
    "description": "Deploy and monitor enterprise LLM applications with tracing and latency budgets, with token walkthroughs, prompt design tasks, and retrieval exercises."
  },
  "agentic-ai-intro": {
    "title": "What Is Agentic AI? Agent Concepts | LearnMLAcademy",
    "description": "Learn autonomous AI agent architectures and deterministic workflows, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "tool-calling": {
    "title": "AI Agent Tool Calling Architecture | LearnMLAcademy",
    "description": "Master AI agent tool calling, schema validation, and safe error retries, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "building-ai-agent": {
    "title": "Build an AI Agent from Scratch | LearnMLAcademy",
    "description": "Build an autonomous AI agent from scratch with step-by-step reasoning, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "planning-reflection": {
    "title": "Agent Planning, ReAct & Reflection | LearnMLAcademy",
    "description": "Implement AI agent planning loops, ReAct reasoning, and self-reflection, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-context-engineering": {
    "title": "Context Engineering for AI Agents | LearnMLAcademy",
    "description": "Optimize AI agent context windows with token budgets and smart compaction, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-memory": {
    "title": "AI Agent Memory Systems Explained | LearnMLAcademy",
    "description": "Design AI agent memory using short-term state and long-term vector storage, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-state-graphs": {
    "title": "Agent State Graphs & Workflows | LearnMLAcademy",
    "description": "Build reliable agent workflows, cyclical state graphs, and checkpoints, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "durable-long-running-agents": {
    "title": "Durable & Long-Running AI Agents | LearnMLAcademy",
    "description": "Implement durable long-running AI agents with human-in-the-loop checkpoints, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agentic-rag": {
    "title": "Agentic RAG Architecture & Router | LearnMLAcademy",
    "description": "Build agentic RAG systems with intelligent routing and verification, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "multi-agent-systems": {
    "title": "Multi-Agent Systems & Handoffs | LearnMLAcademy",
    "description": "Architect multi-agent systems with role delegation, handoffs, and consensus, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "model-context-protocol": {
    "title": "Model Context Protocol (MCP) Guide | LearnMLAcademy",
    "description": "Implement Model Context Protocol (MCP) clients and servers for AI tools, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-frameworks": {
    "title": "AI Agent Frameworks Compared | LearnMLAcademy",
    "description": "Compare top AI agent frameworks including LangGraph, CrewAI, and AutoGen, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "browser-computer-use-agents": {
    "title": "Computer-Use & Browser AI Agents | LearnMLAcademy",
    "description": "Build browser automation and computer-use AI agents with safe sandboxing, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-security": {
    "title": "AI Agent Security & Guardrails | LearnMLAcademy",
    "description": "Secure AI agents against prompt injection, privilege escalation, and loops, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-evaluation-safety": {
    "title": "AI Agent Evaluation & Safety | LearnMLAcademy",
    "description": "Evaluate AI agent performance with trajectory benchmarks and safety metrics, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "agent-observability-deployment": {
    "title": "AI Agent Observability & Tracing | LearnMLAcademy",
    "description": "Monitor production AI agents with distributed tracing, latency, and cost alerts, with workflow diagrams, tool-use traces, and safety-focused exercises."
  },
  "project-customer-churn": {
    "title": "Customer Churn Prediction Project | LearnMLAcademy",
    "description": "Build an end-to-end customer churn prediction pipeline with scikit-learn, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-credit-risk": {
    "title": "Credit Risk Prediction ML Project | LearnMLAcademy",
    "description": "Predict loan defaults with gradient boosted trees and explainable SHAP values, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-sales-forecasting": {
    "title": "Sales Forecasting ML Project | LearnMLAcademy",
    "description": "Forecast multi-store retail sales using lag features and chronological splits, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-image-classification": {
    "title": "Image Classification Project | LearnMLAcademy",
    "description": "Train an image classifier from scratch using transfer learning with ResNet, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-genai-app": {
    "title": "Build a Generative AI Application | LearnMLAcademy",
    "description": "Develop an interactive Generative AI application with streaming responses, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-rag-document-qa": {
    "title": "Document Q&A RAG System Project | LearnMLAcademy",
    "description": "Construct an enterprise PDF question-answering system using RAG retrieval, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-ai-agent": {
    "title": "Build an AI Agent with Tools | LearnMLAcademy",
    "description": "Implement a fully autonomous AI agent with tool execution and memory state, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "project-multi-agent-research": {
    "title": "Multi-Agent Research Assistant Project | LearnMLAcademy",
    "description": "Coordinate multi-agent workflows for automated web research and fact synthesis, with reproducible setup, model evaluation, and an end-to-end project task."
  },
  "ai-engineering-mlops": {
    "title": "AI Engineering & MLOps Overview | LearnMLAcademy",
    "description": "Transition machine learning models from prototype notebooks to production APIs, with pipeline maps, deployment choices, and production reliability checks."
  },
  "ml-data-feature-pipelines": {
    "title": "ML Data & Feature Pipelines Guide | LearnMLAcademy",
    "description": "Build scalable ML data and feature pipelines with automated schema validation, with pipeline maps, deployment choices, and production reliability checks."
  },
  "experiment-tracking-model-registry": {
    "title": "ML Experiment Tracking & Registries | LearnMLAcademy",
    "description": "Track machine learning experiments and manage model versions using MLflow, with pipeline maps, deployment choices, and production reliability checks."
  },
  "batch-online-inference": {
    "title": "Batch vs Online ML Inference | LearnMLAcademy",
    "description": "Design batch, real-time online, and event streaming inference architectures, with pipeline maps, deployment choices, and production reliability checks."
  },
  "ml-cicd-continuous-training": {
    "title": "CI/CD & Continuous Training for ML | LearnMLAcademy",
    "description": "Implement automated CI/CD pipelines and continuous retraining, with pipeline maps, deployment choices, and production reliability checks."
  },
  "ml-monitoring-drift": {
    "title": "ML Monitoring & Data Drift Detection | LearnMLAcademy",
    "description": "Detect data drift, concept drift, and performance decay using Evidently metrics, with pipeline maps, deployment choices, and production reliability checks."
  },
  "production-ai-reliability": {
    "title": "Production AI Reliability & Security | LearnMLAcademy",
    "description": "Ensure production AI system reliability, cost optimization, and API security, with pipeline maps, deployment choices, and production reliability checks."
  },
  "ml-system-design": {
    "title": "End-to-End ML System Design Guide | LearnMLAcademy",
    "description": "Master end-to-end ML system design interviews with scalable architectures, with pipeline maps, deployment choices, and production reliability checks."
  },
  "ai-data-career-paths": {
    "title": "AI & Data Career Paths Compared | LearnMLAcademy",
    "description": "Navigate high-growth AI and data science career paths, salaries, and skills, with skill checklists, worked cases, and role-specific interview drills."
  },
  "ml-engineer-roadmap": {
    "title": "ML Engineer Career Roadmap Guide | LearnMLAcademy",
    "description": "Follow the comprehensive 2026 Machine Learning Engineer roadmap, with skill checklists, worked cases, and role-specific interview drills."
  },
  "ai-engineer-roadmap": {
    "title": "AI Engineer Career Roadmap Guide | LearnMLAcademy",
    "description": "Master the 2026 AI Engineer curriculum covering LLMs, RAG, and agent frameworks, with skill checklists, worked cases, and role-specific interview drills."
  },
  "genai-llm-engineer-roadmap": {
    "title": "GenAI & LLM Engineer Roadmap Guide | LearnMLAcademy",
    "description": "Accelerate your career with the Generative AI and LLM Engineer roadmap, with skill checklists, worked cases, and role-specific interview drills."
  },
  "data-scientist-roadmap": {
    "title": "Data Scientist Career Roadmap Guide | LearnMLAcademy",
    "description": "Explore the modern Data Scientist roadmap covering statistics and ML, with skill checklists, worked cases, and role-specific interview drills."
  },
  "interview-preparation-strategy": {
    "title": "AI & ML Interview Preparation Strategy | LearnMLAcademy",
    "description": "Prepare effectively for technical AI and machine learning interviews, with skill checklists, worked cases, and role-specific interview drills."
  },
  "ml-interview-questions": {
    "title": "Machine Learning Interview Questions | LearnMLAcademy",
    "description": "Ace machine learning interviews with top 100 solved theory and math questions, with skill checklists, worked cases, and role-specific interview drills."
  },
  "deep-learning-interview-questions": {
    "title": "Deep Learning Interview Questions | LearnMLAcademy",
    "description": "Master essential Deep Learning interview questions on CNNs and LLMs, with skill checklists, worked cases, and role-specific interview drills."
  },
  "genai-llm-rag-interview": {
    "title": "Generative AI & LLM Interview Questions | LearnMLAcademy",
    "description": "Prepare for Generative AI, LLM, and RAG interview rounds with solved questions, with skill checklists, worked cases, and role-specific interview drills."
  },
  "agentic-ai-interview": {
    "title": "Agentic AI Interview Questions Guide | LearnMLAcademy",
    "description": "Prepare for Agentic AI interviews covering tool design and memory, with skill checklists, worked cases, and role-specific interview drills."
  },
  "python-ai-ml-interview": {
    "title": "Python Coding for ML Interviews | LearnMLAcademy",
    "description": "Practice essential Python coding problems asked in machine learning interviews, with skill checklists, worked cases, and role-specific interview drills."
  },
  "sql-ai-data-interview": {
    "title": "SQL Coding for Data & AI Interviews | LearnMLAcademy",
    "description": "Solve practical SQL interview questions using window functions and aggregations, with skill checklists, worked cases, and role-specific interview drills."
  },
  "ml-ai-system-design-interview": {
    "title": "ML System Design Interview Guide | LearnMLAcademy",
    "description": "Design scalable ML systems during interviews using proven structural frameworks, with skill checklists, worked cases, and role-specific interview drills."
  },
  "mlops-production-interview": {
    "title": "MLOps & Production ML Interview Questions | LearnMLAcademy",
    "description": "Prepare for MLOps technical interviews with real-world debugging scenarios, with skill checklists, worked cases, and role-specific interview drills."
  },
  "behavioral-project-interview": {
    "title": "AI/ML Behavioral Interview Guide | LearnMLAcademy",
    "description": "Master behavioral and project deep-dive interviews using the STAR method, with skill checklists, worked cases, and role-specific interview drills."
  }
};

export const TOPIC_MODIFICATION_DATES: Record<string, string> = {
  'rag': '2026-10-16',
  // Agentic AI topics: 2026-09-28
  'agentic-ai-intro': '2026-09-28',
  'tool-calling': '2026-09-28',
  'building-ai-agent': '2026-09-28',
  'planning-reflection': '2026-09-28',
  'agent-context-engineering': '2026-09-28',
  'agent-memory': '2026-09-28',
  'agent-state-graphs': '2026-09-28',
  'durable-long-running-agents': '2026-09-28',
  'agentic-rag': '2026-09-28',
  'multi-agent-systems': '2026-09-28',
  'model-context-protocol': '2026-09-28',
  'agent-frameworks': '2026-09-28',
  'browser-computer-use-agents': '2026-09-28',
  'agent-security': '2026-09-28',
  'agent-evaluation-safety': '2026-09-28',
  'agent-observability-deployment': '2026-09-28',
  // Generative AI & LLM topics: 2026-09-27
  'generative-ai-intro': '2026-09-27',
  'generative-vs-discriminative': '2026-09-27',
  'how-generative-models-learn': '2026-09-27',
  'vae': '2026-09-27',
  'gans': '2026-09-27',
  'diffusion-models': '2026-09-27',
  'stable-latent-diffusion': '2026-09-27',
  'controlling-diffusion-models': '2026-09-27',
  'finetuning-image-models': '2026-09-27',
  'multimodal-ai': '2026-09-27',
  'audio-music-video-generation': '2026-09-27',
  'synthetic-data': '2026-09-27',
  'evaluating-generative-models': '2026-09-27',
  'responsible-generative-ai': '2026-09-27',
  'choosing-generative-model': '2026-09-27',
  'building-genai-apps': '2026-09-27',
  'genai-deployment': '2026-09-27',
  'llm-intro': '2026-09-27',
  'tokenization-embeddings': '2026-09-27',
  'transformers-attention': '2026-09-27',
  'text-generation-decoding': '2026-09-27',
  'prompt-engineering': '2026-09-27',
  'pretraining-finetuning': '2026-09-27',
  'instruction-tuning-rlhf': '2026-09-27',
  'semantic-search-embeddings': '2026-09-27',
  'vector-databases': '2026-09-27',
  'advanced-rag': '2026-09-27',
  'llm-evaluation': '2026-09-27',
  'llm-hallucinations-safety': '2026-09-27',
  'reasoning-models': '2026-09-27',
  'efficient-llm-serving': '2026-09-27',
  'llmops': '2026-09-27',
};

export function getTopicDateModified(topicId: string): string | undefined {
  return TOPIC_MODIFICATION_DATES[topicId];
}

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

