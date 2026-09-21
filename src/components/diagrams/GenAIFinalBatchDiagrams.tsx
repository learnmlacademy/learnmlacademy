import type React from "react";
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

function Label({ x, y, children, color = "#334155", size = 12, anchor = "middle" }: {
  x: number;
  y: number;
  children: React.ReactNode;
  color?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="800" fill={color}>{children}</text>;
}

function MetricBar({ y, label, direction, a, b, aWidth, bWidth }: {
  y: number;
  label: string;
  direction: string;
  a: string;
  b: string;
  aWidth: number;
  bWidth: number;
}) {
  return (
    <g>
      <text x="28" y={y + 17} fontSize="12" fontWeight="800" fill="#0f172a">{label}</text>
      <text x="182" y={y + 17} fontSize="11" fontWeight="800" fill="#475569">{direction}</text>
      <rect x="238" y={y} width="260" height="25" rx="7" fill="#f1f5f9" />
      <rect x="238" y={y} width={aWidth} height="25" rx="7" fill="#7dd3fc" stroke="#0284c7" />
      <text x="508" y={y + 17} fontSize="11.5" fontWeight="800" fill="#0c4a6e">A · {a}</text>
      <rect x="625" y={y} width="260" height="25" rx="7" fill="#f1f5f9" />
      <rect x="625" y={y} width={bWidth} height="25" rx="7" fill="#c4b5fd" stroke="#7c3aed" />
      <text x="895" y={y + 17} fontSize="11.5" fontWeight="800" fill="#4c1d95">B · {b}</text>
    </g>
  );
}

export function EvaluationPipelineDiagram() {
  const arrow = "evaluation-pipeline-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Evaluation begins with the use case and ends with a release decision"
      caption="Choose only the quality dimensions that the user job actually needs. Automatic checks and human review produce complementary evidence before failures are sliced and a candidate is released, selected, or rejected."
      description="The use case and success criteria lead to a selected quality profile, a fixed evaluation set, and recorded candidate models or settings. Each candidate branches into automatic evaluation and human review. Their evidence reunites in failure and subgroup analysis, which leads to release, select, or reject. The quality profile lists fidelity, diversity, adherence, factuality, safety, latency, and cost as possible dimensions rather than mandatory universal metrics."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 610">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-green`} color="#059669" /></defs>
          <DiagramNode x={25} y={42} width={190} height={72} title="Use case" detail="user job + success criteria" tone="sky" />
          <DiagramNode x={275} y={32} width={220} height={92} title="Quality dimensions" detail="select what this job needs" tone="violet" />
          <DiagramNode x={555} y={42} width={190} height={72} title="Fixed evaluation set" detail="same held-out cases" tone="amber" />
          <DiagramNode x={805} y={42} width={170} height={72} title="Candidates" detail="models + settings" tone="slate" />
          <Connector d="M215 78 H265" markerId={arrow} tone="slate" />
          <Connector d="M495 78 H545" markerId={arrow} tone="slate" />
          <Connector d="M745 78 H795" markerId={arrow} tone="slate" />

          <Boundary x={235} y={160} width={530} height={112} label="POSSIBLE DIMENSIONS · SELECT, DO NOT ASSUME ALL" tone="violet" />
          {[
            [265, 195, "Fidelity"], [380, 195, "Diversity"], [495, 195, "Adherence"],
            [610, 195, "Factuality"], [315, 232, "Safety"], [460, 232, "Latency"], [605, 232, "Cost"],
          ].map(([x, y, text]) => <g key={String(text)}><rect x={Number(x)} y={Number(y)} width="100" height="27" rx="13" fill="#ffffff" stroke="#7c3aed" /><Label x={Number(x) + 50} y={Number(y) + 18} color="#4c1d95" size={10.5}>{text}</Label></g>)}

          <path d="M890 114 V310 M890 310 H322 V337 M890 310 H678 V337" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M314 327 l8 10 l8 -10 z M670 327 l8 10 l8 -10 z" fill="#64748b" />
          <DiagramNode x={205} y={340} width={235} height={80} title="Automatic evaluation" detail="repeatable metrics + rule checks" tone="sky" />
          <DiagramNode x={560} y={340} width={235} height={80} title="Human review" detail="blind rubric + preference + reasons" tone="violet" />
          <Connector d="M322 420 V462 H500 V480" markerId={`${arrow}-green`} tone="emerald" />
          <Connector d="M678 420 V462 H500 V480" markerId={`${arrow}-green`} tone="emerald" />
          <DiagramNode x={365} y={480} width={270} height={74} title="Failure slices / subgroups" detail="find who, where, and how it fails" tone="rose" />
          <DiagramNode x={735} y={480} width={230} height={74} title="Release · Select · Reject" detail="hard gates + documented trade-offs" tone="emerald" />
          <Connector d="M635 517 H725" markerId={`${arrow}-green`} tone="emerald" />
          <Label x={500} y={590} color="#064e3b" size={13}>THE QUESTION IS “BEST FOR WHAT?” — NOT JUST “BEST MODEL”</Label>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 980">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-green-mobile`} color="#059669" /></defs>
          <DiagramNode x={50} y={28} width={200} height={62} title="Use case" detail="job + success criteria" tone="sky" />
          <Connector d="M150 90 V120" markerId={`${arrow}-mobile`} tone="slate" />
          <DiagramNode x={42} y={120} width={216} height={68} title="Quality dimensions" detail="choose only what matters" tone="violet" />
          <Boundary x={18} y={228} width={264} height={145} label="POSSIBLE · NOT UNIVERSAL" tone="violet" />
          <text x="150" y="266" textAnchor="middle" fontSize="11" fontWeight="800" fill="#4c1d95">FIDELITY · DIVERSITY · ADHERENCE</text>
          <text x="150" y="298" textAnchor="middle" fontSize="11" fontWeight="800" fill="#4c1d95">FACTUALITY · SAFETY</text>
          <text x="150" y="330" textAnchor="middle" fontSize="11" fontWeight="800" fill="#4c1d95">LATENCY · COST</text>
          <Connector d="M150 188 V218" markerId={`${arrow}-mobile`} tone="slate" />
          <Connector d="M150 373 V405" markerId={`${arrow}-mobile`} tone="slate" />
          <DiagramNode x={48} y={405} width={204} height={64} title="Fixed evaluation set" detail="same held-out cases" tone="amber" />
          <Connector d="M150 469 V500" markerId={`${arrow}-mobile`} tone="slate" />
          <DiagramNode x={48} y={500} width={204} height={64} title="Candidate models" detail="record settings and versions" tone="slate" />
          <path d="M150 564 V600 H74 V620 M150 600 H226 V620" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M66 610 l8 10 l8 -10 z M218 610 l8 10 l8 -10 z" fill="#64748b" />
          <DiagramNode x={18} y={620} width={112} height={82} title="Automatic" detail="metrics + rules" tone="sky" />
          <DiagramNode x={170} y={620} width={112} height={82} title="Human review" detail="rubric + reasons" tone="violet" />
          <path d="M74 702 V738 H150 V758 M226 702 V738 H150" fill="none" stroke="#059669" strokeWidth="2.5" />
          <path d="M142 748 l8 10 l8 -10 z" fill="#059669" />
          <DiagramNode x={40} y={758} width={220} height={68} title="Failure slices" detail="subgroups + failure types" tone="rose" />
          <Connector d="M150 826 V858" markerId={`${arrow}-green-mobile`} tone="emerald" />
          <DiagramNode x={38} y={858} width={224} height={68} title="Release · Select · Reject" detail="requirements decide" tone="emerald" />
          <Label x={150} y={962} color="#064e3b" size={12}>BEST FOR WHAT?</Label>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "sky", label: "automatic evidence" }, { tone: "violet", label: "human/use-case judgment" }, { tone: "rose", label: "failures to inspect" }, { tone: "emerald", label: "decision path" }]} />
    </GenAIFigure>
  );
}

