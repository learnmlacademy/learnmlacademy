import React from "react";

function CnnJourneyFigure() {
  const stages = [
    { x: 24, width: 110, title: "Input image", detail: "64 × 64 × 3", fill: "#dbeafe", stroke: "#2563eb" },
    { x: 174, width: 116, title: "Convolution", detail: "find local patterns", fill: "#dcfce7", stroke: "#16a34a" },
    { x: 330, width: 100, title: "ReLU", detail: "keep useful signal", fill: "#fef3c7", stroke: "#d97706" },
    { x: 470, width: 100, title: "Pooling", detail: "smaller maps", fill: "#ffedd5", stroke: "#ea580c" },
    { x: 610, width: 116, title: "Deeper layers", detail: "parts → objects", fill: "#ede9fe", stroke: "#7c3aed" },
    { x: 766, width: 110, title: "Classifier", detail: "class scores", fill: "#fce7f3", stroke: "#db2777" },
  ];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">What a CNN does from beginning to end</p>
        <p className="mt-1 text-sm text-slate-600">Values move from left to right to make a prediction. Learning later adjusts the filters and classifier weights.</p>
      </div>
      <div className="overflow-x-auto p-3 md:p-6">
        <svg viewBox="0 0 900 300" className="h-auto min-w-[760px] w-full" role="img" aria-labelledby="cnn-journey-title cnn-journey-desc">
          <title id="cnn-journey-title">A convolutional neural network image classification journey</title>
          <desc id="cnn-journey-desc">An image goes through convolution, ReLU, pooling, deeper pattern extraction and a classifier to produce class scores.</desc>
          <defs><marker id="cnn-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#64748b" /></marker></defs>
          <rect width="900" height="300" rx="18" fill="#f8fafc" />
          {stages.map((stage, index) => (
            <g key={stage.title}>
              {index < stages.length - 1 && <line x1={stage.x + stage.width + 5} y1="140" x2={stages[index + 1].x - 10} y2="140" stroke="#64748b" strokeWidth="3" markerEnd="url(#cnn-arrow)" />}
              <rect x={stage.x} y="92" width={stage.width} height="96" rx="16" fill={stage.fill} stroke={stage.stroke} strokeWidth="2" />
              <text x={stage.x + stage.width / 2} y="125" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{stage.title}</text>
              <text x={stage.x + stage.width / 2} y="153" textAnchor="middle" fontSize="11" fill="#475569">{stage.detail}</text>
              {index === 0 && <g><rect x="51" y="32" width="56" height="45" rx="5" fill="#bfdbfe" stroke="#2563eb" /><circle cx="91" cy="45" r="7" fill="#facc15" /><path d="M52 72 L69 54 L81 64 L91 55 L106 72" fill="#22c55e" /></g>}
              {index === 5 && <g><text x="821" y="42" textAnchor="middle" fontSize="12" fill="#475569">cat 0.82</text><rect x="781" y="51" width="80" height="8" rx="4" fill="#e2e8f0" /><rect x="781" y="51" width="66" height="8" rx="4" fill="#db2777" /><text x="821" y="77" textAnchor="middle" fontSize="12" fill="#475569">dog 0.18</text></g>}
            </g>
          ))}
          <text x="450" y="225" textAnchor="middle" fontSize="14" fontWeight="800" fill="#334155">early layers learn small patterns</text>
          <line x1="190" y1="242" x2="700" y2="242" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#cnn-arrow)" />
          <text x="450" y="271" textAnchor="middle" fontSize="14" fontWeight="800" fill="#334155">later layers combine them into larger patterns</text>
        </svg>
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600">This is a common teaching architecture, not a rule that every modern CNN follows. Many networks replace flattening with global average pooling, change the downsampling strategy, or use residual blocks.</figcaption>
    </figure>
  );
}

function ImageValuesFigure() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="border-b border-slate-200 p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="text-center text-sm font-extrabold text-blue-800">224 pixel columns (width)</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="[writing-mode:vertical-rl] rotate-180 text-sm font-extrabold text-blue-800">224 pixel rows (height)</div>
            <div className="relative grid aspect-square flex-1 grid-cols-8 overflow-hidden rounded-xl border-2 border-blue-400 bg-gradient-to-br from-sky-100 via-emerald-100 to-amber-100">
              {Array.from({ length: 64 }, (_, index) => <span key={index} className="border-b border-r border-white/70" />)}
              <div className="absolute inset-0 flex items-center justify-center"><span className="rounded-lg bg-white/90 px-4 py-2 text-center text-sm font-bold text-slate-800 shadow-sm">224 × 224<br />pixel locations</span></div>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <p className="font-bold text-slate-900">Zoom in on one colour pixel</p>
          <div className="mt-4 space-y-2 text-sm font-bold">
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2 text-red-800"><span>Red</span><span>210</span></div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-2 text-green-800"><span>Green</span><span>95</span></div>
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-2 text-blue-800"><span>Blue</span><span>40</span></div>
          </div>
          <p className="mt-4 rounded-lg bg-slate-900 px-4 py-3 text-center font-mono text-sm font-bold text-white">Pixel = [210, 95, 40]</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">The three aligned grids are called the <strong>Red, Green and Blue channels</strong>. They describe the colour at every pixel location.</p>
        </div>
      </div>
      <figcaption className="border-t border-slate-200 bg-blue-50 px-5 py-4 text-center text-sm leading-relaxed text-blue-950">
        <strong>224 pixels wide × 224 pixels high × 3 colour values per pixel = 150,528 numerical input values.</strong> We multiply by 3 because every colour pixel stores three numbers, not one.
      </figcaption>
    </figure>
  );
}

