"use client";
import React, { useEffect, useRef } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeError, PaymentIntent } from "@stripe/stripe-js";

interface BankPaymentFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const BankPaymentForm: React.FC<BankPaymentFormProps> = ({
  onSuccess,
  onError,
  setLoading,
  loading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError("Payment system not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const result: { error?: StripeError; paymentIntent?: PaymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          payment_method_data: {
            billing_details: { name: "Anonymous", email: "unknown@example.com" },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Bank payment failed. Please try again.");
      }

      if (result.paymentIntent?.status === "succeeded" && mounted.current) {
        const response: Response = await fetch("/api/complete-bank-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: result.paymentIntent.id }),
        });
        const jsonResult: { error?: string } = await response.json();
        if (jsonResult.error) throw new Error(jsonResult.error);
        onSuccess();
      } else {
        throw new Error("Bank payment did not succeed. Please try again.");
      }
    } catch (err: any) {
      if (mounted.current) onError(err.message || "An error occurred during bank payment. Please try again.");
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bank" className="block text-sm md:text-base mb-1">
          Bank Account Details
        </label>
        <div className="p-3 border rounded-sm">
          <PaymentElement
            id="bank-element"
            options={{
              defaultValues: {
                billingDetails: {
                  name: "Anonymous",
                  email: "unknown@example.com",
                },
              },
            }}
          />
        </div>
        <p className="text-xs mt-2 text-gray-500">Your bank details are securely processed by Stripe. Verification may require micro-deposits.</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#F2C94C] text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Complete Bank Payment
      </button>
    </form>
  );
};

export default BankPaymentForm;