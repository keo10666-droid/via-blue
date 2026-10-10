"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { tours } from "@/data/tours";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export async function updateTourPricing(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") || "");
  const tour = tours[slug as keyof typeof tours];
  if (!tour) redirect("/admin/tours?error=invalid");

  const parsePrice = (key: string) => {
    const raw = String(formData.get(key) ?? "");
    const value = Number(raw);
    return raw.trim() !== "" && Number.isFinite(value) && value >= 0 && value <= 100000
      ? value
      : null;
  };

  const price = parsePrice("price");
  const childPrice = parsePrice("child_price");
  const infantPrice = parsePrice("infant_price");
  if (price === null || childPrice === null || infantPrice === null) {
    redirect("/admin/tours?error=invalid");
  }

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  if (!name || name.length > 120 || !description || description.length > 1500 || !image || image.length > 500 || !(image.startsWith("/") || /^https:\/\//i.test(image))) {
    redirect("/admin/tours?error=content");
  }

  const available = String(formData.get("available")) === "true";
  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/tours?error=connection");

  const { error } = await supabase.from("tour_catalog_overrides").upsert({
    slug,
    name,
    description,
    image,
    price,
    child_price: childPrice,
    infant_price: infantPrice,
    available,
    updated_at: new Date().toISOString(),
  }, { onConflict: "slug" });

  if (error) {
    console.error("Tour pricing update failed:", error.message);
    redirect("/admin/tours?error=save");
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  revalidatePath(`/tours/${slug}/book`);
  redirect("/admin/tours?saved=1");
}
