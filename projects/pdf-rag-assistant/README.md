# Chat With Your PDFs — engineering foundation

Python 3.13.16. Run commands from projects/pdf-rag-assistant. This is an isolated
local/CI demo, not a deployed multi-user service or a website handbook.

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m scripts.create_test_pdfs
```

Only original synthetic PDFs are used in tests. User uploads and generated
indexes are never committed. Initial model download requires internet; PDF text
is embedded locally. Text-only PDF extraction is supported; OCR is not included.
## Build, retrieve and inspect citations

```powershell
python -m scripts.build_index --pdf-dir data/pdfs --name demo
python -m scripts.query --name demo --question "What is the refund window?"
python -m pytest -q
```

Default chunks contain at most 160 wordpiece tokens, overlapping by 32 tokens;
each stays inside one page. Change with --chunk-size and --overlap at build time.
The encoder refuses overlength text rather than silently discarding it. The index
records model/revision/dimension/pooling, chunk metadata and checksums. JSON/NPY
files contain private text and embeddings: keep them private, even without PDFs.
Checksums detect accidental corruption, not malicious replacement of every file.

Retrieval uses normalized dot products (cosine similarity), top 8 candidates,
then top 4 by 0.75 cosine + 0.25 query-term coverage. Evidence eligibility requires
cosine >=0.35 and term coverage >=0.15. These educational heuristics may reject
valid paraphrases or accept topically related but unanswerable questions.

Local mode is explicitly an extractive demo, NOT a generative LLM. It selects
matching sentences. The optional LLM also returns selected verbatim passages,
not unrestricted prose; exact-quote and source-ID checks prevent fabricated
quotations/citations. They do not prove document truth, resolve contradictions,
guarantee answer relevance, or support broad abstractive summaries. Inspect the
evidence; an abstention does not prove the answer is absent from the full PDFs.

## Optional remote provider (explicit opt-in)

Configure environment variables in your terminal, not committed files:

```powershell
$env:RAG_LLM_BASE_URL="https://YOUR-PROVIDER/v1"
$env:RAG_LLM_MODEL="YOUR-COMPATIBLE-MODEL"
# Set RAG_LLM_API_KEY through your local secret mechanism; never commit it.
python -m scripts.query --name demo --provider remote --question "What is the refund window?"
```

The adapter uses POST /chat/completions with messages, JSON-object output and
max_completion_tokens. Choose a provider/model supporting those fields. The
adapter is tested with deterministic HTTP mocks; no paid call is needed in CI.
Remote mode sends the question and selected passages plus source labels to that
provider. Full PDFs and embeddings are not sent. Provider retention/terms apply.
Environment configuration alone never enables remote calls. No API key means
local retrieval/demo still works. There are no server-side document-content logs.

## Delete/rebuild an index

```powershell
python -m scripts.delete_index --name demo --confirm demo
python -m scripts.build_index --pdf-dir data/pdfs --name demo
```

Deletion removes only that named index, not the input PDFs. It is not secure
erasure. Alternatively build with a new --name; overwriting an index is refused.
CLI PDF input is restricted to this project's data directory; no symlink files.
