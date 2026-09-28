import { useId, type ReactNode } from 'react';
import { FigureShell } from '../content/FigureShell';

const ink = '#1e293b', purple = '#6d28d9', green = '#047857', red = '#be123c', blue = '#0369a1';

function Canvas({ title, height, children }: { title: string; height: number; children: ReactNode }) {
  const id = useId();
  return <svg data-agentic-lab-svg role="img" aria-labelledby={id} viewBox={`0 0 340 ${height}`} className="mx-auto block w-full max-w-[440px]" style={{ color: ink, fontFamily: 'system-ui, sans-serif', fontSize: 14 }}>
    <title id={id}>{title}</title><g fill={ink}>{children}</g>
  </svg>;
}

function Arrow({ x1, y1, x2, y2, color = ink, dashed = false }: { x1: number; y1: number; x2: number; y2: number; color?: string; dashed?: boolean }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const backX = x2 - 8 * Math.cos(angle), backY = y2 - 8 * Math.sin(angle);
  const sideX = 4 * Math.sin(angle), sideY = 4 * Math.cos(angle);
  return <g aria-hidden="true"><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeDasharray={dashed ? '5 4' : undefined}/><polygon points={`${x2},${y2} ${backX + sideX},${backY - sideY} ${backX - sideX},${backY + sideY}`} fill={color}/></g>;
}

function Node({ x, y, width = 140, label, detail, color = purple }: { x: number; y: number; width?: number; label: string; detail?: string; color?: string }) {
  return <g><rect x={x} y={y} width={width} height={detail ? 60 : 40} rx="7" fill="#f8fafc" stroke={color} strokeWidth="2"/><text x={x + width / 2} y={y + 25} textAnchor="middle" fontWeight="700" fill={color}>{label}</text>{detail && <text x={x + width / 2} y={y + 47} textAnchor="middle" fontSize="13">{detail}</text>}</g>;
}

function BoundedLoop() {
  return <Canvas height={350} title="Stale evidence triggers one more lookup; current evidence ends the task. Two stale results cause abstention.">
    <Node x={90} y={10} width={160} label="Delivery question"/>
    <Arrow x1={170} y1={52} x2={170} y2={88}/>
    <Node x={90} y={90} width={160} label="Inspect record" detail="Is it current?"/>
    <Arrow x1={90} y1={125} x2={35} y2={125} color={red}/><text x="16" y="105" fill={red}>No</text>
    <path d="M 35 125 L 35 210 L 170 210" fill="none" stroke={red} strokeWidth="2"/>
    <text x="47" y="184" fontSize="13">If budget remains:</text>
    <Arrow x1={170} y1={210} x2={170} y2={153} color={red}/><text x="185" y="194" fontSize="13">next source</text>
    <Arrow x1={250} y1={120} x2={304} y2={120} color={green}/><text x="278" y="102" fill={green}>Yes</text>
    <path d="M 304 120 L 304 252" fill="none" stroke={green} strokeWidth="2"/><Arrow x1={304} y1={252} x2={248} y2={252} color={green}/>
    <Node x={90} y={230} width={160} label="STOP: Friday" color={green}/>
    <text x="170" y="304" textAnchor="middle" fill={red}>Budget exhausted + no current record?</text>
    <text x="170" y="331" textAnchor="middle" fontWeight="700" fill={red}>STOP: abstain</text>
  </Canvas>;
}

function RefundRetry() {
  return <Canvas height={340} title="An authorized first refund stores R-001. An identical retry returns R-001; a changed payload is rejected. Only one write occurs.">
    <text x="170" y="22" textAnchor="middle" fontWeight="700">Key: refund-204 · amount: 4,800 cents</text>
    <Node x={8} y={52} width={144} label="Attempt 1" detail="authorized"/>
    <Node x={188} y={52} width={144} label="Ledger" detail="store R-001" color={green}/>
    <Arrow x1={154} y1={82} x2={186} y2={82}/>
    <Node x={8} y={158} width={144} label="Attempt 2" detail="same fingerprint"/>
    <Node x={188} y={158} width={144} label="Replay R-001" detail="no new write" color={green}/>
    <Arrow x1={154} y1={188} x2={186} y2={188} color={green}/>
    <Arrow x1={260} y1={114} x2={260} y2={155} color={green}/><text x="20" y="142" fontSize="13">Same key, same operation</text>
    <text x="15" y="257" fill={red}>Changed payload → conflict</text><text x="15" y="284" fill={red}>Wrong owner → denied</text>
    <text x="170" y="323" textAnchor="middle" fontWeight="700">2 accepted attempts · 1 financial write</text>
  </Canvas>;
}