function Matrix({ values, highlight = false, highlightArea, activeCell, className = "" }: { values: React.ReactNode[][]; highlight?: boolean; highlightArea?: [number, number]; activeCell?: [number, number]; className?: string }) {
  return (
    <div className={`grid gap-1 ${className}`} style={{ gridTemplateColumns: `repeat(${values[0].length}, minmax(30px, 1fr))` }}>
      {values.flatMap((row, r) => row.map((value, c) => {
        const isActive = activeCell?.[0] === r && activeCell?.[1] === c;
        const isHighlighted = highlightArea ? r < highlightArea[0] && c < highlightArea[1] : highlight && r < 3 && c < 3;
        return <div key={`${r}-${c}`} className={`flex aspect-square min-h-8 items-center justify-center rounded border text-sm font-bold ${isActive ? "border-fuchsia-600 bg-fuchsia-100 text-fuchsia-950 ring-2 ring-fuchsia-300" : isHighlighted ? "border-emerald-500 bg-emerald-100 text-emerald-950" : "border-slate-300 bg-slate-50 text-slate-800"}`}>{value}</div>;
      }))}
    </div>
  );
}

function FilterMeaningFigure() {
  const kernel = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-6 p-5 md:grid-cols-[0.8fr_1.2fr] md:p-6">
        <div>
          <p className="text-center text-sm font-extrabold text-amber-800">3 columns</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-extrabold text-amber-800">3 rows</span>
            <Matrix values={kernel} className="flex-1 [&>div]:border-amber-400 [&>div]:bg-amber-50" />
          </div>
          <p className="mt-3 text-center text-sm font-bold text-slate-700">3 rows × 3 columns = 9 weights</p>
        </div>
        <div>
          <p className="font-bold text-slate-900">The weights form a small pattern test</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3"><strong className="block text-xl text-emerald-700">+1</strong>reward brightness on the left</div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3"><strong className="block text-xl text-slate-700">0</strong>ignore the middle</div>
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3"><strong className="block text-xl text-rose-700">−1</strong>subtract brightness on the right</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">If a patch is bright on the left and dark on the right, the positive side contributes more than the negative side, so the total response becomes positive.</p>
        </div>
      </div>
      <figcaption className="border-t border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-950"><strong>Where did 1, 0 and −1 come from?</strong> We deliberately chose them for this hand-worked teaching example. They are not taken from the image, they are not universal CNN constants, and real CNN filters are not fixed to these values. A real filter starts with initialized weights and training changes them.</figcaption>
    </figure>
  );
}

function ConvolutionCalculationFigure() {
  const input = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
  ];
  const kernel = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
  const output = [[3, 3, 0], [2, 1, -1], [1, -1, -2]];
  const firstProducts = [["1 × 1 = 1", "1 × 0 = 0", "0 × (−1) = 0"], ["1 × 1 = 1", "1 × 0 = 0", "0 × (−1) = 0"], ["1 × 1 = 1", "1 × 0 = 0", "0 × (−1) = 0"]];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">From nine matching pairs to one feature-map cell</p>
        <p className="mt-1 text-sm text-slate-600">Green marks the first input patch, amber marks the filter, and pink marks the output cell produced by their calculation.</p>
      </div>
      <div className="grid items-center gap-5 p-5 md:p-6 lg:grid-cols-[1.2fr_auto_0.8fr_auto_0.8fr]">
        <div><p className="mb-3 text-center text-sm font-extrabold text-emerald-800">5 × 5 input: first 3 × 3 patch highlighted</p><Matrix values={input} highlight /></div>
        <div className="text-center"><p className="text-3xl font-black text-slate-400">×</p><p className="mt-1 text-xs font-bold text-slate-500">matching cells</p></div>
        <div><p className="mb-3 text-center text-sm font-extrabold text-amber-800">3 × 3 filter</p><Matrix values={kernel} className="[&>div]:border-amber-400 [&>div]:bg-amber-50" /></div>
        <div className="text-center"><p className="text-3xl font-black text-slate-400">→</p><p className="mt-1 text-xs font-bold text-slate-500">multiply, then add</p></div>
        <div><p className="mb-3 text-center text-sm font-extrabold text-fuchsia-800">3 × 3 feature map</p><Matrix values={output} activeCell={[0, 0]} /></div>
      </div>
      <div className="border-t border-slate-100 px-5 py-5 md:px-6">
        <p className="font-bold text-slate-900">Exactly what is multiplied</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">Each patch value is paired only with the filter weight in the same row and column. This produces nine products:</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {firstProducts.flatMap((row, r) => row.map((calculation, c) => <div key={`${r}-${c}`} className={`rounded-lg border px-2 py-3 text-center font-mono text-xs font-bold sm:text-sm ${c === 0 ? "border-emerald-300 bg-emerald-50 text-emerald-900" : c === 1 ? "border-slate-300 bg-slate-50 text-slate-800" : "border-rose-300 bg-rose-50 text-rose-900"}`}>{calculation}</div>))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-xl bg-indigo-50 p-4 text-center font-mono text-sm leading-7 text-indigo-950">1 + 0 + 0<br />+ 1 + 0 + 0<br />+ 1 + 0 + 0</div>
          <span className="text-center text-2xl font-black text-slate-400">=</span>
          <div className="rounded-xl border-2 border-fuchsia-400 bg-fuchsia-50 p-4 text-center"><strong className="block text-3xl text-fuchsia-800">3</strong><span className="text-sm font-bold text-slate-700">first feature-map cell</span></div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-700">We add the nine products because together they measure how closely the <em>whole patch</em> matches the filter&apos;s pattern. The strong positive total, <strong>3</strong>, says this patch has the bright-left, dark-right change that our teaching filter rewards. One patch produces one summary number, so that number occupies one feature-map cell.</p>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 md:px-6">
        <p className="font-bold text-slate-900">Move the same filter one cell at a time</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-200 bg-white p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-emerald-700">Position 1</p><p className="mt-2 text-sm text-slate-700">Rows 1–3, columns 1–3</p><p className="mt-2 font-mono text-sm font-bold">result = 3</p><Matrix values={[[3, "?", "?"], ["?", "?", "?"], ["?", "?", "?"]]} activeCell={[0, 0]} className="mt-3" /></div>
          <div className="rounded-xl border border-blue-200 bg-white p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">Move right → Position 2</p><p className="mt-2 text-sm text-slate-700">Rows 1–3, columns 2–4</p><p className="mt-2 font-mono text-sm font-bold">1 + 1 + 1 = 3</p><Matrix values={[[3, 3, "?"], ["?", "?", "?"], ["?", "?", "?"]]} activeCell={[0, 1]} className="mt-3" /></div>
          <div className="rounded-xl border border-fuchsia-200 bg-white p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-fuchsia-700">Visit all 9 positions</p><p className="mt-2 text-sm text-slate-700">Repeat across each row, then move down</p><p className="mt-2 font-mono text-sm font-bold">complete feature map</p><Matrix values={output} className="mt-3" /></div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-700">With stride 1 and no padding, the filter has three horizontal starting columns—1, 2 and 3—and three vertical starting rows. Therefore it visits <strong>3 × 3 = 9 positions</strong>, producing the nine cells in the final 3 × 3 feature map.</p>
      </div>
      <figcaption className="px-5 py-3 text-xs leading-relaxed text-slate-500">The complete feature map above has been checked against the shown input and filter. Deep-learning libraries commonly perform this operation as cross-correlation while using the familiar name “convolution”; they do not flip the filter first.</figcaption>
    </figure>
  );
}

