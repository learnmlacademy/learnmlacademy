import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadKMeansContent = () => import("../unsupervised/KMeansContent");
const KMeansContent = lazy(() => loadKMeansContent().then(m => ({ default: m.KMeansContent })));
const loadHierarchicalContent = () => import("../unsupervised/HierarchicalContent");
const HierarchicalContent = lazy(() => loadHierarchicalContent().then(m => ({ default: m.HierarchicalContent })));
const loadDBSCANContent = () => import("../unsupervised/DBSCANContent");
const DBSCANContent = lazy(() => loadDBSCANContent().then(m => ({ default: m.DBSCANContent })));
const loadPCAContent = () => import("../unsupervised/PCAContent");
const PCAContent = lazy(() => loadPCAContent().then(m => ({ default: m.PCAContent })));
const loadTSNEContent = () => import("../unsupervised/TSNEContent");
const TSNEContent = lazy(() => loadTSNEContent().then(m => ({ default: m.TSNEContent })));
const loadAssociationRulesContent = () => import("../unsupervised/AssociationRulesContent");
const AssociationRulesContent = lazy(() => loadAssociationRulesContent().then(m => ({ default: m.AssociationRulesContent })));
const loadAprioriContent = () => import("../unsupervised/AprioriContent");
const AprioriContent = lazy(() => loadAprioriContent().then(m => ({ default: m.AprioriContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "kmeans": () => loadKMeansContent(),
  "hierarchical": () => loadHierarchicalContent(),
  "dbscan": () => loadDBSCANContent(),
  "pca": () => loadPCAContent(),
  "tsne": () => loadTSNEContent(),
  "association-rules": () => loadAssociationRulesContent(),
  "apriori": () => loadAprioriContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
