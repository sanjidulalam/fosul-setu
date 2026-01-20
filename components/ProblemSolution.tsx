
import React from 'react';

const ProblemSolution: React.FC = () => {
  const problems = [
    "Middlemen drain profits (30-60% cuts)",
    "Predatory high-interest debt traps",
    "No direct market access for smallholders",
    "Weather ignorance leading to crop loss",
    "Systemic exclusion of women farmers"
  ];

  const solutions = [
    "Zero-commission direct marketplace",
    "Fair pre-harvest financing (5-8%)",
    "AI-driven price signals & market intelligence",
    "Hyperlocal weather alerts & govt. updates",
    "Dedicated empowerment for women (25K goal)"
  ];

  return (
    <section id="problem" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Problem Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg className="w-24 h-24 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              The Reality
            </h3>
            <p className="text-slate-500 mb-8 italic text-lg">"Farmers lose 60% of their value before the product reaches the consumer."</p>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                  <span className="text-slate-700 font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-green-600 p-8 rounded-3xl shadow-xl border border-green-700 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            </div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-lime-300">
              The FosolSetu Solution
            </h3>
            <p className="text-green-100 mb-8 text-lg">"An AI-powered bridge connecting farmers directly to intelligence, finance, and markets."</p>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-lime-300 shrink-0"></div>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
