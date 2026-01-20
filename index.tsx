import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Data & Constants ---
const CROP_DATA = [
  { id: 'aman', name_en: 'Aman Rice', name_bn: 'আমন ধান', rate: 5.556, msp: 32 },
  { id: 'jute', name_en: 'Jute', name_bn: 'পাট', rate: 4.80, msp: 65 },
  { id: 'potato', name_en: 'Potato', name_bn: 'আলু', rate: 7.50, msp: 18 },
  { id: 'wheat', name_en: 'Wheat', name_bn: 'গম', rate: 5.20, msp: 35 },
];

const TRANSLATIONS: Record<string, any> = {
  en: {
    home: "Home", market: "Market", funds: "Funds", ai: "Agri-AI", gov: "Gov Info",
    farmerPortal: "Farmer Portal", today: "Today", location: "Chittagong",
    humidity: "Humidity", wind: "Wind", rain: "Rain", activeCrops: "My Harvests",
    preHarvest: "Pre-Harvest Cash", calcTitle: "Pre-Harvest Eligibility",
    landSize: "Land Size (Sq Ft)", result: "Eligible Amount", apply: "Apply Now",
    askAI: "Ask Agri-AI...", govNotices: "Official Notices", mspTracker: "Price Tracker",
    helpline: "Krishi Call Center: 16123", subsidies: "Subsidies", forecast: "Forecast",
    investorTitle: "Every Harvest Deserves Its Full Value",
    investorSubtitle: "Empowering 100,000+ Bangladeshi farmers with zero-commission market access and fair financing.",
    launchApp: "Launch Farmer Portal"
  },
  bn: {
    home: "হোম", market: "বাজার", funds: "তহবিল", ai: "এআই", gov: "সরকারি",
    farmerPortal: "কৃষক পোর্টাল", today: "আজ", location: "চট্টগ্রাম",
    humidity: "আর্দ্রতা", wind: "বাতাস", rain: "বৃষ্টি", activeCrops: "আমার ফসল",
    preHarvest: "ফসল-পূর্ব নগদ", calcTitle: "নগদ যোগ্যতা ক্যালকুলেটর",
    landSize: "জমির পরিমাণ (বর্গফুট)", result: "সম্ভাব্য পরিমাণ", apply: "আবেদন করুন",
    askAI: "এআই-কে জিজ্ঞাসা করুন...", govNotices: "সরকারি বিজ্ঞপ্তি", mspTracker: "মূল্য তালিকা",
    helpline: "কৃষি কল সেন্টার: ১৬১২৩", subsidies: "ভর্তুকি", forecast: "পূর্বাভাস",
    investorTitle: "প্রতিটি ফসল তার পূর্ণ মূল্যের দাবিদার",
    investorSubtitle: "১০০,০০০+ বাংলাদেশী কৃষককে সরাসরি বাজার এবং ন্যায্য অর্থায়নের মাধ্যমে ক্ষমতায়ন করা।",
    launchApp: "কৃষক পোর্টাল খুলুন"
  }
};

// --- Sub-Components ---

const NavIcon = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 flex-1 transition-all ${active ? 'text-green-600 scale-110' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const Dashboard = ({ lang, setView }: { lang: 'en' | 'bn', setView: (v: string) => void }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">{t.today} • {t.location}</p>
            <h3 className="text-4xl font-black mt-1">30°C</h3>
            <p className="text-sm opacity-90">{lang === 'bn' ? 'আংশিক মেঘলা' : 'Partly Cloudy'}</p>
          </div>
          <span className="text-4xl">🌦️</span>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center">
          <div><p className="text-[9px] opacity-60 font-black uppercase">{t.humidity}</p><p className="text-xs font-black">65%</p></div>
          <div><p className="text-[9px] opacity-60 font-black uppercase">{t.wind}</p><p className="text-xs font-black">12km/h</p></div>
          <div><p className="text-[9px] opacity-60 font-black uppercase">{t.rain}</p><p className="text-xs font-black">10%</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button onClick={() => setView('finance')} className="bg-amber-500 p-6 rounded-3xl flex items-center justify-between shadow-lg text-white group active:scale-[0.98] transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl text-2xl">💰</div>
            <div className="text-left"><p className="text-base font-black">{t.preHarvest}</p><p className="text-[9px] text-amber-100 font-bold uppercase tracking-widest">{lang === 'bn' ? 'তহবিল আবেদন' : 'Apply for Funds'}</p></div>
          </div>
          <span className="text-2xl">→</span>
        </button>
        <button onClick={() => setView('gov')} className="bg-slate-900 p-6 rounded-3xl flex items-center justify-between shadow-xl text-white group active:scale-[0.98] transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-2xl text-2xl">🏛️</div>
            <div className="text-left"><p className="text-base font-black">{t.gov}</p><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{lang === 'bn' ? 'সরকারি তথ্য ও সেবা' : 'Official Services'}</p></div>
          </div>
          <span className="text-2xl">→</span>
        </button>
      </div>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{t.activeCrops}</h3>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl">🌾</div>
            <div><p className="text-base font-black text-slate-900">{lang === 'bn' ? 'আমন ধান' : 'Aman Rice'}</p><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Growth Phase</p></div>
          </div>
          <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Healthy</p>
        </div>
      </section>
    </div>
  );
};

