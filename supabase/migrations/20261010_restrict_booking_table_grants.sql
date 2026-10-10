-- Restrict table-level privileges to the operations used by the application.
-- Row-level security remains responsible for restricting which rows users can access.

REVOKE ALL PRIVILEGES ON TABLE public.booking_requests FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON TABLE public.booking_requests FROM authenticated;
GRANT SELECT ON TABLE public.booking_requests TO authenticated;

REVOKE ALL PRIVILEGES ON TABLE public.bookings FROM anon;
REVOKE UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON TABLE public.bookings FROM authenticated;
GRANT SELECT, INSERT ON TABLE public.bookings TO authenticated;
