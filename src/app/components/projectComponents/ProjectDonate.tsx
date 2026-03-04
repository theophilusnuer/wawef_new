// src/components/ProjectDonate.tsx

"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PaymentOptions from "./PaymentOptions";
import { countries } from "../Countries"; 

// ── Reusable Donate Button ────────────────────────────────────────────────
interface DonateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: string;
  loading?: boolean;
}

export function DonateButton({
  children,
  width = "w-48",
  loading = false,
  ...props
}: DonateButtonProps) {
  return (
    <button
      className={`inline-flex text-center justify-center bg-[#F2C94C] text-black py-1.5 md:py-2 px-6 rounded-sm cursor-pointer md:text-lg hover:scale-105 hover:shadow-md transition-all duration-200 ${width}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}

// ── Modal Content ───────────────────────────────────────────────────────────
interface DonateModalProps {
  projectName: string;
  donateLink?: string;
  onClose: () => void;
}

function DonateModal({ projectName, donateLink, onClose }: DonateModalProps) {
  const [step, setStep] = useState(1);
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    country: "US",
    projectName,             // kept for backend reference / tracking
  });
  const [errors, setErrors] = useState({ name: "", email: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", country: "" };

    if (!donorData.name.trim()) newErrors.name = "Name is required";
    if (!donorData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(donorData.email)) newErrors.email = "Email is invalid";
    if (!donorData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return isValid && !newErrors.name && !newErrors.email && !newErrors.country;
  };

  const handleProceed = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setApiError(false);

    if (donorData.country === "US") {
      const response = await fetch("/api/project-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });

      if (response.ok) {
        setStep(2);
      } else {
        setApiError(true);
      }
    } else {
      setStep(2);
    }

    setLoading(false);
  };

  if (step === 1) {
    return (
      <div>
        <h3 className="text-lg font-medium mb-4 text-center">
          Donor Details For {projectName}
        </h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={donorData.name}
              onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={donorData.email}
              onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <select
              value={donorData.country}
              onChange={(e) => setDonorData({ ...donorData, country: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          {apiError && (
            <p className="text-red-500 text-center">
              Failed to proceed, try again later
            </p>
          )}

          <DonateButton
            onClick={handleProceed}
            width="w-full"
            loading={loading}
          >
            Proceed to Donate
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
            onClick={() => setStep(1)}
            className="text-black cursor-pointer"
            aria-label="Go back to Step 1"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h3 className="text-lg font-medium text-center flex-1">
            {donorData.country === "US" ? "Donation Options" : "Donation Redirect"}
          </h3>
        </div>

        {donorData.country === "US" ? (
          <PaymentOptions donorData={donorData} onClose={onClose} />
        ) : (
          <div>
            <div className="mb-4 text-center">
              <p>
                Donations from{" "}
                {countries.find((c) => c.code === donorData.country)?.name || donorData.country}{" "}
                are received via <strong>GoFundMe</strong>.
              </p>
              <p>
                Click on <strong>Donate Now</strong> button to proceed
              </p>
            </div>

            {donateLink ? (
              <a
                href={donateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex bg-[#F2C94C] text-center justify-center py-2 px-4 rounded cursor-pointer w-full text-black"
              >
                Donate Now
              </a>
            ) : (
              <p className="text-red-500 text-center font-medium">
                No donation link available for this project.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}

// ── Main Trigger Component ─────────────────────────────────────────────────
interface ProjectDonateProps {
  projectName: string;
  donateLink?: string;
  width?: string;
  buttonText?: string;
}

export default function ProjectDonate({
  projectName,
  donateLink,
  width = "w-48",
  buttonText = "Donate Now",
}: ProjectDonateProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DonateButton onClick={() => setIsOpen(true)} width={width}>
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
              <DonateModal
                projectName={projectName}
                donateLink={donateLink}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}