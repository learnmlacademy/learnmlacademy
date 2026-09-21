import {
  Boundary,
  Connector,
  DiagramCanvas,
  DiagramNode,
  GenAIFigure,
  Legend,
} from "./GenAIDiagrams";

function ArrowMarker({ id, color = "#7c3aed" }: { id: string; color?: string }) {
  return (
    <marker id={id} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,4.5 L0,9 z" fill={color} />
    </marker>
  );
}

function StatusPill({
  x,
  y,
  width,
  label,
  fill,
  stroke,
  color,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  fill: string;
  stroke: string;
  color: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="24" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + width / 2} y={y + 16.5} textAnchor="middle" fontSize="11.5" fontWeight="800" fill={color}>{label}</text>
    </g>
  );
}

function MiniSample({
  x,
  y,
  shape,
  tone,
  label,
}: {
  x: number;
  y: number;
  shape: "round" | "soft-square" | "square";
  tone: "sky" | "violet" | "emerald";
  label: string;
}) {
  const colors = {
    sky: { fill: "#bae6fd", stroke: "#0284c7" },
    violet: { fill: "#ddd6fe", stroke: "#7c3aed" },
    emerald: { fill: "#a7f3d0", stroke: "#059669" },
  }[tone];
  const radius = shape === "round" ? 28 : shape === "soft-square" ? 12 : 4;
  return (
    <g>
      <rect x={x} y={y} width="68" height="68" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x={x + 17} y={y + 17} width="34" height="34" rx={radius} fill={colors.fill} stroke={colors.stroke} strokeWidth="2.5" />
      <text x={x + 34} y={y + 88} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">{label}</text>
    </g>
  );
}

function NoiseTile({
  x,
  y,
  stage,
  label,
  detail,
}: {
  x: number;
  y: number;
  stage: 0 | 1 | 2 | 3;
  label: string;
  detail: string;
}) {
  const noise = [
    [13, 13], [34, 10], [58, 15], [18, 35], [48, 35], [68, 42], [9, 60], [33, 64], [60, 66],
    [26, 22], [53, 25], [22, 51], [51, 55], [72, 65], [72, 10], [8, 27],
  ];
  const count = [1, 5, 10, 16][stage];
  const signalOpacity = [1, 0.78, 0.42, 0.08][stage];
  return (
    <g>
      <rect x={x} y={y} width="82" height="82" rx="12" fill="#f8fafc" stroke="#64748b" strokeWidth="1.8" />
      <circle cx={x + 41} cy={y + 41} r="23" fill="#38bdf8" fillOpacity={signalOpacity} stroke="#0369a1" strokeOpacity={signalOpacity} strokeWidth="2.5" />
      {noise.slice(0, count).map(([dx, dy], index) => (
        <circle key={index} cx={x + dx} cy={y + dy} r={stage === 3 ? 3.4 : 3} fill={index % 2 ? "#7c3aed" : "#e11d48"} fillOpacity={0.38 + stage * 0.16} />
      ))}
      <text x={x + 41} y={y + 104} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{label}</text>
      <text x={x + 41} y={y + 121} textAnchor="middle" fontSize="10.5" fill="#64748b">{detail}</text>
    </g>
  );
}

