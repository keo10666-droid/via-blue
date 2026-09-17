import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } =
      await resend.emails.send({
        from: "Via Blue Bookings <booking@viabluetours.com>",
        to: ["viabluetours@gmail.com"],
        subject,
        html,
        ...(replyTo
          ? {
              replyTo,
            }
          : {}),
      });

    if (error) {
      console.error("Resend error:", error);

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

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Send booking error:", error);

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