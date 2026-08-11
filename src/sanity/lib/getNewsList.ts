import { sanityFetch } from "./live";

export interface NewsListItem {
  _id: string;
  _createdAt?: string;
  title: string;
  slug?: { current?: string };
  coverImage?: {
    asset?: { _ref?: string };
  };
}

const newsListQuery = `*[_type == "news"] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  coverImage
}`;

const latestThreeNewsQuery = `*[_type == "news"] | order(_createdAt desc)[0...3] {
  _id,
  _createdAt,
  title,
  slug,
  coverImage
}`;

export async function getNewsList(): Promise<NewsListItem[]> {
  const { data } = await sanityFetch({
    query: newsListQuery,
    tags: ['news'],
  });

  return data as NewsListItem[];
}

export async function getLatestNewsList(): Promise<NewsListItem[]> {
  const { data } = await sanityFetch({
    query: latestThreeNewsQuery,
    tags: ['news'],
  });

  return data as NewsListItem[];
}
