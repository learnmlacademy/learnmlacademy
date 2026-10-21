import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, GraduationCap } from "lucide-react";

export type PrerequisiteItem = {
  url: string;
  title: string;
  concept: string;
};

// 3-4 prerequisite lessons for each blog post
const blogPrerequisites: Record<string, PrerequisiteItem[]> = {
  "top-ml-algorithms-explained": [
    { url: "/learn/linear-regression", title: "Linear Regression & Gradient Descent", concept: "Ordinary Least Squares loss, parameter updates, and feature weights." },
    { url: "/learn/logistic-regression", title: "Logistic Regression & Sigmoid Function", concept: "Binary cross-entropy loss and probability decision boundaries." },
    { url: "/learn/decision-trees", title: "Decision Tree Construction & Pruning", concept: "Recursive splitting criteria, Gini impurity, and stopping depth." },
    { url: "/learn/random-forest", title: "Random Forests & Ensemble Bagging", concept: "Bootstrap aggregation, feature subsampling, and variance reduction." },
  ],
  "ml-interview-prep-guide": [
    { url: "/learn/bias-variance", title: "Bias-Variance Tradeoff Analysis", concept: "Decomposing prediction error into bias, variance, and irreducible noise." },
    { url: "/learn/confusion-matrix", title: "Confusion Matrix & Evaluation Metrics", concept: "Precision, recall, specificity, and class imbalance considerations." },
    { url: "/learn/roc-auc", title: "ROC-AUC Curves & Decision Thresholds", concept: "Ranking performance independent of operating probability thresholds." },
    { url: "/learn/cross-validation", title: "K-Fold Cross-Validation & Data Leakage", concept: "Estimating generalization performance without test set contamination." },
  ],
  "deep-learning-interview-prep-guide": [
    { url: "/learn/neural-networks", title: "Artificial Neural Networks & Forward Passes", concept: "Linear transformations, weight matrices, and hidden representations." },
    { url: "/learn/backpropagation", title: "Backpropagation Calculus & Chain Rule", concept: "Vectorized partial derivatives and gradient descent weight updates." },
    { url: "/learn/activation-functions", title: "Activation Functions: ReLU, Sigmoid & Softmax", concept: "Introducing non-linearities and gradient saturation dynamics." },
    { url: "/learn/cnn", title: "Convolutional Neural Networks & Receptive Fields", concept: "Spatial feature maps, 2D kernels, stride, and pooling operations." },
  ],
  "generative-ai-interview-prep-guide": [
    { url: "/learn/how-generative-models-learn", title: "Generative Modeling & Distribution Sampling", concept: "Modeling high-dimensional joint probability distributions p(x)." },
    { url: "/learn/vae", title: "Variational Autoencoders & Reparameterization", concept: "Latent space regularization, KL divergence, and the ELBO bound." },
    { url: "/learn/diffusion-models", title: "Diffusion Models Math & Forward Schedulers", concept: "Forward Gaussian noise addition and reverse denoising transitions." },
    { url: "/learn/stable-latent-diffusion", title: "Latent Stable Diffusion & UNet Denoisers", concept: "Denoising in compressed latent space with cross-attention prompts." },
  ],
  "llm-rag-interview-prep-guide": [
    { url: "/learn/transformers-attention", title: "Transformer Self-Attention & Encoders", concept: "Scaled dot-product attention, multi-head projections, and keys/values." },
    { url: "/learn/semantic-search-embeddings", title: "Dense Vector Embeddings & Cosine Search", concept: "Representing semantic meaning as dense continuous vectors." },
    { url: "/learn/vector-databases", title: "Vector Databases & HNSW Indexing", concept: "Sub-linear approximate nearest neighbor retrieval at scale." },
    { url: "/learn/rag", title: "Retrieval-Augmented Generation Architecture", concept: "Document chunking, context injection, and citation attribution." },
  ],
  "agentic-ai-interview-prep-guide": [
    { url: "/learn/tool-calling", title: "AI Agent Tool Calling & Schema Validation", concept: "JSON Schema function declarations, argument verification, and retries." },
    { url: "/learn/planning-reflection", title: "ReAct Loops, Planning & Reflection", concept: "Observable step trajectories, verification checks, and replanning." },
    { url: "/learn/agent-memory", title: "Working, Episodic & Semantic Agent Memory", concept: "Token budget allocations, state persistence, and memory writes." },
    { url: "/learn/model-context-protocol", title: "Model Context Protocol (MCP) Interoperability", concept: "Standardized host-client-server protocols for external tools." },
  ],
  "ai-engineering-mlops-interview-prep-guide": [
    { url: "/learn/ml-data-feature-pipelines", title: "Production Data & Feature Store Pipelines", concept: "Automated data validation, transformation caching, and lineage." },
    { url: "/learn/experiment-tracking-model-registry", title: "Experiment Tracking & Model Registries", concept: "Artifact versioning, stage promotions, and reproducible runs." },
    { url: "/learn/batch-online-inference", title: "Batch vs. Real-Time Online Inference Latency", concept: "SLA requirements, request-response serving, and streaming patterns." },
    { url: "/learn/ml-monitoring-drift", title: "Data Quality, Covariate & Concept Drift Monitoring", concept: "Statistical drift tests, KS divergence, and performance alerts." },
  ],
  "overfitting-underfitting-guide": [
    { url: "/learn/bias-variance", title: "Bias-Variance Tradeoff Decomposition", concept: "Balancing approximation error against estimation sensitivity." },
    { url: "/learn/ridge-regression", title: "L1 Lasso & L2 Ridge Regularization", concept: "Weight penalties, sparsity constraints, and ill-conditioned matrices." },
    { url: "/learn/cross-validation", title: "Stratified K-Fold Cross-Validation", concept: "Evaluating variance across multiple train/test splits safely." },
    { url: "/learn/overfitting-underfitting", title: "Training vs. Validation Learning Curves", concept: "Diagnosing whether more data or higher model capacity is needed." },
  ],
  "feature-engineering-tips": [
    { url: "/learn/handling-missing-data", title: "Missing Data Imputation & Indicators", concept: "Mean/median replacement, KNN imputation, and missingness flags." },
    { url: "/learn/encoding-categorical", title: "One-Hot & Target Encoding Categoricals", concept: "Transforming strings to numeric arrays without high-cardinality blowup." },
    { url: "/learn/feature-scaling", title: "StandardScaler vs. MinMaxScaler Normalization", concept: "Preventing magnitude dominance in distance and gradient algorithms." },
    { url: "/learn/feature-selection", title: "Recursive Feature Elimination & Filters", concept: "Pruning noisy and collinear features to improve generalization." },
  ],
  "xgboost-vs-random-forest": [
    { url: "/learn/decision-trees", title: "Decision Tree Splitting & Gini Impurity", concept: "Greedy recursive partitioning, feature splits, and tree leaves." },
    { url: "/learn/random-forest", title: "Random Forest Bagging & Out-of-Bag Score", concept: "Parallel independent trees with feature and sample randomization." },
    { url: "/learn/gradient-boosting", title: "Gradient Boosting Residual Fitting & Shrinkage", concept: "Sequential stage-wise additive trees minimizing pseudo-residuals." },
    { url: "/learn/xgboost", title: "XGBoost Second-Order Taylor Expansion & Histograms", concept: "Exact greedy splits, hessians, regularization, and binning." },
  ],
  "what-is-rag": [
    { url: "/learn/semantic-search-embeddings", title: "Dense Vector Embeddings & Bi-Encoders", concept: "Encoding sentences into dense representations for similarity scoring." },
    { url: "/learn/vector-databases", title: "Vector Databases & HNSW Search", concept: "Scalable indexing for high-dimensional cosine similarity queries." },
    { url: "/learn/rag", title: "Retrieval-Augmented Generation Architecture", concept: "Connecting external documents to LLM generation prompts." },
    { url: "/learn/advanced-rag", title: "Advanced RAG: Chunking, Reranking & Hybrid", concept: "Hierarchical chunking, reciprocal rank fusion, and cross-encoders." },
  ],
};

