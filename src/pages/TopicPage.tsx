import React, { useEffect, lazy, Suspense, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getTopicById, curriculum } from "../data/curriculum";
import { getSEOData, getCanonicalUrl, getLearningResourceSchema } from "../utils/seo";

import { GenericContent } from "../content/GenericContent";
import { QuizSection } from "../components/QuizSection";
import { ContinueLearning } from "../components/lesson/ContinueLearning";
import type { LearningDestination } from "../components/lesson/PreviousNextCard";
import {
  LegacyInlineEndingCleanup,
  LegacyLessonSummary,
} from "../components/LegacyLessonEnding";

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
const MathFoundationsContent = lazy(() => import("../content/deeplearning/MathFoundationsContent").then(m => ({ default: m.MathFoundationsContent })));
const TensorsFrameworksGPUsContent = lazy(() => import("../content/deeplearning/TensorsFrameworksGPUsContent").then(m => ({ default: m.TensorsFrameworksGPUsContent })));
const ActivationFunctionsContent = lazy(() => import("../content/deeplearning/ActivationFunctionsContent").then(m => ({ default: m.ActivationFunctionsContent })));
const LossFunctionsContent = lazy(() => import("../content/deeplearning/LossFunctionsContent").then(m => ({ default: m.LossFunctionsContent })));
const BackpropagationContent = lazy(() => import("../content/deeplearning/BackpropagationContent").then(m => ({ default: m.BackpropagationContent })));
const TrainingLoopContent = lazy(() => import("../content/deeplearning/TrainingLoopContent").then(m => ({ default: m.TrainingLoopContent })));
const OptimizersContent = lazy(() => import("../content/deeplearning/OptimizersContent").then(m => ({ default: m.OptimizersContent })));
const InitializationNormalizationContent = lazy(() => import("../content/deeplearning/InitializationNormalizationContent").then(m => ({ default: m.InitializationNormalizationContent })));
const RegularizationContent = lazy(() => import("../content/deeplearning/RegularizationContent").then(m => ({ default: m.RegularizationContent })));
const DataAugmentationContent = lazy(() => import("../content/deeplearning/DataAugmentationContent").then(m => ({ default: m.DataAugmentationContent })));
const CNNContent = lazy(() => import("../content/deeplearning/CNNContent").then(m => ({ default: m.CNNContent })));
const CNNArchitecturesContent = lazy(() => import("../content/deeplearning/CNNArchitecturesContent").then(m => ({ default: m.CNNArchitecturesContent })));
const DetectionSegmentationContent = lazy(() => import("../content/deeplearning/DetectionSegmentationContent").then(m => ({ default: m.DetectionSegmentationContent })));
const VisionTransformersContent = lazy(() => import("../content/deeplearning/VisionTransformersContent").then(m => ({ default: m.VisionTransformersContent })));
const RecurrentSequenceContent = lazy(() => import("../content/deeplearning/RecurrentSequenceContent").then(m => ({ default: m.RecurrentSequenceContent })));
const StateSpaceModelsContent = lazy(() => import("../content/deeplearning/StateSpaceModelsContent").then(m => ({ default: m.StateSpaceModelsContent })));
const AttentionTransformersContent = lazy(() => import("../content/deeplearning/AttentionTransformersContent").then(m => ({ default: m.AttentionTransformersContent })));
const TransformersDeepLearningContent = lazy(() => import("../content/deeplearning/AttentionTransformersContent").then(m => ({ default: m.TransformersDeepLearningContent })));
const DeepLearningNLPContent = lazy(() => import("../content/deeplearning/DeepLearningNLPContent").then(m => ({ default: m.DeepLearningNLPContent })));
const AutoencodersContent = lazy(() => import("../content/deeplearning/AutoencodersContent").then(m => ({ default: m.AutoencodersContent })));
const TransferLearningContent = lazy(() => import("../content/deeplearning/TransferLearningContent").then(m => ({ default: m.TransferLearningContent })));
const SelfSupervisedFewShotContent = lazy(() => import("../content/deeplearning/TransferLearningContent").then(m => ({ default: m.SelfSupervisedFewShotContent })));
const GraphNeuralNetworksContent = lazy(() => import("../content/deeplearning/GraphNeuralNetworksContent").then(m => ({ default: m.GraphNeuralNetworksContent })));
const ScientificNetworksContent = lazy(() => import("../content/deeplearning/ScientificNetworksContent").then(m => ({ default: m.ScientificNetworksContent })));
const ModelDeploymentContent = lazy(() => import("../content/deeplearning/ModelDeploymentContent").then(m => ({ default: m.ModelDeploymentContent })));
const ModernAIContent = lazy(() => import("../content/modernai/ModernAIContent").then(m => ({ default: m.ModernAIContent })));
const LLMConsolidatedContent = lazy(() => import("../content/modernai/LLMConsolidatedContent").then(m => ({ default: m.LLMConsolidatedContent })));
const HowGenerativeModelsLearnContent = lazy(() => import("../content/modernai/HowGenerativeModelsLearnContent").then(m => ({ default: m.HowGenerativeModelsLearnContent })));
const GenerativeAIBatchOneContent = lazy(() => import("../content/modernai/GenerativeAIBatchOneContent").then(m => ({ default: m.GenerativeAIBatchOneContent })));
const GenerativeAIBatchTwoContent = lazy(() => import("../content/modernai/GenerativeAIBatchTwoContent").then(m => ({ default: m.GenerativeAIBatchTwoContent })));
const GenerativeAIBatchThreeContent = lazy(() => import("../content/modernai/GenerativeAIBatchThreeContent").then(m => ({ default: m.GenerativeAIBatchThreeContent })));
const ProjectsContent = lazy(() => import("../content/projects/ProjectsContent").then(m => ({ default: m.ProjectsContent })));
const MLOpsContent = lazy(() => import("../content/mlops/MLOpsContent").then(m => ({ default: m.MLOpsContent })));
const CareerInterviewContent = lazy(() => import("../content/interview/CareerInterviewContent").then(m => ({ default: m.CareerInterviewContent })));

