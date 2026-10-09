import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const ArimaContent = lazy(() => import("../timeseries/ArimaContent").then(m => ({ default: m.ArimaContent })));
const MovingAverageContent = lazy(() => import("../timeseries/MovingAverageContent").then(m => ({ default: m.MovingAverageContent })));
const ExponentialSmoothingContent = lazy(() => import("../timeseries/ExponentialSmoothingContent").then(m => ({ default: m.ExponentialSmoothingContent })));
const ForecastingBasicsContent = lazy(() => import("../timeseries/ForecastingBasicsContent").then(m => ({ default: m.ForecastingBasicsContent })));

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
