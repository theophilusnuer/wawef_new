import { defineField, defineType } from 'sanity'

export const upcomingInitiative = defineType({
  name: 'upcomingInitiative',
  title: 'Upcoming Initiative',
  type: 'document',
  fields: [
    defineField({
      name: 'initialBackgroundColor',
      title: 'Initial Background Color',
      type: 'string',
      description: 'Choose a solid color for the generated initial tile.',
      options: {
        list: [
          { title: 'Soft Green (#DFF3E7)', value: '#DFF3E7' },
          { title: 'Warm Yellow (#F2C94C)', value: '#F2C94C' },
          { title: 'Blush (#FAEBE7)', value: '#FAEBE7' },
          { title: 'Light Gray (#E6E6E6)', value: '#E6E6E6' },
          { title: 'Sand (#DDD7BF)', value: '#DDD7BF' },
          { title: 'Mint (#CFE7DA)', value: '#CFE7DA' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: 'launchMonth',
      title: 'Launch Month (Optional)',
      type: 'string',
      options: {
        list: [
          { title: 'January', value: 'january' },
          { title: 'February', value: 'february' },
          { title: 'March', value: 'march' },
          { title: 'April', value: 'april' },
          { title: 'May', value: 'may' },
          { title: 'June', value: 'june' },
          { title: 'July', value: 'july' },
          { title: 'August', value: 'august' },
          { title: 'September', value: 'september' },
          { title: 'October', value: 'october' },
          { title: 'November', value: 'november' },
          { title: 'December', value: 'december' },
        ],
      },
      description: 'Set this only if you want Month + Year. Leave empty for Year-only.',
    }),
    defineField({
      name: 'launchYear',
      title: 'Launch Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      initialValue: '',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      month: 'launchMonth',
      year: 'launchYear',
    },
    prepare(selection) {
      const { title, month, year } = selection
      const monthName = month
        ? `${month.charAt(0).toUpperCase()}${month.slice(1)}`
        : ''
      const launch = monthName ? `${monthName} ${year}` : `${year}`

      return {
        title: title || 'Upcoming Initiative',
        subtitle: year ? `Launch: ${launch}` : 'Launch date not set',
      }
    },
  },
})
