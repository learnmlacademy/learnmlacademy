import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const WhatIsMLContent = lazy(() => import("../foundations/WhatIsMLContent").then(m => ({ default: m.WhatIsMLContent })));
const TypesOfMLContent = lazy(() => import("../foundations/TypesOfMLContent").then(m => ({ default: m.TypesOfMLContent })));
const SupervisedIntroContent = lazy(() => import("../foundations/SupervisedIntroContent").then(m => ({ default: m.SupervisedIntroContent })));
const UnsupervisedIntroContent = lazy(() => import("../foundations/UnsupervisedIntroContent").then(m => ({ default: m.UnsupervisedIntroContent })));
const ReinforcementIntroContent = lazy(() => import("../foundations/ReinforcementIntroContent").then(m => ({ default: m.ReinforcementIntroContent })));
const BatchVsOnlineContent = lazy(() => import("../foundations/BatchVsOnlineContent").then(m => ({ default: m.BatchVsOnlineContent })));
const MLLifecycleContent = lazy(() => import("../foundations/MLLifecycleContent").then(m => ({ default: m.MLLifecycleContent })));

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
