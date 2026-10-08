# Project 10 — Chat With Your PDFs (RAG)

A complete, locally runnable **page-aware PDF retrieval-augmented question answering** tutorial. Unlike a fake chat mockup, this program opens real PDF files, extracts text on each page, forms overlapping chunks, creates reproducible TF-IDF word-vector embeddings, ranks relevant chunks using cosine similarity, and shows source-page citations. The default answer quotes the retrieved evidence. Optional cloud mode uses OpenAI to summarize selected excerpts, with numeric citation IDs validated against retrieved sources.

**Important:** TF-IDF is an inspectable *lexical* vector baseline, not a neural semantic embedding. It can miss paraphrases. Citation-ID validation prevents fabricated source IDs but does not prove a generated claim is true. Scanned/image-only PDFs require a separate OCR step. Never upload private documents to cloud mode without authorization.

## Start from an empty folder

1. Install Python 3.12 and VS Code. Open VS Code → File → Open Folder → this `projects/pdf-rag` folder. Choose Terminal → New Terminal.
2. Create an environment: Windows: `py -3.12 -m venv .venv` then `.venv\\Scripts\\activate`; Mac/Linux: `python3.12 -m venv .venv && source .venv/bin/activate`.
3. Install: `python -m pip install -r requirements.txt`.
4. Make our original test PDF: `python scripts/make_sample_pdf.py`.
5. Index, persist and ask: `python scripts/index_and_ask.py`. Verify that the cited cancellation answer points to **page 3**.
6. Test the pipeline: `python -m pytest -q`.
7. Start the browser app: `python -m streamlit run app.py`; open the local URL printed (usually http://localhost:8501).
8. Keep the sample checkbox selected, click **Find answer and page citation**, then expand **Verified source pages**. Change question to the reimbursement deadline to see **page 2**. Ask about an unrelated topic and inspect the abstention behavior.
9. Uncheck sample and upload a small text-based PDF you are permitted to use. Avoid confidential records.

## Files learners can copy

```text
projects/pdf-rag/
  app.py                     Streamlit upload, ask, inspect sources
  src/rag.py                 PDF parsing, chunking, vector search, citations, persistence
  src/__init__.py
  scripts/make_sample_pdf.py Reproducible original 3-page training document
  scripts/index_and_ask.py  Index → save → reload → question, without API keys
  scripts/capture_screenshots.py Real browser evidence for verification
  tests/test_rag.py         Deterministic tests and mocked LLM
  requirements.txt          Exact dependencies
```

## The hook to solve

A student has a long travel policy and asks: *“How quickly must I notify the university if my conference trip is cancelled?”* Reading the PDF manually is slow. The assistant must retrieve the right passage and produce the correct original **page number**, not guess one. The generated example says **48 hours** on **page 3**. All example details are fictional.

## What happens inside

```text
PDF pages → text extraction → page-bounded overlapping chunks → TF-IDF vectors
                                                                 ↓
question → TF-IDF query vector → cosine nearest passages → sourced answer / abstention
```

For 140-word chunks with a 30-word overlap, each step advances 110 words. Chunk 1 covers 1–140 and chunk 2 covers 111–250; the final 30 words are shared. Overlap reduces boundary loss but raises memory and token costs.

**Illustrative cosine calculation:** Q=[1,1], A=[1,0], B=[1,1]. Cosine(Q,A)=1/√2≈0.707; Cosine(Q,B)=2/2=1.0. These simplified vectors teach the math, not real TF-IDF model scores.

## Model and safety boundaries

- Upload limits: 5 files, 12 MiB each, at most 100 pages per file.
- Page numbers come from the PDF parser and cannot be invented by the language model.
- No OCR, no automatic web search, no confidential-data cloud uploads.
- Offline mode uses no API key; optional OpenAI mode needs `OPENAI_API_KEY` set locally. It sends selected excerpts to the provider and may incur a charge.
- Prompt injection inside an uploaded PDF is treated as document text, not application instructions.
- The local persisted index stores plaintext chunks in `storage/`; keep this out of Git and delete it if needed. Stored JSON + sparse arrays are integrity checked, with no pickle execution.

## Troubleshooting

- **No selectable text:** image-only scan; use an approved OCR solution first, then re-upload the searchable PDF.
- **Wrong passage:** check document quality, increase retrieved passages, reformulate question, inspect ranked scores. TF-IDF cannot understand every paraphrase.
- **App won't start:** check active virtual environment and run `python -m pip install -r requirements.txt`.
- **No API key:** stay in offline mode or configure the key locally, not in source files or screenshots.
- **Weak citations:** inspect the actual extracted source page rather than relying on a generated numeric marker.

## Interview questions

1. Why must page numbers be assigned at extraction rather than generated by an LLM?
2. How do chunk size and overlap influence context loss and storage?
3. Why does TF-IDF retrieve words instead of deep semantic meanings?
4. What does cosine similarity measure and what are its limitations?
5. What is the difference between finding relevant evidence and proving an answer faithful?
6. What changes would be required for OCR, semantic embeddings, a reranker and human evaluation?

## Acceptance criteria

Run tests, confirm page-3 and page-2 answers, verify abstention, inspect the persisted JSON/NPZ index, and capture real Streamlit desktop/mobile screenshots in CI. Do not claim production-grade security or accuracy from this educational implementation.
