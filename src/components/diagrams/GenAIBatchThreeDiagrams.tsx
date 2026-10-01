import {
  Boundary,
  Connector,
  DiagramCanvas,
  DiagramNode,
  GenAIFigure,
  Legend,
} from "./GenAIDiagrams";

function ArrowMarker({ id, color = "#64748b" }: { id: string; color?: string }) {
  return (
    <marker id={id} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,4.5 L0,9 z" fill={color} />
    </marker>
  );
}

function TensorTile({
  x,
  y,
  size,
  cells,
  label,
  detail,
  tone = "sky",
}: {
  x: number;
  y: number;
  size: number;
  cells: number;
  label: string;
  detail?: string;
  tone?: "sky" | "violet";
}) {
  const stroke = tone === "sky" ? "#0284c7" : "#7c3aed";
  const fill = tone === "sky" ? "#e0f2fe" : "#ede9fe";
  const step = size / cells;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
      {Array.from({ length: cells - 1 }, (_, index) => (
        <g key={index} opacity="0.7">
          <line x1={x + step * (index + 1)} y1={y + 4} x2={x + step * (index + 1)} y2={y + size - 4} stroke={stroke} strokeWidth="0.8" />
          <line x1={x + 4} y1={y + step * (index + 1)} x2={x + size - 4} y2={y + step * (index + 1)} stroke={stroke} strokeWidth="0.8" />
        </g>
      ))}
      <text x={x + size / 2} y={y + size + 19} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0f172a">{label}</text>
      {detail && <text x={x + size / 2} y={y + size + 36} textAnchor="middle" fontSize="10.5" fill="#475569">{detail}</text>}
    </g>
  );
}

function PhotoTile({ x, y, width = 82, height = 68, label }: { x: number; y: number; width?: number; height?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="10" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
      <circle cx={x + width * 0.72} cy={y + height * 0.28} r={height * 0.1} fill="#fbbf24" />
      <path d={`M${x + 8} ${y + height - 10} L${x + width * 0.38} ${y + height * 0.45} L${x + width * 0.57} ${y + height * 0.68} L${x + width * 0.76} ${y + height * 0.5} L${x + width - 8} ${y + height - 10} Z`} fill="#34d399" opacity="0.78" />
      {label && <text x={x + width / 2} y={y + height + 20} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#064e3b">{label}</text>}
    </g>
  );
}

function NoiseTile({ x, y, size, strength }: { x: number; y: number; size: number; strength: number }) {
  const dots = [
    [0.18, 0.2], [0.38, 0.16], [0.66, 0.18], [0.83, 0.28], [0.24, 0.46],
    [0.5, 0.4], [0.74, 0.52], [0.16, 0.72], [0.42, 0.78], [0.68, 0.73], [0.86, 0.82],
  ];
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx="10" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
      {dots.slice(0, strength).map(([dx, dy], index) => (
        <circle key={index} cx={x + dx * size} cy={y + dy * size} r={Math.max(2.5, size * 0.045)} fill={index % 2 ? "#8b5cf6" : "#f43f5e"} />
      ))}
    </g>
  );
}

function Tag({ x, y, text, tone = "slate" }: { x: number; y: number; text: string; tone?: "sky" | "violet" | "amber" | "emerald" | "rose" | "slate" }) {
  const colors = {
    sky: ["#e0f2fe", "#0284c7", "#0c4a6e"],
    violet: ["#ede9fe", "#7c3aed", "#4c1d95"],
    amber: ["#fef3c7", "#d97706", "#78350f"],
    emerald: ["#d1fae5", "#059669", "#064e3b"],
    rose: ["#ffe4e6", "#e11d48", "#881337"],
    slate: ["#f8fafc", "#64748b", "#0f172a"],
  }[tone];
  const width = Math.max(56, text.length * 7.1 + 18);
  return (
    <g>
      <rect x={x} y={y} width={width} height="24" rx="12" fill={colors[0]} stroke={colors[1]} />
      <text x={x + width / 2} y={y + 16.5} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={colors[2]}>{text}</text>
    </g>
  );
}

function PromptGlyph({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width="120" height="50" rx="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <path d={`M${x + 22} ${y + 50} l10 12 l2 -12`} fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x={x + 60} y={y + 22} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">PROMPT</text>
      <text x={x + 60} y={y + 39} textAnchor="middle" fontSize="10.5" fill="#475569">{text}</text>
    </g>
  );
}

function SceneTile({ x, y, masked = false, changed = false }: { x: number; y: number; masked?: boolean; changed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width="120" height="82" rx="10" fill="#eff6ff" stroke="#64748b" strokeWidth="2" />
      <rect x={x + 44} y={y + 32} width="42" height="36" fill={changed ? "#fda4af" : "#bfdbfe"} stroke="#475569" />
      <path d={`M${x + 36} ${y + 34} L${x + 65} ${y + 12} L${x + 94} ${y + 34} Z`} fill="#a78bfa" stroke="#6d28d9" />
      <rect x={x + 57} y={y + 48} width="14" height="20" fill={changed ? "#e11d48" : "#475569"} />
      <circle cx={x + 102} cy={y + 17} r="8" fill="#fbbf24" />
      {masked && <rect x={x + 52} y={y + 42} width="27" height="32" rx="3" fill="#fb7185" fillOpacity="0.5" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 3" />}
    </g>
  );
}

function PoseTile({ x, y, output = false }: { x: number; y: number; output?: boolean }) {
  const color = output ? "#7c3aed" : "#0284c7";
  return (
    <g>
      <rect x={x} y={y} width="105" height="100" rx="10" fill={output ? "#ede9fe" : "#f8fafc"} stroke={color} strokeWidth="2" />
      <circle cx={x + 54} cy={y + 20} r="10" fill={output ? "#c4b5fd" : "none"} stroke={color} strokeWidth="3" />
      <path d={`M${x + 54} ${y + 30} L${x + 54} ${y + 61} M${x + 54} ${y + 39} L${x + 27} ${y + 52} M${x + 54} ${y + 39} L${x + 82} ${y + 47} M${x + 54} ${y + 61} L${x + 35} ${y + 88} M${x + 54} ${y + 61} L${x + 77} ${y + 86}`} fill="none" stroke={color} strokeWidth={output ? 9 : 4} strokeLinecap="round" />
      {!output && [[54,39],[27,52],[82,47],[54,61],[35,88],[77,86]].map(([cx, cy], index) => <circle key={index} cx={x + cx} cy={y + cy} r="3.5" fill="#e11d48" />)}
    </g>
  );
}

function MatrixGlyph({ x, y, rows, cols, cell, label, tone = "slate" }: { x: number; y: number; rows: number; cols: number; cell: number; label: string; tone?: "slate" | "emerald" }) {
  const fill = tone === "emerald" ? "#d1fae5" : "#e2e8f0";
  const stroke = tone === "emerald" ? "#059669" : "#64748b";
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        return <rect key={index} x={x + col * cell} y={y + row * cell} width={cell - 2} height={cell - 2} rx="2" fill={fill} stroke={stroke} />;
      })}
      <text x={x + cols * cell / 2} y={y - 10} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={tone === "emerald" ? "#064e3b" : "#334155"}>{label}</text>
    </g>
  );
}

