import { Link } from "react-router-dom";
import { Callout } from "../../components/content/Callout";
import { DataTable } from "../../components/content/DataTable";
import { FigureShell } from "../../components/content/FigureShell";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";

function Bridge({ question, to, label }: { question: string; to: string; label: string }) {
  return (
    <section className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Why the next lesson matters</p>
      <p className="mt-2 text-lg font-bold leading-relaxed text-indigo-950">{question}</p>
      <Link to={to} className="mt-3 inline-flex font-semibold text-indigo-700 hover:underline">{label} →</Link>
    </section>
  );
}

function StableLatentDiffusion() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Why denoise a compressed image instead of every pixel?</h2>
        <p className="text-lg">A 512×512 RGB image contains hundreds of thousands of scalar values. Repeating a neural-network denoising step directly over that full pixel space is expensive.</p>
        <p><strong>Latent diffusion</strong> first represents images in a smaller learned latent space, performs diffusion there, then decodes the final latent back to pixels.</p>
      </section>

      <section className="space-y-4">
        <h2>The compression advantage in numbers</h2>
        <DataTable title="Pixel tensor versus latent tensor" headers={["Representation","Shape","Scalar values"]} rows={[
          ["Pixel image","[1, 3, 512, 512]","3×512×512 = 786,432"],
          ["Latent","[1, 4, 64, 64]","4×64×64 = 16,384"],
        ]}/>
        <FormulaBlock expression="786,432 / 16,384 = 48" explanation="The latent has 48 times fewer scalar values in this example. The spatial width/height are each 8× smaller, which means 64× fewer spatial locations, but the channel counts differ." />
      </section>

      <FigureShell title="Text-to-image latent diffusion" caption="The U-Net-style denoiser works in latent space; the VAE decoder converts the final latent to pixels." accessibleDescription="A pipeline shows prompt tokenization and text encoding feeding cross-attention in a latent denoiser. Random latent noise is iteratively denoised by the model and scheduler, then decoded by a VAE decoder to an image.">
        <div className="grid gap-3 md:grid-cols-5">
          {["Prompt → text encoder","Random latent noise","Latent denoiser + cross-attention","Scheduler updates","VAE decoder → image"].map((x,i)=><div key={x} className="relative rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold">{x}{i<4&&<span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-indigo-500 md:block">→</span>}</div>)}
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>What starts pure text-to-image generation?</h2>
        <p>There is no source image to encode. The process normally begins from <strong>random latent noise</strong>, then iteratively denoises that latent under text guidance.</p>
        <p><strong>Cross-attention</strong> allows locations in the image latent to use relevant contextual information from prompt tokens. The text encoder does not paint pixels; it supplies representations used for conditioning.</p>
      </section>

      <section className="space-y-4">
        <h2>Why can tiny details become soft?</h2>
        <p>Compression is the reason latent diffusion is efficient, but it can also lose fine pixel detail. Small text, thin lines, and tiny textures may be harder to preserve through the VAE representation.</p>
        <Callout role="tip" title="Image-to-image needs the encoder again"><p>If the workflow starts from an uploaded image, the VAE encoder maps those pixels into latent space before noise and denoising are applied.</p></Callout>
      </section>

      <Bridge question="The architecture can generate from a prompt, but how do we control pose, composition, edited regions, strength, and prompt adherence?" to="/learn/controlling-diffusion-models" label="Controlling Diffusion Models" />

      <SummaryCard items={[
        "Latent diffusion performs repeated denoising in a compressed learned representation instead of full pixel space.",
        "The toy latent [1,4,64,64] contains 48× fewer scalar values than [1,3,512,512].",
        "Pure text-to-image inference normally starts from random latent noise.",
        "Cross-attention lets image-latent features use relevant prompt-token information.",
        "The VAE decoder turns the final latent into pixels, while the VAE encoder is needed when a real source image enters the workflow.",
        "Compression improves efficiency but can soften very fine details.",
      ]}/>
    </div>
  );
}

function ControllingDiffusion() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>“Generate an image” is not enough when you need control</h2>
        <p className="text-lg">Sometimes you want a new image but need to preserve a pose, edit only one region, keep most of a reference composition, or strengthen prompt adherence. Diffusion systems provide different controls for different goals.</p>
      </section>

      <DataTable title="Match the control to the requirement" headers={["Need","Useful starting control"]} rows={[
        ["Repeat the same stochastic start","Random seed"],
        ["Restyle while preserving much of a source image","Image-to-image with modest strength"],
        ["Edit only a selected region","Inpainting mask"],
        ["Follow a supplied human pose or edge map","ControlNet-style structural condition"],
        ["Strengthen conditional guidance","Classifier-free guidance (CFG)"],
      ]}/>

      <section className="space-y-4">
        <h2>Seed controls randomness, not style</h2>
        <p>A random seed initializes the random-number generator and therefore the starting latent noise. With matching model, software path, settings, and hardware behavior, reusing a seed helps reproduce the same stochastic start. The seed itself does not store a visual style.</p>
      </section>

      <section className="space-y-4">
        <h2>Classifier-free guidance blends conditional and unconditional predictions</h2>
        <FormulaBlock expression="ε̂guided = ε̂uncond + s(ε̂cond - ε̂uncond)" explanation="s is the guidance scale. It pushes the denoising prediction away from the unconditional prediction toward the conditional direction." />
        <p>For ε̂uncond=0.2, ε̂cond=0.5, and s=3:</p>
        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono">0.2 + 3×(0.5−0.2) = 0.2 + 0.9 = <strong>1.1</strong></div>
        <p>The 1.1 value is a guided denoising component in this toy example, not a pixel brightness.</p>
      </section>

      <section className="space-y-4">
        <h2>Masks and structural controls solve different problems</h2>
        <p>Inpainting uses a mask to identify which image region may change. Libraries differ on whether white or black means “edit”, so if the opposite region changes, check the mask convention first.</p>
        <p>For an exact supplied pose, a pose-based ControlNet-style condition is a stronger starting point than a seed or extra negative prompting because the pose map directly represents the geometry you want to preserve.</p>
      </section>

      <Bridge question="Inference controls keep the base model fixed. What if you need the model itself to learn a new visual concept, subject, or style?" to="/learn/finetuning-image-models" label="Fine-Tuning Image Generation Models" />

      <SummaryCard items={[
        "Seeds control stochastic initialization rather than storing style.",
        "Image-to-image preserves a source image to a degree controlled by the workflow strength/noise setting.",
        "Inpainting masks restrict which region is edited, but mask colour conventions must be checked.",
        "Structural controls such as pose conditions are appropriate when geometry must be preserved.",
        "CFG combines unconditional and conditional denoising predictions; the worked example gives 1.1.",
        "These are inference-time controls: they guide generation without retraining the base model.",
      ]}/>
    </div>
  );
}

