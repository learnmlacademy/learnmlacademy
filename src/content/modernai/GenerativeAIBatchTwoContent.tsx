import { Callout } from "../../components/content/Callout";
import { CodeBlock as SharedCodeBlock } from "../../components/content/CodeBlock";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Code2,
} from "lucide-react";
import {
  ClassifierFreeGuidanceDiagram,
  DiffusionControlMethodsDiagram,
  FineTuningMethodsDiagram,
  LoRASidePathDiagram,
  PixelVsLatentDiffusionDiagram,
  StableDiffusionArchitectureDiagram,
} from "../../components/diagrams/GenAIBatchThreeDiagrams";
import {
  AudioRepresentationPipelineDiagram,
  MultimodalRepresentationDiagram,
  MultimodalTaskPathsDiagram,
  SyntheticDataPipelineDiagram,
  SyntheticDistributionDiagram,
} from "../../components/diagrams/GenAIBatchFourDiagrams";

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

function Figure({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="not-prose overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <figcaption className="mb-5">
        <p className="font-bold text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{caption}</p>
      </figcaption>
      {children}
    </figure>
  );
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

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-indigo-500" aria-hidden="true">
      {label && <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</span>}
      <ArrowDown className="h-5 w-5 md:hidden" />
      <ArrowRight className="hidden h-5 w-5 md:block" />
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

function StableLatentDiffusion() {
  const inferencePseudo = [
    "# Conceptual pseudocode — component names and APIs vary by implementation.",
    "tokens = tokenizer(prompt)",
    "text_context = text_encoder(tokens)",
    "latent = sample_random_latent(seed)",
    "",
    "for timestep in scheduler.timesteps:",
    "    predicted_noise = unet(",
    "        noisy_latent=latent,",
    "        timestep=timestep,",
    "        text_context=text_context,  # used through cross-attention",
    "    )",
    "    latent = scheduler.remove_predicted_noise(latent, predicted_noise, timestep)",
    "",
    "image = vae_decoder(latent)",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">From diffusion to latent diffusion</h2>
        <Lead>
          The previous lesson showed how a diffusion model learns to reverse noise. That idea works on image
          pixels, but a large image contains many pixel values, so every denoising step can be expensive. Latent
          diffusion keeps the same broad denoising idea while moving most of the work into a smaller learned
          representation called a <strong>latent</strong>.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Think of the latent as a compact grid that preserves image information useful to the model without
          retaining every pixel directly. A variational autoencoder, or VAE, learns the bridge: its encoder maps
          an image to the latent grid, and its decoder maps a final latent grid back to pixels. This is why latent
          diffusion can spend its repeated denoising calculations on a much smaller representation.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          This lesson assumes you understand forward noising and reverse denoising. Review{" "}
          <Link to="/learn/diffusion-models">Diffusion Models</Link> first if those terms are unfamiliar.
        </p>
      </section>

      <PixelVsLatentDiffusionDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A traceable size example</h2>
        <p className="leading-relaxed text-slate-700">
          Consider one RGB image stored as a tensor with shape <strong>[1, 3, 512, 512]</strong>. The first
          number is the batch size chosen for this example, 3 is supplied by the RGB colour format, and
          512 × 512 is the image resolution chosen by the developer. It contains:
        </p>
        <Formula title="Pixel-value count" expression="1 × 3 × 512 × 512 = 786,432 values">
          <p>The multiplication is calculated from the tensor shape. It counts stored scalar values; it is not a quality score.</p>
        </Formula>
        <p className="mt-4 leading-relaxed text-slate-700">
          In one common Stable-Diffusion-style configuration, the VAE represents that image as a latent with
          shape <strong>[1, 4, 64, 64]</strong>. This is an architecture-specific example, not a rule for every
          model. The 4 learned latent channels are chosen by the architecture, while 64 × 64 results from
          downsampling the spatial dimensions by 8 on each side.
        </p>
        <Formula title="Latent-value count" expression="1 × 4 × 64 × 64 = 16,384 values; 786,432 ÷ 16,384 = 48">
          <p>
            The example latent stores 48 times fewer scalar values. Its spatial grid has 64 times fewer locations
            because 8 × 8 = 64, although the channel counts differ. Fewer values generally make each repeated
            U-Net step cheaper; the exact speed-up also depends on architecture and hardware.
          </p>
        </Formula>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">How the text and image paths meet</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-900">
              <tr><th className="p-4">Component</th><th className="p-4">Receives</th><th className="p-4">Produces</th><th className="p-4">Why it is needed</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Tokenizer</td><td className="p-4">Prompt text supplied by the user</td><td className="p-4">Token IDs from a fixed vocabulary</td><td className="p-4">Converts text into discrete inputs the text encoder accepts</td></tr>
              <tr><td className="p-4 font-semibold">Text encoder</td><td className="p-4">Token IDs</td><td className="p-4">Contextual token representations</td><td className="p-4">Learns numerical features whose meaning depends on surrounding words</td></tr>
              <tr><td className="p-4 font-semibold">U-Net denoiser</td><td className="p-4">Current noisy latent, timestep, and text context</td><td className="p-4">A noise or related denoising prediction</td><td className="p-4">Estimates what must change at the current step</td></tr>
              <tr><td className="p-4 font-semibold">Timestep embedding</td><td className="p-4">The scheduler's current step</td><td className="p-4">A learned numerical representation of noise level</td><td className="p-4">Tells the U-Net whether it is handling heavy or light noise</td></tr>
              <tr><td className="p-4 font-semibold">Cross-attention</td><td className="p-4">Image-latent features and text representations</td><td className="p-4">Text-conditioned image features</td><td className="p-4">Lets image locations draw information from relevant prompt tokens</td></tr>
              <tr><td className="p-4 font-semibold">Scheduler</td><td className="p-4">Current latent, model prediction, and timestep</td><td className="p-4">Updated, usually less noisy latent</td><td className="p-4">Applies the selected sequence of numerical denoising updates</td></tr>
              <tr><td className="p-4 font-semibold">VAE decoder</td><td className="p-4">Final latent</td><td className="p-4">RGB image pixels</td><td className="p-4">Returns the compact representation to a viewable image</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <StableDiffusionArchitectureDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Training and pure text-to-image inference are not the same path</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.sky}>
            <h3 className="font-bold">During training</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              A real training image is data-supplied. The VAE encoder compresses it into a latent, sampled noise
              and a sampled timestep create a noisy training input, and the U-Net learns from its prediction error.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}>
            <h3 className="font-bold">During pure text-to-image inference</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              There is no starting image to encode. The process normally begins with randomly sampled latent
              noise, repeatedly denoises it under text guidance, and uses only the VAE decoder at the end.
            </p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          The VAE encoder returns when a workflow starts from an image—for example image-to-image editing or
          inpainting. In those cases, the supplied image must first enter the model's latent space.
        </p>
      </section>

      <CodeBlock
        title="Read the inference pipeline as operations"
        description="This pseudocode exposes the information flow without pretending that component names form a universal library API. The loop is inference: pretrained parameters are used, not updated."
        code={inferencePseudo}
        label="Conceptual pseudocode"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What can still go wrong?</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Limitation</th><th className="p-4">What the learner may observe</th><th className="p-4">Underlying reason</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">VAE reconstruction loss</td><td className="p-4">Fine text or tiny details become softer</td><td className="p-4">Compression does not preserve every pixel perfectly</td></tr>
              <tr><td className="p-4 font-semibold">Text-image misalignment</td><td className="p-4">An attribute attaches to the wrong object</td><td className="p-4">Learned language-image associations are imperfect</td></tr>
              <tr><td className="p-4 font-semibold">Slow generation</td><td className="p-4">A result takes many model evaluations</td><td className="p-4">The scheduler requires iterative rather than one-pass denoising</td></tr>
              <tr><td className="p-4 font-semibold">Inherited bias</td><td className="p-4">Outputs repeat stereotypes or omit groups</td><td className="p-4">Training data and filtering decisions shape learned patterns</td></tr>
              <tr><td className="p-4 font-semibold">Prompt interpretation limits</td><td className="p-4">Counting, spatial relations, or unusual compositions fail</td><td className="p-4">Text conditioning guides generation but is not a symbolic scene specification</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "Latent diffusion performs repeated denoising in a compact VAE representation instead of directly across every image pixel.",
        "In the illustrated configuration, [1, 3, 512, 512] contains 786,432 values while [1, 4, 64, 64] contains 16,384—48 times fewer scalar values.",
        "During training, a real image is VAE-encoded before noise is added; pure text-to-image inference instead starts from sampled latent noise.",
        "The tokenizer and text encoder turn a prompt into contextual token representations used by cross-attention.",
        "The U-Net predicts what should change at each timestep, and the scheduler calculates the next, usually less noisy latent.",
        "The VAE decoder converts the final latent into RGB pixels; the encoder returns only for workflows that begin from an image.",
        "Compression reduces repeated work but can soften fine detail, while iterative denoising, text alignment, bias, and prompt interpretation remain limitations.",
      ]} />
    </div>
  );
}