function ContractPaths() {
  return <Canvas height={330} title="Validate the proposal before lookup. Invalid arguments are rejected; approved evidence leads to a sourced answer, while no document leads to abstention.">
    <Node x={82} y={12} width={176} label="Tool proposal"/>
    <Arrow x1={170} y1={54} x2={170} y2={82}/>
    <Node x={82} y={85} width={176} label="Validate contract"/>
    <Arrow x1={258} y1={105} x2={324} y2={105} color={red}/><text x="274" y="85" fill={red} fontSize="12">invalid</text>
    <path d="M 324 105 L 324 162" stroke={red} fill="none" strokeWidth="2"/><text x="330" y="184" textAnchor="end" fill={red} fontWeight="700">REJECT</text>
    <Arrow x1={170} y1={127} x2={170} y2={162} color={green}/>
    <Node x={82} y={165} width={176} label="Approved lookup"/>
    <Arrow x1={132} y1={207} x2={82} y2={252} color={green}/><Arrow x1={208} y1={207} x2={260} y2={252} color={red}/>
    <Node x={8} y={255} width={145} label="D1 found" detail="answer + source" color={green}/>
    <Node x={187} y={255} width={145} label="No document" detail="abstain" color={red}/>
  </Canvas>;
}

function ProgressChart() {
  const stages = [{label:'Before search',known:0,left:4},{label:'After catalog',known:1,left:3},{label:'After warranty',known:2,left:2}];
  return <Canvas height={325} title="Known required fields increase from zero to two while remaining tool actions fall from four to two; the run stops on verified success.">
    {stages.map((row,i)=><g key={row.label}>
      <text x="8" y={22+i*90} fontWeight="700">{row.label}</text>
      <text x="8" y={49+i*90} fontSize="13">Fields known</text>
      {[0,1].map(n=><rect key={n} x={128+n*43} y={33+i*90} width="36" height="21" fill={n<row.known?green:'#e2e8f0'}/>)}
      <text x="232" y={49+i*90}>{row.known} / 2</text>
      <text x="8" y={77+i*90} fontSize="13">Actions left</text>
      {[0,1,2,3].map(n=><rect key={n} x={128+n*28} y={62+i*90} width="22" height="16" fill={n<row.left?purple:'#e2e8f0'}/>)}
      <text x="260" y={76+i*90}>{row.left} / 4</text>
    </g>)}
    <text x="170" y="307" textAnchor="middle" fill={green} fontWeight="700">Both criteria pass → STOP with 2 left</text>
  </Canvas>;
}

function ContextBudget() {
  const colors=[ink,blue,purple,'#b45309',green], labels=['Instructions 3.5K','State 1.5K','Evidence','History','Output reserve 4K'];
  const rows=[{label:'Before: 30K',values:[3500,1500,15000,6000,4000]},{label:'New result: 34K — too much',values:[3500,1500,19000,6000,4000]},{label:'Compacted: 32K — fits',values:[3500,1500,19000,4000,4000]}];
  return <Canvas height={355} title="Stacked token budgets: 30,000 before a tool result, 34,000 after it, and 32,000 after reducing history by 2,000. Dashed line marks capacity.">
    {rows.map((row,i)=><g key={row.label}>
      <text x="8" y={23+i*70} fontWeight="700" fill={i===1?red:ink}>{row.label}</text>
      {row.values.map((v,j)=><rect key={j} x={8+row.values.slice(0,j).reduce((a,b)=>a+b,0)/110} y={35+i*70} width={v/110} height="22" fill={colors[j]}/>)}
    </g>)}
    <line x1={8+32000/110} y1="28" x2={8+32000/110} y2="204" stroke={red} strokeDasharray="4 3" strokeWidth="2"/>
    <text x="330" y="222" textAnchor="end" fill={red}>32K capacity ↑</text>
    {labels.map((label,i)=><g key={label}><rect x={i<3?8:185} y={242+(i<3?i:i-3)*30} width="12" height="12" fill={colors[i]}/><text x={i<3?28:205} y={253+(i<3?i:i-3)*30} fontSize="13">{label}</text></g>)}
    <text x="170" y="345" textAnchor="middle">History 6K → 4K; output reserve intact</text>
  </Canvas>;
}

