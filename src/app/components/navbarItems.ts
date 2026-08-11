// Single source of truth for navbar items used on both mobile and desktop
// Edit labels and links here and they'll automatically update everywhere

export type NavItemLink = {
  label: string;
  href: string;
};

export type NavItem = {
  key: string;
  label: string;
  type: 'link' | 'dropdown';
  href?: string; // for type: 'link'
  items?: NavItemLink[]; // for type: 'dropdown'
  seeAll?: NavItemLink; // for type: 'dropdown' with see all link
};

export const NAVBAR_ITEMS: NavItem[] = [
  {
    key: 'programs',
    label: 'Programs',
    type: 'dropdown',
    items: [], // Dynamically populated from Sanity
    seeAll: {
      label: 'See all programs',
      href: '/programs',
    },
  },
  {
    key: 'about-us',
    label: 'About Us',
    type: 'dropdown',
    items: [
      { label: 'Who We Are', href: '/about-us' },
      { label: 'Leadership', href: '/team' },
    ],
  },
  {
    key: 'impact-stories',
    label: 'Impact Stories',
    type: 'link',
    href: '/impact-stories',
  },
  {
    key: 'get-involved',
    label: 'Get Involved',
    type: 'link',
    href: '/get-involved',
  },
  // {
  //   key: 'reviews-resources',
  //   label: 'Review & Resources',
  //   type: 'link',
  //   href: '/reviews-resources',
  // },
];
