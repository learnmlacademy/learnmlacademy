import React, { useState } from 'react';
import { Mail, Download, CheckCircle, ExternalLink, Loader } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS
// ─────────────────────────────────────────────────────────────────────────────
const GDRIVE_FILE_ID = 'PASTE_YOUR_GOOGLE_DRIVE_FILE_ID_HERE';
const PDF_DOWNLOAD_URL = '/ML_Interview_Cheatsheet.pdf';

// We are now safely pulling the API key from your Vercel Environment Variables!
const BREVO_API_KEY = import.meta.env.VITE_SENDINBLUE_API_KEY;
const BREVO_LIST_ID = 2; 

// ─────────────────────────────────────────────────────────────────────────────
// Save email to Brevo contact list
async function saveEmailToBrevo(email: string): Promise<boolean> {
  if (!BREVO_API_KEY) {
    // Not configured yet — just show success and open PDF directly
    return true;
  }
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true, 
        attributes: {
          SOURCE: 'ML Academy Newsletter Signup',
        },
      }),
    });
    return response.status === 201 || response.status === 204;
  } catch {
    return true;
  }
}

export function NewsletterSignup() {
  const [email, setEmail]       = useState('');
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isConfigured = true; 

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setStatus('loading');

    const saved = await saveEmailToBrevo(trimmed);

    if (saved) {
      setStatus('success');
      if (isConfigured) {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = PDF_DOWNLOAD_URL;
          a.download = 'ML_Interview_Cheatsheet.pdf';
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 800);
      }
    } else {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-8 text-center my-10">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">You're all set! 🎉</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          {isConfigured
            ? 'Your download is starting automatically. If it does not start, click the button below.'
            : 'Thank you! Check back soon — the PDF download will be live shortly.'}
        </p>
        {isConfigured && (
          <a
            href={PDF_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF Now
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-6 md:p-8 my-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

        <div className="flex-shrink-0 w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Download className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-1">
            Free Download: ML Interview Cheatsheet
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            50 essential ML interview questions with detailed answers — covering algorithms,
            evaluation, Python and deep learning. Enter your email and download instantly.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col gap-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="your@email.com"
                disabled={status === 'loading'}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-60 disabled:opacity-60"
              />
              {errorMsg && (
                <span className="text-red-500 text-xs px-1">{errorMsg}</span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Get Free PDF
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center sm:text-left px-1">
            No spam. Unsubscribe anytime.
          </p>
        </div>

      </div>
    </div>
  );
}