import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  logoutAdmin,
} from "@/app/admin/login/actions";
import {
  createSupabaseAdminClient,
} from "@/lib/supabaseAdmin";

type BookingRow = {
  id: string;
  reference_code: string;
  booking_type: string;
  booking_name: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_whatsapp: string | null;
  trip_date: string | null;
  pickup_time: string | null;
  total_price: string | null;
  notes: string | null;
  status: string;
  fields: Array<{
    label: string;
    value: string;
  }>;
  source_subject: string | null;
  created_at: string;
};

function hashSecret(value: string) {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

async function requireAdmin() {
  const password =
    process.env.ADMIN_DASHBOARD_PASSWORD;

  const cookieValue = (
    await cookies()
  ).get("via_blue_admin")?.value;

  if (
    !password ||
    cookieValue !== hashSecret(password)
  ) {
    redirect("/admin/login");
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "under_review":
      return "Under Review";
    case "confirmed":
      return "Confirmed";
    case "cancelled":
      return "Cancelled";
    case "completed":
      return "Completed";
    default:
      return "Received";
  }
}

function statusClass(status: string) {
  switch (status) {
    case "under_review":
      return "border-blue-100 bg-blue-50 text-blue-700";
    case "confirmed":
      return "border-green-100 bg-green-50 text-green-700";
    case "cancelled":
      return "border-red-100 bg-red-50 text-red-700";
    case "completed":
      return "border-slate-200 bg-slate-100 text-slate-700";
    default:
      return "border-orange-100 bg-orange-50 text-orange-700";
  }
}

function formatCreatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(
    "en-GB",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

export default async function AdminBookingsPage() {
  await requireAdmin();

  const supabase =
    createSupabaseAdminClient();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white p-8 shadow-2xl">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-orange-500">
            Via Blue Admin
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-blue-950">
            Supabase admin access is not configured
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Add SUPABASE_SERVICE_ROLE_KEY to the project environment variables, then reload this page
          </p>
        </div>
      </main>
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("booking_requests")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false,
      }
    )
    .limit(100);

  if (error) {
    const tableMissing =
      error.code === "42P01";

    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white p-8 shadow-2xl">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-orange-500">
            Via Blue Admin
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-blue-950">
            {tableMissing
              ? "Booking table is not ready"
              : "Could not load bookings"}
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            {tableMissing
              ? "Run the booking_requests migration in the Supabase SQL Editor, then refresh this page"
              : error.message}
          </p>
        </div>
      </main>
    );
  }

  const bookings =
    (data || []) as BookingRow[];

  const totalCount = bookings.length;

  const receivedCount =
    bookings.filter(
      (booking) =>
        booking.status ===
        "received"
    ).length;

  const reviewCount =
    bookings.filter(
      (booking) =>
        booking.status ===
        "under_review"
    ).length;

  const confirmedCount =
    bookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    ).length;

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <section className="relative overflow-hidden bg-blue-950 px-5 py-10 text-white md:px-8 md:py-14">
        <div className="absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-300">
                Via Blue
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                Booking Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
                Manage and review your latest tour, luxury tour and transfer requests
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/admin/bookings"
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Refresh
              </a>

              <form action={logoutAdmin}>
                <button
                  type="submit"
                  className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Log Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-[1500px] px-4 pb-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Total Requests
            </p>

            <p className="mt-2 text-3xl font-extrabold text-blue-950">
              {totalCount}
            </p>
          </div>

          <div className="rounded-[24px] border border-orange-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Received
            </p>

            <p className="mt-2 text-3xl font-extrabold text-orange-500">
              {receivedCount}
            </p>
          </div>

          <div className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Under Review
            </p>

            <p className="mt-2 text-3xl font-extrabold text-blue-700">
              {reviewCount}
            </p>
          </div>

          <div className="rounded-[24px] border border-green-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-extrabold text-green-600">
              {confirmedCount}
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-100 px-5 py-5 md:px-7">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-orange-500">
                  Latest Requests
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-blue-950">
                  Bookings
                </h2>
              </div>

              <p className="text-xs font-semibold text-slate-400">
                Showing up to 100 latest requests
              </p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-extrabold text-blue-950">
                No bookings yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                New booking requests will appear here automatically
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <article
                  key={booking.id}
                  className="p-5 transition hover:bg-slate-50/70 md:p-7"
                >
                  <div className="grid gap-6 xl:grid-cols-[1.2fr_1.1fr_1fr_auto] xl:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={
                            "rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] " +
                            statusClass(
                              booking.status
                            )
                          }
                        >
                          {statusLabel(
                            booking.status
                          )}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                          {booking.booking_type}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-extrabold text-blue-950">
                        {booking.booking_name}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-orange-500">
                        {booking.reference_code}
                      </p>

                      <p className="mt-3 text-xs leading-5 text-slate-400">
                        {formatCreatedAt(
                          booking.created_at
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Guest
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-slate-800">
                        {booking.customer_name ||
                          "Not provided"}
                      </p>

                      <p className="mt-1 break-all text-xs text-slate-500">
                        {booking.customer_email ||
                          "No email"}
                      </p>

                      {booking.customer_whatsapp ? (
                        <p className="mt-1 text-xs text-slate-500">
                          {booking.customer_whatsapp}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Trip
                      </p>

                      <p className="mt-2 text-sm font-extrabold text-slate-800">
                        {booking.trip_date ||
                          "Date not provided"}
                      </p>

                      {booking.pickup_time ? (
                        <p className="mt-1 text-xs text-slate-500">
                          Pickup {booking.pickup_time}
                        </p>
                      ) : null}

                      {booking.total_price ? (
                        <p className="mt-3 text-lg font-extrabold text-orange-500">
                          {booking.total_price}
                        </p>
                      ) : null}
                    </div>

                    <div className="xl:text-right">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        Details
                      </p>

                      <details className="mt-2 xl:min-w-[220px]">
                        <summary className="cursor-pointer text-sm font-bold text-blue-950">
                          View booking
                        </summary>

                        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
                          <div className="space-y-2">
                            {booking.fields.map(
                              (field, index) => (
                                <div
                                  key={
                                    field.label +
                                    index
                                  }
                                >
                                  <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                    {field.label}
                                  </p>

                                  <p className="mt-1 break-words text-xs font-semibold leading-5 text-slate-700">
                                    {field.value}
                                  </p>
                                </div>
                              )
                            )}
                          </div>

                          {booking.notes ? (
                            <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50 p-3">
                              <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-orange-600">
                                Notes
                              </p>

                              <p className="mt-1 text-xs leading-5 text-orange-900">
                                {booking.notes}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </details>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
