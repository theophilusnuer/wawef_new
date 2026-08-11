"use client";
import React, { FC } from "react";

export const Whoweare: FC = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
            Who we are
            <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
          </h2>
        </div>
        <p className="text-base md:text-xl leading-relaxed text-left">
          WAWEF is a women led organization focused on empowering women and
          girls in West Africa through structured programs that promote dignity,
          access, and long term growth.
        </p>
      </div>
    </div>
  );
};
