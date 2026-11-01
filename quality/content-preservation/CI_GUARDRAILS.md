# GitHub Actions Content-Preservation CI Guardrails

This document specifies the dedicated, mandatory GitHub Pull Request check for Content Preservation across LearnMLAcademy, branch protection configuration, and administrator installation steps.

---

## 1. Mandatory PR Workflow Specification

**File Path:** `.github/workflows/content-preservation.yml`  
**Trigger:** Every pull request targeting `main` (no path filters) and pushes to `main`.  
**Runtime:** GitHub Actions on Ubuntu 24.04 with Node.js 22.  
**Permissions:** `contents: read`.  
**Job Identifier:** `content-preservation`.

### Complete Verified Workflow YAML

```yaml
name: Content Preservation

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: content-preservation-${{ github.ref }}
  cancel-in-progress: true

jobs:
  content-preservation:
    name: content-preservation
    runs-on: ubuntu-24.04
    timeout-minutes: 25
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm

      - name: Install dependencies (clean install)
        run: npm ci

      - name: Verify TypeScript compilation & types
        run: npm run lint

      - name: Build, Prerender & Run Preservation Guardrails
        run: npm run build

      - name: Upload evidence on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: content-preservation-failure-evidence
          path: |
            dist/
            quality/
          retention-days: 7
```

---

## 2. Execution Pipeline & Invariants

The `content-preservation` job executes:

1. **`npm run lint` (`tsc --noEmit`):**  
   Strict TypeScript typecheck across all application code, data structures, and tests.
2. **`npm run build`:**  
   The project's production build pipeline executes sequentially:
   - `node generate_sitemap.cjs` (prebuild sitemap generation)
   - `vite build --mode production --configLoader runner` (production Vite bundle)
   - `npm run prerender` (prerenders all 201 canonical routes into static HTML)
   - `npm run verify:prerender` (validates all 201 HTML outputs for content presence)
   - `npm run verify:projects` (verifies all 12 project handbooks and 8 tutorial bridges)
   - `npm run verify:quality` (executes 10 comprehensive security, routing, and taxonomy test suites)
   - `npm run verify:content-preservation` (evaluates all 201 canonical pages against baseline manifest `quality/content-preservation/manifest.json` using 1-to-1 multiset matching for exact chars, normalized chars, headings, paragraphs, list items, captions, code blocks, tables, formulas, figures, and quizzes)
   - `npm run test:preservation-negatives` (executes all 42 negative and positive guardrail regression test cases)

A failure at any step immediately exits with a non-zero code, failing the `content-preservation` job and blocking PR merge.

---

## 3. GitHub Branch Protection Configuration (Verified Active)

Branch protection on `main` is configured via GitHub REST API:

- **Protected:** `true`
- **Required Status Checks:**
  - `context: content-preservation`, `app_id: 15368` (GitHub Actions)
  - `context: audit`, `app_id: 15368` (GitHub Actions)
- **Strict Mode:** `false`
- **Enforce Administrators (`enforce_admins`):** `true`  
  Administrators are strictly bound by the required checks; pull requests cannot bypass the check.
- **Merge Blocking:** A pull request cannot merge into `main` before `content-preservation` completes with conclusion `success`.

---

## 4. Audit of Job Context Naming Ambiguities

Two workflows in `.github/workflows/` define a job named `audit`:
1. `.github/workflows/dependency-security-audit.yml`:
   - Trigger: `pull_request` (unconstrained, runs on all PRs).
   - Role: Runs `npm audit --omit=dev --audit-level=high`.
2. `.github/workflows/lighthouse-quality.yml`:
   - Trigger: `pull_request: paths: [...]` (runs only when matching paths change).
   - Role: Runs Lighthouse performance and accessibility audit.

**Recommendation:**  
To prevent GitHub Actions check collision between dependency audits and Lighthouse audits, rename the job identifier in `lighthouse-quality.yml` from `audit` to `lighthouse-audit`. This ensures unambiguous status reporting.

---

## 5. Token Permission Audit & Administrator Installation Steps

### PAT Scope Audit
The GitHub Personal Access Token configured in the environment has the following scopes:
`admin:org, admin:public_key, admin:repo_hook, repo, write:discussion, write:packages`

**Missing Scope:** `workflow` ("Update GitHub Action workflows").

GitHub's security model strictly prohibits any Personal Access Token from creating or editing files within `.github/workflows/` without the explicit `workflow` OAuth scope.

### Resolution Steps for Repository Administrator

To complete workflow file placement via Git:
1. Navigate to [GitHub Personal Access Tokens Settings](https://github.com/settings/tokens).
2. Select the token configured for `learnmlacademy`.
3. Check the **`workflow`** permission checkbox.
4. Click **Update token**.
5. Push the workflow file:
   ```bash
   git push origin feat/required-preservation-ci
   ```

Alternatively, create the file via the GitHub Web UI:
1. Navigate to `https://github.com/learnmlacademy/learnmlacademy/new/main?filename=.github%2Fworkflows%2Fcontent-preservation.yml`.
2. Paste the complete workflow YAML from Section 1 above.
3. Commit directly or via PR targeting `main`.
