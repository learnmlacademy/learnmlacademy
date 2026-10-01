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

function TextGlyph({ x, y, width = 100, label = "TEXT" }: { x: number; y: number; width?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="58" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <line x1={x + 15} y1={y + 20} x2={x + width - 15} y2={y + 20} stroke="#d97706" strokeWidth="3" />
      <line x1={x + 15} y1={y + 31} x2={x + width - 28} y2={y + 31} stroke="#d97706" strokeWidth="3" />
      <text x={x + width / 2} y={y + 50} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#78350f">{label}</text>
    </g>
  );
}

function ImageGlyph({ x, y, width = 100, label = "IMAGE", changed = false }: { x: number; y: number; width?: number; label?: string; changed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="68" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <circle cx={x + width * 0.75} cy={y + 17} r="7" fill="#fbbf24" />
      <path d={`M${x + 10} ${y + 51} L${x + width * 0.38} ${y + 28} L${x + width * 0.58} ${y + 43} L${x + width * 0.78} ${y + (changed ? 22 : 34)} L${x + width - 9} ${y + 51} Z`} fill={changed ? "#a78bfa" : "#34d399"} />
      <text x={x + width / 2} y={y + 64} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">{label}</text>
    </g>
  );
}

function AudioGlyph({ x, y, width = 100, label = "AUDIO" }: { x: number; y: number; width?: number; label?: string }) {
  const points = Array.from({ length: 17 }, (_, index) => {
    const px = x + 8 + index * ((width - 16) / 16);
    const py = y + 28 + Math.sin(index * 1.35) * (index % 3 === 0 ? 17 : 10);
    return `${px},${py}`;
  }).join(" ");
  return (
    <g>
      <rect x={x} y={y} width={width} height="62" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
      <polyline points={points} fill="none" stroke="#e11d48" strokeWidth="2.5" />
      <text x={x + width / 2} y={y + 56} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">{label}</text>
    </g>
  );
}

function RepresentationGlyph({ x, y, width = 108, label }: { x: number; y: number; width?: number; label: string }) {
  const values = [0.35, 0.75, 0.5, 0.9, 0.62];
  return (
    <g>
      <rect x={x} y={y} width={width} height="58" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      {values.map((value, index) => (
        <rect key={index} x={x + 12 + index * ((width - 28) / 5)} y={y + 10 + (1 - value) * 22} width="8" height={12 + value * 18} rx="3" fill="#8b5cf6" />
      ))}
      <text x={x + width / 2} y={y + 52} textAnchor="middle" fontSize="9.8" fontWeight="800" fill="#4c1d95">{label}</text>
    </g>
  );
}

function TextOutput({ x, y, width = 90, label = "TEXT OUTPUT" }: { x: number; y: number; width?: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height="64" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
      {[0, 1, 2].map((row) => <line key={row} x1={x + 12} y1={y + 15 + row * 10} x2={x + width - 12 - row * 7} y2={y + 15 + row * 10} stroke="#059669" strokeWidth="3" />)}
      <text x={x + width / 2} y={y + 57} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#064e3b">{label}</text>
    </g>
  );
}

function WaveformPlot({ x, y, width, height, label }: { x: number; y: number; width: number; height: number; label: string }) {
  const points = Array.from({ length: 29 }, (_, index) => {
    const px = x + 8 + index * ((width - 16) / 28);
    const envelope = 0.35 + 0.65 * Math.sin((index / 28) * Math.PI);
    const py = y + height / 2 + Math.sin(index * 1.7) * (height * 0.34 * envelope);
    return `${px},${py}`;
  }).join(" ");
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <line x1={x + 8} y1={y + height / 2} x2={x + width - 8} y2={y + height / 2} stroke="#94a3b8" strokeWidth="1" />
      <polyline points={points} fill="none" stroke="#0284c7" strokeWidth="2.5" />
      <text x={x + width / 2} y={y + height + 18} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0c4a6e">{label}</text>
    </g>
  );
}

function Spectrogram({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const colors = ["#fef3c7", "#fdba74", "#fb7185", "#8b5cf6", "#38bdf8"];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="10" fill="#0f172a" stroke="#7c3aed" strokeWidth="2" />
      {Array.from({ length: 35 }, (_, index) => {
        const col = index % 7;
        const row = Math.floor(index / 7);
        const intensity = (col * 2 + row * 3 + (col === row ? 2 : 0)) % colors.length;
        return <rect key={index} x={x + 8 + col * ((width - 16) / 7)} y={y + 8 + row * ((height - 16) / 5)} width={(width - 20) / 7} height={(height - 20) / 5} rx="2" fill={colors[intensity]} opacity={0.65 + intensity * 0.08} />;
      })}
      <text x={x + width / 2} y={y + height + 18} textAnchor="middle" fontSize="11" fontWeight="800" fill="#4c1d95">SPECTROGRAM</text>
      <text x={x + width / 2} y={y + height + 34} textAnchor="middle" fontSize="9.5" fill="#475569">time × frequency energy</text>
    </g>
  );
}

