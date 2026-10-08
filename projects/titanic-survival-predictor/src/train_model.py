"""Train the Titanic pipeline from the project root: python src/train_model.py."""

# handbook: imports
from pathlib import Path
import json
import platform
import hashlib
import joblib
import matplotlib.pyplot as plt
import pandas as pd
import sklearn
from sklearn.base import clone
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate, GridSearchCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, ConfusionMatrixDisplay, make_scorer,
)

# handbook: data
ROOT = Path(__file__).resolve().parents[1]
FEATURES = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']
NUMERIC = ['Age', 'SibSp', 'Parch', 'Fare']
CATEGORICAL = ['Pclass', 'Sex', 'Embarked']
SEED = 42


def load_and_split():
    data_path = ROOT / 'data' / 'train.csv'
    if not data_path.is_file():
        raise FileNotFoundError('Put Kaggle Titanic train.csv inside the data folder first.')
    df = pd.read_csv(data_path)
    required = set(FEATURES + ['Survived'])
    if not required.issubset(df.columns):
        raise ValueError('Wrong CSV: train.csv must include the features and Survived.')
    if len(df) != 891 or df.shape[1] != 12:
        raise ValueError('This handbook expects the original 891-row, 12-column train.csv.')
    if df['Survived'].isna().any() or set(df['Survived'].unique()) != {0, 1}:
        raise ValueError('Survived must contain only the known labels 0 and 1.')
    X = df[FEATURES]
    y = df['Survived']
    return train_test_split(X, y, test_size=0.2, stratify=y, random_state=SEED)


# handbook: numeric
def make_preprocessor():
    numeric_steps = Pipeline([
        ('fill_missing', SimpleImputer(strategy='median')),
        ('scale', StandardScaler()),
    ])
    # handbook: categorical
    categorical_steps = Pipeline([
        ('fill_missing', SimpleImputer(strategy='most_frequent')),
        ('encode', OneHotEncoder(handle_unknown='ignore', sparse_output=False)),
    ])
    # handbook: combine
    return ColumnTransformer([
        ('numbers', numeric_steps, NUMERIC),
        ('categories', categorical_steps, CATEGORICAL),
    ])


# handbook: models
def make_candidates():
    return {
        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=SEED),
        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=7),
        'Support Vector Machine': SVC(C=1.0, kernel='rbf', random_state=SEED),
        'Decision Tree': DecisionTreeClassifier(max_depth=5, random_state=SEED),
        'Random Forest': RandomForestClassifier(n_estimators=200, min_samples_leaf=2, random_state=SEED),
    }


def make_pipeline(model):
    return Pipeline([('prepare', make_preprocessor()), ('model', clone(model))])


# handbook: compare
SCORING = {
    'accuracy': 'accuracy',
    'precision': make_scorer(precision_score, zero_division=0),
    'recall': make_scorer(recall_score, zero_division=0),
    'f1': make_scorer(f1_score, zero_division=0),
}


def compare_models(X_train, y_train):
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=SEED)
    rows = []
    for name, model in make_candidates().items():
        print(f'Comparing {name} ...', flush=True)
        scores = cross_validate(
            make_pipeline(model), X_train, y_train,
            cv=cv, scoring=SCORING, error_score='raise',
        )
        row = {'model': name}
        for metric in SCORING:
            row[metric] = float(scores[f'test_{metric}'].mean())
        row['f1_std'] = float(scores['test_f1'].std())
        rows.append(row)
    comparison = pd.DataFrame(rows).sort_values('f1', ascending=False, kind='stable')
    comparison.to_csv(ROOT / 'outputs' / 'model_comparison.csv', index=False)
    print(comparison.to_string(index=False, float_format=lambda value: f'{value:.4f}'))
    return comparison


# handbook: tune
def tune_winner(name, X_train, y_train):
    grids = {
        'Logistic Regression': {'model__C': [0.1, 1.0, 10.0]},
        'K-Nearest Neighbors': {'model__n_neighbors': [5, 7, 11], 'model__weights': ['uniform', 'distance']},
        'Support Vector Machine': {'model__C': [0.5, 1.0, 3.0], 'model__gamma': ['scale', 0.1]},
        'Decision Tree': {'model__max_depth': [3, 5, 8], 'model__min_samples_leaf': [1, 4]},
        'Random Forest': {'model__max_depth': [5, 8, None], 'model__min_samples_leaf': [1, 2, 4]},
    }
    search = GridSearchCV(
        make_pipeline(make_candidates()[name]), grids[name],
        scoring=SCORING, refit='f1',
        cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=SEED),
        error_score='raise',
    )
    search.fit(X_train, y_train)
    pd.DataFrame(search.cv_results_).to_csv(ROOT / 'outputs' / 'tuning_results.csv', index=False)
    print('Selected by mean CV F1:', name)
    print('Best settings:', search.best_params_)
    print(f'Best tuning CV F1: {search.best_score_:.4f}')
    return search


