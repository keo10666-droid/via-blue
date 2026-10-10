"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { homepageContentDefaults, mergeHomepageContent } from "@/lib/websiteContent";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export async function updateHomepageContent(formData: FormData) {
  await requireAdmin();

  const content: Record<string, string> = {};
  for (const key of Object.keys(homepageContentDefaults) as Array<keyof typeof homepageContentDefaults>) {
    const value = String(formData.get(key) ?? "").trim();
    if (!value || value.length > 500) redirect("/admin/website-content?error=invalid");
    content[key] = value;
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/website-content?error=connection");

  const { error } = await supabase.from("website_content_overrides").upsert({
    section: "homepage",
    content: mergeHomepageContent(content),
    updated_at: new Date().toISOString(),
  }, { onConflict: "section" });

  if (error) {
    console.error("Homepage content update failed:", error.message);
    redirect("/admin/website-content?error=save");
  }

  revalidatePath("/");
  revalidatePath("/admin/website-content");
  redirect("/admin/website-content?saved=1");
}
