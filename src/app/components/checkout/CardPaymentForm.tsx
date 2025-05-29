"use client";
import React, { useEffect, useRef } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeError, PaymentIntent } from "@stripe/stripe-js";

interface CardPaymentFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
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
        throw new Error(result.error.message || "Payment failed. Please try again.");
      }

      if (result.paymentIntent?.status === "succeeded" && mounted.current) {
        onSuccess();
      } else {
        throw new Error("Payment did not succeed. Please try again.");
      }
    } catch (err: any) {
      if (mounted.current) onError(err.message || "An error occurred during payment. Please try again.");
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card" className="block text-sm md:text-base mb-1">
          Card Details
        </label>
        <div className="p-3 border rounded-sm">
          <PaymentElement 
  id="card-element"
  options={{
    layout: 'tabs',
    defaultValues: {
      billingDetails: {
        name: 'Anonymous',
        email: 'unknown@example.com',
      }
    },
    paymentMethodOrder: ['card']
  }}
/>

        </div>
        <p className="text-xs mt-2 text-gray-500">Your payment information is securely processed by Stripe.</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#F2C94C] text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Complete Payment
      </button>
    </form>
  );
};

export default CardPaymentForm;