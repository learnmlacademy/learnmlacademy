"""Capture actual Streamlit app screens at desktop and mobile sizes."""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parents[1] / "outputs" / "screenshots"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        try:
            for name, width, height in [
                ("pdf-rag-app-desktop", 1440, 1050),
                ("pdf-rag-app-mobile", 390, 844),
            ]:
                page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
                page.goto("http://127.0.0.1:8501", wait_until="domcontentloaded", timeout=60000)
                page.get_by_text("Indexed", exact=False).first.wait_for(timeout=60000)
                page.screenshot(path=str(OUT / f"{name}-form.png"), full_page=True)
                page.get_by_role("button", name="Find answer and page citation").click()
                page.get_by_text("Verified source pages", exact=True).wait_for(timeout=60000)
                page.get_by_text("Campus_Travel_Policy.pdf · page 3", exact=False).first.wait_for(timeout=15000)
                page.screenshot(path=str(OUT / f"{name}-answer.png"), full_page=True)
                page.close()
        finally:
            browser.close()
    for path in sorted(OUT.glob("*.png")):
        print("Captured real app:", path.name, path.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