function CapacityBar({ x, y, width, filled, label }: { x: number; y: number; width: number; filled: number; label: string }) {
  return (
    <g>
      <text x={x} y={y - 7} fontSize="10.5" fontWeight="700" fill="#475569">{label}</text>
      <rect x={x} y={y} width={width} height="12" rx="6" fill="#e2e8f0" />
      <rect x={x} y={y} width={width * filled} height="12" rx="6" fill="#10b981" />
    </g>
  );
}

export function PixelVsLatentDiffusionDiagram() {
  const pixelArrow = "pixel-latent-pixel-arrow";
  const latentArrow = "pixel-latent-latent-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Latent diffusion repeats its expensive work on a much smaller spatial grid"
      caption="The dimensions are one common architecture-specific example, not a universal Stable Diffusion rule. The VAE surrounds the latent denoising loop; it is not repeated at every denoising step."
      description="Two lanes compare pixel and latent diffusion. The pixel lane repeatedly denoises a large image tensor shaped one by three by 512 by 512 before producing an image. The latent lane passes an image through a fixed VAE encoder once, repeatedly denoises a much smaller one by four by 64 by 64 latent, then passes the final latent through a fixed VAE decoder once. Labels show 786432 pixel values versus 16384 latent values, or 48 times fewer values in this example."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 560">
          <defs><ArrowMarker id={pixelArrow} color="#0284c7" /><ArrowMarker id={latentArrow} color="#7c3aed" /></defs>
          <Boundary x={18} y={42} width={964} height={190} label="PIXEL SPACE · LARGE REPEATED WORK" tone="sky" />
          <TensorTile x={48} y={88} size={92} cells={6} label="[1, 3, 512, 512]" detail="786,432 values" tone="sky" />
          <Connector d="M150 134 H230" markerId={pixelArrow} tone="sky" label="image tensor" labelX={190} labelY={122} />
          <rect x="245" y="76" width="470" height="122" rx="18" fill="#e0f2fe" fillOpacity="0.55" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="8 6" />
          <text x="480" y="99" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0c4a6e">DENOISE THE PIXEL-SIZED GRID AGAIN AND AGAIN</text>
          <TensorTile x={290} y={115} size={58} cells={5} label="step T" tone="sky" />
          <TensorTile x={450} y={115} size={58} cells={5} label="step t" tone="sky" />
          <TensorTile x={610} y={115} size={58} cells={5} label="step 0" tone="sky" />
          <Connector d="M354 144 H440" markerId={pixelArrow} tone="sky" />
          <Connector d="M514 144 H600" markerId={pixelArrow} tone="sky" />
          <PhotoTile x={845} y={101} label="output image" />
          <Connector d="M715 137 H835" markerId={pixelArrow} tone="sky" label="pixels" labelX={775} labelY={125} />

          <Boundary x={18} y={292} width={964} height={232} label="LATENT SPACE · SMALLER REPEATED WORK" tone="violet" />
          <PhotoTile x={42} y={362} label="image" />
          <DiagramNode x={155} y={352} width={118} height={76} title="VAE encoder" detail="run once" tone="violet" badge="FIXED" />
          <Connector d="M124 396 H145" markerId={latentArrow} />
          <TensorTile x={315} y={357} size={66} cells={4} label="[1, 4, 64, 64]" detail="16,384 values" tone="violet" />
          <Connector d="M273 390 H305" markerId={latentArrow} />
          <rect x="430" y="330" width="260" height="145" rx="18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="8 6" />
          <text x="560" y="354" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#4c1d95">REPEAT DENOISING HERE</text>
          <TensorTile x={465} y={374} size={45} cells={3} label="T" tone="violet" />
          <TensorTile x={538} y={374} size={45} cells={3} label="t" tone="violet" />
          <TensorTile x={611} y={374} size={45} cells={3} label="0" tone="violet" />
          <Connector d="M385 390 H420" markerId={latentArrow} />
          <Connector d="M512 396 H533" markerId={latentArrow} />
          <Connector d="M585 396 H606" markerId={latentArrow} />
          <DiagramNode x={730} y={352} width={118} height={76} title="VAE decoder" detail="run once" tone="violet" badge="FIXED" />
          <Connector d="M690 397 H720" markerId={latentArrow} />
          <PhotoTile x={878} y={362} label="output image" />
          <Connector d="M848 390 H868" markerId={latentArrow} />
          <Tag x={433} y={487} text="48× FEWER VALUES IN THIS EXAMPLE" tone="emerald" />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 970">
          <defs><ArrowMarker id={`${pixelArrow}-mobile`} color="#0284c7" /><ArrowMarker id={`${latentArrow}-mobile`} color="#7c3aed" /></defs>
          <Boundary x={8} y={28} width={284} height={360} label="PIXEL SPACE" tone="sky" />
          <TensorTile x={100} y={65} size={100} cells={6} label="[1, 3, 512, 512]" detail="786,432 values" tone="sky" />
          <Connector d="M150 208 V245" markerId={`${pixelArrow}-mobile`} tone="sky" />
          <rect x="50" y="250" width="200" height="86" rx="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="150" y="272" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">REPEAT ON LARGE GRID</text>
          <NoiseTile x={72} y={284} size={40} strength={3} /><NoiseTile x={130} y={284} size={40} strength={7} /><NoiseTile x={188} y={284} size={40} strength={11} />
          <text x="150" y="365" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c4a6e">each step handles pixel-sized data</text>

          <Boundary x={8} y={430} width={284} height={510} label="LATENT SPACE" tone="violet" />
          <PhotoTile x={25} y={468} width={72} height={58} label="image" />
          <Tag x={214} y={434} text="FIXED" tone="violet" />
          <DiagramNode x={125} y={462} width={150} height={64} title="VAE encoder" detail="outside loop" tone="violet" />
          <Connector d="M97 496 H115" markerId={`${latentArrow}-mobile`} />
          <TensorTile x={112} y={575} size={76} cells={4} label="[1, 4, 64, 64]" detail="16,384 values" tone="violet" />
          <Connector d="M200 496 C235 496 235 548 188 600" markerId={`${latentArrow}-mobile`} />
          <rect x="48" y="705" width="204" height="92" rx="16" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="150" y="728" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#4c1d95">REPEAT ON SMALL LATENT</text>
          <NoiseTile x={75} y={742} size={38} strength={3} /><NoiseTile x={131} y={742} size={38} strength={7} /><NoiseTile x={187} y={742} size={38} strength={11} />
          <Connector d="M150 685 V700" markerId={`${latentArrow}-mobile`} />
          <Tag x={22} y={816} text="FIXED" tone="violet" />
          <DiagramNode x={22} y={846} width={130} height={60} title="VAE decoder" detail="outside loop" tone="violet" />
          <PhotoTile x={198} y={847} width={72} height={58} label="image" />
          <Connector d="M150 797 V826 C150 837 100 837 100 846" markerId={`${latentArrow}-mobile`} />
          <Connector d="M152 876 H188" markerId={`${latentArrow}-mobile`} />
          <Tag x={64} y={914} text="48× FEWER VALUES · THIS EXAMPLE" tone="emerald" />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "large pixel representation" },
        { tone: "violet", label: "compact latent / fixed VAE" },
        { tone: "emerald", label: "calculated saving in this example" },
      ]} />
    </GenAIFigure>
  );
}

