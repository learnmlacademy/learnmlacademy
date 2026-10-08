import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  FolderTree,
  Laptop,
  Target,
  Wrench,
} from 'lucide-react';
import { CodeBlock } from '../components/content/CodeBlock';

const requirementsCode = "pandas==2.3.3\nnumpy==2.3.3\nscikit-learn==1.7.2\nscipy==1.16.2\njoblib==1.5.2\nmatplotlib==3.10.6\nstreamlit==1.50.0\npytest==8.4.2\n";
const downloadDataCode = "\"\"\"Download the CC0 synthetic movie-ratings dataset from Datanemics.\"\"\"\n\nfrom __future__ import annotations\n\nfrom pathlib import Path\nimport hashlib\nimport urllib.request\n\nimport pandas as pd\n\nROOT = Path(__file__).resolve().parent\nDATA_DIR = ROOT / \"data\"\nDATA_PATH = DATA_DIR / \"movie-ratings.csv\"\n\nDATASET_PAGE = \"https://datanemics.com/datasets/movie-ratings/\"\nCSV_URL = \"https://datanemics.com/datasets/data/movie-ratings.csv\"\nLICENSE = \"CC0 1.0 public domain\"\nEXPECTED_ROWS = 9_000\nEXPECTED_USERS = 1_100\nEXPECTED_MOVIES = 260\nEXPECTED_COLUMNS = [\n    \"user_id\",\n    \"movie_id\",\n    \"title\",\n    \"genre\",\n    \"release_year\",\n    \"rating\",\n    \"rated_at\",\n]\n\n\ndef download_bytes() -> bytes:\n    request = urllib.request.Request(\n        CSV_URL,\n        headers={\"User-Agent\": \"LearnMLAcademy/1.0 educational-project\"},\n    )\n    with urllib.request.urlopen(request, timeout=120) as response:\n        return response.read()\n\n\ndef main() -> None:\n    DATA_DIR.mkdir(parents=True, exist_ok=True)\n\n    print(\"Dataset: Datanemics Movie ratings\")\n    print(\"Dataset page:\", DATASET_PAGE)\n    print(\"License:\", LICENSE)\n    print(\"Synthetic dataset: yes\")\n\n    raw = download_bytes()\n    sha256 = hashlib.sha256(raw).hexdigest()\n    DATA_PATH.write_bytes(raw)\n\n    frame = pd.read_csv(DATA_PATH)\n    if list(frame.columns) != EXPECTED_COLUMNS:\n        raise RuntimeError(\n            \"Unexpected columns: \"\n            f\"{list(frame.columns)}; expected {EXPECTED_COLUMNS}\"\n        )\n\n    if len(frame) != EXPECTED_ROWS:\n        raise RuntimeError(\n            f\"Unexpected row count: {len(frame):,}; expected {EXPECTED_ROWS:,}\"\n        )\n\n    users = int(frame[\"user_id\"].nunique())\n    movies = int(frame[\"movie_id\"].nunique())\n    if users != EXPECTED_USERS or movies != EXPECTED_MOVIES:\n        raise RuntimeError(\n            \"Unexpected entity counts: \"\n            f\"users={users}, movies={movies}; \"\n            f\"expected users={EXPECTED_USERS}, movies={EXPECTED_MOVIES}\"\n        )\n\n    ratings = pd.to_numeric(frame[\"rating\"], errors=\"raise\")\n    if float(ratings.min()) != 0.5 or float(ratings.max()) != 5.0:\n        raise RuntimeError(\n            f\"Unexpected rating range: {ratings.min()} to {ratings.max()}\"\n        )\n\n    print(f\"Verified rows:    {len(frame):,}\")\n    print(f\"Verified users:   {users:,}\")\n    print(f\"Verified movies:  {movies:,}\")\n    print(f\"Rating range:     {ratings.min():.1f} to {ratings.max():.1f}\")\n    print(f\"SHA256:           {sha256}\")\n    print(f\"Saved to:         {DATA_PATH}\")\n\n\nif __name__ == \"__main__\":\n    main()\n";
const buildCode = "\"\"\"Build popularity, content, collaborative and hybrid movie recommenders.\"\"\"\n\nfrom __future__ import annotations\n\nfrom pathlib import Path\nimport json\n\nimport joblib\nimport matplotlib.pyplot as plt\nimport pandas as pd\nfrom scipy.sparse import csr_matrix\nfrom sklearn.neighbors import NearestNeighbors\nfrom sklearn.preprocessing import MultiLabelBinarizer, normalize\n\nROOT = Path(__file__).resolve().parents[1]\nDATA_PATH = ROOT / \"data\" / \"movie-ratings.csv\"\nMODEL_DIR = ROOT / \"models\"\nOUTPUT_DIR = ROOT / \"outputs\"\n\nREFERENCE_MOVIE_ID = \"M1000\"\nREFERENCE_MOVIE_TITLE = \"Iron Country\"\nMAX_RATING = 5.0\n\n\ndef load_data() -> tuple[pd.DataFrame, pd.DataFrame]:\n    if not DATA_PATH.is_file():\n        raise FileNotFoundError(\"Run python download_data.py before building the recommender.\")\n\n    frame = pd.read_csv(DATA_PATH)\n    required = {\n        \"user_id\",\n        \"movie_id\",\n        \"title\",\n        \"genre\",\n        \"release_year\",\n        \"rating\",\n        \"rated_at\",\n    }\n    missing = sorted(required.difference(frame.columns))\n    if missing:\n        raise RuntimeError(f\"Dataset is missing required columns: {missing}\")\n\n    frame[\"rating\"] = pd.to_numeric(frame[\"rating\"], errors=\"raise\")\n    frame[\"release_year\"] = pd.to_numeric(frame[\"release_year\"], errors=\"raise\").astype(int)\n    frame[\"rated_at\"] = pd.to_datetime(frame[\"rated_at\"], errors=\"raise\")\n\n    metadata_consistency = (\n        frame.groupby(\"movie_id\")[[\"title\", \"genre\", \"release_year\"]]\n        .nunique(dropna=False)\n        .max()\n        .max()\n    )\n    if int(metadata_consistency) != 1:\n        raise RuntimeError(\"At least one movie_id maps to conflicting title/genre/year metadata.\")\n\n    movies = (\n        frame[[\"movie_id\", \"title\", \"genre\", \"release_year\"]]\n        .drop_duplicates(subset=[\"movie_id\"])\n        .sort_values(\"movie_id\")\n        .reset_index(drop=True)\n    )\n    ratings = frame[[\"user_id\", \"movie_id\", \"rating\", \"rated_at\"]].copy()\n    return ratings, movies\n\n\ndef latest_interactions(ratings: pd.DataFrame) -> pd.DataFrame:\n    \"\"\"Keep one latest rating per user/movie pair for the teaching matrix.\"\"\"\n    return (\n        ratings.sort_values(\"rated_at\")\n        .drop_duplicates(subset=[\"user_id\", \"movie_id\"], keep=\"last\")\n        .reset_index(drop=True)\n    )\n\n\ndef build_popularity(interactions: pd.DataFrame, movies: pd.DataFrame) -> pd.DataFrame:\n    \"\"\"Build a smoothed popularity baseline using a 25-rating prior.\"\"\"\n    summary = (\n        interactions.groupby(\"movie_id\")[\"rating\"]\n        .agg([\"mean\", \"count\"])\n        .reset_index()\n    )\n    global_mean = float(interactions[\"rating\"].mean())\n    prior = 25.0\n    summary[\"weighted_score\"] = (\n        (summary[\"count\"] / (summary[\"count\"] + prior)) * summary[\"mean\"]\n        + (prior / (summary[\"count\"] + prior)) * global_mean\n    )\n    return movies.merge(summary, on=\"movie_id\", how=\"left\").fillna(\n        {\"mean\": global_mean, \"count\": 0, \"weighted_score\": global_mean}\n    )\n\n\ndef build_content(movies: pd.DataFrame):\n    \"\"\"Encode each movie with two categorical labels: genre and release decade.\"\"\"\n    labels = [\n        [\n            f\"genre={row.genre}\",\n            f\"decade={(int(row.release_year) // 10) * 10}s\",\n        ]\n        for row in movies.itertuples(index=False)\n    ]\n    encoder = MultiLabelBinarizer()\n    matrix = encoder.fit_transform(labels).astype(float)\n    matrix = csr_matrix(normalize(matrix, norm=\"l2\"))\n\n    model = NearestNeighbors(metric=\"cosine\", algorithm=\"brute\")\n    model.fit(matrix)\n    return encoder, matrix, model\n\n\ndef build_collaborative(interactions: pd.DataFrame, movies: pd.DataFrame):\n    \"\"\"Create a sparse movie-by-user matrix from latest observed ratings.\"\"\"\n    movie_ids = movies[\"movie_id\"].tolist()\n    user_ids = sorted(interactions[\"user_id\"].unique())\n    movie_to_row = {movie_id: index for index, movie_id in enumerate(movie_ids)}\n    user_to_col = {user_id: index for index, user_id in enumerate(user_ids)}\n\n    rows = interactions[\"movie_id\"].map(movie_to_row).to_numpy()\n    cols = interactions[\"user_id\"].map(user_to_col).to_numpy()\n    values = interactions[\"rating\"].to_numpy(dtype=float)\n\n    matrix = csr_matrix(\n        (values, (rows, cols)),\n        shape=(len(movie_ids), len(user_ids)),\n    )\n    model = NearestNeighbors(metric=\"cosine\", algorithm=\"brute\")\n    model.fit(matrix)\n    return matrix, model\n\n\ndef neighbor_scores(model, matrix, row: int, n_candidates: int = 60) -> dict[int, float]:\n    count = min(n_candidates + 1, matrix.shape[0])\n    distances, indices = model.kneighbors(matrix[row], n_neighbors=count)\n\n    scores: dict[int, float] = {}\n    for index, distance in zip(indices[0], distances[0]):\n        index = int(index)\n        if index == row:\n            continue\n        scores[index] = max(0.0, min(1.0, 1.0 - float(distance)))\n    return scores\n\n\ndef recommend(\n    artifacts: dict,\n    movie_id: str,\n    method: str = \"hybrid\",\n    top_n: int = 10,\n) -> pd.DataFrame:\n    if top_n < 1:\n        raise ValueError(\"top_n must be at least 1\")\n\n    movies = artifacts[\"movies\"]\n    movie_to_row = artifacts[\"movie_to_row\"]\n    if movie_id not in movie_to_row:\n        raise ValueError(f\"Unknown movie_id: {movie_id}\")\n\n    row = movie_to_row[movie_id]\n    content = neighbor_scores(\n        artifacts[\"content_model\"],\n        artifacts[\"content_matrix\"],\n        row,\n    )\n    collaborative = neighbor_scores(\n        artifacts[\"collab_model\"],\n        artifacts[\"collab_matrix\"],\n        row,\n    )\n\n    if method == \"content\":\n        scores = content\n        reason = \"similar genre + release decade\"\n    elif method == \"collaborative\":\n        scores = collaborative\n        reason = \"similar audience rating patterns\"\n    elif method == \"hybrid\":\n        candidates = set(content) | set(collaborative)\n        scores = {\n            index: (\n                0.45 * content.get(index, 0.0)\n                + 0.55 * collaborative.get(index, 0.0)\n            )\n            for index in candidates\n        }\n        reason = \"45% content + 55% audience similarity\"\n    else:\n        raise ValueError(\"method must be content, collaborative or hybrid\")\n\n    ranked = sorted(scores.items(), key=lambda pair: (-pair[1], pair[0]))[:top_n]\n    output = []\n    for rank, (index, score) in enumerate(ranked, start=1):\n        movie = movies.iloc[index]\n        output.append(\n            {\n                \"rank\": rank,\n                \"movie_id\": str(movie[\"movie_id\"]),\n                \"title\": str(movie[\"title\"]),\n                \"genre\": str(movie[\"genre\"]),\n                \"release_year\": int(movie[\"release_year\"]),\n                \"score\": round(float(score), 4),\n                \"reason\": reason,\n            }\n        )\n    return pd.DataFrame(output)\n\n\ndef popularity_recommendations(artifacts: dict, top_n: int = 10) -> pd.DataFrame:\n    if top_n < 1:\n        raise ValueError(\"top_n must be at least 1\")\n\n    popular = (\n        artifacts[\"popularity\"]\n        .sort_values(\n            [\"weighted_score\", \"count\", \"movie_id\"],\n            ascending=[False, False, True],\n        )\n        .head(top_n)\n        .copy()\n    )\n    popular.insert(0, \"rank\", range(1, len(popular) + 1))\n    return popular[\n        [\n            \"rank\",\n            \"movie_id\",\n            \"title\",\n            \"genre\",\n            \"release_year\",\n            \"weighted_score\",\n            \"count\",\n        ]\n    ]\n\n\ndef recommend_or_fallback(\n    artifacts: dict,\n    movie_id: str | None,\n    method: str = \"hybrid\",\n    top_n: int = 10,\n) -> pd.DataFrame:\n    \"\"\"Use popularity for an unknown item instead of inventing similarity.\"\"\"\n    if movie_id is None or movie_id not in artifacts[\"movie_to_row\"]:\n        popular = popularity_recommendations(artifacts, top_n=top_n).copy()\n        popular[\"score\"] = (popular[\"weighted_score\"] / MAX_RATING).clip(0.0, 1.0)\n        popular[\"score\"] = popular[\"score\"].round(4)\n        popular[\"reason\"] = \"popularity fallback for cold start\"\n        return popular[\n            [\n                \"rank\",\n                \"movie_id\",\n                \"title\",\n                \"genre\",\n                \"release_year\",\n                \"score\",\n                \"reason\",\n            ]\n        ]\n\n    return recommend(\n        artifacts,\n        movie_id=movie_id,\n        method=method,\n        top_n=top_n,\n    )\n\n\ndef main() -> None:\n    MODEL_DIR.mkdir(exist_ok=True)\n    OUTPUT_DIR.mkdir(exist_ok=True)\n\n    ratings, movies = load_data()\n    interactions = latest_interactions(ratings)\n\n    popularity = build_popularity(interactions, movies)\n    encoder, content_matrix, content_model = build_content(movies)\n    collab_matrix, collab_model = build_collaborative(interactions, movies)\n    movie_to_row = {\n        movie_id: index\n        for index, movie_id in enumerate(movies[\"movie_id\"])\n    }\n\n    artifacts = {\n        \"movies\": movies,\n        \"popularity\": popularity,\n        \"content_encoder\": encoder,\n        \"content_matrix\": content_matrix,\n        \"content_model\": content_model,\n        \"collab_matrix\": collab_matrix,\n        \"collab_model\": collab_model,\n        \"movie_to_row\": movie_to_row,\n    }\n\n    model_path = MODEL_DIR / \"movie_recommender.joblib\"\n    joblib.dump(artifacts, model_path)\n    reloaded = joblib.load(model_path)\n\n    if REFERENCE_MOVIE_ID not in movie_to_row:\n        raise RuntimeError(f\"Reference movie {REFERENCE_MOVIE_ID} is missing.\")\n\n    reference_title = str(\n        movies.loc[movies[\"movie_id\"] == REFERENCE_MOVIE_ID, \"title\"].iloc[0]\n    )\n    if reference_title != REFERENCE_MOVIE_TITLE:\n        raise RuntimeError(\n            \"Reference movie metadata changed: \"\n            f\"{REFERENCE_MOVIE_ID} is {reference_title!r}, \"\n            f\"expected {REFERENCE_MOVIE_TITLE!r}\"\n        )\n\n    reference_frames = []\n    for method in [\"content\", \"collaborative\", \"hybrid\"]:\n        frame = recommend(\n            reloaded,\n            REFERENCE_MOVIE_ID,\n            method=method,\n            top_n=10,\n        )\n        frame.insert(0, \"method\", method)\n        reference_frames.append(frame)\n\n    pd.concat(reference_frames, ignore_index=True).to_csv(\n        OUTPUT_DIR / \"iron_country_recommendations.csv\",\n        index=False,\n    )\n    popularity_recommendations(reloaded, 10).to_csv(\n        OUTPUT_DIR / \"popular_movies.csv\",\n        index=False,\n    )\n\n    possible_cells = int(collab_matrix.shape[0] * collab_matrix.shape[1])\n    observed_cells = int(collab_matrix.nnz)\n    density = observed_cells / possible_cells\n\n    metrics = {\n        \"raw_rating_rows\": int(len(ratings)),\n        \"unique_user_movie_interactions\": int(len(interactions)),\n        \"users\": int(interactions[\"user_id\"].nunique()),\n        \"movies\": int(len(movies)),\n        \"rating_mean\": float(interactions[\"rating\"].mean()),\n        \"rating_min\": float(interactions[\"rating\"].min()),\n        \"rating_max\": float(interactions[\"rating\"].max()),\n        \"content_features\": int(content_matrix.shape[1]),\n        \"content_feature_labels\": list(encoder.classes_),\n        \"collaborative_shape\": list(collab_matrix.shape),\n        \"observed_rating_cells\": observed_cells,\n        \"possible_rating_cells\": possible_cells,\n        \"rating_density\": density,\n        \"rating_sparsity\": 1.0 - density,\n        \"reference_movie\": REFERENCE_MOVIE_TITLE,\n        \"reference_movie_id\": REFERENCE_MOVIE_ID,\n        \"hybrid_content_weight\": 0.45,\n        \"hybrid_collaborative_weight\": 0.55,\n    }\n    (OUTPUT_DIR / \"metrics.json\").write_text(\n        json.dumps(metrics, indent=2) + \"\\n\",\n        encoding=\"utf-8\",\n    )\n\n    fig, ax = plt.subplots(figsize=(7, 4))\n    interactions[\"rating\"].value_counts().sort_index().plot(kind=\"bar\", ax=ax)\n    ax.set(\n        title=\"Synthetic movie-ratings distribution\",\n        xlabel=\"Rating\",\n        ylabel=\"Count\",\n    )\n    fig.tight_layout()\n    fig.savefig(OUTPUT_DIR / \"rating_distribution.png\", dpi=160)\n    plt.close(fig)\n\n    print(\"Movie recommender built successfully.\")\n    print(json.dumps(metrics, indent=2))\n    print(f\"\\nHybrid recommendations for {REFERENCE_MOVIE_TITLE}:\")\n    print(\n        recommend(\n            reloaded,\n            REFERENCE_MOVIE_ID,\n            method=\"hybrid\",\n            top_n=10,\n        ).to_string(index=False)\n    )\n\n\nif __name__ == \"__main__\":\n    main()\n";
const appCode = "\"\"\"Run from the project root with: python -m streamlit run app.py\"\"\"\n\nfrom pathlib import Path\nimport importlib.util\n\nimport joblib\nimport streamlit as st\n\nROOT = Path(__file__).resolve().parent\nMODEL_PATH = ROOT / \"models\" / \"movie_recommender.joblib\"\nREFERENCE_MOVIE_ID = \"M1000\"\n\nspec = importlib.util.spec_from_file_location(\n    \"movie_recommender_core\",\n    ROOT / \"src\" / \"build_recommender.py\",\n)\ncore = importlib.util.module_from_spec(spec)\nspec.loader.exec_module(core)\n\nst.set_page_config(\n    page_title=\"Movie Recommendation System\",\n    page_icon=\"🎬\",\n    layout=\"wide\",\n)\nst.title(\"Build Your Own Netflix-Style Movie Recommendation System\")\nst.caption(\n    \"Educational recommender using a CC0 synthetic ratings dataset • \"\n    \"not Netflix's production algorithm\"\n)\n\nif not MODEL_PATH.is_file():\n    st.error(\"The recommender artifact is missing.\")\n    st.code(\n        \"python download_data.py\\npython src/build_recommender.py\",\n        language=\"powershell\",\n    )\n    st.stop()\n\n\n@st.cache_resource\ndef load_artifacts(modified_ns: int):\n    return joblib.load(MODEL_PATH)\n\n\nartifacts = load_artifacts(MODEL_PATH.stat().st_mtime_ns)\nmovies = artifacts[\"movies\"].sort_values(\n    [\"title\", \"release_year\", \"movie_id\"]\n).reset_index(drop=True)\n\nmethod_label = st.radio(\n    \"Recommendation method\",\n    [\"Hybrid\", \"Content-based\", \"Collaborative\", \"Popular movies\"],\n    horizontal=True,\n)\n\nif method_label == \"Popular movies\":\n    st.subheader(\"Popular starting points\")\n    popular = core.popularity_recommendations(artifacts, top_n=10).copy()\n    popular[\"weighted_score\"] = popular[\"weighted_score\"].round(3)\n    st.dataframe(popular, hide_index=True, use_container_width=True)\n    st.info(\n        \"Popularity is our cold-start fallback. It does not personalize \"\n        \"to a selected movie.\"\n    )\nelse:\n    choices = [\n        (\n            str(row.movie_id),\n            str(row.title),\n            int(row.release_year),\n        )\n        for row in movies.itertuples(index=False)\n    ]\n    default_choice = next(\n        (choice for choice in choices if choice[0] == REFERENCE_MOVIE_ID),\n        choices[0],\n    )\n    selected_choice = st.selectbox(\n        \"Choose a movie you like\",\n        choices,\n        index=choices.index(default_choice),\n        format_func=lambda choice: (\n            f\"{choice[1]} ({choice[2]}) • ID {choice[0]}\"\n        ),\n    )\n    selected_id, selected_title, _selected_year = selected_choice\n\n    method = {\n        \"Hybrid\": \"hybrid\",\n        \"Content-based\": \"content\",\n        \"Collaborative\": \"collaborative\",\n    }[method_label]\n    top_n = st.slider(\n        \"How many recommendations?\",\n        min_value=5,\n        max_value=15,\n        value=10,\n    )\n\n    if st.button(\"Recommend movies\", type=\"primary\"):\n        recommendations = core.recommend_or_fallback(\n            artifacts,\n            movie_id=selected_id,\n            method=method,\n            top_n=top_n,\n        )\n        st.subheader(f\"Because you chose: {selected_title}\")\n        st.dataframe(\n            recommendations,\n            hide_index=True,\n            use_container_width=True,\n        )\n        if method == \"content\":\n            st.caption(\n                \"Content-based: compare genre + release-decade labels \"\n                \"with cosine similarity.\"\n            )\n        elif method == \"collaborative\":\n            st.caption(\n                \"Collaborative: compare sparse movie-by-user rating patterns.\"\n            )\n        else:\n            st.caption(\n                \"Hybrid: 45% content similarity + \"\n                \"55% audience-rating similarity.\"\n            )\n\nst.divider()\nst.caption(\n    \"The ratings and movie titles in this teaching dataset are synthetic. \"\n    \"The recommendation methods are real, but this app is intentionally small. \"\n    \"Production streaming platforms use far more data, ranking stages, \"\n    \"experimentation and infrastructure.\"\n)\n";
const testCode = "from pathlib import Path\nimport importlib.util\n\nimport joblib\nimport pandas as pd\nimport pytest\n\nROOT = Path(__file__).resolve().parents[1]\nMODEL = ROOT / \"models\" / \"movie_recommender.joblib\"\n\nspec = importlib.util.spec_from_file_location(\n    \"recommender\",\n    ROOT / \"src\" / \"build_recommender.py\",\n)\ncore = importlib.util.module_from_spec(spec)\nspec.loader.exec_module(core)\n\n\n@pytest.fixture(scope=\"session\")\ndef artifacts():\n    assert MODEL.is_file(), \"Run python src/build_recommender.py first.\"\n    return joblib.load(MODEL)\n\n\ndef test_dataset_contract():\n    ratings, movies = core.load_data()\n    assert len(ratings) == 9_000\n    assert ratings[\"user_id\"].nunique() == 1_100\n    assert len(movies) == 260\n    assert set(\n        [\"movie_id\", \"title\", \"genre\", \"release_year\"]\n    ).issubset(movies.columns)\n\n\ndef test_latest_interactions_have_one_row_per_user_movie():\n    ratings, _movies = core.load_data()\n    interactions = core.latest_interactions(ratings)\n    assert len(interactions) <= len(ratings)\n    assert not interactions.duplicated([\"user_id\", \"movie_id\"]).any()\n\n\n@pytest.mark.parametrize(\"method\", [\"content\", \"collaborative\", \"hybrid\"])\ndef test_recommendations_are_unique_and_exclude_query_movie(\n    artifacts,\n    method,\n):\n    result = core.recommend(\n        artifacts,\n        core.REFERENCE_MOVIE_ID,\n        method=method,\n        top_n=10,\n    )\n    assert len(result) == 10\n    assert result[\"movie_id\"].is_unique\n    assert core.REFERENCE_MOVIE_ID not in set(result[\"movie_id\"])\n    assert result[\"score\"].between(0, 1).all()\n\n\ndef test_popularity_fallback_is_ranked(artifacts):\n    result = core.popularity_recommendations(artifacts, top_n=10)\n    assert len(result) == 10\n    assert result[\"rank\"].tolist() == list(range(1, 11))\n    assert result[\"weighted_score\"].is_monotonic_decreasing\n\n\ndef test_unknown_movie_is_rejected_by_similarity_api(artifacts):\n    with pytest.raises(ValueError, match=\"Unknown movie_id\"):\n        core.recommend(\n            artifacts,\n            \"M_DOES_NOT_EXIST\",\n            method=\"hybrid\",\n            top_n=10,\n        )\n\n\ndef test_unknown_movie_uses_normalized_cold_start_fallback(artifacts):\n    result = core.recommend_or_fallback(\n        artifacts,\n        movie_id=\"M_DOES_NOT_EXIST\",\n        method=\"hybrid\",\n        top_n=7,\n    )\n    assert len(result) == 7\n    assert result[\"rank\"].tolist() == list(range(1, 8))\n    assert set(result[\"reason\"]) == {\n        \"popularity fallback for cold start\"\n    }\n    assert result[\"score\"].between(0, 1).all()\n\n\ndef test_top_n_must_be_positive(artifacts):\n    with pytest.raises(ValueError, match=\"top_n\"):\n        core.recommend(\n            artifacts,\n            core.REFERENCE_MOVIE_ID,\n            method=\"hybrid\",\n            top_n=0,\n        )\n    with pytest.raises(ValueError, match=\"top_n\"):\n        core.popularity_recommendations(artifacts, top_n=0)\n\n\ndef test_collaborative_matrix_is_sparse(artifacts):\n    ratings, _movies = core.load_data()\n    interactions = core.latest_interactions(ratings)\n\n    matrix = artifacts[\"collab_matrix\"]\n    assert matrix.shape == (260, 1_100)\n    assert matrix.nnz == len(interactions)\n    density = matrix.nnz / (matrix.shape[0] * matrix.shape[1])\n    assert density < 0.10\n\n\ndef test_content_features_include_genre_and_decade(artifacts):\n    labels = set(artifacts[\"content_encoder\"].classes_)\n    assert any(label.startswith(\"genre=\") for label in labels)\n    assert any(label.startswith(\"decade=\") for label in labels)\n    assert artifacts[\"content_matrix\"].shape[0] == 260\n\n\ndef test_reference_output_matches_live_artifact(artifacts):\n    reference_path = ROOT / \"outputs\" / \"iron_country_recommendations.csv\"\n    assert reference_path.is_file()\n\n    saved = pd.read_csv(reference_path)\n    hybrid_saved = (\n        saved.loc[saved[\"method\"] == \"hybrid\"]\n        .reset_index(drop=True)\n    )\n    live = core.recommend(\n        artifacts,\n        core.REFERENCE_MOVIE_ID,\n        method=\"hybrid\",\n        top_n=10,\n    )\n\n    pd.testing.assert_frame_equal(\n        hybrid_saved[live.columns].reset_index(drop=True),\n        live.reset_index(drop=True),\n        check_dtype=False,\n    )\n";

