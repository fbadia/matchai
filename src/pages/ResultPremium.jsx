import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { History, ScanText, Tag as TagIcon, LayoutList, BarChart2, AlertCircle, ChevronDown, FileDown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge, Tag } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export default function ResultPremium() {
  const location = useLocation();
  const [openAccordion, setOpenAccordion] = useState('Parsing');
  const [showToast, setShowToast] = useState(false);
  
  const fromCache = location.state?.from_cache || false;
  const data = location.state?.data;

  useEffect(() => {
    if (fromCache) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [fromCache]);

  if (!data) {
    return <Navigate to="/analise" />;
  }

  // Mapeia os ícones dinamicamente pelo ID retornado do Gemini
  const getIconForDimension = (id) => {
    switch(id) {
      case 'Parsing': return ScanText;
      case 'Keywords': return TagIcon;
      case 'Estrutura': return LayoutList;
      case 'Métricas': return BarChart2;
      case 'Gaps': return AlertCircle;
      default: return ScanText;
    }
  };

  // Define as cores com base na nota para dar o ar premium
  const getColorForScore = (score) => {
    if (score >= 80) return 'bg-emerald-400';
    if (score >= 50) return 'bg-gold-400';
    return 'bg-violet-500'; // ou red, mas o PRD pede manter na paleta
  };

  const dimensions = data.dimensoes?.map(d => ({
    ...d,
    icon: getIconForDimension(d.id),
    color: getColorForScore(d.score)
  })) || [];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-bg-deep pt-24 pb-16">
      {showToast && (
        <Toast variant="info" message="Você já analisou este par currículo + vaga recentemente. Estamos mostrando o resultado anterior — nenhum crédito foi descontado." />
      )}
      
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 mb-8 text-center">
        <Badge variant={data.nivel_match === 'alto' ? 'high' : data.nivel_match === 'medio' ? 'medium' : 'low'} className="mb-4">
          {data.nivel_match === 'alto' ? '✅ Boa compatibilidade' : data.nivel_match === 'medio' ? '⚠️ Compatibilidade parcial' : '❌ Baixa compatibilidade'}
        </Badge>
        <div className="mt-2">
          <span className="text-[96px] font-medium text-violet-300 leading-none">{data.score_geral}</span>
          <p className="text-caption text-text-disabled mt-2">Score de compatibilidade</p>
        </div>
        <p className="text-body font-medium text-text-primary mt-4 max-w-xl mx-auto">
          {data.score_geral >= 75 
            ? "Seu currículo está bem alinhado com esta vaga. As chances de passar pelo filtro automático são boas — mas ainda dá para melhorar alguns pontos antes de enviar." 
            : data.score_geral >= 50 
              ? "Seu currículo tem potencial para esta vaga, mas ainda faltam alguns elementos importantes que o filtro automático vai procurar. Confira o que está faltando abaixo." 
              : "Seu currículo, da forma como está, tem poucas chances de passar pelo filtro automático desta vaga. A boa notícia: a gente identificou exatamente o que precisa mudar."}
        </p>
        <p className="text-body text-text-muted mt-2 max-w-lg mx-auto">
          {data.resumo}
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
                          {dim.found?.length ? dim.found.map((k, idx) => <Tag key={idx} type="keyword">{k}</Tag>) : <span className="text-caption text-text-disabled">-</span>}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-micro font-semibold text-text-primary mb-1">Palavras e habilidades que a vaga pede mas não estão no seu currículo</h4>
                        <p className="text-caption text-text-disabled mb-3">*(São exatamente essas que o filtro automático vai procurar)*</p>
                        <div className="flex flex-wrap gap-2">
                          {dim.missing?.length ? dim.missing.map((k, idx) => <Tag key={idx} type="gap">{k}</Tag>) : <span className="text-caption text-text-disabled">-</span>}
                        </div>
                      </div>
                    </>
                  )}

                  {dim.hasGaps && dim.gaps && dim.gaps.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-micro font-semibold text-text-primary mb-2">Pontos de atenção identificados</h4>
                      <div className="flex flex-wrap gap-2">
                        {dim.gaps.map((g, idx) => <Tag key={idx} type="gap">{g}</Tag>)}
                      </div>
                    </div>
                  )}

                  {dim.hasSuggestions && dim.suggestions && dim.suggestions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-micro font-semibold text-text-primary mb-2">Como melhorar antes de enviar</h4>
                      <div className="flex flex-wrap gap-2">
                        {dim.suggestions.map((s, idx) => <Tag key={idx} type="suggestion">{s}</Tag>)}
                      </div>
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
        <h3 className="text-h3 text-text-primary mb-1">Sugestões de reescrita para esta vaga</h3>
        <p className="text-caption text-text-disabled mb-6">Pegamos frases do seu currículo e sugerimos versões mais alinhadas com o que esta vaga pede. Use como quiser — a decisão final é sempre sua.</p>
        
        <div className="space-y-4">
          {data.bullets_otimizados?.map((bullet, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-default">
                <div className="p-4">
                  <div className="text-micro uppercase text-text-disabled mb-2">Original</div>
                  <p className="text-body text-text-muted">{bullet.original}</p>
                </div>
                <div className="p-4 bg-bg-surface2">
                  <div className="text-micro uppercase text-violet-300 mb-2">Otimizado</div>
                  <p className="text-body text-text-primary">{bullet.otimizado}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* PDF Download CTA */}
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Button variant="ghost" className="w-full">
          <FileDown size={16} />
          Baixar CV otimizado — PDF
        </Button>
        <p className="text-caption text-text-disabled mt-3 mb-6">
          O PDF será gerado com as sugestões aplicadas ao seu currículo original. (Em breve)
        </p>
        
        <div className="p-4 bg-bg-surface border border-border-default rounded-md text-left">
          <p className="text-caption text-text-muted">
            <AlertCircle size={14} className="inline mr-1.5 text-violet-400" />
            Todas as sugestões são baseadas no que você já escreveu no seu currículo. Não inventamos experiências, não exageramos conquistas. Só ajudamos você a apresentar melhor o que já é seu.
          </p>
        </div>
      </div>

    </div>
  );
}
