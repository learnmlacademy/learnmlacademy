from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "handbook-verification"
BASE_URL = "http://127.0.0.1:4173"
PAGE_URL = BASE_URL + "/projects/model-to-production"

REQUIRED_TEXT = [
    "Take an AI Model From Laptop to Production",
    "The practical problem: a model on your laptop is not yet a usable product",
    "7,043 rows",
    "5,634 / 1,409",
    "0.792761",
    "0.628931",
    "0.534759",
    "46 automated tests",
    "GET /health",
    "GET /model-info",
    "POST /predict",
    "Shifted batch: real drift evidence",
    "v2 is different, but not better",
    "v1 → v2",
    "rollback",
    "non-root",
    "Implementation mastery check",
    "Complete-project checkpoint",
]

REQUIRED_IMAGES = {
    "/project-handbooks/model-to-production/v1_confusion_matrix.png",
    "/project-handbooks/model-to-production/version_metrics.png",
    "/project-handbooks/model-to-production/drift_evidence.png",
    "/project-handbooks/model-to-production/api-swagger-docs.png",
    "/project-handbooks/model-to-production/api-health.png",
    "/project-handbooks/model-to-production/api-model-info.png",
    "/project-handbooks/model-to-production/api-predict.png",
    "/project-handbooks/model-to-production/api-validation-error.png",
}


def wait_for_preview(timeout_seconds: int = 45) -> None:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(BASE_URL, timeout=3) as response:
                if response.status == 200:
                    return
        except Exception:
            pass
        time.sleep(1)
    raise TimeoutError("Vite preview did not become available.")


def verify(page, name: str, width: int, height: int) -> dict:
    page.set_viewport_size({"width": width, "height": height})
    page.goto(PAGE_URL, wait_until="networkidle")
    body = page.locator("body").inner_text()

    for phrase in REQUIRED_TEXT:
        if phrase not in body:
            raise AssertionError(f"{name}: missing required text: {phrase}")

    sources = set(
        page.locator("main img").evaluate_all(
            "imgs => imgs.map(img => img.getAttribute('src'))"
        )
    )
    missing = sorted(REQUIRED_IMAGES.difference(sources))
    if missing:
        raise AssertionError(f"{name}: missing required evidence images: {missing}")

    for source in REQUIRED_IMAGES:
        image = page.locator(f'img[src="{source}"]')
        if image.count() != 1:
            raise AssertionError(f"{name}: expected one image for {source}")
        if not image.get_attribute("alt"):
            raise AssertionError(f"{name}: empty alt text for {source}")
        image.scroll_into_view_if_needed()
        page.wait_for_function(
            "(img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0",
            arg=image.element_handle(),
            timeout=10000,
        )

    dimensions = page.evaluate(
        """() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        })"""
    )
    if dimensions["scrollWidth"] > dimensions["clientWidth"] + 2:
        raise AssertionError(
            f"{name}: horizontal overflow "
            f"{dimensions['scrollWidth']} > {dimensions['clientWidth']}"
        )

    OUTPUT.mkdir(parents=True, exist_ok=True)
    page.screenshot(
        path=OUTPUT / f"model-to-production-handbook-{name}.png",
        full_page=False,
    )
    return {"viewport": name, "horizontal_overflow": False}


def main() -> None:
    wait_for_preview()
    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        desktop = browser.new_page()
        results.append(verify(desktop, "desktop", 1440, 1000))
        mobile = browser.new_page()
        results.append(verify(mobile, "mobile", 390, 844))
        browser.close()

    (OUTPUT / "verification.json").write_text(
        json.dumps(results, indent=2),
        encoding="utf-8",
    )
    print("Model-to-Production handbook desktop/mobile/evidence verification passed.")


if __name__ == "__main__":
    main()
