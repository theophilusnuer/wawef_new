import { client } from './client';

export async function getImpactStoryBySlug(slug: string) {
  const query = `*[_type == "impactStory" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    coverImage,
    body,
    gallery
  }`;
  return await client.fetch(query, { slug });
}
