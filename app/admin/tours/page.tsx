import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { tours, tourCategories } from "@/data/tours";
import { updateTourPricing } from "./actions";

type SearchParams = Promise<{ saved?: string; error?: string }>;

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export default async function AdminToursPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return <main className="min-h-screen bg-slate-50 p-6 text-slate-900"><div className="mx-auto max-w-4xl rounded-2xl bg-white p-8"><h1 className="text-2xl font-bold">Tours & Experiences</h1><p className="mt-3 text-red-600">Database connection is not configured. Check the server-side Supabase admin key in Vercel.</p><Link className="mt-5 inline-block text-blue-700 underline" href="/admin">Back to dashboard</Link></div></main>;
  }

  const { data, error } = await supabase.from("tour_catalog_overrides").select("slug,name,description,image,price,child_price,infant_price,available");
  const overrides = new Map((data ?? []).map((item) => [item.slug, item]));
  const tourList = Object.values(tours).sort((a,b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div><Link href="/admin" className="text-sm font-semibold text-blue-700 hover:underline">← Dashboard</Link><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">Tours & Experiences</h1><p className="mt-2 text-sm text-slate-500">Edit tour names, descriptions, images, prices in euros, and booking availability.</p></div>
          <a href="/tours" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold">View tour catalog ↗</a>
        </div>

        {params.saved && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Tour pricing saved. The updated values are stored in the database.</div>}
        {params.error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is unavailable." : params.error === "invalid" ? "Please enter valid prices (0 or more)." : "Could not save changes. Check the database table and server logs."}</div>}
        {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load saved tour prices. Showing the default catalog values. {error.message}</div>}

        <div className="space-y-4">
          {tourList.map((tour) => {
            const saved = overrides.get(tour.slug);
            const adult = saved?.price ?? tour.price;
            const child = saved?.child_price ?? tour.childPrice;
            const infant = saved?.infant_price ?? tour.infantPrice;
            const available = saved?.available ?? tour.available;
            const name = saved?.name ?? tour.name;
            const description = saved?.description ?? tour.description;
            const image = saved?.image ?? tour.image;
            return (
              <form key={tour.slug} action={updateTourPricing} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <input type="hidden" name="slug" value={tour.slug} />
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 lg:max-w-[280px]"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{tourCategories[tour.category]}</p><h2 className="mt-1 text-lg font-extrabold text-blue-950">{name}</h2><p className="mt-1 text-xs text-slate-400">/{tour.slug}</p></div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:min-w-[610px]">
                    <label className="text-xs font-bold text-slate-500">Tour name<input name="name" type="text" maxLength={120} required defaultValue={name} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400" /></label>
                    <label className="text-xs font-bold text-slate-500">Image path or URL<input name="image" type="text" maxLength={500} required defaultValue={image} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400" /></label>
                    <label className="col-span-full text-xs font-bold text-slate-500">Short description<textarea name="description" maxLength={1500} required defaultValue={description} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-orange-400" /></label>
                    <label className="text-xs font-bold text-slate-500">Adult (€)<input name="price" type="number" min="0" max="100000" step="0.01" required defaultValue={adult} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
                    <label className="text-xs font-bold text-slate-500">Child (€)<input name="child_price" type="number" min="0" max="100000" step="0.01" required defaultValue={child} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
                    <label className="text-xs font-bold text-slate-500">Infant (€)<input name="infant_price" type="number" min="0" max="100000" step="0.01" required defaultValue={infant} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
                    <label className="text-xs font-bold text-slate-500">Availability<select name="available" defaultValue={String(available)} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400"><option value="true">Available</option><option value="false">Unavailable</option></select></label>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><span className={`text-xs font-semibold ${saved ? "text-emerald-700" : "text-slate-400"}`}>{saved ? "Custom pricing saved" : "Using current website price"}</span><button type="submit" className="rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">Save changes</button></div>
              </form>
            );
          })}
        </div>
        <p className="mt-6 text-xs leading-5 text-slate-400">Tour name, description, image path/URL and prices are saved in the database and update the live catalog without a redeployment.</p>
      </div>
    </main>
  );
}
