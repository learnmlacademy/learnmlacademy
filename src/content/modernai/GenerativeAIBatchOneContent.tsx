import { Callout } from "../../components/content/Callout";
import { CodeBlock as SharedCodeBlock } from "../../components/content/CodeBlock";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Code2,
} from "lucide-react";
import {
  DiffusionNoisingDenoisingDiagram,
  DiffusionTrainingGenerationDiagram,
  GANAlternatingUpdatesDiagram,
  GANGameDiagram,
  VAEArchitectureDiagram,
  VAELatentSamplingDiagram,
} from "../../components/diagrams/GenAIBatchTwoDiagrams";
import {
  GenerativeDiscriminativePathsFigure,
  ProbabilityMapFigure,
  RetrievalPredictionGenerationFigure,
  TrainingGenerationLifecycleFigure,
} from "../../components/diagrams/GenAIDiagrams";

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

function Formula({ title, expression, children }: { title: string; expression: string; children: React.ReactNode }) {
  return <FormulaBlock label={title} expression={expression} explanation={children} />;
}

function CodeBlock({
  title,
  description,
  code,
  label = "Python",
}: {
  title: string;
  description: string;
  code: string;
  label?: string;
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

function WhatIsGenerativeAI() {
  const overviewCode = [
    "# Conceptual pseudocode: the model and checks depend on your application.",
    "condition = {",
    "    \"task\": \"write a two-sentence product description\",",
    "    \"facts\": verified_product_facts,",
    "    \"tone\": \"friendly\",",
    "}",
    "",
    "draft = pretrained_model.generate(condition, random_seed=27)",
    "result = verify_facts_and_policy(draft, verified_product_facts)",
    "",
    "if result.is_safe_and_supported:",
    "    publish_for_human_review(draft)",
    "else:",
    "    request_revision(result.problems)",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What changes when a system can create?</h2>
        <Lead>
          Many machine-learning systems choose a label or estimate a number. Generative AI has a different
          goal: it constructs a new candidate—such as a paragraph, picture, sound, video clip, program, or
          structured record—using patterns learned from examples.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          “New” does not mean unrelated to training data. The result is shaped by learned patterns and by the
          request given at use time. Generative models are not simply retrieval systems, but memorization or
          near-verbatim reproduction can occur and must be checked.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          This overview explains what generation is, how it differs from retrieval and ordinary prediction,
          what a pretrained model does at a high level, and where the major model families fit. Lesson 3
          develops distributions, latent spaces, sampling, and conditioning in detail.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What can Generative AI produce?</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-900">
              <tr><th className="p-4">Output type</th><th className="p-4">Example request</th><th className="p-4">Candidate output</th><th className="p-4">What still needs checking</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Text</td><td className="p-4">Draft a support reply</td><td className="p-4">A message in natural language</td><td className="p-4">Facts, tone, policy, and citations</td></tr>
              <tr><td className="p-4 font-semibold">Image</td><td className="p-4">Create three packaging concepts</td><td className="p-4">New pixel arrangements</td><td className="p-4">Brand accuracy, artifacts, rights, and bias</td></tr>
              <tr><td className="p-4 font-semibold">Audio</td><td className="p-4">Read a lesson aloud</td><td className="p-4">A waveform or audio tokens</td><td className="p-4">Pronunciation, consent, and intelligibility</td></tr>
              <tr><td className="p-4 font-semibold">Video</td><td className="p-4">Animate a product demonstration</td><td className="p-4">A sequence of frames, often with sound</td><td className="p-4">Identity, motion, continuity, and safety</td></tr>
              <tr><td className="p-4 font-semibold">Code</td><td className="p-4">Draft a validation function</td><td className="p-4">Program text</td><td className="p-4">Correctness, security, tests, and dependencies</td></tr>
              <tr><td className="p-4 font-semibold">Structured data</td><td className="p-4">Create test orders in a schema</td><td className="p-4">Rows or JSON-shaped records</td><td className="p-4">Schema validity, realism, privacy, and coverage</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <TrainingGenerationLifecycleFigure />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Three systems that can look similar from the outside</h2>
        <p className="leading-relaxed text-slate-700">
          A search box, a fraud model, and a writing assistant may all accept text, but they perform different
          operations. The distinction matters because each system has different evidence and failure modes.
        </p>
        <div className="mt-5">
          <RetrievalPredictionGenerationFigure />
        </div>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-900">
              <tr><th className="p-4">Approach</th><th className="p-4">Main operation</th><th className="p-4">Example</th><th className="p-4">Evidence behind the result</th><th className="p-4">Typical risk</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Retrieval</td><td className="p-4">Find and return an existing item</td><td className="p-4">Find the refund policy paragraph</td><td className="p-4">A stored document or database row</td><td className="p-4">Wrong or outdated item retrieved</td></tr>
              <tr><td className="p-4 font-semibold">Predictive or discriminative ML</td><td className="p-4">Map an input to a label, score, or number</td><td className="p-4">Estimate whether a payment is fraudulent</td><td className="p-4">A learned decision rule evaluated on similar cases</td><td className="p-4">Incorrect prediction or distribution shift</td></tr>
              <tr><td className="p-4 font-semibold">Generative AI</td><td className="p-4">Construct a candidate output</td><td className="p-4">Draft a refund explanation using approved facts</td><td className="p-4">Learned patterns plus supplied conditions</td><td className="p-4">Unsupported, unsafe, biased, or memorized content</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Prompt, condition, and starting signal</h2>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <div className={"rounded-xl border p-5 " + toneClasses.amber}>
            <h3 className="font-bold">Prompt</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Instructions or context, usually written as text, supplied at use time.</p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}>
            <h3 className="font-bold">Condition</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Any information that guides the output: a prompt, class, image, mask, audio clip, or partial sequence.</p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.sky}>
            <h3 className="font-bold">Starting signal</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">The initial input to generation, such as random noise, a first token, a latent vector, or a partly completed artifact.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Training a model versus using one</h2>
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <h3 className="font-bold text-indigo-950">Training</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Developers supply examples and a learning objective. An optimizer repeatedly changes model
              parameters. This can require large datasets, specialized hardware, and long-running jobs.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-bold text-emerald-950">Using a pretrained model</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              The saved parameters normally remain fixed. A user or application supplies a condition and the
              model generates an output. Prompting is use-time guidance; it is not the same as retraining.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A map of four major model families</h2>
        <p className="leading-relaxed text-slate-700">
          These labels describe different generation mechanisms. They are orientation points here, not
          complete lessons.
        </p>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <Link to="/learn/llm-intro" className={"rounded-xl border p-5 transition hover:shadow-md " + toneClasses.sky}>
            <h3 className="font-bold">Autoregressive</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Creates one part at a time and uses earlier parts to help choose the next, as in next-token text generation.</p>
          </Link>
          <Link to="/learn/vae" className={"rounded-xl border p-5 transition hover:shadow-md " + toneClasses.violet}>
            <h3 className="font-bold">Variational Autoencoder (VAE)</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Samples a compact latent representation and decodes it into a new output.</p>
          </Link>
          <Link to="/learn/gans" className={"rounded-xl border p-5 transition hover:shadow-md " + toneClasses.rose}>
            <h3 className="font-bold">Generative Adversarial Network (GAN)</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Improves a generator through competition with a discriminator that learns to detect fakes.</p>
          </Link>
          <Link to="/learn/diffusion-models" className={"rounded-xl border p-5 transition hover:shadow-md " + toneClasses.indigo}>
            <h3 className="font-bold">Diffusion</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Starts from noise and repeatedly denoises it until a structured sample appears.</p>
          </Link>
        </div>
      </section>

      <CodeBlock
        title="How a Generative AI feature fits into an application"
        description="This is conceptual pseudocode, not a provider-specific runnable program. It separates trusted facts, generation, verification, and human review instead of treating the model output as automatically correct."
        code={overviewCode}
        label="Conceptual pseudocode"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Where generation helps—and where caution is required</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Strength</th><th className="p-4">Useful application</th><th className="p-4">Limitation to manage</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4">Produces many candidate drafts quickly</td><td className="p-4">Writing, design exploration, code scaffolding</td><td className="p-4">Hallucinated facts and plausible-looking errors require verification</td></tr>
              <tr><td className="p-4">Adapts output to a condition</td><td className="p-4">Personalized explanations and controlled media</td><td className="p-4">The condition influences output but does not guarantee compliance</td></tr>
              <tr><td className="p-4">Can model rare or simulated situations</td><td className="p-4">Synthetic data and scenario testing</td><td className="p-4">Bias or missing cases in training data can be reproduced or amplified</td></tr>
              <tr><td className="p-4">Works across multiple modalities</td><td className="p-4">Text, image, audio, video, code, and structured data workflows</td><td className="p-4">Compute, latency, energy use, privacy, and moderation costs can be substantial</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Warning title="Generation is not automatic truth or automatic originality">
        <p>
          Check important claims against trusted evidence. Test for bias and unsafe outputs. Protect private
          prompts and training records. Compare outputs with training data when memorization matters, and give
          people a way to edit, reject, or escalate the result.
        </p>
      </Warning>

      <SummaryTakeaways items={[
        "Generative AI constructs new candidate content from patterns learned in examples; it does not simply retrieve an existing item.",
        "Retrieval returns stored evidence, predictive ML maps an input to a label or number, and generation creates a new candidate output.",
        "A prompt is one kind of condition, while a starting signal may be noise, a token, a latent vector, or a partly completed artifact.",
        "Training changes model parameters with examples and an objective; using a pretrained model normally keeps those parameters fixed.",
        "Autoregressive models, VAEs, GANs, and diffusion models generate through different mechanisms rather than one universal process.",
        "Flexible creation still requires checks for unsupported facts, memorization, bias, privacy, safety, latency, cost, and appropriate human review.",
      ]} />
    </div>
  );
}

