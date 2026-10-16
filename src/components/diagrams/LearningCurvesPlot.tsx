import React from "react";

export function LearningCurvesPlot() {
  return (
    <div className="w-full">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-sky-400">
            <span className="h-3 w-3 rounded-full bg-sky-500 inline-block" />
            Training Score (~98.8%)
          </span>
          <span className="flex items-center gap-1.5 font-bold text-rose-400">
            <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
            Validation Score (~72.4%)
          </span>
        </div>
        <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[11px] font-bold text-rose-300 border border-rose-500/30">
          Severe Overfitting Gap: 26.4%
        </span>
      </div>

      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto rounded-lg bg-slate-900 border border-slate-800"
        aria-label="Training vs. Validation Score Curves showing Overfitting"
      >
        <defs>
          <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <line x1="60" y1="40" x2="560" y2="40" stroke="#334155" strokeDasharray="3 3" />
        <text x="50" y="44" fill="#94a3b8" fontSize="10" textAnchor="end">1.0</text>

        <line x1="60" y1="95" x2="560" y2="95" stroke="#334155" strokeDasharray="3 3" />
        <text x="50" y="99" fill="#94a3b8" fontSize="10" textAnchor="end">0.8</text>

        <line x1="60" y1="150" x2="560" y2="150" stroke="#334155" strokeDasharray="3 3" />
        <text x="50" y="154" fill="#94a3b8" fontSize="10" textAnchor="end">0.6</text>

        <line x1="60" y1="205" x2="560" y2="205" stroke="#334155" strokeDasharray="3 3" />
        <text x="50" y="209" fill="#94a3b8" fontSize="10" textAnchor="end">0.4</text>

        <line x1="60" y1="260" x2="560" y2="260" stroke="#475569" strokeWidth="1.5" />
        <line x1="60" y1="30" x2="60" y2="260" stroke="#475569" strokeWidth="1.5" />

        {/* X-axis labels */}
        <text x="60" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">50</text>
        <text x="160" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">150</text>
        <text x="260" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">250</text>
        <text x="360" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">350</text>
        <text x="460" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">450</text>
        <text x="550" y="278" fill="#94a3b8" fontSize="10" textAnchor="middle">500</text>
        <text x="310" y="295" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
          Training Examples (N)
        </text>

        {/* Y-axis label */}
        <text
          x="-150"
          y="20"
          transform="rotate(-90)"
          fill="#cbd5e1"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          Accuracy Score
        </text>

        {/* Shaded Area between Training and Validation */}
        <polygon
          points="
            60,45 115,46 170,47 225,48 280,48 335,49 390,49 445,50 500,50 550,51
            550,115 500,116 445,118 390,120 335,123 280,126 225,135 170,148 115,168 60,195
          "
          fill="url(#gapGradient)"
        />

        {/* Generalization Gap Label inside Shaded Area */}
        <rect x="235" y="70" width="160" height="24" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#f43f5e" strokeWidth="1" />
        <text x="315" y="86" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
          Generalization Gap (Overfitting)
        </text>

        {/* Training Score Curve (Blue) */}
        <path
          d="M 60,45 Q 280,48 550,51"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
        />

        {/* Validation Score Curve (Red/Rose) */}
        <path
          d="M 60,195 C 150,155 250,128 350,122 T 550,115"
          fill="none"
          stroke="#f43f5e"
          strokeWidth="3"
        />

        {/* Dots on Training Curve */}
        {[
          [60, 45], [115, 46], [170, 47], [225, 48], [280, 48],
          [335, 49], [390, 49], [445, 50], [500, 50], [550, 51]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        ))}

        {/* Dots on Validation Curve */}
        {[
          [60, 195], [115, 168], [170, 148], [225, 135], [280, 126],
          [335, 123], [390, 120], [445, 118], [500, 116], [550, 115]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
        ))}

        {/* Diagnostic callout badge */}
        <g transform="translate(410, 160)">
          <rect width="145" height="52" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <text x="8" y="18" fill="#f8fafc" fontSize="10" fontWeight="bold">Diagnosis:</text>
          <text x="8" y="32" fill="#fda4af" fontSize="9.5">Plateaued Val Score: ~72%</text>
          <text x="8" y="44" fill="#94a3b8" fontSize="9.5">More data alone won’t fix it.</text>
        </g>
      </svg>
    </div>
  );
}
