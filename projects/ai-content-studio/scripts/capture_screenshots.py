"""Capture genuine Streamlit forms and offline-template outputs in a browser."""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parents[1] / "outputs" / "screenshots"


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        try:
            for device, width, height in [("desktop", 1440, 1000), ("mobile", 390, 844)]:
                page = browser.new_page(viewport={"width": width, "height": height},
                                        device_scale_factor=1)
                page.goto("http://127.0.0.1:8501", wait_until="domcontentloaded", timeout=60000)
                page.get_by_role("button", name="Create content").wait_for(timeout=60000)
                page.screenshot(path=str(OUT / f"content-studio-{device}-form.png"), full_page=True)
                page.get_by_role("button", name="Create content").click()
                page.get_by_text("Automatic editorial checks", exact=False).wait_for(timeout=60000)
                page.get_by_text("TEMPLATE DEMO ONLY", exact=False).first.wait_for(timeout=15000)
                page.screenshot(path=str(OUT / f"content-studio-{device}-result.png"), full_page=True)
                page.close()
        finally:
            browser.close()
    for image in sorted(OUT.glob("*.png")):
        print("Real application screenshot:", image.name, image.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
