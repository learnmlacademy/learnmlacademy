import React from "react";
import { getTopicById } from "../../data/curriculum";

type ExtraLesson = {
  figureTitle: string;
  figureIntro: string;
  nodes: Array<[string, string]>;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonRows: Array<[string, string, string, string]>;
  applications: Array<[string, string]>;
  checks: string[];
};

const extras: Record<string, ExtraLesson> = {
  "math-foundations-deep-learning": {
    figureTitle: "From one input vector to one learning update",
    figureIntro: "This diagram places algebra, calculus and probability in the order in which a network actually uses them.",
    nodes: [["Input vector", "Store one example as ordered numbers."], ["Matrix operation", "Calculate many weighted sums together."], ["Probability or value", "Convert the final scores into the required prediction."], ["Loss", "Measure the prediction against the target."], ["Gradient", "Use derivatives to find a useful weight change."]],
    comparisonTitle: "What each branch of mathematics contributes",
    comparisonIntro: "The branches overlap, but each answers a different practical question during training.",
    comparisonRows: [["Linear algebra", "How do we represent and transform many numbers?", "Vectors, matrices, dot products", "Mixing up dimensions or multiplication order"], ["Calculus", "How would loss change if a parameter moved?", "Derivatives, gradients, chain rule", "Memorising symbols without tracing dependencies"], ["Probability", "How do we represent uncertainty and distributions?", "Probabilities, likelihood, expectation", "Treating confidence as guaranteed correctness"]],
    applications: [["Dense and convolutional layers", "Both are organised collections of multiply-and-add operations that matrix libraries evaluate efficiently."], ["Training any differentiable model", "Gradients connect a measured loss to the parameters that caused it."]],
    checks: ["Write the shape beside every vector and matrix before multiplying.", "Calculate one neuron manually before relying on a library layer.", "Use finite-difference gradient checking on a tiny custom operation."]
  },
  "tensors-frameworks-gpus": {
    figureTitle: "The same batch as meaning, memory and computation",
    figureIntro: "A tensor moves through several layers of the software stack; each layer must agree about shape, type and device.",
    nodes: [["Real examples", "32 colour photographs"], ["Tensor", "Shape [32, 3, 64, 64]"], ["Framework", "Layers and gradients operate on the tensor"], ["Device", "CPU or GPU stores and calculates"], ["Result", "Scores shaped [32, classes]"]],
    comparisonTitle: "CPU, GPU and framework responsibilities",
    comparisonIntro: "These terms are often mentioned together, but they do different jobs.",
    comparisonRows: [["CPU", "General-purpose execution and data preparation", "Small models, control logic, loading", "Large parallel matrix work may be slower"], ["GPU", "Many similar numerical operations in parallel", "Large batches and neural layers", "Memory is limited; transfers have a cost"], ["Framework", "Tensor operations, layers, autodiff and saving", "Building and training models", "Cannot choose correct data or evaluation for you"]],
    applications: [["Image training", "A four-dimensional batch keeps examples, channels, height and width separate."], ["Language modelling", "Token batches usually add sequence length and embedding dimensions, with masks matching the token axes."]],
    checks: ["Print shape, data type, minimum and maximum for one batch.", "Confirm model and inputs are on the same device.", "Move data to the accelerator once per batch rather than around every small operation."]
  },
  "loss-functions-deep-learning": {
    figureTitle: "The loss sits between prediction and learning",
    figureIntro: "A loss does not make the prediction. It judges the prediction in a way that produces a useful gradient.",
    nodes: [["Model output", "A number, logit or probability"], ["Target", "The correct numerical value or class"], ["Loss function", "Compare output with target"], ["Batch loss", "Combine example losses"], ["Gradient", "Send corrective information backward"]],
    comparisonTitle: "Choosing among common losses",
    comparisonIntro: "Match the loss to the target, model output and real cost of errors.",
    comparisonRows: [["MSE", "Continuous number", "Large errors should receive much more weight", "Outliers can dominate"], ["MAE", "Continuous number", "A robust, directly interpretable error size", "Gradient behaviour is less smooth at zero"], ["Binary cross-entropy", "One 0/1 target", "Binary or independent multi-label probabilities", "Use logits-aware form when output is raw"], ["Categorical cross-entropy", "One class among many", "Multi-class classification", "Target encoding must match sparse or one-hot API"]],
    applications: [["Price or demand prediction", "Compare MSE and MAE because a few extreme errors may change which model appears better."], ["Image classification", "Cross-entropy rewards probability placed on the correct class and strongly penalises confident mistakes."]],
    checks: ["Inspect one target and one raw model output side by side.", "Confirm whether the library function expects logits or probabilities.", "Report a human-readable metric in addition to the training loss."]
  },
  "backpropagation": {
    figureTitle: "Two journeys through the same network",
    figureIntro: "The forward and backward passes visit the same dependencies in opposite directions.",
    nodes: [["Input", "Known feature values"], ["Forward operations", "Weights create activations"], ["Prediction and loss", "Measure the final error"], ["Backward chain rule", "Pass responsibility toward earlier operations"], ["Parameter gradients", "One accumulated gradient per trainable weight"]],
    comparisonTitle: "Four ideas that should not be confused",
    comparisonIntro: "Separating these roles makes training code much easier to debug.",
    comparisonRows: [["Computation graph", "Records which result depends on which operation", "Forward pass", "A graph alone does not update anything"], ["Automatic differentiation", "Applies stored derivative rules", "Backward request", "Only differentiates recorded operations"], ["Backpropagation", "Organises reverse gradient flow through the network", "After loss is known", "Computes gradients, not new weights"], ["Optimizer", "Turns gradients into parameter updates", "After backward pass", "Needs a suitable learning rate"]],
    applications: [["Training ordinary neural networks", "Every differentiable weight receives a signal related to its contribution to the loss."], ["Custom layers and scientific models", "Autodiff can differentiate user-composed operations if the framework keeps their graph connected."]],
    checks: ["Verify the loss is finite before calling backward.", "Inspect whether expected parameters have non-null, non-zero gradients.", "Clear accumulated gradients at the intended point in the loop."]
  },
  "neural-network-training-loop": {
    figureTitle: "One epoch is made from many smaller correction cycles",
    figureIntro: "The inner batch loop updates weights; the validation pass measures them without updating.",
    nodes: [["Load batch", "Inputs and targets"], ["Forward + loss", "Make and judge predictions"], ["Backward", "Calculate gradients"], ["Optimizer step", "Update parameters"], ["Validate after epoch", "Measure held-out behaviour"]],
    comparisonTitle: "Training, validation and test data",
    comparisonIntro: "Their separation determines whether the reported result can be trusted.",
    comparisonRows: [["Training set", "Fits model parameters", "Every training epoch", "Data leakage if future or test information enters"], ["Validation set", "Chooses settings and checkpoints", "During experimentation", "Repeated tuning can overfit it"], ["Test set", "Final independent estimate", "After choices are frozen", "Looking early turns it into another validation set"]],
    applications: [["Image classifier", "Mini-batches balance noisy but frequent updates against accelerator memory."], ["Debugging a stalled model", "A tiny overfit test isolates training-code problems before architecture tuning begins."]],
    checks: ["Assert input shapes and label ranges on the first batch.", "Switch between training and evaluation modes explicitly.", "Plot training and validation loss for every experiment.", "Save the best validation checkpoint, not only the last epoch."]
  },
  "deep-learning-optimizers": {
    figureTitle: "Gradient, optimizer state and schedule work together",
    figureIntro: "The gradient supplies direction, the optimizer modifies it, and the schedule changes the overall step scale.",
    nodes: [["Gradient", "Current local slope"], ["Optimizer state", "Momentum or moving averages"], ["Learning rate", "Base update size"], ["Weight update", "New parameter value"], ["Scheduler", "Adjust later learning rates"]],
    comparisonTitle: "SGD, Momentum, RMSProp, Adam and AdamW",
    comparisonIntro: "No optimizer wins automatically; use the same starting weights and budget for a fair comparison.",
    comparisonRows: [["SGD", "Current gradient only", "Simple, low-memory baseline", "Can oscillate or need careful schedules"], ["Momentum", "Adds velocity from recent gradients", "Long, tuned vision training", "Momentum and rate interact"], ["RMSProp", "Scales by recent squared gradients", "Non-stationary or recurrent problems", "Still requires learning-rate tuning"], ["Adam", "Momentum plus adaptive scaling", "Fast general baseline", "Extra state and sometimes weaker generalisation"], ["AdamW", "Adam with decoupled weight decay", "Modern regularised training", "Decay must still be tuned"]],
    applications: [["Fast experimentation", "Adam or AdamW often reaches a useful baseline with less initial tuning."], ["Long controlled training", "SGD with momentum can be competitive when its schedule and regularisation are tuned carefully."]],
    checks: ["Compare optimizers from identical initial weights.", "Record validation quality, time and memory—not only training loss.", "Plot the actual learning-rate schedule.", "Clip gradients only after inspecting why they are large."]
  },
  "weight-initialization": {
    figureTitle: "Three defences against unstable signal flow",
    figureIntro: "Initialization controls the starting scale, normalization controls intermediate statistics, and architecture helps information travel.",
    nodes: [["Scaled initialization", "Healthy first forward pass"], ["Activation", "ReLU, tanh or another transformation"], ["Normalization", "Control selected activation statistics"], ["Residual path", "Carry information around a block"], ["Gradient monitoring", "Detect vanishing, explosion or NaN"]],
    comparisonTitle: "Initialization and normalization choices",
    comparisonIntro: "Choose from the activation, tensor layout and batch conditions—not by habit.",
    comparisonRows: [["Xavier/Glorot", "Balances fan-in and fan-out", "Tanh or approximately symmetric activations", "May be too small for deep ReLU stacks"], ["He/Kaiming", "Scales for ReLU-like activations", "ReLU networks", "Assumptions depend on activation slope"], ["BatchNorm", "Statistics across batch and spatial positions", "CNNs with useful batch sizes", "Training and inference use different statistics"], ["LayerNorm", "Statistics within each example", "Transformers and variable batches", "Normalised axes must match the layout"], ["GroupNorm", "Statistics within channel groups", "Small-batch vision", "Group count is a design choice"]],
    applications: [["Very deep CNN", "He initialization and residual connections help activations and gradients survive many blocks."], ["Transformer", "LayerNorm and residual paths stabilise repeated attention and feed-forward transformations without relying on batch statistics."]],
    checks: ["Plot activation mean and spread at several depths on the first batch.", "Track gradient norms by layer.", "Confirm evaluation mode before using BatchNorm in inference.", "Stop and inspect immediately when loss becomes NaN or infinite."]
  },
  "deep-learning-regularization": {
    figureTitle: "Regularization acts at different points in the learning system",
    figureIntro: "Some methods change data, some change activations or weights, and some change the stopping or prediction rule.",
    nodes: [["Training data", "Augmentation adds valid variety"], ["Targets", "Label smoothing reduces absolute certainty"], ["Network", "Dropout hides temporary activation paths"], ["Weights", "Weight decay discourages large values"], ["Validation", "Early stopping selects the useful epoch"]],
    comparisonTitle: "Regularization methods by where they act",
    comparisonIntro: "Methods can be combined when they address different failure modes, but every combination needs validation.",
    comparisonRows: [["Dropout", "Activations", "Reduce reliance on individual units", "Must be disabled at inference"], ["Weight decay", "Parameters", "Prefer smaller weights", "Too much causes underfitting"], ["Label smoothing", "Class targets", "Reduce brittle overconfidence", "Can change calibration and hard-label fit"], ["Early stopping", "Training duration", "Avoid later validation deterioration", "Needs a representative validation set"], ["Ensemble", "Predictions", "Average independent model errors", "Multiplies storage and inference cost"]],
    applications: [["Small image dataset", "Augmentation, transfer learning, moderate weight decay and early stopping form a stronger starting plan than dropout alone."], ["Overconfident classifier", "Label smoothing or calibration may help, but first check label noise and distribution shift."]],
    checks: ["Diagnose overfitting from separate learning curves.", "Change one regularizer at a time in controlled comparisons.", "Evaluate calibration and per-group errors, not only accuracy.", "Keep the test set untouched while choosing regularization."]
  },
  "data-augmentation-deep-learning": {
    figureTitle: "One labelled image can produce several valid training views",
    figureIntro: "The label remains fixed only when each transformation is valid for the real task.",
    nodes: [["Original image", "Leaf labelled diseased"], ["Geometry", "Crop, translate or safe flip"], ["Appearance", "Brightness, contrast or sensor noise"], ["Training views", "Different pixels, same valid label"], ["Model", "Learns which changes to ignore"]],
    comparisonTitle: "Image augmentation families",
    comparisonIntro: "The safe range depends on how production images are captured and what determines the label.",
    comparisonRows: [["Crop/resize", "Position and visible region", "Objects appear at varied scales", "May cut away the labelled object"], ["Flip/rotate", "Orientation", "Orientation should not change class", "Unsafe for text, direction or anatomy"], ["Colour jitter", "Brightness, contrast and colour", "Lighting varies", "Unsafe when colour defines the target"], ["Noise/blur", "Sensor quality", "Production capture is imperfect", "Can destroy small diagnostic features"], ["Mixup/CutMix", "Combines examples and labels", "Strong classifier regularisation", "Harder to interpret; not valid for every task"]],
    applications: [["Plant disease photographs", "Moderate crops and lighting changes can imitate different phones and farms."], ["Document recognition", "Small perspective and brightness changes may help, while mirroring letters would create invalid training data."]],
    checks: ["Display a labelled grid of augmented samples before training.", "Keep validation preprocessing deterministic.", "Measure each augmentation policy against a no-augmentation baseline.", "Ask a domain expert about transformations with semantic meaning."]
  },
  "cnn": {
    figureTitle: "A CNN builds a visual hierarchy instead of making one giant comparison",
    figureIntro: "Each stage keeps useful local evidence and combines it into progressively larger patterns.",
    nodes: [["Pixels", "Brightness and colour numbers"], ["Early filters", "Edges and simple textures"], ["Middle layers", "Corners, curves and repeated shapes"], ["Deep layers", "Object parts and larger arrangements"], ["Classifier", "Scores for cat, dog, bicycle and other classes"]],
    comparisonTitle: "The main operations inside a CNN",
    comparisonIntro: "Each operation changes the representation for a specific reason.",
    comparisonRows: [["Convolution", "Learn local pattern responses", "Kernel size, stride, padding", "Wrong output-size assumptions"], ["Activation", "Add non-linearity", "Usually ReLU-like in CNN blocks", "Dead or saturated units"], ["Pooling/stride", "Reduce spatial size", "Efficiency and larger receptive field", "Small details may disappear"], ["Global pooling", "Summarise each feature map", "Compact classifier head", "Loses exact location"], ["Dense head", "Map features to final scores", "Class prediction", "Too many flattened features can overfit"]],
    applications: [["Image classification", "One label describes the complete image, such as the product or species shown."], ["Backbones for detection", "Convolutional feature maps can feed box and mask prediction heads."]],
    checks: ["Write the tensor shape after every convolution and pooling layer.", "Visualise a few first-layer filters and activation maps.", "Test changes in lighting, scale, background and viewpoint.", "Inspect misclassified images rather than only aggregate accuracy."]
  },
  "cnn-architectures-resnet": {
    figureTitle: "The architectural ideas that changed CNN design",
    figureIntro: "The models are easiest to remember by the problem each design tried to solve.",
    nodes: [["AlexNet", "GPU-scale CNN with ReLU and dropout"], ["VGG", "Uniform stacks of small 3 × 3 filters"], ["GoogLeNet", "Parallel multi-scale inception branches"], ["ResNet", "Residual blocks with shortcut paths"], ["Modern backbones", "Balance accuracy, memory and latency"]],
    comparisonTitle: "AlexNet, VGG, GoogLeNet and ResNet",
    comparisonIntro: "These are milestones, not a ranking that applies to every deployment.",
    comparisonRows: [["AlexNet", "Large early kernels and GPU training", "Historical breakthrough", "Heavy by modern standards"], ["VGG", "Repeated 3 × 3 convolutions", "Simple uniform architecture", "Very high parameter and compute cost"], ["GoogLeNet", "Parallel filters and 1 × 1 bottlenecks", "Multi-scale efficiency", "More complex branching"], ["ResNet", "Identity shortcut plus residual branch", "Training much deeper networks", "Addition requires compatible tensor shapes"]],
    applications: [["Transfer-learning backbone", "Pretrained residual models remain useful feature extractors for many image tasks."], ["Edge deployment", "A smaller mobile-oriented architecture may be preferable even if a classic model is easier to explain."]],
    checks: ["Compare parameter count and multiply–accumulate cost.", "Verify tensor shapes before every residual addition.", "Benchmark latency on the actual target device.", "Compare pretrained backbones with the same data split and training budget."]
  },
  "object-detection": {
    figureTitle: "The output becomes more detailed from classification to segmentation",
    figureIntro: "All three tasks can inspect the same scene, but the supervision and prediction are different.",
    nodes: [["Input scene", "Person beside two cars"], ["Classification", "Which classes appear?"], ["Detection", "Which class and box for each object?"], ["Segmentation", "Which pixels belong to each region or instance?"], ["Grad-CAM", "Which coarse regions influenced one class score?"]],
    comparisonTitle: "Vision tasks and their evaluation",
    comparisonIntro: "Choose the simplest output that answers the real application question.",
    comparisonRows: [["Classification", "One or more image labels", "Accuracy, precision, recall", "No location information"], ["Object detection", "Classes, confidence and boxes", "IoU and mean average precision", "Small/overlapping objects are difficult"], ["Semantic segmentation", "Class per pixel", "IoU or Dice per class", "Same-class instances merge"], ["Instance segmentation", "Separate mask per object", "Mask AP and IoU", "More annotation and computation"], ["Grad-CAM", "Coarse influence heatmap", "Qualitative inspection", "Not a ground-truth mask or causal proof"]],
    applications: [["Traffic monitoring", "Detection counts and locates vehicles while instance masks can estimate occupied road area."], ["Medical imaging", "Segmentation can outline a region for measurement, but clinical evaluation and uncertainty checks remain essential."]],
    checks: ["Display boxes or masks over original images.", "Evaluate separately by object size and class.", "Tune confidence thresholds on validation data.", "Treat explanation heatmaps as diagnostic clues, not proof."]
  },
  "vision-transformers": {
    figureTitle: "An image becomes an ordered collection of patch tokens",
    figureIntro: "Patch creation changes the image into the same broad representation style used by text Transformers.",
    nodes: [["Image", "224 × 224 × 3 pixels"], ["Patchify", "196 patches of 16 × 16"], ["Embed + position", "One vector and location per patch"], ["Transformer encoder", "Attention mixes information across patches"], ["Class representation", "Final vector produces class scores"]],
    comparisonTitle: "CNN and Vision Transformer design assumptions",
    comparisonIntro: "Both can solve image tasks, but they begin with different ideas about useful structure.",
    comparisonRows: [["Locality", "CNN: built into small kernels", "ViT: learned through attention", "ViT may need stronger pretraining"], ["Feature sharing", "CNN: same filter at every position", "ViT: shared projections and attention", "Both reuse learned parameters differently"], ["Global context", "CNN: grows with depth", "ViT: available between all patches early", "Attention cost grows with token count"], ["Data efficiency", "CNN often strong from smaller datasets", "ViT often benefits greatly from pretraining", "Depends on augmentation and model scale"]],
    applications: [["Large-scale image classification", "Pretrained ViTs can capture global relationships across a scene."], ["Detection and segmentation backbones", "Patch representations can feed spatial prediction heads when resolution is handled carefully."]],
    checks: ["Calculate patch count and attention size before choosing resolution.", "Preserve position information when reshaping patches.", "Compare with a pretrained CNN under equal conditions.", "Inspect performance on small objects that may fit inside one patch."]
  },
  "rnn-lstm": {
    figureTitle: "A sequence model carries state from one position to the next",
    figureIntro: "The model reuses the same transition at every step while the hidden state changes with the observed sequence.",
    nodes: [["x₁", "First token or reading"], ["h₁", "State after step 1"], ["x₂ + h₁", "New input meets remembered context"], ["h₂ … hₜ", "State continues through the sequence"], ["Output", "Prediction from selected states"]],
    comparisonTitle: "RNN, LSTM, GRU and state-space models",
    comparisonIntro: "They all process ordered information, but their memory and computation differ.",
    comparisonRows: [["Basic RNN", "One recurrent hidden-state update", "Short simple sequences", "Vanishing/exploding gradients"], ["LSTM", "Cell state with input, forget and output gates", "Longer dependencies", "More parameters and sequential cost"], ["GRU", "Update and reset gates", "Efficient gated recurrence", "Still processes recurrently"], ["State-space layer", "Structured state transition", "Very long efficient sequences", "Architecture and tuning are less familiar"]],
    applications: [["Sensor forecasting", "The state summarises earlier readings when predicting the next value."], ["Streaming speech", "Causal recurrence can update as audio arrives without waiting for future frames."]],
    checks: ["Define whether future context is allowed.", "Mask padded sequence positions correctly.", "Track gradient norms across long unrolls.", "Compare with a Transformer or simple temporal baseline."]
  },
  "attention-transformers-deep-learning": {
    figureTitle: "Attention constructs a different context for every token",
    figureIntro: "The query selects; keys are compared; values carry the information that is mixed.",
    nodes: [["Token vectors", "Create query, key and value projections"], ["Similarity scores", "Compare each query with candidate keys"], ["Mask + softmax", "Block invalid positions and form weights"], ["Weighted values", "Build one context vector per query"], ["Transformer block", "Residual, normalization and feed-forward transformation"]],
    comparisonTitle: "Sequence-to-sequence approaches",
    comparisonIntro: "The key difference is how input context reaches each output position.",
    comparisonRows: [["RNN encoder–decoder", "One final encoder state", "Shorter sequence generation", "Fixed bottleneck loses detail"], ["RNN + attention", "Decoder attends to all encoder states", "Translation and alignment", "Training remains partly sequential"], ["Transformer encoder–decoder", "Self-attention plus cross-attention", "Translation and sequence transformation", "Attention memory grows quickly"], ["Decoder-only Transformer", "Causal self-attention over one stream", "Continuation and language generation", "Cannot attend to future tokens"]],
    applications: [["Machine translation", "Cross-attention lets each generated word collect the relevant source-language representations."], ["Language modelling", "A causal mask allows a decoder to predict the next token without seeing later tokens."]],
    checks: ["Draw the attention mask for a three-token example.", "Verify the softmax axis sums to one.", "Track token and head dimensions through reshaping.", "Do not present attention weights as a complete explanation."]
  },
  "deep-learning-nlp": {
    figureTitle: "A text prediction system is more than its neural-network layer",
    figureIntro: "Tokenization and masking are part of the model contract because they determine the numbers the network receives.",
    nodes: [["Raw text", "Original sentence or document"], ["Tokenizer", "Subwords and vocabulary IDs"], ["Embedding", "Dense vector for each token"], ["Context model", "CNN, RNN or Transformer"], ["Task head", "Class, token labels or generated text"]],
    comparisonTitle: "Common NLP task formats",
    comparisonIntro: "The output structure determines targets, loss and evaluation.",
    comparisonRows: [["Sequence classification", "One label per text", "Sentiment or topic", "Long text may be truncated"], ["Token classification", "One label per token", "Named entities", "Labels must align after subword splitting"], ["Question answering", "Answer span or generated answer", "Document questions", "Evidence and unanswerable cases matter"], ["Sequence generation", "Next-token distribution", "Translation or summarisation", "Fluent output may be unsupported"]],
    applications: [["Support-ticket routing", "A sequence classifier maps a complete message to a team or priority."], ["Information extraction", "Token labels or structured generation identify names, dates and amounts in context."]],
    checks: ["Save the exact tokenizer with the model.", "Inspect truncation rate and document-length distribution.", "Evaluate spelling, dialect, language and domain subgroups.", "Keep private text out of logs unless explicitly protected and required."]
  },
  "autoencoders": {
    figureTitle: "The bottleneck forces a reconstructive model to choose what to preserve",
    figureIntro: "The shape narrows through the encoder and widens through the decoder; reconstruction loss connects the output back to the input.",
    nodes: [["Input x", "Original data"], ["Encoder", "Reduce dimensions"], ["Latent z", "Restricted internal code"], ["Decoder", "Expand from the code"], ["Reconstruction x̂", "Compare with x using a loss"]],
    comparisonTitle: "Autoencoder variants and their constraints",
    comparisonIntro: "The constraint—not merely the hourglass shape—determines what representation is encouraged.",
    comparisonRows: [["Basic bottleneck", "Limited latent dimension", "Compression", "Can still learn unhelpful copying"], ["Sparse", "Penalty on active latent units", "Feature discovery", "Sparsity strength needs tuning"], ["Denoising", "Corrupted input, clean target", "Noise-robust representation", "Corruption must resemble the desired invariance"], ["Contractive", "Penalty on input sensitivity", "Locally stable code", "More expensive derivatives"], ["Variational", "Distributional latent regularisation", "Sampling and generation", "Reconstruction–regularisation trade-off"]],
    applications: [["Denoising scanned forms", "Train from noisy inputs to clean targets so the code must preserve characters rather than pixel noise."], ["Anomaly screening", "Unusual reconstruction error can flag cases for review, but thresholds require labelled validation."]],
    checks: ["Compare reconstruction with a simple dimensionality-reduction baseline.", "Visualise original and reconstructed examples.", "Ensure anomaly thresholds are chosen on held-out cases.", "Test whether a powerful decoder reconstructs anomalies too well."]
  },
  "transfer-learning": {
    figureTitle: "Knowledge moves from broad pretraining to a smaller target task",
    figureIntro: "The backbone begins with reusable features; adaptation changes only the parts needed for the new target.",
    nodes: [["Source data", "Large labelled or self-supervised collection"], ["Pretrained backbone", "General visual or language features"], ["New task head", "Fresh output layer for target labels"], ["Frozen training", "Teach the head first"], ["Selective fine-tuning", "Adapt upper backbone layers carefully"]],
    comparisonTitle: "Ways to learn with fewer new labels",
    comparisonIntro: "They reuse information at different stages of the learning process.",
    comparisonRows: [["Feature extraction", "Freeze pretrained backbone", "Very small target dataset", "Source mismatch limits usefulness"], ["Fine-tuning", "Update some or all pretrained weights", "Enough target data for careful adaptation", "Can overwrite useful features"], ["Self-supervised pretraining", "Create targets from unlabelled data", "Large domain-specific raw dataset", "Objective may not match final task"], ["Contrastive learning", "Bring related views together", "Representation learning", "Augmentations define the invariance"], ["Few-shot/meta-learning", "Adapt from a small support set", "Repeated related tasks", "Relies on strong prior experience"]],
    applications: [["Flower classification", "A pretrained image backbone already recognises edges, textures and shapes before learning the new species."], ["Domain text classification", "A language model can be adapted to labelled tickets while current factual knowledge remains external."]],
    checks: ["Match the source preprocessing exactly.", "Train a frozen-head baseline before fine-tuning.", "Use a smaller learning rate for pretrained layers.", "Measure whether source and target domains differ in important ways."]
  },
  "graph-neural-networks": {
    figureTitle: "Each message-passing layer expands the neighbourhood a node can use",
    figureIntro: "One layer reaches immediate neighbours; a second layer can include neighbours of neighbours.",
    nodes: [["Node features", "Information attached to each entity"], ["Messages", "Transform features along allowed edges"], ["Aggregate", "Sum, mean, max or attention"], ["Update", "Combine neighbour summary with the node"], ["Predict", "Node, edge or complete-graph output"]],
    comparisonTitle: "Graph prediction levels",
    comparisonIntro: "The same message-passing backbone can support different outputs.",
    comparisonRows: [["Node classification", "One output per node", "Paper topic or fraud risk", "Neighbour labels can leak across splits"], ["Link prediction", "Score a pair of nodes", "Recommendation or missing relation", "Negative sampling changes evaluation"], ["Edge classification", "One output per existing edge", "Transaction or bond type", "Direction and edge features matter"], ["Graph classification", "One output after pooling all nodes", "Molecule property", "Pooling can discard fine structure"]],
    applications: [["Recommendation", "User and product nodes exchange information through interaction edges."], ["Molecular modelling", "Atom features combine with bond relationships before a whole-molecule prediction."]],
    checks: ["Define exactly what every node and edge means.", "Prevent future or test edges from leaking into training messages.", "Compare sum, mean and attention aggregators.", "Monitor over-smoothing as depth increases."]
  },
  "pinn-kan-topological-networks": {
    figureTitle: "Different prior knowledge enters at different parts of the model",
    figureIntro: "These advanced families should be separated by the structure they add, not grouped as interchangeable upgrades.",
    nodes: [["PINN", "Equation residual enters the loss"], ["KAN", "Learnable functions live on connections"], ["Topological model", "Nodes, edges and higher cells define message routes"], ["Baseline", "Ordinary MLP or GNN for comparison"], ["Evaluation", "Test whether the prior improves the real objective"]],
    comparisonTitle: "PINN, KAN and topological-network assumptions",
    comparisonIntro: "Use the family only when its assumption is present and measurable in the problem.",
    comparisonRows: [["PINN", "Known differential equation and conditions", "Sparse scientific observations", "Loss terms can be difficult to balance"], ["KAN", "Flexible learned one-dimensional edge functions", "Function approximation experiments", "Training and scaling costs vary"], ["Topological network", "Higher-order relational structure", "Meshes, complexes and structured scientific data", "Complex construction and fewer standard tools"], ["MLP baseline", "Vector inputs without special structure", "First comparison", "May ignore valuable known constraints"]],
    applications: [["Heat equation", "A PINN combines temperature observations with automatic derivatives that measure equation violation."], ["Mesh and complex data", "Topological message passing can preserve relationships involving faces or cells, not only node pairs."]],
    checks: ["State the prior assumption in one sentence.", "Train a simpler baseline under the same budget.", "Report each component of a multi-part loss separately.", "Use ablations to show whether the structural prior actually helps."]
  },
  "saving-deploying-deep-models": {
    figureTitle: "Deployment preserves an entire prediction contract",
    figureIntro: "Weights are only one artifact in the route from a raw request to a meaningful response.",
    nodes: [["Raw request", "Image, text or numerical record"], ["Validated preprocessing", "Same transforms used during evaluation"], ["Versioned model", "Architecture and trained weights"], ["Post-processing", "Thresholds, labels and output schema"], ["Monitoring", "Latency, failures, drift and quality"]],
    comparisonTitle: "Common deployment forms",
    comparisonIntro: "The correct form depends on latency, throughput, connectivity and device constraints.",
    comparisonRows: [["Batch job", "Many stored examples at once", "Offline scoring and reports", "Results are not immediate"], ["Online API", "One or a small batch per request", "Interactive applications", "Latency and availability requirements"], ["Streaming service", "Continuous ordered events", "Sensors and live monitoring", "State and back-pressure are complex"], ["Edge model", "Runs on phone or device", "Privacy and low network dependence", "Tight memory, power and update limits"]],
    applications: [["Factory defect API", "The service must resize and normalise exactly as training did before returning a versioned class decision."], ["Mobile model", "Quantisation and device compilation reduce cost but require accuracy and latency tests against the original."]],
    checks: ["Bundle preprocessing, labels and model configuration with weights.", "Run a golden input/output test after every load.", "Set evaluation mode and disable gradient tracking.", "Version releases and keep a tested rollback path.", "Monitor input drift and delayed quality labels where available."]
  }
};

