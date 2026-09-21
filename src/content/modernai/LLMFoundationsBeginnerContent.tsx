import { Link } from "react-router-dom";
import { Callout } from "../../components/content/Callout";
import { CodeBlock } from "../../components/content/CodeBlock";
import { DataTable } from "../../components/content/DataTable";
import { FigureShell } from "../../components/content/FigureShell";
import { FormulaBlock } from "../../components/content/FormulaBlock";
import { SummaryCard } from "../../components/lesson/SummaryCard";

type FoundationTopicId =
  | "tokenization-embeddings"
  | "transformers-attention"
  | "text-generation-decoding"
  | "prompt-engineering"
  | "pretraining-finetuning"
  | "instruction-tuning-rlhf";

function Steps({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="not-prose grid gap-3">
      {items.map((item, index) => (
        <div key={item.title} className="grid grid-cols-[2rem_1fr] gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">{index + 1}</span>
          <div>
            <h3 className="font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1 leading-relaxed text-slate-700">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Bridge({ question, to, label }: { question: string; to: string; label: string }) {
  return (
    <section className="not-prose rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Why the next lesson matters</p>
      <p className="mt-2 text-lg font-bold leading-relaxed text-indigo-950">{question}</p>
      <Link to={to} className="mt-3 inline-flex font-semibold text-indigo-700 hover:underline">{label} →</Link>
    </section>
  );
}

function TextToVectorsFigure() {
  const stages = [
    ["Text", "I love machine learning!"],
    ["Tokens", "I | love | machine | learning | !"],
    ["Token IDs", "41 | 908 | 2714 | 6221 | 9"],
    ["Embeddings", "[…] learned number vectors"],
    ["Model", "Processes numerical representations"],
  ];
  return (
    <FigureShell
      title="How written text becomes numerical model input"
      caption="Token IDs identify vocabulary entries. Embeddings are the learned numerical representations; the ID number itself does not carry meaning."
      accessibleDescription="A five-stage flow converts text into tokens, then token IDs, then learned embedding vectors, then passes the representations into the model."
    >
      <div className="grid gap-3 md:grid-cols-5">
        {stages.map(([title, body], index) => (
          <div key={title} className="relative rounded-xl border border-slate-200 bg-white p-4 text-center">
            <p className="font-bold text-indigo-900">{title}</p>
            <p className="mt-2 break-words text-sm text-slate-700">{body}</p>
            {index < stages.length - 1 && <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-xl font-bold text-indigo-500 md:block" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </FigureShell>
  );
}

function ContextBudgetFigure() {
  return (
    <FigureShell
      title="A context window is a limited worktable"
      caption="Everything the model must read now—and the space reserved for its answer—has to fit inside the request budget."
      accessibleDescription="A 1,600-token toy budget contains instructions, the user's question, retrieved evidence and an output allowance. The planned total shown is 2,000 tokens, which is 400 tokens over the budget."
    >
      <div className="space-y-3">
        {[
          ["Instructions", "220"],
          ["Question", "180"],
          ["Retrieved evidence", "1,100"],
          ["Reserved output", "500"],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-[1fr_auto] gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm">
            <span className="font-medium text-slate-800">{label}</span><span className="font-mono font-bold text-indigo-700">{value} tokens</span>
          </div>
        ))}
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950">
          Planned total = 220 + 180 + 1,100 + 500 = <strong>2,000</strong>. With a 1,600-token toy limit, the request is <strong>400 tokens over budget</strong>.
        </div>
      </div>
    </FigureShell>
  );
}

function TokenizationEmbeddingsLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>How does a sentence get inside an LLM?</h2>
        <p className="text-lg">You type <strong>“I love machine learning!”</strong>. A person sees words and meaning. A neural network works with numbers. The missing bridge is: <strong>split the text into manageable pieces, identify those pieces, then turn them into learned numerical representations.</strong></p>
        <p>Those pieces are called <strong>tokens</strong>. A token may be a whole word, part of a word, punctuation, a byte-like unit, or a special symbol depending on the tokenizer used by the model.</p>
      </section>

      <TextToVectorsFigure />

      <section className="space-y-4">
        <h2>Step 1 — split text into tokens</h2>
        <p>For teaching, we might imagine <strong>“playing!”</strong> becoming <code>play | ing | !</code>. A real tokenizer may split it differently. Tokenization is model-specific, so visible word count is not a reliable token count.</p>
        <Callout role="tip" title="Token does not mean word"><p>A 1,000-word document may use more or fewer than 1,000 tokens depending on language, punctuation, code, uncommon names, and the tokenizer itself.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Step 2 — give each token an ID</h2>
        <p>A vocabulary assigns each token an integer ID. Think of the ID as a catalogue number. If one token has ID 4217 and another has ID 4218, that does <strong>not</strong> mean their meanings are close.</p>
        <DataTable
          title="Illustrative vocabulary lookup"
          headers={["Token", "Token ID", "What the number means"]}
          rows={[
            ["machine", "2714", "Index used to look up this token"],
            ["learning", "6221", "Another index; 6221 is not a semantic score"],
            ["!", "9", "Vocabulary index for punctuation in this toy example"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Step 3 — turn IDs into learned vectors</h2>
        <p>The model uses each ID to look up an <strong>embedding</strong>: a vector, or ordered list of learned numbers. Training adjusts these numbers so the model can represent useful patterns and relationships.</p>
        <p>A helpful mental model is a coordinate system. One point may end up closer to another because the model learned that they appear in related contexts. But the individual coordinates are not manually labelled “animal”, “positive”, or “technology”.</p>
        <Callout role="info" title="Two meanings of embedding"><p>This lesson is about token embeddings inside an LLM. Later, semantic search uses embeddings for whole queries and passages. The idea is related, but the purpose and model may differ.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>How does the model know order?</h2>
        <p>The same words in a different order can mean something different: <strong>“dog bites man”</strong> is not the same as <strong>“man bites dog.”</strong> LLMs therefore combine token information with <strong>positional information</strong> so the network can distinguish where pieces appear in the sequence.</p>
      </section>

      <section className="space-y-4">
        <h2>Context window — the model's current worktable</h2>
        <p>The <strong>context window</strong> is the finite amount of tokenized material the model can work with for a request. Instructions, conversation history, the current question, retrieved evidence, and room for the generated answer all consume that budget.</p>
        <ContextBudgetFigure />
        <p>The 1,600-token value is deliberately small and only for this worked example. Real model limits vary. The skill to learn is the budgeting: <strong>2,000 planned − 1,600 available = 400 tokens that must be removed or reallocated.</strong></p>
      </section>

      <section className="space-y-4">
        <h2>Context is not long-term memory</h2>
        <p>A context window is temporary working material for the current interaction. If an application remembers your preference next week, software outside the base model typically stored that information and inserted it into a later request.</p>
        <DataTable
          title="Do not confuse these"
          headers={["Concept", "Plain-English meaning"]}
          rows={[
            ["Token", "A model-specific piece of text"],
            ["Token ID", "Vocabulary index used to locate a token's representation"],
            ["Embedding", "Learned numerical vector used by the network"],
            ["Context window", "Finite current working text budget"],
            ["Persistent memory", "Application-managed information stored and reintroduced later"],
          ]}
        />
      </section>

      <Bridge question="Now the model has numerical token representations. How can each token decide which other tokens matter?" to="/learn/transformers-attention" label="Transformer Architecture & Attention" />

      <SummaryCard items={[
        "LLMs first split text into model-specific pieces called tokens.",
        "A token ID is a vocabulary index, not a measure of meaning.",
        "Embeddings are learned numerical vectors that represent tokens inside the model.",
        "Positional information helps the model distinguish token order.",
        "The context window is a finite current working budget and must include room for the answer.",
        "A large context window is not the same as persistent application memory.",
      ]} />
    </div>
  );
}

function AttentionSentenceFigure() {
  const words = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "tired"];
  return (
    <FigureShell
      title="Attention asks: which earlier words are useful here?"
      caption="For the pronoun “it”, useful information may come from “animal” and “tired”. Attention learns weighted connections; it is not human understanding."
      accessibleDescription="The sentence The animal didn't cross the street because it was tired is shown with stronger conceptual emphasis on the pronoun it and the words animal and tired."
    >
      <div className="flex flex-wrap justify-center gap-2">
        {words.map((word, index) => (
          <span key={word + "-" + index} className={word === "it" ? "rounded-lg border-2 border-indigo-500 bg-indigo-50 px-3 py-2 font-bold text-indigo-950" : word === "animal" || word === "tired" ? "rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 font-semibold text-emerald-950" : "rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700"}>{word}</span>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-indigo-50 p-3 text-sm"><strong>Query:</strong> what information does “it” need?</div>
        <div className="rounded-lg bg-amber-50 p-3 text-sm"><strong>Keys:</strong> what does each position offer for matching?</div>
        <div className="rounded-lg bg-emerald-50 p-3 text-sm"><strong>Values:</strong> what information is passed forward when relevant?</div>
      </div>
    </FigureShell>
  );
}

function TransformersAttentionLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>How can one token use information from another?</h2>
        <p className="text-lg">Read: <strong>“The animal didn't cross the street because it was tired.”</strong> To interpret “it”, information from earlier words matters. Treating every position as equally useful would be wasteful.</p>
        <p><strong>Attention</strong> is a learned mechanism that lets each position assign different weights to other allowed positions and combine their information.</p>
      </section>

      <AttentionSentenceFigure />

      <section className="space-y-4">
        <h2>Query, Key and Value — without the mystery</h2>
        <DataTable
          title="Q, K and V in plain English"
          headers={["Vector", "Beginner mental model", "Role"]}
          rows={[
            ["Query (Q)", "What information am I looking for?", "Used to score how relevant other positions are"],
            ["Key (K)", "What information do I offer for matching?", "Compared with the Query"],
            ["Value (V)", "What information should I pass forward?", "Mixed according to the attention weights"],
          ]}
        />
        <Callout role="warning" title="The analogy has limits"><p>Queries do not literally ask English questions, and Keys are not encryption keys. Q, K and V are learned numerical vectors.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>From matching scores to attention weights</h2>
        <Steps items={[
          { title: "Compare Query with Keys", body: "A dot product gives larger scores to stronger matches in the learned space." },
          { title: "Scale the scores", body: "Divide by √dₖ, where dₖ is the Key-vector dimension, to keep large dot products from making softmax excessively sharp." },
          { title: "Normalize with softmax", body: "Convert the scores into non-negative weights that sum to 1 across the allowed positions." },
          { title: "Mix the Values", body: "Multiply each Value vector by its attention weight and add the results." },
        ]} />
        <FormulaBlock expression="Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V" explanation="Read it as: compare Q with K, scale, turn the scores into weights, then use those weights to combine V." />
      </section>

      <section className="space-y-4">
        <h2>A tiny weighted-value calculation</h2>
        <p>Suppose one query produces attention weights <strong>0.731</strong> and <strong>0.269</strong> over two positions. Their Value vectors are <strong>[1, 0]</strong> and <strong>[0, 2]</strong>.</p>
        <div className="not-prose rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm leading-7">
          <p>0.731 × [1, 0] = [0.731, 0]</p>
          <p>0.269 × [0, 2] = [0, 0.538]</p>
          <p className="font-bold text-indigo-800">Output = [0.731, 0.538]</p>
        </div>
        <p>The result is not a label. It is a new representation containing a weighted mixture of information from the two Value vectors.</p>
      </section>

      <section className="space-y-4">
        <h2>One attention operation is not the whole Transformer</h2>
        <DataTable
          title="Inside a Transformer block"
          headers={["Part", "Why it is there"]}
          rows={[
            ["Multi-head attention", "Runs several learned attention projections so the block can represent different useful relationships"],
            ["Feed-forward network", "Applies a learned nonlinear transformation independently at each position"],
            ["Residual connections", "Carry earlier information around sublayers and support deep optimization"],
            ["Normalization", "Helps keep activations numerically stable as many blocks are stacked"],
          ]}
        />
        <p>Multiple heads are useful, but a head is not guaranteed to have one fixed human-readable job such as “grammar head”.</p>
      </section>

      <section className="space-y-4">
        <h2>Three common Transformer families</h2>
        <DataTable
          title="Architecture family and typical use"
          headers={["Family", "Information flow", "Typical fit"]}
          rows={[
            ["Encoder-only", "Reads the available input in both directions", "Understanding/classification/representations"],
            ["Decoder-only", "Uses causal visibility so a position cannot see future target tokens", "Autoregressive text generation"],
            ["Encoder-decoder", "Encoder reads the source; decoder generates the target", "Tasks such as translation or transformation"],
          ]}
        />
        <Callout role="mistake" title="Causal masking matters"><p>During decoder training, allowing a position to see the correct future token would leak the answer. A causal mask blocks that future visibility.</p></Callout>
      </section>

      <Bridge question="The Transformer can now produce scores for possible next tokens. How does the system choose which token to actually generate?" to="/learn/text-generation-decoding" label="Text Generation & Decoding" />

      <SummaryCard items={[
        "Attention lets each token position weight information from other allowed positions.",
        "Query supports looking for a match, Key supports matching, and Value carries the information to mix.",
        "Scaled dot-product attention turns Q–K scores into weights and uses them to combine V.",
        "Multi-head attention, feed-forward layers, residual paths, and normalization form a Transformer block.",
        "Decoder-only Transformers use causal masking and are a natural fit for next-token generation.",
        "The Transformer produces useful contextual representations; the next lesson explains how scores become actual generated tokens.",
      ]} />
    </div>
  );
}

function DecodingLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>The model has choices — how does it pick one?</h2>
        <p className="text-lg">Suppose the current text is <strong>“The weather is …”</strong>. The model may consider “sunny”, “cold”, “changing”, and thousands of other tokens. The neural network first produces a raw score for every vocabulary token.</p>
        <p>Those raw scores are called <strong>logits</strong>. A softmax operation converts them into a probability distribution that is easier to interpret and sample from.</p>
      </section>

      <DataTable
        title="One illustrative generation step"
        headers={["Candidate", "Raw model score", "After softmax (illustrative)"]}
        rows={[
          ["sunny", "2.0", "66.5%"],
          ["cold", "1.0", "24.5%"],
          ["changing", "0.0", "9.0%"],
        ]}
      />

      <section className="space-y-4">
        <h2>Greedy decoding — always take the largest probability</h2>
        <p>If the distribution is 66.5%, 24.5%, and 9.0%, greedy decoding selects <strong>sunny</strong>. It is simple and repeatable for a fixed model/input, but repeatedly taking only the top choice can make text rigid and does not make the answer factually verified.</p>
      </section>

      <section className="space-y-4">
        <h2>Temperature — make the distribution sharper or flatter</h2>
        <p>Temperature changes the relative spread of candidate probabilities before sampling. Lower positive temperatures make high-scoring tokens dominate more strongly. Higher temperatures flatten the distribution so lower-ranked candidates become more viable.</p>
        <DataTable
          title="Same toy logits [2, 1, 0], two temperatures"
          headers={["Setting", "Approximate probabilities", "Interpretation"]}
          rows={[
            ["T = 1", "[0.665, 0.245, 0.090]", "Original softmax spread"],
            ["T = 2", "[0.506, 0.307, 0.186]", "Flatter; lower-ranked candidates gain probability"],
          ]}
        />
        <FormulaBlock expression="softmax(logits / T), for T > 0" explanation="Temperature changes the scale of the logits before softmax. Do not teach T = 0 as literal division by zero; deterministic choice is handled as a separate decoding setting." />
      </section>

      <section className="space-y-4">
        <h2>Top-k and top-p — narrow the candidate pool</h2>
        <DataTable
          title="Two common filters"
          headers={["Method", "Question it asks", "Example"]}
          rows={[
            ["Top-k", "Keep how many of the highest-probability candidates?", "k = 3 keeps exactly the top 3 candidates before sampling"],
            ["Top-p (nucleus)", "Keep enough high-probability candidates to reach what cumulative mass?", "p = 0.90 keeps as many top candidates as needed to reach at least 90%"],
          ]}
        />
        <p>Top-k uses a fixed candidate count. Top-p uses a probability-mass threshold, so the number of retained tokens can change from one generation step to the next.</p>
      </section>

      <section className="space-y-4">
        <h2>Which decoding style fits the job?</h2>
        <DataTable
          title="Start from the task, not from a fashionable setting"
          headers={["Task", "Reasonable starting direction", "What still matters"]}
          rows={[
            ["Structured extraction", "Deterministic or tightly constrained decoding", "Validate schema and meaning"],
            ["Normal assistant response", "Moderate, controlled sampling", "Evidence and safety still matter"],
            ["Creative ideation", "More sampling diversity may be useful", "Higher diversity can also increase inconsistency"],
          ]}
        />
        <Callout role="warning" title="Decoding does not create truth"><p>Changing temperature, top-k, or top-p changes how a model chooses among its predicted continuations. It does not supply missing evidence or guarantee correctness.</p></Callout>
      </section>

      <Bridge question="We know how the model turns its internal scores into text. How should we write the request we give it so the task is clear and testable?" to="/learn/prompt-engineering" label="Prompt Engineering" />

      <SummaryCard items={[
        "An LLM first produces raw vocabulary scores called logits.",
        "Softmax converts logits into a probability distribution over candidate next tokens.",
        "Greedy decoding always chooses the highest-probability candidate.",
        "Temperature changes how concentrated or spread out the distribution is; literal division by T = 0 is invalid.",
        "Top-k keeps a fixed number of candidates, while top-p keeps enough candidates to reach a cumulative probability mass.",
        "Decoding settings should match the task, and structured outputs still require validation.",
      ]} />
    </div>
  );
}

function PromptEngineeringLesson() {
  const promptCode = [
    "TASK",
    "Summarize the article below.",
    "",
    "CONTEXT",
    "<article>",
    "...article text...",
    "</article>",
    "",
    "CONSTRAINTS",
    "- Audience: first-year college student",
    "- Exactly 5 bullets",
    "- Each bullet under 20 words",
    "",
    "OUTPUT CONTRACT",
    "Return JSON: { \"bullets\": [\"...\"] }",
  ].join("\n");

  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Why does one prompt work better than another?</h2>
        <p className="text-lg"><strong>Weak:</strong> “Tell me about this.”</p>
        <p className="text-lg"><strong>Clearer:</strong> “Summarize the following article in five bullet points for a first-year college student. Keep each bullet under 20 words.”</p>
        <p>The second request is easier to follow because the task, audience, constraints, and desired shape of the answer are visible. <strong>Prompt engineering is the practice of making those instructions clear, testable, and appropriate for the job.</strong></p>
      </section>

      <section className="space-y-4">
        <h2>A practical four-part prompt</h2>
        <DataTable
          title="Prompt anatomy"
          headers={["Part", "Question it answers"]}
          rows={[
            ["Task", "What should the model do?"],
            ["Context", "What information should it use?"],
            ["Constraints", "What rules or limits should it follow?"],
            ["Output contract", "What shape should the answer have?"],
          ]}
        />
        <CodeBlock title="A structured prompt" type="conceptual" code={promptCode} caption="The tags are just a clear delimiter convention; they are not magic syntax." />
      </section>

      <section className="space-y-4">
        <h2>Zero-shot, one-shot, and few-shot examples</h2>
        <p><strong>Zero-shot</strong> means giving the instruction without examples. <strong>One-shot</strong> gives one example of the desired input/output pattern. <strong>Few-shot</strong> gives a small set of examples.</p>
        <Callout role="tip" title="Examples are specifications, not decorations"><p>If a formatting rule is hard to describe, one good example can make the desired pattern concrete. But examples can also conflict with written rules, so keep them consistent.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Structured output gives shape — not truth</h2>
        <p>If software needs a list of objects such as <code>{'{name, due_date}'}</code>, define a schema and validate the output. A parser can prove that required fields and types are present. It cannot prove that a date is factually correct, authorized, or acceptable under business rules.</p>
        <Steps items={[
          { title: "Generate", body: "Ask for the defined structure." },
          { title: "Parse", body: "Reject malformed syntax or invalid types." },
          { title: "Validate semantics", body: "Check allowed values, business rules, permissions, and evidence." },
          { title: "Handle failure", body: "Repair, ask for clarification, retry safely, or escalate according to policy." },
        ]} />
      </section>

      <section className="space-y-4">
        <h2>Tool or function calling is a proposal, not permission</h2>
        <p>An LLM can propose a tool name and arguments, but application code should validate them before execution. If the model proposes <code>get_weather(city="Pune", unit="Kelvin")</code> and the schema allows only C or F, the application should reject or repair the arguments according to its policy.</p>
        <Callout role="warning" title="The model does not own authorization"><p>Tool schemas, permission checks, confirmation for high-impact actions, and business validation belong to application logic. Never treat a model-generated function call as automatically trusted.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Debug prompts like software requirements</h2>
        <p>If two instructions conflict—such as “return only JSON” and “explain your reasoning in a paragraph”—first remove or reconcile the conflict and retest the same cases. Adding unrelated examples or immediately fine-tuning the model hides the real problem.</p>
        <p>A good prompt can improve how clearly the model understands the task. It cannot magically give the model a current private policy, a missing database record, or guaranteed facts.</p>
      </section>

      <Bridge question="Prompting changes the request but not the model's learned parameters. How were those parameters learned in the first place?" to="/learn/pretraining-finetuning" label="Pretraining & Fine-Tuning" />

      <SummaryCard items={[
        "A useful prompt makes the task, context, constraints, and output contract explicit.",
        "Examples can clarify a desired pattern, but they must not conflict with the written instructions.",
        "Structured output makes the shape predictable; separate semantic and business validation is still required.",
        "Tool calls are model proposals that application code must validate and authorize.",
        "Prompt debugging should remove ambiguity and conflicting constraints before changing unrelated components.",
        "Prompting changes the input to a trained model; it does not retrain the model or automatically provide missing knowledge.",
      ]} />
    </div>
  );
}

function TrainingFlowFigure() {
  const steps = ["Prepare text", "Tokenize", "Predict next token", "Measure loss", "Backpropagate", "Update parameters", "Repeat"];
  return (
    <FigureShell
      title="Pretraining is repeated prediction plus parameter updates"
      caption="The exact infrastructure can be enormous, but the learning loop is familiar: examples → prediction → error → adjustment."
      accessibleDescription="A seven-stage flow shows prepared text being tokenized, used for next-token prediction, evaluated with a loss, backpropagated, followed by a parameter update, and repeated."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => <div key={step} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-bold text-indigo-600">STEP {index + 1}</p><p className="mt-1 font-semibold text-slate-900">{step}</p></div>)}
      </div>
    </FigureShell>
  );
}

function PretrainingFinetuningLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>Where do the model's parameters come from?</h2>
        <p className="text-lg">In the introduction we used <strong>“The cat sat on the ____”</strong>. The model predicts the next token, compares its probability with the observed continuation, calculates an error, and adjusts its parameters.</p>
        <p><strong>Pretraining</strong> is this broad learning process repeated across a very large and varied corpus so the model develops general language and pattern-prediction capability.</p>
      </section>

      <TrainingFlowFigure />

      <section className="space-y-4">
        <h2>Training data is not just “more text”</h2>
        <DataTable
          title="Why preparation matters"
          headers={["Concern", "Why it matters"]}
          rows={[
            ["Quality", "Low-quality or misleading material can teach undesirable patterns"],
            ["Diversity", "Broader examples help the model cover more language, domains, and styles"],
            ["Deduplication", "Repeated documents can disproportionately dominate the mixture and increase leakage/memorization risk"],
            ["Held-out validation", "Separate examples help measure whether training improvements generalize beyond the batches being updated"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>How next-token training examples are formed</h2>
        <p>For a token sequence <strong>[t₁, t₂, t₃, t₄]</strong>, a causal language-model training view can use <strong>[t₁, t₂, t₃]</strong> as the available inputs while the targets are shifted one step to <strong>[t₂, t₃, t₄]</strong>. At each position, the target is the token that actually followed the available prefix.</p>
        <Callout role="tip" title="Same idea, many positions"><p>The model is not learning one final word per document. A long sequence supplies many next-token prediction targets.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Loss answers: how much probability did we give the correct token?</h2>
        <p>One common causal-language-model loss is negative log-likelihood. You do not need to memorize logarithms to understand the direction: assigning more probability to the observed next token gives a smaller loss.</p>
        <DataTable
          title="Tiny loss comparison"
          headers={["Probability assigned to correct token", "−ln(probability)", "Interpretation"]}
          rows={[
            ["0.50", "≈ 0.693", "Higher loss"],
            ["0.80", "≈ 0.223", "Lower loss because the model assigned more probability to the observed token"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Pretraining versus fine-tuning</h2>
        <p>Think of <strong>pretraining as broad education</strong> and <strong>fine-tuning as additional specialist coaching</strong>. Fine-tuning starts from an already trained model and continues updating some or all parameters using a narrower dataset or objective.</p>
        <DataTable
          title="Two stages, different goals"
          headers={["Stage", "Primary goal", "Typical data"]}
          rows={[
            ["Pretraining", "Learn broad language and general patterns", "Very large, varied corpus"],
            ["Fine-tuning", "Shape narrower task/domain/behavior", "Smaller curated examples relevant to the target"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <h2>Why training needs much more memory than the saved weights</h2>
        <p>A 1-billion-parameter model stored with 16-bit weights is roughly <strong>2 GB of raw weight values</strong> as a simple estimate. That does <strong>not</strong> mean 2 GB is enough to train it.</p>
        <p>Training may also need activations, gradients, optimizer state, temporary buffers, and communication overhead. The exact amount depends on the optimizer, precision, sequence length, batch size, checkpointing, hardware, and parallel strategy.</p>
        <Callout role="info" title="Why multiple GPUs may help"><p>If the complete model fits on each GPU and the goal is more batch throughput, <strong>data parallelism</strong> is a natural starting idea: replicas process different batches, then synchronize gradients. Other parallel strategies solve different constraints.</p></Callout>
      </section>

      <Bridge question="Pretraining creates a broad language model. How do we teach it to follow instructions, reflect preferences, and specialize efficiently?" to="/learn/instruction-tuning-rlhf" label="SFT, RLHF & LoRA" />

      <SummaryCard items={[
        "Pretraining repeatedly performs next-token prediction, loss calculation, backpropagation, and parameter updates over a broad corpus.",
        "Data quality, diversity, deduplication, and held-out validation affect what the model learns and how reliably progress is measured.",
        "Causal training shifts targets so each position learns the token that follows its available prefix.",
        "Giving the observed next token higher probability reduces negative log-likelihood.",
        "Fine-tuning continues training an existing model for a narrower goal.",
        "Raw weight memory is only one part of training memory; activations, gradients, optimizer state, and other overhead also matter.",
      ]} />
    </div>
  );
}

function AlignmentLesson() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <h2>A base model can continue text. How do we make it a useful assistant?</h2>
        <p className="text-lg">A pretrained model may be good at predicting text without reliably behaving like an instruction-following assistant. Post-training adds targeted examples and preference signals to shape how the model responds.</p>
        <p>Start with the simplest idea: show the model many pairs of <strong>instruction → desired response</strong> and continue training on them. This is <strong>supervised fine-tuning (SFT)</strong>.</p>
      </section>

      <section className="space-y-4">
        <h2>Supervised fine-tuning — teach by example</h2>
        <DataTable
          title="One tiny SFT example"
          headers={["Instruction", "Desired target response"]}
          rows={[
            ["Write a polite email declining tomorrow's meeting.", "A concise email that declines, gives an appropriate reason, and suggests another time."],
          ]}
        />
        <p>Across many curated pairs, training increases the probability of response patterns that match the desired behavior.</p>
      </section>

      <section className="space-y-4">
        <h2>Preference feedback — choose between responses</h2>
        <p>Sometimes there is more than one plausible answer. Evaluators can compare two candidates and indicate which better follows the desired criteria.</p>
        <DataTable
          title="Preference signal"
          headers={["Candidate", "Behavior", "Preference"]}
          rows={[
            ["A", "Direct, follows the requested format, avoids unsupported claims", "Preferred"],
            ["B", "Verbose, ignores the format, invents a detail", "Not preferred"],
          ]}
        />
        <p><strong>RLHF</strong> (reinforcement learning from human feedback) is one family of methods that uses human preference information to shape model behavior. Modern post-training can also use other preference-optimization approaches; the core beginner idea is that feedback about better and worse responses becomes a training signal.</p>
        <Callout role="warning" title="Alignment is not permanent truthfulness"><p>Post-training can improve instruction following and reduce some unwanted behaviors, but it does not eliminate hallucination, adversarial inputs, distribution shift, or the need for evaluation and system controls.</p></Callout>
      </section>

      <section className="space-y-4">
        <h2>Why LoRA exists — specialize without updating every base weight</h2>
        <p>Full fine-tuning can update an enormous number of parameters. <strong>LoRA</strong> (Low-Rank Adaptation) keeps the original weight matrix frozen and learns small additional low-rank matrices whose update is combined with the base model during use.</p>
        <FigureShell
          title="Base model stays frozen; a small learned adapter changes the effective transformation"
          caption="This is the intuition behind LoRA. Exact insertion points and implementation details vary by model."
          accessibleDescription="A frozen base weight matrix W is shown alongside two small trainable matrices A and B. Their low-rank product contributes an adapter update while W remains unchanged."
        >
          <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-xl border border-slate-300 bg-slate-100 p-5 text-center"><strong>Frozen W</strong><p className="mt-1 text-sm">Original base weights</p></div>
            <span className="text-center text-xl font-bold text-indigo-600">+</span>
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-center"><strong>Train A and B</strong><p className="mt-1 text-sm">Small low-rank adapter</p></div>
            <span className="text-center text-xl font-bold text-indigo-600">→</span>
            <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-5 text-center"><strong>Adapted behavior</strong><p className="mt-1 text-sm">Base + learned update</p></div>
          </div>
        </FigureShell>
      </section>

      <section className="space-y-4">
        <h2>A tiny LoRA parameter count</h2>
        <p>Suppose a base matrix is <strong>512 × 512</strong> and we choose LoRA rank <strong>8</strong>. One adapter matrix has <strong>512 × 8 = 4,096</strong> parameters and the other has <strong>8 × 512 = 4,096</strong>.</p>
        <div className="not-prose rounded-xl border border-emerald-200 bg-emerald-50 p-5 font-mono">
          4,096 + 4,096 = <strong>8,192 trainable adapter parameters</strong>
        </div>
        <p>The original 512 × 512 base matrix remains frozen in standard LoRA adapter training. Updating W directly would violate that assumption.</p>
      </section>

      <section className="space-y-4">
        <h2>Prompting, RAG, or fine-tuning?</h2>
        <DataTable
          title="Match the intervention to the problem"
          headers={["Problem", "Good starting intervention", "Why"]}
          rows={[
            ["The instruction is unclear", "Prompting", "Change the request without training"],
            ["The model lacks today's private company policy", "RAG with authorized current evidence", "Supply external facts at request time"],
            ["The model needs a stable specialist style or behavior", "Fine-tuning / SFT / adapters", "Change learned behavior through training"],
          ]}
        />
        <p>If the model already follows the desired style but simply lacks current private information, full fine-tuning is usually the wrong first tool. That is the problem RAG is designed to address.</p>
      </section>

      <Bridge question="Fine-tuning can change behavior. But what if the model's behavior is fine and the missing piece is today's private or current information?" to="/learn/rag" label="Retrieval-Augmented Generation (RAG)" />

      <SummaryCard items={[
        "Supervised fine-tuning trains on curated instruction–response pairs to shape desired behavior.",
        "Preference feedback compares candidate responses and can be used by RLHF or other post-training methods.",
        "Alignment can improve behavior but does not guarantee truth, safety, or correctness.",
        "LoRA keeps base weights frozen and learns small low-rank adapter matrices.",
        "A 512×512 matrix with rank-8 LoRA uses 4,096 + 4,096 = 8,192 adapter matrix parameters in the toy example.",
        "Prompting changes the input, RAG supplies external evidence, and fine-tuning changes learned behavior.",
      ]} />
    </div>
  );
}

export function LLMFoundationsBeginnerContent({ topicId }: { topicId: string }) {
  switch (topicId as FoundationTopicId) {
    case "tokenization-embeddings":
      return <TokenizationEmbeddingsLesson />;
    case "transformers-attention":
      return <TransformersAttentionLesson />;
    case "text-generation-decoding":
      return <DecodingLesson />;
    case "prompt-engineering":
      return <PromptEngineeringLesson />;
    case "pretraining-finetuning":
      return <PretrainingFinetuningLesson />;
    case "instruction-tuning-rlhf":
      return <AlignmentLesson />;
    default:
      return null;
  }
}
