"use client";
import Link from "next/link";
import Image from "next/image";
import logo1 from "../../assets/images/logo1.png";
import winetoya from "../../assets/images/winetoya.png";
import mindset from "../../assets/images/mindset.jpg";

const PadPartners = () => {
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
      url: "https://www.instagram.com/theruralchildfoundation",
    },
    {
      src: mindset,
      name: "Mindset Mastery 360 Global Movement",
      alt: "Mindset Mastery 360 Global Movement logo",
      url: "https://www.mindsetmastery360.org",
    },
  ];

  return (
    <div className="py-10 px-4 md:px-10 sm:max-w-lg md:max-w-2xl lg:max-w-[52rem] mx-auto bg-[#FCF2EF] rounded-md my-6">
      <h2 className="text-lg md:text-2xl mb-6 md:mb-8 text-center">
        PadHER - SHEflow Campaign is a Joint Initiative By
      </h2>
      <div className="flex flex-wrap justify-center gap-6 md:gap-14">
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
  );
};

export default PadPartners;