from pathlib import Path
import argparse
import json
from src.pdf_loader import ROOT, MAX_FILE_BYTES
from src.service import build_collection


def read_directory(directory):
    allowed = (ROOT / "data").resolve()
    directory = Path(directory).resolve()
    if not directory.is_relative_to(allowed) or not directory.is_dir():
        raise ValueError("Place local PDFs inside this project's data directory.")
    files = sorted(directory.glob("*.pdf"))
    if not 1 <= len(files) <= 10:
        raise ValueError("Directory must contain 1 to 10 .pdf files.")
    for path in files:
        if path.is_symlink() or path.resolve().parent != directory or path.stat().st_size > MAX_FILE_BYTES:
            raise ValueError("Unsafe path or oversized PDF.")
    return [(p.name, p.read_bytes()) for p in files]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf-dir", default="data/pdfs")
    parser.add_argument("--name", default="demo")
    parser.add_argument("--chunk-size", type=int, default=160)
    parser.add_argument("--overlap", type=int, default=32)
    args = parser.parse_args()
    store, summary = build_collection(read_directory(args.pdf_dir), args.chunk_size, args.overlap)
    store.save(args.name)
    print(json.dumps(summary, indent=2))
