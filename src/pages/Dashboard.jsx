import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, FileText, Zap, Coins, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Textarea } from '../components/ui/Input';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  const { balance } = useSelector(state => state.credits);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  const loadingTexts = [
    "Lendo sua candidatura...",
    "Comparando com a vaga...",
    "Calculando seu score...",
    "A IA está trabalhando com mais atenção do que o RH vai ter..."
  ];

  const handleAnalyze = () => {
    setLoading(true);
    let step = 0;
    setLoadingText(loadingTexts[step]);
    
    const interval = setInterval(() => {
      step++;
      if (step < loadingTexts.length) {
        setLoadingText(loadingTexts[step]);
      } else {
        clearInterval(interval);
        window.location.href = '/resultado?tier=premium';
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg-deep pt-24 pb-16 relative">
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-h2 text-text-primary">Olá, {user?.name?.split(' ')[0] || 'Usuário'}.</h2>
        <h2 className="text-h2 text-violet-300">Pronto pra dar um nó no ATS?</h2>
        <p className="text-body text-text-muted mt-3">
          Cole a descrição da vaga e o texto do seu CV abaixo. O resto é com a gente.
        </p>
      </div>

      {/* Form Area */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Textarea 
            label={<><Briefcase size={14} className="mr-1.5" /> Descrição da vaga</>}
            placeholder="Analista de Marketing Pleno | Experiência com SEO, Google Ads e..."
            className="h-64"
          />
          <Textarea 
            label={<><FileText size={14} className="mr-1.5" /> Seu currículo</>}
            placeholder="Cole aqui o texto do seu currículo — sem formatação, só o conteúdo mesmo."
            className="h-64"
          />
        </div>

        {/* Action Area */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {balance > 0 ? (
            <>
              <Button variant="primary" className="w-[280px]" onClick={handleAnalyze}>
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
              <h3 className="text-label text-text-primary">Você usou todos os créditos.</h3>
              <p className="text-body text-text-muted mt-2 mb-4">
                Boa notícia: R$ 10 resolve isso. Má notícia: o mercado de trabalho não.
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
