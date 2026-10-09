import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const TrainTestSplitContent = lazy(() => import("../evaluation/TrainTestSplitContent").then(m => ({ default: m.TrainTestSplitContent })));
const CrossValidationContent = lazy(() => import("../evaluation/CrossValidationContent").then(m => ({ default: m.CrossValidationContent })));
const OverfittingUnderfittingContent = lazy(() => import("../evaluation/OverfittingUnderfittingContent").then(m => ({ default: m.OverfittingUnderfittingContent })));
const CostFunctionsContent = lazy(() => import("../evaluation/CostFunctionsContent").then(m => ({ default: m.CostFunctionsContent })));
const HyperparameterTuningContent = lazy(() => import("../evaluation/HyperparameterTuningContent").then(m => ({ default: m.HyperparameterTuningContent })));
const GridRandomSearchContent = lazy(() => import("../evaluation/GridRandomSearchContent").then(m => ({ default: m.GridRandomSearchContent })));
const ConfusionMatrixContent = lazy(() => import("../evaluation/ConfusionMatrixContent").then(m => ({ default: m.ConfusionMatrixContent })));
const RocAucContent = lazy(() => import("../evaluation/RocAucContent").then(m => ({ default: m.RocAucContent })));

const contentMap: Record<string, ComponentType> = {
  "train-test-split": TrainTestSplitContent,
  "cross-validation": CrossValidationContent,
  "overfitting-underfitting": OverfittingUnderfittingContent,
  "cost-functions": CostFunctionsContent,
  "hyperparameter-tuning": HyperparameterTuningContent,
  "grid-random-search": GridRandomSearchContent,
  "confusion-matrix": ConfusionMatrixContent,
  "roc-auc": RocAucContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
