import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const recipient = "viabluetours@gmail.com";
const sender = "Via Blue Website <website@viabluetours.com>";
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function limitRequests(ip: string) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    requestsByIp.set(ip, recent);
    return false;
  }

  recent.push(now);
  requestsByIp.set(ip, recent);

  if (requestsByIp.size > 1000) {
    for (const [key, timestamps] of requestsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
        requestsByIp.delete(key);
      }
    }
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);

    if (contentLength > 16 * 1024) {
      return NextResponse.json(
        { error: "Your message is too large. Please shorten it and try again." },
        { status: 413 },
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request. Please refresh the page and try again." },
        { status: 400 },
      );
    }

    // Hidden honeypot field: normal visitors leave this empty.
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim().replace(/[\r\n]+/g, " ") : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please enter your name, email address, and message." },
        { status: 400 },
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      whatsapp.length > 40 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long. Please shorten them and try again." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip =
      request.headers.get("x-real-ip")?.trim() ||
      forwardedFor?.split(",")[0]?.trim() ||
      "unknown";

    if (!limitRequests(ip)) {
      return NextResponse.json(
        { error: "Too many messages were sent from this connection. Please try again in 15 minutes." },
        { status: 429 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form is unavailable: RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Our message service is temporarily unavailable. Please contact us on WhatsApp or email." },
        { status: 503 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeWhatsapp = escapeHtml(whatsapp || "Not provided");
    const safeSubject = escapeHtml(subject || "Website contact enquiry");
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject: `Website enquiry: ${subject || "General enquiry"}`.slice(0, 180),
      text: [
        "New contact form message from viabluetours.com",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${whatsapp || "Not provided"}`,
        `Subject: ${subject || "Website contact enquiry"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033;max-width:640px;margin:0 auto">
          <h2 style="color:#071d49">New website enquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>WhatsApp:</strong> ${safeWhatsapp}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <hr style="border:0;border-top:1px solid #e6e9ef;margin:24px 0" />
          <p><strong>Message</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Contact email delivery request failed:", error.name || "Resend error");
      return NextResponse.json(
        { error: "We couldn't send your message right now. Please try again or contact us on WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(
      "Contact form request failed:",
      error instanceof Error ? error.name : "Unknown error",
    );

    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}
