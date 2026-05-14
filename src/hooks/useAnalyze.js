import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAnalyze() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const analyzePremium = async (cvText, jobText) => {
    setLoading(true);
    setError(null);

    try {
      // MOCK DA CHAMADA A API (Simulando 3 segundos de espera)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulação de cache hit (50% de chance) para testes visuais
      const fromCache = Math.random() > 0.5;

      const response = {
        from_cache: fromCache,
        cached_at: fromCache ? new Date().toISOString() : undefined,
        score_geral: 74,
      };

      // Redireciona com o estado de from_cache para que a tela ResultPremium possa exibir o Toast
      navigate('/resultado?tier=premium', { state: { from_cache: response.from_cache, cached_at: response.cached_at } });
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { analyzePremium, loading, error };
}
