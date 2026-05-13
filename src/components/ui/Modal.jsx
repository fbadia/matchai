import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-surface border border-border-default rounded-xl w-full max-w-md p-8 relative shadow-glow-violet">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-disabled hover:text-text-primary transition-colors"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
