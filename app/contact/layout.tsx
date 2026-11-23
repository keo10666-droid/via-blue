import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/contact");
  return {
  title: seo.title,
  description: seo.description,
  keywords: seo.locale === "de" ? ["Via Blue Kontakt", "Hurghada Ausflüge buchen", "Hurghada Flughafentransfer", "Tourismus Ägypten"] : seo.locale === "fr" ? ["contact Via Blue", "réserver excursions Hurghada", "transfert aéroport Hurghada", "tourisme Égypte"] : seo.locale === "ro" ? ["contact Via Blue", "rezervări excursii Hurghada", "transfer aeroport Hurghada", "turism Egipt"] : seo.locale === "ru" ? ["контакты Via Blue", "экскурсии Хургада бронирование", "трансфер аэропорт Хургада", "туризм Египет"] : ["Via Blue contact", "book Hurghada tours", "Hurghada airport transfer", "Egypt tourism"],
  alternates: seo.alternates,
  openGraph: { title: seo.title, description: seo.description, url: seo.alternates.canonical, siteName: "Via Blue", type: "website", locale: getOpenGraphLocale(seo.locale) },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}