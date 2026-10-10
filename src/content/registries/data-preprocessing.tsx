import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadEDAContent = () => import("../preprocessing/EDAContent");
const EDAContent = lazy(() => loadEDAContent().then(m => ({ default: m.EDAContent })));
const loadHandlingMissingDataContent = () => import("../preprocessing/HandlingMissingDataContent");
const HandlingMissingDataContent = lazy(() => loadHandlingMissingDataContent().then(m => ({ default: m.HandlingMissingDataContent })));
const loadEncodingCategoricalContent = () => import("../preprocessing/EncodingCategoricalContent");
const EncodingCategoricalContent = lazy(() => loadEncodingCategoricalContent().then(m => ({ default: m.EncodingCategoricalContent })));
const loadBiasVarianceContent = () => import("../evaluation/BiasVarianceContent");
const BiasVarianceContent = lazy(() => loadBiasVarianceContent().then(m => ({ default: m.BiasVarianceContent })));
const loadFeatureScalingContent = () => import("../preprocessing/FeatureScalingContent");
const FeatureScalingContent = lazy(() => loadFeatureScalingContent().then(m => ({ default: m.FeatureScalingContent })));
const loadFeatureEngineeringContent = () => import("../preprocessing/FeatureEngineeringContent");
const FeatureEngineeringContent = lazy(() => loadFeatureEngineeringContent().then(m => ({ default: m.FeatureEngineeringContent })));
const loadFeatureSelectionContent = () => import("../preprocessing/FeatureSelectionContent");
const FeatureSelectionContent = lazy(() => loadFeatureSelectionContent().then(m => ({ default: m.FeatureSelectionContent })));
const loadDataVisualizationContent = () => import("../preprocessing/DataVisualizationContent");
const DataVisualizationContent = lazy(() => loadDataVisualizationContent().then(m => ({ default: m.DataVisualizationContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "eda": () => loadEDAContent(),
  "handling-missing-data": () => loadHandlingMissingDataContent(),
  "encoding-categorical": () => loadEncodingCategoricalContent(),
  "bias-variance": () => loadBiasVarianceContent(),
  "feature-scaling": () => loadFeatureScalingContent(),
  "feature-engineering": () => loadFeatureEngineeringContent(),
  "feature-selection": () => loadFeatureSelectionContent(),
  "data-visualization": () => loadDataVisualizationContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
