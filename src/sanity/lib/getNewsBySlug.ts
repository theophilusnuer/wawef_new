import { sanityFetch } from './live';

export async function getNewsBySlug(slug: string) {
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

  return data;
}
