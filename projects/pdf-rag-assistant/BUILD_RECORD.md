# Project 10 engineering build record

## Scope and source baseline

- Branch: feat/pdf-rag-engineering, from current main
  4cf97700cd6eebab37c2fc3c0419be9b168a8750 (8 October 2026).
- Changes limited to projects/pdf-rag-assistant and its verification workflow.
  No deployment, merge, website handbook or other project changes.
- Original synthetic fixtures: policy.pdf and employee_guide.pdf, three pages each.
  Generated from source; no private/copyrighted document dependency.
- Local model: sentence-transformers/all-MiniLM-L6-v2, revision
  1110a243fdf4706b3f48f1d95db1a4f5529b4d41, 384 dimensions, Apache-2.0 model card.
  Official ONNX file and tokenizer are SHA-256 verified. CPU inference avoids
  PyTorch/GPU dependencies. Explicit attention-mask mean pooling and L2 normalization.
- Model card and official API references inspected:
  https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
  https://onnxruntime.ai/docs/api/python/api_summary.html
  https://huggingface.co/docs/tokenizers/api/tokenizer
  https://pypdf.readthedocs.io/en/stable/user/extract-text.html
  https://docs.streamlit.io/develop/api-reference/widgets/st.file_uploader

## Execution

Checkpoint A executed locally on Python 3.13.16. Pinned installation and pip
check passed. Both three-page fixtures extracted: 2 documents, 6 text pages,
6 chunks at 160 wordpiece tokens / 32 overlap, embeddings shape (6, 384).
Model weights/tokenizer downloaded anonymously and hashes matched. Both first
pages rendered with Poppler and visually checked. No fabricated output.

19 tests passed: extraction, rejection/limits, encrypted and mixed pages,
source identity, deterministic overlapping chunks, real embedding shape/unit
norms/cache reuse/padding equivalence and overlength rejection. Initial pytest
oversize-payload auto-ID exceeded Windows process environment limits; explicit
short test IDs fixed it. Offline cached-model rerun passed in 11.49 seconds.
Windows HF cache uses file copies instead of symlinks; no privilege changes.
Vector search, app and CI are not yet verified.

## Checkpoint B — executed locally

- Persisted demo index created from both synthetic PDFs: 6 pages / 6 chunks.
  JSON and float32 NPY are checksum-bound, shape checked and loaded without pickle.
- 49 tests passed in 10.38 seconds, including real MiniLM retrieval, index
  save/reload equivalence, alignment/model corruption, object-array rejection,
  source validation, fake provider and deterministic HTTP adapter tests.
- All six fixture questions ranked the expected page first: refund window
  policy/1; damaged-goods exception policy/2; international shipping policy/3;
  annual leave employee_guide/1; remote work employee_guide/2; meal limit
  employee_guide/3. Neptune orbital-period question abstained with no citations.
- Source IDs and exact quotations are validated against the selected retrieved
  chunks. Free-form claims are not accepted by this conservative extractive
  answer contract. Relevance/truth are not guaranteed by citation validation.
- Provider contract checked against official OpenAI Chat Completions/JSON docs:
  https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create
  https://developers.openai.com/api/docs/guides/structured-outputs
  Remote adapter tested with MockTransport only; no paid LLM call performed.

## Checkpoint C — app/CI implementation and local evidence

- The two explicit deletion tests passed; 51 core tests now cover safe named
  index deletion as well as extraction/retrieval/provider behavior.
- Evidence script executed 6 known queries, expected first page 6/6; cosine
  scores 0.4835, 0.6573, 0.6120, 0.7200, 0.5777, 0.7707 respectively in
  the query order above. Chunk settings 32/8 produced 12 chunks; 80/16 and
  160/32 each produced 6 chunks. Tables/JSON are ignored local reports.
- Original six fixture pages were rendered and visually checked with Poppler.
- Streamlit stores only each session's uploads/index/results in memory; only
  embedding weights are shared. Source text is rendered as plain text, not HTML
  or active Markdown. Remote mode requires explicit selection and consent.
- Full local run: 52 passed, Streamlit AppTest timed out at 20 seconds. One
  bounded retry at 30 seconds also timed out. No further local browser/server
  retries: CI will exercise AppTest and real Streamlit independently.
- Python source syntax and workflow structure checks passed. CI pending; no
  Streamlit runtime or screenshot success is claimed yet.

## First CI execution and screenshot review