function TokenStrip({ x, y, count = 6, label = "AUDIO TOKENS" }: { x: number; y: number; count?: number; label?: string }) {
  return (
    <g>
      {Array.from({ length: count }, (_, index) => (
        <rect key={index} x={x + index * 22} y={y + (index % 2) * 8} width="18" height="32" rx="5" fill={index % 2 ? "#c4b5fd" : "#d1fae5"} stroke={index % 2 ? "#7c3aed" : "#059669"} />
      ))}
      <text x={x + (count * 22 - 4) / 2} y={y + 58} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#4c1d95">{label}</text>
    </g>
  );
}

export function MultimodalRepresentationDiagram() {
  const arrow = "batch4-multimodal-representation-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Each modality needs its own representation before cross-modal generation"
      caption="This is a common conceptual pattern, not a universal architecture. Systems may align, fuse, project, or cross-attend between modality representations in different places."
      description="Three input streams are shown. Raw text passes through a text encoder to a text representation. Raw pixels pass through a vision encoder to a visual representation. Raw sound passes through an audio encoder to an audio representation. The three numerical representations enter an alignment, fusion, or cross-attention stage, then an output-specific generator or decoder branches to generated text, image, or audio. The diagram explains that raw modalities require different front ends even when their representations later interact."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 570">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-violet`} color="#7c3aed" /></defs>
          <Boundary x={18} y={38} width={455} height={468} label="MODALITY-SPECIFIC REPRESENTATION PATHS" tone="sky" />
          <TextGlyph x={38} y={92} label="RAW TEXT" />
          <ImageGlyph x={38} y={235} label="RAW PIXELS" />
          <AudioGlyph x={38} y={390} label="RAW SOUND" />
          <DiagramNode x={170} y={84} width={135} height={74} title="Text encoder" detail="token context" tone="sky" />
          <DiagramNode x={170} y={232} width={135} height={74} title="Vision encoder" detail="patch features" tone="sky" />
          <DiagramNode x={170} y={382} width={135} height={74} title="Audio encoder" detail="signal features" tone="sky" />
          <RepresentationGlyph x={342} y={92} label="TEXT VECTOR" />
          <RepresentationGlyph x={342} y={240} label="VISUAL GRID" />
          <RepresentationGlyph x={342} y={390} label="AUDIO VECTOR" />
          <Connector d="M138 121 H160" markerId={arrow} tone="slate" />
          <Connector d="M138 269 H160" markerId={arrow} tone="slate" />
          <Connector d="M138 421 H160" markerId={arrow} tone="slate" />
          <Connector d="M305 121 H332" markerId={arrow} tone="slate" />
          <Connector d="M305 269 H332" markerId={arrow} tone="slate" />
          <Connector d="M305 419 H332" markerId={arrow} tone="slate" />

          <Boundary x={500} y={105} width={218} height={334} label="CROSS-MODAL INTERACTION" tone="violet" />
          <DiagramNode x={522} y={208} width={174} height={112} title="Alignment / fusion" detail="or cross-attention" tone="violet" />
          <Connector d="M450 121 C495 121 492 235 512 246" markerId={`${arrow}-violet`} />
          <Connector d="M450 269 H512" markerId={`${arrow}-violet`} />
          <Connector d="M450 419 C495 419 492 298 512 286" markerId={`${arrow}-violet`} />

          <DiagramNode x={748} y={208} width={128} height={112} title="Output model" detail="generator / decoder" tone="slate" />
          <Connector d="M696 264 H738" markerId={arrow} tone="slate" />
          <TextOutput x={900} y={90} width={80} label="TEXT" />
          <ImageGlyph x={900} y={235} width={80} label="IMAGE" changed />
          <AudioGlyph x={900} y={390} width={80} label="AUDIO" />
          <Connector d="M876 245 C892 225 884 123 890 123" markerId={arrow} tone="slate" />
          <Connector d="M876 264 H890" markerId={arrow} tone="slate" />
          <Connector d="M876 283 C892 305 884 420 890 420" markerId={arrow} tone="slate" />
          <text x="930" y="482" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">OUTPUT-SPECIFIC FORM</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 900">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-mobile-violet`} color="#7c3aed" /></defs>
          <Boundary x={8} y={28} width={284} height={135} label="TEXT PATH" tone="amber" />
          <TextGlyph x={20} y={69} width={62} label="TEXT" />
          <DiagramNode x={100} y={65} width={105} height={62} title="Text" detail="encoder" tone="sky" />
          <RepresentationGlyph x={224} y={67} width={58} label="VECTOR" />
          <Connector d="M82 98 H90" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M205 96 H214" markerId={`${arrow}-mobile`} tone="slate" />

          <Boundary x={8} y={195} width={284} height={145} label="IMAGE PATH" tone="sky" />
          <ImageGlyph x={20} y={235} width={62} label="PIXELS" />
          <DiagramNode x={100} y={236} width={105} height={62} title="Vision" detail="encoder" tone="sky" />
          <RepresentationGlyph x={224} y={238} width={58} label="GRID" />
          <Connector d="M82 269 H90" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M205 267 H214" markerId={`${arrow}-mobile`} tone="slate" />

          <Boundary x={8} y={372} width={284} height={140} label="AUDIO PATH" tone="rose" />
          <AudioGlyph x={20} y={413} width={62} label="SOUND" />
          <DiagramNode x={100} y={409} width={105} height={62} title="Audio" detail="encoder" tone="sky" />
          <RepresentationGlyph x={224} y={411} width={58} label="VECTOR" />
          <Connector d="M82 442 H90" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M205 440 H214" markerId={`${arrow}-mobile`} tone="slate" />

          <DiagramNode x={55} y={565} width={190} height={74} title="Cross-modal interaction" detail="align / fuse / attend" tone="violet" />
          <path d="M253 125 V535 H150 M253 305 V535 M253 478 V535" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
          <Connector d="M150 535 V555" markerId={`${arrow}-mobile-violet`} />
          <DiagramNode x={65} y={690} width={170} height={70} title="Output model" detail="generator / decoder" tone="slate" />
          <Connector d="M150 639 V680" markerId={`${arrow}-mobile`} tone="slate" />
          <TextOutput x={18} y={808} width={74} label="TEXT" />
          <ImageGlyph x={113} y={806} width={74} label="IMAGE" changed />
          <AudioGlyph x={208} y={808} width={74} label="AUDIO" />
          <path d="M150 760 V784 H55" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <Connector d="M55 784 V798" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M150 760 V796" markerId={`${arrow}-mobile`} tone="slate" />
          <path d="M150 784 H245" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <Connector d="M245 784 V798" markerId={`${arrow}-mobile`} tone="slate" />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "amber", label: "raw text" },
        { tone: "sky", label: "modality-specific encoder" },
        { tone: "violet", label: "representation / interaction" },
        { tone: "slate", label: "output-specific model" },
        { tone: "emerald", label: "generated output" },
      ]} />
    </GenAIFigure>
  );
}

export function MultimodalTaskPathsDiagram() {
  const arrow = "batch4-multimodal-task-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — ‘Multimodal’ names the modalities; ‘generative’ names the created output"
      caption="The four pathways use different inputs and outputs. A fixed-label decision can be multimodal without open-ended generation; a caption, answer, image, or edit is newly generated."
      description="Four spatially distinct examples compare understanding and generation. First, an image and question enter a multimodal model that generates a written answer. Second, an image enters a captioning model that generates a text caption. Third, a text prompt enters an image generator and produces a new image. Fourth, an image and instruction enter an editing model that produces a changed image while preserving the source composition."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 650">
          <defs><ArrowMarker id={arrow} /></defs>
          <Boundary x={18} y={35} width={465} height={270} label="IMAGE + QUESTION → GENERATED ANSWER" tone="sky" />
          <ImageGlyph x={42} y={102} width={90} label="IMAGE" />
          <TextGlyph x={42} y={192} width={90} label="QUESTION" />
          <DiagramNode x={205} y={132} width={145} height={88} title="Multimodal model" detail="connects evidence" tone="violet" />
          <TextOutput x={385} y={145} width={78} label="ANSWER" />
          <Connector d="M132 136 C170 136 168 160 195 168" markerId={arrow} tone="slate" />
          <Connector d="M132 221 C170 221 168 200 195 190" markerId={arrow} tone="slate" />
          <Connector d="M350 176 H375" markerId={arrow} tone="slate" />
          <text x="250" y="270" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">UNDERSTANDING SUPPORTS TEXT GENERATION</text>

          <Boundary x={517} y={35} width={465} height={270} label="IMAGE → GENERATED CAPTION" tone="emerald" />
          <ImageGlyph x={555} y={132} width={100} label="IMAGE" />
          <DiagramNode x={700} y={122} width={135} height={88} title="Caption model" detail="reads visual features" tone="violet" />
          <TextOutput x={875} y={134} width={80} label="CAPTION" />
          <Connector d="M655 166 H690" markerId={arrow} tone="slate" />
          <Connector d="M835 166 H865" markerId={arrow} tone="slate" />
          <text x="750" y="270" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#064e3b">VISUAL INTERPRETATION → NEW WORD SEQUENCE</text>

          <Boundary x={18} y={350} width={465} height={270} label="TEXT → GENERATED IMAGE" tone="amber" />
          <TextGlyph x={52} y={433} width={105} label="PROMPT" />
          <DiagramNode x={205} y={416} width={145} height={88} title="Image generator" detail="creates visual state" tone="violet" />
          <ImageGlyph x={388} y={426} width={82} label="NEW IMAGE" changed />
          <Connector d="M157 462 H195" markerId={arrow} tone="slate" />
          <Connector d="M350 460 H378" markerId={arrow} tone="slate" />
          <text x="250" y="578" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#78350f">CROSS-MODAL GENERATION</text>

          <Boundary x={517} y={350} width={465} height={270} label="IMAGE + INSTRUCTION → EDITED IMAGE" tone="violet" />
          <ImageGlyph x={540} y={402} width={82} label="SOURCE" />
          <TextGlyph x={540} y={490} width={82} label="EDIT" />
          <DiagramNode x={690} y={429} width={135} height={88} title="Editing model" detail="uses both inputs" tone="violet" />
          <ImageGlyph x={875} y={438} width={82} label="EDITED" changed />
          <Connector d="M622 436 C652 436 655 453 680 457" markerId={arrow} tone="slate" />
          <Connector d="M622 519 C652 519 655 493 680 485" markerId={arrow} tone="slate" />
          <Connector d="M825 473 H865" markerId={arrow} tone="slate" />
          <text x="750" y="578" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#4c1d95">MULTIMODAL INPUT GUIDES A GENERATED EDIT</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1210">
          <defs><ArrowMarker id={`${arrow}-mobile`} /></defs>
          <Boundary x={8} y={28} width={284} height={260} label="IMAGE + QUESTION → ANSWER" tone="sky" />
          <ImageGlyph x={20} y={77} width={72} label="IMAGE" />
          <TextGlyph x={20} y={166} width={72} label="QUESTION" />
          <DiagramNode x={116} y={105} width={92} height={78} title="Multimodal" detail="model" tone="violet" />
          <TextOutput x={232} y={112} width={52} label="ANSWER" />
          <Connector d="M92 111 C105 111 104 128 106 133" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M92 195 C105 195 104 165 106 157" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M208 144 H222" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="150" y="263" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0c4a6e">GENERATED TEXT ANSWER</text>

          <Boundary x={8} y={330} width={284} height={235} label="IMAGE → CAPTION" tone="emerald" />
          <ImageGlyph x={20} y={396} width={72} label="IMAGE" />
          <DiagramNode x={116} y={390} width={92} height={78} title="Caption" detail="model" tone="violet" />
          <TextOutput x={232} y={398} width={52} label="CAPTION" />
          <Connector d="M92 430 H106" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M208 430 H222" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="150" y="530" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">NEW DESCRIPTION TOKENS</text>

          <Boundary x={8} y={607} width={284} height={235} label="TEXT → IMAGE" tone="amber" />
          <TextGlyph x={20} y={674} width={72} label="PROMPT" />
          <DiagramNode x={116} y={668} width={92} height={78} title="Image" detail="model" tone="violet" />
          <ImageGlyph x={232} y={674} width={52} label="NEW" changed />
          <Connector d="M92 703 H106" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M208 703 H222" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="150" y="808" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#78350f">CROSS-MODAL GENERATION</text>

          <Boundary x={8} y={884} width={284} height={305} label="IMAGE + EDIT REQUEST" tone="violet" />
          <ImageGlyph x={20} y={938} width={72} label="SOURCE" />
          <TextGlyph x={20} y={1026} width={72} label="EDIT" />
          <DiagramNode x={116} y={968} width={92} height={78} title="Editing" detail="model" tone="violet" />
          <ImageGlyph x={232} y={975} width={52} label="EDITED" changed />
          <Connector d="M92 972 C105 972 104 988 106 995" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M92 1055 C105 1055 104 1023 106 1013" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M208 1009 H222" markerId={`${arrow}-mobile`} tone="slate" />
          <text x="150" y="1158" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#4c1d95">SOURCE + INSTRUCTION GUIDE THE EDIT</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "input evidence" },
        { tone: "amber", label: "text condition" },
        { tone: "violet", label: "multimodal/generative model" },
        { tone: "emerald", label: "newly generated output" },
      ]} />
    </GenAIFigure>
  );
}

export function AudioRepresentationPipelineDiagram() {
  const arrow = "batch4-audio-pipeline-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — Audio can reach a generator through several model-facing representations"
      caption="The full chain is a teaching map, not a rule that every model uses every stage. Some systems model waveforms directly; others use spectrograms, learned continuous features, discrete audio tokens, or combinations."
      description="Sound pressure is sampled into a waveform whose horizontal axis is time and vertical axis is amplitude. A possible transformation reorganizes it into a spectrogram with time and frequency axes. A learned compressor or tokenizer can produce a shorter sequence of model-facing audio units. A generative model predicts or reconstructs a representation, and an audio decoder produces a waveform. A count strip shows that sixteen thousand samples per second times two seconds equals thirty-two thousand waveform values."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 570">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-violet`} color="#7c3aed" /></defs>
          <Boundary x={18} y={40} width={690} height={365} label="REPRESENTATION CHOICES · ARCHITECTURES VARY" tone="sky" />
          <AudioGlyph x={38} y={174} width={92} label="SOUND" />
          <WaveformPlot x={170} y={130} width={150} height={105} label="WAVEFORM · AMPLITUDE × TIME" />
          <Spectrogram x={365} y={120} width={150} height={125} />
          <TokenStrip x={555} y={152} count={6} label="LEARNED UNITS / TOKENS" />
          <Connector d="M130 205 H160" markerId={arrow} tone="slate" label="sample" labelX={145} labelY={104} />
          <Connector d="M320 182 H355" markerId={arrow} tone="slate" label="possible transform" labelX={338} labelY={104} />
          <Connector d="M515 182 H545" markerId={`${arrow}-violet`} label="possible encoder" labelX={530} labelY={104} />
          <text x="364" y="300" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">A SYSTEM MAY MODEL THE WAVEFORM, SPECTROGRAM, OR LEARNED UNITS</text>
          <text x="364" y="325" textAnchor="middle" fontSize="10.5" fill="#475569">representation choice changes sequence length and what patterns are exposed</text>

          <DiagramNode x={745} y={128} width={125} height={105} title="Generative model" detail="predicts representation" tone="violet" />
          <DiagramNode x={895} y={128} width={88} height={105} title="Audio output" detail="waveform" tone="emerald" />
          <Connector d="M687 182 H735" markerId={`${arrow}-violet`} />
          <Connector d="M870 182 H885" markerId={arrow} tone="slate" />
          <AudioGlyph x={895} y={275} width={88} label="PLAYABLE" />
          <Connector d="M939 233 V265" markerId={arrow} tone="slate" />

          <Boundary x={120} y={438} width={760} height={92} label="WHY RAW SEQUENCES BECOME LARGE" tone="amber" />
          <DiagramNode x={155} y={462} width={180} height={48} title="16,000 samples / second" tone="amber" />
          <text x="370" y="494" textAnchor="middle" fontSize="22" fontWeight="800" fill="#78350f">×</text>
          <DiagramNode x={400} y={462} width={130} height={48} title="2 seconds" tone="amber" />
          <text x="565" y="494" textAnchor="middle" fontSize="22" fontWeight="800" fill="#78350f">=</text>
          <DiagramNode x={600} y={462} width={235} height={48} title="32,000 waveform values" tone="emerald" />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1120">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-mobile-violet`} color="#7c3aed" /></defs>
          <Boundary x={8} y={28} width={284} height={790} label="AUDIO OPTIONS · SYSTEMS VARY" tone="sky" />
          <AudioGlyph x={100} y={70} width={100} label="AIR / SOUND" />
          <Connector d="M150 132 V165" markerId={`${arrow}-mobile`} tone="slate" label="sample" labelX={175} labelY={153} />
          <WaveformPlot x={55} y={178} width={190} height={105} label="WAVEFORM · AMPLITUDE × TIME" />
          <Connector d="M150 320 V350" markerId={`${arrow}-mobile`} tone="slate" label="possible transform" labelX={205} labelY={342} />
          <Spectrogram x={65} y={362} width={170} height={130} />
          <Connector d="M150 535 V565" markerId={`${arrow}-mobile-violet`} label="possible encoder" labelX={220} labelY={556} />
          <TokenStrip x={79} y={580} count={7} label="LEARNED UNITS / TOKENS" />
          <text x="150" y="685" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0c4a6e">A MODEL MAY ENTER AT DIFFERENT STAGES</text>
          <DiagramNode x={65} y={720} width={170} height={66} title="Generative model" detail="predicts a representation" tone="violet" />
          <path d="M150 646 V666 M150 700 V710" fill="none" stroke="#7c3aed" strokeWidth="2.5" markerEnd={`url(#${arrow}-mobile-violet)`} />

          <DiagramNode x={65} y={855} width={170} height={66} title="Audio decoder" detail="produces waveform" tone="emerald" />
          <Connector d="M150 786 V845" markerId={`${arrow}-mobile`} tone="slate" />
          <AudioGlyph x={100} y={957} width={100} label="AUDIO OUTPUT" />
          <Connector d="M150 921 V947" markerId={`${arrow}-mobile`} tone="slate" />

          <rect x="24" y="1045" width="252" height="55" rx="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="150" y="1069" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#78350f">16,000/s × 2 s = 32,000 values</text>
          <text x="150" y="1088" textAnchor="middle" fontSize="9.8" fill="#475569">raw temporal sequences grow quickly</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "sampled signal / representation" },
        { tone: "violet", label: "learned representation or model" },
        { tone: "amber", label: "chosen sample rate and duration" },
        { tone: "emerald", label: "generated/reconstructed audio" },
      ]} />
    </GenAIFigure>
  );
}