function RgbConvolutionFigure() {
  const channelColors = [
    { name: "Red channel", tone: "border-red-300 bg-red-50 text-red-800" },
    { name: "Green channel", tone: "border-green-300 bg-green-50 text-green-800" },
    { name: "Blue channel", tone: "border-blue-300 bg-blue-50 text-blue-800" },
  ];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">An RGB filter covers all three colour channels</p>
        <p className="mt-1 text-sm text-slate-600">The earlier arithmetic used one grid so the multiplication was easy to see. A real first-layer filter for a colour image has depth as well as height and width.</p>
      </div>
      <div className="grid items-center gap-4 p-5 md:grid-cols-[1fr_auto_1.2fr_auto_0.8fr] md:p-6">
        <div className="space-y-2">
          {channelColors.map((channel) => <div key={channel.name} className={`rounded-lg border p-3 text-center text-sm font-bold ${channel.tone}`}>{channel.name}<span className="mt-1 block font-mono text-xs">image patch: 3 × 3</span></div>)}
        </div>
        <span className="text-center text-2xl font-black text-slate-400">×</span>
        <div className="space-y-2 rounded-xl border-2 border-amber-300 bg-amber-50 p-3">
          {channelColors.map((channel) => <div key={channel.name} className="rounded-lg bg-white px-3 py-2 text-center text-xs font-bold text-slate-700">3 × 3 filter slice for {channel.name.split(" ")[0]}</div>)}
          <p className="pt-1 text-center font-mono text-xs font-bold text-amber-900">3 × 3 × 3 = 27 weights</p>
        </div>
        <span className="text-center text-2xl font-black text-slate-400">→</span>
        <div className="rounded-xl border-2 border-fuchsia-300 bg-fuchsia-50 p-5 text-center"><p className="text-sm font-bold text-fuchsia-900">Add 27 products<br />+ one bias</p><span className="my-3 block text-2xl text-fuchsia-500">↓</span><p className="rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-slate-900">one output value</p></div>
      </div>
      <div className="grid gap-3 border-t border-slate-200 bg-indigo-50 px-5 py-5 text-sm md:grid-cols-2 md:px-6">
        <div className="rounded-xl bg-white p-4 text-slate-700"><strong className="block text-indigo-900">One filter → one feature map</strong>The same 3 × 3 × 3 filter visits every spatial position. Its output values form one 2D response grid.</div>
        <div className="rounded-xl bg-white p-4 text-slate-700"><strong className="block text-indigo-900">64 filters → 64 output channels</strong>Each filter has different weights and produces its own feature map. Stacking 64 maps gives an output with 64 channels.</div>
      </div>
    </figure>
  );
}

