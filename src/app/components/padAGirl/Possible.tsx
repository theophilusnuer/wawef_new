import Image from "next/image";
import React from "react";
import mhe from "../../assets/images/mhe.svg";
import fsp from "../../assets/images/fsp.svg";
import mwt from "../../assets/images/mwt.svg";
import ewl from "../../assets/images/ewl.svg";

const Possible = () => {
  const impacts = [
    {
      title: "Menstrual Hygiene Education",
      icon: mhe,
      borderColor: "border-[#FE821F]",
    },
    {
      title: "Free Sanitary Pad Distribution",
      icon: fsp,
      borderColor: "border-[#F41686]",
    },
    {
      title: "Confidence & Wellness Talks",
      icon: mwt,
      borderColor: "border-[#F2C94C]",
    },
    {
      title: "Q&A Session with Empowered Women Leaders",
      icon: ewl,
      borderColor: "border-[#000000]",
    },
  ];

  return (
    <div className="py-10 px-4 md:px-10 max-w-[78rem] mx-auto md:my-4">
      <h2 className="inline-block text-base md:text-2xl px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm bg-[#FAEBE7] mb-8">
        What Your Support Makes Possible
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 pb-6 md:py-6 max-w-7xl mx-auto">
        {impacts.map((impact, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all duration-200 flex flex-col items-center"
          >
            {/* Icon */}
            <div className="flex items-center justify-center md:mb-4">
              <Image
                src={impact.icon}
                alt={`${impact.title} Icon`}
                width={60}
                height={60}
              />
            </div>

            {/* Service */}
            <div
              className={`border-l-2 border-r-2 border-b-2 ${impact.borderColor} rounded-br-sm rounded-bl-sm p-4 flex flex-col items-center justify-center min-h-[85px] w-full text-center`}
            >
              <p className=" md:text-lg">
                {impact.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Possible;