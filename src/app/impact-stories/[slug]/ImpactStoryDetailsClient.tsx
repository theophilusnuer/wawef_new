'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import SocialShareButtons from '@/app/components/SocialShareButtons';

type StoryImage = {
  asset?: { _ref?: string };
  alt?: string;
};

type StoryBodyItem = {
  _type?: string;
  children?: Array<{ _type?: string; text?: string }>;
  asset?: { _ref?: string };
  alt?: string;
};

type StoryData = {
  _id: string;
  _createdAt?: string;
  title: string;
  coverImage?: StoryImage;
  body?: StoryBodyItem[];
  gallery?: StoryImage[];
};

type StoryCard = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: StoryImage;
};

type NewsCard = {
  _id: string;
  title: string;
  slug?: { current?: string };
  coverImage?: StoryImage;
};

interface ImpactStoryDetailsClientProps {
  story: StoryData;
  otherStories: StoryCard[];
  newsStories: NewsCard[];
}

const hasImageAsset = (image?: StoryImage): image is StoryImage & { asset: { _ref: string } } =>
  Boolean(image?.asset?._ref);

const buildParagraphs = (body?: StoryBodyItem[]): string[] => {
  if (!Array.isArray(body)) return [];

  return body
    .filter((item) => item._type === 'block' && Array.isArray(item.children))
    .map((item) =>
      (item.children || [])
        .map((child) => child.text || '')
        .join('')
        .trim(),
    )
    .flatMap((text) =>
      text
        .split(/\r?\n+/)
        .map((part) => part.trim())
        .filter((part) => part.length > 0),
    );
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

const ImpactStoryDetailsClient: React.FC<ImpactStoryDetailsClientProps> = ({
  story,
  otherStories,
  newsStories,
}) => {
  const paragraphs = buildParagraphs(story.body);
  const galleryImages = Array.isArray(story.gallery) ? story.gallery.filter(hasImageAsset) : [];
  const maxImagesToInsert = Math.min(galleryImages.length, Math.floor(paragraphs.length / 3));

  const storyContent = paragraphs.reduce<React.ReactNode[]>((acc, paragraph, index) => {
    acc.push(
      <p
        key={`p-${index}`}
        className="text-gray-700 text-base sm:text-lg leading-[1.65] mb-5 sm:mb-7 lg:mb-9 whitespace-pre-line"
      >
        {paragraph}
      </p>,
    );

    if ((index + 1) % 3 === 0) {
      const imageInsertIndex = Math.floor((index + 1) / 3) - 1;

      if (imageInsertIndex < maxImagesToInsert) {
        const img = galleryImages[imageInsertIndex];
        acc.push(
          <div key={`img-${index}`} className="my-10 sm:my-12 lg:my-16">
            <Image
              src={urlFor(img).width(1400).fit('max').quality(88).url()}
              alt={img.alt || 'Impact story image'}
              width={1400}
              height={700}
              className="w-full h-auto max-h-[16rem] sm:max-h-[18rem] lg:max-h-[22rem] rounded-sm object-fit-cover"
            />
          </div>,
        );
      }
    }

    return acc;
  }, []);

  return (
    <div className="my-[2rem] px-6 md:px-10 lg:px-20 2xl:px-64">
      <div className="grid grid-cols-1 lg:[grid-template-columns:minmax(0,3.7fr)_minmax(15rem,0.9fr)] gap-6 md:gap-8 lg:gap-10">
        {/* Left: Main Story Content (dominant column on large screens) */}
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">
            {story.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {formatStoryDate(story._createdAt)}
          </p>

          <SocialShareButtons title={story.title} className="mb-6 sm:mb-8" />

          {hasImageAsset(story.coverImage) && (
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <Image
                src={urlFor(story.coverImage)
                  .width(1400)
                  .fit('max')
                  .quality(88)
                  .url()}
                alt={story.coverImage.alt || story.title}
                width={1400}
                height={650}
                className="w-full h-auto max-h-[22rem] sm:max-h-[26rem] lg:max-h-[28rem] rounded-sm object-cover"
              />
            </div>
          )}

          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {storyContent.length > 0 ? (
              storyContent
            ) : (
              <p className="text-gray-600 text-base sm:text-lg leading-[1.65]">
                No impact story content available yet.
              </p>
            )}
          </div>

          {/* Other Impact Stories Grid – after main story */}
          {otherStories.length > 0 && (
            <section className="mt-16 sm:mt-20 lg:mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
                Other Impact Stories
              </h2>

              <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {otherStories.map((item) => (
                  <Link
                    key={item._id}
                    href={`/impact-stories/${item.slug.current}`}
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

        {/* Right Sidebar – Latest News (hidden on small screens) */}
        {newsStories.length > 0 && (
          <aside className="hidden lg:block space-y-5">
            <h2 className="text-lg font-bold text-black">Latest News</h2>

            {newsStories.map((news) => {
              const href = news.slug?.current
                ? `/news-stories/${news.slug.current}`
                : null;

              const card = (
                <>
                  {hasImageAsset(news.coverImage) ? (
                    <Image
                      src={urlFor(news.coverImage).width(500).height(360).fit('crop').url()}
                      alt={news.coverImage.alt || news.title}
                      width={500}
                      height={360}
                      className="w-full h-36 xl:h-40 object-cover rounded-sm mb-2"
                    />
                  ) : (
                    <div className="w-full h-36 xl:h-40 bg-gray-200 rounded-sm mb-2" />
                  )}
                  <p className="underline font-medium text-black leading-snug">{news.title}</p>
                </>
              );

              if (!href) {
                return (
                  <div key={news._id} className="block rounded-sm p-2">
                    {card}
                  </div>
                );
              }

              return (
                <Link
                  key={news._id}
                  href={href}
                  className="block rounded-sm p-2 transition-colors"
                >
                  {card}
                </Link>
              );
            })}

            <div className="pt-2 flex justify-center">
              <Link
                href="/news-stories"
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

export default ImpactStoryDetailsClient;