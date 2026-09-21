import { DataTable } from "../../components/content/DataTable";
import { CodeBlock } from "../../components/content/CodeBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Code2, Lightbulb, Target } from "lucide-react";
import { CareerInterviewFigure } from "../../components/diagrams/CareerInterviewDiagrams";
import { careerLessons, type TableData } from "./careerInterviewLessonData";

function LessonTable({ table }: { table: TableData }) {
  return <DataTable title={table.title} headers={table.headers} rows={table.rows} />;
}

const Label = ({ children, tone = "indigo" }: { children: React.ReactNode; tone?: "indigo" | "emerald" | "amber" | "rose" }) => {
  const colors = { indigo: "bg-indigo-100 text-indigo-800", emerald: "bg-emerald-100 text-emerald-800", amber: "bg-amber-100 text-amber-900", rose: "bg-rose-100 text-rose-800" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold tracking-wide ${colors[tone]}`}>{children}</span>;
};

function InterviewQuestions({ items }: { items: NonNullable<(typeof careerLessons)[string]["questions"]> }) {
  return <section className="mt-12" aria-labelledby="interview-questions-heading"><h2 id="interview-questions-heading">Interview questions with reasoning</h2><p>Practice the short answer aloud first. Then use the remaining layers to prepare for follow-up.</p><div className="not-prose mt-7 space-y-7">{items.map((item, index) => <article key={item.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6"><div className="mb-3 flex flex-wrap items-center gap-2"><Label>QUESTION {index + 1}</Label><span className="text-xs font-semibold text-slate-500">{item.testing}</span></div><h3 className="text-xl font-extrabold text-slate-900">{item.question}</h3></div><div className="space-y-5 p-5 text-sm leading-relaxed text-slate-700 sm:p-6"><div><Label tone="emerald">INTERVIEW-READY ANSWER</Label><p className="mt-2">{item.short}</p></div><div><Label>DEEPER EXPLANATION</Label><p className="mt-2">{item.deeper}</p></div>{item.example && <div className="rounded-xl border-l-4 border-cyan-500 bg-cyan-50 p-4"><strong className="text-cyan-950">Example or calculation: </strong>{item.example}</div>}<div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-amber-50 p-4"><strong className="text-amber-950">Likely follow-up: </strong>{item.followup}</div><div className="rounded-xl bg-rose-50 p-4"><strong className="text-rose-950">Weak answer to avoid: </strong>{item.mistake}</div></div></div></article>)}</div></section>;
}

function Exercises({ items }: { items: NonNullable<(typeof careerLessons)[string]["exercises"]> }) {
  return <section className="mt-12" aria-labelledby="solved-exercises-heading"><h2 id="solved-exercises-heading">Solved interview exercises</h2><div className="not-prose mt-7 space-y-8">{items.map(item => <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 bg-slate-50 p-5"><Label tone="emerald">{item.kind}</Label><h3 className="mt-3 text-xl font-extrabold text-slate-900">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-700"><strong>Problem: </strong>{item.problem}</p></div><div className="p-5 sm:p-6"><p className="text-sm leading-relaxed text-slate-700"><strong>Reasoning: </strong>{item.reasoning}</p><CodeBlock title={item.kind} code={item.code} /><div className="grid gap-3 text-sm leading-relaxed sm:grid-cols-3"><div className="rounded-xl bg-indigo-50 p-4"><strong>Complexity: </strong>{item.complexity}</div><div className="rounded-xl bg-amber-50 p-4"><strong>Edge cases: </strong>{item.edge}</div><div className="rounded-xl bg-emerald-50 p-4"><strong>Follow-up: </strong>{item.followup}</div></div></div></article>)}</div></section>;
}

function DesignCases({ items }: { items: NonNullable<(typeof careerLessons)[string]["cases"]> }) {
  const fields: Array<[string, keyof (typeof items)[number]]> = [["Requirements", "requirements"], ["Architecture", "architecture"], ["Success metrics", "metrics"], ["Capacity / bottleneck", "bottleneck"], ["Major failure modes", "failures"], ["Trade-offs", "tradeoffs"], ["Likely follow-up", "followup"]];
  return <section className="mt-12" aria-labelledby="system-cases-heading"><h2 id="system-cases-heading">System-design cases</h2><div className="not-prose mt-7 space-y-7">{items.map(item => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h3 className="text-xl font-extrabold text-slate-900">{item.title}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{fields.map(([label, key]) => <div key={key} className={`rounded-xl border p-4 ${key === "architecture" ? "border-indigo-200 bg-indigo-50 sm:col-span-2" : "border-slate-200 bg-slate-50"}`}><div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</div><p className="mt-2 text-sm leading-relaxed text-slate-700">{item[key]}</p></div>)}</div></article>)}</div></section>;
}

function DebugScenarios({ items }: { items: NonNullable<(typeof careerLessons)[string]["scenarios"]> }) {
  const fields: Array<[string, keyof (typeof items)[number], string]> = [["Symptom", "symptom", "bg-rose-50"], ["Likely causes", "causes", "bg-amber-50"], ["Evidence to inspect", "evidence", "bg-sky-50"], ["First safe action", "action", "bg-indigo-50"], ["Fix", "fix", "bg-emerald-50"], ["Prevention", "prevention", "bg-slate-50"]];
  return <section className="mt-12" aria-labelledby="debug-scenarios-heading"><h2 id="debug-scenarios-heading">Production debugging scenarios</h2><div className="not-prose mt-7 space-y-7">{items.map(item => <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><h3 className="border-b border-slate-200 bg-slate-900 px-5 py-4 text-xl font-extrabold text-white">{item.title}</h3><div className="grid gap-3 p-5 sm:grid-cols-2">{fields.map(([label, key, color]) => <div key={key} className={`rounded-xl p-4 ${color}`}><div className="text-xs font-extrabold uppercase tracking-wide text-slate-600">{label}</div><p className="mt-2 text-sm leading-relaxed text-slate-700">{item[key]}</p></div>)}</div></article>)}</div></section>;
}

function BehavioralPrompts({ items }: { items: NonNullable<(typeof careerLessons)[string]["prompts"]> }) {
  return <section className="mt-12" aria-labelledby="behavioral-prompts-heading"><h2 id="behavioral-prompts-heading">Eight high-value project and behavioral prompts</h2><div className="not-prose mt-7 grid gap-5 lg:grid-cols-2">{items.map((item, index) => <article key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-black text-indigo-700">{index + 1}</span><h3 className="text-lg font-extrabold text-slate-900">{item.question}</h3></div><div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700"><strong>Answer framework: </strong>{item.framework}</div><div className="mt-3 rounded-xl bg-rose-50 p-4 text-sm leading-relaxed text-slate-700"><strong>Avoid: </strong>{item.avoid}</div></article>)}</div></section>;
}

export function CareerInterviewContent() {
  const { topicId = "" } = useParams<{ topicId: string }>();
  const lesson = careerLessons[topicId];
  if (!lesson) return null;

  return <div className="prose prose-slate max-w-none">
    {lesson.opening.map(paragraph => <p key={paragraph} className="text-lg leading-relaxed text-slate-700">{paragraph}</p>)}

    <section className="not-prose my-8 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5 sm:p-6" aria-labelledby="learning-goals-heading">
      <h2 id="learning-goals-heading" className="flex items-center gap-3 text-2xl font-extrabold text-slate-900"><Target className="h-7 w-7 text-indigo-600"/>What you will be able to do</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">{lesson.objectives.map(item => <li key={item} className="flex items-start gap-3 rounded-xl bg-white p-3 text-sm leading-relaxed text-slate-700 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"/>{item}</li>)}</ul>
    </section>

    {lesson.visuals.map(id => <React.Fragment key={id}><CareerInterviewFigure id={id}/></React.Fragment>)}

    {lesson.sections.map(section => <section key={section.title} className="mt-12"><h2>{section.title}</h2>{section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.table && <LessonTable table={section.table}/>}</section>)}

    {lesson.questions && <InterviewQuestions items={lesson.questions}/>} 
    {lesson.exercises && <Exercises items={lesson.exercises}/>} 
    {lesson.cases && <DesignCases items={lesson.cases}/>} 
    {lesson.scenarios && <DebugScenarios items={lesson.scenarios}/>} 
    {lesson.prompts && <BehavioralPrompts items={lesson.prompts}/>} 

    <section className="mt-12" aria-labelledby="review-links-heading"><h2 id="review-links-heading">Review the deeper lessons</h2><p>Use these links when an interview question exposes a gap. The interview guide focuses on explanation and decision-making; the linked lesson teaches the full concept.</p><div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">{lesson.links.map(([label, route, description]) => <Link key={route} to={route} className="rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"><div className="font-extrabold text-indigo-700">{label} →</div><div className="mt-1 text-sm leading-relaxed text-slate-600">{description}</div></Link>)}</div></section>

    <div className="not-prose mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0"/><p><strong>Keep the answer honest:</strong> role boundaries, interview processes, and project outcomes vary. Never invent experience, impact, salary, or certainty to make an answer sound stronger.</p></div>

    <div data-career-summary><SummaryCard headingId="career-summary-heading" items={lesson.summary} /></div>
  </div>;
}
