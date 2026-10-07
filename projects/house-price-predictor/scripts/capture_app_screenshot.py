from __future__ import annotations

import subprocess
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUTS_DIR = PROJECT_ROOT / "outputs"
HEALTH_URL = "http://127.0.0.1:8501/_stcore/health"
APP_URL = "http://127.0.0.1:8501"


def wait_for_streamlit(timeout_seconds: int = 60) -> None:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(HEALTH_URL, timeout=3) as response:
                if response.status == 200:
                    return
        except Exception:
            pass
        time.sleep(1)
    raise TimeoutError("Streamlit did not become healthy in time.")


def main() -> None:
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)

    process = subprocess.Popen(
        [
            "streamlit",
            "run",
            "app.py",
            "--server.headless",
            "true",
            "--server.port",
            "8501",
        ],
        cwd=PROJECT_ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        wait_for_streamlit()

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            page = browser.new_page(viewport={"width": 1440, "height": 1100})
            page.goto(APP_URL, wait_until="networkidle")
            page.screenshot(
                path=OUTPUTS_DIR / "streamlit-house-price-app.png",
                full_page=True,
            )

            page.get_by_role("button", name="Estimate sale price").click()
            page.wait_for_timeout(1500)
            page.screenshot(
                path=OUTPUTS_DIR / "streamlit-house-price-prediction.png",
                full_page=True,
            )
            browser.close()

        print("Captured real Streamlit screenshots.")
    finally:
        process.terminate()
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()


if __name__ == "__main__":
    main()
