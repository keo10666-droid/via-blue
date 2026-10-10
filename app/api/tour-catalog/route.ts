import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { tours } from "@/data/tours";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ overrides: {}, customTours: [] }, { headers: { "Cache-Control": "no-store" } });
  const { data, error } = await supabase
    .from("tour_catalog_overrides")
    .select("slug,category,name,description,image,price,child_price,infant_price,available");
  if (error) {
    console.error("Tour catalog overrides could not be loaded:", error.message);
    return NextResponse.json({ overrides: {}, customTours: [] }, { headers: { "Cache-Control": "no-store" } });
  }
  const rows = data ?? [];
  const overrides = Object.fromEntries(rows.map((item) => [item.slug, {
    ...(item.name ? { name: item.name } : {}),
    ...(item.description ? { description: item.description } : {}),
    ...(item.image ? { image: item.image } : {}),
    ...(item.category ? { category: item.category } : {}),
    price: Number(item.price),
    childPrice: Number(item.child_price),
    infantPrice: Number(item.infant_price),
    available: item.available,
  }]));
  const customTours = rows
    .filter((item) => !Object.prototype.hasOwnProperty.call(tours, item.slug) && item.category)
    .map((item) => ({
      slug: item.slug,
      category: item.category,
      name: item.name || item.slug,
      description: item.description || "",
      image: item.image || "/images/via-blue-hero.webp",
      price: Number(item.price),
      childPrice: Number(item.child_price),
      infantPrice: Number(item.infant_price),
      available: item.available,
      badge: "New Experience",
      rating: 0,
      reviews: 0,
      type: item.category,
    }));
  return NextResponse.json({ overrides, customTours }, { headers: { "Cache-Control": "no-store" } });
}
