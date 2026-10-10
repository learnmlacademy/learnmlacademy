import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadProjectsContent = () => import("../projects/ProjectsContent");
const ProjectsContent = lazy(() => loadProjectsContent().then(m => ({ default: m.ProjectsContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "project-customer-churn": () => loadProjectsContent(),
  "project-credit-risk": () => loadProjectsContent(),
  "project-sales-forecasting": () => loadProjectsContent(),
  "project-image-classification": () => loadProjectsContent(),
  "project-genai-app": () => loadProjectsContent(),
  "project-rag-document-qa": () => loadProjectsContent(),
  "project-ai-agent": () => loadProjectsContent(),
  "project-multi-agent-research": () => loadProjectsContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
