import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hurghada Airport & Hotel Transfers",
  description:
    "Book reliable airport, hotel and private transfers in Hurghada, Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay and Safaga with Via Blue.",

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

  alternates: {
    canonical: "https://viabluetours.com/transfers",
  },

  openGraph: {
    title: "Hurghada Airport & Hotel Transfers | Via Blue",
    description:
      "Book reliable airport, hotel and private transfers in Hurghada and the Red Sea with Via Blue.",
    url: "https://viabluetours.com/transfers",
    siteName: "Via Blue",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hurghada Airport & Hotel Transfers | Via Blue",
    description:
      "Book reliable airport, hotel and private transfers in Hurghada with Via Blue.",
  },
};

export default function TransfersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}