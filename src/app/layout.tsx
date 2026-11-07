import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Poster headline face: heavy, condensed, italic
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "LUNEO, opticien à Daloa (Côte d'Ivoire). Lunettes de vue, lunettes de soleil, verres correcteurs et accessoires.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Optician",
  name: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.store.street}, ${siteConfig.store.district}`,
    addressLocality: siteConfig.store.city,
    addressCountry: "CI",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phoneDisplay,
    contactType: "customer service",
    areaServed: "CI",
    availableLanguage: "French",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-luneo-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AppProviders>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
