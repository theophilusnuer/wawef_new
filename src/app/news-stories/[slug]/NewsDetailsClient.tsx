'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import SocialShareButtons from '@/app/components/SocialShareButtons';

type StoryImage = {
  asset?: { _ref?: string };
  alt?: string;
};

type StoryBodyItem = {
  _type?: string;
  children?: Array<{ _type?: string; text?: string }>;
};

type NewsData = {
  _id: string;
  _createdAt?: string;
  title: string;
  coverImage?: StoryImage;
  body?: StoryBodyItem[];
  gallery?: StoryImage[];
};

type NewsCard = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: StoryImage;
};

type ImpactStoryCard = {
  _id: string;
  title: string;
  slug?: { current?: string };
  coverImage?: StoryImage;
};

interface NewsDetailsClientProps {
  news: NewsData;
  otherNewsStories: NewsCard[];
  impactStories: ImpactStoryCard[];
}

const hasImageAsset = (image?: StoryImage): image is StoryImage & { asset: { _ref: string } } =>
  Boolean(image?.asset?._ref);

const portableTextComponents = {
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-gray-700 text-base sm:text-lg leading-[1.65] mb-2">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#F2C94C] pl-4 italic text-gray-600 my-6">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline text-[#8A6D1A] hover:opacity-80">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc ml-6 mb-5 space-y-1 text-gray-700 text-base sm:text-lg">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal ml-6 mb-5 space-y-1 text-gray-700 text-base sm:text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="leading-[1.65]">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="leading-[1.65]">{children}</li>,
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-10 sm:my-12 lg:my-16">
          <Image
            src={urlFor(value).width(1400).fit('max').quality(88).url()}
            alt={value.alt || 'News story image'}
            width={1400}
            height={700}
            className="w-full h-auto max-h-[16rem] sm:max-h-[18rem] lg:max-h-[22rem] rounded-sm object-cover"
          />
        </div>
      );
    },
  },
};

const formatStoryDate = (isoDate?: string): string => {
  if (!isoDate) return 'Date unavailable';

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const NewsDetailsClient: React.FC<NewsDetailsClientProps> = ({
  news,
  otherNewsStories,
  impactStories,
}) => {
  const galleryImages = Array.isArray(news.gallery) ? news.gallery.filter(hasImageAsset) : [];

  return (
    <div className="my-[2rem] px-6 md:px-10 lg:px-20 2xl:px-64">
      <div className="grid grid-cols-1 lg:[grid-template-columns:minmax(0,3.7fr)_minmax(15rem,0.9fr)] gap-6 md:gap-8 lg:gap-10">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">
            {news.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {formatStoryDate(news._createdAt)}
          </p>

          <SocialShareButtons title={news.title} className="mb-6 sm:mb-8" />

          {hasImageAsset(news.coverImage) && (
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <Image
                src={urlFor(news.coverImage).width(1400).fit('max').quality(88).url()}
                alt={news.coverImage.alt || news.title}
                width={1400}
                height={650}
                className="w-full h-auto max-h-[22rem] sm:max-h-[26rem] lg:max-h-[28rem] rounded-sm object-cover"
              />
            </div>
          )}

          <div>
            {news.body && news.body.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <PortableText value={news.body as any} components={portableTextComponents as any} />
            ) : (
              <p className="text-gray-600 text-base sm:text-lg leading-[1.65]">
                No news content available yet.
              </p>
            )}

            {galleryImages.length > 0 && (
              <div className="mt-10 sm:mt-12 space-y-8 sm:space-y-10">
                {galleryImages.map((img, index) => (
                  <div key={`gallery-${index}`}>
                    <Image
                      src={urlFor(img).width(1400).fit('max').quality(88).url()}
                      alt={img.alt || 'News story image'}
                      width={1400}
                      height={700}
                      className="w-full h-auto max-h-[16rem] sm:max-h-[18rem] lg:max-h-[22rem] rounded-sm object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {otherNewsStories.length > 0 && (
            <section className="mt-16 sm:mt-20 lg:mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
                Other News Stories
              </h2>

              <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {otherNewsStories.map((item) => (
                  <Link
                    key={item._id}
                    href={`/news-stories/${item.slug.current}`}
                    className="group block rounded-sm overflow-hidden"
                  >
                    {hasImageAsset(item.coverImage) ? (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={urlFor(item.coverImage).width(600).height(450).fit('crop').url()}
                          alt={item.coverImage.alt || item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        No cover image
                      </div>
                    )}

                    <div className="p-5 text-center">
                      <h3 className="md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    <span className="inline- underline underline-offset-2 pb-1">
                          {item.title}
                        </span>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {impactStories.length > 0 && (
          <aside className="hidden lg:block space-y-5">
            <h2 className="text-lg font-bold text-black">Latest Impact Stories</h2>

            {impactStories.map((story) => {
              const href = story.slug?.current
                ? `/impact-stories/${story.slug.current}`
                : null;

              const card = (
                <>
                  {hasImageAsset(story.coverImage) ? (
                    <Image
                      src={urlFor(story.coverImage).width(500).height(360).fit('crop').url()}
                      alt={story.coverImage.alt || story.title}
                      width={500}
                      height={360}
                      className="w-full h-36 xl:h-40 object-cover rounded-sm mb-2"
                    />
                  ) : (
                    <div className="w-full h-36 xl:h-40 bg-gray-200 rounded-sm mb-2" />
                  )}
                  <p className="underline font-medium text-black leading-snug">{story.title}</p>
                </>
              );

              if (!href) {
                return (
                  <div key={story._id} className="block rounded-sm p-2">
                    {card}
                  </div>
                );
              }

              return (
                <Link
                  key={story._id}
                  href={href}
                  className="block rounded-sm p-2 transition-colors"
                >
                  {card}
                </Link>
              );
            })}

            <div className="pt-2 flex justify-center">
              <Link
                href="/impact-stories"
                className="inline-flex items-center justify-center rounded-sm bg-[#F2C94C] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
              >
                See more
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default NewsDetailsClient;