export function VAEArchitectureDiagram() {
  const arrow = "vae-architecture-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — A VAE learns a distribution, samples z, and reconstructs the input"
      caption="Blue marks observed data, violet marks learned network outputs, amber marks sampled randomness, and green marks values calculated from them. Follow the arrows to see exactly where z comes from."
      description="An input x enters a learned encoder. The encoder produces learned mean mu and log-variance. Independent epsilon is sampled from a standard normal distribution. Mean, log-variance, and epsilon enter the reparameterization calculation z equals mu plus exp of one half log-variance times epsilon. The calculated latent z enters a learned decoder, which produces reconstruction x hat."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 420">
          <defs><ArrowMarker id={arrow} /></defs>
          <Boundary x={18} y={45} width={420} height={285} label="ENCODER · LEARNED DISTRIBUTION" tone="sky" />
          <Boundary x={460} y={45} width={270} height={285} label="REPARAMETERIZATION" tone="amber" />
          <Boundary x={752} y={45} width={230} height={285} label="DECODER · LEARNED" tone="violet" />

          <DiagramNode x={42} y={142} width={118} height={72} title="Input x" detail="observed data" tone="sky" />
          <DiagramNode x={198} y={132} width={142} height={92} title="Encoder" detail="learned network" tone="violet" badge="MODEL" />
          <DiagramNode x={355} y={88} width={72} height={62} title="μ" detail="centre" tone="violet" />
          <DiagramNode x={355} y={222} width={72} height={62} title="log σ²" detail="spread" tone="violet" />
          <Connector d="M160 178 H198" markerId={arrow} />
          <Connector d="M340 166 C350 166 345 119 355 119" markerId={arrow} />
          <Connector d="M340 190 C350 190 345 253 355 253" markerId={arrow} />
          <StatusPill x={335} y={308} width={92} label="LEARNED" fill="#ede9fe" stroke="#7c3aed" color="#4c1d95" />

          <DiagramNode x={485} y={78} width={150} height={65} title="ε ~ N(0, I)" detail="sampled noise" tone="amber" />
          <StatusPill x={642} y={98} width={72} label="SAMPLED" fill="#fef3c7" stroke="#d97706" color="#78350f" />
          <rect x="485" y="192" width="220" height="92" rx="14" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x="595" y="222" textAnchor="middle" fontSize="15" fontWeight="800" fill="#064e3b">Calculate latent z</text>
          <text x="595" y="249" textAnchor="middle" fontSize="14" fontWeight="700" fill="#064e3b">z = μ + exp(½ log σ²) ⊙ ε</text>
          <text x="595" y="270" textAnchor="middle" fontSize="11.5" fill="#475569">centre + scaled random offset</text>
          <Connector d="M427 119 C455 119 455 218 485 218" markerId={arrow} />
          <Connector d="M427 253 H485" markerId={arrow} />
          <Connector d="M560 143 V192" markerId={arrow} />
          <StatusPill x={548} y={308} width={94} label="CALCULATED" fill="#d1fae5" stroke="#059669" color="#064e3b" />

          <DiagramNode x={775} y={132} width={105} height={92} title="Decoder" detail="learned network" tone="violet" badge="MODEL" />
          <DiagramNode x={895} y={142} width={72} height={72} title="x̂" detail="output" tone="emerald" />
          <Connector d="M705 238 C742 238 740 178 775 178" markerId={arrow} />
          <Connector d="M880 178 H895" markerId={arrow} />
          <text x="873" y="259" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#475569">reconstruction during training</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 790">
          <defs><ArrowMarker id={`${arrow}-mobile`} /></defs>
          <Boundary x={10} y={30} width={280} height={290} label="ENCODER · LEARNED OUTPUTS" tone="sky" />
          <DiagramNode x={75} y={58} width={150} height={56} title="Input x" detail="observed data" tone="sky" />
          <DiagramNode x={75} y={142} width={150} height={64} title="Encoder" detail="learned network" tone="violet" badge="MODEL" />
          <DiagramNode x={24} y={244} width={112} height={56} title="μ" detail="learned centre" tone="violet" />
          <DiagramNode x={164} y={244} width={112} height={56} title="log σ²" detail="learned spread" tone="violet" />
          <Connector d="M150 114 V142" markerId={`${arrow}-mobile`} />
          <path d="M150 206 V222 H80 V244 M150 222 H220 V244" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
          <path d="M73 236 l7 8 l7 -8 z M213 236 l7 8 l7 -8 z" fill="#7c3aed" />

          <Boundary x={10} y={365} width={280} height={220} label="REPARAMETERIZATION" tone="amber" />
          <DiagramNode x={75} y={394} width={150} height={56} title="ε ~ N(0, I)" detail="sampled randomness" tone="amber" />
          <rect x="40" y="490" width="220" height="70" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x="150" y="516" textAnchor="middle" fontSize="14" fontWeight="800" fill="#064e3b">Calculated latent z</text>
          <text x="150" y="541" textAnchor="middle" fontSize="13" fontWeight="700" fill="#064e3b">μ + exp(½ log σ²) ⊙ ε</text>
          <Connector d="M80 300 C80 340 55 340 55 490" markerId={`${arrow}-mobile`} />
          <Connector d="M220 300 C220 340 245 340 245 490" markerId={`${arrow}-mobile`} />
          <Connector d="M150 450 V490" markerId={`${arrow}-mobile`} />

          <Boundary x={10} y={630} width={280} height={145} label="DECODE" tone="violet" />
          <DiagramNode x={28} y={666} width={112} height={62} title="Decoder" detail="learned model" tone="violet" />
          <DiagramNode x={175} y={666} width={100} height={62} title="Output x̂" detail="reconstruction" tone="emerald" />
          <Connector d="M150 560 V625 C150 645 84 645 84 666" markerId={`${arrow}-mobile`} />
          <Connector d="M140 697 H175" markerId={`${arrow}-mobile`} />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "observed input" },
        { tone: "violet", label: "learned output/model" },
        { tone: "amber", label: "sampled randomness" },
        { tone: "emerald", label: "calculated/generated value" },
      ]} />
    </GenAIFigure>
  );
}

