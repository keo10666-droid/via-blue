REVOKE INSERT ON TABLE public.bookings FROM anon, authenticated;

DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
