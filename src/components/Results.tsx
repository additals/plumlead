import React from 'react';
import { PhoneCall, BarChart3, TrendingUp, Users, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import AnimatedCounter from './AnimatedCounter';

export default function Results() {
  const resultStats = [
    {
      value: '1,240+',
      label: 'Qualified calls / mo',
      sub: 'Avg client dispatch volume',
      icon: <PhoneCall className="w-5 h-5 text-blue-600" />
    },
    {
      value: '11.4x',
      label: 'Return on ad spend',
      sub: 'Tracked strictly in dashboard',
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />
    },
    {
      value: '+312%',
      label: 'Booked jobs in 90 days',
      sub: 'Post-onboarding benchmark',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />
    },
    {
      value: '94%',
      label: 'Client retention rate',
      sub: 'Month-to-month contracts',
      icon: <Users className="w-5 h-5 text-blue-600" />
    }
  ];

  const caseStudies = [
    {
      company: 'Rapid Rooter',
      location: 'Phoenix, AZ',
      quote: '"Went from 40 to 180 booked jobs/mo in 4 months. We literally had to order two new trucks to handle the volume of dispatched emergency calls in our territory."',
      stats: [
        { label: 'Booked jobs growth', value: '+350%' },
        { label: 'Avg monthly spend', value: '$8k/mo' }
      ],
      badge: 'Residential focus',
      badgeColor: 'text-emerald-700 bg-emerald-50'
    },
    {
      company: 'BluePipe Co.',
      location: 'Tampa, FL',
      quote: '"Finally a marketing agency that actually speaks plumber. They integrated with our ServiceTitan flow seamlessly. We instantly knew which ad generated each dispatch."',
      stats: [
        { label: 'Added revenue tracked', value: '$1.2M+' },
        { label: 'Verified ROAS', value: '9.8x' }
      ],
      badge: 'Full-service plumbing',
      badgeColor: 'text-blue-700 bg-blue-50'
    },
    {
      company: 'Mainline Plumbing',
      location: 'Denver, CO',
      quote: '"We had to hire 3 more techs within the first two months just to keep up with the volume. No garbage clicks, just highly motivated emergency callers looking to book."',
      stats: [
        { label: 'Call volume spike', value: '+220%' },
        { label: 'Ramp-up time', value: '27 days' }
      ],
      badge: 'Commercial & Emergency',
      badgeColor: 'text-indigo-700 bg-indigo-50'
    }
  ];

  return (
    <section id="results" className="bg-slate-50/50 py-20 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Numbers that ring the phone
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We hold ourselves accountable to the metrics that matter. Here is how we grow local plumbing firms into market leaders.
          </p>
        </motion.div>

        {/* Top 4-Column Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resultStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
              id={`result-stat-${idx}`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                {stat.icon}
              </div>
              <div className="text-left space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Studies Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-left space-y-2 mb-8"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            Live territory success stories
          </h3>
          <p className="text-sm text-slate-500">
            Real plumbers. Real revenue. Fully verified dispatch metrics.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-blue-500/10 transition-all duration-300 relative group overflow-hidden"
              id={`case-study-card-${idx}`}
            >
              {/* Highlight bar top */}
              <div className="h-1.5 w-full bg-blue-600" />

              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${study.badgeColor}`}>
                    {study.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold uppercase">Verified Case Study</span>
                </div>

                <div className="space-y-1.5 text-left">
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-950">
                    {study.company}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 font-mono">
                    {study.location}
                  </p>
                </div>

                {/* Quote block */}
                <p className="text-sm italic text-slate-600 leading-relaxed text-left border-l-2 border-blue-500/40 pl-3.5">
                  {study.quote}
                </p>
              </div>

              {/* Stats Footer Grid */}
              <div className="bg-slate-50 border-t border-slate-100 p-6 grid grid-cols-2 gap-4">
                {study.stats.map((s, sIdx) => (
                  <div key={sIdx} className="text-left space-y-0.5">
                    <p className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wide">
                      {s.label}
                    </p>
                    <p className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                      <AnimatedCounter value={s.value} />
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
