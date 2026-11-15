import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAdmin } from "@/app/admin/login/actions";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import SimCardSettingsEditor from "./settings-editor";

const defaults = {
  packages: [{ id: "standard", name: "25 GB + Calls", dataGb: 25, description: "25 GB mobile data with local calls", prices: { EUR: 10, USD: 10, GBP: 10 }, active: true }],
  deliveryPrices: { EUR: 5, USD: 5, GBP: 5 },
  networks: [
    { id: "Orange", name: "Orange", logo: "https://cdn.simpleicons.org/orange/FF7900", active: true, popular: true },
    { id: "Vodafone", name: "Vodafone", logo: "https://cdn.simpleicons.org/vodafone/E60000", active: true, popular: false },
    { id: "Etisalat", name: "e&", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Eand_Logo_EN.svg", active: true, popular: false },
    { id: "WE", name: "WE", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/We_logo.svg", active: true, popular: false },
  ],
};

async function requireAdmin() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  const cookie = (await cookies()).get("via_blue_admin")?.value;
  if (!password || cookie !== createHash("sha256").update(password).digest("hex")) redirect("/admin/login");
}

export default async function SimCardSettingsPage() {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  let settings: typeof defaults = defaults;
  let loadError = false;
  if (supabase) {
    const { data, error } = await supabase.from("sim_card_settings").select("settings").eq("id", "default").maybeSingle();
    if (error) loadError = true;
    else if (data?.settings) settings = data.settings as typeof defaults;
  } else loadError = true;

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <header className="bg-blue-950 px-5 py-9 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.25em] text-orange-300">Via Blue · Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold">SIM Card Settings</h1>
            <p className="mt-2 text-sm text-blue-100">Manage packages, prices, delivery and mobile networks</p>
          </div>
          <div className="flex gap-2">
            <a href="/admin" className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold">Dashboard</a>
            <a href="/admin/sim-cards" className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold">SIM orders</a>
            <form action={logoutAdmin}><button className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold">Log out</button></form>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        {loadError && <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Settings could not be loaded from the database. Defaults are shown; saving will retry the connection.</p>}
        <SimCardSettingsEditor initialSettings={settings} />
      </section>
    </main>
  );
}
