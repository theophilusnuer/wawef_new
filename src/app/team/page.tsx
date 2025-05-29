import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTeamPath } from '@/app/utils/teamUtils';
import { teamData } from '../components/team/TeamData';
import { TeamHero } from '../components/team/TeamHero';

const TeamsPage: React.FC = () => {
    return (
      <div>
        <TeamHero/>
        <div className="w-full max-w-[72rem] mx-auto py-10 my-10 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-y-16 gap-x-20">
                {teamData.map((member, index) => (
                    <Link key={index} href={getTeamPath(member.name)} className="block">
                        <div className=" rounded-sm overflow-hidden  hover:scale-95 transition-all duration-200">
                            <Image
                                src={member.pic}
                                alt={member.name}
                                width={400}
                                height={400}
                                className="w-full h-68 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-lg">{member.name}</h3>
                                <p className="text-sm">{member.role}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        </div>
    );
};

export default TeamsPage;