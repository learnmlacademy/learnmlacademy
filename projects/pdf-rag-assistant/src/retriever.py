from src.reranker import rerank
from src.embedder import CONTRACT


def retrieve(question, store, embedder, use_rerank=True):
    if not isinstance(question, str) or not question.strip() or len(question) > 2000:
        raise ValueError("Question must contain 1 to 2,000 characters.")
    if embedder.contract != CONTRACT:
        raise ValueError("Query embedding contract differs from the saved index.")
    first_stage = store.search(embedder.encode([question])[0], top_k=8)
    selected = rerank(question, first_stage, top_n=4) if use_rerank else first_stage[:4]
    return first_stage, selected
