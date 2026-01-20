
import React from 'react';
import { translations } from '../translations';
import { AppLanguage, AppRole } from '../types';

const Dashboard: React.FC<{ lang: AppLanguage, role: AppRole, setView?: (v: any) => void }> = ({ lang, role, setView }) => {
  const t = translations[lang];

  const stats = {
    farmer: [
      { label: lang === 'bn' ? 'ফসল স্বাস্থ্য' : 'Crop Health', value: '92%', color: 'text-green-600' },
      { label: lang === 'bn' ? 'বাজার মূল্য' : 'Market Price', value: '৳৭২/কেজি', color: 'text-blue-600' }
    ],
    buyer: [
      { label: lang === 'bn' ? 'সক্রিয় বিড' : 'Active Bids', value: '০৮ টি', color: 'text-blue-600' },
      { label: lang === 'bn' ? 'সঞ্চয়' : 'Savings', value: '১২%', color: 'text-green-600' }
    ],
    seller: [
      { label: lang === 'bn' ? 'স্টক এলার্ট' : 'Low Stock', value: '০৩ পন্য', color: 'text-red-600' },
      { label: lang === 'bn' ? 'আঞ্চলিক চাহিদা' : 'Demand', value: 'উচ্চ', color: 'text-purple-600' }
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className={`p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden transition-all duration-700 ${
        role === 'farmer' ? 'bg-gradient-to-br from-green-600 to-green-800' :
        role === 'buyer' ? 'bg-gradient-to-br from-blue-600 to-blue-800' :
        'bg-gradient-to-br from-purple-600 to-purple-800'
      }`}>
        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">
              {t.today} • {role.toUpperCase()} MODE
            </p>
            <h3 className="text-3xl font-black mt-1">
              {lang === 'bn' ? 'স্বাগতম, মাহি!' : 'Welcome, Mahi!'}
            </h3>
            <p className="text-xs opacity-80 mt-1">
              {role === 'farmer' ? (lang === 'bn' ? 'ফসল কাটার প্রস্তুতি নিন' : 'Ready for harvest season') :
               role === 'buyer' ? (lang === 'bn' ? '১২টি খামার অফার দেখুন' : '12 farm offers near you') :
               (lang === 'bn' ? 'সারের চাহিদা ১৫% বেড়েছে' : 'Input demand up by 15%')}
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md hover:bg-white/30 transition-colors cursor-pointer">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {stats[role].map((stat, i) => (
            <div key={i} className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/10 cursor-pointer active:scale-95 transition-all">
              <p className="text-[9px] font-black uppercase opacity-60 mb-1">{stat.label}</p>
              <p className="text-xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {role === 'farmer' && (
          <>
            <QuickCard icon="💰" title={t.preHarvestMoney} onClick={() => setView?.('finance')} color="bg-amber-100 text-amber-600" />
            <QuickCard icon="📅" title={t.harvestPredictor} onClick={() => setView?.('predictor')} color="bg-blue-100 text-blue-600" />
          </>
        )}
        {role === 'buyer' && (
          <>
            <QuickCard icon="🛒" title={lang === 'bn' ? 'বাজার' : 'Direct Market'} onClick={() => setView?.('marketplace')} color="bg-blue-100 text-blue-600" />
            <QuickCard icon="📍" title={lang === 'bn' ? 'ম্যাপ' : 'Farm Map'} onClick={() => {}} color="bg-green-100 text-green-600" />
          </>
        )}
        {role === 'seller' && (
          <>
            <QuickCard icon="📦" title={lang === 'bn' ? 'ইনভেন্টরি' : 'Inventory'} onClick={() => setView?.('marketplace')} color="bg-purple-100 text-purple-600" />
            <QuickCard icon="📊" title={lang === 'bn' ? 'চাহিদা' : 'Demographics'} onClick={() => {}} color="bg-pink-100 text-pink-600" />
          </>
        )}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {role === 'farmer' ? t.activeCrops : role === 'buyer' ? (lang === 'bn' ? 'আপনার বিড' : 'Your Bids') : (lang === 'bn' ? 'পন্য' : 'Items')}
          </h3>
          <button className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-200 hover:text-slate-600 transition-colors">View All</button>
        </div>
        
        <div className="space-y-3">
          {role === 'farmer' && (
            <>
              <DashboardItem title={lang === 'bn' ? 'আমন ধান' : 'Aman Rice'} subtitle="4 days to harvest" value="Healthy" icon="🌾" />
              <DashboardItem title={lang === 'bn' ? 'লাল আলু' : 'Red Potato'} subtitle="Seedling stage" value="Good" icon="🥔" />
            </>
          )}
          {role === 'buyer' && (
            <>
              <DashboardItem title={lang === 'bn' ? 'মিনিকেট চাল' : 'Miniket Rice'} subtitle="High Bid: ৳৭০" value="Pending" icon="🍚" />
              <DashboardItem title={lang === 'bn' ? 'অর্গানিক আলু' : 'Organic Potato'} subtitle="Winner: ৳২৪" value="Won" icon="🥔" />
            </>
          )}
          {role === 'seller' && (
            <>
              <DashboardItem title={lang === 'bn' ? 'ইউরিয়া' : 'Urea'} subtitle="Stock: 12 Bags" value="Low" icon="🧪" />
              <DashboardItem title={lang === 'bn' ? 'বীজ' : 'Seeds'} subtitle="Demand: High" value="Active" icon="🌱" />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const QuickCard = ({ icon, title, onClick, color }: { icon: string, title: string, onClick: () => void, color: string }) => (
  <button onClick={onClick} className={`p-5 rounded-[2rem] shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-all text-center border-2 border-transparent hover:border-white shadow-slate-100 ${color}`}>
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-tight leading-tight">{title}</span>
  </button>
);

const DashboardItem = ({ title, subtitle, value, icon }: { title: string, subtitle: string, value: string, icon: string }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-slate-300 hover:shadow-md active:bg-slate-50 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 text-2xl shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-base font-black text-slate-900 leading-tight">{title}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">{value}</p>
    </div>
  </div>
);

export default Dashboard;
