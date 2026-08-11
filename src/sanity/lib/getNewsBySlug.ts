import { sanityFetch } from './live';

interface NewsImage {
  asset?: { _ref?: string };
  alt?: string;
}

interface NewsBodyItem {
  _type?: string;
  children?: Array<{ _type?: string; text?: string }>;
}

export interface NewsBySlugResult {
  _id: string;
  _createdAt?: string;
  title: string;
  coverImage?: NewsImage;
  body?: NewsBodyItem[];
  gallery?: NewsImage[];
}

export async function getNewsBySlug(slug: string): Promise<NewsBySlugResult | null> {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    coverImage,
    body,
    gallery
  }`;
  const { data } = await sanityFetch({
    query,
    params: { slug },
    tags: ['news'],
  });

  return data as NewsBySlugResult | null;
}
