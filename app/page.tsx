import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeText from "@/app/components/HomeText";
import TourText from "@/app/components/TourText";

import { tourList } from "@/data/tours";
import { supabase } from "@/lib/supabase";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { mergeHomepageContent } from "@/lib/websiteContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://viabluetours.com",
  },
  openGraph: {
    url: "https://viabluetours.com",
  },
};

function ArrowRightIcon({ className = "h-5 w-5" }: { className?: string }) {
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

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12.5l4 4L19 7"
      />
    </svg>
  );
}

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
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
        d="M12 3l7 3v5c0 4.5-3 7.8-7 10-4-2.2-7-5.5-7-10V6l7-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
}

function CompassIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2z"
      />
    </svg>
  );
}

function HeadphonesIcon({ className = "h-6 w-6" }: { className?: string }) {
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
        d="M4 14v-2a8 8 0 0116 0v2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 14a2 2 0 012-2h1v6H6a2 2 0 01-2-2v-2zM20 14a2 2 0 00-2-2h-1v6h1a2 2 0 002-2v-2z"
      />
    </svg>
  );
}

function BoatIcon({ className = "h-6 w-6" }: { className?: string }) {
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
        d="M4 15h16l-2 4H6l-2-4zM8 15V6h7l2 9M8 10h8"
      />
      <path
        strokeLinecap="round"
        d="M3 21c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"
      />
    </svg>
  );
}

