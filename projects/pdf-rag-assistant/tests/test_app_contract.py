from pathlib import Path
from streamlit.testing.v1 import AppTest
from src.service import build_collection
from src.rag import answer_question


def test_streamlit_initial_contract_without_keys(monkeypatch):
    monkeypatch.delenv("RAG_LLM_API_KEY", raising=False)
    app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py")).run(timeout=30)
    assert not app.exception
    assert app.title[0].value == "Chat With Your PDFs"
    assert any(b.label == "Build Index" and b.disabled for b in app.button)
    assert "no api key" in " ".join(i.value.lower() for i in app.info)


def test_independent_collections_do_not_share_sources(files, embedder):
    policy, _ = build_collection(files[:1], embedder=embedder)
    employee, _ = build_collection(files[1:], embedder=embedder)
    first = answer_question("What is the refund window?", policy, embedder)
    second = answer_question("What is the remote work rule?", employee, embedder)
    assert {r["document"] for r in first["retrieved_chunks"]} == {"policy.pdf"}
    assert {r["document"] for r in second["retrieved_chunks"]} == {"employee_guide.pdf"}
