
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">FosolSetu</span>
            </div>
            <p className="max-w-md leading-relaxed">
              Establishing the "Prime Membership" for serious farmers in Bangladesh. 
              Eliminating middlemen through technology, one harvest at a time.
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <h4 className="text-white font-bold mb-4">Let's Collaborate</h4>
            <div className="bg-slate-800 p-1 pl-4 rounded-full flex items-center border border-slate-700">
              <input type="email" placeholder="Enter your email" className="bg-transparent border-none focus:ring-0 text-sm text-white w-48" />
              <button className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-500 transition-colors">
                Join Pilot
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between gap-4">
          <p>© 2024 FosolSetu - University of Chittagong. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">SDG 1: No Poverty</a>
            <a href="#" className="hover:text-white">SDG 5: Gender Equality</a>
            <a href="#" className="hover:text-white">SDG 8: Decent Work</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
