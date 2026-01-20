
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-400 rounded-full blur-3xl -ml-48 -mb-48"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-5 text-green-700 bg-green-100 mb-6">
          Ideation Phase • Chittagong, Bangladesh
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          "Every Harvest Deserves <br/>
          <span className="text-green-600 underline decoration-lime-500/30">Its Full Value</span>"
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Empowering 100,000+ Bangladeshi farmers with zero-commission market access, fair financing, 
          and AI-driven insights to transform agriculture from exploitation to prosperity.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-slate-200">
            Vision 2030: BDT 1,000Cr+ Farmer Income
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-sm font-semibold">University of Chittagong Incubated</span>
            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
            <span className="text-sm font-semibold">AgTech Industry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
