import { groq } from 'next-sanity';
import { client } from './client';

// ────────────────────────────────────────────────
// Full single project query – all fields from schema
// ────────────────────────────────────────────────
export const fullProjectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    
    projectName,
    slug,
    status,
    
    // Impact numbers (both upcoming & completed)
    expectedPeopleImpacted,
    expectedCommunitiesImpacted,
    peopleImpacted,
    communitiesImpacted,
    
    lastUpdated,
    
    // Hero image – full asset info for optimized rendering
    coverImage {
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
    
    // Upcoming fields
    donateLink,
    about,
    problem,
    solution,
    objectivesApproach {
      objectives,
      approachType,
      approachText,
      approachList
    },
    
    // Completed fields
    location,
    youtubeLink,
    completedProblem,
    completedSolution,
    completedObjectivesApproach {
      objectives,
      approachType,
      approachText,
      approachList
    },
    overview,
    
    // File (PDF report)
    projectReport {
      asset -> {
        _id,
        url,
        originalFilename,
        size,
        mimeType
      }
    },
    
    // Arrays
    partners[] {
      name,
      logo {
        asset -> {
          _id,
          url,
          metadata { dimensions, lqip }
        },
        alt,
        hotspot,
        crop
      },
      website
    },
    
    impactGallery[] {
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
    
    moreImagesLink,
    sponsors[] {
      name,
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
    }
  }
`;

// ────────────────────────────────────────────────
// TypeScript interface – match the GROQ shape exactly
// ────────────────────────────────────────────────
export interface FullProject {
  _id: string;
  projectName: string;
  slug: { current: string };
  status: 'upcoming' | 'completed';

  expectedPeopleImpacted?: number;
  expectedCommunitiesImpacted?: number;
  peopleImpacted?: number;
  communitiesImpacted?: number;

  lastUpdated?: string;

  coverImage?: {
    asset?: { url: string; metadata?: { dimensions?: any; lqip?: string } };
    alt?: string;
    hotspot?: any;
    crop?: any;
  };

  donateLink?: string;
  about?: string;
  problem?: string;
  solution?: string;
  objectivesApproach?: {
    objectives?: string[];
    approachType?: 'text' | 'list';
    approachText?: string;
    approachList?: string[];
  };

  location?: string;
  youtubeLink?: string;
  completedProblem?: string;
  completedSolution?: string;
  completedObjectivesApproach?: {
    objectives?: string[];
    approachType?: 'text' | 'list';
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
      metadata?: { dimensions?: any; lqip?: string };
    };
    alt?: string;
    hotspot?: any;
    crop?: any;
  };
}>;

  moreImagesLink?: string;
  sponsors?: Array<{
    name?: string;
    image?: {
      asset?: {
        url: string;
        metadata?: { dimensions?: any; lqip?: string };
      };
      alt?: string;
      hotspot?: any;
      crop?: any;
    };
  }>;
}

// ────────────────────────────────────────────────
// Reusable fetch function
// ────────────────────────────────────────────────
export async function getProjectBySlug(slug: string): Promise<FullProject | null> {
  if (!slug?.trim()) {
    console.warn("No valid slug provided to getProjectBySlug");
    return null;
  }

  try {
    const project = await client.fetch<FullProject>(fullProjectQuery, { slug });
    
    if (!project) {
      console.log(`No project found for slug: ${slug}`);
    }
    
    return project || null;
  } catch (err) {
    console.error(`Sanity fetch error for slug "${slug}":`, err);
    return null;
  }
}