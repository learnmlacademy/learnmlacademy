import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const CareerInterviewContent = lazy(() => import("../interview/CareerInterviewContent").then(m => ({ default: m.CareerInterviewContent })));

const contentMap: Record<string, ComponentType> = {
  "ai-data-career-paths": CareerInterviewContent,
  "ml-engineer-roadmap": CareerInterviewContent,
  "ai-engineer-roadmap": CareerInterviewContent,
  "genai-llm-engineer-roadmap": CareerInterviewContent,
  "data-scientist-roadmap": CareerInterviewContent,
  "interview-preparation-strategy": CareerInterviewContent,
  "ml-interview-questions": CareerInterviewContent,
  "deep-learning-interview-questions": CareerInterviewContent,
  "genai-llm-rag-interview": CareerInterviewContent,
  "agentic-ai-interview": CareerInterviewContent,
  "python-ai-ml-interview": CareerInterviewContent,
  "sql-ai-data-interview": CareerInterviewContent,
  "ml-ai-system-design-interview": CareerInterviewContent,
  "mlops-production-interview": CareerInterviewContent,
  "behavioral-project-interview": CareerInterviewContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
