"use client";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import logo1 from "../../assets/images/logo1.png";
import winetoya from "../../assets/images/winetoya.png";
import Link from "next/link";

export default function Report() {
  const overview =
    "On 22nd July 2025, we launched the PadHer SheFlow Project in partnership with the Winetoya Rural Child Foundation, with the objective of mitigating period poverty in Mirigu, a marginalized community in the Kasena Nankana West District, Upper East Region, Ghana. Through generous support, we have raised a total of USD 5,208 to support the PadHer SheFlow Project. This funding enables us to provide a monthly supply of sanitary pads for one full year to 300 girls across 12 beneficiary schools. Alongside product distribution, we deliver comprehensive menstrual health education, equipping girls with the knowledge, skills, and confidence to manage their menstrual cycles with dignity and without missing school. By ensuring consistent access to menstrual products and accurate health information, PadHer SheFlow is reducing school absenteeism, improving learning outcomes, and promoting gender equality. Active engagement with community leaders, educators, and health professionals strengthens local ownership and ensures the sustainability of results.";
  const partners = [
    {
      src: logo1,
      name: "West Africa Women Empowerment Foundation",
      alt: "West Africa Women Empowerment Foundation Logo",
      url: "https://wawef.org",
    },
    {
      src: winetoya,
      name: "Winetoya Rural Child Foundation LBG",
      alt: "Winetoya Rural Child Foundation LBG Logo",
      url: "https://www.instagram.com/winetoyaruralchildfoundation/",
    },
  ];

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-6">
            {/* Project Overview */}
            <div className="">
              <h2 className="inline-block text-base md:text-2xl px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm bg-[#FAEBE7] mb-8">Project Overview</h2>
              <p className="text-justify leading-relaxed">{overview}</p>
            </div>

            {/* Download Report */}
            <div className="flex space-x-3">
              <p className="text-gray-700 italic underline underline-offset-4">Download full report</p>
              <a
                href="https://pdfs.wawef.org/Project%20Report%20PADHERSHEFLOW.pdf"
                download="project-report.pdf"
                className="flex items-center gap-1 text-[#F2C94C] font-semibold text-sm sm:text-base"
              >
                <ArrowDownTrayIcon className="h-5 w-5" /> PDF
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 bg-[#FCF2EF] p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Project Partners
            </h2>

            {/* Partner logos */}
            <div className="flex flex-col gap-6 my-4">
              {partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={120}
                    className="w-16 md:w-24 h-16 md:h-24 object-contain"
                  />
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-wrap max-w-[13rem] text-center"
                  >
                    <span className="mt-2 text-base text-center font-medium underline">
                      {partner.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}