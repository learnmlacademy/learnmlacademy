import { Callout } from "../../components/content/Callout";
import { CodeBlock as SharedCodeBlock } from "../../components/content/CodeBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";
import { DataTable } from "../../components/content/DataTable";
import { CheckCircle2, Target } from "lucide-react";
import { AgenticVisualFigure } from "../../components/diagrams/AgenticAIDiagrams";
import { agenticLessonDetails, type AgenticTable } from "./agenticLessonDetails";
import { agenticLessonEnhancements } from "./agenticLessonEnhancements";
import { AgenticConceptExpansion, AgenticWorkedLab, type AgenticTutorialTopic } from "./AgenticTutorialExpansion";

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

type AgenticChapterHeadings = {
  core: string;
  concept: string;
  process: string;
  detailSections: string[];
  workedExample?: string;
  realistic: string;
  code: string;
  practice?: string;
  lab: string;
};

const agenticChapterHeadings: Record<string, AgenticChapterHeadings> = {
  "agentic-ai-intro": {
    core: "1. From Chatbot Responses to Goal-Directed Action",
    concept: "2. What Changes When AI Can Complete a Bounded Task",
    process: "3. The Agent Loop: Decide, Act, Observe, and Stop",
    detailSections: [
      "4. Where Agentic Behavior Begins",
      "5. Agent Types Form a Spectrum, Not a Checklist",
    ],
    realistic: "6. Realistic Example: Choose the Right Amount of Autonomy",
    code: "7. Read a Bounded Agent Loop in Code",
    lab: "8. Hands-On: Run a Two-Lookup Delivery Agent",
  },
  "tool-calling": {
    core: "1. From Model Suggestion to Trusted Tool Execution",
    concept: "2. Why a Tool Proposal Is a Request, Not Permission",
    process: "3. The Safe Tool-Calling Pipeline",
    detailSections: [
      "4. Validate Structure, Then Authorization and Policy",
      "5. Retry Rules Depend on Whether the Tool Reads or Writes",
    ],
    workedExample: "6. Worked Example: One Refund Request, Two Safety Branches",
    realistic: "7. Realistic Example: Prevent a Duplicate Refund",
    code: "8. Read the Tool Boundary in Code",
    lab: "9. Hands-On: Make a Refund Retry Safe—and Reject a Changed Request",
  },
  "building-ai-agent": {
    core: "1. Build the Control Loop Before Adding Complexity",
    concept: "2. Why the Controller Comes Before the Language Model",
    process: "3. The Minimum End-to-End Agent Loop",
    detailSections: [
      "4. Start with the Core Loop, Not Advanced Subsystems",
      "5. Trace Both Success and Failure Paths",
    ],
    workedExample: "6. Worked Example: A Five-Step Documentation Agent",
    realistic: "7. Realistic Example: A Bounded Documentation Assistant",
    code: "8. Read the Agent Controller in Code",
    practice: "9. Practice the End-to-End Agent",
    lab: "10. Hands-On: Test Success, Missing Evidence, and Invalid Arguments",
  },
  "planning-reflection": {
    core: "1. Why Agents Need a Way to Revise Their Next Step",
    concept: "2. A Plan Matters Only If Observations Can Change It",
    process: "3. Plan, Act, Observe, Verify, and Replan",
    detailSections: [
      "4. Planning, Acting, and Checking Are Different Jobs",
    ],
    workedExample: "5. Worked Example: A Bounded ReAct Trace Revises Once",
    realistic: "6. Realistic Example: Build a Product Brief from Incomplete Evidence",
    code: "7. Read the Planning Loop in Code",
    lab: "8. Hands-On: Track Evidence Gaps and Remaining Actions",
  },
  "agent-context-engineering": {
    core: "1. Why Context Engineering Is More Than Conversation History",
    concept: "2. Choose What the Agent Sees for the Next Decision",
    process: "3. Assemble Context by Relevance, Trust, Recency, and Budget",
    detailSections: [
      "4. Context Is the Packet for the Next Decision",
      "5. Compression Must Preserve Facts, Constraints, and Commitments",
    ],
    workedExample: "6. Worked Example: Budget a 32,000-Token Context Window",
    realistic: "7. Realistic Example: Assemble the Next-Step Context",
    code: "8. Read Context Assembly in Code",
    lab: "9. Hands-On: Fit a New Tool Result into a 32,000-Token Budget",
  },
  "agent-memory": {
    core: "1. Why Agent Memory Must Be Deliberately Managed",
    concept: "2. A Saved Preference Needs Ownership, Time, and Revision",
    process: "3. Write, Recall, Update, and Delete Memory by Policy",
    detailSections: [
      "4. Memory Is an Application Capability, Not Automatic Recall",
    ],
    workedExample: "5. Worked Example: Save, Supersede, and Delete a Preference",
    realistic: "6. Realistic Example: Remember a Study Preference",
    code: "7. Read Selective Memory Retrieval in Code",
    lab: "8. Hands-On: Update, Protect, and Forget a Report Preference",
  },
  "agent-state-graphs": {
    core: "1. Why Agent Workflows Need Explicit State",
    concept: "2. Make Legal Next Steps Visible",
    process: "3. Move Through States Only When Guards Allow It",
    detailSections: [
      "4. A State Graph Turns Control Flow into Something Testable",
    ],
    realistic: "5. Realistic Example: Gate a Sensitive Transition",
    code: "6. Read a Guarded State Transition in Code",
    lab: "7. Hands-On: Block Execution Until the Approval Guard Passes",
  },
  "durable-long-running-agents": {
    core: "1. Why Long-Running Agents Must Survive Pauses and Restarts",
    concept: "2. Resume Progress Without Reusing Stale Permission",
    process: "3. Checkpoint, Revalidate, Resume, and Reconcile",
    detailSections: [
      "4. Waiting Is Stored State, Not a Sleeping Request",
    ],
    workedExample: "5. Worked Example: Resume a Supplier Payment Without Replaying Stale Authority",
    realistic: "6. Realistic Example: Resume a Task After Human Approval",
    code: "7. Read Durable State Handling in Code",
    lab: "8. Hands-On: Reload a SQLite Checkpoint and Reject a Changed Quote",
  },
  "agentic-rag": {
    core: "1. Why One-Shot Retrieval Is Sometimes Not Enough",
    concept: "2. Let an Evidence Gap Choose the Next Search",
    process: "3. Retrieve, Inspect, Refine, and Stop",
    detailSections: [
      "4. What Makes Retrieval Agentic",
      "5. Bound the Corrective Retrieval Loop",
    ],
    workedExample: "6. Worked Example: Compare One Retrieval with an Adaptive Loop",
    realistic: "7. Realistic Example: Search Again Only for Missing Evidence",
    code: "8. Read the Adaptive Retrieval Loop in Code",
    lab: "9. Hands-On: Reject an Old Policy and Fill a Missing Refund Claim",
  },
  "multi-agent-systems": {
    core: "1. Why Multiple Agents Are Not Automatically Better",
    concept: "2. Delegate a Result Contract, Not an Open-Ended Conversation",
    process: "3. Assign, Return, Check, and Merge Specialist Work",
    detailSections: [
      "4. Calling a Specialist Is Not the Same as Handing Over Control",
    ],
    realistic: "5. Realistic Example: Coordinate Specialists Without Hiding Conflicts",
    code: "6. Read a Controlled Handoff in Code",
    lab: "7. Hands-On: Join Two Worker Results Without Hiding a Conflict",
  },
  "model-context-protocol": {
    core: "1. Why Tool Integration Needs a Clear System Boundary",
    concept: "2. Follow the Message Across Client, Protocol, Server, and Service",
    process: "3. Discover, Validate, Invoke, and Return Results",
    detailSections: [
      "4. MCP Is the Protocol, Not the Underlying Service",
    ],
    workedExample: "5. Worked Example: Discovery Enables Invocation, Not Permission",
    realistic: "6. Realistic Example: Call a Scoped External Capability",
    code: "7. Read an MCP-Style Boundary in Code",
    lab: "8. Hands-On: Inspect Discovery, Invocation, and a Scope Rejection",
  },
  "agent-frameworks": {
    core: "1. Decide What the Runtime Must Guarantee",
    concept: "2. Choose a Runtime by the Behavior You Must Guarantee",
    process: "3. Translate Requirements into Framework Capabilities",
    detailSections: [
      "4. Start from the Control Problem, Not the Framework Name",
      "5. Protect Domain Logic from Framework Lock-In",
      "6. Compare Control Models on the Same Research Task",
    ],
    workedExample: "7. Worked Example: Map One Bounded Workflow to a Framework",
    realistic: "8. Realistic Example: Choose a Framework for a Controlled Workflow",
    code: "9. Read a Framework-Neutral Control Boundary in Code",
    lab: "10. Hands-On: Apply a Release Contract to Two Candidate Adapters",
  },
  "browser-computer-use-agents": {
    core: "1. Why UI Automation Needs Observation and Verification",
    concept: "2. Observe the Interface, Act Narrowly, and Verify the Result",
    process: "3. Perceive, Select, Act, Verify, and Stop",
    detailSections: [
      "4. Use the Narrowest Reliable Capability",
    ],
    realistic: "5. Realistic Example: Complete a UI Task Without Trusting the Click",
    code: "6. Read the Observe–Act–Verify Loop in Code",
    lab: "7. Hands-On: Check the Receipt Instead of Trusting the Click",
  },
  "agent-security": {
    core: "1. Why Agent Security Cannot Depend on Model Obedience",
    concept: "2. Put the Security Boundary Outside the Model",
    process: "3. Authenticate, Authorize, Constrain, Execute, and Audit",
    detailSections: [
      "4. Instructions Guide the Model; Controls Enforce Authority",
      "5. Recovery Depends on the Side Effect and What Is Known",
    ],
    realistic: "6. Realistic Example: Reject an Unauthorized Write",
    code: "7. Read the Trusted Authorization Boundary in Code",
    lab: "8. Hands-On: Reject a Write Even When the Proposal Claims to Be an Admin",
  },
  "agent-evaluation-safety": {
    core: "1. Why Task Success Alone Is Not Enough",
    concept: "2. Measure Outcomes That Succeed and Respect the Rules",
    process: "3. Test Outcome, Trajectory, Safety, and Cost",
    detailSections: [
      "4. Evaluate the Journey as Well as the Destination",
    ],
    workedExample: "5. Worked Example: Task Success Can Hide an Unsafe Trajectory",
    realistic: "6. Realistic Example: Compare Agent Runs Beyond Final Answers",
    code: "7. Read an Evaluation Harness in Code",
    lab: "8. Hands-On: Separate Raw Success from Safe Success",
  },
  "agent-observability-deployment": {
    core: "1. Why Production Agents Need Reconstructable Runs",
    concept: "2. Reconstruct One Run Before Averaging Thousands",
    process: "3. Trace Decisions, Tools, Latency, Tokens, and Stop Reasons",
    detailSections: [
      "4. Observability Records; Evaluation Judges",
      "5. Budgets Must Change Runtime Behavior",
    ],
    workedExample: "6. Worked Example: How Latency and Cost Accumulate Across a Run",
    realistic: "7. Realistic Example: Diagnose a Slow and Expensive Agent",
    code: "8. Read Trace and Budget Accounting in Code",
    lab: "9. Hands-On: Calculate Parallel Latency and Token Cost",
  },
};

