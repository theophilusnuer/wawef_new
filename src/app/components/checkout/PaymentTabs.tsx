"use client";
import React from "react";

interface PaymentTabsProps {
  activeTab: "card" | "bank";
  onTabChange: (tab: "card" | "bank") => void;
}

const PaymentTabs: React.FC<PaymentTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-white rounded-lg justify-center mb-6 w-full border">
      <button
        onClick={() => onTabChange("card")}
        className={`md:py-2 px-4 flex items-center justify-center font-medium cursor-pointer rounded-lg text-sm w-full ${
          activeTab === "card" ? "bg-[#F2C94C] text-black" : "bg-white text-black"
        }`}
      >
        Card
      </button>
      <button
        onClick={() => onTabChange("bank")}
        className={`md:py-2 px-4 flex items-center justify-center font-medium cursor-pointer rounded-lg text-sm w-full ${
          activeTab === "bank" ? "bg-[#F2C94C] text-black" : "bg-white text-black"
        }`}
      >
        Bank Account
      </button>
    </div>
  );
};

export default PaymentTabs;