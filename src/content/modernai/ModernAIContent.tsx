import React from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, FlaskConical, Lightbulb, Target, Workflow } from "lucide-react";
import { getTopicById } from "../../data/curriculum";
import { DeepLearningIllustratedExample } from "../deeplearning/DeepLearningIllustratedExample";
import { DeepLearningOptimizersGuide } from "../deeplearning/DeepLearningOptimizersGuide";
import { DeepLearningArticleIntro } from "../deeplearning/DeepLearningArticleIntro";
import { DeepLearningLessonExtras } from "../deeplearning/DeepLearningLessonExtras";
import { DeepLearningMathExample } from "../deeplearning/DeepLearningMathExample";
import { AgenticAIContent } from "./AgenticAIContent";

type Lesson = {
  intro: string;
  analogy: string;
  steps: string[];
  exampleTitle: string;
  example: string;
  code: string;
  codeLanguage?: string;
  mistake: string;
  takeaway: string;
};

const lessons: Record<string, Lesson> = {
  "activation-functions": {
    intro: "An activation function decides how strongly a neuron should respond. Without activation functions, even a network with many layers would behave like one simple linear equation.",
    analogy: "Think of a light controlled by a dimmer. The weighted input is the electricity arriving at the switch; the activation function decides whether the light stays off, turns on fully, or glows somewhere in between.",
    steps: ["A neuron receives numbers from the previous layer.", "It multiplies them by weights and adds a bias.", "The activation function transforms that result.", "The transformed value becomes input for the next layer."],
    exampleTitle: "ReLU with a tiny batch",
    example: "ReLU means max(0, x). For inputs [-3, 0.5, 4], its outputs are [0, 0.5, 4]. Negative signals are blocked; positive signals pass through.",
    code: `import numpy as np\n\ndef relu(x):\n    return np.maximum(0, x)\n\nx = np.array([-3.0, 0.5, 4.0])\nprint(relu(x))  # [0.  0.5 4. ]`,
    mistake: "Using sigmoid in every hidden layer can make gradients extremely small. ReLU or one of its variants is usually a better starting point for hidden layers.",
    takeaway: "Use ReLU for a simple default, sigmoid for binary probabilities, and softmax when choosing one class from many classes."
  },
  backpropagation: {
    intro: "Backpropagation is the method a neural network uses to discover which weights caused an error. It sends the error backward through the network and calculates a gradient for every trainable parameter.",
    analogy: "If a cake tastes too sweet, you trace the result backward through the recipe. Sugar had the largest effect, so you reduce it most. Backpropagation assigns that kind of responsibility to each weight.",
    steps: ["Run a forward pass to make a prediction.", "Compare the prediction with the correct answer using a loss function.", "Use the chain rule to calculate gradients from output to input.", "Let an optimizer move each weight in the direction that reduces loss."],
    exampleTitle: "One weight, one correction",
    example: "Suppose prediction = weight × input. With weight 2, input 3, and target 9, the prediction is 6. The squared error says the weight should increase; gradient descent nudges it toward 3.",
    code: `weight, x, target = 2.0, 3.0, 9.0\nlearning_rate = 0.01\n\nfor _ in range(20):\n    prediction = weight * x\n    gradient = 2 * (prediction - target) * x\n    weight -= learning_rate * gradient\n\nprint(round(weight, 2))  # close to 3.0`,
    mistake: "Backpropagation is not the optimizer. It calculates gradients; SGD or Adam uses those gradients to update parameters.",
    takeaway: "Forward pass predicts, loss measures the error, backpropagation finds responsibility, and the optimizer applies the correction."
  },
  cnn: {
    intro: "A Convolutional Neural Network learns small visual patterns such as edges and textures, then combines them into larger patterns such as eyes, wheels, or entire objects.",
    analogy: "Instead of examining a whole photograph at once, imagine sliding a small magnifying glass across it. The same detector is reused everywhere, which makes CNNs efficient and good at recognizing a feature wherever it appears.",
    steps: ["A filter slides across the image.", "At each position it calculates how well the local pixels match a learned pattern.", "Activation maps record where patterns were found.", "Deeper layers combine simple patterns into meaningful objects."],
    exampleTitle: "Detecting handwritten digits",
    example: "Early filters find horizontal and vertical strokes. Later layers combine strokes into curves and loops. The final layer converts those learned features into probabilities for digits 0 through 9.",
    code: `from tensorflow.keras import Sequential\nfrom tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense\n\nmodel = Sequential([\n    Conv2D(32, 3, activation="relu", input_shape=(28, 28, 1)),\n    MaxPooling2D(),\n    Flatten(),\n    Dense(10, activation="softmax")\n])`,
    mistake: "A CNN does not understand an image like a person. It learns statistical pixel patterns and can fail when lighting, viewpoint, or data distribution changes.",
    takeaway: "CNNs reuse small filters across an image, making them excellent feature learners for images and other grid-like data."
  },
  "rnn-lstm": {
    intro: "Recurrent Neural Networks process a sequence one item at a time while carrying a hidden state—a small summary of what they have seen. LSTMs add gates that help preserve useful information for longer.",
    analogy: "Reading a sentence word by word only works if you remember earlier words. The hidden state is a running note; LSTM gates decide what to write, keep, and erase.",
    steps: ["Read the current item in the sequence.", "Combine it with the previous hidden state.", "Produce a new hidden state and possibly an output.", "Repeat until the sequence ends."],
    exampleTitle: "Predicting the next word",
    example: "After reading “The clouds became dark, so I carried an”, the remembered context makes “umbrella” much more likely than “sandwich”.",
    code: `from tensorflow.keras import Sequential\nfrom tensorflow.keras.layers import Embedding, LSTM, Dense\n\nmodel = Sequential([\n    Embedding(input_dim=10000, output_dim=64),\n    LSTM(128),\n    Dense(10000, activation="softmax")\n])`,
    mistake: "RNNs and LSTMs are still useful, but transformers train more efficiently on long sequences and dominate most modern language systems.",
    takeaway: "RNNs carry context through time; LSTMs use gates to remember important context and forget noise."
  },
  "transfer-learning": {
    intro: "Transfer learning starts with a model that already learned useful patterns on a large dataset, then adapts it to a smaller, related task.",
    analogy: "A pianist learning guitar does not restart music education from zero. Rhythm, melody, and practice habits transfer. A pretrained vision model similarly transfers knowledge about edges, shapes, and textures.",
    steps: ["Choose a pretrained model close to your task.", "Replace its original output layer.", "Freeze most pretrained layers and train the new head.", "Optionally unfreeze a few layers and fine-tune with a small learning rate."],
    exampleTitle: "Cats versus dogs with little data",
    example: "A model trained on millions of general images already recognizes fur, ears, curves, and eyes. You only need to teach its final layer how those features separate cats from dogs.",
    code: `import tensorflow as tf\n\nbase = tf.keras.applications.MobileNetV2(\n    include_top=False, weights="imagenet", pooling="avg"\n)\nbase.trainable = False\nmodel = tf.keras.Sequential([base, tf.keras.layers.Dense(1, activation="sigmoid")])`,
    mistake: "Fine-tuning every layer immediately can destroy useful pretrained features, especially when the new dataset is small.",
    takeaway: "Transfer learning saves data, time, and compute by reusing general knowledge before learning task-specific details."
  },
  autoencoders: {
    intro: "An autoencoder learns to compress data into a smaller representation and then reconstruct the original data from that compressed code.",
    analogy: "It is like summarizing a long story onto a note card, then trying to retell the story from the note. To succeed, the note must preserve the most useful information.",
    steps: ["The encoder compresses the input into a latent vector.", "The bottleneck forces the model to keep only useful structure.", "The decoder reconstructs the input.", "Training minimizes the difference between input and reconstruction."],
    exampleTitle: "Finding unusual transactions",
    example: "Train an autoencoder only on normal transactions. It reconstructs familiar patterns well, but unusual fraud-like transactions produce a large reconstruction error and can be flagged.",
    code: `from tensorflow.keras import Sequential\nfrom tensorflow.keras.layers import Dense\n\nautoencoder = Sequential([\n    Dense(16, activation="relu", input_shape=(50,)),\n    Dense(4, activation="relu"),       # bottleneck\n    Dense(16, activation="relu"),\n    Dense(50, activation="sigmoid")\n])\nautoencoder.compile(optimizer="adam", loss="mse")`,
    mistake: "The latent dimensions are learned features, but they are not automatically meaningful or independent to humans.",
    takeaway: "Autoencoders learn compact representations by practicing reconstruction without requiring class labels."
  },
  "generative-ai-intro": {
    intro: "Generative AI learns patterns in existing data and uses those patterns to create new text, images, audio, video, or code. It generates likely content; it does not copy a stored answer word for word.",
    analogy: "A musician studies thousands of songs and learns rhythm, harmony, and structure. When composing, they create a new song from those learned patterns rather than selecting one song from a database.",
    steps: ["Collect and prepare examples.", "Train a model to learn the data distribution.", "Give the model a prompt or starting signal.", "Sample an output and check it for quality, safety, and accuracy."],
    exampleTitle: "Writing a product description",
    example: "Prompt: “Write a friendly two-sentence description for a reusable steel water bottle.” The model predicts one suitable token after another until it forms a complete response.",
    code: `prompt = "Write a friendly description for a reusable steel bottle"\n\n# Conceptual generation loop\ntext = prompt\nwhile not finished(text):\n    probabilities = model.predict_next_token(text)\n    text += sample(probabilities, temperature=0.7)`,
    mistake: "Fluent output is not proof of truth. Generative models can confidently produce incorrect facts and must be verified for important uses.",
    takeaway: "Generative AI creates new samples from learned patterns; humans still need to guide, evaluate, and verify the result."
  },
  "generative-vs-discriminative": {
    intro: "A discriminative model learns how to separate labels. A generative model learns how data is formed, which lets it create new samples.",
    analogy: "A discriminative chef tastes a dish and says “soup or curry.” A generative chef learns the recipe well enough to cook a new soup or curry.",
    steps: ["Discriminative: input data and predict a label or value.", "Generative: model the patterns or probability of the data itself.", "Choose based on whether the goal is deciding or creating."],
    exampleTitle: "Email classification versus creation",
    example: "A spam classifier predicts spam/not-spam: discriminative. A language model writes a new email: generative. One judges an existing sample; the other produces a sample.",
    code: `# Discriminative\nlabel = spam_classifier.predict(email)\n\n# Generative\nnew_email = language_model.generate(\n    "Write a polite meeting reminder"\n)`,
    mistake: "The categories can overlap. A large generative model can also perform classification when prompted to output a label.",
    takeaway: "Discriminative models learn boundaries; generative models learn enough structure to create."
  },
  gans: {
    intro: "A GAN trains two neural networks together: a generator creates fake samples and a discriminator tries to detect them. Each network improves by competing with the other.",
    analogy: "Imagine a counterfeiter and a detective. Better counterfeits train a sharper detective; a sharper detective forces the counterfeiter to improve.",
    steps: ["Sample random noise.", "The generator turns noise into a fake sample.", "The discriminator compares real and fake samples.", "Update both networks, then repeat the game."],
    exampleTitle: "Generating handwritten digits",
    example: "The generator first makes random blobs. After many rounds, the discriminator’s feedback pushes those blobs toward realistic loops and strokes that resemble handwritten numbers.",
    code: `# Simplified training idea\nfor real_images in loader:\n    noise = sample_noise(batch_size)\n    fake_images = generator(noise)\n    train(discriminator, real_images, label=1)\n    train(discriminator, fake_images.detach(), label=0)\n    train(generator, noise, target_label=1)`,
    mistake: "GAN training can be unstable. Mode collapse happens when the generator produces only a narrow variety of convincing outputs.",
    takeaway: "GANs learn through competition: the generator tries to fool a discriminator that is learning to spot fakes."
  },
  vae: {
    intro: "A Variational Autoencoder compresses data into a smooth probability space, then samples from that space to generate new examples.",
    analogy: "Instead of assigning every face one exact address, a VAE creates neighborhoods: smiling faces may live near one another and glasses may form another direction. Sampling nearby addresses produces related new faces.",
    steps: ["Encode an input into a mean and spread.", "Sample a latent point using those values.", "Decode the point into a reconstruction.", "Balance reconstruction quality with a smooth, organized latent space."],
    exampleTitle: "Blending two styles",
    example: "Encode two shoe images, interpolate between their latent vectors, and decode the intermediate points. The generated shoes gradually change shape and style.",
    code: `# Reparameterization trick\nmu, log_var = encoder(x)\nepsilon = torch.randn_like(mu)\nz = mu + torch.exp(0.5 * log_var) * epsilon\nreconstruction = decoder(z)\nloss = reconstruction_loss(reconstruction, x) + kl_loss(mu, log_var)`,
    mistake: "A VAE is not simply a normal autoencoder with random noise. Its probability constraint is what makes the latent space suitable for sampling.",
    takeaway: "VAEs trade some sharpness for a smooth, controllable latent space that supports generation and interpolation."
  },
  "diffusion-models": {
    intro: "A diffusion model learns to reverse a gradual noising process. Generation starts from random noise and repeatedly removes predicted noise until a clear sample appears.",
    analogy: "Imagine learning to restore a picture covered by many thin layers of static. If you can remove one layer at a time, you can start with pure static and build a new picture.",
    steps: ["Add known amounts of noise to training images.", "Train a network to predict the noise at each step.", "Begin generation with random noise.", "Repeatedly subtract predicted noise, guided by the prompt."],
    exampleTitle: "Text-to-image generation",
    example: "For “a tiny robot watering a plant,” the text representation guides every denoising step so random pixels gradually become a robot, watering can, and plant arranged coherently.",
    code: `image = random_noise()\nfor timestep in reversed(range(num_steps)):\n    predicted_noise = model(image, timestep, text_embedding)\n    image = scheduler.remove_noise(image, predicted_noise, timestep)\nsave(image)`,
    mistake: "The model does not uncover one hidden picture inside the initial noise. Each denoising decision probabilistically constructs an output.",
    takeaway: "Diffusion generation is iterative refinement: start with noise, predict what to remove, and repeat."
  },
  "responsible-generative-ai": {
    intro: "Responsible Generative AI means designing the entire system—not only the model—to reduce harm, protect data, respect ownership, and make limitations clear.",
    analogy: "A powerful kitchen appliance needs safe ingredients, guards, instructions, and supervision. Model safety similarly needs controls before, during, and after generation.",
    steps: ["Define allowed and disallowed uses.", "Check training, prompt, and retrieved data for privacy and rights.", "Filter inputs and outputs where appropriate.", "Test harms with diverse users and monitor production incidents."],
    exampleTitle: "A support-answer assistant",
    example: "The assistant cites approved help-center sources, hides personal identifiers from logs, refuses requests for another customer’s data, and offers human escalation when uncertain.",
    code: `def safe_answer(question):\n    clean_question = remove_personal_data(question)\n    if violates_policy(clean_question):\n        return "I can't help with that request."\n    answer, sources = grounded_generate(clean_question)\n    return verify_and_attach_citations(answer, sources)`,
    mistake: "A disclaimer alone is not a safety system. Controls, evaluation, monitoring, and clear ownership are required.",
    takeaway: "Responsible AI is a continuous engineering process across data, model behavior, user experience, and operations."
  },
  "llm-intro": {
    intro: "A Large Language Model is a neural network trained to predict tokens. By repeating next-token prediction at enormous scale, it learns useful patterns in language, code, facts, and reasoning demonstrations.",
    analogy: "It is an extremely advanced autocomplete. The difference is scale: it considers a long context and has learned billions of relationships from training examples.",
    steps: ["Split text into tokens.", "Convert tokens into vectors.", "Use transformer layers to mix relevant context.", "Predict probabilities for the next token and repeat."],
    exampleTitle: "Completing a simple sentence",
    example: "Given “The capital of France is”, the model assigns high probability to “Paris.” It then treats the chosen token as part of the context for the next prediction.",
    code: `tokens = tokenizer.encode("The capital of France is")\nfor _ in range(10):\n    logits = model(tokens)\n    next_token = sample(softmax(logits[-1]))\n    tokens.append(next_token)\nprint(tokenizer.decode(tokens))`,
    mistake: "An LLM is not a searchable database and does not retrieve a source for every statement. Its knowledge is encoded imperfectly in learned parameters.",
    takeaway: "LLMs generate language one token at a time using transformer-based context and learned probability patterns."
  },
  "tokenization-embeddings": {
    intro: "Tokenization turns text into model-sized pieces. Embeddings turn those token IDs into vectors whose directions and distances can represent learned relationships.",
    analogy: "Tokenization assigns pieces of language library-card numbers. Embeddings place the corresponding books on a giant map where related ideas tend to be nearby.",
    steps: ["Normalize and split text into tokens.", "Look up an integer ID for each token.", "Map each ID to a learned vector.", "Add position information so word order is not lost."],
    exampleTitle: "Why token count differs from word count",
    example: "“unbelievable” may be one token in one tokenizer and several pieces such as “un”, “believ”, “able” in another. Models charge and limit context by tokens, not words.",
    code: `from transformers import AutoTokenizer\n\ntok = AutoTokenizer.from_pretrained("bert-base-uncased")\ntext = "Embeddings turn text into numbers."\nprint(tok.tokenize(text))\nprint(tok(text)["input_ids"])`,
    mistake: "Embedding similarity means statistical relatedness, not guaranteed truth or identical meaning.",
    takeaway: "Tokens are the model’s text units; embeddings are the numerical representations the network can process."
  },
  "transformers-attention": {
    intro: "A transformer processes tokens in parallel and uses attention to decide which earlier tokens matter for understanding each token.",
    analogy: "While reading “The trophy did not fit in the suitcase because it was too big,” you connect “it” to “trophy.” Attention learns weighted connections like this across the context.",
    steps: ["Create query, key, and value vectors for every token.", "Compare each query with keys to calculate relevance scores.", "Normalize scores into attention weights.", "Mix value vectors according to those weights, then pass through feed-forward layers."],
    exampleTitle: "Attention as a weighted lookup",
    example: "If attention weights for three words are [0.1, 0.8, 0.1], the middle word contributes most to the new representation. Multiple heads can learn different relationships at once.",
    code: `import torch\n\nQ, K, V = queries, keys, values\nscores = Q @ K.transpose(-2, -1) / (Q.size(-1) ** 0.5)\nweights = torch.softmax(scores, dim=-1)\ncontext = weights @ V`,
    mistake: "Attention weights can be informative, but they are not a complete or reliable explanation of why a model produced an answer.",
    takeaway: "Attention lets every token build a context-aware representation by taking a weighted mixture of other tokens."
  },
  "pretraining-finetuning": {
    intro: "Pretraining teaches a general model from vast data. Fine-tuning continues training on a smaller, focused dataset so the model follows a desired style, task, or behavior.",
    analogy: "Medical school provides broad knowledge; specialist training adapts that foundation to cardiology. Fine-tuning specializes without relearning language from scratch.",
    steps: ["Pretrain a foundation model on broad data.", "Prepare high-quality task examples.", "Update all weights or small adapter layers.", "Evaluate both task improvement and unwanted regressions."],
    exampleTitle: "Adapting a model to support tickets",
    example: "Train on pairs of customer questions and approved responses. The model learns company tone and answer format, while product facts that change frequently should still come from retrieval.",
    code: `# Conceptual supervised fine-tuning record\nexample = {\n  "messages": [\n    {"role": "user", "content": "How do I reset my password?"},\n    {"role": "assistant", "content": "Open Settings → Security..."}\n  ]\n}`,
    mistake: "Fine-tuning is not the best way to inject frequently changing facts. Use retrieval for changing knowledge and fine-tuning for behavior or style.",
    takeaway: "Pretraining builds broad capability; fine-tuning efficiently specializes behavior using curated examples."
  },
  "prompt-engineering": {
    intro: "Prompt engineering is the practice of giving a model clear instructions, relevant context, constraints, and an output format so it can reliably perform a task.",
    analogy: "“Cook something” leaves many choices. “Make a vegetarian dinner for two in 20 minutes using rice and spinach; return ingredients then steps” is much easier to execute well.",
    steps: ["State the task and audience.", "Provide only relevant context.", "Specify constraints and a concrete output format.", "Add examples when the pattern is hard to describe, then test edge cases."],
    exampleTitle: "A better extraction prompt",
    example: "Instead of “Read this invoice,” ask for JSON with invoice_number, date, currency, and total, define null behavior, and include the invoice text inside clear delimiters.",
    code: `prompt = f"""Extract invoice details from <document>.\nReturn JSON: invoice_number, date, currency, total.\nUse null when a value is missing. Do not guess.\n<document>{invoice_text}</document>"""`,
    mistake: "Longer prompts are not automatically better. Extra rules can conflict, hide the main instruction, and increase cost.",
    takeaway: "Good prompts reduce ambiguity: task, context, constraints, format, and examples should all serve a clear purpose."
  },
  rag: {
    intro: "Retrieval-Augmented Generation first finds relevant documents, then gives those documents to an LLM as evidence for its answer.",
    analogy: "It turns a closed-book exam into an open-book exam. The model still writes the answer, but it can consult selected pages instead of relying only on memory.",
    steps: ["Split documents into useful chunks.", "Create embeddings and store them in a searchable index.", "Retrieve chunks related to the user’s question.", "Generate an answer grounded in those chunks and return citations."],
    exampleTitle: "Answering from an employee handbook",
    example: "For “How many parental-leave weeks do we offer?”, search the latest policy chunks, pass the best matches to the model, and require an answer that cites the policy page.",
    code: `question = "What is our parental leave policy?"\nquery_vector = embed(question)\nchunks = vector_store.search(query_vector, top_k=4)\nanswer = llm.generate(\n    question=question, context=chunks,\n    instruction="Answer only from context and cite sources."\n)`,
    mistake: "RAG does not guarantee correctness. Poor chunking, retrieval, permissions, or instructions can still produce wrong or leaked answers.",
    takeaway: "RAG connects an LLM to current, private, and citable knowledge without retraining the model."
  },
  "llm-evaluation": {
    intro: "LLM evaluation measures whether an application is helpful, correct, safe, fast, and affordable on the cases that matter to real users.",
    analogy: "Testing only one perfect driving route cannot certify a car. You need highways, rain, traffic, emergencies, and repeated measurements. LLM apps need similarly varied test sets.",
    steps: ["Turn real use cases and failures into a versioned test set.", "Define measurable pass criteria and rubrics.", "Combine code checks, model-based graders, and human review.", "Track quality, latency, and cost before every release and in production."],
    exampleTitle: "Evaluating a RAG answer",
    example: "Check that the answer contains the correct policy value, every factual claim is supported by retrieved text, the cited document is allowed, and the response finishes within the latency target.",
    code: `def evaluate(case, response):\n    return {\n        "has_answer": case.expected in response.text,\n        "grounded": all_claims_supported(response, case.sources),\n        "safe": policy_check(response.text),\n        "latency_ok": response.latency_ms < 2500,\n    }`,
    mistake: "A single average score hides important failures. Break results down by task, language, user group, risk, and failure type.",
    takeaway: "Reliable LLM products improve through repeatable evaluations built from real tasks and real failures."
  },
  "llm-hallucinations-safety": {
    intro: "A hallucination is plausible-sounding content that is unsupported or incorrect. Guardrails reduce risk by constraining inputs, data access, tool use, and outputs.",
    analogy: "A confident tour guide may invent an answer rather than say “I don’t know.” Giving the guide a verified handbook, citation rules, and an escalation path reduces that risk.",
    steps: ["Identify high-risk claims and actions.", "Ground answers in trusted data and require citations.", "Validate structured outputs and tool arguments.", "Allow abstention, human approval, and production monitoring."],
    exampleTitle: "A medical-information assistant",
    example: "It retrieves approved health content, never diagnoses, highlights emergency symptoms using deterministic rules, and directs users to a clinician when evidence is missing.",
    code: `answer = generate_with_sources(question)\nif not citations_support(answer.claims):\n    return "I don't have enough reliable information to answer."\nif is_high_risk_action(answer):\n    return request_human_review(answer)\nreturn answer`,
    mistake: "Telling a model “never hallucinate” is not sufficient. Safety requires architecture, validation, permissions, evaluation, and monitoring.",
    takeaway: "Treat model output as untrusted until grounded, validated, and authorized for the level of risk involved."
  },
  "agentic-ai-intro": {
    intro: "Agentic AI combines a model with instructions, tools, context, memory, state, and guardrails so the system can work toward a goal across several steps. Unlike an ordinary chatbot that normally returns one response, an agent can decide what to do next, act through approved tools, inspect the result, and continue or stop. A workflow follows developer-defined steps; an agent is used only where the next step must be chosen from changing, open-ended information.",
    analogy: "A fixed railway timetable resembles a workflow because its route is decided in advance. A travel assistant resembles an agent when it can compare changing options, choose another search after seeing a result, and ask for approval before booking. The assistant is still limited by its job instructions, available tools, permissions, budget, and stopping rules.",
    steps: ["Receive a goal, trusted instructions, and the current context or state.", "Decide the next safe action: answer, use a tool, ask for clarification, or stop.", "Execute an approved tool and treat its result as a new observation.", "Update state, check progress, and repeat only while the goal remains unfinished and budgets allow.", "Vary the design only as needed: a reflex-style agent reacts, a stateful agent remembers the environment, and a goal- or utility-based agent compares possible outcomes.", "Prefer ordinary code or a fixed workflow when the rules and branches are already known; autonomy is useful only when flexibility justifies its extra cost and risk."],
    exampleTitle: "Choosing the right amount of autonomy for a support request",
    example: "Code can validate required ticket fields, and a fixed workflow can enforce refund limits. An agent is useful only for the ambiguous middle: it may inspect the order, search the relevant policy, ask for missing evidence, and propose a resolution. A high-value refund still pauses for human approval.",
    code: `agent = {\n    "instructions": support_policy,\n    "tools": [get_order, search_policy],\n    "state": {"goal": ticket, "steps": 0},\n    "limits": {"max_steps": 6, "can_issue_refund": False},\n}\n\nwhile not goal_complete(agent["state"]):\n    decision = model.choose_next_action(agent)\n    if decision.requires_approval:\n        return request_human_review(decision)\n    observation = execute_validated(decision, agent["tools"])\n    agent["state"] = update_state(agent["state"], observation)`,
    mistake: "Do not label every chatbot or automation as an agent. If a reliable fixed sequence can solve the task, adding model-directed decisions creates unnecessary cost, latency, and failure paths.",
    takeaway: "An agent is a bounded goal-directed loop: decide, act through permitted tools, observe, update state, and stop. Use the least autonomous design that can solve the real problem."
  },
  "tool-calling": {
    intro: "Tool calling lets a model propose a named function and structured arguments. The model does not execute the function itself: trusted application code validates the proposal, checks authorization, runs the tool, and returns a compact success or error result as the next observation. Reliable tool design makes that boundary explicit.",
    analogy: "The model is a receptionist completing a clearly labelled service form. A read-only form can request one authorized record; an action form may change something and needs stronger checks. The receptionist never enters the records room—trusted software validates the form and performs only the permitted operation.",
    steps: ["Give each tool one narrow purpose, a precise name and description, and a typed input schema.", "Let the model select a tool and propose arguments; do not treat the proposal as permission.", "Validate identity, authorization, schema, ranges, rate limits, and whether the tool reads data or causes a side effect.", "Execute with least privilege, timeouts, and predictable structured success or error results.", "Return only the useful observation so the model can decide whether to answer, retry safely, choose another tool, or stop.", "For payments, messages, and other side effects, use an idempotency key so a retry cannot repeat a completed action."],
    exampleTitle: "Looking up an order without risking a duplicate refund",
    example: "A lookup tool accepts only an order ID owned by the signed-in user and returns a compact status. A separate refund tool requires authorization, an amount limit, approval where needed, and the task ID as an idempotency key. If a timeout causes a retry, the service returns the original result instead of paying twice.",
    code: `refund_schema = {\n    "name": "refund_order",\n    "description": "Refund one order owned by the signed-in user",\n    "parameters": {\n        "type": "object",\n        "properties": {\n            "order_id": {"type": "string"},\n            "amount": {"type": "number", "minimum": 0},\n        },\n        "required": ["order_id", "amount"],\n        "additionalProperties": False,\n    },\n}\n\ndef execute_tool(call, user, task_id):\n    validate_schema(call, refund_schema)\n    authorize(user, call["name"], call["arguments"]["order_id"])\n    enforce_refund_limit(call["arguments"]["amount"])\n    return run_with_timeout(call, idempotency_key=task_id)`,
    mistake: "Never execute model-generated arguments without validation, and never retry every failed write blindly. Broad tools and ambiguous errors can leak data, hide partial success, or duplicate emails, purchases, and payments.",
    takeaway: "The model proposes; trusted code authorizes and executes. Narrow schemas, least privilege, structured errors, bounded retries, and idempotency make tools dependable."
  },
  "agent-memory": {
    intro: "Agent memory is information deliberately saved for later use. Short-term or session memory supports the current conversation; durable memory can preserve approved facts across sessions. Memory is not the model's weights, and it is not automatically everything in the current context—the application chooses what to write, retrieve, update, and delete.",
    analogy: "A desk has working notes for today's task, a diary of past events, a reference notebook of facts and preferences, and a procedure manual. These resemble short-term, episodic, semantic, and procedural memory, and each needs its own relevance, privacy, and retention rules.",
    steps: ["Keep immediate messages and temporary task facts in short-term memory; keep durable task checkpoints mainly in the long-running-agent system.", "Apply a write policy: save only information that will be useful later and that the user or policy allows you to retain.", "Apply a recall policy: retrieve a few relevant memories instead of replaying everything, using semantic search when meaning-based lookup helps.", "Update, version, or delete stale and conflicting memories, and record where important facts came from.", "Protect stored information with authorization, privacy controls, retention limits, and user-visible correction or deletion."],
    exampleTitle: "A study-planning agent",
    example: "During the session it remembers which quiz is active. Across sessions it may remember an approved preference like “use 20-minute lessons,” but should not silently store sensitive personal details.",
    code: `memory = {\n  "working": recent_messages[-8:],\n  "task_state": {"lesson": 4, "quiz_score": 7},\n  "retrieved": search_memories(user_id, current_goal)\n}\nresponse = agent.run(goal, memory=memory)`,
    mistake: "More memory is not always better. Irrelevant history distracts the model, stale facts conflict with newer evidence, and silent storage creates privacy risk.",
    takeaway: "Good memory has an explicit write and recall policy: it is selective, relevant, permission-aware, traceable, and easy to update or delete."
  },
  "planning-reflection": {
    intro: "Planning turns a goal into manageable steps; ReAct is the observable decide → act → observe pattern that lets a model choose the next action using fresh evidence; reflection evaluates a result and changes the approach when the evidence shows a problem. These are control strategies, not access to a model's hidden chain-of-thought.",
    analogy: "A mechanic may first plan a short diagnostic sequence, run one test, observe the reading, and revise the next test. After a repair, a separate check confirms whether the symptom disappeared. A plan guides the work, observations update it, and reflection prevents an unchecked guess from becoming the final answer.",
    steps: ["Decompose the goal into a short plan when dependencies are known, or begin with one safe step when the environment is uncertain.", "Choose one typed, permitted action from the current evidence.", "Execute the action and record the observable result as an observation.", "Compare the observation with success criteria; continue the plan, replan after feedback, or use a verifier/reflection pass.", "Stop when evidence is sufficient, progress has stalled, a budget is reached, or human help is required."],
    exampleTitle: "A comparison that changes its plan after new evidence",
    example: "The agent lists the product facts it must verify, searches an approved source, and discovers that prices use different currencies. It adds a currency lookup, validates the converted values, and writes the comparison only when every required claim has evidence.",
    code: `for step_number in range(MAX_STEPS):\n    decision = planner.next_action(goal, evidence)\n    if decision.is_final and verifier.supports(decision.answer, evidence):\n        return decision.answer\n\n    observation = execute_validated(decision.tool_call)\n    evidence.append(observation)\n\n    if no_progress(evidence):\n        return escalate("The plan is not gaining new evidence")`,
    mistake: "More planning or reflection steps are not automatically better. Unlimited loops add cost and can repeat weak reasoning, so evaluate observable actions and results and enforce stop, retry, time, token, and tool budgets.",
    takeaway: "Use a plan for structure, the decide–act–observe loop for adaptation, reflection for evidence-based correction, and explicit stop rules to prevent aimless work."
  },
  "multi-agent-systems": {
    intro: "A multi-agent system divides work among specialized agents and defines how tasks, evidence, status, and ownership move between them. A manager may orchestrate workers, one agent may call another as a tool, or a peer may hand off a task. The benefit comes from useful specialization—not from adding more model calls.",
    analogy: "A project manager gives specialists written assignments with required inputs, outputs, deadlines, and decision authority. Each person receives only the context needed for the job, while one owner resolves conflicting findings and remains responsible for the final deliverable.",
    steps: ["Use more than one agent only when tasks are genuinely parallel, require different tools, or need distinct expertise.", "Choose a topology: manager and workers, agents-as-tools, or a peer-to-peer handoff.", "Define a delegation contract with scope, inputs, expected output, permissions, budget, deadline, and success criteria.", "Pass the necessary state and evidence—not entire noisy histories—and state who owns updates after a handoff.", "Track progress, detect duplicate work or conflicting decisions, validate every returned result, and keep one owner for the final outcome."],
    exampleTitle: "Preparing a market report through bounded delegation",
    example: "A coordinator delegates official-statistics research and competitor analysis in parallel. Each specialist returns a structured result with sources and status. A fact-checker examines the combined claims, and the coordinator resolves contradictions before producing one report.",
    code: `contracts = [\n    Task(role="statistics", output="sourced_metrics", budget=3),\n    Task(role="competitors", output="comparison_table", budget=3),\n]\nstatistics, competitors = await_all(\n    delegate(task) for task in contracts\n)\nreview = fact_checker.run(evidence=[statistics, competitors])\nreport = coordinator.merge_validated(statistics, competitors, review)`,
    mistake: "Adding agents does not automatically improve an answer. Vague handoffs, shared-state confusion, duplicate work, conflicting decisions, and repeated context can make a single-agent task slower, costlier, and less reliable.",
    takeaway: "Use multiple agents for genuine specialization or parallelism, define delegation and handoff contracts, pass only needed context, and make integration and final ownership explicit."
  },
  "building-ai-agent": {
    intro: "You already know the two ideas needed to build a first agent: an agent chooses a next step toward a goal, and tool calling lets it request a controlled action. Now we will connect those ideas in one tiny end-to-end program. You do not need to master planning, context engineering, memory, or graph frameworks yet—we will deliberately use the smallest versions here and unpack each one in the lessons that follow.",
    analogy: "Imagine training a new library assistant for one job: answer questions only from the approved handbook. Give the assistant the question, one search tool, a small work sheet for notes, a five-step limit, and a rule to say “I cannot verify that” when the handbook has no answer. That is already enough to see the core agent loop.",
    steps: ["Choose one narrow task with a clear success condition.", "Give the agent one read-only tool with validated inputs.", "Keep a tiny state containing the goal, evidence, step count, and trace.", "Repeat decide → tool → observe only while the goal is unfinished and the step budget remains.", "Return a supported answer when evidence is sufficient; otherwise stop safely and abstain.", "Save the successful and failed traces as tests before adding planning, memory, more tools, or write permissions."],
    exampleTitle: "A documentation assistant you can understand end to end",
    example: "The agent answers “How do I reset a password?” only by searching approved documentation. A supported question follows plan → search → answer. An unsupported question such as “How do I deploy to Mars?” eventually reaches the step limit and explicitly abstains instead of inventing a source.",
    code: `MAX_STEPS = 5\nstate = {"goal": user_question, "evidence": [], "trace": []}\nfor step in range(1, MAX_STEPS + 1):\n    decision = model.decide(state, tools=[search_docs])\n    state["trace"].append(decision.type)\n    if decision.type == "final":\n        return require_citations(decision.answer, state["evidence"])\n    if decision.type == "search":\n        result = search_docs(**validate(decision.args))\n        state["evidence"].append(result)\n        continue\n    if decision.type == "abstain":\n        return "I couldn't verify this in the approved documentation."\nreturn "I couldn't verify this in the approved documentation."`,
    mistake: "Do not wait until you understand every advanced agent concept before building anything, but also do not begin with purchase, delete, send-message, or other write tools. Learn the loop with one read-only tool, explicit limits, and safe abstention first.",
    takeaway: "A first agent can be tiny: goal + one tool + state + bounded loop + evidence + stop rule. Build that mechanism first; the next lessons explain how planning, context, memory, graphs, durability, and retrieval make it more capable."
  },
  "agent-evaluation-safety": {
    intro: "Agent evaluation checks both the final outcome and the trajectory that produced it: observations, decisions, tool choices, argument accuracy, permissions, unnecessary steps, recovery, safety, cost, and stopping behavior. A correct final answer is not a successful run if the agent reached it through unsafe or wasteful actions.",
    analogy: "A driving test scores the complete journey—destination, route, signals, speed, fuel use, and response to hazards—not only whether the car eventually arrived.",
    steps: ["Build versioned scenario suites from realistic tasks, failures, edge cases, and adversarial inputs, with allowed actions and explicit success conditions.", "Record the observable trajectory: decisions, tool calls and arguments, results, approvals, errors, latency, cost, and final output.", "Score task success, tool correctness, unnecessary steps, recovery behavior, and policy or safety compliance separately.", "Use deterministic checks where rules are clear, human review for nuanced high-risk cases, and model judges only with calibrated rubrics and caveats.", "Compare releases on the same scenarios, inspect critical traces, and convert production incidents into regression cases."],
    exampleTitle: "Testing a refund agent",
    example: "Cases include a valid refund, an order owned by another user, a duplicate request, a tool timeout, and a prompt injection hidden in ticket text. The agent must succeed safely in each case.",
    code: `score = {\n    "task_success": task_success(trace),\n    "tool_accuracy": tool_and_argument_score(trace),\n    "unnecessary_steps": count_redundant_actions(trace),\n    "safe_recovery": recovery_score(trace),\n    "policy_violations": count_policy_violations(trace),\n}\nassert trace.stops_within(max_steps=8)\nassert trace.did_not_repeat(completed_refund)`,
    mistake: "A high average task-success score can hide unsafe behavior and rare critical failures. Public benchmarks may also be contaminated or unlike your application, so inspect subgroups, trajectories, unauthorized attempts, irreversible errors, and human overrides.",
    takeaway: "Evaluate both destination and journey with reproducible scenarios, deterministic checks, careful human review, safety tests, trajectory diagnostics, and regression cases from real failures."
  }
};

