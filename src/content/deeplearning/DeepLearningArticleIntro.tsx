import React from "react";
import { getTopicById } from "../../data/curriculum";

type ArticleGuide = {
  title: string;
  opening: [string, string];
  journey: string;
  terms: Array<[string, string]>;
  sections: Array<[string, string]>;
};

const sectionHeadings: Record<string, [string, string, string]> = {
  "math-foundations-deep-learning": ["Mathematical Terms Used in Neural Networks", "From One Number to a Trainable Network", "How the Mathematics Fits Together"],
  "tensors-frameworks-gpus": ["Tensor Terms You Will See in Code", "From Raw Data to GPU Calculation", "How Tensors, Frameworks and Hardware Work Together"],
  "neural-network-training-loop": ["Terms Used During Model Training", "The Order of a Reliable Training Run", "How a Complete Training Loop Works"],
  "deep-learning-optimizers": ["Terms Used When Updating Weights", "From Gradient to Controlled Weight Update", "How the Main Optimization Choices Differ"],
  "weight-initialization": ["Terms for Understanding Stable Training", "How Signals Survive Many Layers", "How Initialization and Normalization Stabilize a Network"],
  "deep-learning-regularization": ["Terms for Understanding Generalization", "From Memorization to Useful Generalization", "How Regularization Methods Reduce Overfitting"],
  "data-augmentation-deep-learning": ["Terms Used in Data Augmentation", "From One Example to Safe Training Variations", "How to Design Valid Augmentations"],
  cnn: ["Important Parts of a CNN", "From Pixels to an Image Prediction", "How a CNN Builds Visual Features"],
  "cnn-architectures-resnet": ["Architecture Terms to Understand", "How CNN Designs Became Deeper", "From AlexNet to Residual Networks"],
  "object-detection": ["Terms for Locating Objects in Images", "From an Image to Boxes, Masks and Explanations", "How Detection and Segmentation Systems Work"],
  "vision-transformers": ["Terms Used in Vision Transformers", "How an Image Becomes a Token Sequence", "How a Vision Transformer Processes an Image"],
  "rnn-lstm": ["Terms for Learning From Sequences", "How Information Moves Through Time", "How RNNs, LSTMs, GRUs and State-Space Models Differ"],
  "attention-transformers-deep-learning": ["Terms Used in Attention and Transformers", "From Tokens to Context-Aware Representations", "How Attention Builds Context"],
  "deep-learning-nlp": ["Terms Used in Neural Language Systems", "From Raw Text to a Prediction", "How Deep Learning Processes Language"],
  autoencoders: ["Terms Used in Autoencoders", "From Input to Bottleneck and Reconstruction", "How Autoencoders Learn Useful Representations"],
  "transfer-learning": ["Terms for Reusing Learned Knowledge", "From Pretraining to a New Task", "How Models Adapt With Fewer Labels"],
  "graph-neural-networks": ["Terms Used in Graph Learning", "How Information Moves Across a Graph", "How Graph Neural Networks Build Predictions"],
  "pinn-kan-topological-networks": ["Terms Behind These Advanced Architectures", "Where Prior Knowledge Enters the Model", "How the Three Architecture Families Differ"],
  "saving-deploying-deep-models": ["Terms Used in Model Deployment", "From Training Notebook to Reliable Service", "How to Preserve a Model’s Prediction Contract"],
};

