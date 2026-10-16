import React from "react";

export function TransformerBlockDiagram() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            2D Transformer Block Architecture: Dual Residual Shortcuts & Normalization
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            True 2D computational topology showing parallel residual gradients bypassing attention and FFN sublayers.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-indigo-700">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 inline-block" />
            Main Transformation Trunk
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
            Residual Shortcut (Add x)
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 680 400"
        className="w-full h-auto bg-slate-50/60 rounded-xl"
        role="img"
        aria-label="2D Transformer Block Diagram showing attention, feed-forward network, and dual residual bypass paths"
      >
        <defs>
          <marker id="tf-arrow-indigo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#4f46e5" />
          </marker>
          <marker id="tf-arrow-emerald" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#059669" />
          </marker>
        </defs>

        {/* Input Token Vectors */}
        <g transform="translate(180, 20)">
          <rect width="200" height="40" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="100" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#312e81">
            Input Tokens x [B, L, d_model]
          </text>
        </g>

        {/* Fork Point 1 */}
        <circle cx="280" cy="80" r="5" fill="#4f46e5" />
        <line x1="280" y1="60" x2="280" y2="95" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#tf-arrow-indigo)" />

        {/* RESIDUAL SHORTCUT 1 (Curved Emerald Path to Right) */}
        <path
          d="M 280,80 C 440,80 440,185 350,185"
          fill="none"
          stroke="#059669"
          strokeWidth="3"
          strokeDasharray="5 3"
          markerEnd="url(#tf-arrow-emerald)"
        />
        <text x="445" y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669" transform="rotate(90 445 135)">
          Residual Bypass 1 (+x)
        </text>

        {/* Sublayer 1: Multi-Head Attention */}
        <g transform="translate(160, 100)">
          <rect width="240" height="48" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4c1d95">
            Multi-Head Self-Attention
          </text>
          <text x="120" y="38" textAnchor="middle" fontSize="10" fill="#6d28d9">
            softmax(QK^T / √d_k) · V
          </text>
        </g>
        <line x1="280" y1="148" x2="280" y2="175" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#tf-arrow-indigo)" />

        {/* Addition Node 1 */}
        <circle cx="280" cy="185" r="14" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
        <text x="280" y="190" textAnchor="middle" fontSize="16" fontWeight="extrabold" fill="#4f46e5">+</text>

        {/* LayerNorm 1 */}
        <g transform="translate(190, 212)">
          <rect width="180" height="34" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="90" y="21" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
            LayerNorm (Stabilize)
          </text>
        </g>
        <line x1="280" y1="199" x2="280" y2="212" stroke="#4f46e5" strokeWidth="2" />

        {/* Fork Point 2 */}
        <circle cx="280" cy="260" r="5" fill="#4f46e5" />
        <line x1="280" y1="246" x2="280" y2="275" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#tf-arrow-indigo)" />

        {/* RESIDUAL SHORTCUT 2 (Curved Emerald Path to Left) */}
        <path
          d="M 280,260 C 120,260 120,345 210,345"
          fill="none"
          stroke="#059669"
          strokeWidth="3"
          strokeDasharray="5 3"
          markerEnd="url(#tf-arrow-emerald)"
        />
        <text x="115" y="305" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#059669" transform="rotate(-90 115 305)">
          Residual Bypass 2 (+x)
        </text>

        {/* Sublayer 2: Feed-Forward Network */}
        <g transform="translate(160, 280)">
          <rect width="240" height="44" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="120" y="21" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
            Feed-Forward Network (FFN)
          </text>
          <text x="120" y="35" textAnchor="middle" fontSize="10" fill="#1d4ed8">
            Linear(d → 4d) → GELU → Linear(4d → d)
          </text>
        </g>
        <line x1="280" y1="324" x2="280" y2="335" stroke="#4f46e5" strokeWidth="2" />

        {/* Addition Node 2 */}
        <circle cx="280" cy="345" r="14" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
        <text x="280" y="350" textAnchor="middle" fontSize="16" fontWeight="extrabold" fill="#4f46e5">+</text>

        {/* LayerNorm 2 & Output */}
        <g transform="translate(180, 368)">
          <rect width="200" height="28" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
          <text x="100" y="19" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
            LayerNorm → Block Output [B, L, d_model]
          </text>
        </g>
        <line x1="280" y1="359" x2="280" y2="368" stroke="#4f46e5" strokeWidth="2" />
      </svg>

      <figcaption className="mt-4 text-xs leading-relaxed text-slate-600">
        Each residual addition creates an unobstructed highway for error gradients (∂L/∂x = ∂L/∂sublayer + 1·∂L/∂x), solving the vanishing gradient problem in 100+ layer architectures.
      </figcaption>
    </figure>
  );
}