function ControllingDiffusionModels() {
  const cfgCode = [
    "# Runnable Python 3: the same scalar arithmetic used in the worked example.",
    "unconditional_prediction = 0.2",
    "conditional_prediction = 0.5",
    "guidance_scale = 3.0",
    "",
    "difference = conditional_prediction - unconditional_prediction",
    "guided_prediction = unconditional_prediction + guidance_scale * difference",
    "",
    "print(f\"conditional direction: {difference:.1f}\")",
    "print(f\"guided prediction: {guided_prediction:.1f}\")",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Control without retraining the model</h2>
        <Lead>
          A text prompt gives a diffusion model a goal, but many tasks need more precise control: repeat this
          random starting point, preserve this photograph, change only the jacket, or follow this pose. These
          are <strong>inference-time controls</strong>. They change the information or settings used while a
          pretrained model generates; they do not teach the base model new parameters.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          The controls in this lesson answer different questions. Guidance scale controls how strongly text
          steers the denoising prediction. A seed controls the initial random latent. Image-to-image and
          inpainting provide pixels to preserve or edit. ControlNet-style conditioning provides a spatial
          structure such as edges, depth, or pose. The next lesson covers training-time adaptation.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Classifier-free guidance: compare two predictions</h2>
        <p className="leading-relaxed text-slate-700">
          At a denoising step, a classifier-free-guidance system evaluates the denoiser with the requested
          condition and with an empty or negative condition. The difference between those predictions points
          toward what the condition changes. Guidance scales that direction before the scheduler uses the
          result to calculate the next latent.
        </p>
        <Formula title="Classifier-free guidance (CFG)" expression="ε̂guided = ε̂uncond + s(ε̂cond − ε̂uncond)">
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>ε̂uncond</strong> is the model's prediction under the no-condition or negative-condition input.</li>
            <li><strong>ε̂cond</strong> is the prediction under the user-supplied prompt or condition.</li>
            <li><strong>s</strong> is the guidance scale chosen by the user or developer; it is not learned in this calculation.</li>
            <li><strong>ε̂guided</strong> is the calculated prediction passed into the scheduler update.</li>
          </ul>
        </Formula>
        <p className="mt-4 leading-relaxed text-slate-700">
          A larger scale pushes farther in the conditional direction, but larger is not automatically better.
          Excessive guidance can reduce variety, exaggerate contrast, or create artifacts because the update is
          being pushed beyond the model's ordinary conditional prediction.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked CFG example</h2>
        <p className="leading-relaxed text-slate-700">
          This is a pedagogical scalar example. Real denoisers predict large tensors, but using one number makes
          every arithmetic step visible. Suppose the model produces 0.2 without the positive prompt and 0.5
          with it. Both values are model outputs for the same noisy latent and timestep. We choose a guidance
          scale of 3.
        </p>
        <div className="not-prose mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FlowBox title="1. Difference" detail="0.5 − 0.2 = 0.3" tone="sky" />
          <FlowBox title="2. Scale" detail="3 × 0.3 = 0.9" tone="violet" />
          <FlowBox title="3. Add baseline" detail="0.2 + 0.9 = 1.1" tone="amber" />
          <FlowBox title="4. Guided value" detail="The scheduler receives 1.1" tone="emerald" />
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          The result 1.1 is calculated, not sampled and not a pixel brightness. It represents one component of
          the guided denoising prediction. Applying the formula component by component gives the tensor version.
        </p>
      </section>

      <ClassifierFreeGuidanceDiagram />

      <CodeBlock
        title="Reproduce the CFG arithmetic"
        description="This self-contained Python 3 code reproduces the worked scalar result. It teaches the equation; it does not run an image model."
        code={cfgCode}
        label="Python 3 · runnable without extra packages"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Controls that change the sampling process</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.amber}>
            <h3 className="font-bold">Negative prompt</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              In many pipelines it replaces the empty text used for the negative or unconditional branch. CFG
              then moves relative to that prediction. It can discourage learned associations, but it is not a
              perfect inverse command and cannot guarantee that an unwanted feature disappears.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.sky}>
            <h3 className="font-bold">Random seed</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              A seed is a user- or developer-chosen integer used to initialize the random-number generator. With
              the same model, settings, hardware path, and software versions, it helps reproduce the same
              starting latent; it is not a visual style value.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}>
            <h3 className="font-bold">Inference steps</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              This chosen count controls how many scheduler updates are performed. More steps cost more U-Net
              evaluations and may improve refinement only up to a point; the useful range depends on scheduler
              and model.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.indigo}>
            <h3 className="font-bold">Scheduler</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              The scheduler defines the timestep sequence and numerical update rule. Changing it can alter the
              speed, stochasticity, and appearance of results even when the denoiser's learned parameters stay fixed.
            </p>
          </div>
        </div>
      </section>

      <DiffusionControlMethodsDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Starting from an image</h2>
        <h3 className="text-xl font-bold text-slate-900">Image-to-image strength</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          The supplied image is VAE-encoded, then noise is added before denoising begins. A strength value is
          chosen by the user or developer and determines how far into the noise schedule the workflow starts.
          Lower strength tends to preserve more of the source; higher strength allows a larger transformation.
          The exact numerical meaning is pipeline-dependent, so it should not be described as “percent changed.”
        </p>
        <h3 className="mt-6 text-xl font-bold text-slate-900">Inpainting mask</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          A mask is a spatial input aligned with the source image. It identifies the region intended for
          regeneration while the remaining region acts as context to preserve. Libraries differ in mask
          conventions, so confirm whether white or black means “edit.” Even with a correct mask, soft edges,
          latent compression, or attention can produce seams or small changes outside the intended area.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Structural conditioning with ControlNet</h2>
        <p className="leading-relaxed text-slate-700">
          A prompt can name “a cyclist,” but it does not precisely specify the bend of each limb. A
          ControlNet-style model adds a trainable control path that reads a spatial condition while preserving a
          pretrained diffusion backbone. An edge map carries boundaries, a depth map carries near/far structure,
          a pose map carries joint locations, and a segmentation map carries region labels. The condition does
          not contain the final texture; it constrains where the generated content should go.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Which control should you choose?</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Need</th><th className="p-4">Start with</th><th className="p-4">What it preserves or changes</th><th className="p-4">Main caution</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Style or content influence</td><td className="p-4">Prompt, guidance, seed</td><td className="p-4">Guides semantics and appearance without an anchor image</td><td className="p-4">Language may not control exact layout</td></tr>
              <tr><td className="p-4 font-semibold">Preserve an existing image</td><td className="p-4">Image-to-image with modest strength</td><td className="p-4">Keeps broad composition while restyling or revising</td><td className="p-4">Strength is not a guaranteed preservation percentage</td></tr>
              <tr><td className="p-4 font-semibold">Edit one region</td><td className="p-4">Inpainting with image + mask + prompt</td><td className="p-4">Targets a spatial area and uses surroundings as context</td><td className="p-4">Check mask convention, borders, and unintended spill</td></tr>
              <tr><td className="p-4 font-semibold">Preserve pose, depth, edges, or layout</td><td className="p-4">Matching ControlNet-style condition</td><td className="p-4">Constrains explicit geometry while allowing new appearance</td><td className="p-4">A poor detector or condition map transfers its errors</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Warning title="Control is influence, not a contract">
        <p>
          Keep the seed fixed while comparing one control at a time, inspect several outputs, and verify details
          important to the task. Prompts, masks, and structure maps can all be interpreted imperfectly.
        </p>
      </Warning>

      <SummaryTakeaways items={[
        "Inference-time controls change the information or settings used during generation without retraining the base model.",
        "Classifier-free guidance scales the difference between conditional and unconditional predictions before the scheduler update.",
        "In the scalar example, 0.2 + 3 × (0.5 − 0.2) = 1.1; excessive guidance can reduce variety or create artifacts.",
        "A seed helps reproduce the starting latent, while inference steps and the scheduler affect cost, refinement, randomness, and appearance.",
        "Image-to-image strength trades source preservation against transformation, and inpainting uses a mask to target one region.",
        "ControlNet-style inputs preserve explicit geometry such as pose, depth, edges, or segmentation layout.",
        "Every control is an influence rather than a contract, so compare controlled outputs and verify task-critical details.",
      ]} />
    </div>
  );
}