export function EvaluationTradeoffDiagram() {
  return (
    <GenAIFigure
      title="Figure 2 — Generator A and B win different dimensions"
      caption="Bars are scaled within each row only; do not compare bar lengths across different metrics. A passes preference and adherence more strongly, while B has fewer artifacts, lower latency, and lower cost."
      description="Five paired metric rows compare hypothetical Generator A and B. Prompt adherence is 4.4 versus 4.0, where higher is better. Artifact rate is 8 percent versus 3 percent, where lower is better. Human preference is 62 percent versus 38 percent, where higher is better. P95 latency is 4.2 seconds versus 2.1 seconds, where lower is better. Cost per successful image is four cents versus two cents, where lower is better. Hard release gates require artifact rate at most 5 percent and p95 latency at most 3 seconds, so only B is eligible despite A winning other dimensions."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 510">
          <Label x={368} y={28} color="#0c4a6e" size={14}>GENERATOR A</Label>
          <Label x={755} y={28} color="#4c1d95" size={14}>GENERATOR B</Label>
          <MetricBar y={55} label="Prompt adherence" direction="↑" a="4.4 / 5" b="4.0 / 5" aWidth={229} bWidth={208} />
          <MetricBar y={112} label="Artifact rate" direction="↓" a="8%" b="3%" aWidth={208} bWidth={78} />
          <MetricBar y={169} label="Human preference" direction="↑" a="62%" b="38%" aWidth={161} bWidth={99} />
          <MetricBar y={226} label="p95 latency" direction="↓" a="4.2 s" b="2.1 s" aWidth={218} bWidth={109} />
          <MetricBar y={283} label="Cost / success" direction="↓" a="$0.04" b="$0.02" aWidth={208} bWidth={104} />
          <Boundary x={35} y={352} width={930} height={112} label="HARD RELEASE GATES · CHOSEN BEFORE COMPARISON" tone="amber" />
          <text x="175" y="399" textAnchor="middle" fontSize="13" fontWeight="800" fill="#78350f">artifact rate ≤ 5%</text>
          <text x="175" y="428" textAnchor="middle" fontSize="13" fontWeight="800" fill="#78350f">p95 latency ≤ 3 s</text>
          <rect x="350" y="383" width="220" height="54" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
          <Label x={460} y={406} color="#881337" size={13}>A · REJECT FOR RELEASE</Label>
          <text x="460" y="426" textAnchor="middle" fontSize="11" fill="#881337">fails both hard gates</text>
          <rect x="700" y="383" width="220" height="54" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <Label x={810} y={406} color="#064e3b" size={13}>B · ELIGIBLE</Label>
          <text x="810" y="426" textAnchor="middle" fontSize="11" fill="#064e3b">passes both hard gates</text>
          <Label x={500} y={495} color="#334155" size={12}>NO SINGLE COMBINED SCORE · REQUIREMENTS AND PRIORITIES DETERMINE THE CHOICE</Label>
        </DiagramCanvas>
      </div>
      <div className="space-y-3 lg:hidden">
        {[
          ["Prompt adherence ↑", "A 4.4 / 5", "B 4.0 / 5", "A"],
          ["Artifact rate ↓", "A 8%", "B 3%", "B"],
          ["Human preference ↑", "A 62%", "B 38%", "A"],
          ["p95 latency ↓", "A 4.2 s", "B 2.1 s", "B"],
          ["Cost / successful image ↓", "A $0.04", "B $0.02", "B"],
        ].map(([metric, a, b, winner]) => (
          <div key={metric} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3"><p className="text-sm font-extrabold text-slate-900">{metric}</p><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-900">row winner: {winner}</span></div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-center text-sm font-bold"><span className="rounded-lg border border-sky-400 bg-sky-50 p-2 text-sky-900">{a}</span><span className="rounded-lg border border-violet-400 bg-violet-50 p-2 text-violet-900">{b}</span></div>
          </div>
        ))}
        <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-4 text-center">
          <p className="text-sm font-extrabold text-amber-950">Hard gates: artifacts ≤ 5% · p95 ≤ 3 s</p>
          <div className="mt-3 grid grid-cols-2 gap-2"><span className="rounded-lg border border-rose-500 bg-rose-50 p-2 text-sm font-bold text-rose-900">A · reject</span><span className="rounded-lg border border-emerald-600 bg-emerald-50 p-2 text-sm font-bold text-emerald-900">B · eligible</span></div>
          <p className="mt-3 text-xs font-semibold text-slate-700">No combined score: “best” depends on requirements.</p>
        </div>
      </div>
    </GenAIFigure>
  );
}

