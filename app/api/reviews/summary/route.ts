import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Reviews are temporarily unavailable." }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("tour_slug, rating")
    .eq("is_visible", true);

  if (error) {
    return NextResponse.json({ error: "Could not load review summaries." }, { status: 500 });
  }

  const summaries: Record<string, { average: number; count: number }> = {};

  for (const review of data ?? []) {
    if (!review.tour_slug || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) continue;
    const current = summaries[review.tour_slug] ?? { average: 0, count: 0 };
    const total = current.average * current.count + review.rating;
    current.count += 1;
    current.average = total / current.count;
    summaries[review.tour_slug] = current;
  }

  return NextResponse.json(
    { summaries },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
