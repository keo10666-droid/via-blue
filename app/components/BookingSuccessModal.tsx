"use client";

import Link from "next/link";

type BookingSuccessModalProps = {
  open: boolean;
  guestName: string;
  bookingName: string;
  email: string;
  emailSent: boolean;
  backHref: string;
  backLabel: string;
  onClose: () => void;
};

export default function BookingSuccessModal({
  open,
  guestName,
  bookingName,
  email,
  emailSent,
  backHref,
  backLabel,
  onClose,
}: BookingSuccessModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-success-title"
    >
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[32px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-7 py-9 text-white sm:px-9 sm:py-11">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 shadow-[0_14px_30px_rgba(249,115,22,0.28)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-white"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-300">
              Booking Request Received
            </p>

            <h2
              id="booking-success-title"
              className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Thank you{guestName ? ", " + guestName : ""}
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
              Your booking request has been received successfully. Our team
              will review the details and contact you shortly to confirm the
              reservation and final arrangements
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
              Your Request
            </p>

            <p className="mt-2 text-lg font-extrabold text-blue-950">
              {bookingName}
            </p>
          </div>

          <div
            className={
              emailSent
                ? "rounded-2xl border border-blue-100 bg-blue-50 p-5"
                : "rounded-2xl border border-orange-100 bg-orange-50 p-5"
            }
          >
            <div className="flex items-start gap-3">
              <div
                className={
                  emailSent
                    ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm"
                    : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm"
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect
                    x="3.5"
                    y="5.25"
                    width="17"
                    height="13.5"
                    rx="3"
                  />
                  <path d="m5 7.5 7 5 7-5" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-extrabold text-blue-950">
                  {emailSent
                    ? "Confirmation email sent"
                    : "Your request is safely received"}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {emailSent
                    ? "We sent a confirmation message to " + email
                    : "We will still contact you using the details you provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm font-extrabold text-green-900">
              What happens next
            </p>

            <div className="mt-3 space-y-2.5 text-xs font-medium leading-5 text-green-800">
              <p>Our team will review your request and availability</p>
              <p>We will contact you shortly with the next steps</p>
              <p>Thank you for choosing Via Blue for your Egypt experience</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-blue-950 transition-all hover:border-blue-200 hover:bg-slate-50"
            >
              Close
            </button>

            <Link
              href={backHref}
              className="flex flex-1 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl"
            >
              {backLabel}
            </Link>
          </div>

          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Via Blue · Tours & Transfers in Egypt
          </p>
        </div>
      </div>
    </div>
  );
}
