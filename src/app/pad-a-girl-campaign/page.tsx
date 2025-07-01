import React from "react";
import PadAGirlHero from "../components/padAGirl/PadAGirlHero";
import { Quote4 } from "../components/homepage/Quotes";
import SupportPackages from "../components/padAGirl/SupportPackages";
import Possible from "../components/padAGirl/Possible";
import PadGallery from "../components/padAGirl/PadGallery";
import PadPartners from "../components/padAGirl/PadPartners";
import PadTeam from "../components/padAGirl/PadTeam";
import PartnerTeam from "../components/padAGirl/PartnerTeam";

export const metadata = {
  title: "PadHER - SHEflow Campaign",
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
    "PadHER - SHEflow Campaign",
  ],
  openGraph: {
    title: "PadHER - SHEflow Campaign",
    description:
      "Donate to the Pad a Girl Campaign to support menstrual hygiene and education for girls in West Africa.",
    url: "https://wawef.org/pad-a-girl-campaign",
    siteName: "WAWEF",
    images: [
      {
        url: "/assets/images/logo1.png",
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
    <div className="">
      <PadAGirlHero />
      <PadTeam/>
      <Quote4 />
      <PartnerTeam/>
      <SupportPackages />
      <Possible />
      <PadGallery/>
      <PadPartners/>
    </div>
  );
};

export default PadAGirl;