function FineTuningImageModels() {
  const rankCode = [
    "# Runnable Python 3: compare full and LoRA parameter counts.",
    "def counts(out_features, in_features, rank):",
    "    full = out_features * in_features",
    "    lora = rank * in_features + out_features * rank",
    "    return full, lora",
    "",
    "for rank in (1, 2):",
    "    full, lora = counts(out_features=4, in_features=4, rank=rank)",
    "    print(f\"4x4 full={full}, rank-{rank} LoRA={lora}\")",
  ].join("\n");

  const trainingPseudo = [
    "# Conceptual pseudocode — an adaptation workflow, not a library API.",
    "training_pairs = check_rights_and_prepare(image_caption_pairs)",
    "validation_prompts = hold_out_prompts_not_used_for_updates(training_pairs)",
    "",
    "freeze(base_diffusion_model)",
    "adapter = attach_lora_layers(base_diffusion_model, chosen_rank)",
    "",
    "for images, captions in training_pairs:",
    "    loss = diffusion_training_loss(base_diffusion_model, adapter, images, captions)",
    "    update_only(adapter.parameters, loss)",
    "",
    "save(adapter)",
    "compare_checkpoints_on(adapter, validation_prompts)",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">When generation controls are no longer enough</h2>
        <Lead>
          Lesson 8 changed prompts, seeds, masks, guidance, and structural inputs while the pretrained model
          stayed fixed. This lesson is different: <strong>training-time adaptation</strong> changes learned
          embeddings or learned parameter updates so the model can represent a subject, visual concept, or style
          it does not reliably produce through prompting alone.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Start with prompting and inference-time control because they require no training data or new weights.
          Adapt only when a repeated, well-defined gap remains—for example, a product with a distinctive shape
          must appear consistently across new scenes. Adaptation is not a substitute for clearer prompts, a
          better base model, or structural control.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The dataset teaches what the method will learn</h2>
        <p className="leading-relaxed text-slate-700">
          Training images are data-supplied evidence. They should be sharp, lawful to use, varied enough to
          separate the intended concept from accidental backgrounds, and paired with captions that name what
          should vary and what should remain associated with the concept. If every product photograph uses the
          same white table, the model may learn “white table” as part of the product.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Validation prompts are developer-written prompts held outside the update loop. They combine the new
          concept with unseen settings, viewpoints, and attributes. Because no gradient update uses them, they
          reveal whether an adapter generalizes rather than merely reproducing training compositions.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Three adaptation methods solve different problems</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-900">
              <tr><th className="p-4">Method</th><th className="p-4">What is learned</th><th className="p-4">How much of the base changes</th><th className="p-4">Relative cost and storage</th><th className="p-4">Typical use</th><th className="p-4">Important limitation</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Textual Inversion</td><td className="p-4">One or a few new token embeddings that point to a visual concept</td><td className="p-4">Base model remains frozen</td><td className="p-4">Usually the smallest artifact and lightest training</td><td className="p-4">Associate a placeholder token with a subject or style concept</td><td className="p-4">Limited capacity; complex identity or composition may be weak</td></tr>
              <tr><td className="p-4 font-semibold">DreamBooth</td><td className="p-4">Model parameters adapted to bind a rare identifier to a subject</td><td className="p-4">A larger part of the model may be updated; variants differ</td><td className="p-4">Higher training and checkpoint cost</td><td className="p-4">Personalize a model to a particular subject from a small image set</td><td className="p-4">Can overfit, drift, or forget broader class knowledge without careful regularization</td></tr>
              <tr><td className="p-4 font-semibold">LoRA</td><td className="p-4">Small low-rank update matrices attached to selected layers</td><td className="p-4">Original weights stay frozen; adapters supply ΔW</td><td className="p-4">Much smaller trainable state than a full checkpoint when rank is small</td><td className="p-4">Portable subject, style, or domain adaptation</td><td className="p-4">Rank, target layers, data, and scale still affect fidelity and overfitting</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <FineTuningMethodsDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">How LoRA changes a frozen weight</h2>
        <p className="leading-relaxed text-slate-700">
          Imagine a pretrained layer has a learned weight matrix W. Full fine-tuning would update every value in
          W. LoRA freezes W and learns two narrower matrices, A and B. Their product creates an update with the
          same shape as W.
        </p>
        <Formula title="Low-rank update" expression="ΔW = BA     and     W′ = W + scale × ΔW">
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>W</strong> is the pretrained matrix supplied by the base model and kept frozen.</li>
            <li><strong>A and B</strong> are learned during adaptation; their narrow shared dimension is rank r.</li>
            <li><strong>ΔW</strong> is calculated by matrix multiplication and has the same shape as W.</li>
            <li><strong>scale</strong> is a developer-chosen multiplier controlling the adapter contribution.</li>
            <li><strong>W′</strong> is the effective adapted weight used by the layer.</li>
          </ul>
        </Formula>
      </section>

      <LoRASidePathDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Toy parameter-count example</h2>
        <p className="leading-relaxed text-slate-700">
          This deliberately tiny 4 × 4 matrix is only for arithmetic; real diffusion layers are much larger. A
          full matrix contains <strong>4 × 4 = 16</strong> parameters. For rank 1, A has shape 1 × 4 and B has
          shape 4 × 1, so the adapter learns <strong>4 + 4 = 8</strong> parameters. For rank 2, A is 2 × 4 and B
          is 4 × 2, so it learns <strong>8 + 8 = 16</strong> parameters.
        </p>
        <Formula title="General parameter counts" expression="full matrix: m × n     LoRA pair: r × n + m × r = r(m + n)">
          <p>
            The output size m and input size n come from the existing layer. Rank r is a developer-chosen adapter
            capacity. LoRA saves trainable parameters when r(m + n) is smaller than mn. The toy rank-2 case has no
            count saving, which makes clear that “low rank” must be small relative to the real dimensions.
          </p>
        </Formula>
      </section>

      <CodeBlock
        title="Check the toy parameter counts"
        description="This self-contained Python 3 program prints the exact counts discussed above. It does not fine-tune a model; it demonstrates why rank and matrix size matter."
        code={rankCode}
        label="Python 3 · runnable without extra packages"
      />

      <CodeBlock
        title="Separate training from using a trained adapter"
        description="This conceptual pseudocode shows where learning happens. Loading a previously trained LoRA for generation is inference, not fine-tuning."
        code={trainingPseudo}
        label="Conceptual pseudocode"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A practical method-selection guide</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Situation</th><th className="p-4">Try first</th><th className="p-4">Reason</th><th className="p-4">Validation question</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Existing model already knows the concept</td><td className="p-4">Prompting or Lesson 8 controls</td><td className="p-4">No new training state is needed</td><td className="p-4">Can seed and structure controls make it repeatable?</td></tr>
              <tr><td className="p-4 font-semibold">Small concept represented by a token</td><td className="p-4">Textual Inversion</td><td className="p-4">Minimal learned artifact</td><td className="p-4">Does the concept work in unseen contexts?</td></tr>
              <tr><td className="p-4 font-semibold">Specific subject identity is central</td><td className="p-4">DreamBooth or a subject-focused LoRA</td><td className="p-4">More adaptation capacity</td><td className="p-4">Is identity preserved without copying poses and backgrounds?</td></tr>
              <tr><td className="p-4 font-semibold">Portable style or domain adapter</td><td className="p-4">LoRA</td><td className="p-4">Compact, modular learned update</td><td className="p-4">Does style strength remain controllable on held-out prompts?</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Warning title="Watch for learning the wrong thing">
        <p>
          Exact training-scene copies, loss of prompt flexibility, an identity appearing when not requested, or a
          style overwhelming every subject are overfitting or leakage signals. Broader model quality can also
          degrade when too much of the base model is updated—catastrophic forgetting. Compare checkpoints early,
          use held-out prompts, and confirm permission for people's identity, voice, artwork, and style data.
        </p>
      </Warning>

      <SummaryTakeaways items={[
        "Fine-tuning is training-time adaptation: it changes learned embeddings or parameter updates, unlike prompts, masks, seeds, and other inference-time controls.",
        "Adapt only after a repeated, well-defined gap remains and prompting, a better base model, or structural control has been tested.",
        "Textual Inversion learns a small token embedding, DreamBooth adapts more model capacity for a subject, and LoRA learns compact low-rank updates beside frozen weights.",
        "LoRA uses ΔW = BA and W′ = W + scale × ΔW; its parameter saving depends on rank r being small relative to the original matrix dimensions.",
        "Training images and captions must separate the intended concept from accidental backgrounds, poses, or other correlations.",
        "Held-out prompts reveal whether an adapter generalizes instead of copying training compositions.",
        "Choose the least invasive method that closes the measured gap without memorization, leakage, catastrophic forgetting, or rights violations.",
      ]} />
    </div>
  );
}

