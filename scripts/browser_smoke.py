"""End-to-end desktop/mobile smoke checks against the locally built Vite site.

Executed in GitHub Actions with real headless Chrome after npm run build.
No third-party API credentials are required.
"""
from __future__ import annotations

import os
import socket
import subprocess
import time
import urllib.request
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
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
    driver = webdriver.Chrome(options=options)
    driver.set_window_size(width, height)
    driver.set_page_load_timeout(35)
    return driver


def check_view(driver: webdriver.Chrome, project_id: str, mobile: bool = False) -> None:
    driver.get(BASE + "/projects/" + project_id)
    WebDriverWait(driver, 20).until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "h1")) >= 1)
    WebDriverWait(driver, 20).until(lambda d: d.find_elements(By.ID, "project-build-checkpoints"))
    assert driver.find_elements(By.LINK_TEXT("Download complete source")), project_id + ": source action missing"
    assert driver.find_elements(By.LINK_TEXT("My build checklist")), project_id + ": navigation missing"
    assert driver.find_elements(By.CSS_SELECTOR, "[role='progressbar']"), project_id + ": accessible progress missing"
    horizontal = driver.execute_script("return document.documentElement.scrollWidth - window.innerWidth")
    # Code blocks scroll inside their own container; the overall page should not.
    assert horizontal < 14, f"{project_id}: page overflows {horizontal}px at {'mobile' if mobile else 'desktop'} width"
    if mobile and project_id in {"retail-forecasting", "disaster-tweets", "digit-recognizer"}:
        driver.save_screenshot(str(ARTIFACTS / (project_id + "-mobile.png")))


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
                WebDriverWait(driver, 20).until(lambda d: len(d.find_elements(By.LINK_TEXT("Start the handbook"))) == 12)
                if not mobile:
                    driver.save_screenshot(str(ARTIFACTS / "projects-desktop.png"))
                for project in PROJECTS:
                    check_view(driver, project, mobile=mobile)
            finally:
                driver.quit()
        print("BROWSER QA PASS: 12/12 handbook routes and ZIPs, desktop 1440px and mobile 390px, progress UI, navigation and no horizontal page overflow.")
    finally:
        server.terminate()
        try:
            server.wait(timeout=8)
        except subprocess.TimeoutExpired:
            server.kill()
            server.wait()


if __name__ == "__main__":
    main()
