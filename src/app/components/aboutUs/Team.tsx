import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTeamPath } from '@/app/utils/teamUtils';
import { teamData } from '../team/TeamData';

// Filter team members for specific roles
const featuredRoles = ["Founder & Executive Director", "Board Member",];
const featuredTeamMembers = teamData.filter((member) =>
    featuredRoles.includes(member.role)
);

export const Team: React.FC = () => {
    return (
        <div className="w-full max-w-[72rem] mx-auto my-2 mb-20 px-4 md:px-0 justify-items-center md:flex md:flex-col">
            <h2 className="text-lg md:text-xl mb-8 bg-[#FDF7E4] border border-[#F2C94C] rounded-sm px-8 py-2 md:py-3 mx-auto md:mx-0 text-center md:text-left w-fit md:pl-3 md:pr-16">
                The Team
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full">
                {featuredTeamMembers.map((member, index) => (
                    <Link key={index} href={getTeamPath(member.name)} className="block">
                        <div className="rounded-sm overflow-hidden  hover:scale-95 transition-all duration-200">
                            <Image
                                src={member.pic}
                                alt={member.name}
                                width={400}
                                height={400}
                                className="w-full h-78 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-lg">{member.name}</h3>
                                <p className="text-sm">{member.role}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="text-center">
                <Link
                    href="/team"
                    className="inline-block bg-[#F2C94C] px-6 py-3 rounded-sm text-sm md:text-base hover:scale-102 transition-all duration-200"
                >
                    See All Team Members
                </Link>
            </div>
        </div>
    );
};

