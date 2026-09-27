import { useId, type ReactNode } from 'react';
import { FigureShell } from '../content/FigureShell';
import { LLMVisualFigure } from './LLMDiagrams';

const ink = '#334155';
const purple = '#6d28d9';
const green = '#047857';
const red = '#be123c';

function Graphic({ label, height = 250, children }: { label: string; height?: number; children: ReactNode }) {
  return <svg viewBox={`0 0 340 ${height}`} role="img" aria-label={label} className="mx-auto w-full max-w-md" style={{ fontFamily: 'inherit', fontSize: 14, fill: ink }}>{children}</svg>;
}

function Arrow({ x1, y1, x2, y2, color = purple }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const id = `llm-arrow-${useId().replace(/:/g, '')}`;
  return <g><defs><marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill={color} /></marker></defs><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" markerEnd={`url(#${id})`} /></g>;
}

function Bars({ title, unit, max, rows }: { title: string; unit: string; max: number; rows: Array<[string, number, string?]> }) {
  return <div className="space-y-3 text-sm text-slate-700">
    <p className="font-bold text-slate-900">{title}</p>
    {rows.map(([label, value, color]) => <div key={label}>
      <div className="mb-1 flex flex-wrap justify-between gap-x-3"><span>{label}</span><strong>{value}{unit}</strong></div>
      <div className="h-5 border-l border-slate-400 bg-slate-100" aria-hidden="true"><div className="h-full" style={{ width: `${value / max * 100}%`, background: color || purple }} /></div>
    </div>)}
    <div className="flex justify-between text-xs text-slate-500"><span>0{unit}</span><span>Scale maximum: {max}{unit}</span></div>
  </div>;
}

function TokenMerges() {
  const stages = [['l', 'o', 'w', 'e', 'r'], ['lo', 'w', 'e', 'r'], ['low', 'e', 'r']];
  return <FigureShell title="Two learned merges shorten lower from five pieces to three" caption="The corpus supplies six observations of each selected pair. New pieces are highlighted; e and r remain separate. These are teaching merges, not a real model's tokenizer.">
    <div className="space-y-2">
      {stages.map((pieces, step) => <div key={step}>
        {step > 0 && <p className="py-2 text-center font-semibold text-violet-800">↓ {step === 1 ? 'Merge l + o → lo' : 'Merge lo + w → low'}</p>}
        <div className="flex flex-wrap items-center justify-center gap-2" aria-label={`Stage ${step}: ${pieces.join(', ')}`}>
          {pieces.map((piece, i) => <span key={i} className={`min-w-10 border-2 px-3 py-3 text-center font-mono text-lg font-bold ${i === 0 && step > 0 ? 'border-violet-500 bg-violet-50 text-violet-900' : 'border-slate-300 bg-white text-slate-800'}`}>{piece}</span>)}
        </div>
      </div>)}
    </div>
  </FigureShell>;
}

function AttentionMask() {
  return <FigureShell title="A decoder can mix earlier values, but cannot look ahead" caption="Rows are querying positions; columns are positions supplying keys/values. A purple cell is allowed, while × blocks a future position. The numerical lookup below uses two allowed positions." accessibleDescription="A three by three lower triangular causal mask. Row one sees token one; row two sees tokens one and two; row three sees all three. Q=[2,1], K1=[1,0], K2=[0,1] produce weights 0.670 and 0.330; V1=[1,0], V2=[0,2] mix to [0.670,0.660].">
    <Graphic label="Causal attention visibility matrix" height={258}>
      <text x="218" y="20" textAnchor="middle">Key / value position</text>
      {[0,1,2].map(c=><text key={c} x={141+c*62} y="46" textAnchor="middle">t{c+1}</text>)}
      {[0,1,2].map(r=><g key={r}><text x="95" y={88+r*62} textAnchor="end">query t{r+1}</text>{[0,1,2].map(c=><g key={c}><rect x={113+c*62} y={58+r*62} width="56" height="56" rx="4" fill={c<=r?'#ede9fe':'#f1f5f9'} stroke={c<=r?'#8b5cf6':'#cbd5e1'}/><text x={141+c*62} y={92+r*62} textAnchor="middle" fontSize="21" fill={c<=r?purple:'#64748b'}>{c<=r?'1':'×'}</text></g>)}</g>)}
    </Graphic>
    <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-center text-sm leading-7 text-slate-800">
      <p>Q·K / √2 → <strong>[1.414, 0.707]</strong></p><p>↓ softmax</p><p><strong>0.670 × [1,0] + 0.330 × [0,2]</strong></p><p>↓ add weighted coordinates</p><p className="font-mono font-bold text-emerald-800">Output ≈ [0.670, 0.660]</p>
    </div>
  </FigureShell>;
}

