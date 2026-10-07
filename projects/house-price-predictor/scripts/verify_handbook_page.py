from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

PROJECT_ROOT = Path(__file__).resolve().parents[1]
OUTPUTS_DIR = PROJECT_ROOT / "outputs"
BASE_URL = "http://127.0.0.1:4173"
PAGE_URL = BASE_URL + "/projects/house-price"


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
    raise TimeoutError("Vite preview did not become available in time.")


def verify_page(page, viewport_name: str) -> dict:
    page.goto(PAGE_URL, wait_until="networkidle")

    heading = page.get_by_role("heading", name="What Is This House Really Worth? Build a House Price Predictor")
    if heading.count() != 1:
        raise AssertionError(f"{viewport_name}: main handbook heading was not found exactly once.")

    body_text = page.locator("body").inner_text()
    forbidden = ["SCREENSHOTS NEXT", "BUILDING NEXT", "HANDBOOK V1"]
    for phrase in forbidden:
        if phrase in body_text:
            raise AssertionError(f"{viewport_name}: unfinished placeholder found: {phrase}")

    required_text = [
        "Topics covered",
        "Tools you will actually use",
        "XGBoost",
        "$15,670",
        "$23,792",
        "0.929",
        "python download_data.py",
        "python src/train_model.py",
        "streamlit run app.py",
        "Common problems and fixes",
        "Complete-project checkpoint",
    ]
    for phrase in required_text:
        if phrase not in body_text:
            raise AssertionError(f"{viewport_name}: required handbook content missing: {phrase}")

    images = page.locator('main img[src^="/project-handbooks/house-price/"]')
    if images.count() < 3:
        raise AssertionError(f"{viewport_name}: expected at least three real evidence images.")

    for index in range(images.count()):
        image_locator = images.nth(index)
        image_locator.scroll_into_view_if_needed()
        page.wait_for_function(
            "(img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0",
            arg=image_locator.element_handle(),
            timeout=10000,
        )

    image_results = images.evaluate_all(
        """imgs => imgs.map(img => ({
          src: img.getAttribute('src'),
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          alt: img.getAttribute('alt')
        }))"""
    )
    for image in image_results:
        if not image["complete"] or image["naturalWidth"] <= 0 or image["naturalHeight"] <= 0:
            raise AssertionError(f"{viewport_name}: image failed to load: {image['src']}")
        if not image["alt"]:
            raise AssertionError(f"{viewport_name}: image has no alt text: {image['src']}")

    dimensions = page.evaluate(
        """() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        })"""
    )
    if dimensions["scrollWidth"] > dimensions["clientWidth"] + 2:
        raise AssertionError(
            f"{viewport_name}: page has horizontal overflow "
            f"({dimensions['scrollWidth']} > {dimensions['clientWidth']})."
        )

    return {
        "viewport": viewport_name,
        "title": page.title(),
        "image_count": len(image_results),
        "horizontal_overflow": False,
    }


def main() -> None:
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
    wait_for_preview()

    results = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()

        desktop = browser.new_page(viewport={"width": 1440, "height": 1000})
        results.append(verify_page(desktop, "desktop"))
        desktop.screenshot(
            path=OUTPUTS_DIR / "handbook-house-price-desktop.png",
            full_page=False,
        )

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        results.append(verify_page(mobile, "mobile"))
        mobile.screenshot(
            path=OUTPUTS_DIR / "handbook-house-price-mobile.png",
            full_page=False,
        )

        browser.close()

    (OUTPUTS_DIR / "handbook_page_verification.json").write_text(
        json.dumps(results, indent=2),
        encoding="utf-8",
    )
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
