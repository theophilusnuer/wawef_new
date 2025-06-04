"use client";
import Image from "next/image";
import part1 from "../../assets/images/part1.jpg";
import part2 from "../../assets/images/part2.jpg";
import part3 from "../../assets/images/part3.jpg";
import part4 from "../../assets/images/part4.jpg";
import Link from "next/link";

const PartnerTeam = () => {
  const teamMembers = [
    {
      src: part1,
      name: "Her Excellency Dr. Alisa Whyte",
      title: "Global Workforce, Life & Business Strategist",
      subtitle: "#1 International Bestselling Author, Executive Producer & Host - Mindset Mastery Moments Podcast (Top 1% Worldwide)",
      position: "[Founder & President – Mindset Mastery 360 Global Movement]",
    },
    {
      src: part2,
      name: "Felix Kanganwine Ayelazuno",
      title: "PhD Candidate, Molecular Parasitology Germany",
      subtitle: "",
      position: "[Founder of Winetoya Rural Child Foundation]",
    },
    {
      src: part3,
      name: "Rosemary Achentisa Ayelazuno",
      title: "PhD Student",
      subtitle: "Texas A&M University, College Station, Texas",
      position: "[Programs Manager, Winetoya Rural Child Foundation]",
    },
    {
      src: part4,
      name: "Louisa Banzini Mahama",
      title: "BSc, MPhil Social Psychology",
      subtitle: "",
      position: "[Project Lead for Menstrual Health and Hygiene, Winetoya Rural Child Foundation]",
    },
  ];

  return (
    <section className="py-12 px-4 -8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="inline-block text-lg md:text-2xl px-4 py-2 bg-[#FDF7E4] border border-[#F2C94C] rounded-md mb-8">
          PadHER - SHEflow Partnership Team
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
                <p className="text-xs md:text-sm text-gray-800">{member.title}</p>
                {member.subtitle && (
                  <p className="text-xs md:text-sm text-gray-600 italic">{member.subtitle}</p>
                )}
                <p className="text-xs md:text-sm text-gray-600">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
         <Link
          href="https://www.gofundme.com/f/padher-sheflow-campaign/donate?attribution_id=sl%3A375d0ab2-425e-427c-a6be-f46e9dfa0550&lang=en_US&ts=1749009077&utm_campaign=man_sharesheet_dash&utm_content=amp13_c-amp14_t1-amp15_c&utm_medium=customer&utm_source=copy_link&v=amp14_t1&source=btn_donate "
          className="inline-flex w-full my-6 text-center justify-center bg-[#F2C94C] text-black py-1.5 md:py-3 px-6 rounded-sm cursor-pointer md:text-lg hover:scale-105 hover:shadow-md transition-all duration-200"
        >
          Donate Now
        </Link>
      </div>
    </section>
  );
};

export default PartnerTeam;