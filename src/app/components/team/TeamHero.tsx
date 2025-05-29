'use client'
import Image from 'next/image';
import us from '../../assets/images/us.webp'
import { FC } from 'react';


export const TeamHero:FC = () => {
  return (
<div className="relative w-full h-[60vh] md:h-[70vh]">
        {/* Background Image */}
        <Image
          src={us.src}
          alt="#wawef"
          fill={true}
          className="object-cover object-top"
        />

        {/* Black Overlay with 65% Opacity */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Hero */}
        <div className="relative z-10 flex flex-col justify-end h-full p-8 w-full">
          <div className="w-full max-w-[78rem] mx-auto flex flex-col items-start text-left">
            <h3 className='text-white text-2xl md:text-3xl mb-6'>
              Our Team
            </h3>
          </div>
        </div>
      </div>
  );
};

