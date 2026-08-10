'use client'
import { Donate } from '../Donate';
import hw from '../../assets/images/hw.jpeg';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function HomepageHero() {
        const [isModalOpen, setIsModalOpen] = useState(false); 
    return (
        <>
        <div className="relative min-h-[calc(100vh-25vh-3.2rem)] md:min-h-[calc(100vh-15vh-3rem)] overflow-hidden flex flex-col">
        {/* Background Image */}
        <Image
          src={hw.src}
          alt="#wawef"
          fill={true}
          className="object-cover"
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
             <div
                className="absolute md:hidden inset-0"
                style={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.80) 15%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.30) 70%, rgba(0,0,0,0.05) 100%)',
                }}
            />

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col md:justify-center justify-end flex-1 p-6 pb-6 w-full">

                <div className="w-full max-w-[78rem] mx-auto flex flex-col md:items-start items-center text-center md:text-left">
                    <div className='flex justify-center flex-col items-center pt-4'>
                       <div className="flex flex-col items-center text-center">
                         <h1 className="text-3xl md:text-5xl text-white font-gartis">
                            Empowering Women, <br /> Transforming Futures
                        </h1>
                        <p className="mt-3 text-white text-sm md:text-base max-w-lg leading-relaxed">
                            WAWEF empowers women and girls in West Africa with financial support, education, and structured long term empowerment so they can build dignified, self reliant, and sustainable futures.
                        </p>
                       </div>

                        {/* Donate Button — desktop */}
                        <div className="md:block hidden">
                            <Donate />
                        </div>

                        {/* Donate Button — mobile */}
                        <div className="mt-5 md:hidden flex justify-center">
                            <a
                               onClick={() => setIsModalOpen(true)}
                                className="bg-[#F2C94C] text-black py-2 px-6 rounded-sm text-sm cursor-pointer"
                            >
                                Donate
                            </a>
                        </div>
                    </div>
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
