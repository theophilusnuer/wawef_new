import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentIcon, ImageIcon } from '@sanity/icons'

export const career = defineType({
  name: 'career',
  title: 'Career Opportunity',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true, accept: 'image/*' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Job Details',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          icon: ImageIcon,
          options: { hotspot: true, accept: 'image/*' },
        }),
      ],
      validation: (rule) => rule.required(),
      description:
        'Add the role overview, responsibilities, qualifications, and application instructions.',
    }),
    defineField({
      name: 'downloadableFile',
      title: 'Downloadable Job File',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' },
      validation: (rule) => rule.required(),
      description: 'Upload the job description or application document visitors can download.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
})
