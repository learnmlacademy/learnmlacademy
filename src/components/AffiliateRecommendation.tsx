import { Award, BookOpen, ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { curriculum } from '../data/curriculum';

const AMAZON_TAG = 'learnmlacadem-21';
const amazonUrl = `https://www.amazon.in/dp/B0BHCFNY9Q?tag=${AMAZON_TAG}`;
const courseraUrl = 'https://www.coursera.org/specializations/deep-learning';

const ML_RESOURCE_CATEGORIES = new Set([
  'foundations',
  'python-ml-libs',
  'data-preprocessing',
  'supervised-learning',
  'ensemble-learning',
  'unsupervised-learning',
  'model-evaluation',
  'time-series',
  'advanced-paradigms',
  'deep-learning',
  'advanced-deep-learning',
]);

export function AffiliateRecommendation() {
  const location = useLocation();
  const topicId = location.pathname.startsWith('/learn/')
    ? location.pathname.slice('/learn/'.length).split('/')[0]
    : '';

  const category = curriculum.find((item) =>
    item.subtopics.some((topic) => topic.id === topicId)
  );

  if (!category || !ML_RESOURCE_CATEGORIES.has(category.id)) return null;

  const showDeepLearningCourse =
    category.id === 'deep-learning' || category.id === 'advanced-deep-learning';

  return (
    <div className="mt-16 border-t border-slate-200 pt-12 pb-8">
      <h3 className="text-2xl font-bold text-slate-800">Optional Learning Resources</h3>
      <p className="text-slate-600 mt-3 mb-2 leading-relaxed">
        These resources may complement the lesson. They are optional and are not required to use ML Academy.
      </p>
      <p className="text-slate-500 text-xs mb-8">
        As an Amazon Associate I earn from qualifying purchases. Other links are identified separately when they are not affiliate links.
      </p>

      <div className={`grid grid-cols-1 gap-6 ${showDeepLearningCourse ? 'lg:grid-cols-2' : ''}`}>
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all rounded-xl p-5"
        >
          <div className="flex items-start">
            <div className="bg-indigo-50 p-3 rounded-lg mr-5 border border-indigo-100">
              <BookOpen className="h-7 w-7 text-indigo-700" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-indigo-700 transition-colors">
                Hands-On Machine Learning
              </h4>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                Aurélien Géron's practical book covering machine-learning workflows with Scikit-Learn and deep-learning examples.
              </p>
              <span className="inline-flex items-center text-indigo-700 font-semibold text-sm group-hover:underline">
                View on Amazon <ExternalLink className="h-4 w-4 ml-1.5" />
              </span>
            </div>
          </div>
        </a>

        {showDeepLearningCourse && (
          <a
            href={courseraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all rounded-xl p-5"
          >
            <div className="flex items-start">
              <div className="bg-emerald-50 p-3 rounded-lg mr-5 border border-emerald-100">
                <Award className="h-7 w-7 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                  Deep Learning Specialization
                </h4>
                <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                  DeepLearning.AI's multi-course specialization on neural networks and deep-learning foundations.
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Direct Coursera link — not currently an affiliate link.
                </p>
                <span className="inline-flex items-center text-emerald-700 font-semibold text-sm group-hover:underline">
                  View on Coursera <ExternalLink className="h-4 w-4 ml-1.5" />
                </span>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
