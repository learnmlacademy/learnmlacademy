from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "screenshots"
URL = "http://127.0.0.1:8501"


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1100})
        page.goto(URL, wait_until="networkidle")
        page.get_by_text("How Amazon Knows What Kind of Customer You Are").wait_for()
        page.screenshot(path=OUTPUT / "customer-segmentation-app.png", full_page=True)

        page.get_by_role("button", name="Find customer segment").click()
        page.get_by_text("Assigned segment:").wait_for()
        page.wait_for_timeout(600)
        page.screenshot(
            path=OUTPUT / "customer-segmentation-result.png",
            full_page=True,
        )
        browser.close()

    print("Captured genuine customer-segmentation Streamlit screenshots.")


if __name__ == "__main__":
    main()
