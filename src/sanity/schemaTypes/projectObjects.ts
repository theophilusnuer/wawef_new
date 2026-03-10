import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon, UsersIcon, ImageIcon, LinkIcon } from '@sanity/icons';

// Partner object type
export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Partner Name', validation: rule => rule.required() }),
    defineField({ name: 'logo', type: 'image', title: 'Logo', icon: ImageIcon, options: { hotspot: true, accept: 'image/*' }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })], validation: rule => rule.required() }),
    defineField({ name: 'website', type: 'url', title: 'Website/Social Link', icon: LinkIcon }),
  ],
});

// Gallery image object type
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
         hotspot: true,
        accept: "image/*"
        },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' })
      ],
      validation: rule => rule.required(),
    }),
  ],
});

// Objectives & Approach object type
export const objectivesApproach = defineType({
  name: 'objectivesApproach',
  title: 'Objectives & Approach',
  type: 'object',
  fields: [
    defineField({ name: 'objectives', title: 'Objectives', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: rule => rule.max(10) }),
    defineField({
      name: 'approachType',
      title: 'Approach Format',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'List', value: 'list' },
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'approachText',
      title: 'Approach (Text)',
      type: 'text',
      hidden: ({ parent }) => parent?.approachType !== 'text',
    }),
    defineField({
      name: 'approachList',
      title: 'Approach (List)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      hidden: ({ parent }) => parent?.approachType !== 'list',
    }),
  ],
});

// Sponsor/Donor object type
export const sponsorDonor = defineType({
  name: 'sponsorDonor',
  title: 'Sponsor or Donor',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
        accept: 'image/*',
      },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the sponsor or donor.',
    }),
  ],
});
