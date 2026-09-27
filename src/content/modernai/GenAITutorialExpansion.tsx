import type { ComponentType } from 'react';
import { Callout } from '../../components/content/Callout';
import { CodeBlock } from '../../components/content/CodeBlock';
import { FigureShell } from '../../components/content/FigureShell';
import {
  TrainingGenerationLifecycleFigure, RetrievalPredictionGenerationFigure,
  GenerativeDiscriminativePathsFigure, ProbabilityMapFigure,
  LearningGenerationModesFigure, LatentRepresentationFigure,
} from '../../components/diagrams/GenAIDiagrams';
import {
  VAEArchitectureDiagram, VAELatentSamplingDiagram, GANGameDiagram,
  GANAlternatingUpdatesDiagram, DiffusionNoisingDenoisingDiagram,
  DiffusionTrainingGenerationDiagram,
} from '../../components/diagrams/GenAIBatchTwoDiagrams';
import {
  PixelVsLatentDiffusionDiagram, StableDiffusionArchitectureDiagram,
  ClassifierFreeGuidanceDiagram, DiffusionControlMethodsDiagram,
  FineTuningMethodsDiagram, LoRASidePathDiagram,
} from '../../components/diagrams/GenAIBatchThreeDiagrams';
import {
  MultimodalRepresentationDiagram, MultimodalTaskPathsDiagram,
  AudioRepresentationPipelineDiagram, SyntheticDataPipelineDiagram,
  SyntheticDistributionDiagram,
} from '../../components/diagrams/GenAIBatchFourDiagrams';
import {
  EvaluationPipelineDiagram, EvaluationTradeoffDiagram,
  ResponsibleLifecycleDiagram, LayeredSafetyDiagram,
  GenerativeNeedDecisionDiagram, ConstraintSelectionDiagram,
  ApplicationArchitectureDiagram, OutputValidationDiagram,
  HostedSelfHostedDiagram, ProductionReliabilityDiagram,
} from '../../components/diagrams/GenAIFinalBatchDiagrams';
import tutorialData from './genaiTutorialLabs.json';

type Tutorial = {
  title: string; intro: string[]; mechanismTitle: string; mechanism: string[];
  labTitle: string; setup: string; code: string; output: string; notes: string[];
  meaning: string; mistake: string; tryIt: string; answer: string;
};
type GenAITopic = keyof typeof tutorialData;
const tutorials: Record<GenAITopic, Tutorial> = tutorialData;

function TemporalContinuityFigure() {
  const traces = [
    { title: 'Consistent motion', positions: [0, 1, 2, 3, 4], color: '#047857' },
    { title: 'Unexpected jump', positions: [0, 1, 7, 3, 4], color: '#be123c' },
  ];
  return <FigureShell title="The same five frames can contain very different motion" caption="Invented object positions from the Python example. A large displacement flags a case to inspect; it does not prove an artifact without knowing the intended movement." accessibleDescription="Two line charts show object position against frame number. The consistent sequence is 0, 1, 2, 3, 4; the second sequence jumps to 7 at frame 3 before returning to 3 and 4.">
    <div className="grid gap-5 md:grid-cols-2">
      {traces.map(trace => <div key={trace.title}>
        <h4 className="mb-2 text-center font-bold text-slate-900">{trace.title}</h4>
        <svg viewBox="0 0 310 250" className="mx-auto w-full max-w-sm" role="img" aria-label={`${trace.title}: positions ${trace.positions.join(', ')}`}>
          {[0, 2, 4, 6, 8].map(y => <g key={y}><line x1="44" x2="284" y1={202-y*21} y2={202-y*21} stroke="#cbd5e1" /><text x="35" y={207-y*21} textAnchor="end" fontSize="13" fill="#475569">{y}</text></g>)}
          <path d="M44 27 V202 H284" fill="none" stroke="#475569" />
          <polyline points={trace.positions.map((y,i)=>`${50+i*55},${202-y*21}`).join(' ')} fill="none" stroke={trace.color} strokeWidth="3" />
          {trace.positions.map((y,i)=><g key={i}><circle cx={50+i*55} cy={202-y*21} r="5" fill={trace.color}/><text x={50+i*55} y="221" textAnchor="middle" fontSize="13" fill="#334155">{i+1}</text></g>)}
          <text x="160" y="244" textAnchor="middle" fontSize="14" fill="#334155">Frame number</text>
          <text x="18" y="125" transform="rotate(-90 18 125)" textAnchor="middle" fontSize="14" fill="#334155">Position (arbitrary units)</text>
        </svg>
      </div>)}
    </div>
  </FigureShell>;
}