function TrainingCurve() {
  const points: Array<[number, number]> = [[0,1.099],[1,.965],[4,.767],[8,.683]];
  return <FigureShell title="Measured loss falls across the eight updates in the Python example" caption="These four plotted observations come from the exact program below. Lines connect sampled steps as a visual guide. This is training loss on the tiny dataset, not validation performance." accessibleDescription="Cross-entropy loss in nats versus update step: step 0 is 1.099, step 1 is 0.965, step 4 is 0.767, step 8 is 0.683.">
    <Graphic label="Training loss against gradient update step" height={265}>
      {[0,.4,.8,1.2].map(y=><g key={y}><line x1="55" x2="310" y1={210-y*140} y2={210-y*140} stroke="#e2e8f0"/><text x="46" y={215-y*140} textAnchor="end">{y.toFixed(1)}</text></g>)}
      <path d="M55 30 V210 H312" stroke={ink} fill="none"/>
      <polyline points={points.map(([x,y])=>`${60+x*30},${210-y*140}`).join(' ')} stroke={purple} strokeWidth="3" fill="none"/>
      {points.map(([x,y])=><g key={x}><circle cx={60+x*30} cy={210-y*140} r="5" fill={purple}/><text x={x===0?65:60+x*30} y={193-y*140} textAnchor={x===0?'start':'middle'} fontSize="13">{y.toFixed(3)}</text><text x={60+x*30} y="230" textAnchor="middle">{x}</text></g>)}
      <text x="187" y="258" textAnchor="middle">Update step</text><text x="17" y="127" transform="rotate(-90 17 127)" textAnchor="middle">Loss (nats)</text>
    </Graphic>
  </FigureShell>;
}

function AdapterPath() {
  return <FigureShell title="Both paths produce two coordinates before they are added" caption="The base path is fixed. The adapter values are supplied for this forward-pass example; in real LoRA training, A and B are learned. The scale α/r is 2." accessibleDescription="Input [2,1,3] splits to frozen W giving [2,1] and adapter A giving [-0.1], B giving [-0.02,-0.04], scale two giving [-0.04,-0.08]. The two outputs sum to [1.96,0.92].">
    <Graphic label="A frozen matrix and a low-rank adapter join at addition" height={435}>
      <rect x="98" y="4" width="144" height="50" rx="8" fill="#f1f5f9" stroke="#64748b"/><text x="170" y="35" textAnchor="middle">x = [2,1,3]</text>
      <Arrow x1={135} y1={54} x2={80} y2={98}/><Arrow x1={205} y1={54} x2={258} y2={98}/>
      <rect x="10" y="102" width="140" height="150" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="2"/>
      <text x="80" y="129" textAnchor="middle" fontWeight="bold">Frozen W</text><text x="80" y="155" textAnchor="middle">2 × 3 matrix</text><text x="80" y="192" textAnchor="middle">Wx</text><text x="80" y="222" textAnchor="middle" fontWeight="bold">[2, 1]</text>
      <rect x="184" y="102" width="146" height="194" rx="8" fill="#ede9fe" stroke={purple} strokeWidth="2"/>
      <text x="257" y="129" textAnchor="middle" fontWeight="bold">Adapter path</text><text x="257" y="156" textAnchor="middle">A (1×3) → −0.1</text><text x="257" y="184" textAnchor="middle">↓ B (2×1)</text><text x="257" y="212" textAnchor="middle">[−0.02,−0.04]</text><text x="257" y="239" textAnchor="middle">↓ scale ×2</text><text x="257" y="274" textAnchor="middle" fontWeight="bold">[−0.04,−0.08]</text>
      <Arrow x1={80} y1={252} x2={153} y2={337}/><Arrow x1={257} y1={296} x2={188} y2={337}/>
      <circle cx="170" cy="352" r="21" fill="#d1fae5" stroke={green} strokeWidth="2"/><text x="170" y="359" textAnchor="middle" fontSize="25">+</text>
      <Arrow x1={170} y1={374} x2={170} y2={395} color={green}/><text x="170" y="425" textAnchor="middle" fontWeight="bold">y = [1.96, 0.92]</text>
    </Graphic>
  </FigureShell>;
}

