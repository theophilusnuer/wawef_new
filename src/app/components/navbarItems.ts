// This file contains the list of navbar items for the WAWEF site, including flagship projects, about us, impact stories, and review/resources.
// The flagship projects dropdown is dynamically generated from Sanity (see Navbar.tsx for fetch logic).

export const NAVBAR_ITEMS = [
  {
    label: 'Flagship Projects',
    type: 'dropdown',
    key: 'flagship-projects',
    // items will be injected dynamically from Sanity
    items: [],
    seeAll: {
      label: 'See all projects',
      href: '/projects',
    },
  },
  {
    label: 'About Us',
    type: 'dropdown',
    key: 'about-us',
    items: [
      { label: 'Who We Are', href: '/about-us' },
      { label: 'Leadership', href: '/team' },
      { label: 'Our Vibrant Volunteers!', href: '/volunteers'},
    ],
  },
  {
    label: 'Impact Stories',
    type: 'link',
    key: 'impact-stories',
    href: '/impact-stories',
  },
  {
    label: 'Review & Resources',
    type: 'link',
    key: 'review-resources',
    href: '/reviews-resources',
  },
];
