alter table public.promo_coupons
  alter column discount_percent drop not null;

alter table public.promo_coupons
  drop constraint if exists promo_coupons_discount_percent_check;

alter table public.promo_coupons
  add column if not exists discount_amount numeric(10,2) null
  check (discount_amount is null or discount_amount > 0);

alter table public.promo_coupons
  drop constraint if exists promo_coupons_discount_type_check;

alter table public.promo_coupons
  add constraint promo_coupons_discount_type_check
  check (
    (discount_percent is not null and discount_percent > 0 and discount_percent <= 100 and discount_amount is null)
    or
    (discount_percent is null and discount_amount is not null and discount_amount > 0)
  );

drop function if exists public.redeem_promo_coupon(text);

create function public.redeem_promo_coupon(p_code text)
returns table(code text, discount_percent numeric, discount_amount numeric, used_count integer, max_uses integer)
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
  returning coupon.code, coupon.discount_percent, coupon.discount_amount, coupon.used_count, coupon.max_uses;
end;
$$;

revoke all on function public.redeem_promo_coupon(text) from public, anon, authenticated;
grant execute on function public.redeem_promo_coupon(text) to service_role;