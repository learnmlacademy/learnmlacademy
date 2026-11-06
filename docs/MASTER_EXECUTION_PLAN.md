# LearnMLAcademy Master Execution Plan
**Engineering Roadmap, Quality Gates, and Content-Preservation Architecture**  
**Version:** 1.0.0  
**Baseline Commit:** `4da2ece18a2e359b397c1504fb8585c4df5eb473`  
**Governing Rule:** No page, lesson, handbook, blog, or utility page may lose even one character of its existing authored educational content.

---

## Executive Summary & Architecture Principles

LearnMLAcademy is a production-grade, zero-cost AI & Machine Learning educational platform consisting of **201 canonical static pages** (167 curriculum lessons across 17 sequential tracks, 13 project handbooks across 12 projects, 11 engineering blog guides, and 10 static foundation pages) containing **2,817,056 exact authored characters** (preserving Python indentation, code line breaks, math operators, block breaks), **2,654,695 normalized prose characters**, **4,015 educational headings**, **11,505 authored paragraphs**, **3,361 list items**, **488 captions**, **724 runnable code blocks** (362 interactive figure code blocks + 362 standalone pre-code blocks), **504 tables**, **47 formula derivations**, **124 visual figure shells**, **773 verified quiz questions**, **12 project starter ZIP archives**, and **10 interview PDF handbooks**.

To transform the platform into a world-class educational resource while upholding the **Absolute Content-Preservation Policy**, engineering work is partitioned into five distinct, sequential releases. Each release is governed by strict entry criteria, verified dependencies, quality gates, and automated regression suites.

---

## Release 1: Security, Credibility, and Brand Integrity

### Objectives
1. **Protected Asset Gating (10 Interview Handbooks)**:
   - *Problem*: The 10 interview PDFs are currently checked into the public repository under `private/` (~1.05 MB). While the web UI gates downloads behind email collection, direct repository visitors can access them without signing up.
   - *Action*: Migrate the static PDFs from public git storage to secure cloud storage (e.g. AWS S3 / Cloudflare R2 private bucket) or a private submodule with server-side time-limited signed download URLs generated upon Brevo contact verification.
