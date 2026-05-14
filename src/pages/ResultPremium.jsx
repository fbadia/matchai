import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { History, ScanText, Tag as TagIcon, LayoutList, BarChart2, AlertCircle, ChevronDown, FileDown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge, Tag } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export default function ResultPremium() {
  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState('Keywords');
  const [showToast, setShowToast] = useState(false);
  
  const fromCache = location.state?.from_cache || false;

  useEffect(() => {
    if (fromCache) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [fromCache]);

  const dimensions = [
    { id: 'Parsing', icon: ScanText, score: 80, color: 'bg-emerald-400', desc: 'Seu CV foi lido sem problemas pelo sistema.' },
    { id: 'Keywords', icon: TagIcon, score: 65, color: 'bg-violet-500', desc: 'Faltam palavras-chave cruciais da descrição da vaga.', hasKeywords: true },
    { id: 'Estrutura', icon: LayoutList, score: 90, color: 'bg-emerald-400', desc: 'Boa organização cronológica e de seções.' },
    { id: 'Métricas', icon: BarChart2, score: 50, color: 'bg-gold-400', desc: 'Poucos resultados quantificados. Adicione números.', hasSuggestions: true },
    { id: 'Gaps', icon: AlertCircle, score: 70, color: 'bg-violet-500', desc: 'Período sem atividade detectado.', hasGaps: true },
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-bg-deep pt-24 pb-16">
      {showToast && (
        <Toast variant="info" message="Resultado recuperado do cache. Nenhum crédito foi debitado." />
      )}
      
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
        <div className="flex gap-2 justify-center mt-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-900 border border-emerald-800 text-emerald-400 text-caption px-3 py-1 rounded-full font-medium">Análise concluída</span>
          <span className="inline-flex items-center gap-1.5 bg-gold-900 border border-gold-800 text-gold-400 text-caption px-3 py-1 rounded-full font-medium">1 crédito utilizado</span>
          {fromCache && (
            <span className="inline-flex items-center gap-1.5 bg-blue-900 border border-blue-800 text-blue-400 text-caption px-3 py-1 rounded-full font-medium">
              <History size={12} />
              Resultado do cache &middot; sem débito
            </span>
          )}
        </div>
      </div>

      {/* Score Card */}
      <div className="max-w-2xl mx-auto px-6 mb-8">
        <Card className="p-6">
          <h3 className="text-label text-text-secondary mb-4">Análise por dimensão</h3>
          <div className="space-y-3">
            {dimensions.map((dim, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-caption text-text-muted w-20 flex-shrink-0">{dim.id}</span>
                <div className="flex-1 h-1.5 bg-border-subtle rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${dim.color}`} style={{ width: `${dim.score}%` }}></div>
                </div>
                <span className="text-caption text-text-muted w-10 text-right">{dim.score}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Accordions */}
      <div className="max-w-2xl mx-auto px-6 mb-8 space-y-3">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          const isOpen = openAccordion === dim.id;
          
          return (
            <Card key={dim.id} className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAccordion(dim.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-violet-300" />
                  <span className="text-label text-text-primary">{dim.id}</span>
                  <span className="text-caption text-text-muted">{dim.score}%</span>
                </div>
                <ChevronDown size={16} className={`text-text-disabled transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-border-default transition-all duration-200">
                  <p className="text-body text-text-muted mb-4">{dim.desc}</p>
                  
                  {dim.hasKeywords && (
                    <>
                      <div className="mb-4">
                        <h4 className="text-micro uppercase text-text-disabled mb-2">Encontradas no CV</h4>
                        <div className="flex flex-wrap gap-2">
                          <Tag type="keyword">SEO</Tag>
                          <Tag type="keyword">Google Analytics</Tag>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-micro uppercase text-text-disabled mb-2">Ausentes no CV</h4>
                        <div className="flex flex-wrap gap-2">
                          <Tag type="gap">Google Ads</Tag>
                          <Tag type="gap">A/B Testing</Tag>
                        </div>
                      </div>
                    </>
                  )}

                  {dim.hasGaps && (
                    <div className="flex flex-wrap gap-2">
                      <Tag type="gap">Gap de 6 meses (2023)</Tag>
                    </div>
                  )}

                  {dim.hasSuggestions && (
                    <div className="flex flex-wrap gap-2">
                      <Tag type="suggestion">Use verbos de ação + número + resultado.</Tag>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Optimized Bullets */}
      <div className="max-w-2xl mx-auto px-6 mb-10">
        <h3 className="text-h3 text-text-primary mb-1">Versão turbinada para esta vaga</h3>
        <p className="text-caption text-text-disabled mb-6">Baseado no que você já escreveu. Nenhuma experiência foi inventada.</p>
        
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-default">
              <div className="p-4">
                <div className="text-micro uppercase text-text-disabled mb-2">Original</div>
                <p className="text-body text-text-muted">Fiz campanhas de marketing usando SEO e consegui mais acessos no site.</p>
              </div>
              <div className="p-4 bg-bg-surface2">
                <div className="text-micro uppercase text-violet-300 mb-2">Otimizado</div>
                <p className="text-body text-text-primary">Aumentou o tráfego orgânico em 40% em 6 meses implementando estratégias de SEO focadas em conversão.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* PDF Download CTA */}
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Button variant="ghost" className="w-full">
          <FileDown size={16} />
          Baixar CV otimizado — PDF
        </Button>
        <p className="text-caption text-text-disabled mt-3">
          O PDF será gerado com as sugestões aplicadas ao seu currículo original.
        </p>
      </div>

    </div>
  );
}
