import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Wrench,
} from 'lucide-react';
import { CodeBlock } from '../components/content/CodeBlock';
import { projectPortfolioById } from '../data/projectPortfolio';

const setupCommands = String.raw`python -m venv .venv

# Windows PowerShell
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

python -m pip install --upgrade pip
pip install pandas numpy scikit-learn matplotlib seaborn joblib gradio jupyterlab

pip freeze > requirements.txt`;

const inspectCode = String.raw`import pandas as pd

df = pd.read_csv("data/train.csv")

print(df.shape)
print(df.head())
print(df.info())
print(df.isna().sum().sort_values(ascending=False).head(10))
print(df["Survived"].value_counts(normalize=True))`;

const trainCode = String.raw`import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

df = pd.read_csv("data/train.csv")

features = [
    "Pclass", "Sex", "Age", "SibSp",
    "Parch", "Fare", "Embarked"
]

X = df[features]
y = df["Survived"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    stratify=y,
    random_state=42,
)

numeric_features = ["Age", "SibSp", "Parch", "Fare"]
categorical_features = ["Pclass", "Sex", "Embarked"]

preprocess = ColumnTransformer([
    (
        "numeric",
        Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]),
        numeric_features,
    ),
    (
        "categorical",
        Pipeline([
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("onehot", OneHotEncoder(handle_unknown="ignore")),
        ]),
        categorical_features,
    ),
])

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        min_samples_leaf=2,
        random_state=42,
    ),
}

best_pipeline = None
best_name = None
best_auc = -1

for name, estimator in models.items():
    pipeline = Pipeline([
        ("prepare", preprocess),
        ("model", estimator),
    ])

    pipeline.fit(X_train, y_train)

    prediction = pipeline.predict(X_test)
    probability = pipeline.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, prediction)
    auc = roc_auc_score(y_test, probability)

    print("\n", name)
    print("Accuracy:", round(accuracy, 3))
    print("ROC-AUC:", round(auc, 3))
    print("Confusion matrix:")
    print(confusion_matrix(y_test, prediction))
    print(classification_report(y_test, prediction))

    if auc > best_auc:
        best_auc = auc
        best_name = name
        best_pipeline = pipeline

joblib.dump(best_pipeline, "titanic_model.joblib")

print("\nSaved:", best_name)
print("Model file: titanic_model.joblib")`;

const appCode = String.raw`import joblib
import pandas as pd
import gradio as gr

model = joblib.load("titanic_model.joblib")

def predict_survival(
    passenger_class,
    sex,
    age,
    siblings_spouses,
    parents_children,
    fare,
    embarked,
):
    row = pd.DataFrame([{
        "Pclass": int(passenger_class),
        "Sex": sex,
        "Age": float(age),
        "SibSp": int(siblings_spouses),
        "Parch": int(parents_children),
        "Fare": float(fare),
        "Embarked": embarked,
    }])

    probability = float(model.predict_proba(row)[0, 1])

    label = (
        "Likely survived"
        if probability >= 0.50
        else "Likely did not survive"
    )

    return {
        "Survived": probability,
        "Did not survive": 1 - probability,
    }, f"{label} — survival probability {probability:.1%}"

demo = gr.Interface(
    fn=predict_survival,
    inputs=[
        gr.Dropdown([1, 2, 3], value=3, label="Passenger class"),
        gr.Dropdown(["female", "male"], value="female", label="Sex"),
        gr.Number(value=29, label="Age"),
        gr.Number(value=0, precision=0, label="Siblings / spouses aboard"),
        gr.Number(value=0, precision=0, label="Parents / children aboard"),
        gr.Number(value=32.2, label="Fare"),
        gr.Dropdown(["C", "Q", "S"], value="S", label="Embarked port"),
    ],
    outputs=[
        gr.Label(label="Prediction"),
        gr.Textbox(label="Result"),
    ],
    title="Titanic Survival Predictor",
    description="Enter passenger details and estimate survival probability.",
)

demo.launch()`;

