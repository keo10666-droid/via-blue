"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { transfers } from "@/data/transfers";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export async function updateTransferPricing(formData: FormData) {
  await requireAdmin();
  const slug = String(formData.get("slug") || "");
  const base = transfers[slug as keyof typeof transfers];
  if (!base) redirect("/admin/transfers?error=invalid");

  const from = String(formData.get("from_location") || "").trim();
  const to = String(formData.get("to_location") || "").trim();
  if (!from || !to || from.length > 160 || to.length > 160) redirect("/admin/transfers?error=invalid");

  const vehicles = base.vehicles.map((vehicle, index) => {
    const type = String(formData.get(`vehicle_type_${index}`) || "").trim();
    const numberField = (key: string, fallback: number) => {
      const raw = String(formData.get(`${key}_${index}`) ?? fallback);
      const value = Number(raw);
      return raw.trim() !== "" && Number.isFinite(value) && value >= 0 && value <= 100000 ? value : null;
    };
    const price = numberField("vehicle_price", vehicle.price);
    const passengers = numberField("vehicle_passengers", vehicle.passengers);
    const luggage = numberField("vehicle_luggage", vehicle.luggage);
    if (!type || type.length > 80 || price === null || passengers === null || luggage === null) return null;
    return { type, price, passengers: Math.floor(passengers), luggage: Math.floor(luggage) };
  });
  if (vehicles.some((vehicle) => vehicle === null)) redirect("/admin/transfers?error=invalid");

  const available = String(formData.get("available")) === "true";
  const supabase = createSupabaseAdminClient();
  if (!supabase) redirect("/admin/transfers?error=connection");

  const { error } = await supabase.from("transfer_catalog_overrides").upsert({
    slug,
    from_location: from,
    to_location: to,
    available,
    vehicles,
    updated_at: new Date().toISOString(),
  }, { onConflict: "slug" });

  if (error) {
    console.error("Transfer catalog update failed:", error.message);
    redirect("/admin/transfers?error=save");
  }

  revalidatePath("/admin/transfers");
  revalidatePath("/transfers");
  revalidatePath(`/transfers/${slug}`);
  revalidatePath(`/transfers/${slug}/book`);
  redirect("/admin/transfers?saved=1");
}
