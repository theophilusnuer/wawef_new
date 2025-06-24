'use client';

import Image from 'next/image';
import { SetStateAction, useState } from 'react';
import ig from '../../assets/images/ig.svg';
import fb from '../../assets/images/fb.svg';
import li from '../../assets/images/li.svg';
import Link from 'next/link';

export default function ImpactFooter() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const socialLinks = {
    instagram: {
      wawef: 'https://instagram.com/wawef_org',
      mm360: 'https://instagram.com/mindsetmastery360global',
    },
    facebook: {
      wawef: 'https://www.facebook.com/share/1E671tfEF1/',
      mm360: 'https://facebook.com/mindsetmastery360',
    },
    linkedin: {
      wawef: 'https://www.linkedin.com/company/wawef/',
      mm360: 'https://linkedin.com/company/mindset-mastery-360-global-movement/',
    },
  };

  const handleIconClick = (platform: SetStateAction<string>) => {
    setSelectedPlatform(platform);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPlatform('');
  };

  return (
    <footer className="bg-white py-8 text-center px-4">
      <p className="font-medium italic md:text-xl mb-6">Get In Touch With Us</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-32 mb-4">
        {/* Social Handles */}
        <div>
          <p className="mb-2">Social Handles</p>
          <div className="flex justify-center space-x-4">
            <div className="relative">
              <button onClick={(e) => { e.preventDefault(); handleIconClick('instagram'); }} aria-label="Instagram">
                <Image src={ig} alt="Instagram" width={20} height={20} className="text-[#666666]" />
              </button>
              {showPopup && selectedPlatform === 'instagram' && (
                <div className="absolute bottom-full mb-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
                  <Link href={socialLinks.instagram.wawef} target="_blank" className="block text-sm text-[#666666] hover:underline mb-1"> 1. WAWEF</Link>
                  <Link href={socialLinks.instagram.mm360} target="_blank" className="block text-sm text-[#666666] hover:underline">2. MM360</Link>
                  <button onClick={closePopup} className="text-xs text-gray-500 mt-1 w-full underline-offset-3 underline font-bold text-left">Close</button>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={(e) => { e.preventDefault(); handleIconClick('facebook'); }} aria-label="Facebook">
                <Image src={fb} alt="Facebook" width={20} height={20} className="text-[#666666]" />
              </button>
              {showPopup && selectedPlatform === 'facebook' && (
                <div className="absolute bottom-full mb-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
                  <Link href={socialLinks.facebook.wawef} target="_blank" className="block text-sm text-[#666666] hover:underline mb-1">1. WAWEF</Link>
                  <Link href={socialLinks.facebook.mm360} target="_blank" className="block text-sm text-[#666666] hover:underline">2. MM360</Link>
                  <button onClick={closePopup} className="text-xs text-gray-500 mt-1 w-full underline-offset-3 underline font-bold text-left">Close</button>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={(e) => { e.preventDefault(); handleIconClick('linkedin'); }} aria-label="LinkedIn">
                <Image src={li} alt="LinkedIn" width={20} height={20} className="text-[#666666]" />
              </button>
              {showPopup && selectedPlatform === 'linkedin' && (
                <div className="absolute bottom-full mb-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
                  <Link href={socialLinks.linkedin.wawef} target="_blank" className="block text-sm text-[#666666] hover:underline mb-1">1. WAWEF</Link>
                  <Link href={socialLinks.linkedin.mm360} target="_blank" className="block text-sm text-[#666666] hover:underline">2. MM360</Link>
                  <button onClick={closePopup} className="text-xs text-gray-500 mt-1 w-full underline-offset-3 underline font-bold text-left">Close</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div>
          <p className="mb-2">Email</p>
          <p className="text-[#666666] text-sm">
            <a href="mailto:info@mm360.org" className="hover:underline">info@mm360.org</a> |
            <a href="mailto:info@wawef.org" className="hover:underline ml-1">info@wawef.org</a>
          </p>
        </div>
      </div>

      <p className="italic text-gray-500 mt-10 text-sm">
        Powered by SheRoseLead<sup>™</sup> Division
      </p>
    </footer>
  );
}