CREATE TABLE IF NOT EXISTS public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  whatsapp_number text NOT NULL,
  primary_interest text NOT NULL,
  experience_level text NOT NULL,
  wants_ai_mentor boolean NOT NULL DEFAULT false,
  referral_source text,
  email_sent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.form_submissions TO anon, authenticated;
GRANT ALL ON public.form_submissions TO service_role;

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit"
  ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No public read"
  ON public.form_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);
