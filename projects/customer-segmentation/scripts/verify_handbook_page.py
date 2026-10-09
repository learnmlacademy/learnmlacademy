from __future__ import annotations

import json
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "handbook-verification"
BASE_URL = "http://127.0.0.1:4173"
PAGE_URL = BASE_URL + "/projects/customer-segmentation"

REQUIRED_TEXT = [
    "How Amazon Knows What Kind of Customer You Are",
    "The practical problem: thousands of shoppers, but no customer labels",
    "Recency (R)",
    "Frequency (F)",
    "Monetary (M)",
    "541,909",
    "397,884",
    "4,338",
    "Choose k with evidence instead of guessing",
    "K-Means (k=2)",
    "0.4326",
    "Hierarchical (k=2)",
    "0.4086",
    "DBSCAN",
    "High-value active customers",
    "1,669",
    "Lapsing occasional customers",
    "2,669",
    "Implementation mastery check",
    "Complete-project checkpoint",
]

REQUIRED_IMAGES = {
    "/project-handbooks/customer-segmentation/rfm_distributions.png",
    "/project-handbooks/customer-segmentation/k_selection.png",
    "/project-handbooks/customer-segmentation/pca_segments.png",
    "/project-handbooks/customer-segmentation/cluster_profiles.png",
    "/project-handbooks/customer-segmentation/method_comparison.png",
    "/project-handbooks/customer-segmentation/customer-segmentation-app.png",
    "/project-handbooks/customer-segmentation/customer-segmentation-result.png",
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
        path=OUTPUT / f"customer-segmentation-handbook-{name}.png",
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
    print("Customer Segmentation handbook desktop/mobile/evidence verification passed.")


if __name__ == "__main__":
    main()
