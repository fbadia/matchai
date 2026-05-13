import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Coins, UserCircle } from 'lucide-react';
import { logout } from '../../store/authSlice';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { balance } = useSelector(state => state.credits);
  const dispatch = useDispatch();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-deep/90 backdrop-blur-md border-b border-border-default h-16">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        
        <Link to="/" className="text-lg font-semibold tracking-tight">
          <span className="text-text-primary">Match</span>
          <span className="text-violet-500">AI</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gold-900 border border-gold-800 rounded-full px-3 py-1 cursor-pointer hover:bg-gold-800/80 transition-colors">
              <Coins size={14} className="text-gold-400 mr-1.5" />
              <span className="text-gold-400 text-label">{balance} créditos</span>
            </div>
            
            <div className="flex items-center gap-2 relative group cursor-pointer">
              <UserCircle size={20} className="text-text-muted" />
              <span className="text-text-secondary text-label hidden sm:block">
                {user?.name || 'Usuário'}
              </span>
              
              <div className="absolute right-0 top-full mt-2 w-32 bg-bg-surface border border-border-default rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button 
                  onClick={() => dispatch(logout())}
                  className="w-full text-left px-4 py-2 text-label text-text-secondary hover:bg-bg-surface2 hover:text-text-primary"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-text-muted hover:text-text-primary text-body transition-colors">
              Entrar
            </Link>
            <Link to="/cadastro" className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md text-label transition-colors">
              Criar conta
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
