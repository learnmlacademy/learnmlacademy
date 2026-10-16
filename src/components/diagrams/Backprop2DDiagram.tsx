import React from "react";

export function Backprop2DDiagram() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            2D Computation Graph: Forward Activations vs. Backward Chain-Rule Gradients
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Forward values compute the prediction and loss; backward partial derivatives compute each parameter’s exact responsibility.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-indigo-700">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 inline-block" />
            Forward Pass (→)
          </span>
          <span className="flex items-center gap-1.5 text-rose-700">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-600 inline-block" />
            Backward Gradients (←)
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 720 320"
        className="w-full h-auto bg-slate-50/70 rounded-xl"
        role="img"
        aria-label="2D Backpropagation Computation Graph showing forward operations and backward chain rule partial derivatives"
      >
        <defs>
          <marker id="bp-arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#4f46e5" />
          </marker>
          <marker id="bp-arrow-rose" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#e11d48" />
          </marker>
        </defs>

        {/* FORWARD PASS (TOP ROW) */}
        {/* Node: x=2, w=0.5 */}
        <g transform="translate(20, 30)">
          <rect width="130" height="60" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="65" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">Inputs &amp; Weights</text>
          <text x="65" y="44" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#92400e">x = 2, w = 0.5</text>
        </g>
        <line x1="150" y1="60" x2="195" y2="60" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#bp-arrow-indigo)" />

        {/* Node: z = w*x = 1.0 */}
        <g transform="translate(200, 30)">
          <rect width="130" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="65" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#312e81">Linear Product</text>
          <text x="65" y="44" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#4338ca">z = w·x = 1.0</text>
        </g>
        <line x1="330" y1="60" x2="375" y2="60" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#bp-arrow-indigo)" />

        {/* Node: y_hat = z + b = 2.0 */}
        <g transform="translate(380, 30)">
          <rect width="140" height="60" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="70" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">Prediction (b=1)</text>
          <text x="70" y="44" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#1d4ed8">ŷ = z + b = 2.0</text>
        </g>
        <line x1="520" y1="60" x2="565" y2="60" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#bp-arrow-indigo)" />

        {/* Node: Loss (y=4) */}
        <g transform="translate(570, 30)">
          <rect width="130" height="60" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
          <text x="65" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9f1239">Loss (Target y=4)</text>
          <text x="65" y="44" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#be123c">L = ½(ŷ−y)² = 2.0</text>
        </g>

        {/* Connecting Downward Arrow: Loss -> Initial Gradient */}
        <line x1="635" y1="90" x2="635" y2="180" stroke="#e11d48" strokeWidth="3" markerEnd="url(#bp-arrow-rose)" />
        <text x="645" y="140" fontSize="10" fontWeight="bold" fill="#e11d48">∂L/∂L = 1</text>

        {/* BACKWARD PASS (BOTTOM ROW) */}
        {/* Node: Output Gradient dL/dy_hat */}
        <g transform="translate(550, 190)">
          <rect width="150" height="68" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
          <text x="75" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9f1239">1. Output Gradient</text>
          <text x="75" y="42" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#be123c">∂L/∂ŷ = ŷ − y</text>
          <text x="75" y="58" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#9f1239">= 2 − 4 = −2.0</text>
        </g>
        <line x1="550" y1="224" x2="510" y2="224" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#bp-arrow-rose)" />

        {/* Node: Intermediate Gradient dL/dz */}
        <g transform="translate(360, 190)">
          <rect width="145" height="68" rx="8" fill="#fdf4ff" stroke="#c026d3" strokeWidth="2" />
          <text x="72" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#701a75">2. Chain Rule at (+)</text>
          <text x="72" y="42" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="#86198f">∂L/∂z = (∂L/∂ŷ)·(∂ŷ/∂z)</text>
          <text x="72" y="58" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#701a75">= −2.0 × 1 = −2.0</text>
        </g>
        <line x1="360" y1="224" x2="320" y2="224" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#bp-arrow-rose)" />

        {/* Node: Weight Gradient dL/dw */}
        <g transform="translate(170, 190)">
          <rect width="145" height="68" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
          <text x="72" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">3. Weight Gradient</text>
          <text x="72" y="42" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fill="#047857">∂L/∂w = (∂L/∂z)·x</text>
          <text x="72" y="58" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#064e3b">= −2.0 × 2 = −4.0</text>
        </g>
        <line x1="170" y1="224" x2="135" y2="224" stroke="#059669" strokeWidth="2.5" markerEnd="url(#bp-arrow-rose)" />

        {/* Node: Parameter Update */}
        <g transform="translate(15, 190)">
          <rect width="115" height="68" rx="8" fill="#059669" />
          <text x="57" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">4. SGD Update</text>
          <text x="57" y="42" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#d1fae5">w ← w − η·(∂L/∂w)</text>
          <text x="57" y="58" textAnchor="middle" fontSize="10.5" fontFamily="monospace" fontWeight="bold" fill="#ffffff">0.5 − 0.1(−4) = 0.9</text>
        </g>
      </svg>

      <figcaption className="mt-3 text-center text-xs leading-relaxed text-slate-600">
        Notice how backpropagation never recomputes values from scratch: each step reuses the forward activation (x=2) and the downstream gradient (-2) using local multiplication.
      </figcaption>
    </figure>
  );
}
