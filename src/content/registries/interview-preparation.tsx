import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadCareerInterviewContent = () => import("../interview/CareerInterviewContent");
const CareerInterviewContent = lazy(() => loadCareerInterviewContent().then(m => ({ default: m.CareerInterviewContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "ai-data-career-paths": () => loadCareerInterviewContent(),
  "ml-engineer-roadmap": () => loadCareerInterviewContent(),
  "ai-engineer-roadmap": () => loadCareerInterviewContent(),
  "genai-llm-engineer-roadmap": () => loadCareerInterviewContent(),
  "data-scientist-roadmap": () => loadCareerInterviewContent(),
  "interview-preparation-strategy": () => loadCareerInterviewContent(),
  "ml-interview-questions": () => loadCareerInterviewContent(),
  "deep-learning-interview-questions": () => loadCareerInterviewContent(),
  "genai-llm-rag-interview": () => loadCareerInterviewContent(),
  "agentic-ai-interview": () => loadCareerInterviewContent(),
  "python-ai-ml-interview": () => loadCareerInterviewContent(),
  "sql-ai-data-interview": () => loadCareerInterviewContent(),
  "ml-ai-system-design-interview": () => loadCareerInterviewContent(),
  "mlops-production-interview": () => loadCareerInterviewContent(),
  "behavioral-project-interview": () => loadCareerInterviewContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