export function SyntheticDataPipelineDiagram() {
  const arrow = "batch4-synthetic-pipeline-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Synthetic data enters training only after separate evidence checks"
      caption="Fidelity, coverage, privacy and label correctness answer different questions. TSTR keeps the final utility test real: train on synthetic or mixed data, then test on untouched real examples."
      description="Authorized real evidence and domain knowledge feed four alternative synthesis methods: rules, simulation, statistical synthesis, and a generative model. These methods produce a synthetic dataset. Four separate branches check fidelity, diversity and coverage, privacy and memorization, and label correctness. After relevant checks pass, a downstream model trains on synthetic or mixed data. It is then evaluated on an untouched real test set that was held aside before synthesis and training."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 700">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-rose`} color="#e11d48" /><ArrowMarker id={`${arrow}-green`} color="#059669" /></defs>
          <DiagramNode x={24} y={82} width={150} height={72} title="Authorized real data" detail="training evidence" tone="sky" />
          <DiagramNode x={24} y={198} width={150} height={72} title="Domain knowledge" detail="rules / constraints" tone="amber" />
          <Boundary x={215} y={42} width={280} height={270} label="ALTERNATIVE SYNTHESIS METHODS" tone="violet" />
          <DiagramNode x={238} y={82} width={105} height={64} title="Rules" detail="explicit logic" tone="slate" />
          <DiagramNode x={365} y={82} width={105} height={64} title="Simulation" detail="process model" tone="slate" />
          <DiagramNode x={238} y={195} width={105} height={64} title="Statistical" detail="tabular synthesis" tone="slate" />
          <DiagramNode x={365} y={195} width={105} height={64} title="Generative" detail="learned model" tone="violet" />
          <Connector d="M174 118 H205" markerId={arrow} tone="slate" />
          <Connector d="M174 234 H205" markerId={arrow} tone="slate" />
          <path d="M343 114 H355 M343 227 H355" fill="none" stroke="#64748b" strokeWidth="2" />
          <DiagramNode x={535} y={126} width={135} height={92} title="Synthetic dataset" detail="versioned + traceable" tone="amber" />
          <path d="M470 114 C510 114 505 153 525 164 M470 227 C510 227 505 193 525 182" fill="none" stroke="#64748b" strokeWidth="2.5" markerEnd={`url(#${arrow})`} />

          <Boundary x={710} y={42} width={272} height={270} label="CHECKS STAY SEPARATE" tone="emerald" />
          <DiagramNode x={730} y={82} width={105} height={64} title="Fidelity" detail="realism / relations" tone="sky" />
          <DiagramNode x={855} y={82} width={105} height={64} title="Coverage" detail="modes / rare cases" tone="violet" />
          <DiagramNode x={730} y={195} width={105} height={64} title="Privacy" detail="copies / membership" tone="rose" />
          <DiagramNode x={855} y={195} width={105} height={64} title="Labels" detail="semantic validity" tone="amber" />
          <Connector d="M670 172 H700" markerId={`${arrow}-green`} tone="emerald" />
          <text x="846" y="291" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">HIGH FIDELITY DOES NOT PROVE PRIVACY</text>

          <DiagramNode x={330} y={400} width={210} height={82} title="Train downstream model" detail="synthetic or mixed data" tone="violet" />
          <Connector d="M846 312 C846 350 435 350 435 390" markerId={`${arrow}-green`} tone="emerald" label="pass relevant checks" labelX={640} labelY={340} />
          <DiagramNode x={690} y={400} width={225} height={82} title="Untouched real test data" detail="not used above" tone="emerald" />
          <Connector d="M540 441 H680" markerId={`${arrow}-green`} tone="emerald" label="TSTR · TEST ON REAL" labelX={610} labelY={426} />
          <path d="M98 154 V174 H10 V605 H802 V492" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="8 6" markerEnd={`url(#${arrow})`} />
          <text x="420" y="626" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0c4a6e">REAL TEST SPLIT IS HELD ASIDE BEFORE SYNTHESIS AND TRAINING</text>
          <text x="610" y="535" textAnchor="middle" fontSize="12" fontWeight="800" fill="#064e3b">TRAIN ON SYNTHETIC / MIXED → TEST ON REAL</text>
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1390">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-mobile-green`} color="#059669" /></defs>
          <DiagramNode x={18} y={30} width={125} height={66} title="Real evidence" detail="authorized" tone="sky" />
          <DiagramNode x={157} y={30} width={125} height={66} title="Domain" detail="knowledge + rules" tone="amber" />
          <path d="M80 96 V125 H150 M220 96 V125 H150" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <Connector d="M150 125 V145" markerId={`${arrow}-mobile`} tone="slate" />
          <Boundary x={8} y={158} width={284} height={330} label="CHOOSE A SYNTHESIS METHOD" tone="violet" />
          <DiagramNode x={28} y={205} width={110} height={60} title="Rules" detail="explicit logic" tone="slate" />
          <DiagramNode x={162} y={205} width={110} height={60} title="Simulation" detail="process model" tone="slate" />
          <DiagramNode x={28} y={315} width={110} height={60} title="Statistical" detail="tabular" tone="slate" />
          <DiagramNode x={162} y={315} width={110} height={60} title="Generative" detail="learned model" tone="violet" />
          <path d="M83 265 V285 H150 V405 M217 265 V285 H150 M83 375 V405 H150 M217 375 V405 H150" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <DiagramNode x={60} y={525} width={180} height={70} title="Synthetic dataset" detail="versioned + traceable" tone="amber" />
          <Connector d="M150 488 V515" markerId={`${arrow}-mobile`} tone="slate" />

          <Boundary x={8} y={650} width={284} height={350} label="CHECKS STAY SEPARATE" tone="emerald" />
          <DiagramNode x={24} y={700} width={116} height={62} title="Fidelity" detail="realism / relations" tone="sky" />
          <DiagramNode x={160} y={700} width={116} height={62} title="Coverage" detail="modes / rare cases" tone="violet" />
          <DiagramNode x={24} y={810} width={116} height={62} title="Privacy" detail="copies / members" tone="rose" />
          <DiagramNode x={160} y={810} width={116} height={62} title="Labels" detail="semantic validity" tone="amber" />
          <Connector d="M150 595 V640" markerId={`${arrow}-mobile-green`} tone="emerald" />
          <text x="150" y="926" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">FIDELITY ≠ PRIVACY</text>
          <text x="150" y="955" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">PASS RELEVANT CHECKS</text>

          <DiagramNode x={45} y={1045} width={210} height={72} title="Train downstream model" detail="synthetic or mixed data" tone="violet" />
          <Connector d="M150 1000 V1035" markerId={`${arrow}-mobile-green`} tone="emerald" />
          <text x="140" y="1158" textAnchor="end" fontSize="12" fontWeight="800" fill="#064e3b">TSTR · TEST ON REAL</text>
          <DiagramNode x={45} y={1190} width={210} height={78} title="Untouched real test" detail="held aside before synthesis" tone="emerald" />
          <path d="M150 1117 V1180" fill="none" stroke="#059669" strokeWidth="2.5" markerEnd={`url(#${arrow}-mobile-green)`} />
          <rect x="35" y="1310" width="230" height="55" rx="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />
          <text x="150" y="1333" textAnchor="middle" fontSize="10.8" fontWeight="800" fill="#0c4a6e">REAL TEST DATA IS NOT USED ABOVE</text>
          <text x="150" y="1352" textAnchor="middle" fontSize="9.8" fill="#475569">it supplies final real-world evidence</text>
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "authorized real evidence" },
        { tone: "violet", label: "synthesis / learned process" },
        { tone: "rose", label: "privacy checked separately" },
        { tone: "emerald", label: "validated downstream evidence" },
      ]} />
    </GenAIFigure>
  );
}