function GenerativeVsDiscriminative() {
  const probabilityCode = [
    "total = 100",
    "spam = 40",
    "offer = 36",
    "spam_and_offer = 30",
    "",
    "p_x = offer / total",
    "p_y = spam / total",
    "p_x_and_y = spam_and_offer / total",
    "p_x_given_y = spam_and_offer / spam",
    "p_y_given_x = spam_and_offer / offer",
    "",
    "print(p_x, p_y, p_x_and_y, p_x_given_y, p_y_given_x)",
    "# 0.36 0.40 0.30 0.75 0.8333333333333334",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Two useful goals, not two competing buzzwords</h2>
        <Lead>
          A discriminative model learns the rule needed to predict a target from an observed input. A
          generative model learns enough about how data occurs to represent or create possible samples. The
          best choice depends on the job: deciding, estimating, creating, filling missing information, or
          combining several of those tasks.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Discriminative does not mean “classification only.” A discriminative regression model can map a
          house description to a continuous price. Generative does not mean “images only.” A generator may
          produce text, audio, rows, sequences, or other data.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Read the probability notation one piece at a time</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.sky}><h3 className="font-bold">x — the input or observed data</h3><p className="mt-2 text-sm text-slate-700">Example: whether an email contains the word “offer,” plus its other measured features.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.amber}><h3 className="font-bold">y — the target</h3><p className="mt-2 text-sm text-slate-700">Example: spam or legitimate. For regression, y could instead be a number such as price.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.indigo}><h3 className="font-bold">p(y | x) — target given input</h3><p className="mt-2 text-sm text-slate-700">After observing x, how likely is each y? This is the usual discriminative direction.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}><h3 className="font-bold">p(x) and p(x, y) — data and joint patterns</h3><p className="mt-2 text-sm text-slate-700">p(x) describes inputs. p(x, y) describes inputs and targets occurring together.</p></div>
          <div className={"rounded-xl border p-5 md:col-span-2 " + toneClasses.emerald}><h3 className="font-bold">p(x | y) — input given a target</h3><p className="mt-2 text-sm text-slate-700">Within a chosen class y, how likely is an input pattern x? A class-conditional generator can use this direction to create an example belonging to y.</p></div>
        </div>
      </section>

      <GenerativeDiscriminativePathsFigure />

      <Formula title="Discriminative mapping" expression="p(y | x)">
        <p>
          Read this as “the probability of target y after input x is known.” A spam detector can estimate this
          quantity directly without modelling every possible way an email might be written.
        </p>
      </Formula>

      <Formula title="One generative route to classification" expression="p(y | x) = p(x | y) × p(y) / p(x)">
        <p>
          p(y) is the prior frequency of a class. p(x | y) describes the input inside that class. p(x) makes
          the probabilities normalize correctly. A generative classifier can learn these quantities and then
          calculate p(y | x). Modern generators may instead learn an implicit sampling process and never
          expose a tractable numerical likelihood.
        </p>
      </Formula>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked example: the word “offer” in 100 emails</h2>
        <p className="leading-relaxed text-slate-700">
          The following counts are observed data, not model outputs. Let x mean “the email contains offer,” and
          let y mean “the email is spam.”
        </p>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[620px] text-center text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4 text-left">Observed class</th><th className="p-4">Contains “offer”</th><th className="p-4">Does not contain “offer”</th><th className="p-4">Row total</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 text-left font-semibold">Spam</td><td className="p-4">30</td><td className="p-4">10</td><td className="p-4">40</td></tr>
              <tr><td className="p-4 text-left font-semibold">Legitimate</td><td className="p-4">6</td><td className="p-4">54</td><td className="p-4">60</td></tr>
              <tr className="font-semibold"><td className="p-4 text-left">Column total</td><td className="p-4">36</td><td className="p-4">64</td><td className="p-4">100</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <ProbabilityMapFigure />
        </div>
        <div className="not-prose mt-5 space-y-3">
          {[
            ["1. p(x) = 36 / 100 = 0.36", "Thirty spam plus six legitimate emails contain “offer,” so 36 of 100 observed inputs have x."],
            ["2. p(y) = 40 / 100 = 0.40", "Forty of the 100 emails are spam, so the prior probability of spam is 0.40."],
            ["3. p(x, y) = 30 / 100 = 0.30", "Thirty emails are both spam and contain “offer.” This is a joint probability."],
            ["4. p(x | y) = 30 / 40 = 0.75", "Among the 40 spam emails, 30 contain “offer.” This describes x inside the spam class."],
            ["5. p(y | x) = 30 / 36 = 0.833", "Among the 36 emails containing “offer,” 30 are spam. The discriminative prediction is therefore about 83.3% spam for this one-feature example."],
          ].map(([heading, body]) => (
            <div key={heading} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">{heading}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 leading-relaxed text-slate-700">
          A discriminative model may learn the final 83.3% mapping directly. A simple generative classifier may
          learn class frequencies and within-class word patterns, then reach the same conditional result using
          Bayes’ rule. A content generator would need far richer patterns than this one-word table.
        </p>
      </section>

      <CodeBlock
        title="Reproduce every probability"
        description="This self-contained Python calculation uses only the four counts shown in the table. Each division matches one numbered step above."
        code={probabilityCode}
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Comparison and decision guide</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Question</th><th className="p-4">Discriminative modelling</th><th className="p-4">Generative modelling</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Primary job</td><td className="p-4">Predict y from observed x</td><td className="p-4">Represent or sample possible x values, optionally conditioned on y or other information</td></tr>
              <tr><td className="p-4 font-semibold">Typical output</td><td className="p-4">Class, probability, score, or continuous value</td><td className="p-4">A new sample, reconstruction, completion, or sometimes a class prediction</td></tr>
              <tr><td className="p-4 font-semibold">When it is enough</td><td className="p-4">The product only needs an accurate decision or numeric estimate</td><td className="p-4">Not necessary merely because the data is complex</td></tr>
              <tr><td className="p-4 font-semibold">What it adds</td><td className="p-4">Often simpler and more directly optimized for prediction</td><td className="p-4">Creation, simulation, missing-data modelling, representation learning, or multiple downstream uses</td></tr>
              <tr><td className="p-4 font-semibold">Important caveat</td><td className="p-4">May not explain how inputs themselves occur</td><td className="p-4">Can be harder to train and evaluate; not every model has an explicit likelihood</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "A discriminative model directly learns the prediction direction p(y | x): the target after the input is known.",
        "A generative model represents how data occurs through quantities such as p(x), p(x, y), or p(x | y), or through an implicit sampling process.",
        "Discriminative models can output continuous values as well as classes, and generative models can also support classification.",
        "In the email example, 30 of the 36 messages containing ‘offer’ are spam, so p(spam | offer) = 30 / 36 ≈ 0.833.",
        "Use discriminative modelling when the real requirement is an accurate label, score, or numerical estimate.",
        "Choose generative modelling when creation, simulation, missing-data modelling, representation learning, or sampling the data process adds useful value.",
      ]} />
    </div>
  );
}

