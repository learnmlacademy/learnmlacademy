import { useId } from 'react';
import { Link } from 'react-router-dom';
import { Callout } from '../../components/content/Callout';
import { CodeBlock } from '../../components/content/CodeBlock';
import { DataTable } from '../../components/content/DataTable';
import { FigureShell } from '../../components/content/FigureShell';
import { SummaryCard } from '../../components/lesson/SummaryCard';

function GenerationLoop() {
  const arrowId = `intro-loop-${useId().replace(/:/g, '')}`;
  return (
    <FigureShell title="One addition becomes part of the next prediction" caption="Read → predict → add → repeat. Each return around the loop uses the longer text, not the original prompt alone." accessibleDescription="The sky is enters prediction. In this toy example blue is selected and added, making The sky is blue. An arrow returns the updated text to prediction. Continue until a stopping condition is reached.">
      <svg viewBox="0 0 340 390" className="mx-auto block w-full max-w-[420px]" role="img" aria-label="Repeated prediction with a feedback arrow">
        <defs><marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4338ca" /></marker></defs>
        <g fill="none" stroke="#4338ca" strokeWidth="2.5" markerEnd={`url(#${arrowId})`}>
          <path d="M 152 65 V 101" /><path d="M 152 173 V 211" /><path d="M 152 282 V 330" />
          <path d="M 266 247 H 314 V 136 H 266" />
        </g>
        <rect x="22" y="10" width="244" height="55" rx="12" fill="#eef2ff" stroke="#a5b4fc" />
        <text x="144" y="44" textAnchor="middle" fontSize="18" fill="#1e293b">The sky is</text>
        <rect x="22" y="104" width="244" height="69" rx="12" fill="#eef2ff" stroke="#a5b4fc" />
        <text x="144" y="131" textAnchor="middle" fontSize="17" fontWeight="700" fill="#312e81">Predict, then choose</text>
        <text x="144" y="156" textAnchor="middle" fontSize="16" fill="#334155">This time: “blue”</text>
        <rect x="22" y="214" width="244" height="68" rx="12" fill="#ecfdf5" stroke="#6ee7b7" />
        <text x="144" y="239" textAnchor="middle" fontSize="15" fill="#065f46">Add the chosen text</text>
        <text x="144" y="264" textAnchor="middle" fontSize="18" fontWeight="700" fill="#064e3b">The sky is blue</text>
        <text x="305" y="196" textAnchor="middle" transform="rotate(-90 305 196)" fontSize="14" fill="#312e81">Use longer text</text>
        <rect x="22" y="333" width="244" height="45" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="144" y="361" textAnchor="middle" fontSize="16" fill="#334155">Stop when finished / at limit</text>
      </svg>
    </FigureShell>
  );
}

function TrainingAndUsing() {
  const paths = [
    { title: 'Training: change the model', steps: ['Example: The cat sat on the …', 'Predict: chair gets the highest score', 'Compare with the actual next text: mat', 'Calculate error; adjust parameters'], repeat: '↺ Repeat with more training examples', note: 'The internal numerical values change.' },
    { title: 'Using: grow the answer', steps: ['User text: Explain gravity simply.', 'Predict possible next text; choose one', 'Add the chosen token to the text', 'Use the longer text to predict again'], repeat: '↺ Repeat until finished or at a limit', note: 'Ordinary generation does not update the parameters.' },
  ];
  return (
    <FigureShell title="Learning changes the model; using it grows the text" caption="Both processes make predictions. Only the training path shown here uses prediction error to adjust the model." accessibleDescription="Two paths contrast learning from examples with generating a reply. Training loops through examples, prediction, error and parameter adjustment. Generation loops through user text, prediction and appending a token, with parameters fixed.">
      <div className="grid gap-6 md:grid-cols-2">
        {paths.map((path) => <div key={path.title} className="min-w-0 rounded-xl border border-[var(--lma-brand-border)] bg-[var(--lma-brand-soft)] p-4">
          <h4 className="mb-4 text-base font-bold text-[var(--lma-brand-text)]">{path.title}</h4>
          <ol className="m-0 list-none p-0">
            {path.steps.map((step, index) => <li key={step}>
              {index > 0 && <div className="py-1 text-center text-xl font-bold text-indigo-700" aria-hidden="true">↓</div>}
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-800">{step}</div>
            </li>)}
          </ol>
          <p className="mt-4 border-l-2 border-indigo-500 pl-3 text-sm font-semibold text-indigo-900">{path.repeat}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{path.note}</p>
        </div>)}
      </div>
    </FigureShell>
  );
}

