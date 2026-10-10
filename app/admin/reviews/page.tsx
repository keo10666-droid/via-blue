import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, MessageSquareText, Star } from "lucide-react";

import { logoutAdmin } from "@/app/admin/login/actions";
import { updateReviewVisibility } from "./actions";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

type ReviewRow = {
  id: string;
  tour_slug: string;
  tour_name: string;
  guest_name: string;
  rating: number;
  comment: string;
  is_visible: boolean;
  created_at: string;
};

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white p-8">
          <h1 className="text-2xl font-extrabold text-blue-950">Reviews are not connected</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Configure the server-side Supabase admin key in Vercel before managing reviews.</p>
          <a href="/admin" className="mt-5 inline-block text-sm font-bold text-blue-800">Back to dashboard</a>
        </div>
      </main>
    );
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id,tour_slug,tour_name,guest_name,rating,comment,is_visible,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const reviews = (data || []) as ReviewRow[];

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <a href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-900"><ArrowLeft size={15} /> Admin overview</a>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl">Customer reviews</h1>
            <p className="mt-1 text-sm text-slate-500">Choose which reviews are visible on the public website.</p>
          </div>
          <form action={logoutAdmin}><button className="rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900" type="submit">Log out</button></form>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-7 sm:px-8">
        {params.saved && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Review visibility updated.</div>}
        {params.error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is not configured." : params.error === "invalid" ? "The review details were invalid." : "Could not save this change. Please try again."}</div>}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Could not load reviews. Check the database connection and permissions.</div>}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-semibold text-slate-500">All reviews</p><p className="mt-2 text-3xl font-extrabold text-blue-950">{reviews.length}</p></div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-5"><p className="text-sm font-semibold text-slate-500">Visible on website</p><p className="mt-2 text-3xl font-extrabold text-emerald-700">{reviews.filter((review) => review.is_visible).length}</p></div>
          <div className="rounded-2xl border border-orange-100 bg-white p-5"><p className="text-sm font-semibold text-slate-500">Hidden</p><p className="mt-2 text-3xl font-extrabold text-orange-600">{reviews.filter((review) => !review.is_visible).length}</p></div>
        </div>

        {reviews.length === 0 && !error ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
            <MessageSquareText size={28} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-lg font-extrabold text-slate-900">No reviews in the database yet</h2>
            <p className="mt-2 text-sm text-slate-500">Customer reviews will appear here when they are stored in Supabase.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold text-slate-900">{review.guest_name || "Guest"}</h2>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${review.is_visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{review.is_visible ? "Visible" : "Hidden"}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{review.tour_name || review.tour_slug} · {new Date(review.created_at).toLocaleDateString("en-GB", { dateStyle: "medium" })}</p>
                    <div className="mt-3 flex items-center gap-1 text-amber-500" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < review.rating ? "currentColor" : "none"} />)}
                      <span className="ml-1 text-xs font-bold text-slate-600">{review.rating}/5</span>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{review.comment}</p>
                  </div>
                  <form action={updateReviewVisibility} className="shrink-0">
                    <input type="hidden" name="id" value={review.id} />
                    <input type="hidden" name="visible" value={review.is_visible ? "false" : "true"} />
                    <button type="submit" className={`w-full rounded-xl px-4 py-2.5 text-sm font-bold transition sm:w-auto ${review.is_visible ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}>{review.is_visible ? "Hide review" : "Publish review"}</button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
