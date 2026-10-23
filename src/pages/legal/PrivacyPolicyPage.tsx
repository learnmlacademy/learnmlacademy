import React, { useEffect } from 'react';

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | LearnMLAcademy';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) meta.setAttribute('content', 'Read the LearnMLAcademy Privacy Policy covering data collection, cookies, Google Analytics, and third-party advertising practices.');
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/privacy');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed space-y-8">
        <p>
          Last updated: May 31, 2026
        </p>
        
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">1. Introduction</h2>
          <p>
            Welcome to ML.ACADEMY ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">2. The Data We Collect About You</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">3. Use of Cookies and Third-Party Advertising</h2>
          <p>
            This website uses cookies to personalize content and analyze traffic. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to LearnMLAcademy or other websites on the Internet.
          </p>
          <p className="mt-4">
            Google's use of advertising cookies (such as DoubleClick) enables it and its partners to serve ads to our visitors based on their visit to our site and/or other sites across the Web.
          </p>
          <p className="mt-4">
            Users may opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Ads Settings</a>. Alternatively, users may opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">aboutads.info</a>.
          </p>
          <p className="mt-4">
            To learn more about how Google uses information from sites or apps that use its services, please visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">How Google uses data when you use our partners' sites or apps</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">4. How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">5. Email PDF subscriptions</h2>
          <p>
            If you choose to subscribe for a free interview PDF, we use the email address you provide to
            deliver the PDF and send occasional learning updates. We use Brevo as our email-list provider.
            You can unsubscribe from future emails using the unsubscribe link in those messages.
          </p>
          <p className="mt-4">
            Newsletter signup is optional. Please do not enter private passwords, API keys, or sensitive
            personal details in the email field. Your download request is processed by our website and
            email provider; the response PDF is not cached publicly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, our data practices, or wish to exercise your data rights, please contact us at:
          </p>
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="font-semibold text-slate-800">LearnMLAcademy Editorial & Privacy Desk</p>
            <p className="mt-1 text-slate-600">Email: <a href="mailto:machinelearningacademy83@gmail.com" className="text-indigo-600 font-medium hover:underline">machinelearningacademy83@gmail.com</a></p>
            <p className="mt-1 text-slate-600">Contact Page: <a href="/contact" className="text-indigo-600 font-medium hover:underline">learnmlacademy.com/contact</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
