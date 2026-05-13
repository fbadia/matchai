import { Link } from 'react-router-dom';
import { Lock, Sparkles, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function ResultBasic() {
  return (
    <div className="min-h-screen bg-bg-deep pt-24 pb-16">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 mb-8 text-center">
        <Badge variant="high" className="mb-4">Você está no jogo.</Badge>
        <div className="mt-2">
          <span className="text-[96px] font-medium text-violet-300 leading-none">74</span>
          <p className="text-caption text-text-disabled mt-2">Score de compatibilidade</p>
        </div>
        <p className="text-body text-text-muted mt-4 max-w-lg mx-auto">
          Seu currículo passa pelo ATS, mas você ainda está perdendo pontos valiosos em estrutura e gaps não explicados.
        </p>
      </div>

      {/* Score Card Teaser */}
      <div className="max-w-2xl mx-auto px-6 mb-8">
        <Card className="p-6">
          <h3 className="text-label text-text-secondary mb-4">Análise por dimensão</h3>
          <div className="space-y-3">
            
            {/* Parsing - Visible */}
            <div className="flex items-center gap-3">
              <span className="text-caption text-text-muted w-20 flex-shrink-0">Parsing</span>
              <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: '80%' }}></div>
              </div>
              <span className="text-caption text-text-muted w-14 text-right">Bom</span>
            </div>

            {/* Others - Blurred */}
            {['Keywords', 'Estrutura', 'Métricas', 'Gaps'].map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-caption text-text-muted w-20 flex-shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-50 blur-[2px] bg-violet-900 w-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={10} className="text-text-disabled" />
                  </div>
                </div>
                <span className="text-caption text-text-disabled w-14 text-right">&bull;&bull;&bull;</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Premium CTA */}
      <div className="max-w-2xl mx-auto px-6">
        <Card variant="featured" className="p-6">
          <Sparkles size={20} className="text-violet-300 mb-3" />
          <h3 className="text-h3 text-text-primary">Quer saber exatamente o que está travando sua candidatura?</h3>
          
          <ul className="mt-4 mb-6 space-y-2">
            {[
              'Scores detalhados por dimensão com percentuais',
              'Lista exata de keywords que estão faltando',
              'Sugestões de bullet points otimizados para esta vaga',
              'PDF do currículo pronto para enviar'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-violet-300 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-body text-text-muted">{item}</span>
              </li>
            ))}
          </ul>

          <Link to="/resultado?tier=premium">
            <Button variant="primary" className="w-full">
              <Zap size={16} />
              Desbloquear análise completa — 1 crédito
            </Button>
          </Link>
          
          <p className="text-caption text-text-disabled text-center mt-3">
            Você tem 1 crédito disponível.
          </p>
        </Card>
      </div>
      
    </div>
  );
}
