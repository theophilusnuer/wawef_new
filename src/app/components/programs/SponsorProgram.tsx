"use client";
import { FC, useState } from 'react';
import { CheckoutModal } from '../checkout/CheckoutModal';

interface SponsorProgramProps {
    programTitle: string;
}

export const SponsorProgram: FC<SponsorProgramProps> = ({ programTitle }) => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1000); // Default to $100
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility


    const predefinedAmounts = [500, 1000, 1500, 2000];

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount(''); // Clear custom input when a predefined amount is selected
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomAmount(value);
        setSelectedAmount(value ? parseFloat(value) : null); // Update selected amount from input
        if (value) {
            setSelectedAmount(parseFloat(value));
        }
    };

    const handleSponsor = () => {
        if (selectedAmount) {
            setIsModalOpen(true); // Open the modal if an amount is selected
            // console.log(`Sponsoring ${programTitle} with $${selectedAmount}`);
            // Placeholder for Stripe integration
        } else {
            console.log('Please select an amount to sponsor.');
        }
    };

    return (
        <>
        <div className="py-8 px-4 max-w-lg mx-auto rounded-md">
            {/* Amount Selection */}
            <h2 className="text-center text-sm md:text-base font-medium p-4 rounded-tr-lg rounded-tl-lg bg-[#F5F5DC]">
                Sponsor {programTitle}
            </h2>
            <div className="bg-[#FCFCF4] py-8 px-3.5 md:px-6 rounded-br-lg rounded-bl-lg">
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
                                amount === 200 ? 'md:col-span-1' : ''
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

                {/* Sponsor Button */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handleSponsor}
                        className="w-full bg-[#F2C94C] cursor-pointer text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base"
                    >
                        Sponsor
                    </button>
                </div>

                {/* Tagline */}
                <p className="text-center text-sm px-3">
                    Her future depends on your kindness—sponsor today to empower women!
                </p>
            </div>
        </div>
        {/* Checkout Modal */}
      {selectedAmount !== null && (
        <CheckoutModal
          amount={selectedAmount}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type='sponsorship'
          programTitle={programTitle}
        />
      )}
    </>
    );
};