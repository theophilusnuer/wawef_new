'use client';

import Link from 'next/link';
import Image from 'next/image';
import webinarhero from '../../assets/images/webinarhero.webp'; 

export default function ImpactHerHero() {
  return (
    <section className="relative h-[calc(100vh-20vh)] md:h-[calc(100vh-10vh)] w-full">
      {/* Static Image */}
      <div className="relative h-[calc(100vh-20vh)] md:h-[calc(100vh-10vh)]">
        <Image
          src={webinarhero.src}
          alt="IMPACT HER SERIES"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-24">
        <div className="mt-16 md:mt-24"> {/* Added margin-top to move content down */}
          <h1 className="font-gartis text-4xl text-[#FCFCF4] md:text-8xl">
            IMPACT HER SERIES
          </h1>
          <p className="text-sm md:text-2xl mb-4 bg-[#FCFCF4] max-w-xs md:max-w-full md:p-2">
            Global Conversations. Bold Leadership. Empowered Women.
          </p>
          <p className="text-sm md:text-xl mb-6 max-w-xs md:max-w-xl text-[#FCFCF4] italic">
      A transformational bimonthly webinar experience powered by WAWEF and Mindset Mastery 360 — designed to ignite legacy, leadership, and sisterhood.
          </p>
    
          <Link href="/register">
            <button className="bg-[#F2C94C] text-black py-1 px-3 md:px-6 md:py-3 rounded-md hover:scale-102 transition-all duration-200 cursor-pointer">
              Register for the Next Webinar
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}