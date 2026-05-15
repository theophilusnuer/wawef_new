import { defineField, defineType } from 'sanity'

export const impactSummary = defineType({
  name: 'impactSummary',
  title: 'Impact Summary',
  type: 'document',
  fields: [
    defineField({
      name: 'impactNo',
      title: 'Impact No',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Examples: 500+, 200, 6',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Set a number to control display order (lower numbers appear first).',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'impactNo',
      subtitle: 'description',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, order } = selection
      return {
        title: order != null ? `#${order} — ${title ?? 'Impact item'}` : (title ?? 'Impact item'),
        subtitle,
      }
    },
  },
})
