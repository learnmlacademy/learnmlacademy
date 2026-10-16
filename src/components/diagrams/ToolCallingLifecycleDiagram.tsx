import React, { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "User Refund Request",
    subtitle: "Customer prompt arrives at the agent application",
    input: "“Please refund $48 for my order O-204.”",
    action: "Application receives raw user message, verifies authentication token (user_id: U-17), and injects available tool definitions into model context.",
    output: "Model prompt assembled with tools: [issue_refund, check_order_status]",
    badge: "Input Stage",
  },
  {
    step: 2,
    title: "Model Proposes JSON Call",
    subtitle: "LLM chooses the tool and generates arguments",
    input: "Prompt + tool definitions",
    action: "Model generates tool invocation request: function name 'issue_refund' with structured JSON arguments.",
    output: '{"name": "issue_refund", "arguments": {"order_id": "O-204", "amount": 48}}',
    badge: "Model Proposal",
  },
  {
    step: 3,
    title: "Schema Validation Gate",
    subtitle: "Strict deterministic JSON Schema check",
    input: "Raw arguments JSON",
    action: "Pydantic / Zod validator checks parameter types, required fields, and constraints (amount > 0 and amount <= 500).",
    output: "PASS: order_id is valid string format, amount is positive float within schema bounds.",
    badge: "Gate 1: Schema",
  },
  {
    step: 4,
    title: "Owner & Policy Gate",
    subtitle: "Identity ownership and business rules",
    input: "Validated arguments + session credentials (U-17)",
    action: "Database check verifies that order O-204 belongs to user U-17 and refundable balance is >= $48. Policy verifies $48 is within the $100 automated refund limit.",
    output: "PASS: Ownership confirmed. Refundable balance = $120. Policy rule satisfied.",
    badge: "Gate 2: Policy",
  },
  {
    step: 5,
    title: "Execution with Idempotency Key",
    subtitle: "Payment service executes write once",
    input: "Idempotency key: 'refund:O-204:48'",
    action: "Payment gateway processes the transaction using atomic database lock with idempotency key refund:O-204:48. Prevents duplicate charges on retry.",
    output: "Database write succeeds. Transaction status: 'settled'. Unique receipt generated.",
    badge: "Execution",
  },
  {
    step: 6,
    title: "Receipt R-731 & Compact Observation",
    subtitle: "Result returned to model context safely",
    input: "Payment transaction record",
    action: "Application filters internal database secrets and returns only necessary observation fields to the LLM context.",
    output: '{"status": "completed", "receipt": "R-731", "amount": 48, "currency": "USD"}',
    badge: "Final Receipt",
  },
];