export function ResponsibleLifecycleDiagram() {
  const arrow = "responsible-lifecycle-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Responsibility continues after deployment"
      caption="A limited release begins observation, not the end of safety work. Monitoring and incidents feed evidence back into controls and tests."
      description="An eight-stage loop moves from define intended use to identify risks, design controls, test and red-team, limited release, monitor, incident response, and improve. A visible feedback path returns improvement evidence to control design and testing. A small inset explains that likelihood times impact is a prioritization aid, not a probability."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 560">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-rose`} color="#e11d48" /></defs>
          <Boundary x={18} y={38} width={964} height={470} label="RESPONSIBLE GENAI LIFECYCLE" tone="violet" />
          {[
            [70, 95, "1 · Define use", "users · benefit · limits", "sky"],
            [300, 95, "2 · Identify risks", "people · data · systems", "rose"],
            [545, 95, "3 · Design controls", "prevent · detect · recover", "amber"],
            [785, 95, "4 · Test / red-team", "normal · slice · adversarial", "violet"],
            [785, 290, "5 · Limited release", "small traffic · stop rules", "sky"],
            [545, 290, "6 · Monitor", "quality · safety · drift", "sky"],
            [300, 290, "7 · Incident response", "contain · investigate · own", "rose"],
            [70, 290, "8 · Improve", "controls · tests · docs", "emerald"],
          ].map(([x, y, title, detail, tone]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={165} height={72} title={String(title)} detail={String(detail)} tone={tone as "sky" | "rose" | "amber" | "violet" | "emerald"} /></g>)}
          <Connector d="M235 131 H290" markerId={arrow} tone="slate" />
          <Connector d="M465 131 H535" markerId={arrow} tone="slate" />
          <Connector d="M710 131 H775" markerId={arrow} tone="slate" />
          <Connector d="M868 167 V280" markerId={arrow} tone="slate" />
          <Connector d="M785 326 H720" markerId={arrow} tone="slate" />
          <Connector d="M545 326 H475" markerId={arrow} tone="slate" />
          <Connector d="M300 326 H245" markerId={arrow} tone="slate" />
          <Connector d="M152 290 V177" markerId={arrow} tone="slate" label="repeat as conditions change" labelX={152} labelY={236} />
          <Connector d="M152 362 V410 H742 V131" markerId={`${arrow}-rose`} tone="rose" label="evidence feeds controls and tests" labelX={430} labelY={390} dashed />
          <rect x="720" y="420" width="220" height="64" rx="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <Label x={830} y={446} color="#78350f" size={12}>PRIORITIZATION AID</Label>
          <text x="830" y="469" textAnchor="middle" fontSize="12" fill="#78350f">likelihood × impact · not probability</text>
          <Label x={500} y={542} color="#4c1d95" size={13}>RELEASE IS A CONTROLLED STAGE INSIDE THE LOOP</Label>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 960">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-rose-mobile`} color="#e11d48" /></defs>
          <Boundary x={8} y={28} width={284} height={850} label="RESPONSIBILITY LOOP" tone="violet" />
          {[
            [55, 60, "1 · Define intended use", "users · benefits · limits", "sky"],
            [55, 155, "2 · Identify risks", "people · data · connected systems", "rose"],
            [55, 250, "3 · Design controls", "prevent · detect · recover", "amber"],
            [55, 345, "4 · Test / red-team", "normal · subgroup · adversarial", "violet"],
            [55, 440, "5 · Limited release", "small traffic · stop rules", "sky"],
            [55, 535, "6 · Monitor", "quality · safety · drift", "sky"],
            [55, 630, "7 · Incident response", "contain · investigate · own", "rose"],
            [55, 725, "8 · Improve", "controls · tests · documents", "emerald"],
          ].map(([x, y, title, detail, tone]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={190} height={58} title={String(title)} detail={String(detail)} tone={tone as "sky" | "rose" | "amber" | "violet" | "emerald"} /></g>)}
          {[118,213,308,403,498,593,688].map((y) => <g key={y}><Connector d={`M150 ${y} V${y + 37}`} markerId={`${arrow}-mobile`} tone="slate" /></g>)}
          <Connector d="M55 754 C20 754 20 279 55 279" markerId={`${arrow}-rose-mobile`} tone="rose" dashed />
          <text x="38" y="525" transform="rotate(-90 38 525)" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">FEEDBACK</text>
          <rect x="45" y="820" width="210" height="42" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="150" y="838" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#78350f">PRIORITY: LIKELIHOOD × IMPACT</text>
          <text x="150" y="854" textAnchor="middle" fontSize="9.5" fill="#78350f">planning aid · not a probability</text>
          <Label x={150} y={925} color="#4c1d95" size={11.5}>RELEASE DOES NOT END THE LOOP</Label>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "sky", label: "define and observe" }, { tone: "rose", label: "risk and incident" }, { tone: "amber", label: "designed controls" }, { tone: "emerald", label: "improvement feedback" }]} />
    </GenAIFigure>
  );
}

export function LayeredSafetyDiagram() {
  const arrow = "layered-safety-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — A safe application uses controls at several layers"
      caption="The model sits inside a controlled path. Operational controls observe the whole application, while a disclaimer is only one user-experience control."
      description="Inside an operational boundary, user input passes through input controls, approved context and model, output controls, and then user experience or human review. The surrounding operational layer includes access control, privacy-aware logging, monitoring, and incident handling. A private-data risk is stopped by input or context controls, and an unsupported-claim risk is checked at output and human-review layers. A small disclaimer badge appears only at the user-experience layer."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 560">
          <defs><ArrowMarker id={arrow} /></defs>
          <Boundary x={18} y={42} width={964} height={450} label="OPERATIONAL LAYER · OBSERVES THE WHOLE APPLICATION" tone="rose" />
          <Label x={500} y={88} color="#881337" size={12}>ACCESS CONTROL · PRIVACY-AWARE LOGGING · MONITORING · INCIDENT HANDLING</Label>
          <DiagramNode x={42} y={190} width={130} height={72} title="User / input" detail="request + data" tone="sky" />
          <DiagramNode x={215} y={178} width={155} height={96} title="Input controls" detail="access · minimize" tone="amber" />
          <DiagramNode x={415} y={178} width={170} height={96} title="Context + model" detail="approved evidence" tone="violet" />
          <DiagramNode x={630} y={178} width={155} height={96} title="Output controls" detail="grounding · policy" tone="sky" />
          <DiagramNode x={825} y={178} width={140} height={96} title="UX / human review" detail="disclose · escalate" tone="emerald" />
          <Connector d="M172 226 H205" markerId={arrow} tone="slate" />
          <Connector d="M370 226 H405" markerId={arrow} tone="slate" />
          <Connector d="M585 226 H620" markerId={arrow} tone="slate" />
          <Connector d="M785 226 H815" markerId={arrow} tone="slate" />
          <Boundary x={92} y={330} width={365} height={100} label="EXAMPLE RISK 1 · PRIVATE DATA" tone="sky" />
          <text x="274" y="374" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0c4a6e">access + minimization act before the model</text>
          <text x="274" y="400" textAnchor="middle" fontSize="11" fill="#475569">monitoring still checks for leakage after release</text>
          <Boundary x={542} y={330} width={365} height={100} label="EXAMPLE RISK 2 · UNSUPPORTED CLAIM" tone="violet" />
          <text x="724" y="374" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">grounding check + human escalation act after model</text>
          <text x="724" y="400" textAnchor="middle" fontSize="11" fill="#475569">the model cannot certify its own claim</text>
          <rect x="833" y="286" width="124" height="28" rx="14" fill="#fef3c7" stroke="#d97706" />
          <Label x={895} y={305} color="#78350f" size={10.5}>DISCLAIMER · ONE UX CONTROL</Label>
          <Label x={500} y={532} color="#881337" size={13}>SAFE MODEL ≠ SAFE APPLICATION BY ITSELF</Label>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 910">
          <defs><ArrowMarker id={`${arrow}-mobile`} /></defs>
          <Boundary x={8} y={28} width={284} height={800} label="OPERATIONS SURROUND THE PATH" tone="rose" />
          <text x="150" y="64" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">ACCESS · PRIVATE LOGS · MONITOR · INCIDENTS</text>
          {[
            [55, 95, "User / input", "request + data", "sky"],
            [55, 190, "Input controls", "access · consent · minimize", "amber"],
            [55, 285, "Context + model", "approved evidence · model", "violet"],
            [55, 380, "Output controls", "grounding · schema · policy", "sky"],
            [55, 475, "UX / human review", "disclose · correct · escalate", "emerald"],
          ].map(([x, y, title, detail, tone]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={190} height={58} title={String(title)} detail={String(detail)} tone={tone as "sky" | "amber" | "violet" | "emerald"} /></g>)}
          {[153,248,343,438].map((y) => <g key={y}><Connector d={`M150 ${y} V${y + 37}`} markerId={`${arrow}-mobile`} tone="slate" /></g>)}
          <rect x="80" y="546" width="140" height="28" rx="14" fill="#fef3c7" stroke="#d97706" />
          <Label x={150} y={565} color="#78350f" size={10.5}>DISCLAIMER · UX ONLY</Label>
          <Boundary x={25} y={620} width={250} height={74} label="PRIVATE DATA" tone="sky" />
          <text x="150" y="657" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#0c4a6e">access + minimization act before model</text>
          <Boundary x={25} y={730} width={250} height={74} label="UNSUPPORTED CLAIM" tone="violet" />
          <text x="150" y="767" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#4c1d95">grounding + review act after model</text>
          <Label x={150} y={872} color="#881337" size={11.5}>SAFE MODEL ≠ SAFE APP</Label>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "amber", label: "prevent before model" }, { tone: "violet", label: "model/context boundary" }, { tone: "sky", label: "check after model" }, { tone: "rose", label: "operations across system" }]} />
    </GenAIFigure>
  );
}

