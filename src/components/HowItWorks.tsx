import React from 'react';
import { Calendar, Rocket, PhoneCall, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Book a Call',
      description: 'A focused 30-minute strategy session to review your current website, map your territory potential, and identify quick-win keyword opportunities.',
      icon: <Calendar className="w-5 h-5 text-blue-400" />
    },
    {
      number: '02',
      title: 'Launch Campaigns',
      description: 'We build, write, and launch customized high-converting Google Ads campaigns, activate targeted Local SEO protocols, and implement full call-tracking in 14 days.',
      icon: <Rocket className="w-5 h-5 text-teal-400" />
    },
    {
      number: '03',
      title: 'Generate Qualified Calls',
      description: 'Your phones start ringing with high-ticket plumbing jobs (like trenchless sewer lines, boiler repairs, emergency service) from local home and building owners.',
      icon: <PhoneCall className="w-5 h-5 text-indigo-400" />
    },
    {
      number: '04',
      title: 'Turn Calls into Booked Jobs',
      description: 'We plug our rapid SMS/text-back automation and booking support scripts directly into your dispatching suite so no outbound inquiry slips through.',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
    },
    {
      number: '05',
      title: 'Scale Revenue',
      description: 'We continually refine the winning channels, increase budget strictly based on positive ROI, and systematically dominate your competitors.',
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="how-it-works" className="bg-slate-950 text-white py-24 relative overflow-hidden">
      {/* Decorative dark glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-20"
        >
          <span className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            From first call to scaled revenue
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We don’t do complicated onboarding. We focus strictly on deploying a high-speed plumbing booking system that begins generating cash in weeks, not quarters.
          </p>
        </motion.div>

        {/* Timeline Horizontal / Vertical Grid */}
        <div className="grid md:grid-cols-5 gap-6 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-blue-500/30 via-teal-500/30 to-amber-500/30 -z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 relative flex flex-col justify-between hover:border-slate-700/80 hover:bg-slate-900 transition-all duration-300 group z-10 text-left"
              id={`step-card-${step.number}`}
            >
              <div className="space-y-4">
                {/* Step Header with Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-blue-500 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-9 h-9 bg-slate-850 rounded-xl flex items-center justify-center border border-slate-800">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator footer dot */}
              <div className="pt-4 flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${
                  idx === 0 ? 'bg-blue-400' :
                  idx === 1 ? 'bg-teal-400' :
                  idx === 2 ? 'bg-indigo-400' :
                  idx === 3 ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  Phase {idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
