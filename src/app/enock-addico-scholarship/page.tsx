import React from "react";
import Overview from "../components/enockAddicoScholarship/Overview";
import Objectives from "../components/enockAddicoScholarship/Objectives";
import Approach from "../components/enockAddicoScholarship/Approach";
import ProgramBenefits from "../components/enockAddicoScholarship/ProgramBenefits";
import Eligibility from "../components/enockAddicoScholarship/Eligibility";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enock Addico Scholarship",
  description:
    "Empowering girls in West Africa with technical and vocational training.",
keywords: [
    "scholarship program Ghana",
    "objectives TVET",
    "Enock Addico Foundation",
    "women empowerment Ghana",
    "vocational training scholarships",
    "Technical training scholarships",
    "Cosmetology",
  ],
  openGraph: {
    title: "Enock Addico Scholarship",
    description:
      "Empowering girls in West Africa with technical and vocational training.",
    url: "https://wawef.org/enock-addico-scholarship",
    siteName: "WAWEF",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Enock Addico Scholarship",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enock Addico Scholarship",
    description:
      "Get a full scholarship to study a techincal or vocational skill",
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
    canonical: "https://wawef.org/enock-addico-scholarship",
  },
};


const page = () => {
  return (
    <div>
      <Overview />
      <Objectives />
      <Approach />
      <ProgramBenefits/>
      <Eligibility/>
    </div>
  );
};

export default page;
