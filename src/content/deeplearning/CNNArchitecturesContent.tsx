import React from "react";

function ArchitectureTimeline() {
  const models = [
    { year: "1998", name: "LeNet-5", idea: "Conv + pooling for digits", x: 70, color: "#2563eb" },
    { year: "2012", name: "AlexNet", idea: "Scale, GPUs, ReLU, dropout", x: 240, color: "#16a34a" },
    { year: "2014", name: "VGG", idea: "Repeat small 3×3 filters", x: 410, color: "#d97706" },
    { year: "2014", name: "GoogLeNet", idea: "Parallel multi-scale branches", x: 580, color: "#7c3aed" },
    { year: "2015", name: "ResNet", idea: "Identity shortcuts", x: 750, color: "#db2777" },
  ];
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4"><p className="font-bold text-slate-900">CNN progress was a sequence of solved bottlenecks</p><p className="mt-1 text-sm text-slate-600">Read this as a map of design ideas, not a leaderboard for today.</p></div>
      <div className="overflow-x-auto p-3 md:p-6"><svg viewBox="0 0 840 310" className="h-auto min-w-[720px] w-full" role="img" aria-labelledby="arch-timeline-title arch-timeline-desc"><title id="arch-timeline-title">Timeline from LeNet-5 to ResNet</title><desc id="arch-timeline-desc">Five architecture milestones and the main problem-solving idea associated with each.</desc><defs><marker id="timeline-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#64748b" /></marker></defs><rect width="840" height="310" rx="18" fill="#f8fafc" /><line x1="65" y1="155" x2="790" y2="155" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#timeline-arrow)" />{models.map((model, index) => <g key={model.name}><circle cx={model.x} cy="155" r="12" fill={model.color} stroke="white" strokeWidth="4" /><line x1={model.x} y1="143" x2={model.x} y2={index % 2 === 0 ? 104 : 205} stroke={model.color} strokeWidth="2" /><rect x={model.x - 70} y={index % 2 === 0 ? 35 : 205} width="140" height="70" rx="12" fill="white" stroke={model.color} strokeWidth="2" /><text x={model.x} y={index % 2 === 0 ? 58 : 229} textAnchor="middle" fontSize="12" fontWeight="800" fill={model.color}>{model.year} · {model.name}</text><foreignObject x={model.x - 62} y={index % 2 === 0 ? 66 : 237} width="124" height="34"><div className="text-center text-[10px] leading-tight text-slate-600">{model.idea}</div></foreignObject></g>)}</svg></div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600">Each model inherited ordinary convolutional building blocks. Its historical importance comes from a design or training choice that made a new scale of visual learning practical.</figcaption>
    </figure>
  );
}

function SmallFiltersFigure() {
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-2 font-bold text-slate-900">Why VGG repeated 3 × 3 convolutions</p>
      <p className="mb-5 text-sm leading-relaxed text-slate-600">Two stride-1, unpadded 3 × 3 layers give the second layer a 5 × 5 receptive field, with a nonlinearity between them.</p>
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center"><p className="text-3xl font-black text-blue-900">3 × 3</p><p className="mt-2 text-xs text-slate-600">first local view</p></div><span className="text-center text-2xl font-black text-slate-400">→ ReLU →</span><div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center"><p className="text-3xl font-black text-blue-900">3 × 3</p><p className="mt-2 text-xs text-slate-600">second local view</p></div><span className="text-center text-2xl font-black text-slate-400">=</span><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center"><p className="text-3xl font-black text-emerald-900">5 × 5</p><p className="mt-2 text-xs text-slate-600">effective receptive field</p></div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2"><p className="rounded-lg bg-slate-50 p-4 text-sm"><strong>One 5×5 filter:</strong> 25 spatial weights per input-output channel pair.</p><p className="rounded-lg bg-slate-50 p-4 text-sm"><strong>Two 3×3 filters:</strong> 18 spatial weights in this simplified single-channel comparison, plus an extra learned nonlinearity.</p></div>
      <figcaption className="mt-4 text-xs leading-relaxed text-slate-500">Real multi-channel parameter counts also depend on the number of input and output channels, so the simplified 25-versus-18 comparison is not a complete layer count.</figcaption>
    </figure>
  );
}

