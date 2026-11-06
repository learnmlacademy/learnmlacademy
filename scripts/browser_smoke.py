"""End-to-end desktop/mobile smoke checks against the locally built Vite site.

Executed in GitHub Actions with real headless Chrome after npm run build.
No third-party API credentials are required.
"""
from __future__ import annotations

import os
import re
import socket
import subprocess
import time
import urllib.request
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import ElementClickInterceptedException, NoSuchElementException, StaleElementReferenceException, TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

BASE = "http://127.0.0.1:4173"
PROJECTS = [
    "titanic-survival", "house-price", "credit-card-fraud",
    "customer-segmentation", "retail-forecasting", "movie-recommender",
    "disaster-tweets", "digit-recognizer", "ai-content-creator", "pdf-rag",
    "ai-research-assistant", "model-to-production",
]
ARTIFACTS = Path("browser-quality-evidence")
ARTIFACTS.mkdir(exist_ok=True)


def wait_for_server() -> None:
    for _ in range(45):
        try:
            with socket.create_connection(("127.0.0.1", 4173), timeout=1):
                return
        except OSError:
            time.sleep(1)
    raise AssertionError("Vite preview server did not start on localhost:4173")


def browser(width: int, height: int) -> webdriver.Chrome:
    options = Options()
    options.page_load_strategy = "eager"
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    options.add_argument("--disable-background-networking")
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(width, height)
    driver.set_page_load_timeout(35)
    return driver


def check_view(driver: webdriver.Chrome, project_id: str, mobile: bool = False) -> None:
    driver.get(BASE + "/projects/" + project_id)
    WebDriverWait(driver, 20).until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "h1")) >= 1)
    WebDriverWait(driver, 20).until(lambda d: d.find_elements(By.ID, "project-build-checkpoints"))
    assert driver.find_elements(By.LINK_TEXT, "Download complete source"), project_id + ": source action missing"
    assert driver.find_elements(By.LINK_TEXT, "My build checklist"), project_id + ": navigation missing"
    assert driver.find_elements(By.CSS_SELECTOR, "[role='progressbar']"), project_id + ": accessible progress missing"
    horizontal = driver.execute_script("return document.documentElement.scrollWidth - window.innerWidth")
    # Code blocks scroll inside their own container; the overall page should not.
    assert horizontal < 14, f"{project_id}: page overflows {horizontal}px at {'mobile' if mobile else 'desktop'} width"
    if mobile and project_id in {"retail-forecasting", "disaster-tweets", "digit-recognizer"}:
        driver.save_screenshot(str(ARTIFACTS / (project_id + "-mobile.png")))


def check_returning_learner_hydration(driver: webdriver.Chrome) -> None:
    """SSR HTML must hydrate without React recovery for visitors with saved state."""
    driver.get(BASE + "/")
    driver.execute_script(
        "localStorage.setItem('learnml_completed_lessons_v1', "
        "JSON.stringify(['train-test-split'])); "
        "localStorage.setItem('learnml_last_visited_topic', 'train-test-split'); "
        "localStorage.setItem('learnml_analytics_consent_v1', 'denied');"
    )
    driver.get(BASE + "/learn/train-test-split")
    WebDriverWait(driver, 25).until(
        lambda d: d.find_elements(By.CSS_SELECTOR, "[data-lesson-body='true']")
    )
    WebDriverWait(driver, 10).until(
        lambda d: bool(d.execute_script(
            "return document.querySelector('main')?.textContent?.includes('Train Test Split')"
        ))
    )
    assert not driver.find_elements(By.CSS_SELECTOR, "script[data-lma-ga]"), (
        "Declined analytics must never fetch the GA script"
    )
    assert driver.find_elements(By.CSS_SELECTOR, "[role='progressbar'][aria-label='Lesson reading progress']"), (
        "Lesson progress indicator lacks its accessible name"
    )
    issues = [
        item["message"] for item in driver.get_log("browser")
        if "Minified React error" in item["message"] or "Hydration failed" in item["message"]
    ]
    assert not issues, "React hydration error for returning learner: " + " | ".join(issues)


