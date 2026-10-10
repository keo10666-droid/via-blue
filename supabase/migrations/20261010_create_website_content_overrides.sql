create table if not exists public.website_content_overrides (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.website_content_overrides enable row level security;
revoke all on table public.website_content_overrides from anon, authenticated;
grant all on table public.website_content_overrides to service_role;