function LeNetShapeFigure() {
  const stages = [
    ["Input", "1 × 32 × 32", "1 grayscale channel; 32×32 pixels are supplied by the data"],
    ["C1 convolution", "6 × 28 × 28", "six 5×5 filters are a designer choice; 28 = 32−5+1"],
    ["S2 subsample", "6 × 14 × 14", "each 2×2 region is reduced; the six channels remain"],
    ["C3 convolution", "16 × 10 × 10", "sixteen output maps are chosen; 10 = 14−5+1"],
    ["S4 subsample", "16 × 5 × 5", "spatial width and height are halved again"],
    ["Classifier", "120 → 84 → 10", "120 and 84 are architecture choices; 10 matches the digit classes"],
  ] as const;
  return (
    <figure className="not-prose my-7 rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm md:p-6">
      <p className="font-bold text-blue-950">Read an architecture as a sequence of explained shape changes</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">The historical LeNet-5 flow is useful because every dimension can be followed. Shapes below use channels × height × width for one image.</p>
      <div className="mt-5 grid gap-3">
        {stages.map(([name, shape, reason], index) => (
          <div key={name} className="grid gap-2 rounded-xl border border-blue-100 bg-white p-4 sm:grid-cols-[2.5rem_1fr_1fr_2fr] sm:items-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 font-black text-white">{index + 1}</span>
            <span className="font-bold text-slate-900">{name}</span>
            <span className="font-mono font-bold text-blue-800">{shape}</span>
            <span className="text-sm leading-relaxed text-slate-600">{reason}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-slate-600">Channel counts such as 6 and 16 were selected by the model designers. Spatial sizes such as 28 and 10 are consequences of the filter and padding choices. The final 10 is dictated by the task because the possible labels are digits 0–9.</figcaption>
    </figure>
  );
}

function InceptionCostFigure() {
  return (
    <figure className="not-prose my-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm md:p-6">
      <p className="font-bold text-emerald-950">Why place a 1 × 1 convolution before an expensive 5 × 5 branch?</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">Suppose one location has 192 incoming channels and the branch should produce 32 output channels. These channel counts are architecture choices. Ignore biases so the comparison stays focused.</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-rose-200 bg-white p-5">
          <p className="font-bold text-rose-800">Direct 5 × 5 convolution</p>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-800">5 × 5 spatial weights<br />× 192 input channels<br />× 32 output filters<br />= <strong>153,600 weights</strong></p>
        </div>
        <div className="rounded-xl border border-emerald-300 bg-white p-5">
          <p className="font-bold text-emerald-800">Reduce to 16 channels, then use 5 × 5</p>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-800">1×1 reduction: 1×1×192×16 = 3,072<br />5×5 branch: 5×5×16×32 = 12,800<br />total = <strong>15,872 weights</strong></p>
        </div>
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-slate-700">The 1 × 1 layer multiplies and adds across all 192 channels at each position, learning 16 useful mixtures. The following 5 × 5 filters process those 16 mixtures instead of all 192 maps, reducing this simplified branch count by almost ten times.</figcaption>
    </figure>
  );
}

function InceptionFigure() {
  const branches = ["1×1 conv", "1×1 → 3×3", "1×1 → 5×5", "pool → 1×1"];
  return (
    <figure className="not-prose my-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <p className="mb-5 font-bold text-slate-900">An Inception module asks several size questions in parallel</p>
      <div className="grid items-center gap-4 md:grid-cols-[0.7fr_auto_2fr_auto_0.9fr]"><div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center font-bold text-blue-900">input maps</div><span className="text-center text-2xl font-black text-slate-400">→</span><div className="grid gap-2 sm:grid-cols-2">{branches.map((branch, i) => <div key={branch} className={`rounded-lg border p-3 text-center text-sm font-bold ${i === 0 ? "border-emerald-200 bg-emerald-50 text-emerald-900" : i === 1 ? "border-amber-200 bg-amber-50 text-amber-900" : i === 2 ? "border-violet-200 bg-violet-50 text-violet-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>{branch}</div>)}</div><span className="text-center text-2xl font-black text-slate-400">→</span><div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-center font-bold text-indigo-900">concatenate channels</div></div>
      <figcaption className="mt-5 text-sm leading-relaxed text-slate-600">Small and larger filters capture different spatial scales. The 1 × 1 convolutions before expensive branches reduce channel count, so multi-scale processing costs less than applying every large filter to every input channel.</figcaption>
    </figure>
  );
}

function ResidualBlockFigure() {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4"><p className="font-bold text-slate-900">A residual block learns a useful change while preserving a direct route</p></div>
      <div className="overflow-x-auto p-4 md:p-6"><svg viewBox="0 0 820 310" className="h-auto min-w-[680px] w-full" role="img" aria-labelledby="residual-title residual-desc"><title id="residual-title">Residual block with main and identity paths</title><desc id="residual-desc">Input x flows through two convolutional layers to create F of x and also follows an identity shortcut. The two paths are added and passed through ReLU.</desc><defs><marker id="res-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#475569" /></marker></defs><rect width="820" height="310" rx="18" fill="#f8fafc" /><circle cx="80" cy="160" r="34" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" /><text x="80" y="166" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1e40af">x</text><line x1="115" y1="160" x2="200" y2="160" stroke="#475569" strokeWidth="3" markerEnd="url(#res-arrow)" /><rect x="215" y="120" width="125" height="80" rx="14" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" /><text x="277" y="151" textAnchor="middle" fontSize="14" fontWeight="800" fill="#166534">conv → ReLU</text><text x="277" y="176" textAnchor="middle" fontSize="14" fontWeight="800" fill="#166534">→ conv</text><line x1="341" y1="160" x2="480" y2="160" stroke="#475569" strokeWidth="3" markerEnd="url(#res-arrow)" /><text x="410" y="145" textAnchor="middle" fontSize="13" fontWeight="800" fill="#166534">F(x)</text><path d="M115 145 C180 45 430 45 525 126" fill="none" stroke="#7c3aed" strokeWidth="4" markerEnd="url(#res-arrow)" /><text x="305" y="55" textAnchor="middle" fontSize="14" fontWeight="800" fill="#6d28d9">identity shortcut carries x</text><circle cx="535" cy="160" r="32" fill="#fef3c7" stroke="#d97706" strokeWidth="3" /><text x="535" y="167" textAnchor="middle" fontSize="27" fontWeight="900" fill="#92400e">+</text><line x1="568" y1="160" x2="640" y2="160" stroke="#475569" strokeWidth="3" markerEnd="url(#res-arrow)" /><rect x="655" y="125" width="90" height="70" rx="14" fill="#fce7f3" stroke="#db2777" strokeWidth="2" /><text x="700" y="155" textAnchor="middle" fontSize="14" fontWeight="800" fill="#9d174d">ReLU</text><text x="700" y="177" textAnchor="middle" fontSize="12" fill="#9d174d">output y</text><text x="410" y="260" textAnchor="middle" fontSize="17" fontWeight="900" fill="#0f172a">y = ReLU(F(x) + x)</text></svg></div>
      <figcaption className="border-t border-slate-100 px-5 py-3 text-sm leading-relaxed text-slate-600">The shortcut is usually an identity map when shapes match. If width, height or channel count changes, a learned projection such as a 1 × 1 convolution can align the shapes before addition.</figcaption>
    </figure>
  );
}