- Run 37823277934 at commit 3a893f243ad8090b7496a70392d12b2ddc7027c5:
  https://github.com/learnmlacademy/learnmlacademy/actions/runs/37823277934
- Both jobs passed. Python suite: 53/53 passed in 7.39 seconds, including AppTest.
  npm run lint and Vite build passed. No unrelated dependency changes.
- Real Chromium uploaded both PDFs, built the index, asked the refund question,
  displayed policy.pdf page 1 and inspected retrieved evidence. Separate browser
  sessions did not share sources; clearing one preserved the other. No pageerrors.
- The real screenshots were downloaded and visually inspected. The first capture
  script photographed the disclosure animation too early; its desktop image did
  not show the evidence body, and mobile cut it off. This is a capture defect,
  not a claimed complete visual pass. The capture script now waits for expansion
  and checks that the entire panel fits inside the actual browser viewport.

## Capture framing correction

- Run 37823974108 passed all 53 tests and repository lint/build, but correctly
  failed the expanded-panel framing assertion. A fixed-height viewport did not
  contain the full evidence; this run is not a visual pass.
- The capture script now uses a taller real browser viewport and a bounded crop
  from Answer through the expanded evidence. It records measured rectangles and
  a diagnostic screenshot on a framing failure. No app content, styles, or UI
  behavior were changed. The correction awaits CI and visual inspection.

## Verified engineering checkpoint — 9 October 2026

- Tested commit: 0a9cd8a7c44bfc187718d6a4d6b2322f78b0b942.
- CI: https://github.com/learnmlacademy/learnmlacademy/actions/runs/37863228134
  Both engineering and repository-checks jobs passed. Python 3.13.16 with the
  exact requirements.txt installation passed pip check and 53/53 tests in 8.93s.
  Repository npm run lint and npx vite build --configLoader runner passed.
- Real headless Streamlit health check and Chromium browser flow passed:
  two uploaded PDFs -> 6 pages / 6 chunks -> refund question -> policy.pdf,
  page 1 citation. A separate browser session built only employee_guide.pdf
  and answered remote work from page 2 without the first session's sources.
  Clearing the first session removed its index/answer without changing the
  second. Browser page-error list was empty; horizontal-overflow check passed.
- All three genuine PNGs were downloaded and visually inspected:
  01-index-built.png (1280 x 1000),
  02-answer-citations-evidence.png (1280 x 1509),
  03-answer-mobile.png (461 x 1762).
  Answer, citation filename/page/chunk/score and all four retrieval candidates
  are readable in the desktop/mobile evidence captures. Nothing was fabricated,
  restyled, composited or removed from the app to produce these images.
- Artifact: pdf-rag-evidence-37863228134-1, ID 11587670886, 11 files,
  260320 bytes, SHA-256
  570d4fa622557ca2ea6df7fa4e43660cc19704a4129d02bb72a7689cc241b553.
  Contains screenshots, measured capture bounds, browser result, six-query
  evidence, CLI result, dependency freeze, JUnit XML and Streamlit log.
  Download retained locally under ignored reports/ci-37863228134; GitHub
  artifact retention is 14 days. No private PDFs, indexes or weights included.
- Final source-scope check: 39 added files, all under this project or its
  single verification workflow; no existing website/other-project changes.
  git diff --check passed. No tracked generated PDFs/images/indexes/reports,
  caches/venv, files over 1 MB, or credential-pattern matches were found.
- Engineering foundation is verified within its declared limits. No merge,
  deployment, handbook integration or next project was performed.

## Remaining limitations (not unexecuted success claims)

- No live paid-provider request was made; the compatible JSON Chat Completions
  adapter is covered by deterministic HTTP tests. User-selected provider/model
  support must be checked before real remote use.
- Answers deliberately select validated quotations, not free-form summaries.
  Source/quote authenticity does not prove truth, relevance or completeness;
  heuristic thresholds can reject valid paraphrases or select related material.
- OCR and reliable complex table/multi-column/multilingual interpretation are
  not implemented. First model download needs internet; cached inference is local.
- This is an unauthenticated local demo, not a hardened public service. Windows
  parsing lacks the Linux address-space limit. Disk checksums are not signatures;
  deletion is not secure erasure. Remote opt-in sends selected passages/question
  to the configured provider, whose data-retention policy applies.
- Local Windows Streamlit AppTest timeout remains an environment limitation;
  Linux AppTest and real-browser behavior were executed successfully in CI.
