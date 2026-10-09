import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const ProjectsContent = lazy(() => import("../projects/ProjectsContent").then(m => ({ default: m.ProjectsContent })));

const contentMap: Record<string, ComponentType> = {
  "project-customer-churn": ProjectsContent,
  "project-credit-risk": ProjectsContent,
  "project-sales-forecasting": ProjectsContent,
  "project-image-classification": ProjectsContent,
  "project-genai-app": ProjectsContent,
  "project-rag-document-qa": ProjectsContent,
  "project-ai-agent": ProjectsContent,
  "project-multi-agent-research": ProjectsContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
