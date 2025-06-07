"use client";
import Image from "next/image";
import padCampaign from "../../assets/images/padhero.webp"; 
import PadDonation from "./PadDonation";

const PadAGirlHero = () => {
  return (
    <section className="w-full bg-[#FCFCF4] flex flex-col items-center">
      {/* Flyer Image */}
      <div className="w-full flex items-start justify-center pt-0">
        <Image
          src={padCampaign}
          alt="PadHER - SHEflow Campaign Flyer"
          width={600}
          height={800}
          className="object-contain max-w-full"
          priority
        />
      </div>

      {/* Donate Button */}
      <div className="w-full flex items-center justify-center px-4 py-4">
        <PadDonation width="w-full" />
      </div>
    </section>
  );
};

export default PadAGirlHero;