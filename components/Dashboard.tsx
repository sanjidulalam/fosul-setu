import React from 'react';
import { translations } from '../translations';
import { AppLanguage, AppRole } from '../types';

const Dashboard: React.FC<{ lang: AppLanguage, role: AppRole, setView?: (v: any) => void }> = ({ lang, role, setView }) => {
  const t = translations[lang];

  const alerts = [
    { 
      title: lang === 'bn' ? 'সার ভর্তুকি ২০২৪ আবেদন শুরু' : 'Fertilizer Subsidy 2024 Application', 
      date: 'Oct 12', 
      type: 'Fund' 
    },
    { 
      title: lang === 'bn' ? 'চট্টগ্রাম অঞ্চলে পোকা আক্রমণ সতর্কতা' : 'Pest Alert: Fall Armyworm in Chittagong', 
      date: 'Oct 10', 
      type: 'Alert' 
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Weather Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">{t.today} • {t.location}: Chittagong</p>
            <h3 className="text-4xl font-black mt-1">29°C</h3>
            <p className="text-sm opacity-90">{lang === 'bn' ? 'আংশিক মেঘলা' : 'Partly Cloudy'}</p>
          </div>
          <div className="text-right">
             <svg className="w-14 h-14 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
             </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
          <div className="text-center">
            <p className="text-[10px] opacity-60 uppercase font-black tracking-tighter">{t.humidity}</p>
            <p className="text-sm font-black">65%</p>
          </div>
          <div className="text-center border-x border-white/10 px-2">
            <p className="text-[10px] opacity-60 uppercase font-black tracking-tighter">{t.wind}</p>
            <p className="text-sm font-black">12 km/h</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] opacity-60 uppercase font-black tracking-tighter">{t.rain}</p>
            <p className="text-sm font-black">10%</p>
          </div>
        </div>
      </div>

      {/* Pre-Harvest Money Shortcut */}
      {role === 'farmer' && (
        <button 
          onClick={() => setView && setView('finance')}
          className="w-full bg-amber-500 p-5 rounded-3xl flex items-center justify-between shadow-lg shadow-amber-100 group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-white">{t.preHarvestMoney}</p>
              <p className="text-[10px] text-amber-100 font-black uppercase tracking-widest">{lang === 'bn' ? 'ক্যালকুলেটর ব্যবহার করুন' : 'Use Calculator'}</p>
            </div>
          </div>
          <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
        </button>
      )}

      {/* AI Suggestion Banner */}
      <div className="bg-green-600 p-5 rounded-3xl flex items-center gap-4 shadow-xl shadow-green-100">
        <div className="bg-white/20 p-3 rounded-2xl shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-[11px] text-white font-black leading-snug">
          <span className="text-lime-300 block mb-0.5 uppercase tracking-wider">{t.aiSuggestion}</span>
          {lang === 'bn' ? '২ দিনের মধ্যে পাট কাটার প্রস্তুতি নিন' : 'Prepare to harvest Jute in 2 days for maximum quality.'}
        </p>
      </div>

      <section>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
          {t.activeCrops}
        </h3>
        <div className="space-y-3">
          <CropItem name={lang === 'bn' ? 'আমন ধান' : 'Aman Rice'} stage={lang === 'bn' ? 'ফুলেল' : 'Flowering'} health="Excellent" />
          <CropItem name={lang === 'bn' ? 'লাল আলু' : 'Red Potato'} stage={lang === 'bn' ? 'বৃদ্ধি' : 'Growth'} health="Healthy" />
        </div>
      </section>
    </div>
  );
};

const CropItem: React.FC<{ name: string; stage: string; health: string }> = ({ name, stage, health }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-50 text-green-600">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
      </div>
      <div>
        <p className="text-base font-black text-slate-900">{name}</p>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{stage}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[10px] font-black uppercase tracking-widest text-green-600">{health}</p>
    </div>
  </div>
);

export default Dashboard;