2. **Hardened Newsletter & Contact API**:
   - *Action*: Ensure distributed Redis rate limiting (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`) is strictly enforced in all production environments.
   - *Action*: Transition `Content-Security-Policy-Report-Only` in `vercel.json` to an enforced `Content-Security-Policy` with explicit directives for Google Tag Manager, Google Analytics, and Brevo API origins.
3. **Public Git History & Secret Hygiene**:
   - *Action*: Audit public git commit history with automated scanning (`trufflehog` / `git-filter-repo`) to confirm zero residual credentials or sensitive staging tokens exist in any commit object.
4. **Homepage Claims & Credibility Alignment**:
   - *Action*: Ensure every metric badge on the homepage (e.g. "167 Free Lessons", "12 Projects", "17 Modules", "8 Tutorial Lessons") dynamically reflects the verified curriculum registry.
   - *Action*: Audit project duration promises (e.g. "Build in 30 minutes") against real learner installation, dataset download, and training timings.
5. **Brand Consistency Across All Surfaces**:
   - *Action*: Standardize naming conventions across `<title>`, Open Graph tags, footer notices, and schemas to `LearnMLAcademy` (or `ML Academy` where space-constrained).

### Quality Gates & Verification
- `npm run verify:content-preservation` passes with zero character regressions.
- Automated API test suite (`tests/contact-security.test.mjs`, `tests/newsletter-security.test.mjs`, `tests/rate-limiter.test.mjs`) passes 100%.
- PDF downloads require verified email signups with rate-limiting and origin verification.

---

## Release 2: Homepage & Visual Learning Architecture

### Objectives
1. **Full Homepage Visual Redesign**:
   - Modern, high-density editorial hero with instant curriculum search (`LessonSearch`).
   - Clean category cards with visual progress indicators (`useProgress`).
   - Zero layout shift during hydration (ensuring CLS = 0).
2. **Website-Wide Visual & Diagram Audit**:
   - Systematic inspection of all 26 SVG diagram components and 86 static image assets.
   - Standardize responsive viewBox parameters to ensure zero horizontal overflow down to 320px viewports.
3. **Interactive & Animated Visual Explanations**:
   - Introduce gentle, learner-paced CSS/Motion animations for complex tensor operations (backpropagation, CNN convolutions, attention matrices, diffusion denoising schedules).
   - Ensure all animations respect `prefers-reduced-motion: reduce`.
4. **Visual Accessibility & Performance**:
   - Every diagram must maintain an accessible `<title>`, `aria-describedby` caption, and high-contrast color scheme (`textbook.css` tokens).
   - Maintain deferred loading for heavy charting chunks (`recharts`, `d3`) so initial page loads stay under 50 KB gzip.

### Quality Gates & Verification
- Playwright mobile test (`.github/workflows/website-browser-quality.yml`) passes at 390px mobile viewport with zero horizontal overflow.
- Chrome Lighthouse audit achieves $\ge 95$ across Performance, Accessibility, Best Practices, and SEO.

---

## Release 3: SEO, Content Accuracy, and Accessibility

### Objectives
1. **167 Lesson-Specific Meta Descriptions**:
   - Replace any template-based or truncated meta descriptions with hand-crafted, high-CTR educational descriptions (between 130 and 155 characters).
2. **Heading Hierarchy & Semantic Architecture — implemented in PR #81**:
   - Audited all 201 canonical prerendered pages and corrected semantic heading levels while preserving exact authored heading text and multiplicity.
   - Added a blocking rendered-HTML audit for one main landmark, one H1, non-empty accessible heading text, and no skipped heading levels. The latest CI audit reports 201/201 pages clean and zero violations.
3. **Sitemap Date Synchronization**:
   - Emit `lastmod` only when a per-page `dateModified` is explicitly verified, and keep the sitemap value identical to the page's `TechArticle` / `LearningResource` JSON-LD value.
   - Omit unsupported modification dates; never use a global fallback, a project placeholder, or a blog publication date as `lastmod`.
4. **Consolidation of Stale PR Work — audit completed 2026-11-06**:
   - Confirmed that the merged teaching-visual work in PRs #26, #27, #28, #38, #39, #43, #44, #49, and #75 is already present in current `main` and referenced by the relevant project pages. This includes the movie-rating matrix and cosine-similarity visuals, four PDF RAG concept diagrams, PDF RAG Semantic evidence screenshots, and Titanic / House Price / Movie Recommender training and application visuals.
   - Compared the remaining visual and project branches against `main`. Their relevant components and assets are already integrated, their source pages are older snapshots, or they are substantially behind/diverged from current `main`; no additional cherry-pick was justified. No lesson or handbook text was changed during this audit.
   - No formal GitHub review submissions were recorded for the sampled historical merged PRs. Their existing visuals are therefore described as merged and CI-verified, not as formally peer-approved. Require explicit reviewer sign-off for any new diagram work.
5. **Advanced Generative AI and Agentic AI Audits — source coverage completed 2026-11-06**:
   - Added lesson-specific primary research and current official references to all 16 Agentic AI and 17 GenAI lessons. GenAI references now point directly to foundational GAN, VAE, diffusion, latent diffusion, guidance, ControlNet, DreamBooth, LoRA, multimodal, audio/video, synthetic-data, evaluation, safety, application, and serving sources.
   - Added the missing `Verified Further Reading` section to the Agentic AI lesson renderer. Each of the 33 lessons now has at least two curated HTTPS references; automated checks compare source coverage against the actual curriculum lesson IDs.
   - Rechecked the Agentic content against current tool-calling documentation, the ReAct and Reflexion research, context token-counting/compaction guidance, AgentDojo/AgentBench/OSWorld evaluation research, current LangGraph/CrewAI/AutoGen documentation, and the versioned MCP specification dated 2026-07-28.
   - The 32,000-token worked budget is explicitly a hypothetical selected model/API limit, not a universal context-window claim. The MCP lesson deliberately describes stable host/client/server/service responsibilities without hard-coding version-specific initialization fields. Existing lesson explanations, examples, calculations, and code were not rewritten; this audit adds source links and regression protection only.

### Quality Gates & Verification
- `npm run verify:prerender` validates unique titles, lesson meta descriptions (130–155 characters), canonical exactness, JSON-LD validity, and the rendered heading hierarchy across all 201 canonical pages.
- Schema validation passes Google Rich Results testing for `TechArticle`, `LearningResource`, `HowTo`, and `BreadcrumbList`.

---

## Release 4: Client-Side Interactive Python Execution

### Objectives
1. **Complete Python Example Inventory**:
   - Audit the 49 JSON lab exercises and 98 content code blocks for browser compatibility.
2. **WebAssembly / Pyodide Integration**:
   - Implement client-side Python execution in the browser using Pyodide (WASM) running inside a dedicated Web Worker.
   - Avoid costly, vulnerable server-side code execution infrastructure.
3. **Lazy-Loaded Runtime & On-Demand Packaging**:
   - The ~12 MB Pyodide WASM runtime and scientific packages (`numpy`, `pandas`, `scikit-learn`, `matplotlib`) must be loaded strictly on-demand when the learner clicks "Run Code".
   - Zero impact on initial page load times or Lighthouse performance scores.
4. **Phased Rollout Starting with 10 Priority Lessons**:
   - Phase 1: `what-is-ml`, `linear-regression`, `train-test-split`, `decision-trees`, `kmeans`, `logistic-regression`, `evaluation-metrics`, `confusion-matrix`, `knn`, `pca`.
   - Phase 2: Expand to all 49 Modern AI lab exercises.
5. **Clear Execution Boundaries**:
   - Heavy deep learning (PyTorch, TensorFlow, large language models) and external API tools remain clearly labeled as local-only or Docker-based exercises.

### Quality Gates & Verification
- Web Worker isolates user code from the main UI thread.
- Memory limit and execution timeout (5-second ceiling) guard against infinite loops.
- Fallback to static code block display if WebAssembly is unsupported.

---

## Release 5: Learner Experience, Community, and Long-Term Growth

### Objectives
1. **Learner Accountability & Transparency**:
   - Display verified author bylines, expert reviewer credentials, and publication / review dates on every lesson and handbook.
2. **Structured Learning Journeys**:
   - Guided learning paths (Beginner Data Scientist, NLP Engineer, Computer Vision Specialist, MLOps / AI Engineer, Agentic AI Architect).
3. **Learner Feedback & Diagnostic Diagnostics**:
   - Interactive diagnostic quiz checks with actionable explanations.
   - Non-intrusive "Was this helpful?" feedback widget storing aggregate ratings.
4. **Community & Showcase**:
   - Enable learners to share completed GitHub project repositories built from the 12 project handbooks.

### Quality Gates & Verification
- Privacy-first: zero tracking cookies or invasive third-party telemetry.
- All user state managed client-side via `localStorage` with offline progress export/import.

---

## Dependencies & Release Roadmap Matrix

```
[Release 1: Security & Credibility]
  ├── Gated PDF Architecture (Cloud Storage + Signed URLs)
  ├── Enforced CSP & Distributed Redis Rate Limiting
  └── Homepage & Brand Consistency
          │
          ▼
[Release 2: Visual Learning Architecture]
  ├── Homepage Redesign & Mobile Viewport Safeguards
  ├── Responsive Diagrams (26 SVGs / Figures)
  └── Motion/CSS Tensor Animations (Accessible & Reduced-Motion)
          │
          ▼
[Release 3: SEO, Accuracy & Accessibility]
  ├── 167 Unique SEO Meta Descriptions
  ├── Heading Hierarchy & Sitemap Lastmod Sync
  └── Schema.org Enrichment (LearningResource & HowTo)
          │
          ▼
[Release 4: Interactive Python (Pyodide)]
  ├── Web Worker WASM Execution Architecture
  ├── On-Demand Scientific Package Loading (Zero Initial Bundle Impact)
  └── Priority Lesson Rollout (10 Core ML Lessons)
          │
          ▼
[Release 5: Learner Experience & Growth]
  ├── Author Bylines, Credentials & Review Timestamps
  ├── Structured Learning Journeys
  └── Learner Project Showcases
```

All releases must execute `npm run verify:content-preservation` as a blocking CI gate. No PR may merge if authored characters, headings, paragraphs, code blocks, tables, formulas, or quiz questions are decreased.
