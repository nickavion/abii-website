import type { CallToAction } from './types';
import { getPermalink } from './utils/permalinks';

/**
 * §2 of the copy spec asks for three links plus one button. "Pricing" is
 * replaced by "Roadmap" here because the site ships the §9b waitlist rather
 * than the §9a tiers (OPEN-7), so there is no pricing content to link to.
 * The cost question is answered in the FAQ instead. The `#pricing` anchor is
 * still present on the waitlist section so any existing link keeps working.
 */
export const headerData = {
  links: [
    { text: 'How it works', href: '/#how-it-works' },
    { text: 'Features', href: '/#features' },
    { text: 'Roadmap', href: '/#roadmap' },
    { text: 'FAQ', href: '/#faq' },
  ],
  actions: [{ text: 'Join the beta', href: '/#signup', variant: 'primary' }] satisfies CallToAction[],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'How it works', href: '/#how-it-works' },
        { text: 'Features', href: '/#features' },
        { text: 'Roadmap', href: '/#roadmap' },
        { text: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Company',
      links: [{ text: 'Join the beta', href: '/#signup' }],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
        { text: 'Accessibility', href: getPermalink('/accessibility') },
      ],
    },
  ],
};
