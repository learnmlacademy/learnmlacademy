import React, { useState } from 'react';
import { Sliders, Sparkles, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PatientSample {
  id: number;
  x: number; // tumor size or exam hours (1 to 10)
  trueClass: 0 | 1;
}

const samples: PatientSample[] = [
  { id: 1, x: 1.5, trueClass: 0 },
  { id: 2, x: 2.2, trueClass: 0 },
  { id: 3, x: 3.1, trueClass: 0 },
  { id: 4, x: 4.0, trueClass: 0 },
  { id: 5, x: 4.8, trueClass: 0 },
  { id: 6, x: 5.2, trueClass: 1 },
  { id: 7, x: 5.8, trueClass: 1 },
  { id: 8, x: 6.5, trueClass: 1 },
  { id: 9, x: 7.4, trueClass: 1 },
  { id: 10, x: 8.8, trueClass: 1 },
];

export const LogisticSigmoidPlayground: React.FC = () => {
  const [w, setW] = useState<number>(1.2);
  const [b, setB] = useState<number>(-6.0);
  const [threshold, setThreshold] = useState<number>(0.5);

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

  // Compute predictions and confusion matrix
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;

  const sampleResults = samples.map((s) => {
    const z = w * s.x + b;
    const prob = sigmoid(z);
    const pred = prob >= threshold ? 1 : 0;

    if (pred === 1 && s.trueClass === 1) tp += 1;
    if (pred === 1 && s.trueClass === 0) fp += 1;
    if (pred === 0 && s.trueClass === 0) tn += 1;
    if (pred === 0 && s.trueClass === 1) fn += 1;

    return { ...s, prob: parseFloat(prob.toFixed(3)), pred };
  });

  const accuracy = Math.round(((tp + tn) / samples.length) * 100);
  const precision = tp + fp > 0 ? Math.round((tp / (tp + fp)) * 100) : 0;
  const recall = tp + fn > 0 ? Math.round((tp / (tp + fn)) * 100) : 0;

  // Decision boundary: w*x + b = ln(T / (1 - T))
  // For T = 0.5, ln(1) = 0 => x = -b / w
  const zThreshold = Math.log(threshold / (1 - threshold));
  const boundaryX = (zThreshold - b) / w;

  // Generate SVG curve points
  const curvePoints: string[] = [];
  for (let x = 0; x <= 10; x += 0.2) {
    const z = w * x + b;
    const prob = sigmoid(z);
    // map x: 0..10 -> 0..100%, prob: 0..1 -> 100..0%
    const svgX = (x / 10) * 100;
    const svgY = 100 - prob * 100;
    curvePoints.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
  }
  const pathD = `M ${curvePoints.join(' L ')}`;

  const handleReset = () => {
    setW(1.2);
    setB(-6.0);
    setThreshold(0.5);
  };

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-xl">
      {/* Header */}
      <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                Interactive Lab
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Sigmoid &amp; Decision Threshold Explorer</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              See how changing <strong className="text-indigo-700">Weights (w)</strong>, <strong className="text-indigo-700">Bias (b)</strong>, and <strong className="text-rose-600">Decision Threshold (T)</strong> converts continuous linear scores into probabilities and binary classes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        {/* Controls & Metrics Column */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Formula Callout */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 font-mono text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 font-sans block mb-1">
              Active Sigmoid Equation:
            </span>
            <div className="text-sm font-bold text-indigo-950">
              P(y=1) = 1 / (1 + e<sup>-({w.toFixed(1)}·x {b >= 0 ? `+ ${b.toFixed(1)}` : `- ${Math.abs(b).toFixed(1)}`})</sup>)
            </div>
            <div className="mt-1 text-[11px] text-slate-500 font-sans">
              Decision Boundary: Predict Class 1 when P(y=1) ≥ <span className="font-bold text-rose-600">{threshold.toFixed(2)}</span> (x ≈ {boundaryX.toFixed(2)})
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label htmlFor="logreg-w-slider">Weight (w) - S-Curve Steepness</label>
                <span className="font-mono text-indigo-600">{w.toFixed(1)}</span>
              </div>
              <input
                id="logreg-w-slider"
                type="range"
                min={0.2}
                max={3.0}
                step={0.1}
                value={w}
                onChange={(e) => setW(parseFloat(e.target.value))}
                className="mt-1 w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0.2 (Gentle)</span>
                <span>3.0 (Sharp Step)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label htmlFor="logreg-b-slider">Bias (b) - Horizontal Shift</label>
                <span className="font-mono text-indigo-600">{b.toFixed(1)}</span>
              </div>
              <input
                id="logreg-b-slider"
                type="range"
                min={-12.0}
                max={2.0}
                step={0.5}
                value={b}
                onChange={(e) => setB(parseFloat(e.target.value))}
                className="mt-1 w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>-12.0 (Shift Right)</span>
                <span>+2.0 (Shift Left)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label htmlFor="logreg-t-slider" className="text-rose-700">Classification Threshold (T)</label>
                <span className="font-mono text-rose-600 font-bold">{threshold.toFixed(2)}</span>
              </div>
              <input
                id="logreg-t-slider"
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="mt-1 w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0.10 (High Recall / More Positives)</span>
                <span>0.90 (High Precision)</span>
              </div>
            </div>
          </div>

          {/* Real-time Confusion Matrix */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Confusion Matrix on 10 Sample Patients
              </h4>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono font-bold text-slate-700">
                Acc: {accuracy}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5">
                <span className="block text-[10px] uppercase text-emerald-700 font-sans font-bold">True Negative (TN)</span>
                <span className="text-xl font-bold text-emerald-900">{tn}</span>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5">
                <span className="block text-[10px] uppercase text-rose-700 font-sans font-bold">False Positive (FP)</span>
                <span className="text-xl font-bold text-rose-900">{fp}</span>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
                <span className="block text-[10px] uppercase text-amber-700 font-sans font-bold">False Negative (FN)</span>
                <span className="text-xl font-bold text-amber-900">{fn}</span>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5">
                <span className="block text-[10px] uppercase text-emerald-700 font-sans font-bold">True Positive (TP)</span>
                <span className="text-xl font-bold text-emerald-900">{tp}</span>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-xs font-semibold text-slate-600 border-t border-slate-100 pt-2">
              <span>Precision: <strong className="text-slate-900 font-mono">{precision}%</strong></span>
              <span>Recall: <strong className="text-slate-900 font-mono">{recall}%</strong></span>
            </div>
          </div>
        </div>

        {/* Visual Graph Column */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] w-full rounded-2xl border-2 border-indigo-100 bg-slate-900 p-3 shadow-inner">
            <svg viewBox="0 0 100 100" className="h-full w-full select-none overflow-visible">
              {/* Grid Lines */}
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
              ))}
              {[20, 40, 60, 80].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
              ))}

              {/* Threshold line */}
              <line
                x1="0"
                y1={100 - threshold * 100}
                x2="100"
                y2={100 - threshold * 100}
                stroke="#f43f5e"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text
                x="3"
                y={100 - threshold * 100 - 2}
                fill="#f43f5e"
                fontSize="2.8"
                fontFamily="monospace"
                fontWeight="bold"
              >
                Threshold T = {threshold.toFixed(2)}
              </text>

              {/* Decision boundary vertical marker */}
              {boundaryX >= 0 && boundaryX <= 10 && (
                <line
                  x1={(boundaryX / 10) * 100}
                  y1="0"
                  x2={(boundaryX / 10) * 100}
                  y2="100"
                  stroke="#a855f7"
                  strokeWidth="0.8"
                  strokeDasharray="1.5 1.5"
                />
              )}

              {/* The Continuous Sigmoid Curve */}
              <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.2" />

              {/* Plotted Patient Samples */}
              {sampleResults.map((s) => {
                const svgX = (s.x / 10) * 100;
                const actualY = s.trueClass === 1 ? 5 : 95; // Plotted at top/bottom for ground truth
                const onCurveY = 100 - s.prob * 100;
                const isCorrect = s.pred === s.trueClass;

                return (
                  <g key={s.id}>
                    {/* Connecting line to curve */}
                    <line
                      x1={svgX}
                      y1={actualY}
                      x2={svgX}
                      y2={onCurveY}
                      stroke={isCorrect ? '#64748b' : '#f43f5e'}
                      strokeWidth="0.5"
                      strokeDasharray="0.8 0.8"
                    />
                    {/* Ground truth circle */}
                    <circle
                      cx={svgX}
                      cy={actualY}
                      r="2"
                      fill={s.trueClass === 1 ? '#10b981' : '#38bdf8'}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                    />
                    {/* Probability point on sigmoid curve */}
                    <circle
                      cx={svgX}
                      cy={onCurveY}
                      r="2.2"
                      fill={s.pred === 1 ? '#10b981' : '#38bdf8'}
                      stroke={isCorrect ? '#ffffff' : '#f43f5e'}
                      strokeWidth={isCorrect ? '0.6' : '1.2'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Axis labels */}
            <div className="mt-2 flex justify-between text-[11px] font-mono text-slate-400">
              <span>x = 0 (Small / Low)</span>
              <span>Input Feature Value (x)</span>
              <span>x = 10 (Large / High)</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              <span>Negative (Class 0)</span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 ml-2" />
              <span>Positive (Class 1)</span>
            </div>
            <div className="text-slate-400">
              Red ring = classification error with current threshold
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Takeaway Box */}
      <div className="border-t border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
            <strong className="font-bold text-slate-900">Why the threshold matters: </strong>
            In clinical diagnosis (e.g. cancer detection), missing a true disease (False Negative) is disastrous. By dragging the threshold slider down from <strong className="text-indigo-700">0.50 to 0.25</strong>, the model flags more patients for screening, driving <strong className="text-indigo-700">Recall up to 100%</strong> at the price of a few harmless False Alarms. In spam filtering, where false alarms annoy users, we move the threshold <strong className="text-indigo-700">up to 0.80</strong> to ensure high Precision.
          </div>
        </div>
      </div>
    </div>
  );
};
