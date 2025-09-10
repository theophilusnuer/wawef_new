
"use client";

import { FC } from "react";
import Image from "next/image";
import edu from "../../assets/images/edu.png";
import coin from "../../assets/images/coin.png";
import intern from "../../assets/images/intern.png";
import workshop from "../../assets/images/workshop.png";
import support from "../../assets/images/support.png";

const ProgramBenefits: FC = () => {
  const benefits = [
    {
      icon: edu,
      number: "Tuition Coverage",
      text: "Full payment of tuition fees at FC Beauty College.",
      bgColor: "bg-[#DFF3E7]",
    },
    {
      icon: coin,
      number: "Stipends",
      text: "Financial support for transportation and living expenses during training.",
      bgColor: "bg-transparent",
    },
    {
      icon: intern,
      number: "Internships",
      text: "Hands-on industry experience through placements with partner salons and beauty businesses.",
      bgColor: "bg-[#F2C94C]",
    },
    {
      icon: workshop,
      number: "Quarterly Workshops",
      text: "Training in complementary skills such as leadership, digital literacy, entrepreneurship, financial literacy, and health awareness.",
      bgColor: "bg-transparent",
    },
    {
      icon: support,
      number: "Post-Graduation Support",
      text: "Job placement assistance or startup support, including mentorship and small grants for entrepreneurial ventures.",
      bgColor: "bg-[#FAEBE7]",
    },
    {
      icon: null,
      number: "",
      text: "",
      bgColor: "bg-transparent",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 relative inline-block">
          Program Benefits
          <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-0">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`${benefit.bgColor} p-8 md:min-h-[300px] lg:min-h-[350px]`}
            >
              {benefit.icon && (
                <div className="mb-6">
                  <Image
                    src={benefit.icon}
                    alt={benefit.number || "Benefit icon"}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                </div>
              )}
              {benefit.number && <h3 className="text-2xl font-bold mb-3">{benefit.number}</h3>}
              {benefit.text && <p className="text-base md:text-lg ">{benefit.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramBenefits;