function VectorGeometry() {
  const origin={x:142,y:207};
  return <FigureShell title="Cosine compares directions, not arrow lengths" caption="B lies on the same ray as q, so their cosine is 1. A forms a 45° angle with q, giving about 0.707; C is perpendicular, giving 0. Coordinates are invented for the lesson." accessibleDescription="Two dimensional vector plot from the origin: query [1,1], A [1,0], B [2,2], C [-1,1]. B has the highest cosine despite being longer than the query.">
    <Graphic label="Query and passage vectors on two coordinate axes" height={285}>
      <line x1="35" x2="318" y1="207" y2="207" stroke="#94a3b8"/><line x1="142" x2="142" y1="30" y2="247" stroke="#94a3b8"/>
      {[-1,0,1,2].map(x=><text key={x} x={142+x*68} y="231" textAnchor="middle">{x}</text>)}
      {[1,2].map(y=><g key={y}><line x1="35" x2="318" y1={207-y*68} y2={207-y*68} stroke="#e2e8f0"/><text x="132" y={212-y*68} textAnchor="end">{y}</text></g>)}
      <Arrow x1={origin.x} y1={origin.y} x2={278} y2={71} color={green}/><Arrow x1={origin.x} y1={origin.y} x2={210} y2={139}/><Arrow x1={origin.x} y1={origin.y} x2={210} y2={207} color="#0284c7"/><Arrow x1={origin.x} y1={origin.y} x2={74} y2={139} color={red}/>
      <text x="282" y="55" textAnchor="middle" fill={green}>B [2,2]</text><text x="222" y="144" fill={purple}>q [1,1]</text><text x="221" y="198" fill="#0284c7">A [1,0]</text><text x="72" y="120" textAnchor="middle" fill={red}>C [−1,1]</text>
      <text x="207" y="270" textAnchor="middle">Coordinate 1</text><text x="15" y="132" transform="rotate(-90 15 132)" textAnchor="middle">Coordinate 2</text>
    </Graphic>
  </FigureShell>;
}

function RankedEvidence() {
  const before=['B','A','C','D'], after=['A','D','B','C'];
  return <FigureShell title="Reranking moves both relevant passages above the cutoff" caption="A and D are labelled relevant. Only the first two positions reach the generator in this example. Lines track document identities, not numerical scores.">
    <Graphic label="Rank changes from B,A,C,D to A,D,B,C with a top-two cutoff" height={350}>
      <text x="61" y="26" textAnchor="middle" fontWeight="bold">Fused</text><text x="279" y="26" textAnchor="middle" fontWeight="bold">Reranked</text>
      {before.map((id,i)=><g key={id}><Arrow x1={96} y1={66+i*57} x2={244} y2={66+after.indexOf(id)*57} color={id==='A'||id==='D'?green:'#94a3b8'}/></g>)}
      {[before,after].map((ranking,column)=>ranking.map((id,i)=><g key={`${column}-${id}`}><rect x={column===0?22:247} y={47+i*57} width="70" height="38" rx="5" fill={id==='A'||id==='D'?'#d1fae5':'#f1f5f9'} stroke={id==='A'||id==='D'?green:'#94a3b8'}/><text x={column===0?57:282} y={72+i*57} textAnchor="middle" fontWeight="bold">{i+1}. {id}</text></g>))}
      <line x1="5" x2="335" y1="152" y2="152" stroke={red} strokeWidth="2" strokeDasharray="5 4"/>
      <text x="170" y="280" textAnchor="middle" fill={red}>Dashed line = top-2 cutoff</text>
      <text x="170" y="309" textAnchor="middle" fill={green}>Green = relevant passages A and D</text><text x="170" y="338" textAnchor="middle" fontWeight="bold">Recall@2: 0.50 → 1.00</text>
    </Graphic>
  </FigureShell>;
}

