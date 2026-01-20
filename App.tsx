
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import BusinessModel from './components/BusinessModel';
import Financials from './components/Financials';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import Financing from './components/Financing';
import AgriAI from './components/AgriAI';
import HarvestPredictor from './components/HarvestPredictor';
import { AppLanguage, AppRole } from './types';

// The main App component manages application state including navigation, language, and user roles.
const App: React.FC = () => {
  const [showApp, setShowApp] = useState(false);
  const [lang, setLang] = useState<AppLanguage>('en');
  const [role, setRole] = useState<AppRole>('farmer');
  const [view, setView] = useState<'dashboard' | 'marketplace' | 'finance' | 'ai' | 'predictor'>('dashboard');

  if (!showApp) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
        <Header />
        <Hero />
        <section className="py-12 bg-white border-y border-slate-100">
           <div className="max-w-7xl mx-auto px-4 text-center">
              <button 
                onClick={() => setShowApp(true)}
                className="bg-green-600 text-white px-10 py-5 rounded-2xl text-xl font-black shadow-2xl shadow-green-200 hover:bg-green-700 hover:scale-105 active:scale-95 transition-all"
              >
                Launch Platform Portal
              </button>
           </div>
        </section>
        <ProblemSolution />
        <BusinessModel />
        <Financials />
        <Timeline />
        <Team />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      {/* Mobile-styled Header for the Platform Portal */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-black">F</div>
           <span className="font-black tracking-tight text-lg">FosolSetu</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 text-[10px] font-black uppercase tracking-widest border border-slate-200"
          >
            {lang === 'en' ? 'বাংলা' : 'English'}
          </button>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value as AppRole)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 text-[10px] font-black uppercase tracking-widest border border-slate-200 focus:outline-none"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Input Seller</option>
          </select>
          <button 
            onClick={() => setShowApp(false)}
            className="p-1.5 rounded-xl bg-red-50 text-red-600 border border-red-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6">
        {view === 'dashboard' && <Dashboard lang={lang} role={role} setView={setView} />}
        {view === 'marketplace' && <Marketplace lang={lang} role={role} />}
        {view === 'finance' && <Financing lang={lang} />}
        {view === 'ai' && <AgriAI lang={lang} />}
        {view === 'predictor' && <HarvestPredictor lang={lang} />}
      </main>

      {/* Bottom Navigation for Mobile-first Platform experience */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <NavIcon active={view === 'dashboard'} onClick={() => setView('dashboard')} icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        <NavIcon active={view === 'marketplace'} onClick={() => setView('marketplace')} icon="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        <NavIcon active={view === 'ai'} onClick={() => setView('ai')} icon="M13 10V3L4 14h7v7l9-11h-7z" />
        <NavIcon active={view === 'finance'} onClick={() => setView('finance')} icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <NavIcon active={view === 'predictor'} onClick={() => setView('predictor')} icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </nav>
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean; onClick: () => void; icon: string }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all ${active ? 'bg-green-600 text-white shadow-lg shadow-green-100 scale-110' : 'text-slate-400 hover:bg-slate-50'}`}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={icon} /></svg>
  </button>
);

export default App;
