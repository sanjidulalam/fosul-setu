
import React, { useState } from 'react';
import { translations } from '../translations';
import { AppLanguage, AppRole } from '../types';

const Marketplace: React.FC<{ lang: AppLanguage, role: AppRole }> = ({ lang, role }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState('All');

  const products = {
    buyer: [
      { id: 1, name: lang === 'bn' ? 'মিনিকেট চাল' : 'Miniket Rice', price: 68, qty: '2.5 Ton', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', location: 'Dinajpur', category: 'Rice' },
      { id: 2, name: lang === 'bn' ? 'লাল আলু' : 'Red Potato', price: 24, qty: '800 KG', image: 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=600', location: 'Munshiganj', category: 'Veg' }
    ],
    seller: [
      { id: 101, name: lang === 'bn' ? 'হাইব্রিড বীজ' : 'Hybrid Seeds', price: 350, stock: '45 Pkts', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600', category: 'Seeds' },
      { id: 102, name: lang === 'bn' ? 'জৈব সার' : 'Organic Fertilizer', price: 1200, stock: '12 Bags', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600', category: 'Fertilizer' }
    ]
  };

  const categories = role === 'seller' ? ['All', 'Seeds', 'Fertilizer', 'Tools'] : ['All', 'Rice', 'Veg', 'Grain'];

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300 pb-10">
      <div className="flex justify-between items-center px-1">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            {role === 'seller' ? (lang === 'bn' ? 'ইনভেন্টরি' : 'Inventory') : (lang === 'bn' ? 'সরাসরি বাজার' : 'Fosol Market')}
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {role === 'seller' ? 'Update your input availability' : 'Connecting you to original farms'}
          </p>
        </div>
        <button className={`p-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center text-white ${role === 'seller' ? 'bg-purple-600 shadow-purple-200' : 'bg-green-600 shadow-green-200'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setFilter(c)}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black border-2 whitespace-nowrap transition-all ${
              filter === c ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 shadow-sm'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {role === 'seller' ? (
          products.seller.filter(p => filter === 'All' || p.category === filter).map(item => (
            <SellerInventoryCard key={item.id} item={item} lang={lang} />
          ))
        ) : (
          products.buyer.filter(p => filter === 'All' || p.category === filter).map(product => (
            <BuyerMarketCard key={product.id} product={product} lang={lang} t={t} />
          ))
        )}
      </div>
    </div>
  );
};

const SellerInventoryCard = ({ item, lang }: { item: any, lang: AppLanguage }) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-lg transition-all">
    <div className="relative aspect-[16/8] overflow-hidden">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      <div className="absolute top-5 left-5 bg-purple-600 text-white px-3 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg">
        {item.category}
      </div>
    </div>
    <div className="p-6 -mt-10 relative z-10 space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-black text-slate-900 text-xl">{item.name}</h4>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Stock: <span className="text-purple-600">{item.stock}</span></p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Price</p>
          <p className="text-2xl font-black text-slate-900">৳{item.price}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Quick Update</button>
        <button className="px-5 bg-slate-100 text-slate-400 py-4 rounded-2xl active:scale-95 transition-all hover:bg-red-50 hover:text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  </div>
);

const BuyerMarketCard = ({ product, lang, t }: { product: any, lang: AppLanguage, t: any }) => {
  const [bid, setBid] = useState(product.price + 2);
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-lg flex flex-col group hover:shadow-2xl transition-all duration-500">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[9px] font-black text-green-600 flex items-center gap-1.5 shadow-lg uppercase tracking-widest">
          {t.certified}
        </div>
        <div className="absolute bottom-5 right-5 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[9px] font-black text-white tracking-widest uppercase">
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
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mb-1">Current Base</p>
            <p className="text-2xl font-black text-blue-600">৳{product.price}</p>
          </div>
        </div>
        <div className="bg-slate-50 p-5 rounded-3xl space-y-3">
           <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
             <span>Your Offer / KG</span>
             <span className="text-slate-900 text-sm font-black bg-white px-3 py-1 rounded-xl shadow-sm animate-pulse">৳{bid.toFixed(2)}</span>
           </div>
           <input type="range" min={product.price} max={product.price + 20} step="0.5" value={bid} onChange={(e) => setBid(parseFloat(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-slate-100 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-slate-200">Submit Bid</button>
          <button className="bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-95 transition-all hover:bg-blue-700">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