function MemoryTimeline() {
  return <Canvas height={335} title="PDF version 1 is replaced by HTML version 2. An update based on stale version 1 is rejected. Expiry and deletion both prevent recall.">
    <text x="170" y="22" textAnchor="middle" fontWeight="700">Namespace U-17 · report_format</text>
    <Node x={8} y={55} width={142} label="v1: PDF" detail="superseded"/>
    <Arrow x1={152} y1={85} x2={186} y2={85}/><Node x={188} y={55} width={144} label="v2: HTML" detail="current" color={green}/>
    <Node x={8} y={175} width={142} label="Old writer" detail="expects v1" color={red}/>
    <Arrow x1={152} y1={205} x2={246} y2={119} color={red} dashed/>
    <text x="8" y="258" fill={red}>× version conflict</text>
    <Arrow x1={260} y1={117} x2={260} y2={249} color={green}/>
    <Node x={172} y={252} width={160} label="Recall → None" detail="expiry or forget" color={blue}/>
    <text x="8" y="282" fontSize="13">U-99 recall:</text><text x="8" y="307" fill={red} fontWeight="700">None (isolated)</text>
  </Canvas>;
}

function GuardedGraph() {
  return <Canvas height={400} title="START goes to VALIDATE, then WAIT_APPROVAL. The guarded approved edge reaches EXECUTE and END. Rejection can end without execution; there is no validation-to-execution shortcut.">
    <Node x={96} y={8} width={148} label="START"/><Arrow x1={170} y1={50} x2={170} y2={75}/>
    <Node x={96} y={78} width={148} label="VALIDATE"/><Arrow x1={170} y1={120} x2={170} y2={154}/>
    <Node x={80} y={158} width={180} label="WAIT_APPROVAL"/>
    <Arrow x1={170} y1={200} x2={170} y2={257} color={green}/><text x="179" y="231" fontSize="13" fill={green}>approved</text>
    <Node x={96} y={260} width={148} label="EXECUTE" color={green}/>
    <Arrow x1={170} y1={302} x2={170} y2={347}/>
    <Node x={96} y={350} width={148} label="END" color={blue}/>
    <path d="M 80 178 L 24 178 L 24 370" fill="none" stroke={red} strokeWidth="2"/>
    <Arrow x1={24} y1={370} x2={93} y2={370} color={red}/><text x="34" y="243" fill={red} fontSize="13">reject</text>
    <path d="M 245 98 L 315 98 L 315 280 L 278 280" fill="none" stroke={red} strokeDasharray="5 4" strokeWidth="2"/>
    <text x="278" y="310" textAnchor="middle" fill={red} fontWeight="700">× no edge</text>
  </Canvas>;
}

function CheckpointResume() {
  return <Canvas height={380} title="Worker 1 saves approval for 4,800 to SQLite and exits. Worker 2 restores it, rejects the expired approval for a changed 5,050 quote, and requires renewal.">
    <text x="80" y="22" textAnchor="middle" fontWeight="700">Worker 1</text><text x="260" y="22" textAnchor="middle" fontWeight="700">Worker 2</text>
    <Node x={8} y={42} width={145} label="Approve 4,800" detail="expires at 100"/>
    <Arrow x1={80} y1={104} x2={80} y2={137}/>
    <Node x={8} y={140} width={145} label="SQLite" detail="checkpoint saved" color={blue}/>
    <Arrow x1={155} y1={170} x2={184} y2={170} color={blue}/>
    <Node x={187} y={140} width={145} label="Restore" detail="time now = 110" color={blue}/>
    <text x="80" y="229" textAnchor="middle" fill={red}>worker exits</text>
    <Arrow x1={260} y1={202} x2={260} y2={246}/>
    <Node x={187} y={249} width={145} label="Quote 5,050" detail="old approval: NO" color={red}/>
    <text x="170" y="345" textAnchor="middle" fill={green} fontWeight="700">New approval + recheck → eligible</text>
    <text x="170" y="372" textAnchor="middle">Persistence ≠ permission</text>
    <line x1="170" y1="36" x2="170" y2="306" stroke="#94a3b8" strokeDasharray="3 4"/>
  </Canvas>;
}

