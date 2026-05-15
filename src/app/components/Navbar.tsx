"use client";
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dropdown } from './Dropdown';
import Image from 'next/image';
import logo from '../assets/images/logo.png';
import { Donate } from './Donate';
import { useEffect, useState } from 'react';
import { createClient } from '@/sanity/lib/client';
import { NAVBAR_ITEMS, type NavItem, type NavItemLink } from './navbarItems';

type NavDropdownItem = {
    label: string;
    href: string;
    highlight?: boolean;
};

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [navItems, setNavItems] = useState<NavItem[]>(NAVBAR_ITEMS);

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
        client.fetch<FlagshipProjectItem[]>(`*[_type == "program"] | order(_createdAt desc)[0...5]{ "projectName": title, "slug": slug.current }`).then((data) => {
            const projectItems = (data || []).map((proj) => {
                const label = proj.projectName || 'Project';
                const fallbackSlug = label.replace(/\s+/g, '-').toLowerCase();
                return {
                    label,
                    href: `/programs/${proj.slug || fallbackSlug}`,
                };
            });

            // Update navItems with fetched projects
            setNavItems((prevItems) =>
                prevItems.map((item) =>
                    item.key === 'programs'
                        ? { ...item, items: projectItems }
                        : item
                )
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

                        {/* Desktop Navigation - Loop through navItems */}
                        <div className="hidden lg:flex space-x-6 items-center">
                            {navItems.map((item) => {
                                if (item.type === 'link') {
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href!}
                                            className="text-black text-sm md:text-base hover:underline hover:underline-offset-5 decoration-[#f2c94c]"
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                } else if (item.type === 'dropdown') {
                                    const displayItems =
                                        item.key === 'programs' && item.items!.length > 3
                                            ? item.items!.slice(0, 3).concat([item.seeAll!])
                                            : item.items || [];

                                    return (
                                        <Dropdown
                                            key={item.key}
                                            label={item.label}
                                            items={displayItems}
                                        />
                                    );
                                }
                            })}
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

                {/* Mobile Menu - Loop through navItems */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white px-4 py-4 border rounded-sm border-gray-200">
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item) => {
                                if (item.type === 'link') {
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href!}
                                            className="block text-black font-semibold text-sm underline-offset-2 underline decoration-[#f2c94c]"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                } else if (item.type === 'dropdown') {
                                    return (
                                        <div key={item.key}>
                                            <span className="text-black font-semibold text-sm">{item.label}</span>
                                            <div className="mt-2 space-y-2.5">
                                                {item.items?.map((subitem) => (
                                                    <Link
                                                        key={subitem.href}
                                                        href={subitem.href}
                                                        className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subitem.label}
                                                    </Link>
                                                ))}
                                                {item.seeAll && (
                                                    <Link
                                                        href={item.seeAll.href}
                                                        className="block text-black underline-offset-2 underline decoration-[#f2c94c] text-xs font-semibold"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {item.seeAll.label}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
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
}