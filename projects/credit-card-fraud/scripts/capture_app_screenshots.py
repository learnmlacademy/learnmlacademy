from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "screenshots"
URL = "http://127.0.0.1:8501"


def choose_example(page, example_id: str) -> None:
    page.get_by_role("combobox", name="Transaction example").click()
    page.get_by_text(example_id, exact=False).click()


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1100})
        page.goto(URL, wait_until="networkidle")
        page.get_by_text(
            "Can AI Catch a Stolen Credit Card Transaction?"
        ).wait_for()
        page.get_by_role("button", name="Score transaction").wait_for()

        page.screenshot(
            path=OUTPUT / "fraud-app-form.png",
            full_page=True,
        )

        page.get_by_role("button", name="Score transaction").click()
        page.get_by_text("Historical label").wait_for()
        page.wait_for_timeout(500)
        page.screenshot(
            path=OUTPUT / "fraud-app-flagged-example.png",
            full_page=True,
        )

        choose_example(page, "TX-07")
        page.get_by_role("button", name="Score transaction").click()
        page.get_by_text("Historical label").wait_for()
        page.wait_for_timeout(500)
        page.screenshot(
            path=OUTPUT / "fraud-app-legitimate-example.png",
            full_page=True,
        )

        browser.close()

    print("Captured genuine Credit Card Fraud Streamlit screenshots.")


if __name__ == "__main__":
    main()
