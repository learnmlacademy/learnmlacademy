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

## Verified CC0 build

GitHub Actions run **37757264271** passed the complete quality gate on the CC0 implementation.

Verified results:

- CSV SHA256: `b9e41047db97680f0043a8bdcb18fd5cb25d8f4a6209d5ef536f0ba9b457af52`
- 9,000 raw rating rows
- 1,100 users
- 260 movie IDs
- 8,291 latest user/movie interactions
- rating density: 0.0289895105
- rating sparsity: 0.9710104895
- 12 automated tests passed
- Streamlit started and genuine browser screenshots were captured
- TypeScript validation passed
- production build/prerender passed
- 190 static HTML pages prerendered
- desktop and 390px-mobile handbook verification passed
- no horizontal overflow was detected

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
- [x] fresh Python tests pass
- [x] fresh Streamlit/browser screenshots pass
- [x] fresh TypeScript/build/prerender pass
- [x] fresh desktop/mobile handbook verification passes
- [x] final acceptance audit
- [x] draft PR ready for review
- [ ] merge only after explicit approval

## Important teaching boundary

“Netflix-style” is a familiar product description only. The project uses synthetic CC0 data and common recommendation-system techniques; it does not use Netflix data or reproduce Netflix's production recommender.
