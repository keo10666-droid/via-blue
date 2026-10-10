import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { createSupabaseAdminClient } from "@/lib/supabaseAdmin";
import { mergeSiteSettings } from "@/lib/siteSettings";

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
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}