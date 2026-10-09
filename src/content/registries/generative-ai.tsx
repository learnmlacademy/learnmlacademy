import { lazy, type ComponentType } from "react";
import { GenericContent } from "../GenericContent";

type RegistryProps = { topicId: string; title: string };

const loadGenerativeAIBatchOneContent = () => import("../modernai/GenerativeAIBatchOneContent");
const GenerativeAIBatchOneContent = lazy(() => loadGenerativeAIBatchOneContent().then(m => ({ default: m.GenerativeAIBatchOneContent })));
const loadGenerativeAIBatchTwoContent = () => import("../modernai/GenerativeAIBatchTwoContent");
const GenerativeAIBatchTwoContent = lazy(() => loadGenerativeAIBatchTwoContent().then(m => ({ default: m.GenerativeAIBatchTwoContent })));
const loadGenerativeAIBatchThreeContent = () => import("../modernai/GenerativeAIBatchThreeContent");
const GenerativeAIBatchThreeContent = lazy(() => loadGenerativeAIBatchThreeContent().then(m => ({ default: m.GenerativeAIBatchThreeContent })));

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


const lessonPreloaders: Record<string, () => Promise<unknown>> = {
  "generative-ai-intro": () => loadGenerativeAIBatchOneContent(),
  "generative-vs-discriminative": () => loadGenerativeAIBatchOneContent(),
  "how-generative-models-learn": () => loadGenerativeAIBatchOneContent(),
  "vae": () => loadGenerativeAIBatchOneContent(),
  "gans": () => loadGenerativeAIBatchOneContent(),
  "diffusion-models": () => loadGenerativeAIBatchOneContent(),
  "stable-latent-diffusion": () => loadGenerativeAIBatchTwoContent(),
  "controlling-diffusion-models": () => loadGenerativeAIBatchTwoContent(),
  "finetuning-image-models": () => loadGenerativeAIBatchTwoContent(),
  "multimodal-ai": () => loadGenerativeAIBatchTwoContent(),
  "audio-music-video-generation": () => loadGenerativeAIBatchTwoContent(),
  "synthetic-data": () => loadGenerativeAIBatchTwoContent(),
  "evaluating-generative-models": () => loadGenerativeAIBatchThreeContent(),
  "responsible-generative-ai": () => loadGenerativeAIBatchThreeContent(),
  "choosing-generative-model": () => loadGenerativeAIBatchThreeContent(),
  "building-genai-apps": () => loadGenerativeAIBatchThreeContent(),
  "genai-deployment": () => loadGenerativeAIBatchThreeContent(),
};

export function preloadLessonContent(topicId: string): Promise<unknown> {
  const load = lessonPreloaders[topicId];
  return load ? load() : Promise.resolve();
}
