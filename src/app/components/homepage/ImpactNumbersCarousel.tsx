'use client';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { urlFor } from '@/sanity/lib/image';

interface ImpactNumbersCarouselProject {
  _id: string;
  projectName: string;
  slug?: { current?: string };
  coverImage?: {
    asset?: { _ref?: string };
    alt?: string;
  };
}

interface ImpactNumbersCarouselProps {
  projects: ImpactNumbersCarouselProject[];
}

export default function ImpactNumbersCarousel({ projects }: ImpactNumbersCarouselProps) {
  if (projects.length === 0) {
    return (
      <div className="bg-[#d8d6cc] px-4 py-16 text-center text-gray-700">
        Project highlights will appear here soon.
      </div>
    );
  }

  const settings = {
    dots: projects.length > 1,
    infinite: projects.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: projects.length > 1,
    autoplaySpeed: 5000,
    arrows: projects.length > 1,
    pauseOnHover: false,
    adaptiveHeight: false,
  };

  return (
    <div className="relative rounded-sm ">
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project._id} className="relative">
            {/* Image */}
            <div className="relative h-[18rem] sm:h-[24rem] md:h-[30rem] lg:h-[36rem] overflow-hidden">
              {project.coverImage?.asset?._ref ? (
                <Image
                  src={urlFor(project.coverImage)
                    .width(1800)
                    .height(1100)
                    .fit('crop')
                    .quality(88)
                    .url()}
                  alt={project.coverImage.alt || project.projectName}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-300" />
              )}

              {/* Dark Gradient Overlay from Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Title + Button Overlay – Bottom Center */}
            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 sm:pb-10 md:pb-12 lg:pb-16 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                {project.projectName}
              </h3>

              {project.slug?.current && (
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="inline-block bg-[#F2C94C] text-black font-semibold px-6 py-2 rounded-sm hover:bg-[#e0b53a] transition-colors text-base md:text-lg shadow-md"
                >
                  Read More
                </Link>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}