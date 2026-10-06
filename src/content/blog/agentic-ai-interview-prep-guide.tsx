import React from 'react';
import { Link } from 'react-router-dom';

export function AgenticAIInterviewPrepContent() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Agents, Tools & Control Flow',
      items: [
        'Explain the difference between a simple LLM call, a fixed workflow and an agent that decides what action to take next.',
        'Know tool calling end to end: tool schema, argument generation, execution, result handling and error recovery.',
        'Understand ReAct-style reasoning, planning and reflection as patterns rather than magic capabilities.',
        'Be able to explain state machines and graph-based workflows and why explicit control flow improves reliability.',
        'Know when an agent is unnecessary and a deterministic workflow is the better engineering choice.',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Memory, Context & RAG',
      items: [
        'Differentiate conversation context, short-term working memory and durable long-term memory.',
        'Know how retrieval can supply task-specific knowledge without placing every document in the prompt.',
        'Understand context engineering: choosing instructions, tool outputs, retrieved evidence and prior state for the next model call.',
        'Explain agentic RAG and when an agent should decide whether, where and how to retrieve.',
        'Discuss memory risks such as stale facts, accidental persistence and cross-user data leakage.',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Multi-Agent Systems, MCP & Frameworks',
      items: [
        'Explain when multiple agents are useful and when they only add latency and complexity.',
        'Know handoffs, supervisor-worker patterns, specialist agents and shared-state coordination.',
        'Understand MCP as a protocol for exposing tools and context to AI applications, not as an autonomous agent by itself.',
        'Be ready to compare frameworks such as LangGraph, CrewAI and AutoGen at the level of orchestration concepts.',
        'Focus on architecture and reliability rather than memorising framework-specific syntax.',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Safety, Evaluation & Production',
      items: [
        'Discuss prompt injection, tool misuse, excessive permissions and unsafe actions before talking about autonomy.',
        'Know where human approval should be placed for high-impact or irreversible actions.',
        'Evaluate task success, tool-call correctness, trajectory quality, latency, cost and safety together.',
        'Explain durable execution, retries, checkpoints and recovery for long-running agents.',
        'Prepare one agent architecture and be ready to justify every tool, memory store, control boundary and failure fallback.',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-xl text-slate-600 leading-relaxed">
        Agentic AI interviews are increasingly about engineering judgement. Strong candidates can explain when to use agents, how to control them, how to evaluate them and how to keep tool-using systems safe.
      </p>

      {phases.map((phase) => (
        <section key={phase.phase} className="border-l-4 border-amber-500 bg-white rounded-r-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">{phase.phase}</span>
            <h2 className="font-bold text-slate-900 text-xl">{phase.title}</h2>
          </div>
          <ul className="space-y-2">
            {phase.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Practise with the Agentic AI interview lesson</h3>
        <p className="text-slate-600 text-sm mb-4">
          Continue with focused interview questions covering agents, tools, memory, MCP, multi-agent systems, evaluation and safety.
        </p>
        <Link to="/learn/agentic-ai-interview" className="inline-flex items-center rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700">
          Agentic AI Interview Questions →
        </Link>
      </div>
    </div>
  );
}
