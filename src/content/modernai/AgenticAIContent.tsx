import { Callout } from "../../components/content/Callout";
import { CodeBlock as SharedCodeBlock } from "../../components/content/CodeBlock";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";
import { DataTable } from "../../components/content/DataTable";
import React from "react";
import { AlertTriangle, CheckCircle2, Lightbulb, Target } from "lucide-react";
import { AgenticVisualFigure } from "../../components/diagrams/AgenticAIDiagrams";
import { agenticLessonDetails, type AgenticTable } from "./agenticLessonDetails";
import { agenticLessonEnhancements } from "./agenticLessonEnhancements";

export type AgenticBaseLesson = {
  intro: string;
  analogy: string;
  steps: string[];
  exampleTitle: string;
  example: string;
  code: string;
  mistake: string;
  takeaway: string;
};

const runnableDocumentationAgent = `"""A tiny bounded documentation agent using only the Python standard library."""

DOCS = [
    {
        "title": "Reset a password",
        "text": "Open Settings, choose Security, then select Reset password.",
    },
    {
        "title": "Export an invoice",
        "text": "Open Billing, choose an invoice, then select Download PDF.",
    },
]

MAX_STEPS = 5
INSTRUCTIONS = (
    "Use only the approved documentation tool. "
    "Answer only when a source supports the answer; otherwise abstain."
)

def search_docs(query):
    """Validated read-only tool: return documents sharing useful words."""
    if not isinstance(query, str) or not query.strip():
        raise ValueError("query must be a non-empty string")
    terms = {word.strip("?.,").lower() for word in query.split() if len(word) > 3}
    return [doc for doc in DOCS if terms & set(doc["text"].lower().split())]

def decide(state):
    """Deterministic stand-in for a model's proposed next decision."""
    if state["step"] == 1:
        return {"type": "plan", "query": state["goal"]}
    if state["evidence"]:
        return {"type": "final"}
    if state["step"] == MAX_STEPS:
        return {"type": "abstain"}
    return {"type": "tool", "name": "search_docs", "query": state["query"]}

def run_agent(goal):
    state = {"goal": goal, "query": goal, "evidence": [], "step": 0, "trace": []}
    for step in range(1, MAX_STEPS + 1):
        state["step"] = step
        decision = decide(state)
        state["trace"].append(f"step {step}: {decision['type']}")

        if decision["type"] == "plan":
            state["query"] = decision["query"]
            continue
        if decision["type"] == "tool":
            if decision["name"] != "search_docs":
                raise PermissionError("Only search_docs is allowed")
            state["evidence"] = search_docs(decision["query"])
            state["trace"].append(f"  observation: {len(state['evidence'])} document(s)")
            continue
        if decision["type"] == "final":
            doc = state["evidence"][0]
            return {"status": "success", "answer": doc["text"], "source": doc["title"], "trace": state["trace"]}
        return {"status": "abstain", "answer": "I could not verify this in the approved documentation.", "trace": state["trace"]}

for question in ["How do I reset a password?", "How do I deploy to Mars?"]:
    result = run_agent(question)
    print(question)
    print("\n".join(result["trace"]))
    print(result["status"], "-", result["answer"], "\n")`;

function LessonTable({ table }: { table: AgenticTable }) {
  return <div data-agentic-table><DataTable title={table.title} headers={table.headers} rows={table.rows} /></div>;
}

function CodeExample({ topicId, code, label, note }: { topicId: string; code: string; label: string; note: string }) {
  const displayedCode = topicId === "building-ai-agent" ? runnableDocumentationAgent : code;
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-indigo-800">Read the Mechanism in Code</h2>
      <p className="mb-4 leading-relaxed text-slate-700">Use the label and note to understand what this block represents before reading each line.</p>
      <div data-agentic-code><SharedCodeBlock code={displayedCode} title={label} caption={<><strong>Learner note: </strong>{note}</>} /></div>
      {topicId === "building-ai-agent" && (
        <div className="not-prose mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">
          <strong className="text-emerald-900">Expected trace: </strong>The password question records <code>plan → tool → final</code> and succeeds at step 3. The unsupported Mars question reaches <code>step 5: abstain</code>. The limit is a safety and cost ceiling, not a target the successful run should consume.
        </div>
      )}
    </section>
  );
}