function MultimodalGenerativeAI() {
  const similarityCode = [
    "# Runnable Python 3: dot products for two toy normalized image embeddings.",
    "text = [0.8, 0.6]",
    "image_a = [0.8, 0.6]",
    "image_b = [-0.6, 0.8]",
    "",
    "def dot(left, right):",
    "    return sum(a * b for a, b in zip(left, right))",
    "",
    "print(f\"text · image A = {dot(text, image_a):.1f}\")",
    "print(f\"text · image B = {dot(text, image_b):.1f}\")",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">One system, more than one kind of information</h2>
        <Lead>
          A <strong>modality</strong> is a form in which information is represented: text, image, audio, video,
          sensor readings, and structured records are different modalities. A multimodal system connects two or
          more of them so evidence in one form can affect interpretation or generation in another.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          “Multimodal” does not automatically mean “generative.” A system that selects an answer label from an
          image is multimodal understanding. A system that writes a new answer, caption, soundtrack, or edited
          image is also performing generation. The distinction depends on the output operation, not merely on
          how many input types are present.
        </p>
      </section>

      <MultimodalRepresentationDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Understanding and generation are related, not identical</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Input → output</th><th className="p-4">Main task</th><th className="p-4">What is generated?</th><th className="p-4">Example check</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Image + question → selected class</td><td className="p-4">Multimodal understanding</td><td className="p-4">Nothing open-ended; the model chooses among fixed labels</td><td className="p-4">Is the chosen label supported by the image?</td></tr>
              <tr><td className="p-4 font-semibold">Image + question → written answer</td><td className="p-4">Understanding plus text generation</td><td className="p-4">A new sequence of answer tokens</td><td className="p-4">Does every claim have visual support?</td></tr>
              <tr><td className="p-4 font-semibold">Image → caption</td><td className="p-4">Visual interpretation plus text generation</td><td className="p-4">A new description</td><td className="p-4">Are objects, actions, and relations correct?</td></tr>
              <tr><td className="p-4 font-semibold">Text → image</td><td className="p-4">Cross-modal generation</td><td className="p-4">A new pixel or latent arrangement</td><td className="p-4">Does the image follow prompt content and layout?</td></tr>
              <tr><td className="p-4 font-semibold">Audio + text → spoken response</td><td className="p-4">Audio understanding plus audio generation</td><td className="p-4">Response words and a new waveform</td><td className="p-4">Are meaning, pronunciation, and speaker policy correct?</td></tr>
              <tr><td className="p-4 font-semibold">Image + instruction → edited image</td><td className="p-4">Visual understanding plus image generation</td><td className="p-4">A revised visual output</td><td className="p-4">Was the requested change made while protected details stayed intact?</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <MultimodalTaskPathsDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">What the internal words mean</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.sky}>
            <h3 className="font-bold">Encoder and representation</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              An encoder converts raw input into learned numerical features. An image encoder may turn patches
              into vectors; a text encoder turns tokens into contextual vectors. A representation is that
              numerical description—not a human-readable caption by itself.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}>
            <h3 className="font-bold">Alignment and shared spaces</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Alignment training encourages related items, such as a dog image and the words “a dog,” to have
              compatible representations. Some systems use a shared comparison space; others connect separate
              spaces with learned projection layers.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.indigo}>
            <h3 className="font-bold">Fusion and cross-attention</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Fusion combines modality features. With cross-attention, a representation in one stream asks
              which features in another stream matter—for example, answer tokens can attend to image patches
              that support the answer.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.emerald}>
            <h3 className="font-bold">Modality-specific decoder</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              The output mechanism matches the destination. A language decoder predicts text tokens; an image
              generator may denoise latent features; an audio decoder may reconstruct a waveform from learned units.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked alignment example</h2>
        <p className="leading-relaxed text-slate-700">
          Use two-dimensional vectors so the comparison is visible. These values are invented for teaching, not
          produced by a real encoder. Suppose a text encoder represents “a red bicycle” as <strong>[0.8, 0.6]</strong>.
          Image A has the same representation, <strong>[0.8, 0.6]</strong>, while image B has
          <strong>[-0.6, 0.8]</strong>. Each vector has length 1, so its dot product is also its cosine similarity.
        </p>
        <Formula title="Text compared with image A" expression="(0.8 × 0.8) + (0.6 × 0.6) = 0.64 + 0.36 = 1.00">
          <p>A similarity of 1.00 means the toy vectors point in the same direction: image A is maximally aligned in this example.</p>
        </Formula>
        <Formula title="Text compared with image B" expression="(0.8 × −0.6) + (0.6 × 0.8) = −0.48 + 0.48 = 0.00">
          <p>A similarity of 0.00 means the toy vectors are perpendicular: this representation provides no positive alignment signal.</p>
        </Formula>
        <p className="mt-4 leading-relaxed text-slate-700">
          The vector values are learned from data in a real model; the dot products are calculated. Similarity
          helps connect modalities, but it does not prove that every detail matches or that a generated statement is true.
        </p>
      </section>

      <CodeBlock
        title="Reproduce the toy similarity calculation"
        description="This self-contained Python 3 program calculates the two dot products. It demonstrates alignment arithmetic, not a full multimodal encoder."
        code={similarityCode}
        label="Python 3 · runnable without extra packages"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A genuinely generative example: make an accessibility description</h2>
        <p className="leading-relaxed text-slate-700">
          Imagine an image of a street entrance plus the instruction, “Write a concise accessibility
          description; mention steps, ramps, and door clearance only when visible.” The image encoder produces
          visual features, the instruction becomes text features, and cross-modal interaction connects words
          such as “ramp” with relevant image regions. A language decoder then generates a new description token
          by token.
        </p>
        <div className="not-prose mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <FlowBox title="Image + instruction" detail="Data-supplied pixels and developer-written task constraint" tone="sky" />
          <FlowArrow />
          <FlowBox title="Connected evidence" detail="Visual features influence each generated token" tone="violet" />
          <FlowArrow />
          <FlowBox title="Draft description" detail="Generated text that must remain grounded in visible evidence" tone="emerald" />
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          This differs from fixed-label visual question answering because the output is a newly generated
          sequence. It still requires verification: the decoder can write a fluent but unsupported claim.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Failures to test across modalities</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Failure</th><th className="p-4">Example</th><th className="p-4">Targeted test</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">One modality is ignored</td><td className="p-4">Answer follows the question's suggestion despite contrary image evidence</td><td className="p-4">Keep text fixed and change only the image</td></tr>
              <tr><td className="p-4 font-semibold">Modalities contradict</td><td className="p-4">Audio says “left” while an on-screen instruction says “right”</td><td className="p-4">Define which source should win and test conflicts explicitly</td></tr>
              <tr><td className="p-4 font-semibold">Unsupported hallucination</td><td className="p-4">Caption invents an object outside the frame</td><td className="p-4">Score claims against localized visual or audio evidence</td></tr>
              <tr><td className="p-4 font-semibold">Temporal misalignment</td><td className="p-4">Description refers to an event before it happens</td><td className="p-4">Evaluate time-localized events, not only whole-clip meaning</td></tr>
              <tr><td className="p-4 font-semibold">Modality-specific bias</td><td className="p-4">Accent, lighting, or skin tone changes accuracy</td><td className="p-4">Slice results by relevant audio and visual conditions</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <SummaryTakeaways items={[
        "A modality is a form of information such as text, image, audio, video, sensor readings, or structured records.",
        "Multimodal means that two or more modalities are connected; it becomes generative only when the output is newly constructed rather than selected from fixed labels.",
        "Encoders create numerical representations, alignment makes related representations compatible, and fusion or cross-attention connects evidence across streams.",
        "The output mechanism must match the destination modality, such as a language decoder, image denoiser, or audio decoder.",
        "Representation similarity helps connect modalities but does not prove that every detail matches or that a generated statement is true.",
        "Test whether a modality is ignored, sources conflict, claims lack evidence, timing is misaligned, or performance changes across relevant subgroups.",
      ]} />
    </div>
  );
}

