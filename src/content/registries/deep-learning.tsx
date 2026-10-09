import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const DeepLearningIntroContent = lazy(() => import("../deeplearning/DeepLearningIntroContent").then(m => ({ default: m.DeepLearningIntroContent })));
const NeuralNetworksContent = lazy(() => import("../deeplearning/NeuralNetworksContent").then(m => ({ default: m.NeuralNetworksContent })));
const MathFoundationsContent = lazy(() => import("../deeplearning/MathFoundationsContent").then(m => ({ default: m.MathFoundationsContent })));
const ActivationFunctionsContent = lazy(() => import("../deeplearning/ActivationFunctionsContent").then(m => ({ default: m.ActivationFunctionsContent })));
const TensorsFrameworksGPUsContent = lazy(() => import("../deeplearning/TensorsFrameworksGPUsContent").then(m => ({ default: m.TensorsFrameworksGPUsContent })));
const LossFunctionsContent = lazy(() => import("../deeplearning/LossFunctionsContent").then(m => ({ default: m.LossFunctionsContent })));
const BackpropagationContent = lazy(() => import("../deeplearning/BackpropagationContent").then(m => ({ default: m.BackpropagationContent })));
const TrainingLoopContent = lazy(() => import("../deeplearning/TrainingLoopContent").then(m => ({ default: m.TrainingLoopContent })));
const OptimizersContent = lazy(() => import("../deeplearning/OptimizersContent").then(m => ({ default: m.OptimizersContent })));
const InitializationNormalizationContent = lazy(() => import("../deeplearning/InitializationNormalizationContent").then(m => ({ default: m.InitializationNormalizationContent })));
const RegularizationContent = lazy(() => import("../deeplearning/RegularizationContent").then(m => ({ default: m.RegularizationContent })));
const DataAugmentationContent = lazy(() => import("../deeplearning/DataAugmentationContent").then(m => ({ default: m.DataAugmentationContent })));
const CNNContent = lazy(() => import("../deeplearning/CNNContent").then(m => ({ default: m.CNNContent })));
const CNNArchitecturesContent = lazy(() => import("../deeplearning/CNNArchitecturesContent").then(m => ({ default: m.CNNArchitecturesContent })));
const DetectionSegmentationContent = lazy(() => import("../deeplearning/DetectionSegmentationContent").then(m => ({ default: m.DetectionSegmentationContent })));
const VisionTransformersContent = lazy(() => import("../deeplearning/VisionTransformersContent").then(m => ({ default: m.VisionTransformersContent })));
const RecurrentSequenceContent = lazy(() => import("../deeplearning/RecurrentSequenceContent").then(m => ({ default: m.RecurrentSequenceContent })));
const AttentionTransformersContent = lazy(() => import("../deeplearning/AttentionTransformersContent").then(m => ({ default: m.AttentionTransformersContent })));
const TransformersDeepLearningContent = lazy(() => import("../deeplearning/AttentionTransformersContent").then(m => ({ default: m.TransformersDeepLearningContent })));
const AutoencodersContent = lazy(() => import("../deeplearning/AutoencodersContent").then(m => ({ default: m.AutoencodersContent })));
const TransferLearningContent = lazy(() => import("../deeplearning/TransferLearningContent").then(m => ({ default: m.TransferLearningContent })));
const SelfSupervisedFewShotContent = lazy(() => import("../deeplearning/TransferLearningContent").then(m => ({ default: m.SelfSupervisedFewShotContent })));
const GraphNeuralNetworksContent = lazy(() => import("../deeplearning/GraphNeuralNetworksContent").then(m => ({ default: m.GraphNeuralNetworksContent })));
const ModelDeploymentContent = lazy(() => import("../deeplearning/ModelDeploymentContent").then(m => ({ default: m.ModelDeploymentContent })));

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
