import React, { useState, useMemo } from 'react';
import { translations } from '../translations';
import { AppLanguage } from '../types';

const cropRates = [
  { id: 'aman', name_en: 'Aman Rice', name_bn: 'আমন ধান', rate: 5.556 },
  { id: 'jute', name_en: 'Jute', name_bn: 'পাট', rate: 4.80 },
  { id: 'potato', name_en: 'Potato', name_bn: 'আলু', rate: 7.50 },
  { id: 'wheat', name_en: 'Wheat', name_bn: 'গম', rate: 5.20 },
];

const Financing: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const t = translations[lang];
  const [landSize, setLandSize] = useState(900);
  const [selectedCrop, setSelectedCrop] = useState(cropRates[0]);
  const [isApplying, setIsApplying] = useState(false);

  const eligibleAmount = useMemo(() => {
    // Math: 900 * 5.556 = 5000.4 TK. Floor'd to 5000 TK as requested.
    return Math.floor(landSize * selectedCrop.rate);
  }, [landSize, selectedCrop]);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => setIsApplying(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500 pb-10">
      {/* Current Credit Card */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-48 h-48 bg-green-600/20 rounded-full blur-3xl"></div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
          {lang === 'bn' ? 'বর্তমান ঋণের সীমা' : 'Credit Limit'}
        </p>
        <h3 className="text-4xl font-black mb-6 text-green-400 tracking-tight">৳2,50,000</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Interest</p>
            <p className="text-lg font-black">6.5%</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Term</p>
            <p className="text-lg font-black">{lang === 'bn' ? '৬ মাস' : '6 Mo'}</p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
           </div>
           <div>
             <h4 className="text-lg font-black text-slate-900">{t.calcTitle}</h4>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'আপনার ঋণের পরিমাণ নির্ধারণ করুন' : 'Calculate your pre-harvest funding'}</p>
           </div>
        </div>

        <div className="space-y-6">
          {/* Crop Selection */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.selectCrop}</p>
            <div className="grid grid-cols-2 gap-2">
              {cropRates.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setSelectedCrop(c)} 
                  className={`px-3 py-4 rounded-2xl text-[10px] font-black border-2 transition-all active:scale-95 ${selectedCrop.id === c.id ? 'bg-amber-500 text-white border-amber-500 shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-amber-200'}`}
                >
                  {lang === 'bn' ? c.name_bn : c.name_en}
                </button>
              ))}
            </div>
          </div>

          {/* Land Size Slider */}
          <div className="bg-slate-50 p-6 rounded-3xl space-y-5 border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.landSize}</span>
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-sm">{landSize} sq ft</span>
            </div>
            <div className="px-1">
              <input 
                type="range" min="100" max="10000" step="100" 
                value={landSize} 
                onChange={(e) => setLandSize(parseInt(e.target.value))} 
                className="w-full h-2 rounded-full cursor-pointer accent-amber-500 transition-all" 
              />
            </div>
            <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase px-1">
              <span>100 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-green-600 p-7 rounded-[2.5rem] text-white flex flex-col md:flex-row gap-6 justify-between items-center shadow-2xl shadow-green-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transition-transform group-hover:rotate-12">
               <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
             </div>
             <div className="text-center md:text-left z-10">
               <p className="text-[10px] font-black uppercase opacity-80 mb-1 tracking-widest">{t.eligibleAmount}</p>
               <div className="flex items-end gap-1">
                 <p className="text-5xl font-black tracking-tighter">৳{eligibleAmount.toLocaleString()}</p>
                 <span className="text-[10px] font-bold opacity-60 mb-2 uppercase">{lang === 'bn' ? 'পর্যন্ত' : 'Max'}</span>
               </div>
             </div>
             <button 
              onClick={handleApply}
              disabled={isApplying}
              className={`w-full md:w-auto bg-white text-green-700 px-10 py-5 rounded-[1.5rem] text-xs font-black uppercase shadow-xl active:scale-95 transition-all z-10 ${isApplying ? 'opacity-70 scale-95' : 'hover:bg-slate-50'}`}
             >
               {isApplying ? (lang === 'bn' ? 'প্রসেসিং...' : 'Processing...') : t.applyNow}
             </button>
          </div>
          
          <p className="text-[9px] text-center text-slate-400 font-medium px-4">
            {lang === 'bn' ? '* ৯০০ বর্গফুট আমন চাষের জন্য ৫০০০ টাকা পর্যন্ত ঋণ পাওয়ার সুবিধা রয়েছে।' : '* 900 sq ft Aman cultivation qualifies for up to ৳5,000 in funding.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Financing;