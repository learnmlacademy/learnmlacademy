import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const PythonForMLContent = lazy(() => import("../python/PythonForMLContent").then(m => ({ default: m.PythonForMLContent })));
const NumpyContent = lazy(() => import("../python/NumpyContent").then(m => ({ default: m.NumpyContent })));
const PandasContent = lazy(() => import("../python/PandasContent").then(m => ({ default: m.PandasContent })));
const ScikitLearnContent = lazy(() => import("../python/ScikitLearnContent").then(m => ({ default: m.ScikitLearnContent })));

const contentMap: Record<string, ComponentType> = {
  "python-for-ml": PythonForMLContent,
  "numpy-essentials": NumpyContent,
  "pandas-essentials": PandasContent,
  "scikit-learn-essentials": ScikitLearnContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
