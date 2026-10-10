import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ overrides: {} }, { headers: { "Cache-Control": "no-store" } });
  const { data, error } = await supabase
    .from("transfer_catalog_overrides")
    .select("slug,from_location,to_location,available,vehicles");
  if (error) {
    console.error("Transfer catalog overrides could not be loaded:", error.message);
    return NextResponse.json({ overrides: {} }, { headers: { "Cache-Control": "no-store" } });
  }
  const overrides = Object.fromEntries((data ?? []).map((item) => [item.slug, {
    from: item.from_location,
    to: item.to_location,
    available: item.available,
    vehicles: item.vehicles,
  }]));
  return NextResponse.json({ overrides }, { headers: { "Cache-Control": "no-store" } });
}
