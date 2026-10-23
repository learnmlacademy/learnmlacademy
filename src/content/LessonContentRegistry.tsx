import { lazy, type ComponentType } from "react";
import { GenericContent } from "./GenericContent";

type RegistryProps = { topicId: string; categoryId: string; title: string };

type RegistryModule = {
  default: ComponentType<Pick<RegistryProps, "topicId" | "title">>;
  preloadLessonContent?: (topicId: string) => Promise<unknown>;
};

const registryLoaders: Record<string, () => Promise<RegistryModule>> = {
  "foundations": () => import("./registries/foundations"),
  "python-ml-libs": () => import("./registries/python-ml-libs"),
  "data-preprocessing": () => import("./registries/data-preprocessing"),
  "supervised-learning": () => import("./registries/supervised-learning"),
  "ensemble-learning": () => import("./registries/ensemble-learning"),
  "unsupervised-learning": () => import("./registries/unsupervised-learning"),
  "model-evaluation": () => import("./registries/model-evaluation"),
  "time-series": () => import("./registries/time-series"),
  "advanced-paradigms": () => import("./registries/advanced-paradigms"),
  "deep-learning": () => import("./registries/deep-learning"),
  "advanced-deep-learning": () => import("./registries/advanced-deep-learning"),
  "generative-ai": () => import("./registries/generative-ai"),
  "large-language-models": () => import("./registries/large-language-models"),
  "agentic-ai": () => import("./registries/agentic-ai"),
  "projects": () => import("./registries/projects"),
  "ai-engineering-mlops": () => import("./registries/ai-engineering-mlops"),
  "interview-preparation": () => import("./registries/interview-preparation"),
};

const registries: Record<string, ComponentType<Pick<RegistryProps, "topicId" | "title">>> =
  Object.fromEntries(
    Object.entries(registryLoaders).map(([categoryId, load]) => [categoryId, lazy(load)]),
  );

export async function preloadLessonContent(categoryId: string, topicId: string): Promise<void> {
  const loadRegistry = registryLoaders[categoryId];
  if (!loadRegistry) return;

  const registryModule = await loadRegistry();
  await registryModule.preloadLessonContent?.(topicId);
}

export function LessonContentRegistry({ topicId, categoryId, title }: RegistryProps) {
  const Registry = registries[categoryId];
  return Registry ? <Registry topicId={topicId} title={title} /> : <GenericContent title={title} />;
}