const additionalLessons: Record<string, Lesson> = {
  "loss-functions-deep-learning": {
    intro: "A loss function converts the difference between a model's prediction and the correct answer into one number that training can minimize. The choice of loss defines what the network is rewarded for learning.",
    analogy: "A teacher needs a marking scheme before improving a student's work. Different marking schemes punish different mistakes; a loss function is the model's marking scheme.",
    steps: ["Choose a loss that matches the task and output layer.", "Calculate loss for every example in the batch.", "Average or sum the losses into one training objective.", "Backpropagate its gradient and update the weights."],
    exampleTitle: "Classification versus regression",
    example: "House-price prediction normally uses MAE or MSE because the target is a number. Cat-versus-dog classification uses binary cross-entropy because the output is a probability. Ten-class image recognition uses categorical cross-entropy.",
    code: `import tensorflow as tf\n\ny_true = tf.constant([10.0, 20.0, 30.0])\ny_pred = tf.constant([12.0, 18.0, 26.0])\n\nmse = tf.keras.losses.MeanSquaredError()(y_true, y_pred)\nmae = tf.keras.losses.MeanAbsoluteError()(y_true, y_pred)\nprint("MSE:", round(float(mse), 2))  # (4 + 4 + 16) / 3 = 8.0\nprint("MAE:", round(float(mae), 2))  # (2 + 2 + 4) / 3 = 2.67\n\n# Binary cross-entropy compares a 0/1 target with a probability.\nbce = tf.keras.losses.BinaryCrossentropy()\nprint("BCE:", round(float(bce([1.0], [0.9])), 3))  # about 0.105`,
    mistake: "Do not choose a loss because its name sounds familiar. It must agree with the target encoding, output activation, and business cost of different errors.",
    takeaway: "The loss is the learning objective: MSE/MAE for numeric prediction, cross-entropy for probabilities, and specialized losses for imbalanced or structured tasks."
  },
  "deep-learning-optimizers": {
    intro: "An optimizer converts gradients into weight updates. Plain SGD follows the current mini-batch gradient, momentum adds memory of recent directions, and Adam also adapts the effective step for each parameter. They use the same gradients differently, so their training paths can be very different.",
    analogy: "Imagine moving downhill in fog. Plain SGD takes one step using only the slope under its feet. Momentum is like a rolling ball that remembers its direction. Adam is like giving each direction its own step controller based on recent slopes.",
    steps: ["Backpropagation calculates a gradient for every parameter.", "The optimizer combines that gradient with its internal state.", "Learning rate controls the base update size.", "Parameters are updated and the process repeats for the next batch."],
    exampleTitle: "One valley, three update strategies",
    example: "In a narrow loss valley, plain SGD can bounce from one wall to the other. Momentum reduces alternating sideways movement. Adam goes further by scaling updates separately for parameters whose gradients have different typical sizes.",
    code: `import tensorflow as tf\nfrom tensorflow import keras\n\ndef make_model():\n    return keras.Sequential([\n        keras.layers.Input((20,)),\n        keras.layers.Dense(32, activation="relu"),\n        keras.layers.Dense(3)\n    ])\n\n# Give every optimizer exactly the same starting weights.\ntf.keras.utils.set_random_seed(7)\ntemplate = make_model()\ninitial_weights = template.get_weights()\n\noptimizers = {\n    "SGD": keras.optimizers.SGD(learning_rate=0.01),\n    "Momentum": keras.optimizers.SGD(learning_rate=0.01, momentum=0.9),\n    "Adam": keras.optimizers.Adam(learning_rate=0.001),\n}\n\nfor name, optimizer in optimizers.items():\n    model = make_model()\n    model.set_weights(initial_weights)\n    model.compile(\n        optimizer=optimizer,\n        loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),\n        metrics=["accuracy"]\n    )\n    history = model.fit(train_ds, validation_data=val_ds, epochs=10, verbose=0)\n    best_val = max(history.history["val_accuracy"])\n    print(name, "best validation accuracy:", round(best_val, 3))`,
    mistake: "Do not declare a winner from one training-loss curve. Use the same initialization, data split, training budget, and comparable tuning effort, then judge validation quality, stability, time, and optimizer memory together.",
    takeaway: "Adam is a practical first baseline, momentum is worth a controlled comparison for long tuned training, and plain SGD remains a transparent low-memory baseline. The validation experiment decides."
  },
  "weight-initialization": {
    intro: "Weight initialization chooses the network's starting parameter values. Good initialization keeps signals and gradients at useful scales as they pass through many layers.",
    analogy: "Starting every runner at exactly the same position and pace makes the race uninformative. Random initialization breaks symmetry, while careful scaling prevents runners from starting too fast or too slow.",
    steps: ["Initialize weights randomly to break neuron symmetry.", "Scale variance according to the number of inputs.", "Use He initialization with ReLU-like activations.", "Use Glorot/Xavier with tanh or sigmoid-style layers."],
    exampleTitle: "A deep ReLU network",
    example: "If weights are too small, activations and gradients shrink toward zero. If too large, they explode. He initialization uses the layer's fan-in to keep ReLU activations approximately stable.",
    code: `from tensorflow.keras.layers import Dense\n\nlayer = Dense(\n    128, activation="relu",\n    kernel_initializer="he_normal",\n    bias_initializer="zeros"\n)`,
    mistake: "Initializing every weight to zero makes neurons learn identical features because they receive identical gradients.",
    takeaway: "Initialization is not random decoration—it determines whether useful information and gradients survive through a deep network."
  },
  "batch-normalization": {
    intro: "Batch normalization standardizes intermediate activations during training, then learns a scale and shift. It often makes optimization faster and less sensitive to initialization.",
    analogy: "A production line works better when every station receives parts in a predictable size range. Normalization stabilizes what one layer passes to the next.",
    steps: ["Compute the mini-batch mean and variance.", "Normalize each activation using those statistics.", "Apply learned scale and shift parameters.", "Use moving averages instead of batch statistics during inference."],
    exampleTitle: "Stabilizing a dense network",
    example: "Place batch normalization between a dense/convolution layer and its activation. The layer can often tolerate a larger learning rate and converge in fewer epochs.",
    code: `from tensorflow.keras import Sequential\nfrom tensorflow.keras.layers import Dense, BatchNormalization, ReLU\n\nmodel = Sequential([\n    Dense(128, use_bias=False),\n    BatchNormalization(),\n    ReLU(),\n    Dense(10, activation="softmax")\n])`,
    mistake: "Training and inference behave differently. Forgetting to switch the model to evaluation mode can produce unstable predictions.",
    takeaway: "Batch normalization stabilizes layer inputs, but small batches may favor layer normalization or group normalization instead."
  },
  "deep-learning-regularization": {
    intro: "Regularization reduces overfitting by discouraging the network from memorizing training examples. Common methods include dropout, weight decay, data augmentation, and early stopping.",
    analogy: "A student who memorizes practice answers may fail a changed exam. Regularization changes practice conditions so the student must learn the underlying idea.",
    steps: ["Measure the gap between training and validation performance.", "Add data augmentation or more representative data first.", "Use dropout or weight decay to limit brittle reliance on parameters.", "Stop training when validation loss stops improving."],
    exampleTitle: "Dropout in a classifier",
    example: "Dropout randomly hides 30% of selected activations during each training step. Different subnetworks must cooperate, reducing reliance on one fragile pathway. Dropout is disabled during inference.",
    code: `from tensorflow.keras.layers import Dense, Dropout\n\nmodel = Sequential([\n    Dense(256, activation="relu"),\n    Dropout(0.3),\n    Dense(64, activation="relu", kernel_regularizer="l2"),\n    Dense(10, activation="softmax")\n])`,
    mistake: "Adding heavy dropout everywhere can cause underfitting. Regularization strength should be selected using validation data.",
    takeaway: "Regularize only after diagnosing overfitting, and prefer realistic data augmentation whenever possible."
  },
  "computer-vision": {
    intro: "Computer vision models turn pixels into predictions. A complete image-classification system includes data collection, resizing and normalization, augmentation, a CNN or vision transformer, evaluation, and deployment monitoring.",
    analogy: "A child learns animals from varied examples—different poses, lighting, and backgrounds. A vision model also needs variety or it will mistake the background for the object.",
    steps: ["Collect labeled images that represent production conditions.", "Split by subject or source to prevent leakage.", "Resize, normalize, and augment training images.", "Fine-tune a pretrained model and inspect class-specific errors."],
    exampleTitle: "Healthy versus diseased leaves",
    example: "Train on photographs from multiple farms and devices, not random crops of the same original photo across train and test. Review confusion by plant species and lighting condition before deployment.",
    code: `import tensorflow as tf\n\ntrain = tf.keras.utils.image_dataset_from_directory(\n    "leaves/train", image_size=(224, 224), batch_size=32\n)\naugment = tf.keras.Sequential([\n    tf.keras.layers.RandomFlip("horizontal"),\n    tf.keras.layers.RandomRotation(0.1)\n])`,
    mistake: "Randomly splitting near-duplicate images creates leakage and an unrealistically high test score.",
    takeaway: "Vision performance depends as much on representative images and honest splitting as on the model architecture."
  },
  "object-detection": {
    intro: "Image classification names the main object; object detection also draws bounding boxes; segmentation assigns a class to individual pixels. They answer increasingly detailed questions about a scene.",
    analogy: "Classification says “cars are present.” Detection says “three cars are here.” Segmentation traces the exact outline of every road, car, and pedestrian.",
    steps: ["Annotate classes plus boxes or masks.", "Predict candidate locations and class scores.", "Remove overlapping duplicate boxes with non-maximum suppression.", "Evaluate with Intersection over Union and mean Average Precision."],
    exampleTitle: "Detecting safety helmets",
    example: "A detector returns each worker's bounding box, helmet class, and confidence. Match predicted boxes to labeled boxes using IoU; count a correct detection only when location and class are sufficiently accurate.",
    code: `def iou(box_a, box_b):\n    intersection = intersection_area(box_a, box_b)\n    union = area(box_a) + area(box_b) - intersection\n    return intersection / union\n\n# A common correctness threshold\nis_match = iou(predicted_box, true_box) >= 0.5`,
    mistake: "Accuracy is usually misleading for detection because most image locations contain no object. Use precision-recall and mAP.",
    takeaway: "Choose classification, detection, or segmentation according to whether you need a label, a location, or a pixel-level outline."
  },
  "deep-learning-nlp": {
    intro: "Deep learning for NLP represents language numerically and learns patterns for classification, translation, question answering, and generation. Modern systems usually use pretrained transformers.",
    analogy: "Words are not useful to a calculator until placed on a numerical map. Embeddings create that map; sequence models learn how meaning changes with context and order.",
    steps: ["Define the language task and labeling scheme.", "Tokenize text and create attention masks.", "Fine-tune a pretrained language model.", "Evaluate by class, language, text length, and real-world error cost."],
    exampleTitle: "Sentiment classification",
    example: "Fine-tune a compact encoder model on labeled reviews. Evaluate sarcasm, negation, mixed sentiment, and domain shifts—not only overall accuracy.",
    code: `from transformers import pipeline\n\nclassifier = pipeline("sentiment-analysis")\nprint(classifier("The battery is great, but the screen is disappointing."))`,
    mistake: "Removing punctuation, stop words, or word order by habit can destroy information that pretrained transformers use.",
    takeaway: "Modern NLP starts with tokenization and pretrained transformers, then adapts and evaluates them for a clearly defined task."
  },
  "text-generation-decoding": {
    intro: "A language model outputs probabilities, not finished sentences. A decoding strategy chooses tokens from those probabilities and controls the balance between consistency, diversity, and repetition.",
    analogy: "A route planner may always choose the single shortest road, randomly explore plausible roads, or consider several routes before deciding. Decoding applies similar choices to tokens.",
    steps: ["Calculate next-token logits.", "Apply temperature to sharpen or flatten probabilities.", "Restrict candidates with top-k or top-p sampling.", "Sample or choose a token, append it, and repeat until a stop condition."],
    exampleTitle: "Temperature and top-p",
    example: "Low temperature makes product-support answers stable. Higher temperature plus top-p sampling creates more varied story ideas. Greedy decoding is deterministic but can become repetitive.",
    code: `output = model.generate(\n    **inputs,\n    max_new_tokens=120,\n    do_sample=True,\n    temperature=0.7,\n    top_p=0.9,\n    repetition_penalty=1.1\n)`,
    mistake: "Temperature does not add knowledge or reasoning ability; it only changes how probabilities are sampled.",
    takeaway: "Use deterministic decoding for structured tasks and controlled sampling for creative tasks, then evaluate on your actual use case."
  },
  "hugging-face": {
    intro: "Hugging Face provides model repositories, datasets, tokenizers, pipelines, and training tools that make pretrained transformer models easier to discover, test, fine-tune, and share.",
    analogy: "It is a well-organized workshop: the Hub stores tools, model cards explain them, pipelines offer quick handles, and Trainer helps adapt them to your job.",
    steps: ["Search the Hub by task, license, language, and model size.", "Read the model card and limitations.", "Test with a pipeline or AutoModel class.", "Pin a revision, evaluate locally, and document deployment constraints."],
    exampleTitle: "Running a summarization model",
    example: "A pipeline downloads the tokenizer and matching model, preprocesses text, runs inference, and decodes output. For production, choose an explicit model and revision rather than relying on defaults.",
    code: `from transformers import pipeline\n\nsummarizer = pipeline(\n    "summarization",\n    model="facebook/bart-large-cnn"\n)\nresult = summarizer(article, max_length=120, min_length=30)\nprint(result[0]["summary_text"])`,
    mistake: "A popular model is not automatically licensed, safe, fast, or accurate enough for your application. Read its model card.",
    takeaway: "Hugging Face accelerates experimentation, but model selection, licensing, evaluation, and version pinning remain your responsibility."
  },
  "multimodal-ai": {
    intro: "Multimodal AI processes or generates more than one data type—such as text, images, audio, or video—and learns how those modalities relate.",
    analogy: "A person understands a recipe better by reading instructions, seeing the dish, and hearing timing cues. Multimodal models combine complementary signals in a shared task.",
    steps: ["Encode each modality with a suitable encoder.", "Align representations into a shared space or exchange information through attention.", "Fuse the evidence for prediction or generation.", "Evaluate each modality and their interaction, including missing or corrupted inputs."],
    exampleTitle: "Answering questions about an image",
    example: "A vision encoder represents image regions; a language model reads the question and attends to relevant visual features before generating an answer.",
    code: `from transformers import pipeline\n\nvqa = pipeline("visual-question-answering")\nanswer = vqa(\n    image="street.jpg",\n    question="How many bicycles are visible?"\n)\nprint(answer)`,
    mistake: "A model may rely on text priors and ignore the image. Use counterfactual tests where the image changes but the question stays the same.",
    takeaway: "Multimodal systems need aligned representations and evaluations that prove every modality actually contributes."
  },
  "synthetic-data": {
    intro: "Synthetic data is artificially generated data designed to resemble important properties of real data. It can augment rare cases, simulate scenarios, or reduce—but not automatically remove—privacy risk.",
    analogy: "A flight simulator creates controlled practice situations that are hard or dangerous to collect in real life. Its value depends on how faithfully it represents the situations pilots will face.",
    steps: ["Define which statistical and task properties must be preserved.", "Generate data using rules, simulators, or generative models.", "Measure fidelity, diversity, privacy leakage, and downstream utility.", "Mix with real data carefully and validate on untouched real-world data."],
    exampleTitle: "Rare manufacturing defects",
    example: "Generate varied defect images to supplement scarce examples, train a detector on mixed data, and evaluate only on real factory images from later production runs.",
    code: `checks = {\n    "distribution_similarity": compare_statistics(real, synthetic),\n    "duplicate_rate": nearest_neighbor_leakage(real, synthetic),\n    "downstream_utility": train_synthetic_test_real(synthetic, real_test),\n    "minority_coverage": coverage_by_subgroup(synthetic),\n}`,
    mistake: "Synthetic data can reproduce bias, artifacts, or private training examples. It is not automatically fair or anonymous.",
    takeaway: "Judge synthetic data by real downstream utility, coverage, and privacy tests—not by how realistic a few samples look."
  },
  "building-genai-apps": {
    intro: "A Generative AI application is a software system around a model. It manages prompts, context, retrieval, tools, output validation, user experience, evaluation, cost, and safety.",
    analogy: "A powerful engine is not a complete car. The model is the engine; your application still needs steering, brakes, instruments, and crash testing.",
    steps: ["Define one narrow user job and a measurable success criterion.", "Build a prompt-and-model baseline.", "Add retrieval or tools only when evaluation shows a need.", "Validate outputs, handle failure, log safely, and test before release."],
    exampleTitle: "Meeting-note assistant",
    example: "Accept a transcript, separate speakers, generate structured decisions and action items, require evidence spans for every action, and let users edit before exporting.",
    code: `class MeetingSummary(BaseModel):\n    decisions: list[str]\n    action_items: list[ActionItem]\n    unanswered_questions: list[str]\n\nresult = generate_structured(\n    transcript, schema=MeetingSummary\n)\nvalidate_evidence(result, transcript)`,
    mistake: "A demo that works on three hand-picked prompts is not a product. Build an evaluation set from realistic and adversarial inputs.",
    takeaway: "Start with a narrow workflow, typed outputs, and repeatable evaluation; add complexity only when it solves a measured failure."
  },
  "genai-deployment": {
    intro: "Deploying Generative AI begins with a model-access decision—call a hosted API or run an open model on controlled infrastructure—then requires reliable serving with measured quality, privacy, latency, throughput, cost, and failures.",
    analogy: "A taxi is quick to start and maintained for you, while owning a car gives more control but makes maintenance your responsibility. Either choice still needs routes, safety checks, and a plan for breakdowns.",
    steps: ["List quality, privacy, data-location, latency, scale, customization, and maintenance needs.", "Compare hosted APIs and self-hosted open models with the same representative prompts and metrics.", "Hide provider-specific calls behind one protected server-side interface so the application can change providers safely.", "Set timeouts, safe retries, rate limits, caching, concurrency limits, fallbacks, logging, and cost tracking.", "Stream responses where useful and handle partial failures explicitly.", "Canary new model versions and monitor quality, latency, throughput, tokens, cost, and safety."],
    exampleTitle: "A provider-independent production assistant",
    example: "The application calls one internal generate function. Its protected adapter can use a hosted API today or a local open model later. The support endpoint caches stable retrieval results, streams the answer, retries only safe idempotent requests, falls back to search when generation fails, and routes urgent cases to people.",
    code: `def generate_stream(prompt, provider):\n    if provider == "hosted":\n        return hosted_client.generate_stream(prompt)\n    return local_pipeline.stream(prompt)\n\n@app.post("/answer")\nasync def answer(request: Question):\n    async with timeout(8):\n        context = await retrieve(request.text)\n        prompt = build_prompt(request.text, context)\n        return StreamingResponse(\n            generate_stream(prompt, provider=settings.provider)\n        )`,
    mistake: "Putting secret API keys in browser code exposes them to every visitor, while blind retries can duplicate actions and increase cost. Keep secrets on the server and retry only idempotent operations.",
    takeaway: "Choose hosted or self-hosted access using measured trade-offs, hide it behind a stable interface, and make quality, privacy, cost, latency, and failures observable."
  },
  "language-model-evolution": {
    intro: "Language modeling evolved from counting word sequences, to recurrent neural networks, to attention-based transformers and large pretrained foundation models.",
    analogy: "Early systems used phrasebooks, RNNs kept a running notebook, and transformers opened the whole relevant page at once and highlighted useful relationships.",
    steps: ["N-grams estimate the next word from short count-based histories.", "RNNs and LSTMs learn distributed state across sequences.", "Transformers use attention for parallel context processing.", "Scaling data, parameters, and compute creates general pretrained capabilities."],
    exampleTitle: "Predicting the word after ‘machine’",
    example: "An n-gram looks up counts such as ‘machine learning.’ An RNN compresses preceding words into state. A transformer directly attends to relevant words anywhere in its context.",
    code: `from collections import Counter\n\nbigrams = Counter(zip(tokens, tokens[1:]))\ncandidates = {b: n for (a, b), n in bigrams.items() if a == "machine"}\nnext_word = max(candidates, key=candidates.get)`,
    mistake: "New architectures do not make old methods useless. N-grams and small models remain fast, interpretable baselines for constrained tasks.",
    takeaway: "Each generation improved how much context could be represented, learned, and processed efficiently."
  },
  "encoder-decoder-models": {
    intro: "Encoder models build representations for understanding, decoder models generate autoregressively, and encoder-decoder models transform one sequence into another.",
    analogy: "An encoder is a careful reader, a decoder is a writer continuing a draft, and an encoder-decoder is a translator who reads one text before writing another.",
    steps: ["Encoder-only models attend bidirectionally and suit classification or retrieval.", "Decoder-only models predict the next token and suit open-ended generation.", "Encoder-decoder models encode an input then decode a conditioned output.", "Select architecture based on the task, latency, and training objective."],
    exampleTitle: "Choosing a model family",
    example: "Use an encoder for sentiment classification, a decoder for chat or code completion, and an encoder-decoder for translation or document summarization.",
    code: `task_to_family = {\n    "sentiment": "encoder-only (BERT-like)",\n    "text generation": "decoder-only (GPT-like)",\n    "translation": "encoder-decoder (T5-like)",\n}\nprint(task_to_family[task])`,
    mistake: "Model size alone does not determine suitability. Architecture and objective strongly affect efficiency and behavior.",
    takeaway: "Match the model family to the information flow your task needs: understand, generate, or transform."
  },
  "context-windows": {
    intro: "A context window is the maximum token sequence a model can consider in one request. It contains instructions, conversation, retrieved documents, tool results, and the generated output budget.",
    analogy: "It is the size of a working desk, not long-term memory. More papers fit on a larger desk, but clutter can still hide the important page.",
    steps: ["Count all input and expected output tokens.", "Prioritize instructions and relevant evidence.", "Chunk, retrieve, summarize, or compress older information.", "Test information placed at the beginning, middle, and end of long contexts."],
    exampleTitle: "A long contract question",
    example: "Instead of placing a 500-page contract in every prompt, retrieve the relevant clauses, include section identifiers, reserve tokens for the answer, and test whether cross-references were missed.",
    code: `budget = model_context_limit - max_output_tokens\nselected = retrieve(query, chunks)\ncontext = pack_by_relevance(\n    selected, token_budget=budget - tokens(instructions + query)\n)`,
    mistake: "A larger context window does not guarantee better recall. Irrelevant context can reduce accuracy and raise cost.",
    takeaway: "Treat context as a limited attention budget: retrieve, rank, compress, and verify instead of filling it blindly."
  },
  "instruction-tuning-rlhf": {
    intro: "Instruction tuning teaches a pretrained model to follow demonstrations. Preference optimization then teaches which of several valid responses humans or policies prefer.",
    analogy: "Pretraining is broad reading; instruction tuning is practicing questions with worked answers; preference training is feedback about which answer is more helpful and safe.",
    steps: ["Pretrain with next-token prediction.", "Supervise on curated instruction-response examples.", "Collect preference comparisons between candidate outputs.", "Optimize with RLHF or direct preference methods and evaluate capability plus safety regressions."],
    exampleTitle: "Teaching helpful refusal behavior",
    example: "Demonstrations show how to answer normal questions and safely decline harmful ones. Preference pairs reward responses that are useful, honest, clear, and policy-compliant.",
    code: `preference = {\n    "prompt": user_request,\n    "chosen": helpful_grounded_response,\n    "rejected": plausible_but_unsafe_response,\n}\n# DPO-style training increases relative likelihood of chosen over rejected.`,
    mistake: "Alignment does not permanently solve truthfulness or safety. Behavior can change across prompts, languages, tools, and distribution shifts.",
    takeaway: "Post-training converts a general predictor into an instruction-following assistant, but ongoing evaluation and system controls remain necessary."
  },
  "lora-peft": {
    intro: "Parameter-Efficient Fine-Tuning adapts a large model by training a small number of additional parameters. LoRA learns low-rank update matrices while keeping the original weights frozen.",
    analogy: "Instead of rewriting a whole textbook, attach a compact set of specialist notes that changes how selected chapters are interpreted.",
    steps: ["Load a pretrained base model and freeze its weights.", "Insert low-rank adapters into selected linear layers.", "Train only adapter parameters on curated examples.", "Save, evaluate, merge, or switch adapters for different tasks."],
    exampleTitle: "Adapting a 7B model",
    example: "A full fine-tune updates billions of values. LoRA may train only millions, reducing GPU memory and storage while preserving the reusable base model.",
    code: `from peft import LoraConfig, get_peft_model\n\nconfig = LoraConfig(\n    r=8, lora_alpha=16, lora_dropout=0.05,\n    target_modules=["q_proj", "v_proj"]\n)\nmodel = get_peft_model(base_model, config)\nmodel.print_trainable_parameters()`,
    mistake: "PEFT reduces trainable parameters, not the need for high-quality data, careful evaluation, or enough memory to run the base model.",
    takeaway: "LoRA makes specialization cheaper by learning compact updates instead of modifying every base-model weight."
  },
  "quantization-inference": {
    intro: "Quantization stores and computes model values with fewer bits, reducing memory, bandwidth, and sometimes latency. Efficient inference also relies on batching, caching, and optimized serving engines.",
    analogy: "A high-resolution map can be compressed for a phone. It becomes smaller and faster to load, but too much compression may erase details needed for navigation.",
    steps: ["Measure a full-precision quality and latency baseline.", "Choose weight-only or weight-and-activation quantization.", "Calibrate on representative inputs when required.", "Benchmark quality, memory, throughput, and tail latency on target hardware."],
    exampleTitle: "4-bit model loading",
    example: "A 7B-parameter model requires roughly 14 GB just for 16-bit weights, versus about 3.5 GB for idealized 4-bit storage plus quantization metadata and runtime memory.",
    code: `from transformers import BitsAndBytesConfig\n\nquant = BitsAndBytesConfig(load_in_4bit=True)\nmodel = AutoModelForCausalLM.from_pretrained(\n    model_id, quantization_config=quant, device_map="auto"\n)`,
    mistake: "Lower precision does not guarantee faster inference on every device; kernels and hardware support determine actual speed.",
    takeaway: "Quantize only after benchmarking the real model, task, serving stack, and hardware against an accuracy budget."
  },
  "vector-databases": {
    intro: "A vector database stores embeddings and retrieves nearby vectors, enabling semantic search that matches meaning rather than only exact keywords.",
    analogy: "A keyword index files documents by spelling; a vector index places them on a meaning map, where ‘car repair’ can be near ‘fixing an automobile.’",
    steps: ["Split and clean source documents.", "Create embeddings with one versioned model.", "Store vectors alongside text, source, permissions, and timestamps.", "Embed a query, retrieve candidates, filter, rerank, and evaluate relevance."],
    exampleTitle: "Searching support documentation",
    example: "The query ‘my account is locked’ can retrieve a document titled ‘Recover access after repeated sign-in failures’ even without exact keyword overlap.",
    code: `records = [{\n    "id": chunk.id,\n    "vector": embed(chunk.text),\n    "metadata": {"source": chunk.url, "team": chunk.acl}\n} for chunk in chunks]\nindex.upsert(records)\nresults = index.search(embed(query), top_k=10, filter=user_acl)`,
    mistake: "A vector database does not replace access control or evaluation. Apply permissions before content reaches the model.",
    takeaway: "Semantic retrieval is an engineered pipeline: chunking, embeddings, metadata, filtering, reranking, and relevance evaluation all matter."
  },
  llmops: {
    intro: "LLMOps applies software and ML operations practices to LLM applications: versioning prompts and models, tracing requests, evaluating releases, controlling cost, and monitoring production quality.",
    analogy: "A restaurant records recipes, suppliers, orders, preparation time, complaints, and waste. Without those records it cannot reproduce quality or diagnose a bad service.",
    steps: ["Version prompts, models, retrieval indexes, tools, and evaluation sets.", "Trace model and tool calls with privacy-safe metadata.", "Gate releases on offline quality, safety, latency, and cost tests.", "Monitor production drift, incidents, feedback, and model-provider changes."],
    exampleTitle: "Comparing two model versions",
    example: "Replay the same evaluation set, compare groundedness and task success, measure p95 latency and cost, inspect regressions by use case, then canary the winner on a small traffic share.",
    code: `trace = {\n    "prompt_version": "support-v12",\n    "model": model_version,\n    "retrieval_index": index_version,\n    "latency_ms": latency,\n    "input_tokens": usage.input_tokens,\n    "output_tokens": usage.output_tokens,\n    "tool_calls": safe_tool_metadata,\n}`,
    mistake: "Logging raw prompts can expose personal or confidential data. Redact, minimize, encrypt, and define retention rules.",
    takeaway: "LLMOps makes quality reproducible by connecting every answer to versioned components, traces, evaluations, and production feedback."
  },
  "agentic-rag": {
    intro: "Agentic RAG lets an agent decide when, where, and how to retrieve, reformulate weak queries, use multiple sources, and verify whether evidence is sufficient.",
    analogy: "Basic RAG asks a librarian once. Agentic RAG lets a researcher revise search terms, consult another catalog, compare sources, and stop when the evidence answers the question.",
    steps: ["Classify whether retrieval is needed.", "Plan one or more searches with filters.", "Grade retrieved evidence and reformulate if weak.", "Synthesize with citations, verify support, and stop within a retrieval budget."],
    exampleTitle: "Researching a policy change",
    example: "The agent searches the latest policy, follows a referenced amendment, compares effective dates, and refuses to answer if authoritative documents conflict.",
    code: `for attempt in range(3):\n    docs = retrieve(query, filters={"approved": True})\n    grade = relevance_and_authority(docs, question)\n    if grade.sufficient:\n        return grounded_answer(question, docs)\n    query = rewrite_query(question, docs, grade)\nreturn escalate("Insufficient evidence")`,
    mistake: "More retrieval loops can amplify irrelevant or malicious content. Limit sources, attempts, permissions, and tool authority.",
    takeaway: "Agentic RAG improves difficult retrieval through planning and evidence checks, at the cost of latency and additional failure paths."
  },
  "agent-frameworks": {
    intro: "Agent frameworks provide reusable primitives for state, tools, routing, memory, multi-agent coordination, checkpoints, tracing, and deployment. They reduce plumbing but do not replace system design.",
    analogy: "A web framework supplies routing and middleware, but it does not decide your product requirements or secure your database automatically.",
    steps: ["Prototype the agent loop with plain code first.", "List required features such as durable state or multi-agent roles.", "Compare framework control, debugging, ecosystem, persistence, and lock-in.", "Wrap framework-specific code behind your own interfaces and evaluate behavior."],
    exampleTitle: "Choosing among common patterns",
    example: "Use a graph-style orchestrator for explicit stateful branches, role-oriented orchestration for collaborative prototypes, and plain functions for a small deterministic workflow.",
    code: `class AgentRuntime(Protocol):\n    def run(self, state: TaskState) -> TaskResult: ...\n\n# Keep business tools independent of LangGraph, CrewAI, AutoGen,\n# or another orchestration framework.`,
    mistake: "Selecting a framework before understanding the control flow often produces unnecessary abstraction and difficult debugging.",
    takeaway: "Choose a framework for concrete operational needs, and keep domain logic portable."
  },
  "model-context-protocol": {
    intro: "Model Context Protocol is an open protocol for connecting AI applications to tools and contextual resources through a consistent client-server interface. It standardizes discovery and invocation; it does not replace the underlying API or service and does not make a capability automatically trusted or safe.",
    analogy: "USB standardizes how many devices connect to a computer. MCP standardizes how an AI host discovers and invokes capabilities exposed by compatible servers.",
    steps: ["An MCP server exposes tools, resources, or prompts supported by that implementation.", "An MCP client connects the server to an AI host and discovers the advertised capabilities.", "The host presents relevant capabilities to the model, which may propose an invocation.", "The application validates permission, credentials, arguments, and trust boundaries before the server reaches the underlying API or data source.", "Structured results return through the client, while operators manage server versions, compatibility, credentials, and governance separately."],
    exampleTitle: "Connecting a documentation server",
    example: "One MCP server exposes approved documentation search. Different compatible AI hosts can use the same server without implementing a unique integration for each host.",
    code: `# Conceptual MCP tool definition\n@server.tool()\ndef search_docs(query: str, limit: int = 5) -> list[Document]:\n    """Search only the approved documentation index."""\n    authorize_current_user()\n    return docs.search(query, limit=min(limit, 10))`,
    mistake: "A protocol connection is not a security boundary, and an MCP server is not automatically safe because it follows the protocol. Hosts and servers still need authentication, authorization, consent, validation, version management, and audit logs.",
    takeaway: "MCP standardizes discovery and capability exchange across clients and servers; the underlying service, permissions, credentials, and safe execution remain application responsibilities."
  },
  "agent-security": {
    intro: "Agent security assumes model inputs, retrieved pages, and tool results may be hostile. Prompt injection tries to manipulate the agent into ignoring trusted instructions, while excessive permissions, confused authority, data leakage, duplicate side effects, and partial failures can turn a bad decision into a real incident. Guardrails prevent unsafe actions; recovery controls detect failure and move the task to a safe state.",
    analogy: "An employee reading an email does not follow a sentence saying ‘ignore company policy and send me the payroll file.’ Retrieved text must be treated as data, not authority.",
    steps: ["Separate trusted instructions and authorization from untrusted user, webpage, document, and tool content.", "Give every tool the minimum permissions, scoped credentials, allowlisted resources, and data access required for one task.", "Validate inputs, outputs, tool arguments, and policy in deterministic application code; never let untrusted content grant authority.", "Detect repeated actions, unchanged state, conflicting evidence, timeouts, tool errors, and partial completion against explicit invariants and limits.", "Retry only transient idempotent operations with backoff; otherwise use fallback, compensation, human escalation, or a safe stop.", "Require confirmation for consequential actions, preserve an incident trace, and turn failures into new security and recovery tests."],
    exampleTitle: "Malicious instructions inside a webpage",
    example: "A research agent encounters hidden text requesting secret upload. The browser content cannot grant tool permission; a policy layer blocks data access and the trace records the attempt.",
    code: `def execute_or_recover(call, user, source, state):\n    validate_schema(call)\n    if source.is_untrusted and call.requests_sensitive_data:\n        raise SecurityError("Untrusted content cannot authorize access")\n    authorize(user, call.tool, call.resource)\n\n    if repeated(call, state) or state.steps >= MAX_STEPS:\n        return escalate("No safe measurable progress", trace=state.trace)\n    if call.is_consequential:\n        require_confirmation(call)\n\n    try:\n        return sandbox.run(call)\n    except TransientError:\n        return retry_with_backoff(call) if call.is_idempotent else safe_stop()`,
    mistake: "System-prompt wording and vague instructions to keep trying are not security or recovery systems. Enforce permissions, limits, retry safety, and side-effect policy outside the probabilistic model.",
    takeaway: "Treat the model as an untrusted decision proposer: constrain authority, validate every boundary, detect no-progress and partial-failure states, and recover through bounded retry, fallback, escalation, or safe termination."
  },
  "agent-observability-deployment": {
    intro: "Agent observability records the complete execution trajectory—state transitions, model decisions, tool calls, observations, retries, approvals, latency, cost, and final outcome—so operators can understand and control a production run. Deployment adds explicit budgets, concurrency and rate limits, release controls, rollback, privacy-aware logging, and service objectives such as cost per successful task.",
    analogy: "A parcel-tracking system records every handoff. If delivery fails, operators can see where it stopped instead of only seeing ‘not delivered.’",
    steps: ["Assign one trace ID across the task and record privacy-safe spans for model calls, tools, state transitions, retries, and approvals.", "Set maximum elapsed time, cost, tokens, model calls, tool calls, and steps before execution; track each budget after every operation.", "Measure task success, cost per successful task, step count, tool errors, p50/p95 latency, timeouts, safety events, and human overrides.", "Control concurrency and provider rate limits, use smaller models or cached results for suitable steps, and stop or return partial progress when a budget is exhausted.", "Release with offline gates, canary or shadow traffic, alerts, rollback, and production SLOs; feed incidents back into evaluation cases."],
    exampleTitle: "Diagnosing a looping research agent",
    example: "Traces reveal that the same search was called six times because tool errors were summarized ambiguously. The run exceeded its latency and tool-call budgets without improving the answer. A retry classifier, duplicate-action guard, explicit budget, and release gate prevent recurrence before the corrected version enters a small canary release.",
    code: `with trace("research_task", task_id=task.id) as run:\n    for step in bounded_agent(task, max_steps=8, timeout_s=90):\n        with run.span(step.tool, safe_args=redact(step.args)):\n            result = execute(step)\n            budget.consume(tokens=result.tokens, cost=result.cost)\n            record_metrics(latency=result.latency, cost=result.cost)\n            if budget.exhausted:\n                return partial_result_with_trace(run)`,
    mistake: "Storing every raw prompt and tool result can create a sensitive-data warehouse. Use redaction, access controls, and retention limits.",
    takeaway: "You cannot safely operate an agent you cannot trace, budget, measure, stop, replay, canary, and roll back; optimize cost and latency against successful tasks rather than calls alone."
  }
};

