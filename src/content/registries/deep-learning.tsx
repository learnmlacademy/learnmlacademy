import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadDeepLearningIntroContent = () => import("../deeplearning/DeepLearningIntroContent");
const DeepLearningIntroContent = lazy(() => loadDeepLearningIntroContent().then(m => ({ default: m.DeepLearningIntroContent })));
const loadNeuralNetworksContent = () => import("../deeplearning/NeuralNetworksContent");
const NeuralNetworksContent = lazy(() => loadNeuralNetworksContent().then(m => ({ default: m.NeuralNetworksContent })));
const loadMathFoundationsContent = () => import("../deeplearning/MathFoundationsContent");
const MathFoundationsContent = lazy(() => loadMathFoundationsContent().then(m => ({ default: m.MathFoundationsContent })));
const loadActivationFunctionsContent = () => import("../deeplearning/ActivationFunctionsContent");
const ActivationFunctionsContent = lazy(() => loadActivationFunctionsContent().then(m => ({ default: m.ActivationFunctionsContent })));
const loadTensorsFrameworksGPUsContent = () => import("../deeplearning/TensorsFrameworksGPUsContent");
const TensorsFrameworksGPUsContent = lazy(() => loadTensorsFrameworksGPUsContent().then(m => ({ default: m.TensorsFrameworksGPUsContent })));
const loadLossFunctionsContent = () => import("../deeplearning/LossFunctionsContent");
const LossFunctionsContent = lazy(() => loadLossFunctionsContent().then(m => ({ default: m.LossFunctionsContent })));
const loadBackpropagationContent = () => import("../deeplearning/BackpropagationContent");
const BackpropagationContent = lazy(() => loadBackpropagationContent().then(m => ({ default: m.BackpropagationContent })));
const loadTrainingLoopContent = () => import("../deeplearning/TrainingLoopContent");
const TrainingLoopContent = lazy(() => loadTrainingLoopContent().then(m => ({ default: m.TrainingLoopContent })));
const loadOptimizersContent = () => import("../deeplearning/OptimizersContent");
const OptimizersContent = lazy(() => loadOptimizersContent().then(m => ({ default: m.OptimizersContent })));
const loadInitializationNormalizationContent = () => import("../deeplearning/InitializationNormalizationContent");
const InitializationNormalizationContent = lazy(() => loadInitializationNormalizationContent().then(m => ({ default: m.InitializationNormalizationContent })));
const loadRegularizationContent = () => import("../deeplearning/RegularizationContent");
const RegularizationContent = lazy(() => loadRegularizationContent().then(m => ({ default: m.RegularizationContent })));
const loadDataAugmentationContent = () => import("../deeplearning/DataAugmentationContent");
const DataAugmentationContent = lazy(() => loadDataAugmentationContent().then(m => ({ default: m.DataAugmentationContent })));
const loadCNNContent = () => import("../deeplearning/CNNContent");
const CNNContent = lazy(() => loadCNNContent().then(m => ({ default: m.CNNContent })));
const loadCNNArchitecturesContent = () => import("../deeplearning/CNNArchitecturesContent");
const CNNArchitecturesContent = lazy(() => loadCNNArchitecturesContent().then(m => ({ default: m.CNNArchitecturesContent })));
const loadDetectionSegmentationContent = () => import("../deeplearning/DetectionSegmentationContent");
const DetectionSegmentationContent = lazy(() => loadDetectionSegmentationContent().then(m => ({ default: m.DetectionSegmentationContent })));
const loadVisionTransformersContent = () => import("../deeplearning/VisionTransformersContent");
const VisionTransformersContent = lazy(() => loadVisionTransformersContent().then(m => ({ default: m.VisionTransformersContent })));
const loadRecurrentSequenceContent = () => import("../deeplearning/RecurrentSequenceContent");
const RecurrentSequenceContent = lazy(() => loadRecurrentSequenceContent().then(m => ({ default: m.RecurrentSequenceContent })));
const loadAttentionTransformersContent = () => import("../deeplearning/AttentionTransformersContent");
const AttentionTransformersContent = lazy(() => loadAttentionTransformersContent().then(m => ({ default: m.AttentionTransformersContent })));
const loadTransformersDeepLearningContent = () => import("../deeplearning/AttentionTransformersContent");
const TransformersDeepLearningContent = lazy(() => loadTransformersDeepLearningContent().then(m => ({ default: m.TransformersDeepLearningContent })));
const loadAutoencodersContent = () => import("../deeplearning/AutoencodersContent");
const AutoencodersContent = lazy(() => loadAutoencodersContent().then(m => ({ default: m.AutoencodersContent })));
const loadTransferLearningContent = () => import("../deeplearning/TransferLearningContent");
const TransferLearningContent = lazy(() => loadTransferLearningContent().then(m => ({ default: m.TransferLearningContent })));
const loadSelfSupervisedFewShotContent = () => import("../deeplearning/TransferLearningContent");
const SelfSupervisedFewShotContent = lazy(() => loadSelfSupervisedFewShotContent().then(m => ({ default: m.SelfSupervisedFewShotContent })));
const loadGraphNeuralNetworksContent = () => import("../deeplearning/GraphNeuralNetworksContent");
const GraphNeuralNetworksContent = lazy(() => loadGraphNeuralNetworksContent().then(m => ({ default: m.GraphNeuralNetworksContent })));
const loadModelDeploymentContent = () => import("../deeplearning/ModelDeploymentContent");
const ModelDeploymentContent = lazy(() => loadModelDeploymentContent().then(m => ({ default: m.ModelDeploymentContent })));

