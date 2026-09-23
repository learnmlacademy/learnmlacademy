import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Loader, Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const startDownload = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ML_Interview_Cheatsheet.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!response.ok) {
        let message = 'Something went wrong. Please try again.';
        try {
          const body = await response.json();
          if (typeof body?.error === 'string') message = body.error;
        } catch {
          // Keep the safe generic message if the server did not return JSON.
        }
        throw new Error(message);
      }

      const pdfBlob = await response.blob();
      if (pdfBlob.type !== 'application/pdf' || pdfBlob.size === 0) {
        throw new Error('The download could not be prepared. Please try again.');
      }

      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      const objectUrl = URL.createObjectURL(pdfBlob);
      setDownloadUrl(objectUrl);
      setStatus('success');
      startDownload(objectUrl);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="my-10 border-y border-slate-300 py-7 text-center">
        <CheckCircle className="mx-auto mb-3 h-8 w-8 text-emerald-600" aria-hidden="true" />
        <h3 className="text-xl font-bold text-slate-900">Your PDF is ready</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          Your email was saved and the download has started.
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="ML_Interview_Cheatsheet.pdf"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF again
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="my-10 border-y border-slate-300 py-6 md:py-7">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-700">Free interview resource</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">ML Interview Cheatsheet</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Core algorithms, evaluation, Python, deep learning, system design and interview strategy in one practical PDF.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                  if (status === 'error') setStatus('idle');
                }}
                onKeyDown={(e) => e.key === 'Enter' && status !== 'loading' && handleSubmit()}
                placeholder="your@email.com"
                disabled={status === 'loading'}
                aria-label="Email address"
                className="w-full border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:w-60 disabled:opacity-60"
              />
              {errorMsg && <span className="mt-1 block px-1 text-xs text-red-600" role="alert">{errorMsg}</span>}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Preparing...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Get PDF
                </>
              )}
            </button>
          </div>
          <p className="px-1 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
