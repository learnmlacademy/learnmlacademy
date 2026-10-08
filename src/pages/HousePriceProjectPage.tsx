import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FolderTree,
  Laptop,
  Target,
  Wrench,
} from 'lucide-react';
import { CodeBlock } from '../components/content/CodeBlock';

const requirementsCode = "pandas==2.3.3\nnumpy==2.3.3\nscikit-learn==1.7.2\nmatplotlib==3.10.6\njoblib==1.5.2\nxgboost==3.0.5\nstreamlit==1.50.0\npyarrow==21.0.0\nscipy==1.16.2\npytest==8.4.2\n";
const downloadDataCode = "from __future__ import annotations\n\nimport io\nimport sys\nimport urllib.request\nfrom pathlib import Path\n\nimport pandas as pd\nfrom scipy.io import arff\n\nPROJECT_ROOT = Path(__file__).resolve().parent\nDATA_DIR = PROJECT_ROOT / \"data\"\nOUTPUT_PATH = DATA_DIR / \"ames_housing.parquet\"\n\nOPENML_DATASET_PAGE = \"https://www.openml.org/search?id=43926&sort=runs&type=data\"\nOPENML_PARQUET_URL = \"https://data.openml.org/datasets/0004/43926/dataset_43926.pq\"\nOPENML_ARFF_URL = \"https://openml.org/data/v1/download/22102974/ames_housing.arff\"\n\n\ndef _decode_bytes_columns(frame: pd.DataFrame) -> pd.DataFrame:\n    for column in frame.columns:\n        if frame[column].dtype == object:\n            frame[column] = frame[column].map(\n                lambda value: value.decode(\"utf-8\") if isinstance(value, bytes) else value\n            )\n    return frame\n\n\ndef download_dataset() -> Path:\n    DATA_DIR.mkdir(parents=True, exist_ok=True)\n\n    print(\"Dataset: Ames Housing\")\n    print(\"Official OpenML page:\", OPENML_DATASET_PAGE)\n    print(\"Target: house sale price\")\n    print(\"Expected rows: 2,930\")\n\n    try:\n        print(\"\\nTrying the official OpenML parquet file...\")\n        frame = pd.read_parquet(OPENML_PARQUET_URL)\n    except Exception as parquet_error:\n        print(\"Parquet download failed:\", parquet_error)\n        print(\"Trying the official OpenML ARFF file instead...\")\n        try:\n            with urllib.request.urlopen(OPENML_ARFF_URL, timeout=90) as response:\n                raw_bytes = response.read()\n            data, _meta = arff.loadarff(io.BytesIO(raw_bytes))\n            frame = _decode_bytes_columns(pd.DataFrame(data))\n        except Exception as arff_error:\n            raise RuntimeError(\n                \"Could not download the Ames Housing dataset from OpenML. \"\n                \"Check your internet connection and try again.\"\n            ) from arff_error\n\n    if len(frame) < 2900:\n        raise RuntimeError(f\"Dataset looks incomplete: only {len(frame)} rows were downloaded.\")\n\n    frame.to_parquet(OUTPUT_PATH, index=False)\n    print(f\"\\nSaved {len(frame):,} rows and {len(frame.columns)} columns to:\")\n    print(OUTPUT_PATH)\n    return OUTPUT_PATH\n\n\nif __name__ == \"__main__\":\n    try:\n        download_dataset()\n    except Exception as error:\n        print(f\"\\nERROR: {error}\", file=sys.stderr)\n        raise\n";
const trainingCode = "from __future__ import annotations\n\nimport json\nimport re\nfrom pathlib import Path\n\nimport joblib\nimport matplotlib.pyplot as plt\nimport numpy as np\nimport pandas as pd\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.linear_model import Lasso, LinearRegression, Ridge\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nfrom sklearn.model_selection import GridSearchCV, KFold, cross_validate, train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom xgboost import XGBRegressor\n\nPROJECT_ROOT = Path(__file__).resolve().parents[1]\nDATA_PATH = PROJECT_ROOT / \"data\" / \"ames_housing.parquet\"\nMODELS_DIR = PROJECT_ROOT / \"models\"\nOUTPUTS_DIR = PROJECT_ROOT / \"outputs\"\n\nRANDOM_STATE = 42\n\nRAW_NUMERIC_FEATURES = [\n    \"gr_liv_area\",\n    \"garage_cars\",\n    \"garage_area\",\n    \"total_bsmt_sf\",\n    \"full_bath\",\n    \"half_bath\",\n    \"bedroom_abv_gr\",\n    \"fireplaces\",\n    \"year_built\",\n    \"year_remod_add\",\n    \"year_sold\",\n    \"lot_area\",\n]\nRAW_CATEGORICAL_FEATURES = [\n    \"neighborhood\",\n    \"house_style\",\n    \"kitchen_qual\",\n    \"overall_qual\",\n]\nMODEL_NUMERIC_FEATURES = [\n    \"gr_liv_area\",\n    \"garage_cars\",\n    \"garage_area\",\n    \"total_bsmt_sf\",\n    \"bedroom_abv_gr\",\n    \"fireplaces\",\n    \"lot_area\",\n    \"house_age_at_sale\",\n    \"years_since_remodel\",\n    \"total_bathrooms\",\n]\nMODEL_CATEGORICAL_FEATURES = RAW_CATEGORICAL_FEATURES\nTARGET = \"sale_price\"\n\n\ndef normalize_column_name(name: str) -> str:\n    value = str(name).strip()\n    value = re.sub(r\"([a-z0-9])([A-Z])\", r\"\\1_\\2\", value)\n    value = value.replace(\"/\", \"_\")\n    value = re.sub(r\"[^A-Za-z0-9]+\", \"_\", value)\n    return value.strip(\"_\").lower()\n\n\ndef normalize_columns(frame: pd.DataFrame) -> pd.DataFrame:\n    normalized = frame.copy()\n    normalized.columns = [normalize_column_name(column) for column in normalized.columns]\n    return normalized\n\n\ndef build_model_frame(frame: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:\n    frame = normalize_columns(frame)\n\n    required = set(RAW_NUMERIC_FEATURES + RAW_CATEGORICAL_FEATURES + [TARGET])\n    missing = sorted(required.difference(frame.columns))\n    if missing:\n        raise KeyError(\n            \"The dataset does not contain the expected columns: \" + \", \".join(missing)\n        )\n\n    working = frame[list(required)].copy()\n\n    for column in RAW_NUMERIC_FEATURES + [TARGET]:\n        working[column] = pd.to_numeric(working[column], errors=\"coerce\")\n\n    for column in RAW_CATEGORICAL_FEATURES:\n        working[column] = working[column].astype(\"object\")\n\n    working[\"house_age_at_sale\"] = working[\"year_sold\"] - working[\"year_built\"]\n    working[\"years_since_remodel\"] = working[\"year_sold\"] - working[\"year_remod_add\"]\n    working[\"total_bathrooms\"] = working[\"full_bath\"] + (0.5 * working[\"half_bath\"])\n\n    features = working[MODEL_NUMERIC_FEATURES + MODEL_CATEGORICAL_FEATURES]\n    target = working[TARGET]\n    return features, target\n\n\ndef make_preprocessor(scale_numeric: bool) -> ColumnTransformer:\n    numeric_steps = [(\"imputer\", SimpleImputer(strategy=\"median\"))]\n    if scale_numeric:\n        numeric_steps.append((\"scaler\", StandardScaler()))\n\n    numeric_pipeline = Pipeline(numeric_steps)\n    categorical_pipeline = Pipeline(\n        [\n            (\"imputer\", SimpleImputer(strategy=\"most_frequent\")),\n            (\n                \"onehot\",\n                OneHotEncoder(handle_unknown=\"ignore\", sparse_output=False),\n            ),\n        ]\n    )\n\n    return ColumnTransformer(\n        [\n            (\"numeric\", numeric_pipeline, MODEL_NUMERIC_FEATURES),\n            (\"categorical\", categorical_pipeline, MODEL_CATEGORICAL_FEATURES),\n        ],\n        remainder=\"drop\",\n    )\n\n\ndef make_pipeline(estimator, scale_numeric: bool) -> Pipeline:\n    return Pipeline(\n        [\n            (\"prepare\", make_preprocessor(scale_numeric=scale_numeric)),\n            (\"model\", estimator),\n        ]\n    )\n\n\ndef candidate_models() -> dict[str, Pipeline]:\n    return {\n        \"Linear Regression\": make_pipeline(LinearRegression(), scale_numeric=True),\n        \"Ridge\": make_pipeline(Ridge(alpha=10.0), scale_numeric=True),\n        \"Lasso\": make_pipeline(\n            Lasso(alpha=250.0, max_iter=20000, random_state=RANDOM_STATE),\n            scale_numeric=True,\n        ),\n        \"Random Forest\": make_pipeline(\n            RandomForestRegressor(\n                n_estimators=350,\n                min_samples_leaf=1,\n                random_state=RANDOM_STATE,\n                n_jobs=-1,\n            ),\n            scale_numeric=False,\n        ),\n        \"XGBoost\": make_pipeline(\n            XGBRegressor(\n                objective=\"reg:squarederror\",\n                n_estimators=400,\n                learning_rate=0.05,\n                max_depth=3,\n                subsample=0.9,\n                colsample_bytree=0.9,\n                random_state=RANDOM_STATE,\n                n_jobs=2,\n            ),\n            scale_numeric=False,\n        ),\n    }\n\n\ndef compare_models(\n    models: dict[str, Pipeline],\n    X_train: pd.DataFrame,\n    y_train: pd.Series,\n) -> pd.DataFrame:\n    cv = KFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)\n    scoring = {\n        \"rmse\": \"neg_root_mean_squared_error\",\n        \"mae\": \"neg_mean_absolute_error\",\n        \"r2\": \"r2\",\n    }\n\n    rows = []\n    for name, pipeline in models.items():\n        print(f\"Cross-validating {name}...\")\n        scores = cross_validate(\n            pipeline,\n            X_train,\n            y_train,\n            cv=cv,\n            scoring=scoring,\n            n_jobs=1,\n            error_score=\"raise\",\n        )\n        rows.append(\n            {\n                \"model\": name,\n                \"cv_rmse_mean\": -float(np.mean(scores[\"test_rmse\"])),\n                \"cv_rmse_std\": float(np.std(-scores[\"test_rmse\"])),\n                \"cv_mae_mean\": -float(np.mean(scores[\"test_mae\"])),\n                \"cv_r2_mean\": float(np.mean(scores[\"test_r2\"])),\n            }\n        )\n\n    return pd.DataFrame(rows).sort_values(\"cv_rmse_mean\").reset_index(drop=True)\n\n\ndef tuning_grid(model_name: str) -> dict[str, list]:\n    if model_name == \"Ridge\":\n        return {\"model__alpha\": [0.1, 1.0, 10.0, 50.0, 100.0]}\n    if model_name == \"Lasso\":\n        return {\"model__alpha\": [50.0, 100.0, 250.0, 500.0, 1000.0]}\n    if model_name == \"Random Forest\":\n        return {\n            \"model__n_estimators\": [300, 500],\n            \"model__max_features\": [\"sqrt\", 0.8],\n            \"model__min_samples_leaf\": [1, 2],\n        }\n    if model_name == \"XGBoost\":\n        return {\n            \"model__n_estimators\": [250, 450],\n            \"model__max_depth\": [2, 3],\n            \"model__learning_rate\": [0.03, 0.06],\n        }\n    return {}\n\n\ndef build_metadata(\n    raw_frame: pd.DataFrame,\n    winning_model: str,\n    final_metrics: dict[str, float],\n) -> dict:\n    raw_frame = normalize_columns(raw_frame)\n\n    numeric_defaults = {}\n    for column in RAW_NUMERIC_FEATURES:\n        series = pd.to_numeric(raw_frame[column], errors=\"coerce\").dropna()\n        numeric_defaults[column] = {\n            \"min\": float(series.quantile(0.01)),\n            \"max\": float(series.quantile(0.99)),\n            \"median\": float(series.median()),\n        }\n\n    categorical_options = {}\n    for column in RAW_CATEGORICAL_FEATURES:\n        values = (\n            raw_frame[column]\n            .dropna()\n            .astype(str)\n            .str.strip()\n            .replace({\"\": np.nan})\n            .dropna()\n            .value_counts()\n        )\n        categorical_options[column] = values.index.tolist()\n\n    return {\n        \"dataset\": \"Ames Housing (OpenML dataset 43926)\",\n        \"dataset_page\": \"https://www.openml.org/search?id=43926&sort=runs&type=data\",\n        \"winning_model\": winning_model,\n        \"final_metrics\": final_metrics,\n        \"raw_numeric_features\": RAW_NUMERIC_FEATURES,\n        \"raw_categorical_features\": RAW_CATEGORICAL_FEATURES,\n        \"numeric_defaults\": numeric_defaults,\n        \"categorical_options\": categorical_options,\n    }\n\n\ndef main() -> None:\n    if not DATA_PATH.exists():\n        raise FileNotFoundError(\n            f\"{DATA_PATH} does not exist. Run: python download_data.py\"\n        )\n\n    MODELS_DIR.mkdir(parents=True, exist_ok=True)\n    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)\n\n    raw = pd.read_parquet(DATA_PATH)\n    X, y = build_model_frame(raw)\n\n    X_train, X_test, y_train, y_test = train_test_split(\n        X,\n        y,\n        test_size=0.20,\n        random_state=RANDOM_STATE,\n    )\n\n    models = candidate_models()\n    comparison = compare_models(models, X_train, y_train)\n    comparison.to_csv(OUTPUTS_DIR / \"model_comparison.csv\", index=False)\n\n    print(\"\\nModel comparison (training data only, 5-fold CV):\")\n    print(comparison.to_string(index=False))\n\n    winning_name = str(comparison.iloc[0][\"model\"])\n    winning_pipeline = models[winning_name]\n    grid = tuning_grid(winning_name)\n\n    if grid:\n        print(f\"\\nTuning {winning_name} using training data only...\")\n        search = GridSearchCV(\n            estimator=winning_pipeline,\n            param_grid=grid,\n            scoring=\"neg_root_mean_squared_error\",\n            cv=KFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE),\n            n_jobs=1,\n            refit=True,\n        )\n        search.fit(X_train, y_train)\n        final_pipeline = search.best_estimator_\n        best_params = search.best_params_\n        best_cv_rmse = -float(search.best_score_)\n    else:\n        print(f\"\\n{winning_name} has no tuning grid in this beginner project.\")\n        final_pipeline = winning_pipeline.fit(X_train, y_train)\n        best_params = {}\n        best_cv_rmse = float(comparison.iloc[0][\"cv_rmse_mean\"])\n\n    predictions = final_pipeline.predict(X_test)\n\n    metrics = {\n        \"mae\": float(mean_absolute_error(y_test, predictions)),\n        \"rmse\": float(mean_squared_error(y_test, predictions) ** 0.5),\n        \"r2\": float(r2_score(y_test, predictions)),\n        \"best_cv_rmse\": best_cv_rmse,\n    }\n\n    final_report = {\n        \"winning_model\": winning_name,\n        \"best_params\": best_params,\n        \"test_metrics\": metrics,\n        \"train_rows\": int(len(X_train)),\n        \"test_rows\": int(len(X_test)),\n        \"random_state\": RANDOM_STATE,\n    }\n\n    with (OUTPUTS_DIR / \"final_metrics.json\").open(\"w\", encoding=\"utf-8\") as handle:\n        json.dump(final_report, handle, indent=2)\n\n    prediction_examples = pd.DataFrame(\n        {\n            \"actual_sale_price\": y_test.to_numpy()[:25],\n            \"predicted_sale_price\": predictions[:25],\n            \"absolute_error\": np.abs(y_test.to_numpy()[:25] - predictions[:25]),\n        }\n    )\n    prediction_examples.to_csv(OUTPUTS_DIR / \"prediction_examples.csv\", index=False)\n\n    plt.figure(figsize=(7, 6))\n    plt.scatter(y_test, predictions, alpha=0.55)\n    low = float(min(y_test.min(), predictions.min()))\n    high = float(max(y_test.max(), predictions.max()))\n    plt.plot([low, high], [low, high], linestyle=\"--\")\n    plt.xlabel(\"Actual sale price ($)\")\n    plt.ylabel(\"Predicted sale price ($)\")\n    plt.title(f\"Actual vs Predicted — {winning_name}\")\n    plt.tight_layout()\n    plt.savefig(OUTPUTS_DIR / \"actual_vs_predicted.png\", dpi=160)\n    plt.close()\n\n    joblib.dump(final_pipeline, MODELS_DIR / \"house_price_pipeline.joblib\")\n\n    metadata = build_metadata(raw, winning_name, metrics)\n    with (MODELS_DIR / \"app_metadata.json\").open(\"w\", encoding=\"utf-8\") as handle:\n        json.dump(metadata, handle, indent=2)\n\n    reloaded = joblib.load(MODELS_DIR / \"house_price_pipeline.joblib\")\n    reload_prediction = reloaded.predict(X_test.iloc[[0]])[0]\n\n    print(\"\\nFinal holdout evaluation (used once after model selection/tuning):\")\n    print(\"MAE:  $\" + f\"{metrics['mae']:,.0f}\")\n    print(\"RMSE: $\" + f\"{metrics['rmse']:,.0f}\")\n    print(f\"R²:   {metrics['r2']:.3f}\")\n    print(\"\\nSaved model:\", MODELS_DIR / \"house_price_pipeline.joblib\")\n    print(\"Reload check prediction: $\" + f\"{reload_prediction:,.0f}\")\n\n\nif __name__ == \"__main__\":\n    main()\n";
const appCode = "from __future__ import annotations\n\nimport json\nfrom pathlib import Path\n\nimport joblib\nimport pandas as pd\nimport streamlit as st\n\nPROJECT_ROOT = Path(__file__).resolve().parent\nMODEL_PATH = PROJECT_ROOT / \"models\" / \"house_price_pipeline.joblib\"\nMETADATA_PATH = PROJECT_ROOT / \"models\" / \"app_metadata.json\"\n\n\n@st.cache_resource\ndef load_artifacts():\n    if not MODEL_PATH.exists() or not METADATA_PATH.exists():\n        raise FileNotFoundError(\n            \"The trained model is missing. Run python download_data.py and then python src/train_model.py.\"\n        )\n\n    model = joblib.load(MODEL_PATH)\n    metadata = json.loads(METADATA_PATH.read_text(encoding=\"utf-8\"))\n    return model, metadata\n\n\ndef build_model_row(raw_values: dict) -> pd.DataFrame:\n    row = pd.DataFrame([raw_values])\n\n    row[\"house_age_at_sale\"] = row[\"year_sold\"] - row[\"year_built\"]\n    row[\"years_since_remodel\"] = row[\"year_sold\"] - row[\"year_remod_add\"]\n    row[\"total_bathrooms\"] = row[\"full_bath\"] + (0.5 * row[\"half_bath\"])\n\n    model_columns = [\n        \"gr_liv_area\",\n        \"garage_cars\",\n        \"garage_area\",\n        \"total_bsmt_sf\",\n        \"bedroom_abv_gr\",\n        \"fireplaces\",\n        \"lot_area\",\n        \"house_age_at_sale\",\n        \"years_since_remodel\",\n        \"total_bathrooms\",\n        \"neighborhood\",\n        \"house_style\",\n        \"kitchen_qual\",\n        \"overall_qual\",\n    ]\n    return row[model_columns]\n\n\nst.set_page_config(\n    page_title=\"House Price Predictor\",\n    page_icon=\"🏠\",\n    layout=\"centered\",\n)\n\nst.title(\"🏠 What Is This House Really Worth?\")\nst.caption(\"A beginner-friendly Ames Housing machine-learning project\")\n\ntry:\n    model, metadata = load_artifacts()\nexcept FileNotFoundError as error:\n    st.error(str(error))\n    st.stop()\n\nst.info(\n    \"Educational demo only. The model uses historical home sales from Ames, Iowa, \"\n    \"and is not a professional appraisal or a current market valuation.\"\n)\n\nwith st.expander(\"About the trained model\", expanded=False):\n    metrics = metadata[\"final_metrics\"]\n    st.write(\"Selected model:\", metadata[\"winning_model\"])\n    st.write(\"Holdout MAE: $\" + f\"{metrics['mae']:,.0f}\")\n    st.write(\"Holdout RMSE: $\" + f\"{metrics['rmse']:,.0f}\")\n    st.write(f\"Holdout R²: {metrics['r2']:.3f}\")\n\ndefaults = metadata[\"numeric_defaults\"]\ncategories = metadata[\"categorical_options\"]\n\nst.subheader(\"Enter the property details\")\n\ncol1, col2 = st.columns(2)\n\nwith col1:\n    gr_liv_area = st.number_input(\n        \"Above-ground living area (sq ft)\",\n        min_value=300,\n        max_value=6000,\n        value=int(defaults[\"gr_liv_area\"][\"median\"]),\n        step=50,\n    )\n    lot_area = st.number_input(\n        \"Lot area (sq ft)\",\n        min_value=1000,\n        max_value=100000,\n        value=int(defaults[\"lot_area\"][\"median\"]),\n        step=250,\n    )\n    total_bsmt_sf = st.number_input(\n        \"Basement area (sq ft)\",\n        min_value=0,\n        max_value=5000,\n        value=int(defaults[\"total_bsmt_sf\"][\"median\"]),\n        step=50,\n    )\n    garage_area = st.number_input(\n        \"Garage area (sq ft)\",\n        min_value=0,\n        max_value=2000,\n        value=int(defaults[\"garage_area\"][\"median\"]),\n        step=25,\n    )\n    garage_cars = st.number_input(\n        \"Garage capacity (cars)\",\n        min_value=0,\n        max_value=5,\n        value=int(round(defaults[\"garage_cars\"][\"median\"])),\n        step=1,\n    )\n    bedrooms = st.number_input(\n        \"Bedrooms above ground\",\n        min_value=0,\n        max_value=8,\n        value=int(round(defaults[\"bedroom_abv_gr\"][\"median\"])),\n        step=1,\n    )\n\nwith col2:\n    full_bath = st.number_input(\n        \"Full bathrooms\",\n        min_value=0,\n        max_value=5,\n        value=int(round(defaults[\"full_bath\"][\"median\"])),\n        step=1,\n    )\n    half_bath = st.number_input(\n        \"Half bathrooms\",\n        min_value=0,\n        max_value=4,\n        value=int(round(defaults[\"half_bath\"][\"median\"])),\n        step=1,\n    )\n    fireplaces = st.number_input(\n        \"Fireplaces\",\n        min_value=0,\n        max_value=5,\n        value=int(round(defaults[\"fireplaces\"][\"median\"])),\n        step=1,\n    )\n    year_built = st.number_input(\n        \"Year built\",\n        min_value=1870,\n        max_value=2010,\n        value=int(round(defaults[\"year_built\"][\"median\"])),\n        step=1,\n    )\n    year_remodeled = st.number_input(\n        \"Year last remodeled\",\n        min_value=1870,\n        max_value=2010,\n        value=int(round(defaults[\"year_remod_add\"][\"median\"])),\n        step=1,\n    )\n    year_sold = st.number_input(\n        \"Year sold\",\n        min_value=2006,\n        max_value=2010,\n        value=int(round(defaults[\"year_sold\"][\"median\"])),\n        step=1,\n    )\n\nneighborhood = st.selectbox(\"Neighborhood\", categories[\"neighborhood\"])\nhouse_style = st.selectbox(\"House style\", categories[\"house_style\"])\nkitchen_qual = st.selectbox(\"Kitchen quality\", categories[\"kitchen_qual\"])\noverall_qual = st.selectbox(\"Overall quality\", categories[\"overall_qual\"])\n\nraw_values = {\n    \"gr_liv_area\": float(gr_liv_area),\n    \"garage_cars\": float(garage_cars),\n    \"garage_area\": float(garage_area),\n    \"total_bsmt_sf\": float(total_bsmt_sf),\n    \"full_bath\": float(full_bath),\n    \"half_bath\": float(half_bath),\n    \"bedroom_abv_gr\": float(bedrooms),\n    \"fireplaces\": float(fireplaces),\n    \"year_built\": float(year_built),\n    \"year_remod_add\": float(year_remodeled),\n    \"year_sold\": float(year_sold),\n    \"lot_area\": float(lot_area),\n    \"neighborhood\": neighborhood,\n    \"house_style\": house_style,\n    \"kitchen_qual\": kitchen_qual,\n    \"overall_qual\": overall_qual,\n}\n\nif st.button(\"Estimate sale price\", type=\"primary\", use_container_width=True):\n    if year_remodeled < year_built:\n        st.warning(\"The remodel year cannot be earlier than the build year.\")\n    elif year_sold < year_built:\n        st.warning(\"The sale year cannot be earlier than the build year.\")\n    else:\n        model_row = build_model_row(raw_values)\n        prediction = float(model.predict(model_row)[0])\n        st.metric(\"Estimated historical sale price\", \"$\" + f\"{prediction:,.0f}\")\n        st.caption(\n            \"This estimate is based on patterns in the historical Ames Housing dataset. \"\n            \"It does not adjust the old sale prices to today's dollars.\"\n        )\n";
const testCode = "from pathlib import Path\n\nfrom streamlit.testing.v1 import AppTest\n\nPROJECT_ROOT = Path(__file__).resolve().parents[1]\n\n\ndef test_streamlit_app_loads_without_exception():\n    app = AppTest.from_file(str(PROJECT_ROOT / \"app.py\"), default_timeout=30)\n    app.run()\n    assert not app.exception\n    assert any(\"What Is This House Really Worth?\" in title.value for title in app.title)\n";

