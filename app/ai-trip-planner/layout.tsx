import type { Metadata } from "next";
import { getLocalizedSeo } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/ai-trip-planner");
  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.alternates,
    keywords: seo.locale === "de" ? ["KI Reiseplaner Hurghada", "Urlaubsplanung Ägypten", "Hurghada Ausflüge planen"] : seo.locale === "fr" ? ["planificateur voyage IA Hurghada", "organiser séjour Égypte", "excursions Hurghada budget"] : seo.locale === "ro" ? ["planificator călătorie AI Hurghada", "planificare vacanță Egipt", "excursii Hurghada buget"] : seo.locale === "ru" ? ["AI планировщик Хургада", "планирование отдыха Египет", "экскурсии Хургада бюджет"] : ["Hurghada trip planner", "Egypt holiday planner", "Hurghada tours by budget"],
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.alternates.canonical,
      siteName: "Via Blue",
      type: "website",
      locale: seo.locale === "de" ? "de_DE" : seo.locale === "fr" ? "fr_FR" : seo.locale === "ro" ? "ro_RO" : seo.locale === "ru" ? "ru_RU" : "en_US",
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default function AiTripPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
