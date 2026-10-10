"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { mergeSiteSettings, siteSettingsDefaults } from "@/lib/siteSettings";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();

  const settings: Record<string, string> = {};
  for (const key of Object.keys(siteSettingsDefaults) as Array<keyof typeof siteSettingsDefaults>) {
    const value = String(formData.get(key) ?? "").trim();
    const max = key === "seo_description" ? 320 : key === "seo_keywords" ? 1000 : 160;
    if (!value || value.length > max) redirect("/admin/site-settings?error=invalid");
    settings[key] = value;
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/site-settings?error=connection");

  const { error } = await supabase.from("website_content_overrides").upsert({
    section: "site-settings",
    content: mergeSiteSettings(settings),
    updated_at: new Date().toISOString(),
  }, { onConflict: "section" });

  if (error) {
    console.error("Site settings update failed:", error.message);
    redirect("/admin/site-settings?error=save");
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/site-settings");
  redirect("/admin/site-settings?saved=1");
}
