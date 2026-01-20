
import React, { useState } from 'react';
import { translations } from '../translations';
import { AppLanguage } from '../types';

const crops = [
  { name_en: 'Aman Rice', name_bn: 'আমন ধান', duration: 150, fert1: 30, fert2: 60, seedling: 10 },
  { name_en: 'Jute', name_bn: 'পাট', duration: 120, fert1: 25, fert2: 50, seedling: 7 },
  { name_en: 'Winter Potato', name_bn: 'শীতকালীন আলু', duration: 90, fert1: 20, fert2: 45, seedling: 5 },
  { name_en: 'Wheat', name_bn: 'গম', duration: 110, fert1: 25, fert2: 55, seedling: 10 },
];

type EventType = 'seedling' | 'fert1' | 'fert2' | 'harvest';

interface TimelineEvent {
  type: EventType;
  date: Date;
  color: string;
}

const HarvestPredictor: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [plantDate, setPlantDate] = useState('');
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[] | null>(null);
  const [error, setError] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  const getLabel = (type: EventType) => {
    switch (type) {
      case 'seedling': return t.seedling;
      case 'fert1': return `${t.fertilizer} (I)`;
      case 'fert2': return `${t.fertilizer} (II)`;
      case 'harvest': return t.harvesting;
      default: return '';
    }
  };

  const handleCalculate = () => {
    if (!plantDate) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    
    const start = new Date(plantDate + 'T00:00:00');
    
    const events: TimelineEvent[] = [
      { 
        type: 'seedling', 
        date: new Date(start.getTime() + selectedCrop.seedling * 86400000),
        color: 'bg-blue-600'
      },
      { 
        type: 'fert1', 
        date: new Date(start.getTime() + selectedCrop.fert1 * 86400000),
        color: 'bg-amber-500'
      },
      { 
        type: 'fert2', 
        date: new Date(start.getTime() + selectedCrop.fert2 * 86400000),
        color: 'bg-orange-600'
      },
      { 
        type: 'harvest', 
        date: new Date(start.getTime() + selectedCrop.duration * 86400000),
        color: 'bg-green-700'
      }
    ];
    setTimelineEvents(events);
    setError(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500 pb-12">
      <div className="px-1">
        <h2 className="text-xl font-black text-slate-900 leading-tight">{t.harvestPredictor}</h2>
        <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'আপনার ফসলের সম্পূর্ণ জীবনচক্র পরিকল্পনা করুন।' : 'Plan your entire crop lifecycle timeline.'}</p>
      </div>
      
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100/50 space-y-5">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">{t.selectCrop}</label>
          <div className="grid grid-cols-2 gap-2">
            {crops.map(c => (
              <button 
                key={c.name_en}
                onClick={() => setSelectedCrop(c)}
                className={`px-3 py-3 rounded-2xl text-[11px] font-black border-2 transition-all ${
                  selectedCrop.name_en === c.name_en 
                    ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-100' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-green-200'
                }`}
              >
                {lang === 'bn' ? c.name_bn : c.name_en}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`text-[10px] font-bold uppercase tracking-widest mb-3 block ${error ? 'text-red-500' : 'text-slate-400'}`}>
            {t.plantingDate} {error && '*'}
          </label>
          <input 
            type="date"
            value={plantDate}
            onChange={(e) => { setPlantDate(e.target.value); setError(false); }}
            className={`w-full bg-slate-50 border-2 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-green-500/10 outline-none transition-all ${
              error ? 'border-red-300 animate-bounce' : 'border-slate-100 focus:border-green-500'
            }`}
          />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          {t.predict}
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>

        {timelineEvents && (
          <div className="mt-8 pt-8 border-t border-slate-50 space-y-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">{t.suggestedDate}</h4>
            <div className="relative pl-8 space-y-10">
               <div className="absolute left-[9px] top-2 bottom-2 w-1 bg-slate-100 rounded-full"></div>
               
               {timelineEvents.map((event, idx) => (
                 <div key={idx} className="relative flex items-center gap-5 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className={`absolute left-[-26px] w-5 h-5 rounded-full border-4 border-white shadow-md ${event.color} z-10`}></div>
                    <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{getLabel(event.type)}</p>
                      <p className="text-sm font-black text-slate-900">{formatDate(event.date)}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarvestPredictor;