export function VAELatentSamplingDiagram() {
  const arrow = "vae-latent-sampling-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — An organized latent space makes new samples and smooth interpolation possible"
      caption="Generation does not encode an existing input first. It samples a latent point from the prior and decodes it; nearby latent points tend to produce related outputs."
      description="A standard-normal prior supplies a sampled latent point to an organized two-dimensional latent space. Nearby round, softly squared, and square regions are connected by an interpolation path. A learned decoder maps three nearby latent points to smoothly changing generated shapes, demonstrating why a VAE is generative rather than only compressive."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 430">
          <defs><ArrowMarker id={arrow} /></defs>
          <DiagramNode x={28} y={145} width={150} height={78} title="Prior N(0, I)" detail="sample z" tone="amber" />
          <StatusPill x={56} y={238} width={94} label="SAMPLED" fill="#fef3c7" stroke="#d97706" color="#78350f" />
          <Connector d="M178 184 H225" markerId={arrow} />

          <rect x="225" y="45" width="420" height="300" rx="20" fill="#fafafa" stroke="#a78bfa" strokeWidth="2" />
          <text x="247" y="75" fontSize="17" fontWeight="800" fill="#312e81">Organized latent space</text>
          <text x="247" y="322" fontSize="12.5" fill="#64748b">nearby z values encode gradual feature changes →</text>
          <g fill="#bae6fd" stroke="#0284c7" strokeWidth="2"><circle cx="300" cy="230" r="10" /><circle cx="330" cy="205" r="10" /><circle cx="345" cy="246" r="10" /></g>
          <g fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2"><circle cx="430" cy="175" r="10" /><circle cx="462" cy="195" r="10" /><circle cx="450" cy="225" r="10" /></g>
          <g fill="#a7f3d0" stroke="#059669" strokeWidth="2"><circle cx="555" cy="118" r="10" /><circle cx="585" cy="145" r="10" /><circle cx="570" cy="178" r="10" /></g>
          <path d="M315 225 C370 220 400 205 445 195 S525 160 575 145" fill="none" stroke="#e11d48" strokeWidth="4" strokeDasharray="7 5" />
          {[315, 445, 575].map((cx, index) => <circle key={cx} cx={cx} cy={[225, 195, 145][index]} r="16" fill="none" stroke="#e11d48" strokeWidth="3" />)}
          <text x="438" y="125" textAnchor="middle" fontSize="13" fontWeight="800" fill="#be123c">interpolation path zₐ → zₘ → zᵦ</text>

          <DiagramNode x={700} y={145} width={125} height={78} title="Decoder" detail="learned mapping" tone="violet" badge="MODEL" />
          <Connector d="M645 195 H700" markerId={arrow} label="decode z" labelX={674} labelY={181} />
          <path d="M825 184 H855" fill="none" stroke="#7c3aed" strokeWidth="2.5" markerEnd={`url(#${arrow})`} />
          <text x="895" y="92" textAnchor="middle" fontSize="13" fontWeight="800" fill="#064e3b">generated outputs</text>
          <MiniSample x={842} y={112} shape="round" tone="sky" label="zₐ" />
          <MiniSample x={842} y={230} shape="soft-square" tone="violet" label="zₘ" />
          <MiniSample x={918} y={171} shape="square" tone="emerald" label="zᵦ" />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 690">
          <defs><ArrowMarker id={`${arrow}-mobile`} /></defs>
          <DiagramNode x={70} y={18} width={160} height={62} title="Prior N(0, I)" detail="sample latent z" tone="amber" />
          <Connector d="M150 80 V115" markerId={`${arrow}-mobile`} label="sample" labelX={184} labelY={104} />
          <rect x="20" y="115" width="260" height="300" rx="18" fill="#fafafa" stroke="#a78bfa" strokeWidth="2" />
          <text x="40" y="145" fontSize="15" fontWeight="800" fill="#312e81">Organized latent space</text>
          <g fill="#bae6fd" stroke="#0284c7" strokeWidth="2"><circle cx="75" cy="330" r="9" /><circle cx="98" cy="305" r="9" /><circle cx="108" cy="345" r="9" /></g>
          <g fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2"><circle cx="150" cy="265" r="9" /><circle cx="175" cy="285" r="9" /></g>
          <g fill="#a7f3d0" stroke="#059669" strokeWidth="2"><circle cx="215" cy="205" r="9" /><circle cx="238" cy="230" r="9" /></g>
          <path d="M88 320 C125 310 135 280 162 275 S205 240 227 218" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeDasharray="6 5" />
          <circle cx="88" cy="320" r="14" fill="none" stroke="#e11d48" strokeWidth="3" />
          <circle cx="162" cy="275" r="14" fill="none" stroke="#e11d48" strokeWidth="3" />
          <circle cx="227" cy="218" r="14" fill="none" stroke="#e11d48" strokeWidth="3" />
          <text x="150" y="385" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#be123c">nearby samples → smooth change</text>
          <Connector d="M150 415 V455" markerId={`${arrow}-mobile`} />
          <DiagramNode x={80} y={455} width={140} height={62} title="Decoder" detail="learned mapping" tone="violet" badge="MODEL" />
          <Connector d="M150 517 V550" markerId={`${arrow}-mobile`} />
          <MiniSample x={25} y={550} shape="round" tone="sky" label="zₐ" />
          <MiniSample x={116} y={550} shape="soft-square" tone="violet" label="zₘ" />
          <MiniSample x={207} y={550} shape="square" tone="emerald" label="zᵦ" />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "amber", label: "sampled from prior" },
        { tone: "rose", label: "interpolation path", shape: "dashed" },
        { tone: "violet", label: "learned decoder" },
        { tone: "emerald", label: "generated output" },
      ]} />
    </GenAIFigure>
  );
}

