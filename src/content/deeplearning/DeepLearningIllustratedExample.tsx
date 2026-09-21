import React from "react";
import { ArrowRight, CheckCircle2, FlaskConical, Lightbulb, PlayCircle } from "lucide-react";

type Stage = { label: string; detail: string; value?: string };
type ChartSeries = { label: string; color: string; values: number[] };
type MatrixPanel = { label: string; values: Array<Array<number | string>> };

type IllustratedExample = {
  kind: "pipeline" | "curve" | "matrix" | "image" | "sequence" | "graph";
  title: string;
  question: string;
  givens: Array<[string, string]>;
  stages: Stage[];
  result: string;
  insight: string;
  tryIt: string;
  chart?: { xLabels: string[]; yMin: number; yMax: number; series: ChartSeries[] };
  matrices?: MatrixPanel[];
  tokens?: string[];
  focusToken?: number;
};

const examples: Record<string, IllustratedExample> = {
  "deep-learning-intro": {
    kind: "pipeline", title: "From raw pixels to a useful decision", question: "How can a model turn a 28 x 28 image into a digit prediction?",
    givens: [["Input", "784 pixel values"], ["Target", "one label from 0 to 9"], ["Feedback", "classification loss"]],
    stages: [{ label: "Represent", detail: "Scale pixels to 0-1", value: "784 numbers" }, { label: "Learn features", detail: "Hidden layers combine strokes", value: "128 -> 64 features" }, { label: "Score classes", detail: "Output one logit per digit", value: "10 logits" }, { label: "Update", detail: "Backpropagate the loss", value: "better weights" }],
    result: "The network assigns the largest score to digit 7 and the loss measures how far that prediction is from the label.",
    insight: "Deep learning is not one mysterious operation. It is a chain of representations whose parameters are corrected using measured error.",
    tryIt: "Sketch the same pipeline for an audio clip: what is the input, the target, and the intermediate representation?"
  },
  "math-foundations-deep-learning": {
    kind: "matrix", title: "One neuron as a complete calculation", question: "What does a neuron compute before an activation function?",
    givens: [["Input x", "[2, 3]"], ["Weights w", "[0.5, -1]"], ["Bias b", "2"]],
    stages: [{ label: "Multiply", detail: "2(0.5) and 3(-1)", value: "1 and -3" }, { label: "Add", detail: "1 + (-3) + 2", value: "0" }, { label: "Activate", detail: "ReLU(0)", value: "0" }],
    matrices: [{ label: "Input row", values: [[2, 3]] }, { label: "Weight column", values: [[0.5], [-1]] }, { label: "Output", values: [[0]] }],
    result: "The weighted sum is 0, so ReLU also outputs 0.", insight: "Matrix multiplication performs many neuron calculations at once; calculus later tells us how to change the weights.",
    tryIt: "Change the bias from 2 to 3. Predict the new pre-activation and ReLU output before calculating."
  },
  "neural-networks": {
    kind: "pipeline", title: "A two-layer network making one prediction", question: "Where does a prediction come from inside a small neural network?",
    givens: [["Features", "study=5, sleep=7"], ["Hidden units", "3 ReLU neurons"], ["Output", "pass probability"]],
    stages: [{ label: "Input", detail: "Two measured features", value: "[5, 7]" }, { label: "Hidden layer", detail: "Three weighted sums + ReLU", value: "[2.1, 0, 3.4]" }, { label: "Output layer", detail: "Weighted sum + sigmoid", value: "0.86" }],
    result: "The network predicts an 86% pass probability for this example.", insight: "A hidden unit is a learned numerical feature, not automatically a human-readable concept.",
    tryIt: "Set the second hidden activation to 1.0 and reason about whether the final probability must rise—it depends on that unit's output weight."
  },
  "mlp-universal-approximation": {
    kind: "curve", title: "Building a bend from ReLU pieces", question: "How can several simple neurons approximate a non-linear function?",
    givens: [["Inputs", "x from -2 to 2"], ["Hidden units", "shifted ReLUs"], ["Goal", "a tent-shaped curve"]],
    stages: [{ label: "Unit A", detail: "turns on near x=-1" }, { label: "Unit B", detail: "changes slope near x=0" }, { label: "Unit C", detail: "changes slope near x=1" }],
    chart: { xLabels: ["-2", "-1", "0", "1", "2"], yMin: 0, yMax: 2, series: [{ label: "target", color: "#7c3aed", values: [0, 0, 2, 0, 0] }, { label: "MLP approximation", color: "#06b6d4", values: [0, 0.15, 1.8, 0.15, 0] }] },
    result: "The weighted ReLU pieces create a close piecewise-linear approximation.", insight: "Approximation ability says a suitable network can represent a function; it does not guarantee training will find it or generalize.",
    tryIt: "Add two more breakpoints and describe how they could make the approximation smoother."
  },
  "tensors-frameworks-gpus": {
    kind: "matrix", title: "Following tensor shapes through a batch", question: "Why do shape annotations prevent many deep-learning bugs?",
    givens: [["Batch", "32 RGB images"], ["Image size", "64 x 64"], ["Channels", "3"]],
    stages: [{ label: "Load", detail: "batch, channel, height, width", value: "[32, 3, 64, 64]" }, { label: "Convolution", detail: "create 16 feature maps", value: "[32, 16, 62, 62]" }, { label: "Pool", detail: "halve spatial size", value: "[32, 16, 31, 31]" }],
    matrices: [{ label: "One RGB pixel", values: [[221, 86, 42]] }, { label: "Batch shape", values: [[32, 3, 64, 64]] }, { label: "Feature shape", values: [[32, 16, 31, 31]] }],
    result: "The batch dimension stays 32 while channels and spatial dimensions change.", insight: "A GPU accelerates large tensor operations, but the same shape rules apply on CPU and GPU.",
    tryIt: "Replace the 3 x 3 convolution with padding=1. What spatial output shape should you expect before pooling?"
  },
  "activation-functions": {
    kind: "curve", title: "The same inputs through ReLU and sigmoid", question: "How differently do common activations transform a signal?",
    givens: [["Inputs", "-2, -1, 0, 1, 2"], ["ReLU", "max(0, x)"], ["Sigmoid", "1 / (1 + exp(-x))"]],
    stages: [{ label: "Negative input", detail: "ReLU blocks it; sigmoid keeps a small value", value: "x=-2" }, { label: "Zero", detail: "ReLU=0; sigmoid=0.5", value: "x=0" }, { label: "Positive input", detail: "ReLU stays linear; sigmoid saturates", value: "x=2" }],
    chart: { xLabels: ["-2", "-1", "0", "1", "2"], yMin: 0, yMax: 2, series: [{ label: "ReLU", color: "#4f46e5", values: [0, 0, 0, 1, 2] }, { label: "sigmoid", color: "#f97316", values: [0.12, 0.27, 0.5, 0.73, 0.88] }] },
    result: "ReLU outputs [0,0,0,1,2]; sigmoid outputs approximately [0.12,0.27,0.50,0.73,0.88].",
    insight: "Choose an activation for its role: hidden-layer optimization is different from converting final logits into probabilities.", tryIt: "Calculate tanh for the same inputs and compare its range and symmetry with sigmoid."
  },
  "loss-functions-deep-learning": {
    kind: "curve", title: "Two confident predictions, opposite outcomes", question: "Why does cross-entropy heavily punish confident wrong answers?",
    givens: [["True class", "cat"], ["Prediction A", "P(cat)=0.9"], ["Prediction B", "P(cat)=0.1"]],
    stages: [{ label: "Loss A", detail: "-log(0.9)", value: "0.105" }, { label: "Loss B", detail: "-log(0.1)", value: "2.303" }, { label: "Compare", detail: "wrong confidence costs much more", value: "about 22x" }],
    chart: { xLabels: ["0.1", "0.3", "0.5", "0.7", "0.9"], yMin: 0, yMax: 2.4, series: [{ label: "-log P(true class)", color: "#e11d48", values: [2.303, 1.204, 0.693, 0.357, 0.105] }] },
    result: "Prediction B receives far more loss even though both examples use the same true label.", insight: "The training objective must match the target representation and output layer; accuracy alone supplies no gradient.", tryIt: "Compute -log(0.6) and place it on the curve."
  },
  "backpropagation": {
    kind: "pipeline", title: "Backpropagation through one weight", question: "How does one error become a weight update?",
    givens: [["Model", "prediction = w x"], ["w, x", "2, 3"], ["Target", "9"]],
    stages: [{ label: "Forward", detail: "2 x 3", value: "prediction=6" }, { label: "Loss", detail: "(6-9)^2", value: "9" }, { label: "Gradient", detail: "2(6-9) x 3", value: "-18" }, { label: "Update", detail: "w - 0.01(-18)", value: "w=2.18" }],
    result: "The negative gradient increases the weight, moving the next prediction toward 9.", insight: "Backpropagation computes gradients; the optimizer decides how those gradients change parameters.", tryIt: "Repeat one more update using w=2.18 and compare the new loss with 9."
  },
  "computational-graphs-autodiff": {
    kind: "graph", title: "A computational graph with local derivatives", question: "How does automatic differentiation reuse small derivative rules?",
    givens: [["Expression", "y = (w x + b)^2"], ["x, w, b", "2, 3, 1"], ["Forward value", "y=49"]],
    stages: [{ label: "Multiply", detail: "m=w x", value: "6" }, { label: "Add", detail: "z=m+b", value: "7" }, { label: "Square", detail: "y=z^2", value: "49" }, { label: "Reverse", detail: "dy/dw=2z x", value: "28" }],
    result: "Autodiff records the operations during the forward pass and applies the chain rule backward to obtain dw=28.", insight: "The graph stores dependencies, not intelligence; gradients are exact derivatives of the recorded operations.", tryIt: "Derive dy/db and dy/dx from the same graph."
  },
  "neural-network-training-loop": {
    kind: "curve", title: "Reading a healthy training loop", question: "What should change over five epochs if learning is working?",
    givens: [["Epochs", "1 to 5"], ["Training loss", "measured each epoch"], ["Validation loss", "unseen validation split"]],
    stages: [{ label: "Forward", detail: "predict one batch" }, { label: "Backward", detail: "compute gradients" }, { label: "Update", detail: "optimizer step" }, { label: "Validate", detail: "no parameter updates" }],
    chart: { xLabels: ["1", "2", "3", "4", "5"], yMin: 0, yMax: 1, series: [{ label: "train", color: "#4f46e5", values: [0.92, 0.65, 0.48, 0.36, 0.29] }, { label: "validation", color: "#10b981", values: [0.96, 0.72, 0.58, 0.52, 0.50] }] },
    result: "Both curves fall, while validation improves more slowly—a normal gap to monitor.", insight: "A loop is complete only when training mode, evaluation mode, gradient clearing, metrics, and held-out validation are handled correctly.", tryIt: "Sketch how the validation curve might look when overfitting begins after epoch 3."
  },
  "deep-learning-optimizers": {
    kind: "curve", title: "Three optimizers crossing a narrow valley", question: "Why can the same gradients create different paths?",
    givens: [["Start", "same initial parameters"], ["Landscape", "steep vertically, shallow horizontally"], ["Goal", "reach low loss"]],
    stages: [{ label: "SGD", detail: "uses the current gradient", value: "can zig-zag" }, { label: "Momentum", detail: "builds velocity", value: "damps oscillation" }, { label: "Adam", detail: "rescales per parameter", value: "adaptive steps" }],
    chart: { xLabels: ["0", "1", "2", "3", "4", "5"], yMin: 0, yMax: 1, series: [{ label: "SGD loss", color: "#64748b", values: [1, 0.82, 0.69, 0.58, 0.50, 0.44] }, { label: "momentum", color: "#4f46e5", values: [1, 0.70, 0.43, 0.27, 0.18, 0.13] }, { label: "Adam", color: "#f97316", values: [1, 0.61, 0.36, 0.23, 0.16, 0.12] }] },
    result: "The illustrative loss traces reach different values even though all start at 1.0.", insight: "Optimizer behavior depends on learning rate, batch noise, architecture, and data; no optimizer wins every problem.", tryIt: "Explain why a lower training loss does not automatically imply better validation performance."
  },
  "advanced-neural-optimization": {
    kind: "pipeline", title: "Stabilizing a large effective batch", question: "How do mixed precision, accumulation, clipping, and AdamW fit together?",
    givens: [["GPU capacity", "8 samples"], ["Desired batch", "32 samples"], ["Risk", "large or unstable gradients"]],
    stages: [{ label: "Accumulate", detail: "4 micro-batches x 8", value: "effective batch 32" }, { label: "Unscale", detail: "recover true gradients", value: "mixed precision" }, { label: "Clip", detail: "limit global norm", value: "max norm 1.0" }, { label: "AdamW", detail: "update + decoupled decay", value: "one optimizer step" }],
    result: "The model updates once after four micro-batches while keeping memory use bounded.", insight: "The order matters: accumulated scaled gradients should be unscaled before norm clipping and the optimizer step.", tryIt: "If capacity rises to 16 samples, how many accumulation steps give an effective batch of 32?"
  },
  "learning-rate-scheduling": {
    kind: "curve", title: "Warm up, learn, then refine", question: "Why change the learning rate during training?",
    givens: [["Epochs", "0 to 10"], ["Peak LR", "0.001"], ["Schedule", "2-epoch warmup + cosine decay"]],
    stages: [{ label: "Warmup", detail: "avoid abrupt early updates", value: "0 -> 0.001" }, { label: "Main training", detail: "take useful steps", value: "high LR" }, { label: "Refinement", detail: "reduce oscillation", value: "near 0" }],
    chart: { xLabels: ["0", "2", "4", "6", "8", "10"], yMin: 0, yMax: 0.001, series: [{ label: "learning rate", color: "#7c3aed", values: [0, 0.001, 0.00085, 0.0005, 0.00015, 0] }] },
    result: "The rate rises safely, remains useful, and then shrinks for fine adjustments.", insight: "Schedulers change step size; callbacks observe training and may stop, save, or modify it based on monitored values.", tryIt: "Describe what ReduceLROnPlateau would monitor instead of following a fixed curve."
  },
  "weight-initialization": {
    kind: "curve", title: "Signal variance through five layers", question: "What happens when initial weights are too small or appropriately scaled?",
    givens: [["Input variance", "1.0"], ["Depth", "5 layers"], ["Comparison", "tiny weights vs He initialization"]],
    stages: [{ label: "Tiny weights", detail: "multiply signal down", value: "activations vanish" }, { label: "He scaling", detail: "accounts for fan-in with ReLU", value: "variance stays usable" }],
    chart: { xLabels: ["input", "L1", "L2", "L3", "L4", "L5"], yMin: 0, yMax: 1.2, series: [{ label: "tiny init", color: "#e11d48", values: [1, 0.35, 0.12, 0.04, 0.01, 0] }, { label: "He init", color: "#10b981", values: [1, 0.96, 1.04, 0.98, 1.02, 0.95] }] },
    result: "The illustrative tiny initialization loses nearly all signal, while the scaled initialization preserves it.", insight: "Initialization should match the activation and fan-in/fan-out; it sets the starting conditions, not the final learned solution.", tryIt: "Which family—Xavier or He—is the usual starting point for tanh and ReLU respectively?"
  },
  "batch-normalization": {
    kind: "curve", title: "Normalizing one mini-batch", question: "What changes when a batch is standardized and then rescaled?",
    givens: [["Activations", "[2, 4, 6, 8]"], ["Mean", "5"], ["Std. dev.", "about 2.24"]],
    stages: [{ label: "Center", detail: "subtract mean 5", value: "[-3,-1,1,3]" }, { label: "Scale", detail: "divide by 2.24", value: "[-1.34,-0.45,0.45,1.34]" }, { label: "Learn", detail: "apply gamma and beta", value: "trainable scale/shift" }],
    chart: { xLabels: ["A", "B", "C", "D"], yMin: -2, yMax: 8, series: [{ label: "before", color: "#f97316", values: [2, 4, 6, 8] }, { label: "normalized", color: "#4f46e5", values: [-1.34, -0.45, 0.45, 1.34] }] },
    result: "The normalized values have mean near 0 and variance near 1 before learned scale and shift.", insight: "Training uses mini-batch statistics; inference normally uses accumulated running statistics, so model mode matters.", tryIt: "Calculate the centered values for [10, 10, 14, 14]."
  },
  "normalization-methods": {
    kind: "matrix", title: "Choosing the axes to normalize", question: "Why are BatchNorm, LayerNorm, InstanceNorm, and GroupNorm different?",
    givens: [["Tensor", "N x C x H x W"], ["Question", "which values share statistics?"], ["Constraint", "batch may be small"]],
    stages: [{ label: "BatchNorm", detail: "per channel across N,H,W", value: "batch-dependent" }, { label: "LayerNorm", detail: "within one example's feature dimensions", value: "batch-independent" }, { label: "GroupNorm", detail: "within channel groups and H,W", value: "small-batch friendly" }],
    matrices: [{ label: "Batch x channels", values: [["B1:C1", "B1:C2", "B1:C3", "B1:C4"], ["B2:C1", "B2:C2", "B2:C3", "B2:C4"]] }, { label: "Group split", values: [["G1", "G1", "G2", "G2"]] }],
    result: "The formulas look similar, but the selected reduction axes change the statistics and behavior.", insight: "Normalization choice should follow tensor layout, batch size, and architecture—not fashion.", tryIt: "For a Transformer token embedding [batch, tokens, features], which method is typically natural and why?"
  },
  "deep-learning-regularization": {
    kind: "curve", title: "Detecting and reducing overfitting", question: "What do training and validation curves reveal before and after regularization?",
    givens: [["Training", "8 epochs"], ["Baseline", "no dropout"], ["Change", "dropout + weight decay"]],
    stages: [{ label: "Baseline", detail: "training keeps improving", value: "validation turns upward" }, { label: "Regularized", detail: "training is harder", value: "validation remains steadier" }],
    chart: { xLabels: ["1", "2", "3", "4", "5", "6"], yMin: 0, yMax: 1, series: [{ label: "train loss", color: "#4f46e5", values: [0.8, 0.56, 0.38, 0.25, 0.16, 0.10] }, { label: "val no reg", color: "#e11d48", values: [0.85, 0.62, 0.48, 0.50, 0.59, 0.70] }, { label: "val regularized", color: "#10b981", values: [0.88, 0.66, 0.53, 0.47, 0.45, 0.46] }] },
    result: "Regularization may increase training loss while improving validation behavior.", insight: "The goal is not the smallest training loss; it is reliable performance on representative unseen data.", tryIt: "Mark the epoch where early stopping would save the unregularized model."
  },
  "label-smoothing-distillation-ensembles": {
    kind: "pipeline", title: "Three ways to soften an overconfident model", question: "How do label smoothing, distillation, and ensembles change supervision or prediction?",
    givens: [["Classes", "cat, dog, fox"], ["Hard label", "[1,0,0]"], ["Teacher output", "[0.80,0.15,0.05]"]],
    stages: [{ label: "Label smoothing", detail: "replace hard target", value: "[0.9,0.05,0.05]" }, { label: "Distillation", detail: "student matches soft teacher", value: "class relationships" }, { label: "Ensemble", detail: "average independent models", value: "reduced variance" }],
    result: "Each method can reduce brittle confidence, but it acts at a different part of training or inference.", insight: "These methods are related by softening decisions, yet they are not interchangeable and have different compute costs.", tryIt: "Average predictions [0.9,0.1] and [0.6,0.4]. What is the ensemble output?"
  },
  "vanishing-exploding-gradients": {
    kind: "curve", title: "A gradient travelling through six layers", question: "Why do repeated multiplications make early layers learn too slowly or unstably?",
    givens: [["Local derivative A", "0.5 per layer"], ["Local derivative B", "1.8 per layer"], ["Depth", "6 multiplications"]],
    stages: [{ label: "Vanishing", detail: "0.5^6", value: "0.0156" }, { label: "Exploding", detail: "1.8^6", value: "34.0" }, { label: "Stabilize", detail: "initialization, norm, residuals, clipping" }],
    chart: { xLabels: ["output", "L5", "L4", "L3", "L2", "L1"], yMin: 0, yMax: 35, series: [{ label: "0.5 multiplier", color: "#4f46e5", values: [1, 0.5, 0.25, 0.125, 0.063, 0.031] }, { label: "1.8 multiplier", color: "#e11d48", values: [1, 1.8, 3.24, 5.83, 10.50, 18.90] }] },
    result: "The same chain rule produces a tiny or large signal depending on repeated local derivatives.", insight: "Gradient problems are diagnosed with norms and learning curves, then addressed with architecture and optimization choices.", tryIt: "Compute 0.8^10 and compare it with 0.5^10."
  },
  "deep-learning-generalization": {
    kind: "curve", title: "Capacity, interpolation, and test error", question: "Why can test error fall, rise, and sometimes fall again as capacity grows?",
    givens: [["X-axis", "model capacity"], ["Training error", "approaches zero"], ["Test error", "depends on data and training"]],
    stages: [{ label: "Underfit", detail: "too little capacity", value: "both errors high" }, { label: "Interpolation", detail: "training error reaches zero", value: "test may peak" }, { label: "Overparameterized", detail: "optimization bias matters", value: "test may fall again" }],
    chart: { xLabels: ["small", "", "fit", "", "large", "very large"], yMin: 0, yMax: 1, series: [{ label: "training error", color: "#4f46e5", values: [0.85, 0.55, 0.18, 0.02, 0, 0] }, { label: "test error", color: "#f97316", values: [0.9, 0.55, 0.36, 0.62, 0.34, 0.24] }] },
    result: "This illustrative double-descent shape is a diagnostic idea, not a guarantee for every dataset.", insight: "Generalization depends on data, optimization, regularization, augmentation, and distribution—not parameter count alone.", tryIt: "List two reasons a very large model could still generalize poorly."
  },
  "data-augmentation-deep-learning": {
    kind: "image", title: "Useful versus label-breaking augmentation", question: "Which image changes preserve the meaning of a handwritten digit?",
    givens: [["Original", "digit 6"], ["Safe candidate", "small rotation"], ["Unsafe candidate", "vertical flip"]],
    stages: [{ label: "Rotate +8°", detail: "still looks like 6", value: "keep label" }, { label: "Shift 2 px", detail: "still looks like 6", value: "keep label" }, { label: "Flip vertically", detail: "may resemble 9", value: "label risk" }],
    result: "Augmentation is correct only when the transformation preserves the target for the actual domain.", insight: "Synthetic diversity helps only when it represents plausible production variation.", tryIt: "For chest X-rays, decide whether horizontal flipping is valid and what domain knowledge you would check."
  },
  "curriculum-meta-few-shot": {
    kind: "pipeline", title: "Learning a new class from three examples", question: "How does an episode turn a few labeled examples into a prediction?",
    givens: [["Support set", "3 examples per class"], ["Query", "one unseen example"], ["Representation", "shared encoder"]],
    stages: [{ label: "Encode support", detail: "map examples to vectors", value: "class clusters" }, { label: "Build prototype", detail: "average each class", value: "one vector/class" }, { label: "Encode query", detail: "same encoder", value: "query vector" }, { label: "Compare", detail: "nearest prototype", value: "predicted class" }],
    result: "The query is classified using relationships learned across many earlier episodes.", insight: "Few-shot learning is not learning from nothing; it relies on transferable representations or meta-learned adaptation.", tryIt: "Draw two 2D prototypes and place a query point. Which class is nearest?"
  },
  "cnn": {
    kind: "matrix", title: "Sliding an edge detector over pixels", question: "What does one convolution position calculate?",
    givens: [["Image patch", "3 x 3 pixels"], ["Kernel", "vertical-edge filter"], ["Operation", "multiply and sum"]],
    stages: [{ label: "Align", detail: "place kernel over patch" }, { label: "Multiply", detail: "cell by cell" }, { label: "Sum", detail: "combine nine products", value: "feature value=8" }],
    matrices: [{ label: "Image patch", values: [[1, 1, 5], [1, 1, 5], [1, 1, 5]] }, { label: "Kernel", values: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]] }, { label: "Response", values: [[12]] }],
    result: "A strong positive response indicates a dark-to-bright vertical transition in this patch.", insight: "During training, the network learns useful kernels instead of receiving hand-designed edge filters.", tryIt: "Reverse the bright and dark sides. What sign should the response have?"
  },
  "cnn-architectures-resnet": {
    kind: "pipeline", title: "Why a residual block can preserve information", question: "How does a skip connection change a two-layer block?",
    givens: [["Input", "x"], ["Learned branch", "F(x)"], ["Block output", "F(x)+x"]],
    stages: [{ label: "Main path", detail: "conv -> ReLU -> conv", value: "F(x)" }, { label: "Skip path", detail: "carry x directly", value: "identity" }, { label: "Add", detail: "combine both paths", value: "F(x)+x" }, { label: "Activate", detail: "continue to next block" }],
    result: "If the learned branch is near zero, the block can pass x forward instead of destroying it.", insight: "AlexNet, VGG, Inception, and ResNet reflect different design ideas; depth alone does not explain their behavior.", tryIt: "What shape condition must hold before x and F(x) can be added directly?"
  },
  "computer-vision": {
    kind: "image", title: "An image-classification pipeline with visible checks", question: "What happens between a phone photo and a class probability?",
    givens: [["Photo", "RGB 240 x 320"], ["Model input", "224 x 224"], ["Classes", "cat, dog, other"]],
    stages: [{ label: "Resize/crop", detail: "match training preprocessing", value: "224 x 224 x 3" }, { label: "Normalize", detail: "use training statistics" }, { label: "Extract", detail: "CNN or ViT features" }, { label: "Classify", detail: "softmax probabilities", value: "[0.82,0.12,0.06]" }],
    result: "The model predicts cat at 0.82, but reliability still depends on calibration and test coverage.", insight: "Preprocessing is part of the model contract; a mismatch can break an otherwise accurate classifier.", tryIt: "Name three real-world image changes your validation set should include."
  },
  "object-detection": {
    kind: "image", title: "Classification, detection, and segmentation on one scene", question: "How do the targets differ for the same street image?",
    givens: [["Scene", "car beside a person"], ["Detection", "class + box"], ["Segmentation", "class per pixel"]],
    stages: [{ label: "Classify", detail: "what is present?", value: "car, person" }, { label: "Detect", detail: "where are instances?", value: "two boxes" }, { label: "Segment", detail: "which pixels belong to each?", value: "two masks" }],
    result: "Detection localizes objects coarsely; segmentation produces detailed spatial boundaries.", insight: "Evaluation must match the task: image accuracy, IoU/mAP for boxes, and pixel or region metrics for masks.", tryIt: "Explain why a high classification score cannot prove that a detector found the correct location."
  },
  "unet-deeplab-gradcam": {
    kind: "pipeline", title: "Dense prediction and explanation are different jobs", question: "How do U-Net, DeepLab, and Grad-CAM answer different questions?",
    givens: [["Image", "256 x 256"], ["Segmentation target", "mask"], ["Classifier target", "image label"]],
    stages: [{ label: "U-Net", detail: "encoder + skip-connected decoder", value: "pixel mask" }, { label: "DeepLab", detail: "dilated context + decoder", value: "pixel mask" }, { label: "Grad-CAM", detail: "weight feature maps by class gradient", value: "coarse heatmap" }],
    result: "A Grad-CAM heatmap can show influential regions but is not a segmentation ground truth.", insight: "Architecture output and explanation output must not be confused; they have different resolutions and guarantees.", tryIt: "Describe a case where a heatmap highlights the right object but for the wrong reason."
  },
  "vision-transformers": {
    kind: "sequence", title: "Turning an image into a token sequence", question: "How does a Vision Transformer read a 32 x 32 image with 8 x 8 patches?",
    givens: [["Image", "32 x 32 RGB"], ["Patch", "8 x 8"], ["Patch count", "(32/8)^2 = 16"]],
    stages: [{ label: "Patchify", detail: "split into 16 regions" }, { label: "Embed", detail: "flatten and project each patch" }, { label: "Add position", detail: "retain spatial order" }, { label: "Attend", detail: "mix information across patches" }],
    tokens: ["[CLS]", "P1", "P2", "P3", "P4", "...", "P16"], focusToken: 0,
    result: "The model processes 17 tokens when a class token is added to 16 patch tokens.", insight: "Patch size trades sequence length against spatial detail; smaller patches cost more attention computation.", tryIt: "How many patches result from a 224 x 224 image with 16 x 16 patches?"
  },
  "state-space-bptt": {
    kind: "sequence", title: "Unrolling recurrence through time", question: "How does an error at time 4 influence parameters used at time 1?",
    givens: [["Inputs", "x1, x2, x3, x4"], ["Shared transition", "same W at every step"], ["Loss", "computed at t4"]],
    stages: [{ label: "Forward", detail: "h1 -> h2 -> h3 -> h4" }, { label: "Loss", detail: "compare output at t4" }, { label: "Backward", detail: "chain gradients t4 -> t1" }, { label: "Accumulate", detail: "sum contributions for shared W" }],
    tokens: ["x1", "x2", "x3", "x4", "loss"], focusToken: 4,
    result: "BPTT applies backpropagation to the unrolled graph and aggregates gradients for reused parameters.", insight: "Truncated BPTT limits how far gradients travel, reducing cost but also limiting learned dependencies.", tryIt: "If truncation length is 2 at t4, which earlier hidden states receive direct gradient through the unrolled window?"
  },
  "rnn-lstm": {
    kind: "sequence", title: "Remembering the subject across a sentence", question: "How can an LSTM preserve context until the final word?",
    givens: [["Sequence", "The movie, despite flaws, was ..."], ["Task", "sentiment"], ["Memory", "cell state"]],
    stages: [{ label: "Forget gate", detail: "remove irrelevant detail" }, { label: "Input gate", detail: "store useful evidence" }, { label: "Cell update", detail: "carry context forward" }, { label: "Output gate", detail: "expose current evidence" }],
    tokens: ["The", "movie", "despite", "flaws", "was", "wonderful"], focusToken: 5,
    result: "The final state can combine earlier context with the word 'wonderful' for a positive prediction.", insight: "Gates control information flow; they do not guarantee perfect long-range memory or factual understanding.", tryIt: "Replace 'wonderful' with 'forgettable' and describe which evidence should change."
  },
  "gru-bidirectional-seq2seq": {
    kind: "sequence", title: "Three sequence ideas on one sentence", question: "When do GRU, bidirectionality, and encoder-decoder structure help?",
    givens: [["Input", "bank can mean finance or river bank"], ["Tagging", "full sentence available"], ["Generation", "output length may differ"]],
    stages: [{ label: "GRU", detail: "update/reset gates maintain state" }, { label: "Bidirectional", detail: "combine left and right context" }, { label: "Encoder", detail: "represent input sequence" }, { label: "Decoder", detail: "generate target sequence" }],
    tokens: ["sat", "by", "the", "river", "bank"], focusToken: 4,
    result: "Right and left context disambiguate 'bank'; an encoder-decoder is used when producing a new sequence such as a translation.", insight: "Bidirectional models require future context and therefore are unsuitable for strictly causal streaming at each time step.", tryIt: "Name one task where future tokens are available and one where they are not."
  },
  "attention-transformers-deep-learning": {
    kind: "sequence", title: "Attention resolving a pronoun", question: "Which earlier token should 'it' attend to in a simple sentence?",
    givens: [["Sentence", "The robot lifted the box because it was light"], ["Query", "representation for 'it'"], ["Candidates", "robot, box, light"]],
    stages: [{ label: "Query", detail: "what information does 'it' need?" }, { label: "Keys", detail: "what does each token offer?" }, { label: "Scores", detail: "query-key similarities" }, { label: "Values", detail: "weighted information mixture" }],
    tokens: ["robot", "lifted", "box", "because", "it", "light"], focusToken: 4,
    result: "A trained head may assign a large weight from 'it' to 'box', mixing box-related information into the new representation.", insight: "Attention weights are learned context mixing, not guaranteed human explanations; multi-head attention learns several relations in parallel.", tryIt: "Change 'light' to 'strong'. Which antecedent becomes more plausible and why?"
  },
  "deep-learning-nlp": {
    kind: "sequence", title: "From words to a sentiment decision", question: "How does text become numeric input for a neural model?",
    givens: [["Text", "not at all boring"], ["Tokens", "subword or word IDs"], ["Task", "positive/negative"]],
    stages: [{ label: "Tokenize", detail: "split using model vocabulary", value: "[not, at, all, boring]" }, { label: "Embed", detail: "IDs -> dense vectors" }, { label: "Contextualize", detail: "RNN/CNN/Transformer combines context" }, { label: "Classify", detail: "map pooled representation", value: "positive" }],
    tokens: ["not", "at", "all", "boring"], focusToken: 0,
    result: "Context prevents the model from treating 'boring' in isolation.", insight: "Tokenization, sequence length, unknown inputs, imbalance, and domain shift are part of the NLP system—not preprocessing trivia.", tryIt: "Compare 'not boring' with 'not only boring but confusing'. Why must context change the result?"
  },
  "transfer-learning": {
    kind: "pipeline", title: "Adapting an image model with 600 labeled examples", question: "Which parameters should learn first when data is scarce?",
    givens: [["Base model", "pretrained on broad images"], ["New task", "3 flower species"], ["Data", "200 images/class"]],
    stages: [{ label: "Replace head", detail: "new 3-class output", value: "randomly initialized" }, { label: "Freeze backbone", detail: "reuse general features", value: "train head" }, { label: "Validate", detail: "check baseline and imbalance" }, { label: "Fine-tune", detail: "unfreeze upper blocks", value: "small LR" }],
    result: "The new head learns first; selective fine-tuning then adapts high-level features without immediately overwriting the backbone.", insight: "Transfer works best when source features and target data are related; leakage and preprocessing mismatch still invalidate results.", tryIt: "What would make a medical-image target less compatible with a natural-image source model?"
  },
  "autoencoders": {
    kind: "pipeline", title: "Compressing a six-number transaction", question: "What information survives a two-number bottleneck?",
    givens: [["Input", "6 normalized features"], ["Latent code", "2 numbers"], ["Objective", "reconstruct the input"]],
    stages: [{ label: "Encode", detail: "6 -> 4 -> 2", value: "z=[0.7,-0.2]" }, { label: "Bottleneck", detail: "retain useful structure", value: "2 values" }, { label: "Decode", detail: "2 -> 4 -> 6", value: "reconstruction" }, { label: "Compare", detail: "mean squared error", value: "0.012" }],
    result: "A familiar transaction reconstructs with low error; an unusual pattern may produce a larger error.", insight: "A low-dimensional code is useful only if the training objective and data make it retain the structure needed for the downstream task.", tryIt: "Why can an overpowered decoder reduce the usefulness of reconstruction error for anomaly detection?"
  },
  "autoencoder-variants": {
    kind: "image", title: "Three constraints, three different representations", question: "How do sparse, denoising, and contractive autoencoders change the learning problem?",
    givens: [["Clean input", "digit image"], ["Corrupted copy", "added pixel noise"], ["Goal", "robust latent features"]],
    stages: [{ label: "Sparse", detail: "penalize many active latent units", value: "few active features" }, { label: "Denoising", detail: "noisy input -> clean target", value: "noise resistance" }, { label: "Contractive", detail: "penalize input sensitivity", value: "locally stable code" }],
    result: "Each variant discourages a trivial identity mapping in a different way.", insight: "The right constraint follows the desired representation: sparsity, corruption robustness, or local invariance.", tryIt: "For removing sensor noise, which variant directly matches the training objective and why?"
  },
  "self-supervised-contrastive-learning": {
    kind: "pipeline", title: "Learning without class labels from two views", question: "How does contrastive learning know that two images belong together?",
    givens: [["Source", "one unlabeled dog image"], ["View A", "crop + color jitter"], ["View B", "flip + crop"]],
    stages: [{ label: "Augment twice", detail: "create a positive pair" }, { label: "Encode", detail: "shared network for both views" }, { label: "Project", detail: "map to contrastive space" }, { label: "Contrast", detail: "pull pair together, push other images apart" }],
    result: "The encoder learns features stable across chosen augmentations without receiving the label 'dog'.", insight: "Augmentation defines what the representation should ignore, so an invalid augmentation teaches the wrong invariance.", tryIt: "Choose one safe and one unsafe positive-pair transformation for satellite imagery."
  },
  "graph-neural-networks": {
    kind: "graph", title: "One message-passing update", question: "How does node A learn from its neighbors B and C?",
    givens: [["Node A", "feature [1,0]"], ["Neighbors", "B=[0,1], C=[1,1]"], ["Aggregator", "mean"]],
    stages: [{ label: "Collect", detail: "read B and C" }, { label: "Aggregate", detail: "mean([0,1],[1,1])", value: "[0.5,1]" }, { label: "Combine", detail: "merge with A", value: "[1,0,0.5,1]" }, { label: "Update", detail: "linear layer + activation", value: "new A" }],
    result: "A's next representation contains both its own features and a summary of its neighborhood.", insight: "Message passing assumes graph edges encode useful relationships; bad or missing edges change what information can flow.", tryIt: "Add neighbor D=[3,0]. Recompute the mean neighbor feature."
  },
  "pinn-kan-topological-networks": {
    kind: "graph", title: "Three advanced ideas solve different structural problems", question: "What prior structure does each model place into learning?",
    givens: [["PINN", "known differential equation"], ["KAN", "learned univariate edge functions"], ["Topological model", "incidence/geometry structure"]],
    stages: [{ label: "PINN", detail: "data loss + physics residual", value: "respect equation" }, { label: "KAN", detail: "learn functions on connections", value: "alternative parameterization" }, { label: "Topological", detail: "messages over structured cells", value: "preserve topology" }],
    result: "These approaches are not interchangeable upgrades to an MLP; each encodes a different assumption.", insight: "Use an advanced architecture only when its structural prior matches the problem and you can evaluate it against a simpler baseline.", tryIt: "For heat diffusion with sparse measurements and a known PDE, which prior is directly relevant?"
  },
  "debugging-neural-networks": {
    kind: "pipeline", title: "Diagnosing a model stuck at random accuracy", question: "What should be checked before changing the architecture?",
    givens: [["Task", "10-class classification"], ["Observed accuracy", "about 10%"], ["Loss", "does not decrease"]],
    stages: [{ label: "Inspect one batch", detail: "shapes, labels, ranges" }, { label: "Overfit 20 samples", detail: "prove model can learn" }, { label: "Check gradients", detail: "None, zero, NaN, huge" }, { label: "Check modes", detail: "train/eval, loss/output match" }, { label: "Add complexity", detail: "only after basics pass" }],
    result: "If the model cannot overfit a tiny clean subset, the first suspect is implementation or optimization—not generalization.", insight: "Debugging is controlled isolation: establish invariants, shrink the problem, and change one variable at a time.", tryIt: "List three assertions you would add for input shape, label range, and finite loss."
  },
  "saving-deploying-deep-models": {
    kind: "pipeline", title: "Preserving the whole prediction contract", question: "What must travel with model weights for reproducible inference?",
    givens: [["Checkpoint", "trained weights"], ["Input", "raw uploaded image"], ["Service", "versioned prediction API"]],
    stages: [{ label: "Save", detail: "weights + architecture/config", value: "versioned artifact" }, { label: "Package", detail: "preprocessing + labels", value: "same contract" }, { label: "Load", detail: "map device and eval mode" }, { label: "Validate", detail: "golden input/output test" }, { label: "Monitor", detail: "latency, drift, failures" }],
    result: "A deployment is reproducible only when code, preprocessing, label mapping, and model version agree.", insight: "Saving weights is not deployment; production requires validation, rollback, observability, security, and a stable interface.", tryIt: "Write a golden test containing one fixed input shape and the expected top class."
  }
};

