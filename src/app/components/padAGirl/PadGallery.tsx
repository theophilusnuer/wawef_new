"use client";
import Link from "next/link";
import Image from "next/image";
import img1 from "../../assets/images/phero.webp";
import img2 from "../../assets/images/pg2.webp";
import img3 from "../../assets/images/pg3.webp";
import img4 from "../../assets/images/pg4.webp";
import img5 from "../../assets/images/pg5.webp";
import img6 from "../../assets/images/pg6.webp";

const PadGallery = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="inline-block text-lg md:text-2xl px-14 py-2 bg-[#FAEBE7] rounded-md mb-8">
          Gallery of Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-2 md:gap-4 mb-8">
          {/* First column: Two images (1 row + 2 rows) */}
          <div className="col-span-1 row-span-1">
            <Image
              src={img1}
              alt="PadHer-Sheflow campaign"
              width={300}
              height={200}
              className="rounded-sm object-cover w-full h-full"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <Image
              src={img2}
              alt="PadHer-Sheflow campaign"
              width={300}
              height={400}
              className="rounded-sm object-cover w-full h-full"
            />
          </div>

          {/* Second column: Two images (second and third rows) */}
          <div className="col-start-2 row-start-1 col-span-1 row-span-2 md:col-start-2 md:row-start-1 md:col-span-1 md:row-span-2">
            <Image
              src={img3}
              alt="PadHer-Sheflow campaign"
              width={300}
              height={400}
              className="rounded-sm object-cover w-full h-full"
            />
          </div>
          <div className="col-start-2 row-start-3 col-span-1 row-span-1 md:col-start-2 md:row-start-3">
            <Image
              src={img4}
              alt="PadHer-Sheflow campaign"
              width={300}
              height={200}
              className="rounded-sm object-cover w-full h-full"
            />
          </div>

          {/* Third column: Two images (first and second/third rows) - Only visible on md and up */}
          <div className="hidden md:block col-start-3 row-start-1 col-span-1 row-span-1">
            <Image
              src={img5}
              alt="PadHer-Sheflow campaign"
              width={300}
              height={200}
              className="rounded-sm object-cover w-full h-full"
            />
          </div>
          <div className="hidden md:block col-start-3 row-start-2 col-span-1 row-span-2">
            <Image
              src={img6}
              alt="PadHer-Sheflow campaign"
              width={300}
              height={400}
              className="rounded-sm object-cover w-full h-full"
            />
          </div>
        </div>
        <Link href="https://wawef.pixieset.com/padhersheflowcampaign/" target="blank">
         <button className="bg-[#F2C94C] text-black py-2 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base cursor-pointer">
                       View gallery
                    </button>
        </Link>
      </div>
    </section>
  );
};

export default PadGallery;