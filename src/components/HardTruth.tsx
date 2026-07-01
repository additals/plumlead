import React from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function HardTruth() {
  const points = [
    {
      id: 1,
      badTag: 'WHAT MOST AGENCIES DO',
      badTitle: 'Chasing impressions & clicks',
      goodTag: 'WHAT WE DO',
      goodTitle: 'We measure booked jobs and revenue',
      description: 'We integrate with your dispatch software (ServiceTitan, Housecall Pro, etc.) to trace every single dollar back to the campaign that generated it.'
    },
    {
      id: 2,
      badTag: 'WHAT MOST AGENCIES DO',
      badTitle: 'Generic agency playbooks',
      goodTag: 'WHAT WE DO',
      goodTitle: 'Strategy built only for plumbing',
      description: 'We don’t market for dental offices or florists. Every bidding strategy, ad copy, and search keyword we use is engineered specifically for local plumbing and HVAC.'
    },
    {
      id: 3,
      badTag: 'WHAT MOST AGENCIES DO',
      badTitle: 'Leads disappear into the void',
      goodTag: 'WHAT WE DO',
      goodTitle: 'Automated follow-up closes the loop',
      description: 'A lead that waits 15 minutes is a lost job. Our automated platform instantly texts and emails new inquiries within 45 seconds to secure the booking.'
    }
  ];

  return (
    <section id="about" className="bg-slate-50/40 py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            The Hard Truth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why most plumbing marketing fails
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Clicks don't pay your technicians or buy trucks. Booked jobs do. Most generalist marketing agencies optimize for vanity metrics that look great on a monthly PDF report — but never make your phone ring.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point) => (
            <div
              key={point.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-200 transition-all duration-300"
              id={`truth-card-${point.id}`}
            >
              <div className="p-6 sm:p-8 space-y-8 flex-grow">
                {/* Bad Way */}
                <div className="space-y-3 relative pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-[11px] uppercase tracking-wider">
                    <X className="w-4 h-4 shrink-0" />
                    <span>{point.badTag}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-snug">
                    {point.badTitle}
                  </h4>
                </div>

                {/* Good Way */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-[11px] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{point.goodTag}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {point.goodTitle}
                  </h4>
                </div>
              </div>

              {/* Underlying explanation block */}
              <div className="bg-slate-50 px-6 py-5 border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {point.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
