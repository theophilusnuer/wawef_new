'use client';
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import zelle from "../../assets/images/zelle.svg";
import cashapp from "../../assets/images/cashapp.png";
import venmo from "../../assets/images/venmo.png";
import Link from "next/link";

export default function PaymentOptions({
  donorData,
  onClose,
}: {
  donorData: { name: string; email: string; country: string };
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("zelle");

  return (
    <>
      {createPortal(
        <div className="fixed inset-0 p-4 bg-black/55 flex items-center justify-center z-50">
          <div className="bg-white p-2 md:p-4 rounded-lg max-w-md w-full relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-black font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-medium mb-4 text-center">
              Donation Options
            </h3>
            <div className="flex mb-4 border-b ">
              <button
                onClick={() => setActiveTab("zelle")}
                className={`flex-1 md:py-2 py-1 flex items-center justify-center space-x-1 ${
                  activeTab === "zelle"
                    ? "border-b-2 border-[#F2C94C] border-4 mb-2"
                    : ""
                }`}
              >
                <Image
                  src={zelle}
                  alt="Zelle"
                  width={24}
                  height={24}
                  className="h-7 w-7"
                />
                <span className="text-sm md:text-base">Zelle</span>
              </button>
              <button
                onClick={() => setActiveTab("cashapp")}
                className={`flex-1 md:py-2 py-1 flex items-center justify-center space-x-1 ${
                  activeTab === "cashapp"
                    ? "border-b-2 border-[#F2C94C] border-4 mb-2"
                    : ""
                }`}
              >
                <Image
                  src={cashapp}
                  alt="CashApp"
                  width={24}
                  height={24}
                  className="h-5.5 w-5.5"
                />
                <span className="text-sm md:text-base">CashApp</span>
              </button>
              <button
                onClick={() => setActiveTab("venmo")}
                className={`flex-1 md:py-2 py-1 flex items-center justify-center space-x-1 ${
                  activeTab === "venmo"
                    ? "border-b-2 border-[#F2C94C] border-4 mb-2"
                    : ""
                }`}
              >
                <Image
                  src={venmo}
                  alt="Venmo"
                  width={24}
                  height={24}
                  className="h-5 w-5"
                />
                <span className="text-sm md:text-base">Venmo</span>
              </button>
            </div>
            <div className="text-center">
              {activeTab === "zelle" && (
                <div>
                  <div className="mt-3">
                    <p>
                      <span className="text-gray-600">Name: </span>{" "}
                      <span className="font-bold">Juliana Buah</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Phone No: </span>{" "}
                      <span className="font-bold">404 623-8789</span>
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "cashapp" && (
                <div>
                  <Link href="/https://cash.app/$WAWEFregister">
                    <button className="bg-[#F2C94C] text-black py-1 px-3 md:px-6 md:py-3 rounded-md hover:scale-102 transition-all duration-200 cursor-pointer">
                      Click to Donate
                    </button>
                  </Link>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Or?</p>
                    <p className="text-sm text-gray-600">
                      CashApp Donation Details:
                    </p>
                    <p>
                      <span className="text-gray-600">Name: </span>$WAWEF
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "venmo" && (
                <div>
                  <Link href="https://venmo.com/u/Juliana-Buah">
                    <button className="bg-[#F2C94C] text-black py-1 px-3 md:px-6 md:py-3 rounded-md hover:scale-102 transition-all duration-200 cursor-pointer">
                      Click to Donate
                    </button>
                  </Link>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Or?</p>
                    <p className="text-sm text-gray-600">
                      Venmo Donation Details:
                    </p>
                    <p>
                      <span className="text-gray-600">Username: </span>@juliana-Buah
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}