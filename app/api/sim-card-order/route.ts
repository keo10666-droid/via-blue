import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { isRateLimited } from "@/lib/apiRateLimit";

type OrderBody = {
  fullName?: unknown;
  whatsapp?: unknown;
  arrivalDate?: unknown;
  hotel?: unknown;
  roomNumber?: unknown;
  network?: unknown;
  delivery?: unknown;
  currency?: unknown;
};

const NETWORKS = ["Orange", "Vodafone", "Etisalat", "WE"] as const;
const CURRENCIES = ["EUR", "USD", "GBP"] as const;

function clean(value: unknown, max = 180) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || "")) {
      return Response.json({ success: false, error: "Invalid request format." }, { status: 415 });
    }

    if (await isRateLimited(request, "sim-card-order", 8, 3600)) {
      return Response.json({ success: false, error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const body = await request.json() as OrderBody;
    const fullName = clean(body.fullName, 120);
    const whatsapp = clean(body.whatsapp, 40);
    const arrivalDate = clean(body.arrivalDate, 10);
    const hotel = clean(body.hotel, 160);
    const roomNumber = clean(body.roomNumber, 40);
    const network = clean(body.network, 30);
    const delivery = clean(body.delivery, 20);
    const currency = clean(body.currency, 3);

    if (!fullName || !whatsapp || !arrivalDate || !hotel) {
      return Response.json({ success: false, error: "Please complete your name, WhatsApp number, arrival date and hotel." }, { status: 400 });
    }
    if (!/^\+?[0-9\s()-]{7,25}$/.test(whatsapp)) {
      return Response.json({ success: false, error: "Please enter a valid WhatsApp number." }, { status: 400 });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(arrivalDate) || Number.isNaN(Date.parse(arrivalDate))) {
      return Response.json({ success: false, error: "Please select a valid arrival date." }, { status: 400 });
    }
    if (!(NETWORKS as readonly string[]).includes(network) || !["airport", "hotel"].includes(delivery) || !(CURRENCIES as readonly string[]).includes(currency)) {
      return Response.json({ success: false, error: "Invalid SIM card selection." }, { status: 400 });
    }

    const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : "£";
    const total = delivery === "hotel" ? 15 : 10;
    const totalPrice = symbol + total;
    const deliveryLabel = delivery === "hotel" ? "Hotel delivery (+5)" : "Airport pickup (Free)";
    const fields = [
      { label: "Full Name", value: fullName },
      { label: "WhatsApp", value: whatsapp },
      { label: "Arrival Date", value: arrivalDate },
      { label: "Hotel", value: hotel },
      { label: "Room Number", value: roomNumber || "Not provided" },
      { label: "SIM Network", value: network },
      { label: "Package", value: "25 GB Data + Calls" },
      { label: "Delivery", value: deliveryLabel },
      { label: "Currency", value: currency },
      { label: "Total Price", value: totalPrice },
    ];

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      console.error("SIM order could not be saved: admin database client is unavailable.");
      return Response.json({ success: false, error: "Orders are temporarily unavailable. Please try again shortly." }, { status: 503 });
    }

    const referenceCode = "VB-SIM-" + new Date().getFullYear() + "-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    const { error: saveError } = await supabase.from("booking_requests").insert({
      reference_code: referenceCode,
      booking_type: "sim_card",
      booking_name: "Egypt SIM Card - " + network,
      customer_name: fullName,
      customer_email: null,
      customer_whatsapp: whatsapp,
      trip_date: arrivalDate,
      pickup_time: null,
      total_price: totalPrice,
      notes: deliveryLabel,
      status: "received",
      fields,
      source_subject: "New SIM Card Order - " + referenceCode,
    });

    if (saveError) {
      console.error("SIM card order database save failed.");
      return Response.json({ success: false, error: "We couldn't save your order. Please try again." }, { status: 500 });
    }

    let emailSent = false;
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (apiKey) {
      const resend = new Resend(apiKey);
      const rows = fields.map((field) =>
        '<tr><td style="padding:11px 0;border-bottom:1px solid #e8edf4;color:#64748b;font-size:11px;font-weight:700;text-transform:uppercase;width:42%;">' +
        escapeHtml(field.label) +
        '</td><td style="padding:11px 0;border-bottom:1px solid #e8edf4;color:#0f172a;font-size:14px;font-weight:700;">' +
        escapeHtml(field.value) +
        '</td></tr>'
      ).join("");

      const html =
        '<!doctype html><html><body style="margin:0;padding:28px;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a;">' +
        '<table style="max-width:640px;width:100%;margin:auto;background:white;border-radius:20px;padding:28px;border-collapse:separate;"><tr><td>' +
        '<p style="margin:0;color:#f97316;font-weight:800;letter-spacing:3px;font-size:11px;">VIA BLUE</p>' +
        '<h1 style="font-size:24px;color:#0b1f44;margin:12px 0 4px;">New SIM Card Order</h1>' +
        '<p style="margin:0 0 18px;color:#64748b;font-size:13px;">Reference: <strong>' + escapeHtml(referenceCode) + '</strong></p>' +
        '<table style="width:100%;border-collapse:collapse;">' + rows + '</table>' +
        '<p style="margin:22px 0 0;font-size:12px;color:#64748b;">Open the <a href="https://www.viabluetours.com/admin/sim-cards" style="color:#ea580c;font-weight:700;">Via Blue admin dashboard</a> to review this order.</p>' +
        '</td></tr></table></body></html>';

      const { error: emailError } = await resend.emails.send({
        from: "Via Blue Bookings <booking@viabluetours.com>",
        to: ["viabluetours@gmail.com"],
        subject: "New SIM Card Order - " + referenceCode,
        html,
        replyTo: "viabluetours@gmail.com",
      });

      if (emailError) {
        console.error("SIM card order notification email failed.");
      } else {
        emailSent = true;
      }
    } else {
      console.error("SIM card order saved, but RESEND_API_KEY is not configured.");
    }

    return Response.json({ success: true, referenceCode, emailSent });
  } catch {
    console.error("Unexpected SIM card order API failure.");
    return Response.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
