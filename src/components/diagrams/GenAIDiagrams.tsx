import React, { useId } from "react";

type Tone = "sky" | "violet" | "amber" | "emerald" | "rose" | "slate";

const palette: Record<Tone, { fill: string; stroke: string; text: string }> = {
  sky: { fill: "#e0f2fe", stroke: "#0284c7", text: "#0c4a6e" },
  violet: { fill: "#ede9fe", stroke: "#7c3aed", text: "#4c1d95" },
  amber: { fill: "#fef3c7", stroke: "#d97706", text: "#78350f" },
  emerald: { fill: "#d1fae5", stroke: "#059669", text: "#064e3b" },
  rose: { fill: "#ffe4e6", stroke: "#e11d48", text: "#881337" },
  slate: { fill: "#f8fafc", stroke: "#64748b", text: "#0f172a" },
};

type GenAIFigureProps = {
  title: string;
  caption: string;
  description: string;
  children: React.ReactNode;
};

export function GenAIFigure({ title, caption, description, children }: GenAIFigureProps) {
  const prefix = useId().replace(/:/g, "");
  const titleId = `${prefix}-title`;
  const captionId = `${prefix}-caption`;
  const descriptionId = `${prefix}-description`;

  return (
    <figure
      className="not-prose overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-labelledby={titleId}
      aria-describedby={`${captionId} ${descriptionId}`}
    >
      <figcaption className="mb-4">
        <p id={titleId} className="font-bold text-slate-900">{title}</p>
        <p id={captionId} className="mt-1 text-sm leading-relaxed text-slate-600">{caption}</p>
      </figcaption>
      <p id={descriptionId} className="sr-only">{description}</p>
      {children}
    </figure>
  );
}

type DiagramCanvasProps = {
  viewBox: string;
  children: React.ReactNode;
  className?: string;
};

