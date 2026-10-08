# Model-to-Production — Screenshot Inventory

Every image below is generated from the real Project 12 implementation during handbook CI.

| File | Handbook checkpoint | What it proves |
|---|---|---|
| `api-swagger-docs.png` | FastAPI serving | The real running service exposes the documented health, model-info and predict endpoints |
| `api-health.png` | Service health | The live API reports a loaded model and active version |
| `api-model-info.png` | Model observability | The live service exposes version, algorithm, metrics, threshold and feature schema |
| `api-predict.png` | Real inference | A real HTTP POST request reaches the saved pipeline and returns class, probability, version and latency |
| `api-validation-error.png` | Input validation | A negative tenure value is rejected with HTTP 422 before inference |
| `v1_confusion_matrix.png` | Holdout evaluation | The verified v1 confusion counts are visualized from generated metadata |
| `version_metrics.png` | Release comparison | Actual holdout metrics for v1 and v2 are compared without claiming v2 is better |
| `drift_evidence.png` | Drift monitoring | The intentionally shifted batch exceeds configured drift thresholds for selected features |

## Evidence rules

- API screenshots come from the running FastAPI service in CI.
- Figures are generated from the actual model metadata/reference statistics created in that CI run.
- Website verification must load every image on desktop and 390px mobile.
- No screenshot is AI-generated or manually mocked.