import { AffiliateRecommendation } from "../components/AffiliateRecommendation";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { LessonShell } from "../components/lesson/LessonShell";

// We will dynamically render content based on ID.
// For topics without implemented content yet, we show a placeholder.

function getTopicNavigation(currentId: string) {
  let prev = null;
  let next = null;

  const currentCategory = curriculum.find((category) =>
    category.subtopics.some((topic) => topic.id === currentId)
  );
  if (currentCategory?.id === "deep-learning" || currentCategory?.id === "advanced-deep-learning") {
    const currentIndex = currentCategory.subtopics.findIndex((topic) => topic.id === currentId);
    if (currentIndex > 0) prev = currentCategory.subtopics[currentIndex - 1];
    if (currentIndex >= 0 && currentIndex < currentCategory.subtopics.length - 1) {
      next = currentCategory.subtopics[currentIndex + 1];
    }
    return { prev, next };
  }

  if (currentCategory?.id === "generative-ai") {
    const currentIndex = currentCategory.subtopics.findIndex((topic) => topic.id === currentId);
    if (currentIndex > 0) prev = currentCategory.subtopics[currentIndex - 1];
    if (currentIndex >= 0 && currentIndex < currentCategory.subtopics.length - 1) {
      next = currentCategory.subtopics[currentIndex + 1];
    } else if (currentIndex === currentCategory.subtopics.length - 1) {
      next = curriculum
        .find((category) => category.id === "large-language-models")
        ?.subtopics.find((topic) => topic.id === "llm-intro") ?? null;
    }
    return { prev, next };
  }

  const allTopics = curriculum.flatMap((c) => c.subtopics);
  const currentIndex = allTopics.findIndex((t) => t.id === currentId);

  if (currentIndex > 0) prev = allTopics[currentIndex - 1];
  if (currentIndex >= 0 && currentIndex < allTopics.length - 1)
    next = allTopics[currentIndex + 1];

  return { prev, next };
}

