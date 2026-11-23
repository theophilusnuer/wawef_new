import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getCareersList, type CareerListItem } from '@/sanity/lib/getCareersList'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore current career opportunities at the West Africa Women Empowerment Foundation.',
}

export default async function CareersPage() {
  const careers = await getCareersList()
  const validCareers = careers.filter(
    (career): career is CareerListItem & { slug: { current: string } } =>
      Boolean(career.slug?.current),
  )

  return (
    <>
      <section className="w-full h-[20vh] sm:h-[26vh] lg:h-[34vh] bg-[#f5efe6] flex items-end">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
          <h1 className="text-3xl sm:text-5xl text-gray-900 font-bold tracking-tight">
            Careers
          </h1>
          <p className="text-gray-700 text-sm sm:text-lg italic mt-2">
            Join us in empowering women and transforming futures.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 pt-10 sm:pt-12">
        <p className="text-left pb-6 text-2xl sm:text-4xl">Current Opportunities</p>

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {validCareers.map((career) => (
            <Link
              key={career._id}
              href={`/careers/${career.slug.current}`}
              className="group rounded-sm overflow-hidden transition-all duration-300 flex flex-col"
            >
              {career.coverImage?.asset?._ref ? (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(career.coverImage)
                      .width(800)
                      .height(600)
                      .fit('crop')
                      .quality(85)
                      .url()}
                    alt={career.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No cover image
                </div>
              )}

              <div className="p-5 md:p-6 text-center flex-grow flex flex-col items-center justify-center">
                <h2 className="md:text-xl font-semibold text-gray-900 group-hover:text-[#8A6D1A] transition-colors">
                  <span className="inline underline underline-offset-2 pb-1">
                    {career.title}
                  </span>
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {validCareers.length === 0 && (
          <p className="text-center text-gray-500 py-12 text-lg">
            No career opportunities are available at the moment. Please check back soon.
          </p>
        )}
      </section>
    </>
  )
}