function RagCoverage() {
  return <Canvas height={335} title="First search accepts D1 price 40 and rejects the obsolete 90-day rule. A targeted second search adds D2 refund 30 days, filling both required evidence fields.">
    <text x="12" y="24" fontWeight="700">Search 1: broad plan query</text>
    <text x="18" y="65">D1 · price $40</text><text x="230" y="65" fill={green} fontWeight="700">ACCEPT</text>
    <text x="18" y="105">OLD · refund 90 days</text><text x="230" y="105" fill={red} fontWeight="700">REJECT</text>
    <line x1="12" y1="120" x2="328" y2="120" stroke="#cbd5e1"/>
    <text x="18" y="151" fill={purple}>Coverage: price ✓ / refund ?</text>
    <Arrow x1={170} y1={165} x2={170} y2={207} color={purple}/>
    <text x="12" y="235" fontWeight="700">Search 2: refund policy</text>
    <text x="18" y="270">D2 · refund 30 days</text><text x="230" y="270" fill={green} fontWeight="700">ACCEPT</text>
    <text x="170" y="317" textAnchor="middle" fill={green} fontWeight="700">Coverage 2/2 → $40 [D1], 30 days [D2]</text>
  </Canvas>;
}

function WorkerJoin() {
  return <Canvas height={345} title="A manager delegates to two independent workers. A returns price 40 and B returns price 45 plus refunds. At the join, the price conflict remains unresolved.">
    <Node x={96} y={8} width={148} label="Coordinator"/>
    <Arrow x1={128} y1={50} x2={80} y2={97}/><Arrow x1={212} y1={50} x2={260} y2={97}/>
    <Node x={8} y={100} width={145} label="Worker A · 0.8 s" detail="$40 [P1]"/>
    <Node x={187} y={100} width={145} label="Worker B · 1.2 s" detail="$45 [P2]" color={blue}/>
    <Arrow x1={80} y1={162} x2={134} y2={220}/><Arrow x1={260} y1={162} x2={206} y2={220} color={blue}/>
    <Node x={66} y={223} width={208} label="Join · 0.2 s" detail="price conflict: preserve both" color={red}/>
    <text x="170" y="315" textAnchor="middle">Ideal parallel time = 1.2 + 0.2 = 1.4 s</text>
    <text x="170" y="340" textAnchor="middle" fill={red}>Do not finalize an unresolved price</text>
  </Canvas>;
}

