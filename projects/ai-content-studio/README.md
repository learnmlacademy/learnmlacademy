# Build Your Own ChatGPT-Style AI Content Creator — Project 9

**Project goal:** A small bookshop is launching a campus reading club. It needs a friendly social post, a professional email announcement, and a clear product-style description — all based on the same factual brief. Writing each by hand takes time, and an unreviewed LLM might invent a discount or an event date. Build a content studio that asks for real inputs, validates structured answers, catches common formatting failures and exports copy for human review.

**What the app really does:** The baseline works offline using deterministic templates — clearly labelled **not AI-generated**. Select the optional OpenAI mode and provide your own API key to call a genuine language model that returns JSON with the requested headline, body, call-to-action, audience, tone and caveat. The API may incur a cost. An automatic checklist helps with format, but the user must verify all factual claims, permissions and rights.

## Begin from an empty VS Code folder

1. Install **Python 3.12** and **VS Code**. Open VS Code → File → Open Folder → `projects/ai-content-studio`. Choose Terminal → New Terminal.
2. Create an environment: Windows: `py -3.12 -m venv .venv`; `.venv\Scripts\activate`. Mac/Linux: `python3.12 -m venv .venv && source .venv/bin/activate`.
3. Install: `python -m pip install -r requirements.txt`.
4. Verify the standalone schema and checks: `python demo.py`. It prints `SOURCE MODE: Template demo`; this is **not** a simulated model call.
5. Run the tests: `python -m pytest -q`. No real API token is required; tests mock the provider.
6. Start the browser app: `python -m streamlit run app.py`. Open the printed local address (usually http://localhost:8501).
7. In the sidebar select **Create**, **Social post**, **Friendly**, and **Template demo (offline)**. In the main form keep the sample `Sunrise Books` reading-club brief and click **Create content**.
8. Inspect the headline, body, CTA, and automatic editorial checks. Download Markdown and JSON. The JSON explicitly marks `human_fact_checked: false`.
9. Change the format to Email campaign or Product description. Compare how the template handles the same facts, then choose Rewrite/Summarize and paste an existing draft.
10. **Real AI option:** Set `OPENAI_API_KEY` in your local terminal environment (never place it inside app source). Restart Streamlit, select **OpenAI API (real AI)** and check the explicit consent to sharing the text. Click Create content. Your key and model permissions may affect availability; a valid result uses the same structured schema.
11. Validate every generated claim, discount, price, deadline or performance statement yourself before publishing. The automatic rubric cannot establish whether factual claims are true.

## Source layout

- `src/studio.py`: input/output schema, operation prompts, template demo, real model client, automatic checks, exports
- `app.py`: interactive Streamlit interface with user consent, session history and downloads
- `demo.py`: no-credit reproducible example
- `tests/test_studio.py`: offline schema/model-mock tests and edge cases
- `scripts/capture_screenshots.py`: real desktop/mobile app evidence captured in CI
- `.github/workflows/ai-content-studio-verify.yml`: verifies code, visuals, website page and source parity

## Concepts learned

**Prompts vs model training:** The brief guides a pre-trained model without changing its learned parameters. **JSON structured output:** The program parses and validates content into a fixed Pydantic schema. **Defensive output validation:** The AI is not allowed to invent unknown field names, mislabel model origin or exceed the word limit. **Human review:** Automatically checking tone, required phrase and word count is not evidence that the generated facts are accurate.

## Worked numerical example (manual editorial rubric)

Grade a draft in four areas from 0–5: audience relevance, factual grounding, CTA clarity and readability. Weights: 40%, 30%, 20%, 10%. If your reviewed scores are 4, 5, 3, 4 then total = `0.40×4 + 0.30×5 + 0.20×3 + 0.10×4 = 4.1 out of 5`. These scores are **illustrative**, and a person must assign them after inspecting the draft — the app never claims this is an AI-generated quality measurement.

## Important limitations

- Template mode is rules-based and not real AI; cloud mode makes a model request and could incur charges.
- User-provided copy is treated as plain data in structured prompts; do not paste keys, confidential customer information or protected material without permission.
- No automatically generated factual claim is independently verified. The output schema and checks are syntactic/format-level.
- Session history is temporary for your current Streamlit session; the app has no permanent database or user login.
- API models can change, requests can fail or return invalid JSON, and word limits are only enforceable by rejecting invalid content.
- No external images are generated; students create text copy, not copyrighted brand artwork.

## Interview questions

1. How does prompting differ from fine-tuning?
2. Why validate AI output with a schema even after asking for JSON?
3. What is the difference between programmatic checklist passes and factual correctness?
4. What is the risk of including API keys in a prompt or exported draft?
5. How do temperature and content constraints influence variation?
6. Why should a failed model response not silently become a fake "AI" success?


## Learner path — get files before installing

Start by cloning or downloading the repository, **then** opening `projects/ai-content-studio` in VS Code. The command `python -m pip install -r requirements.txt` cannot work until that file exists. To clone:

```bash
git clone --depth 1 https://github.com/learnmlacademy/learnmlacademy.git
cd learnmlacademy/projects/ai-content-studio
```

You can also download the entire repository ZIP at https://github.com/learnmlacademy/learnmlacademy/archive/refs/heads/main.zip, extract, and open this project folder. The ZIP is not a project-only starter download.

## Real AI without a paid API key (local Ollama)

Install Ollama from https://ollama.com, run `ollama pull llama3.2` to download a model and ensure the local Ollama server is running (typically port 11434). Choose **Local Ollama (real AI; no API fee)** in Streamlit. It sends prompts to `http://127.0.0.1:11434/v1` on the same machine using the OpenAI-compatible client. Local computation consumes RAM, disk and electricity, and response quality varies. The app does not automatically configure a remote cloud Ollama account. The local model must return the JSON schema or the app will show an error.

## Cloud AI keys, consent and model

OpenAI mode is optional, sends the brief/draft to the provider only after explicit consent, and may incur API fees. Put `OPENAI_API_KEY` in your terminal environment, never in repository files. Override the default model with `OPENAI_MODEL` (default `gpt-4.1-mini`). Windows PowerShell: `$env:OPENAI_API_KEY = Read-Host "Paste your API key"`; macOS/Linux: `read -rs -p "OpenAI API key: " OPENAI_API_KEY; echo; export OPENAI_API_KEY`.

## Predict, experiment, observe

1. Change Social post to Email campaign in offline mode. Predict which heading and greeting will change, and check the output. This is formatting, not a genuine rewrite.
2. Run a 30-word limit. Verify the template never exceeds it. In real model mode an overlong result is rejected rather than claimed successful.
3. Compare the same brief in the offline template and locally downloaded Ollama model. Which one actually produces novel word choices?
4. Supply an unverified date. Note that structural checks cannot prove the date is true.
5. For each experiment write down the initial prediction, the exact setting changed, the observed result and the concept being tested.

**Important:** Offline Rewrite preserves the submitted original text for editing, and offline Summarize only extracts early words. These are explicitly labelled demo behaviors, NOT meaning-aware paraphrasing or summarization. Model paths are covered by mock tests; no paid API run or live Ollama result is claimed.
