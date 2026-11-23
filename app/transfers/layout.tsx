import type { Metadata } from "next";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getLocalizedSeo("/transfers");
  return {
  title: seo.title,
  description: seo.description,

  keywords: [
    "Hurghada airport transfer",
    "Hurghada transfers",
    "Hurghada hotel transfer",
    "Hurghada private transfer",
    "Hurghada airport taxi",
    "Sahl Hasheesh transfer",
    "Makadi Bay transfer",
    "El Gouna transfer",
    "Soma Bay transfer",
    "Safaga transfer",
  ],

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