export function SyntheticDistributionDiagram() {
  const arrow = "batch4-synthetic-distribution-arrow";
  const hatch = "batch4-class-b-hatch";
  return (
    <GenAIFigure
      title="Figure 2 — Rebalancing can improve coverage while reducing distribution fidelity"
      caption="Both bars contain 100 examples. Synthetic B doubles from 20 to 40, which may be intentional for coverage, but the 60/40 synthetic distribution no longer reproduces the real 80/20 population frequency."
      description="Two proportional bars compare one hundred real examples, with class A equal to eighty and class B equal to twenty, against one hundred synthetic examples, with A equal to sixty and B equal to forty. The B segment is visibly twice as wide in the synthetic bar. One interpretation branch says that reproducing population frequency has lower fidelity. A second branch says that increasing minority coverage may be deliberate. Both lead to validation on untouched real held-out data."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 560">
          <defs>
            <ArrowMarker id={arrow} />
            <ArrowMarker id={`${arrow}-green`} color="#059669" />
            <pattern id={hatch} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#ede9fe" /><line x1="0" y1="0" x2="0" y2="8" stroke="#7c3aed" strokeWidth="3" /></pattern>
          </defs>
          <text x="130" y="78" textAnchor="end" fontSize="15" fontWeight="800" fill="#0f172a">REAL · 100</text>
          <rect x="155" y="42" width="600" height="66" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <rect x="155" y="42" width="480" height="66" rx="10" fill="#bae6fd" />
          <rect x="635" y="42" width="120" height="66" fill={`url(#${hatch})`} />
          <text x="395" y="82" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0c4a6e">A = 80 · 80%</text>
          <text x="695" y="82" textAnchor="middle" fontSize="15" fontWeight="800" fill="#4c1d95">B = 20</text>

          <text x="130" y="188" textAnchor="end" fontSize="15" fontWeight="800" fill="#0f172a">SYNTHETIC · 100</text>
          <rect x="155" y="152" width="600" height="66" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <rect x="155" y="152" width="360" height="66" rx="10" fill="#bae6fd" />
          <rect x="515" y="152" width="240" height="66" fill={`url(#${hatch})`} />
          <text x="335" y="192" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0c4a6e">A = 60 · 60%</text>
          <text x="635" y="192" textAnchor="middle" fontSize="16" fontWeight="800" fill="#4c1d95">B = 40 · 40%</text>

          {[0, 20, 40, 60, 80, 100].map((tick) => {
            const x = 155 + tick * 6;
            return <g key={tick}><line x1={x} y1="225" x2={x} y2="235" stroke="#64748b" /><text x={x} y="252" textAnchor="middle" fontSize="10.5" fill="#475569">{tick}%</text></g>;
          })}
          <path d="M695 118 C695 132 635 132 635 145" fill="none" stroke="#7c3aed" strokeWidth="2.5" markerEnd={`url(#${arrow})`} />
          <text x="860" y="130" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">B COVERAGE: 20 → 40 · 2×</text>

          <Boundary x={55} y={315} width={400} height={145} label="GOAL: REPRODUCE POPULATION" tone="rose" />
          <text x="255" y="373" textAnchor="middle" fontSize="15" fontWeight="800" fill="#881337">LOWER FIDELITY</text>
          <text x="255" y="400" textAnchor="middle" fontSize="11.5" fill="#475569">60/40 differs from the observed 80/20 frequency</text>
          <Boundary x={545} y={315} width={400} height={145} label="GOAL: INCREASE MINORITY COVERAGE" tone="emerald" />
          <text x="745" y="373" textAnchor="middle" fontSize="15" fontWeight="800" fill="#064e3b">DELIBERATE REBALANCING MAY HELP</text>
          <text x="745" y="400" textAnchor="middle" fontSize="11.5" fill="#475569">more B examples expose the learner to more B cases</text>

          <DiagramNode x={340} y={492} width={320} height={54} title="Validate downstream results on untouched real data" tone="slate" />
          <Connector d="M255 460 C255 482 400 475 425 482" markerId={`${arrow}-green`} tone="emerald" />
          <Connector d="M745 460 C745 482 600 475 575 482" markerId={`${arrow}-green`} tone="emerald" />
        </DiagramCanvas>
      </div>

      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 780">
          <defs>
            <ArrowMarker id={`${arrow}-mobile`} />
            <ArrowMarker id={`${arrow}-mobile-green`} color="#059669" />
            <pattern id={`${hatch}-mobile`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#ede9fe" /><line x1="0" y1="0" x2="0" y2="8" stroke="#7c3aed" strokeWidth="3" /></pattern>
          </defs>
          <text x="25" y="56" fontSize="13" fontWeight="800" fill="#0f172a">REAL · 100</text>
          <rect x="25" y="72" width="250" height="54" rx="9" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <rect x="25" y="72" width="200" height="54" rx="9" fill="#bae6fd" />
          <rect x="225" y="72" width="50" height="54" fill={`url(#${hatch}-mobile)`} />
          <text x="125" y="104" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0c4a6e">A = 80</text>
          <text x="250" y="104" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#4c1d95">B 20</text>

          <text x="25" y="178" fontSize="13" fontWeight="800" fill="#0f172a">SYNTHETIC · 100</text>
          <rect x="25" y="194" width="250" height="54" rx="9" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <rect x="25" y="194" width="150" height="54" rx="9" fill="#bae6fd" />
          <rect x="175" y="194" width="100" height="54" fill={`url(#${hatch}-mobile)`} />
          <text x="100" y="226" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0c4a6e">A = 60</text>
          <text x="225" y="226" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#4c1d95">B = 40</text>
          <text x="150" y="282" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">B DOUBLES: 20 → 40 · 2× COVERAGE</text>

          <Boundary x={8} y={340} width={284} height={145} label="GOAL: MATCH POPULATION" tone="rose" />
          <text x="150" y="397" textAnchor="middle" fontSize="14" fontWeight="800" fill="#881337">LOWER FIDELITY</text>
          <text x="150" y="425" textAnchor="middle" fontSize="10.5" fill="#475569">60/40 does not reproduce 80/20</text>
          <Boundary x={8} y={535} width={284} height={155} label="GOAL: INCREASE B COVERAGE" tone="emerald" />
          <text x="150" y="593" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#064e3b">REBALANCING MAY BE DELIBERATE</text>
          <text x="150" y="621" textAnchor="middle" fontSize="10.5" fill="#475569">more coverage does not mean more fidelity</text>
          <DiagramNode x={35} y={718} width={230} height={50} title="Validate on untouched real data" tone="slate" />
          <Connector d="M150 690 V708" markerId={`${arrow}-mobile-green`} tone="emerald" />
        </DiagramCanvas>
      </div>
      <Legend items={[
        { tone: "sky", label: "class A" },
        { tone: "violet", label: "class B · hatched and labelled" },
        { tone: "rose", label: "fidelity mismatch" },
        { tone: "emerald", label: "intentional coverage goal" },
      ]} />
    </GenAIFigure>
  );
}
