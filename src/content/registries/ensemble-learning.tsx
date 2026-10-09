import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const RandomForestContent = lazy(() => import("../ensemble/RandomForestContent").then(m => ({ default: m.RandomForestContent })));
const BaggingContent = lazy(() => import("../ensemble/BaggingContent").then(m => ({ default: m.BaggingContent })));
const BoostingContent = lazy(() => import("../ensemble/BoostingContent").then(m => ({ default: m.BoostingContent })));
const AdaBoostContent = lazy(() => import("../ensemble/AdaBoostContent").then(m => ({ default: m.AdaBoostContent })));
const GradientBoostingContent = lazy(() => import("../ensemble/GradientBoostingContent").then(m => ({ default: m.GradientBoostingContent })));
const XGBoostContent = lazy(() => import("../ensemble/XGBoostContent").then(m => ({ default: m.XGBoostContent })));

const contentMap: Record<string, ComponentType> = {
  "random-forest": RandomForestContent,
  "bagging": BaggingContent,
  "boosting": BoostingContent,
  "adaboost": AdaBoostContent,
  "gradient-boosting": GradientBoostingContent,
  "xgboost": XGBoostContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
