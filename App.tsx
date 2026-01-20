import React, { useState, useEffect } from 'react';
import { AppLanguage, AppRole } from './types';
import { translations } from './translations';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import Financing from './components/Financing';
import AgriAI from './components/AgriAI';
import HarvestPredictor from './components/HarvestPredictor';

type View = 'dashboard' | 'market' | 'finance' | 'ai' | 'harvest';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [lang, setLang] = useState<AppLanguage>('en');
  const [role, setRole] = useState<AppRole>('farmer');
  const [userName] = useState('Tasnimul Mahi');
  const [location] = useState('Chittagong, BD');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("Location detected", pos.coords.latitude, pos.coords.longitude);
      });
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard lang={lang} role={role} setView={setCurrentView} />;
      case 'market': return <Marketplace lang={lang} role={role} />;
      case 'finance': return <Financing lang={lang} />;
      case 'ai': return <AgriAI lang={lang} />;
      case 'harvest': return <HarvestPredictor lang={lang} />;
      default: return <Dashboard lang={lang} role={role} setView={setCurrentView} />;
    }
  };

  const getRoleLabel = (r: AppRole) => {
    if (r === 'farmer') return t.farmerPortal;
    if (r === 'buyer') return t.buyerPortal;
    return t.sellerPortal;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative">
        {/* Top Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-green-200 relative active:scale-95 transition-all"
              >
                FS
                {showRoleMenu && (
                  <div className="absolute top-12 left-0 w-48 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 text-slate-900 overflow-hidden animate-in zoom-in-95">
                    {(['farmer', 'buyer', 'seller'] as AppRole[]).map(r => (
                      <button 
                        key={r}
                        onClick={(e) => { e.stopPropagation(); setRole(r); setShowRoleMenu(false); }}
                        className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest border-b border-slate-50 hover:bg-slate-50 ${role === r ? 'text-green-600 bg-green-50/50' : 'text-slate-600'}`}
                      >
                        {getRoleLabel(r)}
                      </button>
                    ))}
                  </div>
                )}
              </button>
              <div>
                <h1 className="text-sm font-black text-slate-900 leading-tight">Fosol Setu</h1>
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">{getRoleLabel(role)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
                className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 border border-slate-200 active:scale-95 transition-all"
              >
                {lang === 'en' ? 'BN' : 'EN'}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto no-scrollbar">
          {renderView()}
        </main>

        {/* Bottom Navigation */}
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <NavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>}
            label={t.home}
          />
          <NavButton 
            active={currentView === 'market'} 
            onClick={() => setCurrentView('market')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>}
            label={t.market}
          />
          <NavButton 
            active={currentView === 'finance'} 
            onClick={() => setCurrentView('finance')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            label={t.funds}
          />
          <NavButton 
            active={currentView === 'ai'} 
            onClick={() => setCurrentView('ai')}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
            label={t.ai}
          />
        </nav>
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all flex-1 ${active ? 'text-green-600 scale-110' : 'text-slate-400'}`}
  >
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;