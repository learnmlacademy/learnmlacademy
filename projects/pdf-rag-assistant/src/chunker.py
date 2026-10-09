"""Visible token-window loop; each chunk stays inside one source page."""
from src.embedder import get_tokenizer
from src.schemas import Chunk


def chunk_pages(pages, chunk_size=160, overlap=32):
    if type(chunk_size) is not int or not 16 <= chunk_size <= 240:
        raise ValueError("chunk_size must be 16 to 240 wordpiece tokens.")
    if type(overlap) is not int or not 0 <= overlap < chunk_size:
        raise ValueError("overlap must be nonnegative and smaller than chunk_size.")
    tokenizer = get_tokenizer()
    chunks = []
    for page in pages:
        offsets = tokenizer.encode(page.text, add_special_tokens=False).offsets
        start = 0
        counter = 1
        while start < len(offsets):
            end = min(start + chunk_size, len(offsets))
            left, right = offsets[start][0], offsets[end - 1][1]
            text = page.text[left:right]
            if text.strip():
                chunks.append(Chunk(page.document, page.document_id, page.page,
                    f"{page.document_id[:16]}-p{page.page}-c{counter}", text, left, right, end - start))
            if end == len(offsets):
                break
            start = end - overlap
            counter += 1
    if not chunks or len(chunks) > 10000:
        raise ValueError("Index requires 1 to 10,000 nonempty chunks.")
    return chunks