const GovInfo = ({ lang }: { lang: 'en' | 'bn' }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <div className="bg-red-600 p-6 rounded-[2rem] text-white shadow-xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase opacity-80 tracking-widest mb-1">{lang === 'bn' ? 'জরুরি কৃষি হেল্পলাইন' : 'Agri-Helpline'}</p>
          <h3 className="text-4xl font-black">16123</h3>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl shadow-inner">📞</div>
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-900 mb-4 px-2">{t.mspTracker}</h3>
        <div className="grid grid-cols-2 gap-3">
          {CROP_DATA.map(crop => (
            <div key={crop.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{lang === 'bn' ? crop.name_bn : crop.name_en}</p>
              <p className="text-2xl font-black text-slate-900">৳{crop.msp}</p>
              <p className="text-[9px] font-bold text-green-600 uppercase mt-1">Govt Price</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-900 mb-4 px-2">{t.subsidies}</h3>
        <div className="space-y-3">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-base font-black text-slate-900">{lang === 'bn' ? 'সার ভর্তুকি' : 'Fertilizer Subsidy'}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase">Active Oct-Nov</p>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">{t.apply}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinancePortal = ({ lang }: { lang: 'en' | 'bn' }) => {
  const t = TRANSLATIONS[lang];
  const [landSize, setLandSize] = useState(900);
  const [crop, setCrop] = useState(CROP_DATA[0]);
  const amount = useMemo(() => Math.floor(landSize * crop.rate), [landSize, crop]);

  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-bottom duration-500">
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Active Limit</p>
        <h3 className="text-4xl font-black text-green-400 tracking-tighter">৳2,50,000</h3>
      </div>
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-lg space-y-6">
        <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">💰 {t.calcTitle}</h4>
        <div className="grid grid-cols-2 gap-2">
          {CROP_DATA.map(c => (
            <button key={c.id} onClick={() => setCrop(c)} className={`px-3 py-3 rounded-2xl text-[10px] font-black border-2 transition-all ${crop.id === c.id ? 'bg-amber-500 text-white border-amber-500 shadow-lg' : 'bg-white text-slate-500 border-slate-100'}`}>
              {lang === 'bn' ? c.name_bn : c.name_en}
            </button>
          ))}
        </div>
        <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase">
            <span>{t.landSize}</span>
            <span className="text-amber-600 text-sm font-black bg-amber-100 px-3 py-1 rounded-xl">{landSize} sq ft</span>
          </div>
          <input type="range" min="100" max="5000" step="100" value={landSize} onChange={(e) => setLandSize(parseInt(e.target.value))} className="w-full" />
        </div>
        <div className="bg-green-600 p-8 rounded-[2rem] text-white text-center shadow-xl">
          <p className="text-[10px] font-black uppercase opacity-70 mb-1">{t.result}</p>
          <p className="text-5xl font-black mb-6">৳{amount.toLocaleString()}</p>
          <button className="w-full bg-white text-green-700 py-4 rounded-2xl text-xs font-black uppercase shadow-lg active:scale-95 transition-all">{t.apply}</button>
        </div>
      </div>
    </div>
  );
};

const AgriAI = ({ lang }: { lang: 'en' | 'bn' }) => {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState([{ role: 'ai', text: lang === 'bn' ? 'স্বাগতম! আমি আপনার কৃষি সহকারী।' : 'Welcome! I am your Agri-Assistant.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const cur = input; setInput(''); setMessages(prev => [...prev, { role: 'user', text: cur }]); setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: cur,
        config: { systemInstruction: "You are an expert agricultural consultant for Bangladeshi farmers. Be professional, concise, and helpful." }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "..." }]);
    } catch { setMessages(prev => [...prev, { role: 'ai', text: "Service busy." }]); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[65vh] pb-24">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 p-2 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-green-600 text-white shadow-md' : 'bg-white border text-slate-700 shadow-sm'}`}>{m.text}</div>
          </div>
        ))}
        {loading && <div className="p-4 bg-white border border-slate-100 w-20 rounded-2xl animate-pulse">...</div>}
      </div>
      <div className="mt-4 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={t.askAI} className="flex-1 bg-white border border-slate-200 px-5 py-4 rounded-3xl text-sm outline-none shadow-inner" />
        <button onClick={handleSend} className="bg-green-600 text-white p-4 rounded-3xl shadow-lg active:scale-90 transition-all">🚀</button>
      </div>
    </div>
  );
};