export function AgenticAIContent({ topicId, lesson }: { topicId: string; lesson: AgenticBaseLesson }) {
  const enhancement = agenticLessonEnhancements[topicId];
  const detail = agenticLessonDetails[topicId];
  if (!enhancement || !detail) return null;

  return (
    <div className="space-y-10" data-agentic-lesson={topicId}>
      <section className="not-prose rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-900"><Target className="h-5 w-5" />What You Will Learn</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {detail.objectives.map((objective) => <div key={objective} className="flex items-start gap-3 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" /><span>{objective}</span></div>)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Understand the Core Idea</h2>
        <p className="text-lg leading-relaxed text-slate-700">{lesson.intro}</p>
      </section>

      <Callout role="tip" title="A familiar way to picture it"><p>{lesson.analogy}</p></Callout>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">How the Process Works</h2>
        <div className="not-prose grid gap-3">
          {lesson.steps.map((step, index) => <div key={step} className="grid grid-cols-[2rem_1fr] gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">{index + 1}</span><p className="pt-1 leading-relaxed text-slate-700">{step}</p></div>)}
        </div>
      </section>

      <div className="space-y-6">{enhancement.visuals.map((visualId) => <div key={visualId}><AgenticVisualFigure id={visualId} /></div>)}</div>

      {detail.sections.map((section) => (
        <section key={section.title}>
          <h2 className="mb-4 text-2xl font-bold text-indigo-800">{section.title}</h2>
          <div className="space-y-3">{section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}</div>
          {section.bullets && <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>
      ))}

      <div className="space-y-6">{detail.tables.map((table) => <div key={table.title}><LessonTable table={table} /></div>)}</div>

      {detail.workedExample && (
        <section data-agentic-worked-example>
          <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked Example: {detail.workedExample.title}</h2>
          <p className="leading-relaxed text-slate-700">{detail.workedExample.setup}</p>
          <ol className="mt-4 space-y-3 pl-0">
            {detail.workedExample.steps.map((step, index) => <li key={step} className="not-prose grid grid-cols-[2rem_1fr] gap-3 rounded-xl bg-slate-50 p-4 text-slate-700"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">{index + 1}</span><span className="pt-1 leading-relaxed">{step}</span></li>)}
          </ol>
          <div className="not-prose mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-slate-700"><strong className="text-emerald-900">What the result means: </strong>{detail.workedExample.result}</div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A Realistic Example: {lesson.exampleTitle}</h2>
        <p className="leading-relaxed text-slate-700">{lesson.example}</p>
      </section>

      <CodeExample topicId={topicId} code={lesson.code} label={enhancement.codeLabel} note={enhancement.codeNote} />

      {topicId === "building-ai-agent" && (
        <section className="not-prose rounded-2xl border border-violet-200 bg-violet-50 p-5 sm:p-6">
          <h2 className="text-xl font-extrabold text-violet-950">Practice the End-to-End Agent</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            <li>Run both supplied questions and match each printed trace to the architecture figure.</li>
            <li>Add one approved document and predict which terms will retrieve it before running.</li>
            <li>Create one malformed tool argument and confirm validation rejects it.</li>
            <li>Turn the success and abstention traces into two repeatable tests before adding any write tool.</li>
          </ol>
        </section>
      )}

      <Callout role="mistake" title="Common mistake"><p>{lesson.mistake}</p></Callout>

      <div data-agentic-summary><SummaryCard items={enhancement.summary} className="mt-0" /></div>
    </div>
  );
}

export { runnableDocumentationAgent };
