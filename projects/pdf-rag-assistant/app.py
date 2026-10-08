"""Functional local demo. Only model weights are shared; documents stay in session."""
import hashlib
import streamlit as st
from src.embedder import get_embedder
from src.llm import CompatibleProvider, ExtractiveProvider, ProviderError
from src.rag import answer_question
from src.service import build_collection

st.set_page_config(page_title="Chat With Your PDFs", layout="centered")
st.title("Chat With Your PDFs")
st.write("Upload text PDFs, build a local index, then inspect the evidence behind an answer.")
st.caption("Local engineering demo. OCR is not included. Maximum 10 PDFs, 10 MiB each, 40 MiB combined.")
st.info("Local mode uses real semantic retrieval and deterministic sentence selection, not a generative LLM. No API key is required.")

generation = st.session_state.get("upload_generation", 0)
uploads = st.file_uploader("Upload text PDFs", type=["pdf"], accept_multiple_files=True,
                           max_upload_size=10, key=f"pdfs-{generation}")
signature = tuple((u.name, hashlib.sha256(u.getvalue()).hexdigest()) for u in uploads)
if st.session_state.get("collection_signature") != signature:
    for key in ["collection", "summary", "result", "answered_question"]:
        st.session_state.pop(key, None)

left, right = st.columns(2)
build = left.button("Build Index", disabled=not uploads, type="primary")
if right.button("Clear documents and index"):
    for key in ["collection", "summary", "result", "answered_question", "collection_signature"]:
        st.session_state.pop(key, None)
    st.session_state["upload_generation"] = generation + 1
    st.rerun()

if build:
    try:
        with st.spinner("Extracting pages, chunking and embedding locally..."):
            store, summary = build_collection([(u.name, u.getvalue()) for u in uploads])
        st.session_state.update(collection=store, summary=summary, collection_signature=signature)
        st.session_state.pop("result", None)
    except ValueError as error:
        st.error(str(error))
    except Exception:
        st.error("Index build failed. Check PDF limits and the initial model download connection; no document text was logged.")

if "collection" in st.session_state:
    summary = st.session_state["summary"]
    st.success(f"Index ready: {summary['files_processed']} files, {summary['pages_extracted']} text pages, {summary['chunks']} chunks.")
    st.caption(f"Embedding model: {summary['embedding_model']} | {summary['dimension']} dimensions | local CPU")
    if summary["skipped_pages"]:
        st.warning("Some pages contain no extractable text; they were skipped, not OCR-processed.")
        st.json(summary["skipped_pages"])
    mode = st.radio("Answer mode", ["Local extractive demo (no LLM)", "Configured remote LLM"])
    consent = False
    if mode == "Configured remote LLM":
        st.warning("Remote mode sends your question and selected PDF passages/source labels to the configured provider. Its retention policy applies.")
        consent = st.checkbox("I allow this question and retrieved passages to leave this machine.")
    with st.form("question-form"):
        question = st.text_input("Question", placeholder="What is the refund window?", max_chars=2000)
        submitted = st.form_submit_button("Ask")
    if submitted:
        st.session_state.pop("result", None)
        if mode == "Configured remote LLM" and not consent:
            st.warning("Remote generation requires explicit consent. Select local mode to keep text here.")
        else:
            try:
                provider = CompatibleProvider.from_env() if mode == "Configured remote LLM" else ExtractiveProvider()
                with st.spinner("Retrieving evidence..."):
                    result = answer_question(question, st.session_state["collection"], get_embedder(), provider)
                st.session_state.update(result=result, answered_question=question)
            except (ValueError, ProviderError) as error:
                st.error(str(error))
            except Exception:
                st.error("Query failed. Rebuild the index or check the provider configuration.")
    if "result" in st.session_state:
        result = st.session_state["result"]
        st.subheader("Answer")
        st.text(st.session_state["answered_question"])
        st.caption(result["mode"])
        st.text(result["answer"])
        st.subheader("Citations")
        if not result["citations"]:
            st.write("No verified answer citations. Retrieval candidates below are not proof of an answer.")
        for citation in result["citations"]:
            st.text(f"[{citation['source']}] {citation['document']} | Page {citation['page']} | cosine {citation['score']:.3f}")
            st.caption(citation["chunk_id"])
            st.text(citation["snippet"])
        with st.expander("Retrieved evidence", expanded=False):
            st.caption("Top semantic candidates after reranking. Similarity is not a probability or proof of support.")
            for hit in result["retrieved_chunks"]:
                st.text(f"{hit['document']} | Page {hit['page']} | cosine {hit['score']:.3f} | rerank {hit['rerank_score']:.3f}")
                st.caption(hit["chunk_id"])
                st.text(hit["text"])
                st.divider()
else:
    st.write("Choose PDFs and click Build Index before asking a question.")

st.caption("Uploads and index stay in this browser session's server memory, not shared application caches. Clear documents when finished. This is not a hardened public multi-user service.")
