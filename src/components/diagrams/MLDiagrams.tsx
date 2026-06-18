/**
 * MLDiagrams.tsx
 * Original SVG diagrams hand-crafted for ML Academy.
 * All visuals are 100% original — no reproduction of external works.
 * Safe for Google AdSense, monetization, and copyright compliance.
 */
import React from 'react';

/* ─────────────────────────────────────────────
   1. ML WORKFLOW (How Machines Learn)
   Used in: WhatIsMLContent
───────────────────────────────────────────── */
export function MLWorkflowDiagram() {
  const steps = [
    { label: 'Raw Data', sub: 'CSVs · APIs · Sensors', color: '#6366f1', icon: '🗄️' },
    { label: 'Preprocessing', sub: 'Clean · Encode · Scale', color: '#8b5cf6', icon: '⚙️' },
    { label: 'Model Training', sub: 'Algorithm learns patterns', color: '#06b6d4', icon: '🧠' },
    { label: 'Evaluation', sub: 'Accuracy · F1 · ROC', color: '#10b981', icon: '📊' },
    { label: 'Prediction', sub: 'Output for new data', color: '#f59e0b', icon: '🎯' },
  ];
  const boxW = 108, boxH = 72, gap = 18, totalW = steps.length * boxW + (steps.length - 1) * gap + 60;
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 1 — The Standard Machine Learning Pipeline
      </figcaption>
      <div className="overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl p-5">
        <svg viewBox={`0 0 ${totalW} 120`} className="w-full max-w-2xl mx-auto block"
          aria-label="Machine Learning pipeline: Raw Data → Preprocessing → Model Training → Evaluation → Prediction">
          <defs>
            <marker id="wfArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
          </defs>
          {steps.map((s, i) => {
            const x = 30 + i * (boxW + gap);
            const cx = x + boxW / 2;
            return (
              <g key={s.label}>
                <rect x={x} y={16} width={boxW} height={boxH} rx="10"
                  fill={s.color} fillOpacity="0.1" stroke={s.color} strokeWidth="1.5" />
                <text x={cx} y={36} textAnchor="middle" fontSize="18" dominantBaseline="middle">{s.icon}</text>
                <text x={cx} y={56} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1e293b">{s.label}</text>
                <text x={cx} y={72} textAnchor="middle" fontSize="8.5" fill="#64748b">{s.sub}</text>
                <text x={cx} y={104} textAnchor="middle" fontSize="8" fill={s.color} fontWeight="600">Step {i + 1}</text>
                {i < steps.length - 1 && (
                  <line x1={x + boxW + 2} y1={52} x2={x + boxW + gap - 2} y2={52}
                    stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#wfArrow)" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   2. NEURAL NETWORK ARCHITECTURE
   Used in: NeuralNetworksContent
───────────────────────────────────────────── */
export function NeuralNetworkDiagram() {
  const layers = [
    { label: 'Input Layer', nodes: 3, color: '#6366f1', sub: 'Features (x₁, x₂, x₃)' },
    { label: 'Hidden Layer 1', nodes: 4, color: '#8b5cf6', sub: 'Detects low-level patterns' },
    { label: 'Hidden Layer 2', nodes: 4, color: '#06b6d4', sub: 'Abstracts higher features' },
    { label: 'Output Layer', nodes: 2, color: '#10b981', sub: 'Class probabilities' },
  ];
  const W = 560, H = 280;
  const layerX = layers.map((_, i) => 70 + i * (W - 140) / (layers.length - 1));
  const nodePositions = layers.map((l, li) => {
    const x = layerX[li];
    return Array.from({ length: l.nodes }, (_, ni) => ({
      x, y: H / 2 + (ni - (l.nodes - 1) / 2) * 54,
    }));
  });
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 2 — Artificial Neural Network Architecture
      </figcaption>
      <div className="overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl p-4">
        <svg viewBox={`0 0 ${W} ${H + 55}`} className="w-full max-w-xl mx-auto block"
          aria-label="Neural network with input layer (3 nodes), two hidden layers (4 nodes each) and output layer (2 nodes) with connecting weights">
          {layers.slice(0, -1).map((_, li) =>
            nodePositions[li].flatMap((from, fi) =>
              nodePositions[li + 1].map((to, ti) => (
                <line key={`e-${li}-${fi}-${ti}`}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="#cbd5e1" strokeWidth="0.8" opacity="0.6" />
              ))
            )
          )}
          {layers.map((layer, li) =>
            nodePositions[li].map((pos, ni) => (
              <g key={`n-${li}-${ni}`}>
                <circle cx={pos.x} cy={pos.y} r="17" fill={layer.color} fillOpacity="0.12" stroke={layer.color} strokeWidth="1.5" />
                <circle cx={pos.x} cy={pos.y} r="8" fill={layer.color} fillOpacity="0.9" />
              </g>
            ))
          )}
          {layers.map((layer, li) => (
            <g key={`lbl-${li}`}>
              <text x={layerX[li]} y={H + 15} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">{layer.label}</text>
              <text x={layerX[li]} y={H + 29} textAnchor="middle" fontSize="8.5" fill="#64748b">{layer.sub}</text>
            </g>
          ))}
          <text x={W / 2} y={H + 50} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Each connection carries a learned Weight · Each node applies an Activation Function (e.g., ReLU)
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   3. DECISION TREE (labelled hierarchy)
   Used in: DecisionTreesContent
───────────────────────────────────────────── */
export function DecisionTreeDiagram() {
  const W = 620, H = 290;
  type NodeType = 'question' | 'leaf';
  const nodes: { id: string; x: number; y: number; label: string; color: string; type: NodeType }[] = [
    { id: 'root', x: 310, y: 38,  label: 'Age > 30?',      color: '#6366f1', type: 'question' },
    { id: 'l1',   x: 155, y: 118, label: 'Income > 50k?', color: '#8b5cf6', type: 'question' },
    { id: 'r1',   x: 465, y: 118, label: 'Credit > 700?', color: '#8b5cf6', type: 'question' },
    { id: 'll',   x: 78,  y: 208, label: '✗ Reject',       color: '#ef4444', type: 'leaf' },
    { id: 'lr',   x: 232, y: 208, label: '✓ Approve',      color: '#10b981', type: 'leaf' },
    { id: 'rl',   x: 388, y: 208, label: '✗ Reject',       color: '#ef4444', type: 'leaf' },
    { id: 'rr',   x: 542, y: 208, label: '✓ Approve',      color: '#10b981', type: 'leaf' },
  ];
  const edges = [
    { from: 'root', to: 'l1', label: 'No (≤30)' },
    { from: 'root', to: 'r1', label: 'Yes (>30)' },
    { from: 'l1', to: 'll', label: 'No' },
    { from: 'l1', to: 'lr', label: 'Yes' },
    { from: 'r1', to: 'rl', label: 'No' },
    { from: 'r1', to: 'rr', label: 'Yes' },
  ];
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 3 — Decision Tree: Loan Approval (Root → Internal Nodes → Leaf Predictions)
      </figcaption>
      <div className="overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl p-4">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full max-w-2xl mx-auto block"
          aria-label="Decision tree for loan approval. Root asks Age greater than 30, splits into Income and Credit Score questions, leaves show Approve or Reject">
          {edges.map(e => {
            const f = nodeMap[e.from], t = nodeMap[e.to];
            const mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2;
            const side = t.x < f.x ? -1 : 1;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={f.x} y1={f.y + 17} x2={t.x} y2={t.y - 17} stroke="#94a3b8" strokeWidth="1.5" />
                <text x={mx + side * 10} y={my - 4} textAnchor="middle" fontSize="9" fill="#475569" fontWeight="600">{e.label}</text>
              </g>
            );
          })}
          {nodes.map(n => (
            <g key={n.id}>
              {n.type === 'question' ? (
                <rect x={n.x - 60} y={n.y - 16} width="120" height="33" rx="8"
                  fill={n.color} fillOpacity="0.12" stroke={n.color} strokeWidth="1.5" />
              ) : (
                <rect x={n.x - 45} y={n.y - 14} width="90" height="28" rx="14"
                  fill={n.color} fillOpacity="0.2" stroke={n.color} strokeWidth="1.5" />
              )}
              <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="700" fill="#1e293b">
                {n.label}
              </text>
              {n.type === 'question' && (
                <text x={n.x} y={n.y + 25} textAnchor="middle" fontSize="8" fill="#6b7280">Decision node</text>
              )}
            </g>
          ))}
          <text x={W / 2} y={H + 22} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Root Node splits on the most informative feature (highest Information Gain / lowest Gini Impurity)
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   4. GRADIENT DESCENT — parabolic loss + steps
   Used in: GradientDescentContent
───────────────────────────────────────────── */
export function GradientDescentDiagram() {
  const W = 500, H = 200;
  const yOf = (x: number) => H - 15 - 0.0018 * Math.pow(x - 250, 2);
  const pts = Array.from({ length: 101 }, (_, i) => ({ x: i * 5, y: yOf(i * 5) }));
  const curve = pts.map(p => `${p.x},${p.y.toFixed(1)}`).join(' ');
  const stepXs = [55, 115, 162, 200, 230, 250];
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 4 — Gradient Descent: Iterative Steps Toward Minimum Loss
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 45}`} className="w-full max-w-lg mx-auto block"
          aria-label="Parabolic loss curve showing gradient descent steps from high loss at left descending to minimum in centre">
          <defs>
            <marker id="gdArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#6366f1" />
            </marker>
          </defs>
          <polyline points={curve} fill="#6366f1" fillOpacity="0.06" stroke="none" />
          <polyline points={curve} fill="none" stroke="#6366f1" strokeWidth="2.5" opacity="0.4" />
          <line x1="28" y1={H - 10} x2={W - 10} y2={H - 10} stroke="#cbd5e1" strokeWidth="1" />
          <text x={W / 2} y={H + 8} textAnchor="middle" fontSize="10" fill="#94a3b8">Model Parameters (θ)</text>
          <text x="14" y={H / 2} textAnchor="middle" fontSize="10" fill="#94a3b8"
            transform={`rotate(-90,14,${H / 2})`}>Loss J(θ)</text>
          {stepXs.slice(0, -1).map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={yOf(x)} r="5.5" fill="#6366f1" opacity="0.9" />
              <line x1={x + 3} y1={yOf(x) - 2} x2={stepXs[i + 1] - 3} y2={yOf(stepXs[i + 1]) + 2}
                stroke="#6366f1" strokeWidth="1.6" markerEnd="url(#gdArrow)" />
              <text x={x} y={yOf(x) - 13} textAnchor="middle" fontSize="8" fill="#6366f1" fontWeight="600">
                η·∇{i + 1}
              </text>
            </g>
          ))}
          <circle cx={250} cy={yOf(250)} r="7.5" fill="#10b981" opacity="0.9" />
          <text x={250} y={yOf(250) - 15} textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="700">Global Minimum</text>
          <text x={55} y={yOf(55) - 15} textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="600">High Loss (Start)</text>
          <text x={W / 2} y={H + 36} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            η = learning rate · ∇ = gradient direction · Each arrow = one parameter update
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   5. BIAS-VARIANCE — target analogy
   Used in: BiasVarianceContent
───────────────────────────────────────────── */
export function BiasVarianceDiagram() {
  type Dot = { x: number; y: number };
  const scenarios: { title: string; subtitle: string; dots: Dot[]; color: string; bg: string }[] = [
    {
      title: 'High Bias (Underfitting)',
      subtitle: 'Consistently off-target',
      dots: [{ x: 60, y: 42 }, { x: 64, y: 56 }, { x: 54, y: 50 }, { x: 58, y: 47 }, { x: 62, y: 53 }],
      color: '#ef4444', bg: '#fef2f2',
    },
    {
      title: 'High Variance (Overfitting)',
      subtitle: 'Scattered, inconsistent',
      dots: [{ x: 20, y: 18 }, { x: 80, y: 15 }, { x: 72, y: 78 }, { x: 18, y: 72 }, { x: 55, y: 50 }],
      color: '#f59e0b', bg: '#fffbeb',
    },
    {
      title: 'Low Bias & Low Variance',
      subtitle: 'Ideal: accurate & consistent',
      dots: [{ x: 48, y: 50 }, { x: 52, y: 47 }, { x: 50, y: 53 }, { x: 47, y: 48 }, { x: 53, y: 52 }],
      color: '#10b981', bg: '#f0fdf4',
    },
  ];
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 5 — Bias-Variance Tradeoff: Target Analogy
      </figcaption>
      <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
        {scenarios.map(sc => (
          <div key={sc.title} className="flex flex-col items-center gap-2" style={{ background: sc.bg, borderRadius: 12, padding: 12 }}>
            <svg viewBox="0 0 100 100" className="w-20 h-20" aria-label={`Target diagram: ${sc.title}`}>
              {[46, 34, 22, 11].map((r, i) => (
                <circle key={r} cx="50" cy="50" r={r}
                  fill="none" stroke={['#e2e8f0', '#cbd5e1', '#94a3b8', '#475569'][i]} strokeWidth="1.2" />
              ))}
              <circle cx="50" cy="50" r="4" fill="#475569" opacity="0.5" />
              {sc.dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="4" fill={sc.color} opacity="0.85" />
              ))}
            </svg>
            <p className="text-xs font-bold text-center text-slate-800 leading-tight">{sc.title}</p>
            <p className="text-xs text-center text-slate-500 leading-tight">{sc.subtitle}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-slate-400 mt-2 italic">
        Each coloured dot represents a model prediction · Bullseye = true target value
      </p>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   6. RANDOM FOREST — trees → majority vote
   Used in: RandomForestContent
───────────────────────────────────────────── */
export function RandomForestDiagram() {
  const W = 580, H = 230;
  const trees = [
    { x: 70,  vote: '✓ Yes', col: '#10b981' },
    { x: 185, vote: '✓ Yes', col: '#10b981' },
    { x: 300, vote: '✗ No',  col: '#ef4444' },
    { x: 415, vote: '✓ Yes', col: '#10b981' },
    { x: 530, vote: '✓ Yes', col: '#10b981' },
  ];
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 6 — Random Forest: Multiple Trees → Majority Vote → Final Prediction
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full max-w-2xl mx-auto block"
          aria-label="Random forest: five decision trees each trained on bootstrap samples vote and the majority determines the final prediction">
          <defs>
            <marker id="rfArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#94a3b8" />
            </marker>
          </defs>
          {/* data box */}
          <rect x={W / 2 - 85} y="5" width="170" height="30" rx="8" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="1.5" />
          <text x={W / 2} y="24" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#4338ca">Bootstrap Training Samples</text>
          {trees.map((t, i) => (
            <g key={i}>
              <line x1={W / 2} y1="35" x2={t.x} y2="70" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#rfArr)" />
              {/* tree triangle */}
              <polygon points={`${t.x},52 ${t.x - 26},102 ${t.x + 26},102`} fill="#059669" fillOpacity="0.18" stroke="#059669" strokeWidth="1.2" />
              <rect x={t.x - 7} y="102" width="14" height="16" fill="#92400e" fillOpacity="0.28" />
              <text x={t.x} y="80" textAnchor="middle" fontSize="9" fill="#065f46" fontWeight="600">Tree {i + 1}</text>
              {/* vote badge */}
              <rect x={t.x - 27} y="126" width="54" height="22" rx="11" fill={t.col} fillOpacity="0.18" stroke={t.col} strokeWidth="1.2" />
              <text x={t.x} y="141" textAnchor="middle" fontSize="10" fill={t.col} fontWeight="700">{t.vote}</text>
              <line x1={t.x} y1="148" x2={W / 2} y2="186" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#rfArr)" />
            </g>
          ))}
          {/* final vote */}
          <rect x={W / 2 - 90} y="188" width="180" height="38" rx="10" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5" />
          <text x={W / 2} y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">Majority Vote</text>
          <text x={W / 2} y="219" textAnchor="middle" fontSize="10" fill="#065f46">✓ Yes wins (4 vs 1) → Final Prediction</text>
          <text x={W / 2} y={H + 22} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Each tree is trained on a random subset of data (bagging) and random subset of features
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   7. K-MEANS — 3-cluster scatter
   Used in: KMeansContent
───────────────────────────────────────────── */
export function KMeansStepsDiagram() {
  const clusters = [
    { cx: 110, cy: 95,  color: '#6366f1', pts: [{ x: 82, y: 75 }, { x: 102, y: 112 }, { x: 135, y: 88 }, { x: 95, y: 100 }, { x: 128, y: 115 }, { x: 90, y: 85 }] },
    { cx: 270, cy: 78,  color: '#10b981', pts: [{ x: 252, y: 58 }, { x: 292, y: 68 }, { x: 268, y: 96 }, { x: 286, y: 52 }, { x: 256, y: 88 }, { x: 280, y: 80 }] },
    { cx: 190, cy: 178, color: '#f59e0b', pts: [{ x: 162, y: 168 }, { x: 202, y: 192 }, { x: 188, y: 163 }, { x: 214, y: 182 }, { x: 172, y: 192 }, { x: 200, y: 172 }] },
  ];
  const W = 380, H = 250;
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 7 — K-Means Clustering: 3 Clusters with Centroids (✦)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full max-w-sm mx-auto block"
          aria-label="K-Means scatter plot showing three distinct clusters in purple, green, and amber with centroid markers">
          {clusters.map((cl, i) => (
            <g key={i}>
              <circle cx={cl.cx} cy={cl.cy} r="56" fill={cl.color} fillOpacity="0.08" stroke={cl.color} strokeWidth="1" strokeDasharray="4 3" />
              {cl.pts.map((p, j) => (
                <circle key={j} cx={p.x} cy={p.y} r="5.5" fill={cl.color} fillOpacity="0.8" />
              ))}
              <text x={cl.cx} y={cl.cy + 5} textAnchor="middle" fontSize="18" fill={cl.color}>✦</text>
              <text x={cl.cx} y={cl.cy + 24} textAnchor="middle" fontSize="9" fill={cl.color} fontWeight="700">Centroid {i + 1}</text>
            </g>
          ))}
          {/* legend */}
          {clusters.map((cl, i) => (
            <g key={`leg-${i}`}>
              <circle cx={20} cy={H - 30 + i * 14} r="5" fill={cl.color} opacity="0.8" />
              <text x={30} y={H - 25 + i * 14} fontSize="9" fill="#475569">Cluster {i + 1}</text>
            </g>
          ))}
          <text x={W / 2} y={H + 22} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Each iteration: assign points to nearest centroid, then recompute centroid positions
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   8. REINFORCEMENT LEARNING LOOP
   Used in: ReinforcementIntroContent
───────────────────────────────────────────── */
export function RLLoopDiagram() {
  const W = 500, H = 220;
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 8 — The Agent-Environment Interaction Loop in Reinforcement Learning
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 10}`} className="w-full max-w-lg mx-auto block"
          aria-label="Reinforcement learning loop: Agent sends Action to Environment, Environment returns new State and Reward back to Agent">
          <defs>
            <marker id="rlA1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L0,8 L8,4 z" fill="#6366f1" />
            </marker>
            <marker id="rlA2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L0,8 L8,4 z" fill="#10b981" />
            </marker>
          </defs>
          <rect x="28" y="78" width="130" height="64" rx="12" fill="#6366f1" fillOpacity="0.13" stroke="#6366f1" strokeWidth="1.5" />
          <text x="93" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4338ca">🤖 Agent</text>
          <text x="93" y="122" textAnchor="middle" fontSize="9" fill="#6366f1">Learns policy π(s)</text>
          <text x="93" y="134" textAnchor="middle" fontSize="8.5" fill="#94a3b8">Maximises cumulative reward</text>
          <rect x="342" y="78" width="130" height="64" rx="12" fill="#10b981" fillOpacity="0.13" stroke="#10b981" strokeWidth="1.5" />
          <text x="407" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065f46">🌍 Environment</text>
          <text x="407" y="122" textAnchor="middle" fontSize="9" fill="#10b981">Returns (s′, r)</text>
          <text x="407" y="134" textAnchor="middle" fontSize="8.5" fill="#94a3b8">Game · Simulator · World</text>
          {/* Action arc top */}
          <path d="M158,95 Q250,35 342,95" fill="none" stroke="#6366f1" strokeWidth="1.8" markerEnd="url(#rlA1)" />
          <text x="250" y="48" textAnchor="middle" fontSize="10.5" fill="#4338ca" fontWeight="600">Action (aₜ)</text>
          <text x="250" y="62" textAnchor="middle" fontSize="8.5" fill="#94a3b8">e.g. move left, place bid</text>
          {/* State + Reward arc bottom */}
          <path d="M342,145 Q250,205 158,145" fill="none" stroke="#10b981" strokeWidth="1.8" markerEnd="url(#rlA2)" />
          <text x="250" y="192" textAnchor="middle" fontSize="10.5" fill="#065f46" fontWeight="600">New State (sₜ₊₁) + Reward (rₜ)</text>
          <text x="250" y="206" textAnchor="middle" fontSize="8.5" fill="#94a3b8">Feedback signal that guides learning</text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   9. SIGMOID CURVE
   Used in: LogisticRegressionContent
───────────────────────────────────────────── */
export function SigmoidDiagram() {
  const W = 480, H = 200;
  const pts = Array.from({ length: 81 }, (_, i) => {
    const z = -8 + i * 0.2;
    const p = 1 / (1 + Math.exp(-z));
    return { x: 30 + (i / 80) * (W - 60), y: H - 20 - p * (H - 42) };
  });
  const path = 'M ' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ');
  const half = H - 20 - 0.5 * (H - 42);
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 9 — Sigmoid Function σ(z) = 1 / (1 + e⁻ᶻ)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 32}`} className="w-full max-w-lg mx-auto block"
          aria-label="Sigmoid S-curve mapping any real number z to a probability between 0 and 1, with 0.5 threshold marked">
          {[0, 0.25, 0.5, 0.75, 1.0].map(v => {
            const y = H - 20 - v * (H - 42);
            return <line key={v} x1="30" y1={y} x2={W - 30} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
          })}
          <line x1="30" y1={H - 20} x2={W - 30} y2={H - 20} stroke="#94a3b8" strokeWidth="1" />
          <line x1="30" y1="10" x2="30" y2={H - 20} stroke="#94a3b8" strokeWidth="1" />
          {/* shade area under 0.5 */}
          <rect x="30" y={half} width={(W - 60) * 0.5} height={H - 20 - half} fill="#ef4444" fillOpacity="0.05" />
          <rect x={30 + (W - 60) * 0.5} y="10" width={(W - 60) * 0.5} height={half - 10} fill="#10b981" fillOpacity="0.05" />
          <path d={path} fill="none" stroke="#6366f1" strokeWidth="2.5" />
          <line x1="30" y1={half} x2={W - 30} y2={half}
            stroke="#ef4444" strokeWidth="1.2" strokeDasharray="5 3" />
          <text x={W - 28} y={half - 6} textAnchor="end" fontSize="9" fill="#ef4444" fontWeight="600">Decision boundary (0.5)</text>
          {['0', '0.25', '0.5', '0.75', '1.0'].map((v, i) => {
            const y = H - 20 - (i / 4) * (H - 42);
            return <text key={v} x="24" y={y + 4} textAnchor="end" fontSize="8.5" fill="#64748b">{v}</text>;
          })}
          <text x={W / 2} y={H + 14} textAnchor="middle" fontSize="10" fill="#94a3b8">z = w·x + b</text>
          <text x="14" y={H / 2} textAnchor="middle" fontSize="10" fill="#94a3b8" transform={`rotate(-90,14,${H / 2})`}>
            σ(z) — Probability
          </text>
          <text x="80" y="42" fontSize="8.5" fill="#94a3b8" fontStyle="italic">→ Predict Class 0</text>
          <text x={W - 150} y={H - 50} fontSize="8.5" fill="#94a3b8" fontStyle="italic">→ Predict Class 1</text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   10. ML LIFECYCLE — circular 7-step flow
   Used in: MLLifecycleContent
───────────────────────────────────────────── */
export function MLLifecycleDiagram() {
  const steps = [
    { label: 'Problem Framing', icon: '💡', color: '#6366f1' },
    { label: 'Data Collection', icon: '🗄️', color: '#8b5cf6' },
    { label: 'Data Prep', icon: '⚙️', color: '#06b6d4' },
    { label: 'Model Training', icon: '🧠', color: '#10b981' },
    { label: 'Evaluation', icon: '📊', color: '#f59e0b' },
    { label: 'Deployment', icon: '🚀', color: '#ef4444' },
    { label: 'Monitoring', icon: '📡', color: '#ec4899' },
  ];
  const W = 420, H = 420, cx = 210, cy = 210, r = 148;
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 10 — The 7-Stage ML Lifecycle (Iterative & Continuous)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto block"
          aria-label="Circular ML lifecycle diagram with seven stages: Problem Framing, Data Collection, Data Prep, Model Training, Evaluation, Deployment, and Monitoring">
          <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx={cx} cy={cy} r="54" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fill="#94a3b8" fontWeight="700">ML</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11" fill="#94a3b8">Lifecycle</text>
          {steps.map((s, i) => {
            const angle = (2 * Math.PI * i / steps.length) - Math.PI / 2;
            const nx = cx + r * Math.cos(angle);
            const ny = cy + r * Math.sin(angle);
            const tx = cx + (r + 40) * Math.cos(angle);
            const ty = cy + (r + 40) * Math.sin(angle);
            const a1 = angle + 0.28;
            const a2 = (2 * Math.PI * (i + 1) / steps.length) - Math.PI / 2 - 0.28;
            const ax1 = cx + (r - 22) * Math.cos(a1), ay1 = cy + (r - 22) * Math.sin(a1);
            const ax2 = cx + (r - 22) * Math.cos(a2), ay2 = cy + (r - 22) * Math.sin(a2);
            return (
              <g key={i}>
                <defs>
                  <marker id={`lca${i}`} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <path d="M0,0 L0,7 L7,3.5 z" fill={s.color} />
                  </marker>
                </defs>
                <path d={`M ${ax1} ${ay1} A ${r - 22} ${r - 22} 0 0 1 ${ax2} ${ay2}`}
                  fill="none" stroke={s.color} strokeWidth="1.8" strokeOpacity="0.4"
                  markerEnd={`url(#lca${i})`} />
                <circle cx={nx} cy={ny} r="23" fill={s.color} fillOpacity="0.13" stroke={s.color} strokeWidth="1.5" />
                <text x={nx} y={ny + 2} textAnchor="middle" dominantBaseline="middle" fontSize="16">{s.icon}</text>
                <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight="700" fill="#1e293b">{s.label}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   11. PCA PROJECTION
   Used in: PCAContent
───────────────────────────────────────────── */
export function PCAProjectionDiagram() {
  const W = 480, H = 220;
  const rawPts = [
    { x: 75, y: 165 }, { x: 105, y: 138 }, { x: 135, y: 115 },
    { x: 162, y: 96 }, { x: 198, y: 75 }, { x: 228, y: 58 }, { x: 255, y: 44 },
  ];
  const projPts = rawPts.map(p => {
    const px = (p.x + 0.58 * (218 - p.y)) / (1 + 0.336);
    const py = -0.58 * px + 218;
    return { x: px, y: py };
  });
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 11 — PCA: Projecting 2D Data onto the First Principal Component (PC1)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 36}`} className="w-full max-w-lg mx-auto block"
          aria-label="PCA projection: original 2D data points (amber) projected onto the PC1 axis (purple), with dashed projection lines">
          <defs>
            <marker id="pcaArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L0,7 L7,3.5 z" fill="#6366f1" />
            </marker>
          </defs>
          <line x1="55" y1="190" x2="285" y2="28" stroke="#6366f1" strokeWidth="2" markerEnd="url(#pcaArr)" />
          <text x="294" y="25" fontSize="10" fill="#6366f1" fontWeight="700">PC1</text>
          <text x="294" y="38" fontSize="8.5" fill="#6366f1">(max variance)</text>
          {rawPts.map((p, i) => (
            <line key={i} x1={p.x} y1={p.y} x2={projPts[i].x} y2={projPts[i].y}
              stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          ))}
          {rawPts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="5.5" fill="#f59e0b" fillOpacity="0.85" />
          ))}
          {projPts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="5.5" fill="#6366f1" fillOpacity="0.85" />
          ))}
          <circle cx="340" cy="60" r="5" fill="#f59e0b" />
          <text x="352" y="64" fontSize="9.5" fill="#92400e" fontWeight="600">Original 2D points</text>
          <circle cx="340" cy="82" r="5" fill="#6366f1" />
          <text x="352" y="86" fontSize="9.5" fill="#4338ca" fontWeight="600">PC1-projected points</text>
          <line x1="340" y1="104" x2="360" y2="104" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
          <text x="365" y="108" fontSize="9" fill="#475569">Projection lines</text>
          <text x={W / 2} y={H + 26} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            PC1 captures maximum variance · Dashed lines show perpendicular projection from each point
          </text>
        </svg>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────
   12. CONFUSION MATRIX heatmap (visual)
   Used in: ConfusionMatrixContent
───────────────────────────────────────────── */
export function ConfusionMatrixDiagram() {
  const cells = [
    { row: 0, col: 0, label: 'TP', value: 85, desc: 'True Positive', color: '#10b981' },
    { row: 0, col: 1, label: 'FN', value: 15, desc: 'False Negative', color: '#ef4444' },
    { row: 1, col: 0, label: 'FP', value: 10, desc: 'False Positive', color: '#f59e0b' },
    { row: 1, col: 1, label: 'TN', value: 90, desc: 'True Negative', color: '#06b6d4' },
  ];
  const sz = 100, off = 90, W = 370, H = 310;
  return (
    <figure className="my-8 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-3 uppercase tracking-wider">
        Figure 12 — Confusion Matrix Heatmap (Binary Classifier Example)
      </figcaption>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm mx-auto block"
          aria-label="Confusion matrix showing True Positive 85, False Negative 15, False Positive 10, True Negative 90">
          {/* axis labels */}
          <text x={off + sz} y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Predicted Positive</text>
          <text x={off + sz * 2} y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">Predicted Negative</text>
          <text x={off - 12} y={60 + sz / 2} textAnchor="end" fontSize="10" fontWeight="700" fill="#475569" transform={`rotate(-90,${off - 42},${60 + sz / 2})`}>Actual Positive</text>
          <text x={off - 12} y={60 + sz + sz / 2} textAnchor="end" fontSize="10" fontWeight="700" fill="#475569" transform={`rotate(-90,${off - 42},${60 + sz + sz / 2})`}>Actual Negative</text>
          {cells.map(c => {
            const x = off + c.col * sz, y = 55 + c.row * sz;
            const opacity = 0.1 + (c.value / 100) * 0.3;
            return (
              <g key={c.label}>
                <rect x={x} y={y} width={sz} height={sz} fill={c.color} fillOpacity={opacity}
                  stroke={c.color} strokeWidth="1.5" />
                <text x={x + sz / 2} y={y + 28} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b">{c.label}</text>
                <text x={x + sz / 2} y={y + 48} textAnchor="middle" fontSize="20" fontWeight="800" fill={c.color}>{c.value}</text>
                <text x={x + sz / 2} y={y + 68} textAnchor="middle" fontSize="8.5" fill="#64748b">{c.desc}</text>
                <text x={x + sz / 2} y={y + 82} textAnchor="middle" fontSize="8" fill="#94a3b8">of 200 samples</text>
              </g>
            );
          })}
          {/* derived metrics */}
          <text x={W / 2} y={H - 30} textAnchor="middle" fontSize="9" fill="#475569" fontWeight="600">
            Precision = TP/(TP+FP) = 85/95 ≈ 89% · Recall = TP/(TP+FN) = 85/100 = 85%
          </text>
          <text x={W / 2} y={H - 14} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontStyle="italic">
            Accuracy = (TP+TN)/(Total) = 175/200 = 87.5%
          </text>
        </svg>
      </div>
    </figure>
  );
}