const contentMap: Record<string, React.ElementType> = {
    "what-is-ml": WhatIsMLContent,
    "types-of-ml": TypesOfMLContent,
    "supervised-learning-intro": SupervisedIntroContent,
    "unsupervised-learning-intro": UnsupervisedIntroContent,
    "reinforcement-learning-intro": ReinforcementIntroContent,
    "batch-vs-online": BatchVsOnlineContent,
    "ml-lifecycle": MLLifecycleContent,

    "python-for-ml": PythonForMLContent,
    "numpy-essentials": NumpyContent,
    "pandas-essentials": PandasContent,
    "scikit-learn-essentials": ScikitLearnContent,

    // Preprocessing
    eda: EDAContent,
    "handling-missing-data": HandlingMissingDataContent,
    "encoding-categorical": EncodingCategoricalContent,
    "feature-scaling": FeatureScalingContent,
    "feature-engineering": FeatureEngineeringContent,
    "feature-selection": FeatureSelectionContent,
    "data-visualization": DataVisualizationContent,

    // Supervised Learning
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
    knn: KNNContent,
    svm: SVMContent,

    // Model Evaluation
    "train-test-split": TrainTestSplitContent,
    "cross-validation": CrossValidationContent,
    "bias-variance": BiasVarianceContent,
    "overfitting-underfitting": OverfittingUnderfittingContent,
    "cost-functions": CostFunctionsContent,
    "hyperparameter-tuning": HyperparameterTuningContent,
    "grid-random-search": GridRandomSearchContent,
    "confusion-matrix": ConfusionMatrixContent,
    "roc-auc": RocAucContent,

    // Ensemble Learning
    "random-forest": RandomForestContent,
    bagging: BaggingContent,
    boosting: BoostingContent,
    adaboost: AdaBoostContent,
    "gradient-boosting": GradientBoostingContent,
    xgboost: XGBoostContent,

    // Unsupervised Learning
    kmeans: KMeansContent,
    hierarchical: HierarchicalContent,
    dbscan: DBSCANContent,
    pca: PCAContent,
    tsne: TSNEContent,
    "association-rules": AssociationRulesContent,
    apriori: AprioriContent,

    // Time Series
    arima: ArimaContent,
    "moving-average": MovingAverageContent,
    "exponential-smoothing": ExponentialSmoothingContent,
    "forecasting-basics": ForecastingBasicsContent,

    "semi-supervised": SemiSupervisedContent,
    "online-learning": OnlineLearningContent,
    "reinforcement-learning-adv": ReinforcementLearningAdvContent,
    "multi-armed-bandits": MultiArmedBanditsContent,

    "neural-networks": NeuralNetworksContent,
    "deep-learning-intro": DeepLearningIntroContent,
    "tensors-frameworks-gpus": TensorsFrameworksGPUsContent,
    "activation-functions": ActivationFunctionsContent,
    "loss-functions-deep-learning": LossFunctionsContent,
    backpropagation: BackpropagationContent,
    "computational-graphs-autodiff": BackpropagationContent,
    "neural-network-training-loop": TrainingLoopContent,
    "deep-learning-optimizers": OptimizersContent,
    "learning-rate-scheduling": OptimizersContent,
    "weight-initialization": InitializationNormalizationContent,
    "batch-normalization": InitializationNormalizationContent,
    "deep-learning-regularization": RegularizationContent,
    "vanishing-exploding-gradients": InitializationNormalizationContent,
    "data-augmentation-deep-learning": DataAugmentationContent,
    cnn: CNNContent,
    "cnn-architectures-resnet": CNNArchitecturesContent,
    "computer-vision": ModernAIContent,
    "object-detection": DetectionSegmentationContent,
    "rnn-lstm": RecurrentSequenceContent,
    "state-space-models": StateSpaceModelsContent,
    "gru-bidirectional-seq2seq": RecurrentSequenceContent,
    "deep-learning-nlp": DeepLearningNLPContent,
    "transfer-learning": TransferLearningContent,
    autoencoders: AutoencodersContent,
    "self-supervised-contrastive-learning": TransferLearningContent,
    "graph-neural-networks": GraphNeuralNetworksContent,
    "debugging-neural-networks": ModernAIContent,
    "saving-deploying-deep-models": ModelDeploymentContent,
    "math-foundations-deep-learning": MathFoundationsContent,
    "mlp-universal-approximation": NeuralNetworksContent,
    "advanced-neural-optimization": ModernAIContent,
    "normalization-methods": InitializationNormalizationContent,
    "label-smoothing-distillation-ensembles": RegularizationContent,
    "deep-learning-generalization": RegularizationContent,
    "curriculum-meta-few-shot": TransferLearningContent,
    "self-supervised-few-shot-learning": SelfSupervisedFewShotContent,
    "unet-deeplab-gradcam": DetectionSegmentationContent,
    "vision-transformers": VisionTransformersContent,
    "state-space-bptt": RecurrentSequenceContent,
    "attention-transformers-deep-learning": AttentionTransformersContent,
    "transformers-deep-learning": TransformersDeepLearningContent,
    "autoencoder-variants": AutoencodersContent,
    "pinn-kan-topological-networks": ScientificNetworksContent,

    "generative-ai-intro": GenerativeAIBatchOneContent,
    "generative-vs-discriminative": GenerativeAIBatchOneContent,
    "how-generative-models-learn": HowGenerativeModelsLearnContent,
    gans: GenerativeAIBatchOneContent,
    vae: GenerativeAIBatchOneContent,
    "diffusion-models": GenerativeAIBatchOneContent,
    "stable-latent-diffusion": GenerativeAIBatchTwoContent,
    "controlling-diffusion-models": GenerativeAIBatchTwoContent,
    "finetuning-image-models": GenerativeAIBatchTwoContent,
    "text-generation-decoding": LLMConsolidatedContent,
    "hugging-face": ModernAIContent,
    "multimodal-ai": GenerativeAIBatchTwoContent,
    "audio-music-video-generation": GenerativeAIBatchTwoContent,
    "synthetic-data": GenerativeAIBatchTwoContent,
    "evaluating-generative-models": GenerativeAIBatchThreeContent,
    "choosing-generative-model": GenerativeAIBatchThreeContent,
    "genai-apis-open-models": ModernAIContent,
    "building-genai-apps": GenerativeAIBatchThreeContent,
    "genai-deployment": GenerativeAIBatchThreeContent,
    "responsible-generative-ai": GenerativeAIBatchThreeContent,

    "llm-intro": LLMConsolidatedContent,
    "language-model-evolution": ModernAIContent,
    "tokenization-embeddings": LLMConsolidatedContent,
    "transformers-attention": LLMConsolidatedContent,
    "encoder-decoder-models": ModernAIContent,
    "context-windows": ModernAIContent,
    "pretraining-finetuning": LLMConsolidatedContent,
    "llm-data-preparation": ModernAIContent,
    "llm-scaling-laws": ModernAIContent,
    "distributed-llm-training": ModernAIContent,
    "instruction-tuning-rlhf": LLMConsolidatedContent,
    "lora-peft": ModernAIContent,
    "knowledge-distillation": ModernAIContent,
    "quantization-inference": ModernAIContent,
    "efficient-llm-serving": LLMConsolidatedContent,
    "prompt-engineering": LLMConsolidatedContent,
    "structured-output-function-calling": ModernAIContent,
    "semantic-search-embeddings": LLMConsolidatedContent,
    "vector-databases": LLMConsolidatedContent,
    rag: LLMConsolidatedContent,
    "advanced-rag": LLMConsolidatedContent,
    "rag-evaluation": ModernAIContent,
    "llm-evaluation": LLMConsolidatedContent,
    "reasoning-models": LLMConsolidatedContent,
    "llm-benchmarking-selection": ModernAIContent,
    llmops: LLMConsolidatedContent,
    "llm-hallucinations-safety": LLMConsolidatedContent,

    "agentic-ai-intro": ModernAIContent,
    "types-of-ai-agents": ModernAIContent,
    "agents-vs-workflows": ModernAIContent,
    "tool-calling": ModernAIContent,
    "agent-context-engineering": ModernAIContent,
    "reliable-agent-tools": ModernAIContent,
    "agent-memory": ModernAIContent,
    "planning-reflection": ModernAIContent,
    "agent-state-graphs": ModernAIContent,
    "durable-long-running-agents": ModernAIContent,
    "react-agent-pattern": ModernAIContent,
    "agentic-rag": ModernAIContent,
    "multi-agent-systems": ModernAIContent,
    "agent-to-agent-communication": ModernAIContent,
    "agent-frameworks": ModernAIContent,
    "model-context-protocol": ModernAIContent,
    "human-in-the-loop": ModernAIContent,
    "building-ai-agent": ModernAIContent,
    "browser-computer-use-agents": ModernAIContent,
    "code-agents-sandboxing": ModernAIContent,
    "agent-security": ModernAIContent,
    "agent-failure-recovery": ModernAIContent,
    "agent-cost-latency-budgets": ModernAIContent,
    "agent-evaluation-safety": ModernAIContent,
    "agent-trajectory-evaluation": ModernAIContent,
    "agent-observability-deployment": ModernAIContent,
    "project-customer-churn": ProjectsContent,
    "project-credit-risk": ProjectsContent,
    "project-sales-forecasting": ProjectsContent,
    "project-image-classification": ProjectsContent,
    "project-genai-app": ProjectsContent,
    "project-rag-document-qa": ProjectsContent,
    "project-ai-agent": ProjectsContent,
    "project-multi-agent-research": ProjectsContent,
    "ai-engineering-mlops": MLOpsContent,
    "ml-data-feature-pipelines": MLOpsContent,
    "experiment-tracking-model-registry": MLOpsContent,
    "batch-online-inference": MLOpsContent,
    "ml-cicd-continuous-training": MLOpsContent,
    "ml-monitoring-drift": MLOpsContent,
    "production-ai-reliability": MLOpsContent,
    "ml-system-design": MLOpsContent,
    "ai-data-career-paths": CareerInterviewContent,
    "ml-engineer-roadmap": CareerInterviewContent,
    "ai-engineer-roadmap": CareerInterviewContent,
    "genai-llm-engineer-roadmap": CareerInterviewContent,
    "data-scientist-roadmap": CareerInterviewContent,
    "interview-preparation-strategy": CareerInterviewContent,
    "ml-interview-questions": CareerInterviewContent,
    "deep-learning-interview-questions": CareerInterviewContent,
    "genai-llm-rag-interview": CareerInterviewContent,
    "agentic-ai-interview": CareerInterviewContent,
    "python-ai-ml-interview": CareerInterviewContent,
    "sql-ai-data-interview": CareerInterviewContent,
    "ml-ai-system-design-interview": CareerInterviewContent,
    "mlops-production-interview": CareerInterviewContent,
    "behavioral-project-interview": CareerInterviewContent,
  };

