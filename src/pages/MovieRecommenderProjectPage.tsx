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

const requirementsCode = String.raw\`pandas==2.3.3
numpy==2.3.3
scikit-learn==1.7.2
scipy==1.16.2
joblib==1.5.2
matplotlib==3.10.6
streamlit==1.50.0
pytest==8.4.2\`;

const downloadCode = String.raw\`"""Download the official stable MovieLens 100K dataset from GroupLens."""

from __future__ import annotations

from pathlib import Path
import shutil
import urllib.request
import zipfile

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
ARCHIVE = DATA_DIR / "ml-100k.zip"
EXTRACTED = DATA_DIR / "ml-100k"
URL = "https://files.grouplens.org/datasets/movielens/ml-100k.zip"

EXPECTED_RATINGS = 100_000
EXPECTED_USERS = 943
EXPECTED_MOVIES = 1_682


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    print("Downloading official MovieLens 100K archive from GroupLens...")
    with urllib.request.urlopen(URL, timeout=120) as response, ARCHIVE.open("wb") as output:
        shutil.copyfileobj(response, output)

    with zipfile.ZipFile(ARCHIVE) as zipped:
        names = set(zipped.namelist())
        required = {"ml-100k/u.data", "ml-100k/u.item", "ml-100k/u.genre"}
        missing = required.difference(names)
        if missing:
            raise RuntimeError(f"MovieLens archive is missing expected files: {sorted(missing)}")
        zipped.extractall(DATA_DIR)

    rating_lines = sum(1 for _ in (EXTRACTED / "u.data").open("r", encoding="latin-1"))
    movie_lines = sum(1 for _ in (EXTRACTED / "u.item").open("r", encoding="latin-1"))
    users = set()
    with (EXTRACTED / "u.data").open("r", encoding="latin-1") as handle:
        for line in handle:
            users.add(int(line.split("\\t", 1)[0]))

    if rating_lines != EXPECTED_RATINGS or movie_lines != EXPECTED_MOVIES or len(users) != EXPECTED_USERS:
        raise RuntimeError(
            "Unexpected MovieLens 100K shape: "
            f"ratings={rating_lines}, users={len(users)}, movies={movie_lines}"
        )

    print(f"Verified ratings: {rating_lines:,}")
    print(f"Verified users:   {len(users):,}")
    print(f"Verified movies:  {movie_lines:,}")
    print(f"Extracted to: {EXTRACTED}")


if __name__ == "__main__":
    main()\`;

const buildCode = String.raw\`"""Build popularity, content, collaborative and hybrid MovieLens recommenders."""

from __future__ import annotations

from pathlib import Path
import json

import joblib
import matplotlib.pyplot as plt
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MultiLabelBinarizer, normalize

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "ml-100k"
MODEL_DIR = ROOT / "models"
OUTPUT_DIR = ROOT / "outputs"

GENRES = [
    "unknown", "Action", "Adventure", "Animation", "Children's", "Comedy",
    "Crime", "Documentary", "Drama", "Fantasy", "Film-Noir", "Horror",
    "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western",
]


def load_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    ratings_path = DATA / "u.data"
    movies_path = DATA / "u.item"
    if not ratings_path.is_file() or not movies_path.is_file():
        raise FileNotFoundError("Run python download_data.py before building the recommender.")

    ratings = pd.read_csv(
        ratings_path,
        sep="\\t",
        names=["user_id", "movie_id", "rating", "timestamp"],
        encoding="latin-1",
    )

    movie_columns = ["movie_id", "title", "release_date", "video_release_date", "imdb_url", *GENRES]
    movies = pd.read_csv(
        movies_path,
        sep="|",
        names=movie_columns,
        encoding="latin-1",
    )

    genre_values = movies[GENRES].to_numpy(dtype=int)
    movies["genres"] = [
        "|".join(genre for genre, present in zip(GENRES, row) if present)
        for row in genre_values
    ]
    return ratings, movies[["movie_id", "title", "genres"]].copy()


def build_popularity(ratings: pd.DataFrame, movies: pd.DataFrame) -> pd.DataFrame:
    summary = ratings.groupby("movie_id")["rating"].agg(["mean", "count"]).reset_index()
    global_mean = float(ratings["rating"].mean())
    prior = 25.0
    summary["weighted_score"] = (
        (summary["count"] / (summary["count"] + prior)) * summary["mean"]
        + (prior / (summary["count"] + prior)) * global_mean
    )
    return movies.merge(summary, on="movie_id", how="left").fillna(
        {"mean": global_mean, "count": 0, "weighted_score": global_mean}
    )


def build_content(movies: pd.DataFrame):
    labels = movies["genres"].str.split("|")
    encoder = MultiLabelBinarizer(classes=GENRES)
    matrix = encoder.fit_transform(labels).astype(float)
    matrix = csr_matrix(normalize(matrix, norm="l2"))
    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(matrix)
    return encoder, matrix, model


def build_collaborative(ratings: pd.DataFrame, movies: pd.DataFrame):
    movie_ids = movies["movie_id"].tolist()
    user_ids = sorted(ratings["user_id"].unique())
    movie_to_row = {movie_id: index for index, movie_id in enumerate(movie_ids)}
    user_to_col = {user_id: index for index, user_id in enumerate(user_ids)}

    rows = ratings["movie_id"].map(movie_to_row).to_numpy()
    cols = ratings["user_id"].map(user_to_col).to_numpy()
    values = ratings["rating"].to_numpy(dtype=float)

    matrix = csr_matrix((values, (rows, cols)), shape=(len(movie_ids), len(user_ids)))
    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(matrix)
    return matrix, model


def neighbor_scores(model, matrix, row: int, n_candidates: int = 60) -> dict[int, float]:
    count = min(n_candidates + 1, matrix.shape[0])
    distances, indices = model.kneighbors(matrix[row], n_neighbors=count)
    result: dict[int, float] = {}
    for index, distance in zip(indices[0], distances[0]):
        if int(index) == row:
            continue
        result[int(index)] = max(0.0, 1.0 - float(distance))
    return result


def recommend(artifacts: dict, movie_id: int, method: str = "hybrid", top_n: int = 10) -> pd.DataFrame:
    if top_n < 1:
        raise ValueError("top_n must be at least 1")

    movies = artifacts["movies"]
    movie_to_row = artifacts["movie_to_row"]
    if movie_id not in movie_to_row:
        raise ValueError(f"Unknown movie_id: {movie_id}")
    row = movie_to_row[movie_id]

    content = neighbor_scores(artifacts["content_model"], artifacts["content_matrix"], row)
    collaborative = neighbor_scores(
        artifacts["collab_model"], artifacts["collab_matrix"], row
    )

    if method == "content":
        scores = content
        reason = "similar genres"
    elif method == "collaborative":
        scores = collaborative
        reason = "similar audience ratings"
    elif method == "hybrid":
        candidates = set(content) | set(collaborative)
        scores = {
            index: 0.45 * content.get(index, 0.0) + 0.55 * collaborative.get(index, 0.0)
            for index in candidates
        }
        reason = "combined genre + audience similarity"
    else:
        raise ValueError("method must be content, collaborative or hybrid")

    ranked = sorted(scores.items(), key=lambda pair: (-pair[1], pair[0]))[:top_n]
    rows = []
    for rank, (index, score) in enumerate(ranked, start=1):
        movie = movies.iloc[index]
        rows.append(
            {
                "rank": rank,
                "movie_id": int(movie["movie_id"]),
                "title": movie["title"],
                "genres": movie["genres"],
                "score": round(float(score), 4),
                "reason": reason,
            }
        )
    return pd.DataFrame(rows)


def popularity_recommendations(artifacts: dict, top_n: int = 10) -> pd.DataFrame:
    if top_n < 1:
        raise ValueError("top_n must be at least 1")
    popular = artifacts["popularity"].sort_values(
        ["weighted_score", "count", "movie_id"], ascending=[False, False, True]
    ).head(top_n).copy()
    popular.insert(0, "rank", range(1, len(popular) + 1))
    return popular[["rank", "movie_id", "title", "genres", "weighted_score", "count"]]


def recommend_or_fallback(
    artifacts: dict,
    movie_id: int | None,
    method: str = "hybrid",
    top_n: int = 10,
) -> pd.DataFrame:
    if movie_id is None or movie_id not in artifacts["movie_to_row"]:
        popular = popularity_recommendations(artifacts, top_n=top_n).copy()
        popular = popular.rename(columns={"weighted_score": "score"})
        popular["score"] = popular["score"].astype(float).round(4)
        popular["reason"] = "popularity fallback for cold start"
        return popular[["rank", "movie_id", "title", "genres", "score", "reason"]]
    return recommend(artifacts, movie_id, method=method, top_n=top_n)


def main() -> None:
    MODEL_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)

    ratings, movies = load_data()
    popularity = build_popularity(ratings, movies)
    encoder, content_matrix, content_model = build_content(movies)
    collab_matrix, collab_model = build_collaborative(ratings, movies)
    movie_to_row = {movie_id: index for index, movie_id in enumerate(movies["movie_id"])}

    artifacts = {
        "movies": movies,
        "popularity": popularity,
        "genre_encoder": encoder,
        "content_matrix": content_matrix,
        "content_model": content_model,
        "collab_matrix": collab_matrix,
        "collab_model": collab_model,
        "movie_to_row": movie_to_row,
    }

    model_path = MODEL_DIR / "movie_recommender.joblib"
    joblib.dump(artifacts, model_path)
    reloaded = joblib.load(model_path)

    toy_story = movies.loc[movies["title"] == "Toy Story (1995)", "movie_id"]
    if toy_story.empty:
        raise RuntimeError("Reference movie Toy Story (1995) not found.")
    toy_story_id = int(toy_story.iloc[0])

    reference_frames = []
    for method in ["content", "collaborative", "hybrid"]:
        frame = recommend(reloaded, toy_story_id, method=method, top_n=10)
        frame.insert(0, "method", method)
        reference_frames.append(frame)
    pd.concat(reference_frames, ignore_index=True).to_csv(
        OUTPUT_DIR / "toy_story_recommendations.csv", index=False
    )

    popularity_recommendations(reloaded, 10).to_csv(
        OUTPUT_DIR / "popular_movies.csv", index=False
    )

    total_possible_ratings = int(collab_matrix.shape[0] * collab_matrix.shape[1])
    observed_ratings = int(collab_matrix.nnz)
    metrics = {
        "ratings": int(len(ratings)),
        "users": int(ratings["user_id"].nunique()),
        "movies": int(len(movies)),
        "rating_mean": float(ratings["rating"].mean()),
        "rating_min": float(ratings["rating"].min()),
        "rating_max": float(ratings["rating"].max()),
        "content_features": int(content_matrix.shape[1]),
        "collaborative_shape": list(collab_matrix.shape),
        "observed_rating_cells": observed_ratings,
        "possible_rating_cells": total_possible_ratings,
        "rating_density": observed_ratings / total_possible_ratings,
        "rating_sparsity": 1.0 - (observed_ratings / total_possible_ratings),
        "reference_movie": "Toy Story (1995)",
        "reference_movie_id": toy_story_id,
        "hybrid_content_weight": 0.45,
        "hybrid_collaborative_weight": 0.55,
    }
    (OUTPUT_DIR / "metrics.json").write_text(
        json.dumps(metrics, indent=2) + "\\n", encoding="utf-8"
    )

    fig, ax = plt.subplots(figsize=(7, 4))
    ratings["rating"].value_counts().sort_index().plot(kind="bar", ax=ax)
    ax.set(title="MovieLens 100K rating distribution", xlabel="Rating", ylabel="Count")
    fig.tight_layout()
    fig.savefig(OUTPUT_DIR / "rating_distribution.png", dpi=160)
    plt.close(fig)

    print("MovieLens recommender built successfully.")
    print(json.dumps(metrics, indent=2))
    print("\\nHybrid recommendations for Toy Story (1995):")
    print(recommend(reloaded, toy_story_id, method="hybrid", top_n=10).to_string(index=False))


if __name__ == "__main__":
    main()\`;

const appCode = String.raw\`"""Run from the project root with: python -m streamlit run app.py"""

from pathlib import Path
import importlib.util

import joblib
import streamlit as st

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "movie_recommender.joblib"

spec = importlib.util.spec_from_file_location(
    "movie_recommender_core", ROOT / "src" / "build_recommender.py"
)
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)

st.set_page_config(page_title="Movie Recommendation System", page_icon="🎬", layout="wide")
st.title("Build Your Own Netflix-Style Movie Recommendation System")
st.caption("Educational recommender using MovieLens 100K • not Netflix's production algorithm")

if not MODEL_PATH.is_file():
    st.error("The recommender artifact is missing.")
    st.code("python download_data.py\\npython src/build_recommender.py", language="powershell")
    st.stop()


@st.cache_resource
def load_artifacts(modified_ns: int):
    return joblib.load(MODEL_PATH)


artifacts = load_artifacts(MODEL_PATH.stat().st_mtime_ns)
movies = artifacts["movies"].sort_values(["title", "movie_id"]).reset_index(drop=True)

method_label = st.radio(
    "Recommendation method",
    ["Hybrid", "Content-based", "Collaborative", "Popular movies"],
    horizontal=True,
)

if method_label == "Popular movies":
    st.subheader("Popular starting points")
    popular = core.popularity_recommendations(artifacts, top_n=10).copy()
    popular["weighted_score"] = popular["weighted_score"].round(3)
    st.dataframe(popular, hide_index=True, use_container_width=True)
    st.info(
        "Popularity is our cold-start fallback. It is useful when we do not yet "
        "have enough information to calculate a meaningful similarity."
    )
else:
    choices = list(zip(movies["movie_id"].astype(int), movies["title"]))
    default_choice = next(
        (choice for choice in choices if choice[1] == "Toy Story (1995)"),
        choices[0],
    )
    selected_choice = st.selectbox(
        "Choose a movie you like",
        choices,
        index=choices.index(default_choice),
        format_func=lambda choice: f"{choice[1]}  •  MovieLens ID {choice[0]}",
    )
    selected_id, selected_title = selected_choice

    method = {
        "Hybrid": "hybrid",
        "Content-based": "content",
        "Collaborative": "collaborative",
    }[method_label]
    top_n = st.slider("How many recommendations?", min_value=5, max_value=15, value=10)

    if st.button("Recommend movies", type="primary"):
        recommendations = core.recommend_or_fallback(
            artifacts,
            int(selected_id),
            method=method,
            top_n=top_n,
        )
        st.subheader(f"Because you chose: {selected_title}")
        st.dataframe(recommendations, hide_index=True, use_container_width=True)
        if method == "content":
            st.caption("Content-based: compare multi-hot genre vectors with cosine similarity.")
        elif method == "collaborative":
            st.caption("Collaborative: compare sparse movie-by-user rating patterns.")
        else:
            st.caption("Hybrid: 45% genre similarity + 55% audience-rating similarity.")

st.divider()
st.caption(
    "This small educational system demonstrates recommendation ideas with historical MovieLens ratings. "
    "Real streaming platforms use many more signals, experiments, safety rules and large-scale infrastructure."
)\`;

const testCode = String.raw\`from pathlib import Path
import importlib.util

import joblib
import pandas as pd
import pytest

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / "models" / "movie_recommender.joblib"

spec = importlib.util.spec_from_file_location("recommender", ROOT / "src" / "build_recommender.py")
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)


@pytest.fixture(scope="session")
def artifacts():
    assert MODEL.is_file(), "Run python src/build_recommender.py first."
    return joblib.load(MODEL)


def test_dataset_contract():
    ratings, movies = core.load_data()
    assert len(ratings) == 100_000
    assert ratings["user_id"].nunique() == 943
    assert len(movies) == 1_682
    assert set(["movie_id", "title", "genres"]).issubset(movies.columns)


@pytest.mark.parametrize("method", ["content", "collaborative", "hybrid"])
def test_recommendations_are_unique_and_exclude_query_movie(artifacts, method):
    movies = artifacts["movies"]
    toy_story_id = int(movies.loc[movies["title"] == "Toy Story (1995)", "movie_id"].iloc[0])
    result = core.recommend(artifacts, toy_story_id, method=method, top_n=10)
    assert len(result) == 10
    assert result["movie_id"].is_unique
    assert toy_story_id not in set(result["movie_id"])
    assert result["score"].between(0, 1).all()


def test_popularity_fallback_is_ranked(artifacts):
    result = core.popularity_recommendations(artifacts, top_n=10)
    assert len(result) == 10
    assert result["rank"].tolist() == list(range(1, 11))
    assert result["weighted_score"].is_monotonic_decreasing


def test_unknown_movie_is_rejected_by_similarity_api(artifacts):
    with pytest.raises(ValueError, match="Unknown movie_id"):
        core.recommend(artifacts, 999999, method="hybrid", top_n=10)


def test_unknown_movie_uses_cold_start_fallback(artifacts):
    result = core.recommend_or_fallback(
        artifacts,
        movie_id=999999,
        method="hybrid",
        top_n=7,
    )
    assert len(result) == 7
    assert result["rank"].tolist() == list(range(1, 8))
    assert set(result["reason"]) == {"popularity fallback for cold start"}


def test_top_n_must_be_positive(artifacts):
    movies = artifacts["movies"]
    movie_id = int(movies.iloc[0]["movie_id"])
    with pytest.raises(ValueError, match="top_n"):
        core.recommend(artifacts, movie_id, method="hybrid", top_n=0)
    with pytest.raises(ValueError, match="top_n"):
        core.popularity_recommendations(artifacts, top_n=0)


def test_collaborative_matrix_is_sparse(artifacts):
    matrix = artifacts["collab_matrix"]
    assert matrix.shape == (1_682, 943)
    assert matrix.nnz == 100_000
    density = matrix.nnz / (matrix.shape[0] * matrix.shape[1])
    assert density < 0.10


def test_reference_output_matches_live_artifact(artifacts):
    reference_path = ROOT / "outputs" / "toy_story_recommendations.csv"
    assert reference_path.is_file()
    saved = pd.read_csv(reference_path)
    hybrid_saved = saved.loc[saved["method"] == "hybrid"].reset_index(drop=True)
    movies = artifacts["movies"]
    movie_id = int(movies.loc[movies["title"] == "Toy Story (1995)", "movie_id"].iloc[0])
    live = core.recommend(artifacts, movie_id, method="hybrid", top_n=10)
    pd.testing.assert_frame_equal(
        hybrid_saved[live.columns].reset_index(drop=True),
        live.reset_index(drop=True),
        check_dtype=False,
    )\`;

const installCommands = String.raw\`python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt\`;

const runCommands = String.raw\`python download_data.py
python src/build_recommender.py
pytest -q
python -m streamlit run app.py\`;

const gitCommands = String.raw\`git init
git add .
git status
git commit -m "Build movie recommendation system"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/movie-recommender.git
git push -u origin main\`;

const hybridOutput = String.raw\`1  Aladdin (1992)                               0.7098
2  Willy Wonka and the Chocolate Factory (1971) 0.6510
3  Lion King, The (1994)                        0.6041
4  Aladdin and the King of Thieves (1996)       0.4500
5  Star Wars (1977)                             0.4040\`;

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
      'Build a Netflix-style educational movie recommender with MovieLens 100K, content similarity, collaborative filtering, a hybrid ranker, tests and Streamlit.';
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
    'MovieLens 100K',
    'Pandas',
    'NumPy',
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
    'Content-based filtering',
    'Multi-hot encoding',
    'Cosine similarity',
    'Sparse matrices',
    'Collaborative filtering',
    'Item-item similarity',
    'Hybrid ranking',
    'Cold start',
    'Model persistence',
    'Testing',
    'Deployment',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All project handbooks
          </Link>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">FREE PROJECT</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">Intermediate</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">Windows-first instructions</span>
          </div>

          <h1 className="mt-4 max-w-5xl text-3xl font-black leading-tight text-white sm:text-5xl">
            Build Your Own Netflix-Style Movie Recommendation System
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300 sm:text-lg">
            Start with an empty folder and finish with a working browser app that can recommend similar movies using content,
            audience-rating behaviour and a simple hybrid ranker. You will build every important file, run the real system,
            inspect real outputs and understand why each step exists.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <Target className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-2 text-sm font-black text-white">What you build</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">A Streamlit app with popularity, content, collaborative and hybrid recommendation modes.</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <Database className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-2 text-sm font-black text-white">Real dataset</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">MovieLens 100K: 100,000 ratings, 943 users and 1,682 movies.</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <Laptop className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <div className="mt-2 text-sm font-black text-white">Verified workflow</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">Download → build → save → test → run Streamlit → inspect recommendations.</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-indigo-950">Before you start: what this project is and is not</h2>
          <p className="mt-3 text-sm leading-7 text-indigo-950">
            The familiar “Netflix-style” name describes the learning experience, not Netflix's internal algorithm. Our app
            recommends movies related to one selected movie. It is an educational recommender built from public historical
            ratings and movie genres. Real streaming systems use many more signals, ranking stages, experiments and safeguards.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-black text-slate-950">
            <Wrench className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            Tools you will use
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map(tool => <span key={tool} className="rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1.5 text-xs font-bold text-indigo-800">{tool}</span>)}
          </div>
          <h3 className="mt-6 text-sm font-black text-slate-900">Topics covered</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{topics.join(' · ')}</p>
        </section>

        <Step number={1} title="Understand the recommendation problem" check="You can explain that the app ranks related movies; it does not predict a survival class or a house price.">
          <p>
            Classification asks “which class?” Regression asks “what number?” A recommender asks “which items should appear near the top?”
            That makes the output a <strong>ranked list</strong>, not one label.
          </p>
          <p>
            We will build four levels: a popularity baseline, content similarity, collaborative similarity and a hybrid that combines
            the last two. The baseline is important because a complex system should beat or add value beyond a simple default.
          </p>
        </Step>

        <Step number={2} title="Create the project folder" check="PowerShell shows you inside movie-recommender and VS Code opens that folder.">
          <CodeBlock code={String.raw\`mkdir movie-recommender
cd movie-recommender
code .\`} language="powershell" title="Create and open the project" type="runnable" />
          <p>Create these folders in VS Code Explorer: <code>src</code>, <code>tests</code>, <code>models</code>, <code>outputs</code>, <code>scripts</code> and <code>data</code>.</p>
        </Step>

        <Step number={3} title="Create an isolated Python environment" check="Your terminal prompt starts with (.venv).">
          <CodeBlock code={installCommands} language="powershell" title="Create environment and install packages" type="runnable" />
          <p>
            A virtual environment keeps this project’s package versions separate from other Python work. If PowerShell blocks
            activation, run <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code> in that terminal and activate again.
          </p>
        </Step>

        <Step number={4} title="Create requirements.txt" check="pip install -r requirements.txt finishes without an error.">
          <CodeBlock code={requirementsCode} language="text" title="requirements.txt" type="config" />
          <p>
            <strong>scikit-learn</strong> provides nearest-neighbor search, <strong>SciPy</strong> stores the sparse rating matrix,
            <strong>Joblib</strong> saves the built recommender, and <strong>Streamlit</strong> provides the browser interface.
          </p>
        </Step>

        <Step number={5} title="Download and verify MovieLens 100K" check="The command prints exactly 100,000 ratings, 943 users and 1,682 movies.">
          <p>
            Create <code>download_data.py</code> in the project root and paste the complete code below. It downloads the stable
            MovieLens 100K archive directly from GroupLens and checks its important files and row counts.
          </p>
          <CodeBlock code={downloadCode} language="python" title="download_data.py" type="runnable" />
          <CodeBlock code={'python download_data.py'} language="powershell" title="Download and verify data" type="runnable" />
          <CodeBlock code={'Verified ratings: 100,000\\nVerified users:   943\\nVerified movies:  1,682'} language="text" title="Expected verified counts" type="output" />
          <p>
            These checks protect the rest of the project from silently training on an incomplete or unexpected download.
          </p>
        </Step>

        <Step number={6} title="Read the two files that drive the recommender" check="You can explain that u.data contains user-movie ratings and u.item contains movie metadata such as title and genres.">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-900"><tr><th className="px-4 py-3">File</th><th className="px-4 py-3">What we use</th><th className="px-4 py-3">Why</th></tr></thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr><td className="px-4 py-3 font-mono text-xs">u.data</td><td className="px-4 py-3">user_id, movie_id, rating, timestamp</td><td className="px-4 py-3">Audience-rating patterns for collaborative similarity</td></tr>
                <tr><td className="px-4 py-3 font-mono text-xs">u.item</td><td className="px-4 py-3">movie title + 19 genre flags</td><td className="px-4 py-3">Movie features for content similarity</td></tr>
              </tbody>
            </table>
          </div>
        </Step>

        <Step number={7} title="Build a popularity baseline first" check="You understand why one 5-star rating should not automatically beat hundreds of consistently strong ratings.">
          <p>
            The project computes each movie’s average rating and rating count, then <strong>shrinks</strong> the movie average toward
            the global mean using a 25-rating prior. This is a simple Bayesian-style smoothing idea.
          </p>
          <p>
            Popularity is not personalized, but it is valuable as a default and as a <strong>cold-start fallback</strong> when the system
            cannot calculate a trustworthy similarity for a new or unknown item.
          </p>
        </Step>

        <Step number={8} title="Turn movie genres into vectors" check="You can convert a movie such as Animation + Children's + Comedy into a vector of 0s and 1s.">
          <p>
            Each of the 19 MovieLens genres becomes one position in a vector. If a movie belongs to a genre, that position is 1;
            otherwise it is 0. This is a <strong>multi-hot vector</strong> because several genre positions can be 1 at the same time.
          </p>
          <CodeBlock code={'Toy Story → [0,0,0,1,1,1,...]\\nAction-only movie → [0,1,0,0,0,0,...]'} language="text" title="Tiny genre-vector example" type="output" />
          <p>
            Important: this project uses multi-hot genre vectors. It does <strong>not</strong> use TF-IDF for the genre representation.
          </p>
        </Step>

        <Step number={9} title="Understand cosine similarity before using it" check="You know that a smaller cosine distance means a larger cosine similarity, and our code converts distance to 1 - distance.">
          <p>
            Cosine similarity compares the <strong>direction</strong> of two vectors. Two movies sharing many genre directions receive
            a larger similarity. Scikit-learn's nearest-neighbor model can use cosine <em>distance</em>; the code converts that to a
            similarity score with <code>1 - distance</code>.
          </p>
          <CodeBlock code={'similarity = 1 - cosine_distance\\n\\ncosine distance 0.10 → similarity 0.90\\ncosine distance 0.80 → similarity 0.20'} language="text" title="Distance to similarity" type="output" />
        </Step>

        <Step number={10} title="Build the sparse movie-by-user matrix" check="You can explain what a row, a column and a non-empty cell represent.">
          <p>
            Collaborative filtering ignores genre names and looks at behaviour. We build a matrix with one movie per row and one user
            per column. A known rating fills a cell; most cells are empty because most users have not rated most movies.
          </p>
          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-7 text-cyan-950">
            <strong>Why sparse storage?</strong> The full matrix has 1,682 × 943 possible cells, but only 100,000 observed ratings.
            A SciPy CSR sparse matrix stores the useful non-zero entries without materializing every missing rating as a normal dense value.
          </div>
        </Step>

        <Step number={11} title="Build the complete recommender engine" check="src/build_recommender.py exists and contains the complete code below.">
          <p>
            Create <code>src/build_recommender.py</code>. This one file builds the four teaching strategies, saves a reusable artifact,
            records metrics, creates a rating-distribution chart and writes deterministic reference recommendations.
          </p>
          <CodeBlock code={buildCode} language="python" title="src/build_recommender.py — complete source" type="runnable" />
        </Step>

        <Step number={12} title="Run the recommender build" check="The command prints the dataset metrics and a ten-row hybrid recommendation list for Toy Story (1995).">
          <CodeBlock code={'python src/build_recommender.py'} language="powershell" title="Build and save the recommender" type="runnable" />
          <p>The verified reference build starts its Toy Story hybrid ranking like this:</p>
          <CodeBlock code={hybridOutput} language="text" title="Verified reference — first five hybrid results" type="output" />
          <p>
            These are not “correct answers” in the way a classification label can be correct. They are the deterministic result of this
            specific feature representation, rating matrix and 45/55 hybrid rule.
          </p>
        </Step>

        <Step number={13} title="Read the rating-distribution chart" check="You can explain what the x-axis and y-axis mean and why interaction distributions matter.">
          <p>
            The build saves <code>outputs/rating_distribution.png</code>. It shows how often each 1–5 rating appears. Before trusting a
            recommender, inspect the interactions it learns from; recommenders inherit the biases and coverage gaps in their interaction data.
          </p>
          <img
            src="/project-handbooks/movie-recommender/rating_distribution.png"
            alt="Rating distribution generated from the verified MovieLens 100K build"
            className="mx-auto max-h-[620px] w-full rounded-xl border border-slate-200 bg-white object-contain"
            loading="lazy"
          />
        </Step>

        <Step number={14} title="Understand what each recommendation mode is really doing" check="You can explain the difference without using the words 'AI magic'.">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100"><tr><th className="px-4 py-3">Mode</th><th className="px-4 py-3">Evidence</th><th className="px-4 py-3">Main weakness</th></tr></thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr><td className="px-4 py-3 font-bold">Popularity</td><td className="px-4 py-3">Average rating + count</td><td className="px-4 py-3">Same list for everyone</td></tr>
                <tr><td className="px-4 py-3 font-bold">Content</td><td className="px-4 py-3">Shared genres</td><td className="px-4 py-3">Cannot discover similarity outside those features</td></tr>
                <tr><td className="px-4 py-3 font-bold">Collaborative</td><td className="px-4 py-3">Similar rating patterns across users</td><td className="px-4 py-3">Weak for items with little interaction history</td></tr>
                <tr><td className="px-4 py-3 font-bold">Hybrid</td><td className="px-4 py-3">45% genre + 55% rating-pattern similarity</td><td className="px-4 py-3">Weights are a developer choice, not a universal truth</td></tr>
              </tbody>
            </table>
          </div>
        </Step>

        <Step number={15} title="Handle cold start explicitly" check="You can explain why an unseen movie cannot have a learned collaborative-neighbor row.">
          <p>
            <strong>Cold start</strong> means the system lacks enough history for a new user or item. In our item-item design, an unknown
            movie has no row in the learned matrices, so pretending we have a similarity score would be wrong.
          </p>
          <p>
            <code>recommend_or_fallback()</code> therefore returns the popularity baseline. The fallback is honest: its reason column says
            <strong>popularity fallback for cold start</strong>.
          </p>
        </Step>

        <Step number={16} title="Create the Streamlit application" check="app.py exists and contains the complete code below.">
          <CodeBlock code={appCode} language="python" title="app.py — complete source" type="runnable" />
          <p>
            The selector stores both <code>movie_id</code> and title. That matters because titles are labels for humans, while stable IDs
            are safer for joining and lookup logic.
          </p>
        </Step>

        <Step number={17} title="Run the app and make a real recommendation" check="The browser opens, Toy Story is selected by default, and clicking Recommend movies shows ten ranked rows.">
          <CodeBlock code={'python -m streamlit run app.py'} language="powershell" title="Start Streamlit" type="runnable" />
          <img
            src="/project-handbooks/movie-recommender/movie-recommender-form.png"
            alt="Real Streamlit movie recommender form captured from the verified application"
            className="w-full rounded-xl border border-slate-200 bg-white"
            loading="lazy"
          />
          <p>
            Start with <strong>Hybrid</strong>, keep <strong>Toy Story (1995)</strong>, leave 10 recommendations and click the button.
          </p>
          <img
            src="/project-handbooks/movie-recommender/movie-recommender-results.png"
            alt="Real Streamlit movie recommendation results for Toy Story from the verified application"
            className="w-full rounded-xl border border-slate-200 bg-white"
            loading="lazy"
          />
        </Step>

        <Step number={18} title="Add automated tests" check="pytest -q finishes with every test passing.">
          <p>
            Create <code>tests/test_recommender.py</code>. These tests check more than “the app opens”: dataset shape, ranking uniqueness,
            query exclusion, score range, popularity ordering, cold-start fallback, sparse storage and deterministic reference output.
          </p>
          <CodeBlock code={testCode} language="python" title="tests/test_recommender.py — complete source" type="runnable" />
          <CodeBlock code={'pytest -q'} language="powershell" title="Run tests" type="runnable" />
        </Step>

        <Step number={19} title="Understand what Joblib saved" check="You can explain that the artifact contains data tables, sparse matrices, fitted nearest-neighbor indexes and lookup mappings—not a neural network.">
          <p>
            <code>models/movie_recommender.joblib</code> stores the built recommendation artifacts so the Streamlit app can load them
            without rebuilding all matrices on every page refresh.
          </p>
          <p>
            Joblib files should be treated as trusted local artifacts. Do not load an arbitrary Joblib file received from an untrusted source.
          </p>
        </Step>

        <Step number={20} title="Know how to evaluate a recommender honestly" check="You can explain why ordinary classification accuracy is not the main metric for a ranked recommendation list.">
          <p>
            Recommendation evaluation is harder because the dataset tells us what users rated, not every movie they might have enjoyed.
            Offline systems often hide some known interactions and ask whether the recommender ranks those held-out items highly using
            metrics such as Hit Rate, Precision@K, Recall@K or NDCG.
          </p>
          <p>
            This project deliberately focuses on understanding the four recommendation mechanisms and deterministic behaviour. Do not claim
            the hybrid is “best” merely because its list looks reasonable. A production decision would require a proper offline protocol and
            eventually online experiments.
          </p>
        </Step>

        <Step number={21} title="Understand the complete folder" check="You can point to the file responsible for data, build logic, tests and browser inference.">
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            movie-recommender/<br />
            ├── data/ <span className="text-slate-400"># downloaded, ignored by Git</span><br />
            ├── models/ <span className="text-slate-400"># generated artifact</span><br />
            ├── outputs/ <span className="text-slate-400"># metrics, CSVs, chart, screenshots</span><br />
            ├── scripts/<br />
            │&nbsp;&nbsp; └── capture_app_screenshots.py<br />
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

        <Step number={22} title="Put the project on GitHub" check="git status does not show .venv, the raw MovieLens folder or the generated Joblib artifact as files to commit.">
          <CodeBlock code={String.raw\`.venv/
__pycache__/
.pytest_cache/
data/ml-100k/
data/ml-100k.zip
models/*.joblib
outputs/screenshots/
*.log\`} language="text" title=".gitignore" type="config" />
          <CodeBlock code={gitCommands} language="powershell" title="Git and GitHub commands" type="runnable" />
        </Step>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-amber-950">Common problems and exact fixes</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-amber-950">
            <p><strong>FileNotFoundError for u.data:</strong> run <code>python download_data.py</code> from the project root first.</p>
            <p><strong>ModuleNotFoundError:</strong> activate <code>.venv</code>, then rerun <code>pip install -r requirements.txt</code>.</p>
            <p><strong>The Streamlit app says the artifact is missing:</strong> run <code>python src/build_recommender.py</code> before starting the app.</p>
            <p><strong>You get the selected movie back as recommendation #1:</strong> the query row was not excluded. Check the <code>if int(index) == row: continue</code> guard.</p>
            <p><strong>Collaborative results look odd:</strong> remember that raw 1–5 rating vectors are a simple teaching design. Mean-centering, implicit feedback, matrix factorization or learned embeddings are possible improvements.</p>
            <p><strong>Two titles look identical:</strong> use MovieLens IDs as the real key. The app displays the ID beside each title for that reason.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Now change the system yourself</h2>
          <div className="mt-4 grid gap-4 text-sm leading-7 text-fuchsia-950 sm:grid-cols-2">
            {[
              ['Exercise 1 — Change hybrid weights', 'Try 70% content and 30% collaborative. Rebuild, compare Toy Story results, and explain which titles moved and why.'],
              ['Exercise 2 — Change the seed movie', 'Use Star Wars or another movie you know. Compare content, collaborative and hybrid lists instead of judging only one mode.'],
              ['Exercise 3 — Break cold start on purpose', 'Call recommend() with an unknown ID and observe the exception, then call recommend_or_fallback() and explain why the second behaviour is safer.'],
              ['Exercise 4 — Add one evaluation protocol', 'Design a leave-one-out test for users with enough ratings and report Hit Rate@10 or Recall@10 without using future/held-out interactions to construct the recommendation evidence.'],
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
              ['What is content-based filtering here?', 'Each movie is represented by its MovieLens genre flags. We normalize those vectors and retrieve movies with the smallest cosine distance, which is equivalent to the largest cosine similarity.'],
              ['What is collaborative filtering here?', 'Each movie is represented by the pattern of ratings it received from MovieLens users. Movies with similar rating vectors become neighbours even if their genres differ.'],
              ['Why use a sparse matrix?', 'Only 100,000 of roughly 1.59 million movie-user cells contain observed ratings, so sparse storage avoids materializing most empty interactions.'],
              ['What is cold start?', 'A new item has little or no interaction history, so collaborative similarity is unreliable or unavailable. This project falls back to a smoothed popularity list.'],
              ['Why is the hybrid 45/55?', 'It is an explicit developer choice for this educational build, not a universal optimum. In a real system we would tune or learn ranking weights using offline and online evaluation.'],
              ['What would you improve first?', 'Add a proper held-out recommendation evaluation, richer item metadata or embeddings, personalized user profiles, bias handling, freshness signals and monitored online experimentation.'],
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
            A real streaming product would separate candidate generation from ranking, ingest fresh implicit signals such as views and
            completion, handle new users/items, monitor popularity and exposure bias, enforce safety/business rules, run offline ranking
            evaluation, perform A/B tests, cache low-latency results, retrain on a schedule and monitor drift. The small Streamlit app is
            intentionally designed to make the core ideas visible before adding that infrastructure.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-emerald-950">Implementation mastery check</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-emerald-950 sm:grid-cols-2">
            {[
              'What is the output of a recommender: label, number or ranked list?',
              'Why do we build a popularity baseline?',
              'What exactly does one position in the genre vector mean?',
              'Why do we normalize the genre vectors?',
              'How is cosine distance converted to similarity?',
              'What are the rows and columns of the collaborative matrix?',
              'Why is the matrix sparse?',
              'Why must the query movie be removed from its own neighbours?',
              'What evidence does collaborative filtering use that content filtering ignores?',
              'What does the 45/55 hybrid rule mean?',
              'What is cold start and what fallback do we use?',
              'What is actually stored in the Joblib artifact?',
              'Why is offline recommender evaluation different from accuracy?',
              'What would you add before calling this a production recommender?',
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
              'Official MovieLens 100K data verified',
              'Smoothed popularity baseline built',
              'Multi-hot content vectors built',
              'Sparse movie-user rating matrix built',
              'Cosine nearest-neighbour retrieval works',
              'Hybrid ranking is deterministic',
              'Cold-start fallback is explicit',
              'Artifact saves and reloads',
              'Automated behavioral tests pass',
              'Streamlit app serves recommendations',
              'Real browser screenshots captured',
              'Limitations and production next steps understood',
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
