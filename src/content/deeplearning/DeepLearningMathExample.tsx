import React from "react";

type MathLesson = {
  title: string;
  intuition: string;
  formula: string;
  symbols: Array<[string, string]>;
  givens: Array<[string, string]>;
  steps: string[];
  result: string;
  meaning: string;
};

const mathLessons: Record<string, MathLesson> = {
  "math-foundations-deep-learning": {
    title: "Calculate the Output of One Neuron by Hand",
    intuition: "A neuron is a small calculator. It gives each input an importance, adds the weighted values, and then adds a bias. A whole layer performs many copies of this calculation at once.",
    formula: "z = w · x + b = Σᵢ wᵢxᵢ + b",
    symbols: [["xᵢ", "input i"], ["wᵢ", "importance, or weight, for input i"], ["b", "bias added after the products"], ["z", "the resulting raw score"]],
    givens: [["Inputs x", "[2, 3]"], ["Weights w", "[0.4, −0.1]"], ["Bias b", "0.5"]],
    steps: ["Multiply matching values: 0.4 × 2 = 0.8 and −0.1 × 3 = −0.3.", "Add the weighted inputs: 0.8 + (−0.3) = 0.5.", "Add the bias: z = 0.5 + 0.5 = 1.0."],
    result: "The neuron’s raw score is z = 1.0.",
    meaning: "Vectors store the inputs and weights; their dot product performs the repeated multiply-and-add. An activation function would normally transform z before it travels to the next layer."
  },
  "tensors-frameworks-gpus": {
    title: "Read an Image Tensor Shape Without Guessing",
    intuition: "A tensor shape is a description of how numbers are organised. Each axis must have a meaning; changing the axis order changes how the model interprets the same stored numbers.",
    formula: "number of stored values = B × C × H × W",
    symbols: [["B", "batch size, or number of images"], ["C", "colour channels"], ["H", "image height"], ["W", "image width"]],
    givens: [["Batch B", "32 images"], ["Channels C", "3"], ["Height H", "64"], ["Width W", "64"]],
    steps: ["One image contains 3 × 64 × 64 = 12,288 values.", "The batch contains 32 such images.", "Total values = 32 × 12,288 = 393,216."],
    result: "Shape [32, 3, 64, 64] stores 393,216 values.",
    meaning: "The GPU can process these images in parallel, but the model must expect the same channel and spatial axis order. Always print a real batch shape before training."
  },
  "neural-network-training-loop": {
    title: "Connect Dataset Size, Batch Size and Weight Updates",
    intuition: "The model normally updates after a small batch, not after every individual example and not only after the entire dataset. One epoch finishes when every training example has been visited once.",
    formula: "updates per epoch = ⌈N / B⌉",
    symbols: [["N", "number of training examples"], ["B", "batch size"], ["⌈ ⌉", "round upward because a partial final batch still needs an update"]],
    givens: [["Training examples N", "100"], ["Batch size B", "16"], ["Epochs", "5"]],
    steps: ["Divide examples by batch size: 100 ÷ 16 = 6.25.", "Round upward: each epoch has 7 batches and therefore 7 updates.", "Across 5 epochs: 7 × 5 = 35 optimizer updates."],
    result: "The loop performs 7 updates per epoch and 35 updates in 5 epochs.",
    meaning: "The final batch contains only four examples unless the loader drops it. This small detail affects batch-normalization statistics and the total number of scheduler steps."
  },
  "deep-learning-optimizers": {
    title: "See One Gradient-Descent Update Numerically",
    intuition: "A gradient tells which direction increases the loss. Gradient descent moves in the opposite direction. The learning rate makes that move small enough to remain controlled.",
    formula: "w_new = w − ηg",
    symbols: [["w", "current weight"], ["η", "learning rate"], ["g", "gradient ∂L/∂w"], ["w_new", "weight after one update"]],
    givens: [["Weight w", "2.00"], ["Gradient g", "+0.60"], ["Learning rate η", "0.10"]],
    steps: ["Scale the gradient: ηg = 0.10 × 0.60 = 0.06.", "Subtract because the gradient points uphill: 2.00 − 0.06.", "The updated weight is 1.94."],
    result: "w moves from 2.00 to 1.94.",
    meaning: "If η were 1, the move would be 0.60; if η were 0.001, it would be 0.0006. Momentum and Adam change how the direction and scale are estimated, but still produce an update."
  },
  "weight-initialization": {
    title: "Calculate a He-Initialization Scale",
    intuition: "Starting weights should be random but not arbitrary. He initialization chooses their spread from the number of incoming connections so ReLU signals do not immediately shrink or grow too much.",
    formula: "standard deviation = √(2 / fan-in)",
    symbols: [["fan-in", "number of values entering a neuron"], ["standard deviation", "the intended spread of the random starting weights"]],
    givens: [["Inputs to each neuron", "100"], ["Activation", "ReLU"], ["fan-in", "100"]],
    steps: ["Divide 2 by fan-in: 2 ÷ 100 = 0.02.", "Take the square root: √0.02 ≈ 0.141.", "Sample random weights with a spread close to 0.141."],
    result: "A suitable He standard deviation is approximately 0.141.",
    meaning: "This does not force every weight to equal 0.141. It controls the spread of many random weights. Xavier scaling is usually a better match for tanh-like activations."
  },
  "deep-learning-regularization": {
    title: "See How L2 Regularization Changes the Objective",
    intuition: "Weight regularization adds a second cost to the data loss. The model must fit the examples while avoiding unnecessarily large weights.",
    formula: "total loss = data loss + λΣw²",
    symbols: [["data loss", "mistake on the training examples"], ["λ", "regularization strength"], ["Σw²", "sum of squared weights"]],
    givens: [["Data loss", "0.40"], ["Weights", "[3, 4]"], ["λ", "0.01"]],
    steps: ["Square and add weights: 3² + 4² = 9 + 16 = 25.", "Scale the penalty: 0.01 × 25 = 0.25.", "Add it to data loss: 0.40 + 0.25 = 0.65."],
    result: "The optimizer sees a total objective of 0.65.",
    meaning: "The added 0.25 encourages smaller weights. If λ is too large, the model may underfit; select it using validation performance."
  },
  "data-augmentation-deep-learning": {
    title: "Understand Augmentation Probability",
    intuition: "An augmentation layer often applies a change only some of the time. Probability creates variety across epochs while leaving some examples close to their original form.",
    formula: "expected changed examples = p × N",
    symbols: [["p", "probability of applying the transformation"], ["N", "number of examples seen"], ["expected", "long-run average, not an exact promise for every batch"]],
    givens: [["Images N", "100"], ["Horizontal-flip probability p", "0.5"], ["Task", "animal classification"]],
    steps: ["Multiply probability and count: 0.5 × 100 = 50.", "Roughly 50 images will be flipped in one pass; the exact number varies.", "The label remains unchanged only if left-right orientation does not define the class."],
    result: "Expect about 50 flipped training images per 100 presentations.",
    meaning: "The arithmetic is easy; semantic validity is the important part. Flipping may be safe for many animals but wrong for text, road direction, or left/right anatomy."
  },
  cnn: {
    title: "Calculate the Size of a Convolution Feature Map",
    intuition: "A filter can be placed only where its complete window fits. Kernel size, stride and padding therefore determine how many positions—and output values—the convolution produces.",
    formula: "output size = ⌊(input + 2P − K) / S⌋ + 1",
    symbols: [["K", "kernel size"], ["S", "stride, or movement per step"], ["P", "padding added around the image"], ["⌊ ⌋", "round downward"]],
    givens: [["Input", "6 × 6"], ["Kernel K", "3"], ["Stride S", "1"], ["Padding P", "0"]],
    steps: ["Substitute one dimension: (6 + 0 − 3) ÷ 1 + 1.", "Calculate: 3 + 1 = 4 positions across.", "Height is identical, so the feature map is 4 × 4."],
    result: "One 3 × 3 filter produces a 4 × 4 feature map.",
    meaning: "If the layer learns eight different filters, it produces eight 4 × 4 feature maps—one channel per learned pattern detector."
  },
  "cnn-architectures-resnet": {
    title: "Calculate a Residual Block Output",
    intuition: "A residual block learns a change to the existing signal instead of rebuilding the entire signal. A shortcut carries the original value around the block.",
    formula: "y = activation(F(x) + x)",
    symbols: [["x", "incoming signal on the shortcut"], ["F(x)", "change learned by the block"], ["y", "block output"]],
    givens: [["Input x", "2.0"], ["Learned change F(x)", "0.5"], ["Activation", "ReLU"]],
    steps: ["The main branch produces F(x) = 0.5.", "The shortcut supplies x = 2.0.", "Add them: 0.5 + 2.0 = 2.5; ReLU keeps 2.5."],
    result: "The residual block outputs y = 2.5.",
    meaning: "If the learned branch starts near zero, the block can initially pass x almost unchanged. This helps information and gradients travel through very deep networks."
  },
  "object-detection": {
    title: "Calculate Intersection over Union for Two Boxes",
    intuition: "A predicted box should cover the same area as the labelled box. Intersection over Union, or IoU, compares their shared area with the total area covered by either box.",
    formula: "IoU = intersection area / union area",
    symbols: [["intersection", "area inside both boxes"], ["union", "combined area inside either box, counted once"], ["IoU", "overlap score from 0 to 1"]],
    givens: [["Shared area", "30 pixels²"], ["Predicted box area", "40 pixels²"], ["True box area", "40 pixels²"]],
    steps: ["Union = 40 + 40 − 30 = 50 pixels².", "Divide the shared area by union: 30 ÷ 50.", "IoU = 0.60."],
    result: "The predicted and true boxes have 60% IoU.",
    meaning: "A chosen threshold such as 0.5 may count this as a location match, but evaluation should also check the predicted class, confidence, object size and multiple thresholds."
  },
  "vision-transformers": {
    title: "Calculate How Many Image Patches Become Tokens",
    intuition: "A Vision Transformer divides an image into equal squares. Each square becomes one patch token, similar to how pieces of a sentence become text tokens.",
    formula: "patch count = (H / P) × (W / P)",
    symbols: [["H, W", "image height and width"], ["P", "side length of one square patch"], ["patch count", "number of image tokens before any optional class token"]],
    givens: [["Image", "224 × 224"], ["Patch", "16 × 16"], ["Channels", "3"]],
    steps: ["Patches down the height: 224 ÷ 16 = 14.", "Patches across the width: 224 ÷ 16 = 14.", "Total patch tokens: 14 × 14 = 196."],
    result: "The image becomes 196 patch tokens, often plus one class token.",
    meaning: "Smaller patches create more tokens and preserve finer detail, but attention cost rises quickly because every token can compare with every other token."
  },
  "rnn-lstm": {
    title: "Calculate One Recurrent State Update",
    intuition: "At each sequence position, a recurrent model combines the new input with a summary carried from the previous position. The same rule is reused at every step.",
    formula: "hₜ = tanh(Wₓxₜ + Wₕhₜ₋₁ + b)",
    symbols: [["xₜ", "current input"], ["hₜ₋₁", "previous hidden state"], ["hₜ", "new hidden state"], ["Wₓ, Wₕ", "learned weights"]],
    givens: [["xₜ", "2"], ["hₜ₋₁", "0.4"], ["Wₓ", "0.5"], ["Wₕ", "0.25"], ["b", "0"]],
    steps: ["Current-input contribution: 0.5 × 2 = 1.0.", "Previous-state contribution: 0.25 × 0.4 = 0.1.", "Add and apply tanh: hₜ = tanh(1.1) ≈ 0.800."],
    result: "The state carried to the next position is approximately 0.800.",
    meaning: "An LSTM or GRU adds gates that decide what to remember, forget and expose, helping useful information survive longer sequences."
  },
  "attention-transformers-deep-learning": {
    title: "Calculate One Scaled Attention Score",
    intuition: "A query asks what information a token needs. A key describes what another token offers. Their dot product measures how well they match, and scaling prevents large vectors from producing extreme scores.",
    formula: "score(q, k) = (q · k) / √dₖ",
    symbols: [["q", "query vector"], ["k", "key vector"], ["dₖ", "number of values in each key"], ["·", "dot product"]],
    givens: [["Query q", "[1, 2]"], ["Key k", "[2, 1]"], ["Dimension dₖ", "2"]],
    steps: ["Dot product: (1 × 2) + (2 × 1) = 4.", "Scale by √2 ≈ 1.414.", "Attention score = 4 ÷ 1.414 ≈ 2.83."],
    result: "This query–key pair receives a score of about 2.83 before softmax.",
    meaning: "Softmax compares this score with other candidate keys and converts all scores into weights that add to 1. Those weights mix the corresponding value vectors."
  },
  "deep-learning-nlp": {
    title: "Measure Similarity Between Two Word Vectors",
    intuition: "An embedding represents a token as a vector. Cosine similarity compares vector directions, which often reveals related usage even when the vector lengths differ.",
    formula: "cosine(a, b) = (a · b) / (||a|| ||b||)",
    symbols: [["a · b", "dot product of two vectors"], ["||a||", "length of vector a"], ["cosine", "direction similarity from −1 to 1"]],
    givens: [["Vector a", "[1, 1]"], ["Vector b", "[1, 0]"]],
    steps: ["Dot product: (1 × 1) + (1 × 0) = 1.", "Lengths: ||a|| = √2 and ||b|| = 1.", "Similarity = 1 ÷ (√2 × 1) ≈ 0.707."],
    result: "The vectors have cosine similarity ≈ 0.707.",
    meaning: "A positive value shows partly aligned directions. Embedding similarity can help search and clustering, but context, tokenizer behaviour and task-specific evaluation still matter."
  },
  autoencoders: {
    title: "Calculate Reconstruction Loss",
    intuition: "An autoencoder learns by rebuilding its input. Reconstruction loss measures what information was lost while the encoder compressed the input and the decoder expanded it again.",
    formula: "reconstruction MSE = (1/n)Σ(xᵢ − x̂ᵢ)²",
    symbols: [["x", "original input"], ["x̂", "reconstructed input"], ["n", "number of values being compared"]],
    givens: [["Original x", "[1, 0, 1]"], ["Reconstruction x̂", "[0.8, 0.1, 0.6]"]],
    steps: ["Differences: [0.2, −0.1, 0.4].", "Squared differences: [0.04, 0.01, 0.16].", "Average: (0.04 + 0.01 + 0.16) ÷ 3 = 0.07."],
    result: "The reconstruction MSE is 0.07.",
    meaning: "Lower loss means closer reconstruction, but it does not automatically mean the latent code is useful. Check downstream tasks and visual reconstructions too."
  },
  "transfer-learning": {
    title: "Calculate How Much of a Pretrained Model You Are Updating",
    intuition: "Freezing a backbone keeps its existing knowledge fixed. Only the new head—or selected upper layers—receives gradient updates, reducing compute and the risk of overwriting useful features.",
    formula: "trainable fraction = trainable parameters / total parameters × 100%",
    symbols: [["trainable parameters", "weights the optimizer may change"], ["total parameters", "all weights in backbone and head"]],
    givens: [["Total parameters", "25 million"], ["Trainable parameters", "2 million"]],
    steps: ["Divide: 2 million ÷ 25 million = 0.08.", "Convert to a percentage: 0.08 × 100 = 8%.", "The remaining 92% is frozen."],
    result: "Only 8% of the model is updated during this training stage.",
    meaning: "A frozen-head baseline is cheap and safe. If it underfits because the source and target domains differ, unfreeze upper layers and use a smaller learning rate."
  },
  "graph-neural-networks": {
    title: "Calculate One Neighbour Aggregation",
    intuition: "A graph neuron updates itself using messages from connected neighbours. Aggregation must work even when different nodes have different numbers of neighbours.",
    formula: "neighbour mean = (1/|N(v)|) Σᵤ∈N(v) hᵤ",
    symbols: [["v", "node being updated"], ["N(v)", "set of neighbours of v"], ["hᵤ", "feature received from neighbour u"]],
    givens: [["Neighbour features", "[2, 4, 6]"], ["Neighbour count", "3"], ["Node’s own feature", "3"]],
    steps: ["Add neighbour messages: 2 + 4 + 6 = 12.", "Divide by neighbour count: 12 ÷ 3 = 4.", "An update function can now combine own feature 3 with neighbour summary 4."],
    result: "The aggregated neighbour message is 4.",
    meaning: "After one layer, a node uses immediate neighbours. After two layers it can receive information originating two hops away, which also raises leakage and over-smoothing concerns."
  },
  "pinn-kan-topological-networks": {
    title: "Combine Data Evidence and a Physics Constraint",
    intuition: "A physics-informed neural network is judged twice: it should match observed measurements and also respect a known differential equation at sampled points.",
    formula: "total loss = data loss + λ × physics residual loss",
    symbols: [["data loss", "error on measured observations"], ["physics residual", "amount by which the prediction violates the equation"], ["λ", "balance between the two objectives"]],
    givens: [["Data loss", "0.04"], ["Physics residual loss", "0.01"], ["λ", "2"]],
    steps: ["Scale the equation penalty: 2 × 0.01 = 0.02.", "Add the observation error: 0.04 + 0.02.", "Total loss = 0.06."],
    result: "The optimizer receives a combined loss of 0.06.",
    meaning: "Always report the two components separately. A small total can hide that one term dominates because λ or the units were poorly balanced."
  },
  "saving-deploying-deep-models": {
    title: "Connect Batch Size, Latency and Throughput",
    intuition: "Deployment is judged not only by accuracy. A service must return predictions fast enough and handle the required number of requests. Batching often improves throughput at the cost of waiting to fill a batch.",
    formula: "throughput = processed examples / elapsed seconds",
    symbols: [["throughput", "examples handled per second"], ["latency", "time one request waits for a result"], ["batch", "examples processed together"]],
    givens: [["Batch size", "32"], ["Batch processing time", "0.08 seconds"]],
    steps: ["The service completes 32 examples in 0.08 seconds.", "Divide count by time: 32 ÷ 0.08.", "Throughput = 400 examples per second."],
    result: "Ideal batch throughput is 400 examples/second.",
    meaning: "Real throughput may be lower because preprocessing, networking and queues add time. Measure end-to-end latency at realistic traffic, not model execution alone."
  },
};