const deepLearningGapLessons: Record<string, Lesson> = {
  "tensors-frameworks-gpus": {
    intro: "A tensor is a multidimensional array and the basic data container of Deep Learning. Frameworks such as PyTorch and TensorFlow combine tensors with automatic differentiation, neural-network layers, optimizers, data pipelines, and hardware acceleration.",
    analogy: "A spreadsheet is a two-dimensional grid. A tensor generalizes that idea: a scalar has zero axes, a list has one, an image has height, width and channels, and an image batch adds another axis.",
    steps: ["Represent inputs, targets, and parameters as tensors.", "Inspect shape, data type, and device before calculating anything.", "Move the model and every input tensor to the same CPU, GPU, or accelerator.", "Use vectorized tensor operations so the framework can execute efficient kernels."],
    exampleTitle: "Understanding an image batch",
    example: "A PyTorch image batch with shape [32, 3, 224, 224] contains 32 RGB images. TensorFlow commonly uses [32, 224, 224, 3]. Confusing these layouts causes shape errors or silently mixes spatial and channel dimensions.",
    code: `import torch\n\ndevice = torch.device("cuda" if torch.cuda.is_available() else "cpu")\nimages = torch.randn(32, 3, 224, 224, device=device)\nlabels = torch.randint(0, 10, (32,), device=device)\n\nprint(images.shape)   # torch.Size([32, 3, 224, 224])\nprint(images.dtype)   # torch.float32\nprint(images.device)  # cuda:0 or cpu`,
    mistake: "Calling model.to('cuda') is not enough; inputs, labels, model parameters, and temporary tensors involved in an operation must be on compatible devices.",
    takeaway: "Before debugging the model architecture, verify every tensor's shape, dtype, value range, and device."
  },
  "computational-graphs-autodiff": {
    intro: "A computational graph records how tensors are produced by mathematical operations. Automatic differentiation walks this graph backward and applies the chain rule to calculate the gradient of the loss with respect to every trainable parameter.",
    analogy: "A calculation receipt records every step used to produce the total. To find how one ingredient affected the result, autodiff follows that receipt backward and combines each local effect.",
    steps: ["Run tensor operations while gradient tracking is enabled.", "The framework creates graph nodes for operations and edges for tensor dependencies.", "Call backward on a scalar loss to propagate derivatives in reverse order.", "Read parameter gradients, update parameters, and clear gradients before the next step."],
    exampleTitle: "Differentiating a tiny expression",
    example: "For y = x² + 3x at x = 2, the derivative is 2x + 3 = 7. Autodiff records multiplication and addition during the forward pass, then reconstructs the same derivative during the backward pass.",
    code: `import torch\n\nx = torch.tensor(2.0, requires_grad=True)\ny = x**2 + 3*x\ny.backward()\nprint(x.grad)  # tensor(7.)\n\n# Stop graph construction during evaluation\nwith torch.no_grad():\n    prediction = x * 10`,
    mistake: "PyTorch gradients accumulate by default. Forgetting optimizer.zero_grad() combines gradients from multiple batches and changes the intended update.",
    takeaway: "Backpropagation is the mathematical method; automatic differentiation is the framework machinery that applies it to a recorded graph."
  },
  "neural-network-training-loop": {
    intro: "A training loop repeatedly loads a mini-batch, makes predictions, calculates loss, computes gradients, updates parameters, and measures validation performance. Understanding this loop makes framework behavior much easier to debug.",
    analogy: "Practice, feedback, correction, and examination form one learning cycle. Training batches provide practice; loss gives feedback; the optimizer corrects; validation is the independent examination.",
    steps: ["Switch to training mode and iterate over shuffled mini-batches.", "Clear old gradients, run the forward pass, compute loss, backpropagate, and update parameters.", "Switch to evaluation mode and disable gradient tracking for validation.", "Record epoch-level loss and metrics; save the best checkpoint rather than only the last one."],
    exampleTitle: "One complete PyTorch epoch",
    example: "Training mode enables dropout and batch-statistic updates. Evaluation mode disables dropout and uses stored normalization statistics. Mixing these modes causes misleading or unstable validation results.",
    code: `model.train()\nfor x, y in train_loader:\n    x, y = x.to(device), y.to(device)\n    optimizer.zero_grad()\n    logits = model(x)\n    loss = criterion(logits, y)\n    loss.backward()\n    optimizer.step()\n\nmodel.eval()\nwith torch.no_grad():\n    for x, y in val_loader:\n        logits = model(x.to(device))\n        update_metrics(logits, y.to(device))`,
    mistake: "Evaluating on training batches measures memorization, not generalization. Keep validation data separate and never update parameters from it.",
    takeaway: "The explicit loop is clear gradients → forward → loss → backward → update, followed by a separate no-gradient validation phase."
  },
  "learning-rate-scheduling": {
    intro: "A learning-rate schedule changes the optimizer's step size during training. Callbacks observe training events and can save checkpoints, stop early, log metrics, or change the learning rate without rewriting the training algorithm.",
    analogy: "You take large steps when far from a destination and smaller steps when close. Warmup begins cautiously, scheduling accelerates useful learning, and decay supports fine adjustment.",
    steps: ["Choose an initial rate using a short baseline run.", "Optionally warm up to avoid unstable early updates.", "Decay by step, cosine curve, or validation plateau.", "Checkpoint the best validation result and stop when additional epochs no longer help."],
    exampleTitle: "Reducing the rate on a plateau",
    example: "When validation loss stops improving for three epochs, reduce the learning rate by half. Early stopping waits longer and restores the checkpoint with the lowest validation loss.",
    code: `from tensorflow.keras.callbacks import (\n    ReduceLROnPlateau, EarlyStopping, ModelCheckpoint\n)\n\ncallbacks = [\n    ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=3),\n    EarlyStopping(monitor="val_loss", patience=8, restore_best_weights=True),\n    ModelCheckpoint("best.keras", monitor="val_loss", save_best_only=True),\n]\nmodel.fit(train, validation_data=val, epochs=100, callbacks=callbacks)`,
    mistake: "Changing the learning rate based on test-set results leaks test information into training decisions. Schedules and early stopping must use training or validation signals.",
    takeaway: "Scheduling controls optimization over time; callbacks make training observable, recoverable, and less wasteful."
  },
  "vanishing-exploding-gradients": {
    intro: "During backpropagation, gradients are repeatedly multiplied through layers or time steps. Products much smaller than one vanish; products much larger than one explode. Either case prevents stable learning.",
    analogy: "A message whispered through many people fades away, while feedback through a microphone can grow into a deafening screech. Deep networks need mechanisms that keep signals in a useful range.",
    steps: ["Track gradient norms and activation distributions by layer.", "Use ReLU-family activations and He initialization in deep feedforward networks.", "Use normalization and residual connections to create stable signal paths.", "Clip gradients for recurrent or unstable training and lower the learning rate when appropriate."],
    exampleTitle: "Gradient clipping in an RNN",
    example: "If the global gradient norm reaches 500, a maximum norm of 1 rescales all gradients proportionally before the optimizer step. Clipping limits the update without changing its overall direction.",
    code: `optimizer.zero_grad()\nloss.backward()\n\ngrad_norm = torch.nn.utils.clip_grad_norm_(\n    model.parameters(), max_norm=1.0\n)\noptimizer.step()\nprint(f"Norm before clipping: {grad_norm:.2f}")`,
    mistake: "Gradient clipping hides symptoms but may not fix their cause. Also inspect initialization, architecture, normalization, sequence length, and learning rate.",
    takeaway: "Diagnose gradient flow directly; stable initialization, residual paths, normalization, gates, and clipping solve different parts of the problem."
  },
  "data-augmentation-deep-learning": {
    intro: "Data augmentation creates label-preserving variations of training examples so the model learns invariances instead of memorizing exact samples. The transformation must remain realistic for the problem.",
    analogy: "Recognizing a cup should not depend on one camera angle or brightness. Seeing the same cup under safe variations teaches the concept rather than the photograph.",
    steps: ["Identify transformations that should not change the target.", "Apply random augmentation only to training data.", "Visualize transformed samples and verify their labels remain valid.", "Compare validation performance and subgroup errors with and without augmentation."],
    exampleTitle: "Safe and unsafe image transformations",
    example: "Horizontal flipping is useful for many animal photos but can be wrong for road signs containing text. Large rotations may be valid for cells under a microscope but invalid for upright document recognition.",
    code: `import torchvision.transforms as T\n\ntrain_transform = T.Compose([\n    T.RandomResizedCrop(224, scale=(0.8, 1.0)),\n    T.RandomHorizontalFlip(),\n    T.ColorJitter(brightness=0.2, contrast=0.2),\n    T.ToTensor(),\n    T.Normalize(mean, std),\n])\n# Validation uses deterministic resize/crop only.`,
    mistake: "Augmenting validation or test samples changes the measurement target and can conceal how the model behaves on real inputs.",
    takeaway: "Good augmentation encodes justified invariances; unrealistic augmentation creates label noise."
  },
  "cnn-architectures-resnet": {
    intro: "CNN architecture evolved from simple stacked convolutions to deeper networks with specialized blocks. ResNet's residual connections made very deep networks easier to optimize by learning changes to an identity path.",
    analogy: "Instead of forcing every block to rewrite the whole message, a residual block keeps the original message on a shortcut and learns only the useful correction.",
    steps: ["LeNet established convolution and pooling for digit recognition.", "AlexNet scaled CNNs with ReLU, GPUs, dropout, and data augmentation.", "VGG used repeated small 3×3 convolutions; Inception mixed receptive-field sizes.", "ResNet added skip connections; later mobile networks used depthwise separable convolutions for efficiency."],
    exampleTitle: "A residual block",
    example: "A block calculates F(x) with convolutional layers, then returns ReLU(F(x) + x). If no transformation is needed, the block can learn F(x) near zero while the identity signal still flows.",
    code: `class ResidualBlock(nn.Module):\n    def __init__(self, channels):\n        super().__init__()\n        self.block = nn.Sequential(\n            nn.Conv2d(channels, channels, 3, padding=1),\n            nn.BatchNorm2d(channels), nn.ReLU(),\n            nn.Conv2d(channels, channels, 3, padding=1),\n            nn.BatchNorm2d(channels),\n        )\n    def forward(self, x):\n        return torch.relu(self.block(x) + x)`,
    mistake: "A deeper architecture is not automatically better. Dataset size, image resolution, latency, memory, and transfer learning usually matter more than chasing depth.",
    takeaway: "Study architecture history as a sequence of solved problems: scale, gradient flow, multi-scale features, and computational efficiency."
  },
  "gru-bidirectional-seq2seq": {
    intro: "GRUs are gated recurrent units with fewer gates than LSTMs. Bidirectional RNNs read a known sequence in both directions. Sequence-to-sequence models encode one sequence and decode another, often using attention.",
    analogy: "A GRU is a compact notebook with update and reset controls. A bidirectional reader considers both earlier and later words. A seq2seq translator reads the source before writing the target one token at a time.",
    steps: ["Use GRU or LSTM gates to preserve relevant long-range state.", "Use bidirectionality when the complete input is available before prediction.", "Encode the source sequence into contextual states.", "Decode the target autoregressively, attending to relevant source states at each step."],
    exampleTitle: "English-to-French translation",
    example: "The encoder processes the English sentence. During each French decoding step, attention weights identify the source words most relevant to the next French token. Teacher forcing can provide the correct previous token during training.",
    code: `encoder = nn.GRU(input_size=128, hidden_size=256,\n                 batch_first=True, bidirectional=True)\ndecoder = nn.GRU(input_size=128 + 512, hidden_size=256,\n                 batch_first=True)\n\nencoded, hidden = encoder(source_embeddings)\ncontext = attention(decoder_state, encoded, source_mask)`,
    mistake: "A bidirectional model cannot be used unchanged for causal streaming because future inputs are unavailable at prediction time.",
    takeaway: "GRUs simplify gating, bidirectional models use full-input context, and seq2seq attention connects generation to relevant source positions."
  },
  "self-supervised-contrastive-learning": {
    intro: "Self-supervised learning creates supervision from unlabeled data. Contrastive learning teaches an encoder to place related views close together in embedding space and unrelated examples farther apart.",
    analogy: "Show two cropped photographs of the same dog and teach the model that they belong together, without ever supplying the word ‘dog.’ The model learns reusable visual structure from agreement.",
    steps: ["Create two label-preserving views of each sample.", "Encode both views into normalized vectors.", "Maximize agreement for positive pairs while separating negatives or using a predictor/teacher mechanism.", "Evaluate representations with a linear probe or downstream fine-tuning."],
    exampleTitle: "Learning from unlabeled product images",
    example: "Random crops and color changes of one product form a positive pair. After pretraining on millions of unlabeled images, a small labeled dataset can train a high-quality category classifier.",
    code: `z1 = normalize(encoder(augment(images)))\nz2 = normalize(encoder(augment(images)))\n\nsimilarity = z1 @ z2.T / temperature\ntargets = torch.arange(len(images), device=images.device)\nloss = (cross_entropy(similarity, targets) +\n        cross_entropy(similarity.T, targets)) / 2`,
    mistake: "Augmentations define what information the representation ignores. An invalid augmentation can remove task-critical information.",
    takeaway: "Self-supervision converts abundant unlabeled data into reusable representations; contrastive objectives organize those representations by meaningful similarity."
  },
  "graph-neural-networks": {
    intro: "Graph Neural Networks learn from nodes and relationships rather than fixed grids or sequences. Each layer aggregates information from neighboring nodes and updates node representations.",
    analogy: "To understand one person in a social network, combine their own information with summaries from friends. Repeating the process includes friends-of-friends.",
    steps: ["Represent entities as nodes, relationships as edges, and optional attributes as features.", "Send or aggregate messages from neighboring nodes.", "Combine the aggregated message with each node's current state.", "Use node, edge, or graph-level outputs for the target task."],
    exampleTitle: "Classifying research papers",
    example: "Each paper is a node with text features; citations are edges. A GNN combines a paper's features with neighboring cited papers to predict its subject area.",
    code: `from torch_geometric.nn import GCNConv\n\nclass GCN(torch.nn.Module):\n    def __init__(self, in_dim, hidden, classes):\n        super().__init__()\n        self.conv1 = GCNConv(in_dim, hidden)\n        self.conv2 = GCNConv(hidden, classes)\n    def forward(self, x, edge_index):\n        x = self.conv1(x, edge_index).relu()\n        return self.conv2(x, edge_index)`,
    mistake: "Randomly splitting connected nodes can leak information through graph structure. Choose temporal, inductive, or edge-aware splits that match deployment.",
    takeaway: "GNNs learn by message passing over relationships and require graph-aware sampling and evaluation."
  },
  "debugging-neural-networks": {
    intro: "Debugging Deep Learning means locating whether a failure comes from data, labels, preprocessing, shapes, loss, gradients, optimization, evaluation, or deployment—not blindly changing architecture.",
    analogy: "When a car fails, replacing the engine first is expensive guesswork. Check fuel, battery, warning codes, and reproduce the symptom in a controlled test.",
    steps: ["Overfit a tiny batch to verify the model and loss can learn at all.", "Inspect raw and transformed examples with their labels.", "Log training/validation loss, metrics, learning rate, activations, and gradient norms.", "Analyze individual failures and change one hypothesis-driven variable at a time."],
    exampleTitle: "Loss stays flat",
    example: "First confirm labels match samples and parameters require gradients. Try 20 examples with augmentation disabled. If the network cannot reach near-zero training loss, inspect output activation, loss pairing, optimizer order, and detached tensors.",
    code: `# Powerful first test: memorize one tiny batch\nx_small, y_small = next(iter(train_loader))\nfor step in range(500):\n    optimizer.zero_grad()\n    loss = criterion(model(x_small.to(device)), y_small.to(device))\n    loss.backward()\n    optimizer.step()\nprint(loss.item())  # should become very small for a capable model`,
    mistake: "Changing the optimizer, architecture, augmentation, and learning rate simultaneously prevents you from learning which change helped.",
    takeaway: "Debug from the simplest falsifiable checks outward: data → tiny-batch learning → gradients → validation design → architecture."
  },
  "saving-deploying-deep-models": {
    intro: "A deployable model includes learned weights, architecture, preprocessing, label mapping, configuration, and version metadata. Checkpoints additionally preserve optimizer and scheduler state so training can resume.",
    analogy: "Saving only the cake is enough to eat once; resuming the bakery requires the recipe, ingredients, oven settings, inventory, and current production state.",
    steps: ["Save model weights plus versioned preprocessing and label definitions.", "For resumable training, also save optimizer, scheduler, epoch, random state, and best metric.", "Load onto an explicit device and switch to evaluation mode.", "Test the exported artifact against reference inputs before canary deployment."],
    exampleTitle: "A resumable PyTorch checkpoint",
    example: "The checkpoint stores state dictionaries rather than a fragile whole Python object. Deployment recreates the architecture, loads weights, calls eval(), and applies exactly the same normalization used during training.",
    code: `torch.save({\n    "epoch": epoch,\n    "model": model.state_dict(),\n    "optimizer": optimizer.state_dict(),\n    "scheduler": scheduler.state_dict(),\n    "labels": class_names,\n    "preprocessing_version": "images-v3",\n}, "checkpoint.pt")\n\ncheckpoint = torch.load("checkpoint.pt", map_location=device, weights_only=True)\nmodel.load_state_dict(checkpoint["model"])\nmodel.eval()`,
    mistake: "Forgetting model.eval() leaves dropout and batch normalization in training behavior, producing inconsistent inference.",
    takeaway: "Treat the model artifact as a versioned contract containing weights, preprocessing, labels, configuration, and reproducibility metadata."
  }
};

