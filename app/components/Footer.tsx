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

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 h-5 w-5 shrink-0 text-orange-400"
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

function WhatsAppSmallIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 h-5 w-5 shrink-0 text-orange-400"
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
      className="mt-0.5 h-5 w-5 shrink-0 text-orange-400"
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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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

export default function Footer() {
  return (
    <footer className="bg-[#04142f] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
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

            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://wa.me/201091920706"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-green-500/40 hover:bg-green-500 hover:text-white"
              >
                <WhatsAppIcon />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-600 hover:text-white"
              >
                <FacebookIcon />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400/40 hover:bg-orange-500 hover:text-white"
              >
                <InstagramIcon />
              </a>
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

            <div className="mt-6 space-y-5 text-[15px] text-slate-300">
              <div className="flex gap-3">
                <LocationIcon />
                <p className="leading-6">
                  Hurghada, Red Sea, Egypt
                </p>
              </div>

              <div className="flex gap-3">
                <WhatsAppSmallIcon />

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-400">
                    WhatsApp
                  </p>

                  <a
                    href="https://wa.me/201091920706"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white transition hover:text-orange-400"
                  >
                    +20 109 192 0706
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <EmailIcon />

                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  <a
                    href="mailto:info@holiwaytour.com"
                    className="font-medium text-white transition hover:text-orange-400"
                  >
                    info@holiwaytour.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
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
      </div>
    </footer>
  );
}