from __future__ import annotations

import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

PROJECT_URL = "http://127.0.0.1:4173/projects/titanic-survival"
ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = ROOT / "outputs" / "handbook-verification"

REQUIRED_TEXT = [
    "Can You Survive the Titanic? Build a Machine Learning Predictor",
    "The practical problem: can historical passenger details help us predict survival?",
    "See the learning problem before writing the model",
    "Build train_model.py in four understandable pieces",
    "Verified reference result",
    "How the whole system fits together",
    "Install Python on Windows",
    "Download the Titanic training data from Kaggle",
    "Compare five classifier families with training-only cross-validation",
    "Tune Random Forest without touching the holdout",
    "Evaluate once on the untouched 179-passenger test set",
    "Create the Streamlit browser application",
    "Now prove you understand the implementation",
    "How to explain this project in an interview",
    "What would change in a real production classification system?",
    "Implementation mastery check",
    "Complete-project checkpoint",
    "81.01%",
    "0.7258",
]

FORBIDDEN_TEXT = [
    "HANDBOOK V1",
    "SCREENSHOTS NEXT",
    "Gradio prediction app",
    "pip show gradio",
]

REQUIRED_IMAGES = {
    "/projects/titanic-survival/kaggle-data.jpg",
    "/project-handbooks/titanic/training_class_rates.png",
    "/project-handbooks/titanic/survival_by_sex_class.png",
    "/project-handbooks/titanic/model_comparison.png",
    "/project-handbooks/titanic/confusion_matrix.png",
    "/project-handbooks/titanic/titanic-app-form.png",
    "/project-handbooks/titanic/titanic-prediction-survived.png",
    "/project-handbooks/titanic/titanic-prediction-not-survived.png",
    "/project-handbooks/titanic/vscode-training-code.png",
    "/project-handbooks/titanic/vscode-model-comparison.png",
    "/project-handbooks/titanic/vscode-tuning-results.png",
    "/project-handbooks/titanic/vscode-final-metrics.png",
    "/project-handbooks/titanic/vscode-example-predictions.png",
    "/project-handbooks/titanic/vscode-project-workspace.png",
}


def verify_viewport(page, name: str, width: int, height: int) -> None:
    page.set_viewport_size({"width": width, "height": height})
    page.goto(PROJECT_URL, wait_until="networkidle")

    body_text = page.locator("body").inner_text()
    for expected in REQUIRED_TEXT:
        if expected not in body_text:
            raise AssertionError(f"{name}: missing required handbook text: {expected}")

    for forbidden in FORBIDDEN_TEXT:
        if forbidden in body_text:
            raise AssertionError(f"{name}: forbidden stale handbook text is still visible: {forbidden}")

    source_values = set(
        page.locator("main img").evaluate_all("imgs => imgs.map(img => img.getAttribute('src'))")
    )
    missing_images = sorted(REQUIRED_IMAGES.difference(source_values))
    if missing_images:
        raise AssertionError(f"{name}: required evidence images missing from page: {missing_images}")

    for source in REQUIRED_IMAGES:
        image = page.locator(f'img[src="{source}"]')
        if image.count() != 1:
            raise AssertionError(f"{name}: expected exactly one image for {source}")
        if not image.get_attribute("alt"):
            raise AssertionError(f"{name}: evidence image has empty alt text: {source}")
        image.scroll_into_view_if_needed()
        page.wait_for_timeout(150)
        natural_width = image.evaluate("img => img.naturalWidth")
        if natural_width <= 0:
            raise AssertionError(f"{name}: image failed to load: {source}")

    layout = page.evaluate(
        """() => ({
            innerWidth: window.innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth
        })"""
    )
    max_width = max(layout["documentWidth"], layout["bodyWidth"])
    if max_width > layout["innerWidth"] + 2:
        raise AssertionError(f"{name}: horizontal overflow {max_width}px > {layout['innerWidth']}px")

    OUTPUTS.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=OUTPUTS / f"titanic-handbook-{name}.png", full_page=True)

    return layout


def main() -> None:
    results = {}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page()
        results["desktop"] = verify_viewport(page, "desktop", 1440, 1000)
        results["mobile"] = verify_viewport(page, "mobile", 390, 844)
        browser.close()

    (OUTPUTS / "verification.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print("Titanic handbook desktop/mobile/content/evidence verification passed.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Titanic handbook verification failed: {error}", file=sys.stderr)
        raise