const pdfDeepLearningLessons: Record<string, Lesson> = {
  "math-foundations-deep-learning": {
    intro: "Deep Learning uses vectors to represent data, matrices to transform it, probability to describe uncertainty, and calculus to learn parameters. You do not need advanced proofs, but you should understand what each operation means.",
    analogy: "A vector is a location, a matrix is a machine that rotates or stretches locations, probability measures uncertainty, and a gradient is an arrow pointing uphill on the error landscape.",
    steps: ["Represent one example as a vector and a batch as a matrix or tensor.", "Use dot products, norms, and hyperplanes to measure similarity, size, and decision boundaries.", "Use probability distributions, Bayes' rule, Gaussian noise, and KL divergence to model uncertainty.", "Use Taylor expansion, gradients, and Hessians to understand local changes in loss."],
    exampleTitle: "One linear neuron",
    example: "For x = [2, 3] and w = [0.5, -1], the dot product is -2. Adding a bias and activation turns this geometric projection into a prediction; a gradient tells us how to change each weight.",
    code: "import torch\n\nx = torch.tensor([2.0, 3.0])\nw = torch.tensor([0.5, -1.0], requires_grad=True)\ny = torch.dot(x, w) + 0.2\nloss = (y - 1.0) ** 2\nloss.backward()\nprint(w.grad)",
    mistake: "Memorizing formulas without tracking tensor shapes makes even simple neural-network code difficult to debug.",
    takeaway: "Vectors hold features, matrices transform them, probability handles uncertainty, and gradients drive learning."
  },
  "mlp-universal-approximation": {
    intro: "A multilayer perceptron stacks fully connected layers and nonlinear activations. Universal approximation says a suitable network can approximate many continuous functions; it does not say that training will find the best network efficiently.",
    analogy: "Many adjustable line segments can trace a curved road. More segments increase flexibility, but somebody still has to position them correctly.",
    steps: ["A layer computes a weighted sum and bias.", "A nonlinear activation prevents stacked layers from collapsing into one linear map.", "Width supplies parallel features while depth composes features into reusable stages.", "Data, optimization, regularization, and architecture decide whether theoretical expressivity becomes useful generalization."],
    exampleTitle: "Learning XOR",
    example: "One linear boundary cannot separate XOR. A hidden layer creates intermediate features that divide the input space, and the output layer combines them into the correct nonlinear decision.",
    code: "model = torch.nn.Sequential(\n    torch.nn.Linear(2, 4),\n    torch.nn.ReLU(),\n    torch.nn.Linear(4, 1),\n    torch.nn.Sigmoid()\n)",
    mistake: "Universal approximation is an existence result, not a guarantee that any large model will train well or predict unseen data correctly.",
    takeaway: "Nonlinearity gives MLPs expressive power; width and depth organize that power in different ways."
  },
  "advanced-neural-optimization": {
    intro: "Beyond SGD and Adam, optimization methods change either the learning rate, the update direction, or the curvature information used to move across a loss surface.",
    analogy: "Walking downhill can use the local slope, accumulated momentum, a look-ahead step, or a map of the valley's curvature.",
    steps: ["SAG reduces noisy updates by remembering sample gradients.", "Nesterov momentum evaluates the gradient near the anticipated next position.", "Conjugate gradient chooses directions that avoid undoing earlier progress on quadratic problems.", "Newton and quasi-Newton methods such as BFGS use curvature but require more memory or computation."],
    exampleTitle: "Using Nesterov momentum",
    example: "Ordinary momentum can overshoot a narrow minimum. Nesterov looks ahead before calculating the correction, which can react earlier when the surface bends.",
    code: "optimizer = torch.optim.SGD(\n    model.parameters(), lr=0.01,\n    momentum=0.9, nesterov=True\n)",
    mistake: "A mathematically sophisticated optimizer is not automatically faster for a large noisy minibatch problem.",
    takeaway: "Choose an optimizer by scale, noise, curvature cost, memory, and measured validation performance."
  },
  "normalization-methods": {
    intro: "Normalization stabilizes values, but different methods normalize across different dimensions. The right choice depends on batch size, architecture, and task.",
    analogy: "You can compare scores across an entire class, within one student, or within groups of subjects; each comparison answers a different question.",
    steps: ["Input normalization scales raw features before the network.", "Layer normalization normalizes features within each sample and works well for sequence models.", "Instance normalization treats each image channel separately and is common in style tasks.", "Group normalization divides channels into groups and remains stable with small batches."],
    exampleTitle: "Training vision models with tiny batches",
    example: "Batch statistics become noisy when only two images fit in memory. Group normalization uses channel groups within each image, so it does not depend on a large batch.",
    code: "block = torch.nn.Sequential(\n    torch.nn.Conv2d(64, 64, 3, padding=1),\n    torch.nn.GroupNorm(num_groups=8, num_channels=64),\n    torch.nn.ReLU()\n)",
    mistake: "Changing normalization without checking which axes it uses can silently alter the model's behavior.",
    takeaway: "Batch, layer, instance, and group normalization differ mainly in which values share normalization statistics."
  },
  "label-smoothing-distillation-ensembles": {
    intro: "Label smoothing, knowledge distillation, and neural ensembles improve generalization in different ways: softer targets, teacher guidance, and multiple-model agreement.",
    analogy: "Instead of insisting an answer is absolutely certain, allow a small doubt; ask an expert to teach nuances; or consult several independent experts.",
    steps: ["Label smoothing moves a little probability from the correct class to alternatives.", "Distillation trains a student from a teacher's soft probability distribution.", "Bagging trains models on different resampled datasets.", "An ensemble averages probabilities or votes, then is evaluated against the cost of extra inference."],
    exampleTitle: "A less overconfident classifier",
    example: "With smoothing 0.1 in a ten-class problem, the target is no longer exactly one-hot. The model is discouraged from becoming certain when training labels contain ambiguity.",
    code: "criterion = torch.nn.CrossEntropyLoss(label_smoothing=0.1)\nlogits = model(images)\nloss = criterion(logits, labels)",
    mistake: "Too much smoothing can erase useful class distinctions, and ensembles can multiply deployment cost.",
    takeaway: "Soft targets and model diversity can improve calibration and generalization when applied conservatively."
  },
  "deep-learning-generalization": {
    intro: "Generalization is the ability to perform well on unseen data. Deep networks complicate the classical picture because very large models can pass through an interpolation peak and improve again.",
    analogy: "A learner may first memorize, then—with enough practice and structure—discover the underlying rule. More capacity is neither automatically good nor automatically bad.",
    steps: ["Compare training, validation, and test behavior rather than parameter count alone.", "Use bias and variance to diagnose underfitting and unstable predictions.", "Double descent describes error falling, rising near interpolation, and sometimes falling again as capacity grows.", "Grokking describes delayed generalization after training accuracy is already near perfect."],
    exampleTitle: "Tracking delayed generalization",
    example: "A network memorizes a small modular-arithmetic dataset quickly but validation accuracy stays low. With continued regularized training, validation accuracy suddenly improves, demonstrating grokking-like behavior.",
    code: "history.append({\n    'epoch': epoch,\n    'train_acc': train_accuracy(model),\n    'valid_acc': valid_accuracy(model)\n})\n# Plot both curves; do not inspect training accuracy alone.",
    mistake: "The no-free-lunch principle means no architecture is best for every possible dataset; benchmark success does not remove task-specific evaluation.",
    takeaway: "Generalization must be measured empirically, especially for over-parameterized networks with non-classical behavior."
  },
  "curriculum-meta-few-shot": {
    intro: "Curriculum learning controls the order of examples, self-paced learning lets the model select manageable examples, and meta-learning trains systems to adapt quickly to new tasks.",
    analogy: "Students usually learn addition before algebra; an experienced learner also develops a strategy for learning a new subject from only a few demonstrations.",
    steps: ["Define a difficulty or pacing score for curriculum learning.", "Move from easier or cleaner examples toward harder ones.", "In meta-learning, train across many tasks with separate support and query examples.", "In few-shot learning, adapt or compare embeddings using only a small support set."],
    exampleTitle: "Few-shot image classification",
    example: "An embedding network sees many training tasks. For a new three-class problem with five examples per class, it predicts by comparing query embeddings with class prototypes.",
    code: "prototypes = support_embeddings.reshape(3, 5, -1).mean(dim=1)\ndistances = torch.cdist(query_embeddings, prototypes)\npredictions = distances.argmin(dim=1)",
    mistake: "If examples from the same underlying task leak into meta-training and meta-testing, few-shot performance will look unrealistically strong.",
    takeaway: "Curricula control learning order; meta-learning develops an adaptation strategy; few-shot learning applies it with little data."
  },
  "unet-deeplab-gradcam": {
    intro: "U-Net and DeepLab produce pixel-level predictions, while Grad-CAM helps explain which image regions influenced a classifier's decision.",
    analogy: "A classifier labels the whole photograph; a segmentation model colors every pixel; Grad-CAM highlights the regions that persuaded the classifier.",
    steps: ["U-Net compresses features and then upsamples them, using skip connections to recover fine detail.", "DeepLab uses atrous convolutions and multi-scale context without excessive downsampling.", "Grad-CAM averages output gradients across feature maps.", "The weighted feature maps form a heatmap that is resized over the image."],
    exampleTitle: "Segmenting a medical scan",
    example: "U-Net's encoder recognizes the organ, while skip connections supply boundary detail to the decoder. Grad-CAM can separately inspect whether a classification head attended to the relevant region.",
    code: "features.register_hook(save_gradients)\nscore = logits[0, target_class]\nscore.backward()\nweights = gradients.mean(dim=(2, 3), keepdim=True)\nheatmap = (weights * features).sum(dim=1).relu()",
    mistake: "A Grad-CAM heatmap is an explanatory clue, not proof that the model reasons correctly or causally.",
    takeaway: "U-Net and DeepLab localize predictions; Grad-CAM visualizes influential spatial features."
  },
  "vision-transformers": {
    intro: "A Vision Transformer divides an image into patches, converts patches into tokens, adds positional information, and processes them with self-attention.",
    analogy: "Cut a picture into tiles, write a short description for each tile, then let every tile compare itself with every other tile to understand the whole scene.",
    steps: ["Split the image into fixed-size patches.", "Flatten and project each patch into an embedding.", "Add positional embeddings and optionally a classification token.", "Apply transformer blocks and use the final representation for classification or dense prediction."],
    exampleTitle: "Classifying a 224 by 224 image",
    example: "With 16 by 16 patches, the image becomes 196 tokens. Self-attention can directly connect distant regions, such as two separated parts of the same object.",
    code: "patches = patch_embed(images)          # [batch, 196, dim]\ntokens = patches + position_embeddings\nencoded = transformer(tokens)\nlogits = classifier(encoded[:, 0])",
    mistake: "Self-attention has quadratic cost in token count, so very small patches can make high-resolution images expensive.",
    takeaway: "Vision Transformers trade convolution's local bias for global token-to-token attention."
  },
  "state-space-bptt": {
    intro: "A recurrent model is a nonlinear state-space system: a hidden state summarizes the past, and Backpropagation Through Time trains the repeated transition by unrolling it across a sequence.",
    analogy: "A running diary compresses everything that happened before today; training opens several diary pages and traces how an earlier note affected a later decision.",
    steps: ["Begin with linear sequence baselines such as AR, moving-average, ARMA, and NARX models.", "Update a nonlinear hidden state from the current input and previous state, optionally using leaky or gated skip-through-time connections.", "Unroll the recurrent or recursive computation across sequence positions.", "Apply the chain rule with Backpropagation Through Time, often truncating long sequences to control cost."],
    exampleTitle: "Forecasting a sensor sequence",
    example: "The state carries recent trends and produces the next estimate. Truncated BPTT learns from windows of 50 steps instead of retaining the entire history in memory.",
    code: "state = model.initial_state(batch_size)\nfor window in sequence.split(50, dim=1):\n    output, state = model(window, state)\n    loss = criterion(output, targets_for(window))\n    loss.backward()\n    state = state.detach()",
    mistake: "Forgetting to detach state between truncated windows keeps the entire old computation graph and can exhaust memory.",
    takeaway: "State summarizes history; BPTT trains recurrent transitions by differentiating through their time-unrolled graph."
  },
  "attention-transformers-deep-learning": {
    intro: "Attention lets a model retrieve the most relevant information for the current task. Transformers build sequence processing almost entirely from self-attention and feed-forward blocks.",
    analogy: "When answering a question about a paragraph, you look directly at the words that matter instead of compressing the entire paragraph into one memory.",
    steps: ["Queries describe what each position seeks; keys describe what positions contain; values carry usable information.", "Scaled dot products produce attention scores and softmax weights.", "Multiple heads learn different relationships in parallel.", "Positional encoding, residual connections, normalization, feed-forward layers, and masking complete the transformer block."],
    exampleTitle: "Causal next-token prediction",
    example: "A causal mask prevents a token from reading future tokens. During inference, stored keys and values form a KV cache so earlier context does not need to be recomputed.",
    code: "scores = query @ key.transpose(-2, -1) / math.sqrt(query.size(-1))\nscores = scores.masked_fill(causal_mask == 0, float('-inf'))\nweights = scores.softmax(dim=-1)\ncontext = weights @ value",
    mistake: "Attention is position-invariant without positional information, and unmasked attention leaks future information in causal tasks.",
    takeaway: "QKV attention performs content-based retrieval; transformers combine it with position, residual paths, normalization, and MLP blocks."
  },
  "autoencoder-variants": {
    intro: "Autoencoder variants change the bottleneck or training objective to learn useful representations instead of merely copying the input.",
    analogy: "A good summary can be made shorter, resistant to damaged pages, or limited to a small vocabulary; each restriction teaches a different kind of representation.",
    steps: ["A linear undercomplete autoencoder learns the same principal subspace as PCA, while a sparse autoencoder encourages most latent activations to be zero.", "A denoising autoencoder reconstructs clean data from a corrupted input.", "A contractive autoencoder penalizes sensitivity of the latent representation to small input changes.", "A variational autoencoder learns a probability distribution for sampling and belongs in the Generative AI path."],
    exampleTitle: "Removing noise from images",
    example: "Training inputs receive random noise while targets remain clean. The encoder must preserve stable structure rather than pixel-perfect corruption.",
    code: "noisy = (images + 0.2 * torch.randn_like(images)).clamp(0, 1)\nreconstructed = autoencoder(noisy)\nloss = torch.nn.functional.mse_loss(reconstructed, images)",
    mistake: "An unconstrained, overpowered autoencoder can learn an identity function and produce an unhelpful latent space.",
    takeaway: "Sparsity, corruption, contraction, and probabilistic bottlenecks create representations with different useful properties."
  },
  "pinn-kan-topological-networks": {
    intro: "Emerging neural architectures introduce specialized prior knowledge: PINNs enforce physical equations, KANs learn functions on connections, and topological networks carry information over structured spaces.",
    analogy: "A general learner sees examples only; a specialist also receives the laws of physics, a flexible formula book, or a map of how regions and relationships fit together.",
    steps: ["A Physics-Informed Neural Network adds differential-equation residuals and boundary conditions to its loss.", "A Kolmogorov-Arnold Network replaces fixed edge weights with learnable one-dimensional functions.", "Graph networks operate on nodes and edges.", "Topological and sheaf or cosheaf-inspired networks extend message passing to higher-order relationships and consistency constraints."],
    exampleTitle: "Learning a heat equation solution",
    example: "A PINN predicts temperature from position and time. Automatic differentiation computes derivatives, and the loss penalizes violations of the heat equation plus boundary observations.",
    code: "temperature = model(x, t)\ndt = grad(temperature, t, create_graph=True)[0]\ndx = grad(temperature, x, create_graph=True)[0]\ndxx = grad(dx, x, create_graph=True)[0]\nphysics_loss = ((dt - alpha * dxx) ** 2).mean()",
    mistake: "Specialized inductive bias helps only when its assumptions and numerical optimization match the real problem.",
    takeaway: "PINNs, KANs, and topological networks add domain structure that ordinary dense networks do not encode explicitly."
  },
};
const auditedExpansionLessons: Record<string, Lesson> = {
  "stable-latent-diffusion": {
    intro: "Stable Diffusion is a text-to-image system that performs diffusion inside a smaller, compressed representation called latent space. This makes image generation much faster than repeatedly processing every full-resolution pixel.",
    analogy: "Instead of repeatedly editing a huge wall painting, make the changes on a compact sketch and enlarge the finished sketch at the end.",
    steps: ["A tokenizer and text encoder turn the prompt into meaning-rich vectors.", "A VAE compresses an image into latent space during training.", "A U-Net learns to remove noise while reading the text vectors.", "A scheduler controls each denoising step, and the VAE decoder converts the final latent into pixels."],
    exampleTitle: "Generating a watercolor lighthouse",
    example: "The prompt is encoded once. Generation starts from random latent noise; the U-Net gradually shapes it toward a lighthouse that matches the prompt. The VAE decoder then produces the visible image.",
    code: "from diffusers import StableDiffusionPipeline\n\npipe = StableDiffusionPipeline.from_pretrained(model_id)\nimage = pipe(\"a watercolor lighthouse at sunrise\").images[0]\nimage.save(\"lighthouse.png\")",
    mistake: "The model does not search a picture database. It begins with noise and creates a new sample guided by patterns learned during training.",
    takeaway: "Stable Diffusion combines text conditioning, latent denoising, a U-Net, a scheduler, and a VAE decoder."
  },
  "controlling-diffusion-models": {
    intro: "Diffusion controls let us influence composition, style, strength, and editable regions instead of accepting whatever a text prompt happens to produce.",
    analogy: "A prompt tells an artist what to paint; a pose sketch, mask, and reference image also tell the artist where and how to paint it.",
    steps: ["Use classifier-free guidance to control how strongly the prompt influences the result.", "Use negative prompts to discourage unwanted features.", "Use image-to-image strength to retain more or less of a starting image.", "Use masks for inpainting or ControlNet for pose, depth, edges, and layout."],
    exampleTitle: "Replacing only a product background",
    example: "A mask marks the background while protecting the product. The prompt requests a clean studio desk, so denoising changes only the masked region and keeps the product recognizable.",
    code: "result = inpaint_pipe(\n    prompt=\"a clean studio desk, soft daylight\",\n    negative_prompt=\"text, watermark, clutter\",\n    image=photo, mask_image=background_mask\n).images[0]",
    mistake: "Very high guidance can reduce diversity and create harsh artifacts; stronger control is not always better quality.",
    takeaway: "Guidance, masks, reference images, and structural conditions turn diffusion from random generation into directed editing."
  },
  "finetuning-image-models": {
    intro: "Fine-tuning adapts an existing image model to a person, product, character, or visual style without training a foundation model from zero.",
    analogy: "A skilled illustrator already knows how to draw; you only provide a small reference folder to teach one new character or style.",
    steps: ["Prepare clean, varied images with useful captions.", "Choose textual inversion for a learned concept token, DreamBooth for stronger subject learning, or LoRA for small portable adapters.", "Train conservatively while checking samples.", "Test prompts and situations that were not in the training set."],
    exampleTitle: "Teaching a model one product",
    example: "Twenty product photos from different angles train a small LoRA adapter. Later prompts can place the product on a desk or in a catalog scene while the base model remains unchanged.",
    code: "# Load a small adapter on top of the base model\npipe.load_lora_weights(\"./product-lora\")\nimage = pipe(\"product_xyz on a marble table\").images[0]",
    mistake: "Training too long on a tiny, repetitive dataset can copy backgrounds and poses instead of learning the subject itself.",
    takeaway: "Choose the lightest adaptation method that preserves identity and generalizes beyond the reference images."
  },
  "audio-music-video-generation": {
    intro: "Generative models can create speech, sound, music, and sequences of video frames. Each modality adds its own timing, consistency, and evaluation challenges.",
    analogy: "A single picture must look right once; a video must keep the same actor, objects, motion, lighting, and physics believable across many pictures.",
    steps: ["Represent audio as waveforms, spectrograms, or learned tokens and video as spatial-temporal features.", "Condition generation on text, images, audio, or motion.", "Generate or decode the media.", "Evaluate identity, timing, synchronization, continuity, safety, and rights."],
    exampleTitle: "Creating narration for a lesson",
    example: "A text-to-speech model turns a paragraph into audio. The application checks pronunciation, duration, speaker consent, and loudness before publishing it.",
    code: "inputs = processor(text=lesson_text, return_tensors=\"pt\")\naudio = model.generate_speech(**inputs)\nsave_audio(\"lesson.wav\", audio, sample_rate=16000)",
    mistake: "A good-looking individual video frame does not guarantee stable motion or consistent characters across the full clip.",
    takeaway: "Media generation requires modality-specific checks in addition to the ordinary quality and safety checks used for text."
  },
  "evaluating-generative-models": {
    intro: "Generative evaluation measures several qualities at once because there is rarely one exact correct output. Useful evaluation combines automatic metrics with structured human judgment.",
    analogy: "Judging a meal by temperature alone misses taste, appearance, nutrition, and whether the customer actually ordered it.",
    steps: ["Define quality dimensions for the real use case.", "Build fixed representative and adversarial prompts.", "Use suitable metrics such as FID or CLIP similarity only for the dimension they approximate.", "Run blind human comparisons and inspect failures by category."],
    exampleTitle: "Comparing two product-image models",
    example: "Reviewers score prompt adherence, product identity, realism, text errors, diversity, and unsafe outputs. Cost and latency are recorded beside quality rather than hidden.",
    code: "scorecard = {\n  \"prompt_adherence\": 4.2, \"identity\": 4.6,\n  \"artifact_rate\": 0.07, \"latency_s\": 3.1\n}\nprint(scorecard)",
    mistake: "Optimizing a single metric can reward repetitive or visually plausible images that do not follow the prompt.",
    takeaway: "Evaluate the qualities users care about separately, then combine metrics, human review, cost, and safety."
  },
  "choosing-generative-model": {
    intro: "GANs, VAEs, diffusion models, and autoregressive models solve different generation problems. Model choice should follow the output, data, controllability, speed, and budget requirements.",
    analogy: "A bicycle, van, and airplane all transport people, but the best choice depends on distance, load, cost, and speed.",
    steps: ["Define the required modality and quality.", "Decide whether reconstruction, likelihood, controllability, or fast sampling matters most.", "Compare available pretrained models before considering training.", "Test shortlisted models on the same evaluation set."],
    exampleTitle: "Selecting a model for catalog images",
    example: "A diffusion model offers strong text control and editing. A GAN may generate a narrow product style quickly. A VAE provides useful latent representations but usually softer images.",
    code: "requirements = {\"text_control\": True, \"editing\": True}\nchoice = \"diffusion\" if all(requirements.values()) else \"compare candidates\"\nprint(choice)",
    mistake: "Choosing the newest or largest model before measuring the task can increase cost without improving the user experience.",
    takeaway: "Select a model family by constraints, then select a specific model using representative tests."
  },
  "llm-data-preparation": {
    intro: "An LLM learns from the examples it receives, so data quality often matters more than simply adding more text. Preparation removes harmful noise and makes the desired behavior explicit.",
    analogy: "A student given duplicated, contradictory, or wrongly labeled textbooks will learn those problems along with the useful material.",
    steps: ["Collect data with permission and record its source.", "Normalize formats, remove broken text, secrets, unsafe records, and near-duplicates.", "Create instruction, context, and response fields when supervised fine-tuning is planned.", "Split by source or time to prevent near-identical examples leaking into evaluation."],
    exampleTitle: "Preparing support conversations",
    example: "Remove customer identifiers, merge repeated templates, keep high-quality resolved conversations, and hold out the newest product area to test real generalization.",
    code: "rows = load_records()\nrows = [redact_pii(r) for r in rows]\nrows = quality_filter(deduplicate(rows))\ntrain, valid, test = split_by_source(rows)",
    mistake: "Random row splitting after chunking can put pieces of the same document in both training and evaluation.",
    takeaway: "Traceable, cleaned, deduplicated, representative data is the foundation of trustworthy LLM training."
  },
  "llm-scaling-laws": {
    intro: "Scaling laws describe predictable relationships between model size, training tokens, compute, and loss. They help teams allocate a fixed budget instead of making a model large but undertrained.",
    analogy: "Building a larger school without enough books or teaching time creates empty classrooms rather than better learning.",
    steps: ["Estimate the available compute budget.", "Balance parameter count with enough high-quality training tokens.", "Run smaller experiments to estimate trends.", "Include inference cost and latency before choosing the final size."],
    exampleTitle: "Choosing between two training plans",
    example: "A 13B model trained on too few tokens may perform worse than a smaller model trained on sufficient diverse data, while also costing more to serve.",
    code: "plans = [{\"params_b\": 7, \"tokens_b\": 140}, {\"params_b\": 13, \"tokens_b\": 60}]\nfor p in plans:\n    p[\"tokens_per_parameter\"] = p[\"tokens_b\"] / p[\"params_b\"]",
    mistake: "Parameter count alone is not a reliable measure of capability, quality, or suitability for a particular task.",
    takeaway: "Treat parameters, data, compute, and serving cost as a connected allocation problem."
  },
  "distributed-llm-training": {
    intro: "Large models and batches may not fit on one accelerator. Distributed training divides data, parameters, layers, or optimizer state across devices while keeping updates coordinated.",
    analogy: "A large book can be processed by giving different copies to readers, different chapters to specialists, or different editing tasks to separate teams.",
    steps: ["Use data parallelism when each device can hold the model.", "Shard parameters with tensor or fully sharded parallelism when it cannot.", "Use pipeline parallelism to place layer groups on different devices.", "Combine mixed precision, gradient accumulation, checkpointing, and failure recovery."],
    exampleTitle: "Training when one batch does not fit",
    example: "Four micro-batches accumulate gradients before one optimizer step. This simulates a larger effective batch without storing all examples at once.",
    code: "optimizer.zero_grad()\nfor micro_batch in micro_batches:\n    (model(**micro_batch).loss / len(micro_batches)).backward()\noptimizer.step()",
    mistake: "Adding devices does not guarantee proportional speed; communication and uneven workloads can dominate training time.",
    takeaway: "Distributed strategies solve different memory limits, and their communication costs must be measured."
  },
  "knowledge-distillation": {
    intro: "Knowledge distillation trains a smaller student model to imitate the probability patterns or outputs of a larger teacher model.",
    analogy: "An expert creates carefully explained practice answers so a junior learner can absorb useful judgment without repeating the expert's entire education.",
    steps: ["Choose a capable teacher and a smaller student.", "Collect representative inputs and teacher outputs or logits.", "Train the student using hard labels, teacher targets, or both.", "Compare task quality, size, speed, and subgroup failures."],
    exampleTitle: "Compressing an intent classifier",
    example: "The teacher assigns probabilities across all intents. Those soft probabilities show that billing and refund are related, giving the student more information than one correct label.",
    code: "teacher_probs = softmax(teacher_logits / temperature)\nstudent_log_probs = log_softmax(student_logits / temperature)\nloss = kl_div(student_log_probs, teacher_probs)",
    mistake: "Distillation can reproduce the teacher's biases and errors; the student still requires independent evaluation.",
    takeaway: "Distillation transfers behavior into a smaller model; quantization stores a model's numbers more compactly."
  },
  "efficient-llm-serving": {
    intro: "Efficient serving produces useful tokens quickly for many users. It manages memory, batches requests, and avoids repeating calculations without changing the model's intended behavior.",
    analogy: "A restaurant improves service by preparing shared ingredients once, grouping compatible orders, and keeping tables moving—not by making each cook restart every dish.",
    steps: ["Cache attention keys and values from earlier tokens.", "Batch active requests continuously rather than waiting for a fixed group.", "Use paged memory management and suitable quantization.", "Measure time to first token, output speed, throughput, memory, errors, and cost."],
    exampleTitle: "Balancing chat speed and throughput",
    example: "Interactive users need a fast first token, while offline summarization favors larger batches. Separate queues can optimize both workloads.",
    code: "metrics = {\"time_to_first_token_ms\": 180, \"tokens_per_second\": 42, \"queue_ms\": 25}\nif metrics[\"queue_ms\"] > 100:\n    scale_replicas()",
    mistake: "Reporting only tokens per second hides queue delay and the wait before the user sees the first token.",
    takeaway: "Optimize and report latency, throughput, memory, reliability, and cost together."
  },
  "structured-output-function-calling": {
    intro: "Structured output asks an LLM to produce data that follows a schema. Function calling additionally lets it propose a named operation and arguments; application code validates and executes the operation.",
    analogy: "Instead of accepting a free-form shopping note, require a form with product, quantity, and delivery date fields before placing an order.",
    steps: ["Define a narrow JSON schema or typed model.", "Give the model available function names and descriptions.", "Validate types, ranges, permissions, and business rules in normal code.", "Execute approved calls and return results to the model only when needed."],
    exampleTitle: "Looking up weather safely",
    example: "The model proposes get_weather with a city and date. Code rejects an invalid date, calls the read-only service for valid arguments, and formats the result.",
    code: "class WeatherArgs(BaseModel):\n    city: str\n    date: datetime.date\n\nargs = WeatherArgs.model_validate(tool_call.arguments)\nresult = get_weather(**args.model_dump())",
    mistake: "Valid JSON is not automatically safe. Schema validation does not replace authorization or user confirmation.",
    takeaway: "Models propose structured intent; trusted code validates permissions and performs real actions."
  },
  "advanced-rag": {
    intro: "Advanced RAG improves what enters the context through better parsing, chunking, querying, retrieval, filtering, and reranking.",
    analogy: "A librarian may search exact keywords and meanings, rewrite a vague question, then rank the best passages before handing them to a researcher.",
    steps: ["Parse documents while preserving headings, tables, and metadata.", "Choose chunks that preserve meaning and test multiple sizes.", "Combine dense semantic retrieval with BM25 keyword retrieval.", "Rewrite queries, filter metadata, rerank candidates, and send only the strongest evidence."],
    exampleTitle: "Finding an exact policy clause",
    example: "Semantic search finds related leave policies while BM25 catches the exact policy number. Reciprocal rank fusion combines both lists and a reranker selects the final passages.",
    code: "dense = vector_search(query, k=20)\nkeyword = bm25_search(query, k=20)\ncandidates = reciprocal_rank_fusion(dense, keyword)\ncontext = rerank(query, candidates)[:5]",
    mistake: "Retrieving more chunks can reduce accuracy by burying the answer in irrelevant or conflicting context.",
    takeaway: "RAG quality depends on the whole retrieval pipeline, not only the embedding model."
  },
  "rag-evaluation": {
    intro: "RAG evaluation separates retrieval quality from answer quality so teams can locate whether failures came from missing evidence or poor use of good evidence.",
    analogy: "If a student answers incorrectly, first check whether the right book was supplied, then whether the student used that book correctly.",
    steps: ["Create questions with expected answers and relevant source passages.", "Measure retrieval recall, precision, and ranking.", "Measure answer correctness, relevance, citation accuracy, and faithfulness to context.", "Test unanswerable questions and inspect results by document type."],
    exampleTitle: "Diagnosing a wrong support answer",
    example: "If the correct paragraph is absent from the top results, improve retrieval. If it is present but the response contradicts it, improve prompting, context selection, or the answer model.",
    code: "retrieval_recall = found_relevant / total_relevant\nfaithful = all(claim_supported(c, context) for c in answer_claims)\nprint(retrieval_recall, faithful)",
    mistake: "Using another LLM as the only judge can hide evaluator bias; calibrate judges against human-reviewed examples.",
    takeaway: "Evaluate retrieval and generation separately, including abstention when evidence is unavailable."
  },
  "reasoning-models": {
    intro: "Reasoning models spend additional inference computation decomposing, exploring, or verifying difficult problems before producing an answer.",
    analogy: "A quick mental estimate is fine for a tip, while a structural engineer should work through checks before approving a bridge calculation.",
    steps: ["Route genuinely complex tasks to a reasoning-capable model.", "Provide clear goals, constraints, and verifiable data.", "Use tools or deterministic checks for calculations and factual lookup.", "Set effort, latency, token, and stopping budgets and evaluate final results."],
    exampleTitle: "Planning a constrained schedule",
    example: "The model proposes a schedule, a normal program checks every constraint, and the model revises only if validation fails.",
    code: "proposal = reasoning_model.solve(problem)\nviolations = validate_schedule(proposal)\nif violations:\n    proposal = reasoning_model.revise(proposal, violations)",
    mistake: "More hidden reasoning does not guarantee truth; unverifiable facts and calculations still require evidence or tools.",
    takeaway: "Use extra inference effort selectively and pair it with external verification."
  },
  "llm-benchmarking-selection": {
    intro: "Model selection compares candidates on the exact work, users, risks, latency, privacy, and budget of an application—not on one public leaderboard score.",
    analogy: "A racing car can lead a speed chart and still be a poor delivery vehicle because cargo, reliability, and operating cost matter.",
    steps: ["Build a versioned evaluation set from real task categories.", "Define correctness, format, safety, latency, and cost thresholds.", "Run candidates with equivalent prompts and settings.", "Inspect paired failures, confidence intervals, and important subgroups before deciding."],
    exampleTitle: "Selecting a support model",
    example: "A smaller model wins because it meets the accuracy threshold, follows the response schema more reliably, and costs less, even though a larger model leads general benchmarks.",
    code: "eligible = [m for m in results if m.accuracy >= .90 and m.unsafe_rate <= .01]\nbest = min(eligible, key=lambda m: m.cost_per_1000_requests)",
    mistake: "Benchmark contamination and task mismatch can make public scores look better than real application performance.",
    takeaway: "Choose models with reproducible, task-specific evaluation and explicit operating constraints."
  },
  "agent-context-engineering": {
    intro: "Context engineering decides what the model sees for its next decision: trusted instructions, the user request, tool definitions and results, retrieved evidence, recent history, and current working state. It is different from durable memory—the context is the selected working packet for this step, while memory is information that may be stored and recalled later.",
    analogy: "A pilot needs the flight plan, current instruments, and important alerts—not every message ever received by the airline.",
    steps: ["Separate system and developer instructions, the user request, working state, and untrusted retrieved content by role and trust level.", "Select only tool definitions, memories, documents, and history relevant to the next decision.", "Compress or summarize older material while preserving confirmed facts, decisions, constraints, citations, and open commitments.", "Reserve token space for new tool results instead of filling the context before the agent acts.", "For long tasks, refresh a compact state summary and test for lost constraints, noisy evidence, or context poisoning at important checkpoints."],
    exampleTitle: "A support agent handling a returning customer",
    example: "The agent receives policy rules, the current ticket, a short verified customer summary, and the latest tool result instead of fifty full past conversations.",
    code: "context = [system_policy, current_task]\ncontext += retrieve_relevant_memories(current_task, limit=3)\ncontext += [latest_tool_result]\nresponse = model(context)",
    mistake: "A larger context is not automatically a better context. Noise can hide important constraints, and placing retrieved pages beside trusted instructions without boundaries can let hostile text influence agent behavior.",
    takeaway: "Construct each next-step context deliberately by trust level, relevance, recency, and token budget; compress long histories without losing decisions or commitments."
  },
  "agent-state-graphs": {
    intro: "A state graph represents an agent as explicit steps and conditional transitions. It combines flexible model decisions with deterministic control that developers can inspect and test.",
    analogy: "A metro map allows choices at junctions, but every valid route still follows named stations and tracks.",
    steps: ["Define typed state containing inputs, intermediate results, status, counters, and the information each node may update.", "Create nodes for deterministic work, model-directed decisions, tools, validation, and human review; connect them with named edges.", "Add conditional routing, bounded loops, parallel branches, and explicit stop rules only where the task needs them.", "Use patterns such as orchestrator-worker for parallel subtasks and evaluator-optimizer for bounded revision.", "Inspect and test every state transition; add persistence and resume behavior in the durable-agent layer when the workflow must survive interruption."],
    exampleTitle: "A research workflow",
    example: "The planner chooses questions, search gathers sources, a validator checks coverage, and the graph either requests more evidence or sends the draft to final review.",
    code: "graph.add_edge(\"plan\", \"search\")\ngraph.add_conditional_edges(\n    \"validate\", route,\n    {\"enough\": \"write\", \"more\": \"search\", \"stop\": END}\n)",
    mistake: "Hiding all control inside one agent prompt makes loops and recovery paths difficult to observe or test.",
    takeaway: "Graphs make state, deterministic steps, model-directed branches, loops, parallel work, and stop conditions explicit and testable."
  },
  "durable-long-running-agents": {
    intro: "Durable agents persist progress so a task can survive restarts, wait for an external event or human decision, and resume from a checkpoint without repeating completed side effects. Human-in-the-loop checkpoints pause automation when risk, uncertainty, or policy requires an authorized person to approve, reject, edit, or clarify the next action.",
    analogy: "A relay team records who has the baton and which legs are complete. If the race pauses for a safety inspection, the record includes the current runner, the completed legs, the evidence shown to the inspector, and the inspector's decision—so the team resumes at the correct point instead of starting again.",
    steps: ["Persist typed task state and a checkpoint after meaningful work, including receipts for completed side effects.", "Use queues, schedules, or events instead of keeping one request alive while waiting for a reply, approval, or external system.", "Pause before high-risk or irreversible actions and show the reviewer the evidence, proposed action, consequences, and permitted choices.", "Record approval, rejection, edits, clarification, expiry, cancellation, and timeout as explicit events in the task state.", "Resume from the saved checkpoint, verify authorization and current conditions again, and use idempotency keys so completed actions are not repeated."],
    exampleTitle: "A document review that pauses for an authorized decision",
    example: "The agent reviews many documents and checkpoints each completed result. A sensitive finding pauses with supporting evidence for a reviewer. After approval or a process restart, the worker resumes at the first unfinished document and does not resend notifications already recorded as delivered.",
    code: `state = load_checkpoint(task_id)\nfor document in pending_documents(state):\n    result = review(document)\n    save_result(task_id, document.id, result)\n\n    if result.requires_human_decision:\n        checkpoint(task_id, status="waiting_for_review")\n        return approval_queue.submit(result, required_role="reviewer")\n\n    checkpoint(task_id, completed=document.id)`,
    mistake: "Conversation history is not durable task state, and a generic approve button is not meaningful oversight. Persist progress and give reviewers enough evidence, time, authority, and clear reject or edit options.",
    takeaway: "Long-running work needs durable checkpoints, event-based waiting, idempotent actions, and risk-triggered human decisions that can safely pause and resume the task."
  },
  "browser-computer-use-agents": {
    intro: "Browser and computer-use agents act through interfaces such as the DOM, screenshots, keyboard, mouse, files, or a terminal. Code-executing agents add the ability to create and run programs. These tool surfaces are powerful but less predictable and more operationally risky than a narrow API, so every action needs restricted access and a visible post-action check.",
    analogy: "A remote assistant may operate a browser and run a spreadsheet script, but works inside a controlled account and laboratory. They confirm the correct window before typing, can access only the files and websites required for the task, and must ask before pressing a consequential button.",
    steps: ["Prefer a direct, typed API when one exists; otherwise observe the current page, screen, file, or terminal state.", "Choose one bounded action and execute it through the narrowest available tool.", "Run generated code in a sandbox that limits readable and writable paths, network destinations, processes, secrets, CPU, memory, and runtime.", "Treat webpages, documents, terminal output, and generated code as untrusted content rather than instructions or authorization.", "Observe again and use deterministic checks to confirm the expected state change.", "Require confirmation before purchases, submissions, deletion, messages, or moving sandbox results into important systems."],
    exampleTitle: "Searching for a trip and analyzing the result safely",
    example: "The agent enters a destination and dates, confirms the visible fields, and runs a small analysis script in a sandbox that can read only the exported results and write only one output folder. It verifies the output, then stops before booking and asks the user to approve the itinerary and price.",
    code: `page = browser.observe()\nbrowser.type(page.field("Destination"), "Jaipur")\nbrowser.click(page.button("Search"))\nassert "Jaipur" in browser.observe().text\n\npolicy = SandboxPolicy(\n    read=[search_export], write=[results_dir],\n    network=False, timeout_seconds=60, memory_mb=512,\n)\nanalysis = sandbox.run(generated_code, policy)`,
    mistake: "Coordinates, screenshots, and DOM references can become stale after layout changes or navigation, while a container alone does not guarantee safe code execution. Re-observe after acting and explicitly restrict mounts, network, processes, secrets, and resources.",
    takeaway: "Prefer APIs; otherwise use an observe–act–verify loop, sandbox untrusted code with least privilege, and require approval before irreversible interface actions."
  },
};

type LearningPath = "deep-learning" | "generative-ai" | "llm" | "agentic-ai";

const pathGuides: Record<LearningPath, { title: string; workflow: string[]; checks: string[]; project: string }> = {
  "deep-learning": {
    title: "From data to a reliable neural network",
    workflow: ["Define the target, baseline, and metric before choosing an architecture.", "Create leakage-safe train, validation, and test splits.", "Inspect shapes, scales, labels, imbalance, and representative edge cases.", "Train a small baseline, plot learning curves, and diagnose optimization versus overfitting.", "Tune one family of decisions at a time and preserve an untouched final test set.", "Export preprocessing with the model and monitor drift after deployment."],
    checks: ["Can a simpler ML model solve the problem?", "Does validation represent future production data?", "Are errors analyzed per class and subgroup?", "Can the model be reproduced from versioned data, code, and seeds?"],
    project: "Build a small end-to-end model, compare it with a simple baseline, plot training and validation curves, inspect ten failures, and write down exactly when the model should not be trusted."
  },
  "generative-ai": {
    title: "From generative model to useful application",
    workflow: ["Specify the artifact to generate and the human who will judge it.", "Choose an appropriate model family and establish a prompt-only baseline.", "Define quality, diversity, factuality, safety, latency, and cost metrics.", "Use structured outputs and deterministic validation wherever possible.", "Create adversarial and real-user test cases before adding integrations.", "Deploy gradually with feedback, fallbacks, versioning, and incident monitoring."],
    checks: ["Is generated content clearly distinguished from verified fact?", "Are privacy, copyright, bias, and abuse risks evaluated?", "Can users edit, reject, or report output?", "Is there a safe response when the model is uncertain or unavailable?"],
    project: "Create a focused generator with a typed output schema, a 30-case evaluation set, quality and safety checks, and a short report comparing two model or decoding settings."
  },
  llm: {
    title: "Building a grounded LLM system",
    workflow: ["Define the task and collect representative prompts plus expected behavior.", "Select a model based on quality, context, latency, privacy, and cost.", "Build a minimal baseline and record all settings.", "Add retrieval, fine-tuning, or tools only for failures they directly address.", "Evaluate correctness, groundedness, format, safety, latency, and cost by scenario.", "Version prompts, models, indexes, and evaluators; canary every important change."],
    checks: ["Does every factual claim require and receive evidence?", "Are token budgets and context ordering tested?", "Are structured outputs schema-validated?", "Are model and retrieval failures distinguishable in traces?"],
    project: "Build a question-answering system over a small document set, return source citations, add an abstain path, and measure retrieval recall separately from answer groundedness."
  },
  "agentic-ai": {
    title: "Engineering a bounded, observable agent",
    workflow: ["Write the goal, success condition, allowed actions, and stop conditions.", "Start with deterministic code and add model decisions only where needed.", "Expose the smallest possible tool set with typed schemas and scoped credentials.", "Persist explicit state and make consequential actions idempotent.", "Add budgets, timeouts, approvals, sandboxing, and escalation paths.", "Evaluate complete trajectories and monitor every deployed step."],
    checks: ["Can the task be a simpler workflow instead?", "Can untrusted content influence permissions?", "What prevents loops and duplicate side effects?", "Can an operator inspect, pause, resume, and safely terminate a run?"],
    project: "Build a read-only documentation agent with one search tool, a five-step limit, citations, an abstain condition, traces, and tests for irrelevant results, tool failure, and prompt injection."
  }
};