export function StableDiffusionArchitectureDiagram() {
  const arrow = "stable-architecture-arrow";
  const cross = "stable-architecture-cross";
  return (
    <GenAIFigure
      title="Figure 2 — A Stable-Diffusion-style text-to-image system joins text guidance with sampled latent noise"
      caption="Pure text-to-image starts from sampled latent noise, not a VAE-encoded input image. The learned U-Net predicts an update; the separate scheduler calculates the next latent; the fixed VAE decoder converts only the final latent to pixels."
      description="A user prompt passes through a fixed tokenizer and text encoder to form contextual text representations. A user-selected seed controls sampled latent noise. The noisy latent, timestep, and text representations meet in a fixed U-Net, where a cross-attention arrow carries text information into latent features. A separate scheduler calculates an updated latent and loops it through the U-Net repeatedly. The final latent passes through a fixed VAE decoder to a generated image. A separate inset shows that a VAE encoder is used for training and image-start workflows, not to start pure text-to-image generation."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 660">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={cross} color="#7c3aed" /></defs>
          <Boundary x={18} y={40} width={442} height={176} label="TEXT STREAM" tone="sky" />
          <DiagramNode x={42} y={92} width={112} height={66} title="Prompt" detail="user supplied" tone="sky" />
          <DiagramNode x={188} y={92} width={112} height={66} title="Tokenizer" detail="fixed vocabulary" tone="violet" />
          <DiagramNode x={334} y={82} width={102} height={86} title="Text encoder" detail="fixed context" tone="violet" />
          <Connector d="M154 125 H178" markerId={arrow} tone="slate" />
          <Connector d="M300 125 H324" markerId={arrow} tone="slate" />

          <Boundary x={18} y={260} width={442} height={172} label="LATENT START · PURE TEXT-TO-IMAGE" tone="amber" />
          <DiagramNode x={42} y={312} width={112} height={66} title="Seed" detail="user chosen" tone="sky" />
          <DiagramNode x={205} y={302} width={150} height={86} title="Sample latent noise" detail="random xT" tone="amber" />
          <Connector d="M154 345 H195" markerId={arrow} tone="slate" label="controls sampler" labelX={174} labelY={331} />
          <text x="238" y="414" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#78350f">NO INPUT IMAGE IS ENCODED HERE</text>

          <Boundary x={492} y={158} width={488} height={322} label="ITERATIVE LATENT DENOISING" tone="violet" />
          <DiagramNode x={520} y={198} width={150} height={58} title="Timestep t" detail="scheduler step" tone="slate" />
          <DiagramNode x={525} y={286} width={190} height={88} title="U-Net denoiser" detail="fixed · predicts latent noise" tone="violet" />
          <DiagramNode x={780} y={286} width={160} height={88} title="Scheduler" detail="calculates next latent" tone="slate" />
          <Connector d="M595 256 V276" markerId={arrow} tone="slate" />
          <Connector d="M355 345 H515" markerId={arrow} tone="slate" label="sampled xT" labelX={435} labelY={331} />
          <Connector d="M436 125 C500 125 490 316 515 316" markerId={cross} label="cross-attention: text → latent features" labelX={600} labelY={140} />
          <Connector d="M715 330 H770" markerId={arrow} tone="slate" label="prediction" labelX={742} labelY={316} />
          <path d="M860 374 C860 430 650 438 620 384" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="8 6" markerEnd={`url(#${cross})`} />
          <text x="742" y="430" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">UPDATED LATENT LOOPS BACK · REPEAT T → … → 0</text>
          <DiagramNode x={520} y={502} width={145} height={68} title="Final latent" detail="calculated state" tone="slate" />
          <DiagramNode x={715} y={492} width={145} height={88} title="VAE decoder" detail="fixed · latent → pixels" tone="violet" />
          <PhotoTile x={895} y={502} width={72} height={62} label="generated" />
          <Connector d="M860 374 C860 455 592 455 592 492" markerId={arrow} tone="slate" label="last step" labelX={700} labelY={470} />
          <Connector d="M665 536 H705" markerId={arrow} tone="slate" />
          <Connector d="M860 536 H885" markerId={arrow} tone="slate" />

          <Boundary x={18} y={505} width={442} height={130} label="TRAINING / IMG2IMG INSET" tone="sky" />
          <PhotoTile x={45} y={535} width={70} height={52} label="input image" />
          <DiagramNode x={160} y={525} width={130} height={66} title="VAE encoder" detail="fixed bridge" tone="violet" />
          <DiagramNode x={335} y={525} width={100} height={66} title="Latent" detail="image start" tone="slate" />
          <Connector d="M115 561 H150" markerId={arrow} tone="slate" />
          <Connector d="M290 558 H325" markerId={arrow} tone="slate" />
          <text x="239" y="626" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0c4a6e">USED WHEN AN IMAGE EXISTS · NOT THE PURE TEXT-TO-IMAGE START</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1270">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${cross}-mobile`} color="#7c3aed" /></defs>
          <Boundary x={8} y={28} width={284} height={238} label="TEXT STREAM" tone="sky" />
          <DiagramNode x={25} y={66} width={110} height={58} title="Prompt" detail="user supplied" tone="sky" />
          <DiagramNode x={165} y={66} width={110} height={58} title="Tokenizer" detail="fixed vocab" tone="violet" />
          <Connector d="M135 95 H155" markerId={`${arrow}-mobile`} tone="slate" />
          <DiagramNode x={70} y={162} width={160} height={66} title="Text encoder" detail="fixed · context tokens" tone="violet" />
          <Connector d="M220 124 C220 145 190 145 190 162" markerId={`${arrow}-mobile`} tone="slate" />

          <Boundary x={8} y={310} width={284} height={208} label="PURE TEXT-TO-IMAGE START" tone="amber" />
          <DiagramNode x={25} y={355} width={105} height={58} title="Seed" detail="user chosen" tone="sky" />
          <DiagramNode x={160} y={345} width={115} height={78} title="Latent noise" detail="sampled xT" tone="amber" />
          <Connector d="M130 384 H150" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="150" y="470" textAnchor="middle" fontSize="11" fontWeight="800" fill="#78350f">NO INPUT IMAGE IS ENCODED</text>

          <Boundary x={8} y={560} width={284} height={402} label="REPEAT LATENT DENOISING" tone="violet" />
          <DiagramNode x={75} y={602} width={150} height={58} title="Timestep t" detail="current step" tone="slate" />
          <DiagramNode x={65} y={706} width={170} height={76} title="U-Net denoiser" detail="fixed · predicts noise" tone="violet" />
          <Connector d="M150 660 V696" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M218 423 C285 500 268 744 245 744" markerId={`${arrow}-mobile`} tone="slate" label="sampled xT" labelX={250} labelY={540} />
          <Connector d="M150 228 C20 350 28 744 55 744" markerId={`${cross}-mobile`} label="text via cross-attention" labelX={90} labelY={542} />
          <DiagramNode x={65} y={832} width={170} height={68} title="Scheduler" detail="calculates next latent" tone="slate" />
          <Connector d="M150 782 V822" markerId={`${arrow}-mobile`} tone="slate" />
          <path d="M65 866 C20 866 20 745 55 745" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 6" markerEnd={`url(#${cross}-mobile)`} />
          <text x="150" y="933" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#4c1d95">UPDATED LATENT → REPEAT</text>

          <DiagramNode x={18} y={1005} width={112} height={62} title="Final latent" detail="calculated" tone="slate" />
          <DiagramNode x={170} y={995} width={112} height={82} title="VAE decoder" detail="fixed · pixels" tone="violet" />
          <Connector d="M150 900 V975 C150 990 90 990 90 1005" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M130 1036 H160" markerId={`${arrow}-mobile`} tone="slate" />
          <PhotoTile x={110} y={1110} width={80} height={62} label="generated image" />
          <Connector d="M226 1077 C226 1097 150 1097 150 1100" markerId={`${arrow}-mobile`} tone="slate" />

          <Boundary x={8} y={1198} width={284} height={62} label="TRAINING / IMG2IMG ONLY" tone="sky" />
          <text x="150" y="1238" textAnchor="middle" fontSize="10.8" fontWeight="700" fill="#0c4a6e">input image → VAE encoder → starting latent</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "user supplied" },
        { tone: "violet", label: "fixed/pretrained component" },
        { tone: "amber", label: "sampled randomness" },
        { tone: "slate", label: "iterative calculated state" },
        { tone: "emerald", label: "generated output" },
      ]} />
    </GenAIFigure>
  );
}

