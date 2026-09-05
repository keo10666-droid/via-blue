"use client";

import { FormEvent, useState } from "react";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M20 11.5a8.3 8.3 0 0 1-12.55 7.13L4 20l1.42-3.27A8.3 8.3 0 1 1 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 8.3c.2-.25.42-.26.7-.26h.3c.2 0 .34.08.43.3l.62 1.45c.1.23.08.4-.08.58l-.48.55c-.12.14-.13.28-.04.44.32.58.76 1.08 1.28 1.48.4.3.84.54 1.3.72.17.07.3.04.4-.08l.56-.68c.14-.17.3-.2.52-.1l1.38.65c.22.1.32.25.3.48-.03.35-.16.68-.38.95-.32.4-.8.62-1.32.62-.46 0-1.12-.2-1.95-.58-1.05-.49-1.98-1.16-2.75-1.98-.72-.77-1.3-1.66-1.7-2.64-.22-.56-.34-1.02-.34-1.38 0-.48.2-.92.55-1.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m5.5 7 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M20 10.2c0 5.1-8 10.3-8 10.3S4 15.3 4 10.2a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#04142f]">
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#f59a23]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              We are here to help
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Let&apos;s talk about
              <span className="block text-orange-400">your next journey.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Have a question about a tour, transfer or private experience?
              Get in touch with Via Blue and our team will be happy to help
              you plan your trip in Hurghada.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr]">
          {/* Left side */}
          <div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f59a23]">
                Contact Via Blue
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#071d49] sm:text-4xl">
                We&apos;re just a message away.
              </h2>

              <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#667085]">
                Whether you need help choosing an excursion, arranging an
                airport transfer or simply have a question, feel free to
                contact us.
              </p>
            </div>

            {/* Contact cards */}
            <div className="mt-8 space-y-4">
              <a
                href="https://wa.me/201091920706"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#e6e9ef] bg-white p-5 shadow-[0_10px_30px_rgba(7,29,73,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f59a23]/40 hover:shadow-[0_16px_40px_rgba(7,29,73,0.08)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff5e7] text-[#f59a23] transition-colors group-hover:bg-[#f59a23] group-hover:text-white">
                  <WhatsAppIcon />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#98a2b3]">
                    WhatsApp
                  </p>

                  <p className="mt-1 font-semibold text-[#071d49]">
                    +20 109 192 0706
                  </p>

                  <p className="mt-0.5 text-sm text-[#667085]">
                    Chat with us directly
                  </p>
                </div>

                <ArrowIcon />
              </a>

              <a
                href="mailto:info@holiwaytour.com"
                className="group flex items-center gap-4 rounded-2xl border border-[#e6e9ef] bg-white p-5 shadow-[0_10px_30px_rgba(7,29,73,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f59a23]/40 hover:shadow-[0_16px_40px_rgba(7,29,73,0.08)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff5e7] text-[#f59a23] transition-colors group-hover:bg-[#f59a23] group-hover:text-white">
                  <EmailIcon />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#98a2b3]">
                    Email
                  </p>

                  <p className="mt-1 break-all font-semibold text-[#071d49]">
                    info@holiwaytour.com
                  </p>

                  <p className="mt-0.5 text-sm text-[#667085]">
                    Send us an email
                  </p>
                </div>

                <ArrowIcon />
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-[#e6e9ef] bg-white p-5 shadow-[0_10px_30px_rgba(7,29,73,0.04)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff5e7] text-[#f59a23]">
                  <LocationIcon />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#98a2b3]">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-[#071d49]">
                    Hurghada, Red Sea, Egypt
                  </p>

                  <p className="mt-0.5 text-sm text-[#667085]">
                    Serving Hurghada and the Red Sea
                  </p>
                </div>
              </div>
            </div>

            {/* Trust box */}
            <div className="mt-6 rounded-2xl bg-[#071d49] p-6 text-white">
              <p className="text-sm font-semibold">
                Why contact Via Blue?
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="text-orange-400">
                    <CheckIcon />
                  </span>
                  Local team based in Hurghada
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="text-orange-400">
                    <CheckIcon />
                  </span>
                  Professional tours and transfers
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="text-orange-400">
                    <CheckIcon />
                  </span>
                  Personal assistance before your trip
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[28px] border border-[#e6e9ef] bg-white p-6 shadow-[0_20px_60px_rgba(7,29,73,0.07)] sm:p-8 lg:p-10">
            {!submitted ? (
              <>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f59a23]">
                    Send a message
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#071d49] sm:text-3xl">
                    How can we help?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#667085]">
                    Fill in the form below and our team will get back to you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-[#172033]"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="h-12 w-full rounded-xl border border-[#dfe3ea] bg-[#fbfcfd] px-4 text-sm text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#f59a23] focus:bg-white focus:ring-4 focus:ring-[#f59a23]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[#172033]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-[#dfe3ea] bg-[#fbfcfd] px-4 text-sm text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#f59a23] focus:bg-white focus:ring-4 focus:ring-[#f59a23]/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="mb-2 block text-sm font-medium text-[#172033]"
                      >
                        WhatsApp Number
                      </label>

                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        placeholder="+20 ..."
                        className="h-12 w-full rounded-xl border border-[#dfe3ea] bg-[#fbfcfd] px-4 text-sm text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#f59a23] focus:bg-white focus:ring-4 focus:ring-[#f59a23]/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-medium text-[#172033]"
                      >
                        Subject
                      </label>

                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help?"
                        className="h-12 w-full rounded-xl border border-[#dfe3ea] bg-[#fbfcfd] px-4 text-sm text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#f59a23] focus:bg-white focus:ring-4 focus:ring-[#f59a23]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-[#172033]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-[#dfe3ea] bg-[#fbfcfd] px-4 py-3 text-sm leading-6 text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#f59a23] focus:bg-white focus:ring-4 focus:ring-[#f59a23]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#071d49] px-6 text-sm font-semibold text-white shadow-lg shadow-[#071d49]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#04142f] hover:shadow-xl hover:shadow-[#071d49]/20"
                  >
                    Send Message
                    <ArrowIcon />
                  </button>

                  <p className="text-center text-xs leading-5 text-[#98a2b3]">
                    We&apos;ll use your details only to respond to your
                    enquiry.
                  </p>
                </form>
              </>
            ) : (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff5e7] text-[#f59a23]">
                  <CheckIcon />
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-[#071d49]">
                  Message received
                </h2>

                <p className="mt-4 max-w-md text-[15px] leading-7 text-[#667085]">
                  Thank you for contacting Via Blue. Your message has been
                  received and our team will get back to you as soon as
                  possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#e6e9ef] px-5 py-3 text-sm font-semibold text-[#071d49] transition hover:border-[#f59a23] hover:text-[#f59a23]"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
        <div className="relative overflow-hidden rounded-[28px] bg-[#071d49] px-7 py-10 sm:px-10 lg:px-12">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#f59a23]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
                Prefer WhatsApp?
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                Talk to our team directly.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                For quick questions and bookings, WhatsApp is the fastest way
                to reach us.
              </p>
            </div>

            <a
              href="https://wa.me/201091920706"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#f59a23] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#df8413] hover:shadow-lg hover:shadow-[#f59a23]/20"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}