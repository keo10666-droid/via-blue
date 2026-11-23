import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/tours");
  return {
  title: seo.title,
  description: seo.description,

  keywords: seo.locale === "de" ? ["Ausflüge in Hurghada", "Touren in Hurghada", "Bootstouren Rotes Meer", "Schnorcheln Hurghada", "Tauchen Hurghada", "Wüstensafari Hurghada", "Ägypten Ausflüge"] : seo.locale === "fr" ? ["excursions à Hurghada", "activités à Hurghada", "sorties en mer Rouge", "snorkeling Hurghada", "plongée Hurghada", "safari désert Hurghada", "excursions en Égypte"] : seo.locale === "ro" ? ["excursii în Hurghada", "tururi în Hurghada", "plimbări cu barca Marea Roșie", "snorkeling Hurghada", "scufundări Hurghada", "safari în deșert Hurghada", "excursii în Egipt"] : seo.locale === "ru" ? ["экскурсии в Хургаде", "туры в Хургаде", "морские прогулки Красное море", "снорклинг Хургада", "дайвинг Хургада", "сафари по пустыне Хургада", "экскурсии по Египту"] : ["Hurghada tours", "Hurghada excursions", "Hurghada activities", "Hurghada boat trips", "Hurghada snorkeling", "Hurghada diving", "Hurghada desert safari", "Hurghada dolphin tours", "Red Sea tours", "Egypt excursions"],

  alternates: seo.alternates,
  openGraph: { title: seo.title,
    description: seo.description,
    url: seo.alternates.canonical,
    siteName: "Via Blue",
    type: "website",
    locale: getOpenGraphLocale(seo.locale),
  },

  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};
}

export default function ToursLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}