import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/about', label: 'About' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/blog', label: 'Blog' },
  { to: '/cheatsheet', label: 'Free cheatsheet' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/disclaimer', label: 'Disclaimer' },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 shrink-0 border-t border-slate-200 bg-white px-4 py-8 text-slate-500 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-sm md:flex-row">
        <Link to="/" className="flex items-center gap-2 text-slate-900" aria-label="LearnMLAcademy home">
          <img src="/favicon.svg" alt="" className="h-6 w-6" />
          <span className="font-extrabold">LearnML<span className="text-indigo-600">Academy</span></span>
          <span className="text-slate-400">© {new Date().getFullYear()}</span>
        </Link>
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-3">
          {footerLinks.map(link => (
            <Link key={link.to} to={link.to} className="font-medium hover:text-indigo-700">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
