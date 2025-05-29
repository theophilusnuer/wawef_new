'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SponsorProgram } from './SponsorProgram';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ProgramCardProps {
  program: {
    title: string;
    overview: string;
    image: string;
  };
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const { title, overview, image } = program;
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  return (
    <>
      <div className="flex flex-col md:min-h-[20rem] md:flex-row items-center w-full max-w-[78rem] mx-auto px-4 py-6 my-8 gap-6">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-64 md:h-76 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={`${title} program image`}
            fill
            className="object-cover"
          />
        </div>

        {/* Text + Buttons Section */}
        <div className="flex flex-col flex-1 h-full justify-between">
          <div>
            <h3 className="text- md:text-xl mb-4 bg-[#FAEBE7] px-4 py-2 rounded-sm w-fit">
              {title}
            </h3>
            <p className="text-sm md:text-base mb-8 line-clamp-5 py-6">
              {overview}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#F2C94C] text-black px-8 py-2 rounded-sm hover:scale-105 transition-all duration-200 text-sm md:text-base cursor-pointer"
            >
              Sponsor
            </button>
            <Link href={`/programs/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} passHref>
              <button className="border border-[#F2C94C] text-black px-8 py-2 rounded-sm hover:scale-105 transition-all duration-200 text-sm md:text-base cursor-pointer">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for SponsorProgram Component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/85 rounded-md max-w-xl w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 cursor-pointer"
            >
              <XMarkIcon className=" w-4 h-4 bg-[#F2C94C] rounded-sm p-0.5 md:w-5.5 md:h-5.5" />
            </button>
            {/* SponsorProgram Component */}
            <SponsorProgram programTitle={title} />
          </div>
        </div>
      )}
    </>
  );
};