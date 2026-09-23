import { useEffect, useState } from 'react';

const GA_ID = 'G-C0Z8QLBKE8';
const CONSENT_KEY = 'cookieConsent';
let analyticsStarted = false;

function startGoogleAnalytics() {
  if (analyticsStarted || typeof window === 'undefined') return;
  analyticsStarted = true;

  const win = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  win.dataLayer = win.dataLayer || [];
  win.gtag = (...args: unknown[]) => {
    win.dataLayer?.push(args);
  };

  win.gtag('js', new Date());
  win.gtag('config', GA_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      startGoogleAnalytics();
    } else if (consent !== 'declined') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    startGoogleAnalytics();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 text-white p-4 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-300">
          We use optional analytics cookies to understand site usage. Google Analytics loads only if you choose Accept.
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-white"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