// 3-4 prerequisite lessons for each project handbook
const projectPrerequisites: Record<string, PrerequisiteItem[]> = {
  "titanic-survival": [
    { url: "/learn/pandas-essentials", title: "Data Cleaning with Pandas", concept: "Handling null values, data types, and DataFrame transformations." },
    { url: "/learn/train-test-split", title: "Train-Test Split & Stratification", concept: "Separating training from evaluation data to prevent data leakage." },
    { url: "/learn/logistic-regression", title: "Logistic Regression for Binary Classification", concept: "Sigmoid mapping, log loss, and probability predictions." },
    { url: "/learn/confusion-matrix", title: "Confusion Matrix & Classification Metrics", concept: "Measuring accuracy, precision, recall, and F1-score." },
  ],
  "house-price": [
    { url: "/learn/linear-regression", title: "Linear Regression & Gradient Descent", concept: "Fitting ordinary least squares regression lines to continuous features." },
    { url: "/learn/feature-scaling", title: "Feature Scaling & Outlier Transformation", concept: "Log-transforming skewed targets and standardizing predictors." },
    { url: "/learn/cross-validation", title: "K-Fold Cross-Validation for Regression", concept: "Evaluating root mean squared error across out-of-fold partitions." },
    { url: "/learn/ridge-regression", title: "Ridge & Lasso Regularization Penalties", concept: "L1 feature selection and L2 weight shrinkage for collinear data." },
  ],
  "credit-card-fraud": [
    { url: "/learn/classification-intro", title: "Handling Imbalanced Classes & Decision Boundaries", concept: "Cost-sensitive loss weighting vs. synthetic minority oversampling." },
    { url: "/learn/roc-auc", title: "ROC-AUC & Precision-Recall Curves", concept: "Evaluating imbalanced anomaly detection where positives are 0.17%." },
    { url: "/learn/random-forest", title: "Random Forests for Anomaly Detection", concept: "Ensemble tree bagging to isolate rare fraudulent transactions." },
    { url: "/learn/xgboost", title: "XGBoost Gradient Boosting on Fraud Datasets", concept: "Optimizing scale_pos_weight and cost-sensitive thresholds." },
  ],
  "customer-segmentation": [
    { url: "/learn/unsupervised-learning-intro", title: "Unsupervised Learning Foundations", concept: "Extracting latent customer clusters without ground-truth labels." },
    { url: "/learn/kmeans", title: "K-Means Clustering & Elbow Method", concept: "Iterative centroid updates, inertia curves, and silhouette scores." },
    { url: "/learn/pca", title: "Principal Component Analysis (PCA)", concept: "Orthogonal dimensional projection to visualize customer groupings." },
    { url: "/learn/data-visualization", title: "Data Visualization & Cluster Scatter Plots", concept: "Plotting 2D/3D customer centroids with Matplotlib and Seaborn." },
  ],
  "retail-forecasting": [
    { url: "/learn/forecasting-basics", title: "Time-Series Forecasting & Stationarity", concept: "Autoregressive dependencies, stationarity tests, and baseline lags." },
    { url: "/learn/forecasting-basics", title: "Trend, Seasonality & Residual Decomposition", concept: "Isolating seasonal sales spikes and underlying market trends." },
    { url: "/learn/arima", title: "ARIMA & SARIMA Autoregressive Modeling", concept: "Integrated autoregressive moving average modeling for retail cycles." },
    { url: "/learn/cross-validation", title: "MAE, RMSE & Forecast Evaluation", concept: "Chronological evaluation without lookahead data leakage." },
  ],
  "movie-recommender": [
    { url: "/learn/knn", title: "Recommendation System Architectures", concept: "Comparing content-based filtering with collaborative filtering." },
    { url: "/learn/pca", title: "Matrix Factorization & Dimensionality Reduction", concept: "Latent user and item embedding decomposition from sparse ratings." },
    { url: "/learn/knn", title: "Cosine Similarity & K-Nearest Neighbors", concept: "Computing angle distance across high-dimensional movie vectors." },
    { url: "/learn/semantic-search-embeddings", title: "Embedding Similarity for Content Filtering", concept: "Matching movie plots and descriptions using vector proximity." },
  ],
  "disaster-tweets": [
    { url: "/learn/deep-learning-nlp", title: "Text Cleaning, Tokenization & NLP Pipelines", concept: "Stripping URLs, punctuation, and converting words to embeddings." },
    { url: "/learn/naive-bayes", title: "Naive Bayes for Text Classification", concept: "Conditional word probabilities for real-time disaster alerts." },
    { url: "/learn/naive-bayes", title: "Multinomial Naive Bayes for Real-Time Alerts", concept: "Probabilistic classification on sparse textual feature representations." },
    { url: "/learn/confusion-matrix", title: "Precision, Recall & F1-Score Evaluation", concept: "Balancing false alarms and missed emergency notifications." },
  ],
  "digit-recognizer": [
    { url: "/learn/neural-networks", title: "Artificial Neural Networks & Forward Propagation", concept: "Layer-by-layer linear combinations and activation forward passes." },
    { url: "/learn/activation-functions", title: "ReLU & Softmax Activation Functions", concept: "Hidden rectified linear units and output probability distributions." },
    { url: "/learn/cnn", title: "Convolutional Layers, Pooling & Filters", concept: "2D spatial convolutions, stride, padding, and max pooling filters." },
    { url: "/learn/deep-learning-regularization", title: "Dropout & Batch Normalization in PyTorch", concept: "Preventing co-adaptation of weights during image model training." },
  ],
  "ai-content-creator": [
    { url: "/learn/prompt-engineering", title: "Few-Shot Prompt Engineering & System Roles", concept: "Structuring instructions, constraints, and illustrative few-shot examples." },
    { url: "/learn/text-generation-decoding", title: "Sampling Parameters: Temperature & Top-P", concept: "Controlling output diversity and deterministic responses in LLMs." },
    { url: "/learn/prompt-engineering", title: "Structured JSON Outputs & Schema Validation", concept: "Constraining generative model completions to validated JSON schemas." },
    { url: "/learn/llm-evaluation", title: "LLM Output Evaluation & Guardrail Verification", concept: "Automated evaluation rubrics and content safety guardrails." },
  ],
  "pdf-rag": [
    { url: "/learn/semantic-search-embeddings", title: "Dense Vector Embeddings & Bi-Encoders", concept: "Mapping raw document text into semantic embedding vector space." },
    { url: "/learn/vector-databases", title: "Vector Databases & HNSW Indexing", concept: "Fast approximate nearest neighbor vector search with metadata filters." },
    { url: "/learn/rag", title: "Retrieval-Augmented Generation Architecture", concept: "Grounded context injection and source citation synthesis." },
    { url: "/learn/advanced-rag", title: "Document Chunking, Cross-Encoder Rerankers & Citations", concept: "Optimizing retrieval precision and verifying factual grounding." },
  ],
  "ai-research-assistant": [
    { url: "/learn/tool-calling", title: "Autonomous Tool Calling & JSON Schemas", concept: "Function calling protocols, input validation, and execution retries." },
    { url: "/learn/planning-reflection", title: "ReAct Loops, Step Verification & Replanning", concept: "Multi-step reasoning cycles with explicit trajectory tracking." },
    { url: "/learn/agent-memory", title: "Working Context & Persistent Episodic Memory", concept: "Preserving intermediate findings and citation sources across steps." },
    { url: "/learn/model-context-protocol", title: "Model Context Protocol (MCP) Interoperability", concept: "Connecting agents to external APIs via standard protocol boundaries." },
  ],
  "model-to-production": [
    { url: "/learn/ml-data-feature-pipelines", title: "Production Data Pipelines & Feature Validation", concept: "Schema checks, data assertions, and reproducible feature creation." },
    { url: "/learn/batch-online-inference", title: "REST API Model Serving with FastAPI", concept: "Building scalable endpoints with Pydantic validation and Docker." },
    { url: "/learn/ml-cicd-continuous-training", title: "CI/CD Automation & Model Testing Gates", concept: "Automated regression testing, smoke tests, and deployment gates." },
    { url: "/learn/ml-monitoring-drift", title: "Production Monitoring, Latency & Data Drift", concept: "Real-time alerting on covariate shifts and performance degradation." },
  ],
};

