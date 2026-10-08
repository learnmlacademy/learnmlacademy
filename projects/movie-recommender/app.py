"""Run from the project root with: python -m streamlit run app.py"""

from pathlib import Path
import importlib.util

import joblib
import streamlit as st

ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / "models" / "movie_recommender.joblib"
REFERENCE_MOVIE_ID = "M1000"

spec = importlib.util.spec_from_file_location(
    "movie_recommender_core",
    ROOT / "src" / "build_recommender.py",
)
core = importlib.util.module_from_spec(spec)
spec.loader.exec_module(core)

st.set_page_config(
    page_title="Movie Recommendation System",
    page_icon="🎬",
    layout="wide",
)
st.title("Build Your Own Netflix-Style Movie Recommendation System")
st.caption(
    "Educational recommender using a CC0 synthetic ratings dataset • "
    "not Netflix's production algorithm"
)

if not MODEL_PATH.is_file():
    st.error("The recommender artifact is missing.")
    st.code(
        "python download_data.py\npython src/build_recommender.py",
        language="powershell",
    )
    st.stop()


@st.cache_resource
def load_artifacts(modified_ns: int):
    return joblib.load(MODEL_PATH)


artifacts = load_artifacts(MODEL_PATH.stat().st_mtime_ns)
movies = artifacts["movies"].sort_values(
    ["title", "release_year", "movie_id"]
).reset_index(drop=True)

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
        "Popularity is our cold-start fallback. It does not personalize "
        "to a selected movie."
    )
else:
    choices = [
        (
            str(row.movie_id),
            str(row.title),
            int(row.release_year),
        )
        for row in movies.itertuples(index=False)
    ]
    default_choice = next(
        (choice for choice in choices if choice[0] == REFERENCE_MOVIE_ID),
        choices[0],
    )
    selected_choice = st.selectbox(
        "Choose a movie you like",
        choices,
        index=choices.index(default_choice),
        format_func=lambda choice: (
            f"{choice[1]} ({choice[2]}) • ID {choice[0]}"
        ),
    )
    selected_id, selected_title, _selected_year = selected_choice

    method = {
        "Hybrid": "hybrid",
        "Content-based": "content",
        "Collaborative": "collaborative",
    }[method_label]
    top_n = st.slider(
        "How many recommendations?",
        min_value=5,
        max_value=15,
        value=10,
    )

    if st.button("Recommend movies", type="primary"):
        recommendations = core.recommend_or_fallback(
            artifacts,
            movie_id=selected_id,
            method=method,
            top_n=top_n,
        )
        st.subheader(f"Because you chose: {selected_title}")
        st.dataframe(
            recommendations,
            hide_index=True,
            use_container_width=True,
        )
        if method == "content":
            st.caption(
                "Content-based: compare genre + release-decade labels "
                "with cosine similarity."
            )
        elif method == "collaborative":
            st.caption(
                "Collaborative: compare sparse movie-by-user rating patterns."
            )
        else:
            st.caption(
                "Hybrid: 45% content similarity + "
                "55% audience-rating similarity."
            )

st.divider()
st.caption(
    "The ratings and movie titles in this teaching dataset are synthetic. "
    "The recommendation methods are real, but this app is intentionally small. "
    "Production streaming platforms use far more data, ranking stages, "
    "experimentation and infrastructure."
)
