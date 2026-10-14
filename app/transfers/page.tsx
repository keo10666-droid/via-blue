"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { transfers } from "@/data/transfers";
import HomeText from "@/app/components/HomeText";
import { germanTransferLocation, germanTransferVehicle } from "@/lib/germanTransferCopy";

type TransferOverride = {
  from?: string; to?: string; available?: boolean;
  vehicles?: { type: string; price: number; passengers: number; luggage: number }[];
};

export default function TransfersPage() {
  const router = useRouter();
  const [overrides, setOverrides] = useState<Record<string, TransferOverride>>({});
  useEffect(() => {
    let cancelled = false;
    fetch("/api/transfer-catalog", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => { if (!cancelled && payload?.overrides) setOverrides(payload.overrides); })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);
  const items = Object.values(transfers)
    .map((transfer) => ({ ...transfer, ...(overrides[transfer.slug] ?? {}) }))
    .filter((transfer) => transfer.available !== false);

  const destinationImages: Record<string, string> = {
    "hurghada-city": "/transfers/hurghada-city.webp",
    "sahl-hasheesh": "/transfers/sahl-hasheesh.webp",
    "makadi-bay": "/transfers/makadi-bay.webp",
    "el-gouna": "/transfers/el-gouna.webp",
    "soma-bay": "/transfers/soma-bay.webp",
    safaga: "/transfers/safaga.webp",
  };

  function handleCardClick(
    event: React.MouseEvent<HTMLDivElement>,
    slug: string
  ) {
    const target = event.target as HTMLElement;

    if (target.closest("a") || target.closest("button")) {
      return;
    }

    router.push(`/transfers/${slug}`);
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white md:py-28">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl">

              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]" />

              <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-200">
                <HomeText en="Reliable Private Transfers" de="Zuverlässige private Transfers" />
              </span>

            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl">

              <HomeText en="Comfortable Transfers" de="Komfortable Transfers" />

              <span className="mt-2 block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                <HomeText en="No Stress" de="Ganz ohne Stress" />
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              <HomeText en="Book a private transfer between Hurghada Airport and your hotel, or travel comfortably from one hotel to another" de="Buchen Sie einen privaten Transfer zwischen dem Flughafen Hurghada und Ihrem Hotel oder reisen Sie bequem von Hotel zu Hotel." />
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-slate-200">

              <div className="flex items-center gap-2.5">

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-green-400/20 bg-green-500/10 text-xs text-green-400">
                  ✓
                </span>

                <HomeText en="Fixed Prices" de="Festpreise" />

              </div>

              <div className="flex items-center gap-2.5">

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-green-400/20 bg-green-500/10 text-xs text-green-400">
                  ✓
                </span>

                <HomeText en="Private Vehicles" de="Private Fahrzeuge" />

              </div>

              <div className="flex items-center gap-2.5">

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-green-400/20 bg-green-500/10 text-xs text-green-400">
                  ✓
                </span>

                <HomeText en="Professional Drivers" de="Professionelle Fahrer" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TRUST BAR */}
      <section className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200/70 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          {/* PRIVATE TRANSFER */}
          <div className="flex items-center gap-4 px-4 py-7 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/80 text-blue-600 shadow-sm">

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

              <p className="font-extrabold tracking-[-0.01em] text-slate-900">
                <HomeText en="Private Transfer" de="Privater Transfer" />
              </p>

              <p className="mt-1 text-sm text-slate-500">
                <HomeText en="Directly to your destination" de="Direkt zu Ihrem Ziel" />
              </p>

            </div>

          </div>

          {/* FIXED PRICES */}
          <div className="flex items-center gap-4 px-4 py-7 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50/80 text-orange-500 shadow-sm">

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

              <p className="font-extrabold tracking-[-0.01em] text-slate-900">
                <HomeText en="Fixed Prices" de="Festpreise" />
              </p>

              <p className="mt-1 text-sm text-slate-500">
                <HomeText en="No hidden charges" de="Keine versteckten Kosten" />
              </p>

            </div>

          </div>

          {/* RELIABLE SERVICE */}
          <div className="flex items-center gap-4 px-4 py-7 sm:px-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-100 bg-green-50/80 text-green-600 shadow-sm">

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

              <p className="font-extrabold tracking-[-0.01em] text-slate-900">
                <HomeText en="Reliable Service" de="Zuverlässiger Service" />
              </p>

              <p className="mt-1 text-sm text-slate-500">
                <HomeText en="Safe & comfortable journey" de="Sichere und komfortable Fahrt" />
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

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.28em] text-orange-500">
              <HomeText en="Airport Transfers" de="Flughafentransfers" />
            </p>

            <h2 className="text-3xl font-black tracking-[-0.035em] text-slate-900 md:text-4xl">
              <HomeText en="Choose Your Destination" de="Wählen Sie Ihr Reiseziel" />
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              <HomeText en="Select your destination and book a private transfer from Hurghada Airport to your hotel" de="Wählen Sie Ihr Reiseziel und buchen Sie einen privaten Transfer vom Flughafen Hurghada zu Ihrem Hotel." />
            </p>

          </div>

          <div className="hidden rounded-full border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm font-bold text-slate-500 shadow-sm backdrop-blur-md md:block">
            {items.length} <HomeText en="destinations available" de="Reiseziele verfügbar" />
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
                role="link"
                tabIndex={0}
                onClick={(event) =>
                  handleCardClick(event, transfer.slug)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    router.push(
                      `/transfers/${transfer.slug}`
                    );
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-slate-200/80 outline-none transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.13)] focus-visible:ring-2 focus-visible:ring-orange-400"
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

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-orange-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">

                    <span className="rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.12em] text-white shadow-lg backdrop-blur-xl">
                      <HomeText en="PRIVATE TRANSFER" de="PRIVATER TRANSFER" />
                    </span>

                    <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-lg backdrop-blur-md">
                      <HomeText en="Fixed Price" de="Festpreis" />
                    </span>

                  </div>

                  <div className="absolute bottom-5 left-5 right-5">

                    <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-orange-300">
                      <HomeText en={transfer.from} de={germanTransferLocation(transfer.from)} />
                    </p>

                    <div className="flex items-center gap-2">

                      <h3 className="text-2xl font-black tracking-[-0.025em] text-white">
                        <HomeText en={transfer.to} de={germanTransferLocation(transfer.to)} />
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
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition-colors duration-300 group-hover:border-blue-100 group-hover:bg-blue-50/40">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xs font-extrabold tracking-wide text-blue-700">
                      AIR
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        <HomeText en="Route" de="Strecke" />
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-800">

                        <span className="truncate">
                          <HomeText en={transfer.from} de={germanTransferLocation(transfer.from)} />
                        </span>

                        <span className="shrink-0 text-base font-bold text-orange-500">
                          ↔
                        </span>

                        <span className="truncate">
                          <HomeText en={transfer.to} de={germanTransferLocation(transfer.to)} />
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* PRICE */}
                  <div className="mt-6 flex items-end justify-between">

                    <div>

                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        <HomeText en="Starting from" de="Ab" />
                      </p>

                      <div className="mt-1 flex items-baseline gap-1">

                        <span className="text-3xl font-black tracking-[-0.04em] text-slate-900">
                          €{lowestPrice}
                        </span>

                        <span className="text-sm font-medium text-slate-500">
                          / <HomeText en="vehicle" de="Fahrzeug" />
                        </span>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                        <HomeText en="Available" de="Verfügbar" />
                      </p>

                      <p className="mt-1 text-sm font-extrabold text-green-600">
                        <HomeText en="Multiple vehicles" de="Mehrere Fahrzeuge" />
                      </p>

                    </div>

                  </div>

                  {/* VEHICLES */}
                  <div className="mt-5">

                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                      <HomeText en="Vehicle options" de="Fahrzeugoptionen" />
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {transfer.vehicles.map(
                        (vehicle) => (

                          <span
                            key={vehicle.type}
                            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-all duration-300 group-hover:border-orange-100 group-hover:bg-orange-50 group-hover:text-orange-700"
                          >
                            <HomeText en={vehicle.type} de={germanTransferVehicle(vehicle.type)} />
                          </span>

                        )
                      )}

                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <Link
                      href={`/transfers/${transfer.slug}`}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-extrabold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                    >
                      <HomeText en="View Details" de="Details ansehen" />
                    </Link>

                    <Link
                      href={`/transfers/${transfer.slug}/book`}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl hover:shadow-orange-500/25"
                    >
                      <HomeText en="Book Now" de="Jetzt buchen" />
                    </Link>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </section>

      {/* WHY BOOK */}
      <section className="border-y border-slate-200/70 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">

          <div className="mx-auto max-w-2xl text-center">

            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.28em] text-orange-500">
              <HomeText en="Travel With Confidence" de="Reisen Sie mit Vertrauen" />
            </p>

            <h2 className="text-3xl font-black tracking-[-0.035em] text-slate-900 md:text-4xl">
              <HomeText en="A smoother start to your holiday" de="Ein entspannter Start in Ihren Urlaub" />
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              <HomeText en="From the moment you land in Hurghada, we make getting to your hotel simple, comfortable and stress-free" de="Von Ihrer Ankunft in Hurghada an gestalten wir den Weg zu Ihrem Hotel einfach, bequem und stressfrei." />
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="group rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-100 text-xl transition-transform duration-300 group-hover:scale-105">
                🛡️
              </div>

              <h3 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-900">
                <HomeText en="Safe & Reliable" de="Sicher und zuverlässig" />
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                <HomeText en="Enjoy a comfortable private journey with professional service from pickup to destination" de="Genießen Sie eine komfortable private Fahrt mit professionellem Service vom Abholort bis zum Ziel." />
              </p>

            </div>

            <div className="group rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-100 bg-orange-100 text-xl transition-transform duration-300 group-hover:scale-105">
                €
              </div>

              <h3 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-900">
                <HomeText en="Transparent Pricing" de="Transparente Preise" />
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                <HomeText en="See the price before you book. Our transfer rates are fixed and easy to understand" de="Sehen Sie den Preis vor der Buchung. Unsere Transferpreise sind fest und leicht verständlich." />
              </p>

            </div>

            <div className="group rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-green-100 bg-green-100 text-xl transition-transform duration-300 group-hover:scale-105">
                24/7
              </div>

              <h3 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-900">
                <HomeText en="Hassle-Free Travel" de="Stressfreies Reisen" />
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                <HomeText en="Airport to hotel, hotel to airport or hotel to hotel — choose the service you need" de="Flughafen zum Hotel, Hotel zum Flughafen oder von Hotel zu Hotel – wählen Sie den passenden Service." />
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-blue-950 px-6 py-16 text-white md:py-20">

        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          <div>

            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-orange-400">
              <HomeText en="Ready to travel?" de="Bereit für Ihre Reise?" />
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] md:text-4xl">
              <HomeText en="Start your journey the right way" de="Starten Sie Ihre Reise richtig" />
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-blue-200">
              <HomeText en="Choose your destination, select your transfer type and book your private vehicle" de="Wählen Sie Ihr Reiseziel und Ihre Transferart und buchen Sie Ihr privates Fahrzeug." />
            </p>

          </div>

          <Link
            href="#destinations"
            className="shrink-0 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-4 font-extrabold text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-600 hover:to-amber-600 hover:shadow-2xl hover:shadow-orange-500/25"
          >
            <HomeText en="Explore Transfers" de="Transfers entdecken" />
          </Link>

        </div>

      </section>

    </main>
  );
}