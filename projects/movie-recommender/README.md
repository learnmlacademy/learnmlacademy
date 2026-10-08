# Netflix-Style Movie Recommendation System

This is the third free LearnMLAcademy flagship project.

## What the learner builds

A real Streamlit movie-recommendation application backed by the stable MovieLens 100K dataset. The learner can select a known movie and compare four recommendation strategies:

1. **Popularity baseline** — a non-personalized, smoothed ranking used as a safe cold-start fallback.
2. **Content-based similarity** — movies are represented with multi-hot genre vectors and compared with cosine similarity.
3. **Item-item collaborative similarity** — movies are represented by sparse user-rating patterns and compared with cosine nearest neighbors.
4. **Hybrid ranking** — combines 45% content similarity and 55% collaborative similarity.

The project deliberately does **not** claim to reproduce Netflix's production algorithm.

## Dataset

Source: official GroupLens **MovieLens 100K** archive.

The executable verifier confirms:

- 100,000 ratings
- 943 users
- 1,682 movies
- ratings from 1 to 5

Raw downloaded data and generated model artifacts are kept out of Git.

## Why the collaborative matrix is sparse

The movie-user matrix has 1,682 × 943 possible cells, but only 100,000 observed ratings. Most user/movie pairs are therefore empty. The build records both density and sparsity so the handbook can explain why sparse matrices matter.

## Verified workflow

From this directory:

```powershell
python download_data.py
python src/build_recommender.py
pytest -q
python -m streamlit run app.py
```

The GitHub Actions workflow repeats the data download, artifact build, automated tests, Streamlit startup and Playwright screenshot capture in a clean environment.

This branch remains a working build until the full beginner handbook, public evidence, website integration and final quality gate are complete.
