import { FC } from "react";
import Image from "next/image";
import app from "../../assets/images/approach.jpg";
import Link from "next/link";

const Approach: FC = () => {
  const approachPoints = [
    "Strategic Partnership with Existing TVET Institutions: Collaborating with FC Beauty College to leverage established teaching expertise, industry connections, and quality learning infrastructure.",
    "Transparent and Inclusive Selection Process: Open call for applications, targeting motivated young women from underprivileged backgrounds, ensuring fair access and representation.",
    "Holistic Skills Development: Integrating formal vocational training with life skills, soft skills, and professional exposure to maximize employability and entrepreneurial potential.",
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Single Image */}
        <div className="relative w-full h-72 sm:h-80 md:h-[28rem] lg:h-[32rem] overflow-hidden shadow-[8px_8px_0px_0px_#F2C94C] md:shadow-[16px_16px_0px_0px_#F2C94C]">
          <Image
            src={app}
            alt="WAWEF approach"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: Listed Content */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold relative inline-block">
            Our Approach
            <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
          </h2>

          <ul className="space-y-4 text-left leading-relaxed max-w-2xl md:text-lg">
            {approachPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-3 h-3 mt-2 flex-shrink-0 rounded-full bg-[#F2C94C]"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Link href="https://forms.gle/tGWgyYVNvfzwGAMZ6" target="blank">
        <button
          className="bg-[#F2C94C] mt-2 font-semibold px-12 py-2 rounded-md cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200"
          aria-label="Apply for the scholarship"
        >
          Apply
        </button>
       </Link>
        </div>
      </div>
    </section>
  );
};

export default Approach;
