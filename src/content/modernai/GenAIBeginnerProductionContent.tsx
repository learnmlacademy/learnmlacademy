import { useParams } from "react-router-dom";\nimport { Callout } from "../../components/content/Callout";
import { DataTable } from "../../components/content/DataTable";
import { FigureShell } from "../../components/content/FigureShell";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";

function EvaluatingGenerativeModels() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>One beautiful sample does not prove a generator is good</h2>
        <p className="text-lg">Generative systems are stochastic: the same request can produce different outputs. Evaluation therefore needs a <strong>set of representative cases</strong>, repeated runs where variation matters, and several dimensions rather than one universal score.</p>
      </section>

      <section className="space-y-4">
        <h2>Different metrics answer different questions</h2>
        <DataTable title="Separate the evidence" headers={["Dimension","Question","Example evidence"]} rows={[
          ["Fidelity / quality","Does the output look or sound plausible?","Human preference, artifact rate"],
          ["Prompt adherence","Did it follow the requested content or constraints?","Rubric-based review"],
          ["Diversity","Does it cover useful variation instead of repeating one mode?","Coverage / duplicate analysis"],
          ["Latency","Is it fast enough for the user experience?","p50 / p95 generation time"],
          ["Cost","Can the workflow operate sustainably?","Cost per accepted output"],
          ["Safety","Are unacceptable failures below defined limits?","Critical-failure rate"],
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>What does FID actually compare?</h2>
        <p><strong>Fréchet Inception Distance (FID)</strong> is a set-level image metric that compares the centers and spreads of feature representations from real and generated image collections. It is not a score for one exact image and it does not measure every quality dimension.</p>
        <Callout role="info" title="Treat metrics as instruments, not verdicts"><p>A lower FID may be useful evidence about feature distributions, but human usefulness, prompt adherence, artifacts, diversity, safety, and latency still need separate checks.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Hard release gates can outweigh a softer preference</h2>
        <DataTable title="Worked release example" headers={["Generator","Human preference","Artifact rate","p95 latency","Result"]} rows={[
          ["A","Higher","8%","4.2 s","Fails both hard gates"],
          ["B","Lower","3%","2.1 s","Passes both hard gates"],
        ]}/>
        <p>If the release requirements are <strong>artifact rate ≤5%</strong> and <strong>p95 latency ≤3 s</strong>, only Generator B is eligible even though A wins the softer human-preference measure.</p>
      </section>

      <section className="space-y-4">
        <h2>Compare systems on the same experiment</h2>
        <p>If two models use different prompts, preprocessing, case sets, or serving hardware, the observed differences mix model quality with pipeline differences. Use the same held-out workload and realistic settings when comparing candidates.</p>
        <p>For random generators, repeat important cases with recorded settings and report variation or pass rates instead of relying on one lucky output.</p>
      </section>

      <SummaryCard items={[
        "Generative evaluation needs representative test cases and repeated runs when randomness matters.",
        "Quality, adherence, diversity, latency, cost, and safety answer different questions.",
        "FID compares feature distributions across sets of real and generated images; it is not a complete quality score.",
        "In the worked example, Generator B passes artifact ≤5% and p95 ≤3 s while A fails both.",
        "Hard product requirements determine eligibility before softer preferences are compared.",
        "Fair comparisons keep prompts, preprocessing, test cases, and serving conditions consistent.",
      ]}/>
    </div>
  );
}

function ResponsibleGenerativeAI() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>A model can be acceptable while the application is unsafe</h2>
        <p className="text-lg">Risk depends on the whole system: who uses it, what information it receives, what actions it can trigger, how errors affect people, and what review or recovery exists.</p>
        <p>A brainstorming assistant reviewed by an employee and an automated system that changes a person's eligibility record can use similar models but require very different controls.</p>
      </section>

      <section className="space-y-4">
        <h2>Start with a specific intended use</h2>
        <p>“Use AI responsibly” is too vague to test. A better statement is:</p>
        <Callout role="tip" title="Testable intended use"><p><strong>Draft internal product descriptions from approved product data for trained staff to edit before publication.</strong></p></Callout>
        <p>That statement names the task, evidence source, users, and review level.</p>
      </section>

      <section className="space-y-4">
        <h2>Prioritize risks consistently</h2>
        <p>A simple planning rubric can score <strong>likelihood × impact</strong>. If likelihood=3 and impact=4 on chosen 1–5 scales:</p>
        <FormulaBlock expression="priority score = 3 × 4 = 12" explanation="This score helps rank risks within the team's rubric. It is not a measured probability of harm." />
      </section>

      <section className="space-y-4">
        <h2>Controls should prevent, detect, contain, and recover</h2>
        <DataTable title="Different controls do different jobs" headers={["Control","Example purpose"]} rows={[
          ["Access control","Keep private data away from unauthorized users/models"],
          ["Input/output validation","Block malformed or prohibited content"],
          ["Human review","Prevent high-impact automated decisions from acting unchecked"],
          ["Monitoring","Detect quality, safety, or privacy regressions"],
          ["Correction / escalation","Give users and operators a path to repair failures"],
          ["Incident response","Contain a leak or unsafe release and revoke affected access"],
        ]}/>
        <Callout role="warning" title="A disclaimer is not containment"><p>“AI can make mistakes” communicates uncertainty but does not prevent or recover from a private-data leak.</p></Callout>
      </section>

      <SummaryCard items={[
        "Generative-AI risk depends on the entire application, not only the model.",
        "A useful intended-use statement names the user, task, evidence/environment, and review level.",
        "A simple likelihood×impact rubric can rank risks; 3×4 gives a planning score of 12.",
        "High-impact actions need stronger containment and meaningful human approval or review.",
        "Disclosures set expectations but do not replace access control, validation, monitoring, or incident response.",
        "Users need correction and escalation paths when generated output can affect important decisions.",
      ]}/>
    </div>
  );
}

