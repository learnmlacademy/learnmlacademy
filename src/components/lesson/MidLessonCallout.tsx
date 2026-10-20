import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Download, FileCode, Sparkles } from "lucide-react";
import { interviewHandbooks, type InterviewHandbookId } from "../../data/interviewHandbooks";

type ProjectInfo = {
  to: string;
  title: string;
  shortTitle: string;
  tagline: string;
};

type InterviewInfo = {
  blogSlug: string;
  blogTitle: string;
  handbookId: InterviewHandbookId;
};

// Most relevant Project Handbook per module/topic
const categoryProjects: Record<string, ProjectInfo> = {
  foundations: {
    to: "/projects/titanic-survival",
    title: "Titanic Survival Predictor",
    shortTitle: "Titanic Survival",
    tagline: "Build a complete ML pipeline with data cleaning, feature validation, and classification metrics.",
  },
  "python-ml-libs": {
    to: "/projects/titanic-survival",
    title: "Titanic Survival Predictor",
    shortTitle: "Titanic Survival",
    tagline: "Turn NumPy arrays, Pandas DataFrames, and Scikit-Learn pipelines into a working ML predictor.",
  },
  "data-preprocessing": {
    to: "/projects/titanic-survival",
    title: "Titanic Survival Predictor",
    shortTitle: "Titanic Survival",
    tagline: "Practice imputation, categorical encoding, and feature scaling without data leakage.",
  },
  "supervised-learning": {
    to: "/projects/house-price",
    title: "House Price Predictor",
    shortTitle: "House Price",
    tagline: "Train regression models with cross-validation, residual analysis, and feature engineering.",
  },
  "ensemble-learning": {
    to: "/projects/credit-card-fraud",
    title: "Credit Card Fraud Detector",
    shortTitle: "Credit Card Fraud",
    tagline: "Train Random Forests and XGBoost on highly imbalanced data with PR-AUC and cost-sensitive thresholds.",
  },
  "unsupervised-learning": {
    to: "/projects/customer-segmentation",
    title: "Customer Segmentation Engine",
    shortTitle: "Customer Segmentation",
    tagline: "Group retail customers using K-Means clustering, PCA dimensionality reduction, and RFM scores.",
  },
  "model-evaluation": {
    to: "/projects/credit-card-fraud",
    title: "Credit Card Fraud Detector",
    shortTitle: "Credit Card Fraud",
    tagline: "Evaluate precision, recall, ROC-AUC, and calibration curves on real transaction data.",
  },
  "time-series": {
    to: "/projects/retail-forecasting",
    title: "Retail Sales Forecasting System",
    shortTitle: "Retail Forecasting",
    tagline: "Build chronological lag features, rolling windows, and evaluate multi-horizon sales forecasts.",
  },
  "advanced-paradigms": {
    to: "/projects/retail-forecasting",
    title: "Retail Sales Forecasting System",
    shortTitle: "Retail Forecasting",
    tagline: "Implement time-series cross-validation and production monitoring for streaming sales data.",
  },
  "deep-learning": {
    to: "/projects/digit-recognizer",
    title: "Handwritten Digit Recognizer CNN",
    shortTitle: "Digit Recognizer CNN",
    tagline: "Build, train, and inspect a convolutional neural network with PyTorch forward passes and confusion matrices.",
  },
  "advanced-deep-learning": {
    to: "/projects/digit-recognizer",
    title: "Handwritten Digit Recognizer CNN",
    shortTitle: "Digit Recognizer CNN",
    tagline: "Train deep CNN architectures with batch normalization, learning rate schedulers, and error analysis.",
  },
  "generative-ai": {
    to: "/projects/ai-content-creator",
    title: "AI Content Studio Assistant",
    shortTitle: "AI Content Studio",
    tagline: "Build a production GenAI app with prompt engineering, structured JSON outputs, and LLM evaluations.",
  },
  "large-language-models": {
    to: "/projects/pdf-rag",
    title: "Chat With Your PDFs (RAG Assistant)",
    shortTitle: "PDF RAG Assistant",
    tagline: "Build an end-to-end RAG system with document chunking, dense vector embeddings, and citation groundings.",
  },
  "agentic-ai": {
    to: "/projects/ai-research-assistant",
    title: "AI Research Assistant (Autonomous Agent)",
    shortTitle: "AI Research Agent",
    tagline: "Build a multi-step autonomous AI agent with tool calling, ReAct loops, state management, and safe stops.",
  },
  "ai-engineering-mlops": {
    to: "/projects/model-to-production",
    title: "Model to Production System",
    shortTitle: "Model to Production",
    tagline: "Package trained ML models into FastAPI services with Docker containers, CI/CD testing, and drift monitors.",
  },
  "interview-preparation": {
    to: "/projects/model-to-production",
    title: "Model to Production System",
    shortTitle: "Model to Production",
    tagline: "Demonstrate end-to-end ML engineering chops with architecture diagrams, tests, and production serving.",
  },
  projects: {
    to: "/projects/titanic-survival",
    title: "Titanic Survival Predictor",
    shortTitle: "Titanic Survival",
    tagline: "Step-by-step verified source code, datasets, and testing checklists for portfolio projects.",
  },
};