export function ClassifierFreeGuidanceDiagram() {
  const arrow = "cfg-forward-arrow";
  const math = "cfg-math-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Classifier-free guidance scales the difference between two model predictions"
      caption="The numbers are pedagogical scalar values, not pixels. Both 0.2 and 0.5 are model outputs for the same noisy latent and timestep; scale 3 is chosen by the user or developer; 1.1 is calculated."
      description="The same noisy latent x t and timestep enter two evaluations of the same fixed denoiser. The unconditional or negative branch produces epsilon hat uncond equal to 0.2. The prompt-conditioned branch produces epsilon hat cond equal to 0.5. Their difference is 0.3, the chosen guidance scale 3 expands it to 0.9, and adding the 0.2 baseline gives guided prediction 1.1. A number line shows that scale 3 pushes the guided result beyond the ordinary conditional output 0.5."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 520">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={math} color="#7c3aed" /></defs>
          <DiagramNode x={28} y={205} width={155} height={82} title="Same xₜ + t" detail="model inputs" tone="sky" />
          <Boundary x={215} y={38} width={315} height={180} label="UNCONDITIONAL / NEGATIVE BRANCH" tone="slate" />
          <DiagramNode x={250} y={88} width={145} height={76} title="Same denoiser" detail="no/negative text" tone="violet" badge="FIXED" />
          <DiagramNode x={420} y={88} width={88} height={76} title="ε̂uncond" detail="0.2" tone="slate" />
          <Boundary x={215} y={274} width={315} height={180} label="CONDITIONAL PROMPT BRANCH" tone="sky" />
          <DiagramNode x={250} y={324} width={145} height={76} title="Same denoiser" detail="prompt text" tone="violet" badge="FIXED" />
          <DiagramNode x={420} y={324} width={88} height={76} title="ε̂cond" detail="0.5" tone="sky" />
          <Connector d="M183 246 C212 246 202 126 240 126" markerId={arrow} tone="slate" />
          <Connector d="M183 246 C212 246 202 362 240 362" markerId={arrow} tone="slate" />
          <Connector d="M395 126 H410" markerId={arrow} tone="slate" />
          <Connector d="M395 362 H410" markerId={arrow} tone="slate" />
          <Tag x={425} y={173} text="MODEL OUTPUT" tone="slate" />
          <Tag x={425} y={409} text="MODEL OUTPUT" tone="sky" />

          <DiagramNode x={580} y={70} width={165} height={82} title="Difference" detail="0.5 − 0.2 = 0.3" tone="violet" />
          <DiagramNode x={580} y={190} width={165} height={82} title="Scale s = 3 (chosen)" detail="3 × 0.3 = 0.9" tone="amber" />
          <DiagramNode x={580} y={310} width={165} height={82} title="Add baseline" detail="0.2 + 0.9" tone="slate" />
          <DiagramNode x={805} y={190} width={155} height={92} title="ε̂guided = 1.1" detail="calculated output" tone="emerald" />
          <Connector d="M508 126 H570" markerId={math} label="cond − uncond" labelX={540} labelY={111} />
          <Connector d="M662 152 V180" markerId={math} />
          <Connector d="M662 272 V300" markerId={math} />
          <Connector d="M745 350 C790 350 775 236 795 236" markerId={math} />

          <line x1="580" y1="456" x2="950" y2="456" stroke="#64748b" strokeWidth="2.5" />
          {[0.2, 0.5, 1.1].map((value, index) => {
            const x = [620, 720, 910][index];
            return <g key={value}><line x1={x} y1="447" x2={x} y2="465" stroke={index === 2 ? "#059669" : "#64748b"} strokeWidth="3" /><text x={x} y="486" textAnchor="middle" fontSize="12" fontWeight="800" fill={index === 2 ? "#064e3b" : "#334155"}>{value}</text></g>;
          })}
          <path d="M720 438 C770 408 850 408 910 438" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd={`url(#${math})`} />
          <text x="815" y="414" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#881337">s &gt; 1 PUSHES BEYOND 0.5</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 930">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${math}-mobile`} color="#7c3aed" /></defs>
          <DiagramNode x={70} y={28} width={160} height={64} title="Same xₜ + t" detail="both model inputs" tone="sky" />
          <Boundary x={8} y={145} width={135} height={230} label="NO / NEGATIVE" tone="slate" />
          <DiagramNode x={22} y={190} width={107} height={72} title="Denoiser" detail="same model" tone="violet" badge="FIXED" />
          <DiagramNode x={27} y={295} width={97} height={58} title="ε̂uncond" detail="0.2" tone="slate" />
          <Boundary x={157} y={145} width={135} height={230} label="PROMPT" tone="sky" />
          <DiagramNode x={171} y={190} width={107} height={72} title="Denoiser" detail="same model" tone="violet" badge="FIXED" />
          <DiagramNode x={176} y={295} width={97} height={58} title="ε̂cond" detail="0.5" tone="sky" />
          <Connector d="M150 92 C150 125 75 125 75 180" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M150 92 C150 125 225 125 225 180" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M75 262 V285" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M225 262 V285" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="75" y="368" textAnchor="middle" fontSize="9.8" fontWeight="800" fill="#334155">MODEL OUTPUT</text>
          <text x="225" y="368" textAnchor="middle" fontSize="9.8" fontWeight="800" fill="#0c4a6e">MODEL OUTPUT</text>

          <DiagramNode x={65} y={430} width={170} height={64} title="Difference" detail="0.5 − 0.2 = 0.3" tone="violet" />
          <path d="M75 375 C75 405 112 405 112 420 M225 375 C225 405 188 405 188 420" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
          <path d="M105 412 l7 8 l7 -8 z M181 412 l7 8 l7 -8 z" fill="#7c3aed" />
          <DiagramNode x={65} y={540} width={170} height={64} title="Scale s = 3 (chosen)" detail="3 × 0.3 = 0.9" tone="amber" />
          <Connector d="M150 494 V530" markerId={`${math}-mobile`} />
          <DiagramNode x={65} y={650} width={170} height={64} title="Add baseline 0.2" detail="0.2 + 0.9" tone="slate" />
          <Connector d="M150 604 V640" markerId={`${math}-mobile`} />
          <DiagramNode x={65} y={760} width={170} height={70} title="ε̂guided = 1.1" detail="calculated, not a pixel" tone="emerald" />
          <Connector d="M150 714 V750" markerId={`${math}-mobile`} />
          <line x1="45" y1="878" x2="255" y2="878" stroke="#64748b" strokeWidth="2.5" />
          <text x="45" y="902" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#334155">0.2</text>
          <text x="115" y="902" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#334155">0.5</text>
          <text x="245" y="902" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">1.1</text>
          <path d="M115 864 C150 840 210 840 245 864" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd={`url(#${math}-mobile)`} />
          <text x="180" y="846" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">PUSHES BEYOND 0.5</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "violet", label: "same fixed model" },
        { tone: "sky", label: "model prediction" },
        { tone: "amber", label: "chosen guidance scale" },
        { tone: "emerald", label: "calculated guided result" },
      ]} />
    </GenAIFigure>
  );
}

