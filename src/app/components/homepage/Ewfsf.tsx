"use client";
import { FC } from 'react';
import Image from 'next/image';
import entre from '../../assets/images/entre.svg';
import comp from '../../assets/images/comp.svg';
import lif from '../../assets/images/lif.svg';
import por from '../../assets/images/por.svg';

export const Ewfsf: FC = () => {
  const pillars = [
    {
      title: "Entrepreneurship & Business Incubation",
      services: [
        "Design Thinking",
        "Mentorship & Networking",
        "Business development and management",
      ],
      borderColor: 'border-[#F2C94C]',
      icon: entre,
    },
    {
      title: "Comprehensive Support Services",
      services: [
        "Accommodation & Feeding",
        "Financial Support",
        "Career Counseling & Job Placement",
      ],
      borderColor: "border-[#27AE60]",
      icon: comp,
    },
    {
      title: "Life Skills & Leadership Development",
      services: [
        "Leadership Skills",
        "Emotional intelligence",
        "Critical Thinking & Communication",
      ],
      borderColor: "border-[#E07A5F]",
      icon: lif,
    },
    {
      title: "Professional Portfolio Development",
      services: [
        "Hands-on Projects",
        "Skills Showcase & Product Demo",
        "Industry Recognition",
      ],
      borderColor: "border-black",
      icon: por,
    },
  ];

  return (
    <div className="py-10 px-4 md:px-10 max-w-[78rem] mx-auto">
      {/* Heading */}
      <h2 className="inline-block text-base md:text-2xl text-center md:text-left px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm bg-[#DFF3E7] mb-8">
        Empowering Women for a Sustainable Future
      </h2>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10 pb-6 md:py-6 max-w-7xl mx-auto">
        {pillars.map((pillar, index) => (
          <div key={index} className=' hover:scale-90 transition-all duration-200'>
            {/* Heading */}
            <div className="flex items-center mb-4">
              <Image
                src={pillar.icon.src}
                alt={`${pillar.title}`}
                width={45}
                height={45}
                className="mr-2"
              />
              <h3 className="md:text-xl">
                {pillar.title}
              </h3>
            </div>

            {/* Services */}
            <ul className={`border-l-2 border-r-2 border-b-2 ${pillar.borderColor} rounded-br-sm rounded-bl-sm p-4 flex flex-col space-y-2`}>
              {pillar.services.map((service, idx) => (
                <li
                  key={idx}
                  className="text-sm md:text-base text-gray-600 flex"
                >
                  <span className="mr-2 text-black">✔</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};