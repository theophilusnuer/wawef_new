"use client";
import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FDF8EE] z-50">
      <div
        className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};