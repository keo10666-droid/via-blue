alter table public.tour_catalog_overrides
  add column if not exists category text;
