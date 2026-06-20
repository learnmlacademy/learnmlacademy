import React, { useEffect } from 'react';
import { Mail, Award, Target, BookOpen, Users, Shield, Code, Cloud, Database, Linkedin, ExternalLink } from 'lucide-react';

export function AboutPage() {
  useEffect(() => {
    document.title = 'About ML Academy | Free Machine Learning Tutorials & Resources';
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    const desc = 'Learn about ML Academy — a free platform teaching Machine Learning, Deep Learning, and Python to students and engineers worldwide with 63+ hands-on tutorials.';
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', 'About ML Academy');
    setMeta('meta[property="og:description"]', 'content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/about');
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">About Us</h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          A platform created to simplify Machine Learning, Data Science, Artificial Intelligence, and Python programming for students, beginners, and technology enthusiasts.
        </p>
      </div>

      {/* Founder section */}
      <section className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">Meet the Founder</h2>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">
            <span className="text-white text-2xl font-extrabold">PS</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Prateek Sharan</h3>
            <p className="text-indigo-600 font-semibold mb-1">Technology Professional &amp; Educator</p>
            <p className="text-slate-500 text-sm mb-4">Bengaluru, India</p>
            <p className="text-slate-700 leading-relaxed mb-4">
              This website is founded and managed by Prateek Sharan, a technology professional based in Bengaluru, India, with experience in Machine Learning concepts, Data Engineering, and cloud-based data pipeline development. He has worked on enterprise-level AWS data solutions involving services such as AWS Glue, Lambda, SNS, SQS, Redshift, Apache Airflow, Databricks, and Spark SQL, particularly in banking and data-driven environments.
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2">
              {[
                "Machine Learning", "Data Engineering", "AWS Glue", "Apache Airflow",
                "Databricks", "Spark SQL", "Redshift", "Python", "AWS Lambda"
              ].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-white border border-indigo-200 text-indigo-700 rounded-full text-xs font-semibold shadow-sm">
                  {skill}
                </span>
              ))}
            </div>

            {/* LinkedIn */}
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/prateek-sharan-a987727/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005e93] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
              <a
                href="mailto:machinelearningacademy83@gmail.com"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Send an email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          The main goal of this platform is to make technical learning <strong>simple, practical, and beginner-friendly</strong>. Many students struggle to understand Machine Learning because most resources are either too theoretical or too advanced. This platform focuses on explaining concepts step by step using easy language, practical examples, case studies, algorithms, and coding implementations that learners can actually understand and apply.
        </p>
      </section>

      {/* What we cover */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">What We Cover</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <BookOpen className="w-5 h-5" />, title: "Machine Learning Algorithms", color: "indigo" },
            { icon: <Code className="w-5 h-5" />, title: "Python Programming", color: "blue" },
            { icon: <Target className="w-5 h-5" />, title: "Artificial Intelligence", color: "violet" },
            { icon: <Database className="w-5 h-5" />, title: "Data Science & Analytics", color: "emerald" },
            { icon: <Award className="w-5 h-5" />, title: "Deep Learning", color: "rose" },
            { icon: <Cloud className="w-5 h-5" />, title: "Cloud & AWS Data Pipelines", color: "amber" },
            { icon: <Shield className="w-5 h-5" />, title: "Data Engineering Concepts", color: "cyan" },
            { icon: <Users className="w-5 h-5" />, title: "Data Visualization", color: "purple" },
            { icon: <Target className="w-5 h-5" />, title: "Real-world Projects & Case Studies", color: "green" },
          ].map((item) => (
            <div key={item.title} className={`flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
              <span className={`text-${item.color}-600 flex-shrink-0 mt-0.5`}>{item.icon}</span>
              <p className="font-semibold text-slate-800 text-sm leading-snug">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Who This Platform Is For</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          We strongly believe that learning should be accessible to everyone, regardless of their background or experience level.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "College Students", desc: "Building foundational knowledge in ML and AI for academics and placement preparation." },
            { title: "Beginner Programmers", desc: "Just starting out with Python and wanting to enter the world of data science." },
            { title: "Aspiring Data Scientists", desc: "Looking to transition into a data science or ML engineering career." },
            { title: "Working Professionals", desc: "Upskilling in cloud data pipelines, ML and modern data engineering tools." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
              <span className="text-indigo-500 font-black text-lg mt-0.5">✓</span>
              <div>
                <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Quality</h2>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          {[
            ["Original content", "Every tutorial is written from scratch — not copied or auto-generated. Each page reflects real practical experience."],
            ["Beginner friendly", "Every concept is explained in plain English first, then backed up with mathematics and code."],
            ["Regularly updated", "Content is kept current with the latest library versions, tools and industry best practices."],
            ["Free forever", "Core tutorials will always be free and accessible to everyone, everywhere."],
            ["Transparent", "Affiliate relationships are fully disclosed. Editorial independence is maintained."],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-3">
              <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <div>
                <span className="font-bold text-slate-800">{title} — </span>
                <span className="text-slate-600 text-sm">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing + Contact */}
      <section className="bg-indigo-600 rounded-2xl p-8 text-center">
        <Users className="w-12 h-12 text-white/60 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-3">Get in Touch</h2>
        <p className="text-indigo-200 leading-relaxed mb-6 max-w-xl mx-auto">
          Thank you for visiting and being part of this learning journey. Have feedback, found an error, or want to suggest a topic? We read every email and respond within 48 hours.
        </p>
        <a
          href="mailto:machinelearningacademy83@gmail.com"
          className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
        >
          <Mail className="w-5 h-5" />
          machinelearningacademy83@gmail.com
        </a>
      </section>

    </div>
  );
}
