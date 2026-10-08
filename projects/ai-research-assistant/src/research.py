"""A bounded research agent with explicit tools, provenance and an audit trail.

The offline classroom pack is ORIGINAL TRAINING CONTENT, not independent
scientific evidence. Live mode searches and reads English Wikipedia pages.
The project is a learning prototype, not a full-web Perplexity replacement.
"""
from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from hashlib import sha256
import re
from typing import Any, Literal

import requests

API_URL = "https://en.wikipedia.org/w/api.php"
MAX_QUERY_CHARS = 250
MAX_SOURCES = 4
MAX_EXTRACT_CHARS = 10000
MAX_NOTES = 5
STOP_WORDS = frozenset(
    "the a an and or in of to for from is are does do why what how can when "
    "some with city cities about their it on this that which as vs be over "
    "you me your we our has have by than more less"
    .split()
)
Mode = Literal["offline", "wikipedia"]
StateName = Literal["plan", "search", "read", "take_notes", "verify", "report", "done"]


class ResearchError(ValueError):
    """A document, search result or question violates a declared limit."""


@dataclass(frozen=True)
class Source:
    source_id: str
    title: str
    url: str
    text: str
    origin: str  # "original classroom fixture" or "Wikipedia article"

@dataclass(frozen=True)
class Note:
    source_id: str
    exact_quote: str
    matching_words: tuple[str, ...]
    score: int

