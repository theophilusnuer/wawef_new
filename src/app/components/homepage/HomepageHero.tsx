'use client'
import { Donate } from '../Donate';
import hw from '../../assets/images/hero-women.jpg';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function HomepageHero() {
        const [isModalOpen, setIsModalOpen] = useState(false); 
    return (
        <>
        <div className="relative min-h-[calc(100vh-25vh-4rem)] md:min-h-[calc(100vh-15vh-3rem)] overflow-hidden">
        {/* Background Image */}
        <Image
          src={hw.src}
          alt="#wawef"
          fill={true}
          className="object-cover object-top"
          priority={true}
          quality={80}
        />
            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 hidden md:block"
                style={{
                    background:
                        'linear-gradient(270deg, rgba(102, 102, 102, 0.00) 36.25%, rgba(43, 43, 43, 0.38) 64.25%, #000 99.72%)',
                }}
            />
             <div className="absolute md:hidden inset-0 bg-black/35" />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col justify-center h-full p-6 w-full">

                <div className="w-full max-w-[78rem] mx-auto flex flex-col md:items-start items-center text-center md:text-left">
                    <div className='flex justify-center flex-col items-center pt-4'>
                        <h1 className="text-3xl md:text-5xl text-white font-gartis">
                            Empowering Women, <br /> Transforming Futures
                        </h1>

                        {/* Donate Button */}
                        <div className="md:block hidden">
                            <Donate />
                        </div>
                    </div>
                </div>

                {/* Mobile Donate Button */}
                <div className="mt-6 md:hidden flex justify-center">
                    <a
                       onClick={() => setIsModalOpen(true)}
                        className="bg-[#F2C94C] text-black py-2 px-6 rounded-sm text-sm "
                    >
                        Donate
                    </a>
                </div>
            </div>
        </div>
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
                    {/* Donate Component */}
                    <Donate />
                </div>
            </div>
        )}
        </>
    );
}
