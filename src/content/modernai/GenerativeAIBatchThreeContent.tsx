import { Callout } from "../../components/content/Callout";
import { CodeBlock as SharedCodeBlock } from "../../components/content/CodeBlock";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";
import React from "react";
import { useParams } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Code2,
} from "lucide-react";
import {
  ApplicationArchitectureDiagram,
  ConstraintSelectionDiagram,
  EvaluationPipelineDiagram,
  EvaluationTradeoffDiagram,
  GenerativeNeedDecisionDiagram,
  HostedSelfHostedDiagram,
  LayeredSafetyDiagram,
  OutputValidationDiagram,
  ProductionReliabilityDiagram,
  ResponsibleLifecycleDiagram,
} from "../../components/diagrams/GenAIFinalBatchDiagrams";

type Tone = "indigo" | "violet" | "emerald" | "amber" | "rose" | "sky";

const toneClasses: Record<Tone, string> = {
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-950",
  violet: "border-violet-200 bg-violet-50 text-violet-950",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
  amber: "border-amber-200 bg-amber-50 text-amber-950",
  rose: "border-rose-200 bg-rose-50 text-rose-950",
  sky: "border-sky-200 bg-sky-50 text-sky-950",
};

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-lg leading-relaxed text-slate-700">{children}</p>;
}

function FlowBox({
  title,
  detail,
  tone = "indigo",
}: {
  title: string;
  detail: string;
  tone?: Tone;
}) {
  return (
    <div className={"min-w-0 rounded-xl border p-4 text-center " + toneClasses[tone]}>
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
    </div>
  );
}

function Formula({ title, expression, children }: { title: string; expression: string; children: React.ReactNode }) {
  return <FormulaBlock label={title} expression={expression} explanation={children} />;
}

function CodeBlock({
  title,
  description,
  code,
  label,
}: {
  title: string;
  description: string;
  code: string;
  label: string;
}) {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-indigo-800">{title}</h2>
      <p className="mb-4 leading-relaxed text-slate-700">{description}</p>
      <SharedCodeBlock code={code} title={label} />
    </section>
  );
}

function SummaryTakeaways({ items }: { items: string[] }) {
  return <SummaryCard items={items} className="mt-0" />;
}

function Warning({ title, children }: { title: string; children: React.ReactNode }) {
  return <Callout role="mistake" title={title}>{children}</Callout>;
}