@dataclass
class ResearchState:
    question: str
    mode: Mode
    step: StateName = "plan"
    plan: list[str] = field(default_factory=list)
    sources: list[Source] = field(default_factory=list)
    notes: list[Note] = field(default_factory=list)
    verified_notes: list[Note] = field(default_factory=list)
    report: str = ""
    audit: list[str] = field(default_factory=list)

    def export(self) -> dict[str, Any]:
        return {
            "question": self.question, "mode": self.mode,
            "plan": list(self.plan), "sources": [asdict(s) for s in self.sources],
            "notes": [asdict(n) for n in self.verified_notes],
            "report": self.report, "audit": list(self.audit),
            "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        }


def keywords(value: str) -> set[str]:
    """Common lexical words only: this is NOT an entailment model."""
    return {word for word in re.findall(r"[a-z]{3,}", value.lower())
            if word not in STOP_WORDS}


def validate_question(question: str) -> str:
    value = re.sub(r"\s+", " ", question).strip()
    if not 8 <= len(value) <= MAX_QUERY_CHARS or not keywords(value):
        raise ResearchError("Ask a meaningful question between 8 and 250 characters.")
    return value


def classroom_sources() -> list[Source]:
    """Three original educational notes; not scientific papers or web citations."""
    return [
        Source(
            "DEMO-1", "Classroom note A — shade and evaporation", "classroom:note-A",
            "Trees can shade sidewalks and walls, reducing the sunlight that "
            "heats those surfaces. Leaves also release water vapour in a "
            "process called transpiration, which can cool nearby air. "
            "How much cooling occurs depends on the weather, vegetation "
            "and local street layout.",
            "original classroom fixture",
        ),
        Source(
            "DEMO-2", "Classroom note B — constraints and maintenance", "classroom:note-B",
            "Planting trees is not an instant fix for urban heat. Young trees "
            "need time to create meaningful shade, and many locations "
            "require watering and ongoing maintenance. In a dry climate, "
            "water availability may limit which species are practical. "
            "Trees also need sufficient root space and appropriate placement.",
            "original classroom fixture",
        ),
        Source(
            "DEMO-3", "Classroom note C — combine multiple approaches", "classroom:note-C",
            "Urban heat solutions can include trees, reflective roofs and "
            "pavements, and access to cooler public spaces. A city should "
            "compare benefits, cost, maintenance and equity across "
            "neighbourhoods before choosing a plan. These classroom "
            "notes contain no measured effect size for a real city.",
            "original classroom fixture",
        ),
    ]


def search_sources(question: str, *, mode: Mode, session: Any = None) -> list[dict[str, Any]]:
    """TOOL 1: get bounded source candidates, never accept a user-supplied URL."""
    if mode == "offline":
        return [{"pageid": source.source_id, "title": source.title}
                for source in classroom_sources()]
    if mode != "wikipedia":
        raise ResearchError("Choose offline or wikipedia mode.")
    http = session or requests.Session()
    try:
        response = http.get(
            API_URL,
            params={"action": "query", "list": "search", "srsearch": question,
                    "srlimit": MAX_SOURCES, "format": "json", "utf8": 1},
            timeout=12,
            headers={"User-Agent": "LearnMLAcademyResearchTutorial/1.0 (educational; source attribution)"},
        )
        response.raise_for_status()
        data = response.json()
    except (requests.RequestException, ValueError) as exc:
        raise ResearchError("Wikipedia search is unavailable; try classroom mode.") from exc
    return [{"pageid": int(row["pageid"]), "title": str(row["title"])[:200]}
            for row in data.get("query", {}).get("search", [])[:MAX_SOURCES]
            if isinstance(row.get("pageid"), int) and isinstance(row.get("title"), str)]


def read_source(candidate: dict[str, Any], *, mode: Mode, session: Any = None) -> Source:
    """TOOL 2: read real text for every candidate instead of citing search snippets."""
    if mode == "offline":
        found = next((item for item in classroom_sources()
                      if item.source_id == candidate.get("pageid")), None)
        if found is None:
            raise ResearchError("Unknown classroom source.")
        return found
    if mode != "wikipedia":
        raise ResearchError("Unknown research mode.")
    pageid = candidate.get("pageid")
    if not isinstance(pageid, int) or not 0 < pageid < 1_000_000_000:
        raise ResearchError("Invalid Wikipedia page identifier.")
    http = session or requests.Session()
    try:
        response = http.get(
            API_URL,
            params={"action": "query", "prop": "extracts", "pageids": pageid,
                    "explaintext": 1, "exintro": 1, "format": "json"},
            timeout=12,
            headers={"User-Agent": "LearnMLAcademyResearchTutorial/1.0 (educational; source attribution)"},
        )
        response.raise_for_status()
        data = response.json()
        page = data["query"]["pages"][str(pageid)]
        title, body = str(page["title"]), str(page.get("extract", ""))
    except (requests.RequestException, KeyError, ValueError, TypeError) as exc:
        raise ResearchError("Could not read the selected Wikipedia article.") from exc
    if len(body.strip()) < 35:
        raise ResearchError("Article did not return enough readable text.")
    return Source(f"WIKI-{pageid}", title[:200],
                  f"https://en.wikipedia.org/?curid={pageid}",
                  re.sub(r"\s+", " ", body)[:MAX_EXTRACT_CHARS],
                  "Wikipedia article")


def take_notes(question: str, sources: list[Source]) -> list[Note]:
    """TOOL 3: copy exact candidate sentences; never fabricate a source quote."""
    query = keywords(question)
    notes: list[Note] = []
    for source in sources:
        sentences = re.split(r"(?<=[.!?])\s+", source.text)
        ranked = []
        for sentence in sentences:
            sentence = sentence.strip()
            matches = tuple(sorted(query & keywords(sentence)))
            if len(sentence) >= 40 and matches:
                ranked.append(Note(source.source_id, sentence, matches, len(matches)))
        if ranked:
            notes.append(max(ranked, key=lambda x: (x.score, len(x.exact_quote))))
    return sorted(notes, key=lambda x: (-x.score, x.source_id))[:MAX_NOTES]


def verify_notes(notes: list[Note], sources: list[Source]) -> list[Note]:
    """TOOL 4: prove quote/source ID provenance, not claim-level semantic truth."""
    lookup = {source.source_id: source for source in sources}
    verified = []
    for note in notes:
        source = lookup.get(note.source_id)
        if (source and note.exact_quote and note.exact_quote in source.text
                and note.score == len(note.matching_words)
                and all(word in keywords(note.exact_quote) for word in note.matching_words)):
            verified.append(note)
    return verified


def write_report(state: ResearchState) -> str:
    """TOOL 5: source-bound evidence report, with unresolved caveats."""
    lines = [f"# Research brief: {state.question}", "",
             "## Plan", *[f"- {step}" for step in state.plan], "",
             "## What the retrieved sources actually say"]
    lookup = {source.source_id: source for source in state.sources}
    if not state.verified_notes:
        lines += ["", "No verified matching passage was found. "
                  "I cannot answer this from the selected sources."]
    for note in state.verified_notes:
        source = lookup[note.source_id]
        lines += ["", f"**[{source.source_id}] {source.title}**",
                  f"> {note.exact_quote}",
                  f"Origin: {source.origin}. Source: {source.url}."]
    lines += ["", "## Limits and next steps",
              "- This tool checks whether quotes really occur in retrieved sources. "
              "It cannot prove that the underlying source is correct or complete.",
              "- This is a starting evidence brief, not a comprehensive literature review.",
              "- Cross-check important claims with primary studies and publication dates "
              "before making high-stakes decisions."]
    if state.mode == "offline":
        lines += ["- The classroom sources are ORIGINAL DEMO TEXT, not independent "
                  "published research. Do not present them as scientific citations."]
    else:
        lines += ["- Wikipedia is a secondary overview; check cited primary literature "
                  "and conflicting viewpoints before drawing conclusions."]
    return "\n".join(lines)


def run_research(question: str, *, mode: Mode = "offline", session: Any = None) -> ResearchState:
    """Finite-state agent: plan → search → read → note → verify → report."""
    question = validate_question(question)
    if mode not in ("offline", "wikipedia"):
        raise ResearchError("Choose offline or wikipedia mode.")
    state = ResearchState(question=question, mode=mode)
    state.plan = ["Clarify the question and important limits",
                  "Find up to four relevant source candidates",
                  "Read each source; don't cite search result snippets",
                  "Copy checkable, relevant evidence into notes",
                  "Verify source IDs and quotes; write a cautious brief"]
    state.audit.append("PLAN: five bounded steps; no autonomous arbitrary tool execution")
    state.step = "search"
    candidates = search_sources(question, mode=mode, session=session)
    state.audit.append(f"SEARCH: found {len(candidates)} candidate(s)")
    state.step = "read"
    for candidate in candidates[:MAX_SOURCES]:
        try:
            source = read_source(candidate, mode=mode, session=session)
            state.sources.append(source)
            state.audit.append(f"READ: {source.source_id}; {len(source.text)} characters")
        except ResearchError as exc:
            state.audit.append(f"SKIP: {candidate.get('title', 'untitled')} — {exc}")
    state.step = "take_notes"
    state.notes = take_notes(question, state.sources)
    state.audit.append(f"TAKE_NOTES: {len(state.notes)} exact quoted sentence(s)")
    state.step = "verify"
    state.verified_notes = verify_notes(state.notes, state.sources)
    state.audit.append(f"VERIFY: {len(state.verified_notes)} original-source quotes confirmed")
    state.step = "report"
    state.report = write_report(state)
    state.audit.append("REPORT: grounded evidence brief completed")
    state.step = "done"
    return state


def source_fingerprint(source: Source) -> str:
    return sha256((source.source_id + source.text).encode("utf-8")).hexdigest()[:16]
