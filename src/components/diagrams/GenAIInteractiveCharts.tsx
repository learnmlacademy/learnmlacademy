import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  BarChart,
  AreaChart,
  ScatterChart,
  RadarChart,
  Line,
  Bar,
  Area,
  Scatter,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Sliders, Sparkles, RefreshCw, Layers } from "lucide-react";

// 1. Generative AI Market & Compute Growth
export function MarketComputeExplosionChart() {
  const data = [
    { year: "2018", gptParams: 0.117, computePetaflops: 0.1, contextK: 0.5 },
    { year: "2019", gptParams: 1.5, computePetaflops: 1.2, contextK: 1.0 },
    { year: "2020", gptParams: 175, computePetaflops: 3640, contextK: 2.0 },
    { year: "2022", gptParams: 540, computePetaflops: 12500, contextK: 4.0 },
    { year: "2023", gptParams: 1800, computePetaflops: 48000, contextK: 32.0 },
    { year: "2024", gptParams: 2400, computePetaflops: 120000, contextK: 128.0 },
    { year: "2026", gptParams: 4200, computePetaflops: 350000, contextK: 2000.0 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-slate-900">Historical Compute & Context Growth in Generative AI</h4>
          <p className="text-xs text-slate-600">Training compute scaling (PetaFLOP-days, log-scaled) alongside context window capacity.</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">Compute Frontier</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
            <YAxis yAxisId="left" stroke="#6366f1" fontSize={12} label={{ value: "Compute (k PetaFLOPs)", angle: -90, position: "insideLeft", fontSize: 10, fill: "#6366f1" }} />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} label={{ value: "Context Window (k tokens)", angle: 90, position: "insideRight", fontSize: 10, fill: "#10b981" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar yAxisId="left" dataKey="computePetaflops" name="Training Compute (k PetaFLOPs)" fill="#818cf8" radius={[4, 4, 0, 0]} opacity={0.85} />
            <Line yAxisId="right" type="monotone" dataKey="contextK" name="Context Window (k tokens)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">Notice the exponential inflection: modern generative systems simultaneously scale parameter capacity, pretraining compute, and active context tokens.</p>
    </div>
  );
}

// 2. Discriminative Decision Boundary vs Generative Density Contours
export function GenerativeVsDiscriminativeBoundaryChart() {
  const [modelType, setModelType] = useState<"both" | "discriminative" | "generative">("both");

  // Sample 2D points from two classes
  const classA = [
    { x: 1.5, y: 2.2, class: "A" }, { x: 2.0, y: 1.8, class: "A" }, { x: 2.3, y: 2.7, class: "A" },
    { x: 2.8, y: 3.1, class: "A" }, { x: 3.2, y: 2.0, class: "A" }, { x: 1.8, y: 3.5, class: "A" },
    { x: 3.5, y: 3.3, class: "A" }, { x: 2.5, y: 2.5, class: "A" }
  ];
  const classB = [
    { x: 5.5, y: 6.2, class: "B" }, { x: 6.0, y: 5.8, class: "B" }, { x: 6.8, y: 6.5, class: "B" },
    { x: 7.2, y: 7.1, class: "B" }, { x: 5.8, y: 7.0, class: "B" }, { x: 6.5, y: 5.2, class: "B" },
    { x: 7.5, y: 6.3, class: "B" }, { x: 6.2, y: 6.0, class: "B" }
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">Discriminative Boundary vs Generative Distribution Contours</h4>
          <p className="text-xs text-slate-600">Discriminative draws one dividing line; Generative models the complete density cloud for each class.</p>
        </div>
        <div className="flex gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setModelType("discriminative")}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${modelType === "discriminative" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Discriminative: P(y|x)
          </button>
          <button
            onClick={() => setModelType("generative")}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${modelType === "generative" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Generative: P(x, y)
          </button>
          <button
            onClick={() => setModelType("both")}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${modelType === "both" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            Compare Both
          </button>
        </div>
      </div>

      <div className="relative h-64 w-full rounded-xl border border-slate-100 bg-slate-50/50 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 15, right: 20, bottom: 15, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" dataKey="x" name="Feature X1" domain={[0, 9]} stroke="#64748b" fontSize={11} />
            <YAxis type="number" dataKey="y" name="Feature X2" domain={[0, 9]} stroke="#64748b" fontSize={11} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Class A (Not Spam / Real)" data={classA} fill="#3b82f6" shape="circle" />
            <Scatter name="Class B (Spam / Fake)" data={classB} fill="#f43f5e" shape="diamond" />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Visual Overlay of Discriminative Boundary */}
        {(modelType === "discriminative" || modelType === "both") && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="85" y1="10" x2="15" y2="90" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="52" y="44" fill="#6d28d9" fontSize="3.5" fontWeight="bold" transform="rotate(-40, 52, 44)">
                Discriminative Boundary: P(y=A|x) = 0.5
              </text>
            </svg>
          </div>
        )}

        {/* Visual Overlay of Generative Density Ellipses */}
        {(modelType === "generative" || modelType === "both") && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Ellipse A */}
              <ellipse cx="28" cy="72" rx="14" ry="10" fill="#3b82f6" fillOpacity="0.12" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" transform="rotate(-15, 28, 72)" />
              <ellipse cx="28" cy="72" rx="8" ry="5" fill="#3b82f6" fillOpacity="0.18" stroke="#2563eb" strokeWidth="1" transform="rotate(-15, 28, 72)" />
              <text x="20" y="87" fill="#1e40af" fontSize="3.2" fontWeight="bold">p(x|y=A) cluster density</text>

              {/* Ellipse B */}
              <ellipse cx="72" cy="28" rx="15" ry="11" fill="#f43f5e" fillOpacity="0.12" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" transform="rotate(-20, 72, 28)" />
              <ellipse cx="72" cy="28" rx="9" ry="6" fill="#f43f5e" fillOpacity="0.18" stroke="#e11d48" strokeWidth="1" transform="rotate(-20, 72, 28)" />
              <text x="60" y="15" fill="#9f1239" fontSize="3.2" fontWeight="bold">p(x|y=B) cluster density</text>
            </svg>
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-2.5">
          <strong className="text-indigo-900">Discriminative:</strong> Finds the dividing hyperplane separating classes. Ignores how points inside each class cluster or where outliers lie.
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-2.5">
          <strong className="text-emerald-900">Generative:</strong> Fits full probability distributions $P(x|y)$ and priors $P(y)$. Can sample new instances from either class and detect anomalous outliers!
        </div>
      </div>
    </div>
  );
}

// 3. Interactive Sampling Simulator with Random Number and Condition
export function InteractiveSamplingSimulator() {
  const [randomSeed, setRandomSeed] = useState(0.42);
  const [condition, setCondition] = useState<"unconditional" | "sunset" | "night">("unconditional");

  const distributions = {
    unconditional: [
      { name: "Forest", prob: 0.50, rangeStart: 0.0, rangeEnd: 0.50, color: "#10b981" },
      { name: "Coast", prob: 0.30, rangeStart: 0.50, rangeEnd: 0.80, color: "#0ea5e9" },
      { name: "City", prob: 0.20, rangeStart: 0.80, rangeEnd: 1.00, color: "#f59e0b" },
    ],
    sunset: [
      { name: "Forest", prob: 0.20, rangeStart: 0.0, rangeEnd: 0.20, color: "#10b981" },
      { name: "Coast", prob: 0.70, rangeStart: 0.20, rangeEnd: 0.90, color: "#0ea5e9" },
      { name: "City", prob: 0.10, rangeStart: 0.90, rangeEnd: 1.00, color: "#f59e0b" },
    ],
    night: [
      { name: "Forest", prob: 0.15, rangeStart: 0.0, rangeEnd: 0.15, color: "#10b981" },
      { name: "Coast", prob: 0.25, rangeStart: 0.15, rangeEnd: 0.40, color: "#0ea5e9" },
      { name: "City", prob: 0.60, rangeStart: 0.40, rangeEnd: 1.00, color: "#f59e0b" },
    ],
  };

  const activeDist = distributions[condition];
  const selectedCategory = activeDist.find(
    (item) => randomSeed >= item.rangeStart && randomSeed < item.rangeEnd
  ) || activeDist[activeDist.length - 1];

  return (
    <div className="not-prose my-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50 p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Interactive Sampling & Conditioning Simulator</h4>
            <p className="text-xs text-slate-600">Drag the random value slider r in [0, 1) or switch conditions to see how samples emerge!</p>
          </div>
        </div>

        {/* Condition toggles */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-1 text-xs font-medium">
          <span className="px-2 text-slate-500">Condition:</span>
          <button
            onClick={() => setCondition("unconditional")}
            className={`rounded px-2.5 py-1 ${condition === "unconditional" ? "bg-indigo-600 text-white font-semibold" : "text-slate-700 hover:bg-slate-100"}`}
          >
            None
          </button>
          <button
            onClick={() => setCondition("sunset")}
            className={`rounded px-2.5 py-1 ${condition === "sunset" ? "bg-amber-500 text-white font-semibold" : "text-slate-700 hover:bg-slate-100"}`}
          >
            Sunset 🌅
          </button>
          <button
            onClick={() => setCondition("night")}
            className={`rounded px-2.5 py-1 ${condition === "night" ? "bg-slate-800 text-white font-semibold" : "text-slate-700 hover:bg-slate-100"}`}
          >
            Night 🌃
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-700">
            <Sliders className="h-3.5 w-3.5 text-indigo-600" />
            Random Uniform Sample: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-indigo-700 font-mono">r = {randomSeed.toFixed(2)}</code>
          </span>
          <button
            onClick={() => setRandomSeed(parseFloat(Math.random().toFixed(2)))}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs font-medium"
          >
            <RefreshCw className="h-3 w-3" /> Roll Random
          </button>
        </div>
        <input
          type="range"
          min="0.00"
          max="0.99"
          step="0.01"
          value={randomSeed}
          onChange={(e) => setRandomSeed(parseFloat(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600"
        />

        {/* Visual Interval Bar */}
        <div className="mt-3 relative h-8 w-full overflow-hidden rounded-lg flex text-xs font-bold text-white shadow-inner">
          {activeDist.map((item) => (
            <div
              key={item.name}
              style={{ width: `${item.prob * 100}%`, backgroundColor: item.color }}
              className="flex items-center justify-center transition-all duration-300"
            >
              {item.name} ({(item.prob * 100).toFixed(0)}%)
            </div>
          ))}

          {/* Marker needle for random value */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-slate-900 shadow-md transition-all duration-75"
            style={{ left: `${randomSeed * 100}%` }}
          >
            <div className="absolute -top-1 -left-2.5 h-3 w-6 rounded-full bg-slate-900 text-[9px] font-mono text-white flex items-center justify-center">
              {randomSeed.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Result Box */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-white p-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Generated Candidate Output</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl font-black text-slate-900">{selectedCategory.name}</span>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
              style={{ backgroundColor: selectedCategory.color }}
            >
              Interval: [{selectedCategory.rangeStart.toFixed(2)}, {selectedCategory.rangeEnd.toFixed(2)})
            </span>
          </div>
        </div>
        <p className="max-w-md text-xs text-slate-600">
          The random seed <code className="font-mono text-indigo-700">{randomSeed.toFixed(2)}</code> landed in the <strong>{selectedCategory.name}</strong> cumulative interval.
          Changing condition shifts interval widths without retraining the weights!
        </p>
      </div>
    </div>
  );
}

// 4. VAE ELBO Loss & Latent Distribution Chart
export function VAELossAndLatentChart() {
  const lossData = [
    { epoch: 1, reconLoss: 142, klLoss: 4, totalLoss: 146 },
    { epoch: 5, reconLoss: 98, klLoss: 8, totalLoss: 106 },
    { epoch: 10, reconLoss: 65, klLoss: 14, totalLoss: 79 },
    { epoch: 20, reconLoss: 42, klLoss: 18, totalLoss: 60 },
    { epoch: 30, reconLoss: 31, klLoss: 21, totalLoss: 52 },
    { epoch: 40, reconLoss: 25, klLoss: 22, totalLoss: 47 },
    { epoch: 50, reconLoss: 22, klLoss: 23, totalLoss: 45 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">VAE ELBO Loss Balance Across Training Epochs</h4>
        <p className="text-xs text-slate-600">Total Loss = Reconstruction Loss (negative log-likelihood) + KL Divergence (regularization to standard normal prior).</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lossData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="epoch" stroke="#64748b" fontSize={12} label={{ value: "Epochs", position: "insideBottom", offset: -3, fontSize: 11 }} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="reconLoss" name="Reconstruction Loss (Fidelity)" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.4} strokeWidth={2} />
            <Area type="monotone" dataKey="klLoss" name="KL Divergence (Latent Regularity)" stroke="#ec4899" fill="#fbcfe8" fillOpacity={0.4} strokeWidth={2} />
            <Line type="monotone" dataKey="totalLoss" name="Total ELBO Loss" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700">
        <strong>The delicate balance:</strong> If KL loss is too low, latent points form disconnected islands (poor generation); if KL loss is too high, reconstructions become blurry because the latent space is overly smoothed.
      </div>
    </div>
  );
}

// 5. GAN Adversarial Training Dynamics Chart
export function GANTrainingDynamicsChart() {
  const ganData = [
    { step: 0, dLoss: 1.38, gLoss: 0.69, dRealAcc: 50, dFakeAcc: 50 },
    { step: 100, dLoss: 0.95, gLoss: 1.45, dRealAcc: 75, dFakeAcc: 70 },
    { step: 250, dLoss: 0.65, gLoss: 2.10, dRealAcc: 88, dFakeAcc: 84 },
    { step: 500, dLoss: 0.72, gLoss: 1.85, dRealAcc: 80, dFakeAcc: 78 },
    { step: 750, dLoss: 0.69, gLoss: 1.40, dRealAcc: 70, dFakeAcc: 68 },
    { step: 1000, dLoss: 0.69, gLoss: 0.75, dRealAcc: 55, dFakeAcc: 52 },
    { step: 1500, dLoss: 0.68, gLoss: 0.70, dRealAcc: 51, dFakeAcc: 50 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">GAN Adversarial Convergence: Generator vs Discriminator</h4>
        <p className="text-xs text-slate-600">Tracking minimax loss and discriminator accuracy toward theoretical Nash Equilibrium (log 2 ≈ 0.693).</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ganData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="step" stroke="#64748b" fontSize={12} label={{ value: "Training Iterations", position: "insideBottom", offset: -3, fontSize: 11 }} />
            <YAxis stroke="#64748b" fontSize={12} domain={[0, 2.5]} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="dLoss" name="Discriminator Loss" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="gLoss" name="Generator Loss" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-slate-500">Early in training, the Discriminator wins easily (low D loss, high G loss). As G improves, it learns to fool D until D can only guess with ~50% accuracy (equilibrium).</p>
    </div>
  );
}

// 6. Diffusion Noise Schedule Chart
export function DiffusionNoiseScheduleChart() {
  const steps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const scheduleData = steps.map((t) => {
    const fraction = t / 1000;
    // Linear schedule alpha_cumprod
    const linearAlphaBar = Math.max(0, 1 - fraction);
    // Cosine schedule alpha_cumprod
    const cosineAlphaBar = Math.cos(((fraction + 0.008) / 1.008) * (Math.PI / 2)) ** 2;
    return {
      t,
      linearAlphaBar: parseFloat(linearAlphaBar.toFixed(3)),
      cosineAlphaBar: parseFloat(cosineAlphaBar.toFixed(3)),
      noiseRatioLinear: parseFloat((1 - linearAlphaBar).toFixed(3)),
      noiseRatioCosine: parseFloat((1 - cosineAlphaBar).toFixed(3)),
    };
  });

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Forward Diffusion Signal Retention (ᾱₜ) Over 1000 Timesteps</h4>
        <p className="text-xs text-slate-600">Cosine schedule prevents signal from vanishing too abruptly in early timesteps compared to linear schedule.</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scheduleData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="t" stroke="#64748b" fontSize={12} label={{ value: "Timestep t (0 = Clean Image, 1000 = Pure Noise)", position: "insideBottom", offset: -3, fontSize: 11 }} />
            <YAxis stroke="#64748b" fontSize={12} domain={[0, 1]} label={{ value: "Signal Fraction ᾱₜ", angle: -90, position: "insideLeft", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="linearAlphaBar" name="Linear Schedule (DDPM)" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="cosineAlphaBar" name="Cosine Schedule (Improved DDPM)" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-slate-500">At t=0, ᾱ₀ ≈ 1 (100% clean image). By t=1000, ᾱ₁₀₀₀ ≈ 0 (image is completely submerged in Gaussian noise N(0, I)).</p>
    </div>
  );
}

// 7. Latent vs Pixel Space Compute & Memory Chart
export function LatentVsPixelSpaceChart() {
  const comparisonData = [
    { metric: "Spatial Resolution", pixel: 512, latent: 64, unit: "px" },
    { metric: "Total Scalars (x10k)", pixel: 78.6, latent: 1.6, unit: "x10k" },
    { metric: "VRAM per Step (GB)", pixel: 14.8, latent: 2.1, unit: "GB" },
    { metric: "Latency per 50 Steps (sec)", pixel: 18.4, latent: 1.8, unit: "s" },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Pixel-Space Diffusion vs Latent Diffusion Compute Comparison</h4>
        <p className="text-xs text-slate-600">Compressing spatial dimensions 8× reduces active tensor values by 48×, dropping inference latency by 10×!</p>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="metric" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="pixel" name="Pixel Space Diffusion (512x512x3)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="latent" name="Latent Diffusion (64x64x4)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900">
        <span>✅ Latent space saves 86% VRAM and enables consumer GPU inference</span>
        <span className="font-bold">48x compression factor</span>
      </div>
    </div>
  );
}

// 8. CFG Scale (Classifier-Free Guidance) Tradeoff Chart
export function CFGScaleTradeoffChart() {
  const cfgData = [
    { scale: 1, promptAlignment: 22, visualQuality: 65, diversity: 98, artifactRisk: 2 },
    { scale: 3, promptAlignment: 48, visualQuality: 78, diversity: 85, artifactRisk: 4 },
    { scale: 5, promptAlignment: 72, visualQuality: 90, diversity: 70, artifactRisk: 8 },
    { scale: 7.5, promptAlignment: 88, visualQuality: 95, diversity: 55, artifactRisk: 14 },
    { scale: 10, promptAlignment: 94, visualQuality: 88, diversity: 40, artifactRisk: 30 },
    { scale: 15, promptAlignment: 98, visualQuality: 60, diversity: 20, artifactRisk: 68 },
    { scale: 20, promptAlignment: 99, visualQuality: 35, diversity: 8, artifactRisk: 92 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Classifier-Free Guidance (CFG Scale w) Trade-off Analysis</h4>
        <p className="text-xs text-slate-600">ε̂ = ε_uncond + w · (ε_cond - ε_uncond). Sweet spot is typically between 6.0 and 8.5.</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cfgData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="scale" stroke="#64748b" fontSize={12} label={{ value: "CFG Scale w", position: "insideBottom", offset: -3, fontSize: 11 }} />
            <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="visualQuality" name="Overall Quality (Sweet Spot Peak)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="promptAlignment" name="Prompt Adherence (%)" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="diversity" name="Sample Variety / Diversity (%)" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="artifactRisk" name="Oversaturation / Artifact Risk (%)" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-slate-500">Notice that while higher CFG scales force tighter adherence to the prompt, values above 12 induce extreme contrast, oversaturation, and burned artifact edges.</p>
    </div>
  );
}

// 9. Fine-Tuning Methods Trade-off Chart
export function FineTuningTradeoffChart() {
  const methodsData = [
    { method: "Textual Inversion", paramsM: 0.005, vramGB: 10, checkpointMB: 0.05, flexibility: 30 },
    { method: "LoRA (rank=8)", paramsM: 3.5, vramGB: 12, checkpointMB: 15, flexibility: 75 },
    { method: "LoRA (rank=64)", paramsM: 28, vramGB: 14, checkpointMB: 110, flexibility: 85 },
    { method: "DreamBooth", paramsM: 860, vramGB: 20, checkpointMB: 3400, flexibility: 90 },
    { method: "Full Fine-Tuning", paramsM: 1050, vramGB: 32, checkpointMB: 4200, flexibility: 95 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Fine-Tuning Method Resource Footprint vs Checkpoint Size</h4>
        <p className="text-xs text-slate-600">LoRA delivers over 85% of full fine-tuning flexibility with less than 0.5% of the checkpoint storage size!</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={methodsData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="method" stroke="#64748b" fontSize={11} />
            <YAxis yAxisId="left" stroke="#6366f1" fontSize={11} label={{ value: "VRAM Required (GB)", angle: -90, position: "insideLeft", fontSize: 10, fill: "#6366f1" }} />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} label={{ value: "Checkpoint Size (MB)", angle: 90, position: "insideRight", fontSize: 10, fill: "#10b981" }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar yAxisId="left" dataKey="vramGB" name="VRAM Required (GB)" fill="#818cf8" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="checkpointMB" name="Checkpoint File Size (MB)" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 10. Model Families Radar Comparison Chart
export function GenerativeModelFamilyRadarChart() {
  const radarData = [
    { attribute: "Sample Quality", diffusion: 95, gan: 90, vae: 65, autoregressive: 92 },
    { attribute: "Sampling Speed", diffusion: 50, gan: 98, vae: 95, autoregressive: 60 },
    { attribute: "Mode Diversity", diffusion: 90, gan: 65, vae: 85, autoregressive: 95 },
    { attribute: "Training Stability", diffusion: 92, gan: 45, vae: 90, autoregressive: 88 },
    { attribute: "Latent Control", diffusion: 85, gan: 75, vae: 95, autoregressive: 80 },
    { attribute: "Density Estimation", diffusion: 80, gan: 20, vae: 90, autoregressive: 95 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Generative Model Families Multi-Dimensional Comparison</h4>
        <p className="text-xs text-slate-600">Each family represents a distinct mathematical trade-off across quality, speed, diversity, and stability.</p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="attribute" stroke="#475569" fontSize={11} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={9} />
            <Radar name="Diffusion Models" dataKey="diffusion" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
            <Radar name="GANs" dataKey="gan" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
            <Radar name="VAEs" dataKey="vae" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            <Radar name="Autoregressive" dataKey="autoregressive" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 11. FID (Fréchet Inception Distance) vs Inception Score
export function FIDConvergenceChart() {
  const evalData = [
    { step: 10, fid: 84.5, isScore: 3.2, clipScore: 0.18 },
    { step: 25, fid: 46.2, isScore: 5.4, clipScore: 0.24 },
    { step: 50, fid: 28.1, isScore: 7.1, clipScore: 0.29 },
    { step: 100, fid: 18.4, isScore: 8.5, clipScore: 0.32 },
    { step: 200, fid: 12.8, isScore: 9.4, clipScore: 0.34 },
    { step: 300, fid: 9.6, isScore: 9.8, clipScore: 0.35 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">FID Score (Lower is Better) vs Inception Score (Higher is Better)</h4>
        <p className="text-xs text-slate-600">FID measures distance between generated and real feature distributions; Inception Score measures class certainty and diversity.</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={evalData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="step" stroke="#64748b" fontSize={11} label={{ value: "Training Steps (k)", position: "insideBottom", offset: -3, fontSize: 11 }} />
            <YAxis yAxisId="left" stroke="#ef4444" fontSize={11} label={{ value: "FID Score (Lower = Better)", angle: -90, position: "insideLeft", fontSize: 10, fill: "#ef4444" }} />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} label={{ value: "Inception Score (Higher = Better)", angle: 90, position: "insideRight", fontSize: 10, fill: "#10b981" }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line yAxisId="left" type="monotone" dataKey="fid" name="FID (Fréchet Inception Distance)" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="isScore" name="Inception Score (IS)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 12. End-to-End GenAI App Latency Stacked Breakdown
export function EndToEndLatencyChart() {
  const latencyData = [
    { architecture: "Cloud API (Standard)", network: 45, guardrailsIn: 25, modelTTFT: 280, streamingDecode: 850, guardrailsOut: 35 },
    { architecture: "Cloud API + Semantic Cache Hit", network: 30, guardrailsIn: 10, modelTTFT: 0, streamingDecode: 15, guardrailsOut: 0 },
    { architecture: "Self-Hosted vLLM (vLLM FP8)", network: 12, guardrailsIn: 18, modelTTFT: 65, streamingDecode: 310, guardrailsOut: 20 },
    { architecture: "Edge / On-Device Speculative", network: 0, guardrailsIn: 15, modelTTFT: 45, streamingDecode: 220, guardrailsOut: 15 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">End-to-End Production Latency Breakdown (Milliseconds)</h4>
        <p className="text-xs text-slate-600">Comparing total request lifecycles across remote providers, semantic caching, self-hosted vLLM, and local inference.</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={latencyData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" stroke="#64748b" fontSize={11} label={{ value: "Total Duration (ms)", position: "insideBottom", offset: -3, fontSize: 10 }} />
            <YAxis type="category" dataKey="architecture" stroke="#64748b" fontSize={10} width={130} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="network" name="Network & TLS" stackId="a" fill="#94a3b8" />
            <Bar dataKey="guardrailsIn" name="Input Guardrails" stackId="a" fill="#f59e0b" />
            <Bar dataKey="modelTTFT" name="Time-To-First-Token (TTFT)" stackId="a" fill="#6366f1" />
            <Bar dataKey="streamingDecode" name="Decode Generation" stackId="a" fill="#3b82f6" />
            <Bar dataKey="guardrailsOut" name="Output Policy Filter" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 13. TSTR (Train on Synthetic, Test on Real) Benchmark Chart
export function TSTRBenchmarkChart() {
  const tstrData = [
    { model: "Logistic Regression", realOnly: 78.4, synthOnly: 75.1, augmented: 81.2 },
    { model: "Random Forest", realOnly: 86.2, synthOnly: 84.0, augmented: 89.5 },
    { model: "XGBoost", realOnly: 89.1, synthOnly: 86.8, augmented: 92.4 },
    { model: "Neural Net (MLP)", realOnly: 88.0, synthOnly: 85.5, augmented: 91.0 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">TSTR (Train on Synthetic, Test on Real) Benchmark Accuracy (%)</h4>
        <p className="text-xs text-slate-600">All models are evaluated on the identical untouched Real test set to verify downstream statistical utility.</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={tstrData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="model" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} domain={[70, 95]} label={{ value: "Real Test Accuracy (%)", angle: -90, position: "insideLeft", fontSize: 10 }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="realOnly" name="Train on Real (Baseline)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="synthOnly" name="Train on Synthetic (TSTR)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="augmented" name="Train on Real + Synthetic" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-slate-500">Synthetic data preserves nearly 97% of real-data utility standalone, and combining real with synthetic minority-boosted samples achieves highest performance!</p>
    </div>
  );
}

// 14. Audio/Video Compute Scaling (Full 3D Attention vs Factorized Spatial-Temporal)
export function AudioVideoComputeScalingChart() {
  const scalingData = [
    { frames: 8, full3D: 16.4, factorized: 3.2, savings: 80 },
    { frames: 16, full3D: 65.5, factorized: 6.5, savings: 90 },
    { frames: 24, full3D: 147.2, factorized: 9.8, savings: 93 },
    { frames: 32, full3D: 262.1, factorized: 13.1, savings: 95 },
    { frames: 48, full3D: 589.8, factorized: 19.6, savings: 96 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Video Generation Compute Scaling: Full 3D Attention vs Factorized 2D+1D</h4>
        <p className="text-xs text-slate-600">Full 3D attention scales quadratically with frames $O(F^2 \cdot H^2 W^2)$; factorized spatial-temporal attention reduces memory by &gt;90%!</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scalingData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="frames" stroke="#64748b" fontSize={11} label={{ value: "Video Frame Count (F)", position: "insideBottom", offset: -3, fontSize: 10 }} />
            <YAxis stroke="#64748b" fontSize={11} label={{ value: "Relative Attention Compute (GFLOPs)", angle: -90, position: "insideLeft", fontSize: 10 }} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="full3D" name="Full 3D Joint Attention" stroke="#ef4444" strokeWidth={2.5} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="factorized" name="Factorized Spatial + Temporal Attention" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 15. Layered Safety Funnel Chart
export function LayeredSafetyFunnelChart() {
  const safetyData = [
    { layer: "1. Raw Base Model", vulnerabilityRate: 48, safeRate: 52 },
    { layer: "2. Post-RLHF / Alignment", vulnerabilityRate: 22, safeRate: 78 },
    { layer: "3. System Prompt & Context Guard", vulnerabilityRate: 11, safeRate: 89 },
    { layer: "4. Input Classifier Guardrail", vulnerabilityRate: 3.5, safeRate: 96.5 },
    { layer: "5. Output Filter & Policy Audit", vulnerabilityRate: 0.3, safeRate: 99.7 },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-slate-900">Layered Safety Defense-in-Depth Mitigation Funnel</h4>
        <p className="text-xs text-slate-600">Residual jailbreak and policy vulnerability rate drops from 48% down to &lt;0.3% across defense tiers.</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={safetyData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} label={{ value: "Percentage (%)", position: "insideBottom", offset: -3, fontSize: 10 }} />
            <YAxis type="category" dataKey="layer" stroke="#64748b" fontSize={10} width={150} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "0.75rem", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="safeRate" name="Safe Compliant Outputs (%)" stackId="s" fill="#10b981" />
            <Bar dataKey="vulnerabilityRate" name="Residual Risk / Leakage (%)" stackId="s" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

