from __future__ import annotations

import base64
import gzip
from pathlib import Path

from weasyprint import HTML

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "scripts" / "pdf_sources_encoded"
PRIVATE_DIR = ROOT / "private"
WORK_DIR = ROOT / ".handbook-html"

PRIVATE_DIR.mkdir(exist_ok=True)
WORK_DIR.mkdir(exist_ok=True)

encoded_files = sorted(SOURCE_DIR.glob("*.html.gz.b64"))
if len(encoded_files) != 9:
    raise SystemExit(f"Expected 9 encoded handbook sources, found {len(encoded_files)}")

for encoded_path in encoded_files:
    encoded = "".join(encoded_path.read_text(encoding="utf-8").split())
    html_bytes = gzip.decompress(base64.b64decode(encoded))

    html_name = encoded_path.name.removesuffix(".gz.b64")
    html_path = WORK_DIR / html_name
    html_path.write_bytes(html_bytes)

    stem = Path(html_name).stem
    if len(stem) > 3 and stem[:2].isdigit() and stem[2] == "_":
        stem = stem[3:]

    output_path = PRIVATE_DIR / f"{stem}.pdf"
    HTML(filename=str(html_path), base_url=str(ROOT)).write_pdf(str(output_path))
    print(f"Generated {output_path.relative_to(ROOT)}")

print("Generated all 9 interview handbook PDFs.")
