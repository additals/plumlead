import React from 'react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onScrollToSection, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-900">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onScrollToSection('home')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                id="footer-brand-svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Plum<span className="text-blue-500">Lead</span>
            </span>
          </div>

          {/* Links Center */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <button
              onClick={() => onScrollToSection('home')}
              className="hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onScrollToSection('services')}
              className="hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => onScrollToSection('results')}
              className="hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Results
            </button>
            <button
              onClick={() => onScrollToSection('about')}
              className="hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => onScrollToSection('faq')}
              className="hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => onScrollToSection('contact')}
              className="hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer shadow-sm"
              id="footer-leads-log-btn"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Leads Log & Setup
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p className="font-medium text-left">
            &copy; {currentYear} PlumLead. Built exclusively for plumbing & HVAC companies.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