type LessonReference = { title: string; url: string; note: string };

const sourceLibrary: Record<string, LessonReference> = {
  googleNeuralNetworks: {
    title: "Google ML Crash Course: Neural networks",
    url: "https://developers.google.com/machine-learning/crash-course/neural-networks",
    note: "A concise official explanation of layers, activation functions, and neural-network structure."
  },
  pytorchBasics: {
    title: "PyTorch: Learn the Basics",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
    note: "Official tutorials covering tensors, datasets, model construction, automatic differentiation, optimization, and saving models."
  },
  pytorchAutograd: {
    title: "PyTorch: Automatic differentiation",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html",
    note: "Official guidance for recording operations, calculating gradients, and controlling gradient tracking."
  },
  pytorchOptimization: {
    title: "PyTorch: Optimizing model parameters",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html",
    note: "An official training-loop reference covering loss functions, optimizers, gradient reset, backpropagation, and parameter updates."
  },
  tensorflowSgd: {
    title: "TensorFlow Keras: SGD",
    url: "https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/SGD",
    note: "The official SGD reference with plain, momentum, and Nesterov update rules and configuration options."
  },
  tensorflowAdam: {
    title: "TensorFlow Keras: Adam",
    url: "https://www.tensorflow.org/api_docs/python/tf/keras/optimizers/Adam",
    note: "The official Adam reference covering first and second moments, defaults, weight decay, clipping, EMA, and gradient accumulation."
  },
  pytorchSaveLoad: {
    title: "PyTorch: Save, load, and run model predictions",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/saveloadrun_tutorial.html",
    note: "Official guidance for saving model weights, restoring them, switching to evaluation mode, and running inference."
  },
  pytorchTransfer: {
    title: "PyTorch: Transfer Learning for Computer Vision",
    url: "https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",
    note: "An end-to-end official example of feature extraction and fine-tuning for image classification."
  },
  tensorflowCnn: {
    title: "TensorFlow: Convolutional Neural Network",
    url: "https://www.tensorflow.org/tutorials/images/cnn",
    note: "An official beginner tutorial that builds and evaluates a small CNN."
  },
  tensorflowRnn: {
    title: "TensorFlow: Recurrent Neural Networks",
    url: "https://www.tensorflow.org/guide/keras/working_with_rnns",
    note: "Official guidance on RNN, LSTM, GRU, state, and bidirectional sequence layers."
  },
  tensorflowAutoencoder: {
    title: "TensorFlow: Intro to Autoencoders",
    url: "https://www.tensorflow.org/tutorials/generative/autoencoder",
    note: "Official examples of basic, denoising, and anomaly-detection autoencoders."
  },
  attentionPaper: {
    title: "Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
    note: "The original Transformer paper; useful after the simplified attention explanation on this page."
  },
  batchNormPaper: {
    title: "Batch Normalization",
    url: "https://arxiv.org/abs/1502.03167",
    note: "The original paper describing mini-batch normalization and its learned scale and shift parameters."
  },
  layerNormPaper: {
    title: "Layer Normalization",
    url: "https://arxiv.org/abs/1607.06450",
    note: "The original paper explaining normalization across a layer's activations for each training case."
  },
  resnetPaper: {
    title: "Deep Residual Learning for Image Recognition",
    url: "https://arxiv.org/abs/1512.03385",
    note: "The original ResNet paper introducing residual mappings and identity shortcut connections."
  },
  visionTransformerPaper: {
    title: "An Image is Worth 16x16 Words",
    url: "https://arxiv.org/abs/2010.11929",
    note: "The original Vision Transformer paper explaining image patches, position embeddings, and Transformer encoders."
  },
  simclrPaper: {
    title: "A Simple Framework for Contrastive Learning",
    url: "https://arxiv.org/abs/2002.05709",
    note: "The original SimCLR paper connecting augmentation, representation learning, projection heads, and contrastive objectives."
  },
  gcnPaper: {
    title: "Semi-Supervised Classification with Graph Convolutional Networks",
    url: "https://arxiv.org/abs/1609.02907",
    note: "The foundational GCN paper describing efficient neighborhood-based learning on graph-structured data."
  },
  pinnPaper: {
    title: "Physics-Informed Neural Networks",
    url: "https://arxiv.org/abs/1711.10561",
    note: "A foundational paper showing how differential-equation residuals can become neural-network training objectives."
  },
  kanPaper: {
    title: "KAN: Kolmogorov-Arnold Networks",
    url: "https://arxiv.org/abs/2404.19756",
    note: "The original KAN paper; useful for comparing learnable edge functions with conventional fixed activations."
  },
  diffusionCourse: {
    title: "Hugging Face Diffusion Course",
    url: "https://huggingface.co/learn/diffusion-course/en/unit0/1",
    note: "A free course that moves from diffusion intuition to training, guidance, latent diffusion, and audio."
  },
  diffusersTraining: {
    title: "Hugging Face Diffusers: Training overview",
    url: "https://huggingface.co/docs/diffusers/training/overview",
    note: "Official, editable training examples for diffusion, DreamBooth, LoRA, ControlNet, and related methods."
  },
  tensorflowGan: {
    title: "TensorFlow: Deep Convolutional GAN",
    url: "https://www.tensorflow.org/tutorials/generative/dcgan",
    note: "An official GAN training example with a generator, discriminator, losses, and training loop."
  },
  tensorflowVae: {
    title: "TensorFlow: Convolutional Variational Autoencoder",
    url: "https://www.tensorflow.org/tutorials/generative/cvae",
    note: "An official VAE tutorial connecting latent variables, reconstruction, sampling, and generation."
  },
  hfGeneration: {
    title: "Hugging Face Transformers: Text generation",
    url: "https://huggingface.co/docs/transformers/main_classes/text_generation",
    note: "The official reference for length controls, sampling, beam search, stopping, and caching."
  },
  googleLlm: {
    title: "Google ML Crash Course: Large language models",
    url: "https://developers.google.com/machine-learning/crash-course/llm",
    note: "An official conceptual module on tokens, context, self-attention, LLM limitations, fine-tuning, and distillation."
  },
  hfLlmCourse: {
    title: "Hugging Face LLM Course",
    url: "https://huggingface.co/learn/llm-course/chapter1/1",
    note: "A practical official course on Transformer models, tokenizers, datasets, fine-tuning, and modern NLP workflows."
  },
  hfPeft: {
    title: "Hugging Face PEFT documentation",
    url: "https://huggingface.co/docs/peft/index",
    note: "Official guidance for adapting large pretrained models by training a small number of parameters."
  },
  hfInference: {
    title: "Hugging Face: LLM inference optimization",
    url: "https://huggingface.co/docs/transformers/main/llm_optims",
    note: "Official guidance on quantization, caches, attention optimization, and efficient generation."
  },
  vllm: {
    title: "vLLM documentation",
    url: "https://docs.vllm.ai/en/latest/",
    note: "Official serving documentation covering high-throughput inference, batching, parallelism, and deployment."
  },
  hfAgents: {
    title: "Hugging Face Agents Course",
    url: "https://huggingface.co/learn/agents-course/unit1/introduction",
    note: "A free official course on tools, thought-action-observation loops, frameworks, agentic RAG, and evaluation."
  },
  langgraph: {
    title: "LangGraph: Workflows and agents",
    url: "https://langchain-ai.github.io/langgraph/agents/tools/",
    note: "Official examples of deterministic workflows, dynamic agents, routing, orchestration, and evaluator loops."
  },
  mcp: {
    title: "Model Context Protocol documentation",
    url: "https://modelcontextprotocol.io/docs/getting-started/intro",
    note: "The official introduction to MCP clients, servers, resources, prompts, tools, and integrations."
  },
  openaiAgents: {
    title: "OpenAI: A practical guide to building agents",
    url: "https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf",
    note: "A practical primary-source guide to agent selection, tools, orchestration, guardrails, and human intervention."
  }
};

