export const NAV_LINKS = [
  {
    type: 'link',
    to: '/',
    labelKey: 'navigation.home',
    isActive: (location) => location.pathname === '/',
    scrollToTop: true,
  },
  {
    type: 'hash',
    to: '/#about',
    labelKey: 'navigation.about',
    isActive: (location) => location.hash === '#about',
  },
  {
    type: 'hash',
    to: '/#services',
    labelKey: 'navigation.services',
    isActive: (location) => location.hash === '#services',
  },
  {
    type: 'hash',
    to: '/#quote',
    labelKey: 'navigation.quote',
    isActive: (location) => location.hash === '#quote',
  },
  {
    type: 'link',
    to: '/donor-funnel',
    labelKey: 'navigation.donorFunnel',
    fallback: 'Donor Funnel',
    isActive: (location) => location.pathname === '/donor-funnel',
  },
  {
    type: 'link',
    to: '/news',
    labelKey: 'navigation.notices',
    fallback: 'News',
    isActive: (location) => location.pathname.startsWith('/news'),
  },
  {
    type: 'hash',
    to: '/#contact',
    labelKey: 'navigation.contact',
    isActive: (location) => location.hash === '#contact',
  },
];
