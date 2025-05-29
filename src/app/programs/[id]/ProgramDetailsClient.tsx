'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { SponsorProgram } from '@/app/components/programs/SponsorProgram';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Program {
    title: string;
    image: string;
    heroImage: string;
    overview: string;
    softSkills: string[];
    industrySkills: string[];
    gain: string[];
    specialFeatures: { heading: string; subheading: string }[];
    partners: string[];
    partnerLogo: string[];
    gallery: string[]; 
}

interface OtherProgram {
    title: string;
    href: string;
}

interface ProgramDetailsClientProps {
    program: Program;
    otherPrograms: OtherProgram[];
}

export default function ProgramDetailsClient({ program, otherPrograms }: ProgramDetailsClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const { title, heroImage, image, overview, softSkills, industrySkills, gain, specialFeatures, partners, partnerLogo, gallery } = program;

    return (
        <>
            <div>
                {/* SEO Meta Tags */}
                <Head>
                    <title>{title} | Program Details</title>
                    <meta name="description" content={overview.slice(0, 150) + '...'} />
                </Head>

                {/* Header Section */}
                <div className="relative w-full h-[60vh] md:h-[70vh]">
                    {/* Background Image */}
                    <Image
                        src={heroImage}
                        alt={title}
                        fill={true}
                        className="object-cover object-center"
                    />

                    {/* Black Overlay with 65% Opacity */}
                    <div className="absolute inset-0 bg-black/65" />

                    {/* Hero */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-8 w-full">
                        <div className="w-full max-w-[78rem] mx-auto flex flex-col items-start text-left mb-6">
                            <div>
                                <h3 className="text-white text-xl md:text-3xl mb-4">
                                    {title}
                                </h3>
                                {/* Partnership Text and Logos on the Same Line */}
                                <div className="flex items-center gap-2 md:gap-3 mb-6">
                                    <p className="text-white md:text-base">
                                        In partnership with
                                    </p>
                                    {/* Partner Logos */}
                                    <div className="flex gap-2 md:gap-3">
                                        {partnerLogo.map((logo, index) => (
                                            <div
                                                key={index}
                                                className="relative w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden"
                                            >
                                                <Image
                                                    src={logo}
                                                    alt={`${partners[index] || 'Partner'} logo`}
                                                    fill={true}
                                                    className="object-contain"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="bg-[#F2C94C] text-black px-6 py-2 rounded-sm hover:scale-102 transition-all duration-200 text-base md:text-lg cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Sponsor Program
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full max-w-[78rem] mx-auto my-10 md:my-20 px-6 md:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Side (col-span-2): Overview, Industry Skills, Beneficiary Gains, Special Features, Gallery */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Program Overview */}
                            <div>
                                <h2 className="text-lg md:text-xl mb-2 bg-[#F2C94C] px-3 py-2 md:p-3 rounded-sm">
                                    Program Overview
                                </h2>
                                <p className="md:text-base text-justify py-8">{overview}</p>
                            </div>

                            {/* Industry Skills */}
                            <div>
                                <h2 className="text-lg md:text-xl mb-2 border border-[#27AE60] bg-[#DFF3E7] px-3 py-2 md:p-3 rounded-sm">
                                    Relevant Industry Skills
                                </h2>
                                <ul className="list-disc pl-5 md:text-base space-y-4 text-justify py-8">
                                    {industrySkills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Beneficiary Gains */}
                            <div>
                                <h2 className="text-lg md:text-xl mb-2 bg-[#FAEBE7] border border-[#E07A5F] px-3 py-2 md:p-3 rounded-sm">
                                    What the Beneficiaries Gain
                                </h2>
                                <ul className="list-disc pl-5 md:text-base space-y-4 text-justify py-8">
                                    {gain.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Special Features */}
                            <div>
                                <h2 className="text-lg md:text-xl mb-2 bg-[#FDF7E4] border border-[#F2C94C] px-3 py-2 md:p-3 rounded-sm">
                                    Special Features
                                </h2>
                                <ul className="list-disc pl-5 space-y-4 text-justify py-8">
                                    {specialFeatures.map((feature, index) => (
                                        <li key={index}>
                                            <p className="md:text-base font-medium">{feature.heading}</p>
                                            <p className="md:text-base">{feature.subheading}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                           
                        </div>

                        {/* Right Side (col-span-1): Soft Skills, Other Programs, Partners */}
                        <div className="lg:col-span-1 space-y-8 lg:max-w-[15rem] flex flex-col lg:ml-12">
                            {/* Soft Skills */}
                            <div>
                                <h2 className="text-lg md:text-xl mb-4 rounded-sm">
                                    Soft Skills
                                </h2>
                                <ul className="list-disc md:text-base bg-[#DFF3E7] p-8 rounded-sm">
                                    {softSkills.map((skill, index) => (
                                        <li key={index} className="my-4">{skill}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Other Programs */}
                            <div>
                                <h2 className="text-lg md:text-xl mb-4 rounded-sm">
                                    Other Programs
                                </h2>
                                <ul className="list-disc bg-[#FAEBE7] space-y-4 p-8 rounded-sm md:text-base">
                                    {otherPrograms.map((prog, index) => (
                                        <li key={index}>
                                            <Link href={prog.href} className="my-4 underline hover:underline hover:decoration-[#E07A5F]">
                                                {prog.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Partners */}
                            <div>
                                <h2 className="text-lg md:text-xl rounded-sm">
                                    Partners
                                </h2>
                                <ul className="list-disc space-y-4 px-8 md:text-base">
                                    {partners.map((partner, index) => (
                                        <li key={index} className="my-4">
                                            {partner}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                     {/* Gallery */}
                            <div>
                               
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                                    {gallery.slice(0, 4).map((imageUrl, index) => (
                                        <div key={index} className="relative w-full h-52 rounded-md overflow-hidden hover:shadow-lg shadow-[#F2C94C] transition-shadow">
                                            <Image
                                                src={imageUrl}
                                                alt={`${title} gallery image ${index + 1}`}
                                                fill={true}
                                                className="object-cover object-top"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                </div>
            </div>

            {/* Modal for SponsorProgram Component */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white/85 rounded-md max-w-xl w-full mx-4 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-4 cursor-pointer"
                        >
                            <XMarkIcon className="w-4 h-4 bg-[#F2C94C] rounded-sm p-0.5 md:w-5.5 md:h-5.5" />
                        </button>
                        {/* SponsorProgram Component */}
                        <SponsorProgram programTitle={title} />
                    </div>
                </div>
            )}
        </>
    );
}