const guides: Record<string, ArticleGuide> = {
  "math-foundations-deep-learning": {
    title: "The small amount of mathematics a neural network repeats millions of times",
    opening: [
      "Deep learning can look mathematically intimidating because a real model contains millions of numbers. The underlying operations are much smaller: store numbers, multiply them, add them, measure an error, and calculate how that error changes. A single neuron is the best place to see the whole idea.",
      "Suppose a house-price model receives size and age. The model gives each input an importance, called a weight, adds a bias, and produces a score. During training, derivatives tell us how a tiny change in each weight would change the error. Matrix operations simply perform the same calculation for many inputs and neurons together."
    ],
    journey: "We will calculate one neuron by hand, connect vectors and matrices to a whole layer, and then explain why derivatives and probability are needed during training.",
    terms: [["Scalar", "One number, such as a loss of 0.42."], ["Vector", "An ordered list of numbers, such as the features of one house."], ["Matrix", "A rectangular table of numbers that can store all weights in a layer."], ["Derivative", "A number that tells how fast one value changes when another value changes."], ["Gradient", "A collection of derivatives—one for every trainable parameter."]],
    sections: [["Why matrix multiplication appears everywhere", "Each output neuron needs a weighted sum. Writing every multiplication separately would be slow and difficult to manage. A matrix stores the weights for many neurons, while matrix multiplication calculates all their weighted sums in one operation that GPUs can execute efficiently."], ["Why calculus is used", "Training asks a practical question: which weight should move, in which direction, and by how much? A derivative answers that question locally. Backpropagation combines local derivatives with the chain rule so an error at the output can guide weights in earlier layers."], ["Why probability matters", "Classification models often produce probabilities rather than only a label. Probability helps express uncertainty, construct losses such as cross-entropy, compare alternatives, and decide whether a low-confidence prediction should be reviewed."]]
  },
  "tensors-frameworks-gpus": {
    title: "How images, text and batches become data a neural network can calculate with",
    opening: [
      "A neural network never receives a photograph, sentence or sound in the human sense. It receives organised blocks of numbers. Deep-learning libraries call these blocks tensors. A tensor is not a mysterious new object; it is a general name for a number, a list, a table, or a higher-dimensional stack of tables.",
      "The dimensions of a tensor describe what its axes mean. An image may have height, width and colour channels. A batch adds another dimension for the number of images processed together. Frameworks such as PyTorch and TensorFlow keep track of these shapes, run the operations, and record the calculations needed for gradients."
    ],
    journey: "We will follow one batch of images through a model, identify every dimension, and see what the CPU, GPU and framework each contribute.",
    terms: [["Tensor", "A block of numerical data with a defined shape and data type."], ["Shape", "The size of every axis, for example 32 × 3 × 64 × 64."], ["Batch", "Several examples processed together before one weight update."], ["Device", "The processor holding the tensor, usually a CPU or GPU."], ["Computation graph", "A record of operations used later to calculate gradients."]],
    sections: [["Shape is part of the meaning", "The numbers [32, 3, 64, 64] do not merely describe storage. They mean 32 images, three colour channels, 64 rows and 64 columns. Mixing the channel and height axes may still produce numbers, but the model will interpret the wrong structure."], ["What a framework does", "A framework supplies tensor operations, reusable layers, automatic differentiation, optimizers, data loading and model saving. It does not decide whether the dataset, target, loss or evaluation method is appropriate; those choices remain part of the model design."], ["Why GPUs help", "Neural networks repeat large matrix operations that can be divided into many similar calculations. A GPU performs many of these calculations in parallel. Moving tiny tensors repeatedly between CPU and GPU can cancel the speed benefit, so data and model placement must be planned together."]]
  },
  "loss-functions-deep-learning": {
    title: "How a model turns a wrong answer into a number it can learn from",
    opening: [
      "A model can make many kinds of mistakes. Predicting a house price of ₹52 lakh when the answer is ₹50 lakh is a numerical error. Calling a dog a cat is a class error. A loss function converts the particular kind of mistake into one number: smaller means the prediction is closer to the training target.",
      "That number is not only a score shown after training. It is the signal used to calculate gradients and update the model. This is why choosing a loss is part of defining the task. Mean Squared Error and Mean Absolute Error are common for numerical prediction, while binary and categorical cross-entropy are common for classification."
    ],
    journey: "We will calculate MSE, MAE and cross-entropy with small numbers, compare their behaviour, and match each loss to the output and target it expects.",
    terms: [["Prediction (ŷ)", "The value or probability produced by the model."], ["Target (y)", "The correct value supplied in the training data."], ["Error", "The difference between prediction and target for an example."], ["Loss", "A differentiable penalty used to guide learning."], ["Outlier", "An unusually large or small observation that can dominate some losses."]],
    sections: [["Mean Squared Error (MSE)", "Subtract each prediction from its target, square every difference, then take the average. Squaring makes all errors positive and gives large errors much more influence. For errors 2 and 4, MSE is (2² + 4²) / 2 = 10."], ["Mean Absolute Error (MAE)", "Take the absolute size of every error and average them. For errors 2 and 4, MAE is (2 + 4) / 2 = 3. MAE is less dominated by a single outlier, although its sharp point at zero changes its optimization behaviour."], ["Cross-entropy", "For classification, cross-entropy examines the probability assigned to the correct class. A confident correct probability such as 0.9 receives a small penalty, while a confident wrong probability such as 0.1 receives a much larger penalty. Use logits-aware library functions when possible for numerical stability."], ["Loss is not the same as a metric", "The loss must supply useful gradients. A metric communicates performance in a form people care about, such as accuracy, recall or mean absolute error. Training may optimize one loss while reporting several metrics."]]
  },
  "backpropagation": {
    title: "How the final error reaches every weight in the network",
    opening: [
      "A neural network may contain thousands or millions of adjustable weights. After one wrong prediction, the model needs to know which weights contributed to the error. Backpropagation is the efficient procedure that calculates this responsibility from the output layer back toward the input.",
      "First, a forward pass produces a prediction and loss. The framework records the mathematical operations as a computation graph. Then the backward pass applies the chain rule, multiplying local derivatives along each path. Automatic differentiation performs this bookkeeping; backpropagation is the reverse process that uses it on the network."
    ],
    journey: "We will trace one prediction forward, send its gradient backward, and separate the roles of the computation graph, automatic differentiation, backpropagation and optimizer.",
    terms: [["Forward pass", "The calculation from input to prediction and loss."], ["Local derivative", "How one operation's output changes with its input."], ["Chain rule", "The rule for combining derivatives through connected operations."], ["Backward pass", "The reverse traversal that accumulates parameter gradients."], ["Optimizer", "The rule that uses gradients to update weights after backpropagation."]],
    sections: [["Forward first, backward second", "Backpropagation cannot start from nothing. The forward pass establishes concrete intermediate values and a final loss. Those saved values are needed to evaluate local derivatives during the reverse pass."], ["A graph of dependencies", "If y depends on z and z depends on w, then changing w can change y through z. The graph records that dependency. Branches matter because a parameter used in several places receives the sum of gradient contributions from every path."], ["What automatic differentiation does", "Modern frameworks build or trace the graph and know derivative rules for operations such as addition, multiplication and activation functions. Calling backward asks the framework to combine those rules. It does not remove the need to understand detached tensors, gradient clearing or non-differentiable choices."], ["What backpropagation does not do", "It does not choose the loss, learning rate or update rule, and it does not guarantee good learning. It only computes derivatives of the recorded loss with respect to the recorded parameters."]]
  },
  "neural-network-training-loop": {
    title: "The complete cycle that turns examples into learned weights",
    opening: [
      "Defining layers creates a model, but it does not teach the model. Learning happens in a repeated training loop. The loop takes a small batch of examples, makes predictions, measures the loss, calculates gradients and updates the weights. One pass through the entire training dataset is called an epoch.",
      "A correct loop also separates training from validation. Training data changes the weights; validation data measures how the current model behaves on examples it did not update from. Tracking both curves helps distinguish useful learning from memorization and exposes bugs that a single final accuracy number can hide."
    ],
    journey: "We will assemble the loop in its exact order, explain batches and epochs, read training curves, and use a short debugging checklist before changing the architecture.",
    terms: [["Batch", "A small group of examples used for one gradient calculation."], ["Iteration", "One pass through one batch and usually one optimizer update."], ["Epoch", "One complete pass through the training set."], ["Training mode", "The mode in which dropout and some normalization layers update or behave stochastically."], ["Validation", "Evaluation on held-out data without updating weights."]],
    sections: [["The order of operations", "Clear old gradients, run the forward pass, calculate loss, run the backward pass, and call the optimizer step. Reordering or omitting one of these actions can silently accumulate gradients or update from stale information."], ["Reading the curves", "Falling training and validation loss usually indicate useful learning. Falling training loss with rising validation loss suggests overfitting. Flat loss can indicate a bad learning rate, mismatched loss and output, broken labels, frozen parameters or an implementation error."], ["The tiny-data test", "Before tuning a large model, try to memorize 10–20 clean examples. If it cannot drive their loss very low, the problem is probably in the data path, model, loss, gradients or update logic—not insufficient regularization."], ["Validation must stay separate", "Do not augment validation examples randomly or let them participate in weight updates. Switch the model to evaluation mode and disable gradient recording to make validation both correct and efficient."]]
  },
  "deep-learning-optimizers": {
    title: "How gradients become careful changes to the weights",
    opening: [
      "A gradient points in the direction that would increase the loss most quickly. An optimizer moves the parameters in the opposite direction. The learning rate controls the size of that move. Too large a step can jump across a good solution; too small a step can make learning painfully slow.",
      "Stochastic Gradient Descent uses the current batch gradient. Momentum also remembers recent directions, helping movement continue through shallow regions and reducing side-to-side oscillation. Adam combines momentum-like averaging with a separate scale for each parameter. A schedule can then change the learning rate as training progresses."
    ],
    journey: "We will compare SGD, Momentum, RMSProp, Adam and AdamW on the same loss landscape, then see when warmup, decay and plateau-based schedules are useful.",
    terms: [["Learning rate", "The base size of a parameter update."], ["Momentum", "A moving memory of recent gradients that builds velocity."], ["Adaptive rate", "A parameter-specific step scale based on recent squared gradients."], ["Weight decay", "A regularizing pressure that discourages very large weights."], ["Scheduler", "A rule that changes the learning rate during training."]],
    sections: [["SGD and Momentum", "Plain SGD is simple and often generalizes well, but noisy gradients can zig-zag across a narrow valley. Momentum averages direction over time, so opposing sideways movements cancel while consistent forward movement grows."], ["RMSProp, Adam and AdamW", "RMSProp divides by a moving average of squared gradients, giving different parameters different effective steps. Adam adds a moving average of gradients. AdamW applies weight decay separately from the adaptive gradient update, which makes the regularization easier to reason about."], ["Learning-rate schedules", "Warmup begins with small steps while activations and optimizer statistics settle. Decay reduces the rate later for finer adjustment. Reduce-on-plateau reacts to a monitored validation value, while cosine and one-cycle schedules follow planned curves."], ["How to choose", "AdamW is a practical first baseline for many modern networks. SGD with momentum remains strong for many vision problems. Whichever optimizer you choose, compare validation results and tune the learning rate before assuming the optimizer name is the deciding factor."]]
  },
  "weight-initialization": {
    title: "Keeping signals and gradients healthy from the first training step",
    opening: [
      "Before training, a network's weights need starting values. Setting every weight to zero makes neurons in the same layer behave identically. Choosing random values carelessly can make signals shrink toward zero or grow without limit as they pass through many layers.",
      "Initialization, normalization and gradient control solve related but different parts of this problem. Xavier and He initialization scale starting weights using the number of connections. Normalization rescales intermediate activations during training. Residual connections and gradient clipping help information and gradients travel through deep models more safely."
    ],
    journey: "We will follow signal size through several layers, compare Xavier and He initialization, and distinguish BatchNorm, LayerNorm, GroupNorm, residual paths and gradient clipping.",
    terms: [["Fan-in", "The number of inputs entering a neuron."], ["Fan-out", "The number of outputs produced by a layer."], ["Activation variance", "How widely activation values are spread."], ["Vanishing gradient", "A gradient that becomes too small for early layers to learn."], ["Exploding gradient", "A gradient that becomes so large that updates become unstable."]],
    sections: [["Initialization must match the activation", "Xavier initialization is a common starting point for tanh-like activations because it balances fan-in and fan-out. He initialization uses a larger variance suited to ReLU, where many negative activations become zero."], ["Normalization methods use different groups", "BatchNorm computes statistics per channel across a mini-batch and spatial positions. LayerNorm works within each example and is common in transformers. GroupNorm divides image channels into groups and remains useful when batches are too small for reliable BatchNorm statistics."], ["Vanishing and exploding gradients", "Backpropagation repeatedly multiplies local derivatives. Values smaller than one can shrink the signal over many layers; large values can amplify it. Suitable activations, initialization, normalization, residual connections, gated sequence models and clipping address different causes."], ["Training and inference are not identical", "BatchNorm usually uses batch statistics during training and running estimates during inference. Forgetting to switch modes can make predictions inconsistent even though the saved weights are correct."]]
  },
  "deep-learning-regularization": {
    title: "Helping a powerful network learn patterns instead of memorising examples",
    opening: [
      "A deep network can fit its training examples extremely well, including accidental details that will not appear again. This is overfitting: training performance improves while performance on representative new data stops improving or becomes worse.",
      "Regularization is a family of methods that makes memorization less attractive. Dropout temporarily removes random activations, weight decay discourages very large weights, label smoothing softens absolute confidence, early stopping limits training, and ensembles average different model errors. The right choice is judged on validation data, not by training loss alone."
    ],
    journey: "We will diagnose overfitting from learning curves and compare dropout, weight decay, label smoothing, early stopping, distillation and ensembles by where they act.",
    terms: [["Generalization", "Useful performance on new data from the intended environment."], ["Overfitting", "Learning training-specific details that do not transfer."], ["Dropout", "Randomly setting some activations to zero during training."], ["Weight decay", "Penalising or shrinking large parameter values."], ["Calibration", "How closely predicted confidence matches observed correctness."]],
    sections: [["Dropout", "During each training pass, dropout hides a random subset of activations and scales those that remain. The network cannot rely on one fragile path. During inference all units are used, so correct train/evaluation mode is essential."], ["Weight decay and early stopping", "Weight decay prefers smaller weights throughout optimization. Early stopping saves the checkpoint with the best monitored validation performance rather than the final epoch. They control different aspects of complexity and can be used together."], ["Softer targets and transferred knowledge", "Label smoothing replaces a perfectly hard class target with a slightly softened distribution. Distillation trains a smaller student from a teacher's soft outputs. Both expose relationships beyond a single hard label, but distillation requires a trained teacher."], ["Ensembles and honest evaluation", "Averaging independently trained models can reduce variance, but multiplies inference cost. Always compare on untouched data that represents deployment conditions; a regularizer cannot fix leakage or an unrealistic validation split."]]
  },
  "data-augmentation-deep-learning": {
    title: "Creating useful training variety without changing the correct answer",
    opening: [
      "A model trained on a small set of photographs may treat camera angle, lighting or position as if they define the class. Data augmentation creates changed versions of training examples so the model sees more of the variation it will meet later.",
      "The central rule is simple but strict: the transformation must preserve the target. A horizontal flip may be safe for a cat photograph, unsafe for written text, and medically questionable for an X-ray with left/right meaning. Augmentation is therefore a statement about the real problem, not a decorative image effect."
    ],
    journey: "We will compare geometric, colour, noise and mixing transformations, see where they enter the data pipeline, and check whether each preserves the label.",
    terms: [["Transformation", "A rule that changes an input while intending to preserve its target."], ["Invariance", "A change the model should learn to ignore."], ["Crop", "Selecting a smaller region of an image."], ["Colour jitter", "Controlled changes to brightness, contrast or colour."], ["Mixup", "Combining two examples and their targets in chosen proportions."]],
    sections: [["Geometric transformations", "Flips, rotations, translations, crops and resizing change location or orientation. Their ranges should match realistic capture conditions; extreme rotations may create samples that never occur in production."], ["Appearance transformations", "Brightness, contrast, blur and noise can represent camera and environment changes. If colour itself defines the class, aggressive colour jitter may remove the evidence the model needs."], ["Training only", "Random augmentation normally belongs in the training pipeline. Validation and test data should use deterministic preprocessing so measurements remain comparable between runs."], ["Inspect before trusting", "Display augmented examples with their labels. This simple visual check catches clipped objects, unreadable text, empty crops and transformations that silently change the answer."]]
  },
  "cnn": {
    title: "How a Convolutional Neural Network learns to recognise what is inside an image",
    opening: [
      "Image classification asks a computer to look at one image and choose a label—for example cat, dog or bicycle. The computer begins only with pixel numbers. A Convolutional Neural Network, usually shortened to CNN, is a neural-network design that learns which local pixel patterns are useful for making that decision.",
      "A CNN does not search for a complete cat in one step. Early layers can respond to simple changes such as light-to-dark edges. Later layers combine nearby responses into corners, textures and shapes. Deeper layers combine those shapes into larger object parts. The final classifier uses the collected evidence to produce class scores."
    ],
    journey: "We will start with one 3 × 3 image patch, calculate a convolution by hand, then follow feature maps through activation, pooling and classification so every term has a visible purpose.",
    terms: [["Pixel", "One small image cell containing brightness or colour numbers."], ["Filter or kernel", "A small table of learnable numbers used to test one local pattern."], ["Convolution", "Sliding the filter across the image and calculating a response at each position."], ["Feature map", "The grid of responses showing where a learned pattern was found."], ["Pooling", "A down-sampling operation that keeps a summary of nearby responses."], ["Receptive field", "The part of the original image that can influence one later activation."]],
    sections: [["Why look at small regions?", "Useful visual evidence is local. The pixels forming an edge are close together, and the same edge may appear anywhere in the picture. A CNN reuses one filter at every position, so it can detect the same pattern near the top, centre or bottom without learning a separate detector for each location."], ["What the filter actually calculates", "Place the filter over an equally sized image patch. Multiply matching cells and add the products. A large positive response means the patch resembles the pattern represented by the filter; a negative or small response means it does not. During training, backpropagation learns the filter values."], ["From edges to an object label", "Convolution creates feature maps, an activation function keeps useful non-linearity, and pooling or stride can reduce spatial size. Stacking layers enlarges the receptive field, allowing later units to combine small clues into object parts. A final head converts those features into class scores."], ["Classification, detection and segmentation", "Classification gives one label for the whole image. Detection adds locations, usually boxes, for individual objects. Segmentation predicts a class for each pixel. They can share a CNN backbone but require different targets, heads and evaluation metrics."]]
  },
  "cnn-architectures-resnet": {
    title: "How CNN design evolved from deeper stacks to residual shortcuts",
    opening: [
      "Early CNNs established that learned filters could outperform hand-designed image features. As datasets and GPUs grew, researchers built deeper models to learn richer representations. Simply adding layers, however, made optimization harder and could even increase training error.",
      "AlexNet popularised large GPU-trained CNNs. VGG showed the value of repeatedly stacking small 3 × 3 filters. GoogLeNet processed several filter sizes in parallel. ResNet introduced skip connections that let information travel around a block, making very deep networks easier to train."
    ],
    journey: "We will compare the central design idea of AlexNet, VGG, GoogLeNet and ResNet, then trace information through one residual block.",
    terms: [["Architecture", "The planned arrangement of layers and connections."], ["Depth", "The number of learned layers along a path."], ["Inception module", "Parallel branches that process features at different scales."], ["Skip connection", "A path that carries an earlier activation around one or more layers."], ["Residual", "The transformation F(x) learned in addition to the original input x."]],
    sections: [["AlexNet", "AlexNet combined convolutions, ReLU, pooling, dropout and GPU training at ImageNet scale. Its importance is historical and architectural; modern systems rarely choose it as the strongest production backbone."], ["VGG and GoogLeNet", "VGG used a uniform stack of small filters, making the design easy to understand but computationally heavy. GoogLeNet's inception modules used parallel branches and 1 × 1 convolutions to capture several spatial scales more efficiently."], ["The ResNet idea", "A residual block learns F(x) and adds the unchanged input: output = F(x) + x. If extra transformation is not useful, the block can keep F(x) near zero and preserve x. This direct path also helps gradients travel backward."], ["Choosing a backbone", "Accuracy is only one factor. Parameter count, memory, latency, input resolution, available pretrained weights and deployment hardware often make a smaller modern architecture more useful than a famous larger one."]]
  },
  "object-detection": {
    title: "Moving from naming an image to locating every important object",
    opening: [
      "An image classifier answers one question: what is in this image? Many applications need a more precise answer. A traffic system must locate each vehicle; a medical system may need the exact outline of a region; an engineer may also want a rough view of which area influenced a classification.",
      "Object detection predicts a class and bounding box for each instance. Segmentation predicts labels at pixel level. Grad-CAM is different: it creates a coarse heatmap from a classifier's gradients and feature maps. A heatmap can support inspection, but it is not a verified object boundary or proof of reasoning."
    ],
    journey: "We will compare classification, detection, semantic segmentation, instance segmentation and Grad-CAM on the same scene, then examine their targets and metrics.",
    terms: [["Bounding box", "A rectangle represented by position and size around an object."], ["Intersection over Union", "Overlap between predicted and true regions divided by their union."], ["Semantic segmentation", "A class label for every pixel, without separating same-class instances."], ["Instance segmentation", "A separate pixel mask for every object instance."], ["Grad-CAM", "A coarse class-related heatmap produced from gradients and feature maps."]],
    sections: [["One-stage and two-stage detection", "Two-stage detectors first propose candidate regions and then classify/refine them. One-stage detectors predict boxes and classes more directly over a feature grid. The speed–accuracy balance depends on architecture, image size and deployment needs."], ["U-Net and DeepLab", "U-Net uses an encoder to gather context and a decoder to restore spatial detail, with skip connections carrying fine features across. DeepLab uses dilated convolutions and multi-scale context to produce dense semantic predictions."], ["Metrics match the output", "Detection commonly uses IoU and mean average precision across confidence and overlap thresholds. Segmentation uses pixel accuracy, Dice score or IoU. Plain image accuracy cannot tell whether an object was located correctly."], ["Use explanations carefully", "Grad-CAM can reveal that a model focused on a background watermark instead of the object. Its map is low resolution and method-dependent, so it should trigger investigation rather than serve as ground truth."]]
  },
  "vision-transformers": {
    title: "How a Transformer reads an image as a sequence of patches",
    opening: [
      "A Vision Transformer, or ViT, applies the Transformer idea to images. Instead of sliding a convolutional filter, it divides the image into fixed-size patches. Each patch is converted into a vector, given position information, and treated like a token in a sequence.",
      "Self-attention lets every patch compare itself with other patches, so the model can connect distant regions early. This global view is powerful, but standard attention becomes expensive as the number of patches grows. CNNs begin with a stronger assumption about local patterns and can be more data-efficient when training data is limited."
    ],
    journey: "We will turn one image into patch tokens, count the sequence length, follow the tokens through a Transformer encoder, and compare ViT with a CNN.",
    terms: [["Patch", "A small rectangular region cut from the image."], ["Patch embedding", "A learned vector representation of one flattened patch."], ["Position embedding", "Information added so the model knows where a patch came from."], ["Class token", "An optional learned token whose final representation is used for classification."], ["Self-attention", "A calculation that mixes information between all tokens using learned relevance scores."]],
    sections: [["Patch size controls the trade-off", "A 224 × 224 image split into 16 × 16 patches produces 14 × 14 = 196 patch tokens. Halving the patch size gives four times as many tokens and preserves more spatial detail, but attention needs much more memory and computation."], ["Inside the encoder", "Patch and position embeddings pass through repeated blocks containing multi-head self-attention, a feed-forward network, residual connections and LayerNorm. Attention mixes information across patches; the feed-forward part transforms each token independently."], ["ViT versus CNN", "CNN filters emphasise locality and reuse from the start. ViTs learn relationships more flexibly and often benefit from large-scale pretraining. Hybrid architectures combine convolutional feature extraction with attention."], ["Reading attention maps", "An attention map shows how one token weighted others in one head and layer. It can be useful for exploration, but it is not a complete explanation of the final prediction."]]
  },
  "rnn-lstm": {
    title: "How neural networks remember information that arrives in order",
    opening: [
      "Some data has an order that changes its meaning: words in a sentence, readings from a sensor, or notes in a melody. A basic feed-forward network treats its input as one fixed block. A Recurrent Neural Network processes one step at a time and carries a hidden state—a numerical summary of what it has read so far.",
      "Basic RNNs struggle when important evidence is many steps in the past because gradients can vanish or explode through repeated transitions. LSTMs and GRUs add gates that control what is remembered and forgotten. State-space models offer another way to carry a compact state across long sequences with efficient structured computation."
    ],
    journey: "We will unroll a sequence through time, inspect the hidden state, open the gates inside LSTM and GRU, and compare these recurrent models with modern state-space models.",
    terms: [["Sequence", "An ordered collection such as words, audio frames or daily readings."], ["Time step", "One position in the sequence."], ["Hidden state", "A learned running summary passed to the next step."], ["Gate", "A sigmoid-controlled path that decides how much information to keep or change."], ["BPTT", "Backpropagation through time: applying backpropagation to the unrolled sequence graph."]],
    sections: [["The basic RNN", "At each step the RNN combines the current input with the previous hidden state. The same weights are reused at every position. This supports variable-length sequences but also creates a long chain of derivative multiplications during training."], ["LSTM memory and gates", "The forget gate removes selected old information, the input gate controls new information, and the output gate decides what part of the cell state becomes visible. The cell path gives gradients a more stable route across time."], ["GRU", "A GRU combines the LSTM's input and forget behaviour into an update gate and uses a reset gate when forming candidate state. It has fewer parameters and is often faster, but neither GRU nor LSTM wins every dataset."], ["State-space models", "Modern state-space layers maintain a state using structured transitions that can be computed efficiently across long sequences. They offer a different trade-off from recurrence and attention; they do not make sequence evaluation or data quality less important."]]
  },
  "attention-transformers-deep-learning": {
    title: "How a model chooses the relevant parts of a sequence",
    opening: [
      "An encoder–decoder model can read one sequence and produce another, such as an English sentence and its Hindi translation. Compressing the entire input into one fixed vector makes long sequences difficult. Attention improves the process by letting each output step look back at the most relevant input representations.",
      "Transformers make attention the central operation. Self-attention allows each token to collect context from other tokens, while positional information preserves order. Because all input positions can be processed together during training, Transformers parallelise more efficiently than step-by-step RNNs."
    ],
    journey: "We will begin with an encoder and decoder, calculate one set of attention weights, and then assemble self-attention, multiple heads, positional information and masking into a Transformer block.",
    terms: [["Encoder", "The network that converts an input sequence into contextual representations."], ["Decoder", "The network that produces the output sequence step by step."], ["Query", "What the current token is looking for."], ["Key", "What each candidate token offers for matching."], ["Value", "The information collected after relevance weights are calculated."], ["Mask", "A rule that blocks attention to padding or future tokens."]],
    sections: [["Attention as a weighted lookup", "Compare one query with every key to get relevance scores, scale the scores, apply softmax so they sum to one, and use them to form a weighted mixture of the values. The result is a context vector tailored to that query."], ["Why several heads?", "Each attention head has separate learned projections and can capture a different relationship—nearby syntax, long-range reference, or another useful pattern. Head outputs are joined and transformed; a head is not guaranteed to have a simple human label."], ["The Transformer block", "A standard encoder block combines multi-head self-attention, a position-wise feed-forward network, residual connections and LayerNorm. Decoder blocks add causal masking and, in encoder–decoder models, cross-attention to encoder outputs."], ["Strengths and costs", "Transformers capture long-range context and train in parallel, but full attention compares every token pair and therefore grows quickly in memory and compute with sequence length."]]
  },
  "deep-learning-nlp": {
    title: "How text becomes numbers without losing all of its context",
    opening: [
      "Natural Language Processing, or NLP, covers tasks such as sentiment analysis, translation, question answering and text generation. Neural networks cannot calculate directly with words, so an NLP pipeline first turns text into tokens and then maps those token IDs to vectors called embeddings.",
      "Meaning depends on context. The word 'bank' differs in 'river bank' and 'bank account'; 'not boring' differs from 'boring'. CNNs, recurrent networks and Transformers combine token representations so the same token can contribute differently in different sentences."
    ],
    journey: "We will follow a sentence through cleaning, tokenization, embeddings, contextual modelling, pooling and prediction, while checking padding, truncation and class imbalance.",
    terms: [["Token", "A model vocabulary unit: a word, subword, character or symbol."], ["Token ID", "The integer assigned to a vocabulary token."], ["Embedding", "A learned dense vector used to represent a token."], ["Padding", "Extra placeholder tokens added so sequences in a batch share a length."], ["Attention mask", "A signal telling the model which positions are real tokens and which are padding."]],
    sections: [["Tokenization", "A tokenizer splits text according to a fixed vocabulary. Subword tokenization can represent unfamiliar words using known pieces. The exact tokenizer must travel with the model because a different ID mapping changes every input."], ["Static and contextual representations", "A basic embedding table gives one initial vector per token. A contextual model then changes that representation using surrounding tokens. This is how the same word can represent different meanings in different sentences."], ["Common task heads", "Sequence classification pools a sentence representation and predicts a label. Token classification predicts a label per token. Sequence generation predicts output tokens one at a time. Each task requires different target formatting and metrics."], ["Practical failures", "Performance can change with spelling, dialect, language, document length and domain. Check truncation, unknown or fragmented tokens, label imbalance, subgroup quality and whether private text is handled safely."]]
  },
  "autoencoders": {
    title: "Learning a compact representation by rebuilding the input",
    opening: [
      "An autoencoder receives an input and is trained to reconstruct that same input. The encoder compresses the data into a latent representation, and the decoder tries to rebuild the original. A bottleneck or another constraint prevents the network from simply copying every value without learning useful structure.",
      "Because labels are not required, autoencoders can learn from large unlabelled datasets. They are used for dimensionality reduction, denoising, representation learning and sometimes anomaly detection. Reconstruction alone, however, does not guarantee that the latent dimensions correspond to concepts people understand."
    ],
    journey: "We will follow data through encoder, bottleneck and decoder, calculate reconstruction loss, and compare basic, sparse, denoising and contractive variants.",
    terms: [["Encoder", "The part that maps the input to a compact code."], ["Latent representation", "The internal compressed code produced by the encoder."], ["Bottleneck", "A restricted layer that limits how much information can pass."], ["Decoder", "The part that reconstructs the input from the code."], ["Reconstruction loss", "The difference between original input and reconstruction."]],
    sections: [["A basic autoencoder", "The encoder reduces dimensions, the decoder expands them, and training minimises a reconstruction loss such as MSE or binary cross-entropy. If the network is too powerful relative to the constraint, it may learn an unhelpful near-identity mapping."], ["Sparse and denoising variants", "A sparse autoencoder penalises too many active latent units. A denoising autoencoder receives a corrupted input but must reproduce the clean target, forcing the representation to ignore the chosen noise."], ["Contractive autoencoder", "A contractive penalty discourages the latent code from changing sharply after a small input change. This can create locally stable representations, at the cost of more complex derivatives and tuning."], ["Anomaly detection caution", "Training on normal data may make unusual examples reconstruct poorly, but some anomalies are easy to reconstruct and some normal rare cases are not. Choose a threshold using labelled validation cases and monitor false alarms."]]
  },
  "transfer-learning": {
    title: "Reusing earlier learning when labelled data is limited",
    opening: [
      "Training a deep model from random weights can require a large labelled dataset and substantial computing time. Transfer learning begins with a model trained on a broad source task and adapts its learned representation to a related target task. Early image layers, for example, may already detect edges and textures useful for a new flower classifier.",
      "Self-supervised learning creates useful pretraining targets from unlabelled data, contrastive learning brings related views closer in representation space, and few-shot methods aim to adapt from very few labelled examples. These ideas belong together because they reduce dependence on a large new labelled dataset, but they achieve that goal in different ways."
    ],
    journey: "We will train a new classifier head, fine-tune selected layers, then compare supervised transfer, self-supervised contrastive pretraining, curriculum learning and few-shot adaptation.",
    terms: [["Pretrained model", "A model whose weights already learned from an earlier dataset or objective."], ["Backbone", "The feature-producing body of a model before its task-specific output head."], ["Freeze", "Prevent selected parameters from updating."], ["Fine-tune", "Continue training pretrained parameters, usually with a small learning rate."], ["Positive pair", "Two related views that contrastive learning should represent similarly."]],
    sections: [["Feature extraction", "Replace the original output head, freeze the backbone and train only the new head. This is fast and protects useful source features while establishing a baseline."], ["Fine-tuning", "Unfreeze some upper layers after the new head begins to work. Use a smaller learning rate and watch validation performance; updating everything aggressively can overwrite useful features, a problem called catastrophic forgetting."], ["Self-supervised and contrastive learning", "Self-supervised objectives obtain their teaching signal from the data itself. In contrastive image learning, two augmentations of the same image form a positive pair while other images form negatives. The chosen augmentations define what the representation learns to ignore."], ["Few-shot and curriculum learning", "Few-shot methods rely on a strong transferred or meta-learned representation; they do not learn from nothing. Curriculum learning orders examples from easier to harder when that order helps optimization. Always compare with a simple transfer-learning baseline."]]
  },
  "graph-neural-networks": {
    title: "Learning from both an item and the relationships around it",
    opening: [
      "Images form regular grids and text forms sequences, but many real systems are networks. In a social graph, people are nodes and friendships are edges. In a molecule, atoms are nodes and bonds are edges. A Graph Neural Network, or GNN, learns from node features together with this connection structure.",
      "Most GNNs use message passing. Each node collects information from its neighbours, combines those messages in an order-independent way, and updates its own representation. Repeating the process lets information travel farther through the graph."
    ],
    journey: "We will update one node from two neighbours, then distinguish node, edge and whole-graph predictions and examine what repeated message passing can and cannot capture.",
    terms: [["Node", "An entity such as a user, product, atom or paper."], ["Edge", "A relationship connecting two nodes."], ["Node feature", "The numerical information initially attached to a node."], ["Aggregation", "Combining neighbour messages, often with a sum, mean or maximum."], ["Message passing", "Repeated collect–aggregate–update steps over graph connections."]],
    sections: [["One message-passing layer", "A node gathers transformed features from its immediate neighbours, aggregates them and combines the result with its own feature. The same update rule is reused across the graph, allowing different graph sizes."], ["Prediction levels", "Node classification can label papers by topic. Link prediction can estimate whether two users will connect. Graph classification can predict a property of an entire molecule after pooling node representations into one graph vector."], ["Depth and over-smoothing", "Each added layer reaches neighbours one hop farther away. Too many layers can make node representations overly similar, while noisy or misleading edges spread unwanted information."], ["Graph construction matters", "A GNN cannot repair an arbitrary relationship definition automatically. Direction, edge type, missing links, sampling and leakage between train and test graphs must be treated as modelling decisions."]]
  },
  "pinn-kan-topological-networks": {
    title: "Advanced networks that include mathematical or structural knowledge",
    opening: [
      "Some problems contain more structure than ordinary rows, images or sequences. Engineers may know a differential equation even when measurements are sparse. Scientific data may live on meshes or higher-order relationships. Alternative network designs try to place this knowledge directly into the model or training objective.",
      "Physics-Informed Neural Networks, Kolmogorov–Arnold Networks and topological neural networks are not three versions of one method. PINNs add equation residuals to the loss. KANs replace fixed scalar activations on nodes with learnable functions on connections. Topological models pass information over structured objects such as nodes, edges and faces."
    ],
    journey: "We will identify the prior knowledge used by each family, inspect its computation, and decide when a simpler neural network remains the stronger baseline.",
    terms: [["Prior knowledge", "A known rule or structure introduced before learning from observations."], ["Differential equation", "An equation relating a quantity to rates of change."], ["Residual", "How far a candidate solution violates a required equation."], ["Learnable edge function", "A trainable one-dimensional function placed on a connection in a KAN."], ["Topology", "Connection structure that remains meaningful under continuous deformation."]],
    sections: [["Physics-Informed Neural Networks", "A PINN predicts a continuous field such as temperature. Automatic differentiation calculates derivatives of that prediction, and the loss combines observed-data error with the residual of the governing equation plus boundary or initial conditions."], ["Kolmogorov–Arnold Networks", "KAN layers learn flexible one-dimensional functions along edges and sum their outputs. They offer an alternative parameterisation with possible interpretability benefits, but training cost and empirical performance must be compared fairly with well-tuned MLPs."], ["Topological neural networks", "These models extend message passing beyond pairwise graph edges to higher-order structures such as triangles or cells. They are useful only when those structures meaningfully represent the domain."], ["A baseline-first rule", "Advanced structure is valuable when it matches the problem and improves measured outcomes. Start with a simpler model, define the evaluation and ablations, then test whether the added prior earns its complexity."]]
  },
  "saving-deploying-deep-models": {
    title: "Turning a trained network into a repeatable, monitored prediction service",
    opening: [
      "A model that works in a notebook is not yet a deployed system. The saved weights depend on an architecture, preprocessing rules, tensor shapes, data types and class labels. If any part changes, the same raw input can produce a different or invalid prediction.",
      "Deployment packages this complete prediction contract behind a stable interface. It also adds validation, latency limits, security, monitoring and rollback. The aim is not merely to load a file; it is to reproduce tested behaviour for real requests and notice when that behaviour changes."
    ],
    journey: "We will save and reload a checkpoint, package preprocessing and labels, design one inference request, and add golden tests, monitoring and rollback.",
    terms: [["Checkpoint", "Saved model parameters and often optimizer/training state."], ["Inference", "Using a trained model to make predictions without weight updates."], ["Model contract", "The required input, preprocessing, output and version definitions."], ["Golden test", "A fixed input with an expected output used to detect unintended changes."], ["Drift", "A change in real input or target patterns after deployment."]],
    sections: [["What to save", "Save weights together with architecture or configuration, tokenizer or transforms, label mapping, framework version and training metadata. Save optimizer state as well when training must resume exactly."], ["Safe inference", "Load on the intended device, switch to evaluation mode, disable gradients, validate shape and type, apply the identical preprocessing, and translate raw scores into documented outputs."], ["Serving choices", "Batch services suit offline high-throughput work; online APIs prioritise latency; edge deployment prioritises memory, power and privacy. Quantisation or compilation should be tested against the original model, not assumed equivalent."], ["Monitoring and rollback", "Track input validity, latency, errors, prediction distributions and delayed quality labels when available. Version every artifact and retain a known-good release so a regression can be rolled back quickly."]]
  }
};

