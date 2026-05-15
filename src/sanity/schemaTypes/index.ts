


import { type SchemaTypeDefinition } from 'sanity'
import { program } from './program'


import { partner, galleryImage, objectivesApproach, sponsorDonor } from './projectObjects'

import { impactStory, news } from './impactStoryNews'
import { resource } from './resource'
import { impactSummary } from './impactSummary'
import { upcomingInitiative } from './upcomingInitiative'

export const schemaTypes: SchemaTypeDefinition[] = [
	program,
	partner,
	galleryImage,
	objectivesApproach,
	sponsorDonor,
	resource,
	impactStory,
	news,
	impactSummary,
	upcomingInitiative,
];
