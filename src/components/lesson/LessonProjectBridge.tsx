import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Lightbulb } from "lucide-react";

type ProjectLink = { to: string; title: string; application: string };
const projects: Record<string, ProjectLink> = {
  titanic: { to: "/projects/titanic-survival", title: "Titanic Survival Predictor", application: "Turn classification, cleaning and validation into a working prediction app." },
  house: { to: "/projects/house-price", title: "House Price Predictor", application: "Use regression features, preprocessing and held-out evaluation on actual housing records." },
  fraud: { to: "/projects/credit-card-fraud", title: "Credit Card Fraud Detector", application: "Test imbalance, precision/recall and decision thresholds on anonymized transactions." },
  segmentation: { to: "/projects/customer-segmentation", title: "Customer Segmentation", application: "Apply clustering, RFM statistics and visual inspection to retail customers." },
  movie: { to: "/projects/movie-recommender", title: "Movie Recommender", application: "Calculate cosine similarity and compare content, collaborative and hybrid rankings." },
  retail: { to: "/projects/retail-forecasting", title: "Retail Sales Forecast", application: "Practice leakage-free lag features and chronological next-day sales forecasting." },
  digit: { to: "/projects/digit-recognizer", title: "Handwritten Digit Recognizer", application: "Train and test a real convolutional neural network, then upload an image." },
  studio: { to: "/projects/ai-content-creator", title: "AI Content Studio", application: "Use prompting, structured output and evaluation in a real writing assistant." },
  rag: { to: "/projects/pdf-rag", title: "Chat With Your PDFs", application: "Extract PDF pages, build TF-IDF retrieval and verify evidence-grounded answers." },
  semantic: { to: "/projects/pdf-rag/semantic", title: "Semantic PDF RAG", application: "Compare neural embeddings and reranking with a lexical baseline." },
  research: { to: "/projects/ai-research-assistant", title: "AI Research Assistant", application: "Practice safe tool calling, evidence collection and citation checking." },
  mlops: { to: "/projects/model-to-production", title: "Model to Production", application: "Package, test and monitor a trained ML model with an API and CI." },
  disaster: { to: "/projects/disaster-tweets", title: "Disaster Tweet Classifier", application: "Build an NLP classifier with TF-IDF, validation and F1 evaluation." },
};
const byCategory: Record<string, string[]> = {
  foundations: ["titanic", "house"],
  "python-ml-libs": ["titanic", "house"],
  "data-preprocessing": ["titanic", "segmentation"],
  "supervised-learning": ["house", "fraud"],
  "ensemble-learning": ["fraud", "house"],
  "unsupervised-learning": ["segmentation", "movie"],
  "model-evaluation": ["fraud", "house"],
  "time-series": ["retail"],
  "advanced-paradigms": ["retail", "mlops"],
  "deep-learning": ["digit", "disaster"],
  "advanced-deep-learning": ["digit", "disaster"],
  "generative-ai": ["studio"],
  "large-language-models": ["rag", "semantic"],
  "agentic-ai": ["research", "rag"],
  projects: ["titanic", "research"],
  "ai-engineering-mlops": ["mlops", "research"],
  "interview-preparation": ["house", "research"],
};
const byTopic: Record<string, string[]> = {
  "linear-regression": ["house", "retail"],
  "ridge-regression": ["house", "retail"],
  "logistic-regression": ["fraud", "disaster"],
  "naive-bayes": ["disaster", "fraud"],
  "knn": ["movie", "titanic"],
  "confusion-matrix": ["fraud", "digit"],
  "roc-auc": ["fraud", "disaster"],
  "pca": ["segmentation", "fraud"],
  "kmeans": ["segmentation", "movie"],
  "forecasting-basics": ["retail"],
  "arima": ["retail"],
  "cnn": ["digit"],
  "neural-networks": ["digit"],
  "prompt-engineering": ["studio", "research"],
  "llm-evaluation": ["studio", "rag"],
  "rag": ["rag", "semantic"],
  "semantic-search-embeddings": ["semantic", "movie"],
  "vector-databases": ["semantic", "rag"],
  "advanced-rag": ["semantic", "research"],
  "tool-calling": ["research"],
  "building-ai-agent": ["research"],
  "ml-cicd-continuous-training": ["mlops"],
  "ml-monitoring-drift": ["mlops"],
  "project-sales-forecasting": ["retail"],
  "project-image-classification": ["digit"],
  "project-genai-app": ["studio"],
  "project-rag-document-qa": ["rag"],
  "project-ai-agent": ["research"],
  "project-multi-agent-research": ["research"],
};

export function LessonProjectBridge({ topicId, categoryId }: { topicId: string; categoryId: string }) {
  const selected = (byTopic[topicId] ?? byCategory[categoryId] ?? ["titanic"]).slice(0, 2);
  return (
    <section aria-labelledby="practice-your-lesson-title" className="my-8 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 sm:p-7">
      <h2 id="practice-your-lesson-title" className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
        <Hammer className="h-5 w-5 text-indigo-700" aria-hidden="true" />
        Apply this concept in a real hands-on project
      </h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        You have studied the idea. Now use it in working Python code, see the calculation and output,
        and explain what changed. Each project includes step-by-step instructions, full source and tests.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {selected.map(key => {
          const project = projects[key];
          return <Link key={key} to={project.to}
            className="group rounded-xl border border-indigo-100 bg-white p-4 transition-colors hover:border-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <p className="flex items-center gap-2 font-bold text-indigo-900">
              <Lightbulb className="h-4 w-4 shrink-0" aria-hidden="true" />
              {project.title}
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 group-hover:translate-x-1" aria-hidden="true" />
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{project.application}</p>
          </Link>;
        })}
      </div>
      <p className="mt-3 text-xs text-slate-600">Practice challenge: predict an outcome first, run the code, and explain the difference.</p>
    </section>
  );
}
