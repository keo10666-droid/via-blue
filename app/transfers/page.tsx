import Image from "next/image";
import Link from "next/link";

import { transfers } from "@/data/transfers";

export default function TransfersPage() {
  const items = Object.values(transfers);

  const destinationImages: Record<string, string> = {
    "hurghada-city": "/transfers/hurghada-city.webp",
    "sahl-hasheesh": "/transfers/sahl-hasheesh.webp",
    "makadi-bay": "/transfers/makadi-bay.webp",
    "el-gouna": "/transfers/el-gouna.webp",
    "soma-bay": "/transfers/soma-bay.webp",
    safaga: "/transfers/safaga.webp",
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white md:py-28">

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">

              <span className="h-2 w-2 rounded-full bg-green-400" />

              <span className="text-sm font-semibold text-slate-200">
                Reliable Private Transfers
              </span>

            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">

              Comfortable Transfers.

              <span className="block text-orange-400">
                No Stress.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Book a private transfer between
              Hurghada Airport and your hotel, or
              travel comfortably from one hotel to
              another.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-slate-200">

              <div className="flex items-center gap-2">

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                  ✓
                </span>

                Fixed Prices

              </div>

              <div className="flex items-center gap-2">

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                  ✓
                </span>

                Private Vehicles

              </div>

              <div className="flex items-center gap-2">

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                  ✓
                </span>

                Professional Drivers

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TRUST BAR */}
      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          {/* PRIVATE TRANSFER */}
          <div className="flex items-center gap-4 px-4 py-6 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13l1.5-5A2 2 0 0 1 6.43 6.5h11.14A2 2 0 0 1 19.5 8L21 13"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 13h16v5H4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 18v2M17 18v2"
                />
                <circle cx="7.5" cy="14.5" r="1" />
                <circle cx="16.5" cy="14.5" r="1" />
              </svg>

            </div>

            <div>

              <p className="font-bold text-slate-900">
                Private Transfer
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Directly to your destination
              </p>

            </div>

          </div>

          {/* FIXED PRICES */}
          <div className="flex items-center gap-4 px-4 py-6 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="8.5" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7v10"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9.5c-.7-.7-1.7-1-3-1-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.3 0-2.3-.3-3-1"
                />
              </svg>

            </div>

            <div>

              <p className="font-bold text-slate-900">
                Fixed Prices
              </p>

              <p className="mt-1 text-sm text-slate-500">
                No hidden charges
              </p>

            </div>

          </div>

          {/* RELIABLE SERVICE */}
          <div className="flex items-center gap-4 px-4 py-6 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.5 12l2.3 2.3 4.7-5"
                />
              </svg>

            </div>

            <div>

              <p className="font-bold text-slate-900">
                Reliable Service
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Safe & comfortable journey
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* DESTINATIONS */}
      <section
        id="destinations"
        className="mx-auto max-w-7xl px-6 py-16 md:py-20"
      >

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              Airport Transfers
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Choose Your Destination
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Select your destination and book a
              private transfer from Hurghada Airport
              to your hotel.
            </p>

          </div>

          <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200 md:block">
            {items.length} destinations available
          </div>

        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {items.map((transfer) => {

            const lowestPrice = Math.min(
              ...transfer.vehicles.map(
                (vehicle) => vehicle.price
              )
            );

            const destinationImage =
              destinationImages[transfer.slug];

            return (

              <div
                key={transfer.slug}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >

                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">

                  <Image
                    src={destinationImage}
                    alt={`Private transfer to ${transfer.to}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">

                    <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                      PRIVATE TRANSFER
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">
                      Fixed Price
                    </span>

                  </div>

                  <div className="absolute bottom-5 left-5 right-5">

                    <p className="mb-1 text-sm font-semibold text-orange-400">
                      Hurghada Airport
                    </p>

                    <div className="flex items-center gap-2">

                      <h3 className="text-2xl font-extrabold text-white">
                        {transfer.to}
                      </h3>

                      <span className="text-lg text-white/70 transition-transform duration-300 group-hover:translate-x-1">
                        ↔
                      </span>

                    </div>

                  </div>

                </div>

                {/* CARD CONTENT */}
                <div className="p-6">

                  {/* ROUTE */}
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                      AIR
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Route
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-800">

                        <span className="truncate">
                          Hurghada Airport
                        </span>

                        <span className="shrink-0 text-base font-bold text-orange-500">
                          ↔
                        </span>

                        <span className="truncate">
                          {transfer.to}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* PRICE */}
                  <div className="mt-6 flex items-end justify-between">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Starting from
                      </p>

                      <div className="mt-1 flex items-baseline gap-1">

                        <span className="text-3xl font-extrabold text-slate-900">
                          €{lowestPrice}
                        </span>

                        <span className="text-sm font-medium text-slate-500">
                          / vehicle
                        </span>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-xs font-semibold text-slate-400">
                        Available
                      </p>

                      <p className="mt-1 text-sm font-bold text-green-600">
                        Multiple vehicles
                      </p>

                    </div>

                  </div>

                  {/* VEHICLES */}
                  <div className="mt-5">

                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                      Vehicle options
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {transfer.vehicles.map(
                        (vehicle) => (

                          <span
                            key={vehicle.type}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition group-hover:bg-orange-50 group-hover:text-orange-700"
                          >
                            {vehicle.type}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <Link
                      href={`/transfers/${transfer.slug}`}
                      className="flex items-center justify-center rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      View Details
                    </Link>

                    <Link
                      href={`/transfers/${transfer.slug}/book`}
                      className="flex items-center justify-center rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg"
                    >
                      Book Now
                    </Link>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </section>

      {/* WHY BOOK */}
      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">

          <div className="mx-auto max-w-2xl text-center">

            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
              Travel With Confidence
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              A smoother start to your holiday
            </h2>

            <p className="mt-4 text-slate-600">
              From the moment you land in
              Hurghada, we make getting to your
              hotel simple, comfortable and
              stress-free.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                🛡️
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Safe & Reliable
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Enjoy a comfortable private
                journey with professional service
                from pickup to destination.
              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-xl">
                €
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Transparent Pricing
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                See the price before you book. Our
                transfer rates are fixed and easy to
                understand.
              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 p-7 ring-1 ring-slate-200">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl">
                24/7
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Hassle-Free Travel
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Airport to hotel, hotel to airport
                or hotel to hotel — choose the
                service you need.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-950 px-6 py-16 text-white md:py-20">

        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-400">
              Ready to travel?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Start your journey the right way.
            </h2>

            <p className="mt-3 max-w-xl text-blue-200">
              Choose your destination, select
              your transfer type and book your
              private vehicle.
            </p>

          </div>

          <Link
            href="#destinations"
            className="shrink-0 rounded-2xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
          >
            Explore Transfers
          </Link>

        </div>

      </section>

    </main>
  );
}