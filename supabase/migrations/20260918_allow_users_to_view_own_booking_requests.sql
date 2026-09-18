grant select
on table public.booking_requests
to authenticated;

drop policy if exists "Users can view their own booking requests"
on public.booking_requests;

create policy "Users can view their own booking requests"
on public.booking_requests
for select
to authenticated
using (
  lower(
    coalesce(customer_email, '')
  ) =
  lower(
    coalesce(
      (select auth.jwt() ->> 'email'),
      ''
    )
  )
);
