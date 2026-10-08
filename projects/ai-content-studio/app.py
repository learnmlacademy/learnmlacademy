"""Run: python -m streamlit run app.py  (from this project directory)."""
from __future__ import annotations
import os
import streamlit as st
from pydantic import ValidationError
from src.studio import (
    ContentRequest, StudioError, export_record, generate_with_openai,
    render_markdown, review_content, template_preview,
)

st.set_page_config(page_title="AI Content Studio | LearnMLAcademy", page_icon="✍️", layout="wide")
st.title("Build Your Own AI Content Studio")
st.caption("One business brief → reusable social posts, emails and product descriptions.")
st.info("Start with a **template-only preview**. It uses no AI. For genuine AI writing, "
        "opt in to the OpenAI API and bring your own key.")
with st.sidebar:
    st.header("Writing controls")
    operation = st.selectbox("Operation", ["Create", "Rewrite", "Summarize"])
    kind = st.selectbox("Content format", ["Social post", "Email campaign", "Product description"])
    tone = st.selectbox("Tone", ["Friendly", "Professional", "Playful"])
    max_words = st.slider("Maximum body words", 30, 250, 100, step=10)
    mode = st.radio("Generation engine", ["Template demo (offline)", "OpenAI API (real AI)"])
    if mode.startswith("OpenAI"):
        st.warning("Cloud mode sends your brief and any draft to the AI provider. "
                   "Do not send private customer records.")
        consent = st.checkbox("I consent to sharing this brief with the AI provider.")
    else:
        consent = False

with st.form("campaign_form"):
    st.subheader("1 · Tell the studio what to write")
    brand = st.text_input("Brand / organization", value="Sunrise Books")
    audience = st.text_input("Target readers", value="Local university students")
    brief = st.text_area(
        "Facts to use (do not invent prices or dates)",
        value="A small independent bookshop is launching a campus reading club. "
              "Students can discover new books, share recommendations and attend friendly discussion sessions. "
              "The bookshop wants an inviting announcement.",
        height=135,
    )
    call_to_action = st.text_input("Call to action", value="Ask in store how to join the reading club.")
    must_include = st.text_input("Optional exact phrase", value="reading club")
    draft = st.text_area(
        "Existing text (only for Rewrite and Summarize)",
        value="", height=100,
        placeholder="Paste previous copy when choosing Rewrite or Summarize.",
    )
    submit = st.form_submit_button("Create content", type="primary")

if submit:
    try:
        request = ContentRequest(
            brand=brand, audience=audience, brief=brief, kind=kind,
            operation=operation, tone=tone, call_to_action=call_to_action,
            must_include=must_include, draft=draft, max_words=max_words,
        )
        request.validate_operation()
        if mode.startswith("OpenAI"):
            if not consent:
                raise StudioError("Read and accept the cloud sharing notice before generating.")
            if not os.getenv("OPENAI_API_KEY"):
                raise StudioError("Set OPENAI_API_KEY locally. Offline template mode needs no key.")
            from openai import OpenAI
            result = generate_with_openai(request, OpenAI())
        else:
            result = template_preview(request)
        record = {"request": request, "result": result}
        st.session_state.setdefault("history", []).append(record)
        st.session_state["history"] = st.session_state["history"][-10:]
        st.session_state["selected"] = len(st.session_state["history"]) - 1
    except (ValidationError, StudioError) as exc:
        st.error(f"Please correct the brief: {exc}")

history = st.session_state.get("history", [])
if history:
    st.divider()
    st.subheader("2 · Review, revise and export your results")
    selected = st.selectbox("Saved drafts in this session", options=list(range(len(history))),
                            index=st.session_state.get("selected", len(history)-1),
                            format_func=lambda i: f"Draft {i+1}: {history[i]['request'].kind} "
                                                  f"({history[i]['result'].source_mode})")
    request, result = history[selected]["request"], history[selected]["result"]
    st.markdown(f"### {result.headline}")
    st.write(result.body)
    st.markdown(f"**Call to action:** {result.call_to_action}")
    st.caption(result.caveat)
    st.caption(f"Engine: {result.source_mode}. AI-generated facts are NOT independently checked.")
    st.subheader("3 · Automatic editorial checks")
    checks = review_content(request, result)
    for check in checks:
        st.write(f"{'✅' if check.passed else '⚠️'} {check.name} — {check.details}")
    st.warning("These checks only validate format and selected requirements. "
               "A human must verify claims, rights, and accuracy before posting.")
    st.download_button("Download content (.md)", render_markdown(result),
                       file_name="campaign-copy.md", mime="text/markdown")
    st.download_button("Download structured draft (.json)", export_record(request, result),
                       file_name="campaign-record.json", mime="application/json")
    st.caption("To improve a draft, switch Operation to Rewrite and paste the output back "
               "into Existing text. Demo mode remains a template; cloud mode calls real AI.")
    if st.button("Clear session drafts"):
        st.session_state["history"] = []
        st.session_state["selected"] = 0
        st.rerun()
else:
    st.caption("No draft generated yet. Complete the form and click Create content.")
