import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- Types & Constants ---
type AppRole = 'farmer' | 'buyer' | 'seller';
type AppView = 'dashboard' | 'market' | 'finance' | 'ai' | 'gov' | 'sell' | 'predictor' | 'analytics';

const CROP_DATA = [
  { id: 'aman', name_en: 'Aman Rice', name_bn: 'আমন ধান', rate: 5.556, msp: 32, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
  { id: 'jute', name_en: 'Jute', name_bn: 'পাট', rate: 4.80, msp: 65, image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=600' },
  { id: 'potato', name_en: 'Potato', name_bn: 'আলু', rate: 7.50, msp: 18, image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=600' },
];

const ANALYTICS_DATA = [
  { day: 'Mon', price: 30 }, { day: 'Tue', price: 32 }, { day: 'Wed', price: 31 },
  { day: 'Thu', price: 35 }, { day: 'Fri', price: 34 }, { day: 'Sat', price: 37 }, { day: 'Sun', price: 38 }
];

const TRANSLATIONS: Record<string, any> = {
  en: {
    home: "Home", market: "Market", funds: "Funds", ai: "Agri-AI", gov: "Gov Info", sell: "Sell",
    today: "Today", location: "Chittagong", activeCrops: "Active Harvests", weather: "Weather",
    preHarvest: "Pre-Harvest Investment Needed", apply: "Apply Now", buyNow: "Buy Now", placeBid: "Submit Bid",
    launchApp: "Launch Platform Portal", askAI: "Ask Agri-AI...", upload: "Upload Image",
    itemName: "Item Name", price: "Price (per kg)", listNow: "List Item Now", calcTitle: "Investment Needed",
    back: "Back", lifecycle: "Crop Lifecycle Planner", analytics: "Market Analytics"
  },
  bn: {
    home: "হোম", market: "বাজার", funds: "তহবিল", ai: "এআই", gov: "সরকারি", sell: "বিক্রি",
    today: "আজ", location: "চট্টগ্রাম", activeCrops: "বর্তমান ফসল", weather: "আবহাওয়া",
    preHarvest: "ফসল-পূর্ব বিনিয়োগ প্রয়োজন", apply: "আবেদন করুন", buyNow: "কিনুন", placeBid: "দর দিন",
    launchApp: "পোর্টাল খুলুন", askAI: "এআই-কে জিজ্ঞাসা করুন...", upload: "ছবি আপলোড",
    itemName: "পন্যের নাম", price: "মূল্য (কেজি)", listNow: "তালিকায় যোগ করুন", calcTitle: "বিনিয়োগ প্রয়োজন",
    back: "ফিরুন", lifecycle: "ফসল জীবনচক্র পরিকল্পনাকারী", analytics: "বাজার বিশ্লেষণ"
  }
};

// --- Sub-Components ---

const NavIcon = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 flex-1 transition-all active:scale-90 ${active ? 'text-slate-900 scale-110' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

// --- View: Dashboard ---
const Dashboard = ({ lang, role, setView }: { lang: 'en' | 'bn', role: AppRole, setView: (v: any) => void }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <div className={`p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden transition-all duration-700 ${
        role === 'farmer' ? 'bg-gradient-to-br from-green-600 to-green-800' :
        role === 'buyer' ? 'bg-gradient-to-br from-blue-600 to-blue-800' :
        'bg-gradient-to-br from-purple-600 to-purple-800'
      }`}>
        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">{t.today} • {role.toUpperCase()} MODE</p>
            <h3 className="text-3xl font-black mt-1">{lang === 'bn' ? 'স্বাগতম!' : 'Welcome back!'}</h3>
            <p className="text-sm opacity-90">{lang === 'bn' ? 'চট্টগ্রাম • রোদজ্বল' : 'Chittagong • Sunny'}</p>
          </div>
          <span className="text-4xl">{role === 'farmer' ? '🌾' : role === 'buyer' ? '🛒' : '📦'}</span>
        </div>
        
        {role === 'farmer' && (
          <div className="flex gap-4 mt-2">
            <div className="bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10">
              <p className="text-[8px] font-black opacity-60 uppercase">{t.weather}</p>
              <p className="text-xs font-black">৩১°C • ৮২% আর্দ্রতা</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {role === 'farmer' && (
          <>
            <QuickAction icon="💰" label={t.preHarvest} onClick={() => setView('finance')} color="bg-amber-100 text-amber-600" />
            <QuickAction icon="📅" label={t.lifecycle} onClick={() => setView('predictor')} color="bg-blue-100 text-blue-600" />
            <QuickAction icon="🏛️" label={t.gov} onClick={() => setView('gov')} color="bg-slate-100 text-slate-600" />
            <QuickAction icon="🤖" label={t.ai} onClick={() => setView('ai')} color="bg-green-100 text-green-600" />
          </>
        )}
        {role === 'buyer' && (
          <>
            <QuickAction icon="🛍️" label={t.market} onClick={() => setView('market')} color="bg-blue-100 text-blue-600" />
            <QuickAction icon="📈" label={t.analytics} onClick={() => setView('analytics')} color="bg-slate-100 text-slate-600" />
          </>
        )}
        {role === 'seller' && (
          <>
            <QuickAction icon="➕" label={t.sell} onClick={() => setView('sell')} color="bg-purple-100 text-purple-600" />
            <QuickAction icon="📦" label="Inventory" onClick={() => {}} color="bg-pink-100 text-pink-600" />
          </>
        )}
      </div>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.activeCrops}</h3>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 text-2xl rounded-2xl flex items-center justify-center">🌾</div>
            <div>
                <p className="text-base font-black text-slate-900">{lang === 'bn' ? 'আমন ধান' : 'Aman Rice'}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase">Chittagong North</p>
            </div>
          </div>
          <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Healthy</span>
        </div>
      </section>
    </div>
  );
};

const QuickAction = ({ icon, label, onClick, color }: any) => (
  <button onClick={onClick} className={`${color} p-5 rounded-[2rem] flex flex-col items-center gap-2 active:scale-95 transition-all shadow-sm border-2 border-transparent hover:border-white h-full`}>
    <span className="text-2xl">{icon}</span>
    <span className="text-[9px] font-black uppercase tracking-tighter text-center leading-tight">{label}</span>
  </button>
);

// --- View: Market Analytics ---
const MarketAnalytics = ({ lang }: { lang: 'en' | 'bn' }) => {
    const t = TRANSLATIONS[lang];
    return (
        <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-500">
            <div className="px-1">
                <h2 className="text-2xl font-black text-slate-900">{t.analytics}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Interactive Price Trends</p>
            </div>
            
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ANALYTICS_DATA}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 900 }} />
                            <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[8px] font-black uppercase text-slate-400">Avg Market Price</p>
                        <p className="text-xl font-black text-slate-900">৳৩৪.২</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-2xl">
                        <p className="text-[8px] font-black uppercase text-green-600">Demand Index</p>
                        <p className="text-xl font-black text-green-700">+১২%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- View: Pre-Harvest Investment (Renamed) ---
const InvestmentView = ({ lang }: { lang: 'en' | 'bn' }) => {
  const t = TRANSLATIONS[lang];
  const [landSize, setLandSize] = useState(900);
  const [isApplied, setIsApplied] = useState(false);
  const eligible = Math.floor(landSize * 5.5);

  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom duration-500">
      <div className="px-1">
        <h2 className="text-2xl font-black text-slate-900">{t.preHarvest}</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Secure your capital early</p>
      </div>
      
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Cultivation Area (Sq Ft)</span>
            <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-black">{landSize} sq ft</span>
          </div>
          <input 
            type="range" min="100" max="10000" step="100" 
            value={landSize} 
            onChange={(e) => setLandSize(parseInt(e.target.value))} 
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-amber-500 bg-slate-100" 
          />
        </div>

        <div className="bg-green-600 p-8 rounded-[2rem] text-white text-center shadow-2xl shadow-green-100 relative overflow-hidden group">
          <p className="text-[10px] font-black uppercase opacity-60 mb-2 tracking-widest">Recommended Investment</p>
          <h4 className="text-5xl font-black mb-8 tracking-tighter">৳{eligible.toLocaleString()}</h4>
          
          <button 
            onClick={() => { setIsApplied(true); setTimeout(() => setIsApplied(false), 3000); }}
            className={`w-full py-5 rounded-2xl text-xs font-black uppercase shadow-lg active:scale-95 transition-all ${isApplied ? 'bg-green-400 text-white' : 'bg-white text-green-700'}`}
          >
            {isApplied ? (lang === 'bn' ? 'আবেদন সম্পন্ন' : 'Application Sent') : t.apply}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- View: Lifecycle Planner (HarvestPredictor Restoration) ---
const LifecyclePlanner = ({ lang }: { lang: 'en' | 'bn' }) => {
    const t = TRANSLATIONS[lang];
    const [plantDate, setPlantDate] = useState('');
    const [events, setEvents] = useState<any[]>([]);

    const calculateTimeline = () => {
        if (!plantDate) return;
        const start = new Date(plantDate);
        setEvents([
            { label: lang === 'bn' ? 'চারা পর্যায়' : 'Seedling', date: new Date(start.getTime() + 10 * 86400000), color: 'bg-blue-500' },
            { label: lang === 'bn' ? 'সার প্রয়োগ (১)' : 'Fertilizer (I)', date: new Date(start.getTime() + 30 * 86400000), color: 'bg-amber-500' },
            { label: lang === 'bn' ? 'ফসল কাটা' : 'Harvesting', date: new Date(start.getTime() + 150 * 86400000), color: 'bg-green-600' },
        ]);
    };

    return (
        <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-500">
            <div className="px-1">
                <h2 className="text-2xl font-black text-slate-900">{t.lifecycle}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Plan your harvest window</p>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Planting Date</label>
                    <input type="date" value={plantDate} onChange={e => setPlantDate(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-black text-sm outline-none focus:border-green-600 transition-all" />
                </div>
                <button onClick={calculateTimeline} className="w-full bg-slate-900 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all">Generate Schedule</button>
                
                {events.length > 0 && (
                    <div className="space-y-6 mt-4">
                        {events.map((e, i) => (
                            <div key={i} className="flex items-center gap-4 animate-in slide-in-from-left" style={{animationDelay: `${i*100}ms`}}>
                                <div className={`w-3 h-3 rounded-full ${e.color} shadow-sm`}></div>
                                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <p className="text-[8px] font-black uppercase text-slate-400">{e.label}</p>
                                    <p className="text-sm font-black text-slate-900">{e.date.toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- App Root ---
const App = () => {
  const [showApp, setShowApp] = useState(false);
  const [view, setView] = useState<AppView>('dashboard');
  const [role, setRole] = useState<AppRole>('farmer');
  const [lang, setLang] = useState<'en' | 'bn'>('bn');
  const t = TRANSLATIONS[lang];

  if (!showApp) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="p-6 flex justify-between items-center border-b border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100">FS</div>
            <span className="text-xl font-black tracking-tight">FosolSetu</span>
          </div>
          <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="bg-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{lang === 'en' ? 'বাংলা' : 'English'}</button>
        </header>
        <main className="flex-1 px-6 pt-20 text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">{t.launchApp}</h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">Connecting farmers directly to markets, intelligence, and zero-commission financing.</p>
          <button onClick={() => setShowApp(true)} className="bg-green-600 text-white px-12 py-6 rounded-[2.5rem] text-xl font-black shadow-2xl shadow-green-200 hover:scale-105 active:scale-95 transition-all">
            {t.launchApp}
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* HEADER WITH BACK BUTTON & ROLE SWITCHER */}
        <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 px-4 py-4 space-y-3">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
               {view !== 'dashboard' ? (
                 <button 
                   onClick={() => setView('dashboard')}
                   className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                 </button>
               ) : (
                 <button onClick={() => setShowApp(false)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black shadow-lg transition-colors duration-500 ${role === 'farmer' ? 'bg-green-600' : role === 'buyer' ? 'bg-blue-600' : 'bg-purple-600'}`}>FS</button>
               )}
               <h1 className="text-base font-black text-slate-900 tracking-tighter">FosolSetu</h1>
             </div>
             <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="bg-slate-100 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200">{lang === 'en' ? 'বাংলা' : 'EN'}</button>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
             {(['farmer', 'buyer', 'seller'] as AppRole[]).map(r => (
               <button 
                 key={r}
                 onClick={() => { setRole(r); setView('dashboard'); }}
                 className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${role === r ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}
               >
                 {lang === 'bn' ? (r === 'farmer' ? 'কৃষক' : r === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা') : r}
               </button>
             ))}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
          {view === 'dashboard' && <Dashboard lang={lang} role={role} setView={setView} />}
          {view === 'market' && <Marketplace lang={lang} role={role} />}
          {view === 'finance' && <InvestmentView lang={lang} />}
          {view === 'ai' && <AgriAI lang={lang} />}
          {view === 'predictor' && <LifecyclePlanner lang={lang} />}
          {view === 'analytics' && <MarketAnalytics lang={lang} />}
          {view === 'gov' && (
            <div className="animate-in fade-in duration-500 space-y-4">
              <h2 className="text-xl font-black px-1">{t.gov}</h2>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <p className="text-xs font-black text-blue-600 uppercase mb-2">Subsidy Update</p>
                <p className="text-sm font-bold text-slate-700">২০২৪ সারের ভর্তুকি আবেদন শুরু হয়েছে। আজই নিকটস্থ কৃষি অফিসে যোগাযোগ করুন।</p>
              </div>
            </div>
          )}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-around items-center z-50 shadow-2xl rounded-t-[2.5rem]">
          <NavIcon active={view === 'dashboard'} onClick={() => setView('dashboard')} label={t.home} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} />
          <NavIcon active={view === 'market'} onClick={() => setView('market')} label={t.market} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>} />
          <NavIcon active={view === 'ai'} onClick={() => setView('ai')} label={t.ai} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} />
          <NavIcon active={view === 'finance'} onClick={() => setView('finance')} label={t.funds} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} />
        </nav>
      </div>
    </div>
  );
};

// --- View Helpers ---
const Marketplace = ({ lang, role }: { lang: 'en' | 'bn', role: AppRole }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-500">
      <div className="px-1">
        <h2 className="text-2xl font-black text-slate-900">{t.market}</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global standard market access</p>
      </div>
      <div className="space-y-6">
        {CROP_DATA.map(crop => (
          <div key={crop.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-lg group">
            <div className="relative aspect-[16/9] overflow-hidden">
                <img src={crop.image} alt={crop.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black text-green-600 shadow-sm uppercase tracking-widest">Verified Harvest</div>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-black text-slate-900 text-xl leading-tight">{lang === 'bn' ? crop.name_bn : crop.name_en}</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase">Standard Grade</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Base Price</p>
                        <p className="text-2xl font-black text-blue-600">৳{crop.msp}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-slate-100 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Place Bid</button>
                    <button className="bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-95 transition-all">Buy Now</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AgriAI = ({ lang }: { lang: 'en' | 'bn' }) => {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState([{ role: 'ai', text: lang === 'bn' ? 'হ্যালো! আমি আপনার কৃষি সহকারী। আমি কি সাহায্য করতে পারি?' : 'Hello! I am your Agri-Assistant. How can I help?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const cur = input; setInput(''); setMessages(m => [...m, { role: 'user', text: cur }]); setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: cur,
        config: { systemInstruction: "Expert agricultural advisor for Bangladesh." }
      });
      setMessages(m => [...m, { role: 'ai', text: res.text || "..." }]);
    } catch { setMessages(m => [...m, { role: 'ai', text: "Service temporarily busy." }]); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[60vh] pb-24">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-slate-900 text-white shadow-md rounded-tr-none' : 'bg-white border text-slate-700 shadow-sm rounded-tl-none'}`}>{m.text}</div>
          </div>
        ))}
        {loading && <div className="p-4 bg-white border border-slate-100 w-20 rounded-2xl animate-pulse">...</div>}
      </div>
      <div className="mt-4 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={t.askAI} className="flex-1 bg-white border border-slate-200 px-5 py-4 rounded-2xl text-sm shadow-inner" />
        <button onClick={handleSend} className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg active:scale-90 transition-all">🚀</button>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}