function getLessonReferences(topicId: string, path: LearningPath): LessonReference[] {
  if (path === "deep-learning") {
    if (/backpropagation|computational-graphs-autodiff/.test(topicId)) return [sourceLibrary.pytorchAutograd, sourceLibrary.pytorchBasics];
    if (/deep-learning-optimizers/.test(topicId)) return [sourceLibrary.tensorflowSgd, sourceLibrary.tensorflowAdam, sourceLibrary.pytorchOptimization];
    if (/training-loop|optimizer|optimization|learning-rate|weight-initialization|vanishing-exploding|debugging/.test(topicId)) return [sourceLibrary.pytorchOptimization, sourceLibrary.pytorchAutograd, sourceLibrary.pytorchBasics];
    if (/batch-normalization/.test(topicId)) return [sourceLibrary.batchNormPaper, sourceLibrary.pytorchOptimization];
    if (/normalization-methods/.test(topicId)) return [sourceLibrary.layerNormPaper, sourceLibrary.batchNormPaper, sourceLibrary.pytorchBasics];
    if (/cnn-architectures-resnet/.test(topicId)) return [sourceLibrary.resnetPaper, sourceLibrary.tensorflowCnn, sourceLibrary.pytorchTransfer];
    if (/vision-transformers/.test(topicId)) return [sourceLibrary.visionTransformerPaper, sourceLibrary.attentionPaper, sourceLibrary.pytorchTransfer];
    if (/cnn|computer-vision|object-detection|unet|deeplab|gradcam/.test(topicId)) return [sourceLibrary.tensorflowCnn, sourceLibrary.pytorchTransfer];
    if (/rnn|gru|state-space|attention|nlp/.test(topicId)) return [sourceLibrary.tensorflowRnn, sourceLibrary.attentionPaper, sourceLibrary.pytorchBasics];
    if (/autoencoder/.test(topicId)) return [sourceLibrary.tensorflowAutoencoder, sourceLibrary.pytorchBasics];
    if (/self-supervised|contrastive/.test(topicId)) return [sourceLibrary.simclrPaper, sourceLibrary.pytorchTransfer];
    if (/graph-neural-networks/.test(topicId)) return [sourceLibrary.gcnPaper, sourceLibrary.pytorchBasics];
    if (/pinn-kan-topological/.test(topicId)) return [sourceLibrary.pinnPaper, sourceLibrary.kanPaper, sourceLibrary.pytorchAutograd];
    if (/saving-deploying/.test(topicId)) return [sourceLibrary.pytorchSaveLoad, sourceLibrary.pytorchBasics];
    return [sourceLibrary.googleNeuralNetworks, sourceLibrary.pytorchBasics];
  }
  if (path === "generative-ai") {
    if (/gan/.test(topicId)) return [sourceLibrary.tensorflowGan, sourceLibrary.diffusionCourse];
    if (/vae/.test(topicId)) return [sourceLibrary.tensorflowVae, sourceLibrary.tensorflowAutoencoder];
    if (/diffusion|image-model/.test(topicId)) return [sourceLibrary.diffusionCourse, sourceLibrary.diffusersTraining];
    if (/text-generation|hugging-face/.test(topicId)) return [sourceLibrary.hfGeneration, sourceLibrary.hfLlmCourse];
    return [sourceLibrary.diffusionCourse, sourceLibrary.hfGeneration];
  }
  if (path === "llm") {
    if (/lora|finetun|instruction|distillation/.test(topicId)) return [sourceLibrary.hfPeft, sourceLibrary.hfLlmCourse, sourceLibrary.googleLlm];
    if (/quantization|serving|distributed|llmops/.test(topicId)) return [sourceLibrary.hfInference, sourceLibrary.vllm, sourceLibrary.hfLlmCourse];
    if (/transformers|attention|encoder|context/.test(topicId)) return [sourceLibrary.attentionPaper, sourceLibrary.googleLlm, sourceLibrary.hfLlmCourse];
    return [sourceLibrary.googleLlm, sourceLibrary.hfLlmCourse, sourceLibrary.hfGeneration];
  }
  if (/model-context-protocol/.test(topicId)) return [sourceLibrary.mcp, sourceLibrary.hfAgents];
  if (/state|durable|memory|planning|framework|workflow/.test(topicId)) return [sourceLibrary.langgraph, sourceLibrary.hfAgents, sourceLibrary.openaiAgents];
  return [sourceLibrary.hfAgents, sourceLibrary.openaiAgents, sourceLibrary.langgraph];
}

