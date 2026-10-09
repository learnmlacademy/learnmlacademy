import pytest
from src.rag import validate_answer, answer_question
from src.llm import ProviderError

EVIDENCE = [{"source": "S1", "document": "policy.pdf", "document_id": "a" * 64,
             "page": 2, "chunk_id": "a-p2-c1", "score": .83,
             "text": "Damaged goods may be reported within 60 days after delivery."}]


def test_exact_source_and_quote_survive():
    answer, citations = validate_answer({"abstain": False, "claims": [{"source": "S1", "quote": EVIDENCE[0]["text"]}]}, EVIDENCE)
    assert "60 days" in answer and "[S1]" in answer
    assert citations[0]["page"] == 2 and citations[0]["snippet"] == EVIDENCE[0]["text"]


@pytest.mark.parametrize("claim", [
    {"source": "S999", "quote": EVIDENCE[0]["text"]},
    {"source": "S1", "quote": "The refund window is 900 days."},
    {"source": "S1", "quote": EVIDENCE[0]["text"], "answer": "Any item can be refunded forever."},
    {"source": ["S1"], "quote": EVIDENCE[0]["text"]},
])
def test_fabricated_source_quote_or_unchecked_assertion_rejected(claim):
    with pytest.raises(ProviderError): validate_answer({"abstain": False, "claims": [claim]}, EVIDENCE)


def test_fake_llm_cannot_invent_a_source(collection, embedder):
    class Fake:
        mode = "test fake"
        def generate(self, question, evidence):
            return {"abstain": False, "claims": [{"source": "invented", "quote": "Unsupported answer."}]}
    result = answer_question("What is the refund window?", collection[0], embedder, Fake())
    assert result["status"] == "provider_error" and result["citations"] == []
    assert result["retrieved_chunks"]
