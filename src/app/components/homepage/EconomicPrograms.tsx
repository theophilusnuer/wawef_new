"use client";
import { FC } from 'react';
import { Quote1 } from './Quotes';
import Image from 'next/image';
import cos from '../../assets/images/cos.webp';
import dev from '../../assets/images/dev.jpg';
import fas from '../../assets/images/fas.webp';
import { getProgramPath } from '@/app/utils/slugUtils';


export const EconomicPrograms: FC = () => {
    
    const programs = [
        {
            title: "Cosmetology — Beauty & Personal Care",
            image: cos.src,
            link: getProgramPath("Cosmetology — Beauty & Personal Care"),
        },
        {
            title: "Fashion Design — Textiles & Garment Manufacturing",
            image: fas.src,
            link: getProgramPath("Fashion Design — Textiles & Garment Manufacturing"),
        },
        {
            title: "ICT — Web Development & Digital Marketing",
            image: dev.src,
            link: getProgramPath("ICT - Web Development and Digital Marketing"),
        },
    ];

    return (
        <div className='py-10'>
            <Quote1 />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <h2 className="inline-block text-base md:text-2xl px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm bg-[#FAEBE7] mb-8">
                    Economic Empowerment Programs
                </h2>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:pb-10 lg:grid-cols-3 gap-6">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className=" overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <Image
                                src={program.image}
                                alt={program.title}
                                width={400}
                                height={300}
                                className="w-full h-74 md:h-90 object-cover object-top rounded-sm shadow-sm"
                            />

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-base md:text-xl text-gray-800 mb-4">
                                    {program.title}
                                </h3>
                                <div className="mt-auto">
                                    <a
                                        href={program.link}
                                        className="block w-full bg-[#F2C94C] text-black py-2 px-4 rounded-sm hover:scale-102 transition-all duration-200 text-center text-sm md:text-base"
                                    >
                                        Learn more about the program
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};