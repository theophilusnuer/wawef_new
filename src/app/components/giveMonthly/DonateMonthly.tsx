'use client';
import { FC, useState } from 'react';
import { CheckoutModal } from '../checkout/CheckoutModal';

export const DonateMonthly: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'zelle'>('card'); // State for payment method
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100); // Default to $100
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const predefinedAmounts = [50, 100, 150, 200];

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

  const handleDonate = () => {
    if (paymentMethod === 'card' && selectedAmount) {
      setIsModalOpen(true); // Open the modal for Stripe monthly donation
    } else {
      console.log('Please select an amount to donate or use Zelle details.');
    }
  };

  return (
    <>
      <div className="py-8 px-4 max-w-lg mx-auto border rounded-sm border-black/50">
        {/* Tabs */}
        <div className="flex bg-white rounded-lg border border-black/50 justify-center space-x-2 mb-6 w-full">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`py-1.5 font-medium cursor-pointer md:px-6 rounded-lg text-sm w-full md:text-base ${paymentMethod === 'card'
              ? 'bg-[#F2C94C] text-black'
              : 'bg-white text-black'
              }`}
          >
            Give with Card
          </button>
          <button
            onClick={() => setPaymentMethod('zelle')}
            className={`py-1.5 font-medium cursor-pointer md:px-6 rounded-lg text-sm w-full md:text-base ${paymentMethod === 'zelle'
              ? 'bg-[#F2C94C] text-black'
              : 'bg-white text-black'
              }`}
          >
            Give with Zelle
          </button>
        </div>

        {/* Amount Selection or Zelle Details */}
        <h2 className="text-center text-sm md:text-base font-medium p-4 rounded-tr-lg rounded-tl-lg bg-[#F5F5DC]">
          {paymentMethod === 'zelle' ? 'Zelle Monthly Donation Details' : 'Choose an amount to give Monthly'}
        </h2>
        <div className="bg-[#FCFCF4] py-8 px-3.5 md:px-6 rounded-br-lg rounded-bl-lg">
          {paymentMethod === 'card' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-sm text-sm md:text-base ${selectedAmount === amount
                      ? 'bg-[#F2C94C] text-black'
                      : 'bg-[#dadacc] text-[#6d6d66]'
                      } hover:scale-105 transition-all duration-200 ${amount === 200 ? 'md:col-span-1' : ''
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
          {paymentMethod === 'zelle' && (
            <div className="text-center mb-6">
                            <p className="text-sm md:text-base font-bold">
                                <span className="font-normal">Name:</span> WAWEF
                            </p>
                            <p className="text-sm md:text-base font-bold">
                                <span className="font-normal">E-mail:</span> info@wawef.org

                            </p>
                        </div>
          )}

          {/* Give Button (hidden for Zelle) */}
          {paymentMethod === 'card' && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleDonate}
                className="w-full bg-[#F2C94C] cursor-pointer text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base"
              >
                Give
              </button>
            </div>
          )}

          {/* Tagline */}
          <p className="text-center text-sm px-3">
            Her future depends on your kindness—give today to empower women!
          </p>
        </div>
      </div>
      {/* Checkout Modal */}
      {paymentMethod === 'card' && selectedAmount !== null && (
        <CheckoutModal
          amount={selectedAmount}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type='donation'
          donationMode="monthly"
        />
      )}
    </>
  );
};