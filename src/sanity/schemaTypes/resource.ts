import { defineType, defineField } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const resource = defineType({
  name: 'resource',
  title: 'Resource/Review',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title of Report/Action Plan',
      type: 'string',
      validation: rule => rule.required().max(100),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
         hotspot: true,
        accept: 'image/*',
        },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary (max 60 words)',
      type: 'text',
      validation: rule => rule.required().max(400), // ~60 words
    }),
    defineField({
      name: 'file',
      title: 'Upload File',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' },
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link (if any)',
      type: 'url',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
});
