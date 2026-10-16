"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { luxuryPricingDefaults } from "@/lib/luxuryPricing";

function hashSecret(value: string) { return createHash("sha256").update(value).digest("hex"); }
async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export async function saveLuxuryPricing(formData: FormData) {
  await requireAdmin();
  const content: Record<string, number> = {};
  for (const key of Object.keys(luxuryPricingDefaults) as Array<keyof typeof luxuryPricingDefaults>) {
    const raw = String(formData.get(key) ?? "").trim();
    const value = raw === "" ? NaN : Number(raw);
    if (!Number.isFinite(value) || value < 0 || value > 100000) redirect("/admin/luxury-pricing?error=invalid");
    content[key] = value;
  }
  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/luxury-pricing?error=connection");
  const { error } = await supabase.from("website_content_overrides").upsert({
    section: "luxury-pricing", content, updated_at: new Date().toISOString(),
  }, { onConflict: "section" });
  if (error) {
    console.error("Luxury pricing update failed:", error.message);
    redirect("/admin/luxury-pricing?error=save");
  }
  for (const path of ["/luxury-tours", "/luxury-tours/luxor", "/luxury-tours/luxor/book", "/luxury-tours/cairo", "/luxury-tours/cairo/book", "/luxury-tours/speed-boat", "/luxury-tours/speed-boat/book", "/luxury-tours/private-boat", "/luxury-tours/private-boat/book"]) revalidatePath(path);
  revalidatePath("/admin/luxury-pricing");
  redirect("/admin/luxury-pricing?saved=1");
}
