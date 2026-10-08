from dataclasses import replace
import json
import numpy as np
import pytest
from src.vector_store import VectorStore, index_path


def test_reload_equivalence_and_citations(collection, embedder, tmp_path):
    store, _ = collection
    store.save("test", tmp_path)
    restored = VectorStore.load("test", tmp_path)
    query = embedder.encode(["What is the refund window?"])[0]
    assert restored.search(query) == store.search(query)
    assert restored.chunks == store.chunks
    with pytest.raises(FileExistsError): store.save("test", tmp_path)


@pytest.mark.parametrize("change", ["schema", "model", "vectors", "chunks", "count"])
def test_corrupt_or_misaligned_index_rejected(collection, tmp_path, change):
    path = collection[0].save("test", tmp_path)
    metadata = json.loads((path / "metadata.json").read_text())
    if change == "schema": metadata["schema_version"] = 9
    if change == "model": metadata["embedding"]["revision"] = "untrusted"
    if change == "count": metadata["count"] += 1
    if change in ["vectors", "chunks"]:
        file = path / ("vectors.npy" if change == "vectors" else "chunks.json")
        file.write_bytes(file.read_bytes() + b"corrupt")
    (path / "metadata.json").write_text(json.dumps(metadata))
    with pytest.raises(ValueError): VectorStore.load("test", tmp_path)


def test_order_and_top_k(collection, embedder):
    store, _ = collection
    query = embedder.encode(["How many days of annual leave?"])[0]
    hits = store.search(query, 3)
    assert len(hits) == 3 and [h.score for h in hits] == sorted([h.score for h in hits], reverse=True)
    assert hits[0].chunk.document == "employee_guide.pdf" and hits[0].chunk.page == 1
    for k in [0, -1, 51, True]:
        with pytest.raises(ValueError): store.search(query, k)


def test_vector_and_source_contract(collection, tmp_path):
    store, _ = collection
    with pytest.raises(ValueError): VectorStore(store.chunks, store.vectors[:-1])
    with pytest.raises(ValueError): VectorStore(store.chunks, store.vectors * 2)
    with pytest.raises(ValueError): VectorStore([replace(c, page=0) for c in store.chunks], store.vectors)
    for name in ["../escape", "/tmp", "A", "", "a/b"]:
        with pytest.raises(ValueError): index_path(name, tmp_path)


def test_object_array_is_rejected_before_loading(collection, tmp_path):
    import hashlib
    from io import BytesIO
    path = collection[0].save("test", tmp_path)
    buffer = BytesIO()
    np.save(buffer, np.array([{"unexpected": "object"}], dtype=object))
    raw = buffer.getvalue()
    (path / "vectors.npy").write_bytes(raw)
    metadata = json.loads((path / "metadata.json").read_text())
    metadata["vectors_sha256"] = hashlib.sha256(raw).hexdigest()
    (path / "metadata.json").write_text(json.dumps(metadata))
    with pytest.raises(ValueError, match="header"):
        VectorStore.load("test", tmp_path)
