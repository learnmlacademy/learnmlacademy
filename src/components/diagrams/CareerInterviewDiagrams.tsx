import React from "react";
import { ArrowDown, ArrowRight, CheckCircle2, GitBranch, ShieldCheck } from "lucide-react";

export type CareerVisualId =
  | "role-decision"
  | "role-profile"
  | "ml-roadmap"
  | "ai-roadmap"
  | "genai-roadmap"
  | "ds-roadmap"
  | "interview-rounds"
  | "prep-matrix"
  | "answer-depth"
  | "metric-decision"
  | "training-diagnosis"
  | "rag-failure"
  | "agent-authorization"
  | "python-flow"
  | "sql-flow"
  | "design-framework"
  | "design-architecture"
  | "production-debug"
  | "project-story"
  | "star-tradeoff";

type FigureData = {
  title: string;
  question: string;
  caption: string;
  nodes: string[];
};

const figures: Record<CareerVisualId, FigureData> = {
  "role-decision": {
    title: "Four interests lead toward four different starting roles",
    question: "What kind of work would you like to spend most of your week doing?",
    caption: "Start from the work you enjoy, then verify the real job description because company titles overlap.",
    nodes: ["Predictive systems|ML Engineer", "AI-powered products|AI Engineer", "LLM/RAG systems|GenAI / LLM Engineer", "Experiments and insight|Data Scientist"],
  },
  "role-profile": {
    title: "Role emphasis is a profile, not a hard boundary",
    question: "Relative emphasis in a typical role",
    caption: "These 1–5 values are illustrative teaching profiles—not survey scores or universal hiring requirements. Verify the actual job description for your target role.",
    nodes: ["ML Engineer|Software 5|ML 5|Statistics 3", "AI Engineer|Software 5|ML 3|GenAI 4", "LLM Engineer|Software 4|ML 4|GenAI 5", "Data Scientist|Software 3|ML 4|Statistics 5"],
  },
  "ml-roadmap": {
    title: "Machine Learning Engineer roadmap",
    question: "Build foundations before operating models in production",
    caption: "The path moves from data and modelling toward serving, reliability, system design, and evidence-rich projects.",
    nodes: ["Python + SQL", "Math + ML", "Evaluation + features", "Software + pipelines", "Serving + CI/CD", "Monitoring + design", "Portfolio + interviews"],
  },
  "ai-roadmap": {
    title: "AI Engineer roadmap",
    question: "Connect software foundations to reliable AI product delivery",
    caption: "Core ML literacy supports model choices; RAG, tools, security, evaluation, and observability make the application dependable.",
    nodes: ["Python + APIs", "ML + transformers", "GenAI + prompting", "Search + RAG", "Tools + agents", "Safety + evaluation", "Deploy + observe"],
  },
  "genai-roadmap": {
    title: "Generative AI / LLM Engineer roadmap",
    question: "Progress from model inputs to grounded, evaluated production systems",
    caption: "You can begin application work before mastering distributed foundation-model pretraining.",
    nodes: ["Python + DL", "Attention + tokens", "Inference + prompts", "Embeddings + RAG", "Evaluation + safety", "Serving + LLMOps", "Agents + projects"],
  },
  "ds-roadmap": {
    title: "Data Scientist roadmap",
    question: "Turn data into defensible evidence and useful decisions",
    caption: "The path gives statistics, experiments, interpretation, and communication as much importance as model fitting.",
    nodes: ["Python + SQL", "Probability + stats", "Cleaning + EDA", "Experiments + ML", "Metrics + forecasting", "Storytelling", "Portfolio + interviews"],
  },
  "interview-rounds": {
    title: "A typical AI/ML interview is a sequence of evidence checks",
    question: "What is each round trying to learn about you?",
    caption: "Companies reorder or omit rounds, but preparation improves when each round has a clear purpose.",
    nodes: ["Recruiter|role fit", "Projects|credible ownership", "Coding / SQL|implementation", "ML specialty|technical judgment", "System design|trade-offs", "Behavioral|collaboration"],
  },
  "prep-matrix": {
    title: "Build preparation from the role, not from a generic question list",
    question: "Job description → evidence gaps → practice plan",
    caption: "A preparation matrix converts vague studying into role-weighted practice and measurable evidence.",
    nodes: ["Extract responsibilities", "Mark required depth", "Score current evidence", "Prioritize largest gaps", "Practice + review"],
  },
  "answer-depth": {
    title: "Build an interview answer in layers",
    question: "Lead with the answer, then add depth when invited",
    caption: "A concise first layer prevents rambling; examples, trade-offs, and follow-ups demonstrate genuine understanding.",
    nodes: ["Direct answer", "Plain-language intuition", "Decision criteria", "Example / calculation", "Limitation + follow-up"],
  },
  "metric-decision": {
    title: "Choose a metric from the cost of errors",
    question: "Which mistake is more costly?",
    caption: "Class balance and decision cost determine the metric; accuracy is not a safe default.",
    nodes: ["Rare positive class", "False negative costly|Recall / PR-AUC", "False positive costly|Precision", "Both matter|F1 + operating point", "Probability decisions|Calibration"],
  },
  "training-diagnosis": {
    title: "Training curves turn symptoms into hypotheses",
    question: "Compare training and validation behaviour before changing the model",
    caption: "A gap suggests overfitting; two high plateaus suggest underfitting; unstable or NaN loss suggests optimization or data defects.",
    nodes: ["Low train / high validation|variance", "High train / high validation|bias", "Validation rises later|overtraining", "Loss unstable or NaN|optimization/data"],
  },
  "rag-failure": {
    title: "Localize a wrong RAG answer before changing the model",
    question: "Did evidence retrieval fail, or did answer generation misuse good evidence?",
    caption: "Inspect retrieved chunks first. Fine-tuning cannot repair missing or irrelevant evidence in the prompt.",
    nodes: ["Question", "Inspect retrieved chunks", "Missing evidence|retrieval/chunking/filter fix", "Good evidence|inspect claim support", "Unsupported claim|generation/guardrail fix"],
  },
  "agent-authorization": {
    title: "A valid tool call is not yet an authorized action",
    question: "Every side effect crosses separate gates",
    caption: "Schema validation checks shape; authorization checks permission and scope; idempotency and receipts make execution recoverable.",
    nodes: ["Tool proposal", "Schema valid?", "Authorized?", "Idempotency check", "Execute", "Receipt / state"],
  },
  "python-flow": {
    title: "A reliable coding answer begins before typing",
    question: "Turn an ambiguous prompt into a testable solution",
    caption: "State assumptions, choose a simple data structure, test edges, then discuss complexity and alternatives.",
    nodes: ["Restate problem", "Clarify inputs", "Choose structure", "Walk example", "Implement", "Test edges", "Complexity + follow-up"],
  },
  "sql-flow": {
    title: "Reason about a SQL query as transformations",
    question: "Define grain before joins and windows",
    caption: "Most SQL mistakes come from losing track of row grain, join multiplicity, time boundaries, or null behaviour.",
    nodes: ["Define output grain", "Filter eligible rows", "Join at known keys", "Aggregate / window", "Rank / select", "Validate counts"],
  },
  "design-framework": {
    title: "A reusable ML/AI system-design sequence",
    question: "Move from product decision to observable operation",
    caption: "The framework keeps model choice connected to metrics, data time, serving constraints, recovery, and governance.",
    nodes: ["Goal + metrics", "Scale + data", "Baseline", "Model / retrieval", "Offline pipeline", "Online serving", "Monitor + recover"],
  },
  "design-architecture": {
    title: "Separate offline learning from the online decision path",
    question: "Versioned artifacts connect two different operating loops",
    caption: "The online path stays latency-bounded; logs and delayed labels feed the offline path without silently changing production.",
    nodes: ["Events + labels|OFFLINE", "Features + training|OFFLINE", "Registry + gates|BOUNDARY", "Features + serving|ONLINE", "Decision + log|ONLINE", "Monitor + feedback|FEEDBACK"],
  },
  "production-debug": {
    title: "Debug production safely from symptom to prevention",
    question: "Observe before retraining or restarting",
    caption: "Start with scope and evidence, contain user harm, fix the confirmed cause, then add a control that prevents recurrence.",
    nodes: ["Symptom", "Scope + timeline", "Inspect versions / traces", "Contain safely", "Fix confirmed cause", "Verify recovery", "Prevent recurrence"],
  },
  "project-story": {
    title: "A credible project story is an evidence chain",
    question: "Show decisions and learning—not a list of tools",
    caption: "Interviewers can test ownership when the story connects problem, data, baseline, choices, evaluation, failure, and production thinking.",
    nodes: ["Problem", "Data + baseline", "Approach + why", "Evaluation", "Failure + diagnosis", "Result", "Next improvement"],
  },
  "star-tradeoff": {
    title: "Extend STAR with the reasoning interviewers need",
    question: "What made your action defensible?",
    caption: "Situation and task provide context; action needs decision rationale and trade-offs; result should include evidence and learning.",
    nodes: ["Situation", "Task", "Options considered", "Action + rationale", "Result", "Lesson"],
  },
};

