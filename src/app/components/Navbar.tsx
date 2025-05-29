"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FC } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dropdown } from './Dropdown';
import Image from 'next/image';
import logo from '../assets/images/logo.png';
import Emoji from 'react-emoji-render';
import { programsData } from '@/app/components/programs/programsData';
import { getProgramPath } from '../utils/slugUtils';
import { Donate } from './Donate';

// Helper function to generate simplified labels from program titles
const getSimplifiedLabel = (title: string): string => {
    if (title.includes("Cosmetology")) {
        return "Cosmetology Training";
    } else if (title.includes("Fashion Design")) {
        return "Fashion & Design Training";
    } else if (title.includes("ICT")) {
        return "ICT - Web Development & Digital Marketing";
    }
    return title; // Fallback to the original title if no match
};

export const Navbar: FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const takeActionItems = [
        { label: 'Sponsor a Program', href: '/programs' },
        { label: 'Give Monthly', href: '/give-monthly' },
    ];

    const whatWeDoItems = programsData.map((program) => ({
        label: getSimplifiedLabel(program.title),
        href: getProgramPath(program.title),
    }));
    const aboutUsItems = [
        { label: 'Who We Are', href: '/about-us' },
        { label: 'Meet the Team', href: '/team' },
    ];

    return (
        <>
            <nav className="sticky top-0 w-full bg-[#FCFCF4] z-50">
                <div className="container mx-auto px-4 py-2 md:py- flex justify-between items-center">
                    {/* Left Group: Hamburger (mobile), Logo, and Nav Items (desktop) */}
                    <div className="flex items-center space-x-2.5 lg:space-x-16">
                        {/* Hamburger Menu (Mobile Only) */}
                        <button
                            className="lg:hidden text-black"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <Image src={logo} alt="WAWEF" className="sm:h-15 h-10 w-full" />
                        </Link>

                        {/* Nav Items (Desktop Only) */}
                        <div className="hidden lg:flex space-x-6 items-center">
                            <Dropdown label="Take Action" items={takeActionItems} />
                            <Dropdown label="About Us" items={aboutUsItems} />
                            <Dropdown label="What We Do" items={whatWeDoItems} />
                        </div>
                    </div>

                    {/* Right Group: Give Button */}
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group flex items-center bg-[#F2C94C] text-black py-2 px-4 rounded-sm hover:scale-105 hover:shadow-md transition-all duration-200 text-sm md:text-base"
                        >
                            Give
                            <Emoji text="👩🏽" className="ml-1 group-hover:text-xl" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white px-4 py-4 border rounded-sm border-gray-200">
                        <div className="flex flex-col space-y-4">
                            {/* Take Action Dropdown as Links */}
                            <div>
                                <span className="text-black font-semibold text-sm">Take Action</span>
                                <div className="mt-2 space-y-2.5">
                                    {takeActionItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* About Us */}
                            <div>
                                <span className="text-black font-semibold text-sm">About Us</span>
                                <div className="mt-2 space-y-2.5">
                                    {aboutUsItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* What We Do Dropdown as Links */}
                            <div>
                                <span className="text-black font-semibold text-sm">What We Do</span>
                                <div className="mt-2 space-y-2.5">
                                    {whatWeDoItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Modal for Donate Component */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white/85 rounded-md max-w-xl w-full mx-4 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 cursor-pointer"
                        >
                            <XMarkIcon className=" w-4 h-4 bg-[#F2C94C] rounded-sm p-0.5 md:w-5.5 md:h-5.5" />
                        </button>
                        {/* Donate Component */}
                        <Donate />
                    </div>
                </div>
            )}
        </>
    );
};