const topicAliases: Record<string, string> = {
  "mlp-universal-approximation": "neural-networks",
  "computational-graphs-autodiff": "backpropagation",
  "debugging-neural-networks": "neural-network-training-loop",
  "advanced-neural-optimization": "deep-learning-optimizers",
  "learning-rate-scheduling": "deep-learning-optimizers",
  "batch-normalization": "weight-initialization",
  "normalization-methods": "weight-initialization",
  "vanishing-exploding-gradients": "weight-initialization",
  "label-smoothing-distillation-ensembles": "deep-learning-regularization",
  "deep-learning-generalization": "deep-learning-regularization",
  "computer-vision": "cnn",
  "unet-deeplab-gradcam": "object-detection",
  "state-space-bptt": "state-space-models",
  "gru-bidirectional-seq2seq": "attention-transformers-deep-learning",
  "autoencoder-variants": "autoencoders",
  "self-supervised-contrastive-learning": "self-supervised-few-shot-learning",
  "curriculum-meta-few-shot": "self-supervised-few-shot-learning",
  "genai-apis-open-models": "genai-deployment",
  "language-model-evolution": "llm-intro",
  "context-windows": "tokenization-embeddings",
  "encoder-decoder-models": "transformers-attention",
  "hugging-face": "efficient-llm-serving",
  "llm-data-preparation": "pretraining-finetuning",
  "llm-scaling-laws": "pretraining-finetuning",
  "distributed-llm-training": "pretraining-finetuning",
  "lora-peft": "instruction-tuning-rlhf",
  "knowledge-distillation": "efficient-llm-serving",
  "quantization-inference": "efficient-llm-serving",
  "structured-output-function-calling": "prompt-engineering",
  "rag-evaluation": "advanced-rag",
  "llm-benchmarking-selection": "llm-evaluation",
  "types-of-ai-agents": "agentic-ai-intro",
  "agents-vs-workflows": "agentic-ai-intro",
  "reliable-agent-tools": "tool-calling",
  "react-agent-pattern": "planning-reflection",
  "human-in-the-loop": "durable-long-running-agents",
  "agent-to-agent-communication": "multi-agent-systems",
  "code-agents-sandboxing": "browser-computer-use-agents",
  "agent-failure-recovery": "agent-security",
  "agent-cost-latency-budgets": "agent-observability-deployment",
  "agent-trajectory-evaluation": "agent-evaluation-safety",
};


