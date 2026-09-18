import { Resend } from "resend";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

type BookingField = {
  label: string;
  value: string;
};

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlToText(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]*>/g, "")
  );
}

function parseBookingHtml(html: string) {
  const text = htmlToText(html);

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const title = lines[0] || "New Booking Request";

  const fields: BookingField[] = [];

  let currentLabel = "";
  let currentValue = "";

  const saveCurrent = () => {
    if (!currentLabel) return;

    fields.push({
      label: currentLabel.trim(),
      value: currentValue.trim() || "-",
    });

    currentLabel = "";
    currentValue = "";
  };

  for (let index = 1; index < lines.length; index++) {
    const line = lines[index];

    const separatorIndex = line.indexOf(":");

    if (separatorIndex > 0) {
      saveCurrent();

      currentLabel = line
        .slice(0, separatorIndex)
        .trim();

      currentValue = line
        .slice(separatorIndex + 1)
        .trim();
    } else if (currentLabel) {
      currentValue = currentValue
        ? `${currentValue} ${line}`
        : line;
    }
  }

  saveCurrent();

  return {
    title,
    fields,
  };
}

function getField(
  fields: BookingField[],
  ...labels: string[]
) {
  const normalizedLabels = labels.map((label) =>
    label.toLowerCase()
  );

  return (
    fields.find((field) =>
      normalizedLabels.includes(
        field.label.toLowerCase()
      )
    )?.value || ""
  );
}

function getFields(
  fields: BookingField[],
  labels: string[]
) {
  const normalizedLabels = labels.map((label) =>
    label.toLowerCase()
  );

  return fields.filter((field) =>
    normalizedLabels.includes(
      field.label.toLowerCase()
    )
  );
}