const gitCommands = String.raw`git init
git add .
git commit -m "Build Titanic survival predictor"

# Create an empty GitHub repository first, then copy its URL:
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/titanic-survival-predictor.git
git push -u origin main`;

function Step({
  number,
  title,
  children,
  check,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  check: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black text-slate-950">{title}</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700">{children}</div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950">
            <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            <p><strong>Check before continuing:</strong> {check}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TitanicProjectPage() {
  const project = projectPortfolioById['titanic-survival'];

  useEffect(() => {
    document.title = 'Titanic Survival Predictor Project Handbook | LearnMLAcademy';
    const description =
      'Build the classic Titanic machine-learning project from an empty folder to a working prediction app with Python, Pandas, Scikit-learn, Gradio and GitHub.';
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
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All project handbooks
          </Link>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">HANDBOOK V1 · SCREENSHOTS NEXT</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">{project.level}</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-bold text-slate-300">{project.buildTime}</span>
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">{project.description}</p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-indigo-950">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              What you will build
            </h2>
            <p className="mt-3 text-sm leading-6 text-indigo-950">{project.build}</p>
            <ul className="mt-4 space-y-2 text-sm text-indigo-900">
              <li>• A leakage-safe preprocessing + classification pipeline.</li>
              <li>• Logistic Regression and Random Forest comparison.</li>
              <li>• Accuracy, classification report, confusion matrix and ROC-AUC.</li>
              <li>• A saved model file and working browser prediction app.</li>
              <li>• A GitHub-ready project folder you can show in interviews.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-cyan-950">
              <Wrench className="h-5 w-5" aria-hidden="true" />
              Tools you will use
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <span key={tool} className="rounded-lg border border-cyan-200 bg-white px-2.5 py-1.5 text-xs font-bold text-cyan-900">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-black text-amber-950">Before you begin</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Use the classic Titanic passenger dataset with a <code>train.csv</code> containing the target column <code>Survived</code>. The familiar Kaggle Titanic dataset uses exactly this structure. Put the file inside the project&apos;s <code>data</code> folder before you run the training code.
          </p>
        </section>

        <Step number={1} title="Install Python and VS Code" check="Opening a terminal and running python --version prints Python 3.10 or newer.">
          <p>Open your browser. Go to the official Python website, download Python 3.10+ and run the installer. On Windows, tick <strong>Add Python to PATH</strong> before selecting Install.</p>
          <p>Install VS Code. Open VS Code → click <strong>Extensions</strong> on the left → search for <strong>Python</strong> → install the Microsoft Python extension.</p>
        </Step>

        <Step number={2} title="Create the project folder" check="VS Code Explorer shows data, notebooks, src, app.py and requirements.txt.">
          <p>Open VS Code → <strong>File → Open Folder</strong> → create a new folder named <code>titanic-survival-predictor</code>.</p>
          <p>In the Explorer panel create these folders: <code>data</code>, <code>notebooks</code>, and <code>src</code>. At the project root create empty files <code>app.py</code> and <code>requirements.txt</code>.</p>
          <div className="rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100">
            titanic-survival-predictor/<br />
            ├── data/<br />
            ├── notebooks/<br />
            ├── src/<br />
            ├── app.py<br />
            └── requirements.txt
          </div>
        </Step>

        <Step number={3} title="Create a virtual environment and install the tools" check="pip show scikit-learn and pip show gradio both return package information.">
          <p>In VS Code click <strong>Terminal → New Terminal</strong>. Run the commands below. Use the activation command for your operating system.</p>
          <CodeBlock title="Create the environment" type="runnable" code={setupCommands} />
        </Step>

        <Step number={4} title="Download the Titanic dataset" check="data/train.csv exists and opens in VS Code with columns such as PassengerId, Survived, Pclass, Sex, Age and Fare.">
          <p>Open the Titanic machine-learning competition dataset in your browser. Download the dataset files and extract them.</p>
          <p>Copy <code>train.csv</code> into your project&apos;s <code>data</code> folder. For this handbook, training uses <code>train.csv</code> because it contains the <code>Survived</code> answer column.</p>
        </Step>

        <Step number={5} title="Start JupyterLab and inspect the data" check="The notebook prints 891 rows for the standard Titanic training dataset and shows missing values in Age and Cabin.">
          <p>Return to the VS Code terminal and run <code>jupyter lab</code>. A browser tab should open. In JupyterLab click <strong>File → New → Notebook → Python 3</strong>. Save it as <code>notebooks/01_titanic.ipynb</code>.</p>
          <p>Paste the inspection code below into the first code cell and press <strong>Shift + Enter</strong>.</p>
          <CodeBlock title="Inspect the CSV" type="runnable" code={inspectCode} />
        </Step>

        <Step number={6} title="Decide what the model is allowed to use" check="Your feature list does not contain Survived and contains only information available for a passenger before the outcome.">
          <p>Use <code>Pclass</code>, <code>Sex</code>, <code>Age</code>, <code>SibSp</code>, <code>Parch</code>, <code>Fare</code> and <code>Embarked</code>. The target is <code>Survived</code>.</p>
          <p>Do not put the target into the features. Do not learn imputation values or encodings from the complete dataset before splitting; that would leak test information into training.</p>
        </Step>

        <Step number={7} title="Create train and test sets" check="The training and test sets have similar survival proportions because stratify=y was used.">
          <p>Create a new file <code>src/train_model.py</code>. The training script below performs the split before fitting preprocessing. A fixed <code>random_state</code> makes your teaching result reproducible.</p>
        </Step>

        <Step number={8} title="Build one preprocessing pipeline" check="Calling pipeline.fit(...) completes without manually filling missing Age values or manually creating dummy columns.">
          <p>The numeric branch fills missing values with the training median and scales values. The categorical branch fills missing categories with the most frequent training value and one-hot encodes categories.</p>
          <p>Keeping preprocessing inside the Scikit-learn <code>Pipeline</code> is important: the same transformations will later be reused by the browser app.</p>
        </Step>

        <Step number={9} title="Train Logistic Regression and Random Forest" check="The terminal prints metrics for both models and creates titanic_model.joblib.">
          <p>Paste the complete script below into <code>src/train_model.py</code>. Save the file. In the VS Code terminal run <code>python src/train_model.py</code>.</p>
          <CodeBlock title="Complete training script" type="runnable" code={trainCode} />
          <p>On a standard 891-row Titanic training dataset, a sensible result is usually around the high-70% to low-80% accuracy range. Your exact value can vary with library versions and modeling choices.</p>
        </Step>

        <Step number={10} title="Read the confusion matrix instead of stopping at accuracy" check="You can point to false positives and false negatives and explain what each means for the survival prediction task.">
          <p>If the confusion matrix is <code>[[98, 12], [23, 46]]</code>, the model correctly classified 98 non-survivors and 46 survivors, while making 12 false-positive and 23 false-negative errors.</p>
          <p>Use ROC-AUC to judge ranking quality across thresholds, but do not treat one metric as the entire story.</p>
        </Step>

        <Step number={11} title="Save the entire pipeline" check="The project root contains titanic_model.joblib and loading it with joblib.load(...) succeeds.">
          <p>The training script saves the complete preprocessing + classifier pipeline, not only the classifier. This means the app can accept raw values such as <code>female</code>, <code>3</code> and <code>S</code> without recreating transformations by hand.</p>
        </Step>

        <Step number={12} title="Build the prediction web app" check="python app.py starts a local Gradio URL without an import or model-loading error.">
          <p>Open <code>app.py</code> in VS Code. Replace its contents with the code below and save it.</p>
          <CodeBlock title="Gradio prediction app" type="runnable" code={appCode} />
        </Step>

        <Step number={13} title="Run the app in your browser" check="The page shows Titanic Survival Predictor, seven passenger inputs and a Predict button.">
          <p>In the terminal make sure your virtual environment is active, then run:</p>
          <CodeBlock title="Start the app" type="runnable" code={'python app.py'} />
          <p>Gradio prints a local address, commonly <code>http://127.0.0.1:7860</code>. Hold <strong>Ctrl</strong> and click the URL, or copy it into your browser.</p>
        </Step>

        <Step number={14} title="Test two very different passengers" check="The two test passengers return visibly different survival probabilities.">
          <p>Test A: Class 1, female, age 38, SibSp 1, Parch 0, Fare 71.28, Embarked C.</p>
          <p>Test B: Class 3, male, age 22, SibSp 1, Parch 0, Fare 7.25, Embarked S.</p>
          <p>Click <strong>Predict</strong> for each case. The point is not to prove causation; it is to verify that the complete raw-input → preprocessing → model → probability path works.</p>
        </Step>

        <Step number={15} title="Create a Git repository" check="Refreshing the GitHub repository shows your source files and requirements.txt but not your .venv folder.">
          <p>Create a file named <code>.gitignore</code> and add <code>.venv/</code>, <code>__pycache__/</code> and notebook checkpoint folders. Do not commit secrets.</p>
          <p>Open GitHub → click <strong>New repository</strong> → name it <code>titanic-survival-predictor</code> → create the empty repository. Then run:</p>
          <CodeBlock title="Push the project to GitHub" type="runnable" code={gitCommands} />
        </Step>

        <Step number={16} title="Explain the project in an interview" check="You can explain the problem, leakage prevention, preprocessing, baseline, evaluation and deployment without reading the code.">
          <p>A strong explanation is: “I used the Titanic classification problem to build an end-to-end Scikit-learn pipeline. I split before preprocessing, imputed numeric and categorical features inside the pipeline, one-hot encoded categories, compared Logistic Regression with Random Forest, evaluated with confusion matrix and ROC-AUC, saved the full pipeline and exposed it through a Gradio app.”</p>
          <p>Then discuss one improvement you would make next: feature engineering such as family size/title extraction, cross-validation, calibration or threshold analysis.</p>
        </Step>

        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6">
          <h2 className="text-xl font-black text-rose-950">Common problems and exact fixes</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rose-200">
                  <th className="p-3">Problem</th>
                  <th className="p-3">Why it happens</th>
                  <th className="p-3">What to do</th>
                </tr>
              </thead>
              <tbody className="text-rose-950">
                {[
                  ['python is not recognized', 'Python was not added to PATH', 'Re-run the installer or use the Python launcher py on Windows.'],
                  ['FileNotFoundError: data/train.csv', 'CSV is in the wrong folder', 'Put train.csv inside project-root/data and run from the project root.'],
                  ['ModuleNotFoundError', 'Virtual environment is inactive or package not installed', 'Activate .venv and run pip install -r requirements.txt.'],
                  ['Input columns do not match', 'App fields differ from training feature names', 'Use exactly Pclass, Sex, Age, SibSp, Parch, Fare and Embarked.'],
                  ['App loads but prediction fails', 'Only the model was saved, not preprocessing', 'Save and load the complete Scikit-learn Pipeline.'],
                ].map(row => (
                  <tr key={row[0]} className="border-b border-rose-100 last:border-0">
                    {row.map(cell => <td key={cell} className="p-3 align-top">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-200 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-black text-slate-950">What this one project revises from the curriculum</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.chapters.map(chapter => (
              <span key={chapter} className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-800">
                {chapter}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h2 className="text-xl font-black text-amber-950">Screenshot standard for this handbook</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            We will only publish screenshots captured from the real tools used while running the project. No AI-generated fake IDE, notebook or application screenshots will be used. The screenshot pass will show the VS Code folder, Jupyter data inspection, training output and the running prediction app.
          </p>
        </section>
      </main>
    </div>
  );
}
