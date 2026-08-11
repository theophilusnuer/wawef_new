import { sanityFetch } from "./live";

export interface ImpactStoryListItem {
  _id: string;
  _createdAt?: string;
  title: string;
  slug?: { current?: string };
  coverImage?: {
    asset?: { _ref?: string };
  };
}

const impactStoriesListQuery = `*[_type == "impactStory"] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  coverImage
}`;

export async function getImpactStoriesList(): Promise<ImpactStoryListItem[]> {
  const { data } = await sanityFetch({
    query: impactStoriesListQuery,
    tags: ['impactStory'],
  });

  return data as ImpactStoryListItem[];
}