function VAEContent() {
  const vaeCode = [
    "import torch",
    "from torch import nn",
    "from torch.nn import functional as F",
    "",
    "torch.manual_seed(7)",
    "",
    "class TinyVAE(nn.Module):",
    "    def __init__(self):",
    "        super().__init__()",
    "        self.encoder = nn.Sequential(nn.Linear(4, 8), nn.ReLU())",
    "        self.to_mu = nn.Linear(8, 2)",
    "        self.to_logvar = nn.Linear(8, 2)",
    "        self.decoder = nn.Sequential(nn.Linear(2, 8), nn.ReLU(), nn.Linear(8, 4))",
    "",
    "    def forward(self, x):",
    "        hidden = self.encoder(x)",
    "        mu = self.to_mu(hidden)",
    "        logvar = self.to_logvar(hidden)",
    "        std = torch.exp(0.5 * logvar)",
    "        epsilon = torch.randn_like(std)",
    "        z = mu + std * epsilon",
    "        reconstruction_logits = self.decoder(z)",
    "        return reconstruction_logits, mu, logvar, z",
    "",
    "model = TinyVAE()",
    "optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)",
    "x = torch.tensor([[1., 0., 1., 0.], [0., 1., 0., 1.]])",
    "",
    "logits, mu, logvar, z = model(x)",
    "reconstruction = F.binary_cross_entropy_with_logits(logits, x, reduction=\"sum\") / x.size(0)",
    "kl = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp()) / x.size(0)",
    "loss = reconstruction + kl",
    "",
    "optimizer.zero_grad()",
    "loss.backward()",
    "optimizer.step()",
    "",
    "print({\"reconstruction\": reconstruction.item(), \"kl\": kl.item(), \"total\": loss.item()})",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The prerequisite—and the new question</h2>
        <Lead>
          An ordinary autoencoder learns to compress an input and reconstruct it. Review{" "}
          <Link to="/learn/autoencoders" className="font-semibold text-indigo-700">
            Autoencoders and Their Variants
          </Link>{" "}
          first if encoder, bottleneck, decoder, or reconstruction is unfamiliar. This lesson asks the next
          question: how can we organize that bottleneck so that sampling a new point produces a meaningful new
          output?
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          A Variational Autoencoder, or VAE, makes the encoder describe a probability distribution instead of
          assigning each input one fixed latent point. It then samples from that distribution during training
          and encourages all input distributions to fit into an organized shared latent space.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Deterministic autoencoder versus VAE</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Question</th><th className="p-4">Deterministic autoencoder</th><th className="p-4">Variational Autoencoder</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Encoder output</td><td className="p-4">One fixed latent vector</td><td className="p-4">Parameters μ and log σ² describing a distribution</td></tr>
              <tr><td className="p-4 font-semibold">Latent value used</td><td className="p-4">The encoder vector itself</td><td className="p-4">A sampled z calculated from μ, σ, and random ε</td></tr>
              <tr><td className="p-4 font-semibold">Training pressure</td><td className="p-4">Reconstruct the input</td><td className="p-4">Reconstruct while keeping latent distributions near a simple prior</td></tr>
              <tr><td className="p-4 font-semibold">Sampling unseen points</td><td className="p-4">May land in gaps the decoder never learned</td><td className="p-4">More likely to land in a smooth, trained region</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <VAEArchitectureDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The four values in reparameterization</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.violet}><h3 className="font-bold">μ (mu): learned centre</h3><p className="mt-2 text-sm text-slate-700">The encoder calculates one mean for each latent dimension and each input.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}><h3 className="font-bold">log σ²: learned log-variance</h3><p className="mt-2 text-sm text-slate-700">The encoder outputs log-variance because it can be any real number; exponentiation converts it to positive variance.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.amber}><h3 className="font-bold">ε (epsilon): sampled noise</h3><p className="mt-2 text-sm text-slate-700">The framework draws ε from a standard normal distribution. It is random and is not a learned parameter.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.emerald}><h3 className="font-bold">z: calculated latent sample</h3><p className="mt-2 text-sm text-slate-700">z combines the learned centre and spread with ε. The decoder receives z.</p></div>
        </div>
      </section>

      <Formula title="Convert log-variance to standard deviation" expression="σ = exp(0.5 × log σ²)">
        <p>
          Half converts log variance into log standard deviation because variance equals σ². Exponentiation
          then produces the positive standard deviation used to scale the random draw.
        </p>
      </Formula>

      <Formula title="The reparameterization trick" expression="ε ~ N(0, I)     and     z = μ + σ ⊙ ε">
        <p>
          N(0, I) is a standard normal distribution with zero mean and unit variance. ⊙ means element-by-element
          multiplication. Randomness enters through ε, while z remains a differentiable calculation involving
          μ and σ, so backpropagation can train the encoder.
        </p>
      </Formula>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked example: calculate a two-dimensional z</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Value</th><th className="p-4">Numbers</th><th className="p-4">Source</th><th className="p-4">Meaning</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">μ</td><td className="p-4">[0.5, -1.0]</td><td className="p-4">Calculated by the learned encoder</td><td className="p-4">Centre of this input’s latent distribution</td></tr>
              <tr><td className="p-4 font-semibold">log σ²</td><td className="p-4">[-1.3863, 1.3863]</td><td className="p-4">Calculated by the learned encoder</td><td className="p-4">Logs of variances 0.25 and 4.00</td></tr>
              <tr><td className="p-4 font-semibold">σ</td><td className="p-4">[0.5, 2.0]</td><td className="p-4">Calculated as exp(0.5 × log σ²)</td><td className="p-4">Standard deviation in each dimension</td></tr>
              <tr><td className="p-4 font-semibold">ε</td><td className="p-4">[0.4, -0.3]</td><td className="p-4">One sampled standard-normal draw, fixed here for reproducibility</td><td className="p-4">Random offset before scaling</td></tr>
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-mono text-sm text-slate-900">z = [0.5, -1.0] + [0.5, 2.0] ⊙ [0.4, -0.3]</p>
          <p className="mt-2 font-mono text-sm text-slate-900">z = [0.5 + 0.2, -1.0 - 0.6] = [0.7, -1.6]</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            The first coordinate moved 0.2 above its mean; the second moved 0.6 below its mean. The decoder
            receives [0.7, -1.6], not μ or ε separately.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Why a VAE needs two loss terms</h2>
        <Formula title="Training objective" expression="L_VAE = L_reconstruction + β × D_KL(q(z | x) || p(z))">
          <p>
            L_reconstruction measures how well the decoded output x̂ matches input x. The KL-divergence term
            measures how far the encoder distribution q(z | x) is from a simple prior p(z), usually N(0, I).
            β is a developer-chosen weight; ordinary VAE training commonly starts with β = 1.
          </p>
        </Formula>
        <div className="mt-5 space-y-4">
          <p className="leading-relaxed text-slate-700">
            Minimizing reconstruction alone can create isolated latent islands: excellent for known inputs,
            unreliable for points sampled between them. The KL term pulls distributions toward a shared prior,
            discouraging holes and making nearby samples more meaningful.
          </p>
          <p className="leading-relaxed text-slate-700">
            The same idea is often expressed by maximizing the Evidence Lower Bound, or ELBO. In beginner
            language: reward likely reconstructions while penalizing an irregular latent distribution. Training
            code usually minimizes the negative ELBO, which becomes reconstruction loss plus KL loss.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Continue the numerical example through the loss</h2>
        <p className="leading-relaxed text-slate-700">
          Suppose the input is x = [1, 0] and the decoder produces x̂ = [0.8, 0.1]. Using mean squared error,
          the reconstruction term is ((1 - 0.8)² + (0 - 0.1)²) / 2 = (0.04 + 0.01) / 2 = 0.025.
        </p>
        <Formula title="KL term for a diagonal Gaussian" expression="D_KL = -0.5 × Σ(1 + log σ² - μ² - exp(log σ²))">
          <p>
            Using μ and log σ² from the table gives approximately 0.443 for the first dimension and 1.307 for
            the second, so KL ≈ 1.750. With β = 1, total loss = 0.025 + 1.750 = 1.775. The large KL term says
            this example’s latent distribution is still far from the standard-normal prior.
          </p>
        </Formula>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Reconstruction, generation, and interpolation</h2>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <div className={"rounded-xl border p-5 " + toneClasses.sky}><h3 className="font-bold">Reconstruction</h3><p className="mt-2 text-sm text-slate-700">Encode an existing x, sample near its μ, and decode. The result should resemble that input.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.emerald}><h3 className="font-bold">Generation</h3><p className="mt-2 text-sm text-slate-700">Sample z directly from the prior N(0, I) and decode it. No input example is encoded first.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}><h3 className="font-bold">Interpolation</h3><p className="mt-2 text-sm text-slate-700">Move gradually between two latent points and decode the intermediate points to observe smooth feature changes.</p></div>
        </div>
      </section>

      <VAELatentSamplingDiagram />

      <CodeBlock
        title="A complete one-step VAE mechanism"
        description="This runnable PyTorch example uses two four-value binary samples and a two-dimensional latent space. It shows where μ, log-variance, ε, z, reconstruction loss, and KL loss appear in one optimizer step."
        code={vaeCode}
        label="Python · requires PyTorch"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Trade-offs and failure modes</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Symptom</th><th className="p-4">Likely pressure</th><th className="p-4">Meaning or diagnostic</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Sharp reconstructions but poor random samples</td><td className="p-4">Reconstruction dominates</td><td className="p-4">Latent regions may be irregular or contain gaps</td></tr>
              <tr><td className="p-4 font-semibold">Smooth samples but blurry reconstructions</td><td className="p-4">KL pressure is strong or decoder likelihood is simple</td><td className="p-4">The organized space costs some detail</td></tr>
              <tr><td className="p-4 font-semibold">Posterior collapse</td><td className="p-4">Decoder ignores z; KL falls near zero</td><td className="p-4">Check whether changing z changes outputs; KL warm-up or a weaker decoder may help</td></tr>
              <tr><td className="p-4 font-semibold">β-VAE with β above 1</td><td className="p-4">Stronger latent regularization</td><td className="p-4">May separate factors more clearly but can reduce reconstruction quality</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "A VAE encodes each input as a latent distribution described by μ and log σ² instead of one fixed latent point.",
        "The standard deviation is calculated as σ = exp(0.5 × log σ²), while ε is random noise sampled from N(0, I).",
        "Reparameterization uses z = μ + σ ⊙ ε so randomness enters through ε while gradients can still train the encoder.",
        "The VAE objective combines reconstruction loss with β-weighted KL divergence to balance detail against an organized latent space.",
        "Reconstruction starts from an input, generation samples z directly from the prior, and interpolation decodes points between latent locations.",
        "Too little latent regularization can leave gaps; too much can blur reconstructions, and posterior collapse means the decoder ignores z.",
        "A VAE is useful when a smooth, sampleable representation matters, but its generated fine detail may be softer than other model families.",
      ]} />
    </div>
  );
}

