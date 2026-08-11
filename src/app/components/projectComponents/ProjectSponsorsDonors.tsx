import Image from 'next/image';
import type { FullProject } from '@/sanity/lib/getProjectBySlug';
import { urlFor } from '@/sanity/lib/image';

interface ProjectSponsorsDonorsProps {
  project: FullProject;
}

export default function ProjectSponsorsDonors({ project }: ProjectSponsorsDonorsProps) {
  const sponsorEntries = (project.sponsors || []).filter(
    (entry) => Boolean(entry?.name?.trim()) || Boolean(entry?.image?.asset?.url),
  );
  const useCarousel = sponsorEntries.length > 4;

  const renderSponsorCard = (
    entry: NonNullable<FullProject['sponsors']>[number],
    index: number,
    isCarousel: boolean,
  ) => {
    const displayName = entry.name?.trim() || 'Unnamed Sponsor/Donor';
    const carouselCardWidth = isCarousel
      ? 'snap-start shrink-0 w-[15rem] sm:w-[17rem] lg:w-[18rem]'
      : '';

    if (!entry.image?.asset?.url) {
      return (
        <div
          key={`sponsor-${index}`}
          className={`${carouselCardWidth} min-h-[9rem] rounded-sm bg-gray-100 border border-gray-200 px-4 py-6 flex items-center justify-center`}
        >
          <p className="text-center text-base sm:text-lg font-medium text-gray-800">
            {displayName}
          </p>
        </div>
      );
    }

    return (
      <div
        key={`sponsor-${index}`}
        className={`${carouselCardWidth} rounded-sm border border-gray-200 p-4 sm:p-5`}
      >
        <div className="relative w-full h-36 sm:h-40 rounded-sm overflow-hidden">
          <Image
            src={urlFor(entry.image).width(480).height(320).fit('max').quality(88).url()}
            alt={entry.image.alt || displayName}
            fill
            className="object-contain"
          />
        </div>

        <p className="mt-3 text-center text-base sm:text-lg font-medium text-gray-900">
          {displayName}
        </p>
      </div>
    );
  };

  if (sponsorEntries.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 md:mb-10">
          Sponsors and Donors
        </h2>

        {useCarousel ? (
          <div>
            <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 sm:gap-6 pb-2">
              {sponsorEntries.map((entry, index) => renderSponsorCard(entry, index, true))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sponsorEntries.map((entry, index) => renderSponsorCard(entry, index, false))}
          </div>
        )}
      </div>
    </section>
  );
}
