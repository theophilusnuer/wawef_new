'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import confetti from 'canvas-confetti';

const Popup501: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      setIsOpen(true);

      // 🎉 Trigger a single confetti burst after popup opens
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { x: 0.5, y: 0.5 }, // center of screen
        });
      }, 100); // slight delay for popup entrance
    }
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGive = () => {
    const donateSection = document.getElementById('donate-section');
    if (donateSection) {
      const navbarHeight = 60; // adjust based on your actual navbar height
      const offsetTop = donateSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/40 flex items-center justify-center z-50 animate-fade-in">
      <div className="m-4 relative max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 bg-white rounded-full shadow-md p-1 cursor-pointer"
          aria-label="Close popup"
          onKeyDown={(e) => e.key === 'Enter' && handleClose()}
        >
          <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Header */}
        <div className="bg-[#27AE60] text-white text-center py-2 sm:py-3 rounded-t-lg font-semibold text-base sm:text-lg">
          Officially 501(c)(3)
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4 bg-white rounded-b-lg">
          <p className="text-sm sm:text-base">
            WAWEF is a verified 501(c)(3) non-profit organization with EIN No:{' '}
            <span className="font-bold">33-4982367</span>
          </p>

          <div className="text-left text-sm sm:text-base">
            <p className="mb-1 sm:mb-2 font-medium">This means:</p>
            <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2">
              <li>All donations are tax-deductible</li>
              <li>We are eligible to receive all grants and funding</li>
              <li>We have the capacity to make a lasting impact in West Africa</li>
            </ul>
          </div>

          <p className="text-sm sm:text-base md:text-left">
            Your donations support women and girls in West Africa
          </p>

          {/* Give Button */}
          <button
            onClick={handleGive}
            className="w-full bg-[#27AE60] cursor-pointer hover:scale-103 transition-all duration-200 text-white font-semibold py-2 px-4 sm:px-6 rounded-sm text-sm sm:text-lg"
          >
            Give
          </button>

          {/* Footer Note */}
          <p className="text-xs sm:text-sm mt-2 sm:mt-4">
            Her future depends on your kindness—give today to empower women!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup501;
