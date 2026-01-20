
import React from 'react';

const BusinessModel: React.FC = () => {
  return (
    <section id="model" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Dual-Engine Business Model</h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Sustainable growth powered by farmer subscriptions and high-margin data monetization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Subscriptions */}
          <div className="border border-slate-200 rounded-3xl p-8 hover:border-green-300 transition-colors bg-slate-50/50">
            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-green-100 p-2 rounded-lg text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"/></svg>
              </span>
              Farmer Subscriptions
            </h4>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">Basic Tier</div>
                  <div className="text-sm text-slate-500">Directory Access</div>
                </div>
                <div className="text-green-600 font-bold">50-100 BDT/mo</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                <div>
                  <div className="font-bold text-slate-900">Pro Tier</div>
                  <div className="text-sm text-slate-500">Marketplace + AI Advisory</div>
                </div>
                <div className="text-green-600 font-bold">200-300 BDT/mo</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-100">
                <div>
                  <div className="font-bold text-slate-900">Premium Tier</div>
                  <div className="text-sm text-slate-500">Financing + Priority Buyer Access</div>
                </div>
                <div className="text-green-600 font-bold">400-500 BDT/mo</div>
              </div>
            </div>
          </div>

          {/* Data Monetization */}
          <div className="border border-slate-200 rounded-3xl p-8 hover:border-lime-300 transition-colors bg-slate-50/50">
            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-lime-100 p-2 rounded-lg text-lime-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </span>
              Data & Financials
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 p-4 bg-white rounded-xl border border-slate-100">
                <div className="text-green-600 font-bold">5-8%</div>
                <div>
                  <div className="font-bold text-slate-900">Pre-harvest Loan Fees</div>
                  <p className="text-sm text-slate-500">Significantly lower than traditional middlemen.</p>
                </div>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-xl border border-slate-100">
                <div className="text-green-600 font-bold">B2B</div>
                <div>
                  <div className="font-bold text-slate-900">Market Intelligence</div>
                  <p className="text-sm text-slate-500">Aggregated insights for input companies & banks.</p>
                </div>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-xl border border-slate-100">
                <div className="text-green-600 font-bold">LTV</div>
                <div>
                  <div className="font-bold text-slate-900">6,500+ BDT Lifetime Value</div>
                  <p className="text-sm text-slate-500">CAC maintained at low 180 BDT via community.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;