function MCPSequence() {
  return <Canvas height={390} title="Client discovers a server tool. A call without read scope is denied before reaching billing. The authorized call reaches billing and returns invoice 320 dollars.">
    <text x="28" y="22" textAnchor="middle" fontWeight="700">Client</text><text x="158" y="22" textAnchor="middle" fontWeight="700">Server</text><text x="303" y="22" textAnchor="middle" fontWeight="700">Billing</text>
    {[28,158,303].map(x=><line key={x} x1={x} y1="35" x2={x} y2="352" stroke="#94a3b8" strokeDasharray="4 4"/>)}
    <text x="90" y="52" textAnchor="middle" fontSize="12">tools/list</text><Arrow x1={28} y1={62} x2={158} y2={62}/>
    <text x="90" y="87" textAnchor="middle" fontSize="12">read_invoice schema</text><Arrow x1={158} y1={97} x2={28} y2={97}/>
    <text x="90" y="128" textAnchor="middle" fontSize="12">call · no scope</text><Arrow x1={28} y1={138} x2={158} y2={138} color={red}/>
    <text x="90" y="166" textAnchor="middle" fontSize="12" fill={red}>insufficient_scope</text><Arrow x1={158} y1={176} x2={28} y2={176} color={red}/>
    <text x="233" y="167" textAnchor="middle" fontSize="13" fill={red}>× no service read</text>
    <text x="90" y="214" textAnchor="middle" fontSize="12">call · read scope</text><Arrow x1={28} y1={224} x2={158} y2={224} color={green}/>
    <text x="231" y="250" textAnchor="middle" fontSize="12">read INV-42</text><Arrow x1={158} y1={260} x2={303} y2={260} color={green}/>
    <text x="231" y="285" textAnchor="middle" fontSize="12">account A-7 · $320</text><Arrow x1={303} y1={295} x2={158} y2={295} color={green}/>
    <text x="90" y="326" textAnchor="middle" fontSize="12">tool result</text><Arrow x1={158} y1={337} x2={28} y2={337} color={green}/>
    <text x="170" y="385" textAnchor="middle" fontSize="13">Initialization precedes this sequence</text>
  </Canvas>;
}

function ContractMatrix() {
  return <Canvas height={280} title="Four contract tests compare fictional adapters A and B. A passes four; B fails denial and retry. Only A is eligible.">
    <text x="12" y="24" fontWeight="700">Contract</text><text x="218" y="24" textAnchor="middle" fontWeight="700">A</text><text x="300" y="24" textAnchor="middle" fontWeight="700">B</text>
    {['Supported task','No evidence','Denied action','Retry'].map((label,i)=><g key={label}>
      <line x1="10" y1={40+i*42} x2="329" y2={40+i*42} stroke="#e2e8f0"/>
      <text x="12" y={65+i*42}>{label}</text><text x="218" y={65+i*42} textAnchor="middle" fill={green}>PASS</text>
      <text x="300" y={65+i*42} textAnchor="middle" fill={i<2?green:red}>{i<2?'PASS':'FAIL'}</text>
    </g>)}
    <text x="12" y="235" fontWeight="700">Eligible?</text><text x="218" y="235" textAnchor="middle" fill={green}>YES</text><text x="300" y="235" textAnchor="middle" fill={red}>NO</text>
    <text x="170" y="272" textAnchor="middle" fontSize="13">Fictional adapters, not framework rankings</text>
  </Canvas>;
}

function BrowserReceipt() {
  return <Canvas height={310} title="Before clicking Save draft the status is Unsaved. Afterward, only a new observation with Draft D-17 saved verifies the outcome. An unchanged page fails.">
    <text x="80" y="22" textAnchor="middle" fontWeight="700">Before</text><text x="260" y="22" textAnchor="middle" fontWeight="700">After</text>
    {[8,188].map(x=><g key={x}><rect x={x} y="42" width="144" height="136" rx="5" stroke="#94a3b8" fill="#f8fafc"/><rect x={x+13} y="65" width="118" height="34" rx="4" fill={purple}/><text x={x+72} y="87" fill="white" textAnchor="middle">Save draft</text></g>)}
    <text x="80" y="136" textAnchor="middle" fill={red}>Unsaved</text>
    <text x="260" y="134" textAnchor="middle" fill={green}>Draft D-17</text><text x="260" y="156" textAnchor="middle" fill={green}>saved</text>
    <Arrow x1={154} y1={110} x2={186} y2={110}/>
    <text x="170" y="218" textAnchor="middle" fontWeight="700">Click delivered ≠ task complete</text>
    <text x="170" y="252" textAnchor="middle" fill={red}>Unchanged status → not verified</text>
    <text x="170" y="286" textAnchor="middle" fill={green}>Expected receipt → verified</text>
  </Canvas>;
}

