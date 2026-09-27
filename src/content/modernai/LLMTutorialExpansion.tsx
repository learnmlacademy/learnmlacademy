import { Callout } from '../../components/content/Callout';
import { CodeBlock } from '../../components/content/CodeBlock';
import { DataTable } from '../../components/content/DataTable';
import { FormulaBlock } from '../../components/content/FormulaBlock';
import { LLMTutorialDiagram } from '../../components/diagrams/LLMTutorialDiagrams';
import tutorials from './llmTutorialLabs.json';

export type LLMTutorialTopic = keyof typeof tutorials;

export function LLMConceptExpansion({ topicId }: { topicId: LLMTutorialTopic }) {
  const lesson = tutorials[topicId];
  return <section data-llm-concept-expansion={topicId} className="space-y-5">
    <h2>{lesson.title}</h2>
    {lesson.paragraphs.map(p=><p key={p}>{p}</p>)}
    <DataTable title="Terms Used in This Example" headers={['Term', 'Meaning here']} rows={lesson.terms}/>
  </section>;
}

export function LLMWorkedLab({ topicId }: { topicId: LLMTutorialTopic }) {
  const lesson = tutorials[topicId];
  return <div data-llm-worked-lab={topicId} className="space-y-8">
    <section className="space-y-4">
      <h2>{lesson.labTitle}</h2>
      <p>{lesson.setup}</p>
      <FormulaBlock expression={lesson.formula} explanation={lesson.formulaExplanation}/>
      <ol className="list-decimal space-y-3 pl-6">{lesson.steps.map(step=><li key={step}>{step}</li>)}</ol>
      <LLMTutorialDiagram topicId={topicId}/>
      <CodeBlock code={lesson.code} language="python" type="runnable" title="Complete Python Example" caption="Copy into a .py file and run with Python 3. No API key, model download, or third-party package is required."/>
      <CodeBlock code={lesson.output} type="output" title="Output from This Exact Program" caption="Captured by running the code with Python 3.12. These are teaching examples, not commercial-model benchmarks."/>
      <h3 className="text-xl font-bold text-[var(--lma-text-primary)]">What This Run Shows</h3>
      <ol className="list-decimal space-y-3 pl-6">{lesson.notes.map(note=><li key={note}>{note}</li>)}</ol>
      <p>{lesson.meaning}</p>
      <DataTable title="Applying the Idea" headers={['Situation', 'Practical choice', 'Important qualification']} rows={lesson.choices}/>
      <Callout role="warning" title="Where This Example Stops"><p>{lesson.limit}</p></Callout>
      <details className="not-prose border-y border-[var(--lma-border-default)] px-1 py-4">
        <summary className="cursor-pointer font-semibold leading-relaxed text-[var(--lma-brand-text)]">Experiment: {lesson.experiment}</summary>
        <p className="mt-4 leading-relaxed text-[var(--lma-text-secondary)]">{lesson.answer}</p>
      </details>
    </section>
  </div>;
}
