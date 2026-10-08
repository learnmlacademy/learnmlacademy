"""CI-only real Chromium screenshots; synthetic PDF uploads, no mock UI."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect


def main():
    reports = Path("reports")
    reports.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        context = browser.new_context(viewport={"width": 1280, "height": 1000})
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto("http://127.0.0.1:8501", wait_until="domcontentloaded")
        expect(page.get_by_role("heading", name="Chat With Your PDFs", exact=True)).to_be_visible(timeout=30000)
        page.locator('input[type="file"]').set_input_files(["data/pdfs/policy.pdf", "data/pdfs/employee_guide.pdf"])
        page.get_by_role("button", name="Build Index", exact=True).click()
        expect(page.get_by_text("Index ready: 2 files, 6 text pages, 6 chunks.", exact=True)).to_be_visible(timeout=90000)
        page.screenshot(path=str(reports / "01-index-built.png"), full_page=True)
        page.get_by_role("textbox", name="Question", exact=True).fill("What is the refund window?")
        page.get_by_role("button", name="Ask", exact=True).click()
        expect(page.get_by_role("heading", name="Answer", exact=True)).to_be_visible(timeout=30000)
        expect(page.get_by_text("The refund window is 30 days", exact=False).first).to_be_visible()
        expect(page.get_by_role("heading", name="Citations", exact=True)).to_be_visible()
        expect(page.get_by_text("[S1] policy.pdf | Page 1", exact=False)).to_be_visible()
        page.get_by_text("Retrieved evidence", exact=True).click()
        expect(page.get_by_text("Top semantic candidates after reranking.", exact=False)).to_be_visible()
        # Streamlit scrolls inside its app container; full_page alone is only a viewport.
        # Wait for the genuine disclosure animation, then frame the answer/evidence.
        page.wait_for_function("() => document.querySelector('[data-testid=stExpander]').getBoundingClientRect().height > 400")
        page.wait_for_timeout(350)
        for width, height, filename in [(1280, 1600, "02-answer-citations-evidence.png"),
                                        (461, 2100, "03-answer-mobile.png")]:
            page.set_viewport_size({"width": width, "height": height})
            page.get_by_role("heading", name="Answer", exact=True).evaluate("""element => {
                element.scrollIntoView({block: 'start'});
                for (let parent = element.parentElement; parent; parent = parent.parentElement) {
                    if (parent.scrollHeight > parent.clientHeight && /auto|scroll/.test(getComputedStyle(parent).overflowY)) {
                        parent.scrollTop -= 80; break;
                    }
                }
            }""")
            page.wait_for_timeout(200)
            box = page.get_by_test_id("stExpander").bounding_box()
            assert box and box["height"] > 400 and box["y"] + box["height"] <= height, "Evidence must fit in capture"
            page.screenshot(path=str(reports / filename))
        assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
        # Separate real browser session must start with no document/index/result.
        isolated = browser.new_context(viewport={"width": 1280, "height": 1000})
        second = isolated.new_page()
        second.goto("http://127.0.0.1:8501", wait_until="domcontentloaded")
        expect(second.get_by_role("button", name="Build Index", exact=True)).to_be_disabled(timeout=30000)
        expect(second.get_by_role("heading", name="Answer", exact=True)).to_have_count(0)
        second.locator('input[type="file"]').set_input_files("data/pdfs/employee_guide.pdf")
        second.get_by_role("button", name="Build Index", exact=True).click()
        expect(second.get_by_text("Index ready: 1 files, 3 text pages, 3 chunks.", exact=True)).to_be_visible(timeout=30000)
        second.get_by_role("textbox", name="Question", exact=True).fill("What is the remote work rule?")
        second.get_by_role("button", name="Ask", exact=True).click()
        expect(second.get_by_text("[S1] employee_guide.pdf | Page 2", exact=False)).to_be_visible(timeout=30000)
        expect(second.get_by_text("policy.pdf", exact=False)).to_have_count(0)
        page.get_by_role("button", name="Clear documents and index", exact=True).click()
        expect(page.get_by_role("button", name="Build Index", exact=True)).to_be_disabled()
        expect(page.get_by_role("heading", name="Answer", exact=True)).to_have_count(0)
        expect(second.get_by_text("[S1] employee_guide.pdf | Page 2", exact=False)).to_be_visible()
        assert not errors, errors
        (reports / "browser-result.json").write_text(json.dumps({"status": "pass", "screenshots": 3,
            "desktop_width": 1280, "mobile_width": 461, "real_uploads": True,
            "index_built": True, "cited_answer": True, "session_isolation": True,
            "clear_documents": True, "page_errors": errors}, indent=2))
        browser.close()


if __name__ == "__main__":
    main()
