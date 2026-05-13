export function Card({ variant = 'base', className = '', children, ...props }) {
  const baseClasses = 'bg-bg-surface rounded-lg p-5';
  
  const variants = {
    base: 'border border-border-default',
    elevated: 'border border-border-default hover:border-violet-border hover:shadow-glow-violet transition-all duration-200 cursor-pointer',
    featured: 'border-2 border-violet-600 shadow-glow-violet relative'
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