export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const articleRef = useRef<HTMLElement | null>(null);
 
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

  if (topicId && topicAliases[topicId]) {
    return <Navigate to={`/learn/${topicAliases[topicId]}`} replace />;
  }

  if (!topicId) return <Navigate to="/" />;

  const topicData = getTopicById(topicId);

  if (!topicData) return <Navigate to="/" />;

  const { subtopic, category } = topicData;
  const { prev, next } = getTopicNavigation(topicId);

  // Content Registry - map IDs to their React components
  

  const ContentComponent = contentMap[topicId];
  const isGenerativeAILesson = category.id === "generative-ai";
  const isLLMLesson = category.id === "large-language-models";
  const isAgenticAILesson = category.id === "agentic-ai";
  const isProjectLesson = category.id === "projects";
  const isMLOpsLesson = category.id === "ai-engineering-mlops";
  const isCareerInterviewLesson = category.id === "interview-preparation";
  const isModernStandardizedLesson =
    isGenerativeAILesson ||
    isLLMLesson ||
    isAgenticAILesson ||
    isProjectLesson ||
    isMLOpsLesson ||
    isCareerInterviewLesson;
  const isLegacyStandardizedLesson = !isModernStandardizedLesson;

  const renderQuiz = () => (
    <div key={`quiz-${subtopic.id}`}><QuizSection topicId={subtopic.id} topicTitle={subtopic.title} /></div>
  );

  const advancedDestinations: Record<string, { primary?: LearningDestination; secondary?: LearningDestination }> = {
    "state-space-models": {
      primary: { label: "Related advanced topic", title: "Physics-Informed, KAN and Topological Networks", to: "/learn/pinn-kan-topological-networks", context: "Advanced / bridge content" },
      secondary: { label: "Back to Deep Learning", title: "Deep Learning Basics and Model Types", to: "/learn/deep-learning-intro", context: "Core Deep Learning path" },
    },
    "deep-learning-nlp": {
      primary: { label: "Continue to LLMs", title: "What Are Large Language Models?", to: "/learn/llm-intro", context: "LLMs & RAG path" },
      secondary: { label: "Back to Deep Learning", title: "Deep Learning Basics and Model Types", to: "/learn/deep-learning-intro", context: "Core Deep Learning path" },
    },
    "pinn-kan-topological-networks": {
      primary: { label: "Related advanced topic", title: "State-Space Models", to: "/learn/state-space-models", context: "Advanced / bridge content" },
      secondary: { label: "Back to Deep Learning", title: "Deep Learning Basics and Model Types", to: "/learn/deep-learning-intro", context: "Core Deep Learning path" },
    },
  };

  const relatedTopics = category.subtopics
    .filter(item => item.id !== topicId)
    .slice(0, 4)
    .map(item => ({ title: item.title, to: `/learn/${item.id}` }));
  const standardPrimary = next
    ? { label: "Next lesson", title: next.title, to: `/learn/${next.id}`, context: getTopicById(next.id)?.category.title }
    : undefined;
  const standardSecondary = prev
    ? { label: "Previous lesson", title: prev.title, to: `/learn/${prev.id}`, context: getTopicById(prev.id)?.category.title }
    : undefined;
  const destinations = category.id === "advanced-deep-learning"
    ? advancedDestinations[topicId] ?? {}
    : { primary: standardPrimary, secondary: standardSecondary };

  const renderStandardContinueLearning = (headingId: string) => (
    <ContinueLearning
      headingId={headingId}
      primary={destinations.primary}
      secondary={destinations.secondary}
      related={category.id === "advanced-deep-learning" ? [] : relatedTopics}
    />
  );

  return (
    <LessonShell
      topicId={topicId}
      title={subtopic.title}
      description={getSEOData(topicId, subtopic.title).description}
      category={category.title}
      module={subtopic.module}
    >
      <article
        ref={articleRef}
        data-lesson-body
        key={`article-${topicId}`}
        className="lesson-body prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-xl"
      >
        <div className="not-prose mb-8 flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-base font-extrabold text-indigo-700">
            ML
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Written by the ML Academy Team</p>
            <p className="text-xs text-slate-500">Machine Learning Engineers & Educators</p>
          </div>
        </div>

        <Suspense fallback={
          <div className="animate-pulse space-y-4 py-8" aria-label="Loading lesson">
            <div className="h-6 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-5/6 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
          </div>
        }>
          {ContentComponent ? <ContentComponent /> : <GenericContent title={subtopic.title} />}
          {isLegacyStandardizedLesson && (
            <LegacyInlineEndingCleanup articleRef={articleRef} topicId={topicId} />
          )}
        </Suspense>
      </article>

      {isModernStandardizedLesson ? (
        <>
          {renderQuiz()}
          {renderStandardContinueLearning("continue-learning-heading")}
          <NewsletterSignup />
          <AffiliateRecommendation />
        </>
      ) : (
        <>
          <LegacyLessonSummary topicId={topicId} />
          {renderQuiz()}
          {renderStandardContinueLearning(`continue-learning-${topicId}`)}
          <NewsletterSignup />
          <AffiliateRecommendation />
        </>
      )}
    </LessonShell>
  );
}
