import React from 'react';
import { BookOpen, Award, ExternalLink, Star } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// AFFILIATE LINKS — CONFIGURED
//
// Amazon Associates tag: learnmlacadem-21
// Coursera/Impact partner ID: 8428221
// ─────────────────────────────────────────────────────────────────────────────

const AMAZON_TAG = "learnmlacadem-21";
// ASIN B0BHCFNY9Q = Hands-On ML 3rd Ed (Kindle) — verified on amazon.in
const amazonUrl = `https://www.amazon.in/dp/B0BHCFNY9Q?tag=${AMAZON_TAG}`;

// Coursera affiliate application (Impact partner ID 8428221) is currently
// "Sent Invite" — pending approval. Using the direct URL until approved.
// Once Impact shows the Coursera program as Active, log into
// app.impact.com → Discover → My Brands → Coursera → Copy Link,
// and paste that exact tracking link in here.
const courseraUrl = "https://www.coursera.org/specializations/deep-learning";

export function AffiliateRecommendation() {
  return (
    <div className="mt-16 border-t border-slate-200 pt-12 pb-8">
      <div className="flex items-center mb-2">
        <h3 className="text-2xl font-bold text-slate-800">Recommended Learning Resources</h3>
      </div>
      <p className="text-slate-500 text-xs mb-1">
        <em>Disclosure: Links below may be affiliate links. Purchasing through them supports this platform at no extra cost to you.</em>
      </p>
      <p className="text-slate-600 mb-8 text-base leading-relaxed mt-3">
        Accelerate your learning with these industry-recommended books and courses, handpicked by our team.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource 1: Book */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all rounded-xl p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-bl-lg shadow-sm">
            Top Book Pick
          </div>
          <div className="flex items-start mt-2">
            <div className="bg-indigo-50 p-3 rounded-lg mr-5 group-hover:bg-indigo-100 transition-colors border border-indigo-100">
              <BookOpen className="h-7 w-7 text-indigo-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-indigo-700 transition-colors">
                Hands-On Machine Learning
              </h4>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                By Aurélien Géron. The best practical guide to building ML systems using Scikit-Learn and TensorFlow. Recommended by ML engineers worldwide.
              </p>
              <div className="flex items-center text-amber-500 text-sm mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="text-slate-500 font-medium ml-2">(4.8/5 — 3,000+ reviews)</span>
              </div>
              <span className="inline-flex items-center text-indigo-700 font-semibold text-sm group-hover:underline decoration-2 underline-offset-4">
                View on Amazon <ExternalLink className="h-4 w-4 ml-1.5" />
              </span>
            </div>
          </div>
        </a>

        {/* Resource 2: Course */}
        <a
          href={courseraUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all rounded-xl p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-bl-lg shadow-sm">
            Bestselling Course
          </div>
          <div className="flex items-start mt-2">
            <div className="bg-emerald-50 p-3 rounded-lg mr-5 group-hover:bg-emerald-100 transition-colors border border-emerald-100">
              <Award className="h-7 w-7 text-emerald-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                Deep Learning Specialization
              </h4>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                By Andrew Ng (DeepLearning.AI). Master neural networks and deep learning from scratch. The gold standard course for breaking into AI.
              </p>
              <div className="flex items-center text-amber-500 text-sm mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="text-slate-500 font-medium ml-2">(4.9/5 — 80,000+ reviews)</span>
              </div>
              <span className="inline-flex items-center text-emerald-700 font-semibold text-sm group-hover:underline decoration-2 underline-offset-4">
                View on Coursera <ExternalLink className="h-4 w-4 ml-1.5" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
