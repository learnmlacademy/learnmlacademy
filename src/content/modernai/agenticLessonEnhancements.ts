export type AgenticVisualId = "agent-loop" | "autonomy-continuum" | "tool-trust-boundary" | "tool-call-lifecycle" | "context-trust-zones" | "context-budget-32k" | "memory-lifecycle" | "memory-managed-lifecycle" | "planning-react-reflection" | "observable-react-trajectory" | "agent-state-graph" | "orchestration-patterns" | "durable-human-timeline" | "checkpoint-revalidate-resume" | "rag-vs-agentic-rag" | "corrective-retrieval-loop" | "bounded-agent-architecture" | "multi-agent-topologies" | "delegation-lifecycle" | "mcp-architecture" | "mcp-invocation-sequence" | "framework-decision-flow" | "framework-control-models" | "observe-act-verify" | "sandbox-boundary" | "prompt-injection-boundary" | "recovery-decision-tree" | "evaluation-trajectory" | "trace-waterfall" | "latency-cost-chart";

export type AgenticEnhancement = {
  lessonNumber: number;
  title: string;
  action: string;
  targetedInstruction: string;
  visuals: AgenticVisualId[];
  codeLabel: string;
  codeNote: string;
  quantitativeExample?: string;
  summary: string[];
};

// Exact lesson summaries, visual mapping, and code classifications from the final specification.
export const agenticLessonEnhancements: Record<string, AgenticEnhancement> = {
  "agentic-ai-intro": {
    "lessonNumber": 1,
    "title": "What Is Agentic AI? Agents, Workflows & Types",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Keep current merged explanation. Add a compact distinction among reflex/model-based/goal/utility/learning/LLM agents only as examples on an autonomy spectrum; do not turn this into a memorization-heavy taxonomy.",
    "visuals": [
      "agent-loop",
      "autonomy-continuum"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Python-like pseudocode. The model/tool/state helper names are conceptual application components, not a standalone runnable library.",
    "summary": [
      "An agent is a bounded system in which a model helps decide what to do next while working toward a goal.",
      "Ordinary code is best when rules are deterministic; workflows are best when branches are known; agents are useful when the next step depends on open-ended context.",
      "A practical agent loop is goal → decide → act through permitted tools → observe → update state → continue or stop.",
      "Agent types such as reflex, stateful, goal-based, utility-based, learning, and LLM-powered agents describe different decision machinery, not a ladder where more autonomy is always better.",
      "Tools, context, memory, state, instructions, budgets, and guardrails are supporting parts of an agent system; none of them alone makes a system an agent.",
      "Autonomy adds latency, cost, and failure paths, so the design should use the least autonomy that solves the problem.",
      "A good agent has explicit success conditions and stop conditions so it can finish, abstain, or return control to a person."
    ]
  },
  "tool-calling": {
    "lessonNumber": 2,
    "title": "Tool Calling & Reliable Tool Design",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Preserve the merged schema/authorization/idempotency material. Add a short explanation that structurally valid arguments are not the same as authorized actions, and that tool results should be compact enough not to flood context.",
    "visuals": [
      "tool-trust-boundary",
      "tool-call-lifecycle"
    ],
    "codeLabel": "Illustrative API fragment",
    "codeNote": "Illustrative application-side tool schema and execution boundary. Helper functions such as authorize() and run_with_timeout() represent application code.",
    "summary": [
      "A tool call is a model proposal for a named capability and structured arguments; it is not the execution itself.",
      "Trusted application code must validate schema, identity, authorization, ranges, and policy before executing a tool.",
      "Read/data tools and action/write tools need different risk controls because write tools can create external side effects.",
      "Clear, narrow tool names, descriptions, and schemas improve tool selection and reduce ambiguous behavior.",
      "Tool results should be structured and compact so the next model step receives the useful observation without unnecessary context.",
      "Retries are safe only when the failure type and side-effect semantics allow them; idempotency prevents duplicate consequential actions.",
      "Least privilege, predictable errors, bounded retries, approvals, and auditability make tool use reliable in production."
    ]
  },
  "agent-context-engineering": {
    "lessonNumber": 3,
    "title": "Context Engineering for Agents",
    "action": "PRESERVE + EXPAND WITH WORKED BUDGET",
    "targetedInstruction": "Add explicit distinction: context is the working packet for the next decision; memory is persisted information that may be retrieved into context later. Teach relevance, trust, recency, and token budget as four selection axes.",
    "visuals": [
      "context-trust-zones",
      "context-budget-32k"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual context-assembly pseudocode. Retrieval and model calls are placeholders for application components.",
    "quantitativeExample": "32,000-token context. Reserve 4,000 output tokens; instructions/tool schemas 3,500; current state 1,500; retrieved evidence 15,000; history 6,000. Used input = 26,000, total committed = 30,000, only 2,000 remain. A new 4,000-token tool result cannot simply be appended; the learner must compress/drop lower-priority context.",
    "summary": [
      "Context engineering decides what the model receives for its next decision; it is not the same as durable memory.",
      "A useful context packet may include trusted instructions, the current task, working state, selected tool definitions, retrieved evidence, relevant memories, and recent history.",
      "Context should be selected by relevance, trust level, recency, and token budget rather than by simply including everything available.",
      "Untrusted retrieved text and tool output should be clearly separated from trusted instructions so data cannot silently become authority.",
      "Long histories should be compressed while preserving confirmed facts, constraints, decisions, citations, and open commitments.",
      "Output space and future tool results need reserved capacity; a context window can be full even when more evidence is still required.",
      "A larger context window does not guarantee better decisions—noise, stale evidence, and conflicting instructions can reduce reliability."
    ]
  },
  "agent-memory": {
    "lessonNumber": 4,
    "title": "Memory in AI Agents: Short-Term, Long-Term & Persistence",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Keep the current privacy/write-policy material. Add conflict/staleness handling and source provenance. Avoid reteaching vector database mechanics from LLM.",
    "visuals": [
      "memory-lifecycle",
      "memory-managed-lifecycle"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual memory read/write example. search_memories() and agent.run() are application placeholders.",
    "summary": [
      "Agent memory is information deliberately persisted for later use; context is the working information supplied for the current decision.",
      "Short-term/session memory supports the current interaction, while durable memories can preserve approved facts, preferences, or experiences across sessions.",
      "Useful memory types include episodic experiences, semantic facts/preferences, and procedural guidance, but each needs different retention and retrieval rules.",
      "A write policy decides what is worth storing; a recall policy decides what should be retrieved for the current goal.",
      "Memories can become stale or conflicting, so important records need provenance, update/version rules, and deletion paths.",
      "More memory is not automatically better because irrelevant or outdated memories can distract the model.",
      "Memory systems must respect privacy, authorization, retention, and user-visible correction or deletion requirements."
    ]
  },
  "planning-reflection": {
    "lessonNumber": 5,
    "title": "Planning, ReAct & Reflection",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Keep the current chain-of-thought caution. Emphasize observable decisions, actions, evidence, and verifier results rather than hidden reasoning. Add explicit no-progress and max-step stopping rules.",
    "visuals": [
      "planning-react-reflection",
      "observable-react-trajectory"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual planning/verification loop. planner, verifier, and execute_validated are application abstractions.",
    "summary": [
      "Planning decomposes work, ReAct adapts one action at a time using observations, and reflection checks whether the current result should be revised.",
      "Plan-first approaches fit tasks with known dependencies; stepwise action is useful when the environment changes as the agent works.",
      "Observable actions, tool results, evidence, and verifier outputs are what a production system should evaluate—not hidden chain-of-thought.",
      "New observations can justify replanning; a good plan is not a rigid script.",
      "Reflection is useful when success criteria can be checked, but unlimited self-review loops can waste tokens and reinforce weak behavior.",
      "Stop rules should include success, no measurable progress, step/time/cost limits, and cases that require human help.",
      "More reasoning steps are not automatically better; the value of extra planning or reflection must be measured."
    ]
  },
  "agent-state-graphs": {
    "lessonNumber": 6,
    "title": "Agent Workflows, State Machines & Graphs",
    "action": "MODERATE EXPANSION",
    "targetedInstruction": "Expand the current compact page with typed state, deterministic nodes vs model-directed nodes, bounded loops, parallel branches, and why explicit graphs improve testability. Persistence stays in Lesson 7.",
    "visuals": [
      "agent-state-graph",
      "orchestration-patterns"
    ],
    "codeLabel": "Illustrative framework fragment — external dependency/setup required",
    "codeNote": "Illustrative graph-building fragment. It requires a graph framework and surrounding state/node definitions; it is not standalone Python.",
    "summary": [
      "A state graph makes execution explicit using state, nodes, edges, conditional routes, loops, parallel branches, and end states.",
      "Deterministic nodes and model-directed nodes can coexist, allowing flexible decisions inside controlled orchestration.",
      "Typed state makes it clear what information exists and which node may update it.",
      "Conditional routing should be bounded and testable; loops need explicit exit conditions.",
      "Orchestrator-worker is useful for dynamically decomposed parallel work, while evaluator-optimizer is useful for bounded revision against clear criteria.",
      "Graphs improve inspectability because developers can test transitions and failure paths instead of hiding the whole workflow in one prompt.",
      "Persistence and resume behavior build on the graph/state model but belong to the durable-execution layer."
    ]
  },
  "durable-long-running-agents": {
    "lessonNumber": 7,
    "title": "Durable & Long-Running Agents with Human-in-the-Loop",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Preserve checkpoint/idempotency/HITL merge. Add distinction between waiting and holding a request open, plus expiry/cancellation and revalidation before resuming consequential actions.",
    "visuals": [
      "durable-human-timeline",
      "checkpoint-revalidate-resume"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual checkpoint/approval pseudocode. Storage, queue, and authorization helpers represent application infrastructure.",
    "summary": [
      "Durable agents persist task progress so work can survive process restarts, long waits, and external events.",
      "Checkpoints should capture typed state and receipts for completed side effects so resume does not repeat finished actions.",
      "Waiting should be event-driven rather than keeping a request or model call alive indefinitely.",
      "Human-in-the-loop checkpoints belong before high-risk, irreversible, low-confidence, or policy-sensitive actions.",
      "A reviewer needs evidence, proposed consequences, authority, and meaningful approve/reject/edit choices—not a decorative approval button.",
      "After a pause, the system should revalidate authorization and current conditions before continuing.",
      "Timeouts, expiry, cancellation, idempotency, and audit events are part of durable execution, not optional operational details."
    ]
  },
  "agentic-rag": {
    "lessonNumber": 8,
    "title": "Agentic RAG",
    "action": "SUBSTANTIVE EXPANSION",
    "targetedInstruction": "This page is currently too thin. Add retrieval decision, query transformation, source choice, evidence sufficiency, conflicting evidence, bounded retries, authority/provenance, and when Agentic RAG is not worth the latency/cost. Do not reteach embeddings/vector DB fundamentals.",
    "visuals": [
      "rag-vs-agentic-rag",
      "corrective-retrieval-loop"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual adaptive-retrieval loop. retrieve(), grade, rewrite_query(), and grounded_answer() represent application components.",
    "quantitativeExample": "Worked latency trade-off: baseline RAG = 1 retrieval (0.25 s) + generation (1.10 s) = 1.35 s. Agentic RAG with two retrieval rounds = planning 0.35 s + 2×0.25 s retrieval + grading 0.30 s + generation 1.10 s = 2.25 s. Interpret: extra retrieval must buy measurable answer quality because it adds latency.",
    "summary": [
      "Baseline RAG usually retrieves once; Agentic RAG lets the system decide whether, when, where, and how to retrieve.",
      "An Agentic RAG loop can rewrite queries, change sources, grade evidence, and retrieve again when the first attempt is weak.",
      "Evidence sufficiency and authority should be checked before generation, not assumed because retrieval returned documents.",
      "Conflicting authoritative sources may require abstention or escalation rather than another blind retrieval loop.",
      "Every additional retrieval and grading step adds latency, cost, and exposure to irrelevant or malicious content.",
      "Retrieval attempts, source permissions, query rewrites, and tool authority should therefore be bounded.",
      "Agentic RAG is justified when adaptive retrieval measurably improves difficult questions; simple RAG remains preferable for straightforward cases."
    ]
  },
  "building-ai-agent": {
    "lessonNumber": 9,
    "title": "Build a Simple AI Agent End-to-End",
    "action": "SUBSTANTIVE EXPANSION — FLAGSHIP SYNTHESIS LESSON",
    "targetedInstruction": "Turn this into the path’s synthesis lesson. Walk through goal → instructions → tool schema → state → loop → observation → stop condition → validation → trace → one failure case. Prefer a small transparent agent over framework magic.",
    "visuals": [
      "bounded-agent-architecture"
    ],
    "codeLabel": "Runnable Python — no external dependency required",
    "codeNote": "Make this example genuinely runnable with only the Python standard library by mocking a tiny documentation search tool and a deterministic decision loop. The point is to expose the mechanics, not depend on a framework.",
    "quantitativeExample": "Use a five-step maximum in the runnable example. Show one sample trace that succeeds in 3 steps and one that reaches the 5-step limit and abstains. Explain why the limit is a safety/cost control, not a target.",
    "summary": [
      "A useful first agent should solve one narrow job with a clear success condition rather than trying to be a general autonomous assistant.",
      "The minimum architecture is goal/instructions + model decision + small tool set + validation + state + bounded loop + stop condition.",
      "Read-only tools are the safest place to begin because they let you measure agent quality before granting consequential permissions.",
      "Every tool result becomes an observation that updates state and informs the next decision.",
      "Step limits, abstention, and human escalation are normal successful outcomes when the agent cannot verify a result.",
      "Tracing the full run makes debugging possible because you can inspect decisions, tools, observations, and stop reasons.",
      "Frameworks are optional—the core agent mechanism can be learned and tested with a small transparent Python loop."
    ]
  },
  "multi-agent-systems": {
    "lessonNumber": 10,
    "title": "Multi-Agent Systems, Handoffs & Agent Communication",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Keep the current delegation-contract material. Clarify the difference between asking another agent as a tool and transferring control through a handoff. Emphasize one owner for final synthesis unless a deliberate handoff transfers ownership.",
    "visuals": [
      "multi-agent-topologies",
      "delegation-lifecycle"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual delegation example. Task, delegate(), and fact_checker are application abstractions.",
    "summary": [
      "Multi-agent systems are useful when work benefits from genuine specialization, parallelism, or separate tool/permission boundaries.",
      "A manager-worker topology keeps synthesis centralized; agents-as-tools nests specialists under one controller; handoffs transfer control to another agent.",
      "Delegation should use explicit contracts containing scope, inputs, expected output, permissions, budget, deadline, and success criteria.",
      "Only necessary context and evidence should cross agent boundaries; transferring entire histories increases noise and cost.",
      "Ownership of task state and the final answer must remain clear, especially after handoffs.",
      "Duplicate work, conflicting conclusions, coordination failures, and repeated context can make multi-agent systems worse than one capable agent.",
      "Use multiple agents only when evaluation shows that the added coordination complexity produces measurable value."
    ]
  },
  "model-context-protocol": {
    "lessonNumber": 11,
    "title": "Model Context Protocol (MCP) & Agent Interoperability",
    "action": "MODERATE EXPANSION + VERSION-CONSCIOUS WORDING",
    "targetedInstruction": "Keep client/server mental model. Add explicit distinction between protocol and the underlying service. Mention tools/resources/prompts as protocol capabilities only where supported by the current spec. Explain authentication/authorization/consent/versioning without implying MCP itself grants trust.",
    "visuals": [
      "mcp-architecture",
      "mcp-invocation-sequence"
    ],
    "codeLabel": "Illustrative framework/API fragment — external dependency/setup required",
    "codeNote": "Illustrative MCP server tool fragment. Exact imports and APIs depend on the MCP SDK/version; the conceptual client/server/trust model is the lesson’s stable part.",
    "summary": [
      "MCP standardizes how compatible AI hosts and clients discover and invoke capabilities exposed by MCP servers.",
      "An MCP server can expose protocol capabilities such as tools, resources, and prompts, while the underlying API or data source remains a separate system.",
      "MCP improves interoperability by reducing one-off integration work between hosts and compatible servers.",
      "Protocol compatibility is not the same as trust: authentication, authorization, consent, validation, and credentials still matter.",
      "Clients should request only the scopes and capabilities needed for the task, following least-privilege principles.",
      "Versioning and compatibility must be managed because protocol and SDK details evolve.",
      "MCP complements tool calling; it does not replace the application’s responsibility for safe execution and governance."
    ]
  },
  "agent-frameworks": {
    "lessonNumber": 12,
    "title": "Agent Frameworks: LangGraph, CrewAI & AutoGen",
    "action": "SUBSTANTIVE EXPANSION",
    "targetedInstruction": "This page needs the biggest targeted upgrade. Explain LangGraph around explicit state/graphs/persistence, CrewAI around agents/crews/flows, and AutoGen around AgentChat/Core/event-driven multi-agent applications. Avoid marketing claims and brittle API details; compare concepts and use cases.",
    "visuals": [
      "framework-decision-flow",
      "framework-control-models"
    ],
    "codeLabel": "Illustrative interface fragment",
    "codeNote": "Framework-neutral interface sketch showing how to keep business tools portable. It is illustrative rather than a complete framework program.",
    "summary": [
      "Agent frameworks provide reusable orchestration/runtime capabilities, but they do not replace good task design, tools, security, or evaluation.",
      "Plain code is often best for small deterministic or lightly agentic systems because it minimizes abstraction and lock-in.",
      "LangGraph is especially useful when explicit state, graph control, persistence, and human-interrupt/resume behavior are central requirements.",
      "CrewAI emphasizes agents, crews, and flows for role-oriented collaboration plus structured workflow control.",
      "AutoGen provides AgentChat and Core abstractions for conversational and event-driven single/multi-agent applications.",
      "Framework choice should be based on the control model, durability, coordination, observability, ecosystem, and deployment needs—not popularity.",
      "Keep business tools and domain logic behind your own interfaces where possible so framework changes do not rewrite the whole application."
    ]
  },
  "browser-computer-use-agents": {
    "lessonNumber": 13,
    "title": "Browser, Computer-Use & Code-Executing Agents",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Keep the current observe-act-verify and sandboxing material. Add why API-first is preferable, why screenshots/coordinates can go stale, and why confirmation is needed before irreversible actions.",
    "visuals": [
      "observe-act-verify",
      "sandbox-boundary"
    ],
    "codeLabel": "Illustrative API fragment",
    "codeNote": "Illustrative browser/sandbox API. Exact browser selectors and sandbox APIs depend on the chosen runtime.",
    "summary": [
      "Direct typed APIs are usually more reliable than browser or GUI automation and should be preferred when available.",
      "Browser/computer-use agents operate through changing interfaces, so they should follow an observe → act → re-observe → verify loop.",
      "Screenshots, coordinates, DOM references, and page state can become stale after navigation or layout changes.",
      "Generated code should be treated as untrusted and run inside a sandbox with explicit filesystem, network, process, secret, time, and compute limits.",
      "A container alone is not automatically a complete security boundary; permissions and exposed resources must still be configured.",
      "Deterministic post-action checks should confirm that the intended state change actually occurred.",
      "Purchases, submissions, deletion, messages, or moving sandbox output into important systems should require appropriate confirmation."
    ]
  },
  "agent-security": {
    "lessonNumber": 14,
    "title": "Agent Security, Guardrails & Failure Recovery",
    "action": "PRESERVE + TARGETED ENRICHMENT",
    "targetedInstruction": "Preserve the strong current security/recovery merge. Add layered guardrails and clearly separate model-level instructions from deterministic authorization/security controls.",
    "visuals": [
      "prompt-injection-boundary",
      "recovery-decision-tree"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual security/recovery boundary. Validation, authorization, retry, and sandbox helpers represent deterministic application controls.",
    "summary": [
      "Agent security starts from the assumption that user input, retrieved pages, documents, tool output, and generated code may be hostile.",
      "Prompt injection becomes dangerous when untrusted content can influence authority, permissions, or consequential tool use.",
      "Least privilege, scoped credentials, allowlists, schema checks, and deterministic authorization should sit outside the probabilistic model.",
      "Guardrails can operate at input, tool-input, tool-output, and final-output boundaries, with human approval for high-impact actions.",
      "Recovery logic must detect no-progress loops, repeated actions, partial completion, conflicting evidence, timeouts, and tool errors.",
      "Retry only transient operations that are safe to repeat; otherwise use compensation, fallback, escalation, or a safe stop.",
      "Production incidents should become new security tests and regression cases so the system improves from real failures."
    ]
  },
  "agent-evaluation-safety": {
    "lessonNumber": 15,
    "title": "Evaluating Agents: Task Success, Safety, Trajectories & Benchmarks",
    "action": "PRESERVE + EXPAND WITH WORKED METRICS",
    "targetedInstruction": "Keep current trajectory-first philosophy. Add offline scenario suites, production failures as regression cases, benchmark/task mismatch, and calibrated use of model judges rather than treating one aggregate score as enough.",
    "visuals": [
      "evaluation-trajectory"
    ],
    "codeLabel": "Conceptual pseudocode",
    "codeNote": "Conceptual evaluator code. task_success(), recovery_score(), and trace helpers are application-specific evaluator functions.",
    "quantitativeExample": "Worked scenario suite: 20 cases; 17 task-success = 85%. But 2 of the 20 contain policy violations, so safe-success is only 15/20 = 75%. Show why headline task success can hide unacceptable trajectories.",
    "summary": [
      "Agent evaluation must score both the final outcome and the trajectory used to reach it.",
      "Useful trajectory metrics include tool selection, argument correctness, unnecessary actions, recovery, policy compliance, latency, cost, and stopping behavior.",
      "Deterministic evaluators are best for clear rules, human review is valuable for nuanced high-risk judgments, and model judges need calibrated rubrics and validation.",
      "A high task-success average can hide unsafe trajectories, unauthorized actions, or rare critical failures.",
      "Evaluation sets should contain realistic tasks, edge cases, adversarial inputs, expected actions, and explicit success conditions.",
      "Public benchmarks are useful signals but may be contaminated or mismatched to the application’s real environment.",
      "Production failures should be converted into regression cases and rerun before future releases."
    ]
  },
  "agent-observability-deployment": {
    "lessonNumber": 16,
    "title": "Agent Observability, Cost, Latency & Deployment",
    "action": "PRESERVE + EXPAND WITH QUANTITATIVE OPERATIONS",
    "targetedInstruction": "Preserve current tracing/budget/release material. Add a concrete trace anatomy, p50 vs p95 interpretation, budget exhaustion behavior, and the distinction between observability and evaluation.",
    "visuals": [
      "trace-waterfall",
      "latency-cost-chart"
    ],
    "codeLabel": "Illustrative API fragment",
    "codeNote": "Illustrative tracing/budget API. Exact tracing, span, token, and cost interfaces depend on the runtime/provider.",
    "quantitativeExample": "Worked sequential run: model 0.9 s + tool 0.4 s + model 1.1 s + tool 0.7 s + model 1.0 s = 4.1 s total. Cost example: $0.006 + $0.002 + $0.007 + $0.001 + $0.006 = $0.022. Explain why multi-step loops amplify both latency and cost and why cost per successful task is more meaningful than cost per call.",
    "summary": [
      "Agent observability records the execution trajectory so operators can inspect model turns, tools, handoffs, guardrails, retries, approvals, latency, tokens, cost, and outcomes.",
      "Traces group one task while spans describe individual model/tool/agent operations, making bottlenecks and failures easier to locate.",
      "Multi-step agents accumulate latency and cost across every model and tool step, so budgets must be tracked throughout the run.",
      "Operational metrics should include task success, p50/p95 latency, cost per successful task, tool errors, retries, timeouts, human overrides, and safety events.",
      "Privacy-aware logging requires redaction, access controls, and retention limits rather than storing every raw prompt and tool result.",
      "New versions should pass offline gates and then use controlled release patterns such as shadowing or canaries with rollback plans.",
      "An agent is not production-ready unless operators can trace, budget, measure, stop, replay, canary, and roll back its behavior."
    ]
  },
};
