import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle, TrendingUp, Users, PhoneCall, Award } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  // Sample dynamic metrics for the mock dashboard
  const activeLeads = [
    { name: 'Dave S. (Phoenix)', type: 'Emergency Water Heater replacement', value: '$2,850', time: '10m ago' },
    { name: 'Robert K. (Dallas)', type: 'Main Sewer Line Clear', value: '$1,200', time: '1h ago' },
    { name: 'Linda M. (Tampa)', type: 'Commercial Pipe Leak Repair', value: '$4,100', time: '3h ago' },
  ];

  return (
    <section
      id="home"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white"
    >
      {/* Background abstract decoration elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-sky-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Headline & Pitch */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            {/* Exclusive badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Built exclusively for plumbing companies
            </div>

            {/* Main Headings */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              We don't sell clicks. <br />
              <span className="text-blue-600 relative inline-block">
                We generate <span className="underline decoration-blue-600/30 underline-offset-4">booked jobs.</span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Performance marketing built exclusively for plumbing companies. Google Ads, Local SEO, and an automated follow-up system that turns raw calls into high-ticket revenue — not just vanity clicks.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => onScrollToSection('contact')}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.01] transition-all gap-2 cursor-pointer"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                id="hero-secondary-cta"
                onClick={() => onScrollToSection('contact')}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Get a Free Growth Audit
              </button>
            </div>

            {/* Core guarantees */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-500 text-sm font-medium pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>ROI-tracked reporting</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Dashboard Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              
              {/* Dashboard Container with Browser Frame */}
              <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                {/* Browser top-bar */}
                <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">plumlead-client-portal.app</span>
                  <div className="w-10" />
                </div>

                {/* Dashboard Inner */}
                <div className="p-5 space-y-4 text-slate-100">
                  
                  {/* Top Stats Cards Group */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Calls</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-lg font-bold text-white">184</span>
                        <span className="text-[9px] text-emerald-400 font-semibold">+22%</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Booked Jobs</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-lg font-bold text-blue-400">114</span>
                        <span className="text-[9px] text-emerald-400 font-semibold">+35%</span>
                      </div>
                    </div>
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Ad ROAS</p>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-lg font-bold text-emerald-400">11.4x</span>
                        <span className="text-[9px] text-slate-400">Avg</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Line Chart representing Conversion growth */}
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-300">Revenue From Marketing Campaigns</p>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">Live Feed</span>
                    </div>
                    
                    {/* Beautiful SVG graph */}
                    <div className="h-28 w-full pt-1">
                      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="#334155" strokeWidth="0.5" strokeDasharray="4" />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="4" />
                        <line x1="0" y1="80" x2="300" y2="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="4" />
                        
                        {/* Area path */}
                        <path
                          d="M 0 90 Q 50 85, 80 65 T 150 45 T 220 25 T 300 10 L 300 100 L 0 100 Z"
                          fill="url(#chartGrad)"
                        />
                        {/* Line path */}
                        <path
                          d="M 0 90 Q 50 85, 80 65 T 150 45 T 220 25 T 300 10"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Dynamic dots */}
                        <circle cx="80" cy="65" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                        <circle cx="220" cy="25" r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                        <circle cx="300" cy="10" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono pt-1">
                      <span>Month 1</span>
                      <span>Month 2</span>
                      <span>Month 3 (PlumLead Active)</span>
                    </div>
                  </div>

                  {/* Active Job Leads Feed */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recent Dispatched Calls</p>
                    <div className="space-y-1.5">
                      {activeLeads.map((lead, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/50 hover:bg-slate-950/80 px-3 py-2.5 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs transition-all"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold">
                              {lead.name[0]}
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-slate-200">{lead.name}</p>
                              <p className="text-[10px] text-slate-400 line-clamp-1">{lead.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-400">{lead.value}</p>
                            <p className="text-[9px] text-slate-500">{lead.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* +312% Float Capsule Widget */}
              <div className="absolute -bottom-6 -left-6 md:-left-8 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex items-center gap-3.5 transform -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-[240px]">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="text-xl font-black text-slate-900 leading-none tracking-tight block">
                    +312%
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                    Booked Jobs In 90 Days
                  </span>
                </div>
              </div>

              {/* Verification/Rating float badge */}
              <div className="absolute -top-6 -right-6 bg-white border border-slate-100 rounded-2xl shadow-xl p-3 flex items-center gap-2.5 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex text-amber-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <div className="text-[10px] font-bold text-slate-700 tracking-tight uppercase">
                  4.9 Rating (180+ Plumbers)
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
