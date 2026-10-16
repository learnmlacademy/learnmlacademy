import json
import re

with open('scripts/topics-list.json') as f:
    topics = json.load(f)

suffix = ", with Python code, architecture diagrams, worked examples, and interview quiz."
suffix_len = len(suffix) # 79

# Complete dictionary of all 167 topics
curated_data = {
    # 1. Foundations
    "what-is-ml": (
        "What is Machine Learning? Algorithms, Types & Python 2026 Guide | LearnMLAcademy",
        "Understand machine learning definitions, core workflow, and paradigms"
    ),
    "types-of-ml": (
        "Types of Machine Learning: Supervised, Unsupervised & RL 2026 Guide | LearnMLAcademy",
        "Master the four main types of machine learning and real applications"
    ),
    "supervised-learning-intro": (
        "Supervised Learning in Python: Algorithms, Math & 2026 Guide | LearnMLAcademy",
        "Learn supervised learning algorithms, labelled datasets, and metrics"
    ),
    "unsupervised-learning-intro": (
        "Unsupervised Learning in Python: Clustering & PCA 2026 Guide | LearnMLAcademy",
        "Explore unsupervised learning techniques, clustering, and latent patterns"
    ),
    "reinforcement-learning-intro": (
        "Reinforcement Learning Tutorial: MDP, Policy & Python 2026 Guide | LearnMLAcademy",
        "Understand reinforcement learning agents, reward signals, and Q-learning"
    ),
    "batch-vs-online": (
        "Batch vs Online Learning in Production: Architecture & 2026 Guide | LearnMLAcademy",
        "Compare batch training versus streaming online incremental ML updates"
    ),
    "ml-lifecycle": (
        "End-to-End Machine Learning Lifecycle: Data to Deployment 2026 Guide | LearnMLAcademy",
        "Follow the complete machine learning lifecycle from data to deployment"
    ),

    # 2. Python & ML Libraries
    "python-for-ml": (
        "Python for Machine Learning: NumPy, Pandas & Scikit-Learn 2026 Guide | LearnMLAcademy",
        "Master essential Python programming for machine learning and data science"
    ),
    "numpy-essentials": (
        "NumPy Essentials for Machine Learning: Vectorized Arrays & Code | LearnMLAcademy",
        "Master NumPy array indexing, broadcasting, matrix math, and operations"
    ),
    "pandas-essentials": (
        "Pandas Essentials for Machine Learning: DataFrames, Cleaning & Code | LearnMLAcademy",
        "Manipulate DataFrames, clean tabular data, and compute aggregations"
    ),
    "scikit-learn-essentials": (
        "Scikit-Learn Essentials in Python: Estimators, Pipelines & Code | LearnMLAcademy",
        "Build scikit-learn preprocessing pipelines, models, and transformers"
    ),

    # 3. Data Preprocessing & Feature Engineering
    "eda": (
        "Exploratory Data Analysis (EDA) in Python: Visualizations & Guide | LearnMLAcademy",
        "Perform exploratory data analysis with statistical summaries and plots"
    ),
    "handling-missing-data": (
        "Handling Missing Data in Python: Imputation, KNN & 2026 Guide | LearnMLAcademy",
        "Handle missing data using mean, median, KNN, and iterative imputation"
    ),
    "encoding-categorical": (
        "Encoding Categorical Data in Python: One-Hot, Target & Ordinal Guide | LearnMLAcademy",
        "Encode categorical features with one-hot, target, and ordinal methods"
    ),
    "bias-variance": (
        "Bias-Variance Tradeoff in Machine Learning: Math & Python Guide | LearnMLAcademy",
        "Diagnose bias-variance tradeoff, generalization error, and tradeoffs"
    ),
    "feature-scaling": (
        "Feature Scaling in Python: StandardScaler vs MinMaxScaler Guide | LearnMLAcademy",
        "Apply feature scaling with StandardScaler, MinMaxScaler, and RobustScaler"
    ),
    "outlier-detection": (
        "Outlier Detection in Python: IQR, Z-Score & Isolation Forest Guide | LearnMLAcademy",
        "Detect dataset outliers using IQR thresholds, z-scores, and forests"
    ),
    "data-splitting": (
        "Data Splitting Strategies in Python: Train/Val/Test & Leakage Guide | LearnMLAcademy",
        "Split datasets into train, validation, and test sets without leakage"
    ),
    "feature-engineering": (
        "Feature Engineering Techniques in Python: Domain Features & Code | LearnMLAcademy",
        "Engineer predictive features, interaction terms, and temporal signals"
    ),
    "feature-selection": (
        "Feature Selection Techniques in Python: Filter, Wrapper & Embedded | LearnMLAcademy",
        "Select optimal feature subsets using variance thresholds and elimination"
    ),
    "data-visualization": (
        "Data Visualization for Machine Learning: Matplotlib & Seaborn in Python | LearnMLAcademy",
        "Create informative data visualizations with Matplotlib, Seaborn, and plots"
    ),

    # 4. Supervised Learning
    "regression-intro": (
        "Introduction to Regression in Python: Linear, Polynomial & Metrics | LearnMLAcademy",
        "Understand continuous target estimation, baseline models, and metrics"
    ),
    "linear-regression": (
        "Linear Regression in Python: Math, OLS, Scikit-Learn & 2026 Guide | LearnMLAcademy",
        "Derive linear regression with Ordinary Least Squares and gradient descent"
    ),
    "cost-functions-regression": (
        "Cost Functions for Regression: MSE, MAE, RMSE & Huber in Python | LearnMLAcademy",
        "Evaluate regression cost functions including MSE, MAE, and Huber loss"
    ),
    "gradient-descent": (
        "Gradient Descent from Scratch in Python: Batch, Mini-Batch & SGD | LearnMLAcademy",
        "Implement gradient descent optimization, learning rates, and updates"
    ),
    "multiple-linear-regression": (
        "Multiple Linear Regression in Python: Matrix Math & Diagnostics | LearnMLAcademy",
        "Train multiple linear regression models with multicollinearity checks"
    ),
    "polynomial-regression": (
        "Polynomial Regression in Python: Degree Selection & Overfitting | LearnMLAcademy",
        "Fit polynomial regression curves while preventing high-variance overfitting"
    ),
    "regularization-ridge-lasso": (
        "Ridge and Lasso Regression in Python: L1 vs L2 Math & ElasticNet | LearnMLAcademy",
        "Apply Ridge and Lasso regularization penalties to reduce overfitting"
    ),
    "ridge-regression": (
        "Ridge Regression (L2 Regularization) in Python: Math, Penalty & Code | LearnMLAcademy",
        "Constrain regression coefficients using Ridge L2 regularization penalties"
    ),
    "lasso-regression": (
        "Lasso Regression (L1 Regularization) in Python: Sparsity & Selection | LearnMLAcademy",
        "Perform automated feature selection using Lasso L1 regularization sparsity"
    ),
    "classification-intro": (
        "Introduction to Classification in Python: Decision Boundaries & Code | LearnMLAcademy",
        "Categorize discrete target classes with decision boundaries and probabilities"
    ),
    "logistic-regression": (
        "Logistic Regression in Python: Sigmoid Math, Odds Ratios & Code | LearnMLAcademy",
        "Master logistic regression, sigmoid activation, and decision boundaries"
    ),
    "cost-function-classification": (
        "Cost Functions for Classification: Binary Cross-Entropy in Python | LearnMLAcademy",
        "Calculate log loss and binary cross-entropy for probabilistic outputs"
    ),
    "multi-class-classification": (
        "Multi-Class Classification in Python: One-vs-Rest vs Softmax Guide | LearnMLAcademy",
        "Implement One-vs-Rest, One-vs-One, and Softmax multinomial classification"
    ),
    "decision-trees": (
        "Decision Trees in Python: Gini Impurity, Entropy, Pruning & Code | LearnMLAcademy",
        "Construct decision tree classifiers with Gini impurity and cost pruning"
    ),
    "knn": (
        "K-Nearest Neighbors (KNN) in Python: Distance Metrics & Tuning | LearnMLAcademy",
        "Implement K-Nearest Neighbors classification and Euclidean distance"
    ),
    "naive-bayes": (
        "Naive Bayes Classifier in Python: Bayes Theorem & Probabilities Guide | LearnMLAcademy",
        "Apply Bayes theorem with conditional independence assumptions for text"
    ),
    "svm": (
        "Support Vector Machines (SVM) in Python: Kernel Trick & Math Guide | LearnMLAcademy",
        "Maximize classification margins with Support Vector Machines and kernels"
    ),

    # 5. Ensemble Learning
    "ensemble-intro": (
        "Ensemble Learning in Python: Bagging, Boosting & Stacking Guide | LearnMLAcademy",
        "Combine diverse weak learners using bagging, boosting, and voting ensembles"
    ),
    "bagging": (
        "Bootstrap Aggregating (Bagging) in Python: Variance Reduction & Code | LearnMLAcademy",
        "Reduce model variance using bootstrap sampling and parallel bagging estimators"
    ),
    "random-forest": (
        "Random Forest Classifier in Python: Out-of-Bag & Feature Importance | LearnMLAcademy",
        "Train Random Forest ensembles with bootstrap aggregation and tree bagging"
    ),
    "boosting": (
        "Boosting Algorithms in Python: Sequential Residual Learning & Code | LearnMLAcademy",
        "Train sequential boosting ensembles that correct earlier errors iteratively"
    ),
    "adaboost": (
        "AdaBoost Classifier in Python: Adaptive Sample Weights & Math Guide | LearnMLAcademy",
        "Understand AdaBoost iterative sample weighting and sequential corrections"
    ),
    "gradient-boosting": (
        "Gradient Boosting Machines in Python: Residual Learning & Code | LearnMLAcademy",
        "Build Gradient Boosting models that fit successive pseudo-residuals"
    ),
    "xgboost": (
        "XGBoost in Python: Regularized Trees, Histograms & Fast Code Guide | LearnMLAcademy",
        "Optimize XGBoost hyperparameters with second-order Taylor expansions"
    ),
    "stacking-blending": (
        "Stacking and Blending Ensembles in Python: Meta-Learner 2026 Guide | LearnMLAcademy",
        "Architect stacked generalization ensembles with cross-validated meta-models"
    ),

    # 6. Unsupervised Learning
    "kmeans": (
        "K-Means Clustering in Python: Elbow Method, Silhouette & Code Guide | LearnMLAcademy",
        "Cluster unlabelled data with K-Means, inertia curves, and centroid updates"
    ),
    "hierarchical": (
        "Hierarchical Clustering in Python: Dendrograms, Agglomerative & Code | LearnMLAcademy",
        "Build agglomerative hierarchical tree dendrograms and compute linkages"
    ),
    "hierarchical-clustering": (
        "Hierarchical Clustering in Python: Dendrograms & Linkage Criteria | LearnMLAcademy",
        "Build agglomerative hierarchical clusters and interpret tree dendrograms"
    ),
    "dbscan": (
        "DBSCAN Clustering in Python: Density, Epsilon, MinPts & Noise Guide | LearnMLAcademy",
        "Discover arbitrary-shaped density clusters and isolate outliers with DBSCAN"
    ),
    "pca": (
        "PCA Dimensionality Reduction in Python: Eigenvalues, Variance & Code | LearnMLAcademy",
        "Reduce high-dimensional feature spaces using Principal Component Analysis"
    ),
    "tsne": (
        "t-SNE Dimensionality Reduction in Python: Non-Linear Manifold Guide | LearnMLAcademy",
        "Visualize high-dimensional data clusters with non-linear t-SNE probability maps"
    ),
    "anomaly-detection": (
        "Anomaly Detection in Python: Isolation Forest & One-Class SVM Guide | LearnMLAcademy",
        "Detect abnormal outliers using Isolation Forests and Gaussian estimators"
    ),
    "association-rules": (
        "Association Rule Mining in Python: Support, Confidence & Lift Guide | LearnMLAcademy",
        "Mine associative purchase rules using support, confidence, and lift metrics"
    ),
    "apriori": (
        "Apriori Algorithm in Python: Frequent Itemsets & Market Basket Code | LearnMLAcademy",
        "Extract frequent itemsets and association rules with the Apriori algorithm"
    ),

    # 7. Model Evaluation & Optimization
    "train-test-split": (
        "Train-Test Split & Stratification in Python: Clean Validation Guide | LearnMLAcademy",
        "Partition datasets with stratified sampling to preserve label balances"
    ),
    "cross-validation": (
        "K-Fold Cross-Validation in Python: Stratified & TimeSeriesSplit Guide | LearnMLAcademy",
        "Evaluate generalization performance using K-Fold and stratified validation"
    ),
    "overfitting-underfitting": (
        "Overfitting vs Underfitting in Machine Learning: Diagnosis & Fixes | LearnMLAcademy",
        "Diagnose model variance and bias issues using empirical learning curves"
    ),
    "cost-functions": (
        "Machine Learning Cost Functions: Convexity, Optimization & Math Guide | LearnMLAcademy",
        "Compare convex optimization landscapes and loss functions in machine learning"
    ),
    "hyperparameter-tuning": (
        "Hyperparameter Tuning in Python: Bayesian, Optuna & Search Strategies | LearnMLAcademy",
        "Optimize machine learning hyperparameters using systematic tuning methods"
    ),
    "grid-random-search": (
        "Grid Search vs Random Search in Python: Scikit-Learn Tuning Guide | LearnMLAcademy",
        "Compare Grid Search exhaustive exploration against fast Random Search sweeps"
    ),
    "confusion-matrix": (
        "Confusion Matrix & Classification Metrics in Python: Precision, Recall | LearnMLAcademy",
        "Interpret confusion matrices, precision, recall, and harmonic F1-scores"
    ),
    "roc-auc": (
        "ROC-AUC Curve Explained in Python: TPR, FPR & Decision Thresholds | LearnMLAcademy",
        "Evaluate binary classifiers across all decision thresholds with ROC curves"
    ),

    # 8. Time Series & Forecasting
    "arima": (
        "ARIMA & SARIMA in Python: Autoregressive & Moving Average Time Series | LearnMLAcademy",
        "Model non-stationary time series using ARIMA differencing and lag parameters"
    ),
    "moving-average": (
        "Moving Averages in Python: SMA, EMA & Trend Smoothing Time Series | LearnMLAcademy",
        "Smooth noisy temporal signals using Simple and Exponential Moving Averages"
    ),
    "exponential-smoothing": (
        "Exponential Smoothing in Python: Holt-Winters Forecasting Guide | LearnMLAcademy",
        "Forecast trends and seasonal cycles using Holt-Winters exponential smoothing"
    ),
    "forecasting-basics": (
        "Time Series Forecasting Basics in Python: Stationarity & Lags Guide | LearnMLAcademy",
        "Understand time-series stationarity, autocorrelation, and lag features"
    ),

    # 9. Advanced Learning Paradigms
    "semi-supervised": (
        "Semi-Supervised Learning in Python: Pseudo-Labelling & Label Spread | LearnMLAcademy",
        "Leverage large unlabelled datasets with pseudo-labelling and label spreading"
    ),
    "online-learning": (
        "Online Incremental Learning in Python: River, SGD & Streaming Data | LearnMLAcademy",
        "Stream machine learning updates continuously using incremental SGD algorithms"
    ),
    "reinforcement-learning-adv": (
        "Deep Reinforcement Learning in Python: DQN, Policy Gradients & PPO | LearnMLAcademy",
        "Implement Deep Q-Networks and policy gradient algorithms for game agents"
    ),
    "multi-armed-bandits": (
        "Multi-Armed Bandits in Python: Epsilon-Greedy, UCB & Thompson Sampling | LearnMLAcademy",
        "Solve exploration-exploitation trade-offs with Upper Confidence Bound algorithms"
    ),

    # 10. Deep Learning
    "deep-learning-intro": (
        "Deep Learning Basics in Python: Neural Network Architectures Guide | LearnMLAcademy",
        "Understand deep neural network fundamentals, layers, and representations"
    ),
    "neural-networks": (
        "How Neural Networks Learn: Forward Pass, Loss & Weights in Python | LearnMLAcademy",
        "Follow how artificial neurons compute activations and update synaptic weights"
    ),
    "math-foundations-deep-learning": (
        "Math Foundations for Deep Learning: Linear Algebra, Calculus & Code | LearnMLAcademy",
        "Master the linear algebra and multivariate calculus powering neural networks"
    ),
    "activation-functions": (
        "Activation Functions in Neural Networks: ReLU, Sigmoid, GeLU in Python | LearnMLAcademy",
        "Compare non-linear activation functions including ReLU, LeakyReLU, and GeLU"
    ),
    "tensors-frameworks-gpus": (
        "PyTorch Tensors, CUDA & GPU Acceleration Tutorial: Python Guide | LearnMLAcademy",
        "Manage multidimensional tensors and accelerate training on CUDA GPU hardware"
    ),
    "loss-functions-deep-learning": (
        "Deep Learning Loss Functions: Cross-Entropy, MSE & Focal Loss Guide | LearnMLAcademy",
        "Select optimal loss functions for deep regression, classification, and ranking"
    ),
    "backpropagation": (
        "Backpropagation from Scratch in Python: Chain Rule Math & Autograd | LearnMLAcademy",
        "Derive backpropagation step by step using the calculus chain rule in Python"
    ),
    "neural-network-training-loop": (
        "PyTorch Neural Network Training Loop: Epochs, Batches & Debugging | LearnMLAcademy",
        "Construct robust PyTorch training loops with validation and gradient tracking"
    ),
    "deep-learning-optimizers": (
        "Deep Learning Optimizers: Adam, AdamW, RMSprop & Schedulers in Python | LearnMLAcademy",
        "Compare adaptive optimizers including AdamW, momentum, and cosine schedulers"
    ),
    "weight-initialization": (
        "Weight Initialization & Batch Normalization: Xavier, He & PyTorch | LearnMLAcademy",
        "Prevent vanishing gradients with He initialization and Layer Normalization"
    ),
    "deep-learning-regularization": (
        "Deep Learning Regularization: Dropout, Weight Decay & Early Stopping | LearnMLAcademy",
        "Prevent deep neural network overfitting with dropout and weight decay penalties"
    ),
    "data-augmentation-deep-learning": (
        "Data Augmentation in PyTorch: Torchvision Image Transforms & Code | LearnMLAcademy",
        "Expand computer vision training datasets with affine transforms and color jitter"
    ),
    "cnn": (
        "Convolutional Neural Networks (CNNs) in PyTorch: Kernels, Pooling & Code | LearnMLAcademy",
        "Master convolutional kernels, feature maps, and pooling layers for vision"
    ),
    "cnn-architectures-resnet": (
        "Modern CNN Architectures: AlexNet, VGG & ResNet Residuals in PyTorch | LearnMLAcademy",
        "Understand deep residual connections and skip connections in ResNet networks"
    ),
    "object-detection": (
        "Object Detection & Segmentation: YOLO, Mask R-CNN & Grad-CAM in Python | LearnMLAcademy",
        "Detect bounding boxes and explain convolutional feature maps with Grad-CAM"
    ),
    "vision-transformers": (
        "Vision Transformers (ViT) in PyTorch: Patch Embeddings & Self-Attention | LearnMLAcademy",
        "Process image patches with Transformer self-attention using Vision Transformers"
    ),
    "rnn-lstm": (
        "RNNs, LSTMs and GRUs in PyTorch: Sequential Hidden States & Gates | LearnMLAcademy",
        "Capture long-term temporal dependencies with LSTM and GRU gating mechanisms"
    ),
    "attention-transformers-deep-learning": (
        "Seq2Seq Models & Attention Mechanisms in PyTorch: Deep Learning Guide | LearnMLAcademy",
        "Understand encoder-decoder sequence modeling and Bahdanau attention alignments"
    ),
    "transformers-deep-learning": (
        "Transformers for Deep Learning: Positional Encodings & Attention Math | LearnMLAcademy",
        "Construct Transformer encoder and decoder stacks with positional encodings"
    ),
    "autoencoders": (
        "Autoencoders in PyTorch: Latent Bottlenecks, Reconstruction & Code | LearnMLAcademy",
        "Compress high-dimensional data into bottleneck latent spaces with autoencoders"
    ),
    "transfer-learning": (
        "Transfer Learning & Model Fine-Tuning in PyTorch: Pretrained Weights | LearnMLAcademy",
        "Adapt pretrained deep vision and language models to downstream tasks with LoRA"
    ),
    "self-supervised-few-shot-learning": (
        "Self-Supervised & Few-Shot Learning in Python: Contrastive SimCLR Guide | LearnMLAcademy",
        "Train representations without labels using contrastive learning and few shots"
    ),
    "graph-neural-networks": (
        "Graph Neural Networks (GNNs) in Python: Message Passing & PyTorch Geometric | LearnMLAcademy",
        "Process relational graph structures with message passing and node embeddings"
    ),
    "saving-deploying-deep-models": (
        "Saving & Deploying Deep Learning Models: ONNX, TorchScript & FastAPI | LearnMLAcademy",
        "Export PyTorch weights to ONNX runtimes and serve low-latency microservices"
    ),

    # Advanced Deep Learning Topics
    "state-space-models": (
        "State-Space Models (SSMs) & Mamba Architecture in Python: 2026 Guide | LearnMLAcademy",
        "Understand linear State-Space Models (SSMs) and selective Mamba scan layers"
    ),
    "deep-learning-nlp": (
        "Deep Learning for NLP: Word2Vec, GloVe, FastText & Tokenizers in Python | LearnMLAcademy",
        "Process natural language text using Word2Vec embeddings and subword tokenizers"
    ),
    "pinn-kan-topological-networks": (
        "Physics-Informed Neural Networks (PINNs) & KANs in Python: 2026 Guide | LearnMLAcademy",
        "Solve differential equations with PINNs and learnable Kolmogorov-Arnold spline nets"
    ),

    # 11. Generative AI
    "generative-ai-intro": (
        "What is Generative AI? Architecture, Models & Python 2026 Guide | LearnMLAcademy",
        "Discover how Generative AI models synthesize novel text, images, and audio"
    ),
    "generative-vs-discriminative": (
        "Generative vs Discriminative Models in Python: Math, Examples & Guide | LearnMLAcademy",
        "Compare generative versus discriminative models with joint and conditional math"
    ),
    "how-generative-models-learn": (
        "How Generative Models Learn Data Distributions: 2026 Guide | LearnMLAcademy",
        "Understand how generative models estimate and sample high-dimensional data distributions"
    ),
    "vae": (
        "Variational Autoencoders (VAEs) in Python: Math, Architecture & Code | LearnMLAcademy",
        "Implement Variational Autoencoders (VAEs) using the reparameterization trick"
    ),
    "gans": (
        "Generative Adversarial Networks (GANs) in Python: Architecture & Code | LearnMLAcademy",
        "Train Generative Adversarial Networks (GANs) using minimax loss and DCGAN code"
    ),
    "diffusion-models": (
        "Diffusion Models from Scratch in Python: Math, Noise Schedules & Code | LearnMLAcademy",
        "Derive diffusion models from scratch using forward noise and reverse denoising"
    ),
    "stable-latent-diffusion": (
        "Stable Diffusion & Latent Architecture in Python: UNet & VAE Guide | LearnMLAcademy",
        "Explore Latent Stable Diffusion architectures with UNet denoisers and VAE latent spaces"
    ),
    "controlling-diffusion-models": (
        "ControlNet & Guided Diffusion in Python: Architecture & 2026 Guide | LearnMLAcademy",
        "Control image generation with ControlNet, edge maps, and classifier-free guidance"
    ),
    "finetuning-image-models": (
        "Fine-Tuning Diffusion Models: LoRA & DreamBooth in Python Guide | LearnMLAcademy",
        "Fine-tune image diffusion models using LoRA weights and DreamBooth personalization"
    ),
    "multimodal-ai": (
        "Multimodal Generative AI in Python: CLIP, Vision-Language & Code | LearnMLAcademy",
        "Connect text and visual modalities using CLIP contrastive embeddings and vision encoders"
    ),
    "audio-music-video-generation": (
        "AI Audio, Speech & Video Generation: Architecture & Python Guide | LearnMLAcademy",
        "Synthesize realistic audio, speech, music, and video using modern diffusion"
    ),
    "synthetic-data": (
        "Synthetic Data Generation in Python: CTGAN, Privacy & 2026 Guide | LearnMLAcademy",
        "Generate privacy-preserving synthetic tabular and text datasets using CTGAN"
    ),
    "evaluating-generative-models": (
        "Evaluating Generative AI: FID, IS, BLEU, ROUGE & Perplexity Guide | LearnMLAcademy",
        "Evaluate generative image and text models using FID scores and perplexity"
    ),
    "responsible-generative-ai": (
        "Responsible Generative AI: Safety, Bias & Watermarking 2026 Guide | LearnMLAcademy",
        "Implement responsible AI governance, synthetic watermarking, and bias detection"
    ),
    "choosing-generative-model": (
        "Choosing Generative Models: VAEs vs GANs vs Diffusion 2026 Guide | LearnMLAcademy",
        "Select the optimal generative model architecture based on latency and fidelity"
    ),
    "building-genai-apps": (
        "Building GenAI Applications in Python: Architecture, APIs & Code | LearnMLAcademy",
        "Build production Generative AI applications with streaming APIs and caching"
    ),
    "genai-deployment": (
        "Deploying Generative AI Applications: vLLM, Streaming & 2026 Guide | LearnMLAcademy",
        "Deploy generative models to production with auto-scaling and low-latency endpoints"
    ),

    # 12. Large Language Models & RAG
    "rag": (
        "Retrieval-Augmented Generation (RAG) in Python: Architecture, Embeddings & Code | LearnMLAcademy",
        "Build Retrieval-Augmented Generation (RAG) systems with vector search"
    ),
    "llm-intro": (
        "What Are Large Language Models? Architecture, Scaling & 2026 Guide | LearnMLAcademy",
        "Understand modern Large Language Model architectures, scaling laws, and pretraining"
    ),
    "tokenization-embeddings": (
        "LLM Tokenization & Embeddings in Python: BPE, RoPE & Context Guide | LearnMLAcademy",
        "Master Byte-Pair Encoding (BPE) tokenization, rotary embeddings, and context"
    ),
    "transformers-attention": (
        "Transformer Architecture & Self-Attention in Python: Math & Code | LearnMLAcademy",
        "Understand Transformer multi-head self-attention mechanics and QKV math"
    ),
    "text-generation-decoding": (
        "LLM Text Generation & Decoding in Python: Beam Search & Top-P Guide | LearnMLAcademy",
        "Control LLM text generation using temperature, top-k, top-p, and beam search"
    ),
    "prompt-engineering": (
        "Prompt Engineering & Structured Outputs in Python: 2026 Guide | LearnMLAcademy",
        "Design production prompts with few-shot examples and Pydantic structured schemas"
    ),
    "pretraining-finetuning": (
        "How LLMs Are Trained: Pretraining, Compute Scaling & 2026 Guide | LearnMLAcademy",
        "Explore how modern foundation LLMs are pretrained at scale on massive compute"
    ),
    "instruction-tuning-rlhf": (
        "Fine-Tuning LLMs with LoRA, SFT & RLHF in Python: 2026 Guide | LearnMLAcademy",
        "Fine-tune LLMs efficiently using Supervised Fine-Tuning (SFT) and LoRA adapters"
    ),
    "semantic-search-embeddings": (
        "Semantic Search with Neural Embeddings in Python: 2026 Guide | LearnMLAcademy",
        "Build semantic search engines using dense neural embeddings and cosine similarity"
    ),
    "vector-databases": (
        "Vector Databases for LLMs: Pinecone, Qdrant & Milvus 2026 Guide | LearnMLAcademy",
        "Select and query vector databases using HNSW indexing and metadata filtering"
    ),
    "advanced-rag": (
        "Advanced RAG in Python: Chunking, Reranking & Hybrid Search Guide | LearnMLAcademy",
        "Optimize RAG pipelines with semantic chunking, cross-encoder rerankers, and hybrid search"
    ),
    "llm-evaluation": (
        "Evaluating LLMs: Benchmarks, MMLU & RAG Triad in Python Guide | LearnMLAcademy",
        "Evaluate LLM output accuracy using MMLU benchmarks, RAG Triad, and automated judges"
    ),
    "llm-hallucinations-safety": (
        "LLM Hallucinations & Guardrails: NeMo, Llama-Guard & 2026 Guide | LearnMLAcademy",
        "Detect and eliminate LLM hallucinations using NeMo Guardrails and safety filters"
    ),
    "reasoning-models": (
        "Reasoning Models & Test-Time Compute: Chain-of-Thought 2026 Guide | LearnMLAcademy",
        "Understand reasoning models, chain-of-thought prompting, and test-time compute"
    ),
    "efficient-llm-serving": (
        "Efficient LLM Serving: vLLM, PagedAttention & Quantization Guide | LearnMLAcademy",
        "Serve LLMs at scale with vLLM PagedAttention, KV cache reuse, and quantization"
    ),
    "llmops": (
        "LLMOps in Production: Evaluation, Tracing, Cost & 2026 Guide | LearnMLAcademy",
        "Deploy and monitor enterprise LLM applications with tracing and latency budgets"
    ),

    # 13. Agentic AI
    "agentic-ai-intro": (
        "What Is Agentic AI? Autonomous Agents vs Workflows: 2026 Guide | LearnMLAcademy",
        "Learn autonomous AI agent architectures, deterministic workflows, and state graphs"
    ),
    "tool-calling": (
        "AI Agent Tool Calling in Python: Schema Validation, Idempotency & Retries | LearnMLAcademy",
        "Master AI agent tool calling, schema validation, and safe error retries"
    ),
    "building-ai-agent": (
        "Build an Autonomous AI Agent from Scratch in Python: Step-by-Step | LearnMLAcademy",
        "Build an autonomous AI agent from scratch with step-by-step reasoning"
    ),
    "planning-reflection": (
        "Agent Planning, ReAct & Reflection in Python: Architecture & Code | LearnMLAcademy",
        "Implement AI agent planning loops, ReAct reasoning, and self-reflection"
    ),
    "agent-context-engineering": (
        "Context Engineering for AI Agents: Budgets & Compaction 2026 Guide | LearnMLAcademy",
        "Optimize AI agent context windows with token budgets and smart compaction"
    ),
    "agent-memory": (
        "AI Agent Memory Systems: Short-Term, Long-Term & Vector Memory Guide | LearnMLAcademy",
        "Design AI agent memory using short-term state and long-term vector storage"
    ),
    "agent-state-graphs": (
        "Agent State Graphs & Workflows in Python: LangGraph 2026 Guide | LearnMLAcademy",
        "Build reliable agent workflows, cyclical state graphs, and checkpoints"
    ),
    "durable-long-running-agents": (
        "Durable & Long-Running AI Agents: Human-in-the-Loop & 2026 Guide | LearnMLAcademy",
        "Implement durable long-running AI agents with human-in-the-loop checkpoints"
    ),
    "agentic-rag": (
        "Agentic RAG in Python: Router, Multi-Hop Search & Self-Correction | LearnMLAcademy",
        "Build agentic RAG systems with intelligent routing and self-correcting retrieval"
    ),
    "multi-agent-systems": (
        "Multi-Agent Systems in Python: Handoffs, Consensus & 2026 Guide | LearnMLAcademy",
        "Architect multi-agent systems with role delegation, handoffs, and consensus"
    ),
    "model-context-protocol": (
        "Model Context Protocol (MCP) Tutorial: AI Agent Interoperability & Python Example | LearnMLAcademy",
        "Implement Model Context Protocol (MCP) clients and servers for AI tools"
    ),
    "agent-frameworks": (
        "AI Agent Frameworks Compared: LangGraph vs CrewAI vs AutoGen Guide | LearnMLAcademy",
        "Compare top AI agent frameworks including LangGraph, CrewAI, and AutoGen"
    ),
    "browser-computer-use-agents": (
        "Browser & Computer-Use AI Agents in Python: Sandboxing 2026 Guide | LearnMLAcademy",
        "Build browser automation and computer-use AI agents with safe sandboxing"
    ),
    "agent-security": (
        "AI Agent Security: Prompt Injection, Guardrails & 2026 Guide | LearnMLAcademy",
        "Secure AI agents against prompt injection, privilege escalation, and loops"
    ),
    "agent-evaluation-safety": (
        "Evaluating AI Agents: Trajectory Benchmarks & Safety 2026 Guide | LearnMLAcademy",
        "Evaluate AI agent performance with trajectory benchmarks and safety metrics"
    ),
    "agent-observability-deployment": (
        "AI Agent Observability: Tracing, Latency, Cost & Deployment Guide | LearnMLAcademy",
        "Monitor production AI agents with distributed tracing, latency, and cost alerts"
    ),

    # 14. Projects
    "project-customer-churn": (
        "Customer Churn Prediction Project: Machine Learning Pipeline in Python | LearnMLAcademy",
        "Build an end-to-end customer churn prediction pipeline with scikit-learn"
    ),
    "project-credit-risk": (
        "Credit Risk Prediction Project: Explainable Machine Learning & SHAP | LearnMLAcademy",
        "Predict loan defaults with gradient boosted trees and explainable SHAP values"
    ),
    "project-sales-forecasting": (
        "Sales Forecasting Project in Python: Time-Series Regression & Streamlit | LearnMLAcademy",
        "Forecast multi-store retail sales using lag features and chronological splits"
    ),
    "project-image-classification": (
        "Image Classification Project in PyTorch: ResNet Transfer Learning | LearnMLAcademy",
        "Train an image classifier from scratch using transfer learning with ResNet"
    ),
    "project-genai-app": (
        "Build a Generative AI Application in Python: LLM APIs & Streamlit | LearnMLAcademy",
        "Develop an interactive Generative AI application with streaming responses"
    ),
    "project-rag-document-qa": (
        "Build a Document Q&A System with RAG: Vector Search in Python Project | LearnMLAcademy",
        "Construct an enterprise PDF question-answering system using RAG retrieval"
    ),
    "project-ai-agent": (
        "Build an AI Agent with Tools & Memory: End-to-End Python Project | LearnMLAcademy",
        "Implement a fully autonomous AI agent with tool execution and memory state"
    ),
    "project-multi-agent-research": (
        "Build a Multi-Agent Research Assistant in Python: Full System Project | LearnMLAcademy",
        "Coordinate multi-agent workflows for automated web research and fact synthesis"
    ),

    # 15. AI Engineering & MLOps
    "ai-engineering-mlops": (
        "AI Engineering & MLOps in Production: Notebook to FastAPI Guide | LearnMLAcademy",
        "Transition machine learning models from prototype notebooks to production APIs"
    ),
    "ml-data-feature-pipelines": (
        "Production ML Data & Feature Pipelines in Python: 2026 Guide | LearnMLAcademy",
        "Build scalable ML data and feature pipelines with automated schema validation"
    ),
    "experiment-tracking-model-registry": (
        "MLflow Experiment Tracking & Model Registry in Python Guide | LearnMLAcademy",
        "Track machine learning experiments and manage model versions using MLflow"
    ),
    "batch-online-inference": (
        "Batch vs Online vs Streaming ML Inference: Architecture & Code | LearnMLAcademy",
        "Design batch, real-time online, and event streaming inference architectures"
    ),
    "ml-cicd-continuous-training": (
        "CI/CD for Machine Learning & Continuous Training (CT) 2026 Guide | LearnMLAcademy",
        "Implement automated CI/CD pipelines, integration testing, and continuous retraining"
    ),
    "ml-monitoring-drift": (
        "ML Monitoring & Data Drift Detection in Python: Evidently Guide | LearnMLAcademy",
        "Detect data drift, concept drift, and performance decay using Evidently metrics"
    ),
    "production-ai-reliability": (
        "Production AI Reliability, Cost Budgets & Security 2026 Guide | LearnMLAcademy",
        "Ensure production AI system reliability, cost optimization, and API security"
    ),
    "ml-system-design": (
        "End-to-End ML/AI System Design: Production Architecture Guide | LearnMLAcademy",
        "Master end-to-end ML system design interviews with scalable architectures"
    ),

    # 16. Career & Interview Preparation
    "ai-data-career-paths": (
        "AI & Data Career Paths: ML Engineer vs Data Scientist 2026 Guide | LearnMLAcademy",
        "Navigate high-growth AI and data science career paths, salaries, and skills"
    ),
    "ml-engineer-roadmap": (
        "Machine Learning Engineer Roadmap 2026: Skills, Math & Projects | LearnMLAcademy",
        "Follow the comprehensive 2026 Machine Learning Engineer study and skills roadmap"
    ),
    "ai-engineer-roadmap": (
        "AI Engineer Roadmap 2026: LLMs, RAG, Agents & Production Tools | LearnMLAcademy",
        "Master the 2026 AI Engineer curriculum covering LLMs, RAG, and agent frameworks"
    ),
    "genai-llm-engineer-roadmap": (
        "Generative AI & LLM Engineer Roadmap 2026: Complete Guide | LearnMLAcademy",
        "Accelerate your career with the Generative AI and LLM Engineer roadmap"
    ),
    "data-scientist-roadmap": (
        "Data Scientist Career Roadmap 2026: Statistics, Python & ML | LearnMLAcademy",
        "Explore the modern Data Scientist roadmap covering statistics, SQL, and modeling"
    ),
    "interview-preparation-strategy": (
        "How to Prepare for AI & ML Technical Interviews: 2026 Guide | LearnMLAcademy",
        "Prepare effectively for technical AI and machine learning interviews at top tech"
    ),
    "ml-interview-questions": (
        "Top 100 Machine Learning Interview Questions & Detailed Answers | LearnMLAcademy",
        "Ace machine learning interviews with top 100 solved theory and math questions"
    ),
    "deep-learning-interview-questions": (
        "Top Deep Learning Interview Questions & Solved Answers: 2026 Guide | LearnMLAcademy",
        "Master essential Deep Learning interview questions on CNNs, RNNs, and Transformers"
    ),
    "genai-llm-rag-interview": (
        "Generative AI, LLM & RAG Interview Questions: Solved 2026 Guide | LearnMLAcademy",
        "Prepare for Generative AI, LLM, and RAG interview rounds with solved questions"
    ),
    "agentic-ai-interview": (
        "Top Agentic AI Interview Questions & Architectures: 2026 Guide | LearnMLAcademy",
        "Prepare for Agentic AI interviews covering tool design, memory, and multi-agent coordination"
    ),
    "python-ai-ml-interview": (
        "Python Coding for Machine Learning Interviews: Solved Problems | LearnMLAcademy",
        "Practice essential Python coding problems asked in machine learning interviews"
    ),
    "sql-ai-data-interview": (
        "SQL Coding for Data & AI Interviews: Window Functions & Queries | LearnMLAcademy",
        "Solve practical SQL interview questions using window functions and aggregations"
    ),
    "ml-ai-system-design-interview": (
        "Machine Learning System Design Interview: Framework & Solved Cases | LearnMLAcademy",
        "Design scalable ML systems during interviews using proven structural frameworks"
    ),
    "mlops-production-interview": (
        "MLOps & Production AI Interview Questions: Debugging Scenarios | LearnMLAcademy",
        "Prepare for MLOps technical interviews with real-world debugging scenarios"
    ),
    "behavioral-project-interview": (
        "AI/ML Behavioral & Project Deep-Dive Interview: STAR Framework Guide | LearnMLAcademy",
        "Master behavioral and project deep-dive interviews using the STAR method"
    ),
}

