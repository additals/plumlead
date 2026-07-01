import React, { useState, useEffect } from 'react';
import { 
  X, Trash2, Filter, Search, ShieldAlert, CheckCircle, Mail, Phone, Calendar, 
  RefreshCw, FileSpreadsheet, PlusCircle, Database
} from 'lucide-react';
import { Lead, IntegrationSettings } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateStatus: (id: string, status: Lead['status']) => void;
  onDeleteLead: (id: string) => void;
  onClearAllLeads: () => void;
  onAddSampleLeads: () => void;
  settings: IntegrationSettings;
  onUpdateSettings: (settings: IntegrationSettings) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onDeleteLead,
  onClearAllLeads,
  onAddSampleLeads,
}: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter and search leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Goals', 'Status', 'Timestamp'];
    const rows = leads.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.goals.replace(/"/g, '""'),
      lead.status,
      lead.timestamp,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `plumlead_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl transform transition-all duration-500 bg-white shadow-2xl flex flex-col h-full border-l border-slate-100 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 pt-5 pb-4 bg-slate-50 border-b border-slate-100 flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    PlumLead Admin Portal
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Securely manage leads and review Growth Requirements
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-150 transition-all cursor-pointer"
                id="admin-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ACTIVE TAB CONTENT */}
          <div className="flex flex-col flex-grow min-h-0">
            {/* Filters Top Bar */}
            <div className="p-6 border-b border-slate-100 space-y-4 bg-white shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-grow text-left">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, company, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                    id="admin-search-input"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative shrink-0 text-left">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-white pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer font-bold text-slate-700"
                    id="admin-status-select"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">🔴 New Leads</option>
                    <option value="contacted">🟡 Contacted</option>
                    <option value="scheduled">🟢 Scheduled</option>
                    <option value="archived">⚪ Archived</option>
                  </select>
                  <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onAddSampleLeads}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    id="admin-add-sample-btn"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Load Demo Leads
                  </button>
                  {leads.length > 0 && (
                    <button
                      onClick={onClearAllLeads}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                      id="admin-clear-all-btn"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {leads.length > 0 && (
                  <button
                    onClick={exportToCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    id="admin-export-csv-btn"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    Export to CSV
                  </button>
                )}
              </div>
            </div>

            {/* Lead Cards List Container */}
            <div className="flex-grow overflow-y-auto p-6 bg-slate-50/50 space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-white text-slate-400 rounded-full flex items-center justify-center mb-4 border border-slate-200 border-dashed">
                    <ShieldAlert className="w-7 h-7 text-slate-300" />
                  </div>
                  <h3 className="text-base font-bold text-slate-700">No matching leads found</h3>
                  <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
                    Try submitting the strategy booking form on the webpage or click "Load Demo Leads" to seed leads instantly.
                  </p>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 relative group hover:shadow-md hover:border-slate-300 transition-all text-left"
                    id={`lead-card-${lead.id}`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900 tracking-tight">
                            {lead.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase bg-slate-150 px-2 py-0.5 rounded-full">
                            {lead.id}
                          </span>
                        </div>
                        <p className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                          🏢 {lead.company}
                        </p>
                      </div>

                      {/* Status Badge Select */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateStatus(lead.id, e.target.value as Lead['status'])}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer transition-all ${
                            lead.status === 'new' ? 'bg-rose-50 border-rose-200 text-rose-700 focus:ring-rose-200' :
                            lead.status === 'contacted' ? 'bg-amber-50 border-amber-200 text-amber-700 focus:ring-amber-200' :
                            lead.status === 'scheduled' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-emerald-200' :
                            'bg-slate-50 border-slate-200 text-slate-500 focus:ring-slate-200'
                          }`}
                          id={`select-status-${lead.id}`}
                        >
                          <option value="new">🔴 New Lead</option>
                          <option value="contacted">🟡 Contacted</option>
                          <option value="scheduled">🟢 Scheduled</option>
                          <option value="archived">⚪ Archived</option>
                        </select>
                      </div>
                    </div>

                    {/* Goals Box */}
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-150/70 text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      <span className="font-bold text-slate-800 block text-[10px] not-italic mb-1 uppercase tracking-widest">Growth Requirements:</span>
                      "{lead.goals}"
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-150/60 text-xs text-slate-500">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        {/* Copy Phone */}
                        <button
                          onClick={() => handleCopy(lead.phone, `${lead.id}-phone`)}
                          className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                          title="Copy Phone Number"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-mono font-medium">
                            {copiedId === `${lead.id}-phone` ? 'Copied!' : lead.phone}
                          </span>
                        </button>

                        {/* Copy Email */}
                        <button
                          onClick={() => handleCopy(lead.email, `${lead.id}-email`)}
                          className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                          title="Copy Email"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-mono font-medium">
                            {copiedId === `${lead.id}-email` ? 'Copied!' : lead.email}
                          </span>
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Logged Date */}
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {lead.timestamp}
                        </span>

                        {/* Delete Lead */}
                        <button
                          onClick={() => onDeleteLead(lead.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete Lead Record"
                          id={`delete-btn-${lead.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Drawer Footer Summary */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span>Showing {filteredLeads.length} of {leads.length} leads</span>
            <span className="font-mono font-bold text-slate-400">[CRM ACTIVE]</span>
          </div>

        </div>
      </div>
    </div>
  );
}
