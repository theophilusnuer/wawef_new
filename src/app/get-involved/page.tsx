"use client";

import Head from "next/head";

type InvolvementItem = {
  key: string;
  title: string;
  heading: string;
  paragraphs: string[];
  buttonLabel: string;
  href: string;
};

const involvementItems: InvolvementItem[] = [
  {
    key: "donate",
    title: "Donate",
    heading: "Support the Work",
    paragraphs: [
      "Your support helps us provide access, skills, and opportunities to women and young girls across the communities we serve.",
      "Through your contribution, we are able to run programs, support education and vocational training, and respond to real needs identified within the community.",
      "Every contribution, no matter the size, plays a role in helping us build meaningful and lasting impact.",
      "Support WAWEF today and be part of the change.",
    ],
    buttonLabel: "Donate Now",
    href: "/give-monthly",
  },
  {
    key: "partner",
    title: "Partner With Us",
    heading: "Partner With WAWEF",
    paragraphs: [
      "We believe meaningful impact is built through collaboration.",
      "WAWEF works with organizations, institutions, and corporate partners who share a commitment to empowering women and young girls through practical and sustainable initiatives.",
      "If you are interested in partnering with us to support programs, provide resources, or collaborate on community based initiatives, we would be glad to connect.",
      "Together, we can create stronger and more lasting impact.",
    ],
    buttonLabel: "Contact for Partnership",
    href: "mailto:info@wawef.org?subject=Partnership%20Inquiry",
  },
  {
    key: "sponsor",
    title: "Sponsor a Girl",
    heading: "Sponsor a Girl",
    paragraphs: [
      "Through the Enock Addico Scholarship Program, WAWEF supports young women by providing access to education, vocational training, and the resources they need to build independent futures.",
      "Sponsoring a girl means directly contributing to her growth, her confidence, and her ability to create opportunities for herself and others.",
      "Your support helps remove financial barriers and allows these young women to focus on building their future with purpose.",
      "Be part of a journey that creates lasting change, one girl at a time.",
    ],
    buttonLabel: "Sponsor a Girl",
    href: "/give-monthly",
  },
  {
    key: "volunteer",
    title: "Volunteer",
    heading: "Volunteer With Us",
    paragraphs: [
      "WAWEF is driven by individuals who are committed to making a difference.",
      "We welcome volunteers who are willing to contribute their time, skills, and expertise to support our programs, outreach, and ongoing initiatives.",
      "Whether your strength is in coordination, communication, content creation, or community engagement, there is a place for you to be part of the work.",
      "Join us and contribute to building meaningful impact within the communities we serve.",
    ],
    buttonLabel: "Apply to Volunteer",
    href: "mailto:info@wawef.org?subject=Volunteer%20Application",
  },
  {
    key: "advisory",
    title: "Join Advisory Board",
    heading: "Join the Advisory Board",
    paragraphs: [
      "WAWEF is building a strong network of experienced and purpose driven individuals who can provide guidance, insight, and strategic direction.",
      "The Advisory Board plays an important role in supporting the organization's growth, strengthening its structure, and expanding its reach and impact.",
      "We welcome individuals with experience in leadership, development, education, business, and community work who are interested in contributing at a strategic level.",
      "Be part of shaping the future of WAWEF.",
    ],
    buttonLabel: "Express Interest",
    href: "mailto:info@wawef.org?subject=Advisory%20Board%20Interest",
  },
];

export default function GetInvolvedPage() {
  const openLink = (href: string) => {
    if (href.startsWith("mailto:")) {
      window.location.href = href;
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Head>
        <title>Get Involved | WAWEF</title>
        <meta
          name="description"
          content="Support WAWEF through donating, partnering, sponsoring, volunteering, or joining the advisory board."
        />
      </Head>

      <main className="min-h-screen py-14 md:py-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mb-10 md:mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8A6D1A] mb-3">
              Get Involved
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D1D1B] leading-tight">
              Join WAWEF and help build lasting impact
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {involvementItems.map((item) => (
              <article
                key={item.key}
                className="bg-white/95  p-6 md:p-7 shadow-[0_10px_28px_rgba(0,0,0,0.06)] flex flex-col"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-[#7D7D78] mb-2">{item.title}</p>
                <h2 className="text-2xl font-bold text-[#1D1D1B] mb-4">{item.heading}</h2>

                <div className="space-y-4 text-[#4B4B47] leading-7 text-[15px] flex-1">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => openLink(item.href)}
                  className="mt-7 inline-flex items-center justify-center bg-[#F2C94C] text-[#1D1D1B] font-semibold px-4 py-3  hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {item.buttonLabel}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