function GANContent() {
  const ganCode = [
    "import torch",
    "from torch import nn",
    "",
    "torch.manual_seed(4)",
    "G = nn.Sequential(nn.Linear(1, 16), nn.ReLU(), nn.Linear(16, 1))",
    "D = nn.Sequential(nn.Linear(1, 16), nn.LeakyReLU(0.2), nn.Linear(16, 1), nn.Sigmoid())",
    "g_optimizer = torch.optim.Adam(G.parameters(), lr=1e-3)",
    "d_optimizer = torch.optim.Adam(D.parameters(), lr=1e-3)",
    "bce = nn.BCELoss()",
    "",
    "for step in range(1000):",
    "    real = 3.0 + 0.5 * torch.randn(64, 1)  # data-supplied distribution",
    "    z = torch.randn(64, 1)                 # sampled generator input",
    "    fake = G(z)",
    "",
    "    # Phase 1: update D only.",
    "    d_optimizer.zero_grad()",
    "    d_real = D(real)",
    "    d_fake = D(fake.detach())              # no gradient enters G",
    "    d_loss = bce(d_real, torch.ones_like(d_real)) + bce(d_fake, torch.zeros_like(d_fake))",
    "    d_loss.backward()",
    "    d_optimizer.step()",
    "",
    "    # Phase 2: update G while D acts as a fixed differentiable judge.",
    "    for parameter in D.parameters():",
    "        parameter.requires_grad_(False)",
    "    g_optimizer.zero_grad()",
    "    d_fake_for_g = D(fake)",
    "    g_loss = bce(d_fake_for_g, torch.ones_like(d_fake_for_g))",
    "    g_loss.backward()",
    "    g_optimizer.step()",
    "    for parameter in D.parameters():",
    "        parameter.requires_grad_(True)",
    "",
    "print(\"generated mean:\", G(torch.randn(2000, 1)).mean().item())",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A generator improves because another network challenges it</h2>
        <Lead>
          A Generative Adversarial Network, or GAN, trains two neural networks with opposing jobs. The
          generator converts random input into fake samples. The discriminator receives real and fake samples
          and estimates whether each one came from the real dataset.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Neither network receives a ready-made rule for drawing a face, shoe, or waveform. The discriminator’s
          changing feedback becomes the generator’s learning signal. This is why GAN training is an
          alternating game rather than one ordinary prediction update.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Terms to identify before following the loop</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.amber}><h3 className="font-bold">z — random latent or noise vector</h3><p className="mt-2 text-sm text-slate-700">Sampled from a developer-chosen distribution. It gives the generator different starting points.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}><h3 className="font-bold">G(z) — generated sample</h3><p className="mt-2 text-sm text-slate-700">Calculated by the generator using z and its learned parameters.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.sky}><h3 className="font-bold">x — real sample</h3><p className="mt-2 text-sm text-slate-700">Drawn from the training dataset. The discriminator label 1 is supplied by the training procedure.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.indigo}><h3 className="font-bold">D(sample) — probability of real</h3><p className="mt-2 text-sm text-slate-700">A learned number between 0 and 1. A value near 1 means D currently believes the sample is real.</p></div>
        </div>
      </section>

      <GANGameDiagram />

      <Formula title="Discriminator binary-cross-entropy loss" expression="L_D = -mean(log D(x)) - mean(log(1 - D(G(z))))">
        <p>
          The first term rewards probabilities near 1 for real samples. The second rewards probabilities near
          0 for generated samples. During this phase, G(z) is detached, so only discriminator parameters
          receive gradients and change.
        </p>
      </Formula>

      <Formula title="Non-saturating generator loss" expression="L_G = -mean(log D(G(z)))">
        <p>
          During the generator phase, fake samples are given target 1. The discriminator participates in the
          calculation but its optimizer is not stepped; the gradient tells G how to change its output so D is
          more likely to call it real. This form usually gives a stronger early learning signal than minimizing
          log(1 - D(G(z))).
        </p>
      </Formula>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked loss calculation with one real and one fake sample</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Value</th><th className="p-4">Number</th><th className="p-4">Source</th><th className="p-4">Interpretation</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Real label</td><td className="p-4">1</td><td className="p-4">Assigned by the training procedure</td><td className="p-4">This sample came from the dataset</td></tr>
              <tr><td className="p-4 font-semibold">D(x)</td><td className="p-4">0.90</td><td className="p-4">Calculated by D for the real sample</td><td className="p-4">D is confidently correct</td></tr>
              <tr><td className="p-4 font-semibold">Fake label for D</td><td className="p-4">0</td><td className="p-4">Assigned by the training procedure</td><td className="p-4">This sample came from G</td></tr>
              <tr><td className="p-4 font-semibold">D(G(z))</td><td className="p-4">0.20</td><td className="p-4">Calculated by D for the fake sample</td><td className="p-4">D gives only 20% probability of real</td></tr>
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
            <h3 className="font-bold text-sky-950">Discriminator phase</h3>
            <p className="mt-2 font-mono text-sm text-slate-900">L_D = -ln(0.90) - ln(1 - 0.20)</p>
            <p className="mt-1 font-mono text-sm text-slate-900">= 0.105 + 0.223 = 0.328</p>
            <p className="mt-3 text-sm text-slate-700">The small loss reflects two mostly correct decisions.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <h3 className="font-bold text-violet-950">Generator phase</h3>
            <p className="mt-2 text-sm text-slate-700">Suppose a fresh pass gives D(G(z)) = 0.30.</p>
            <p className="mt-1 font-mono text-sm text-slate-900">L_G = -ln(0.30) = 1.204</p>
            <p className="mt-3 text-sm text-slate-700">The high loss tells G that its sample still looks fake to D.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">One alternating training step</h2>
        <div className="not-prose space-y-3">
          {[
            ["1. Sample inputs", "Read a real batch x from the dataset and sample z from the chosen noise prior."],
            ["2. Create fakes", "Calculate fake = G(z). The generator parameters are used, but no update has happened yet."],
            ["3. Update D", "Clear D gradients. Evaluate D(x) and D(fake.detach()). Calculate labels 1 and 0, backpropagate L_D, and step only D’s optimizer."],
            ["4. Why detach?", "detach keeps the discriminator update from sending gradients into G. The fake values remain the same; their connection to G’s computation graph is removed for this phase."],
            ["5. Update G", "Clear G gradients. Evaluate D(fake) without detaching, use target 1, backpropagate L_G through D into G, and step only G’s optimizer."],
            ["6. Repeat and monitor", "Use fresh batches and noise. Track losses, D probabilities, sample quality, and sample diversity rather than trusting one loss number."],
          ].map(([heading, body]) => (
            <div key={heading} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">{heading}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <GANAlternatingUpdatesDiagram />

      <CodeBlock
        title="A runnable one-dimensional GAN"
        description="This PyTorch example learns to generate numbers resembling a real normal distribution centred near 3. It is intentionally small, but the detach and two optimizer phases are the same ideas used in image GANs."
        code={ganCode}
        label="Python · requires PyTorch"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Equilibrium, conditioning, and later variants</h2>
        <p className="leading-relaxed text-slate-700">
          In the idealized equilibrium, the generated distribution matches the real one and D cannot reliably
          distinguish them, so D outputs about 0.5. This does not mean both networks failed; it means the fake
          samples are indistinguishable under the learned test. Real training may cycle or diverge instead of
          reaching that point.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          A conditional GAN supplies extra information such as a class label to G and D, allowing requests like
          “generate class 7.” Wasserstein GANs replace the original discriminator score and objective with a
          critic-based formulation designed to improve gradients; treat WGAN as a later stabilization method,
          not as part of the basic BCE calculation above.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Common failures and useful diagnostics</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Failure</th><th className="p-4">What it looks like</th><th className="p-4">What to inspect</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Mode collapse</td><td className="p-4">Many z values produce nearly identical outputs</td><td className="p-4">Sample diversity across a fixed grid of noise vectors</td></tr>
              <tr><td className="p-4 font-semibold">Discriminator dominates</td><td className="p-4">D rejects nearly every fake; G receives weak or unstable gradients</td><td className="p-4">D(G(z)), gradient norms, update ratio, capacity, and learning rates</td></tr>
              <tr><td className="p-4 font-semibold">Oscillation</td><td className="p-4">Quality improves and collapses repeatedly</td><td className="p-4">Fixed-noise samples over time, optimizer settings, and architecture balance</td></tr>
              <tr><td className="p-4 font-semibold">Memorization</td><td className="p-4">Generated samples are too close to training examples</td><td className="p-4">Nearest-neighbour comparisons and duplicate-heavy training data</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "A GAN pairs a generator that turns random z into fake samples with a discriminator that estimates whether samples are real.",
        "Training alternates two updates rather than optimizing both networks as one ordinary prediction step.",
        "During the discriminator update, real samples use target 1 and detached fake samples use target 0, so only D changes.",
        "During the generator update, the fake remains connected to G and uses target 1 through a temporarily fixed D, so only G changes.",
        "At ideal equilibrium, generated and real distributions match and D outputs about 0.5 because it cannot reliably distinguish them.",
        "Loss values alone are insufficient; monitor fixed-noise samples, discriminator probabilities, gradients, quality, and diversity.",
        "Mode collapse, discriminator dominance, oscillation, and memorization are central GAN failure modes to diagnose.",
      ]} />
    </div>
  );
}

