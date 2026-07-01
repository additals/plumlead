import React from 'react';
import { Award, Users, BarChart3, TrendingUp } from 'lucide-react';

export default function Stats() {
  const logos = [
    { name: 'Rapid Rooter', desc: 'Phoenix' },
    { name: 'BluePipe Co.', desc: 'Tampa' },
    { name: 'Mainline Plumbing', desc: 'Denver' },
    { name: 'Drain Doctors', desc: 'Chicago' },
    { name: 'Apex Plumb', desc: 'Houston' },
    { name: 'City Flow', desc: 'Atlanta' },
  ];

  const statItems = [
    {
      value: '$42M+',
      label: 'Client revenue generated',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      subtext: 'Directly tracked via CRM'
    },
    {
      value: '180+',
      label: 'Plumbing companies served',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      subtext: 'Across North America'
    },
    {
      value: '11.4x',
      label: 'Average return on ad spend',
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      subtext: 'Industry-leading ROAS'
    },
    {
      value: '27 days',
      label: 'Avg. time to first booked job',
      icon: <Award className="w-5 h-5 text-blue-600" />,
      subtext: 'Fast deployment setup'
    },
  ];

  return (
    <section id="stats-section" className="bg-white border-y border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logos Cloud Header */}
        <div className="text-center space-y-8">
          <p className="text-[11px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase">
            Trusted by 180+ plumbing companies across North America
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 sm:gap-8 items-center justify-center opacity-80 hover:opacity-100 transition-opacity">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-200/60 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500/20 group-hover:bg-blue-600/30 transition-colors" />
                  <span className="text-sm font-extrabold text-slate-700 tracking-tight font-sans">
                    {logo.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                  {logo.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-20 pt-8 border-t border-slate-100">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="text-center space-y-2.5 group hover:scale-[1.01] transition-transform"
              id={`stat-card-${index}`}
            >
              <div className="mx-auto w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </h3>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-bold text-slate-700 leading-snug">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {item.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
