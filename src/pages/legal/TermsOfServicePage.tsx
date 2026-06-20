import React, { useEffect } from 'react';

export function TermsOfServicePage() {
  useEffect(() => {
    document.title = 'Terms of Service | ML Academy';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) meta.setAttribute('content', 'Read the ML Academy Terms of Service governing use of our free Machine Learning tutorials, content, and website.');
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/terms');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed space-y-8">
        <p>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">1. Agreement to Terms</h2>
          <p>
            By viewing or accessing ML.ACADEMY, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on ML.ACADEMY for personal, non-commercial transitory viewing only.
          </p>
          <p className="mt-4">
            This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on ML.ACADEMY;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">3. Disclaimer</h2>
          <p>
            The materials on ML.ACADEMY are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">4. Limitations</h2>
          <p>
            In no event shall ML.ACADEMY or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
          </p>
        </section>
      </div>
    </div>
  );
}