export function GenerativeNeedDecisionDiagram() {
  const arrow = "genai-need-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — First decide whether the task needs generation"
      caption="A generative model is only one branch. Exact lookup, prediction, and fixed policy logic often belong on the non-generative branch."
      description="A decision tree starts with what the user needs and asks whether the task requires new content. The no branch leads to retrieval, rules, classifier or regression, and templates. The yes branch identifies output modality, then quality and control constraints, then privacy and deployment constraints, and finally shortlists suitable model families."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 560">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-rose`} color="#e11d48" /><ArrowMarker id={`${arrow}-green`} color="#059669" /></defs>
          <DiagramNode x={350} y={24} width={300} height={68} title="What does the user need?" detail="state the job and acceptable result" tone="sky" />
          <rect x="365" y="140" width="270" height="82" rx="41" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          <Label x={500} y={176} color="#78350f" size={15}>REQUIRES NEW CONTENT?</Label>
          <text x="500" y="199" textAnchor="middle" fontSize="11.5" fill="#78350f">creation · transformation · variation</text>
          <Connector d="M500 92 V130" markerId={arrow} tone="slate" />
          <path d="M365 181 H180 V250" fill="none" stroke="#e11d48" strokeWidth="2.5" />
          <path d="M635 181 H820 V250" fill="none" stroke="#059669" strokeWidth="2.5" />
          <Label x={245} y={166} color="#881337" size={13}>NO</Label><Label x={755} y={166} color="#064e3b" size={13}>YES</Label>
          <path d="M172 240 l8 10 l8 -10 z" fill="#e11d48" /><path d="M812 240 l8 10 l8 -10 z" fill="#059669" />
          <Boundary x={30} y={250} width={300} height={250} label="USE A MORE FITTING TOOL" tone="rose" />
          {[[60,300,"Retrieval","stored evidence"],[190,300,"Rules","exact logic"],[60,395,"Prediction","classifier / regression"],[190,395,"Template","fixed structure"]].map(([x,y,title,detail]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={110} height={65} title={String(title)} detail={String(detail)} tone="slate" /></g>)}
          <Boundary x={390} y={250} width={580} height={250} label="GENERATION CANDIDATE PATH" tone="emerald" />
          <DiagramNode x={420} y={304} width={140} height={72} title="Modality" detail="text · image · audio" tone="violet" />
          <DiagramNode x={610} y={304} width={140} height={72} title="Quality + control" detail="what must be right?" tone="amber" />
          <DiagramNode x={800} y={304} width={140} height={72} title="Privacy + deploy" detail="where may data/model run?" tone="rose" />
          <Connector d="M560 340 H600" markerId={`${arrow}-green`} tone="emerald" />
          <Connector d="M750 340 H790" markerId={`${arrow}-green`} tone="emerald" />
          <DiagramNode x={585} y={420} width={210} height={60} title="Shortlist model families" detail="then test real implementations" tone="emerald" />
          <Connector d="M870 376 V400 H690 V410" markerId={`${arrow}-green`} tone="emerald" />
          <Label x={500} y={540} color="#334155" size={13}>GENERATIVE AI IS A DECISION — NOT THE DEFAULT</Label>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 900">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-rose-mobile`} color="#e11d48" /><ArrowMarker id={`${arrow}-green-mobile`} color="#059669" /></defs>
          <DiagramNode x={42} y={25} width={216} height={64} title="What does the user need?" detail="define the result" tone="sky" />
          <Connector d="M150 89 V120" markerId={`${arrow}-mobile`} tone="slate" />
          <rect x="35" y="120" width="230" height="74" rx="37" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
          <Label x={150} y={151} color="#78350f" size={13}>REQUIRES NEW CONTENT?</Label>
          <text x="150" y="175" textAnchor="middle" fontSize="10.5" fill="#78350f">creation · transformation · variation</text>
          <Boundary x={18} y={240} width={264} height={200} label="NO · USE A FITTING TOOL" tone="rose" />
          <text x="150" y="285" textAnchor="middle" fontSize="12" fontWeight="800" fill="#881337">RETRIEVAL · exact stored evidence</text>
          <text x="150" y="320" textAnchor="middle" fontSize="12" fontWeight="800" fill="#881337">RULES · fixed policy logic</text>
          <text x="150" y="355" textAnchor="middle" fontSize="12" fontWeight="800" fill="#881337">CLASSIFIER / REGRESSION · prediction</text>
          <text x="150" y="390" textAnchor="middle" fontSize="12" fontWeight="800" fill="#881337">TEMPLATE · controlled structure</text>
          <Connector d="M95 194 V230" markerId={`${arrow}-rose-mobile`} tone="rose" label="NO" labelX={78} labelY={216} />
          <Boundary x={18} y={492} width={264} height={338} label="YES · GENERATION PATH" tone="emerald" />
          <Connector d="M205 194 V220 H286 V466 H150 V482" markerId={`${arrow}-green-mobile`} tone="emerald" label="YES" labelX={245} labelY={216} />
          <DiagramNode x={55} y={530} width={190} height={58} title="Identify modality" detail="text · image · audio · mixed" tone="violet" />
          <DiagramNode x={55} y={625} width={190} height={58} title="Quality + control" detail="what must be correct?" tone="amber" />
          <DiagramNode x={55} y={720} width={190} height={58} title="Privacy + deployment" detail="where may it run?" tone="rose" />
          <Connector d="M150 588 V625" markerId={`${arrow}-green-mobile`} tone="emerald" />
          <Connector d="M150 683 V720" markerId={`${arrow}-green-mobile`} tone="emerald" />
          <Label x={150} y={810} color="#064e3b" size={11}>SHORTLIST → MEASURE CANDIDATES</Label>
          <Label x={150} y={870} color="#334155" size={11.5}>GENERATION IS NOT THE DEFAULT</Label>
        </DiagramCanvas>
      </div>
    </GenAIFigure>
  );
}

