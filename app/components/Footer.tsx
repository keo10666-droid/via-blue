import Link from "next/link";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
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

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M13.5 20v-7h2.35l.35-2.73H13.5V8.53c0-.79.22-1.33 1.36-1.33h1.46V4.76c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v2.01H8.37V13h2.35v7h2.78Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M14.5 4v10.2a4.3 4.3 0 1 1-3.1-4.12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 4c.55 2.1 1.75 3.4 4 3.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M4 6.5 12 12l8-5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18V7.2c0-.66.74-1.04 1.27-.65L12 11.2l6.73-4.65c.53-.39 1.27-.01 1.27.65V18"
        stroke="currentColor"
        strokeWidth="1.8"
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
      className="h-5 w-5"
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
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViaTourIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m9 15 2.1-5.1L15 8.5l-2.1 5.1L9 15Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#04142f] text-white">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center transition-opacity duration-300 hover:opacity-90"
            >
              <img
                src="/logo/logo.svg"
                alt="Via Blue"
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-6 max-w-sm text-[15px] leading-7 text-slate-300">
              Discover unforgettable tours, boat trips, snorkeling
              adventures and private transfers in Hurghada.
            </p>

            {/* Social */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Follow Via Blue
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/201505097193"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-green-500 hover:text-white hover:shadow-green-500/20"
                >
                  <WhatsAppIcon />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1RwrmKAEmH/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-600 hover:text-white hover:shadow-blue-500/20"
                >
                  <FacebookIcon />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/viabluetours?stkn=MTY5czlwYXp1djJxNA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/40 hover:bg-pink-500 hover:text-white hover:shadow-pink-500/20"
                >
                  <InstagramIcon />
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@viabluetours?_r=1&_t=ZS-99ZcqaQn4QT"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-black hover:text-white hover:shadow-white/10"
                >
                  <TikTokIcon />
                </a>

                {/* Gmail */}
                <a
                  href="mailto:viabluetours@gmail.com"
                  aria-label="Email"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:bg-red-500 hover:text-white hover:shadow-red-500/20"
                >
                  <GmailIcon />
                </a>
              </div>
            </div>

            {/* Via Tour */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Our partner
              </p>

              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm shadow-lg shadow-black/10 backdrop-blur-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-400">
                  <ViaTourIcon />
                </span>

                <span>
                  <span className="block font-semibold text-white">
                    Via Tour
                  </span>

                  <span className="block text-xs text-slate-500">
                    Coming soon
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Home</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/tours"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Tours</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/transfers"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Airport Transfers</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Contact Us</span>
                  <ArrowIcon />
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Popular Experiences
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/tours/paradise-island"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Paradise Island</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/tours/snorkeling"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Snorkeling</span>
                  <ArrowIcon />
                </Link>
              </li>

              <li>
                <Link
                  href="/transfers"
                  className="group flex items-center gap-2 text-[15px] text-slate-300 transition hover:text-orange-400"
                >
                  <span>Private Transfers</span>
                  <ArrowIcon />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Contact Us
            </h3>

            <div className="mt-6 space-y-3">
              {/* Location Card */}
              <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07]">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-400 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    <LocationIcon />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium leading-6 text-white">
                      Hurghada, Red Sea, Egypt
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/201505097193"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-green-400/20 hover:bg-green-500/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-400/20 bg-green-500/10 text-green-400 transition-all duration-300 group-hover:bg-green-500 group-hover:text-white">
                    <WhatsAppIcon />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      WhatsApp
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white transition group-hover:text-green-400">
                      +20 150 509 7193
                    </p>
                  </div>

                  <ArrowIcon />
                </div>
              </a>

              {/* Gmail Card */}
              <a
                href="mailto:viabluetours@gmail.com"
                className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/20 hover:bg-red-500/[0.07]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 text-red-400 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
                    <GmailIcon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Email
                    </p>

                    <p className="mt-1 whitespace-nowrap text-[13px] font-semibold tracking-[-0.01em] text-white transition group-hover:text-red-400">
                      viabluetours@gmail.com
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 pt-7 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Via Blue. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}