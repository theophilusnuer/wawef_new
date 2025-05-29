"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FC } from 'react';

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

export const Dropdown: FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay to allow moving to dropdown items
    setTimeoutId(id);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center text-black text-sm md:text-base hover:underline hover:underline-offset-5 decoration-[#f2c94c]">
        {label}
        <svg
          className={`w-4 h-4 ml-1.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-58 bg-white shadow-sm rounded-lg lg:block hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-4 border-b border-gray-200 text-black hover:underline decoration-[#000000]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};