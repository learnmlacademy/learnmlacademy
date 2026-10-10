import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadWhatIsMLContent = () => import("../foundations/WhatIsMLContent");
const WhatIsMLContent = lazy(() => loadWhatIsMLContent().then(m => ({ default: m.WhatIsMLContent })));
const loadTypesOfMLContent = () => import("../foundations/TypesOfMLContent");
const TypesOfMLContent = lazy(() => loadTypesOfMLContent().then(m => ({ default: m.TypesOfMLContent })));
const loadSupervisedIntroContent = () => import("../foundations/SupervisedIntroContent");
const SupervisedIntroContent = lazy(() => loadSupervisedIntroContent().then(m => ({ default: m.SupervisedIntroContent })));
const loadUnsupervisedIntroContent = () => import("../foundations/UnsupervisedIntroContent");
const UnsupervisedIntroContent = lazy(() => loadUnsupervisedIntroContent().then(m => ({ default: m.UnsupervisedIntroContent })));
const loadReinforcementIntroContent = () => import("../foundations/ReinforcementIntroContent");
const ReinforcementIntroContent = lazy(() => loadReinforcementIntroContent().then(m => ({ default: m.ReinforcementIntroContent })));
const loadBatchVsOnlineContent = () => import("../foundations/BatchVsOnlineContent");
const BatchVsOnlineContent = lazy(() => loadBatchVsOnlineContent().then(m => ({ default: m.BatchVsOnlineContent })));
const loadMLLifecycleContent = () => import("../foundations/MLLifecycleContent");
const MLLifecycleContent = lazy(() => loadMLLifecycleContent().then(m => ({ default: m.MLLifecycleContent })));

const contentMap: Record<string, ComponentType> = {
  "what-is-ml": WhatIsMLContent,
  "types-of-ml": TypesOfMLContent,
  "supervised-learning-intro": SupervisedIntroContent,
  "unsupervised-learning-intro": UnsupervisedIntroContent,
  "reinforcement-learning-intro": ReinforcementIntroContent,
  "batch-vs-online": BatchVsOnlineContent,
  "ml-lifecycle": MLLifecycleContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "what-is-ml": () => loadWhatIsMLContent(),
  "types-of-ml": () => loadTypesOfMLContent(),
  "supervised-learning-intro": () => loadSupervisedIntroContent(),
  "unsupervised-learning-intro": () => loadUnsupervisedIntroContent(),
  "reinforcement-learning-intro": () => loadReinforcementIntroContent(),
  "batch-vs-online": () => loadBatchVsOnlineContent(),
  "ml-lifecycle": () => loadMLLifecycleContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
