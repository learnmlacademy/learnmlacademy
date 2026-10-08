"""Demonstrate saving and reloading a PDF search index, without API keys."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from src.rag import RagIndex, cited_sources, generate_answer


def main():
    path = ROOT / "sample_docs" / "Campus_Travel_Policy.pdf"
    if not path.exists():
        raise SystemExit("Run: python scripts/make_sample_pdf.py")
    folder = ROOT / "storage" / "sample_index"
    index = RagIndex.from_pdfs([(path.name, path.read_bytes())])
    index.save(folder)
    restored = RagIndex.load(folder)
    question = "How quickly must students report cancelled travel?"
    answer = generate_answer(restored, question)
    print("Question:", question)
    print("Answer:", answer.text)
    print("Page citations:", [(c["filename"], c["page"]) for c in cited_sources(answer)])


if __name__ == "__main__":
    main()
