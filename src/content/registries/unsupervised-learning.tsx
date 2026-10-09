import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const KMeansContent = lazy(() => import("../unsupervised/KMeansContent").then(m => ({ default: m.KMeansContent })));
const HierarchicalContent = lazy(() => import("../unsupervised/HierarchicalContent").then(m => ({ default: m.HierarchicalContent })));
const DBSCANContent = lazy(() => import("../unsupervised/DBSCANContent").then(m => ({ default: m.DBSCANContent })));
const PCAContent = lazy(() => import("../unsupervised/PCAContent").then(m => ({ default: m.PCAContent })));
const TSNEContent = lazy(() => import("../unsupervised/TSNEContent").then(m => ({ default: m.TSNEContent })));
const AssociationRulesContent = lazy(() => import("../unsupervised/AssociationRulesContent").then(m => ({ default: m.AssociationRulesContent })));
const AprioriContent = lazy(() => import("../unsupervised/AprioriContent").then(m => ({ default: m.AprioriContent })));

const contentMap: Record<string, ComponentType> = {
  "kmeans": KMeansContent,
  "hierarchical": HierarchicalContent,
  "dbscan": DBSCANContent,
  "pca": PCAContent,
  "tsne": TSNEContent,
  "association-rules": AssociationRulesContent,
  "apriori": AprioriContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
