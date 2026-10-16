import React, { useState, useRef } from 'react';
import { Target, Compass, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface Point {
  id: number;
  x: number; // 0 to 100
  y: number; // 0 to 100
  label: 'Class A' | 'Class B';
  name: string;
}

const defaultPoints: Point[] = [
  // Class A (e.g. Pass / High Income)
  { id: 1, x: 20, y: 30, label: 'Class A', name: 'P1' },
  { id: 2, x: 25, y: 45, label: 'Class A', name: 'P2' },
  { id: 3, x: 35, y: 25, label: 'Class A', name: 'P3' },
  { id: 4, x: 30, y: 60, label: 'Class A', name: 'P4' },
  { id: 5, x: 45, y: 40, label: 'Class A', name: 'P5' },
  { id: 6, x: 50, y: 20, label: 'Class A', name: 'P6' },
  // Class B (e.g. Fail / Low Income)
  { id: 7, x: 65, y: 70, label: 'Class B', name: 'P7' },
  { id: 8, x: 75, y: 80, label: 'Class B', name: 'P8' },
  { id: 9, x: 80, y: 60, label: 'Class B', name: 'P9' },
  { id: 10, x: 85, y: 75, label: 'Class B', name: 'P10' },
  { id: 11, x: 70, y: 50, label: 'Class B', name: 'P11' },
  { id: 12, x: 60, y: 85, label: 'Class B', name: 'P12' },
];

export const KNNInteractivePlayground: React.FC = () => {
  const [points] = useState<Point[]>(defaultPoints);
  const [queryPoint, setQueryPoint] = useState<{ x: number; y: number }>({ x: 52, y: 55 });
  const [k, setK] = useState<number>(3);
  const [weighted, setWeighted] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute Euclidean distance from query point to all points
  const pointsWithDist = points.map((p) => {
    const dx = p.x - queryPoint.x;
    const dy = p.y - queryPoint.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return { ...p, dist: parseFloat(dist.toFixed(1)) };
  });

  // Sort by distance and take top K
  const sortedPoints = [...pointsWithDist].sort((a, b) => a.dist - b.dist);
  const nearestNeighbors = sortedPoints.slice(0, k);
  const kthDistance = nearestNeighbors.length > 0 ? nearestNeighbors[nearestNeighbors.length - 1].dist : 0;

  // Compute votes
  let votesA = 0;
  let votesB = 0;

  if (weighted) {
    nearestNeighbors.forEach((p) => {
      const weight = p.dist === 0 ? 10 : 1 / p.dist;
      if (p.label === 'Class A') votesA += weight;
      else votesB += weight;
    });
  } else {
    nearestNeighbors.forEach((p) => {
      if (p.label === 'Class A') votesA += 1;
      else votesB += 1;
    });
  }

  const predictedClass = votesA >= votesB ? 'Class A' : 'Class B';
  const confidence =
    votesA + votesB > 0
      ? Math.round(((votesA >= votesB ? votesA : votesB) / (votesA + votesB)) * 100)
      : 50;

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
    setQueryPoint({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(1)) });
  };

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-xl">
      {/* Header */}
      <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                Hands-On Simulator
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Interactive KNN Decision Visualizer</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Click anywhere on the grid to place the test point (⭐). Adjust <strong className="text-indigo-700">K</strong> to see how neighborhood voting dynamically assigns the predicted class.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQueryPoint({ x: 52, y: 55 })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Center Point</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        {/* Controls & Metrics Column */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Prediction Result Card */}
          <div className={`rounded-xl border p-4.5 ${
            predictedClass === 'Class A'
              ? 'border-indigo-300 bg-indigo-50/70 text-indigo-950'
              : 'border-emerald-300 bg-emerald-50/70 text-emerald-950'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Prediction</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className={`text-2xl font-black ${
                predictedClass === 'Class A' ? 'text-indigo-700' : 'text-emerald-700'
              }`}>
                {predictedClass}
              </span>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold shadow-xs">
                {confidence}% consensus
              </span>
            </div>
            <div className="mt-2 text-xs leading-relaxed text-slate-600">
              {weighted
                ? `Distance-weighted tally: Class A (${votesA.toFixed(2)}) vs Class B (${votesB.toFixed(2)})`
                : `Uniform vote: Class A (${votesA} votes) vs Class B (${votesB} votes)`}
            </div>
          </div>

          {/* Hyperparameter Controls */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <label htmlFor="knn-k-slider" className="text-sm font-bold text-slate-800">
                Number of Neighbors (K): <span className="font-mono text-indigo-600">{k}</span>
              </label>
              <span className="text-xs font-medium text-slate-500">Odd K prevents ties</span>
            </div>
            <input
              id="knn-k-slider"
              type="range"
              min={1}
              max={9}
              step={2}
              value={k}
              onChange={(e) => setK(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[11px] font-mono text-slate-400">
              <span>K = 1 (Sharp)</span>
              <span>K = 5 (Balanced)</span>
              <span>K = 9 (Smooth)</span>
            </div>

            {/* Voting Mode Toggle */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <span className="block text-xs font-bold text-slate-700 mb-2">Weighting Function:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWeighted(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                    !weighted
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Uniform (1 vote each)
                </button>
                <button
                  type="button"
                  onClick={() => setWeighted(true)}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                    weighted
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Distance-Weighted (1 / d)
                </button>
              </div>
            </div>
          </div>

          {/* Table of K Nearest Neighbors */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Nearest {k} Neighbors Ranked by Distance
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="pb-1.5 font-medium">Rank</th>
                    <th className="pb-1.5 font-medium">Point</th>
                    <th className="pb-1.5 font-medium">True Class</th>
                    <th className="pb-1.5 font-medium text-right">Distance (d)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {nearestNeighbors.map((n, idx) => (
                    <tr key={n.id} className="hover:bg-slate-50">
                      <td className="py-1.5 font-bold text-slate-500">#{idx + 1}</td>
                      <td className="py-1.5 font-bold text-slate-800">{n.name}</td>
                      <td className="py-1.5">
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          n.label === 'Class A'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {n.label}
                        </span>
                      </td>
                      <td className="py-1.5 text-right font-bold text-slate-700">{n.dist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Interactive 2D Coordinate Grid */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square w-full rounded-2xl border-2 border-indigo-100 bg-slate-900 p-2 shadow-inner">
            {/* Grid legend overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs text-white backdrop-blur-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-indigo-500" />
                <span>Class A ({points.filter((p) => p.label === 'Class A').length})</span>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span>Class B ({points.filter((p) => p.label === 'Class B').length})</span>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <span className="text-amber-400 font-bold">⭐</span>
                <span>Test Point</span>
              </div>
            </div>

            <svg
              ref={svgRef}
              onClick={handleSvgClick}
              viewBox="0 0 100 100"
              className="h-full w-full cursor-crosshair select-none"
            >
              {/* Subtle grid lines */}
              {[20, 40, 60, 80].map((val) => (
                <React.Fragment key={val}>
                  <line x1={val} y1="0" x2={val} y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
                  <line x1="0" y1={val} x2="100" y2={val} stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
                </React.Fragment>
              ))}

              {/* K-th neighbor radius sphere */}
              {kthDistance > 0 && (
                <circle
                  cx={queryPoint.x}
                  cy={queryPoint.y}
                  r={kthDistance}
                  fill="rgba(99, 102, 241, 0.08)"
                  stroke="#818cf8"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
              )}

              {/* Connecting lines to nearest neighbors */}
              {nearestNeighbors.map((n) => (
                <line
                  key={`line-${n.id}`}
                  x1={queryPoint.x}
                  y1={queryPoint.y}
                  x2={n.x}
                  y2={n.y}
                  stroke={n.label === 'Class A' ? '#818cf8' : '#34d399'}
                  strokeWidth="1.2"
                  strokeDasharray="1.5 1.5"
                />
              ))}

              {/* Training points */}
              {points.map((p) => {
                const isNeighbor = nearestNeighbors.some((n) => n.id === p.id);
                return (
                  <g key={p.id}>
                    {isNeighbor && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="3.5"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="0.8"
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="2.2"
                      fill={p.label === 'Class A' ? '#6366f1' : '#10b981'}
                      stroke="#ffffff"
                      strokeWidth="0.6"
                    />
                    <text
                      x={p.x + 3}
                      y={p.y + 1}
                      fill="#94a3b8"
                      fontSize="2.5"
                      fontFamily="monospace"
                    >
                      {p.name}
                    </text>
                  </g>
                );
              })}

              {/* Test Query Point (Star / Target) */}
              <g>
                <circle
                  cx={queryPoint.x}
                  cy={queryPoint.y}
                  r="3.2"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <circle
                  cx={queryPoint.x}
                  cy={queryPoint.y}
                  r="6"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </g>
            </svg>
            <div className="mt-1 text-center text-[11px] text-slate-400">
              💡 Tip: Click anywhere inside the box above to reposition the target point!
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Takeaway Box */}
      <div className="border-t border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
            <strong className="font-bold text-slate-900">What this demonstrates: </strong>
            KNN does not learn a fixed formula or line during training. Instead, the entire dataset is stored in memory. At prediction time, it calculates distances to all known points, locates the <strong className="text-indigo-700">{k} closest neighbors</strong>, and takes a democratic vote. When <strong className="text-indigo-700">K=1</strong>, the decision boundary clings closely to individual points (risk of overfitting). As <strong className="text-indigo-700">K increases</strong>, the boundary becomes smooth and consensus-driven.
          </div>
        </div>
      </div>
    </div>
  );
};
