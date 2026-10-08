# Movie Recommendation System — Project Status

Branch: `parallel/movie-recommender-handbook`

Project title: **Build Your Own Netflix-Style Movie Recommendation System**

Access plan: **Free project** under the LearnMLAcademy 3-free / 9-premium model.

## Dataset decision

The project now uses the Datanemics **Movie ratings** dataset:

- 9,000 synthetic user/movie ratings
- 1,100 users
- 260 movie IDs
- 0.5–5.0 ratings
- CC0 1.0 public domain

The switch was intentional: the previously tested MovieLens 100K data has redistribution/commercial-use restrictions that are a poor fit for a monetizable teaching website without separate permission. The replacement dataset preserves the recommendation-system learning goals while making the tutorial reusable under a clear public-domain licence.

## System design

1. smoothed popularity baseline and cold-start fallback
2. content-based similarity from genre + release-decade labels
3. item-item collaborative similarity from a sparse movie-user matrix
4. 45% content + 55% collaborative hybrid ranking

Repeated user/movie ratings are reduced to the latest interaction before constructing the matrix.

## Current verification state

The earlier MovieLens implementation passed its complete quality gate, but that evidence does **not** automatically certify the new CC0 implementation.

The CC0 migration must pass a fresh clean GitHub Actions run before this project is marked ready again.

## Quality checkpoints

- [x] branch and project structure
- [x] CC0 dataset migration implemented
- [x] downloader/data-contract checks rewritten
- [x] recommender logic adapted to string movie/user IDs
- [x] content representation changed to genre + decade labels
- [x] collaborative matrix handles repeat ratings with latest-interaction rule
- [x] normalized cold-start fallback retained
- [x] app adapted to synthetic titles/IDs
- [x] tests rewritten
- [x] handbook rewritten with synthetic-data limitations
- [ ] fresh Python tests pass
- [ ] fresh Streamlit/browser screenshots pass
- [ ] fresh TypeScript/build/prerender pass
- [ ] fresh desktop/mobile handbook verification passes
- [ ] final acceptance audit
- [ ] PR ready for merge review

## Important teaching boundary

“Netflix-style” is a familiar product description only. The project uses synthetic CC0 data and common recommendation-system techniques; it does not use Netflix data or reproduce Netflix's production recommender.
