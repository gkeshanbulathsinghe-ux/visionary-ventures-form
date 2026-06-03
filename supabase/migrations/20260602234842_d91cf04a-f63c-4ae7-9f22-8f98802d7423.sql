
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  whatsapp_country_code TEXT NOT NULL DEFAULT '+94',
  whatsapp_number TEXT NOT NULL,
  primary_interest TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  wants_ai_mentor BOOLEAN NOT NULL DEFAULT false,
  referral_source TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.leads TO anon;
GRANT SELECT, INSERT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a lead
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Block public SELECT — only service role (admin) can read submissions
CREATE POLICY "No public read"
  ON public.leads FOR SELECT
  TO anon, authenticated
  USING (false);