const contentMap: Record<string, ComponentType> = {
  "deep-learning-intro": DeepLearningIntroContent,
  "neural-networks": NeuralNetworksContent,
  "math-foundations-deep-learning": MathFoundationsContent,
  "activation-functions": ActivationFunctionsContent,
  "tensors-frameworks-gpus": TensorsFrameworksGPUsContent,
  "loss-functions-deep-learning": LossFunctionsContent,
  "backpropagation": BackpropagationContent,
  "neural-network-training-loop": TrainingLoopContent,
  "deep-learning-optimizers": OptimizersContent,
  "weight-initialization": InitializationNormalizationContent,
  "deep-learning-regularization": RegularizationContent,
  "data-augmentation-deep-learning": DataAugmentationContent,
  "cnn": CNNContent,
  "cnn-architectures-resnet": CNNArchitecturesContent,
  "object-detection": DetectionSegmentationContent,
  "vision-transformers": VisionTransformersContent,
  "rnn-lstm": RecurrentSequenceContent,
  "attention-transformers-deep-learning": AttentionTransformersContent,
  "transformers-deep-learning": TransformersDeepLearningContent,
  "autoencoders": AutoencodersContent,
  "transfer-learning": TransferLearningContent,
  "self-supervised-few-shot-learning": SelfSupervisedFewShotContent,
  "graph-neural-networks": GraphNeuralNetworksContent,
  "saving-deploying-deep-models": ModelDeploymentContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "deep-learning-intro": () => loadDeepLearningIntroContent(),
  "neural-networks": () => loadNeuralNetworksContent(),
  "math-foundations-deep-learning": () => loadMathFoundationsContent(),
  "activation-functions": () => loadActivationFunctionsContent(),
  "tensors-frameworks-gpus": () => loadTensorsFrameworksGPUsContent(),
  "loss-functions-deep-learning": () => loadLossFunctionsContent(),
  "backpropagation": () => loadBackpropagationContent(),
  "neural-network-training-loop": () => loadTrainingLoopContent(),
  "deep-learning-optimizers": () => loadOptimizersContent(),
  "weight-initialization": () => loadInitializationNormalizationContent(),
  "deep-learning-regularization": () => loadRegularizationContent(),
  "data-augmentation-deep-learning": () => loadDataAugmentationContent(),
  "cnn": () => loadCNNContent(),
  "cnn-architectures-resnet": () => loadCNNArchitecturesContent(),
  "object-detection": () => loadDetectionSegmentationContent(),
  "vision-transformers": () => loadVisionTransformersContent(),
  "rnn-lstm": () => loadRecurrentSequenceContent(),
  "attention-transformers-deep-learning": () => loadAttentionTransformersContent(),
  "transformers-deep-learning": () => loadTransformersDeepLearningContent(),
  "autoencoders": () => loadAutoencodersContent(),
  "transfer-learning": () => loadTransferLearningContent(),
  "self-supervised-few-shot-learning": () => loadSelfSupervisedFewShotContent(),
  "graph-neural-networks": () => loadGraphNeuralNetworksContent(),
  "saving-deploying-deep-models": () => loadModelDeploymentContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