function getTopicLearningContext(topicId: string) {
  const match = getTopicById(topicId);
  if (!match) return { title: topicId, previous: [], next: null };
  const index = match.category.subtopics.findIndex((topic) => topic.id === topicId);
  const llmIntroduction = getTopicById("llm-intro")?.subtopic ?? null;
  return {
    title: match.subtopic.title,
    previous: match.category.subtopics.slice(Math.max(0, index - 2), index),
    next: match.category.subtopics[index + 1] ?? (match.category.id === "generative-ai" ? llmIntroduction : null)
  };
}

function getLearningPath(topicId: string): LearningPath {
  const agentTopics = ["agentic-ai-intro", "tool-calling", "building-ai-agent", "planning-reflection", "agent-context-engineering", "agent-memory", "agent-state-graphs", "durable-long-running-agents", "agentic-rag", "multi-agent-systems", "model-context-protocol", "agent-frameworks", "browser-computer-use-agents", "agent-security", "agent-evaluation-safety", "agent-observability-deployment"];
  const llmTopics = ["llm-intro", "language-model-evolution", "tokenization-embeddings", "transformers-attention", "encoder-decoder-models", "context-windows", "text-generation-decoding", "hugging-face", "pretraining-finetuning", "llm-data-preparation", "llm-scaling-laws", "distributed-llm-training", "instruction-tuning-rlhf", "lora-peft", "knowledge-distillation", "quantization-inference", "efficient-llm-serving", "prompt-engineering", "structured-output-function-calling", "vector-databases", "rag", "advanced-rag", "rag-evaluation", "llm-evaluation", "reasoning-models", "llm-benchmarking-selection", "llmops", "llm-hallucinations-safety"];
  const genTopics = ["generative-ai-intro", "generative-vs-discriminative", "how-generative-models-learn", "vae", "gans", "diffusion-models", "stable-latent-diffusion", "controlling-diffusion-models", "finetuning-image-models", "multimodal-ai", "audio-music-video-generation", "synthetic-data", "evaluating-generative-models", "responsible-generative-ai", "choosing-generative-model", "building-genai-apps", "genai-deployment"];
  if (agentTopics.includes(topicId)) return "agentic-ai";
  if (llmTopics.includes(topicId)) return "llm";
  if (genTopics.includes(topicId)) return "generative-ai";
  return "deep-learning";
}

export function ModernAIContent() {
  const { topicId = "" } = useParams<{ topicId: string }>();
  const lesson = lessons[topicId] ?? additionalLessons[topicId] ?? deepLearningGapLessons[topicId] ?? pdfDeepLearningLessons[topicId] ?? auditedExpansionLessons[topicId];
  const learningPath = getLearningPath(topicId);
  const pathGuide = pathGuides[learningPath];
  const topic = getTopicLearningContext(topicId);
  const references = getLessonReferences(topicId, learningPath);

  if (!lesson) return null;

  if (learningPath === "agentic-ai") {
    return <AgenticAIContent topicId={topicId} lesson={lesson} />;
  }

  return (
    <div className="space-y-8">
      {learningPath === "deep-learning" && <DeepLearningArticleIntro topicId={topicId} />}

      {learningPath !== "deep-learning" && <section className="not-prose bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2 mb-4"><Target className="w-5 h-5" />What You Will Learn</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            `Explain ${topic.title} in simple language and connect it to a real situation.`,
            `Trace the process from “${lesson.steps[0]}” to “${lesson.steps[lesson.steps.length - 1]}”`,
            `Run and modify the small example instead of only reading the code.`,
            `Recognize the common failure described later and choose a safer alternative.`
          ].map((objective) => (
            <div key={objective} className="flex items-start gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </section>}

      {learningPath !== "deep-learning" && <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Before You Start</h2>
        {topic.previous.length > 0 ? (
          <div className="not-prose flex flex-wrap gap-2">
            <span className="text-sm text-slate-600 py-2 mr-1">Recommended earlier lessons:</span>
            {topic.previous.map((item) => (
              <Link key={item.id} to={`/learn/${item.id}`} className="px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:border-indigo-200">
                {item.title}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-slate-700">No specialist background is required. Basic Python and the idea of training and testing a model will help.</p>
        )}
      </section>}

      {topicId === "vae" && (
        <section className="not-prose rounded-xl border border-indigo-200 bg-indigo-50 p-5">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">Recommended prerequisite</h2>
          <p className="text-slate-700 leading-relaxed">
            This lesson continues from encoder, bottleneck, decoder, and reconstruction ideas. Review <Link to="/learn/autoencoders" className="font-semibold text-indigo-700 hover:text-indigo-900">Autoencoders and Their Variants</Link> first if those terms are unfamiliar.
          </p>
        </section>
      )}

      {learningPath !== "deep-learning" && (
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">The Simple Idea</h2>
          <p className="text-lg leading-relaxed">{lesson.intro}</p>
        </section>
      )}

      {learningPath !== "deep-learning" && <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
        <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-amber-900 mb-1">A familiar way to picture it</h3>
          <p className="text-slate-700 leading-relaxed">{lesson.analogy}</p>
        </div>
      </div>}

      {learningPath !== "deep-learning" && (
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">How It Works — Step by Step</h2>
          <div className="not-prose grid gap-3">
            {lesson.steps.map((step, index) => (
              <div key={step} className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {learningPath === "deep-learning" && <DeepLearningIllustratedExample topicId={topicId} />}

      {learningPath === "deep-learning" && <DeepLearningMathExample topicId={topicId} />}

      {learningPath === "deep-learning" && <DeepLearningLessonExtras topicId={topicId} />}

      {topicId === "deep-learning-optimizers" && <DeepLearningOptimizersGuide />}

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Try {topic.title} in Code</h2>
        <p className="text-slate-600 mb-3">The example is deliberately small so you can connect each line to the process above. Run it, inspect the result, and change one value before moving to a larger dataset.</p>
        <div className="not-prose bg-[#172033] rounded-xl overflow-hidden shadow-lg">
          <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2">example.py</span>
          </div>
          <pre className="p-5 text-sm text-slate-100 overflow-x-auto leading-relaxed"><code>{lesson.code}</code></pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Read the {topic.title} Example Step by Step</h2>
        {learningPath === "deep-learning" ? (
          <div className="space-y-5">
            <p className="text-slate-700 leading-relaxed">Read the example in the same order as the mathematical or visual process. A library call may perform several calculations, but it still belongs to one of the stages below.</p>
            {lesson.steps.map((step, index) => (
              <div key={step} className="grid sm:grid-cols-[48px_1fr] gap-3 items-start border-b border-slate-100 pb-4 last:border-0">
                <span className="not-prose w-9 h-9 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center">{index + 1}</span>
                <div><h3 className="font-bold text-slate-900 mb-1">Stage {index + 1}</h3><p className="text-slate-700 leading-relaxed m-0">{step}</p></div>
              </div>
            ))}
            <p className="text-slate-700 leading-relaxed"><strong>Verify it:</strong> run the code, print or plot the result connected to “{lesson.exampleTitle}”, change one input, and explain the change before expanding the example.</p>
          </div>
        ) : (
          <div className="not-prose space-y-3">
            {[
              ["1. Find the inputs", `Identify the smallest data, prompt, tensor, model, state, or configuration used by the ${topic.title} example.`],
              ["2. Locate the main operation", "Connect the central function or model call to the ‘How It Works’ stages above. Do not treat a library call as magic."],
              ["3. Inspect the result", `Print, validate, plot, or assert an observable result. For this page, relate that result to “${lesson.exampleTitle}”.`],
              ["4. Change one thing", "Modify one input or setting, predict the effect before running, then explain why the result changed."],
              ["5. Add a failure check", `Turn the common mistake on this page into a test, warning, limit, or fallback before using the idea in a larger project.`]
            ].map(([heading, body]) => (
              <div key={heading} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900 mb-1">{heading}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {learningPath !== "deep-learning" && <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">When Should You Use It?</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="font-bold text-emerald-900 mb-3">A good fit when</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>The problem matches the behavior described in the worked example.</li>
              <li>You can measure whether {topic.title.toLowerCase()} improves the result.</li>
              <li>You have representative inputs and enough time to test important failures.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
            <h3 className="font-bold text-rose-900 mb-3">Pause or compare alternatives when</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>A simpler rule, search, statistical model, or fixed workflow solves the task reliably.</li>
              <li>You cannot obtain realistic evaluation data or define an acceptable error rate.</li>
              <li>The common mistake below would create a costly, unsafe, or irreversible outcome.</li>
            </ul>
          </div>
        </div>
      </section>}

      <div className="not-prose bg-rose-50 border border-rose-200 rounded-xl p-5 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-rose-900 mb-1">Common mistake</h3>
          <p className="text-slate-700 leading-relaxed">{lesson.mistake}</p>
        </div>
      </div>

      {learningPath !== "deep-learning" && <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Production Checklist</h2>
        <div className="not-prose grid md:grid-cols-2 gap-3">
          {pathGuide.checks.map((check) => (
            <div key={check} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{check}</p>
            </div>
          ))}
        </div>
      </section>}

      {learningPath !== "deep-learning" && <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Practice Project</h2>
        <div className="not-prose bg-violet-50 border border-violet-200 rounded-xl p-5">
          <p className="text-slate-800 leading-relaxed">{pathGuide.project}</p>
        </div>
      </section>}

      <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Practice Exercises</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {[
            ["Explain", `Describe ${topic.title} to a beginner using a new analogy. Then map every part of your analogy to the real process.`],
            ["Experiment", `Run the example, change one input or parameter, and write your prediction before checking the output.`],
            ["Debug", `Create a tiny case that exposes this risk: ${lesson.mistake}`],
            ["Evaluate", `Define one quality metric, one efficiency metric, and one failure test for a small ${topic.title} application.`]
          ].map(([label, exercise], index) => (
            <div key={label} className="rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-bold flex items-center justify-center">{index + 1}</span>
                <h3 className="font-bold text-slate-900">{label}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{exercise}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-emerald-900 mb-1">Key takeaway</h3>
          <p className="text-slate-700 leading-relaxed">{lesson.takeaway}</p>
        </div>
      </div>

      {topic.next && (
        <section className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">Continue in order</h2>
          <p className="text-sm text-slate-700 mb-3">The next lesson builds on this point in the learning path.</p>
          <Link to={`/learn/${topic.next.id}`} className="inline-flex items-center gap-2 font-semibold text-indigo-700 hover:text-indigo-900">
            {topic.next.title} <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}

      {learningPath !== "deep-learning" && <section>
        <h2 className="text-2xl font-bold text-indigo-800 mb-3 flex items-center gap-2"><BookOpen className="w-6 h-6" />Verified Further Reading</h2>
        <p className="text-slate-600 mb-5">
          These primary and official sources were used to check the concepts and curriculum coverage. The explanation, analogy, exercises, and code on this page are original, simplified teaching material rather than copied tutorial text.
        </p>
        <div className="not-prose grid gap-3">
          {references.map((reference) => (
            <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700">{reference.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{reference.note}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>}

      <div className="not-prose border border-slate-200 rounded-xl p-5 bg-slate-50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3"><FlaskConical className="w-5 h-5 text-indigo-600" />Check your understanding</h3>
        <details className="bg-white border border-slate-200 rounded-lg p-4 mb-3">
          <summary className="font-semibold cursor-pointer">Can you explain {topic.title} without technical terms?</summary>
          <p className="mt-3 text-sm text-slate-600">Use the explanation and worked diagram above, then connect each visible stage to the real process. If you can do that without memorising the wording, you understand the core idea.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-lg p-4 mb-3">
          <summary className="font-semibold cursor-pointer">What should I measure before using this in a real application?</summary>
          <p className="mt-3 text-sm text-slate-600">Measure task quality on representative examples, analyze important failure groups, and record latency, cost, safety, and fallback behavior. A single average accuracy or a few attractive outputs are not enough.</p>
        </details>
        <details className="bg-white border border-slate-200 rounded-lg p-4">
          <summary className="font-semibold cursor-pointer flex items-center gap-2"><Workflow className="w-4 h-4 text-indigo-600" />What is the best next step after reading?</summary>
          <p className="mt-3 text-sm text-slate-600">Run the code on a tiny example, deliberately create one failure, explain why it failed, then complete the practice project with a written evaluation. Active debugging produces much stronger understanding than copying a larger example.</p>
        </details>
      </div>
    </div>
  );
}