export default async function Home() {
  const contentClient = createSupabaseAdminClient();
  const { data: homepageOverride } = contentClient
    ? await contentClient.from("website_content_overrides").select("content").eq("section", "homepage").maybeSingle()
    : { data: null };
  const homepageContent = mergeHomepageContent(homepageOverride?.content);

  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      "id, tour_slug, tour_name, guest_name, comment"
    )
    .eq("is_visible", true)
    .order("id", { ascending: false })
    .limit(6);

  const featuredTours = [
    tourList.find((tour) => tour.slug === "speed-boat"),
    tourList.find((tour) => tour.slug === "mahmya-island"),
  ].filter((tour) => tour !== undefined);

  return (
    <main id="top" className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[760px] overflow-hidden bg-[#03112a]">

        <Image
          src="/images/via-blue-hero.webp"
          alt="Red Sea experience in Hurghada, Egypt"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#03112a] via-[#03112a]/80 to-[#03112a]/15" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#03112a] via-transparent to-[#03112a]/20" />

        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-[120px]" />

        <div className="absolute inset-0 border-b border-white/10" />

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-28">

          <div className="max-w-4xl text-white">

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md">

              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-lg shadow-orange-400/60" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300 sm:text-xs">
                <HomeText en="Discover Hurghada" de="Entdecke Hurghada" />
              </p>

            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">

              <HomeText en="Your Holiday" de="Dein Urlaub" />

              <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                <HomeText en="Your Adventure" de="Dein Abenteuer" />
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-blue-50/90 sm:text-xl">
              <HomeText en="Discover the Red Sea with unforgettable boat trips, island escapes, desert adventures and reliable private transfers — all from Hurghada" de="Entdecke das Rote Meer mit unvergesslichen Bootstouren, Insel-Ausflügen, Wüstenabenteuern und zuverlässigen privaten Transfers ab Hurghada" />
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/tours"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4.5 text-center font-bold text-white shadow-2xl shadow-orange-950/40 transition duration-300 hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400"
              >
                <HomeText en="Explore Our Tours" de="Unsere Ausflüge entdecken" />

                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/transfers"
                className="flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 py-4.5 text-center font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-blue-950"
              >
                <HomeText en="Book a Private Transfer" de="Privaten Transfer buchen" />
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">

              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-400" />
                <HomeText en="Local Experts" de="Lokale Experten" />
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-400" />
                <HomeText en="Easy Booking" de="Einfache Buchung" />
              </div>

              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-orange-400" />
                <HomeText en="Reliable Service" de="Zuverlässiger Service" />
              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">

          <div className="mx-auto max-w-7xl px-6 pb-7">

            <div className="flex items-center gap-3 text-sm font-medium text-white/70">

              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />

              <HomeText en="Hurghada · Red Sea · Egypt" de="Hurghada · Rotes Meer · Ägypten" />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRUST BAR
      ===================================================== */}

      <section className="relative z-20 -mt-1 bg-[#03112a] text-white">

        <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          <div className="flex items-center gap-4 px-2 py-8 sm:px-8">

            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10 text-orange-400">
              <CompassIcon />
            </div>

            <div>
              <p className="font-bold">
                <HomeText en="Local Knowledge" de="Lokale Ortskenntnis" />
              </p>

              <p className="mt-1 text-sm text-blue-200">
                <HomeText en="Experiences built around Hurghada" de="Erlebnisse rund um Hurghada" />
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 px-2 py-8 sm:px-8">

            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10 text-orange-400">
              <ShieldIcon />
            </div>

            <div>
              <p className="font-bold">
                <HomeText en="Reliable Service" de="Zuverlässiger Service" />
              </p>

              <p className="mt-1 text-sm text-blue-200">
                <HomeText en="Clear booking & dependable support" de="Einfache Buchung und verlässliche Unterstützung" />
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 px-2 py-8 sm:px-8">

            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10 text-orange-400">
              <HeadphonesIcon />
            </div>

            <div>
              <p className="font-bold">
                <HomeText en="Guest Support" de="Gästeservice" />
              </p>

              <p className="mt-1 text-sm text-blue-200">
                <HomeText en="We’re here when you need us" de="Wir sind für dich da, wenn du uns brauchst" />
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MOBILE LUXURY EXPERIENCES
      ===================================================== */}

      <section className="bg-[#f7f7f5] px-5 py-12 md:hidden">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[30px] bg-[#03112a] shadow-[0_24px_70px_rgba(3,17,42,0.2)]">

            <Image
              src="/luxury-tours/private-speed-boat-hero.webp"
              alt="Private luxury experience in Hurghada"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#03112a]/45 via-[#03112a]/70 to-[#03112a]/95" />

            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 px-6 py-10 text-white">

              <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-white/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300 backdrop-blur-md">

                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/70" />

                <HomeText en="Private Collection" de="Private Erlebnisse" />

              </div>

              <h2 className="mt-6 max-w-[320px] text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
                <HomeText en="Looking for something truly special?" de="Suchst du etwas ganz Besonderes?" />
              </h2>

              <p className="mt-5 max-w-[330px] text-sm leading-7 text-blue-100/90">
                <HomeText en="If you value privacy, comfort and a more personal way to discover Hurghada, explore our private experiences designed around you" de="Wenn du Privatsphäre, Komfort und eine persönliche Art bevorzugst, Hurghada zu entdecken, sind unsere privaten Erlebnisse genau das Richtige für dich" />
              </p>

              <div className="mt-7 flex flex-col gap-3">

                <Link
                  href="/luxury-tours"
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-950/30 transition duration-300 hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400"
                >
                  <HomeText en="Explore Private Experiences" de="Private Erlebnisse entdecken" />

                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">

                  <span><HomeText en="Private Tours" de="Private Ausflüge" /></span>

                  <span className="h-1 w-1 rounded-full bg-orange-400" />

                  <span><HomeText en="Private Boats" de="Private Boote" /></span>

                  <span className="h-1 w-1 rounded-full bg-orange-400" />

                  <span><HomeText en="Private Adventures" de="Private Abenteuer" /></span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY VIA BLUE
      ===================================================== */}

      <section className="relative overflow-hidden px-6 py-24 md:py-32">

        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                <HomeText en="Why Via Blue" de="Warum Via Blue" />
              </p>

              <span className="h-px w-10 bg-orange-500" />

            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
              <HomeText en="More Than Just a Tour" de="Mehr als nur ein Ausflug" />
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              <HomeText en="Your holiday should be easy, exciting and stress-free. That’s exactly what we aim to deliver from the moment you contact us." de="Dein Urlaub soll unkompliziert, aufregend und stressfrei sein. Genau das möchten wir dir vom ersten Kontakt an bieten." />
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition duration-300 group-hover:bg-blue-950 group-hover:text-white">
                <BoatIcon />
              </div>

              <h3 className="mt-7 text-xl font-bold text-blue-950">
                <HomeText en="Carefully Selected Experiences" de="Sorgfältig ausgewählte Erlebnisse" />
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                <HomeText en="From beautiful islands and snorkeling spots to desert adventures, discover experiences worth remembering" de="Entdecke wunderschöne Inseln, Schnorchelplätze und unvergessliche Wüstenabenteuer" />
              </p>

            </div>

            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <CompassIcon />
              </div>

              <h3 className="mt-7 text-xl font-bold text-blue-950">
                <HomeText en="Local Expertise" de="Lokale Ortskenntnis" />
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                <HomeText en="We know Hurghada and the Red Sea. Our local knowledge helps us create smoother and more enjoyable experiences" de="Wir kennen Hurghada und das Rote Meer. Unsere Ortskenntnis sorgt für reibungslose und unvergessliche Erlebnisse" />
              </p>

            </div>

            <div className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition duration-300 group-hover:bg-green-600 group-hover:text-white">
                <ShieldIcon />
              </div>

              <h3 className="mt-7 text-xl font-bold text-blue-950">
                <HomeText en="Simple & Reliable" de="Einfach und zuverlässig" />
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                <HomeText en="Clear information, straightforward booking and dependable communication before and during your trip" de="Klare Informationen, einfache Buchung und zuverlässige Kommunikation vor und während deiner Reise" />
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR EXPERIENCES
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-32">

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                  <HomeText en="Explore" de="Entdecken" />
                </p>

              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                <HomeText en="Popular Experiences" de="Beliebte Erlebnisse" />
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
                <HomeText en="Start with some of our most exciting experiences" de="Entdecke einige unserer spannendsten Erlebnisse" />
                <HomeText en="in Hurghada and the Red Sea" de="in Hurghada und am Roten Meer" />
              </p>

            </div>

            <Link
              href="/tours"
              className="group hidden items-center gap-2 font-bold text-blue-950 transition hover:text-orange-500 md:flex"
            >
              <HomeText en="View All Tours" de="Alle Ausflüge ansehen" />

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          <div className="mt-10 md:hidden">

            <div className="relative overflow-hidden rounded-[30px] bg-[#03112a] px-6 py-8 shadow-[0_24px_60px_rgba(3,17,42,0.16)]">

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative z-10">

                <div className="flex items-center gap-2">

                  <span className="h-px w-7 bg-orange-400" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400">
                    <HomeText en="Explore Hurghada" de="Hurghada entdecken" />
                  </p>

                </div>

                <h3 className="mt-4 text-2xl font-bold leading-tight text-white">
                  <HomeText en="Ready to find your perfect experience?" de="Bereit, dein perfektes Erlebnis zu finden?" />
                </h3>

                <p className="mt-3 text-sm leading-6 text-blue-100/80">
                  <HomeText en="Explore our complete collection of tours, boat trips, islands, snorkeling, desert adventures and more" de="Entdecke unser gesamtes Angebot an Ausflügen, Bootstouren, Inseln, Schnorchelausflügen, Wüstenabenteuern und vielem mehr" />
                </p>

                <Link
                  href="/tours"
                  className="group mt-6 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-950/30 transition duration-300 hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400"
                >
                  <HomeText en="Explore All Tours" de="Alle Ausflüge entdecken" />

                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>

            </div>

          </div>

          <div className="mt-14 hidden gap-7 md:grid md:grid-cols-2 lg:grid-cols-3">

            {featuredTours.map((tour) => {

              return (

                <article
                  key={tour.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl"
                >

                  <Link
                    href={`/tours/${tour.slug}`}
                    className="flex flex-1 flex-col"
                  >

                    <div className="relative h-64 overflow-hidden">

                      {/* Image alt must remain a plain string; TourText is for visible copy. */}
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />

                      <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-orange-500 px-3.5 py-2 text-xs font-bold text-white shadow-xl">
                        {tour.badge}
                      </div>

                      <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-blue-950/85 px-4 py-2.5 text-white shadow-xl backdrop-blur-md">

                        <span className="text-[10px] uppercase tracking-wider text-blue-200">
                          <HomeText en="From" de="Ab" />
                        </span>

                        <div className="font-bold">
                          €{tour.price}
                          <span className="ml-1 text-xs font-normal text-blue-200">
                            / <HomeText
                              en={tour.slug === "private-quad-safari" ? "quad" : "person"}
                              de={tour.slug === "private-quad-safari" ? "Quad" : "Person"}
                            />
                          </span>
                        </div>

                      </div>

                    </div>

                    <div className="flex flex-1 flex-col p-6">

                      <h3 className="text-xl font-bold leading-7 text-blue-950 transition group-hover:text-orange-500">
                        <TourText slug={tour.slug} value={tour.name} field="name" />
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                        <TourText slug={tour.slug} value={tour.description} field="description" />
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-7">

                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                          <TourText slug={tour.slug} value={tour.type} />
                        </span>

                        <span className="flex items-center gap-1 text-sm font-bold text-blue-950 transition group-hover:text-orange-500">
                          <HomeText en="Explore" de="Entdecken" />
                          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>

                      </div>

                    </div>

                  </Link>

                  <div className="grid grid-cols-2 gap-3 px-6 pb-6">

                    <Link
                      href={`/tours/${tour.slug}`}
                      className="rounded-xl border-2 border-blue-950 py-3 text-center text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                    >
                      <HomeText en="View Tour" de="Ausflug ansehen" />
                    </Link>

                    {tour.available ? (
                      <Link
                        href={`/tours/${tour.slug}/book`}
                        className="rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-orange-600"
                      >
                        <HomeText en="Book Now" de="Jetzt buchen" />
                      </Link>
                    ) : (
                      <div className="rounded-xl bg-gray-100 py-3 text-center text-sm font-bold text-gray-400">
                        <HomeText en="Coming Soon" de="Demnächst verfügbar" />
                      </div>
                    )}

                  </div>

                </article>

              );
            })}

            {/* =================================================
                TRANSFERS CARD
            ================================================= */}

            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl">

              <Link
                href="/transfers"
                className="flex flex-1 flex-col"
              >

                <div className="relative h-64 overflow-hidden">

                  <Image
                    src="/transfers/transfers-hero.webp"
                    alt="Private airport transfers in Hurghada"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-orange-500 px-3.5 py-2 text-xs font-bold text-white shadow-xl">
                    <HomeText en="PRIVATE TRANSFER" de="PRIVATER TRANSFER" />
                  </div>

                  <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-blue-950/85 px-4 py-2.5 text-white shadow-xl backdrop-blur-md">

                    <span className="text-[10px] uppercase tracking-wider text-blue-200">
                      <HomeText en="Service" de="Leistung" />
                    </span>

                    <div className="font-bold">
                      <HomeText en="Private & Comfortable" de="Privat und komfortabel" />
                    </div>

                  </div>

                </div>

                <div className="flex flex-1 flex-col p-6">

                  <h3 className="text-xl font-bold text-blue-950 transition group-hover:text-orange-500">
                    <HomeText en="Airport & Hotel Transfers" de="Flughafen- und Hoteltransfers" />
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    <HomeText en="Travel comfortably between Hurghada Airport, hotels and surrounding destinations with a reliable private transfer" de="Reise bequem zwischen dem Flughafen Hurghada, Hotels und umliegenden Reisezielen mit einem zuverlässigen privaten Transfer" />
                  </p>

                  <div className="mt-auto pt-7">

                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800">
                      <ShieldIcon className="h-4 w-4" />
                      <HomeText en="Comfortable & Reliable" de="Komfortabel und zuverlässig" />
                    </span>

                  </div>

                </div>

              </Link>

              <div className="grid grid-cols-2 gap-3 px-6 pb-6">

                <Link
                  href="/transfers"
                  className="rounded-xl border-2 border-blue-950 py-3 text-center text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                >
                  <HomeText en="View Transfers" de="Transfers ansehen" />
                </Link>

                <Link
                  href="/transfers"
                  className="rounded-xl bg-orange-500 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-orange-600"
                >
                  <HomeText en="Book Now" de="Jetzt buchen" />
                </Link>

              </div>

            </article>

          </div>

          <div className="mt-12 hidden text-center md:block">

            <Link
              href="/tours"
              className="group inline-flex items-center gap-3 rounded-2xl border-2 border-blue-950 px-7 py-3.5 font-bold text-blue-950 shadow-sm transition hover:-translate-y-1 hover:bg-blue-950 hover:text-white hover:shadow-xl"
            >
              <HomeText en="Discover All Experiences" de="Alle Erlebnisse entdecken" />

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE BANNER
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#03112a] px-6 py-24 text-white md:py-28">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-700/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-400" />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                <HomeText en={homepageContent.experience_badge} de="Das Rote Meer wartet auf Sie" />
              </p>

            </div>

            <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              <HomeText en={homepageContent.experience_title_first} de="Schwimmen" />
              <span className="text-orange-400"> <HomeText en={homepageContent.experience_title_highlight} de="Entdecken" /></span>
              <br />
              <HomeText en={homepageContent.experience_title_last} de="Erinnerungen schaffen" />
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              <HomeText en={homepageContent.experience_description} de="Von kristallklarem Wasser und wunderschönen Inseln bis hin zu unvergesslichen Wüstenlandschaften – in Hurghada wartet ein Erlebnis auf Sie." />
            </p>

            <Link
              href="/tours"
              className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-4 font-bold text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400"
            >
              <HomeText en={homepageContent.experience_button} de="Erlebnis finden" />

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">

              <p className="text-4xl font-bold text-orange-400">
                50+
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                <HomeText en="Experiences" de="Erlebnisse" />
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">

              <p className="text-4xl font-bold text-orange-400">
                Local
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                <HomeText en="Local Guides" de="Lokale Guides" />
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">

              <p className="text-4xl font-bold text-orange-400">
                24/7
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                <HomeText en="Guest Support" de="Gästeservice" />
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">

              <p className="text-4xl font-bold text-orange-400">
                100%
              </p>

              <p className="mt-2 text-sm font-medium text-blue-100">
                <HomeText en="Holiday Focus" de="Urlaub im Mittelpunkt" />
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GUEST REVIEWS
      ===================================================== */}

      {reviews && reviews.length > 0 && (

        <section className="relative overflow-hidden px-6 py-24 md:py-32">

          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-50/70 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-50/70 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">

            <div className="mx-auto max-w-3xl text-center">

              <div className="flex items-center justify-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                  <HomeText en="Real Guest Experiences" de="Echte Gästeerlebnisse" />
                </p>

                <span className="h-px w-10 bg-orange-500" />

              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                <HomeText en="What Our Guests Say" de="Das sagen unsere Gäste" />
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                <HomeText en="Nothing says more about an experience than the people who have already enjoyed it" de="Nichts erzählt mehr über ein Erlebnis als die Menschen, die es bereits genossen haben" />
              </p>

            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {reviews.map((review) => (

                <article
                  key={review.id}
                  className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-7 shadow-md transition duration-500 hover:-translate-y-2 hover:border-orange-100 hover:shadow-2xl"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <h3 className="font-bold text-blue-950">
                        {review.guest_name}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-gray-500">
                        {review.tour_name}
                      </p>

                    </div>

                    
                  </div>

                  <div className="mt-6 flex-1">

                    <p className="text-[34px] leading-none text-orange-400">
                      “
                    </p>

                    <p className="mt-1 leading-7 text-gray-600">
                      {review.comment}
                    </p>

                  </div>

                  <Link
                    href={`/tours/${review.tour_slug}`}
                    className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-950 transition group-hover:text-orange-500"
                  >
                    <HomeText en="View Experience" de="Erlebnis ansehen" />

                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                </article>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-32">

        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-10 bg-orange-500" />

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              <HomeText en={homepageContent.cta_badge} de="Ihr Hurghada-Abenteuer beginnt hier" />
            </p>

            <span className="h-px w-10 bg-orange-500" />

          </div>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-blue-950 sm:text-5xl md:text-6xl">

            <HomeText en={homepageContent.cta_title_first} de="Besuchen Sie Hurghada nicht nur" />

            <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              <HomeText en={homepageContent.cta_title_highlight} de="Erleben Sie es" />
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            <HomeText en={homepageContent.cta_description} de="Wählen Sie Ihr nächstes Abenteuer, buchen Sie mit Vertrauen und freuen Sie sich auf ein unvergessliches Erlebnis am Roten Meer." />
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="#top"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-200 transition hover:-translate-y-1 hover:from-orange-400 hover:to-amber-400"
            >
              <HomeText en={homepageContent.cta_primary_button} de="Touren entdecken" />

              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/transfers"
              className="flex items-center justify-center rounded-2xl border-2 border-blue-950 px-8 py-4 font-bold text-blue-950 transition hover:-translate-y-1 hover:bg-blue-950 hover:text-white hover:shadow-xl"
            >
              <HomeText en={homepageContent.cta_secondary_button} de="Transfers ansehen" />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}