function PaddingStrideFigure() {
  const inner = Array.from({ length: 25 }, (_, index) => index);
  const padded = Array.from({ length: 49 }, (_, index) => {
    const row = Math.floor(index / 7);
    const column = index % 7;
    return row === 0 || row === 6 || column === 0 || column === 6;
  });
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-6 p-5 lg:grid-cols-2 md:p-6">
        <div>
          <p className="font-bold text-slate-900">Padding changes what happens at the border</p>
          <div className="mt-4 grid grid-cols-2 items-start gap-4 text-center">
            <div><p className="mb-2 text-xs font-extrabold uppercase text-rose-700">No padding</p><div className="mx-auto grid max-w-44 grid-cols-5">{inner.map((cell) => <span key={cell} className="aspect-square border border-rose-200 bg-rose-50" />)}</div><p className="mt-2 text-xs text-slate-600">5 × 5 input<br />3 × 3 output</p></div>
            <div><p className="mb-2 text-xs font-extrabold uppercase text-emerald-700">Padding = 1</p><div className="mx-auto grid max-w-44 grid-cols-7">{padded.map((isPadding, index) => <span key={index} className={`aspect-square border ${isPadding ? "border-blue-300 bg-blue-100" : "border-emerald-200 bg-emerald-50"}`}>{isPadding && <span className="flex h-full items-center justify-center text-[10px] font-bold text-blue-700">0</span>}</span>)}</div><p className="mt-2 text-xs text-slate-600">zeros form a border<br />5 × 5 output</p></div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">Without padding, the filter cannot be centred on an edge pixel without extending beyond the image. A one-cell zero border gives it legal positions around the edge and preserves the 5 × 5 spatial size when the filter is 3 × 3 and stride is 1.</p>
        </div>
        <div className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="font-bold text-slate-900">Stride is the distance moved after each calculation</p>
          <div className="mt-5 space-y-5">
            <div><p className="mb-2 text-sm font-bold text-blue-800">Stride = 1</p><div className="flex items-center gap-2">{[1, 2, 3, 4, 5].map((n) => <React.Fragment key={n}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800">{n}</span>{n < 5 && <span className="text-blue-400">→</span>}</React.Fragment>)}</div><p className="mt-2 text-xs text-slate-600">Visit neighbouring starting positions.</p></div>
            <div><p className="mb-2 text-sm font-bold text-violet-800">Stride = 2</p><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 font-bold text-violet-800">1</span><span className="text-violet-400">────→</span><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 font-bold text-violet-800">3</span><span className="text-violet-400">────→</span><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 font-bold text-violet-800">5</span></div><p className="mt-2 text-xs text-slate-600">Skip one position each time, so fewer outputs are created.</p></div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function ReceptiveFieldFigure() {
  const stages = [
    { title: "Layer 1 value", area: "sees 3 × 3 pixels", box: "h-16 w-16", tone: "border-blue-400 bg-blue-100 text-blue-900" },
    { title: "Layer 2 value", area: "combines a 3 × 3 area of Layer 1", box: "h-24 w-24", tone: "border-emerald-400 bg-emerald-100 text-emerald-900" },
    { title: "Deeper value", area: "depends on a larger image area", box: "h-32 w-32", tone: "border-violet-400 bg-violet-100 text-violet-900" },
  ];
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="font-bold text-slate-900">A receptive field grows through connected local views</p>
      <div className="mt-5 grid items-end gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {stages.map((stage, index) => <React.Fragment key={stage.title}><div className="flex flex-col items-center text-center"><div className={`grid grid-cols-3 ${stage.box} overflow-hidden border-2 ${stage.tone}`}>{Array.from({ length: 9 }, (_, cell) => <span key={cell} className="border border-white/70" />)}</div><p className="mt-3 text-sm font-extrabold text-slate-900">{stage.title}</p><p className="mt-1 text-xs leading-relaxed text-slate-600">{stage.area}</p></div>{index < stages.length - 1 && <span className="pb-16 text-center text-2xl font-black text-slate-400">→</span>}</React.Fragment>)}
      </div>
      <figcaption className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">The deeper value does not receive the whole original image directly. It receives earlier values that have already collected information from overlapping local regions. For two stride-1, 3 × 3 convolutions, a Layer 2 value is influenced by a 5 × 5 region of the original image.</figcaption>
    </figure>
  );
}

function LogitsFlowFigure() {
  const logits = [["Cat", "2.3"], ["Dog", "0.8"], ["Horse", "−1.1"]];
  const probabilities = [["Cat", "0.79"], ["Dog", "0.18"], ["Horse", "0.03"]];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid items-center gap-4 p-5 md:grid-cols-[1fr_auto_1fr_auto_0.8fr] md:p-6">
        <div className="rounded-xl border border-slate-300 bg-slate-50 p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-slate-600">Logits: raw scores</p><div className="mt-3 space-y-2">{logits.map(([label, value]) => <div key={label} className="flex justify-between rounded bg-white px-3 py-2 text-sm"><strong>{label}</strong><span className="font-mono">{value}</span></div>)}</div><p className="mt-3 text-xs leading-relaxed text-slate-600">They may be negative and do not have to add to 1.</p></div>
        <div className="text-center"><span className="text-2xl font-black text-slate-400">→</span><p className="mt-1 text-xs font-bold text-indigo-700">Softmax</p></div>
        <div className="rounded-xl border border-blue-300 bg-blue-50 p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-blue-700">Probabilities</p><div className="mt-3 space-y-2">{probabilities.map(([label, value]) => <div key={label} className="flex justify-between rounded bg-white px-3 py-2 text-sm"><strong>{label}</strong><span className="font-mono">{value}</span></div>)}</div><p className="mt-3 text-xs leading-relaxed text-slate-600">They are between 0 and 1 and add to 1.</p></div>
        <div className="text-center"><span className="text-2xl font-black text-slate-400">→</span><p className="mt-1 text-xs font-bold text-indigo-700">highest</p></div>
        <div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-5 text-center"><p className="text-xs font-extrabold uppercase text-emerald-700">Prediction</p><p className="mt-2 text-2xl font-black text-emerald-900">Cat</p></div>
      </div>
      <figcaption className="border-t border-slate-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-950"><strong>During training, pass the logits directly to PyTorch&apos;s <code>CrossEntropyLoss</code>.</strong> It performs the softmax-and-log calculation internally in a numerically stable way. Apply softmax yourself only when you need readable probabilities for interpretation or display.</figcaption>
    </figure>
  );
}

function TensorShapeFigure() {
  const dimensions = [
    { letter: "N", value: "32", meaning: "images in this batch", tone: "border-violet-300 bg-violet-50 text-violet-900" },
    { letter: "C", value: "3", meaning: "RGB channels per image", tone: "border-rose-300 bg-rose-50 text-rose-900" },
    { letter: "H", value: "64", meaning: "pixel rows (height)", tone: "border-emerald-300 bg-emerald-50 text-emerald-900" },
    { letter: "W", value: "64", meaning: "pixel columns (width)", tone: "border-blue-300 bg-blue-50 text-blue-900" },
  ];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 md:p-6">
        <p className="font-bold text-slate-900">Decode 32 × 3 × 64 × 64 instead of memorizing it</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{dimensions.map((dimension) => <div key={dimension.letter} className={`rounded-xl border p-4 text-center ${dimension.tone}`}><p className="text-xs font-extrabold uppercase">{dimension.letter}</p><p className="mt-1 text-2xl font-black">{dimension.value}</p><p className="mt-1 text-xs leading-relaxed">{dimension.meaning}</p></div>)}</div>
      </div>
      <div className="grid gap-3 border-t border-slate-200 bg-slate-50 p-5 md:grid-cols-3 md:p-6">
        <div className="rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700"><strong className="block text-indigo-900">Conv 3 → 16</strong>Each image enters with 3 RGB channels. The layer owns 16 different filters, so it returns 16 feature maps.</div>
        <div className="rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700"><strong className="block text-indigo-900">Conv 16 → 32</strong>Each second-layer filter is 3 × 3 × 16 because it must see all 16 incoming maps. There are 32 such filters, so 32 maps leave.</div>
        <div className="rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700"><strong className="block text-indigo-900">Pool to 1 × 1, then flatten</strong>Average every final map into one number. For each image, 32 × 1 × 1 then becomes a simple list of 32 values for the classifier.</div>
      </div>
    </figure>
  );
}

