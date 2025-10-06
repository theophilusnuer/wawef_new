import { FC } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Eligibility: FC = () => {
  const title = "Program Eligibility";
  const intro =
    "To ensure the Enock Addico Scholarship Program reaches young women with the highest potential for impact, applicants must meet the following criteria:";

  const criteria = [
    "Open to FEMALE applicants only.",
    "Must be a Ghanaian citizen currently residing in Accra, Ghana.",
    "Must be 18 to 25 years.",
    "Must have successfully completed Senior High School, demonstrating foundational academic readiness.",
    "Must demonstrate strong commitment to personal growth, and a clear interest in pursuing a career in cosmetology and related vocational pathways.",
    "Preference will be given to applicants who show a desire to contribute positively to their communities and serve as role models for other young women.",
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 relative inline-block">
          {title}
          <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#27AE60]"></span>
        </h2>
        <p className="mb-6 md:text-lg italic">{intro}</p>

        <ul className="space-y-4 md:text-lg">
          {criteria.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#27AE60] flex-shrink-0"></span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {/* Warning Notice */}
        <div className="mt-8 flex items-start gap-3 rounded-md bg-red-50 border border-red-200 p-4 text-red-700 ">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
          <p className="text-sm md:text-lg leading-relaxed">
            Any falsification of details or misrepresentation in the application will result in{" "}
            <span className="font-semibold">immediate disqualification</span>.
          </p>
        </div>

       <Link href="">
        <button
          className="bg-[#27AE60] text-white mt-6 font-semibold px-12 py-2 rounded-md cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200"
          aria-label="Apply for the scholarship"
        >
          Application closed
        </button>
       </Link>
      </div>
    </section>
  );
};

export default Eligibility;
