import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft, CheckCircle2, FileCode2, ShieldCheck} from "lucide-react";
import {HandbookCode} from "../components/projects/HandbookPrimitives";

import digitReadme from "../../projects/digit-recognizer/README.md?raw";
import digitRequirements from "../../projects/digit-recognizer/requirements.txt?raw";
import digitCore from "../../projects/digit-recognizer/src/digits.py?raw";
import digitTrain from "../../projects/digit-recognizer/train.py?raw";
import digitApp from "../../projects/digit-recognizer/app.py?raw";
import digitTests from "../../projects/digit-recognizer/tests/test_digits.py?raw";

import retailReadme from "../../projects/retail-forecasting/README.md?raw";
import retailRequirements from "../../projects/retail-forecasting/requirements.txt?raw";
import retailDownload from "../../projects/retail-forecasting/download_data.py?raw";
import retailCore from "../../projects/retail-forecasting/src/forecast.py?raw";
import retailTrain from "../../projects/retail-forecasting/train.py?raw";
import retailApp from "../../projects/retail-forecasting/app.py?raw";
import retailTests from "../../projects/retail-forecasting/tests/test_forecast.py?raw";

import disasterReadme from "../../projects/disaster-tweets/README.md?raw";
import disasterRequirements from "../../projects/disaster-tweets/requirements.txt?raw";
import disasterCore from "../../projects/disaster-tweets/src/detect.py?raw";
import disasterTrain from "../../projects/disaster-tweets/train.py?raw";
import disasterApp from "../../projects/disaster-tweets/app.py?raw";
import disasterTests from "../../projects/disaster-tweets/tests/test_detect.py?raw";
import ciWorkflow from "../../.github/workflows/three-projects-verify.yml?raw";

