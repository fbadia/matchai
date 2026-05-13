import React from 'react';

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const baseClasses = 'inline-flex justify-center items-center gap-2 px-6 py-3 rounded-md text-label font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-br from-violet-500 to-violet-300 hover:from-violet-600 hover:to-violet-500 text-white shadow-glow-violet',
    secondary: 'bg-transparent border border-violet-border text-violet-300 hover:bg-bg-surface2',
    ghost: 'bg-bg-surface border border-border-default text-text-muted hover:bg-bg-surface2 hover:text-text-secondary'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
