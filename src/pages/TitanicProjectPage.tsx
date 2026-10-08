import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FolderTree, Target, Wrench } from 'lucide-react';
import {
  HandbookActions,
  HandbookCode,
  HandbookSection,
  HandbookTable,
  Screenshot,
} from '../components/projects/HandbookPrimitives';
import { projectPortfolioById } from '../data/projectPortfolio';

const requirementsCode = "# Tested together on Windows x64 with Python 3.13.16.\npandas==3.0.6\nnumpy==2.5.3\nscikit-learn==1.9.1\nmatplotlib==3.11.2\njoblib==1.6.0\nstreamlit==1.65.0\njupyterlab==4.6.4\nnbclient==0.11.0\n";
const trainingCode = "\"\"\"Train the Titanic pipeline from the project root: python src/train_model.py.\"\"\"\n\n# handbook: imports\nfrom pathlib import Path\nimport json\nimport platform\nimport hashlib\nimport joblib\nimport matplotlib.pyplot as plt\nimport pandas as pd\nimport sklearn\nfrom sklearn.base import clone\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.svm import SVC\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate, GridSearchCV\nfrom sklearn.metrics import (\n    accuracy_score, precision_score, recall_score, f1_score,\n    confusion_matrix, ConfusionMatrixDisplay, make_scorer,\n)\n\n# handbook: data\nROOT = Path(__file__).resolve().parents[1]\nFEATURES = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']\nNUMERIC = ['Age', 'SibSp', 'Parch', 'Fare']\nCATEGORICAL = ['Pclass', 'Sex', 'Embarked']\nSEED = 42\n\n\ndef load_and_split():\n    data_path = ROOT / 'data' / 'train.csv'\n    if not data_path.is_file():\n        raise FileNotFoundError('Put Kaggle Titanic train.csv inside the data folder first.')\n    df = pd.read_csv(data_path)\n    required = set(FEATURES + ['Survived'])\n    if not required.issubset(df.columns):\n        raise ValueError('Wrong CSV: train.csv must include the features and Survived.')\n    if len(df) != 891 or df.shape[1] != 12:\n        raise ValueError('This handbook expects the original 891-row, 12-column train.csv.')\n    if df['Survived'].isna().any() or set(df['Survived'].unique()) != {0, 1}:\n        raise ValueError('Survived must contain only the known labels 0 and 1.')\n    X = df[FEATURES]\n    y = df['Survived']\n    return train_test_split(X, y, test_size=0.2, stratify=y, random_state=SEED)\n\n\n# handbook: numeric\ndef make_preprocessor():\n    numeric_steps = Pipeline([\n        ('fill_missing', SimpleImputer(strategy='median')),\n        ('scale', StandardScaler()),\n    ])\n    # handbook: categorical\n    categorical_steps = Pipeline([\n        ('fill_missing', SimpleImputer(strategy='most_frequent')),\n        ('encode', OneHotEncoder(handle_unknown='ignore', sparse_output=False)),\n    ])\n    # handbook: combine\n    return ColumnTransformer([\n        ('numbers', numeric_steps, NUMERIC),\n        ('categories', categorical_steps, CATEGORICAL),\n    ])\n\n\n# handbook: models\ndef make_candidates():\n    return {\n        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=SEED),\n        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=7),\n        'Support Vector Machine': SVC(C=1.0, kernel='rbf', random_state=SEED),\n        'Decision Tree': DecisionTreeClassifier(max_depth=5, random_state=SEED),\n        'Random Forest': RandomForestClassifier(n_estimators=200, min_samples_leaf=2, random_state=SEED),\n    }\n\n\ndef make_pipeline(model):\n    return Pipeline([('prepare', make_preprocessor()), ('model', clone(model))])\n\n\n# handbook: compare\nSCORING = {\n    'accuracy': 'accuracy',\n    'precision': make_scorer(precision_score, zero_division=0),\n    'recall': make_scorer(recall_score, zero_division=0),\n    'f1': make_scorer(f1_score, zero_division=0),\n}\n\n\ndef compare_models(X_train, y_train):\n    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=SEED)\n    rows = []\n    for name, model in make_candidates().items():\n        print(f'Comparing {name} ...', flush=True)\n        scores = cross_validate(\n            make_pipeline(model), X_train, y_train,\n            cv=cv, scoring=SCORING, error_score='raise',\n        )\n        row = {'model': name}\n        for metric in SCORING:\n            row[metric] = float(scores[f'test_{metric}'].mean())\n        row['f1_std'] = float(scores['test_f1'].std())\n        rows.append(row)\n    comparison = pd.DataFrame(rows).sort_values('f1', ascending=False, kind='stable')\n    comparison.to_csv(ROOT / 'outputs' / 'model_comparison.csv', index=False)\n    print(comparison.to_string(index=False, float_format=lambda value: f'{value:.4f}'))\n    return comparison\n\n\n# handbook: tune\ndef tune_winner(name, X_train, y_train):\n    grids = {\n        'Logistic Regression': {'model__C': [0.1, 1.0, 10.0]},\n        'K-Nearest Neighbors': {'model__n_neighbors': [5, 7, 11], 'model__weights': ['uniform', 'distance']},\n        'Support Vector Machine': {'model__C': [0.5, 1.0, 3.0], 'model__gamma': ['scale', 0.1]},\n        'Decision Tree': {'model__max_depth': [3, 5, 8], 'model__min_samples_leaf': [1, 4]},\n        'Random Forest': {'model__max_depth': [5, 8, None], 'model__min_samples_leaf': [1, 2, 4]},\n    }\n    search = GridSearchCV(\n        make_pipeline(make_candidates()[name]), grids[name],\n        scoring=SCORING, refit='f1',\n        cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=SEED),\n        error_score='raise',\n    )\n    search.fit(X_train, y_train)\n    pd.DataFrame(search.cv_results_).to_csv(ROOT / 'outputs' / 'tuning_results.csv', index=False)\n    print('Selected by mean CV F1:', name)\n    print('Best settings:', search.best_params_)\n    print(f'Best tuning CV F1: {search.best_score_:.4f}')\n    return search\n\n\n# handbook: evaluate\ndef evaluate_final(pipeline, X_test, y_test):\n    predictions = pipeline.predict(X_test)\n    metrics = {\n        'accuracy': accuracy_score(y_test, predictions),\n        'precision': precision_score(y_test, predictions, zero_division=0),\n        'recall': recall_score(y_test, predictions, zero_division=0),\n        'f1': f1_score(y_test, predictions, zero_division=0),\n    }\n    matrix = confusion_matrix(y_test, predictions, labels=[0, 1])\n    print('Final held-out test (179 passengers):')\n    for name, value in metrics.items():\n        print(f'  {name}: {value:.4f}')\n    print('Confusion matrix (rows actual, columns predicted; order 0, 1):')\n    print(matrix)\n    fig, ax = plt.subplots(figsize=(7, 5))\n    ConfusionMatrixDisplay(matrix, display_labels=['Did not survive (0)', 'Survived (1)']).plot(\n        ax=ax, cmap='Blues', colorbar=False, values_format='d',\n    )\n    ax.set_title('Final held-out test: 179 passengers')\n    fig.tight_layout()\n    fig.savefig(ROOT / 'outputs' / 'confusion_matrix.png', dpi=160)\n    plt.close(fig)\n    return metrics, matrix.tolist()\n\n\n# handbook: save\ndef save_and_reload(pipeline):\n    model_path = ROOT / 'models' / 'titanic_pipeline.joblib'\n    model_path.parent.mkdir(exist_ok=True)\n    joblib.dump(pipeline, model_path)\n    # Only load a file you made or trust. joblib is not a safe format for strangers' files.\n    reloaded = joblib.load(model_path)\n    examples = pd.DataFrame([\n        {'Pclass': 1, 'Sex': 'female', 'Age': 29.0, 'SibSp': 0, 'Parch': 0, 'Fare': 80.0, 'Embarked': 'S'},\n        {'Pclass': 3, 'Sex': 'male', 'Age': 35.0, 'SibSp': 0, 'Parch': 0, 'Fare': 8.0, 'Embarked': 'S'},\n    ])[FEATURES]\n    before = pipeline.predict(examples)\n    after = reloaded.predict(examples)\n    assert (before == after).all(), 'Saved and reloaded predictions differ.'\n    examples['prediction'] = after\n    if hasattr(reloaded, 'predict_proba'):\n        positive_index = list(reloaded.classes_).index(1)\n        examples['survival_probability'] = reloaded.predict_proba(examples.drop(columns='prediction'))[:, positive_index]\n    examples.to_csv(ROOT / 'outputs' / 'example_predictions.csv', index=False)\n    print('Saved and reloaded: models/titanic_pipeline.joblib')\n    print(examples.to_string(index=False))\n\n\n# handbook: run\ndef main():\n    X_train, X_test, y_train, y_test = load_and_split()\n    print(f'Training rows: {len(X_train)} | Final test rows: {len(X_test)}')\n    print(f'Training survival rate: {y_train.mean():.4f}')\n    prepared = make_preprocessor().fit_transform(X_train)\n    print(f'Prepared training shape: {prepared.shape}')\n    print('Candidates:', ', '.join(make_candidates()))\n    (ROOT / 'outputs').mkdir(exist_ok=True)\n    comparison = compare_models(X_train, y_train)\n    name = comparison.iloc[0]['model']\n    search = tune_winner(name, X_train, y_train)\n    # GridSearchCV refits the winning settings on all 712 training rows, not the holdout.\n    final_pipeline = search.best_estimator_\n    metrics, matrix = evaluate_final(final_pipeline, X_test, y_test)\n    save_and_reload(final_pipeline)\n    report = {\n        'python': platform.python_version(), 'scikit_learn': sklearn.__version__,\n        'data_sha256': hashlib.sha256((ROOT / 'data' / 'train.csv').read_bytes()).hexdigest(),\n        'features': FEATURES, 'seed': SEED, 'training_rows': len(X_train), 'test_rows': len(X_test),\n        'selected_model': name, 'best_params': search.best_params_,\n        'best_cv_f1': float(search.best_score_), 'test_metrics': metrics, 'confusion_matrix': matrix,\n        'majority_baseline_test_accuracy': float((y_test == y_train.mode()[0]).mean()),\n    }\n    (ROOT / 'outputs' / 'metrics.json').write_text(json.dumps(report, indent=2) + '\\n', encoding='utf-8')\n    fig, ax = plt.subplots(figsize=(8, 4))\n    ax.barh(comparison['model'], comparison['f1'], xerr=comparison['f1_std'], color='#0f766e', capsize=4)\n    ax.invert_yaxis()\n    ax.set(xlabel='Mean F1 (five training-only folds)', xlim=(0, 1), title='Model comparison before tuning')\n    fig.tight_layout()\n    fig.savefig(ROOT / 'outputs' / 'model_comparison.png', dpi=150)\n    plt.close(fig)\n\n\nif __name__ == '__main__':\n    main()\n";
const appCode = "\"\"\"Run from the project root with: python -m streamlit run app.py\"\"\"\n\n# handbook: load\nfrom pathlib import Path\nimport joblib\nimport numpy as np\nimport pandas as pd\nimport streamlit as st\n\nROOT = Path(__file__).resolve().parent\nMODEL_PATH = ROOT / 'models' / 'titanic_pipeline.joblib'\nFEATURES = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']\n\nst.set_page_config(page_title='Titanic Survival Predictor', page_icon='🚢', layout='centered')\nst.title('Can you survive the Titanic?')\nst.write('Build a passenger profile, then ask the trained model for a prediction.')\nst.caption('Educational experiment • historical data • not a statement of anyone’s actual fate')\n\nif not MODEL_PATH.is_file():\n    st.error('The saved model is missing. Train it before using this app.')\n    st.code('python src/train_model.py', language='powershell')\n    st.write('Run that command in your project terminal, wait for it to finish, then refresh this page.')\n    st.stop()\n\n\n@st.cache_resource\ndef load_pipeline(modified_ns):\n    # modified_ns invalidates the cache if you retrain and overwrite the model.\n    # Never load a joblib file supplied by someone you do not trust.\n    return joblib.load(MODEL_PATH)\n\n\npipeline = load_pipeline(MODEL_PATH.stat().st_mtime_ns)\n\n# handbook: form\nwith st.form('passenger'):\n    left, right = st.columns(2)\n    with left:\n        pclass = st.selectbox('Ticket class', [1, 2, 3], format_func=lambda value: f'Class {value}', key='pclass')\n        sex = st.selectbox('Sex recorded in the dataset', ['female', 'male'], key='sex')\n        age = st.number_input('Age in years', min_value=0.0, max_value=100.0, value=29.0, step=0.5, key='age')\n        age_unknown = st.checkbox('Age is unknown', key='age_unknown')\n    with right:\n        sibsp = st.number_input('Siblings / spouses aboard', min_value=0, max_value=8, value=0, step=1, key='sibsp')\n        parch = st.number_input('Parents / children aboard', min_value=0, max_value=6, value=0, step=1, key='parch')\n        fare = st.number_input('Ticket fare (historical pounds)', min_value=0.0, max_value=600.0, value=80.0, step=1.0, key='fare')\n        embarked = st.selectbox('Boarding port', ['S', 'C', 'Q'],\n            format_func=lambda value: {'S': 'Southampton', 'C': 'Cherbourg', 'Q': 'Queenstown'}[value], key='embarked')\n    submitted = st.form_submit_button('Predict survival', type='primary')\n\n# handbook: predict\nif submitted:\n    passenger = pd.DataFrame([{\n        'Pclass': pclass, 'Sex': sex, 'Age': np.nan if age_unknown else age,\n        'SibSp': sibsp, 'Parch': parch, 'Fare': fare, 'Embarked': embarked,\n    }])[FEATURES]\n    prediction = int(pipeline.predict(passenger)[0])\n    if prediction == 1:\n        st.success('Model prediction: Survived')\n    else:\n        st.info('Model prediction: Did Not Survive')\n    if hasattr(pipeline, 'predict_proba'):\n        positive_index = list(pipeline.classes_).index(1)\n        probability = float(pipeline.predict_proba(passenger)[0, positive_index])\n        st.metric('Model survival estimate', f'{probability:.1%}')\n        st.caption('This is a model score, not a calibrated guarantee or historical certainty.')\n    st.write('Inputs sent to the complete saved pipeline:')\n    st.dataframe(passenger, hide_index=True)\n    if age_unknown:\n        st.caption('Unknown age was passed as a missing value; the saved training median filled it.')\n\nst.divider()\nst.caption('The model uses seven fields. It cannot know lifeboat access, chance, or the full historical circumstances. Do not use it for real safety decisions.')\n";
const testCode = "\"\"\"Verify the completed project without fitting or changing the saved artifacts.\n\nAfter adding data/train.csv and running src/train_model.py, use:\n    python -m unittest discover -s tests -v\n\"\"\"\n\nimport hashlib\nimport importlib.util\nimport json\nimport os\nfrom pathlib import Path\nimport unittest\nfrom unittest.mock import patch\n\nimport joblib\nimport numpy as np\nimport pandas as pd\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\nfrom sklearn.svm import SVC\nfrom sklearn.tree import DecisionTreeClassifier\nfrom streamlit.testing.v1 import AppTest\n\nos.environ.setdefault('MPLBACKEND', 'Agg')\n\nROOT = Path(__file__).resolve().parents[1]\nFEATURES = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']\nNUMERIC = ['Age', 'SibSp', 'Parch', 'Fare']\nCATEGORICAL = ['Pclass', 'Sex', 'Embarked']\nCSV_COLUMNS = [\n    'PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age',\n    'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked',\n]\n\n\ndef load_training_module():\n    spec = importlib.util.spec_from_file_location('titanic_train_model', ROOT / 'src' / 'train_model.py')\n    module = importlib.util.module_from_spec(spec)\n    spec.loader.exec_module(module)\n    return module\n\n\nclass CompletedProjectTests(unittest.TestCase):\n    @classmethod\n    def setUpClass(cls):\n        cls.training = load_training_module()\n        cls.data = pd.read_csv(ROOT / 'data' / 'train.csv')\n        cls.report = json.loads((ROOT / 'outputs' / 'metrics.json').read_text(encoding='utf-8'))\n        # This file was produced locally by this project, not uploaded by a stranger.\n        cls.pipeline = joblib.load(ROOT / 'models' / 'titanic_pipeline.joblib')\n        cls.examples = pd.read_csv(ROOT / 'outputs' / 'example_predictions.csv')\n        cls.X_train, cls.X_test, cls.y_train, cls.y_test = cls.training.load_and_split()\n\n    def test_original_training_table_schema_and_recorded_fingerprint(self):\n        self.assertEqual(self.data.shape, (891, 12))\n        self.assertEqual(self.data.columns.tolist(), CSV_COLUMNS)\n        self.assertTrue(self.data['PassengerId'].is_unique)\n        self.assertEqual(set(self.data['Survived'].unique()), {0, 1})\n        digest = hashlib.sha256((ROOT / 'data' / 'train.csv').read_bytes()).hexdigest()\n        self.assertEqual(digest, self.report['data_sha256'])\n\n    def test_split_is_disjoint_complete_stratified_and_has_exact_features(self):\n        self.assertEqual(self.X_train.shape, (712, 7))\n        self.assertEqual(self.X_test.shape, (179, 7))\n        self.assertEqual(self.X_train.columns.tolist(), FEATURES)\n        self.assertEqual(self.X_test.columns.tolist(), FEATURES)\n        self.assertEqual(self.report['features'], FEATURES)\n        self.assertEqual(self.report['training_rows'], 712)\n        self.assertEqual(self.report['test_rows'], 179)\n        self.assertEqual(self.report['seed'], self.training.SEED)\n        self.assertEqual(set(self.X_train.index) & set(self.X_test.index), set())\n        self.assertEqual(set(self.X_train.index) | set(self.X_test.index), set(self.data.index))\n        pd.testing.assert_index_equal(self.X_train.index, self.y_train.index)\n        pd.testing.assert_index_equal(self.X_test.index, self.y_test.index)\n        pd.testing.assert_series_equal(self.y_train, self.data.loc[self.X_train.index, 'Survived'])\n        pd.testing.assert_series_equal(self.y_test, self.data.loc[self.X_test.index, 'Survived'])\n        self.assertLess(abs(self.y_train.mean() - self.y_test.mean()), 0.01)\n\n    def test_pipeline_contains_numeric_and_categorical_preprocessing(self):\n        self.assertIsInstance(self.pipeline, Pipeline)\n        self.assertEqual(list(self.pipeline.named_steps), ['prepare', 'model'])\n        self.assertEqual(self.pipeline.feature_names_in_.tolist(), FEATURES)\n        prepare = self.pipeline.named_steps['prepare']\n        self.assertIsInstance(prepare, ColumnTransformer)\n        column_groups = {name: columns for name, _, columns in prepare.transformers_}\n        self.assertEqual(column_groups['numbers'], NUMERIC)\n        self.assertEqual(column_groups['categories'], CATEGORICAL)\n        numbers = prepare.named_transformers_['numbers']\n        categories = prepare.named_transformers_['categories']\n        self.assertIsInstance(numbers.named_steps['fill_missing'], SimpleImputer)\n        self.assertEqual(numbers.named_steps['fill_missing'].strategy, 'median')\n        self.assertIsInstance(numbers.named_steps['scale'], StandardScaler)\n        self.assertIsInstance(categories.named_steps['fill_missing'], SimpleImputer)\n        self.assertEqual(categories.named_steps['fill_missing'].strategy, 'most_frequent')\n        self.assertIsInstance(categories.named_steps['encode'], OneHotEncoder)\n        self.assertEqual(categories.named_steps['encode'].handle_unknown, 'ignore')\n\n    def test_saved_preprocessing_statistics_come_from_training_rows(self):\n        prepare = self.pipeline.named_steps['prepare']\n        numbers = prepare.named_transformers_['numbers']\n        training_medians = self.X_train[NUMERIC].median()\n        np.testing.assert_allclose(numbers.named_steps['fill_missing'].statistics_, training_medians)\n        filled_training = self.X_train[NUMERIC].fillna(training_medians)\n        np.testing.assert_allclose(numbers.named_steps['scale'].mean_, filled_training.mean())\n        self.assertEqual(int(numbers.named_steps['scale'].n_samples_seen_), len(self.X_train))\n        categories = prepare.named_transformers_['categories']\n        for column, statistic in zip(CATEGORICAL, categories.named_steps['fill_missing'].statistics_):\n            with self.subTest(column=column):\n                self.assertEqual(statistic, self.X_train[column].mode().iloc[0])\n\n    def test_five_candidate_families_and_training_cv_comparison(self):\n        expected = {\n            'Logistic Regression': LogisticRegression,\n            'K-Nearest Neighbors': KNeighborsClassifier,\n            'Support Vector Machine': SVC,\n            'Decision Tree': DecisionTreeClassifier,\n            'Random Forest': RandomForestClassifier,\n        }\n        candidates = self.training.make_candidates()\n        self.assertEqual(set(candidates), set(expected))\n        for name, classifier_type in expected.items():\n            with self.subTest(model=name):\n                self.assertIsInstance(candidates[name], classifier_type)\n        comparison = pd.read_csv(ROOT / 'outputs' / 'model_comparison.csv')\n        self.assertEqual(len(comparison), 5)\n        self.assertEqual(set(comparison['model']), set(expected))\n        self.assertTrue(comparison['f1'].is_monotonic_decreasing)\n        for metric in ['accuracy', 'precision', 'recall', 'f1']:\n            self.assertTrue(comparison[metric].between(0, 1).all())\n        self.assertEqual(self.report['selected_model'], comparison.iloc[0]['model'])\n        self.assertIsInstance(self.pipeline.named_steps['model'], expected[self.report['selected_model']])\n\n    def test_loaded_model_reproduces_saved_example_predictions(self):\n        features = self.examples[FEATURES]\n        predictions = self.pipeline.predict(features)\n        np.testing.assert_array_equal(predictions, self.examples['prediction'].to_numpy())\n        # These two completed-project examples intentionally exercise opposite labels.\n        self.assertEqual(predictions.tolist(), [1, 0])\n        self.assertEqual(self.pipeline.classes_.tolist(), [0, 1])\n        positive_index = list(self.pipeline.classes_).index(1)\n        probabilities = self.pipeline.predict_proba(features)[:, positive_index]\n        np.testing.assert_allclose(probabilities, self.examples['survival_probability'], rtol=0, atol=1e-12)\n\n    def test_manual_confusion_counts_and_metrics_match_saved_report(self):\n        # Predict only: never call evaluate_final(), which writes charts, or fit().\n        actual = self.y_test.to_numpy()\n        predicted = self.pipeline.predict(self.X_test)\n        tn = int(((actual == 0) & (predicted == 0)).sum())\n        fp = int(((actual == 0) & (predicted == 1)).sum())\n        fn = int(((actual == 1) & (predicted == 0)).sum())\n        tp = int(((actual == 1) & (predicted == 1)).sum())\n        self.assertEqual([[tn, fp], [fn, tp]], self.report['confusion_matrix'])\n        self.assertEqual(tn + fp + fn + tp, 179)\n        calculated = {\n            'accuracy': (tn + tp) / (tn + fp + fn + tp),\n            'precision': tp / (tp + fp) if tp + fp else 0,\n            'recall': tp / (tp + fn) if tp + fn else 0,\n            'f1': 2 * tp / (2 * tp + fp + fn) if 2 * tp + fp + fn else 0,\n        }\n        for name, value in calculated.items():\n            with self.subTest(metric=name):\n                self.assertAlmostEqual(value, self.report['test_metrics'][name], places=12)\n        majority_label = self.y_train.mode().iloc[0]\n        baseline = float((self.y_test == majority_label).mean())\n        self.assertAlmostEqual(baseline, self.report['majority_baseline_test_accuracy'], places=12)\n\n    def test_batch_accepts_missing_values_and_unseen_categories(self):\n        rows = pd.DataFrame([\n            {'Pclass': 3, 'Sex': 'male', 'Age': np.nan, 'SibSp': 0, 'Parch': 0, 'Fare': np.nan, 'Embarked': np.nan},\n            {'Pclass': 4, 'Sex': 'unseen', 'Age': 22.0, 'SibSp': 1, 'Parch': 0, 'Fare': 7.25, 'Embarked': 'unseen'},\n            {'Pclass': np.nan, 'Sex': np.nan, 'Age': np.nan, 'SibSp': np.nan, 'Parch': np.nan, 'Fare': np.nan, 'Embarked': np.nan},\n        ], columns=FEATURES)\n        transformed = self.pipeline.named_steps['prepare'].transform(rows)\n        self.assertEqual(transformed.shape, (3, 12))\n        self.assertTrue(np.isfinite(transformed).all())\n        predicted = self.pipeline.predict(rows)\n        self.assertEqual(predicted.shape, (3,))\n        self.assertTrue(set(predicted).issubset({0, 1}))\n        probabilities = self.pipeline.predict_proba(rows)\n        self.assertTrue(np.isfinite(probabilities).all())\n        self.assertTrue(((probabilities >= 0) & (probabilities <= 1)).all())\n        np.testing.assert_allclose(probabilities.sum(axis=1), 1)\n\n    def test_absent_feature_column_is_rejected_not_silently_guessed(self):\n        # Missing cell values are supported; a missing input field is a schema error.\n        with self.assertRaises(ValueError):\n            self.pipeline.predict(self.examples[FEATURES].drop(columns='Age'))\n\n\nclass StreamlitAppTests(unittest.TestCase):\n    @classmethod\n    def setUpClass(cls):\n        cls.examples = pd.read_csv(ROOT / 'outputs' / 'example_predictions.csv')\n        cls.pipeline = joblib.load(ROOT / 'models' / 'titanic_pipeline.joblib')\n\n    def open_app(self):\n        app = AppTest.from_file(str(ROOT / 'app.py'), default_timeout=30).run()\n        self.assertEqual(len(app.exception), 0, [error.message for error in app.exception])\n        return app\n\n    def submit_passenger(self, app, passenger, age_unknown=False):\n        app.selectbox(key='pclass').set_value(int(passenger['Pclass']))\n        app.selectbox(key='sex').set_value(passenger['Sex'])\n        app.number_input(key='age').set_value(float(passenger['Age']))\n        app.checkbox(key='age_unknown').set_value(age_unknown)\n        app.number_input(key='sibsp').set_value(int(passenger['SibSp']))\n        app.number_input(key='parch').set_value(int(passenger['Parch']))\n        app.number_input(key='fare').set_value(float(passenger['Fare']))\n        app.selectbox(key='embarked').set_value(passenger['Embarked'])\n        buttons = [button for button in app.button if button.label == 'Predict survival']\n        self.assertEqual(len(buttons), 1)\n        buttons[0].click().run()\n        self.assertEqual(len(app.exception), 0, [error.message for error in app.exception])\n        return app\n\n    def assert_estimate(self, app, probability):\n        metrics = [metric for metric in app.metric if metric.label == 'Model survival estimate']\n        self.assertEqual(len(metrics), 1)\n        self.assertEqual(metrics[0].value, f'{probability:.1%}')\n\n    def test_form_returns_both_contrasting_saved_example_predictions(self):\n        app = self.open_app()\n        self.assertEqual(len(app.metric), 0, 'Do not show a prediction before submitting the form.')\n        for _, passenger in self.examples.iterrows():\n            with self.subTest(prediction=int(passenger['prediction'])):\n                self.submit_passenger(app, passenger)\n                if passenger['prediction'] == 1:\n                    self.assertIn('Model prediction: Survived', [message.value for message in app.success])\n                    self.assertEqual(len(app.info), 0)\n                else:\n                    self.assertIn('Model prediction: Did Not Survive', [message.value for message in app.info])\n                    self.assertEqual(len(app.success), 0)\n                self.assert_estimate(app, passenger['survival_probability'])\n                self.assertEqual(app.dataframe[0].value.columns.tolist(), FEATURES)\n                np.testing.assert_allclose(app.dataframe[0].value[NUMERIC].to_numpy(dtype=float),\n                                           passenger[NUMERIC].to_numpy(dtype=float).reshape(1, -1))\n\n    def test_unknown_age_is_sent_as_missing_and_still_predicts(self):\n        passenger = self.examples.iloc[0]\n        app = self.submit_passenger(self.open_app(), passenger, age_unknown=True)\n        self.assertTrue(pd.isna(app.dataframe[0].value.iloc[0]['Age']))\n        expected_input = self.examples.iloc[[0]][FEATURES].copy()\n        expected_input.loc[:, 'Age'] = np.nan\n        positive_index = list(self.pipeline.classes_).index(1)\n        probability = self.pipeline.predict_proba(expected_input)[0, positive_index]\n        self.assert_estimate(app, probability)\n        self.assertTrue(any('saved training median' in caption.value for caption in app.caption))\n\n    def test_missing_model_shows_training_instruction_without_mutating_files(self):\n        model_path = ROOT / 'models' / 'titanic_pipeline.joblib'\n        original_is_file = Path.is_file\n        checked_missing_model = []\n\n        def pretend_only_model_is_absent(path):\n            if path == model_path:\n                checked_missing_model.append(path)\n                return False\n            return original_is_file(path)\n\n        # Simulate absence for the app's existence check; never move/delete the model.\n        with patch.object(Path, 'is_file', autospec=True, side_effect=pretend_only_model_is_absent):\n            app = self.open_app()\n        self.assertTrue(checked_missing_model)\n        self.assertTrue(any('saved model is missing' in message.value.lower() for message in app.error))\n        self.assertIn('python src/train_model.py', [code.value for code in app.code])\n        self.assertEqual(len(app.button), 0)\n        self.assertEqual(len(app.metric), 0)\n        self.assertTrue(model_path.is_file())\n\n\nif __name__ == '__main__':\n    unittest.main()\n";

