# Project 11 — Build Your Own Perplexity-Style Research Assistant

This is a runnable **bounded research workflow**, not a chat-screen mockup. The agent performs plan → search → read → take notes → verify quotes → report, storing source records and an auditable tool trace.

**Honesty about the demonstration:** Default mode uses three ORIGINAL teaching notes. They are not independent scientific publications. Live mode searches and reads English Wikipedia introductions by page ID; this is not a full-web search engine, exhaustive literature review, or proof that Wikipedia claims are correct.

## An interesting problem to solve

Your city council asks **“Do urban trees cool cities, and what limits their benefits?”** A decision should not rely on a plausible-sounding paragraph. We must find evidence, record what the source actually says, explain limitations, and attach traceable references.

## Start from nothing in VS Code

1. Install Python 3.12 and VS Code, then open the `projects/ai-research-assistant` folder via File → Open Folder.
2. In VS Code, choose Terminal → New Terminal. This terminal must be in the project folder.
3. Windows: `py -3.12 -m venv .venv`; then `.venv\Scripts\activate`. macOS/Linux: `python3.12 -m venv .venv && source .venv/bin/activate`.
4. Run `python -m pip install -r requirements.txt`.
5. Run `python -m pytest -q` to check the agent, forged citations, malicious source instructions, network timeouts and real-source retrieval through mocked requests.
6. Run `python demo.py`. Check the source markers DEMO-1/2/3, quotes and the complete PLAN → REPORT trace.
7. Run `python -m streamlit run app.py`, then open the printed localhost address, usually http://localhost:8501.
8. Keep Classroom mode enabled and click Run research. Read the Plan, Cited research brief, Original evidence and Agent trace tabs. Download the Markdown brief or JSON evidence if needed.
9. Optional AI synthesis: configure `OPENAI_API_KEY` in your terminal environment, restart Streamlit, tick the explicit evidence-sharing consent and press Generate optional AI synthesis. This step sends the question and cited excerpts to OpenAI, may incur charges, and still needs human claim checking.
10. Switch to Wikipedia mode only for public, nonsensitive topics. This requires access to the public Wikipedia API and can fail because of rate limits or network policy.

## Files you can copy

- `src/research.py`: all five tools and the state machine; `app.py`: Streamlit frontend; `demo.py`: offline command-line demo.
- `tests/test_research.py`: deterministic tests and mocked live research; `scripts/capture_screenshots.py`: real Playwright desktop/mobile captures.
- `requirements.txt`: exact dependency versions; `.github/workflows/ai-research-assistant-verify.yml`: reproducible GitHub CI.

## What you are learning

**1. Plan:** Break a practical problem into bounded steps. **2. Search:** Discover candidate source IDs. **3. Read:** Fetch the actual extract, not only a search snippet. **4. Note:** Copy relevant sentences rather than generating them. **5. Verify:** Check exact quotes belong to approved source IDs. **6. Report:** Construct a source-backed brief with limitations.

## Numerical example

Suppose the query has five meaningful terms `{urban, trees, cool, limits, benefits}`. A source sentence that contains `{urban, trees}` overlaps in 2 terms. Its simple lexical score is 2, compared with a sentence matching 1 term. This is an illustrative relevance heuristic—not neural embedding similarity, factual verification, or an independent effect-size estimate.

## Security and limitation disclosures

- Live source tools only call a fixed Wikipedia API origin. Users and documents cannot choose an arbitrary request URL.
- At most four page candidates, a 250-character query and a 10,000-character extract are processed.
- Original classroom notes never become credible peer-reviewed sources because the app displays them.
- Quote validation proves text provenance, **not** the underlying truth of an external statement.
- Offline uses no internet or API key. Live sends the research query to Wikipedia; do not submit confidential topics.
- Wikipedia is a secondary overview. Cross-check factual claims with primary publications, dates and possible disagreement before decision-making.
- Page excerpts are treated as untrusted text; the agent does not execute their instructions or browse arbitrary links.

## Check your understanding

1. Why plan before searching? 2. Why read a complete excerpt rather than cite a result snippet? 3. How does tool calling differ from unchecked autonomous browsing? 4. How is an exact-source citation different from factual accuracy? 5. Why does lexical keyword scoring miss paraphrases? 6. How could you add an LLM planner, independent source-ranking and claim checking safely?
