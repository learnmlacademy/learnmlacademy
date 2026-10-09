# Project 10 engineering status

- [x] PDF extraction
- [x] chunking
- [x] metadata
- [x] embeddings
- [x] vector index
- [x] persistence
- [x] retrieval
- [x] reranking
- [x] LLM adapter
- [x] citation integrity
- [x] unsupported-question handling
- [x] Streamlit
- [x] privacy
- [x] tests
- [x] CI
- [x] final engineering audit

Verified code checkpoint: 0a9cd8a7c44bfc187718d6a4d6b2322f78b0b942.
CI run 37863228134 passed both jobs: 53/53 Python tests, real Streamlit
upload/index/query/citation flow, browser-session isolation and clearing,
repository lint, and Vite build. All three real screenshots were downloaded
and visually inspected, including the full expanded evidence at 1280px/461px.

Scope is the engineering foundation only; no merge, deployment, website changes,
or handbook. Remote LLM adapter verified with HTTP mocks, not a paid live call.
Local Windows AppTest timed out twice; Linux CI AppTest and real Chromium passed.
OCR, broad abstractive summaries, hostile-input/public-service hardening and
provider-specific live compatibility remain outside this bounded foundation.
See BUILD_RECORD.md for executed evidence and README.md for exact commands.
