import React from 'react';
import Image from 'next/image';
import enoch from '../../assets/images/enoch.jpeg'

const Enoch: React.FC = () => {
    return (
        <div className="w-full max-w-[78rem] mx-auto my-10 px-6 md:px-0">
            {/* Heading Above the Grid */}
            <h1 className="inline-block text-lg md:text-xl mb-6 bg-[#F2C94C] px-3 py-2 md:px-6 md:py-3 rounded-sm">
                A Legacy of Generosity: In Honor of Enoch Addico
            </h1>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:my-4">
                {/* Image Section (Left) - 1 Column */}
                <div className="relative w-full h-[40vh] md:h-auto md:col-span-1">
                    <Image
                        src={enoch.src}
                        alt="Enoch Addico"
                        fill={true}
                        className="object-cover rounded-sm"
                    />
                </div>

                {/* Text Section (Right) - 2 Columns */}
                <div className="flex flex-col justify-center space-y-6 md:col-span-2">
                    <p className="text-sm md:text-base text-justify">
                        At the West Africa Women Empowerment Foundation (WAWEF), we dedicate our mission to the memory of Enock Addico, a man whose generosity and kindness knew no bounds. Enoch&apos;s selflessness was felt by everyone who had the privilege of knowing him. Whether it was a kind word, a helping hand, or a listening ear, he always gave of himself without hesitation and without expectation. His deep compassion and desire to support those in need made him one of the most beloved figures within our family and community.
                    </p>
                    <p className="text-sm md:text-base text-justify">
                        Enoch&apos;s example of kindness, thoughtfulness, and unconditional giving will continue to influence the lives of the young women and girls we empower. As we guide them toward a brighter future, we instill in them not just the skills they need to succeed, but also the values of generosity and compassion that were at the core of Enock&apos;s being. We want these girls and women to know that their success is not just about personal achievement, but about lifting others up along the way just as Enock did.
                    </p>
                    <p className="text-sm md:text-base text-justify">
                        This program, and the work of WAWEF, stands as a testament to his unwavering commitment to making the world a better place. We are proud to carry his legacy forward, ensuring that the spirit of generosity he so passionately embodied continues to inspire us and transform lives.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Enoch;