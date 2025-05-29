import React from 'react';
import Image from 'next/image';
import sponsor from '../../assets/images/sponsor.webp'

export const ProgramsHero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh]">
      {/* Background Image */}
      <Image
        src={sponsor.src}
        alt="Hands coming together, symbolizing unity and support for impactful programs"
        fill={true}
        className="object-cover"
      />

      {/* Black Overlay with 25% Opacity */}
      <div className="absolute inset-0 bg-black/25" />

      {/*Hero Text Overlay  */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 w-full">
        <div className="w-full max-w-[78rem] mx-auto flex flex-col items-start text-left mb-6">
          <h1 className="hidden text-base md:text-2xl md:inline-block bg-[#F2C94C] px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm text-black">
            Turn Hope Into Action. Sponsor a Program that Changes Lives
          </h1>
          {/* heading on mobile  */}
          <h1 className="text-base inline-block md:hidden bg-[#F2C94C] px-2.5 py-1.5 rounded-sm text-black">
          Sponsor A Lifetime of Change
          </h1>          
        </div>
      </div>
    </div>
  );
};