const comparisonHeaders: Record<string, [string, string, string, string]> = {
  "math-foundations-deep-learning": ["Branch", "Question it answers", "Key ideas", "Important caution"],
  "tensors-frameworks-gpus": ["Part", "Responsibility", "Useful for", "Important caution"],
  "loss-functions-deep-learning": ["Loss", "Expected target", "Useful when", "Important caution"],
  "backpropagation": ["Term", "Role", "When it acts", "Important caution"],
  "neural-network-training-loop": ["Dataset split", "Purpose", "When it is used", "Important caution"],
  "deep-learning-optimizers": ["Optimizer", "Update idea", "Useful when", "Important caution"],
  "weight-initialization": ["Method", "What it controls", "Useful when", "Important caution"],
  "deep-learning-regularization": ["Method", "Where it acts", "Purpose", "Important caution"],
  "data-augmentation-deep-learning": ["Transformation", "What changes", "Useful when", "Important caution"],
  "cnn": ["Operation", "Purpose", "Main choice", "Important caution"],
  "cnn-architectures-resnet": ["Architecture", "Central idea", "Contribution", "Important caution"],
  "object-detection": ["Vision task", "Output", "Typical evaluation", "Important caution"],
  "vision-transformers": ["Aspect", "CNN", "Vision Transformer", "Trade-off"],
  "rnn-lstm": ["Model", "Memory mechanism", "Useful when", "Important caution"],
  "attention-transformers-deep-learning": ["Approach", "How context arrives", "Useful when", "Important caution"],
  "deep-learning-nlp": ["Task", "Output", "Example", "Important caution"],
  "autoencoders": ["Variant", "Constraint", "Useful when", "Important caution"],
  "transfer-learning": ["Method", "What changes", "Useful when", "Important caution"],
  "graph-neural-networks": ["Prediction level", "Output", "Example", "Important caution"],
  "pinn-kan-topological-networks": ["Family", "Structural assumption", "Useful when", "Important caution"],
  "saving-deploying-deep-models": ["Deployment form", "Request pattern", "Useful when", "Important caution"],
};

