import React from "react";
import { Bot, Lightbulb, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { MLWorkflowDiagram } from "../../components/diagrams/MLDiagrams";

export function WhatIsMLContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
        What is Machine Learning?
      </h1>

      <div className="text-xl text-slate-700 mb-8 leading-relaxed">
        Machine Learning (ML) is a branch of Artificial Intelligence (AI) where computers learn from data and improve their performance without being explicitly programmed for every situation.
      </div>

      <p className="text-lg leading-relaxed mb-4">
        In traditional programming, developers write fixed rules to solve problems. However, in Machine Learning, computers learn patterns from data and use those patterns to make predictions or decisions.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Simple Understanding of Machine Learning
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Imagine teaching a small child to identify fruits. You show them:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-3">🍎</span>
          <h4 className="font-bold text-rose-900 text-lg">Apples</h4>
          <p className="text-rose-800 text-sm mt-2">Show them apples repeatedly.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-3">🍌</span>
          <h4 className="font-bold text-amber-900 text-lg">Bananas</h4>
          <p className="text-amber-800 text-sm mt-2">Show them bananas repeatedly.</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex flex-col items-center text-center">
          <span className="text-3xl mb-3">🍊</span>
          <h4 className="font-bold text-orange-900 text-lg">Oranges</h4>
          <p className="text-orange-800 text-sm mt-2">Show them oranges repeatedly.</p>
        </div>
      </div>

      <p className="text-lg leading-relaxed mb-4">
        After seeing enough examples, the child starts recognizing fruits independently. Machine Learning works in a similar way: <span className="italic text-slate-700">The machine studies examples (data), learns patterns, and later predicts results for new unseen data.</span>
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Real-Life Examples of Machine Learning
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Machine Learning is already part of our daily life even if we do not notice it.
      </p>

      <div className="space-y-6 mb-10">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center"><Bot className="w-5 h-5 mr-2 text-indigo-600" /> Example 1: YouTube Recommendations</h3>
           <p className="text-lg text-slate-700 mb-3">When you watch videos on YouTube, the platform studies what videos you watch, how long you watch, and what you like or skip. Using this information, Machine Learning predicts what videos you may enjoy next.</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center"><CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" /> Example 2: Email Spam Detection</h3>
           <p className="text-lg text-slate-700 mb-3">Gmail automatically separates spam emails from important emails. The ML model learns patterns such as suspicious words, unknown senders, and repeated advertisements. Then it predicts whether a new email is spam or not.</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
           <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-amber-600" /> Example 3: Online Shopping</h3>
           <p className="text-lg text-slate-700 mb-3">E-commerce websites like Amazon recommend products based on your search history, previous purchases, and products viewed by similar users.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        How Machines Learn: The Workflow
      </h2>
      <p className="text-lg leading-relaxed mb-4">
        Machine Learning follows a step-by-step learning process. Data is the foundation of Machine Learning. Machines require examples to learn patterns.
      </p>
      <MLWorkflowDiagram />

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800 font-medium text-lg mb-2">The Basic Learning Process:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700">
          <li><strong>Data Collection:</strong> Gathering raw text, images, videos, audio, or numerical data.</li>
          <li><strong>Data Preparation:</strong> Cleaning, organizing, and formatting data. Removing errors and missing values.</li>
          <li><strong>Algorithm Selection:</strong> Choosing a mathematical procedure that suits the problem type (e.g., Regression, Classification, Clustering).</li>
          <li><strong>Model Training:</strong> The machine studies data repeatedly and adjusts itself to reduce errors.</li>
          <li><strong>Testing:</strong> Verifying the model using new unseen data.</li>
        </ol>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Machine Learning enables computers to learn from experience and make intelligent decisions using data. It has become an essential technology because it solves complex problems, automates tasks, improves accuracy, and provides personalized user experiences. 
      </p>
      
      <p className="text-lg leading-relaxed mb-6">
        As modern applications aim to build more engaging and efficient user experiences, the reliance on high-quality data and robust ML algorithms becomes paramount. The continuous collection of varied datasets allows systems to continuously improve over time.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Machine Learning fundamentally shifts the programming paradigm from "writing explicit rules" to "providing data and letting the machine discover the rules." The quality and quantity of your data directly determine the intelligence of your resulting models.
        </p>
      </div>
    </>
  );
}

