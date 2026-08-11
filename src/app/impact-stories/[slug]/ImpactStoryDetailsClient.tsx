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
  asset?: { _ref?: string };
  alt?: string;
};

type StoryData = {
  _id: string;
  _createdAt?: string;
  title: string;
  coverImage?: StoryImage;
  youtubeLink?: string;
  body?: StoryBodyItem[];
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
            alt={value.alt || 'Story image'}
            width={1400}
            height={700}
            className="w-full h-auto max-h-[20rem] sm:max-h-[24rem] lg:max-h-[28rem] rounded-sm object-cover"
          />
        </div>
      );
    },
  },
};

const getYouTubeEmbedUrl = (youtubeLink?: string): string | null => {
  if (!youtubeLink) return null;

  const match = youtubeLink.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/,
  );

  if (!match?.[1]) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
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
  const youtubeEmbedUrl = getYouTubeEmbedUrl(story.youtubeLink);

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

          {youtubeEmbedUrl ? (
            <div className="mb-8 sm:mb-10 lg:mb-12 relative w-full aspect-video rounded-sm overflow-hidden bg-black">
              <iframe
                src={youtubeEmbedUrl}
                title={`${story.title} video`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            hasImageAsset(story.coverImage) && (
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
                  className="w-full h-auto max-h-[22rem] sm:max-h-[26rem] lg:max-h-[28rem]  object-cover"
                />
              </div>
            )
          )}

          <div>
            {story.body && story.body.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <PortableText value={story.body as any} components={portableTextComponents as any} />
            ) : (
              <p className="text-gray-600 text-base sm:text-lg leading-[1.65]">
                No impact story content available yet.
              </p>
            )}
          </div>

          {/* Other Impact Stories Grid – after main story */}
          {otherStories.length > 0 && (
            <section className="mt-16 sm:mt-20 lg:mt-24">
            <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-10 relative inline-block">
                        Other Impact Stories
                        <span className="absolute left-0 -bottom-3 w-28 h-1.5 bg-[#F2C94C]"></span>
                    </h2>
                </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {otherStories.map((item) => (
                  <Link
                    key={item._id}
                    href={`/impact-stories/${item.slug.current}`}
                className="group overflow-hidden transition-all duration-300 flex flex-col"
                  >
                    {hasImageAsset(item.coverImage) ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={urlFor(item.coverImage).width(600).height(450).fit('crop').url()}
                          alt={item.coverImage.alt || item.title}
                          fill
 className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />                        
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        No cover image
                      </div>
                    )}

                   <div className="py-4 text-left flex-grow flex ">
                  <h3 className="md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    <span className="inline-underline underline underline-offset-2 pb-1">
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
                      className="w-full h-36 xl:h-40 object-cover  mb-2"
                    />
                  ) : (
                    <div className="w-full h-36 xl:h-40 bg-gray-200  mb-2" />
                  )}
                  <p className="underline font-medium text-black leading-snug">{news.title}</p>
                </>
              );

              if (!href) {
                return (
                  <div key={news._id} className="block  p-2">
                    {card}
                  </div>
                );
              }

              return (
                <Link
                  key={news._id}
                  href={href}
                  className="block  p-2 transition-colors"
                >
                  {card}
                </Link>
              );
            })}

            <div className="pt-2 flex justify-center">
              <Link
                href="/news-stories"
                className="inline-flex items-center justify-center  bg-[#F2C94C] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
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