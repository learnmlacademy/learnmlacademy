import React from "react";

function AugmentationGalleryFigure() {
  const Leaf = ({ transform = "", sun = false }: { transform?: string; sun?: boolean }) => (
    <g transform={transform}>
      {sun && <circle cx="48" cy="48" r="24" fill="#fde68a" opacity="0.75" />}
      <path d="M52 116 C35 74 61 31 111 30 C118 79 92 113 52 116 Z" fill={sun ? "#65a30d" : "#22c55e"} stroke="#166534" strokeWidth="3" />
      <path d="M53 115 C72 84 88 63 108 37" fill="none" stroke="#166534" strokeWidth="3" />
      <circle cx="82" cy="70" r="8" fill="#7f1d1d" opacity="0.9" />
      <circle cx="64" cy="88" r="5" fill="#991b1b" opacity="0.9" />
      <circle cx="96" cy="53" r="4" fill="#991b1b" opacity="0.9" />
    </g>
  );
  const panels = [
    { x: 15, title: "Original", detail: "one labelled leaf", transform: "translate(18 25)", sun: false },
    { x: 205, title: "Horizontal flip", detail: "same disease label", transform: "translate(168 25) translate(170 0) scale(-1 1)", sun: false },
    { x: 395, title: "Small rotation", detail: "same disease label", transform: "translate(409 30) rotate(-13 82 72)", sun: false },
    { x: 585, title: "Brightness shift", detail: "same disease label", transform: "translate(598 25)", sun: true },
  ];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">One training image can appear in several realistic forms</p>
        <p className="mt-1 text-sm text-slate-600">A plant-disease classifier should recognize the same symptoms when the camera angle or lighting changes slightly.</p>
      </div>
      <div className="overflow-x-auto p-3 md:p-6">
        <svg viewBox="0 0 790 250" className="h-auto min-w-[700px] w-full" role="img" aria-labelledby="augmentation-gallery-title augmentation-gallery-desc">
          <title id="augmentation-gallery-title">Original diseased leaf and three valid augmentations</title>
          <desc id="augmentation-gallery-desc">The same stylized leaf is flipped, rotated, and brightened while keeping the disease label.</desc>
          <rect width="790" height="250" rx="18" fill="#f8fafc" />
          {panels.map((panel) => (
            <g key={panel.title}>
              <rect x={panel.x} y="18" width="175" height="205" rx="14" fill="white" stroke="#cbd5e1" />
              <Leaf transform={panel.transform} sun={panel.sun} />
              <text x={panel.x + 87.5} y="178" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{panel.title}</text>
              <text x={panel.x + 87.5} y="198" textAnchor="middle" fontSize="12" fill="#475569">{panel.detail}</text>
            </g>
          ))}
          <path d="M190 120 L202 120" stroke="#7c3aed" strokeWidth="3" />
          <path d="M380 120 L392 120" stroke="#7c3aed" strokeWidth="3" />
          <path d="M570 120 L582 120" stroke="#7c3aed" strokeWidth="3" />
        </svg>
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600"><strong>The rule:</strong> each transformation should imitate variation the model may encounter while preserving the answer. A transformation is valid because of the task—not because a library offers it.</figcaption>
    </figure>
  );
}

function PipelineFigure() {
  const steps = [
    ["Stored sample", "image + label", "#dbeafe", "#1d4ed8"],
    ["Random choice", "flip? crop? colour?", "#ede9fe", "#6d28d9"],
    ["Transformed pair", "new pixels + valid label", "#dcfce7", "#15803d"],
    ["Model update", "forward → loss → backward", "#ffedd5", "#c2410c"],
  ];
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-5 font-bold text-slate-900">Where augmentation belongs in the training pipeline</p>
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {steps.map(([title, detail, bg, color], index) => (
          <React.Fragment key={title}>
            <div className="rounded-xl border p-4 text-center" style={{ backgroundColor: bg, borderColor: color }}><p className="font-extrabold" style={{ color }}>{title}</p><p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p></div>
            {index < steps.length - 1 && <div className="text-center text-2xl font-black text-slate-400" aria-hidden="true">→</div>}
          </React.Fragment>
        ))}
      </div>
      <figcaption className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">The original file can remain unchanged. The data loader samples a transformation when it fetches an example, so the model may see a different version in a later epoch. Validation and ordinary prediction use deterministic preprocessing instead.</figcaption>
    </figure>
  );
}

