import React, { useEffect, useState } from 'react';
import { Mail, MessageSquare, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { isValidEmail } from '../utils/emailValidation';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    document.title = 'Contact Us | Learn ML Academy';
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) {
      meta.setAttribute(
        'content',
        'Get in touch with the Learn ML Academy team for feedback, lesson suggestions, corrections, or partnerships.'
      );
    }
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/contact');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) return;
    setEmailError('');
    
    // Construct mailto link as direct communication fallback
    const subjectLine = encodeURIComponent(`[LearnMLAcademy] ${formData.subject}: from ${formData.name || 'Learner'}`);
    const bodyContent = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${trimmedEmail}\nSubject Category: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:machinelearningacademy83@gmail.com?subject=${subjectLine}&body=${bodyContent}`;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Contact <span className="text-indigo-600">Us</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Have a question about a tutorial, found a typo, or want to collaborate? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Contact Info Cards */}
        <div className="space-y-4 md:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-indigo-600">
              <Mail className="h-5 w-5" />
              <h3 className="font-semibold text-slate-900">Direct Email</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Primary editorial & support:
            </p>
            <a
              href="mailto:machinelearningacademy83@gmail.com"
              className="mt-1 block text-sm font-semibold text-indigo-600 hover:text-indigo-700 break-all"
            >
              machinelearningacademy83@gmail.com
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-indigo-600">
              <Clock className="h-5 w-5" />
              <h3 className="font-semibold text-slate-900">Response Time</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              We typically review and reply to all genuine educational inquiries within <strong>24–48 hours</strong>.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-indigo-600">
              <MapPin className="h-5 w-5" />
              <h3 className="font-semibold text-slate-900">Platform</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Learn ML Academy is an independent educational publication dedicated to open-access machine learning, deep learning, and AI tutorials.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm md:col-span-2">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <h2 className="mt-4 text-2xl font-bold text-slate-900">Message Prepared!</h2>
              <p className="mt-2 text-slate-600">
                Your email client has been opened with your inquiry. If it did not launch automatically, feel free to write to us directly at:
              </p>
              <div className="mt-4 font-mono font-medium text-indigo-600">
                machinelearningacademy83@gmail.com
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900">Send an Inquiry</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Chen"
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={e => {
                    setFormData({ ...formData, email: e.target.value });
                    if (emailError) setEmailError('');
                  }}
                  placeholder="alex@example.com"
                  className={`mt-1 block w-full rounded-md border px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:outline-none sm:text-sm ${
                    emailError
                      ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs text-red-600" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                  Topic / Category
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3.5 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Lesson Feedback">Tutorial Feedback / Typo Correction</option>
                  <option value="Question">Technical Question on ML Concept</option>
                  <option value="Partnership">Partnership / Advertising / Sponsorship</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
              >
                <Send className="h-4 w-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