const createFoldersPowerShell = String.raw`mkdir house-price-predictor
cd house-price-predictor
mkdir data
mkdir models
mkdir outputs
mkdir src
mkdir tests`;

const virtualEnvPowerShell = String.raw`python -m venv .venv
.venv\Scripts\Activate.ps1
python --version
python -m pip --version`;

const installCommands = String.raw`python -m pip install --upgrade pip
pip install -r requirements.txt`;

const runCommands = String.raw`python download_data.py
python src/train_model.py
streamlit run app.py`;

const gitIgnoreCode = ".venv/\n__pycache__/\n.pytest_cache/\ndata/*.parquet\ndata/*.csv\nmodels/*.joblib\nmodels/*.json\noutputs/*.csv\noutputs/*.json\noutputs/*.png";

const readmeCode = "# House Price Predictor\n\nA complete regression project using the Ames Housing dataset.\n\n## What it does\nThe project compares five regression model families, tunes the best one using training-only cross-validation, evaluates it once on an untouched holdout set, saves the complete preprocessing + model pipeline, and serves predictions through Streamlit.\n\n## Tools\nPython, Pandas, NumPy, scikit-learn, XGBoost, Joblib, Matplotlib, Streamlit, Pytest\n\n## Run\n```powershell\npython download_data.py\npython src/train_model.py\npytest -q\nstreamlit run app.py\n```\n\n## Verified reference result\n- Winner: XGBoost\n- Holdout MAE: $15,670\n- Holdout RMSE: $23,792\n- Holdout R²: 0.929\n\n## Important limitation\nThis is an educational model trained on historical Ames, Iowa sales. It is not a current professional property appraisal.";

