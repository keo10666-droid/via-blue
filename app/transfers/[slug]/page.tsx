import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { transfers } from "@/data/transfers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const transfer =
    transfers[slug as keyof typeof transfers];

  if (!transfer) {
    return {
      title: "Transfer Not Found",
      description: "The requested transfer could not be found.",
      metadataBase: new URL("https://viabluetours.com"),
    };
  }

  const title = `${transfer.from} to ${transfer.to} Transfer`;

  const description = `Book a private transfer from ${transfer.from} to ${transfer.to} with Via Blue. Comfortable vehicles, professional drivers and fixed prices.`;

  const canonicalUrl = `https://viabluetours.com/transfers/${slug}`;

  return {
    metadataBase: new URL("https://viabluetours.com"),

    title,
    description,

    keywords: [
      `${transfer.from} to ${transfer.to} transfer`,
      `${transfer.to} transfer`,
      "Hurghada airport transfer",
      "Hurghada private transfer",
      "Hurghada airport taxi",
      "Hurghada transfers",
      "Egypt airport transfer",
      "Via Blue",
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: `${title} | Via Blue`,
      description,
      url: canonicalUrl,
      siteName: "Via Blue",
      type: "website",
      locale: "en_US",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Via Blue`,
      description,
    },
  };
}

const vehicleImages: Record<string, string> = {
  Sedan: "/vehicles/sedan.webp",
  "X-Pander": "/vehicles/x-pander.webp",
  Van: "/vehicles/van.webp",
  Luxury: "/vehicles/luxury.webp",
  Coster: "/vehicles/coster.webp",
};

export default async function TransferPage({ params }: Props) {
  const { slug } = await params;

  const transfer =
    transfers[slug as keyof typeof transfers];

  if (!transfer) {
    notFound();
  }

  const lowestPrice = Math.min(
    ...transfer.vehicles.map((vehicle) => vehicle.price)
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-blue-950 px-6 py-16 text-white md:py-20">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/30 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-[450px] w-[450px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="flex items-center gap-3">

            <span className="h-px w-12 bg-orange-400" />

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400 sm:text-sm">
              Private Airport Transfer
            </p>

          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {transfer.to}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Comfortable private transfer from Hurghada International Airport
            to your destination
          </p>

          <div className="mt-7 flex flex-wrap gap-3">

            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              ✓ Private Vehicle
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              ✓ Professional Driver
            </div>

            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              ✓ Fixed Price
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">

        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

          {/* =================================================
              VEHICLES
          ================================================= */}

          <div>

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                  Choose Your Ride
                </p>

              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                Choose Your Vehicle
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                Select the vehicle that best suits your group and luggage
              </p>

            </div>


            <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2">

              {transfer.vehicles.map((vehicle) => (

                <article
                  key={vehicle.type}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                >

                  {/* Vehicle Image */}

                  <div className="relative h-56 overflow-hidden bg-slate-100">

                    <Image
                      src={vehicleImages[vehicle.type]}
                      alt={vehicle.type}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/10 to-transparent" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-blue-950/80 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-md">
                      Private Transfer
                    </div>

                    <div className="absolute bottom-4 left-5">

                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Via Blue
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        {vehicle.type}
                      </p>

                    </div>

                  </div>


                  {/* Vehicle Content */}

                  <div className="flex flex-1 flex-col p-6">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h3 className="text-2xl font-bold tracking-tight text-blue-950 transition-colors duration-300 group-hover:text-orange-500">
                          {vehicle.type}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          Private & comfortable transfer
                        </p>

                      </div>


                      <div className="shrink-0 text-right">

                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          From
                        </p>

                        <div className="mt-0.5 flex items-baseline justify-end gap-1">

                          <span className="text-2xl font-extrabold tracking-tight text-orange-500">
                            €{vehicle.price}
                          </span>

                        </div>

                        <p className="text-[10px] font-medium text-slate-400">
                          per vehicle
                        </p>

                      </div>

                    </div>


                    {/* Vehicle Details */}

                    <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">

                      <div className="border-r border-slate-100 px-4 py-3.5">

                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                          Passengers
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-950">
                          {vehicle.passengers} Guests
                        </p>

                      </div>


                      <div className="px-4 py-3.5">

                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                          Luggage
                        </p>

                        <p className="mt-1 text-sm font-bold text-blue-950">
                          {vehicle.luggage} Bags
                        </p>

                      </div>

                    </div>


                    {/* Included */}

                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-500">

                      <span className="flex items-center gap-1.5">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-50 text-[9px] font-bold text-green-600">
                          ✓
                        </span>
                        Private vehicle
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-50 text-[9px] font-bold text-green-600">
                          ✓
                        </span>
                        Professional driver
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-50 text-[9px] font-bold text-green-600">
                          ✓
                        </span>
                        Fixed price
                      </span>

                    </div>


                    {/* Book Button */}

                    <Link
                      href={`/transfers/${transfer.slug}/book`}
                      className="group/button mt-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-950 px-5 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-500/20"
                    >

                      Book {vehicle.type}

                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />

                    </Link>

                  </div>

                </article>

              ))}

            </div>

          </div>


          {/* =================================================
              SUMMARY
          ================================================= */}

          <aside>

            <div className="sticky top-24 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">

              {/* Summary Header */}

              <div className="relative overflow-hidden bg-blue-950 p-6 text-white">

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl" />

                <div className="relative">

                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">
                    Your Transfer
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    Transfer Summary
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-blue-100">
                    Simple, comfortable and private
                  </p>

                </div>

              </div>


              <div className="p-6">

                <div className="space-y-3">

                  {/* From */}

                  <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      From
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-blue-950">
                      {transfer.from}
                    </p>

                  </div>


                  {/* To */}

                  <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      To
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-orange-700">
                      {transfer.to}
                    </p>

                  </div>


                  {/* Price */}

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Starting From
                    </p>

                    <div className="mt-1 flex items-end gap-2">

                      <span className="text-3xl font-extrabold tracking-tight text-blue-950">
                        €{lowestPrice}
                      </span>

                      <span className="mb-1 text-xs font-medium text-slate-500">
                        / vehicle
                      </span>

                    </div>

                  </div>


                  {/* Included */}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <p className="text-sm font-bold text-blue-950">
                      What's Included
                    </p>

                    <ul className="mt-4 space-y-3 text-xs font-medium text-slate-600">

                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                          ✓
                        </span>
                        Private vehicle
                      </li>

                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                          ✓
                        </span>
                        Airport pickup
                      </li>

                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                          ✓
                        </span>
                        Professional driver
                      </li>

                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                          ✓
                        </span>
                        Fixed price
                      </li>

                      <li className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                          ✓
                        </span>
                        Direct transfer
                      </li>

                    </ul>

                  </div>

                </div>


                <Link
                  href="/transfers"
                  className="mt-5 flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-950 px-5 py-3.5 text-center text-sm font-bold text-blue-950 transition-all duration-300 hover:bg-blue-950 hover:text-white"
                >
                  ← Back to Transfers
                </Link>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   ARROW ICON
========================================================= */

function ArrowRightIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}