"use client";

import Link from "next/link";
import Image from "next/image";
import desktopFlyer from "../../assets/images/padhero.webp";
import mobileFlyer from "../../assets/images/padhero.webp";

export default function EventFlyer() {
  return (
    <section className="md:py-12 px-4 md:px-0 text-center">
      {/* Flyer placeholder with responsive images */}
      <div className="">
      <div className="relative">
        <div className="hidden md:block w-full">
          <div className="relative w-full h-96">
            <Image
              src={desktopFlyer}
              alt="Event Flyer (Desktop)"
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>
        </div>
        <div className="md:hidden">
          <Image
            src={mobileFlyer}
            alt="Event Flyer (Mobile)"
            layout="responsive"
            width={400}
            height={300}
            className=" mx-auto"
          />
        </div>
      </div>

      {/* Register button */}
      <Link href="/register">
        <button className="bg-[#F2C94C] my-4 text-black py-1 px-5 md:px-20 md:py-3 rounded-md hover:scale-102 transition-all duration-200 cursor-pointer">
          Register Now
        </button>
      </Link>
      </div>
    </section>
  );
}
