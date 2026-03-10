import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon, ImageIcon } from '@sanity/icons';

export const impactStory = defineType({
  name: 'impactStory',
  title: 'Impact Story',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required().max(120),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true, accept: 'image/*' },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Story Text',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image', icon: ImageIcon, options: { hotspot: true, accept: 'image/*' } }),
      ],
      validation: rule => rule.required(),
      description: 'Type and format your story, insert images and links as needed.'
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
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', icon: ImageIcon, options: { hotspot: true, accept: 'image/*' } })],
      validation: rule => rule.max(10),
      description: 'Add a list of images to be used in the story body or as a gallery.'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
});

export const news = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required().max(120),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true, accept: 'image/*' },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'News Text',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image', icon: ImageIcon, options: { hotspot: true, accept: 'image/*' } }),
      ],
      validation: rule => rule.required(),
      description: 'Type and format your news, insert images and links as needed.'
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
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', icon: ImageIcon, options: { hotspot: true, accept: 'image/*' } })],
      validation: rule => rule.max(10),
      description: 'Add a list of images to be used in the news body or as a gallery.'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
});
