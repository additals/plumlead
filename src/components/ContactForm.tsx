import React, { useState } from 'react';
import { CheckCircle2, CalendarDays, ArrowRight, Loader2, Award, Phone, Compass } from 'lucide-react';
import { Lead, IntegrationSettings } from '../types';
import { motion } from 'motion/react';

interface ContactFormProps {
  onLeadSubmitted: (lead: Lead) => void;
  settings: IntegrationSettings;
}

const getCalendlyRedirectUrl = (lead: Lead, settings: IntegrationSettings) => {
  const baseUrl = settings.calendlyUrl || 'https://calendly.com/plumlead-strategy/30min';
  const cleanBase = baseUrl.trim().replace(/\/$/, '');
  
  const params = new URLSearchParams();
  params.append('name', lead.name);
  params.append('email', lead.email);
  params.append('phone', lead.phone);
  params.append('phone_number', lead.phone);
  params.append('a1', lead.phone); // commonly custom field 1
  if (lead.company && lead.company !== 'Not specified') {
    params.append('company', lead.company);
    params.append('a2', lead.company); // commonly custom field 2
  }
  if (lead.goals && lead.goals !== 'Grow plumbing business revenue') {
    params.append('goals', lead.goals);
    params.append('a3', lead.goals); // commonly custom field 3
  }
  
  return `${cleanBase}?${params.toString()}`;
};

export default function ContactForm({ onLeadSubmitted, settings }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    goals: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newLead: Lead = {
        id: 'lead_' + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Not specified',
        goals: formData.goals || 'Grow plumbing business revenue',
        status: 'new',
        timestamp: new Date().toLocaleString(),
      };

      // Call the server to dispatch custom email notifications / webhooks
      try {
        const response = await fetch('/api/send-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lead: newLead,
            settings: settings,
          }),
        });
        const responseData = await response.json();
        console.log('[PlumLead Client] Lead dispatch result:', responseData);
      } catch (srvErr) {
        console.error('[PlumLead Client] Server delivery failed, falling back to local simulation:', srvErr);
      }

      // Retrieve existing from localStorage
      const existingLeads: Lead[] = JSON.parse(localStorage.getItem('plumlead_leads') || '[]');
      localStorage.setItem('plumlead_leads', JSON.stringify([newLead, ...existingLeads]));

      // Call parent update
      onLeadSubmitted(newLead);
      setSubmittedLead(newLead);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        goals: '',
      });

      // No longer redirecting to Calendly - showing success state directly
      setCountdown(null);

    } catch (err) {
      console.error('[PlumLead Client] Submit sequence exception:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Solid Blue Info Box */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-blue-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-600/10"
          >
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl -z-10 opacity-30" />
            
            <div className="space-y-6 sm:space-y-8 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold tracking-wider uppercase border border-blue-400/20">
                <CalendarDays className="w-4 h-4" />
                Free Strategy Call
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Ready to fill your schedule with booked jobs?
              </h2>
              
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Book a free 30-minute strategy call with a plumber-marketing specialist. We’ll audit your current ad setup, estimate local keyword search volume, and map out a concrete booking roadmap for your exact territory.
              </p>

              {/* Bullet checklist */}
              <div className="space-y-4 pt-4 border-t border-blue-500/50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Free territory ad-leak audit included</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Zero-obligation industry breakdown</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Flexible month-to-month contracts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span className="font-medium text-sm sm:text-base">Guaranteed callback within 1 business day</span>
                </div>
              </div>
            </div>

            {/* Support guarantee badge at bottom */}
            <div className="mt-12 pt-8 border-t border-blue-500/30 flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">100% Industry Exclusive</p>
                <p className="text-xs text-blue-100">Once you book your territory, we block out your competitors.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Lead Capture Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-10 relative flex flex-col justify-center"
          >
            
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-left" id="lead-booking-form">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Book your free strategy call
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Complete the fields below to verify if your territory is still open.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-500/25 bg-rose-50/20'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/25'
                      }`}
                      id="input-name"
                    />
                    {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@eliteplumbing.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-500/25 bg-rose-50/20'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/25'
                      }`}
                      id="input-email"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 font-bold">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-rose-500/25 bg-rose-50/20'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/25'
                      }`}
                      id="input-phone"
                    />
                    {errors.phone && <p className="text-xs text-rose-500 font-bold">{errors.phone}</p>}
                  </div>

                  {/* Company name field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Elite Plumbing Services"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all"
                      id="input-company"
                    />
                  </div>
                </div>

                {/* Goals text area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tell Us About Your Goals
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="How many trucks do you have? What is your monthly revenue goal? Tell us what you want to achieve."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all resize-none"
                    id="input-goals"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-booking-btn"
                  className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 transition-all shadow-lg shadow-blue-500/20 gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Securing Your Slot...
                    </>
                  ) : (
                    <>
                      Book My Free Call
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  We respect your privacy. No sales spam, ever.
                </p>
              </form>
            ) : (
              /* Success State Card */
              <div className="space-y-8 py-6 text-center animate-in fade-in zoom-in-95 duration-300" id="submission-success-card">
                <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    🎉 Request Confirmed!
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you, <strong className="text-slate-800 font-extrabold">{submittedLead?.name}</strong>. Your details have been received. To schedule your strategy call, our team will be in touch shortly!
                  </p>
                </div>

                {/* Dynamic Notification Delivery Alert */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 max-w-md mx-auto text-left space-y-2 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 text-blue-800 font-extrabold text-xs uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    Security Logging Confirmed
                  </div>
                  <p className="text-xs text-blue-700 leading-relaxed font-medium">
                    This request has been securely dispatched to the PlumLead database registry for immediate review.
                  </p>
                </div>

                {/* Simulated Appointment Confirmation Details */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 max-w-md mx-auto text-left space-y-4 shadow-inner">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Acquisition Specialist Assigned</p>
                      <p className="text-sm font-bold text-slate-800">Reviewing: {submittedLead?.company}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs text-slate-500 leading-relaxed">
                    <p>
                      <strong>Lead alerts routed securely:</strong> A comprehensive territory ad-leak report is being generated and will be sent to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 font-bold text-slate-700">
                      <li>Call: {submittedLead?.phone}</li>
                      <li>Email: {submittedLead?.email}</li>
                    </ul>
                  </div>
                </div>

                {/* Reset button to submit again */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    id="reset-form-btn"
                  >
                    Submit Another Lead
                  </button>
                </div>
              </div>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
}
