import React from 'react';
import { Search, MapPin, Laptop, PhoneCall, MessageSquare, Award, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Services({ onScrollToSection }: ServicesProps) {
  const servicesList = [
    {
      id: 'google-ads',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: 'Google Ads',
      description: 'Conversion-tuned search campaigns built around urgent plumbing intent—like active burst pipes, backed up sewers, and broken water heaters.'
    },
    {
      id: 'local-seo',
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: 'Local SEO',
      description: 'Rank in the local Map Pack and dominate search results in the specific high-value neighborhoods and service areas where your trucks actually travel.'
    },
    {
      id: 'gbp-opt',
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'GBP Optimization',
      description: 'A weaponized Google Business Profile setup that maximizes reviews, builds trust instantly, and turns local searchers into direct outbound phone calls.'
    },
    {
      id: 'web-design',
      icon: <Laptop className="w-6 h-6 text-blue-600" />,
      title: 'Website Design',
      description: 'Blazing-fast, mobile-first sites built with simple touch-to-call booking buttons. Engineered to convert standard web visitors into booked plumber tickets.'
    },
    {
      id: 'call-tracking',
      icon: <PhoneCall className="w-6 h-6 text-blue-600" />,
      title: 'Call Tracking',
      description: 'Listen to call recordings, track exact source attribution, and map which marketing campaigns drive high-margin jobs, actual dispatches, and cold cash.'
    },
    {
      id: 'crm-automation',
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: 'CRM & Follow-Up',
      description: 'Automated SMS, missed call text-back, and email nurture loops that instantly catch cold prospects and close bookings before they click to call competitors.'
    }
  ];

  return (
    <section id="services" className="bg-white py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A complete growth engine for plumbers
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every marketing channel we operate is fully dialed in for one industry and one industry only. No generic campaigns, no juggling 12 different niches.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-5 text-left shadow-sm hover:shadow-xl hover:border-blue-500/20 hover:scale-[1.02] transition-all duration-300 group relative flex flex-col justify-between"
              id={`service-card-${service.id}`}
            >
              <div className="space-y-4">
                {/* Icon box */}
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <div className="group-hover:scale-110 transition-transform text-blue-600 group-hover:text-white">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action Indicator */}
              <div className="pt-4 flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity gap-1 cursor-pointer" onClick={() => onScrollToSection('contact')}>
                <span>Request details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner callout */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h4 className="font-bold text-slate-950 text-base sm:text-lg">Need a customized marketing blueprint for your plumbing territory?</h4>
            <p className="text-xs sm:text-sm text-slate-500">We will analyze your competitors, local keyword volume, and estimate your monthly booked jobs.</p>
          </div>
          <button
            onClick={() => onScrollToSection('contact')}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:bg-blue-800 transition-all cursor-pointer"
          >
            Claim Your Free Territory Analysis
          </button>
        </div>

      </div>
    </section>
  );
}
