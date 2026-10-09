import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const StateSpaceModelsContent = lazy(() => import("../deeplearning/StateSpaceModelsContent").then(m => ({ default: m.StateSpaceModelsContent })));
const DeepLearningNLPContent = lazy(() => import("../deeplearning/DeepLearningNLPContent").then(m => ({ default: m.DeepLearningNLPContent })));
const ScientificNetworksContent = lazy(() => import("../deeplearning/ScientificNetworksContent").then(m => ({ default: m.ScientificNetworksContent })));

const contentMap: Record<string, ComponentType> = {
  "state-space-models": StateSpaceModelsContent,
  "deep-learning-nlp": DeepLearningNLPContent,
  "pinn-kan-topological-networks": ScientificNetworksContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
