# ML Academy Repository Instructions

Read `CODEX_HANDOFF.md` before making changes. This repository is the migrated working copy of the Learn ML Academy website.

## User intent

- Preserve the user’s original Machine Learning lessons unless a change is explicitly requested.
- Continue expanding and improving Deep Learning, Generative AI, Large Language Models, and Agentic AI.
- Write for beginners in simple English.
- Explain unfamiliar terms before using them.
- Use an everyday problem, numbered reasoning, a final result, practical code, comparisons, limitations, and checks.
- Deep Learning lessons must use original, explicitly labelled diagrams that explain the topic rather than decorative images.
- Keep new writing original and independently expressed. Do not copy tutorial text or third-party diagrams.
- Maintain the existing visual design, routing, sidebar behavior, mobile layout, and lesson navigation.

## Mandatory teaching standard for every lesson page

This is a locked, site-wide content rule. Apply it to every new lesson and every lesson that is substantially revised, regardless of subject area. Do not treat a short definition, summary, or collection of revision notes as a complete lesson.

### Mandatory research before writing

Before creating or substantially revising any lesson page, research that exact topic on multiple established tutorial websites. Include relevant beginner-oriented sources such as GeeksforGeeks and Analytics Vidhya when they have useful coverage, and examine other strong tutorials when appropriate.

For every researched topic:

1. Review how several tutorials introduce the concept, order the subtopics, explain terminology, use examples, and support the explanation with formulas, diagrams, graphs, tables, code, applications, comparisons, advantages, limitations, and selection guidance.
2. Identify important teaching points or subtopics that the current ML Academy page is missing.
3. Verify technical definitions, formulas, framework behaviour, and API details with authoritative primary sources such as official documentation or original papers when applicable.
4. Use the research to improve topic coverage and teaching structure, but write all prose, examples, calculations, tables, diagrams, figures, and code independently in the ML Academy format.
5. Never copy or closely paraphrase another tutorial, reproduce a third-party diagram, imitate its branding, or present its material as original work.
6. Do not add a “sources,” “further reading,” or research-link section inside the lesson unless the user explicitly requests one. Research informs the lesson; it is not automatically displayed on the webpage.
7. Record which sources were reviewed during the work and mention them in the completion report when useful, without inserting them into the lesson itself.

Build each lesson in a natural progression appropriate to its topic:

**Introduction → purpose → intuition → terminology → visual explanation → formula (when relevant) → worked example → interpretation → practical choices → code (when useful) → mistakes and limitations → takeaway**

Every completed lesson must, where applicable:

1. Begin with a concrete, beginner-friendly introduction that says what the topic is and what the learner will understand.
2. Explain why the concept is needed and the problem it solves before discussing implementation details.
3. Introduce the intuition with simple English and a relatable example before mathematical notation.
4. Define every unfamiliar technical term before relying on it later in the lesson.
5. Include original, clearly labelled teaching diagrams, figures, process flows, graphs, or tables whenever they make the idea easier to understand. Visuals must teach rather than decorate.
6. Present relevant formulas clearly and explain every symbol immediately beside the formula.
7. Include a reproducible, step-by-step numerical example using small values whenever calculation is part of the concept.
8. Explain what the numerical or visual result means in practical language.
9. Tell the learner when to use the method, when not to use it, and which alternative fits common scenarios.
10. Connect the concept to realistic applications and include practical code when code adds learning value.
11. Explain common mistakes, misconceptions, disadvantages, limitations, and useful diagnostic checks.
12. End with a concise takeaway that connects the topic to the wider learning path.

Adapt section names and order to the concept. Do not force identical template headings across pages, and do not repeatedly use vague headings such as “Lesson Map,” “Build the Complete Idea,” “The Big Picture,” or “Words You Need Before the Diagram.” Prefer headings that state exactly what the section teaches.

More text alone does not satisfy this standard. Prefer a useful diagram, comparison table, graph, or worked calculation when it communicates the idea more clearly than several paragraphs.

### Locked naive-learner traceability rule

Never force a beginner to infer an unexplained intermediate step. Whenever a lesson uses a number, symbol, tensor shape, formula, diagram, transformation, architecture label, hyperparameter, or important framework call, make the following traceable from the page itself:

1. What the value or term represents.
2. Where it came from: data, developer choice, hyperparameter, random initialization, learned parameter, framework default, model output, or calculation.
3. What is multiplied, added, divided, normalized, exponentiated, selected, or transformed.
4. Why that operation is needed, not only how to perform it.
5. What the intermediate and final results mean in practical language.
6. Which dimensions were chosen and which were calculated by an earlier operation.
7. What important framework calls do internally, including gradient calculation, parameter updates, mode changes, reshaping, masking, normalization, and probability conversion.

Use the smallest effective teaching sequence for difficult mathematics:

**inputs → operation → intermediate result → final result → interpretation**

Prefer one progressive example that grows with the lesson. Every diagram must answer a specific learner question such as where information moves, which values interact, which dimensions change, which values are shared, or which values are learned. Advanced topics require more conceptual scaffolding, not more compressed writing. Improve understanding through missing reasoning, diagrams, tiny calculations, and consolidation rather than length for its own sake.

Before considering any lesson complete, verify that a first-time learner can answer these questions from the page alone:

- What is the concept?
- Why is it needed?
- How does it work?
- What does each important term, diagram, and formula mean?
- Can I reproduce the worked example?
- When should I use it, avoid it, or choose an alternative?
- How does it connect to the surrounding subject?

## Required verification

After code or content changes, run:

```powershell
npm run lint
npx vite build --configLoader runner
```

For local preview, use:

```powershell
npx vite --host 127.0.0.1 --port 3001
```

## Safety and version control

- This transferred package does not include `.git` history.
- Prefer placing its files over a fresh clone of `https://github.com/learnmlacademy/learnmlacademy.git` before committing.
- Do not deploy, publish, push, rewrite Git history, or replace existing lessons unless the user explicitly requests it.
- Do not include `node_modules`, `dist`, temporary browser profiles, or preview screenshots in commits or transfer packages.