export function DiffusionControlMethodsDiagram() {
  const arrow = "control-method-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — Each diffusion control supplies a different kind of constraint"
      caption="Prompt/CFG supplies language only; image-to-image supplies an entire starting composition; inpainting supplies a spatial edit mask; ControlNet-style guidance supplies explicit geometry such as pose, edges, depth, or segments."
      description="Four spatially different mini diagrams compare diffusion controls. Prompt and guidance send only a text bubble toward a flexible generated scene. Image-to-image sends an existing scene plus a strength control toward a transformed scene with the same broad layout. Inpainting overlays a highlighted mask on one region of an image and changes only that region under a prompt. A ControlNet-style path sends a stick-pose condition and a prompt toward a generated figure that follows the same pose. Each mini diagram names what the method attempts to preserve."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 700">
          <defs><ArrowMarker id={arrow} /></defs>
          <Boundary x={18} y={38} width={462} height={286} label="PROMPT / CFG · LANGUAGE CONSTRAINT" tone="amber" />
          <PromptGlyph x={45} y={92} text="a violet cabin" />
          <circle cx="245" cy="133" r="46" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" strokeDasharray="7 5" />
          <text x="245" y="128" textAnchor="middle" fontSize="12" fontWeight="800" fill="#78350f">FLEXIBLE</text>
          <text x="245" y="146" textAnchor="middle" fontSize="10.5" fill="#78350f">layout</text>
          <PhotoTile x={350} y={92} width={92} height={76} label="new scene" />
          <Connector d="M165 118 H192" markerId={arrow} tone="slate" />
          <Connector d="M291 133 H340" markerId={arrow} tone="slate" />
          <text x="249" y="218" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#78350f">EXTRA INPUT: TEXT + GUIDANCE SCALE</text>
          <text x="249" y="244" textAnchor="middle" fontSize="11.5" fill="#475569">preserves semantics/style · not exact geometry</text>

          <Boundary x={520} y={38} width={462} height={286} label="IMG2IMG · COMPOSITION ANCHOR" tone="sky" />
          <SceneTile x={548} y={82} />
          <line x1="692" y1="113" x2="792" y2="113" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="727" cy="113" r="10" fill="#0284c7" />
          <text x="742" y="145" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0c4a6e">strength = 0.35</text>
          <SceneTile x={832} y={82} changed />
          <Connector d="M668 123 H682" markerId={arrow} tone="slate" />
          <Connector d="M792 123 H822" markerId={arrow} tone="slate" />
          <text x="750" y="218" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0c4a6e">EXTRA INPUT: EXISTING IMAGE + STRENGTH</text>
          <text x="750" y="244" textAnchor="middle" fontSize="11.5" fill="#475569">preserves broad composition while changing appearance</text>

          <Boundary x={18} y={372} width={462} height={288} label="INPAINTING · REGION ANCHOR" tone="rose" />
          <SceneTile x={48} y={425} masked />
          <PromptGlyph x={190} y={438} text="make door red" />
          <SceneTile x={350} y={425} changed />
          <Connector d="M168 465 H180" markerId={arrow} tone="slate" />
          <Connector d="M310 465 H340" markerId={arrow} tone="slate" />
          <text x="250" y="554" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#881337">EXTRA INPUT: IMAGE + SPATIAL MASK + PROMPT</text>
          <text x="250" y="580" textAnchor="middle" fontSize="11.5" fill="#475569">preserves unmasked context and regenerates the marked region</text>

          <Boundary x={520} y={372} width={462} height={288} label="CONTROLNET-STYLE · GEOMETRY ANCHOR" tone="violet" />
          <PoseTile x={545} y={410} />
          <PromptGlyph x={675} y={438} text="dancer, blue" />
          <PoseTile x={846} y={410} output />
          <Connector d="M650 460 H665" markerId={arrow} tone="slate" />
          <Connector d="M795 460 H836" markerId={arrow} tone="slate" />
          <text x="750" y="554" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#4c1d95">EXTRA INPUT: POSE / EDGE / DEPTH / SEGMENTS</text>
          <text x="750" y="580" textAnchor="middle" fontSize="11.5" fill="#475569">preserves explicit structure while the prompt supplies appearance</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1240">
          <defs><ArrowMarker id={`${arrow}-mobile`} /></defs>
          <Boundary x={8} y={28} width={284} height={260} label="PROMPT / CFG" tone="amber" />
          <PromptGlyph x={18} y={76} text="violet cabin" />
          <PhotoTile x={195} y={76} width={82} height={68} label="flexible scene" />
          <Connector d="M138 104 H185" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="150" y="202" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#78350f">EXTRA: TEXT + CFG</text>
          <text x="150" y="226" textAnchor="middle" fontSize="10.5" fill="#475569">preserves meaning, not exact layout</text>

          <Boundary x={8} y={330} width={284} height={270} label="IMG2IMG" tone="sky" />
          <SceneTile x={18} y={378} /><SceneTile x={162} y={378} changed />
          <Connector d="M138 419 H152" markerId={`${arrow}-mobile`} tone="slate" />
          <line x1="88" y1="502" x2="212" y2="502" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="132" cy="502" r="9" fill="#0284c7" />
          <text x="150" y="534" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">EXTRA: IMAGE + STRENGTH</text>
          <text x="150" y="557" textAnchor="middle" fontSize="10.5" fill="#475569">preserves broad composition</text>

          <Boundary x={8} y={642} width={284} height={270} label="INPAINTING" tone="rose" />
          <SceneTile x={18} y={690} masked /><SceneTile x={162} y={690} changed />
          <Connector d="M138 731 H152" markerId={`${arrow}-mobile`} tone="slate" />
          <PromptGlyph x={90} y={793} text="red door" />
          <text x="150" y="866" textAnchor="middle" fontSize="11.2" fontWeight="800" fill="#881337">EXTRA: IMAGE + MASK + PROMPT</text>
          <text x="150" y="889" textAnchor="middle" fontSize="10.5" fill="#475569">preserves unmasked context</text>

          <Boundary x={8} y={954} width={284} height={270} label="CONTROLNET-STYLE" tone="violet" />
          <PoseTile x={20} y={1002} /><PoseTile x={175} y={1002} output />
          <Connector d="M125 1052 H165" markerId={`${arrow}-mobile`} tone="slate" />
          <PromptGlyph x={90} y={1112} text="dancer, blue" />
          <text x="150" y="1188" textAnchor="middle" fontSize="11" fontWeight="800" fill="#4c1d95">EXTRA: POSE / EDGE / DEPTH</text>
          <text x="150" y="1211" textAnchor="middle" fontSize="10.5" fill="#475569">preserves explicit geometry</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "amber", label: "language-only control" },
        { tone: "sky", label: "existing image / structure input" },
        { tone: "rose", label: "masked edit region" },
        { tone: "violet", label: "geometry condition" },
        { tone: "emerald", label: "generated result" },
      ]} />
    </GenAIFigure>
  );
}