export function DeepLearningArticleIntro({ topicId }: { topicId: string }) {
  const guide = guides[topicId];
  if (!guide) return null;
  const pageTitle = getTopicById(topicId)?.subtopic.title ?? guide.title;
  const [termsHeading, mapHeading, explanationHeading] = sectionHeadings[topicId] ?? ["Key Terms to Understand First", `How ${pageTitle} Fits Together`, `Understanding ${pageTitle}`];

  return (
    <>
      <section>
        <p className="text-lg text-slate-500 mb-6">{guide.title}</p>
        <div className="not-prose rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 md:p-8 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">The central idea</p>
          <p className="text-lg text-slate-700 leading-relaxed m-0">{guide.opening[0]}</p>
        </div>
        <p className="text-lg leading-relaxed">{guide.opening[1]}</p>
        <div className="not-prose mt-6 border-l-4 border-indigo-500 bg-indigo-50 px-5 py-4 rounded-r-xl">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-700 mb-1">What this lesson will do</p>
          <p className="text-slate-700 leading-relaxed">{guide.journey}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">{termsHeading}</h2>
        <p className="text-slate-700 leading-relaxed mb-4">These terms describe visible parts of the process below. Read their plain meanings first; the worked example will then make each one concrete.</p>
        <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-indigo-600 text-white"><tr><th className="p-3 text-left w-44">Term</th><th className="p-3 text-left">Plain meaning</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {guide.terms.map(([term, meaning]) => <tr key={term}><td className="p-3 font-bold text-slate-900">{term}</td><td className="p-3 text-slate-700 leading-relaxed">{meaning}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <figure className="not-prose">
        <figcaption className="text-sm font-semibold text-slate-600 text-center mb-4">{mapHeading}</figcaption>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-col md:flex-row items-stretch gap-2">
            {guide.sections.map(([title], index) => (
              <React.Fragment key={title}>
                <div className="flex-1 rounded-xl border border-indigo-200 bg-white p-4 text-center shadow-sm">
                  <span className="inline-flex w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold items-center justify-center mb-2">{index + 1}</span>
                  <p className="text-sm font-bold text-slate-900 leading-snug">{title}</p>
                </div>
                {index < guide.sections.length - 1 && <div className="flex items-center justify-center text-indigo-400 text-xl font-bold rotate-90 md:rotate-0" aria-hidden="true">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </figure>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">{explanationHeading}</h2>
        <div className="space-y-6">
          {guide.sections.map(([title, body], index) => (
            <div key={title} className="grid md:grid-cols-[48px_1fr] gap-3 md:gap-5 items-start">
              <div className="not-prose w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">{index + 1}</div>
              <div><h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3><p className="text-slate-700 leading-relaxed m-0">{body}</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
