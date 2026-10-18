import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLuxuryPricing, type LuxuryPricing } from "@/lib/luxuryPricing";
import { saveLuxuryPricing } from "./actions";

type SearchParams = Promise<{ saved?: string; error?: string }>;
function hashSecret(value: string) { return createHash("sha256").update(value).digest("hex"); }
async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export const dynamic = "force-dynamic";
export default async function AdminLuxuryPricingPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const pricing: LuxuryPricing = await getLuxuryPricing();
  const groups = [
    { title: "Luxor Private Tour", fields: [
      { name: "luxor_limo_1", label: "Limousine · 1 guest" }, { name: "luxor_limo_2", label: "Limousine · 2 guests" },
      { name: "luxor_xpander_2", label: "Xpander · 2 guests" }, { name: "luxor_xpander_3", label: "Xpander · 3 guests" },
      { name: "luxor_hiace_4", label: "HiAce · first 4 guests" }, { name: "luxor_hiace_extra", label: "HiAce · each extra guest" },
    ] },
    { title: "Cairo · Old Egyptian Museum", fields: [
      { name: "cairo_old_limo_1", label: "Limousine · 1 guest" }, { name: "cairo_old_limo_2", label: "Limousine · 2 guests" },
      { name: "cairo_old_xpander_2", label: "Xpander · 2 guests" }, { name: "cairo_old_xpander_3", label: "Xpander · 3 guests" },
      { name: "cairo_old_hiace_4", label: "HiAce · first 4 guests" }, { name: "cairo_old_hiace_extra", label: "HiAce · each extra guest" },
    ] },
    { title: "Cairo · Grand Egyptian Museum", fields: [
      { name: "cairo_grand_limo_1", label: "Limousine · 1 guest" }, { name: "cairo_grand_limo_2", label: "Limousine · 2 guests" },
      { name: "cairo_grand_xpander_2", label: "Xpander · 2 guests" }, { name: "cairo_grand_xpander_3", label: "Xpander · 3 guests" },
      { name: "cairo_grand_hiace_4", label: "HiAce · first 4 guests" }, { name: "cairo_grand_hiace_extra", label: "HiAce · each extra guest" },
    ] },
    { title: "Boat prices", fields: [
      { name: "speed_boat_up_to_4", label: "Private Speed Boat · 1–4 guests" }, { name: "speed_boat_up_to_8", label: "Private Speed Boat · 5–8 guests" },
      { name: "private_boat_up_to_15", label: "Private Boat · 1–15 guests" }, { name: "private_boat_up_to_30", label: "Private Boat · 16–30 guests" },
    ] },
    { title: "Private Quad Safari", fields: [
      { name: "quad_single_1h", label: "Single Quad · 1 hour" }, { name: "quad_double_1h", label: "Double Quad · 1 hour" },
      { name: "quad_single_3h", label: "Single Quad · 3 hours" }, { name: "quad_double_3h", label: "Double Quad · 3 hours" },
    ] },
    { title: "Private Buggy Safari · 3 hours", fields: [
      { name: "buggy_2_seat", label: "2-person buggy · per buggy" }, { name: "buggy_4_seat", label: "4-person buggy · per buggy" },
    ] },
    { title: "Optional island extras · per person", fields: [
      { name: "island_paradise", label: "Paradise Island" }, { name: "island_orange", label: "Orange Bay" },
      { name: "island_hula", label: "Hula Hula" }, { name: "island_magaweesh", label: "Magawish" },
      { name: "island_amwaj", label: "Amwaj" }, { name: "island_eden", label: "Eden Island" },
      { name: "island_ouzeria", label: "Ouzeria" }, { name: "island_mahmya", label: "Mahmya" },
    ] },
  ] as const;
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-5">
        <Link href="/admin" className="text-sm font-semibold text-blue-700 hover:underline">← Dashboard</Link>
        <header className="rounded-3xl bg-blue-950 p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Via Blue · Management</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Luxury Tours Pricing</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100">Edit tour prices, vehicle prices, boat prices by group size, and optional island fees per person. These values power the luxury tour cards and booking calculator. All prices are in euros.</p>
        </header>
        {params.saved && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Luxury prices saved. The public cards and booking calculator now use these values.</div>}
        {params.error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is unavailable." : params.error === "invalid" ? "Enter a valid price between €0 and €100,000 in every field." : "Could not save luxury prices. Please check the database connection and try again."}</div>}
        <form action={saveLuxuryPricing} className="space-y-5">
          {groups.map((group) => (
            <section key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-extrabold text-blue-950">{group.title}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.fields.map((field) => (
                  <label key={field.name} className="text-xs font-bold text-slate-600">{field.label}
                    <span className="mt-1 flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                      <span className="mr-2 text-slate-400">€</span>
                      <input name={field.name} type="number" min="0" max="100000" step="1" required defaultValue={pricing[field.name as keyof LuxuryPricing]} className="w-full min-w-0 py-3 text-sm text-slate-900 outline-none" />
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}
          <div className="sticky bottom-3 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">Changes here update the corresponding Luxury Tours cards and booking calculators. All prices are in euros.</p>
            <button type="submit" className="shrink-0 rounded-xl bg-orange-500 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-orange-600">Save luxury prices</button>
          </div>
        </form>
      </div>
    </main>
  );
}