export function ConstraintSelectionDiagram() {
  const arrow = "constraint-selection-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — Hard constraints remove candidates before soft trade-offs"
      caption="The worked example’s three candidates pass through required mask editing, permitted use, and a p95 latency ceiling. Only eligible models should enter the shared quality-and-cost comparison."
      description="Candidate A, B, and C enter a series of hard gates. A drops out because it lacks mask editing. B and C pass the intended-use terms check. C drops out because its 5.1-second p95 latency exceeds the 4-second ceiling. B survives, enters the same evaluation set and comparison of quality, latency, cost, control, and safety, and becomes the measured winner."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 570">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-green`} color="#059669" /><ArrowMarker id={`${arrow}-rose`} color="#e11d48" /></defs>
          <Boundary x={22} y={45} width={180} height={420} label="CANDIDATES" tone="slate" />
          <DiagramNode x={55} y={100} width={115} height={60} title="A" detail="p95 2.4 s" tone="sky" />
          <DiagramNode x={55} y={220} width={115} height={60} title="B" detail="p95 3.2 s" tone="violet" />
          <DiagramNode x={55} y={340} width={115} height={60} title="C" detail="p95 5.1 s" tone="amber" />
          <Boundary x={245} y={45} width={490} height={420} label="HARD CONSTRAINT FUNNEL" tone="amber" />
          <DiagramNode x={275} y={92} width={150} height={66} title="Mask editing?" detail="required control" tone="amber" />
          <DiagramNode x={455} y={92} width={150} height={66} title="Use permitted?" detail="documented review" tone="amber" />
          <DiagramNode x={635} y={92} width={80} height={66} title="p95" detail="≤ 4.0 s" tone="amber" />
          <Connector d="M170 130 H265" markerId={arrow} tone="slate" />
          <Connector d="M170 250 C230 250 230 125 265 125" markerId={arrow} tone="slate" />
          <Connector d="M170 370 C230 370 230 125 265 125" markerId={arrow} tone="slate" />
          <Connector d="M425 125 H445" markerId={`${arrow}-green`} tone="emerald" />
          <Connector d="M605 125 H625" markerId={`${arrow}-green`} tone="emerald" />
          <Connector d="M715 125 H772" markerId={`${arrow}-green`} tone="emerald" />
          <rect x="270" y="205" width="160" height="55" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" /><Label x={350} y={228} color="#881337" size={12}>A DROPS OUT</Label><text x="350" y="248" textAnchor="middle" fontSize="10.5" fill="#881337">no mask editing</text>
          <Connector d="M350 158 V195" markerId={`${arrow}-rose`} tone="rose" />
          <rect x="570" y="325" width="160" height="55" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" /><Label x={650} y={348} color="#881337" size={12}>C DROPS OUT</Label><text x="650" y="368" textAnchor="middle" fontSize="10.5" fill="#881337">p95 5.1 s &gt; 4.0 s</text>
          <Connector d="M675 158 V315" markerId={`${arrow}-rose`} tone="rose" />
          <rect x="310" y="325" width="200" height="55" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" /><Label x={410} y={348} color="#064e3b" size={12}>B SURVIVES ALL GATES</Label><text x="410" y="368" textAnchor="middle" fontSize="10.5" fill="#064e3b">required controls + 3.2 s p95</text>
          <Connector d="M675 158 C675 290 410 290 410 315" markerId={`${arrow}-green`} tone="emerald" />
          <DiagramNode x={782} y={82} width={190} height={86} title="Same evaluation set" detail="quality · cost · control · safety" tone="violet" />
          <DiagramNode x={782} y={260} width={190} height={72} title="Measured winner: B" detail="eligible fit for this job" tone="emerald" />
          <Connector d="M877 168 V250" markerId={`${arrow}-green`} tone="emerald" />
          <Label x={500} y={510} color="#334155" size={12.5}>LARGEST / NEWEST ≠ AUTOMATICALLY BEST</Label>
          <Label x={500} y={540} color="#064e3b" size={12.5}>FAIL HARD CONSTRAINT → DO NOT TRADE IT AWAY WITH A SOFT SCORE</Label>
        </DiagramCanvas>
      </div>
      <div className="space-y-3 lg:hidden">
        <div className="grid grid-cols-3 gap-2 text-center text-sm font-bold"><span className="rounded-lg border border-sky-400 bg-sky-50 p-2">A</span><span className="rounded-lg border border-violet-400 bg-violet-50 p-2">B</span><span className="rounded-lg border border-amber-400 bg-amber-50 p-2">C</span></div>
        {[
          ["Gate 1 · Mask editing required", "A drops: no", "B + C pass"],
          ["Gate 2 · Intended use permitted", "documented review", "B + C pass"],
          ["Gate 3 · p95 ≤ 4.0 s", "C drops: 5.1 s", "B passes: 3.2 s"],
        ].map(([title, fail, pass]) => <div key={title} className="rounded-xl border-2 border-amber-400 bg-amber-50 p-3 text-center"><p className="text-sm font-extrabold text-amber-950">{title}</p><div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold"><span className="rounded-lg border border-rose-400 bg-rose-50 p-2 text-rose-900">{fail}</span><span className="rounded-lg border border-emerald-500 bg-emerald-50 p-2 text-emerald-900">{pass}</span></div></div>)}
        <div className="text-center text-2xl text-emerald-600" aria-hidden="true">↓</div>
        <div className="rounded-xl border-2 border-violet-500 bg-violet-50 p-4 text-center"><p className="font-extrabold text-violet-950">Same evaluation set</p><p className="mt-1 text-sm text-slate-700">quality · cost · control · safety</p></div>
        <div className="text-center text-2xl text-emerald-600" aria-hidden="true">↓</div>
        <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4 text-center"><p className="font-extrabold text-emerald-950">Measured winner: B</p><p className="mt-1 text-xs font-semibold text-slate-700">largest/newest is not automatically best</p></div>
      </div>
    </GenAIFigure>
  );
}

export function ApplicationArchitectureDiagram() {
  const arrow = "application-architecture-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — The model is one component inside the application"
      caption="Deterministic application logic controls what reaches the model and what becomes visible to the user. Invalid or uncertain outputs leave the main path through retry, fallback, or human review."
      description="A nine-stage application architecture moves from user input to input validation, context or evidence assembly, request construction, generative model, structured output, schema validation, business and evidence validation, and user-visible result. The model is visually isolated inside a model boundary, while surrounding stages are application logic. Failed validation branches to bounded retry, safe fallback, or human review. Evaluation and feedback logging observe the result without requiring raw private content."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 650">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-green`} color="#059669" /><ArrowMarker id={`${arrow}-rose`} color="#e11d48" /></defs>
          <Boundary x={18} y={42} width={964} height={510} label="APPLICATION LOGIC" tone="sky" />
          <DiagramNode x={35} y={105} width={135} height={70} title="User input" detail="approved transcript" tone="sky" />
          <DiagramNode x={205} y={105} width={145} height={70} title="Input validation" detail="type · size · permission" tone="sky" />
          <DiagramNode x={385} y={105} width={155} height={70} title="Context / evidence" detail="approved sources only" tone="violet" />
          <DiagramNode x={575} y={105} width={150} height={70} title="Build request" detail="instructions + schema" tone="amber" />
          <Boundary x={770} y={82} width={180} height={115} label="MODEL" tone="rose" />
          <DiagramNode x={790} y={110} width={140} height={64} title="Generate draft" detail="uncertain candidate" tone="rose" />
          <Connector d="M170 140 H195" markerId={arrow} tone="slate" />
          <Connector d="M350 140 H375" markerId={arrow} tone="slate" />
          <Connector d="M540 140 H565" markerId={arrow} tone="slate" />
          <Connector d="M725 140 H780" markerId={arrow} tone="slate" />

          <DiagramNode x={790} y={280} width={140} height={70} title="Structured output" detail="JSON-like draft" tone="amber" />
          <DiagramNode x={575} y={280} width={150} height={70} title="Schema validation" detail="fields + types + parse" tone="sky" />
          <DiagramNode x={365} y={270} width={175} height={90} title="Business / evidence" detail="support + permissions + rules" tone="violet" />
          <DiagramNode x={120} y={280} width={180} height={70} title="User-visible result" detail="reviewable + supported" tone="emerald" />
          <Connector d="M860 197 V270" markerId={arrow} tone="slate" />
          <Connector d="M790 315 H735" markerId={arrow} tone="slate" />
          <Connector d="M575 315 H550" markerId={arrow} tone="slate" />
          <Connector d="M365 315 H310" markerId={`${arrow}-green`} tone="emerald" label="pass" labelX={338} labelY={302} />

          <Boundary x={530} y={420} width={420} height={100} label="IF A CHECK FAILS OR IMPACT IS HIGH" tone="rose" />
          <text x="740" y="462" textAnchor="middle" fontSize="12" fontWeight="800" fill="#881337">BOUNDED RETRY · SAFE FALLBACK · HUMAN REVIEW</text>
          <text x="740" y="490" textAnchor="middle" fontSize="11" fill="#475569">do not silently promote an invalid draft</text>
          <Connector d="M650 350 V410" markerId={`${arrow}-rose`} tone="rose" label="fail" labelX={668} labelY={389} />
          <Connector d="M452 360 V390 H590 V410" markerId={`${arrow}-rose`} tone="rose" label="unsupported / uncertain" labelX={515} labelY={383} />
          <Boundary x={55} y={420} width={400} height={100} label="EVALUATION / FEEDBACK SIGNALS" tone="emerald" />
          <text x="255" y="463" textAnchor="middle" fontSize="12" fontWeight="800" fill="#064e3b">CASE ID · FAILURE TYPE · LATENCY · CORRECTION</text>
          <text x="255" y="490" textAnchor="middle" fontSize="11" fill="#475569">privacy-aware logging · reusable regression cases</text>
          <Connector d="M210 350 V410" markerId={`${arrow}-green`} tone="emerald" />
          <Label x={500} y={600} color="#0c4a6e" size={13}>MODEL = ONE UNCERTAIN COMPONENT</Label>
          <Label x={500} y={630} color="#334155" size={12}>APPLICATION LOGIC DEFINES INPUTS, CONTRACTS, CHECKS, FALLBACKS, AND USER EXPERIENCE</Label>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] lg:hidden">
        <DiagramCanvas viewBox="0 0 300 1210">
          <defs><ArrowMarker id={`${arrow}-mobile`} /><ArrowMarker id={`${arrow}-rose-mobile`} color="#e11d48" /></defs>
          <Boundary x={8} y={28} width={284} height={1000} label="APPLICATION LOGIC" tone="sky" />
          {[
            [55, 65, "User input", "approved transcript", "sky"],
            [55, 155, "Input validation", "type · size · permission", "sky"],
            [55, 245, "Context / evidence", "approved sources only", "violet"],
            [55, 335, "Build request", "instructions + schema", "amber"],
          ].map(([x,y,title,detail,tone]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={190} height={58} title={String(title)} detail={String(detail)} tone={tone as "sky" | "violet" | "amber"} /></g>)}
          {[123,213,303].map((y) => <g key={y}><Connector d={`M150 ${y} V${y + 32}`} markerId={`${arrow}-mobile`} tone="slate" /></g>)}
          <Boundary x={35} y={430} width={230} height={105} label="MODEL · ONE COMPONENT" tone="rose" />
          <DiagramNode x={65} y={455} width={170} height={58} title="Generate draft" detail="uncertain candidate" tone="rose" />
          <Connector d="M150 393 V420" markerId={`${arrow}-mobile`} tone="slate" />
          {[
            [55, 580, "Structured output", "JSON-like draft", "amber"],
            [55, 670, "Schema validation", "fields · types · parse", "sky"],
            [55, 760, "Business / evidence", "support · permission · rules", "violet"],
            [55, 850, "User-visible result", "reviewable + supported", "emerald"],
          ].map(([x,y,title,detail,tone]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={190} height={58} title={String(title)} detail={String(detail)} tone={tone as "amber" | "sky" | "violet" | "emerald"} /></g>)}
          {[535,638,728,818].map((y, index) => <g key={y}><Connector d={`M150 ${y} V${index === 0 ? 580 : y + 32}`} markerId={`${arrow}-mobile`} tone="slate" /></g>)}
          <Boundary x={25} y={955} width={250} height={58} label="FEEDBACK / EVALUATION" tone="emerald" />
          <text x="150" y="989" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#064e3b">case · failure · latency · correction</text>
          <Boundary x={25} y={1070} width={250} height={78} label="FAILED CHECK" tone="rose" />
          <text x="150" y="1107" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#881337">RETRY · FALLBACK · HUMAN REVIEW</text>
          <text x="150" y="1128" textAnchor="middle" fontSize="9.5" fill="#475569">never silently promote invalid output</text>
          <Connector d="M245 699 H275 V1105 H265" markerId={`${arrow}-rose-mobile`} tone="rose" label="fail" labelX={277} labelY={905} />
          <Label x={150} y={1185} color="#0c4a6e" size={11.5}>MODEL ≠ APPLICATION</Label>
        </DiagramCanvas>
      </div>
      <Legend items={[{ tone: "sky", label: "application boundary / validation" }, { tone: "rose", label: "model / failed draft" }, { tone: "violet", label: "business and evidence rules" }, { tone: "emerald", label: "validated result / feedback" }]} />
    </GenAIFigure>
  );
}

export function OutputValidationDiagram() {
  const arrow = "output-validation-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — Parsing is only the first validation gate"
      caption="The valid meeting-summary draft has the required types and transcript evidence. The invalid draft fails both structure and evidence checks, so it cannot become a user result."
      description="Model output enters parse and validate, then branches. The valid miniature output contains a decisions list and an action item for Maya with evidence copied from the transcript; it passes schema and business evidence rules and becomes a usable reviewable result. The invalid miniature output uses a string where decisions should be a list and says Sam should book a venue using evidence absent from the transcript; it is rejected and routed to bounded retry, fallback, or human review."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 540">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-green`} color="#059669" /><ArrowMarker id={`${arrow}-rose`} color="#e11d48" /></defs>
          <DiagramNode x={35} y={205} width={150} height={72} title="Model output" detail="untrusted draft" tone="rose" />
          <DiagramNode x={235} y={195} width={170} height={92} title="Parse / validate" detail="schema first · evidence next" tone="sky" />
          <Connector d="M185 241 H225" markerId={arrow} tone="slate" />
          <path d="M405 241 H445 V118 H490 M445 241 V390 H490" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M480 110 l10 8 l-10 8 z M480 382 l10 8 l-10 8 z" fill="#64748b" />
          <Boundary x={490} y={50} width={475} height={205} label="VALID BRANCH" tone="emerald" />
          <rect x="520" y="90" width="225" height="126" rx="12" fill="#f8fafc" stroke="#059669" strokeWidth="2" />
          <text x="537" y="116" fontSize="11" fontWeight="800" fill="#064e3b">decisions: [two-week pilot]</text>
          <text x="537" y="145" fontSize="11" fontWeight="800" fill="#064e3b">owner: Maya</text>
          <text x="537" y="170" fontSize="11" fill="#334155">task: send revised budget</text>
          <text x="537" y="195" fontSize="11" fill="#334155">evidence: exact transcript text</text>
          <DiagramNode x={785} y={108} width={145} height={82} title="Usable result" detail="schema ✓ · evidence ✓" tone="emerald" />
          <Connector d="M745 153 H775" markerId={`${arrow}-green`} tone="emerald" />
          <Boundary x={490} y={305} width={475} height={205} label="INVALID BRANCH" tone="rose" />
          <rect x="520" y="345" width="225" height="126" rx="12" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
          <text x="537" y="371" fontSize="11" fontWeight="800" fill="#881337">decisions: “two-week pilot”</text>
          <text x="537" y="396" fontSize="11" fill="#881337">wrong type: string, not list</text>
          <text x="537" y="425" fontSize="11" fontWeight="800" fill="#881337">owner: Sam · task: book venue</text>
          <text x="537" y="450" fontSize="11" fill="#881337">evidence absent from transcript</text>
          <DiagramNode x={785} y={363} width={145} height={82} title="Do not show" detail="retry · fallback · review" tone="rose" />
          <Connector d="M745 408 H775" markerId={`${arrow}-rose`} tone="rose" />
          <Label x={500} y={532} color="#334155" size={12}>VALID JSON CAN STILL CONTAIN AN UNSUPPORTED CLAIM</Label>
        </DiagramCanvas>
      </div>
      <div className="space-y-3 lg:hidden">
        <div className="rounded-xl border-2 border-rose-400 bg-rose-50 p-3 text-center"><p className="font-extrabold text-rose-950">Model output · untrusted draft</p></div>
        <div className="text-center text-2xl text-slate-500" aria-hidden="true">↓</div>
        <div className="rounded-xl border-2 border-indigo-500 bg-indigo-50 p-3 text-center"><p className="font-extrabold text-indigo-950">Parse → schema → evidence rules</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-4"><p className="font-extrabold text-emerald-950">VALID</p><p className="mt-2 font-mono text-xs leading-6 text-slate-700">decisions: [pilot]<br />owner: Maya<br />task: revised budget<br />evidence: in transcript</p><p className="mt-2 text-sm font-bold text-emerald-900">schema ✓ evidence ✓ → usable</p></div>
          <div className="rounded-xl border-2 border-rose-500 bg-rose-50 p-4"><p className="font-extrabold text-rose-950">INVALID</p><p className="mt-2 font-mono text-xs leading-6 text-slate-700">decisions: “pilot”<br />owner: Sam<br />task: book venue<br />evidence: absent</p><p className="mt-2 text-sm font-bold text-rose-900">reject → retry / fallback / review</p></div>
        </div>
        <p className="rounded-lg bg-slate-100 p-3 text-center text-xs font-bold text-slate-700">Valid JSON can still contain an unsupported claim.</p>
      </div>
    </GenAIFigure>
  );
}

