import { lazy, useEffect, Suspense, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getTopicById, curriculum } from "../data/curriculum";
import { getSEOData, getCanonicalUrl, getLearningResourceSchema } from "../utils/seo";
import { getInterviewHandbookForTopic } from "../data/interviewHandbooks";

import { LessonContentRegistry } from "../content/LessonContentRegistry";
const QuizSection = lazy(() => import("../components/QuizSection").then(m => ({ default: m.QuizSection })));
import { ContinueLearning } from "../components/lesson/ContinueLearning";
import { LessonProjectBridge } from "../components/lesson/LessonProjectBridge";
import { WasThisHelpful } from "../components/lesson/WasThisHelpful";
import { LessonCompletionBanner } from "../components/lesson/LessonCompletionBanner";
import { useProgress } from "../context/ProgressContext";
import type { LearningDestination } from "../components/lesson/PreviousNextCard";
import {
  LegacyInlineEndingCleanup,
  LegacyLessonSummary,
} from "../components/LegacyLessonEnding";

import { AffiliateRecommendation } from "../components/AffiliateRecommendation";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { LessonShell } from "../components/lesson/LessonShell";

// We will dynamically render content based on ID.
// For topics without implemented content yet, we show a placeholder.

function getTopicNavigation(currentId: string) {
  let prev = null;
  let next = null;

  const currentCategory = curriculum.find((category) =>
    category.subtopics.some((topic) => topic.id === currentId)
  );
  if (currentCategory?.id === "deep-learning" || currentCategory?.id === "advanced-deep-learning") {
    const currentIndex = currentCategory.subtopics.findIndex((topic) => topic.id === currentId);
    if (currentIndex > 0) prev = currentCategory.subtopics[currentIndex - 1];
    if (currentIndex >= 0 && currentIndex < currentCategory.subtopics.length - 1) {
      next = currentCategory.subtopics[currentIndex + 1];
    }
    return { prev, next };
  }

  if (currentCategory?.id === "generative-ai") {
    const currentIndex = currentCategory.subtopics.findIndex((topic) => topic.id === currentId);
    if (currentIndex > 0) prev = currentCategory.subtopics[currentIndex - 1];
    if (currentIndex >= 0 && currentIndex < currentCategory.subtopics.length - 1) {
      next = currentCategory.subtopics[currentIndex + 1];
    } else if (currentIndex === currentCategory.subtopics.length - 1) {
      next = curriculum
        .find((category) => category.id === "large-language-models")
        ?.subtopics.find((topic) => topic.id === "llm-intro") ?? null;
    }
    return { prev, next };
  }

  const allTopics = curriculum.flatMap((c) => c.subtopics);
  const currentIndex = allTopics.findIndex((t) => t.id === currentId);

  if (currentIndex > 0) prev = allTopics[currentIndex - 1];
  if (currentIndex >= 0 && currentIndex < allTopics.length - 1)
    next = allTopics[currentIndex + 1];

  return { prev, next };
}



const topicAliases: Record<string, string> = {
  "mlp-universal-approximation": "neural-networks",
  "computational-graphs-autodiff": "backpropagation",
  "debugging-neural-networks": "neural-network-training-loop",
  "advanced-neural-optimization": "deep-learning-optimizers",
  "learning-rate-scheduling": "deep-learning-optimizers",
  "batch-normalization": "weight-initialization",
  "normalization-methods": "weight-initialization",
  "vanishing-exploding-gradients": "weight-initialization",
  "label-smoothing-distillation-ensembles": "deep-learning-regularization",
  "deep-learning-generalization": "deep-learning-regularization",
  "computer-vision": "cnn",
  "unet-deeplab-gradcam": "object-detection",
  "state-space-bptt": "state-space-models",
  "gru-bidirectional-seq2seq": "attention-transformers-deep-learning",
  "autoencoder-variants": "autoencoders",
  "self-supervised-contrastive-learning": "self-supervised-few-shot-learning",
  "curriculum-meta-few-shot": "self-supervised-few-shot-learning",
  "genai-apis-open-models": "genai-deployment",
  "language-model-evolution": "llm-intro",
  "context-windows": "tokenization-embeddings",
  "encoder-decoder-models": "transformers-attention",
  "hugging-face": "efficient-llm-serving",
  "llm-data-preparation": "pretraining-finetuning",
  "llm-scaling-laws": "pretraining-finetuning",
  "distributed-llm-training": "pretraining-finetuning",
  "lora-peft": "instruction-tuning-rlhf",
  "knowledge-distillation": "efficient-llm-serving",
  "quantization-inference": "efficient-llm-serving",
  "structured-output-function-calling": "prompt-engineering",
  "rag-evaluation": "advanced-rag",
  "llm-benchmarking-selection": "llm-evaluation",
  "types-of-ai-agents": "agentic-ai-intro",
  "agents-vs-workflows": "agentic-ai-intro",
  "reliable-agent-tools": "tool-calling",
  "react-agent-pattern": "planning-reflection",
  "human-in-the-loop": "durable-long-running-agents",
  "agent-to-agent-communication": "multi-agent-systems",
  "code-agents-sandboxing": "browser-computer-use-agents",
  "agent-failure-recovery": "agent-security",
  "agent-cost-latency-budgets": "agent-observability-deployment",
  "agent-trajectory-evaluation": "agent-evaluation-safety",
};


