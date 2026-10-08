import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FolderTree, Target } from 'lucide-react';
import {
  HandbookCode,
  HandbookSection,
  HandbookTable,
  Screenshot,
} from '../components/projects/HandbookPrimitives';
import { projectPortfolioById } from '../data/projectPortfolio';

const requirementsCode = "numpy==2.5.3\npandas==3.0.6\nscikit-learn==1.9.1\njoblib==1.6.0\nfastapi==0.142.4\npydantic==2.13.5\nuvicorn==0.54.0\nhttpx==0.28.1\npytest==9.1.1\n# Resolved transitive dependencies, pinned for repeatable local/CI/container installs.\nannotated-doc==0.0.5\nannotated-types==0.8.0\nanyio==4.15.1\ncertifi==2026.7.22\nclick==8.5.0\ncloudpickle==3.1.2\ncolorama==0.4.6\nh11==0.16.0\nhttpcore==1.0.9\nidna==3.20\niniconfig==2.3.1\nnarwhals==2.26.0\nopentelemetry-api==1.45.1\npackaging==26.3\npluggy==1.6.0\npydantic_core==2.46.5\nPygments==2.21.0\npython-dateutil==2.9.0.post0\nscipy==1.18.1\nsix==1.17.0\nstarlette==1.7.0\nthreadpoolctl==3.7.0\ntyping-inspection==0.4.4\ntyping_extensions==4.16.0\ntzdata==2026.5\n";
const trainCode = "\"\"\"Offline-only training: python -m src.train --version v1.\"\"\"\nimport argparse\nfrom datetime import datetime, timezone\nimport hashlib\nfrom io import BytesIO\nfrom importlib.metadata import version as package_version\nimport json\nfrom pathlib import Path\nimport platform\nimport tempfile\n\nimport joblib\nimport numpy as np\nimport pandas as pd\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\n\nfrom src.contract import ROOT, SEED, NUMERIC, CATEGORIES, FEATURES, DATA_PATH, DATA_SHA256, DATA_URL, DATA_REVISION, validate_version\n\n\ndef read_dataset(path: Path = DATA_PATH) -> pd.DataFrame:\n    content = path.read_bytes()\n    if hashlib.sha256(content).hexdigest() != DATA_SHA256:\n        raise ValueError(\"Dataset checksum mismatch; run python -m scripts.prepare_data.\")\n    frame = pd.read_csv(BytesIO(content))\n    if frame.shape != (7043, 21) or not frame.customerID.is_unique:\n        raise ValueError(\"Expected the original 7,043-row, 21-column IBM sample.\")\n    frame[\"TotalCharges\"] = pd.to_numeric(frame.TotalCharges.replace(r\"^\\s*$\", np.nan, regex=True), errors=\"raise\")\n    if set(frame.Churn.unique()) != {\"No\", \"Yes\"}:\n        raise ValueError(\"Unexpected target values.\")\n    for field, categories in CATEGORIES.items():\n        if not set(frame[field].unique()).issubset(categories):\n            raise ValueError(f\"Unexpected category in {field}.\")\n    return frame\n\n\ndef split_data(frame):\n    return train_test_split(frame[FEATURES], frame.Churn.eq(\"Yes\").astype(int),\n                            test_size=0.2, stratify=frame.Churn, random_state=SEED)\n\n\ndef make_pipeline(c=1.0):\n    numeric = Pipeline([(\"impute\", SimpleImputer(strategy=\"median\")), (\"scale\", StandardScaler())])\n    categorical = Pipeline([(\"impute\", SimpleImputer(strategy=\"most_frequent\")),\n                            (\"encode\", OneHotEncoder(handle_unknown=\"ignore\"))])\n    prepare = ColumnTransformer([(\"numeric\", numeric, NUMERIC), (\"categorical\", categorical, list(CATEGORIES))])\n    return Pipeline([(\"prepare\", prepare), (\"classifier\", LogisticRegression(C=c, max_iter=2000, random_state=SEED))])\n\n\ndef train(model_version=\"v1\", models_dir: Path = ROOT / \"models\", c=1.0):\n    validate_version(model_version)\n    target = models_dir / model_version\n    if target.exists():\n        raise FileExistsError(f\"{model_version} already exists. Versions are immutable; choose a new version.\")\n    X_train, X_test, y_train, y_test = split_data(read_dataset())\n    pipeline = make_pipeline(c)\n    pipeline.fit(X_train, y_train)\n    probability = pipeline.predict_proba(X_test)[:, list(pipeline.classes_).index(1)]\n    prediction = (probability >= 0.5).astype(int)\n    metrics = {\n        \"accuracy\": accuracy_score(y_test, prediction),\n        \"precision\": precision_score(y_test, prediction, zero_division=0),\n        \"recall\": recall_score(y_test, prediction, zero_division=0),\n        \"f1\": f1_score(y_test, prediction, zero_division=0),\n        \"roc_auc\": roc_auc_score(y_test, probability),\n        \"confusion_matrix\": confusion_matrix(y_test, prediction, labels=[0, 1]).tolist(),\n        \"majority_accuracy\": float((y_test == y_train.mode().iloc[0]).mean()),\n    }\n    metadata = {\n        \"schema_version\": 1, \"model_version\": model_version,\n        \"trained_at\": datetime.now(timezone.utc).isoformat(),\n        \"algorithm\": \"LogisticRegression\", \"parameters\": {\"C\": c, \"max_iter\": 2000},\n        \"features\": FEATURES, \"categories\": CATEGORIES, \"threshold\": 0.5,\n        \"training_rows\": len(X_train), \"test_rows\": len(X_test), \"seed\": SEED,\n        \"dataset\": {\"id\": \"IBM Telco Customer Churn\", \"source\": DATA_URL, \"revision\": DATA_REVISION, \"sha256\": DATA_SHA256},\n        \"metrics\": metrics, \"python_version\": platform.python_version(),\n        \"packages\": {name: package_version(name) for name in [\"numpy\", \"pandas\", \"scikit-learn\", \"joblib\"]},\n    }\n    models_dir.mkdir(parents=True, exist_ok=True)\n    with tempfile.TemporaryDirectory(prefix=\".training-\", dir=models_dir) as temporary:\n        stage = Path(temporary)\n        joblib.dump(pipeline, stage / \"model.joblib\")\n        metadata[\"artifact_sha256\"] = hashlib.sha256((stage / \"model.joblib\").read_bytes()).hexdigest()\n        (stage / \"metadata.json\").write_text(json.dumps(metadata, indent=2) + \"\\n\", encoding=\"utf-8\")\n        reloaded = joblib.load(stage / \"model.joblib\")  # Only this process's trusted output.\n        np.testing.assert_allclose(reloaded.predict_proba(X_test), pipeline.predict_proba(X_test), rtol=0, atol=0)\n        # Rename an already complete directory; readers never see a half-written version.\n        stage.rename(target)\n    print(json.dumps(metadata, indent=2))\n    return metadata\n\n\nif __name__ == \"__main__\":\n    parser = argparse.ArgumentParser()\n    parser.add_argument(\"--version\", default=\"v1\")\n    parser.add_argument(\"--c\", type=float, default=1.0, help=\"Logistic Regression inverse regularization strength\")\n    arguments = parser.parse_args()\n    if not np.isfinite(arguments.c) or arguments.c <= 0:\n        parser.error(\"--c must be finite and positive\")\n    train(arguments.version, c=arguments.c)\n";
const schemasCode = "\"\"\"Strict public contract: required fields, no silent string/bool coercion.\"\"\"\nfrom typing import Literal\nfrom pydantic import BaseModel, ConfigDict, Field, model_validator\n\n\nclass Customer(BaseModel):\n    model_config = ConfigDict(strict=True, extra=\"forbid\", allow_inf_nan=False)\n    tenure: int = Field(ge=0, le=120, description=\"Months; training sample spans 0–72.\")\n    MonthlyCharges: float = Field(ge=0, le=500)\n    TotalCharges: float | None = Field(ge=0, le=50000, description=\"Required key; null means unknown and uses the training median.\")\n    Contract: Literal[\"Month-to-month\", \"One year\", \"Two year\"]\n    PaymentMethod: Literal[\"Electronic check\", \"Mailed check\", \"Bank transfer (automatic)\", \"Credit card (automatic)\"]\n    InternetService: Literal[\"DSL\", \"Fiber optic\", \"No\"]\n    OnlineSecurity: Literal[\"Yes\", \"No\", \"No internet service\"]\n    TechSupport: Literal[\"Yes\", \"No\", \"No internet service\"]\n\n    @model_validator(mode=\"after\")\n    def consistent_services(self):\n        for field in (\"OnlineSecurity\", \"TechSupport\"):\n            if (self.InternetService == \"No\") != (getattr(self, field) == \"No internet service\"):\n                raise ValueError(f\"{field} must agree with InternetService.\")\n        return self\n\n\nclass Prediction(BaseModel):\n    predicted_class: Literal[\"stay\", \"churn\"]\n    churn_probability: float = Field(ge=0, le=1)\n    model_version: str\n    inference_latency_ms: float = Field(ge=0)\n";
const apiCode = "\"\"\"python -m uvicorn api.main:app --host 127.0.0.1 --port 8000\"\"\"\nfrom contextlib import asynccontextmanager\nfrom pathlib import Path\nfrom fastapi import FastAPI\nfrom fastapi.exceptions import RequestValidationError\nfrom fastapi.responses import JSONResponse\nfrom api.schemas import Customer, Prediction\nfrom src.contract import ROOT\nfrom src.model_loader import load_active\nfrom src.predict import predict\nfrom src.logging_utils import log_event\n\n\ndef create_app(config_path: Path = ROOT / \"config\" / \"model.json\", models_dir: Path = ROOT / \"models\"):\n    @asynccontextmanager\n    async def lifespan(app):\n        # No artifact paths/versions are accepted from HTTP clients.\n        try:\n            app.state.model = load_active(config_path, models_dir)\n        except Exception as error:\n            log_event(\"model_load\", \"failed\", error_type=type(error).__name__)\n            raise\n        log_event(\"model_load\", \"ready\", app.state.model.metadata.model_version)\n        yield\n        app.state.model = None\n\n    application = FastAPI(title=\"Customer Churn Prediction Service\", version=\"1.0.0\", lifespan=lifespan)\n\n    @application.exception_handler(RequestValidationError)\n    async def invalid_request(request, error):\n        log_event(\"request_validation\", \"rejected\", application.state.model.metadata.model_version, status_code=422)\n        # Keep locations/messages useful without echoing customer values in errors.\n        details = [{\"loc\": list(item[\"loc\"]), \"msg\": item[\"msg\"], \"type\": item[\"type\"]}\n                   for item in error.errors()]\n        return JSONResponse(status_code=422, content={\"detail\": details})\n\n    @application.get(\"/health\")\n    def health():\n        return {\"status\": \"ok\", \"model_loaded\": True, \"active_version\": application.state.model.metadata.model_version}\n\n    @application.get(\"/model-info\")\n    def model_info():\n        metadata = application.state.model.metadata\n        return {\"active_version\": metadata.model_version, \"algorithm\": metadata.algorithm,\n                \"trained_at\": metadata.trained_at, \"evaluation_metrics\": metadata.metrics.model_dump(),\n                \"threshold\": metadata.threshold, \"feature_schema\": Customer.model_json_schema()}\n\n    @application.post(\"/predict\", response_model=Prediction)\n    def predict_customer(customer: Customer):\n        loaded = application.state.model\n        try:\n            result = predict(customer, loaded)\n        except Exception as error:\n            log_event(\"inference\", \"failed\", loaded.metadata.model_version, error_type=type(error).__name__, status_code=500)\n            return JSONResponse(status_code=500, content={\"detail\": \"Inference failed; consult operator logs.\"})\n        log_event(\"inference\", \"ok\", result.model_version, inference_latency_ms=result.inference_latency_ms, status_code=200)\n        return result\n\n    return application\n\n\napp = create_app()\n";
const driftCode = "\"\"\"Educational feature-shift checks, not a retraining or performance decision.\"\"\"\nimport argparse\nimport json\nfrom pathlib import Path\nimport numpy as np\nimport pandas as pd\nfrom src.contract import NUMERIC, CATEGORIES, FEATURES, ROOT, validate_version\n\n\ndef reference_statistics(training: pd.DataFrame):\n    return {\n        \"schema_version\": 1, \"training_rows\": len(training),\n        \"numeric\": {name: {\"mean\": float(training[name].mean()),\n                           \"std\": float(training[name].std(ddof=0)),\n                           \"missing_fraction\": float(training[name].isna().mean())} for name in NUMERIC},\n        \"categorical\": {name: {str(k): float(v) for k, v in training[name].value_counts(normalize=True).items()}\n                        for name in CATEGORIES},\n    }\n\n\ndef check_drift(batch: pd.DataFrame, reference: dict):\n    if len(batch) < 50:\n        raise ValueError(\"Use at least 50 rows; tiny batches make distribution comparisons unstable.\")\n    if batch.columns.tolist() != FEATURES or reference.get(\"schema_version\") != 1:\n        raise ValueError(\"Batch/reference feature contract mismatch.\")\n    results = {}\n    for name in NUMERIC:\n        values = pd.to_numeric(batch[name], errors=\"raise\")\n        nonmissing = values.dropna().to_numpy(dtype=float)\n        if len(nonmissing) == 0 or not np.isfinite(nonmissing).all():\n            raise ValueError(f\"{name} needs finite observed values.\")\n        baseline = reference[\"numeric\"][name]\n        change = abs(float(values.mean()) - baseline[\"mean\"])\n        # Constant-reference columns use an explicit equality test, not division by zero.\n        scale = baseline[\"std\"]\n        shift = change / scale if scale > 0 else (0.0 if change == 0 else None)\n        missing_change = abs(float(values.isna().mean()) - baseline[\"missing_fraction\"])\n        status = \"DRIFT DETECTED\" if shift is None or shift >= 0.5 or missing_change >= 0.1 else \"OK\"\n        results[name] = {\"status\": status, \"absolute_mean_shift_in_training_std\": shift,\n                         \"missing_fraction_change\": missing_change}\n    for name, categories in CATEGORIES.items():\n        if batch[name].isna().any() or not set(batch[name]).issubset(categories):\n            raise ValueError(f\"Unexpected or missing category in {name}.\")\n        observed = batch[name].value_counts(normalize=True).to_dict()\n        expected = reference[\"categorical\"][name]\n        total_variation = 0.5 * sum(abs(observed.get(category, 0) - expected.get(category, 0)) for category in categories)\n        results[name] = {\"status\": \"WARNING\" if total_variation >= 0.15 else \"OK\",\n                         \"total_variation_distance\": total_variation}\n    return {\"rows\": len(batch), \"features\": results,\n            \"action\": \"Investigate data quality and labeled performance; drift alone does not justify retraining.\"}\n\n\ndef main():\n    parser = argparse.ArgumentParser()\n    parser.add_argument(\"--version\", default=\"v1\")\n    parser.add_argument(\"--batch\", type=Path, required=True)\n    args = parser.parse_args()\n    validate_version(args.version)\n    reference = json.loads((ROOT / \"models\" / args.version / \"reference.json\").read_text())\n    result = check_drift(pd.read_csv(args.batch)[FEATURES], reference)\n    for name, item in result[\"features\"].items():\n        print(f\"{name}: {item['status']}\")\n    print(result[\"action\"])\n\n\nif __name__ == \"__main__\":\n    main()\n";
const switchCode = "\"\"\"Operator-only version selection; restart the API after a successful switch.\"\"\"\nimport argparse\nimport json\nimport os\nfrom pathlib import Path\nimport tempfile\nfrom src.contract import ROOT, validate_version\nfrom src.model_loader import load_version\nfrom src.logging_utils import log_event\n\n\ndef switch(version: str, config_path: Path = ROOT / \"config\" / \"model.json\", models_dir: Path = ROOT / \"models\"):\n    validate_version(version)\n    load_version(version, models_dir)  # Reject missing/invalid targets before altering config.\n    content = json.dumps({\"active_version\": version}, indent=2) + \"\\n\"\n    temporary = None\n    try:\n        with tempfile.NamedTemporaryFile(mode=\"w\", encoding=\"utf-8\", dir=config_path.parent, delete=False) as file:\n            temporary = Path(file.name)\n            file.write(content)\n            file.flush()\n            os.fsync(file.fileno())\n        os.replace(temporary, config_path)\n    finally:\n        if temporary is not None:\n            temporary.unlink(missing_ok=True)\n    log_event(\"model_configuration\", \"selected_restart_required\", version)\n\n\nif __name__ == \"__main__\":\n    parser = argparse.ArgumentParser()\n    parser.add_argument(\"--version\", required=True)\n    switch(parser.parse_args().version)\n    print(\"Configuration updated. Restart every API worker/container to load this version.\")\n";
const dockerCode = "FROM python:3.13.16-slim-bookworm@sha256:a1165e272e578941b84abc79e4ab38a0305cd12803a5c4247979ac7655f4d641\n\nENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=1\nWORKDIR /app\nCOPY requirements.txt .\nRUN python -m pip install --no-cache-dir --no-compile -r requirements.txt \\\n    && python -m pip check \\\n    && useradd --create-home --uid 10001 appuser\n\n# No raw data, training scripts, test suite, credentials, or caches in the image.\nCOPY api/ ./api/\nCOPY src/__init__.py src/contract.py src/model_loader.py src/predict.py src/logging_utils.py ./src/\nCOPY --chown=10001:10001 config/ ./config/\n# Training publishes a private temporary directory; give the runtime user access.\nCOPY --chown=10001:10001 models/ ./models/\nUSER 10001:10001\nEXPOSE 8000\nHEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \\\n    CMD python -c \"import json,urllib.request; r=json.load(urllib.request.urlopen('http://127.0.0.1:8000/health',timeout=2)); assert r['status']=='ok' and r['model_loaded'] is True\" || exit 1\nCMD [\"python\", \"-m\", \"uvicorn\", \"api.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\", \"--no-access-log\"]\n";
const apiTestsCode = "from fastapi.testclient import TestClient\nimport pytest\nfrom api.main import create_app\nfrom src.model_loader import ModelLoadError\n\n\ndef test_health_info_and_real_prediction(artifacts, configuration, customer):\n    with TestClient(create_app(configuration, artifacts)) as client:\n        assert client.get(\"/health\").json() == {\"status\": \"ok\", \"model_loaded\": True, \"active_version\": \"v1\"}\n        info = client.get(\"/model-info\").json()\n        assert info[\"algorithm\"] == \"LogisticRegression\"\n        assert \"TotalCharges\" in info[\"feature_schema\"][\"required\"]\n        response = client.post(\"/predict\", json=customer)\n        assert response.status_code == 200\n        result = response.json()\n        assert result[\"model_version\"] == \"v1\"\n        assert result[\"predicted_class\"] in {\"stay\", \"churn\"}\n        assert 0 <= result[\"churn_probability\"] <= 1\n        assert result[\"inference_latency_ms\"] >= 0\n        assert client.post(\"/predict\", json={**customer, \"TotalCharges\": None}).status_code == 200\n\n\n@pytest.mark.parametrize(\"field,value\", [\n    (\"tenure\", -1), (\"tenure\", 121), (\"tenure\", \"12\"), (\"tenure\", True),\n    (\"MonthlyCharges\", -1), (\"MonthlyCharges\", 501), (\"MonthlyCharges\", \"70\"),\n    (\"TotalCharges\", -1), (\"Contract\", \"Forever\"), (\"PaymentMethod\", \"cash\"),\n    (\"InternetService\", \"Unknown\"), (\"OnlineSecurity\", \"Maybe\"), (\"TechSupport\", \"No internet service\"),\n])\ndef test_invalid_values_rejected(artifacts, configuration, customer, field, value):\n    with TestClient(create_app(configuration, artifacts)) as client:\n        response = client.post(\"/predict\", json={**customer, field: value})\n        assert response.status_code == 422\n        assert response.json()[\"detail\"]\n\n\ndef test_missing_and_extra_fields_rejected(artifacts, configuration, customer):\n    with TestClient(create_app(configuration, artifacts)) as client:\n        del customer[\"tenure\"]\n        assert client.post(\"/predict\", json=customer).status_code == 422\n        assert client.post(\"/predict\", json={**customer, \"tenure\": 12, \"customer_id\": \"private\"}).status_code == 422\n\n\ndef test_missing_model_fails_startup(configuration, tmp_path):\n    with pytest.raises(ModelLoadError, match=\"missing\"):\n        with TestClient(create_app(configuration, tmp_path)):\n            pass\n";
const versionTestsCode = "import json\nfrom fastapi.testclient import TestClient\nimport pytest\nfrom api.main import create_app\nfrom scripts.switch_model import switch\nfrom src.model_loader import ModelLoadError\nfrom src.train import train\n\n\ndef test_switch_requires_restart_and_rollback_restores_predictions(artifacts, configuration, customer):\n    train(\"v2\", artifacts, c=0.5)\n    with TestClient(create_app(configuration, artifacts)) as old_worker:\n        first = old_worker.post(\"/predict\", json=customer).json()\n        switch(\"v2\", configuration, artifacts)\n        assert old_worker.get(\"/health\").json()[\"active_version\"] == \"v1\"\n        with TestClient(create_app(configuration, artifacts)) as new_worker:\n            assert new_worker.get(\"/model-info\").json()[\"active_version\"] == \"v2\"\n            second = new_worker.post(\"/predict\", json=customer).json()\n            assert second[\"model_version\"] == \"v2\"\n            assert second[\"churn_probability\"] != first[\"churn_probability\"]\n    switch(\"v1\", configuration, artifacts)\n    with TestClient(create_app(configuration, artifacts)) as rollback_worker:\n        third = rollback_worker.post(\"/predict\", json=customer).json()\n        assert third[\"model_version\"] == \"v1\"\n        assert third[\"churn_probability\"] == first[\"churn_probability\"]\n        assert third[\"predicted_class\"] == first[\"predicted_class\"]\n\n\ndef test_failed_switch_keeps_existing_configuration(artifacts, configuration):\n    before = configuration.read_bytes()\n    with pytest.raises(ModelLoadError):\n        switch(\"v999\", configuration, artifacts)\n    assert configuration.read_bytes() == before\n    assert not list(configuration.parent.glob(\"tmp*\"))\n";

