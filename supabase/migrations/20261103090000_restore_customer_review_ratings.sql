alter table public.reviews
  add column rating smallint not null,
  add constraint reviews_rating_range check (rating between 1 and 5);

create index reviews_visible_tour_rating_idx
  on public.reviews (tour_slug, rating)
  where is_visible = true;
