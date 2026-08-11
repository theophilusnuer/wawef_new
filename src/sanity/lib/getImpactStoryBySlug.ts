import { sanityFetch } from './live';

 interface ImpactStoryImage {
  asset?: { _ref?: string };
  alt?: string;
}

interface ImpactStoryBodyItem {
  _type?: string;
  children?: Array<{ _type?: string; text?: string }>;
  asset?: { _ref?: string };
  alt?: string;
}

export interface ImpactStoryBySlugResult {
  _id: string;
  _createdAt?: string;
  title: string;
  coverImage?: ImpactStoryImage;
  youtubeLink?: string;
  body?: ImpactStoryBodyItem[];
}

export async function getImpactStoryBySlug(
  slug: string,
): Promise<ImpactStoryBySlugResult | null> {
  const query = `*[_type == "impactStory" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    coverImage,
    youtubeLink,
    body
  }`;
  const { data } = await sanityFetch({
    query,
    params: { slug },
    tags: ['impactStory'],
  });

  return data as ImpactStoryBySlugResult | null;
}