const pipelineSnippet = "numeric = Pipeline([\n    (\"impute\", SimpleImputer(strategy=\"median\")),\n    (\"scale\", StandardScaler()),\n])\n\ncategorical = Pipeline([\n    (\"impute\", SimpleImputer(strategy=\"most_frequent\")),\n    (\"encode\", OneHotEncoder(handle_unknown=\"ignore\")),\n])\n\nprepare = ColumnTransformer([\n    (\"numeric\", numeric, NUMERIC),\n    (\"categorical\", categorical, list(CATEGORIES)),\n])\n\npipeline = Pipeline([\n    (\"prepare\", prepare),\n    (\"classifier\", LogisticRegression(\n        C=1.0,\n        max_iter=2000,\n        random_state=42,\n    )),\n])";

const predictionSnippet = "def predict(customer: Customer, loaded: LoadedModel) -> Prediction:\n    start = perf_counter()\n\n    frame = pd.DataFrame(\n        [customer.model_dump()],\n        columns=FEATURES,\n    )\n    probability = float(\n        loaded.pipeline.predict_proba(frame)[0, 1]\n    )\n    label = \"churn\" if probability >= 0.5 else \"stay\"\n\n    return Prediction(\n        predicted_class=label,\n        churn_probability=probability,\n        model_version=loaded.metadata.model_version,\n        inference_latency_ms=(perf_counter() - start) * 1000,\n    )";

