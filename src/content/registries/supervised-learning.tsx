import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const RegressionIntroContent = lazy(() => import("../supervised/RegressionIntroContent").then(m => ({ default: m.RegressionIntroContent })));
const LinearRegressionContent = lazy(() => import("../supervised/LinearRegressionContent").then(m => ({ default: m.LinearRegressionContent })));
const GradientDescentContent = lazy(() => import("../supervised/GradientDescentContent").then(m => ({ default: m.GradientDescentContent })));
const PolynomialRegressionContent = lazy(() => import("../supervised/PolynomialRegressionContent").then(m => ({ default: m.PolynomialRegressionContent })));
const RidgeRegressionContent = lazy(() => import("../supervised/RidgeRegressionContent").then(m => ({ default: m.RidgeRegressionContent })));
const LassoRegressionContent = lazy(() => import("../supervised/LassoRegressionContent").then(m => ({ default: m.LassoRegressionContent })));
const ClassificationIntroContent = lazy(() => import("../supervised/ClassificationIntroContent").then(m => ({ default: m.ClassificationIntroContent })));
const LogisticRegressionContent = lazy(() => import("../supervised/LogisticRegressionContent").then(m => ({ default: m.LogisticRegressionContent })));
const DecisionTreesContent = lazy(() => import("../supervised/DecisionTreesContent").then(m => ({ default: m.DecisionTreesContent })));
const NaiveBayesContent = lazy(() => import("../supervised/NaiveBayesContent").then(m => ({ default: m.NaiveBayesContent })));
const KNNContent = lazy(() => import("../supervised/KNNContent").then(m => ({ default: m.KNNContent })));
const SVMContent = lazy(() => import("../supervised/SVMContent").then(m => ({ default: m.SVMContent })));

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