export function HostedSelfHostedDiagram() {
  const arrow = "hosted-self-arrow";
  return (
    <GenAIFigure
      title="Figure 1 — Hosted and self-hosted paths place responsibility differently"
      caption="Both paths begin behind the same application server. Hosted inference transfers more infrastructure operation to a provider; self-hosting gives the team more infrastructure control and responsibility."
      description="An application server branches to a hosted path through a provider API and provider-managed inference, and a self-hosted path through the organization's inference service, model runtime, and compute infrastructure. Side panels compare infrastructure control, scaling responsibility, privacy and data location, customization, maintenance, cost structure, and version control without claiming that either path is always safer or cheaper."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 590">
          <defs><ArrowMarker id={arrow} /><ArrowMarker id={`${arrow}-sky`} color="#0284c7" /><ArrowMarker id={`${arrow}-violet`} color="#7c3aed" /></defs>
          <DiagramNode x={365} y={24} width={270} height={70} title="Application server" detail="stable internal request contract" tone="sky" />
          <path d="M500 94 V130 H250 V165 M500 130 H750 V165" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <path d="M242 155 l8 10 l8 -10 z M742 155 l8 10 l8 -10 z" fill="#64748b" />
          <Boundary x={25} y={165} width={450} height={330} label="HOSTED PATH" tone="sky" />
          <DiagramNode x={70} y={215} width={155} height={70} title="Provider API" detail="external service boundary" tone="sky" />
          <DiagramNode x={275} y={215} width={155} height={70} title="Managed inference" detail="provider operates serving" tone="sky" />
          <Connector d="M225 250 H265" markerId={`${arrow}-sky`} tone="sky" />
          <text x="250" y="330" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0c4a6e">PROVIDER MANAGES MORE INFRASTRUCTURE</text>
          <text x="70" y="370" fontSize="11.5" fill="#334155">• provider capacity + runtime</text><text x="70" y="398" fontSize="11.5" fill="#334155">• service options bound customization</text><text x="70" y="426" fontSize="11.5" fill="#334155">• data flow depends on region + terms</text><text x="70" y="454" fontSize="11.5" fill="#334155">• usage / reserved-capacity cost structure</text>
          <Boundary x={525} y={165} width={450} height={330} label="SELF-HOSTED PATH" tone="violet" />
          <DiagramNode x={555} y={210} width={150} height={80} title="Inference service" detail="team-operated API" tone="violet" />
          <DiagramNode x={750} y={210} width={100} height={80} title="Runtime" detail="model + engine" tone="violet" />
          <DiagramNode x={875} y={210} width={80} height={80} title="Compute" detail="hosts + GPU" tone="violet" />
          <Connector d="M705 250 H740" markerId={`${arrow}-violet`} tone="violet" />
          <Connector d="M850 250 H865" markerId={`${arrow}-violet`} tone="violet" />
          <text x="750" y="330" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">TEAM MANAGES MORE INFRASTRUCTURE</text>
          <text x="570" y="370" fontSize="11.5" fill="#334155">• team controls placement + stack</text><text x="570" y="398" fontSize="11.5" fill="#334155">• team owns scaling + maintenance</text><text x="570" y="426" fontSize="11.5" fill="#334155">• customization depends on licence + format</text><text x="570" y="454" fontSize="11.5" fill="#334155">• hardware + idle + engineering cost structure</text>
          <Label x={500} y={535} color="#334155" size={12}>COMPARE THE ACTUAL REGION, WORKLOAD, CONTRACT, HARDWARE, AND TEAM</Label>
          <Label x={500} y={565} color="#881337" size={11.5}>HOSTED ≠ AUTOMATICALLY UNSAFE · SELF-HOSTED ≠ AUTOMATICALLY CHEAPER</Label>
        </DiagramCanvas>
      </div>
      <div className="space-y-3 lg:hidden">
        <div className="rounded-xl border-2 border-indigo-500 bg-indigo-50 p-3 text-center"><p className="font-extrabold text-indigo-950">Application server</p><p className="text-xs text-slate-600">stable internal contract</p></div>
        <p className="text-center text-xs font-extrabold text-slate-500">BRANCHES TO</p>
        <div className="rounded-xl border-2 border-sky-500 bg-sky-50 p-4"><p className="text-center font-extrabold text-sky-950">HOSTED PATH</p><p className="mt-2 text-center text-sm font-bold">Provider API → managed inference</p><p className="mt-3 text-xs leading-6 text-slate-700">Provider manages more serving infrastructure.<br />Team still manages integration, policy, measurements, and contract choices.<br />Data location depends on provider region and terms.</p></div>
        <div className="rounded-xl border-2 border-violet-500 bg-violet-50 p-4"><p className="text-center font-extrabold text-violet-950">SELF-HOSTED PATH</p><p className="mt-2 text-center text-sm font-bold">Inference service → runtime → compute</p><p className="mt-3 text-xs leading-6 text-slate-700">Team controls and manages more infrastructure.<br />Team owns capacity, maintenance, security, and rollout.<br />Customization depends on licence and model format.</p></div>
        <div className="rounded-xl border border-rose-400 bg-rose-50 p-3 text-center text-xs font-bold text-rose-900">Hosted ≠ automatically unsafe · self-hosted ≠ automatically cheaper</div>
      </div>
      <Legend items={[{ tone: "sky", label: "provider-managed path / shared boundary" }, { tone: "violet", label: "team-managed path" }]} />
    </GenAIFigure>
  );
}

