
import React, { useState } from 'react';
import { AppLanguage } from '../types';

const SellerPortal: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [isListed, setIsListed] = useState(false);

  const handleList = () => {
    if (!itemName || !price) return;
    setIsListed(true);
    setTimeout(() => setIsListed(false), 3000);
    setItemName('');
    setPrice('');
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300 pb-10">
      <div className="px-1">
        <h2 className="text-2xl font-black text-slate-900 leading-tight">
          {lang === 'bn' ? 'পন্য বিক্রি করুন' : 'List Item for Sale'}
        </h2>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
          {lang === 'bn' ? 'সরাসরি ক্রেতার কাছে পৌঁছে দিন' : 'Sell directly to buyers or farmers'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
        {/* Image Upload Placeholder */}
        <div className="w-full aspect-[16/10] bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors active:scale-95 group">
          <div className="bg-white p-4 rounded-full shadow-sm text-slate-300 group-hover:text-purple-600 transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            {lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Item Image'}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">
              {lang === 'bn' ? 'পন্যের নাম' : 'Item Name'}
            </label>
            <input 
              type="text" 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={lang === 'bn' ? 'যেমন: ধানের বীজ' : 'e.g. Rice Seeds'} 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">
              {lang === 'bn' ? 'মূল্য (প্রতি কেজি)' : 'Price (per kg)'}
            </label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="৳" 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <button 
            onClick={handleList}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
              isListed ? 'bg-green-600 text-white' : 'bg-purple-600 text-white shadow-purple-200'
            }`}
          >
            {isListed ? (lang === 'bn' ? 'সফল হয়েছে!' : 'Listed Successfully!') : (lang === 'bn' ? 'তালিকায় যোগ করুন' : 'List Item Now')}
          </button>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
          {lang === 'bn' ? 'আপনার সক্রিয় পন্য' : 'Your Active Listings'}
        </h3>
        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm opacity-50 grayscale">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl">📦</div>
            <div>
              <p className="text-base font-black text-slate-900">Seeds 01</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Pending Verification</p>
            </div>
          </div>
          <span className="text-2xl">⏱️</span>
        </div>
      </section>
    </div>
  );
};

export default SellerPortal;
