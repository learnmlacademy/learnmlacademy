"""Capture genuine Streamlit pages on desktop and mobile from running projects.

Digit screenshot uses one built-in scikit-learn test image, never a fabricated UI.
Disaster demo screenshots are visibly labeled as fictional-fixture training.
Retail screenshot comes from the official checksum-pinned UCI workbook.
"""
from pathlib import Path
import subprocess
import sys
import time
import urllib.request

from PIL import Image
import numpy as np
from playwright.sync_api import sync_playwright
from sklearn.datasets import load_digits

REPO = Path(__file__).resolve().parents[1]
PORT = 8501
CASES = [
    ("digit-recognizer", "Teach AI to Read Handwritten Numbers"),
    ("retail-forecasting", "Can We Predict Tomorrow's Sales?"),
    ("disaster-tweets", "Can AI Detect a Real Disaster Tweet?"),
]

def prepare_digit_sample():
    digits = load_digits()
    # Genuine dataset image (sample 3), not a drawing falsely presented as a photo.
    pixels = np.asarray(digits.images[3] / 16.0 * 255, dtype=np.uint8)
    dest = REPO / "projects" / "digit-recognizer" / "artifacts" / "example-input.png"
    Image.fromarray(pixels, mode="L").resize((256, 256), Image.Resampling.NEAREST).save(dest)
    return dest

def wait_for_port(max_s=70):
    for _ in range(max_s * 2):
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/_stcore/health", timeout=1) as response:
                if response.status == 200:
                    return
        except Exception:
            pass
        time.sleep(.5)
    raise RuntimeError("Streamlit health endpoint did not become ready")

def capture_case(playwright, name, heading, sample):
    folder = REPO / "projects" / name
    proc = subprocess.Popen(
        [sys.executable, "-m", "streamlit", "run", "app.py", "--server.port", str(PORT),
         "--server.headless", "true", "--browser.gatherUsageStats", "false"],
        cwd=folder, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT,
    )
    try:
        wait_for_port()
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        try:
            for device, width, height in (("desktop", 1365, 900), ("mobile", 390, 844)):
                page = browser.new_page(viewport={"width": width, "height": height})
                page.goto(f"http://127.0.0.1:{PORT}", wait_until="domcontentloaded", timeout=60000)
                page.get_by_role("heading", name=heading).wait_for(timeout=60000)
                if name == "digit-recognizer":
                    page.locator('input[type="file"]').set_input_files(str(sample))
                    page.get_by_text("Predicted digit:", exact=False).wait_for(timeout=60000)
                if name == "disaster-tweets":
                    page.get_by_label("Hypothetical public message").fill(
                        "Floodwater has entered several homes near the river.")
                    page.get_by_role("button", name="Classify", exact=True).click()
                    page.get_by_text("Estimated disaster-related probability").wait_for(timeout=60000)
                if name == "retail-forecasting":
                    page.get_by_text("Untouched chronological 28-day test").wait_for(timeout=60000)
                page.wait_for_timeout(1400)
                dest = REPO / "public" / "project-handbooks" / name
                dest.mkdir(parents=True, exist_ok=True)
                path = dest / f"{device}-app.png"
                page.screenshot(path=str(path), full_page=True)
                assert path.stat().st_size > 6000, f"Unexpected empty capture: {path}"
                print("Captured true running-app evidence:", name, device, path.stat().st_size, "bytes")
                page.close()
        finally:
            browser.close()
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=8)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait(timeout=8)

def main():
    sample = prepare_digit_sample()
    with sync_playwright() as pw:
        for name, heading in CASES:
            capture_case(pw, name, heading, sample)

if __name__ == "__main__":
    main()
