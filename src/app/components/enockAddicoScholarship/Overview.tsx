import { FC } from "react";
import Image from "next/image";
import hw from "../../assets/images/hero-women.jpg";
import cos2 from "../../assets/images/cos2.webp";
import cos3 from "../../assets/images/cos3.webp";
import Link from "next/link";

const Overview: FC = () => {
  const descriptionPart1 =
  "The Enock Addico Scholarship Program is designed to provide  talented but underprivileged young women in Ghana with full scholarships to study at a leading technical and vocational Institute. The program removes financial barriers by granting access to quality vocational education at a recognized TVET institute, enabling recipients to pursue training that prepares them for both employment and entrepreneurial opportunities.";
  const scholarImages = [cos2, cos3, hw];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Text Content */}
        <div className="space-y-6 self-center">
          <h2 className="text-2xl md:text-4xl font-bold relative inline-block">
            Enock Addico Scholarship Program
            <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#27AE60]"></span>
          </h2>

          <p className=" leading-relaxed md:text-lg">{descriptionPart1}</p>

          <Link href="https://forms.gle/tGWgyYVNvfzwGAMZ6" target="blank">
            <button
              className="bg-[#27AE60] text-white hidden md:block font-semibold px-12 py-1 rounded-md cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 "
              aria-label="Apply for the scholarship"
            >
              Apply
            </button>
          </Link>
        </div>

        {/* Right: Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
            <Image
              src={scholarImages[0]}
              alt="Scholarship image 1"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>

          <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
            <Image
              src={scholarImages[1]}
              alt="Scholarship image 2"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>

          <div className="relative col-span-2 p-1 md:p-0">
            <div
              className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 overflow-hidden 
      shadow-[8px_8px_0px_0px_#27AE60] md:shadow-[16px_16px_0px_0px_#27AE60]"
            >
              <Image
                src={scholarImages[2]}
                alt="Scholarship image 3"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Mobile Apply Button */}
            <div className="col-span-2 flex justify-center mt-4 md:hidden">
          <Link href="https://forms.gle/tGWgyYVNvfzwGAMZ6" target="blank">
              <button
                className="bg-[#27AE60] text-white font-semibold px-8 py-2 rounded-md cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200"
                aria-label="Apply for the scholarship"
              >
                Apply
              </button>
          </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
