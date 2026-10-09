"""Explicit retrieval -> context -> provider -> validated source references."""
from src.llm import ExtractiveProvider, ProviderError, NOT_FOUND
from src.retriever import retrieve
from src.reranker import coverage


def validate_answer(proposal, evidence):
    if not isinstance(proposal, dict) or set(proposal) != {"abstain", "claims"} or type(proposal["abstain"]) is not bool:
        raise ProviderError("Provider output does not match the answer contract.")
    claims = proposal["claims"]
    if not isinstance(claims, list) or len(claims) > 3 or (proposal["abstain"] and claims):
        raise ProviderError("Invalid claim list.")
    if proposal["abstain"]:
        return NOT_FOUND, []
    if not claims:
        raise ProviderError("An answer needs at least one cited passage.")
    lookup = {e["source"]: e for e in evidence}
    lines, citations = [], []
    for claim in claims:
        if not isinstance(claim, dict) or set(claim) != {"source", "quote"}:
            raise ProviderError("Invalid claim format.")
        source, quote = claim["source"], claim["quote"]
        if not isinstance(source, str) or source not in lookup or not isinstance(quote, str):
            raise ProviderError("Citation does not refer to supplied evidence.")
        item = lookup[source]
        if not 10 <= len(quote) <= 800 or quote not in item["text"]:
            raise ProviderError("Quoted support is not present in the cited retrieved chunk.")
        # Quotes, not arbitrary generated assertions, become the learner-visible answer.
        lines.append(f'{quote} [{source}]')
        citations.append({"source": source, "document": item["document"], "document_id": item["document_id"],
                          "page": item["page"], "chunk_id": item["chunk_id"], "score": item["score"], "snippet": quote})
    return "\n\n".join(lines), citations


def answer_question(question, store, embedder, provider=None, use_rerank=True):
    provider = provider or ExtractiveProvider()
    first_stage, selected = retrieve(question, store, embedder, use_rerank)
    # Explicit heuristic, not a guarantee of semantic answerability; all hits remain inspectable.
    eligible = [h for h in selected if h.score >= 0.35 and coverage(question, h.chunk.text) >= 0.15]
    evidence = [{"source": f"S{i}", **h.to_dict()} for i, h in enumerate(eligible, 1)]
    result = {"answer": NOT_FOUND, "citations": [], "retrieved_chunks": [h.to_dict() for h in selected],
              "first_stage": [h.to_dict() for h in first_stage], "mode": provider.mode,
              "status": "not_found", "evidence_sent": [e["chunk_id"] for e in evidence]}
    if not evidence:
        return result
    try:
        answer, citations = validate_answer(provider.generate(question, evidence), evidence)
        result.update(answer=answer, citations=citations, status="answered" if citations else "not_found")
    except ProviderError:
        result.update(answer="Answer withheld: provider output or citations could not be verified. Inspect the retrieved evidence.",
                      status="provider_error")
    return result