function EvaluatingGenerativeModels() {
  const metricCode = [
    "# Hypothetical review counts from the worked example below.",
    "evaluations = {",
    "    \"Generator A\": {\"artifact_cases\": 8, \"outputs\": 100, \"preference_wins\": 31},",
    "    \"Generator B\": {\"artifact_cases\": 3, \"outputs\": 100, \"preference_wins\": 19},",
    "}",
    "paired_reviews = 50",
    "",
    "for name, result in evaluations.items():",
    "    artifact_rate = 100 * result[\"artifact_cases\"] / result[\"outputs\"]",
    "    preference_rate = 100 * result[\"preference_wins\"] / paired_reviews",
    "    print(f\"{name}: artifacts={artifact_rate:.0f}%, preference={preference_rate:.0f}%\")",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What does “good” mean when many answers are possible?</h2>
        <Lead>
          A classifier can be checked against a known label. A generator is different: ten useful summaries or
          images may all look different, so there is often no single exact answer to compare with. Evaluation
          begins by defining the qualities that matter for the real user job, then measuring those qualities
          separately.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          An attractive image may ignore the prompt. A fluent answer may invent a fact. A strong model may be too
          slow or expensive for the product. These are different failures, and one impressive score cannot make
          the others disappear.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Build a quality profile, not a single scoreboard number</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Dimension</th><th className="p-4">Question it answers</th><th className="p-4">Possible evidence</th><th className="p-4">Better direction</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Fidelity / perceptual quality</td><td className="p-4">Does the output look or sound plausible?</td><td className="p-4">Human ratings, feature-distribution metrics</td><td className="p-4">Higher rating; often lower distance</td></tr>
              <tr><td className="p-4 font-semibold">Diversity / coverage</td><td className="p-4">Does the system cover the useful range rather than repeat one pattern?</td><td className="p-4">Mode, duplicate, and coverage analysis</td><td className="p-4">Broader relevant coverage</td></tr>
              <tr><td className="p-4 font-semibold">Condition adherence</td><td className="p-4">Did it follow the prompt, label, layout, or other control?</td><td className="p-4">Rubric scores, constraint checks, text–image similarity</td><td className="p-4">Higher</td></tr>
              <tr><td className="p-4 font-semibold">Factuality / grounding</td><td className="p-4">Are claims supported by supplied evidence?</td><td className="p-4">Citation checks, evidence matching, expert review</td><td className="p-4">Higher support; fewer unsupported claims</td></tr>
              <tr><td className="p-4 font-semibold">Task success</td><td className="p-4">Did the output help the user complete the intended job?</td><td className="p-4">Acceptance, completion, correction, or conversion rate</td><td className="p-4">Depends on the product goal</td></tr>
              <tr><td className="p-4 font-semibold">Human preference</td><td className="p-4">Which candidate do people prefer under a defined rubric?</td><td className="p-4">Blind A/B choices and comments</td><td className="p-4">Higher, with uncertainty reported</td></tr>
              <tr><td className="p-4 font-semibold">Safety</td><td className="p-4">How often does harmful, private, or prohibited output occur?</td><td className="p-4">Safety test-set failure rate and red-team findings</td><td className="p-4">Lower failure rate</td></tr>
              <tr><td className="p-4 font-semibold">Latency and cost</td><td className="p-4">Can the system meet its service and budget constraints?</td><td className="p-4">p50/p95 latency and cost per successful task</td><td className="p-4">Usually lower after quality gates pass</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <EvaluationPipelineDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Design the test set before comparing models</h2>
        <p className="leading-relaxed text-slate-700">
          Start with <strong>representative cases</strong> drawn from the intended workload. Add difficult edge
          cases, deliberate adversarial attempts, and subgroup slices whose failure might be hidden by an overall
          average. Keep this set fixed and versioned so a later model faces the same questions.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Keep evaluation cases out of training and prompt-tuning data: that hold-out separation protects the test
          from becoming practice material. If generation is random, run important cases several times with recorded
          seeds or settings. One lucky sample does not describe a distribution of possible outputs.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What FID, KID, and CLIP-like scores actually say</h2>
        <p className="leading-relaxed text-slate-700">
          For image generation, <strong>Fréchet Inception Distance (FID)</strong> sends real and generated images
          through a feature extractor. It compares the centre and spread of the two resulting collections of
          feature vectors. A lower distance means the generated collection is closer to the real collection in
          that feature space. FID is therefore a set-level comparison—not a quality score for one image.
        </p>
        <Formula title="The formal FID expression" expression="FID = ||μᵣ − μg||² + Tr(Σᵣ + Σg − 2(ΣᵣΣg)¹ᐟ²)">
          <p>
            μᵣ and μg are the mean feature vectors calculated from the real and generated sets. Σᵣ and Σg are
            their covariance matrices, which describe how features vary together. || · ||² is squared distance,
            and Tr adds the diagonal entries of the matrix term. Software performs this matrix calculation; the
            beginner interpretation is “difference in feature centres plus difference in feature spread.”
          </p>
        </Formula>
        <p className="mt-4 leading-relaxed text-slate-700">
          FID changes with sample count, preprocessing, feature extractor, and image domain. A score computed on
          natural photographs is not automatically meaningful for medical scans or diagrams. Compare candidates
          only under the same documented pipeline. <strong>KID</strong> also compares feature distributions using
          a kernel estimate and is commonly reported with uncertainty across subsets; it remains a distribution
          proxy, not proof of usefulness or safety.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          A CLIP-like alignment score compares an image embedding with a text embedding, often using cosine
          similarity. Higher similarity can indicate that the picture matches the prompt better, but it does not
          prove clean anatomy, readable text, factual correctness, diversity, or safety.
        </p>
        <Formula title="Cosine similarity used for alignment" expression="similarity = (t · i) ÷ (||t|| × ||i||)">
          <p>
            t is the text feature vector and i is the image feature vector produced by the chosen encoder. The dot
            product t · i and the two vector lengths are calculated from those model-produced features. The result
            measures directional closeness in that feature space; it is not a percentage of total image quality.
          </p>
        </Formula>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Human review answers questions that proxies miss</h2>
        <p className="leading-relaxed text-slate-700">
          In a <strong>blind A/B comparison</strong>, reviewers see two anonymous outputs for the same case and
          choose one using a written criterion. Removing model names reduces brand and expectation bias. A
          rubric-based review instead scores defined properties—for example, instruction coverage from 1 to 5—and
          records a reason.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Reviewers can disagree because quality is partly subjective or the rubric is unclear. Report agreement,
          inspect disputed cases, and calibrate reviewers with examples. Also tag failures in words such as
          “missed object,” “unsupported claim,” or “distorted text.” Those tags tell the team what to fix; an
          average alone does not.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked example: two product-image generators</h2>
        <p className="leading-relaxed text-slate-700">
          A hypothetical retail team compares Generator A and Generator B on the same 100 held-out product prompts.
          Each model produces one image per prompt using recorded settings. Reviewers also make 50 blind paired
          choices. The table contains <strong>hypothetical measured results</strong>, not claims about real products.
        </p>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Measure and source</th><th className="p-4">Generator A</th><th className="p-4">Generator B</th><th className="p-4">Direction</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4"><strong>Prompt adherence</strong><br />Mean of reviewer-assigned 1–5 rubric scores</td><td className="p-4">4.4</td><td className="p-4">4.0</td><td className="p-4">Higher is better</td></tr>
              <tr><td className="p-4"><strong>Artifact rate</strong><br />Tagged failures ÷ 100 generated images</td><td className="p-4">8 ÷ 100 = 8%</td><td className="p-4">3 ÷ 100 = 3%</td><td className="p-4">Lower is better</td></tr>
              <tr><td className="p-4"><strong>Human preference</strong><br />Wins in 50 blind paired reviews</td><td className="p-4">31 ÷ 50 = 62%</td><td className="p-4">19 ÷ 50 = 38%</td><td className="p-4">Higher is better</td></tr>
              <tr><td className="p-4"><strong>p95 latency</strong><br />Measured request time below which 95% of runs completed</td><td className="p-4">4.2 seconds</td><td className="p-4">2.1 seconds</td><td className="p-4">Lower is better</td></tr>
              <tr><td className="p-4"><strong>Cost per successful image</strong><br />Hypothetical billed compute ÷ usable outputs</td><td className="p-4">$0.04</td><td className="p-4">$0.02</td><td className="p-4">Lower is better</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          A wins preference and adherence; B wins artifact rate, latency, and cost. The product team had already
          chosen two release limits: artifact rate at most 5% and p95 latency at most 3 seconds. A fails both, so B
          is the measured choice for this release. Those thresholds are <strong>developer/business choices</strong>,
          not universal constants. Averaging all five columns into one score would hide why A was rejected.
        </p>
      </section>

      <EvaluationTradeoffDiagram />

      <CodeBlock
        title="Reproduce two rates from the scorecard"
        description="This runnable Python 3 code calculates artifact and preference percentages from the hypothetical observed counts. The rubric score, latency, and cost were measured separately and are therefore not invented by this calculation."
        code={metricCode}
        label="Python 3 · runnable without extra packages"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Common mistakes and what to inspect next</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Mistake</th><th className="p-4">Why it misleads</th><th className="p-4">Diagnostic action</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Reporting one average</td><td className="p-4">Safety, rare failures, or a subgroup can disappear inside it.</td><td className="p-4">Break results down by case type, subgroup, and failure tag.</td></tr>
              <tr><td className="p-4 font-semibold">Changing prompts between candidates</td><td className="p-4">The comparison mixes model and test-set effects.</td><td className="p-4">Freeze cases, settings, seeds, preprocessing, and scoring code.</td></tr>
              <tr><td className="p-4 font-semibold">Treating proxy metrics as truth</td><td className="p-4">A feature distance or embedding similarity covers only part of quality.</td><td className="p-4">Pair proxies with task checks, human review, and failure inspection.</td></tr>
              <tr><td className="p-4 font-semibold">Evaluating one random sample</td><td className="p-4">A lucky or unlucky output may dominate the conclusion.</td><td className="p-4">Repeat generation and report variation or pass rates.</td></tr>
              <tr><td className="p-4 font-semibold">Tuning on the final test set</td><td className="p-4">The set becomes training feedback and stops estimating unseen performance.</td><td className="p-4">Keep a separate final hold-out and version every evaluation set.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "Generative-model evaluation begins by defining separate quality dimensions from the real user job because many different outputs may be acceptable.",
        "Every candidate should face the same fixed, held-out, versioned cases, including representative work, edge cases, adversarial attempts, and important slices.",
        "FID and KID compare generated and real feature distributions; a CLIP-like score estimates text–image alignment, but none is a universal quality score.",
        "Blind A/B comparisons, explicit rubrics, reviewer calibration, agreement, and failure tags reveal information that automatic proxies miss.",
        "Random generators should be run repeatedly with recorded settings because one lucky sample does not describe the output distribution.",
        "Hard release limits can eliminate a candidate even when it wins another metric, as the product-image example demonstrates.",
        "A defensible conclusion documents trade-offs across quality, safety, latency, cost, and slices instead of hiding them inside one average.",
      ]} />
    </div>
  );
}

