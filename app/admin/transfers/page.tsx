import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { transfers } from "@/data/transfers";
import { updateTransferPricing } from "./actions";

type SearchParams = Promise<{ saved?: string; error?: string }>;
type Vehicle = { type: string; price: number; passengers: number; luggage: number };

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}

export default async function AdminTransfersPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return <main className="min-h-screen bg-slate-50 p-6 text-slate-900"><div className="mx-auto max-w-4xl rounded-2xl bg-white p-8"><h1 className="text-2xl font-bold">Transfers & Vehicles</h1><p className="mt-3 text-red-600">Database connection is not configured. Check the server-side Supabase admin key in Vercel.</p><Link className="mt-5 inline-block text-blue-700 underline" href="/admin">Back to dashboard</Link></div></main>;
  }

  const { data, error } = await supabase.from("transfer_catalog_overrides").select("slug,from_location,to_location,available,vehicles");
  const overrides = new Map((data ?? []).map((item) => [item.slug, item]));
  const routes = Object.values(transfers).sort((a,b) => a.to.localeCompare(b.to));

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div><Link href="/admin" className="text-sm font-semibold text-blue-700 hover:underline">← Dashboard</Link><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950">Transfers & Vehicles</h1><p className="mt-2 text-sm text-slate-500">Edit routes, vehicle prices, passenger capacity and luggage allowance.</p></div>
          <a href="/transfers" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold">View transfers ↗</a>
        </div>
        {params.saved && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Transfer details saved. The public pages will use the updated values.</div>}
        {params.error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{params.error === "connection" ? "Supabase admin connection is unavailable." : params.error === "invalid" ? "Check the route names and vehicle values. Prices and capacities must be valid non-negative numbers." : "Could not save changes. Check the database table and server logs."}</div>}
        {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load saved transfer values. Showing defaults. {error.message}</div>}

        <div className="space-y-5">
          {routes.map((route) => {
            const saved = overrides.get(route.slug);
            const savedVehicles = Array.isArray(saved?.vehicles) ? saved.vehicles as Vehicle[] : null;
            const vehicles: Vehicle[] = route.vehicles.map((vehicle, index) => {
              const override = savedVehicles?.find((item) => item.type === vehicle.type) ?? savedVehicles?.[index];
              return { type: override?.type ?? vehicle.type, price: Number(override?.price ?? vehicle.price), passengers: Number(override?.passengers ?? vehicle.passengers), luggage: Number(override?.luggage ?? vehicle.luggage) };
            });
            return (
              <form key={route.slug} action={updateTransferPricing} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <input type="hidden" name="slug" value={route.slug} />
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-lg font-extrabold text-blue-950">{route.name}</h2><p className="mt-1 text-xs text-slate-400">/{route.slug}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${saved ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{saved ? "Custom values saved" : "Using website defaults"}</span></div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="text-xs font-bold text-slate-500">From<input name="from_location" required maxLength={160} defaultValue={saved?.from_location ?? route.from} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400" /></label>
                  <label className="text-xs font-bold text-slate-500">To<input name="to_location" required maxLength={160} defaultValue={saved?.to_location ?? route.to} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:border-orange-400" /></label>
                  <label className="text-xs font-bold text-slate-500">Route status<select name="available" defaultValue={String(saved?.available ?? route.available)} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900"><option value="true">Available</option><option value="false">Unavailable</option></select></label>
                </div>
                <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[640px] text-left"><thead><tr className="border-b border-slate-100 text-xs text-slate-400"><th className="pb-3 pr-3">Vehicle type</th><th className="pb-3 pr-3">Price (€)</th><th className="pb-3 pr-3">Passengers</th><th className="pb-3">Luggage</th></tr></thead><tbody>
                  {vehicles.map((vehicle, index) => <tr key={route.slug + vehicle.type} className="border-b border-slate-50 last:border-0"><td className="py-3 pr-3"><input name={`vehicle_type_${index}`} required maxLength={80} defaultValue={vehicle.type} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900" /></td><td className="py-3 pr-3"><input name={`vehicle_price_${index}`} type="number" min="0" max="100000" step="0.01" required defaultValue={vehicle.price} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900" /></td><td className="py-3 pr-3"><input name={`vehicle_passengers_${index}`} type="number" min="1" max="100" step="1" required defaultValue={vehicle.passengers} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900" /></td><td className="py-3"><input name={`vehicle_luggage_${index}`} type="number" min="0" max="100" step="1" required defaultValue={vehicle.luggage} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900" /></td></tr>)}
                </tbody></table></div>
                <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-4"><button type="submit" className="rounded-xl bg-blue-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800">Save route</button></div>
              </form>
            );
          })}
        </div>
      </div>
    </main>
  );
}
