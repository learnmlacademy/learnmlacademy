import React from 'react';

export function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Disclaimer</h1>
      
      <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed space-y-8">
        <p>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">1. Educational Purposes Only</h2>
          <p>
            The information contained on ML.ACADEMY is for general information and educational purposes only. The contents of this site are not intended to serve as professional or legal advice. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">2. Affiliate Disclosure</h2>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-md mt-4">
            <p className="text-amber-900 m-0">
              Some of the links on this website are affiliate links. This means if you click on the link and purchase an item, ML.ACADEMY may receive an affiliate commission at no extra cost to you.
            </p>
          </div>
          <p className="mt-4">
            We only recommend products or services that we believe will add value to our readers. These commissions help support the maintenance of this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">3. Advertising Disclosure</h2>
          <p>
            This website utilizes Google AdSense and/or other advertising networks to serve ads. These companies may use aggregated information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">4. External Links</h2>
          <p>
            Through this website, you are able to link to other websites which are not under the control of ML.ACADEMY. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>
      </div>
    </div>
  );
}
