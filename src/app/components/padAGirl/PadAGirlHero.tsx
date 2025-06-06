"use client";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pad3 from "../../assets/images/pad3.webp";
import pad2 from "../../assets/images/pad2.webp";
import pad1 from "../../assets/images/pad1.webp";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";
import PadDonation from "./PadDonation";

const PadAGirlHero = () => {
  const images = [
    { src: pad3.src, alt: "Pad a Girl - Sheflows Campaign" },
    { src: pad2.src, alt: "Pad a Girl - Sheflows Campaign" },
    { src: pad1.src, alt: "Pad a Girl - Sheflows Campaign" },
  ];

  // Slick Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: false,
  };

  return (
    <section className="relative h-[calc(100vh-3.73vh)] w-full">
      {/* Carousel */}
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative h-[calc(100vh-3.73vh)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black opacity-65"></div>
          </div>
        ))}
      </Slider>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4 pt-16">
        <h1 className="font-gartis text-4xl md:text-6xl mb-4">
          PadHER - SHEflow Campaign
        </h1>
        <p className="md:text-lg mb-6 max-w-2xl">
          Join us to empower young girls in West Africa with access to menstrual
          hygiene education and free sanitary pads.
        </p>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <span className="font-inter text-base flex items-center">
            <MapPinIcon className="w-5 h-5 mr-2 text-white" /> Northern Ghana
          </span>
          <span className="font-inter text-base flex items-center">
            <CalendarDaysIcon className="w-5 h-5 mr-2 text-white" /> July, 2025
          </span>
        </div>
        <PadDonation/>
        {/* <Link
          href="https://www.gofundme.com/f/padher-sheflow-campaign/donate?attribution_id=sl%3A375d0ab2-425e-427c-a6be-f46e9dfa0550&lang=en_US&ts=1749009077&utm_campaign=man_sharesheet_dash&utm_content=amp13_c-amp14_t1-amp15_c&utm_medium=customer&utm_source=copy_link&v=amp14_t1&source=btn_donate "
          className="inline-flex items-center bg-[#F2C94C] text-black py-1.5 px-6 rounded-sm cursor-pointer text-base hover:scale-105 hover:shadow-md transition-all duration-200"
        >
          Donate Now
        </Link> */}
      </div>
    </section>
  );
};

export default PadAGirlHero;
