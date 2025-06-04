"use client";
import { FC } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pad1 from "../../assets/images/pad1.webp"; // First image
import pad2 from "../../assets/images/pad2.webp"; // Replace with your second image
import pad3 from "../../assets/images/pad3.webp"; // Replace with your third image

export const Padgirl: FC = () => {
  const images = [pad1.src, pad2.src, pad3.src]; // Array of image sources

  // Slick Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          arrows: false, // Hide arrows on mobile for better UX
        },
      },
    ],
  };

  return (
    <section className="py-10 px-4 md:px-12 max-w-[78rem] mx-auto">
      <h2 className="inline-block text-base md:text-2xl px-2.5 py-1.5 md:px-4 md:py-3 rounded-sm bg-[#F2C94C] mb-8">
         Pad a Girl SHEFlow Campaign
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Carousel Section with react-slick */}
        <div className="w-full md:w-1/2 relative h-64 md:h-96">
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index} className="relative h-64 md:h-96">
                <Image
                  src={src}
                  alt={`Pad a girl campaign ${index + 1}`}
                  fill={true}
                  className="object-cover object-top rounded-md"
                  priority={index === 0} // Priority for the first image only
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-justify text-sm md:text-base leading-7 md:leading-8 text-gray-700">
            The West Africa Women Empowerment Foundation (WAWEF) successfully
            marked its inaugural Menstrual Hygiene Day 2025 at Osu Presby
            Girls&apos; Basic School, bringing together over 200 participants,
            including students, educators, health professionals, and media, for
            expert-led discussions, poetry performances, and the distribution of
            200 hygiene kits, fostering inclusive dialogue and practical support
            while laying the groundwork for expanded menstrual health education
            and policy advocacy across Ghana.
          </p>
          <div className="mt-6">
            <a
              href="/pad-a-girl-campaign"
              className="block w-full md:w-auto text-center bg-[#F2C94C] text-black py-2 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base"
            >
              Learn more about the Campaign
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Padgirl;