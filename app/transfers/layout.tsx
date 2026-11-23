import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/transfers");
  return {
  title: seo.title,
  description: seo.description,

  keywords: seo.locale === "de" ? ["Flughafentransfer Hurghada", "Privater Transfer Hurghada", "Hoteltransfer Hurghada", "Transfer Ägypten", "Transfer Sahl Hasheesh", "Transfer Makadi Bay", "Transfer El Gouna", "Transfer Soma Bay", "Transfer Safaga"] : seo.locale === "fr" ? ["transfert aéroport Hurghada", "transfert privé Hurghada", "transfert hôtel Hurghada", "transfert Égypte", "transfert Sahl Hasheesh", "transfert baie de Makadi", "transfert El Gouna", "transfert Soma Bay", "transfert Safaga"] : seo.locale === "ro" ? ["transfer aeroport Hurghada", "transfer privat Hurghada", "transfer hotel Hurghada", "transfer Egipt", "transfer Sahl Hasheesh", "transfer Makadi Bay", "transfer El Gouna", "transfer Soma Bay", "transfer Safaga"] : seo.locale === "ru" ? ["трансфер из аэропорта Хургады", "индивидуальный трансфер Хургада", "трансфер до отеля Хургада", "трансфер по Египту", "трансфер Сахл-Хашиш", "трансфер Макади-Бей", "трансфер Эль-Гуна", "трансфер Сома-Бей", "трансфер Сафага"] : ["Hurghada airport transfer", "Hurghada transfers", "Hurghada hotel transfer", "Hurghada private transfer", "Hurghada airport taxi", "Sahl Hasheesh transfer", "Makadi Bay transfer", "El Gouna transfer", "Soma Bay transfer", "Safaga transfer"],

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

export default function TransfersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}