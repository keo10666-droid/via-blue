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
  const keywords = settings.seo_keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean);

  return {
    metadataBase: new URL("https://viabluetours.com"),
    title: {
      default: settings.seo_title,
      template: "%s | Via Blue",
    },
    description: settings.seo_description,
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
      title: settings.seo_title,
      description: settings.seo_description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo_title,
      description: settings.seo_description,
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
  const originalPath = requestHeaders.get("x-via-blue-original-path") || "/";
  const suffix = originalPath === "/" ? "" : originalPath;
  const alternateUrl = (code: SiteLocale) => code === "en" ? `https://viabluetours.com${suffix}` : `https://viabluetours.com/${code}${suffix}`;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {!originalPath.endsWith("/book") && (
          <>
            <link rel="alternate" hrefLang="en" href={alternateUrl("en")} />
            <link rel="alternate" hrefLang="de" href={alternateUrl("de")} />
            <link rel="alternate" hrefLang="fr" href={alternateUrl("fr")} />
            <link rel="alternate" hrefLang="ro" href={alternateUrl("ro")} />
            <link rel="alternate" hrefLang="ru" href={alternateUrl("ru")} />
            <link rel="alternate" hrefLang="x-default" href={alternateUrl("en")} />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Via Blue",
              url: "https://viabluetours.com",
              logo: "https://viabluetours.com/logo/logo.svg",
              description: "Tourism and transportation company in Hurghada, Egypt, offering Red Sea experiences, excursions and private transfers.",
              areaServed: [
                { "@type": "City", name: "Hurghada" },
                { "@type": "AdministrativeArea", name: "Red Sea Governorate" },
                { "@type": "Country", name: "Egypt" },
              ],
            }).replace(/</g, "\\u003c"),
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
