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

  if (!password || cookieValue !== hashSecret(password)) {
    redirect("/admin/login");
  }
}

export async function updateReviewVisibility(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const visibleValue = String(formData.get("visible") || "");

  if (!/^[0-9a-f-]{36}$/i.test(id) || !["true", "false"].includes(visibleValue)) {
    redirect("/admin/reviews?error=invalid");
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/reviews?error=connection");

  const { error } = await supabase
    .from("reviews")
    .update({ is_visible: visibleValue === "true" })
    .eq("id", id);

  if (error) redirect("/admin/reviews?error=save");

  revalidatePath("/admin/reviews");
  revalidatePath("/");

  redirect("/admin/reviews?saved=1");
}
