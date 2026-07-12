import React from 'react';

export function LinearRegressionDiagram() {
  const points = [
    {x: 50, y: 250}, {x: 80, y: 230}, {x: 120, y: 200},
    {x: 150, y: 190}, {x: 190, y: 140}, {x: 230, y: 130},
    {x: 260, y: 90}, {x: 300, y: 110}, {x: 350, y: 60},
    {x: 380, y: 50}
  ];

  // Best fit line y = mx + c (approx)
  // p1: (30, 260), p2: (400, 30)

  return (
    <figure className="my-10 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — Ordinary Least Squares (OLS) Linear Regression
      </figcaption>
      <div className="bg-white border border-slate-200 rounded-xl p-8 overflow-x-auto shadow-sm relative">
        <svg viewBox="0 0 450 300" className="w-full max-w-lg mx-auto block relative z-10" aria-label="Linear Regression Diagram">
          <defs>
             <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
               <path d="M0,0 L0,6 L6,3 z" fill="#475569" />
             </marker>
          </defs>

          {/* Axes */}
          <line x1="30" y1="270" x2="420" y2="270" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="30" y1="270" x2="30" y2="20" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <text x="225" y="295" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">Independent Variable (X)</text>
          <text x="15" y="145" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" transform="rotate(-90 15 145)">Dependent Variable (Y)</text>

          {/* Data Points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="5" fill="#f43f5e" />
          ))}

          {/* Best Fit Line */}
          <line x1="30" y1="260" x2="400" y2="30" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 4" />

          {/* Error lines (Residuals) */}
          {points.map((p, i) => {
            // Find y on line for this x
            // line passes through (30, 260) and (400, 30)
            // slope = (30 - 260) / (400 - 30) = -230 / 370 = -0.621
            // y = -0.621 * (x - 30) + 260
            const yLine = -0.621 * (p.x - 30) + 260;
            return <line key={`err-${i}`} x1={p.x} y1={p.y} x2={p.x} y2={yLine} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          })}

          <text x="360" y="80" fill="#3b82f6" fontSize="14" fontWeight="bold">y = mx + c</text>
          <text x="240" y="200" fill="#f43f5e" fontSize="12" fontWeight="bold">Data Points</text>
          <line x1="220" y1="195" x2="195" y2="150" stroke="#f43f5e" strokeWidth="1" markerEnd="url(#arrow)" />
          
          <text x="150" y="70" fill="#64748b" fontSize="12" fontWeight="bold">Residual (Error)</text>
          <line x1="150" y1="75" x2="150" y2="185" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow)" />

        </svg>
      </div>
    </figure>
  );
}
