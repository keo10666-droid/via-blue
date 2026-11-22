import type { Metadata } from "next";
import { getLocalizedSeo } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/ai-trip-planner");
  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.alternates,
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
