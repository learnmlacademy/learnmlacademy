import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const GenerativeAIBatchOneContent = lazy(() => import("../modernai/GenerativeAIBatchOneContent").then(m => ({ default: m.GenerativeAIBatchOneContent })));
const GenerativeAIBatchTwoContent = lazy(() => import("../modernai/GenerativeAIBatchTwoContent").then(m => ({ default: m.GenerativeAIBatchTwoContent })));
const GenerativeAIBatchThreeContent = lazy(() => import("../modernai/GenerativeAIBatchThreeContent").then(m => ({ default: m.GenerativeAIBatchThreeContent })));

const contentMap: Record<string, ComponentType> = {
  "generative-ai-intro": GenerativeAIBatchOneContent,
  "generative-vs-discriminative": GenerativeAIBatchOneContent,
  "how-generative-models-learn": GenerativeAIBatchOneContent,
  "vae": GenerativeAIBatchOneContent,
  "gans": GenerativeAIBatchOneContent,
  "diffusion-models": GenerativeAIBatchOneContent,
  "stable-latent-diffusion": GenerativeAIBatchTwoContent,
  "controlling-diffusion-models": GenerativeAIBatchTwoContent,
  "finetuning-image-models": GenerativeAIBatchTwoContent,
  "multimodal-ai": GenerativeAIBatchTwoContent,
  "audio-music-video-generation": GenerativeAIBatchTwoContent,
  "synthetic-data": GenerativeAIBatchTwoContent,
  "evaluating-generative-models": GenerativeAIBatchThreeContent,
  "responsible-generative-ai": GenerativeAIBatchThreeContent,
  "choosing-generative-model": GenerativeAIBatchThreeContent,
  "building-genai-apps": GenerativeAIBatchThreeContent,
  "genai-deployment": GenerativeAIBatchThreeContent,
};

export default function LessonCategoryRegistry({ topicId, title }: RegistryProps) {
  const Content = contentMap[topicId];
  return Content ? <Content /> : <GenericContent title={title} />;
}
