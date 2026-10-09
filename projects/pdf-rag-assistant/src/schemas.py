"""Small immutable objects keep source identity visible through every stage."""
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class Page:
    document: str
    document_id: str
    page: int
    text: str


@dataclass(frozen=True)
class Document:
    document: str
    document_id: str
    pages: tuple[Page, ...]
    total_pages: int
    skipped_pages: tuple[int, ...]


@dataclass(frozen=True)
class Chunk:
    document: str
    document_id: str
    page: int
    chunk_id: str
    text: str
    start: int
    end: int
    token_count: int


@dataclass(frozen=True)
class Hit:
    chunk: Chunk
    score: float
    rerank_score: float | None = None

    def to_dict(self):
        return {**asdict(self.chunk), "score": self.score, "rerank_score": self.rerank_score}