export function DeepLearningMathExample({ topicId }: { topicId: string }) {
  const lesson = mathLessons[topicId];
  if (!lesson) return null;
  return <section>
    <h2 className="mb-3 text-2xl font-bold text-indigo-800">{lesson.title}</h2>
    <p className="text-lg leading-relaxed">{lesson.intuition}</p>
    <div className="not-prose my-5 rounded-2xl bg-indigo-950 p-5 text-white md:p-6"><p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-indigo-300">Formula</p><p className="m-0 overflow-x-auto whitespace-nowrap font-mono text-lg font-extrabold md:text-xl">{lesson.formula}</p></div>
    <div className="not-prose grid gap-5 lg:grid-cols-2">
      <div><h3 className="mb-3 text-lg font-extrabold text-slate-900">What every symbol means</h3><div className="space-y-2">{lesson.symbols.map(([symbol, meaning]) => <div key={symbol} className="grid grid-cols-[110px_1fr] gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm"><span className="font-mono font-extrabold text-indigo-800">{symbol}</span><span className="leading-relaxed text-slate-600">{meaning}</span></div>)}</div></div>
      <div><h3 className="mb-3 text-lg font-extrabold text-slate-900">Values in this example</h3><div className="grid gap-2 sm:grid-cols-2">{lesson.givens.map(([label, value]) => <div key={label} className="rounded-lg border border-indigo-200 bg-indigo-50 p-3"><p className="mb-1 text-xs font-bold text-indigo-700">{label}</p><p className="m-0 font-mono font-extrabold text-indigo-950">{value}</p></div>)}</div></div>
    </div>
    <div className="not-prose mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><h3 className="mb-4 text-lg font-extrabold text-slate-900">Work through the numbers</h3><div className="space-y-3">{lesson.steps.map((step, index) => <div key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white">{index + 1}</span><p className="m-0 pt-0.5 text-sm leading-relaxed text-slate-700">{step}</p></div>)}</div><div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4"><p className="mb-1 font-extrabold text-emerald-950">Result: {lesson.result}</p><p className="m-0 text-sm leading-relaxed text-slate-700"><strong>What it means:</strong> {lesson.meaning}</p></div></div>
  </section>;
}
