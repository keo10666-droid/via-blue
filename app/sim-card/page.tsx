import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";
import Link from "next/link";
import SimCardSection from "@/app/components/SimCardSection";
import HomeText from "@/app/components/HomeText";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/sim-card");
  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.alternates,
    openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: getOpenGraphLocale(seo.locale) },
  };
}

export default async function SimCardPage() {
  const seo = await getLocalizedSeo("/sim-card");
  const homeHref = seo.locale === "en" ? "/" : `/${seo.locale}`;
  return (
    <main className="min-h-screen bg-[#f7f7f5] pt-24">
      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-6">
        <Link href={homeHref} className="text-sm font-semibold text-slate-500 transition hover:text-orange-600">
          ← <HomeText en="Back to homepage" de="Zurück zur Startseite" />
        </Link>
      </div>
      <SimCardSection />
    </main>
  );
}