function FineTuningImages() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>When prompting is not enough</h2>
        <p className="text-lg">Prompts, seeds, masks, and guidance change how a pretrained model is used. <strong>Fine-tuning</strong> is different: it performs training-time adaptation so learned embeddings or parameter updates change.</p>
      </section>

      <DataTable title="Three adaptation ideas" headers={["Method","What learns","Useful when"]} rows={[
        ["Textual Inversion","One or a few token embeddings","A compact placeholder should represent a small visual concept"],
        ["LoRA","Small low-rank adapter matrices while base weights stay frozen","Need efficient adaptation with a portable adapter"],
        ["DreamBooth-style subject adaptation","A broader set of selected model parameters/adapter parameters depending on implementation","Need stronger subject personalization from a small curated set"],
      ]}/>

      <section className="space-y-4">
        <h2>LoRA in one tiny matrix</h2>
        <p>Suppose the frozen base weight W is 4×4. A rank-1 LoRA update learns A with shape 1×4 and B with shape 4×1.</p>
        <FormulaBlock expression="A parameters = 1×4 = 4; B parameters = 4×1 = 4; total adapter parameters = 8" explanation="The original 16 parameters of W stay frozen in the simplified example." />
      </section>

      <section className="space-y-4">
        <h2>Data variety matters more than memorizing one composition</h2>
        <p>If every training photo of a product shows the same white table, the adaptation may bind that background to the product. Then the concept appears correctly only on that table.</p>
        <Callout role="warning" title="Hold validation prompts out of training"><p>Validation prompts should test unseen combinations and settings. If their failures feed adapter updates, they stop being independent evidence of generalization.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Start with the lightest method that matches the need</h2>
        <p>If one placeholder token only needs to represent a small concept, Textual Inversion can be a compact starting point. If you need a more expressive adaptation while keeping the base frozen, LoRA is often a stronger option. Full-model retraining is not the default answer.</p>
      </section>

      <Bridge question="So far we have mostly discussed one input and one output modality at a time. How do systems connect text, images, audio, and other modalities?" to="/learn/multimodal-ai" label="Multimodal Generative AI" />

      <SummaryCard items={[
        "Fine-tuning changes learned embeddings or parameter updates; prompts and masks do not.",
        "Textual Inversion can learn a compact placeholder embedding for a small visual concept.",
        "LoRA keeps the base model frozen and learns low-rank adapter matrices.",
        "For a 4×4 base matrix with rank 1, the toy LoRA adapter learns 4+4=8 parameters.",
        "Repeated backgrounds or compositions can become accidental correlations during personalization.",
        "Held-out prompts must remain outside the update loop if they are to test generalization.",
      ]}/>
    </div>
  );
}

function MultimodalLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>What makes a system multimodal?</h2>
        <p className="text-lg">A multimodal system works with more than one data modality—such as text, image, audio, or video—within one task or representation pipeline.</p>
        <p>Multimodal does <strong>not</strong> automatically mean generative. An image+question system that only chooses one label from a fixed list is multimodal but not open-ended generation.</p>
      </section>

      <FigureShell title="Encode, align or fuse, then decode for the destination modality" caption="The output-specific decoder matters because text, image, and audio require different generation mechanisms." accessibleDescription="Text, image, and audio encoders produce representations that can be aligned or fused. An output-specific decoder then produces text tokens, image latents, or audio.">
        <div className="grid gap-4 md:grid-cols-3">
          {["Text / image / audio encoders","Shared or fused representation","Output-specific decoder"].map((x,i)=><div key={x} className="rounded-xl border border-slate-200 bg-white p-5 text-center font-bold">{x}</div>)}
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>A tiny alignment calculation</h2>
        <p>Suppose normalized text vector t=[0.8,0.6] and image vector B=[-0.6,0.8]. Their dot product is:</p>
        <FormulaBlock expression="0.8×(-0.6) + 0.6×0.8 = -0.48 + 0.48 = 0.00" explanation="In this toy aligned space, the vectors provide no positive similarity signal." />
      </section>

      <section className="space-y-4">
        <h2>Test whether each modality is actually being used</h2>
        <p>For visual question answering, keep the text question fixed and change only the image. If the answer barely changes even when visual evidence changes, the system may be relying on the question prior and ignoring the image.</p>
        <Callout role="warning" title="Fluent multimodal output can still hallucinate"><p>If an accessibility description says a ramp is present when no ramp is visible, treat that as an unsupported claim and compare it against localized visual evidence. Broad embedding similarity does not prove a specific object exists.</p></Callout>
      </section>

      <Bridge question="Audio and video add another challenge: time. How do generative systems represent sound, music, motion, and consistency across moments?" to="/learn/audio-music-video-generation" label="Audio, Speech, Music & Video Generation" />

      <SummaryCard items={[
        "Multimodal systems combine or relate more than one modality such as text, image, audio, or video.",
        "A system can be multimodal without being generative if it only selects from fixed labels.",
        "Encoders create modality representations; alignment/fusion connects them; the decoder must match the output modality.",
        "The toy text–image dot product [0.8,0.6]·[-0.6,0.8] equals 0.00.",
        "Counterfactual tests that change one modality at a time can reveal whether the model is actually using that evidence.",
        "Generated multimodal claims must still be grounded in the source media.",
      ]}/>
    </div>
  );
}

function TemporalMediaLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Images are spatial. Audio and video are spatial <em>and temporal</em>.</h2>
        <p className="text-lg">A good audio clip or video is not just a collection of individually plausible pieces. Timing, rhythm, identity, motion, and state must remain coherent across time.</p>
      </section>

      <section className="space-y-4">
        <h2>Waveforms and spectrograms describe sound differently</h2>
        <p>A waveform stores amplitude samples over time. For a 2-second mono clip sampled at 16,000 samples per second:</p>
        <FormulaBlock expression="16,000 samples/s × 2 s = 32,000 waveform values" explanation="The sample rate says how many amplitude measurements are stored each second." />
        <p>A <strong>spectrogram</strong> reorganizes sound so time runs horizontally, frequency vertically, and cell intensity represents energy.</p>
      </section>

      <section className="space-y-4">
        <h2>Music can be represented symbolically or as audio</h2>
        <p>If a composer needs explicit control over notes, durations, instruments, and tempo, <strong>symbolic musical events</strong> are a natural representation. They still need a renderer, synthesizer, or performer to become a final waveform.</p>
      </section>

      <section className="space-y-4">
        <h2>Video quality needs consistency across frames</h2>
        <DataTable title="Two kinds of quality" headers={["Quality","Question"]} rows={[
          ["Frame quality","Does each individual frame look plausible?"],
          ["Temporal consistency","Does identity, object state, lighting, and motion remain coherent across frames?"],
        ]}/>
        <p>Attractive frames do not guarantee a good video if the subject's face, clothing, or object shape flickers from one moment to the next.</p>
      </section>

      <section className="space-y-4">
        <h2>Image-to-video has an extra constraint</h2>
        <p>Text-to-video begins from text guidance. Image-to-video also receives a reference frame, so the system must preserve its identity and composition while inventing plausible motion over time.</p>
      </section>

      <Bridge question="Generative models can create media, but they can also create training and testing records. When is synthetic data useful—and how do we know it is faithful, useful, and private?" to="/learn/synthetic-data" label="Synthetic Data Generation" />

      <SummaryCard items={[
        "Temporal media must remain coherent over time, not merely look good one instant at a time.",
        "A 2-second mono waveform at 16 kHz contains 32,000 sampled values.",
        "A spectrogram organizes time, frequency, and energy in a 2D representation.",
        "Symbolic music makes notes, durations, instruments, and tempo explicit before rendering to audio.",
        "Strong individual video frames do not guarantee temporal consistency.",
        "Image-to-video must preserve important information from the supplied reference frame while generating motion.",
      ]}/>
    </div>
  );
}

function SyntheticDataLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>What is synthetic data?</h2>
        <p className="text-lg">Synthetic data is created by rules, simulations, statistical models, or generative models instead of being a direct observation of every real example.</p>
        <p>It can help when real data is scarce, sensitive, expensive, or missing important scenarios—but it must be evaluated against the real task.</p>
      </section>

      <section className="space-y-4">
        <h2>Augmentation and full synthesis are not the same</h2>
        <DataTable title="Two ways to create additional data" headers={["Method","Starting point","Example"]} rows={[
          ["Data augmentation","A real source example","Rotate a real image while preserving its label"],
          ["Fully synthetic generation","Rules, simulator, fitted distribution, or generative model","Generate a new artificial transaction record"],
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>Coverage can improve while fidelity gets worse</h2>
        <p>A real dataset has 100 cases: A=80 and B=20. A synthetic training set intentionally uses A=60 and B=40.</p>
        <FormulaBlock expression="B count: 40/20 = 2×; B share: 40% − 20% = +20 percentage points" explanation="The synthetic set doubles B coverage but no longer matches the real 80/20 class frequency." />
        <p>That may be useful for exposing a classifier to more B cases, but it would be misleading if someone treated the synthetic 60/40 balance as proof that the real population is 60/40.</p>
      </section>

      <section className="space-y-4">
        <h2>Evaluate four dimensions separately</h2>
        <DataTable title="Synthetic-data evidence" headers={["Dimension","Question"]} rows={[
          ["Fidelity","Does synthetic data preserve important real distributions and relationships?"],
          ["Coverage","Are rare cases, modes, and subgroups represented?"],
          ["Utility","Does training with synthetic data improve performance on real outcomes?"],
          ["Privacy","Could outputs copy, reveal, or identify sensitive source records?"],
        ]}/>
        <p><strong>Train-on-synthetic, test-on-real (TSTR)</strong> directly tests utility by fitting on synthetic data and measuring the downstream model on an untouched real test set.</p>
        <Callout role="warning" title="Realistic does not mean private"><p>A generator can reproduce or closely resemble source records. Duplicate, nearest-neighbour, disclosure, and membership-risk tests address privacy questions that visual realism cannot answer.</p></Callout>
      </section>

      <Bridge question="We now have many ways to generate content. How do we evaluate whether one generator is actually better for a particular user job?" to="/learn/evaluating-generative-models" label="Evaluating Generative Models" />

      <SummaryCard items={[
        "Synthetic data is artificially produced rather than directly observed for every example.",
        "Augmentation starts from a real example; full synthesis creates a sample from a rule, simulator, distribution, or generative model.",
        "Changing B from 20/100 to 40/100 doubles its count and raises its share by 20 percentage points.",
        "More minority coverage can intentionally reduce fidelity to the real population frequency.",
        "Fidelity, coverage, utility, and privacy measure different properties.",
        "TSTR evaluates synthetic-data utility on untouched real outcomes, and realism alone does not prove privacy.",
      ]}/>
    </div>
  );
}

export function GenAIBeginnerMediaContent({ topicId }: { topicId: string }) {
  if (topicId === "stable-latent-diffusion") return <StableLatentDiffusion />;
  if (topicId === "controlling-diffusion-models") return <ControllingDiffusion />;
  if (topicId === "finetuning-image-models") return <FineTuningImages />;
  if (topicId === "multimodal-ai") return <MultimodalLesson />;
  if (topicId === "audio-music-video-generation") return <TemporalMediaLesson />;
  if (topicId === "synthetic-data") return <SyntheticDataLesson />;
  return null;
}
