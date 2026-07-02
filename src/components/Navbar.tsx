import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, Settings } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Results', id: 'results' },
    { name: 'About', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => onScrollToSection('home')}>
            <Logo className="w-10 h-10 shadow-md shadow-blue-500/20" />
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Plum<span className="text-blue-600">Lead</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollToSection(item.id)}
                className="text-slate-600 hover:text-blue-600 font-medium text-[15px] transition-colors cursor-pointer"
                id={`nav-link-${item.id}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              id="nav-cta-btn"
              onClick={() => onScrollToSection('contact')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg shadow-blue-500/15 gap-1.5 cursor-pointer"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-b border-gray-100 shadow-xl px-4 pt-2 pb-6 space-y-2 absolute top-full left-0 right-0 animate-in fade-in slide-in-from-top-5 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onScrollToSection(item.id);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium text-[16px] transition-colors"
              id={`mobile-nav-link-${item.id}`}
            >
              {item.name}
            </button>
          ))}
          <div className="pt-4 px-4">
            <button
              id="mobile-nav-cta-btn"
              onClick={() => {
                onScrollToSection('contact');
                setIsOpen(false);
              }}
              className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/15 gap-2"
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