const figures: Record<GenAITopic, [ComponentType, ComponentType]> = {
  'generative-ai-intro': [RetrievalPredictionGenerationFigure, TrainingGenerationLifecycleFigure],
  'generative-vs-discriminative': [GenerativeDiscriminativePathsFigure, ProbabilityMapFigure],
  'how-generative-models-learn': [LearningGenerationModesFigure, LatentRepresentationFigure],
  vae: [VAEArchitectureDiagram, VAELatentSamplingDiagram],
  gans: [GANGameDiagram, GANAlternatingUpdatesDiagram],
  'diffusion-models': [DiffusionNoisingDenoisingDiagram, DiffusionTrainingGenerationDiagram],
  'stable-latent-diffusion': [PixelVsLatentDiffusionDiagram, StableDiffusionArchitectureDiagram],
  'controlling-diffusion-models': [DiffusionControlMethodsDiagram, ClassifierFreeGuidanceDiagram],
  'finetuning-image-models': [FineTuningMethodsDiagram, LoRASidePathDiagram],
  'multimodal-ai': [MultimodalRepresentationDiagram, MultimodalTaskPathsDiagram],
  'audio-music-video-generation': [AudioRepresentationPipelineDiagram, TemporalContinuityFigure],
  'synthetic-data': [SyntheticDataPipelineDiagram, SyntheticDistributionDiagram],
  'evaluating-generative-models': [EvaluationPipelineDiagram, EvaluationTradeoffDiagram],
  'responsible-generative-ai': [ResponsibleLifecycleDiagram, LayeredSafetyDiagram],
  'choosing-generative-model': [GenerativeNeedDecisionDiagram, ConstraintSelectionDiagram],
  'building-genai-apps': [ApplicationArchitectureDiagram, OutputValidationDiagram],
  'genai-deployment': [HostedSelfHostedDiagram, ProductionReliabilityDiagram],
};

export function GenAIIntuition({ topicId }: { topicId: GenAITopic }) {
  const lesson = tutorials[topicId];
  const Figure = figures[topicId]?.[0];
  if (!lesson || !Figure) return null;
  return <section data-genai-intuition className="space-y-5">
    <h2>{lesson.title}</h2>
    {lesson.intro.map(p=><p key={p}>{p}</p>)}
    <Figure />
  </section>;
}

export function GenAIWorkedLab({ topicId }: { topicId: GenAITopic }) {
  const lesson = tutorials[topicId];
  const Figure = figures[topicId]?.[1];
  if (!lesson || !Figure) return null;
  return <div data-genai-worked-lab={topicId} className="space-y-8">
    <section className="space-y-5">
      <h2>{lesson.mechanismTitle}</h2>
      {lesson.mechanism.map(p=><p key={p}>{p}</p>)}
      <Figure />
    </section>
    <section className="space-y-4">
      <h2>{lesson.labTitle}</h2>
      <p>{lesson.setup}</p>
      <CodeBlock code={lesson.code} language="python" type="runnable" title="Complete Python example" caption="Copy into a .py file and run with Python 3. No third-party packages are required." />
      {lesson.output && <CodeBlock code={lesson.output} type="output" title="Output from running this example" caption="Captured from this exact code using Python 3.12. Values are from the teaching data above, not commercial-model benchmarks." />}
      <h3 className="text-xl font-bold">What This Run Shows</h3>
      <ol className="list-decimal space-y-3 pl-6">{lesson.notes.map(note=><li key={note}>{note}</li>)}</ol>
      <p>{lesson.meaning}</p>
      <Callout role="mistake" title="A mistake to avoid"><p>{lesson.mistake}</p></Callout>
      <details className="not-prose border-y border-[var(--lma-border-default)] bg-[var(--lma-canvas)] px-1 py-4">
        <summary className="cursor-pointer font-semibold text-[var(--lma-brand-text)]">Experiment: {lesson.tryIt}</summary>
        <p className="mt-4 leading-relaxed text-[var(--lma-text-secondary)]">{lesson.answer}</p>
      </details>
    </section>
  </div>;
}
