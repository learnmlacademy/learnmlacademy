import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const MLOpsContent = lazy(() => import("../mlops/MLOpsContent").then(m => ({ default: m.MLOpsContent })));

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