export function FineTuningMethodsDiagram() {
  const arrow = "finetuning-method-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Textual Inversion, DreamBooth, and LoRA differ mainly in what training is allowed to change"
      caption="All three begin with a pretrained generator. Textual Inversion learns a small token representation, DreamBooth adapts more model capacity in an implementation-dependent way, and LoRA learns compact low-rank side matrices while the original weight stays frozen."
      description="A shared frozen pretrained model branches into three distinct adaptation diagrams. Textual Inversion adds one trainable row to a token embedding table while the base model remains frozen and saves a tiny embedding artifact. DreamBooth highlights several adaptable regions inside a larger model, notes that implementations vary and do not necessarily update every parameter, and saves a larger-capacity artifact. LoRA shows a frozen W matrix beside narrow trainable A and B matrices and saves a compact adapter. Capacity bars compare the relative amount of learned state conceptually rather than claiming universal file sizes."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 620">
          <defs><ArrowMarker id={arrow} /></defs>
          <DiagramNode x={390} y={32} width={220} height={76} title="Pretrained generator" detail="common frozen starting model" tone="violet" />
          <path d="M500 108 V145 H170 V175 M500 145 V175 M500 145 H830 V175" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M162 167 l8 8 l8 -8 z M492 167 l8 8 l8 -8 z M822 167 l8 8 l8 -8 z" fill="#64748b" />

          <Boundary x={18} y={180} width={304} height={390} label="TEXTUAL INVERSION" tone="sky" />
          <text x="170" y="220" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">LEARN A NEW TOKEN EMBEDDING</text>
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              <rect x="62" y={245 + row * 34} width="116" height="26" rx="5" fill={row === 3 ? "#d1fae5" : "#e2e8f0"} stroke={row === 3 ? "#059669" : "#64748b"} />
              <text x="120" y={263 + row * 34} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={row === 3 ? "#064e3b" : "#475569"}>{row === 3 ? "<new> · TRAIN" : "existing token"}</text>
            </g>
          ))}
          <DiagramNode x={196} y={265} width={100} height={78} title="Base model" detail="frozen" tone="slate" />
          <Connector d="M178 347 H186" markerId={arrow} tone="slate" />
          <Tag x={65} y={405} text="SAVED: TOKEN EMBEDDING" tone="emerald" />
          <CapacityBar x={65} y={475} width={210} filled={0.2} label="learned capacity / artifact: smallest" />
          <text x="170" y="530" textAnchor="middle" fontSize="10.5" fill="#475569">base parameters stay frozen</text>

          <Boundary x={348} y={180} width={304} height={390} label="DREAMBOOTH" tone="rose" />
          <text x="500" y="220" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#881337">ADAPT MORE MODEL CAPACITY</text>
          {Array.from({ length: 20 }, (_, index) => {
            const col = index % 5;
            const row = Math.floor(index / 5);
            const trainable = [2, 4, 6, 7, 11, 13, 18].includes(index);
            return <rect key={index} x={405 + col * 38} y={250 + row * 38} width="30" height="30" rx="4" fill={trainable ? "#d1fae5" : "#e2e8f0"} stroke={trainable ? "#059669" : "#64748b"} />;
          })}
          <Tag x={407} y={420} text="SOME/LARGER REGIONS TRAIN" tone="emerald" />
          <CapacityBar x={395} y={475} width={210} filled={0.85} label="learned capacity / artifact: larger" />
          <text x="500" y="523" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#881337">IMPLEMENTATIONS VARY</text>
          <text x="500" y="541" textAnchor="middle" fontSize="10.5" fill="#475569">does not always update every parameter</text>

          <Boundary x={678} y={180} width={304} height={390} label="LoRA" tone="violet" />
          <text x="830" y="220" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#4c1d95">FREEZE W · TRAIN LOW-RANK A/B</text>
          <MatrixGlyph x={716} y={262} rows={4} cols={4} cell={24} label="W · FROZEN" />
          <MatrixGlyph x={844} y={300} rows={1} cols={4} cell={20} label="A · TRAIN" tone="emerald" />
          <MatrixGlyph x={938} y={270} rows={4} cols={1} cell={20} label="B" tone="emerald" />
          <path d="M924 310 H932" fill="none" stroke="#059669" strokeWidth="2.5" markerEnd={`url(#${arrow})`} />
          <Tag x={744} y={405} text="SAVED: A/B ADAPTER" tone="emerald" />
          <CapacityBar x={725} y={475} width={210} filled={0.38} label="learned capacity / artifact: compact" />
          <text x="830" y="530" textAnchor="middle" fontSize="10.5" fill="#475569">original W remains available unchanged</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1180">
          <defs><ArrowMarker id={`${arrow}-mobile`} /></defs>
          <DiagramNode x={65} y={25} width={170} height={66} title="Pretrained model" detail="common start · frozen" tone="violet" />
          <text x="150" y="118" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#475569">THREE ALTERNATIVE ADAPTATION METHODS</text>
          <Boundary x={8} y={140} width={284} height={285} label="TEXTUAL INVERSION" tone="sky" />
          {[0, 1, 2].map((row) => (
            <g key={row}>
              <rect x="35" y={190 + row * 37} width="112" height="28" rx="5" fill={row === 2 ? "#d1fae5" : "#e2e8f0"} stroke={row === 2 ? "#059669" : "#64748b"} />
              <text x="91" y={209 + row * 37} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={row === 2 ? "#064e3b" : "#475569"}>{row === 2 ? "<new> · TRAIN" : "existing token"}</text>
            </g>
          ))}
          <DiagramNode x={170} y={205} width={105} height={72} title="Base" detail="frozen" tone="slate" />
          <Tag x={63} y={324} text="SAVE TOKEN EMBEDDING" tone="emerald" />
          <CapacityBar x={45} y={382} width={210} filled={0.2} label="smallest learned artifact" />

          <Boundary x={8} y={472} width={284} height={305} label="DREAMBOOTH" tone="rose" />
          {Array.from({ length: 15 }, (_, index) => {
            const col = index % 5;
            const row = Math.floor(index / 5);
            const trainable = [1, 4, 6, 8, 12].includes(index);
            return <rect key={index} x={57 + col * 38} y={525 + row * 38} width="30" height="30" rx="4" fill={trainable ? "#d1fae5" : "#e2e8f0"} stroke={trainable ? "#059669" : "#64748b"} />;
          })}
          <Tag x={55} y={660} text="MORE CAPACITY MAY TRAIN" tone="emerald" />
          <text x="150" y="706" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#881337">IMPLEMENTATIONS VARY · NOT ALL WEIGHTS</text>
          <CapacityBar x={45} y={742} width={210} filled={0.85} label="larger learned artifact / capacity" />

          <Boundary x={8} y={824} width={284} height={330} label="LoRA" tone="violet" />
          <MatrixGlyph x={42} y={890} rows={4} cols={4} cell={22} label="W · FROZEN" />
          <MatrixGlyph x={164} y={922} rows={1} cols={4} cell={18} label="A · TRAIN" tone="emerald" />
          <MatrixGlyph x={252} y={892} rows={4} cols={1} cell={18} label="B" tone="emerald" />
          <Tag x={72} y={1015} text="SAVE A/B ADAPTER" tone="emerald" />
          <CapacityBar x={45} y={1084} width={210} filled={0.38} label="compact learned artifact" />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "slate", label: "frozen parameters" },
        { tone: "emerald", label: "trainable / saved state" },
        { tone: "sky", label: "new token representation" },
        { tone: "rose", label: "larger adaptable capacity" },
      ]} />
    </GenAIFigure>
  );
}

