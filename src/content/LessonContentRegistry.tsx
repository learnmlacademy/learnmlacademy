import { lazy, type ComponentType } from "react";
import { GenericContent } from "./GenericContent";

type RegistryProps = { topicId: string; categoryId: string; title: string };

const registries: Record<string, ComponentType<Pick<RegistryProps, "topicId" | "title">>> = {
  "foundations": lazy(() => import("./registries/foundations")),
  "python-ml-libs": lazy(() => import("./registries/python-ml-libs")),
  "data-preprocessing": lazy(() => import("./registries/data-preprocessing")),
  "supervised-learning": lazy(() => import("./registries/supervised-learning")),
  "ensemble-learning": lazy(() => import("./registries/ensemble-learning")),
  "unsupervised-learning": lazy(() => import("./registries/unsupervised-learning")),
  "model-evaluation": lazy(() => import("./registries/model-evaluation")),
  "time-series": lazy(() => import("./registries/time-series")),
  "advanced-paradigms": lazy(() => import("./registries/advanced-paradigms")),
  "deep-learning": lazy(() => import("./registries/deep-learning")),
  "advanced-deep-learning": lazy(() => import("./registries/advanced-deep-learning")),
  "generative-ai": lazy(() => import("./registries/generative-ai")),
  "large-language-models": lazy(() => import("./registries/large-language-models")),
  "agentic-ai": lazy(() => import("./registries/agentic-ai")),
  "projects": lazy(() => import("./registries/projects")),
  "ai-engineering-mlops": lazy(() => import("./registries/ai-engineering-mlops")),
  "interview-preparation": lazy(() => import("./registries/interview-preparation")),
};

export function LessonContentRegistry({ topicId, categoryId, title }: RegistryProps) {
  const Registry = registries[categoryId];
  return Registry ? <Registry topicId={topicId} title={title} /> : <GenericContent title={title} />;
}
