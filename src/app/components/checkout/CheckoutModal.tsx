"use client";
import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { loadStripe, StripeEmbeddedCheckout } from "@stripe/stripe-js";
import ThankYouModal from "./ThankYouModal";
import { CountrySelect } from "../Countries";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface CheckoutModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  type: "donation" | "sponsorship";
  donationMode?: "once" | "monthly";
  programTitle?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  amount,
  isOpen,
  onClose,
  type,
  donationMode = "once",
  programTitle,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const checkoutInstanceRef = useRef<StripeEmbeddedCheckout | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const handleContinue = () => {
    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  useEffect(() => {
    if (isOpen && step === 2) {
      const fetchSessionId = async () => {
        try {
          setLoading(true);
          const response = await fetch("/api/checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              amount: amount,
              type,
              donationMode,
              programTitle,
              paymentMethod: "card",
              country,
            }),
          });
          const result = await response.json();
          if (result.error) {
            setError(result.error);
            setLoading(false);
            return;
          }
          setSessionId(result.sessionId);
          setClientSecret(result.clientSecret);
          setDonationId(result.donationId);
          setLoading(false);
        } catch (err: any) {
          setError("Failed to initialize payment session. Please try again.");
          console.error("Error in fetchSessionId:", err);
          setLoading(false);
        }
      };
      fetchSessionId();
      const initializeStripe = async () => {
        await stripePromise;
        setStripeReady(true);
      };
      initializeStripe();
    }

    return () => {
      if (!isOpen) {
        setLoading(false);
        setStripeReady(false);
        setShowThankYou(false);
        setSessionId(null);
        setClientSecret(null);
        setDonationId(null);
        setName("");
        setEmail("");
        setCountry("United States");
        setStep(1);
      }
    };
  }, [isOpen, amount, type, donationMode, programTitle, country, step]);

  useEffect(() => {
    if (stripeReady && clientSecret && checkoutRef.current) {
      const initializeCheckout = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
          return;
        }

        try {
          if (checkoutInstanceRef.current) {
            checkoutInstanceRef.current.destroy();
            checkoutInstanceRef.current = null;
          }

          const checkout = await stripe.initEmbeddedCheckout({
            clientSecret: clientSecret,
          });

          checkoutInstanceRef.current = checkout;

          if (checkoutRef.current) {
            checkout.mount(checkoutRef.current);
          }
        } catch (err: unknown) {
          setError("Failed to load payment form. Please try again.");
          console.error("Error in initializeCheckout:", err);
        }
        setLoading(false);
      };
      initializeCheckout();
    }

    return () => {
      if (checkoutInstanceRef.current) {
        checkoutInstanceRef.current.destroy();
        checkoutInstanceRef.current = null;
      }
      if (checkoutRef.current) {
        checkoutRef.current.innerHTML = "";
      }
    };
  }, [stripeReady, clientSecret]);

  // Poll the donation status to confirm payment
  useEffect(() => {
    if (donationId && !showThankYou) {
      const checkDonationStatus = async () => {
        try {
          const response = await fetch(`/api/check-donation-status?donationId=${donationId}`);
          const result = await response.json();
          if (result.status === "completed") {
            setShowThankYou(true);
            setLoading(false);
            onClose();
          } else if (result.status === "expired") {
            setError("Payment session expired. Please try again.");
            setLoading(false);
          }
        } catch (err: any) {
          setError("Failed to verify payment status. Please try again.");
          console.error("Error in checkDonationStatus:", err);
          setLoading(false);
        }
      };

      const interval = setInterval(checkDonationStatus, 2000); // Poll every 2 seconds
      return () => clearInterval(interval);
    }
  }, [donationId, showThankYou, onClose]);

  if (!isOpen) return null;

  if (showThankYou && donationId) {
    return (
      <ThankYouModal
        isOpen={true}
        onClose={() => {
          setShowThankYou(false);
          onClose();
        }}
        type={type}
        amount={amount}
        donationMode={donationMode}
        programTitle={programTitle}
        donationId={donationId}
      />
    );
  }

  const getMessage = () => {
    if (type === "sponsorship") {
      return `You are sponsoring ${programTitle} Program with $${amount.toFixed(2)}.`;
    }
    return `You are ${donationMode === "monthly" ? "donating monthly" : "donating"} $${amount.toFixed(2)}.`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-xl mx-4 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-4 cursor-pointer">
          <XMarkIcon className="w-4 h-4 bg-[#F2C94C] rounded-sm p-0.5 md:w-5.5 md:h-5.5" />
        </button>
        {step === 2 && (
          <button onClick={handleBack} className="absolute top-3 left-4 cursor-pointer">
            <ArrowLeftIcon className="w-5 h-5 text-black rounded-sm p-0.5 md:w-5.5 md:h-5.5" />
          </button>
        )}

        <div className="p-6">
          <p className="text-sm md:text-base my-4">{getMessage()}</p>

          {step === 1 ? (
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full p-2 border rounded mb-2"
                  required
                />
                <CountrySelect value={country} onChange={(e) => setCountry(e.target.value)} required />
              </div>
              {error && <div className="text-red-500 text-sm md:text-base mb-4">{error}</div>}
              <button
                onClick={handleContinue}
                className="w-full bg-[#F2C94C] text-black py-2 rounded hover:bg-yellow-500 transition"
              >
                Continue
              </button>
            </div>
          ) : loading || !stripeReady || !clientSecret ? (
            <div className="flex justify-center items-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#F2C94C] border-t-transparent mr-2" />
              <span>Loading payment form...</span>
            </div>
          ) : (
            <div>
              <div ref={checkoutRef} className="mt-4"></div>
              {error && <div className="mt-4 text-center text-red-500">{error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;