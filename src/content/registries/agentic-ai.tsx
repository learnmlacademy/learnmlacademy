import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const ModernAIContent = lazy(() => import("../modernai/ModernAIContent").then(m => ({ default: m.ModernAIContent })));

const contentMap: Record<string, ComponentType> = {
  "agentic-ai-intro": ModernAIContent,
  "tool-calling": ModernAIContent,
  "building-ai-agent": ModernAIContent,
  "planning-reflection": ModernAIContent,
  "agent-context-engineering": ModernAIContent,
  "agent-memory": ModernAIContent,
  "agent-state-graphs": ModernAIContent,
  "durable-long-running-agents": ModernAIContent,
  "agentic-rag": ModernAIContent,
  "multi-agent-systems": ModernAIContent,
  "model-context-protocol": ModernAIContent,
  "agent-frameworks": ModernAIContent,
  "browser-computer-use-agents": ModernAIContent,
  "agent-security": ModernAIContent,
  "agent-evaluation-safety": ModernAIContent,
  "agent-observability-deployment": ModernAIContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