function Chart({ config }: { config: NonNullable<IllustratedExample["chart"]> }) {
  const width = 560, height = 220, left = 44, top = 18, right = 18, bottom = 38;
  const plotWidth = width - left - right, plotHeight = height - top - bottom;
  const xAt = (index: number) => left + (index * plotWidth) / Math.max(1, config.xLabels.length - 1);
  const yAt = (value: number) => top + ((config.yMax - value) / Math.max(0.000001, config.yMax - config.yMin)) * plotHeight;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[520px]" role="img" aria-label="Labelled chart comparing the values in the worked example">
        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => <g key={fraction}><line x1={left} y1={top + fraction * plotHeight} x2={width - right} y2={top + fraction * plotHeight} stroke="#e2e8f0" /><text x={left - 7} y={top + fraction * plotHeight + 4} textAnchor="end" fontSize="10" fill="#64748b">{(config.yMax - fraction * (config.yMax - config.yMin)).toFixed(1)}</text></g>)}
        <line x1={left} y1={top} x2={left} y2={height - bottom} stroke="#64748b" strokeWidth="1.5" />
        <line x1={left} y1={height - bottom} x2={width - right} y2={height - bottom} stroke="#64748b" strokeWidth="1.5" />
        {config.xLabels.map((label, index) => <text key={`${label}-${index}`} x={xAt(index)} y={height - 15} textAnchor="middle" fontSize="11" fill="#64748b">{label}</text>)}
        <text x={width / 2} y={height - 1} textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569">EXAMPLE INPUT OR TRAINING STEP</text>
        <text x="11" y={height / 2} textAnchor="middle" fontSize="10" fontWeight="700" fill="#475569" transform={`rotate(-90 11 ${height / 2})`}>OUTPUT / MEASURED VALUE</text>
        {config.series.map((series) => {
          const points = series.values.map((value, index) => `${xAt(index)},${yAt(value)}`).join(" ");
          return <g key={series.label}><polyline points={points} fill="none" stroke={series.color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />{series.values.map((value, index) => <circle key={index} cx={xAt(index)} cy={yAt(value)} r="3.5" fill={series.color} />)}</g>;
        })}
        {config.series.map((series, index) => <g key={`legend-${series.label}`} transform={`translate(${left + index * 145},4)`}><line x1="0" y1="0" x2="20" y2="0" stroke={series.color} strokeWidth="3" /><text x="26" y="4" fontSize="11" fill="#334155">{series.label}</text></g>)}
      </svg>
    </div>
  );
}

