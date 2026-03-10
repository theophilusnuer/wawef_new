"use client";
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dropdown } from './Dropdown';
import Image from 'next/image';
import logo from '../assets/images/logo.png';
import { Donate } from './Donate';
import { useEffect, useState } from 'react';
import { createClient } from '@/sanity/lib/client';

type NavDropdownItem = {
    label: string;
    href: string;
    highlight?: boolean;
};

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

export default function Navbar() {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [flagshipProjects, setFlagshipProjects] = useState<NavDropdownItem[]>([]);

    type FlagshipProjectItem = {
        projectName?: string;
        slug?: string;
    };

        useEffect(() => {
            const client = createClient({
                projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
                dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
                apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
                useCdn: true,
            });
            // Fetch flagship projects
            client.fetch<FlagshipProjectItem[]>(`*[_type == "project"] | order(_createdAt desc)[0...5]{ projectName, "slug": slug.current }`).then((data) => {
                setFlagshipProjects(
                    (data || []).map((proj) => {
                        const label = proj.projectName || 'Project';
                        const fallbackSlug = label.replace(/\s+/g, '-').toLowerCase();

                        return {
                            label,
                            href: `/projects/${proj.slug || fallbackSlug}`,
                        };
                    })
                );
            });
        }, []);

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
                            <Image src={logo} alt="WAWEF" width={160} height={40} className="sm:h-15 h-10 w-full" />
                        </Link>

                        {/* Nav Items (Desktop Only) */}
                                                <div className="hidden lg:flex space-x-6 items-center">
                                                        <Dropdown
                                                            label="Flagship Projects"
                                                            items={
                                                                flagshipProjects.length > 3
                                                                    ? flagshipProjects
                                                                          .slice(0, 3)
                                                                          .concat([
                                                                              {
                                                                                  label: 'See all projects',
                                                                                  href: '/projects',
                                                                                  highlight: true,
                                                                              },
                                                                          ])
                                                                    : flagshipProjects
                                                            }
                                                        />
                                                        <Dropdown label="About Us" items={[
                                                            { label: 'Who We Are', href: '/about-us' },
                                                            { label: 'Leadership', href: '/team' },
                                                            { label: 'Our Vibrant Volunteers', href: '/volunteers' },
                                                        ]} />
                                                        <Link href="/reviews-resources" className="text-black text-sm md:text-base hover:underline hover:underline-offset-5 decoration-[#f2c94c]">Review & Resources</Link>
                                                        <Link href="/impact-stories" className="text-black text-sm md:text-base hover:underline hover:underline-offset-5 decoration-[#f2c94c]">Impact Stories</Link>
                                                </div>
                    </div>

                    {/* Right Group: Give Button */}
                    {/* <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group flex items-center bg-[#F2C94C] cursor-pointer text-black py-2 px-4 rounded-sm hover:scale-105 hover:shadow-md transition-all duration-200 text-sm md:text-base"
                        >
                            Give
                            <Emoji text="👩🏽" className="ml-1 group-hover:text-xl" />
                        </button>
                    </div> */}
                </div>

                {/* Mobile Menu */}
                                {isMobileMenuOpen && (
                                    <div className="lg:hidden bg-white px-4 py-4 border rounded-sm border-gray-200">
                                        <div className="flex flex-col space-y-4">
                                            {/* Flagship Projects */}
                                            <div>
                                                <span className="text-black font-semibold text-sm">Flagship Projects</span>
                                                <div className="mt-2 space-y-2.5">
                                                    {flagshipProjects.slice(0, 4).map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                    {flagshipProjects.length > 4 && (
                                                        <Link
                                                            href="/projects"
                                                            className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs font-semibold"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            See all projects
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            {/* About Us */}
                                            <div>
                                                <span className="text-black font-semibold text-sm">About Us</span>
                                                <div className="mt-2 space-y-2.5">
                                                    <Link href="/about-us" className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs" onClick={() => setIsMobileMenuOpen(false)}>Who We Are</Link>
                                                    <Link href="/team" className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs" onClick={() => setIsMobileMenuOpen(false)}>Leadership</Link>
                                                    <Link href="/volunteers" className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Our Vibrant Volunteers</Link>
                                                </div>
                                            </div>
                                            
                                            {/* Review & Resources */}
                                            <div>
                                                <Link href="/reviews-resources" className="block text-black font-semibold text-sm underline-offset-2 underline decoration-[#f2c94c]" onClick={() => setIsMobileMenuOpen(false)}>
                                                    Review & Resources
                                                </Link>
                                            </div>

                                            {/* Impact Stories */}
                                            <div>
                                                <Link href="/impact-stories" className="block text-black font-semibold text-sm underline-offset-2 underline decoration-[#f2c94c]" onClick={() => setIsMobileMenuOpen(false)}>
                                                    Impact Stories
                                                </Link>
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