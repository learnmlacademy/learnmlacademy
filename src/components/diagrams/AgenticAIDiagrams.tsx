import React, { type ReactNode } from "react";
import type { AgenticVisualId } from "../../content/modernai/agenticLessonEnhancements";

type Tone = "indigo" | "cyan" | "emerald" | "amber" | "rose" | "slate" | "violet";

const toneClasses: Record<Tone, string> = {
  indigo: "border-indigo-300 bg-indigo-50 text-indigo-950",
  cyan: "border-cyan-300 bg-cyan-50 text-cyan-950",
  emerald: "border-emerald-300 bg-emerald-50 text-emerald-950",
  amber: "border-amber-300 bg-amber-50 text-amber-950",
  rose: "border-rose-300 bg-rose-50 text-rose-950",
  slate: "border-slate-300 bg-white text-slate-950",
  violet: "border-violet-300 bg-violet-50 text-violet-950",
};

function Node({ label, detail, tone = "indigo", rounded = "rounded-xl" }: { label: string; detail?: string; tone?: Tone; rounded?: string }) {
  return (
    <div className={`${rounded} min-w-0 border-2 px-3 py-3 text-center shadow-sm ${toneClasses[tone]}`}>
      <div className="text-sm font-extrabold leading-tight">{label}</div>
      {detail && <div className="mt-1 text-xs leading-snug opacity-80">{detail}</div>}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center text-indigo-600" aria-hidden="true">
      {label && <span className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</span>}
      <span className="text-2xl font-black leading-none sm:rotate-0 rotate-90">→</span>
    </div>
  );
}

function Flow({ children }: { children: ReactNode[] }) {
  return <div className="grid items-stretch gap-2 sm:flex sm:items-center sm:justify-center">{children}</div>;
}

function FigureFrame({ id, title, question, caption, children }: { id: AgenticVisualId; title: string; question: string; caption: string; children: ReactNode }) {
  return (
    <figure data-agentic-visual={id} className="not-prose overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-sm">
      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Instructional figure</p>
        <h3 className="mt-1 text-lg font-extrabold leading-snug text-slate-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{question}</p>
      </div>
      <div className="overflow-hidden p-4 sm:p-6">{children}</div>
      <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600 sm:px-6">{caption}</figcaption>
    </figure>
  );
}

