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

function Steps({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="not-prose grid gap-3">
      {items.map((item,index)=>(
        <div key={item.title} className="grid grid-cols-[2rem_1fr] gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">{index+1}</span>
          <div><h3 className="font-bold text-slate-900">{item.title}</h3><p className="mt-1 leading-relaxed text-slate-700">{item.body}</p></div>
        </div>
      ))}
    </div>
  );
}

function GenAIIntro() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>What changes when AI can create something new?</h2>
        <p className="text-lg">A fraud model might answer <strong>“fraud probability = 0.82”</strong>. A search system might return an existing policy paragraph. A generative system does something different: it <strong>constructs a new candidate output</strong> such as text, an image, audio, code, video, or synthetic record.</p>
        <p><strong>Generative AI</strong> learns patterns from examples and uses those patterns—plus guidance supplied at use time—to create a new candidate.</p>
      </section>

      <FigureShell
        title="Retrieval, prediction, and generation answer different kinds of questions"
        caption="Generation creates a candidate. That candidate can still be wrong, unsafe, or unsupported."
        accessibleDescription="Three columns compare retrieval returning an existing item, predictive machine learning returning a score or label, and generative AI constructing a new candidate output."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4"><strong>Retrieval</strong><p className="mt-2 text-sm">“Show the approved refund-policy paragraph.”</p><p className="mt-2 text-sm text-slate-600">Returns stored evidence.</p></div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4"><strong>Prediction</strong><p className="mt-2 text-sm">“How likely is this payment to be fraud?”</p><p className="mt-2 text-sm text-slate-600">Returns a label, score, or number.</p></div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4"><strong>Generation</strong><p className="mt-2 text-sm">“Draft a friendly refund explanation from these facts.”</p><p className="mt-2 text-sm text-slate-600">Constructs new content.</p></div>
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>What can generative AI create?</h2>
        <DataTable
          title="Common output types"
          headers={["Output","Example request","What still needs checking"]}
          rows={[
            ["Text","Draft a customer reply","Facts, tone, policy"],
            ["Image","Create three packaging ideas","Artifacts, brand accuracy, rights"],
            ["Audio","Read a lesson aloud","Pronunciation, consent"],
            ["Video","Animate a product demo","Identity, motion, continuity"],
            ["Code","Draft a validation function","Tests, security, dependencies"],
            ["Structured data","Create test orders","Schema, realism, privacy"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Prompting is not retraining</h2>
        <p>If you change a prompt and the pretrained model gives a different answer, the normal situation is that the <strong>use-time condition changed while the saved model parameters stayed fixed</strong>. Training changes parameters; ordinary generation uses the trained parameters.</p>
        <Callout role="tip" title="Condition means guidance"><p>A prompt is one kind of condition. A class label, reference image, mask, audio clip, or partial sequence can also guide generation.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>When should you not generate?</h2>
        <p>If a customer must see the <strong>exact current refund-policy paragraph</strong>, retrieval is the better starting point. Asking a generator to rewrite it creates unnecessary risk because a fluent paraphrase can change the policy.</p>
        <p>Generated output should be treated as a <strong>candidate</strong>. In important workflows, verify facts and policy before publishing or acting on it.</p>
      </section>

      <Bridge question="If generative AI creates samples while predictive ML maps inputs to labels or numbers, what exactly is the mathematical difference between those goals?" to="/learn/generative-vs-discriminative" label="Generative vs Discriminative Models" />

      <SummaryCard items={[
        "Generative AI constructs new candidate content from learned patterns and supplied guidance.",
        "Retrieval returns existing evidence, while predictive ML maps an input to a label, score, or number.",
        "Text, images, audio, video, code, and structured records can all be generated.",
        "Changing a prompt normally changes use-time guidance, not the model's saved parameters.",
        "When exact stored evidence is required, retrieval is often a better starting point than generation.",
        "Generated output is a candidate that may still need factual, policy, safety, and human review.",
      ]}/>
    </div>
  );
}

function GenerativeVsDiscriminative() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Two different learning goals</h2>
        <p className="text-lg">Suppose an email contains the word <strong>“offer”</strong>. A discriminative model may ask: <strong>“Given this email, how likely is spam?”</strong> A generative model can instead learn how examples from different classes tend to occur and use that learned data process for sampling or derived predictions.</p>
        <p>The usual discriminative direction is <strong>p(y | x)</strong>: predict target y after observing input x.</p>
      </section>

      <DataTable
        title="Choose the goal from the job"
        headers={["Job","Natural starting family","Why"]}
        rows={[
          ["Predict house price from features","Discriminative regression","Directly learn the input → numeric target mapping"],
          ["Classify spam from email features","Discriminative classifier","Directly estimate class from observed input"],
          ["Create varied new samples","Generative model","Must model enough of the data process to sample plausible outputs"],
          ["Model missing-data patterns for several downstream uses","Generative model","A learned data distribution can support sampling and imputation-style tasks"],
        ]}
      />

      <section className="space-y-4">
        <h2>A tiny conditional-probability example</h2>
        <p>Suppose we have <strong>100 emails</strong>. Of those, <strong>40 are spam</strong>, <strong>36 contain “offer”</strong>, and <strong>30 are both spam and contain “offer”</strong>.</p>
        <DataTable
          title="Where each number comes from"
          headers={["Quantity","Count"]}
          rows={[["All emails","100"],["Spam","40"],["Contain “offer”","36"],["Spam and contain “offer”","30"]]}
        />
        <p>To calculate <strong>p(spam | offer)</strong>, restrict attention to the 36 messages that contain “offer”. Of those 36, 30 are spam:</p>
        <FormulaBlock expression="p(spam | offer) = 30 / 36 ≈ 0.833 = 83.3%" explanation="The denominator is 36 because the condition says we already know the email contains “offer”." />
      </section>

      <section className="space-y-4">
        <h2>Generative and discriminative models can overlap</h2>
        <p>The families are not defined by “classification versus images”. A generative model can support classification by modelling class-related data quantities and deriving a class probability. A discriminative model can output a continuous number, as in regression.</p>
        <Callout role="tip" title="Use the simplest model that matches the real job"><p>If the product only needs a reliable house-price estimate, directly learning that prediction may be simpler than modelling every way a house description can occur.</p></Callout>
      </section>

      <Bridge question="A generative model is supposed to learn how data tends to occur. What does it actually mean to learn a distribution and then sample from it?" to="/learn/how-generative-models-learn" label="How Generative Models Learn" />

      <SummaryCard items={[
        "Discriminative models usually learn the target from an observed input, often written p(y | x).",
        "Generative models learn enough about how data occurs to support sampling or other generative tasks.",
        "Generative versus discriminative is not the same as image versus classification.",
        "In the email example, p(spam | offer) = 30/36 ≈ 0.833 because the condition restricts the denominator to offer emails.",
        "Either family can sometimes support classification, but the learned quantities and route to the answer differ.",
        "Choose the simpler family when the real job is a direct prediction rather than open-ended creation.",
      ]}/>
    </div>
  );
}

