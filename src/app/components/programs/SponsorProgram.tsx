'use client';
import { FC, useState } from 'react';
import { CheckoutModal } from '../checkout/CheckoutModal';

interface SponsorProgramProps {
    programTitle: string;
}

export const SponsorProgram: FC<SponsorProgramProps> = ({ programTitle }) => {
    const [sponsorshipMethod, setSponsorshipMethod] = useState<'card' | 'zelle'>('card'); // Updated to 'card' or 'zelle'
    const [selectedAmount, setSelectedAmount] = useState<number | null>(1000); // Default to $1000
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
        if (sponsorshipMethod === 'card' && selectedAmount) {
            setIsModalOpen(true); // Open the modal for Stripe sponsorship
        } else {
            console.log('Please select an amount to sponsor or use Zelle details.');
        }
    };

    return (
        <>
            <div className="py-8 px-4 max-w-lg mx-auto rounded-md">
                {/* Tabs */}
                <div className="flex bg-white rounded-lg justify-center space-x-2 mb-6 w-full">
                    <button
                        onClick={() => setSponsorshipMethod('card')}
                        className={`py-1.5 font-medium cursor-pointer md:px-6 rounded-lg text-sm w-full md:text-base ${sponsorshipMethod === 'card'
                            ? 'bg-[#F2C94C] text-black'
                            : 'bg-white text-black'
                            }`}
                    >
                        Sponsor with Card
                    </button>
                    <button
                        onClick={() => setSponsorshipMethod('zelle')}
                        className={`py-1.5 font-medium cursor-pointer md:px-6 rounded-lg text-sm w-full md:text-base ${sponsorshipMethod === 'zelle'
                            ? 'bg-[#F2C94C] text-black'
                            : 'bg-white text-black'
                            }`}
                    >
                        Sponsor with Zelle
                    </button>
                </div>

                {/* Amount Selection or Zelle Details */}
                <h2 className="text-center text-sm md:text-base font-medium p-4 rounded-tr-lg rounded-tl-lg bg-[#F5F5DC]">
                    {sponsorshipMethod === 'zelle' ? 'Zelle Sponsorship Details' : `Sponsor ${programTitle}`}
                </h2>
                <div className="bg-[#FCFCF4] py-8 px-3.5 md:px-6 rounded-br-lg rounded-bl-lg">
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

                    {/* Zelle Details (visible only for Zelle) */}
                    {sponsorshipMethod === 'zelle' && (
                        <div className="text-center mb-6">
                            <p className="text-sm md:text-base font-bold">
                                <span className="font-normal">Name:</span> Juliana Buah
                            </p>
                            <p className="text-sm md:text-base font-bold">
                                <span className="font-normal">Phone No:</span> 404-623-8789
                            </p>
                        </div>
                    )}

                    {/* Sponsor Button (hidden for Zelle) */}
                    {sponsorshipMethod === 'card' && (
                        <div className="flex justify-center mb-4">
                            <button
                                onClick={handleSponsor}
                                className="w-full bg-[#F2C94C] cursor-pointer text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base"
                            >
                                Sponsor
                            </button>
                        </div>
                    )}

                    {/* Tagline */}
                    <p className="text-center text-sm px-3">
                        Her future depends on your kindness—sponsor today to empower women!
                    </p>
                </div>
            </div>
            {/* Checkout Modal */}
            {sponsorshipMethod === 'card' && selectedAmount !== null && (
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