function SystemFigure({ lesson }: { lesson: ExtraLesson }) {
  return (
    <figure className="not-prose my-8">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50 p-5 md:p-7 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch gap-2">
          {lesson.nodes.map(([label, detail], index) => (
            <React.Fragment key={label}>
              <div className="flex-1 min-w-0 rounded-xl border border-indigo-200 bg-white p-4 shadow-sm text-center">
                <div className="w-8 h-8 mx-auto rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">{index + 1}</div>
                <p className="font-bold text-slate-900 mt-3">{label}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{detail}</p>
              </div>
              {index < lesson.nodes.length - 1 && <div className="flex items-center justify-center text-indigo-400 text-xl font-bold rotate-90 lg:rotate-0" aria-hidden="true">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <figcaption className="text-sm text-slate-600 text-center mt-3">Figure: {lesson.figureTitle}. Follow the numbered arrows from the original input or assumption to the observable result.</figcaption>
    </figure>
  );
}

export function DeepLearningLessonExtras({ topicId }: { topicId: string }) {
  const lesson = extras[topicId];
  if (!lesson) return null;
  const headers = comparisonHeaders[topicId] ?? ["Method or part", "What it does", "Useful when", "Important caution"];
  const pageTitle = getTopicById(topicId)?.subtopic.title ?? "This Concept";

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">{lesson.figureTitle}</h2>
        <p className="text-slate-700 leading-relaxed">{lesson.figureIntro}</p>
        <SystemFigure lesson={lesson} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">{lesson.comparisonTitle}</h2>
        <p className="text-slate-700 leading-relaxed mb-5">{lesson.comparisonIntro}</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-800 text-white"><tr>{headers.map((header) => <th key={header} className="p-3 text-left">{header}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {lesson.comparisonRows.map(([name, action, use, caution]) => <tr key={name} className="align-top hover:bg-slate-50"><td className="p-3 font-bold text-indigo-800">{name}</td><td className="p-3 text-slate-700">{action}</td><td className="p-3 text-emerald-800">{use}</td><td className="p-3 text-amber-800">{caution}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Where {pageTitle} Appears in Real Projects</h2>
        <div className="space-y-5">
          {lesson.applications.map(([title, detail]) => <div key={title} className="border-l-4 border-emerald-400 pl-5"><h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3><p className="text-slate-700 leading-relaxed m-0">{detail}</p></div>)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">Practical Checks for {pageTitle}</h2>
        <p className="text-slate-700 leading-relaxed mb-4">A successful training run is not enough. Use these checks to connect the explanation to observable evidence.</p>
        <ol className="space-y-3 pl-0 list-none">
          {lesson.checks.map((check, index) => <li key={check} className="flex gap-3 text-slate-700 leading-relaxed"><span className="not-prose w-7 h-7 shrink-0 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold flex items-center justify-center">{index + 1}</span><span>{check}</span></li>)}
        </ol>
      </section>
    </>
  );
}
