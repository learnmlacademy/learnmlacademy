from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "screenshots"
URL = "http://127.0.0.1:8501"


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1100})
        page.goto(URL, wait_until="networkidle")

        page.get_by_text(
            "Build Your Own Netflix-Style Movie Recommendation System"
        ).wait_for()
        page.get_by_text("Iron Country").first.wait_for()
        page.screenshot(
            path=OUTPUT / "movie-recommender-form.png",
            full_page=True,
        )

        page.get_by_role("button", name="Recommend movies").click()
        page.get_by_text("Because you chose: Iron Country").wait_for()
        page.wait_for_timeout(800)
        page.screenshot(
            path=OUTPUT / "movie-recommender-results.png",
            full_page=True,
        )

        page.get_by_role("radio", name="Content-based").click()
        page.get_by_role("button", name="Recommend movies").click()
        page.get_by_text(
            "Content-based: compare genre + release-decade labels with cosine similarity."
        ).wait_for()
        page.wait_for_timeout(500)
        page.screenshot(
            path=OUTPUT / "movie-recommender-content-results.png",
            full_page=True,
        )

        page.get_by_role("radio", name="Collaborative").click()
        page.get_by_role("button", name="Recommend movies").click()
        page.get_by_text(
            "Collaborative: compare sparse movie-by-user rating patterns."
        ).wait_for()
        page.wait_for_timeout(500)
        page.screenshot(
            path=OUTPUT / "movie-recommender-collaborative-results.png",
            full_page=True,
        )

        page.get_by_role("radio", name="Popular movies").click()
        page.get_by_text("Popular starting points").wait_for()
        page.wait_for_timeout(500)
        page.screenshot(
            path=OUTPUT / "movie-recommender-popular-results.png",
            full_page=True,
        )
        browser.close()

    print("Captured genuine Movie Recommender Streamlit screenshots.")


if __name__ == "__main__":
    main()
