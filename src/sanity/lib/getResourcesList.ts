import { sanityFetch } from "./live";

export interface ResourceListItem {
  _id: string;
  _createdAt?: string;
  title: string;
  summary?: string;
  slug?: { current?: string };
  coverImage?: {
    asset?: { _ref?: string };
  };
  file?: {
    asset?: {
      url?: string;
      originalFilename?: string;
      mimeType?: string;
    };
  };
  externalLink?: string;
}

const resourcesListQuery = `*[_type == "resource"] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  summary,
  slug,
  coverImage,
  file {
    asset -> {
      url,
      originalFilename,
      mimeType
    }
  },
  externalLink
}`;

export async function getResourcesList(): Promise<ResourceListItem[]> {
  const { data } = await sanityFetch({
    query: resourcesListQuery,
    tags: ['resource'],
  });

  return data as ResourceListItem[];
}