function VerifiedAttempts() {
  return <FigureShell title="Verification stops the search after the second candidate" caption="The budget permits three checks, but the verified answer is found after two. The unused candidate is not executed or counted. Proposals are supplied values, not a model's hidden reasoning.">
    <Graphic label="Candidate x equals two fails, x equals three passes, x equals four is not checked" height={335}>
      <text x="170" y="25" textAnchor="middle" fontWeight="bold">Constraint: 3x + 2 = 11</text>
      {[['x = 2','3×2+2 = 8','FAIL',red],['x = 3','3×3+2 = 11','PASS',green],['x = 4','not needed','SKIP','#64748b']].map(([candidate,calculation,status,color],i)=><g key={candidate} opacity={i===2?.55:1}>
        <rect x="8" y={50+i*83} width="105" height="52" rx="5" fill="#f8fafc" stroke={color}/><text x="60" y={82+i*83} textAnchor="middle" fontWeight="bold">{candidate}</text>
        <Arrow x1={115} y1={76+i*83} x2={144} y2={76+i*83} color={color}/><text x="154" y={73+i*83}>{calculation}</text><text x="154" y={95+i*83} fill={color} fontWeight="bold">{status}</text>
      </g>)}
      <text x="170" y="322" textAnchor="middle" fontWeight="bold">Stop: x = 3 · 1 check remains</text>
    </Graphic>
  </FigureShell>;
}

function TokenTimeline() {
  return <FigureShell title="First-token delay and later token intervals are different measurements" caption="Invented timestamps from the Python example. The first token arrives at 0.35 s; the next three arrive 0.05 s apart. The lower chart shows raw KV memory, not total GPU usage.">
    <Graphic label="Four token arrival times at 0.35, 0.40, 0.45 and 0.50 seconds" height={215}>
      <rect x="28" y="60" width="185.5" height="26" fill="#ede9fe"/><text x="121" y="48" textAnchor="middle" fill={purple}>TTFT = 0.35 s</text>
      <line x1="28" x2="307" y1="105" y2="105" stroke={ink}/>
      {[0,.35,.4,.45,.5].map((v,i)=><g key={v}><line x1={28+v*530} x2={28+v*530} y1="99" y2="113" stroke={ink}/>{i>0&&<circle cx={28+v*530} cy="105" r="4" fill={green}/>}<text x={28+v*530} y={i%2===0?152:132} textAnchor="middle" fontSize="12">{v.toFixed(2)}</text></g>)}
      <text x="170" y="179" textAnchor="middle">Seconds since request start</text><text x="170" y="207" textAnchor="middle" fill={green}>After first token: 0.05 s per interval</text>
    </Graphic>
    <Bars title="Raw KV memory: doubling sequence length doubles storage" unit=" KiB" max={64} rows={[["128 cached tokens",32,purple],["256 cached tokens",64,green]]}/>
  </FigureShell>;
}

