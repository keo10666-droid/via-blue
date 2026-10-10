import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/apiRateLimit";

export const runtime = "nodejs";

const recipient = "viabluetours@gmail.com";
const sender = "Via Blue Website <website@viabluetours.com>";
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    if (await isRateLimited(request, "contact-form", 5, 900)) {
      return NextResponse.json(
        { error: "Too many messages were sent from this connection. Please try again in 15 minutes." },
        { status: 429 },
      );
    }

    const maxBodyBytes = 16 * 1024;
    const contentLength = Number(request.headers.get("content-length") || 0);

    if (contentLength > maxBodyBytes) {
      return NextResponse.json(
        { error: "Your message is too large. Please shorten it and try again." },
        { status: 413 },
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: "Invalid request. Please refresh the page and try again." },
        { status: 400 },
      );
    }

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBodyBytes) {
        await reader.cancel();
        return NextResponse.json(
          { error: "Your message is too large. Please shorten it and try again." },
          { status: 413 },
        );
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    let body: unknown;
    try {
      body = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      body = null;
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Invalid request. Please refresh the page and try again." },
        { status: 400 },
      );
    }

    const data = body as Record<string, unknown>;

    // Hidden honeypot field: normal visitors leave this empty.
    if (typeof data.website === "string" && data.website.trim()) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const whatsapp = typeof data.whatsapp === "string" ? data.whatsapp.trim() : "";
    const subject = typeof data.subject === "string" ? data.subject.trim().replace(/[\r\n]+/g, " ") : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

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
