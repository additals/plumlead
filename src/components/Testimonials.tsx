import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote: "I've burned cash with 4 generalist agencies in the past. PlumLead is the first one that actually moved the needle. Our booked jobs nearly tripled in 90 days and we are booking work out weeks in advance.",
      author: "Mike Reynolds",
      role: "Owner, Rapid Rooter",
      initials: "MR",
      color: "bg-blue-600",
      rating: 5
    },
    {
      id: 2,
      quote: "They get plumbing. The campaigns convert, the CRM reports are completely transparent, and they never push fluff. Just real, qualified emergency calls and replacement jobs every single week.",
      author: "Sandra Lopez",
      role: "GM, BluePipe Co.",
      initials: "SL",
      color: "bg-emerald-600",
      rating: 5
    },
    {
      id: 3,
      quote: "We had to hire 3 more technicians within the first few weeks just to keep up with the volume of calls. Absolutely stellar results. Best marketing partner we have ever dealt with.",
      author: "Derrick Hall",
      role: "Founder, Mainline Plumbing",
      initials: "DH",
      color: "bg-indigo-600",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="bg-white py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
            What Clients Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plumbing owners who stopped guessing
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            See how real local business owners scaled their operations, cleared out scheduling gaps, and built predictable revenue pipelines.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/60 rounded-2xl border border-slate-100/80 p-6 sm:p-8 flex flex-col justify-between hover:bg-slate-50 hover:border-slate-200 hover:scale-[1.01] transition-all duration-300"
              id={`testimonial-card-${review.id}`}
            >
              <div className="space-y-6">
                {/* Star rating */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-left font-medium">
                  {review.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-200/40">
                <div className={`w-10 h-10 ${review.color} rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-slate-900/5`}>
                  {review.initials}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {review.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
