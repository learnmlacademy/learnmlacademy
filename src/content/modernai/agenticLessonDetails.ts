export type AgenticTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type AgenticSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type AgenticWorkedExample = {
  title: string;
  setup: string;
  steps: string[];
  result: string;
};

export type AgenticLessonDetail = {
  objectives: string[];
  sections: AgenticSection[];
  tables: AgenticTable[];
  workedExample?: AgenticWorkedExample;
};

export const agenticLessonDetails: Record<string, AgenticLessonDetail> = {
  "agentic-ai-intro": {
    objectives: [
      "Distinguish ordinary code, fixed workflows, and agentic decisions.",
      "Trace the bounded decide–act–observe loop used by an agent.",
      "Place common agent types on an autonomy spectrum without memorising labels.",
      "Choose the least autonomous design that can solve a task reliably.",
    ],
    sections: [
      {
        title: "What changes when software becomes agentic?",
        paragraphs: [
          "Ordinary software follows instructions chosen by a developer. A workflow may contain branches, but the permitted route through those branches is still designed in advance. An agent adds a model-directed decision point: after seeing the current evidence, the model may choose which approved action should happen next.",
          "That freedom is bounded. The application still decides which tools exist, what each tool may access, which actions need approval, how much time or money may be spent, and when the loop must stop. The model proposes the next move; it does not grant itself authority.",
        ],
      },
      {
        title: "Agent types are points on a spectrum",
        paragraphs: [
          "A reflex agent reacts only to the current observation. A model-based agent also maintains a representation of the environment. Goal-based and utility-based agents compare possible outcomes, while learning agents improve a decision rule from experience. An LLM agent uses a language model to interpret open-ended context and select among tools or responses.",
          "These names are useful examples, not a checklist that every product must implement. A support system may combine deterministic validation, a fixed approval workflow, and one small LLM-directed search decision. What matters is where autonomy is genuinely needed and how it is controlled.",
        ],
      },
    ],
    tables: [{
      title: "Choose the simplest control style that fits the task",
      headers: ["Design", "Who chooses the next step?", "Predictability", "Best use", "Cost / risk", "Example"],
      rows: [
        ["Ordinary code", "Developer-written rules", "Highest", "Known calculations and validation", "Lowest", "Reject a refund above a fixed limit"],
        ["Fixed workflow", "Developer-defined branches", "High", "Repeatable multi-step processes", "Moderate", "Collect fields → check policy → request approval"],
        ["Agent", "Model chooses among permitted actions", "Lower", "Open-ended tasks whose next step depends on evidence", "Highest", "Search several sources until a supported answer is possible"],
      ],
    }],
  },

  "tool-calling": {
    objectives: [
      "Explain the boundary between a model proposal and application execution.",
      "Design narrow tools with typed arguments and compact observations.",
      "Separate structural validation from authorization and policy checks.",
      "Use timeouts, idempotency, and approvals for reliable side effects.",
    ],
    sections: [
      {
        title: "A valid tool call is not an authorized action",
        paragraphs: [
          "A schema can prove that an amount is a number and an order ID is a string. It cannot prove that the signed-in user owns that order, that the amount is within policy, or that the action is safe. Those checks belong to trusted application code after the model proposes the call and before the tool executes.",
          "The tool should return a small structured observation: the fields needed for the next decision, a clear status, and a recoverable error category. Returning an entire database record or verbose log wastes context space and may expose data the model does not need.",
        ],
      },
      {
        title: "Retries depend on what the tool does",
        paragraphs: [
          "A read-only lookup is usually safe to retry after a transient timeout. A write may already have succeeded even when its response was lost. Use an idempotency key for side effects so the service can recognize a repeated logical request and return the earlier result instead of performing the action twice.",
        ],
      },
    ],
    tables: [
      {
        title: "Read tools and action tools need different safeguards",
        headers: ["Tool kind", "Examples", "Approval", "Retry rule", "Idempotency", "Useful observation"],
        rows: [
          ["Read / data", "Search policy, get order", "Usually not for low-risk authorized reads", "Bounded retry for transient failures", "Helpful but often optional", "Status, selected fields, source and timestamp"],
          ["Action / write", "Refund, send message, delete record", "Often required for consequential actions", "Retry only when outcome is known or operation is idempotent", "Expected", "Completed / already completed / rejected, receipt and reason"],
        ],
      },
      {
        title: "Refund R-731: the observable tool-call trace",
        headers: ["Stage", "Observable input", "Operation and reason", "Output / next decision"],
        rows: [
          ["Proposal", "User asks to refund order O-204; order lookup says refundable amount is $48", "Model proposes refund_order with {order_id: 'O-204', amount: 48}; this expresses intent only", "Pass proposal to trusted checks—not to the payment service"],
          ["Schema", "order_id string; amount number", "Validator checks required fields and types", "Valid structure; authorization is still unknown"],
          ["Ownership", "Signed-in user U-17; order owner U-17", "Application compares authenticated identity with the authoritative order record", "Authorized owner; continue"],
          ["Policy", "$48 requested; $48 refundable; $100 self-service limit", "Business rules check range and approval threshold", "Permitted without reviewer escalation"],
          ["Execution", "Idempotency key refund:O-204:48", "Payment service performs one write and records the key", "Refund succeeds; receipt R-731"],
          ["Observation", "{status: 'completed', receipt: 'R-731', amount: 48}", "Application returns only fields needed to explain the result", "Model tells the user the refund completed and cites R-731"],
        ],
      },
    ],
    workedExample: {
      title: "One refund request, two safety branches",
      setup: "The authenticated user U-17 requests a $48 refund for order O-204. The order service supplies the owner, refundable amount, and policy limit; the model does not invent those values.",
      steps: [
        "Success: the model proposes structured arguments. Schema validation passes, U-17 matches the order owner, $48 is within both the refundable balance and the $100 policy limit, and the application executes with idempotency key refund:O-204:48. Receipt R-731 proves the write completed.",
        "Unauthorized branch: if the same schema-valid call is made by U-88, the ownership comparison fails. The application returns {status: 'rejected', reason: 'not_order_owner'} and never calls the payment service.",
        "Lost-response branch: suppose the payment write succeeds but the network drops before the application sees R-731. A retry sends the same idempotency key. The service finds the recorded operation and returns existing receipt R-731 instead of issuing a second refund.",
      ],
      result: "JSON validity answers only 'is the proposal well formed?' Identity, ownership, policy, and idempotency answer whether and how it may execute. The final response is based on the receipt, not on the model's proposal.",
    },
  },

  "agent-context-engineering": {
    objectives: [
      "Distinguish next-step context from information stored as memory.",
      "Select context by relevance, trust, recency, and token budget.",
      "Separate trusted instructions from untrusted retrieved content.",
      "Calculate a context budget with room for output and new observations.",
    ],
    sections: [
      {
        title: "Context is the packet used for the next decision",
        paragraphs: [
          "Context is everything deliberately assembled for one model call: trusted instructions, the current goal, tool definitions, selected history, retrieved evidence, and recent tool results. Memory is different. Memory is persisted information that may be searched and inserted into a later context when it becomes relevant.",
          "Good context engineering makes four judgments. Relevance asks whether the item helps this next decision. Trust asks whether it is an instruction, user input, or untrusted evidence. Recency asks whether a newer fact supersedes it. Token budget asks whether the item earns the limited space it consumes.",
        ],
      },
      {
        title: "Compression must preserve commitments",
        paragraphs: [
          "A useful state summary keeps confirmed facts, decisions, constraints, citations, completed work, and open commitments. It can remove greetings, repeated wording, and obsolete intermediate discussion. The goal is not merely fewer tokens; it is a smaller packet that still preserves what the agent must not forget.",
        ],
      },
    ],
    tables: [{
      title: "What belongs in the next-step context?",
      headers: ["Source", "Trust level", "Why include it?", "Compression strategy", "Common failure"],
      rows: [
        ["System / developer instructions", "Trusted authority", "Define role, rules and tool policy", "Keep exact critical constraints", "Hidden by long noisy context"],
        ["User request", "Task input, not system authority", "States the goal and user constraints", "Keep intent and explicit choices", "Ambiguity silently guessed"],
        ["Working state", "Application-maintained", "Tracks progress, decisions and open work", "Structured compact summary", "Stale or missing commitments"],
        ["Retrieved evidence", "Untrusted data", "Supplies task facts", "Rerank, quote minimally, keep provenance", "Prompt injection or irrelevant passages"],
        ["Tool result", "Untrusted observation", "Shows what happened", "Return only decision-relevant fields", "Verbose output floods the context"],
      ],
    }],
    workedExample: {
      title: "Budgeting a 32,000-token context window",
      setup: "The 32,000-token limit is the chosen model/API limit for this example. The application reserves 4,000 tokens for the model's response before assembling the input.",
      steps: [
        "Instructions and tool definitions use 3,500 tokens; current state uses 1,500; retrieved evidence uses 15,000; and conversation history uses 6,000.",
        "Current input = 3,500 + 1,500 + 15,000 + 6,000 = 26,000 tokens.",
        "Committed budget including output = 26,000 + 4,000 = 30,000 tokens.",
        "Remaining headroom = 32,000 − 30,000 = 2,000 tokens.",
        "A new 4,000-token tool result will not fit: it exceeds the 2,000-token headroom by 2,000 tokens, so evidence/history must be reranked, compressed, or dropped before the next call.",
      ],
      result: "Reserving output alone is not enough for an acting agent. It also needs headroom for observations that arrive after tools run.",
    },
  },

  "agent-memory": {
    objectives: [
      "Distinguish working, episodic, semantic, and procedural memory.",
      "Separate memory from context, task checkpoints, and model weights.",
      "Apply explicit write, recall, update, and deletion policies.",
      "Handle stale or conflicting memories using provenance and recency.",
    ],
    sections: [
      {
        title: "Memory is a managed application capability",
        paragraphs: [
          "The model does not automatically decide that every conversation detail should be retained. The application applies a write policy: what is useful later, what is permitted to persist, how long it lives, and whether the user can inspect or delete it. A recall policy then selects only memories relevant to the current goal.",
          "When memories conflict, prefer an authoritative source and newer verified evidence rather than silently combining both. Store provenance—who or what supplied the fact, when it was recorded, and why it was saved—so the system can resolve conflicts and explain important decisions.",
        ],
      },
    ],
    tables: [
      {
        title: "A practical memory taxonomy",
        headers: ["Memory type", "What it stores", "Typical lifetime", "Recall style", "Main risk"],
        rows: [
          ["Working / session", "Recent messages and temporary facts", "One task or session", "Included directly or summarized", "Noise and context overflow"],
          ["Episodic", "Past events and outcomes", "Across sessions", "Retrieve similar relevant episodes", "Old events misapplied"],
          ["Semantic / preferences", "Approved facts and preferences", "Until updated or deleted", "Key lookup or relevance search", "Privacy and stale facts"],
          ["Procedural", "Approved procedures or learned routines", "Versioned long term", "Selected by task type", "Outdated or unsafe procedure"],
        ],
      },
      {
        title: "Do not confuse four different stores",
        headers: ["Concept", "Meaning", "Does it persist?", "Who changes it?"],
        rows: [
          ["Context", "Working packet for the next model decision", "Only if the application saves it", "Context assembler"],
          ["Memory", "Information deliberately saved for possible recall", "Yes, by policy", "Memory service / user controls"],
          ["Checkpoint / state", "Authoritative progress of an ongoing task", "Yes, for durability", "Workflow runtime"],
          ["Model weights", "Parameters learned during training", "Yes across inference calls", "Training or fine-tuning process"],
        ],
      },
    ],
    workedExample: {
      title: "A preference is written, recalled, superseded, and deleted",
      setup: "A user explicitly says, 'Save PDF as my preferred report format.' The candidate value comes from that request; the application—not the model weights—owns the memory lifecycle.",
      steps: [
        "Write: policy confirms that a non-sensitive format preference may persist and records {format: 'PDF', source: 'user U-17', saved_at: '2026-09-12T09:00Z', version: 1}.",
        "Recall: during a later report task, the recall service retrieves the preference because report format is relevant. It adds the selected value and provenance to the current context; unrelated memories stay out.",
        "Conflict: the user later says, 'Use HTML from now on.' The newer explicit instruction conflicts with version 1, so the service creates version 2 and marks PDF superseded rather than combining both formats.",
        "Delete: when the user asks to forget the preference, the memory record is removed according to policy. A future report task asks for a format instead of guessing from the deleted value.",
      ],
      result: "The current context changes on each call, the memory store keeps only policy-approved history, a workflow checkpoint would track unfinished report work, and model weights remain unchanged throughout.",
    },
  },

  "planning-reflection": {
    objectives: [
      "Choose among plan-first, stepwise ReAct, and reflection strategies.",
      "Evaluate observable actions and evidence instead of hidden reasoning.",
      "Use verifier results to revise a plan only when needed.",
      "Stop on success, no progress, exhausted budgets, or required escalation.",
    ],
    sections: [
      {
        title: "Planning, acting, and checking are different jobs",
        paragraphs: [
          "A plan states intended steps before they run. ReAct chooses one action, observes real evidence, and then chooses again. Reflection or an evaluator checks whether the result meets explicit criteria and may request a bounded revision. These techniques can be combined, but every extra loop adds latency and cost.",
          "Do not treat private chain-of-thought as evidence. Production traces should record observable decisions, selected tools, validated arguments, tool results, verifier scores, and stop reasons. Those are the artifacts a developer can test and a reviewer can audit.",
        ],
      },
    ],
    tables: [
      {
        title: "Match the control strategy to the task",
        headers: ["Strategy", "Best fit", "Benefit", "Failure mode", "Stop condition"],
        rows: [
          ["Plan-first", "Known dependencies and ordered subtasks", "Makes coverage and sequence explicit", "Brittle when evidence changes", "Plan complete or replan trigger"],
          ["Stepwise / ReAct", "Uncertain environments and tool feedback", "Adapts after each observation", "Loops or repeated weak actions", "Success, no progress, max steps or budget"],
          ["Reflection / evaluator", "Outputs with checkable quality criteria", "Finds specific defects before finalizing", "Endless polishing or self-confirmation", "Verifier passes or revision limit reached"],
        ],
      },
      {
        title: "Observable trajectory for a product brief",
        headers: ["Step", "Current goal", "Validated action", "Observation", "Verifier", "Budget left", "Next decision"],
        rows: [
          ["1", "Find price and warranty", "search_catalog(source A, model X)", "Price = $640; warranty field absent", "Incomplete: 1 required field missing", "2 of 4 tool steps", "Use a different approved source"],
          ["2", "Fill the warranty gap", "search_warranty_registry(source B, model X)", "Warranty = 2 years; record W-92", "Pass: both fields have evidence", "1 of 4 tool steps", "Stop and write supported brief"],
          ["No-progress branch", "Warranty still missing", "Duplicate detector sees the same source A query", "No new evidence would be produced", "Fail: repeated ineffective action", "1 of 4 tool steps", "Stop or escalate instead of looping"],
        ],
      },
    ],
    workedExample: {
      title: "A bounded ReAct trace uses observations to revise once",
      setup: "The required output is a two-field product brief: current price and warranty period. The runtime permits four tool steps and logs only observable goals, actions, results, verifier decisions, and budget—not hidden reasoning.",
      steps: [
        "Step 1 searches approved source A. Its catalog entry supplies the $640 price but no warranty. The verifier compares the observation with the two required fields and reports one gap.",
        "Step 2 changes action rather than repeating the failed search: it queries approved warranty source B. Record W-92 supplies a two-year warranty, so the verifier now finds both claims supported.",
        "The agent stops with one step still available because success—not budget exhaustion—is the correct terminal condition. If it proposed the identical source A query again, a no-progress rule would stop or escalate the run.",
      ],
      result: "The useful reasoning evidence is the change in validated action after a named evidence gap, followed by a verifier pass and explicit stop reason. More looping would add cost without improving the answer.",
    },
  },

  "agent-state-graphs": {
    objectives: [
      "Represent an agent workflow with typed state, nodes, edges, and END.",
      "Separate deterministic nodes from model-directed decisions.",
      "Use bounded loops and parallel branches deliberately.",
      "Explain why explicit transitions improve testing and debugging.",
    ],
    sections: [
      {
        title: "A graph turns invisible control flow into testable structure",
        paragraphs: [
          "State is the structured record carried between nodes: inputs, evidence, counters, decisions, status, and errors. A deterministic node performs known logic such as schema validation. A model-directed node chooses among permitted routes. Edges define which transition may occur next, and END is an explicit finished state.",
          "Loops should state what progress means and how many repeats are allowed. Parallel branches are useful only when subtasks are independent enough to run together and their results can be merged deterministically. Persistence and resuming a graph belong to the durable-agent lesson that follows.",
        ],
      },
    ],
    tables: [{
      title: "Elements of an agent state graph",
      headers: ["Element", "Purpose", "How to test it"],
      rows: [
        ["Node", "Performs one bounded operation", "Given state, assert output update"],
        ["Edge", "Allows a named transition", "Assert legal source and destination"],
        ["State", "Carries typed task information", "Validate schema and ownership of updates"],
        ["Conditional route", "Selects a branch from evidence", "Test every condition and fallback"],
        ["Loop", "Repeats work while progress is possible", "Assert progress rule and maximum count"],
        ["Parallel branch", "Runs independent subtasks together", "Test isolation, join and conflict handling"],
        ["END", "Marks a completed or safely stopped run", "Assert final status and required outputs"],
      ],
    }],
  },

  "durable-long-running-agents": {
    objectives: [
      "Persist checkpoints so work survives restarts and long waits.",
      "Pause on events instead of holding a request open.",
      "Design meaningful human approval with evidence and choices.",
      "Resume only after expiry, authorization, and external state are revalidated.",
    ],
    sections: [
      {
        title: "Waiting is a stored state, not a sleeping request",
        paragraphs: [
          "A task that may wait hours for a person or external event should save a checkpoint, release the worker, and resume from a queue, schedule, or event. Keeping one web request or process open wastes resources and is easily lost during restarts.",
          "An approval can expire or be cancelled. Before resuming a consequential action, reload the checkpoint, confirm that the reviewer still has authority, verify the decision has not expired, and recheck prices, permissions, inventory, or other external conditions that may have changed while the task waited.",
        ],
      },
    ],
    tables: [
      {
        title: "Designing useful human intervention",
        headers: ["Trigger", "Reviewer must see", "Allowed decisions", "Resume behavior", "Audit record"],
        rows: [
          ["High-impact action", "Evidence, amount, recipient, consequences", "Approve, reject, edit", "Revalidate then execute once", "Reviewer, time, decision, receipt"],
          ["Low confidence / conflicting evidence", "Sources, conflict and proposed interpretation", "Clarify, choose source, stop", "Update state and continue from decision", "Evidence and rationale"],
          ["Expired wait / changed conditions", "Original proposal and current state", "Renew, revise, cancel", "Never reuse stale approval silently", "Expiry and revalidation result"],
        ],
      },
      {
        title: "Checkpoint before pause and authoritative state after resume",
        headers: ["Field", "Before pause", "After resume / revalidation"],
        rows: [
          ["Task and state", "PAY-204; version 3", "PAY-204; version 4 with revalidation event"],
          ["Pending action", "Pay supplier $4,800", "Price changed: proposed payment $5,050"],
          ["Evidence", "Quote Q-17", "Fresh quote Q-22 replaces Q-17"],
          ["Requester / reviewer", "Requester U-17; finance reviewer required", "U-17 re-authenticated; reviewer F-09 still authorized"],
          ["Approval / expiry", "Approval A-51; expires 17:00", "A-51 expired; revised approval A-62 valid"],
          ["Attempt / idempotency", "Attempt 0; key PAY-204", "Attempt 1; same key PAY-204; receipt P-880"],
        ],
      },
    ],
    workedExample: {
      title: "Resume a supplier payment without replaying stale authority",
      setup: "Task PAY-204 pauses with quote Q-17 for $4,800, reviewer requirement 'finance', approval A-51 expiring at 17:00, attempt count 0, and idempotency key PAY-204 stored in checkpoint version 3.",
      steps: [
        "Pause: the workflow persists the checkpoint and releases its worker while a finance reviewer inspects the quoted amount and evidence.",
        "Wait: approval A-51 arrives, but the task resumes after 17:00. The supplier has also replaced Q-17 with Q-22 for $5,050.",
        "Revalidate: the runtime reloads version 3, re-authenticates requester U-17, confirms reviewer F-09's current authority, detects the expired approval and changed quote, and refuses to execute the old proposal.",
        "Resume: reviewer F-09 approves the revised amount as A-62. The payment executes with the original logical key PAY-204; receipt P-880 is recorded and any retry returns that receipt instead of paying twice.",
      ],
      result: "Durability preserves progress, not stale permission. Version 4 records the fresh quote, revised approval, one execution attempt, and receipt, making the eventual side effect auditable and exactly-once from the workflow's perspective.",
    },
  },

  "agentic-rag": {
    objectives: [
      "Decide when adaptive retrieval is worth more than one fixed search.",
      "Transform queries and choose sources from observed evidence gaps.",
      "Grade relevance, authority, provenance, and conflicting evidence.",
      "Stop retrieval using evidence and resource budgets.",
    ],
    sections: [
      {
        title: "What makes retrieval agentic?",
        paragraphs: [
          "Baseline RAG follows one designed retrieval path: transform the question, retrieve passages, and generate from them. Agentic RAG adds decisions around that path. The agent may decide retrieval is unnecessary, choose a source, reformulate a weak query, follow a cited document, compare evidence, or stop because the available sources cannot support an answer.",
          "The agent should not merely ask whether passages look similar to the question. It should check relevance, authority, publication or effective date, provenance, and whether the evidence actually covers the claims the answer must make. When trusted sources conflict, the conflict is itself an outcome to report or escalate—not an invitation to average them together.",
        ],
      },
      {
        title: "Bound the corrective retrieval loop",
        paragraphs: [
          "A weak result can trigger a more specific query, a different approved collection, or a request for clarification. Each retry must have a reason tied to an evidence gap. Stop after the configured attempt, latency, or cost limit, and return the best supported partial result or abstain.",
          "Agentic RAG is not worthwhile when one well-tuned retrieval query already solves the task, when low latency is critical, or when the source space is too weak to benefit from adaptation. Extra searches add cost and increase exposure to irrelevant or hostile content.",
        ],
      },
    ],
    tables: [{
      title: "Baseline RAG versus Agentic RAG",
      headers: ["Question", "Baseline RAG", "Agentic RAG"],
      rows: [
        ["Retrieval trigger", "Always follows the designed retrieval step", "Model or policy decides whether retrieval is needed"],
        ["Number of searches", "Usually one", "One or more within a budget"],
        ["Query adaptation", "Fixed transform", "Rewrites after observing evidence gaps"],
        ["Evidence checks", "Often relevance-focused", "Relevance, authority, provenance, sufficiency and conflict"],
        ["Latency / cost", "Lower and more predictable", "Higher and variable"],
        ["Best fit", "Routine grounded questions", "Complex questions needing source or query adaptation"],
      ],
    }],
    workedExample: {
      title: "Comparing the latency of one retrieval with an adaptive loop",
      setup: "The times below are illustrative measured components for one question, not universal performance claims.",
      steps: [
        "Baseline RAG uses one retrieval taking 0.25 s and one answer generation taking 1.10 s.",
        "Baseline total = 0.25 + 1.10 = 1.35 s.",
        "Agentic RAG uses a 0.35 s decision, two retrievals at 0.25 s each, a 0.30 s evidence check, and a 1.10 s answer generation.",
        "Agentic total = 0.35 + (2 × 0.25) + 0.30 + 1.10 = 2.25 s.",
        "Extra latency = 2.25 − 1.35 = 0.90 s.",
      ],
      result: "Adaptive retrieval must earn its extra 0.90 seconds by improving evidence quality on the task; otherwise baseline RAG is the better design.",
    },
  },

  "building-ai-agent": {
    objectives: [
      "Connect the first two lessons—agent loops and tool calling—into one complete working example.",
      "Identify the minimum parts of a bounded agent without needing planning, memory, or a framework yet.",
      "Run a standard-library example through both supported-answer and safe-abstention paths.",
      "Read the trace so later lessons on planning, context, memory, graphs, and evaluation have a concrete foundation.",
    ],
    sections: [
      {
        title: "Build the core loop before learning the advanced subsystems",
        paragraphs: [
          "You already have enough background to build a first agent. Lesson 1 introduced the bounded decide → act → observe loop, and Lesson 2 showed that a model may propose a tool call while trusted application code validates and executes it. This lesson simply connects those two ideas into one small program.",
          "Start with one narrow job whose success can be checked. Write the goal and instructions separately: the goal describes the requested outcome, while instructions define permitted behavior, evidence requirements, and when to abstain. Add one read-only tool with a small schema and validate every proposed argument before execution.",
          "The tiny state in this example records only the goal, evidence, step count, and trace. That is enough to understand the mechanism. Later lessons will improve one part at a time: planning chooses better next steps, context engineering chooses what the model sees, memory persists useful information, state graphs make execution explicit, and durable execution survives long waits and restarts.",
          "On each iteration, a decision function chooses search, final answer, or abstain; the tool returns an observation; state is updated; and stop rules prevent an endless loop. In a real LLM application the model may propose the decision, but validation and limits remain deterministic application responsibilities.",
        ],
      },
      {
        title: "Follow one success path and one failure path",
        paragraphs: [
          "For a supported question, the example searches approved documents, records the observation, and returns a cited answer. For an unsupported question, repeated searching cannot manufacture evidence: the loop reaches its limit and explicitly abstains. Both traces are valuable evaluation cases.",
        ],
      },
    ],
    tables: [{
      title: "Minimum parts of a bounded agent",
      headers: ["Component", "Minimum implementation", "Failure prevented"],
      rows: [
        ["Goal", "One measurable job", "Aimless behavior"],
        ["Instructions", "Allowed sources, actions and abstention rule", "Policy drift"],
        ["Tools", "One narrow read-only schema first", "Excessive authority"],
        ["State", "Goal, evidence, steps and trace", "Lost progress"],
        ["Validation", "Check tool name and arguments", "Malformed or unauthorized calls"],
        ["Stop rules", "Success, max steps, no progress, escalation", "Infinite loops"],
        ["Trace", "Decision, action, observation and stop reason", "Undiagnosable runs"],
        ["Evaluation", "Success and failure scenarios", "Unmeasured reliability"],
      ],
    }],
    workedExample: {
      title: "A five-step documentation agent",
      setup: "The developer chooses MAX_STEPS = 5. The limit is a safety budget, not a fact learned by the model.",
      steps: [
        "A supported query triggers one validated search of the approved in-memory documentation.",
        "The observation is stored with its source; on the next decision the agent has enough evidence and returns a cited answer after 1 tool step.",
        "An unsupported query returns no evidence. The deterministic loop may try another bounded search, but it never invents a document.",
        "When step 5 is reached without evidence, the agent returns an abstention message and records stop_reason = 'step_limit'.",
      ],
      result: "Success and safe abstention are both correct outcomes. The important property is that the trace explains why the loop stopped.",
    },
  },

  "multi-agent-systems": {
    objectives: [
      "Compare manager-worker, agent-as-tool, and handoff topologies.",
      "Write a delegation contract with scope, permissions, budget, and success criteria.",
      "Transfer only necessary context and evidence between agents.",
      "Keep task ownership and final synthesis explicit.",
    ],
    sections: [
      {
        title: "Calling a specialist is not the same as handing over control",
        paragraphs: [
          "When an agent uses another agent as a tool, the specialist receives a bounded request, returns a result, and control goes back to the original controller. In a handoff, the receiving agent becomes responsible for the conversation or task until another explicit transfer occurs.",
          "Every delegation needs a contract: scope, inputs, expected output, permissions, budget, deadline, and success criteria. Pass evidence and state needed for that contract—not the entire conversation by default. Unless ownership is deliberately handed off, one coordinator remains responsible for resolving conflicts and producing the final answer.",
        ],
      },
    ],
    tables: [
      {
        title: "Three multi-agent topologies",
        headers: ["Topology", "Control owner", "Context transfer", "Best fit", "Main failure"],
        rows: [
          ["Manager-workers", "Manager delegates and synthesizes", "Bounded task packets to workers", "Parallel specialist subtasks", "Manager bottleneck or duplicate work"],
          ["Agents-as-tools", "Controller remains in charge", "One request and structured return", "Nested specialist capability", "Ambiguous result contract"],
          ["Handoff / peer", "Ownership transfers to receiver", "Task state plus explicit authority", "Different agent should continue the task", "Lost ownership or missing context"],
        ],
      },
      {
        title: "Should this be one agent or several?",
        headers: ["Signal", "Prefer one agent", "Consider multiple agents"],
        rows: [
          ["Work structure", "Mostly sequential and coherent", "Independent specialist subtasks"],
          ["Tools / permissions", "Same tools and authority", "Distinct permission boundaries"],
          ["Parallelism", "Little useful overlap", "Independent work can run concurrently"],
          ["Coordination cost", "Would dominate the task", "Measured quality/time gain exceeds it"],
        ],
      },
    ],
  },

  "model-context-protocol": {
    objectives: [
      "Trace an MCP request from host and client to server and underlying service.",
      "Distinguish protocol compatibility from trust and authorization.",
      "Compare MCP with direct APIs and ordinary function-tool integration.",
      "Treat exact SDK details as version-dependent implementation choices.",
    ],
    sections: [
      {
        title: "The protocol is not the underlying service",
        paragraphs: [
          "An MCP server exposes supported protocol capabilities—such as tools, resources, or prompts—to a compatible client. The server may then call a separate database, filesystem, search index, or business API that performs the real operation. MCP standardizes the connection and discovery layer; it does not replace that service.",
          "Compatibility does not grant trust. Hosts and servers still need authentication, authorization, user consent, least-privilege scopes, input validation, credential protection, audit logs, and version management. SDK names may evolve, so the stable lesson is the host–client–server–service boundary.",
        ],
      },
    ],
    tables: [
      {
        title: "MCP, direct APIs, and ordinary function tools",
        headers: ["Approach", "What is standardized?", "Discovery", "Portability", "Security responsibility"],
        rows: [
          ["Direct API", "Service-specific endpoints and schemas", "Developer reads service contract", "Integration is service-specific", "Application and service"],
          ["Ordinary function tool", "Application-defined tool schema", "Tools supplied in each application", "Portable only by local convention", "Application and underlying service"],
          ["MCP", "Compatible protocol messages and capabilities", "Client discovers server capabilities", "Compatible hosts can reuse servers", "Host, client/server deployment and underlying service"],
        ],
      },
      {
        title: "One discovered capability, two authorization outcomes",
        headers: ["Stage", "Normal invocation", "Insufficient-scope invocation"],
        rows: [
          ["Discovery", "Server advertises read_invoice", "Server advertises read_invoice"],
          ["Protocol request", "Client requests invoice INV-42 using a version-compatible structured message", "Client requests INV-42 using the same capability"],
          ["Server boundary", "Credential has invoices:read for account A-7", "Credential lacks invoices:read for A-7"],
          ["Underlying service", "Server calls billing API and receives amount $320", "Not called"],
          ["Protocol result", "Structured result: invoice INV-42, amount $320", "Structured insufficient_scope error"],
          ["Host decision", "Place compact result in model context", "Explain missing permission; do not invent data or broaden scope"],
        ],
      },
    ],
    workedExample: {
      title: "Discovery enables invocation; it does not grant access",
      setup: "An AI host has MCP client functionality connected to a billing MCP server. The server exposes a read_invoice capability backed by a separate billing API. The example uses conceptual messages because exact SDK and wire fields can evolve.",
      steps: [
        "Discovery: the client learns that read_invoice accepts an invoice identifier. This establishes protocol compatibility, not permission to read every invoice.",
        "Normal path: the host requests INV-42; the server authenticates the caller and confirms invoices:read scope for account A-7 before asking the underlying billing API. The API returns $320, which the server packages as a structured protocol result.",
        "Rejection path: a different credential sends the same well-formed request but lacks invoices:read for A-7. The server returns a structured insufficient_scope error and never sends a request to the billing API.",
      ],
      result: "The protocol request/result belongs to the MCP boundary; the billing request/result belongs to the underlying service. Least privilege is enforced at the server/service boundary even when discovery and message structure are valid.",
    },
  },

  "agent-frameworks": {
    objectives: [
      "Identify the concrete runtime need a framework should solve.",
      "Compare plain code, LangGraph, CrewAI, and AutoGen by abstraction and control style.",
      "Relate state graphs, crews/flows, and AgentChat/Core to suitable use cases.",
      "Keep business tools portable behind framework-neutral interfaces.",
    ],
    sections: [
      {
        title: "Start from the control problem, not the framework name",
        paragraphs: [
          "Plain code is often clearest for a small loop because every state update, permission check, and stop rule is visible. A framework becomes useful when the system needs durable checkpoints, explicit graphs, human interrupts, reusable team orchestration, event-driven messaging, or integrated tracing that would otherwise become substantial plumbing.",
          "LangGraph centers explicit state and graph transitions, with persistence and interrupt/resume patterns. CrewAI centers agents and crews for role-oriented collaboration and flows for structured orchestration. AutoGen provides higher-level AgentChat abstractions and a lower-level Core for flexible event-driven multi-agent applications. These descriptions guide selection without claiming one framework is universally best.",
        ],
      },
      {
        title: "Protect domain logic from framework lock-in",
        paragraphs: [
          "Define your search, billing, validation, and other business capabilities behind interfaces owned by the application. Framework-specific nodes or agents call those interfaces. This keeps authorization and tests stable and lets the orchestration layer change without rewriting every business tool.",
        ],
      },
      {
        title: "Apply four control models to the same research brief",
        paragraphs: [
          "Suppose the product must gather three approved sources, extract price and warranty, obtain a reviewer decision when sources conflict, and save a trace. The tools, permission checks, evidence schema, and acceptance test should stay framework-neutral; only the orchestration model changes.",
          "Plain code makes the loop and state updates explicit. LangGraph represents the steps and conditional transitions as a state graph. CrewAI can represent researcher and reviewer roles coordinated toward one deliverable. AutoGen can represent the same specialists as conversational or event-driven agents with an explicit termination rule. A framework is justified only when its control model solves measured complexity better than the dependency it adds.",
        ],
      },
    ],
    tables: [
      {
        title: "Framework concepts and trade-offs",
        headers: ["Choice", "Primary abstraction", "State / workflow style", "Durability / HITL", "Multi-agent", "Observability", "Best fit", "Trade-off"],
        rows: [
          ["Plain code", "Functions and explicit loop", "Developer-owned", "Build what is needed", "Manual", "Manual", "Small bounded systems", "More plumbing as complexity grows"],
          ["LangGraph", "State graph and nodes", "Explicit graph/state", "Strong fit for persistence and interrupts", "Supported through graph patterns", "Runtime tracing integrations", "Durable branching workflows", "Graph/runtime dependency"],
          ["CrewAI", "Agents, crews and flows", "Role collaboration plus structured flows", "Depends on chosen runtime design", "Core emphasis", "Framework tooling", "Role-oriented team orchestration", "Abstractions may exceed simple needs"],
          ["AutoGen", "AgentChat and Core", "Conversational / event-driven", "Application/runtime dependent", "Core emphasis", "Runtime tooling", "Flexible multi-agent applications", "More coordination choices to manage"],
        ],
      },
      {
        title: "Framework selection checklist",
        headers: ["Question", "If no", "If yes"],
        rows: [
          ["Do you need explicit durable state or interrupt/resume?", "Plain code may be enough", "Compare graph persistence support"],
          ["Do role-based teams create measured value?", "Avoid multi-agent abstraction", "Compare crew/team orchestration"],
          ["Do you need conversational or event-driven agent coordination?", "Use a simpler loop", "Compare AgentChat/Core-style runtime"],
          ["Can business tools remain framework-neutral?", "Refactor boundaries first", "Prototype and evaluate the framework"],
        ],
      },
      {
        title: "Same problem, different control ownership",
        headers: ["Choice", "State representation", "Control / collaboration", "Persistence + HITL", "Observability", "Portability / lock-in"],
        rows: [
          ["Plain code", "Application-owned ResearchState object", "Explicit loop calls search, extract and review functions", "Build checkpoint and approval boundary directly", "Application logs every transition", "Highest control; most runtime plumbing"],
          ["LangGraph", "Typed state carried through graph", "Named nodes and conditional edges", "Checkpoint and interrupt/resume patterns fit naturally", "Graph/node traces", "Graph runtime becomes an orchestration dependency"],
          ["CrewAI", "Task/flow state plus role outputs", "Researcher and reviewer roles coordinated by crew/flow", "Design depends on the selected flow and storage", "Framework task/agent traces", "Role abstractions shape the application"],
          ["AutoGen", "Messages, agent state and application records", "Conversational or event-driven specialist interaction", "Application/runtime supplies durable boundary and human event", "Message and event traces", "Agent messaging/runtime concepts shape coordination"],
        ],
      },
    ],
    workedExample: {
      title: "Choose a framework by mapping one bounded workflow",
      setup: "The same research brief needs three approved sources, price and warranty extraction, conflict review, a durable trace, and a deterministic verifier. Business tools and schemas remain identical in all four designs.",
      steps: [
        "Plain code is the reference: one ResearchState object moves through explicit functions and a bounded loop. It is easiest to audit, but the team must build persistence, interrupts, and tracing it truly needs.",
        "LangGraph makes search, extraction, conflict review, and END explicit nodes and transitions. It is a strong conceptual fit when resumable state and human interrupts are core requirements.",
        "CrewAI expresses a researcher and reviewer as role-oriented collaborators, while a flow coordinates the deliverable. It fits when measured role specialization matters more than a minimal loop.",
        "AutoGen represents researcher/reviewer coordination through agent messages or events and requires a clear termination condition. It fits when that interaction model is itself useful rather than merely fashionable.",
      ],
      result: "No framework changes the authorization or correctness contract. Select the smallest control model that makes state, intervention, and traces clearer, and keep domain tools portable so a later migration does not rewrite business logic.",
    },
  },

  "browser-computer-use-agents": {
    objectives: [
      "Choose the most reliable interface: API, DOM, GUI, or code execution.",
      "Follow observe–act–re-observe–verify after every interface change.",
      "Design a least-privilege sandbox for generated code.",
      "Require confirmation before consequential or irreversible actions.",
    ],
    sections: [
      {
        title: "Use the narrowest reliable capability",
        paragraphs: [
          "A typed API exposes structured inputs and outputs and is usually easier to validate, authorize, retry, and monitor than a graphical interface. Use browser DOM interaction when no suitable API exists, and full screenshot/coordinate computer use only when the task genuinely depends on the visible interface.",
          "After every click, navigation, or terminal command, observe again. The old screenshot, coordinates, DOM handle, or prompt may no longer describe the current state. Deterministically verify the intended outcome, and ask for confirmation before purchases, submissions, deletion, messages, or other irreversible actions.",
        ],
      },
    ],
    tables: [{
      title: "Capability choices for acting agents",
      headers: ["Capability", "Reliability", "Observability", "Risk", "Preferred use"],
      rows: [
        ["Direct API", "Highest when supported", "Structured requests/results", "Lowest with scoped credentials", "Use first for supported operations"],
        ["Browser / DOM", "Moderate", "Selectors and page state", "Page changes and untrusted content", "Web tasks without a suitable API"],
        ["Computer-use GUI", "Lower", "Screenshots and visible state", "Stale coordinates and wrong-window actions", "Legacy or visual-only interfaces"],
        ["Code execution", "Depends on environment", "Process, files and outputs", "Arbitrary code and resource access", "Analysis inside a strict sandbox"],
      ],
    }],
  },

  "agent-security": {
    objectives: [
      "Trace indirect prompt injection from hostile content to a proposed action.",
      "Place deterministic controls outside model-level instructions.",
      "Apply guardrails at input, tool, output, and approval boundaries.",
      "Choose retry, compensation, fallback, escalation, or safe stop by failure type.",
    ],
    sections: [
      {
        title: "Instructions guide the model; controls enforce authority",
        paragraphs: [
          "A model instruction can state that retrieved text is untrusted, but probabilistic compliance is not an authorization system. Deterministic code must decide which identity may call which tool, which resources are allowlisted, what argument limits apply, and when human approval is required.",
          "Layer guardrails where different failures appear: inspect incoming content, validate proposed tool inputs, scan tool results before they re-enter context, check final outputs, and pause high-impact actions for an authorized person. No single universal check replaces these separate boundaries.",
        ],
      },
      {
        title: "Recovery depends on side effects and certainty",
        paragraphs: [
          "Retry a transient operation only when it is safe to repeat. If a non-idempotent payment may have completed before a timeout, check status or escalate rather than replaying it. Use compensation for a completed reversible step, a fallback for an unavailable component, and a safe stop when authority or evidence is insufficient.",
        ],
      },
    ],
    tables: [
      {
        title: "Threats and the controls that contain them",
        headers: ["Threat", "Primary control"],
        rows: [
          ["Prompt injection", "Trust separation plus application-side authorization"],
          ["Excessive permission", "Least privilege, scopes and allowlists"],
          ["Credential leakage", "Secret isolation, redaction and short-lived credentials"],
          ["Duplicate side effect", "Idempotency key and outcome check"],
          ["Poisoned tool result", "Treat output as untrusted; validate before reuse"],
          ["No-progress loop", "Progress invariant, duplicate-action detector and budgets"],
          ["Partial completion", "Receipts, checkpointed state, compensation or escalation"],
        ],
      },
      {
        title: "Where layered guardrails operate",
        headers: ["Boundary", "Example check", "What it cannot replace"],
        rows: [
          ["Input", "Detect hostile or disallowed requests", "Tool authorization"],
          ["Tool input", "Schema, range, identity and scope checks", "Post-action verification"],
          ["Tool output", "Malware/content scan and data minimization", "Source authority judgment"],
          ["Final output", "Privacy, grounding and policy checks", "Control of already-run actions"],
          ["Human approval", "Authorized review of evidence and consequences", "Least-privilege tool design"],
        ],
      },
    ],
  },

  "agent-evaluation-safety": {
    objectives: [
      "Evaluate both task outcome and the trajectory used to reach it.",
      "Choose deterministic checks, human review, and calibrated model judges appropriately.",
      "Separate headline success from safe-success.",
      "Turn production incidents into representative regression cases.",
    ],
    sections: [
      {
        title: "Evaluate the journey as well as the destination",
        paragraphs: [
          "A final answer can be correct even when the agent chose the wrong tool, used invalid arguments, accessed an unauthorized resource, repeated needless steps, or recovered unsafely. A scenario suite should therefore define the expected outcome, allowed actions, important forbidden actions, and the trace evidence required for success.",
          "Deterministic evaluators are strongest for clear facts such as numeric limits, schema conformance, tool sequence, and citations. Human reviewers handle nuanced high-risk judgment. Model judges can scale rubric-based review, but must be calibrated against human labels and monitored for bias or instability. Public benchmarks are signals, not replacements for application-specific cases.",
        ],
      },
    ],
    tables: [
      {
        title: "What to evaluate in an agent run",
        headers: ["Dimension", "Evaluator type", "Example failure"],
        rows: [
          ["Final task success", "Deterministic or human", "Correct format but wrong outcome"],
          ["Tool selection", "Trace rule / human", "Search used when authoritative lookup was required"],
          ["Argument correctness", "Schema and policy checks", "Wrong order ID or amount"],
          ["Policy compliance", "Deterministic guard plus review", "Unauthorized data access"],
          ["Unnecessary steps", "Trace analysis", "Repeated equivalent searches"],
          ["Recovery", "Scenario assertion", "Retried unsafe side effect"],
          ["Latency", "Measured trace", "p95 exceeds service objective"],
          ["Cost", "Usage calculation", "Successful answer exceeds task budget"],
        ],
      },
      {
        title: "Choosing an evaluator",
        headers: ["Evaluator", "Strength", "Limitation", "Best use"],
        rows: [
          ["Deterministic check", "Repeatable and precise", "Needs an explicit rule", "Schemas, limits, exact tool behavior"],
          ["Human review", "Nuanced and context-aware", "Slow, costly, variable", "High-risk quality and policy judgment"],
          ["Model judge", "Scales rubric-based review", "Can be biased or unstable", "Calibrated semantic scoring with audits"],
        ],
      },
    ],
    workedExample: {
      title: "Task success can hide unsafe trajectories",
      setup: "A fixed offline suite contains 20 representative cases. Seventeen end with the correct task result.",
      steps: [
        "Task-success rate = 17 ÷ 20 = 0.85 = 85%.",
        "Trace review finds policy violations in 2 of those 17 otherwise successful runs.",
        "Runs that are both successful and free of those violations = 17 − 2 = 15.",
        "Safe-success rate = 15 ÷ 20 = 0.75 = 75%.",
      ],
      result: "Reporting only 85% would hide two unsafe paths. The 75% safe-success rate better describes deployable behavior.",
    },
  },

  "agent-observability-deployment": {
    objectives: [
      "Read a trace as nested spans for model, tool, handoff, and guardrail work.",
      "Interpret p50 and p95 latency and cumulative run cost.",
      "Distinguish observability evidence from evaluation judgments.",
      "Use budgets, controlled release, rollback, and privacy-aware logging.",
    ],
    sections: [
      {
        title: "Observability records; evaluation judges",
        paragraphs: [
          "A trace groups one complete task. Spans represent its individual operations, such as a model generation, tool call, handoff, approval, or guardrail check, and record timing, status, token use, and safe metadata. Observability supplies this evidence; evaluation applies success, quality, and safety criteria to it.",
          "p50 latency is the median: half of runs are faster and half slower. p95 is a tail measure: 95% of runs are at or below it, while the slowest 5% take longer. Agents often have a much worse p95 because retries and extra tool steps accumulate.",
        ],
      },
      {
        title: "Budgets must change runtime behavior",
        paragraphs: [
          "Track time, tokens, money, model calls, tool calls, and steps after every operation. When a budget is nearly exhausted, switch from exploration to synthesis where appropriate. At exhaustion, stop, return a traceable partial result or abstain, and request approval before spending more—never continue silently.",
        ],
      },
    ],
    tables: [
      {
        title: "Production metrics for agent systems",
        headers: ["Metric", "What it reveals"],
        rows: [
          ["Task success", "Whether the user goal was completed"],
          ["p50 / p95 latency", "Typical speed and slow-tail experience"],
          ["Cost per successful task", "Total spending tied to useful outcomes"],
          ["Tool error rate", "Integration reliability"],
          ["Retries", "Transient failures or weak tool contracts"],
          ["Timeouts", "Operations exceeding bounded time"],
          ["Human overrides", "Where automation needs correction"],
          ["Safety events", "Policy blocks, attempted violations and incidents"],
        ],
      },
      {
        title: "Release controls",
        headers: ["Control", "Purpose", "Trigger to proceed or stop"],
        rows: [
          ["Offline gate", "Block known regressions before production", "Required quality/safety/budget thresholds pass"],
          ["Shadow", "Replay live-like traffic without affecting users", "Trace metrics match expectations"],
          ["Canary", "Expose a small real traffic share", "Expand only while SLOs and safety hold"],
          ["Rollback", "Restore the previous known version", "Trigger on predefined regression or incident"],
        ],
      },
    ],
    workedExample: {
      title: "Latency and cost accumulate across a run",
      setup: "One sequential trace contains three model calls and two tools. The measured values belong to these five spans.",
      steps: [
        "Latency = model 0.9 s + tool 0.4 s + model 1.1 s + tool 0.7 s + model 1.0 s = 4.1 s total.",
        "Cost = $0.006 + $0.002 + $0.007 + $0.001 + $0.006 = $0.022 total.",
        "Every additional sequential model or tool span adds to end-to-end latency; retries add another copy of the relevant span cost.",
      ],
      result: "Cost per successful task is more useful than cost per call because it includes the complete multi-step run and accounts for failed or retried runs that produced no useful outcome.",
    },
  },
};
