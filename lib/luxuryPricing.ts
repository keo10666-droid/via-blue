import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const luxuryPricingDefaults = {
  "luxor_limo_1": 320,
  "luxor_limo_2": 350,
  "luxor_xpander_2": 350,
  "luxor_xpander_3": 390,
  "luxor_hiace_4": 450,
  "luxor_hiace_extra": 40,
  "cairo_old_limo_1": 300,
  "cairo_old_limo_2": 340,
  "cairo_old_xpander_2": 340,
  "cairo_old_xpander_3": 380,
  "cairo_old_hiace_4": 450,
  "cairo_old_hiace_extra": 40,
  "cairo_grand_limo_1": 325,
  "cairo_grand_limo_2": 390,
  "cairo_grand_xpander_2": 390,
  "cairo_grand_xpander_3": 450,
  "cairo_grand_hiace_4": 510,
  "cairo_grand_hiace_extra": 60,
  "speed_boat_up_to_4": 180,
  "speed_boat_up_to_8": 250,
  "private_boat_up_to_15": 450,
  "private_boat_up_to_30": 600,
  "island_paradise": 20,
  "island_orange": 10,
  "island_hula": 10,
  "island_magaweesh": 10,
  "island_amwaj": 10,
  "island_eden": 35,
  "island_ouzeria": 35,
  "island_mahmya": 60
} as const;
export type LuxuryPricing = { [K in keyof typeof luxuryPricingDefaults]: number };

export async function getLuxuryPricing(): Promise<LuxuryPricing> {
  const pricing: LuxuryPricing = { ...luxuryPricingDefaults };
  const supabase = createSupabaseAdminClient();
  if (!supabase) return pricing;

  const { data, error } = await supabase
    .from("website_content_overrides")
    .select("content")
    .eq("section", "luxury-pricing")
    .maybeSingle();

  if (error || !data?.content || typeof data.content !== "object") return pricing;
  const saved = data.content as Record<string, unknown>;
  for (const key of Object.keys(luxuryPricingDefaults) as Array<keyof LuxuryPricing>) {
    const value = saved[key];
    const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
    if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 100000) pricing[key] = parsed;
  }
  return pricing;
}
