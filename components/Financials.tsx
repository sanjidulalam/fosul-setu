
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { REVENUE_DATA } from '../constants';

const Financials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-6">Financial Growth <br/><span className="text-green-400">Projected Scale</span></h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Our revenue scales exponentially as we cross the threshold of 100,000 paid subscribers by Month 36. 
              The 'Dual-Engine' approach ensures 75% gross margins and an early break-even point by Month 18.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <div className="text-green-400 font-bold">~75%</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Gross Margin</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                <div className="text-green-400 font-bold">BDT 1.5M</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Monthly Target (MRR)</div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 h-[400px] bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                />
                <Legend />
                <Bar name="Subscribers (Scale)" dataKey="subscribers" fill="#4ade80" radius={[4, 4, 0, 0]} />
                <Bar name="Revenue (x10 BDT)" dataKey="revenue" fill="#a3e635" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Financials;
