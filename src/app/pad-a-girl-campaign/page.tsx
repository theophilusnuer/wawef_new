import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Pad a Girl Campaign",
  description:
    "Empowering girls in West Africa with menstrual hygiene education and supplies.",
  keywords: [
    "Pad a Girl Campaign",
    "WAWEF",
    "Menstrual Hygiene",
    "Menstruation",
    "Pad",
    "Women Empowerment",
    "West Africa",
    "Ghana",
  ],
  openGraph: {
    title: "Pad a Girl Campaign - WAWEF",
    description:
      "Discover how the Pad a Girl Campaign supports menstrual hygiene and education for girls in West Africa.",
    url: "https://wawef.org/pad-a-girl-campaign",
    siteName: "WAWEF",
    images: [
      {
        url: "/images/pad-og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Pad a Girl Campaign by WAWEF",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pad a Girl Campaign",
    description:
      "Join the Pad a Girl Campaign to empower girls in West Africa with menstrual hygiene support.",
    images: ["/images/pad-og-image.jpg"], 
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
  alternates: {
    canonical: "https://wawef.org/pad-a-girl-campaign",
  },
};

const PadAGirl = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-auto">
      <span className="font-gartis text-5xl p-4 text-center">
        This page will be updated with all details very soon.
      </span>
      <Link
        href="/"
        className="inline-flex items-center bg-[#F2C94C] text-black py-2 px-6 rounded-sm cursor-pointer text-sm md:text-base"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default PadAGirl;