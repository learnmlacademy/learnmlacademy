import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Database,
  Network,
  ShieldCheck,
  Tags,
  XCircle,
} from 'lucide-react';

export function SemiSupervisedContent() {
  return (
    <div id="semi-supervised-learning-guide">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Semi-Supervised Learning
      </h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Suppose you have <strong>10,000 photos</strong>, but a human has labelled only
        <strong> 300</strong> of them. Throwing away the other 9,700 photos feels wasteful,
        but paying people to label everything may be expensive. <strong>Semi-supervised learning</strong>
        asks whether the unlabelled examples can help us learn while we still use the labels we trust.
      </p>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10 not-prose">
        <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-4">Understand first</p>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 text-center">
          <div className="flex-1 bg-white border border-indigo-100 rounded-lg p-4">
            <Tags className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <p className="font-bold text-slate-900">Small labelled set</p>
            <p className="text-sm text-slate-600">Examples with known answers</p>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-500 mx-auto rotate-90 md:rotate-0" />
          <div className="flex-1 bg-white border border-indigo-100 rounded-lg p-4">
            <Database className="w-6 h-6 mx-auto mb-2 text-slate-600" />
            <p className="font-bold text-slate-900">Large unlabelled set</p>
            <p className="text-sm text-slate-600">Examples whose answers are unknown</p>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-500 mx-auto rotate-90 md:rotate-0" />
          <div className="flex-1 bg-white border border-indigo-100 rounded-lg p-4">
            <Brain className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
            <p className="font-bold text-slate-900">Learn from both</p>
            <p className="text-sm text-slate-600">When the method's assumptions are useful</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Supervised, Unsupervised, and Semi-Supervised
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-10 not-prose">
        <table className="w-full text-sm bg-white">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Approach</th>
              <th className="p-3 text-left">Labels available?</th>
              <th className="p-3 text-left">Typical purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-bold text-slate-800">Supervised learning</td>
              <td className="p-3 text-slate-600">Labels for the training examples</td>
              <td className="p-3 text-slate-600">Learn input → target mapping</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-800">Unsupervised learning</td>
              <td className="p-3 text-slate-600">No target labels</td>
              <td className="p-3 text-slate-600">Discover structure such as clusters or representations</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-indigo-800">Semi-supervised learning</td>
              <td className="p-3 text-slate-600">Some labelled + some unlabelled examples</td>
              <td className="p-3 text-slate-600">Use both sources to learn a supervised task</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5 mb-10">
        <div className="flex gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 mb-1">Unlabelled data does not automatically improve a model</p>
            <p className="text-amber-900/90 leading-relaxed m-0">
              Semi-supervised methods can help when the unlabelled data reflects useful structure related to the target.
              They can also add little value—or even hurt—when their assumptions are wrong, pseudo-labels are poor,
              or the unlabelled data comes from a different distribution.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        A Familiar Example: Classifying Emails
      </h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Imagine that you collected thousands of emails, but only a small number were manually labelled as
        <strong> Spam</strong> or <strong>Not Spam</strong>.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-10 not-prose">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-2">Known label</p>
          <p className="font-bold text-rose-900">“Win a prize now!”</p>
          <p className="text-sm text-rose-800 mt-1">Spam</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2">Known label</p>
          <p className="font-bold text-emerald-900">“Meeting moved to 3 PM”</p>
          <p className="text-sm text-emerald-800 mt-1">Not Spam</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Unknown label</p>
          <p className="font-bold text-slate-900">Thousands of other emails</p>
          <p className="text-sm text-slate-600 mt-1">Unlabelled</p>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-8 text-slate-800">
        A semi-supervised method may use the labelled emails to anchor the classes and the unlabelled emails to
        learn additional structure. The exact mechanism depends on the algorithm.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Two Core Ways to Use Unlabelled Data
      </h2>

      <div className="space-y-5 mb-10 not-prose">
        <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold text-indigo-950 mb-2">Self-training: create careful pseudo-labels</h3>
              <p className="text-indigo-900 leading-relaxed mb-3">
                Train a supervised classifier using the labelled examples, predict the unlabelled examples,
                add selected high-confidence predictions as <strong>pseudo-labels</strong>, and fit again.
              </p>
              <div className="bg-white border border-indigo-100 rounded-lg p-4 text-sm text-slate-700">
                Labelled data → train → predict unlabelled data → keep selected confident predictions → retrain
              </div>
            </div>
          </div>
        </div>

        <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold text-emerald-950 mb-2">Graph methods: spread labels through similarity</h3>
              <p className="text-emerald-900 leading-relaxed mb-3">
                Treat examples as nodes in a graph. Similar examples receive stronger connections, and information
                from labelled nodes is propagated toward related unlabelled nodes.
              </p>
              <div className="bg-white border border-emerald-100 rounded-lg p-4 text-sm text-slate-700">
                Labelled + unlabelled examples → similarity graph → propagate label information
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Self-Training: A Tiny Step-by-Step Example
      </h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        Suppose a classifier predicts three unlabelled examples with these maximum class probabilities:
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5 not-prose">
        <table className="w-full text-sm bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Unlabelled example</th>
              <th className="p-3 text-left">Predicted class</th>
              <th className="p-3 text-left">Confidence</th>
              <th className="p-3 text-left">With threshold = 0.90</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr><td className="p-3">A</td><td className="p-3">Spam</td><td className="p-3">0.97</td><td className="p-3 font-semibold text-emerald-700">Add pseudo-label</td></tr>
            <tr><td className="p-3">B</td><td className="p-3">Not Spam</td><td className="p-3">0.93</td><td className="p-3 font-semibold text-emerald-700">Add pseudo-label</td></tr>
            <tr><td className="p-3">C</td><td className="p-3">Spam</td><td className="p-3">0.61</td><td className="p-3 font-semibold text-slate-500">Leave unlabelled</td></tr>
          </tbody>
        </table>
      </div>

      <p className="text-slate-700 leading-relaxed mb-4">
        After adding A and B, the classifier can be fitted again. This process may continue for several rounds.
      </p>

      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-rose-900 mb-2">Why confidence needs caution</p>
        <p className="text-rose-800 leading-relaxed m-0">
          A model can be confidently wrong. If incorrect pseudo-labels are repeatedly added, the next model may learn
          those mistakes and reinforce them. A high threshold reduces how many pseudo-labels are accepted, but it does
          not guarantee that accepted labels are correct.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        When Can Unlabelled Data Help?
      </h2>

      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Different semi-supervised algorithms rely on different assumptions. Three common intuitions are useful:
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-10 not-prose">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <Network className="w-6 h-6 text-indigo-600 mb-3" />
          <h3 className="font-bold text-slate-900 mb-2">Smoothness / continuity</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Nearby or very similar examples are often expected to have similar labels.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <Database className="w-6 h-6 text-emerald-600 mb-3" />
          <h3 className="font-bold text-slate-900 mb-2">Cluster assumption</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dense groups of examples may correspond to classes, with useful decision boundaries passing through lower-density regions.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <Brain className="w-6 h-6 text-violet-600 mb-3" />
          <h3 className="font-bold text-slate-900 mb-2">Manifold assumption</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            High-dimensional observations may lie near lower-dimensional structure that unlabelled examples help reveal.
          </p>
        </div>
      </div>

      <p className="text-slate-700 leading-relaxed mb-10">
        These are <strong>assumptions and modeling intuitions—not universal laws</strong>. For example, two classes can overlap heavily,
        or nearby points can have different labels. In such cases, unlabelled structure may not align with the prediction target.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Python Example: Label Spreading with Scikit-Learn
      </h2>

      <p className="text-lg leading-relaxed mb-5 text-slate-800">
        In Scikit-Learn's semi-supervised graph algorithms, unlabelled targets are represented by <code>-1</code>.
        The example below keeps only <strong>4 labelled training examples per Iris class</strong>. The remaining training
        examples are supplied as unlabelled observations, while the test set stays completely separate.
      </p>

      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-sm mb-5 not-prose">
        <div className="px-4 py-3 bg-slate-800 text-slate-200 text-sm font-semibold">Python</div>
        <pre className="text-[#d4d4d4] font-mono text-sm p-5 overflow-x-auto whitespace-pre m-0">{`import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.semi_supervised import LabelSpreading
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42,
    stratify=y
)

rng = np.random.default_rng(42)
y_semi = np.full_like(y_train, -1)

# Keep only 4 known labels from each class.
for class_id in np.unique(y_train):
    class_rows = np.where(y_train == class_id)[0]
    labeled_rows = rng.choice(class_rows, size=4, replace=False)
    y_semi[labeled_rows] = y_train[labeled_rows]

labeled_count = np.sum(y_semi != -1)
unlabeled_count = np.sum(y_semi == -1)

model = make_pipeline(
    StandardScaler(),
    LabelSpreading(
        kernel="knn",
        n_neighbors=7,
        alpha=0.2,
        max_iter=100
    )
)

model.fit(X_train, y_semi)
predictions = model.predict(X_test)

print("Labeled training samples:", labeled_count)
print("Unlabeled training samples:", unlabeled_count)
print("Held-out test samples:", len(y_test))
print("Test accuracy:", round(accuracy_score(y_test, predictions), 3))`}</pre>
      </div>

      <div className="bg-slate-900 rounded-xl p-5 mb-5 not-prose">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Expected output</p>
        <pre className="text-emerald-300 font-mono text-sm whitespace-pre-wrap m-0">{`Labeled training samples: 12
Unlabeled training samples: 93
Held-out test samples: 45
Test accuracy: 0.889`}</pre>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-blue-900 mb-2">What does this example prove?</p>
        <p className="text-blue-900/90 leading-relaxed mb-2">
          It demonstrates the mechanics: the model receives only 12 known labels but also sees 93 unlabelled training feature vectors,
          and it is evaluated on 45 untouched test examples.
        </p>
        <p className="text-blue-900/90 leading-relaxed m-0">
          It does <strong>not</strong> prove that semi-supervised learning is always better. To test that claim fairly,
          compare it against suitable supervised baselines using the same label budget and evaluate both on the same held-out data.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Label Propagation vs Label Spreading
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-5 not-prose">
        <table className="w-full text-sm bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Aspect</th>
              <th className="p-3 text-left">LabelPropagation</th>
              <th className="p-3 text-left">LabelSpreading</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-3 font-bold text-slate-700">Graph idea</td>
              <td className="p-3 text-slate-600">Uses the similarity graph directly</td>
              <td className="p-3 text-slate-600">Uses a normalized graph-Laplacian formulation</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-700">Input-label clamping</td>
              <td className="p-3 text-slate-600">Hard clamping</td>
              <td className="p-3 text-slate-600">Soft clamping controlled by <code>alpha</code></td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-700">Noise</td>
              <td className="p-3 text-slate-600">Can be more sensitive to incorrect labels</td>
              <td className="p-3 text-slate-600">Regularization can make it more robust to noise</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-700">Built-in kernels</td>
              <td className="p-3 text-slate-600">RBF or KNN</td>
              <td className="p-3 text-slate-600">RBF or KNN</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-slate-700 leading-relaxed mb-10">
        With <code>LabelSpreading</code>, <code>alpha</code> controls how much an example adopts information from its neighbors
        versus retaining its initial label information. It is a model parameter to tune—not a universal constant.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Going Deeper: Other Semi-Supervised Approaches
      </h2>

      <div className="space-y-4 mb-10 not-prose">
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-900 mb-2">1. Self-training / pseudo-labeling</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Iteratively add selected model predictions to the labelled set. Scikit-Learn provides
            <code> SelfTrainingClassifier</code>, whose threshold-based mode relies on meaningful probability estimates.
          </p>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-900 mb-2">2. Co-training</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Classical co-training learns from different views of the same examples, such as page text and link information.
            Its classical theory assumes informative views with a degree of independence; practical variants may relax those assumptions.
          </p>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-900 mb-2">3. Graph-based methods</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Construct a similarity graph and propagate label information. This is the family containing
            <code> LabelPropagation</code> and <code>LabelSpreading</code>.
          </p>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-900 mb-2">4. Consistency regularization</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Encourage the model to make compatible predictions when an unlabelled input is perturbed or augmented in ways
            that should not change its class. Modern image methods such as FixMatch use this broad idea together with pseudo-labeling.
          </p>
        </div>
        <div className="border border-slate-200 rounded-xl p-5 bg-white">
          <h3 className="font-bold text-slate-900 mb-2">5. Semi-supervised generative approaches</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Some generative-model designs use labelled and unlabelled observations jointly. Semi-supervised VAE/GAN variants exist,
            but they are more advanced than the graph and self-training methods introduced here.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Semi-Supervised vs Self-Supervised Learning
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mb-10 not-prose">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-950 mb-2">Semi-supervised</h3>
          <p className="text-sm text-indigo-900 leading-relaxed">
            The training problem directly contains both labelled and unlabelled examples for a supervised target.
          </p>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
          <h3 className="font-bold text-violet-950 mb-2">Self-supervised</h3>
          <p className="text-sm text-violet-900 leading-relaxed">
            The system creates a learning signal from the data itself—for example by predicting masked or transformed parts—without requiring human target labels for that pretraining task.
          </p>
        </div>
      </div>

      <p className="text-slate-700 leading-relaxed mb-10">
        They are related because both can benefit from unlabelled data, but they are <strong>not synonyms</strong>.
        A self-supervised representation may later be fine-tuned with labelled data, while classical semi-supervised methods directly mix labelled and unlabelled examples during learning.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Real-World Situations Where It Can Be Useful
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mb-10 not-prose">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-950 mb-2">Medical imaging</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Large image archives may exist while expert annotation is costly and slow.</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-950 mb-2">Text classification</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Organizations may have millions of documents but only a small manually categorized subset.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-slate-950 mb-2">Security / anomaly triage</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Raw events can be abundant while reliable analyst labels are limited.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-bold text-emerald-950 mb-2">Product and content classification</h3>
          <p className="text-sm text-slate-700 leading-relaxed">Catalogs may grow faster than humans can accurately label every new item.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        When to Consider It—and When to Be Careful
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10 not-prose">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-bold text-emerald-900 flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5" /> Good reason to investigate it
          </h3>
          <ul className="space-y-2 text-sm text-emerald-900">
            <li>• Reliable labels are expensive or scarce.</li>
            <li>• You have much more unlabelled data from the relevant population.</li>
            <li>• The unlabelled structure plausibly relates to the target.</li>
            <li>• You can evaluate against a trustworthy labelled validation/test set.</li>
          </ul>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5" /> Be careful when
          </h3>
          <ul className="space-y-2 text-sm text-rose-900">
            <li>• Unlabelled data comes from a different population or time period.</li>
            <li>• Classes overlap and similarity does not imply the same target.</li>
            <li>• Pseudo-label mistakes are expensive or difficult to detect.</li>
            <li>• Graph construction is too costly for the data scale.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">
        Evaluation: Keep the Test Labels Truly Hidden
      </h2>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 not-prose">
        <div className="flex flex-col md:flex-row items-center gap-3 text-center">
          <div className="flex-1 bg-white rounded-lg border p-4">
            <p className="font-bold text-slate-900">Training pool</p>
            <p className="text-sm text-slate-600">Some labels known, others marked unlabelled</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
          <div className="flex-1 bg-white rounded-lg border p-4">
            <p className="font-bold text-slate-900">Tune / validate</p>
            <p className="text-sm text-slate-600">Compare choices fairly</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
          <div className="flex-1 bg-white rounded-lg border p-4">
            <ShieldCheck className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
            <p className="font-bold text-slate-900">Final labelled test set</p>
            <p className="text-sm text-slate-600">Untouched until final evaluation</p>
          </div>
        </div>
      </div>

      <p className="text-slate-700 leading-relaxed mb-10">
        It is legitimate for a semi-supervised algorithm to use <strong>unlabelled training features</strong>; that is the point.
        But final test labels must not leak into training, pseudo-label selection, threshold tuning, graph tuning, or model selection.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Scalability Note</h2>

      <p className="text-slate-700 leading-relaxed mb-10">
        Graph-based methods can become expensive as the number of examples grows. In Scikit-Learn's label-propagation family,
        the RBF kernel builds a fully connected dense similarity graph, whereas the KNN kernel can use a much sparser neighborhood graph.
        So “semi-supervised learning scales to millions of examples” is <strong>not</strong> a safe general claim—the algorithm and representation matter.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Common Mistakes</h2>

      <div className="space-y-3 mb-10 not-prose">
        {[
          "Assuming that more unlabelled data must improve accuracy.",
          "Treating a pseudo-label as if it were a human-verified ground-truth label.",
          "Evaluating on the same examples whose labels were used during model development.",
          "Mixing unlabelled data from a different distribution without checking domain shift.",
          "Calling all self-supervised pretraining 'semi-supervised learning'.",
          "Ignoring class coverage—for example, having no trustworthy labelled examples for an important class.",
        ].map((mistake, index) => (
          <div key={mistake} className="flex items-start gap-3 bg-white border border-slate-200 rounded-lg p-4">
            <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm shrink-0">{index + 1}</span>
            <p className="text-sm text-slate-700 leading-relaxed m-0">{mistake}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Quick Recap</h2>

      <div className="space-y-4 mb-10 not-prose">
        <details className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Why can pseudo-labeling fail?</summary>
          <p className="text-sm text-slate-700 mt-3 mb-0">Because model predictions can be wrong. If wrong predictions are accepted as labels, later training rounds may reinforce those errors.</p>
        </details>
        <details className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">What does -1 mean in Scikit-Learn's graph-based example?</summary>
          <p className="text-sm text-slate-700 mt-3 mb-0">It marks a training sample whose target label is unknown to the semi-supervised algorithm.</p>
        </details>
        <details className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <summary className="font-bold text-slate-900 cursor-pointer">Does 0.889 test accuracy prove semi-supervised learning is better?</summary>
          <p className="text-sm text-slate-700 mt-3 mb-0">No. It is one reproducible teaching run. A fair comparison needs suitable supervised baselines using the same label budget and the same held-out evaluation data.</p>
        </details>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-5 text-slate-800 border-b pb-2">Final Summary</h2>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <p className="text-indigo-950 font-bold text-lg mb-3">Remember this:</p>
        <p className="text-indigo-900 leading-relaxed m-0">
          <strong>Semi-supervised learning uses a small amount of labelled data together with unlabelled data.</strong>
          The unlabelled examples can provide useful structure, but only when that structure is relevant to the target and the algorithm uses it well.
          Always compare against a supervised baseline and evaluate on genuinely held-out labelled data.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10 not-prose">
        <a href="/learn/supervised-learning-intro" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Review</p>
          <p className="font-bold text-slate-900">Supervised Learning →</p>
        </a>
        <a href="/learn/unsupervised-learning-intro" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Review</p>
          <p className="font-bold text-slate-900">Unsupervised Learning →</p>
        </a>
        <a href="/learn/online-learning" className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Next</p>
          <p className="font-bold text-slate-900">Online Learning →</p>
        </a>
      </div>
    </div>
  );
}
