'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo1 from '../../assets/images/logo1.png';
import winetoya from '../../assets/images/winetoya.png';
import mindset from '../../assets/images/mindset.jpg';

const ImpactPartners = () => {
  const partners = [
    {
      src: logo1,
      name: 'West Africa Women Empowerment Foundation',
      alt: 'West Africa Women Empowerment Foundation Logo',
      url: 'https://wawef.org',
      description: 'WAWEF is committed to uplifting African women through education, advocacy, and opportunity.',
    },
    {
      src: mindset,
      name: 'Mindset Mastery 360 Global Movement',
      alt: 'Mindset Mastery 360 Global Movement logo',
      url: 'https://www.mindsetmastery360.org',
      description: 'MM360 is a global movement founded by Dr. Alisa Whyte, dedicated to transforming lives through mindset, leadership, and legacy work.',
    },
  ];

  return (
    <div className="md:py-8 px-4 md:px-10 sm:max-w-lg md:max-w-2xl lg:max-w-[52rem] mx-auto md:bg-[#FCF2EF] rounded-md my-16">
      <div className="text-center mb-4">
        <h2 className="md:text-2xl font-semibold mb-1">Meet The Partners</h2>
        <p className="text-sm md:text-base italic">A Collaboration Rooted in Purpose</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-14">
        {partners.map((partner, index) => (
          <div key={index} className="flex flex-col items-center w-full md:w-auto">
            <Image
              src={partner.src}
              alt={partner.alt}
              width={120}
              height={120}
              className="w-16 md:w-24 h-16 md:h-24 object-contain"
            />
            <Link
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wrap max-w-[13rem] text-center"
            >
              <span className="mt-2 text-base font-medium underline">
                {partner.name}
              </span>
            </Link>
            <p className="mt-2 text-center text-sm max-w-sm leading-relaxed">
              {partner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactPartners;