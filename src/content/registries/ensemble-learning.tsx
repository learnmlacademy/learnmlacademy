import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadRandomForestContent = () => import("../ensemble/RandomForestContent");
const RandomForestContent = lazy(() => loadRandomForestContent().then(m => ({ default: m.RandomForestContent })));
const loadBaggingContent = () => import("../ensemble/BaggingContent");
const BaggingContent = lazy(() => loadBaggingContent().then(m => ({ default: m.BaggingContent })));
const loadBoostingContent = () => import("../ensemble/BoostingContent");
const BoostingContent = lazy(() => loadBoostingContent().then(m => ({ default: m.BoostingContent })));
const loadAdaBoostContent = () => import("../ensemble/AdaBoostContent");
const AdaBoostContent = lazy(() => loadAdaBoostContent().then(m => ({ default: m.AdaBoostContent })));
const loadGradientBoostingContent = () => import("../ensemble/GradientBoostingContent");
const GradientBoostingContent = lazy(() => loadGradientBoostingContent().then(m => ({ default: m.GradientBoostingContent })));
const loadXGBoostContent = () => import("../ensemble/XGBoostContent");
const XGBoostContent = lazy(() => loadXGBoostContent().then(m => ({ default: m.XGBoostContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "random-forest": () => loadRandomForestContent(),
  "bagging": () => loadBaggingContent(),
  "boosting": () => loadBoostingContent(),
  "adaboost": () => loadAdaBoostContent(),
  "gradient-boosting": () => loadGradientBoostingContent(),
  "xgboost": () => loadXGBoostContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
