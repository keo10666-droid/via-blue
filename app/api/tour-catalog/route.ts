import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ overrides: {} }, { headers: { "Cache-Control": "no-store" } });
  const { data, error } = await supabase
    .from("tour_catalog_overrides")
    .select("slug,name,description,image,price,child_price,infant_price,available");
  if (error) {
    console.error("Tour catalog overrides could not be loaded:", error.message);
    return NextResponse.json({ overrides: {} }, { headers: { "Cache-Control": "no-store" } });
  }
  const overrides = Object.fromEntries((data ?? []).map((item) => [item.slug, {
    ...(item.name ? { name: item.name } : {}),
    ...(item.description ? { description: item.description } : {}),
    ...(item.image ? { image: item.image } : {}),
    price: Number(item.price),
    childPrice: Number(item.child_price),
    infantPrice: Number(item.infant_price),
    available: item.available,
  }]));
  return NextResponse.json({ overrides }, { headers: { "Cache-Control": "no-store" } });
}
