import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/about");
  return {
  title: seo.title,
  description: seo.description,
  keywords: seo.locale === "de" ? ["Via Blue Hurghada", "Tourismusunternehmen Hurghada", "Ausflüge Rotes Meer", "Transfers Ägypten"] : seo.locale === "fr" ? ["Via Blue Hurghada", "agence touristique Hurghada", "excursions mer Rouge", "transferts Égypte"] : seo.locale === "ro" ? ["Via Blue Hurghada", "companie turism Hurghada", "excursii Marea Roșie", "transferuri Egipt"] : seo.locale === "ru" ? ["Via Blue Хургада", "туристическая компания Хургада", "экскурсии Красное море", "трансферы Египет"] : ["Via Blue", "Hurghada tourism company", "Red Sea excursions", "Egypt transfers"],
  alternates: seo.alternates,
  openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: getOpenGraphLocale(seo.locale) },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};
}

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}