function TemporalMediaGeneration() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A picture occupies space; media also unfolds in time</h2>
        <Lead>
          A still image can be judged one frame at a time. Speech, sound, music, and video are sequences: changing
          their order or timing changes their meaning. A media generator must therefore create plausible content
          now while preserving rhythm, identity, motion, and structure across later moments.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Local quality is not enough. A clear speech sound can still form an unnatural sentence; a beautiful
          video frame can still flicker when placed beside the next frame; a pleasant musical bar can still lead
          nowhere. Temporal generation combines short-range detail with long-range consistency.
        </p>
      </section>

      <Figure
        title="Figure 1 — Spatial coherence versus temporal coherence"
        caption="An image model coordinates features inside one frame. A temporal model must also carry state across t1, t2, t3, and later positions so objects, timing, and meaning remain connected."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <p className="font-bold text-sky-950">Still image</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }, (_, index) => (
                <div key={index} className="aspect-square rounded-md border border-sky-300 bg-white text-center text-xs leading-[3rem] text-sky-800">region {index + 1}</div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-700">Relationships must be coherent across height and width in one output.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="font-bold text-violet-950">Temporal sequence</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <FlowBox title="t1" detail="Speaker begins / object at left" tone="sky" />
              <FlowArrow />
              <FlowBox title="t2" detail="Sound continues / object moves" tone="violet" />
              <FlowArrow />
              <FlowBox title="t3 …" detail="Meaning, identity, rhythm, and motion persist" tone="emerald" />
            </div>
            <p className="mt-3 text-sm text-slate-700">Each moment must make sense alone and as a continuation of earlier moments.</p>
          </div>
        </div>
      </Figure>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">A. Speech and audio: from pressure changes to useful representations</h2>
        <p className="leading-relaxed text-slate-700">
          A digital <strong>waveform</strong> is a sequence of sampled air-pressure measurements. The
          <strong> sample rate</strong> says how many measurements are stored each second. Higher rates can
          represent faster changes in the signal but create longer sequences.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          A <strong>spectrogram</strong> reorganizes sound into a time-by-frequency picture: horizontal position
          represents time, vertical position represents frequency, and cell intensity represents energy. Some
          models process waveforms or spectrograms directly; others use learned audio tokens or compressed latent
          representations. These units reduce sequence length or expose useful patterns, but they must eventually
          be decoded into sound.
        </p>
        <AudioRepresentationPipelineDiagram />
        <p className="mt-4 leading-relaxed text-slate-700">
          In text-to-speech, the text is data-supplied conditioning. A model also needs decisions about voice
          identity and <strong>prosody</strong>—pace, emphasis, pitch, and rhythm. The same words can sound like a
          question, warning, or joke depending on those temporal choices.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked representation example: sample rate × duration</h2>
        <p className="leading-relaxed text-slate-700">
          Suppose an audio format uses <strong>16,000 samples per second</strong>. This sample rate is chosen by a
          developer or dataset format, not learned by the model. Take an example duration of <strong>2 seconds</strong>.
          The number of waveform values is calculated by multiplication:
        </p>
        <Formula title="Audio sample count" expression="16,000 samples/second × 2 seconds = 32,000 samples">
          <p>
            The seconds cancel, leaving 32,000 sampled values for one mono clip. A 10-second clip at the same
            rate would contain 160,000 values. This rapid growth is one reason models often learn compressed
            acoustic representations or tokens instead of performing every high-level operation on raw samples.
          </p>
        </Formula>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">B. Music: local sound must serve a larger structure</h2>
        <p className="leading-relaxed text-slate-700">
          Music can be represented <strong>symbolically</strong> as notes, durations, instruments, tempo, and
          control events, or as <strong>audio</strong> containing the final timbre and performance. Symbolic
          generation makes musical events explicit but needs a renderer or performer to become sound. Audio
          generation can model texture and expression directly but works with far denser sequences.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          A useful music generator must manage beat-level timing, phrase-level repetition and variation, and
          song-level development. Text, genre, instrument, melody, or reference audio may act as conditions, but
          “in the style of…” is an ambiguous signal and raises rights questions. A clip can sound convincing for
          five seconds while lacking a coherent beginning, development, and ending.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">C. Video: generate appearance and change</h2>
        <p className="leading-relaxed text-slate-700">
          Video is a sequence of frames, but independently generating attractive frames produces flicker.
          Temporal features must represent motion and cause-and-effect while keeping a person's identity, an
          object's shape, lighting, and background stable where the scene requires it.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          <strong>Text-to-video</strong> starts from a language condition and a random or learned spatiotemporal
          representation. <strong>Image-to-video</strong> also receives a reference frame, so the system must
          preserve its identity and composition while inventing plausible motion. If audio is generated or
          supplied, events must line up: footsteps with contact, speech with lip movement, and music with editing rhythm.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Compare the three media families</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Medium</th><th className="p-4">Possible representation</th><th className="p-4">Typical conditioning</th><th className="p-4">Main consistency challenge</th><th className="p-4">Useful evaluation dimensions</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Speech</td><td className="p-4">Waveform, spectrogram, acoustic features, or learned audio tokens</td><td className="p-4">Text, speaker identity, language, prosody controls</td><td className="p-4">Pronunciation, voice stability, natural timing, long-sentence meaning</td><td className="p-4">Intelligibility, speaker similarity with consent, naturalness, word error rate where a transcript exists</td></tr>
              <tr><td className="p-4 font-semibold">Music</td><td className="p-4">Symbolic events, waveform, spectrogram, or compressed audio representation</td><td className="p-4">Text, genre, instruments, melody, rhythm, reference audio</td><td className="p-4">Rhythm plus phrase- and song-level structure</td><td className="p-4">Audio quality, prompt adherence, musical coherence, originality, human preference</td></tr>
              <tr><td className="p-4 font-semibold">Video</td><td className="p-4">Frames, spatiotemporal features, or compressed video latents</td><td className="p-4">Text, first image, reference clip, camera or motion controls</td><td className="p-4">Motion, identity and object persistence, scene continuity, audio sync</td><td className="p-4">Frame quality, temporal consistency, motion plausibility, prompt adherence, synchronization</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <Warning title="Temporal realism can imitate a real person">
        <p>
          Voice cloning and likeness generation require informed permission, provenance, secure storage, and
          safeguards against impersonation. Training or generation can also reproduce copyrighted recordings and
          recognizable creative work. Evaluate identity consistency only on authorized subjects, and make generated
          media discoverable as synthetic where the application calls for it.
        </p>
      </Warning>

      <SummaryTakeaways items={[
        "Speech, music, and video are temporal sequences, so order and timing carry meaning in addition to local appearance or sound quality.",
        "A waveform stores sampled pressure measurements, while a spectrogram reorganizes sound by time, frequency, and energy.",
        "At 16,000 samples per second, a two-second mono clip contains 32,000 waveform values, motivating compressed audio representations or tokens.",
        "Music generation must connect beat-level detail with phrase- and song-level structure; symbolic and audio representations offer different trade-offs.",
        "Video generation must preserve motion, identity, objects, lighting, scene continuity, and—when present—audio synchronization across frames.",
        "Local realism does not guarantee coherent speech, a complete musical composition, stable video, authorized identity use, or responsible output.",
      ]} />
    </div>
  );
}

