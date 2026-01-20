import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { translations } from '../translations';
import { AppLanguage } from '../types';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AgriAI: React.FC<{ lang: AppLanguage }> = ({ lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      text: lang === 'bn' 
        ? 'হ্যালো মাহি! আমি আপনার ফসল সেতু এআই। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?' 
        : 'Hello Mahi! I am your Fosol Setu AI. How can I help with your crops today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    const apiKey = (window as any).process?.env?.API_KEY;
    
    if (!apiKey) {
      setMessages(prev => [...prev, 
        { role: 'user', text: userMsg },
        { role: 'ai', text: lang === 'bn' ? 'দুঃখিত, এপিআই কি খুঁজে পাওয়া যায়নি।' : 'Sorry, API Key not configured.' }
      ]);
      setInput('');
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are an expert agricultural consultant for Bangladeshi farmers using the Fosol Setu platform. Provide advice in the following language: ${lang === 'bn' ? 'Bangla' : 'English'}. Keep responses concise and practical. Tone: Encouraging and professional.`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || (lang === 'bn' ? "দুঃখিত, আমি উত্তর দিতে পারছি না।" : "I'm sorry, I couldn't process that.");
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: lang === 'bn' ? "সংযোগ ত্রুটি।" : "Connection error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] animate-in zoom-in-95 duration-300">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 no-scrollbar" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.askAI}
          className="flex-1 bg-white border border-slate-200 px-4 py-4 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 shadow-sm transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="bg-green-600 text-white p-4 rounded-2xl shadow-lg shadow-green-100 flex items-center justify-center disabled:bg-slate-300 active:scale-90 transition-transform"
        >
          <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default AgriAI;