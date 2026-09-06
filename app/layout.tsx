import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viabluetours.com"),

  title: {
    default: "Via Blue | Tours & Transfers in Hurghada",
    template: "%s | Via Blue",
  },

  description:
    "Discover unforgettable tours, excursions and professional airport and hotel transfers in Hurghada and the Red Sea with Via Blue.",

  keywords: [
    "Hurghada tours",
    "Hurghada excursions",
    "Hurghada transfers",
    "Hurghada airport transfer",
    "Red Sea tours",
    "Egypt tours",
    "Hurghada activities",
    "Via Blue",
  ],

  authors: [{ name: "Via Blue" }],
  creator: "Via Blue",
  publisher: "Via Blue",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://viabluetours.com",
  },

  openGraph: {
    type: "website",
    url: "https://viabluetours.com",
    siteName: "Via Blue",
    title: "Via Blue | Tours & Transfers in Hurghada",
    description:
      "Discover unforgettable tours, excursions and professional airport and hotel transfers in Hurghada and the Red Sea with Via Blue.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Via Blue | Tours & Transfers in Hurghada",
    description:
      "Discover unforgettable tours, excursions and professional airport and hotel transfers in Hurghada and the Red Sea with Via Blue.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}