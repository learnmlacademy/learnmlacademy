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
Complete executable CLI/app commands will be recorded as they pass verification.
