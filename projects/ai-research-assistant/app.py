"""Interactive research assistant. Run from this project folder with Streamlit."""
from __future__ import annotations
import json
import streamlit as st

from src.research import ResearchError, run_research, source_fingerprint

SAMPLE = "Do urban trees cool cities, and what limits their benefits?"

st.set_page_config(page_title="Research Assistant | LearnMLAcademy", page_icon="🔎", layout="wide")
st.title("Build Your Own AI Research Assistant")
st.caption("Plan → search → read → take notes → verify → cite. Learn how research agents work.")
st.info("Classroom mode uses **original training notes, not independent scientific sources**. "
        "Live mode searches/reads Wikipedia only. Both modes show checkable quotations.")

with st.sidebar:
    st.header("Tools and sources")
    mode_label = st.radio(
        "Research mode",
        ["Classroom notes (offline, reliable demo)", "Wikipedia articles (live)"],
    )
    mode = "offline" if mode_label.startswith("Classroom") else "wikipedia"
    st.caption("Wikipedia is not a substitute for peer-reviewed or primary research.")
    st.divider()
    st.markdown("**Bounded tools**")
    st.markdown("1. Plan\n2. Search sources\n3. Read pages\n4. Take notes\n5. Verify quotations\n6. Draft cited report")
    st.caption("Source pages are treated as untrusted data. The agent cannot execute code or visit arbitrary URLs.")

question = st.text_input("What would you like to investigate?", value=SAMPLE, max_chars=250)
if st.button("Run research", type="primary"):
    try:
        with st.spinner("Reading evidence and verifying source references..."):
            st.session_state["research"] = run_research(question, mode=mode)
    except ResearchError as exc:
        st.session_state.pop("research", None)
        st.error(f"Research could not finish: {exc}")

if "research" in st.session_state:
    result = st.session_state["research"]
    st.success(f"Research completed: {len(result.sources)} source(s), "
               f"{len(result.verified_notes)} verified quote(s).")
    plan_tab, answer_tab, proof_tab, tools_tab = st.tabs(
        ["Research plan", "Cited research brief", "Original evidence", "Agent trace"]
    )
    with plan_tab:
        for n, step in enumerate(result.plan, 1):
            st.markdown(f"**{n}. {step}**")
    with answer_tab:
        st.markdown(result.report)
        st.download_button("Download research brief (.md)", result.report,
                           file_name="research-brief.md", mime="text/markdown")
        st.download_button("Download audit and source records (.json)",
                           json.dumps(result.export(), indent=2), file_name="research-evidence.json",
                           mime="application/json")
    with proof_tab:
        if not result.verified_notes:
            st.warning("No supported source quotes found. Try a more specific question.")
        for note in result.verified_notes:
            source = next(s for s in result.sources if s.source_id == note.source_id)
            with st.expander(f"[{source.source_id}] {source.title}", expanded=True):
                st.write(note.exact_quote)
                st.caption(f"Matching keywords: {', '.join(note.matching_words)}")
                st.caption(f"Origin: {source.origin} · Fingerprint: {source_fingerprint(source)}")
                if source.url.startswith("https://"):
                    st.link_button("Open original source", source.url)
                else:
                    st.caption("Classroom fixture — not an external publication.")
    with tools_tab:
        st.code("\n".join(result.audit), language="text")
        st.caption("Each step is bounded. A real research claim still needs human source-quality review.")

st.divider()
st.caption("Privacy: Offline demo performs no network requests. Live mode queries Wikipedia with your "
           "question, requires internet access and should not be used for private/confidential topics.")