function ResponsibleGenerativeAI() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Responsibility belongs to the whole system</h2>
        <Lead>
          Responsible Generative AI means engineering a system so its intended benefits are clear, foreseeable
          harms are controlled, failures are detected, and people can respond when something goes wrong. A warning
          under a text box is not a safety system.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          <strong>Model risk</strong> comes from the model itself—for example, memorized data or biased generations.
          <strong>Application risk</strong> also depends on who may use it, what context is supplied, what actions the
          output can trigger, and whether anyone reviews a high-impact decision. A model that is acceptable for
          brainstorming may be unacceptable when its answer automatically changes a medical, financial, or legal
          record.
        </p>
      </section>

      <ResponsibleLifecycleDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Begin with intended and prohibited use</h2>
        <p className="leading-relaxed text-slate-700">
          An intended-use statement should name the user, task, environment, data, and level of human review. “Draft
          internal product descriptions for trained staff to edit” is testable. “Help with writing” is too broad.
          Prohibited uses describe boundaries such as impersonating a real person, making an unreviewed eligibility
          decision, or entering confidential data into an unapproved service.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          The team must also document where training and application data came from, what permission or licence
          applies, and where data travels. Intellectual-property and licensing questions depend on jurisdiction,
          contracts, model terms, data, and use; record them and obtain qualified advice when needed rather than
          presenting a technical control as a legal conclusion.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A small risk-priority calculation</h2>
        <Formula title="Planning score" expression="risk priority = likelihood score × impact score">
          <p>
            Suppose a team assigns unsupported medical advice a likelihood score of 3 and an impact score of 4 on
            its own 1–5 ordinal planning scales. Both values are <strong>team-assigned</strong>: they represent ranked
            categories, not measured probabilities. The calculated priority is 3 × 4 = <strong>12</strong>. The team
            uses 12 to compare and prioritize risks under the same rubric; it is not a universal scientific risk
            probability and should not be compared with another organization’s unexplained scale.
          </p>
        </Formula>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Place controls at several layers</h2>
        <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <FlowBox title="Input" detail="Consent, access, data minimization, prohibited-request detection" tone="sky" />
          <FlowBox title="Model + context" detail="Approved model, bounded evidence, permissions, safer defaults" tone="violet" />
          <FlowBox title="Output" detail="Grounding, classifiers, schema and policy validation" tone="indigo" />
          <FlowBox title="User experience" detail="Disclosure, uncertainty, review, correction, escalation" tone="amber" />
          <FlowBox title="Operations" detail="Access logs, monitoring, red teams, incident response, rollback" tone="rose" />
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          No layer is perfect. Input filters can miss coded abuse; models can produce novel failures; output checks
          can misclassify; people can over-trust fluent text. Layering controls reduces reliance on any one defence
          and creates places to detect and contain failure.
        </p>
      </section>

      <LayeredSafetyDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">From risk to control and fallback</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Risk</th><th className="p-4">Example</th><th className="p-4">Preventive control</th><th className="p-4">Detection</th><th className="p-4">Fallback</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Privacy or memorization</td><td className="p-4">Output repeats a customer’s private detail.</td><td className="p-4">Minimize data; restrict context and access; test model/data suitability.</td><td className="p-4">Leakage tests and privacy-aware incident reports.</td><td className="p-4">Block output, remove access, investigate exposure.</td></tr>
              <tr><td className="p-4 font-semibold">Bias and representation</td><td className="p-4">A job-ad generator changes tone by demographic cue.</td><td className="p-4">Representative data, bounded instructions, and prohibited attribute rules.</td><td className="p-4">Matched-pair and subgroup evaluation plus complaints.</td><td className="p-4">Require human review; suspend affected workflow.</td></tr>
              <tr><td className="p-4 font-semibold">Unsupported output</td><td className="p-4">A support answer invents a refund policy.</td><td className="p-4">Approved evidence, narrow scope, and no autonomous high-impact action.</td><td className="p-4">Evidence checks, sampling audits, user feedback.</td><td className="p-4">Show verified source or route to a person.</td></tr>
              <tr><td className="p-4 font-semibold">Abuse or harmful generation</td><td className="p-4">A user requests targeted harassment instructions.</td><td className="p-4">Access controls, use policy, safer model settings, rate limits.</td><td className="p-4">Adversarial tests and monitored policy signals.</td><td className="p-4">Refuse safely, limit account, escalate credible threats.</td></tr>
              <tr><td className="p-4 font-semibold">Impersonation / synthetic media</td><td className="p-4">Generated voice imitates a real person without permission.</td><td className="p-4">Consent and likeness controls; restricted capabilities.</td><td className="p-4">Provenance checks, abuse reports, audit trails.</td><td className="p-4">Stop distribution, preserve evidence, notify responsible owner.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Operational practices make controls real</h2>
        <p className="leading-relaxed text-slate-700">
          Tell users when they are interacting with generated content and what review remains their responsibility.
          Give them a correction and escalation path. Use human approval where an output can materially affect a
          person, and limit which users or services can invoke sensitive capabilities.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Before release, evaluate normal cases, subgroup slices, and adversarial cases; red teaming deliberately
          looks for ways controls fail. After release, monitor quality and safety failures, but avoid logging raw
          sensitive prompts by default. Define who investigates alerts, how access is contained, when a model or
          feature is rolled back, and how the test set is updated after an incident.
        </p>
      </section>

      <Warning title="Why a disclaimer is not enough">
        <p>
          “AI can make mistakes” neither prevents a private-data leak nor stops an unsupported answer from changing
          a record. A useful disclosure sets expectations; engineering controls restrict, detect, and recover from
          failure. Both may be needed, but they do different jobs.
        </p>
      </Warning>

      <SummaryTakeaways items={[
        "Responsible Generative AI is a whole-system engineering task: a model that is acceptable for brainstorming may still be unsafe in an automated high-impact workflow.",
        "Define intended users, tasks, environments, data, and human review, then state prohibited uses clearly enough to test.",
        "Trace training and application data, permissions, licences, and data movement instead of treating a technical control as a legal conclusion.",
        "A likelihood × impact score can help prioritize risks under one team’s rubric, but it is not a measured probability or universal scale.",
        "Layer controls across inputs, model and context, outputs, user experience, and operations so no single defence carries the entire safety burden.",
        "For each risk, connect prevention to detection, a safe fallback, a responsible owner, and a human escalation path.",
        "Evaluate normal, subgroup, and adversarial cases before release; monitor carefully after release and rehearse containment and rollback.",
      ]} />
    </div>
  );
}