function SyntheticDataGeneration() {
  const distributionCode = [
    "# Runnable Python 3: calculate class proportions in the worked example.",
    "real = {\"A\": 80, \"B\": 20}",
    "synthetic = {\"A\": 60, \"B\": 40}",
    "",
    "def proportions(counts):",
    "    total = sum(counts.values())",
    "    return {name: count / total for name, count in counts.items()}",
    "",
    "print(\"real:\", proportions(real))",
    "print(\"synthetic:\", proportions(synthetic))",
    "print(\"B coverage multiplier:\", synthetic[\"B\"] / real[\"B\"])",
  ].join("\n");

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Synthetic data is designed evidence</h2>
        <Lead>
          <strong>Synthetic data</strong> consists of records, images, text, audio, or other examples produced by
          rules, simulations, statistical models, or generative models instead of directly observing each example
          in the real world. It is useful only when its design and evaluation match the decision the data will support.
        </Lead>
        <p className="mt-4 leading-relaxed text-slate-700">
          Teams create synthetic data to exercise rare situations, test software before real records are
          available, balance training cases, reduce exposure of sensitive records, or explore controlled
          scenarios. None of those goals guarantees realism, privacy, or usefulness. Synthetic-data work is both
          generative modelling and data engineering: schemas, labels, constraints, coverage, lineage, and tests matter.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Augmentation and a fully synthetic dataset are not the same</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.sky}>
            <h3 className="font-bold">Data augmentation</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Starts from a real example and applies a validity-preserving change: crop an image, add appropriate
              noise, or paraphrase text while keeping its label. The synthetic item remains tied to a source example.
            </p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}>
            <h3 className="font-bold">Fully synthetic generation</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Constructs a record or sample from a rule, simulator, fitted distribution, or generative model. It
              may resemble the real dataset without being a transformed copy of one selected row.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Four ways to generate synthetic examples</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Method</th><th className="p-4">How examples are produced</th><th className="p-4">Good fit</th><th className="p-4">Main strength</th><th className="p-4">Main limitation</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Rules</td><td className="p-4">Developer-written logic samples fields under explicit constraints</td><td className="p-4">Schemas, edge cases, unit and integration tests</td><td className="p-4">Transparent and controllable</td><td className="p-4">Misses interactions the rules do not encode</td></tr>
              <tr><td className="p-4 font-semibold">Simulation</td><td className="p-4">A model of a process produces states, measurements, or rendered scenes</td><td className="p-4">Robotics, driving, physics, operations, sensor failure</td><td className="p-4">Can generate labelled rare or hazardous scenarios safely</td><td className="p-4">Simulator-to-real gap can dominate performance</td></tr>
              <tr><td className="p-4 font-semibold">Statistical synthesis</td><td className="p-4">A fitted probabilistic model samples tabular or time-series variables and dependencies</td><td className="p-4">Structured datasets with measurable constraints</td><td className="p-4">Distribution checks can be explicit</td><td className="p-4">Complex tails and dependencies may be smoothed away</td></tr>
              <tr><td className="p-4 font-semibold">Generative models</td><td className="p-4">A GAN, VAE, diffusion model, or language model samples learned representations</td><td className="p-4">Complex images, text, audio, and high-dimensional records</td><td className="p-4">Can model patterns that are hard to hand-code</td><td className="p-4">May hallucinate, memorize, violate constraints, or hide coverage gaps</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          A project can combine methods. A simulator might render street scenes, rules might guarantee rare
          weather and pedestrian combinations, and a generative model might vary texture. The correct question is
          not “Which method is most advanced?” but “Which assumptions can we test against the real task?”
        </p>
      </section>

      <SyntheticDataPipelineDiagram />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Worked example: coverage and fidelity can disagree</h2>
        <p className="leading-relaxed text-slate-700">
          A real sample contains 100 labelled cases: <strong>A = 80</strong> and <strong>B = 20</strong>. These are
          data-supplied counts. A developer creates a 100-row synthetic set with <strong>A = 60</strong> and
          <strong>B = 40</strong> to expose a classifier to more B cases. These are chosen generation targets.
        </p>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className={"rounded-xl border p-5 " + toneClasses.sky}>
            <h3 className="font-bold">Real proportions</h3>
            <p className="mt-2 font-mono text-sm text-slate-800">A: 80 ÷ 100 = 0.80 = 80%</p>
            <p className="mt-2 font-mono text-sm text-slate-800">B: 20 ÷ 100 = 0.20 = 20%</p>
          </div>
          <div className={"rounded-xl border p-5 " + toneClasses.violet}>
            <h3 className="font-bold">Synthetic proportions</h3>
            <p className="mt-2 font-mono text-sm text-slate-800">A: 60 ÷ 100 = 0.60 = 60%</p>
            <p className="mt-2 font-mono text-sm text-slate-800">B: 40 ÷ 100 = 0.40 = 40%</p>
          </div>
        </div>
        <Formula title="How B changed" expression="count: 40 ÷ 20 = 2×     proportion: 40% − 20% = +20 percentage points">
          <p>
            The synthetic set doubles the number of B cases and adds 20 percentage points to B's share. That
            improves minority coverage for intentional balancing, but it does not faithfully reproduce the real
            class frequency. For population estimation this could be harmful distortion; for training a classifier
            it may be useful if evaluation remains on the untouched real distribution.
          </p>
        </Formula>
      </section>

      <SyntheticDistributionDiagram />

      <CodeBlock
        title="Reproduce the class-distribution calculation"
        description="This self-contained Python 3 code derives the proportions and B coverage multiplier from the supplied counts. It does not claim that balance alone makes synthetic data useful."
        code={distributionCode}
        label="Python 3 · runnable without extra packages"
      />

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Four evaluation dimensions must stay separate</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Dimension</th><th className="p-4">Question</th><th className="p-4">Possible evidence</th><th className="p-4">What it does not prove</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Fidelity</td><td className="p-4">Does synthetic data resemble important real distributions and relationships?</td><td className="p-4">Marginal and joint distributions, constraints, expert inspection</td><td className="p-4">That rare cases are covered or a downstream model will work</td></tr>
              <tr><td className="p-4 font-semibold">Diversity / coverage</td><td className="p-4">Are important modes, tails, rare cases, and subgroups present?</td><td className="p-4">Coverage by subgroup and scenario; duplicate rates; mode analysis</td><td className="p-4">That generated examples are accurate or private</td></tr>
              <tr><td className="p-4 font-semibold">Utility</td><td className="p-4">Does synthetic data help the real task?</td><td className="p-4">Train on synthetic, test on real (TSTR); compare against real-data baselines</td><td className="p-4">That records cannot reveal training members</td></tr>
              <tr><td className="p-4 font-semibold">Privacy</td><td className="p-4">Could outputs reveal, reproduce, or identify source records?</td><td className="p-4">Exact duplicate and nearest-neighbour checks, disclosure tests, privacy accounting where applicable</td><td className="p-4">That the data is useful or unbiased</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Utility means testing on real evidence</h2>
        <p className="leading-relaxed text-slate-700">
          In <strong>train-on-synthetic, test-on-real (TSTR)</strong>, the model is fitted using synthetic
          examples and evaluated on a real test set that was not used to fit the synthesizer or the downstream
          model. The measured score is calculated from real outcomes. Compare it with a model trained on real
          data, a mixed-data model, and a simple baseline so any claimed benefit has context.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          An average can hide harm. Report results for important subgroups, rare scenarios, and time periods. If
          the real environment drifts after synthesis, repeat distribution and utility checks; a synthetic
          generator preserves assumptions from its source data or simulator, not future reality.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Realistic does not mean private</h2>
        <p className="leading-relaxed text-slate-700">
          A high-capacity generator can reproduce a training row or create an output extremely close to one.
          Exact duplicate checks catch direct copies. Nearest-neighbour checks compare each synthetic record with
          authorized real records to find suspicious similarity. Membership tests ask whether an attacker can
          infer that a particular person or record influenced training. Each check covers a different risk.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          Removing names after generation is not a privacy guarantee, and visual realism is not privacy evidence.
          Sensitive uses may require a formal privacy mechanism, restricted access, and an independent risk review.
          Privacy protection can also change fidelity and utility, so all dimensions must be measured together.
        </p>
      </section>

      <Warning title="Synthetic data cannot replace missing real-world evidence">
        <p>
          Do not use generated examples as the sole proof that a medical treatment works, a safety system handles
          reality, a policy affects people fairly, or a new population behaves like an old one. Simulators and
          models reproduce encoded assumptions. Collect real evidence when the decision depends on phenomena,
          subgroups, harms, or changes that the source data cannot establish.
        </p>
      </Warning>

      <SummaryTakeaways items={[
        "Synthetic data is designed evidence produced by rules, simulations, statistical models, or generative models rather than direct observation of every example.",
        "Data augmentation transforms a real source example, while fully synthetic generation constructs a sample from a rule or learned process.",
        "The right generator depends on which assumptions can be tested against the real task, not on which method sounds most advanced.",
        "In the worked example, increasing class B from 20% to 40% doubles its count but intentionally reduces fidelity to the real class frequency.",
        "Fidelity, coverage, utility, and privacy answer different questions and must not be treated as interchangeable evidence.",
        "Train-on-synthetic, test-on-real evaluates downstream utility on an untouched real test set and should be compared with real-data and mixed-data baselines.",
        "Realistic output is not automatically private, and synthetic data cannot replace missing real-world evidence for consequential claims.",
      ]} />
    </div>
  );
}

export function GenerativeAIBatchTwoContent() {
  const { topicId = "" } = useParams<{ topicId: string }>();

  if (topicId === "stable-latent-diffusion") return <StableLatentDiffusion />;
  if (topicId === "controlling-diffusion-models") return <ControllingDiffusionModels />;
  if (topicId === "finetuning-image-models") return <FineTuningImageModels />;
  if (topicId === "multimodal-ai") return <MultimodalGenerativeAI />;
  if (topicId === "audio-music-video-generation") return <TemporalMediaGeneration />;
  if (topicId === "synthetic-data") return <SyntheticDataGeneration />;
  return null;
}
