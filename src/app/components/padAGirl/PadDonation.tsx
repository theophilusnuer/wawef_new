"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ButtonHTMLAttributes, ReactNode } from "react";
import PaymentOptions from "./PaymentOptions";
import { countries } from "../Countries"; // Adjusted import path
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Reusable DonateButton Component
interface DonateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
}

export function DonateButton({
  children,
  width = "w-40",
  ...props
}: DonateButtonProps) {
  return (
    <button
      className={`inline-flex text-center justify-center bg-[#F2C94C] text-black py-1.5 md:py-3 px-6 rounded-sm cursor-pointer md:text-lg hover:scale-105 hover:shadow-md transition-all duration-200 ${width}`}
      {...props}
    >
      {children}
    </button>
  );
}

// DonateOptions Component (Two-Step Donation Process)
export function DonateOptions({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    country: "US",
  });
  const [errors, setErrors] = useState({ name: "", email: "", country: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", country: "" };

    if (!donorData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!donorData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(donorData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!donorData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveToDB = async () => {
    if (validateForm()) {
      const response = await fetch("/api/pad-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });
      if (response.ok) {
        setStep(2);
      } else {
        console.error("Failed to save donor data");
      }
    }
  };

  const handleGoBack = () => {
    setStep(1);
  };

  if (step === 1) {
    return (
      <div className="">
        <h3 className="text-lg font-medium mb-4 text-center">
         Donor Details
        </h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={donorData.name}
              onChange={(e) =>
                setDonorData({ ...donorData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={donorData.email}
              onChange={(e) =>
                setDonorData({ ...donorData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <select
              value={donorData.country}
              onChange={(e) =>
                setDonorData({ ...donorData, country: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
          <DonateButton onClick={handleSaveToDB} width="w-full">
            Next
          </DonateButton>
         
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <div className="flex items-center mb-4">
          <button
            onClick={handleGoBack}
            className="text-black cursor-pointer"
            aria-label="Go back to Step 1"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h3 className="text-lg font-medium text-center flex-1">
            {donorData.country === "US"
              ? "Donation Options"
              : "Donation Redirect"}
          </h3>
        </div>
        {donorData.country === "US" ? (
          <PaymentOptions donorData={donorData} onClose={onClose} />
        ) : (
          <div>
            <p className="mb-4 text-center">
              Donations from{" "}
              {countries.find((c) => c.code === donorData.country)?.name ||
                donorData.country}{" "}
              are received via GoFundMe.
            </p>
            <a
              href="https://www.gofundme.com/f/padher-sheflow-campaign/donate?attribution_id=sl%3A375d0ab2-425e-427c-a6be-f46e9dfa0550&lang=en_US&ts=1749009077&utm_campaign=man_sharesheet_dash&utm_content=amp13_c-amp14_t1-amp15_c&utm_medium=customer&utm_source=copy_link&v=amp14_t1&source=btn_donate "
              className="flex bg-[#F2C94C] text-center justify-center py-2 px-4 rounded cursor-pointer w-full"
            >
              Donate Now
            </a>
          </div>
        )}
      </div>
    );
  }

  return null;
}

// Main PadDonation Component (Modal Trigger)
export default function PadDonation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DonateButton onClick={() => setIsOpen(true)} width="w-48">
        Donate Now
      </DonateButton>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 p-4 bg-black/55 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-3 text-black font-bold cursor-pointer"
              >
                ✕
              </button>
              <DonateOptions onClose={() => setIsOpen(false)} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
