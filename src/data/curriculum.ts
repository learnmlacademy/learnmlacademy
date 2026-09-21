export type SubTopic = {
  id: string;
  title: string;
  module?: string;
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
    title: "10. Deep Learning",
    subtopics: [
      { id: "deep-learning-intro", title: "Deep Learning Basics and Model Types" },
      { id: "neural-networks", title: "How Neural Networks Learn" },
      { id: "math-foundations-deep-learning", title: "Essential Math for Neural Networks" },
      { id: "activation-functions", title: "Activation Functions" },
      { id: "tensors-frameworks-gpus", title: "Tensors, Frameworks & GPUs" },
      { id: "loss-functions-deep-learning", title: "Loss Functions: MSE, MAE and Cross-Entropy" },
      { id: "backpropagation", title: "Backpropagation and Automatic Differentiation" },
      { id: "neural-network-training-loop", title: "Training and Debugging a Neural Network" },
      { id: "deep-learning-optimizers", title: "Optimizers and Learning-Rate Scheduling" },
      { id: "weight-initialization", title: "Initialization, Normalization and Stable Gradients" },
      { id: "deep-learning-regularization", title: "Regularization and Generalization" },
      { id: "data-augmentation-deep-learning", title: "Data Augmentation" },
      { id: "cnn", title: "CNNs and Image Classification" },
      { id: "cnn-architectures-resnet", title: "CNN Architectures: AlexNet to ResNet" },
      { id: "object-detection", title: "Object Detection, Segmentation and Grad-CAM" },
      { id: "vision-transformers", title: "Vision Transformers" },
      { id: "rnn-lstm", title: "RNNs, LSTMs and GRUs" },
      { id: "attention-transformers-deep-learning", title: "Sequence-to-Sequence Models and Attention" },
      { id: "transformers-deep-learning", title: "Transformers for Deep Learning" },
      { id: "autoencoders", title: "Autoencoders and Their Variants" },
      { id: "transfer-learning", title: "Transfer Learning and Fine-Tuning" },
      { id: "self-supervised-few-shot-learning", title: "Self-Supervised and Few-Shot Learning" },
      { id: "graph-neural-networks", title: "Graph Neural Networks" },
      { id: "saving-deploying-deep-models", title: "Saving, Loading & Deploying Deep Models" },
    ],
  },
  {
    id: "advanced-deep-learning",
    title: "Advanced Deep Learning Topics",
    subtopics: [
      { id: "state-space-models", title: "State-Space Models" },
      { id: "deep-learning-nlp", title: "Deep Learning for NLP" },
      { id: "pinn-kan-topological-networks", title: "Physics-Informed, KAN and Topological Networks" },
    ],
  },
  {
    id: "generative-ai",
    title: "11. Generative AI",
    subtopics: [
      { id: "generative-ai-intro", title: "What Is Generative AI?", module: "Module 1 — Foundations" },
      { id: "generative-vs-discriminative", title: "Generative vs Discriminative Models", module: "Module 1 — Foundations" },
      { id: "how-generative-models-learn", title: "How Generative Models Learn and Generate New Data", module: "Module 1 — Foundations" },
      { id: "vae", title: "Variational Autoencoders for Generation", module: "Module 2 — Core Generative Model Families" },
      { id: "gans", title: "Generative Adversarial Networks (GANs)", module: "Module 2 — Core Generative Model Families" },
      { id: "diffusion-models", title: "Diffusion Models", module: "Module 2 — Core Generative Model Families" },
      { id: "stable-latent-diffusion", title: "Latent Diffusion and Stable Diffusion Architecture", module: "Module 2 — Core Generative Model Families" },
      { id: "controlling-diffusion-models", title: "Controlling Diffusion Models", module: "Module 2 — Core Generative Model Families" },
      { id: "finetuning-image-models", title: "Fine-Tuning Image Generation Models", module: "Module 2 — Core Generative Model Families" },
      { id: "multimodal-ai", title: "Multimodal Generative AI", module: "Module 3 — Beyond Images" },
      { id: "audio-music-video-generation", title: "Audio, Speech, Music and Video Generation", module: "Module 3 — Beyond Images" },
      { id: "synthetic-data", title: "Synthetic Data Generation", module: "Module 3 — Beyond Images" },
      { id: "evaluating-generative-models", title: "Evaluating Generative Models", module: "Module 4 — Evaluation, Responsibility and Selection" },
      { id: "responsible-generative-ai", title: "Responsible Generative AI", module: "Module 4 — Evaluation, Responsibility and Selection" },
      { id: "choosing-generative-model", title: "Choosing the Right Generative Model", module: "Module 4 — Evaluation, Responsibility and Selection" },
      { id: "building-genai-apps", title: "Building Generative AI Applications", module: "Module 5 — Applications and Production" },
      { id: "genai-deployment", title: "Deploying Generative AI Applications", module: "Module 5 — Applications and Production" },
    ],
  },
  {
    id: "large-language-models",
    title: "12. Large Language Models",
    subtopics: [
      { id: "llm-intro", title: "What Are Large Language Models? From N-Grams to Modern LLMs" },
      { id: "tokenization-embeddings", title: "Tokens, Embeddings & Context Windows" },
      { id: "transformers-attention", title: "Transformer Architecture & LLM Model Families" },
      { id: "text-generation-decoding", title: "How LLMs Generate Text: Next-Token Prediction & Decoding" },
      { id: "pretraining-finetuning", title: "How LLMs Are Trained: Data, Pretraining, Scale & Compute" },
      { id: "instruction-tuning-rlhf", title: "Fine-Tuning & Alignment: SFT, RLHF and LoRA" },
      { id: "efficient-llm-serving", title: "Efficient LLM Inference & Serving" },
      { id: "prompt-engineering", title: "Prompt Engineering, Structured Outputs & Function Calling" },
      { id: "semantic-search-embeddings", title: "Semantic Search with Embeddings" },
      { id: "vector-databases", title: "Vector Databases" },
      { id: "rag", title: "Retrieval-Augmented Generation (RAG)" },
      { id: "advanced-rag", title: "Advanced RAG: Chunking, Retrieval, Reranking & Evaluation" },
      { id: "llm-evaluation", title: "Evaluating LLMs, Benchmarks & Model Selection" },
      { id: "llm-hallucinations-safety", title: "Hallucinations, Guardrails & Responsible LLM Use" },
      { id: "reasoning-models", title: "Reasoning Models & Test-Time Compute" },
      { id: "llmops", title: "LLMOps & Building Production LLM Applications" },
    ],
  },
  {
    id: "agentic-ai",
    title: "13. Agentic AI",
    subtopics: [
      { id: "agentic-ai-intro", title: "What Is Agentic AI? Agents, Workflows & Types" },
      { id: "tool-calling", title: "Tool Calling & Reliable Tool Design" },
      { id: "agent-context-engineering", title: "Context Engineering for Agents" },
      { id: "agent-memory", title: "Memory in AI Agents: Short-Term, Long-Term & Persistence" },
      { id: "planning-reflection", title: "Planning, ReAct & Reflection" },
      { id: "agent-state-graphs", title: "Agent Workflows, State Machines & Graphs" },
      { id: "durable-long-running-agents", title: "Durable & Long-Running Agents with Human-in-the-Loop" },
      { id: "agentic-rag", title: "Agentic RAG" },
      { id: "building-ai-agent", title: "Build a Simple AI Agent End-to-End" },
      { id: "multi-agent-systems", title: "Multi-Agent Systems, Handoffs & Agent Communication" },
      { id: "model-context-protocol", title: "Model Context Protocol (MCP) & Agent Interoperability" },
      { id: "agent-frameworks", title: "Agent Frameworks: LangGraph, CrewAI & AutoGen" },
      { id: "browser-computer-use-agents", title: "Browser, Computer-Use & Code-Executing Agents" },
      { id: "agent-security", title: "Agent Security, Guardrails & Failure Recovery" },
      { id: "agent-evaluation-safety", title: "Evaluating Agents: Task Success, Safety, Trajectories & Benchmarks" },
      { id: "agent-observability-deployment", title: "Agent Observability, Cost, Latency & Deployment" },
    ],
  },
  {
    id: "projects",
    title: "14. Projects",
    subtopics: [
      { id: "project-customer-churn", title: "Customer Churn Prediction — End-to-End ML Project" },
      { id: "project-credit-risk", title: "Credit Risk Prediction with Explainable ML" },
      { id: "project-sales-forecasting", title: "Sales Forecasting — End-to-End Time-Series Project" },
      { id: "project-image-classification", title: "Image Classification with Transfer Learning" },
      { id: "project-genai-app", title: "Build a Generative AI Application End-to-End" },
      { id: "project-rag-document-qa", title: "Build a Document Q&A System with RAG" },
      { id: "project-ai-agent", title: "Build an AI Agent with Tools & Memory" },
      { id: "project-multi-agent-research", title: "Build a Multi-Agent Research Assistant" },
    ],
  },
  {
    id: "ai-engineering-mlops",
    title: "15. AI Engineering & MLOps",
    subtopics: [
      { id: "ai-engineering-mlops", title: "AI Engineering & MLOps: From Notebook to Production" },
      { id: "ml-data-feature-pipelines", title: "Production Data, Feature & ML Pipelines" },
      { id: "experiment-tracking-model-registry", title: "Experiment Tracking, Reproducibility, Lineage & Model Registry" },
      { id: "batch-online-inference", title: "Batch, Online & Streaming Inference Architectures" },
      { id: "ml-cicd-continuous-training", title: "Testing, CI/CD & Continuous Training for ML" },
      { id: "ml-monitoring-drift", title: "ML Monitoring, Data Drift & Model Decay" },
      { id: "production-ai-reliability", title: "Production AI Reliability, Security, Cost & Governance" },
      { id: "ml-system-design", title: "End-to-End ML/AI System Design" },
    ],
  },
  {
    id: "interview-preparation",
    title: "16. Career & Interview Preparation",
    subtopics: [
      { id: "ai-data-career-paths", title: "Choose Your AI & Data Career", module: "Career Roadmaps" },
      { id: "ml-engineer-roadmap", title: "Machine Learning Engineer Roadmap", module: "Career Roadmaps" },
      { id: "ai-engineer-roadmap", title: "AI Engineer Roadmap", module: "Career Roadmaps" },
      { id: "genai-llm-engineer-roadmap", title: "Generative AI / LLM Engineer Roadmap", module: "Career Roadmaps" },
      { id: "data-scientist-roadmap", title: "Data Scientist Roadmap", module: "Career Roadmaps" },
      { id: "interview-preparation-strategy", title: "How AI/ML Interviews Work & How to Prepare", module: "Interview Preparation" },
      { id: "ml-interview-questions", title: "ML, Statistics & Model Evaluation Interview Questions", module: "Interview Preparation" },
      { id: "deep-learning-interview-questions", title: "Deep Learning Interview Questions", module: "Interview Preparation" },
      { id: "genai-llm-rag-interview", title: "Generative AI, LLM & RAG Interview Questions", module: "Interview Preparation" },
      { id: "agentic-ai-interview", title: "Agentic AI Interview Questions", module: "Interview Preparation" },
      { id: "python-ai-ml-interview", title: "Python Coding for AI/ML Interviews", module: "Interview Preparation" },
      { id: "sql-ai-data-interview", title: "SQL for AI/Data Interviews", module: "Interview Preparation" },
      { id: "ml-ai-system-design-interview", title: "ML & AI System Design Interviews", module: "Interview Preparation" },
      { id: "mlops-production-interview", title: "MLOps, Production & Debugging Interview Scenarios", module: "Interview Preparation" },
      { id: "behavioral-project-interview", title: "Project Deep-Dive, Resume & Behavioral Interviews", module: "Interview Preparation" },
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
