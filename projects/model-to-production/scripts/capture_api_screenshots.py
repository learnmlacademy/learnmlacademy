from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "outputs" / "screenshots"
BASE_URL = "http://127.0.0.1:8000"


def render_exchange(page, title: str, subtitle: str, request_body: dict, payload: dict) -> None:
    page.evaluate(
        """({title, subtitle, requestBody, payload}) => {
          document.body.innerHTML = "";
          const main = document.createElement("main");
          main.style.cssText = "font-family:ui-monospace,SFMono-Regular,Menlo,monospace;max-width:1100px;margin:36px auto;padding:28px;color:#0f172a";
          const h1 = document.createElement("h1");
          h1.style.fontFamily = "Arial,sans-serif";
          h1.textContent = title;
          main.appendChild(h1);
          const p = document.createElement("p");
          p.style.cssText = "font-family:Arial,sans-serif;color:#475569";
          p.textContent = subtitle;
          main.appendChild(p);

          const reqHeading = document.createElement("h2");
          reqHeading.textContent = "Request JSON";
          main.appendChild(reqHeading);
          const req = document.createElement("pre");
          req.style.cssText = "background:#0f172a;color:#e2e8f0;padding:20px;border-radius:12px;white-space:pre-wrap";
          req.textContent = JSON.stringify(requestBody, null, 2);
          main.appendChild(req);

          const resHeading = document.createElement("h2");
          resHeading.textContent = "HTTP " + payload.status + " response";
          main.appendChild(resHeading);
          const res = document.createElement("pre");
          res.style.cssText = payload.status === 200
            ? "background:#ecfdf5;color:#064e3b;padding:20px;border:1px solid #a7f3d0;border-radius:12px;white-space:pre-wrap"
            : "background:#fff7ed;color:#9a3412;padding:20px;border:1px solid #fed7aa;border-radius:12px;white-space:pre-wrap";
          res.textContent = JSON.stringify(payload.body, null, 2);
          main.appendChild(res);
          document.body.appendChild(main);
        }""",
        {
            "title": title,
            "subtitle": subtitle,
            "requestBody": request_body,
            "payload": payload,
        },
    )


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    request_body = json.loads(
        (ROOT / "examples" / "customer.json").read_text(encoding="utf-8")
    )

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 1000})

        page.goto(BASE_URL + "/docs", wait_until="networkidle")
        page.get_by_text("Customer Churn Prediction Service").first.wait_for()
        page.screenshot(path=OUTPUT / "api-swagger-docs.png", full_page=True)

        page.goto(BASE_URL + "/health", wait_until="networkidle")
        page.screenshot(path=OUTPUT / "api-health.png", full_page=True)

        page.goto(BASE_URL + "/model-info", wait_until="networkidle")
        page.screenshot(path=OUTPUT / "api-model-info.png", full_page=True)

        page.goto(BASE_URL + "/docs", wait_until="networkidle")
        payload = page.evaluate(
            """async (body) => {
              const response = await fetch('/predict', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
              });
              return {status: response.status, body: await response.json()};
            }""",
            request_body,
        )
        render_exchange(
            page,
            "Real POST /predict request and response",
            "Captured from the running FastAPI service used by the verified build.",
            request_body,
            payload,
        )
        page.screenshot(path=OUTPUT / "api-predict.png", full_page=True)

        bad_body = dict(request_body)
        bad_body["tenure"] = -1
        page.goto(BASE_URL + "/docs", wait_until="networkidle")
        bad = page.evaluate(
            """async (body) => {
              const response = await fetch('/predict', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
              });
              return {status: response.status, body: await response.json()};
            }""",
            bad_body,
        )
        render_exchange(
            page,
            "Real validation rejection",
            "The API refuses an impossible negative tenure before inference.",
            bad_body,
            bad,
        )
        page.screenshot(path=OUTPUT / "api-validation-error.png", full_page=True)
        browser.close()

    print("Captured genuine FastAPI endpoint evidence screenshots.")


if __name__ == "__main__":
    main()
