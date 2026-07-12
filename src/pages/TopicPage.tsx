import React, { useEffect, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { getTopicById, curriculum } from "../data/curriculum";
import { getSEOData, getCanonicalUrl, getLearningResourceSchema } from "../utils/seo";
import {
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import { GenericContent } from "../content/GenericContent";
import { QuizSection } from "../components/QuizSection";

// Lazy-loaded content components — each is a separate JS chunk loaded on demand
const WhatIsMLContent = lazy(() => import("../content/foundations/WhatIsMLContent").then(m => ({ default: m.WhatIsMLContent })));
const TypesOfMLContent = lazy(() => import("../content/foundations/TypesOfMLContent").then(m => ({ default: m.TypesOfMLContent })));
const SupervisedIntroContent = lazy(() => import("../content/foundations/SupervisedIntroContent").then(m => ({ default: m.SupervisedIntroContent })));
const UnsupervisedIntroContent = lazy(() => import("../content/foundations/UnsupervisedIntroContent").then(m => ({ default: m.UnsupervisedIntroContent })));
const ReinforcementIntroContent = lazy(() => import("../content/foundations/ReinforcementIntroContent").then(m => ({ default: m.ReinforcementIntroContent })));
const BatchVsOnlineContent = lazy(() => import("../content/foundations/BatchVsOnlineContent").then(m => ({ default: m.BatchVsOnlineContent })));
const MLLifecycleContent = lazy(() => import("../content/foundations/MLLifecycleContent").then(m => ({ default: m.MLLifecycleContent })));

const PythonForMLContent = lazy(() => import("../content/python/PythonForMLContent").then(m => ({ default: m.PythonForMLContent })));
const NumpyContent = lazy(() => import("../content/python/NumpyContent").then(m => ({ default: m.NumpyContent })));
const PandasContent = lazy(() => import("../content/python/PandasContent").then(m => ({ default: m.PandasContent })));
const ScikitLearnContent = lazy(() => import("../content/python/ScikitLearnContent").then(m => ({ default: m.ScikitLearnContent })));

const LinearRegressionContent = lazy(() => import("../content/supervised/LinearRegressionContent").then(m => ({ default: m.LinearRegressionContent })));
const GradientDescentContent = lazy(() => import("../content/supervised/GradientDescentContent").then(m => ({ default: m.GradientDescentContent })));
const PolynomialRegressionContent = lazy(() => import("../content/supervised/PolynomialRegressionContent").then(m => ({ default: m.PolynomialRegressionContent })));
const RidgeRegressionContent = lazy(() => import("../content/supervised/RidgeRegressionContent").then(m => ({ default: m.RidgeRegressionContent })));
const LassoRegressionContent = lazy(() => import("../content/supervised/LassoRegressionContent").then(m => ({ default: m.LassoRegressionContent })));
const ClassificationIntroContent = lazy(() => import("../content/supervised/ClassificationIntroContent").then(m => ({ default: m.ClassificationIntroContent })));
const LogisticRegressionContent = lazy(() => import("../content/supervised/LogisticRegressionContent").then(m => ({ default: m.LogisticRegressionContent })));
const DecisionTreesContent = lazy(() => import("../content/supervised/DecisionTreesContent").then(m => ({ default: m.DecisionTreesContent })));
const NaiveBayesContent = lazy(() => import("../content/supervised/NaiveBayesContent").then(m => ({ default: m.NaiveBayesContent })));
const KNNContent = lazy(() => import("../content/supervised/KNNContent").then(m => ({ default: m.KNNContent })));
const SVMContent = lazy(() => import("../content/supervised/SVMContent").then(m => ({ default: m.SVMContent })));
const RegressionIntroContent = lazy(() => import("../content/supervised/RegressionIntroContent").then(m => ({ default: m.RegressionIntroContent })));

const EDAContent = lazy(() => import("../content/preprocessing/EDAContent").then(m => ({ default: m.EDAContent })));
const HandlingMissingDataContent = lazy(() => import("../content/preprocessing/HandlingMissingDataContent").then(m => ({ default: m.HandlingMissingDataContent })));
const EncodingCategoricalContent = lazy(() => import("../content/preprocessing/EncodingCategoricalContent").then(m => ({ default: m.EncodingCategoricalContent })));
const FeatureScalingContent = lazy(() => import("../content/preprocessing/FeatureScalingContent").then(m => ({ default: m.FeatureScalingContent })));
const FeatureEngineeringContent = lazy(() => import("../content/preprocessing/FeatureEngineeringContent").then(m => ({ default: m.FeatureEngineeringContent })));
const FeatureSelectionContent = lazy(() => import("../content/preprocessing/FeatureSelectionContent").then(m => ({ default: m.FeatureSelectionContent })));
const DataVisualizationContent = lazy(() => import("../content/preprocessing/DataVisualizationContent").then(m => ({ default: m.DataVisualizationContent })));

const TrainTestSplitContent = lazy(() => import("../content/evaluation/TrainTestSplitContent").then(m => ({ default: m.TrainTestSplitContent })));
const CrossValidationContent = lazy(() => import("../content/evaluation/CrossValidationContent").then(m => ({ default: m.CrossValidationContent })));
const BiasVarianceContent = lazy(() => import("../content/evaluation/BiasVarianceContent").then(m => ({ default: m.BiasVarianceContent })));
const OverfittingUnderfittingContent = lazy(() => import("../content/evaluation/OverfittingUnderfittingContent").then(m => ({ default: m.OverfittingUnderfittingContent })));
const CostFunctionsContent = lazy(() => import("../content/evaluation/CostFunctionsContent").then(m => ({ default: m.CostFunctionsContent })));
const HyperparameterTuningContent = lazy(() => import("../content/evaluation/HyperparameterTuningContent").then(m => ({ default: m.HyperparameterTuningContent })));
const GridRandomSearchContent = lazy(() => import("../content/evaluation/GridRandomSearchContent").then(m => ({ default: m.GridRandomSearchContent })));
const ConfusionMatrixContent = lazy(() => import("../content/evaluation/ConfusionMatrixContent").then(m => ({ default: m.ConfusionMatrixContent })));
const RocAucContent = lazy(() => import("../content/evaluation/RocAucContent").then(m => ({ default: m.RocAucContent })));

const RandomForestContent = lazy(() => import("../content/ensemble/RandomForestContent").then(m => ({ default: m.RandomForestContent })));
const BaggingContent = lazy(() => import("../content/ensemble/BaggingContent").then(m => ({ default: m.BaggingContent })));
const BoostingContent = lazy(() => import("../content/ensemble/BoostingContent").then(m => ({ default: m.BoostingContent })));
const AdaBoostContent = lazy(() => import("../content/ensemble/AdaBoostContent").then(m => ({ default: m.AdaBoostContent })));
const GradientBoostingContent = lazy(() => import("../content/ensemble/GradientBoostingContent").then(m => ({ default: m.GradientBoostingContent })));
const XGBoostContent = lazy(() => import("../content/ensemble/XGBoostContent").then(m => ({ default: m.XGBoostContent })));

const KMeansContent = lazy(() => import("../content/unsupervised/KMeansContent").then(m => ({ default: m.KMeansContent })));
const HierarchicalContent = lazy(() => import("../content/unsupervised/HierarchicalContent").then(m => ({ default: m.HierarchicalContent })));
const DBSCANContent = lazy(() => import("../content/unsupervised/DBSCANContent").then(m => ({ default: m.DBSCANContent })));
const PCAContent = lazy(() => import("../content/unsupervised/PCAContent").then(m => ({ default: m.PCAContent })));
const TSNEContent = lazy(() => import("../content/unsupervised/TSNEContent").then(m => ({ default: m.TSNEContent })));
const AssociationRulesContent = lazy(() => import("../content/unsupervised/AssociationRulesContent").then(m => ({ default: m.AssociationRulesContent })));
const AprioriContent = lazy(() => import("../content/unsupervised/AprioriContent").then(m => ({ default: m.AprioriContent })));

const ArimaContent = lazy(() => import("../content/timeseries/ArimaContent").then(m => ({ default: m.ArimaContent })));
const MovingAverageContent = lazy(() => import("../content/timeseries/MovingAverageContent").then(m => ({ default: m.MovingAverageContent })));
const ExponentialSmoothingContent = lazy(() => import("../content/timeseries/ExponentialSmoothingContent").then(m => ({ default: m.ExponentialSmoothingContent })));
const ForecastingBasicsContent = lazy(() => import("../content/timeseries/ForecastingBasicsContent").then(m => ({ default: m.ForecastingBasicsContent })));

const SemiSupervisedContent = lazy(() => import("../content/advanced/SemiSupervisedContent").then(m => ({ default: m.SemiSupervisedContent })));
const OnlineLearningContent = lazy(() => import("../content/advanced/OnlineLearningContent").then(m => ({ default: m.OnlineLearningContent })));
const ReinforcementLearningAdvContent = lazy(() => import("../content/advanced/ReinforcementLearningAdvContent").then(m => ({ default: m.ReinforcementLearningAdvContent })));
const MultiArmedBanditsContent = lazy(() => import("../content/advanced/MultiArmedBanditsContent").then(m => ({ default: m.MultiArmedBanditsContent })));

const NeuralNetworksContent = lazy(() => import("../content/deeplearning/NeuralNetworksContent").then(m => ({ default: m.NeuralNetworksContent })));
const DeepLearningIntroContent = lazy(() => import("../content/deeplearning/DeepLearningIntroContent").then(m => ({ default: m.DeepLearningIntroContent })));
const MLInterviewContent = lazy(() => import("../content/interview/MLInterviewContent").then(m => ({ default: m.MLInterviewContent })));

import { AffiliateRecommendation } from "../components/AffiliateRecommendation";
import { NewsletterSignup } from "../components/NewsletterSignup";

// We will dynamically render content based on ID.
// For topics without implemented content yet, we show a placeholder.

function getTopicNavigation(currentId: string) {
  let prev = null;
  let next = null;

  const allTopics = curriculum.flatMap((c) => c.subtopics);
  const currentIndex = allTopics.findIndex((t) => t.id === currentId);

  if (currentIndex > 0) prev = allTopics[currentIndex - 1];
  if (currentIndex >= 0 && currentIndex < allTopics.length - 1)
    next = allTopics[currentIndex + 1];

  return { prev, next };
}

const contentMap: Record<string, React.ReactNode> = {
    "what-is-ml": <WhatIsMLContent />,
    "types-of-ml": <TypesOfMLContent />,
    "supervised-learning-intro": <SupervisedIntroContent />,
    "unsupervised-learning-intro": <UnsupervisedIntroContent />,
    "reinforcement-learning-intro": <ReinforcementIntroContent />,
    "batch-vs-online": <BatchVsOnlineContent />,
    "ml-lifecycle": <MLLifecycleContent />,

    "python-for-ml": <PythonForMLContent />,
    "numpy-essentials": <NumpyContent />,
    "pandas-essentials": <PandasContent />,
    "scikit-learn-essentials": <ScikitLearnContent />,

    // Preprocessing
    eda: <EDAContent />,
    "handling-missing-data": <HandlingMissingDataContent />,
    "encoding-categorical": <EncodingCategoricalContent />,
    "feature-scaling": <FeatureScalingContent />,
    "feature-engineering": <FeatureEngineeringContent />,
    "feature-selection": <FeatureSelectionContent />,
    "data-visualization": <DataVisualizationContent />,

    // Supervised Learning
    "regression-intro": <RegressionIntroContent />,
    "linear-regression": <LinearRegressionContent />,
    "gradient-descent": <GradientDescentContent />,
    "polynomial-regression": <PolynomialRegressionContent />,
    "ridge-regression": <RidgeRegressionContent />,
    "lasso-regression": <LassoRegressionContent />,
    "classification-intro": <ClassificationIntroContent />,
    "logistic-regression": <LogisticRegressionContent />,
    "decision-trees": <DecisionTreesContent />,
    "naive-bayes": <NaiveBayesContent />,
    knn: <KNNContent />,
    svm: <SVMContent />,

    // Model Evaluation
    "train-test-split": <TrainTestSplitContent />,
    "cross-validation": <CrossValidationContent />,
    "bias-variance": <BiasVarianceContent />,
    "overfitting-underfitting": <OverfittingUnderfittingContent />,
    "cost-functions": <CostFunctionsContent />,
    "hyperparameter-tuning": <HyperparameterTuningContent />,
    "grid-random-search": <GridRandomSearchContent />,
    "confusion-matrix": <ConfusionMatrixContent />,
    "roc-auc": <RocAucContent />,

    // Ensemble Learning
    "random-forest": <RandomForestContent />,
    bagging: <BaggingContent />,
    boosting: <BoostingContent />,
    adaboost: <AdaBoostContent />,
    "gradient-boosting": <GradientBoostingContent />,
    xgboost: <XGBoostContent />,

    // Unsupervised Learning
    kmeans: <KMeansContent />,
    hierarchical: <HierarchicalContent />,
    dbscan: <DBSCANContent />,
    pca: <PCAContent />,
    tsne: <TSNEContent />,
    "association-rules": <AssociationRulesContent />,
    apriori: <AprioriContent />,

    // Time Series
    arima: <ArimaContent />,
    "moving-average": <MovingAverageContent />,
    "exponential-smoothing": <ExponentialSmoothingContent />,
    "forecasting-basics": <ForecastingBasicsContent />,

    "semi-supervised": <SemiSupervisedContent />,
    "online-learning": <OnlineLearningContent />,
    "reinforcement-learning-adv": <ReinforcementLearningAdvContent />,
    "multi-armed-bandits": <MultiArmedBanditsContent />,

    "neural-networks": <NeuralNetworksContent />,
    "deep-learning-intro": <DeepLearningIntroContent />,
    "ml-interview-questions": <MLInterviewContent />,
  };

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
 
   // Scroll to top and set SEO on route change
   useEffect(() => {
    window.scrollTo(0, 0);

    if (topicId) {
      const topicInfo = getTopicById(topicId);
      if (topicInfo) {
        const seo = getSEOData(topicId, topicInfo.subtopic.title);
        document.title = seo.title;

        // Meta description
        const setMeta = (sel: string, attr: string, val: string) => {
          let el = document.querySelector(sel);
          if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
          el.setAttribute(attr, val);
        };
        setMeta('meta[name="description"]', 'content', seo.description);

        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', getCanonicalUrl(topicId));

        // Open Graph tags (per-page)
        setMeta('meta[property="og:title"]', 'content', seo.title);
        setMeta('meta[property="og:description"]', 'content', seo.description);
        setMeta('meta[property="og:url"]', 'content', getCanonicalUrl(topicId));

        // JSON-LD: LearningResource + BreadcrumbList
        let scriptSchema = document.querySelector('#schema-topic') as HTMLScriptElement;
        if (!scriptSchema) {
          scriptSchema = document.createElement('script');
          scriptSchema.setAttribute('id', 'schema-topic');
          scriptSchema.setAttribute('type', 'application/ld+json');
          document.head.appendChild(scriptSchema);
        }
        scriptSchema.textContent = getLearningResourceSchema(topicId, seo.title, seo.description);
      }
    }
  }, [topicId]);

  if (!topicId) return <Navigate to="/" />;

  const topicData = getTopicById(topicId);

  if (!topicData) return <Navigate to="/" />;

  const { subtopic, category } = topicData;
  const { prev, next } = getTopicNavigation(topicId);

  // Content Registry - map IDs to their React components
  

  const ContentComponent = contentMap[topicId] || (
    <GenericContent title={subtopic.title} />
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col">
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex-1 min-w-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-slate-500 mb-8 font-medium">
            <span className="hover:text-slate-900 transition-colors uppercase tracking-wider text-xs">
              {category.title.replace(/^\d+\.\s*/, "")}
            </span>
            <ChevronRight className="h-4 w-4 mx-2 text-slate-300" />
            <span className="text-slate-900">{subtopic.title}</span>
          </nav>

          {/* Main Content Render */}
          <article
            key={topicId}
            className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-xl"
          >
            {/* Author Byline */}
            <div className="flex items-center gap-3 mb-8 not-prose border-b border-slate-200 pb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                ML
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Written by the ML Academy Team</p>
                <p className="text-xs text-slate-500">Machine Learning Engineers & Educators</p>
              </div>
            </div>

            <Suspense fallback={
              <div className="animate-pulse space-y-4 py-8">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
              </div>
            }>
              {ContentComponent}
            </Suspense>
          </article>

          {/* Related Topics Section */}
          <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.subtopics
                .filter(t => t.id !== topicId)
                .slice(0, 4)
                .map(t => (
                  <Link 
                    key={t.id} 
                    to={`/learn/${t.id}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors"
                  >
                    {t.title}
                  </Link>
                ))}
            </div>
          </div>

          {subtopic.id !== 'ml-interview-questions' && (
            <QuizSection key={subtopic.id} topicId={subtopic.id} topicTitle={subtopic.title} />
          )}

          {/* Newsletter Signup */}
          <NewsletterSignup />

          {/* Global Affiliate Recommendation Section */}
          <AffiliateRecommendation />

          {/* Page Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
            {prev ? (
              <Link
                to={`/learn/${prev.id}`}
                className="group flex flex-col space-y-1 text-slate-500 hover:text-indigo-600 transition-colors w-1/2 pr-4"
              >
                <span className="flex items-center text-sm font-medium gap-1">
                  <ArrowLeft className="h-4 w-4" /> Previous
                </span>
                <span className="text-slate-900 font-semibold group-hover:text-indigo-600 truncate">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="w-1/2" />
            )}

            {next && (
              <Link
                to={`/learn/${next.id}`}
                className="group flex flex-col items-end text-right space-y-1 text-slate-500 hover:text-indigo-600 transition-colors w-1/2 pl-4"
              >
                <span className="flex items-center text-sm font-medium gap-1">
                  Next <ArrowRight className="h-4 w-4" />
                </span>
                <span className="text-slate-900 font-semibold group-hover:text-indigo-600 truncate">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
