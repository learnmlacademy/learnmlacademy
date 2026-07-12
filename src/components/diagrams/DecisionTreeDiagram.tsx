import React from 'react';

export function DecisionTreeDiagram() {
  return (
    <figure className="my-10 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — Example Decision Tree (Predicting if someone plays tennis)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 overflow-x-auto shadow-inner relative">
        {/* Background grid */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
        
        <svg viewBox="0 0 600 350" className="w-full max-w-2xl mx-auto block relative z-10" aria-label="Decision Tree Diagram">
          <defs>
             <linearGradient id="rootGrad" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="#818cf8" />
               <stop offset="100%" stopColor="#4f46e5" />
             </linearGradient>
             <linearGradient id="leafYes" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="#34d399" />
               <stop offset="100%" stopColor="#059669" />
             </linearGradient>
             <linearGradient id="leafNo" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="#f87171" />
               <stop offset="100%" stopColor="#dc2626" />
             </linearGradient>
             <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
               <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
             </filter>
          </defs>

          {/* Edges */}
          <path d="M 300 50 L 150 150" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
          <path d="M 300 50 L 450 150" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
          
          <path d="M 150 190 L 80 280" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
          <path d="M 150 190 L 220 280" stroke="#94a3b8" strokeWidth="2.5" fill="none" />

          {/* Root Node */}
          <rect x="230" y="20" width="140" height="40" rx="8" fill="url(#rootGrad)" filter="url(#shadow)" />
          <text x="300" y="45" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">Outlook = Sunny?</text>

          {/* Edge Labels */}
          <rect x="200" y="80" width="36" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <text x="218" y="94" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="11">Yes</text>
          
          <rect x="364" y="80" width="30" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <text x="379" y="94" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="11">No</text>

          <rect x="95" y="215" width="36" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <text x="113" y="229" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="11">Yes</text>
          
          <rect x="170" y="215" width="30" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" />
          <text x="185" y="229" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="11">No</text>

          {/* Level 1 Nodes */}
          <rect x="80" y="150" width="140" height="40" rx="8" fill="url(#rootGrad)" filter="url(#shadow)" />
          <text x="150" y="175" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">Humidity &gt; 70%?</text>

          <rect x="380" y="150" width="140" height="40" rx="8" fill="url(#leafYes)" filter="url(#shadow)" />
          <text x="450" y="175" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">Play = Yes</text>

          {/* Level 2 Leaves */}
          <rect x="30" y="280" width="100" height="40" rx="8" fill="url(#leafNo)" filter="url(#shadow)" />
          <text x="80" y="305" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">Play = No</text>

          <rect x="170" y="280" width="100" height="40" rx="8" fill="url(#leafYes)" filter="url(#shadow)" />
          <text x="220" y="305" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">Play = Yes</text>

        </svg>
      </div>
    </figure>
  );
}