type Key = "digit-recognizer" | "retail-forecasting" | "disaster-tweets";
type Lesson = {title:string; why:string; do:string; check:string; command?:string};
type Detail = {
 title:string; label:string; hook:string; finish:string; tools:string; limitations:string;
 image:string; imageAlt:string; worked: {title:string; steps:string[]};
 lessons:Lesson[];
 files: Array<{path:string; code:string; language:string}>;
};
const projects: Record<Key,Detail> = {
 "digit-recognizer": {
  title:"Teach AI to Read Handwritten Numbers — Build a Real CNN",
  label:"Project 8 · Deep Learning",
  hook:"A courier reads a handwritten parcel number incorrectly and sends a package to the wrong place. Can we teach a neural network to recognize handwritten digits 0 through 9? We will train a real CNN rather than pretend an image model exists.",
  finish:"A locally trained PyTorch CNN, a real held-out classification report, a 10-class confusion matrix and a Streamlit app that accepts an uploaded handwritten-digit image.",
  tools:"Python 3.12, VS Code, scikit-learn load_digits (1,797 original 8×8 images), NumPy, PyTorch, Pillow, Streamlit, pytest, GitHub Actions",
  limitations:"The scikit-learn dataset is only 8×8. Real phone camera photos may be out of distribution. This is not full-page OCR and cannot recognize multi-digit numbers.",
  image:"/project-handbooks/digit-recognizer/process.svg",
  imageAlt:"Digit-recognition flow from image through two convolution and pooling blocks to ten class probabilities",
  worked:{title:"Calculate the actual CNN parameter count",steps:[
   "Input shape: one grayscale channel × 8 × 8 pixels.",
   "First 3×3 convolution has 16 output channels: 16 × (1×3×3 + 1 bias) = 160 parameters.",
   "After 2×2 pooling: 16 × 4 × 4. Second convolution: 32 × (16×3×3 + 1) = 4,640 parameters.",
   "After another pool: 32 × 2 × 2 = 128 inputs to a dense layer. Dense 128→64: 128×64+64 = 8,256 parameters.",
   "Final dense 64→10: 64×10+10 = 650. Total learned parameters: 160+4,640+8,256+650 = 13,706."
  ]},
  lessons:[
   {title:"Create a real development folder",why:"Running commands from the wrong directory causes imports and file paths to fail.",do:"Install Python 3.12 and VS Code. Choose File → Open Folder → projects/digit-recognizer, then Terminal → New Terminal.",check:"Explorer shows app.py, train.py, requirements.txt, src, tests."},
   {title:"Install the exact learning tools",why:"PyTorch learns numeric features directly from images; no pretrained classifier is used.",do:"Create a virtual environment, activate it, then install the project dependencies. If Torch is large, ensure sufficient free disk space.",command:"python -m venv .venv\n# Windows: .venv\\Scripts\\activate\n# macOS/Linux: source .venv/bin/activate\npython -m pip install -r requirements.txt",check:"Python imports Torch, PIL and scikit-learn successfully."},
   {title:"Understand pixels, labels, training and held-out test",why:"A good model must recognize images it did not see during training.",do:"In src/digits.py inspect load_splits. The dataset is 1,797 labelled grayscale images. Split training, validation and test with fixed seed and class stratification; normalize intensity by 16.",check:"Training, validation and test total 1,797; each image is 8×8; test remains held out."},
   {title:"Train the CNN from scratch",why:"Convolutions learn local strokes; ReLU adds nonlinearity; max-pooling condenses responses; cross-entropy trains ten outputs.",do:"Read DigitCNN and fit in src/digits.py, then run actual training. Inspect each epoch loss and validation accuracy.",command:"python train.py",check:"artifacts/digits-cnn.pt and artifacts/metrics.json are created."},
   {title:"Evaluate and predict",why:"Test accuracy alone hides mistakes between similar handwritten digits.",do:"Examine the saved 10×10 confusion matrix and all ten output probabilities. Try a real upload and compare it with the 8×8 preprocessed preview.",command:"python -m pytest -q\npython -m streamlit run app.py",check:"The app shows predicted digit, original image, 8×8 preview and ten class probabilities."},
  ],
  files:[
   {path:"README.md",code:digitReadme,language:"markdown"},
   {path:"requirements.txt",code:digitRequirements,language:"text"},
   {path:"src/digits.py",code:digitCore,language:"python"},
   {path:"train.py",code:digitTrain,language:"python"},
   {path:"app.py",code:digitApp,language:"python"},
   {path:"tests/test_digits.py",code:digitTests,language:"python"}
  ],
 },
 "retail-forecasting": {
  title:"Can We Predict Tomorrow's Sales? Build a Retail Forecaster",
  label:"Project 5 · Time Series",
  hook:"An online store owner asks a practical question: how many pounds of orders should we plan for tomorrow? Predicting zero means lost opportunities, but predicting too much could waste stock. Use real sales history, not made-up reported accuracy.",
  finish:"An offline, reproducible forecasting pipeline built from official UK retail orders: cleaned daily revenue, lag features, chronological validation, a 28-day held-out test and a Streamlit chart comparing model, actual and baseline.",
  tools:"Python 3.12, VS Code, UCI Online Retail, pandas, NumPy, scikit-learn, Ridge, HistGradientBoosting, Streamlit, pytest, GitHub Actions",
  limitations:"Predicts positive-order gross GBP from the UK subset, not recognized net revenue. One-day-ahead holdout evaluation uses observed earlier days and does NOT demonstrate an entire 28-day future forecast. No promotion or weather features.",
  image:"/project-handbooks/retail-forecasting/process.svg",
  imageAlt:"Daily orders flow into chronological sales chart, past-day lags, baseline and model then a next-day prediction",
  worked:{title:"Compute a sales feature and a baseline by hand",steps:[
    "Assume previous seven days sold £100, £120, £90, £130, £110, £140 and £150.",
    "Prior 7-day mean = (100+120+90+130+110+140+150) / 7 = £120.",
    "Suppose previous Friday was £100. Seasonal naive for Friday predicts £100, not the seven-day mean.",
    "If actual Friday sales are £125, absolute error = |125−100| = £25.",
    "For actual [100,125] and predicted [110,100], MAE = (10+25)/2 = £17.50.",
  ]},
  lessons:[
   {title:"Open the project and understand the sales problem",why:"Time series asks what changes next; its ordering matters.",do:"Install Python 3.12 and VS Code. Open File → Open Folder → projects/retail-forecasting. Open Terminal → New Terminal.",check:"See download_data.py, train.py, app.py and src/forecast.py."},
   {title:"Create the virtual environment",why:"Python and library versions should be isolated per project.",do:"Create and activate the environment; install the pinned-compatible packages.",command:"python -m venv .venv\n# Windows: .venv\\Scripts\\activate\n# macOS/Linux: source .venv/bin/activate\npython -m pip install -r requirements.txt",check:"pip finishes without errors."},
   {title:"Download the authentic UCI retail data",why:"We need observed dated transactions, not an invented demo series.",do:"Run the verified official UCI archive downloader. It checks the archive SHA-256 before extracting the original workbook.",command:"python download_data.py",check:"data/Online Retail.xlsx exists and the archive fingerprint matches."},
   {title:"Clean and aggregate daily orders",why:"Cancellations, returns and non-UK orders would change the target definition.",do:"Read daily_revenue in src/forecast.py. Remove negative/zero quantities and cancelled invoices, retain positive UK orders, multiply quantity by unit price, then aggregate by date.",check:"Daily index includes calendar days. Missing transaction days are zero-filled with an explicit caveat."},
   {title:"Build leakage-free features and chronological splits",why:"A model cannot know tomorrow's actual sales today.",do:"Read make_features. lag_1 and lag_7 are yesterday and the same weekday last week; both precede the target date. Keep last 28 days for final test and preceding 28 days for validation.",check:"The train maximum date precedes validation; validation precedes test. No random time-series shuffle."},
   {title:"Compare baseline and models; view actual holdout",why:"A complex model must beat a simple business baseline before it is useful.",do:"Run train.py. Ridge and gradient boosting compete with the same-weekday baseline using validation MAE. The chosen approach is measured once on the untouched holdout.",command:"python -m pytest -q\npython train.py\npython -m streamlit run app.py",check:"artifacts contains metrics.json, test_predictions.csv, next_day.json and forecast.joblib. Dashboard shows actual, baseline and predictions."},
  ],
  files:[
   {path:"README.md",code:retailReadme,language:"markdown"},
   {path:"requirements.txt",code:retailRequirements,language:"text"},
   {path:"download_data.py",code:retailDownload,language:"python"},
   {path:"src/forecast.py",code:retailCore,language:"python"},
   {path:"train.py",code:retailTrain,language:"python"},
   {path:"app.py",code:retailApp,language:"python"},
   {path:"tests/test_forecast.py",code:retailTests,language:"python"}
  ],
 },
 "disaster-tweets": {
  title:"Can AI Detect a Real Disaster Tweet? Build a Text Classifier",
  label:"Project 7 · Natural Language Processing",
  hook:"One student types 'I am drowning in homework' and another reports 'Floodwater is entering homes.' Both mention disaster-like words. Can AI distinguish ordinary metaphors from disaster-related language? It cannot prove a disaster happened.",
  finish:"A real TF-IDF NLP pipeline comparing Logistic Regression and Naive Bayes, with cleaning, duplicate protection, stratified train/validation/test, threshold selection, metrics and a working Streamlit text classifier.",
  tools:"Python 3.12, VS Code, Kaggle Disaster Tweets train.csv (accept official competition terms), pandas, scikit-learn, TF-IDF, Logistic Regression, Naive Bayes, Streamlit, pytest",
  limitations:"This is language classification and not a real-time emergency, source-verification or public warning tool. Competition data cannot be redistributed. CI tests use an explicitly fictional local teaching fixture, not official Kaggle performance.",
  image:"/project-handbooks/disaster-tweets/process.svg",
  imageAlt:"Tweets flow into deduplication and TF-IDF then candidate models, validation threshold selection and held-out test",
  worked:{title:"Calculate precision, recall and F1 step by step",steps:[
   "Suppose on a hypothetical evaluation: true positives TP = 8; false positives FP = 2; false negatives FN = 4; true negatives TN = 6.",
   "Precision = TP/(TP+FP) = 8/(8+2) = 0.80.",
   "Recall = TP/(TP+FN) = 8/(8+4) ≈ 0.667.",
   "F1 = 2×Precision×Recall/(Precision+Recall) ≈ 0.727.",
   "Why not accuracy alone? Disaster-like messages might be relatively rare and false alarms and misses have different costs."
  ]},
  lessons:[
   {title:"Start with ambiguous language instead of jargon",why:"Words like fire, flood, crush and storm appear in both emergencies and jokes.",do:"Open VS Code → File → Open Folder → projects/disaster-tweets; inspect src/detect.py and the README.",check:"You can describe what 0 and 1 represent, without claiming to verify the truth of the tweet."},
   {title:"Prepare Python",why:"Keep library environments isolated and reproducible.",do:"Open Terminal → New Terminal, create a virtual environment and install project requirements.",command:"python -m venv .venv\n# Windows: .venv\\Scripts\\activate\n# macOS/Linux: source .venv/bin/activate\npython -m pip install -r requirements.txt",check:"pytest and scikit-learn import successfully."},
   {title:"Get real competition data legally",why:"Reproducibility includes dataset licensing and provenance.",do:"Go to the official Kaggle Natural Language Processing with Disaster Tweets competition, sign in, accept the competition rules, download train.csv into data/train.csv. Never commit the data.",check:"train.csv has text, target and usually id, keyword, location fields."},
   {title:"Clean and split without duplicate leakage",why:"Copies of the same message in train and test make accuracy appear better.",do:"Keep negations such as not. Strip links/handles, remove conflicting and identical normalized messages, then stratify into train, validation and test.",check:"No normalized text appears in two splits."},
   {title:"Represent language with TF-IDF and compare models",why:"TF-IDF scales word importance; one- and two-word expressions preserve some context.",do:"Use logistic regression and Naive Bayes to estimate P(disaster-related). Select threshold and model by validation F1, not by test outcomes.",check:"Threshold was selected without inspecting final test labels."},
   {title:"Evaluate, classify and discuss safety",why:"False positives and false negatives both matter; a model is not an emergency authority.",do:"Run offline tests, train on the actual Kaggle file, then start the app. Inspect accuracy, precision, recall, F1 and confusion matrix.",command:"python -m pytest -q\npython train.py\npython -m streamlit run app.py",check:"Local app responds to hypothetical text and explicitly cautions that labels do not establish real events."},
  ],
  files:[
   {path:"README.md",code:disasterReadme,language:"markdown"},
   {path:"requirements.txt",code:disasterRequirements,language:"text"},
   {path:"src/detect.py",code:disasterCore,language:"python"},
   {path:"train.py",code:disasterTrain,language:"python"},
   {path:"app.py",code:disasterApp,language:"python"},
   {path:"tests/test_detect.py",code:disasterTests,language:"python"}
  ],
 }
};
export function RemainingProjectPage({kind}:{kind:Key}) {
 const project = projects[kind];
 useEffect(() => {
  document.title = project.title + " | LearnMLAcademy";
  const description = project.finish.slice(0, 165);
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {canonical=document.createElement("link");canonical.rel="canonical";document.head.appendChild(canonical);}
  canonical.href="https://www.learnmlacademy.com/projects/" + kind;
 }, [kind,project]);
 return <div className="min-h-screen bg-slate-50">
   <header className="bg-slate-950 text-white">
    <div className="mx-auto max-w-6xl px-4 py-12">
     <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><ArrowLeft className="h-4 w-4"/> All hands-on projects</Link>
     <p className="mt-5 text-xs font-bold uppercase tracking-widest text-cyan-300">{project.label} · Full beginner handbook</p>
     <h1 className="mt-3 max-w-5xl text-3xl font-black sm:text-5xl">{project.title}</h1>
     <p className="mt-5 max-w-4xl text-base leading-8 text-slate-200">{project.hook}</p>
     <div className="mt-5 flex gap-3">
      <a href="#build" className="rounded-lg bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950">Build step by step</a>
      <a href="#complete-code" className="rounded-lg border border-slate-400 px-4 py-3 text-sm font-bold text-white">Copy all code</a>
     </div>
    </div>
   </header>
   <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
    <section className="grid gap-4 md:grid-cols-2">
     <div className="rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-extrabold text-slate-950">What you will build</h2>
      <p className="mt-3 leading-7 text-slate-700">{project.finish}</p>
     </div>
     <div className="rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-extrabold text-slate-950">Exact tools you will use</h2>
      <p className="mt-3 leading-7 text-slate-700">{project.tools}</p>
     </div>
    </section>
    <figure className="rounded-2xl border bg-white p-5">
     <img src={project.image} alt={project.imageAlt} className="w-full" width="960" height="190"/>
     <figcaption className="mt-3 text-sm text-slate-600">The actual order of operations in this learning project, illustrated. Not a screenshot of a trained model.</figcaption>
    </figure>
    <section className="rounded-2xl border border-indigo-200 bg-white p-6">
     <h2 className="text-xl font-black text-slate-950">{project.worked.title}</h2>
     <ol className="mt-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-slate-700">
      {project.worked.steps.map((line,i)=><li key={i}>{line}</li>)}
     </ol>
    </section>
    <div id="build" className="scroll-mt-12 space-y-6">
      {project.lessons.map((lesson,i)=><section key={lesson.title} className="rounded-2xl border bg-white p-5 shadow-sm sm:p-7">
       <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-700 text-sm font-black text-white">{i+1}</span>
        <h2 className="pt-1 text-xl font-black text-slate-950">{lesson.title}</h2>
       </div>
       <p className="mt-4 text-sm leading-7 text-slate-700"><strong>Why:</strong> {lesson.why}</p>
       <p className="mt-2 text-sm leading-7 text-slate-700"><strong>Do this:</strong> {lesson.do}</p>
       {lesson.command && <HandbookCode title="Type these terminal commands" code={lesson.command} language="bash" type="runnable"/>}
       <p className="mt-4 flex items-start gap-2 text-sm leading-7 text-emerald-900"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0"/><span><strong>Check:</strong> {lesson.check}</span></p>
      </section>)}
    </div>
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
     <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950"><ShieldCheck className="h-6 w-6"/> Limitations you should understand</h2>
     <p className="mt-3 text-sm leading-7 text-slate-800">{project.limitations}</p>
    </section>
    <section id="complete-code" className="scroll-mt-12 rounded-2xl border bg-white p-5 sm:p-7">
     <h2 className="flex items-center gap-2 text-2xl font-black text-slate-950"><FileCode2 className="h-6 w-6"/> Complete source code — copy every file</h2>
     <p className="mt-3 text-sm leading-7 text-slate-700">This is the exact code used in the repository, loaded directly as raw source in the website build. Each file below is complete, not abbreviated. Create the named file inside the project folder, paste it, and then run the commands above.</p>
     {project.files.map(file=><div key={file.path} className="mt-6">
       <h3 className="break-all font-mono text-sm font-extrabold text-slate-900">{file.path}</h3>
       <HandbookCode title={file.path} language={file.language} code={file.code} type="runnable"/>
     </div>)}
     <h3 className="mt-7 text-lg font-extrabold text-slate-950">Project verification workflow</h3>
     <HandbookCode title=".github/workflows/three-projects-verify.yml" language="yaml" code={ciWorkflow} type="config"/>
    </section>
   </main>
 </div>;
}
