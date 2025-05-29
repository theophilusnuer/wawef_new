import React from 'react';

export const Vision: React.FC = () => {
    return (
        <div className="w-full max-w-[72rem] mx-auto px-4 py-4 my-10 md:my-20">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                {/* Mission Section */}
                <div className='flex flex-col items-center'>
                    <h2 className="text-lg md:text-2xl text-center  bg-[#FAEBE7] px-20 py-2 md:py-3 rounded-sm mb-4">
                        Our Mission
                    </h2>
                    <p className="text-sm md:text-base text-center p-6 border-l-2 border-r-2 border-b-2 border-[#e07a5f] rounded-br-sm rounded-bl-sm">
                        To empower women and girls in West Africa by addressing critical challenges related to poverty, education, economic opportunity, and access to essential resources, fostering self-reliance and sustainable development.
                    </p>
                </div>

                {/* Vision Section */}
                <div className='flex flex-col items-center'>
                    <h2 className="text-lg md:text-2xl text-center bg-[#F2C94C] px-20 py-2 md:py-3 rounded-sm mb-4">
                        Our Vision
                    </h2>
                    <p className="text-sm md:text-base text-center p-6 border-l-2 border-r-2 border-b-2 border-[#F2C94C] rounded-br-sm rounded-bl-sm flex-grow max-w-sm">
                        A West Africa where women and girls are empowered to reach their full potential, contributing brighter future for all.
                    </p>
                </div>
            </div>

        </div>
    );
};

