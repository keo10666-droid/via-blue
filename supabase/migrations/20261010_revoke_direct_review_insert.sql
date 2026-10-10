REVOKE INSERT ON TABLE public.reviews FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
