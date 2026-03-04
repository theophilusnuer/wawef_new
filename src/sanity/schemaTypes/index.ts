


import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'


import { partner, galleryImage, objectivesApproach } from './projectObjects'

import { impactStory, news } from './impactStoryNews'
import { resource } from './resource'

export const schemaTypes: SchemaTypeDefinition[] = [
	project,
	partner,
	galleryImage,
	objectivesApproach,
	resource,
	impactStory,
	news,
]