// Topic overrides for exact flagship matches
const topicProjects: Record<string, ProjectInfo> = {
  rag: {
    to: "/projects/pdf-rag",
    title: "Chat With Your PDFs (RAG Assistant)",
    shortTitle: "PDF RAG Assistant",
    tagline: "Build an end-to-end RAG system with document chunking, dense vector embeddings, and citation groundings.",
  },
  "advanced-rag": {
    to: "/projects/pdf-rag/semantic",
    title: "Semantic PDF RAG with Reranking",
    shortTitle: "Semantic PDF RAG",
    tagline: "Upgrade naive lexical search with dense bi-encoders, cross-encoder rerankers, and hybrid retrieval.",
  },
  "vector-databases": {
    to: "/projects/pdf-rag",
    title: "Chat With Your PDFs (RAG Assistant)",
    shortTitle: "PDF RAG Assistant",
    tagline: "Index and query high-dimensional vector embeddings with approximate nearest neighbors and metadata filters.",
  },
  "tool-calling": {
    to: "/projects/ai-research-assistant",
    title: "AI Research Assistant (Autonomous Agent)",
    shortTitle: "AI Research Agent",
    tagline: "Implement JSON Schema validation, idempotency keys, and automated error retries for safe agent tools.",
  },
  "building-ai-agent": {
    to: "/projects/ai-research-assistant",
    title: "AI Research Assistant (Autonomous Agent)",
    shortTitle: "AI Research Agent",
    tagline: "Construct an autonomous research loop with observable trajectories, citation verifications, and safe exit guards.",
  },
  "ml-monitoring-drift": {
    to: "/projects/model-to-production",
    title: "Model to Production System",
    shortTitle: "Model to Production",
    tagline: "Detect covariate shift, prediction drift, and data quality degradation with automated alerts in production.",
  },
  "movie-recommender": {
    to: "/projects/movie-recommender",
    title: "Netflix-Style Movie Recommender",
    shortTitle: "Movie Recommender",
    tagline: "Build collaborative filtering and content-based recommendation algorithms with cosine similarity.",
  },
  "disaster-tweets": {
    to: "/projects/disaster-tweets",
    title: "Disaster Tweet NLP Classifier",
    shortTitle: "Disaster Tweet NLP",
    tagline: "Preprocess raw Twitter text, extract TF-IDF features, and train a high-F1 sentiment classifier.",
  },
  "project-customer-churn": {
    to: "/projects/model-to-production",
    title: "Take an AI Model From Laptop to Production",
    shortTitle: "Model to Production",
    tagline: "Production serving counterpart: package a trained churn pipeline into a production FastAPI service with Docker, CI, and drift checks.",
  },
  "project-credit-risk": {
    to: "/projects/credit-card-fraud",
    title: "Can AI Catch a Stolen Credit Card Transaction?",
    shortTitle: "Credit Card Fraud Detector",
    tagline: "Related financial risk build: handle severe class imbalance with PR-AUC, class weighting, and cost-sensitive threshold tuning.",
  },
  "project-sales-forecasting": {
    to: "/projects/retail-forecasting",
    title: "Can We Predict Tomorrow's Sales? Build a Retail Forecasting System",
    shortTitle: "Retail Sales Forecaster",
    tagline: "Practical build: engineer leakage-free lag features and rolling windows for chronological retail sales forecasting.",
  },
  "project-image-classification": {
    to: "/projects/digit-recognizer",
    title: "Teach AI to Read Handwritten Numbers - Build Your Own Digit Recognizer",
    shortTitle: "Handwritten Digit Recognizer",
    tagline: "Practical build: train and evaluate a PyTorch CNN with confusion matrix diagnostics and Streamlit image upload.",
  },
  "project-genai-app": {
    to: "/projects/ai-content-creator",
    title: "Build Your Own ChatGPT-Style AI Content Creator",
    shortTitle: "AI Content Creator",
    tagline: "Practical build: build a production GenAI studio with prompt contracts, structured JSON outputs, and LLM evaluations.",
  },
  "project-rag-document-qa": {
    to: "/projects/pdf-rag",
    title: "Chat With Your PDFs - Build Your Own RAG Assistant",
    shortTitle: "PDF RAG Assistant",
    tagline: "Practical build: extract document text, compute vector embeddings, and ground answers with verified page citations.",
  },
  "project-ai-agent": {
    to: "/projects/ai-research-assistant",
    title: "Build Your Own Perplexity-Style AI Research Assistant",
    shortTitle: "AI Research Assistant",
    tagline: "Practical build: implement autonomous tool calling, bounded ReAct trajectories, citation checking, and safe exit guards.",
  },
  "project-multi-agent-research": {
    to: "/projects/ai-research-assistant",
    title: "Build Your Own Perplexity-Style AI Research Assistant",
    shortTitle: "AI Research Assistant",
    tagline: "Practical build: explore multi-step research execution, evidence extraction, citation auditing, and structured brief synthesis.",
  },
};

