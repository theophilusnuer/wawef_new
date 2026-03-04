import { notFound } from 'next/navigation';
import { getImpactStoryBySlug } from '@/sanity/lib/getImpactStoryBySlug';
import ImpactStoryDetailsClient from './ImpactStoryDetailsClient';

interface ImpactStoryPageProps {
  params: { slug: string };
}

export default async function ImpactStoryPage({ params }: ImpactStoryPageProps) {
  const { slug } = params;
  const story = await getImpactStoryBySlug(slug);
  if (!story) {
    notFound();
    return null;
  }
  return <ImpactStoryDetailsClient story={story} />;
}