const projectFolders = `titanic-survival-predictor/
├── data/
├── models/
├── notebooks/
├── outputs/
├── src/
├── tests/
├── app.py
├── requirements.txt
└── .gitignore`;

const createFolders = String.raw`mkdir titanic-survival-predictor
cd titanic-survival-predictor
mkdir data
mkdir models
mkdir notebooks
mkdir outputs
mkdir src
mkdir tests`;

const environmentCommands = String.raw`py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python --version
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip check`;

const notebookLoad = `from pathlib import Path
import pandas as pd

ROOT = Path.cwd()
if ROOT.name == "notebooks":
    ROOT = ROOT.parent

df = pd.read_csv(ROOT / "data" / "train.csv")
df.head()`;

const notebookInspect = `print("Rows, columns:", df.shape)
print("Columns:", ", ".join(df.columns))
df.info()

df.isna().sum().to_frame("Missing values")

df["Survived"].value_counts().sort_index().to_frame("Passengers")`;

const notebookSplit = `from sklearn.model_selection import train_test_split

features = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]
X = df[features]
y = df["Survived"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)

print("Training:", X_train.shape, "Final test:", X_test.shape)
print("Training survival rate:", round(y_train.mean(), 4))
print("Final test survival rate:", round(y_test.mean(), 4))
print("Disjoint row indexes:", set(X_train.index).isdisjoint(X_test.index))`;

