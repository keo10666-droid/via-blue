import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/luxury-tours");
  return {
  title: seo.title,
  description: seo.description,
  alternates: seo.alternates,
  keywords: seo.locale === "de" ? ["private Luxustouren Ägypten", "private Ausflüge Hurghada", "Luxor Kairo Privattour"] : seo.locale === "fr" ? ["circuits privés Égypte", "excursions privées Hurghada", "visite privée Louxor Le Caire"] : seo.locale === "ro" ? ["tururi private Egipt", "excursii private Hurghada", "tur privat Luxor Cairo"] : seo.locale === "ru" ? ["индивидуальные туры Египет", "частные экскурсии Хургада", "VIP тур Луксор Каир"] : ["private luxury tours Egypt", "private Hurghada excursions", "Luxor Cairo private tours"],
  openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: getOpenGraphLocale(seo.locale) },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};
}

export default function LuxuryToursLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}