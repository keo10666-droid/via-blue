create table if not exists public.promo_coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_percent numeric(5,2) not null check (discount_percent > 0 and discount_percent <= 100),
  max_uses integer null check (max_uses is null or max_uses > 0),
  used_count integer not null default 0 check (used_count >= 0),
  starts_at timestamptz null,
  expires_at timestamptz null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promo_coupon_dates_valid check (starts_at is null or expires_at is null or expires_at > starts_at)
);

alter table public.promo_coupons enable row level security;
revoke all on public.promo_coupons from anon, authenticated;
grant all on public.promo_coupons to service_role;

create or replace function public.redeem_promo_coupon(p_code text)
returns table(code text, discount_percent numeric, used_count integer, max_uses integer)
language plpgsql
security invoker
set search_path = public
as $$
begin
  return query
  update public.promo_coupons as coupon
  set used_count = coupon.used_count + 1,
      updated_at = now()
  where upper(coupon.code) = upper(trim(p_code))
    and coupon.is_active = true
    and (coupon.starts_at is null or coupon.starts_at <= now())
    and (coupon.expires_at is null or coupon.expires_at > now())
    and (coupon.max_uses is null or coupon.used_count < coupon.max_uses)
  returning coupon.code, coupon.discount_percent, coupon.used_count, coupon.max_uses;
end;
$$;

revoke all on function public.redeem_promo_coupon(text) from public, anon, authenticated;
grant execute on function public.redeem_promo_coupon(text) to service_role;