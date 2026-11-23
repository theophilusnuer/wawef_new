'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import SocialShareButtons from '@/app/components/SocialShareButtons'

type CareerImage = {
  asset?: { _ref?: string }
  alt?: string
}

type CareerBodyItem = {
  _type?: string
  children?: Array<{ _type?: string; text?: string }>
  asset?: { _ref?: string }
  alt?: string
}

type CareerData = {
  _id: string
  _createdAt?: string
  title: string
  coverImage?: CareerImage
  body?: CareerBodyItem[]
  downloadableFile?: {
    asset?: {
      url?: string
      originalFilename?: string
      mimeType?: string
    }
  }
}

type CareerCard = {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: CareerImage
}

interface CareerDetailsClientProps {
  career: CareerData
  otherCareers: CareerCard[]
}

const hasImageAsset = (
  image?: CareerImage,
): image is CareerImage & { asset: { _ref: string } } => Boolean(image?.asset?._ref)

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
      <blockquote className="border-l-4 border-[#F2C94C] pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({
      value,
      children,
    }: {
      value?: { href?: string }
      children: React.ReactNode
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-[#8A6D1A] hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc ml-6 mb-5 space-y-1 text-gray-700 text-base sm:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal ml-6 mb-5 space-y-1 text-gray-700 text-base sm:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="leading-[1.65]">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="leading-[1.65]">{children}</li>
    ),
  },
  types: {
    image: ({ value }: { value: CareerImage }) => {
      if (!hasImageAsset(value)) return null

      return (
        <div className="my-10 sm:my-12 lg:my-16">
          <Image
            src={urlFor(value).width(1400).fit('max').quality(88).url()}
            alt={value.alt || 'Career opportunity image'}
            width={1400}
            height={700}
            className="w-full h-auto max-h-[22rem] rounded-sm object-cover"
          />
        </div>
      )
    },
  },
}

const formatCareerDate = (isoDate?: string): string => {
  if (!isoDate) return 'Date unavailable'

  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const CareerDetailsClient: React.FC<CareerDetailsClientProps> = ({
  career,
  otherCareers,
}) => {
  const file = career.downloadableFile?.asset
  const fileName = file?.originalFilename || `${career.title}.pdf`
  const fileUrl = file?.url ? `${file.url}?dl=${encodeURIComponent(fileName)}` : null

  return (
    <div className="my-[2rem] px-6 md:px-10 lg:px-20 2xl:px-64">
      <div className="grid grid-cols-1 lg:[grid-template-columns:minmax(0,3.7fr)_minmax(15rem,0.9fr)] gap-6 md:gap-8 lg:gap-10">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-gray-900">
            {career.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Posted {formatCareerDate(career._createdAt)}
          </p>

          <SocialShareButtons title={career.title} className="mb-6 sm:mb-8" />

          {hasImageAsset(career.coverImage) && (
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <Image
                src={urlFor(career.coverImage).width(1400).fit('max').quality(88).url()}
                alt={career.coverImage.alt || career.title}
                width={1400}
                height={650}
                className="w-full h-auto max-h-[22rem] sm:max-h-[26rem] lg:max-h-[28rem] rounded-sm object-cover"
              />
            </div>
          )}

          <div>
            {career.body && career.body.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <PortableText value={career.body as any} components={portableTextComponents as any} />
            ) : (
              <p className="text-gray-600 text-base sm:text-lg leading-[1.65]">
                Job details are not available yet.
              </p>
            )}
          </div>

          {otherCareers.length > 0 && (
            <section className="mt-16 sm:mt-20 lg:mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
                Other Opportunities
              </h2>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {otherCareers.map((item) => (
                  <Link
                    key={item._id}
                    href={`/careers/${item.slug.current}`}
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
                      <h3 className="md:text-xl font-semibold text-gray-900 group-hover:text-[#8A6D1A] transition-colors">
                        <span className="inline underline underline-offset-2 pb-1">{item.title}</span>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="self-start lg:sticky lg:top-28 rounded-sm border border-gray-200 bg-[#f5efe6] p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">Job Document</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Download the complete opportunity document for the full role details and application guidance.
          </p>

          {fileUrl ? (
            <a
              href={fileUrl}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#F2C94C] px-4 py-3 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Download file
            </a>
          ) : (
            <p className="mt-5 text-sm font-medium text-gray-500">The job document is currently unavailable.</p>
          )}
        </aside>
      </div>
    </div>
  )
}

export default CareerDetailsClient
