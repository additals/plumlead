import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0); // First one open by default

  const faqItems = [
    {
      id: 0,
      question: "Do you only work with plumbing companies?",
      answer: "Yes, we specialize exclusively in the plumbing and HVAC industries. This extreme specialization allows us to deploy pre-built bidding strategies, negative keyword lists, high-converting ad copy, and fully tested landers that we already know produce booked jobs, eliminating the high costs of agency trial and error."
    },
    {
      id: 1,
      question: "How long until I see booked jobs?",
      answer: "Typically, Google Ads and call tracking systems go live within 14 days of onboarding. Once live, most plumbing companies receive their very first high-intent service calls within 24 to 48 hours of campaigns being activated."
    },
    {
      id: 2,
      question: "What is the recommended minimum ad spend?",
      answer: "We recommend a minimum budget of $2,500 per month in ad spend to ensure there is enough search volume and statistical data to optimize bidding algorithms effectively, keep your technicians consistently dispatched, and maximize ROI."
    },
    {
      id: 3,
      question: "Do you require long-term contracts?",
      answer: "No, we do not require any long-term commitments. All of our plumbing growth agreements are strictly month-to-month. We believe in earning your partnership every single month through transparent, tracked booked jobs rather than locking you in."
    },
    {
      id: 4,
      question: "How exactly do you measure success and ROI?",
      answer: "We integrate directly with major industry dispatch platforms like ServiceTitan, Housecall Pro, and FieldEdge. This allows our tracking systems to trace each phone call and contact form back to the specific Google search ad, showing you verified book value and real revenue generated, not just clicks."
    },
    {
      id: 5,
      question: "What if I already have a marketing team or generalist agency?",
      answer: "We frequently work alongside in-house marketing personnel or standard web design agencies. They handle organic social media, community branding, and physical truck wraps, while we operate as the specialized high-speed Google Ads and Local SEO booking engine to feed your pipeline."
    }
  ];

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-slate-50/30 py-20 border-b border-slate-100 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
        >
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Questions we hear a lot
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Everything you need to know about our specialized plumbing growth platform, contracts, and software integrations.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-blue-500 shadow-md ring-1 ring-blue-500/10'
                    : 'border-slate-100 hover:border-slate-300 shadow-sm'
                }`}
                id={`faq-item-${item.id}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none gap-4"
                  id={`faq-trigger-${item.id}`}
                >
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} />
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-50 text-slate-500 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[300px] border-t border-slate-100' : 'max-h-0'
                  }`}
                  id={`faq-answer-${item.id}`}
                >
                  <div className="p-6 text-xs sm:text-sm text-slate-600 leading-relaxed text-left">
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
