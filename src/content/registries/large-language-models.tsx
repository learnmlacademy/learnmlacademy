import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const LLMConsolidatedContent = lazy(() => import("../modernai/LLMConsolidatedContent").then(m => ({ default: m.LLMConsolidatedContent })));

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
