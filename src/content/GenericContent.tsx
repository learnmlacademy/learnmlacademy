import React from "react";
import { BookOpen } from "lucide-react";

interface GenericContentProps {
  title: string;
}

export function GenericContent({ title }: GenericContentProps) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Welcome to the comprehensive guide on {title}. This section covers the
          fundamental concepts, mathematical intuition, and practical
          applications that drive this topic in the realm of Machine Learning
          and Data Science.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Core Concepts
      </h2>
      <p className="text-slate-700 mb-4">
        Understanding the mechanics of {title} is critical for applying it
        effectively to real-world datasets. This approach leverages specific
        patterns and structures within data to optimize learning or achieve a
        specific goal.
      </p>
      <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-6">
        <li>
          <strong>Theoretical Foundation:</strong> Forms the basis of many
          advanced ML approaches.
        </li>
        <li>
          <strong>Primary Objective:</strong> Used generally to minimize error,
          uncover hidden structures, or optimize specific objectives.
        </li>
        <li>
          <strong>Scalability:</strong> Effective for specific data scales, but
          requires tuning and appropriate preprocessing like all models.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Case Study & Python Implementation
      </h2>
      <p className="text-slate-700 mb-4">
        Here is a standard Scikit-Learn (or relevant library) implementation
        pattern for {title}, demonstrating how to instantiate, train, and
        evaluate it using Python.
      </p>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono my-6 overflow-x-auto border border-slate-800">
        <pre className="!m-0">
          <code className="language-python">
            <span className="text-[#6a9955]">
              # Example Standard Implementation Flow
            </span>
            {"\n"}
            <span className="text-[#569cd6]">import</span> numpy{" "}
            <span className="text-[#569cd6]">as</span> np{"\n"}
            <span className="text-[#569cd6]">
              from
            </span> sklearn.model_selection{" "}
            <span className="text-[#569cd6]">import</span> train_test_split
            {"\n"}
            {"\n"}
            <span className="text-[#6a9955]">
              # 1. Dataset Generation / Loading
            </span>
            {"\n"}X = np.random.rand(<span className="text-[#b5cea8]">100</span>
            , <span className="text-[#b5cea8]">5</span>){" "}
            <span className="text-[#6a9955]"># 100 samples, 5 features</span>
            {"\n"}y = np.random.randint(
            <span className="text-[#b5cea8]">0</span>,{" "}
            <span className="text-[#b5cea8]">2</span>,{" "}
            <span className="text-[#b5cea8]">100</span>){" "}
            <span className="text-[#6a9955]"># Binary target</span>
            {"\n"}
            {"\n"}
            <span className="text-[#6a9955]"># 2. Train / Test Split</span>
            {"\n"}
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=
            <span className="text-[#b5cea8]">0.2</span>, random_state=
            <span className="text-[#b5cea8]">42</span>){"\n"}
            {"\n"}
            <span className="text-[#6a9955]">
              # 3. Model Initialization (Placeholder)
            </span>
            {"\n"}
            <span className="text-[#4fc1ff]">print</span>(f
            <span className="text-[#ce9178]">
              "Initializing Model for: {title}..."
            </span>
            ){"\n"}
            <span className="text-[#6a9955]"># model = ModelClassName()</span>
            {"\n"}
            {"\n"}
            <span className="text-[#6a9955]"># 4. Model Training</span>
            {"\n"}
            <span className="text-[#4fc1ff]">print</span>(
            <span className="text-[#ce9178]">"Fitting data..."</span>){"\n"}
            <span className="text-[#6a9955]">
              # model.fit(X_train, y_train)
            </span>
            {"\n"}
            {"\n"}
            <span className="text-[#6a9955]"># 5. Prediction</span>
            {"\n"}
            <span className="text-[#6a9955]">
              # predictions = model.predict(X_test)
            </span>
            {"\n"}
            <span className="text-[#4fc1ff]">print</span>(
            <span className="text-[#ce9178]">
              "Prediction complete! (Accuracy / Error evaluation goes here)"
            </span>
            )
          </code>
        </pre>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
        <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">
          Output Explanation
        </h4>
        <pre className="bg-white p-3 rounded border border-slate-200 text-sm font-mono text-slate-700 mb-4 whitespace-pre-wrap">
          Initializing Model for: {title}... Fitting data... Prediction
          complete! (Accuracy / Error evaluation goes here)
        </pre>
        <ul className="text-sm text-slate-600 space-y-2 pl-5 list-disc">
          <li>
            <strong>Data Prep:</strong> Like all ML tasks, data is split into
            training and testing sets to prevent overfitting.
          </li>
          <li>
            <strong>Training:</strong> The `.fit()` step allows the model to
            learn the underlying mathematical mapping.
          </li>
          <li>
            <strong>Evaluation:</strong> The `.predict()` output must be
            compared to `y_test` using appropriate metrics.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Practice Checkpoint
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden mb-8">
        <BookOpen className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Review Questions
        </h4>
        <p className="font-medium text-slate-200">Reflect on the following:</p>
        <ol className="list-decimal pl-5 space-y-3 mt-3 text-slate-300">
          <li>
            What specific data structures or relationships make {title} the
            ideal choice?
          </li>
          <li>
            Are there any parameters in the initialization phase that
            drastically change the model's behavior?
          </li>
        </ol>
      </div>

      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6 my-8">
        <h3 className="font-bold text-lg text-indigo-900 mb-2">Summary</h3>
        <p className="text-sm text-indigo-800 m-0 leading-relaxed">
          {title} is a vital technique in the machine learning workflow. By
          understanding both its mathematical foundation and the practical
          Scikit-Learn (or similar) implementation, you can make informed
          decisions about when to apply it, how to tune it for maximum
          performance, and what limitations to watch out for in production
          systems.
        </p>
      </div>
    </>
  );
}
