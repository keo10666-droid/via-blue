ALTER POLICY "Users can create their own bookings"
ON public.bookings
WITH CHECK (
  COALESCE((SELECT auth.jwt() ->> 'is_anonymous'), 'false') = 'false'
  AND user_id = (SELECT auth.uid())
  AND status = 'pending'
  AND (guests IS NULL OR guests BETWEEN 1 AND 100)
  AND (total_price IS NULL OR total_price >= 0)
);
