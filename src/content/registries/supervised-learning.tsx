import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadRegressionIntroContent = () => import("../supervised/RegressionIntroContent");
const RegressionIntroContent = lazy(() => loadRegressionIntroContent().then(m => ({ default: m.RegressionIntroContent })));
const loadLinearRegressionContent = () => import("../supervised/LinearRegressionContent");
const LinearRegressionContent = lazy(() => loadLinearRegressionContent().then(m => ({ default: m.LinearRegressionContent })));
const loadGradientDescentContent = () => import("../supervised/GradientDescentContent");
const GradientDescentContent = lazy(() => loadGradientDescentContent().then(m => ({ default: m.GradientDescentContent })));
const loadPolynomialRegressionContent = () => import("../supervised/PolynomialRegressionContent");
const PolynomialRegressionContent = lazy(() => loadPolynomialRegressionContent().then(m => ({ default: m.PolynomialRegressionContent })));
const loadRidgeRegressionContent = () => import("../supervised/RidgeRegressionContent");
const RidgeRegressionContent = lazy(() => loadRidgeRegressionContent().then(m => ({ default: m.RidgeRegressionContent })));
const loadLassoRegressionContent = () => import("../supervised/LassoRegressionContent");
const LassoRegressionContent = lazy(() => loadLassoRegressionContent().then(m => ({ default: m.LassoRegressionContent })));
const loadClassificationIntroContent = () => import("../supervised/ClassificationIntroContent");
const ClassificationIntroContent = lazy(() => loadClassificationIntroContent().then(m => ({ default: m.ClassificationIntroContent })));
const loadLogisticRegressionContent = () => import("../supervised/LogisticRegressionContent");
const LogisticRegressionContent = lazy(() => loadLogisticRegressionContent().then(m => ({ default: m.LogisticRegressionContent })));
const loadDecisionTreesContent = () => import("../supervised/DecisionTreesContent");
const DecisionTreesContent = lazy(() => loadDecisionTreesContent().then(m => ({ default: m.DecisionTreesContent })));
const loadNaiveBayesContent = () => import("../supervised/NaiveBayesContent");
const NaiveBayesContent = lazy(() => loadNaiveBayesContent().then(m => ({ default: m.NaiveBayesContent })));
const loadKNNContent = () => import("../supervised/KNNContent");
const KNNContent = lazy(() => loadKNNContent().then(m => ({ default: m.KNNContent })));
const loadSVMContent = () => import("../supervised/SVMContent");
const SVMContent = lazy(() => loadSVMContent().then(m => ({ default: m.SVMContent })));

const contentMap: Record<string, ComponentType> = {
  "regression-intro": RegressionIntroContent,
  "linear-regression": LinearRegressionContent,
  "gradient-descent": GradientDescentContent,
  "polynomial-regression": PolynomialRegressionContent,
  "ridge-regression": RidgeRegressionContent,
  "lasso-regression": LassoRegressionContent,
  "classification-intro": ClassificationIntroContent,
  "logistic-regression": LogisticRegressionContent,
  "decision-trees": DecisionTreesContent,
  "naive-bayes": NaiveBayesContent,
  "knn": KNNContent,
  "svm": SVMContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "regression-intro": () => loadRegressionIntroContent(),
  "linear-regression": () => loadLinearRegressionContent(),
  "gradient-descent": () => loadGradientDescentContent(),
  "polynomial-regression": () => loadPolynomialRegressionContent(),
  "ridge-regression": () => loadRidgeRegressionContent(),
  "lasso-regression": () => loadLassoRegressionContent(),
  "classification-intro": () => loadClassificationIntroContent(),
  "logistic-regression": () => loadLogisticRegressionContent(),
  "decision-trees": () => loadDecisionTreesContent(),
  "naive-bayes": () => loadNaiveBayesContent(),
  "knn": () => loadKNNContent(),
  "svm": () => loadSVMContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