function ChoosingGenerativeModel() {
  const selectionCode = [
    "# Hypothetical benchmark results from the worked example below.",
    "candidates = [",
    "    {\"name\": \"A\", \"mask_editing\": False, \"commercial_use\": True,  \"p95_s\": 2.4, \"cost\": 0.03},",
    "    {\"name\": \"B\", \"mask_editing\": True,  \"commercial_use\": True,  \"p95_s\": 3.2, \"cost\": 0.06},",
    "    {\"name\": \"C\", \"mask_editing\": True,  \"commercial_use\": True,  \"p95_s\": 5.1, \"cost\": 0.04},",
    "]",
    "",
    "eligible = [",
    "    model for model in candidates",
    "    if model[\"mask_editing\"]",
    "    and model[\"commercial_use\"]",
    "    and model[\"p95_s\"] <= 4.0",
    "]",
    "print([model[\"name\"] for model in eligible])  # ['B']",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Model selection starts before the model list</h2>
        <Lead>
          Choosing the right generative model is a sequence of decisions: first ask whether the product must create
          new content, then choose a suitable model family, and only then compare specific checkpoints or providers
          on the same evidence. “Largest” and “newest” are not requirements.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          A support page that must return an exact stored policy may need retrieval, not generation. A fraud flag
          may need a classifier. A fixed confirmation email may need a template. Use a generator when variation,
          synthesis, transformation, or open-ended creation is part of the user job—and when its uncertainty can be
          managed.
        </p>
      </section>

      <GenerativeNeedDecisionDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Three decisions that should not be mixed together</h2>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <FlowBox title="1. Need generation?" detail="Compare with a deterministic or predictive baseline first." tone="sky" />
          <FlowBox title="2. Which family?" detail="Match the modality and broad capability: representation, images, or sequences." tone="violet" />
          <FlowBox title="3. Which implementation?" detail="Benchmark the actual checkpoint, settings, provider, and hardware you could deploy." tone="emerald" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A family-level shortlist</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Family</th><th className="p-4">Useful starting point</th><th className="p-4">Strength to test</th><th className="p-4">Constraint to test</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">VAE</td><td className="p-4">Compact learned representation, reconstruction, anomaly work</td><td className="p-4">Smooth latent space and fast encode/decode path</td><td className="p-4">Fine detail may be softer than alternatives</td></tr>
              <tr><td className="p-4 font-semibold">GAN</td><td className="p-4">Fast image sampling and domains with a proven specialist model</td><td className="p-4">Perceptual fidelity and inference speed</td><td className="p-4">Coverage, training stability, and control</td></tr>
              <tr><td className="p-4 font-semibold">Diffusion</td><td className="p-4">High-fidelity image generation, editing, and guided control</td><td className="p-4">Quality, coverage, and conditioning tools</td><td className="p-4">Iterative sampling latency and compute</td></tr>
              <tr><td className="p-4 font-semibold">Autoregressive</td><td className="p-4">Sequential text, code, audio tokens, or other ordered outputs</td><td className="p-4">Context-sensitive continuation and flexible sequences</td><td className="p-4">Per-token latency, error propagation, factuality</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          These are shortlist clues, not rankings. A synthetic-data project might use rules, a simulator, a VAE,
          GAN, diffusion model, or autoregressive model depending on the data and validation goal. The deployed
          implementation—not the family name—must pass the real evaluation.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Write a selection brief before benchmarking</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Dimension</th><th className="p-4">Question to document</th><th className="p-4">Evidence to collect</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Modality and task</td><td className="p-4">What goes in and what must be generated, transformed, or edited?</td><td className="p-4">Representative input/output examples and failure rules</td></tr>
              <tr><td className="p-4 font-semibold">Quality, diversity, control</td><td className="p-4">Which attributes must be correct, varied, or explicitly controlled?</td><td className="p-4">Held-out rubric, failure tags, repeated samples</td></tr>
              <tr><td className="p-4 font-semibold">Latency, throughput, cost</td><td className="p-4">How fast, how many, and under what budget per successful task?</td><td className="p-4">Measurements on likely workload and serving setup</td></tr>
              <tr><td className="p-4 font-semibold">Privacy and location</td><td className="p-4">May data leave the environment, region, or organization?</td><td className="p-4">Data-flow review, provider terms, deployment controls</td></tr>
              <tr><td className="p-4 font-semibold">Hardware and operations</td><td className="p-4">What can the team run, scale, monitor, and maintain?</td><td className="p-4">Memory/compute tests, operational skills, failure plan</td></tr>
              <tr><td className="p-4 font-semibold">Customization</td><td className="p-4">Are prompting and control enough, or is fine-tuning required?</td><td className="p-4">Baseline, control experiment, small tuning trial</td></tr>
              <tr><td className="p-4 font-semibold">Licence and usage</td><td className="p-4">Do model, data, output, and provider terms permit the intended use?</td><td className="p-4">Versioned documentation and qualified review where needed</td></tr>
              <tr><td className="p-4 font-semibold">Safety and evaluation</td><td className="p-4">What failure rate is acceptable and what evidence supports the claim?</td><td className="p-4">Safety gates, model card, independent and local evaluations</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Warning title="When not to use a generative model">
        <p>
          Prefer retrieval when the answer must be an exact stored fact, deterministic rules when policy fully
          defines the outcome, a classifier or regression model when the task is prediction, and templates when
          controlled variation is enough. These approaches can be easier to test, cheaper to operate, and less
          likely to invent content.
        </p>
      </Warning>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked selection: controlled product-image editing</h2>
        <p className="leading-relaxed text-slate-700">
          A hypothetical catalogue team needs to replace only the background inside an uploaded mask. This rules
          out text-only generation and shortlists image models that support controlled editing. Before testing, the
          team chooses three hard requirements: mask editing must be supported, documented terms must permit the
          intended commercial use, and measured p95 latency must be at most 4.0 seconds.
        </p>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Hypothetical candidate</th><th className="p-4">Mask editing</th><th className="p-4">Terms checked for use</th><th className="p-4">Measured p95</th><th className="p-4">Measured cost/output</th><th className="p-4">Result</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">A</td><td className="p-4">No</td><td className="p-4">Pass</td><td className="p-4">2.4 s</td><td className="p-4">$0.03</td><td className="p-4">Eliminate: no required control</td></tr>
              <tr><td className="p-4 font-semibold">B</td><td className="p-4">Yes</td><td className="p-4">Pass</td><td className="p-4">3.2 s</td><td className="p-4">$0.06</td><td className="p-4">Eligible</td></tr>
              <tr><td className="p-4 font-semibold">C</td><td className="p-4">Yes</td><td className="p-4">Pass</td><td className="p-4">5.1 s</td><td className="p-4">$0.04</td><td className="p-4">Eliminate: too slow</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          Capability and permission values come from the hypothetical candidates’ documentation and the team’s
          review. Latency and cost values are hypothetical measurements from the same 60-case benchmark on the
          intended serving setup. The limits—mask editing, permitted use, and p95 ≤ 4.0 seconds—are
          <strong> developer-chosen hard requirements</strong>. Only B passes, so its higher $0.06 measured cost is
          not compared with ineligible models as if all choices were interchangeable.
        </p>
      </section>

      <ConstraintSelectionDiagram />

      <CodeBlock
        title="Apply the hard requirements explicitly"
        description="This runnable Python 3 example filters the hypothetical candidates. It produces ['B']; the code does not manufacture the benchmark measurements—it only applies the stated decision rules to them."
        code={selectionCode}
        label="Python 3 · runnable without extra packages"
      />

      <SummaryTakeaways items={[
        "First decide whether the job needs generation; exact stored facts, fixed policies, predictions, or controlled wording may fit retrieval, rules, predictive models, or templates better.",
        "Choose a model family by the required modality and mechanism, then compare the actual checkpoints, providers, settings, and hardware you could deploy.",
        "Write hard requirements and evaluation criteria before benchmarking so an attractive result cannot quietly override a necessary constraint.",
        "Eliminate candidates that fail capability, permission, latency, privacy, safety, or operating requirements before comparing softer trade-offs.",
        "Benchmark eligible candidates on the same held-out workload and serving setup, measuring quality, diversity, control, latency, throughput, and cost.",
        "The right model is the measured fit for the task and operating environment—not automatically the largest, newest, cheapest, or highest-ranked family.",
      ]} />
    </div>
  );
}

