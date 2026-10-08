from __future__ import annotations

from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = ROOT / "outputs" / "screenshots"
APP_URL = "http://127.0.0.1:8501"


def choose(page, label: str, option_text: str) -> None:
    page.get_by_role("combobox", name=label).click()
    page.get_by_text(option_text, exact=True).click()


def main() -> None:
    OUTPUTS.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1100})
        page.goto(APP_URL, wait_until="networkidle")
        predict_button = page.get_by_role("button", name="Predict survival")
        predict_button.wait_for(state="visible", timeout=30000)
        page.wait_for_timeout(500)

        page.screenshot(path=OUTPUTS / "titanic-app-form.png", full_page=True)

        predict_button.click()
        page.wait_for_timeout(1200)
        page.screenshot(path=OUTPUTS / "titanic-prediction-survived.png", full_page=True)

        choose(page, "Ticket class", "Class 3")
        choose(page, "Sex recorded in the dataset", "male")
        page.get_by_role("spinbutton", name="Age in years").fill("35")
        page.get_by_role("spinbutton", name="Ticket fare (historical pounds)").fill("8")
        page.get_by_role("button", name="Predict survival").click()
        page.wait_for_timeout(1200)
        page.screenshot(path=OUTPUTS / "titanic-prediction-not-survived.png", full_page=True)

        browser.close()

    print("Captured genuine Streamlit screenshots from the running Titanic app.")


if __name__ == "__main__":
    main()