export function GANGameDiagram() {
  const arrow = "gan-game-arrow";
  const slateArrow = "gan-game-slate-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — The generator creates fakes; the discriminator scores real and fake samples"
      caption="The generator never sees a real-or-fake label directly. Its learning signal comes from the discriminator's score on G(z)."
      description="Sampled random z enters the learned generator and becomes a fake sample. A real sample from the dataset and the fake sample both enter the same discriminator. The discriminator produces a high example real score and a low example fake score. A dashed feedback path carries the fake-score learning signal toward the generator."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 430">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={slateArrow} color="#64748b" /></defs>
          <Boundary x={20} y={42} width={960} height={320} label="THE ADVERSARIAL GAME" tone="violet" />
          <DiagramNode x={48} y={208} width={120} height={72} title="Random z" detail="sampled noise" tone="amber" />
          <DiagramNode x={215} y={198} width={155} height={92} title="Generator G" detail="creates a sample" tone="violet" badge="MODEL" />
          <DiagramNode x={420} y={208} width={130} height={72} title="Fake G(z)" detail="generated data" tone="rose" />
          <Connector d="M168 244 H215" markerId={arrow} />
          <Connector d="M370 244 H420" markerId={arrow} />

          <DiagramNode x={420} y={82} width={130} height={72} title="Real x" detail="dataset sample" tone="sky" />
          <DiagramNode x={640} y={142} width={170} height={92} title="Discriminator D" detail="probability of real" tone="violet" badge="MODEL" />
          <Connector d="M550 118 C600 118 590 172 640 172" markerId={slateArrow} tone="slate" label="score real" labelX={596} labelY={111} />
          <Connector d="M550 244 C600 244 590 204 640 204" markerId={slateArrow} tone="slate" label="score fake" labelX={596} labelY={258} />

          <rect x="850" y="92" width="105" height="70" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x="902" y="119" textAnchor="middle" fontSize="13" fontWeight="800" fill="#064e3b">D(real)</text>
          <text x="902" y="145" textAnchor="middle" fontSize="20" fontWeight="800" fill="#064e3b">0.91</text>
          <rect x="850" y="218" width="105" height="70" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
          <text x="902" y="245" textAnchor="middle" fontSize="13" fontWeight="800" fill="#881337">D(fake)</text>
          <text x="902" y="271" textAnchor="middle" fontSize="20" fontWeight="800" fill="#881337">0.18</text>
          <Connector d="M810 175 C832 175 830 127 850 127" markerId={slateArrow} tone="slate" />
          <Connector d="M810 202 C832 202 830 253 850 253" markerId={slateArrow} tone="slate" />
          <Connector d="M850 288 C770 355 292 355 292 290" markerId={arrow} dashed label="generator learns to raise D(G(z))" labelX={565} labelY={348} />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 760">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${slateArrow}-mobile`} color="#64748b" /></defs>
          <Boundary x={10} y={30} width={280} height={700} label="GENERATOR–DISCRIMINATOR GAME" tone="violet" />
          <DiagramNode x={75} y={62} width={150} height={58} title="Random z" detail="sampled noise" tone="amber" />
          <DiagramNode x={70} y={157} width={160} height={68} title="Generator G" detail="learned network" tone="violet" badge="MODEL" />
          <DiagramNode x={75} y={262} width={150} height={58} title="Fake G(z)" detail="generated sample" tone="rose" />
          <Connector d="M150 120 V157" markerId={`${arrow}-mobile`} />
          <Connector d="M150 225 V262" markerId={`${arrow}-mobile`} />
          <DiagramNode x={22} y={375} width={112} height={58} title="Real x" detail="from dataset" tone="sky" />
          <DiagramNode x={166} y={375} width={112} height={58} title="Fake G(z)" detail="same fake" tone="rose" />
          <DiagramNode x={65} y={485} width={170} height={68} title="Discriminator D" detail="scores both paths" tone="violet" badge="MODEL" />
          <Connector d="M78 433 C78 465 110 465 110 485" markerId={`${slateArrow}-mobile`} tone="slate" />
          <Connector d="M222 433 C222 465 190 465 190 485" markerId={`${slateArrow}-mobile`} tone="slate" />
          <rect x="30" y="600" width="105" height="62" rx="11" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x="82" y="625" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#064e3b">D(real)</text><text x="82" y="649" textAnchor="middle" fontSize="18" fontWeight="800" fill="#064e3b">0.91</text>
          <rect x="165" y="600" width="105" height="62" rx="11" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
          <text x="217" y="625" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#881337">D(fake)</text><text x="217" y="649" textAnchor="middle" fontSize="18" fontWeight="800" fill="#881337">0.18</text>
          <path d="M150 553 V575 H82 V600 M150 575 H217 V600" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M75 592 l7 8 l7 -8 z M210 592 l7 8 l7 -8 z" fill="#64748b" />
          <Connector d="M217 662 C217 712 42 712 42 190 C42 180 55 180 70 180" markerId={`${arrow}-mobile`} dashed />
          <text x="150" y="704" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">fake score provides G's learning signal</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "amber", label: "sampled input" },
        { tone: "sky", label: "real dataset sample" },
        { tone: "rose", label: "generated fake / score" },
        { tone: "violet", label: "learned model / feedback", shape: "dashed" },
      ]} />
    </GenAIFigure>
  );
}

