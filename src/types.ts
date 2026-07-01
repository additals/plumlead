export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  goals: string;
  status: 'new' | 'contacted' | 'scheduled' | 'archived';
  timestamp: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  location: string;
  quote: string;
  stats: {
    label: string;
    value: string;
  }[];
  badgeText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface IntegrationSettings {
  calendlyUrl: string;
  notificationEmail: string;
  sendMethod: 'local' | 'resend' | 'smtp' | 'webhook';
  resendApiKey?: string;
  smtpHost?: string;
  smtpPort?: string;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom?: string;
  webhookUrl?: string;
}