const gitIgnore = `.venv/
__pycache__/
.ipynb_checkpoints/
data/*.csv
models/*.joblib
.streamlit/secrets.toml
*.log`;

const gitCommands = String.raw`git init
git add .
git status
git commit -m "Build Titanic survival predictor"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/titanic-survival-predictor.git
git push -u origin main`;

const modelRows = [
  ['Random Forest', '0.8160', '0.7978', '0.7034', '0.7463'],
  ['Support Vector Machine', '0.8174', '0.8043', '0.6958', '0.7447'],
  ['Logistic Regression', '0.8020', '0.7652', '0.6997', '0.7301'],
  ['K-Nearest Neighbors', '0.7992', '0.7798', '0.6702', '0.7194'],
  ['Decision Tree', '0.8034', '0.8067', '0.6448', '0.7153'],
];

export function TitanicProjectPage() {
  const project = projectPortfolioById['titanic-survival'];

  useEffect(() => {
    const title = 'Titanic Survival Predictor Project Handbook | LearnMLAcademy';
    const description =
      'Build a complete Titanic machine-learning classifier from an empty Windows folder to a tested Streamlit app with five models, cross-validation, tuning and real evaluation.';
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.learnmlacademy.com/projects/titanic-survival';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All project handbooks
          </Link>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">FREE COMPLETE PROJECT</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">{project.level}</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">{project.buildTime}</span>
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
            Start with an empty folder. Inspect the real Titanic training table, build a leakage-safe preprocessing pipeline,
            compare five classifiers with cross-validation, tune the winner, evaluate once on an untouched test set, save the
            complete pipeline and use it inside a Streamlit browser application.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-indigo-950">
              <Target className="h-5 w-5" aria-hidden="true" />
              What you will build
            </h2>
            <p className="mt-3 text-sm leading-7 text-indigo-950">
              A real classification project and browser app. A user enters seven passenger fields and the saved model returns
              a predicted class plus a model survival estimate. The app uses the exact preprocessing learned during training.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-cyan-950">
              <Wrench className="h-5 w-5" aria-hidden="true" />
              Tools you will actually use
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <span key={tool} className="rounded-lg border border-cyan-200 bg-white px-2.5 py-1.5 text-xs font-bold text-cyan-900">{tool}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <h2 className="text-xl font-black text-emerald-950">Verified reference result</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['Winner', 'Random Forest'],
              ['Accuracy', '81.01%'],
              ['Precision', '81.82%'],
              ['Recall', '65.22%'],
              ['F1', '0.7258'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-emerald-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{label}</p>
                <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-emerald-950">
            These numbers came from the executed project: 712 training rows, 179 untouched final-test rows, five training-only
            cross-validation folds and a fixed random seed of 42. The final confusion matrix was
            <code> [[100, 10], [24, 45]]</code>.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-xl font-black text-slate-950">How the whole system fits together</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm leading-7 text-indigo-950">
              <strong>Training:</strong> Kaggle train.csv → notebook inspection → 80/20 stratified split → preprocessing pipeline →
              five-model cross-validation → Random Forest tuning → one final holdout evaluation → saved Joblib pipeline.
            </div>
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-7 text-cyan-950">
              <strong>Prediction:</strong> Streamlit form → one seven-field DataFrame → saved preprocessing pipeline →
              Random Forest → predicted class + model probability → browser result.
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Training and prediction are separate jobs. The app never learns a new median, encoder or model from the person using it.
            It only loads the trusted pipeline that was already trained.
          </p>
        </section>

        <HandbookSection id="install-python" number={1} title="Install Python on Windows" checkpoint={<>PowerShell prints <code>Python 3.13.x</code> when you run <code>python --version</code>.</>}>
          <p><strong>What:</strong> Python runs the notebook, training program, tests and Streamlit app.</p>
          <p><strong>Why:</strong> Every later command depends on the Python interpreter and its package manager.</p>
          <HandbookActions steps={[
            { instruction: <>Open your browser and go to the official Python downloads page.</>, where: 'Browser' },
            { instruction: <>Install a current 64-bit Python 3 release. The verified build used Python 3.13.16.</> },
            { instruction: <>If the installer offers command-line/PATH integration, enable it.</> },
            { instruction: <>Open Start → type <strong>PowerShell</strong> → open it.</> },
            { instruction: <>Run <code>python --version</code>.</>, expected: <>A Python 3 version, not “command not found”.</> },
          ]} />
          <HandbookCode code="python --version" language="powershell" title="Verify Python" type="runnable" />
        </HandbookSection>

        <HandbookSection id="install-vscode" number={2} title="Install VS Code and the Python extension" checkpoint={<>VS Code opens and the Microsoft Python extension shows as installed.</>}>
          <p><strong>What:</strong> VS Code will hold the folders, Python files and terminal used in the project.</p>
          <p><strong>Why:</strong> Keeping all project files under one visible folder makes it easier to understand what each file does.</p>
          <HandbookActions steps={[
            { instruction: <>Download and install Visual Studio Code from its official website.</> },
            { instruction: <>Open VS Code and click the <strong>Extensions</strong> icon in the left activity bar.</> },
            { instruction: <>Search <strong>Python</strong>, choose the extension published by Microsoft and click <strong>Install</strong>.</> },
          ]} />
        </HandbookSection>

        <HandbookSection id="create-project" number={3} title="Create the project folder structure" checkpoint={<>Explorer shows data, models, notebooks, outputs, src and tests.</>}>
          <p><strong>What:</strong> We separate source code, raw data, generated models, notebook work, outputs and tests.</p>
          <p><strong>Why:</strong> A clear structure teaches which files are inputs, which are source code and which are generated artifacts.</p>
          <HandbookActions steps={[
            { instruction: <>In VS Code choose <strong>File → Open Folder...</strong> and create/open <code>titanic-survival-predictor</code>.</> },
            { instruction: <>Choose <strong>Terminal → New Terminal</strong>.</> },
            { instruction: <>Run the folder commands below only if you have not already created the folders in Explorer.</> },
          ]} />
          <HandbookCode code={createFolders} language="powershell" title="Create the folders" type="runnable" />
          <HandbookCode code={projectFolders} language="text" title="Checkpoint folder tree" type="output" />
        </HandbookSection>

        <HandbookSection id="environment" number={4} title="Create a private Python environment and install exact packages" checkpoint={<>The terminal starts with <code>(.venv)</code>, <code>python --version</code> works and <code>pip check</code> reports no broken requirements.</>}>
          <p><strong>What:</strong> A virtual environment gives this project its own package versions.</p>
          <p><strong>Why:</strong> It prevents another Python project on your laptop from silently changing this project's behavior.</p>
          <p>Create <code>requirements.txt</code> at the project root, paste the exact verified dependencies below and save it.</p>
          <HandbookCode code={requirementsCode} language="text" title="requirements.txt" type="config" />
          <HandbookCode code={environmentCommands} language="powershell" title="Create .venv and install packages" type="runnable" />
          <p>If PowerShell blocks activation, you can run the environment's Python directly rather than weakening machine-wide security settings.</p>
        </HandbookSection>

        <HandbookSection id="download-data" number={5} title="Download the Titanic training data from Kaggle" checkpoint={<>The project contains <code>data/train.csv</code> with 891 rows, 12 columns and a <code>Survived</code> column.</>}>
          <p><strong>What:</strong> The project uses Kaggle's Titanic competition training table as the learner dataset.</p>
          <p><strong>Why:</strong> <code>train.csv</code> contains both passenger information and the known <code>Survived</code> label needed for supervised learning.</p>
          <HandbookActions steps={[
            { instruction: <>Open the Kaggle Titanic competition Data page in your browser.</> },
            { instruction: <>Sign in yourself and accept/review any competition rules Kaggle requires.</> },
            { instruction: <>Download the competition files and extract them.</> },
            { instruction: <>Copy only <code>train.csv</code> into this project's <code>data</code> folder.</>, expected: <>Explorer shows <code>data/train.csv</code>.</> },
          ]} />
          <Screenshot
            src="/projects/titanic-survival/kaggle-data.jpg"
            alt="Kaggle Titanic data page captured while preparing the project"
            title="Where the learner gets the Titanic files"
            caption={<>Real Kaggle page evidence captured during project preparation. Kaggle sign-in/rule acceptance is personal; the handbook does not fake that step.</>}
          />
          <p className="text-sm">
            The verified engineering run used a disclosed public mirror because its automation environment was not signed in to Kaggle.
            CI reproduces that exact recorded file by hash; the learner path remains Kaggle.
          </p>
        </HandbookSection>

        <HandbookSection id="notebook-load" number={6} title="Open JupyterLab and inspect the first rows" checkpoint={<>The notebook shows the first five passengers and columns including Pclass, Sex, Age, Fare and Survived.</>}>
          <p><strong>What:</strong> We inspect the raw table before training anything.</p>
          <p><strong>Why:</strong> A model should never be built from a dataset whose shape, columns and missing values you have not checked.</p>
          <HandbookActions steps={[
            { instruction: <>Run <code>python -m jupyterlab</code> from the activated project terminal.</> },
            { instruction: <>In the browser file list open <code>notebooks/01_titanic_exploration.ipynb</code>.</> },
            { instruction: <>Run cells with <strong>Shift+Enter</strong>. Save with <strong>Ctrl+S</strong>.</> },
          ]} />
          <HandbookCode code={notebookLoad} language="python" title="Load the CSV" type="runnable" />
        </HandbookSection>

        <HandbookSection id="inspect-data" number={7} title="Measure shape, missing values and the target" checkpoint={<>You can explain 891×12, Age=177 missing, Cabin=687 missing, Embarked=2 missing, and target counts 549 vs 342.</>}>
          <p><strong>What:</strong> We quantify what is missing and whether the two classes are balanced.</p>
          <p><strong>Why:</strong> Missing values determine preprocessing. Class counts influence which evaluation metrics deserve attention.</p>
          <HandbookCode code={notebookInspect} language="python" title="Inspect schema, missingness and target" type="runnable" />
          <HandbookCode
            code={'Rows, columns: (891, 12)\nAge missing: 177\nCabin missing: 687\nEmbarked missing: 2\nSurvived=0: 549\nSurvived=1: 342'}
            language="text"
            title="Verified notebook checkpoints"
            type="output"
          />
        </HandbookSection>

        <HandbookSection id="features-split" number={8} title="Choose seven features and lock away the final test set" checkpoint={<>Training is 712×7, final test is 179×7, the row indexes do not overlap, and both survival rates are about 38%.</>}>
          <p><strong>What:</strong> Inputs are <code>Pclass, Sex, Age, SibSp, Parch, Fare, Embarked</code>; the target is <code>Survived</code>.</p>
          <p><strong>Why:</strong> The target must never appear among the features. We also split before learning imputation/scaling/encoding so the final test set cannot influence preprocessing.</p>
          <HandbookCode code={notebookSplit} language="python" title="Create the stratified 80/20 split" type="runnable" />
          <HandbookCode code={'Training: (712, 7) Final test: (179, 7)\nTraining survival rate: 0.3834\nFinal test survival rate: 0.3855\nDisjoint row indexes: True'} language="text" title="Verified split output" type="output" />
        </HandbookSection>

        <HandbookSection id="training-program" number={9} title="Create the complete training program" checkpoint={<>The file <code>src/train_model.py</code> exists and contains the complete code below.</>}>
          <p><strong>What:</strong> This one program owns preprocessing, model comparison, tuning, final evaluation, charts, saving and reload verification.</p>
          <p><strong>Why:</strong> A repeatable script is safer than manually running disconnected notebook cells for the final model.</p>
          <HandbookCode code={trainingCode} language="python" title="src/train_model.py — complete verified source" type="runnable" />
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="font-black text-violet-950">Understand the important blocks</p>
            <div className="mt-3 overflow-x-auto">
              <HandbookTable
                headers={['Block', 'What it does', 'Why it matters']}
                rows={[
                  ['load_and_split()', 'Checks the CSV, selects seven features and performs the stratified 80/20 split.', 'The final test set is separated before any preprocessing is fitted.'],
                  ['make_preprocessor()', 'Median-imputes/scales numeric fields and most-frequent-imputes/one-hot-encodes categorical fields.', 'The transformations stay inside cross-validation and are reusable at prediction time.'],
                  ['make_candidates()', 'Creates Logistic Regression, KNN, SVM, Decision Tree and Random Forest.', 'We compare model families rather than choosing one by habit.'],
                  ['compare_models()', 'Runs 5-fold stratified cross-validation and records accuracy, precision, recall and F1.', 'The winner is selected from training-only evidence.'],
                  ['tune_winner()', 'Grid-searches the winning model using mean F1.', 'Hyperparameters are tuned without touching the final test set.'],
                  ['evaluate_final()', 'Uses the holdout once and writes the confusion matrix.', 'This is the final exam after model choice/tuning.'],
                  ['save_and_reload()', 'Writes the whole pipeline to Joblib and checks predictions after reload.', 'The app can use the exact trained preprocessing + classifier.'],
                ]}
              />
            </div>
          </div>
        </HandbookSection>

        <HandbookSection id="preprocessing" number={10} title="Understand preprocessing before comparing models" checkpoint={<>You can explain what happens to a missing Age, an Embarked category and a numeric value before the classifier receives them.</>}>
          <p><strong>Imputation</strong> replaces a missing numeric value with the training median and a missing category with the training mode.</p>
          <p><strong>Standard scaling</strong> centers/scales numeric columns for algorithms such as Logistic Regression, KNN and SVM.</p>
          <p><strong>One-hot encoding</strong> converts categories into numeric indicator columns. <code>handle_unknown="ignore"</code> prevents a new category from crashing inference.</p>
          <p>All of these live inside the Scikit-learn pipeline, so a validation fold never teaches its own information to the preprocessing fitted on a training fold.</p>
        </HandbookSection>

        <HandbookSection id="compare-models" number={11} title="Compare five classifier families with training-only cross-validation" checkpoint={<>Your comparison contains five rows and Random Forest has the highest mean F1.</>}>
          <p><strong>Why F1:</strong> Survival is not a perfectly balanced target. F1 combines precision and recall for the positive class, so a model cannot look good merely by predicting the majority class.</p>
          <p>Run the complete program from the project root:</p>
          <HandbookCode code="python src/train_model.py" language="powershell" title="Train, compare, tune and evaluate" type="runnable" />
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <HandbookTable headers={['Model', 'CV accuracy', 'CV precision', 'CV recall', 'CV F1']} rows={modelRows} />
          </div>
          <Screenshot
            src="/project-handbooks/titanic/model_comparison.png"
            alt="Real bar chart comparing five Titanic classifiers by training-only cross-validation F1"
            title="Real five-model comparison"
            caption={<>Generated by the verified training program. Random Forest's mean F1 was 0.7463, narrowly ahead of SVM at 0.7447.</>}
          />
        </HandbookSection>

        <HandbookSection id="tune" number={12} title="Tune Random Forest without touching the holdout" checkpoint={<>The output reports Random Forest, <code>max_depth=None</code>, <code>min_samples_leaf=2</code> and best CV F1 ≈ 0.7463.</>}>
          <p><strong>What:</strong> GridSearchCV tries nine combinations of three depth values and three minimum-leaf values while keeping 200 trees.</p>
          <p><strong>Why:</strong> The model family won first; only then do we tune its settings. The final test set still stays sealed.</p>
          <HandbookCode code={'Selected by mean CV F1: Random Forest\nBest settings: {\'model__max_depth\': None, \'model__min_samples_leaf\': 2}\nBest tuning CV F1: 0.7463'} language="text" title="Verified tuning result" type="output" />
          <p>Tuning did not improve on the existing baseline settings. That is a valid result: tuning is an experiment, not a promise that the score must rise.</p>
        </HandbookSection>

        <HandbookSection id="final-test" number={13} title="Evaluate once on the untouched 179-passenger test set" checkpoint={<>You can calculate accuracy, precision, recall and F1 from the confusion matrix instead of treating them as magic numbers.</>}>
          <Screenshot
            src="/project-handbooks/titanic/confusion_matrix.png"
            alt="Real Titanic final holdout confusion matrix with 100 true negatives, 10 false positives, 24 false negatives and 45 true positives"
            title="Final holdout confusion matrix"
            caption={<>Rows are actual labels and columns are predictions. Order is 0 = did not survive, 1 = survived.</>}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>Accuracy</strong> = (100 + 45) / 179 = <strong>81.01%</strong>. Overall fraction classified correctly.</div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>Precision</strong> = 45 / (45 + 10) = <strong>81.82%</strong>. Of predicted survivors, how many actually survived?</div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>Recall</strong> = 45 / (45 + 24) = <strong>65.22%</strong>. Of actual survivors, how many did the model find?</div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7"><strong>F1</strong> = 2×45 / (2×45 + 10 + 24) = <strong>0.7258</strong>. Balance between precision and recall.</div>
          </div>
          <p>The majority-class baseline accuracy was only 61.45%, so 81.01% is meaningfully better than always predicting the most common class. It still does not make the model historically certain or causal.</p>
        </HandbookSection>

        <HandbookSection id="save-model" number={14} title="Save and reload the complete pipeline" checkpoint={<>The terminal reports <code>Saved and reloaded: models/titanic_pipeline.joblib</code> and two example predictions are reproduced after reload.</>}>
          <p><strong>What:</strong> Joblib serializes the fitted preprocessing and Random Forest together.</p>
          <p><strong>Why:</strong> Saving only the classifier would lose the learned medians, scaling values and category mapping. The app needs the whole pipeline.</p>
          <p>The verified reload produced opposite labels for two synthetic passenger profiles, proving inference survives serialization. Only load Joblib files you created or trust.</p>
        </HandbookSection>

        <HandbookSection id="build-app" number={15} title="Create the Streamlit browser application" checkpoint={<>The project root contains <code>app.py</code> with the complete source below.</>}>
          <p><strong>What:</strong> The browser form collects the same seven raw fields expected by the saved pipeline.</p>
          <p><strong>Why:</strong> This is the inference boundary: user input becomes one DataFrame row, then the saved pipeline performs every trained transformation and predicts.</p>
          <HandbookCode code={appCode} language="python" title="app.py — complete Streamlit application" type="runnable" />
          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm leading-7 text-cyan-950">
            <strong>Follow the prediction:</strong> form widgets → seven raw values → DataFrame in the exact feature order →
            <code>pipeline.predict()</code> for the class → <code>predict_proba()</code> for the model score → Streamlit result.
            The app never calls <code>fit()</code>.
          </div>
        </HandbookSection>

        <HandbookSection id="run-app" number={16} title="Run the app and make two real predictions" checkpoint={<>The browser loads the form and you can produce both a Survived and Did Not Survive result without an exception.</>}>
          <HandbookCode code="python -m streamlit run app.py" language="powershell" title="Start Streamlit" type="runnable" />
          <p>Keep the terminal running. Open the local address Streamlit prints, normally <code>http://localhost:8501</code>.</p>
          <Screenshot
            src="/project-handbooks/titanic/titanic-app-form.png"
            alt="Real running Titanic Streamlit app before submitting a prediction"
            title="The real application"
            caption={<>Captured automatically from the running Streamlit server during verification, not drawn or generated.</>}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Screenshot
              src="/project-handbooks/titanic/titanic-prediction-survived.png"
              alt="Real Titanic Streamlit prediction showing the survived result for the default first-class female profile"
              title="Prediction example A"
              caption={<>The default verified profile produces the project's Survived class and its model score.</>}
            />
            <Screenshot
              src="/project-handbooks/titanic/titanic-prediction-not-survived.png"
              alt="Real Titanic Streamlit prediction showing the did-not-survive result for a third-class male profile"
              title="Prediction example B"
              caption={<>A contrasting third-class male profile produces the opposite class, verifying the full input → pipeline → result path.</>}
            />
          </div>
        </HandbookSection>

        <HandbookSection id="tests" number={17} title="Run automated project and app tests" checkpoint={<>The test command completes without failures after training has created the local model file.</>}>
          <p><strong>What:</strong> Tests check schema, split integrity, training-only preprocessing statistics, five-model comparison, saved predictions, recomputed metrics, missing/unseen inputs and Streamlit behavior.</p>
          <p><strong>Why:</strong> A screenshot can look correct while the underlying data path is wrong. Tests verify the contracts that matter.</p>
          <HandbookCode code={testCode} language="python" title="tests/test_project.py — complete verification suite" type="runnable" />
          <HandbookCode code="python -m unittest discover -s tests -v" language="powershell" title="Run the tests" type="runnable" />
        </HandbookSection>

        <HandbookSection id="project-tree" number={18} title="Understand the finished project folder" checkpoint={<>You can explain which files are source, which are inputs and which are generated outputs.</>}>
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 sm:text-sm">
            titanic-survival-predictor/<br />
            ├── data/train.csv <span className="text-slate-400"># local input, not committed</span><br />
            ├── models/titanic_pipeline.joblib <span className="text-slate-400"># generated locally</span><br />
            ├── notebooks/01_titanic_exploration.ipynb<br />
            ├── outputs/model_comparison.csv<br />
            ├── outputs/model_comparison.png<br />
            ├── outputs/confusion_matrix.png<br />
            ├── outputs/metrics.json<br />
            ├── src/train_model.py<br />
            ├── tests/test_project.py<br />
            ├── app.py<br />
            ├── requirements.txt<br />
            └── .gitignore
          </div>
          <p>The reproducible source is what matters. Raw Kaggle data and generated Joblib artifacts stay out of Git so the repository does not redistribute data or binaries unnecessarily.</p>
        </HandbookSection>

        <HandbookSection id="github" number={19} title="Put the finished source project on GitHub" checkpoint={<>GitHub shows your source/notebook/output evidence but not <code>.venv</code>, raw CSV or generated Joblib model.</>}>
          <p>Create <code>.gitignore</code> first:</p>
          <HandbookCode code={gitIgnore} language="text" title=".gitignore" type="config" />
          <HandbookCode code={gitCommands} language="powershell" title="Git/GitHub commands" type="runnable" />
          <p>Always read <code>git status</code> before committing. Never commit passwords, API keys, secrets, a virtual environment or an untrusted serialized model.</p>
        </HandbookSection>

        <section className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-fuchsia-950">Now prove you understand the implementation</h2>
          <p className="mt-3 text-sm leading-7 text-fuchsia-950">Do at least two of these after reproducing the reference build. Record what changed and why.</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-fuchsia-950">
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4"><strong>Exercise 1 — Change the selection metric.</strong> Compare what wins if you sort by recall instead of F1. Explain why that changes what “best” means.</div>
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4"><strong>Exercise 2 — Add FamilySize.</strong> Create <code>FamilySize = SibSp + Parch + 1</code> as an optional experiment, retrain and compare cross-validation F1. Do not use the holdout to decide whether to keep it.</div>
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4"><strong>Exercise 3 — Remove scaling from the numeric branch.</strong> Compare what happens to Logistic Regression/KNN/SVM versus tree models and explain why.</div>
            <div className="rounded-xl border border-fuchsia-200 bg-white p-4"><strong>Exercise 4 — Break inference safely.</strong> Temporarily rename your local Joblib file, start Streamlit, read the recovery instruction, restore the file and retry.</div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-amber-950">Common problems and exact fixes</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-amber-950">
            <p><strong>python/py is not recognized:</strong> reopen PowerShell after installation. If still missing, rerun the Python installer and enable its command-line integration.</p>
            <p><strong>Activate.ps1 is blocked:</strong> use the explicit environment Python, for example <code>.\.venv\Scripts\python.exe -m pip install -r requirements.txt</code>, rather than changing machine-wide security policy.</p>
            <p><strong>train.csv not found:</strong> confirm the file is exactly <code>data/train.csv</code> and that the terminal is at the project root.</p>
            <p><strong>Wrong CSV error:</strong> the handbook expects the classic 891-row, 12-column training file with <code>Survived</code>. Kaggle's competition <code>test.csv</code> has no target and cannot replace it.</p>
            <p><strong>ModuleNotFoundError:</strong> activate <code>.venv</code> and rerun <code>python -m pip install -r requirements.txt</code>.</p>
            <p><strong>Saved model is missing:</strong> run <code>python src/train_model.py</code> successfully before starting Streamlit.</p>
            <p><strong>Prediction crashes after changing features:</strong> training and app input schemas must agree. Retrain the pipeline and update the app together.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-blue-950">How to explain this project in an interview</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-blue-950">
            {[
              ['Why a Pipeline?', 'It keeps imputation, scaling/encoding and the classifier together so cross-validation learns preprocessing only from training folds and inference reuses the exact fitted transformations.'],
              ['Why stratify?', 'The split preserves roughly the same survival proportion in training and holdout sets, reducing accidental class-ratio drift.'],
              ['Why F1 for model selection?', 'The target is moderately imbalanced, and F1 forces us to consider both survivor precision and survivor recall instead of only overall accuracy.'],
              ['Why Random Forest?', 'It had the highest mean 5-fold CV F1 (0.7463) among the five candidate families. SVM was very close at 0.7447, so the evidence does not imply Random Forest is universally better.'],
              ['Why is the holdout special?', 'It remained unused during model-family selection and tuning, then was evaluated once as the final test.'],
              ['What is the biggest limitation?', 'The model uses a small historical dataset and seven fields. Passenger/family grouping and unmodeled historical circumstances mean this is a teaching classifier, not a causal or safety system.'],
            ].map(([q, a]) => (
              <div key={q} className="rounded-xl border border-blue-200 bg-white p-4"><p className="font-black">{q}</p><p className="mt-1">{a}</p></div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-orange-950">What would change in a real production classification system?</h2>
          <p className="mt-3 text-sm leading-7 text-orange-950">
            You would add a formally versioned data contract, stronger group-aware validation where related records can leak information,
            probability calibration if scores are used as probabilities, threshold selection tied to business costs, drift monitoring,
            model/version logging, automated retraining and rollback, authentication, observability and human review for consequential use.
          </p>
          <p className="mt-3 text-sm leading-7 text-orange-950">
            This Titanic project deliberately stops at a safe educational Streamlit demo. The historical label is not something to use for real-world safety decisions.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
          <h2 className="text-xl font-black text-emerald-950">Implementation mastery check</h2>
          <p className="mt-3 text-sm leading-7 text-emerald-950">You are finished when you can answer these without copying the handbook.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              'What is the target and what are the seven input features?',
              'Why is Cabin not used in this baseline?',
              'Why split before fitting imputers or encoders?',
              'What exactly does stratify=y protect against?',
              'What happens to a missing Age inside the pipeline?',
              'Why do Logistic Regression/KNN/SVM care more about scaling than trees?',
              'How does 5-fold cross-validation work here?',
              'Why did we select by F1 rather than holdout accuracy?',
              'How close was SVM to Random Forest?',
              'How do 100, 10, 24 and 45 produce the four final metrics?',
              'What is saved inside titanic_pipeline.joblib?',
              'How does app.py turn form fields into a prediction?',
              'Why must the app never refit preprocessing?',
              'What would you change before using this pattern for a real business problem?',
            ].map(item => (
              <div key={item} className="rounded-xl border border-emerald-200 bg-white p-3 text-sm leading-6 text-emerald-950">{item}</div>
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
              'Raw Kaggle training table inspected',
              'Missing values and target distribution understood',
              'Stratified train/holdout split created',
              'Preprocessing kept inside a Pipeline',
              'Five model families compared by 5-fold CV',
              'Random Forest tuned on training data only',
              'Final holdout evaluated once',
              'Accuracy, precision, recall and F1 derived from the matrix',
              'Complete pipeline saved and reloaded',
              'Streamlit app uses the saved pipeline',
              'Automated tests verify data/model/app contracts',
              'Real app screenshots captured by verification',
              'Source project is GitHub-ready',
              'You can explain and modify the implementation',
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
