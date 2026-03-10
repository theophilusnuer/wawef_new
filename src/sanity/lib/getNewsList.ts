import { client } from "./client";

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
  return await client.fetch<NewsListItem[]>(newsListQuery);
}

export async function getLatestNewsList(): Promise<NewsListItem[]> {
  return await client.fetch<NewsListItem[]>(latestThreeNewsQuery);
}
