import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, UserPlus, Sparkles, Unlock, Lock, Check, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-deep pt-16">
      
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <Badge variant="premium" className="mb-6">
              <Sparkles size={12} />
              <span>IA para recrutamento reverso</span>
            </Badge>
            
            <h1 className="text-display font-medium text-text-primary mb-5 leading-tight">
              <span className="block">Seu currículo merece mais</span>
              <span className="block text-violet-300">do que boa sorte.</span>
            </h1>
            
            <p className="text-body-lg text-text-muted mb-8 max-w-lg leading-relaxed">
              Descubra em segundos por que o ATS rejeitou você antes de qualquer humano ter lido uma linha.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Link to="/cadastro">
                <Button variant="primary">
                  <Zap size={16} />
                  Analisar meu currículo — é grátis
                </Button>
              </Link>
              <a href="#como-funciona" className="text-violet-300 hover:text-violet-500 text-body transition-colors mt-2 sm:mt-0 sm:self-center">
                Como funciona &rarr;
              </a>
            </div>
            
            <p className="mt-4 text-caption text-text-disabled flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck size={12} className="text-emerald-400" />
              5 créditos grátis no cadastro. Sem cartão de crédito.
            </p>
          </div>

          <div className="hidden lg:block relative rotate-1">
            <Card variant="elevated" className="shadow-glow-violet w-full max-w-md mx-auto pointer-events-none">
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-900 border border-emerald-800 text-emerald-400 text-caption px-3 py-1 rounded-full font-medium">Você está no jogo.</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-[48px] font-medium text-violet-300 leading-none">74</span>
                  <span className="text-caption text-text-disabled">Score de compatibilidade</span>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                {[
                  { label: 'Parsing', percent: 80, color: 'bg-emerald-400', val: 'Bom' },
                  { label: 'Keywords', percent: 65, color: 'bg-violet-500', val: '65%' },
                  { label: 'Estrutura', percent: 90, color: 'bg-emerald-400', val: '90%' },
                  { label: 'Métricas', percent: 50, color: 'bg-gold-400', val: '50%' },
                  { label: 'Gaps', percent: 70, color: 'bg-violet-500', val: '70%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-caption text-text-muted w-20">{item.label}</span>
                    <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-caption text-text-muted w-10 text-right">{item.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="bg-bg-surface2 border-y border-border-default py-4 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-6 flex-wrap text-caption text-text-muted">
          <span>Zero invenção</span>
          <span className="text-border-default">&middot;</span>
          <span>Análise em 5 dimensões</span>
          <span className="text-border-default">&middot;</span>
          <span>PDF em segundos</span>
          <span className="text-border-default">&middot;</span>
          <span>Sem achismos</span>
          <span className="text-border-default">&middot;</span>
          <span>5 créditos grátis</span>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-micro uppercase text-violet-300 tracking-wider mb-3 block">Como Funciona</span>
          <h2 className="text-h2 text-text-primary">Simples assim.</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Cole a vaga', desc: 'Aquela que você ficou olhando por 20 minutos antes de mandar.' },
            { num: '02', title: 'Suba seu CV', desc: 'Sem enfeites. Só o texto mesmo.' },
            { num: '03', title: 'A IA trabalha', desc: 'Enquanto você respira fundo.' },
            { num: '04', title: 'Receba o diagnóstico', desc: 'Score, gaps e sugestões para turbinar o material.' },
          ].map((step, i) => (
            <Card key={i} className="relative overflow-hidden">
              <span className="text-display font-medium text-violet-500 opacity-10 absolute top-2 right-4 leading-none">{step.num}</span>
              <div className="relative z-10 pt-4">
                <h3 className="text-h3 text-text-primary">{step.title}</h3>
                <p className="text-body text-text-muted mt-2">{step.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Freemium vs Premium */}
      <section className="py-24 bg-bg-surface2 border-y border-border-default">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-micro uppercase tracking-wider text-violet-300 block mb-3">Planos</span>
            <h2 className="text-h2 text-text-primary mb-4">Score grátis. Aprovação, com crédito.</h2>
            <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
              O score básico te mostra se você tem chance. A análise premium te mostra por que você não tem — e como mudar isso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Card */}
            <Card className="flex flex-col">
              <div className="flex items-center gap-2">
                <Unlock size={18} className="text-text-muted" />
                <h3 className="text-h3 text-text-primary">Gratuito</h3>
              </div>
              <div className="border-t border-border-default my-4"></div>
              <ul className="space-y-3 flex-1">
                {[
                  { text: 'Score geral 0–100', active: true },
                  { text: 'Resumo da análise', active: true },
                  { text: 'Preview das dimensões', active: true },
                  { text: 'Scores por dimensão', active: false },
                  { text: 'Keywords faltando', active: false },
                  { text: 'Bullet points otimizados', active: false },
                  { text: 'Exportação PDF', active: false },
                ].map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2 text-body ${feature.active ? 'text-text-primary' : 'text-text-disabled'}`}>
                    {feature.active ? (
                      <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                    ) : (
                      <Lock size={14} className="text-text-disabled mt-1 flex-shrink-0" />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <p className="text-caption text-text-disabled mt-6 text-center">Sem créditos</p>
            </Card>

            {/* Premium Card */}
            <Card variant="featured" className="flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-purple-200 text-micro px-3 py-1 rounded-full whitespace-nowrap tracking-wide">
                Mais popular
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Sparkles size={18} className="text-violet-300" />
                <h3 className="text-h3 text-text-primary">Premium</h3>
              </div>
              <div className="border-t border-border-default my-4"></div>
              <ul className="space-y-3 flex-1">
                {[
                  'Score geral 0–100',
                  'Análise em 5 dimensões com percentuais',
                  'Keywords presentes e faltando',
                  'Gaps detalhados da candidatura',
                  'Bullet points otimizados para a vaga',
                  'Exportação PDF do currículo'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-body text-text-primary">
                    <Check size={14} className="text-violet-300 mt-1 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                <span className="bg-gold-900 border border-gold-800 text-gold-400 text-caption px-3 py-1 rounded-full">
                  1 crédito por análise
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-micro uppercase tracking-wider text-violet-300 block mb-3">Preços</span>
          <h2 className="text-h2 text-text-primary mb-4">Sem assinatura. Sem surpresa.</h2>
          <p className="text-body text-text-muted">Compre créditos quando precisar. Eles não expiram.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          {/* Starter */}
          <Card>
            <span className="text-label text-text-muted mb-2 block">Starter</span>
            <div className="text-h1 text-text-primary">R$ 10</div>
            <div className="text-body text-violet-300 mt-1 mb-1">10 créditos</div>
            <div className="text-caption text-text-disabled">R$ 1,00 por análise</div>
            <div className="border-t border-border-default my-4"></div>
            <Button variant="secondary" className="w-full">Comprar</Button>
          </Card>

          {/* Pro */}
          <Card variant="featured">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-purple-200 text-micro px-3 py-1 rounded-full whitespace-nowrap tracking-wide">
              Melhor custo-benefício
            </div>
            <div className="pt-2">
              <span className="text-label text-text-muted mb-2 block">Pro</span>
              <div className="text-h1 text-text-primary">R$ 20</div>
              <div className="text-body text-violet-300 mt-1 mb-1">25 créditos</div>
              <div className="text-caption text-text-disabled">R$ 0,80 por análise</div>
              <div className="border-t border-border-default my-4"></div>
              <Button variant="primary" className="w-full">
                <Zap size={16} />
                Comprar
              </Button>
            </div>
          </Card>
        </div>

        <p className="text-center mt-6 text-caption text-text-disabled flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-emerald-400" />
          Pagamento seguro via Stripe &middot; Máximo de 50 créditos &middot; Os 5 primeiros são por nossa conta
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-bg-surface2 border-t border-border-default">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="text-h1 text-text-primary leading-tight">
            Você já perdeu tempo demais esperando retorno de processo seletivo.
          </h1>
          <p className="text-body-lg text-text-muted mt-4 mb-8">
            Comece agora. Os primeiros 5 créditos são por nossa conta.
          </p>
          <Link to="/cadastro">
            <Button variant="primary">
              <UserPlus size={16} />
              Criar conta grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-deep border-t border-border-default py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold tracking-tight">
              <span className="text-text-primary">Match</span>
              <span className="text-violet-500">AI</span>
            </div>
            <div className="text-caption text-text-disabled mt-1">Feito para quem não desiste.</div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-caption text-text-disabled hover:text-text-muted transition-colors">Política de Privacidade</a>
            <a href="#" className="text-caption text-text-disabled hover:text-text-muted transition-colors">Termos de Uso</a>
            <span className="text-caption text-text-disabled">&copy; 2026 MatchAI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
