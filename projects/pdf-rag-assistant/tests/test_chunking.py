import pytest
from src.chunker import chunk_pages
from src.schemas import Page
from src.embedder import get_tokenizer


def test_windows_overlap_span_fidelity_and_determinism():
    page = Page("example.pdf", "a" * 64, 7, " ".join(["refund customer policy delivery"] * 30))
    chunks = chunk_pages([page], chunk_size=32, overlap=8)
    assert chunks == chunk_pages([page], chunk_size=32, overlap=8)
    assert len(chunks) > 1 and len({c.chunk_id for c in chunks}) == len(chunks)
    for c in chunks:
        assert c.text == page.text[c.start:c.end]
        assert c.document == "example.pdf" and c.page == 7 and c.document_id == page.document_id
        assert c.text.strip() and c.token_count <= 32
    left = get_tokenizer().encode(chunks[0].text, add_special_tokens=False).tokens
    right = get_tokenizer().encode(chunks[1].text, add_special_tokens=False).tokens
    assert left[-8:] == right[:8]
    assert chunks[-1].end == len(page.text)


def test_short_pages_never_merge_sources():
    pages = [Page("a.pdf", "a" * 64, 1, "Short first page."), Page("b.pdf", "b" * 64, 2, "Short second page.")]
    chunks = chunk_pages(pages)
    assert len(chunks) == 2
    assert [(c.document, c.page) for c in chunks] == [("a.pdf", 1), ("b.pdf", 2)]


@pytest.mark.parametrize("size,overlap", [(0, 0), (241, 1), (32, 32), (32, -1), (True, 0)])
def test_invalid_chunk_settings(size, overlap):
    with pytest.raises(ValueError): chunk_pages([], size, overlap)


def test_empty_pages_do_not_create_empty_chunks():
    with pytest.raises(ValueError): chunk_pages([Page("empty.pdf", "a" * 64, 1, "")])