function PermissionBoundary() {
  return <Canvas height={325} title="Model proposals cross a trusted runtime gate. Read INV-42 is allowed; delete INV-42 and read INV-99 are denied. A model-declared admin role grants no scope.">
    <text x="170" y="24" textAnchor="middle" fontWeight="700">Trusted session: U-17 · invoice:read</text>
    <rect x="192" y="48" width="140" height="212" rx="8" fill="#ecfdf5" stroke={green} strokeWidth="2"/>
    <text x="262" y="77" textAnchor="middle" fontWeight="700" fill={green}>Runtime gate</text>
    {[['read INV-42','ALLOW',green],['delete INV-42','DENY',red],['read INV-99','DENY',red]].map(([label,result,color],i)=><g key={label}>
      <text x="8" y={114+i*58}>{label}</text><Arrow x1={130} y1={109+i*58} x2={188} y2={109+i*58} color={color}/>
      <text x="262" y={115+i*58} textAnchor="middle" fontWeight="700" fill={color}>{result}</text>
    </g>)}
    <text x="170" y="292" textAnchor="middle">Proposal says “admin”?</text>
    <text x="170" y="316" textAnchor="middle" fill={red}>It cannot change trusted permissions.</text>
  </Canvas>;
}

function SafeSuccessMatrix() {
  return <Canvas height={385} title="Six runs: task success for 1,2,4,6; policy passes for every run except 2. Safe successes are 1,4,6, so 3 of 6.">
    <text x="14" y="24" fontWeight="700">Run</text><text x="115" y="24" textAnchor="middle" fontWeight="700">Task</text><text x="209" y="24" textAnchor="middle" fontWeight="700">Policy</text><text x="305" y="24" textAnchor="middle" fontWeight="700">Both</text>
    {[true,true,false,true,false,true].map((task,i)=><g key={i}>
      <text x="24" y={62+i*39}>{i+1}</text>
      {[task,i!==1,task&&i!==1].map((ok,j)=><g key={j}><circle cx={115+j*95} cy={56+i*39} r="14" fill={ok?'#d1fae5':'#ffe4e6'}/><text x={115+j*95} y={61+i*39} textAnchor="middle" fill={ok?green:red} fontWeight="700">{ok?'✓':'×'}</text></g>)}
    </g>)}
    <text x="170" y="308" textAnchor="middle">Raw 4/6 = 66.7% · Safe 3/6 = 50%</text>
    <text x="170" y="339" textAnchor="middle" fill={red}>Run 2 blocks the zero-violation gate</text>
    <text x="170" y="363" textAnchor="middle">All-attempt cost / safe successes = $0.04</text>
  </Canvas>;
}

function ParallelWaterfall() {
  const spans=[{name:'Plan',start:0,duration:400,color:purple},{name:'Tool A',start:400,duration:300,color:blue},{name:'Tool B',start:400,duration:500,color:green},{name:'Final',start:900,duration:200,color:purple}];
  return <Canvas height={330} title="Waterfall: plan 0–400 ms, tool A 400–700, tool B 400–900, final 900–1100. Parallel overlap makes wall latency 1100 ms, not the 1400 ms sum.">
    <text x="170" y="22" textAnchor="middle" fontWeight="700">Elapsed time from request start (ms)</text>
    {[0,400,700,900,1100].map(t=><g key={t}><line x1={70+t*.23} y1="55" x2={70+t*.23} y2="252" stroke="#e2e8f0"/><text x={70+t*.23} y="45" textAnchor="middle" fontSize="12">{t}</text></g>)}
    {spans.map((s,i)=><g key={s.name}><text x="6" y={87+i*49} fontSize="13">{s.name}</text><rect x={70+s.start*.23} y={67+i*49} width={s.duration*.23} height="27" rx="3" fill={s.color}/><text x={70+(s.start+s.duration/2)*.23} y={86+i*49} textAnchor="middle" fontSize="12" fill="white">{s.duration}</text></g>)}
    <text x="170" y="282" textAnchor="middle">Wall time 1,100 ms · child work 1,400 ms</text>
    <text x="170" y="315" textAnchor="middle" fontWeight="700">Cost: $0.0029 + $0.0010 = $0.0039</text>
  </Canvas>;
}

