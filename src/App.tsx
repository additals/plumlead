import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HardTruth from './components/HardTruth';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import PasswordModal from './components/PasswordModal';
import { Lead, IntegrationSettings } from './types';

const defaultSettings: IntegrationSettings = {
  calendlyUrl: 'https://calendly.com/plumlead-strategy/30min',
  notificationEmail: 'abdullah@plumlead.com',
  sendMethod: 'local',
  resendApiKey: '',
  smtpHost: 'smtp.gmail.com',
  smtpPort: '587',
  smtpUser: '',
  smtpPass: '',
  smtpFrom: 'leads@plumlead.com',
  webhookUrl: '',
};

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [settings, setSettings] = useState<IntegrationSettings>(() => {
    const saved = localStorage.getItem('plumlead_integration_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Seamlessly migrate old default email addresses to the new requested one
        if (
          parsed.notificationEmail === 'metromarketingagency.hr@gmail.com' ||
          parsed.notificationEmail === 'digitalabdullah07@gmail.com'
        ) {
          parsed.notificationEmail = 'abdullah@plumlead.com';
        }
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    }
    return defaultSettings;
  });

  const handleUpdateSettings = (newSettings: IntegrationSettings) => {
    setSettings(newSettings);
    localStorage.setItem('plumlead_integration_settings', JSON.stringify(newSettings));
  };

  // Auto-seed some beautiful high-fidelity plumbing leads on initial mount if localstorage is empty
  useEffect(() => {
    const savedLeads = localStorage.getItem('plumlead_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        console.error('Error parsing saved leads', e);
      }
    } else {
      const demoLeads: Lead[] = [
        {
          id: 'lead_demo1',
          name: 'Marcus Henderson',
          email: 'marcus@rootersolutions.com',
          phone: '(480) 555-0142',
          company: 'Rooter Solutions LLC (Phoenix)',
          goals: 'Need 40 more dispatch calls per month in Phoenix East Valley. Currently spending $4k on Ads but getting low conversion. Looking to stop click waste.',
          status: 'scheduled',
          timestamp: '6/30/2026, 9:15 AM',
        },
        {
          id: 'lead_demo2',
          name: 'Sarah Jenkins',
          email: 'sjenkins@sewerpro.com',
          phone: '(813) 555-0198',
          company: 'Sewer Pro Tampa (Tampa)',
          goals: 'Looking to capture high-margin trenchless sewer line replacement leads. Our current generalist agency keeps delivering basic drain snaking clicks instead.',
          status: 'new',
          timestamp: '6/30/2026, 12:44 PM',
        },
        {
          id: 'lead_demo3',
          name: 'Arthur Pendelton',
          email: 'arthur@mainlinedrain.com',
          phone: '(303) 555-0211',
          company: 'Mainline Drain Services (Denver)',
          goals: 'Want to dominate local map pack keyword results in North Denver. Website is outdated and does not have click-to-call mobile buttons.',
          status: 'contacted',
          timestamp: '6/30/2026, 3:30 PM',
        }
      ];
      localStorage.setItem('plumlead_leads', JSON.stringify(demoLeads));
      setLeads(demoLeads);
    }
  }, []);

  // Update lead list
  const handleLeadSubmitted = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  // Update status in CRM
  const handleUpdateStatus = (id: string, status: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    localStorage.setItem('plumlead_leads', JSON.stringify(updated));
  };

  // Delete lead in CRM
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem('plumlead_leads', JSON.stringify(updated));
  };

  // Clear all leads in CRM
  const handleClearAllLeads = () => {
    if (window.confirm('Are you sure you want to delete all lead records?')) {
      setLeads([]);
      localStorage.removeItem('plumlead_leads');
    }
  };

  // Refill demo leads in CRM
  const handleAddSampleLeads = () => {
    const demoLeads: Lead[] = [
      {
        id: 'lead_demo_' + Math.random().toString(36).substr(2, 5),
        name: 'James Carter',
        email: 'j.carter@carterplumbing.com',
        phone: '(602) 555-0312',
        company: 'Carter Plumbing & Air (Phoenix)',
        goals: 'Need emergency water heater replacement dispatch jobs to hit summer volume target.',
        status: 'new',
        timestamp: new Date().toLocaleString(),
      },
      {
        id: 'lead_demo_' + Math.random().toString(36).substr(2, 5),
        name: 'Rebecca Vance',
        email: 'rebecca@vancedrains.com',
        phone: '(727) 555-0817',
        company: 'Vance Drain Cleaning (Tampa)',
        goals: 'Looking to transition from subcontractor to booking our own direct residential clients.',
        status: 'contacted',
        timestamp: new Date().toLocaleString(),
      }
    ];

    const updated = [...demoLeads, ...leads];
    setLeads(updated);
    localStorage.setItem('plumlead_leads', JSON.stringify(updated));
  };

  // Smooth scroll helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset navbar height
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Navbar Header */}
      <Navbar
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Dynamic Partner & Stats Section */}
        <Stats />

        {/* Contrast Grid Comparison */}
        <HardTruth />

        {/* Specialized Services Bento */}
        <Services onScrollToSection={handleScrollToSection} />

        {/* Process Timeline Section (Dark Theme) */}
        <HowItWorks />

        {/* High Impact Results & Case Studies */}
        <Results />

        {/* Stars Reviews / Testimonials */}
        <Testimonials />

        {/* Accordion Q&A list */}
        <FAQ />

        {/* Strategy Booking Form & Split Column benefits */}
        <ContactForm onLeadSubmitted={handleLeadSubmitted} settings={settings} />
      </main>

      {/* Footer Navigation */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => setIsPasswordModalOpen(true)}
      />

      {/* Leads Log Password Security Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => setIsAdminOpen(true)}
      />

      {/* Leads Management Admin CRM Drawer */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateStatus}
        onDeleteLead={handleDeleteLead}
        onClearAllLeads={handleClearAllLeads}
        onAddSampleLeads={handleAddSampleLeads}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
