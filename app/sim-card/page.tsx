import type { Metadata } from "next";
import Link from "next/link";
import SimCardSection from "@/app/components/SimCardSection";
import HomeText from "@/app/components/HomeText";

export const metadata: Metadata = {
  title: "Stay Connected | Egypt SIM Card | Via Blue",
  description: "Get your Egypt SIM card with 25 GB data and calls. Choose your network and convenient airport pickup or hotel delivery.",
  alternates: { canonical: "https://viabluetours.com/sim-card" },
};

export default function SimCardPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] pt-24">
      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-6">
        <Link href="/" className="text-sm font-semibold text-slate-500 transition hover:text-orange-600">
          ← <HomeText en="Back to homepage" de="Zurück zur Startseite" />
        </Link>
      </div>
      <SimCardSection />
    </main>
  );
}