function renderFieldRows(
  fields: BookingField[]
) {
  return fields
    .map(
      (field, index) => `
        <tr>
          <td
            style="
              padding: 13px 0;
              ${
                index <
                fields.length - 1
                  ? "border-bottom: 1px solid #e8edf4;"
                  : ""
              }
            "
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
            >
              <tr>
                <td
                  width="42%"
                  style="
                    padding-right: 14px;
                    vertical-align: top;
                    font-size: 11px;
                    line-height: 18px;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.7px;
                  "
                >
                  ${escapeHtml(field.label)}
                </td>

                <td
                  style="
                    vertical-align: top;
                    font-size: 14px;
                    line-height: 21px;
                    font-weight: 700;
                    color: #0f172a;
                  "
                >
                  ${escapeHtml(field.value)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderSection(
  title: string,
  subtitle: string,
  fields: BookingField[],
  accent = "#f97316"
) {
  if (!fields.length) return "";

  return `
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="
        width: 100%;
        margin-top: 20px;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        background: #ffffff;
      "
    >
      <tr>
        <td style="padding: 20px 22px 0 22px;">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            <tr>
              <td
                style="
                  width: 7px;
                  height: 34px;
                  background: ${accent};
                  border-radius: 8px;
                  font-size: 0;
                "
              >
                &nbsp;
              </td>

              <td
                style="
                  padding-left: 12px;
                  vertical-align: middle;
                "
              >
                <div
                  style="
                    font-size: 15px;
                    line-height: 20px;
                    font-weight: 800;
                    color: #0b1f44;
                  "
                >
                  ${escapeHtml(title)}
                </div>

                <div
                  style="
                    margin-top: 2px;
                    font-size: 11px;
                    line-height: 16px;
                    color: #94a3b8;
                  "
                >
                  ${escapeHtml(subtitle)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 22px 16px 22px;">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
          >
            ${renderFieldRows(fields)}
          </table>
        </td>
      </tr>
    </table>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      subject,
      html,
      replyTo,
    } = body;

    if (!subject || !html) {
      return Response.json(
        {
          success: false,
          error: "Missing booking email data",
        },
        {
          status: 400,
        }
      );
    }

    const {
      title,
      fields,
    } = parseBookingHtml(html);

    const guestFields = getFields(
      fields,
      [
        "Full Name",
        "Nationality",
        "Email",
        "WhatsApp",
        "Room Number",
      ]
    );

    const bookingFields = getFields(
      fields,
      [
        "Tour",
        "Type",
        "Transfer Type",
        "Museum",
        "Vehicle",
      ]
    );

    const tripFields = getFields(
      fields,
      [
        "From",
        "To",
        "Hotel",
        "From Hotel",
        "To Hotel",
        "Tour Date",
        "Date",
        "Transfer Date",
        "Pickup Time",
        "Flight Number",
        "Adults",
        "Children",
        "Infants",
        "Total Guests",
        "Children Ages",
        "Infant Ages",
        "Passengers",
        "Luggage",
      ]
    );

    const priceFields = getFields(
      fields,
      [
        "Total Price",
        "PRIVATE TOUR PRICE",
        "Price",
      ]
    );

    const notesFields = getFields(
      fields,
      ["Notes"]
    );

    const customerName = getField(
      fields,
      "Full Name"
    );

    const customerEmail = getField(
      fields,
      "Email"
    );

    const priceValue =
      getField(
        fields,
        "Total Price",
        "PRIVATE TOUR PRICE",
        "Price"
      );

    const formattedTitle =
      title
        .replace(
          /^NEW\s+/i,
          ""
        )
        .replace(
          /\s+REQUEST$/i,
          ""
        )
        .trim() || "Booking";

    const bookingName =
      getField(fields, "Tour", "Service") ||
      subject
        .replace(
          /^New\s+(?:Tour|Luxury Tour|Transfer)\s+Booking\s*-\s*/i,
          ""
        )
        .trim() ||
      "Booking Request";

    const bookingType =
      subject.match(
        /^New\s+(Tour|Luxury Tour|Transfer)\s+Booking/i
      )?.[1] || "Booking";

    const customerWhatsApp = getField(
      fields,
      "WhatsApp",
      "Phone",
      "Mobile"
    );

    const tripDate = getField(
      fields,
      "Tour Date",
      "Transfer Date",
      "Date"
    );

    const pickupTime = getField(
      fields,
      "Pickup Time"
    );

    const notesValue = getField(
      fields,
      "Notes"
    );

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>${escapeHtml(subject)}</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background: #eef3f8;
            font-family: Arial, Helvetica, sans-serif;
            color: #0f172a;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              width: 100%;
              background: #eef3f8;
              margin: 0;
              padding: 0;
            "
          >
            <tr>
              <td
                align="center"
                style="
                  padding: 34px 14px;
                "
              >
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    width: 100%;
                    max-width: 720px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 26px;
                    overflow: hidden;
                    box-shadow:
                      0 20px 60px
                      rgba(15, 23, 42, 0.10);
                  "
                >
                  <!-- TOP HEADER -->

                  <tr>
                    <td
                      style="
                        background:
                          linear-gradient(
                            135deg,
                            #071b3d 0%,
                            #0b2b5c 100%
                          );
                        padding:
                          30px 32px 28px 32px;
                      "
                    >
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td
                            style="
                              vertical-align: middle;
                            "
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                            >
                              <tr>
                                <td
                                  style="
                                    width: 42px;
                                    height: 42px;
                                    background: #f97316;
                                    border-radius: 12px;
                                    text-align: center;
                                    vertical-align: middle;
                                    font-size: 15px;
                                    font-weight: 800;
                                    color: #ffffff;
                                    letter-spacing: 0.5px;
                                  "
                                >
                                  VB
                                </td>

                                <td
                                  style="
                                    padding-left: 12px;
                                    vertical-align: middle;
                                  "
                                >
                                  <div
                                    style="
                                      font-size: 10px;
                                      line-height: 14px;
                                      font-weight: 800;
                                      letter-spacing: 2.8px;
                                      text-transform: uppercase;
                                      color: #fb923c;
                                    "
                                  >
                                    VIA BLUE
                                  </div>

                                  <div
                                    style="
                                      margin-top: 2px;
                                      font-size: 11px;
                                      line-height: 15px;
                                      color: #cbd5e1;
                                    "
                                  >
                                    Tours & Transfers in Egypt
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>

                          <td
                            align="right"
                            style="
                              vertical-align: middle;
                            "
                          >
                            <div
                              style="
                                display: inline-block;
                                padding: 7px 11px;
                                border: 1px solid
                                  rgba(255, 255, 255, 0.14);
                                border-radius: 999px;
                                background:
                                  rgba(
                                    255,
                                    255,
                                    255,
                                    0.08
                                  );
                                font-size: 9px;
                                font-weight: 800;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                color: #ffffff;
                              "
                            >
                              New Booking
                            </div>
                          </td>
                        </tr>
                      </table>

                      <div
                        style="
                          margin-top: 26px;
                          font-size: 28px;
                          line-height: 34px;
                          font-weight: 800;
                          color: #ffffff;
                        "
                      >
                        ${escapeHtml(formattedTitle)}
                      </div>

                      <div
                        style="
                          margin-top: 6px;
                          font-size: 13px;
                          line-height: 20px;
                          color: #bfdbfe;
                        "
                      >
                        ${escapeHtml(subject)}
                      </div>
                    </td>
                  </tr>

                  <!-- ORANGE ACCENT -->

                  <tr>
                    <td
                      style="
                        height: 5px;
                        background: #f97316;
                        font-size: 0;
                        line-height: 0;
                      "
                    >
                      &nbsp;
                    </td>
                  </tr>

                  <!-- BODY -->

                  <tr>
                    <td
                      style="
                        padding: 26px;
                        background: #f8fafc;
                      "
                    >
                      <!-- ACTION SUMMARY -->

                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          border: 1px solid #dbe4ef;
                          border-radius: 20px;
                          background: #ffffff;
                        "
                      >
                        <tr>
                          <td
                            style="
                              padding: 20px 22px;
                            "
                          >
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                            >
                              <tr>
                                <td
                                  style="
                                    vertical-align: top;
                                  "
                                >
                                  <div
                                    style="
                                      font-size: 10px;
                                      line-height: 14px;
                                      font-weight: 800;
                                      text-transform: uppercase;
                                      letter-spacing: 1.4px;
                                      color: #f97316;
                                    "
                                  >
                                    Booking Status
                                  </div>

                                  <div
                                    style="
                                      margin-top: 4px;
                                      font-size: 18px;
                                      line-height: 24px;
                                      font-weight: 800;
                                      color: #0b1f44;
                                    "
                                  >
                                    Action Required
                                  </div>

                                  ${
                                    customerName
                                      ? `
                                        <div
                                          style="
                                            margin-top: 5px;
                                            font-size: 12px;
                                            line-height: 18px;
                                            color: #64748b;
                                          "
                                        >
                                          Customer:
                                          <strong
                                            style="
                                              color: #334155;
                                            "
                                          >
                                            ${escapeHtml(
                                              customerName
                                            )}
                                          </strong>
                                        </div>
                                      `
                                      : ""
                                  }
                                </td>

                                ${
                                  priceValue
                                    ? `
                                      <td
                                        align="right"
                                        style="
                                          vertical-align: top;
                                        "
                                      >
                                        <div
                                          style="
                                            font-size: 9px;
                                            line-height: 13px;
                                            font-weight: 800;
                                            text-transform: uppercase;
                                            letter-spacing: 1.2px;
                                            color: #94a3b8;
                                          "
                                        >
                                          Total
                                        </div>

                                        <div
                                          style="
                                            margin-top: 3px;
                                            font-size: 28px;
                                            line-height: 32px;
                                            font-weight: 800;
                                            color: #f97316;
                                          "
                                        >
                                          ${escapeHtml(
                                            priceValue
                                          )}
                                        </div>
                                      </td>
                                    `
                                    : ""
                                }
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      ${renderSection(
                        "Booking",
                        "Selected service and booking options",
                        bookingFields,
                        "#f97316"
                      )}

                      ${renderSection(
                        "Guest",
                        "Customer contact and personal details",
                        guestFields,
                        "#0b2b5c"
                      )}

                      ${renderSection(
                        "Trip Details",
                        "Date, route, passengers and transfer information",
                        tripFields,
                        "#f97316"
                      )}

                      ${renderSection(
                        "Pricing",
                        "Booking price details",
                        priceFields,
                        "#0b2b5c"
                      )}

                      ${
                        notesFields.length
                          ? `
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="
                                width: 100%;
                                margin-top: 20px;
                                border: 1px solid #fed7aa;
                                border-radius: 20px;
                                background: #fffaf5;
                              "
                            >
                              <tr>
                                <td
                                  style="
                                    padding: 20px 22px;
                                  "
                                >
                                  <div
                                    style="
                                      font-size: 10px;
                                      line-height: 14px;
                                      font-weight: 800;
                                      text-transform: uppercase;
                                      letter-spacing: 1.3px;
                                      color: #ea580c;
                                    "
                                  >
                                    Notes
                                  </div>

                                  <div
                                    style="
                                      margin-top: 9px;
                                      font-size: 14px;
                                      line-height: 22px;
                                      color: #334155;
                                    "
                                  >
                                    ${escapeHtml(
                                      notesFields[0]
                                        .value
                                    )}
                                  </div>
                                </td>
                              </tr>
                            </table>
                          `
                          : ""
                      }

                      <!-- CUSTOMER REPLY -->

                      ${
                        customerEmail ||
                        replyTo
                          ? `
                            <table
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              style="
                                width: 100%;
                                margin-top: 20px;
                                border: 1px solid #bfdbfe;
                                border-radius: 20px;
                                background: #eff6ff;
                              "
                            >
                              <tr>
                                <td
                                  style="
                                    padding: 18px 22px;
                                  "
                                >
                                  <div
                                    style="
                                      font-size: 10px;
                                      line-height: 14px;
                                      font-weight: 800;
                                      text-transform: uppercase;
                                      letter-spacing: 1.2px;
                                      color: #2563eb;
                                    "
                                  >
                                    Customer Contact
                                  </div>

                                  <div
                                    style="
                                      margin-top: 6px;
                                      font-size: 14px;
                                      line-height: 20px;
                                      font-weight: 700;
                                      color: #0b1f44;
                                    "
                                  >
                                    ${escapeHtml(
                                      customerEmail ||
                                        replyTo ||
                                        ""
                                    )}
                                  </div>

                                  <div
                                    style="
                                      margin-top: 4px;
                                      font-size: 11px;
                                      line-height: 16px;
                                      color: #64748b;
                                    "
                                  >
                                    You can reply directly to the customer
                                    from this email
                                  </div>
                                </td>
                              </tr>
                            </table>
                          `
                          : ""
                      }

                      <!-- FOOTER -->

                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          margin-top: 26px;
                        "
                      >
                        <tr>
                          <td
                            align="center"
                            style="
                              padding-top: 22px;
                              border-top: 1px solid #dfe6ef;
                            "
                          >
                            <div
                              style="
                                font-size: 18px;
                                line-height: 22px;
                                font-weight: 800;
                                color: #0b1f44;
                              "
                            >
                              Via Blue
                            </div>

                            <div
                              style="
                                margin-top: 4px;
                                font-size: 11px;
                                line-height: 16px;
                                color: #64748b;
                              "
                            >
                              Tours & Transfers in Egypt
                            </div>

                            <div
                              style="
                                margin-top: 4px;
                                font-size: 10px;
                                line-height: 15px;
                                color: #94a3b8;
                              "
                            >
                              viabluetours.com
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const { data, error } =
      await resend.emails.send({
        from:
          "Via Blue Bookings <booking@viabluetours.com>",
        to: ["viabluetours@gmail.com"],
        subject,
        html: emailHtml,
        ...(replyTo
          ? {
              replyTo,
            }
          : {}),
      });

    if (error) {
      console.error(
        "Resend error:",
        error
      );

      return Response.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    let bookingSaved = false;

    const bookingReference =
      `VB-${new Date().getFullYear()}-${crypto
        .randomUUID()
        .slice(0, 8)
        .toUpperCase()}`;

    const supabaseAdmin =
      createSupabaseAdminClient();

    if (supabaseAdmin) {
      const { error: bookingSaveError } =
        await supabaseAdmin
          .from("booking_requests")
          .insert({
            reference_code:
              bookingReference,
            booking_type:
              bookingType,
            booking_name:
              bookingName,
            customer_name:
              customerName || null,
            customer_email:
              customerEmail ||
              replyTo ||
              null,
            customer_whatsapp:
              customerWhatsApp ||
              null,
            trip_date:
              tripDate || null,
            pickup_time:
              pickupTime || null,
            total_price:
              priceValue || null,
            notes:
              notesValue || null,
            status:
              "received",
            fields,
            source_subject:
              subject,
          });

      if (bookingSaveError) {
        console.error(
          "Booking database save error:",
          bookingSaveError
        );
      } else {
        bookingSaved = true;
      }
    } else {
      console.warn(
        "Booking database save skipped because SUPABASE_SERVICE_ROLE_KEY is not configured"
      );
    }

    let customerEmailSent = false;

    if (replyTo) {
      const customerEmailHtml =
        "<!DOCTYPE html>" +
        "<html lang=\"en\">" +
        "<head>" +
        "<meta charset=\"UTF-8\" />" +
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
        "<title>We Received Your Booking Request - Via Blue</title>" +
        "</head>" +
        "<body style=\"margin:0;padding:0;background:#eef3f8;font-family:Arial,Helvetica,sans-serif;color:#0f172a;\">" +
        "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%;background:#eef3f8;\"><tr>" +
        "<td align=\"center\" style=\"padding:34px 14px;\">" +
        "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%;max-width:680px;background:#ffffff;border-radius:26px;overflow:hidden;box-shadow:0 20px 60px rgba(15,23,42,0.10);\">" +
        "<tr><td style=\"background:linear-gradient(135deg,#071b3d 0%,#0b2b5c 100%);padding:34px 32px 30px 32px;color:#ffffff;\">" +
        "<div style=\"font-size:10px;line-height:14px;font-weight:800;letter-spacing:2.8px;text-transform:uppercase;color:#fb923c;\">VIA BLUE</div>" +
        "<div style=\"margin-top:4px;font-size:11px;line-height:15px;color:#cbd5e1;\">Tours &amp; Transfers in Egypt</div>" +
        "<div style=\"margin-top:28px;font-size:30px;line-height:36px;font-weight:800;color:#ffffff;\">Booking Request Received</div>" +
        "<div style=\"margin-top:7px;font-size:13px;line-height:20px;color:#bfdbfe;\">Thank you for choosing Via Blue</div>" +
        "</td></tr>" +
        "<tr><td style=\"height:5px;background:#f97316;font-size:0;line-height:0;\">&nbsp;</td></tr>" +
        "<tr><td style=\"padding:28px;background:#f8fafc;\">" +
        "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border:1px solid #dbe4ef;border-radius:20px;background:#ffffff;\"><tr><td style=\"padding:22px;\">" +
        "<div style=\"font-size:11px;line-height:16px;font-weight:800;text-transform:uppercase;letter-spacing:1.3px;color:#f97316;\">Hello " +
        escapeHtml(customerName || "Guest") +
        "</div>" +
        "<div style=\"margin-top:9px;font-size:15px;line-height:24px;color:#334155;\">We have successfully received your booking request for <strong style=\"color:#0b1f44;\">" +
        escapeHtml(bookingName) +
        "</strong></div>" +
        "</td></tr></table>" +
        "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin-top:18px;border:1px solid #e2e8f0;border-radius:20px;background:#ffffff;\"><tr><td style=\"padding:20px 22px;\">" +
        "<div style=\"font-size:10px;line-height:14px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:#0b2b5c;\">What happens next</div>" +
        "<div style=\"margin-top:10px;font-size:13px;line-height:24px;color:#475569;\">Our team will review your request and availability<br />We will contact you shortly to confirm the details<br />If we need anything else, we will contact you using the information you provided</div>" +
        "</td></tr></table>" +
        "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"margin-top:18px;border:1px solid #fed7aa;border-radius:20px;background:#fffaf5;\"><tr><td style=\"padding:20px 22px;\">" +
        "<div style=\"font-size:10px;line-height:14px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:#ea580c;\">Important</div>" +
        "<div style=\"margin-top:8px;font-size:12px;line-height:20px;color:#7c2d12;\">This email confirms that we received your request. It is not the final booking confirmation yet</div>" +
        "</td></tr></table>" +
        "<div style=\"margin-top:26px;text-align:center;font-size:13px;line-height:21px;color:#64748b;\">Thank you for choosing <strong style=\"color:#0b1f44;\">Via Blue</strong><br />We look forward to welcoming you in Egypt</div>" +
        "<div style=\"margin-top:22px;text-align:center;font-size:10px;line-height:15px;color:#94a3b8;\">viabluetours.com</div>" +
        "</td></tr></table></td></tr></table></body></html>";

      const { error: customerError } =
        await resend.emails.send({
          from:
            "Via Blue <booking@viabluetours.com>",
          to: [replyTo],
          subject:
            "We Received Your Booking Request - Via Blue",
          html: customerEmailHtml,
          replyTo: "viabluetours@gmail.com",
        });

      if (customerError) {
        console.error(
          "Customer confirmation email error:",
          customerError
        );
      } else {
        customerEmailSent = true;
      }
    }

    return Response.json({
      success: true,
      data,
      customerEmailSent,
      bookingSaved,
      bookingReference,
    });
  } catch (error) {
    console.error(
      "Send booking error:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send booking email",
      },
      {
        status: 500,
      }
    );
  }
}