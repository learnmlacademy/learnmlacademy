import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const SemiSupervisedContent = lazy(() => import("../advanced/SemiSupervisedContent").then(m => ({ default: m.SemiSupervisedContent })));
const OnlineLearningContent = lazy(() => import("../advanced/OnlineLearningContent").then(m => ({ default: m.OnlineLearningContent })));
const ReinforcementLearningAdvContent = lazy(() => import("../advanced/ReinforcementLearningAdvContent").then(m => ({ default: m.ReinforcementLearningAdvContent })));
const MultiArmedBanditsContent = lazy(() => import("../advanced/MultiArmedBanditsContent").then(m => ({ default: m.MultiArmedBanditsContent })));

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
