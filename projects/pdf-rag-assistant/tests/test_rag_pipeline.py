import json
from unittest.mock import patch
import httpx
import pytest
from src.llm import CompatibleProvider, ProviderError, ExtractiveProvider, SYSTEM_PROMPT
from src.rag import answer_question


def test_no_secret_local_answer_and_unknown_question(collection, embedder, monkeypatch):
    monkeypatch.delenv("RAG_LLM_API_KEY", raising=False)
    with patch.object(CompatibleProvider, "generate", side_effect=AssertionError("No remote calls")):
        result = answer_question("What is the refund window?", collection[0], embedder)
        assert result["status"] == "answered" and "30 days" in result["answer"]
        assert result["citations"][0]["document"] == "policy.pdf"
        unknown = answer_question("What is the orbital period of Neptune?", collection[0], embedder)
        assert unknown["status"] == "not_found" and unknown["citations"] == []


def test_fake_provider_receives_only_selected_context(collection, embedder):
    class Fake:
        mode = "deterministic fake"
        def generate(self, question, evidence):
            assert 1 <= len(evidence) <= 4
            return {"abstain": False, "claims": [{"source": evidence[0]["source"], "quote": evidence[0]["text"][:100]}]}
    result = answer_question("What is the refund window?", collection[0], embedder, Fake())
    assert result["status"] == "answered"
    assert all(c["chunk_id"] in [h["chunk_id"] for h in result["retrieved_chunks"]] for c in result["citations"])


def test_compatible_http_contract_without_a_paid_call(collection, embedder):
    def handle(request):
        assert request.url == "https://provider.example/v1/chat/completions"
        payload = json.loads(request.content)
        assert payload["messages"][0]["content"] == SYSTEM_PROMPT
        evidence = json.loads(payload["messages"][1]["content"])["evidence"]
        answer = ExtractiveProvider().generate("refund window", evidence)
        return httpx.Response(200, json={"choices": [{"finish_reason": "stop", "message": {"content": json.dumps(answer)}}]})
    provider = CompatibleProvider("https://provider.example/v1", "test-only", "configured-model", httpx.MockTransport(handle))
    result = answer_question("What is the refund window?", collection[0], embedder, provider)
    assert result["status"] == "answered" and result["citations"]


@pytest.mark.parametrize("case", ["error", "bad-json", "truncated", "oversize"])
def test_remote_failures_do_not_leak_or_discard_retrieval(collection, embedder, case, caplog):
    def handle(request):
        if case == "error": return httpx.Response(500, text="private provider body")
        if case == "bad-json": return httpx.Response(200, text="private non-json body")
        if case == "oversize": return httpx.Response(200, content=b"x" * 100001)
        return httpx.Response(200, json={"choices": [{"finish_reason": "length", "message": {"content": "{"}}]})
    provider = CompatibleProvider("https://provider.example/v1", "test-only", "model", httpx.MockTransport(handle))
    result = answer_question("What is the refund window?", collection[0], embedder, provider)
    assert result["status"] == "provider_error" and result["retrieved_chunks"]
    assert "private" not in result["answer"] and "test-only" not in caplog.text


def test_remote_requires_configuration(monkeypatch):
    for key in ["RAG_LLM_BASE_URL", "RAG_LLM_API_KEY", "RAG_LLM_MODEL"]:
        monkeypatch.delenv(key, raising=False)
    with pytest.raises(ProviderError): CompatibleProvider.from_env()
    for url in ["http://example.com", "https://user:secret@example.com", "https://example.com?key=x"]:
        with pytest.raises(ProviderError): CompatibleProvider(url, "test", "model")
