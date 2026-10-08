"""Start from the project folder: python -m streamlit run app.py"""
from __future__ import annotations

from hashlib import sha256
from pathlib import Path
import os
import streamlit as st
from src.rag import RagIndex, PdfError, cited_sources, generate_answer

ROOT = Path(__file__).resolve().parent
SAMPLE = ROOT / "sample_docs" / "Campus_Travel_Policy.pdf"

st.set_page_config(page_title="Chat With Your PDFs | LearnMLAcademy", page_icon="📄", layout="wide")
st.title("Chat With Your PDFs: Build a RAG Assistant")
st.caption("Page-aware retrieval, real citations and an offline mode — a learning project, not legal advice.")

with st.sidebar:
    st.header("1 · Prepare your documents")
    uploads = st.file_uploader("Upload up to 5 text-based PDF files", type=["pdf"], accept_multiple_files=True)
    sample = st.checkbox("Use the included example policy", value=True)
    st.caption("12 MiB/file · 100 pages/file · 5 documents maximum. Scanned PDFs require OCR first.")
    st.header("2 · Choose how to answer")
    mode = st.radio("Answer mode", ["Offline grounded passage", "OpenAI summary (optional)"])
    st.caption("Offline mode never sends documents or questions to a remote API.")
    if mode.startswith("OpenAI"):
        st.warning("Cloud mode sends selected excerpts and your question to an external model provider. Do not use confidential PDFs.")
    top_k = st.slider("Retrieved passages", 1, 6, 3)
    st.divider()
    st.caption("PDF → pages → chunks → TF-IDF vectors → cosine retrieval → citation.")

files = []
if sample and SAMPLE.is_file():
    files.append((SAMPLE.name, SAMPLE.read_bytes()))
if uploads:
    files.extend((file.name, file.getvalue()) for file in uploads)

if not files:
    st.info("Upload a PDF, or enable the included example in the sidebar.")
    st.stop()

fingerprint = sha256(b"".join(
    name.encode("utf-8") + sha256(data).digest()
    for name, data in files
)).hexdigest()
if st.session_state.get("source_fingerprint") != fingerprint:
    st.session_state.pop("last_answer", None)
    st.session_state["source_fingerprint"] = fingerprint


@st.cache_resource(max_entries=4)
def cached_index(named_files: tuple[tuple[str, bytes], ...]):
    return RagIndex.from_pdfs(named_files)


try:
    index = cached_index(tuple(files))
except (PdfError, ValueError) as exc:
    st.error(f"Could not index the PDFs: {exc}")
    st.stop()

st.success(f"Indexed {len(index.chunks)} page-aware chunks from {len(files)} chosen file(s).")
with st.expander("Inspect the indexed sources"):
    st.dataframe([
        {"File": c.filename, "Page": c.page, "Chunk": c.chunk_number,
         "ID": c.id, "Words": len(c.text.split())}
        for c in index.chunks
    ], use_container_width=True, hide_index=True)

st.subheader("3 · Ask a question")
examples = [
    "How quickly must students report cancelled travel?",
    "How many days do I have to submit reimbursement receipts?",
    "What does the policy say about meal vouchers on Mars?",
]
choice = st.selectbox("Try a question from the sample document", examples)
question = st.text_input("Your question", value=choice, max_chars=750)
if st.button("Find answer and page citation", type="primary"):
    try:
        client = None
        if mode.startswith("OpenAI"):
            if not os.getenv("OPENAI_API_KEY"):
                st.error("Set OPENAI_API_KEY locally to use optional summaries. Offline mode works without it.")
                st.stop()
            from openai import OpenAI
            client = OpenAI()
        answer = generate_answer(index, question, top_k=top_k, client=client)
    except Exception as exc:
        st.error(f"Unable to answer: {exc}")
        st.stop()
    st.session_state["last_answer"] = answer

if "last_answer" in st.session_state:
    answer = st.session_state["last_answer"]
    st.subheader("Answer")
    st.write(answer.text)
    st.caption(f"Answer mode: {answer.mode} · Retrieval: local word-based TF-IDF, not a neural semantic embedding.")
    refs = cited_sources(answer)
    if refs:
        st.subheader("Verified source pages")
        for number, ref in enumerate(refs, 1):
            with st.expander(f'[{number}] {ref["filename"]} · page {ref["page"]}', expanded=(number == 1)):
                st.caption(f'Exact source ID: {ref["id"]}')
                st.write(ref["text"])
    else:
        st.info("No reliable matching passage was found; no source can be cited.")
    with st.expander("See retrieved passages and cosine similarities"):
        for position, hit in enumerate(answer.hits, 1):
            st.markdown(
                f"**{position}. {hit.source.filename}, page {hit.source.page} "
                f"· score {hit.score:.3f}**"
            )
            st.write(hit.source.text)

st.divider()
st.caption(
    "Educational prototype. Avoid sensitive PDFs. Citation validation checks source IDs, "
    "not whether a model-generated statement is logically supported."
)
