"use client";
import { FC } from 'react';
import Image from 'next/image';
import sdg1 from '../../assets/images/sdg1.svg';
import sdg4 from '../../assets/images/sdg4.svg';
import sdg5 from '../../assets/images/sdg5.svg';
import sdg8 from '../../assets/images/sdg8.svg';
import sdg13 from '../../assets/images/sdg13.svg';

export const Sdg: FC = () => {
  const sdgs = [
    {
      src: sdg1.src,
      alt: "SDG 1: No Poverty",
      label: "No Poverty",
    },
    {
      src: sdg4.src,
      alt: "SDG 4: Quality Education",
      label: "Quality Education",
    },
    {
      src: sdg5.src,
      alt: "SDG 5: Gender Equality",
      label: "Gender Equality",
    },
    {
      src: sdg8.src,
      alt: "SDG 8: Decent Work and Economic Growth",
      label: "Decent Work and Economic Growth",
    },
    {
      src: sdg13.src,
      alt: "SDG 13: Climate Action",
      label: "Climate Action",
    },
  ];

  return (
    <div className="py-10 px-4 md:px-10 sm:max-w-lg md:max-w-2xl lg:max-w-[52rem] md:mt-8 md:mb-16 mb-6 mx-auto">
      <h2 className="text-lg md:text-3xl text-center mb-6 md:mb-8">
        We are committed to Sustainable Development Goals
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {sdgs.map((sdg, index) => (
          <Image
            key={index}
            src={sdg.src}
            alt={sdg.alt}
            width={100}
            height={100}
            className="w-11 md:w-24 h-11 md:h-24 object-contain"
          />
        ))}
      </div>
    </div>
  );
};