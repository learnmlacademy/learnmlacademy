# ML Academy — Laptop Migration Guide

This package contains the current working source of the ML Academy website. It intentionally excludes `node_modules`, `dist`, temporary browser profiles, screenshots, and older ZIP exports. Those files are generated locally and should not be transferred between computers.

## What is included

- Complete `src` application source
- Complete `public` assets
- `package.json` and the exact `package-lock.json`
- Vite, TypeScript, Netlify, and Vercel configuration
- Sitemap generator and project documentation
- The expanded Machine Learning, Deep Learning, Generative AI, LLM, Agentic AI, blog, and interview content
- The redesigned Deep Learning lessons, including the dedicated Neural Networks and Activation Functions pages and labelled diagrams across all 41 Deep Learning topics

## Recommended software on the laptop

1. Install Git from https://git-scm.com/downloads
2. Install Node.js 22 LTS from https://nodejs.org/
3. Install Codex and sign in with the same account if you want to continue using Codex.
4. Keep at least 2 GB of free disk space for dependencies and generated files.

## Fastest way to continue

1. Copy the ZIP file to the laptop using a USB drive, OneDrive, Google Drive, or another trusted transfer method.
2. Extract it to a normal project folder such as:

   `C:\Projects\learnmlacademy`

3. Open PowerShell inside the extracted folder.
4. Confirm the tools:

   ```powershell
   node --version
   npm --version
   ```

5. Install the exact dependency versions recorded in the lockfile:

   ```powershell
   npm ci
   ```

6. Validate the source:

   ```powershell
   npm run lint
   npx vite build --configLoader runner
   ```

7. Start the editable development website:

   ```powershell
   .\scripts\start-development.ps1
   ```

8. Open http://127.0.0.1:3001/ in a browser.

The development server automatically reloads the page after source changes.

## Recommended GitHub workflow

The transferred workspace does not contain Git history. To reconnect it safely to the existing GitHub repository:

1. Clone the repository into a separate folder:

   ```powershell
   git clone https://github.com/learnmlacademy/learnmlacademy.git
   cd learnmlacademy
   ```

2. Copy the contents of the extracted migration package into this cloned folder. Allow matching source and configuration files to be replaced. Do not copy `node_modules` or `dist`.
3. Review the changes:

   ```powershell
   git status
   git diff --stat
   ```

4. Install and validate:

   ```powershell
   npm ci
   npm run lint
   npx vite build --configLoader runner
   ```

5. After reviewing the local website, create a new branch and commit:

   ```powershell
   git switch -c website-expansion
   git add .
   git commit -m "Expand AI curriculum and redesign Deep Learning lessons"
   ```

6. Push only when you are satisfied with the preview:

   ```powershell
   git push -u origin website-expansion
   ```

## Continuing the work in Codex

Open the extracted or Git-cloned project folder in Codex. If this existing task is available after signing in, continue from it. Otherwise, begin a new task and use this prompt:

> Read `LAPTOP_MIGRATION_GUIDE.md` and inspect the current project before editing. This is the migrated ML Academy website. Preserve the existing Machine Learning content and continue improving the expanded Deep Learning, Generative AI, LLM, and Agentic AI lessons in the established beginner-friendly format. Deep Learning pages must explain terms before using them and include topic-specific labelled diagrams, real-life examples, step-by-step reasoning, code, comparisons, limitations, and checks. Run TypeScript validation and a production build after changes.

## Important project locations

- Curriculum order: `src/data/curriculum.ts`
- Topic routing: `src/pages/TopicPage.tsx`
- Shared expanded-AI lessons: `src/content/modernai/ModernAIContent.tsx`
- Deep Learning examples and labelled diagrams: `src/content/deeplearning/DeepLearningIllustratedExample.tsx`
- Neural Networks lesson: `src/content/deeplearning/NeuralNetworksContent.tsx`
- Activation Functions lesson: `src/content/deeplearning/ActivationFunctionsContent.tsx`
- Deep Learning introduction: `src/content/deeplearning/DeepLearningIntroContent.tsx`
- Sidebar/navigation: `src/components/layout/AppLayout.tsx`
- SEO metadata: `src/utils/seo.ts`

## Troubleshooting

### `npm ci` fails

Confirm that Node.js 22 LTS is installed, delete only the newly generated `node_modules` folder, and run `npm ci` again. Do not delete source files or `package-lock.json`.

### Port 3001 is already in use

Start on another port:

```powershell
.\scripts\start-development.ps1 -Port 3002
```

Then open http://127.0.0.1:3002/.

### Refreshing a lesson produces a 404 after deployment

Keep the included `netlify.toml` or `vercel.json`. These files configure the single-page application fallback required for routes such as `/learn/neural-networks`.

### The page shows an older version

Stop the server with `Ctrl+C`, rebuild it, restart it, and perform a hard refresh in the browser with `Ctrl+Shift+R`.

## Final verification checklist

- Home page opens.
- `/blog` opens after a direct refresh.
- `/learn/neural-networks` opens.
- `/learn/activation-functions` opens.
- `/learn/mlp-universal-approximation` shows the labelled concept diagram.
- Sidebar expands the correct learning path.
- `npm run lint` passes.
- `npx vite build --configLoader runner` passes.