function EvidenceSelection() {
  return <FigureShell title="Only current, scoped evidence can support this answer" caption="The program first filters scope and freshness, then counts shared words. The cutoff of two matches is only a teaching rule. A real RAG system needs evaluated retrieval and claim checking; this program returns an evidence quote, not a generated answer." accessibleDescription="The query carry unused leave is filtered to current India sources. CH-17 and CH-42 remain; CH-08 is excluded for region and CH-03 for age. Word overlap is three for CH-17 and zero for CH-42. CH-17 supplies the five-day quote; no score of at least two means insufficient evidence.">
    <Graphic label="Evidence selection with separate rejection and insufficient-evidence branches" height={505}>
      <rect x="50" y="5" width="240" height="45" rx="6" fill="#f1f5f9" stroke="#64748b"/><text x="170" y="33" textAnchor="middle" fontWeight="bold">“carry unused leave”</text>
      <Arrow x1={170} y1={50} x2={170} y2={86}/>
      <rect x="30" y="90" width="280" height="60" rx="6" fill="#ede9fe" stroke={purple}/><text x="170" y="115" textAnchor="middle" fontWeight="bold">Trusted scope + current version</text><text x="170" y="137" textAnchor="middle">India employee · current = True</text>
      <Arrow x1={110} y1={150} x2={82} y2={190} color={green}/><Arrow x1={230} y1={150} x2={260} y2={190} color={red}/>
      <rect x="5" y="195" width="155" height="100" rx="6" fill="#d1fae5" stroke={green}/><text x="82" y="219" textAnchor="middle" fontWeight="bold">Eligible to rank</text><text x="82" y="248" textAnchor="middle">CH-17: leave</text><text x="82" y="275" textAnchor="middle">CH-42: meals</text>
      <rect x="185" y="195" width="150" height="100" rx="6" fill="#fff1f2" stroke={red}/><text x="260" y="219" textAnchor="middle" fontWeight="bold">Excluded</text><text x="260" y="248" textAnchor="middle">CH-08: UK</text><text x="260" y="275" textAnchor="middle">CH-03: old</text>
      <Arrow x1={82} y1={295} x2={82} y2={325} color={green}/>
      <rect x="5" y="330" width="155" height="65" rx="6" fill="#f8fafc" stroke="#64748b"/><text x="82" y="352" textAnchor="middle" fontWeight="bold">Word overlap</text><text x="82" y="378" textAnchor="middle">CH-17: 3 · CH-42: 0</text>
      <Arrow x1={162} y1={363} x2={181} y2={363} color={red}/>
      <rect x="185" y="330" width="150" height="65" rx="6" fill="#fff1f2" stroke={red}/><text x="260" y="349" textAnchor="middle" fontSize="13">If no score ≥ 2:</text><text x="260" y="368" textAnchor="middle" fontSize="13">insufficient</text><text x="260" y="386" textAnchor="middle" fontSize="13">evidence</text>
      <Arrow x1={82} y1={395} x2={82} y2={428} color={green}/><text x="94" y="418" fill={green} fontSize="13">score 3 → select</text>
      <rect x="5" y="432" width="330" height="60" rx="6" fill="#d1fae5" stroke={green}/>
      <text x="170" y="457" textAnchor="middle" fontWeight="bold">Quote + source stay together</text><text x="170" y="481" textAnchor="middle">Up to 5 unused leave days [CH-17]</text>
    </Graphic>
  </FigureShell>;
}

function ProposalChecks() {
  return <FigureShell title="Three valid JSON objects do not mean three permitted refunds" caption="Each proposal is checked by trusted code. Only proposal 1 reaches eligibility for approval; this program does not execute a refund. The model cannot supply its own authenticated identity." accessibleDescription="Proposal one has order A17 and integer amount 1000 and passes. Proposal two has a string amount and fails types. Proposal three has order B22 belonging to user-9 and fails authorization for user-7.">
    <Graphic label="Three refund proposals branch into eligible and rejected results" height={350}>
      <text x="170" y="25" textAnchor="middle" fontWeight="bold">Authenticated caller: user-7</text>
      {[
        ['1 · A17, 1000','integer · owns A17','ELIGIBLE','not executed',green],
        ['2 · A17, “1000”','amount is a string','REJECT','wrong type',red],
        ['3 · B22, 1000','belongs to user-9','REJECT','not authorized',red],
      ].map(([proposal,detail,result,reason,color],i)=><g key={proposal}>
        <rect x="5" y={52+i*88} width="180" height="62" rx="5" fill="#f8fafc" stroke="#94a3b8"/><text x="95" y={77+i*88} textAnchor="middle" fontWeight="bold">{proposal}</text><text x="95" y={99+i*88} textAnchor="middle" fontSize="13">{detail}</text>
        <Arrow x1={188} y1={82+i*88} x2={214} y2={82+i*88} color={color}/><text x="225" y={77+i*88} fill={color} fontWeight="bold">{result}</text><text x="225" y={99+i*88} fill={color} fontSize="12">{reason}</text>
      </g>)}
      <text x="170" y="328" textAnchor="middle">Parse → types → owner → balance</text>
    </Graphic>
  </FigureShell>;
}