const palette = ["bg-indigo-50 border-indigo-300", "bg-cyan-50 border-cyan-300", "bg-emerald-50 border-emerald-300", "bg-amber-50 border-amber-300", "bg-violet-50 border-violet-300", "bg-rose-50 border-rose-300", "bg-sky-50 border-sky-300"];

function Flow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      {nodes.map((raw, index) => {
        const [label, note] = raw.split("|");
        return (
          <React.Fragment key={raw}>
            <div className={`min-w-0 flex-1 rounded-xl border-2 px-3 py-4 text-center shadow-sm ${palette[index % palette.length]}`}>
              <div className="font-extrabold text-slate-900">{label}</div>
              {note && <div className="mt-1 text-xs font-semibold text-slate-600">{note}</div>}
            </div>
            {index < nodes.length - 1 && <><ArrowDown className="mx-auto h-5 w-5 text-slate-400 sm:hidden"/><ArrowRight className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block"/></>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function RoleDecision({ nodes }: { nodes: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_2fr] sm:items-center">
      <div className="rounded-full border-2 border-indigo-400 bg-indigo-50 px-5 py-6 text-center font-extrabold text-indigo-950">Your preferred work</div>
      <GitBranch className="mx-auto h-8 w-8 rotate-90 text-indigo-500 sm:rotate-0" />
      <div className="grid gap-3 sm:grid-cols-2">
        {nodes.map((raw, index) => { const [label, role] = raw.split("|"); return <div key={raw} className={`rounded-xl border-2 p-4 ${palette[index]}`}><div className="text-sm text-slate-600">{label}</div><div className="font-extrabold text-slate-900">{role}</div></div>; })}
      </div>
    </div>
  );
}

function RoleProfile({ nodes }: { nodes: string[] }) {
  return <div className="space-y-4">{nodes.map((raw) => { const [role, ...scores] = raw.split("|"); return <div key={role} className="grid gap-2 sm:grid-cols-[150px_1fr]"><div className="font-extrabold text-slate-900">{role}</div><div className="grid gap-2 sm:grid-cols-3">{scores.map((score, i) => { const [label, value] = score.split(" "); return <div key={label}><div className="flex justify-between text-xs text-slate-600"><span>{label}</span><span>{value}/5</span></div><div className="mt-1 h-2 rounded-full bg-slate-200"><div className={`h-2 rounded-full ${["bg-indigo-500", "bg-emerald-500", "bg-violet-500"][i]}`} style={{width:`${Number(value)*20}%`}} /></div></div>; })}</div></div>; })}</div>;
}

function Decision({ id, nodes }: { id: CareerVisualId; nodes: string[] }) {
  const [root, ...branches] = nodes;
  return <div className="space-y-4"><div className="mx-auto max-w-sm rounded-full border-2 border-indigo-400 bg-indigo-50 px-5 py-4 text-center font-extrabold text-indigo-950">{root}</div><ArrowDown className="mx-auto h-6 w-6 text-indigo-500"/><div className="grid gap-3 sm:grid-cols-2">{branches.map((raw,index)=>{const [label,note]=raw.split("|"); const bad = id === "agent-authorization" && (label.includes("Schema") || label.includes("Authorized")); return <div key={raw} className={`relative rounded-xl border-2 p-4 ${palette[(index+1)%palette.length]}`}>{bad ? <ShieldCheck className="mb-2 h-5 w-5 text-indigo-600"/> : index % 2 ? <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-600"/> : <ArrowRight className="mb-2 h-5 w-5 text-slate-500"/>}<div className="font-extrabold text-slate-900">{label}</div>{note&&<div className="mt-1 text-xs text-slate-600">{note}</div>}</div>})}</div></div>;
}

function TrainingDiagnosis({ nodes }: { nodes: string[] }) {
  return <div className="grid gap-4 sm:grid-cols-2">{nodes.map((raw,index)=>{const [label,note]=raw.split("|"); const paths = ["M12 72 C55 20 115 22 188 24 M12 78 C55 48 115 45 188 43", "M12 70 C70 52 120 50 188 49 M12 82 C70 64 120 61 188 60", "M12 76 C70 45 115 32 188 25 M12 80 C70 55 110 48 150 55 C170 60 180 70 188 82", "M12 68 L48 32 L74 84 L108 26 L136 78 L166 35 L188 75"][index]; return <div key={raw} className="rounded-xl border border-slate-200 bg-white p-3"><svg viewBox="0 0 200 100" className="w-full" role="img" aria-label={`${label}: ${note}`}><path d="M10 8 V88 H195" fill="none" stroke="#94a3b8" strokeWidth="2"/><path d={paths} fill="none" stroke={index===3?"#e11d48":"#4f46e5"} strokeWidth="4" strokeLinecap="round"/></svg><div className="font-extrabold text-slate-900">{label}</div><div className="text-xs text-slate-600">{note}</div></div>})}</div>;
}

export function CareerInterviewFigure({ id }: { id: CareerVisualId }) {
  const figure = figures[id];
  const decisionIds: CareerVisualId[] = ["metric-decision", "rag-failure"];
  return (
    <figure data-career-figure={id} className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">
        <h3 className="text-lg font-extrabold text-slate-900">{figure.title}</h3>
        <p className="mt-1 text-sm font-semibold text-indigo-700">{figure.question}</p>
      </div>
      <div className="p-4 sm:p-6">
        {id === "role-decision" ? <RoleDecision nodes={figure.nodes} /> : id === "role-profile" ? <RoleProfile nodes={figure.nodes} /> : id === "training-diagnosis" ? <TrainingDiagnosis nodes={figure.nodes} /> : decisionIds.includes(id) ? <Decision id={id} nodes={figure.nodes} /> : <Flow nodes={figure.nodes} />}
      </div>
      <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600 sm:px-6"><strong>How to read it: </strong>{figure.caption}</figcaption>
    </figure>
  );
}
