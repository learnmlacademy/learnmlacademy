# House Price Predictor — Screenshot Inventory

Every image listed here is required by the handbook verification. Images are captured from the real executable project or from the real tool displaying the actual project files. No AI-generated or hand-drawn screenshots are accepted.

| # | File | Handbook checkpoint | What it proves | Capture source |
|---|---|---|---|---|
| 1 | `vscode-requirements.png` | Step 6 | The verified `requirements.txt` exists with the exact pinned packages shown in the handbook | Real Visual Studio Code desktop window opened on the project file in CI |
| 2 | `vscode-download-data.png` | Step 7 | The real `download_data.py` used to obtain Ames Housing is present | Real Visual Studio Code desktop window |
| 3 | `vscode-training-code.png` | Step 9 | The real complete `src/train_model.py` exists in the project | Real Visual Studio Code desktop window |
| 4 | `vscode-model-comparison.png` | Step 12 | The five-model cross-validation run generated `outputs/model_comparison.csv` | Real Visual Studio Code desktop window opened on generated output |
| 5 | `vscode-final-metrics.png` | Step 14 | The verified run generated the final holdout result file | Real Visual Studio Code desktop window opened on `outputs/final_metrics.json` |
| 6 | `actual_vs_predicted.png` | Step 15 | The trained model generated the real holdout actual-vs-predicted plot | Matplotlib output from the verified training program |
| 7 | `vscode-app-code.png` | Step 16 | The real Streamlit `app.py` shown in the handbook exists | Real Visual Studio Code desktop window |
| 8 | `streamlit-house-price-app.png` | Step 17 | The actual application starts successfully in a browser | Real Streamlit server + Chromium |
| 9 | `streamlit-house-price-prediction.png` | Step 17 | Clicking **Estimate sale price** produces a real model prediction | Real Streamlit server + Chromium after interaction |
| 10 | `vscode-test-code.png` | Step 18 | The smoke-test source shown in the handbook exists | Real Visual Studio Code desktop window |
| 11 | `vscode-project-workspace.png` | Step 19 | The final project workspace and generated folders/files are present | Real Visual Studio Code desktop window |

## Deliberately not fabricated

The project does **not** manufacture Windows installer screenshots. Python and VS Code installation screens change over time and the CI environment is Linux. For Windows-only installation steps, the handbook uses exact text instructions and official links instead of pretending a Linux or generated image is a Windows installer.

## Acceptance rule

A project is not ready to merge unless:

1. all required screenshot files above exist,
2. the website loads every screenshot on desktop and mobile,
3. every screenshot has useful alt text,
4. the screenshots correspond to the exact files/results described by the handbook,
5. the full project workflow, TypeScript validation and production build also pass.
