import { sanityFetch } from "./live";

export interface ProgramListItem {
  _id: string;
  _updatedAt?: string;
  programTitle: string;
  slug?: { current?: string };
}

export async function getProgramsList() {
  const query = `*[_type == "program"]{
    _id,
    _updatedAt,
    "programTitle": title,
    slug
  } | order(_createdAt desc)`;

  const { data } = await sanityFetch({
    query,
    tags: ["program"],
  });

  return data as ProgramListItem[];
}
