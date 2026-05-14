from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from supabase import create_client
from datetime import datetime, timedelta
import hashlib
import os

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

# Mock para Dependência de Auth e chamada Gemini
def get_current_user():
    return {"id": "mock-user-id"}

async def call_gemini_premium(cv_text: str, job_text: str):
    return {
        "score_geral": 85,
        "resumo": "Análise mockada do Gemini.",
        "nivel_match": "alto",
        "dimensoes": {},
        "bullets_otimizados": []
    }

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
