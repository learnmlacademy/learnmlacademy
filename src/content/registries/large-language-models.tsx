import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadLLMConsolidatedContent = () => import("../modernai/LLMConsolidatedContent");
const LLMConsolidatedContent = lazy(() => loadLLMConsolidatedContent().then(m => ({ default: m.LLMConsolidatedContent })));

const contentMap: Record<string, ComponentType> = {
  "llm-intro": LLMConsolidatedContent,
  "tokenization-embeddings": LLMConsolidatedContent,
  "transformers-attention": LLMConsolidatedContent,
  "text-generation-decoding": LLMConsolidatedContent,
  "prompt-engineering": LLMConsolidatedContent,
  "pretraining-finetuning": LLMConsolidatedContent,
  "instruction-tuning-rlhf": LLMConsolidatedContent,
  "rag": LLMConsolidatedContent,
  "semantic-search-embeddings": LLMConsolidatedContent,
  "vector-databases": LLMConsolidatedContent,
  "advanced-rag": LLMConsolidatedContent,
  "llm-evaluation": LLMConsolidatedContent,
  "llm-hallucinations-safety": LLMConsolidatedContent,
  "reasoning-models": LLMConsolidatedContent,
  "efficient-llm-serving": LLMConsolidatedContent,
  "llmops": LLMConsolidatedContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "llm-intro": () => loadLLMConsolidatedContent(),
  "tokenization-embeddings": () => loadLLMConsolidatedContent(),
  "transformers-attention": () => loadLLMConsolidatedContent(),
  "text-generation-decoding": () => loadLLMConsolidatedContent(),
  "prompt-engineering": () => loadLLMConsolidatedContent(),
  "pretraining-finetuning": () => loadLLMConsolidatedContent(),
  "instruction-tuning-rlhf": () => loadLLMConsolidatedContent(),
  "rag": () => loadLLMConsolidatedContent(),
  "semantic-search-embeddings": () => loadLLMConsolidatedContent(),
  "vector-databases": () => loadLLMConsolidatedContent(),
  "advanced-rag": () => loadLLMConsolidatedContent(),
  "llm-evaluation": () => loadLLMConsolidatedContent(),
  "llm-hallucinations-safety": () => loadLLMConsolidatedContent(),
  "reasoning-models": () => loadLLMConsolidatedContent(),
  "efficient-llm-serving": () => loadLLMConsolidatedContent(),
  "llmops": () => loadLLMConsolidatedContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