function FeatureHierarchyFigure() {
  const columns = [
    { title: "Pixels", items: ["light", "dark", "colour"], color: "blue" },
    { title: "Early feature maps", items: ["— edge", "╱ diagonal", "⌜ corner"], color: "emerald" },
    { title: "Middle feature maps", items: ["curve", "texture", "small part"], color: "amber" },
    { title: "Later representation", items: ["eye", "wheel", "leaf spots"], color: "violet" },
    { title: "Prediction", items: ["cat", "car", "disease"], color: "rose" },
  ];
  const colors: Record<string, string> = { blue: "border-blue-200 bg-blue-50 text-blue-900", emerald: "border-emerald-200 bg-emerald-50 text-emerald-900", amber: "border-amber-200 bg-amber-50 text-amber-900", violet: "border-violet-200 bg-violet-50 text-violet-900", rose: "border-rose-200 bg-rose-50 text-rose-900" };
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-2 font-bold text-slate-900">A CNN builds a hierarchy rather than recognizing an object in one jump</p>
      <p className="mb-5 text-sm leading-relaxed text-slate-600">Every later value depends on a wider area of the original image, called its receptive field.</p>
      <div className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
        {columns.map((column, index) => (
          <React.Fragment key={column.title}>
            <div className={`rounded-xl border p-4 text-center ${colors[column.color]}`}><p className="text-xs font-extrabold uppercase tracking-wide">{column.title}</p><div className="mt-3 space-y-1">{column.items.map((item) => <p key={item} className="rounded bg-white/70 px-2 py-1 text-xs font-semibold">{item}</p>)}</div></div>
            {index < columns.length - 1 && <span className="text-center text-xl font-black text-slate-400">→</span>}
          </React.Fragment>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-slate-600">The labels above are conceptual. A trained feature map is a grid of numerical responses, and individual channels do not always correspond to one clean human concept.</figcaption>
    </figure>
  );
}

function PoolingFigure() {
  const input = [[1, 7, 2, 3], [5, 4, 1, 6], [8, 2, 9, 0], [3, 1, 4, 5]];
  const output = [[7, 6], [8, 9]];
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_0.65fr]">
        <div><p className="mb-3 text-center text-sm font-extrabold text-slate-700">4 × 4 feature map</p><Matrix values={input} highlightArea={[2, 2]} /></div>
        <div className="text-center"><p className="text-3xl font-black text-slate-400">→</p><p className="mt-1 text-xs font-bold text-slate-500">2 × 2 max pool<br />stride 2</p></div>
        <div><p className="mb-3 text-center text-sm font-extrabold text-slate-700">2 × 2 result</p><Matrix values={output} activeCell={[0, 0]} /></div>
      </div>
      <figcaption className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">The highlighted 2 × 2 window contains 1, 7, 5 and 4, so max pooling keeps <strong>7</strong> as the highlighted output. Stride 2 then moves to the next non-overlapping window. The four windows produce 7, 6, 8 and 9. Pooling lowers width and height, but it discards exact location and the other values; it does not change the number of channels.</figcaption>
    </figure>
  );
}

const termRows = [
  ["Pixel", "One location in an image grid. A colour pixel usually contains red, green and blue numbers."],
  ["Channel", "One aligned grid of values. RGB input has 3 channels; a hidden CNN can have dozens or hundreds of learned feature channels."],
  ["Patch / local region", "The small part of the input currently covered by a filter."],
  ["Filter / kernel", "A small learnable grid of weights. It asks the same numerical pattern question at many image positions."],
  ["Feature map", "The grid of responses produced by one filter as it visits every valid position."],
  ["Stride", "How many cells the filter moves between positions. Larger stride produces fewer output locations."],
  ["Padding", "Extra border values added around the input, often zeros, to control output size and include border positions."],
  ["Receptive field", "The region of the original image that can influence one hidden activation."],
  ["Bias", "One additional trainable number added to a filter's response. Each output filter normally has one bias shared across its positions."],
  ["Pooling", "A fixed summary operation that replaces a small window with one value, often its maximum or average."],
  ["Logit", "A raw class score produced by the classifier before softmax turns scores into probabilities."],
] as const;

