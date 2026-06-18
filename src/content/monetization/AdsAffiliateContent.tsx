import React from 'react';
import { Target, DollarSign, Activity, BarChart, TrendingUp, HandCoins, MousePointerClick, ShieldCheck, CheckCircle, Code, Lightbulb } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const trafficEarningsData = [
  { visitors: 1000, ads: 5, affiliate: 20 },
  { visitors: 5000, ads: 25, affiliate: 100 },
  { visitors: 10000, ads: 50, affiliate: 250 },
  { visitors: 50000, ads: 250, affiliate: 1500 },
  { visitors: 100000, ads: 700, affiliate: 4500 },
  { visitors: 500000, ads: 4000, affiliate: 25000 },
];

export function AdsAffiliateContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Advertisements and Affiliate Marketing</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Building a high-quality educational website—like a Machine Learning and Data Science portal—attracts highly targeted, valuable traffic. Once you have established a consistent audience, you can transform your intellectual property into a sustainable revenue stream.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          The two most prominent, passive methodologies for monetizing an educational blog without selling your own direct products are <strong>Display Advertisements</strong> and <strong>Affiliate Marketing</strong>.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-indigo-900 text-lg leading-relaxed mb-2 font-bold">The Core Difference</p>
          <p className="text-indigo-800 text-lg italic leading-relaxed">
            Display Ads pay you based on the sheer volume of <strong>eyeballs</strong> (Impressions) and <strong>clicks</strong> your site receives. Affiliate Marketing pays you a lucrative commission only when someone <strong>successfully purchases</strong> a product or service you recommended.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="display-ads">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 flex items-center">
          <HandCoins className="mr-3 text-emerald-600" /> Display Advertisements
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Display advertising involves placing network-managed banners, sidebars, or in-text ad units on your website (e.g., Google AdSense, Mediavine, Raptive). The network automatically auctions your ad space to advertisers who want to reach your audience.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">The Mathematics of Ad Revenue</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Ad networks generally pay out using two major models: <strong>CPM</strong> (Cost Per Mille) and <strong>CPC</strong> (Cost Per Click). 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* CPM */}
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-emerald-800 border-b pb-2 mb-3">Cost Per Mille (CPM)</h4>
            <p className="text-sm text-slate-800 leading-relaxed mb-3">You are paid a flat rate for every 1,000 ad impressions, regardless of whether anyone clicks.</p>
            <div className="bg-emerald-50 rounded p-3 font-mono text-sm border border-emerald-100">
              <span className="text-emerald-900 font-bold block mb-1">Calculation:</span>
              Earnings = (Total Views / 1000) × CPM Rate
            </div>
          </div>
          {/* CPC */}
          <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-sky-800 border-b pb-2 mb-3">Cost Per Click (CPC)</h4>
            <p className="text-sm text-slate-800 leading-relaxed mb-3">You are paid a specific bounty every time a user actively clicks on a displayed advertisement.</p>
            <div className="bg-sky-50 rounded p-3 font-mono text-sm border border-sky-100">
              <span className="text-sky-900 font-bold block mb-1">Calculation:</span>
              Earnings = Total Ad Clicks × CPC Rate
            </div>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 w-fit">
          <p className="font-bold text-slate-900 mb-2 mt-2">Workout Example (Traffic vs. Earnings):</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-800 mb-2">
            <li><strong>Monthly Visitors:</strong> 50,000</li>
            <li><strong>Pageviews per visitor:</strong> 2.0 (Total: 100,000 views)</li>
            <li><strong>Ads per page:</strong> 3 (Total Impressions: 300,000)</li>
            <li><strong>Average CPM:</strong> $5.00 per 1,000 impressions</li>
          </ul>
          <p className="font-mono text-lg font-bold text-emerald-700 mb-1 border-t pt-2 mt-4">Estimated Earnings = (300,000 / 1000) × $5.00 = $1,500 / month</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">How to Implement (Google AdSense Example)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Integrating Display Ads usually requires injecting a tiny JavaScript snippet into the <code>&lt;head&gt;</code> of your website. The network handles the rest dynamically.
        </p>

        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-xl text-sm font-mono overflow-x-auto shadow-sm border border-slate-800 mb-8 w-full md:w-3/4">
          <pre className="!m-0">
