import { Callout } from '../../components/content/Callout';
import { CodeBlock } from '../../components/content/CodeBlock';
import { DataTable } from '../../components/content/DataTable';
import { FormulaBlock } from '../../components/content/FormulaBlock';
import { AgenticTutorialDiagram } from '../../components/diagrams/AgenticTutorialDiagrams';
import tutorials from './agenticTutorialLabs.json';

export type AgenticTutorialTopic = keyof typeof tutorials;

export function AgenticConceptExpansion({ topicId, title }: { topicId: AgenticTutorialTopic; title?: string }) {
  const lesson = tutorials[topicId];
  return <section data-agentic-concept-expansion={topicId} className="space-y-5">
    <h2>{title ?? lesson.title}</h2>
    {lesson.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <DataTable title="Terms Used in This Example" headers={['Term', 'Meaning here']} rows={lesson.terms}/>
  </section>;
}

export function AgenticWorkedLab({ topicId, title }: { topicId: AgenticTutorialTopic; title?: string }) {
  const lesson = tutorials[topicId];
  return <section data-agentic-worked-lab={topicId} className="space-y-5">
    <h2>{title ?? lesson.labTitle}</h2>
    <p>{lesson.setup}</p>
    <FormulaBlock expression={lesson.formula} explanation={lesson.formulaExplanation}/>
    <ol className="list-decimal space-y-3 pl-6">{lesson.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <AgenticTutorialDiagram topicId={topicId}/>
    <CodeBlock code={lesson.code} language="python" type="runnable" title="Complete Python Exercise" caption="Run with Python 3 using only its standard library. No API key, paid service or model download is required. Model proposals and external observations are explicitly simulated; the application logic really executes."/>
    <CodeBlock code={lesson.output} type="output" title="Output from This Exact Program" caption="Captured with Python 3.12. Fixture timings, prices and evaluation results are teaching inputs, not provider benchmarks."/>
    <h3 className="text-xl font-bold text-[var(--lma-text-primary)]">What This Run Shows</h3>
    <ol className="list-decimal space-y-3 pl-6">{lesson.notes.map(note => <li key={note}>{note}</li>)}</ol>
    <p>{lesson.meaning}</p>
    <DataTable title="From the Exercise to an Application" headers={['Situation', 'Practical choice', 'Important qualification']} rows={lesson.choices}/>
    <Callout role="warning" title="What This Exercise Does Not Prove"><p>{lesson.limit}</p></Callout>
    <details className="not-prose border-y border-[var(--lma-border-default)] px-1 py-4">
      <summary className="cursor-pointer font-semibold leading-relaxed text-[var(--lma-brand-text)]">Experiment: {lesson.experiment}</summary>
      <p className="mt-4 leading-relaxed text-[var(--lma-text-secondary)]">{lesson.answer}</p>
    </details>
  </section>;
}