function ChoosingGenerativeModel() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>First question: do you need generation at all?</h2>
        <p className="text-lg">If exact retrieval, deterministic rules, a predictive model, or a template can complete the user job, open-ended generation may add cost and failure modes without adding value.</p>
      </section>

      <FigureShell title="Select by constraints, not by model popularity" caption="Filter candidates by hard requirements first; compare quality, cost, and convenience only among eligible options." accessibleDescription="A funnel begins with the user job, then applies capability, data/privacy, latency, licensing, and deployment constraints before benchmarking eligible candidates.">
        <div className="grid gap-3 md:grid-cols-5">
          {["User job","Must-have capability","Privacy / data location","Latency / deployment","Benchmark eligible choices"].map((x)=> <div key={x} className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold">{x}</div>)}
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>Family-level starting points</h2>
        <DataTable title="Choose a family from the generation problem" headers={["Need","Natural family to shortlist"]} rows={[
          ["High-fidelity image generation and editing","Diffusion"],
          ["Compact probabilistic latent representation","VAE"],
          ["Adversarial image/data generation","GAN"],
          ["Sequential text generation","Autoregressive / LLM"],
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>A controlled-editing selection example</h2>
        <p>Suppose the product requires <strong>mask editing</strong>, an acceptable usage licence, and <strong>p95 latency ≤4.0 s</strong>.</p>
        <DataTable title="Apply hard constraints first" headers={["Candidate","Mask editing","Use permitted","p95 latency","Eligible?"]} rows={[
          ["A","No","Yes","2.4 s","No — missing required capability"],
          ["B","Yes","Yes","3.6 s","Yes"],
          ["C","Yes","Yes","5.1 s","No — latency exceeds limit"],
        ]}/>
        <p>B is the only eligible candidate. Its cost and quality can now be compared with other eligible options; they cannot rescue A or C from failed hard requirements.</p>
      </section>

      <section className="space-y-4">
        <h2>Benchmark on the intended environment</h2>
        <p>If two checkpoints are tested on different hardware and different case sets, repeat the comparison on the same held-out workload and intended serving setup.</p>
        <Callout role="warning" title="Privacy constraints enter early"><p>If a hospital requires data to remain in an approved environment, treat that as a hard provider/deployment constraint before benchmarking—not as an optional preference after choosing a model.</p></Callout>
      </section>

      <SummaryCard items={[
        "Question whether generation is necessary before choosing a generative model.",
        "Filter candidates by hard capability, privacy, licensing, latency, and deployment constraints first.",
        "Diffusion is a natural family to shortlist for high-fidelity image generation and controlled editing.",
        "In the toy editing example, only B passes mask-editing, usage, and p95≤4 s requirements.",
        "Benchmark eligible candidates on the same held-out workload and intended serving setup.",
        "Data-location and privacy requirements can eliminate providers or deployment paths before softer trade-offs are compared.",
      ]}/>
    </div>
  );
}

function BuildingGenerativeApplications() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>A model response is not yet an application</h2>
        <p className="text-lg">A production application must decide what inputs are allowed, what evidence to retrieve, how to shape the request, how to validate the output, what actions are permitted, and what happens when something is ambiguous or wrong.</p>
      </section>

      <FigureShell title="A reliable generative application wraps the model in deterministic controls" caption="The model creates a draft. The application owns evidence, validation, permissions, user flow, and failure handling." accessibleDescription="A pipeline shows input validation, optional retrieval, model generation, structure validation, semantic/business validation, then human review or safe action.">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {["Validate input","Retrieve evidence","Generate draft","Check schema","Check meaning / permissions","Review or act"].map((x)=> <div key={x} className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold">{x}</div>)}
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>Structure validation and factual validation are different</h2>
        <p>Suppose a meeting-summary schema requires <code>decisions</code> to be a list. If the model returns a string, that is an <strong>invalid structure</strong> failure.</p>
        <p>If the JSON shape is perfect but an action item names an owner not supported by the transcript, the structure passed while the <strong>meaning/evidence check failed</strong>.</p>
        <Callout role="tip" title="Schema success proves only shape"><p>Required fields and types being present does not prove the values are true, authorized, or allowed by business rules.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Retrieval and tools solve different needs</h2>
        <DataTable title="External capability" headers={["Need","Component"]} rows={[
          ["Find an approved project glossary or policy passage","Retrieval"],
          ["Calculate a value or perform an authorized action","Tool / function call"],
        ]}/>
        <p>If the workflow only needs approved evidence, do not add autonomous actions unnecessarily.</p>
      </section>

      <section className="space-y-4">
        <h2>Ambiguous high-impact outputs should not become automatic actions</h2>
        <p>If a contractual action item names an owner but the transcript is ambiguous, require participant confirmation or human review rather than silently converting the generated guess into an external action.</p>
      </section>

      <SummaryCard items={[
        "A generative application wraps a model with input, evidence, validation, permission, user-flow, and failure-handling logic.",
        "The model output is a draft, not automatically a trusted application result.",
        "Schema validation checks structure; semantic and business validation check meaning and allowed behavior.",
        "A decisions string where a list is required is an invalid-structure failure.",
        "Retrieval finds evidence, while tools calculate or take authorized actions.",
        "Ambiguous high-impact cases should ask for confirmation or route to human review.",
      ]}/>
    </div>
  );
}

function DeployingGenerativeApplications() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Deployment turns a working demo into a service</h2>
        <p className="text-lg">A deployed generative application must stay secure, responsive, observable, affordable, and recoverable while real users send unpredictable traffic.</p>
      </section>

      <section className="space-y-4">
        <h2>Hosted versus self-hosted is a measured trade-off</h2>
        <DataTable title="Questions to compare" headers={["Dimension","Hosted inference","Self-hosted inference"]} rows={[
          ["Operations","Provider manages much of model serving","Your team owns serving stack and capacity"],
          ["Control","Depends on provider features/contracts","More direct infrastructure/model control"],
          ["Privacy/data flow","Depends on provider/region/contract","Can keep data in approved infrastructure if designed correctly"],
          ["Cost","Usage pricing can be simple at some scales","Hardware + operations may make sense at sustained scale"],
        ]}/>
        <p>Neither path is universally cheaper, faster, or more private. Measure the real workload and constraints.</p>
      </section>

      <section className="space-y-4">
        <h2>Secrets stay behind the server boundary</h2>
        <p>Hosted-model provider keys belong in a protected server-side secret manager or environment with scoped access and a rotation/revocation path. Do not ship them in browser JavaScript, prompts, or ordinary logs.</p>
      </section>

      <section className="space-y-4">
        <h2>Retries can duplicate costly or side-effecting work</h2>
        <p>If a transient timeout causes the same billed generation to run twice, use a bounded retry policy and an <strong>idempotency key</strong> where the provider or downstream system supports it.</p>
        <Callout role="warning" title="Do not “fix” failures with unlimited retries"><p>Classify retryable errors, cap attempts, add backoff, and keep timeouts. Removing all bounds can amplify outages and cost.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>A simple concurrency planning estimate</h2>
        <p>If average traffic is 2 requests per second and average processing time is 3 seconds:</p>
        <FormulaBlock expression="average in-flight ≈ arrival rate × processing time = 2 × 3 = 6" explanation="Six is an average planning estimate, not a safe capacity ceiling. Bursts and tail latency require headroom and load testing." />
      </section>

      <section className="space-y-4">
        <h2>Release model versions gradually</h2>
        <p>After offline tests pass, a new version can receive a small canary slice of real traffic. Compare reliability, quality, safety, cost, and latency with the current version. Define stop conditions and test rollback before increasing exposure.</p>
      </section>

      <SummaryCard items={[
        "Deployment adds security, availability, observability, cost, scaling, and recovery requirements to a working generative workflow.",
        "Hosted versus self-hosted inference should be chosen from measured privacy, control, cost, latency, and operating capability.",
        "Provider keys belong in protected server-side secret storage, never public browser code or ordinary logs.",
        "Retries should be bounded and paired with idempotency when duplicate processing matters.",
        "At 2 requests/s and 3 s average processing time, the toy average in-flight estimate is 6.",
        "New model versions should use controlled canary or shadow exposure with stop conditions and tested rollback.",
      ]}/>
    </div>
  );
}

export function GenAIBeginnerProductionContent() {\n  const { topicId = "" } = useParams<{ topicId: string }>();
  if (topicId === "evaluating-generative-models") return <EvaluatingGenerativeModels />;
  if (topicId === "responsible-generative-ai") return <ResponsibleGenerativeAI />;
  if (topicId === "choosing-generative-model") return <ChoosingGenerativeModel />;
  if (topicId === "building-genai-apps") return <BuildingGenerativeApplications />;
  if (topicId === "genai-deployment") return <DeployingGenerativeApplications />;
  return null;
}