function DiffusionContent() {
  const forwardCode = [
    "import torch",
    "",
    "def add_noise(x0, alpha_bar_t, epsilon):",
    "    signal_scale = torch.sqrt(alpha_bar_t)",
    "    noise_scale = torch.sqrt(1.0 - alpha_bar_t)",
    "    xt = signal_scale * x0 + noise_scale * epsilon",
    "    return xt",
    "",
    "x0 = torch.tensor([0.8])                 # data-supplied clean value",
    "alpha_bar_t = torch.tensor(0.64)         # calculated from chosen schedule",
    "epsilon = torch.tensor([-0.5])           # fixed sampled noise for this demo",
    "xt = add_noise(x0, alpha_bar_t, epsilon)",
    "print(xt.item())                         # approximately 0.34",
  ].join("\n");

  const trainingPseudo = [
    "# PyTorch-style training pseudocode: model and schedule are application-specific.",
    "for x0 in training_loader:",
    "    t = sample_timesteps(batch_size)             # developer-defined range",
    "    epsilon = torch.randn_like(x0)                # sampled target noise",
    "    xt = schedule.add_noise(x0, epsilon, t)       # calculated noisy sample",
    "    epsilon_hat = model(xt, t, condition=None)    # learned prediction",
    "    loss = mse(epsilon_hat, epsilon)",
    "",
    "    optimizer.zero_grad()",
    "    loss.backward()",
    "    optimizer.step()",
  ].join("\n");

  const samplingPseudo = [
    "# Scheduler-based generation pseudocode.",
    "xt = torch.randn(output_shape)                    # sampled starting noise",
    "for t in schedule.timesteps_from_T_to_0:",
    "    epsilon_hat = model(xt, t, condition=None)    # or supply a condition",
    "    xt = schedule.reverse_step(xt, epsilon_hat, t)",
    "generated_sample = xt",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Learning to generate by learning to remove noise</h2>
        <Lead>
          A diffusion model turns a difficult generation problem into many smaller denoising problems. During
          training, we deliberately corrupt real samples with known Gaussian noise. A neural network learns to
          predict that noise at different corruption levels. During generation, we begin with random noise and
          repeatedly use those predictions to move toward a structured sample.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Text prompts are optional conditioning, not a defining property of every diffusion model. An
          unconditional model can learn to generate without text. Lesson 7 explains how latent diffusion and
          Stable Diffusion add text encoders, latent representations, and other architecture choices.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Symbols and where they come from</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Symbol</th><th className="p-4">Meaning</th><th className="p-4">Source</th><th className="p-4">Role</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">x₀</td><td className="p-4">Clean sample</td><td className="p-4">Training dataset</td><td className="p-4">Signal we deliberately corrupt</td></tr>
              <tr><td className="p-4 font-semibold">t</td><td className="p-4">Noise timestep from 1 to T</td><td className="p-4">Sampled during training; iterated backward during generation</td><td className="p-4">Tells the model how noisy xₜ is</td></tr>
              <tr><td className="p-4 font-semibold">βₜ</td><td className="p-4">Small noise amount assigned to step t</td><td className="p-4">Developer-chosen or configured schedule</td><td className="p-4">Controls how quickly signal is destroyed</td></tr>
              <tr><td className="p-4 font-semibold">αₜ</td><td className="p-4">1 - βₜ</td><td className="p-4">Calculated</td><td className="p-4">Fraction of signal retained at one step</td></tr>
              <tr><td className="p-4 font-semibold">ᾱₜ</td><td className="p-4">Product α₁ × ... × αₜ</td><td className="p-4">Calculated from the schedule</td><td className="p-4">Total signal retained by timestep t</td></tr>
              <tr><td className="p-4 font-semibold">ε</td><td className="p-4">Gaussian noise</td><td className="p-4">Randomly sampled from N(0, I)</td><td className="p-4">Known training target added to x₀</td></tr>
              <tr><td className="p-4 font-semibold">ε̂θ(xₜ, t)</td><td className="p-4">Predicted noise</td><td className="p-4">Calculated by the learned neural network</td><td className="p-4">Used in the loss and reverse step</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <DiffusionNoisingDenoisingDiagram />

      <Formula title="Noise schedule definitions" expression="αₜ = 1 - βₜ     and     ᾱₜ = ∏ from s=1 to t of αₛ">
        <p>
          A small βₜ adds a small amount of uncertainty at one step. Multiplying the α values gives ᾱₜ, the
          cumulative signal fraction after t steps. Early timesteps retain more signal; later timesteps retain
          less.
        </p>
      </Formula>

      <Formula title="Jump directly from x₀ to any timestep t" expression="xₜ = √ᾱₜ × x₀ + √(1 - ᾱₜ) × ε">
        <p>
          √ᾱₜ scales the clean signal. √(1 - ᾱₜ) scales newly sampled Gaussian noise. This direct equation
          lets training create a noisy example at a randomly chosen timestep without simulating every earlier
          noising step.
        </p>
      </Formula>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked noising example with one value</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Value</th><th className="p-4">Number</th><th className="p-4">Status</th><th className="p-4">Meaning</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">x₀</td><td className="p-4">0.80</td><td className="p-4">Data-supplied</td><td className="p-4">One normalized clean data value</td></tr>
              <tr><td className="p-4 font-semibold">t</td><td className="p-4">A step whose ᾱₜ = 0.64</td><td className="p-4">Timestep sampled; ᾱₜ calculated</td><td className="p-4">64% cumulative signal coefficient before square root</td></tr>
              <tr><td className="p-4 font-semibold">ε</td><td className="p-4">-0.50</td><td className="p-4">Randomly sampled, then fixed for this example</td><td className="p-4">Known noise target</td></tr>
              <tr><td className="p-4 font-semibold">√ᾱₜ</td><td className="p-4">0.80</td><td className="p-4">Calculated as √0.64</td><td className="p-4">Signal scale</td></tr>
              <tr><td className="p-4 font-semibold">√(1 - ᾱₜ)</td><td className="p-4">0.60</td><td className="p-4">Calculated as √0.36</td><td className="p-4">Noise scale</td></tr>
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-mono text-sm text-slate-900">xₜ = 0.80 × 0.80 + 0.60 × (-0.50)</p>
          <p className="mt-1 font-mono text-sm text-slate-900">xₜ = 0.64 - 0.30 = 0.34</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            The noisy value 0.34 is calculated from a scaled clean signal and scaled sampled noise. Training
            gives xₜ = 0.34 and timestep t to the model; the target it must predict is ε = -0.50.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The noise-prediction objective</h2>
        <Formula title="A common DDPM training loss" expression="L_noise = mean((ε - ε̂θ(xₜ, t))²)">
          <p>
            ε is the sampled noise we know because training added it. ε̂ is the model’s learned prediction after
            seeing noisy xₜ and timestep t. θ names the model parameters updated by the optimizer.
          </p>
        </Formula>
        <p className="mt-4 leading-relaxed text-slate-700">
          Continue the example: if the model predicts ε̂ = -0.35, the one-value squared error is
          (-0.50 - (-0.35))² = (-0.15)² = 0.0225. Reducing this loss teaches the model to recognize the noise
          present at many different timesteps.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Timestep conditioning is essential because the same visible pattern means something different when
          a sample is slightly noisy versus almost pure noise. The model converts t into an embedding and uses
          it while predicting ε.
        </p>
      </section>

      <DiffusionTrainingGenerationDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What the scheduler does during generation</h2>
        <p className="leading-relaxed text-slate-700">
          The neural network predicts noise; the scheduler performs the mathematical update from the current
          xₜ to a less noisy sample. It stores the timestep sequence, α and β values, and the specific reverse
          update rule. Different schedulers can trade generation speed, randomness, and quality while using the
          same trained denoiser.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          More reverse steps give the sampler more opportunities to refine the output, but every step requires
          another model evaluation. That repeated evaluation is a major reason diffusion inference can be
          slower than one-pass generators.
        </p>
      </section>

      <CodeBlock
        title="Reproduce the forward-noising calculation"
        description="This runnable PyTorch function implements the direct noising equation and reproduces xₜ ≈ 0.34 from the worked example."
        code={forwardCode}
        label="Python · requires PyTorch"
      />

      <CodeBlock
        title="Training phase"
        description="This is PyTorch-style pseudocode because the model architecture, data loader, timestep sampler, and schedule object depend on the application. Every line corresponds to the training half of Figure 2."
        code={trainingPseudo}
        label="PyTorch-style pseudocode"
      />

      <CodeBlock
        title="Generation phase"
        description="This is scheduler-based pseudocode. The trained parameters stay fixed while the loop makes one reverse update per configured timestep."
        code={samplingPseudo}
        label="Scheduler-based pseudocode"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Unconditional and conditional diffusion</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.indigo}><h3 className="font-bold">Unconditional</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">The denoiser receives xₜ and t. Generation samples from the overall learned data distribution.</p></div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}><h3 className="font-bold">Conditional</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">The denoiser also receives a class, text embedding, image, mask, or other condition that guides which outputs are likely.</p></div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Strengths, limitations, and common mistakes</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Point</th><th className="p-4">Why it matters</th><th className="p-4">Practical check</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Strong sample quality and coverage</td><td className="p-4">No adversarial discriminator is required</td><td className="p-4">Evaluate fidelity and diversity separately</td></tr>
              <tr><td className="p-4 font-semibold">Many inference steps</td><td className="p-4">Quality can cost latency and compute</td><td className="p-4">Benchmark scheduler and step count on the real device</td></tr>
              <tr><td className="p-4 font-semibold">Mistaking text conditioning for diffusion itself</td><td className="p-4">Diffusion can be unconditional or use non-text conditions</td><td className="p-4">Name the exact condition supplied to the denoiser</td></tr>
              <tr><td className="p-4 font-semibold">Confusing ε with ε̂</td><td className="p-4">ε is sampled truth during training; ε̂ is the model output</td><td className="p-4">Log both shapes and confirm the loss compares matching tensors</td></tr>
              <tr><td className="p-4 font-semibold">Treating the reverse path as exact undo</td><td className="p-4">Generation constructs a plausible sample, not the hidden original</td><td className="p-4">Repeat with different seeds and inspect variation</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "A diffusion model learns generation as a sequence of smaller denoising problems rather than one direct output step.",
        "Training samples a timestep t and known Gaussian noise ε, then calculates xₜ from the clean sample x₀ and the configured noise schedule.",
        "The denoiser receives xₜ and t and learns to predict ε by minimizing mean squared noise-prediction error.",
        "The true ε is sampled during training, whereas ε̂ is the model output; confusing them breaks the learning objective.",
        "Generation starts from random xT and repeatedly combines denoiser predictions with scheduler updates until a structured sample appears.",
        "More reverse steps can improve refinement but require more model evaluations, increasing latency and compute.",
        "Text is optional conditioning rather than part of diffusion itself; the next lesson moves denoising into a compact latent space.",
      ]} />
    </div>
  );
}

export function GenerativeAIBatchOneContent() {
  const { topicId = "" } = useParams<{ topicId: string }>();

  if (topicId === "generative-ai-intro") return <WhatIsGenerativeAI />;
  if (topicId === "generative-vs-discriminative") return <GenerativeVsDiscriminative />;
  if (topicId === "vae") return <VAEContent />;
  if (topicId === "gans") return <GANContent />;
  if (topicId === "diffusion-models") return <DiffusionContent />;
  return null;
}
