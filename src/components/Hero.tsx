import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle, TrendingUp, Users, PhoneCall, Award } from 'lucide-react';
import { motion } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const [selectedCall, setSelectedCall] = React.useState({ name: 'Dave S. (Phoenix)', detail: 'Emergency Leak repair booked!' });
  const [selectedROAS, setSelectedROAS] = React.useState('11.4x Avg');
  const [selectedGrowth, setSelectedGrowth] = React.useState('+312%');

  React.useEffect(() => {
    const calls = [
      { name: 'Dave S. (Phoenix)', detail: 'Emergency Leak repair booked!' },
      { name: 'Robert K. (Dallas)', detail: 'Tankless Water Heater Upgrade booked!' },
      { name: 'Linda M. (Tampa)', detail: 'Main Sewer Line Clear booked!' },
      { name: 'Michael G. (Denver)', detail: 'Commercial Pipe Leak Repair booked!' },
      { name: 'Patricia R. (Charlotte)', detail: 'Whole-house Repiping booked!' },
      { name: 'Steven T. (Chicago)', detail: 'Sump Pump Emergency installation booked!' },
      { name: 'Amanda J. (Miami)', detail: 'Emergency Burst Pipe fix booked!' },
      { name: 'James P. (Atlanta)', detail: 'Hydro-jetting Drain Service booked!' },
      { name: 'Charles W. (Austin)', detail: 'Slab Leak Detection & repair booked!' },
      { name: 'Thomas H. (Las Vegas)', detail: 'Commercial Drain Snaking booked!' },
      { name: 'Sarah E. (Orlando)', detail: 'Emergency Backflow Prevention test booked!' },
    ];
    const roasOptions = ['11.4x Avg', '10.8x Avg', '12.1x Avg', '9.8x Avg', '13.2x Avg', '11.9x Avg', '10.5x Avg', '14.1x Avg'];
    const growthOptions = ['+312%', '+284%', '+345%', '+290%', '+368%', '+327%', '+305%', '+385%'];

    const randomCall = calls[Math.floor(Math.random() * calls.length)];
    const randomRoas = roasOptions[Math.floor(Math.random() * roasOptions.length)];
    const randomGrowth = growthOptions[Math.floor(Math.random() * growthOptions.length)];

    setSelectedCall(randomCall);
    setSelectedROAS(randomRoas);
    setSelectedGrowth(randomGrowth);
  }, []);

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
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 md:space-y-8 text-left"
          >
            {/* Exclusive badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Built exclusively for plumbing & HVAC companies
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
              Performance marketing built exclusively for plumbing & HVAC companies. Google Ads, Local SEO, and an automated follow-up system that turns raw calls into high-ticket revenue — not just vanity clicks.
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
          </motion.div>

          {/* Right Column - Premium Branded Fleet & Live Telemetry Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              
              {/* Primary: Beautiful Real-World Fleet Image Card */}
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-3 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
                <div className="relative aspect-[4/3] w-full bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="/src/assets/images/plumbing_hero_1782942874276.jpg"
                    alt="PlumLead Branded Plumbing Dispatch Fleet"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette/gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </div>
              </div>

              {/* Floating Element 1: Digital Dashboard Overlap (Bottom Right) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-4 max-w-[280px] text-left space-y-3 transform rotate-1 hover:rotate-0 transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Campaign ROAS</p>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium"><AnimatedCounter value={selectedROAS} /></span>
                </div>
                {/* Small SVG graph */}
                <div className="h-16 w-full pt-1">
                  <svg className="w-full h-full" viewBox="0 0 150 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 45 Q 25 40, 40 30 T 75 20 T 110 10 T 150 5 L 150 50 L 0 50 Z"
                      fill="url(#miniGrad)"
                    />
                    <path
                      d="M 0 45 Q 25 40, 40 30 T 75 20 T 110 10 T 150 5"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="150" cy="5" r="3" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-[10px] pt-1">
                  <span className="text-slate-400">Revenue Growth</span>
                  <span className="text-emerald-400 font-extrabold"><AnimatedCounter value={selectedGrowth} /></span>
                </div>
              </motion.div>

              {/* Floating Element 2: Dispatched Calls Overlap (Top Left) */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-10 -left-4 md:-left-8 bg-white border border-slate-100 rounded-2xl shadow-xl p-3.5 max-w-[240px] text-left space-y-2 transform -rotate-2 hover:rotate-0 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Dispatched Call</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] text-blue-600 font-bold shrink-0">
                    {selectedCall.name ? selectedCall.name[0] : 'D'}
                  </div>
                  <div className="text-xs">
                    <p className="font-extrabold text-slate-800">{selectedCall.name}</p>
                    <p className="text-[10px] text-slate-400">{selectedCall.detail}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
