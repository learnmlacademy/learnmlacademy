"""Exact cosine search for small local collections; JSON/NPY, never pickle."""
from dataclasses import asdict
import hashlib
from io import BytesIO
import json
from pathlib import Path
import re
import tempfile
import numpy as np
from src.embedder import CONTRACT, DIMENSION
from src.pdf_loader import safe_filename
from src.schemas import Chunk, Hit

ROOT = Path(__file__).resolve().parents[1]


def index_path(name, root=ROOT / "indexes"):
    if not isinstance(name, str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,39}", name):
        raise ValueError("Index name must be 1-40 lowercase letters, digits or hyphens.")
    root = Path(root).resolve()
    path = root / name
    if path.is_symlink() or path.resolve().parent != root:
        raise ValueError("Index path must stay inside the index directory.")
    return path


class VectorStore:
    def __init__(self, chunks, vectors, settings=None):
        self.chunks = tuple(chunks)
        self.vectors = np.array(vectors, dtype=np.float32, copy=True)
        self.settings = settings or {"chunk_size": 160, "overlap": 32}
        if not 1 <= len(chunks) <= 10000 or self.vectors.shape != (len(chunks), DIMENSION):
            raise ValueError("Vector count/dimension does not match chunk metadata.")
        if not np.isfinite(self.vectors).all() or not np.allclose(np.linalg.norm(self.vectors, axis=1), 1, atol=1e-5):
            raise ValueError("Vectors must be finite and L2-normalized.")
        if len({c.chunk_id for c in chunks}) != len(chunks):
            raise ValueError("Duplicate chunk IDs.")
        for c in chunks:
            if (not re.fullmatch(r"[a-f0-9]{64}", c.document_id)
                or type(c.page) is not int or not 1 <= c.page <= 100
                or not re.fullmatch(re.escape(c.document_id[:16]) + rf"-p{c.page}-c[1-9][0-9]*", c.chunk_id)
                or safe_filename(c.document) != c.document
                or not isinstance(c.text, str) or not c.text.strip() or len(c.text) > 100000
                or type(c.start) is not int or type(c.end) is not int or c.start < 0
                or c.end - c.start != len(c.text) or not 1 <= c.token_count <= 240):
                raise ValueError("Invalid source/chunk metadata.")
        self.vectors.flags.writeable = False

    def search(self, query, top_k=8):
        query = np.asarray(query, dtype=np.float32)
        if type(top_k) is not int or not 1 <= top_k <= 50:
            raise ValueError("top_k must be 1-50.")
        if query.shape != (DIMENSION,) or not np.isfinite(query).all() or not np.isclose(np.linalg.norm(query), 1, atol=1e-5):
            raise ValueError("Query must match the normalized embedding contract.")
        scores = np.clip(self.vectors @ query, -1, 1)
        order = np.argsort(-scores, kind="stable")[:top_k]
        return [Hit(self.chunks[int(i)], float(scores[i])) for i in order]

    def save(self, name="demo", root=ROOT / "indexes"):
        path = index_path(name, root)
        path.parent.mkdir(parents=True, exist_ok=True)
        if path.exists():
            raise FileExistsError("Index exists; choose a new name or explicitly delete/rebuild it.")
        chunks = json.dumps([asdict(c) for c in self.chunks], ensure_ascii=False).encode("utf-8")
        buffer = BytesIO()
        np.save(buffer, self.vectors, allow_pickle=False)
        vectors = buffer.getvalue()
        metadata = {"schema_version": 1, "embedding": CONTRACT, "count": len(self.chunks),
                    "chunking": self.settings, "chunks_sha256": hashlib.sha256(chunks).hexdigest(),
                    "vectors_sha256": hashlib.sha256(vectors).hexdigest()}
        with tempfile.TemporaryDirectory(dir=path.parent, prefix=".index-") as temporary:
            stage = Path(temporary)
            (stage / "chunks.json").write_bytes(chunks)
            (stage / "vectors.npy").write_bytes(vectors)
            (stage / "metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")
            stage.rename(path)
        return path

    @classmethod
    def load(cls, name="demo", root=ROOT / "indexes"):
        path = index_path(name, root)
        blobs = {}
        for filename, maximum in [("metadata.json", 10000), ("chunks.json", 32_000_000), ("vectors.npy", 16_000_000)]:
            file = path / filename
            if file.is_symlink() or not file.is_file() or file.stat().st_size > maximum:
                raise ValueError("Index missing, oversized or using unsafe file links.")
            blobs[filename] = file.read_bytes()
        metadata = json.loads(blobs["metadata.json"])
        if metadata.get("schema_version") != 1 or metadata.get("embedding") != CONTRACT:
            raise ValueError("Incompatible index schema or embedding model. Rebuild the index.")
        count = metadata.get("count")
        if type(count) is not int or not 1 <= count <= 10000:
            raise ValueError("Invalid index row count.")
        for filename, key in [("chunks.json", "chunks_sha256"), ("vectors.npy", "vectors_sha256")]:
            if hashlib.sha256(blobs[filename]).hexdigest() != metadata.get(key):
                raise ValueError("Index checksum mismatch; files may be corrupt or misaligned.")
        buffer = BytesIO(blobs["vectors.npy"])
        if np.lib.format.read_magic(buffer) != (1, 0):
            raise ValueError("Unsupported vector file format.")
        shape, fortran, dtype = np.lib.format.read_array_header_1_0(buffer)
        if shape != (count, DIMENSION) or fortran or dtype != np.dtype("float32"):
            raise ValueError("Invalid vector header; no object arrays are accepted.")
        if len(blobs["vectors.npy"]) - buffer.tell() != count * DIMENSION * 4:
            raise ValueError("Vector byte length does not match the header.")
        chunks = [Chunk(**row) for row in json.loads(blobs["chunks.json"])]
        vectors = np.load(BytesIO(blobs["vectors.npy"]), allow_pickle=False)
        return cls(chunks, vectors, metadata["chunking"])
