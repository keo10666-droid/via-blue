import type { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/localeMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await getLocalizedAlternates("/transfers");
  return {
  title: "Hurghada Airport & Hotel Transfers | Via Blue",
  description:
    "Book premium private airport, hotel and inter-hotel transfers across Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay and Safaga with Via Blue",

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

  alternates,
  openGraph: {
    title: "Hurghada Airport & Hotel Transfers | Via Blue",
    description:
      "Enjoy reliable private airport, hotel and inter-hotel transfers across Hurghada and the Red Sea with Via Blue",
    url: alternates.canonical,
    siteName: "Via Blue",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hurghada Airport & Hotel Transfers | Via Blue",
    description:
      "Book reliable private transfers across Hurghada and the Red Sea with Via Blue",
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