import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadArimaContent = () => import("../timeseries/ArimaContent");
const ArimaContent = lazy(() => loadArimaContent().then(m => ({ default: m.ArimaContent })));
const loadMovingAverageContent = () => import("../timeseries/MovingAverageContent");
const MovingAverageContent = lazy(() => loadMovingAverageContent().then(m => ({ default: m.MovingAverageContent })));
const loadExponentialSmoothingContent = () => import("../timeseries/ExponentialSmoothingContent");
const ExponentialSmoothingContent = lazy(() => loadExponentialSmoothingContent().then(m => ({ default: m.ExponentialSmoothingContent })));
const loadForecastingBasicsContent = () => import("../timeseries/ForecastingBasicsContent");
const ForecastingBasicsContent = lazy(() => loadForecastingBasicsContent().then(m => ({ default: m.ForecastingBasicsContent })));

const contentMap: Record<string, ComponentType> = {
  "arima": ArimaContent,
  "moving-average": MovingAverageContent,
  "exponential-smoothing": ExponentialSmoothingContent,
  "forecasting-basics": ForecastingBasicsContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "arima": () => loadArimaContent(),
  "moving-average": () => loadMovingAverageContent(),
  "exponential-smoothing": () => loadExponentialSmoothingContent(),
  "forecasting-basics": () => loadForecastingBasicsContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