def curriculum_topic_ids() -> list[str]:
    source = Path("src/data/curriculum.ts").read_text(encoding="utf-8")
    categories = re.finditer(
        r'\{\s*id:\s*"[^"]+",\s*title:\s*"[^"]+",\s*subtopics:\s*\[([\s\S]*?)\n\s*\],\s*\}',
        source,
    )
    ids: list[str] = []
    for category in categories:
        ids.extend(re.findall(r'\{\s*id:\s*"([^"]+)"', category.group(1)))
    if len(ids) != 167 or len(set(ids)) != 167:
        raise AssertionError(f"Expected 167 unique lesson IDs from curriculum; found {len(ids)} / {len(set(ids))}")
    return ids


def check_lesson(driver: webdriver.Chrome, topic_id: str) -> None:
    url = BASE + "/learn/" + topic_id
    driver.get(url)
    WebDriverWait(driver, 25).until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "h1")) >= 1)
    # Re-query the live DOM on each poll: the page may finish hydrating and
    # replace a server-rendered article node while the test is waiting.
    WebDriverWait(driver, 25).until(
        lambda d: d.execute_script(
            """return document.querySelector('article[data-lesson-body="true"]')?.textContent?.trim().length > 200"""
        )
    )
    title = driver.execute_script("return document.title || ''").strip()
    description = driver.execute_script("return document.querySelector('meta[name=description]')?.content || ''").strip()
    canonical = driver.execute_script("return document.querySelector('link[rel=canonical]')?.href || ''").strip()
    assert len(title) >= 12, topic_id + ": missing page title"
    assert len(description) >= 50, topic_id + ": missing/short meta description"
    assert canonical.startswith("https://www.learnmlacademy.com/"), topic_id + ": missing canonical"
    horizontal = driver.execute_script("return document.documentElement.scrollWidth - window.innerWidth")
    assert horizontal < 14, f"{topic_id}: page overflows {horizontal}px at mobile width"
    browser_errors = [
        item["message"] for item in driver.get_log("browser")
        if "Minified React error" in item["message"]
        or "Hydration failed" in item["message"]
        or "Uncaught TypeError" in item["message"]
        or "Uncaught ReferenceError" in item["message"]
    ]
    assert not browser_errors, topic_id + ": JavaScript/hydration errors: " + " | ".join(browser_errors[:3])
    if topic_id == "generative-ai-intro":
        WebDriverWait(driver, 20).until(
            lambda d: d.find_elements(By.CSS_SELECTOR, "svg.recharts-surface")
        )
        assert driver.find_elements(By.CSS_SELECTOR, "svg.recharts-surface"), (
            "Generative AI interactive charts did not render after changing chunk strategy"
        )


def click_python_runner(driver: webdriver.Chrome) -> None:
    """Query the current DOM in Chrome and dispatch Run Code after each React render."""
    def try_click(current_driver: webdriver.Chrome) -> bool:
        return bool(current_driver.execute_script("""
            const runner = document.querySelector('[data-python-runner]');
            if (!runner) return false;
            const buttons = Array.from(runner.querySelectorAll('button'));
            const runButton = buttons.find((button) => button.textContent.trim().includes('Run Code'));
            if (!runButton || runButton.disabled) return false;
            runButton.click();
            return true;
        """))

    try:
        WebDriverWait(driver, 30, poll_frequency=0.25).until(
            try_click,
            "Python Run Code button did not become available",
        )
    except Exception as error:
        debug = driver.execute_script("""
            const runner = document.querySelector('[data-python-runner]');
            return {
              url: location.href,
              runnerFound: Boolean(runner),
              buttons: runner ? Array.from(runner.querySelectorAll('button')).map((button) => ({
                text: button.textContent.trim(),
                disabled: button.disabled,
                html: button.outerHTML.slice(0, 500)
              })) : [],
              bodyText: document.body.innerText.slice(0, 1200)
            };
        """)
        raise AssertionError(f"Python runner button lookup failed: {debug}") from error


def wait_for_python_output(driver: webdriver.Chrome, timeout: int, stage: str) -> None:
    try:
        WebDriverWait(driver, timeout, poll_frequency=0.5).until(
            lambda current_driver: current_driver.find_elements(By.CSS_SELECTOR, "[data-python-output]")
        )
    except TimeoutException as error:
        state = driver.execute_script("""
            const runner = document.querySelector('[data-python-runner]');
            return {
              url: location.href,
              runnerText: runner ? runner.innerText : null,
              outputFound: Boolean(document.querySelector('[data-python-output]')),
              workerResources: performance.getEntriesByType('resource')
                .filter((entry) => /pyodide|python-worker/.test(entry.name))
                .map((entry) => ({ name: entry.name, duration: entry.duration, size: entry.transferSize })),
              serviceWorker: Boolean(navigator.serviceWorker && navigator.serviceWorker.controller)
            };
        """)
        try:
            browser_logs = driver.get_log("browser")[-30:]
        except Exception as log_error:
            browser_logs = [f"Unable to read Chrome browser logs: {log_error}"]
        raise AssertionError(
            f"{stage} did not produce a Python output panel within {timeout}s. "
            f"Live page state: {state}. Chrome logs: {browser_logs}"
        ) from error