const workedSteps = [
  ['Machine learning allows computers to', 'learn', 'Machine learning allows computers to learn'],
  ['… computers to learn', 'patterns', '… computers to learn patterns'],
  ['… learn patterns', 'from', '… learn patterns from'],
  ['… learn patterns from', 'data', '… learn patterns from data'],
  ['… learn patterns from data', '.', 'Machine learning allows computers to learn patterns from data.'],
];

export function LLMIntroProofContent() {
  return (
    <div className="space-y-9 text-[var(--lma-text-secondary)] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--lma-brand-text)] [&_p]:leading-relaxed">
      <section className="space-y-4">
        <p className="text-lg">You type <strong>“Explain gravity to a 10-year-old.”</strong> into an AI chatbot. A few moments later, an explanation appears, perhaps beginning: “Gravity is a force that pulls things toward each other.” How did the AI decide what words to write?</p>
        <p>Underneath the chatbot is a model called a <strong>Large Language Model</strong>, usually shortened to <strong>LLM</strong>. An LLM learns patterns from huge amounts of text and uses those patterns to predict what text should come next.</p>
        <p>Think of the reply as something built a little at a time: <strong>read the existing text → predict what comes next → add it → repeat.</strong> This lesson follows that process, explains how the model learns, and shows why a convincing reply can still be wrong.</p>
      </section>

      <section className="space-y-4">
        <h2>Start with a familiar idea: autocomplete</h2>
        <p>If someone says <strong>“The sky is …”</strong>, you can suggest several continuations. “Blue,” “clear,” and “cloudy” sound natural. “Banana” is possible to type, but unusual in this sentence. A language model also ranks possible continuations, using patterns learned from text.</p>
        <p>It can assign each candidate a <strong>probability</strong>: a number expressing how likely that continuation is according to the model. A larger percentage makes a candidate more likely to be selected; it does not certify that a statement is true.</p>
        <DataTable title="Invented next-word probabilities after “The sky is”" minWidthClassName="min-w-0" headers={['Possible next word', 'Illustrative probability']} rows={[
          ['blue', '70%'], ['clear', '15%'], ['cloudy', '10%'], ['banana', '0.1%'], ['All other possibilities together', '4.9%'],
        ]} />
        <p>These numbers are invented for teaching, not measurements from a commercial LLM. The final row accounts for the possibilities we have not listed, so the total is 100%.</p>
        <p>For this example, choose the highest-probability word: <strong>blue</strong>. The text becomes “The sky is blue.” Now predict again using that longer text. A next addition could be “today,” or the sentence could end. The prediction changes as the text grows.</p>
        <GenerationLoop />
        <p>Real generation can also select among several likely alternatives instead of always taking the top candidate. That helps explain why the same request can receive differently worded replies.</p>
      </section>

      <section className="space-y-4">
        <h2>The small pieces are called tokens</h2>
        <p>So far we used whole words to make the idea easy. Real LLMs usually work with pieces of text called <strong>tokens</strong>. A token can be a whole word, part of a word, or punctuation.</p>
        <div className="not-prose rounded-xl border border-[var(--lma-border-default)] bg-[var(--lma-canvas)] p-4">
          <p className="mb-3 font-semibold">One conceptual split of “playing!”</p>
          <div className="flex flex-wrap items-center gap-2" aria-label="playing exclamation mark splits conceptually into play, ing and exclamation mark">
            <span>playing!</span><span aria-hidden="true">→</span>{['play', 'ing', '!'].map(piece => <span key={piece} className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 font-mono text-indigo-900">{piece}</span>)}
          </div>
          <p className="mt-3 text-sm">This is an illustration, not the output of a particular model’s text-splitting method. Different models can split the same text differently.</p>
        </div>
        <p>So “predict the next word” was a useful starting picture; <strong>predict the next token</strong> is the more accurate description. The next lesson explores how text is split and represented as numbers.</p>
      </section>

      <section className="space-y-4">
        <h2>Why is it called “large”?</h2>
        <p>“Large” refers to the scale of the model and the resources used to teach it, not simply the length of its replies.</p>
        <ul className="list-disc space-y-3 pl-6">
          <li><strong>Large training datasets:</strong> huge collections of text provide examples of language, facts, styles, and relationships. The collection’s quality matters as well as its size.</li>
          <li><strong>Many learned parameters:</strong> a parameter is an internal numerical value the model adjusts while learning. Together, these values influence its predictions; they are not a collection of individually labelled facts.</li>
          <li><strong>Substantial computation:</strong> teaching a model involves repeating enormous numbers of calculations. Producing replies also requires computation, but is a different activity from training.</li>
        </ul>
        <p>There is no single parameter count that makes every model an LLM. Nor does a larger model automatically give a better answer to every task.</p>
      </section>

      <section className="space-y-4">
        <h2>How does an LLM learn from text?</h2>
        <p>Imagine a training sentence: <strong>“The cat sat on the mat.”</strong> Give the model the beginning, “The cat sat on the”, and ask it to predict the next piece. The text itself supplies the expected continuation: “mat”.</p>
        <ol className="list-decimal space-y-3 pl-6">
          <li><strong>Predict:</strong> suppose “chair” receives the highest score, while “mat” receives a low probability.</li>
          <li><strong>Compare:</strong> the actual continuation in this training example is “mat”. “Chair” is a sensible sentence ending, but it is not the continuation observed here.</li>
          <li><strong>Calculate error:</strong> a loss function measures how poorly the prediction fits the observed continuation. Giving “mat” a low probability produces a larger error than giving it a high probability.</li>
          <li><strong>Adjust:</strong> training makes small changes to the internal parameters to reduce that error. One update does not guarantee that “mat” will become the top choice immediately.</li>
          <li><strong>Repeat:</strong> many examples and updates gradually teach patterns that can help with new text, rather than only this one sentence.</li>
        </ol>
        <p>This is the same learning idea used earlier in Machine Learning: <strong>examples → error → adjustment → better prediction.</strong> Here, the target comes from the text that follows. Training on varied examples helps the model learn language, but does not guarantee correctness or prevent it from memorizing some passages.</p>
      </section>

      <section className="space-y-4">
        <h2>Training and answering a user are different jobs</h2>
        <p>During training, the model’s parameters are adjusted. When you normally ask a trained model a question, those values stay fixed. The model uses them to generate a reply; this use of a trained model is called <strong>inference</strong>.</p>
        <TrainingAndUsing />
        <p>A follow-up message can change the next answer because it changes the text the model can read. That does not mean the model has retrained itself. An application may separately store a conversation or use feedback for later training; that is outside the ordinary generation loop.</p>
      </section>

      <section className="space-y-4">
        <h2>The LLM is the engine, not the whole chatbot</h2>
        <p>A car needs more than an engine: it also needs controls, a body, and safety systems. Similarly, the LLM is one part of an AI application. The surrounding software decides what to send to the model and what to do with its answer.</p>
        <DataTable title="Model capability versus application support" headers={['Part', 'What it does']} rows={[
          ['LLM — the engine', 'Predicts possible next tokens and helps generate the reply.'],
          ['Instructions and conversation handling', 'Tell the model what task to perform and include relevant earlier messages.'],
          ['Retrieval', 'Finds passages in a document collection and supplies them with the request.'],
          ['Tools', 'Let the application call a calculator, search service, or other program when permitted.'],
          ['Memory', 'Stores selected information and brings it back into later requests.'],
          ['Safety checks and interface', 'Apply application rules and provide the screen where a user reads and types.'],
        ]} />
        <p>Not every chatbot includes every feature in this table. In particular, a fluent answer alone is not evidence that the application searched the web or consulted a database.</p>
      </section>

      <section className="space-y-4">
        <h2>A short history: the prediction idea grew more capable</h2>
        <p>Early approaches counted how often words appeared together. Short groups of consecutive words or tokens are called <strong>n-grams</strong>. A model relying on these counts can struggle when a phrase has never appeared in its examples.</p>
        <p>Neural language models instead learn numerical patterns shared across examples, so learning from one phrase can help with another. Later, <strong>Transformers</strong> introduced a neural-network design that uses attention—a way to connect relevant parts of the input text. Many modern LLMs build on this design with much larger training efforts.</p>
        <p className="rounded-xl bg-[var(--lma-canvas)] p-4 font-semibold">Word counts / n-grams → neural language models → Transformers → modern LLMs</p>
        <p>This is a map of the progression, not a list of prerequisites to memorize. Keep the anchor: the model uses the text already available to help predict what follows.</p>
      </section>

      <section className="space-y-4">
        <h2>What can you ask an LLM to do?</h2>
        <p>The same text-generation ability can serve different purposes when the request explains the task.</p>
        <DataTable title="Familiar tasks, concrete requests" headers={['Task', 'Example request']} rows={[
          ['Answer or explain', 'Explain gravity to a 10-year-old.'],
          ['Summarize', 'Turn these lecture notes into five main points.'],
          ['Translate', 'Translate this message into Hindi.'],
          ['Classify', 'Label each customer message as a complaint, question, or compliment.'],
          ['Extract information', 'List the dates and deadlines mentioned in this email.'],
          ['Rewrite', 'Make this email clearer without changing its meaning.'],
          ['Generate code', 'Draft a Python function that sorts these records by date.'],
          ['Brainstorm', 'Suggest three possible titles for our college science exhibition.'],
        ]} />
        <p>These are possible uses, not promises of accuracy. Check a summary against the original, review a translation for meaning, and test generated code before relying on it.</p>
      </section>

      <section className="space-y-4">
        <h2>Why can a convincing answer still be wrong?</h2>
        <p>Recall what the model is doing: generating a plausible continuation. That is not the same as looking up guaranteed truth. The model can produce an incorrect date, rely on stale information, invent a reference that looks real, or repeat biases found in its examples.</p>
        <Callout role="mistake" title="Fluency is not verification"><p>A confident tone describes how an answer sounds, not how well it is supported. If you need the exact current wording of a policy, consult the authoritative document instead of treating a generated paraphrase as the original.</p></Callout>
        <p>Later lessons introduce retrieval-augmented generation (RAG), which supplies retrieved source material; evaluation, which checks performance; and guardrails, which apply safeguards. These help manage errors, but none makes every answer automatically correct.</p>
      </section>

      <section className="space-y-4">
        <h2>Worked example: build one sentence from beginning to end</h2>
        <p>Start with <strong>“Machine learning allows computers to”</strong>. The text available for the current prediction is called the <strong>context</strong>. Here, it initially contains only that sentence beginning.</p>
        <p>For a small teaching example, suppose each word below is a single token and punctuation is a separate token. Actual token splits depend on the model; the spaces needed to read the words are included when the text is assembled.</p>
        <DataTable title="First prediction — illustrative probabilities only" minWidthClassName="min-w-0" headers={['Candidate next token', 'Invented probability']} rows={[
          ['learn', '62%'], ['process', '18%'], ['predict', '12%'], ['banana', '0.01%'], ['All other candidates together', '7.99%'],
        ]} />
        <p>The values total 100% and are not measured model outputs. Choose the largest value for this demonstration: <strong>learn</strong>. The updated context is now “Machine learning allows computers to learn”. The next prediction must use this longer context, not reuse the first table.</p>
        <DataTable title="Each selection becomes input to the next step" headers={['Context before prediction', 'Chosen next token', 'Text after adding it']} rows={workedSteps} />
        <p>In the table, “…” hides the unchanged beginning only to keep the rows readable; the model still receives it. Each row involves a fresh prediction. Later choices are illustrative selections, not calculations from the first row’s percentages.</p>
        <p>After adding the full stop, this example ends: <strong>“Machine learning allows computers to learn patterns from data.”</strong> In an application, generation stops when an end signal or configured limit is reached; a full stop alone need not end a reply. Repeated next-token prediction is also called <strong>autoregressive generation</strong>: each addition helps determine the following one.</p>
      </section>

      <section className="space-y-4">
        <h2>The same loop in a few lines of pseudocode</h2>
        <p>This is a conceptual sketch, not runnable Python or a real model API. It shows the order of actions without hiding the lesson inside a large library program.</p>
        <CodeBlock title="Conceptual generation loop" type="pseudocode" wrap code={`text = "The sky is"
max_new_tokens = 20

for step in range(max_new_tokens):
    probabilities = model.predict_next_token(text)
    next_token = choose(probabilities)
    if next_token == END:
        break
    text = append_token(text, next_token)

show(text)`} caption="model, choose, END, append_token, and show are teaching placeholders, not imported functions." />
        <ul className="list-disc space-y-3 pl-6">
          <li><strong>text</strong> starts with the user’s input. The developer-chosen limit of 20 bounds how many new-token steps the loop attempts.</li>
          <li><strong>predict_next_token</strong> asks the trained model for probabilities using the current text. A real system first converts that text into the model’s token representation.</li>
          <li><strong>choose</strong> selects one candidate. In our toy examples it takes the highest probability; other selection rules are possible.</li>
          <li><strong>END</strong> represents a special stop signal. If selected, <strong>break</strong> exits the loop without adding it to the visible answer.</li>
          <li><strong>append_token</strong> adds the selected piece with the appropriate text spacing. The next iteration sees this updated text. <strong>show</strong> displays the result when the loop ends.</li>
        </ul>
        <p>There is no error calculation or parameter adjustment in this code: it depicts using a trained model, not teaching one.</p>
      </section>

      <section className="space-y-4">
        <h2>Pause and check the idea</h2>
        <p>An LLM says, “The Eiffel Tower is in Paris.” Does that necessarily mean it looked the fact up in a trusted database?</p>
        <details className="rounded-xl border border-[var(--lma-border-default)] bg-[var(--lma-canvas)] p-4">
          <summary className="cursor-pointer font-semibold text-[var(--lma-brand-text)]">Reveal the explanation</summary>
          <p className="mt-3"><strong>No.</strong> The model may have generated this sentence from patterns learned during training. It is a correct statement, but the sentence alone does not show that a lookup happened. To establish that a source was used, inspect the application’s retrieval evidence rather than its confident wording.</p>
        </details>
      </section>

      <section className="space-y-4">
        <h2>Next: how do pieces of language become numbers?</h2>
        <p>We have repeatedly said that an LLM predicts the next token. But exactly how is text divided into tokens? And since neural networks work with numbers rather than raw words, how does language become numerical information?</p>
        <p>The next lesson, <Link to="/learn/tokenization-embeddings">Tokens, Embeddings &amp; Context Windows</Link>, connects those steps. It explains embeddings—the numerical representations of tokens—and the context window, the limit on how much text a model can work with at once.</p>
      </section>

      <div data-llm-summary><SummaryCard items={[
        'LLM stands for Large Language Model: the model inside many AI text applications.',
        'It learns patterns from large amounts of text rather than needing a hand-written rule for every reply.',
        'Generation repeats a loop: predict the next token, choose it, add it, and predict again.',
        'Tokens are pieces of text, not necessarily whole words.',
        'Training uses prediction error to adjust internal numerical parameters; ordinary generation uses the trained values.',
        'Fluent output does not guarantee factual truth. Check important claims against reliable evidence.',
      ]} /></div>
    </div>
  );
}
