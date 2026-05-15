import Image from 'next/image';
import Link from 'next/link';
import { getLatestNewsList } from '@/sanity/lib/getNewsList';
import { urlFor } from '@/sanity/lib/image';

export const NewsStories = async () => {
  const stories = await getLatestNewsList();
  const placeholderCount = Math.max(0, 3 - stories.length);

  return (
    <section className="py-12 ">
        <div className='py-12 bg-[#F8F8F6]'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-10 text-black">
          News Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {stories.map((story) => {
            const card = (
              <>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gray-300">
                  {story.coverImage?.asset?._ref ? (
                    <Image
                      src={urlFor(story.coverImage)
                        .width(900)
                        .height(1125)
                        .fit('crop')
                        .quality(88)
                        .url()}
                      alt={story.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : null}
                </div>

                <p className="mt-4 text-lg text-gray-800 leading-snug underline underline-offset-2">
                  {story.title}
                </p>
              </>
            );

            if (!story.slug?.current) {
              return (
                <article key={story._id} className="block">
                  {card}
                </article>
              );
            }

            return (
              <Link key={story._id} href={`/news-stories/${story.slug.current}`} className="block">
                {card}
              </Link>
            );
          })}

          {Array.from({ length: placeholderCount }).map((_, index) => (
            <div key={`placeholder-${index}`} className="aspect-[4/5] rounded-sm bg-gray-300" />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/news-stories"
            className="bg-[#F2C94C] text-black px-7 py-2.5 rounded-sm text-lg font-medium hover:opacity-90 transition-opacity"
          >
            See all stories
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
};
