import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadPythonForMLContent = () => import("../python/PythonForMLContent");
const PythonForMLContent = lazy(() => loadPythonForMLContent().then(m => ({ default: m.PythonForMLContent })));
const loadNumpyContent = () => import("../python/NumpyContent");
const NumpyContent = lazy(() => loadNumpyContent().then(m => ({ default: m.NumpyContent })));
const loadPandasContent = () => import("../python/PandasContent");
const PandasContent = lazy(() => loadPandasContent().then(m => ({ default: m.PandasContent })));
const loadScikitLearnContent = () => import("../python/ScikitLearnContent");
const ScikitLearnContent = lazy(() => loadScikitLearnContent().then(m => ({ default: m.ScikitLearnContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "python-for-ml": () => loadPythonForMLContent(),
  "numpy-essentials": () => loadNumpyContent(),
  "pandas-essentials": () => loadPandasContent(),
  "scikit-learn-essentials": () => loadScikitLearnContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