export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const articleRef = useRef<HTMLElement | null>(null);
  const { setLastVisitedTopicId } = useProgress();

  useEffect(() => {
    if (topicId) {
      setLastVisitedTopicId(topicId);
    }
  }, [topicId, setLastVisitedTopicId]);
 
   // Scroll to top and set SEO on route change
   useEffect(() => {
    window.scrollTo(0, 0);

    if (topicId) {
      const topicInfo = getTopicById(topicId);
      if (topicInfo) {
        const seo = getSEOData(topicId, topicInfo.subtopic.title);
        document.title = seo.title;

        // Meta description
        const setMeta = (sel: string, attr: string, val: string) => {
          let el = document.querySelector(sel);
          if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
          el.setAttribute(attr, val);
        };
        setMeta('meta[name="description"]', 'content', seo.description);

        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', getCanonicalUrl(topicId));

        // Open Graph tags (per-page)
        setMeta('meta[property="og:title"]', 'content', seo.title);
        setMeta('meta[property="og:description"]', 'content', seo.description);
        setMeta('meta[property="og:url"]', 'content', getCanonicalUrl(topicId));
        setMeta('meta[property="og:site_name"]', 'content', 'LearnMLAcademy');
        setMeta('meta[property="og:type"]', 'content', 'article');
        setMeta('meta[property="og:image"]', 'content', 'https://www.learnmlacademy.com/og-image.png');
        setMeta('meta[property="article:section"]', 'content', topicInfo.category.title.replace(/^\d+\.\s*/, ''));

        // Twitter Card tags
        setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', 'content', seo.title);
        setMeta('meta[name="twitter:description"]', 'content', seo.description);
        setMeta('meta[name="twitter:image"]', 'content', 'https://www.learnmlacademy.com/og-image.png');

        // JSON-LD: LearningResource + BreadcrumbList
        let scriptSchema = document.querySelector('#schema-topic') as HTMLScriptElement;
        if (!scriptSchema) {
          scriptSchema = document.createElement('script');
          scriptSchema.setAttribute('id', 'schema-topic');
          scriptSchema.setAttribute('type', 'application/ld+json');
          document.head.appendChild(scriptSchema);
        }
        scriptSchema.textContent = getLearningResourceSchema(topicId, seo.title, seo.description, topicInfo.category.title);
      }
    }
  }, [topicId]);

  if (topicId && topicAliases[topicId]) {
    return <Navigate to={`/learn/${topicAliases[topicId]}`} replace />;
  }

  if (!topicId) return <Navigate to="/" />;

  const topicData = getTopicById(topicId);

  if (!topicData) return <Navigate to="/" />;

  const { subtopic, category } = topicData;
  const { prev, next } = getTopicNavigation(topicId);

  // Load only the small registry for this lesson's curriculum category.
  const isGenerativeAILesson = category.id === "generative-ai";
  const isLLMLesson = category.id === "large-language-models";
  const isAgenticAILesson = category.id === "agentic-ai";
  const isProjectLesson = category.id === "projects";
  const isMLOpsLesson = category.id === "ai-engineering-mlops";
  const isCareerInterviewLesson = category.id === "interview-preparation";
  const isModernStandardizedLesson =
    isGenerativeAILesson ||
    isLLMLesson ||
    isAgenticAILesson ||
    isProjectLesson ||
    isMLOpsLesson ||
    isCareerInterviewLesson;
  const isLegacyStandardizedLesson = !isModernStandardizedLesson;

  const renderQuiz = () => (
    <div id="quiz-section" key={`quiz-${subtopic.id}`} className="scroll-mt-20">
      <Suspense fallback={<div className="min-h-24 py-8 text-sm text-slate-600" role="status">Loading knowledge check…</div>}>
        <QuizSection topicId={subtopic.id} topicTitle={subtopic.title} />
      </Suspense>
    </div>
  );

  const advancedDestinations: Record<string, { primary?: LearningDestination; secondary?: LearningDestination }> = {
    "state-space-models": {
      primary: { label: "Related advanced topic", title: "Physics-Informed, KAN and Topological Networks", to: "/learn/pinn-kan-topological-networks", context: "Advanced / bridge content" },
      secondary: { label: "Back to Deep Learning", title: "Deep Learning Basics and Model Types", to: "/learn/deep-learning-intro", context: "Core Deep Learning path" },
    },
    "deep-learning-nlp": {
      primary: { label: "Continue to LLMs", title: "What Are Large Language Models?", to: "/learn/llm-intro", context: "LLMs & RAG path" },
      secondary: { label: "Back to Deep Learning", title: "Deep Learning Basics and Model Types", to: "/learn/deep-learning-intro", context: "Core Deep Learning path" },
    },
    "pinn-kan-topological-networks": {
      primary: { label: "Related advanced topic", title: "State-Space Models", to: "/learn/state-space-models", context: "Advanced / bridge content" },
      secondary: { label: "Back to Deep Learning", title: "Deep Learning Basics and Model Types", to: "/learn/deep-learning-intro", context: "Core Deep Learning path" },
    },
  };

  const relatedTopics = category.subtopics
    .filter(item => item.id !== topicId)
    .slice(0, 4)
    .map(item => ({ title: item.title, to: `/learn/${item.id}` }));
  const standardPrimary = next
    ? { label: "Next lesson", title: next.title, to: `/learn/${next.id}`, context: getTopicById(next.id)?.category.title }
    : undefined;
  const standardSecondary = prev
    ? { label: "Previous lesson", title: prev.title, to: `/learn/${prev.id}`, context: getTopicById(prev.id)?.category.title }
    : undefined;
  const destinations = category.id === "advanced-deep-learning"
    ? advancedDestinations[topicId] ?? {}
    : { primary: standardPrimary, secondary: standardSecondary };

  const renderStandardContinueLearning = (headingId: string) => (
    <ContinueLearning
      headingId={headingId}
      primary={destinations.primary}
      secondary={destinations.secondary}
      related={category.id === "advanced-deep-learning" ? [] : relatedTopics}
    />
  );

  return (
    <LessonShell
      topicId={topicId}
      title={subtopic.title}
      description={getSEOData(topicId, subtopic.title).description}
      category={category.title}
      module={subtopic.module}
      nextTopic={next ? { id: next.id, title: next.title } : undefined}
      prevTopic={prev ? { id: prev.id, title: prev.title } : undefined}
    >
      <article
        ref={articleRef}
        data-lesson-body
        key={`article-${topicId}`}
        className="lesson-body prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-xl"
      >
        <Suspense fallback={
          <div className="animate-pulse space-y-4 py-8" aria-label="Loading lesson">
            <div className="h-6 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
          </div>
        }>
          <LessonContentRegistry topicId={topicId} categoryId={category.id} title={subtopic.title} />
          {isLegacyStandardizedLesson && (
            <LegacyInlineEndingCleanup articleRef={articleRef} topicId={topicId} />
          )}
        </Suspense>
      </article>

      <LessonProjectBridge topicId={topicId} categoryId={category.id} />

      {/* Lesson Completion Progress Card */}
      <LessonCompletionBanner
        topicId={topicId}
        topicTitle={subtopic.title}
        nextTopic={next ? { id: next.id, title: next.title } : undefined}
      />

      {/* Reader Feedback (Competitive UX Standard) */}
      <WasThisHelpful topicId={topicId} topicTitle={subtopic.title} />

      {isModernStandardizedLesson ? (
        <>
          {renderQuiz()}
          {renderStandardContinueLearning("continue-learning-heading")}
          <NewsletterSignup {...getInterviewHandbookForTopic(topicId)} />
          <AffiliateRecommendation />
        </>
      ) : (
        <>
          <LegacyLessonSummary topicId={topicId} />
          {renderQuiz()}
          {renderStandardContinueLearning(`continue-learning-${topicId}`)}
          <NewsletterSignup {...getInterviewHandbookForTopic(topicId)} />
          <AffiliateRecommendation />
        </>
      )}
    </LessonShell>
  );
}