function BuildingGenerativeAIApplications() {
  const validationCode = [
    "# Python 3 — deterministic validation; no model or external package is used.",
    "transcript = \"Maya will send the revised budget by Friday. The team approved a two-week pilot.\"",
    "",
    "valid_output = {",
    "    \"decisions\": [\"The team approved a two-week pilot.\"],",
    "    \"action_items\": [{",
    "        \"owner\": \"Maya\",",
    "        \"task\": \"send the revised budget\",",
    "        \"evidence\": \"Maya will send the revised budget by Friday.\",",
    "    }],",
    "}",
    "invalid_output = {",
    "    \"decisions\": \"A two-week pilot\",  # should be a list",
    "    \"action_items\": [{\"owner\": \"Sam\", \"task\": \"book a venue\", \"evidence\": \"not in transcript\"}],",
    "}",
    "",
    "def validate_summary(value, source_text):",
    "    errors = []",
    "    if not isinstance(value, dict):",
    "        return [\"output must be an object\"]",
    "    if not isinstance(value.get(\"decisions\"), list):",
    "        errors.append(\"decisions must be a list\")",
    "    items = value.get(\"action_items\")",
    "    if not isinstance(items, list):",
    "        errors.append(\"action_items must be a list\")",
    "        return errors",
    "    for index, item in enumerate(items):",
    "        required = {\"owner\", \"task\", \"evidence\"}",
    "        if not isinstance(item, dict) or not required.issubset(item):",
    "            errors.append(f\"action_items[{index}] is missing required fields\")",
    "        elif item[\"evidence\"] not in source_text:",
    "            errors.append(f\"action_items[{index}] evidence is not in the transcript\")",
    "    return errors",
    "",
    "print(\"valid:\", validate_summary(valid_output, transcript))",
    "print(\"invalid:\", validate_summary(invalid_output, transcript))",
  ].join("\n");

  const modelPseudo = [
    "# Conceptual pseudocode — adapt to the chosen model/provider.",
    "validated_input = validate_input(user_transcript)",
    "request = build_request(instructions, validated_input, output_schema)",
    "draft = model.generate_structured(request)",
    "errors = validate_schema_and_evidence(draft, validated_input)",
    "result = draft if not errors else safe_fallback(errors)",
    "record_evaluation_event(case_id, errors)  # exclude unnecessary private text",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A model produces content; an application completes a job</h2>
        <Lead>
          A generative model accepts a request and returns an output. A useful application must also decide what
          input is allowed, which evidence belongs in the request, what output shape is acceptable, how claims are
          checked, what the user sees, and what happens when any step fails. In short: <strong>model ≠ application</strong>.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          We will use a meeting-summary application throughout. Its narrow job is to turn an approved transcript
          into decisions and action items that a participant can review. A simple baseline might be keyword search
          plus copied sentences. The generator should be kept only if the evaluated workflow improves on that
          baseline without creating unacceptable unsupported actions.
        </p>
      </section>

      <ApplicationArchitectureDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Define success before designing prompts</h2>
        <p className="leading-relaxed text-slate-700">
          “Write a good summary” cannot be tested consistently. For this hypothetical application, the team chooses
          two release criteria: every response must pass the output schema, and at least 90% of action items in a
          fixed evaluation set must contain evidence copied from the transcript. The 100% schema rule and 90%
          evidence threshold are <strong>developer-chosen acceptance limits</strong>; the observed rates will be
          measured later. They are not facts learned by the model.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Instructions, context, retrieval, and tools have different jobs</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Component</th><th className="p-4">Purpose</th><th className="p-4">Meeting-summary example</th><th className="p-4">Do not assume</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Instructions / prompt</td><td className="p-4">Describe the task, boundaries, and format.</td><td className="p-4">“Return decisions and supported action items only.”</td><td className="p-4">Wording alone guarantees truth.</td></tr>
              <tr><td className="p-4 font-semibold">Context</td><td className="p-4">Supply information the model may use now.</td><td className="p-4">The authorized meeting transcript.</td><td className="p-4">More context is always safer or better.</td></tr>
              <tr><td className="p-4 font-semibold">Retrieval</td><td className="p-4">Find external evidence when the task needs it.</td><td className="p-4">Fetch a named project glossary, if required.</td><td className="p-4">Every generation app needs a full RAG system.</td></tr>
              <tr><td className="p-4 font-semibold">Tool</td><td className="p-4">Perform a calculation or authorized action.</td><td className="p-4">Create a calendar draft only after approval.</td><td className="p-4">Generated text should execute actions directly.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Structure first, then validate meaning</h2>
        <p className="leading-relaxed text-slate-700">
          A structured output schema can require a list of decisions and action-item objects with owner, task, and
          evidence fields. Schema validation catches missing fields and wrong types. It does not prove that “Maya”
          was actually assigned the task. A deterministic evidence rule can require the evidence string to occur
          in the transcript; human review can handle ambiguous or high-impact cases.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Deterministic post-processing is useful for normalizing dates, trimming whitespace, applying permission
          rules, and rejecting values outside known limits. It should not silently rewrite uncertain model claims
          into something that only looks verified.
        </p>
      </section>

      <OutputValidationDiagram />

      <CodeBlock
        title="Validate a generated summary with ordinary Python"
        description="This code is genuinely runnable with Python 3 and no extra package. The valid object has the expected types and exact transcript evidence, so it prints an empty error list. The invalid object uses a string instead of a decisions list and cites evidence absent from the transcript, so both failures are reported."
        code={validationCode}
        label="Python 3 · runnable without extra packages"
      />

      <CodeBlock
        title="Where a real model call would fit"
        description="This is architecture pseudocode, not runnable code: function names and generation APIs depend on the selected stack. Its purpose is to show that the model output remains a draft until deterministic checks pass."
        code={modelPseudo}
        label="Conceptual pseudocode · not directly runnable"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Plan failure behavior before the happy path ships</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Failure class</th><th className="p-4">Example</th><th className="p-4">Application response</th><th className="p-4">Evaluation signal</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Invalid input</td><td className="p-4">Empty, oversized, or unauthorized transcript</td><td className="p-4">Reject before generation with a clear correction</td><td className="p-4">Input-rejection reason</td></tr>
              <tr><td className="p-4 font-semibold">Invalid structure</td><td className="p-4">Missing action_items list</td><td className="p-4">One bounded repair attempt or safe failure</td><td className="p-4">Schema-failure rate by model/version</td></tr>
              <tr><td className="p-4 font-semibold">Unsupported claim</td><td className="p-4">Action has no transcript evidence</td><td className="p-4">Remove, flag, or send for human review</td><td className="p-4">Evidence-failure tag and case</td></tr>
              <tr><td className="p-4 font-semibold">Ambiguous high impact</td><td className="p-4">Unclear owner for a contractual action</td><td className="p-4">Require participant confirmation</td><td className="p-4">Escalation and correction outcome</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          Store reusable cases and expected properties in an evaluation harness. Run it when instructions, context
          logic, model versions, or schemas change. Log case identifiers, failure categories, latency, and user
          corrections while minimizing private transcript content. That turns vague complaints into reproducible
          engineering work.
        </p>
      </section>

      <div className="not-prose rounded-xl border border-sky-200 bg-sky-50 p-5">
        <h3 className="font-bold text-sky-950">Keep the lesson boundary clear</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          <strong>This lesson owns workflow and application logic:</strong> validation, context, request design,
          structure, evidence rules, feedback, and fallbacks. The next lesson owns serving and infrastructure:
          secrets, provider abstraction, traffic, scaling, rollouts, and production observability.
        </p>
      </div>

      <SummaryTakeaways items={[
        "A generative model returns content; an application must also control inputs, evidence, output shape, validation, user experience, and failure behavior.",
        "Begin with a narrow job, measurable acceptance limits, and a simple non-generative baseline before keeping a model in the workflow.",
        "Instructions define the task, context supplies current evidence, retrieval finds external evidence, and tools perform authorized calculations or actions.",
        "A schema can verify fields and types, but separate evidence and business rules are needed to check whether the content is supported and allowed.",
        "Treat every model response as an untrusted draft until deterministic structure and meaning checks pass.",
        "Reject invalid inputs early, bound repair attempts, and route unsupported or high-impact ambiguous cases to a person.",
        "Keep a failure-labelled evaluation set and rerun it whenever instructions, context logic, models, or schemas change.",
      ]} />
    </div>
  );
}

