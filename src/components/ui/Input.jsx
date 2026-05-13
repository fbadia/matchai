import { AlertCircle } from 'lucide-react';
import React from 'react';

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-label text-text-secondary mb-2 flex items-center">{label}</label>}
      <input 
        className={`w-full bg-bg-surface border border-border-default rounded-md px-4 py-3 text-body text-text-primary placeholder-text-disabled focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors duration-200 ${className}`}
        {...props}
      />
      {error && (
        <div className="mt-1.5 text-caption text-red-400 flex items-center gap-1">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="w-full flex flex-col h-full">
      {label && <label className="block text-label text-text-secondary mb-2 flex items-center">{label}</label>}
      <textarea 
        className={`w-full bg-bg-surface border border-border-default rounded-md px-4 py-3 text-body text-text-primary placeholder-text-disabled focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none transition-colors duration-200 flex-1 ${className}`}
        {...props}
      />
      {error && (
        <div className="mt-1.5 text-caption text-red-400 flex items-center gap-1">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