function PairedTargetFigure() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <p className="font-bold text-slate-900">Detection and segmentation targets must move with the image</p>
        <p className="mt-1 text-sm text-slate-600">A horizontal flip changes not only pixels, but also every spatial annotation.</p>
      </div>
      <div className="overflow-x-auto p-4 md:p-6">
        <svg viewBox="0 0 780 300" className="h-auto min-w-[680px] w-full" role="img" aria-labelledby="paired-target-title paired-target-desc">
          <title id="paired-target-title">Correct and incorrect horizontal flipping of a detection box</title>
          <desc id="paired-target-desc">A car and its box move from the left to the right when flipped. An incorrect example flips only the image and leaves the box on the left.</desc>
          <rect width="780" height="300" rx="18" fill="#f8fafc" />
          {[
            { x: 20, title: "Original pair", carX: 48, boxX: 40, color: "#2563eb" },
            { x: 280, title: "Correct: image + box", carX: 420, boxX: 410, color: "#16a34a" },
            { x: 540, title: "Wrong: image only", carX: 680, boxX: 560, color: "#dc2626" },
          ].map((p) => (
            <g key={p.title}>
              <rect x={p.x} y="45" width="220" height="170" rx="12" fill="#dbeafe" stroke="#94a3b8" />
              <rect x={p.x} y="160" width="220" height="55" fill="#64748b" />
              <line x1={p.x + 15} y1="188" x2={p.x + 205} y2="188" stroke="white" strokeDasharray="18 12" strokeWidth="3" />
              <rect x={p.carX} y="133" width="100" height="46" rx="10" fill="#f97316" />
              <rect x={p.carX + 18} y="115" width="60" height="31" rx="8" fill="#fb923c" />
              <circle cx={p.carX + 22} cy="180" r="12" fill="#1e293b" /><circle cx={p.carX + 80} cy="180" r="12" fill="#1e293b" />
              <rect x={p.boxX} y="105" width="118" height="92" fill="none" stroke={p.color} strokeWidth="4" />
              <text x={p.x + 110} y="25" textAnchor="middle" fontSize="14" fontWeight="800" fill={p.color}>{p.title}</text>
              <text x={p.x + 110} y="245" textAnchor="middle" fontSize="12" fill="#475569">box coordinates {p.title.startsWith("Wrong") ? "no longer match" : "still match"}</text>
            </g>
          ))}
          <text x="260" y="140" textAnchor="middle" fontSize="24" fontWeight="900" fill="#64748b">→</text>
          <text x="520" y="140" textAnchor="middle" fontSize="24" fontWeight="900" fill="#64748b">vs</text>
        </svg>
      </div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600">For a classification label such as “car,” the class stays unchanged. For bounding boxes, masks or keypoints, the target geometry must receive the same random transformation as the image.</figcaption>
    </figure>
  );
}

function MixupFigure() {
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-4 font-bold text-slate-900">Mixup creates a weighted training example</p>
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1.1fr]">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center"><p className="text-4xl">🐈</p><p className="mt-2 font-mono text-sm">x<sub>A</sub></p><p className="mt-1 font-mono text-xs">y<sub>A</sub> = [1, 0, 0]</p></div>
        <div className="text-center font-black text-slate-500">0.7 ×</div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center"><p className="text-4xl">🐕</p><p className="mt-2 font-mono text-sm">x<sub>B</sub></p><p className="mt-1 font-mono text-xs">y<sub>B</sub> = [0, 1, 0]</p></div>
        <div className="text-center text-2xl font-black text-slate-400">→</div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-center"><p className="text-sm font-extrabold text-violet-900">blended input</p><p className="mt-2 font-mono text-sm">x&apos; = 0.7x<sub>A</sub> + 0.3x<sub>B</sub></p><p className="mt-2 font-mono text-sm font-bold">y&apos; = [0.7, 0.3, 0]</p></div>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-slate-600">The target must be mixed by the same coefficient as the input. The model is trained to change smoothly between examples rather than drawing an unnecessarily sharp boundary around every training point.</figcaption>
    </figure>
  );
}

const domainRows = [
  ["Photographs", "Small crop, horizontal flip, mild rotation, brightness/contrast", "Changes expected camera position, framing and lighting", "Vertical flip when upside-down objects never occur"],
  ["Medical images", "Modality-approved geometry/intensity changes", "Models acquisition variation without changing pathology", "A transformation that alters anatomical laterality or removes a lesion"],
  ["Text", "Careful paraphrase, back-translation, masked-token replacement", "Changes wording while attempting to preserve meaning", "Synonym replacement that reverses sentiment or changes entities"],
  ["Audio", "Time shift, background noise, room impulse, modest speed/pitch", "Models microphone, timing and environment variation", "Pitch/time changes that alter speaker, emotion or class"],
  ["Time series", "Jitter, scaling, window crop, time warp when valid", "Models plausible sensor noise or timing variation", "Shuffling time order when sequence order carries the label"],
] as const;

