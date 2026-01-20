
import React from 'react';
import { TEAM } from '../constants';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">The Innovators</h2>
          <p className="mt-4 text-slate-500">The core team driving agricultural transformation at University of Chittagong.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={member.image} alt={member.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-lg">{member.name}</div>
                  <div className="text-green-400 text-xs font-semibold uppercase">{member.role}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-sm font-bold text-slate-900 mb-1">{member.specialization}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{member.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
