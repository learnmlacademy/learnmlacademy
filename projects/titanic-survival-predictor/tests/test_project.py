"""Verify the completed project without fitting or changing the saved artifacts.

After adding data/train.csv and running src/train_model.py, use:
    python -m unittest discover -s tests -v
"""

import hashlib
import importlib.util
import json
import os
from pathlib import Path
import unittest
from unittest.mock import patch

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from streamlit.testing.v1 import AppTest

os.environ.setdefault('MPLBACKEND', 'Agg')

ROOT = Path(__file__).resolve().parents[1]
FEATURES = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']
NUMERIC = ['Age', 'SibSp', 'Parch', 'Fare']
CATEGORICAL = ['Pclass', 'Sex', 'Embarked']
CSV_COLUMNS = [
    'PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age',
    'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked',
]


def load_training_module():
    spec = importlib.util.spec_from_file_location('titanic_train_model', ROOT / 'src' / 'train_model.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class CompletedProjectTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.training = load_training_module()
        cls.data = pd.read_csv(ROOT / 'data' / 'train.csv')
        cls.report = json.loads((ROOT / 'outputs' / 'metrics.json').read_text(encoding='utf-8'))
        # This file was produced locally by this project, not uploaded by a stranger.
        cls.pipeline = joblib.load(ROOT / 'models' / 'titanic_pipeline.joblib')
        cls.examples = pd.read_csv(ROOT / 'outputs' / 'example_predictions.csv')
        cls.X_train, cls.X_test, cls.y_train, cls.y_test = cls.training.load_and_split()

    def test_original_training_table_schema_and_recorded_fingerprint(self):
        self.assertEqual(self.data.shape, (891, 12))
        self.assertEqual(self.data.columns.tolist(), CSV_COLUMNS)
        self.assertTrue(self.data['PassengerId'].is_unique)
        self.assertEqual(set(self.data['Survived'].unique()), {0, 1})
        digest = hashlib.sha256((ROOT / 'data' / 'train.csv').read_bytes()).hexdigest()
        self.assertEqual(digest, self.report['data_sha256'])

    def test_split_is_disjoint_complete_stratified_and_has_exact_features(self):
        self.assertEqual(self.X_train.shape, (712, 7))
        self.assertEqual(self.X_test.shape, (179, 7))
        self.assertEqual(self.X_train.columns.tolist(), FEATURES)
        self.assertEqual(self.X_test.columns.tolist(), FEATURES)
        self.assertEqual(self.report['features'], FEATURES)
        self.assertEqual(self.report['training_rows'], 712)
        self.assertEqual(self.report['test_rows'], 179)
        self.assertEqual(self.report['seed'], self.training.SEED)
        self.assertEqual(set(self.X_train.index) & set(self.X_test.index), set())
        self.assertEqual(set(self.X_train.index) | set(self.X_test.index), set(self.data.index))
        pd.testing.assert_index_equal(self.X_train.index, self.y_train.index)
        pd.testing.assert_index_equal(self.X_test.index, self.y_test.index)
        pd.testing.assert_series_equal(self.y_train, self.data.loc[self.X_train.index, 'Survived'])
        pd.testing.assert_series_equal(self.y_test, self.data.loc[self.X_test.index, 'Survived'])
        self.assertLess(abs(self.y_train.mean() - self.y_test.mean()), 0.01)

    def test_pipeline_contains_numeric_and_categorical_preprocessing(self):
        self.assertIsInstance(self.pipeline, Pipeline)
        self.assertEqual(list(self.pipeline.named_steps), ['prepare', 'model'])
        self.assertEqual(self.pipeline.feature_names_in_.tolist(), FEATURES)
        prepare = self.pipeline.named_steps['prepare']
        self.assertIsInstance(prepare, ColumnTransformer)
        column_groups = {name: columns for name, _, columns in prepare.transformers_}
        self.assertEqual(column_groups['numbers'], NUMERIC)
        self.assertEqual(column_groups['categories'], CATEGORICAL)
        numbers = prepare.named_transformers_['numbers']
        categories = prepare.named_transformers_['categories']
        self.assertIsInstance(numbers.named_steps['fill_missing'], SimpleImputer)
        self.assertEqual(numbers.named_steps['fill_missing'].strategy, 'median')
        self.assertIsInstance(numbers.named_steps['scale'], StandardScaler)
        self.assertIsInstance(categories.named_steps['fill_missing'], SimpleImputer)
        self.assertEqual(categories.named_steps['fill_missing'].strategy, 'most_frequent')
        self.assertIsInstance(categories.named_steps['encode'], OneHotEncoder)
        self.assertEqual(categories.named_steps['encode'].handle_unknown, 'ignore')

    def test_saved_preprocessing_statistics_come_from_training_rows(self):
        prepare = self.pipeline.named_steps['prepare']
        numbers = prepare.named_transformers_['numbers']
        training_medians = self.X_train[NUMERIC].median()
        np.testing.assert_allclose(numbers.named_steps['fill_missing'].statistics_, training_medians)
        filled_training = self.X_train[NUMERIC].fillna(training_medians)
        np.testing.assert_allclose(numbers.named_steps['scale'].mean_, filled_training.mean())
        self.assertEqual(int(numbers.named_steps['scale'].n_samples_seen_), len(self.X_train))
        categories = prepare.named_transformers_['categories']
        for column, statistic in zip(CATEGORICAL, categories.named_steps['fill_missing'].statistics_):
            with self.subTest(column=column):
                self.assertEqual(statistic, self.X_train[column].mode().iloc[0])

    def test_five_candidate_families_and_training_cv_comparison(self):
        expected = {
            'Logistic Regression': LogisticRegression,
            'K-Nearest Neighbors': KNeighborsClassifier,
            'Support Vector Machine': SVC,
            'Decision Tree': DecisionTreeClassifier,
            'Random Forest': RandomForestClassifier,
        }
        candidates = self.training.make_candidates()
        self.assertEqual(set(candidates), set(expected))
        for name, classifier_type in expected.items():
            with self.subTest(model=name):
                self.assertIsInstance(candidates[name], classifier_type)
        comparison = pd.read_csv(ROOT / 'outputs' / 'model_comparison.csv')
        self.assertEqual(len(comparison), 5)
        self.assertEqual(set(comparison['model']), set(expected))
        self.assertTrue(comparison['f1'].is_monotonic_decreasing)
        for metric in ['accuracy', 'precision', 'recall', 'f1']:
            self.assertTrue(comparison[metric].between(0, 1).all())
        self.assertEqual(self.report['selected_model'], comparison.iloc[0]['model'])
        self.assertIsInstance(self.pipeline.named_steps['model'], expected[self.report['selected_model']])

    def test_loaded_model_reproduces_saved_example_predictions(self):
        features = self.examples[FEATURES]
        predictions = self.pipeline.predict(features)
        np.testing.assert_array_equal(predictions, self.examples['prediction'].to_numpy())
        # These two completed-project examples intentionally exercise opposite labels.
        self.assertEqual(predictions.tolist(), [1, 0])
        self.assertEqual(self.pipeline.classes_.tolist(), [0, 1])
        positive_index = list(self.pipeline.classes_).index(1)
        probabilities = self.pipeline.predict_proba(features)[:, positive_index]
        np.testing.assert_allclose(probabilities, self.examples['survival_probability'], rtol=0, atol=1e-12)

    def test_manual_confusion_counts_and_metrics_match_saved_report(self):
        # Predict only: never call evaluate_final(), which writes charts, or fit().
        actual = self.y_test.to_numpy()
        predicted = self.pipeline.predict(self.X_test)
        tn = int(((actual == 0) & (predicted == 0)).sum())
        fp = int(((actual == 0) & (predicted == 1)).sum())
        fn = int(((actual == 1) & (predicted == 0)).sum())
        tp = int(((actual == 1) & (predicted == 1)).sum())
        self.assertEqual([[tn, fp], [fn, tp]], self.report['confusion_matrix'])
        self.assertEqual(tn + fp + fn + tp, 179)
        calculated = {
            'accuracy': (tn + tp) / (tn + fp + fn + tp),
            'precision': tp / (tp + fp) if tp + fp else 0,
            'recall': tp / (tp + fn) if tp + fn else 0,
            'f1': 2 * tp / (2 * tp + fp + fn) if 2 * tp + fp + fn else 0,
        }
        for name, value in calculated.items():
            with self.subTest(metric=name):
                self.assertAlmostEqual(value, self.report['test_metrics'][name], places=12)
        majority_label = self.y_train.mode().iloc[0]
        baseline = float((self.y_test == majority_label).mean())
        self.assertAlmostEqual(baseline, self.report['majority_baseline_test_accuracy'], places=12)

    def test_batch_accepts_missing_values_and_unseen_categories(self):
        rows = pd.DataFrame([
            {'Pclass': 3, 'Sex': 'male', 'Age': np.nan, 'SibSp': 0, 'Parch': 0, 'Fare': np.nan, 'Embarked': np.nan},
            {'Pclass': 4, 'Sex': 'unseen', 'Age': 22.0, 'SibSp': 1, 'Parch': 0, 'Fare': 7.25, 'Embarked': 'unseen'},
            {'Pclass': np.nan, 'Sex': np.nan, 'Age': np.nan, 'SibSp': np.nan, 'Parch': np.nan, 'Fare': np.nan, 'Embarked': np.nan},
        ], columns=FEATURES)
        transformed = self.pipeline.named_steps['prepare'].transform(rows)
        self.assertEqual(transformed.shape, (3, 12))
        self.assertTrue(np.isfinite(transformed).all())
        predicted = self.pipeline.predict(rows)
        self.assertEqual(predicted.shape, (3,))
        self.assertTrue(set(predicted).issubset({0, 1}))
        probabilities = self.pipeline.predict_proba(rows)
        self.assertTrue(np.isfinite(probabilities).all())
        self.assertTrue(((probabilities >= 0) & (probabilities <= 1)).all())
        np.testing.assert_allclose(probabilities.sum(axis=1), 1)

    def test_absent_feature_column_is_rejected_not_silently_guessed(self):
        # Missing cell values are supported; a missing input field is a schema error.
        with self.assertRaises(ValueError):
            self.pipeline.predict(self.examples[FEATURES].drop(columns='Age'))


class StreamlitAppTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.examples = pd.read_csv(ROOT / 'outputs' / 'example_predictions.csv')
        cls.pipeline = joblib.load(ROOT / 'models' / 'titanic_pipeline.joblib')

    def open_app(self):
        app = AppTest.from_file(str(ROOT / 'app.py'), default_timeout=30).run()
        self.assertEqual(len(app.exception), 0, [error.message for error in app.exception])
        return app

    def submit_passenger(self, app, passenger, age_unknown=False):
        app.selectbox(key='pclass').set_value(int(passenger['Pclass']))
        app.selectbox(key='sex').set_value(passenger['Sex'])
        app.number_input(key='age').set_value(float(passenger['Age']))
        app.checkbox(key='age_unknown').set_value(age_unknown)
        app.number_input(key='sibsp').set_value(int(passenger['SibSp']))
        app.number_input(key='parch').set_value(int(passenger['Parch']))
        app.number_input(key='fare').set_value(float(passenger['Fare']))
        app.selectbox(key='embarked').set_value(passenger['Embarked'])
        buttons = [button for button in app.button if button.label == 'Predict survival']
        self.assertEqual(len(buttons), 1)
        buttons[0].click().run()
        self.assertEqual(len(app.exception), 0, [error.message for error in app.exception])
        return app

    def assert_estimate(self, app, probability):
        metrics = [metric for metric in app.metric if metric.label == 'Model survival estimate']
        self.assertEqual(len(metrics), 1)
        self.assertEqual(metrics[0].value, f'{probability:.1%}')

    def test_form_returns_both_contrasting_saved_example_predictions(self):
        app = self.open_app()
        self.assertEqual(len(app.metric), 0, 'Do not show a prediction before submitting the form.')
        for _, passenger in self.examples.iterrows():
            with self.subTest(prediction=int(passenger['prediction'])):
                self.submit_passenger(app, passenger)
                if passenger['prediction'] == 1:
                    self.assertIn('Model prediction: Survived', [message.value for message in app.success])
                    self.assertEqual(len(app.info), 0)
                else:
                    self.assertIn('Model prediction: Did Not Survive', [message.value for message in app.info])
                    self.assertEqual(len(app.success), 0)
                self.assert_estimate(app, passenger['survival_probability'])
                self.assertEqual(app.dataframe[0].value.columns.tolist(), FEATURES)
                np.testing.assert_allclose(app.dataframe[0].value[NUMERIC].to_numpy(dtype=float),
                                           passenger[NUMERIC].to_numpy(dtype=float).reshape(1, -1))

    def test_unknown_age_is_sent_as_missing_and_still_predicts(self):
        passenger = self.examples.iloc[0]
        app = self.submit_passenger(self.open_app(), passenger, age_unknown=True)
        self.assertTrue(pd.isna(app.dataframe[0].value.iloc[0]['Age']))
        expected_input = self.examples.iloc[[0]][FEATURES].copy()
        expected_input.loc[:, 'Age'] = np.nan
        positive_index = list(self.pipeline.classes_).index(1)
        probability = self.pipeline.predict_proba(expected_input)[0, positive_index]
        self.assert_estimate(app, probability)
        self.assertTrue(any('saved training median' in caption.value for caption in app.caption))

    def test_missing_model_shows_training_instruction_without_mutating_files(self):
        model_path = ROOT / 'models' / 'titanic_pipeline.joblib'
        original_is_file = Path.is_file
        checked_missing_model = []

        def pretend_only_model_is_absent(path):
            if path == model_path:
                checked_missing_model.append(path)
                return False
            return original_is_file(path)

        # Simulate absence for the app's existence check; never move/delete the model.
        with patch.object(Path, 'is_file', autospec=True, side_effect=pretend_only_model_is_absent):
            app = self.open_app()
        self.assertTrue(checked_missing_model)
        self.assertTrue(any('saved model is missing' in message.value.lower() for message in app.error))
        self.assertIn('python src/train_model.py', [code.value for code in app.code])
        self.assertEqual(len(app.button), 0)
        self.assertEqual(len(app.metric), 0)
        self.assertTrue(model_path.is_file())


if __name__ == '__main__':
    unittest.main()