export function DiagramCanvas({ viewBox, children, className = "" }: DiagramCanvasProps) {
  return (
    <svg
      viewBox={viewBox}
      className={`h-auto w-full ${className}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

type DiagramNodeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail?: string;
  tone?: Tone;
  dashed?: boolean;
  badge?: string;
};

export function DiagramNode({
  x,
  y,
  width,
  height,
  title,
  detail,
  tone = "violet",
  dashed = false,
  badge,
}: DiagramNodeProps) {
  const colors = palette[tone];
  const titleY = detail ? y + height / 2 - 5 : y + height / 2 + 5;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="12"
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth="2"
        strokeDasharray={dashed ? "7 5" : undefined}
      />
      {badge && (
        <>
          <rect x={x + width - 58} y={y + 7} width="49" height="18" rx="9" fill="#ffffff" stroke={colors.stroke} />
          <text x={x + width - 33.5} y={y + 20} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={colors.text}>{badge}</text>
        </>
      )}
      <text x={x + width / 2} y={titleY} textAnchor="middle" fontSize="15" fontWeight="700" fill={colors.text}>
        {title}
      </text>
      {detail && (
        <text x={x + width / 2} y={titleY + 19} textAnchor="middle" fontSize="13" fill="#475569">
          {detail}
        </text>
      )}
    </g>
  );
}

type ConnectorProps = {
  d: string;
  markerId: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  dashed?: boolean;
  tone?: Tone;
  width?: number;
};

export function Connector({
  d,
  markerId,
  label,
  labelX = 0,
  labelY = 0,
  dashed = false,
  tone = "violet",
  width = 2.5,
}: ConnectorProps) {
  const colors = palette[tone];
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={colors.stroke}
        strokeWidth={width}
        strokeDasharray={dashed ? "7 6" : undefined}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text x={labelX} y={labelY} textAnchor="middle" fontSize="13" fontWeight="700" fill={colors.text}>
          {label}
        </text>
      )}
    </g>
  );
}

type BoundaryProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  tone?: Tone;
};

export function Boundary({ x, y, width, height, label, tone = "slate" }: BoundaryProps) {
  const colors = palette[tone];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="18" fill={colors.fill} fillOpacity="0.42" stroke={colors.stroke} strokeWidth="2" strokeDasharray="8 6" />
      <rect x={x + 12} y={y - 12} width={Math.max(92, label.length * 8.2)} height="25" rx="12" fill="#ffffff" stroke={colors.stroke} />
      <text x={x + 23} y={y + 5} fontSize="14" fontWeight="800" fill={colors.text}>{label}</text>
    </g>
  );
}

function ArrowMarker({ id, tone = "violet" }: { id: string; tone?: Tone }) {
  return (
    <marker id={id} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,4.5 L0,9 z" fill={palette[tone].stroke} />
    </marker>
  );
}

export function Legend({
  items,
}: {
  items: Array<{ tone: Tone; label: string; shape?: "solid" | "dashed" }>;
}) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600" aria-hidden="true">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span
            className="h-3 w-5 rounded-sm"
            style={{
              backgroundColor: palette[item.tone].fill,
              border: `2px ${item.shape === "dashed" ? "dashed" : "solid"} ${palette[item.tone].stroke}`,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function ProductImage({ x, y, generated = false }: { x: number; y: number; generated?: boolean }) {
  return (
    <g>
      {generated && <path d={`M${x - 5} ${y + 8} l4 2 l2 4 l2 -4 l4 -2 l-4 -2 l-2 -4 l-2 4 z`} fill="#d97706" />}
      <rect x={x} y={y} width="70" height="50" rx="8" fill={generated ? "#fef3c7" : "#e0f2fe"} stroke={generated ? "#d97706" : "#0284c7"} strokeWidth="2" />
      <rect x={x + 22} y={y + 15} width="26" height="25" rx="4" fill={generated ? "#a78bfa" : "#38bdf8"} />
      <path d={`M${x + 27} ${y + 15} q8 -11 16 0`} fill="none" stroke="#475569" strokeWidth="2" />
    </g>
  );
}

export function TrainingGenerationLifecycleFigure() {
  const marker = "genai-lifecycle-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Training changes the model; generation uses it"
      caption="Follow the upper lane first: loss sends an update back into training, so the parameters change. In the lower lane, the saved generator is reused with its parameters fixed."
      description="Two connected lanes. Training sends examples into training, measures loss, feeds an update back, and saves a learned generator. Generation sends a condition and random seed into the same learned generator, whose parameters are fixed, to produce a candidate output."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 940 500">
          <defs><ArrowMarker id={marker} /></defs>
          <Boundary x={20} y={45} width={900} height={190} label="TRAINING · PARAMETERS CHANGE" tone="sky" />
          <Boundary x={20} y={285} width={900} height={170} label="GENERATION · PARAMETERS FIXED" tone="amber" />

          <DiagramNode x={55} y={105} width={150} height={72} title="Examples" detail="observed data" tone="sky" />
          <DiagramNode x={280} y={105} width={150} height={72} title="Training" detail="adjust parameters" tone="violet" />
          <DiagramNode x={505} y={105} width={150} height={72} title="Loss / error" detail="compare result" tone="rose" />
          <DiagramNode x={730} y={105} width={150} height={72} title="Learned generator" detail="saved parameters" tone="violet" badge="MODEL" />
          <Connector d="M205 141 H280" markerId={marker} />
          <Connector d="M430 141 H505" markerId={marker} />
          <Connector d="M655 141 H730" markerId={marker} label="save" labelX={693} labelY={128} />
          <Connector d="M580 177 C580 222 355 226 355 180" markerId={marker} label="parameter update" labelX={470} labelY={218} tone="rose" />

          <DiagramNode x={65} y={340} width={190} height={72} title="Condition + random seed" detail="request + variation" tone="amber" />
          <DiagramNode x={375} y={340} width={190} height={72} title="Same learned generator" detail="parameters fixed" tone="violet" badge="FIXED" dashed />
          <DiagramNode x={685} y={340} width={190} height={72} title="Candidate output" detail="new result to check" tone="emerald" />
          <Connector d="M255 376 H375" markerId={marker} label="guides" labelX={315} labelY={364} />
          <Connector d="M565 376 H685" markerId={marker} label="creates" labelX={625} labelY={364} />
          <Connector d="M805 177 V270 C805 275 470 270 470 340" markerId={marker} label="same saved model" labelX={638} labelY={263} dashed />
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 770">
          <defs><ArrowMarker id={`${marker}-mobile`} /></defs>
          <Boundary x={8} y={28} width={284} height={392} label="TRAINING · PARAMETERS CHANGE" tone="sky" />
          <DiagramNode x={60} y={65} width={180} height={58} title="Examples" detail="observed data" tone="sky" />
          <DiagramNode x={60} y={155} width={180} height={58} title="Training" detail="adjust parameters" tone="violet" />
          <DiagramNode x={60} y={245} width={180} height={58} title="Loss / error" detail="compare result" tone="rose" />
          <DiagramNode x={60} y={335} width={180} height={58} title="Learned generator" detail="saved parameters" tone="violet" badge="MODEL" />
          <Connector d="M150 123 V155" markerId={`${marker}-mobile`} />
          <Connector d="M150 213 V245" markerId={`${marker}-mobile`} />
          <Connector d="M150 303 V335" markerId={`${marker}-mobile`} />
          <Connector d="M60 274 C20 274 20 184 60 184" markerId={`${marker}-mobile`} label="update" labelX={31} labelY={234} tone="rose" />
          <Boundary x={8} y={470} width={284} height={282} label="GENERATION · PARAMETERS FIXED" tone="amber" />
          <DiagramNode x={55} y={500} width={190} height={58} title="Condition + random seed" detail="request + variation" tone="amber" />
          <DiagramNode x={55} y={590} width={190} height={58} title="Same learned generator" detail="parameters fixed" tone="violet" badge="FIXED" dashed />
          <DiagramNode x={55} y={680} width={190} height={58} title="Candidate output" detail="new result to check" tone="emerald" />
          <Connector d="M150 558 V590" markerId={`${marker}-mobile`} />
          <Connector d="M150 648 V680" markerId={`${marker}-mobile`} />
          <path d="M240 364 C285 364 285 619 245 619" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 6" />
          <text x="273" y="484" transform="rotate(90 273 484)" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">SAME SAVED MODEL</text>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "sky", label: "observed data" }, { tone: "violet", label: "learned model" }, { tone: "amber", label: "condition/randomness" }, { tone: "emerald", label: "candidate output" }, { tone: "rose", label: "error feedback" }]} />
    </GenAIFigure>
  );
}

export function RetrievalPredictionGenerationFigure() {
  const marker = "three-systems-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — One request, three different system behaviours"
      caption="Retrieval returns an item that already exists, prediction assigns a label or score, and generation constructs a new candidate from a condition and a starting signal."
      description="The shared request Show me a product image visibly branches into retrieval through a database to a stored image, prediction through a classifier to a label and probability, and generation through a model supplied with condition and noise to a newly constructed image."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 940 570">
          <defs><ArrowMarker id={marker} tone="slate" /></defs>
          <DiagramNode x={315} y={20} width={310} height={66} title={'“Show me a product image”'} detail="same request" tone="sky" />
          <path d="M470 86 V120 M470 120 H155 V160 M470 120 V160 M470 120 H785 V160" fill="none" stroke="#64748b" strokeWidth="3" />
          <path d="M155 150 l-7 -10 h14 z M470 150 l-7 -10 h14 z M785 150 l-7 -10 h14 z" fill="#64748b" />

          <Boundary x={25} y={160} width={260} height={370} label="A · RETRIEVAL" tone="sky" />
          <DiagramNode x={65} y={205} width={180} height={62} title="Database" detail="search stored items" tone="sky" />
          <g transform="translate(102 300)"><rect x="12" y="12" width="70" height="50" rx="8" fill="#f8fafc" stroke="#64748b" /><ProductImage x={0} y={0} /></g>
          <Connector d="M155 267 V294" markerId={marker} tone="slate" />
          <DiagramNode x={65} y={410} width={180} height={62} title="RETRIEVED" detail="the stored image" tone="emerald" />
          <Connector d="M155 368 V410" markerId={marker} tone="slate" />

          <Boundary x={340} y={160} width={260} height={370} label="B · PREDICTION" tone="violet" />
          <DiagramNode x={380} y={205} width={180} height={62} title="Classifier" detail="score the request" tone="violet" />
          <Connector d="M470 267 V315" markerId={marker} tone="slate" />
          <g><rect x="392" y="315" width="156" height="70" rx="12" fill="#f8fafc" stroke="#7c3aed" strokeWidth="2" /><text x="470" y="343" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4c1d95">Product photo</text><text x="470" y="368" textAnchor="middle" fontSize="18" fontWeight="800" fill="#4c1d95">94%</text></g>
          <DiagramNode x={380} y={410} width={180} height={62} title="PREDICTED" detail="label + probability" tone="emerald" />
          <Connector d="M470 385 V410" markerId={marker} tone="slate" />

          <Boundary x={655} y={160} width={260} height={370} label="C · GENERATION" tone="amber" />
          <DiagramNode x={685} y={195} width={200} height={72} title="Generative model" detail="condition + noise" tone="amber" />
          <Connector d="M785 267 V294" markerId={marker} tone="slate" />
          <ProductImage x={750} y={305} generated />
          <text x="785" y="374" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">new arrangement</text>
          <DiagramNode x={695} y={410} width={180} height={62} title="GENERATED" detail="new candidate image" tone="emerald" />
          <Connector d="M785 385 V410" markerId={marker} tone="slate" />
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <div className="rounded-xl border-2 border-sky-400 bg-sky-50 p-3 text-center font-bold text-sky-950">“Show me a product image”</div>
        <p className="my-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">the same request branches to</p>
        <div className="relative ml-3 space-y-3 border-l-2 border-slate-500 pl-5">
          {[
            ["A · RETRIEVAL", "Database → stored image", "RETRIEVED", "sky"],
            ["B · PREDICTION", "Classifier → label + 94%", "PREDICTED", "violet"],
            ["C · GENERATION", "Condition + noise → new image", "GENERATED", "amber"],
          ].map(([heading, path, result, tone]) => (
            <div key={heading} className="relative rounded-xl border-2 bg-white p-3 text-center" style={{ borderColor: palette[tone as Tone].stroke }}>
              <span className="absolute -left-[22px] top-1/2 w-5 border-t-2 border-slate-500" aria-hidden="true" />
              <span className="absolute -left-[25px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-slate-600" aria-hidden="true" />
              <p className="text-xs font-extrabold tracking-wide" style={{ color: palette[tone as Tone].text }}>{heading}</p>
              <p className="mt-2 text-sm text-slate-700">{path}</p>
              <span className="mt-2 inline-block rounded-full border border-emerald-600 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-900">{result}</span>
            </div>
          ))}
        </div>
      </div>
    </GenAIFigure>
  );
}

function FeatureSpace({ x, y, generative = false }: { x: number; y: number; generative?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width="210" height="155" rx="14" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      <text x={x + 105} y={y + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">feature space</text>
      {[[-65, -38], [-48, -66], [-25, -42], [-72, -82]].map(([dx, dy], index) => (
        <circle key={`cat-${index}`} cx={x + 105 + dx} cy={y + 110 + dy} r="8" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
      ))}
      {[[55, 17], [68, -16], [30, 0], [72, 32]].map(([dx, dy], index) => (
        <rect key={`dog-${index}`} x={x + 105 + dx - 7} y={y + 76 + dy - 7} width="14" height="14" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      ))}
      {generative ? (
        <>
          <ellipse cx={x + 58} cy={y + 65} rx="43" ry="38" fill="#bae6fd" fillOpacity="0.45" stroke="#0284c7" strokeWidth="2" strokeDasharray="5 4" />
          <ellipse cx={x + 159} cy={y + 94} rx="39" ry="42" fill="#fde68a" fillOpacity="0.45" stroke="#d97706" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx={x + 79} cy={y + 78} r="11" fill="none" stroke="#e11d48" strokeWidth="3" />
          <text x={x + 79} y={y + 101} textAnchor="middle" fontSize="13" fontWeight="700" fill="#881337">new sample x</text>
        </>
      ) : (
        <>
          <line x1={x + 105} y1={y + 28} x2={x + 105} y2={y + 143} stroke="#7c3aed" strokeWidth="4" />
          <text x={x + 109} y={y + 145} fontSize="13" fontWeight="700" fill="#4c1d95">decision boundary</text>
        </>
      )}
    </g>
  );
}

export function GenerativeDiscriminativePathsFigure() {
  const marker = "learning-paths-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Two learning pathways through the same two classes"
      caption="Circles and squares mean the same classes on both sides. The discriminative path learns the boundary needed to predict y from x; the generative path learns where each class tends to occur, which supports sampling a new x or comparing p(x | y) values for classification."
      description="A paired diagram uses blue circles and amber squares for the same two classes. The discriminative side draws a visible decision boundary and continues to p of y given x and a predicted class. The generative side draws two class distributions, samples a new x, and also shows that an observed x can be classified by comparing p of x given each y."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 540">
          <defs><ArrowMarker id={marker} tone="slate" /></defs>
          <Boundary x={15} y={35} width={475} height={470} label="DISCRIMINATIVE · LEARN TO SEPARATE" tone="sky" />
          <DiagramNode x={45} y={80} width={150} height={62} title="Labelled x" detail="circle or square" tone="sky" />
          <FeatureSpace x={240} y={58} />
          <Connector d="M195 111 H240" markerId={marker} tone="slate" />
          <DiagramNode x={240} y={265} width={210} height={62} title="Learn p(y | x)" detail="target given input" tone="violet" />
          <Connector d="M345 213 V265" markerId={marker} tone="slate" />
          <DiagramNode x={240} y={375} width={210} height={62} title="Predicted class" detail="circle or square" tone="emerald" />
          <Connector d="M345 327 V375" markerId={marker} tone="slate" />

          <Boundary x={510} y={35} width={475} height={470} label="GENERATIVE · LEARN HOW DATA OCCURS" tone="violet" />
          <DiagramNode x={535} y={80} width={150} height={62} title="Examples x, y" detail="same two classes" tone="sky" />
          <FeatureSpace x={735} y={58} generative />
          <Connector d="M685 111 H735" markerId={marker} tone="slate" />
          <DiagramNode x={535} y={230} width={170} height={70} title="Learn p(x) / p(x,y)" detail="class distributions" tone="violet" />
          <Connector d="M630 142 V230" markerId={marker} tone="slate" />
          <Connector d="M705 265 C740 265 755 230 785 213" markerId={marker} label="sample new x" labelX={780} labelY={252} tone="rose" />
          <DiagramNode x={535} y={365} width={170} height={70} title="Observed x" detail="class unknown" tone="sky" />
          <DiagramNode x={775} y={350} width={180} height={92} title="Compare p(x | y)" detail="choose likely class" tone="emerald" />
          <Connector d="M705 400 H775" markerId={marker} label="classify" labelX={740} labelY={387} tone="slate" />
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] space-y-5 lg:hidden">
        <div className="rounded-xl border-2 border-sky-300 bg-sky-50/60 p-3">
          <p className="text-center text-xs font-extrabold tracking-wide text-sky-950">DISCRIMINATIVE · LEARN TO SEPARATE</p>
          <DiagramCanvas viewBox="0 0 280 390">
            <defs><ArrowMarker id={`${marker}-disc-mobile`} tone="slate" /></defs>
            <DiagramNode x={65} y={10} width={150} height={55} title="Labelled x" detail="circle or square" tone="sky" />
            <Connector d="M140 65 V88" markerId={`${marker}-disc-mobile`} tone="slate" />
            <FeatureSpace x={35} y={88} />
            <Connector d="M140 243 V270" markerId={`${marker}-disc-mobile`} tone="slate" />
            <DiagramNode x={35} y={270} width={210} height={50} title="Learn p(y | x)" detail="target given input" tone="violet" />
            <Connector d="M140 320 V340" markerId={`${marker}-disc-mobile`} tone="slate" />
            <DiagramNode x={50} y={340} width={180} height={45} title="Predicted class" tone="emerald" />
          </DiagramCanvas>
        </div>
        <div className="rounded-xl border-2 border-violet-300 bg-violet-50/60 p-3">
          <p className="text-center text-xs font-extrabold tracking-wide text-violet-950">GENERATIVE · LEARN HOW DATA OCCURS</p>
          <DiagramCanvas viewBox="0 0 280 500">
            <defs><ArrowMarker id={`${marker}-gen-mobile`} tone="slate" /></defs>
            <DiagramNode x={65} y={10} width={150} height={55} title="Examples x, y" detail="same two classes" tone="sky" />
            <Connector d="M140 65 V85" markerId={`${marker}-gen-mobile`} tone="slate" />
            <DiagramNode x={45} y={85} width={190} height={55} title="Learn p(x) / p(x,y)" detail="class distributions" tone="violet" />
            <Connector d="M140 140 V168" markerId={`${marker}-gen-mobile`} tone="slate" />
            <FeatureSpace x={35} y={168} generative />
            <text x="140" y="342" textAnchor="middle" fontSize="13" fontWeight="700" fill="#881337">sample a new x from a learned region</text>
            <DiagramNode x={20} y={380} width={105} height={55} title="Observed x" detail="unknown class" tone="sky" />
            <DiagramNode x={155} y={370} width={115} height={75} title="Compare p(x | y)" detail="choose class" tone="emerald" />
            <Connector d="M125 407 H155" markerId={`${marker}-gen-mobile`} tone="slate" />
          </DiagramCanvas>
        </div>
      </div>
      <Legend items={[{ tone: "sky", label: "class 1 · circles / observed data" }, { tone: "amber", label: "class 2 · squares" }, { tone: "violet", label: "learned rule/distribution" }, { tone: "rose", label: "new sample" }]} />
    </GenAIFigure>
  );
}

function CountCell({ x, y, value, tone, label }: { x: number; y: number; value: number; tone: Tone; label?: string }) {
  const colors = palette[tone];
  return (
    <g>
      <rect x={x} y={y} width="130" height="86" fill={colors.fill} stroke={colors.stroke} strokeWidth={tone === "rose" ? 4 : 2} />
      <text x={x + 65} y={y + 45} textAnchor="middle" fontSize="24" fontWeight="800" fill={colors.text}>{value}</text>
      {label && <text x={x + 65} y={y + 68} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={colors.text}>{label}</text>}
    </g>
  );
}

export function ProbabilityMapFigure() {
  return (
    <GenAIFigure
      title="Figure 2 — Joint, marginal, and conditional probabilities in the same count grid"
      caption="A joint probability uses one cell, a marginal probability totals across a row or column, and a conditional probability renormalizes only inside the chosen condition. The values match the 100-email worked example below."
      description="A two by two count grid has spam rows of 30 offer and 10 no offer, legitimate rows of 6 offer and 54 no offer, row totals 40 and 60, column totals 36 and 64, and grand total 100. The joint spam and offer cell is 30. The offer marginal is 36, the spam marginal is 40, and within the spam row p of offer given spam is 30 divided by 40 or 0.75."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 900 520">
          <text x="390" y="24" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">OBSERVED INPUT x</text>
          <text x="315" y="53" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0c4a6e">contains “offer”</text>
          <text x="445" y="53" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0c4a6e">no “offer”</text>
          <text x="575" y="53" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">row total</text>
          <text x="125" y="178" transform="rotate(-90 125 178)" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">TARGET y</text>
          <text x="230" y="115" textAnchor="end" fontSize="13" fontWeight="700" fill="#334155">spam</text>
          <text x="230" y="201" textAnchor="end" fontSize="13" fontWeight="700" fill="#334155">legitimate</text>
          <text x="230" y="287" textAnchor="end" fontSize="13" fontWeight="700" fill="#334155">column total</text>
          <CountCell x={250} y={70} value={30} tone="rose" label="JOINT p(x,y)" />
          <CountCell x={380} y={70} value={10} tone="sky" />
          <CountCell x={510} y={70} value={40} tone="amber" label="MARGINAL p(y)" />
          <CountCell x={250} y={156} value={6} tone="sky" />
          <CountCell x={380} y={156} value={54} tone="sky" />
          <CountCell x={510} y={156} value={60} tone="slate" />
          <CountCell x={250} y={242} value={36} tone="violet" label="MARGINAL p(x)" />
          <CountCell x={380} y={242} value={64} tone="slate" />
          <CountCell x={510} y={242} value={100} tone="slate" />

          <path d="M250 355 H640" fill="none" stroke="#d97706" strokeWidth="2" />
          <text x="250" y="383" fontSize="14" fontWeight="800" fill="#78350f">CONDITIONAL SLICE · choose y = spam, then normalize within that row</text>
          <rect x="250" y="405" width="292.5" height="48" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <rect x="250" y="405" width="219.375" height="48" rx="10" fill="#fda4af" stroke="#e11d48" strokeWidth="2" />
          <text x="360" y="435" textAnchor="middle" fontSize="13" fontWeight="800" fill="#881337">30 offer ÷ 40 spam = 0.75</text>
          <text x="505" y="435" textAnchor="middle" fontSize="12" fontWeight="700" fill="#78350f">10 ÷ 40 = 0.25</text>
          <text x="570" y="485" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">The conditional bar totals 1.00, not 100 emails.</text>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 545">
          <text x="175" y="18" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">INPUT x</text>
          <text x="110" y="40" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0c4a6e">has “offer”</text>
          <text x="200" y="40" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0c4a6e">no “offer”</text>
          <text x="267" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">total</text>
          <text x="13" y="155" transform="rotate(-90 13 155)" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">TARGET y</text>
          <text x="70" y="91" textAnchor="end" fontSize="13" fontWeight="700" fill="#334155">spam</text>
          <text x="70" y="156" textAnchor="end" fontSize="12" fontWeight="700" fill="#334155">legitimate</text>
          <text x="70" y="221" textAnchor="end" fontSize="12" fontWeight="700" fill="#334155">total</text>
          <rect x="75" y="55" width="70" height="65" fill="#ffe4e6" stroke="#e11d48" strokeWidth="4" /><text x="110" y="83" textAnchor="middle" fontSize="20" fontWeight="800" fill="#881337">30</text><text x="110" y="104" textAnchor="middle" fontSize="9" fontWeight="700" fill="#881337">JOINT</text>
          <rect x="145" y="55" width="70" height="65" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" /><text x="180" y="94" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0c4a6e">10</text>
          <rect x="215" y="55" width="70" height="65" fill="#fef3c7" stroke="#d97706" strokeWidth="2" /><text x="250" y="83" textAnchor="middle" fontSize="20" fontWeight="800" fill="#78350f">40</text><text x="250" y="104" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#78350f">p(y)</text>
          <rect x="75" y="120" width="70" height="65" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" /><text x="110" y="159" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0c4a6e">6</text>
          <rect x="145" y="120" width="70" height="65" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" /><text x="180" y="159" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0c4a6e">54</text>
          <rect x="215" y="120" width="70" height="65" fill="#f8fafc" stroke="#64748b" strokeWidth="2" /><text x="250" y="159" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0f172a">60</text>
          <rect x="75" y="185" width="70" height="65" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" /><text x="110" y="213" textAnchor="middle" fontSize="20" fontWeight="800" fill="#4c1d95">36</text><text x="110" y="234" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#4c1d95">p(x)</text>
          <rect x="145" y="185" width="70" height="65" fill="#f8fafc" stroke="#64748b" strokeWidth="2" /><text x="180" y="224" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0f172a">64</text>
          <rect x="215" y="185" width="70" height="65" fill="#f8fafc" stroke="#64748b" strokeWidth="2" /><text x="250" y="224" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0f172a">100</text>
          <text x="150" y="295" textAnchor="middle" fontSize="14" fontWeight="800" fill="#78350f">CONDITIONAL · within spam only</text>
          <rect x="25" y="320" width="250" height="64" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <rect x="25" y="320" width="187.5" height="64" rx="10" fill="#fda4af" stroke="#e11d48" strokeWidth="2" />
          <text x="119" y="347" textAnchor="middle" fontSize="13" fontWeight="800" fill="#881337">30 offer ÷ 40 spam</text>
          <text x="119" y="368" textAnchor="middle" fontSize="16" fontWeight="800" fill="#881337">= 0.75</text>
          <text x="244" y="357" textAnchor="middle" fontSize="13" fontWeight="700" fill="#78350f">0.25</text>
          <text x="150" y="425" textAnchor="middle" fontSize="13" fill="#334155">joint = one cell combination</text>
          <text x="150" y="449" textAnchor="middle" fontSize="13" fill="#334155">marginal = a row or column total</text>
          <text x="150" y="473" textAnchor="middle" fontSize="13" fill="#334155">conditional = normalize inside one condition</text>
          <text x="150" y="515" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">The conditional bar totals 1.00.</text>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "rose", label: "joint cell" }, { tone: "violet", label: "input marginal" }, { tone: "amber", label: "target marginal / condition" }, { tone: "sky", label: "other observed cells" }]} />
    </GenAIFigure>
  );
}

export function LearningGenerationModesFigure() {
  const marker = "learn-generate-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Learning mode builds the model; generation mode reuses it"
      caption="Training measures an error and sends a parameter update back to the learned representation. Generation starts from a condition plus sampled randomness and reuses the same trained model without updating it."
      description="The training lane sends a dataset into a learned representation or distribution, produces a reconstruction, measures loss, and feeds a parameter update back into the model. A dotted bridge leads to the generation lane, where a condition and sampled latent value or noise enter the same trained model with fixed parameters to produce a new sample."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 980 530">
          <defs><ArrowMarker id={marker} /></defs>
          <Boundary x={15} y={45} width={950} height={210} label="LEARNING MODE · FIT THE PARAMETERS" tone="sky" />
          <DiagramNode x={38} y={105} width={142} height={68} title="Dataset" detail="real examples" tone="sky" />
          <DiagramNode x={230} y={95} width={190} height={88} title="Learned representation" detail="model / distribution" tone="violet" badge="MODEL" />
          <DiagramNode x={470} y={105} width={150} height={68} title="Reconstruction" detail="training output" tone="emerald" />
          <DiagramNode x={670} y={105} width={120} height={68} title="Loss" detail="measure error" tone="rose" />
          <DiagramNode x={840} y={105} width={105} height={68} title="Update" detail="change model" tone="rose" />
          <Connector d="M180 139 H230" markerId={marker} />
          <Connector d="M420 139 H470" markerId={marker} />
          <Connector d="M620 139 H670" markerId={marker} />
          <Connector d="M790 139 H840" markerId={marker} />
          <Connector d="M892 173 C892 230 325 230 325 183" markerId={marker} label="feedback changes parameters" labelX={610} labelY={224} tone="rose" />

          <Boundary x={15} y={315} width={950} height={170} label="GENERATION MODE · PARAMETERS FIXED" tone="amber" />
          <DiagramNode x={75} y={360} width={220} height={70} title="Condition + sampled z/noise" detail="guidance + randomness" tone="amber" />
          <DiagramNode x={390} y={350} width={200} height={90} title="Same trained model" detail="parameters fixed" tone="violet" badge="FIXED" dashed />
          <DiagramNode x={690} y={360} width={200} height={70} title="New sample" detail="constructed output" tone="emerald" />
          <Connector d="M295 395 H390" markerId={marker} />
          <Connector d="M590 395 H690" markerId={marker} />
          <Connector d="M325 183 V280 C325 292 490 292 490 350" markerId={marker} label="reuse learned parameters" labelX={420} labelY={282} dashed />
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 820">
          <defs><ArrowMarker id={`${marker}-mobile`} /></defs>
          <Boundary x={8} y={30} width={284} height={435} label="LEARNING MODE · FIT PARAMETERS" tone="sky" />
          <DiagramNode x={65} y={62} width={170} height={55} title="Dataset" detail="real examples" tone="sky" />
          <DiagramNode x={55} y={150} width={190} height={65} title="Learned representation" detail="model / distribution" tone="violet" badge="MODEL" />
          <DiagramNode x={65} y={250} width={170} height={55} title="Reconstruction" detail="training output" tone="emerald" />
          <DiagramNode x={65} y={338} width={170} height={55} title="Loss → update" detail="change the model" tone="rose" />
          <Connector d="M150 117 V150" markerId={`${marker}-mobile`} />
          <Connector d="M150 215 V250" markerId={`${marker}-mobile`} />
          <Connector d="M150 305 V338" markerId={`${marker}-mobile`} />
          <Connector d="M65 365 C25 365 25 182 55 182" markerId={`${marker}-mobile`} label="feedback" labelX={31} labelY={279} tone="rose" />
          <Boundary x={8} y={515} width={284} height={285} label="GENERATION · PARAMETERS FIXED" tone="amber" />
          <DiagramNode x={48} y={545} width={204} height={60} title="Condition + sampled z/noise" detail="guidance + randomness" tone="amber" />
          <DiagramNode x={55} y={640} width={190} height={65} title="Same trained model" detail="parameters fixed" tone="violet" badge="FIXED" dashed />
          <DiagramNode x={65} y={740} width={170} height={48} title="New sample" tone="emerald" />
          <Connector d="M150 605 V640" markerId={`${marker}-mobile`} />
          <Connector d="M150 705 V740" markerId={`${marker}-mobile`} />
          <path d="M245 182 C285 182 285 672 245 672" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 6" />
          <text x="275" y="485" transform="rotate(90 275 485)" textAnchor="middle" fontSize="13" fontWeight="700" fill="#4c1d95">REUSE LEARNED PARAMETERS</text>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "sky", label: "observed dataset" }, { tone: "violet", label: "learned representation/model" }, { tone: "amber", label: "condition and sampled randomness" }, { tone: "rose", label: "loss/update feedback" }, { tone: "emerald", label: "model output" }]} />
    </GenAIFigure>
  );
}

export function LatentRepresentationFigure() {
  const marker = "latent-space-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — A latent space stores useful relationships, not file locations"
      caption="Nearby points represent examples with similar learned features. A sampled point between known examples can decode into a related new example."
      description="A two-dimensional latent space contains nearby green forest examples, blue coast examples, and amber city examples. Horizontal movement means more water-like and vertical movement means brighter or more open. A sampled latent point z near the coast cluster follows a curved decoding arrow to a newly constructed coast scene."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 780 350">
          <defs><ArrowMarker id={marker} /></defs>
          <rect x="20" y="34" width="470" height="270" rx="18" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
          <text x="38" y="61" fontSize="17" fontWeight="700" fill="#312e81">Learned representation / latent space</text>
          <text x="38" y="290" fontSize="14" fill="#475569">horizontal direction: more water-like →</text>
          <text x="38" y="84" fontSize="14" fill="#475569">vertical direction: brighter / more open ↑</text>
          <g fill="#86efac" stroke="#15803d" strokeWidth="2"><circle cx="118" cy="208" r="13" /><circle cx="154" cy="232" r="13" /><circle cx="174" cy="184" r="13" /></g>
          <text x="100" y="260" fontSize="15" fontWeight="700" fill="#166534">forest examples</text>
          <g fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2"><circle cx="295" cy="154" r="13" /><circle cx="330" cy="181" r="13" /><circle cx="350" cy="134" r="13" /></g>
          <text x="279" y="213" fontSize="15" fontWeight="700" fill="#1e40af">coast examples</text>
          <g fill="#fcd34d" stroke="#b45309" strokeWidth="2"><rect x="389" y="91" width="24" height="24" rx="3" /><rect x="424" y="114" width="24" height="24" rx="3" /></g>
          <text x="382" y="165" fontSize="15" fontWeight="700" fill="#92400e">city examples</text>
          <circle cx="323" cy="145" r="21" fill="none" stroke="#e11d48" strokeWidth="4" strokeDasharray="6 4" />
          <text x="230" y="109" fontSize="15" fontWeight="700" fill="#be123c">sampled latent point z</text>
          <Connector d="M347 145 C510 142 515 184 581 184" markerId={marker} />
          <rect x="581" y="105" width="175" height="165" rx="18" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
          <circle cx="669" cy="150" r="31" fill="#fbbf24" />
          <path d="M598 222 Q633 184 665 214 T739 202 L739 251 L598 251 Z" fill="#38bdf8" />
          <path d="M598 234 Q633 218 665 235 T739 225" fill="none" stroke="#ffffff" strokeWidth="4" />
          <text x="668" y="296" textAnchor="middle" fontSize="15" fontWeight="700" fill="#155e75">decoded new coast scene</text>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 540">
          <defs><ArrowMarker id={`${marker}-mobile`} /></defs>
          <rect x="12" y="16" width="276" height="340" rx="16" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
          <text x="28" y="44" fontSize="14" fontWeight="700" fill="#312e81">Learned latent space</text>
          <text x="28" y="334" fontSize="13" fill="#475569">more water-like →</text>
          <text x="28" y="66" fontSize="13" fill="#475569">brighter / open ↑</text>
          <g fill="#86efac" stroke="#15803d" strokeWidth="2"><circle cx="75" cy="245" r="11" /><circle cx="102" cy="270" r="11" /><circle cx="112" cy="225" r="11" /></g>
          <text x="58" y="300" fontSize="14" fontWeight="700" fill="#166534">forest</text>
          <g fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2"><circle cx="158" cy="170" r="11" /><circle cx="190" cy="194" r="11" /><circle cx="205" cy="154" r="11" /></g>
          <text x="157" y="222" fontSize="14" fontWeight="700" fill="#1e40af">coast</text>
          <g fill="#fcd34d" stroke="#b45309" strokeWidth="2"><rect x="213" y="87" width="21" height="21" rx="3" /><rect x="245" y="112" width="21" height="21" rx="3" /></g>
          <text x="224" y="151" fontSize="14" fontWeight="700" fill="#92400e">city</text>
          <circle cx="178" cy="169" r="19" fill="none" stroke="#e11d48" strokeWidth="4" strokeDasharray="5 4" />
          <text x="111" y="126" fontSize="14" fontWeight="700" fill="#be123c">sampled point z</text>
          <Connector d="M178 190 C178 365 150 365 150 396" markerId={`${marker}-mobile`} />
          <rect x="63" y="396" width="174" height="118" rx="16" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
          <circle cx="150" cy="430" r="22" fill="#fbbf24" />
          <path d="M78 478 Q110 445 145 472 T222 462 L222 500 L78 500 Z" fill="#38bdf8" />
          <path d="M78 488 Q110 474 145 487 T222 480" fill="none" stroke="#ffffff" strokeWidth="3" />
          <text x="150" y="533" textAnchor="middle" fontSize="14" fontWeight="700" fill="#155e75">decoded new coast scene</text>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "sky", label: "coast · circles" }, { tone: "emerald", label: "forest · circles" }, { tone: "amber", label: "city · squares" }, { tone: "rose", label: "sampled point · dashed ring", shape: "dashed" }]} />
    </GenAIFigure>
  );
}
