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
      title: "Unsupervised Learning | Clustering & Dimensionality Reduction",
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
      title: "Regression in Machine Learning | Continuous Value Prediction",
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
      title: "Random Forest Explained | Bagging & Ensemble Learning",
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
      title: "Cost & Loss Functions in ML | MSE, MAE & Cross-Entropy",
      description: "Understand MSE, MAE, Log Loss, and Cross-Entropy cost functions in Machine Learning. Learn which loss function to use for regression vs classification in Python."
    },
    "hyperparameter-tuning": {
      title: "Hyperparameter Tuning | Grid Search & Optuna Guide",
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
      title: "Advanced Reinforcement Learning | Q-Learning & DQN",
      description: "Advanced RL: Markov Decision Processes, Q-Learning, and Deep Q-Networks (DQN) explained with Python and OpenAI Gym implementation examples."
    },
    "multi-armed-bandits": {
      title: "Multi-Armed Bandits | Epsilon-Greedy & UCB Algorithms in Python",
      description: "Understand the Multi-Armed Bandit problem and Exploration vs Exploitation. Learn Epsilon-Greedy, UCB, and Thompson Sampling with Python code and results."
    },

    // 10. Deep Learning & Interviews
    "neural-networks": {
      title: "Neural Networks Explained Simply | Deep Learning Basics",
      description: "Learn neural networks from scratch with a simple real-life example, original labelled diagrams, plain-English terms, step-by-step calculations, and beginner Python code."
    },
    "activation-functions": {
      title: "Activation Functions Explained | ReLU, Sigmoid, Tanh & Softmax",
      description: "Learn activation functions with simple examples, original graphs, comparisons, Python code, and a practical guide to choosing ReLU, sigmoid, tanh, softmax, and more."
    },
    "deep-learning-intro": {
      title: "Deep Learning Basics and Model Types | Beginner Tutorial",
      description: "Understand how deep learning works and when to use neural networks, CNNs, RNNs, Transformers and generative models through diagrams, comparisons and code."
    },
    "math-foundations-deep-learning": {
      title: "Essential Math for Neural Networks | Visual Beginner Guide",
      description: "Understand scalars, vectors, matrices, tensor shapes, dot products, derivatives, gradients and the chain rule through neural-network examples."
    },
    "tensors-frameworks-gpus": {
      title: "Tensors, PyTorch, TensorFlow and GPUs | Beginner Guide",
      description: "Learn tensor dimensions, shapes, dtypes, reshape, broadcasting, matrix multiplication, framework roles and GPU acceleration with visual examples."
    },
    "loss-functions-deep-learning": {
      title: "Loss Functions: MSE, MAE and Cross-Entropy Explained",
      description: "Learn how neural networks measure error with MSE, MAE, Huber and cross-entropy using formulas, worked examples, graphs and choice guidance."
    },
    "backpropagation": {
      title: "Backpropagation and Automatic Differentiation Explained",
      description: "Follow one neural-network mistake forward and backward, calculate gradients with the chain rule, update a weight and verify the result with PyTorch."
    },
    "attention-transformers-deep-learning": {
      title: "Sequence-to-Sequence Models and Attention | Beginner Tutorial",
      description: "Learn how an encoder and decoder transform one sequence into another, why one fixed context becomes a bottleneck, and how attention creates a relevant context for each output step."
    },
    "transformers-deep-learning": {
      title: "Transformers for Deep Learning | Architecture Tutorial",
      description: "Learn self-attention, Q, K and V, multi-head attention, positional information, residual paths, normalization and encoder-decoder architecture."
    },
    "transfer-learning": {
      title: "Transfer Learning and Fine-Tuning | Beginner Tutorial",
      description: "Learn how to reuse pretrained backbones, replace task-specific heads, freeze layers, and fine-tune in stages with smaller learning rates for reusable features."
    },
    "self-supervised-few-shot-learning": {
      title: "Self-Supervised and Few-Shot Learning Explained",
      description: "Understand how pretraining learns representations from unlabelled data and how few-shot methods adapt to new tasks with very few labels."
    },
    "state-space-models": {
      title: "State-Space Models for Deep Learning | Advanced Topic",
      description: "Explore recurrent state equations, structured state-space models and selective sequence updates outside the core Deep Learning learning path."
    },
    "generative-ai-intro": {
      title: "What Is Generative AI? | Beginner Introduction",
      description: "Learn what Generative AI creates, how it differs from retrieval and prediction, and where generated text, images, audio, video, and code are used."
    },
    "generative-vs-discriminative": {
      title: "Generative vs Discriminative Models",
      description: "Compare predictive mappings such as p(y|x) with generative data modelling, then calculate p(x), p(x,y), p(x|y), and p(y|x) from a small example."
    },
    "how-generative-models-learn": {
      title: "How Generative Models Learn and Generate New Data",
      description: "Understand data distributions, latent representations, randomness, sampling, conditioning, and the difference between training and generation through original beginner examples."
    },
    vae: {
      title: "Variational Autoencoders for Generation | VAE Tutorial",
      description: "Learn how VAEs extend autoencoders with probabilistic latent representations, sampling, reconstruction, and KL regularization to generate new data."
    },
    gans: {
      title: "Generative Adversarial Networks (GANs)",
      description: "Learn how generator and discriminator updates alternate, how GAN losses are calculated, why fake samples are detached, and how common training failures appear."
    },
    "diffusion-models": {
      title: "Diffusion Models | Forward Noising and Reverse Denoising",
      description: "Follow the forward noise schedule, calculate a noisy sample, understand noise-prediction training, and trace iterative generation from random noise."
    },
    "stable-latent-diffusion": {
      title: "Latent Diffusion and Stable Diffusion Architecture",
      description: "Learn how text encoding, latent representations, U-Net denoising, schedulers, and VAE decoding work together in Stable Diffusion."
    },
    "controlling-diffusion-models": {
      title: "Controlling Diffusion Models | CFG, Inpainting and ControlNet",
      description: "Learn how guidance, seeds, schedulers, image-to-image strength, inpainting masks, and ControlNet-style conditions steer diffusion inference."
    },
    "finetuning-image-models": {
      title: "Fine-Tuning Image Models | Textual Inversion, DreamBooth and LoRA",
      description: "Compare Textual Inversion, DreamBooth, and LoRA, calculate low-rank parameter counts, and plan data, training, and held-out validation for image-model adaptation."
    },
    "multimodal-ai": {
      title: "Multimodal Generative AI | Text, Image and Audio",
      description: "Learn how modality encoders, alignment, cross-modal interaction, and output decoders connect text, images, and audio for understanding and generation."
    },
    "audio-music-video-generation": {
      title: "Audio, Speech, Music and Video Generation",
      description: "Explore how generative models represent, condition, create, and evaluate speech, sound, music, and temporally consistent video."
    },
    "synthetic-data": {
      title: "Synthetic Data Generation | Methods, Utility and Privacy",
      description: "Learn how rules, simulation, statistical models, and generative models create synthetic data, and how fidelity, coverage, utility, privacy, and real-world testing differ."
    },
    "evaluating-generative-models": {
      title: "Evaluating Generative Models | Metrics, Human Review and Trade-offs",
      description: "Learn how to evaluate generative models across quality, diversity, adherence, factuality, safety, latency, and cost using fixed test sets, FID, KID, alignment metrics, and human review."
    },
    "responsible-generative-ai": {
      title: "Responsible Generative AI | Risks, Controls and Monitoring",
      description: "Learn how to engineer responsible Generative AI systems with intended-use boundaries, data and privacy controls, red teaming, human review, monitoring, and incident response."
    },
    "choosing-generative-model": {
      title: "Choosing the Right Generative AI Model | Practical Decision Guide",
      description: "Choose a generative model by user job, modality, hard constraints, measured quality, latency, cost, privacy, licensing, safety, deployment, and evaluation evidence."
    },
    "building-genai-apps": {
      title: "Building Generative AI Applications | Validation and Workflow Design",
      description: "Build reliable Generative AI applications with narrow goals, structured outputs, schema and evidence validation, deterministic rules, fallbacks, human review, and evaluation harnesses."
    },
    "genai-deployment": {
      title: "Deploying Generative AI Applications | APIs, Serving and Reliability",
      description: "Learn hosted API versus self-hosted model trade-offs, secret management, timeouts, retries, scaling, observability, canary rollouts, fallbacks, and production deployment."
    },
    "text-generation-decoding": {
      title: "Greedy, Temperature, Top-k and Top-p Decoding",
      description: "Learn how language models turn token probabilities into text using greedy decoding, temperature, top-k, top-p, and repetition controls."
    },
    "hugging-face": {
      title: "Hugging Face Transformers and Model Inference",
      description: "Learn how to find, inspect, load, and run pretrained transformer models with the Hugging Face Hub, pipelines, tokenizers, and AutoModel classes."
    },
    "project-customer-churn": {
      title: "Customer Churn Prediction — End-to-End ML Project",
      description: "Build a leakage-safe churn classifier with preprocessing, Logistic Regression, a tree comparison, threshold selection, business-aware metrics and production monitoring."
    },
    "project-credit-risk": {
      title: "Credit Risk Prediction with Explainable ML",
      description: "Build an educational credit-risk workflow with class-imbalance metrics, threshold costs, individual explanations, fairness cautions and responsible production boundaries."
    },
    "project-sales-forecasting": {
      title: "Sales Forecasting — End-to-End Time-Series Project",
      description: "Build a chronological retail forecasting workflow with naive baselines, Holt-Winters, MAE, RMSE, residual analysis, leakage checks and monitoring."
    },
    "project-image-classification": {
      title: "Image Classification with Transfer Learning Project",
      description: "Adapt a pretrained ResNet to CIFAR-10 with augmentation, frozen and fine-tuned stages, learning curves, class errors, inference and a saved model contract."
    },
    "project-genai-app": {
      title: "Build a Generative AI Application End-to-End",
      description: "Build a provider-neutral GenAI application with structured output, deterministic validation, bounded retries, safety checks, evaluation and deployment controls."
    },
    "project-rag-document-qa": {
      title: "Build a Document Q&A System with RAG",
      description: "Build a local RAG pipeline from document extraction and chunking through vector retrieval, grounded answers, citations, evaluation and insufficient-evidence handling."
    },
    "project-ai-agent": {
      title: "Build an AI Agent with Tools & Memory",
      description: "Build a bounded local support agent with typed tools, short-term state, approved persistent memory, stop budgets, successful traces and safe abstention."
    },
    "project-multi-agent-research": {
      title: "Build a Multi-Agent Research Assistant",
      description: "Build a bounded coordinator–researcher–verifier–synthesizer workflow with typed handoffs, shared state, conflict handling and quality-versus-cost evaluation."
    },
    "ai-engineering-mlops": {
      title: "AI Engineering & MLOps: From Notebook to Production",
      description: "Learn how validated data, feature pipelines, experiment lineage, model registries, serving, monitoring, feedback and governance turn a notebook model into a reliable production AI system."
    },
    "ml-data-feature-pipelines": {
      title: "Production Data, Feature & ML Pipelines",
      description: "Build reliable batch and streaming data pipelines with schema contracts, point-in-time features, offline and online serving, orchestration, backfills and training-serving consistency."
    },
    "experiment-tracking-model-registry": {
      title: "Experiment Tracking, Reproducibility, Lineage & Model Registry",
      description: "Connect code, data, features, parameters, environments, artifacts and metrics, then govern candidate approval, production promotion and rollback through a model registry."
    },
    "batch-online-inference": {
      title: "Batch, Online & Streaming Inference Architectures",
      description: "Compare batch, synchronous online and streaming prediction systems through latency, throughput, freshness, queueing, scaling, failure recovery and a worked capacity example."
    },
    "ml-cicd-continuous-training": {
      title: "Testing, CI/CD & Continuous Training for ML",
      description: "Test code, data, features, models and integrations, then separate continuous integration, controlled delivery and evidence-driven continuous training."
    },
    "ml-monitoring-drift": {
      title: "ML Monitoring, Data Drift & Model Decay",
      description: "Monitor service, data, predictions and delayed outcomes; distinguish covariate, label and concept drift; calculate PSI and decide when retraining is justified."
    },
    "production-ai-reliability": {
      title: "Production AI Reliability, Security, Cost & Governance",
      description: "Design production AI for availability, bounded failure, SLOs, least privilege, artifact integrity, cost per prediction, auditability, incident response and rollback."
    },
    "ml-system-design": {
      title: "End-to-End ML/AI System Design",
      description: "Design a real-time fraud detection system from validated events and online features through safe decisions, monitoring, delayed labels, retraining, canary release and rollback."
    },
    "ai-data-career-paths": {
      title: "AI & Data Career Paths | Choose the Right Role",
      description: "Compare Machine Learning Engineer, AI Engineer, Generative AI/LLM Engineer and Data Scientist roles by daily work, skills, ownership and portfolio evidence."
    },
    "ml-engineer-roadmap": {
      title: "Machine Learning Engineer Roadmap | Skills & Projects",
      description: "Follow a practical Machine Learning Engineer path through Python, SQL, ML evaluation, pipelines, serving, MLOps, system design, projects and interviews."
    },
    "ai-engineer-roadmap": {
      title: "AI Engineer Roadmap | Skills, Projects & Learning Path",
      description: "Learn the software, ML, transformer, RAG, tool-calling, agent, evaluation, security and production skills used to build modern AI applications."
    },
    "genai-llm-engineer-roadmap": {
      title: "Generative AI & LLM Engineer Roadmap | RAG to LLMOps",
      description: "Build a staged LLM engineering path covering transformers, tokenization, prompting, retrieval, RAG, evaluation, LoRA, serving, LLMOps and agents."
    },
    "data-scientist-roadmap": {
      title: "Data Scientist Roadmap | Statistics, SQL, ML & Projects",
      description: "Follow a realistic Data Scientist learning path through Python, SQL, statistics, EDA, experiments, ML, forecasting, communication, projects and interviews."
    },
    "interview-preparation-strategy": {
      title: "How AI & ML Interviews Work | Preparation Strategy",
      description: "Understand modern AI/ML interview rounds, translate job descriptions into a preparation matrix, practice concise answers and use flexible study-planning frameworks."
    },
    "ml-interview-questions": {
      title: "Machine Learning Interview Questions | ML, Statistics & Evaluation",
      description: "Prepare high-value ML interview answers covering statistics, leakage, bias and variance, algorithms, model evaluation, numerical metrics and production diagnosis."
    },
    "deep-learning-interview-questions": {
      title: "Deep Learning Interview Questions | Training & Architectures",
      description: "Practice deep-learning interview reasoning with forward and backward passes, gradients, activations, optimizers, convolution shapes, Transformers and debugging."
    },
    "genai-llm-rag-interview": {
      title: "Generative AI, LLM & RAG Interview Questions",
      description: "Prepare for LLM and RAG interviews with substantial questions on tokens, decoding, prompting, retrieval, citations, evaluation, safety, latency and cost."
    },
    "agentic-ai-interview": {
      title: "Agentic AI Interview Questions | Tools, State & Safety",
      description: "Practice agentic AI interview scenarios covering workflows, tool authorization, memory, state, planning, MCP, multi-agent systems, safety and evaluation."
    },
    "python-ai-ml-interview": {
      title: "Python Coding for AI & ML Interviews | Solved Problems",
      description: "Solve practical Python interview exercises for AI and data roles with assumptions, reasoning, runnable code, complexity, edge cases and follow-ups."
    },
    "sql-ai-data-interview": {
      title: "SQL for AI & Data Interviews | Solved Query Problems",
      description: "Practice SQL interview problems using joins, CTEs, aggregation, CASE, window functions, ranking, deduplication, rolling metrics and funnel analysis."
    },
    "ml-ai-system-design-interview": {
      title: "ML System Design Interview Guide | Architecture & Trade-offs",
      description: "Use a reusable ML/AI system-design framework across fraud, recommendations, churn, forecasting, RAG, LLM serving, moderation and agentic workflows."
    },
    "mlops-production-interview": {
      title: "MLOps & Production ML Interview Scenarios | Debugging Guide",
      description: "Diagnose training-serving skew, stale features, schema changes, leakage, registry mismatch, latency, drift, failed gates, canaries and production cost."
    },
    "behavioral-project-interview": {
      title: "AI/ML Project, Resume & Behavioral Interview Guide",
      description: "Explain AI/ML projects credibly, write evidence-rich resume bullets and prepare honest behavioral answers using STAR plus rationale, trade-offs and learning."
    },

    // Explicit metadata for redesigned Deep Learning and Modern AI lessons
    "neural-network-training-loop": {
      title: "Neural Network Training Loop & Debugging | ML Academy",
      description: "Learn the full neural network training loop: forward pass, loss calculation, backpropagation, optimizer updates, validation, and practical debugging checks."
    },
    "deep-learning-optimizers": {
      title: "Deep Learning Optimizers: SGD, Momentum & Adam",
      description: "Compare SGD, Momentum and Adam for neural network training, including learning-rate behavior, stability, convergence trade-offs, and practical selection guidance."
    },
    "weight-initialization": {
      title: "Weight Initialization & Normalization in Neural Networks",
      description: "Understand weight initialization, normalization and stable gradients in deep networks, including He and Glorot initialization, BatchNorm, and common failure modes."
    },
    "deep-learning-regularization": {
      title: "Deep Learning Regularization: Dropout, Weight Decay & More",
      description: "Learn how dropout, weight decay, early stopping and related regularization techniques reduce overfitting and improve neural network generalization."
    },
    "data-augmentation-deep-learning": {
      title: "Data Augmentation for Deep Learning | Images & Beyond",
      description: "Learn practical data augmentation for deep learning, when transformations help, how they affect generalization, and which augmentations can damage labels or meaning."
    },
    "cnn": {
      title: "Convolutional Neural Networks (CNNs) Explained with Examples",
      description: "Learn how CNNs use filters, feature maps, pooling and learned hierarchies for image classification, with intuitive explanations, examples, and practical guidance."
    },
    "cnn-architectures-resnet": {
      title: "CNN Architectures: AlexNet, VGG, Inception & ResNet",
      description: "Compare major CNN architectures from AlexNet and VGG to Inception and ResNet, including the design ideas that improved depth, efficiency, and trainability."
    },
    "object-detection": {
      title: "Object Detection, Segmentation & Grad-CAM Explained",
      description: "Learn the difference between image classification, object detection and segmentation, plus how Grad-CAM helps inspect which image regions influence a model."
    },
    "vision-transformers": {
      title: "Vision Transformers (ViT) Explained for Beginners",
      description: "Understand how Vision Transformers split images into patches, apply attention, build image representations, and compare conceptually with convolutional networks."
    },
    "rnn-lstm": {
      title: "RNN, LSTM & GRU Explained for Sequence Learning",
      description: "Learn how RNNs process sequences, why long-term dependencies are difficult, and how LSTM and GRU gates help preserve useful information across time steps."
    },
    "autoencoders": {
      title: "Autoencoders Explained: Compression, Denoising & Anomaly Detection",
      description: "Learn how autoencoders encode and reconstruct data, what the latent representation means, and how variants support denoising, compression and anomaly detection."
    },
    "graph-neural-networks": {
      title: "Graph Neural Networks (GNNs) Explained with Examples",
      description: "Understand graph neural networks, message passing, node and graph representations, and how GNNs learn from connected data such as networks and relationships."
    },
    "saving-deploying-deep-models": {
      title: "Save, Load & Deploy Deep Learning Models",
      description: "Learn how to save, version, load and deploy trained deep learning models safely, including inference concerns, reproducibility, validation and production checks."
    },
    "deep-learning-nlp": {
      title: "Deep Learning for NLP | Embeddings, RNNs & Transformers",
      description: "Learn how deep learning represents and processes language using embeddings, recurrent models, attention and Transformers, with a clear path from basics to modern NLP."
    },
    "pinn-kan-topological-networks": {
      title: "PINNs, KANs & Topological Neural Networks Explained",
      description: "Explore physics-informed neural networks, Kolmogorov-Arnold Networks and topological neural approaches, including their core ideas, use cases and important limitations."
    },
    "llm-intro": {
      title: "Large Language Models (LLMs) Explained for Beginners",
      description: "Learn what large language models are, how next-token prediction creates text, how modern LLMs evolved, and where application behavior differs from the model itself."
    },
    "tokenization-embeddings": {
      title: "LLM Tokenization, Embeddings & Context Windows",
      description: "Understand tokens, token IDs, embeddings and context windows, including worked token-budget examples and why representation choices affect LLM applications."
    },
    "transformers-attention": {
      title: "Transformer Architecture & Attention in LLMs",
      description: "Learn the Transformer architecture behind modern LLMs, including self-attention, positional information, layers, model families, and the flow from tokens to predictions."
    },
    "prompt-engineering": {
      title: "Prompt Engineering, Structured Outputs & Tool Calling",
      description: "Learn practical prompt engineering for LLM applications, including clear instructions, examples, structured outputs, validation, and the boundary to reliable tool calling."
    },
    "pretraining-finetuning": {
      title: "How LLMs Are Trained: Pretraining, Data & Scale",
      description: "Learn how large language models are pretrained on token sequences, how data and compute shape training, and why pretraining differs from later adaptation and alignment."
    },
    "instruction-tuning-rlhf": {
      title: "LLM Fine-Tuning: SFT, RLHF & LoRA Explained",
      description: "Understand supervised fine-tuning, preference alignment, RLHF and LoRA, including what each method changes and when application-level retrieval may be a better choice."
    },
    "rag": {
      title: "Retrieval-Augmented Generation (RAG) Explained",
      description: "Learn how RAG retrieves external evidence before LLM generation, including indexing, retrieval, context assembly, citations, failure boundaries and safe abstention."
    },
    "semantic-search-embeddings": {
      title: "Semantic Search with Embeddings for RAG",
      description: "Learn how semantic search uses embeddings and similarity to retrieve meaning-related passages, with intuitive examples, ranking concepts and practical RAG connections."
    },
    "vector-databases": {
      title: "Vector Databases Explained for LLM & RAG Applications",
      description: "Understand what vector databases store, how similarity search and metadata filtering work, and how indexes support scalable retrieval for LLM and RAG applications."
    },
    "advanced-rag": {
      title: "Advanced RAG: Chunking, Reranking & Evaluation",
      description: "Learn advanced RAG techniques including chunking, hybrid retrieval, reranking and retrieval evaluation, with worked metrics and guidance for debugging weak evidence."
    },
    "llm-evaluation": {
      title: "LLM Evaluation: Benchmarks, Quality, Safety & Cost",
      description: "Learn how to evaluate LLM applications with versioned test sets, deterministic checks, human review and model graders across quality, safety, latency and cost."
    },
    "llm-hallucinations-safety": {
      title: "LLM Hallucinations, Guardrails & Responsible AI",
      description: "Understand LLM hallucinations and practical guardrails, including grounding, validation, permissions, abstention, safety boundaries and responsible application design."
    },
    "reasoning-models": {
      title: "Reasoning Models & Test-Time Compute Explained",
      description: "Learn what reasoning models and test-time compute change, when additional inference effort can help, and why more reasoning steps do not automatically guarantee accuracy."
    },
    "efficient-llm-serving": {
      title: "Efficient LLM Inference & Serving Explained",
      description: "Learn the fundamentals of efficient LLM serving, including KV cache, quantization, batching, throughput, time to first token and end-to-end latency trade-offs."
    },
    "llmops": {
      title: "LLMOps: Production LLM Applications, Monitoring & Deployment",
      description: "Learn how to version, evaluate, observe and release production LLM applications across models, prompts, retrieval, tools, safety, latency, cost and rollback."
    },
    "agentic-ai-intro": {
      title: "Agentic AI Explained: Agents, Workflows & Autonomy",
      description: "Learn what Agentic AI means, how agents differ from fixed workflows and chatbots, and how bounded decide-act-observe loops balance useful autonomy with control."
    },
    "tool-calling": {
      title: "AI Agent Tool Calling & Reliable Tool Design",
      description: "Learn how AI agents propose tool calls while trusted code validates authorization, schemas and side effects, with practical guidance on retries, errors and idempotency."
    },
    "building-ai-agent": {
      title: "Build a Simple AI Agent in Python | Step-by-Step",
      description: "Build a small bounded AI agent from goal and tool calling through state, observations, tracing and stop rules, using a transparent Python example with safe abstention."
    },
    "planning-reflection": {
      title: "AI Agent Planning, ReAct & Reflection Explained",
      description: "Learn how AI agents use planning, ReAct-style action loops and bounded reflection, including observable trajectories, replanning, verifier checks and stop conditions."
    },
    "agent-context-engineering": {
      title: "Context Engineering for AI Agents Explained",
      description: "Learn how to assemble reliable agent context using relevance, trust, recency and token budgets, while separating instructions, evidence, history and retrieved memory."
    },
    "agent-memory": {
      title: "AI Agent Memory: Short-Term, Long-Term & Persistence",
      description: "Understand working, episodic, semantic and procedural memory for AI agents, including write and recall policies, provenance, stale facts, privacy and deletion."
    },
    "agent-state-graphs": {
      title: "AI Agent State Machines & Graph Workflows",
      description: "Learn how state machines and graphs make AI agent execution explicit and testable using typed state, nodes, conditional routing, bounded loops and parallel branches."
    },
    "durable-long-running-agents": {
      title: "Durable AI Agents & Human-in-the-Loop Workflows",
      description: "Learn how long-running AI agents checkpoint state, wait for events or approvals, resume safely, avoid duplicate side effects and revalidate authority after pauses."
    },
    "agentic-rag": {
      title: "Agentic RAG Explained: Adaptive Retrieval for AI Agents",
      description: "Learn how Agentic RAG decides when and how to retrieve, rewrites queries, checks evidence sufficiency and bounds adaptive retrieval by latency, cost and safety."
    },
    "multi-agent-systems": {
      title: "Multi-Agent Systems, Handoffs & Agent Communication",
      description: "Understand manager-worker systems, agents-as-tools and handoffs, including delegation contracts, context transfer, task ownership, coordination costs and failure modes."
    },
    "model-context-protocol": {
      title: "Model Context Protocol (MCP) for AI Agents Explained",
      description: "Learn the MCP host-client-server model, capability discovery and invocation, and why protocol interoperability still requires authentication, authorization and consent."
    },
    "agent-frameworks": {
      title: "AI Agent Frameworks: LangGraph, CrewAI & AutoGen",
      description: "Compare agent framework control models, including LangGraph, CrewAI and AutoGen, and learn when plain code, graphs, crews or event-driven orchestration fit best."
    },
    "browser-computer-use-agents": {
      title: "Browser & Computer-Use AI Agents Explained",
      description: "Learn how browser, computer-use and code-executing agents observe, act and verify through changing interfaces, with API-first design, sandboxing and confirmation controls."
    },
    "agent-security": {
      title: "AI Agent Security, Guardrails & Failure Recovery",
      description: "Learn how to defend AI agents against prompt injection, excessive permissions and unsafe side effects using trust boundaries, least privilege, validation and recovery."
    },
    "agent-evaluation-safety": {
      title: "AI Agent Evaluation: Task Success, Safety & Trajectories",
      description: "Learn how to evaluate both agent outcomes and trajectories across tool accuracy, unnecessary steps, recovery, safety, cost and reproducible scenario-based tests."
    },
    "agent-observability-deployment": {
      title: "AI Agent Observability, Cost, Latency & Deployment",
      description: "Learn how to trace, monitor and deploy AI agents with measurable latency and cost budgets, release controls, runtime safeguards and production observability."
    }
  };

  return seoData[topicId] || {
    title: `${defaultTitle} Tutorial | ML Academy`,
    description: `Learn the central ideas behind ${defaultTitle}, what its main components do, how they connect in practice, and where the approach can fail.`
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
  description: string,
  categoryTitle?: string
): string => {
  const pageUrl = `${BASE_URL}/learn/${topicId}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TechArticle", "LearningResource"],
        "@id": `${pageUrl}#article`,
        "url": pageUrl,
        "headline": title,
        "name": title,
        "description": description,
        "educationalLevel": "Beginner to Advanced",
        "learningResourceType": "Tutorial",
        "inLanguage": "en-US",
        "isAccessibleForFree": true,
        "image": `${BASE_URL}/og-image.png`,
        "datePublished": "2025-01-15T08:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        },
        "author": {
          "@type": "Organization",
          "name": "Learn ML Academy",
          "url": BASE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": "Learn ML Academy",
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
          ...(categoryTitle ? [{
            "@type": "ListItem",
            "position": 3,
            "name": categoryTitle.replace(/^\d+\.\s*/, ''),
            "item": `${BASE_URL}/curriculum`
          }] : []),
          {
            "@type": "ListItem",
            "position": categoryTitle ? 4 : 3,
            "name": title,
            "item": pageUrl
          }
        ]
      }
    ]
  });
};

