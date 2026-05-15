import { sanityFetch } from './live';

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
  // Fetch program documents while keeping the existing project-shaped payload.
  const query = `*[_type == "program"]{
    _id,
    _updatedAt,
    "projectName": title,
    "status": "completed",
    slug,
    "coverImage": null,
    "peopleImpacted": null,
    "expectedPeopleImpacted": null,
    "communitiesImpacted": null,
    "expectedCommunitiesImpacted": null
  } | order(_createdAt desc)`;
  const { data } = await sanityFetch({
    query,
    tags: ['project'],
  });

  return data as ProjectListItem[];
}
