"""Shared app/CLI build contract; private collections stay in their caller's state."""
from src.chunker import chunk_pages
from src.embedder import get_embedder
from src.pdf_loader import load_documents
from src.vector_store import VectorStore


def build_collection(files, chunk_size=160, overlap=32, embedder=None):
    documents = load_documents(files)
    chunks = chunk_pages([page for doc in documents for page in doc.pages], chunk_size, overlap)
    model = embedder or get_embedder()
    vectors = model.encode([c.text for c in chunks])
    store = VectorStore(chunks, vectors, {"chunk_size": chunk_size, "overlap": overlap})
    summary = {"files_processed": len(documents), "pages_extracted": sum(len(d.pages) for d in documents),
               "chunks": len(chunks), "embedding_model": model.contract["model"], "dimension": model.contract["dimension"],
               "skipped_pages": {d.document: list(d.skipped_pages) for d in documents if d.skipped_pages}}
    return store, summary