function LoopRing({ items, center }: { items: Array<{ label: string; detail: string; tone: Tone }>; center: string }) {
  return (
    <div className="relative mx-auto grid max-w-2xl grid-cols-2 gap-3 rounded-[2rem] border-2 border-dashed border-indigo-300 bg-indigo-50/40 p-4 sm:grid-cols-4 sm:p-6">
      {items.map((item, index) => (
        <div key={item.label} className="relative">
          <Node {...item} rounded="rounded-full" />
          {index < items.length - 1 && <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-xl font-black text-indigo-600 sm:block" aria-hidden="true">→</span>}
        </div>
      ))}
      <div className="col-span-2 rounded-xl bg-slate-900 px-4 py-2 text-center text-xs font-bold text-white sm:col-span-4">↺ {center}</div>
    </div>
  );
}

function SplitLane({ leftTitle, left, rightTitle, right }: { leftTitle: string; left: ReactNode; rightTitle: string; right: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-4"><h4 className="mb-3 text-center text-sm font-extrabold text-slate-900">{leftTitle}</h4>{left}</div>
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4"><h4 className="mb-3 text-center text-sm font-extrabold text-indigo-950">{rightTitle}</h4>{right}</div>
    </div>
  );
}

function MiniFlow({ items }: { items: Array<{ label: string; tone?: Tone }> }) {
  return (
    <Flow>
      {items.flatMap((item, index) => [
        <React.Fragment key={`n-${item.label}`}><Node label={item.label} tone={item.tone} /></React.Fragment>,
        ...(index < items.length - 1 ? [<React.Fragment key={`a-${item.label}`}><Arrow /></React.Fragment>] : []),
      ])}
    </Flow>
  );
}

const visualMeta: Record<AgenticVisualId, { title: string; question: string; caption: string }> = {
  "agent-loop": { title: "The bounded agent loop", question: "How does an agent turn a goal into a sequence of controlled actions?", caption: "A model chooses among permitted next actions. The surrounding application validates actions, records observations, checks budgets, and decides when the loop must stop." },
  "autonomy-continuum": { title: "Autonomy is a continuum, not an on/off switch", question: "Where do code, workflows, and common agent types sit as decision freedom increases?", caption: "Move right only when changing evidence makes fixed rules insufficient. Greater autonomy also requires stronger limits, evaluation, and approval." },
  "tool-trust-boundary": { title: "A tool call crosses a trust boundary", question: "Which parts are proposals, and which parts must be enforced by trusted code?", caption: "Schema-valid JSON is only a proposal. Identity, authorization, policy, idempotency, execution, and result minimization belong to the trusted application boundary." },
  "tool-call-lifecycle": { title: "Tool-call lifecycle: proposal, permission, execution, and receipt", question: "What happens between a user's refund request and a trustworthy final response?", caption: "The model proposes structured arguments. Trusted code separately validates structure, ownership, policy, and idempotency before execution. A retry reuses the key and returns receipt R-731 instead of issuing a second refund." },
  "context-trust-zones": { title: "Assembling context by role and trust", question: "How should different information sources enter one next-step model call?", caption: "Trusted instructions remain distinct from user input and untrusted evidence. The assembler selects relevant, recent information and labels provenance before the model sees it." },
  "context-budget-32k": { title: "A 32K context budget with room for action", question: "Why must an acting agent reserve space for both output and future tool results?", caption: "The current plan commits 30K of 32K tokens, leaving only 2K. A new 4K tool result cannot fit until lower-value context is compressed or removed." },
  "memory-lifecycle": { title: "The memory lifecycle", question: "How does an approved fact become useful memory without being stored forever or recalled blindly?", caption: "Memory needs deliberate write, retrieve, verify, update, and delete policies. Provenance and recency help resolve stale or conflicting facts." },
  "memory-managed-lifecycle": { title: "Memory is managed application state—not automatic model knowledge", question: "How does one explicit preference move through write, recall, conflict, update, and deletion?", caption: "The application stores an approved preference with provenance, recalls it only when relevant, supersedes the old value when the user changes it, and removes it on request. The model weights never change." },
  "planning-react-reflection": { title: "Planning, ReAct, and reflection in one bounded loop", question: "What happens before, during, and after an agent action?", caption: "The plan suggests structure, ReAct adapts to observations, and a verifier checks explicit criteria. Success, no progress, or a budget limit ends the loop." },
  "observable-react-trajectory": { title: "An observable ReAct trajectory ends on evidence—not hidden reasoning", question: "How does a missing field cause one revised action and then a verified stop?", caption: "Only inspectable artifacts are shown: chosen action, validated tool, observation, verifier result, remaining budget, and stop reason. Repeating the same ineffective action triggers no-progress escalation." },
  "agent-state-graph": { title: "An explicit agent state graph", question: "How do typed state and named routes make an agent workflow testable?", caption: "Every node receives and updates defined state. Conditional edges expose why the run searches again, requests review, writes, or ends." },
  "orchestration-patterns": { title: "Two reusable graph patterns", question: "When does work fan out, and when does one result loop through evaluation?", caption: "Orchestrator-worker parallelizes independent subtasks. Evaluator-optimizer revises one output against criteria and must have a revision limit." },
  "durable-human-timeline": { title: "A durable task can pause and safely resume", question: "What must be saved before a task waits for a human decision?", caption: "The worker releases resources while the checkpoint waits. Resume rechecks authorization, expiry, and external conditions before any side effect executes once." },
  "checkpoint-revalidate-resume": { title: "Checkpoint, wait, revalidate, then resume exactly once", question: "Why can an old approval not be replayed after external state changes?", caption: "The first approval expires while the price changes. Resume reloads authoritative state, re-authenticates, detects staleness, requests revised approval, and executes once with the original idempotency key." },
  "rag-vs-agentic-rag": { title: "Baseline RAG and Agentic RAG take different paths", question: "Where does an adaptive retrieval system make extra decisions?", caption: "Baseline RAG performs one designed retrieval. Agentic RAG can decide, grade, rewrite, change source, and abstain—but every extra loop adds latency and risk." },
  "corrective-retrieval-loop": { title: "The corrective retrieval loop", question: "What should happen when evidence is weak or conflicting?", caption: "Each retry targets a named evidence gap. The loop stops when evidence is sufficient, sources conflict, or retrieval/time/cost budgets are exhausted." },
  "bounded-agent-architecture": { title: "A complete bounded agent architecture", question: "Where do instructions, decisions, tools, state, validation, and stopping rules connect?", caption: "The model may propose a decision, but the application validates it, runs only approved tools, records observations, and enforces success or abstention." },
  "multi-agent-topologies": { title: "Three multi-agent topologies", question: "Who owns control in manager-worker, agent-as-tool, and handoff designs?", caption: "Agents-as-tools return to a controller. A handoff transfers ownership. Manager-worker keeps delegation and synthesis under one manager." },
  "delegation-lifecycle": { title: "A delegation contract from assignment to integration", question: "What information must cross an agent boundary?", caption: "A bounded contract travels to the specialist; a structured result and evidence return. The owner validates and integrates rather than accepting an unexamined answer." },
  "mcp-architecture": { title: "MCP architecture and its trust boundary", question: "How does an AI host reach an underlying service through MCP?", caption: "MCP standardizes compatible discovery and invocation. Authentication, consent, authorization, and the safety of the underlying API remain system responsibilities." },
  "mcp-invocation-sequence": { title: "MCP discovery and invocation are distinct protocol steps", question: "Which messages are protocol interactions, and which call actually reaches the underlying service?", caption: "The diagram is version-conscious: exact wire fields are not assumed. Discovery advertises a capability; invocation crosses server-side auth before the separate service request. Insufficient scope returns a structured rejection without calling the service." },
  "framework-decision-flow": { title: "Choose an agent framework from the runtime need", question: "Which concrete requirement justifies adding a framework?", caption: "Plain code is the default for a small loop. Explicit durable graphs, role/team orchestration, or conversational event-driven coordination may justify specialized frameworks." },
  "framework-control-models": { title: "One research-brief problem, four control models", question: "What changes when the task is expressed in plain code, LangGraph, CrewAI, or AutoGen?", caption: "The business tools and acceptance checks remain the same. The approaches differ in who owns state, how control moves, how collaboration is represented, and which runtime features introduce dependency and lock-in." },
  "observe-act-verify": { title: "Observe, act, re-observe, verify", question: "Why must a browser or computer-use agent look again after every action?", caption: "Clicking or typing can change the page. The agent discards stale coordinates or DOM state, re-observes, and verifies the intended change before continuing." },
  "sandbox-boundary": { title: "A least-privilege code sandbox", question: "Which resources may generated code access, and which remain outside the boundary?", caption: "Generated code receives only task-specific files, destinations, processes, and resource limits. Host files, secrets, and unapproved network access stay blocked." },
  "prompt-injection-boundary": { title: "Indirect prompt injection stopped at the action boundary", question: "How can hostile document text attempt—but fail—to become authority?", caption: "The webpage is untrusted data. Trust separation, authorization, and a tool guardrail block the sensitive call even if the model proposes it." },
  "recovery-decision-tree": { title: "Choose recovery by failure type", question: "When should a failed action retry, compensate, fall back, escalate, or stop?", caption: "Only transient operations that are safe to repeat enter bounded retry. Uncertain side effects require status checks, compensation, escalation, or a safe stop." },
  "evaluation-trajectory": { title: "Evaluate every important point in the trajectory", question: "Where can an agent fail even when the final answer looks correct?", caption: "Evaluation attaches checks to decisions, arguments, observations, retries, handoffs, final output, safety, latency, and cost—not just the last sentence." },
  "trace-waterfall": { title: "One trace, many timed spans", question: "How does a trace reveal where an agent spent time, tokens, and money?", caption: "The trace groups the task; each horizontal span is one operation. Its start, duration, tokens, cost, and status make bottlenecks and failures locatable." },
  "latency-cost-chart": { title: "Latency and cost accumulate step by step", question: "Why can a short agent loop become slow and expensive?", caption: "The five sequential spans total 4.1 seconds and $0.022. Extra model/tool steps and retries increase both totals before the user receives one result." },
};

function VisualBody({ id }: { id: AgenticVisualId }) {
  switch (id) {
    case "agent-loop":
      return <LoopRing center="Update state, check success and limits, then continue or stop" items={[{ label: "Goal + context", detail: "What must be achieved?", tone: "slate" }, { label: "Decide", detail: "Answer, tool, clarify, or stop", tone: "violet" }, { label: "Act", detail: "Validated permitted tool", tone: "amber" }, { label: "Observe", detail: "Structured result", tone: "cyan" }]} />;
    case "autonomy-continuum":
      return <div><div className="grid grid-cols-1 gap-2 sm:grid-cols-6">{[["Ordinary code","fixed rules","emerald"],["Workflow","fixed branches","emerald"],["Reflex agent","reacts now","cyan"],["Stateful agent","tracks environment","cyan"],["Goal / utility","compares outcomes","violet"],["LLM agent","open-ended context","rose"]].map(([a,b,c],i)=><div key={a} className="relative"><Node label={a} detail={b} tone={c as Tone}/>{i<5&&<span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl font-black text-indigo-700 sm:block">›</span>}</div>)}</div><div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-600"><span>More predefined</span><span className="h-2 flex-1 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-500"/><span>More model-directed</span></div></div>;
    case "tool-trust-boundary":
      return <div className="grid gap-3 lg:grid-cols-[1fr_auto_2fr_auto_1fr] lg:items-center"><Node label="Model proposal" detail="tool name + JSON arguments" tone="violet"/><Arrow/><div className="rounded-2xl border-2 border-dashed border-rose-400 bg-rose-50 p-3"><p className="mb-2 text-center text-xs font-extrabold uppercase text-rose-800">Trusted application boundary</p><MiniFlow items={[{label:"Schema"},{label:"Identity + authorization",tone:"amber"},{label:"Policy + idempotency",tone:"rose"},{label:"Execute",tone:"emerald"}]}/></div><Arrow/><Node label="Compact observation" detail="status, useful fields, receipt/error" tone="cyan"/></div>;
    case "tool-call-lifecycle":
      return <div className="space-y-4"><MiniFlow items={[{label:"Refund request",tone:"slate"},{label:"Model proposes JSON",tone:"violet"},{label:"Schema check",tone:"cyan"},{label:"Owner + policy check",tone:"amber"},{label:"Execute with key K-91",tone:"emerald"},{label:"Receipt R-731",tone:"indigo"}]}/><div className="grid gap-3 md:grid-cols-2"><div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3"><p className="text-xs font-extrabold text-rose-950">UNAUTHORIZED BRANCH</p><p className="mt-2 text-xs leading-relaxed text-slate-700">Valid JSON + wrong account owner → reject before execution.</p></div><div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3"><p className="text-xs font-extrabold text-amber-950">LOST-RESPONSE RETRY</p><p className="mt-2 text-xs leading-relaxed text-slate-700">Retry key K-91 → return existing R-731 → no second refund.</p></div></div></div>;
    case "context-trust-zones":
      return <div className="grid gap-4 lg:grid-cols-[1fr_auto_1.4fr]"><div className="space-y-2"><Node label="System + developer rules" detail="trusted authority" tone="emerald"/><Node label="User request" detail="task input" tone="cyan"/><Node label="Memory + task state" detail="selected application data" tone="indigo"/><Node label="Retrieved pages + tool output" detail="untrusted evidence" tone="rose"/></div><Arrow/><div className="rounded-[2rem] border-2 border-indigo-300 bg-indigo-50 p-4"><p className="text-center text-sm font-extrabold text-indigo-950">Context assembler</p><div className="my-3 grid grid-cols-2 gap-2 text-center text-xs font-bold"><span className="rounded-full bg-white p-2">Relevant?</span><span className="rounded-full bg-white p-2">Trusted as what?</span><span className="rounded-full bg-white p-2">Current?</span><span className="rounded-full bg-white p-2">Fits budget?</span></div><Node label="Next-step model context" detail="roles and provenance preserved" tone="violet" rounded="rounded-full"/></div></div>;
    case "context-budget-32k":
      return <div className="space-y-4"><div className="flex h-16 overflow-hidden rounded-xl border-2 border-slate-300 text-[10px] font-bold sm:text-xs"><div className="flex items-center justify-center bg-indigo-200 px-1 text-center" style={{width:"10.9375%"}}>3.5K<br/>rules + tools</div><div className="flex items-center justify-center bg-cyan-200 px-1 text-center" style={{width:"4.6875%"}}>1.5K<br/>state</div><div className="flex items-center justify-center bg-violet-300 px-1 text-center" style={{width:"46.875%"}}>15K retrieved evidence</div><div className="flex items-center justify-center bg-amber-200 px-1 text-center" style={{width:"18.75%"}}>6K history</div><div className="flex items-center justify-center bg-emerald-200 px-1 text-center" style={{width:"12.5%"}}>4K output</div><div className="flex items-center justify-center bg-white px-1 text-center" style={{width:"6.25%"}}>2K<br/>free</div></div><div className="grid gap-2 sm:grid-cols-3"><Node label="Input = 26K" detail="3.5 + 1.5 + 15 + 6"/><Node label="Committed = 30K" detail="26K input + 4K output" tone="emerald"/><Node label="New result = 4K" detail="Only 2K free → compress first" tone="rose"/></div></div>;
    case "memory-lifecycle":
      return <div className="mx-auto max-w-3xl"><MiniFlow items={[{label:"Candidate fact",tone:"slate"},{label:"Write policy",tone:"amber"},{label:"Stored + provenance",tone:"indigo"},{label:"Relevant recall",tone:"cyan"},{label:"Verify freshness",tone:"violet"},{label:"Use in context",tone:"emerald"}]}/><div className="mx-auto mt-4 grid max-w-lg grid-cols-3 gap-2"><Node label="Update" detail="newer verified fact" tone="amber"/><Node label="Version" detail="keep trace" tone="cyan"/><Node label="Delete" detail="expiry or user request" tone="rose"/></div></div>;
    case "memory-managed-lifecycle":
      return <div className="space-y-4"><MiniFlow items={[{label:"User: save PDF format",tone:"slate"},{label:"Write policy",tone:"amber"},{label:"Store value + source + time",tone:"indigo"},{label:"Recall for report task",tone:"cyan"},{label:"New preference supersedes old",tone:"violet"},{label:"Delete on request",tone:"rose"}]}/><div className="grid gap-2 text-center text-xs font-bold sm:grid-cols-4"><span className="rounded-lg bg-indigo-50 p-2">Context: current call packet</span><span className="rounded-lg bg-cyan-50 p-2">Memory: persisted preference</span><span className="rounded-lg bg-amber-50 p-2">Checkpoint: task progress</span><span className="rounded-lg bg-slate-100 p-2">Weights: unchanged</span></div></div>;
    case "planning-react-reflection":
      return <LoopRing center="Stop on verified success, no progress, max steps, budget, or escalation" items={[{label:"Short plan",detail:"dependencies and success",tone:"slate"},{label:"Decide + act",detail:"one permitted action",tone:"violet"},{label:"Observe",detail:"record evidence",tone:"cyan"},{label:"Verify / reflect",detail:"pass, revise, or replan",tone:"amber"}]}/>;
    case "observable-react-trajectory":
      return <div className="space-y-3"><div className="grid gap-2 sm:grid-cols-4"><Node label="1 · Search source A" detail="Observation: price found; warranty missing" tone="cyan"/><Node label="Verify: incomplete" detail="2 of 4 tool steps remain" tone="amber"/><Node label="2 · Search source B" detail="Observation: warranty = 2 years" tone="violet"/><Node label="Verify: pass → STOP" detail="all required fields supported" tone="emerald"/></div><div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3 text-center text-xs font-bold text-rose-950">If source A would be searched again with the same query: duplicate-action detector → NO PROGRESS → escalate or stop</div></div>;
    case "agent-state-graph":
      return <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><Node label="START" detail="typed task state" tone="slate"/><Arrow/><Node label="Plan" detail="model-directed route" tone="violet"/><div className="hidden sm:block"><Arrow/></div><div className="col-span-3 grid gap-2 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-3 sm:col-span-1"><Node label="Search" detail="tool node" tone="cyan"/><div className="grid grid-cols-2 gap-2"><Node label="More" detail="loop ↺" tone="amber"/><Node label="Enough" detail="write" tone="emerald"/></div><Node label="END" detail="complete / safe stop" tone="slate" rounded="rounded-full"/></div></div>;
    case "orchestration-patterns":
      return <SplitLane leftTitle="Orchestrator → parallel workers → join" left={<div><Node label="Orchestrator" tone="indigo"/><div className="my-2 text-center font-black text-indigo-600">↙ ↓ ↘</div><div className="grid grid-cols-3 gap-2"><Node label="Worker A" tone="cyan"/><Node label="Worker B" tone="cyan"/><Node label="Worker C" tone="cyan"/></div><div className="my-2 text-center font-black text-indigo-600">↘ ↓ ↙</div><Node label="Merge" tone="emerald"/></div>} rightTitle="Generate → evaluate → bounded revision" right={<MiniFlow items={[{label:"Draft",tone:"violet"},{label:"Evaluator",tone:"amber"},{label:"Revise ≤ N",tone:"cyan"},{label:"Accept / stop",tone:"emerald"}]}/>}/>;
    case "durable-human-timeline":
      return <div className="relative"><div className="absolute left-5 top-4 bottom-4 w-1 rounded bg-indigo-200 sm:left-4 sm:right-4 sm:top-1/2 sm:h-1 sm:w-auto"/><div className="relative grid gap-3 pl-12 sm:grid-cols-6 sm:pl-0">{[["Work","process item","cyan"],["Checkpoint","state + receipts","indigo"],["Pause","release worker","amber"],["Human review","approve / edit / reject","violet"],["Revalidate","authority + expiry + state","rose"],["Resume","execute once","emerald"]].map(([a,b,c])=><React.Fragment key={a}><Node label={a} detail={b} tone={c as Tone} rounded="rounded-2xl"/></React.Fragment>)}</div></div>;
    case "checkpoint-revalidate-resume":
      return <div className="space-y-3"><MiniFlow items={[{label:"Checkpoint v3",tone:"indigo"},{label:"Pause + release worker",tone:"amber"},{label:"Old approval expires",tone:"rose"},{label:"Reload + re-authenticate",tone:"cyan"},{label:"Price changed → revise",tone:"violet"},{label:"New approval",tone:"amber"},{label:"Execute key PAY-204 once",tone:"emerald"}]}/><p className="rounded-lg bg-slate-900 p-3 text-center text-xs font-bold text-white">A stale approval never authorizes the changed action; the checkpoint records both decisions and the one execution receipt.</p></div>;
    case "rag-vs-agentic-rag":
      return <SplitLane leftTitle="Baseline RAG" left={<MiniFlow items={[{label:"Question"},{label:"Retrieve once",tone:"cyan"},{label:"Answer",tone:"emerald"}]}/>} rightTitle="Agentic RAG" right={<MiniFlow items={[{label:"Decide retrieval",tone:"violet"},{label:"Choose source + query",tone:"cyan"},{label:"Grade evidence",tone:"amber"},{label:"Rewrite / answer / abstain",tone:"rose"}]}/>}/>;
    case "corrective-retrieval-loop":
      return <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]"><Node label="Retrieve" detail="approved source + focused query" tone="cyan"/><Arrow/><Node label="Grade evidence" detail="relevance • authority • date • provenance" tone="amber"/><Arrow/><div className="grid gap-2"><Node label="Sufficient" detail="grounded answer" tone="emerald"/><Node label="Named gap" detail="rewrite or change source ↺" tone="violet"/><Node label="Conflict / budget" detail="report or abstain" tone="rose"/></div></div>;
    case "bounded-agent-architecture":
      return <div className="grid gap-3 lg:grid-cols-[1fr_auto_2fr_auto_1fr]"><div className="space-y-2"><Node label="Goal" tone="slate"/><Node label="Instructions" tone="emerald"/><Node label="Tool schemas" tone="cyan"/></div><Arrow/><div className="rounded-[2rem] border-2 border-indigo-300 bg-indigo-50 p-4"><LoopRing center="State: evidence + step count + trace" items={[{label:"Decide",detail:"search/final/abstain",tone:"violet"},{label:"Validate",detail:"tool + arguments",tone:"rose"},{label:"Read-only tool",detail:"approved docs",tone:"cyan"},{label:"Observe",detail:"source + result",tone:"amber"}]}/></div><Arrow/><div className="space-y-2"><Node label="Supported answer" tone="emerald"/><Node label="Safe abstention" tone="rose"/><Node label="Stop rule" detail="success / 5 steps" tone="slate"/></div></div>;
    case "multi-agent-topologies":
      return <div className="grid gap-3 lg:grid-cols-3"><div className="rounded-xl border bg-white p-3"><p className="text-center text-xs font-bold">MANAGER–WORKERS</p><Node label="Manager" tone="indigo"/><div className="text-center text-indigo-600">↙ ↓ ↘</div><div className="grid grid-cols-3 gap-1"><Node label="A" tone="cyan" rounded="rounded-full"/><Node label="B" tone="cyan" rounded="rounded-full"/><Node label="C" tone="cyan" rounded="rounded-full"/></div></div><div className="rounded-xl border bg-white p-3"><p className="text-center text-xs font-bold">AGENT AS TOOL</p><MiniFlow items={[{label:"Controller",tone:"indigo"},{label:"Specialist",tone:"violet"},{label:"Return",tone:"emerald"}]}/></div><div className="rounded-xl border bg-white p-3"><p className="text-center text-xs font-bold">HANDOFF</p><MiniFlow items={[{label:"Owner A",tone:"indigo"},{label:"Transfer state + control",tone:"amber"},{label:"Owner B",tone:"violet"}]}/></div></div>;
    case "delegation-lifecycle":
      return <MiniFlow items={[{label:"Owner defines contract",tone:"indigo"},{label:"Scope + inputs + permissions",tone:"amber"},{label:"Specialist executes",tone:"violet"},{label:"Structured result + evidence",tone:"cyan"},{label:"Validate + integrate",tone:"emerald"}]}/>;
    case "mcp-architecture":
      return <div className="grid gap-3 lg:grid-cols-[1fr_auto_2fr_auto_1fr]"><Node label="AI host" detail="model + application" tone="violet"/><Arrow/><div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50 p-3"><MiniFlow items={[{label:"MCP client",tone:"indigo"},{label:"MCP server",tone:"cyan"},{label:"Tools • resources • prompts",tone:"amber"}]}/><p className="mt-2 text-center text-xs font-bold text-rose-700">Authorization / consent / validation boundary</p></div><Arrow/><Node label="Underlying API or data" detail="performs the real operation" tone="emerald"/></div>;
    case "mcp-invocation-sequence":
      return <div className="space-y-4"><div className="grid gap-3 md:grid-cols-3"><Node label="1 · Host/client discovers" detail="Server advertises approved capability" tone="indigo"/><Node label="2 · Protocol invocation" detail="Structured request crosses to server" tone="cyan"/><Node label="3 · Server checks scope" detail="Authorize before service call" tone="amber"/></div><div className="grid gap-3 md:grid-cols-3"><Node label="4 · Underlying service" detail="Separate API/data request and result" tone="violet"/><Node label="5 · Protocol result" detail="Compact data or structured error" tone="emerald"/><Node label="6 · Host/model" detail="Result becomes bounded context" tone="slate"/></div><div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-3 text-center text-xs font-bold text-rose-950">Insufficient scope → structured rejection → underlying service is not called</div></div>;
    case "framework-decision-flow":
      return <div><Node label="Start: what runtime problem must be solved?" tone="slate" rounded="rounded-full"/><div className="my-2 text-center text-2xl text-indigo-600">↓</div><div className="grid gap-3 md:grid-cols-4"><Node label="Small bounded loop" detail="Plain code" tone="emerald"/><Node label="Explicit state + durability" detail="Compare LangGraph" tone="indigo"/><Node label="Role/team orchestration" detail="Compare CrewAI" tone="amber"/><Node label="Conversational / event-driven multi-agent" detail="Compare AutoGen" tone="violet"/></div><div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-center text-sm font-bold text-rose-900">If no concrete need justifies dependency and lock-in, return to plain code.</div></div>;
    case "framework-control-models":
      return <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"><div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-3"><p className="text-sm font-extrabold">Plain code</p><p className="mt-2 text-xs leading-relaxed">One explicit state object → functions → loop → developer-owned checkpoint and logs</p></div><div className="rounded-xl border-2 border-indigo-300 bg-indigo-50 p-3"><p className="text-sm font-extrabold">LangGraph</p><p className="mt-2 text-xs leading-relaxed">Typed state → named graph nodes/edges → persistence + interrupt/resume</p></div><div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3"><p className="text-sm font-extrabold">CrewAI</p><p className="mt-2 text-xs leading-relaxed">Researcher + reviewer roles → crew/flow coordination → shared deliverable</p></div><div className="rounded-xl border-2 border-violet-300 bg-violet-50 p-3"><p className="text-sm font-extrabold">AutoGen</p><p className="mt-2 text-xs leading-relaxed">Conversational/event-driven agents → messages → termination condition</p></div></div>;
    case "observe-act-verify":
      return <LoopRing center="If state differs or action is consequential: recover, ask approval, or stop" items={[{label:"Observe",detail:"fresh page / screen state",tone:"cyan"},{label:"Choose",detail:"one bounded action",tone:"violet"},{label:"Act",detail:"API, DOM, GUI, or sandbox",tone:"amber"},{label:"Re-observe + verify",detail:"deterministic postcondition",tone:"emerald"}]}/>;
    case "sandbox-boundary":
      return <div className="grid gap-4 md:grid-cols-[1fr_1.6fr_1fr]"><div className="space-y-2"><Node label="Allowed input" detail="uploaded.csv" tone="cyan"/><Node label="Allowed output" detail="/results only" tone="emerald"/></div><div className="rounded-[2rem] border-4 border-dashed border-indigo-400 bg-indigo-50 p-4 text-center"><p className="text-sm font-extrabold text-indigo-950">SANDBOX</p><Node label="Generated code" detail="60 s • 512 MB • limited processes" tone="violet" rounded="rounded-full"/><p className="mt-3 text-xs text-slate-600">Explicit mounts and capabilities only</p></div><div className="space-y-2"><Node label="Blocked host files" tone="rose"/><Node label="Blocked secrets" tone="rose"/><Node label="Blocked network" detail="unless allowlisted" tone="rose"/></div></div>;
    case "prompt-injection-boundary":
      return <MiniFlow items={[{label:"Hostile webpage",tone:"rose"},{label:"Model sees untrusted text",tone:"amber"},{label:"Attempts sensitive tool call",tone:"violet"},{label:"BLOCKED",tone:"rose"},{label:"Trust + authorization + tool guardrail",tone:"emerald"}]}/>;
    case "recovery-decision-tree":
      return <div><Node label="Operation failed" tone="rose" rounded="rounded-full"/><div className="my-2 text-center text-2xl text-indigo-600">↓</div><Node label="Transient AND safe to repeat?" tone="amber"/><div className="mt-3 grid gap-3 md:grid-cols-2"><div><p className="mb-1 text-center text-xs font-bold text-emerald-700">YES</p><MiniFlow items={[{label:"Bounded retry + backoff",tone:"cyan"},{label:"Verify outcome",tone:"emerald"}]}/></div><div><p className="mb-1 text-center text-xs font-bold text-rose-700">NO / UNCERTAIN SIDE EFFECT</p><div className="grid grid-cols-2 gap-2"><Node label="Check status" tone="cyan"/><Node label="Compensate" tone="amber"/><Node label="Fallback / escalate" tone="violet"/><Node label="Safe stop" tone="rose"/></div></div></div></div>;
    case "evaluation-trajectory":
      return <div><MiniFlow items={[{label:"User goal",tone:"slate"},{label:"Model decision",tone:"violet"},{label:"Tool + arguments",tone:"amber"},{label:"Observation",tone:"cyan"},{label:"Retry / handoff",tone:"rose"},{label:"Final output",tone:"emerald"}]}/><div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-700 sm:grid-cols-4"><span className="rounded-full bg-indigo-100 p-2">task success</span><span className="rounded-full bg-amber-100 p-2">policy + arguments</span><span className="rounded-full bg-cyan-100 p-2">recovery + steps</span><span className="rounded-full bg-emerald-100 p-2">latency + cost</span></div></div>;
    case "trace-waterfall":
      return <div className="font-mono text-xs"><div className="space-y-2 sm:hidden"><div className="rounded-lg bg-slate-800 px-3 py-2 text-white"><strong>Trace 4.1s</strong><span className="float-right">$0.022 total</span></div>{[["Model 1","0.9s","$0.006","22%","indigo"],["Tool 1","0.4s","$0.002","10%","cyan"],["Model 2","1.1s","$0.007","27%","violet"],["Tool 2","0.7s","$0.001","17%","amber"],["Model 3","1.0s","$0.006","24%","emerald"]].map(([name,duration,cost,width,tone])=><div key={name} className="grid grid-cols-[4.5rem_1fr] items-center gap-2"><span>{name}</span><div><div className="flex justify-between text-[11px] text-slate-600"><span>{duration}</span><span>{cost}</span></div><div className="h-3 rounded-full bg-slate-100"><div className={`h-3 min-w-6 rounded-full border ${toneClasses[tone as Tone]}`} style={{width}} /></div></div></div>)}</div><div className="hidden space-y-2 sm:block"><div className="grid grid-cols-[5.5rem_1fr] items-center gap-2"><span>Trace 4.1s</span><div className="h-8 rounded bg-slate-800 px-2 py-2 text-white">entire task • $0.022</div></div>{[["Model 1","0%","22%","0.9s • $0.006","indigo"],["Tool 1","22%","10%","0.4s • $0.002","cyan"],["Model 2","32%","27%","1.1s • $0.007","violet"],["Tool 2","59%","17%","0.7s • $0.001","amber"],["Model 3","76%","24%","1.0s • $0.006","emerald"]].map(([name,left,width,label,tone])=><div key={name} className="grid grid-cols-[5.5rem_1fr] items-center gap-2"><span>{name}</span><div className="relative h-8 rounded bg-slate-100"><div className={`absolute top-0 h-8 rounded border px-2 py-1.5 whitespace-nowrap ${toneClasses[tone as Tone]}`} style={{left,width}}>{label}</div></div></div>)}</div></div>;
    case "latency-cost-chart": {
      const rows = [["Model 1",0.9,0.006,"indigo"],["Tool 1",1.3,0.008,"cyan"],["Model 2",2.4,0.015,"violet"],["Tool 2",3.1,0.016,"amber"],["Model 3",4.1,0.022,"emerald"]] as const;
      return <div><div className="grid grid-cols-5 items-end gap-2 border-b-2 border-l-2 border-slate-400 px-2 pt-4">{rows.map(([name,latency,cost,tone])=><div key={name} className="flex h-56 flex-col justify-end gap-1 text-center"><div className="text-[10px] font-bold text-slate-600">${cost.toFixed(3)}</div><div className={`${toneClasses[tone]} flex items-start justify-center rounded-t-lg border-2 pt-2 text-xs font-extrabold`} style={{height:`${latency/4.1*80}%`}}>{latency}s</div><div className="h-8 text-[10px] font-bold leading-tight text-slate-700">{name}</div></div>)}</div><div className="mt-3 grid grid-cols-2 gap-2"><Node label="Cumulative latency: 4.1 s" tone="indigo"/><Node label="Cumulative cost: $0.022" tone="emerald"/></div></div>;
    }
  }
}

export function AgenticVisualFigure({ id }: { id: AgenticVisualId }) {
  const meta = visualMeta[id];
  return <FigureFrame id={id} {...meta}><VisualBody id={id} /></FigureFrame>;
}

export const agenticVisualIds = Object.keys(visualMeta) as AgenticVisualId[];
