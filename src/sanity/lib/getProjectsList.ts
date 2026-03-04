import { client } from './client';

export async function getProjectsList() {
  // GROQ query to fetch all projects with relevant fields
  const query = `*[_type == "project"]{
    _id,
    projectName,
    status,
    slug,
    coverImage,
    peopleImpacted,
    expectedPeopleImpacted
  } | order(_createdAt desc)`;
  return await client.fetch(query);
}
