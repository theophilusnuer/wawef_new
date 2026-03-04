'use client';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { FullProject } from '@/sanity/lib/getProjectBySlug';

interface ProjectGalleryProps {
  project: FullProject;
}



export default function ProjectGallery({ project }: ProjectGalleryProps) {
  if (project.status !== 'completed') return null;

  const galleryImages = (project.impactGallery || []).slice(0, 3);
  const moreImagesLink = project.moreImagesLink;
  if (galleryImages.length === 0) return null;

  const images = [
    {
      src: urlFor(galleryImages[0].image).width(600).height(450).fit('crop').url(),
      alt: galleryImages[0].image.alt || 'Impact image 1',
      height: "h-[40vh] md:h-[61.76vh]", // Height settings for responsive design
    },
    {
      src: urlFor(galleryImages[1].image).width(300).height(350).fit('crop').url(),
      alt: galleryImages[1].image.alt || 'Impact image 2',
      height: "h-[40vh] md:h-[30vh]",
    },
    {
      src: urlFor(galleryImages[2].image).width(300).height(350).fit('crop').url(),
      alt: galleryImages[2].image.alt || 'Impact image 3',
      height: "h-[40vh] md:h-[30vh]",
    },
  ];

  return (
    <section className="py-4 md:py-10 px-4 md:px-10 max-w-4xl mx-auto bg-[#FCFCF4]">
      {/* Heading */}
      <div className="flex justify-center items-center">
        <h2 className="inline-block text-lg md:text-2xl px-10 md:px-14 py-2 md:py-3 bg-[#FAEBE7] rounded-md mb-8">
          Gallery of Impact
        </h2>
      </div>

      {/* Flexbox Layout for Images */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Large Image on the left */}
        <div className={`relative w-full md:w-2/3 ${images[0].height}`}>
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill={true}
            className="object-cover rounded-sm"
          />
        </div>

        {/* Vertical Images on the right */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          {images.slice(1).map((image, index) => (
            <div key={index} className={`relative w-full ${image.height}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill={true}
                className="object-cover rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* See More Button */}
      {moreImagesLink && (
        <div className="flex justify-center mt-8">
          <Link href={moreImagesLink} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#F2C94C] text-black py-2 px-6 rounded-sm hover:scale-102 transition-all duration-200 text-sm md:text-base cursor-pointer">
              View gallery
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}