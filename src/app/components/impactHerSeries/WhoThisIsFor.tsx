'use client';

import Link from 'next/link';

export default function WhoThisIsFor() {
  const audience = [
    { text: 'Feels called to grow, lead, and build legacy', color: '#F5D6CD' },
    { text: 'Wants to hear from voices that look like yours and understand your journey', color: '#EFB8A2' },
    { text: 'Believes in collective healing and global collaboration', color: '#E48D73' },
    { text: 'Desires real, actionable wisdom and not just inspiration', color: '#E07A5F' },
  ];

  return (
    <section className="bg-[#FDF7E4] py-8 md:py-12 px-4 my-12">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="md:text-2xl font-semibold mb-1">Who This Is For?</h2>
        <p className="text-sm md:text-base italic">
          Is This Series for You? If you are a woman who:
        </p>
      </div>

      {/* Flex Circle Layout */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 my-10">
        {audience.map((item, index) => (
          <div
            key={index}
            className="rounded-full flex items-center justify-center text-center p-3 aspect-square min-h-[6rem] md:min-h-[10rem] max-w-[8rem] md:max-w-[12rem]"
            style={{ backgroundColor: item.color }}
          >
            <p className="text-[0.755rem] font-medium md:font-normal md:text-base leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Final Text and Button */}
      <div className="text-center">
        <p className="text-base md:text-2xl mb-4">
          Then YES — this is your space.
        </p>
        <Link href="/register">
            <button className="bg-[#F2C94C] text-black py-1 px-3 md:px-6 md:py-3 rounded-md hover:scale-102 transition-all duration-200 cursor-pointer">
            Register for the Next Webinar
          </button>
        </Link>
      </div>
    </section>
  );
}
