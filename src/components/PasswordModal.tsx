import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, Eye, EyeOff, ShieldAlert, KeyRound } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setShake(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === '@Abdullah123123!') {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 relative overflow-hidden transition-all duration-300 ${
          shake ? 'animate-bounce' : ''
        }`}
        style={shake ? { animation: 'shake 0.4s ease-in-out' } : {}}
      >
        {/* Style tag for custom shake keyframe to avoid extra CSS files */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
        `}} />

        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Security Clearance</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-600 shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Enter Admin Password</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Please enter your security credentials to access the plumbing Leads Log & Integration configuration.
            </p>
          </div>

          <div className="space-y-1.5 relative">
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="••••••••••••••"
                className={`w-full pl-4 pr-11 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 font-mono transition-all ${
                  error 
                    ? 'border-rose-400 focus:ring-rose-500/25 bg-rose-50/20 text-rose-950' 
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/25 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {error && (
              <div className="flex items-center gap-1.5 text-rose-500 font-bold text-xs animate-in fade-in slide-in-from-top-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Incorrect password. Access denied.</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white rounded-2xl shadow-lg shadow-blue-500/15 transition-colors cursor-pointer"
            >
              Verify & Open
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
