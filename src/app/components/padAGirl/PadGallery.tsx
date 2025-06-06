"use client";
import Link from "next/link";
import Image from "next/image";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img6 from "../../assets/images/img6.jpg";
import PadDonation from "./PadDonation";

const PadGallery = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="inline-block text-lg md:text-2xl px-14 py-2 bg-[#DFF3E7] rounded-md mb-8">
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
       <PadDonation/>
      </div>
    </section>
  );
};

export default PadGallery;