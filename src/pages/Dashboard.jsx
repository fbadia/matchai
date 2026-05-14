import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, FileText, Zap, Coins, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Textarea } from '../components/ui/Input';
import { useAnalyze } from '../hooks/useAnalyze';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  const { balance } = useSelector(state => state.credits);
  
  const { analyzePremium, loading, error } = useAnalyze();
  const [loadingText, setLoadingText] = useState('');
  const [cvText, setCvText] = useState('');
  const [jobText, setJobText] = useState('');
  
  const loadingTexts = [
    "Analisando palavra por palavra da vaga...",
    "Identificando o que está faltando no seu currículo...",
    "Preparando sugestões de melhoria...",
    "Quase lá — estamos finalizando seu diagnóstico..."
  ];

  useEffect(() => {
    if (loading) {
      let step = 0;
      setLoadingText(loadingTexts[step]);
      
      const interval = setInterval(() => {
        step++;
        if (step < loadingTexts.length) {
          setLoadingText(loadingTexts[step]);
        }
      }, 1000); // reduced to 1000 for realistic 3s sync
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleAnalyze = () => {
    analyzePremium(cvText, jobText);
  };

  return (
    <div className="min-h-screen bg-bg-deep pt-24 pb-16 relative">
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-h2 text-text-primary">
          Olá, {user?.name?.split(' ')[0] || 'Usuário'}. <span className="text-violet-300">Qual vaga você quer analisar hoje?</span>
        </h2>
        <p className="text-body text-text-muted mt-3 max-w-2xl mx-auto">
          Cole abaixo o texto da vaga que você quer e o texto do seu currículo. Em segundos você descobre se está no caminho certo — ou o que precisa ajustar.
        </p>
      </div>

      {/* Form Area */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Textarea 
              label={<><Briefcase size={14} className="mr-1.5 inline" /> Texto da vaga <span className="block text-xs font-normal text-text-disabled mt-1">*(Cole aqui a descrição completa da vaga — do LinkedIn, Indeed, ou onde você encontrou)*</span></>}
              placeholder="Analista de Marketing Pleno — buscamos profissional com experiência em campanhas digitais, Google Ads, SEO..."
              className="h-64 mt-2"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
            />
          </div>
          <div>
            <Textarea 
              label={<><FileText size={14} className="mr-1.5 inline" /> Seu currículo <span className="block text-xs font-normal text-text-disabled mt-1">*(Cole aqui o texto do seu currículo. Pode ser do Word, PDF ou Google Docs — só o texto mesmo, sem formatação)*</span></>}
              placeholder="Profissional de marketing com 5 anos de experiência em gestão de campanhas digitais, com foco em performance e crescimento orgânico..."
              className="h-64 mt-2"
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />
          </div>
        </div>

        {/* Action Area */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {error && (
            <div className="w-full max-w-lg mb-4 flex items-center gap-2 bg-red-900/50 border border-red-800 text-red-400 text-body p-4 rounded-md">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {balance > 0 ? (
            <>
              <Button variant="primary" className="w-[280px]" onClick={handleAnalyze} disabled={loading || !cvText || !jobText}>
                <Zap size={16} />
                Analisar agora
              </Button>
              <div className="flex items-center gap-1.5 text-caption text-gold-400 mt-1">
                <Coins size={12} />
                Esta análise usa 1 crédito premium
              </div>
            </>
          ) : (
            <Card className="max-w-sm mx-auto text-center p-6 w-full">
              <AlertCircle size={24} className="text-gold-400 mb-3 mx-auto" />
              <h3 className="text-label text-text-primary">Você usou todos os seus créditos.</h3>
              <p className="text-body text-text-muted mt-2 mb-4">
                Recarregue para continuar analisando — 10 créditos por R$ 10,00, sem mensalidade, sem compromisso.<br/>
                <span className="block text-xs opacity-70 mt-2">*(Seus créditos nunca expiram, então não tem pressa.)*</span>
              </p>
              <Button variant="primary" className="w-full">
                <Coins size={16} />
                Recarregar créditos
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-bg-deep/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-border-default border-t-violet-500 rounded-full animate-spin"></div>
            <p className="text-body text-text-muted text-center animate-pulse">{loadingText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
