import { AlertCircle, Lightbulb, Check } from 'lucide-react';

export function Badge({ variant = 'premium', className = '', children, ...props }) {
  const baseClasses = 'inline-flex items-center gap-1.5 text-caption px-3 py-1 rounded-full font-medium';
  
  const variants = {
    premium: 'bg-violet-900 border border-violet-border text-violet-300',
    high: 'bg-emerald-900 border border-emerald-800 text-emerald-400',
    medium: 'bg-violet-900 border border-violet-border text-violet-300',
    low: 'bg-red-900 border border-red-800 text-red-400',
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

export function Tag({ type = 'gap', className = '', children, ...props }) {
  const baseClasses = 'inline-flex items-center gap-1.5 text-caption px-2.5 py-1 rounded-md';
  
  const types = {
    gap: {
      classes: 'bg-red-900 border border-red-800 text-red-400',
      icon: <AlertCircle size={12} />
    },
    suggestion: {
      classes: 'bg-blue-900 border border-blue-800 text-blue-400',
      icon: <Lightbulb size={12} />
    },
    keyword: {
      classes: 'bg-emerald-900 border border-emerald-800 text-emerald-400',
      icon: <Check size={12} />
    }
  };

  const config = types[type] || types.gap;

  return (
    <span className={`${baseClasses} ${config.classes} ${className}`} {...props}>
      {config.icon}
      {children}
    </span>
  );
}
