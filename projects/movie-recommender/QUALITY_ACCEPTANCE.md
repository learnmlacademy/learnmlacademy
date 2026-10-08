# Movie Recommendation System — Learning Value Acceptance

This free flagship project must be strong enough to make the premium LearnMLAcademy projects credible.

## Required standard

The learner must be able to explain:

- what a recommender system ranks,
- why a popularity baseline matters,
- the difference between content-based and collaborative recommendation,
- how multi-hot genre vectors are created,
- what sparse movie-user data means,
- why cosine similarity is useful here,
- how nearest-neighbor retrieval works,
- what cold start means and why a fallback is necessary,
- how the 45/55 hybrid ranker combines two evidence sources,
- how the Streamlit app converts one selected movie into ranked recommendations,
- why offline recommendation evaluation is harder than ordinary classification accuracy,
- what would change in a real production recommender.

## Final evidence gate

The project cannot pass merely because recommendations appear on screen.

Verified requirements:

- [x] reproducible official GroupLens data download
- [x] executable recommendation code
- [x] deterministic Toy Story reference recommendations
- [x] saved/reloaded recommender artifact
- [x] automated tests
- [x] explicit cold-start fallback test
- [x] sparse-matrix behavior test
- [x] genuine Streamlit screenshots
- [x] generated rating-distribution chart
- [x] complete copyable data/build/app/test code in the handbook
- [x] explanation of popularity, content, collaborative and hybrid logic
- [x] learner modification exercises
- [x] exact troubleshooting
- [x] interview explanations
- [x] production limitations
- [x] mastery questions
- [x] route/catalog/SEO metadata/sitemap integration
- [x] TypeScript validation
- [x] production build and prerender verification
- [x] desktop website verification
- [x] mobile website verification
- [x] horizontal-overflow verification

## Verified run

Full gate: **GitHub Actions run 37755384707 — SUCCESS**

Key results:

- 10 tests passed
- MovieLens matrix density: 6.3047%
- MovieLens matrix sparsity: 93.6953%
- 190 static HTML pages prerendered
- desktop handbook: PASS
- mobile handbook: PASS
- horizontal overflow: none

## Technical limitations stated to the learner

The project does not claim:

- that the 45/55 hybrid weighting is universally optimal,
- that visual plausibility proves recommendation quality,
- that raw-rating cosine is the only or best collaborative approach,
- that the app performs full user-personalized ranking,
- that it reproduces Netflix's production recommendation stack.

The handbook explicitly points learners toward held-out ranking evaluation, richer metadata, personalized profiles, learned embeddings, bias/freshness handling and online experimentation as next steps.

**Current acceptance: PASS — ready for PR review.**
