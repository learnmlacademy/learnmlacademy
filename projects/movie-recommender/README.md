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

The movie-user matrix has 1,682 × 943 possible cells, but only 100,000 observed ratings. The verified build records:

- density: 6.3047%
- sparsity: 93.6953%

Sparse CSR storage avoids allocating ordinary dense values for most missing user/movie interactions.

## Run locally

From this directory:

```powershell
python download_data.py
python src/build_recommender.py
pytest -q
python -m streamlit run app.py
```

## Verified quality gate

GitHub Actions run **37755384707** passed:

- official dataset download
- recommender build
- 10 Pytest checks
- Streamlit health
- genuine Playwright screenshots
- TypeScript validation
- website production build/prerender
- desktop handbook verification
- mobile handbook verification
- horizontal-overflow checks

The learner-facing handbook is integrated at:

`/projects/movie-recommender`

## Important limitation

The app ranks movies related to a selected movie. It is an educational demonstration of popularity, content-based, item-item collaborative and hybrid recommendation. A real production recommender would add rigorous held-out ranking evaluation, user-level personalization, richer/learned features, freshness, online experimentation and production serving infrastructure.
