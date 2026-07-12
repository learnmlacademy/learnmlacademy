import React from 'react';

export function BlogContent_what_is_rag() {
  return (
    <div className="space-y-10">

      {/* Intro */}
      <p className="text-xl text-slate-600 leading-relaxed">
        Large Language Models like GPT-4 and Claude are remarkable — but they have a fundamental limitation: everything they know was frozen at training time. Ask them about last week's news, your company's internal documents, or a product released yesterday and they either hallucinate an answer or admit they don't know. Retrieval-Augmented Generation (RAG) solves this by giving an LLM the ability to look things up before it answers — combining the reasoning power of a language model with the accuracy of a live knowledge base.
      </p>

      {/* What is RAG */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">What is Retrieval-Augmented Generation?</h2>
        <p className="text-slate-700 leading-relaxed">
          RAG is an AI architecture pattern that augments a language model's response by first retrieving relevant information from an external knowledge source and injecting it into the prompt as context. The model then generates its answer grounded in that retrieved content rather than relying solely on what it learned during training.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The term was introduced in a 2020 paper by researchers at Facebook AI Research (now Meta AI). The core insight was simple but powerful: instead of trying to bake all knowledge into a model's parameters (which is expensive, inflexible, and quickly goes stale), let the model retrieve what it needs at query time from a separate, updatable knowledge store.
        </p>
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <p className="font-semibold text-indigo-900 mb-2">One-line definition</p>
          <p className="text-indigo-800 text-lg">RAG = Retrieval + Generation. Find the relevant facts first, then generate an answer using those facts as context.</p>
        </div>
      </section>

      {/* Why RAG */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Why Do We Need RAG?</h2>
        <p className="text-slate-700 leading-relaxed">
          Language models have three limitations that RAG directly addresses:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
            <p className="font-bold text-rose-800 mb-2">Knowledge cutoff</p>
            <p className="text-rose-700 text-sm leading-relaxed">The model only knows what was in its training data. Events, documents, or data after the cutoff date are invisible to it. A model trained in early 2024 knows nothing about what happened in late 2024 or 2025.</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <p className="font-bold text-amber-800 mb-2">Hallucination</p>
            <p className="text-amber-700 text-sm leading-relaxed">When an LLM doesn't know something, it often invents a plausible-sounding answer rather than admitting uncertainty. In business contexts — legal, medical, financial — a confident wrong answer is worse than no answer.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-bold text-slate-800 mb-2">Private knowledge</p>
            <p className="text-slate-700 text-sm leading-relaxed">Your company's internal documentation, product manuals, customer records, and proprietary research were never in the model's training data and never should be. RAG lets you query private knowledge safely.</p>
          </div>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Fine-tuning is an alternative — you retrain the model on your specific data. But fine-tuning is expensive, slow, requires significant ML expertise, and still doesn't solve the staleness problem because it too produces a static, frozen model. RAG is more practical for most use cases: the knowledge base can be updated in minutes without retraining anything.
        </p>
      </section>

      {/* How RAG Works — Architecture */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">How RAG Works — The Architecture</h2>
        <p className="text-slate-700 leading-relaxed">
          RAG has two distinct phases: an offline indexing phase (done once, or whenever your knowledge base updates) and an online retrieval-generation phase (done for every user query).
        </p>

        {/* Architecture Diagram */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-4 font-semibold">RAG Architecture</p>

          {/* Indexing Phase */}
          <div className="mb-6">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Phase 1 — Indexing (Offline)</p>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-wrap">
              {[
                { label: "Raw Documents", sub: "PDFs, docs, web pages, databases", color: "bg-slate-700" },
                { label: "Text Chunking", sub: "Split into ~500 token chunks", color: "bg-slate-700" },
                { label: "Embedding Model", sub: "Convert chunks to vectors", color: "bg-slate-700" },
                { label: "Vector Database", sub: "FAISS / Pinecone / Chroma", color: "bg-emerald-800" },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div className={`${step.color} rounded-xl px-4 py-3 text-center min-w-[130px]`}>
                    <p className="font-semibold text-sm text-white">{step.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{step.sub}</p>
                  </div>
                  {i < 3 && <span className="text-slate-500 font-bold text-lg hidden md:block">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Query Phase */}
          <div>
            <p className="text-indigo-400 font-bold text-sm uppercase tracking-wider mb-3">Phase 2 — Retrieval + Generation (Online, per query)</p>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-wrap">
              {[
                { label: "User Query", sub: "\"What is our refund policy?\"", color: "bg-slate-700" },
                { label: "Embed Query", sub: "Same embedding model as indexing", color: "bg-slate-700" },
                { label: "Vector Search", sub: "Find top-k similar chunks", color: "bg-indigo-800" },
                { label: "Prompt Construction", sub: "Query + retrieved chunks", color: "bg-slate-700" },
                { label: "LLM Generation", sub: "Answer grounded in context", color: "bg-violet-800" },
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div className={`${step.color} rounded-xl px-4 py-3 text-center min-w-[120px]`}>
                    <p className="font-semibold text-sm text-white">{step.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{step.sub}</p>
                  </div>
                  {i < 4 && <span className="text-slate-500 font-bold text-lg hidden md:block">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Step-by-step explanation</h3>

          <div className="space-y-3">
            {[
              { n: "1", title: "Document ingestion", body: "You feed your knowledge base into the system — PDFs, Word documents, web pages, database tables, Notion pages, anything. These are the documents the model will be able to reference." },
              { n: "2", title: "Chunking", body: "Each document is split into smaller chunks, typically 200–500 tokens each. This is necessary because you can't put an entire 50-page PDF into a prompt. Chunk size is a tunable parameter — too small and chunks lose context; too large and retrieval becomes imprecise." },
              { n: "3", title: "Embedding", body: "Each chunk is converted into a vector (a list of numbers) using an embedding model. Semantically similar text produces similar vectors. This is what enables searching by meaning rather than keyword matching." },
              { n: "4", title: "Vector storage", body: "All chunk vectors are stored in a vector database (FAISS, Pinecone, Chroma, Weaviate). Think of it as a search index where you search by meaning rather than text." },
              { n: "5", title: "Query embedding", body: "When a user asks a question, that question is embedded using the same model, producing a query vector." },
              { n: "6", title: "Similarity search", body: "The query vector is compared against all chunk vectors using cosine similarity or dot product. The top-k most similar chunks are retrieved — these are the passages most likely to contain the answer." },
              { n: "7", title: "Prompt construction", body: "A prompt is assembled: the original user question + the retrieved chunks as context. The LLM is instructed to answer only based on the provided context." },
              { n: "8", title: "Generation", body: "The LLM generates a response grounded in the retrieved context. Because the relevant facts are in the prompt, the model doesn't need to rely on (potentially outdated or wrong) parametric memory." },
            ].map(step => (
              <div key={step.n} className="flex gap-4">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">{step.n}</div>
                <div>
                  <p className="font-semibold text-slate-800">{step.title}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Python Implementation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Python Implementation — RAG from Scratch</h2>
        <p className="text-slate-700 leading-relaxed">
          Let's build a working RAG pipeline step by step using LangChain, FAISS, and OpenAI. We'll build a system that answers questions about a custom document.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Step 1 — Install dependencies</h3>
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 text-xs font-mono ml-2">terminal</span>
            </div>
            <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`pip install langchain langchain-openai faiss-cpu tiktoken openai`}</pre>
          </div>

          <h3 className="text-lg font-bold text-slate-800">Step 2 — Prepare and chunk documents</h3>
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 text-xs font-mono ml-2">step2_chunking.py</span>
            </div>
            <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`from langchain.text_splitter import RecursiveCharacterTextSplitter

# Your source documents — could be PDFs, web pages, database exports
documents = [
    """
    ML Academy Refund Policy:
    All premium courses are eligible for a full refund within 30 days of purchase.
    To request a refund, email support@mlacademy.com with your order ID.
    Refunds are processed within 5-7 business days.
    After 30 days, only partial refunds of 50% are available up to 60 days.
    After 60 days, no refunds are issued.
    """,
    """
    ML Academy Course Catalogue:
    We offer courses in Machine Learning, Deep Learning, NLP, and MLOps.
    The Machine Learning Fundamentals course runs for 12 weeks.
    The Deep Learning Specialisation runs for 16 weeks.
    All courses include live mentoring sessions every Saturday at 10 AM IST.
    Certificate of completion is issued within 7 days of finishing the course.
    """,
]

# Split documents into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,      # characters per chunk
    chunk_overlap=40,    # overlap between consecutive chunks to preserve context
)

chunks = splitter.create_documents(documents)

print(f"Total chunks created: {len(chunks)}")
for i, chunk in enumerate(chunks):
    print(f"\\nChunk {i+1} ({len(chunk.page_content)} chars):")
    print(chunk.page_content[:100], "...")`}</pre>
            <div className="bg-slate-950 border-t border-slate-700 px-4 py-3">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">Output</p>
              <pre className="text-emerald-400 font-mono text-xs">{`Total chunks created: 6

Chunk 1 (198 chars):
ML Academy Refund Policy:
All premium courses are eligible for a full refund within 30 days of purchase.
To request a refund, email support@mlacademy.com ...

Chunk 2 (156 chars):
To request a refund, email support@mlacademy.com with your order ID.
Refunds are processed within 5-7 business days.
After 30 days, only partial ...`}</pre>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800">Step 3 — Create embeddings and vector store</h3>
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 text-xs font-mono ml-2">step3_vectorstore.py</span>
            </div>
            <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

os.environ["OPENAI_API_KEY"] = "your-openai-api-key"

# Embedding model converts text to vectors
embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")

# Build FAISS vector store from chunks
vectorstore = FAISS.from_documents(chunks, embedding_model)

# Save to disk so you don't rebuild every time
vectorstore.save_local("my_knowledge_base")

print("Vector store created and saved.")
print(f"Indexed {vectorstore.index.ntotal} vectors")

# Test similarity search
query = "How many days do I have to request a refund?"
results = vectorstore.similarity_search(query, k=2)

print(f"\\nTop 2 results for: '{query}'")
for i, doc in enumerate(results):
    print(f"\\nResult {i+1}:")
    print(doc.page_content)`}</pre>
            <div className="bg-slate-950 border-t border-slate-700 px-4 py-3">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">Output</p>
              <pre className="text-emerald-400 font-mono text-xs">{`Vector store created and saved.
Indexed 6 vectors

Top 2 results for: 'How many days do I have to request a refund?'

Result 1:
ML Academy Refund Policy:
All premium courses are eligible for a full refund within 30 days of purchase.
To request a refund, email support@mlacademy.com with your order ID.

Result 2:
Refunds are processed within 5-7 business days.
After 30 days, only partial refunds of 50% are available up to 60 days.
After 60 days, no refunds are issued.`}</pre>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-800">Step 4 — Build the full RAG chain</h3>
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 text-xs font-mono ml-2">step4_rag_chain.py</span>
            </div>
            <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# Load vector store from disk
embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = FAISS.load_local(
    "my_knowledge_base",
    embedding_model,
    allow_dangerous_deserialization=True
)

# Create retriever — fetches top 3 most relevant chunks per query
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# Prompt template — instructs the LLM to answer only from context
prompt_template = """You are a helpful assistant. Answer the user's question
using ONLY the information provided in the context below.
If the answer is not in the context, say "I don't have that information."

Context:
{context}

Question: {question}

Answer:"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

# LLM
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# Full RAG chain
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",          # stuff = concatenate all retrieved chunks into one prompt
    retriever=retriever,
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True
)

# Ask questions
questions = [
    "What is the refund policy after 30 days?",
    "How long does the Deep Learning course run?",
    "What time are the mentoring sessions?",
    "Do you offer refunds after 90 days?",
]

for q in questions:
    result = rag_chain.invoke({"query": q})
    print(f"Q: {q}")
    print(f"A: {result['result']}")
    print(f"Sources used: {len(result['source_documents'])} chunks")
    print("-" * 60)`}</pre>
            <div className="bg-slate-950 border-t border-slate-700 px-4 py-3">
              <p className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">Output</p>
              <pre className="text-emerald-400 font-mono text-xs">{`Q: What is the refund policy after 30 days?
A: After 30 days, only a partial refund of 50% is available up to 60 days.
   After 60 days, no refunds are issued.
Sources used: 3 chunks
------------------------------------------------------------
Q: How long does the Deep Learning course run?
A: The Deep Learning Specialisation runs for 16 weeks.
Sources used: 3 chunks
------------------------------------------------------------
Q: What time are the mentoring sessions?
A: Live mentoring sessions are held every Saturday at 10 AM IST.
Sources used: 3 chunks
------------------------------------------------------------
Q: Do you offer refunds after 90 days?
A: I don't have that information.
Sources used: 3 chunks
------------------------------------------------------------`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
          <p className="font-semibold text-emerald-900 mb-2">Notice the last answer</p>
          <p className="text-emerald-800 leading-relaxed">The model correctly says "I don't have that information" for the 90-day refund question — because that scenario isn't in the documents. This is RAG preventing hallucination: when the answer isn't in the retrieved context, the model admits it rather than inventing something.</p>
        </div>
      </section>

      {/* Real-world examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Real-World Examples of RAG in Production</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              company: "Customer Support Chatbots",
              example: "A company indexes its entire help documentation, product manuals, and FAQ database. When a customer asks 'How do I reset my password?', the bot retrieves the relevant help article and generates a precise, step-by-step answer — always up to date because the index updates whenever docs change.",
              color: "bg-indigo-50 border-indigo-100",
              badge: "bg-indigo-100 text-indigo-800",
            },
            {
              company: "Legal and Compliance Research",
              example: "Law firms index thousands of case files and regulatory documents. Associates ask 'Find precedents where GDPR Article 17 was applied in healthcare' and the RAG system retrieves the 5 most relevant cases for review — something that would take hours of manual search.",
              color: "bg-violet-50 border-violet-100",
              badge: "bg-violet-100 text-violet-800",
            },
            {
              company: "Medical Knowledge Assistants",
              example: "Hospitals build RAG systems over peer-reviewed clinical guidelines. When a clinician asks about drug interactions or treatment protocols, the system retrieves the specific guideline sections and generates a summary with citations — grounded in verified medical literature.",
              color: "bg-emerald-50 border-emerald-100",
              badge: "bg-emerald-100 text-emerald-800",
            },
            {
              company: "Internal Enterprise Search",
              example: "Enterprises index Confluence pages, Slack threads, engineering RFCs, and HR policies. Employees ask 'What is our parental leave policy in Germany?' and get a precise answer from the actual HR document — not a guess from a generic model.",
              color: "bg-amber-50 border-amber-100",
              badge: "bg-amber-100 text-amber-800",
            },
          ].map(item => (
            <div key={item.company} className={`${item.color} border rounded-2xl p-5`}>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.badge} inline-block mb-3`}>{item.company}</span>
              <p className="text-slate-700 text-sm leading-relaxed">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When to use RAG */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">When to Use RAG — Practical Decision Guide</h2>
        <p className="text-slate-700 leading-relaxed">RAG is not the right solution for every problem. Here is a clear decision framework:</p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="text-left px-4 py-3 font-semibold">Scenario</th>
                <th className="text-left px-4 py-3 font-semibold">Use RAG?</th>
                <th className="text-left px-4 py-3 font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Your knowledge base updates frequently (daily/weekly)", "✅ Yes", "RAG indexes update cheaply. Fine-tuning can't keep pace."],
                ["You need answers grounded in specific private documents", "✅ Yes", "RAG retrieves from your exact source material with citations."],
                ["You need to prevent hallucinations on factual queries", "✅ Yes", "Grounding in retrieved context dramatically reduces confabulation."],
                ["You want to cite sources for every answer", "✅ Yes", "RAG knows which chunks it retrieved — citation is straightforward."],
                ["You need the model to change its tone/writing style", "❌ Use Fine-tuning", "RAG adds external facts; it doesn't change how the model writes."],
                ["You need to teach the model new tasks it can't do today", "❌ Use Fine-tuning", "RAG provides context for retrieval; it doesn't teach new capabilities."],
                ["Your question requires reasoning over all documents at once", "⚠️ With care", "RAG retrieves top-k chunks. Global reasoning across a corpus is harder."],
                ["Low-latency response is critical (under 100ms)", "⚠️ With care", "Retrieval adds latency. Cache common queries to mitigate."],
              ].map(([scenario, use, why], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 text-slate-700 border-t border-slate-100">{scenario}</td>
                  <td className="px-4 py-3 font-semibold border-t border-slate-100">
                    <span className={use.includes("Yes") ? "text-emerald-700" : use.includes("No") ? "text-rose-700" : "text-amber-700"}>{use}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 border-t border-slate-100">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Advantages */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Advantages of RAG</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Always up to date", body: "Update the index, not the model. New information is available in the next query without any retraining." },
            { title: "Reduces hallucination", body: "When the answer is grounded in retrieved text, the model is far less likely to fabricate. The context is in the prompt." },
            { title: "Transparent and citable", body: "You always know which source chunks were retrieved. Every answer can be traced back to a specific document section." },
            { title: "Cost efficient", body: "No GPU clusters needed. Adding new knowledge means updating a document and re-indexing — minutes of work, not weeks of training." },
            { title: "Works on private data", body: "Your documents never need to leave your infrastructure. You can run the embedding model and LLM entirely on-premises." },
            { title: "Scales to large corpora", body: "Approximate nearest-neighbour search (FAISS, ScaNN) retrieves from millions of chunks in milliseconds." },
          ].map(item => (
            <div key={item.title} className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <span className="text-emerald-500 font-bold text-lg mt-0.5">✓</span>
              <div>
                <p className="font-semibold text-emerald-900">{item.title}</p>
                <p className="text-emerald-800 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disadvantages */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Disadvantages and Limitations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "Retrieval quality bottleneck", body: "If retrieval returns the wrong chunks, the LLM will generate a wrong answer confidently. Garbage in, garbage out — the model cannot compensate for a bad retrieval step." },
            { title: "Chunk size is tricky", body: "Too small: chunks lack context and retrieval is imprecise. Too large: the prompt fills up and important details from other chunks get squeezed out. Requires tuning per use case." },
            { title: "Latency overhead", body: "Every query now involves an embedding step plus a vector search before the LLM call. For real-time applications, this added latency must be managed with caching and async retrieval." },
            { title: "Multi-hop reasoning is hard", body: "If answering a question requires combining information from 5 different document sections, standard RAG (which retrieves a fixed k chunks) may miss some. Multi-hop RAG extensions address this but add complexity." },
            { title: "No persistent memory", body: "RAG retrieves from static documents. It has no memory of previous conversations unless you explicitly add conversation history to the prompt." },
            { title: "Requires embedding consistency", body: "If you change your embedding model, you must re-embed and re-index your entire knowledge base. Mixing embeddings from different models in the same index breaks similarity search." },
          ].map(item => (
            <div key={item.title} className="flex gap-3 bg-rose-50 border border-rose-100 rounded-xl p-4">
              <span className="text-rose-500 font-bold text-lg mt-0.5">✗</span>
              <div>
                <p className="font-semibold text-rose-900">{item.title}</p>
                <p className="text-rose-800 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* When NOT to use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">When NOT to Use RAG</h2>
        <p className="text-slate-700 leading-relaxed">
          RAG is powerful, but it is the wrong tool in these specific situations:
        </p>
        <div className="space-y-3">
          {[
            {
              n: "1",
              title: "When the task is purely generative with no factual grounding required",
              body: "Writing a poem, generating creative fiction, brainstorming taglines — none of these benefit from retrieval. RAG adds latency and complexity without adding value when the task doesn't require factual accuracy.",
              color: "border-rose-400 bg-rose-50",
            },
            {
              n: "2",
              title: "When you need to change the model's core behaviour or capabilities",
              body: "If your LLM can't summarise in bullet points, doesn't follow a specific output format, or lacks a domain-specific style — these are training problems, not retrieval problems. Fine-tuning changes how the model behaves; RAG only changes what it knows.",
              color: "border-amber-400 bg-amber-50",
            },
            {
              n: "3",
              title: "When your knowledge base is tiny and static",
              body: "If you have 10 documents that never change, you can fit them all directly into a system prompt. RAG introduces indexing infrastructure, embedding costs, and retrieval complexity that simply isn't worth it for a small, unchanging corpus.",
              color: "border-amber-400 bg-amber-50",
            },
            {
              n: "4",
              title: "When you need precise mathematical or logical reasoning over data",
              body: "RAG retrieves relevant text passages — it doesn't execute code or do arithmetic. If someone asks 'What was our average revenue last quarter across 10,000 transactions?', you need a tool-augmented LLM with database access, not RAG.",
              color: "border-rose-400 bg-rose-50",
            },
            {
              n: "5",
              title: "When response latency must be under ~200ms",
              body: "An embedding call + vector search + LLM generation typically takes 1–4 seconds end to end. For real-time autocomplete, live transcription, or instant UI responses, RAG's architecture is too slow without significant caching infrastructure.",
              color: "border-rose-400 bg-rose-50",
            },
          ].map(item => (
            <div key={item.n} className={`border-l-4 ${item.color} rounded-r-xl p-5 flex gap-4`}>
              <div className="bg-slate-800 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">{item.n}</div>
              <div>
                <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                <p className="text-slate-700 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RAG vs Fine-tuning */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">RAG vs Fine-tuning — Quick Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="text-left px-4 py-3 font-semibold">Aspect</th>
                <th className="text-left px-4 py-3 font-semibold">RAG</th>
                <th className="text-left px-4 py-3 font-semibold">Fine-tuning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Knowledge updates", "Index update — minutes", "Retraining — days to weeks"],
                ["Cost", "Low — indexing is cheap", "High — requires GPU training"],
                ["Hallucination control", "Strong — grounded in retrieved text", "Moderate — baked into parameters"],
                ["Citable sources", "Yes — you know which chunks were used", "No — knowledge is in weights"],
                ["Behaviour change", "No — only knowledge changes", "Yes — model behaviour can be reshaped"],
                ["Private data safety", "Documents stay in your store", "Data is baked into model weights"],
                ["Best for", "Dynamic, factual Q&A over documents", "Style, format, domain-specific tasks"],
              ].map(([aspect, rag, ft], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 font-semibold text-slate-800 border-t border-slate-100">{aspect}</td>
                  <td className="px-4 py-3 text-emerald-700 border-t border-slate-100">{rag}</td>
                  <td className="px-4 py-3 text-indigo-700 border-t border-slate-100">{ft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Key Takeaways</h2>
        <div className="bg-slate-900 rounded-2xl p-8 text-white space-y-4">
          {[
            "RAG gives LLMs access to external, up-to-date knowledge without retraining — by retrieving relevant text and injecting it into the prompt before generation.",
            "The two phases are: offline indexing (embed and store your documents in a vector database) and online retrieval (embed the query, find similar chunks, generate a grounded answer).",
            "RAG is the right choice when you need accurate, citable, up-to-date answers from a specific knowledge base. It is not the right choice for creative tasks, behaviour change, or sub-200ms latency requirements.",
            "The biggest failure mode in RAG is not the LLM — it is retrieval quality. If the wrong chunks are retrieved, the best LLM in the world will give a wrong answer. Invest in chunking strategy and retrieval evaluation.",
            "RAG and fine-tuning are complementary, not competing. Many production systems use both: fine-tune for style and behaviour, add RAG for up-to-date factual grounding.",
          ].map((point, i) => (
            <div key={i} className="flex gap-3">
              <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-slate-300 leading-relaxed text-sm">{point}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