function Matrix({ panels }: { panels: MatrixPanel[] }) {
  return <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-3">{panels.map((panel, panelIndex) => <React.Fragment key={panel.label}><div><p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{panel.label}</p><div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${panel.values[0]?.length ?? 1}, minmax(38px, auto))` }}>{panel.values.flat().map((value, index) => <span key={index} className="min-w-10 h-10 px-2 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono text-xs flex items-center justify-center">{value}</span>)}</div></div>{panelIndex < panels.length - 1 && <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />}</React.Fragment>)}</div>;
}

function Sequence({ tokens, focusToken = 0 }: { tokens: string[]; focusToken?: number }) {
  return <div className="py-6 overflow-x-auto"><div className="min-w-[520px] flex items-center justify-center gap-3 relative">{tokens.map((token, index) => <React.Fragment key={`${token}-${index}`}><div className={`relative px-4 py-3 rounded-xl border font-mono text-sm ${index === focusToken ? "bg-violet-600 border-violet-700 text-white shadow-lg" : "bg-white border-slate-200 text-slate-700"}`}><span>{token}</span>{index !== focusToken && <span className="absolute -top-4 left-1/2 w-px h-4 bg-violet-300" />}</div>{index < tokens.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />}</React.Fragment>)}</div><p className="text-center text-xs text-slate-500 mt-5">Highlighted token is the focus of the illustrated calculation; arrows show ordered information flow.</p></div>;
}

