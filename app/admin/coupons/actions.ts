"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

function readCoupon(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const rawPercent = String(formData.get("discount_percent") ?? "").trim();
  const rawAmount = String(formData.get("discount_amount") ?? "").trim();
  const discount = rawPercent ? Number(rawPercent) : null;
  const discountAmount = rawAmount ? Number(rawAmount) : null;
  const rawMax = String(formData.get("max_uses") ?? "").trim();
  const maxUses = rawMax ? Number(rawMax) : null;
  const rawStart = String(formData.get("starts_at") ?? "").trim();
  const rawEnd = String(formData.get("expires_at") ?? "").trim();
  const startsAt = rawStart ? new Date(rawStart) : null;
  const expiresAt = rawEnd ? new Date(rawEnd) : null;
  const isActive = formData.get("is_active") === "on";

  if (!/^[A-Z0-9][A-Z0-9_-]{2,39}$/.test(code)) redirect("/admin/coupons?error=code");
  if ((discount === null) === (discountAmount === null)) redirect("/admin/coupons?error=discount");
  if (discount !== null && (!Number.isFinite(discount) || discount <= 0 || discount > 100)) redirect("/admin/coupons?error=discount");
  if (discountAmount !== null && (!Number.isFinite(discountAmount) || discountAmount <= 0 || discountAmount > 1000000)) redirect("/admin/coupons?error=discount");
  if (maxUses !== null && (!Number.isInteger(maxUses) || maxUses < 1 || maxUses > 10000000)) redirect("/admin/coupons?error=uses");
  if ((startsAt && Number.isNaN(startsAt.getTime())) || (expiresAt && Number.isNaN(expiresAt.getTime())) || (startsAt && expiresAt && expiresAt <= startsAt)) redirect("/admin/coupons?error=dates");

  return {
    code,
    discount_percent: discount,
    discount_amount: discountAmount,
    max_uses: maxUses,
    starts_at: startsAt?.toISOString() ?? null,
    expires_at: expiresAt?.toISOString() ?? null,
    is_active: isActive,
    updated_at: new Date().toISOString(),
  };
}

export async function savePromoCoupon(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/coupons?error=connection");

  const coupon = readCoupon(formData);
  const id = String(formData.get("id") ?? "").trim();
  const query = id
    ? supabase.from("promo_coupons").update(coupon).eq("id", id)
    : supabase.from("promo_coupons").insert(coupon);
  const { error } = await query;
  if (error) {
    console.error("Promo coupon save failed:", error.message);
    redirect(error.code === "23505" ? "/admin/coupons?error=duplicate" : "/admin/coupons?error=save");
  }

  revalidatePath("/admin/coupons");
  revalidatePath("/admin");
  redirect("/admin/coupons?saved=1");
}
