import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCareerBySlug } from '@/sanity/lib/getCareerBySlug'
import { getCareersList, type CareerListItem } from '@/sanity/lib/getCareersList'
import CareerDetailsClient from './CareerDetailsClient'

interface CareerPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CareerPageProps): Promise<Metadata> {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    return { title: 'Career Opportunity' }
  }

  return {
    title: career.title,
    description: `View the ${career.title} career opportunity at WAWEF and download the full job document.`,
  }
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    notFound()
  }

  const careers = await getCareersList()
  const otherCareers = careers
    .filter(
      (item): item is CareerListItem & { slug: { current: string } } =>
        Boolean(item.slug?.current),
    )
    .filter((item) => item.slug.current !== slug)
    .slice(0, 3)

  return <CareerDetailsClient career={career} otherCareers={otherCareers} />
}
