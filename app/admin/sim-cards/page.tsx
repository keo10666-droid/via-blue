import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAdmin } from "@/app/admin/login/actions";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

type OrderRow = {
  id: string;
  reference_code: string;
  booking_name: string;
  customer_name: string | null;
  customer_whatsapp: string | null;
  trip_date: string | null;
  total_price: string | null;
  status: string;
  fields: { label: string; value: string }[];
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

function statusStyle(status: string) {
  if (status === "confirmed") return "bg-emerald-50 text-emerald-700";
  if (status === "cancelled") return "bg-red-50 text-red-700";
  if (status === "under_review") return "bg-blue-50 text-blue-700";
  return "bg-orange-50 text-orange-700";
}

export default async function AdminSimCardsPage() {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  let orders: OrderRow[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("booking_requests")
      .select("id, reference_code, booking_name, customer_name, customer_whatsapp, trip_date, total_price, status, fields, created_at")
      .eq("booking_type", "sim_card")
      .order("created_at", { ascending: false })
      .limit(200);
    loadError = Boolean(error);
    orders = (data || []) as OrderRow[];
  } else {
    loadError = true;
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <section className="relative overflow-hidden bg-blue-950 px-5 py-10 text-white md:px-8 md:py-14">
        <div className="absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-300">Via Blue · Admin</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">SIM Card Orders</h1>
              <p className="mt-3 text-sm text-blue-100">Review SIM orders, network selection, delivery details and customer contact information</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/admin" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold">Dashboard</a>
              <a href="/admin/bookings" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold">All bookings</a>
              <form action={logoutAdmin}><button type="submit" className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold">Log Out</button></form>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total SIM orders</p><p className="mt-2 text-3xl font-black text-blue-950">{orders.length}</p></div>
          <div className="rounded-2xl border border-orange-100 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">New orders</p><p className="mt-2 text-3xl font-black text-orange-500">{orders.filter((order) => order.status === "received").length}</p></div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Confirmed</p><p className="mt-2 text-3xl font-black text-emerald-600">{orders.filter((order) => order.status === "confirmed").length}</p></div>
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-red-200 bg-white p-6 text-sm font-semibold text-red-700">Could not load SIM orders. Check the Supabase server configuration and try again.</div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-extrabold text-blue-950">No SIM orders yet</h2>
            <p className="mt-2 text-sm text-slate-500">New customer orders will appear here automatically</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={"rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider " + statusStyle(order.status)}>{order.status.replace("_", " ")}</span>
                      <span className="text-xs font-bold text-orange-600">{order.reference_code}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-extrabold text-blue-950">{order.booking_name}</h2>
                    <p className="mt-1 text-xs text-slate-400">{new Date(order.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</p>
                  </div>
                  <div className="rounded-xl bg-blue-950 px-5 py-3 text-right text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Order total</p>
                    <p className="mt-1 text-2xl font-black text-orange-300">{order.total_price || "—"}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(order.fields || []).map((field, index) => (
                    <div key={field.label + index} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">{field.label}</p>
                      <p className="mt-1 break-words text-sm font-bold text-slate-800">{field.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500">{order.customer_name || "Guest"}</span>
                  {order.customer_whatsapp && <a className="text-xs font-bold text-emerald-700 underline" href={"https://wa.me/" + order.customer_whatsapp.replace(/[^0-9]/g, "")}>WhatsApp customer</a>}
                  {order.trip_date && <span className="text-xs text-slate-500">Arrival: {order.trip_date}</span>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
