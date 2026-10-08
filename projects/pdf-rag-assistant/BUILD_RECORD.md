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