export function GANAlternatingUpdatesDiagram() {
  const forward = "gan-update-forward";
  const gradient = "gan-update-gradient";
  return (
    <GenAIFigure
      title="Figure 2 — GAN training alternates which network is allowed to change"
      caption="Detach is used only in the discriminator step: it keeps the fake values but cuts their gradient connection to G. In the generator step, gradients must pass through the fixed discriminator back into G."
      description="The discriminator step sends real x with target one and a detached fake with target zero into the discriminator; only discriminator parameters update and a stop symbol marks the detached gradient. The generator step sends fresh z through the generator and fixed discriminator with target one; a dashed gradient path passes backward through the discriminator and fake sample to update only the generator."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 570">
          <defs><ArrowMarker id={forward} color="#64748b" /><ArrowMarker id={gradient} color="#e11d48" /></defs>
          <Boundary x={20} y={42} width={960} height={220} label="STEP 1 · TRAIN THE DISCRIMINATOR" tone="sky" />
          <DiagramNode x={48} y={82} width={120} height={60} title="Real x" detail="target 1" tone="sky" />
          <DiagramNode x={48} y={172} width={120} height={60} title="Fake G(z)" detail="target 0" tone="rose" />
          <rect x="210" y="174" width="108" height="56" rx="10" fill="#fff7ed" stroke="#d97706" strokeWidth="2" />
          <text x="264" y="197" textAnchor="middle" fontSize="13" fontWeight="800" fill="#78350f">DETACH</text>
          <text x="264" y="216" textAnchor="middle" fontSize="11" fill="#78350f">stop G gradient</text>
          <line x1="315" y1="169" x2="315" y2="235" stroke="#e11d48" strokeWidth="5" />
          <DiagramNode x={375} y={116} width={155} height={82} title="Discriminator D" detail="learn real vs fake" tone="violet" badge="MODEL" />
          <DiagramNode x={600} y={116} width={145} height={82} title="D loss" detail="real→1, fake→0" tone="rose" />
          <DiagramNode x={825} y={116} width={125} height={82} title="Update D" detail="G unchanged" tone="emerald" />
          <Connector d="M168 112 C280 112 280 145 375 145" markerId={forward} tone="slate" />
          <Connector d="M168 202 H210" markerId={forward} tone="slate" />
          <Connector d="M318 202 C345 202 345 169 375 169" markerId={forward} tone="slate" />
          <Connector d="M530 157 H600" markerId={forward} tone="slate" />
          <Connector d="M745 157 H825" markerId={forward} tone="slate" />
          <Connector d="M825 207 C760 246 452 246 452 198" markerId={gradient} tone="rose" dashed label="gradient updates D only" labelX={642} labelY={242} />

          <Boundary x={20} y={328} width={960} height={210} label="STEP 2 · TRAIN THE GENERATOR" tone="violet" />
          <DiagramNode x={48} y={392} width={108} height={66} title="Fresh z" detail="sampled" tone="amber" />
          <DiagramNode x={200} y={382} width={140} height={86} title="Generator G" detail="will update" tone="violet" badge="MODEL" />
          <DiagramNode x={385} y={392} width={120} height={66} title="Fresh fake" detail="not detached" tone="rose" />
          <DiagramNode x={550} y={382} width={150} height={86} title="Discriminator D" detail="fixed judge" tone="violet" badge="FIXED" />
          <DiagramNode x={745} y={392} width={100} height={66} title="G loss" detail="target 1" tone="rose" />
          <DiagramNode x={880} y={392} width={80} height={66} title="Update G" detail="D fixed" tone="emerald" />
          <Connector d="M156 425 H200" markerId={forward} tone="slate" />
          <Connector d="M340 425 H385" markerId={forward} tone="slate" />
          <Connector d="M505 425 H550" markerId={forward} tone="slate" />
          <Connector d="M700 425 H745" markerId={forward} tone="slate" />
          <Connector d="M845 425 H880" markerId={forward} tone="slate" />
          <Connector d="M880 472 C760 520 270 520 270 468" markerId={gradient} tone="rose" dashed label="gradient passes through fixed D and updates G" labelX={575} labelY={510} />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 930">
          <defs><ArrowMarker id={`${forward}-mobile`} color="#64748b" /><ArrowMarker id={`${gradient}-mobile`} color="#e11d48" /></defs>
          <Boundary x={10} y={30} width={280} height={400} label="STEP 1 · UPDATE D ONLY" tone="sky" />
          <DiagramNode x={25} y={68} width={105} height={56} title="Real x" detail="target 1" tone="sky" />
          <DiagramNode x={170} y={68} width={105} height={56} title="Fake G(z)" detail="target 0" tone="rose" />
          <rect x="171" y="152" width="103" height="50" rx="10" fill="#fff7ed" stroke="#d97706" strokeWidth="2" />
          <text x="222" y="174" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#78350f">DETACH</text><text x="222" y="191" textAnchor="middle" fontSize="10" fill="#78350f">cuts path to G</text>
          <line x1="166" y1="148" x2="166" y2="206" stroke="#e11d48" strokeWidth="5" />
          <DiagramNode x={65} y={235} width={170} height={64} title="Discriminator D" detail="learns both targets" tone="violet" badge="MODEL" />
          <path d="M77 124 V185 C77 210 110 210 110 235 M222 202 C222 220 190 220 190 235" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M103 227 l7 8 l7 -8 z M183 227 l7 8 l7 -8 z" fill="#64748b" />
          <DiagramNode x={75} y={340} width={150} height={58} title="Update D" detail="G unchanged" tone="emerald" />
          <Connector d="M150 299 V340" markerId={`${forward}-mobile`} tone="slate" />

          <Boundary x={10} y={495} width={280} height={405} label="STEP 2 · UPDATE G ONLY" tone="violet" />
          <DiagramNode x={86} y={528} width={128} height={54} title="Fresh z" detail="sampled" tone="amber" />
          <DiagramNode x={75} y={620} width={150} height={62} title="Generator G" detail="will update" tone="violet" badge="MODEL" />
          <DiagramNode x={25} y={725} width={108} height={58} title="Fresh fake" detail="not detached" tone="rose" />
          <DiagramNode x={167} y={715} width={108} height={78} title="D" detail="fixed judge" tone="violet" badge="FIXED" />
          <Connector d="M150 582 V620" markerId={`${forward}-mobile`} tone="slate" />
          <path d="M150 682 V704 H79 V725 M150 704 H221 V715" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M72 717 l7 8 l7 -8 z M214 707 l7 8 l7 -8 z" fill="#64748b" />
          <rect x="75" y="826" width="150" height="48" rx="11" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x="150" y="856" textAnchor="middle" fontSize="13" fontWeight="800" fill="#064e3b">target 1 → update G</text>
          <Connector d="M221 793 C221 814 190 814 190 826" markerId={`${forward}-mobile`} tone="slate" />
          <Connector d="M75 850 C35 850 35 650 75 650" markerId={`${gradient}-mobile`} tone="rose" dashed />
          <text x="150" y="891" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#be123c">dashed path: gradient reaches G</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "slate", label: "forward values" },
        { tone: "rose", label: "backward gradient", shape: "dashed" },
        { tone: "amber", label: "detach / sampled value" },
        { tone: "emerald", label: "parameters updated" },
      ]} />
    </GenAIFigure>
  );
}

