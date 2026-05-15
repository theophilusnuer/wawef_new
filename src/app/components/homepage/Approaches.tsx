"use client";
import { FC } from 'react';
import { AboutSummary } from './Quotes';
import Image from 'next/image';
import cos from '../../assets/images/cos.webp';
import dev from '../../assets/images/dev.jpg';
import fas from '../../assets/images/fas.webp';


export const Approaches: FC = () => {

    const approaches = [
        {
            title: "Access",
            subtitle: "Providing essential resources such as menstrual products and scholarships",
            image: cos.src,
        },
        {
            title: "Education",
            subtitle: "Supporting academic and vocational development",
            image: fas.src,
        },
        {
            title: "Empowerment",
            subtitle: "Building confidence, leadership, and independence",
            image: dev.src,
        },
    ];

    return (
        <div className='pt-5 pb-10'>
            <AboutSummary />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
                        Our Approach
                        <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
                    </h2>
                </div>

                {/* Approaches Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:pb-10 lg:grid-cols-3 gap-6">
                    {approaches.map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={220}
                                className="w-full h-48 md:h-56 object-cover"
                            />

                            {/* Content */}
                            <div className="pt-4 px-1 flex flex-col">
                                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base  leading-relaxed">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};