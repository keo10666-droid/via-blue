create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  booking_type text not null,
  booking_name text not null,
  customer_name text,
  customer_email text,
  customer_whatsapp text,
  trip_date text,
  pickup_time text,
  total_price text,
  notes text,
  status text not null default 'received'
    check (
      status in (
        'received',
        'under_review',
        'confirmed',
        'cancelled',
        'completed'
      )
    ),
  fields jsonb not null default '[]'::jsonb,
  source_subject text,
  created_at timestamptz not null default now()
);

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);

create index if not exists booking_requests_status_idx
  on public.booking_requests (status);

create index if not exists booking_requests_customer_email_idx
  on public.booking_requests (customer_email);

alter table public.booking_requests enable row level security;
