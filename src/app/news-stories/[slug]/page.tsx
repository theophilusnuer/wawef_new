import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/sanity/lib/getNewsBySlug";
import { getNewsList, type NewsListItem } from "@/sanity/lib/getNewsList";
import {
  getImpactStoriesList,
  type ImpactStoryListItem,
} from "@/sanity/lib/getImpactStoriesList";
import NewsDetailsClient from "./NewsDetailsClient";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);
  if (!news) {
    notFound();
  }

  const [newsStories, impactStories] = await Promise.all([
    getNewsList(),
    getImpactStoriesList(),
  ]);

  const otherNewsStories = newsStories
    .filter(
      (
        item,
      ): item is NewsListItem & { slug: { current: string } } =>
        Boolean(item.slug?.current),
    )
    .filter((item) => item.slug.current !== slug)
    .slice(0, 3)
    .map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      coverImage: item.coverImage,
    }));

  const latestImpactStories = impactStories
    .slice(0, 4)
    .map((item: ImpactStoryListItem) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      coverImage: item.coverImage,
    }));

  return (
    <NewsDetailsClient
      news={news}
      otherNewsStories={otherNewsStories}
      impactStories={latestImpactStories}
    />
  );
}
