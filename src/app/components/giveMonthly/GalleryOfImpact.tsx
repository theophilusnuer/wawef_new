import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cos from '../../assets/images/cos.webp';
import dev from '../../assets/images/dev.jpg';
import fas from '../../assets/images/fas.webp';

export const GalleryOfImpact = () => {
   const images = [
        {
            src: cos.src,
            alt: "Cosmetology — Beauty & Personal Care",
            className: "md:row-span-2",
            height: "h-[40vh] md:h-[61.76vh]",
        },
        {
            src: fas.src,
            alt: "Fashion Design — Textiles & Garment Manufacturing",
            className: "",
            height: "h-[40vh] md:h-[30vh]",
        },
        {
            src: dev.src,
            alt: "ICT — Web Development & Digital Marketing",
            className: "",
            height: "h-[40vh] md:h-[30vh]",
          },
          
          //  remember to change md:grid-rows-3 when you add the 4th image
        //    { src: dev.src,
        //     alt: "Placeholder for future impact image",
        //     className: "md:col-span-2",
        //     height: "h-[40vh] md:h-[30vh]",
        // },
    ];

    return (
        <div className="py-4 md:py-10 px-4 md:px-10 max-w-4xl mx-auto bg-[#FCFCF4]">
            {/* Heading */}
            <div className="flex justify-center items-center">
                <h2 className="inline-block text-base md:text-2xl px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm bg-[#F2C94C] mb-8">
                    Gallery of Impact
                </h2>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-2 md:grid-rows-2 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative w-full ${image.className} group`}
                    >
                        {/* Image Container with Aspect Ratio */}
                        <div className={`relative w-full ${image.height}`}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill={true}
                                className="object-cover rounded-sm"
                            />

                            {/* Hover Overlay and Title (Hidden on Small Screens) */}
                            <div className="hidden sm:block absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex items-center justify-center rounded-sm">
                                <p className="text-white font-inter text-sm md:text-base text-center px-4">
                                    {image.alt}
                                </p>
                            </div>
                        </div>

                        {/* Title Below Image on Small Screens */}
                        <p className="sm:hidden my-2 font-inter  text-center underline">
                            {image.alt}
                        </p>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            <div className="flex justify-center mt-8">
                <Link href="/programs" passHref>
                    <button className="bg-[#F2C94C] text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base cursor-pointer">
                        See More
                    </button>
                </Link>
            </div>
        </div>
    );
};