const figures: Record<string, { title: string; caption: string; diagram: () => ReactNode }> = {
  'agentic-ai-intro': { title: 'Observations determine whether to continue or stop', caption: 'The successful fixture uses the stale cache first and the current service second. The loop never gets a third lookup. If both records are stale, it abstains.', diagram: BoundedLoop },
  'tool-calling': { title: 'A retry reuses a receipt, not a financial side effect', caption: 'The fingerprint binds actor, order and amount. The receipt ledger accepts a matching retry but rejects changed requests and unauthorized actors.', diagram: RefundRetry },
  'building-ai-agent': { title: 'Three distinct outcomes at the tool boundary', caption: 'Rejected means the proposal is invalid. Abstain means a valid lookup found no approved evidence. Success requires the retrieved text and its source ID.', diagram: ContractPaths },
  'planning-reflection': { title: 'Evidence increases while the available action budget decreases', caption: 'Green cells count known required fields; purple cells count actions left. A successful run stops with two actions unspent.', diagram: ProgressChart },
  'agent-context-engineering': { title: 'A new observation needs space inside the same fixed window', caption: 'All three stacked bars use one token scale. The red dashed line is the 32,000-token ceiling, including the output reserve. Compaction removes 2,000 history tokens.', diagram: ContextBudget },
  'agent-memory': { title: 'Memory has versions, an owner and an end of life', caption: 'Only version 2 is current. Stale writes are rejected, another namespace cannot recall this record, and expiry or deletion prevents subsequent recall.', diagram: MemoryTimeline },
  'agent-state-graphs': { title: 'The approval edge is guarded; the shortcut does not exist', caption: 'Follow solid arrows for allowed transitions. The dashed red path is a prohibited shortcut, not an executable edge. Rejection can finish without a write.', diagram: GuardedGraph },
  'durable-long-running-agents': { title: 'Saved progress survives the worker; old approval does not authorize new terms', caption: 'The dashed divider separates worker lifetimes. SQLite carries the checkpoint across them, but the replacement worker must revalidate time and amount.', diagram: CheckpointResume },
  'agentic-rag': { title: 'One missing claim drives one targeted retrieval', caption: 'A rejected 90-day policy never enters the answer. D1 supports the price and D2 supports the refund period; without D2 the answer remains partial.', diagram: RagCoverage },
  'multi-agent-systems': { title: 'Parallel workers meet at an explicit conflict-aware join', caption: 'Independent worker durations determine the ideal critical path. The join preserves the two conflicting prices rather than choosing the last result.', diagram: WorkerJoin },
  'model-context-protocol': { title: 'Discovery, authorization and the underlying service are different steps', caption: 'Horizontal arrows are messages or service calls; dashed vertical lines are participant lifelines. Denial stops at the server boundary. Initialization happens before the depicted tool operations.', diagram: MCPSequence },
  'agent-frameworks': { title: 'Correctness gates come before choosing an orchestration library', caption: 'A and B are fictional application adapters. The same contract tests can evaluate plain code or a framework implementation; this is not a product benchmark.', diagram: ContractMatrix },
  'browser-computer-use-agents': { title: 'A changed interface must prove the intended postcondition', caption: 'The draft ID ties the receipt to this task. An unchanged status is not success, even if the button was clicked without an interaction error.', diagram: BrowserReceipt },
  'agent-security': { title: 'Authority comes from the trusted session, never from a proposal', caption: 'The runtime checks both action scope and resource ownership. Model text, retrieved instructions and self-declared roles cannot expand either boundary.', diagram: PermissionBoundary },
  'agent-evaluation-safety': { title: 'An unsafe success must not count as a safe success', caption: 'A check means pass; a cross means fail. Only runs passing both columns count toward safe success. All six attempted runs contribute to cost.', diagram: SafeSuccessMatrix },
  'agent-observability-deployment': { title: 'Parallel spans overlap: the slowest dependency controls the join', caption: 'Each colored bar begins at its actual start time and shows its duration in milliseconds. The final model call waits until both tools finish at 900 ms.', diagram: ParallelWaterfall },
};

export function AgenticTutorialDiagram({ topicId }: { topicId: string }) {
  const figure = figures[topicId];
  if (!figure) return null;
  const Diagram = figure.diagram;
  return <FigureShell title={figure.title} caption={figure.caption} accessibleDescription={figure.caption} figureProps={{'data-agentic-lab-figure': topicId}}><Diagram/></FigureShell>;
}