const gitCommands = String.raw`git init
git add .
git status
git commit -m "Build house price predictor"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/house-price-predictor.git
git push -u origin main`;

const modelComparison = `Model              CV RMSE    CV MAE    CV R²
XGBoost             $26,575    $16,867   0.874
Random Forest       $27,585    $17,438   0.867
Ridge               $31,214    $19,154   0.825
Linear Regression   $31,251    $18,887   0.824
Lasso               $31,562    $19,432   0.820`;

function Step({
  number,
  title,
  children,
  check,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  check: string;
}) {
  return (
    <section className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black text-slate-950 sm:text-2xl">{title}</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-700">{children}</div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <p><strong>Check before continuing:</strong> {check}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExternalGuideLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold text-indigo-700 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-900"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export function HousePriceProjectPage() {
  useEffect(() => {
    const title = 'House Price Predictor Project Handbook | LearnMLAcademy';
    const description =
      'Build a house price predictor from an empty Windows folder to a tested Streamlit app using Ames Housing, Python, scikit-learn and XGBoost.';
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.learnmlacademy.com/projects/house-price';
    window.scrollTo(0, 0);
  }, []);

  const topics = [
    'Machine Learning',
    'Supervised Learning',
    'Regression',
    'Feature Engineering',
    'Missing-Value Imputation',
    'Categorical Encoding',
    'Feature Scaling',
    'Scikit-learn Pipelines',
    'Linear Regression',
    'Ridge',
    'Lasso',
    'Random Forest',
    'XGBoost',
    'Cross-Validation',
    'Hyperparameter Tuning',
    'MAE',
    'RMSE',
    'R²',
    'Model Persistence',
    'Inference',
    'Deployment',
  ];

  const tools = [
    'Python',
    'VS Code',
    'OpenML',
    'Pandas',
    'NumPy',
    'Matplotlib',
    'Scikit-learn',
    'XGBoost',
    'Joblib',
    'Streamlit',
    'Pytest',
    'Git',
    'GitHub',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All project handbooks
          </Link>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">FREE · VERIFIED BUILD</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">Beginner</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">Windows-first instructions</span>
          </div>

          <h1 className="mt-4 max-w-5xl text-3xl font-black leading-tight text-white sm:text-5xl">
            What Is This House Really Worth? Build a House Price Predictor
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
            Start with an empty folder. Download the real Ames Housing dataset, train five regression models,
            compare them correctly, tune the winner, save it, and run your own house-price prediction app in a browser.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src="/project-handbooks/house-price/streamlit-house-price-app.png"
            alt="Real Streamlit House Price Predictor app created and tested for this handbook"
            className="w-full border-b border-slate-200"
            loading="eager"
          />
          <div className="p-5 sm:p-6">
            <p className="text-sm leading-6 text-slate-700">
              <strong>This is the actual application built for this handbook.</strong> The screenshot above was captured
              automatically from the working Streamlit application after the complete training pipeline passed.
              It is not a mock-up or generated illustration.
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-indigo-950">
              <Target className="h-5 w-5" aria-hidden="true" />
              What you will build
            </h2>
            <p className="mt-3 text-sm leading-6 text-indigo-950">
              A browser app where a user enters property details such as living area, bathrooms, garage size,
              year built, neighborhood and quality. A trained model then estimates the historical sale price.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-cyan-950">
              <Laptop className="h-5 w-5" aria-hidden="true" />
              What you need before starting
            </h2>
            <p className="mt-3 text-sm leading-6 text-cyan-950">
              Basic laptop operation: opening a browser, creating folders, clicking menus and typing text.
              You do not need previous Python or machine-learning experience.
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-black text-slate-950">Topics covered</h2>
            <p className="mt-2 text-sm text-slate-600">These are the ideas you will learn while building.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {topics.map(topic => (
                <span key={topic} className="rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-xs font-bold text-violet-900">{topic}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-slate-950">
              <Wrench className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              Tools you will actually use
            </h2>
            <p className="mt-2 text-sm text-slate-600">Algorithms are not listed as tools. These are the applications and libraries used in the real build.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map(tool => (
                <span key={tool} className="rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1.5 text-xs font-bold text-cyan-900">{tool}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <h2 className="text-lg font-black text-emerald-950">Verified result from the build used for this handbook</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {[
              ['Winner', 'XGBoost'],
              ['Holdout MAE', '$15,670'],
              ['Holdout RMSE', '$23,792'],
              ['Holdout R²', '0.929'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-emerald-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{label}</p>
                <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-emerald-950">
            These are real values from the verified project run. Your exact numbers should be the same when using the
            same dataset, package versions and random seed, although small library/platform differences can occasionally
            create tiny numerical differences.
          </p>
        </section>


        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-xl font-black text-slate-950">How the complete system fits together</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Before touching the code, understand the journey. The project has two connected halves: <strong>training</strong>,
            where we learn a model from historical sales, and <strong>inference</strong>, where the saved model receives one
            new property and returns an estimated price.
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="font-black text-indigo-950">Training path</p>
              <p className="mt-2 text-sm leading-7 text-indigo-950">
                OpenML → <code>download_data.py</code> → Ames dataset → <code>train_model.py</code> → feature engineering →
                preprocessing → 5-fold model comparison → XGBoost tuning → untouched holdout evaluation →
                <code>house_price_pipeline.joblib</code> + metrics + chart.
              </p>
            </div>
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
              <p className="font-black text-cyan-950">Prediction path</p>
              <p className="mt-2 text-sm leading-7 text-cyan-950">
                User enters property details in Streamlit → <code>app.py</code> builds the same feature shape →
                saved pipeline applies the preprocessing learned during training → XGBoost predicts →
                the browser displays the estimated historical sale price.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            The important design idea is that the app does <strong>not</strong> retrain the model. Training happens once,
            the fitted pipeline is saved, and the application only loads that artifact for prediction.
          </p>
        </section>

        <Step number={1} title="Install Python on Windows" check="PowerShell prints a Python version when you type python --version.">
          <p>
            Open Chrome, Edge or another browser. Go to the official{' '}
            <ExternalGuideLink href="https://www.python.org/downloads/windows/">Python downloads for Windows page</ExternalGuideLink>.
          </p>
          <p>
            Use a current 64-bit Python 3 release supported by the packages in this project. This project is continuously
            verified with Python 3.12 in automation. If you already have Python 3.12 installed, keep it.
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Download the Windows installer/install manager from Python.org.</li>
            <li>Run the downloaded installer.</li>
            <li>If your installer offers an option to make Python available from the command line or add it to PATH, enable it.</li>
            <li>Finish installation.</li>
            <li>Open the Windows Start menu, type <strong>PowerShell</strong>, and open Windows PowerShell.</li>
            <li>Type <code>python --version</code> and press Enter.</li>
          </ol>
          <CodeBlock code={'python --version'} language="powershell" title="PowerShell" type="runnable" />
          <p>If Windows says Python is not recognized, close PowerShell, reopen it once, and try again. If it still fails, rerun the Python installer and enable command-line/PATH integration.</p>
        </Step>

        <Step number={2} title="Install VS Code and the Python extension" check="VS Code opens and the Extensions panel shows the Microsoft Python extension as installed.">
          <p>
            Go to the official <ExternalGuideLink href="https://code.visualstudio.com/Download">Visual Studio Code download page</ExternalGuideLink>,
            download the Windows installer and install it using the default options.
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open VS Code.</li>
            <li>Look at the vertical icon bar on the far left.</li>
            <li>Click the <strong>Extensions</strong> icon. It looks like four small blocks.</li>
            <li>Type <strong>Python</strong> in the search box.</li>
            <li>Choose the extension named <strong>Python</strong> published by Microsoft.</li>
            <li>Click <strong>Install</strong>.</li>
          </ol>
          <p>
            We will use VS Code as the place where you create folders, create files, paste code and open the terminal.
          </p>
        </Step>

        <Step number={3} title="Create the project folder and open it in VS Code" check="The VS Code Explorer shows the house-price-predictor folder.">
          <p>On your Desktop, create a folder named <code>house-price-predictor</code>.</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open VS Code.</li>
            <li>Click <strong>File → Open Folder...</strong>.</li>
            <li>Select the new <strong>house-price-predictor</strong> folder.</li>
            <li>If VS Code asks whether you trust the folder, choose the option appropriate for a folder you just created yourself.</li>
          </ol>
          <p>
            In VS Code, the Explorer is the left panel that shows your files. The terminal is a text area where we type
            commands and press Enter to run them.
          </p>
          <p>Open <strong>Terminal → New Terminal</strong>. A terminal panel should appear at the bottom of VS Code.</p>
        </Step>

        <Step number={4} title="Create the folders the project needs" check="Explorer shows data, models, outputs, src and tests.">
          <p>Click inside the VS Code terminal, paste the commands below and press Enter.</p>
          <CodeBlock code={createFoldersPowerShell} language="powershell" title="Create the project structure" type="runnable" />
          <p>
            If you opened the folder itself in VS Code already, you may already be inside <code>house-price-predictor</code>.
            In that case, do not create a second nested folder. Create only <code>data</code>, <code>models</code>,
            <code>outputs</code>, <code>src</code> and <code>tests</code> using Explorer's New Folder button.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100">
            house-price-predictor/<br />
            ├── data/<br />
            ├── models/<br />
            ├── outputs/<br />
            ├── src/<br />
            └── tests/
          </div>
        </Step>

        <Step number={5} title="Create and activate a virtual environment" check="The terminal prompt begins with (.venv), and python --version works.">
          <p>
            A <strong>virtual environment</strong> is a private Python environment for this project. It prevents this
            project's package versions from interfering with packages used by another project.
          </p>
          <p>Make sure the terminal is inside the project root, then run:</p>
          <CodeBlock code={virtualEnvPowerShell} language="powershell" title="Create and activate .venv" type="runnable" />
          <p>
            If PowerShell blocks <code>Activate.ps1</code>, run{' '}
            <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code> in that same terminal and activate again.
            The <code>-Scope Process</code> choice applies only to that PowerShell process.
          </p>
        </Step>

        <Step number={6} title="Create requirements.txt and install the exact packages" check="The installation finishes without a red ERROR line.">
          <p>
            In Explorer, move your mouse over the project name and click the <strong>New File</strong> icon. Name the file
            <code>requirements.txt</code>. Paste the complete content below and press <strong>Ctrl+S</strong> to save.
          </p>
          <CodeBlock code={requirementsCode} language="text" title="requirements.txt" type="config" />

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-requirements.png"
              alt="Real Visual Studio Code window showing the verified requirements.txt file for the House Price Predictor project"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">Real screenshot captured from the project in Visual Studio Code. Your desktop VS Code may use a different theme, but the filename and contents should match.</figcaption>
          </figure>
          <p>Return to the terminal and run:</p>
          <CodeBlock code={installCommands} language="powershell" title="Install the project dependencies" type="runnable" />
          <p>
            <strong>What just happened?</strong> pip downloaded the exact versions of Pandas, NumPy, scikit-learn,
            XGBoost, Streamlit and the other libraries that our verified build used.
          </p>
        </Step>

        <Step number={7} title="Create the official Ames Housing dataset downloader" check="Running the downloader reports 2,930 rows and 81 columns and creates data/ames_housing.parquet.">
          <p>
            We are using the <strong>Ames Housing</strong> dataset. It contains historical residential property sales
            from Ames, Iowa and was created for data-science education. The prediction target is the property's sale price.
          </p>
          <p>
            Open the official <ExternalGuideLink href="https://www.openml.org/search?id=43926&sort=runs&type=data">OpenML Ames Housing page</ExternalGuideLink>.
            You do not need to manually rename or move a downloaded CSV in this project. We will create a small Python
            downloader that retrieves the dataset from OpenML and stores it in the correct folder automatically.
          </p>
          <p>
            In the project root create a file named <code>download_data.py</code>. Paste all of this code, then save it:
          </p>
          <CodeBlock code={downloadDataCode} language="python" title="download_data.py" type="runnable" />

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-download-data.png"
              alt="Real Visual Studio Code window showing download_data.py in the verified House Price Predictor project"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">This is the actual downloader file used by the verified build. Use the Copy button above rather than typing the program by hand.</figcaption>
          </figure>
          <p>Run it from the project root:</p>
          <CodeBlock code={'python download_data.py'} language="powershell" title="Download the real dataset" type="runnable" />
          <CodeBlock
            code={'Dataset: Ames Housing\nOfficial OpenML page: https://www.openml.org/search?id=43926&sort=runs&type=data\nTarget: house sale price\nExpected rows: 2,930\n\nTrying the official OpenML parquet file...\n\nSaved 2,930 rows and 81 columns to:\n...\\data\\ames_housing.parquet'}
            language="text"
            title="Expected checkpoint output"
            type="output"
          />
          <p>
            A <strong>row</strong> is one home sale. A <strong>column</strong> is one recorded property characteristic
            such as living area or garage capacity. The <strong>target</strong> is the value we want the model to predict.
          </p>
        </Step>

        <Step number={8} title="Understand the features before training" check="You can explain the difference between a feature and the target Sale_Price.">
          <p>
            We deliberately use a manageable subset of the 81 dataset columns so a beginner can understand what goes into
            the prediction instead of feeding every field into a black box.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-900">
                <tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Meaning</th><th className="px-4 py-3">Type</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Gr_Liv_Area', 'Above-ground living area in square feet', 'numeric'],
                  ['Garage_Cars', 'How many cars fit in the garage', 'numeric'],
                  ['Total_Bsmt_SF', 'Total basement area', 'numeric'],
                  ['Year_Built', 'Year the home was originally built', 'numeric'],
                  ['Neighborhood', 'Neighborhood category', 'categorical'],
                  ['Kitchen_Qual', 'Kitchen quality label', 'categorical'],
                  ['Overall_Qual', 'Overall material/finish quality label', 'categorical'],
                  ['Sale_Price', 'The historical sale price we predict', 'target'],
                ].map(row => (
                  <tr key={row[0]}><td className="px-4 py-3 font-mono text-xs">{row[0]}</td><td className="px-4 py-3">{row[1]}</td><td className="px-4 py-3">{row[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Numeric data can be measured as numbers. Categorical data represents named groups. Machine-learning libraries
            ultimately need numbers, so the pipeline will convert categories to model-ready columns automatically.
          </p>
        </Step>

        <Step number={9} title="Create the complete training program" check="src/train_model.py exists, is saved, and contains the complete code below.">
          <p>
            In Explorer open the <code>src</code> folder. Create <code>train_model.py</code>. This is the program that
            builds and evaluates the machine-learning system.
          </p>
          <p>
            The program below is exactly the source used for the verified build. Do not type it manually line by line;
            use the Copy button, paste it into the file, and save.
          </p>
          <CodeBlock code={trainingCode} language="python" title="src/train_model.py — complete verified training program" type="runnable" />

          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="font-black text-violet-950">Understand the training file before you run it</p>
            <div className="mt-3 overflow-x-auto rounded-lg border border-violet-200 bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-violet-100 text-violet-950">
                  <tr><th className="px-3 py-2">Code block</th><th className="px-3 py-2">What it does</th><th className="px-3 py-2">Why it exists</th></tr>
                </thead>
                <tbody className="divide-y divide-violet-100">
                  {[
                    ['normalize_columns()', 'Makes dataset column names predictable Python-friendly names.', 'The downloaded dataset may use mixed naming styles; the rest of the code needs one stable convention.'],
                    ['build_model_frame()', 'Selects raw features, converts numeric types and creates house age, remodel age and total bathrooms.', 'This turns raw sales data into the exact inputs the models are allowed to learn from.'],
                    ['make_preprocessor()', 'Imputes missing values, scales numeric inputs for linear models and one-hot encodes categories.', 'Models cannot safely consume missing/categorical values directly, and preprocessing must remain inside the pipeline to avoid leakage.'],
                    ['candidate_models()', 'Creates Linear Regression, Ridge, Lasso, Random Forest and XGBoost pipelines.', 'We compare several model families instead of assuming the fanciest algorithm will win.'],
                    ['compare_models()', 'Runs 5-fold cross-validation and records RMSE, MAE and R².', 'A model should win from repeated training-only validation, not from looking at the final test set.'],
                    ['tuning_grid()', 'Defines a small set of hyperparameter combinations for the winning family.', 'Tuning happens only after model-family selection and only on training data.'],
                    ['train_test_split()', 'Locks away 20% as the final holdout.', 'This gives one final exam the model has not been optimized against.'],
                    ['joblib.dump()', 'Saves the whole fitted preprocessing + model pipeline.', 'The browser app must use exactly the transformations that were learned during training.'],
                  ].map(([name, what, why]) => (
                    <tr key={name}>
                      <td className="px-3 py-3 font-mono text-xs text-violet-900">{name}</td>
                      <td className="px-3 py-3 text-slate-700">{what}</td>
                      <td className="px-3 py-3 text-slate-700">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-training-code.png"
              alt="Real Visual Studio Code window showing src/train_model.py from the House Price Predictor project"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">Real project file opened in Visual Studio Code after the verified build. The complete copyable source is shown above.</figcaption>
          </figure>
        </Step>

        <Step number={10} title="See what the preprocessing pipeline is doing" check="You understand that imputation, scaling and encoding are learned using training folds rather than the final test set.">
          <p>
            <strong>Imputation</strong> means filling a missing value using a rule learned from available data. Numeric
            fields use the median. Categorical fields use the most frequent value.
          </p>
          <p>
            <strong>One-hot encoding</strong> converts a category such as a neighborhood into numeric indicator columns.
            <strong>Standard scaling</strong> puts numeric values on comparable scales for the linear models.
          </p>
          <p>
            The important safety detail is that these steps live inside a scikit-learn <strong>Pipeline</strong> and
            <strong>ColumnTransformer</strong>. During cross-validation, preprocessing is fitted inside each training fold.
            That prevents information from the validation fold leaking into the model.
          </p>
          <p>
            The project also creates three understandable features: house age at sale, years since remodel, and total
            bathrooms where a half bath counts as 0.5.
          </p>
        </Step>

        <Step number={11} title="Keep the final test set untouched" check="You know why we do not repeatedly choose the winner by looking at the final test score.">
          <p>
            The program first separates 20% of the rows into a <strong>holdout test set</strong>. Think of this as a
            sealed exam paper. We do not use it to choose the winner.
          </p>
          <p>
            The remaining 80% is used for model comparison. Five-fold cross-validation repeatedly trains on four parts and
            validates on the fifth part, rotating the validation part five times. This gives a more stable comparison than
            one lucky split.
          </p>
          <p>
            Our primary comparison metric is <strong>RMSE</strong> — Root Mean Squared Error. Lower is better. RMSE gives
            larger mistakes extra weight because errors are squared before being averaged.
          </p>
        </Step>

        <Step number={12} title="Train and compare five regression models" check="The command completes and outputs a five-row comparison table.">
          <p>Run the complete training program from the project root:</p>
          <CodeBlock code={'python src/train_model.py'} language="powershell" title="Train the project" type="runnable" />
          <p>The verified build produced this training-only cross-validation comparison:</p>
          <CodeBlock code={modelComparison} language="text" title="Real 5-fold CV result" type="output" />

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-model-comparison.png"
              alt="Real Visual Studio Code window showing the generated model_comparison.csv from the verified training run"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">The file was produced by the real five-model cross-validation run. It is evidence from the executable project, not an illustrative table.</figcaption>
          </figure>
          <p>
            XGBoost had the lowest mean CV RMSE, so it became the model to tune. Notice that we did <strong>not</strong>
            inspect the final holdout test scores to choose the winner.
          </p>
        </Step>

        <Step number={13} title="Tune XGBoost using training data only" check="Your run reports XGBoost as the selected model and finishes the tuning stage before holdout evaluation.">
          <p>
            A <strong>hyperparameter</strong> is a setting chosen before model fitting. The project tries a small,
            reproducible grid of XGBoost settings using cross-validation on the training data.
          </p>
          <p>The verified run selected:</p>
          <CodeBlock
            code={'learning_rate = 0.06\nmax_depth = 3\nn_estimators = 450\nbest cross-validation RMSE = $26,542'}
            language="text"
            title="Real tuning result"
            type="output"
          />
          <p>
            This is intentionally a small educational search, not an expensive competition-scale tuning exercise.
          </p>
        </Step>

        <Step number={14} title="Evaluate the final model once on the holdout set" check="Your final output reports MAE, RMSE and R² and saves models/house_price_pipeline.joblib.">
          <CodeBlock
            code={'Final holdout evaluation (used once after model selection/tuning):\nMAE:  $15,670\nRMSE: $23,792\nR²:   0.929\n\nSaved model: .../models/house_price_pipeline.joblib\nReload check prediction: $153,563'}
            language="text"
            title="Real verified holdout output"
            type="output"
          />

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-final-metrics.png"
              alt="Real Visual Studio Code window showing final_metrics.json from the verified House Price Predictor holdout evaluation"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">The generated metrics file records the selected model, tuned settings, final holdout metrics, row counts and random seed from the verified run.</figcaption>
          </figure>
          <p>
            <strong>MAE $15,670</strong> means the absolute prediction error is about $15,670 on average in this test set.
            <strong>RMSE $23,792</strong> penalizes larger errors more strongly. <strong>R² 0.929</strong> means the model
            explains about 92.9% of the variation in sale prices in this held-out sample.
          </p>
          <p>
            These metrics describe this historical dataset and split. They do not mean the application is a certified
            property appraisal system.
          </p>
        </Step>

        <Step number={15} title="Read the Actual vs Predicted chart" check="You can explain why points closer to the dashed diagonal represent better predictions.">
          <p>
            The training program saves <code>outputs/actual_vs_predicted.png</code>. Each dot is one held-out house. The
            horizontal position is the real sale price. The vertical position is the model's prediction.
          </p>
          <img
            src="/project-handbooks/house-price/actual_vs_predicted.png"
            alt="Actual versus predicted sale-price scatter plot from the verified XGBoost holdout evaluation"
            className="mx-auto max-h-[700px] w-full rounded-xl border border-slate-200 bg-white object-contain"
            loading="lazy"
          />
          <p>
            The dashed diagonal is perfect prediction. Most points follow that diagonal closely, while some expensive homes
            show larger errors. That is one reason we report multiple metrics instead of claiming the model is perfect.
          </p>
        </Step>

        <Step number={16} title="Create the Streamlit browser application" check="app.py exists at the project root and contains the complete code below.">
          <p>
            Streamlit turns Python code into a browser interface. Create <code>app.py</code> in the project root and paste
            the complete verified application:
          </p>
          <CodeBlock code={appCode} language="python" title="app.py — complete Streamlit application" type="runnable" />

          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
            <p className="font-black text-cyan-950">How the application code works</p>
            <div className="mt-3 space-y-3 text-sm leading-7 text-cyan-950">
              <p><strong>1. load_artifacts()</strong> loads the saved pipeline and metadata. If training has not created them, the app stops with a useful message rather than producing a fake prediction.</p>
              <p><strong>2. Streamlit input widgets</strong> collect the same raw property information used by the training project: area, garage, bathrooms, years, neighborhood and quality fields.</p>
              <p><strong>3. build_model_row()</strong> recreates only the deterministic engineered features—house age, years since remodel and total bathrooms—and orders the columns exactly as the saved pipeline expects.</p>
              <p><strong>4. model.predict()</strong> sends that one-row DataFrame through the saved preprocessing steps and then through XGBoost. The app itself does not refit imputation, encoding, scaling or the model.</p>
              <p><strong>5. st.metric()</strong> displays the prediction. The warning below it reminds the learner that the Ames dataset contains historical prices and is not a current professional appraisal.</p>
            </div>
          </div>


          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-app-code.png"
              alt="Real Visual Studio Code window showing app.py for the verified Streamlit House Price Predictor"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">Real application source opened in Visual Studio Code. The complete copyable code is directly above this screenshot.</figcaption>
          </figure>
          <p>
            The app loads the saved preprocessing-and-model pipeline. This is important: it does not try to recreate
            preprocessing rules separately at prediction time.
          </p>
        </Step>

        <Step number={17} title="Run the application and make a prediction" check="A browser page opens and Estimate sale price returns a dollar estimate without an exception.">
          <p>From the project root, run:</p>
          <CodeBlock code={'streamlit run app.py'} language="powershell" title="Start the browser application" type="runnable" />
          <p>
            Streamlit prints a local address, normally <code>http://localhost:8501</code>. Ctrl+click that address in the
            terminal, or copy it into your browser.
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Leave the default values first.</li>
            <li>Scroll down to <strong>Estimate sale price</strong>.</li>
            <li>Click the button.</li>
            <li>A price estimate should appear below it.</li>
          </ol>
          <img
            src="/project-handbooks/house-price/streamlit-house-price-prediction.png"
            alt="Real House Price Predictor Streamlit result showing an estimated historical sale price"
            className="w-full rounded-xl border border-slate-200 bg-white"
            loading="lazy"
          />
          <p>
            In our verified screenshot, the default form produced an estimated historical sale price of
            <strong> $153,431</strong>. The earlier command-line reload check used a different test row and produced
            $153,563; those are two different predictions, not a contradiction.
          </p>
        </Step>

        <Step number={18} title="Add an automated app smoke test" check="pytest -q reports one passing test.">
          <p>
            A <strong>smoke test</strong> is a quick check that the application can start without crashing. Create
            <code>tests/test_app.py</code> and paste:
          </p>
          <CodeBlock code={testCode} language="python" title="tests/test_app.py" type="runnable" />

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-test-code.png"
              alt="Real Visual Studio Code window showing tests/test_app.py for the House Price Predictor"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">The smoke test shown here is the same test executed by the verified project workflow.</figcaption>
          </figure>
          <p>Then run:</p>
          <CodeBlock code={'pytest -q'} language="powershell" title="Run the smoke test" type="runnable" />
          <CodeBlock code={'.                                                                        [100%]\n1 passed'} language="text" title="Verified test result" type="output" />
        </Step>

        <Step number={19} title="Understand the complete project folder" check="Your important files match this structure and generated folders contain the model and outputs.">
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            house-price-predictor/<br />
            ├── data/<br />
            │&nbsp;&nbsp; └── ames_housing.parquet<br />
            ├── models/<br />
            │&nbsp;&nbsp; ├── house_price_pipeline.joblib<br />
            │&nbsp;&nbsp; └── app_metadata.json<br />
            ├── outputs/<br />
            │&nbsp;&nbsp; ├── actual_vs_predicted.png<br />
            │&nbsp;&nbsp; ├── final_metrics.json<br />
            │&nbsp;&nbsp; ├── model_comparison.csv<br />
            │&nbsp;&nbsp; └── prediction_examples.csv<br />
            ├── src/<br />
            │&nbsp;&nbsp; └── train_model.py<br />
            ├── tests/<br />
            │&nbsp;&nbsp; └── test_app.py<br />
            ├── app.py<br />
            ├── download_data.py<br />
            ├── requirements.txt<br />
            ├── README.md<br />
            └── .gitignore
          </div>

          <figure className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="/project-handbooks/house-price/vscode-project-workspace.png"
              alt="Real Visual Studio Code workspace for the completed House Price Predictor project"
              className="w-full rounded-lg border border-slate-200 bg-white"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs leading-5 text-slate-600">Final verified project workspace in Visual Studio Code. Generated data, model and output folders appear only after their earlier commands have run successfully.</figcaption>
          </figure>
          <p>
            Files in <code>data</code>, <code>models</code> and <code>outputs</code> are generated from the reproducible
            source project. The Python source and dependency file are the important things to preserve in version control.
          </p>
        </Step>

        <Step number={20} title="Put the finished project on GitHub" check="Your GitHub repository shows the source files and does not contain .venv or generated model/data files.">
          <p>
            Do this only after the project works locally. Install Git for Windows from the official{' '}
            <ExternalGuideLink href="https://git-scm.com/install/windows">Git for Windows page</ExternalGuideLink>.
          </p>
          <p>
            First create <code>.gitignore</code>. This prevents the virtual environment, downloaded dataset, trained model
            and generated outputs from being added to Git accidentally.
          </p>
          <CodeBlock code={gitIgnoreCode} language="text" title=".gitignore — copy this exactly" type="config" />
          <p>
            Next create <code>README.md</code>. This is the page a recruiter or another learner sees first when opening
            your GitHub repository. Start with the complete portfolio-ready version below; after you finish the exercises,
            add what you changed and what happened.
          </p>
          <CodeBlock code={readmeCode} language="markdown" title="README.md — project explanation" type="config" />
          <p>
            Now create an empty repository on GitHub and use the commands below. Replace the example remote URL with the
            URL GitHub shows for your repository.
          </p>
          <CodeBlock code={gitCommands} language="powershell" title="Git/GitHub commands" type="runnable" />
          <p>
            Before <code>git commit</code>, always read the output of <code>git status</code>. Do not commit passwords,
            API keys or your <code>.venv</code> folder.
          </p>
        </Step>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h2 className="text-xl font-black text-amber-950">Common problems and fixes</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-amber-950">
            <p><strong>python is not recognized:</strong> reopen PowerShell after Python installation. If needed, repair/reinstall Python and enable command-line/PATH integration.</p>
            <p><strong>Activate.ps1 cannot be loaded:</strong> use <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code> in that terminal, then activate again.</p>
            <p><strong>ModuleNotFoundError:</strong> confirm <code>(.venv)</code> appears in your prompt, then rerun <code>pip install -r requirements.txt</code>.</p>
            <p><strong>ames_housing.parquet does not exist:</strong> run <code>python download_data.py</code> from the project root before training.</p>
            <p><strong>python cannot open src/train_model.py:</strong> run <code>dir</code>. You are probably in the wrong folder. Navigate back to the project root.</p>
            <p><strong>Streamlit says the model is missing:</strong> training did not finish successfully. Rerun <code>python src/train_model.py</code> and verify the saved-model line appears.</p>
            <p><strong>App opens but prediction fails after you changed features:</strong> the app inputs must match the columns the saved pipeline expects. Retrain and update the app together.</p>
          </div>
        </section>


        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Now change the project yourself</h2>
          <p className="mt-3 text-sm leading-7 text-fuchsia-950">
            Copying the finished code proves you can reproduce the build. The exercises below prove you understand it.
            Make one change at a time, rerun training, and compare the result with the verified baseline above.
          </p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-fuchsia-950">
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4">
              <p className="font-black">Exercise 1 — Remove one useful feature</p>
              <p className="mt-1">Temporarily remove <code>garage_cars</code> from the raw/model feature lists, retrain, and compare CV RMSE. The goal is not to force a worse score; it is to see that features are choices whose value can be tested.</p>
            </div>
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4">
              <p className="font-black">Exercise 2 — Change the XGBoost search</p>
              <p className="mt-1">Add <code>max_depth = 4</code> to the tuning grid. Rerun and inspect the best parameters and CV RMSE. A larger search is not automatically better; you are testing whether extra complexity helps validation performance.</p>
            </div>
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4">
              <p className="font-black">Exercise 3 — Trace one prediction end to end</p>
              <p className="mt-1">Choose one set of values in Streamlit. Identify which raw fields enter <code>build_model_row()</code>, which three engineered values are created, and where the saved pipeline receives the final row.</p>
            </div>
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4">
              <p className="font-black">Exercise 4 — Break it on purpose</p>
              <p className="mt-1">Rename <code>models/house_price_pipeline.joblib</code> temporarily and run the app. Read the error, restore the filename, and rerun. This teaches you how the application depends on the trained artifact.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-blue-950">How to explain this project in an interview</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-blue-950">
            {[
              ['Why did you use a scikit-learn Pipeline?', 'To keep imputation, encoding/scaling and the estimator together so every validation fold learns preprocessing only from its training portion, and so inference uses the exact fitted transformations.'],
              ['Why did you keep a holdout set?', 'Cross-validation was used to compare and tune models. The holdout stayed untouched so the final reported result came from data that did not influence those decisions.'],
              ['Why was RMSE the primary selection metric?', 'House-price errors are measured in dollars, and RMSE gives larger mistakes more weight. We also report MAE and R² so one metric does not tell the whole story.'],
              ['Why did XGBoost win?', 'It produced the lowest mean 5-fold CV RMSE among the five candidate model families in this verified run. It was selected by validation evidence, not by brand or popularity.'],
              ['How did you avoid training-serving mismatch?', 'The whole fitted preprocessing + model pipeline was saved with Joblib. The Streamlit app loads that artifact instead of rebuilding preprocessing separately.'],
              ['What is the biggest limitation?', 'The data describes historical sales in Ames, Iowa. The model is not adjusted to today’s dollars, other cities or changing market conditions, so it is an educational estimator rather than a real appraisal product.'],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-xl border border-blue-200 bg-white p-4">
                <p className="font-black">{question}</p>
                <p className="mt-1">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-orange-950">What would change for a real production system?</h2>
          <p className="mt-3 text-sm leading-7 text-orange-950">
            A notebook-quality score is not enough for a production appraisal product. Before real use you would need fresher
            geographically relevant sales data, stronger data-quality checks, inflation/market-time treatment, outlier analysis,
            fairness and subgroup checks, monitored prediction/error drift, versioned model releases, automated retraining rules,
            authentication and logging, and a clear human-review process for high-value decisions.
          </p>
          <p className="mt-3 text-sm leading-7 text-orange-950">
            Streamlit is perfect for learning and demos. A production service might instead expose the model through an API,
            validate requests with a schema, store model/version metadata with each prediction and place a separate web or mobile
            interface in front of that API.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-emerald-950">Implementation mastery check</h2>
          <p className="mt-3 text-sm leading-7 text-emerald-950">
            Do not call the project finished just because the app opens. You should be able to answer these without looking at the code.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              'What exactly is the prediction target?',
              'Which inputs are numeric and which are categorical?',
              'Which three features do we engineer and how?',
              'Why is preprocessing kept inside the pipeline?',
              'What would data leakage look like in this project?',
              'Why do we compare models with cross-validation?',
              'Why is the holdout used only after selection/tuning?',
              'What do MAE, RMSE and R² each tell you?',
              'Why was XGBoost selected in this run?',
              'What exactly is stored in house_price_pipeline.joblib?',
              'How does app.py transform one user form submission into a model input?',
              'Why can the same saved pipeline accept a new neighborhood category safely?',
              'How would you debug a missing model-file error?',
              'What would you change before using this outside historical Ames data?',
            ].map(item => (
              <div key={item} className="rounded-xl border border-emerald-200 bg-white p-3 text-sm leading-6 text-emerald-950">
                {item}
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
              'Official Ames Housing data downloaded',
              'Five regression models compared with cross-validation',
              'Final holdout kept untouched during selection',
              'XGBoost tuned on training data only',
              'MAE, RMSE and R² reported',
              'Complete preprocessing + model pipeline saved',
              'Saved pipeline reloaded successfully',
              'Streamlit app runs in the browser',
              'Automated app test passes',
              'Real result screenshots captured',
              'All important code is visible in this handbook',
              'Project is ready to place on GitHub',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-indigo-950">What you have learned</h2>
          <p className="mt-3 text-sm leading-7 text-indigo-950">
            You did much more than call <code>model.fit()</code>. You created a reproducible project, obtained real data,
            separated training and final evaluation correctly, handled numeric and categorical preprocessing without
            leakage, compared several regression families, tuned a winner, interpreted real metrics, saved the whole
            pipeline and put the model behind a browser interface.
          </p>
          <p className="mt-3 text-sm leading-7 text-indigo-950">
            That end-to-end workflow is the main purpose of this handbook. You should now be able to open your own folder
            and point to the exact file responsible for data acquisition, training, evaluation, persistence, testing and
            inference.
          </p>
        </section>
      </main>
    </div>
  );
}
