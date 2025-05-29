import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { generateTeamSlug } from '@/app/utils/teamUtils';
import { teamData } from '@/app/components/team/TeamData';

interface Team {
    title: string;
}


export default async function TeamMemberPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Find the team member by matching the slug
    const member = teamData.find(
        (m) => generateTeamSlug(m.name) === id
    );

    // If no team member is found, render a 404 page
    if (!member) {
        return notFound();
        return null
    }

    const { name, pic, role, description } = member;

    return (
        <div className="w-full max-w-[72rem] mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* 1st Column: Picture, Name, Role */}
                <div className="flex flex-col items-center">
                    <Image
                        src={pic}
                        alt={name}
                        width={300}
                        height={300}
                        className="w-64 h-64 object-cover rounded-sm mb-4"
                    />
                    <h2 className="text-xl md:text-2xl text-center">{name}</h2>
                    <p className="text-sm md:text-base text-center">{role}</p>
                </div>

                {/* 2nd–4th Columns: Description (Merged into a Single Column) */}
                <div className="md:col-span-3">
                    {description.map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-sm md:text-base text-left mb-4 last:mb-0"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Generate static paths for all team members (optional, for SSG)
export async function generateStaticParams(): Promise<{ id: string }[]> {
    return teamData.map((member) => ({
        id: generateTeamSlug(member.name),
    }));
}

