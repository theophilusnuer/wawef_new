import { notFound } from 'next/navigation';
import { getNewsBySlug } from '@/sanity/lib/getNewsBySlug';
import NewsDetailsClient from './NewsDetailsClient';

interface NewsPageProps {
  params: { slug: string };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = params;
  const news = await getNewsBySlug(slug);
  if (!news) {
    notFound();
    return null;
  }
  return <NewsDetailsClient news={news} />;
}