export function LoRASidePathDiagram() {
  const arrow = "lora-side-arrow";
  const train = "lora-train-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — LoRA adds a narrow trainable path beside the frozen base weight"
      caption="Toy shapes for teaching: W is 4 × 4, A is 1 × 4, and B is 4 × 1. Real layers are usually much larger. W stays fixed; A and B train; both paths are added to produce the adapted output."
      description="Input x splits into two paths. The base path multiplies x by a frozen four by four matrix W to produce W x. The adapter path multiplies x by a trainable one by four matrix A, creating a rank-one representation, then by a trainable four by one matrix B to produce B A x. A chosen scale multiplies the adapter result. The frozen W x and scaled B A x meet at a plus operator and produce the adapted output W x plus scale times B A x. The narrow drawings of A and B show why the update is low rank."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 540">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={train} color="#059669" /></defs>
          <Tag x={28} y={24} text="TOY SHAPES FOR TEACHING" tone="amber" />
          <DiagramNode x={42} y={208} width={120} height={72} title="Input x" detail="4 values" tone="sky" />
          <circle cx="202" cy="244" r="8" fill="#ffffff" stroke="#64748b" strokeWidth="2.5" />
          <Connector d="M162 244 H188" markerId={arrow} tone="slate" />

          <Boundary x={230} y={50} width={500} height={190} label="BASE PATH · FROZEN" tone="slate" />
          <MatrixGlyph x={285} y={104} rows={4} cols={4} cell={24} label="W = 4 × 4 · FROZEN" />
          <DiagramNode x={470} y={112} width={120} height={70} title="Wx" detail="base output" tone="slate" />
          <Connector d="M202 236 C230 180 250 155 275 155" markerId={arrow} tone="slate" />
          <Connector d="M381 152 H460" markerId={arrow} tone="slate" />

          <Boundary x={230} y={286} width={500} height={214} label="ADAPTER PATH · TRAIN A AND B" tone="emerald" />
          <MatrixGlyph x={275} y={362} rows={1} cols={4} cell={24} label="A = 1 × 4" tone="emerald" />
          <DiagramNode x={400} y={340} width={92} height={72} title="rank 1" detail="Ax" tone="emerald" />
          <MatrixGlyph x={535} y={326} rows={4} cols={1} cell={24} label="B = 4 × 1" tone="emerald" />
          <DiagramNode x={620} y={340} width={88} height={72} title="BAx" detail="4 values" tone="emerald" />
          <Connector d="M202 252 C230 320 250 374 265 374" markerId={train} tone="emerald" />
          <Connector d="M371 374 H390" markerId={train} tone="emerald" />
          <Connector d="M492 376 H525" markerId={train} tone="emerald" />
          <Connector d="M559 376 H610" markerId={train} tone="emerald" />
          <Tag x={605} y={437} text="× SCALE · CHOSEN" tone="amber" />

          <circle cx="800" cy="244" r="28" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
          <text x="800" y="253" textAnchor="middle" fontSize="28" fontWeight="700" fill="#4c1d95">+</text>
          <Connector d="M590 147 C700 147 745 205 770 230" markerId={arrow} tone="slate" label="Wx" labelX={690} labelY={137} />
          <Connector d="M708 376 C760 376 780 312 792 282" markerId={train} tone="emerald" label="scale × BAx" labelX={773} labelY={354} />
          <DiagramNode x={860} y={202} width={115} height={84} title="Adapted output" detail="Wx + scale × BAx" tone="violet" />
          <Connector d="M828 244 H850" markerId={arrow} tone="slate" />
          <text x="480" y="526" textAnchor="middle" fontSize="12" fontWeight="800" fill="#064e3b">A AND B ARE NARROWER THAN W, SO THE TRAINABLE UPDATE IS LOW RANK</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 920">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${train}-mobile`} color="#059669" /></defs>
          <Tag x={56} y={20} text="TOY SHAPES FOR TEACHING" tone="amber" />
          <DiagramNode x={75} y={68} width={150} height={62} title="Input x" detail="4 values" tone="sky" />

          <Boundary x={8} y={180} width={284} height={230} label="BASE PATH · FROZEN" tone="slate" />
          <MatrixGlyph x={42} y={250} rows={4} cols={4} cell={22} label="W = 4 × 4" />
          <DiagramNode x={185} y={250} width={90} height={72} title="Wx" detail="base" tone="slate" />
          <Connector d="M150 130 C150 175 86 190 86 240" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M138 292 H175" markerId={`${arrow}-mobile`} tone="slate" />

          <Boundary x={8} y={462} width={284} height={315} label="ADAPTER · TRAIN A/B" tone="emerald" />
          <MatrixGlyph x={28} y={535} rows={1} cols={4} cell={22} label="A = 1 × 4" tone="emerald" />
          <DiagramNode x={142} y={512} width={80} height={68} title="rank 1" detail="Ax" tone="emerald" />
          <MatrixGlyph x={252} y={498} rows={4} cols={1} cell={20} label="B" tone="emerald" />
          <text x="72" y="512" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">SAME INPUT x ↓</text>
          <Connector d="M116 546 H132" markerId={`${train}-mobile`} tone="emerald" />
          <Connector d="M222 546 H242" markerId={`${train}-mobile`} tone="emerald" />
          <DiagramNode x={50} y={650} width={105} height={66} title="BAx" detail="4 values" tone="emerald" />
          <Tag x={170} y={670} text="× SCALE" tone="amber" />
          <Connector d="M272 578 C272 630 115 630 115 640" markerId={`${train}-mobile`} tone="emerald" />

          <circle cx="150" cy="810" r="27" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
          <text x="150" y="819" textAnchor="middle" fontSize="27" fontWeight="700" fill="#4c1d95">+</text>
          <Connector d="M230 322 C286 350 286 810 177 810" markerId={`${arrow}-mobile`} tone="slate" label="Wx bypass" labelX={245} labelY={438} />
          <Connector d="M115 716 C115 750 135 760 142 773" markerId={`${train}-mobile`} tone="emerald" />
          <DiagramNode x={65} y={852} width={170} height={62} title="Adapted output" detail="Wx + scale × BAx" tone="violet" />
          <Connector d="M150 837 V842" markerId={`${arrow}-mobile`} tone="slate" />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "slate", label: "frozen base W" },
        { tone: "emerald", label: "trainable low-rank A/B" },
        { tone: "amber", label: "chosen adapter scale" },
        { tone: "violet", label: "combined adapted output" },
      ]} />
    </GenAIFigure>
  );
}
