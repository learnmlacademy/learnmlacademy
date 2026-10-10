import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadTrainTestSplitContent = () => import("../evaluation/TrainTestSplitContent");
const TrainTestSplitContent = lazy(() => loadTrainTestSplitContent().then(m => ({ default: m.TrainTestSplitContent })));
const loadCrossValidationContent = () => import("../evaluation/CrossValidationContent");
const CrossValidationContent = lazy(() => loadCrossValidationContent().then(m => ({ default: m.CrossValidationContent })));
const loadOverfittingUnderfittingContent = () => import("../evaluation/OverfittingUnderfittingContent");
const OverfittingUnderfittingContent = lazy(() => loadOverfittingUnderfittingContent().then(m => ({ default: m.OverfittingUnderfittingContent })));
const loadCostFunctionsContent = () => import("../evaluation/CostFunctionsContent");
const CostFunctionsContent = lazy(() => loadCostFunctionsContent().then(m => ({ default: m.CostFunctionsContent })));
const loadHyperparameterTuningContent = () => import("../evaluation/HyperparameterTuningContent");
const HyperparameterTuningContent = lazy(() => loadHyperparameterTuningContent().then(m => ({ default: m.HyperparameterTuningContent })));
const loadGridRandomSearchContent = () => import("../evaluation/GridRandomSearchContent");
const GridRandomSearchContent = lazy(() => loadGridRandomSearchContent().then(m => ({ default: m.GridRandomSearchContent })));
const loadConfusionMatrixContent = () => import("../evaluation/ConfusionMatrixContent");
const ConfusionMatrixContent = lazy(() => loadConfusionMatrixContent().then(m => ({ default: m.ConfusionMatrixContent })));
const loadRocAucContent = () => import("../evaluation/RocAucContent");
const RocAucContent = lazy(() => loadRocAucContent().then(m => ({ default: m.RocAucContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "train-test-split": () => loadTrainTestSplitContent(),
  "cross-validation": () => loadCrossValidationContent(),
  "overfitting-underfitting": () => loadOverfittingUnderfittingContent(),
  "cost-functions": () => loadCostFunctionsContent(),
  "hyperparameter-tuning": () => loadHyperparameterTuningContent(),
  "grid-random-search": () => loadGridRandomSearchContent(),
  "confusion-matrix": () => loadConfusionMatrixContent(),
  "roc-auc": () => loadRocAucContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
