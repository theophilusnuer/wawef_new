"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "donation" | "sponsorship";
  amount: number;
  donationMode?: "once" | "monthly";
  programTitle?: string;
  donationId?: string; // Added to match the prop from CheckoutModal
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose, type, amount, donationMode, programTitle, donationId }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const getMessage = () => {
    if (type === "sponsorship") {
      return `Thank you for sponsoring the ${programTitle} Program with $${amount.toFixed(2)}!`;
    }
    return `Thank you for your ${donationMode === "monthly" ? "monthly" : ""} donation of $${amount.toFixed(2)}.`;
  };

  const getSubMessage = () => {
    if (type === "sponsorship") {
      return "Your sponsorship will make a significant impact on this program.";
    }
    if (donationMode === "monthly") {
      return "Your recurring support will help us continue our mission.";
    }
    return "Your generosity helps us make a difference.";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md mx-4 p-6 text-center">
        <CheckCircleIcon className="w-16 h-16 text-[#27AE60] mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{getMessage()}</h2>
        <p className="mb-6">{getSubMessage()}</p>
        <p className="text-sm text-gray-600 mb-6">
          A confirmation email has been sent to your inbox with the details of your {type === "donation" ? "donation" : "sponsorship"}.
         
        </p>
        <button
          onClick={() => {
            onClose();
            router.push("/");
          }}
          className="w-full bg-[#F2C94C] text-black py-3 px-6 cursor-pointer rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default ThankYouModal;