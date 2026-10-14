import Link from "next/link";
import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TicketPercent, Tag, CircleCheck, CircleOff } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { savePromoCoupon } from "./actions";

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookieValue !== hashSecret(password)) redirect("/admin/login");
}
function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelClass = "block text-xs font-bold uppercase tracking-wide text-slate-500";

export default async function PromoCouponsPage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  await requireAdmin();
  const params = await searchParams;
  const supabase = createSupabaseAdminClient();
  if (!supabase) return <main className="min-h-screen bg-slate-50 p-8 text-slate-900">Supabase admin connection is unavailable. Check Vercel server environment variables.</main>;
  const { data, error } = await supabase.from("promo_coupons").select("id,code,discount_percent,discount_amount,max_uses,used_count,starts_at,expires_at,is_active,created_at").order("created_at", { ascending: false });
  const coupons = data ?? [];
  const errors: Record<string, string> = {
    connection: "Database connection is unavailable.",
    code: "Use 3–40 characters: letters, numbers, hyphens or underscores.",
    discount: "Enter either a percentage (up to 100%) or a fixed amount greater than zero — not both.",
    uses: "Maximum uses must be a positive whole number, or leave it blank for unlimited use.",
    dates: "Check the dates: the end date must be after the start date.",
    duplicate: "That coupon code already exists. Choose a unique code.",
    save: "Could not save this coupon. Please try again.",
  };
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-7 text-slate-900 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin" className="text-sm font-bold text-blue-700 hover:underline">← Dashboard</Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-500">Via Blue · Promotions</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">Promo codes</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Create discount codes for tour bookings, control usage limits, and switch offers on or off at any time.</p></div>
          <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><TicketPercent size={23} /></span><div><p className="text-xs font-semibold text-slate-500">Active offers</p><p className="text-xl font-extrabold text-blue-950">{coupons.filter((c) => c.is_active).length}</p></div></div>
        </div>
        {params.saved && <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">Promo code saved successfully.</div>}
        {params.error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{errors[params.error] ?? "Something went wrong."}</div>}
        {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Could not load coupons: {error.message}</div>}

        <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Tag size={20} /></span><div><h2 className="text-lg font-extrabold text-blue-950">Create a promo code</h2><p className="mt-0.5 text-sm text-slate-500">Set the discount and usage rules.</p></div></div>
          <form action={savePromoCoupon} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className={labelClass}>Coupon code<input name="code" required minLength={3} maxLength={40} pattern="[A-Za-z0-9][A-Za-z0-9_-]{2,39}" placeholder="SUMMER15" className={fieldClass} /></label>
            <label className={labelClass}>Discount (%)<input name="discount_percent" type="number" min="0.01" max="100" step="0.01" placeholder="e.g. 15" className={fieldClass} /></label>
            <label className={labelClass}>Fixed discount (€)<input name="discount_amount" type="number" min="0.01" max="1000000" step="0.01" placeholder="e.g. 10.00" className={fieldClass} /></label>
            <p className="text-xs leading-5 text-slate-500 sm:col-span-2 lg:col-span-3">Fill in one discount field only. Percentage and fixed amount cannot be combined.</p>
            <label className={labelClass}>Maximum uses <input name="max_uses" type="number" min="1" max="10000000" step="1" placeholder="Unlimited if blank" className={fieldClass} /></label>
            <label className={labelClass}>Starts at (optional)<input name="starts_at" type="datetime-local" className={fieldClass} /></label>
            <label className={labelClass}>Expires at (optional)<input name="expires_at" type="datetime-local" className={fieldClass} /></label>
            <label className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm font-bold text-emerald-800"><input name="is_active" type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-600" /> Activate this code immediately</label>
            <div className="sm:col-span-2 lg:col-span-3"><button className="rounded-xl bg-blue-950 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-800">Create promo code</button></div>
          </form>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="text-xl font-extrabold text-blue-950">Your promo codes</h2><p className="mt-1 text-sm text-slate-500">Usage counts update when a code is redeemed with a booking request.</p></div><span className="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600">{coupons.length} total</span></div>
          {coupons.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><TicketPercent className="mx-auto text-slate-400" size={32} /><p className="mt-3 font-bold text-slate-700">No promo codes yet</p><p className="mt-1 text-sm text-slate-500">Create your first code above.</p></div> : <div className="space-y-4">{coupons.map((coupon) => (
            <article key={coupon.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-800 shadow-sm"><TicketPercent size={20} /></span><div><p className="font-extrabold tracking-wide text-blue-950">{coupon.code}</p><p className="text-xs text-slate-500">{coupon.discount_percent !== null ? `${coupon.discount_percent}% off` : `€${Number(coupon.discount_amount).toFixed(2)} off`}</p></div></div><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${coupon.is_active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>{coupon.is_active ? <><CircleCheck size={14} /> Active</> : <><CircleOff size={14} /> Paused</>}</span></div>
              <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">Used</p><p className="mt-1 text-lg font-extrabold text-blue-950">{coupon.used_count}{coupon.max_uses ? <span className="text-sm font-semibold text-slate-400"> / {coupon.max_uses}</span> : <span className="text-sm font-semibold text-slate-400"> / ∞</span>}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">Starts</p><p className="mt-1 text-sm font-bold text-slate-700">{coupon.starts_at ? new Date(coupon.starts_at).toLocaleString("en-GB") : "Immediately"}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">Expires</p><p className="mt-1 text-sm font-bold text-slate-700">{coupon.expires_at ? new Date(coupon.expires_at).toLocaleString("en-GB") : "No expiry"}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">Remaining</p><p className="mt-1 text-lg font-extrabold text-blue-950">{coupon.max_uses === null ? "Unlimited" : Math.max(0, coupon.max_uses - coupon.used_count)}</p></div></div>
              <form action={savePromoCoupon} className="grid grid-cols-1 gap-3 border-t border-slate-100 p-5 sm:grid-cols-2 lg:grid-cols-3"><input type="hidden" name="id" value={coupon.id} /><label className={labelClass}>Code<input name="code" required minLength={3} maxLength={40} pattern="[A-Za-z0-9][A-Za-z0-9_-]{2,39}" defaultValue={coupon.code} className={fieldClass} /></label><label className={labelClass}>Discount (%)<input name="discount_percent" type="number" min="0.01" max="100" step="0.01" defaultValue={coupon.discount_percent ?? ""} placeholder="e.g. 15" className={fieldClass} /></label><label className={labelClass}>Fixed discount (€)<input name="discount_amount" type="number" min="0.01" max="1000000" step="0.01" defaultValue={coupon.discount_amount ?? ""} placeholder="e.g. 10.00" className={fieldClass} /></label><label className={labelClass}>Maximum uses<input name="max_uses" type="number" min="1" max="10000000" step="1" defaultValue={coupon.max_uses ?? ""} placeholder="Unlimited if blank" className={fieldClass} /></label><label className={labelClass}>Starts at<input name="starts_at" type="datetime-local" defaultValue={toDateTimeLocal(coupon.starts_at)} className={fieldClass} /></label><label className={labelClass}>Expires at<input name="expires_at" type="datetime-local" defaultValue={toDateTimeLocal(coupon.expires_at)} className={fieldClass} /></label><label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"><input name="is_active" type="checkbox" defaultChecked={coupon.is_active} className="h-4 w-4 accent-emerald-600" /> Code is active</label><div className="sm:col-span-2 lg:col-span-3 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-400">Fill in either discount field. Editing a code keeps its usage count.</p><button className="rounded-xl border border-blue-950 bg-white px-5 py-3 text-sm font-extrabold text-blue-950 transition hover:bg-blue-50">Save changes</button></div></form>
            </article>
          ))}</div>}
        </section>
      </div>
    </main>
  );
}
