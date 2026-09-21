# Codex Handoff — Learn ML Academy

## Handoff identity

- Project: Learn ML Academy
- Upstream repository: `https://github.com/learnmlacademy/learnmlacademy.git`
- Site: `https://www.learnmlacademy.com/`
- Local development URL: `http://127.0.0.1:3001/`
- Package prepared: 3 September 2026
- Package type: complete editable source without machine-specific dependencies or Git metadata

## What the user expects on the laptop

When the user says **“I have logged in from laptop”**, treat that as a request to resume this migration. Do not ask the user to run development commands manually unless access is blocked.

Proceed in this order:

1. Confirm the current workspace contains `package.json`, `package-lock.json`, `src`, and this handoff file.
2. Read `AGENTS.md` and this file completely.
3. Inspect Node and npm versions. Prefer Node.js 22 LTS or another version supported by the locked dependencies.
4. Run `npm ci` to create laptop-native dependencies.
5. Run `npm run lint`.
6. Run `npx vite build --configLoader runner`.
7. Start the editable development server with `.\scripts\start-development.ps1`. If this machine has a Vite optimizer issue, use `.\scripts\start-preview.ps1` for the stable production preview.
8. Open `http://127.0.0.1:3001/` in the Codex browser.
9. Verify the home page, `/blog`, `/learn/neural-networks`, `/learn/activation-functions`, and `/learn/mlp-universal-approximation`.
10. Report any laptop-only error with its concrete cause and fix it when safely in scope.

If the user opened only the Codex app but has not copied, extracted, or cloned the project onto the laptop, explain that the account transfers conversation context but not desktop filesystem contents. Ask for the exact ZIP location or ask the user to copy it to the laptop. Once the location is known, perform extraction and setup for them.

## Current completed work

- Existing Machine Learning content was retained.
- Curriculum expanded with Deep Learning, Generative AI, LLM, Agentic AI, and Interview Preparation paths.
- Sidebar redesigned into expandable learning paths with short previews of collapsed paths.
- Home-page counts were made data-driven and the obsolete promotional badge was removed.
- Blog articles were surfaced on the home page.
- SPA route fallbacks were added for direct refreshes.
- Mobile layouts were inspected and corrected.
- Deep Learning curriculum contains 41 lessons in learning order.
- Activation Functions is lesson 3 and Neural Networks Explained is lesson 4.
- Neural Networks and Activation Functions have dedicated beginner-focused pages with original labelled diagrams.
- All 41 Deep Learning lessons have topic-specific real-life examples, “why this matters” explanations, labelled visual data, step-by-step reasoning, final results, comparison tables, code, limitations, exercises, and further reading.
- Repetitive “Where This Fits in the Bigger Picture” content was removed from Deep Learning lessons.
- The generic “Build a Mental Model” treatment was replaced with example-connected explanations.
- The optimizer lesson separately explains SGD, Momentum, and Adam and compares practical scenarios.

## Important files

- `src/data/curriculum.ts` — curriculum order and topic IDs
- `src/pages/TopicPage.tsx` — lesson routing and custom-page mapping
- `src/components/layout/AppLayout.tsx` — expandable sidebar and page shell
- `src/content/modernai/ModernAIContent.tsx` — shared expanded-AI lesson renderer and content
- `src/content/deeplearning/DeepLearningIllustratedExample.tsx` — real-life examples and labelled diagrams for all 41 Deep Learning lessons
- `src/content/deeplearning/DeepLearningIntroContent.tsx` — dedicated Deep Learning introduction
- `src/content/deeplearning/NeuralNetworksContent.tsx` — dedicated beginner Neural Networks lesson
- `src/content/deeplearning/ActivationFunctionsContent.tsx` — detailed Activation Functions lesson with 12 functions
- `src/content/deeplearning/DeepLearningOptimizersGuide.tsx` — optimizer comparison material
- `src/utils/seo.ts` — page metadata
- `netlify.toml` and `vercel.json` — SPA route fallbacks

## Current validation state

Before packaging on the desktop:

- Deep Learning diagram-data coverage: 41/41
- Deep Learning real-life-example coverage: 41/41
- Deep Learning why-it-matters coverage: 41/41
- TypeScript validation: passed
- Vite production build: passed
- Representative chart, matrix, sequence, image, and graph lesson routes: HTTP 200 and visually inspected

## Package exclusions

These are intentionally absent and must be regenerated when needed:

- `node_modules`
- `dist`
- `work` browser profiles and screenshots
- older files from `outputs`
- `.git`

## First laptop response

After completing setup, tell the user:

- where the project was extracted or cloned;
- which Node and npm versions are active;
- whether dependency installation, lint, and build passed;
- the preview URL;
- which representative pages were checked.
