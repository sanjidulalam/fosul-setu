
import React, { useState } from 'react';
import { translations } from '../translations';
import { AppLanguage, AppRole } from '../types';

const Marketplace: React.FC<{ lang: AppLanguage, role: AppRole }> = ({ lang, role }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState('Rice');

  const buyerProducts = [
    { 
      id: 1, 
      name: lang === 'bn' ? 'মিনিকেট চাল' : 'Miniket Rice', 
      price: 68.50, 
      qty: '2.5 Ton', 
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
      location: 'Dinajpur',
      category: 'Rice'
    },
    { 
      id: 2, 
      name: lang === 'bn' ? 'লাল আলু' : 'Red Potato', 
      price: 24.00, 
      qty: '800 KG', 
      image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=600',
      location: 'Munshiganj',
      category: 'Veg'
    },
    { 
      id: 3, 
      name: lang === 'bn' ? 'বাসমতি চাল' : 'Basmati Rice', 
      price: 115.00, 
      qty: '1.2 Ton', 
      image: 'https://images.unsplash.com/photo-1590333746438-2834505413b6?auto=format&fit=crop&q=80&w=600',
      location: 'Naogaon',
      category: 'Rice'
    },
    { 
      id: 4, 
      name: lang === 'bn' ? 'নাজিরশাইল চাল' : 'Nazirshail Rice', 
      price: 72.00, 
      qty: '3.0 Ton', 
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=600',
      location: 'Mymensingh',
      category: 'Rice'
    }
  ];

  const getHeading = () => {
    if (role === 'buyer') return lang === 'bn' ? 'সরাসরি সংগ্রহ' : 'Direct Sourcing';
    if (role === 'seller') return lang === 'bn' ? 'উপকরণ তালিকা' : 'Manage Inputs';
    return lang === 'bn' ? 'সরাসরি বাজার' : 'Direct Market';
  };

  const categories = ['Rice', 'Veg', 'Seeds', 'All'];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300 pb-10">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-xl font-black text-slate-900">{getHeading()}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'কৃষকের সাথে সরাসরি' : 'Deal Directly with Farmers'}</p>
        </div>
        <button className="bg-green-600 text-white px-5 py-3 rounded-2xl text-[11px] font-black shadow-xl shadow-green-100 uppercase tracking-wider active:scale-95 transition-all">
          {role === 'farmer' ? (lang === 'bn' ? '+ ফসল বিক্রি' : '+ Sell Crop') : (lang === 'bn' ? 'নতুন অফার' : 'New Offers')}
        </button>
      </div>

      {role === 'buyer' && (
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
          {categories.map(c => (
            <button 
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black border-2 whitespace-nowrap transition-all shadow-sm ${
                filter === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
              }`}
            >
              {c === 'All' ? (lang === 'bn' ? 'সব দেখুন' : 'View All') : c}
            </button>
          ))}
        </div>
      )}

      {role === 'buyer' ? (
        <div className="grid grid-cols-1 gap-6">
          {buyerProducts.filter(p => filter === 'All' || p.category === filter).map(product => (
            <BuyerCard key={product.id} product={product} lang={lang} t={t} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {role === 'seller' ? (
            <>
              <MarketCard name={lang === 'bn' ? 'হাইব্রিড বীজ' : 'Hybrid Seeds'} qty="200 Pkts" bid="৳350/Pkt" buyers={0} />
              <MarketCard name={lang === 'bn' ? 'জৈব সার' : 'Organic Fertilizer'} qty="50 Bags" bid="৳1200/Bag" buyers={0} />
            </>
          ) : (
            <>
              <MarketCard name={lang === 'bn' ? 'বালাম চাল' : 'Balam Rice'} qty="500 KG" bid="৳45.50/KG" buyers={12} />
              <MarketCard name={lang === 'bn' ? 'প্রিমিয়াম পাট' : 'Premium Jute'} qty="1.2 Ton" bid="৳88.00/KG" buyers={5} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const BuyerCard: React.FC<{ product: any, lang: AppLanguage, t: any }> = ({ product, lang, t }) => {
  const [bid, setBid] = useState(product.price + 2);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50 flex flex-col group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-black text-green-600 flex items-center gap-1.5 shadow-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
          {t.certified}
        </div>
        <div className="absolute bottom-5 right-5 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-white tracking-widest uppercase">
          {product.location}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-black text-slate-900 text-2xl leading-tight mb-1">{product.name}</h4>
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-wider">{t.bulkAvailable}: <span className="text-slate-900">{product.qty}</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mb-1">{lang === 'bn' ? 'বর্তমান মূল্য' : 'Base Price / KG'}</p>
            <p className="text-2xl font-black text-green-600 leading-none">৳{product.price}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-3xl space-y-3">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
             <span>{t.enterBid}</span>
             <span className="text-slate-900 text-sm">৳{bid.toFixed(2)}</span>
           </div>
           <input 
              type="range" 
              min={product.price} 
              max={product.price + 20} 
              step="0.5"
              value={bid}
              onChange={(e) => setBid(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-green-600"
           />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-slate-100 text-slate-900 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
            {t.placeBid}
          </button>
          <button className="bg-green-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-200 hover:bg-green-700 active:scale-95 transition-all">
            {t.buyNow}
          </button>
        </div>
      </div>
    </div>
  );
};

const MarketCard: React.FC<{ name: string; qty: string; bid: string; buyers: number }> = ({ name, qty, bid, buyers }) => (
  <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
    <div className="p-5 flex justify-between items-start">
      <div>
        <h4 className="font-black text-slate-900 text-lg">{name}</h4>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{qty}</p>
      </div>
      {buyers > 0 && (
        <div className="bg-green-50 px-3 py-1.5 rounded-xl text-[9px] font-black text-green-600 uppercase tracking-wider">
          {buyers} Active Bids
        </div>
      )}
    </div>
    <div className="px-5 py-4 bg-slate-50 border-t border-slate-100/50 flex justify-between items-center">
      <div>
        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Price Target</p>
        <p className="text-base font-black text-green-600">{bid}</p>
      </div>
      <button className="text-[10px] font-black text-slate-900 uppercase tracking-widest underline decoration-2 underline-offset-4">Manage</button>
    </div>
  </div>
);

export default Marketplace;
