""
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarClientWrapper from "./components/NavbarClientWrapper";
import { Footer } from "./components/Footer";
import Script from "next/script";
import Popup501 from "./components/501Pop/501Popup";
import { LoaderProvider } from "./components/LoaderContext";
import { SanityLive } from "@/sanity/lib/live";

const gartis = localFont({
  src: "../../public/fonts/gartis.otf",
  variable: "--gartis",
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wawef.org"),
  title: {
    default: "WAWEF - Empowering Women, Transforming Futures",
    template: "%s | WAWEF",
  },
  description:
    "The West Africa Women Empowerment Foundation (WAWEF) empowers women and girls through education, health, and economic opportunities, transforming futures across West Africa.",
  keywords: [
    "WAWEF",
    "Women Empowerment",
    "Ghana",
    "West Africa",
    "Menstrual Hygiene",
    "Education for Women",
    "Gender Equality",
  ],
  authors: [{ name: "WAWEF", url: "https://wawef.org" }],
  openGraph: {
    title: "WAWEF - Empowering Women, Transforming Futures",
    description:
      "Join WAWEF in empowering women and girls in West Africa through education, health, and economic initiatives.",
    url: "https://wawef.org",
    siteName: "WAWEF",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "WAWEF Empowering Women",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAWEF - Empowering Women, Transforming Futures",
    description:
      "Join WAWEF in empowering women and girls in West Africa through education, health, and economic initiatives.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "https://wawef.org",
  },
};

// Separate viewport export as per Next.js documentation
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "West Africa Women Empowerment Foundation",
              url: "https://wawef.org",
              logo: "/images/logo.png",
              description:
                "WAWEF empowers women and girls in West Africa through education, health, and economic opportunities.",
              sameAs: [
                "https://www.facebook.com/share/1E671tfEF1/",
                "https://instagram.com/wawef_org",
                "https://linkedin.com/company/wawef",
                "https://youtube.com/@wawef",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Stakeholder Support",
                email: "info@wawef.org",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="Gkv7kU6_P04XVv1VTtIKUseI1VCWEj3LZoQauk8n3hE"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`min-h-screen flex flex-col justify-between ${inter.variable} ${gartis.variable} antialiased`}
      >
        <NavbarClientWrapper />
        <LoaderProvider>
        <main className="flex-1">{children}</main>
        </LoaderProvider>
        <Footer />
        <Popup501/>
        <SanityLive />
      </body>
    </html>
  );
}
