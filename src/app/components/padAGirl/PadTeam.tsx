"use client";
import Image from "next/image";

import team1 from "../../assets/images/team1.jpg";
import team2 from "../../assets/images/team2.jpg";
import team3 from "../../assets/images/team3.jpg";
import team4 from "../../assets/images/team4.jpg";
import team5 from "../../assets/images/team5.jpg";
import team6 from "../../assets/images/team6.jpg";
import team7 from "../../assets/images/team7.jpg";
import team8 from "../../assets/images/team8.jpg";

const PadTeam = () => {
  const teamMembers = [
    { src: team1, name: "Juliana Irene Buah", title: "Real Estate Builder/Founder, and Executive Director of WAWEF" },
    { src: team2, name: "Louisa Arhin", title: "Nurse RN, BSN" },
    { src: team3, name: "Yvonne Ofori", title: "Research Scientist and Brand Ambassador for Especially Yours" },
    { src: team4, name: "Sybil Selorm Seade", title: "Student" },
    { src: team5, name: "Jennifer Obeng", title: "Long term care/ Rehabilitation Nurse" },
    { src: team6, name: "Gracemargaret Boakye", title: "Certified Nursing Assistant" },
    { src: team7, name: "Louisa Mensah", title: "Family Nurse Practitioner" },
    { src: team8, name: "Christiana Ujialele", title: "Nurse APRN/FNP-BC" },
  ];

  return (
    <section className="py-12 px-4 my-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="inline-block text-lg md:text-2xl px-4 py-2 bg-[#FDF7E4] border border-[#F2C94C] rounded-md mb-8">
          PadHER - SHEflow Campaign Fund Raising Team
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full h-64">
                <Image
                  src={member.src}
                  alt={`${member.name} - ${member.title}`}
                  width={200}
                  height={250}
                  className="rounded-md shadow-md object-cover object-top w-full h-full"
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm md:text-base font-medium">{member.name}</p>
                <p className="text-xs md:text-sm text-gray-600">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PadTeam;