
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">FosolSetu</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-green-600 transition-colors">Problem</a>
            <a href="#solution" className="hover:text-green-600 transition-colors">Solution</a>
            <a href="#model" className="hover:text-green-600 transition-colors">Model</a>
            <a href="#timeline" className="hover:text-green-600 transition-colors">Roadmap</a>
            <a href="#team" className="hover:text-green-600 transition-colors">Team</a>
          </nav>
          <button className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-all shadow-sm">
            Invest Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