export function CorePrerequisitesCard({
  slug,
  projectId,
  items,
}: {
  slug?: string;
  projectId?: string;
  items?: PrerequisiteItem[];
}) {
  const prereqs = items ?? (slug ? blogPrerequisites[slug] : projectId ? projectPrerequisites[projectId] : null);

  if (!prereqs || prereqs.length === 0) return null;

  return (
    <aside
      aria-label="Core Prerequisite Concepts"
      className="not-prose my-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-slate-50/40 to-sky-50/60 p-4.5 sm:p-6 shadow-2xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-950 sm:text-base">
            Core Prerequisite Concepts
          </h2>
        </div>
        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
          Recommended Reading
        </span>
      </div>

      <p className="mt-2.5 text-xs text-slate-600 sm:text-sm">
        To get the maximum practical value from this {projectId ? "project handbook" : "guide"}, explore these foundational lessons:
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {prereqs.map((item, idx) => (
          <Link
            key={item.url}
            to={item.url}
            className="group flex flex-col justify-between rounded-xl border border-indigo-100/90 bg-white p-3.5 shadow-2xs transition-all hover:border-indigo-400 hover:shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <div>
              <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-indigo-600">
                <span>Concept {idx + 1}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
              <p className="mt-1 font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                {item.title}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                {item.concept}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-indigo-600 group-hover:underline">
              Study Lesson →
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
