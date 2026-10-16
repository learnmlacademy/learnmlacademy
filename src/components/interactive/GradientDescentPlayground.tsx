import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

type LossFunctionType = 'convex' | 'non-convex';

export const GradientDescentPlayground: React.FC = () => {
  const [funcType, setFuncType] = useState<LossFunctionType>('convex');
  const [learningRate, setLearningRate] = useState<number>(0.15);
  const [w0, setW0] = useState<number>(funcType === 'convex' ? 2.2 : 1.6);
  const [currentW, setCurrentW] = useState<number>(funcType === 'convex' ? 2.2 : 1.6);
  const [history, setHistory] = useState<{ step: number; w: number; grad: number; loss: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Define loss functions and gradients
  // Convex: J(w) = w^2, dJ/dw = 2w
  // Non-convex: J(w) = w^4 - 3w^2 + 0.8w, dJ/dw = 4w^3 - 6w + 0.8
  const getLoss = (w: number, type: LossFunctionType) => {
    if (type === 'convex') return w * w;
    return Math.pow(w, 4) - 3 * Math.pow(w, 2) + 0.8 * w + 3; // +3 to keep >= 0
  };

  const getGradient = (w: number, type: LossFunctionType) => {
    if (type === 'convex') return 2 * w;
    return 4 * Math.pow(w, 3) - 6 * w + 0.8;
  };

  // Reset or change function
  const handleReset = (newW0?: number, newType?: LossFunctionType) => {
    const t = newType || funcType;
    const start = newW0 !== undefined ? newW0 : (t === 'convex' ? 2.2 : 1.6);
    setCurrentW(start);
    setW0(start);
    const initialGrad = getGradient(start, t);
    const initialLoss = getLoss(start, t);
    setHistory([{ step: 0, w: start, grad: initialGrad, loss: initialLoss }]);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    handleReset(undefined, funcType);
  }, [funcType]);

  const stepDescent = () => {
    setCurrentW((prevW) => {
      // Check if diverged
      if (Math.abs(prevW) > 8) {
        setIsPlaying(false);
        return prevW;
      }
      const grad = getGradient(prevW, funcType);
      // w_new = w - alpha * grad
      const nextW = prevW - learningRate * grad;
      const nextGrad = getGradient(nextW, funcType);
      const nextLoss = getLoss(nextW, funcType);

      setHistory((prev) => {
        if (prev.length >= 25) {
          setIsPlaying(false);
          return prev;
        }
        return [
          ...prev,
          {
            step: prev.length,
            w: parseFloat(nextW.toFixed(3)),
            grad: parseFloat(nextGrad.toFixed(3)),
            loss: parseFloat(nextLoss.toFixed(3)),
          },
        ];
      });

      // Stop if converged
      if (Math.abs(grad) < 0.005) {
        setIsPlaying(false);
      }

      return parseFloat(nextW.toFixed(3));
    });
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        stepDescent();
      }, 400);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, learningRate, funcType]);

  // Curve coordinates for SVG
  // X axis: -2.8 to 2.8, Y axis: 0 to 8
  const mapX = (w: number) => ((w + 2.8) / 5.6) * 100;
  const mapY = (loss: number) => 100 - (Math.min(8, Math.max(0, loss)) / 8) * 100;

  const curvePoints: string[] = [];
  for (let w = -2.6; w <= 2.6; w += 0.08) {
    const l = getLoss(w, funcType);
    curvePoints.push(`${mapX(w).toFixed(1)},${mapY(l).toFixed(1)}`);
  }
  const pathD = `M ${curvePoints.join(' L ')}`;

  const currentGrad = getGradient(currentW, funcType);
  const currentLoss = getLoss(currentW, funcType);
  const isDiverging = Math.abs(currentW) > 3.5;
  const isConverged = Math.abs(currentGrad) < 0.01 && !isDiverging;
  const isStuckLocalMin = funcType === 'non-convex' && isConverged && currentW > 0.8;

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-xl">
      {/* Header */}
      <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                Optimization Lab
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Interactive Gradient Descent Simulator</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Watch the parameter <strong className="text-indigo-700">w</strong> roll down the loss curve. Experience how the <strong className="text-indigo-700">Learning Rate (α)</strong> dictates smooth convergence vs chaotic overshoot.
            </p>
          </div>

          {/* Function Selector */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setFuncType('convex');
                setLearningRate(0.15);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                funcType === 'convex'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Convex Bowl: J(w) = w²
            </button>
            <button
              type="button"
              onClick={() => {
                setFuncType('non-convex');
                setLearningRate(0.04);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                funcType === 'non-convex'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Multi-Valley Landscape
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Status Diagnostic Card */}
          <div className={`rounded-xl border p-4 ${
            isDiverging
              ? 'border-rose-300 bg-rose-50 text-rose-950'
              : isConverged
              ? isStuckLocalMin
                ? 'border-amber-300 bg-amber-50 text-amber-950'
                : 'border-emerald-300 bg-emerald-50 text-emerald-950'
              : 'border-indigo-200 bg-indigo-50/60 text-indigo-950'
          }`}>
            <div className="flex items-center gap-2">
              {isDiverging ? (
                <>
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                  <span className="font-bold text-rose-800">Diverging / Exploded!</span>
                </>
              ) : isConverged ? (
                <>
                  <CheckCircle2 className={`h-5 w-5 ${isStuckLocalMin ? 'text-amber-600' : 'text-emerald-600'}`} />
                  <span className={`font-bold ${isStuckLocalMin ? 'text-amber-900' : 'text-emerald-900'}`}>
                    {isStuckLocalMin ? 'Stuck in Local Minimum!' : 'Converged to Global Minimum!'}
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="font-bold text-indigo-900">Optimizing in Progress (Step {history.length - 1})</span>
                </>
              )}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-xs">
              <div className="rounded bg-white/80 p-2 shadow-2xs">
                <span className="text-[10px] text-slate-500 block font-sans">Current w</span>
                <span className="font-bold">{currentW.toFixed(2)}</span>
              </div>
              <div className="rounded bg-white/80 p-2 shadow-2xs">
                <span className="text-[10px] text-slate-500 block font-sans">Gradient</span>
                <span className="font-bold">{currentGrad.toFixed(2)}</span>
              </div>
              <div className="rounded bg-white/80 p-2 shadow-2xs">
                <span className="text-[10px] text-slate-500 block font-sans">Loss J(w)</span>
                <span className="font-bold">{currentLoss.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label htmlFor="gd-lr-slider">Learning Rate (α)</label>
                <span className="font-mono text-indigo-600">{learningRate}</span>
              </div>
              <input
                id="gd-lr-slider"
                type="range"
                min={0.01}
                max={funcType === 'convex' ? 1.05 : 0.12}
                step={funcType === 'convex' ? 0.02 : 0.005}
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="mt-1 w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Too small (Slow)</span>
                <span>Optimal</span>
                <span className="text-rose-500 font-bold">Too large (Oscillates)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label htmlFor="gd-start-slider">Starting Position (w₀)</label>
                <span className="font-mono text-indigo-600">{w0.toFixed(2)}</span>
              </div>
              <input
                id="gd-start-slider"
                type="range"
                min={-2.4}
                max={2.4}
                step={0.1}
                value={w0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setW0(val);
                  handleReset(val);
                }}
                className="mt-1 w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Left (-2.4)</span>
                <span>Center (0.0)</span>
                <span>Right (+2.4)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-xs transition ${
                isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              <span>{isPlaying ? 'Pause Descent' : 'Auto-Run Steps'}</span>
            </button>
            <button
              type="button"
              onClick={stepDescent}
              disabled={isPlaying || isDiverging}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Step Once</span>
            </button>
            <button
              type="button"
              onClick={() => handleReset()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Update Equation Callout */}
          <div className="rounded-xl border border-slate-200 bg-white p-3 font-mono text-xs text-slate-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans block mb-1">
              Weight Update Rule:
            </span>
            <div className="font-bold text-slate-900">
              w<sub>new</sub> = w - α · (∂J / ∂w)
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Next step: {currentW.toFixed(2)} - ({learningRate} × {currentGrad.toFixed(2)}) ={' '}
              <strong className="text-indigo-700">
                {(currentW - learningRate * currentGrad).toFixed(2)}
              </strong>
            </div>
          </div>
        </div>

        {/* Visual Curve Canvas Column */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] w-full rounded-2xl border-2 border-indigo-100 bg-slate-900 p-3 shadow-inner">
            <svg viewBox="0 0 100 100" className="h-full w-full select-none overflow-visible">
              {/* Grid Lines */}
              {[20, 40, 60, 80].map((val) => (
                <React.Fragment key={val}>
                  <line x1={val} y1="0" x2={val} y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
                  <line x1="0" y1={val} x2="100" y2={val} stroke="#334155" strokeWidth="0.5" strokeDasharray="1 1" />
                </React.Fragment>
              ))}

              {/* The Loss Landscape Curve */}
              <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" />

              {/* Trajectory History lines */}
              {history.map((step, idx) => {
                if (idx === 0) return null;
                const prev = history[idx - 1];
                return (
                  <line
                    key={`hist-${idx}`}
                    x1={mapX(prev.w)}
                    y1={mapY(prev.loss)}
                    x2={mapX(step.w)}
                    y2={mapY(step.loss)}
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    strokeDasharray="1 1"
                  />
                );
              })}

              {/* Historical Step Dots */}
              {history.map((step) => (
                <circle
                  key={`dot-${step.step}`}
                  cx={mapX(step.w)}
                  cy={mapY(step.loss)}
                  r="1.4"
                  fill="#f59e0b"
                  opacity="0.6"
                />
              ))}

              {/* Current Ball Position */}
              {!isDiverging && (
                <g>
                  {/* Tangent line */}
                  <line
                    x1={mapX(currentW) - 8}
                    y1={mapY(currentLoss) + currentGrad * 4}
                    x2={mapX(currentW) + 8}
                    y2={mapY(currentLoss) - currentGrad * 4}
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={mapX(currentW)}
                    cy={mapY(currentLoss)}
                    r="3.5"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx={mapX(currentW)}
                    cy={mapY(currentLoss)}
                    r="6"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                </g>
              )}
            </svg>

            {/* Canvas Legend */}
            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>w = -2.5</span>
              <span>Weight Parameter (w)</span>
              <span>w = +2.5</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                <span>Current Weight (w)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span>Trajectory Path</span>
              </span>
            </div>
            <div>
              {history.length > 1 && (
                <span className="font-mono text-slate-600">
                  Total Steps Taken: {history.length - 1}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Takeaway Box */}
      <div className="border-t border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
            <strong className="font-bold text-slate-900">Key takeaway for machine learning: </strong>
            {funcType === 'convex' ? (
              <span>
                On a convex bowl, a well-tuned learning rate (α ≈ 0.15) takes large steps down the slope when gradients are steep and automatically decelerates as the gradient shrinks near zero. If you push α above 0.95, observe how the ball wildly overshoots and flies off to infinity!
              </span>
            ) : (
              <span>
                On complex, non-convex landscapes (typical of Deep Learning), standard gradient descent is greedy: if you start near w=1.6, the ball easily gets trapped in the higher <em>local minimum</em> and never reaches the true global minimum at w=-1.75. This is why modern optimizers use Momentum, RMSProp, and Adam!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
