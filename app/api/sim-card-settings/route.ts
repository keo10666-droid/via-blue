import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

function isAdminCookie(value: string | undefined, password: string | undefined) {
  if (!value || !password) return false;
  return value === createHash("sha256").update(password).digest("hex");
}

export async function GET() {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return Response.json({ success: false, error: "Settings are temporarily unavailable." }, { status: 503 });
  const { data, error } = await supabase.from("sim_card_settings").select("settings").eq("id", "default").maybeSingle();
  if (error || !data) return Response.json({ success: false, error: "Could not load SIM settings." }, { status: 500 });
  return Response.json({ success: true, settings: data.settings }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const cookieValue = (await cookies()).get("via_blue_admin")?.value;
  if (!isAdminCookie(cookieValue, process.env.ADMIN_DASHBOARD_PASSWORD)) {
    return Response.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const settings = body?.settings;
    if (!settings || !Array.isArray(settings.packages) || !Array.isArray(settings.networks) || !settings.deliveryPrices) {
      return Response.json({ success: false, error: "Invalid SIM settings." }, { status: 400 });
    }
    if (settings.packages.length < 1 || settings.packages.length > 20 || settings.networks.length < 1 || settings.networks.length > 20) {
      return Response.json({ success: false, error: "Keep between 1 and 20 packages and networks." }, { status: 400 });
    }
    const currencies = ["EUR", "USD", "GBP"];
    if (!settings.packages.some((item: { active?: boolean }) => item.active) || !settings.networks.some((item: { active?: boolean }) => item.active)) {
      return Response.json({ success: false, error: "Keep at least one active package and one active network." }, { status: 400 });
    }
    const packageIds = settings.packages.map((item: { id: string }) => item.id);
    const networkIds = settings.networks.map((item: { id: string }) => item.id);
    if (new Set(packageIds).size !== packageIds.length || new Set(networkIds).size !== networkIds.length) {
      return Response.json({ success: false, error: "Package and network IDs must be unique." }, { status: 400 });
    }
    for (const item of settings.packages) {
      if (typeof item.id !== "string" || !item.id.trim() || typeof item.name !== "string" || !item.name.trim() ||
          !Number.isFinite(Number(item.dataGb)) || Number(item.dataGb) <= 0 ||
          !item.prices || currencies.some((c) => !Number.isFinite(Number(item.prices[c])) || Number(item.prices[c]) < 0)) {
        return Response.json({ success: false, error: "Check each package name, data amount and currency prices." }, { status: 400 });
      }
    }
    for (const currency of currencies) {
      if (!Number.isFinite(Number(settings.deliveryPrices[currency])) || Number(settings.deliveryPrices[currency]) < 0) {
        return Response.json({ success: false, error: "Check hotel delivery prices for all currencies." }, { status: 400 });
      }
    }
    for (const network of settings.networks) {
      if (typeof network.id !== "string" || !network.id.trim() || typeof network.name !== "string" || !network.name.trim() ||
          typeof network.logo !== "string" || network.logo.length > 500 ||
          (network.logo && !/^https:\/\//i.test(network.logo))) {
        return Response.json({ success: false, error: "Check each network name and HTTPS logo URL." }, { status: 400 });
      }
    }

    const supabase = createSupabaseAdminClient();
    if (!supabase) return Response.json({ success: false, error: "Settings are temporarily unavailable." }, { status: 503 });
    const { error } = await supabase.from("sim_card_settings").upsert({
      id: "default",
      settings,
      updated_at: new Date().toISOString(),
    });
    if (error) return Response.json({ success: false, error: "Could not save SIM settings." }, { status: 500 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
  }
}
