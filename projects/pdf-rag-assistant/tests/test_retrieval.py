import pytest
from src.retriever import retrieve
from src.reranker import coverage

EXAMPLES = [
    ("What is the refund window?", "policy.pdf", 1),
    ("What is the damaged goods exception?", "policy.pdf", 2),
    ("Who pays international return shipping?", "policy.pdf", 3),
    ("How many days of annual leave?", "employee_guide.pdf", 1),
    ("What is the remote work rule?", "employee_guide.pdf", 2),
    ("What is the meal expense limit?", "employee_guide.pdf", 3),
]


@pytest.mark.parametrize("question,document,page", EXAMPLES)
def test_expected_evidence_ranks_first(collection, embedder, question, document, page):
    first, selected = retrieve(question, collection[0], embedder)
    assert (selected[0].chunk.document, selected[0].chunk.page) == (document, page)
    for hit in selected:
        assert hit in [h for h in selected if h.chunk in [f.chunk for f in first]]
        assert hit.rerank_score == pytest.approx(.75 * hit.score + .25 * coverage(question, hit.chunk.text))


def test_empty_and_oversized_questions_fail(collection, embedder):
    for question in ["", " " * 10, "x" * 2001]:
        with pytest.raises(ValueError): retrieve(question, collection[0], embedder)
