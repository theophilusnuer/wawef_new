"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FC } from 'react';

interface DropdownProps {
  label: string;
  items: { label: string; href: string; highlight?: boolean }[];
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
    }, 200);
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
        <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg mt-2 overflow-hidden border border-gray-200 lg:block hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-black hover:bg-gray-50 transition-colors"
            >
              <span
                className={`
                  ${item.highlight 
                    ? 'font-semibold text-[#F2C94C] ' 
                    : 'font-normal hover:underline hover:underline-offset-4 hover:decoration-[#f2c94c]'
                  }
                `}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};