"use client";

import { FC } from "react";
import Image from "next/image";
import ebanner from "../../assets/images/ebanner.jpeg";
import { Quote1 } from "./Quotes";

const EnockBanner: FC = () => {
  return (
    <section className="py-12">
      <Quote1 />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Banner */}
        <div className="relative w-full rounded-md overflow-hidden">
          <Image
            src={ebanner}
            alt="Enock Addico Scholarship Program"
            width={1200}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Button */}
        <div className="mt-6">
          <a
            href="/enock-addico-scholarship"
            className="inline-block bg-[#F2C94C] text-black py-2 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-center text-sm md:text-base"
          >
            Learn more about the program
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnockBanner;
