import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn, UserPlus, Eye, EyeOff, Gift } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { login } from '../store/authSlice';
import { setCredits } from '../store/creditsSlice';

export default function Auth({ mode }) {
  const isLogin = mode === 'login';
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login/signup
    dispatch(login({ name: 'Flávio', email: 'flavio@example.com' }));
    if (!isLogin) {
      dispatch(setCredits(5));
    }
    navigate('/analise');
  };

  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-lg font-semibold tracking-tight mb-6">
            <span className="text-text-primary">Match</span>
            <span className="text-violet-500">AI</span>
          </div>
          
          <h2 className="text-h2 text-text-primary">
            {isLogin ? 'Bem-vindo de volta.' : 'Comece de graça.'}
          </h2>
          <p className="text-body text-text-muted mt-1">
            {isLogin ? 'Entre na sua conta para continuar.' : '5 créditos grátis ao criar sua conta.'}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input 
            type="email" 
            label="E-mail" 
            placeholder="seu@email.com" 
            required
          />
          
          <div className="relative">
            <Input 
              type={showPassword ? 'text' : 'password'} 
              label="Senha" 
              placeholder="••••••••" 
              required
            />
            <button 
              type="button"
              className="absolute right-4 top-[38px] text-text-disabled hover:text-text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button variant="primary" className="w-full mt-2" type="submit">
            {isLogin ? (
              <><LogIn size={16} /> Entrar</>
            ) : (
              <><UserPlus size={16} /> Criar conta grátis</>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border-default text-center text-body text-text-muted">
          {isLogin ? (
            <>
              Não tem conta? <Link to="/cadastro" className="text-violet-300 hover:text-violet-500 transition-colors">Criar conta</Link>
            </>
          ) : (
            <>
              Já tem conta? <Link to="/login" className="text-violet-300 hover:text-violet-500 transition-colors">Entrar</Link>
            </>
          )}
        </div>

        {!isLogin && (
          <div className="mt-4 text-center flex items-center justify-center gap-1 text-left">
            <Gift size={12} className="text-emerald-400 flex-shrink-0" />
            <span className="text-caption text-emerald-400">
              Você receberá 5 créditos grátis ao confirmar seu e-mail.
            </span>
          </div>
        )}

      </Card>
    </div>
  );
}