<code className="language-html">{`<!-- Inside your index.html <head> tag -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-XXXXXXXXXXXXXXXX",
    enable_page_level_ads: true
  });
</script>`}</code>
          </pre>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="affiliate-marketing">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <MousePointerClick className="mr-3 text-indigo-600" /> Affiliate Marketing
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Affiliate Marketing is a performance-based system where you earn a commission by promoting third-party products using a unique tracking URL. Out of all monetization streams, Affiliate Marketing generally provides the highest potential ROI for highly technical niche traffic (like Machine Learning).
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <Target className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-2xl font-bold text-indigo-900 mt-1">Cost Per Action (CPA)</h3>
          </div>
          <p className="text-indigo-800 mb-3 text-lg">
            Unlike display ads, you do not get paid for impressions. You only get paid when the user completes a verified action (Buying a course, subscribing to software, purchasing a highly-rated textbook).
          </p>
          <ul className="list-disc pl-5 font-sans font-medium text-sm space-y-2 text-indigo-900 mb-4">
            <li><strong>Software & Cloud:</strong> E.g., AWS Certifications, DigitalOcean Hosting (Pays $50-100+ CPA)</li>
            <li><strong>Education:</strong> Coursera / Udemy ML Courses (Pays 15-45% of course fee)</li>
            <li><strong>Hardware:</strong> Amazon Associates for Nvidia GPUs, ML Books (Pays 3-5% bounty)</li>
          </ul>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 w-fit">
          <p className="font-bold text-slate-900 mb-2 mt-2">Workout Example (Affiliate Earnings):</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-800 mb-2">
            <li><strong>Article:</strong> "Top 5 Machine Learning Courses in 2026"</li>
            <li><strong>Monthly Visitors to Article:</strong> 10,000</li>
            <li><strong>Click-Through-Rate (CTR) to Affiliate Link:</strong> 5% (500 clicks)</li>
            <li><strong>Conversion Rate (Who actually buys):</strong> 2% (10 buyers)</li>
            <li><strong>Commission per Sale:</strong> $40.00</li>
          </ul>
          <p className="font-mono text-lg font-bold text-indigo-700 mb-1 border-t pt-2 mt-4">Estimated Earnings = 10 Sales × $40.00 = $400 / month (From just one article!)</p>
        </div>

      </div>
      
      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparison-projection">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
          <TrendingUp className="mr-3 text-slate-800" /> Revenue Growth Projection
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          As a website scales, Affiliate Marketing revenue typically grows exponentially because higher-authority sites rank for high "purchase intent" keywords (e.g. "Best GPU for Deep Learning"). Ads provide a steady, linear baseline revenue from all visitors regardless of intent.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-10 items-center">
           <h4 className="font-bold text-slate-700 mb-6 text-center">Ads (Linear) vs. Affiliate (Exponential) Revenue Potential</h4>
           <div className="h-[350px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficEarningsData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="visitors" type="number" scale="log" domain={['auto', 'auto']} label={{ value: 'Monthly Visitors (Log Scale)', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Monthly Revenue ($)', angle: -90, position: 'insideLeft', offset: 20 }} />
                  <Tooltip formatter={(value) => `$${value}`} labelFormatter={(label) => `Visitors: ${label}`} />
                  <Area type="monotone" name="Affiliate Revenue" dataKey="affiliate" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.8} />
                  <Area type="monotone" name="Display Ads Revenue" dataKey="ads" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Monetizing a highly specialized technical blog is not only possible, it is incredibly lucrative. Because your audience consists of engineers, students, and professionals searching for high-value skills and tools, advertisers are willing to pay premium CPM rates. 
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Do not plaster a brand new website with ads. Build the audience first. Quality content generates trust, trust generates traffic, and traffic generates revenue. Combine baseline Display Ads to passively monetize general readers, while using strictly targeted Affiliate Links (e.g., highly recommended ML courses or cloud providers) to monetize high-intent readers.
        </p>
      </div>

    </>
  );
}