export function CNNContent() {
  return (
    <div className="prose prose-lg max-w-none text-slate-700">
      <section className="not-prose mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-800 px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-sky-200">Deep Learning · Computer Vision</p>
        <h2 className="max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl">How a Model Learns to Recognize Images</h2>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-sky-50 md:text-xl">A Convolutional Neural Network (CNN) is a neural network built to learn visual patterns while keeping track of where those patterns occur. We will follow one image all the way from raw pixels to a class prediction, calculate a convolution by hand, see how filters are learned and reused, understand padding, stride and pooling, trace tensor shapes, and build a small image classifier.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Job: Turn a Picture Into an Informed Decision</h2>
        <p className="text-lg leading-relaxed">Consider a camera above a factory conveyor belt. For each product, the system must answer: <strong>acceptable or damaged?</strong> A scratch may appear near the top, middle or bottom. It may be short or long, but its local visual pattern is similar wherever it appears.</p>
        <p className="text-lg leading-relaxed">A CNN solves this task in stages. First it learns small reusable pattern detectors. Early layers may respond to borders or colour changes. Later layers combine nearby responses into textures and parts, then combine parts into evidence for a whole object. A final classifier converts that evidence into scores for the possible answers.</p>
        <CnnJourneyFigure />
        <p className="text-lg leading-relaxed">The name now becomes less mysterious: <strong>neural network</strong> means connected layers with trainable weights; <strong>convolutional</strong> refers to the repeated local calculation used to create those early and intermediate feature maps.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Why Ordinary Dense Connections Are Wasteful for Images</h2>
        <p className="text-lg leading-relaxed">A computer receives an image as numbers arranged in a grid. In a <strong>224 × 224 colour image</strong>, the first 224 is the number of pixel columns across the image, the second 224 is the number of pixel rows from top to bottom, and the 3 is the number of colour values stored at every location.</p>
        <ImageValuesFigure />
        <p className="text-lg leading-relaxed">Now compare two ways of connecting those 150,528 values to 64 outputs. A <strong>parameter</strong> is a trainable number—a weight or bias—that training is allowed to change.</p>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-950">Dense layer: every input connects to every neuron</p><p className="mt-3 text-sm leading-relaxed text-slate-700"><strong>150,528 inputs × 64 neurons</strong> because every one of the 64 neurons needs a separate weight for every image value.</p><p className="mt-3 font-mono text-sm leading-7 text-slate-800">150,528 × 64 = 9,633,792 weights<br />+ 64 biases (one per neuron)<br />= <strong>9,633,856 parameters</strong></p></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">Convolution: 64 small filters are reused</p><p className="mt-3 text-sm leading-relaxed text-slate-700"><strong>3 filter rows × 3 filter columns × 3 RGB channels × 64 filters</strong>, plus one bias for each filter.</p><p className="mt-3 font-mono text-sm leading-7 text-slate-800">3 × 3 × 3 × 64 = 1,728 weights<br />+ 64 biases<br />= <strong>1,792 parameters</strong></p></div>
        </div>
        <p className="mt-5 text-lg leading-relaxed">The dramatic reduction comes from two ideas. <strong>Local connectivity</strong> means one output examines a small nearby patch rather than the whole image. <strong>Weight sharing</strong> means the same filter weights are reused at the top, middle and bottom instead of learning a new copy at every location. The filter can therefore search for the same scratch pattern wherever it appears.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Vocabulary for Reading a CNN Diagram</h2>
        <p className="text-lg leading-relaxed">Before calculating anything, connect each term to a physical role. A filter is not a ready-made “cat detector.” It begins with small weight values and is adjusted by training until its responses help reduce the loss.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[760px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Term</th><th className="p-3 text-left">Meaning in plain language</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{termRows.map(([term, meaning]) => <tr key={term} className="align-top"><td className="p-3 font-bold text-indigo-800">{term}</td><td className="p-3 text-slate-700">{meaning}</td></tr>)}</tbody></table></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Calculate One Convolution by Hand</h2>
        <p className="text-lg leading-relaxed">Before calculating anything, we need to know what the filter is trying to do. A <strong>filter</strong>, also called a <strong>kernel</strong>, is a small grid of numerical weights. Instead of asking one enormous question about the entire image, it asks the same small local question at many positions.</p>
        <FilterMeaningFigure />
        <p className="text-lg leading-relaxed">At one position, the layer pairs the filter with the equally sized image patch, multiplies values in matching cells, adds the products, and finally adds one bias. In our hand calculation the bias is <strong>0</strong>, so it does not change the result. The sum becomes one number because the purpose is to summarize how strongly that whole patch matches this filter.</p>
        <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">One output at row i, column j</p><p className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-xl font-bold">z<sub>i,j</sub> = b + Σ<sub>u</sub> Σ<sub>v</sub> X<sub>i+u,j+v</sub>K<sub>u,v</sub></p><p className="mt-3 text-sm leading-relaxed text-slate-200"><strong>X</strong> is the input grid, <strong>K</strong> is the filter, <strong>u and v</strong> visit positions inside the filter, <strong>b</strong> is one learned bias for the output channel, and <strong>z</strong> is the filter response.</p></div>
        <ConvolutionCalculationFigure />
        <h3 className="text-xl font-bold text-slate-900">What Changes for a Colour Image?</h3>
        <p className="text-lg leading-relaxed">The hand calculation used one 2D grid only to make the nine products visible. An RGB image has three aligned input grids, so a first-layer filter must look through all three. A 3 × 3 RGB filter therefore contains a 3 × 3 slice for Red, another for Green, and another for Blue.</p>
        <RgbConvolutionFigure />
        <h3 className="text-xl font-bold text-slate-900">A Short ReLU Reminder</h3>
        <p className="text-lg leading-relaxed">A convolution is commonly followed by the ReLU activation function: <strong>ReLU(x) = max(0, x)</strong>. Positive responses remain, while negative responses become zero. For example, <code>[3, −2, 5]</code> becomes <code>[3, 0, 5]</code>. This lets the next layer focus on where the current filter produced a positive response. The <a href="/learn/activation-functions">Activation Functions lesson</a> explains the function in full.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Filters Are Learned Through the Same Training Loop</h2>
        <p className="text-lg leading-relaxed">The values <code>1, 0, −1</code> belonged only to our teaching filter. A real CNN normally begins with small initialized filter weights. A <strong>forward pass</strong> uses them to make a prediction; the <strong>loss</strong> measures the error; <strong>backpropagation</strong> calculates how every weight contributed to that error; and the <strong>optimizer</strong> adjusts the weights. Repeating this cycle over many labelled images allows useful filters to emerge. The image does not directly supply the filter values, and the values do not remain fixed during training.</p>
        <FeatureHierarchyFigure />
        <ReceptiveFieldFigure />
        <div className="not-prose rounded-xl border border-violet-200 bg-violet-50 p-5 text-sm leading-relaxed text-violet-950"><strong>Translation equivariance, not magic position independence:</strong> if an input pattern shifts, a convolutional feature tends to shift with it. Pooling, global aggregation, data augmentation and the full architecture can make the final prediction less sensitive to small shifts, but a CNN is not automatically invariant to every translation, rotation or scale change.</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Padding and Stride Control Where the Filter Visits</h2>
        <p className="text-lg leading-relaxed"><strong>Padding</strong> adds border cells around the input, usually zeros. It lets a filter visit locations near an image edge without hanging outside the available grid. <strong>Stride</strong> is simply how far the filter moves after each calculation. These choices determine how many legal filter positions—and therefore how many output cells—exist.</p>
        <PaddingStrideFigure />
        <p className="text-lg leading-relaxed">The visual gives the intuition; the following formula counts the positions precisely. It applies to one spatial direction at a time, so calculate it once for height and once for width.</p>
        <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Output size for one spatial dimension</p><p className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-xl font-bold">N<sub>out</sub> = floor((N + 2P − K) / S) + 1</p><p className="mt-3 text-sm leading-relaxed text-slate-200"><strong>N</strong> is the input height or width, <strong>K</strong> is the filter height or width, <strong>P</strong> is the border added on each side, and <strong>S</strong> is the movement step. <strong>floor</strong> means discard any incomplete final placement. This beginner formula assumes dilation 1, which is the default used in our code.</p></div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5"><p className="font-bold text-blue-950">No padding</p><p className="mt-2 text-sm text-slate-700">5 input cells − 3 filter cells leaves room for starting positions 1, 2 and 3.</p><p className="mt-2 font-mono text-sm leading-7">N=5, K=3, P=0, S=1<br />floor((5−3)/1)+1<br />= <strong>3</strong></p></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">“Same” spatial size</p><p className="mt-2 text-sm text-slate-700">Padding 1 adds one cell to both sides, so <strong>2P = 2</strong>.</p><p className="mt-2 font-mono text-sm leading-7">N=5, K=3, P=1, S=1<br />floor((5+2−3)/1)+1<br />= <strong>5</strong></p></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-950">Stride 2</p><p className="mt-2 text-sm text-slate-700">Move two cells per calculation instead of one, creating fewer positions.</p><p className="mt-2 font-mono text-sm leading-7">N=5, K=3, P=1, S=2<br />floor((5+2−3)/2)+1<br />= <strong>3</strong></p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Pooling Summarizes Nearby Responses</h2>
        <p className="text-lg leading-relaxed">After a feature has been detected, the exact pixel location may be less important than whether a strong response exists nearby. A <strong>pooling window</strong> is a small region examined at one time. <strong>Max pooling</strong> replaces that region with its largest value; <strong>average pooling</strong> replaces it with the mean. Neither operation has trainable weights.</p>
        <PoolingFigure />
        <p className="text-lg leading-relaxed">Pooling reduces memory and lets later values summarize wider regions, but it throws information away. For tasks that need precise locations—such as segmentation—architectures preserve or later restore spatial detail. Many modern classifiers use strided convolutions for intermediate downsampling and <strong>global average pooling</strong> near the end. “Global” means the window covers an entire feature map: a 32 × 32 map has 1,024 values, and averaging them produces one summary value for that channel.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Follow the Tensor Shapes Through a Small Classifier</h2>
        <p className="text-lg leading-relaxed">A <strong>tensor</strong> is a multidimensional arrangement of numbers, and its <strong>shape</strong> states how many values exist along each dimension. PyTorch image batches use <strong>N × C × H × W</strong>: number of images, channels, height in rows, and width in columns.</p>
        <TensorShapeFigure />
        <p className="text-lg leading-relaxed">Now follow those meanings through the complete model. Height and width describe <em>where</em> responses occur; channels describe <em>which learned filters</em> produced them.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[900px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Stage</th><th className="p-3 text-left">Operation</th><th className="p-3 text-left">Output for batch of 32</th><th className="p-3 text-left">Meaning</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{[
          ["Input", "32 colour images", "32 × 3 × 64 × 64", "Three RGB numbers at each location"],
          ["Block 1", "3×3 Conv: 3 input channels → 16 filters; padding 1; then ReLU", "32 × 16 × 64 × 64", "One map from each of 16 filters; padding preserves height and width"],
          ["Downsample", "2×2 MaxPool, stride 2", "32 × 16 × 32 × 32", "Each non-overlapping 2×2 window becomes one value, halving height and width; 16 channels remain"],
          ["Block 2", "3×3 Conv: 16 input channels → 32 filters; padding 1; then ReLU", "32 × 32 × 32 × 32", "Each of 32 filters combines information from all 16 incoming maps"],
          ["Aggregate", "Adaptive global average pool to 1×1", "32 × 32 × 1 × 1", "For every image, each of its 32 maps is averaged into one number"],
          ["Flatten", "Remove the two size-1 spatial dimensions", "32 × 32", "Each image is now represented by a list of 32 learned values"],
          ["Classifier", "Linear: 32 inputs → 4 classes", "32 × 4", "Four raw class scores, called logits, for each image"],
        ].map(([stage, operation, shape, meaning]) => <tr key={stage} className="align-top"><td className="p-3 font-bold text-indigo-800">{stage}</td><td className="p-3 text-slate-700">{operation}</td><td className="p-3 font-mono text-slate-900">{shape}</td><td className="p-3 text-slate-700">{meaning}</td></tr>)}</tbody></table></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">From Raw Class Scores to the Predicted Class</h2>
        <p className="text-lg leading-relaxed">The final linear layer produces one number per possible class. These raw numbers are called <strong>logits</strong>. A logit is evidence, not yet a probability: it may be negative, and the logits do not need to add to 1. <strong>Softmax</strong> converts the set into probabilities while preserving their order, and the largest probability becomes the predicted class.</p>
        <LogitsFlowFigure />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Implement the Shape Trace in PyTorch</h2>
        <p className="text-lg leading-relaxed">The code follows the preceding table. In <code>Conv2d(3, 16, kernel_size=3, padding=1)</code>, 3 means three incoming RGB channels, 16 means sixteen learned filters and output maps, <code>kernel_size=3</code> means each filter is 3 × 3 spatially, and <code>padding=1</code> adds one border cell on every side.</p>
        <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">small_cnn.py</div><pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`import torch
from torch import nn

class SmallCNN(nn.Module):
    def __init__(self, classes=4):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1)),
        )
        self.classifier = nn.Linear(32, classes)

    def forward(self, images):
        maps = self.features(images)       # [N, 32, 1, 1]
        features = maps.flatten(start_dim=1)  # [N, 32]
        return self.classifier(features)   # [N, 4] logits

model = SmallCNN(classes=4)
images = torch.randn(32, 3, 64, 64)
labels = torch.randint(0, 4, (32,))

logits = model(images)
loss = nn.CrossEntropyLoss()(logits, labels)
loss.backward()  # gradients now exist for filters and classifier weights

print(logits.shape)  # torch.Size([32, 4])
print(float(loss))`}</pre></div>
        <div className="not-prose mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-slate-700"><strong className="text-blue-950">What <code>AdaptiveAvgPool2d((1, 1))</code> does:</strong> it divides each incoming feature map into regions as needed and averages it to the requested output height 1 and width 1. The number of channels stays 32.</div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm leading-relaxed text-slate-700"><strong className="text-violet-950">What <code>flatten(start_dim=1)</code> does:</strong> it keeps dimension 0—the batch of 32 images—and joins each image&apos;s remaining 32 × 1 × 1 values into a list of 32 values.</div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">For a real project, load normalized training/validation data, use an optimizer, call <code>zero_grad()</code> before each backward pass, and monitor held-out metrics. The previous training-loop and augmentation lessons cover those pieces.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Choose a CNN When Its Assumptions Fit the Task</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[920px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Situation</th><th className="p-3 text-left">Good starting point</th><th className="p-3 text-left">Reason</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{[
          ["Small or medium image dataset", "Pretrained CNN + fine-tuning", "Strong local visual bias and mature pretrained backbones"],
          ["Mobile or edge image inference", "Efficient CNN family", "Convolutions can offer a practical speed/accuracy/memory trade-off"],
          ["Very large-scale vision with strong pretraining", "Compare CNN and Vision Transformer", "Transformers model global relationships differently; the best choice is empirical"],
          ["Tabular rows with unrelated columns", "Tree model or MLP", "Neighbouring columns usually do not have image-like spatial meaning"],
          ["Tiny, fixed problem with handcrafted measurements", "Classical ML baseline", "A CNN may add needless data and compute requirements"],
          ["Precise pixel labelling", "Segmentation CNN such as U-Net", "A classification head alone discards the spatial output needed"],
        ].map(([situation, choice, reason]) => <tr key={situation} className="align-top"><td className="p-3 font-bold text-slate-900">{situation}</td><td className="p-3 font-bold text-indigo-800">{choice}</td><td className="p-3 text-slate-700">{reason}</td></tr>)}</tbody></table></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Common CNN Mistakes and Limits</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          {[
            ["Shape mismatch in the classifier", "Print N×C×H×W after each stage. Prefer adaptive/global pooling when input sizes may vary."],
            ["Wrong channel order", "PyTorch layers expect N×C×H×W, while many image arrays arrive as N×H×W×C. Permute deliberately."],
            ["Softmax before CrossEntropyLoss", "Pass logits directly. Applying softmax first changes the intended numerically stable calculation."],
            ["Feature maps become 0×0", "Too many valid convolutions or pooling operations shrink small inputs. Recalculate the output-size formula."],
            ["High accuracy from backgrounds", "Inspect errors and saliency cautiously; collect diverse backgrounds and use valid augmentation."],
            ["Assuming complete shift/rotation invariance", "Test controlled transformations. Use appropriate augmentation or architecture changes when the task requires them."],
          ].map(([title, body]) => <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="font-bold text-indigo-900">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div>)}
        </div>
        <div className="not-prose mt-5 rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm leading-relaxed text-rose-950"><strong>Important limits:</strong> CNNs can require substantial labelled data and compute, learn spurious shortcuts, fail under distribution shift or adversarial perturbations, and remain difficult to interpret. A confident score is not proof that the model used the right visual evidence.</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The CNN in One Connected Explanation</h2>
        <div className="not-prose rounded-2xl border border-blue-200 bg-blue-50 p-6"><p className="text-lg font-bold leading-relaxed text-blue-950">A CNN learns small filters, reuses each filter across an image, records the responses in feature maps, combines local responses into increasingly large patterns, reduces spatial size when useful, and turns the final representation into class scores. Backpropagation and an optimizer learn every filter from labelled examples.</p><ul className="mt-4 space-y-2 pl-5 text-sm leading-relaxed text-slate-700"><li>Local connectivity asks about nearby pixels.</li><li>Weight sharing detects the same pattern at different positions with the same parameters.</li><li>Padding, stride and pooling control spatial size and information loss.</li><li>Channels hold different learned pattern responses.</li><li>The output-size and parameter-count calculations let you verify an architecture before training.</li></ul></div>
      </section>

      <section>
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Continue Learning</h2>
        <div className="not-prose mb-10 grid gap-4 md:grid-cols-2"><a href="/learn/data-augmentation-deep-learning" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Previous concept</p><p className="m-0 font-bold text-slate-900">Data Augmentation</p></a><a href="/learn/cnn-architectures-resnet" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Next concept</p><p className="m-0 font-bold text-slate-900">CNN Architectures: AlexNet to ResNet</p></a></div>
      </section>
    </div>
  );
}
