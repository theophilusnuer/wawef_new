import { client } from './client';

export interface ProjectListItem {
  _id: string;
  _updatedAt?: string;
  projectName: string;
  status: 'upcoming' | 'completed';
  slug?: { current?: string };
  coverImage?: {
    asset?: { _ref?: string };
    alt?: string;
  };
  peopleImpacted?: number;
  expectedPeopleImpacted?: number;
  communitiesImpacted?: number;
  expectedCommunitiesImpacted?: number;
}

export async function getProjectsList() {
  // GROQ query to fetch all projects with relevant fields
  const query = `*[_type == "project"]{
    _id,
    _updatedAt,
    projectName,
    status,
    slug,
    coverImage,
    peopleImpacted,
    expectedPeopleImpacted,
    communitiesImpacted,
    expectedCommunitiesImpacted
  } | order(_createdAt desc)`;
  return await client.fetch<ProjectListItem[]>(query);
}
