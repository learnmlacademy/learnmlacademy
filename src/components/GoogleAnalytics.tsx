import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-C0Z8QLBKE8';
const CONSENT_STORAGE_KEY = 'learnml_analytics_consent_v1';

type AnalyticsConsent = 'granted' | 'denied' | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readStoredConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
}

function loadGoogleAnalytics() {
  ensureGtagQueue();

  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  if (!document.querySelector(`script[data-lma-ga="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.lmaGa = GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  window.gtag?.('js', new Date());
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
}

export function GoogleAnalytics() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent>(readStoredConsent);
  const initialized = useRef(false);

  useEffect(() => {
    if (consent !== 'granted' || initialized.current) return;

    loadGoogleAnalytics();
    initialized.current = true;
  }, [consent]);

  useEffect(() => {
    if (consent !== 'granted') return;

    const timer = window.setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        page_path: `${location.pathname}${location.search}`,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [consent, location.pathname, location.search]);

  const chooseConsent = (next: Exclude<AnalyticsConsent, null>) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    } catch {
      // Keep the in-memory choice for this visit even when storage is unavailable.
    }

    setConsent(next);
  };

  if (consent !== null) return null;

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5"
      role="dialog"
      aria-label="Analytics preference"
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-semibold text-slate-900">Help us improve Learn ML Academy</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            We use Google Analytics only after you allow analytics so we can understand which lessons are useful.
            Advertising storage remains disabled. Read our{' '}
            <Link to="/privacy" className="font-medium text-indigo-700 underline underline-offset-2">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => chooseConsent('denied')}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => chooseConsent('granted')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Allow analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
