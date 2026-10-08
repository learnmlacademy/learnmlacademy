"""Transparent optional rerank: 75% cosine + 25% query-term coverage."""
import re
from src.schemas import Hit

STOPWORDS = set("a an the is are was were be been to of in on for from by with as at and or it this that these those what which who how when where does do can may i my me our your document documents pdf say about please tell much many".split())


def terms(text):
    return {t for t in re.findall(r"[a-z0-9]+", text.lower()) if t not in STOPWORDS}


def coverage(question, passage):
    query_terms = terms(question)
    return len(query_terms & terms(passage)) / max(1, len(query_terms))


def rerank(question, hits, top_n=4):
    if not 1 <= top_n <= 8:
        raise ValueError("Rerank top_n must be 1-8.")
    scored = [Hit(h.chunk, h.score, .75 * h.score + .25 * coverage(question, h.chunk.text)) for h in hits]
    return sorted(scored, key=lambda h: (-h.rerank_score, h.chunk.chunk_id))[:top_n]