export function LLMTutorialDiagram({ topicId }: { topicId: string }) {
  switch(topicId) {
    case 'llm-intro': return <FigureShell title="Counts become probabilities, then a continuation is selected" caption="Three observed transitions after send: receipt twice, details once. The bars reflect the exact frequency calculation; they do not measure truth or usefulness."><Bars title="P(next token | send)" unit="%" max={100} rows={[["receipt — 2 of 3 observations",66.7,purple],["details — 1 of 3 observations",33.3,green]]}/><p className="mt-5 text-center font-mono text-sm text-slate-800">send → receipt → &lt;end&gt;</p></FigureShell>;
    case 'tokenization-embeddings': return <TokenMerges/>;
    case 'transformers-attention': return <AttentionMask/>;
    case 'text-generation-decoding': return <FigureShell title="The same logits produce flatter probabilities at higher temperature" caption="Calculated from logits [2,1,0]. Both charts use the same 0–100% scale. At T=1 and top-p=0.80, sunny plus cold are retained, then renormalized to 73.1% and 26.9%."><div className="@container/llm-bars"><div className="grid gap-7 @min-[500px]/llm-bars:grid-cols-2"><Bars title="Temperature 1" unit="%" max={100} rows={[["sunny",66.5],["cold",24.5],["changing",9.0]]}/><Bars title="Temperature 2" unit="%" max={100} rows={[["sunny",50.6,green],["cold",30.7,green],["changing",18.6,green]]}/></div></div></FigureShell>;
    case 'prompt-engineering': return <ProposalChecks/>;
    case 'pretraining-finetuning': return <TrainingCurve/>;
    case 'instruction-tuning-rlhf': return <AdapterPath/>;
    case 'rag': return <EvidenceSelection/>;
    case 'semantic-search-embeddings': return <VectorGeometry/>;
    case 'vector-databases': return <FigureShell title="A perfect vector match is still excluded when its tenant is wrong" caption="For authenticated tenant A, filtering excludes B1 before scoring. After deletion of A1, A2 is the only remaining result. Retrieval must not escape the authorized set to fill a result count."><div className="space-y-3 text-sm"><div className="border-2 border-emerald-600 p-4"><p className="mb-3 font-bold text-emerald-900">Eligible boundary: tenant A · version e1</p><Bars title="Cosine to query [1,0]" unit="" max={1} rows={[["A1 · return policy",1,green],["A2 · delivery policy",0,green]]}/></div><div className="border-2 border-dashed border-rose-600 p-4 text-rose-900"><strong>× B1 · tenant B · cosine would be 1.0</strong><p className="mt-1">Not eligible: never returned to tenant A.</p></div><p className="text-center font-semibold">Delete A1 → result list contains only A2</p></div></FigureShell>;
    case 'advanced-rag': return <RankedEvidence/>;
    case 'llm-evaluation': return <FigureShell title="A higher accuracy does not erase a failed latency gate" caption="The fixtures contain eight cases per candidate. A fails the p95≤1.5 s gate; B passes the illustrative gates. Accuracy and latency use separate scales and units."><div className="space-y-7"><Bars title="Accuracy — minimum 75%" unit="%" max={100} rows={[["A",87.5],["B",75,green]]}/><Bars title="p95 latency — maximum allowed 1.5 s" unit=" s" max={3} rows={[["A · FAIL",2.4,red],["B · PASS",1.2,green]]}/></div></FigureShell>;
    case 'llm-hallucinations-safety': return <LLMVisualFigure id="claim-evidence-decision-map"/>;
    case 'reasoning-models': return <VerifiedAttempts/>;
    case 'efficient-llm-serving': return <TokenTimeline/>;
    case 'llmops': return <LLMVisualFigure id="canary-release-rollback"/>;
    default: return null;
  }
}
