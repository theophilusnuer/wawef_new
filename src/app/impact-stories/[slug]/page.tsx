import { notFound } from "next/navigation";
import { getImpactStoryBySlug } from "@/sanity/lib/getImpactStoryBySlug";
import {
  getImpactStoriesList,
  type ImpactStoryListItem,
} from "@/sanity/lib/getImpactStoriesList";
import { getNewsList } from "@/sanity/lib/getNewsList";
import ImpactStoryDetailsClient from "./ImpactStoryDetailsClient";

interface ImpactStoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ImpactStoryPage({ params }: ImpactStoryPageProps) {
  const { slug } = await params;

  const story = await getImpactStoryBySlug(slug);
  if (!story) {
    notFound();
  }

  const [impactStories, newsStories] = await Promise.all([
    getImpactStoriesList(),
    getNewsList(),
  ]);

  const otherStories = impactStories
    .filter(
      (
        item,
      ): item is ImpactStoryListItem & { slug: { current: string } } =>
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

  const latestNews = newsStories
    .slice(0, 4)
    .map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      coverImage: item.coverImage,
    }));

  return (
    <ImpactStoryDetailsClient
      story={story}
      otherStories={otherStories}
      newsStories={latestNews}
    />
  );
}