const versionCommands = "python -m src.train --version v2 --c 0.5\npython -m scripts.prepare_drift --version v2\npython -m scripts.switch_model --version v2\n\n# Restart API workers, verify v2, then roll back:\npython -m scripts.switch_model --version v1";

export function ModelToProductionProjectPage() {
  const project = projectPortfolioById['model-to-production'];

  useEffect(() => {
    document.title = 'Model to Production Project — FastAPI, Docker, CI, Drift & Rollback | LearnMLAcademy';
    const description = 'Take a trained churn model from laptop to a tested FastAPI service with strict validation, Docker, CI, model versioning, drift checks and rollback.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>
          <div className="mt-5 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Project 12 · MLOps / AI Engineering</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{project.title}</h1>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              You already have a trained machine-learning model. Now turn it into a real service that another application can call safely,
              test it, package it, detect data drift, release a second version, and prove that rollback actually restores the old model.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-amber-950">
            <Target className="h-5 w-5" aria-hidden="true" />
            The practical problem: a model on your laptop is not yet a usable product
          </h2>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            Imagine a retention application needs to ask: “Is this customer likely to churn?” Your notebook can make a prediction,
            but the application cannot import your notebook, guess your preprocessing, know which model version is active, or safely
            recover if a new release is bad. We need to turn the model into a dependable service with an explicit input contract.
          </p>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            The model itself is deliberately simple: Logistic Regression on eight churn-related fields. The learning goal is everything
            around the model—artifact integrity, serving, validation, tests, Docker, CI, drift, version switching and rollback.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Input', 'Eight validated customer fields such as tenure, charges, contract and support status.'],
              ['Core service', 'A saved preprocessing + Logistic Regression pipeline loaded once at API startup.'],
              ['Operational proof', '46 tests, Docker runtime checks, drift checks and real HTTP requests in CI.'],
              ['Output', 'stay/churn class, churn probability, active model version and measured inference latency.'],
            ].map(([label, body]) => (
              <div key={label} className="rounded-xl border border-amber-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wide text-amber-800">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 overflow-x-auto">
            <div className="flex min-w-[900px] items-center gap-2 rounded-xl border border-amber-200 bg-white p-4 text-center text-xs font-bold text-slate-800">
              {['IBM data','Train pipeline','Save v1','Load once','FastAPI','Validate requests','Docker + CI','Drift','v2 rollout','Rollback v1'].map((item, index, items) => (
                <React.Fragment key={item}>
                  <div className="min-w-[78px] flex-1 rounded-lg bg-slate-100 px-2 py-3">{item}</div>
                  {index < items.length - 1 && <span className="text-lg text-amber-600">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-indigo-950">What does “production” mean in this project?</h2>
          <p className="mt-3 text-sm leading-7 text-indigo-950">
            It does <strong>not</strong> mean “put a model file on a server”. A production-style system must know exactly what model is
            loaded, reject malformed inputs before inference, preserve the training preprocessing, expose a stable API contract,
            produce observable logs, run repeatable tests, and let an operator move forward or backward between model versions.
          </p>
          <div className="mt-4 rounded-xl border border-indigo-200 bg-white p-4 text-sm leading-7 text-slate-700">
            This handbook demonstrates those engineering ideas locally and in GitHub Actions. It is still an educational service:
            public production would additionally need authentication, TLS, rate limiting, operational monitoring, access control and
            business validation.
          </div>
        </section>

        <HandbookSection id="setup" number={1} title="Create the pinned engineering environment" checkpoint={<>The isolated Python environment installs cleanly and pip check reports no broken requirements.</>}>
          <p>Work inside <code>projects/model-to-production</code>. The verified build used Python 3.13 and fully pinned dependencies.</p>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open requirements.txt</summary>
            <div className="mt-3"><HandbookCode code={requirementsCode} language="text" title="Pinned dependencies" type="runnable" /></div>
          </details>
          <HandbookCode code={'python -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\npython -m pip check'} language="powershell" title="Windows PowerShell setup" type="runnable" />
        </HandbookSection>

        <HandbookSection id="data" number={2} title="Use a checksum-verified churn dataset" checkpoint={<>You can explain the 7,043-row dataset, eight selected predictors and why customerID is excluded.</>}>
          <HandbookTable
            headers={['Item','Verified value','Why it matters']}
            rows={[
              ['Dataset','IBM Telco Customer Churn','Public educational sample downloaded from a pinned IBM repository revision'],
              ['Raw shape','7,043 rows × 21 columns','The downloader validates the full source shape'],
              ['Selected features','8','3 numeric + 5 categorical fields used by the service'],
              ['Train / holdout','5,634 / 1,409','Fixed stratified 80/20 split with seed 42'],
              ['Dataset SHA-256','16320c9c…e3055e91','Prevents silently training on different bytes'],
            ]}
          />
          <p>
            The service uses tenure, MonthlyCharges, TotalCharges, Contract, PaymentMethod, InternetService, OnlineSecurity and
            TechSupport. The customer identifier and the churn target never enter the feature pipeline.
          </p>
        </HandbookSection>

        <HandbookSection id="pipeline" number={3} title="Save preprocessing and classifier as one pipeline" checkpoint={<>You can explain why numeric imputation, scaling and categorical one-hot encoding travel with the model.</>}>
          <HandbookCode code={pipelineSnippet} language="python" title="The core training pipeline" type="runnable" />
          <p>
            If preprocessing lived separately in the API, training and serving could silently disagree. Saving one fitted Pipeline means
            the exact imputation, scaling, encoding and classifier used at training time are reused at inference time.
          </p>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open complete src/train.py</summary>
            <div className="mt-3"><HandbookCode code={trainCode} language="python" title="Complete training program" type="runnable" /></div>
          </details>
        </HandbookSection>

        <HandbookSection id="metrics" number={4} title="Measure the model before serving it" checkpoint={<>You can interpret v1 precision, recall and the confusion matrix instead of quoting only accuracy.</>}>
          <HandbookTable
            headers={['v1 holdout metric','Verified value']}
            rows={[
              ['Accuracy','0.792761'],
              ['Precision','0.628931'],
              ['Recall','0.534759'],
              ['F1','0.578035'],
              ['ROC-AUC','0.838257'],
            ]}
          />
          <Screenshot
            src="/project-handbooks/model-to-production/v1_confusion_matrix.png"
            alt="Verified confusion matrix for v1 customer churn model on the untouched holdout set"
            title="v1 holdout confusion matrix"
            caption={<>917 true stays, 118 false churn alerts, 174 missed churners and 200 correctly detected churners.</>}
          />
          <p>
            The majority-class accuracy is about 73.46%, so 79.28% is better than always predicting “stay”. But this project does not
            pretend the model is perfect: recall near 53.5% means many churners are still missed.
          </p>
        </HandbookSection>

        <HandbookSection id="artifact" number={5} title="Make model artifacts versioned and self-describing" checkpoint={<>You know what is stored in models/v1 and why metadata is checked before Joblib deserialization.</>}>
          <p>
            Training writes <code>models/v1/model.joblib</code> plus <code>metadata.json</code>. Metadata records the algorithm, feature
            contract, training timestamp, dataset fingerprint, package versions, metrics and the model-file SHA-256. Versions are
            immutable: training refuses to overwrite an existing version.
          </p>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-7 text-rose-950">
            A hash detects corruption; it is not a security signature. The loader still assumes model artifacts and metadata are
            operator-controlled. Never accept arbitrary user-uploaded Joblib files for deserialization.
          </div>
        </HandbookSection>

        <HandbookSection id="schema" number={6} title="Define a strict API input contract with Pydantic" checkpoint={<>Negative tenure, unknown categories, extra fields and inconsistent service combinations are rejected before inference.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open complete api/schemas.py</summary>
            <div className="mt-3"><HandbookCode code={schemasCode} language="python" title="Strict request and response models" type="runnable" /></div>
          </details>
          <Screenshot
            src="/project-handbooks/model-to-production/api-validation-error.png"
            alt="Real FastAPI validation response rejecting a negative tenure value with HTTP 422"
            title="Real invalid request → HTTP 422"
            caption={<>The request never reaches model inference because the public contract rejects the impossible value first.</>}
          />
        </HandbookSection>

        <HandbookSection id="fastapi" number={7} title="Expose health, model information and prediction endpoints" checkpoint={<>The running API loads one active model at startup and exposes exactly three project endpoints.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open complete api/main.py</summary>
            <div className="mt-3"><HandbookCode code={apiCode} language="python" title="FastAPI application" type="runnable" /></div>
          </details>
          <HandbookCode code={'python -m uvicorn api.main:app --host 127.0.0.1 --port 8000'} language="powershell" title="Start the API" type="runnable" />
          <Screenshot
            src="/project-handbooks/model-to-production/api-swagger-docs.png"
            alt="Real FastAPI Swagger page showing health, model-info and predict endpoints for the churn service"
            title="Real interactive API documentation"
            caption={<>FastAPI generates Swagger/OpenAPI documentation directly from the validated service contract.</>}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Screenshot
              src="/project-handbooks/model-to-production/api-health.png"
              alt="Real JSON response from the customer churn service health endpoint"
              title="GET /health"
              caption={<>The service reports that the model is loaded and identifies the active version.</>}
            />
            <Screenshot
              src="/project-handbooks/model-to-production/api-model-info.png"
              alt="Real JSON response from the customer churn service model-info endpoint"
              title="GET /model-info"
              caption={<>The caller can inspect the active version, algorithm, evaluation metrics, threshold and request schema.</>}
            />
          </div>
        </HandbookSection>

        <HandbookSection id="predict" number={8} title="Perform inference without retraining per request" checkpoint={<>You can trace JSON request → Pydantic model → DataFrame → saved pipeline → probability → response.</>}>
          <HandbookCode code={predictionSnippet} language="python" title="Inference path" type="runnable" />
          <Screenshot
            src="/project-handbooks/model-to-production/api-predict.png"
            alt="Real POST predict request and response from the running FastAPI customer churn service"
            title="Real POST /predict request and response"
            caption={<>The verified example produced a churn probability around 0.651 under v1, plus model version and measured inference latency.</>}
          />
          <p>
            The latency timer covers dataframe construction, preprocessing, probability prediction and class selection. It does not
            include network travel, request validation, response serialization or startup model loading.
          </p>
        </HandbookSection>

        <HandbookSection id="tests" number={9} title="Test failure paths, not only the happy prediction" checkpoint={<>The full suite passes 46 tests, including invalid requests, corrupt artifacts, drift contracts and rollback.</>}>
          <p>
            Production engineering is largely about proving what happens when things go wrong. Tests reject missing fields, wrong types,
            unknown categories, corrupt metadata, bad hashes, unsafe version names, failed switches and malformed drift batches.
          </p>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open API tests</summary>
            <div className="mt-3"><HandbookCode code={apiTestsCode} language="python" title="tests/test_api.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'python -m pytest -q\n46 passed, 1 documented HTTPX deprecation warning'} language="text" title="Verified test result" type="output" />
        </HandbookSection>

        <HandbookSection id="drift" number={10} title="Detect when production inputs stop looking like training data" checkpoint={<>You understand that feature drift is an investigation signal, not automatic permission to retrain.</>}>
          <p>
            The project stores training-only reference statistics. Numeric fields compare mean shift in units of training standard
            deviation; categorical fields use total-variation distance. These thresholds are explicit educational heuristics.
          </p>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open complete src/drift.py</summary>
            <div className="mt-3"><HandbookCode code={driftCode} language="python" title="Drift checker" type="runnable" /></div>
          </details>
          <Screenshot
            src="/project-handbooks/model-to-production/drift_evidence.png"
            alt="Verified Project 12 chart showing normalized drift signals for the intentionally shifted batch"
            title="Shifted batch: real drift evidence"
            caption={<>The synthetic shift pushes MonthlyCharges and Contract beyond their configured alert thresholds. Normal-batch verification passed.</>}
          />
          <p>
            Drift does not prove model quality got worse. The correct next action is to investigate data quality and collect fresh labels
            before deciding whether retraining is justified.
          </p>
        </HandbookSection>

        <HandbookSection id="versioning" number={11} title="Create v2 to practice rollout—not to pretend every new model is better" checkpoint={<>You can compare v1 and v2 and explain why a weaker v2 is still useful for release engineering.</>}>
          <HandbookTable
            headers={['Holdout metric','v1','v2']}
            rows={[
              ['Accuracy','0.792761','0.792051'],
              ['Precision','0.628931','0.627760'],
              ['Recall','0.534759','0.532086'],
              ['F1','0.578035','0.575977'],
              ['ROC-AUC','0.838257','0.837994'],
            ]}
          />
          <Screenshot
            src="/project-handbooks/model-to-production/version_metrics.png"
            alt="Verified bar chart comparing v1 and v2 holdout metrics for the churn service"
            title="v2 is different, but not better"
            caption={<>v2 changes Logistic Regression C from 1.0 to 0.5. It exists to exercise rollout and rollback correctly, not because repeated holdout testing found an improvement.</>}
          />
          <HandbookCode code={versionCommands} language="powershell" title="Train, switch and roll back" type="runnable" />
        </HandbookSection>

        <HandbookSection id="rollback" number={12} title="Prove rollback restores the exact old behavior" checkpoint={<>v1 → v2 → v1 returns the same v1 prediction after rollback.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open operator-only switching code</summary>
            <div className="mt-3"><HandbookCode code={switchCode} language="python" title="scripts/switch_model.py" type="runnable" /></div>
          </details>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open the rollback test</summary>
            <div className="mt-3"><HandbookCode code={versionTestsCode} language="python" title="tests/test_versions.py" type="runnable" /></div>
          </details>
          <HandbookCode code={'v1 probability: 0.650994284370...\nv2 probability: 0.651233111317...\nrollback v1 probability: 0.650994284370...'} language="text" title="Verified version-switch evidence" type="output" />
          <p>
            The active version is loaded once when an API worker starts. Changing <code>model.json</code> does not magically replace the
            model inside an already-running process; workers/containers must be restarted in this educational design.
          </p>
        </HandbookSection>

        <HandbookSection id="docker" number={13} title="Package only what inference needs into a non-root Docker image" checkpoint={<>The container builds, runs as UID 10001, becomes healthy and answers real HTTP requests.</>}>
          <details className="rounded-xl border border-slate-300 bg-white p-4">
            <summary className="cursor-pointer font-black text-slate-900">Open Dockerfile</summary>
            <div className="mt-3"><HandbookCode code={dockerCode} language="dockerfile" title="Dockerfile" type="runnable" /></div>
          </details>
          <HandbookCode code={'docker build -t churn-service:local .\ndocker run --rm --name churn-local --read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges -p 127.0.0.1:8000:8000 churn-service:local'} language="powershell" title="Build and run locally" type="runnable" />
          <p>
            Raw training data and training scripts are not copied into the runtime image. The verified CI container ran with a read-only
            filesystem, dropped Linux capabilities, used the application health check and served real requests as a non-root user.
          </p>
        </HandbookSection>

        <HandbookSection id="ci" number={14} title="Make GitHub Actions prove the release path" checkpoint={<>You can explain what CI verifies before anyone treats a commit as release-ready.</>}>
          <HandbookTable
            headers={['Verified CI stage','Result']}
            rows={[
              ['Pinned dependency install + pip check','PASS'],
              ['Checksum-verified dataset download','PASS'],
              ['Train/reload v1 and v2','PASS'],
              ['46 automated tests','PASS'],
              ['Normal + shifted drift checks','PASS'],
              ['v1 → v2 → v1 rollback','PASS'],
              ['Docker build','PASS'],
              ['Non-root container health + real HTTP','PASS'],
              ['TypeScript + Vite repository build','PASS'],
            ]}
          />
          <p>
            Latest Codex engineering verification: GitHub Actions run <strong>37776763301</strong>. Docker was unavailable in the local
            Windows environment, so the Linux build and runtime claims come from CI where Docker actually executed.
          </p>
        </HandbookSection>

        <HandbookSection id="tree" number={15} title="Understand the production project folder" checkpoint={<>You can point to training, serving, model versions, configuration, tests and operational scripts.</>}>
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            model-to-production/<br />
            ├── api/ <span className="text-slate-400"># FastAPI + Pydantic contract</span><br />
            ├── config/model.json <span className="text-slate-400"># active version</span><br />
            ├── data/ <span className="text-slate-400"># downloaded locally; not shipped in image</span><br />
            ├── models/v1/ + models/v2/ <span className="text-slate-400"># generated immutable versions</span><br />
            ├── scripts/ <span className="text-slate-400"># data, drift, switch, smoke checks</span><br />
            ├── src/ <span className="text-slate-400"># training, loading, inference, drift, logs</span><br />
            ├── tests/ <span className="text-slate-400"># 46 behavioral tests</span><br />
            ├── Dockerfile<br />
            ├── requirements.txt<br />
            └── README.md
          </div>
        </HandbookSection>

        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Troubleshooting checkpoints</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-fuchsia-950">
            <p><strong>API will not start:</strong> inspect the model-load error first. Missing files, checksum mismatch, incompatible package versions and contract mismatches intentionally fail startup.</p>
            <p><strong>422 from /predict:</strong> read the field location and validation message. Do not weaken strict validation merely to make malformed requests pass.</p>
            <p><strong>Switched to v2 but /health still reports v1:</strong> restart that worker/container. The model is intentionally loaded once per process lifecycle.</p>
            <p><strong>Drift checker fires:</strong> investigate the input pipeline and collect fresh labeled outcomes. Do not trigger automatic retraining from drift alone.</p>
            <p><strong>Docker is unavailable locally:</strong> do not claim local verification. Use the exact CI evidence where the image was built and run.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-blue-950">How to explain this project in an interview</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-blue-950">
            {[
              ['Why save preprocessing with the classifier?', 'Serving must apply the exact fitted transformations used in training; duplicating preprocessing in API code creates training-serving skew.'],
              ['Why load the model once?', 'Model loading is startup work. Reloading or retraining on every request wastes latency and makes behavior unpredictable.'],
              ['Why include model_version in every response?', 'It makes predictions traceable during releases, debugging and rollback.'],
              ['Why can v2 be slightly worse?', 'The point of v2 here is release engineering. We do not keep testing the holdout until a new version appears better.'],
              ['What does drift tell you?', 'That current inputs differ from the training reference under configured heuristics. It does not by itself prove accuracy has fallen.'],
              ['Why is rollback tested?', 'A rollback plan that has never restored actual old predictions is documentation, not operational evidence.'],
            ].map(([q,a]) => (
              <div key={q} className="rounded-xl border border-blue-200 bg-white p-4">
                <p className="font-black">{q}</p><p className="mt-1">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-emerald-950">Implementation mastery check</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              'Why is model.joblib alone not enough for a safe release?',
              'What belongs in model metadata?',
              'Why are versions immutable?',
              'Why should the API reject extra request fields?',
              'What exactly does /health prove?',
              'What should /model-info expose?',
              'What is included in the reported inference latency?',
              'Why do we avoid raw customer values in logs?',
              'How does artifact SHA-256 protect against accidental corruption?',
              'Why is a matching SHA not a signature against malicious artifacts?',
              'What does numeric drift of 0.5 training standard deviations mean here?',
              'What does categorical total-variation distance measure?',
              'Why must the service restart after a version switch?',
              'How does the Docker image reduce unnecessary runtime surface?',
              'What would you still add before public production?',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-white p-3 text-sm leading-6 text-emerald-950">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <FolderTree className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            Complete-project checkpoint
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              'Pinned public dataset downloaded and verified',
              'Preprocessing + model saved as one pipeline',
              'Immutable v1 artifact and metadata created',
              'Strict API schema rejects invalid inputs',
              'GET /health verified',
              'GET /model-info verified',
              'POST /predict verified',
              'Structured logs avoid raw customer data',
              '46 automated tests passed',
              'Training-reference drift statistics created',
              'Shifted data detected',
              'v2 trained as a distinct release',
              'v1 → v2 switch verified',
              'v2 → v1 rollback restored v1 prediction',
              'Docker build and non-root runtime passed',
              'Repository TypeScript and Vite build passed',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