# Verify every topic in topics-list.json is present in curated_data
missing = []
for item in topics:
    tid = item["id"]
    if tid not in curated_data:
        missing.append(tid)

if missing:
    print(f"Missing topics: {missing}")
    exit(1)

# Generate final dictionary with strictly verified constraints
final_seo = {}
for item in topics:
    tid = item["id"]
    seo_title, prefix = curated_data[tid]
    
    # Target prefix length between 61 and 81 characters
    desc = prefix + suffix
    while len(desc) < 140:
        prefix = prefix + " step by step"
        desc = prefix + suffix
    if len(desc) > 160:
        max_prefix_len = 160 - suffix_len
        words = prefix.split()
        trimmed = []
        for w in words:
            if len(" ".join(trimmed + [w])) <= max_prefix_len:
                trimmed.append(w)
            else:
                break
        prefix = " ".join(trimmed)
        desc = prefix + suffix

    assert 140 <= len(desc) <= 160, f"Length {len(desc)} error on {tid}: '{desc}'"
    assert "Python code, architecture diagrams, worked examples, and interview quiz" in desc
    assert len(seo_title) > 0

    final_seo[tid] = {
        "title": seo_title,
        "description": desc
    }

print(f"Verified all {len(final_seo)} topics successfully! Lengths and content 100% compliant.")

with open("scripts/upgraded-seo-data.json", "w") as f:
    json.dump(final_seo, f, indent=2)
