import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Azuris
            </h2>

            <p className="mt-4 max-w-sm leading-7 text-blue-200">
              Discover unforgettable tours, boat trips, snorkeling
              adventures and private transfers in Hurghada.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="https://wa.me/201091920706"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg transition hover:bg-green-500"
              >
                💬
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-lg transition hover:bg-blue-700"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-lg transition hover:bg-blue-700"
              >
                ◎
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-blue-200">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-orange-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/tours"
                  className="transition hover:text-orange-400"
                >
                  Tours
                </Link>
              </li>

              <li>
                <Link
                  href="/transfers"
                  className="transition hover:text-orange-400"
                >
                  Airport Transfers
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-orange-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h3 className="text-lg font-bold">
              Popular Experiences
            </h3>

            <ul className="mt-5 space-y-3 text-blue-200">
              <li>
                <Link
                  href="/tours/paradise-island"
                  className="transition hover:text-orange-400"
                >
                  Paradise Island
                </Link>
              </li>

              <li>
                <Link
                  href="/tours/snorkeling"
                  className="transition hover:text-orange-400"
                >
                  Snorkeling
                </Link>
              </li>

              <li>
                <Link
                  href="/transfers"
                  className="transition hover:text-orange-400"
                >
                  Private Transfers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-blue-200">

              <p>
                📍 Hurghada, Red Sea, Egypt
              </p>

              <p>
                💬 WhatsApp
                <br />
                <a
                  href="https://wa.me/201091920706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white transition hover:text-orange-400"
                >
                  +20 109 192 0706
                </a>
              </p>

              <p>
                ✉️ Email
                <br />
                <a
                  href="mailto:info@holiwaytour.com"
                  className="font-bold text-white transition hover:text-orange-400"
                >
                  info@holiwaytour.com
                </a>
              </p>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-blue-800 pt-6">

          <div className="flex flex-col gap-3 text-sm text-blue-300 md:flex-row md:items-center md:justify-between">

            <p>
              © {new Date().getFullYear()} Azuris. All rights reserved.
            </p>

            <div className="flex gap-5">
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