// Module Interview Prep Guide + PDF mappings
const categoryInterviews: Record<string, InterviewInfo> = {
  foundations: {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "python-ml-libs": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "data-preprocessing": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "supervised-learning": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "ensemble-learning": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "unsupervised-learning": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "model-evaluation": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "time-series": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "advanced-paradigms": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  "deep-learning": {
    blogSlug: "deep-learning-interview-prep-guide",
    blogTitle: "Deep Learning Interview Prep Guide: Math, CNNs & Backprop",
    handbookId: "deep-learning",
  },
  "advanced-deep-learning": {
    blogSlug: "deep-learning-interview-prep-guide",
    blogTitle: "Deep Learning Interview Prep Guide: Math, CNNs & Backprop",
    handbookId: "deep-learning",
  },
  "generative-ai": {
    blogSlug: "generative-ai-interview-prep-guide",
    blogTitle: "Generative AI Interview Prep Guide: LLMs, Diffusion & VAEs",
    handbookId: "generative-ai",
  },
  "large-language-models": {
    blogSlug: "llm-rag-interview-prep-guide",
    blogTitle: "LLM & RAG Interview Prep Guide: Vector Search & Evals",
    handbookId: "llm-rag",
  },
  "agentic-ai": {
    blogSlug: "agentic-ai-interview-prep-guide",
    blogTitle: "Agentic AI Interview Prep Guide: Tool Calling, ReAct & MCP",
    handbookId: "agentic-ai",
  },
  "ai-engineering-mlops": {
    blogSlug: "ai-engineering-mlops-interview-prep-guide",
    blogTitle: "AI Engineering & MLOps Interview Prep Guide: CI/CD & Drift",
    handbookId: "mlops",
  },
  "interview-preparation": {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
  projects: {
    blogSlug: "ml-interview-prep-guide",
    blogTitle: "Machine Learning Interview Prep Guide: 100+ Solved Questions",
    handbookId: "ml",
  },
};

export function MidLessonCallout({
  topicId,
  categoryId,
}: {
  topicId: string;
  categoryId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const project = topicProjects[topicId] ?? categoryProjects[categoryId] ?? categoryProjects.foundations;
  const interview = categoryInterviews[categoryId] ?? categoryInterviews.foundations;
  const handbook = interviewHandbooks[interview.handbookId] ?? interviewHandbooks.ml;

  // On client hydration/mount, position this callout halfway through the lesson article
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const article = el.closest("article") || document.querySelector("article[data-lesson-body='true']");
    if (!article) return;

    // Check if already positioned inside article
    const headings = Array.from(article.querySelectorAll("h2")) as HTMLElement[];
    if (headings.length >= 2) {
      // Find midpoint heading
      const midIdx = Math.floor(headings.length / 2);
      const targetHeading = headings[midIdx];
      if (targetHeading && targetHeading.parentNode && el.nextSibling !== targetHeading) {
        targetHeading.parentNode.insertBefore(el, targetHeading);
      }
    } else {
      const paras = Array.from(article.querySelectorAll("p")) as HTMLElement[];
      if (paras.length >= 4) {
        const midIdx = Math.floor(paras.length / 2);
        const targetPara = paras[midIdx];
        if (targetPara && targetPara.parentNode && el.nextSibling !== targetPara) {
          targetPara.parentNode.insertBefore(el, targetPara);
        }
      }
    }
  }, [topicId]);

  return (
    <aside
      ref={containerRef}
      aria-label="Hands-On Project & Interview Guide"
      className="not-prose my-10 rounded-2xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/50 p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
            Hands-On Project & Interview Guide
          </span>
        </div>
        <span className="rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800">
          Curriculum Milestone
        </span>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-600 sm:text-sm">
        Connect this concept to end-to-end practical engineering: apply it in an executable portfolio project or prepare for technical interview questions.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Left: Matching Hands-On Project Handbook */}
        <div className="flex flex-col justify-between rounded-xl border border-indigo-100 bg-white p-4.5 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
              <FileCode className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Project Handbook</span>
            </div>
            <Link
              to={project.to}
              className="mt-1.5 block font-extrabold text-slate-900 transition-colors hover:text-indigo-600 sm:text-base"
            >
              {project.title}
            </Link>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              {project.tagline}
            </p>
          </div>
          <Link
            to={project.to}
            className="group mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Open {project.shortTitle} Handbook</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Right: Matching Interview Guide & Free PDF */}
        <div className="flex flex-col justify-between rounded-xl border border-sky-100 bg-white p-4.5 shadow-2xs transition-all hover:border-sky-300 hover:shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
              <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Interview Prep & Free PDF</span>
            </div>
            <Link
              to={`/blog/${interview.blogSlug}`}
              className="mt-1.5 block font-extrabold text-slate-900 transition-colors hover:text-sky-700 sm:text-base"
            >
              {interview.blogTitle}
            </Link>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
              {handbook.description}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              to={`/blog/${interview.blogSlug}`}
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900"
            >
              <span>Read Interview Guide</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href={`/blog/${interview.blogSlug}#get-pdf`}
              className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-1 text-[11px] font-bold text-sky-800 transition-colors hover:bg-sky-100"
            >
              <Download className="h-3 w-3" aria-hidden="true" />
              <span>Free Handbook PDF</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