const setupCommands = "python -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\npip install -r requirements.txt";
const runCommands = "python download_data.py\npython src/build_recommender.py\npytest -q\npython -m streamlit run app.py";
const gitCommands = "git init\ngit add .\ngit status\ngit commit -m \"Build movie recommendation system\"\ngit branch -M main\ngit remote add origin https://github.com/YOUR-USERNAME/movie-recommender.git\ngit push -u origin main";

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

export function MovieRecommenderProjectPage() {
  useEffect(() => {
    const title = 'Movie Recommendation System Project Handbook | LearnMLAcademy';
    const description =
      'Build a Netflix-style educational movie recommender with a CC0 synthetic ratings dataset, content similarity, collaborative filtering, hybrid ranking, tests and Streamlit.';
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.learnmlacademy.com/projects/movie-recommender';
    window.scrollTo(0, 0);
  }, []);

  const tools = [
    'Python',
    'VS Code',
    'Datanemics CC0 dataset',
    'Pandas',
    'SciPy',
    'scikit-learn',
    'NearestNeighbors',
    'Cosine similarity',
    'Joblib',
    'Matplotlib',
    'Streamlit',
    'Pytest',
    'Git',
    'GitHub',
  ];

  const topics = [
    'Recommendation systems',
    'Popularity baseline',
    'Bayesian-style shrinkage',
    'Content-based filtering',
    'Multi-hot encoding',
    'Cosine similarity',
    'Sparse matrices',
    'Collaborative filtering',
    'Item-item similarity',
    'Hybrid ranking',
    'Cold start',
    'Recommendation evaluation',
    'Model persistence',
    'Testing',
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
            <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">
              FREE PROJECT
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">
              Intermediate
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">
              Windows-first instructions
            </span>
          </div>

          <h1 className="mt-4 max-w-5xl text-3xl font-black leading-tight text-white sm:text-5xl">
            Build Your Own Netflix-Style Movie Recommendation System
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300 sm:text-lg">
            Build a complete recommendation engine from an empty folder to a working browser app.
            You will compare popularity, content-based, collaborative and hybrid recommendation,
            then test the system and understand exactly where each ranking signal comes from.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <Target className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-2 text-sm font-black text-white">What you build</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">
                A Streamlit app with four recommendation modes and an explicit cold-start fallback.
              </div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <Database className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-2 text-sm font-black text-white">Teaching dataset</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">
                9,000 synthetic ratings, 1,100 users and 260 movie IDs, released under CC0.
              </div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <Laptop className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-2 text-sm font-black text-white">End-to-end workflow</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">
                Download → inspect → build → save → test → run → debug → improve.
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-amber-950">Why this project uses synthetic movie ratings</h2>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            The recommendation algorithms in this handbook are real, but the movie titles and ratings are synthetic.
            Datanemics publishes this dataset under CC0 1.0, so a learner can download, modify and reuse it without
            depending on personal records or a restricted commercial-data licence. The trade-off is realism: these
            ratings simulate recommendation-system patterns rather than representing real streaming customers.
          </p>
          <p className="mt-3 text-sm leading-7 text-amber-950">
            “Netflix-style” describes the familiar product idea—choosing one movie and receiving ranked suggestions.
            This project does not use Netflix data and does not claim to reproduce Netflix's production algorithm.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <Wrench className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            Tools you will use
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map(tool => (
              <span
                key={tool}
                className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-800"
              >
                {tool}
              </span>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-black text-slate-900">Topics covered</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{topics.join(' · ')}</p>
        </section>

        <Step
          number={1}
          title="Understand what a recommender returns"
          check="You can explain that the output is a ranked list, not one class label or one numeric prediction."
        >
          <p>
            Classification asks “which class?” Regression asks “what number?” A recommendation system asks
            <strong> “which items should appear near the top?”</strong> The output is therefore an ordered list.
          </p>
          <p>
            We will build four versions so that every extra layer has a reason to exist: popularity gives a simple
            baseline, content compares movie attributes, collaborative filtering compares audience behaviour, and
            the hybrid combines the last two.
          </p>
        </Step>

        <Step
          number={2}
          title="Create the project folder"
          check="VS Code opens the movie-recommender folder and you can see an empty Explorer."
        >
          <CodeBlock
            code={'mkdir movie-recommender\ncd movie-recommender\ncode .'}
            language="powershell"
            title="Create and open the project"
            type="runnable"
          />
          <p>
            Create these folders in Explorer: <code>data</code>, <code>models</code>, <code>outputs</code>,
            <code>scripts</code>, <code>src</code> and <code>tests</code>.
          </p>
        </Step>

        <Step
          number={3}
          title="Create a clean Python environment"
          check="Your terminal prompt starts with (.venv)."
        >
          <CodeBlock code={setupCommands} language="powershell" title="Create and activate .venv" type="runnable" />
          <p>
            The virtual environment keeps this project's package versions separate from other Python projects.
            If PowerShell blocks activation, run
            <code> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code> in that terminal and activate again.
          </p>
        </Step>

        <Step
          number={4}
          title="Create requirements.txt"
          check="pip install -r requirements.txt finishes without an error."
        >
          <CodeBlock code={requirementsCode} language="text" title="requirements.txt" type="config" />
          <p>
            Pandas reads the ratings, SciPy stores the sparse matrix, scikit-learn performs nearest-neighbour search,
            Joblib saves the built artifacts, Matplotlib creates evidence, Streamlit serves the app, and Pytest checks behaviour.
          </p>
        </Step>

        <Step
          number={5}
          title="Download the CC0 movie-ratings dataset"
          check="The script prints 9,000 rows, 1,100 users, 260 movie IDs and a 0.5–5.0 rating range."
        >
          <p>
            Create <code>download_data.py</code> in the project root. The script downloads the CSV from Datanemics,
            verifies the exact schema and important counts, computes a SHA-256 fingerprint, and saves the file locally.
          </p>
          <CodeBlock code={downloadDataCode} language="python" title="download_data.py — complete source" type="runnable" />
          <CodeBlock code={'python download_data.py'} language="powershell" title="Download and verify" type="runnable" />
          <CodeBlock
            code={'Verified rows:    9,000\nVerified users:   1,100\nVerified movies:  260\nRating range:     0.5 to 5.0'}
            language="text"
            title="Expected dataset contract"
            type="output"
          />
          <p>
            The dataset has seven columns: user ID, movie ID, title, primary genre, release year, rating and rating timestamp.
            The timestamp lets us handle the possibility that the same user rated the same movie more than once.
          </p>
        </Step>

        <Step
          number={6}
          title="Keep one latest interaction per user and movie"
          check="You understand why one user/movie pair should occupy one cell in the collaborative matrix."
        >
          <p>
            A matrix cell cannot safely contain two different ratings. The function <code>latest_interactions()</code>
            sorts by <code>rated_at</code> and keeps the latest rating for each user/movie pair.
          </p>
          <p>
            This is a developer choice, not a fact of recommendation systems. Another system might average repeated
            ratings or model them as a time sequence. Here, “latest wins” keeps the teaching matrix easy to interpret.
          </p>
        </Step>

        <Step
          number={7}
          title="Build a popularity baseline before anything clever"
          check="You can explain why a movie with one 5-star rating should not automatically rank above a movie with many strong ratings."
        >
          <p>
            A raw average can be misleading when very few people rated an item. Our popularity score shrinks each
            movie's mean toward the global mean with a prior equivalent to 25 ratings.
          </p>
          <p>
            This baseline has two jobs: it gives us something simple to compare against, and it becomes the fallback
            when a new or unknown movie has no learned similarity information.
          </p>
        </Step>

        <Step
          number={8}
          title="Represent movie content as two labels"
          check="You can turn a movie into one genre label and one decade label."
        >
          <p>
            Each movie gets two content labels. For example, a romance released in 2012 becomes
            <code> genre=romance</code> and <code>decade=2010s</code>. A multi-hot encoder converts those labels to a
            vector of 0s and 1s.
          </p>
          <CodeBlock
            code={'Iron Country (2012) → [genre=romance, decade=2010s]\nAnother romance from 2018 → shares both labels\nA romance from 1984 → shares genre but not decade'}
            language="text"
            title="Content idea"
            type="output"
          />
          <p>
            This deliberately simple representation makes it possible to see where a content recommendation came from.
            A production system could add plot text, actors, languages, embeddings and many other features.
          </p>
        </Step>

        <Step
          number={9}
          title="Use cosine similarity to find content neighbours"
          check="You know that similarity = 1 - cosine distance in this implementation."
        >
          <p>
            Cosine similarity compares vector direction. Movies sharing content labels point in more similar directions.
            scikit-learn's <code>NearestNeighbors</code> gives cosine distance, so the project converts it to a score:
          </p>
          <CodeBlock
            code={'similarity = 1 - cosine_distance\n\ndistance 0.00 → similarity 1.00\ndistance 0.40 → similarity 0.60'}
            language="text"
            title="Distance to similarity"
            type="output"
          />
        </Step>

        <Step
          number={10}
          title="Build the sparse movie-by-user matrix"
          check="You can identify a row, column and observed cell in the collaborative matrix."
        >
          <p>
            Collaborative filtering ignores genre and year. Each row represents one movie, each column represents one
            user, and an observed cell contains that user's latest rating for that movie.
          </p>
          <p>
            There are 260 × 1,100 = 286,000 possible movie/user cells but only a small fraction contain ratings.
            A SciPy CSR sparse matrix stores the observed values without allocating ordinary dense values for every empty cell.
          </p>
        </Step>

        <Step
          number={11}
          title="Let audience behaviour create item-item neighbours"
          check="You can explain why two movies can be collaborative neighbours even if their genres differ."
        >
          <p>
            Two movies are collaborative neighbours when their rating vectors point in similar directions across users.
            This can reveal relationships that metadata does not describe. That is the central difference from content filtering.
          </p>
          <p>
            This teaching model uses raw 0.5–5 rating vectors. More advanced systems may center ratings, use implicit feedback,
            factorize the matrix or learn embeddings.
          </p>
        </Step>

        <Step
          number={12}
          title="Combine the two signals with a hybrid score"
          check="You know that 45% and 55% are explicit project choices, not universal constants."
        >
          <CodeBlock
            code={'hybrid_score = 0.45 × content_similarity + 0.55 × collaborative_similarity'}
            language="text"
            title="Hybrid rule"
            type="output"
          />
          <p>
            The hybrid gives slightly more weight to audience behaviour while preserving a content signal.
            A real system would tune or learn these weights using offline evaluation and online experiments.
          </p>
        </Step>

        <Step
          number={13}
          title="Create the complete recommender engine"
          check="src/build_recommender.py exists and contains the complete code below."
        >
          <p>
            Create <code>src/build_recommender.py</code>. It loads and validates the data, builds all four strategies,
            saves a reusable Joblib artifact, creates deterministic reference recommendations and records metrics.
          </p>
          <CodeBlock code={buildCode} language="python" title="src/build_recommender.py — complete source" type="runnable" />
        </Step>

        <Step
          number={14}
          title="Build the artifacts and inspect Iron Country"
          check="The command finishes and prints ten hybrid recommendations for Iron Country."
        >
          <CodeBlock code={'python src/build_recommender.py'} language="powershell" title="Build the recommender" type="runnable" />
          <p>
            <code>M1000</code> is the fixed reference movie ID and maps to <strong>Iron Country</strong>. The build
            writes content, collaborative and hybrid reference lists to <code>outputs/iron_country_recommendations.csv</code>.
          </p>
          <p>
            The exact order is evidence from the code and dataset—not a universal ranking of movies. If you change the
            features or weights, you should expect the order to change.
          </p>
        </Step>

        <Step
          number={15}
          title="Read the real rating-distribution chart"
          check="You can explain what the x-axis, y-axis and bar heights represent."
        >
          <p>
            The verified build creates <code>outputs/rating_distribution.png</code>. It shows how frequently each star
            rating appears after keeping the latest user/movie interaction.
          </p>
          <img
            src="/project-handbooks/movie-recommender/rating_distribution.png"
            alt="Rating distribution generated by the executable movie recommendation project"
            className="mx-auto max-h-[620px] w-full rounded-xl border border-slate-200 bg-white object-contain"
            loading="lazy"
          />
          <p>
            Interaction data is not a random sample of every movie a user could have watched. Users choose what to rate,
            so recommendation data is typically missing in a meaningful, non-random way.
          </p>
        </Step>

        <Step
          number={16}
          title="Handle cold start instead of faking a score"
          check="You can explain why an unknown movie cannot have a learned matrix row."
        >
          <p>
            <strong>Cold start</strong> means the system lacks enough history for a new user or item. An unknown movie is
            absent from both learned matrices, so <code>recommend()</code> rejects it.
          </p>
          <p>
            <code>recommend_or_fallback()</code> catches that product situation and returns the popularity ranking instead.
            Its score is normalized to 0–1 so the output schema stays consistent with similarity scores.
          </p>
        </Step>

        <Step
          number={17}
          title="Create the Streamlit browser application"
          check="app.py exists and contains the complete code below."
        >
          <CodeBlock code={appCode} language="python" title="app.py — complete source" type="runnable" />
          <p>
            The selector displays title, release year and movie ID. The ID is the true lookup key because different
            movie IDs can share the same synthetic title.
          </p>
        </Step>

        <Step
          number={18}
          title="Run the app and generate real recommendations"
          check="Iron Country is selected by default and clicking Recommend movies produces a ten-row table."
        >
          <CodeBlock code={'python -m streamlit run app.py'} language="powershell" title="Start the browser app" type="runnable" />
          <img
            src="/project-handbooks/movie-recommender/movie-recommender-form.png"
            alt="Real Streamlit form from the verified movie recommendation application"
            className="w-full rounded-xl border border-slate-200 bg-white"
            loading="lazy"
          />
          <p>
            Start with <strong>Hybrid</strong>, keep <strong>Iron Country</strong>, leave 10 recommendations and click
            <strong> Recommend movies</strong>.
          </p>
          <img
            src="/project-handbooks/movie-recommender/movie-recommender-results.png"
            alt="Real Streamlit recommendation results for Iron Country from the verified application"
            className="w-full rounded-xl border border-slate-200 bg-white"
            loading="lazy"
          />
        </Step>

        <Step
          number={19}
          title="Add tests that check behaviour, not just startup"
          check="pytest -q finishes with every test passing."
        >
          <p>
            Create <code>tests/test_recommender.py</code>. The suite checks the dataset contract, latest-interaction rule,
            three ranking methods, query exclusion, popularity order, cold-start behaviour, normalized fallback scores,
            sparse storage, content labels and deterministic saved output.
          </p>
          <CodeBlock code={testCode} language="python" title="tests/test_recommender.py — complete source" type="runnable" />
          <CodeBlock code={'pytest -q'} language="powershell" title="Run the automated checks" type="runnable" />
        </Step>

        <Step
          number={20}
          title="Understand what the Joblib artifact contains"
          check="You can name the tables, sparse matrices, nearest-neighbour models and ID lookup stored in the artifact."
        >
          <p>
            <code>models/movie_recommender.joblib</code> is not a neural-network model. It packages the built movie table,
            popularity table, content encoder/matrix/model, collaborative matrix/model and the movie-ID-to-row mapping.
          </p>
          <p>
            The app loads that trusted local artifact instead of rebuilding everything on every browser refresh.
            Never load arbitrary Joblib files from untrusted sources.
          </p>
        </Step>

        <Step
          number={21}
          title="Know what this project has not proved"
          check="You do not call the hybrid 'best' merely because its recommendations look reasonable."
        >
          <p>
            Recommendation evaluation is different from classification accuracy. The dataset records items people rated,
            not every item they might have liked. A proper offline experiment might hide known interactions and ask whether
            the system ranks them highly using Hit Rate@K, Precision@K, Recall@K or NDCG.
          </p>
          <p>
            This project focuses on making the recommendation mechanisms traceable. The exercise section asks you to add
            an evaluation protocol as the next learning step.
          </p>
        </Step>

        <Step
          number={22}
          title="Understand the complete project folder"
          check="You can point to the file responsible for data acquisition, recommendation logic, testing and browser inference."
        >
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            movie-recommender/<br />
            ├── data/ <span className="text-slate-400"># downloaded CSV, ignored by Git</span><br />
            ├── models/ <span className="text-slate-400"># generated Joblib artifact</span><br />
            ├── outputs/ <span className="text-slate-400"># metrics, reference lists, chart</span><br />
            ├── scripts/<br />
            │&nbsp;&nbsp; ├── capture_app_screenshots.py<br />
            │&nbsp;&nbsp; └── verify_handbook_page.py<br />
            ├── src/<br />
            │&nbsp;&nbsp; └── build_recommender.py<br />
            ├── tests/<br />
            │&nbsp;&nbsp; └── test_recommender.py<br />
            ├── app.py<br />
            ├── download_data.py<br />
            ├── requirements.txt<br />
            ├── README.md<br />
            └── .gitignore
          </div>
        </Step>

        <Step
          number={23}
          title="Put the finished source on GitHub"
          check="git status does not show .venv, the downloaded CSV or the generated Joblib file."
        >
          <CodeBlock
            code={'.venv/\n__pycache__/\n.pytest_cache/\ndata/movie-ratings.csv\nmodels/*.joblib\noutputs/screenshots/\n*.log'}
            language="text"
            title=".gitignore"
            type="config"
          />
          <CodeBlock code={gitCommands} language="powershell" title="Git and GitHub commands" type="runnable" />
          <p>
            Read <code>git status</code> before committing. Generated data and model artifacts can be rebuilt; the source
            files and dependency lock are what another learner needs.
          </p>
        </Step>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-amber-950">Common problems and exact fixes</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-amber-950">
            <p><strong>movie-ratings.csv is missing:</strong> run <code>python download_data.py</code> from the project root.</p>
            <p><strong>Dataset count/schema verification fails:</strong> do not bypass the check. Delete the downloaded file and rerun; the source may have changed.</p>
            <p><strong>ModuleNotFoundError:</strong> activate <code>.venv</code>, then rerun <code>pip install -r requirements.txt</code>.</p>
            <p><strong>Streamlit says the artifact is missing:</strong> run <code>python src/build_recommender.py</code> before starting the app.</p>
            <p><strong>The selected movie appears in its own recommendations:</strong> verify the query-row exclusion inside <code>neighbor_scores()</code>.</p>
            <p><strong>Two options have the same title:</strong> that is why the app shows release year and movie ID; never use title alone as the key.</p>
            <p><strong>Collaborative results seem surprising:</strong> raw rating-vector cosine is intentionally simple. Try mean-centering or matrix factorization as an extension.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Now change the system yourself</h2>
          <div className="mt-4 grid gap-4 text-sm leading-7 text-fuchsia-950 sm:grid-cols-2">
            {[
              ['Exercise 1 — Change hybrid weights', 'Try 70% content and 30% collaborative. Rebuild and explain which recommendations move and which evidence caused the change.'],
              ['Exercise 2 — Remove the decade feature', 'Use genre only, rebuild, and compare Iron Country content neighbours. This isolates the contribution of release decade.'],
              ['Exercise 3 — Break cold start on purpose', 'Call recommend() with an unknown movie ID, then call recommend_or_fallback(). Explain why the second behaviour is safer in an application.'],
              ['Exercise 4 — Add held-out evaluation', 'Hide one known interaction for eligible users and calculate a ranking metric such as Hit Rate@10 or Recall@10 without leaking that held-out interaction into the evidence matrix.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-fuchsia-200 bg-white p-4">
                <p className="font-black">{title}</p>
                <p className="mt-1">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-blue-950">How to explain this project in an interview</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-blue-950">
            {[
              ['Why start with popularity?', 'It creates a transparent baseline and gives the product a fallback when similarity evidence is unavailable. Shrinkage prevents tiny-rating-count items from dominating the leaderboard.'],
              ['What is content-based filtering here?', 'Each movie has a genre label and a release-decade label. Multi-hot vectors plus cosine nearest neighbours retrieve movies with similar metadata.'],
              ['What is collaborative filtering here?', 'Each movie is represented by its pattern of ratings across users. Similar rating-vector directions create item-item neighbours independently of genre.'],
              ['Why use a sparse matrix?', 'Only a small fraction of the 260 × 1,100 possible movie-user cells have observed ratings, so CSR storage avoids allocating ordinary dense values for empty interactions.'],
              ['What is cold start?', 'A new item has no learned matrix row or interaction history. The project explicitly returns the popularity fallback instead of fabricating a similarity.'],
              ['What is the biggest dataset limitation?', 'The dataset is synthetic. That makes it safe and reproducible for teaching, but results must not be presented as evidence about real audience preferences.'],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-xl border border-blue-200 bg-white p-4">
                <p className="font-black">{question}</p>
                <p className="mt-1">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-orange-950">What would change in a production recommender?</h2>
          <p className="mt-3 text-sm leading-7 text-orange-950">
            A real streaming product would use real consented interaction data, separate candidate generation from ranking,
            learn from implicit signals such as views and completion, handle new users and items, add richer or learned features,
            measure ranking quality offline, run online experiments, control popularity/exposure bias, cache low-latency results,
            monitor data and model drift, and apply business and safety rules.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-emerald-950">Implementation mastery check</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-emerald-950 sm:grid-cols-2">
            {[
              'Why is the output a ranked list?',
              'Why can a raw average-rating leaderboard be misleading?',
              'What does the 25-rating shrinkage prior do?',
              'Why keep only the latest repeated user/movie rating?',
              'What two labels make up a movie content vector?',
              'How is cosine distance converted to similarity?',
              'What are the rows and columns of the collaborative matrix?',
              'Why is CSR sparse storage useful?',
              'Why can collaborative neighbours cross genre boundaries?',
              'What does the 45/55 hybrid rule mean?',
              'Why must the selected movie be excluded from its own neighbours?',
              'What is cold start and what fallback do we use?',
              'Why are fallback scores normalized to 0–1?',
              'What is stored in movie_recommender.joblib?',
              'Why does a plausible list not prove recommender quality?',
              'What changes because the teaching dataset is synthetic?',
            ].map(item => (
              <div key={item} className="rounded-xl border border-emerald-200 bg-white p-3">{item}</div>
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
              'CC0 synthetic ratings downloaded and verified',
              'Repeated interactions reduced to one latest user/movie rating',
              'Smoothed popularity baseline built',
              'Genre + decade content vectors built',
              'Sparse movie-user collaborative matrix built',
              'Cosine nearest-neighbour retrieval works',
              'Hybrid ranking is deterministic',
              'Cold-start fallback is explicit and score-compatible',
              'Joblib artifact saves and reloads',
              'Automated behavioral tests pass',
              'Streamlit app serves real generated recommendations',
              'Real browser screenshots and chart are visible',
              'Synthetic-data limitation is stated clearly',
              'Production next steps are understood',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-indigo-950">Run the entire project again from scratch</h2>
          <p className="mt-3 text-sm leading-7 text-indigo-950">
            A reproducible project should not depend on files that happen to exist on your laptop. From a clean clone,
            these four commands should rebuild the data, recommender, tests and browser app:
          </p>
          <CodeBlock code={runCommands} language="powershell" title="Reproduce the project" type="runnable" />
        </section>
      </main>
    </div>
  );
}
