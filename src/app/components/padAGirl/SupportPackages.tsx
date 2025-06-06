"use client";
import Link from "next/link";
import PadDonation from "./PadDonation";

const SupportPackages = () => {
  const packages = [
    { amount: "$5", impact: "Pad a girl for 1 month" },
    { amount: "$10", impact: "Pad a girl for 2 months" },
    { amount: "$20", impact: "Pad a girl for 4 months" },
    { amount: "$30", impact: "Pad a girl for 6 months" },
    { amount: "$60", impact: "Pad a girl for 12 months" },
  ];

  return (
   <div className="bg-[#DFF3E7] py-10">
      <div className="container mx-auto max-w-4xl p-6 text-center">
        <h2 className="text-2xl md:text-3xl mb-2">
          Support Packages - Give with Purpose
        </h2>
        <p className=" text-sm md:text-base mb-6 max-w-[35rem] mx-auto">
          Each dollar goes directly toward providing menstrual products and education to girls in underserved communities.
        </p>
        <div className="px-4 md:px-10 max-w-[45rem] mx-auto bg-[#FCFCF4] p-4 rounded-md ">
          <div className="space-y-2 my-6">
            {packages.map((pkg, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="md:text-lg">{pkg.amount}</span>
                <span className="md:text-lg border-t border-dashed border-gray-400 flex-grow mx-2"></span>
                <span className="md:text-lg">{pkg.impact}</span>
              </div>
            ))}
          </div>
        <PadDonation/>
        
        </div>
      </div>
    </div>
  );
};

export default SupportPackages;