const comparisonRows = [
  ["LeNet-5", "1998", "Small conv/pool network for handwritten digits", "Showed learned local features could replace much manual feature design", "Historical teaching; input and activations differ from modern practice"],
  ["AlexNet", "2012", "5 convolutional + 3 dense trainable layers; ReLU, dropout, GPU training", "Made large-scale deep CNN image classification practical", "Large early filters and dense head are compute/parameter heavy"],
  ["VGG-16", "2014", "Uniform stacks of 3×3 convolutions", "Simple repeated design increased depth and receptive field", "About 138M parameters in the standard ImageNet model"],
  ["GoogLeNet / Inception v1", "2014", "Parallel 1×1, 3×3, 5×5 and pooling branches", "Captured multiple scales while reducing expensive channel dimensions", "Branch design is more complex than a plain sequential stack"],
  ["ResNet", "2015", "Residual blocks with identity shortcuts", "Made substantially deeper networks easier to optimize", "Shortcuts help optimization but do not remove compute or guarantee better generalization"],
] as const;

export function CNNArchitecturesContent() {
  return (
    <div className="prose prose-lg max-w-none text-slate-700">
      <section className="not-prose mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-800 px-6 py-10 text-white shadow-xl md:px-10 md:py-12"><p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-indigo-200">Deep Learning · Architecture Design</p><h2 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">From LeNet to ResNet: Why CNN Architectures Changed</h2><p className="mt-5 max-w-4xl text-lg leading-relaxed text-indigo-50 md:text-xl">CNN architecture names are useful only when you understand the problem each design tried to solve. This lesson follows the move from small digit recognizers to GPU-scale networks, repeated small filters, multi-scale branches and residual shortcuts. You will calculate why stacked 3 × 3 filters work, trace a residual block with numbers, and learn when a pretrained architecture is a sensible starting point.</p></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">An Architecture Is a Plan for Moving and Combining Features</h2><p className="text-lg leading-relaxed">The previous lesson explained convolution, feature maps and pooling. An <strong>architecture</strong> specifies how many of those operations are used, how they connect, when spatial size shrinks, how channel count grows and how the final prediction is produced. Changing the plan changes accuracy, memory, speed and how easily gradients reach early layers.</p><p className="text-lg leading-relaxed">The classic architectures below are milestones because each demonstrated a reusable idea. Later models did not simply “add more layers”; they found better ways to use depth, computation and information flow.</p><ArchitectureTimeline /></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">LeNet-5 Established the Basic CNN Pattern</h2><p className="text-lg leading-relaxed">LeNet-5 was designed for small grayscale character images. Its recognizable flow—convolution, subsampling, another convolution, then fully connected classification—showed that a network could learn local stroke patterns and combine them into digit evidence. It is small enough to study, but its original activations and training context belong to an earlier era.</p><LeNetShapeFigure /></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">AlexNet Showed What Scale, ReLU and GPUs Could Do</h2><p className="text-lg leading-relaxed">AlexNet tackled ImageNet: roughly 1.2 million training images across 1,000 classes in the original competition setup. Its five convolutional and three fully connected learned layers were far larger than LeNet. GPU training made the computation feasible; ReLU activations trained faster than saturating tanh units in that setting; overlapping max pooling, data augmentation and dropout were important parts of the system.</p><div className="not-prose grid gap-4 md:grid-cols-3"><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">Compute</p><p className="mt-2 text-sm leading-relaxed text-slate-700">The original network split work across two GPUs because the model did not fit conveniently on one GPU of that era.</p></div><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">Optimization</p><p className="mt-2 text-sm leading-relaxed text-slate-700">ReLU produced positive linear responses instead of saturating both sides like sigmoid/tanh.</p></div><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5"><p className="font-bold text-emerald-950">Generalization</p><p className="mt-2 text-sm leading-relaxed text-slate-700">Random crops/reflections and dropout reduced overfitting in a high-capacity model.</p></div></div></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">VGG Made Depth Easy to Read</h2><p className="text-lg leading-relaxed">VGG replaced a mixture of large filter sizes with a regular pattern: repeat 3 × 3 convolutions, then downsample. Stacking small filters gradually grows the receptive field while placing nonlinear activations between calculations. VGG-16 is conceptually clean and remains useful for education and feature-based perceptual losses, but its dense classifier makes the standard model very large.</p><SmallFiltersFigure /></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">GoogLeNet Looked at Multiple Scales Without Paying the Full Cost</h2><p className="text-lg leading-relaxed">A small filter is good for fine detail; a larger filter sees a wider region. An <strong>Inception module</strong> sends the same input through several branches and concatenates their output channels. A 1 × 1 convolution is more than a spatial filter: at each position it learns a weighted combination across input channels and can reduce the number of channels before a costly 3 × 3 or 5 × 5 operation.</p><InceptionFigure /><InceptionCostFigure /><p className="text-lg leading-relaxed">GoogLeNet also used global average pooling near the end, avoiding the enormous dense head seen in VGG. The trade-off is a more complicated branching design. Modern descendants changed the exact factorization and normalization choices, but the multi-scale and bottleneck ideas remained influential.</p></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">Why Simply Making a Plain Network Deeper Can Fail</h2><p className="text-lg leading-relaxed">Depth lets a network compose more stages of representation, but a deeper plain network can be harder to optimize. The ResNet authors highlighted a <strong>degradation problem</strong>: adding layers could produce higher training error, even when overfitting was not the explanation. In principle, extra layers could copy their input and do no harm; in practice, learning that identity through many nonlinear layers was difficult.</p><p className="text-lg leading-relaxed">A residual block makes the easy path explicit. The main branch learns F(x), a change to the input, while the shortcut carries x directly. Their sum lets a block preserve information when a large change is unnecessary and gives gradient information a direct route backward.</p><ResidualBlockFigure />
        <div className="not-prose rounded-2xl border border-violet-200 bg-violet-50 p-5 md:p-6"><h3 className="text-xl font-bold text-violet-950">One residual addition with numbers</h3><p className="mt-2 leading-relaxed text-slate-700">For a transparent teaching example, we manually choose the incoming feature vector x = [2, −1] and suppose the convolutional branch has calculated F(x) = [0.5, 0.8]. In a trained network, x comes from the previous layer and F(x) is produced by learned convolution and normalization parameters.</p><div className="mt-4 grid gap-3 md:grid-cols-3"><p className="rounded-lg bg-white p-4 font-mono text-sm"><strong>1. Main branch result</strong><br />F(x) = [0.5, 0.8]</p><p className="rounded-lg bg-white p-4 font-mono text-sm"><strong>2. Add matching positions</strong><br />[0.5+2, 0.8+(−1)]<br />= [2.5, −0.2]</p><p className="rounded-lg bg-white p-4 font-mono text-sm"><strong>3. Apply ReLU</strong><br />[max(0,2.5), max(0,−0.2)]<br />= [2.5, 0]</p></div><p className="mt-4 text-sm leading-relaxed text-slate-700"><strong>Why addition?</strong> It preserves the original signal while letting the branch propose a correction at each matching position. The gradient of the addition also contains a direct identity route back to x. Addition requires equal shapes; when shapes differ, the shortcut must first project x to the required size.</p></div>
      </section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">Compare the Design Idea, Not Just the Depth Number</h2><div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[1080px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Architecture</th><th className="p-3 text-left">Published</th><th className="p-3 text-left">Recognizable design</th><th className="p-3 text-left">Problem it helped solve</th><th className="p-3 text-left">Important limitation</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{comparisonRows.map((row) => <tr key={row[0]} className="align-top">{row.map((cell, i) => <td key={cell} className={`p-3 ${i === 0 ? "font-bold text-indigo-800" : "text-slate-700"}`}>{cell}</td>)}</tr>)}</tbody></table></div><p className="mt-4 text-sm leading-relaxed text-slate-600">Parameter totals depend on the exact variant and classifier. For reference, Keras lists approximately 138.4M parameters for its standard VGG16 and 25.6M for ResNet50; depth and parameter count are not the same measurement.</p></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">Implement the Residual Idea Before Using a Full ResNet</h2><p className="text-lg leading-relaxed">This teaching block keeps the same number of channels and the same height and width, so the identity tensor can be added directly. Batch normalization and ReLU are shown in a common basic-block arrangement.</p><div className="not-prose overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">residual_block.py</div><pre className="overflow-x-auto bg-[#1e1e1e] p-5 font-mono text-sm leading-relaxed text-[#d4d4d4]">{`import torch
from torch import nn

class BasicResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.main = nn.Sequential(
            nn.Conv2d(channels, channels, 3, padding=1, bias=False),
            nn.BatchNorm2d(channels),
            nn.ReLU(),
            nn.Conv2d(channels, channels, 3, padding=1, bias=False),
            nn.BatchNorm2d(channels),
        )
        self.relu = nn.ReLU()

    def forward(self, x):
        residual = self.main(x)   # learn F(x)
        return self.relu(residual + x)  # add identity path

block = BasicResidualBlock(channels=32)
x = torch.randn(8, 32, 28, 28)
y = block(x)
      print(y.shape)  # torch.Size([8, 32, 28, 28])`}</pre></div><p className="mt-4 text-sm leading-relaxed text-slate-600">If a block changes shape—for example 32 to 64 channels with stride 2—the shortcut also needs a projection that produces the same shape. Tensor addition cannot combine mismatched dimensions.</p><div className="not-prose mt-5 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2"><p className="text-sm leading-relaxed text-slate-700"><strong>Where the code dimensions come from:</strong> 8 is a chosen teaching batch size; 32 is the chosen channel count for the block; 28 × 28 is a sample spatial size. None of these values is learned.</p><p className="text-sm leading-relaxed text-slate-700"><strong>What the layers do internally:</strong> each 3 × 3 convolution learns filters, padding 1 preserves 28 × 28, BatchNorm normalizes each channel and learns scale/shift parameters, and <code>residual + x</code> performs elementwise addition.</p></div></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">In Practice, Start From a Pretrained Model</h2><p className="text-lg leading-relaxed">For most applied image projects, recreating AlexNet or training ResNet from random weights is not the first choice. A model pretrained on a large image collection has already learned useful visual features. Replace its classifier for your classes, begin with conservative fine-tuning, and validate latency, memory and accuracy on your own data.</p><div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm"><table className="w-full min-w-[900px] text-sm"><thead className="bg-slate-900 text-white"><tr><th className="p-3 text-left">Project constraint</th><th className="p-3 text-left">Reasonable starting direction</th><th className="p-3 text-left">Why</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{[["Learning architecture mechanics","LeNet-like network or hand-built residual block","Small enough to trace every shape"],["General image baseline","Pretrained ResNet-18/50","Widely supported residual backbone"],["Very small device budget","MobileNet/EfficientNet-family lightweight variant","Designed for parameter/FLOP efficiency"],["Need simple feature extractor for legacy workflow","Pretrained VGG features","Easy sequential blocks, but heavy model"],["Large modern vision pretraining","Compare modern CNN with Vision Transformer","Global attention and convolutional bias trade off differently"]].map(([constraint, choice, why]) => <tr key={constraint}><td className="p-3 font-bold text-slate-900">{constraint}</td><td className="p-3 font-bold text-indigo-800">{choice}</td><td className="p-3 text-slate-700">{why}</td></tr>)}</tbody></table></div></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">Mistakes That Architecture Diagrams Can Hide</h2><div className="not-prose grid gap-4 md:grid-cols-2">{[["Counting names instead of tensors","Trace N×C×H×W and the shortcut shape through every stage. A familiar block name does not prevent a dimension error."],["Assuming deeper always means better","Optimization, data size, regularization, compute and task difficulty matter. Compare validated systems, not layer counts."],["Using historical preprocessing blindly","Use the preprocessing specified for the exact pretrained weights. Input size and normalization differ across model families."],["Comparing parameter count alone","Latency depends on operation type, resolution, hardware, memory movement and implementation—not just parameters."],["Forgetting the classifier head","A 1,000-class ImageNet head does not match a four-class project. Replace and train the final layer deliberately."],["Loading weights into the wrong variant","Match architecture, version and weight enum; strict loading errors often reveal a real mismatch rather than an inconvenience."]].map(([title, body]) => <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="font-bold text-indigo-900">{title}</p><p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p></div>)}</div></section>

      <section><h2 className="mb-4 text-2xl font-bold text-indigo-800">The Design Story to Remember</h2><div className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-6"><ul className="m-0 space-y-2 pl-5 text-indigo-950"><li>LeNet established the convolution–downsample–classify pattern.</li><li>AlexNet demonstrated deep CNNs at ImageNet scale with GPUs, ReLU and strong regularization.</li><li>VGG made depth systematic by stacking small 3 × 3 filters.</li><li>GoogLeNet processed several spatial scales in parallel and used 1 × 1 bottlenecks.</li><li>ResNet added identity shortcuts so blocks could learn changes instead of reconstructing everything.</li><li>A modern project should select and benchmark a pretrained architecture against its actual accuracy, latency, memory and data constraints.</li></ul></div></section>

      <section><h2 className="mb-4 border-b pb-2 text-2xl font-bold text-indigo-800">Continue Learning</h2><div className="not-prose mb-10 grid gap-4 md:grid-cols-2"><a href="/learn/cnn" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Previous concept</p><p className="m-0 font-bold text-slate-900">CNNs and Image Classification</p></a><a href="/learn/object-detection" className="rounded-xl border border-slate-200 p-4 no-underline transition-colors hover:border-indigo-300 hover:bg-indigo-50"><p className="mb-1 text-xs font-bold uppercase text-indigo-600">Next concept</p><p className="m-0 font-bold text-slate-900">Object Detection, Segmentation and Grad-CAM</p></a></div></section>
    </div>
  );
}
