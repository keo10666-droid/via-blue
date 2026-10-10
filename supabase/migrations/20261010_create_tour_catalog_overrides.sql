create table if not exists public.tour_catalog_overrides (
  slug text primary key,
  price numeric(10,2) not null check (price >= 0),
  child_price numeric(10,2) not null check (child_price >= 0),
  infant_price numeric(10,2) not null check (infant_price >= 0),
  available boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.tour_catalog_overrides enable row level security;
revoke all on table public.tour_catalog_overrides from anon, authenticated;
grant all on table public.tour_catalog_overrides to service_role;
