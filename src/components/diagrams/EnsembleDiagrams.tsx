/**
 * EnsembleDiagrams.tsx
 * Original SVG diagrams for ensemble learning pages.
 * 100% hand-crafted originals — copyright-safe for AdSense and monetisation.
 */
import React from 'react';

/* ─────────────────────────────────────────
   BAGGING: Bootstrap sampling + aggregation
────────────────────────────────────────── */
export function BaggingDiagram() {
  const W = 580, H = 260;
  const samples = [
    { label: 'Sample 1', rows: ['R1','R3','R3','R5','R2'], x: 90 },
    { label: 'Sample 2', rows: ['R4','R1','R2','R4','R3'], x: 220 },
    { label: 'Sample 3', rows: ['R5','R2','R1','R5','R4'], x: 350 },
    { label: 'Sample 4', rows: ['R2','R4','R3','R1','R2'], x: 480 },
  ];
  const vb = "0 0 " + W + " " + (H + 40);
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — Bagging: Bootstrap Sampling with Replacement → Parallel Training → Aggregation
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={vb} className="w-full max-w-2xl mx-auto block"
          aria-label="Bagging diagram showing original dataset split into 4 bootstrap samples each training a separate model then results combined by majority vote">
          <defs>
            <marker id="bagArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#94a3b8" />
            </marker>
          </defs>
          {/* Original dataset */}
          <rect x={W/2-70} y="8" width="140" height="32" rx="8" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.5"/>
          <text x={W/2} y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4338ca">Original Dataset (N rows)</text>

          {samples.map((s) => {
            const boxH = s.rows.length * 16 + 12;
            return (
              <g key={s.label}>
                <line x1={W/2} y1="40" x2={s.x} y2="70" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#bagArr)"/>
                <rect x={s.x-44} y="72" width="88" height={boxH} rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2"/>
                <text x={s.x} y="86" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4338ca">{s.label}</text>
                {s.rows.map((r, ri) => (
                  <text key={ri} x={s.x} y={99 + ri * 16} textAnchor="middle" fontSize="8.5" fill="#4338ca">{r}</text>
                ))}
                <rect x={s.x-36} y={72 + boxH + 20} width="72" height="24" rx="6"
                  fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1.2"/>
                <text x={s.x} y={72 + boxH + 36} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#6d28d9">
                  Model {samples.indexOf(s) + 1}
                </text>
                <line x1={s.x} y1={72 + boxH + 12} x2={s.x} y2={72 + boxH + 20}
                  stroke="#94a3b8" strokeWidth="1" markerEnd="url(#bagArr)"/>
                <line x1={s.x} y1={72 + boxH + 44} x2={W/2} y2={H + 10}
                  stroke="#10b981" strokeWidth="1" markerEnd="url(#bagArr)"/>
              </g>
            );
          })}

          {/* Aggregation */}
          <rect x={W/2-75} y={H+12} width="150" height="28" rx="8"
            fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
          <text x={W/2} y={H+30} textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">
            Aggregation (Majority Vote / Average)
          </text>
          <text x={W/2} y={H+50} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Each model votes independently — reduces variance, combats overfitting
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────
   BOOSTING: Sequential correction chain
────────────────────────────────────────── */
export function BoostingChainDiagram() {
  const W = 600, H = 180;
  const steps = [
    { label: 'Weak Learner 1', error: 'High error', focus: 'All equal weights', col: '#ef4444', x: 55 },
    { label: 'Weak Learner 2', error: 'Fixes L1 errors', focus: 'Weight↑ on errors', col: '#f59e0b', x: 185 },
    { label: 'Weak Learner 3', error: 'Fixes L2 errors', focus: 'Weight↑ on errors', col: '#10b981', x: 315 },
    { label: 'Strong Combined', error: 'Low error ✓', focus: 'Weighted vote', col: '#6366f1', x: 495 },
  ];
  const vb = "0 0 " + W + " " + (H + 30);
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — Boosting: Sequential Weak Learners, Each Correcting Previous Mistakes
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={vb} className="w-full max-w-2xl mx-auto block"
          aria-label="Boosting chain: three sequential weak learners each focusing on misclassified examples, combined into a strong learner">
          <defs>
            <marker id="bstArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#94a3b8"/>
            </marker>
          </defs>
          {steps.map((s, i) => (
            <g key={i}>
              <rect x={s.x-50} y="18" width="100" height="56" rx="10"
                fill={s.col} fillOpacity="0.12" stroke={s.col} strokeWidth="1.5"/>
              <text x={s.x} y="38" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1e293b">{s.label}</text>
              <text x={s.x} y="54" textAnchor="middle" fontSize="8" fill={s.col} fontWeight="600">{s.error}</text>
              <text x={s.x} y="90" textAnchor="middle" fontSize="7.5" fill="#64748b">{s.focus}</text>
              {[0,1,2].map(di => (
                <circle key={di} cx={s.x - 16 + di * 16} cy="108"
                  r="5" fill={di === 0 && i < 3 ? "#ef4444" : "#10b981"} fillOpacity="0.8"/>
              ))}
              {i < 2 && (
                <g>
                  <line x1={s.x+52} y1="46" x2={steps[i+1].x-52} y2="46"
                    stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#bstArr)"/>
                  <text x={(s.x + steps[i+1].x)/2} y="40" textAnchor="middle"
                    fontSize="7.5" fill="#94a3b8">Re-weight↑</text>
                </g>
              )}
              {i === 2 && (
                <g>
                  <line x1={s.x+52} y1="46" x2={steps[3].x-52} y2="46"
                    stroke="#6366f1" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#bstArr)"/>
                  <text x={(s.x + steps[3].x)/2} y="40" textAnchor="middle"
                    fontSize="7.5" fill="#6366f1" fontWeight="600">Combine</text>
                </g>
              )}
            </g>
          ))}
          <text x={W/2} y={H+22} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Each learner trained on a weighted dataset — misclassified samples receive higher weight next round
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────
   ADABOOST: Weight update visual
────────────────────────────────────────── */
export function AdaBoostWeightDiagram() {
  const W = 580, H = 200;
  const vb = "0 0 " + W + " " + (H + 20);
  const rounds = ['Round 1', 'Round 2', 'Round 3'];
  type SampleDot = { x: number; y: number; r: number; correct: boolean };
  const roundSamples: SampleDot[][] = [
    [
      { x: 70,  y: 60,  r: 8, correct: true  },
      { x: 110, y: 90,  r: 8, correct: true  },
      { x: 85,  y: 130, r: 8, correct: false },
      { x: 130, y: 60,  r: 8, correct: true  },
      { x: 150, y: 120, r: 8, correct: true  },
    ],
    [
      { x: 70,  y: 60,  r: 10, correct: true  },
      { x: 110, y: 90,  r: 8,  correct: true  },
      { x: 85,  y: 130, r: 18, correct: false },
      { x: 130, y: 60,  r: 10, correct: true  },
      { x: 150, y: 120, r: 8,  correct: true  },
    ],
    [
      { x: 70,  y: 60,  r: 11, correct: true  },
      { x: 110, y: 90,  r: 8,  correct: true  },
      { x: 85,  y: 130, r: 20, correct: false },
      { x: 130, y: 60,  r: 11, correct: true  },
      { x: 150, y: 120, r: 8,  correct: true  },
    ],
  ];
  const offsets = [0, 193, 386];
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — AdaBoost: Sample Weights Increase for Misclassified Points Each Round
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={vb} className="w-full max-w-2xl mx-auto block"
          aria-label="AdaBoost weight update: three rounds where misclassified sample circles grow larger each round">
          {rounds.map((lbl, ri) => {
            const ox = offsets[ri];
            const weightLabel = ri === 0 ? 'Equal weights' : ri === 1 ? '✗ sample weight↑' : '✗ sample weight↑↑';
            const labelColor = ri === 0 ? '#94a3b8' : ri === 1 ? '#f59e0b' : '#ef4444';
            return (
              <g key={ri}>
                <rect x={ox + 5} y="8" width="180" height="170" rx="10"
                  fill="white" stroke="#e2e8f0" strokeWidth="1.2"/>
                <text x={ox + 95} y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">{lbl}</text>
                {roundSamples[ri].map((s, si) => (
                  <g key={si}>
                    <circle cx={ox + s.x} cy={s.y} r={s.r}
                      fill={s.correct ? "#10b981" : "#ef4444"} fillOpacity="0.85"
                      stroke={s.correct ? "#065f46" : "#b91c1c"} strokeWidth="1"/>
                    {!s.correct && (
                      <text x={ox + s.x} y={s.y + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="800">✗</text>
                    )}
                  </g>
                ))}
                <text x={ox + 95} y="168" textAnchor="middle" fontSize="8" fill={labelColor} fontWeight="600">
                  {weightLabel}
                </text>
              </g>
            );
          })}
          {[0, 1].map(i => (
            <g key={i}>
              <line x1={offsets[i] + 187} y1="95" x2={offsets[i+1] + 3} y2="95"
                stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#bagArr)"/>
              <text x={offsets[i] + 193} y="89" textAnchor="middle" fontSize="8" fill="#94a3b8">Re-weight</text>
            </g>
          ))}
          <text x={W/2} y={H+16} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Larger circle = higher sample weight · ✗ = misclassified in that round
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────
   GRADIENT BOOSTING: Residual fitting
────────────────────────────────────────── */
export function GradientBoostingResidualDiagram() {
  const W = 560, H = 180;
  const trees = [
    { x: 70,  pred: 'F₁ = 50', resid: 'Residual: r = 20', col: '#6366f1' },
    { x: 210, pred: 'F₂ ≈ 65', resid: 'Residual: r = 5',  col: '#8b5cf6' },
    { x: 350, pred: 'F₃ ≈ 69', resid: 'Residual: r = 1',  col: '#06b6d4' },
    { x: 490, pred: 'F₄ ≈ 70 ✓', resid: null,              col: '#10b981' },
  ];
  const barWidths = [0.3, 0.57, 0.83, 1.0];
  const barColors = ['#ef4444', '#f59e0b', '#10b981', '#10b981'];
  const vb = "0 0 " + W + " " + (H + 30);
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — Gradient Boosting: Each Tree Fits the Residual Error of the Previous
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={vb} className="w-full max-w-2xl mx-auto block"
          aria-label="Gradient boosting: four sequential trees each predicting the residual error, progressively approaching the true value of 70">
          <defs>
            <marker id="gbArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#94a3b8"/>
            </marker>
          </defs>
          <text x={W/2} y="14" textAnchor="middle" fontSize="9" fill="#94a3b8" fontStyle="italic">
            True value = 70 · Prediction starts at 50 and corrects toward 70 each iteration
          </text>
          {trees.map((t, i) => (
            <g key={i}>
              <polygon points={(t.x) + ",38 " + (t.x-28) + ",82 " + (t.x+28) + ",82"}
                fill={t.col} fillOpacity="0.15" stroke={t.col} strokeWidth="1.5"/>
              <rect x={t.x-9} y="82" width="18" height="16" fill="#92400e" fillOpacity="0.2"/>
              <text x={t.x} y="58" textAnchor="middle" fontSize="8.5" fill={t.col} fontWeight="700">Tree {i+1}</text>
              <rect x={t.x-38} y="104" width="76" height="22" rx="6"
                fill={t.col} fillOpacity="0.12" stroke={t.col} strokeWidth="1.2"/>
              <text x={t.x} y="119" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b">{t.pred}</text>
              {t.resid && (
                <text x={t.x} y="145" textAnchor="middle" fontSize="8.5" fill="#ef4444" fontWeight="600">{t.resid}</text>
              )}
              {i < trees.length - 1 && (
                <line x1={t.x+40} y1="115" x2={trees[i+1].x-40} y2="115"
                  stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#gbArr)"/>
              )}
            </g>
          ))}
          {/* progress bar */}
          <rect x="50" y="160" width={W-100} height="8" rx="4" fill="#e2e8f0"/>
          {barWidths.map((bw, i) => (
            <rect key={i} x="50" y="160" width={(W-100)*bw} height="8" rx="4" fill={barColors[i]} fillOpacity="0.7"/>
          ))}
          <text x="50" y="183" fontSize="8.5" fill="#ef4444" fontWeight="600">50</text>
          <text x={W-50} y="183" textAnchor="end" fontSize="8.5" fill="#10b981" fontWeight="700">70 ✓</text>
          <text x={W/2} y={H+24} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            η (learning rate) controls how much each tree correction contributes to the final prediction
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────
   XGBOOST: Key innovations grid
────────────────────────────────────────── */
export function XGBoostArchitectureDiagram() {
  const features = [
    { label: 'L1 + L2 Regularisation', icon: '⚖️', desc: 'Penalises tree complexity' },
    { label: 'Parallel Tree Building', icon: '⚡', desc: 'Column block structure' },
    { label: 'Cache-Aware Computing', icon: '💾', desc: 'Hardware optimised' },
    { label: 'Handling Missing Data', icon: '🔍', desc: 'Sparsity-aware split' },
    { label: 'Early Stopping', icon: '🛑', desc: 'Stops when val. plateaus' },
    { label: 'Built-in CV', icon: '🔄', desc: 'xgb.cv() integrated' },
  ];
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — XGBoost Key Engineering Innovations Over Vanilla Gradient Boosting
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="text-center mb-5">
          <span className="bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow inline-block">
            XGBoost = Gradient Boosting + Engineering Optimisations
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map(f => (
            <div key={f.label} className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 items-start shadow-sm">
              <span className="text-xl flex-shrink-0">{f.icon}</span>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight mb-0.5">{f.label}</p>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center">
          <p className="text-xs text-indigo-800 font-semibold">
            Result: 10–100× faster than sklearn GradientBoostingClassifier · Winner of 100s of Kaggle competitions
          </p>
        </div>
      </div>
    </figure>
  );
}