export function ToolCallingLifecycleDiagram() {
  const [activeStep, setActiveStep] = useState(1);
  const current = steps[activeStep - 1];

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Tool-Call Lifecycle: Proposal, Validation Gates, Execution & Idempotency
            </h3>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
            Receipt R-731 Trace
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          The model proposes structured arguments. Trusted application code strictly validates schema, ownership, policy, and idempotency before executing.
        </p>
      </div>

      {/* 2D SVG Architecture Diagram */}
      <div className="p-4 sm:p-6 bg-white border-b border-slate-100">
        <svg
          viewBox="0 0 760 350"
          className="w-full h-auto rounded-xl bg-slate-50/70"
          role="img"
          aria-label="2D Tool Calling Architecture Diagram showing proposal, schema gate, policy gate, execution with idempotency, and retry loop"
        >
          <defs>
            <marker id="tc-arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#4f46e5" />
            </marker>
            <marker id="tc-arrow-emerald" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#059669" />
            </marker>
            <marker id="tc-arrow-amber" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#d97706" />
            </marker>
            <marker id="tc-arrow-rose" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="#e11d48" />
            </marker>
          </defs>

          {/* Node 1: User Request */}
          <g transform="translate(15, 60)">
            <rect width="115" height="60" rx="8" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
            <text x="57" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">1. User Request</text>
            <text x="57" y="42" textAnchor="middle" fontSize="9.5" fill="#475569">“Refund $48 O-204”</text>
          </g>
          <line x1="130" y1="90" x2="160" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#tc-arrow-indigo)" />

          {/* Node 2: Model Proposal */}
          <g transform="translate(165, 52)">
            <rect width="130" height="76" rx="8" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
            <text x="65" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#312e81">2. Model Proposal</text>
            <text x="65" y="38" textAnchor="middle" fontSize="9" fill="#4338ca">issue_refund({'{'}</text>
            <text x="65" y="52" textAnchor="middle" fontSize="9" fill="#4338ca">order: 'O-204', $48</text>
            <text x="65" y="66" textAnchor="middle" fontSize="9" fill="#4338ca">{'}'})</text>
          </g>
          <line x1="295" y1="90" x2="330" y2="90" stroke="#6366f1" strokeWidth="2" markerEnd="url(#tc-arrow-indigo)" />

          {/* Gate 1: Schema Check */}
          <g transform="translate(370, 90)">
            <polygon points="0,-36 38,0 0,36 -38,0" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="0" y="-4" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#78350f">Schema</text>
            <text x="0" y="8" textAnchor="middle" fontSize="9" fill="#92400e">Gate</text>
          </g>

          {/* Gate 1 FAIL Branch */}
          <line x1="370" y1="126" x2="370" y2="180" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#tc-arrow-rose)" />
          <text x="375" y="155" fontSize="8.5" fontWeight="bold" fill="#e11d48">INVALID</text>
          <g transform="translate(315, 185)">
            <rect width="110" height="38" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
            <text x="55" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9f1239">400 Bad Request</text>
            <text x="55" y="30" textAnchor="middle" fontSize="8" fill="#e11d48">Reprompt Model</text>
          </g>

          {/* Path Gate 1 -> Gate 2 */}
          <line x1="408" y1="90" x2="445" y2="90" stroke="#059669" strokeWidth="2" markerEnd="url(#tc-arrow-emerald)" />
          <text x="426" y="82" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#059669">PASS</text>

          {/* Gate 2: Policy & Ownership Check */}
          <g transform="translate(485, 90)">
            <polygon points="0,-36 38,0 0,36 -38,0" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="0" y="-4" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">Policy</text>
            <text x="0" y="8" textAnchor="middle" fontSize="8.5" fill="#92400e">Owner &amp; $</text>
          </g>

          {/* Gate 2 FAIL Branch */}
          <line x1="485" y1="126" x2="485" y2="180" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#tc-arrow-rose)" />
          <text x="490" y="155" fontSize="8.5" fontWeight="bold" fill="#e11d48">UNAUTH</text>
          <g transform="translate(435, 185)">
            <rect width="115" height="38" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
            <text x="57" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9f1239">403 Forbidden</text>
            <text x="57" y="30" textAnchor="middle" fontSize="8" fill="#e11d48">Abort Write</text>
          </g>

          {/* Path Gate 2 -> Node 3: Execution */}
          <line x1="523" y1="90" x2="560" y2="90" stroke="#059669" strokeWidth="2.5" markerEnd="url(#tc-arrow-emerald)" />
          <text x="541" y="82" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#059669">PASS</text>

          {/* Node 3: Execution with Idempotency Key */}
          <g transform="translate(565, 52)">
            <rect width="165" height="76" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
            <text x="82" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">3. Execution Engine</text>
            <text x="82" y="38" textAnchor="middle" fontSize="9" fill="#047857">Key: refund:O-204:48</text>
            <text x="82" y="52" textAnchor="middle" fontSize="9" fill="#047857">Atomic Write to DB</text>
            <text x="82" y="66" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#059669">Generates Receipt R-731</text>
          </g>

          {/* Arrow Node 3 -> Node 4: Receipt R-731 */}
          <line x1="647" y1="128" x2="647" y2="240" stroke="#059669" strokeWidth="2.5" markerEnd="url(#tc-arrow-emerald)" />

          {/* Node 4: Final Observation */}
          <g transform="translate(565, 245)">
            <rect width="165" height="64" rx="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <text x="82" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#312e81">4. Observation (Receipt)</text>
            <text x="82" y="42" textAnchor="middle" fontSize="9" fill="#4338ca">{'{'}status: "completed",</text>
            <text x="82" y="55" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#312e81">receipt: 'R-731', amount: 48{'}'}</text>
          </g>

          {/* RETRY & IDEMPOTENCY LOOP (Curved Amber line) */}
          <path
            d="M 565,275 C 500,275 500,320 230,320 C 120,320 120,135 160,115"
            fill="none"
            stroke="#d97706"
            strokeWidth="2.5"
            strokeDasharray="5 3"
            markerEnd="url(#tc-arrow-amber)"
          />
          <g transform="translate(260, 305)">
            <rect width="210" height="28" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="105" y="18" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#78350f">
              Lost-Response Retry: Reuses Key refund:O-204:48
            </text>
          </g>
        </svg>
      </div>

      {/* Mobile-Friendly Interactive Step 1..6 Inspector */}
      <div className="p-4 sm:p-6 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Interactive Step 1..6 Trace Inspector (Mobile Friendly)
          </p>
          <span className="text-xs font-bold text-indigo-700">
            Step {activeStep} of 6
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4">
          {steps.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`rounded-lg py-2 px-1 text-center text-xs font-bold transition-all ${
                activeStep === s.step
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>

        {/* Card for Active Step */}
        <div className="rounded-xl border border-indigo-200 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-indigo-800">
                {current.badge}
              </span>
              <h4 className="mt-1 font-bold text-slate-900 text-sm sm:text-base">
                Step {current.step}: {current.title}
              </h4>
            </div>
            <p className="text-xs text-slate-500">{current.subtitle}</p>
          </div>

          <div className="mt-4 space-y-3 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-slate-700">Input Data:</span>
              <div className="mt-1 rounded-lg bg-slate-900 p-2.5 font-mono text-xs text-emerald-400 overflow-x-auto">
                {current.input}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700">Action Performed:</span>
              <p className="mt-1 text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {current.action}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-700">Resulting Output / State:</span>
              <div className="mt-1 rounded-lg bg-slate-900 p-2.5 font-mono text-xs text-sky-300 overflow-x-auto">
                {current.output}
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              ← Previous Step
            </button>

            <button
              type="button"
              disabled={activeStep === steps.length}
              onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              <span>Next Step</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