export function DiffusionNoisingDenoisingDiagram() {
  const forward = "diffusion-forward-arrow";
  const reverse = "diffusion-reverse-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Forward diffusion adds noise; reverse diffusion removes predicted noise"
      caption="The upper path is a fixed training process. The lower path is the learned generation path: it begins at random xT and constructs a candidate x₀ rather than recovering a hidden original."
      description="Four visual tiles show a clean circle x zero becoming progressively noisier at x one, x t, and x T along right-pointing forward arrows. A second row begins with noise x T and follows left-pointing reverse arrows through less noisy stages to an x zero candidate. Forward arrows say add scheduled noise; reverse arrows say predict and remove noise."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 500">
          <defs><ArrowMarker id={forward} color="#0284c7" /><ArrowMarker id={reverse} color="#7c3aed" /></defs>
          <Boundary x={20} y={42} width={960} height={190} label="FORWARD PROCESS · FIXED NOISING SCHEDULE" tone="sky" />
          <NoiseTile x={75} y={82} stage={0} label="x₀" detail="clean data" />
          <NoiseTile x={310} y={82} stage={1} label="x₁" detail="little noise" />
          <NoiseTile x={545} y={82} stage={2} label="xₜ" detail="mixed" />
          <NoiseTile x={780} y={82} stage={3} label="xT" detail="near noise" />
          <Connector d="M157 123 H310" markerId={forward} tone="sky" label="add small noise β₁" labelX={234} labelY={111} />
          <Connector d="M392 123 H545" markerId={forward} tone="sky" label="add scheduled noise" labelX={468} labelY={111} />
          <Connector d="M627 123 H780" markerId={forward} tone="sky" label="repeat to T" labelX={703} labelY={111} />

          <Boundary x={20} y={292} width={960} height={190} label="REVERSE PROCESS · LEARNED GENERATION" tone="violet" />
          <NoiseTile x={75} y={332} stage={0} label="x₀ candidate" detail="generated" />
          <NoiseTile x={310} y={332} stage={1} label="x₁" detail="less noisy" />
          <NoiseTile x={545} y={332} stage={2} label="xₜ" detail="denoising" />
          <NoiseTile x={780} y={332} stage={3} label="xT" detail="sampled noise" />
          <Connector d="M780 373 H627" markerId={reverse} label="predict + remove" labelX={703} labelY={361} />
          <Connector d="M545 373 H392" markerId={reverse} label="predict + remove" labelX={468} labelY={361} />
          <Connector d="M310 373 H157" markerId={reverse} label="final reverse step" labelX={234} labelY={361} />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 560">
          <defs><ArrowMarker id={`${forward}-mobile`} color="#0284c7" /><ArrowMarker id={`${reverse}-mobile`} color="#7c3aed" /></defs>
          <Boundary x={7} y={35} width={286} height={210} label="FORWARD · ADD NOISE" tone="sky" />
          <NoiseTile x={18} y={78} stage={0} label="x₀" detail="clean" />
          <NoiseTile x={116} y={78} stage={2} label="xₜ" detail="mixed" />
          <NoiseTile x={214} y={78} stage={3} label="xT" detail="noise" />
          <Connector d="M100 119 H116" markerId={`${forward}-mobile`} tone="sky" />
          <Connector d="M198 119 H214" markerId={`${forward}-mobile`} tone="sky" />
          <text x="150" y="225" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0c4a6e">x₀ → x₁ → … → xₜ → … → xT</text>

          <Boundary x={7} y={310} width={286} height={220} label="REVERSE · REMOVE PREDICTED NOISE" tone="violet" />
          <NoiseTile x={18} y={355} stage={3} label="xT" detail="sampled" />
          <NoiseTile x={116} y={355} stage={2} label="xₜ" detail="denoise" />
          <NoiseTile x={214} y={355} stage={0} label="x₀" detail="candidate" />
          <Connector d="M100 396 H116" markerId={`${reverse}-mobile`} />
          <Connector d="M198 396 H214" markerId={`${reverse}-mobile`} />
          <text x="150" y="505" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">xT → … → xₜ → … → x₀ candidate</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "fixed forward noising" },
        { tone: "violet", label: "learned reverse generation" },
        { tone: "rose", label: "sampled noise dots" },
        { tone: "emerald", label: "generated candidate" },
      ]} />
    </GenAIFigure>
  );
}