function DeployingGenerativeAIApplications() {
  const deploymentPseudo = [
    "# Conceptual server pseudocode — provider APIs and web frameworks vary.",
    "def generate(request, idempotency_key):",
    "    validated = validate_and_rate_limit(request)",
    "    provider = choose_healthy_provider(validated.model_class)",
    "    try:",
    "        return provider.call(",
    "            validated,",
    "            timeout_seconds=APP_TIMEOUT,",
    "            secret=SERVER_SECRET,",
    "            idempotency_key=idempotency_key,",
    "        )",
    "    except TransientFailure as error:",
    "        record_failure(provider.version, error.category)",
    "        return approved_fallback(validated)",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Deployment turns a working workflow into a dependable service</h2>
        <Lead>
          A prototype proves that a request can produce an output. Production deployment must keep that workflow
          available, secure, observable, affordable, and recoverable while real traffic and model versions change.
          The first architectural choice is often whether inference runs behind a hosted API or on infrastructure
          your team operates.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Neither choice is universally cheaper, faster, more private, or safer. Compare the actual provider,
          region, model, hardware, workload, contract, and operating capability. Preserve a stable application
          interface so this choice can change without rewriting every product feature.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Hosted API or self-hosted open model?</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[1040px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Dimension</th><th className="p-4">Hosted model / API</th><th className="p-4">Self-hosted / open model</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Startup effort</td><td className="p-4">Provider supplies serving infrastructure and an API.</td><td className="p-4">Team provisions runtime, weights, hardware, networking, and operations.</td></tr>
              <tr><td className="p-4 font-semibold">Infrastructure control</td><td className="p-4">Control is bounded by provider options and contract.</td><td className="p-4">Team controls stack and placement but owns failures.</td></tr>
              <tr><td className="p-4 font-semibold">Privacy / data location</td><td className="p-4">Depends on provider data flow, retention, region, and terms.</td><td className="p-4">Can keep inference in a chosen environment; team must secure it.</td></tr>
              <tr><td className="p-4 font-semibold">Customization</td><td className="p-4">Available methods depend on the service.</td><td className="p-4">Weights and runtime may be modifiable if the licence and format allow.</td></tr>
              <tr><td className="p-4 font-semibold">Scaling responsibility</td><td className="p-4">Provider operates capacity; quotas and limits still apply.</td><td className="p-4">Team plans replicas, queues, accelerators, and autoscaling.</td></tr>
              <tr><td className="p-4 font-semibold">Maintenance</td><td className="p-4">Provider maintains serving stack; client integration still changes.</td><td className="p-4">Team patches dependencies, drivers, runtime, weights, and hosts.</td></tr>
              <tr><td className="p-4 font-semibold">Latency</td><td className="p-4">Network, provider queue, region, and model contribute.</td><td className="p-4">Placement is controllable; local queues and hardware contribute.</td></tr>
              <tr><td className="p-4 font-semibold">Cost structure</td><td className="p-4">Often usage or reserved-capacity charges plus data/network terms.</td><td className="p-4">Hardware, idle capacity, engineering, energy, and operations.</td></tr>
              <tr><td className="p-4 font-semibold">Version control</td><td className="p-4">Pin versions where supported and monitor provider changes.</td><td className="p-4">Team chooses exact artifacts and rollout schedule.</td></tr>
              <tr><td className="p-4 font-semibold">Observability</td><td className="p-4">Combine provider telemetry with application measurements.</td><td className="p-4">Team instruments model server, hardware, queue, and application.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <HostedSelfHostedDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Keep secrets and provider details behind the server</h2>
        <p className="leading-relaxed text-slate-700">
          Provider keys belong in a server-side secret manager or protected environment—not JavaScript delivered to
          a browser, a mobile binary, source control, or ordinary logs. Give each service the least access it needs,
          rotate credentials, and make suspected exposure an incident with a revocation path.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Define an internal request and response contract that the application understands. An adapter translates
          that contract to a chosen provider or self-hosted server. Record the actual model and version that served
          each request so a quality change can be traced without leaking unnecessary user content.
        </p>
      </section>

      <CodeBlock
        title="A stable serving boundary"
        description="This is conceptual pseudocode, not a runnable provider integration. APP_TIMEOUT and SERVER_SECRET come from protected server configuration; the exact web framework, retryable-error types, and provider methods must be supplied by the implementation."
        code={deploymentPseudo}
        label="Conceptual server pseudocode · not directly runnable"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Bound failure instead of retrying blindly</h2>
        <p className="leading-relaxed text-slate-700">
          A timeout limits how long the application waits. A retry may help a transient failure, but repeated
          generation can produce a different result, duplicate a billed task, or repeat an external action.
          Retry only classified transient failures, use a small attempt limit with backoff, and attach an
          <strong> idempotency key</strong> when the receiving system supports it so one logical request is not
          processed twice.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Rate limits protect budgets and shared capacity. Concurrency limits cap simultaneous work; queues absorb
          short bursts. Batching can improve accelerator use when similar requests can wait together, while
          streaming can show partial output sooner without reducing total compute. Cache only when inputs,
          permissions, model version, and policy make reuse safe. Do not cache personalized, secret, time-sensitive,
          random, or safety-dependent results under an overly broad key.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked capacity estimate: how many requests are in flight?</h2>
        <Formula title="Little’s-Law-style planning estimate" expression="estimated in-flight concurrency = arrival rate × average processing time">
          <p>
            Suppose production measurements show an average arrival rate of <strong>2 requests per second</strong>
            and an average processing time of <strong>3 seconds per request</strong>. Both numbers are
            <strong> measured averages</strong> over the same stable period. The calculation is 2 × 3 =
            <strong> 6 requests in flight on average</strong>. This helps estimate starting capacity and concurrency
            limits. It is not an autoscaling guarantee: bursts, long-tail latency, failures, batching, hardware
            saturation, and queueing require extra measurement and headroom.
          </p>
        </Formula>
      </section>

      <ProductionReliabilityDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Observe the user service, not only the GPU</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Signal</th><th className="p-4">What it means</th><th className="p-4">Useful breakdowns</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Request and error rate</td><td className="p-4">Traffic arriving and requests ending unsuccessfully</td><td className="p-4">Endpoint, error class, provider, model version</td></tr>
              <tr><td className="p-4 font-semibold">p50 / p95 latency</td><td className="p-4">50% / 95% of requests finish at or below these measured times</td><td className="p-4">Queue, first token, full response, input/output size</td></tr>
              <tr><td className="p-4 font-semibold">Throughput</td><td className="p-4">Successful tasks, outputs, tokens, or media units per time</td><td className="p-4">Workload class, hardware, batch size</td></tr>
              <tr><td className="p-4 font-semibold">Cost per successful task</td><td className="p-4">Total attributable serving cost divided by accepted task completions</td><td className="p-4">Model, provider, retries, cache status</td></tr>
              <tr><td className="p-4 font-semibold">Quality regression</td><td className="p-4">Fixed evaluation or sampled production quality worsens</td><td className="p-4">Prompt version, model version, case slice</td></tr>
              <tr><td className="p-4 font-semibold">Safety failures</td><td className="p-4">A prohibited or harmful output passed or a valid request was wrongly blocked</td><td className="p-4">Policy category and reviewed severity—without unnecessary private text</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Scale and release model versions deliberately</h2>
        <p className="leading-relaxed text-slate-700">
          Autoscaling changes serving capacity in response to signals such as pending requests or hardware use; it
          needs minimum/maximum bounds, warm-up assumptions, and a plan for cold starts. A fallback might use a
          smaller approved model, a read-only experience, a queued job, or a clear unavailable response. It must be
          evaluated too—silently returning a lower-quality unsafe answer is not resilience.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Treat model, prompt, safety policy, and serving configuration as versioned release artifacts. Shadow a new
          version on copied eligible traffic without showing its output, or canary it to a small real-traffic slice.
          Compare errors, latency, cost, quality, and safety against the current version. Define stop conditions and
          a tested rollback before increasing traffic.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Deployment readiness checklist</h2>
        <div className="not-prose grid gap-3 md:grid-cols-2">
          {[
            "Secrets are server-side, access-scoped, rotatable, and absent from ordinary logs.",
            "Model/provider adapters expose a stable request, response, error, and version contract.",
            "Timeout, retry, idempotency, rate, queue, and concurrency behavior is tested.",
            "Caching and streaming decisions match privacy, freshness, randomness, and user experience.",
            "Capacity tests cover ordinary traffic, bursts, cold starts, and long-tail latency.",
            "Dashboards connect reliability, cost, quality, and safety to model and prompt versions.",
            "Canary or shadow criteria, stop conditions, fallback behavior, and rollback are rehearsed.",
            "Logging minimizes sensitive content and has retention, access, and incident rules.",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <p className="text-sm leading-relaxed text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <SummaryTakeaways items={[
        "Deployment turns a working generative workflow into a service that must remain secure, available, observable, affordable, and recoverable.",
        "Choose hosted or self-hosted inference from measured privacy, control, cost, latency, scaling, maintenance, and operating constraints.",
        "Keep provider keys and implementation details behind a stable server-side request and response contract.",
        "Bound timeouts, retries, rate, queues, and concurrency; use idempotency where supported so retries do not duplicate one logical request.",
        "Average in-flight work can be estimated as arrival rate × average processing time, but bursts and long-tail latency still require headroom and measurement.",
        "Observe errors, p50/p95 latency, throughput, cost per successful task, quality regressions, and safety failures by model and prompt version.",
        "Release with shadow or canary evidence, stop conditions, an evaluated fallback, and a tested rollback path.",
      ]} />
    </div>
  );
}

export function GenerativeAIBatchThreeContent() {
  const { topicId = "" } = useParams<{ topicId: string }>();

  if (topicId === "evaluating-generative-models") return <EvaluatingGenerativeModels />;
  if (topicId === "responsible-generative-ai") return <ResponsibleGenerativeAI />;
  if (topicId === "choosing-generative-model") return <ChoosingGenerativeModel />;
  if (topicId === "building-genai-apps") return <BuildingGenerativeAIApplications />;
  if (topicId === "genai-deployment") return <DeployingGenerativeAIApplications />;
  return null;
}
