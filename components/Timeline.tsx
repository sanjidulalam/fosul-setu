
import React from 'react';
import { MILESTONES } from '../constants';

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Roadmap to 2030</h2>
          <p className="mt-4 text-slate-500">Our strategic journey towards digitizing Bangladesh's agriculture.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-slate-200 h-full hidden md:block"></div>
          
          <div className="space-y-12">
            {MILESTONES.map((milestone, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 px-4 md:px-12 mb-4 md:mb-0">
                  <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-green-600 font-black text-xl mb-1 block">{milestone.year}</span>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{milestone.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{milestone.details}</p>
                  </div>
                </div>
                
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-green-600 border-4 border-white shadow hidden md:block"></div>
                
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Implementation Phases */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="font-bold text-green-800 mb-1">Phase 1: Digital Bridge</div>
                <div className="text-xs text-green-600 uppercase mb-4">Months 1-6</div>
                <p className="text-sm text-green-700">AI Beta, Supply Anchors, Product-Market Fit with first 1,000 users.</p>
            </div>
            <div className="p-6 bg-lime-50 rounded-2xl border border-lime-100">
                <div className="font-bold text-lime-800 mb-1">Phase 2: Growth Flywheel</div>
                <div className="text-xs text-lime-600 uppercase mb-4">Months 7-18</div>
                <p className="text-sm text-lime-700">Geographic expansion, Computer Vision advisory, B2B Pilots.</p>
            </div>
            <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
                <div className="font-bold text-slate-800 mb-1">Phase 3: Operating System</div>
                <div className="text-xs text-slate-500 uppercase mb-4">Months 19-36</div>
                <p className="text-sm text-slate-700">Embedded Fintech, National Coverage, 100K Subscribers.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
