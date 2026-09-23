import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowDown,
  BrainCircuit,
  CheckCircle2,
  Dice5,
  SlidersHorizontal,
} from "lucide-react";
import {
  LatentRepresentationFigure,
  LearningGenerationModesFigure,
} from "../../components/diagrams/GenAIDiagrams";

function ProcessBox({
  label,
  detail,
  tone = "indigo",
}: {
  label: string;
  detail: string;
  tone?: "indigo" | "violet" | "emerald";
}) {
  const tones = {
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-950",
    violet: "border-violet-200 bg-violet-50 text-violet-950",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
  };

  return (
    <div className={`min-w-0 rounded-xl border p-4 text-center ${tones[tone]}`}>
      <p className="font-bold">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
    </div>
  );
}

export function HowGenerativeModelsLearnContent() {
  const codeExample = `categories = ["forest", "coast", "city"]

# Calculated from 10 training examples: 5 forest, 3 coast, 2 city
unconditional = [0.50, 0.30, 0.20]

# Learned for the developer-supplied condition "sunset"
sunset_condition = [0.20, 0.70, 0.10]

def choose_category(random_value, probabilities):
    running_total = 0.0
    for category, probability in zip(categories, probabilities):
        running_total += probability
        if random_value < running_total:
            return category

r = 0.35  # normally supplied by a random-number generator
print(choose_category(r, unconditional))      # forest
print(choose_category(r, sunset_condition))   # coast`;

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">How can a model create something it has never stored?</h2>
        <p className="text-lg leading-relaxed text-slate-700">
          A generative model studies many examples and adjusts its internal parameters so that common structures become more likely than implausible ones. During generation, it uses those learned patterns plus a starting signal—often a random value, a prompt, a class label, an image, or an unfinished sequence—to construct a new sample.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          By the end of this lesson, you will be able to explain what a learned data distribution means, what a latent representation stores, why randomness creates variety, how conditioning gives control, and why training and generation are separate processes.
        </p>
      </section>

      <LearningGenerationModesFigure />

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Two different questions: deciding and generating</h2>
        <p className="leading-relaxed text-slate-700">
          Suppose a dataset contains photographs of forests, coasts, and cities. A discriminative model receives one photograph and asks which class it belongs to. A generative model asks what combinations of colour, texture, shape, and layout would look plausible among those photographs.
        </p>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-900">
              <tr><th className="p-4">Model viewpoint</th><th className="p-4">Question</th><th className="p-4">Input</th><th className="p-4">Output</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Discriminative</td><td className="p-4">“Which class does this example belong to?”</td><td className="p-4">An existing photograph</td><td className="p-4">Forest, coast, or city</td></tr>
              <tr><td className="p-4 font-semibold">Generative</td><td className="p-4">“What examples could plausibly come from this data?”</td><td className="p-4">A starting signal and optional guidance</td><td className="p-4">A newly constructed scene</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What “learning the data distribution” means</h2>
        <p className="leading-relaxed text-slate-700">
          A <strong>distribution</strong> describes which outcomes are possible and how likely they are. For a simple dataset, it may say that 5 of 10 scenes are forests, 3 are coasts, and 2 are cities. A useful image model must learn much richer relationships: where sky usually appears, how water reflects light, which edges form buildings, and which combinations rarely occur.
        </p>
        <div className="not-prose mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="font-bold text-indigo-950">Tiny probability estimate</p>
          <p className="mt-2 font-mono text-sm text-slate-800">p̂(category) = count(category) / N</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Here <strong>count(category)</strong> comes from the training data and <strong>N = 10</strong> is the total number of examples. Therefore p̂(forest) = 5/10 = 0.50, p̂(coast) = 3/10 = 0.30, and p̂(city) = 2/10 = 0.20. The hat on p̂ means this is an estimate learned from available data, not a perfect description of the real world.
          </p>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          Neural generative models do not usually keep a small frequency table like this. Their learned parameters represent many interacting probabilities. The small table is useful because it exposes the same central idea: generation chooses from patterns that training made more or less likely.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Representation and latent-space intuition</h2>
        <p className="leading-relaxed text-slate-700">
          A <strong>representation</strong> is an internal numerical description that preserves useful features. A <strong>latent space</strong> is a representation space whose coordinates are learned rather than directly supplied as labels. One direction might respond to open water, another to brightness, and another to dense vertical edges—even when nobody named those features during training.
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">
          “Latent” means hidden. A point in latent space is not the address of a saved picture. It is a compact set of feature values that a decoder or generator can transform into an output. Nearby points often produce related outputs because their feature values are similar.
        </p>
      </section>

      <LatentRepresentationFigure />

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Randomness, sampling, and conditioning</h2>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <Dice5 className="h-7 w-7 text-amber-700" />
            <h3 className="mt-3 font-bold text-amber-950">Randomness supplies variety</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">A random number, noise vector, or random token choice lets repeated runs reach different plausible regions instead of returning one fixed result.</p>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <BrainCircuit className="h-7 w-7 text-indigo-700" />
            <h3 className="mt-3 font-bold text-indigo-950">Sampling makes a choice</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">Sampling uses the learned probabilities to select a next token, latent point, category, or denoising path.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <SlidersHorizontal className="h-7 w-7 text-violet-700" />
            <h3 className="mt-3 font-bold text-violet-950">Conditioning supplies direction</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">A prompt, class, reference image, mask, or other signal changes which outputs are likely without removing all variety.</p>
          </div>
        </div>
        <p className="mt-5 leading-relaxed text-slate-700">
          Conditioning can be written as <code>p(output | condition)</code>: the probability of an output given extra information. For example, “coast scene” narrows the possibilities, while a random starting value still changes the waves, clouds, colours, and layout.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Worked example: one random value, two distributions</h2>
        <p className="leading-relaxed text-slate-700">
          This toy example samples a scene category. It deliberately uses tiny numbers so every intermediate step is visible. A real model learns many dependent features together and then constructs pixels, audio samples, or tokens.
        </p>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Value</th><th className="p-4">Value used</th><th className="p-4">Where it came from</th><th className="p-4">Role</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Unconditional probabilities</td><td className="p-4">forest 0.50, coast 0.30, city 0.20</td><td className="p-4">Calculated from 10 training examples</td><td className="p-4">Base learned distribution</td></tr>
              <tr><td className="p-4 font-semibold">Condition</td><td className="p-4">sunset</td><td className="p-4">Chosen by the developer or user</td><td className="p-4">Guides the requested output</td></tr>
              <tr><td className="p-4 font-semibold">Conditional probabilities</td><td className="p-4">forest 0.20, coast 0.70, city 0.10</td><td className="p-4">Toy values representing learned sunset relationships</td><td className="p-4">Distribution after guidance</td></tr>
              <tr><td className="p-4 font-semibold">Random draw r</td><td className="p-4">0.35</td><td className="p-4">Normally produced by a random-number generator</td><td className="p-4">Selects one probability interval</td></tr>
            </tbody>
          </table>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Without a condition</h3>
            <p className="mt-3 text-sm text-slate-700">Intervals: forest [0.00, 0.50), coast [0.50, 0.80), city [0.80, 1.00).</p>
            <p className="mt-2 text-sm text-slate-700">Because 0.35 lies in [0.00, 0.50), the calculated choice is <strong>forest</strong>.</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
            <h3 className="font-bold text-violet-950">Conditioned on “sunset”</h3>
            <p className="mt-3 text-sm text-slate-700">Intervals: forest [0.00, 0.20), coast [0.20, 0.90), city [0.90, 1.00).</p>
            <p className="mt-2 text-sm text-slate-700">The same 0.35 now lies in [0.20, 0.90), so the calculated choice becomes <strong>coast</strong>.</p>
          </div>
        </div>
        <p className="mt-5 leading-relaxed text-slate-700">
          The model has not retrieved training image number 7. It selected a plausible region using learned probabilities; a real generator would then use many learned feature values to construct a new coast scene. Similarity can still become memorization when training data is small or duplicated, so generated samples must be checked for near-copies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Reproduce the sampling calculation in Python</h2>
        <p className="text-slate-700 mb-4">The function adds probabilities from left to right. The first cumulative interval containing <code>random_value</code> determines the result.</p>
        <div className="not-prose overflow-hidden rounded-xl bg-[#172033] shadow-lg">
          <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">sampling_demo.py</div>
          <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100"><code>{codeExample}</code></pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Training and generation do different jobs</h2>
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <figure className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <figcaption className="font-bold text-blue-950">TRAINING — parameters change</figcaption>
            <div className="mt-4 space-y-3 text-center text-sm">
              <ProcessBox label="Examples" detail="Developer supplies a training dataset" />
              <ArrowDown className="mx-auto h-5 w-5 text-blue-500" />
              <ProcessBox label="Learning objective" detail="Measures how the model should improve" tone="violet" />
              <ArrowDown className="mx-auto h-5 w-5 text-blue-500" />
              <ProcessBox label="Parameter updates" detail="Optimizer changes learned weights many times" tone="emerald" />
            </div>
          </figure>
          <figure className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <figcaption className="font-bold text-emerald-950">GENERATION / INFERENCE — parameters stay fixed</figcaption>
            <div className="mt-4 space-y-3 text-center text-sm">
              <ProcessBox label="Trained parameters" detail="Saved knowledge from training" tone="violet" />
              <ArrowDown className="mx-auto h-5 w-5 text-emerald-500" />
              <ProcessBox label="Random or conditional input" detail="Seed, prompt, class, image, or partial output" />
              <ArrowDown className="mx-auto h-5 w-5 text-emerald-500" />
              <ProcessBox label="New sample" detail="Constructed output; no training update is required" tone="emerald" />
            </div>
          </figure>
        </div>
        <p className="mt-4 leading-relaxed text-slate-700">
          Training may take millions of updates and substantial compute. Generation normally reuses the frozen trained parameters for each request. Fine-tuning is another training stage; prompting a model is not fine-tuning it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Four common ways to generate</h2>
        <p className="leading-relaxed text-slate-700">These are only orientation points. The next lessons explain the architectures and objectives in detail.</p>
        <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100"><tr><th className="p-4">Mechanism</th><th className="p-4">High-level generation idea</th><th className="p-4">Where variety enters</th><th className="p-4">Later lesson</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              <tr><td className="p-4 font-semibold">Autoregressive</td><td className="p-4">Generate one part, then use it to help generate the next part.</td><td className="p-4">Sample among likely next tokens or values.</td><td className="p-4"><Link className="font-semibold text-indigo-700" to="/learn/llm-intro">LLM introduction</Link></td></tr>
              <tr><td className="p-4 font-semibold">Latent-variable / VAE</td><td className="p-4">Sample a compact latent variable and decode it into data.</td><td className="p-4">Sample the latent point.</td><td className="p-4"><Link className="font-semibold text-indigo-700" to="/learn/vae">Variational Autoencoders</Link></td></tr>
              <tr><td className="p-4 font-semibold">Adversarial / GAN</td><td className="p-4">Map noise to a sample after learning through competition with a discriminator.</td><td className="p-4">Sample the generator input noise.</td><td className="p-4"><Link className="font-semibold text-indigo-700" to="/learn/gans">GANs</Link></td></tr>
              <tr><td className="p-4 font-semibold">Diffusion / denoising</td><td className="p-4">Start with noise and repeatedly turn it into a structured sample.</td><td className="p-4">Initial noise and probabilistic denoising choices.</td><td className="p-4"><Link className="font-semibold text-indigo-700" to="/learn/diffusion-models">Diffusion Models</Link></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What can go wrong?</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          {[
            ["The data distribution is incomplete", "A model trained mostly on daylight photographs will not automatically learn reliable night scenes."],
            ["Likelihood is not truth", "A plausible sentence or image can still contain a factual, physical, or social error."],
            ["Conditioning is influence, not a guarantee", "A prompt can guide the distribution without forcing every detail to appear correctly."],
            ["Novel-looking output may still be too similar", "Duplicates, small datasets, and overfitting can cause memorization or privacy leakage."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border border-rose-200 bg-rose-50 p-5">
              <div className="flex gap-3"><AlertTriangle className="h-5 w-5 shrink-0 text-rose-600" /><div><h3 className="font-bold text-rose-950">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Summary / Key Takeaways</h2>
        <div className="not-prose rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <ul className="space-y-3 text-slate-700">
            {[
              "A generative model learns patterns that make some data examples more plausible than others.",
              "A discriminative model labels an existing example; a generative model can construct a new one.",
              "A representation stores useful numerical features, and a latent space is a learned hidden representation space.",
              "Sampling turns learned probabilities into one concrete choice; randomness allows multiple valid outputs.",
              "Conditioning changes the output distribution using a prompt, class, image, or other guiding signal.",
              "Training updates parameters from examples and an objective; generation reuses fixed trained parameters.",
              "Autoregressive, VAE, GAN, and diffusion models reach new samples through different mechanisms covered in later lessons.",
            ].map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><span>{item}</span></li>)}
          </ul>
        </div>
      </section>
    </div>
  );
}