# handbook: evaluate
def evaluate_final(pipeline, X_test, y_test):
    predictions = pipeline.predict(X_test)
    metrics = {
        'accuracy': accuracy_score(y_test, predictions),
        'precision': precision_score(y_test, predictions, zero_division=0),
        'recall': recall_score(y_test, predictions, zero_division=0),
        'f1': f1_score(y_test, predictions, zero_division=0),
    }
    matrix = confusion_matrix(y_test, predictions, labels=[0, 1])
    print('Final held-out test (179 passengers):')
    for name, value in metrics.items():
        print(f'  {name}: {value:.4f}')
    print('Confusion matrix (rows actual, columns predicted; order 0, 1):')
    print(matrix)
    fig, ax = plt.subplots(figsize=(7, 5))
    ConfusionMatrixDisplay(matrix, display_labels=['Did not survive (0)', 'Survived (1)']).plot(
        ax=ax, cmap='Blues', colorbar=False, values_format='d',
    )
    ax.set_title('Final held-out test: 179 passengers')
    fig.tight_layout()
    fig.savefig(ROOT / 'outputs' / 'confusion_matrix.png', dpi=160)
    plt.close(fig)
    return metrics, matrix.tolist()


# handbook: save
def save_and_reload(pipeline):
    model_path = ROOT / 'models' / 'titanic_pipeline.joblib'
    model_path.parent.mkdir(exist_ok=True)
    joblib.dump(pipeline, model_path)
    # Only load a file you made or trust. joblib is not a safe format for strangers' files.
    reloaded = joblib.load(model_path)
    examples = pd.DataFrame([
        {'Pclass': 1, 'Sex': 'female', 'Age': 29.0, 'SibSp': 0, 'Parch': 0, 'Fare': 80.0, 'Embarked': 'S'},
        {'Pclass': 3, 'Sex': 'male', 'Age': 35.0, 'SibSp': 0, 'Parch': 0, 'Fare': 8.0, 'Embarked': 'S'},
    ])[FEATURES]
    before = pipeline.predict(examples)
    after = reloaded.predict(examples)
    assert (before == after).all(), 'Saved and reloaded predictions differ.'
    examples['prediction'] = after
    if hasattr(reloaded, 'predict_proba'):
        positive_index = list(reloaded.classes_).index(1)
        examples['survival_probability'] = reloaded.predict_proba(examples.drop(columns='prediction'))[:, positive_index]
    examples.to_csv(ROOT / 'outputs' / 'example_predictions.csv', index=False)
    print('Saved and reloaded: models/titanic_pipeline.joblib')
    print(examples.to_string(index=False))



def save_training_eda(X_train, y_train):
    """Save a training-only visual that makes the classification problem intuitive."""
    frame = X_train.copy()
    frame["Survived"] = y_train.to_numpy()

    labels = []
    rates = []
    for sex in ["female", "male"]:
        for pclass in [1, 2, 3]:
            group = frame[(frame["Sex"] == sex) & (frame["Pclass"] == pclass)]
            labels.append(f"{sex.title()}\\nClass {pclass}")
            rates.append(float(group["Survived"].mean() * 100))

    fig, ax = plt.subplots(figsize=(9, 5))
    bars = ax.bar(labels, rates)
    ax.set_ylim(0, 100)
    ax.set_ylabel("Survival rate in training rows (%)")
    ax.set_title("Training-only survival pattern by sex and ticket class")
    ax.bar_label(bars, labels=[f"{value:.1f}%" for value in rates], padding=3)
    fig.tight_layout()
    fig.savefig(ROOT / "outputs" / "survival_by_sex_class.png", dpi=160)
    plt.close(fig)


# handbook: run
def main():
    X_train, X_test, y_train, y_test = load_and_split()
    print(f'Training rows: {len(X_train)} | Final test rows: {len(X_test)}')
    print(f'Training survival rate: {y_train.mean():.4f}')
    prepared = make_preprocessor().fit_transform(X_train)
    print(f'Prepared training shape: {prepared.shape}')
    print('Candidates:', ', '.join(make_candidates()))
    (ROOT / 'outputs').mkdir(exist_ok=True)
    save_training_eda(X_train, y_train)
    comparison = compare_models(X_train, y_train)
    name = comparison.iloc[0]['model']
    search = tune_winner(name, X_train, y_train)
    # GridSearchCV refits the winning settings on all 712 training rows, not the holdout.
    final_pipeline = search.best_estimator_
    metrics, matrix = evaluate_final(final_pipeline, X_test, y_test)
    save_and_reload(final_pipeline)
    report = {
        'python': platform.python_version(), 'scikit_learn': sklearn.__version__,
        'data_sha256': hashlib.sha256((ROOT / 'data' / 'train.csv').read_bytes()).hexdigest(),
        'features': FEATURES, 'seed': SEED, 'training_rows': len(X_train), 'test_rows': len(X_test),
        'selected_model': name, 'best_params': search.best_params_,
        'best_cv_f1': float(search.best_score_), 'test_metrics': metrics, 'confusion_matrix': matrix,
        'majority_baseline_test_accuracy': float((y_test == y_train.mode()[0]).mean()),
    }
    (ROOT / 'outputs' / 'metrics.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.barh(comparison['model'], comparison['f1'], xerr=comparison['f1_std'], color='#0f766e', capsize=4)
    ax.invert_yaxis()
    ax.set(xlabel='Mean F1 (five training-only folds)', xlim=(0, 1), title='Model comparison before tuning')
    fig.tight_layout()
    fig.savefig(ROOT / 'outputs' / 'model_comparison.png', dpi=150)
    plt.close(fig)


if __name__ == '__main__':
    main()
