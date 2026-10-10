import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadSemiSupervisedContent = () => import("../advanced/SemiSupervisedContent");
const SemiSupervisedContent = lazy(() => loadSemiSupervisedContent().then(m => ({ default: m.SemiSupervisedContent })));
const loadOnlineLearningContent = () => import("../advanced/OnlineLearningContent");
const OnlineLearningContent = lazy(() => loadOnlineLearningContent().then(m => ({ default: m.OnlineLearningContent })));
const loadReinforcementLearningAdvContent = () => import("../advanced/ReinforcementLearningAdvContent");
const ReinforcementLearningAdvContent = lazy(() => loadReinforcementLearningAdvContent().then(m => ({ default: m.ReinforcementLearningAdvContent })));
const loadMultiArmedBanditsContent = () => import("../advanced/MultiArmedBanditsContent");
const MultiArmedBanditsContent = lazy(() => loadMultiArmedBanditsContent().then(m => ({ default: m.MultiArmedBanditsContent })));

const contentMap: Record<string, ComponentType> = {
  "semi-supervised": SemiSupervisedContent,
  "online-learning": OnlineLearningContent,
  "reinforcement-learning-adv": ReinforcementLearningAdvContent,
  "multi-armed-bandits": MultiArmedBanditsContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "semi-supervised": () => loadSemiSupervisedContent(),
  "online-learning": () => loadOnlineLearningContent(),
  "reinforcement-learning-adv": () => loadReinforcementLearningAdvContent(),
  "multi-armed-bandits": () => loadMultiArmedBanditsContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
