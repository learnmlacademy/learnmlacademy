import React from "react";

export function ModelToProductionArchitectureDiagram() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            End-to-End Model-to-Production Architecture with Quality Gates & Rollback Loop
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Production MLOps connects training lineage, candidate gates, canary deployments, and automated drift rollbacks.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
            Happy Promotion Path
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-500 inline-block rotate-45" />
            Quality &amp; Latency Gate
          </span>
          <span className="flex items-center gap-1.5 text-rose-700">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 inline-block" />
            Rollback Branch
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 760 360"
        className="w-full h-auto rounded-xl bg-slate-50/70"
        role="img"
        aria-label="2D Model to Production Architecture Diagram with CI/CD gates, canary serving, and drift rollback loop"
      >
        <defs>
          <marker id="m2p-arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#4f46e5" />
          </marker>
          <marker id="m2p-arrow-emerald" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#059669" />
          </marker>
          <marker id="m2p-arrow-amber" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#d97706" />
          </marker>
          <marker id="m2p-arrow-rose" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#e11d48" />
          </marker>
        </defs>

        {/* 1. Feature Store / Training Data */}
        <g transform="translate(15, 45)">
          <rect width="125" height="60" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="62" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">1. Feature Store</text>
          <text x="62" y="42" textAnchor="middle" fontSize="9.5" fill="#0c4a6e">Point-in-Time Data</text>
        </g>
        <line x1="140" y1="75" x2="175" y2="75" stroke="#0284c7" strokeWidth="2" markerEnd="url(#m2p-arrow-indigo)" />

        {/* 2. Automated Training Pipeline */}
        <g transform="translate(180, 45)">
          <rect width="135" height="60" rx="8" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
          <text x="67" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#312e81">2. Train Candidate</text>
          <text x="67" y="42" textAnchor="middle" fontSize="9.5" fill="#4338ca">Weights + Hyperparams</text>
        </g>
        <line x1="315" y1="75" x2="350" y2="75" stroke="#6366f1" strokeWidth="2" markerEnd="url(#m2p-arrow-indigo)" />

        {/* 3. Validation Gate: Accuracy, Recall, Latency */}
        <g transform="translate(395, 75)">
          <polygon points="0,-36 40,0 0,36 -40,0" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          <text x="0" y="-4" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#78350f">Model Gate</text>
          <text x="0" y="8" textAnchor="middle" fontSize="8.5" fill="#92400e">Recall ≥ .75</text>
        </g>

        {/* FAIL BRANCH from Gate */}
        <line x1="395" y1="111" x2="395" y2="165" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#m2p-arrow-rose)" />
        <text x="400" y="140" fontSize="8.5" fontWeight="bold" fill="#e11d48">REJECT</text>
        <g transform="translate(330, 170)">
          <rect width="130" height="38" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
          <text x="65" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9f1239">Candidate Rejected</text>
          <text x="65" y="30" textAnchor="middle" fontSize="8" fill="#e11d48">Retain v12 in Prod</text>
        </g>

        {/* PASS BRANCH from Gate -> 4. Model Registry */}
        <line x1="435" y1="75" x2="475" y2="75" stroke="#059669" strokeWidth="2.5" markerEnd="url(#m2p-arrow-emerald)" />
        <text x="455" y="67" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#059669">PASS</text>

        {/* 4. Model Registry */}
        <g transform="translate(480, 45)">
          <rect width="130" height="60" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
          <text x="65" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">4. Model Registry</text>
          <text x="65" y="42" textAnchor="middle" fontSize="9.5" fill="#047857">Approved: v13.bin</text>
        </g>
        <line x1="610" y1="75" x2="640" y2="75" stroke="#059669" strokeWidth="2" />
        <line x1="640" y1="75" x2="640" y2="170" stroke="#059669" strokeWidth="2.5" markerEnd="url(#m2p-arrow-emerald)" />

        {/* 5. Canary Deployment */}
        <g transform="translate(560, 175)">
          <rect width="160" height="60" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="80" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">5. Canary Release (10%)</text>
          <text x="80" y="42" textAnchor="middle" fontSize="9.5" fill="#92400e">Live Shadow &amp; Latency</text>
        </g>

        {/* Arrow Canary -> Full Production */}
        <line x1="640" y1="235" x2="640" y2="270" stroke="#059669" strokeWidth="2.5" markerEnd="url(#m2p-arrow-emerald)" />

        {/* 6. Production Serving API */}
        <g transform="translate(550, 275)">
          <rect width="180" height="64" rx="8" fill="#10b981" />
          <text x="90" y="24" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">6. Production Serving</text>
          <text x="90" y="40" textAnchor="middle" fontSize="9.5" fill="#d1fae5">FastAPI + Docker Container</text>
          <text x="90" y="54" textAnchor="middle" fontSize="9" fill="#d1fae5">100% Traffic Promoted</text>
        </g>

        {/* 7. Real-Time Drift & Telemetry Monitor */}
        <g transform="translate(180, 275)">
          <rect width="180" height="64" rx="8" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
          <text x="90" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#312e81">7. Real-Time Monitor</text>
          <text x="90" y="40" textAnchor="middle" fontSize="9.5" fill="#4338ca">KS-Test Drift &amp; PSI &gt; .15</text>
          <text x="90" y="54" textAnchor="middle" fontSize="9" fill="#6366f1">Latency &amp; Error Alarms</text>
        </g>
        <line x1="550" y1="307" x2="365" y2="307" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#m2p-arrow-indigo)" />
        <text x="455" y="300" textAnchor="middle" fontSize="8.5" fill="#4338ca">Predictions &amp; Logs</text>

        {/* AUTOMATED DRIFT ROLLBACK LOOP (Rose Curved Line from Monitor back to v12) */}
        <path
          d="M 180,307 C 70,307 70,185 325,185"
          fill="none"
          stroke="#e11d48"
          strokeWidth="2.5"
          strokeDasharray="5 3"
          markerEnd="url(#m2p-arrow-rose)"
        />
        <g transform="translate(60, 235)">
          <rect width="180" height="30" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="1" />
          <text x="90" y="19" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9f1239">
            Drift Alert → Instant Rollback to v12
          </text>
        </g>
      </svg>
    </div>
  );
}
