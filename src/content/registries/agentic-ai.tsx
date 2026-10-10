import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadModernAIContent = () => import("../modernai/ModernAIContent");
const ModernAIContent = lazy(() => loadModernAIContent().then(m => ({ default: m.ModernAIContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "agentic-ai-intro": () => loadModernAIContent(),
  "tool-calling": () => loadModernAIContent(),
  "building-ai-agent": () => loadModernAIContent(),
  "planning-reflection": () => loadModernAIContent(),
  "agent-context-engineering": () => loadModernAIContent(),
  "agent-memory": () => loadModernAIContent(),
  "agent-state-graphs": () => loadModernAIContent(),
  "durable-long-running-agents": () => loadModernAIContent(),
  "agentic-rag": () => loadModernAIContent(),
  "multi-agent-systems": () => loadModernAIContent(),
  "model-context-protocol": () => loadModernAIContent(),
  "agent-frameworks": () => loadModernAIContent(),
  "browser-computer-use-agents": () => loadModernAIContent(),
  "agent-security": () => loadModernAIContent(),
  "agent-evaluation-safety": () => loadModernAIContent(),
  "agent-observability-deployment": () => loadModernAIContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
