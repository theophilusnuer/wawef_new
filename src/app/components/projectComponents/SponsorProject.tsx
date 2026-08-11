// src/components/SponsorProject.tsx
'use client';

import { FC, useState } from 'react';
import { CheckoutModal } from '../checkout/CheckoutModal';
import type { FullProject } from '@/sanity/lib/getProjectBySlug';
import { Quote2 } from '../homepage/Quotes';

interface SponsorProjectProps {
  project: FullProject;
}

export const SponsorProject: FC<SponsorProjectProps> = ({ project }) => {
  const [sponsorshipMethod, setSponsorshipMethod] = useState<'card' | 'zelle'>('card');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const predefinedAmounts = [500, 1000, 1500, 2000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseFloat(value));
    } else {
      setSelectedAmount(null);
    }
  };

  const handleSponsor = () => {
    if (sponsorshipMethod === 'card' && selectedAmount && selectedAmount > 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="py-8 px-4 bg-[#DFF3E7] ">
        <Quote2 />
      <div className=" max-w-lg mx-auto ">
        {/* Tabs – same style */}
        <div className="flex bg-white rounded-lg justify-center space-x-2 mb-6 w-full">
          <button
            onClick={() => setSponsorshipMethod('card')}
            className={`py-1.5 font-medium cursor-pointer md:px-6 rounded-lg text-sm w-full md:text-base ${
              sponsorshipMethod === 'card' ? 'bg-[#F2C94C] text-black' : 'bg-white text-black'
            }`}
          >
            Sponsor with Card
          </button>
          <button
            onClick={() => setSponsorshipMethod('zelle')}
            className={`py-1.5 font-medium cursor-pointer md:px-6 rounded-lg text-sm w-full md:text-base ${
              sponsorshipMethod === 'zelle' ? 'bg-[#F2C94C] text-black' : 'bg-white text-black'
            }`}
          >
            Sponsor with Zelle
          </button>
        </div>

        {/* Heading – dynamic project name */}
        <h2 className="text-center text-sm md:text-base font-medium p-4 rounded-tr-lg rounded-tl-lg bg-[#F5F5DC]">
          {sponsorshipMethod === 'zelle'
            ? 'Zelle Sponsorship Details'
            : `Sponsor ${project.projectName}`}
        </h2>

        {/* Main content area  */}
        <div className="bg-[#FCFCF4] py-8 px-3.5 md:px-6 rounded-br-lg rounded-bl-lg mb-8">
         {sponsorshipMethod === 'card' && (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {predefinedAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => handleAmountSelect(amount)}
                                        className={`py-3 px-4 rounded-sm text-sm md:text-base ${
                                            selectedAmount === amount
                                                ? 'bg-[#F2C94C] text-black'
                                                : 'bg-[#dadacc] text-[#6d6d66]'
                                        } hover:scale-105 transition-all duration-200 ${
                                            amount === 2000 ? 'md:col-span-1' : ''
                                        }`}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                                {/* Custom Amount Input for Desktop */}
                                <div className="hidden md:flex justify-center md:col-span-2">
                                    <div className="relative w-full">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm md:text-base text-[#6d6d66]">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            value={customAmount}
                                            onChange={handleCustomAmountChange}
                                            placeholder="Enter other amount"
                                            className="w-full py-3 pl-8 pr-4 rounded-sm text-sm md:text-base border border-[#dadacc] focus:outline-none focus:ring-1 focus:ring-[#F2C94C]"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Custom Amount Input for Mobile */}
                            <div className="md:hidden flex justify-center mb-6">
                                <div className="relative w-full">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm md:text-base text-[#6d6d66]">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                        placeholder="Enter other amount"
                                        className="w-full py-2 pl-8 pr-4 rounded-sm text-sm md:text-base border border-[#dadacc] focus:outline-none focus:ring-1 focus:ring-[#F2C94C]"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </>
                    )}

          {/* Zelle details – same as before */}
          {sponsorshipMethod === 'zelle' && (
            <div className="text-center mb-6 space-y-2">
              <p className="text-sm md:text-base font-bold">
                <span className="font-normal">Name:</span> WAWEF
              </p>
              <p className="text-sm md:text-base font-bold">
                <span className="font-normal">E-mail:</span>info@wawef.org
              </p>
            </div>
          )}

          {/* Sponsor button – only shown for card */}
          {sponsorshipMethod === 'card' && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleSponsor}
                disabled={!selectedAmount || selectedAmount <= 0}
                className={`w-full bg-[#F2C94C] cursor-pointer text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                  !selectedAmount || selectedAmount <= 0 ? 'opacity-50' : ''
                }`}
              >
                Sponsor
              </button>
            </div>
          )}

          {/* Tagline – kept the same */}
          <p className="text-center text-sm px-3">
            Her future depends on your kindness—sponsor today to empower women!
          </p>
        </div>
        </div>
      </div>

      {/* Stripe Checkout Modal – passes project name */}
      {sponsorshipMethod === 'card' && selectedAmount !== null && selectedAmount > 0 && (
        <CheckoutModal
          amount={selectedAmount}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="sponsorship"
          programTitle={project.projectName}
        />
      )}
    </>
  );
};