export function ProductionReliabilityDiagram() {
  const arrow = "production-reliability-arrow";
  return (
    <GenAIFigure
      title="Figure 2 — Reliability controls surround the production request path"
      caption="Keep the central request readable, then place traffic, call, performance, observability, and rollout mechanisms where they act. The concurrency equation is a planning estimate, not an autoscaling guarantee."
      description="A central production path moves from client to application server, validation and context, provider abstraction, model inference, and response. Before and around requests are authentication, secrets, rate limiting, and concurrency controls. Call reliability contains timeout, bounded retry, idempotency when supported, and fallback. Performance contains streaming, appropriate batching, and safe caching. Observability includes error rate, p50 and p95 latency, throughput, cost per successful task, and quality or safety regression. Deployment includes canary or shadow traffic, rollback, and version rollout. A small planning inset calculates two requests per second times three seconds as approximately six in-flight requests on average."
    >
      <div className="hidden lg:block">
        <DiagramCanvas viewBox="0 0 1000 690">
          <defs><ArrowMarker id={arrow} /></defs>
          <Boundary x={18} y={205} width={964} height={185} label="CENTRAL PRODUCTION REQUEST" tone="sky" />
          {[
            [35, 260, 120, "Client", "authenticated", "sky"],
            [190, 250, 140, "Application server", "request ID", "sky"],
            [365, 250, 140, "Validation / context", "approved input", "violet"],
            [540, 250, 140, "Provider adapter", "stable interface", "amber"],
            [715, 250, 115, "Inference", "hosted / self", "rose"],
            [865, 260, 100, "Response", "result", "emerald"],
          ].map(([x,y,w,title,detail,tone]) => <g key={String(title)}><DiagramNode x={Number(x)} y={Number(y)} width={Number(w)} height={70} title={String(title)} detail={String(detail)} tone={tone as "sky" | "violet" | "amber" | "rose" | "emerald"} /></g>)}
          {[155,330,505,680,830].map((x, index) => <g key={x}><Connector d={`M${x} 295 H${[180,355,530,705,855][index]}`} markerId={arrow} tone="slate" /></g>)}
          <Boundary x={18} y={42} width={300} height={125} label="BEFORE / AROUND REQUEST" tone="sky" />
          <text x="168" y="89" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0c4a6e">AUTH + SERVER-HELD SECRETS</text><text x="168" y="119" textAnchor="middle" fontSize="12" fill="#334155">rate limiting · concurrency limits</text><Connector d="M168 167 V195" markerId={arrow} tone="sky" />
          <Boundary x={350} y={42} width={300} height={125} label="CALL RELIABILITY" tone="amber" />
          <text x="500" y="89" textAnchor="middle" fontSize="12" fontWeight="800" fill="#78350f">TIMEOUT · BOUNDED RETRY</text><text x="500" y="119" textAnchor="middle" fontSize="12" fill="#334155">idempotency when relevant · fallback</text><Connector d="M500 167 V195" markerId={arrow} tone="amber" />
          <Boundary x={682} y={42} width={300} height={125} label="PERFORMANCE OPTIONS" tone="violet" />
          <text x="832" y="89" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">STREAMING · BATCHING</text><text x="832" y="119" textAnchor="middle" fontSize="12" fill="#334155">cache only when permissions + freshness allow</text><Connector d="M832 167 V195" markerId={arrow} tone="violet" />
          <Boundary x={18} y={445} width={465} height={155} label="OBSERVABILITY" tone="emerald" />
          <text x="250" y="492" textAnchor="middle" fontSize="12" fontWeight="800" fill="#064e3b">REQUEST / ERROR RATE · p50 / p95 LATENCY · THROUGHPUT</text><text x="250" y="522" textAnchor="middle" fontSize="12" fill="#334155">cost per successful task · quality / safety regression</text><text x="250" y="555" textAnchor="middle" fontSize="11" fill="#475569">break down by provider, model version, workload, and failure type</text>
          <Boundary x={517} y={445} width={465} height={155} label="DEPLOYMENT / RECOVERY" tone="rose" />
          <text x="750" y="492" textAnchor="middle" fontSize="12" fontWeight="800" fill="#881337">CANARY / SHADOW · STOP CONDITIONS</text><text x="750" y="522" textAnchor="middle" fontSize="12" fill="#334155">versioned model + prompt + policy · tested rollback</text><text x="750" y="555" textAnchor="middle" fontSize="11" fill="#475569">compare quality, safety, latency, errors, and cost before expansion</text>
          <rect x="300" y="625" width="400" height="48" rx="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <Label x={500} y={646} color="#78350f" size={12}>PLANNING ESTIMATE · 2 requests/s × 3 s ≈ 6 in flight</Label>
          <text x="500" y="665" textAnchor="middle" fontSize="10.5" fill="#78350f">average estimate · not an autoscaling guarantee</text>
        </DiagramCanvas>
      </div>
      <div className="mx-auto max-w-[420px] space-y-3 lg:hidden">
        <div className="rounded-xl border-2 border-sky-500 bg-sky-50 p-3 text-center"><p className="text-xs font-extrabold text-sky-950">BEFORE REQUEST</p><p className="mt-1 text-sm text-slate-700">auth · secrets · rate limit · concurrency</p></div>
        <div className="space-y-2 rounded-xl border-2 border-indigo-500 bg-indigo-50 p-3">
          <p className="text-center text-xs font-extrabold text-indigo-950">CENTRAL REQUEST PATH</p>
          {[
            ["Client", "authenticated request"], ["Application server", "request ID + policy"], ["Validation / context", "approved input + evidence"], ["Provider abstraction", "stable interface + version"], ["Model inference", "hosted or self-hosted"], ["Response", "result or fallback"],
          ].map(([title, detail], index) => <div key={title}><div className="rounded-lg border border-slate-300 bg-white p-2 text-center"><p className="text-sm font-bold text-slate-900">{title}</p><p className="text-xs text-slate-600">{detail}</p></div>{index < 5 && <p className="text-center text-lg text-slate-500" aria-hidden="true">↓</p>}</div>)}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3"><p className="text-xs font-extrabold text-amber-950">CALL RELIABILITY</p><p className="mt-1 text-xs leading-5 text-slate-700">timeout · bounded retry · idempotency · fallback</p></div>
          <div className="rounded-xl border-2 border-violet-500 bg-violet-50 p-3"><p className="text-xs font-extrabold text-violet-950">PERFORMANCE</p><p className="mt-1 text-xs leading-5 text-slate-700">stream · batch when useful · cache when safe</p></div>
          <div className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3"><p className="text-xs font-extrabold text-emerald-950">OBSERVABILITY</p><p className="mt-1 text-xs leading-5 text-slate-700">errors · p50/p95 · throughput · cost · regressions</p></div>
          <div className="rounded-xl border-2 border-rose-500 bg-rose-50 p-3"><p className="text-xs font-extrabold text-rose-950">DEPLOYMENT</p><p className="mt-1 text-xs leading-5 text-slate-700">canary/shadow · stop rules · rollback · versions</p></div>
        </div>
        <div className="rounded-xl border-2 border-amber-500 bg-amber-50 p-3 text-center"><p className="text-sm font-extrabold text-amber-950">Planning estimate</p><p className="mt-1 font-mono text-sm font-bold">2 requests/s × 3 s ≈ 6 in flight</p><p className="mt-1 text-xs text-slate-600">average estimate · not autoscaling guarantee</p></div>
      </div>
      <Legend items={[{ tone: "sky", label: "central request / traffic controls" }, { tone: "amber", label: "call reliability" }, { tone: "emerald", label: "observability" }, { tone: "rose", label: "deployment and recovery" }]} />
    </GenAIFigure>
  );
}
