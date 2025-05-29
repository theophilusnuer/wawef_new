import React from 'react';
import { DonateMonthly } from './DonateMonthly';
import Image from 'next/image';
import sheCan from '../../assets/images/girls.webp';

export const GiveMonthlyHero = () => {
  return (
    <div className="min-h-[calc(100vh-25vh-4rem)] md:min-h-[calc(100vh-15vh-3rem)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:mb-8 items-center h-full">
        {/* Left Side: Illustration */}
        <div className="relative w-full h-[50vh] md:h-full">
          <Image
            src={sheCan.src}
            alt="Illustration of girl / woman empowerment"
            fill={true}
            className="object-cover object-top"
          />
        </div>

        {/* Right Side: Text and Donation Form */}
        <div className="space-y-6 flex flex-col justify-center items-center p-4 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-gartis">
            Because of You, She Can
          </h1>
          {/* <p className="text-sm md:text-base text-center leading-relaxed">
            Your giving does more than change a life — it changes generations.
            When you give, a girl learns, a woman leads, a family thrives, a
            community rises. <br /> <br />You are not just donating — you are opening doors,
            creating opportunity, and fueling dreams that would otherwise be out
            of reach.


            Your support gives a woman the skills to earn, provide, and lead.
She builds a business, supports her family, and uplifts her community.
Because of you, she can break the cycle of poverty—for herself and others
          </p> */}
          <p className="text-sm md:text-base text-center leading-relaxed">
            Your giving does more than change a life — it changes generations.
            When you give, a girl learns, a woman leads, a family thrives, a
            community rises. <br /> <br />You are not just donating — you are opening doors,
            creating opportunity, and fueling dreams that would otherwise be out
            of reach.
          </p>
          <DonateMonthly />
        </div>
      </div>
    </div>
  );
};