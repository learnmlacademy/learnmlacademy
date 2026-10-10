import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadMLOpsContent = () => import("../mlops/MLOpsContent");
const MLOpsContent = lazy(() => loadMLOpsContent().then(m => ({ default: m.MLOpsContent })));

const contentMap: Record<string, ComponentType> = {
  "ai-engineering-mlops": MLOpsContent,
  "ml-data-feature-pipelines": MLOpsContent,
  "experiment-tracking-model-registry": MLOpsContent,
  "batch-online-inference": MLOpsContent,
  "ml-cicd-continuous-training": MLOpsContent,
  "ml-monitoring-drift": MLOpsContent,
  "production-ai-reliability": MLOpsContent,
  "ml-system-design": MLOpsContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "ai-engineering-mlops": () => loadMLOpsContent(),
  "ml-data-feature-pipelines": () => loadMLOpsContent(),
  "experiment-tracking-model-registry": () => loadMLOpsContent(),
  "batch-online-inference": () => loadMLOpsContent(),
  "ml-cicd-continuous-training": () => loadMLOpsContent(),
  "ml-monitoring-drift": () => loadMLOpsContent(),
  "production-ai-reliability": () => loadMLOpsContent(),
  "ml-system-design": () => loadMLOpsContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
