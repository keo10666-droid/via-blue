import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { isRateLimited } from "@/lib/apiRateLimit";

export async function POST(request: Request) {
  try {
    if (await isRateLimited(request, "promo-code-validate", 30, 3600)) {
      return Response.json({ valid: false, error: "Too many attempts. Please try again later." }, { status: 429 });
    }
    const body = await request.json().catch(() => null);
    const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
    if (!/^[A-Z0-9][A-Z0-9_-]{2,39}$/.test(code)) {
      return Response.json({ valid: false, error: "Enter a valid promo code." }, { status: 400 });
    }
    const supabase = createSupabaseAdminClient();
    if (!supabase) return Response.json({ valid: false, error: "Promo codes are temporarily unavailable." }, { status: 503 });
    const { data, error } = await supabase.from("promo_coupons")
      .select("code,discount_percent,max_uses,used_count,starts_at,expires_at,is_active")
      .eq("code", code).maybeSingle();
    if (error) throw error;
    const now = Date.now();
    if (!data || !data.is_active || (data.starts_at && new Date(data.starts_at).getTime() > now) ||
      (data.expires_at && new Date(data.expires_at).getTime() <= now) ||
      (data.max_uses !== null && data.used_count >= data.max_uses)) {
      return Response.json({ valid: false, error: "This promo code is invalid, expired, or no longer available." }, { status: 400 });
    }
    return Response.json({ valid: true, code: data.code, discountPercent: Number(data.discount_percent) });
  } catch (error) {
    console.error("Promo code validation failed:", error instanceof Error ? error.message : "unknown");
    return Response.json({ valid: false, error: "Could not validate this code right now." }, { status: 500 });
  }
}
