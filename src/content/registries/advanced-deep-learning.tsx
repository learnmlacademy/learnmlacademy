import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadStateSpaceModelsContent = () => import("../deeplearning/StateSpaceModelsContent");
const StateSpaceModelsContent = lazy(() => loadStateSpaceModelsContent().then(m => ({ default: m.StateSpaceModelsContent })));
const loadDeepLearningNLPContent = () => import("../deeplearning/DeepLearningNLPContent");
const DeepLearningNLPContent = lazy(() => loadDeepLearningNLPContent().then(m => ({ default: m.DeepLearningNLPContent })));
const loadScientificNetworksContent = () => import("../deeplearning/ScientificNetworksContent");
const ScientificNetworksContent = lazy(() => loadScientificNetworksContent().then(m => ({ default: m.ScientificNetworksContent })));

const contentMap: Record<string, ComponentType> = {
  "state-space-models": StateSpaceModelsContent,
  "deep-learning-nlp": DeepLearningNLPContent,
  "pinn-kan-topological-networks": ScientificNetworksContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "state-space-models": () => loadStateSpaceModelsContent(),
  "deep-learning-nlp": () => loadDeepLearningNLPContent(),
  "pinn-kan-topological-networks": () => loadScientificNetworksContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
