"""Capture a real completed Streamlit research flow, desktop and mobile."""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parents[1] / "outputs" / "screenshots"

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as browser_tool:
        browser = browser_tool.chromium.launch(headless=True, args=["--no-sandbox"])
        try:
            for device, width, height in [("desktop", 1440, 1000), ("mobile", 390, 844)]:
                page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
                page.goto("http://127.0.0.1:8501", wait_until="domcontentloaded", timeout=60000)
                page.get_by_role("button", name="Run research").wait_for(timeout=60000)
                page.screenshot(path=str(OUT / f"research-{device}-question.png"), full_page=True)
                page.get_by_role("button", name="Run research").click()
                page.get_by_text("Research completed:", exact=False).wait_for(timeout=60000)
                page.screenshot(path=str(OUT / f"research-{device}-result.png"), full_page=True)
                page.close()
        finally:
            browser.close()
    for p in sorted(OUT.glob("*.png")):
        print("Captured browser evidence:", p.name, p.stat().st_size)

if __name__ == "__main__":
    main()
