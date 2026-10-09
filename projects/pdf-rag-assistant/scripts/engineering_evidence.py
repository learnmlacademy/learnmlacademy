"""Execute only original synthetic fixtures and save honest, reusable evidence."""
import json
from pathlib import Path
from scripts.create_test_pdfs import FIXTURES, make_pdf
from src.chunker import chunk_pages
from src.embedder import get_embedder, CONTRACT
from src.pdf_loader import load_documents
from src.rag import answer_question
from src.service import build_collection
from src.vector_store import VectorStore

QUERIES = [
    ("What is the refund window?", "policy.pdf", 1),
    ("What is the damaged goods exception?", "policy.pdf", 2),
    ("Who pays international return shipping?", "policy.pdf", 3),
    ("How many days of annual leave?", "employee_guide.pdf", 1),
    ("What is the remote work rule?", "employee_guide.pdf", 2),
    ("What is the meal expense limit?", "employee_guide.pdf", 3),
]


def main():
    files = [(name, make_pdf(pages)) for name, pages in FIXTURES.items()]
    store, summary = build_collection(files)
    model = get_embedder()
    documents = load_documents(files)
    pages = [p for d in documents for p in d.pages]
    chunks = [{"chunk_size_tokens": size, "overlap_tokens": overlap,
               "chunks": len(chunk_pages(pages, size, overlap))} for size, overlap in [(32, 8), (80, 16), (160, 32)]]
    rows = []
    for question, document, page in QUERIES:
        result = answer_question(question, store, model)
        first = result["retrieved_chunks"][0]
        assert (first["document"], first["page"]) == (document, page)
        assert result["status"] == "answered" and result["citations"]
        rows.append({"question": question, "top_document": document, "top_page": page,
                     "cosine": first["score"], "rerank": first["rerank_score"], "response": result})
    unknown = answer_question("What is the orbital period of Neptune?", store, model)
    assert unknown["status"] == "not_found" and not unknown["citations"]
    restored = VectorStore.load("demo")
    assert answer_question(QUERIES[0][0], restored, model)["citations"] == rows[0]["response"]["citations"]
    output = {"status": "pass", "embedding": CONTRACT, "summary": summary, "chunk_counts": chunks,
              "retrieval_examples": rows, "unsupported_question": unknown}
    reports = Path("reports")
    reports.mkdir(exist_ok=True)
    (reports / "engineering-evidence.json").write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    table = "# Executed synthetic retrieval evidence\n\n| Question | PDF | Page | Cosine | Rerank |\n|---|---|---:|---:|---:|\n"
    table += "\n".join(f"| {r['question']} | {r['top_document']} | {r['top_page']} | {r['cosine']:.4f} | {r['rerank']:.4f} |" for r in rows)
    table += "\n\n| Chunk tokens | Overlap tokens | Chunks |\n|---:|---:|---:|\n"
    table += "\n".join(f"| {r['chunk_size_tokens']} | {r['overlap_tokens']} | {r['chunks']} |" for r in chunks)
    (reports / "retrieval-examples.md").write_text(table + "\n", encoding="utf-8")
    print(json.dumps({"status": "pass", "known_queries": len(rows), "summary": summary, "chunk_counts": chunks}))


if __name__ == "__main__":
    main()
