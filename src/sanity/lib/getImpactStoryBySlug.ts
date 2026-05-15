import { sanityFetch } from './live';

export async function getImpactStoryBySlug(slug: string) {
  const query = `*[_type == "impactStory" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    coverImage,
    youtubeLink,
    storySections,
    body,
    gallery
  }`;
  const { data } = await sanityFetch({
    query,
    params: { slug },
    tags: ['impactStory'],
  });

  return data;
}