function HowGenerativeModelsLearn() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>What does “learn the data distribution” mean?</h2>
        <p className="text-lg">Imagine a tiny dataset of scene labels. If forests appear often, coasts sometimes, and cities less often, a generator can learn that some outcomes are more plausible than others.</p>
        <p>A <strong>distribution</strong> is a way of describing which values or combinations are more or less likely. A model does not need to store every training file as a searchable copy to learn such patterns.</p>
      </section>

      <section className="space-y-4">
        <h2>Sampling turns probabilities into one concrete choice</h2>
        <p>Suppose the learned probabilities are:</p>
        <DataTable title="Toy learned distribution" headers={["Category","Probability","Cumulative interval"]} rows={[
          ["Forest","0.50","[0.00, 0.50)"],
          ["Coast","0.30","[0.50, 0.80)"],
          ["City","0.20","[0.80, 1.00)"],
        ]}/>
        <p>If a random number generator gives <strong>r = 0.72</strong>, the value falls inside the Coast interval <strong>[0.50, 0.80)</strong>, so the sampled category is <strong>Coast</strong>.</p>
        <Callout role="info" title="Why randomness is useful"><p>Sampling allows the same trained model to produce different valid outputs instead of always returning one identical result.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Conditioning changes which outputs are likely</h2>
        <p>Now add the condition <strong>“sunset”</strong>. The model may have learned that sunset coast scenes are especially common, so the probabilities shift. Conditioning does not usually retrain the model; it guides the distribution used at generation time.</p>
        <DataTable title="Guidance changes the toy distribution" headers={["Setting","Forest","Coast","City"]} rows={[
          ["No condition","0.50","0.30","0.20"],
          ["Condition = sunset","0.20","0.70","0.10"],
        ]}/>
        <p>With the same random draw r = 0.35, the unconditional choice is Forest, while the conditioned choice is Coast because the intervals changed.</p>
      </section>

      <section className="space-y-4">
        <h2>Training and generation are different phases</h2>
        <Steps items={[
          {title:"Training examples",body:"Developers provide data and an objective."},
          {title:"Prediction / reconstruction / discrimination / denoising objective",body:"The model is scored on what it should learn for its architecture."},
          {title:"Parameter updates",body:"An optimizer changes learned weights many times."},
          {title:"Generation",body:"Later, the trained parameters normally stay fixed while a prompt, class, noise vector, latent, or partial sample guides a new output."},
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>Different families generate in different ways</h2>
        <DataTable title="Four mechanisms you will meet" headers={["Family","High-level generation idea"]} rows={[
          ["Autoregressive","Generate one part, then use it to help generate the next"],
          ["VAE / latent-variable","Sample a latent representation, then decode it"],
          ["GAN","Map random input to a sample after adversarial training"],
          ["Diffusion","Start from noise and repeatedly denoise"],
        ]}/>
      </section>

      <Bridge question="A VAE also uses randomness, but instead of sampling a simple category it samples a hidden numerical representation. How does that work?" to="/learn/vae" label="Variational Autoencoders" />

      <SummaryCard items={[
        "A learned distribution represents which values and combinations are more or less plausible.",
        "Sampling converts a probability distribution into one concrete random choice.",
        "With forest=0.50, coast=0.30, city=0.20, random draw 0.72 selects Coast.",
        "Conditioning changes which outputs are likely without normally retraining the model.",
        "Training updates parameters; generation normally reuses fixed trained parameters.",
        "Autoregressive, VAE, GAN, and diffusion models generate through different mechanisms.",
      ]}/>
    </div>
  );
}

function VAELesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Why not encode every example into one exact hidden point?</h2>
        <p className="text-lg">A normal autoencoder compresses an input into a latent representation and reconstructs it. A <strong>Variational Autoencoder (VAE)</strong> adds uncertainty: the encoder describes a <strong>distribution</strong> for each latent dimension instead of one fixed point.</p>
        <p>That makes nearby latent samples meaningful and gives the model a smoother space from which to generate new examples.</p>
      </section>

      <FigureShell
        title="VAE: encode a distribution, sample a latent, then decode"
        caption="For generation, you can sample z from the learned prior and decode it without first encoding a real input."
        accessibleDescription="A flow shows input x entering an encoder, producing mean mu and variance information, sampling latent z using random epsilon, and decoding z to a reconstructed or generated output."
      >
        <div className="grid gap-3 md:grid-cols-5">
          {["Input x","Encoder","μ and σ","Sample z","Decoder → output"].map((x,i)=><div key={x} className="relative rounded-xl border border-slate-200 bg-white p-4 text-center font-semibold">{x}{i<4&&<span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-indigo-500 md:block">→</span>}</div>)}
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>Reparameterization keeps randomness compatible with learning</h2>
        <p>The encoder learns <strong>μ</strong> and variance-related values. Randomness comes from <strong>ε sampled from N(0,I)</strong>. Then the latent sample is calculated as:</p>
        <FormulaBlock expression="z = μ + σ ⊙ ε" explanation="μ and σ come from the encoder; ε is the random draw. This separates the source of randomness from the learned parameters." />
        <p>Example: μ = [0.5, -1.0], σ = [0.5, 2.0], ε = [0.4, -0.3].</p>
        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono leading-7">
          z = [0.5 + 0.5×0.4, -1.0 + 2.0×(-0.3)] = <strong>[0.7, -1.6]</strong>
        </div>
      </section>

      <section className="space-y-4">
        <h2>The VAE balances reconstruction and latent regularity</h2>
        <p>One part of the loss asks the decoder to reconstruct the input well. A KL-divergence term encourages the encoded latent distributions to stay near a simple prior, often a standard normal distribution.</p>
        <p>In a β-VAE, increasing <strong>β above 1</strong> gives the KL regularization more weight. That can organize the latent space more strongly, but reconstruction detail may decrease.</p>
      </section>

      <section className="space-y-4">
        <h2>Reconstruction and generation are different paths</h2>
        <DataTable title="Two ways through a VAE" headers={["Task","Path"]} rows={[
          ["Reconstruction","Input → encoder → sample near its learned latent distribution → decoder"],
          ["Generation","Sample z from the prior N(0,I) → decoder, with no original input required"],
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>Posterior collapse: when the decoder ignores z</h2>
        <p>If the KL term falls near zero and changing z barely changes the output, the decoder may have learned to ignore the latent variable. This failure is called <strong>posterior collapse</strong>.</p>
      </section>

      <Bridge question="VAEs learn through reconstruction plus regularization. GANs take a very different route: can one network learn to generate by trying to fool another?" to="/learn/gans" label="Generative Adversarial Networks" />

      <SummaryCard items={[
        "A VAE encoder predicts a latent distribution rather than one exact latent point.",
        "Random ε is sampled from N(0,I); μ and σ are learned outputs of the encoder.",
        "The reparameterization z = μ + σ⊙ε gives [0.7, -1.6] in the worked example.",
        "Reconstruction starts from a real input; generation can sample z from the prior and decode it directly.",
        "Stronger β-VAE regularization can organize the latent space but may reduce reconstruction quality.",
        "Posterior collapse occurs when the decoder effectively ignores the latent variable.",
      ]}/>
    </div>
  );
}

function GANLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Can a generator improve by competing with a critic?</h2>
        <p className="text-lg">A <strong>Generative Adversarial Network (GAN)</strong> trains two neural networks together. The <strong>generator G</strong> turns random input z into fake samples. The <strong>discriminator D</strong> tries to tell real samples from generated ones.</p>
        <p>The generator improves because it receives a learning signal from how successfully the discriminator detects its fakes.</p>
      </section>

      <FigureShell title="The GAN game" caption="Training alternates: improve D at detecting real/fake, then improve G at producing samples that D treats as real." accessibleDescription="Random noise enters the generator to create a fake sample. Real and fake samples enter the discriminator. The discriminator learns to separate them, while the generator learns from discriminator feedback.">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-4 text-center">Random z</div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center font-bold">Generator G</div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">Fake sample G(z)</div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center font-bold">Discriminator D</div>
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>Two update phases must stay separate</h2>
        <Steps items={[
          {title:"Update the discriminator",body:"Show real samples and detached fake samples. Change only D so it gets better at classifying real versus fake."},
          {title:"Update the generator",body:"Generate fresh fake samples without detaching the generator path. Freeze or avoid updating D's parameters while gradients flow through D into G."},
        ]}/>
        <Callout role="tip" title="Why detach G(z) during the D update?"><p>Detaching keeps the fake values but cuts the gradient path back into the generator, so the discriminator phase does not accidentally update G.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>A tiny discriminator-loss calculation</h2>
        <p>Suppose D(x)=0.90 for a real sample and D(G(z))=0.20 for a fake sample. A simple binary-cross-entropy discriminator loss is:</p>
        <FormulaBlock expression="-ln(0.90) - ln(1 - 0.20) = -ln(0.90) - ln(0.80) ≈ 0.105 + 0.223 = 0.328" explanation="The first term rewards calling the real sample real. The second rewards rejecting the fake sample." />
      </section>

      <section className="space-y-4">
        <h2>Two important interpretations</h2>
        <DataTable title="What common observations mean" headers={["Observation","Likely meaning"]} rows={[
          ["Many different z values produce nearly the same sample","Mode collapse: the generator covers too little of the data distribution"],
          ["At idealized equilibrium D outputs around 0.5","Real and generated distributions are similar enough that D cannot reliably separate them"],
        ]}/>
      </section>

      <section className="space-y-4">
        <h2>Conditional GANs generate a requested class</h2>
        <p>If the goal is “generate the digit 7”, provide the class label as extra information to both the generator and discriminator. The condition helps G create the requested class and helps D judge whether the sample matches it.</p>
      </section>

      <Bridge question="GANs learn through competition. Diffusion models avoid that game and instead learn many small denoising steps. How does that turn random noise into a sample?" to="/learn/diffusion-models" label="Diffusion Models" />

      <SummaryCard items={[
        "A GAN trains a generator and discriminator in an adversarial game.",
        "During the discriminator update, detached G(z) prevents discriminator gradients from updating the generator.",
        "For D(x)=0.90 and D(G(z))=0.20, the toy discriminator loss is about 0.328.",
        "Mode collapse means many latent inputs produce too little output diversity.",
        "A discriminator near 0.5 at idealized equilibrium can mean generated and real distributions have become hard to distinguish.",
        "Conditional GANs supply class or other guidance to both G and D.",
      ]}/>
    </div>
  );
}

function DiffusionLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>What if generation were learned as many small cleanup steps?</h2>
        <p className="text-lg">A diffusion model learns to reverse a gradual noising process. During training, we deliberately add known noise to real data. The model learns to predict that noise. During generation, we start from random noise and repeatedly apply learned denoising steps.</p>
      </section>

      <FigureShell title="Training and generation run in opposite directions" caption="Training knows the sampled noise because we added it. Generation starts from random noise and repeatedly uses the trained denoiser plus a scheduler." accessibleDescription="Training path goes from clean sample to noisy sample with known epsilon and learns a denoiser. Generation path starts at random noise and applies repeated reverse updates to create a structured sample.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5"><strong>Training</strong><p className="mt-2 text-sm">clean x₀ → add known ε at timestep t → noisy xₜ → predict ε̂ → compare ε̂ with ε → update parameters</p></div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><strong>Generation</strong><p className="mt-2 text-sm">random xT → predict noise → scheduler computes a less noisy sample → repeat → structured output</p></div>
        </div>
      </FigureShell>

      <section className="space-y-4">
        <h2>A one-value forward-noising example</h2>
        <p>Let clean value x₀=0.80, cumulative signal factor ᾱₜ=0.64, and sampled noise ε=-0.50. Then √0.64=0.80 and √(1-0.64)=0.60.</p>
        <FormulaBlock expression="xₜ = √ᾱₜ x₀ + √(1-ᾱₜ) ε = 0.80×0.80 + 0.60×(-0.50) = 0.34" explanation="The noisy value 0.34 combines a scaled clean signal with scaled sampled noise." />
      </section>

      <section className="space-y-4">
        <h2>ε and ε̂ are not the same thing</h2>
        <p><strong>ε</strong> is the actual random noise sampled during training, so we know it. <strong>ε̂</strong> is the model's prediction after seeing xₜ and timestep t. A common training objective compares those two values.</p>
        <FormulaBlock expression="L = mean((ε - ε̂θ(xₜ,t))²)" explanation="If the training loop compares ε̂ with the clean x₀ instead of the sampled ε, it is using the wrong target for this noise-prediction objective." />
      </section>

      <section className="space-y-4">
        <h2>What does the scheduler do?</h2>
        <p>The denoising network predicts noise-related information. The <strong>scheduler</strong> stores the timestep sequence and numerical reverse-update rule that turns the current sample into the next, usually less noisy sample.</p>
        <p>More reverse steps mean more model evaluations, which can increase quality in some settings but also increases latency and compute.</p>
      </section>

      <Bridge question="Pixel-space diffusion can be expensive because every denoising step works on all pixels. What if we denoise a much smaller learned representation instead?" to="/learn/stable-latent-diffusion" label="Latent Diffusion & Stable Diffusion" />

      <SummaryCard items={[
        "Diffusion training adds known noise to real samples and learns to predict that noise.",
        "Generation starts from random noise and keeps the trained parameters fixed while denoising repeatedly.",
        "With x₀=0.80, ᾱₜ=0.64, and ε=-0.50, the toy noisy value is xₜ=0.34.",
        "ε is sampled target noise; ε̂ is the model's prediction of that noise.",
        "The scheduler converts denoiser predictions into the next reverse-process sample.",
        "Diffusion generation trades repeated model evaluations for gradual refinement.",
      ]}/>
    </div>
  );
}

export function GenAIBeginnerFoundationsContent({ topicId }: { topicId: string }) {
  if (topicId === "generative-ai-intro") return <GenAIIntro />;
  if (topicId === "generative-vs-discriminative") return <GenerativeVsDiscriminative />;
  if (topicId === "how-generative-models-learn") return <HowGenerativeModelsLearn />;
  if (topicId === "vae") return <VAELesson />;
  if (topicId === "gans") return <GANLesson />;
  if (topicId === "diffusion-models") return <DiffusionLesson />;
  return null;
}
