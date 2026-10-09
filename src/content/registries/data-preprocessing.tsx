import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const EDAContent = lazy(() => import("../preprocessing/EDAContent").then(m => ({ default: m.EDAContent })));
const HandlingMissingDataContent = lazy(() => import("../preprocessing/HandlingMissingDataContent").then(m => ({ default: m.HandlingMissingDataContent })));
const EncodingCategoricalContent = lazy(() => import("../preprocessing/EncodingCategoricalContent").then(m => ({ default: m.EncodingCategoricalContent })));
const BiasVarianceContent = lazy(() => import("../evaluation/BiasVarianceContent").then(m => ({ default: m.BiasVarianceContent })));
const FeatureScalingContent = lazy(() => import("../preprocessing/FeatureScalingContent").then(m => ({ default: m.FeatureScalingContent })));
const FeatureEngineeringContent = lazy(() => import("../preprocessing/FeatureEngineeringContent").then(m => ({ default: m.FeatureEngineeringContent })));
const FeatureSelectionContent = lazy(() => import("../preprocessing/FeatureSelectionContent").then(m => ({ default: m.FeatureSelectionContent })));
const DataVisualizationContent = lazy(() => import("../preprocessing/DataVisualizationContent").then(m => ({ default: m.DataVisualizationContent })));

const contentMap: Record<string, ComponentType> = {
  "eda": EDAContent,
  "handling-missing-data": HandlingMissingDataContent,
  "encoding-categorical": EncodingCategoricalContent,
  "bias-variance": BiasVarianceContent,
  "feature-scaling": FeatureScalingContent,
  "feature-engineering": FeatureEngineeringContent,
  "feature-selection": FeatureSelectionContent,
  "data-visualization": DataVisualizationContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
