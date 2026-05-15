import { groq } from "next-sanity";
import { sanityFetch } from "./live";

export const fullProgramQuery = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,

    "programName": title,
    slug,
    "status": "completed",

    "expectedPeopleImpacted": null,
    "expectedCommunitiesImpacted": null,
    "peopleImpacted": null,
    "communitiesImpacted": null,

    "lastUpdated": _updatedAt,
    "coverImage": gallery[0].image {
      asset -> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      hotspot,
      crop
    },

    "donateLink": null,
    "about": null,
    "problem": null,
    "solution": null,
    "objectivesApproach": null,

    location,
    youtubeLink,
    "completedProblem": null,
    "completedSolution": null,
    "completedObjectivesApproach": null,
    "overview": details,

    "projectReport": null,
    "partners": [],

    "impactGallery": gallery[] {
      image {
        asset -> {
          _id,
          url,
          metadata { dimensions, lqip }
        },
        alt,
        hotspot,
        crop
      }
    },

    "moreImagesLink": null,
    "sponsors": []
  }
`;

export interface FullProgram {
  _id: string;
  programName: string;
  slug: { current: string };
  status: "upcoming" | "completed";

  expectedPeopleImpacted?: number;
  expectedCommunitiesImpacted?: number;
  peopleImpacted?: number;
  communitiesImpacted?: number;

  lastUpdated?: string;

  coverImage?: {
    asset?: { url: string; metadata?: { dimensions?: unknown; lqip?: string } };
    alt?: string;
    hotspot?: unknown;
    crop?: unknown;
  };

  donateLink?: string;
  about?: string;
  problem?: string;
  solution?: string;
  objectivesApproach?: {
    objectives?: string[];
    approachType?: "text" | "list";
    approachText?: string;
    approachList?: string[];
  };

  location?: string;
  youtubeLink?: string;
  completedProblem?: string;
  completedSolution?: string;
  completedObjectivesApproach?: {
    objectives?: string[];
    approachType?: "text" | "list";
    approachText?: string;
    approachList?: string[];
  };
  overview?: string;

  projectReport?: {
    asset?: {
      url: string;
      originalFilename?: string;
      size?: number;
      mimeType?: string;
    };
  };

  partners?: Array<{
    name: string;
    logo?: { asset?: { url: string }; alt?: string };
    website?: string;
  }>;

  impactGallery?: Array<{
    image: {
      asset: {
        url: string;
        metadata?: { dimensions?: unknown; lqip?: string };
      };
      alt?: string;
      hotspot?: unknown;
      crop?: unknown;
    };
  }>;

  moreImagesLink?: string;
  sponsors?: Array<{
    name?: string;
    image?: {
      asset?: {
        url: string;
        metadata?: { dimensions?: unknown; lqip?: string };
      };
      alt?: string;
      hotspot?: unknown;
      crop?: unknown;
    };
  }>;
}

export async function getProgramBySlug(slug: string): Promise<FullProgram | null> {
  if (!slug?.trim()) {
    console.warn("No valid slug provided to getProgramBySlug");
    return null;
  }

  try {
    const { data } = await sanityFetch({
      query: fullProgramQuery,
      params: { slug },
      tags: ["program"],
    });

    const program = data as FullProgram | null;

    if (!program) {
      console.log(`No program found for slug: ${slug}`);
    }

    return program || null;
  } catch (err) {
    console.error(`Sanity fetch error for slug "${slug}":`, err);
    return null;
  }
}
