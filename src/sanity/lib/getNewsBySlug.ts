import { client } from './client';

export async function getNewsBySlug(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    coverImage,
    body,
    gallery
  }`;
  return await client.fetch(query, { slug });
}
