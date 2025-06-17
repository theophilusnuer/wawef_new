"use client";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import zelle from "../../assets/images/zelle.svg";
import cashapp from "../../assets/images/cashapp.png";
import zelleQR from "../../assets/images/zelleQR.jpg";
import cashappQR from "../../assets/images/cashappQR.png";

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
          <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-black font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-medium mb-4 text-center">Donation Options</h3>
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab("zelle")}
                className={`flex-1 py-2 flex items-center justify-center space-x-2 ${
                  activeTab === "zelle" ? "border-b-2 border-[#F2C94C] border-4" : ""
                }`}
              >
                <Image
                  src={zelle}
                  alt="Zelle"
                  width={24}
                  height={24}
                  className="h-7 w-7"
                />
                <span>Zelle</span>
              </button>
              <button
                onClick={() => setActiveTab("cashapp")}
                className={`flex-1 py-2 flex items-center justify-center space-x-2 ${
                  activeTab === "cashapp" ? "border-b-2 border-[#F2C94C] border-4" : ""
                }`}
              >
                <Image
                  src={cashapp}
                  alt="CashApp"
                  width={24}
                  height={24}
                  className="h-5.5 w-5.5"
                />
                <span>CashApp</span>
              </button>
            </div>
            <div className="text-center">
              {activeTab === "zelle" && (
                <div>
                  {/* <div className="">
                    <p className="text-sm text-gray-600">Scan to Donate</p>
                    <Image
                      src={zelleQR}
                      alt="Scan to pay QR code"
                      width={115}
                      height={115}
                      className="mt-2 mx-auto"
                    />
                  </div> */}
                  <div className="mt-3">
                    {/* <p className="text-sm text-gray-600">Or?</p> */}
                    {/* <p className="text-sm text-gray-600">Zelle Donation Details:</p> */}
                    <p><span className="text-gray-600">Name: </span> <span className="font-bold">Juliana Buah</span></p>
                    <p><span className="text-gray-600">Email: </span> <span className="font-bold">wawefgh@gmail.com</span></p>
                  </div>
                </div>
              )}
              {activeTab === "cashapp" && (
                <div>
                  <div className="">
                    <p className="text-sm text-gray-600">Scan to Donate</p>
                    <Image
                      src={cashappQR}
                      alt="Scan to pay QR code"
                      width={115}
                      height={115}
                      className="mt-2 mx-auto"
                    />
                  </div>
                    <div className="mt-3">
                    <p className="text-sm text-gray-600">Or?</p>
                    <p className="text-sm text-gray-600">CashApp Donation Details:</p>
                    <p><span className="text-gray-600">Name: </span>$WAWEF</p>
                   
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