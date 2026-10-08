"""Bytes-only upload boundary: filenames are labels, never filesystem paths."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import unicodedata
from src.schemas import Document, Page

ROOT = Path(__file__).resolve().parents[1]
MAX_FILE_BYTES = 10 * 1024 * 1024


class PDFError(ValueError):
    pass


def safe_filename(name):
    name = str(name).replace("\\", "/").rsplit("/", 1)[-1]
    if not name.lower().endswith(".pdf"):
        raise PDFError("Only .pdf files are accepted.")
    stem = re.sub(r"[^a-zA-Z0-9_. -]", "_", name[:-4]).strip(" .")[:100]
    return (stem or "document") + ".pdf"


def clean_text(text):
    return " ".join(unicodedata.normalize("NFC", text).replace("\x00", "").split())


def load_pdf(payload: bytes, filename: str) -> Document:
    name = safe_filename(filename)
    if not isinstance(payload, bytes) or not payload or len(payload) > MAX_FILE_BYTES:
        raise PDFError("PDF must be nonempty and at most 10 MiB.")
    if not payload.startswith(b"%PDF-"):
        raise PDFError("File is not a PDF (invalid signature).")
    try:
        process = subprocess.run([sys.executable, "-m", "src.pdf_worker"], input=payload,
                                 stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
                                 cwd=ROOT, timeout=20, check=True)
        result = json.loads(process.stdout)
    except (subprocess.SubprocessError, ValueError):
        raise PDFError("PDF extraction failed or exceeded the 20-second limit.") from None
    if "error" in result:
        raise PDFError(result["error"])
    identity = hashlib.sha256(payload).hexdigest()
    pages, skipped = [], []
    for number, raw_text in enumerate(result["pages"], 1):
        text = clean_text(raw_text)
        if text:
            pages.append(Page(name, identity, number, text))
        else:
            skipped.append(number)
    if not pages:
        raise PDFError("No extractable text: empty or scanned/image-only PDF. OCR is not included.")
    return Document(name, identity, tuple(pages), len(result["pages"]), tuple(skipped))


def load_documents(files):
    if not 1 <= len(files) <= 10 or sum(len(data) for _, data in files) > 40 * 1024 * 1024:
        raise PDFError("Use 1 to 10 PDFs, at most 40 MiB combined.")
    documents = [load_pdf(data, name) for name, data in files]
    if len({d.document_id for d in documents}) != len(documents):
        raise PDFError("Duplicate PDF contents; upload each document once.")
    if len({d.document.casefold() for d in documents}) != len(documents):
        raise PDFError("Duplicate sanitized filenames; rename the PDFs before upload.")
    if sum(d.total_pages for d in documents) > 300:
        raise PDFError("At most 300 pages across all documents.")
    return documents