function Graph() {
  const nodes = [{ x: 280, y: 90, label: "TARGET" }, { x: 105, y: 45, label: "N1" }, { x: 105, y: 145, label: "N2" }, { x: 445, y: 35, label: "N3" }, { x: 450, y: 145, label: "N4" }];
  const edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[3,4]];
  return <div><svg viewBox="0 0 560 215" className="w-full max-w-2xl mx-auto" role="img" aria-label="Labelled graph showing a target node receiving information from neighboring nodes">{edges.map(([a,b],i)=><line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#c4b5fd" strokeWidth="3" />)}{nodes.map((node,index)=><g key={node.label}><circle cx={node.x} cy={node.y} r={index===0?34:25} fill={index===0?"#7c3aed":"#eef2ff"} stroke={index===0?"#6d28d9":"#818cf8"} strokeWidth="2"/><text x={node.x} y={node.y+4} textAnchor="middle" fontSize={index===0?10:13} fontWeight="700" fill={index===0?"white":"#3730a3"}>{node.label}</text></g>)}<text x="280" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#475569">LINES = RELATIONSHIPS · N1–N4 = NEIGHBORS · TARGET = NODE BEING UPDATED</text></svg></div>;
}

function ImageVisual({ stages }: { stages: Stage[] }) {
  const pixels = [0,0,1,1,1,0,0, 0,1,0,0,0,1,0, 0,1,0,0,0,0,0, 0,1,1,1,1,0,0, 0,1,0,0,0,1,0, 0,1,0,0,0,1,0, 0,0,1,1,1,0,0];
  return <div className="grid md:grid-cols-[180px_1fr] gap-6 items-center py-4"><div className="relative w-[168px] h-[168px] mx-auto grid grid-cols-7 gap-1 p-3 bg-slate-900 rounded-2xl shadow-inner">{pixels.map((pixel,index)=><span key={index} className={`rounded-sm ${pixel ? "bg-cyan-300" : "bg-slate-700"}`} />)}<div className="absolute border-2 border-amber-400 rounded-lg left-7 top-6 right-7 bottom-6"><span className="absolute -top-6 left-0 bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 rounded">focus region</span></div></div><div className="space-y-2">{stages.slice(0,4).map((stage,index)=><div key={stage.label} className="flex gap-3"><span className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-700 font-bold text-xs flex items-center justify-center shrink-0">{index+1}</span><div><p className="font-semibold text-slate-900 text-sm">{stage.label}</p><p className="text-xs text-slate-600">{stage.detail}{stage.value ? ` - ${stage.value}` : ""}</p></div></div>)}</div></div>;
}

function Pipeline({ stages }: { stages: Stage[] }) {
  return <div className="flex flex-col lg:flex-row items-stretch gap-2 py-3">{stages.map((stage,index)=><React.Fragment key={stage.label}><div className="flex-1 relative rounded-xl bg-white border border-indigo-100 p-4 shadow-sm"><span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">{index === 0 ? "INPUT / STEP 1" : index === stages.length - 1 ? `OUTPUT / STEP ${index + 1}` : `PROCESS / STEP ${index + 1}`}</span><h4 className="font-bold text-slate-900 mt-1">{stage.label}</h4><p className="text-sm text-slate-600 mt-1 leading-relaxed">{stage.detail}</p>{stage.value && <p className="font-mono text-xs text-violet-700 bg-violet-50 rounded-md px-2 py-1.5 mt-3">{stage.value}</p>}</div>{index < stages.length - 1 && <div className="flex items-center justify-center text-indigo-400 font-bold rotate-90 lg:rotate-0" aria-hidden="true">→</div>}</React.Fragment>)}</div>;
}

function TopicVisual({ example }: { example: IllustratedExample }) {
  if (example.kind === "curve" && example.chart) return <Chart config={example.chart} />;
  if (example.kind === "matrix" && example.matrices) return <Matrix panels={example.matrices} />;
  if (example.kind === "sequence" && example.tokens) return <Sequence tokens={example.tokens} focusToken={example.focusToken} />;
  if (example.kind === "graph") return <Graph />;
  if (example.kind === "image") return <ImageVisual stages={example.stages} />;
  return <Pipeline stages={example.stages} />;
}

export function DeepLearningIllustratedExample({ topicId }: { topicId: string }) {
  const example = examples[topicId];
  if (!example) return null;
  const realLifeExamples: Record<string, string> = {
    "deep-learning-intro": "Imagine a post office that receives thousands of handwritten envelopes. A deep-learning model can look at the pixels in each postal code and decide which digit is written, helping the sorting machine send the letter to the correct area.",
    "math-foundations-deep-learning": "A house-price model receives facts such as the size and age of a house. It gives each fact a different importance, combines them, and produces one useful number. A neuron performs the same multiply-and-add calculation.",
    "neural-networks": "A school wants an early warning system for students who may need help. The network combines study hours, sleep, and attendance to estimate the chance that a student will pass.",
    "mlp-universal-approximation": "Electricity use does not rise in a perfectly straight line: demand changes sharply in the morning and evening. Several simple neurons can join small line segments to follow this curved pattern.",
    "tensors-frameworks-gpus": "A photo service checks 32 uploaded images at the same time. The images are stored as one four-dimensional block of numbers so the GPU can process the whole batch efficiently.",
    "activation-functions": "A model is deciding which signals from an image should continue to the next layer. ReLU removes negative signals, while sigmoid squeezes a signal into a value between 0 and 1.",
    "loss-functions-deep-learning": "A pet-photo app says an image is a cat with 90% confidence. Loss tells the app whether that confident answer was correct and gives a much larger penalty when it was confidently wrong.",
    "backpropagation": "A small sales model predicts 6 units when the correct answer is 9. Backpropagation works backward from this error and tells each weight which direction it should move.",
    "computational-graphs-autodiff": "A bill calculator multiplies quantity by price, adds tax, and squares an error during training. Automatic differentiation remembers those small operations and works backward through them to calculate gradients.",
    "neural-network-training-loop": "A factory camera learns to identify defective products. It repeatedly sees a batch of labelled images, measures its mistakes, updates its weights, and then checks new validation images.",
    "deep-learning-optimizers": "Three learners are trying to reach the bottom of a winding valley. SGD follows the current slope, momentum remembers its recent direction, and Adam changes the step size for different parameters.",
    "advanced-neural-optimization": "A hospital must train on large medical images, but only eight fit in GPU memory. Gradient accumulation combines several small batches before one update, while clipping and mixed precision keep training practical and stable.",
    "learning-rate-scheduling": "When learning to ride a bicycle, large corrections help at first but small corrections are safer once balance improves. A learning-rate schedule changes model-update size in the same way.",
    "weight-initialization": "Before training begins, a network needs starting weights. If they are too small, useful signals fade as they cross layers; a suitable initialization keeps the signal strong enough to learn.",
    "batch-normalization": "Readings reaching one layer may have very different centers and spreads. Batch normalization first puts the current mini-batch on a common scale and then learns the best scale and shift for the task.",
    "normalization-methods": "An image model may train with only two large images at once, while a language model works with token features. Different normalization methods choose different groups of values when calculating their statistics.",
    "deep-learning-regularization": "A plant-disease model memorizes the backgrounds in its training photos and performs poorly on new farms. Regularization makes memorization harder so the model must learn more useful leaf patterns.",
    "label-smoothing-distillation-ensembles": "A traffic-sign classifier should not act as if every training label is perfectly certain. Soft labels, a teacher model, or several models together can produce less brittle predictions.",
    "vanishing-exploding-gradients": "In a very deep network, a learning signal must pass through many layers. Repeatedly shrinking it makes early layers learn almost nothing, while repeatedly enlarging it makes updates unstable.",
    "deep-learning-generalization": "An X-ray model scores well at the hospital where it was trained but fails on scans from another hospital. Generalization means learning disease patterns that still work when the scanner or patient group changes.",
    "data-augmentation-deep-learning": "A farmer has only a few hundred photographs of diseased leaves. Cropping, flipping, and carefully changing brightness creates useful variations without collecting a completely new dataset.",
    "curriculum-meta-few-shot": "A handwriting system first learns easy, clear characters, then harder ones. Later it uses experience from many characters to recognize a new writing style from only a few examples.",
    "cnn": "A bank needs to read handwritten digits on forms. A CNN slides small filters across each image, finds strokes and corners, and combines them to decide which digit is present.",
    "cnn-architectures-resnet": "A road-camera model needs many layers to recognize difficult scenes. Residual shortcuts let information bypass a few layers, making a deep network easier to train.",
    "computer-vision": "A supermarket self-checkout camera must recognize the product placed on the counter. Computer vision turns image pixels into features that can be used for classification, detection, or segmentation.",
    "object-detection": "A traffic camera must find every vehicle, not just say that vehicles exist. Object detection predicts a class and a bounding box for each car, bus, or motorcycle in the image.",
    "unet-deeplab-gradcam": "A doctor needs the exact outline of a suspicious region in a scan and also wants to know which area influenced the model. Segmentation finds the pixels; Grad-CAM provides a rough visual check of model attention.",
    "vision-transformers": "A drone photograph of a farm is divided into small square patches. A Vision Transformer treats the patches like a sequence and learns which distant parts of the field are related.",
    "state-space-bptt": "A power company watches a long stream of electricity readings. A sequence model keeps a useful state from earlier times, while backpropagation through time teaches it which past readings mattered.",
    "rnn-lstm": "A phone keyboard wants to suggest the next word after 'I would like a cup of'. An LSTM reads the words in order and keeps useful earlier information so it can suggest a word such as 'tea'.",
    "gru-bidirectional-seq2seq": "A translation app reads a complete sentence before producing its translation. A bidirectional encoder uses both earlier and later words, and a decoder generates the new sentence one token at a time.",
    "attention-transformers-deep-learning": "In 'The robot lifted the box because it was light', the word 'it' probably refers to the box. Attention lets the model compare that word with other words and collect the most useful context.",
    "deep-learning-nlp": "A review says 'not at all boring'. A language model must read the words together; judging only the word 'boring' would give the wrong sentiment.",
    "transfer-learning": "A gardener has only 600 labelled flower photos. Instead of training from nothing, the project starts with an image model that already knows general visual patterns and adapts it to the three flower classes.",
    "autoencoders": "A bank trains an autoencoder only on normal transactions. Familiar transactions are reconstructed well, while an unusual transaction can produce a large reconstruction error and be sent for review.",
    "autoencoder-variants": "A company receives noisy scans of handwritten forms. A denoising autoencoder sees the noisy version but learns to reproduce the clean version, so its internal representation becomes less sensitive to noise.",
    "self-supervised-contrastive-learning": "A warehouse has millions of product photos but few labels. Two changed views of the same photo are treated as a matching pair, teaching the model useful visual features without product names.",
    "graph-neural-networks": "Research papers form a graph because one paper cites another. A graph neural network combines a paper's own words with information from nearby cited papers to predict its subject.",
    "pinn-kan-topological-networks": "Engineers have only a few temperature measurements from a metal plate but know the heat equation. A physics-informed network learns from both the measurements and the known equation.",
    "debugging-neural-networks": "A ten-class image model stays near 10% accuracy, which is no better than guessing. Before adding layers, the developer checks one batch, labels, gradients, and whether the model can memorize 20 clean examples.",
    "saving-deploying-deep-models": "A factory deploys a defect detector as an API. The saved weights alone are not enough—the service must use the same resizing, normalization, class names, and model version used during testing."
  };
  const importanceByTopic: Record<string, string> = {
    "deep-learning-intro": "It gives you the map needed to understand how data, layers, loss, backpropagation, and optimization form one learning system.",
    "math-foundations-deep-learning": "Vectors, matrices, derivatives, and probability are the language used to describe what every layer computes and how every weight changes.",
    "activation-functions": "They determine whether stacked layers can learn non-linear patterns and what form a neuron’s output takes.",
    "neural-networks": "This is the basic structure behind CNNs, recurrent networks, transformers, autoencoders, and many modern AI systems.",
    "mlp-universal-approximation": "It explains how simple neurons can combine to represent complicated functions—and why representation power alone does not guarantee successful learning.",
    "tensors-frameworks-gpus": "Nearly every deep-learning bug or performance issue eventually involves a tensor’s shape, data type, device, or gradient history.",
    "loss-functions-deep-learning": "The loss defines what the model is rewarded for learning; a mismatched loss can train the wrong behavior even when the code runs.",
    "backpropagation": "Backpropagation connects a final mistake to the individual weights responsible for it, making neural-network learning possible.",
    "computational-graphs-autodiff": "It explains how frameworks calculate thousands of gradients automatically and helps you diagnose detached or missing gradients.",
    "neural-network-training-loop": "A correct model definition is not enough: batches, modes, gradient clearing, updates, and validation must occur in the right order.",
    "deep-learning-optimizers": "The optimizer controls how gradients become weight updates and strongly affects speed, stability, and final model quality.",
    "advanced-neural-optimization": "These techniques make training possible when memory, numerical precision, unstable gradients, or distributed hardware become constraints.",
    "learning-rate-scheduling": "The learning rate is often the most influential training setting; scheduling it helps the model move quickly early and refine carefully later.",
    "weight-initialization": "Good starting weights preserve signal and gradient scale before learning has had any chance to correct the network.",
    "batch-normalization": "It can stabilize intermediate activations, support larger learning rates, and changes how a model behaves between training and inference.",
    "normalization-methods": "Different architectures and batch sizes require different normalization axes; choosing the wrong method can make training noisy or inconsistent.",
    "deep-learning-regularization": "Regularization helps a high-capacity network learn repeatable patterns instead of memorizing accidental details in the training set.",
    "label-smoothing-distillation-ensembles": "These methods improve how knowledge and uncertainty are represented, often producing less brittle predictions or smaller deployable models.",
    "vanishing-exploding-gradients": "If gradients disappear or grow uncontrollably, early layers cannot learn reliably no matter how good the dataset is.",
    "deep-learning-generalization": "Real success means working on new users, devices, locations, and time periods—not merely scoring well on familiar training data.",
    "data-augmentation-deep-learning": "Careful transformations can teach invariances and increase effective data variety when labelled examples are limited.",
    "curriculum-meta-few-shot": "These strategies study how the order of examples and prior learning can help a model adapt with less data.",
    "cnn": "CNNs explain how local filters and shared weights turn pixels into progressively richer visual features.",
    "cnn-architectures-resnet": "Understanding architectural milestones reveals why depth, receptive fields, branching, and shortcut connections matter.",
    "computer-vision": "It connects image pixels to real tasks and clarifies the different outputs required by classification, detection, and segmentation.",
    "object-detection": "Many applications need both what is present and where it is; detection and segmentation provide those spatial answers.",
    "unet-deeplab-gradcam": "These tools help produce pixel-level predictions and inspect which image regions influenced a model’s decision.",
    "vision-transformers": "Vision Transformers show how patch tokens and attention can model long-range image relationships without relying only on convolutions.",
    "state-space-bptt": "It explains how sequence models carry state through time and how learning signals reach earlier moments.",
    "rnn-lstm": "These models introduce memory gates and the central challenges of learning from ordered data.",
    "gru-bidirectional-seq2seq": "They show how sequence information can be compressed, read in both directions, and decoded into a new sequence.",
    "attention-transformers-deep-learning": "Attention is the central mechanism that lets modern sequence models choose relevant context and process tokens efficiently in parallel.",
    "deep-learning-nlp": "It explains how text becomes numerical representations that can support classification, generation, translation, and retrieval.",
    "transfer-learning": "Reusing learned features can drastically reduce the labels, compute, and time needed for a new task.",
    "autoencoders": "Learning to reconstruct inputs creates compact representations useful for compression, denoising, and anomaly detection.",
    "autoencoder-variants": "Different constraints change what the latent representation learns, so the variant must match the real objective.",
    "self-supervised-contrastive-learning": "It makes large unlabelled datasets useful by constructing learning signals from the data itself.",
    "graph-neural-networks": "Graphs model relationships that grids and sequences cannot express naturally, from molecules to citations and social networks.",
    "pinn-kan-topological-networks": "These approaches add strong mathematical or structural assumptions when ordinary dense layers ignore important domain knowledge.",
    "debugging-neural-networks": "Systematic checks save time and prevent architecture changes from hiding errors in data, labels, loss, gradients, or evaluation.",
    "saving-deploying-deep-models": "A useful model must reproduce the same prediction outside the notebook with versioned preprocessing, validation, monitoring, and rollback."
  };
  const realLifeExample = realLifeExamples[topicId] ?? example.question;
  const whyItMatters = importanceByTopic[topicId] ?? `It helps answer this practical question: ${example.question}`;
  const exampleDetailsHeading = example.kind === "curve" ? "Numbers plotted in this example" : example.kind === "matrix" ? "Numbers shown in the grids" : example.kind === "sequence" ? "Tokens and sequence details" : example.kind === "graph" ? "Nodes and relationships" : example.kind === "image" ? "Image and target details" : "Inputs and feedback";
  return (
    <>
    <section className="not-prose rounded-2xl border border-indigo-200 bg-white overflow-hidden shadow-sm">
      <div className="px-5 md:px-7 py-5 bg-indigo-50 border-b border-indigo-100">
        <p className="text-sm font-semibold text-indigo-700 mb-2">Guided example</p>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">{example.title}</h2>
        <p className="text-sm text-slate-700 mt-2 leading-relaxed">{whyItMatters}</p>
      </div>

      <div className="p-5 md:p-7 space-y-7">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">The situation</h3>
          <p className="text-slate-700 leading-relaxed">{realLifeExample}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{exampleDetailsHeading}</h3>
          <p className="text-sm text-slate-600 mb-3">Read these labels first. They identify the information that appears in the explanation and diagram below.</p>
          <ul className="space-y-2">
            {example.givens.map(([label, value]) => (
              <li key={label} className="flex flex-col sm:flex-row sm:gap-2 text-sm leading-relaxed">
                <span className="font-semibold text-slate-900">{label}:</span>
                <span className="text-slate-700">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Follow the information</h3>
          <ol className="space-y-4">
            {example.stages.map((stage, index) => (
              <li key={stage.label} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                <div className="pt-0.5">
                  <p className="font-semibold text-slate-900">{stage.label}</p>
                  <p className="text-sm text-slate-700 leading-relaxed mt-1">{stage.detail}</p>
                  {stage.value && <p className="text-sm text-indigo-700 mt-1"><span className="font-semibold">In this example:</span> {stage.value}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6 overflow-hidden">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Labelled concept diagram</p>
            <h3 className="text-lg font-bold text-slate-900">Where does each value go?</h3>
            <p className="text-sm text-slate-600 mt-1">Follow the labelled arrows from the supplied information to the model&apos;s result.</p>
          </div>
          <TopicVisual example={example} />
          <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-600 m-0"><strong className="text-slate-900">How to read this diagram:</strong> start with {example.givens[0]?.[0] ?? "the input"}, follow {example.stages.map((stage) => stage.label).join(" → ")}, and compare the diagram with the final result below.</p>
          </div>
        </div>

        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5">
          <h3 className="text-lg font-bold text-emerald-900 mb-2">Final result</h3>
          <p className="text-slate-700 leading-relaxed">{example.result}</p>
          <p className="text-slate-700 leading-relaxed mt-3"><span className="font-semibold text-emerald-900">What to remember:</span> {example.insight}</p>
        </div>
      </div>
    </section>

    <section className="not-prose">
      <h2 className="text-2xl font-bold text-indigo-800 mb-3">Can You Trace the Process?</h2>
      <p className="text-slate-700 leading-relaxed mb-5">
        Before moving on, make sure you can identify the inputs, describe the ordered operations, and interpret the result without memorising a definition.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Inputs</p>
          <p className="text-sm leading-relaxed text-slate-700">
            {example.givens.map(([label, value]) => `${label}: ${value}`).join("; ")}.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Operations</p>
          <p className="text-sm leading-relaxed text-slate-700">
            {example.stages.map((stage) => stage.label).join(" → ")}.
          </p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-2">Try it yourself</p>
          <p className="text-sm leading-relaxed text-slate-700">{example.tryIt}</p>
        </div>
      </div>
    </section>
    </>
  );
}
