import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CurrencyProvider } from "./components/CurrencyProvider";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { mergeSiteSettings } from "@/lib/siteSettings";
import { headers } from "next/headers";
import { LocaleProvider, type SiteLocale } from "./components/LocaleProvider";
import { getLocalizedSeo, getOpenGraphLocale } from "@/lib/localeMetadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createSupabaseAdminClient();
  const { data } = supabase
    ? await supabase.from("website_content_overrides").select("content").eq("section", "site-settings").maybeSingle()
    : { data: null };
  const settings = mergeSiteSettings(data?.content);
  const requestHeaders = await headers();
  const seoLocale = requestHeaders.get("x-via-blue-locale") ?? "en";
  const localizedSeo = await getLocalizedSeo("/");
  const keywords = seoLocale === "de"
    ? ["Hurghada Ausflüge", "Rotes Meer Bootstouren", "Schnorcheln Hurghada", "Wüstensafari Ägypten", "private Transfers Hurghada"]
    : seoLocale === "fr"
      ? ["excursions Hurghada", "sorties en bateau mer Rouge", "snorkeling Hurghada", "safari désert Égypte", "transferts privés Hurghada"]
      : seoLocale === "ro"
        ? ["excursii Hurghada", "plimbări cu barca Marea Roșie", "snorkeling Hurghada", "safari în deșert Egipt", "transferuri private Hurghada"]
        : seoLocale === "ru"
          ? ["экскурсии Хургада", "морские прогулки Красное море", "снорклинг Хургада", "сафари Египет", "частные трансферы Хургада"]
          : settings.seo_keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean);

  return {
    metadataBase: new URL("https://www.viabluetours.com"),
    title: {
      default: localizedSeo.title ?? settings.seo_title,
      template: "%s | Via Blue",
    },
    description: localizedSeo.description ?? settings.seo_description,
    keywords,
    authors: [{ name: "Via Blue" }],
    creator: "Via Blue",
    publisher: "Via Blue",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: "Via Blue",
      title: localizedSeo.title ?? settings.seo_title,
      description: localizedSeo.description ?? settings.seo_description,
      locale: getOpenGraphLocale(seoLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: localizedSeo.title ?? settings.seo_title,
      description: localizedSeo.description ?? settings.seo_description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-via-blue-locale");
  const locale: SiteLocale = requestedLocale === "de" || requestedLocale === "fr" || requestedLocale === "ro" || requestedLocale === "ru" ? requestedLocale : "en";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.viabluetours.com/#organization",
    name: "Via Blue",
    url: "https://www.viabluetours.com",
    logo: "https://www.viabluetours.com/logo/logo.svg",
    description: "Hurghada-based tourism company and tour operator offering Red Sea excursions, boat trips, snorkeling, diving, desert safaris, Egypt day trips and private transfers.",
    areaServed: [
      { "@type": "City", name: "Hurghada" },
      { "@type": "AdministrativeArea", name: "Red Sea Governorate" },
      { "@type": "Country", name: "Egypt" },
    ],
    knowsAbout: [
      "Hurghada tours and excursions",
      "Red Sea boat trips and island excursions",
      "Snorkeling and scuba diving in Hurghada",
      "Desert safaris and quad bike tours in Hurghada",
      "Egypt day trips from Hurghada",
      "Airport and private transfers in Hurghada",
      "Tours in Sahl Hasheesh, Makadi Bay, El Gouna, Soma Bay and Safaga",
    ],
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try { if (localStorage.getItem("via-blue-theme") === "dark") document.documentElement.classList.add("dark"); } catch {}` ,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale}>
        <CurrencyProvider>
        <Navbar />
        <ScrollToTop />
        {children}
        <Footer />
        </CurrencyProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