export function DataAugmentationContent() {
  return (
    <div className="prose prose-lg max-w-none text-slate-700">
      <section className="not-prose mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-800 px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-emerald-200">Deep Learning · Training Data</p>
        <h2 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">Data Augmentation: Create Useful Variation Without Changing the Answer</h2>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-emerald-50 md:text-xl">A model may see only one photograph of a diseased leaf during training, while the same leaf can appear brighter, shifted or slightly rotated in the field. Data augmentation presents realistic variations during training so the network learns what should stay the same. You will learn the label-preserving rule, choose safe transformations, follow Mixup numerically, handle boxes and masks correctly, and build separate training and validation pipelines.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Why One Stored Example Is Not One Possible Appearance</h2>
        <p className="text-lg leading-relaxed">Suppose a plant-disease app is trained only on centered leaves photographed in soft daylight. A farmer later photographs the same disease from the other side, closer to the camera and under stronger sunlight. The object and diagnosis are unchanged, but the pixel values are different. A model that memorized the training photographs can fail.</p>
        <p className="text-lg leading-relaxed"><strong>Data augmentation</strong> applies a sampled transformation to a training example before it reaches the model. The transformation might change position, orientation, colour, noise or even combine examples. Its purpose is to encode an <strong>invariance</strong>: a change the prediction should ignore. For this leaf task, a small shift should not change the diagnosis.</p>
        <AugmentationGalleryFigure />
        <div className="not-prose rounded-xl border-l-4 border-amber-400 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950"><strong>Augmentation does not manufacture new evidence:</strong> twenty views of one leaf still come from one biological specimen. It can improve robustness to chosen variations, but it cannot create missing disease types, patient groups, environments or rare cases.</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Label-Preserving Rule Decides What Is Safe</h2>
        <p className="text-lg leading-relaxed">For supervised learning, each input x has a target y. A sampled transformation T produces a new input x&apos;. If the transformation changes the meaning of the label, the target must change too—or the augmentation is invalid.</p>
        <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">General augmentation rule</p>
          <p className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-xl font-bold">T ~ P(T) &nbsp;&nbsp; x&apos; = T(x) &nbsp;&nbsp; y&apos; = T<sub>target</sub>(y)</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-200"><strong>P(T)</strong> is the chosen distribution of possible transformations. For ordinary image classification, T<sub>target</sub> may leave the class unchanged. For object detection or segmentation, it must transform boxes, keypoints or masks to stay aligned.</p>
        </div>
        <div className="not-prose mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">Usually valid for a cat classifier</p><p className="mt-2 text-sm leading-relaxed text-slate-700">A modest crop or horizontal flip can leave “cat” correct if the cat remains visible and cats can realistically face either direction.</p></div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-950">Potentially invalid for digit recognition</p><p className="mt-2 text-sm leading-relaxed text-slate-700">A 180° rotation can turn a handwritten 6 into something resembling 9. The transformation may change the class rather than preserve it.</p></div>
        </div>
        <PairedTargetFigure />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Geometric and Appearance Changes Teach Different Invariances</h2>
        <p className="text-lg leading-relaxed"><strong>Geometric transformations</strong> change where or how an object is arranged: crop, translate, rotate, scale, flip or warp. <strong>Appearance transformations</strong> change how values look without moving the object: brightness, contrast, colour, blur or noise. A good policy reflects the variation expected after deployment.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[940px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Data and task</th><th className="p-3 text-left">Possible starting transformations</th><th className="p-3 text-left">What they teach</th><th className="p-3 text-left">Example to avoid</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{domainRows.map(([task, transforms, teaches, avoid]) => <tr key={task} className="align-top"><td className="p-3 font-bold text-slate-900">{task}</td><td className="p-3 text-indigo-800">{transforms}</td><td className="p-3 text-slate-700">{teaches}</td><td className="p-3 text-rose-800">{avoid}</td></tr>)}</tbody></table>
        </div>
        <p className="mt-5 text-lg leading-relaxed">The <strong>magnitude</strong> matters. Rotating a street sign by 5° may model a tilted camera; rotating it by 90° may create an impossible road scene. Treat probability and strength as hyperparameters, inspect samples, and validate the whole policy.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Online Augmentation Samples a New View During Training</h2>
        <PipelineFigure />
        <p className="text-lg leading-relaxed"><strong>Online augmentation</strong> generates transformations as batches are loaded. It saves storage and can expose the model to different variants across epochs. <strong>Offline augmentation</strong> saves generated examples in advance, which can be useful when transformations are expensive or must be audited, but consumes storage and limits the variants to those precomputed.</p>
        <div className="not-prose rounded-2xl border border-blue-200 bg-blue-50 p-5 md:p-6">
          <h3 className="text-xl font-bold text-blue-950">How many examples did the model really see?</h3>
          <p className="mt-2 leading-relaxed text-slate-700">Suppose the collected dataset contains 1,000 stored images; that count comes from the data. The developer chooses a 20-epoch training budget, and the loader samples one transformed view each time an image is fetched.</p>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-800">presentations = 1,000 images × 20 epochs = <strong>20,000 training presentations</strong></p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700"><strong>Interpretation:</strong> the network can encounter up to 20 sampled views per stored image. Do not report this as 20,000 independent real observations—the underlying subjects and information still come from the original 1,000.</p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Mixup Changes Both the Input and the Target</h2>
        <p className="text-lg leading-relaxed">Simple transformations keep one class label. <strong>Mixup</strong> instead forms a weighted combination of two training inputs and the same weighted combination of their label vectors. The mixing coefficient λ (lambda) lies between 0 and 1.</p>
        <div className="not-prose rounded-2xl bg-slate-950 p-5 text-white md:p-6"><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-300">Mixup</p><p className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-xl font-bold">x&apos; = λx<sub>A</sub> + (1 − λ)x<sub>B</sub> &nbsp;&nbsp; y&apos; = λy<sub>A</sub> + (1 − λ)y<sub>B</sub></p><p className="mt-3 text-sm leading-relaxed text-slate-200">x<sub>A</sub> and x<sub>B</sub> are two inputs; y<sub>A</sub> and y<sub>B</sub> are their one-hot targets; λ controls how much of example A remains.</p></div>
        <MixupFigure />
        <p className="text-lg leading-relaxed">For a transparent hand calculation, choose λ = 0.7. In real Mixup training, software usually samples λ from a Beta distribution whose shape is controlled by a developer-chosen hyperparameter. The cat and dog inputs come from the batch; their class IDs produce one-hot targets [1, 0, 0] and [0, 1, 0]. Because A contributes 0.7, B must contribute the remaining 1 − 0.7 = 0.3. Therefore the new target is 0.7[1,0,0] + 0.3[0,1,0] = <strong>[0.7, 0.3, 0]</strong>. The input pixels are blended with exactly the same two proportions, and the loss must accept soft targets. <strong>CutMix</strong> uses a patch from another image instead of blending every pixel, and weights the target according to the retained area. Both methods should be validated for the task; a visually strange mixture may not help specialized domains.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Build Separate Training and Validation Pipelines</h2>
        <p className="text-lg leading-relaxed">Random augmentation belongs in the training pipeline because it changes the learning problem. Validation should answer a stable question, so it normally uses deterministic resize/crop and the same normalization required by the model. Running random validation transformations makes metrics fluctuate and changes the examples being compared across experiments.</p>
        <div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">augmentation_pipeline.py</div>
          <pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`import torch
from torchvision.transforms import v2

# Random operations are sampled only for training examples.
train_transform = v2.Compose([
    v2.ToImage(),
    v2.RandomResizedCrop((224, 224), scale=(0.75, 1.0), antialias=True),
    v2.RandomHorizontalFlip(p=0.5),
    v2.ColorJitter(brightness=0.15, contrast=0.15),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(mean=[0.485, 0.456, 0.406],
                 std=[0.229, 0.224, 0.225]),
])

# Validation is repeatable: no random crop, flip or colour jitter.
validation_transform = v2.Compose([
    v2.ToImage(),
    v2.Resize(256, antialias=True),
    v2.CenterCrop((224, 224)),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(mean=[0.485, 0.456, 0.406],
                 std=[0.229, 0.224, 0.225]),
])

# The same stored file can return a new training view when fetched again.
train_dataset = LeafDataset(train_rows, transform=train_transform)
validation_dataset = LeafDataset(validation_rows, transform=validation_transform)`}</pre>
        </div>
        <div className="not-prose mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 md:p-6">
          <p className="font-bold text-indigo-950">How to read the choices in this pipeline</p>
          <ul className="mt-3 space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            <li><strong>224 × 224</strong> is the chosen model input size. The validation image is first resized to <strong>256</strong>, then centre-cropped to the same 224 × 224 shape so both pipelines feed equal tensor dimensions.</li>
            <li><code>scale=(0.75, 1.0)</code> asks the random crop to retain 75%–100% of an image-area range; <code>p=0.5</code> gives each training image a 50% chance of flipping. The brightness and contrast limits <strong>0.15</strong> are mild starting hyperparameters, not learned values.</li>
            <li>The three mean and standard-deviation values correspond to red, green and blue channels. These particular values are the conventional ImageNet statistics and are appropriate when matching ImageNet-pretrained weights; calculate statistics from the training split when using a different recipe.</li>
            <li><code>Compose</code> applies transforms in listed order. <code>ToDtype(..., scale=True)</code> converts pixel values to floating point and rescales ordinary 0–255 integers to 0–1 before normalization.</li>
          </ul>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">Current torchvision v2 transforms can jointly handle images and supported targets such as bounding boxes and masks. Confirm that your dataset wraps those targets correctly and inspect a transformed batch before training.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Audit the Policy Before Trusting It</h2>
        <div className="not-prose grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["View a contact sheet", "Plot dozens of transformed input-target pairs. Human inspection catches cropped-away objects, corrupted text and misaligned masks."],
            ["Compare a baseline", "Train with no augmentation, a mild policy and a stronger policy using the same split and seeds. Keep the simplest policy that reliably helps."],
            ["Track both curves", "Augmentation often makes training accuracy lower while validation improves. If both collapse, the policy may be too strong."],
            ["Check class effects", "A crop may remove small objects more often from one class. Report per-class metrics, not only an overall average."],
            ["Test deployment slices", "Measure performance by camera, location, lighting, language or noise level. A global metric may hide a failure mode."],
            ["Make randomness reproducible", "Record transform settings and seeds. For debugging, replay a failing sample with deterministic parameters."],
          ].map(([title, body]) => <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="font-bold text-indigo-900">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div>)}
        </div>
        <div className="not-prose mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[900px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Symptom</th><th className="p-3 text-left">Possible mistake</th><th className="p-3 text-left">Correction</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{[
            ["Validation changes every run", "Random augmentations used for validation", "Use deterministic validation preprocessing; seed only where randomness is intentional"],
            ["Detection loss becomes erratic", "Boxes/masks were not transformed with the image", "Use a joint transform API and visualize paired outputs"],
            ["Training accuracy is extremely low", "Crop, erase or colour changes are too aggressive", "Reduce magnitude/probability and confirm the labelled object remains visible"],
            ["Offline accuracy improves but field accuracy does not", "Chosen transforms do not match real variation", "Study production errors and encode plausible invariances, not arbitrary ones"],
            ["Mixup code fails or learns hard labels", "Loss/targets do not support probability targets", "Use a compatible cross-entropy implementation and mix targets with the same λ"],
          ].map(([symptom, cause, fix]) => <tr key={symptom} className="align-top"><td className="p-3 font-bold text-slate-900">{symptom}</td><td className="p-3 text-rose-800">{cause}</td><td className="p-3 text-indigo-800">{fix}</td></tr>)}</tbody></table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">The Essential Rule</h2>
        <div className="not-prose rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-lg font-bold text-emerald-950">Augmentation is a statement about the world: “If the input changes in this way, the correct answer should remain the same—or the target should change in this precisely matching way.”</p>
          <ul className="mt-4 space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            <li>Choose transformations from real deployment variation and task semantics.</li>
            <li>Apply randomness to training, while keeping validation repeatable.</li>
            <li>Transform spatial targets together with their inputs.</li>
            <li>Mixup and CutMix require corresponding soft or area-weighted targets.</li>
            <li>Inspect examples and validate policies; more aggressive is not automatically better.</li>
            <li>Augmentation complements representative data but does not replace it.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Continue Learning</h2>
        <div className="not-prose mb-10 grid gap-4 md:grid-cols-2">
          <a href="/learn/deep-learning-regularization" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Previous concept</p><p className="m-0 font-bold text-slate-900">Regularization and Generalization</p></a>
          <a href="/learn/cnn" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Next concept</p><p className="m-0 font-bold text-slate-900">CNNs and Image Classification</p></a>
        </div>
      </section>
    </div>
  );
}
