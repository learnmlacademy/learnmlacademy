# Project 3 status — Credit Card Fraud Detector

## Engineering
- [x] public OpenML dataset downloader
- [x] schema/count validation
- [x] stratified train/validation/test split
- [x] four candidate imbalance strategies
- [x] training-only cross-validation
- [x] Average Precision model selection
- [x] validation-only threshold tuning
- [x] untouched-test evaluation
- [x] confusion matrix / PR curve / threshold chart
- [x] saved model bundle
- [x] Streamlit fraud-review demo
- [x] automated tests
- [ ] first clean CI run after test fix
- [x] record exact dataset SHA256
- [ ] learner handbook page
- [ ] real screenshots
- [ ] desktop/mobile website verification
- [ ] final acceptance audit

## First executed engineering result

Run 37775714245 completed the full training stage successfully before one test assertion exposed OpenML's categorical target dtype. The implementation result itself was:

- dataset SHA256: `b7efcb35a428bbe22347a05d2437d9177bab07ce61e51214a17bec584ad9496d`
- rows: 284,807
- fraud rows: 492 (0.172749%)
- train / validation / test: 199,364 / 42,721 / 42,722
- fraud rows: 344 / 74 / 74
- always-legitimate accuracy: 99.827251%
- selected model: Class-weighted Random Forest
- training 3-fold Average Precision: 0.836031
- chosen validation threshold: 0.673629
- final test precision: 0.887097
- final test recall: 0.743243
- final test F1: 0.808824
- final test Average Precision: 0.787441
- final test ROC-AUC: 0.964309
- confusion matrix: [[42641, 7], [19, 55]]

The failed assertion was not a model failure: OpenML exposes `Class` as a pandas categorical column in the raw parquet. The test has been corrected to cast the target before summing.
