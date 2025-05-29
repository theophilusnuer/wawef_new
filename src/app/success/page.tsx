"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    console.log("Redirected to success page");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="mb-6">Thank you for your support! A confirmation email has been sent to your inbox.</p>
        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#F2C94C] text-black py-3 px-6 rounded-sm hover:scale-102 transition-all duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}