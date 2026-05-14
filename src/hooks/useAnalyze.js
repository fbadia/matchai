import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const API_URL = 'https://matchai-qber.onrender.com';

export function useAnalyze() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const analyzePremium = async (cvText, jobText) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(`${API_URL}/api/analyze/premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          cv_text: cvText,
          job_text: jobText
        })
      });

      if (!res.ok) {
        let errorMsg = 'Erro na comunicação com o servidor.';
        try {
          const errData = await res.json();
          if (errData.detail) errorMsg = errData.detail;
          else if (errData.error) errorMsg = errData.error;
        } catch(e) {}
        throw new Error(errorMsg);
      }

      const response = await res.json();

      if (response.error) {
         throw new Error(response.error);
      }

      navigate('/resultado?tier=premium', { 
        state: { 
          from_cache: response.from_cache, 
          cached_at: response.cached_at 
        } 
      });
      
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