def check_python_execution(driver: webdriver.Chrome) -> None:
    """Require actual Python execution, package loading, and plot rendering in Chrome."""
    driver.get(BASE + "/learn/what-is-ml")
    WebDriverWait(driver, 25).until(
        lambda d: d.find_element(By.CSS_SELECTOR, "[data-python-runner]")
    )
    click_python_runner(driver)
    wait_for_python_output(driver, 150, "Introductory Python example")
    output_node = driver.find_element(By.CSS_SELECTOR, "[data-python-output]")
    output = output_node.text
    assert "Learned decision threshold: 4.0" in output, (
        "Browser Python runtime did not execute the introductory threshold-learning example: " + output[:500]
    )
    assert "Predicted result: passed" in output, "Introductory Python prediction output is incorrect"
    assert not output_node.find_elements(By.CSS_SELECTOR, "div.bg-rose-950"), (
        "Introductory Python worker returned an execution error: " + output[:700]
    )

    driver.get(BASE + "/learn/kmeans")
    WebDriverWait(driver, 25).until(
        lambda d: d.find_element(By.CSS_SELECTOR, "[data-python-runner]")
    )
    click_python_runner(driver)
    wait_for_python_output(driver, 210, "K-Means scientific Python example")
    output_node = driver.find_element(By.CSS_SELECTOR, "[data-python-output]")
    output = output_node.text
    assert "Number of clusters: 3" in output, (
        "Pyodide scientific package execution failed: " + output[:700]
    )
    assert not output_node.find_elements(By.CSS_SELECTOR, "div.bg-rose-950"), (
        "Scientific Python worker returned an execution error: " + output[:700]
    )
    assert output_node.find_elements(By.CSS_SELECTOR, 'img[src^="data:image/png;base64,"]'), (
        "matplotlib output was not returned from the Python worker"
    )
    print("PYTHON WORKER QA PASS: stdlib training example, NumPy/scikit-learn K-Means, matplotlib PNG, and real browser output.")


def main() -> None:
    server = subprocess.Popen(
        ["npm", "run", "preview", "--", "--host", "127.0.0.1", "--port", "4173", "--strictPort"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    try:
        wait_for_server()
        with urllib.request.urlopen(BASE + "/projects", timeout=15) as response:
            assert response.status == 200
        for project in PROJECTS:
            with urllib.request.urlopen(BASE + "/project-starters/" + project + ".zip", timeout=15) as response:
                magic = response.read(4)
                assert response.status == 200 and magic == bytes([80, 75, 3, 4]), project + ": ZIP missing or corrupt"

        for width, height, mobile in [(1440, 900, False), (390, 844, True)]:
            driver = browser(width, height)
            try:
                driver.get(BASE + "/projects")
                WebDriverWait(driver, 20).until(lambda d: len(d.find_elements(By.LINK_TEXT, "Start the handbook")) == 12)
                if not mobile:
                    driver.save_screenshot(str(ARTIFACTS / "projects-desktop.png"))
                    check_python_execution(driver)
                for project in PROJECTS:
                    check_view(driver, project, mobile=mobile)
                if mobile:
                    lesson_ids = curriculum_topic_ids()
                    for index, topic_id in enumerate(lesson_ids, start=1):
                        check_lesson(driver, topic_id)
                    print(f"Lesson browser QA PASS: {len(lesson_ids)} curriculum routes at 390px; title/description/canonical, rendered content, no horizontal overflow or React hydration errors.")
                check_returning_learner_hydration(driver)
            finally:
                driver.quit()
        print("BROWSER QA PASS: all 12 project handbooks at desktop/mobile, all 167 lesson routes at mobile, ZIPs, progress UI, metadata and no horizontal overflow/hydration errors.")
    finally:
        server.terminate()
        try:
            server.wait(timeout=8)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()


if __name__ == "__main__":
    main()
