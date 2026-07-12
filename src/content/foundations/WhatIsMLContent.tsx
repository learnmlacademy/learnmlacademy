import React from "react";
import { AnimatedWhatIsML, AnimatedAnalogy } from "../../components/diagrams/AnimatedFoundationDiagrams";

import { Bot, Lightbulb, TrendingUp, Layers, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";
import { MLWorkflowDiagram } from "../../components/diagrams/MLDiagrams";

export function WhatIsMLContent() {
  return (
    <>
      <p className="text-lg leading-relaxed mb-8">
        In traditional programming, developers write fixed rules to solve problems. For instance, if you want a program to calculate taxes, you write the exact formulas into the code. However, in Machine Learning, you provide the computer with examples of data and their corresponding outcomes, allowing it to learn the underlying patterns and use those patterns to make predictions or decisions on new, unseen data.
      </p>
      <AnimatedWhatIsML />


      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        A Simple Analogy: How Humans Learn
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Imagine teaching a small child to identify different kinds of fruit. You don't give the child a strict set of rules like "if it is exactly 3 inches wide and red, it is an apple." Instead, you show them:
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
        <ul className="list-disc pl-6 space-y-4 text-slate-800 text-lg">
          <li><strong>Apples:</strong> You hold up various apples (red, green, large, small) and say "Apple."</li>
          <li><strong>Bananas:</strong> You hold up different bananas (yellow, green, spotted) and say "Banana."</li>
          <li><strong>Oranges:</strong> You show them different oranges and say "Orange."</li>
        </ul>
      </div>

      <AnimatedAnalogy />

      <p className="text-lg leading-relaxed mb-10">
        After seeing enough examples, the child's brain automatically extracts the defining features (shape, color, texture) and starts recognizing fruits independently, even ones they have never seen before. Machine Learning works in a remarkably similar way: <span className="italic text-slate-700">The machine studies examples (data), learns the hidden rules, and later predicts results accurately.</span>
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Real-Life Examples of Machine Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Machine Learning is already deeply integrated into our daily lives, often operating silently in the background to streamline our digital experiences.
      </p>

      <div className="space-y-8 mb-12">
        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md">
           <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><Bot className="w-6 h-6 mr-3 text-blue-600" /> YouTube & Netflix Recommendations</h3>
           <p className="text-lg text-slate-800">When you interact with a streaming platform, it constantly studies your behavior: what videos you watch, how long you stay engaged, what you skip, and what you "like." Using this massive dataset, Machine Learning algorithms predict what content you will likely enjoy next, keeping you engaged on the platform for longer.</p>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md">
           <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><ShieldAlert className="w-6 h-6 mr-3 text-amber-600" /> Email Spam & Fraud Detection</h3>
           <p className="text-lg text-slate-800">Your email provider automatically filters out malicious or spam messages. The ML model learns patterns from millions of emails—such as suspicious keywords, unusual sender addresses, and strange formatting—to accurately classify new incoming emails as either "Spam" or "Inbox." Similarly, banks use ML to instantly detect unusual credit card transactions and flag them as potential fraud.</p>
        </div>

        <div className="pl-4 border-l-4 border-purple-400 bg-purple-50 py-4 pr-4 rounded-r-md">
           <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><TrendingUp className="w-6 h-6 mr-3 text-purple-600" /> Dynamic Pricing in Ridesharing</h3>
           <p className="text-lg text-slate-800">Apps like Uber and Lyft use machine learning to calculate fares dynamically. The algorithm analyzes real-time data including weather conditions, traffic patterns, historical demand during specific times of day, and driver availability to predict the optimal price for a ride at any given moment.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Trending & Advanced Applications
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Beyond everyday conveniences, Machine Learning is driving some of the most cutting-edge technological advancements in the world today.
      </p>

      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-12">
        <li>
          <strong className="text-slate-900">Generative AI & Large Language Models:</strong> Tools like ChatGPT and Midjourney represent a massive leap in ML capabilities. These models are trained on internet-scale datasets to understand context, generate human-like text, write code, and create stunning original artwork from simple prompts.
        </li>
        <li>
          <strong className="text-slate-900">Autonomous Vehicles:</strong> Self-driving cars rely on complex computer vision models (a specialized form of ML) to process real-time video feeds from multiple cameras, identify pedestrians, read street signs, and make split-second driving decisions safely.
        </li>
        <li>
          <strong className="text-slate-900">Personalized Medicine:</strong> In healthcare, ML is being used to analyze medical images (like X-rays and MRIs) faster and sometimes more accurately than human radiologists. It is also used to predict patient risks and tailor highly specific treatment plans based on genetic data.
        </li>
      </ul>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        How Machines Learn: The Workflow
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Machine Learning follows a structured, step-by-step learning process. Data is the fundamental fuel; without high-quality examples, the machine cannot discover accurate patterns.
      </p>
      
      <MLWorkflowDiagram />

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-100 py-4 pr-4 rounded-r-md mb-12 mt-8">
        <p className="text-slate-900 font-bold text-xl mb-4">The 5 Core Steps of Machine Learning:</p>
        <ol className="list-decimal pl-6 space-y-4 text-slate-800 text-lg">
          <li><strong>Data Collection:</strong> Gathering raw text, images, videos, audio, or numerical data relevant to the problem you are trying to solve.</li>
          <li><strong>Data Preparation:</strong> Cleaning, organizing, and formatting data. This involves handling missing values, removing outliers, and transforming data into a format the algorithm can understand.</li>
          <li><strong>Algorithm Selection:</strong> Choosing a mathematical model that suits the problem type (e.g., choosing a regression algorithm to predict a number, or a classification algorithm to predict a category).</li>
          <li><strong>Model Training:</strong> The core learning phase. The machine iteratively studies the data, makes predictions, calculates its own error, and adjusts its internal parameters to minimize that error over time.</li>
          <li><strong>Evaluation & Deployment:</strong> Testing the trained model on entirely new, unseen data to verify its accuracy. Once verified, it is deployed into the real world to make live predictions.</li>
        </ol>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />

      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Algorithm</p>
          <p className="text-slate-700 text-base leading-relaxed">A set of mathematical rules or instructions that a computer follows to learn patterns from data.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Artificial Intelligence (AI)</p>
          <p className="text-slate-700 text-base leading-relaxed">The broader concept of machines being able to carry out tasks in a way that we would consider "smart."</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Model</p>
          <p className="text-slate-700 text-base leading-relaxed">The output of a machine learning algorithm after it has been trained on data. It represents the mathematical rules learned.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Training Data</p>
          <p className="text-slate-700 text-base leading-relaxed">The initial set of data used to teach a machine learning model how to make predictions.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Machine Learning is a transformative technology that enables computers to learn from experience and make intelligent decisions using data. It has become an essential pillar of modern software engineering because it can solve highly complex, non-linear problems that traditional rule-based programming cannot handle.
      </p>
      
      <p className="text-lg leading-relaxed mb-6">
        As businesses and applications strive to build more engaging, efficient, and personalized user experiences, the reliance on high-quality data and robust ML algorithms will only continue to grow. From simple recommendation engines to fully autonomous systems, the principles of data-driven learning remain the same.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Machine Learning fundamentally shifts the programming paradigm from "writing explicit logical rules" to "providing high-quality data and letting the machine mathematically discover the rules." The intelligence of any ML system is ultimately constrained by the quality, variety, and volume of the data you feed it.
        </p>
      </div>
    </>
  );
}