// --- Landing Page ---

const LandingPage = ({ lang, onStart }: { lang: 'en' | 'bn', onStart: () => void }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black text-xl">FS</div>
          <span className="text-xl font-black tracking-tight">FosolSetu</span>
        </div>
      </header>
      <main className="flex-1 px-6 pt-20 pb-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">University of Chittagong Incubated</div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">{t.investorTitle}</h1>
        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{t.investorSubtitle}</p>
        <div className="pt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onStart} className="bg-green-600 text-white px-12 py-6 rounded-[2rem] text-xl font-black shadow-2xl shadow-green-200 hover:scale-105 active:scale-95 transition-all">{t.launchApp}</button>
        </div>
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2">Zero Commission</h4>
            <p className="text-sm text-slate-500">Farmers keep 100% of their market price through direct links.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2">Fair Loans</h4>
            <p className="text-sm text-slate-500">Eliminating middlemen debt-traps with pre-harvest funding.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2">Agri-AI Advisory</h4>
            <p className="text-sm text-slate-500">Real-time local intelligence to minimize crop failure risk.</p>
          </div>
        </div>
      </main>
      <footer className="p-10 border-t border-slate-100 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest">© 2024 FosolSetu Team</footer>
    </div>
  );
};

// --- App Root ---

const App = () => {
  const [showApp, setShowApp] = useState(false);
  const [view, setView] = useState('dashboard');
  const [lang, setLang] = useState<'en' | 'bn'>('bn');
  const t = TRANSLATIONS[lang];

  if (!showApp) return <LandingPage lang={lang} onStart={() => setShowApp(true)} />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col shadow-2xl relative overflow-hidden">
        <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowApp(false)} className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-green-100">FS</button>
            <h1 className="text-lg font-black text-slate-900 tracking-tighter">Fosol Setu</h1>
          </div>
          <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="bg-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{lang === 'en' ? 'বাংলা' : 'English'}</button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto no-scrollbar">
          {view === 'dashboard' && <Dashboard lang={lang} setView={setView} />}
          {view === 'finance' && <FinancePortal lang={lang} />}
          {view === 'gov' && <GovInfo lang={lang} />}
          {view === 'ai' && <AgriAI lang={lang} />}
          {view === 'market' && <div className="text-center py-20 font-black uppercase text-slate-300 text-xs">Marketplace Coming 2025</div>}
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-6 py-4 flex justify-around items-center z-50 shadow-2xl rounded-t-[2rem]">
          <NavIcon active={view === 'dashboard'} onClick={() => setView('dashboard')} label={t.home} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} />
          <NavIcon active={view === 'market'} onClick={() => setView('market')} label={t.market} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>} />
          <NavIcon active={view === 'finance'} onClick={() => setView('finance')} label={t.funds} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} />
          <NavIcon active={view === 'gov'} onClick={() => setView('gov')} label={t.gov} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>} />
          <NavIcon active={view === 'ai'} onClick={() => setView('ai')} label={t.ai} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} />
        </nav>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}