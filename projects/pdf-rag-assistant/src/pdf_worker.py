"""Isolated bounded text extraction. stdin/stdout are private IPC, not logs."""
from io import BytesIO
import json
import logging
import sys


def extract(payload):
    # On POSIX, bound parser address space and CPU in addition to the parent timeout.
    if sys.platform != "win32":
        import resource
        resource.setrlimit(resource.RLIMIT_AS, (1_000_000_000, 1_000_000_000))
        resource.setrlimit(resource.RLIMIT_CPU, (10, 10))
    import pypdf
    import pypdf.filters
    logging.getLogger("pypdf").setLevel(logging.CRITICAL)
    pypdf.filters.ZLIB_MAX_OUTPUT_LENGTH = 8_000_000
    reader = pypdf.PdfReader(BytesIO(payload), strict=False)
    if reader.is_encrypted:
        return {"error": "Encrypted PDFs are not supported; provide an unlocked text PDF."}
    if not 1 <= len(reader.pages) <= 100:
        return {"error": "PDF must contain 1 to 100 pages."}
    pages = []
    for page in reader.pages:
        contents = page.get_contents()
        if contents is not None and len(contents.get_data()) > 8_000_000:
            return {"error": "A decompressed page exceeds the extraction limit."}
        text = page.extract_text() or ""
        if len(text) > 100_000:
            return {"error": "A page exceeds the 100,000-character text limit."}
        pages.append(text)
        if sum(map(len, pages)) > 2_000_000:
            return {"error": "Document exceeds the 2-million-character text limit."}
    return {"pages": pages}


if __name__ == "__main__":
    try:
        data = sys.stdin.buffer.read(10 * 1024 * 1024 + 1)
        result = extract(data) if len(data) <= 10 * 1024 * 1024 else {"error": "PDF exceeds 10 MiB."}
    except Exception:
        result = {"error": "PDF is malformed, unreadable, or exceeds parser limits."}
    sys.stdout.buffer.write(json.dumps(result).encode("utf-8"))