const runnableDocumentationAgent = String.raw`"""A tiny bounded documentation agent using only the Python standard library."""

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

function CodeExample({ topicId, code, label, note, heading }: { topicId: string; code: string; label: string; note: string; heading: string }) {
  const displayedCode = topicId === "building-ai-agent" ? runnableDocumentationAgent : code;
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-indigo-800">{heading}</h2>
      <p className="mb-4 leading-relaxed text-slate-700">Use the label and note to understand what this block represents before reading each line.</p>
      <div data-agentic-code><SharedCodeBlock code={displayedCode} title={label} caption={<><strong>Learner note: </strong>{note}</>} /></div>
      {topicId === "building-ai-agent" && (
        <div className="not-prose mt-4 border-l-2 border-emerald-300 bg-emerald-50/50 py-3 pl-4 text-sm leading-relaxed text-slate-700">
          <strong className="text-emerald-900">Expected trace: </strong>The password question records <code>plan → tool → final</code> and succeeds at step 3. The unsupported Mars question reaches <code>step 5: abstain</code>. The limit is a safety and cost ceiling, not a target the successful run should consume.
        </div>
      )}
    </section>
  );
}

export function AgenticAIContent({ topicId, lesson }: { topicId: string; lesson: AgenticBaseLesson }) {
  const enhancement = agenticLessonEnhancements[topicId];
  const detail = agenticLessonDetails[topicId];
  const headings = agenticChapterHeadings[topicId];
  if (!enhancement || !detail || !headings) return null;

  return (
    <div className="space-y-10" data-agentic-lesson={topicId}>
      <section className="not-prose border-y border-slate-200 py-5">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-indigo-800"><Target className="h-4 w-4" />Lesson goals</p>
        <div className="grid gap-3 md:grid-cols-2">
          {detail.objectives.map((objective) => <div key={objective} className="flex items-start gap-3 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" /><span>{objective}</span></div>)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">{headings.core}</h2>
        <p className="text-lg leading-relaxed text-slate-700">{lesson.intro}</p>
      </section>

      <Callout role="tip" title="A familiar way to picture it"><p>{lesson.analogy}</p></Callout>
      <AgenticConceptExpansion topicId={topicId as AgenticTutorialTopic} title={headings.concept} />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">{headings.process}</h2>
        <div className="not-prose grid gap-3">
          {lesson.steps.map((step, index) => <div key={step} className="grid grid-cols-[2rem_1fr] gap-4 border-t border-slate-200 py-4 first:border-t-0"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">{index + 1}</span><p className="pt-1 leading-relaxed text-slate-700">{step}</p></div>)}
        </div>
      </section>

      <div className="space-y-6">{enhancement.visuals.map((visualId) => <div key={visualId}><AgenticVisualFigure id={visualId} /></div>)}</div>

      {detail.sections.map((section, index) => (
        <section key={section.title}>
          <h2 className="mb-4 text-2xl font-bold text-indigo-800">{headings.detailSections[index] ?? section.title}</h2>
          <div className="space-y-3">{section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-relaxed text-slate-700">{paragraph}</p>)}</div>
          {section.bullets && <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
        </section>
      ))}

      <div className="space-y-6">{detail.tables.map((table) => <div key={table.title}><LessonTable table={table} /></div>)}</div>

      {detail.workedExample && (
        <section data-agentic-worked-example>
          <h2 className="mb-4 text-2xl font-bold text-indigo-800">{headings.workedExample ?? `Worked Example: ${detail.workedExample.title}`}</h2>
          <p className="leading-relaxed text-slate-700">{detail.workedExample.setup}</p>
          <ol className="mt-4 space-y-3 pl-0">
            {detail.workedExample.steps.map((step, index) => <li key={step} className="not-prose grid grid-cols-[2rem_1fr] gap-3 border-t border-slate-200 py-4 text-slate-700 first:border-t-0"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 font-bold text-white">{index + 1}</span><span className="pt-1 leading-relaxed">{step}</span></li>)}
          </ol>
          <div className="not-prose mt-4 border-l-2 border-emerald-300 bg-emerald-50/50 py-3 pl-4 text-slate-700"><strong className="text-emerald-900">What the result means: </strong>{detail.workedExample.result}</div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">{headings.realistic}</h2>
        <p className="leading-relaxed text-slate-700">{lesson.example}</p>
      </section>

      <CodeExample topicId={topicId} code={lesson.code} label={enhancement.codeLabel} note={enhancement.codeNote} heading={headings.code} />

      {topicId === "building-ai-agent" && (
        <section className="not-prose border-y border-violet-200 bg-violet-50/40 py-5">
          <h2 className="text-xl font-extrabold text-violet-950">{headings.practice ?? "Practice the End-to-End Agent"}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            <li>Run both supplied questions and match each printed trace to the architecture figure.</li>
            <li>Add one approved document and predict which terms will retrieve it before running.</li>
            <li>Create one malformed tool argument and confirm validation rejects it.</li>
            <li>Turn the success and abstention traces into two repeatable tests before adding any write tool.</li>
          </ol>
        </section>
      )}

      <AgenticWorkedLab topicId={topicId as AgenticTutorialTopic} title={headings.lab} />

      <Callout role="mistake" title="Common mistake"><p>{lesson.mistake}</p></Callout>

      <div data-agentic-summary><SummaryCard items={enhancement.summary} className="mt-0" /></div>
    </div>
  );
}

export { runnableDocumentationAgent };
