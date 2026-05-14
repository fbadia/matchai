import { CheckCircle, AlertTriangle, XCircle, History } from 'lucide-react';

export function Toast({ variant = 'success', message }) {
  const config = {
    success: {
      classes: 'bg-emerald-900 border border-emerald-800 text-emerald-400',
      icon: <CheckCircle size={16} />
    },
    warning: {
      classes: 'bg-gold-900 border border-gold-800 text-gold-400',
      icon: <AlertTriangle size={16} />
    },
    error: {
      classes: 'bg-red-900 border border-red-800 text-red-400',
      icon: <XCircle size={16} />
    },
    info: {
      classes: 'bg-blue-900 border border-blue-800 text-blue-400',
      icon: <History size={16} />
    }
  };

  const current = config[variant] || config.success;

  return (
    <div className={`fixed top-4 right-4 z-50 w-80 flex items-center gap-3 text-body px-4 py-3 rounded-md shadow-lg ${current.classes} animate-in slide-in-from-right-4 fade-in duration-200`}>
      {current.icon}
      <span>{message}</span>
    </div>
  );
}
