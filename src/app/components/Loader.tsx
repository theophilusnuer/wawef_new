"use client";
import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/20 backdrop-blur-sm">
      <div
        className="w-12 h-12 border-3 border-[#fcd34d] border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};