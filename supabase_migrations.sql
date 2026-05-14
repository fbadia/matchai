CREATE TABLE usage_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_hash       TEXT NOT NULL,
  job_hash      TEXT NOT NULL,
  combined_hash TEXT NOT NULL,
  result_json   JSONB NOT NULL,
  tier          TEXT NOT NULL DEFAULT 'premium',
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_usage_logs_lookup
  ON usage_logs (user_id, combined_hash, created_at DESC);

ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuário vê apenas seus logs"
  ON usage_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION decrement_credits(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET credits = credits - 1
  WHERE id = p_user_id AND credits >= 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Créditos insuficientes';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
