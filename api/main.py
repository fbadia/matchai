from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from supabase import create_client
from datetime import datetime, timedelta
import hashlib
import os
import json
import google.generativeai as genai

app = FastAPI(title="MatchAI API")

# Configuração de CORS (Permite que o frontend comunique com o backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Na produção, você pode trocar "*" pela URL do seu frontend no Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    cv_text: str
    job_text: str

    @validator('cv_text', 'job_text')
    def min_length(cls, v):
        if len(v.strip()) < 100:
            raise ValueError('Texto deve ter no mínimo 100 caracteres.')
        return v

def normalize_text(text: str) -> str:
    return text.strip().lower()

def generate_combined_hash(cv_text: str, job_text: str) -> str:
    combined = normalize_text(cv_text) + "|||" + normalize_text(job_text)
    return hashlib.sha256(combined.encode('utf-8')).hexdigest()

# Validação real de Auth via Supabase
async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Token de autorização ausente ou inválido")
    
    token = authorization.split(" ")[1]
    if "SUPABASE_URL" not in os.environ or "SUPABASE_SERVICE_ROLE_KEY" not in os.environ:
        raise HTTPException(status_code=500, detail="Serviço indisponível. Variáveis de ambiente ausentes.")
    
    supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])
    
    user_res = supabase.auth.get_user(token)
    if not user_res or not user_res.user:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
        
    return {"id": user_res.user.id}

async def call_gemini_premium(cv_text: str, job_text: str):
    if "GEMINI_API_KEY" not in os.environ:
        raise HTTPException(status_code=500, detail="Serviço indisponível. Variável GEMINI_API_KEY ausente.")

    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    
    model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})
    
    prompt = f"""
    Você é um especialista em Recrutamento (ATS) e análise de currículos.
    Analise o seguinte Currículo e compare-o com a Descrição da Vaga.
    
    VAGA:
    {job_text}
    
    CURRÍCULO:
    {cv_text}
    
    Retorne a análise ESTRITAMENTE em formato JSON com a seguinte estrutura, sem nenhum outro texto ao redor:
    {{
        "score_geral": inteiro (0 a 100 indicando a compatibilidade),
        "resumo": "Texto curto resumindo a análise geral em 2 ou 3 frases.",
        "nivel_match": "alto" | "medio" | "baixo",
        "dimensoes": [
            {{
                "id": "Parsing",
                "score": inteiro (0 a 100),
                "desc": "Análise sobre como um sistema ATS conseguiria ler os dados do CV",
                "hasKeywords": false,
                "hasGaps": false,
                "hasSuggestions": false
            }},
            {{
                "id": "Keywords",
                "score": inteiro (0 a 100),
                "desc": "Análise sobre aderência de palavras-chave da vaga no currículo",
                "hasKeywords": true,
                "found": ["Palavra1", "Palavra2"],
                "missing": ["Faltando1", "Faltando2"]
            }},
            {{
                "id": "Estrutura",
                "score": inteiro (0 a 100),
                "desc": "Análise sobre estrutura e ordem cronológica do CV"
            }},
            {{
                "id": "Métricas",
                "score": inteiro (0 a 100),
                "desc": "Avaliação sobre os resultados numéricos apresentados no CV",
                "hasSuggestions": true,
                "suggestions": ["Sugestão 1 de melhoria", "Sugestão 2"]
            }},
            {{
                "id": "Gaps",
                "score": inteiro (0 a 100),
                "desc": "Avaliação sobre lacunas de tempo não explicadas no histórico",
                "hasGaps": true,
                "gaps": ["Gap detectado 1"]
            }}
        ],
        "bullets_otimizados": [
            {{
                "original": "Texto do bullet point original do CV.",
                "otimizado": "Texto reescrito com verbos de ação, focado em métricas ou nas palavras da vaga."
            }}
        ]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        result_json = json.loads(response.text)
        return result_json
    except Exception as e:
        print("Gemini API Error:", str(e))
        raise Exception("Erro ao processar análise no Gemini")

@app.post("/api/analyze/premium")
async def analyze_premium(
    body: AnalyzeRequest,
    user=Depends(get_current_user)
):
    if "SUPABASE_URL" not in os.environ or "SUPABASE_SERVICE_ROLE_KEY" not in os.environ:
        return {"error": "Serviço indisponível. Variáveis de ambiente ausentes."}

    supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])
    user_id = user["id"]

    # 1. Verificar saldo
    profile = supabase.table("profiles").select("credits").eq("id", user_id).single().execute()
    if profile.data["credits"] < 1:
        raise HTTPException(status_code=402, detail="Créditos insuficientes. Recarregue para continuar.")

    # 2. Gerar hash combinado
    combined_hash = generate_combined_hash(body.cv_text, body.job_text)
    cv_hash = hashlib.sha256(normalize_text(body.cv_text).encode()).hexdigest()
    job_hash = hashlib.sha256(normalize_text(body.job_text).encode()).hexdigest()

    # 3. Consultar cache (últimas 24h)
    cutoff = (datetime.utcnow() - timedelta(hours=24)).isoformat()
    cache_result = (
        supabase.table("usage_logs")
        .select("result_json, created_at")
        .eq("user_id", user_id)
        .eq("combined_hash", combined_hash)
        .eq("tier", "premium")
        .gt("created_at", cutoff)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )

    # 4a. Cache HIT
    if cache_result.data:
        cached = cache_result.data[0]
        return {
            "from_cache": True,
            "cached_at": cached["created_at"],
            **cached["result_json"]
        }

    # 4b. Cache MISS — chamar Gemini
    try:
        analysis_result = await call_gemini_premium(body.cv_text, body.job_text)
    except Exception:
        raise HTTPException(status_code=500, detail="Erro ao processar a análise. Nenhum crédito foi debitado. Tente novamente.")

    # 5. Debitar crédito
    supabase.rpc("decrement_credits", {"p_user_id": user_id}).execute()

    # 6. Gravar cache (falha silenciosa)
    try:
        supabase.table("usage_logs").insert({
            "user_id": user_id,
            "cv_hash": cv_hash,
            "job_hash": job_hash,
            "combined_hash": combined_hash,
            "result_json": analysis_result,
            "tier": "premium"
        }).execute()
    except Exception as e:
        print(f"[CACHE] Falha ao gravar cache: {e}")

    return {
        "from_cache": False,
        **analysis_result
    }
