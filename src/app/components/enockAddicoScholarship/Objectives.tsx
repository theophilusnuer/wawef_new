import { FC } from "react";

const Objectives: FC = () => {
  const objectives = [
    "Expand Access: Provide full scholarships to talented but underprivileged young women in Ghana to pursue high-quality TVET education.",
    "Build Skills: Equip recipients with industry-relevant cosmetology skills, alongside leadership, financial literacy, and digital skills.",
    "Enhance Opportunities: Facilitate internships, mentorship, and post-graduation support for sustainable employment or entrepreneurship.",
    "Pilot for Impact: Generate insights to inform the creation of the Enock Addico Technical and Vocational Institute, promoting gender equity and long-term access to quality TVET education for marginalized girls across West Africa.",
  ];

  return (
    <section className="py-12 md:my-8 bg-[#DFF3E7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title with underline */}
        <h2 className="text-2xl md:text-4xl font-bold relative inline-block mb-8">
          Program Objectives
          <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
        </h2>

        {/* Custom List */}
        <ul className="text-left max-w-3xl mx-auto space-y-5 leading-relaxed md:text-lg">
          {objectives.map((objective, index) => (
            <li
              key={index}
              className="relative pl-6"
            >
              {/* Custom bullet */}
              <span className="absolute left-0 top-2 w-3 h-3 rounded-full bg-[#F2C94C]"></span>
              {objective}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Objectives;