export function DiffusionTrainingGenerationDiagram() {
  const forward = "diffusion-training-forward";
  const gradient = "diffusion-training-gradient";
  return (
    <GenAIFigure
      title="Figure 2 — Training creates a known noise target; generation repeatedly reuses the trained denoiser"
      caption="During training, ε is known because we sampled it. During generation, the parameters stay fixed and an optional condition may guide—not define—the repeated reverse steps."
      description="In the training lane, clean sample x zero, sampled timestep t, and sampled noise epsilon converge to calculate noisy x t. The denoiser predicts epsilon hat, the loss compares epsilon hat with the known epsilon, and a backward arrow updates model parameters. In the generation lane, sampled starting noise x T and an optional condition enter a repeated denoiser and scheduler loop with fixed parameters, producing a final x zero candidate."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 610">
          <defs><ArrowMarker id={forward} color="#64748b" /><ArrowMarker id={gradient} color="#e11d48" /></defs>
          <Boundary x={18} y={42} width={964} height={270} label="TRAINING · PARAMETERS CHANGE" tone="sky" />
          <DiagramNode x={42} y={82} width={130} height={62} title="Clean x₀" detail="observed data" tone="sky" />
          <DiagramNode x={42} y={168} width={130} height={62} title="Timestep t" detail="sampled" tone="amber" />
          <DiagramNode x={42} y={246} width={130} height={50} title="Noise ε" detail="sampled target" tone="amber" />
          <DiagramNode x={230} y={142} width={155} height={82} title="Calculate xₜ" detail="add scheduled noise" tone="emerald" />
          <DiagramNode x={445} y={142} width={165} height={82} title="Denoiser" detail="predicts ε̂" tone="violet" badge="MODEL" />
          <DiagramNode x={675} y={142} width={140} height={82} title="MSE loss" detail="compare ε̂ with ε" tone="rose" />
          <DiagramNode x={865} y={142} width={92} height={82} title="Update θ" detail="learn" tone="emerald" />
          <Connector d="M172 113 C205 113 205 166 230 166" markerId={forward} tone="slate" />
          <Connector d="M172 199 H230" markerId={forward} tone="slate" />
          <Connector d="M172 271 C205 271 205 201 230 201" markerId={forward} tone="slate" />
          <Connector d="M385 183 H445" markerId={forward} tone="slate" label="xₜ + t" labelX={415} labelY={170} />
          <Connector d="M610 183 H675" markerId={forward} tone="slate" label="ε̂" labelX={642} labelY={170} />
          <Connector d="M815 183 H865" markerId={forward} tone="slate" />
          <Connector d="M865 236 C790 294 527 294 527 224" markerId={gradient} tone="rose" dashed label="backpropagation updates denoiser parameters" labelX={696} labelY={286} />

          <Boundary x={18} y={372} width={964} height={210} label="GENERATION · PARAMETERS FIXED" tone="violet" />
          <DiagramNode x={42} y={432} width={135} height={72} title="Random xT" detail="sampled noise" tone="amber" />
          <DiagramNode x={220} y={397} width={140} height={54} title="Optional condition" detail="text, class, image…" tone="sky" dashed />
          <DiagramNode x={425} y={422} width={210} height={92} title="Denoiser + scheduler" detail="repeat T → … → 0" tone="violet" badge="FIXED" />
          <DiagramNode x={805} y={432} width={150} height={72} title="Final x₀" detail="generated candidate" tone="emerald" />
          <Connector d="M177 468 H425" markerId={forward} tone="slate" label="start reverse loop" labelX={301} labelY={454} />
          <Connector d="M360 424 C392 424 392 448 425 448" markerId={forward} tone="slate" dashed label="optional guidance" labelX={392} labelY={410} />
          <Connector d="M635 468 H805" markerId={forward} tone="slate" label="less noise each step" labelX={720} labelY={454} />
          <path d="M590 514 C655 565 405 565 470 514" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 6" markerEnd={`url(#${forward})`} />
          <text x="530" y="558" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#4c1d95">predict noise → scheduler steps → repeat</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1060">
          <defs><ArrowMarker id={`${forward}-mobile`} color="#64748b" /><ArrowMarker id={`${gradient}-mobile`} color="#e11d48" /></defs>
          <Boundary x={8} y={30} width={284} height={540} label="TRAINING · PARAMETERS CHANGE" tone="sky" />
          <DiagramNode x={18} y={68} width={105} height={56} title="Clean x₀" detail="observed" tone="sky" />
          <DiagramNode x={177} y={68} width={105} height={56} title="Timestep t" detail="sampled" tone="amber" />
          <DiagramNode x={98} y={160} width={105} height={56} title="Noise ε" detail="sampled target" tone="amber" />
          <DiagramNode x={65} y={260} width={170} height={64} title="Calculate noisy xₜ" detail="x₀ + scheduled ε" tone="emerald" />
          <path d="M70 124 V226 C70 242 105 242 105 260 M230 124 V226 C230 242 195 242 195 260 M150 216 V260" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M98 252 l7 8 l7 -8 z M188 252 l7 8 l7 -8 z M143 252 l7 8 l7 -8 z" fill="#64748b" />
          <DiagramNode x={65} y={365} width={170} height={68} title="Denoiser" detail="predicts ε̂ from xₜ,t" tone="violet" badge="MODEL" />
          <Connector d="M150 324 V365" markerId={`${forward}-mobile`} tone="slate" />
          <DiagramNode x={65} y={474} width={170} height={64} title="Compare ε̂ with ε" detail="MSE loss → update θ" tone="rose" />
          <Connector d="M150 433 V474" markerId={`${forward}-mobile`} tone="slate" />
          <Connector d="M65 506 C25 506 25 399 65 399" markerId={`${gradient}-mobile`} tone="rose" dashed />

          <Boundary x={8} y={635} width={284} height={400} label="GENERATION · PARAMETERS FIXED" tone="violet" />
          <DiagramNode x={75} y={672} width={150} height={58} title="Random xT" detail="sampled noise" tone="amber" />
          <DiagramNode x={75} y={775} width={150} height={74} title="Denoiser + scheduler" detail="repeat T → … → 0" tone="violet" badge="FIXED" />
          <DiagramNode x={20} y={876} width={120} height={60} title="Optional condition" detail="guidance" tone="sky" dashed />
          <DiagramNode x={170} y={876} width={110} height={60} title="Final x₀" detail="candidate" tone="emerald" />
          <Connector d="M150 730 V775" markerId={`${forward}-mobile`} tone="slate" />
          <Connector d="M80 876 C80 858 105 858 105 849" markerId={`${forward}-mobile`} tone="slate" dashed />
          <Connector d="M150 849 C150 866 225 858 225 876" markerId={`${forward}-mobile`} tone="slate" />
          <path d="M205 849 C280 970 48 970 95 849" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 6" markerEnd={`url(#${forward}-mobile)`} />
          <text x="150" y="992" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">predict → reverse step → repeat</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "observed / optional condition" },
        { tone: "amber", label: "sampled value" },
        { tone: "emerald", label: "calculated/generated value" },
        { tone: "rose", label: "loss and gradient", shape: "dashed" },
        { tone: "violet", label: "learned denoiser" },
      ]} />
    </GenAIFigure>
  );
}
